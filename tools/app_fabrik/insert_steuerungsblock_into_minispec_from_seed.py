#!/usr/bin/env python3
"""
insert_steuerungsblock_into_minispec_from_seed.py

Deterministically inserts Steuerungsblock seeds from the central seed file
into MINI_SPEC_FROM_HAUPTDOKUMENT.md files for Batch-A apps.

Principles (AP-12b):
- Seed is source, MINI_SPEC_FROM_HAUPTDOKUMENT.md is target. APP_SPEC.md is never touched.
- No rewriting, no interpretation, no summarizing.
- Dry-run by default.
- Write only with --write.
- Fail fast per slug on missing file, missing seed, missing anchor, or existing block.

Anchor rule (AP-12a):
  Find the first H2 in the MINI_SPEC (app-ID header, e.g. "## A1 -- ...").
  Find the next heading (## or ###) after it.
  Insert immediately before that heading.
  This covers Pattern A (no --- after metadata, H3 first) and Pattern B (--- after metadata, H2 first).

Usage:
  python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py
  python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py --slug risiko-uebersetzer
  python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py --write
"""

from __future__ import annotations

import argparse
import difflib
import re
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

BATCH_A_SLUGS = [
    "risiko-uebersetzer",
    "crash-reaktions-test",
    "markt-kam-zurueck",
    "market-timing-simulator",
    "geburtsjahrlos",
    "der-alte-euro",
    "depot-kipppunkt",
]

DEFAULT_SEED_PATH = Path("Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md")
LOCAL_BLOCK_HEADING = "## Steuerungsblock: Zweck, Barriere, Prüfregeln"

# Positive markers: the planned local block MUST contain all of these.
POSITIVE_MARKERS = [
    LOCAL_BLOCK_HEADING,
    "**Diese App existiert, um:**",
    "**Zu entfernende psychologische Barriere:**",
    "**Falscher Glaubenssatz vorher:**",
    "**Zielzustand nach der App:**",
    "**Muss-Kriterien für jede Umsetzung:**",
    "**Nicht-Ziele / harte Verbote:**",
    "**LLM-Prüfscore pro Änderung:**",
    "Barriere-Abbau",
    "Zielzustand",
    "Nicht-Ziele",
    "Mentorrolle",
    "8/8",
    "6–7/8",   # 6–7/8
    "≤5/8",    # ≤5/8
]

# Negative markers: the planned local block MUST NOT contain any of these.
NEGATIVE_MARKERS = [
    "**Status:**",
    "**Verteilungsstatus:**",
    "**Klärungsbedarf vor Verteilung:**",
    "80%-Nordstern",
    "redaktioneller Nordstern",
    "LLM-Selbsttest",
    "alter 5-Fragen-Selbsttest",
]


# ---------------------------------------------------------------------------
# Exceptions
# ---------------------------------------------------------------------------

class PatchError(RuntimeError):
    """Fatal error — stops entire run."""


class SlugError(RuntimeError):
    """Per-slug error — slug skipped, others continue."""


# ---------------------------------------------------------------------------
# IO
# ---------------------------------------------------------------------------

def configure_utf8_stdio() -> None:
    """Make stdout/stderr UTF-8 safe under PowerShell."""
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except AttributeError:
            pass


def read_text(path: Path) -> str:
    if not path.exists():
        raise PatchError(f"Datei nicht gefunden: {path}")
    if not path.is_file():
        raise PatchError(f"Pfad ist keine Datei: {path}")
    return path.read_text(encoding="utf-8")


# ---------------------------------------------------------------------------
# Seed extraction
# ---------------------------------------------------------------------------

def remove_seed_management_fields(seed_body: str) -> str:
    """Remove fields that belong only in the seed file, not in local MINI_SPEC blocks.

    Removed: Status, Verteilungsstatus, Klärungsbedarf vor Verteilung.
    Kept: Rolle and all fachlich-psychological content.
    """
    body = seed_body

    # Single-line fields
    body = re.sub(r"^\*\*Status:\*\*\s*[^\n]*\n?", "", body, flags=re.M)
    body = re.sub(r"^\*\*Verteilungsstatus:\*\*\s*[^\n]*\n?", "", body, flags=re.M)

    # Multi-line section: Klärungsbedarf vor Verteilung
    # Remove from that heading through all following bullet lines until the next bold heading or EOF.
    body = re.sub(
        r"^\*\*Klärungsbedarf vor Verteilung:\*\*\s*\n.*?(?=^\*\*[^*\n]+:\*\*|\Z)",
        "",
        body,
        flags=re.M | re.S,
    )

    # Normalize excessive blank lines introduced by removals
    body = re.sub(r"\n{3,}", "\n\n", body)
    return body.strip()


def extract_seed_block(seed_text: str, slug: str) -> str:
    """Extract the per-slug block from the seed file and strip seed-only metadata."""
    pattern = re.compile(
        rf"^## {re.escape(slug)}\s*\n(?P<body>.*?)(?=^---\s*\n\s*## |\n# 4\. Repo-Abgleich|\Z)",
        re.M | re.S,
    )
    match = pattern.search(seed_text)
    if not match:
        raise SlugError(f"Seed-Block nicht gefunden: ## {slug}")

    body = match.group("body").strip()
    body = remove_seed_management_fields(body)

    if not body:
        raise SlugError(f"Seed-Block leer nach Bereinigung: {slug}")

    return body


def extract_score_block(seed_text: str) -> str:
    """Extract the standardized 4-criteria LLM score section (## 2.1) from the seed file."""
    pattern = re.compile(
        r"^## 2\.1 Standardisiertes Änderungsgate: LLM-Prüfscore pro Änderung\s*\n"
        r"(?P<body>.*?)(?=^---\s*\n\s*# 3\. Seed-Blöcke)",
        re.M | re.S,
    )
    match = pattern.search(seed_text)
    if not match:
        raise PatchError("Score-Abschnitt 2.1 nicht gefunden in der Seed-Datei.")

    body = match.group("body").strip()
    if not body:
        raise PatchError("Score-Abschnitt 2.1 ist leer.")

    return body


# ---------------------------------------------------------------------------
# Block construction
# ---------------------------------------------------------------------------

def build_local_block(slug: str, seed_path: Path, seed_body: str, score_body: str) -> str:
    return (
        f"{LOCAL_BLOCK_HEADING}\n"
        "\n"
        f"<!-- Quelle: {seed_path.as_posix()} / Seed {slug} -->\n"
        "<!-- Mechanisch eingefügt. Nicht frei formulieren. -->\n"
        "\n"
        f"{seed_body}\n"
        "\n"
        "---\n"
        "\n"
        f"{score_body}\n"
    )


# ---------------------------------------------------------------------------
# Anchor detection  (AP-12a rule)
# ---------------------------------------------------------------------------

def find_insert_offset(target_text: str, slug: str) -> tuple[int, str]:
    """Find the character offset before which the local block should be inserted.

    AP-12a rule:
    1. Find the first H2 line (app-ID header, e.g. "## A1 -- Risiko-Uebersetzer").
    2. Scan forward from the next line.
    3. The first line starting with ## or ### is the first fachliche section.
    4. Return the offset of that line's start + a hint string.

    Handles Pattern A (H3 first, no --- after metadata) and
    Pattern B (H2 first, --- after metadata) without branching.
    """
    if LOCAL_BLOCK_HEADING in target_text:
        raise SlugError(
            f"MINI_SPEC enthält bereits einen lokalen Steuerungsblock: {slug}"
        )

    lines = target_text.splitlines(keepends=True)

    # Step 1: find the first H2 line (the app-ID header)
    first_h2_idx: int | None = None
    for i, line in enumerate(lines):
        if line.startswith("## "):
            first_h2_idx = i
            break

    if first_h2_idx is None:
        raise SlugError(f"Kein App-H2-Header (## ...) gefunden: {slug}")

    # Step 2+3: find the next heading after the app-ID header
    insert_line_idx: int | None = None
    for i in range(first_h2_idx + 1, len(lines)):
        stripped = lines[i].rstrip("\n\r")
        if stripped.startswith("## ") or stripped.startswith("### "):
            insert_line_idx = i
            break

    if insert_line_idx is None:
        raise SlugError(
            f"Keine fachliche Sektion (## oder ###) nach App-H2-Header gefunden: {slug}"
        )

    # Convert line index to character offset
    offset = sum(len(lines[i]) for i in range(insert_line_idx))
    hint = f"vor Zeile {insert_line_idx + 1}: {lines[insert_line_idx].rstrip()[:60]}"
    return offset, hint


# ---------------------------------------------------------------------------
# Insert
# ---------------------------------------------------------------------------

def insert_block_at_offset(target_text: str, local_block: str, offset: int) -> str:
    """Insert local_block at offset, ensuring exactly one blank line before and after."""
    before = target_text[:offset]
    after = target_text[offset:]

    # Ensure before ends with exactly one blank line
    if not before.endswith("\n\n"):
        if before.endswith("\n"):
            before += "\n"
        else:
            before += "\n\n"

    # Ensure local_block ends with exactly one blank line
    block = local_block
    if not block.endswith("\n\n"):
        block = block.rstrip("\n") + "\n\n"

    return before + block + after


# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------

def validate_planned_block(block: str) -> tuple[list[str], list[str]]:
    """Return (missing_positive_markers, present_negative_markers)."""
    missing = [m for m in POSITIVE_MARKERS if m not in block]
    present = [m for m in NEGATIVE_MARKERS if m in block]
    return missing, present


# ---------------------------------------------------------------------------
# Diff
# ---------------------------------------------------------------------------

def unified_diff(old: str, new: str, path: Path) -> str:
    return "".join(
        difflib.unified_diff(
            old.splitlines(keepends=True),
            new.splitlines(keepends=True),
            fromfile=f"{path.as_posix()} (vorher)",
            tofile=f"{path.as_posix()} (nachher)",
        )
    )


# ---------------------------------------------------------------------------
# Per-slug result
# ---------------------------------------------------------------------------

class SlugResult:
    def __init__(self, slug: str) -> None:
        self.slug = slug
        self.target_found = False
        self.seed_found = False
        self.anchor_found = False
        self.anchor_hint = ""
        self.missing_positive: list[str] = []
        self.present_negative: list[str] = []
        self.validation_ok = False
        self.written = False
        self.status = "ROT"
        self.note = ""
        self.diff_text = ""

    @property
    def gruen(self) -> bool:
        return self.status == "GRÜN"


# ---------------------------------------------------------------------------
# Per-slug processing
# ---------------------------------------------------------------------------

def process_slug(
    slug: str,
    seed_text: str,
    seed_path: Path,
    score_body: str,
    write: bool,
) -> SlugResult:
    result = SlugResult(slug)
    target_path = Path("Apps") / slug / "MINI_SPEC_FROM_HAUPTDOKUMENT.md"

    # 1. Target file
    try:
        target_text = read_text(target_path)
        result.target_found = True
    except PatchError as e:
        result.note = str(e)
        return result

    # 2. Seed block
    try:
        seed_body = extract_seed_block(seed_text, slug)
        result.seed_found = True
    except SlugError as e:
        result.note = str(e)
        return result

    # 3. Build local block
    local_block = build_local_block(slug, seed_path, seed_body, score_body)

    # 4. Find anchor
    try:
        insert_offset, anchor_hint = find_insert_offset(target_text, slug)
        result.anchor_found = True
        result.anchor_hint = anchor_hint
    except SlugError as e:
        result.note = str(e)
        return result

    # 5. Validate planned block
    result.missing_positive, result.present_negative = validate_planned_block(local_block)
    result.validation_ok = (not result.missing_positive) and (not result.present_negative)

    if not result.validation_ok:
        issues: list[str] = []
        if result.missing_positive:
            issues.append(f"Pflichtmarker fehlen: {result.missing_positive}")
        if result.present_negative:
            issues.append(f"Verbotene Marker vorhanden: {result.present_negative}")
        result.note = " | ".join(issues)
        result.status = "GELB"
        return result

    # 6. Build new file text
    new_text = insert_block_at_offset(target_text, local_block, insert_offset)
    result.diff_text = unified_diff(target_text, new_text, target_path)

    # 7. Sanity: diff must exist
    if not result.diff_text:
        result.note = "Kein Diff erzeugt — unerwarteter Zustand."
        result.status = "ROT"
        return result

    result.status = "GRÜN"

    # 8. Write (only with --write)
    if write:
        target_path.write_text(new_text, encoding="utf-8", newline="\n")
        result.written = True
        result.note = "Geschrieben."
    else:
        result.note = "Dry-run."

    return result


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Insert Steuerungsblock seeds into Batch-A MINI_SPEC_FROM_HAUPTDOKUMENT.md files.\n"
            "Default: dry-run over all 7 Batch-A slugs. Use --write to apply."
        )
    )
    parser.add_argument(
        "--slug",
        default=None,
        metavar="SLUG",
        help="Process a single slug only.",
    )
    parser.add_argument(
        "--slugs",
        default=None,
        metavar="S1,S2,...",
        help="Comma-separated list of slugs to process.",
    )
    parser.add_argument(
        "--seed",
        default=str(DEFAULT_SEED_PATH),
        metavar="PATH",
        help=f"Seed file path. Default: {DEFAULT_SEED_PATH.as_posix()}",
    )
    parser.add_argument(
        "--write",
        action="store_true",
        help="Write changes to MINI_SPEC files. Without this flag, only a dry-run is performed.",
    )
    parser.add_argument(
        "--diff",
        action="store_true",
        help="Show unified diff per slug in dry-run mode.",
    )
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    configure_utf8_stdio()
    args = parse_args(argv)

    seed_path = Path(args.seed)

    # Determine slug list
    if args.slug:
        slugs = [args.slug.strip()]
    elif args.slugs:
        slugs = [s.strip() for s in args.slugs.split(",") if s.strip()]
    else:
        slugs = BATCH_A_SLUGS

    mode = "--write" if args.write else "DRY-RUN"
    print(f"Modus: {mode} | Slugs: {len(slugs)} | Seed: {seed_path.as_posix()}")
    print()

    # Load seed file
    try:
        seed_text = read_text(seed_path)
    except PatchError as e:
        print(f"STOP: {e}", file=sys.stderr)
        return 2

    # Extract shared score block (once)
    try:
        score_body = extract_score_block(seed_text)
    except PatchError as e:
        print(f"STOP: {e}", file=sys.stderr)
        return 2

    # Process each slug
    results: list[SlugResult] = []
    for slug in slugs:
        r = process_slug(slug, seed_text, seed_path, score_body, write=args.write)
        results.append(r)

        icon = {"GRÜN": "OK  ", "GELB": "WARN", "ROT": "FAIL"}[r.status]
        anchor_info = f"Anker: {r.anchor_hint}" if r.anchor_found else "Anker: NICHT GEFUNDEN"
        print(
            f"[{icon}] {r.slug}\n"
            f"       Ziel={r.target_found} Seed={r.seed_found} {anchor_info}\n"
            f"       Validierung={r.validation_ok} | {r.note}"
        )

        if args.diff and r.diff_text:
            print()
            # Show first 40 lines of diff to avoid flooding output
            diff_lines = r.diff_text.splitlines()
            for dl in diff_lines[:40]:
                print("  " + dl)
            if len(diff_lines) > 40:
                print(f"  ... ({len(diff_lines) - 40} weitere Zeilen)")
        print()

    # Summary table
    total = len(results)
    gruen = sum(1 for r in results if r.gruen)
    gelb = sum(1 for r in results if r.status == "GELB")
    rot = sum(1 for r in results if r.status == "ROT")

    print("=" * 60)
    print(f"Ergebnis: {gruen}/{total} GRUEN | {gelb} GELB | {rot} ROT")

    if not args.write:
        print()
        print("DRY-RUN abgeschlossen. Keine Dateien geaendert.")
        print("Mit --write ausfuehren, um die MINI_SPEC-Dateien zu schreiben.")

    return 0 if gruen == total else 1


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except PatchError as exc:
        print(f"STOP: {exc}", file=sys.stderr)
        raise SystemExit(2)
