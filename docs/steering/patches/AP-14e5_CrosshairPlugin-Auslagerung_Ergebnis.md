Stand: 2026-06-19 | Session: AP-14e5 | Geändert von: Claude

# AP-14e5 — CrosshairPlugin aus core nach plugins auslagern — Ergebnis

## Kurzurteil

Abgeschlossen ohne Blocker. CrosshairPlugin vollständig aus core/FwChartPlugins.js herausgelöst und als eigenständige Plugin-Datei unter plugins/ geführt. core/FwChartPlugins.js ist nun reiner Re-Export-Shim ohne Plugin-Implementierungen.

## Vorprüfung

1. CrosshairPlugin in core/FwChartPlugins.js vorhanden → JA ✓
2. CenterTextPlugin in core/FwChartPlugins.js nur Re-Export-Shim → JA ✓
3. LineChartStrategy.js importiert CrosshairPlugin aus ../core/FwChartPlugins.js → JA ✓
4. plugins/CrosshairPlugin.js bereits vorhanden → NEIN → kein Stop ✓
5. Weitere Importe von CrosshairPlugin im Repo → NEIN (nur LineChartStrategy.js) → kein Stop ✓
6. plugins/index.js vorhanden → NEIN ✓

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwChartPlugins.js` — Implementierung entfernt, reiner Shim
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — Import-Pfad aktualisiert

## Neu angelegte Dateien

- `Theme/assets/js/fw-chart-engine/plugins/CrosshairPlugin.js` — CrosshairPlugin-Implementierung

## Nicht geänderte Dateien

ChartEngine.js, CenterTextPlugin.js, FwAnnotationPulsePlugin.js, FwVerticalLinePlugin.js,
PieChartStrategy.js, BarChartStrategy.js, plugins/index.js (nicht angelegt),
NAVIGATION.md, PROJECT-STATUS.md, BACKLOG.md, alle CSS/JSON/CSV/Protected Files.

## Entfernte Implementierung aus core/FwChartPlugins.js

Die vollständige CrosshairPlugin-Implementierung (id: 'crosshair', afterDatasetsDraw) wurde
aus core/FwChartPlugins.js entfernt und durch einen Re-Export-Shim ersetzt.

## Neue Plugin-Datei

`plugins/CrosshairPlugin.js` enthält exakt die bisherige Implementierung:
- id: 'crosshair'
- afterDatasetsDraw: Haarlinie-Zeichnung bei aktivem Tooltip
- Keine Umbenennung, keine Verhaltensänderung, keine Optionsänderung

## Importänderung in LineChartStrategy.js

Vorher: `import { CrosshairPlugin } from '../core/FwChartPlugins.js';`
Nachher: `import { CrosshairPlugin } from '../plugins/CrosshairPlugin.js'; // CHANGED AP-14e5`

## Temporärer Re-Export-Shim in core/FwChartPlugins.js

```js
// DEPRECATED / TEMPORARY SHIM — AP-14e5
export { CenterTextPlugin } from '../plugins/CenterTextPlugin.js';
export { CrosshairPlugin } from '../plugins/CrosshairPlugin.js';
```

## Bestätigung: CenterTextPlugin unverändert

CenterTextPlugin.js wurde nicht berührt. Re-Export in FwChartPlugins.js bleibt unverändert.

## Bestätigung: LineChart-/Crosshair-Verhalten unverändert

Implementierung 1:1 übernommen — keine Logikänderung, keine Optionsänderung, keine Verhaltensänderung.

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

1. Keine allgemeine ChartEngine-Datenlogik geändert ✓
2. Keine Datums-/Zeitachsenlogik geändert ✓
3. Keine String-Annahmen auf Datumswerten eingeführt ✓
4. CSVParser.js, FwDateUtils.js, FinanzwesirData.js unverändert ✓

## Prüfungen (statisch)

1. plugins/CrosshairPlugin.js existiert ✓
2. CrosshairPlugin-Implementierung liegt in plugins/CrosshairPlugin.js ✓
3. core/FwChartPlugins.js enthält keine CrosshairPlugin-Implementierung mehr ✓
4. core/FwChartPlugins.js enthält keine CenterTextPlugin-Implementierung ✓
5. core/FwChartPlugins.js enthält nur Re-Exports für CenterTextPlugin und CrosshairPlugin ✓
6. LineChartStrategy.js importiert CrosshairPlugin aus ../plugins/CrosshairPlugin.js ✓
7. LineChartStrategy.js enthält weiterhin plugins: [CrosshairPlugin] ✓
8. PieChartStrategy.js nicht geändert ✓
9. BarChartStrategy.js nicht geändert ✓
10. ChartEngine.js nicht geändert ✓
11. CenterTextPlugin.js nicht geändert ✓
12. FwAnnotationPulsePlugin.js nicht geändert ✓
13. FwVerticalLinePlugin.js nicht geändert ✓
14. plugins/index.js nicht angelegt und nicht geändert ✓
15. Keine CSS-Dateien geändert ✓
16. Keine JSON-Dateien geändert ✓
17. Keine CSV-Dateien geändert ✓
18. Keine Protected Files geändert ✓
19. Keine Datums-/Zeitachsenlogik geändert ✓
20. Keine allgemeine Engine-Datenlogik geändert ✓

## Manuell offene Prüfungen

Offen (manueller Test durch Albert erforderlich):
1. Standard-LineChart rendert weiterhin
2. Crosshair-Haarlinie funktioniert weiterhin bei Hover
3. Tooltip/Legend unverändert
4. Prokrastinationspreis Screen 3: Crosshair funktioniert weiterhin
5. Prokrastinationspreis Screen 3: VerticalLine sichtbar
6. Prokrastinationspreis Screen 2: Pulse funktioniert unverändert
7. Pie/Doughnut-Zentrumstext unverändert
8. BarChart unverändert

## Offene Punkte

Keine.

## Blocker

Keine.

## Empfohlener nächster AP

AP-14e6 — FwChartPlugins-Shim prüfen und entfernen

## Bestätigungen

- core/FwChartPlugins.js nicht gelöscht ✓
- Keine CenterTextPlugin-Änderung vorgenommen ✓
- Kein FwBarLayoutPlugin geändert ✓
- Kein FwAnnotationPulsePlugin geändert ✓
- Kein FwVerticalLinePlugin geändert ✓
- Kein plugins/index.js angelegt oder geändert ✓
- Keine Plugin-Registry gebaut ✓
- Keine Spec-Änderung vorgenommen ✓
- Keine Steuerdateien geändert außer Ergebnisprotokoll ✓
- Keine allgemeine Engine-Codeänderung vorgenommen ✓
- ChartEngine.js nicht geändert ✓
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
