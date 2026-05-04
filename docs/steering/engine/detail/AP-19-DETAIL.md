# AP-19: PERIOD_TABLES DRY-Refactoring — Detail

**Status:** ⬜ Offen
**Bereich:** Engine — Layer 4 (FwSmartXAxis.js)
**Priorität:** M | **Abhängigkeit:** AP-18 ✅
**Gemeldet:** 2026-02-27 | **Aufwand:** Klein

---

## Problem

Die `PERIOD_TABLES` in `FwSmartXAxis.js` haben ein DRY-Problem. Die Rhythm-Overrides
(DAILY, WEEKLY, HALF_YEARLY, YEARLY) kopieren die gemeinsamen Tail-Zeilen
(month → quarter → year) anstatt sie aus einer Basis-Tabelle zu erben.

Nach AP-17 (DAILY, WEEKLY) und AP-18 (HALF_YEARLY stepSize-Änderung) sind es
**5 Overrides mit ~25 duplizierten Zeilen**.

**Vorbild:** Die SNAPSHOT-Seite hat das sauber gelöst via `SNAPSHOT_BASE` +
Spread-Operator (`[...spezifischeZeilen, ...SNAPSHOT_BASE]`).

---

## IST-Zustand (nach AP-17 + AP-18)

```javascript
// PERIOD-Seite — DRY-Problem:
const PERIOD_TABLES = {
  DEFAULT: { S: PERIOD_TABLE_S, M: PERIOD_TABLE_M, L: PERIOD_TABLE_L },
  DAILY: [
    { unit: 'day', ... },          // ← eigene Zeile
    { unit: 'day', ... },          // ← eigene Zeile
    { unit: 'week', ... },         // ← KOPIE aus DEFAULT
    { unit: 'month', ... },        // ← KOPIE aus DEFAULT
    { unit: 'quarter', ... },      // ← KOPIE aus DEFAULT
    { unit: 'year', stepSize:1 },  // ← KOPIE aus DEFAULT
    { unit: 'year', stepSize:5 },  // ← KOPIE aus DEFAULT
  ],
  WEEKLY: [
    { unit: 'week', ... },         // ← eigene Zeile
    { unit: 'month', ... },        // ← KOPIE
    { unit: 'quarter', ... },      // ← KOPIE
    { unit: 'year', stepSize:1 },  // ← KOPIE
    { unit: 'year', stepSize:5 },  // ← KOPIE
  ],
  // HALF_YEARLY, YEARLY analog
};
```

---

## SOLL-Zustand

```javascript
// PERIOD_BASE: Gemeinsame Tail-Zeilen, Zone-aware via format-Maps
const PERIOD_BASE = [
  { maxYears: 1.0,      unit: 'month',   stepSize: 1, mode: 'MONTH',
    format: { S: 'MMM', M: 'MMM', L: "MMM 'yy" } },
  { maxYears: 5.0,      unit: 'quarter', stepSize: 1, mode: 'QUARTER',
    format: { S: 'MMM', M: "MMM 'yy", L: "MMM 'yy" } },
  { maxYears: 10.0,     unit: 'year',    stepSize: 1, mode: 'YEAR',   format: 'yyyy' },
  { maxYears: Infinity, unit: 'year',    stepSize: 5, mode: 'YEAR',   format: 'yyyy' }
];

const PERIOD_TABLES = {
  DEFAULT: { S: PERIOD_TABLE_S, M: PERIOD_TABLE_M, L: PERIOD_TABLE_L },  // unverändert
  DAILY: [
    { maxYears: 0.04, unit: 'day', stepSize: { S:3, M:1, L:1 },
      mode: 'DAILY', format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    { maxYears: 0.25, unit: 'day', stepSize: { S:14, M:7, L:7 },
      mode: 'DAILY', format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    { maxYears: 0.25, unit: 'week', stepSize: 1, mode: 'WEEKLY',
      format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    ...PERIOD_BASE
  ],
  WEEKLY: [
    { maxYears: 0.25, unit: 'week', stepSize: 1, mode: 'WEEKLY',
      format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    ...PERIOD_BASE
  ],
  HALF_YEARLY: [
    { maxYears: 5.0, unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR',
      format: { S:'MMM', M:"MMM 'yy", L:"MMM 'yy" } },
    ...PERIOD_BASE.filter(r => r.unit === 'year')  // nur year-Zeilen, quarter wird ersetzt
  ],
  YEARLY: [
    ...PERIOD_BASE.filter(r => r.unit === 'year')
  ]
};
```

---

## Design-Entscheidungen

1. **PERIOD_BASE ist eine flache Tabelle**, nicht Zone-Map. Zone-Awareness via polymorphe
   `format`- und `stepSize`-Felder (wie SNAPSHOT_BASE). `_getDensityMatrix` löst bereits auf.

2. **DEFAULT bleibt als Zone-Map.** Die drei PERIOD_TABLE_{S,M,L} bleiben unverändert —
   sie sind die Spec-konforme Darstellung (§3.1–§3.3).

3. **Keine Verhaltensänderung.** Rein strukturelles Refactoring. Alle Density-Matrix-Lookups
   liefern identische Ergebnisse.

---

## Betroffene Dateien

| Datei | Was |
|---|---|
| `FwSmartXAxis.js` | PERIOD_TABLES umbauen, PERIOD_BASE extrahieren |

**NICHT betroffen:** SNAPSHOT_TABLES, `_getDensityMatrix()`, `afterFit`, `afterBuildTicks`

---

## Testplan

**Funktional:** Für jeden Rhythmus (6) × Zone (3) × Duration-Stufe:
`_getDensityMatrix(duration, zone, rhythm, 'PERIOD')` muss vor und nach Refactoring identisch sein.

**Visuell (Stichproben):**
- `snap_period_daily_7d.csv` (DAILY Bar)
- `snap_period_weekly_3m.csv` (WEEKLY Bar)
- `bd_asset_quartalsweise_25y.csv` (QUARTERLY Bar, nach AP-18)
- `bd_asset_halbjaehrlich_25y.csv` (HALF_YEARLY Bar)
- `bd_asset_jaehrlich_25y.csv` (YEARLY Bar)
- Beliebige MONTHLY-CSV (DEFAULT-Pfad)

## Spec-Referenz

`docs/spec/Charts Ticks und Label_v14.md` §3 (PERIOD Density Matrix)

## Pre-Code-Gate (Pflicht vor Implementierung)

1. Nicht brechen: Alle PERIOD-Track Rhythmen auf allen 3 Zonen
2. Bindende Spec: §3 PERIOD Density Matrix
3. Single Source of Truth: `FwSmartXAxis.js` PERIOD_TABLES
4. Tabu: SNAPSHOT_TABLES, `_getDensityMatrix()`
5. Kleinste sichere Änderung: Nur PERIOD_TABLES umstrukturieren
6. Erfolgstest: Vorher/Nachher-Vergleich alle Rhythmus×Zone×Duration
7. Regressionsausschluss: Visueller Check der 6 Stichproben-CSVs
