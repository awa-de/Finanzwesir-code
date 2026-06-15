---
name: project-csvparser-gatekeeper
description: "CSVParser Layer-1 GATEKEEPER-Verhalten — erzwingt date als erste Spalte, wirft vor Rückgabe von rows, macht app.js-date-Checks zu totem Code"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9f1f157b-5384-45e9-a463-a28a53b297bf
---

CSVParser (Layer 1, TABU) erzwingt, dass die erste Spalte `date` heißt und YYYY-MM-DD-Werte enthält. Wenn nicht, wirft CSVParser eine Exception, bevor `rows` an die aufrufende App übergeben werden.

**Why:** Entdeckt 2026-06-05 beim Nachputz Slice-2 (APP-01): Test-Szenario Q (CSV ohne date-Spalte) lieferte Error-State (b) statt Empty-State — CSVParser warf bereits beim Parsen, noch bevor app.js irgendeine Zeile sah.

**How to apply:**
- Jede `date`-Prüfung in `hasRequiredColumns` oder ähnlichen app.js-Checks ist toter Code — CSVParser hat bereits geworfen, wenn rows erreicht werden
- `!(row.date instanceof Date)` als defense-in-depth behalten (falls CSVParser jemals geändert wird), aber nicht als primäre Schutzmaßnahme zählen
- Für Test-Szenarien mit ungültigem/fehlendem date-Header: Error-State (b) erwarten, nicht Empty-State
- Gilt für alle Apps die CSVParser nutzen — nicht nur prokrastinations-preis

Verknüpft: [[project-datenlayer]]
