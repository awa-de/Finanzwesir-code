---
name: project-audit-trail
description: Jede Entscheidung wird dokumentiert — DECISION-LOG für Architektur, session-log für operative Schritte
metadata:
  type: project
---

Kein stilles Entscheiden. Jede relevante Entscheidung (Format, Architektur, Scope, Tool-Wahl) wird in die passende Datei eingetragen.

**Why:** Rückverfolgbarkeit bei Fehlern und für zukünftige Sessions. Das Projekt hat viele Entscheidungsebenen — ohne Audit Trail ist unklar warum etwas so ist wie es ist.

**How to apply:** Architektonische/technische Entscheidung → `docs/steering/DECISION-LOG.md` (D-ID anlegen). Operative Session-Schritte → `.claude/learning/session-log.md`. Scope-Entscheidungen → im Gate-Protokoll festhalten und dann ins DECISION-LOG. Nichts nur im Chat lassen das Bestand haben soll.
