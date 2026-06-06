---
name: feedback-edit-vorab-lesen
description: Datei immer mit Read lesen bevor Edit verwendet wird — keine Ausnahme
metadata:
  type: feedback
---

Vor jedem Edit-Tool-Aufruf: die Zieldatei mit Read lesen. Auch wenn der Inhalt „bekannt" scheint.

**Why:** Zweimal Edit ohne vorheriges Read ausgeführt → Fehler oder Tool-Ablehnung (Distill 6, 2026-06-05, 2 Belege Normal). Der Harness verlangt es zudem technisch — Edit schlägt fehl wenn die Datei nicht vorher gelesen wurde.

**How to apply:** Workflow immer: Read → Edit. Nie direkt Edit. Auch bei „ich kenne diese Datei aus dieser Session" — Read kostet wenig, fehlender Read kostet Wiederholung.
