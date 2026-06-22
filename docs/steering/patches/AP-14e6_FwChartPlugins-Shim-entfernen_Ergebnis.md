Stand: 2026-06-22 | Session: AP-14e6 | Geändert von: Claude

# AP-14e6 — FwChartPlugins-Shim prüfen und entfernen — Ergebnis

## Kurzurteil

Shim gelöscht. Keine produktiven Code-Importe aus `core/FwChartPlugins.js` gefunden.
Alle Plugin-Implementierungen liegen vollständig in `plugins/`.

## Vorprüfung

| Prüfpunkt | Befund |
|---|---|
| `core/FwChartPlugins.js` existiert | ✓ ja |
| Enthält nur Re-Exports (keine Implementierung) | ✓ ja (7 Zeilen) |
| Produktive Code-Importe aus `core/FwChartPlugins.js` | ✗ keine gefunden |
| Importe aus `../core/FwChartPlugins.js` | ✗ keine |
| Importe aus `./core/FwChartPlugins.js` | ✗ keine |
| Importe aus `core/FwChartPlugins.js` (anderer Pfad) | ✗ keine |
| Sonstige Referenzen in produktivem Code | ✗ keine |
| Referenzen in Doku/Steuerdateien | ✓ ja (historisch, kein Blocker) |

## Suchbefehle / Suchmuster

```
Grep: FwChartPlugins → Theme/, Apps/, docs/
Grep: core/FwChartPlugins → Theme/assets/js/, Apps/
Grep: ../core/FwChartPlugins → Theme/assets/js/, Apps/
Grep: ./core/FwChartPlugins → Theme/assets/js/, Apps/
```

## Gefundene Referenzen

### Produktiver Code (Theme/assets/js/, Apps/)

| Datei | Zeile | Art | Inhalt |
|---|---|---|---|
| `plugins/CenterTextPlugin.js` | 6 | Kommentar | `Ausgelagert aus core/FwChartPlugins.js (AP-14e4).` |
| `plugins/CrosshairPlugin.js` | 1 | Kommentar | `CrosshairPlugin aus core/FwChartPlugins.js ausgelagert` |

Beide Treffer sind Kommentarzeilen — keine Import-Statements.

## Produktive Code-Importe

**Keine gefunden.**

## Doku-/Steuerreferenzen

Historische Nennungen in folgenden Dateien (kein Blocker für Löschung):
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`
- `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md`
- `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md`
- `docs/steering/engine/REGRESSION-MATRIX.md`
- `docs/steering/patches/AP-14e1` bis `AP-14e5` (Vorgänger-Protokolle)
- `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md`
- `docs/steering/audits/`

Diese Referenzen sind historische Protokolle und Architekturdokumente.
Sie werden in diesem AP nicht bereinigt (AP-14e10 vorgesehen).

## Entscheidung

**Gelöscht.**

Bedingungen erfüllt:
- Keine produktiven Code-Importe aus `core/FwChartPlugins.js`
- Datei enthielt ausschließlich Re-Exports

## Gelöschte Dateien

```
Theme/assets/js/fw-chart-engine/core/FwChartPlugins.js
```

Inhalt vor Löschung (7 Zeilen):
```js
// CHANGED AP-14e5: CrosshairPlugin ausgelagert — Re-Export-Shim für Altimporte
// DEPRECATED / TEMPORARY SHIM — AP-14e5
// Plugin-Implementierungen liegen unter Theme/assets/js/fw-chart-engine/plugins/
// Diese Datei bleibt nur bis AP-14e6 als Re-Export-Shim bestehen.

export { CenterTextPlugin } from '../plugins/CenterTextPlugin.js';
export { CrosshairPlugin } from '../plugins/CrosshairPlugin.js';
```

## Nicht geänderte Dateien

Alle in der AP-Spec aufgelisteten Nicht-Änder-Dateien wurden nicht berührt.

## Bestätigung: Plugin-Dateien unverändert

| Datei | Status |
|---|---|
| `plugins/CenterTextPlugin.js` | ✓ nicht geändert |
| `plugins/CrosshairPlugin.js` | ✓ nicht geändert |
| `plugins/FwAnnotationPulsePlugin.js` | ✓ nicht geändert |
| `plugins/FwVerticalLinePlugin.js` | ✓ nicht geändert |
| `plugins/index.js` | ✓ nicht angelegt, nicht geändert |

## Bestätigung: Strategie-Dateien unverändert

| Datei | Status |
|---|---|
| `strategies/LineChartStrategy.js` | ✓ nicht geändert |
| `strategies/PieChartStrategy.js` | ✓ nicht geändert |
| `strategies/BarChartStrategy.js` | ✓ nicht geändert |

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

1. Keine allgemeine ChartEngine-Datenlogik geändert. ✓
2. Keine Datums-/Zeitachsenlogik geändert. ✓
3. Keine String-Annahmen auf Datumswerten eingeführt. ✓
4. `CSVParser.js`, `FwDateUtils.js`, `FinanzwesirData.js` unverändert. ✓

## Prüfungen (statisch)

| Nr | Prüfpunkt | Status |
|---|---|---|
| 1 | Alle produktiven Importe aus core/FwChartPlugins.js wurden gesucht | ✓ |
| 2 | Keine produktiven Importe gefunden → core/FwChartPlugins.js gelöscht | ✓ |
| 3 | CenterTextPlugin.js nicht geändert | ✓ |
| 4 | CrosshairPlugin.js nicht geändert | ✓ |
| 5 | LineChartStrategy.js nicht geändert | ✓ |
| 6 | PieChartStrategy.js nicht geändert | ✓ |
| 7 | BarChartStrategy.js nicht geändert | ✓ |
| 8 | ChartEngine.js nicht geändert | ✓ |
| 9 | FwAnnotationPulsePlugin.js nicht geändert | ✓ |
| 10 | FwVerticalLinePlugin.js nicht geändert | ✓ |
| 11 | plugins/index.js nicht angelegt und nicht geändert | ✓ |
| 12 | Keine CSS-Dateien geändert | ✓ |
| 13 | Keine JSON-Dateien geändert | ✓ |
| 14 | Keine CSV-Dateien geändert | ✓ |
| 15 | Keine Protected Files geändert | ✓ |
| 16 | Keine Datums-/Zeitachsenlogik geändert | ✓ |
| 17 | Keine allgemeine Engine-Datenlogik geändert | ✓ |

## Manuell offene Prüfungen

| Prüfpunkt | Status |
|---|---|
| Standard-LineChart rendert weiterhin | offen — Albert testet |
| Crosshair-Haarlinie funktioniert weiterhin | offen — Albert testet |
| Pie/Doughnut-Zentrumstext unverändert | offen — Albert testet |
| Prokrastinationspreis Screen 3: Crosshair + VerticalLine | offen — Albert testet |
| Prokrastinationspreis Screen 2: Pulse unverändert | offen — Albert testet |
| BarChart unverändert | offen — Albert testet |

## Offene Punkte

- Historische Doku-Referenzen auf `FwChartPlugins.js` (in Spec, REGRESSION-MATRIX, Archiv) werden in AP-14e10 bereinigt.

## Blocker

Keine.

## Empfohlener nächster AP

**AP-14e7** — FwBarLayoutPlugin vollständig prüfen

## Bestätigungen

- Keine Plugin-Implementierung geändert ✓
- Keine CenterTextPlugin-Änderung vorgenommen ✓
- Keine CrosshairPlugin-Änderung vorgenommen ✓
- Kein FwBarLayoutPlugin geändert ✓
- Kein FwAnnotationPulsePlugin geändert ✓
- Kein FwVerticalLinePlugin geändert ✓
- Kein plugins/index.js angelegt oder geändert ✓
- Keine Plugin-Registry gebaut ✓
- Keine Spec-Änderung vorgenommen ✓
- Keine Steuerdateien geändert außer Ergebnisprotokoll ✓
- Keine Altimporte breitflächig repariert ✓
- Keine allgemeine Engine-Codeänderung vorgenommen ✓
- ChartEngine.js nicht geändert ✓
- LineChartStrategy.js nicht geändert ✓
- PieChartStrategy.js nicht geändert ✓
- BarChartStrategy.js nicht geändert ✓
- Keine Datums-/Zeitachsenlogik geändert ✓
- CSVParser.js nicht geändert ✓
- FwDateUtils.js nicht geändert ✓
- FinanzwesirData.js nicht geändert ✓
- Keine CSS-Änderung vorgenommen ✓
- Keine JSON-Änderung vorgenommen ✓
- Keine CSV-Änderung vorgenommen ✓
- Keine Protected Files geändert ✓
- Keine AP-15-Arbeit begonnen ✓
- Keine Commits ausgeführt ✓
