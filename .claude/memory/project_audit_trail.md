---
name: project-audit-trail
description: Kein stilles Entscheiden — DECISION-LOG für Architektur, session-log für Schritte, audits/ für Evaluierungen
metadata:
  type: project
---

Kein stilles Entscheiden. Jede relevante Entscheidung (Format, Architektur, Scope, Tool-Wahl) wird in die passende Datei eingetragen. Claude trifft keine direkten Beschlüsse — Albert liest die Entscheidungsgrundlage und entscheidet.

**Why:** Rückverfolgbarkeit bei Fehlern und für zukünftige Sessions. Albert bezeichnete den Audit-Trail als „extrem wertvoll für selbstlernend".

**How to apply:**
- Architektonische/technische Entscheidungen → `docs/steering/DECISION-LOG.md` (D-ID anlegen)
- Operative Session-Schritte → `.claude/learning/session-log.md`
- Skill-Evaluierungen, Tool-Audits, Ressourcen-Entscheidungen → `docs/steering/audits/[kategorie]/` als kommentierte Datei
- Scope-Entscheidungen → im Gate-Protokoll festhalten, dann ins DECISION-LOG
- Nichts nur im Chat lassen das Bestand haben soll
