# AP-14e7 — FwBarLayoutPlugin im BarChart-Hybrid vollständig prüfen — Ergebnis

Stand: 2026-06-22 | Session: B1-AP-14e7 | Geändert von: Claude

---

## Kurzurteil

- `FwBarLayoutPlugin` ist formal ein korrektes Chart.js-Plugin (id, beforeUpdate-Hook, kein Domain-State).
- Es schreibt `chart._fwGeometry.halfBarPixel` — aber **kein Code liest diesen Wert**.
- `FwSmartXAxis.afterFit()` berechnet seinen eigenen `halfBarPixel` unabhängig und liest `_fwGeometry` nicht.
- Die Isolation für AP-14e8 ist technisch sauber: keine Imports nötig, kein fwContext, kein Theme.
- **Ungeklärte Designfrage**: Ist `FwBarLayoutPlugin` dead code, oder ist die Spec-Intention (Plugin → Achse) bewusst aufgegeben worden?
- Diese Frage muss in AP-14e8 explizit entschieden werden — vor oder während der Auslagerung.

---

## Repo-Ausgangslage

Nach B1-AP-14e6:
- `core/FwChartPlugins.js` gelöscht (Re-Export-Shim entfernt)
- Plugins: `FwAnnotationPulsePlugin.js`, `FwVerticalLinePlugin.js`, `CrosshairPlugin.js`, `CenterTextPlugin.js` liegen unter `plugins/`
- `FwBarLayoutPlugin` ist noch **inline** in `BarChartStrategy.getChartConfig()` (Z.238–247)
- Alle manuellen Tests bestanden

---

## Gelesene Dateien

```
Theme/assets/js/fw-chart-engine/strategies/BarChartStrategy.js     (vollständig)
Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js    (vollständig)
Theme/assets/js/fw-chart-engine/core/ChartEngine.js                (Z.1–229)
Theme/assets/js/fw-chart-engine/core/FwSmartScales.js              (vollständig)
Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js               (vollständig)
Theme/assets/js/fw-chart-engine/core/FwSmartYAxis.js               (vollständig)
Theme/assets/js/fw-chart-engine/core/FwSmartTooltips.js            (vollständig)
Theme/assets/js/fw-chart-engine/core/FwRenderer.js                 (vollständig)
docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md                        (vollständig)
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md                              (vollständig)
```

---

## Suchbefunde

### FwBarLayoutPlugin
```
rg "FwBarLayoutPlugin" .
```
Treffer (JS-Dateien): `BarChartStrategy.js` Z.238 (Definition als const), Z.266 (plugins: [FwBarLayoutPlugin])  
Treffer (Doku): NAVIGATION.md, PROJECT-STATUS.md, AP-Ergebnisprotokolle (AP-14e1/14e2/14e5/14e6), docs/spec/Dokumentation Die Baendigung der X-Achse III.md  
Irrelevant: Steuerdateien (nur Namenserwähnungen)

### _fwGeometry
```
rg "_fwGeometry" .
```
Treffer (JS-Dateien):
- `BarChartStrategy.js` Z.245: **SCHREIBT** `chart._fwGeometry = { halfBarPixel: ... }`
- Sonst: **kein JS-Leser**

Treffer (Doku):
- `docs/spec/Dokumentation Die Baendigung der X-Achse I.md`: "Speicherung dieser Werte im internen Chart-Objekt (chart._fwGeometry)"
- `docs/spec/Dokumentation Die Baendigung der X-Achse III.md`: "Diese Werte werden als _fwGeometry an die Achse übergeben", "4K Ultrawide | _fwGeometry Sensor"
- `docs/steering/patches/AP-14e1_Plugin-Ist-Befund-finalisieren_Ergebnis.md`: Hinweis, ob Pattern ohne beforeUpdate-Plugin erreichbar wäre

**Befund**: `_fwGeometry` ist **dead state** — geschrieben, nirgendwo gelesen.

### halfBarPixel
```
rg "halfBarPixel" .
```
Treffer:
- `BarChartStrategy.js` Z.245: Schreibt über Plugin
- `FwSmartXAxis.js` Z.286: **Lokale Variable** in `afterFit()`, **eigenständige Berechnung**, liest NICHT aus `_fwGeometry`
- docs/spec: mehrfache Erwähnungen (konzeptuell)
- Apps/: **kein Treffer**

### fwBarLayout
```
rg "fwBarLayout" .
```
Treffer: `BarChartStrategy.js` Z.239 (id-Deklaration) + AP-14e1-Protokoll.

### axisType, viewMode, ranking, dateSemantics
- `axisType`: BarChartStrategy setzt 'time' (History) und 'category' (Ranking); auch BaseChartStrategy, LineChartStrategy, PieChartStrategy
- `viewMode`: FwSmartTooltips liest `viewMode === 'ranking'` für mode/intersect-Switching
- `ranking`: nur in BarChartStrategy und FwSmartTooltips
- `dateSemantics`: BarChartStrategy setzt 'PERIOD' für beide Modi; FwSmartXAxis liest zur Entscheidung SNAPSHOT vs. PERIOD-Track

---

## Formale Plugin-Klassifikation

| Merkmal | Befund |
|---------|--------|
| Formal Chart.js-Plugin? | **JA** — Objekt-Literal mit `id` und Lifecycle-Hook |
| id | `'fwBarLayout'` |
| Hook | `beforeUpdate` |
| Einbindung | `plugins: [FwBarLayoutPlugin]` in `getChartConfig()` |
| Presentation/Runtime-Layer? | **JA** — liest nur Chart-Runtime-State |
| Domain-State? | **NEIN** |
| Schreibt Daten/CSV/JSON? | **NEIN** |
| Schreibt App-State? | **NEIN** |
| Ephemerer Chart-Runtime-State? | **JA** — schreibt `chart._fwGeometry` (aber kein Leser) |
| Spec §3-Ausnahme | **TRIFFT ZU** — klein, BarChart-intern, genau ein Engine-Call |

---

## BarChart-Hybrid: History-/Zeitachsenmodus

### Aktivierung
- `isSingleAsset = true` → immer History
- `isSingleAsset = false && config.view !== 'ranking'` → History (Standard)
- `fwContext.axisType = 'time'`, `fwContext.viewMode = 'history'`

### Datenpunkte
- `x = FwDateUtils.getBopAnchor(ts, bopRhythm)` — Zeitanker (BOP-Policy)
- `_originalDate = ts` — echter Timestamp
- `dateSemantics = 'PERIOD'`
- QUARTERLY/HALF_YEARLY: bopRhythm = 'MONTHLY' (Korrektur Dez→Okt Bug)

### X-Achse
- `FwSmartScales.getTimeAxis(...)` → `FwSmartXAxis.compute(fwContext, fontConfig)`
- PERIOD-Track: `afterFit()` mit eigenem `halfBarPixel = (pixelPerInterval * 0.8 * 0.9) / 2`
  - `pixelPerInterval = axis.width / (dataCount - 1)` (N-1 Intervalle, Chart.js Zeitgeometrie)
- Achsenverlängerung: `rawExtension = halfBarPixel * msPerPixel * 1.5`

### FwBarLayoutPlugin im History-Modus
- `dataCount = datasets[0].data.length` = Anzahl Zeitpunkte
- `pixelPerSlot = xScale.width / dataCount` (N Slots, **nicht** N-1 Intervalle)
- Schreibt `chart._fwGeometry.halfBarPixel` — **wird nicht gelesen**
- Kein Datum-Handling, keine Zeitachsenlogik, keine BOP-Änderungen

### Zeitempfindlichkeit
- Plugin berührt nicht: BOP-Anker, sourceTicks, _originalDate, FwSmartXAxis-Logik
- SAFE für History-Modus

---

## BarChart-Hybrid: Ranking-/Kategorieachsenmodus

### Aktivierung
- `isSingleAsset = false && config.view === 'ranking'` → Ranking
- `fwContext.axisType = 'category'`, `fwContext.viewMode = 'ranking'`

### Datenpunkte
- `x = col` — Asset-/Spaltenname als String (Kategorieachse)
- `_originalDate = ts` — echter Timestamp (Jan-1970-Bug-Fix v41.0.0)
- `dateSemantics = 'PERIOD'`
- **Kein Zeitanker** — kein BOP, kein sourceTicks

### X-Achse
- Inline-Kategorie: `type: 'category', ticks: { ... }`
- FwSmartXAxis.compute() wird NICHT aufgerufen
- `afterFit()` PERIOD-Track läuft nicht → kein unabhängiger halfBarPixel

### FwBarLayoutPlugin im Ranking-Modus
- `dataCount = datasets[0].data.length` = Anzahl Kategorien (Assets)
- `pixelPerSlot = xScale.width / dataCount` = Pixel pro Kategorie-Slot
- Schreibt `chart._fwGeometry.halfBarPixel` — **wird nicht gelesen**
- Kein Datum-Handling

### Regressions-Sicherheit
- `_originalDate` wird nicht vom Plugin berührt — Jan-1970-Bug bleibt sicher
- Semantisches X-Mapping (col-Namen) wird nicht berührt

---

## _fwGeometry / halfBarPixel Analyse

### Wer schreibt `chart._fwGeometry`?
Nur `FwBarLayoutPlugin.beforeUpdate()` in `BarChartStrategy.getChartConfig()`.

### Wer liest `chart._fwGeometry`?
**Niemand** — kein Treffer in JS-Code (Core, Strategies, Plugins, Apps).

### FwSmartXAxis.afterFit() — eigenständige Berechnung
```js
// Z.285-286 in FwSmartXAxis.js (PERIOD-Track):
const pixelPerInterval = axis.width / (dataCount - 1);  // N-1 Intervalle
const halfBarPixel = (pixelPerInterval * 0.8 * 0.9) / 2;
const msPerPixel = (dataMax - dataMin) / axis.width;
const rawExtension = halfBarPixel * msPerPixel * 1.5;
```

Diese Berechnung ist **unabhängig** von `chart._fwGeometry`. Sie unterscheidet sich auch in der Basis:
- Plugin: `xScale.width / dataCount` (N Slots)
- afterFit: `axis.width / (dataCount - 1)` (N-1 Intervalle)

### Design-Intention vs. Implementierung
Die Spec-Dokumente ("Baendigung der X-Achse") beschreiben `_fwGeometry` als Kommunikationskanal Plugin → Achse. Die aktuelle `FwSmartXAxis.afterFit()`-Implementierung hat diesen Kanal aber **nicht verdrahtet** — sie berechnet eigenständig.

**Folge**: `FwBarLayoutPlugin` berechnet `_fwGeometry`, das niemand liest. Der Achsenextension-Code in `afterFit()` läuft unabhängig mit eigener Formel.

### Ist `dataCount` korrekt für beide Modi?
- **History**: `datasets[0].data.length` = Zeitpunkte ✓
- **Ranking**: `datasets[0].data.length` = Assets (Spaltenzahl) ✓
- Early-Return wenn `!xScale || !chart.data.datasets[0]?.data.length` greift korrekt

---

## Abhängigkeiten außerhalb BarChartStrategy

| Datei | liest _fwGeometry | liest halfBarPixel aus _fwGeometry | Befund |
|-------|-------------------|------------------------------------|--------|
| ChartEngine.js | NEIN | NEIN | Keine Abhängigkeit |
| FwSmartXAxis.js | NEIN | NEIN | Eigene lokale Berechnung |
| FwSmartYAxis.js | NEIN | NEIN | Keine Abhängigkeit |
| FwSmartScales.js | NEIN | NEIN | Keine Abhängigkeit |
| FwSmartTooltips.js | NEIN | NEIN | Keine Abhängigkeit |
| FwRenderer.js | NEIN | NEIN | Keine Abhängigkeit |
| BaseChartStrategy.js | NEIN | NEIN | Keine Abhängigkeit |
| apps/*/app.js | NEIN | NEIN | Keine Abhängigkeit |
| plugins/*.js | NEIN | NEIN | Keine Abhängigkeit |

**FwSmartTooltips** liest `raw._originalDate` für Tooltip-Datum — unabhängig von Plugin-Geometrie.

---

## Regressionsregel AP-14e3

| Prüfpunkt | Befund |
|-----------|--------|
| Hat `FwBarLayoutPlugin` Datumslogik? | NEIN — nur Geometrie aus xScale.width |
| Berührt Plugin Zeitachsenlogik? | NEIN |
| Berührt Auslagerung FwDateUtils.parse()-Pfad? | NEIN |
| Berührt Auslagerung CSVParser.parse()? | NEIN |
| Datenpfad A (renderFromData) betroffen? | Plugin-Verhalten identisch (kein Unterschied) |
| Datenpfad B (CSV/_processContainer) betroffen? | Plugin-Verhalten identisch |
| String-Annahmen auf Datumswerten? | NEIN — Plugin liest keine Datumswerte |
| CSVParser.js, FwDateUtils.js, FinanzwesirData.js unangetastet? | JA |

**Besonderheit zu Datenpfad A (renderFromData) für BarCharts**:  
`ChartEngine.renderFromData()` validiert auf `{ month, depotwert }`-Format (Single-Column, LineChart-Shape). Multi-Asset-BarCharts werden praktisch NICHT über `renderFromData()` genutzt — das API ist auf LineChart-Daten zugeschnitten. BarCharts laufen primär über Datenpfad B (CSV). Für AP-14e8-Tests ist `renderFromData()` mit type='bar' formal möglich, aber praktisch ungenutzt.

**Regressionsregel-Ergebnis**: Auslagerung verletzt AP-14e3 nicht.

---

## Auslagerbarkeit

### Mögliche Zieldatei
```
Theme/assets/js/fw-chart-engine/plugins/FwBarLayoutPlugin.js
```

### Plugin-Code (aktuell, Z.238–247 BarChartStrategy.js)
```js
const FwBarLayoutPlugin = {
    id: 'fwBarLayout',
    beforeUpdate: (chart) => {
        const xScale = chart.scales.x;
        if (!xScale || !chart.data.datasets[0]?.data.length) return;
        const dataCount = chart.data.datasets[0].data.length;
        const pixelPerSlot = xScale.width / dataCount;
        chart._fwGeometry = { halfBarPixel: (pixelPerSlot * 0.8 * 0.9) / 2 };
    }
};
```

### Prüfpunkte

| Frage | Befund |
|-------|--------|
| Müsste Plugin Theme/DateUtils/Strategy-Kontext importieren? | **NEIN** — kein externer Import nötig |
| Ist Plugin-Code eigenständig? | **JA** — nur Chart-Laufzeit-State |
| Nur von `chart.scales.x` und `chart.data.datasets` abhängig? | **JA** |
| Bleibt BarChartStrategy durch Import stabil? | **JA** — 1 Import-Zeile, 1 Referenz bleibt |
| Risiken durch Closure-Kontext? | **NEIN** — keine Closure, reine Funktion |
| Risiken, weil aktuell in getChartConfig() neu erzeugt? | **NEIN** — Plugin ist stateless, kein Unterschied Singleton vs. Inline |
| Singleton-Plugin macht Unterschied? | **NEIN** — `beforeUpdate` ist stateless |
| Plugin braucht Zugriff auf fwContext? | **NEIN** |
| Sollte Plugin bewusst in Strategy bleiben? | Entscheidungsbedarf (§3-Ausnahme vs. Konsistenz mit anderen Plugins) |

**Isolation ist technisch sauber.** Die Auslagerung wäre ein mechanischer 1:1-Move.

---

## Risiken einer Auslagerung

### Risiko 1 — Dead State (MITTEL)
`chart._fwGeometry` wird nach Auslagerung weiterhin geschrieben, aber von niemanden gelesen.
- Vor Auslagerung klären: Wird der Wert in Zukunft gebraucht?
- Wenn nicht: Plugin könnte auch gelöscht werden statt ausgelagert
- Wenn ja: Verdrahtung mit `FwSmartXAxis.afterFit()` nötig (separate Designentscheidung)

### Risiko 2 — N vs. N-1 Diskrepanz (NIEDRIG, dokumentarisch)
Plugin rechnet mit `xScale.width / dataCount` (N Slots), `afterFit()` mit `axis.width / (dataCount - 1)` (N-1 Intervalle). Da `_fwGeometry` nicht gelesen wird, hat diese Diskrepanz keine Laufzeitwirkung. Sollte aber festgehalten werden, falls `_fwGeometry` später verdrahtet wird.

### Risiko 3 — Kategorie-Achsen-Verhalten (NIEDRIG)
Im Ranking-Modus läuft `FwSmartXAxis.afterFit()` nicht (Kategorieachse, kein PERIOD-Track). `FwBarLayoutPlugin` läuft in beiden Modi. Da `_fwGeometry` nirgendwo gelesen wird, entsteht kein falsches Verhalten — aber sollte `_fwGeometry` verdrahtet werden, müsste der Ranking-Modus separat behandelt werden.

### Risiko 4 — Spec §3-Ausnahme (NIEDRIG)
Die Ausnahme deckt das Verbleiben in Strategy. Auslagerung erzeugt Konsistenz mit anderen Plugins — ist aber keine Pflicht. Die Designentscheidung (auslagern vs. behalten) ist bewusst zu treffen und zu dokumentieren.

---

## Empfohlene Testmatrix für AP-14e8

| Testfall | Datei | Was prüfen |
|----------|-------|------------|
| BarChart History-View, Single-Asset, Zeitachse | `index_balken.html` (1 Spalte) | Balken korrekt, Zeitachse korrekt, keine Regression |
| BarChart History-View, Multi-Asset, Zeitachse | `index_balken.html` (mehrere Spalten) | Balken pro Asset, Zeitachse korrekt |
| BarChart Ranking-View, Multi-Asset, Kategorieachse | `index_balken.html` mit Vergleichs-Ansicht | Assets auf X-Achse, _originalDate korrekt |
| BarChart über CSV-Pfad (_processContainer) | Standard-HTML mit `data-csv` | CSV-Datenpfad unverändert |
| BarChart über renderFromData() mit type='bar' | Manuell (falls praktisch unterstützt) | Funktioniert oder scheitert erwartbar |
| LineChart — Keine Regression | beliebige Line-Chart-Testseite | FwBarLayoutPlugin darf nicht ausgelöst werden |
| Pie/Doughnut — Keine Regression | beliebige Pie-Chart-Testseite | FwBarLayoutPlugin darf nicht ausgelöst werden |
| Prokrastinationspreis Screen 2 Pulse | apps/prokrastinations-preis/ | Pulse läuft, kein Konflikt mit BarLayout |
| Prokrastinationspreis Screen 3 Crosshair + VerticalLine | apps/prokrastinations-preis/ | Crosshair + VLine korrekt, kein BarLayout-Effekt |
| Viewport S (Mobile < 450px) | BarChart History | Achse korrekt skaliert |
| Viewport M (Tablet 450–900px) | BarChart History | Tick-Dichte korrekt |
| Viewport L (Desktop ≥ 900px) | BarChart History | Volle Darstellung |

---

## Entscheidungsempfehlung

### Kann AP-14e8 = auslagern durchgeführt werden?

**JA — mit einer Vorklärung.**

Die technische Isolation ist sauber. Der Plugin-Code braucht keine Imports, keinen fwContext, kein Theme.

**Vor Auslagerung in AP-14e8 muss Albert explizit entscheiden:**

> Ist `chart._fwGeometry` bewusst toter State (für spätere Nutzung vorgehalten), oder soll der Plugin-Wert gelöscht / der Plugin entfernt werden?

**Drei Optionen:**

| Option | Was passiert | Empfehlung |
|--------|-------------|------------|
| A — Auslagern 1:1 | `FwBarLayoutPlugin.js` neu, BarChartStrategy importiert | Möglich, aber perpetuiert dead state |
| B — Auslagern + _fwGeometry streichen | Plugin bleibt, `chart._fwGeometry`-Zeile entfällt | Sauber, wenn _fwGeometry nicht gebraucht wird |
| C — Plugin löschen | Kein Plugin, kein _fwGeometry | Sauber, wenn Plugin keinen Effekt hat und keinen haben soll |

**Hinweis**: Da `afterFit()` in FwSmartXAxis seine Achsenverlängerung eigenständig berechnet, hat das Plugin heute keinen messbaren Effekt auf die Achsendarstellung.

---

## Offene Punkte

1. **_fwGeometry-Status**: War `chart._fwGeometry` jemals verdrahtet? Wurde die Verdrahtung im Zuge einer Refactoring-Welle aufgetrennt? Oder ist das Plugin ein Vorbereitungsschritt für zukünftige Nutzung?
2. **N vs. N-1**: Plugin rechnet N Slots, afterFit() rechnet N-1 Intervalle. Welcher Wert wäre korrekt, falls _fwGeometry verdrahtet würde?
3. **Spec-Revision**: Spec "Baendigung der X-Achse" beschreibt `_fwGeometry` als aktives Kommunikationsmittel. Entspricht das noch der Implementierungsrealität?

---

## Blocker

Keiner für die Auslagerung selbst. Die Vorklärung zur `_fwGeometry`-Frage ist inhaltlicher Natur, kein technischer Blocker.

---

## Empfohlener nächster AP

**AP-14e8 — FwBarLayoutPlugin auslagern** (mit Alberts Entscheidung zur _fwGeometry-Frage als Eingangsvoraussetzung)

Konkret in AP-14e8 zu klären und umzusetzen:
1. Albert entscheidet: Option A / B / C (siehe oben)
2. Umsetzung entsprechend
3. Testmatrix wie oben dokumentiert

---

## Bestätigungen

- Keine Codeänderung vorgenommen ✓
- FwBarLayoutPlugin nicht ausgelagert ✓
- Kein plugins/FwBarLayoutPlugin.js angelegt ✓
- Kein plugins/index.js angelegt oder geändert ✓
- Keine Plugin-Registry gebaut ✓
- Keine Runtime-Registry gebaut ✓
- BarChartStrategy.js nicht geändert ✓
- ChartEngine.js nicht geändert ✓
- FwDateUtils.js nicht geändert ✓
- FwSmartXAxis.js nicht geändert ✓
- FwSmartScales.js nicht geändert ✓
- Keine Tooltips geändert ✓
- Keine Achsenlogik geändert ✓
- Keine BOP-Anker geändert ✓
- _originalDate nicht geändert ✓
- Semantisches X-Mapping nicht geändert ✓
- CSVParser.js nicht geändert ✓
- FinanzwesirData.js nicht geändert ✓
- Keine CSS-Änderung vorgenommen ✓
- Keine JSON-Änderung vorgenommen ✓
- Keine CSV-Änderung vorgenommen ✓
- Keine Protected Files geändert ✓
- Keine AP-15-Arbeit begonnen ✓
- Keine Commits ausgeführt ✓
