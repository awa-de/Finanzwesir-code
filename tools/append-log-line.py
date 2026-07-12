#!/usr/bin/env python
"""
tools/append-log-line.py

Haengt read-frei (fuer das Modell) genau eine Zeile ans ENDE einer append-only-Datei.

Das Modell uebergibt nur den Zielpfad und die fertige Literal-Zeile; die Zieldatei
wird nie in den Modell-Kontext gelesen. Das eventuelle Lesen fuer Dubletten-Pruefung
und Zeilenende-Erkennung passiert in Python und kostet keine Modell-Tokens.

Prinzip (Event-Sourcing / Log-Append): oeffnen, ans Ende haengen, fertig. Neueste
Eintraege stehen unten. Bestehende Zeilen werden nie veraendert. Gedacht fuer
BACKLOG-ARCHIV.md, session-log.md, DECISION-LOG.md und aehnliche append-only-Logs.

Optionale Dublettensperre: --unless-contains "<ID>" bricht das Anhaengen ab (Exit 0,
SKIP), wenn die ID schon in der Datei steht — verhindert Doppel-Archivierung
desselben AP.

Nur Python-Standardbibliothek. Keine Netzwerkzugriffe.

Nutzung:
    python tools/append-log-line.py docs/steering/BACKLOG-ARCHIV.md \
        --line "| AP-x | Bereich | Ergebnis | 2026-07-12 | Session |" \
        --unless-contains "AP-x"
    python tools/append-log-line.py .claude/learning/session-log.md \
        --line "### 2026-07-12 — AP-x abgeschlossen"

Exit 0 = angehaengt, oder bewusst uebersprungen (Dublette).
Exit 1 = Fehler (Datei fehlt, leere Zeile, Zeilenumbruch in --line).
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Read-frei eine Zeile ans Ende einer append-only-Datei haengen."
    )
    parser.add_argument("file", help="Zieldatei (append-only-Log).")
    parser.add_argument("--line", required=True, help="Die anzuhaengende Literal-Zeile (ohne Zeilenumbruch).")
    parser.add_argument("--unless-contains",
                        help="Wenn dieser Text schon in der Datei steht: nichts anhaengen (Dublettensperre).")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.is_file():
        print(f"FAIL: Datei nicht gefunden: {path}")
        return 1
    if not args.line.strip():
        print("FAIL: --line ist leer.")
        return 1
    if "\n" in args.line or "\r" in args.line:
        print("FAIL: --line enthaelt einen Zeilenumbruch; es ist genau eine Zeile erlaubt.")
        return 1

    content = path.read_text(encoding="utf-8", newline="")
    nl = "\r\n" if "\r\n" in content else "\n"

    if args.unless_contains and args.unless_contains in content:
        print(f"SKIP: {args.unless_contains!r} steht bereits in {path.name} — nichts angehaengt.")
        return 0

    # Sicherstellen, dass die neue Zeile auf einer eigenen Zeile beginnt.
    prefix = ""
    if content and not content.endswith(("\n", "\r")):
        prefix = nl
    with open(path, "a", encoding="utf-8", newline="") as fh:
        fh.write(prefix + args.line + nl)

    print(f"OK: 1 Zeile an {path.name} angehaengt (ans Ende, read-frei).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
