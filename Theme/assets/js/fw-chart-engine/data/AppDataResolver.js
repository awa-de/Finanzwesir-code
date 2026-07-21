/**
 * @fileoverview Finanzwesir Chart Engine - Data Layer
 * @module data/AppDataResolver
 * @version 1.0.0
 * @date 2026-07-21
 *
 * @description
 * Zentraler, typisierter Resolver für den app-data-Auslieferungsweg
 * (`/content/files/app-data/`). Bildet ausschließlich einen Präfixpfad aus
 * einem bereits vollständigen, kanonischen Dateinamen — analog zum
 * bestehenden `data-app-file`-Resolver in `ChartEngine.js`
 * (`'/content/files/app-data/' + appFile`). Kein Suffix wird angehängt,
 * keine Domain, keine Konfiguration, keine Erweiterung auf beliebige
 * Dateitypen. Wirft vor jeder Netzwerkanfrage bei ungültigem Eingabewert.
 */

const APP_DATA_PREFIX = '/content/files/app-data/';
const CSV_FILENAME_PATTERN = /^[a-z0-9_-]+\.csv$/;
const JSON_FILENAME_PATTERN = /^[a-z0-9_-]+\.json$/;

/**
 * Löst einen vollständigen, kanonischen CSV-Dateinamen zum app-data-Pfad auf.
 * @param {string} filename - vollständiger Dateiname einschließlich `.csv`
 * @returns {string} `/content/files/app-data/<filename>`
 */
export function resolveCsvAppDataFile(filename) {
    if (typeof filename !== 'string' || !CSV_FILENAME_PATTERN.test(filename)) {
        throw new Error("AppDataResolver: ungültiger CSV-Dateiname '" + filename + "'.");
    }
    return APP_DATA_PREFIX + filename;
}

/**
 * Löst einen vollständigen, kanonischen JSON-Dateinamen zum app-data-Pfad auf.
 * @param {string} filename - vollständiger Dateiname einschließlich `.json`
 * @returns {string} `/content/files/app-data/<filename>`
 */
export function resolveJsonAppDataFile(filename) {
    if (typeof filename !== 'string' || !JSON_FILENAME_PATTERN.test(filename)) {
        throw new Error("AppDataResolver: ungültiger JSON-Dateiname '" + filename + "'.");
    }
    return APP_DATA_PREFIX + filename;
}
