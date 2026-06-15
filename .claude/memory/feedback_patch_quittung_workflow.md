---
name: patch-quittung-workflow
description: "Patch-Quittung als committed Datei in docs/steering/patches/ ablegen, nicht nur im Chat ausgeben"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fee6cbf1-99c6-49d3-8cf9-d5755e0c6d94
---

Patch-Quittungen werden als committed Datei in `docs/steering/patches/` abgelegt.

**Why:** Albert hat das Verzeichnis `docs/steering/patches/` explizit angelegt (OA-02-Dissens-1/2). Die Quittung ist ein nachvollziehbares Artefakt im Repo — kein flüchtiger Chat-Text.

**How to apply:** Regel ist seit ST-29 (2026-06-15) in `.claude/skills/patch-quittung/SKILL.md` Schritt 6 verankert — kein Memory-Abruf mehr nötig. Memory-Eintrag bleibt als Kontext-Hintergrund.
