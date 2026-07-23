#!/usr/bin/env python3
"""AF-GM-03 Protected-Diff-Checker.

Liest .claude/PROTECTED_PATHS.json und eine explizit übergebene Dateiliste
(oder eine Datei mit einem Pfad pro Zeile, z. B. `git diff --name-only`-
Ausgabe) und schlägt fail-closed fehl, sobald ein 'forbidden'-Pfad enthalten
ist. Ändert keine Datei, ersetzt keine manuelle Unlock-/Relock-Entscheidung —
reine Prüfung.

Aufruf:
    python protected_diff_check.py --files <pfad1> <pfad2> ...
    python protected_diff_check.py --from-file <datei mit einem Pfad pro Zeile>

Exit-Code 0 = kein 'forbidden'-Treffer, 1 = mindestens ein 'forbidden'-Treffer.
"""

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
PROTECTED_PATHS_FILE = REPO_ROOT / ".claude" / "PROTECTED_PATHS.json"


def normalize(path_str):
    return str(path_str).replace("\\", "/").lstrip("./")


def load_protected_paths():
    data = json.loads(PROTECTED_PATHS_FILE.read_text(encoding="utf-8"))
    return data["protected_paths"]


def match_entry(candidate, entry_path):
    candidate = normalize(candidate)
    entry_path = normalize(entry_path)
    if entry_path.endswith("/"):
        return candidate == entry_path.rstrip("/") or candidate.startswith(entry_path)
    return candidate == entry_path


def check_files(files):
    protected_paths = load_protected_paths()
    forbidden_hits = []
    protected_hits = []

    for candidate in files:
        for entry in protected_paths:
            if match_entry(candidate, entry["path"]):
                if entry["level"] == "forbidden":
                    forbidden_hits.append({"file": candidate, "matchedPath": entry["path"], "reason": entry["reason"]})
                elif entry["level"] == "protected":
                    protected_hits.append({"file": candidate, "matchedPath": entry["path"], "reason": entry["reason"]})

    return forbidden_hits, protected_hits


def main(argv):
    parser = argparse.ArgumentParser(add_help=True)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--files", nargs="+", help="Explizite Dateiliste")
    group.add_argument("--from-file", help="Datei mit einem Pfad pro Zeile (z. B. git diff --name-only)")
    args = parser.parse_args(argv)

    if args.files:
        files = args.files
    else:
        from_file = Path(args.from_file)
        if not from_file.is_file():
            print(json.dumps({"status": "FAIL", "errorId": "GM03-ERR-PATH-NOT-FOUND", "message": f"--from-file nicht gefunden: {args.from_file}"}, indent=2))
            return 1
        files = [line.strip() for line in from_file.read_text(encoding="utf-8").splitlines() if line.strip()]

    forbidden_hits, protected_hits = check_files(files)

    if forbidden_hits:
        print(json.dumps({
            "status": "FAIL",
            "errorId": "GM03-ERR-FORBIDDEN-PATH-TOUCHED",
            "message": f"{len(forbidden_hits)} Datei(en) berühren 'forbidden'-Pfade",
            "hits": forbidden_hits,
        }, indent=2, ensure_ascii=False))
        return 1

    print(json.dumps({
        "status": "PASS",
        "filesChecked": len(files),
        "protectedButAllowedHits": protected_hits,
    }, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
