---
name: feedback-spec-verbote-scope
description: Spec-Verbote präzise scopten — nicht so breit dass legitime Use-Cases ausgeschlossen werden
metadata:
  type: feedback
---

Beim Formulieren von Spec-Verboten immer den Scope prüfen: Schließt dieses Verbot etwas aus, das eigentlich erlaubt sein soll? Wenn ja: Scope einschränken.

**Why:** Ein zu breit formuliertes Verbot hat einen legitimen Use-Case blockiert (Distill 5, 2026-06-03, High-Impact-Fund). Breite Verbote ohne Ausnahmeregeln sind ein Architekturrisiko.

**How to apply:** Nach dem Formulieren eines Verbots: Gegenprobe mit 2–3 legitimen Szenarien. Falls eines geblockt würde: Ausnahme ergänzen (z.B. „verboten, außer für X") oder Verbot enger fassen. Besonders bei: App-Fabrik-Regeln, Security-Regeln, Datenlayer-Verboten.
