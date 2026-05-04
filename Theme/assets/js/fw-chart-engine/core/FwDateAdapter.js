/**
 * @fileoverview Finanzwesir Chart Engine - Chart.js Date Adapter
 * @module core/FwDateAdapter
 * @version 1.0.1 (BROWSER IMPORT FIX)
 * @date 2026-01-06
 * @status PRODUCTION
 *
 * @description
 * Implementiert den abstrakten DateAdapter von Chart.js.
 * Ermöglicht die Nutzung von 'type: time' OHNE externe Bibliotheken (wie moment.js oder date-fns).
 * Nutzt native JavaScript Date-Logik und FwDateUtils.
 *
 * Notwendig für: BarChartStrategy (V7.4.0) und FwSmartScales (V11.1.0).
 * FIX V1.0.1: Entfernt den direkten Import von 'chart.js', um "Bare Module Specifier" Fehler
 * in Browsern ohne Bundler zu vermeiden. Greift stattdessen auf window.Chart zu.
 */

import { FwDateUtils } from './FwDateUtils.js';

// FORMAT-DEFINITIONEN
const FORMATS = {
    datetime: 'd. MMM yyyy, HH:mm',
    millisecond: 'HH:mm:ss.SSS',
    second: 'HH:mm:ss',
    minute: 'HH:mm',
    hour: 'HH:mm',
    day: 'd. MMM',
    week: 'd. MMM',
    month: 'MMM yyyy',
    quarter: "'Q'Q - yyyy",
    year: 'yyyy'
};

// ADAPTER IMPLEMENTIERUNG
export const FwDateAdapter = {
    _id: 'fw-date-adapter',

    formats: function() {
        return FORMATS;
    },

    parse: function(value, format) {
        if (value === null || typeof value === 'undefined') {
            return null;
        }
        return FwDateUtils.parseToTimestamp(value);
    },

    format: function(time, format) {
        const date = new Date(time);
        if (format === 'year' || format === 'yyyy') {
            return date.getFullYear().toString();
        }
        if (format === 'month' || format === 'MMM yyyy') {
            return date.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' });
        }
        if (format === 'day' || format === 'd. MMM') {
            return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short' });
        }
        return date.toLocaleDateString('de-DE');
    },

    add: function(time, amount, unit) {
        const date = new Date(time);
        switch (unit) {
            case 'millisecond': return date.setTime(date.getTime() + amount);
            case 'second': return date.setTime(date.getTime() + amount * 1000);
            case 'minute': return date.setTime(date.getTime() + amount * 60000);
            case 'hour': return date.setTime(date.getTime() + amount * 3600000);
            case 'day': return date.setDate(date.getDate() + amount);
            case 'week': return date.setDate(date.getDate() + amount * 7);
            case 'month': return date.setMonth(date.getMonth() + amount);
            case 'quarter': return date.setMonth(date.getMonth() + amount * 3);
            case 'year': return date.setFullYear(date.getFullYear() + amount);
            default: return date.setTime(date.getTime() + amount);
        }
        return date.getTime();
    },

    diff: function(max, min, unit) {
        const diff = max - min;
        switch (unit) {
            case 'millisecond': return diff;
            case 'second': return diff / 1000;
            case 'minute': return diff / 60000;
            case 'hour': return diff / 3600000;
            case 'day': return diff / 86400000;
            case 'week': return diff / 604800000;
            case 'month': return (new Date(max).getMonth() - new Date(min).getMonth()) + (12 * (new Date(max).getFullYear() - new Date(min).getFullYear()));
            case 'quarter': return this.diff(max, min, 'month') / 3;
            case 'year': return new Date(max).getFullYear() - new Date(min).getFullYear();
            default: return diff;
        }
    },

    startOf: function(time, unit, weekday) {
        const date = new Date(time);
        switch (unit) {
            case 'second': date.setMilliseconds(0); break;
            case 'minute': date.setSeconds(0, 0); break;
            case 'hour': date.setMinutes(0, 0, 0); break;
            case 'day': date.setHours(0, 0, 0, 0); break;
            case 'week': 
                const day = date.getDay();
                const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Montagstart
                date.setDate(diff);
                date.setHours(0, 0, 0, 0);
                break;
            case 'month': date.setDate(1); date.setHours(0, 0, 0, 0); break;
            case 'quarter':
                // startOf MUSS Perioden-START liefern (Chart.js-API-Vertrag).
                // Quarter-End Convention lebt in afterBuildTicks, nicht hier.
                const q = Math.floor(date.getMonth() / 3);
                date.setMonth(q * 3);
                date.setDate(1); 
                date.setHours(0, 0, 0, 0);
                break;
            case 'year': date.setMonth(0, 1); date.setHours(0, 0, 0, 0); break;
        }
        return date.getTime();
    },

    endOf: function(time, unit) {
        const date = new Date(time);
        this.add(date, 1, unit);
        this.startOf(date, unit);
        date.setTime(date.getTime() - 1);
        return date.getTime();
    }
};

// REGISTRIERUNG: GLOBAL SCOPE CHECK
// Wir prüfen, ob Chart global verfügbar ist (üblich ohne Bundler).
if (typeof window !== 'undefined' && window.Chart && window.Chart._adapters && window.Chart._adapters._date) {
    window.Chart._adapters._date.override(FwDateAdapter);
    // console.log("✅ FwDateAdapter: Erfolgreich registriert via window.Chart");
} else {
    console.error("❌ FwDateAdapter Error: 'Chart' ist nicht global verfügbar.");
    console.warn("LÖSUNG: Stellen Sie sicher, dass Chart.js vor dieser Datei geladen wird, ODER ändern Sie diese Datei, um Chart.js über den korrekten relativen Pfad zu importieren.");
}