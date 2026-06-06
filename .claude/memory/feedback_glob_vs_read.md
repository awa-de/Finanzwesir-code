---
name: feedback-glob-vs-read
description: Bekannter Pfad → sofort Read verwenden, nie Glob als Sicherheitsnetz
metadata:
  type: feedback
---

Wenn ein Dateipfad aus NAVIGATION.md, CLAUDE.md oder einem vorherigen Read bekannt ist: direkt Read verwenden. Glob nur bei unbekannten Pfaden oder echten Mustersuchen.

**Why:** Glob bei bekanntem Pfad ist unnötige Suche. Albert hat das zweimal korrigieren müssen: einmal generell (promoted), Reoccurrence 2026-05-10 beim APP-01-spec-gate (SECURITY-BASELINE.md per Glob gesucht obwohl Pfad bekannt war). Verwandt: [[feedback-strukturannahmen]].

**How to apply:** Vor einem Glob: „Kenne ich den Pfad bereits?" Wenn ja → Read. Glob nur wenn Pfad wirklich unbekannt oder Pattern-Suche über mehrere Dateien nötig ist.
