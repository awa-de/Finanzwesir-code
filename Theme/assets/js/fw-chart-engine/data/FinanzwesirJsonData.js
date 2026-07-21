/**
 * @fileoverview Finanzwesir Chart Engine - Data Layer (The JSON Vault)
 * @module data/FinanzwesirJsonData
 * @version 1.0.0
 * @date 2026-07-21
 *
 * @description
 * JSON-Gegenstück zum CSV-Tresor `FinanzwesirData`. Nach erfolgreichem
 * Parsing und erfolgreicher app-spezifischer Validierung sind Nutzdaten
 * und Metadaten rekursiv eingefroren (Deep Freeze) — nicht nur die Wurzel.
 * Keine Mutation, keine Normalisierung, kein Klonen nach dem Validator.
 */

function deepFreeze(value) {
    if (value === null || (typeof value !== 'object' && typeof value !== 'function')) {
        return value;
    }
    if (Object.isFrozen(value)) {
        return value;
    }
    Object.freeze(value);
    for (const key of Object.getOwnPropertyNames(value)) {
        deepFreeze(value[key]);
    }
    return value;
}

export class FinanzwesirJsonData {
    /**
     * Erzeugt einen unveränderlichen JSON-Datentopf.
     * @param {*} data - bereits validierte, geparste JSON-Struktur.
     * @param {Object} metadata - enthält mindestens source und parsedAt.
     */
    constructor(data, metadata = {}) {
        this._data = data;
        this._metadata = Object.assign({
            source: 'JSON',
            parsedAt: new Date().toISOString()
        }, metadata);

        // Rekursive Versiegelung: Wurzel, verschachtelte Objekte und Arrays.
        deepFreeze(this._data);
        deepFreeze(this._metadata);

        // Das Hauptobjekt selbst einfrieren.
        Object.freeze(this);
    }

    /** @returns {*} Die versiegelten Nutzdaten */
    get data() { return this._data; }

    /** @returns {Object} Die versiegelten Metadaten (inkl. source, parsedAt) */
    get metadata() { return this._metadata; }
}
