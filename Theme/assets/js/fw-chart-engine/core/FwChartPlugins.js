/**
 * @fileoverview Finanzwesir Chart Engine - Reusable Chart.js Plugins
 * @module core/FwChartPlugins
 * @version 1.7.0 (AP-14e4: CenterTextPlugin ausgelagert)
 * @date 2026-01-23
 *
 * @description
 * Sammlung von benutzerdefinierten Plugins, die direkt auf den Canvas zeichnen.
 * @history
 * V1.5.2: Validation. SSOT Compatibility Confirmed (PieChartStrategy V11.2.0).
 * V1.6.0: Integration CrosshairPlugin (Regression in CenterTextPlugin).
 * V1.6.1: RECOVERY. Vollständige Restauration des CenterTextPlugin-Kerns.
 * V1.7.0: AP-14e4 — CenterTextPlugin nach plugins/CenterTextPlugin.js ausgelagert.
 *         Re-Export-Shim für Rückwärtskompatibilität.
 *
 * @plugins
 * 1. CenterTextPlugin (id: 'centerText'): → plugins/CenterTextPlugin.js (Re-Export).
 * 2. CrosshairPlugin (id: 'crosshair'): Vertikale Hilfslinie (v1.6.0).
 */

// CHANGED AP-14e4: CenterTextPlugin ausgelagert — Re-Export-Shim für Altimporte
export { CenterTextPlugin } from '../plugins/CenterTextPlugin.js';

/**
 * CrosshairPlugin: Erzeugt die "Haarlinie" für die Perlenkette.
 * Exklusiv für LineCharts via Strategy-Opt-In gesteuert.
 */
export const CrosshairPlugin = {
    id: 'crosshair',
    
    afterDatasetsDraw: function(chart) {
        const options = chart.options.plugins.crosshair;
        
        if (!options || !options.enabled) return;

        if (chart.tooltip?._active?.length > 0) {
            const activePoint = chart.tooltip._active[0];
            const ctx = chart.ctx;
            const x = activePoint.element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.beginPath();
            
            ctx.setLineDash(options.dash || [5, 5]);
            ctx.lineWidth = options.lineWidth || 1;
            ctx.strokeStyle = options.color || 'rgba(0, 0, 0, 0.2)';
            
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.stroke();
            ctx.restore();
        }
    }
};