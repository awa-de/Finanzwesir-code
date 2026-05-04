/**
 * @fileoverview Finanzwesir Chart Engine - Y-Axis Specialist (Layer 2)
 * @module core/FwSmartYAxis
 * @version 2.2.0 (UNIVERSAL CLEARANCE)
 * @date 2026-02-16
 *
 * @description
 * Spezialisierter Abteilungsleiter für die Y-Achse.
 * Setzt die "Deterministische Matrix" und die "Magnetische Null" um.
 *
 * V1.0.0 - V1.3.0: Basis-Logik und Font-Delegation.
 * V1.4.0: DYNAMIC AUTO-ZOOM (Initialer Entwurf).
 * V1.5.0: DYNAMIC RESCUE (Fix: Entfernung statischer Sperren).
 * V1.6.0: NEGATIVE RANGE MIRROR.
 * - Fix: Vollständige Unterstützung für negative Werte in Balkendiagrammen.
 * - Fix: Symmetrischer Grace-Buffer (expandiert nach oben UND unten).
 * - Logik: Baseline-Fix für Balken (Balken wachsen immer von der Nulllinie).
 * - Logik: Symmetrische "Magnetische Null" für Liniendiagramme.
 * V1.7.0: PROPORTIONAL GRACE.
 * - Fix: Zone-Erkennung nutzte axis.width (Y-Label-Breite ~60px) statt
 *   axis.chart.width (Canvas-Breite) → immer Zone S → zu grobe Schrittweite.
 * - Fix: Grace-Buffer von additiv (Gesamtspan) auf multiplikativ (pro Seite)
 *   umgestellt. Verhindert Lie-Factor bei asymmetrischen Daten (Tufte).
 * V1.8.0: FINE-SNAP.
 * - Fix: Bei asymmetrischen Daten dominiert der Extremwert die Schrittweite.
 *   Die schwache Seite (z.B. -3,3% bei step=50) wurde durch Math.floor auf
 *   -50 gezerrt (Lie-Factor 15×). Lösung: Wenn |Wert| < step, nutze
 *   niceNum(|Wert|) statt Grid-Snap. Ergebnis: -5 statt -50.
 * V1.9.0: TIGHT FRAME.
 * - Fix: Chart.js buildTicks überschrieb afterDataLimits-Grenzen (Fine-Snap
 *   berechnet -5, buildTicks zerrt auf -50 wenn step=50).
 * - Fix: Bildschirmabhängige Rahmenberechnung (Zone S/M/L beeinflusste Step
 *   → gleiche Daten, verschiedene Achsen-Grenzen auf verschiedenen Screens).
 * - Fix: Nur zwei Snap-Kandidaten (gridSnapGraced zu weit, niceNum zu eng).
 * - Lösung: Drei-Kandidaten-Boundary-Selektion (gridSnapGraced, niceNumRaw,
 *   gridSnapRaw), tightest-wins mit ≥5% Atemraum. afterBuildTicks-Guardian
 *   verhindert Chart.js-Override. FRAME_TICKS=10 entkoppelt Framing von
 *   Bildschirmgröße (Framing ≠ Ticking).
 * V2.0.0: MINIMUM BREATHING ROOM.
 * - Problem 1: Bei asymmetrischen Mixed-Sign-Balkencharts (z.B. -2,9% / +155%)
 *   kann die Minor-Side-Grenze weniger als 1 Step von Null entfernt liegen.
 *   Ergebnis: tickloses Niemandsland (kein Label, keine Gridline).
 * - Lösung 1: Minor-Side Minimum Clearance (bar-only) — in Mixed-Sign-
 *   Balkencharts wird jede Grenze < 1 Step auf ±1 Step expandiert.
 *   Liniendiagramme: Nulldurchgang ist selbsterklärend, Tooltip liefert Wert.
 * - Problem 2: _tightBound war richtungsagnostisch — niceNumRaw rundet
 *   immer weg von Null. Bei positiven floor-Werten (z.B. rawMin=88) wählte
 *   _tightBound niceNum(88)=100, was den Datenpunkt clippt (88 < 100).
 *   Betrifft nur Line Charts mit rein positiven Daten fern von Null.
 * - Lösung 2: Richtungs-Filter — Kandidaten, die den Datenwert clippen
 *   würden (floor-Kandidat > rawValue oder ceil-Kandidat < rawValue),
 *   werden vor der Selektion ausgeschlossen.
 * V2.1.0: ENHANCED MAGNETIC ZERO.
 * - Problem: Die span-relative Magnetische Null (15% vom Span) versagt bei
 *   eng geclusterten Prozentwerten nahe Null. Beispiel: Tagesgeld 3,2-4,0%
 *   → Span=0,8, Schwelle=0,12 → Magnet greift nicht → Y-Achse startet bei
 *   3,2% → sieht optisch aus wie Null (Lie Factor, Tufte).
 * - Lösung: Duale Schwelle für Prozentwerte (valueMode 'percent'/'return'):
 *   magnetThreshold = max(span×15%, 20). Für Renditen ≤ 20% ist Null immer
 *   der kognitive Ankerpunkt (Few, Tufte, Huff). Für Nicht-Prozentwerte
 *   (z.B. Euro) bleibt die span-relative Schwelle unverändert.
 * V2.2.0: UNIVERSAL CLEARANCE.
 * - Problem: Minor-Side Clearance war bar-only. Bei asymmetrischen Line Charts
 *   (z.B. -3,5% / +155%) lag die Nulllinie bei 2,7% der Charthöhe vom
 *   Canvas-Rand — visuell kaum zu unterscheiden vom Rand (Cleveland).
 * - Lösung: Clearance gilt jetzt für ALLE Mixed-Sign-Charts (Bar und Line).
 *   Drei Wörter gelöscht, eine Sonderlocke weniger. Kein neuer Code.
 *
 * @architecture
 * - Konsumiert: fwContext (Rucksack)
 * - Delegiert an: FwFormatUtils (Layer 4) für String-Formatting
 * - Produziert: Chart.js Scale Configuration Object mit dynamischem Rescaling.
 */

import { FwFormatUtils } from './FwFormatUtils.js';
import { FwLayoutRules } from './FwLayoutRules.js';

export class FwSmartYAxis {

    /**
     * Berechnet die Y-Achsen-Konfiguration.
     */
    static compute(fwContext, fontConfig) {
        const zone = this._determineZone(fwContext.width);

        return {
            type: 'linear',
            position: 'left',
            beginAtZero: false, 
            
            // Reagiert auf Sichtbarkeitsänderungen (Legend-Pills)
            afterDataLimits: (axis) => this._performDynamicRescaling(axis, fwContext),

            // Guardian: Stellt berechnete Grenzen nach Chart.js buildTicks wieder her
            afterBuildTicks: (axis) => this._guardBoundaries(axis),

            grid: {
                color: (context) => {
                    // Nulllinie wird visuell hervorgehoben (Wichtig für Negativ-Charts)
                    if (context.tick.value === 0) return fontConfig.zeroLineColor || '#999999';
                    return fontConfig.gridColor || '#E7ECEF';
                },
                // Spec §5.2: Nulllinie bekommt dickeren Strich nur bei Mixed-Sign (Beifang AP-8)
                lineWidth: (context) => {
                    if (context.tick.value === 0) {
                        const scale = context.chart.scales.y;
                        if (scale && scale.min < 0 && scale.max > 0) return 2;
                    }
                    return 1;
                },
                drawBorder: false,
                tickLength: 0
            },

            ticks: {
                maxTicksLimit: zone.maxTicks,
                font: (context) => FwLayoutRules.getResponsiveFont(context),
                color: fontConfig.color,
                padding: 6,
                callback: (value, index, values) => {
                    if (values.length < 2) return value;
                    const step = Math.abs(values[1].value - values[0].value);
                    const decimals = step < 1 ? Math.ceil(-Math.log10(step)) : 0;
                    return this._formatTick(value, { decimals }, zone, fwContext);
                }
            }
        };
    }

    /**
     * Dynamische Skalierung: TIGHT FRAME Algorithmus.
     *
     * Architektur-Prinzip: Framing (min/max) ist datengetrieben und
     * bildschirmunabhängig. Ticking (Schrittweite/Dichte) ist bildschirmgetrieben
     * (via maxTicksLimit in compute()). FRAME_TICKS=10 entkoppelt die beiden Aspekte.
     */
    static _performDynamicRescaling(axis, fwContext) {
        let rawMin = axis.min;
        let rawMax = axis.max;

        // 1. Fallback für leere Charts
        if (rawMin === Infinity || rawMax === -Infinity
            || (rawMin === 0 && rawMax === 0)) {
            axis.min = 0;
            axis.max = 100;
            return;
        }

        // 2. Proportionaler Grace-Buffer (15% pro Seite, multiplikativ)
        let gracedMin = rawMin < 0 ? rawMin * 1.15 : rawMin;
        let gracedMax = rawMax > 0 ? rawMax * 1.15 : rawMax;

        // 3. Baseline-Regeln (Mirror Logic)
        const span = rawMax - rawMin;
        if (fwContext.chartType === 'bar') {
            // Balken müssen an der Nulllinie starten
            if (rawMin > 0) { rawMin = 0; gracedMin = 0; }
            if (rawMax < 0) { rawMax = 0; gracedMax = 0; }
        } else {
            // Liniendiagramme: Magnetische Null (Enhanced V2.1.0)
            // Span-relative Schwelle (funktioniert für breite Spans)
            const spanThreshold = span * 0.15;
            // Absolute Schwelle für Prozentwerte ≤ 20%: Null ist immer der
            // kognitive Ankerpunkt (Few, Tufte). Die span-relative Schwelle
            // versagt bei eng geclusterten Daten nahe Null.
            const PERCENT_MAGNET_CEILING = 20;
            const isPercentLike = ['percent', 'return'].includes(fwContext.valueMode);
            const magnetThreshold = isPercentLike
                ? Math.max(spanThreshold, PERCENT_MAGNET_CEILING)
                : spanThreshold;
            if (rawMin > 0 && rawMin < magnetThreshold) { rawMin = 0; gracedMin = 0; }
            if (rawMax < 0 && Math.abs(rawMax) < magnetThreshold) { rawMax = 0; gracedMax = 0; }
        }

        // 4. Screen-independent Nice Step (feste 10 Ticks für Rahmen)
        const FRAME_TICKS = 10;
        const step = this._calculateNiceStep(gracedMin, gracedMax, FRAME_TICKS).stepSize;

        // 5. Tight Boundary Selection (3 Kandidaten, tightest-wins)
        axis.min = this._tightBound(rawMin, gracedMin, step, 'floor');
        axis.max = this._tightBound(rawMax, gracedMax, step, 'ceil');

        // 5.5 Minor-Side Minimum Clearance (Spec §14, universal V2.2.0)
        // In mixed-sign charts, a boundary < 1 step from zero creates a
        // tick-less gap (no label, no gridline). Expand to 1 step to
        // guarantee one readable grid cell and clear zero-line visibility.
        if (axis.min < 0 && axis.max > 0) {
            if (Math.abs(axis.min) < step) axis.min = -step;
            if (Math.abs(axis.max) < step) axis.max = step;
        }

        // 6. Guardian-Marker (für afterBuildTicks)
        axis._fwMin = axis.min;
        axis._fwMax = axis.max;
    }

    static _determineZone(width) {
        let code = 'L';
        let targetTicks = 8;
        let maxTicks = 10;
        let abbreviateThreshold = 1000000;
        if (!width) return { code, targetTicks, maxTicks, abbreviateThreshold };
        if (width < 450) {
            code = 'S'; targetTicks = 4; maxTicks = 5; abbreviateThreshold = 1000; 
        } else if (width < 900) {
            code = 'M'; targetTicks = 6; maxTicks = 8; abbreviateThreshold = 10000; 
        }
        return { code, targetTicks, maxTicks, abbreviateThreshold };
    }

    static _calculateNiceStep(min, max, targetTicks) {
        const range = this._niceNum(max - min, false);
        const roughStep = range / (targetTicks - 1);
        const stepSize = this._niceNum(roughStep, true);
        return { stepSize };
    }

    static _niceNum(range, round) {
        if (range === 0) return 1;
        const exponent = Math.floor(Math.log10(range));
        const fraction = range / Math.pow(10, exponent);
        let niceFraction;
        if (round) {
            if (fraction < 1.5) niceFraction = 1;
            else if (fraction < 3) niceFraction = 2;
            else if (fraction < 7) niceFraction = 5;
            else niceFraction = 10;
        } else {
            if (fraction <= 1) niceFraction = 1;
            else if (fraction <= 2) niceFraction = 2;
            else if (fraction <= 5) niceFraction = 5;
            else niceFraction = 10;
        }
        return niceFraction * Math.pow(10, exponent);
    }

    /**
     * Drei-Kandidaten-Boundary-Selektion: Wählt die engste Achsengrenze,
     * die noch ≥5% Atemraum zum Datenwert bietet.
     *
     * Kandidaten (von großzügig → eng):
     * 1. gridSnapGraced: Grid-Snap des Grace-Werts (klassisch, immer sicher)
     * 2. niceNumRaw: niceNum-Ceiling der Rohdaten (1-2-5-Raster, psychologisch intuitiv)
     * 3. gridSnapRaw: Grid-Snap der Rohdaten ohne Grace (tightest possible)
     */
    static _tightBound(rawValue, gracedValue, step, direction) {
        if (rawValue === 0) return 0;

        const absRaw = Math.abs(rawValue);

        const gridSnapGraced = direction === 'floor'
            ? Math.floor(gracedValue / step) * step
            : Math.ceil(gracedValue / step) * step;

        const niceNumRaw = rawValue < 0
            ? -this._niceNum(absRaw, false)
            : this._niceNum(absRaw, false);

        const gridSnapRaw = direction === 'floor'
            ? Math.floor(rawValue / step) * step
            : Math.ceil(rawValue / step) * step;

        // Filter: Kandidaten, die den Datenwert clippen würden, ausschließen.
        // floor-Kandidaten müssen ≤ rawValue sein, ceil ≥ rawValue.
        // Ohne diesen Filter wählt niceNumRaw bei positiven floor-Werten
        // einen Wert ÜBER den Daten (z.B. 100 für rawMin=88 → Clipping).
        const candidates = [gridSnapGraced, niceNumRaw, gridSnapRaw]
            .filter(c => direction === 'floor' ? c <= rawValue : c >= rawValue);

        // Sortiere: tightest first (floor: höher=enger, ceil: niedriger=enger)
        candidates.sort((a, b) => direction === 'floor' ? b - a : a - b);

        // Wähle den engsten Kandidaten mit ≥5% Atemraum
        for (const candidate of candidates) {
            const room = Math.abs(candidate - rawValue);
            if (room / absRaw >= 0.05) return candidate;
        }

        // Fallback: großzügigster Kandidat
        return gridSnapGraced;
    }

    /**
     * afterBuildTicks Guardian: Stellt die in afterDataLimits berechneten
     * Grenzen wieder her, nachdem Chart.js buildTicks sie möglicherweise
     * auf Tick-Grenzen gezerrt hat. Filtert Out-of-Range-Ticks.
     */
    static _guardBoundaries(axis) {
        if (axis._fwMin == null || axis._fwMax == null) return;
        axis.min = axis._fwMin;
        axis.max = axis._fwMax;
        axis.ticks = axis.ticks.filter(
            t => t.value >= axis._fwMin && t.value <= axis._fwMax
        );
    }

    static _formatTick(value, stepSettings, zone, fwContext) {
        const absVal = Math.abs(value);
        let formatted = "";
        if (absVal >= zone.abbreviateThreshold && absVal > 0) {
            formatted = FwFormatUtils.formatAbbreviated(value);
        } else {
            formatted = FwFormatUtils.formatSmart(value, fwContext.valueMode, stepSettings.decimals > 0);
        }
        const symbol = FwFormatUtils.getSymbol(fwContext.currency);
        return symbol ? `${formatted} ${symbol}` : formatted;
    }
}