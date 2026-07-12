#!/usr/bin/env python
"""
tools/replace-matched-line.py

Ersetzt oder entfernt read-frei (fuer das Modell) genau eine Zeile, die einen
exakt angegebenen Substring enthaelt.

Das Modell uebergibt nur den Zielpfad, den Match-Text und (bei --replace-containing)
die fertige neue Zeile; die Zieldatei wird nie in den Modell-Kontext gelesen. Suchen,
Zaehlen und Schreiben passiert in Python und kostet keine Modell-Tokens.

Erzwingt Eindeutigkeit: bricht mit FAIL/Exit 1 ab, wenn der Match-Text in 0 oder
mehr als 1 Zeile vorkommt. Kein Rateverhalten, keine Teilkorrektur, keine stille
Mehrfachaenderung.

Modi (genau einer):
    --remove-containing "<Text>"                    Zeile komplett entfernen
    --replace-containing "<Text>" --with "<Zeile>"  Zeile durch neue Zeile ersetzen

Gedacht fuer NAVIGATION.md (AP-Status-Flip 🟡→✅) und BACKLOG.md
(erledigten AP-Eintrag entfernen) im Rahmen von /abschluss-ritual.

Nutzung:
    python tools/replace-matched-line.py NAVIGATION.md \
        --replace-containing "AP-x 🟡" --with "> AP-x ✅ 2026-07-12 — Ergebnis ..."
    python tools/replace-matched-line.py docs/steering/BACKLOG.md \
        --remove-containing "AP-x"

Exit 0 = genau 1 Zeile geaendert/entfernt.
Exit 1 = Fehler (Datei fehlt, 0 oder >1 Treffer, ungueltige Argumente).
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
        description="Read-frei genau eine Zeile per Substring-Match ersetzen oder entfernen."
    )
    parser.add_argument("file", help="Zieldatei.")
    parser.add_argument("--remove-containing",
                        help="Substring; die eine Zeile mit diesem Substring wird entfernt.")
    parser.add_argument("--replace-containing",
                        help="Substring; die eine Zeile mit diesem Substring wird ersetzt (erfordert --with).")
    parser.add_argument("--with", dest="with_line", help="Neue Zeile fuer --replace-containing.")
    args = parser.parse_args()

    if bool(args.remove_containing) == bool(args.replace_containing):
        print("FAIL: genau eine der Optionen --remove-containing ODER --replace-containing angeben.")
        return 1

    if args.replace_containing and not args.with_line:
        print("FAIL: --replace-containing erfordert --with.")
        return 1

    if args.with_line and ("\n" in args.with_line or "\r" in args.with_line):
        print("FAIL: --with enthaelt einen Zeilenumbruch; es ist genau eine Zeile erlaubt.")
        return 1

    path = Path(args.file)
    if not path.is_file():
        print(f"FAIL: Datei nicht gefunden: {path}")
        return 1

    content = path.read_text(encoding="utf-8", newline="")
    lines = content.splitlines(keepends=True)

    match_text = args.remove_containing or args.replace_containing
    matches = [i for i, line in enumerate(lines) if match_text in line]

    if len(matches) == 0:
        print(f"FAIL: kein Treffer fuer {match_text!r} in {path.name}.")
        return 1
    if len(matches) > 1:
        print(f"FAIL: {len(matches)} Treffer fuer {match_text!r} in {path.name} — nicht eindeutig.")
        return 1

    idx = matches[0]

    if args.remove_containing:
        del lines[idx]
        path.write_text("".join(lines), encoding="utf-8", newline="")
        print(f"OK: 1 Zeile entfernt fuer {match_text!r} in {path.name} (read-frei).")
        return 0

    old_line = lines[idx]
    ending = ""
    for candidate in ("\r\n", "\n", "\r"):
        if old_line.endswith(candidate):
            ending = candidate
            break
    lines[idx] = args.with_line + ending
    path.write_text("".join(lines), encoding="utf-8", newline="")
    print(f"OK: 1 Zeile ersetzt fuer {match_text!r} in {path.name} (read-frei).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
