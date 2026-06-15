---
name: feedback-csvparser-vertrauenswuerdig
description: CSVParser-Output vollständig vertrauen — kein eigener Validierungscode in app.js
metadata:
  type: feedback
---

Was CSVParser.js/FinanzwesirData zurückgibt, ist korrekt und vollständig validiert. Keine eigene Re-Validierung der Parser-Felder im App-Code. „Der Parser liefert. Die App bedient sich."

**Why:** CSVParser ist Layer-1-Vault mit eigenem GATEKEEPER-Verhalten — er wirft vor Rückgabe von rows wenn date-Spalte fehlt oder ungültig ist. Eigener Validierungscode in app.js war toter Code (date-Prüfung in hasRequiredColumns: CSVParser lässt rows mit fehlender date-Spalte nie durch). Doppelvalidierung impliziert Misstrauen gegenüber Layer 1 und erzeugt Konfusion. Alberts explizite Architekturentscheidung.

**How to apply:** Nach `CSVParser.parse()`: Ergebnis direkt verwenden. Keine eigenen Null-Checks, Format-Validierungen oder Existenzprüfungen für CSVParser-Ergebnisse in app.js. Fehlerbehandlung nur für Netzwerk-/Lade-Fehler, nicht für Parser-Output-Qualität. Error-State (b) bei Tests mit ungültigem date-Header erwarten. Verwandt: [[project_csvparser_gatekeeper]].
