Stand: 2026-06-22 14:00 | Session: AP-14e9 | Geändert von: Claude

# AP-14e9 — Plugin-Barrel anlegen und Imports vereinheitlichen — Ergebnis

## Kurzurteil

GRUEN — Plugin-Barrel angelegt, alle 3 Importstellen auf `plugins/index.js` umgestellt.
Keine Plugin-Implementierung geändert. Keine Altpfade mehr vorhanden.

## Ausgangslage nach AP-14e8

- `FwBarLayoutPlugin` als Dead State entfernt (AP-14e8)
- `FwChartPlugins.js`-Shim bereits entfernt (AP-14e6)
- 4 aktive Plugin-Dateien in `plugins/`: CenterTextPlugin, CrosshairPlugin, FwAnnotationPulsePlugin, FwVerticalLinePlugin
- Alle 3 Konsumenten importierten direkt aus einzelnen Plugin-Dateien

## Vorprüfung

| Prüfung | Befund |
|---|---|
| `plugins/index.js` bereits vorhanden? | NEIN — darf angelegt werden |
| CenterTextPlugin.js vorhanden? | JA |
| CrosshairPlugin.js vorhanden? | JA |
| FwAnnotationPulsePlugin.js vorhanden? | JA |
| FwVerticalLinePlugin.js vorhanden? | JA |
| FwBarLayoutPlugin.js vorhanden? | NEIN — korrekt, nicht anzulegen |
| FwBarLayoutPlugin in BarChartStrategy.js? | NEIN — AP-14e8 entfernt |
| Altimporte aus core/FwChartPlugins.js? | NEIN — nur Kommentare in Plugin-Dateien |
| FwBarLayoutPlugin / fwBarLayout / _fwGeometry in produktivem JS? | NEIN |

Kein Stop-Fall eingetreten.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — Z.68-69: 2 Einzelimports → 1 Multiline-Import aus `../plugins/index.js`
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — Z.29: Importpfad auf `../plugins/index.js`
- `Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js` — Z.32: Importpfad auf `../plugins/index.js`

## Neu angelegte Dateien

- `Theme/assets/js/fw-chart-engine/plugins/index.js` — kanonischer Plugin-Barrel (4 Re-Exports)

## Nicht geänderte Dateien

Alle Plugin-Implementierungen, BarChartStrategy.js, alle Tabu-Dateien, alle Protected Files,
alle CSS/JSON/CSV-Dateien unverändert.

## Neuer Plugin-Barrel

```js
export { CenterTextPlugin } from './CenterTextPlugin.js';
export { CrosshairPlugin } from './CrosshairPlugin.js';
export { FwAnnotationPulsePlugin } from './FwAnnotationPulsePlugin.js';
export { FwVerticalLinePlugin } from './FwVerticalLinePlugin.js';
```

Kein Default Export. Keine Registry. Keine Array-Liste. Kein Chart.register(). Keine Logik.

## Exportierte Plugins

1. CenterTextPlugin
2. CrosshairPlugin
3. FwAnnotationPulsePlugin
4. FwVerticalLinePlugin

## Nicht exportierte / entfernte Plugins

- FwBarLayoutPlugin — bewusst NICHT exportiert (AP-14e8: Dead State entfernt)

## Importaenderung in ChartEngine.js

Vorher:
```js
import { FwAnnotationPulsePlugin } from '../plugins/FwAnnotationPulsePlugin.js'; // NEW — B1-AP-14c4
import { FwVerticalLinePlugin } from '../plugins/FwVerticalLinePlugin.js'; // NEW — B1-AP-14e2
```

Nachher:
```js
import { // CHANGED AP-14e9: Plugin-Barrel
    FwAnnotationPulsePlugin,
    FwVerticalLinePlugin
} from '../plugins/index.js';
```

## Importaenderung in LineChartStrategy.js

Vorher:
```js
import { CrosshairPlugin } from '../plugins/CrosshairPlugin.js'; // CHANGED AP-14e5
```

Nachher:
```js
import { CrosshairPlugin } from '../plugins/index.js'; // CHANGED AP-14e9: Plugin-Barrel
```

## Importaenderung in PieChartStrategy.js

Vorher:
```js
import { CenterTextPlugin } from '../plugins/CenterTextPlugin.js'; // CHANGED AP-14e4
```

Nachher:
```js
import { CenterTextPlugin } from '../plugins/index.js'; // CHANGED AP-14e9: Plugin-Barrel
```

## Restpruefung Altpfade

`rg "from '../plugins/" Theme/assets/js/fw-chart-engine`: alle 3 Treffer zeigen `index.js`
`rg "from './plugins/" Theme/assets/js/fw-chart-engine`: kein Treffer
Alle Direktimporte auf einzelne Plugin-Dateien beseitigt.

## Restpruefung FwBarLayoutPlugin / _fwGeometry

`rg "FwBarLayoutPlugin|fwBarLayout|_fwGeometry|FwChartPlugins" Theme/assets/js/fw-chart-engine Apps --type js`:
Kein produktiver Treffer. Nur Kommentare in CenterTextPlugin.js und CrosshairPlugin.js (Herkunftshinweise aus AP-14e4/e5).

## Pflichtpruefung nach CHART_ENGINE_REGRESSIONSREGELN.md

- Keine allgemeine ChartEngine-Datenlogik geändert. ✓
- Keine Datums-/Zeitachsenlogik geändert. ✓
- Keine String-Annahmen auf Datumswerten eingeführt. ✓
- CSVParser.js unverändert. ✓
- FwDateUtils.js unverändert. ✓
- FinanzwesirData.js unverändert. ✓

## Pruefungen (statisch)

| Nr | Pruefung | Ergebnis |
|---|---|---|
| 1 | plugins/index.js existiert | ✓ |
| 2 | exportiert CenterTextPlugin | ✓ |
| 3 | exportiert CrosshairPlugin | ✓ |
| 4 | exportiert FwAnnotationPulsePlugin | ✓ |
| 5 | exportiert FwVerticalLinePlugin | ✓ |
| 6 | exportiert kein FwBarLayoutPlugin | ✓ |
| 7 | ChartEngine.js importiert aus ../plugins/index.js | ✓ |
| 8 | LineChartStrategy.js importiert aus ../plugins/index.js | ✓ |
| 9 | PieChartStrategy.js importiert aus ../plugins/index.js | ✓ |
| 10 | Keine produktiven Importe aus core/FwChartPlugins.js | ✓ |
| 11 | Keine FwBarLayoutPlugin-Referenzen produktiv | ✓ |
| 12 | Keine fwBarLayout-Referenzen produktiv | ✓ |
| 13 | Keine _fwGeometry-Referenzen produktiv | ✓ |
| 14 | BarChartStrategy.js nicht geändert | ✓ |
| 15 | Plugin-Implementierungsdateien nicht geändert | ✓ |
| 16 | Keine CSS-Dateien geändert | ✓ |
| 17 | Keine JSON-Dateien geändert | ✓ |
| 18 | Keine CSV-Dateien geändert | ✓ |
| 19 | Keine Protected Files geändert | ✓ |
| 20 | Keine Datums-/Zeitachsenlogik geändert | ✓ |

## Manuell offene Pruefungen

Albert testet im lokalen VSCode-Live-Server:

1. Prokrastinationspreis Screen 2 → Pulse-Animation bei neuer Annotation erscheint
2. Prokrastinationspreis Screen 3 → Crosshair und VerticalLine funktionieren
3. Doughnut-Chart → Zentrumstext korrekt
4. BarChart History-View → unverändert
5. BarChart Ranking-View → unverändert
6. Browser-Konsole → keine Importfehler / undefined-Fehler

## Offene Punkte

Keine.

## Blocker

Keine.

## Empfohlener naechster AP

AP-14e10 — Plugin-Spec und Steuerdateien synchronisieren

## Bestaetigungen

- Nur Plugin-Barrel angelegt ✓
- Nur Plugin-Imports vereinheitlicht ✓
- Keine Plugin-Implementierung geändert ✓
- Kein FwBarLayoutPlugin wieder eingeführt ✓
- Kein plugins/FwBarLayoutPlugin.js angelegt ✓
- Keine Plugin-Registry gebaut ✓
- Keine Runtime-Registry gebaut ✓
- Kein Chart.register() eingeführt ✓
- Keine Auto-Registration eingeführt ✓
- BarChartStrategy.js nicht geändert ✓
- Keine neue BarChart-Layoutlogik gebaut ✓
- Keine neue _fwGeometry-Verdrahtung gebaut ✓
- FwSmartXAxis.js nicht geändert ✓
- FwSmartScales.js nicht geändert ✓
- FwDateUtils.js nicht geändert ✓
- Tooltips nicht geändert ✓
- Achsenlogik nicht geändert ✓
- BOP-Anker nicht geändert ✓
- _originalDate nicht geändert ✓
- Semantisches X-Mapping nicht geändert ✓
- Keine Spec-Änderung vorgenommen ✓
- Keine Steuerdateien geändert außer Ergebnisprotokoll ✓
- CSVParser.js nicht geändert ✓
- FinanzwesirData.js nicht geändert ✓
- Keine CSS-Änderung vorgenommen ✓
- Keine JSON-Änderung vorgenommen ✓
- Keine CSV-Änderung vorgenommen ✓
- Keine Protected Files geändert ✓
- Keine AP-15-Arbeit begonnen ✓
- Keine Commits ausgeführt ✓
