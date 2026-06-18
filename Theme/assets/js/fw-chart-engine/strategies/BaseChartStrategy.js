/**
 * @fileoverview Finanzwesir Chart Engine - Base Strategy Interface
 * @module strategies/BaseChartStrategy
 * @version 9.0.2 (MAGNETIC GRID SEMANTICS)
 * @date 2026-01-22
 */

export class BaseChartStrategy {
    constructor() {
        if (new.target === BaseChartStrategy) {
            throw new TypeError("Cannot construct BaseChartStrategy instances directly.");
        }
    }

    transform(data, config) { throw new Error("Method 'transform()' must be implemented."); }
    getChartConfig(transformedData) { throw new Error("Method 'getChartConfig()' must be implemented."); }
    getA11yData(data, config) { throw new Error("Method 'getA11yData()' must be implemented."); }
    getViewOptions() { return []; } // Standard: Keine Optionen

    _createFwContext(params) {
        const required = ['chartType', 'axisType', 'rhythm', 'dataRange', 'infoSystem', 'dateSemantics'];
        required.forEach(field => {
            if (!params[field]) throw new Error(`[BaseChartStrategy] CRITICAL: Missing mandatory context field '${field}'.`);
        });
        
        const validSemantics = ['SNAPSHOT', 'RANGE', 'PERIOD'];
        if (!validSemantics.includes(params.dateSemantics)) {
            throw new Error(`[BaseChartStrategy] CRITICAL: Invalid dateSemantics '${params.dateSemantics}'.`);
        }

        const PHYSICS_REGISTRY = {
            'bar': { offset: true }, 'line': { offset: false }, 'pie': { offset: false }, 'scatter': { offset: false }
        };

        const physics = PHYSICS_REGISTRY[params.chartType];
        
        return Object.freeze({
            chartType: params.chartType,
            offset: physics.offset,
            axisType: params.axisType,
            rhythm: params.rhythm,
            anchor: params.anchor || null,
            dataRange: params.dataRange,
            durationYears: params.durationYears || null, // NEW: Exakte Dauer aus Range-Button
            displayRange: params.displayRange || null, // NEW — B1-AP-14b1
            infoSystem: params.infoSystem,
            dateSemantics: params.dateSemantics,
            viewMode: params.viewMode || 'history',
            valueMode: params.valueMode || 'value',
            currency: params.currency || '',
            referenceDate: params.referenceDate || null,
            tooltipLayout: params.tooltipLayout || 'COMPARE'
        });
    }

    handleLegendClick(chart, index) {
        const meta = chart.getDatasetMeta(index);
        const isHidden = meta.hidden === null ? false : meta.hidden;
        meta.hidden = !isHidden;
        chart.update();
    }
}