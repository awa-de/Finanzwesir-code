# AP-20/21: SNAPSHOT X-Achse — Mixed-Rhythm CV-Heuristik — Detail

**Status:** 🟡 In Arbeit (T0 ✅, T1/T2/T4 gestrichen)
**Bereich:** Engine — Layer 3+4 (FwDateUtils, FwSmartXAxis, LineChartStrategy, FwDateAdapter)
**Priorität:** H | **Abhängigkeit:** keine
**Ursprungsplan:** `docs/steering/archiv/AP-21-IMPLEMENTATIONSPLAN.md`

---

## Aktuelle Task-Reihenfolge (nach Plan-Delta §7)

**T5 → T3 → T6 → T7**

T0 ✅ erledigt. T1/T2/T4 gestrichen (min/max-Drift-Hypothese widerlegt).

---

## Root Cause (verifiziert via T0-Diagnostik, 2026-02-28)

**Nicht** min/max-Drift durch Chart.js buildTicks (Hypothese widerlegt).

**Tatsächlich:** Calendar Snap + Mixed-Rhythm-Daten.

`scenario_1_long_25y.csv` hat gemischten Rhythmus (Quartale+Jahre). `detectRhythm` liefert
YEARLY (Plurality-Vote). `getSnapshotSnap(ts, 'YEARLY')` snappt ALLE Punkte auf Jan 1.
Quartals-Punkte kollabieren auf denselben Timestamp → mehrere Datenpunkte gleiche x-Position
→ Chart.js zeichnet Schlaufe/vertikalen Strich.

---

## Task 5: CV-Heuristik implementieren (Kern-Fix)

**Betroffene Dateien:**
- `core/FwDateUtils.js` — `detectRhythm()` SNAPSHOT-Pfad
- `strategies/LineChartStrategy.js` — `transform()` (übergibt allTimestamps)
- `core/FwSmartXAxis.js` — neue ERRATIC-Tabelle in SNAPSHOT_TABLES

**Änderungen in `FwDateUtils.detectRhythm` (SNAPSHOT-Pfad ersetzen):**
```
1. Intervalle berechnen (bestehend — diffs Array)
2. Median M aus allTimestamps (zoom-stabil, Spec §4.2 Scope-Regel)
   Fallback: wenn allTimestamps fehlt → M aus timestamps
3. CV = Standardabweichung / Mittelwert der diffs
4. Klassifikation:
   N <= 2 → ERRATIC
   CV > 0.60 → ERRATIC
   CV > 0.30 → Lückenhaft (wie Regulär behandelt)
   CV <= 0.30 → Regulär
5. Rhythmus: Regulär/Lückenhaft → M-Mapping (§4.3)
   Erratisch → gibt 'ERRATIC' zurück, Tick-Einheit via T_window in _getDensityMatrix
```

**Neue Signatur:** `detectRhythm(timestamps, semantics, allTimestamps)` — dritter Param optional.
BarChartStrategy übergibt keinen dritten Parameter → kein Breaking Change.

**LineChartStrategy.transform() Änderung:**
```js
// NEU:
const allTimestamps = data.rows.map(r => r[dateCol].getTime()); // vor Filterung
const rhythm = FwDateUtils.detectRhythm(timestamps, 'SNAPSHOT', allTimestamps);
```

**Neue ERRATIC-Tabelle in SNAPSHOT_TABLES:**
```js
ERRATIC: [
  { maxYears: 1,        unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: "MMM 'yy" },
  { maxYears: 3,        unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR', format: "MMM 'yy" },
  { maxYears: 10,       unit: 'year',    stepSize: 1, mode: 'YEAR',    format: 'yyyy' },
  { maxYears: Infinity, unit: 'year',    stepSize: 5, mode: 'YEAR',    format: 'yyyy' },
]
```

**ERRATIC-Snap-Anpassung (neu vs. Original-Plan):**
Bei ERRATIC muss `getSnapshotSnap` einen Identitäts-Snap liefern (kein Kalender-Snap).
Mixed-Rhythm-Punkte dürfen nicht auf denselben Timestamp kollabieren.

**Testkriterien (5 Referenz-CSVs Spec §4.6):**
1. `snap_period_monthly_30m.csv`: M~31d, CV~0 → Regulär → MONTHLY ✓
2. `tool_tip_monthly_gaps.csv`: M=31d, CV=0.53 → Lückenhaft → MONTHLY ✓
3. `tt_gap_test_irregular.csv`: M=73d, CV=0.31 → Lückenhaft → QUARTERLY ✓
4. `snap_period_yearly_irregular.csv`: Regulär → YEARLY, Zoom 1J: N=2 → ERRATIC → Quartal ✓
5. `scenario_4_crash.csv`: CV=0.86 → ERRATIC → T_window-gesteuert ✓

**Zoom-Wechsel-Test (Pflicht):**
- `scenario_4_crash.csv`: 5J→Jahres-Ticks, 1J→Quartal-Ticks, 3J→Halbjahres-Ticks, max→Jahres-Ticks

**ACHTUNG Tabu-Zone:** FwDateUtils ist Tabu-Zone. Änderung ist spec-konform und
betrifft NUR den SNAPSHOT-Pfad. PERIOD-Pfad bleibt unberührt. Pre-Code-Gate Pflicht.

---

## Task 3: FwDateAdapter UTC-Konsistenz

**Betroffene Dateien:** `core/FwDateAdapter.js`
**Regressionsrisiko: HOCH** — Adapter wird von Chart.js für BEIDE Tracks genutzt.
→ Erst ausführen, wenn T5 stabil ist (Isolation).

**Änderungen (5 Methoden):**
- `format()`: `getFullYear()` → `getUTCFullYear()`, `toLocaleDateString` → manuelle UTC-Formatierung
- `add()`: `setDate()` → `setUTCDate()`, `setMonth()` → `setUTCMonth()`, etc.
- `diff()`: `getMonth()` → `getUTCMonth()`, `getFullYear()` → `getUTCFullYear()`
- `startOf()`: `setHours(0,0,0,0)` → `setUTCHours(12,0,0,0)` (Noon-Protokoll!)
- `endOf()`: folgt aus startOf-Fix

**Testkriterien:**
- `startOf('month', Date.UTC(2024, 0, 15, 12, 0, 0))` === `Date.UTC(2024, 0, 1, 12, 0, 0)`
- PERIOD-Track: Alle Balken-CSVs in 3 Zonen — KEINE Regression
- Bei Regression: Adapter-Fix revertieren

---

## Task 6: Pixel-Budget-Validierung

**Keine Code-Änderung.** Nur Messung gegen Spec §5.9.
Browser-DevTools → Canvas-Element → `chart.chartArea.left/right` ablesen.
Vergleich: ~270px (S), ~620px (M), ~940px (L).
Falls Spec-Werte zu optimistisch: Kapazitätstabelle in §5.9 anpassen.

---

## Task 7: Toter Code entfernen

Nach T5 stable: T0-Diagnostik-Logs aus `FwSmartXAxis.js` entfernen.

---

## Haltepunkte

**Nach T5:** Alle 5 Referenz-CSVs korrekt + Zoom-Wechsel-Test → Weiter zu T3.
**Nach T3:** PERIOD-Track keine Regression → Weiter zu T6+T7.

---

## WAS NICHT TUN

- NICHT PERIOD-Track anfassen (`afterBuildTicks`/`afterFit` des Bar-Pfads)
- NICHT Y-Achse, Tooltips oder BAN-Headline anfassen
- NICHT T3 (Adapter) vor T5 ausführen
- NICHT ohne Haltepunkt-Gate weiterarbeiten

---

## Spec-Referenz

`docs/spec/Charts Ticks und Label_v14.md` §4 (CV-Heuristik), §5.9 (Pixel-Budget)
Vollständiger Implementationsplan: `docs/steering/archiv/AP-21-IMPLEMENTATIONSPLAN.md`
