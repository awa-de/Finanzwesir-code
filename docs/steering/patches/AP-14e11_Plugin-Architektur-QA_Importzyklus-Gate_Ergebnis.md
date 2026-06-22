# AP-14e11 — Plugin-Architektur-QA mit Importzyklus-Gate — Ergebnis

Stand: 2026-06-22 | Session: B1-AP-14e11 | Geändert von: Claude

---

## Kurzurteil

- Importzyklus-Gate: GRÜN — kein Plugin-Datei importiert irgendetwas (weder core, strategies noch Barrel).
- Barrel sauber: 4 Named Re-Exports, keine Logik, kein Chart.register(), kein FwBarLayoutPlugin.
- Alle Engine/Strategy-Plugin-Imports laufen über `'../plugins/index.js'` — kein Direktimport aus Einzeldateien.
- Keine Altpfade: FwChartPlugins.js, FwBarLayoutPlugin, fwBarLayout, _fwGeometry — alle aus produktivem Code entfernt.
- Verbotene Mechanismen: 0 Treffer (kein Chart.register, keine Plugin-Registry, keine Runtime-Registry).
- Alle 14 Spec-vs-Repo-Prüfpunkte grün. Alle 11 AP-Protokolle vorhanden.
- **FREIGABE: Plugin-Refactoring-Kette AP-14e1 bis AP-14e11 abgeschlossen.** Commit kann vorbereitet werden.

---

## Ausgangslage nach AP-14e10b

AP-14e10b hat `CHART_PLUGIN_ARCHITEKTUR.md` §3 und §20.3 nachgeschärft:
- §3: Alte Inline-Plugin-Ausnahme ersetzt durch klare Ablageregel (nur `plugins/`).
- §20.3: Barrel ist verbindlicher Standard; Direktimporte nur als begründeter Sonderfall mit Protokollpflicht.
- §20.7 Heading: Stand AP-14e9 → AP-14e10b.

Dieser AP (AP-14e11) verifiziert, dass Spec und Repo-Stand übereinstimmen.

---

## Gelesene Dateien

- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`
- `Theme/assets/js/fw-chart-engine/plugins/index.js`
- `Theme/assets/js/fw-chart-engine/plugins/CenterTextPlugin.js`
- `Theme/assets/js/fw-chart-engine/plugins/CrosshairPlugin.js`
- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js`
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js`
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/strategies/BarChartStrategy.js`
- `docs/steering/patches/AP-14e10b_CHART_PLUGIN_ARCHITEKTUR-Nachschaerfung_Ergebnis.md`

---

## Suchbefehle / Suchmuster

| Muster | Scope | Treffer | Bewertung |
|---|---|---|---|
| `^import` | plugins/ | 0 | ✅ keine Imports in Plugin-Dateien |
| `FwChartPlugins` | fw-chart-engine/core (files) | 0 | ✅ Datei entfernt |
| `FwChartPlugins` | fw-chart-engine/ (content) | 2 | ✅ nur historische Kommentare |
| `FwBarLayoutPlugin` | Theme/assets/js | 1 | ✅ nur Kommentar in index.js |
| `FwBarLayoutPlugin` | Apps/ | 0 | ✅ |
| `fwBarLayout` | Theme/assets/js | 0 | ✅ |
| `_fwGeometry` | Theme/assets/js | 0 | ✅ |
| `_fwGeometry` | Apps/ | 0 | ✅ |
| `halfBarPixel` | Theme/assets/js | 2 | ✅ nur in FwSmartXAxis.afterFit() — aktive Achsenberechnung |
| `Chart\.register` | fw-chart-engine/ | 0 | ✅ |
| `PluginRegistry\|RuntimeRegistry\|...` | fw-chart-engine/ | 0 | ✅ |
| `from '../plugins/` | fw-chart-engine/ | 3 | ✅ alle über Barrel index.js |

---

## Phase 1 — Plugin-Bestand

**Ist-Bestand (verifiziert durch Dateilesen):**

```text
plugins/CenterTextPlugin.js         ✅
plugins/CrosshairPlugin.js          ✅
plugins/FwAnnotationPulsePlugin.js  ✅
plugins/FwVerticalLinePlugin.js     ✅
plugins/index.js                    ✅
```

**Nicht vorhanden (bestätigt):**

```text
plugins/FwBarLayoutPlugin.js        ✅ nicht vorhanden (erwartet)
core/FwChartPlugins.js              ✅ nicht vorhanden (erwartet) — grep auf core/ gibt 0 File-Matches
```

Soll-Bestand: vollständig erfüllt.

---

## Phase 2 — Barrel-Prüfung

`plugins/index.js` vollständig gelesen:

```js
export { CenterTextPlugin } from './CenterTextPlugin.js';
export { CrosshairPlugin } from './CrosshairPlugin.js';
export { FwAnnotationPulsePlugin } from './FwAnnotationPulsePlugin.js';
export { FwVerticalLinePlugin } from './FwVerticalLinePlugin.js';
```

| Eigenschaft | Ergebnis |
|---|---|
| Named Re-Exports: 4 Plugins | ✅ |
| Kein default export | ✅ |
| Keine Logik | ✅ |
| Keine Registry | ✅ |
| Kein Chart.register() | ✅ |
| Kein FwBarLayoutPlugin export | ✅ (Kommentar in JSDoc bestätigt Entfernung) |
| Kein Import aus core/ oder strategies/ | ✅ |

Barrel ist sauber.

---

## Phase 3 — Importzyklus-Gate

**Kritischstes Gate.**

Grep `^import` über alle Dateien in `plugins/`:

```
Keine Treffer.
```

Befund per File-Lesen bestätigt:

| Plugin-Datei | Import-Statements | Bewertung |
|---|---|---|
| CenterTextPlugin.js | keine | ✅ |
| CrosshairPlugin.js | keine | ✅ |
| FwAnnotationPulsePlugin.js | keine | ✅ |
| FwVerticalLinePlugin.js | keine | ✅ |
| index.js | nur Re-Exports (keine Logik-Imports) | ✅ |

**IMPORTZYKLUS-GATE: GRÜN.**

```text
Kein Plugin-Datei importiert aus core/.
Kein Plugin-Datei importiert aus strategies/.
Kein Plugin-Datei importiert aus plugins/index.js.
Kein Zyklus: ChartEngine/Strategies → plugins/index.js → Plugin-Dateien — Ende.
```

---

## Phase 4 — Engine/Strategy-Importpfade

Grep `from '../plugins/'` über core/ und strategies/:

| Datei | Import-Statement | Pfad | Bewertung |
|---|---|---|---|
| ChartEngine.js | `FwAnnotationPulsePlugin, FwVerticalLinePlugin` | `'../plugins/index.js'` | ✅ Barrel |
| LineChartStrategy.js | `CrosshairPlugin` | `'../plugins/index.js'` | ✅ Barrel |
| PieChartStrategy.js | `CenterTextPlugin` | `'../plugins/index.js'` | ✅ Barrel |
| BarChartStrategy.js | kein Plugin-Import | — | ✅ kein FwBarLayoutPlugin |

Alle 3 Imports laufen über `'../plugins/index.js'` — kein Direktimport aus Einzeldateien.

**Plugin-Aktivierung in getChartConfig() / _draw():**

- `LineChartStrategy.getChartConfig()`: `plugins: [CrosshairPlugin]` — lokale Chart-Konfiguration, opt-in ✅
- `PieChartStrategy.getChartConfig()`: `plugins: [CenterTextPlugin]` — lokale Chart-Konfiguration, opt-in ✅
- `ChartEngine._draw()`: `chartConfig.plugins.push(FwVerticalLinePlugin)` (nur wenn `features.verticalLine === 'last'`) — opt-in ✅
- `ChartEngine._draw()`: `chartConfig.plugins.push(FwAnnotationPulsePlugin)` (nur wenn `annotationPulse.enabled`) — opt-in ✅

Kein Plugin aktiviert sich global oder automatisch. Alle opt-in per Optionsfeld (§4 konform).

---

## Phase 5 — Altpfade und Dead-State

| Suchmuster | Treffer | Ort | Bewertung |
|---|---|---|---|
| `FwChartPlugins` (content) | 2 | CenterTextPlugin.js Z.6, CrosshairPlugin.js Z.1 | ✅ nur historische JSDoc-Kommentare — kein produktiver Import |
| `FwBarLayoutPlugin` | 1 | plugins/index.js Z.8 (JSDoc) | ✅ nur Entfernungshinweis — kein produktiver Code |
| `fwBarLayout` | 0 | — | ✅ |
| `_fwGeometry` | 0 | — | ✅ |
| `halfBarPixel` | 2 | FwSmartXAxis.js Z.286/288 | ✅ aktive eigenständige Achsenberechnung in afterFit() — kein Plugin-Bezug |

Keine Altpfade produktiv vorhanden.

---

## Phase 6 — Verbotene Mechanismen

| Suchmuster | Treffer | Bewertung |
|---|---|---|
| `Chart\.register` | 0 | ✅ |
| `PluginRegistry\|pluginRegistry` | 0 | ✅ |
| `RuntimeRegistry\|runtimeRegistry` | 0 | ✅ |
| `AutoRegistration\|autoregister` | 0 | ✅ |

`plugins: [...]` kommt in LineChartStrategy und PieChartStrategy als lokale Chart-Konfiguration vor — erlaubtes opt-in-Muster per §20.5, keine zentrale Registry. ✅

---

## Phase 7 — Spec-vs-Repo-Konsistenz

| # | Prüfpunkt | Ergebnis |
|---|---|---|
| 1 | Spec nennt genau 4 aktive Plugins | ✅ §20.1 |
| 2 | Diese 4 Plugin-Dateien existieren | ✅ |
| 3 | Spec nennt plugins/index.js als kanonischen Barrel | ✅ §20.2 |
| 4 | plugins/index.js existiert und ist reiner Re-Export-Barrel | ✅ |
| 5 | Spec verbietet Inline-/Core-Plugins (§3 ab AP-14e10b) | ✅ |
| 6 | Repo enthält keine produktiven Inline-/Core-Plugin-Implementierungen | ✅ |
| 7 | Spec verbietet Plugin-Registry/Runtime-Registry/Chart.register (§20.5) | ✅ |
| 8 | Repo enthält keine solche Registry | ✅ |
| 9 | Spec dokumentiert FwBarLayoutPlugin als entfernt (§20.6) | ✅ |
| 10 | Repo enthält FwBarLayoutPlugin nicht produktiv | ✅ |
| 11 | Spec dokumentiert _fwGeometry als nicht aktiven Kanal (§20.6) | ✅ |
| 12 | Repo enthält _fwGeometry nicht produktiv | ✅ |
| 13 | Spec enthält BarChart-Hybrid-Warnung (§20.7) | ✅ |
| 14 | BarChartStrategy seit AP-14e8 ohne Plugin-Code | ✅ kein Plugin-Import, kein FwBarLayoutPlugin |

**Alle 14 Prüfpunkte grün.**

---

## Phase 8 — AP-Kette und Protokolle

Vorhandene Ergebnisprotokolle:

```text
AP-14e1_Plugin-Ist-Befund-finalisieren_Ergebnis.md        ✅
AP-14e2_fwVerticalLine-Plugin-Auslagerung_Ergebnis.md      ✅
AP-14e3_Engine-Datenpfad-Regressionsregel_Ergebnis.md     ✅
AP-14e4_CenterTextPlugin-Auslagerung_Ergebnis.md           ✅
AP-14e5_CrosshairPlugin-Auslagerung_Ergebnis.md            ✅
AP-14e6_FwChartPlugins-Shim-entfernen_Ergebnis.md          ✅
AP-14e7_FwBarLayoutPlugin-Hybrid-Pruefung_Ergebnis.md      ✅
AP-14e8_FwBarLayoutPlugin-Dead-State-entfernen_Ergebnis.md ✅
AP-14e9_Plugin-Barrel_Ergebnis.md                          ✅
AP-14e10_Plugin-Spec-und-Steuerdateien-Sync_Ergebnis.md   ✅
AP-14e10b_CHART_PLUGIN_ARCHITEKTUR-Nachschaerfung_Ergebnis.md ✅
```

**Alle 11 Protokolle vorhanden.**

Hinweis: AP-14e10b ist ein Mini-Nachtrag zu AP-14e10. NAVIGATION.md und PROJECT-STATUS.md wurden für AP-14e10b bewusst nicht aktualisiert (Mini-Nachtrag ohne eigene Routing-Relevanz). Nächstes vollständiges AP (AP-14e11) aktualisiert diese Dateien.

AP-14e11 (dieses Protokoll) — fehlt noch (wird jetzt angelegt).

---

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

- Keine JS-Code-Datei geändert ✅
- Keine allgemeine ChartEngine-Datenlogik geändert ✅
- Keine Datums-/Zeitachsenlogik geändert ✅
- Keine String-Annahmen auf Datumswerten eingeführt ✅
- CSVParser.js unverändert ✅
- FwDateUtils.js unverändert ✅
- FinanzwesirData.js unverändert ✅

---

## Letzter manueller Teststand

AP-14e9 Import-Smoke-Test (laut AP-14e9-Ergebnisprotokoll, bestätigt durch Albert):

```text
- Browser-Konsole ohne Importfehler
- Prokrastinationspreis Screen 2 Pulse OK
- Prokrastinationspreis Screen 3 Crosshair + VerticalLine OK
- Doughnut/Pie Zentrumstext OK
- BarChart History OK
- BarChart Ranking OK
- Standardcharts ohne Konsolenfehler
```

AP-14e10 und AP-14e10b haben keinen Code geändert — Teststand von AP-14e9 gilt weiterhin.

---

## Blocker

Keine.

---

## Freigabeentscheidung

**FREIGEGEBEN.**

```text
Plugin-Refactoring-Kette B1-AP-14e1 bis B1-AP-14e11 ist abgeschlossen.
Plugin-Struktur ist konsistent.
Kein Importzyklus.
Keine Altpfade.
Keine toten Plugin-Elemente.
Keine Codeänderung nötig.
Commit kann vorbereitet werden.
```

---

## Commit-Empfehlung (ohne Commit-Message)

Die folgenden APs der Plugin-Refactoring-Kette können in einem oder mehreren Commits zusammengefasst werden. Empfehlung: AP-14e6 bis AP-14e10b als eine Gruppe, AP-14e2 bis AP-14e5 als zweite Gruppe, oder einzeln je nach git-Hygiene-Präferenz.

Die Commit-Messages werden erst beim Abschluss-Ritual per `/abschluss-ritual` erzeugt — nicht hier.

---

## Offene Punkte

- AP-14e10b: NAVIGATION.md und PROJECT-STATUS.md enthalten keinen AP-14e10b-Eintrag. Bewusst so entschieden (Mini-Nachtrag). Das nächste vollständige AP synchronisiert diese Dateien. Kein Blocker.
- X-Achsen-Spec-Drift (_fwGeometry in X-Achsen-Docs I und III): dokumentiert in §20.6. Bekannt und bewusst offen. Reaktivierung nur über Design-AP. Kein Blocker für diese Kette.

---

## Empfohlener nächster Schritt

Abschluss-Ritual für die Plugin-Refactoring-Kette ausführen, danach Commit vorbereiten.

---

## Bestätigungen

- Keine Codeänderung vorgenommen ✅
- Keine JS-Dateien geändert ✅
- Keine Plugin-Implementierung geändert ✅
- Keine Spec-Dateien geändert ✅
- Keine Steuerdateien geändert ✅
- Kein FwBarLayoutPlugin wieder eingeführt ✅
- Kein plugins/FwBarLayoutPlugin.js angelegt ✅
- Kein core/FwChartPlugins.js wieder eingeführt ✅
- Keine Plugin-Registry gebaut ✅
- Keine Runtime-Registry gebaut ✅
- Kein Chart.register() eingeführt ✅
- Keine Auto-Registration eingeführt ✅
- Keine neue _fwGeometry-Verdrahtung gebaut ✅
- BarChartStrategy.js nicht geändert ✅
- FwSmartXAxis.js nicht geändert ✅
- FwSmartScales.js nicht geändert ✅
- FwDateUtils.js nicht geändert ✅
- Tooltips nicht geändert ✅
- Achsenlogik nicht geändert ✅
- BOP-Anker nicht geändert ✅
- _originalDate nicht geändert ✅
- Semantisches X-Mapping nicht geändert ✅
- CSVParser.js nicht geändert ✅
- FinanzwesirData.js nicht geändert ✅
- Keine CSS-Änderung vorgenommen ✅
- Keine JSON-Änderung vorgenommen ✅
- Keine CSV-Änderung vorgenommen ✅
- Keine Protected Files geändert ✅
- Keine AP-15-Arbeit begonnen ✅
- Keine Commits ausgeführt ✅
