Stand: 2026-06-23 | Session: B1-AP-15b | Geändert von: Claude

# B1-AP-15b Ergebnis

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`

## Ziel / Ergebnis

ChartEngine respektiert jetzt `prefers-reduced-motion: reduce` bei Chart.js-Animationen.

- Beim ersten Rendern eines Charts: Animation deaktiviert wenn Reduced Motion aktiv.
- Beim Aktualisieren eines bestehenden Charts: `chart.update('none')` statt `chart.update()` wenn Reduced Motion aktiv.
- Ohne Reduced Motion: identisches Verhalten wie vor dem Patch.

## Implementierung

**Neue Methode `_prefersReducedMotion()`** (nach `_extractOption`, vor `_parseConfig`):

```js
_prefersReducedMotion() { // NEW B1-AP-15b
    try {
        return typeof window !== 'undefined' &&
               window.matchMedia != null &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
        return false;
    }
}
```

Konvention identisch zu `FwAnnotationPulsePlugin.js`, ergänzt um try/catch laut Spec.

**Update-Pfad** (`_draw()`, `state.chartInstance`-Branch):
```js
// vorher:
state.chartInstance.update();
// nachher:
state.chartInstance.update(this._prefersReducedMotion() ? 'none' : undefined); // CHANGED B1-AP-15b
```

**Initial-Render** (`_draw()`, `requestAnimationFrame`-Callback, vor `new Chart(...)`):
```js
if (this._prefersReducedMotion()) { // NEW B1-AP-15b
    if (!chartConfig.options) chartConfig.options = {};
    chartConfig.options.animation = false;
}
state.chartInstance = new Chart(canvas, chartConfig);
```

Gesamt: 10 neue/geänderte Zeilen in einer Datei.

## Prüfungen

- App-/Runtime-Pfad `renderFromData()`: Pfad ruft `_draw()` auf → Update-Pfad und Initial-Render-Pfad beide abgedeckt. ✓
- CSV-/Standardchart-Pfad `_processContainer()`: Ruft ebenfalls `_draw()` auf → identisch abgedeckt. ✓
- Reduced Motion aktiv: `_prefersReducedMotion()` → `true` → Initial: `animation = false`; Update: `update('none')`. ✓
- Reduced Motion nicht aktiv: `_prefersReducedMotion()` → `false` → Initial: keine Mutation; Update: `update(undefined)` = `update()`. ✓
- Protected Files unangetastet: `FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js` nicht berührt. ✓

## Nicht geändert

- `Apps/prokrastinations-preis/app.js`
- `Apps/prokrastinations-preis/app.css`
- `Apps/prokrastinations-preis/config/stations.de.json`
- `Apps/prokrastinations-preis/APP_SPEC.md`
- `Apps/prokrastinations-preis/QA_TEST_CASES.md`
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/core/CSVParser.js`
- `Theme/assets/js/fw-chart-engine/core/FinanzwesirData.js`
- `Theme/assets/js/fw-chart-engine/core/FwDateUtils.js`
- Plugin-Dateien unter `Theme/assets/js/fw-chart-engine/plugins/`

## Offene Punkte

- `motionRules`-Validation bleibt Folge-AP (B1-AP-15c).
- Dead CSS Reduced-Motion Cleanup bleibt Folge-AP (B1-AP-15d).
- Draw-Animation normal bleibt bewusst offen, solange Spec dies so führt.
- Marker-Fade-in Screen 3 ist nicht Teil dieses AP.

## Blocker

nein

## Bestätigungen

- Keine Protected Files geändert: ✓
- Keine App-Dateien geändert: ✓
- Keine CSS-Änderung: ✓
- Keine JSON-Änderung: ✓
- Keine Strategy-Änderung: ✓
- Keine Plugin-Änderung: ✓
- Keine AP-16/AP-17/AP-18-Arbeit: ✓
- Keine AP-19/AP-20/AP-21-Arbeit: ✓
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓
