#!/usr/bin/env python
"""
tools/rotate-table-log.py

Haelt eine append-only Markdown-Tabelle (z. B. docs/steering/BACKLOG-ARCHIV.md)
klein: behaelt die Zeilen mit den juengsten Daten im aktiven File und verschiebt
aeltere Zeilen -- nach Jahr gruppiert -- in ein Jahres-Segment `<stem>-YYYY.md`
im selben Ordner.

WICHTIG: Auswahl nach DATUM, nicht nach physischer Position. BACKLOG-ARCHIV.md
dokumentiert selbst, dass der Altbestand vor der Append-only-Umstellung
(2026-07-12) in umgekehrter Reihenfolge steht (neueste oben statt unten).
Eine rein positionsbasierte "letzte N Zeilen"-Rotation wuerde in diesem
Altbestand teils neuere Zeilen archivieren und aeltere aktiv lassen -- und
wuerde damit den Datumsfilter in .claude/hooks/session-start.ps1
("Archiv-seit-Log", liest nur die aktive Datei) stillschweigend falsch
machen. Deshalb: Zeilen nach ihrem eigenen Datum sortieren, die global
aeltesten zuerst entfernen, unabhaengig davon wo sie im File stehen.

Format-Erwartung: jede Datenzeile ist eine GFM-Tabellenzeile `| ... |`, die
zweitletzte Zelle ist ein Datum `YYYY-MM-DD` (Format `| ... | YYYY-MM-DD |
<letzte Spalte> |`) -- exakt das Format, das BACKLOG-ARCHIV.md nutzt (Spalte
"Abgeschlossen"). Eine Datenzeile ohne dieses Muster ist ein Formatfehler ->
FAIL, keine Ratelogik.

Praeambel (Titel/Intro-Text bis einschliesslich Tabellen-Trennzeile) bleibt
immer im aktiven File unveraendert. Fuer neue Jahres-Segmente wird ein
eigener kurzer Kopf plus dieselbe Tabellen-Kopf-/Trennzeile erzeugt (damit
das Segment eigenstaendig lesbar bleibt).

Die im aktiven File VERBLEIBENDEN Zeilen behalten ihre urspruengliche
relative Reihenfolge (nur Entfernen, kein Neusortieren) -- minimaler Diff,
konsistent mit der bestehenden "physische Reihenfolge ist fuer die Forensik
unerheblich"-Konvention der Datei.

Nichts geht verloren: der Ueberhang wird an das Jahres-Segment angehaengt
(read-frei fuer das Modell -- das Lesen/Schreiben passiert in Python).

Nur Python-Standardbibliothek.

Nutzung:
    python tools/rotate-table-log.py docs/steering/BACKLOG-ARCHIV.md --dry-run
    python tools/rotate-table-log.py docs/steering/BACKLOG-ARCHIV.md
    python tools/rotate-table-log.py docs/steering/BACKLOG-ARCHIV.md --keep-last 150 --max-kb 20
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding="utf-8")
    except (AttributeError, ValueError):
        pass

ROW_RE = re.compile(r"^\|.*\|\s*$")
SEP_RE = re.compile(r"^\|[-:\s|]+\|\s*$")
DATE_RE = re.compile(r"\|\s*(\d{4}-\d{2}-\d{2})\s*\|\s*[^|]*\|\s*$")


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Append-only Markdown-Tabelle rotieren: Zeilen mit den juengsten Daten behalten, aeltere ins Jahres-Segment."
    )
    ap.add_argument("file")
    ap.add_argument("--keep-last", type=int, default=190,
                    help="Max. Anzahl Datenzeilen im aktiven File (Default 190, passend zum dokumentierten '>200 Zeilen'-Trigger).")
    ap.add_argument("--max-kb", type=float, default=30.0,
                    help="Max. Groesse des aktiven Files in KB (zusaetzliche Grenze, Default 30).")
    ap.add_argument("--archive-dir", default=None,
                    help="Zielordner fuer Jahres-Segmente (Default: gleicher Ordner wie die Quelldatei).")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    path = Path(args.file)
    if not path.is_file():
        print(f"FAIL: Datei nicht gefunden: {path}")
        return 1

    raw = path.read_text(encoding="utf-8", newline="")
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.splitlines(keepends=True)

    sep_idx = next((i for i, ln in enumerate(lines) if SEP_RE.match(ln.rstrip("\r\n"))), None)
    if sep_idx is None:
        print("FAIL: keine Tabellen-Trennzeile gefunden (erwarte z.B. |----|----|).")
        return 1
    if sep_idx == 0 or not ROW_RE.match(lines[sep_idx - 1].rstrip("\r\n")):
        print("FAIL: keine Tabellen-Kopfzeile direkt vor der Trennzeile gefunden.")
        return 1

    preamble = lines[:sep_idx + 1]
    table_header_lines = lines[sep_idx - 1:sep_idx + 1]  # Kopfzeile + Trennzeile
    data_lines = lines[sep_idx + 1:]

    rows: list[str] = []
    dates: list[str] = []
    for ln in data_lines:
        stripped = ln.rstrip("\r\n")
        if not stripped.strip():
            continue  # leere Zeile(n) am Dateiende ueberspringen
        if not ROW_RE.match(stripped):
            print(f"FAIL: Zeile ist keine Tabellenzeile: {stripped[:60]!r}")
            return 1
        m = DATE_RE.search(stripped)
        if not m:
            print(f"FAIL: Zeile ohne erkennbare Datumsspalte (zweitletzte Zelle): {stripped[:80]!r}")
            return 1
        rows.append(ln)
        dates.append(m.group(1))

    max_bytes = int(args.max_kb * 1024)
    pre_bytes = len("".join(preamble).encode("utf-8"))

    # Global aelteste zuerst entfernen (stabil bei Datums-Gleichstand: urspruengliche
    # Position entscheidet), bis BEIDE Grenzen eingehalten sind.
    order_oldest_first = sorted(range(len(rows)), key=lambda i: (dates[i], i))
    remove_set: set[int] = set()
    for idx in order_oldest_first:
        remaining_count = len(rows) - len(remove_set)
        remaining_bytes = pre_bytes + sum(
            len(rows[j].encode("utf-8")) for j in range(len(rows)) if j not in remove_set
        )
        if remaining_count <= args.keep_last and remaining_bytes <= max_bytes:
            break
        remove_set.add(idx)

    if not remove_set:
        print(f"OK: keine Rotation noetig ({len(rows)} Zeilen, "
              f"{len(raw.encode('utf-8'))/1024:.1f} KB <= Grenzen {args.keep_last}/{args.max_kb:.0f} KB).")
        return 0

    kept_indices = [i for i in range(len(rows)) if i not in remove_set]      # Originalreihenfolge erhalten
    overflow_indices = [i for i in range(len(rows)) if i in remove_set]     # dito fuer die Segmente

    archive_dir = Path(args.archive_dir) if args.archive_dir else path.parent
    stem = path.stem  # "BACKLOG-ARCHIV"

    by_year: dict[str, list[int]] = {}
    for i in overflow_indices:
        by_year.setdefault(dates[i][:4], []).append(i)

    new_active = "".join(preamble) + "".join(rows[i] for i in kept_indices)

    print(f"{'DRY-RUN' if args.dry_run else 'ROTATE'}: {len(rows)} Zeilen -> {len(kept_indices)} behalten, "
          f"{len(overflow_indices)} in Jahres-Segmente (Auswahl nach Datum, aelteste zuerst).")
    print(f"  aktiv: {len(raw.encode('utf-8'))/1024:.1f} KB -> {len(new_active.encode('utf-8'))/1024:.1f} KB")
    for year, idxs in sorted(by_year.items()):
        seg = archive_dir / f"{stem}-{year}.md"
        print(f"  -> {seg}  (+{len(idxs)} Zeilen, Daten {min(dates[i] for i in idxs)}..{max(dates[i] for i in idxs)})")

    if args.dry_run:
        return 0

    archive_dir.mkdir(parents=True, exist_ok=True)
    for year, idxs in sorted(by_year.items()):
        seg = archive_dir / f"{stem}-{year}.md"
        chunk = "".join(rows[i] for i in idxs)
        if seg.exists():
            prev = seg.read_text(encoding="utf-8", newline="")
            prefix = "" if (not prev or prev.endswith(("\n", "\r"))) else nl
            with open(seg, "a", encoding="utf-8", newline="") as fh:
                fh.write(prefix + chunk)
        else:
            head = (f"# {stem}-{year} – Jahres-Segment{nl}"
                    f"(Rotiert aus {path.name}; enthaelt abgeschlossene Items mit Abschluss-Datum in {year}. "
                    f"Reihenfolge wie im Ursprungs-File, append-only.){nl}{nl}")
            seg.write_text(head + "".join(table_header_lines) + chunk, encoding="utf-8", newline="")

    path.write_text(new_active, encoding="utf-8", newline="")
    print(f"OK: rotiert. Aktives File jetzt {len(kept_indices)} Zeilen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
