/**
 * @fileoverview Finanzwesir Chart Engine - Data Layer
 * @module data/CSVParser
 * @version 4.5.0 (SHARED CORE)
 * @date 2026-07-20
 *
 * @description
 * Liest CSV-Dateien und konvertiert sie in den FinanzwesirData Tresor.
 * V4.1.0: Wandelt Datums-Strings rücksichtslos in Date-Objekte um,
 * damit der Tresor echte Objekte für die Strategien bereithält.
 * V4.2.0: Verbesserte Unit-Detection. Scannt nicht nur die erste Zeile,
 * sondern sucht so lange nach Einheiten (%, €, $), bis eine gefunden wird.
 * Behält Kompatibilität zu 'unitKey' Contract.
 * V4.3.0: NETWORK PRIORITY UPGRADE.
 * - Implementiert { priority: 'high' } im Fetch-Call.
 * - Signalisiert dem Browser, dass diese Daten critical-blocking sind.
 * V4.4.0: THE NOON ANCHOR (Timezone Safety).
 * - Ersetzt 'T00:00:00Z' (UTC Midnight) durch konstruiertes Local Noon (12:00).
 * - Verhindert "Fencepost Errors" durch Zeitzonenversatz (z.B. UTC-5).
 * - Erhöht die Stabilität der Tageszuordnung weltweit.
 * V4.5.0: SHARED CORE (APP-DATA-02).
 * - Löst die reine Text-Prüf-/Normalisierungslogik als fetch-freien,
 *   benannten Export parseCsvText() heraus, damit der lokale Upload-Dienst
 *   (Node, kein Browser) denselben Parser-Kern nutzt statt einer Kopie.
 * - Keine Verhaltensänderung: parse() ruft intern weiterhin exakt dieselbe
 *   Logik auf, nur über den neuen Export statt eine private Methode.
 */

import { FinanzwesirData } from './FinanzwesirData.js';

// Mapping: Symbol im Text -> Interner Code für Strategien.
// Modul-Konstante statt Instanzfeld, damit parseCsvText() ohne
// CSVParser-Instanz aufrufbar ist (Voraussetzung für den fetch-freien Kern).
const ALLOW_LIST = {
    '€':    'CURRENCY_EUR',
    '$':    'CURRENCY_USD',
    '£':    'CURRENCY_GBP',
    '¥':    'CURRENCY_JPY',
    'CHF':  'CURRENCY_CHF',
    '%':    'UNIT_PERCENT',
    'pts':  'UNIT_POINTS',
    'Stk.': 'UNIT_PIECES',
    'EUR':  'CURRENCY_EUR',
    'USD':  'CURRENCY_USD',
    'GBP':  'CURRENCY_GBP',
    'JPY':  'CURRENCY_JPY'
};

function detectSuffix(str) {
    for (const s of Object.keys(ALLOW_LIST)) {
        if (str.includes(s)) return s;
    }
    return null;
}

/**
 * Fetch-freier, textbasierter Parser-Kern. Nimmt rohen CSV-Text entgegen,
 * gibt eine versiegelte FinanzwesirData-Instanz zurück. Identische Logik wie
 * zuvor CSVParser._parseText(), jetzt als benannter Modul-Export, damit sie
 * sowohl vom Browser (über CSVParser.parse()) als auch von einem Node-Prozess
 * ohne Browser-Globals importiert werden kann.
 */
export function parseCsvText(text, config) {
    if (!text) throw new Error("CSV ist leer.");
    const lines = text.replace(/\r\n/g, '\n').split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) throw new Error("CSV muss Header und Daten enthalten.");

    let headers = lines[0].split(config.delimiter).map(h => h.trim());
    while (headers.length > 0 && headers[headers.length - 1] === '') {
        headers.pop();
    }

    const rows = [];
    let unitKey = 'UNIT_NONE';
    let detectionDone = false; // NEU: Status-Flag statt Zeilen-Check

    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(config.delimiter);
        if (parts.length <= 1 && parts[0].trim() === '') continue;

        const rowObj = {};
        const rawCol0 = parts[0] ? parts[0].trim() : '';

        // --- SPALTE 0: GATEKEEPER & CONVERTER ---
        if (config.expectDate) {
            if (rawCol0.match(/^\d{4}-\d{2}-\d{2}$/)) {
                // NOON-FIX V4.4.0: Konstruktives Parsing auf 12:00 Uhr
                // Verhindert das "Abrutschen" in den Vortag bei westlichen Zeitzonen.
                const [y, m, d] = rawCol0.split('-').map(Number);
                // Monat im Konstruktor ist 0-basiert (Jan=0), daher m - 1
                const dateObj = new Date(y, m - 1, d, 12, 0, 0);

                rowObj[headers[0]] = dateObj;
                rowObj['Date'] = dateObj;
                rowObj['Datum'] = dateObj;
            } else {
                throw new Error(`GATEKEEPER: Ungültiges Datum '${rawCol0}' (Zeile ${i+1}). Erwarte YYYY-MM-DD.`);
            }
        } else {
            rowObj[headers[0]] = rawCol0;
        }

        // --- SPALTEN 1..n: WERTE ---
        for (let j = 1; j < headers.length; j++) {
            if (j >= parts.length) break;

            let valStr = parts[j].trim();
            let val = null;

            if (valStr !== '') {
                // DETECTION UPGRADE V4.2.0
                // Wir prüfen so lange, bis wir eine Einheit finden.
                // Nicht nur in Zeile 1, sondern fortlaufend bis zum ersten Treffer.
                if (!detectionDone) {
                    const detected = detectSuffix(valStr);
                    if (detected) {
                        unitKey = ALLOW_LIST[detected] || 'UNIT_UNKNOWN';
                        detectionDone = true; // Suche beendet, Einheit festgelegt
                    }
                }

                // Sanitization Pipeline (Bleibt identisch sicher)
                // Erst NACH der Detection wird gereinigt.
                valStr = valStr.replace(/[^\d,.-]/g, '').trim();
                valStr = valStr.replace(/\./g, '');
                valStr = valStr.replace(',', '.');
                val = parseFloat(valStr);
                if (isNaN(val)) val = null;
            }
            rowObj[headers[j]] = val;
        }
        rows.push(rowObj);
    }

    return new FinanzwesirData(headers, rows, {
        unitKey: unitKey, // WICHTIG: Bleibt beim alten Namen für Kompatibilität
        source: 'CSV',
        parsedAt: new Date().toISOString()
    });
}

export class CSVParser {

    async parse(url, options = {}) {
        const defaults = { expectDate: true, delimiter: ';' };
        const config = Object.assign({}, defaults, options);

        // SECURITY: URL-Validierung (Defense-in-Depth)
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
            return parseCsvText(text, config);
        } catch (err) {
            console.error('[CSVParser]', err);
            throw new Error(`CSV Load Error (${url}): ${err.message}`);
        }
    }
}