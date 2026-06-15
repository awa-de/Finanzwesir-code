---
name: feedback-glob-vs-read
description: Bekannter Pfad → sofort Read, nie Glob; bei Pflichtquellen Timeout = stoppen
metadata:
  type: feedback
---

Wenn ein Dateipfad aus NAVIGATION.md, CLAUDE.md oder einem vorherigen Read bekannt ist: direkt Read verwenden mit absolutem Pfad. Glob nur bei unbekannten Pfaden oder echten Mustersuchen über mehrere Dateien.

**Why:** Glob durchsucht den gesamten Verzeichnisbaum und lief in einen 20-Sekunden-Timeout bei SECURITY-BASELINE.md, obwohl der Pfad aus APP-INTERFACE.md §11 bereits bekannt war. Pflichtquellen wurden dadurch nicht gelesen. Reoccurrence 2026-05-10 beim APP-01-spec-gate.

**How to apply:** Vor einem Glob: „Kenne ich den Pfad bereits?" Wenn ja → Read. Glob nur wenn Pfad wirklich unbekannt oder Pattern-Suche nötig. Bei Pflichtquellen gilt: Timeout oder Fehler beim Lesen = stoppen und melden, nicht stillschweigend übergehen. Verwandt: [[feedback-strukturannahmen]].
