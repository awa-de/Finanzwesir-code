#!/usr/bin/env python
"""
tools/rotate-log.py

Haelt einen header-delimitierten Markdown-Log (z. B. .claude/learning/session-log.md)
klein: behaelt die letzten N Eintraege im aktiven File und verschiebt den aelteren
Ueberhang BLOCKWEISE in ein Jahres-Segment (nach dem Datum im Block-Header gruppiert).

Ein "Eintrag" ist ein Block, der mit einer Markdown-Ueberschrift `## ` oder `### `
beginnt und bis zur naechsten solchen Ueberschrift reicht. Die Praeambel vor dem
ersten Header (Titel, Legende) bleibt immer im aktiven File.

Nichts geht verloren: der Ueberhang wird an `<archive-dir>/<prefix>-YYYY.md` angehaengt
(read-frei fuer das Modell — das Lesen/Schreiben passiert in Python), nicht geloescht.

Regeln:
  - behalte die letzten --keep-last Bloecke (Default 12),
  - aber hoechstens so viele, dass das aktive File <= --max-kb bleibt (Default 8),
  - der Rest wandert, nach Jahr gruppiert, ans Ende des jeweiligen Segments.

Nur Python-Standardbibliothek.

Nutzung:
    python tools/rotate-log.py .claude/learning/session-log.md
    python tools/rotate-log.py .claude/learning/session-log.md --keep-last 12 --max-kb 8
    python tools/rotate-log.py .claude/learning/session-log.md --dry-run
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

HEADER_RE = re.compile(r"^#{2,3}\s")
DATE_RE = re.compile(r"(\d{4})-\d{2}-\d{2}")


def split_blocks(lines: list[str]) -> tuple[list[str], list[list[str]]]:
    """Praeambel (vor dem ersten Header) + Liste von Bloecken."""
    first = next((i for i, ln in enumerate(lines) if HEADER_RE.match(ln)), len(lines))
    preamble = lines[:first]
    blocks: list[list[str]] = []
    cur: list[str] = []
    for ln in lines[first:]:
        if HEADER_RE.match(ln):
            if cur:
                blocks.append(cur)
            cur = [ln]
        else:
            cur.append(ln)
    if cur:
        blocks.append(cur)
    return preamble, blocks


def main() -> int:
    ap = argparse.ArgumentParser(description="Header-Log rotieren: letzte N behalten, Ueberhang ins Jahres-Segment.")
    ap.add_argument("file")
    ap.add_argument("--keep-last", type=int, default=12)
    ap.add_argument("--max-kb", type=float, default=8.0)
    ap.add_argument("--archive-dir", default=None,
                    help="Zielordner fuer Segmente (Default: <dir>/<stem>-archiv).")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    path = Path(args.file)
    if not path.is_file():
        print(f"FAIL: Datei nicht gefunden: {path}")
        return 1

    raw = path.read_text(encoding="utf-8", newline="")
    nl = "\r\n" if "\r\n" in raw else "\n"
    lines = raw.splitlines(keepends=True)
    preamble, blocks = split_blocks(lines)

    # Jahr je Block: undatierte Header (z. B. "AP-Wechsel"-Marker) erben das Jahr
    # des vorigen datierten Blocks; Fallback = haeufigstes Jahr im File.
    dated = [DATE_RE.search(b[0]).group(1) for b in blocks if DATE_RE.search(b[0])]
    fallback_year = max(set(dated), key=dated.count) if dated else "unbekannt"
    years: list[str] = []
    last_year: str | None = None
    for b in blocks:
        m = DATE_RE.search(b[0])
        if m:
            last_year = m.group(1)
        years.append(last_year or fallback_year)

    max_bytes = int(args.max_kb * 1024)
    pre_bytes = len("".join(preamble).encode("utf-8"))

    # wie viele der juengsten Bloecke behalten? Start bei keep-last, runter bis max-kb passt.
    keep = min(args.keep_last, len(blocks))
    while keep > 1:
        kept_bytes = pre_bytes + len("".join("".join(b) for b in blocks[-keep:]).encode("utf-8"))
        if kept_bytes <= max_bytes:
            break
        keep -= 1

    overflow = blocks[:len(blocks) - keep]
    kept = blocks[len(blocks) - keep:]

    if not overflow:
        print(f"OK: keine Rotation noetig ({len(blocks)} Eintraege, "
              f"{len(raw.encode('utf-8'))/1024:.1f} KB <= Grenzen {args.keep_last}/{args.max_kb:.0f} KB).")
        return 0

    archive_dir = Path(args.archive_dir) if args.archive_dir else path.with_name(path.stem + "-archiv")
    stem = path.stem

    # Ueberhang nach Jahr gruppieren (Reihenfolge erhalten)
    by_year: dict[str, list[list[str]]] = {}
    for i, b in enumerate(overflow):
        by_year.setdefault(years[i], []).append(b)

    new_active = "".join(preamble) + "".join("".join(b) for b in kept)

    print(f"{'DRY-RUN' if args.dry_run else 'ROTATE'}: {len(blocks)} Eintraege -> {keep} behalten, "
          f"{len(overflow)} in Segmente.")
    print(f"  aktiv: {len(raw.encode('utf-8'))/1024:.1f} KB -> {len(new_active.encode('utf-8'))/1024:.1f} KB")
    for year, blist in sorted(by_year.items()):
        seg = archive_dir / f"{stem}-{year}.md"
        print(f"  -> {seg}  (+{len(blist)} Eintraege)")

    if args.dry_run:
        return 0

    archive_dir.mkdir(parents=True, exist_ok=True)
    for year, blist in sorted(by_year.items()):
        seg = archive_dir / f"{stem}-{year}.md"
        chunk = "".join("".join(b) for b in blist)
        if seg.exists():
            prev = seg.read_text(encoding="utf-8", newline="")
            prefix = "" if (not prev or prev.endswith(("\n", "\r"))) else nl
            with open(seg, "a", encoding="utf-8", newline="") as fh:
                fh.write(prefix + chunk)
        else:
            head = f"# Session-Log-Archiv {year}{nl}(Rotiert aus {path.name}; append-only, aelteste oben.){nl}{nl}"
            seg.write_text(head + chunk, encoding="utf-8", newline="")

    path.write_text(new_active, encoding="utf-8", newline="")
    print(f"OK: rotiert. Aktives File jetzt {keep} Eintraege.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
