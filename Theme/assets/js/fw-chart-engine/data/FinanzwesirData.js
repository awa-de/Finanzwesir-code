/**
 * @fileoverview Finanzwesir Chart Engine - Data Layer (The Vault)
 * @module data/FinanzwesirData
 * @version 1.1.0 (Strict Immutable & Meta Validation)
 * @date 2026-01-07
 *
 * @description
 * Der Sicherheitstresor der Engine. Single Source of Truth (SSOT).
 * Nach der Initialisierung im Konstruktor ist das Objekt vollständig 
 * schreibgeschützt (Deep Freeze).
 * * @history
 * V1.0.0: Initiales Release. Implementiert Object.freeze für Zeilen und Spalten.
 * V1.1.0: Meta Validation. 
 * - Garantiert die Verfügbarkeit des Mapping-Keys (unitKey) aus dem CSVParser V4.0.
 * - Stellt sicher, dass mathematische Werte nicht durch nachträgliche Manipulation korrumpiert werden.
 */

export class FinanzwesirData {
    /**
     * Erzeugt einen unveränderlichen Datentopf.
     * @param {Array} columns - Liste der Spaltennamen.
     * @param {Array} rows - Array von Objekten (Datenzeilen).
     * @param {Object} metadata - Enthält unitKey, Quelle, Zeitstempel etc.
     */
    constructor(columns, rows, metadata = {}) {
        // 1. Daten übernehmen
        this._columns = columns || [];
        this._rows = rows || [];
        this._metadata = Object.assign({
            unitKey: 'UNIT_NONE',
            parsedAt: new Date().toISOString()
        }, metadata);

        // 2. Sicherheits-Versiegelung (Deep Freeze Simulation)
        // Verhindert strukturelle Änderungen (push/pop) an Spalten und Zeilen.
        if (Array.isArray(this._columns)) {
            Object.freeze(this._columns);
        }
        
        if (Array.isArray(this._rows)) {
            Object.freeze(this._rows);
            // Jede einzelne Datenzeile einfrieren, um Manipulation von Werten zu verhindern.
            for (let i = 0; i < this._rows.length; i++) {
                if (typeof this._rows[i] === 'object' && this._rows[i] !== null) {
                    Object.freeze(this._rows[i]);
                }
            }
        }

        // Metadaten-Objekt einfrieren
        if (this._metadata) {
            Object.freeze(this._metadata);
        }

        // 3. Das Hauptobjekt selbst einfrieren
        // Finaler Schutz gegen das Hinzufügen neuer Properties.
        Object.freeze(this);
    }

    /** @returns {Array} Die versiegelten Spaltennamen */
    get columns() { return this._columns; }
    
    /** @returns {Array} Die versiegelten Datenzeilen */
    get rows() { return this._rows; }
    
    /** @returns {Object} Die versiegelten Metadaten (inkl. unitKey) */
    get metadata() { return this._metadata; }
}