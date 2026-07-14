"""Kopiert Rohmaterial je App und verschiebt Originale nach <quelle>/<kopiert-name>/.

Generisch fuer beliebige Quellordner (Blog, Vault, ...). Mapping-Werte sind
Pfade RELATIV zum Quellordner (flach oder in Unterordnern).

Ablauf (Mehrfachnutzung-sicher):
  1. Validieren: existiert jede gelistete Quelldatei? Ziel-App-Ordner vorhanden?
     Kollisionscheck (Basename-Duplikate, Ueberschreiben im Ziel).
     -> Bei Problemen: Abbruch OHNE jede Aenderung.
  2. Kopieren: jede Quelle in ALLE Ziel-Rohmaterial-Ordner (Mehrfachnutzung).
  3. Verschieben: jede Quelle EINMAL nach <quelle>/<kopiert-name>/.

Aufruf:
  python copy_rohmaterial.py --check [--mapping F] [--source-dir D] [--kopiert-name N]
  python copy_rohmaterial.py --run   [--mapping F] [--source-dir D] [--kopiert-name N]

Defaults (Blog):
  --mapping docs/App-Fabrik/blog_matching_final.json
  --source-dir "Inhalte alte Site/blog"
  --kopiert-name kopiert
"""

import argparse
import json
import shutil
import sys
from pathlib import Path

CONTENT = Path("content/posts/apps")

parser = argparse.ArgumentParser()
parser.add_argument("--mapping", default="docs/App-Fabrik/blog_matching_final.json")
parser.add_argument("--source-dir", default="Inhalte alte Site/blog")
parser.add_argument("--kopiert-name", default="kopiert")
parser.add_argument("--check", action="store_true")
parser.add_argument("--run", action="store_true")
args = parser.parse_args()

SOURCE = Path(args.source_dir)
KOPIERT = SOURCE / args.kopiert_name
mapping = json.loads(Path(args.mapping).read_text(encoding="utf-8"))

# Umkehrung: Quell-Relpfad -> Liste der Ziel-Slugs (Mehrfachnutzung)
src_to_slugs: dict[str, list[str]] = {}
for slug, files in mapping.items():
    for f in files:
        src_to_slugs.setdefault(f, []).append(slug)

total_sources = len(src_to_slugs)
total_copies = sum(len(v) for v in src_to_slugs.values())
multi = {f: s for f, s in src_to_slugs.items() if len(s) > 1}

print(f"Quelle:                {SOURCE}")
print(f"Quelldateien (unique): {total_sources}")
print(f"Kopien gesamt:         {total_copies}")
print(f"Mehrfach genutzt:      {len(multi)}")
for f, s in sorted(multi.items()):
    print(f"   {f} -> {', '.join(s)}")
print()

# --- Validierung ---
missing = [f for f in src_to_slugs if not (SOURCE / f).is_file()]
missing_slugs = [s for s in mapping if not (CONTENT / s).is_dir()]

# Basename-Kollision (Flach-Ablage in kopiert/ und Rohmaterial/)
basenames: dict[str, list[str]] = {}
for f in src_to_slugs:
    basenames.setdefault(Path(f).name, []).append(f)
collisions = {b: fs for b, fs in basenames.items() if len(fs) > 1}

# Ueberschreib-Check im Ziel-Rohmaterial
overwrite = []
for f, slugs in src_to_slugs.items():
    for slug in slugs:
        dest = CONTENT / slug / "Rohmaterial" / Path(f).name
        if dest.exists():
            overwrite.append(str(dest))

if missing:
    print(f"FEHLER: {len(missing)} Quelldatei(en) nicht gefunden:")
    for f in sorted(missing):
        print(f"   FEHLT: {f}")
if missing_slugs:
    print(f"FEHLER: {len(missing_slugs)} Ziel-App-Ordner fehlen unter {CONTENT}:")
    for s in missing_slugs:
        print(f"   FEHLT: {s}")
if collisions:
    print(f"FEHLER: {len(collisions)} Basename-Kollision(en) (Flach-Ablage unsicher):")
    for b, fs in collisions.items():
        print(f"   {b}: {fs}")
if overwrite:
    print(f"WARNUNG: {len(overwrite)} Zieldatei(en) existieren bereits (wuerden ueberschrieben):")
    for o in overwrite:
        print(f"   {o}")

if missing or missing_slugs or collisions:
    print("\nABBRUCH: Keine Aenderung durchgefuehrt.")
    sys.exit(1)

print("VALIDIERUNG GRUEN: alle Quelldateien und Ziel-Ordner vorhanden, keine Basename-Kollision.")

if args.check or not args.run:
    print("(kein --run: keine Aenderung durchgefuehrt.)")
    sys.exit(0)

# --- Kopieren ---
KOPIERT.mkdir(parents=True, exist_ok=True)
copies_done = 0
for src, slugs in src_to_slugs.items():
    src_path = SOURCE / src
    for slug in slugs:
        dest_dir = CONTENT / slug / "Rohmaterial"
        dest_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_path, dest_dir / Path(src).name)
        copies_done += 1

# --- Verschieben ---
moved = 0
for src in src_to_slugs:
    shutil.move(str(SOURCE / src), str(KOPIERT / Path(src).name))
    moved += 1

print(f"\nFERTIG: {copies_done} Kopien in {len(mapping)} App-Ordner, {moved} Originale nach {KOPIERT} verschoben.")
