# AP-14e8 — FwBarLayoutPlugin-Dead-State nachweisen und kontrolliert entfernen — Ergebnis

Stand: 2026-06-22 | Session: B1-AP-14e8 | Geändert von: Claude

---

## Kurzurteil

- Phase 1 (verschärfter Dead-State-Nachweis): **GRÜN** — alle 10 Kriterien erfüllt, kein produktiver Leser gefunden.
- Phase 2 (kontrollierte Entfernung): **DURCHGEFÜHRT** — FwBarLayoutPlugin inline-Definition und Einbindung aus `BarChartStrategy.js` entfernt.
- Keine neue Plugin-Datei angelegt. Keine Plugin-Registry. Keine neue Geometrielogik.
- BarChart-Hybrid (History + Ranking) ist unverändert — beide Modi funktionieren unabhängig von `_fwGeometry`.
- Regressionsregel AP-14e3: nicht verletzt.

---

## Ausgangslage aus AP-14e7

```
FwBarLayoutPlugin inline in BarChartStrategy.getChartConfig() Z.238–247 (Definition)
plugins: [FwBarLayoutPlugin] in getChartConfig() Z.266 (Einbindung)
chart._fwGeometry.halfBarPixel: geschrieben, nirgendwo gelesen
FwSmartXAxis.afterFit(): berechnet halfBarPixel eigenständig, liest _fwGeometry nicht
Beide BarChart-Modi (History/Zeitachse + Ranking/Kategorieachse) vollständig dokumentiert
```

---

## Phase 1: Suchbefunde

### Direkte Suchmuster

| Muster | JS-Treffer (produktiv) | Doku-Treffer |
|--------|----------------------|--------------|
| `_fwGeometry` | BarChartStrategy.js Z.245 (SCHREIBT) | AP-14e7-Protokoll, Baendigung I/III-Spec |
| `fwGeometry` | BarChartStrategy.js Z.245 (SCHREIBT) | Y-Achse Spec (Negativ-Aussage), AP-Protokolle |
| `halfBarPixel` | FwSmartXAxis.js Z.286 (lokale Variable, UNABHÄNGIG) + BarChartStrategy.js Z.245 (SCHREIBT) | Baendigung I/II/III-Spec, Tooltips-Spec |
| `FwBarLayoutPlugin` | BarChartStrategy.js Z.238+266 (Definition+Einbindung) | AP-14e1–14e7 Protokolle, Baendigung III |
| `fwBarLayout` | BarChartStrategy.js Z.239 (id) | AP-14e1 Protokoll |

### Indirekte / dynamische Zugriffsmuster

| Muster | Treffer in JS |
|--------|---------------|
| `chart['_fwGeometry']` | **KEIN TREFFER** |
| `"_fwGeometry"` (String-Schlüssel) | **KEIN TREFFER** |
| `chart[` (dynamischer Zugriff) | **KEIN TREFFER** |
| `getOwnProperty` | **KEIN TREFFER** |
| `Object.assign(chart` | **KEIN TREFFER** |
| `defineProperty` | **KEIN TREFFER** |
| `_fw` (ungekannte _fw-Muster) | Kein unbekannter Treffer |

### Produktive Leser

**Kein einziger produktiver JS-Leser von `chart._fwGeometry` gefunden.**

### Doku-/Steuerreferenzen (nicht produktiv)

```
docs/spec/Dokumentation Die Baendigung der X-Achse I.md  — Designhistorie
docs/spec/Dokumentation Die Baendigung der X-Achse III.md — Designhistorie
docs/spec/Y-Achse Sezifikationen 2.0.md — Negativ-Aussage ("Keine Berührung")
docs/spec/Tooltips_v2-0-0.md — Historischer Verweis
docs/steering/patches/AP-14e1–14e7_*  — Protokollreferenzen
```

---

## Entscheidung: GRÜN

Alle 10 Grün-Kriterien erfüllt:

| # | Kriterium | Befund |
|---|-----------|--------|
| 1 | Kein produktiver JS-Leser von chart._fwGeometry | ✓ |
| 2 | Kein produktiver JS-Leser von fwGeometry | ✓ |
| 3 | Kein produktiver indirekter Zugriff | ✓ |
| 4 | halfBarPixel produktiv nur lokal in FwSmartXAxis.afterFit() | ✓ |
| 5 | FwSmartXAxis.afterFit() liest _fwGeometry nicht | ✓ |
| 6 | FwBarLayoutPlugin nur in BarChartStrategy.js | ✓ |
| 7 | Keine App-Datei liest _fwGeometry | ✓ |
| 8 | Keine Plugin-Datei liest _fwGeometry | ✓ |
| 9 | Keine Core-Datei liest _fwGeometry | ✓ |
| 10 | Doku-Treffer sind Historienreferenzen, keine produktive Nutzung | ✓ |

---

## Entfernte Code-Stellen

### Stelle 1 — FwBarLayoutPlugin-Definition (Z.238–247 + Leerzeile)

```js
// ENTFERNT:
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

### Stelle 2 — Plugin-Einbindung (ehem. Z.266)

```js
// ENTFERNT:
plugins: [FwBarLayoutPlugin],
```

### Resultat

`getChartConfig()` springt jetzt direkt von `ciFont`-Deklaration zu `xAxisConfig`. Das `return`-Objekt hat keine `plugins`-Property mehr (Chart.js akzeptiert das fehlende Feld ohne Fehler).

---

## Geänderte Dateien

```
Theme/assets/js/fw-chart-engine/strategies/BarChartStrategy.js   — 11 Zeilen entfernt
```

## Nicht geänderte Dateien

Alle anderen Dateien unverändert. Insbesondere:
- FwSmartXAxis.js (afterFit läuft weiterhin eigenständig)
- FwSmartScales.js, FwSmartTooltips.js, FwSmartYAxis.js
- ChartEngine.js, FwRenderer.js
- Alle plugins/*.js
- Alle strategies/ (außer BarChartStrategy.js)
- apps/prokrastinations-preis/app.js
- docs/spec/*, docs/steering/ (außer diesem Protokoll)

---

## BarChart-Hybrid-Schutz: History-/Zeitachsenmodus

```
activeView-Logik: unverändert ✓
_transformHistoryView(): unverändert ✓
x = Zeitanker (BopAnchor): unverändert ✓
_originalDate: unverändert ✓
fwContext.axisType = 'time': unverändert ✓
fwContext.viewMode = 'history': unverändert ✓
dateSemantics = 'PERIOD': unverändert ✓
FwSmartScales.getTimeAxis(...): unverändert ✓
FwSmartXAxis PERIOD-Track + afterFit(): unverändert ✓
BOP-Anker, sourceTicks: unverändert ✓
```

## BarChart-Hybrid-Schutz: Ranking-/Kategorieachsenmodus

```
activeView === 'ranking': unverändert ✓
_transformAssetView(): unverändert ✓
x = Asset-/Spaltenname: unverändert ✓
_originalDate (Jan-1970-Fix): unverändert ✓
fwContext.axisType = 'category': unverändert ✓
fwContext.viewMode = 'ranking': unverändert ✓
Kategorieachse (type: 'category'): unverändert ✓
Tooltip-Modus für Ranking: unverändert ✓
Semantisches X-Mapping: unverändert ✓
```

---

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

| Prüfpunkt | Befund |
|-----------|--------|
| Allgemeine ChartEngine-Datenlogik geändert? | NEIN ✓ |
| Datums-/Zeitachsenlogik geändert? | NEIN ✓ |
| String-Annahmen auf Datumswerten eingeführt? | NEIN ✓ |
| CSVParser.js unverändert? | JA ✓ |
| FwDateUtils.js unverändert? | JA ✓ |
| FinanzwesirData.js unverändert? | JA ✓ |
| Beide Datenpfade (renderFromData + _processContainer) unberührt? | JA ✓ |

---

## Testmatrix

### BarChart-spezifisch (manuell durch Albert)

| # | Testfall | Was prüfen |
|---|----------|------------|
| 1 | BarChart History-View, Zeitachse, Single-Asset | Balken sichtbar, Zeitachse korrekt, kein Konsolenfehler |
| 2 | BarChart History-View, Zeitachse, Multi-Asset | Balken pro Asset, Legende korrekt |
| 3 | BarChart Ranking-View, Asset-Kategorien | Assets auf X-Achse, _originalDate im Tooltip korrekt |
| 4 | BarChart über CSV-Pfad (data-csv) | Standard-HTML laden, kein Fehler |
| 5 | Viewport S (< 450px) | Tick-Dichte korrekt |
| 6 | Viewport M (450–900px) | Tick-Dichte korrekt |
| 7 | Viewport L (≥ 900px) | Volle Darstellung |
| 8 | Tooltips im Ranking-Modus | Datum aus _originalDate korrekt |
| 9 | Kein Januar-1970-Rückfall | Ranking-View zeigt echtes Datum |

### Cross-Regression (manuell durch Albert)

| # | Testfall | Was prüfen |
|---|----------|------------|
| 10 | LineChart mit Crosshair | Crosshair weiterhin aktiv |
| 11 | Prokrastinationspreis Screen 3 | VerticalLine weiterhin sichtbar |
| 12 | Prokrastinationspreis Screen 2 | Pulse weiterhin aktiv |
| 13 | Pie/Doughnut | Zentrumstext unverändert |
| 14 | Standard-Charts | Laden ohne Konsolenfehler |

---

## Manuell offene Prüfungen

Albert testet lokal mit VSCode-Live-Server. Tests 1–14 ausstehend.

---

## Offene Punkte

1. **Spec-Drift dokumentieren**: Die Spec-Dokumente „Baendigung der X-Achse" beschreiben `_fwGeometry` als aktiven Kommunikationskanal. Die Implementierung hat diesen Kanal nie verdrahtet. Dieser Drift wird in AP-14e10 dokumentiert.
2. **halfBarPixel in FwSmartXAxis.afterFit()**: Berechnung läuft weiter mit N-1 Intervallen — korrekte Implementierung, kein Handlungsbedarf.

---

## Blocker

Keine.

---

## Empfohlener nächster AP

**AP-14e9 — Plugin-Barrel anlegen**

---

## Bestätigungen

- Erst Dead-State-Nachweis (Phase 1) durchgeführt ✓
- Nicht 1:1 ausgelagert ✓
- Kein plugins/FwBarLayoutPlugin.js angelegt ✓
- Kein plugins/index.js angelegt oder geändert ✓
- Keine Plugin-Registry gebaut ✓
- Keine Runtime-Registry gebaut ✓
- Keine neue BarChart-Layoutlogik gebaut ✓
- Keine neue _fwGeometry-Verdrahtung gebaut ✓
- FwSmartXAxis.js nicht geändert ✓
- FwSmartScales.js nicht geändert ✓
- FwDateUtils.js nicht geändert ✓
- ChartEngine.js nicht geändert ✓
- Tooltips nicht geändert ✓
- Achsenlogik nicht geändert ✓
- BOP-Anker nicht geändert ✓
- _originalDate nicht geändert ✓
- Semantisches X-Mapping nicht geändert ✓
- LineChartStrategy.js nicht geändert ✓
- PieChartStrategy.js nicht geändert ✓
- Plugin-Dateien nicht geändert ✓
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
