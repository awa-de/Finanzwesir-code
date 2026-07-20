Stand: 2026-07-20 | Session: APP-DATA-05 | Geändert von: Claude

# Chart Engine — Datenpfad-Regressionsregeln

**Zweck:** Pflichtregeln für alle Änderungen an allgemeiner Chart-Engine-Logik, charttypübergreifender Datenlogik oder Datums-/Zeitachsenlogik.
**Wann lesen:** Vor jeder Änderung an `ChartEngine.js`, Strategie-Klassen, Plugins oder DateUtils-Aufrufstellen.
**Bindend für:** Claude und alle Engine-APs.

---

## Anlass

Diese Spec wurde nach B1-AP-14e2 (fwVerticalLine-Auslagerung) verankert. In AP-14e2 wurde eine Regression erkannt: `LineChartStrategy._toMonthKey()` verwendete String-Methoden auf Datumswerten, obwohl derselbe Code auch über den CSV-Pfad mit nativen `Date`-Objekten aufgerufen wird. Die Regression war charttypunabhängig latent und wäre bei BarCharts mit Zeitachse ebenso aufgetreten.

---

## Pflicht-Regressionsregel

**Jede Änderung an allgemeiner Chart-Engine-Logik, charttypübergreifender Datenlogik oder Datums-/Zeitachsenlogik muss beide Engine-Datenpfade prüfen.**

Diese Regel gilt unabhängig vom Charttyp.

Sie gilt insbesondere für:

```text
LineCharts mit Zeitachse
BarCharts mit Jahres-/Monats-/Datumsachse
ScatterCharts mit Datums-/Zeitwerten
Plugins, die Datenpunkte oder x-Werte lesen
Engine-Code, der Daten normalisiert, transformiert oder für Chart.js vorbereitet
```

---

## Die zwei Engine-Datenpfade

### Datenpfad A — App-/Runtime-Pfad

```text
ChartEngine.renderFromData()
→ Daten werden direkt als JS-Objekte übergeben.
→ Datumsfelder können Strings sein, z. B. { Date: "YYYY-MM-DD" }.
→ Kein CSVParser beteiligt.
```

Typischer Aufrufer: `app.js` in einer App wie `prokrastinations-preis`.

### Datenpfad B — CSV-/Standardchart-Pfad

```text
ChartEngine._processContainer()
→ Daten kommen aus CSVParser.parse(..., { expectDate: true }).
→ Datumsfelder sind native Date-Objekte, nicht zwingend Strings.
→ CSVParser ist Protected / Single Source of Truth.
```

Typischer Aufrufer: HTML mit `data-app-file`-Attribut (produktive Ghost-Cards, seit APP-DATA-04b) oder `data-csv`-Attribut (Standard-Test-HTMLs). Beide münden nach der URL-Bildung in denselben `parser.parse()`-Aufruf — kein zweiter Codepfad.

---

## Konsequenz für Engine-Code

Engine-Code darf bei Datumsfeldern **nie** blind String-Methoden verwenden, wenn derselbe Code auch über Datenpfad B (CSV-Pfad) aufgerufen werden kann.

### Verbotene Muster ohne vorherige Normalisierung

```js
// VERBOTEN — funktioniert nur bei String-Dates (Datenpfad A):
dateValue.slice(0, 10)
dateValue.split('-')
dateValue.substring(0, 4)
dateValue < '2020-01-01'
typeof dateValue === 'string'   // als Guard allein nicht ausreichend
```

### Pflichtmuster

Datumswerte müssen defensiv normalisiert werden — über:

```js
FwDateUtils.parse(dateValue)
```

oder einen bereits vorhandenen passenden DateUtils-Helfer, der sowohl String als auch `Date`-Objekt korrekt verarbeitet.

**Niemals** eigene String-/Date-Konvertierungslogik in Engine- oder Plugin-Code schreiben, wenn ein DateUtils-Helfer existiert.

---

## Protected Files

```text
CSVParser.js     — Protected / Single Source of Truth
FwDateUtils.js   — Protected / Single Source of Truth
FinanzwesirData.js — Protected / Single Source of Truth
```

Diese Dateien werden **nicht** für lokale Sonderfälle geändert.

Wenn lokale Engine-Logik mit unterschiedlichen Date-Typen nicht umgehen kann, wird **nicht** `CSVParser.js` oder `FwDateUtils.js` lokal angepasst. Stattdessen wird die aufrufende Engine-/Plugin-Logik defensiv und spec-konform korrigiert.

---

## Pflichtprüfung nach jeder Engine-Änderung

Nach jeder Änderung an allgemeiner Engine-Logik ist zu prüfen:

| # | Prüfpunkt | Test-Referenz |
|---|-----------|---------------|
| 1 | Funktioniert ein Chart über `renderFromData()`? | REG-APP-001 ff. |
| 2 | Funktioniert ein Chart über `_processContainer()` / CSV? | REG-X-001, REG-CSV-001 ff. |
| 3 | Gibt es Date-Handling-Code, der Strings voraussetzt? | Manuell: Code-Review |
| 4 | Sind BarCharts mit Zeit-/Datumsachse mitbedacht? | REG-Y-003, index_balken.html |
| 5 | Wurden `CSVParser.js`, `FwDateUtils.js`, `FinanzwesirData.js` unangetastet gelassen? | git diff |

Wenn einer dieser Punkte unklar ist:

```text
nicht weitercoden
Befund dokumentieren
kleinen Regression-Fix-AP formulieren
kein grünes Gesamturteil vortäuschen
```

---

## Geltungsbereich dieser Spec

Diese Spec gilt zusätzlich zu — und nicht statt — den Regeln in:

```text
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md  → Plugin-spezifische Regressionsregeln (§13.3)
docs/steering/engine/REGRESSION-MATRIX.md → wiederholbare Testfälle (Test-IDs REG-*)
```

Widersprüche zwischen dieser Spec und der Plugin-Architektur-Spec: Plugin-Architektur-Spec gilt für Plugin-spezifische Entscheidungen; diese Spec gilt für Engine-übergreifende Datenpfad-Fragen.
