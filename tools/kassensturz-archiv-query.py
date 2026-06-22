#!/usr/bin/env python3
"""
Liest BACKLOG-ARCHIV.md und gibt alle seit --since abgeschlossenen APs aus.
Ausgabe:
  ABGESCHLOSSEN_SEIT: N
  AP_IDS: id1, id2, ...
"""
import argparse
import sys
from datetime import date
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="BACKLOG-ARCHIV Datumsabfrage")
    parser.add_argument("--since", required=True, help="ISO-Datum YYYY-MM-DD (exklusiv)")
    parser.add_argument(
        "--archiv",
        default="docs/steering/BACKLOG-ARCHIV.md",
        help="Pfad zu BACKLOG-ARCHIV.md",
    )
    args = parser.parse_args()

    try:
        since = date.fromisoformat(args.since)
    except ValueError:
        print(f"Fehler: --since muss ISO-Datum sein (YYYY-MM-DD), erhalten: {args.since}", file=sys.stderr)
        sys.exit(1)

    archiv_path = Path(args.archiv)
    if not archiv_path.exists():
        print(f"Fehler: Datei nicht gefunden: {archiv_path}", file=sys.stderr)
        sys.exit(1)

    results = []
    for line in archiv_path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("|"):
            continue
        parts = [p.strip() for p in line.split("|")]
        # Mindestens 7 Teile: ['', ID, Bereich, Titel..., Abgeschlossen, Session, '']
        if len(parts) < 7:
            continue
        ap_id = parts[1]
        abgeschlossen_str = parts[-3]  # von rechts: robust gegen Pipes im Titel
        # Header- und Separator-Zeilen überspringen
        if not ap_id or ap_id.startswith("-") or abgeschlossen_str.startswith("-"):
            continue
        if ap_id == "ID":
            continue
        try:
            abgeschlossen = date.fromisoformat(abgeschlossen_str)
        except ValueError:
            continue
        if abgeschlossen > since:
            results.append(ap_id)

    print(f"ABGESCHLOSSEN_SEIT: {len(results)}")
    print(f"AP_IDS: {', '.join(results) if results else 'keine'}")


if __name__ == "__main__":
    main()
