"""Extrahiert die lokalen Steuerungsbloecke aus allen Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md.

Schreibt tools/app_fabrik/data/steuerungsbloecke.json (ein Eintrag pro App).
Aufruf aus dem Projekt-Root. Meldet fehlende/unklare Apps statt zu raten.
"""

import json
import re
from pathlib import Path

APPS_ROOT = Path("Apps")
START_MARKER = "## Steuerungsblock: Zweck, Barriere, Prüfregeln"
END_MARKER_BOLD = "**Nicht-Ziele / harte Verbote:**"

# Bekannte strukturelle Sonderfaelle: kein Bold-Marker, eigenes Feld-/Header-Format.
# Bei neuen Sonderfaellen hier ergaenzen statt Regex-Heuristik erraten.
ALT_END_MARKERS = {
    "regulatorik-dashboard": "### LLM-Prüfscore pro Änderung",
}


def extract_block(text: str, app_slug: str):
    start = text.find(START_MARKER)
    if start == -1:
        return None

    end_bold = text.find(END_MARKER_BOLD, start)
    if end_bold != -1:
        after = end_bold + len(END_MARKER_BOLD)
        blank_line = re.search(r"\n[ \t]*\n", text[after:])
        end = after + blank_line.start() if blank_line else len(text)
        return text[start:end].strip()

    alt_marker = ALT_END_MARKERS.get(app_slug)
    if alt_marker:
        alt_pos = text.find(alt_marker, start)
        if alt_pos != -1:
            return text[start:alt_pos].strip()

    return None


results = []
missing = []
for spec_file in sorted(APPS_ROOT.glob("*/MINI_SPEC_FROM_HAUPTDOKUMENT.md")):
    app_slug = spec_file.parent.name
    text = spec_file.read_text(encoding="utf-8")
    block = extract_block(text, app_slug)
    if block:
        results.append({"app_slug": app_slug, "block": block})
    else:
        missing.append(app_slug)

Path("tools/app_fabrik/data/steuerungsbloecke.json").write_text(
    json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8"
)

print(f"Extrahiert: {len(results)} von {len(results) + len(missing)}, fehlend/unklar: {missing}")
