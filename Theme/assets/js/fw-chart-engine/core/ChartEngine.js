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
import { // CHANGED AP-14e9: Plugin-Barrel
    FwAnchorMeasurementPlugin, // NEW — AP-prokrast-08b
    FwAnnotationPulsePlugin,
    FwChartTextPlugin, // NEW — AP-prokrast-03d
    FwVerticalLinePlugin
} from '../plugins/index.js';

export class ChartEngine {
    constructor() {
        this.parser = new CSVParser();
        // KDR-14: FwTheme.init() läuft im FwRenderer-Constructor.
        // Reihenfolge: new FwTheme() → theme.init() → _injectStyles().
        // So liest die Bridge die CSS-Tokens, bevor Styles generiert werden.
        // CHANGED — AP-16c (protected-Begründung: Masterentscheidung Theme-Durchleitung;
        // Regressionstest = Harness AP-16-abnahme.html + Null-Delta-Kriterium): Renderer VOR den
        // Strategien erzeugen und dessen init()'te FwTheme-Instanz als EINE Quelle der Wahrheit an die
        // Strategie-Konstruktoren durchreichen (Composition Root + Constructor Injection). Vorher erzeugte
        // jede Strategie eine eigene, nie init()'te FwTheme-Instanz (zweite Wahrheitsquelle, 16b-Befund).
        // KDR 14.3 unverändert: die FwRenderer-interne Init-Reihenfolge bleibt gleich.
        this.renderer = new FwRenderer();
        var theme = this.renderer.theme;
        this.strategies = {
            'line': new LineChartStrategy(theme),
            'bar': new BarChartStrategy(theme),
            'pie': new PieChartStrategy(theme)
        };
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

        // NEW — AP-prokrast-03d: chartText (persistente Canvas-Text-Annotationen, kein Domain-State)
        var chartText = null;
        if (options.chartText != null &&
            typeof options.chartText === 'object' &&
            options.chartText.enabled === true) {
            chartText = options.chartText;
        }

        // NEW — AP-prokrast-08b: anchorMeasurement (optional, misst explizit angeforderte
        // Datenanker; kein Domain-State, kein direkter Plugin→App-Kanal — der App-Callback
        // wird separat in state.anchorMeasurementCallback gehalten, nie an Chart.js/das
        // Plugin durchgereicht; siehe _emitAnchorMeasurements())
        var anchorMeasurement = null;
        var anchorMeasurementCallback = null;
        if (options.anchorMeasurement != null &&
            typeof options.anchorMeasurement === 'object' &&
            options.anchorMeasurement.enabled === true) {
            var rawAnchors = Array.isArray(options.anchorMeasurement.anchors) ? options.anchorMeasurement.anchors : [];
            anchorMeasurement = { enabled: true, anchors: rawAnchors };
            if (typeof options.anchorMeasurement.onAnchorMeasurement === 'function') {
                anchorMeasurementCallback = options.anchorMeasurement.onAnchorMeasurement;
            }
        }

        // NEW — AP-prokrast-08b3: chartSettled (optional, opt-in Lifecycle-Signal — feuert,
        // wenn Chart.js seine Update-Animation für diesen Zyklus abgeschlossen hat, oder
        // synchron bei Reduced Motion). Reines Signal ohne Payload, kein Chart.js-Objekt,
        // kein Domain-State. App-Callback separat in state.chartSettledCallback gehalten,
        // analog anchorMeasurementCallback — nie an Chart.js durchgereicht.
        var chartSettled = null;
        var chartSettledCallback = null;
        if (options.chartSettled != null &&
            typeof options.chartSettled === 'object' &&
            options.chartSettled.enabled === true) {
            chartSettled = { enabled: true };
            if (typeof options.chartSettled.onSettled === 'function') {
                chartSettledCallback = options.chartSettled.onSettled;
            }
        }

        // NEW — AP-prokrast-08b5: renderMotion (optional, opt-in Render-Auftrag an den
        // Manager — WIE dieser eine Renderlauf ausgeführt wird, nicht WAS der Chart
        // semantisch ist. Gehört bewusst NICHT in fwContext/den Rucksack (Semantik für
        // Achsen/Tooltips/Layout) und NICHT in LineChartStrategy (die bleibt für den
        // Normalfall mit Chart.js-Default-Animation gebaut). mode:'default' (fehlend oder
        // explizit) ändert nichts am bisherigen Verhalten. mode:'instant' unterdrückt
        // Chart.js-Tweening ausschließlich für diesen einen renderFromData()-Aufruf —
        // wiederverwendet denselben update('none')-Mechanismus, der bereits für Reduced
        // Motion existiert, ohne Reduced Motion selbst zu verändern.
        var renderMotion = null;
        if (options.renderMotion != null &&
            typeof options.renderMotion === 'object' &&
            options.renderMotion.mode === 'instant') {
            renderMotion = { mode: 'instant' };
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
            state.config.chartText = chartText; // NEW — AP-prokrast-03d
            state.config.anchorMeasurement = anchorMeasurement; // NEW — AP-prokrast-08b
            state.anchorMeasurementCallback = anchorMeasurementCallback; // NEW — AP-prokrast-08b
            state.config.chartSettled = chartSettled; // NEW — AP-prokrast-08b3
            state.chartSettledCallback = chartSettledCallback; // NEW — AP-prokrast-08b3
            state.config.renderMotion = renderMotion; // NEW — AP-prokrast-08b5
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
                config:        { colors: {}, options: '', title: '', features: features, xDisplayRange: xDisplayRange, yRangePolicy: yRangePolicy, yRangeResetKey: yRangeResetKey, annotations: annotations, annotationPulse: annotationPulse, chartText: chartText, anchorMeasurement: anchorMeasurement, chartSettled: chartSettled, renderMotion: renderMotion }, // CHANGED — AP-prokrast-08b5
                range:         'max',
                view:          'value',
                viewOptions:   [],
                benchmark:     null,
                axisMemory:    yRangePolicy ? { yMaxSeen: 0 } : null, // NEW — B1-AP-14b2
                chartInstance: null,
                anchorMeasurementCallback: anchorMeasurementCallback, // NEW — AP-prokrast-08b
                chartSettledCallback: chartSettledCallback // NEW — AP-prokrast-08b3
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

        // CHANGED — B1-AP-14e2: FwVerticalLinePlugin ausgelagert, Push statt Überschreiben
        if ((runtimeConfig.features || {}).verticalLine === 'last') {
            if (!chartConfig.plugins) chartConfig.plugins = [];
            chartConfig.plugins.push(FwVerticalLinePlugin);
        }

        // NEW — B1-AP-14c4: Pulse-Plugin für Screen-2-Marker (nur wenn annotationPulse.enabled)
        if (runtimeConfig.annotationPulse?.enabled) {
            if (!chartConfig.plugins) chartConfig.plugins = [];
            chartConfig.plugins.push(FwAnnotationPulsePlugin);
            if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
            chartConfig.options.plugins.fwAnnotationPulse = runtimeConfig.annotationPulse; // NEW
        }

        // NEW — AP-prokrast-03d: FwChartTextPlugin (persistente Canvas-Text-Annotationen, nur wenn chartText.enabled)
        if (runtimeConfig.chartText?.enabled) {
            if (!chartConfig.plugins) chartConfig.plugins = [];
            chartConfig.plugins.push(FwChartTextPlugin);
            if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
            chartConfig.options.plugins.fwChartText = runtimeConfig.chartText;
        }

        // NEW — AP-prokrast-08b: FwAnchorMeasurementPlugin (misst Anker, meldet über
        // ChartEngine-Vermittlung — onMeasurement zeigt auf _emitAnchorMeasurements(),
        // nie auf den App-Callback direkt; siehe state.anchorMeasurementCallback)
        if (runtimeConfig.anchorMeasurement?.enabled) {
            if (!chartConfig.plugins) chartConfig.plugins = [];
            chartConfig.plugins.push(FwAnchorMeasurementPlugin);
            if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
            var self = this;
            chartConfig.options.plugins.fwAnchorMeasurement = {
                enabled: true,
                anchors: runtimeConfig.anchorMeasurement.anchors,
                onMeasurement: function(rawMeasurements) {
                    self._emitAnchorMeasurements(container, state, rawMeasurements);
                }
            };
        }

        // NEW — AP-prokrast-08b3: opt-in Chart-Settled-Signal über Chart.js' natives
        // animation.onComplete — kein neues Plugin, kein neuer Kommunikationskanal, sondern
        // die von Chart.js selbst dokumentierte Lifecycle-Callback für "Animation fertig".
        // Komponiert einen eventuell von der Strategie bereits gesetzten onComplete, statt
        // ihn zu überschreiben (aktuell setzt keine Strategie einen onComplete — geprüft).
        // .options wird bei jedem _draw()-Aufruf frisch an Chart.js übergeben (im Gegensatz
        // zu .plugins, das nur bei new Chart() gelesen wird) — deshalb ist hier kein
        // Bootstrap-Workaround wie bei FwAnchorMeasurementPlugin nötig.
        if (runtimeConfig.chartSettled?.enabled) {
            var existingAnimation = chartConfig.options.animation;
            var existingOnComplete = (existingAnimation && typeof existingAnimation === 'object')
                ? existingAnimation.onComplete
                : null;
            var self = this;
            chartConfig.options.animation = Object.assign({}, existingAnimation, {
                onComplete: function(animationContext) {
                    if (typeof existingOnComplete === 'function') existingOnComplete(animationContext);
                    self._emitChartSettled(container, state);
                }
            });
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

            var reducedMotionUpdate = this._prefersReducedMotion(); // CHANGED — AP-prokrast-08b3: einmal ausgewertet, für Settled-Signal wiederverwendet
            // NEW — AP-prokrast-08b5: renderMotion.mode 'instant' wirkt für diesen einen
            // Renderlauf wie Reduced Motion — kein globaler Zustand, kein Screen-/App-Wissen
            // hier in der Engine, nur ein neutraler Render-Auftrag aus den Options dieses
            // konkreten Aufrufs. Reduced Motion selbst bleibt unverändert (globale System-
            // Präferenz, unabhängig von renderMotion).
            var instantUpdate = reducedMotionUpdate || runtimeConfig.renderMotion?.mode === 'instant';
            state.chartInstance.update(instantUpdate ? 'none' : undefined); // CHANGED B1-AP-15b / AP-prokrast-08b5

            // CHANGED — AP-prokrast-08b3/08b5: bei 'none' (Reduced Motion ODER
            // renderMotion.mode === 'instant') läuft keine Chart.js-Animation, also feuert
            // animation.onComplete nicht — das Update ist aber bereits synchron abgeschlossen,
            // sobald .update() zurückkehrt. Settled-Signal hier direkt nachreichen, statt auf
            // einen nie kommenden onComplete zu warten (sonst bliebe die Sequenz stecken).
            if (instantUpdate && runtimeConfig.chartSettled?.enabled) {
                this._emitChartSettled(container, state);
            }

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
                // CHANGED — AP-prokrast-08b5: renderMotion.mode 'instant' unterdrückt auch bei
                // der Erst-Erstellung (new Chart()) die Einblend-/Wachstumsanimation, analog
                // Reduced Motion — kein zweiter Mechanismus, dieselbe Weiche.
                // CHANGED — AP-prokrast-09b: in eine Variable gehoben (war: inline im if), damit
                // derselbe Wert auch für den chartSettled-Nachreichpfad unten wiederverwendet
                // werden kann, analog 'instantUpdate' im Update-Zweig oben.
                var instantCreate = this._prefersReducedMotion() || runtimeConfig.renderMotion?.mode === 'instant'; // NEW B1-AP-15b / AP-prokrast-08b5
                if (instantCreate) {
                    if (!chartConfig.options) chartConfig.options = {};
                    chartConfig.options.animation = false;
                }
                state.chartInstance = new Chart(canvas, chartConfig);
                this._bindEvents(container, dom.controls, state);
                this._bindLegendEvents(container, state.chartInstance, state);

                // NEW — AP-prokrast-09b: analog zum Update-Zweig (s. 'instantUpdate' oben) —
                // bei instant/Reduced-Motion wird chartConfig.options.animation auf false gesetzt,
                // ein zuvor gesetzter animation.onComplete (s.o., chartSettled-Aktivierung) geht
                // dadurch verloren und feuert nie. Der Chart-Zustand ist nach new Chart() aber
                // bereits final. chartSettled wird deshalb auch im Creation-Zweig synchron
                // nachgereicht — schließt die in AP-prokrast-09a dokumentierte Creation-Pfad-
                // Lücke. Kein neuer Mechanismus, reine Wiederverwendung von _emitChartSettled().
                if (instantCreate && runtimeConfig.chartSettled?.enabled) {
                    this._emitChartSettled(container, state);
                }
            });
        }
    }

    // NEW — AP-prokrast-08b: Vermittlungsmethode — übersetzt Canvas-relative Pixel (vom
    // Plugin gemessen) in Container-relative Pixel (Standard-DOM-Geometrie, keine Chart.js-
    // Internals) und ruft erst danach den echten App-Callback auf. Der App-Callback selbst
    // wird nie an das Plugin/Chart.js durchgereicht (state.anchorMeasurementCallback lebt
    // ausschließlich hier in der ChartEngine).
    _emitAnchorMeasurements(container, state, rawMeasurements) {
        var callback = state.anchorMeasurementCallback;
        if (typeof callback !== 'function') return;
        var canvas = container.querySelector('canvas');
        if (!canvas) return;
        var canvasRect = canvas.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        var offsetX = canvasRect.left - containerRect.left;
        var offsetY = canvasRect.top - containerRect.top;
        var measurements = rawMeasurements.map(function(m) {
            return Object.freeze({
                id: m.id,
                x: m.x + offsetX,
                y: m.y + offsetY,
                visible: m.visible,
                coordinateSpace: 'chart-container'
            });
        });
        callback(Object.freeze(measurements));
    }

    // NEW — AP-prokrast-08b3: Vermittlungsmethode für das Chart-Settled-Lifecycle-Signal.
    // Reines "fertig"-Signal ohne Argumente — kein Chart.js-Objekt, keine Scales, kein
    // DatasetMeta, kein chartArea gelangt an die App.
    _emitChartSettled(container, state) {
        var callback = state.chartSettledCallback;
        if (typeof callback === 'function') callback();
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
        // CHANGED — CE-4c: Line/Bar setzen den vollstaendigen Literal-/aria-pressed-Zustand ueber den
        // einen gemeinsamen Renderer-Helfer _setChromeSegmentedOptionState() (ersetzt die vormals
        // getrennten _setLineSegmentedOptionState/_setBarSegmentedOptionState aus CE-3/CE-4); die
        // bestehende globale active-Suffixlogik steuert fuer Line/Bar weder Optik noch A11y mehr. Gilt
        // fuer alle Bar-Controls unabhaengig vom aktiven View (Ranking-Schranke — Controls duerfen bei
        // allen type==='bar' den gemeinsamen Chrome-Kern erhalten).
        var isLine = (state.type === 'line');
        var isBar = (state.type === 'bar'); // NEW — CE-4
        var isChromeControls = (isLine || isBar); // NEW — CE-4c
        const rangeBtns = container.querySelectorAll('[data-action="setRange"]');
        rangeBtns.forEach(btn => {
            var isActive = (btn.dataset.value === state.range);
            if (isChromeControls) {
                this.renderer._setChromeSegmentedOptionState(btn, isActive);
            } else {
                if (isActive) btn.classList.add('active'); else btn.classList.remove('active');
            }
        });
        const viewBtns = container.querySelectorAll('[data-action="setView"]');
        viewBtns.forEach(btn => {
            var isActive = (btn.dataset.value === state.view);
            if (isChromeControls) {
                this.renderer._setChromeSegmentedOptionState(btn, isActive);
            } else {
                if (isActive) btn.classList.add('active'); else btn.classList.remove('active');
            }
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

                // CHANGED — CE-4c: Line/reguläre Bar lesen den realen Chart.js-Sichtbarkeitszustand nach
                // dem Klick aus (Delta D.4, keine eigene Sichtbarkeitsquelle) und setzen vollstaendigen
                // Klassentausch + aria-pressed ueber den einen gemeinsamen Renderer-Helfer
                // _setChromeLegendPillState() (ersetzt die vormals getrennten _setLineLegendPillState/
                // _setBarLegendPillState aus CE-3/CE-4). Pie/Ranking bleiben beim bisherigen
                // hidden-dataset-Toggle — Ranking-Bar rendert nie eine .fw-chart-legend (siehe
                // _renderLegend), dieser Klick-Handler wird fuer Ranking also nie mit einem echten
                // Legend-Item erreicht.
                if (state.type === 'line' || state.type === 'bar') {
                    var isVisible = chart.isDatasetVisible(index);
                    self.renderer._setChromeLegendPillState(item, isVisible);
                } else {
                    item.classList.toggle('hidden-dataset');
                }

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

    _prefersReducedMotion() { // NEW B1-AP-15b
        try {
            return typeof window !== 'undefined' &&
                   window.matchMedia != null &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (e) {
            return false;
        }
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