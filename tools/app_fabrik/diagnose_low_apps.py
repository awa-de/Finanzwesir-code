"""Prueft Einzelbegriffe fuer die raw-arme Apps, um Kandidaten fuer breitere Stems zu finden."""
import re
from pathlib import Path

BLOG_ROOT = Path("Inhalte alte Site/blog")
texts = [p.read_text(encoding="utf-8", errors="replace") for p in BLOG_ROOT.glob("*.md")]

candidates = [
    "prokrastination", "aufschieberitis", "rollierend", "jahrgang", "kapitaleinkommen",
    "zweitverdiener", "sell in may", "schlankes depot", "weniger ist mehr",
    "checkliste", "erste schritte", "schritt für schritt", "indexblase", "etf-blase",
    "startzeitpunkt", "glückssache",
]

for term in candidates:
    count = sum(1 for t in texts if re.search(rf"\b{re.escape(term.lower())}\b", t.lower()))
    print(f"{term}: {count} Posts")
