---
name: Selbstlernendes System
description: Implementierungsstand und Architektur des selbstlernenden Systems (Learning-Pipeline, Lastabwurf, Skills).
type: project
originSessionId: e2680e4e-9aef-4de1-af0a-81e298533eff
---
Selbstlernendes System vollständig implementiert am 2026-05-08 (Faden 3 nach Planung + Kritik-Härtung).

**Was wurde implementiert (8 Schritte):**
- `.claude/learning/session-log.md` — ephemerer Log pro AP, wird nach /distill geleert
- `.claude/learning/patterns.md` — persistente Musterliste mit Bestandsliste (2 promoted)
- `abschluss-ritual/SKILL.md` — Schritt 0 (session-log, PFLICHT, ZUERST) + Challenge-Response
- `/start`-Sequenz — Schritt 3c (Learning-Pipeline: Lücken-Alarm + Distill-Empfehlung)
- `kassensturz/SKILL.md` — Lern-Loop-Abschnitt im Output
- `.claude/skills/distill/SKILL.md` — neuer Skill (manuell oder schwellen-basiert von /start)
- `.claude/skills/uebergabe/SKILL.md` — neuer Skill (Delta-Übergabeprompt + Breadcrumb)
- `CLAUDE.md §12` — Lastabwurf-System (4 Modi N/R/M/A, 6 Kern-Invarianten, Prioritätsgruppen) — v2.0.1: PROTECTED_PATHS in Gruppe 1 aufgenommen

**Why:** Korrekturen landeten mit ~50% Wahrscheinlichkeit im Gedächtnis. Ziel: geschlossene Lernschleife.

**How to apply:** Pilot-Test (7 Checks aus PROJECT-STATUS.md) ist ausstehend — erst dann gilt das System als produktiv. Bis dahin: alle neuen Skills aktiv aber ungetestet.
