/**
 * @fileoverview Finanzwesir Chart Engine - Smart Tooltips
 * @version 3.4.0 (CONTEXT-AWARE RHYTHM CONSISTENCY)
 * * LOG-BUCH:
 * 2025-11-20: V1.0.0 - Basis Tooltip-Konfiguration.
 * 2026-01-10: V2.5.0 - Integration lokalisierter Zahlenformate.
 * 2026-01-23: V3.1.0 - Responsive Typography Update.
 * 2026-01-24: V3.2.0 - Implementierung Deterministic Matrix v1.3.1.
 * - Einführung Gatekeeper-Check (infoSystem Protocol).
 * - Dynamischer Interaction-Mode (Ranking vs. History).
 * - Pill-reaktive Label-Unterdrückung bei Single-Asset-Sichtbarkeit.
 * - Integration physikalischer Zonen-Erkennung (S, M, L).
 * 2026-01-24: V3.3.0 - Structural Redundancy Fix (Spezifikation 6.2).
 * - Unterdrückung von Dataset-Labels im Ranking-Modus zur Vermeidung von Doubletten.
 * - Harmonisierung von Pill-Reaktivität (6.1) und strukturellem Veto (6.2).
 * 2026-01-26: V3.4.0 - Context-Aware Rhythm Consistency (V12 Restoration).
 * - Synchronisation mit FwDateUtils V4.5.0 (CARD Protocol).
 * - Sicherstellung der SNAPSHOT-Präzision im Tooltip-Header.
 * - Validiert gegen das "3J-Knubbel-Szenario": Tooltip folgt der restaurierten Achsen-Taktung.
 */

import { FwDateUtils } from './FwDateUtils.js';
import { FwLayoutRules } from './FwLayoutRules.js';

export class FwSmartTooltips {
    /**
     * Konfiguriert die Tooltips basierend auf dem Rucksack-Vertrag.
     * @param {Object} fwContext - Der statische Kern aus der Strategie.
     * @param {Object} styleConfig - Design-Vorgaben (Schriften, Farben).
     */
    static configure(fwContext, styleConfig) {
        // 1. GATEKEEPER-CHECK: Nur aktiv, wenn explizit bestellt
        if (fwContext.infoSystem !== 'TOOLTIP') {
            return { enabled: false };
        }

        return {
            enabled: true,
            displayColors: false,
            
            // 2. DYNAMISCHE INTERAKTION: 
            // 'index' für Zeitvergleich, 'nearest' für Balken-Fokus (Ranking)
            mode: fwContext.viewMode === 'ranking' ? 'nearest' : 'index', 
            intersect: fwContext.viewMode === 'ranking', 
            position: 'nearest', 

            callbacks: {
                /**
                 * Der Titel nutzt die deterministische Matrix (S/M/L).
                 * V3.4.0: Profitiert von der verbesserten Rhythm-Erkennung (FwDateUtils V4.5.0).
                 */
                title: (items) => {
                    if (!items.length) return '';
                    const item = items[0];
                    const chart = item.chart;
                    const raw = item.raw;
                    
                    // Physik-Messung (Dynamische Schale)
                    const width = chart.width;
                    const zone = width < 450 ? 'S' : (width < 900 ? 'M' : 'L');
                    
                    const ts = (raw && raw._originalDate) 
                        ? raw._originalDate 
                        : item.parsed.x;
                        
                    // Delegation an Layer 4 (Single Source of Truth)
                    // Da fwContext.rhythm nun durch CARD-Logik (Bucket-Verfahren) 
                    // stabilisiert wurde, bleibt das Datum im Tooltip auch bei Gaps korrekt.
                    return FwDateUtils.formatTooltipDate(ts, fwContext.rhythm, zone);
                },

                /**
                 * Redundanz-Management: Unterdrückt Labels nach Regel 6.1 und 6.2.
                 */
                label: (context) => {
                    const value = context.parsed.y;
                    const label = context.dataset.label || '';
                    if (value === null || value === undefined) return '';
                    
                    // A. Zähle sichtbare Assets (Pill-Sensitivität - Regel 6.1)
                    const visibleDatasets = context.chart.data.datasets.filter(ds => !ds.hidden).length;
                    
                    // B. Prüfe auf Ranking-Modus (Strukturelles Veto - Regel 6.2)
                    const isRanking = fwContext.viewMode === 'ranking';

                    const formattedValue = value.toLocaleString('de-DE', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });

                    const unit = fwContext.valueMode === 'percent' ? '%' : ' €';
                    
                    /**
                     * REDUNDANZ-CHECK:
                     * Das Label wird unterdrückt, wenn:
                     * 1. Wir im Ranking-Modus sind (Datum steht bereits im Header).
                     * 2. Nur noch 1 Asset sichtbar ist (Information durch Pills bekannt).
                     */
                    if (isRanking || visibleDatasets <= 1) {
                        return `${formattedValue}${unit}`;
                    }

                    return `${label}: ${formattedValue}${unit}`;
                }
            },

            // Styling & Typography (FwLayoutRules Integration)
            // V3.5.0: CI-Tokens 1:1, keine Opacity (KDR-14 CSS-Variables Bridge)
            backgroundColor: styleConfig.tooltipBg || '#FFFFFF',
            titleColor: styleConfig.titleColor || '#272727',
            titleFont: (ctx) => {
                const base = FwLayoutRules.getResponsiveFont(ctx);
                return { ...base, weight: 'bold' };
            },

            bodyColor: styleConfig.bodyColor || '#4C4C4C',
            bodyFont: (ctx) => FwLayoutRules.getResponsiveFont(ctx),

            borderColor: styleConfig.borderColor || '#E7ECEF',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 4,
            caretSize: 6,
            zIndex: 100
        };
    }
}