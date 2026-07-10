/**
 * @fileoverview Finanzwesir Chart Engine - X-Axis Specialist
 * @module core/FwSmartXAxis
 * @version 10.4.0 (RUNTIME ZONE-DETECTION + SNAPSHOT/PERIOD ALIGNMENT — AP-20)
 * * LOG-BUCH:
 * 2026-01-23: V4.8.0 - Production Range Defender (Bar Optimized).
 * 2026-01-26: V5.2.0 - Geometric Isolation.
 * 2026-01-26: V5.3.0 - RAW RESTORATION V4.8.0 (1:1 Compliance).
 * 2026-01-26: V5.4.0 - UX ALIGNMENT & ISOLATION.
 * 2026-02-13: V6.0.0 - TABLE-DRIVEN DENSITY MATRIX.
 * 2026-02-13: V7.0.0 - ZONE-AWARE DENSITY MATRIX (Spec §3 Compliance).
 * - Fix: PERIOD_TABLE → drei Zone-Tabellen (S/M/L) mit format-Feld (Spec §3.1–§3.3).
 * - Fix: afterBuildTicks Key-basierte Deduplizierung (ein Tick pro Zeiteinheit, nicht pro Datenpunkt).
 * - Fix: Label-Callback nutzt _formatLabel mit Spec-konformen Formaten.
 * - Architektur: SNAPSHOT-Pfad unverändert (isoliert durch isSnapshot-Weiche).
 * 2026-02-19: V8.0.0 - TABLE-DRIVEN STRATEGY SELECTION.
 *   Refactor: if-else Rhythm-Overrides → rhythm-keyed Lookup-Tabellen (Open-Closed).
 *   Fix: WEEKLY SNAPSHOT < 1 Jahr erzeugt monatliche statt chaotische tägliche Ticks (Regression 4).
 *   Architektur: _getDensityMatrix() = eine unified Lookup-Funktion, keine Kontrollfluss-Verzweigungen.
 * 2026-02-19: V8.1.0 - FLOOR PRINCIPLE.
 *   Fix: Jeder Rhythmus hat eigene SNAPSHOT-Tabelle (DAILY, WEEKLY, MONTHLY, QUARTERLY, HALF_YEARLY, YEARLY).
 *   Fix: SNAPSHOT_BASE als gemeinsamer Unterbau (DRY), DAILY mit zwei Stufen (≤14d / ≤91d).
 *   Fix: MONTHLY/QUARTERLY Daten bekommen keine täglichen Ticks mehr (Floor = monatlich).
 * 2026-02-20: V8.2.0 - DATA-ANCHORED TICKS.
 *   Fix: YEARLY/HALF_YEARLY Ticks an echten Datenpositionen statt Kalender-Grenzen.
 *   Löst End-of-Period-Offset: Dez 31 (Daten) vs. Jan 1 (Kalender-Tick) → Tick=Tooltip=Label.
 *   Neu: _generateDataAnchoredTicks() — YEAR-Mode: 1 Tick/stepSize-Jahr, HALF_YEAR: alle Datenpunkte.
 * 2026-02-20: V8.3.0 - CALENDAR TICKS FOR IRREGULAR DATA.
 *   Revert: Ordinal-Achse entfernt (verletzt Tufte Lie Factor, Cleveland Steigung).
 *   Fix: Irreguläre YEARLY/HALF_YEARLY nutzen Standard-Kalenderticks (proportionale Zeitachse).
 *   V8.2 Data-Anchored bleibt für reguläre Serien (isRegularSeries-Weiche).
 * 2026-02-20: V8.4.0 - SNAP-AWARE REGULARITY CHECK.
 *   Fix: Regularity-Check liest _originalDate statt pt.x (nach Year-Snap sind alle x = Jan 1).
 *   Ohne Fix: isRegularSeries→true→Data-Anchored statt Calendar-Ticks für irreguläre Daten.
 * 2026-02-23: V8.5.0 - DATA-ANCHORED QUARTERLY/MONTHLY (AP-10, Spec §7.4).
 *   Neu: Rhythm-Guard erweitert um QUARTERLY/MONTHLY mit regulärem Day-Pattern.
 *   Neu: _anchorByUnit() — generischer Helper (keyFn + stepSize), ersetzt Inline-Logik.
 *   Neu: _anchorByYear() — extrahiert aus _generateDataAnchoredTicks (SRP).
 *   Neu: _collectTimestamps() — DRY-Helper für beide Guards (YEARLY/HY + QUARTERLY/MONTHLY).
 *   _generateDataAnchoredTicks kennt jetzt QUARTER-Mode und MONTH-Mode.
 * 2026-02-26: V8.6.0 - CALENDAR TICKS FOR QUARTERLY/MONTHLY (AP-12).
 *   Revert: QUARTERLY/MONTHLY Data-Anchored Guard entfernt (V8.5 Guard).
 *   Begründung: Gleichmäßige Tick-Struktur > Datenpunkt-Anheftung (User-Entscheidung).
 *   Kalender-Ticks bilden stabiles Referenzraster, Datenlücken sind irrelevant.
 *   Löst: scenario_4_crash.csv Mixed-Rhythm Regression + alle Quarterly/Monthly Lücken-Fälle.
 *   YEARLY/HALF_YEARLY Data-Anchored bleibt unverändert (V8.2/V8.3 Pfad).
 * 2026-02-26: V9.0.1 - AP-15 STABLE.
 *   Keine Code-Änderung. Kalender-Ticks arbeiten jetzt mit Calendar-Snap-Daten
 *   aus LineChartStrategy V16.0.0 (FwDateUtils.getSnapshotSnap).
 *   Daten sind an Monats-/Jahres-Grenzen gesnapped → Ticks und Daten nahe beieinander.
 * 2026-02-27: V10.0.0 - PERIOD CALENDAR TICKS (AP-13).
 *   Fix: PERIOD-Track afterBuildTicks von datengetrieben → cursor-basierte Kalender-Ticks.
 *   Entfernt: Key-Dedup, Nano-Fallback (≤7), Proximity Guard — alle drei obsolet.
 *   Begründung: Stabiles Kalender-Raster unabhängig von Datenpunkt-Verteilung (User-Entscheidung).
 *   Konsistent mit SNAPSHOT-Track (V8.6/V9.0). SNAPSHOT-Code unverändert.
 * 2026-02-27: V10.2.0 - QUARTER-END TICK-MONATE (AP-18).
 *   Fix: Quarterly-Ticks Mär/Jun/Sep/Dez statt Jan/Apr/Jul/Okt (Finanzindustrie-Standard).
 *   Rhythm-Weiche: Quarter-End NUR für rhythm=QUARTERLY/HALF_YEARLY.
 *   MONTHLY/DAILY/WEEKLY nutzen Quarter-Start (unit:'quarter' nur Platzoptimierung).
 *   Cursor-Alignment: Math.floor((m-2)/3)*3+2 (Quarter-End AT OR BEFORE).
 *   Tick-Filter: (m+1)%(3*stepSize)===0 (HY-fähig: stepSize=2 → Jun/Dez).
 *   HALF_YEARLY Tabellen: SNAPSHOT unit:'quarter' stepSize:2, PERIOD stepSize:2.
 *   Lesson Learned: FwDateAdapter.startOf('quarter') darf NICHT geändert werden —
 *   Chart.js-API-Vertrag (Perioden-START). Quarter-End Convention nur in afterBuildTicks.
 * 2026-02-27: V10.3.0 - SNAPSHOT autoSkip OFF (AP-20, Zwischenstand).
 *   Fix: autoSkip: true → false im SNAPSHOT-Return-Block.
 * 2026-02-27: V10.4.0 - RUNTIME ZONE-DETECTION + SNAPSHOT/PERIOD ALIGNMENT (AP-20).
 *   Root Cause: Vier Schichten.
 *   (1) autoSkip: true filterte afterBuildTicks-Ergebnis (behoben in V10.3.0).
 *   (2) fwContext.width nie gesetzt (Object.freeze in BaseChartStrategy) → zone immer 'L'.
 *       Density Matrix wählte immer die feinsten stepSizes (L: stepSize=1 für Monate).
 *       Fix: Runtime Zone-Detection in afterBuildTicks via axis.chart.width.
 *   (3) SNAPSHOT/PERIOD-Asymmetrie: SNAPSHOT hatte includeBounds, major.enabled,
 *       dynamisches align, FwLayoutRules.formatTimeLabel (ctx=null). PERIOD hatte nichts davon.
 *       Fix: SNAPSHOT-Config an PERIOD angeglichen (align:'center', autoSkip:false,
 *       _formatLabel statt formatTimeLabel, keine includeBounds/major).
 *   (4) Chart.js TimeScale.generateTickLabels überschreibt Labels NACH afterBuildTicks.
 *       ticks.callback erhält formatierten String (nicht Timestamp) → new Date() = Invalid.
 *       Fix: afterTickToLabelConversion re-setzt Labels mit _formatLabel(tick.value).
 *       ticks.callback entfernt (redundant und fehlerhaft mit String-Input).
 *   (5) SNAPSHOT_BASE ≤0.5y fehlte: Kurze Serien (≤6 Monate) zeigten nur 2 Ticks
 *       statt jeden Monat (stepSize S:3 griff zu früh). Neue Zeile: stepSize 1, alle Zonen.
 *   (6) Quarter-End-Weiche fehlte im month-Case von _generateLinearTicks:
 *       QUARTERLY/HY bei ≤1.5y Zone S fiel auf unit:'month' stepSize:3 → Jan/Apr/Jul/Okt.
 *       Fix: (m+1) % stepSize === 0 wenn rhythm=QUARTERLY/HY und stepSize % 3 === 0.
 *   Nebeneffekt: format-Feld zu SNAPSHOT-Tabellen hinzugefügt (analog PERIOD).
 *   Beide Tracks nutzen jetzt afterTickToLabelConversion + Runtime Zone-Detection.
 */

import { FwDateUtils } from './FwDateUtils.js';
import { FwLayoutRules } from './FwLayoutRules.js';

// --- DENSITY MATRIX: RAW ZONE TABLES (Spec §3.1–§3.3) ---
// PERIOD (Balken): Zone-abhängige Basistabellen mit format-Feld (1:1 zur Spec).
// Diese Tabellen werden von PERIOD_TABLES.DEFAULT referenziert (siehe unten).
const PERIOD_TABLE_S = [ // Spec §3.1 — Mobile < 450px
  { maxYears: 0.25,      unit: 'week',    stepSize: 1, mode: 'WEEKLY',  format: 'd.M.' },
  { maxYears: 1.0,       unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: 'MMM' },
  { maxYears: 5.0,       unit: 'year',    stepSize: 1, mode: 'YEAR',    format: 'yyyy' },
  { maxYears: Infinity,  unit: 'year',    stepSize: 5, mode: 'YEAR',    format: 'yyyy' }
];
const PERIOD_TABLE_M = [ // Spec §3.2 — Tablet 450–900px
  { maxYears: 0.25,      unit: 'week',    stepSize: 1, mode: 'WEEKLY',  format: 'd. MMM' },
  { maxYears: 1.0,       unit: 'month',   stepSize: 1, mode: 'MONTH',  format: 'MMM' },
  { maxYears: 3.0,       unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: "MMM 'yy" },
  { maxYears: 10.0,      unit: 'year',    stepSize: 1, mode: 'YEAR',    format: 'yyyy' },
  { maxYears: Infinity,  unit: 'year',    stepSize: 5, mode: 'YEAR',    format: 'yyyy' }
];
const PERIOD_TABLE_L = [ // Spec §3.3 — Desktop ≥ 900px
  { maxYears: 0.25,      unit: 'week',    stepSize: 1, mode: 'WEEKLY',  format: 'd. MMM' },
  { maxYears: 1.0,       unit: 'month',   stepSize: 1, mode: 'MONTH',  format: "MMM 'yy" },
  { maxYears: 5.0,       unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: "MMM 'yy" },
  { maxYears: 10.0,      unit: 'year',    stepSize: 1, mode: 'YEAR',    format: 'yyyy' },
  { maxYears: Infinity,  unit: 'year',    stepSize: 5, mode: 'YEAR',    format: 'yyyy' }
];

// --- SNAPSHOT DENSITY TABLES (Table-Driven Strategy Selection, V8) ---
// Floor Principle: Tick-Granularität nie feiner als Daten-Rhythmus.
// Jeder Rhythmus hat eine eigene Tabelle. SNAPSHOT_BASE = gemeinsamer Unterbau (month→quarter→year).
// Polymorphe Werte: stepSize und format können Skalar oder Zone-Map { S, M, L } sein.
// V10.4.0 (AP-20): format-Feld hinzugefügt (analog PERIOD-Tabellen).
// V10.4.0 (AP-20): ≤0.5y-Zeile: Kurze Serien zeigen jeden Monat (alle Zonen).
const SNAPSHOT_BASE = [
  { maxYears: 0.5,      unit: 'month',   stepSize: 1,                     mode: 'MONTH',    format: "MMM 'yy" },
  { maxYears: 1.5,      unit: 'month',   stepSize: { S: 3, M: 1, L: 1 }, mode: 'MONTH',    format: "MMM 'yy" },
  { maxYears: 5.0,      unit: 'quarter', stepSize: 1,                      mode: 'QUARTER',  format: "MMM 'yy" },
  { maxYears: 10.0,     unit: 'year',    stepSize: 1,                      mode: 'YEAR',     format: 'yyyy' },
  { maxYears: Infinity, unit: 'year',    stepSize: 5,                      mode: 'YEAR',     format: 'yyyy' }
];

const SNAPSHOT_TABLES = {
  DEFAULT:    SNAPSHOT_BASE,
  DAILY: [
    { maxYears: 0.04,    unit: 'day',     stepSize: { S: 3, M: 1, L: 1 },   mode: 'DAILY',  format: 'd. MMM' },
    { maxYears: 0.25,    unit: 'day',     stepSize: { S: 14, M: 7, L: 7 },  mode: 'DAILY',  format: 'd. MMM' },
    ...SNAPSHOT_BASE
  ],
  WEEKLY: [
    { maxYears: 0.5,     unit: 'month',   stepSize: 1,                       mode: 'MONTH',  format: "MMM 'yy" },
    ...SNAPSHOT_BASE
  ],
  MONTHLY:    SNAPSHOT_BASE,
  // AP-20: Eigene Tabelle — QUARTERLY darf NIE auf unit:'month' fallen.
  // Ticks IMMER und AUSSCHLIESSLICH Mär/Jun/Sep/Dez (Quarter-End, §3.6).
  QUARTERLY: [
    { maxYears: 5.0,      unit: 'quarter', stepSize: 1,  mode: 'QUARTER', format: "MMM 'yy" },
    { maxYears: 10.0,     unit: 'year',    stepSize: 1,  mode: 'YEAR',    format: 'yyyy' },
    { maxYears: Infinity, unit: 'year',    stepSize: 5,  mode: 'YEAR',    format: 'yyyy' }
  ],
  HALF_YEARLY: [
    // AP-18: unit:'quarter' + stepSize:2 → Filter (m+1)%(3*2)=0 → nur Jun/Dez.
    { maxYears: 5.0,     unit: 'quarter', stepSize: 2,                       mode: 'HALF_YEAR', format: "MMM 'yy" },
    { maxYears: 10.0,    unit: 'year',    stepSize: 1,                       mode: 'YEAR',      format: 'yyyy' },
    { maxYears: Infinity, unit: 'year',   stepSize: 5,                       mode: 'YEAR',      format: 'yyyy' }
  ],
  YEARLY: [
    { maxYears: 10.0,    unit: 'year',    stepSize: 1,                       mode: 'YEAR',   format: 'yyyy' },
    { maxYears: Infinity, unit: 'year',   stepSize: 5,                       mode: 'YEAR',   format: 'yyyy' }
  ]
};

// --- PERIOD DENSITY TABLES (Table-Driven Strategy Selection, V8) ---
// DEFAULT referenziert die Zone-Tabellen oben (S/M/L, mit format-Feld aus Spec §3).
// Rhythm-Overrides sind flache Arrays. Polymorphes format: Skalar oder Zone-Map.
const PERIOD_TABLES = {
  DEFAULT: { S: PERIOD_TABLE_S, M: PERIOD_TABLE_M, L: PERIOD_TABLE_L },
  DAILY: [
    { maxYears: 0.04,    unit: 'day',  stepSize: { S: 3, M: 1, L: 1 }, mode: 'DAILY', format: { S: 'd.M.', M: 'd. MMM', L: 'd. MMM' } },
    { maxYears: 0.25,    unit: 'day',  stepSize: { S: 14, M: 7, L: 7 }, mode: 'DAILY', format: { S: 'd.M.', M: 'd. MMM', L: 'd. MMM' } },
    { maxYears: 0.25,    unit: 'week', stepSize: 1, mode: 'WEEKLY', format: { S: 'd.M.', M: 'd. MMM', L: 'd. MMM' } },
    { maxYears: 1.0,     unit: 'month', stepSize: 1, mode: 'MONTH', format: { S: 'MMM', M: 'MMM', L: "MMM 'yy" } },
    { maxYears: 5.0,     unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: { S: 'MMM', M: "MMM 'yy", L: "MMM 'yy" } },
    { maxYears: 10.0,    unit: 'year', stepSize: 1, mode: 'YEAR', format: 'yyyy' },
    { maxYears: Infinity, unit: 'year', stepSize: 5, mode: 'YEAR', format: 'yyyy' }
  ],
  WEEKLY: [
    { maxYears: 0.25,    unit: 'week', stepSize: 1, mode: 'WEEKLY', format: { S: 'd.M.', M: 'd. MMM', L: 'd. MMM' } },
    { maxYears: 1.0,     unit: 'month', stepSize: 1, mode: 'MONTH', format: { S: 'MMM', M: 'MMM', L: "MMM 'yy" } },
    { maxYears: 5.0,     unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: { S: 'MMM', M: "MMM 'yy", L: "MMM 'yy" } },
    { maxYears: 10.0,    unit: 'year', stepSize: 1, mode: 'YEAR', format: 'yyyy' },
    { maxYears: Infinity, unit: 'year', stepSize: 5, mode: 'YEAR', format: 'yyyy' }
  ],
  YEARLY: [
    { maxYears: 10.0,     unit: 'year', stepSize: 1, mode: 'YEAR', format: 'yyyy' },
    { maxYears: Infinity, unit: 'year', stepSize: 5, mode: 'YEAR', format: 'yyyy' }
  ],
  HALF_YEARLY: [
    // AP-18: stepSize:2 → Filter (m+1)%(3*2)=0 → nur Jun/Dez.
    { maxYears: 5.0,      unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR', format: { S: 'MMM', M: "MMM 'yy", L: "MMM 'yy" } },
    { maxYears: 10.0,     unit: 'year',    stepSize: 1, mode: 'YEAR',      format: 'yyyy' },
    { maxYears: Infinity, unit: 'year',    stepSize: 5, mode: 'YEAR',      format: 'yyyy' }
  ]
};

export class FwSmartXAxis {
    /**
     * Berechnet die X-Achsen-Konfiguration.
     * V5.4.0: UX-Heilung für Balken, SNAPSHOT-Linien bleiben unangetastet.
     */
    static compute(fwContext, fontConfig) {
        const semantics = fwContext.dateSemantics || 'PERIOD'; 
        const isSnapshot = (semantics === 'SNAPSHOT');
        
        const dataMin = fwContext.dataRange.min;
        const dataMax = fwContext.dataRange.max;
        const rhythm = fwContext.rhythm || 'MONTHLY';
        
        // NEW: Exakte Dauer aus dem Rucksack, Fallback auf Berechnung.
        const durationYears = fwContext.durationYears || FwDateUtils.getDiffYears(dataMin, dataMax);
        const width = fwContext.width || 1000;
        const zone = width < 450 ? 'S' : (width < 900 ? 'M' : 'L');
        const matrix = this._getDensityMatrix(durationYears, zone, rhythm, semantics);

        // --- TRACK SNAPSHOT (LINIEN) ---
        // V10.4.0 (AP-20): Komplett-Umbau — PERIOD-aligned Config.
        // Runtime Zone-Detection: Density Matrix wird in afterBuildTicks mit der echten
        // Canvas-Breite neu berechnet. fwContext hat kein width (Object.freeze in
        // BaseChartStrategy), axis.chart.width ist erst zur Render-Zeit verfügbar.
        // Label-Callback: _formatLabel (deterministisch, wie PERIOD) statt formatTimeLabel.
        if (isSnapshot) {
            // Closure-Variable: wird in afterBuildTicks mit Runtime-Zone aktualisiert.
            // Initialwert = Config-Zeit-Matrix (zone L Fallback).
            let runtimeFormat = matrix.format;

            return {
                type: 'time',
                bounds: 'data',
                offset: false,
                afterDataLimits: (axis) => {
                    if (fwContext.displayRange) { // NEW — B1-AP-14b1
                        axis.min = fwContext.displayRange.min; // NEW
                        axis.max = fwContext.displayRange.max; // NEW
                    } else { // NEW
                        const range = axis.max - axis.min;
                        axis.max += range * 0.05; // 5% Breathing Room
                    } // NEW
                },
                afterBuildTicks: (axis) => {
                    // Runtime Zone-Detection: echte Canvas-Breite statt fwContext.width (immer 1000).
                    const runtimeWidth = axis.chart?.width || 1000;
                    const runtimeZone = runtimeWidth < 450 ? 'S' : (runtimeWidth < 900 ? 'M' : 'L');
                    const runtimeMatrix = this._getDensityMatrix(durationYears, runtimeZone, rhythm, semantics);
                    runtimeFormat = runtimeMatrix.format;
                    this._generateLinearTicks(axis, fwContext, runtimeMatrix);
                },
                // V10.4.0: Chart.js generateTickLabels überschreibt Labels nach afterBuildTicks.
                // afterTickToLabelConversion re-setzt unsere Kalender-Labels mit dem korrekten Format.
                afterTickToLabelConversion: (axis) => {
                    axis.ticks.forEach(tick => {
                        tick.label = this._formatLabel(new Date(tick.value), runtimeFormat);
                    });
                },
                time: {
                    unit: matrix.unit,
                    displayFormats: { year: 'yyyy', quarter: "MMM 'yy", month: "MMM 'yy", day: "d. MMM" }
                },
                grid: { display: false, drawBorder: true },
                ticks: {
                    align: 'center', autoSkip: false,
                    font: (ctx) => FwLayoutRules.getResponsiveFont(ctx, fontConfig.family), // CHANGED — AP-prokrast-17-FONT-CODE-A: Token-Font durchgereicht
                    color: fontConfig.color
                },
                adapters: { date: { locale: 'de-DE' } }
            };
        }

        // --- TRACK PERIOD (BALKEN - UX OPTIMIERT) ---
        // V10.4.0 (AP-20): Runtime Zone-Detection (Konsistenz mit SNAPSHOT-Track).
        let periodRuntimeFormat = matrix.format;

        return {
            type: 'time',
            bounds: 'data',
            offset: false,
            afterFit: (axis) => {
                if (axis.width <= 0) return;
                const dataCount = axis.chart.data.datasets[0]?.data?.length || 1;
                if (dataCount <= 1 || dataMax === dataMin) {
                    // Einzelpunkt-Fallback: halbe Periodenlänge als Extension
                    const halfStep = FwDateUtils.getStepDuration(rhythm) / 2;
                    axis.min = dataMin - halfStep;
                    axis.max = dataMax + halfStep;
                } else {
                    // FIX: N-1 Intervalle, nicht N Slots (Chart.js Zeitachsen-Geometrie).
                    const pixelPerInterval = axis.width / (dataCount - 1);
                    const halfBarPixel = (pixelPerInterval * 0.8 * 0.9) / 2;
                    const msPerPixel = (dataMax - dataMin) / axis.width;
                    const rawExtension = halfBarPixel * msPerPixel * 1.5;
                    // V10.0.0 (AP-13): Cap Extension auf halbe Step-Duration.
                    const maxExtension = FwDateUtils.getStepDuration(rhythm) / 2;
                    const extensionMs = Math.min(rawExtension, maxExtension);
                    axis.min = dataMin - extensionMs;
                    axis.max = dataMax + extensionMs;
                }
                axis._userMin = true;
                axis._userMax = true;
            },
            // V10.0.0 (AP-13): Cursor-basierte Kalender-Ticks für PERIOD-Track.
            // V10.4.0 (AP-20): Runtime Zone-Detection — Density Matrix mit echtem axis.chart.width.
            afterBuildTicks: (axis) => {
                const runtimeWidth = axis.chart?.width || 1000;
                const runtimeZone = runtimeWidth < 450 ? 'S' : (runtimeWidth < 900 ? 'M' : 'L');
                const runtimeMatrix = this._getDensityMatrix(durationYears, runtimeZone, rhythm, semantics);
                periodRuntimeFormat = runtimeMatrix.format;

                const ticks = [];
                const cursor = new Date(dataMin);
                cursor.setUTCHours(12, 0, 0, 0);

                // Cursor auf Kalender-Grenze alignen
                if (runtimeMatrix.unit === 'week') {
                    const dow = cursor.getUTCDay();
                    const toMonday = (dow === 0) ? -6 : 1 - dow;
                    cursor.setUTCDate(cursor.getUTCDate() + toMonday);
                } else if (runtimeMatrix.unit !== 'day') {
                    cursor.setUTCDate(1);
                    if (runtimeMatrix.unit === 'quarter') {
                        const useQuarterEnd = (rhythm === 'QUARTERLY' || rhythm === 'HALF_YEARLY');
                        if (useQuarterEnd) {
                            cursor.setUTCMonth(Math.floor((cursor.getUTCMonth() - 2) / 3) * 3 + 2);
                        } else {
                            cursor.setUTCMonth(Math.floor(cursor.getUTCMonth() / 3) * 3);
                        }
                    }
                    if (runtimeMatrix.unit === 'year') {
                        cursor.setUTCMonth(0);
                    }
                }

                const halfStep = FwDateUtils.getStepDuration(rhythm) / 2;
                const endLimit = dataMax + halfStep;
                let safety = 0;

                while (cursor.getTime() <= endLimit && safety < 500) {
                    safety++;
                    const m = cursor.getUTCMonth();
                    const y = cursor.getUTCFullYear();
                    let keep = false;

                    switch (runtimeMatrix.unit) {
                        case 'day':     keep = true; break;
                        case 'week':    keep = true; break;
                        case 'month':   keep = true; break;
                        case 'quarter': {
                            const qEnd = (rhythm === 'QUARTERLY' || rhythm === 'HALF_YEARLY');
                            keep = qEnd
                                ? ((m + 1) % (3 * runtimeMatrix.stepSize) === 0)
                                : (m % (3 * runtimeMatrix.stepSize) === 0);
                            break;
                        }
                        case 'year':    keep = (y % runtimeMatrix.stepSize === 0 && m === 0); break;
                    }

                    if (keep && cursor.getTime() >= dataMin - halfStep) {
                        ticks.push({ value: cursor.getTime() });
                    }

                    if (runtimeMatrix.unit === 'day') {
                        cursor.setUTCDate(cursor.getUTCDate() + (runtimeMatrix.stepSize || 1));
                    } else if (runtimeMatrix.unit === 'week') {
                        cursor.setUTCDate(cursor.getUTCDate() + 7);
                    } else {
                        cursor.setUTCMonth(cursor.getUTCMonth() + 1);
                    }
                }

                axis.ticks = ticks;
            },
            // V10.4.0: Chart.js generateTickLabels überschreibt Labels nach afterBuildTicks.
            // afterTickToLabelConversion re-setzt unsere Kalender-Labels mit dem korrekten Format.
            afterTickToLabelConversion: (axis) => {
                axis.ticks.forEach(tick => {
                    tick.label = this._formatLabel(new Date(tick.value), periodRuntimeFormat);
                });
            },
            time: {
                unit: matrix.unit,
                displayFormats: { year: 'yyyy', quarter: "MMM 'yy", month: "MMM 'yy", week: "d. MMM", day: "d. MMM" }
            },
            grid: { display: false, drawBorder: true },
            ticks: {
                align: 'center', autoSkip: false,
                font: (ctx) => FwLayoutRules.getResponsiveFont(ctx, fontConfig.family), // CHANGED — AP-prokrast-17-FONT-CODE-A: Token-Font durchgereicht
                color: fontConfig.color
            },
            adapters: { date: { locale: 'de-DE' } }
        };
    }

    // --- HELPER FÜR SNAPSHOT TRACK ---
    // V9.0.0 (AP-15): Einheitliche Kalender-Ticks für ALLE SNAPSHOT-Rhythmen.
    // Kein Guard, keine Fallunterscheidung regulär/irregulär.
    // Begründung: Stabiles Referenzraster (Tufte), sub-pixel Offset zu Datenpunkten irrelevant.
    static _generateLinearTicks(axis, context, matrix) {
        const finalTicks = [];
        const cursor = new Date(axis.min);
        cursor.setUTCHours(12, 0, 0, 0);
        if (matrix.unit !== 'day') {
            cursor.setUTCDate(1);
            // AP-18: Quarter-End nur für echte Q/HY-Daten, Quarter-Start für andere.
            if (matrix.unit === 'quarter') {
                const useQuarterEnd = (context.rhythm === 'QUARTERLY' || context.rhythm === 'HALF_YEARLY');
                if (useQuarterEnd) {
                    cursor.setUTCMonth(Math.floor((cursor.getUTCMonth() - 2) / 3) * 3 + 2);
                } else {
                    cursor.setUTCMonth(Math.floor(cursor.getUTCMonth() / 3) * 3);
                }
            }
            if (matrix.unit === 'year') cursor.setUTCMonth(0);
        }
        // V9.0 (AP-15): endLimit = letzter Datenpunkt + halbe Step-Duration.
        // Ohne Snap liegt dataRange.max auf dem echten Datum (z.B. 30. Dez).
        // Halbe Step-Duration stellt sicher, dass der nächste Kalender-Tick (z.B. Jan 1)
        // noch generiert wird, ohne in den Breathing-Room hineinzulaufen.
        const halfStep = FwDateUtils.getStepDuration(context.rhythm) / 2;
        const endLimit = (context.displayRange?.max ?? context.dataRange?.max ?? axis.max) + halfStep; // CHANGED — B1-AP-14b1
        let safety = 0;
        while (cursor.getTime() <= endLimit && safety < 500) {
            safety++;
            const m = cursor.getUTCMonth();
            const y = cursor.getUTCFullYear();
            let keep = false;
            switch (matrix.unit) {
                case 'day':   keep = true; break;
                // AP-20: Quarter-End-Weiche auch bei unit:'month' + stepSize 3
                // (QUARTERLY/HY bei ≤1.5y Zone S fällt auf unit:'month', stepSize:3).
                case 'month': {
                    const qEnd = (context.rhythm === 'QUARTERLY' || context.rhythm === 'HALF_YEARLY')
                                  && (matrix.stepSize % 3 === 0);
                    keep = qEnd
                        ? ((m + 1) % matrix.stepSize === 0)
                        : (m % matrix.stepSize === 0);
                    break;
                }
                // AP-18: Quarter-End für echte Q/HY-Daten, Quarter-Start für andere.
                case 'quarter': {
                    const qEnd = (context.rhythm === 'QUARTERLY' || context.rhythm === 'HALF_YEARLY');
                    keep = qEnd
                        ? ((m + 1) % (3 * matrix.stepSize) === 0)
                        : (m % (3 * matrix.stepSize) === 0);
                    break;
                }
                case 'year':  keep = (y % matrix.stepSize === 0 && m === 0); break;
            }
            if (keep && cursor.getTime() >= axis.min) {
                finalTicks.push({ value: cursor.getTime(), major: (m === 0) });
            }
            if (matrix.unit === 'day') cursor.setUTCDate(cursor.getUTCDate() + matrix.stepSize);
            else cursor.setUTCMonth(cursor.getUTCMonth() + 1);
        }
        if (finalTicks.length > 0) {
            finalTicks[0].major = true;
            finalTicks[finalTicks.length - 1].major = true;
        }
        axis.ticks = finalTicks;
    }

    // NEW V7: Spec-konforme Label-Formatierung (Spec §3 Format-Spalte).
    // Jedes Format entspricht 1:1 einer Zeile in der Density Matrix.
    static _formatLabel(d, format) {
        const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
                        "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
        switch (format) {
            case 'd.M.':     return `${d.getUTCDate()}.${d.getUTCMonth() + 1}.`;
            case 'd. MMM':   return `${d.getUTCDate()}. ${MONTHS[d.getUTCMonth()]}`;
            case 'MMM':      return MONTHS[d.getUTCMonth()];
            case "MMM 'yy":  return `${MONTHS[d.getUTCMonth()]} '${String(d.getUTCFullYear()).slice(-2)}`;
            case 'yyyy':     return d.getUTCFullYear().toString();
            default:         return d.getUTCFullYear().toString();
        }
    }

    // V8: Table-Driven Strategy Selection.
    // Ersetzt 6 if-else Overrides durch deklarative Tabellen-Registry.
    // Neuer Rhythmus = neue Tabelle in SNAPSHOT_TABLES/PERIOD_TABLES, kein Code-Umbau.
    // Polymorphe Werte (stepSize, format): Skalar oder Zone-Map { S, M, L }.
    static _getDensityMatrix(years, zone, rhythm, semantics) {
        const registry = (semantics === 'SNAPSHOT') ? SNAPSHOT_TABLES : PERIOD_TABLES;
        const tableOrMap = registry[rhythm] || registry.DEFAULT;
        const table = Array.isArray(tableOrMap) ? tableOrMap : tableOrMap[zone];
        const row = table.find(r => years <= r.maxYears);

        const stepSize = (typeof row.stepSize === 'object') ? row.stepSize[zone] : row.stepSize;
        const result = { unit: row.unit, stepSize, mode: row.mode };

        if (row.format !== undefined) {
            result.format = (typeof row.format === 'object') ? row.format[zone] : row.format;
        }

        return result;
    }
}