/**
 * @fileoverview Finanzwesir Chart Engine - Shared Formatting Logic (Layer 4)
 * @module core/FwFormatUtils
 * @version 2.4.0 (UX: Force Decimals Support)
 * @status PRODUCTION
 * @description
 * Zentrale Logik für Zahlen, Währungen und Prozentwerte.
 *
 * @history
 * Update 1.0.0: Grundlegende Formatierung via Intl.NumberFormat.
 * Update 2.0.0 (Refactor): Einführung semantischer Modi.
 * - Entfernt: 'value' (war undurchsichtig).
 * - Entfernt: 'return' (war zu spezifisch).
 * - Neu: 'currency' (Kaufmännisch, 2 Stellen bei <100, 0 bei großen Summen).
 * - Neu: 'percent' (Smarte Dezimalstellen, 0 bei Ganzen, max 1 bei krummen).
 * Update 2.1.0: RESPONSIVE UPDATE.
 * - Einführung von `formatAbbreviated`.
 * - Kombiniert SI-Suffixe (k, M) mit deutschen Finanzstandards (Mrd).
 * - Löst das Platzproblem auf Y-Achsen bei mobilen Viewports (< 414px).
 * Update 2.2.0: UX POLISH (Smart Integer Detection).
 * - Problem: Y-Achsen zeigten bei glatten Schritten < 100 (z.B. 40, 60, 80) unnötige ",00" an.
 * - Lösung: Neue Logik unterscheidet nicht mehr nach Betragshöhe (<100),
 * sondern nach Zahlentyp (Integer vs Float).
 * - Glatte Zahlen (40, 100) -> 0 Nachkommastellen ("40 €").
 * - Krumme Zahlen (40.5, 40.01) -> 2 Nachkommastellen ("40,50 €").
 * - Limit: Alles unter 1 Cent (0.001) wird auf 2 Stellen gerundet (wird zu 0.00).
 * Update 2.3.0: PRECISION ALIGNMENT.
 * - Angleichung der Prozent-Logik an die Währungs-Erkenntnisse.
 * - Erkenntnis: Krumme Zahlen brauchen Präzision (Basispunkte).
 * - Änderung: Erhöhung maxDec bei Prozenten von 1 auf 2.
 * - Ergebnis: 5,25% wird angezeigt (statt 5,3%), aber 5% bleibt glatt (dank minDec=0).
 * Update 2.4.0: RHYTHM CONTROL.
 * - Fügt Parameter `forceDecimals` zu `formatSmart` hinzu.
 * - Ermöglicht es der Achse, bei Micro-Ranges (z.B. 0.99 - 1.01) auch für
 * glatte Zahlen (1.00) die Nachkommastellen zu erzwingen.
 *
 * @architecture
 * 1. SEMANTIC API: Methoden erwarten einen 'mode' (Intent) statt technischer Parameter.
 * 2. ADAPTIVE PRECISION: Die Anzahl der Dezimalstellen passt sich automatisch der Größe des Wertes an.
 * 3. HYBRID LOCALIZATION: Nutzt deutsches Komma, mischt aber internationale Tech-Suffixe (k, M) für Kompaktheit auf Mobile.
 * 4. ROUNDING STRATEGY: Vermeidet ".0" am Ende ("12k" statt "12,0k"), um horizontalen Platz zu maximieren.
 */

export class FwFormatUtils {

    static getSymbol(code) {
        if (!code) return '';
        const c = code.toUpperCase().trim();
        const map = {
            'EUR': '€', 'USD': '$', 'GBP': '£', 'CHF': 'CHF',
            'PERCENT': '%', 'RETURN': '%'
        };
        return map[c] || c;
    }

    /**
     * Adaptive Zahlenformatierung (DE).
     * @param {number|string} value 
     * @param {string} mode - 'percent' | 'currency'
     * @param {boolean} [forceDecimals=false] - WICHTIG: Erzwingt ",00"
     */
    static formatSmart(value, mode, forceDecimals = false) {
        if (value === null || value === undefined) return '-';
        
        const valAsNum = Number(value);
        if (isNaN(valAsNum)) return '-';

        const absVal = Math.abs(valAsNum);
        let minDec = 0;
        let maxDec = 0;

        // NORMALISIERUNG
        let cleanMode = mode;
        if (mode === 'return') cleanMode = 'percent';
        if (mode === 'value') cleanMode = 'currency';

        if (cleanMode === 'percent') {
            // PROZENT LOGIK
            if (absVal > 1000) {
                maxDec = 0;
            } else {
                maxDec = 2; 
                minDec = 0; 
            }
        } else {
            // WÄHRUNG / STANDARD LOGIK
            const isInteger = Number.isInteger(valAsNum);

            // ENTSCHEIDUNG: Glatt oder Krumm?
            // Wenn forceDecimals TRUE ist, behandeln wir ALLES wie eine krumme Zahl.
            if (isInteger && !forceDecimals) {
                // FALL A: Glatte Zahl (40, 100) -> "40 €"
                minDec = 0;
                maxDec = 0;
            } else {
                // FALL B: Krumme Zahl ODER Forced -> "40,50 €" / "1,00 €"
                minDec = 2;
                maxDec = 2;
            }
        }

        return new Intl.NumberFormat('de-DE', {
            minimumFractionDigits: minDec,
            maximumFractionDigits: maxDec
        }).format(valAsNum);
    }

    static formatAbbreviated(val) {
        if (val === null || val === undefined) return '-';
        const valAsNum = Number(val);
        if (isNaN(valAsNum)) return '-';
        const abs = Math.abs(valAsNum);
        const formatter = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
        if (abs >= 1.0e9) return formatter.format(valAsNum / 1.0e9) + ' Mrd';
        if (abs >= 1.0e6) return formatter.format(valAsNum / 1.0e6) + 'M';
        if (abs >= 1.0e3) return formatter.format(valAsNum / 1.0e3) + 'k';
        return this.formatSmart(valAsNum, 'currency');
    }
}