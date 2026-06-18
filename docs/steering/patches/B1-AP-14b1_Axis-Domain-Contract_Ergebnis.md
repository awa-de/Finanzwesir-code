# B1-AP-14b1 Ergebnis

Stand: 2026-06-18 | Session: B1-AP-14b1 | Geändert von: Claude

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- `Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js`

## STATIONS_IMPLEMENTATION_PLAN.md

- vorhanden: ja
- relevant: nein
- Befund: Datei existiert in `Apps/prokrastinations-preis/`. Grep auf 14b/xDisplay/displayRange/axis/domain/scale/tick/durationYears lieferte nur einen einzigen Treffer ("Domain-Validierung" im CSV-Lade-Abschnitt). Keine AP-14b-relevante Achsenlogik. Kein Konflikt.

## Implementierter Vertrag

- **xDisplayRange:** Top-Level-Option in `renderFromData(container, series, { xDisplayRange: { min, max } })`. Validierung: Objekt mit `min`/`max` als Strings im Format `YYYY-MM`. Bei Verletzung: `renderer.showError()` + return. Wird in `state.config.xDisplayRange` gespeichert und bei Re-Render aktualisiert.
- **displayRange:** Optionales Feld in `fwContext` (via `BaseChartStrategy._createFwContext`). Wert: `{ min: timestamp, max: timestamp }` oder `null`. Freezing: Shallow-Freeze (outer fwContext eingefroren, displayRange-Objekt intern).
- **dataRange unverändert:** `dataRange` wird weiterhin aus `snappedTimestamps[0]` / `snappedTimestamps[last]` gebildet. Keine Änderung an der dataRange-Berechnung.
- **durationYears aus displayRange:** Wenn `xDisplayRange` vorhanden: `fwDurationYears = FwDateUtils.getDiffYears(dispMinTs, dispMaxTs)`. Sonst: bestehendes `FwDateUtils.rangeToYears(config.range, ...)`. Density Matrix in FwSmartXAxis verwendet automatisch `fwContext.durationYears` aus dem Rucksack.
- **XAxis Scale:** `afterDataLimits` im SNAPSHOT-Track: wenn `fwContext.displayRange` vorhanden → `axis.min = displayRange.min`, `axis.max = displayRange.max`. Sonst: bestehendes 5%-Breathing-Room-Verhalten unverändert.
- **XAxis Ticks:** `_generateLinearTicks`: `endLimit = (context.displayRange?.max ?? context.dataRange?.max ?? axis.max) + halfStep`. Cursor startet ab `axis.min` (= `displayRange.min` wenn gesetzt). Ticks laufen bis `displayRange.max`.

## Fallback / Regression

- **Standard-LineCharts ohne xDisplayRange:** Vollständig unverändert. Alle Änderungen stehen hinter `if (config.xDisplayRange)` / `if (fwContext.displayRange)` / Optional-Chaining. Kein neues Pflichtfeld.
- **Verhalten bei ungültigem xDisplayRange:**
  - Nicht-Objekt / fehlende min/max / falsches Format → `renderer.showError()` in ChartEngine, kein Chart
  - `displayRange.min > dataRange.min` → throw in LineChartStrategy
  - `displayRange.max < dataRange.max` → throw in LineChartStrategy
  - `displayRange.min >= displayRange.max` → throw in LineChartStrategy

## Prüfungen

- ausgeführt: statische Verbots-Checks (grep über Engine-Dateien)
- Ergebnis:
  - `Chart.getChart`: nicht gefunden ✓
  - `options.scales.x.max` Post-Render-Fix: nicht gefunden ✓
  - `setTimeout` in Engine-Dateien (außer ChartEngine): nicht gefunden ✓
  - Fake-Dataset/Dummy: nur PieChartStrategy (Bestandscode, nicht von diesem AP) ✓
  - `displayRange` korrekt in allen 4 Dateien platziert ✓
  - `xDisplayRange` in ChartEngine an 5 Stellen korrekt ✓

## Bestätigungen

- Keine App-Dateien geändert: ✓ (`app.js`, `app.css` unberührt)
- Keine JSON geändert: ✓
- Keine Y-Policy implementiert: ✓ (`FwSmartYAxis.js` unberührt)
- Keine Marker implementiert: ✓
- Kein Post-Render-Hack: ✓ (kein `Chart.getChart`, kein `chart.update('none')`, kein `setTimeout`)
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓
- `FwDateUtils.js` nicht geändert (nur aufgerufen): ✓
- `FwSmartScales.js` nicht geändert (fwContext-Passthrough bereits korrekt): ✓

## Offene Punkte für B1-AP-14b2

- **Y-Policy** (`yRangePolicy: 'cumulative-expand-zero'`): noch nicht implementiert. Y-Achse ignoriert `displayRange` vollständig (korrekt für dieses AP).
- **App-Anschluss** (`app.js` Screen 2): `xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth }` muss in `renderFromData`-Aufruf eingebaut werden — folgt in separatem AP.
- **Diagnostik-Logs** in `FwSmartXAxis.afterDataLimits/afterBuildTicks` sind noch aktiv (Bestandscode). Können in B1-AP-14b2 oder späterem Cleanup entfernt werden.
- **Re-Render-Pfad testen**: Der WeakMap-Update-Pfad (`state.config.xDisplayRange = xDisplayRange`) ist implementiert, aber noch nicht durch manuellen Test abgedeckt.
