#!/usr/bin/env python
"""
tools/check-project-status-hook-meta.py

Read-only Verriegelung fuer den HOOK-META-Block in PROJECT-STATUS.md.

Prueft den maschinenlesbaren HOOK-META-Kommentarblock deterministisch gegen ein
festes Schema. Jede Abweichung, die auf stille Drift hindeutet, fuehrt zu Exit 1
(lauter Abbruch) - das Abschluss-Ritual MUSS dann stoppen.

Harte Regeln (Exit 1):
  - Feld-Whitelist: nur die bekannten Schema-Felder sind erlaubt. Jedes unbekannte
    Feld (z. B. das historische Phantom-Feld 'Nebenabschluss') wird abgewiesen.
  - Pflichtfelder muessen vorhanden sein.
  - Feldlaengen: Fokus-AP <= 160, Naechster-Schritt <= 240 Zeichen.
  - Gesamtblock <= 600 Zeichen (Narrativ gehoert in den sichtbaren Textkoerper).
  - Gesamtdatei <= 50 KB (der Snapshot darf kein Log werden).
  - Kein doppeltes Feld, keine Zeile ausserhalb des 'Feld: Wert'-Formats.
  - Optionaler Erwartungsabgleich (--expect-current-ap / --expect-date).

Weiche Hinweise (WARN, Exit bleibt 0):
  - Naechster-Schritt ohne Kettensignal (Erledigt-Haken + Datum).
  - Stand kein reines YYYY-MM-DD.
  - Datei > 30 KB (Snapshot beginnt zu wuchern).

Hintergrund: Das Feld 'Nebenabschluss' wurde am 2026-07-01 ausserhalb des Schemas
eingefuehrt und wuchs unbemerkt auf ~14.000 Zeichen, weil das Schema nie maschinell
durchgesetzt war. Dieser Check ist der Riegel dagegen (2026-07-12).

Nur Python-Standardbibliothek. Keine Netzwerkzugriffe.

Nutzung:
    python tools/check-project-status-hook-meta.py
    python tools/check-project-status-hook-meta.py PROJECT-STATUS.md
    python tools/check-project-status-hook-meta.py PROJECT-STATUS.md \
        --expect-current-ap AP-tailwind-01 --expect-date 2026-07-12
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# Konsolen-Encoding haerten: der HOOK-META-Block enthaelt Zeichen (Erledigt-Haken,
# Umlaute), die cp1252-Konsolen sonst beim Ausgeben zum Absturz bringen.
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

MANDATORY_FIELDS = ["Version", "Stand", "Fokus-AP", "Nächster-Schritt", "Blocker"]
OPTIONAL_FIELDS = ["Letzter-Distill", "Kassensturz-Datum"]
ALLOWED_FIELDS = MANDATORY_FIELDS + OPTIONAL_FIELDS

MAX_FIELD_LEN = {"Fokus-AP": 160, "Nächster-Schritt": 240}
MAX_BLOCK_CHARS = 600
FILE_WARN_BYTES = 30 * 1024
FILE_FAIL_BYTES = 50 * 1024

BLOCK_RE = re.compile(r"<!-- HOOK-META\r?\n(.*?)\r?\n-->", re.DOTALL)
FIELD_RE = re.compile(r"^([^:]+):\s*(.*)$")
DATE_RE = re.compile(r"\d{4}-\d{2}-\d{2}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="HOOK-META-Verriegelung fuer PROJECT-STATUS.md (read-only)."
    )
    parser.add_argument("file", nargs="?", default="PROJECT-STATUS.md",
                        help="Pfad zur PROJECT-STATUS.md (Standard: PROJECT-STATUS.md).")
    parser.add_argument("--expect-current-ap",
                        help="Ritual-Erwartung: dieser AP muss im Naechster-Schritt-Kettensignal stehen.")
    parser.add_argument("--expect-date",
                        help="Ritual-Erwartung: dieses Datum muss im Naechster-Schritt-Kettensignal stehen.")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.is_file():
        print(f"FAIL: Datei nicht gefunden: {path}")
        return 1

    text = path.read_text(encoding="utf-8")
    match = BLOCK_RE.search(text)
    if match is None:
        print("FAIL: Kein HOOK-META-Block (<!-- HOOK-META ... -->) gefunden.")
        return 1

    inner = match.group(1)
    full_block = match.group(0)

    hard: list[str] = []   # harte Verletzungen -> Exit 1
    warn: list[str] = []   # Hinweise

    size = len(text.encode("utf-8"))
    if size > FILE_FAIL_BYTES:
        hard.append(
            f"PROJECT-STATUS.md zu gross: {size / 1024:.1f} KB (max {FILE_FAIL_BYTES // 1024} KB). "
            "Der Snapshot wuchert wie ein Log — alte Eintraege gehoeren ins Archiv "
            "(BACKLOG-ARCHIV.md / session-log.md), nicht hierher."
        )
    elif size > FILE_WARN_BYTES:
        warn.append(
            f"PROJECT-STATUS.md wird gross: {size / 1024:.1f} KB (WARN ab {FILE_WARN_BYTES // 1024} KB). "
            "Bald alte Eintraege ins Archiv verschieben."
        )

    if len(full_block) > MAX_BLOCK_CHARS:
        hard.append(
            f"HOOK-META-Block zu gross: {len(full_block)} Zeichen (max {MAX_BLOCK_CHARS}). "
            "Narrativ gehoert in den sichtbaren Textkoerper, nicht in den Maschinenblock."
        )

    fields: dict[str, str] = {}
    order: list[str] = []
    for raw in inner.split("\n"):
        line = raw.rstrip("\r")
        if not line.strip():
            continue
        fm = FIELD_RE.match(line)
        if not fm:
            hard.append(f"Zeile ist kein 'Feld: Wert'-Paar: {line!r}")
            continue
        key = fm.group(1).strip()
        val = fm.group(2).strip()
        if key in fields:
            hard.append(f"Feld doppelt: {key!r}")
        fields[key] = val
        order.append(key)

    # Whitelist: unbekannte Felder = lauter Fail (Anti-Phantom-Riegel).
    for key in order:
        if key not in ALLOWED_FIELDS:
            hard.append(
                f"Unbekanntes HOOK-META-Feld: {key!r}. Erlaubt sind ausschliesslich: "
                f"{', '.join(ALLOWED_FIELDS)}. Kein neues Feld ohne bewusste Schema-Aenderung "
                "(Lehre aus dem Phantom-Feld 'Nebenabschluss', 2026-07-12)."
            )

    for key in MANDATORY_FIELDS:
        if key not in fields:
            hard.append(f"Pflichtfeld fehlt: {key!r}")

    for key, limit in MAX_FIELD_LEN.items():
        if key in fields and len(fields[key]) > limit:
            hard.append(f"Feld {key!r} zu lang: {len(fields[key])} Zeichen (max {limit}).")

    naechster = fields.get("Nächster-Schritt", "")
    if naechster:
        if "✅" not in naechster:
            warn.append("Nächster-Schritt ohne Kettensignal (Erledigt-Haken des CURRENT-AP).")
        if not DATE_RE.search(naechster):
            warn.append("Nächster-Schritt ohne Datum (YYYY-MM-DD) im Kettensignal.")

    stand = fields.get("Stand", "")
    if stand and not DATE_RE.fullmatch(stand):
        warn.append(f"Stand ist kein reines YYYY-MM-DD-Datum: {stand!r}")

    if args.expect_current_ap and args.expect_current_ap not in naechster:
        hard.append(
            f"Nächster-Schritt nennt den erwarteten CURRENT-AP {args.expect_current_ap!r} nicht."
        )
    if args.expect_date and args.expect_date not in naechster:
        hard.append(
            f"Nächster-Schritt nennt das erwartete Datum {args.expect_date!r} nicht."
        )

    for message in warn:
        print(f"WARN: {message}")
    if hard:
        for message in hard:
            print(f"FAIL: {message}")
        print(f"\nHOOK-META VERRIEGELT: {len(hard)} harte Verletzung(en). Abschluss-Ritual STOPP.")
        return 1

    print(f"OK: HOOK-META schema-konform ({len(full_block)} Zeichen; Felder: {', '.join(order)}).")
    if warn:
        print(f"    {len(warn)} Hinweis(e) - siehe WARN oben.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
