/**
 * @fileoverview Finanzwesir Chart Engine - Pie/Donut Strategy
 * @module strategies/PieChartStrategy
 * @version 12.0.0 (EXPLICIT OPT-OUT)
 * @date 2026-01-21
 *
 * @description
 * Die finale Strategie für Torten- & Donut-Diagramme.
 * V11.0.0: Implementiert Context Object Pattern (Backpack).
 * V11.1.0: SERVICE SUBSCRIPTION PROTOCOL (InfoSystem: CENTER_TEXT).
 * V11.2.0: NULL-CURRENCY PATTERN.
 * V11.3.0: SEMANTIC TYPING PROTOCOL.
 * - Setzt explizit dateSemantics: 'SNAPSHOT' im Rucksack.
 * - Erfüllt den Integritäts-Check der BaseChartStrategy V7.0.0.
 * V12.0.0: EXPLICIT OPT-OUT (Phase 3 Integration).
 * - Implementiert das "Explicit Interface Rejection" Pattern für Achsen.
 * - Setzt fwContext.axisType: 'NONE'.
 * - Setzt options.scales: undefined, um FAANG-konforme Eindeutigkeit zu schaffen.
 *
 * @history
 * V7.2.0: DRILL-DOWN COLOR FIX.
 * V10.7.0: UNIFIED CONFIG RESOLVER.
 * V11.0.0: BACKPACK INTEGRATION.
 * V11.1.0: SERVICE SUBSCRIPTION.
 * V11.2.0: NULL-CURRENCY PATTERN.
 * V11.3.0: SEMANTIC TYPING PROTOCOL.
 */

import { BaseChartStrategy } from './BaseChartStrategy.js';
import { FwTheme } from '../core/FwTheme.js';
import { FwFormatUtils } from '../core/FwFormatUtils.js';
import { CenterTextPlugin } from '../plugins/index.js'; // CHANGED AP-14e9: Plugin-Barrel
import { FwLayoutRules } from '../core/FwLayoutRules.js'; 

export class PieChartStrategy extends BaseChartStrategy {
    constructor() {
        super();
        this.theme = new FwTheme();
        
        // 1. UNIT MAP: Standard für alle Strategien
        this.UNIT_MAP = {
            'UNIT_NONE':    { mode: 'value', currency: '' }, // V11.2.0: Neutraler Skalar
            'UNIT_PERCENT': { mode: 'percent', currency: 'PERCENT' },
            'CURRENCY_EUR': { mode: 'value', currency: 'EUR' },
            'CURRENCY_USD': { mode: 'value', currency: 'USD' },
            'CURRENCY_GBP': { mode: 'value', currency: 'GBP' },
            'CURRENCY_CHF': { mode: 'value', currency: 'CHF' },
            'CURRENCY_JPY': { mode: 'value', currency: 'JPY' },
            'UNIT_PIECES':  { mode: 'value', currency: '' },
            'UNIT_POINTS':  { mode: 'value', currency: '' }
        };

        // 2. INPUT WHITELISTS (V10.7 Standard)
        // PieChart erlaubt KEIN 'return' und KEINE 'range'.
        this.ALLOWED_MODES = new Set(['value', 'percent']);
        this.ALLOWED_RANGES = new Set([]); // Pie hat keine Range
    }

    getViewOptions() { return null; }

    transform(data, config) {
        // 1. Safety Check
        if (!data.columns || data.columns.length < 2) {
            return { labels: [], datasets: [], meta: {} };
        }

        // --- GATEKEEPER START ---
        const colorsValid = this.theme.validateColorMap(config.colors);
        const effectiveColors = colorsValid ? config.colors : {};
        // --- GATEKEEPER END ---

        // --- UNIFIED CONFIG RESOLVER (V10.7) ---
        
        // A) Unit Resolver (V11.2.0: Default to UNIT_NONE)
        // Wir raten nicht mehr 'EUR', wenn nichts da ist.
        const unitKey = data.metadata?.unitKey || 'UNIT_NONE';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: '' };
        
        // B) Mode Resolver
        const userMode = config.mode ? config.mode.toLowerCase() : null;
        const activeMode = (userMode && this.ALLOWED_MODES.has(userMode)) 
            ? userMode 
            : parserSettings.mode;

        // C) Format Derivation
        const formatMode = activeMode; 
        const currency = (formatMode === 'percent') ? 'PERCENT' : parserSettings.currency;
        
        // --- END RESOLVER ---

        let rawSegments = [];
        
        // 2. Parsing (Hybrid)
        const isVerticalList = data.columns.length === 2;
        if (isVerticalList) {
            rawSegments = this._parseVerticalList(data);
        } else {
            rawSegments = this._parseHorizontalSnapshot(data);
        }

        // 3. Roh-Sortierung
        rawSegments.sort((a, b) => b.value - a.value);
        
        // Gesamtsumme berechnen
        const totalSumGlobal = rawSegments.reduce((acc, s) => acc + s.value, 0);

        // 4. Aggregation (Miller's Law: Top 5 + Weitere...)
        const MAX_SLICES = 5;
        let finalSegments = [];
        let remainderSegments = [];
        let hasRemainder = false;
        let existingOtherIndex = -1;

        if (rawSegments.length <= MAX_SLICES + 1) {
            finalSegments = rawSegments;
        } else {
            finalSegments = rawSegments.slice(0, MAX_SLICES);
            remainderSegments = rawSegments.slice(MAX_SLICES);
            hasRemainder = true;
        }

        // Check auf existierendes Rest-Label
        for (let i = 0; i < finalSegments.length; i++) {
            if (this._isResidualCategory(finalSegments[i].label)) {
                existingOtherIndex = i;
                break;
            }
        }

        // --- DRILL-DOWN PAYLOAD GENERATION ---
        let drillDownDetails = [];
        let remainderValue = 0;

        if (hasRemainder) {
            remainderValue = remainderSegments.reduce((acc, s) => acc + s.value, 0);
            
            drillDownDetails = remainderSegments.map((s, i) => {
                let itemColor = null;
                if (effectiveColors && effectiveColors[s.label]) {
                    itemColor = effectiveColors[s.label];
                } else {
                    itemColor = this.theme.getColor(MAX_SLICES + i);
                }

                // V11.2.0: Vorformatierter String für Drilldown (Konsistenz)
                let valStr = '';
                if (currency === 'PERCENT') {
                    valStr = FwFormatUtils.formatSmart(s.value, 'percent') + ' %';
                } else {
                    // Währung oder Skalar
                    const fmtMode = currency ? 'currency' : 'value';
                    const symbol = FwFormatUtils.getSymbol(currency);
                    valStr = FwFormatUtils.formatSmart(s.value, fmtMode) + (symbol ? ' ' + symbol : '');
                }

                return {
                    label: s.label,
                    value: s.value,
                    percent: (totalSumGlobal > 0) ? (s.value / totalSumGlobal * 100) : 0,
                    color: itemColor,
                    valueStr: valStr // <-- V11.2.0: SSOT für Popup
                };
            });
        }

        // Merge Logic
        if (hasRemainder) {
            if (existingOtherIndex >= 0) {
                finalSegments[existingOtherIndex].value += remainderValue;
                finalSegments[existingOtherIndex].label = 'Weitere...';
                finalSegments[existingOtherIndex]._details = drillDownDetails;
            } else {
                finalSegments.push({ 
                    label: 'Weitere...', 
                    value: remainderValue,
                    _details: drillDownDetails
                });
            }
        }

        // 5. Finale Sortierung
        finalSegments.sort((a, b) => {
            const isOtherA = this._isResidualCategory(a.label);
            const isOtherB = this._isResidualCategory(b.label);
            if (isOtherA && !isOtherB) return 1; 
            if (!isOtherA && isOtherB) return -1; 
            return b.value - a.value;
        });

        // 6. Mapping
        const totalSum = finalSegments.reduce((acc, s) => acc + s.value, 0);
        const labels = finalSegments.map(s => s.label);
        const values = finalSegments.map(s => s.value);
        const metaDetails = finalSegments.map(s => s._details || null);

        const bgColors = finalSegments.map((s, i) => {
            if (this._isResidualCategory(s.label)) return this.theme.colors.grid; 
            
            const key = s.label.trim();
            if (effectiveColors) {
                const match = Object.keys(effectiveColors).find(k => k.toLowerCase() === key.toLowerCase());
                if (match) return effectiveColors[match];
            }
            return this.theme.getColor(i);
        });

        // BACKPACK CREATION (Factory Pattern)
        // PieChart hat keine Zeitachse, daher Pseudo-Werte für Time/Range
        const fwContext = this._createFwContext({
            chartType: 'pie',
            axisType: 'NONE',   // V12.0.0: EXPLICIT OPT-OUT. Signalisiert: Keine X/Y Logik.
            rhythm: 'YEARLY',   // Dummy (nicht relevant)
            dataRange: { min: 0, max: 0 }, // Dummy
            viewMode: 'composition', // Trigger für Structural Mode
            valueMode: formatMode,
            currency: currency,
            
            // SEMANTICS (V11.3.0): Torten sind Zustandsbilder (Stichtag)
            dateSemantics: 'SNAPSHOT',

            // SERVICE SUBSCRIPTION (V11.1.0): Nutzt Center Text, nicht Tooltip
            infoSystem: 'CENTER_TEXT'
        });

        return {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [...bgColors],
                hoverBackgroundColor: [...bgColors], 
                
                borderColor: this.theme.colors.bgWhite,
                borderWidth: 2,
                hoverBorderWidth: 2, 
                hoverOffset: 0, 
                
                _originalColors: bgColors,
                _status: new Array(values.length).fill('active'),
                _metaDetails: metaDetails 
            }],
            plugins: { fwContext }, // THE BACKPACK
            meta: {
                totalSum: totalSum, // Pie-spezifisch, daher noch in Meta
                interactiveFilters: true 
            }
        };
    }

    getChartConfig(transformedData) {
        const t = this.theme; 
        const meta = transformedData.meta;
        const fwContext = transformedData.plugins.fwContext; // SOURCE OF TRUTH
        
        // V11.2.0: Default ist jetzt immer leer (Keine Zwangsbeglückung mit Summen)
        const defaultValStr = "";
        const defaultLabel = "";

        return {
            type: 'doughnut',
            data: {
                labels: transformedData.labels,
                datasets: transformedData.datasets
            },
            plugins: [CenterTextPlugin], 
            
            options: {
                responsive: true,
                maintainAspectRatio: false,
                rotation: 0, 
                cutout: '70%', 
                layout: { padding: 20 },
                
                // EXPLICIT OPT-OUT (V12.0.0 Architecture Contract)
                // Wir definieren explizit, dass keine Skalierung stattfindet.
                // Verhindert, dass globale Defaults (z.B. aus Theme) hier einbluten.
                scales: undefined,

                events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                
                onClick: (event, elements, chart) => {
                    if (elements && elements.length > 0) {
                        const index = elements[0].index;
                        const ds = chart.data.datasets[0];
                        const details = ds._metaDetails ? ds._metaDetails[index] : null;

                        if (details && details.length > 0) {
                            const customEvent = new CustomEvent('fw-chart-show-details', {
                                detail: {
                                    x: event.native.clientX,
                                    y: event.native.clientY,
                                    title: 'Weitere Positionen', 
                                    data: details 
                                },
                                bubbles: true
                            });
                            chart.canvas.dispatchEvent(customEvent);
                        }
                    }
                },

                plugins: {
                    legend: { display: false }, 
                    
                    // CONTEXT INJECTION
                    fwContext: fwContext, 
                    
                    // ANTI-TOOLTIP (Explizit aus, wie im Abo deklariert)
                    tooltip: { enabled: false }, 

                    centerText: {
                        enabled: true,
                        defaultLabel: defaultLabel,
                        defaultValue: defaultValStr,
                        fontLabel: t.fonts.body,
                        fontValue: t.fonts.body, 
                        fontWeightLabel: 'normal', 
                        fontWeightValue: 'bold',   
                        colorLabel: t.colors.textSec, 
                        colorValue: t.colors.text     
                    }
                },
                
                animation: { duration: 400, easing: 'easeOutQuart' },

                onHover: (event, elements, chart) => {
                    const canvas = event.native.target;
                    let dirty = false;
                    let cursorStyle = 'default';

                    // 1. CURSOR LOGIC
                    if (elements && elements.length > 0) {
                        const idx = elements[0].index;
                        const ds = chart.data.datasets[0];
                        if (ds._metaDetails && ds._metaDetails[idx]) {
                            cursorStyle = 'pointer';
                        }
                    }
                    canvas.style.cursor = cursorStyle;

                    // 2. CENTER TEXT LOGIC
                    if (elements && elements.length > 0) {
                        const index = elements[0].index;
                        const ds = chart.data.datasets[0];
                        
                        if (!chart.activeSegment || chart.activeSegment.index !== index) {
                            const label = chart.data.labels[index];
                            const value = ds.data[index];
                            
                            let valStr = '';
                            
                            // V11.2.0: Konsistente Nutzung von FwFormatUtils mit Rucksack-Kontext
                            if (fwContext.currency === 'PERCENT') {
                                // Percent Mode
                                const percent = (meta.totalSum > 0) ? (value / meta.totalSum * 100) : value;
                                valStr = FwFormatUtils.formatSmart(percent, 'percent') + ' %';
                            } else {
                                // Value Mode (Currency or Scalar)
                                const fmtMode = fwContext.currency ? 'currency' : 'value';
                                const symbol = FwFormatUtils.getSymbol(fwContext.currency);
                                valStr = FwFormatUtils.formatSmart(value, fmtMode) + (symbol ? ' ' + symbol : '');
                            }
                            
                            chart.activeSegment = { index, label, valueStr: valStr };
                            dirty = true;
                        }
                    } else {
                        if (chart.activeSegment !== null) {
                            chart.activeSegment = null;
                            dirty = true;
                        }
                    }
                    if (dirty) chart.update('none'); 
                }
            }
        };
    }

    handleLegendClick(chart, index) {
        const ds = chart.data.datasets[0];
        const originalColors = ds._originalColors;
        const currentStatus = ds._status[index];
        
        let newColor;

        if (currentStatus === 'active') {
            const originalColor = originalColors[index];
            newColor = this.theme.getGhostColor(originalColor); 
            ds._status[index] = 'ghost';
        } else {
            newColor = originalColors[index];
            ds._status[index] = 'active';
        }

        ds.backgroundColor[index] = newColor;
        ds.hoverBackgroundColor[index] = newColor;

        chart.update('none');
    }

    // --- Helpers ---

    _isResidualCategory(label) {
        if (!label) return false;
        const l = label.toLowerCase().trim();
        return l === 'sonstiges' || l === 'rest' || l === 'other' || l === 'others' || l === 'weitere' || l === 'weitere...';
    }

    _parseVerticalList(data) {
        const segments = [];
        const labelKey = data.columns[0];
        const valKey = data.columns[1];
        if (this._isValue(valKey)) {
            const val = this._parseNumber(valKey);
            if (val > 0) segments.push({ label: labelKey, value: val });
        }
        for (let i = 0; i < data.rows.length; i++) {
            const row = data.rows[i];
            const val = this._parseNumber(row[valKey]);
            if (val > 0) segments.push({ label: row[labelKey], value: val });
        }
        return segments;
    }

    _parseHorizontalSnapshot(data) {
        const segments = [];
        const lastRow = data.rows[data.rows.length - 1];
        for (let i = 1; i < data.columns.length; i++) {
            const colName = data.columns[i];
            const val = this._parseNumber(lastRow[colName]);
            if (val > 0) segments.push({ label: colName, value: val });
        }
        return segments;
    }

    _parseNumber(input) {
        if (!input) return 0;
        let str = String(input).trim().replace('%', '');
        if (str.includes(',') && str.indexOf(',') > str.lastIndexOf('.')) {
             str = str.replace(/\./g, '').replace(',', '.');
        }
        const val = parseFloat(str);
        return isNaN(val) ? 0 : val;
    }

    _isValue(str) { return /[0-9]/.test(str) || str.includes('%'); }

    /**
     * OBLIGATORISCH: Accessibility-Daten für Screen Reader (KDR 13).
     * Zeigt ALLE Segmente einzeln (kein "Weitere..."-Aggregat),
     * weil blinde Nutzer den Drilldown-Popup nicht bedienen können.
     */
    getA11yData(data, config) {
        if (!data.columns || data.columns.length < 2) {
            return { summary: 'Kreisdiagramm – keine Daten', headers: [], rows: [] };
        }

        const unitKey = data.metadata?.unitKey || 'UNIT_NONE';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: '' };
        const userMode = config.mode ? config.mode.toLowerCase() : null;
        const activeMode = (userMode && this.ALLOWED_MODES.has(userMode)) ? userMode : parserSettings.mode;
        const formatMode = activeMode;
        const currency = (formatMode === 'percent') ? 'PERCENT' : parserSettings.currency;
        const symbol = FwFormatUtils.getSymbol(currency);

        // Rohe Segmente OHNE Aggregation (alle auflösen)
        const isVerticalList = data.columns.length === 2;
        let rawSegments = isVerticalList
            ? this._parseVerticalList(data)
            : this._parseHorizontalSnapshot(data);
        rawSegments.sort((a, b) => b.value - a.value);

        const totalSum = rawSegments.reduce((acc, s) => acc + s.value, 0);

        const formatValue = (val) => {
            if (currency === 'PERCENT') {
                return FwFormatUtils.formatSmart(val, 'percent') + ' %';
            }
            const fmtMode = currency ? 'currency' : 'value';
            const formatted = FwFormatUtils.formatSmart(val, fmtMode);
            return symbol ? `${formatted} ${symbol}` : formatted;
        };

        const headers = ['Segment', 'Wert', 'Anteil'];
        const a11yRows = rawSegments.map(seg => {
            const percent = totalSum > 0 ? (seg.value / totalSum * 100) : 0;
            return [
                seg.label,
                formatValue(seg.value),
                FwFormatUtils.formatSmart(percent, 'percent') + ' %'
            ];
        });

        const summary = `Kreisdiagramm: ${rawSegments.length} Segmente, Gesamtwert ${formatValue(totalSum)}`;
        return { summary, headers, rows: a11yRows };
    }
}