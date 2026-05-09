# Finanzwesir App-Fabrik — Übergabe-Dokument
**Session:** 2026-05-09 | **Status:** Fundament gelegt, bereit für erste App

---

## Was hier ist

Dieses Paket ist das Ergebnis einer Architektur-Session. Es enthält das vollständige
Fundament für den Bau von 21 interaktiven ETF-Apps auf der Finanzwesir-Website (Ghost CMS).

| Datei | Was sie ist |
|---|---|
| `README.md` | Dieses Dokument — Einstiegspunkt |
| `fw-app-template.html` | Das generische App-Template — Herzstück |
| `APP-ARCHITEKTUR.md` | Architektur-Vertrag — Binding Reference |
| `_template.js` | JS-Kopiervorlage für jede neue App |

---

## Kontext: Worum geht es?

**Plattform:** Ghost CMS 6.x — „dummes" CMS, keine Server-Logik  
**Tech-Stack:** Vanilla JS + Tailwind CSS (CDN) + Chart.js (via eigene Chart-Engine)  
**Ziel:** 21 interaktive Apps, die ETF-Investieren erklären (Prokrastinations-Preis,
Diversifikations-Detektor, ETF-Namensdecoder, …)  
**Philosophie:** Kennt man eine App, kennt man alle. Lindy-Effekt für Code.

### Das Problem, das gelöst wurde

Vor dieser Session: Design-System für Content-Seiten fertig, Chart-Engine fertig —
aber keine Verbindung zwischen beiden. Jede App wäre ein Unikat geworden.

Nach dieser Session: Ein einheitliches Fundament verbindet beide Welten.

---

## Bestehende Basis (im Repo: github.com/awa-de/Finanzwesir-code)

### Design-System (docs/design-system/spec/)
- **CI-Farben:** Petrol `#218380`, Blau `#0071BF`, Purpur `#8D0267`, Gelb `#DFC805`
- **Fonts:** Archivo Black (Display/H1-H2) + Source Sans Pro (Body) — lokal, DSGVO-konform
- **Framework:** Tailwind CSS via CDN, referenziert CI-Farben via `var(--color-*)`
- **Komponenten:** Info-Box, Warn-Box, Fazit-Box, Listen, Tabellen, Accordion, Video
- **Buttons:** Primary (Petrol-Fill) + Secondary (Weiß/Petrol-Text)
- **Status:** Final und dokumentiert in 6 Spec-Dateien

### Chart-Engine (Theme/assets/js/fw-chart-engine/)
- **Architektur:** 5-Layer (Vault → Manager → Brains → Curator → Face)
- **Prinzip:** Unidirektionaler Datenfluss, unveränderliche Daten (Object.freeze)
- **Layer:**
  - L1 `FinanzwesirData.js` + `CSVParser.js` — Daten laden & versiegeln
  - L2 `ChartEngine.js` — State, Orchestration, Error Boundary
  - L3 Strategies (Line, Bar, Pie) — Datentransformation
  - L4 `FwSmartScales.js` + `FwDateUtils.js` — Mathematik & Zeitachse
  - L5 `FwRenderer.js` + `FwTheme.js` — UI & Design
- **Einbindung:** `docs/spec/APP-INTERFACE.md` definiert den Vertrag
- **Offen:** KDR-14 — CSS-Variables-Bridge in FwTheme.js (siehe unten)

### App-Spezifikationen (Apps/ETF-Apps-Hauptdokument-v2.md)
18 Apps spezifiziert in Blöcken A–H, mit Slug, Priorität, Kernbotschaft,
Interaktionslogik, Datenquelle und Implementierungshinweisen.

---

## Was neu gebaut wurde (diese Session)

### 1. fw-app-template.html
Das generische Fundament. Enthält:

- **CI-Farben als CSS Custom Properties** — Single Source of Truth
- **Tailwind-Config** — spiegelt master-template.html exakt
- **FwTheme-Bridge** (`window.FW_THEME_OVERRIDE`) — verbindet Design-System und
  Chart-Engine, ohne FwTheme.js anzufassen (Überbrückung bis KDR-14)
- **7 App-UI-Elemente** (vollständige Liste — keine weiteren erlaubt):
  1. App-Header (Titel h2 + Untertitel p)
  2. Range-Buttons (Zeitraum-Auswahl)
  3. Chart-Canvas (mit A11y-Tabelle)
  4. KPI-Cards (Kennzahlen)
  5. Slider (numerische Eingabe)
  6. States (Skeleton-Loader / Error-Box)
  7. CTA-Button (genau einer, immer am Ende)
- **State-Management** (Loading → Content | Error), ARIA-konform
- **Config-Reader** (liest data-* aus Ghost HTML-Card, Domain-Lock, Whitelist)
- **CSV-Loader** mit Fehlerbehandlung
- **window.FwApp API** — wird von app-spezifischen JS-Dateien konsumiert
- **Dummy-Chart + funktionierender Slider** — zum visuellen Testen
- **Sektion „Ungeklärte Eingabe-Elemente"** (DS-012) — Browser-Default,
  absichtlich unstyled (Checkbox, Radio, Select, Text/Zahl-Input)

### 2. APP-ARCHITEKTUR.md
Der Architektur-Vertrag. Definiert:
- Schichtenmodell (5 Schichten von Ghost bis App-Logik)
- Dateistruktur (`fw-apps/` als neues Verzeichnis)
- Ghost-Einbettungsprotokoll (HTML-Card Snippet)
- Attribut-Referenz (data-type, data-csv, data-options, …)
- Namenskonventionen (CSS, JS, Dateien)
- Erlaubte UI-Elemente (abgeschlossene Liste)
- Prozess: Eine neue App bauen (6 Schritte)

### 3. _template.js
69-Zeilen-Kopiervorlage. Jede neue App beginnt damit.
Definiert exakt zwei Dinge: `FW_APP_OPTIONS_WHITELIST` und `FwAppInit()`.

---

## Offene Punkte (priorisiert)

### 🔴 Muss vor erster App gemacht werden

**KDR-14: FwTheme.js — 3 Zeilen ergänzen**

In `Theme/assets/js/fw-chart-engine/core/FwTheme.js` am Anfang der
Theme-Initialisierung ergänzen:

```javascript
const override = window.FW_THEME_OVERRIDE;
const COLORS = (override?.colors) ? override.colors : COLORS_DEFAULT;
const FONTS  = (override?.fonts)  ? override.fonts  : FONTS_DEFAULT;
```

Danach haben alle Charts automatisch die korrekten CI-Farben.

**fw-apps/ Verzeichnis anlegen**

```
Theme/assets/js/fw-apps/
├── _template.js   ← diese Datei (aus Paket)
└── .gitkeep
```

### 🟡 Bald klären

**DS-012: Eingabe-Elemente stylen oder Browser-Default akzeptieren?**

Betroffen: `<input type="checkbox">`, `<input type="radio">`,
`<select>`, `<input type="text">`, `<input type="number">`.

Aktueller Stand: Browser-Default (sieht auf Chrome/Safari/Firefox unterschiedlich aus).
Entscheidung nötig, dann in `docs/design-system/spec/06-INTERAKTION.md` dokumentieren.

**Ghost HTML-Card testen**

Sobald fw-apps/ Verzeichnis existiert: Eine App-JS-Datei hochladen und
die Ghost-Card-Einbettung live testen. Erwarteter Ablauf:
1. HTML-Card mit data-* Attributen in Ghost einfügen
2. Script-Tag mit `{{asset "js/fw-apps/APP-SLUG.js"}}` darunter
3. App erscheint auf der Seite

### 🟢 Backlog

- **screen.css** analysieren: CSS-Styles sind laut DS-005 doppelt definiert
  (kein zentrales Stylesheet). Konsolidieren sobald Zeit ist.
- **Erste echte App bauen**: Priorität 1 laut ETF-Apps-Hauptdokument ist
  `A1 Risiko-Übersetzer` (höchster emotionaler Hebel, geringer Aufwand)

---

## Prozess: Neue App bauen (Fließband)

```
Schritt 1  fw-app-template.html kopieren → umbenennen in [slug].html
Schritt 2  _template.js kopieren → fw-apps/[slug].js
Schritt 3  data-type, data-title, data-options im HTML anpassen
Schritt 4  FW_APP_OPTIONS_WHITELIST in der JS-Datei befüllen
Schritt 5  FwAppInit() implementieren (nur app-spezifische Logik)
Schritt 6  Ghost-HTML-Card aus Snippet-Kommentar im Template kopieren
```

**Faustregel:** Wenn du Code schreibst, der auch in einer anderen App stehen
könnte → gehört er ins Template, nicht in die App-Datei.

---

## Schichtenmodell (Kurzfassung)

```
Ghost-Seite
└── HTML-Card (data-type, data-csv, data-options)
    │
    ├── Schicht 1: screen.css + Tailwind-Config  (CI, Fonts)
    ├── Schicht 2: FW_THEME_OVERRIDE             (Design → Chart-Engine)
    ├── Schicht 3: fw-app-template.html          (Shell, API, States)
    ├── Schicht 4: fw-chart-engine/index.js      (Chart-Engine L1–L5)
    └── Schicht 5: fw-apps/[slug].js             (nur App-Spezifisches)
```

---

## Für das nächste LLM: Wichtigste Konventionen

- **CSS:** `--color-[name][-variante]` für CI-Farben, `fw-[komponente]` für App-Klassen
- **JS:** camelCase Variablen, PascalCase Klassen, SCREAMING_SNAKE Konstanten
- **Gelb (#DFC805) ist NUR dekorativ** — niemals für Text (WCAG-Fail)
- **Purpur = Warnungen** — nicht für positive Dinge verwenden
- **textContent statt innerHTML** — überall, keine Ausnahmen
- **Ein CTA pro App** — immer Petrol, immer am Ende
- **State-Übergänge NUR via FwApp.state.*()** — niemals direkt classList manipulieren
- **CSV nur von www.finanzwesir.com** — Domain-Lock ist Sicherheits-Feature, nicht Konvention

