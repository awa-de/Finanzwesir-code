Stand: 2026-06-19 | Session: AP-14e4 | Geändert von: Claude

# AP-14e4 — CenterTextPlugin aus core nach plugins auslagern — Ergebnis

## Kurzurteil

Auslagerung vollständig und ohne Komplikationen durchgeführt.
Implementierung 1:1 übertragen, kein Verhalten geändert.
Mischzustand in `core/FwChartPlugins.js` (Re-Export + CrosshairPlugin-Implementierung) ist dokumentiert und temporär erwartet.

## Vorprüfung

| Prüfpunkt | Ergebnis |
|---|---|
| `CenterTextPlugin` noch in `core/FwChartPlugins.js` | ✓ ja (Zeilen 21–116) |
| `CrosshairPlugin` noch in `core/FwChartPlugins.js` | ✓ ja (Zeilen 122–149) |
| `PieChartStrategy.js` importiert aus `../core/FwChartPlugins.js` | ✓ ja (Zeile 32) |
| `plugins/CenterTextPlugin.js` bereits vorhanden | nein → kein Stop-Fall |
| Weitere Importe von `CenterTextPlugin` im Repo | keine (nur PieChartStrategy.js) |
| `plugins/index.js` vorhanden | nein → kein Stop-Fall |

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwChartPlugins.js`
- `Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js`

## Neu angelegte Dateien

- `Theme/assets/js/fw-chart-engine/plugins/CenterTextPlugin.js`
- `docs/steering/patches/AP-14e4_CenterTextPlugin-Auslagerung_Ergebnis.md` (dieses Dokument)

## Nicht geänderte Dateien

Alle nicht aufgeführten Dateien wurden nicht berührt. Explizit bestätigt:
`ChartEngine.js`, `FwAnnotationPulsePlugin.js`, `FwVerticalLinePlugin.js`,
`LineChartStrategy.js`, `BarChartStrategy.js`, `CSVParser.js`, `FwDateUtils.js`, `FinanzwesirData.js`,
`plugins/index.js` (existiert nicht, nicht angelegt).

## Entfernte Implementierung aus core/FwChartPlugins.js

Entfernt: vollständige `CenterTextPlugin`-Implementierung (Zeilen 21–116 vor AP).
Ersetzt durch: Re-Export-Shim (1 Zeile).
Fileheader aktualisiert auf Version 1.7.0.

## Neue Plugin-Datei

`Theme/assets/js/fw-chart-engine/plugins/CenterTextPlugin.js`

- Exakte Übernahme der CenterTextPlugin-Implementierung aus `core/FwChartPlugins.js` v1.6.1.
- Exportname unverändert: `export const CenterTextPlugin`
- Plugin-id unverändert: `'centerText'`
- Keine Verhaltensänderung, keine neuen Optionen, kein neuer State.

## Importänderung in PieChartStrategy.js

Zeile 32 vorher:
```js
import { CenterTextPlugin } from '../core/FwChartPlugins.js';
```

Zeile 32 nachher:
```js
import { CenterTextPlugin } from '../plugins/CenterTextPlugin.js'; // CHANGED AP-14e4
```

Keine weiteren Änderungen in `PieChartStrategy.js`.

## Temporärer Re-Export-Shim in core/FwChartPlugins.js

```js
// CHANGED AP-14e4: CenterTextPlugin ausgelagert — Re-Export-Shim für Altimporte
export { CenterTextPlugin } from '../plugins/CenterTextPlugin.js';
```

Mischzustand: `CenterTextPlugin` nur Re-Export, `CrosshairPlugin` noch Implementierung.
Wird aufgelöst wenn `CrosshairPlugin` in AP-14e5 ausgelagert wird.

## Bestätigung: CrosshairPlugin unverändert

`CrosshairPlugin` in `core/FwChartPlugins.js` wurde nicht angefasst.
Implementierung (id: `'crosshair'`) identisch zu Vor-AP-Zustand.

## Bestätigung: Pie/Doughnut-Verhalten unverändert

- `plugins: [CenterTextPlugin]` in `PieChartStrategy.getChartConfig()` unverändert.
- `centerText`-Options-Struktur unverändert.
- Keine Tooltip-, Legend- oder Achsenlogik geändert.
- Implementierung der `beforeDraw`- und `_fitText`-Methoden 1:1 übertragen.

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

| Regel | Status |
|---|---|
| Keine allgemeine ChartEngine-Datenlogik geändert | ✓ |
| Keine Datums-/Zeitachsenlogik geändert | ✓ |
| Keine String-Annahmen auf Datumswerten eingeführt | ✓ |
| `CSVParser.js` unberührt | ✓ |
| `FwDateUtils.js` unberührt | ✓ |
| `FinanzwesirData.js` unberührt | ✓ |

## Prüfungen (statisch)

| # | Prüfpunkt | Status |
|---|---|---|
| 1 | `plugins/CenterTextPlugin.js` existiert | ✓ |
| 2 | CenterTextPlugin-Implementierung in `plugins/CenterTextPlugin.js` | ✓ |
| 3 | `core/FwChartPlugins.js` enthält keine CenterTextPlugin-Implementierung mehr | ✓ |
| 4 | `core/FwChartPlugins.js` enthält CrosshairPlugin unverändert | ✓ |
| 5 | `core/FwChartPlugins.js` enthält Re-Export-Shim für CenterTextPlugin | ✓ |
| 6 | `PieChartStrategy.js` importiert aus `../plugins/CenterTextPlugin.js` | ✓ |
| 7 | `PieChartStrategy.js` enthält weiterhin `plugins: [CenterTextPlugin]` | ✓ |
| 8 | `LineChartStrategy.js` nicht geändert | ✓ |
| 9 | `BarChartStrategy.js` nicht geändert | ✓ |
| 10 | `ChartEngine.js` nicht geändert | ✓ |
| 11 | `FwAnnotationPulsePlugin.js` nicht geändert | ✓ |
| 12 | `FwVerticalLinePlugin.js` nicht geändert | ✓ |
| 13 | `plugins/index.js` nicht angelegt und nicht geändert | ✓ |
| 14 | Keine CSS-Dateien geändert | ✓ |
| 15 | Keine JSON-Dateien geändert | ✓ |
| 16 | Keine CSV-Dateien geändert | ✓ |
| 17 | Keine Protected Files geändert | ✓ |
| 18 | Keine Datums-/Zeitachsenlogik geändert | ✓ |

## Manuell offene Prüfungen

Albert muss im VSCode-Live-Server prüfen:

- [ ] Pie/Doughnut-Chart rendert weiterhin
- [ ] Zentrumstext ist sichtbar
- [ ] Zentrumstext reagiert auf Hover wie vorher
- [ ] Tooltip/Legend unverändert
- [ ] LineChart/Crosshair unverändert
- [ ] BarChart unverändert
- [ ] Prokrastinationspreis Pulse/VerticalLine unverändert

## Offene Punkte

Keine.

## Blocker

Keine.

## Empfohlener nächster AP

**AP-14e5** — CrosshairPlugin aus `core/FwChartPlugins.js` auslagern.
Danach ist `core/FwChartPlugins.js` leer und kann entfernt werden.

## Bestätigungen

- Keine CrosshairPlugin-Migration vorgenommen
- Kein FwBarLayoutPlugin geändert
- Kein FwAnnotationPulsePlugin geändert
- Kein FwVerticalLinePlugin geändert
- Kein `plugins/index.js` angelegt oder geändert
- Keine Plugin-Registry gebaut
- Keine Spec-Änderung vorgenommen
- Keine Steuerdateien geändert außer Ergebnisprotokoll
- Keine allgemeine Engine-Codeänderung vorgenommen
- `ChartEngine.js` nicht geändert
- `LineChartStrategy.js` nicht geändert
- `BarChartStrategy.js` nicht geändert
- Keine Datums-/Zeitachsenlogik geändert
- `CSVParser.js` nicht geändert
- `FwDateUtils.js` nicht geändert
- `FinanzwesirData.js` nicht geändert
- Keine CSS-Änderung vorgenommen
- Keine JSON-Änderung vorgenommen
- Keine CSV-Änderung vorgenommen
- Keine Protected Files geändert
- Keine AP-15-Arbeit begonnen
- Keine Commits ausgeführt
