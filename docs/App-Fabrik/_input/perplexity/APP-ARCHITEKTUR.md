# App-Architektur — Finanzwesir App-Fabrik
**Version:** 1.0 | **Datum:** 2026-05-09 | **Status:** Binding Reference

Dieses Dokument ist der Architektur-Vertrag für alle 21 ETF-Apps.
Kennt man eine App, kennt man alle.

---

## Schichtenmodell

```
Ghost-Seite (CMS)
└── HTML-Card
    ├── <div class="fw-app" data-type="..." data-csv="..." data-options="...">
    └── <script src="{{asset 'js/fw-apps/APP-SLUG.js'}}" defer>

    Schicht 1: CI-Design-System (screen.css + Tailwind-Config)
               CSS Custom Properties → Tailwind referenziert via var()
               NIEMALS Farben hardcoden außer in :root

    Schicht 2: FwTheme-Bridge (window.FW_THEME_OVERRIDE)
               Überbrückt KDR-14 bis CSS-Variables-Bridge in FwTheme.js gebaut ist
               Muss VOR Chart-Engine-Load im DOM stehen

    Schicht 3: fw-app-template.html (gemeinsame Basis)
               App-Shell, State-Management, Config-Reader, CSV-Loader
               Stellt window.FwApp API bereit

    Schicht 4: ChartEngine (fw-chart-engine/index.js)
               Layer 1–5 wie im Architecture Strategy Paper definiert
               Konsumiert window.FW_THEME_OVERRIDE

    Schicht 5: APP-SLUG.js (app-spezifisch)
               Definiert: window.FW_APP_OPTIONS_WHITELIST
               Definiert: window.FwAppInit(config, csvText, state)
               NUR app-spezifische Logik — kein Shell-Code
```

---

## Dateistruktur

```
Theme/assets/
├── css/
│   └── screen.css                        ← CI, Fonts, Ghost-Content-Styles
├── js/
│   ├── fw-chart-engine/                  ← Chart-Engine (bestehend)
│   │   ├── index.js
│   │   ├── core/
│   │   │   ├── ChartEngine.js
│   │   │   ├── FwTheme.js                ← KDR-14: CSS-Bridge hier einbauen
│   │   │   └── ...
│   │   ├── strategies/
│   │   └── data/
│   └── fw-apps/                          ← NEU: App-spezifische Logik
│       ├── _template.js                  ← Kopiervorlage für neue Apps
│       ├── prokrastinations-preis.js
│       ├── geburtsjahrlos.js
│       └── ...

docs/design-system/templates/
└── fw-app-template.html                  ← Dieses Dokument
```

---

## Ghost-Einbettung (APP-INTERFACE.md-konform)

```html
<!-- Ghost HTML-Card -->
<div class="fw-app"
     data-type="APP-SLUG"
     data-title="Optionaler Titel (überschreibt h2 im HTML)"
     data-csv="https://www.finanzwesir.com/data/datei.csv?v=2026-05"
     data-colors="default"
     data-options='{"key": "value"}'
></div>
<script src="{{asset "js/fw-apps/APP-SLUG.js"}}" defer></script>
```

### Attribut-Referenz

| Attribut | Pflicht | Typ | Regel |
|---|---|---|---|
| `data-type` | ja | string | App-Slug, z.B. `prokrastinations-preis` |
| `data-title` | nein | string | Überschreibt `<h2>` im Template |
| `data-csv` | wenn datengetrieben | URL | Nur `https://www.finanzwesir.com/...` |
| `data-colors` | nein | enum | `default` \| `inverted` |
| `data-options` | nein | JSON | Nur Keys aus `FW_APP_OPTIONS_WHITELIST` der App |

---

## App-spezifische JS-Datei (_template.js)

Jede neue App kopiert diese Vorlage:

```javascript
// fw-apps/APP-SLUG.js
// App: APP-TITEL
// Priorität: X | Slug: APP-SLUG | Block: X

(function () {
  'use strict';

  // Whitelist der erlaubten data-options Keys
  window.FW_APP_OPTIONS_WHITELIST = [
    'defaultRange',   // Beispiel
    'showLegend',     // Beispiel
  ];

  // Haupt-Initialisierung — wird von FwApp Bootstrap aufgerufen
  window.FwAppInit = async function (config, csvText, state) {

    // 1. CTA konfigurieren
    FwApp.setCTA('CTA-Text', 'https://www.finanzwesir.com/ziel');

    // 2. Daten verarbeiten (csvText ist bereits geladen oder null)
    // const data = new FinanzwesirData(csvText);

    // 3. Chart initialisieren
    // const engine = new ChartEngine(
    //   FwApp.getElement('fw-chart'),
    //   data,
    //   { type: 'line', ...config.options }
    // );

    // 4. KPIs setzen
    FwApp.setKpi('fw-kpi-1', '7,2 %');

    // 5. Interaktionen verdrahten
    FwApp.initRangeButtons((range) => {
      // engine.setRange(range);
    });

    // 6. Content anzeigen — IMMER am Ende
    state.showContent();
  };

})();
```

---

## Namenskonventionen

### CSS
| Typ | Konvention | Beispiel |
|---|---|---|
| CI-Farben | `--color-[name][-variante]` | `--color-petrol-80` |
| App-Klassen | `fw-[komponente][-variante]` | `fw-range-btn`, `fw-kpi-value` |
| State-IDs | `fw-state-[zustand]` | `fw-state-loading` |
| Element-IDs | `fw-[funktion]` | `fw-app-title`, `fw-kpi-1` |

### JavaScript
| Typ | Konvention | Beispiel |
|---|---|---|
| Variablen | `camelCase` | `csvText`, `rangeButtons` |
| Klassen | `PascalCase` | `ChartEngine`, `FwAppState` |
| Konstanten | `SCREAMING_SNAKE` | `ALLOWED_CSV_DOMAINS` |
| Globale App-API | `FwApp.*` | `FwApp.setKpi()` |
| App-Init | `window.FwAppInit` | pro App genau einmal |
| Whitelist | `window.FW_APP_OPTIONS_WHITELIST` | pro App genau einmal |
| Theme-Override | `window.FW_THEME_OVERRIDE` | einmal im Template |

### Dateien
| Typ | Konvention | Beispiel |
|---|---|---|
| App-Logik | `[slug].js` | `prokrastinations-preis.js` |
| Daten | `[slug].csv?v=YYYY-MM` | `msci-world.csv?v=2026-05` |
| Template | `fw-app-template.html` | einmalig |

---

## FwTheme-Bridge — Übergangsregel (bis KDR-14)

Bis `FwTheme.js` die CSS-Variables-Bridge implementiert, gilt:

1. `window.FW_THEME_OVERRIDE` wird im Template **vor** dem Chart-Engine-Load definiert
2. `FwTheme.js` prüft beim Init: `if (window.FW_THEME_OVERRIDE) { ...nutze Override... }`
3. Diese Prüfung muss in `FwTheme.js` ergänzt werden (3 Zeilen)
4. Sobald KDR-14 implementiert ist, wird `FW_THEME_OVERRIDE` aus dem Template entfernt

**Einzubauende Prüfung in FwTheme.js:**
```javascript
// Am Anfang der Theme-Initialisierung:
const override = window.FW_THEME_OVERRIDE;
const COLORS = (override && override.colors) ? override.colors : COLORS_DEFAULT;
const FONTS  = (override && override.fonts)  ? override.fonts  : FONTS_DEFAULT;
```

---

## States — Pflicht für jede App

| State | ID | Wann |
|---|---|---|
| Loading (Skeleton) | `fw-state-loading` | Sofort beim Seitenaufruf |
| Content | `fw-state-content` | Nach erfolgreichem Init |
| Error | `fw-state-error` | Bei Datenfehler oder Config-Fehler |

Übergang ausschließlich via `FwApp.state.showLoading()`, `.showContent()`, `.showError(msg)`.

---

## Erlaubte UI-Elemente (Design-System-konform)

Nur diese Komponenten dürfen in Apps verwendet werden. Alles andere ist verboten.

| Element | CSS-Klasse | Wann |
|---|---|---|
| Range-Button | `fw-range-btn` | Zeitraum-Auswahl |
| CTA-Button | `fw-cta` | Genau einer pro App, am Ende |
| Slider | `fw-slider` | Numerische Eingabe |
| KPI-Wert | `fw-kpi-value` | Kennzahlen |
| Skeleton | `fw-skeleton` | Loading-State |
| Info-Box | Design-System 02 | Hinweise (Feder-Icon) |
| Warn-Box | Design-System 02 | Risiken (Schwert-Icon) |
| Chart-Canvas | `#fw-chart` | Diagramme via Chart-Engine |

---

## Prozess: Eine neue App bauen

1. `fw-app-template.html` kopieren → umbenennen in `[slug].html`
2. `_template.js` kopieren → `fw-apps/[slug].js`
3. `data-type`, `data-title`, `data-options` im HTML anpassen
4. `FW_APP_OPTIONS_WHITELIST` in der JS-Datei definieren
5. `FwAppInit()` implementieren (nur app-spezifische Logik)
6. Ghost-HTML-Card aus dem Snippet-Kommentar im Template kopieren

**Faustregel:** Wenn du Code schreibst, der auch in einer anderen App stehen könnte → gehört er ins Template, nicht in die App-Datei.

