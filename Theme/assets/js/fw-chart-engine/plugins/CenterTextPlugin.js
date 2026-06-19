/**
 * @fileoverview Finanzwesir Chart Engine - CenterTextPlugin
 * @module plugins/CenterTextPlugin
 * @version 1.6.1
 *
 * Ausgelagert aus core/FwChartPlugins.js (AP-14e4).
 * Implementierung unverändert (v1.6.1 RECOVERY COMPLETE).
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
