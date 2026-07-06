---
name: feedback-test-html-dauerhaft
description: "app.test.html je App ist dauerhaftes Testszenario, kein Wegwerf-Skript — neue Szenarien bleiben eingebaut"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e7cbd7dc-2859-4d18-a3e4-fb07cad77ddd
---

`app.test.html`-Testdateien (z.B. `Apps/prokrastinations-preis/app.test.html`) sind dauerhafte Testinfrastruktur. Neu gebaute Testszenarien (z.B. für ein neues Plugin oder einen neuen Smart-Update-Pfad) bleiben nach der Verifikation eingebaut, statt danach entfernt zu werden.

**Why:** Bei der Verifikation von `FwChartTextPlugin.js` (AP-prokrast-03d, 2026-07-02) wurde Szenario AF als Wegwerf-Test angelegt. Albert wollte es stattdessen dauerhaft behalten — spätere Regressionsprüfungen können denselben Testfall wiederverwenden, ohne ihn neu zu bauen.

**How to apply:** Bei neuen manuellen Testszenarien in `app.test.html`: standardmäßig dauerhaft einbauen, nicht als Einmal-Skript planen. Nur auf explizite Anweisung wieder entfernen.
