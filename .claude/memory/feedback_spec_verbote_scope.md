---
name: feedback-spec-verbote-scope
description: Spec-Verbote im engsten Scope formulieren — Gegenprobe mit 2–3 Szenarien, explizit abgrenzen
metadata:
  type: feedback
---

Beim Formulieren von Spec-Verboten immer den Scope prüfen: Schließt dieses Verbot etwas aus, das eigentlich erlaubt sein soll? Wenn ja: Scope einschränken.

**Why:** 2026-06-03 APP-01-csv-guardrail: „keine JSON-Reste" deckte zu viel ab; korrekt war: CSV gilt nur für `data-fw-data`. Albert musste Richtung korrigieren (High-Impact). Zu breite Verbote ohne Ausnahmeregeln sind ein Architekturrisiko.

**How to apply:** Nach dem Formulieren eines Verbots: Gegenprobe mit 2–3 legitimen Szenarien. Falls eines geblockt würde: Ausnahme ergänzen (z.B. „verboten, außer für X") oder Verbot enger fassen. Im Zweifel den engsten Scope wählen und explizit abgrenzen (z.B. „gilt nur für X, nicht für Y, Z"). Besonders bei: App-Fabrik-Regeln, Security-Regeln, Datenlayer-Verboten. Unterschied zu [[feedback-verbote-explizit-formulieren]]: dort zu schwach formuliert, hier zu breit.
