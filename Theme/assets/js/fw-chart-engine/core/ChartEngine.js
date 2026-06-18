/**
 * @fileoverview Finanzwesir Chart Engine - Logic Layer (The Brain)
 * @module core/ChartEngine
 * @version 3.14.0 (BAN DYNAMIK)
 * @date 2026-02-18
 * @status PRODUCTION
 * * @description
 * Der Orchestrator. Verbindet Daten, Logik und Darstellung.
 * * @history
 * Update 3.0.0: Entfernt chart-spezifische Logik. Nutzt generischen 'view'-State.
 * Update 3.1.0: Implementiert requestAnimationFrame für flüssiges Rendering.
 * Update 3.2.0: "Smart Updates" - Chart wird bei Änderungen nicht zerstört, sondern via chart.update() animiert.
 * Update 3.3.0: Transportiert Meta-Daten (z.B. 'interactiveFilters') von der Strategie zum Renderer.
 * Update 3.4.0: CRITICAL FIX. Aktualisiert nun auch die HTML-Legende während eines "Smart Updates". 
 * Verhindert "Geister-Legenden" beim Wechsel der Ansicht.
 * Update 3.5.0: Konfiguriert den CSVParser basierend auf dem Chart-Typ (Polymorph).
 * - 'line'/'bar': expectDate = true (Zeitreihen-Validierung aktiv).
 * - 'pie'/'doughnut': expectDate = false (Kategorie-Daten erlaubt).
 * Update 3.6.0: Respektiert 'enabled: false' bei Tooltips aus der Strategie.
 * Update 3.7.0: Übergibt 'data' an strategy.getViewOptions(data).
 * Ermöglicht Strategien, dynamisch auf Datenstruktur (z.B. Single-Asset) zu reagieren.
 * Update 3.8.0: ALIVE UPDATE (Animation Timing).
 * - Stabilisiert den Render-Zyklus für komplexe Start-Animationen.
 * - Garantiert, dass 'new Chart()' immer im nächsten Frame läuft, 
 * damit Strategien (BarChart) auf korrekte Pixel-Koordinaten zugreifen können.
  * Update 3.9.0: GLOBAL LAYOUT PADDING (Deprecated/Removed).
 * Update 3.10.0: STRATEGY SOVEREIGNTY.
 * - Entfernt das globale Layout-Padding (10px) aus der Engine.
 * - Übergibt die Verantwortung für Layout-Ränder vollständig an die Strategien (Layer 3).
 * - Grund: Balkendiagramme benötigen kein Padding (nutzen Offset), Linien schon.
 * - Die Engine leitet die Config nun unverändert weiter (Pass-Through).
 * Update 3.10.0: STRATEGY SOVEREIGNTY (Layout).
 * Update 3.11.0: TOOLTIP DIPLOMACY (Fix for Regression).
 * - Problem: Engine hat bisher Tooltip-Config der Strategie hart überschrieben.
 * - Lösung: Implementiert 'Soft Merge'. Die Engine lädt Defaults (Style),
 * respektiert aber Overrides (Callbacks) aus der Strategie.
 * - Ermöglicht Strategie-spezifische Datumsformatierung (LineChart) bei gleichzeitigem
 * Erhalt des Corporate Designs (Renderer).
 * V3.12.0: IMPORT RESTORATION.
 * - Kritischer Fix: Stellt den Import von 'BarChartStrategy.js' wieder her.
 * - Entfernt Referenz auf gelöschte Debug-Datei.
 * V3.13.0: PERFORMANCE UPGRADE (Parallel Hydration).
 * - Refactored init() to use Promise.all().
 * - Eliminates sequential waterfall loading for multiple charts.
 * - Allows concurrent network requests (HTTP/2 Multiplexing).
 * V3.14.0: BAN DYNAMIK.
 * - _bindLegendEvents() nutzt jetzt 'state' statt 'strategy' (Zugriff auf data/config).
 * - Legend-Toggle löst BAN-Recompute aus via computeHeadlineForVisibleSeries().
 * - BAN wechselt dynamisch zwischen Hint (4+) und Data (≤3) je nach sichtbaren Serien.
 * V3.15.0: CSS-VARIABLES BRIDGE (KDR-14).
 * - FwTheme.init() wird VOR new FwRenderer() aufgerufen.
 * - Reihenfolge bindend: CSS-Tokens müssen gelesen sein, bevor _injectStyles() läuft.
 * * @architecture
 * 1. STATE HOLDER: Verwaltet 'range' (Zeit) und 'view' (generische Ansicht).
 * 2. DYNAMIC CONFIG: Fragt die Strategie beim Start nach 'getViewOptions()'.
 * 3. CONTROLLER: Empfängt 'setView' Events vom Renderer und aktualisiert den State.
 * 4. RENDER CYCLE: 
 * - Initial: Hard Reset (DOM neu bauen) via requestAnimationFrame.
 * - Update: Soft Transition (Daten austauschen, chart.update aufrufen) + Legenden-Sync.
 * 5. DATA FLOW: Reicht 'meta'-Flags (wie interactiveFilters) an den Renderer durch.
  */

import { CSVParser } from '../data/CSVParser.js';
import { LineChartStrategy } from '../strategies/LineChartStrategy.js';
import { BarChartStrategy } from '../strategies/BarChartStrategy.js';
import { PieChartStrategy } from '../strategies/PieChartStrategy.js';
import { FwRenderer } from './FwRenderer.js';
import { FwAnnotationPulsePlugin } from '../plugins/FwAnnotationPulsePlugin.js'; // NEW — B1-AP-14c4

export class ChartEngine {
    constructor() {
        this.parser = new CSVParser();
        this.strategies = {
            'line': new LineChartStrategy(),
            'bar': new BarChartStrategy(),
            'pie': new PieChartStrategy()
        };
        // KDR-14: FwTheme.init() läuft im FwRenderer-Constructor.
        // Reihenfolge: new FwTheme() → theme.init() → _injectStyles().
        // So liest die Bridge die CSS-Tokens, bevor Styles generiert werden.
        this.renderer = new FwRenderer();
        this._appChartStates = new WeakMap(); // NEW — AppChart State-Registry
    }

    // NEW — Slice 4: Bridge für App-berechnete Daten (kein CSV-Fetch)
    renderFromData(container, chartSeries, options = {}) {
        // Container-Guard
        if (!(container instanceof HTMLElement)) {
            console.error('[ChartEngine] renderFromData: container ist kein HTMLElement');
            return;
        }
        if (!container.hasAttribute('data-fw-appchart')) {
            console.error('[ChartEngine] renderFromData: container hat kein data-fw-appchart');
            return;
        }
        if (container.classList.contains('financial-chart-module')) {
            console.error('[ChartEngine] renderFromData: container hat .financial-chart-module');
            return;
        }
        if (container.hasAttribute('data-csv')) {
            console.error('[ChartEngine] renderFromData: container hat data-csv');
            return;
        }

        // chartSeries-Validierung
        var monthRegex = /^\d{4}-\d{2}$/;
        if (!Array.isArray(chartSeries) || chartSeries.length === 0) {
            this.renderer.showError(container, 'chartSeries ist kein Array oder ist leer');
            return;
        }
        for (var i = 0; i < chartSeries.length; i++) {
            var item = chartSeries[i];
            if (!item.month || !monthRegex.test(item.month)) {
                this.renderer.showError(container, 'chartSeries: month muss YYYY-MM-Format haben');
                return;
            }
            if (!Number.isFinite(item.depotwert) || item.depotwert < 0) {
                this.renderer.showError(container, 'chartSeries: depotwert muss endliche Zahl >= 0 sein');
                return;
            }
        }
        if (chartSeries[chartSeries.length - 1].month < chartSeries[0].month) {
            this.renderer.showError(container, 'chartSeries: Monatsfolge muss aufsteigend sein');
            return;
        }

        // Typ-Auflösung
        var type = (options.type && this.strategies[options.type]) ? options.type : 'line';

        // Mapping → kanonisches Format mit Deep-Freeze
        var frozenData = Object.freeze({
            columns: Object.freeze(['Date', 'Depotwert']),
            rows: Object.freeze(
                chartSeries.map(function(it) {
                    return Object.freeze({ Date: it.month + '-01', Depotwert: it.depotwert });
                })
            ),
            metadata: Object.freeze({ unitKey: 'CURRENCY_EUR' })
        });

        // Feature-Normalisierung: nur ausgewertete Features übernehmen
        var inputFeatures = options.features || {};
        var features = Object.freeze({
            rangeControls: inputFeatures.rangeControls,
            headline:      inputFeatures.headline,
            verticalLine:  inputFeatures.verticalLine  // NEW — Slice 6
        });

        // NEW — B1-AP-14b1: xDisplayRange-Validierung (optional, für narrative LineCharts)
        var xDisplayRange = null;
        if (options.xDisplayRange != null) {
            var xdr = options.xDisplayRange;
            var monthFmt = /^\d{4}-\d{2}$/;
            if (typeof xdr !== 'object' || typeof xdr.min !== 'string' || typeof xdr.max !== 'string' ||
                !monthFmt.test(xdr.min) || !monthFmt.test(xdr.max)) {
                this.renderer.showError(container, 'xDisplayRange muss { min: "YYYY-MM", max: "YYYY-MM" } sein');
                return;
            }
            xDisplayRange = { min: xdr.min, max: xdr.max };
        }

        // NEW — B1-AP-14b2: yRangePolicy (optional, für cumulative Y-Achse)
        var yRangePolicy = null;
        var yRangeResetKey = null;
        if (options.yRangePolicy != null) {
            if (options.yRangePolicy !== 'cumulative-expand-zero') {
                this.renderer.showError(container, 'yRangePolicy: nur "cumulative-expand-zero" erlaubt');
                return;
            }
            yRangePolicy = options.yRangePolicy;
            yRangeResetKey = options.yRangeResetKey !== undefined ? options.yRangeResetKey : null;
        }

        // NEW — B1-AP-14c1: Annotationen (optional, kein Rendering)
        var annotations = null;
        if (options.annotations != null) {
            if (typeof options.annotations === 'object' && !Array.isArray(options.annotations)) {
                annotations = options.annotations;
            }
        }

        // NEW — B1-AP-14c4: annotationPulse (ephemerer Runtime-State, kein Domain-State)
        var annotationPulse = null;
        if (options.annotationPulse != null &&
            typeof options.annotationPulse === 'object' &&
            options.annotationPulse.enabled === true) {
            annotationPulse = options.annotationPulse;
        }

        // WeakMap-State-Mechanik
        if (this._appChartStates.has(container)) {
            var state = this._appChartStates.get(container);
            if (state.type !== type) {
                console.error('[ChartEngine] renderFromData: Typ-Wechsel nach initialem Render ist verboten');
                return;
            }
            state.data = frozenData;
            state.config.features = features;
            state.config.xDisplayRange = xDisplayRange; // NEW — B1-AP-14b1
            // NEW — B1-AP-14b2: yRangePolicy + Reset-Key update
            var prevKey = state.config.yRangeResetKey;
            state.config.yRangePolicy = yRangePolicy;
            state.config.yRangeResetKey = yRangeResetKey;
            state.config.annotations = annotations;     // NEW — B1-AP-14c1
            state.config.annotationPulse = annotationPulse; // NEW — B1-AP-14c4
            if (yRangePolicy === 'cumulative-expand-zero') {
                if (!state.axisMemory) {
                    state.axisMemory = { yMaxSeen: 0 };
                } else if (yRangeResetKey !== prevKey) {
                    state.axisMemory.yMaxSeen = 0; // RESET bei Key-Wechsel
                }
            } else {
                state.axisMemory = null;
            }
        } else {
            var state = {
                data:          frozenData,
                strategy:      this.strategies[type],
                type:          type,
                config:        { colors: {}, options: '', title: '', features: features, xDisplayRange: xDisplayRange, yRangePolicy: yRangePolicy, yRangeResetKey: yRangeResetKey, annotations: annotations, annotationPulse: annotationPulse }, // CHANGED — B1-AP-14c4
                range:         'max',
                view:          'value',
                viewOptions:   [],
                benchmark:     null,
                axisMemory:    yRangePolicy ? { yMaxSeen: 0 } : null, // NEW — B1-AP-14b2
                chartInstance: null
            };
            this._appChartStates.set(container, state);
        }

        this._draw(container, this._appChartStates.get(container));
    }

    async init() {
        const containers = document.querySelectorAll('.financial-chart-module');
        // Converts NodeList to Array to map tasks, then runs them concurrently.
        const tasks = Array.from(containers).map(container => this._processContainer(container));
        await Promise.all(tasks);
    }

    async _processContainer(container) {
        this.renderer.showLoading(container);
        
        try {
            var csvUrl = container.dataset.csv;
            var type = container.dataset.type || 'line';
            
            if (!csvUrl) throw new Error("data-csv fehlt");
            
            var isTimeSeries = (type !== 'pie' && type !== 'doughnut');
            
            var data = await this.parser.parse(csvUrl, { 
                expectDate: isTimeSeries 
            });

            var strategy = this.strategies[type];
            if (!strategy) throw new Error("Chart-Typ '" + type + "' ist unbekannt.");
            
            var viewOptions = strategy.getViewOptions(data);
            
            var initialView = '';
            if (viewOptions && viewOptions.length > 0) {
                initialView = viewOptions[0].key;
            }

            var baseConfig = this._parseConfig(container);
            
            var state = {
                data: data,
                strategy: strategy,
                type: type,
                config: baseConfig,
                range: this._extractOption(baseConfig.options, 'range') || 'max',
                view: initialView,
                viewOptions: viewOptions,
                benchmark: this._extractOption(baseConfig.options, 'benchmark'),
                chartInstance: null
            };

            this._draw(container, state);

        } catch (e) {
            console.error(e);
            this.renderer.showError(container, e.message);
        }
    }

    _draw(container, state) {
        var runtimeConfig = Object.assign({}, state.config);
        runtimeConfig.range = state.range;
        runtimeConfig.benchmark = state.benchmark;
        runtimeConfig.view = state.view;

        // NEW — B1-AP-14b2: Y-Memory für cumulative policy vor transform injizieren
        if (state.config.yRangePolicy === 'cumulative-expand-zero' && state.axisMemory) {
            runtimeConfig.yRangeMemory = { yMaxSeen: state.axisMemory.yMaxSeen };
        }

        var chartData = state.strategy.transform(state.data, runtimeConfig);

        // NEW — B1-AP-14b2: yMaxSeen nach transform akkumulieren
        if (state.config.yRangePolicy === 'cumulative-expand-zero' && state.axisMemory) {
            var dataMaxY = chartData.plugins.fwContext.dataRange.maxY;
            if (dataMaxY > state.axisMemory.yMaxSeen) state.axisMemory.yMaxSeen = dataMaxY;
        }

        var chartConfig = state.strategy.getChartConfig(chartData);
        var a11yData = state.strategy.getA11yData(state.data, runtimeConfig);

        var meta = chartData.meta || {};
        runtimeConfig.headline = meta.headline || null; // BAN V5.0.0
        // CHANGED — Feature-Auswahl: headline === false → BAN unterdrücken
        if ((runtimeConfig.features || {}).headline === false) runtimeConfig.headline = null;

        // NEW — Slice 6: VertikaleLinie als Chart.js-inline-Plugin (Option A: pixel-genau)
        if ((runtimeConfig.features || {}).verticalLine === 'last') {
            chartConfig.plugins = [{
                id: 'fwVerticalLine',
                afterDraw: function(chart) {
                    var m = chart.getDatasetMeta(0);
                    if (!m || !m.data || !m.data.length) return;
                    var last = m.data[m.data.length - 1];
                    var ctx = chart.ctx;
                    var ca = chart.chartArea;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(last.x, ca.top);
                    ctx.lineTo(last.x, ca.bottom);
                    ctx.strokeStyle = '#0071bf';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 4]);
                    ctx.stroke();
                    ctx.restore();
                }
            }];
        }

        // NEW — B1-AP-14c4: Pulse-Plugin für Screen-2-Marker (nur wenn annotationPulse.enabled)
        if (runtimeConfig.annotationPulse?.enabled) {
            if (!chartConfig.plugins) chartConfig.plugins = [];
            chartConfig.plugins.push(FwAnnotationPulsePlugin);
            if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
            chartConfig.options.plugins.fwAnnotationPulse = runtimeConfig.annotationPulse; // NEW
        }

        var strategyWantsNoTooltip = false;
        if (chartConfig.options && 
            chartConfig.options.plugins && 
            chartConfig.options.plugins.tooltip && 
            chartConfig.options.plugins.tooltip.enabled === false) {
            strategyWantsNoTooltip = true;
        }

        if (!strategyWantsNoTooltip) {
            var unitSuffix = '';
            if (state.view && state.view.includes('return')) unitSuffix = ' %';
            else if (meta.currency) unitSuffix = ' ' + meta.currency;
            
            var dateMode = meta.tooltipDateMode ? meta.tooltipDateMode : 'full';
            
            var rendererTooltip = this.renderer.getTooltipConfig(unitSuffix, dateMode);
            var strategyTooltip = (chartConfig.options.plugins && chartConfig.options.plugins.tooltip) || {};

            if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
            
            chartConfig.options.plugins.tooltip = Object.assign({}, rendererTooltip, strategyTooltip);
        }

        if (state.chartInstance) {
            state.chartInstance.data = chartConfig.data;
            state.chartInstance.options = chartConfig.options;
            
            this._updateUIState(container, state);
            this._updateLegend(container, chartConfig, meta.interactiveFilters, state);
            this.renderer._updateBAN(container, meta.headline || null, runtimeConfig); // BAN V5.0.0

            state.chartInstance.update();
            
        } else {
            var dom = this.renderer.setupStructure(
                container, 
                runtimeConfig, 
                chartConfig, 
                a11yData, 
                state.type, 
                state.data,
                state.view,        
                state.viewOptions,
                meta.interactiveFilters
            );
            
            var canvas = dom.canvas;

            if (typeof Chart === 'undefined') throw new Error("Chart.js Library nicht geladen!");

            requestAnimationFrame(() => {
                state.chartInstance = new Chart(canvas, chartConfig);
                this._bindEvents(container, dom.controls, state);
                this._bindLegendEvents(container, state.chartInstance, state);
            });
        }
    }

    _updateLegend(container, chartConfig, interactiveFilters, state) {
        var oldLegend = container.querySelector('.fw-chart-legend');
        var newLegend = this.renderer._renderLegend(chartConfig, interactiveFilters);

        if (oldLegend && newLegend) {
            oldLegend.replaceWith(newLegend);
            this._bindLegendEvents(container, state.chartInstance, state);
        }
        else if (oldLegend && !newLegend) {
            oldLegend.remove();
        }
        else if (!oldLegend && newLegend) {
            var canvasWrapper = container.querySelector('.fw-chart-canvas-container');
            if (canvasWrapper) {
                canvasWrapper.before(newLegend);
                this._bindLegendEvents(container, state.chartInstance, state);
            }
        }
    }

    _updateUIState(container, state) {
        const rangeBtns = container.querySelectorAll('[data-action="setRange"]');
        rangeBtns.forEach(btn => {
            if (btn.dataset.value === state.range) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        const viewBtns = container.querySelectorAll('[data-action="setView"]');
        viewBtns.forEach(btn => {
            if (btn.dataset.value === state.view) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    _bindEvents(container, toolbar, state) {
        if (!toolbar) return;
        var self = this;
        toolbar.addEventListener('click', function(e) {
            var target = e.target.closest('[data-action]');
            if (!target) return;
            var action = target.dataset.action;
            var value = target.dataset.value;
            if (action === 'setRange') {
                state.range = value;
                self._draw(container, state); 
            }
            if (action === 'setView') {
                state.view = value;
                self._draw(container, state);
            }
        });
    }

    _bindLegendEvents(container, chart, state) {
        var legendContainer = container.querySelector('.fw-chart-legend');
        if (!legendContainer) return;
        var self = this;
        legendContainer.addEventListener('click', function(e) {
            var item = e.target.closest('.fw-legend-item');
            if (item) {
                var index = parseInt(item.dataset.index, 10);
                state.strategy.handleLegendClick(chart, index);
                item.classList.toggle('hidden-dataset');

                // BAN Dynamik V5.1.0: Headline für sichtbare Serien neu berechnen
                if (typeof state.strategy.computeHeadlineForVisibleSeries === 'function') {
                    var runtimeConfig = Object.assign({}, state.config);
                    runtimeConfig.range = state.range;
                    runtimeConfig.view = state.view;
                    var headline = state.strategy.computeHeadlineForVisibleSeries(chart, state.data, runtimeConfig);
                    self.renderer._updateBAN(container, headline, runtimeConfig);
                }
            }
        });
    }

    _extractOption(optionsStr, key) {
        if (!optionsStr) return null;
        var idx = optionsStr.indexOf(key + ':');
        if (idx === -1) return null;
        var val = optionsStr.substring(idx + key.length + 1).split(',')[0].trim();
        return val;
    }

    _parseConfig(container) {
        var colors = {};
        var colorString = container.dataset.colors || "";
        if (colorString) {
            var parts = colorString.split(',');
            for (var i = 0; i < parts.length; i++) {
                var pieces = parts[i].split(':');
                if (pieces.length === 2) {
                    colors[pieces[0].trim()] = pieces[1].trim();
                }
            }
        }
        return { 
            colors: colors, 
            options: container.dataset.options || "",
            title: container.dataset.title || "" 
        };
    }
}