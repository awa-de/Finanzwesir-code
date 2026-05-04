/**
 * @fileoverview Finanzwesir Chart Engine - Reusable Chart.js Plugins
 * @module core/FwChartPlugins
 * @version 1.6.1 (RECOVERY COMPLETE)
 * @date 2026-01-23
 *
 * @description
 * Sammlung von benutzerdefinierten Plugins, die direkt auf den Canvas zeichnen.
 * * @history
 * V1.5.2: Validation. SSOT Compatibility Confirmed (PieChartStrategy V11.2.0).
 * V1.6.0: Integration CrosshairPlugin (Regression in CenterTextPlugin).
 * V1.6.1: RECOVERY. Vollständige Restauration des CenterTextPlugin-Kerns.
 * - Fix: Re-Kapselung der _fitText Methode (Isolation).
 * - Fix: Beseitigung der Platzhalter-Kommentare (Logic Restoration).
 *
 * @plugins
 * 1. CenterTextPlugin (id: 'centerText'): Doughnut-Zentrum (v1.6.1).
 * 2. CrosshairPlugin (id: 'crosshair'): Vertikale Hilfslinie (v1.6.0).
 */

export const CenterTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart) {
        // Guard Clause: Nur ausführen, wenn in der Chart-Config aktiviert
        const options = chart.options.plugins.centerText;
        if (!options || !options.enabled) return;

        const { width, height, ctx } = chart;
        ctx.restore();

        // 1. STATE ERMITTELN
        const active = chart.activeSegment; 
        
        let textTop = '';
        let textBottom = '';
        
        // Farbe initialisieren mit Config (CI) oder Fallback
        let colorValue = options.colorValue || '#272727'; 
        let colorLabel = options.colorLabel || '#666666';

        if (active) {
            // HOVER STATE
            textTop = active.label || '';
            // SSOT: Wir übernehmen blind den String aus der Strategie (V11.2.0)
            textBottom = active.valueStr || ''; 
        } else {
            // DEFAULT STATE
            textTop = options.defaultLabel || '';
            textBottom = options.defaultValue || '';
        }

        // 1.1 EARLY EXIT (Zero-State)
        if (!textTop && !textBottom) return;

        // 2. KONFIGURATION (CI Injection)
        const fontLabel = options.fontLabel || '"Source Sans Pro", sans-serif';
        const fontValue = options.fontValue || '"Source Sans Pro", sans-serif';
        const weightLabel = options.fontWeightLabel || 'normal';
        const weightValue = options.fontWeightValue || 'bold';

        // 3. AUTO-FIT (Intelligente Größenberechnung)
        const meta = chart.getDatasetMeta(0);
        const innerRadius = (meta.data && meta.data[0] && meta.data[0].innerRadius) ? meta.data[0].innerRadius : (height / 3.5);
        
        const maxTextWidth = (innerRadius * 2) * 0.80; 

        let sizeTop = Math.round(height / 12); 
        let sizeBottom = Math.round(height / 8); 

        // Nutzung der internen Hilfsmethode (Kapselung gewahrt)
        sizeTop = this._fitText(ctx, textTop, fontLabel, weightLabel, sizeTop, maxTextWidth);
        sizeBottom = this._fitText(ctx, textBottom, fontValue, weightValue, sizeBottom, maxTextWidth);

        // 4. LAYOUTING (Vertikale Harmonie)
        const gap = innerRadius * 0.15; 
        const totalBlockHeight = sizeTop + gap + sizeBottom;
        
        const centerY = height / 2;
        const blockStartY = centerY - (totalBlockHeight / 2);

        const yTop = blockStartY + (sizeTop / 2);
        const yBottom = blockStartY + sizeTop + gap + (sizeBottom / 2);

        // 5. ZEICHNEN
        const centerX = width / 2;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = `${weightLabel} ${sizeTop}px ${fontLabel}`;
        ctx.fillStyle = colorLabel; 
        ctx.fillText(textTop, centerX, yTop);

        ctx.font = `${weightValue} ${sizeBottom}px ${fontValue}`;
        ctx.fillStyle = colorValue;
        ctx.fillText(textBottom, centerX, yBottom);
        
        ctx.save();
    },

    /**
     * Berechnet rekursiv oder via Ratio die passende Schriftgröße.
     * Interner Bestandteil des CenterTextPlugin (v1.6.1).
     */
    _fitText: function(ctx, text, font, weight, targetSize, maxWidth) {
        if (!text) return targetSize;
        ctx.font = `${weight} ${targetSize}px ${font}`;
        const width = ctx.measureText(text).width;
        
        if (width > maxWidth) {
            const ratio = maxWidth / width;
            return Math.floor(targetSize * ratio);
        }
        
        return targetSize;
    }
};

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