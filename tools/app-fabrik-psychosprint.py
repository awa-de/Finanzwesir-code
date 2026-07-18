#!/usr/bin/env python
"""
tools/app-fabrik-psychosprint.py

Deterministisches Arbeitsgeruest fuer den App-Fabrik-Zweier-Psychosprint
(Startlinie Punkte 4-7, MOCKUP-VERTRAG.md §7).

Rollenverteilung (dieses Werkzeug ist ausschliesslich Python):
    Sol / Fable  = psychologische Erfindung (nicht dieses Werkzeug)
    Grok         = unabhaengige Bewertung + zuordenbare Schaerfung (nicht dieses Werkzeug)
    Python       = Pfade, Validierung, Anonymisierung, unveraendertes Zusammenfuehren
    Sonnet       = genau zwei getrennte Mockups (nicht dieses Werkzeug)
    Albert       = Wirkung beurteilen (nicht dieses Werkzeug)

Das Werkzeug deutet keine psychologische Wirkung, kuerzt keine Rohtexte und
waehlt nichts aus. Es fuellt Vorlagen mit Platzhaltern, validiert Struktur,
anonymisiert deterministisch (A = Sol, B = Fable) und fuehrt Rohtexte
unveraendert zwischen klaren Trennmarkern zusammen.

Drei Subcommands: prepare, grok-paket, sonnet-paket. Zusaetzlich --self-test.

Nur Python-Standardbibliothek. Keine Netzwerkzugriffe. UTF-8.
Dry-Run ist Standard; geschrieben wird nur mit --write. Vorhandene Dateien
werden nie ueberschrieben; bei Konflikt wird vollstaendig vor dem ersten Write
gestoppt. Exit 0 = Erfolg/Dry-Run/SKIP, Exit 1 = Validierung/Konflikt/Fehler.

Aufruf immer als `python` (nicht python3), analog zu den uebrigen tools/.
"""

from __future__ import annotations

import argparse
import hashlib
import re
import sys
import tempfile
from pathlib import Path

for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

# NEW: Repository-Root aus dem Skriptort ableiten (tools/ liegt direkt unter dem Root).
REPO_ROOT = Path(__file__).resolve().parents[1]

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

# NEW (AP-09j): Die dauerhaften Prompt-Vorlagen liegen jetzt kanonisch und getrackt unter
# docs/App-Fabrik/vorlagen/ (vorher im gitignored Archiv/local/muss noch eingeordnet werden/).
VORLAGEN_REL = "docs/App-Fabrik/vorlagen"
TPL_REL = {
    "grok": VORLAGEN_REL + "/GROK_GEGENKRITIK_VORLAGE.md",
    "sonnet": VORLAGEN_REL + "/SONNET_MOCKUP-DUELL_VORLAGE.md",
}

# NEW (AP-09c): Der alleinige kognitive Ausgangspunkt fuer prepare ist der gemeinsame,
# modellneutrale Grundprompt. Nur eine Ersetzung: die vollstaendige Mini-Spec am Platzhalter.
# (AP-09j: Ablage nach docs/App-Fabrik/vorlagen/ verschoben.)
GRUNDPROMPT_REL = VORLAGEN_REL + "/PSYCHOSPRINT_GRUNDPROMPT.md"
MINI_SPEC_PLACEHOLDER = "[Hier unverändert die vollständige MINI_SPEC_FROM_HAUPTDOKUMENT.md der konkreten App einfügen.]"

# NEW (AP-09g): Die generische Sonnet-Vorlage MUSS die Quellensperre tragen. Fehlt der Marker,
# verweigert cmd_sonnet jede Ausgabe (Schutz der Vorlagengrenze: keine Fremd-App als Scaffold).
SONNET_QUELLENSPERRE_MARKER = "## Quellensperre — Harter Stop"

# NEW (AP-09i/09k): deterministisches Produktentscheidungs-Gate mit ID-Bindung. Jeder Grok-Fund
# traegt "Produktentscheidung nötig [E<k>]"; PRODUKTENTSCHEIDUNGEN.md traegt dieselben IDs.
# cmd_sonnet prueft Mengen-Gleichheit der IDs (nicht nur die Anzahl). "nicht übernehmen" zaehlt nicht.
PRODUKTENTSCHEIDUNG_MARKER = "Produktentscheidung nötig"
# NEW (AP-09k): ID-Bindung statt Zaehlung.
PE_GROK_ID_RE = re.compile(r"Produktentscheidung nötig \[(E\d+)\]")
PE_DEC_HEAD_RE = re.compile(r"^##\s+(E\d+)\s*$")
PE_STATUS_LINE_RE = re.compile(r"^Status:\s*(A|B|Bedingung|übersprungen)\s*$")
PE_UEBERSPRUNGEN_WARNUNG = ("Produktentscheidung nötig, aber vom Nutzer übersprungen "
                            "— arbeite mit unvollständigen Daten.")


# NEW (AP-09k): Parst PRODUKTENTSCHEIDUNGEN.md. Je "## E<k>"-Block genau eine gueltige Status-Zeile.
# Rueckgabe: (dec_ids_in_order, status_by_id, fehler_oder_None).
def parse_pe_blocks(pe_text: str):
    dec_ids = []
    status_by_id = {}
    cur = None
    cur_status = []

    def _close():
        if cur is not None:
            if len(cur_status) != 1:
                return f"Block {cur}: {len(cur_status)} gueltige Status-Zeilen (genau 1 erwartet)"
            status_by_id[cur] = cur_status[0]
        return None

    for line in pe_text.splitlines():
        mh = PE_DEC_HEAD_RE.match(line)
        if mh:
            err = _close()
            if err:
                return dec_ids, status_by_id, err
            cur = mh.group(1)
            cur_status = []
            dec_ids.append(cur)
            continue
        ms = PE_STATUS_LINE_RE.match(line)
        if ms and cur is not None:
            cur_status.append(ms.group(1))
    err = _close()
    return dec_ids, status_by_id, err

TRENN = "\n\n" + ("=" * 72) + "\n"  # klarer Trennmarker zwischen Rohtexten


# ---------------------------------------------------------------------------
# NEW: kleine Helfer
# ---------------------------------------------------------------------------

def _rel(root: Path, path: Path) -> str:
    try:
        return str(path.resolve().relative_to(root.resolve()))
    except ValueError:
        return str(path)


def in_root(root: Path, path: Path) -> bool:
    """Zielpfad darf den Repository-Root nie verlassen."""
    try:
        path.resolve().relative_to(root.resolve())
        return True
    except ValueError:
        return False


def read_nonempty(path: Path):
    if not path.is_file():
        return None, f"nicht gefunden: {path}"
    text = path.read_text(encoding="utf-8")
    if not text.strip():
        return None, f"leer: {path}"
    return text, None


def split_frontmatter(text: str):
    """Trennt einen fuehrenden ---...----Frontmatterblock ab. Gibt (fm, body)."""
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n?", text, re.DOTALL)
    if m:
        return m.group(1), text[m.end():]
    return "", text


def fm_get(fm_text: str, key: str):
    for line in fm_text.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            if k.strip() == key:
                return v.strip()
    return None


def missing_sections(text: str):
    """Welche der Abschnitte '## 1.' bis '## 8.' fehlen."""
    return [n for n in range(1, 9) if not re.search(rf"(?m)^##\s+{n}\.", text)]


def sha256_of(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def validate_raw(text: str, slug: str, teilnehmer: str):
    """Validiert einen Psychosprint-Rohtext. Gibt Fehlerliste (leer = ok)."""
    fm, _body = split_frontmatter(text)
    errs = []
    if fm_get(fm, "artefakt") != "psychosprint-entwurf":
        errs.append("Frontmatter 'artefakt: psychosprint-entwurf' fehlt/falsch")
    if fm_get(fm, "app") != slug:
        errs.append(f"Frontmatter 'app: {slug}' fehlt/falsch")
    if fm_get(fm, "teilnehmer") != teilnehmer:
        errs.append(f"Frontmatter 'teilnehmer: {teilnehmer}' fehlt/falsch")
    miss = missing_sections(text)
    if miss:
        errs.append("fehlende Abschnitte: " + ", ".join(str(n) for n in miss))
    return errs


def anonymize(raw_text: str, label: str) -> str:
    """Entfernt NUR den Frontmatter und ersetzt NUR die erste H1 durch
    '# Entwurf A' bzw. '# Entwurf B'. Alles danach bleibt unveraendert."""
    _fm, body = split_frontmatter(raw_text)
    lines = body.splitlines()
    for i, ln in enumerate(lines):
        if ln.startswith("# "):
            lines[i] = f"# Entwurf {label}"
            break
    return "\n".join(lines).strip("\n") + "\n"


def has_model_leak(text: str) -> bool:
    """Prueft, ob 'sol' oder 'fable' als eigenstaendige Modellbezeichnung
    (Wortgrenze) vorkommt. 'soll', 'solche', 'Fabel' loesen bewusst NICHT aus."""
    return bool(re.search(r"\bsol\b", text, re.IGNORECASE)
                or re.search(r"\bfable\b", text, re.IGNORECASE))


def substitute(template: str, mapping: dict) -> str:
    out = template
    for key, val in mapping.items():
        out = out.replace("{{" + key + "}}", val)
    return out


def report_conflicts(root: Path, targets):
    existing = [t for t in targets if t.exists()]
    for t in existing:
        print(f"FAIL: Ziel existiert bereits (kein Ueberschreiben): {_rel(root, t)}")
    return existing


def print_targets(root: Path, label_targets):
    for label, t in label_targets:
        print(f"  - {label}: {_rel(root, t)}")


# ---------------------------------------------------------------------------
# NEW: Subcommand prepare
# ---------------------------------------------------------------------------

# NEW (AP-09c): neutraler, fuer beide Modelle identischer Transportanhang.
def _transportanhang(slug: str) -> str:
    return (
        "## Transportanhang (AP-09c, für beide Läufe identisch)\n\n"
        "Dieser Grundprompt ist modellneutral. Sol und Fable erhalten ihn wortgleich; der\n"
        "begleitende Startsatz nennt nur deine Teilnehmer-ID (sol oder fable) und die Zielrohdatei\n"
        "und verändert keinen Denkauftrag.\n\n"
        "Deine Ausgabe folgt dem Ergebnisformat oben und trägt am Anfang zusätzlich genau dieses\n"
        "Frontmatter:\n\n"
        "---\n"
        "artefakt: psychosprint-entwurf\n"
        f"app: {slug}\n"
        "teilnehmer: <Teilnehmer-ID aus dem Startsatz>\n"
        "prompt: AP-app-fabrik-06_psychosprint-grundprompt\n"
        "status: roh-unverändert\n"
        "---\n\n"
        "Danach die Abschnitte 1 bis 8 unverändert. Schreibe ausschließlich in die im Startsatz\n"
        "genannte Rohdatei (oder, ohne Dateizugriff, nur das speicherfertige Markdown).\n"
    )


# NEW (AP-09c): die zwei kopierfertigen Startzeilen — bytegleich bis auf ID und Rohdatei.
def _startzeilen(slug: str):
    tmpl = "Startsatz — Teilnehmer-ID: {id}; schreibe nach tests/scratch/" + slug + "/psychosprint/{raw}"
    return (tmpl.format(id="sol", raw="01-sol.md"),
            tmpl.format(id="fable", raw="02-fable.md"))


def cmd_prepare(root: Path, slug: str, app_name, mini_spec_arg: str, write: bool) -> int:
    if not SLUG_RE.match(slug):
        print(f"FAIL: unsicherer Slug {slug!r}; erlaubt: a-z, 0-9, Bindestrich.")
        return 1

    mini = Path(mini_spec_arg)
    if not mini.is_absolute():
        mini = root / mini_spec_arg
    apps_slug_dir = (root / "Apps" / slug).resolve()
    if not in_root(root, mini) or apps_slug_dir not in mini.resolve().parents:
        print(f"FAIL: Mini-Spec muss unter Apps/{slug}/ liegen: {mini}")
        return 1
    mini_text, err = read_nonempty(mini)
    if err:
        print(f"FAIL: Mini-Spec {err}")
        return 1

    # NEW (AP-09c): nur den gemeinsamen AP-06-Grundprompt lesen.
    grund_path = root / GRUNDPROMPT_REL
    grund, ge = read_nonempty(grund_path)
    if ge:
        print(f"FAIL: Grundprompt {ge}")
        return 1
    if grund.count(MINI_SPEC_PLACEHOLDER) != 1:
        print(f"FAIL: Mini-Spec-Platzhalter im Grundprompt nicht genau einmal gefunden "
              f"({grund.count(MINI_SPEC_PLACEHOLDER)}x).")
        return 1

    # Genau eine Ersetzung: vollstaendige Mini-Spec am bestehenden Platzhalter.
    filled = grund.replace(MINI_SPEC_PLACEHOLDER, mini_text.rstrip("\n"))
    common_prompt = filled.rstrip("\n") + "\n\n" + _transportanhang(slug)
    zeile_sol, zeile_fable = _startzeilen(slug)

    scratch_dir = root / "tests" / "scratch" / slug / "psychosprint"
    # NEW (AP-09f): app-spezifischer Psychosprint-Auftrag liegt in der Werkstatt, nicht im Archiv.
    common_out = scratch_dir / "PSYCHOSPRINT_AUFTRAG.md"
    label_targets = [("Psychosprint-Auftrag", common_out), ("Werkstattordner", scratch_dir)]

    if not write:
        an = f" (app={app_name!r})" if app_name else ""
        print(f"DRY-RUN prepare (slug={slug}){an} — wuerde schreiben:")
        print_targets(root, label_targets)
        print("Zwei kopierfertige Startzeilen (bytegleich bis auf ID und Rohdatei):")
        print("  " + zeile_sol)
        print("  " + zeile_fable)
        print("Kein --write: nichts geschrieben.")
        return 0

    if report_conflicts(root, [common_out]):
        return 1
    scratch_dir.mkdir(parents=True, exist_ok=True)
    common_out.write_text(common_prompt, encoding="utf-8")
    print("OK prepare — geschrieben:")
    print_targets(root, label_targets)
    print("Zwei kopierfertige Startzeilen (bytegleich bis auf ID und Rohdatei):")
    print("  " + zeile_sol)
    print("  " + zeile_fable)
    return 0


# ---------------------------------------------------------------------------
# NEW: Subcommand grok-paket
# ---------------------------------------------------------------------------

def _read_and_validate_pair(root: Path, slug: str):
    sol_path = root / "tests" / "scratch" / slug / "psychosprint" / "01-sol.md"
    fable_path = root / "tests" / "scratch" / slug / "psychosprint" / "02-fable.md"
    sol_text, e1 = read_nonempty(sol_path)
    fable_text, e2 = read_nonempty(fable_path)
    if e1 or e2:
        print(f"FAIL: Rohtext {e1 or e2}")
        return None
    sol_errs = validate_raw(sol_text, slug, "sol")
    fable_errs = validate_raw(fable_text, slug, "fable")
    if sol_errs or fable_errs:
        for x in sol_errs:
            print(f"FAIL: 01-sol.md — {x}")
        for x in fable_errs:
            print(f"FAIL: 02-fable.md — {x}")
        return None
    return (sol_path, sol_text, fable_path, fable_text)


def cmd_grok(root: Path, slug: str, app_name: str, write: bool) -> int:
    if not SLUG_RE.match(slug):
        print(f"FAIL: unsicherer Slug {slug!r}.")
        return 1
    pair = _read_and_validate_pair(root, slug)
    if pair is None:
        return 1
    sol_path, sol_text, fable_path, fable_text = pair

    anon_a = anonymize(sol_text, "A")
    anon_b = anonymize(fable_text, "B")
    paket = (
        "# Anonymisiertes Eingabepaket fuer die unabhaengige Gegenkritik\n\n"
        "Zwei anonyme Rohentwuerfe. Keine Modellzuordnung, keine Reihenfolge-Wertung.\n"
        + TRENN + anon_a + TRENN + anon_b
    )
    if has_model_leak(paket):
        print("FAIL: anonymisiertes Paket enthaelt noch 'sol' oder 'fable' als Modellbezeichnung — nicht geschrieben.")
        return 1

    manifest = (
        "# Anonymisierungsmanifest (privat, nicht an Grok geben)\n\n"
        f"App-Slug: {slug}\n\n"
        "| Anonym | Quelle | Modell |\n|---|---|---|\n"
        f"| Entwurf A | {_rel(root, sol_path)} | Sol |\n"
        f"| Entwurf B | {_rel(root, fable_path)} | Fable |\n\n"
        "SHA-256 der Quellen:\n"
        f"- {_rel(root, sol_path)}: {sha256_of(sol_path)}\n"
        f"- {_rel(root, fable_path)}: {sha256_of(fable_path)}\n"
    )

    grok_tpl_path = root / TPL_REL["grok"]
    grok_tpl, e = read_nonempty(grok_tpl_path)
    if e:
        print(f"FAIL: Grok-Vorlage {e}")
        return 1
    grok_prompt = substitute(grok_tpl, {"SLUG": slug, "APP_NAME": app_name})

    anon_out = root / "tests" / "scratch" / slug / "psychosprint" / "GROK_EINGABE_ANONYMISIERT.md"
    manifest_out = root / "tests" / "scratch" / slug / "psychosprint" / "ANONYMISIERUNGSMANIFEST.md"
    # NEW (AP-09d): app-spezifischer Grok-Auftrag liegt in der Werkstatt (GROK_AUFTRAG.md),
    # nicht mehr im Archiv. Die allgemeine Grok-Vorlage bleibt die einzige Archiv-Promptquelle.
    auftrag_out = root / "tests" / "scratch" / slug / "psychosprint" / "GROK_AUFTRAG.md"

    label_targets = [("Anonymes Paket", anon_out), ("Manifest (privat)", manifest_out), ("Grok-Auftrag", auftrag_out)]
    if not write:
        print(f"DRY-RUN grok-paket (slug={slug}) — Validierung OK, kein Modellleck. Wuerde schreiben:")
        print_targets(root, label_targets)
        print("Kein --write: nichts geschrieben.")
        return 0

    if report_conflicts(root, [anon_out, manifest_out, auftrag_out]):
        return 1
    anon_out.parent.mkdir(parents=True, exist_ok=True)
    anon_out.write_text(paket, encoding="utf-8")
    manifest_out.write_text(manifest, encoding="utf-8")
    auftrag_out.write_text(grok_prompt, encoding="utf-8")
    print("OK grok-paket — geschrieben:")
    print_targets(root, label_targets)
    return 0


# ---------------------------------------------------------------------------
# NEW: Subcommand sonnet-paket
# ---------------------------------------------------------------------------

def cmd_sonnet(root: Path, slug: str, app_name: str, write: bool) -> int:
    if not SLUG_RE.match(slug):
        print(f"FAIL: unsicherer Slug {slug!r}.")
        return 1
    pair = _read_and_validate_pair(root, slug)
    if pair is None:
        return 1
    sol_path, sol_text, fable_path, fable_text = pair

    # NEW (AP-09d): Groks Ergebnis liegt unter grok-gegenkritik.md (nicht qualitative-gegenkritik.md).
    gutachten_path = root / "tests" / "scratch" / slug / "psychosprint" / "grok-gegenkritik.md"
    gutachten, e = read_nonempty(gutachten_path)
    if e:
        print(f"FAIL: Grok-Gutachten {e}")
        return 1
    g_errs = []
    if "Entwurf A" not in gutachten or "Entwurf B" not in gutachten:
        g_errs.append("nennt nicht beide: 'Entwurf A' und 'Entwurf B'")
    if not any(k in gutachten for k in ("für Entwurf A", "für Entwurf B", "nicht übernehmen")):
        g_errs.append("keine Kennzeichnung 'für Entwurf A' / 'für Entwurf B' / 'nicht übernehmen'")
    if g_errs:
        for x in g_errs:
            print(f"FAIL: grok-gegenkritik.md — {x}")
        return 1

    # NEW (AP-09k): Produktentscheidungs-Gate mit ID-Bindung (Mengen-Gleichheit, nicht Zaehlung) — VOR jeder Ausgabe.
    entscheid_section = ""
    grok_total = gutachten.count(PRODUKTENTSCHEIDUNG_MARKER)  # "nicht übernehmen" zaehlt nicht
    if grok_total > 0:
        grok_ids = PE_GROK_ID_RE.findall(gutachten)
        if len(grok_ids) != grok_total:
            print(f"FAIL: {grok_total - len(grok_ids)} Grok-Fund(e) 'Produktentscheidung nötig' ohne "
                  f"[E<k>]-ID — nicht zuordenbar; kein Sonnet-Paket geschrieben.")
            return 1
        if len(set(grok_ids)) != len(grok_ids):
            print("FAIL: doppelte Entscheidungs-ID im Grok-Gutachten; kein Sonnet-Paket geschrieben.")
            return 1
        pe_path = root / "tests" / "scratch" / slug / "psychosprint" / "PRODUKTENTSCHEIDUNGEN.md"
        pe_text, pe_err = read_nonempty(pe_path)
        if pe_err:
            print(f"FAIL: {grok_total} offene Produktentscheidung(en) in grok-gegenkritik.md, aber "
                  f"PRODUKTENTSCHEIDUNGEN.md {pe_err} — kein Sonnet-Paket geschrieben.")
            return 1
        dec_ids, status_by_id, perr = parse_pe_blocks(pe_text)
        if perr:
            print(f"FAIL: PRODUKTENTSCHEIDUNGEN.md — {perr}; kein Sonnet-Paket geschrieben.")
            return 1
        if len(set(dec_ids)) != len(dec_ids):
            print("FAIL: doppelte Entscheidungs-ID in PRODUKTENTSCHEIDUNGEN.md; kein Sonnet-Paket geschrieben.")
            return 1
        if set(dec_ids) != set(grok_ids):
            fehlend = sorted(set(grok_ids) - set(dec_ids))
            extra = sorted(set(dec_ids) - set(grok_ids))
            print(f"FAIL: Entscheidungs-IDs decken die Grok-Funde nicht — fehlend: {fehlend}, "
                  f"zusaetzlich: {extra}; kein Sonnet-Paket geschrieben.")
            return 1
        warn = ("\n" + PE_UEBERSPRUNGEN_WARNUNG + "\n") if "übersprungen" in status_by_id.values() else ""
        entscheid_section = (TRENN + "# PRODUKTENTSCHEIDUNGEN (Albert)\n\n"
                             + pe_text.rstrip("\n") + "\n" + warn)

    kopf = (
        "# Sonnet-Eingabepaket — Mockup-Duell\n\n"
        f"App: {app_name} (Slug: {slug})\n\n"
        "Quellen (unveraendert weiter unten eingebettet) mit SHA-256:\n"
        f"- {_rel(root, sol_path)}: {sha256_of(sol_path)}\n"
        f"- {_rel(root, fable_path)}: {sha256_of(fable_path)}\n"
        f"- {_rel(root, gutachten_path)}: {sha256_of(gutachten_path)}\n"
    )
    paket = (
        kopf
        + TRENN + "# SOL-ROHTEXT (unveraendert) — wird Variante A\n\n" + sol_text.rstrip("\n") + "\n"
        + TRENN + "# FABLE-ROHTEXT (unveraendert) — wird Variante B\n\n" + fable_text.rstrip("\n") + "\n"
        + TRENN + "# GROK-GUTACHTEN (unveraendert)\n\n" + gutachten.rstrip("\n") + "\n"
        + entscheid_section  # NEW (AP-09i): aufgeloeste Produktentscheidungen reisen deterministisch mit
    )

    sonnet_tpl_path = root / TPL_REL["sonnet"]
    sonnet_tpl, e2 = read_nonempty(sonnet_tpl_path)
    if e2:
        print(f"FAIL: Sonnet-Vorlage {e2}")
        return 1
    # NEW (AP-09g): Quellensperre-Marker Pflicht — sonst weder Eingabepaket noch Auftrag schreiben.
    if SONNET_QUELLENSPERRE_MARKER not in sonnet_tpl:
        print(f"FAIL: Sonnet-Vorlage ohne Quellensperre-Marker ({SONNET_QUELLENSPERRE_MARKER!r}); "
              f"kein SONNET_EINGABEPAKET.md und kein SONNET_AUFTRAG.md geschrieben.")
        return 1
    sonnet_prompt = substitute(sonnet_tpl, {"SLUG": slug, "APP_NAME": app_name})

    paket_out = root / "tests" / "scratch" / slug / "mockup-duell" / "SONNET_EINGABEPAKET.md"
    # NEW (AP-09f): app-spezifischer Sonnet-Auftrag liegt in der Werkstatt, nicht im Archiv.
    prompt_out = root / "tests" / "scratch" / slug / "mockup-duell" / "SONNET_AUFTRAG.md"

    label_targets = [("Sonnet-Eingabepaket", paket_out), ("Sonnet-Auftrag", prompt_out)]
    if not write:
        print(f"DRY-RUN sonnet-paket (slug={slug}) — Validierung OK. Wuerde schreiben:")
        print_targets(root, label_targets)
        print("Kein --write: nichts geschrieben.")
        return 0

    if report_conflicts(root, [paket_out, prompt_out]):
        return 1
    paket_out.parent.mkdir(parents=True, exist_ok=True)
    paket_out.write_text(paket, encoding="utf-8")
    prompt_out.write_text(sonnet_prompt, encoding="utf-8")
    print("OK sonnet-paket — geschrieben:")
    print_targets(root, label_targets)
    return 0


# ---------------------------------------------------------------------------
# NEW: --self-test (nur temporaerer Systemordner, kein Repo-Write)
# ---------------------------------------------------------------------------

# NEW (AP-09c): Grundprompt-Stub mit dem echten Mini-Spec-Platzhalter fuer den Self-Test.
_MINI_TPL_GRUND = (
    "# Psychosprint-Grundprompt (Stub)\n\n"
    "## Ergebnisformat\n# Psychosprint — [App-Name]\n(Abschnitte 1-8)\n\n"
    "## Eingefrorenes Eingabepaket\n\n```markdown\n" + MINI_SPEC_PLACEHOLDER + "\n```\n"
)
_MINI_TPL_GROK = "# Gegenkritik-Vorlage {{APP_NAME}} ({{SLUG}})\nNur anonymes Paket.\n"
# NEW (AP-09g): Sonnet-Stub traegt den Quellensperre-Marker.
_MINI_TPL_SONNET = ("# Sonnet-Vorlage {{APP_NAME}} ({{SLUG}})\n\n"
                    + SONNET_QUELLENSPERRE_MARKER + "\n\nNur gelistete Quellen. Genau zwei Mockups.\n")


def _raw_stub(slug: str, teilnehmer: str, title: str) -> str:
    body = "\n".join(f"## {n}. Abschnitt {n}\nInhalt {n}." for n in range(1, 9))
    return (f"---\nartefakt: psychosprint-entwurf\napp: {slug}\nteilnehmer: {teilnehmer}\n"
            f"status: roh-unveraendert\n---\n# {title}\n\n{body}\n")


def self_test() -> int:
    slug = "self-test-app"
    with tempfile.TemporaryDirectory(prefix="afps-selftest-") as tmp:
        root = Path(tmp)
        # Struktur aufbauen
        (root / "Apps" / slug).mkdir(parents=True)
        (root / "Apps" / slug / "MINI_SPEC_FROM_HAUPTDOKUMENT.md").write_text(
            "# Mini-Spec\nSteuerungsblock: Zweck.\n", encoding="utf-8")
        arch = root / VORLAGEN_REL  # NEW (AP-09j): Vorlagenordner (vorher ARCHIV_REL)
        arch.mkdir(parents=True)
        (root / GRUNDPROMPT_REL).write_text(_MINI_TPL_GRUND, encoding="utf-8")  # NEW (AP-09c)
        (root / TPL_REL["grok"]).write_text(_MINI_TPL_GROK, encoding="utf-8")
        (root / TPL_REL["sonnet"]).write_text(_MINI_TPL_SONNET, encoding="utf-8")

        # Phase prepare (write in temp)
        if cmd_prepare(root, slug, None, f"Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md", write=True) != 0:
            print("SELF-TEST FAIL: prepare"); return 1
        # NEW (AP-09f): genau ein Psychosprint-Auftrag in der Werkstatt, nichts im Archiv
        common = root / "tests" / "scratch" / slug / "psychosprint" / "PSYCHOSPRINT_AUFTRAG.md"
        if not common.is_file():
            print("SELF-TEST FAIL: PSYCHOSPRINT_AUFTRAG.md fehlt"); return 1
        if (arch / f"AP-app-fabrik-09_psychosprint_{slug}.md").exists():
            print("SELF-TEST FAIL: Psychosprint-Auftrag im Archiv erzeugt"); return 1
        for verboten in ("psychosprint-sol_", "psychosprint-fable_"):
            if (arch / f"AP-app-fabrik-09_{verboten}{slug}.md").exists():
                print(f"SELF-TEST FAIL: getrennte Vorlage erzeugt: {verboten}"); return 1
        # NEW (AP-09c): Startzeilen-Gleichheit — nur ID und Rohdatei duerfen abweichen
        z_sol, z_fable = _startzeilen(slug)
        a = z_sol.replace("01-sol.md", "<RAW>").replace(": sol;", ": <ID>;")
        b = z_fable.replace("02-fable.md", "<RAW>").replace(": fable;", ": <ID>;")
        if a != b:
            print("SELF-TEST FAIL: Startzeilen unterscheiden sich ausserhalb von ID/Rohdatei"); return 1
        # Nicht-Ueberschreiben: prepare erneut muss scheitern
        if cmd_prepare(root, slug, None, f"Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md", write=True) == 0:
            print("SELF-TEST FAIL: prepare hat ueberschrieben"); return 1

        # Rohtexte platzieren (kaemen sonst von den Modellen)
        psy = root / "tests" / "scratch" / slug / "psychosprint"
        (psy / "01-sol.md").write_text(_raw_stub(slug, "sol", "Psychosprint Eins"), encoding="utf-8")
        (psy / "02-fable.md").write_text(_raw_stub(slug, "fable", "Psychosprint Zwei"), encoding="utf-8")

        # Phase grok-paket
        if cmd_grok(root, slug, "Self Test", write=True) != 0:
            print("SELF-TEST FAIL: grok-paket"); return 1
        anon = (psy / "GROK_EINGABE_ANONYMISIERT.md").read_text(encoding="utf-8")
        if "Entwurf A" not in anon or "Entwurf B" not in anon or has_model_leak(anon):
            print("SELF-TEST FAIL: Anonymisierung"); return 1
        if cmd_grok(root, slug, "Self Test", write=True) == 0:
            print("SELF-TEST FAIL: grok-paket hat ueberschrieben"); return 1

        # NEW (AP-09d): Groks Ergebnis unter grok-gegenkritik.md platzieren, Phase sonnet-paket
        (psy / "grok-gegenkritik.md").write_text(
            "# Gegenkritik\nEntwurf A und Entwurf B.\nHinweis: für Entwurf A: schaerfen.\n", encoding="utf-8")
        if cmd_sonnet(root, slug, "Self Test", write=True) != 0:
            print("SELF-TEST FAIL: sonnet-paket"); return 1
        # NEW (AP-09f): Sonnet-Auftrag in der Werkstatt, nichts im Archiv
        sonnet_auftrag = root / "tests" / "scratch" / slug / "mockup-duell" / "SONNET_AUFTRAG.md"
        if not sonnet_auftrag.is_file():
            print("SELF-TEST FAIL: SONNET_AUFTRAG.md fehlt"); return 1
        if (arch / f"AP-app-fabrik-09_mockup-duell-sonnet_{slug}.md").exists():
            print("SELF-TEST FAIL: Sonnet-Auftrag im Archiv erzeugt"); return 1
        # NEW (AP-09g): erzeugter Auftrag traegt die Quellensperre
        if SONNET_QUELLENSPERRE_MARKER not in sonnet_auftrag.read_text(encoding="utf-8"):
            print("SELF-TEST FAIL: SONNET_AUFTRAG.md ohne Quellensperre-Marker"); return 1
        if cmd_sonnet(root, slug, "Self Test", write=True) == 0:
            print("SELF-TEST FAIL: sonnet-paket hat ueberschrieben"); return 1

        # NEW (AP-09k): Produktentscheidungs-Gate mit ID-Bindung — fuenf Faelle.
        gh = "# Gegenkritik\nEntwurf A und Entwurf B.\nfür Entwurf A: x.\n"

        def _pe_setup(s, grok, pe):
            p = root / "tests" / "scratch" / s / "psychosprint"
            p.mkdir(parents=True)
            (p / "01-sol.md").write_text(_raw_stub(s, "sol", "Eins"), encoding="utf-8")
            (p / "02-fable.md").write_text(_raw_stub(s, "fable", "Zwei"), encoding="utf-8")
            (p / "grok-gegenkritik.md").write_text(grok, encoding="utf-8")
            if pe is not None:
                (p / "PRODUKTENTSCHEIDUNGEN.md").write_text(pe, encoding="utf-8")

        def _pe_paket(s):
            return root / "tests" / "scratch" / s / "mockup-duell" / "SONNET_EINGABEPAKET.md"

        def _pe_auftrag(s):
            return root / "tests" / "scratch" / s / "mockup-duell" / "SONNET_AUFTRAG.md"

        def _blocked(s, msg):
            if cmd_sonnet(root, s, s, write=True) == 0:
                print(f"SELF-TEST FAIL: {msg} haette blocken muessen"); return False
            if _pe_paket(s).exists() or _pe_auftrag(s).exists():
                print(f"SELF-TEST FAIL: Ausgabe trotz {msg}"); return False
            return True

        # OK: E1+E2 vollstaendig aufgeloest -> gruen, beide Entscheidungen im Paket
        _pe_setup("pe-ok",
                  gh + "Produktentscheidung nötig [E1] für Entwurf A: a.\n"
                       "Produktentscheidung nötig [E2] für Entwurf B: b.\n",
                  "# Produktentscheidungen — pe-ok\n\n## E1\nBezug: a\nStatus: A\nEntscheidung: bauen wie A.\n"
                  "\n## E2\nBezug: b\nStatus: B\nEntscheidung: bauen wie B.\n")
        if cmd_sonnet(root, "pe-ok", "PE OK", write=True) != 0:
            print("SELF-TEST FAIL: PE-ID positiv sollte gruen sein"); return 1
        pk = _pe_paket("pe-ok").read_text(encoding="utf-8")
        if "PRODUKTENTSCHEIDUNGEN (Albert)" not in pk or "bauen wie A." not in pk or "bauen wie B." not in pk:
            print("SELF-TEST FAIL: Entscheidungen nicht vollstaendig im Paket"); return 1

        # FAIL: E1 doppelt, E2 fehlt (der bisher fehlende Beweis gegen Scheinsicherheit)
        _pe_setup("pe-dup",
                  gh + "Produktentscheidung nötig [E1] für Entwurf A: a.\n"
                       "Produktentscheidung nötig [E2] für Entwurf B: b.\n",
                  "# x\n\n## E1\nStatus: A\nEntscheidung: x.\n\n## E1\nStatus: B\nEntscheidung: y.\n")
        if not _blocked("pe-dup", "E1 doppelt/E2 fehlt"): return 1

        # FAIL: doppelte Grok-ID (E1 zweimal im Gutachten) — eigener Testfall
        _pe_setup("pe-gdup",
                  gh + "Produktentscheidung nötig [E1] für Entwurf A: a.\n"
                       "Produktentscheidung nötig [E1] für Entwurf B: b.\n",
                  None)
        if not _blocked("pe-gdup", "doppelte Grok-ID"): return 1

        # FAIL: nicht zuordenbare Entscheidungs-ID (E9 statt E1)
        _pe_setup("pe-badid",
                  gh + "Produktentscheidung nötig [E1] für Entwurf A: a.\n",
                  "# x\n\n## E9\nStatus: A\nEntscheidung: x.\n")
        if not _blocked("pe-badid", "nicht zuordenbare ID"): return 1

        # FAIL: Grok-Fund ohne [E<k>]-ID
        _pe_setup("pe-noid",
                  gh + "Produktentscheidung nötig für Entwurf B: b.\n",
                  "# x\n\n## E1\nStatus: A\nEntscheidung: x.\n")
        if not _blocked("pe-noid", "Fund ohne ID"): return 1

        # Uebersprungen: E1 uebersprungen -> gruen, Warnung im Paket
        _pe_setup("pe-skip",
                  gh + "Produktentscheidung nötig [E1] für Entwurf B: b.\n",
                  "# Produktentscheidungen — pe-skip\n\n## E1\nBezug: b\nStatus: übersprungen\nEntscheidung:\n")
        if cmd_sonnet(root, "pe-skip", "PE Skip", write=True) != 0:
            print("SELF-TEST FAIL: PE-uebersprungen sollte gruen sein"); return 1
        if PE_UEBERSPRUNGEN_WARNUNG not in _pe_paket("pe-skip").read_text(encoding="utf-8"):
            print("SELF-TEST FAIL: Uebersprungen-Warnung fehlt im Paket"); return 1

        # NEW (AP-09g): Negativtest — Vorlage ohne Quellensperre-Marker verhindert JEDE Sonnet-Ausgabe.
        nomark = "self-test-nomark"
        psy2 = root / "tests" / "scratch" / nomark / "psychosprint"
        psy2.mkdir(parents=True)
        (psy2 / "01-sol.md").write_text(_raw_stub(nomark, "sol", "Eins"), encoding="utf-8")
        (psy2 / "02-fable.md").write_text(_raw_stub(nomark, "fable", "Zwei"), encoding="utf-8")
        (psy2 / "grok-gegenkritik.md").write_text(
            "# Gegenkritik\nEntwurf A und Entwurf B.\nfür Entwurf A: x.\n", encoding="utf-8")
        (root / TPL_REL["sonnet"]).write_text("# Sonnet ohne Marker\nGenau zwei Mockups.\n", encoding="utf-8")
        if cmd_sonnet(root, nomark, "No Mark", write=True) == 0:
            print("SELF-TEST FAIL: fehlender Marker haette abbrechen muessen"); return 1
        md2 = root / "tests" / "scratch" / nomark / "mockup-duell"
        if (md2 / "SONNET_AUFTRAG.md").exists() or (md2 / "SONNET_EINGABEPAKET.md").exists():
            print("SELF-TEST FAIL: Sonnet-Ausgabe trotz fehlendem Marker"); return 1

        # NEW (AP-09f): Beweis: im echten Repo wurde nichts angelegt (neue Werkstatt-Zielpfade)
        for leak in (REPO_ROOT / "tests" / "scratch" / slug / "psychosprint" / "PSYCHOSPRINT_AUFTRAG.md",
                     REPO_ROOT / "tests" / "scratch" / slug / "mockup-duell" / "SONNET_AUFTRAG.md"):
            if leak.exists():
                print(f"SELF-TEST FAIL: Repo-Datei erzeugt: {leak}"); return 1

    print("SELF-TEST OK: prepare, grok-paket, sonnet-paket inkl. Nicht-Ueberschreiben; kein Repo-Write.")
    return 0


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Deterministisches Arbeitsgeruest fuer den App-Fabrik-Zweier-Psychosprint.")
    parser.add_argument("--self-test", action="store_true",
                        help="Vollstaendiges Minimalbeispiel in einem Temp-Ordner; kein Repo-Write.")
    sub = parser.add_subparsers(dest="cmd")

    p = sub.add_parser("prepare", help="Einen gemeinsamen Psychosprint-Prompt fuellen; Werkstattordner anlegen.")
    p.add_argument("--slug", required=True)
    p.add_argument("--app-name", default=None, help="Optional; nur fuer die Dry-Run-Ausgabe.")
    p.add_argument("--mini-spec", required=True)
    p.add_argument("--write", action="store_true")

    g = sub.add_parser("grok-paket", help="Rohtexte anonymisieren (A=Sol, B=Fable) + Grok-Auftrag (Werkstatt).")
    g.add_argument("--slug", required=True)
    g.add_argument("--app-name", default=None, help="Optional; Default = Slug.")
    g.add_argument("--write", action="store_true")

    s = sub.add_parser("sonnet-paket", help="Rohtexte + Grok-Gutachten unveraendert zusammenfuehren.")
    s.add_argument("--slug", required=True)
    s.add_argument("--app-name", default=None, help="Optional; Default = Slug.")
    s.add_argument("--write", action="store_true")

    args = parser.parse_args()

    if args.self_test:
        return self_test()

    if args.cmd == "prepare":
        return cmd_prepare(REPO_ROOT, args.slug, args.app_name, args.mini_spec, args.write)
    if args.cmd == "grok-paket":
        return cmd_grok(REPO_ROOT, args.slug, args.app_name or args.slug, args.write)
    if args.cmd == "sonnet-paket":
        return cmd_sonnet(REPO_ROOT, args.slug, args.app_name or args.slug, args.write)

    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
