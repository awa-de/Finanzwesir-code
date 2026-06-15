---
name: feedback-edit-vorab-lesen
description: Datei immer mit Read lesen bevor Edit — besonders bei Whitespace, Flexionen und längeren Passagen
metadata:
  type: feedback
---

Vor jedem Edit-Tool-Aufruf: die Zieldatei mit Read lesen. Auch wenn der Inhalt „bekannt" scheint.

**Why:** Edit-Tool erfordert exakten Textmatch. Mehrfach fehlgeschlagen:
- Whitespace: 2 Leerzeilen erwartet, 1 vorhanden (AF-12)
- Flexion: ausdrücklicher vs. ausdrückliche (AP-DATA-07)
- Zweimal Edit ohne vorheriges Read → Fehler oder Tool-Ablehnung (Distill 6, 2026-06-05)
Der Harness verlangt es zudem technisch — Edit schlägt fehl wenn die Datei nicht vorher gelesen wurde.

**How to apply:** Workflow immer: Read → Edit. Nie direkt Edit. Auch bei „ich kenne diese Datei aus dieser Session" — Read kostet wenig, fehlender Read kostet Wiederholung. Gilt besonders für: Textpassagen mit Adjektiven/Substantiven (Flexion), Leerzeilen-Grenzen, Enden von Codeblöcken.
