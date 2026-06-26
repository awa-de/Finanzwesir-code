#!/usr/bin/env python3
"""
insert_steuerungsblock_from_seed.py

Deterministically inserts one app's Steuerungsblock seed into its APP_SPEC.

Principles:
- Seed is source, APP_SPEC is target.
- No rewriting, no interpretation, no summarizing.
- Dry-run by default.
- Write only with --write.
- Fail fast on missing files, missing anchors, or existing local Steuerungsblock.

Usage:
  python tools/app_fabrik/insert_steuerungsblock_from_seed.py --slug prokrastinations-preis
  python tools/app_fabrik/insert_steuerungsblock_from_seed.py --slug prokrastinations-preis --write
"""

from __future__ import annotations

import argparse
import difflib
import re
import sys
from pathlib import Path


DEFAULT_SEED_PATH = Path("Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md")
DEFAULT_PROTOCOL_DIR = Path("docs/steering/patches")
LOCAL_BLOCK_HEADING = "## Steuerungsblock: Zweck, Barriere, Prüfregeln"


class PatchError(RuntimeError):
    """Expected, user-actionable patch failure."""


def configure_utf8_stdio() -> None:
    """Make Windows/PowerShell diff output robust for symbols like ≤."""
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8")
        except AttributeError:
            # Python < 3.7 or non-standard stream; keep default behavior.
            pass


def read_text(path: Path) -> str:
    if not path.exists():
        raise PatchError(f"Datei nicht gefunden: {path}")
    if not path.is_file():
        raise PatchError(f"Pfad ist keine Datei: {path}")
    return path.read_text(encoding="utf-8")


def remove_seed_only_metadata(seed_body: str) -> str:
    """Remove metadata that belongs only in the seed file, not in local APP_SPEC blocks."""
    body = seed_body

    # Single-line seed metadata.
    body = re.sub(r"^\*\*Status:\*\*\s*[^\n]*\n?", "", body, flags=re.M)
    body = re.sub(r"^\*\*Verteilungsstatus:\*\*\s*[^\n]*\n?", "", body, flags=re.M)

    # Whole section: Klärungsbedarf vor Verteilung.
    # Remove from that heading through following bullets/paragraphs until the next bold heading or end.
    body = re.sub(
        r"^\*\*Klärungsbedarf vor Verteilung:\*\*\s*\n.*?(?=^\*\*[^*\n]+:\*\*|\Z)",
        "",
        body,
        flags=re.M | re.S,
    )

    # Normalize excessive blank lines caused by removals.
    body = re.sub(r"\n{3,}", "\n\n", body)
    return body.strip()


def extract_seed_block(seed_text: str, slug: str) -> str:
    pattern = re.compile(
        rf"^## {re.escape(slug)}\s*\n(?P<body>.*?)(?=^---\s*\n\s*## |\n# 4\. Repo-Abgleich|\Z)",
        re.M | re.S,
    )
    match = pattern.search(seed_text)
    if not match:
        raise PatchError(f"Seed-Block nicht gefunden: {slug}")

    body = match.group("body").strip()
    body = remove_seed_only_metadata(body)

    if not body:
        raise PatchError(f"Seed-Block ist leer: {slug}")

    return body


def extract_score_block(seed_text: str) -> str:
    pattern = re.compile(
        r"^## 2\.1 Standardisiertes Änderungsgate: LLM-Prüfscore pro Änderung\s*\n"
        r"(?P<body>.*?)(?=^---\s*\n\s*# 3\. Seed-Blöcke)",
        re.M | re.S,
    )
    match = pattern.search(seed_text)
    if not match:
        raise PatchError("Score-Abschnitt 2.1 nicht gefunden.")

    body = match.group("body").strip()
    if not body:
        raise PatchError("Score-Abschnitt 2.1 ist leer.")

    return body


def build_local_block(slug: str, seed_path: Path, seed_body: str, score_body: str) -> str:
    return f"""{LOCAL_BLOCK_HEADING}

<!-- Quelle: {seed_path.as_posix()} / Seed {slug} -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

{seed_body}

---

{score_body}

"""


def insert_after_status(target_text: str, local_block: str) -> str:
    if LOCAL_BLOCK_HEADING in target_text:
        raise PatchError("Ziel-APP_SPEC enthält bereits einen lokalen Steuerungsblock.")

    # Expected shape:
    # ## 1. Status
    # ...
    # ---
    #
    # ## 2. Zweck ...
    pattern = re.compile(
        r"(## 1\. Status\s*\n.*?\n---\s*\n)(?=\n?## 2\. )",
        re.S,
    )
    match = pattern.search(target_text)
    if not match:
        raise PatchError("Einfügeanker nicht gefunden: nach '## 1. Status' und vor '## 2.'")

    return target_text[: match.end()] + "\n" + local_block + target_text[match.end():]


def protocol_text(slug: str, seed_path: Path, target_path: Path, protocol_path: Path) -> str:
    return f"""# AP-10 Ergebnis — Mechanischer Einbau {slug} aus Seed

Stand: 2026-06-26  
Methode: deterministischer Python-Task  
Script: `tools/app_fabrik/insert_steuerungsblock_from_seed.py`

## Auftrag

Seed-Block `{slug}` aus `{seed_path.as_posix()}` mechanisch in `{target_path.as_posix()}` einfügen.

## Geänderte Dateien

- {target_path.as_posix()}
- {protocol_path.as_posix()}

## Methode

- Seed-Datei gelesen
- Seed-Block `{slug}` extrahiert
- Seed-Metadaten (`Status`, `Verteilungsstatus`, `Klärungsbedarf vor Verteilung`) aus lokalem Block entfernt
- Score-Abschnitt `2.1 Standardisiertes Änderungsgate` übernommen
- lokaler Steuerungsblock nach `## 1. Status` und vor `## 2.` eingefügt
- keine LLM-Umformulierung
- keine bestehenden Abschnitte umnummeriert
- keine bestehenden Inhalte umgeschrieben

## Prüfungen

- Seed-Datei vorhanden: ja
- Ziel-APP_SPEC vorhanden: ja
- Steuerungsblock vorher nicht vorhanden: ja
- Seed-Block gefunden: ja
- Score-Abschnitt gefunden: ja
- Einfügeanker gefunden: ja
- kein Commit: ja
- kein Abschlussritual: ja

## Status

GRÜN, wenn `git diff --name-only` nur die erwarteten Dateien zeigt.

## Nächster Schritt

Diff prüfen. Danach entscheiden: commitfähig oder Nachputz.
"""


def unified_diff(old: str, new: str, path: Path) -> str:
    return "".join(
        difflib.unified_diff(
            old.splitlines(keepends=True),
            new.splitlines(keepends=True),
            fromfile=f"{path.as_posix()} (before)",
            tofile=f"{path.as_posix()} (after)",
        )
    )


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Insert one app's Steuerungsblock seed into its APP_SPEC deterministically."
    )
    parser.add_argument("--slug", required=True, help="App slug, e.g. prokrastinations-preis")
    parser.add_argument(
        "--seed",
        default=str(DEFAULT_SEED_PATH),
        help=f"Seed markdown path. Default: {DEFAULT_SEED_PATH.as_posix()}",
    )
    parser.add_argument(
        "--target",
        default=None,
        help="Target APP_SPEC path. Default: Apps/<slug>/APP_SPEC.md",
    )
    parser.add_argument(
        "--protocol",
        default=None,
        help="Protocol path. Default: docs/steering/patches/AP-10_mechanischer-einbau-<slug>-aus-seed_Ergebnis.md",
    )
    parser.add_argument(
        "--write",
        action="store_true",
        help="Write changes. Without --write, only prints the target diff.",
    )
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    configure_utf8_stdio()

    args = parse_args(argv)

    slug = args.slug.strip()
    if not slug:
        raise PatchError("Slug ist leer.")

    seed_path = Path(args.seed)
    target_path = Path(args.target) if args.target else Path("Apps") / slug / "APP_SPEC.md"
    protocol_path = (
        Path(args.protocol)
        if args.protocol
        else DEFAULT_PROTOCOL_DIR / f"AP-10_mechanischer-einbau-{slug}-aus-seed_Ergebnis.md"
    )

    seed_text = read_text(seed_path)
    target_text = read_text(target_path)

    seed_body = extract_seed_block(seed_text, slug)
    score_body = extract_score_block(seed_text)
    local_block = build_local_block(slug, seed_path, seed_body, score_body)
    new_target_text = insert_after_status(target_text, local_block)

    diff = unified_diff(target_text, new_target_text, target_path)

    if not diff:
        raise PatchError("Kein Diff erzeugt. Unerwarteter Zustand.")

    if not args.write:
        print(diff)
        print("\nDRY-RUN: Keine Dateien geändert. Mit --write ausführen, um zu schreiben.", file=sys.stderr)
        return 0

    protocol_path.parent.mkdir(parents=True, exist_ok=True)
    target_path.write_text(new_target_text, encoding="utf-8")
    protocol_path.write_text(protocol_text(slug, seed_path, target_path, protocol_path), encoding="utf-8")

    print("OK: Steuerungsblock mechanisch eingefügt.")
    print(f"Target:   {target_path.as_posix()}")
    print(f"Protocol: {protocol_path.as_posix()}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except PatchError as exc:
        print(f"STOP: {exc}", file=sys.stderr)
        raise SystemExit(2)
