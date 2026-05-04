/**
 * @fileoverview Finanzwesir Chart Engine - Shared Date Logic
 * @module core/FwDateUtils
 * @version 5.4.0 (DEAD CODE REMOVAL — AP-13)
 * * LOG-BUCH:
 * 2025-10-12: V4.0.0 - Mathematische Absicherung der Zeitstempel.
 * 2025-11-20: V4.1.0 - Optimierung der Rhythm-Detection für unregelmäßige Daten.
 * 2026-01-05: V4.2.0 - BOP-Anchor Fix für Quarterly-Intervalle.
 * 2026-01-20: V4.4.0 - Implementierung Deterministic Matrix v1.3.1.
 * - Einführung Zone-Awareness (S, M, L).
 * - Implementierung Weekly-Range Mathematik (Start + 6d).
 * - Strenge Einhaltung der No-Q-Policy.
 * 2026-01-26: V4.5.0 - Implementierung Context-Aware Rhythm Detection (CARD).
 * 2026-02-20: V4.6.0 - Snap-Target für irreguläre SNAPSHOT-Daten (Delegation Pattern).
 * 2026-02-23: V4.7.0 - isRegularDayPattern() für AP-10 Data-Anchored Ticks (QUARTERLY/MONTHLY).
 * - Einführung der Weiche zwischen SNAPSHOT (Bucket-Logik) und PERIOD (Average-Logik).
 * - Restaurierung der statistischen Robustheit für Liniendiagramme mit Datenlücken.
 * - Beibehaltung der geometrischen Stabilität für Balkendiagramme.
 * 2026-02-26: V4.9.0 - QUARTERLY→Monats-Snap in getSnapTarget (AP-14 Universal Snap).
 * 2026-02-26: V5.2.0 - Zero Snap (AP-15 Iteration 3).
 *   - getSnapTarget endgültig gelöscht — Daten an echten Positionen, Ticks an Kalender.
 *   - isRegularSeries, isRegularDayPattern endgültig gelöscht (Iteration 1).
 * 2026-02-26: V5.3.0 - SNAPSHOT CALENDAR SNAP (AP-15 Neudesign).
 *   - Neu: getSnapshotSnap() — Kalender-Snap für visuelle Ausrichtung.
 *   - YEARLY → Jan 1, HY/Q/M → 1. des Monats, WEEKLY/DAILY → Identität.
 *   - Entkoppelt von Tooltip: LineChartStrategy speichert _originalDate für echtes Datum.
 * 2026-02-27: V5.4.0 - DEAD CODE REMOVAL (AP-13).
 *   - isRegularInterval() entfernt (0 Aufrufer, war V4.8.0-Reserve für PERIOD-Guard).
 *   - Durch Kalender-Ticks-Ansatz in FwSmartXAxis V10.0.0 obsolet.
 */
export class FwDateUtils {
    /**
     * Kern-Parser für alle Datums-Eingaben der Engine.
     * Garantiert konsistente 12:00:00 UTC Zeitstempel zur Vermeidung von DST-Problemen.
     */
    static parse(input) {
        if (!input) return new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
        let d = (input instanceof Date) ? input : new Date(input);
        if (isNaN(d.getTime()) && typeof input === 'string') {
            const parts = input.split(/[-.]/);
            if (parts.length === 3) {
                let y, m, day;
                if (parts[0].length === 4) { [y, m, day] = parts; } 
                else { [day, m, y] = parts; }
                d = new Date(Date.UTC(parseInt(y), parseInt(m) - 1, parseInt(day), 12, 0, 0));
            }
        }
        if (isNaN(d.getTime())) return new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
        return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12, 0, 0));
    }

    /**
     * Berechnet den "Beginning of Period" Anker für die X-Achse.
     */
    static getBopAnchor(input, rhythm) {
        const d = this.parse(input);
        const y = d.getUTCFullYear();
        const m = d.getUTCMonth();
        if (rhythm === 'YEARLY') return Date.UTC(y, 0, 1, 12, 0, 0);
        // AP-18: Quarter-End convention (Mär/Jun/Sep/Dez). Dead Code (No-Q-Policy), aber konsistent.
        if (rhythm === 'QUARTERLY') return Date.UTC(y, Math.floor(m / 3) * 3 + 2, 1, 12, 0, 0);
        if (rhythm === 'HALF_YEARLY') return Date.UTC(y, m, 1, 12, 0, 0);
        if (rhythm === 'MONTHLY') return Date.UTC(y, m, 1, 12, 0, 0);
        return d.getTime();
    }

    static getStepDuration(rhythm) {
        const day = 86400000;
        switch (rhythm) {
            case 'YEARLY':      return day * 365.25;
            case 'HALF_YEARLY': return day * 182.625;
            case 'QUARTERLY':   return day * 91.3;
            case 'MONTHLY':     return day * 30.44;
            case 'WEEKLY':      return day * 7;
            case 'DAILY':       return day;
            default:            return day;
        }
    }

    /**
     * V5.3.0 (AP-15): SNAPSHOT Calendar Snap.
     * Rundet Zeitstempel auf Kalender-Grenzen für visuelle Tick-Ausrichtung.
     * Tooltip liest _originalDate (gespeichert in LineChartStrategy), nicht den Snap-Wert.
     *
     * YEARLY      → 1. Januar des Jahres (auf Jahres-Tick)
     * HY/Q/M      → 1. des Monats (max 30 Tage Offset zum nächsten Tick)
     * WEEKLY/DAILY → Identität (Daten SIND das Grid)
     */
    static getSnapshotSnap(ts, rhythm) {
        if (rhythm === 'DAILY' || rhythm === 'WEEKLY') return ts;
        const d = new Date(ts);
        const y = d.getUTCFullYear();
        const m = d.getUTCMonth();
        if (rhythm === 'YEARLY') return Date.UTC(y, 0, 1, 12, 0, 0);
        return Date.UTC(y, m, 1, 12, 0, 0);
    }

    static getPeriodMidpoint(ts, rhythm) {
        return ts + (this.getStepDuration(rhythm) / 2);
    }

    static getDiffYears(ts1, ts2) { return Math.abs(ts2 - ts1) / 31557600000; }

    // NEW: Exakte Dauer für feste Ranges, berechnet nur bei 'max'.
    static rangeToYears(rangeCode, fallbackMin, fallbackMax) {
        if (!rangeCode || rangeCode === 'max') {
            return this.getDiffYears(fallbackMin, fallbackMax);
        }
        const match = rangeCode.match(/^(\d+)([ym])$/i);
        if (match) {
            const val = parseInt(match[1], 10);
            return match[2].toLowerCase() === 'y' ? val : val / 12;
        }
        return this.getDiffYears(fallbackMin, fallbackMax);
    }

    /**
     * V4.5.0: Context-Aware Rhythm Detection.
     * SNAPSHOT (Linie) nutzt statistische Buckets (tolerant gegen Lücken).
     * PERIOD (Balken) nutzt arithmetischen Durchschnitt (stabilisiert das Grid).
     */
    static detectRhythm(timestamps, semantics) {
        if (!timestamps || timestamps.length < 2) return 'YEARLY';

        // Contract Enforcement
        if (!semantics) {
            console.warn("[FwDateUtils] ARCHITECTURE BREACH: dateSemantics missing. Falling back to PERIOD.");
            semantics = 'PERIOD';
        }

        const sorted = [...timestamps].sort((a, b) => a - b);
        const diffs = sorted.slice(1).map((v, i) => (v - sorted[i]) / 86400000);

        if (semantics === 'SNAPSHOT') {
            const buckets = { DAILY: 0, WEEKLY: 0, MONTHLY: 0, QUARTERLY: 0, HALF_YEARLY: 0, YEARLY: 0 };
            for (const d of diffs) {
                if (d < 5) buckets.DAILY++;
                else if (d >= 5 && d < 12) buckets.WEEKLY++;
                else if (d >= 25 && d < 35) buckets.MONTHLY++;
                else if (d >= 80 && d < 140) buckets.QUARTERLY++;
                else if (d >= 140 && d < 300) buckets.HALF_YEARLY++;
                else if (d >= 300) buckets.YEARLY++;
            }
            let max = 0;
            let winner = 'DAILY';
            for (const key in buckets) {
                if (buckets[key] > max) {
                    max = buckets[key];
                    winner = key;
                }
            }
            return winner;
        }

        // Standard-Pfad für Balken (Average)
        const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
        if (avg > 300) return 'YEARLY';
        if (avg > 140) return 'HALF_YEARLY';
        if (avg > 70) return 'QUARTERLY';
        if (avg > 20) return 'MONTHLY';
        if (avg > 5) return 'WEEKLY';
        return 'DAILY';
    }

    // V5.4.0 (AP-13): isRegularInterval() entfernt — Dead Code (0 Aufrufer).
    // War V4.8.0-Reserve für AP-13 PERIOD-Guard. Durch Kalender-Ticks obsolet.

    /**
     * V4.4.0: Deterministic Tooltip Formatter (The Law).
     */
    static formatTooltipDate(ts, rhythm, zone = 'L') {
        const d = new Date(ts);
        const isTouch = (zone === 'S' || zone === 'M');

        switch (rhythm) {
            case 'DAILY':
                if (isTouch) {
                    const mShort = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"][d.getUTCMonth()];
                    return `${this._pad(d.getUTCDate())}. ${mShort} '${d.getUTCFullYear().toString().slice(-2)}`;
                }
                return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });

            case 'WEEKLY':
                const end = new Date(ts + (6 * 86400000));
                if (isTouch) {
                    return `${this._pad(d.getUTCDate())}.${this._pad(d.getUTCMonth()+1)}.–${this._pad(end.getUTCDate())}.${this._pad(end.getUTCMonth()+1)}.`;
                }
                const monthYear = end.toLocaleDateString('de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' });
                return `Woche vom ${d.getUTCDate()}. – ${end.getUTCDate()}. ${monthYear}`;

            case 'HALF_YEARLY':
            case 'MONTHLY':
            case 'QUARTERLY':
                return isTouch 
                    ? this.formatMonthYearShort(ts) 
                    : d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' });

            case 'YEARLY':
                return d.getUTCFullYear().toString();

            default:
                return "";
        }
    }

    static formatMonthYearShort(ts) {
        const d = new Date(ts);
        const m = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"][d.getUTCMonth()];
        return `${m} '${d.getUTCFullYear().toString().slice(-2)}`;
    }

    static _pad(num) {
        return num.toString().padStart(2, '0');
    }

    // V5.5.0: dateSemantics-Weiche für Range-Filter
    // SNAPSHOT (Line): inklusiv (>=) — Start+Ende für Liniensegment nötig
    // PERIOD  (Bar):  exklusiv (>)  — "NJ" zeigt exakt N Periodenbalken
    static filterRows(rows, rangeCode, dateSemantics = 'SNAPSHOT') {
        if (!rows || rows.length === 0 || rangeCode === 'max') return rows;
        const lastTS = this.parse(rows[rows.length - 1].Date || rows[rows.length - 1].Datum).getTime();
        let cutoff = new Date(lastTS);
        const match = rangeCode.match(/^(\d+)([ym])$/i);
        if (match) {
            const val = parseInt(match[1], 10);
            if (match[2].toLowerCase() === 'y') cutoff.setUTCFullYear(cutoff.getUTCFullYear() - val);
            else cutoff.setUTCMonth(cutoff.getUTCMonth() - val);
        }
        const cutoffTS = cutoff.getTime();
        return rows.filter(r => {
            const ts = this.parse(r.Date || r.Datum).getTime();
            return dateSemantics === 'PERIOD' ? ts > cutoffTS : ts >= cutoffTS;
        });
    }
}