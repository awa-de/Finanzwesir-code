#!/usr/bin/env python3
"""Memory-Integritätscheck für Finanzwesir 2.0.
Nur lesen — keine Schreiboperationen. Exit 0 = OK, Exit 1 = Fehler.
Ausführen vom Projekt-Root: python tools/check-memory-integrity.py
"""

import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")


def main():
    root = Path(__file__).parent.parent
    memory_dir = root / ".claude" / "memory"
    memory_index = memory_dir / "MEMORY.md"
    project_status = root / "PROJECT-STATUS.md"
    navigation = root / "NAVIGATION.md"

    errors = []
    warnings = []
    ok = {}

    # 1. MEMORY.md existiert
    if not memory_index.exists():
        print("Memory-Integritätscheck ❌")
        print("FAIL: .claude/memory/MEMORY.md fehlt")
        return 1

    memory_text = memory_index.read_text(encoding="utf-8")

    # 2. Links extrahieren: - [Titel](dateiname.md) — Beschreibung
    link_re = re.compile(r"^\s*-\s+\[[^\]]+\]\(([^)]+\.md)\)", re.MULTILINE)
    filenames = link_re.findall(memory_text)
    count = len(filenames)
    ok["entries"] = count
    if count == 0:
        errors.append("MEMORY.md: keine Memory-Einträge gefunden")

    # 3–6. Dateien: Existenz, Frontmatter, metadata.type
    missing, bad_fm, bad_type, invalid_type_list = [], [], [], []
    valid_types = {"feedback", "project"}

    for fn in filenames:
        fp = memory_dir / fn
        if not fp.exists():
            missing.append(fn)
            continue
        lines = fp.read_text(encoding="utf-8").splitlines()
        if not lines or lines[0].strip() != "---":
            bad_fm.append(fn)
            continue
        close = next((i for i, ln in enumerate(lines[1:], 1) if ln.strip() == "---"), None)
        if close is None:
            bad_fm.append(fn)
            continue
        fm = "\n".join(lines[1:close])
        if "metadata:" not in fm:
            bad_type.append(fn)
            continue
        m = re.search(r"^\s+type:\s*(\S+)", fm, re.MULTILINE)
        if not m:
            bad_type.append(fn)
            continue
        if m.group(1) not in valid_types:
            invalid_type_list.append(f"{fn} (type: {m.group(1)})")

    ok["existing"] = count - len(missing)
    ok["frontmatter"] = ok["existing"] - len(bad_fm)
    ok["type_ok"] = ok["frontmatter"] - len(bad_type) - len(invalid_type_list)

    # 7. Tote Links bereits als missing erfasst
    for fn in missing:
        errors.append(f".claude/memory/{fn} fehlt")
    for fn in bad_fm:
        errors.append(f".claude/memory/{fn}: YAML-Frontmatter fehlt oder ungültig")
    for fn in bad_type:
        errors.append(f".claude/memory/{fn}: metadata.type fehlt")
    for fn in invalid_type_list:
        errors.append(f".claude/memory/{fn}: ungültiger Typ")

    # 8. ST-18-Merge-Hinweis (nicht ST-17)
    if "abgleichen (ST-18)" not in memory_text:
        if "abgleichen (ST-17)" in memory_text:
            errors.append("MEMORY.md: Merge-Hinweis verweist auf ST-17 (muss ST-18 sein)")
        else:
            errors.append("MEMORY.md: Merge-Hinweis für ST-18 nicht gefunden")

    # 9. PROJECT-STATUS.md: HOOK-META-Stand == sichtbarer Stand
    if not project_status.exists():
        errors.append("PROJECT-STATUS.md fehlt")
    else:
        ps = project_status.read_text(encoding="utf-8")
        hook_m = re.search(
            r"<!--\s*HOOK-META\b.*?Stand:\s*(\d{4}-\d{2}-\d{2})",
            ps, re.DOTALL
        )
        vis_m = re.search(r"^Stand:\s*(\d{4}-\d{2}-\d{2})\s*\|", ps, re.MULTILINE)
        if not hook_m:
            errors.append("PROJECT-STATUS.md: HOOK-META-Stand nicht gefunden")
        elif not vis_m:
            errors.append("PROJECT-STATUS.md: sichtbarer Stand nicht gefunden")
        elif hook_m.group(1) != vis_m.group(1):
            errors.append(
                f"PROJECT-STATUS HOOK-META Stand {hook_m.group(1)} "
                f"!= sichtbarer Stand {vis_m.group(1)}"
            )
        else:
            ok["hook_meta"] = hook_m.group(1)

    # 10. NAVIGATION.md: Hinweis auf Memory-System + optionale Zählprüfung
    # Kein Number → kein Fehler (gewünschter Normalzustand nach Entdynamisierung)
    if not navigation.exists():
        warnings.append("NAVIGATION.md fehlt")
    else:
        nav = navigation.read_text(encoding="utf-8")
        if ".claude/memory/" not in nav or "MEMORY.md" not in nav:
            warnings.append("NAVIGATION.md: kein Hinweis auf .claude/memory/ oder MEMORY.md")
        nav_m = re.search(r"Memory-System[^\n]*?(\d+)\s+Files", nav, re.IGNORECASE)
        if nav_m:
            nav_count = int(nav_m.group(1))
            if nav_count != count:
                errors.append(
                    f"NAVIGATION.md nennt {nav_count} Memory-Files, MEMORY.md hat {count} Einträge"
                )
            else:
                ok["navigation"] = nav_count

    # Ausgabe
    if errors:
        print("Memory-Integritätscheck ❌")
        for e in errors:
            print(f"FAIL: {e}")
        for w in warnings:
            print(f"WARN: {w}")
        return 1

    print("Memory-Integritätscheck ✅")
    print(f"- MEMORY.md: {ok['entries']} Einträge")
    print(f"- Dateien: {ok['existing']}/{ok['entries']} vorhanden")
    print(f"- Frontmatter: {ok['frontmatter']}/{ok['entries']} gültig")
    print(f"- metadata.type: {ok['type_ok']}/{ok['entries']} gültig")
    if "hook_meta" in ok:
        print(f"- PROJECT-STATUS HOOK-META: synchron ({ok['hook_meta']})")
    if "navigation" in ok:
        print(f"- NAVIGATION Memory-Zahl: synchron ({ok['navigation']})")
    for w in warnings:
        print(f"WARN: {w}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
