/**
 * @fileoverview Finanzwesir Chart Engine - Responsive Layout Rules (Layer 3)
 * @module core/FwLayoutRules
 * @version 3.17.0 (HARD FAIL SAFETY)
 * @description
 * Zentrales Regelwerk für responsives Verhalten.
 * V3.17.0: HARD FAIL SAFETY (LLM-Bug Protection).
 * - Implementierung: Abbruch mit Error, wenn strategyMode im Callback fehlt.
 * - Ziel: Verhindert unleserliche Achsen (z.B. "Januar 2024" Repetition) durch fehlerhafte Parameter-Übergabe.
 * - Striktheit: Erzwingt die Einhaltung des Architektur-Vertrags zwischen Layer 3 und 4.
 */

import { FwDateUtils } from './FwDateUtils.js';
import { FwFormatUtils } from './FwFormatUtils.js';
import { FwTheme } from './FwTheme.js';

// KDR-14: Font-Token aus FwTheme. init() wird hier NICHT aufgerufen —
// FwLayoutRules nutzt nur fonts.body (statisch im Constructor definiert).
// Falls init() künftig Fonts überschreibt, muss diese Stelle angepasst werden.
const _theme = new FwTheme();

export class FwLayoutRules {

    static _getCSSWidth(ctx) {
        const chart = ctx?.chart || ctx; 
        if (chart?.canvas) return chart.canvas.clientWidth;
        return chart?.width || 1000; 
    }

    static getResponsiveFont(ctx) {
        const width = this._getCSSWidth(ctx);
        const family = _theme.fonts.body;
        if (width < 450) return { size: 11, family };
        return { size: 12, family };
    }

    /**
     * V3.16.0: Formatiert das Datum für den Tooltip-Header.
     */
    static formatTooltipDate(timestamp, context) {
        if (!timestamp) return '';
        
        const rhythm = context ? context.rhythm : 'DAILY'; 
        const isMobile = context ? context.isMobile : false;
        
        const d = new Date(timestamp);

        // 1. JAHRES-LOGIK
        if (rhythm === 'YEARLY' || rhythm === '5_YEAR') {
            return d.getUTCFullYear().toString();
        }

        // 2. MONATS-LOGIK
        if (rhythm === 'MONTHLY' || rhythm === 'QUARTERLY' || rhythm === 'HALF_YEARLY') {
            const monthLong = d.toLocaleDateString('de-DE', { month: 'long', timeZone: 'UTC' });
            const monthShort = d.toLocaleDateString('de-DE', { month: 'short', timeZone: 'UTC' }).replace('.', '');
            const year = d.getUTCFullYear();
            const yearShort = year.toString().substr(2);

            if (isMobile) {
                return `${monthShort} '${yearShort}`; 
            } else {
                return `${monthLong} ${year}`; 
            }
        }

        // 3. WOCHEN-LOGIK
        if (rhythm === 'WEEKLY') {
             const day = d.getUTCDate();
             const monthShort = d.toLocaleDateString('de-DE', { month: 'short', timeZone: 'UTC' }).replace('.', '');
             const year = d.getUTCFullYear();
             
             if (isMobile) {
                 return `Mo, ${day}. ${monthShort}`;
             } else {
                 return `Woche vom ${day}. ${monthShort} ${year}`;
             }
        }

        // 4. TAGES-LOGIK
        const weekdayShort = d.toLocaleDateString('de-DE', { weekday: 'short', timeZone: 'UTC' }).replace('.', '');
        const day = d.getUTCDate();
        const monthShort = d.toLocaleDateString('de-DE', { month: 'short', timeZone: 'UTC' }).replace('.', '');
        const year = d.getUTCFullYear();
        const yearShort = year.toString().substr(2);
        
        if (isMobile) {
            return `${weekdayShort}, ${day}. ${monthShort} '${yearShort}`;
        } else {
            return `${weekdayShort}, ${day}. ${monthShort} ${year}`;
        }
    }

    /**
     * Formatiert die Labels der X-Achse.
     * V3.17.0: Erzwingt strategyMode (Anti-LLM-Bug Sicherung).
     */
    static formatTimeLabel(ctx, val, context) {
        // CONTRACT CHECK: Wir verweigern den Dienst, wenn der Befehl unvollständig ist.
        if (!context || !context.strategyMode) {
            throw new Error(`[FwLayoutRules] CRITICAL CONTRACT BREACH: 'strategyMode' is missing. 
            The Schildermaler refuses to work without a clear strategy. 
            Ensure FwSmartXAxis passes 'strategyMode' in its callback.`);
        }

        const { strategyMode, tickCount, width, isMobile } = context;
        
        let rawDateValue;
        if (typeof val === 'number' && val > 100000000000) { 
            rawDateValue = val;
        } else {
            rawDateValue = ctx ? ctx.getLabelForValue(val) : val;
        }

        const d = new Date(rawDateValue);
        const m = d.getUTCMonth();

        // 1. Singularität (N=1)
        if (tickCount === 1 && m === 11) {
             return d.getUTCFullYear().toString();
        }

        // 2. Strategie-Spezifische Formate
        if (strategyMode === 'WEEKLY') {
            const day = d.getUTCDate();
            const weekday = d.toLocaleDateString('de-DE', { weekday: 'short', timeZone: 'UTC' }).replace('.', ''); 
            if (width < 450) { 
                return `${weekday}, ${day}.${m + 1}.`;
            } else {
                const monthShort = d.toLocaleDateString('de-DE', { month: 'short', timeZone: 'UTC' }).replace('.', '');
                return `${weekday}, ${day}. ${monthShort}`;
            }
        }

        // Hier landet dein 12-Tage-Chart (DAILY)
        if (strategyMode === 'MONTH_START' || strategyMode === 'BI_WEEKLY' || 
            strategyMode === 'MICRO' || strategyMode === 'DAILY') {
            const day = d.getUTCDate();
            const monthShort = d.toLocaleDateString('de-DE', { month: 'short', timeZone: 'UTC' }).replace('.', '');
            return `${day}. ${monthShort}`;
        }

        if (strategyMode === 'YEAR' || strategyMode === '5_YEAR') {
            return d.getUTCFullYear().toString(); 
        }

        if (strategyMode === 'HALF_YEAR' || strategyMode === 'QUARTER' || strategyMode === 'MONTH') {
            if (strategyMode === 'MONTH' || isMobile || width < 900) {
                 return FwDateUtils.formatMonthYearShort(rawDateValue);
            }
            return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' });
        }

        // Wenn strategyMode vorhanden ist, aber kein Case gegriffen hat (sollte nicht passieren)
        return d.toLocaleDateString('de-DE', { month: 'short', year: 'numeric', timeZone: 'UTC' });
    }

    static formatValueLabel(ctx, val, mode, currencyIso) {
        const width = this._getCSSWidth(ctx);
        const symbol = FwFormatUtils.getSymbol(currencyIso);
        let suffix = symbol;
        const isPercent = (mode === 'percent' || mode === 'return');
        if (isPercent) suffix = ' %';
        else if (suffix) suffix = ' ' + suffix;

        if (width < 900) {
            if (!isPercent) return FwFormatUtils.formatAbbreviated(val) + suffix;
        }
        return FwFormatUtils.formatSmart(val, mode) + suffix;
    }
}