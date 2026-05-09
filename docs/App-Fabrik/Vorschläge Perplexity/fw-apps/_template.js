// ================================================================
// FINANZWESIR APP TEMPLATE — _template.js
// Kopiervorlage für jede neue App.
//
// ANLEITUNG:
// 1. Diese Datei kopieren: fw-apps/APP-SLUG.js
// 2. APP-SLUG, APP-TITEL, BLOCK ersetzen
// 3. FW_APP_OPTIONS_WHITELIST befüllen
// 4. FwAppInit implementieren
//
// VERTRAG: Diese Datei enthält NUR app-spezifische Logik.
// Shell, State, Config-Reading, CSV-Load: alles im Template.
// ================================================================

// App: APP-TITEL
// Priorität: X | Slug: APP-SLUG | Block: X (A/B/C/D/E/F/G/H)
// Datenquelle: [CSV-Pfad oder "keine"]

(function () {
  'use strict';

  // ── OPTIONS-WHITELIST ─────────────────────────────────────────
  // Nur diese Keys werden aus data-options akzeptiert.
  // Unbekannte Keys werden ignoriert, nie ausgeführt.
  window.FW_APP_OPTIONS_WHITELIST = [
    // 'defaultRange',  // Beispiel: '5y' | '10y' | '20y' | 'all'
    // 'showLegend',    // Beispiel: 'true' | 'false'
  ];

  // ── HAUPT-INITIALISIERUNG ─────────────────────────────────────
  // config:  { type, title, csv, colors, options }
  // csvText: String (CSV-Rohdaten) oder null (wenn kein data-csv)
  // state:   { showLoading(), showContent(), showError(msg) }
  window.FwAppInit = async function (config, csvText, state) {

    // 1. CTA konfigurieren
    FwApp.setCTA('CTA-Text', 'https://www.finanzwesir.com/ZIEL');

    // 2. Daten verarbeiten
    // Beispiel mit Chart-Engine:
    //   const data = new FinanzwesirData();
    //   await data.loadFromCSV(config.csv);
    //
    // Beispiel reine Berechnung (kein CSV):
    //   const result = berechneEtwas(config.options);

    // 3. Chart initialisieren (falls benötigt)
    // const engine = new ChartEngine(
    //   FwApp.getElement('fw-chart'),
    //   data,
    //   {
    //     type: 'line',           // 'line' | 'bar' | 'pie'
    //     defaultRange: config.options.defaultRange || '20y',
    //   }
    // );

    // 4. KPIs setzen (falls vorhanden)
    // FwApp.setKpi('fw-kpi-1', '7,2 %');
    // FwApp.setKpi('fw-kpi-2', '134.000 €');

    // 5. Interaktionen verdrahten
    // FwApp.initRangeButtons((range) => engine.setRange(range));
    // FwApp.initSlider('fw-slider-input', (value) => { ... });

    // 6. Content anzeigen — IMMER als letzter Schritt
    state.showContent();
  };

})();
