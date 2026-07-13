---
name: feedback-tools-generisch-dauerhaft
description: "Diagnose-/QA-Tools als dauerhafte, AP-neutrale Werkzeuge bauen statt als Einmal-Skript für den aktuellen AP"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
---

Wenn ein Diagnose- oder QA-Tool für einen AP gebraucht wird, wird es AP-neutral benannt und so gebaut, dass es für Folge-APs wiederverwendbar bleibt (z.B. eigene Tokenliste übergebbar) — nicht als Wegwerf-Skript für den aktuellen Task.

**Why:** AP-prokrast-17 (2026-07-09): Albert wollte den QA-Farbabgleich-Check als dauerhaftes Werkzeug, nicht als Einmal-Skript — Ergebnis war `tools/ci-token-check.js`, AP-neutral benannt, später tatsächlich für T1 und die Font-Migration wiederverwendet. Verwandtes, bereits promotetes Muster: [[feedback-test-html-dauerhaft]] (Testszenarien bleiben nach Verifikation eingebaut) — dort betrifft es Testdateien, hier Diagnose-/Prüfwerkzeuge.

**How to apply:** Vor dem Bau eines Diagnose-/QA-Skripts prüfen: Ist der Zweck über den aktuellen AP hinaus wiederverwendbar? Wenn ja: AP-neutraler Name, parametrisierbar (z.B. Tokenliste, Selektorliste als Argument statt Hardcode), dauerhaft im Repo behalten statt nach Gebrauch zu löschen.
