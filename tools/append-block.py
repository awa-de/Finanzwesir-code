#!/usr/bin/env python
"""
tools/append-block.py

Haengt read-frei (fuer das Modell) einen mehrzeiligen Block ans ENDE einer
header-delimitierten Markdown-Datei (z. B. docs/steering/DECISION-LOG.md).

Analog zu append-log-line.py, aber fuer BLOECKE statt Einzelzeilen: append-
log-line.py lehnt jeden Text mit Zeilenumbruch bewusst ab ("genau eine Zeile
erlaubt") und passt deshalb nicht zu Dateien wie DECISION-LOG.md, deren
Eintraege mehrzeilige Abschnitte (## D-XX, mehrere #### Unterpunkte) sind.

Der Block-Text kommt aus einer separaten Datei (--block-file), nicht als
Kommandozeilen-Argument -- so muessen Anfuehrungszeichen, Backticks oder
Zeilenumbrueche im Inhalt (Zitate, Code-Referenzen, Markdown-Formatierung
innerhalb einer Decision) nicht durch Shell-Escaping laufen. Das Modell
schreibt den neuen Block ganz normal mit dem Write-Tool in eine Scratch-Datei
und uebergibt nur deren Pfad -- die ZIELDATEI selbst wird nie gelesen; nur das
Anhaengen (Trennlinie + Block) passiert in Python.

Fuegt vor dem Block automatisch eine Trennlinie "---" + Leerzeile ein (sofern
die Zieldatei nicht leer ist) -- das ist die bestehende visuelle Konvention in
DECISION-LOG.md zwischen Eintraegen, damit der Aufrufer sie nicht jedes Mal
selbst anhaengen muss.

Optionale Dublettensperre: --unless-contains "<Text>" bricht das Anhaengen ab
(Exit 0, SKIP), wenn der Text schon in der Datei steht -- verhindert doppeltes
Anhaengen derselben Decision-ID.

Nur Python-Standardbibliothek. Keine Netzwerkzugriffe.

Nutzung:
    python tools/append-block.py docs/steering/DECISION-LOG.md \
        --block-file scratch/neue-decision.md --unless-contains "D-42"

Exit 0 = angehaengt, oder bewusst uebersprungen (Dublette).
Exit 1 = Fehler (Zieldatei oder Block-Datei fehlt, Block-Datei leer).
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
        description="Read-frei einen mehrzeiligen Block ans Ende einer header-delimitierten Markdown-Datei haengen."
    )
    parser.add_argument("file", help="Zieldatei (z.B. docs/steering/DECISION-LOG.md).")
    parser.add_argument("--block-file", required=True,
                        help="Datei mit dem fertigen Block-Text (wird 1:1 angehaengt).")
    parser.add_argument("--unless-contains",
                        help="Wenn dieser Text schon in der Zieldatei steht: nichts anhaengen (Dublettensperre).")
    args = parser.parse_args()

    path = Path(args.file)
    if not path.is_file():
        print(f"FAIL: Zieldatei nicht gefunden: {path}")
        return 1

    block_path = Path(args.block_file)
    if not block_path.is_file():
        print(f"FAIL: Block-Datei nicht gefunden: {block_path}")
        return 1

    block = block_path.read_text(encoding="utf-8")
    if not block.strip():
        print("FAIL: Block-Datei ist leer.")
        return 1

    content = path.read_text(encoding="utf-8", newline="")
    nl = "\r\n" if "\r\n" in content else "\n"

    if args.unless_contains and args.unless_contains in content:
        print(f"SKIP: {args.unless_contains!r} steht bereits in {path.name} — nichts angehaengt.")
        return 0

    block_norm = block.strip("\n")
    if content.strip() == "":
        piece = block_norm + nl
    else:
        prefix = "" if content.endswith(("\n\n", "\r\n\r\n")) else (nl if content.endswith(("\n", "\r")) else nl + nl)
        piece = prefix + "---" + nl + nl + block_norm + nl

    with open(path, "a", encoding="utf-8", newline="") as fh:
        fh.write(piece)

    print(f"OK: Block an {path.name} angehaengt (ans Ende, read-frei, {len(block_norm.splitlines())} Zeilen).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
