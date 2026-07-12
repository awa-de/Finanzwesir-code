#!/usr/bin/env python3
"""
Liest BACKLOG-ARCHIV.md (+ ggf. rotierte Jahres-Segmente BACKLOG-ARCHIV-YYYY.md)
und gibt alle seit --since abgeschlossenen APs aus.
Ausgabe:
  ABGESCHLOSSEN_SEIT: N
  AP_IDS: id1, id2, ...

Hintergrund: tools/rotate-table-log.py verschiebt aeltere Zeilen aus der aktiven
Datei in Jahres-Segmente (RITUAL-OPT-2 Punkt 9). Ohne diese Segmente mit
einzubeziehen wuerde eine --since-Abfrage, die vor den Rotations-Schnitt faellt,
Ergebnisse aus rotierten Zeilen still verlieren. Segmente fuer Jahre vor
--since.year koennen keine passenden Zeilen enthalten (jedes Segment ist nach
Jahr sortenrein) und werden uebersprungen.
"""
import argparse
import re
import sys
from datetime import date
from pathlib import Path

for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

SEGMENT_YEAR_RE = re.compile(r"-(\d{4})\.md$")


def parse_rows(path: Path, since: date) -> list[str]:
    results = []
    for line in path.read_text(encoding="utf-8").splitlines():
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
    return results


def main():
    parser = argparse.ArgumentParser(description="BACKLOG-ARCHIV Datumsabfrage (inkl. Jahres-Segmente)")
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

    files_to_scan = [archiv_path]
    for candidate in archiv_path.parent.glob(f"{archiv_path.stem}-*.md"):
        m = SEGMENT_YEAR_RE.search(candidate.name)
        if not m:
            continue
        if int(m.group(1)) >= since.year:
            files_to_scan.append(candidate)

    results: list[str] = []
    for f in files_to_scan:
        results.extend(parse_rows(f, since))

    print(f"ABGESCHLOSSEN_SEIT: {len(results)}")
    print(f"AP_IDS: {', '.join(results) if results else 'keine'}")


if __name__ == "__main__":
    main()
