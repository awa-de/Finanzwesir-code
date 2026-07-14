"""Mechanischer Vorfilter: scannt den Blog-Ordner gegen suchachsen.json.

Liest nur aus Inhalte alte Site/blog/*.md, schreibt nur
tools/app_fabrik/data/raw_candidates.json. Aufruf aus dem Projekt-Root.
Keine Bewertung, keine Kopien -- reine Fundstellen-Sammlung fuer die
anschliessende inhaltliche Pruefung.
"""

import json
import re
from pathlib import Path

BLOG_ROOT = Path("Inhalte alte Site/blog")
SUCHACHSEN_FILE = Path("tools/app_fabrik/data/suchachsen.json")
RAW_CANDIDATES_FILE = Path("tools/app_fabrik/data/raw_candidates.json")
EXCERPT_RADIUS = 120


def find_excerpt(text_lower: str, text_orig: str, term: str) -> str:
    m = re.search(rf"\b{re.escape(term.lower())}\b", text_lower)
    if not m:
        return ""
    start = max(0, m.start() - EXCERPT_RADIUS)
    end = min(len(text_orig), m.end() + EXCERPT_RADIUS)
    snippet = text_orig[start:end].replace("\n", " ").strip()
    return f"...{snippet}..."


def match_terms(text_lower: str, terms: list[str]) -> list[str]:
    return [t for t in terms if re.search(rf"\b{re.escape(t.lower())}\b", text_lower)]


achsen = json.loads(SUCHACHSEN_FILE.read_text(encoding="utf-8"))

results = {a["app_slug"]: [] for a in achsen}

blog_files = sorted(BLOG_ROOT.glob("*.md"))

for post in blog_files:
    text = post.read_text(encoding="utf-8", errors="replace")
    text_lower = text.lower()

    for app in achsen:
        slug = app["app_slug"]
        pos_hits = match_terms(text_lower, app["positivbegriffe"])
        neg_hits = match_terms(text_lower, app["negativbegriffe"])
        kon_hits = match_terms(text_lower, app["kontrastbegriffe"])

        if not pos_hits and not neg_hits:
            continue

        score = 2 * len(pos_hits) + 3 * len(neg_hits) - 1 * len(kon_hits)
        lead_term = (neg_hits + pos_hits)[0]
        excerpt = find_excerpt(text_lower, text, lead_term)

        results[slug].append({
            "file": post.name,
            "score": score,
            "positiv_hits": pos_hits,
            "negativ_hits": neg_hits,
            "kontrast_hits": kon_hits,
            "excerpt": excerpt,
        })

for slug in results:
    results[slug].sort(key=lambda r: r["score"], reverse=True)

RAW_CANDIDATES_FILE.write_text(
    json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8"
)

print(f"Blogposts gescannt: {len(blog_files)}")
for slug, cands in results.items():
    print(f"  {slug}: {len(cands)} Rohkandidaten")
