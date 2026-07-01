---
name: Subagenten-Setup v2.1.2
description: Haiku-Agenten für mechanische Zuarbeit — SSoT, Dispatch-Quittung, Rückfall-Regel, beobachtbare Kriterien
metadata:
  type: project
  originSessionId: 492326c1-737a-40c4-9506-ed8a635c986b
---
Subagenten-Setup v2.1.1 installiert am 2026-05-10 (ST-10).
abschluss-scout ergänzt am 2026-05-10 (ST-11).
Subagent-Policy als SSoT konsolidiert am 2026-05-11 (ST-16).

**Why:** Mechanische Zuarbeit (Suche, Inventur, Extraktion) lief bisher zu oft in der Hauptinstanz. Haiku-Agenten kosten deutlich weniger. Token-Schätzung als Dispatch-Kriterium war unzuverlässig. Regeln waren auf mehrere Dateien verteilt → Anti-Drift-Problem gelöst.

**SSoT:** `.claude/skills/subagent-dispatch/SKILL.md` — alle Policy-Regeln hier; alle anderen Dateien verweisen nur noch per Einzeiler darauf.
**Praxisnotiz:** `docs/steering/SUBAGENT-POLICY-PRAXIS.md`

**Aktive Agenten** (in `.claude/agents/`):
- `codebase-scout` — Codebase-Suche, Import-/Export-Inventur, Fundstellensammlung
- `spec-scout` — Extraktion aus Specs, Projektregeln, Dokumentation
- `regression-scout` — Suche nach Regressionsstellen rund um einen Fix
- `abschluss-scout` — Mechanische Fundstellenrecherche beim Abschluss-Ritual; nur im Voll-Abschluss, nur lesen

**Dispatch-Kriterien (beobachtbar, nicht geschätzt):**
- > 3 Dateien ODER > 5 Fundstellen ODER Bulk > 5
- Briefing in 1 Satz möglich
- Ergebnis direkt verwertbar
- Kein Projekturteil nötig

**Kein Dispatch bei:** Architekturentscheidungen, Gate-Entscheidungen, Sicherheitsurteilen, Synthese widersprüchlicher Befunde, finaler Patchplanung.

**Pflicht nach jedem Dispatch:**
- Dispatch-Quittung: `Subagent-Dispatch: [agent] (Haiku) — [Aufgabe], keine Entscheidungen.`
- Nach Rückgabe: `Scout-Ergebnis erhalten: [Kurzumfang]. Hauptinstanz übernimmt Urteil/Synthese.`
- Wenn übersprungen: `Subagent übersprungen: [Grund].` — Kein stiller Scout. Kein stiller Nicht-Scout.

**abschluss-scout Dispatch-Kriterien** (mindestens eines):
Engine-Änderung / Spec-/Doku-Änderung / AP im BACKLOG unklar / Sofort-erledigt-Pfad mit ID-Vergabe / NAVIGATION-Relevanz unklar / Praxis-Anleitung potenziell relevant / mehr als 3 Steuerungsdateien nötig.

**How to apply:** Dispatch-Entscheidung liegt bei der Hauptinstanz. SSoT-Regeln → `subagent-dispatch/SKILL.md`. abschluss-scout wird vom abschluss-ritual-Skill aufgerufen, nie direkt.
