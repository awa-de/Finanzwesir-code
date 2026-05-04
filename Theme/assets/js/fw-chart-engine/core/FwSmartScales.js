/**
 * @fileoverview Finanzwesir Chart Engine - Scale Orchestrator (Layer 2)
 * @module core/FwSmartScales
 * @version 16.0.0 (THE SEMANTIC CEO)
 * * LOG-BUCH:
 * 2025-12-01: V1.0.0 - Grundsteinlegung der Skalen-Verwaltung.
 * 2026-01-10: V14.2.0 - Einführung von responsivem Achsen-Handling.
 * 2026-01-22: V15.0.0 - THE CEO: Magnetic Grid Alignment.
 * 2026-01-23: V16.0.0 - THE SEMANTIC CEO: Orchestriert die neue Midpoint-Zentrierung
 * und das dynamische Smart-Padding. Stellt sicher, dass die "Vertical Truth"
 * über alle Zoom-Level hinweg gewahrt bleibt.
 */

import { FwSmartXAxis } from './FwSmartXAxis.js';
import { FwSmartYAxis } from './FwSmartYAxis.js';
// Adapter wird für Zeitachsen benötigt
import './FwDateAdapter.js';

export class FwSmartScales {

    /**
     * Erstellt eine intelligente Zeitachse (X).
     * Delegiert die semantische Zentrierung an den Spezialisten FwSmartXAxis.
     */
    static getTimeAxis(minTime, maxTime, fontConfig, options = {}) {
        const fwContext = options.plugins?.fwContext || options.fwContext;

        if (!fwContext) {
            console.error("[SmartScales] CRITICAL: Missing fwContext for Semantic Alignment.");
            return { display: false };
        }

        // Delegation an den Spezialisten X
        // minTime/maxTime werden im neuen Modell (bounds: 'data') ignoriert, 
        // bleiben aber in der Signatur für Abwärtskompatibilität erhalten.
        return FwSmartXAxis.compute(fwContext, fontConfig);
    }

    /**
     * Erstellt eine Kategorie-Achse (X).
     */
    static getCategoryAxis(fontConfig, fwContext) {
        return FwSmartXAxis.getCategoryAxis(fontConfig, fwContext);
    }

    /**
     * Erstellt die intelligente Y-Achse (Werte).
     */
    static getSmartYAxis(fwContext, fontConfig) {
        if (!fwContext) {
            console.error("[SmartScales] CRITICAL: Missing fwContext for Y-Axis.");
            return { display: false };
        }

        // Delegation an den Spezialisten Y
        return FwSmartYAxis.compute(fwContext, fontConfig);
    }
}