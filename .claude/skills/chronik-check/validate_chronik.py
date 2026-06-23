#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
validate_chronik.py - deterministische Pruefung von Chronik-Frontmatter.

Prueft eine Chronik-Datei (oder alle *.md eines Verzeichnisses, rekursiv)
gegen den Frontmatter-Vertrag aus docs/steering/CHRONIK-SPEZIFIKATION.md:
Pflichtfelder, geschlossene Listen woertlich, datum-Format, chronik_id==Dateiname.

Zusaetzlich (HEURISTIK, nur Warnung): Autor-Signale im Body ("Chronist: ...",
"erstellt von ...", Perplexitys [file:NNN]-Zitatstil) werden gegen beteiligte
abgeglichen. Nennt der Text ein LLM als Autor, das nicht in beteiligte steht,
gibt es eine Warnung (Faktizitaet pruefen).

Aufruf:   python validate_chronik.py <datei.md | verzeichnis>
Exit:     0 ok (evtl. Warnungen) | 1 harter Fehler | 2 Aufruf-/Pfadfehler
PyYAML optional; sonst Minimal-Parser. Vokabel im Gleichschritt mit der Spec.
"""

import sys
import re
from pathlib import Path

TYP = {"chronik"}
STANDARD = {"chronist-v1", "legacy"}
BETEILIGTE = {"nutzer", "claude", "chatgpt", "perplexity", "gemini"}
FADEN_TYP = {
    "konzeptarbeit", "recherche", "umsetzung", "debugging",
    "entscheidungsfindung", "prompt-erstellung", "review", "mischform",
}
STATUS = {"abgeschlossen", "offen", "teilweise", "unklar"}
QUELLEN = {"vollstaendiger-faden", "ausschnitt", "mit-anhaengen", "ohne-anhaengen"}
SCHLAGWORTE = {
    "scope-drift", "richtungswechsel", "sackgasse", "durchbruch", "blockade",
    "externe-abhaengigkeit", "fehlende-quelle", "missverstandene-anforderung",
    "unklare-zustaendigkeit", "konzept-vs-umsetzung",
    "vollstaendigkeit-vs-verdichtung", "abbruchregel",
    "praezisierung-durch-gegenfrage", "tooling-problem", "annahme-verworfen",
}
REQUIRED = ["chronik_id", "datum", "projekt", "thema", "beteiligte", "typ",
            "standard", "faden_typ", "status_am_ende", "quellenlage", "schlagworte"]
SCALAR_CLOSED = {"typ": TYP, "standard": STANDARD, "faden_typ": FADEN_TYP,
                 "status_am_ende": STATUS, "quellenlage": QUELLEN}
LIST_CLOSED = {"beteiligte": BETEILIGTE, "schlagworte": SCHLAGWORTE}

DATUM = re.compile(r"^\d{4}-\d{2}-\d{2}$")
KEBAB = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
LLM_NAMES = {"claude": "claude", "chatgpt": "chatgpt", "gpt": "chatgpt",
             "perplexity": "perplexity", "gemini": "gemini"}
AUTHOR_MARKER = re.compile(
    r"(?i)(chronist|verfasser|verfasst|autor\b|chronik erstellt|erstellt von|erstellt\s*:)")
PPLX_CITE = re.compile(r"\[file:\s*\d+\]")


def split_frontmatter(text):
    lines = text.splitlines()
    i = 0
    while i < len(lines) and lines[i].strip() == "":
        i += 1
    if i >= len(lines) or lines[i].strip().lstrip("﻿") != "---":
        return (None, text)
    start = i + 1
    for j in range(start, len(lines)):
        if lines[j].strip() == "---":
            return ("\n".join(lines[start:j]), "\n".join(lines[j + 1:]))
    return (None, text)


def parse_yaml(block):
    try:
        import yaml  # type: ignore
        data = yaml.safe_load(block)
        return data if isinstance(data, dict) else {}
    except Exception:
        return _parse_simple_yaml(block)


def _parse_simple_yaml(block):
    data = {}
    for raw in block.splitlines():
        line = raw.rstrip()
        s = line.strip()
        if not s or s.startswith("#") or ":" not in line:
            continue
        key, _, val = line.partition(":")
        key = key.strip()
        val = val.strip()
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            items = [x.strip().strip("\"'") for x in inner.split(",")] if inner else []
            data[key] = [x for x in items if x != ""]
        else:
            if " #" in val:
                val = val.split(" #", 1)[0].strip()
            data[key] = val.strip().strip("\"'")
    return data


def as_list(v):
    if v is None:
        return []
    if isinstance(v, list):
        return [str(x).strip() for x in v if str(x).strip() != ""]
    return [x.strip() for x in str(v).split(",") if x.strip() != ""]


def detect_author_llms(body):
    found = set()
    if PPLX_CITE.search(body):
        found.add("perplexity")
    for line in body.splitlines():
        if AUTHOR_MARKER.search(line):
            low = line.lower()
            for token, name in LLM_NAMES.items():
                if token in low:
                    found.add(name)
    return found


def validate(path):
    errors, warnings = [], []
    text = path.read_text(encoding="utf-8", errors="replace")
    block, body = split_frontmatter(text)
    if block is None:
        return (["kein YAML-Frontmatter gefunden"], [])
    meta = parse_yaml(block) or {}

    for f in REQUIRED:
        if not (f in meta and meta[f] not in (None, "", [])):
            errors.append("Pflichtfeld fehlt oder leer: " + f)
    for f, allowed in SCALAR_CLOSED.items():
        if f in meta and meta[f] not in (None, "", []):
            val = str(meta[f]).strip()
            if val not in allowed:
                errors.append(f + "=" + repr(val) + " nicht in " + str(sorted(allowed)))
    for f, allowed in LIST_CLOSED.items():
        for item in as_list(meta.get(f)):
            if item not in allowed:
                errors.append(f + ": " + repr(item) + " nicht in " + str(sorted(allowed)))
    datum = str(meta.get("datum", "")).strip()
    if datum and datum != "unbekannt" and not DATUM.match(datum):
        errors.append("datum=" + repr(datum) + " nicht YYYY-MM-DD oder 'unbekannt'")
    cid = str(meta.get("chronik_id", "")).strip()
    if cid and cid != path.stem:
        errors.append("chronik_id=" + repr(cid) + " != Dateiname " + repr(path.stem))
    for f in ("projekt", "thema"):
        val = str(meta.get(f, "")).strip()
        if val and not KEBAB.match(val):
            warnings.append(f + "=" + repr(val) + " nicht kebab-case")

    beteiligte = {x.lower() for x in as_list(meta.get("beteiligte"))}
    for a in sorted(detect_author_llms(body)):
        if a not in beteiligte:
            warnings.append("Autor-Signal deutet auf '" + a + "', fehlt in beteiligte "
                            + str(sorted(beteiligte)) + " - Faktizitaet pruefen")
    return (errors, warnings)


def collect(target):
    p = Path(target)
    if p.is_file():
        return [p]
    if not p.is_dir():
        return None
    out = []
    for f in p.rglob("*.md"):
        rel = f.relative_to(p).parts
        if any(part.startswith("_") for part in rel):
            continue
        if f.name.lower() == "readme.md":
            continue
        out.append(f)
    return sorted(out)


def main(argv):
    if len(argv) != 2:
        print("Aufruf: python validate_chronik.py <datei.md | verzeichnis>", file=sys.stderr)
        return 2
    files = collect(argv[1])
    if files is None:
        print("FEHLER: Pfad nicht gefunden: " + argv[1], file=sys.stderr)
        return 2
    if not files:
        print("Keine .md-Chroniken gefunden in: " + argv[1])
        return 0
    total_errors = 0
    files_with_warn = 0
    for f in files:
        errors, warnings = validate(f)
        if errors:
            total_errors += len(errors)
            print("[FEHLER] " + f.name)
            for e in errors:
                print("         - " + e)
        elif warnings:
            print("[OK*]    " + f.name + "  (mit Warnung)")
        else:
            print("[OK]     " + f.name)
        if warnings:
            files_with_warn += 1
            for w in warnings:
                print("         ! " + w)
    print("-" * 56)
    print("Geprueft: " + str(len(files)) + " | harte Fehler: " + str(total_errors)
          + " | Dateien mit Warnung: " + str(files_with_warn))
    return 1 if total_errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
