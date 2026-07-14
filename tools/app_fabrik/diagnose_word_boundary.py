"""Vergleicht Substring- vs. Wortgrenzen-Treffer fuer verdaechtige kurze Begriffe."""
import re
from pathlib import Path

BLOG_ROOT = Path("Inhalte alte Site/blog")
texts = [p.read_text(encoding="utf-8", errors="replace") for p in BLOG_ROOT.glob("*.md")]

for term in ["ter", "esg", "sri", "wkn", "acwi"]:
    substr = sum(1 for t in texts if term in t.lower())
    boundary = sum(1 for t in texts if re.search(rf"\b{re.escape(term)}\b", t, re.IGNORECASE))
    print(f"{term}: substring={substr}, wortgrenze={boundary}")
