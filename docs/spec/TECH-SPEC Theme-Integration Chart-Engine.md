# Technische Spezifikation: Ghost-Theme-Integration der Chart-Engine

**Version:** 1.0.0
**Datum:** 17.02.2026
**Status:** Verbindliche Referenz
**Zielgruppe:** Entwickler, die das Ghost-Theme zusammenbauen.
**Kontext:** Was muss das Theme bereitstellen, damit die Chart-Engine im Artikel-Content funktioniert?

---

## 1. Überblick

Die Finanzwesir Chart-Engine ist eine **100% client-seitige** JavaScript-Anwendung. Sie rendert interaktive Charts aus CSV-Dateien direkt im Browser. Ghost dient als "dummes" CMS — es liefert HTML-Content aus, in dem `<div>`-Container mit `data-*`-Attributen die Chart-Konfiguration tragen.

**Das Theme muss sicherstellen:**

1. Chart.js (Library) wird geladen
2. Die Engine-Dateien werden geladen
3. Die Engine wird initialisiert
4. CSS-Klassen kollidieren nicht
5. Der Content-Bereich lässt genug Platz
6. CSV-Dateien sind erreichbar

---

## 2. Datei-Inventar (Was muss ins Theme?)

### 2.1 Externe Abhängigkeit

| Datei | Zweck | Quelle | Einbindung |
|:------|:------|:-------|:-----------|
| `chart.umd.min.js` | Chart-Library (Canvas-Rendering) | [Chart.js](https://www.chartjs.org/), **lokal** in `assets/js/vendor/` | `<script defer>` vor der Engine |

**Entscheidung (2026-02-17):** Chart.js wird **lokal** gehostet, nicht vom CDN. Gründe: Volle Kontrolle, DSGVO-konform (kein Third-Party-Zugriff), kein externer DNS/TCP/TLS-Overhead. SRI und Preconnect sind bei lokalen Dateien unnötig.

### 2.2 Engine-Dateien

Alle Dateien liegen in `assets/js/fw-chart-engine/`. Die Engine nutzt ES-Module (`import`/`export`).

| Pfad | Layer | Funktion |
|:-----|:------|:---------|
| **Core** | | |
| `core/ChartEngine.js` | 2 (Manager) | Orchestrierung, State, Render-Zyklus |
| `core/FwRenderer.js` | 5 (Face) | HTML-Aufbau, DOM, Styles |
| `core/FwTheme.js` | 5 (Face) | Farben, Fonts, Geometrie (CI-Tokens) |
| `core/FwLayoutRules.js` | 5 (Face) | Responsive Regeln, Textformatierung |
| `core/FwFormatUtils.js` | 5 (Face) | Zahlenformatierung (de-DE) |
| `core/FwSmartScales.js` | 4 (Curator) | Achsen-Berechnung, Ticks, Density |
| `core/FwDateUtils.js` | 4 (Curator) | Rhythmus-Erkennung, Zeit-Intelligenz |
| `core/CSVParser.js` | 1 (Vault) | CSV-Import, Validierung, Strip & Tag |
| `core/FinanzwesirData.js` | 1 (Vault) | Daten-Container, Deep Freeze |
| `core/FwChartPlugins.js` | 3 (Brains) | Chart.js-Plugins (Center Text, etc.) |
| **Strategien** | | |
| `strategies/BaseChartStrategy.js` | 3 | Basis-Klasse |
| `strategies/LineChartStrategy.js` | 3 | Linien-Chart-Logik |
| `strategies/BarChartStrategy.js` | 3 | Balken-Chart-Logik |
| `strategies/PieChartStrategy.js` | 3 | Torten-Chart-Logik |
| **Einstiegspunkt** | | |
| `index.js` | — | Exportiert `ChartEngine` (Public API) |

### 2.3 Lade-Reihenfolge

```
1. Chart.js (Vendor)
2. fw-chart-engine/index.js (ES-Module, importiert alles weitere)
3. Initialisierung (DOMContentLoaded)
```

---

## 3. Theme-Template-Integration

### 3.1 Wo einbinden?

Die Chart-Engine muss in **`post.hbs`** (oder alternativ `default.hbs`) eingebunden werden — überall dort, wo Artikel-Content angezeigt wird.

### 3.2 Script-Einbindung

```html
{{!-- Chart.js Library (lokal, kein CDN) --}}
<script defer src="{{asset "js/vendor/chart.umd.min.js"}}"></script>

{{!-- Chart Engine (ES-Module) --}}
<script type="module">
  import { ChartEngine } from '{{asset "js/fw-chart-engine/index.js"}}';

  document.addEventListener('DOMContentLoaded', () => {
    const engine = new ChartEngine();
    engine.init();
  });
</script>
```

**Wichtig:**
- `type="module"` ist Pflicht (die Engine nutzt ES-Module)
- Chart.js muss **vor** der Engine geladen sein (kein `type="module"`, kein `defer`)
- `{{asset ...}}` ist der Ghost-Handlebars-Helper für Theme-Assets

### 3.3 Alternative: Nicht-modularer Build

Wenn ES-Module im Theme-Kontext Probleme bereiten (z.B. durch Ghost-Minification), kann ein gebündelter Build erstellt werden. Das ist aktuell nicht implementiert, aber als Option vorgemerkt.

---

## 4. HTML-Contract: Was die Engine im Content erwartet

### 4.1 Container-Erkennung

Die Engine sucht nach dem DOM-Load alle Elemente mit der Klasse `financial-chart-module`:

```javascript
document.querySelectorAll('.financial-chart-module')
```

Diese Container werden vom **Redakteur** in Ghost-HTML-Cards platziert. Das Theme muss sie **nicht** selbst erzeugen.

### 4.2 Attribute-Contract

| Attribut | Pflicht? | Format | Beispiel |
|:---------|:---------|:-------|:---------|
| `data-type` | Ja | `line` \| `bar` \| `pie` | `data-type="line"` |
| `data-csv` | Ja | Vollständige URL (nur `www.finanzwesir.com`) | `data-csv="https://www.finanzwesir.com/content/files/file.csv"` |
| `data-colors` | Ja | `Key: #Hex, Key: #Hex` | `data-colors="World: #0071BF"` |
| `data-title` | Nein | Freitext | `data-title="Rendite"` |
| `data-options` | Nein | `key:value, key:value` | `data-options="range:5y"` |

### 4.3 Options-Whitelist

| Key | Werte | Line | Bar | Pie |
|:----|:------|:----:|:---:|:---:|
| `range` | `1y`, `3y`, `5y`, `10y`, `max` | Ja | Ja | ignoriert |
| `mode` | `value`, `percent`, `return` | Ja | Ja | ignoriert |
| `view` | `history`, `ranking` | nein | Ja | ignoriert |
| `benchmark` | Spaltenname | Ja | nein | nein |

### 4.4 Sicherheitsmodell

Alle `data-*`-Attribute gelten als **Untrusted Input**:

- **Farben:** Werden gegen eine CI-Whitelist validiert. Ungültige Hex-Codes → Fallback auf Standard-Palette.
- **Optionen:** Unbekannte Keys werden ignoriert (Graceful Degradation).
- **Titel:** Wird via `textContent` gesetzt (kein `innerHTML` für Nutzerdaten).
- **Fehlermeldungen:** `showError()` und `showLoading()` nutzen `createElement` + `textContent` (kein `innerHTML` mit variablem Inhalt).
- **CSV-Daten:** Alle Werte aus CSV werden via `textContent` in den DOM geschrieben (KDR 12: SafeDOM).

---

## 5. CSS-Anforderungen an das Theme

### 5.1 Keine Kollisionen

Die Engine kapselt ihre Styles über CSS-Klassen mit dem Präfix `fw-`:

```
.fw-chart-wrapper, .fw-chart-title, .fw-chart-toolbar,
.fw-btn, .fw-btn-group, .fw-toggle, .fw-toggle-opt,
.fw-chart-legend, .fw-legend-item, .fw-legend-dot,
.fw-popover-*, .fw-a11y-table
```

**Das Theme darf diese Klassen nicht überschreiben.** Die Engine injiziert ihre Styles inline via JavaScript (`<style>` im Shadow-ähnlichen Container).

### 5.2 Container Queries

Die Engine nutzt **CSS Container Queries** (`@container`) für Responsive-Verhalten (KDR 6). Das bedeutet:

- Charts skalieren basierend auf der **Container-Breite**, nicht dem Viewport
- Das Theme muss sicherstellen, dass der Content-Bereich keine `contain: layout` oder ähnliche Properties setzt, die Container Queries stören könnten

### 5.3 Mindestbreite

Charts brauchen eine Mindestbreite von ca. **300px**, um sinnvoll angezeigt zu werden. Das Theme sollte im Content-Bereich keine engeren Spalten erzwingen.

### 5.4 Fonts

Die Engine nutzt zwei Schriftarten (hardcoded in `FwTheme.js`):

| Zweck | Font | Gewichte |
|:------|:-----|:---------|
| Fließtext, Labels, Tooltips | Source Sans Pro | 400, 600, 700 |
| Überschriften (optional) | Archivo Black | 400 |

**Das Theme muss diese Fonts laden** (via Google Fonts oder lokal in `assets/fonts/`):

```html
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Archivo+Black&display=swap" rel="stylesheet">
```

**DSGVO-Hinweis:** Für die lokale Einbindung die WOFF2-Dateien herunterladen und in `assets/fonts/` ablegen, dann via `@font-face` in `screen.css` einbinden.

---

## 6. CSV-Dateien: Hosting & Pfade

### 6.1 Sicherheitsentscheidung: Domain-Whitelist

CSV-URLs dürfen **ausschließlich** von `https://www.finanzwesir.com` geladen werden. Diese Einschränkung wird in `CSVParser.parse()` erzwungen (implementiert seit 2026-02-17). Zusätzlich sind relative Pfade (`/`, `./`, `../`) und `http://localhost`/`http://127.0.0.1` für die Entwicklungsumgebung erlaubt.

**Begründung:** Keine CSVs von Drittseiten einspielen. Der Redakteur lädt Dateien über das Ghost-Backend hoch — Ghost generiert eine URL unter der eigenen Domain.

### 6.2 Workflow: CSV hochladen

1. Redakteur öffnet Artikel im Ghost-Editor
2. CSV-Datei über das Upload-Feld im Ghost-Backend hochladen
3. Ghost gibt eine URL zurück (z.B. `https://www.finanzwesir.com/content/files/2024/renditen.csv`)
4. Diese URL wird in `data-csv` eingetragen

### 6.3 Noch zu klären

- Genaues Upload-Verfahren in Ghost.io: Gibt es ein Datei-Upload-Feld im Artikel-Editor? Welches URL-Format generiert Ghost für hochgeladene Dateien?

---

## 7. Initialisierung: Was die Engine beim Laden tut

### 7.1 Ablauf (Sequenzdiagramm in Worten)

1. `DOMContentLoaded` feuert
2. `ChartEngine.init()` wird aufgerufen
3. Engine sucht alle `.financial-chart-module`-Container
4. Pro Container:
   a. `data-type` auslesen → Strategie wählen (Line/Bar/Pie)
   b. `data-csv` auslesen → CSV via `fetch()` laden
   c. `CSVParser` validiert und parst die CSV
   d. `FinanzwesirData` speichert die Daten (Deep Freeze)
   e. Strategie transformiert Daten → Chart.js-Konfiguration + `fwContext`
   f. `FwRenderer` baut HTML (Titel, Toolbar, Legende, Canvas, A11y-Tabelle)
   g. `new Chart(canvas, config)` rendert den Chart
5. Range-Buttons und Legend-Toggle werden registriert (Event-Listener)

### 7.2 Fehlerbehandlung

Jeder Container wird in einer **Error Boundary** (`try-catch`) verarbeitet. Wenn ein Chart fehlschlägt:

- Der betroffene Container zeigt eine Fehlermeldung (rot, Text)
- Alle anderen Charts auf der Seite funktionieren weiter
- Kein JavaScript-Fehler bricht die Seite

### 7.3 Performance-Hinweise

- Die Engine nutzt `requestAnimationFrame` für das Rendering
- CSV-Dateien werden mit `{ priority: 'high' }` geladen (Fetch Priority Hint)
- Pro Chart wird **ein** `<canvas>`-Element erzeugt (Chart.js-Standard)
- Bei Re-Renders (Range-Wechsel, View-Toggle) wird `chart.update()` statt destroy/recreate genutzt

---

## 8. Responsive Verhalten

### 8.1 Zonen-Matrix

Die Engine definiert drei Zonen basierend auf der **Container-Breite** (nicht Viewport):

| Zone | Container-Breite | Verhalten |
|:-----|:-----------------|:----------|
| **S** (Small) | < 450px | Toolbar wird vertikal gestapelt, Buttons als Grid |
| **M** (Medium) | 450–899px | Standard-Layout |
| **L** (Large) | ≥ 900px | Dickere Linien, größere Punkte |

### 8.2 Was das Theme beachten muss

- Die Chart-Container werden die volle Breite des Content-Bereichs einnehmen
- Auf schmalen Screens (Mobile) wird das Chart automatisch in den S-Modus wechseln
- **Keine `max-width` auf den `.financial-chart-module`-Containern setzen** — das überlassen die Charts ihrem eigenen Responsive-System

---

## 9. Zusammenfassung: Checkliste für den Theme-Bau

### Pflicht (ohne diese funktioniert nichts)

- [ ] Chart.js geladen (`<script defer src="{{asset 'js/vendor/chart.umd.min.js'}}">`)
- [ ] Engine geladen (`<script type="module" src="{{asset 'js/fw-chart-engine/index.js'}}">`)
- [ ] Engine initialisiert (`engine.init()` auf `DOMContentLoaded`)
- [ ] Fonts geladen (Source Sans Pro 400/600/700, Archivo Black)
- [ ] Content-Bereich hat mindestens 300px Breite

### Empfohlen (für reibungslosen Betrieb)

- [ ] Fonts lokal statt Google Fonts (DSGVO)
- [ ] CSV-Upload-Workflow in Ghost getestet (Upload → URL → `data-csv`)
- [ ] Keine CSS-Überschreibungen auf `fw-*`-Klassen
- [ ] Ghost-Templates: Script-Einbindung in `post.hbs` (nicht global, wenn Charts nur in Artikeln vorkommen)

### Bekannte Einschränkungen

- **Lokalisierung:** Die Engine ist auf `de-DE` hardcoded (KDR 3). Zahlen werden immer deutsch formatiert.
- **Farben:** Aktuell in JavaScript hardcoded (KDR 14 — CSS-Variables Bridge ist geplant, aber noch nicht implementiert).
- **A11y-Tabellen:** Infrastruktur existiert, aber `getA11yData()` liefert aktuell leere Tabellen (offene Aufgabe).
- **Keine `style="height:..."` nötig:** Die Engine bestimmt die Chart-Höhe selbst. Manuelle `height`-Angaben auf dem Container können zu Problemen führen.

---

## 10. Architektur-Referenzen

Dieses Dokument basiert auf und verweist auf:

| Dokument | Relevanz |
|:---------|:---------|
| `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` | 5-Layer-Modell, KDR 1–14 |
| `docs/spec/Beschreibung HTML-Karten für Charts_v3.md` | HTML-Interface-Contract (Ursprungs-Spec) |
| `docs/spec/REDAKTEURS-HANDBUCH Chart-Integration.md` | Redakteurs-Perspektive (Gegenstück) |
| `docs/spec/Mobile versus Desktop.md` | Responsive-Zonen, Schriftgrößen |
| `docs/context/THEME-ASSEMBLY-CHECKLIST.md` | Checkliste für den Theme-Zusammenbau |
