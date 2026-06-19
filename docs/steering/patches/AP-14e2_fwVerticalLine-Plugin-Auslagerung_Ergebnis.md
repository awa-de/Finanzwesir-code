Stand: 2026-06-19 | Session: B1-AP-14e2 | Geändert von: Claude

# AP-14e2 — fwVerticalLine-Plugin auslagern und Plugin-Liste erhalten — Ergebnis

## Kurzurteil

Umgesetzt. fwVerticalLine ist ausgelagert, Plugin-Liste wird nicht mehr überschrieben.
CrosshairPlugin-Bug behoben. Alle statischen Prüfungen bestanden.

## Vorprüfung

| Check | Ergebnis |
|---|---|
| Inline-Block `id: 'fwVerticalLine'` in ChartEngine.js vorhanden? | ✅ Ja — Zeile 316 |
| `chartConfig.plugins = [...]` überschreibend gesetzt? | ✅ Ja — Zeile 317 |
| FwAnnotationPulsePlugin bereits per push eingebunden? | ✅ Ja — Zeile 341 |
| `plugins/FwVerticalLinePlugin.js` bereits vorhanden? | ✅ Nein — kein STOPP |
| `plugins/index.js` vorhanden? | ✅ Nein — direkte Imports |

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`

## Neu angelegte Dateien

- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js`

## Nicht geänderte Dateien

- `core/FwChartPlugins.js` ✅
- `plugins/FwAnnotationPulsePlugin.js` ✅
- `strategies/LineChartStrategy.js` ✅
- `strategies/PieChartStrategy.js` ✅
- `strategies/BarChartStrategy.js` ✅
- `Apps/prokrastinations-preis/app.js` ✅
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` ✅
- `NAVIGATION.md` ✅
- `PROJECT-STATUS.md` ✅
- `BACKLOG.md` ✅

## Entfernte Inline-Logik

Aus `ChartEngine._draw()` entfernt (Zeilen 315–336 alt):

```js
// NEW — Slice 6: VertikaleLinie als Chart.js-inline-Plugin (Option A: pixel-genau)
if ((runtimeConfig.features || {}).verticalLine === 'last') {
    chartConfig.plugins = [{
        id: 'fwVerticalLine',
        afterDraw: function(chart) { ... }
    }];
}
```

## Neue Plugin-Datei

`Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js`:

```js
export const FwVerticalLinePlugin = {
    id: 'fwVerticalLine',
    afterDraw(chart) {
        var meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data || !meta.data.length) return;
        var last = meta.data[meta.data.length - 1];
        if (!last || typeof last.x !== 'number') return;
        var ctx = chart.ctx;
        var chartArea = chart.chartArea;
        if (!ctx || !chartArea) return;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(last.x, chartArea.top);
        ctx.lineTo(last.x, chartArea.bottom);
        ctx.strokeStyle = '#0071bf';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
    }
};
```

Defensive Guards hinzugefügt (gegenüber altem Inline-Code): `!last || typeof last.x !== 'number'` und `!ctx || !chartArea`.

## Neue Plugin-Einbindung in ChartEngine.js

Import (Z. 69):
```js
import { FwVerticalLinePlugin } from '../plugins/FwVerticalLinePlugin.js'; // NEW — B1-AP-14e2
```

Einbindung in `_draw()` (Z. 316–320):
```js
// CHANGED — B1-AP-14e2: FwVerticalLinePlugin ausgelagert, Push statt Überschreiben
if ((runtimeConfig.features || {}).verticalLine === 'last') {
    if (!chartConfig.plugins) chartConfig.plugins = [];
    chartConfig.plugins.push(FwVerticalLinePlugin);
}
```

## Bestätigung: chartConfig.plugins wird nicht mehr überschrieben

Alte Zuweisung `chartConfig.plugins = [{...}]` entfernt.
Neue Logik: Guard `if (!chartConfig.plugins) chartConfig.plugins = [];` + push.
Bestehende Plugin-Arrays werden nie überschrieben.

## Bestätigung: bestehende Strategie-Plugins bleiben erhalten

`LineChartStrategy.getChartConfig()` gibt `plugins: [CrosshairPlugin]` zurück (Array).
`push(FwVerticalLinePlugin)` fügt an → CrosshairPlugin bleibt erhalten.
FwAnnotationPulsePlugin-Push-Block (Z. 323–325) strukturell unverändert.

## Prüfungen (statisch)

| Nr. | Prüfung | Ergebnis |
|---|---|---|
| 1 | Keine Inline-Definition `id: 'fwVerticalLine'` in ChartEngine.js | ✅ |
| 2 | Keine Zuweisung `chartConfig.plugins = [...]` mehr | ✅ |
| 3 | Import FwVerticalLinePlugin aus `../plugins/FwVerticalLinePlugin.js` | ✅ |
| 4 | Push-Logik bei `features.verticalLine === 'last'` | ✅ |
| 5 | Bestehende chartConfig.plugins werden nicht überschrieben | ✅ |
| 6 | FwAnnotationPulsePlugin-Import bleibt bestehen | ✅ |
| 7 | FwAnnotationPulsePlugin-Push bleibt unverändert | ✅ |
| 8 | LineChartStrategy.js nicht geändert | ✅ |
| 9 | PieChartStrategy.js nicht geändert | ✅ |
| 10 | BarChartStrategy.js nicht geändert | ✅ |
| 11 | FwChartPlugins.js nicht geändert | ✅ |
| 12 | FwAnnotationPulsePlugin.js nicht geändert | ✅ |
| 13 | plugins/index.js nicht angelegt und nicht geändert | ✅ |
| 14 | Keine CSS-Dateien geändert | ✅ |
| 15 | Keine JSON-Dateien geändert | ✅ |
| 16 | Keine CSV-Dateien geändert | ✅ |
| 17 | Keine Protected Files geändert | ✅ |

## Manuell offene Prüfungen

1. Prokrastinationspreis Screen 3: VertikalLinie sichtbar (blaue gestrichelte Linie)
2. Prokrastinationspreis Screen 3: Crosshair funktioniert (Kerntest — war durch Bug zerstört)
3. Prokrastinationspreis Screen 2: Pulse-Marker unverändert
4. Standard-LineChart ohne verticalLine: keine Änderung sichtbar
5. BarChart: unverändert
6. Pie/Doughnut: unverändert

## Offene Punkte

Keine.

## Blocker

Keine.

## Empfohlener nächster AP

B1-AP-15 — Transitions + Reduced Motion
(nach Alberts manuellem Test von Screen 2 und Screen 3)

## Bestätigungen

- Keine CenterTextPlugin-Migration vorgenommen ✅
- Keine CrosshairPlugin-Migration vorgenommen ✅
- Kein FwBarLayoutPlugin geändert ✅
- Kein FwAnnotationPulsePlugin geändert ✅
- Kein plugins/index.js angelegt oder geändert ✅
- Keine Plugin-Registry gebaut ✅
- Keine Spec-Änderung vorgenommen ✅
- Keine Steuerdateien geändert ✅
- Keine CSS-Änderung vorgenommen ✅
- Keine JSON-Änderung vorgenommen ✅
- Keine CSV-Änderung vorgenommen ✅
- Keine Protected Files geändert ✅
- Keine AP-15-Arbeit begonnen ✅
- Keine Commits ausgeführt ✅
- Kein Abschlussritual ausgeführt ✅
