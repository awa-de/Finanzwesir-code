/**
 * @fileoverview Finanzwesir Chart Engine - Data Layer
 * @module data/JSONParser
 * @version 1.0.0
 * @date 2026-07-21
 *
 * @description
 * Schwesterdatei von `CSVParser.js`: gleicher öffentlicher Zuschnitt
 * (`async parse(url, options)`, fetch-freier Export `parseJsonText(text,
 * config)`), gleicher URL-Gate, `fetch(..., { priority: 'high' })`,
 * HTTP- und Fehlerrahmen. Kein Universalparser — kennt keine Stationssemantik
 * oder sonstige App-Fachlogik. `options.validator` ist Pflicht, eine
 * Funktion, und liefert wie `validateStationsJson()` ein Objekt
 * `{ ok: true }` oder `{ ok: false, code?, detail? }`. Der Parser
 * transformiert keine Nutzdaten — er friert nur nach erfolgreicher
 * Validierung rekursiv ein.
 */

import { FinanzwesirJsonData } from './FinanzwesirJsonData.js';

/**
 * Fetch-freier, textbasierter Parser-Kern. Nimmt rohen JSON-Text entgegen,
 * gibt eine versiegelte FinanzwesirJsonData-Instanz zurück. Identisches
 * Prinzip wie parseCsvText() in CSVParser.js — als benannter Modul-Export,
 * damit er sowohl vom Browser (über JSONParser.parse()) als auch von einem
 * Node-Prozess ohne Browser-Globals importiert werden kann.
 */
export function parseJsonText(text, config) {
    if (!text) throw new Error("JSON ist leer.");

    if (!config || typeof config.validator !== 'function') {
        throw new Error("JSONParser: options.validator ist Pflicht und muss eine Funktion sein.");
    }

    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch (err) {
        throw new Error(`JSON ist ungültig: ${err.message}`);
    }

    const validation = config.validator(parsed);
    if (!validation || validation.ok !== true) {
        const code = validation && validation.code ? ` [${validation.code}]` : '';
        const detail = validation && validation.detail ? `: ${validation.detail}` : '';
        throw new Error(`JSON-Validierung fehlgeschlagen${code}${detail}`);
    }

    return new FinanzwesirJsonData(parsed, {
        source: 'JSON',
        parsedAt: new Date().toISOString()
    });
}

export class JSONParser {

    async parse(url, options = {}) {
        const config = Object.assign({}, options);

        // SECURITY: URL-Validierung (Defense-in-Depth) -- identisch zu CSVParser.parse()
        // Produktion: nur https://www.finanzwesir.com
        // Entwicklung: relative Pfade + localhost
        const isAllowedDomain = url.startsWith('https://www.finanzwesir.com/');
        const isRelative = url.startsWith('/') || url.startsWith('./') || url.startsWith('../');
        const isLocalDev = url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1');
        if (!isAllowedDomain && !isRelative && !isLocalDev) {
            throw new Error('GATEKEEPER: URL nicht erlaubt. Nur https://www.finanzwesir.com, relative Pfade und localhost sind zulässig.');
        }

        try {
            // Priority High für Critical Rendering Path Optimierung
            const response = await fetch(url, { priority: 'high' });
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            const text = await response.text();
            return parseJsonText(text, config);
        } catch (err) {
            console.error('[JSONParser]', err);
            throw new Error(`JSON Load Error (${url}): ${err.message}`);
        }
    }
}
