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

        var chartData = state.strategy.transform(state.data, runtimeConfig);
        var chartConfig = state.strategy.getChartConfig(chartData);
        var a11yData = state.strategy.getA11yData(state.data, runtimeConfig);

        var meta = chartData.meta || {};
        runtimeConfig.headline = meta.headline || null; // BAN V5.0.0

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