# Coding Prompt: MSCI World Sparplan-Visualisierung → Ghost.io Integration

## Kontext & Ausgangslage

Ich habe eine funktionierende Single-HTML-App (`msci-sparplan.html`), die eine
MSCI World Sparplan-Analyse visualisiert. Sie soll in eine bestehende Ghost.io-Website
integriert werden. Das Ghost-Theme übernimmt Styling (Farben, Fonts, Layout-Rahmen).
Eine eigene Parser-Engine existiert bereits und liefert normalisierte Daten.

---

## Was die App macht

24 hypothetische 30-Jahres-Sparpläne auf den MSCI World (Startjahr 1972–1995) werden
verglichen. Jeder Plan hat $200/Monat konstante Nominalrate. Alle Endwerte sind
inflationsbereinigt in US-Dollar (Basis 2025). Kernbotschaft: Das Startjahr bestimmt
das Ergebnis (Spreizung 4×).

**Rendite-Basis:** MSCI World Net Total Return (USD). NTR = GTR minus historische
Dividendenrendite × 15% Quellensteuer (MSCI-Standard für institutionelle NTR).

**Inflation:** US CPI (BLS CPIAUCSL, Jahresdurchschnitt). Deflationierung auf 2025.

---

## Zielarchitektur nach Ghost-Integration

### Datenpipeline (außerhalb von Ghost, einmal jährlich im Januar)

```
msci_ntr.csv   →┐
                 ├→ Parser-Engine (Python, vorhanden) → sparplan_results.json
us_cpi.csv     →┘
```

**msci_ntr.csv** – Schema:
```csv
year,ntr_return
1972,0.2287
1973,-0.1486
...
```
`ntr_return` = Jahresrendite als Dezimalzahl (nicht in Prozent). Wird jedes Jahr
im Januar um eine Zeile ergänzt. Bestehende Zeilen werden nie geändert.

**us_cpi.csv** – Schema:
```csv
year,cpi
1972,41.8
1973,44.4
...
```
`cpi` = US CPI Jahresdurchschnitt (BLS CPIAUCSL, Basis 1982–84=100).
Wird analog jährlich ergänzt.

**sparplan_results.json** – Ausgabe der Parser-Engine, Schema:
```json
{
  "meta": {
    "generated_at": "2027-01-15",
    "base_year_cpi": 2025,
    "monthly_contribution_usd": 200,
    "index": "MSCI World NTR USD",
    "cpi_source": "BLS CPIAUCSL",
    "cohorts_count": 25
  },
  "cohorts": [
    {
      "start_year": 1972,
      "end_year": 2001,
      "label": "1972–2001",
      "months": 360,
      "nominal_invested": 72000,
      "nominal_end": 563072,
      "nominal_gain": 491072,
      "inflation_factor": 1.8069,
      "real_invested": 130097,
      "real_end": 1017414,
      "real_gain": 887317,
      "nominal_multiplier": 7.82,
      "real_multiplier": 7.82
    }
    // ... weitere Kohorten
  ]
}
```

**Felder erklärt:**
- `nominal_invested`: Gesamte eingezahlte Nominalsumme = months × 200
- `nominal_end`: Portfoliowert bei Laufzeitende, nominal
- `nominal_gain`: nominal_end − nominal_invested
- `inflation_factor`: CPI_2025 / CPI_end_year (immer > 1 für Pläne die vor 2025 enden)
- `real_*`: nominal_* × inflation_factor (in 2025-USD)
- `real_multiplier`: real_end / real_invested (= nominal_multiplier, da selber Faktor)

---

## Ghost-Integrationsstruktur

### Schicht 1: Ghost Site Header (einmalig, nie ändern)
```html
<!-- Chart.js Bibliothek -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js" defer></script>
```

### Schicht 2: Ghost HTML-Card (je Post, jährlich aktualisiert)
```html
<!-- 1. Daten injizieren -->
<script>
window.SPARPLAN_DATA = { /* Inhalt von sparplan_results.json */ };
</script>

<!-- 2. Render-Container -->
<div id="sparplan-app" class="sparplan-embed">
  <div id="sparplan-kpis"></div>
  <div id="sparplan-chart-wrap">
    <canvas id="sparplan-chart"></canvas>
  </div>
  <div id="sparplan-table-wrap"></div>
  <div id="sparplan-explainer"></div>
  <div id="sparplan-method"></div>
</div>

<!-- 3. Render-Skript -->
<script src="/assets/sparplan-render.js" defer></script>
```

### Schicht 3: Ghost Theme CSS (vom Theme-Entwickler)
Das Render-Skript nutzt CSS Custom Properties des Themes. Falls das Theme sie nicht
setzt, muss ein Fallback-Block in sparplan-render.js greifen:
```css
.sparplan-embed {
  --sp-primary: var(--ghost-accent-color, #01696f);
  --sp-text: var(--ghost-body-font-color, #28251d);
  --sp-surface: var(--ghost-background-color, #f9f8f5);
  --sp-border: #d4d1ca;
  --sp-gold: #c07a00;
}
```

---

## Was in sparplan-render.js muss

Die Render-Engine liest ausschließlich aus `window.SPARPLAN_DATA.cohorts`.
Sie enthält:

1. **Formatter-Funktionen**
   - `fmt(n, short)` – Deutsche Zahlenformatierung (de-DE Locale), Tausenderpunkt,
     Dezimalkomma. Short: Tsd./Mio./Mrd. statt K/M
   - `fmtFactor(n, decimals)` – Multiplikator mit ×
   - `fmtPercent(n, decimals)` – Prozentzahl mit Komma

2. **`buildKPIs()`** – 4 Kennzahlen-Karten: Bestes Jahr / Schwächstes Jahr /
   Spreizung / Durchschnitt. Liest aus `window.SPARPLAN_DATA.cohorts`.

3. **`buildChart()`** – Gestapeltes Balkendiagramm (Chart.js). X-Achse: Startjahre.
   Zwei Stacks: "Eingezahltes Kapital" (gold) + "Rendite" (teal/primary).
   Toggle: Real (2025 USD) vs. Nominal.

4. **`buildTable()`** – Detailtabelle mit Spalten:
   Zeitraum / Eingezahlt (nominal) / Endwert real / Rendite real /
   Eigenanteil (%) / Multiplikator / Markierung / Inflationsfaktor

5. **`buildExplainer()`** – Infobox "Real vs. Nominal" mit konkretem Beispiel
   aus der besten Kohorte (dynamisch aus den Daten)

6. **`buildMethod()`** – Methodikkasten mit 4 Stichpunkten:
   Index / Sparrate / Inflationsbereinigung / Zeitraum

7. **Theme-Toggle** – Nur einbauen wenn Ghost-Theme kein eigenes Dark-Mode-Toggle hat.
   Prüfen via: `document.documentElement.hasAttribute('data-theme')`

8. **Responsive**:
   - Chart-Container: `width: 100%; height: clamp(280px, 40vw, 420px)`
   - Tabelle: `overflow-x: auto` wrapper
   - KPI-Grid: `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`

---

## Was NICHT in sparplan-render.js darf

- Kein `<html>`, `<head>`, `<body>` – Ghost liefert das
- Kein Chart.js `<script>`-Tag – steht im Site Header
- Kein globaler Reset/Base-CSS – stört das Ghost Theme
- Keine eigenen Schriftarten laden – Ghost Theme übernimmt
- Kein Logo, kein Page-Header, kein Footer
- Kein `fetch()` oder externe API-Calls – Daten kommen via `window.SPARPLAN_DATA`

---

## Beiliegende Datei: msci-sparplan.html

Die HTML-Datei ist **vollständig funktionsfähig** als Standalone-App und enthält
Kommentare (`<!-- GHOST: ENTFERNEN -->`, `<!-- GHOST: BEHALTEN →render.js -->`,
`<!-- GHOST: INS THEME -->`) die genau markieren, welche Teile wohin gehören.

Nutze diese Datei als Referenz für:
- Die exakte Render-Logik (Chart-Konfiguration, Tooltip-Format, Farben)
- Die deutschen Zahlenformatter
- Die Tabellenstruktur inkl. Eigenanteil-Berechnung
- Den Explainer-Block Real vs. Nominal

---

## Jährliches Update-Verfahren (Doku für den Betreiber)

**Jeden Januar:**
1. Eine Zeile in `msci_ntr.csv` anhängen: `YYYY,0.XXXX`
2. Eine Zeile in `us_cpi.csv` anhängen: `YYYY,XXX.X`
3. Parser-Engine ausführen: `python sparplan_parser.py`
4. Inhalt von `sparplan_results.json` kopieren
5. Im Ghost-Post die `<script>window.SPARPLAN_DATA = ...` Zeile aktualisieren
6. Post speichern

**Keine Änderung** an `sparplan-render.js` nötig – die Render-Engine ist
datei-agnostisch und skaliert automatisch auf jede Anzahl von Kohorten.

---

## Qualitätscheckliste für das Coding-LLM

- [ ] `window.SPARPLAN_DATA` ist der einzige externe Datenpunkt
- [ ] Alle Zahlen verwenden `de-DE` Locale (Tausenderpunkt, Dezimalkomma)
- [ ] Chart reagiert auf Fenstergröße (responsive: true, maintainAspectRatio: false)
- [ ] Tabelle scrollt horizontal auf Mobile (overflow-x: auto)
- [ ] KPI-Kacheln umbrechen auf kleinen Screens (CSS Grid auto-fill)
- [ ] Kein CSS greift außerhalb von `.sparplan-embed` (kein globaler Scope)
- [ ] `buildKPIs/Chart/Table/Explainer/Method` lesen alle aus `window.SPARPLAN_DATA.cohorts`
- [ ] Ghost-Theme-Variablen werden als Primary Source genutzt, eigene Werte nur als Fallback
- [ ] Chart.js wird nicht nochmals geladen (nur `if(!window.Chart)` als Guard)
- [ ] Kein `localStorage`/`sessionStorage` (Ghost iFrames blockieren das)
