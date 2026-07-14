"""Diagnose: zaehlt pro Suchbegriff, in wie vielen Blogposts er vorkommt.
Read-only Hilfsskript, um zu grobe/mehrdeutige Substring-Treffer zu finden.
"""

import json
from pathlib import Path

BLOG_ROOT = Path("Inhalte alte Site/blog")
achsen = json.loads(Path("tools/app_fabrik/data/suchachsen.json").read_text(encoding="utf-8"))

blog_texts = [p.read_text(encoding="utf-8", errors="replace").lower() for p in BLOG_ROOT.glob("*.md")]

for app in achsen:
    for kind in ("positivbegriffe", "negativbegriffe", "kontrastbegriffe"):
        for term in app[kind]:
            count = sum(1 for t in blog_texts if term.lower() in t)
            if count > 50:
                print(f"{app['app_slug']} / {kind} / '{term}': {count} Posts")
