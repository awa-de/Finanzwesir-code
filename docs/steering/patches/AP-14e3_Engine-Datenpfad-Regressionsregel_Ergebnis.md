Stand: 2026-06-19 | Session: B1-AP-14e3 | Geändert von: Claude

# AP-14e3 — Engine-Datenpfad-Regressionsregel verankern — Ergebnis

## Kurzurteil

Regel dauerhaft verankert. Neue Spec-Datei angelegt, NAVIGATION.md-Routing ergänzt. 3 Dateien — exakt im erlaubten Scope. Keine Code-Änderung vorgenommen.

## Anlass

In B1-AP-14e2 (fwVerticalLine-Auslagerung) wurde eine Regression in `LineChartStrategy._toMonthKey()` erkannt: String-Methoden auf Datumswerten, die bei CSV-Datenpfad (native `Date`-Objekte) fehlschlagen. Fix war in AP-14e2 enthalten. Dieser AP verankert die daraus gelernte Regressionsregel dauerhaft, damit künftige Engine-APs denselben Fehler nicht wiederholen.

## Geprüfte Dateien

| Datei | Befund |
|---|---|
| `docs/steering/engine/REGRESSION-MATRIX.md` | Geeignet nur für Testfälle; schließt Specs explizit aus (`„Gehört nicht hier hinein: Specs"`) |
| `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §13.3 | Plugin-spezifisch; 4-Bullet-Checkliste nur für Plugin-Regressionen — nicht allgemein genug |
| `docs/spec/APP-INTERFACE.md` | Erwähnt `renderFromData()` kurz (Z.161), aber kein Ort für Regressionsregeln |
| `NAVIGATION.md` | Engine-Routing-Block bei Z.94–98 — ergänzt |

## Verwendete Suchbegriffe / Suchbefehle

```text
Grep: renderFromData, _processContainer, expectDate, Datenpfad, REGRESSIONSREGEL, Regression, ChartEngine
Grep: in docs/spec/ und docs/steering/
PowerShell: Get-ChildItem docs/spec/, docs/steering/ (Dateiliste)
```

## Gewählter Dokumentationsort

**Neue Datei:** `docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md`

Begründung: Keine vorhandene allgemeine ChartEngine-/Daten-/Regression-Spec gefunden. `REGRESSION-MATRIX.md` schließt Specs explizit aus. `CHART_PLUGIN_ARCHITEKTUR.md` ist Plugin-spezifisch. Die neue Datei liegt in `docs/spec/` und ist damit für Claude per NAVIGATION.md-Routing auffindbar.

## Geänderte Dateien

| Datei | Art | Was |
|---|---|---|
| `NAVIGATION.md` | EDIT | 1 Zeile ergänzt im Engine-Routing-Block (Z.95): Verweis auf neue Spec-Datei |

## Neu angelegte Dateien

| Datei | Inhalt |
|---|---|
| `docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md` | Vollständige Datenpfad-Regressionsregel inkl. Anlass, beide Datenpfade, verbotene Muster, Pflichtprüfungs-Checkliste, Protected-Files-Bestätigung, Geltungsbereich |
| `docs/steering/patches/AP-14e3_Engine-Datenpfad-Regressionsregel_Ergebnis.md` | Dieses Ergebnisprotokoll |

## Nicht geänderte Dateien

```text
CHART_PLUGIN_ARCHITEKTUR.md — unverändert (Plugin-spezifisch, kein Overlap)
REGRESSION-MATRIX.md — unverändert (Testfälle, keine Specs)
ChartEngine.js — nicht berührt
CSVParser.js — nicht berührt
FwDateUtils.js — nicht berührt
FinanzwesirData.js — nicht berührt
Alle anderen Dateien — nicht berührt
```

## Verankerte Regel

Jede Änderung an allgemeiner Chart-Engine-Logik, charttypübergreifender Datenlogik oder Datums-/Zeitachsenlogik muss beide Engine-Datenpfade prüfen:

- **Datenpfad A:** `ChartEngine.renderFromData()` — Daten als JS-Objekte, Datumsfelder können Strings sein
- **Datenpfad B:** `ChartEngine._processContainer()` → `CSVParser.parse(..., { expectDate: true })` — Datumsfelder sind native `Date`-Objekte

Engine-Code darf nie blind String-Methoden (`.slice()`, `.split()`, `.substring()`) auf Datumswerten verwenden. Normalisierung über `FwDateUtils.parse()`.

## Charttypunabhängigkeit

Regel gilt explizit für: LineCharts, BarCharts mit Zeitachse, ScatterCharts mit Datums-/Zeitwerten, Plugins die x-Werte lesen, Engine-Normalisierungscode.

## BarChart-/Zeitachsen-Bestätigung

BarCharts mit Jahres-/Monats-/Datumsachse sind ausdrücklich in der Spec als Anwendungsfall benannt.

## Pflichtprüfung für künftige Engine-APs

Fünf Prüfpunkte in `CHART_ENGINE_REGRESSIONSREGELN.md` — verlinkter Test-IDs aus REGRESSION-MATRIX.md (REG-APP-001, REG-X-001, REG-CSV-001 ff., REG-Y-003).

## Protected-Files-Bestätigung

`CSVParser.js`, `FwDateUtils.js`, `FinanzwesirData.js` — in der Spec als Protected / Single Source of Truth explizit benannt. Keine lokalen Anpassungen dieser Dateien für Engine-Sonderfälle.

## Offene Punkte

Keine. AP vollständig abgeschlossen.

## Blocker

Keine.

## Empfohlener nächster AP

**B1-AP-14e4** — CenterTextPlugin auslagern (`core/FwChartPlugins.js` → `plugins/FwCenterTextPlugin.js`, Import in `PieChartStrategy.js` aktualisieren).

## Bestätigungen

- [x] Keine Engine-Codeänderung vorgenommen
- [x] Keine Plugin-Codeänderung vorgenommen
- [x] ChartEngine.js nicht geändert
- [x] CSVParser.js nicht geändert
- [x] FwDateUtils.js nicht geändert
- [x] FinanzwesirData.js nicht geändert
- [x] Kein plugins/index.js angelegt
- [x] Keine Plugin-Registry gebaut
- [x] Keine Runtime-Registry gebaut
- [x] Keine CSS-Änderung vorgenommen
- [x] Keine JSON-Änderung vorgenommen
- [x] Keine CSV-Änderung vorgenommen
- [x] Keine Protected Files geändert
- [x] Keine Tests repariert
- [x] Keine Regressionen gefixt
- [x] Keine AP-15-Arbeit begonnen
- [x] Keine Commits ausgeführt
- [x] Kein Abschlussritual ausgeführt
