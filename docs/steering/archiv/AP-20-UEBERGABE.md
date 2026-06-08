# AP-20 Übergabeprompt — SNAPSHOT X-Achse

**Status:** Teilweise implementiert, Kernproblem nicht gelöst.
**Datum:** 2026-02-28

---

## Was ist AP-20?

SNAPSHOT-Track (Liniendiagramme) zeigt erratische, ungleichmäßige X-Achsen-Ticks.
Betrifft ALLE Rhythmen und ALLE Bildschirmgrößen.

## Was wurde bereits getan (V10.4.0)

Sechs Teilprobleme identifiziert und gefixt:

1. **autoSkip: false** — Chart.js filterte unsere afterBuildTicks-Ergebnisse.
2. **Runtime Zone-Detection** — `fwContext.width` existiert nicht (Object.freeze). Fix: `axis.chart.width` in afterBuildTicks lesen.
3. **SNAPSHOT/PERIOD Alignment** — SNAPSHOT hatte `includeBounds`, `major.enabled`, dynamisches `align`, `FwLayoutRules.formatTimeLabel`. Alles entfernt, an PERIOD-Config angeglichen.
4. **afterTickToLabelConversion** — Chart.js `generateTickLabels` überschreibt Labels NACH afterBuildTicks. Neuer Lifecycle-Hook re-setzt Labels mit `_formatLabel(tick.value)`. `ticks.callback` entfernt.
5. **SNAPSHOT_BASE ≤0.5y** — Neue Tabellenzeile für kurze Serien (≤6 Monate → jeden Monat zeigen).
6. **QUARTERLY eigene Tabelle** — QUARTERLY erbt nicht mehr SNAPSHOT_BASE, hat eigene Tabelle mit `unit:'quarter'` (→ Mär/Jun/Sep/Dez via Quarter-End-Filter).

## Was NICHT funktioniert

**Trotz aller Fixes: Die Ticks erscheinen visuell immer noch erratisch.** Die Console-Diagnostik zeigt korrekte Tick-Values und korrekte Labels — aber Chart.js rendert sie nicht an den erwarteten Positionen. Es gibt eine Diskrepanz zwischen:
- Was `afterBuildTicks` + `afterTickToLabelConversion` produzieren (korrekt)
- Was Chart.js visuell auf dem Canvas zeichnet (erratisch)

## Vermutete verbleibende Ursache

Chart.js TimeScale hat eine interne Tick-Positions-Berechnung, die von `time.unit` und `displayFormats` gesteuert wird. Unsere Hooks setzen korrekte `tick.value` und `tick.label` — aber Chart.js berechnet die **Pixel-Position** der Ticks möglicherweise aus einer anderen Quelle (z.B. der internen `_unit`-Bestimmung oder `ticks.source`).

Mögliche Ansätze (nicht getestet):
- `ticks.source: 'labels'` statt Default (Chart.js nutzt dann tick.label direkt)
- Kategorie-Achse statt Zeitachse (verliert proportionale Darstellung)
- Chart.js TimeScale komplett umgehen: Eigenes Plugin für X-Achse

## Dateien-Inventar

### Hauptdatei (alle Änderungen hier)
- **`assets/js/fw-chart-engine/core/FwSmartXAxis.js`** (V10.4.0, ~490 Zeilen)
  - `compute()` — Hauptmethode, Weiche SNAPSHOT/PERIOD
  - SNAPSHOT return block (Z.225–259): Lifecycle-Hooks afterDataLimits, afterBuildTicks, afterTickToLabelConversion
  - PERIOD return block (Z.266–382): afterFit (Bar-Expansion), afterBuildTicks (Cursor-Kalender-Ticks), afterTickToLabelConversion
  - `_generateLinearTicks()` (Z.389–451): Cursor-basierte Kalender-Tick-Erzeugung für SNAPSHOT
  - `_formatLabel()` (Z.455–466): Deterministische Label-Formatierung aus Density-Matrix-Format
  - `_getDensityMatrix()` (Z.472–486): Table-Driven Lookup (Zone × Rhythm × Duration)
  - Density-Tabellen (Z.96–193): PERIOD_TABLE_S/M/L, SNAPSHOT_BASE, SNAPSHOT_TABLES, PERIOD_TABLES

### Aufrufende Dateien (nicht geändert, aber relevant)
- **`core/FwSmartScales.js`** — Dünner Wrapper, ruft `FwSmartXAxis.compute()` auf
- **`strategies/LineChartStrategy.js`** — SNAPSHOT-Track. `transform()` erstellt fwContext mit `dateSemantics: 'SNAPSHOT'`. `getChartConfig()` ruft `FwSmartScales.getTimeAxis()`.
- **`strategies/BarChartStrategy.js`** — PERIOD-Track. Analog mit `dateSemantics: 'PERIOD'`.
- **`strategies/BaseChartStrategy.js`** — `_createFwContext()` mit Object.freeze. Hat KEIN `width`-Feld.
- **`core/FwLayoutRules.js`** — `getResponsiveFont()` wird in beiden Tracks genutzt. `formatTimeLabel()` wird NICHT mehr genutzt (war alter SNAPSHOT-Callback).
- **`core/FwDateUtils.js`** — `detectRhythm()`, `getStepDuration()`, `getDiffYears()`, `getSnapshotSnap()`, `filterRows()`. Tabu-Bereich.

### Spec-Dateien
- **`docs/spec/Charts Ticks und Label_v12.md`** — Bindende Spec. §3.1–3.3 (PERIOD Zone-Tabellen), §3.4 (SNAPSHOT_BASE), §3.4a (Rhythm Overrides), §3.5 (Floor Principle), §3.6 (Quarter-End Convention), §7 (SNAPSHOT Snap-Architektur).
- **`docs/spec/Der Rucksack (Context Object Pattern).md`** — fwContext-Definition.

### Testdaten
- `data/snap_period_daily_90d.csv` — DAILY, 90 Tage
- `data/snap_period_monthly_30m.csv` — MONTHLY, 30 Monate
- `data/snap_period_monthly_4m.csv` — MONTHLY, 4 Monate
- `data/snap_period_quarterly_3y.csv` — QUARTERLY, 3 Jahre (12 Datenpunkte)
- `data/snap_period_weekly_18m.csv` — WEEKLY, 18 Monate
- `data/test_data-Liniendiagramm.csv` — YEARLY, Langzeit

### Testseiten
- `index.html` — Haupt-Testseite mit allen CSVs
- `index_data_anchored.html` — Zusätzliche Testseite

## Was funktioniert (nicht anfassen)

- **PERIOD-Track (Balkendiagramme):** Funktioniert korrekt, alle Rhythmen, alle Screens.
- **Y-Achse:** Komplett stabil (FwSmartYAxis).
- **Tooltips:** Komplett stabil (FwSmartTooltips, nutzt `_originalDate`).
- **Calendar Snap:** Funktioniert (FwDateUtils.getSnapshotSnap + LineChartStrategy).
- **BAN-Headline:** Funktioniert (LineChartStrategy._computeHeadline).
- **Density Matrix Lookup:** `_getDensityMatrix()` funktioniert korrekt (verifiziert via Console-Diagnostik).
- **Tick-Erzeugung:** `_generateLinearTicks()` erzeugt korrekte Kalender-Ticks (verifiziert).
- **Label-Formatierung:** `_formatLabel()` erzeugt korrekte Labels (verifiziert).
- **afterTickToLabelConversion:** Setzt korrekte Labels (verifiziert).

## Was NICHT funktioniert (das muss gelöst werden)

Chart.js rendert die Ticks nicht an den Positionen, die unsere afterBuildTicks-Values vorgeben. Die Tick-Values und Labels sind korrekt — die visuelle Positionierung ist erratisch.

## Architektur-Constraints

- Layer 1 (FinanzwesirData, CSVParser, FwDateUtils): **Tabu** ohne explizite Begründung
- fwContext-Grundstruktur (BaseChartStrategy._createFwContext): **Tabu**
- Alle Specs in `docs/spec/` sind **bindend**
- Chart.js v4.x, lokal gehostet in `assets/js/vendor/chart.umd.min.js`
- Kein neues Framework/Library
- PERIOD-Track darf nicht regressieren
