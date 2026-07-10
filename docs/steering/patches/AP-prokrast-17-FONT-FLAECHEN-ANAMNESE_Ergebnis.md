Stand: 2026-07-10 19:04 | Session: AP-prokrast-17-FONT-FLÄCHEN-ANAMNESE | Geändert von: Claude

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein · **Typ:** Anamnese, kein Code

---

## 1. Gelesen

**Engine (core):** `FwRenderer.js`, `FwLayoutRules.js`, `FwTheme.js`, `ChartEngine.js`, `FwSmartTooltips.js`, `FwSmartXAxis.js`, `FwSmartYAxis.js`, `FwSmartScales.js`.
**Engine (plugins):** `FwChartTextPlugin.js`, `CenterTextPlugin.js`, `FwAnnotationPulsePlugin.js`, `FwVerticalLinePlugin.js`, `CrosshairPlugin.js`, `FwAnchorMeasurementPlugin.js`.
**Engine (strategies):** `LineChartStrategy.js`, `BarChartStrategy.js`, `PieChartStrategy.js`, `BaseChartStrategy.js`.
**Pilot:** `Apps/prokrastinations-preis/app.css`, `app.test.html`.
**CSS-Basis:** `Theme/assets/css/screen.css` (Font-Abschnitt + Base/Ghost-Content-Regeln), `Theme/assets/css/tokens.css` (Font-Tokens).

Nicht gelesen (bewusst, außerhalb Pflicht-Scope dieses APs): `app.js` (Container-Herkunft für A11y-Tabelle bleibt dadurch teilweise unklar, s. Abschnitt 4), `FwFormatUtils.js` (reine Zahlenformatierung, keine Font-Berührung laut Architektur-Layer).

---

## 2. Textflächen-Karte

### Pfad A — Canvas (Chart.js)

| # | Fläche | Font-Quelle | Datei + Zeile | Klassifikation |
|---|---|---|---|---|
| A1 | X-Achsen-Tick-Labels, Zeitachse (Line SNAPSHOT + Line/Bar PERIOD) | `FwLayoutRules.getResponsiveFont(ctx)` → private, nie `init()`'te `_theme = new FwTheme()` → `fonts.body` | `FwSmartXAxis.js:260,383` (Aufruf) · `FwLayoutRules.js:20,32` (Quelle) · `FwTheme.js:58` (Literal `"Source Sans Pro", sans-serif`) | Hardcode / gebrochen von CSS entkoppelt |
| A2 | X-Achsen-Tick-Labels, Kategorieachse (Bar Ranking-View) | `t.fonts.body` (t = injizierte, `init()`'te Theme-Instanz aus Composition Root AP-16c — `init()` bridged aber nur Farben, nicht `fonts`) | `BarChartStrategy.js:246` | Hardcode (andere Instanz als A1, gleicher Literalwert) |
| A3 | Y-Achsen-Tick-Labels | identisch zu A1 (`FwLayoutRules._theme.fonts.body`) | `FwSmartYAxis.js:117` (Aufruf) | Hardcode / gebrochen von CSS entkoppelt |
| A4 | Tooltip-Titel/-Body (Chart.js-natives Tooltip — **Canvas-gerendert**, siehe Korrektur unten) | identisch zu A1 (`FwLayoutRules.getResponsiveFont(ctx)`) | `FwSmartTooltips.js:111-117` | Hardcode / gebrochen von CSS entkoppelt |
| A5 | Data-/Wert-Labels an Datenpunkten | — kein separates Canvas-Datalabel-Plugin importiert (kein `chartjs-plugin-datalabels`) | — | Fläche existiert nicht als eigener Mechanismus; deckungsgleich mit A6 (persistente Textannotation) |
| A6 | Annotations-/Marker-Text (Rubikon ✅/❓, `anchor:'lastPoint'`) | `ctx.font = ... + 'px sans-serif'` — Literal **`sans-serif`**, nicht einmal `"Source Sans Pro"` | `FwChartTextPlugin.js:95` | Hardcode-Literal, abweichend von allen anderen Canvas-Flächen; Rubikon ist laut Auftrag entkoppelt/Backlog (DS-FOLLOWUP-07 / AP-prokrast-17-FOLLOWUP-FONT) |
| A7 | KPI-/Zentrums-Text (Donut-Mitte) | Plugin-Default `'"Source Sans Pro", sans-serif'`, aktiv überschrieben mit `t.fonts.body` | `CenterTextPlugin.js:45-46` (Default) · `PieChartStrategy.js:314-315` (Injection) | Hardcode (über Options injiziert, gleiche FwTheme-Quelle wie A2/A4) |
| A8 | Canvas-Legende | — | — | Existiert nicht: alle 3 Strategien setzen `legend: { display: false }` (`LineChartStrategy.js:405`, `BarChartStrategy.js:278`, `PieChartStrategy.js:302`) — Legende ist ausschließlich HTML (Pfad B) |
| A9 | Chart-Titel/-Untertitel auf Canvas | — | — | Existiert nicht: kein `options.plugins.title` in irgendeiner Strategie; Titel ist ausschließlich HTML `<h3 class="fw-chart-title">` (Pfad B) |

### Pfad B — HTML/DOM (Browser rendert; Font via engine-injizierten `<style>`-Block oder CSS-Kaskade)

| # | Fläche | Font-Quelle | Datei + Zeile | Klassifikation |
|---|---|---|---|---|
| B1 | Tooltips | **entfällt** — siehe Korrektur unten (gehört zu A4) | — | — |
| B2 | Legende / Pills | `.fw-chart-wrapper { font-family: ${f.body}; }` — Legend-Items erben (kein eigenes `font-family` auf `.fw-legend-item`) | `FwRenderer.js:409` (Regel) · `FwRenderer.js:312-366` (`_renderLegend`) | Hardcode, engine-injizierter Inline-Style |
| B3 | Range-Buttons / View-Toggle (Pills) | `.fw-btn, .fw-toggle-opt { font-family: ${f.body}; }` | `FwRenderer.js:414` (Regel) · `FwRenderer.js:248-310` (`_renderControls`) | Hardcode, engine-injizierter Inline-Style |
| B4 | BAN-Headline (Big Accessible Number) | `.fw-ban-main/-sub/-hint { font-family: ${f.body}; }` | `FwRenderer.js:447-449` (Regel) · `FwRenderer.js:487-609` (`_renderBAN`) | Hardcode, engine-injizierter Inline-Style |
| B5 | Popover (Drill-Down) | `.fw-chart-popover { font-family: ${f.body}; }`, Kinder erben | `FwRenderer.js:430` (Regel) · `FwRenderer.js:161-239` (`_createPopoverUI`) | Hardcode, engine-injizierter Inline-Style |
| B6 | A11y-Datentabelle (`_renderA11yTable`) | **kein eigenes `font-family`** im injizierten CSS-Block; Tabelle hängt direkt an `container`, außerhalb von `.fw-chart-wrapper` | `FwRenderer.js:368-399` | **Unklar** — Quelle hängt vom umgebenden Kontext ab (screen.css-Body bei Ghost-Artikel-Einbettung vs. `.fw-app`-Fallback bei Pilot-Einbettung); `app.js` (Container-Herkunft) nicht im Pflicht-Scope dieses APs gelesen |
| B7 | Fehlermeldung der Engine (`showError`) | `div.style.fontFamily = f.body` | `FwRenderer.js:55` | Hardcode, explizites Inline-Style |
| B8 | Leerzustand (`showLoading`) | — kein Text, nur Spinner-Element | `FwRenderer.js:38-46` | Keine Textfläche |
| B9 | App-Fließtext/-Chrome im Piloten (Headlines, Slider-Label, Journey-Buttons, Quellenzeile, CTA, AssumptionsBox) | `.fw-app { font-family: var(--fw-font-base, sans-serif); }` — einzige Font-Regel in `app.css`, alle Kinder erben | `app.css:13` | Gebrochen/Fallback `sans-serif` — bekannte Bruchstelle (Namens-Mismatch, AP-17-FONT-ANAMNESE) |
| B10 | app.test.html eigener Body-Font | `body { font-family: sans-serif; ... }`, explizit als Dev-Harness-only markiert | `app.test.html:13` | Dev-Harness-Hardcode, nicht produktionsrelevant, betrifft nur Test-Chrome außerhalb `.fw-app` |

---

## 3. Neu gefundene Flächen / Befunde (nicht in der Vorabliste)

1. **Korrektur der Aufgaben-Vorabliste:** Tooltips sind **keine HTML/DOM-Fläche**. Es existiert kein `external`-Callback für ein Custom-HTML-Tooltip — Chart.js rendert die Tooltip-Box nativ auf Canvas. Tooltips gehören daher zu **Pfad A** (A4), nicht zu Pfad B wie in der Vorabliste vorausgesetzt.
2. **Toter Parameter — Y-Achse:** Alle drei Strategien übergeben `family: ciFont` im `fontConfig` an `FwSmartScales.getSmartYAxis()` (`LineChartStrategy.js:420-425`, `BarChartStrategy.js:270-275`). `FwSmartYAxis.compute()` liest diesen Wert nirgendwo — `ticks.font` ruft ausschließlich `FwLayoutRules.getResponsiveFont(context)` auf (`FwSmartYAxis.js:117`). Der übergebene Font-Wert hat aktuell keine Wirkung.
3. **Toter Parameter — Tooltip:** `LineChartStrategy.js:388-389` und `BarChartStrategy.js:280-281` übergeben `titleFont`/`bodyFont: { family: ciFont }` an `FwSmartTooltips.configure(fwContext, styleConfig)`. Die Methode nutzt `styleConfig` nachweislich nur für Farben/Hintergrund (`tooltipBg`, `titleColor`, `bodyColor`, `borderColor`) — `titleFont`/`bodyFont` werden intern fest auf `FwLayoutRules.getResponsiveFont(ctx)` gesetzt (`FwSmartTooltips.js:111,117`) und ignorieren den übergebenen Wert vollständig.
4. **Zwei getrennte, beide nie CSS-gebrückte Font-Quellen:** A1/A3/A4 laufen über eine private, modul-lokale `FwTheme`-Instanz in `FwLayoutRules.js:20` (Kommentar dort bestätigt explizit: „`init()` wird hier NICHT aufgerufen"), während A2/A7/B2-B7 über die vom Composition Root injizierte, `init()`'te Instanz (`ChartEngine.js:87-93`) laufen. Beide liefern aktuell denselben Literalwert, weil `FwTheme.init()` ausschließlich `this.colors` überschreibt (`FwTheme.js:112-172`) — `this.fonts` bleibt in beiden Fällen der Hardcode aus dem Constructor (`FwTheme.js:57-60`). Bestätigt und konkretisiert (mit Flächen-Zuordnung) den bereits in der vorherigen Anamnese (`AP-prokrast-17-FONT-ANAMNESE`) gefundenen Kernbefund.
5. **`screen.css` selbst nutzt die Font-Tokens aus `tokens.css` nicht:** `tokens.css` definiert `--font-display`/`--font-body` (Zeilen 87-88), aber `screen.css` referenziert diese nirgendwo per `var(...)` — Body/Headings/Tabellen in `screen.css` nutzen weiterhin die Literale `'Source Sans Pro', sans-serif` bzw. `'Archivo Black', sans-serif` direkt (`screen.css:79,101,109,160,209`). Die Werte sind identisch zu den Tokens, aber die Kaskade läuft nicht über sie — anders als bei Farben, wo `screen.css` `var(--color-*)` konsequent nutzt.

---

## 4. Unklare Fälle

- **B6 (A11y-Datentabelle):** Font-Quelle nicht eindeutig bestimmbar ohne `app.js`-Lektüre (Container-Herkunft je Einbettungskontext unterschiedlich: Ghost-Artikel vs. Pilot-`.fw-app`). Nicht geraten — als offen markiert.

---

## 5. Zuordnung zu den zwei Write-APs

**Write-AP A — Canvas-Fonts:** A1, A2, A3, A4, A7 (alle über `FwTheme.fonts.body`/`getResponsiveFont` laufenden Flächen — X-/Y-Achsen-Ticks, Tooltip, Donut-Center-Text). A6 (Rubikon-Symbolmarker-Text) ist gefunden und Font-technisch identisch betroffen (`sans-serif`-Hardcode), aber laut Auftrag **entkoppelt** (Backlog DS-FOLLOWUP-07 / AP-prokrast-17-FOLLOWUP-FONT) — nicht Teil von Write-AP A, eigener Nachlauf nach Rubikon-Neumessung.

**Write-AP B — HTML-UI-Fonts:** B2 (Legende/Pills), B3 (Range-Buttons/Toggle), B4 (BAN), B5 (Popover), B7 (Fehlermeldung) — alle über den engine-injizierten `<style id="fw-chart-styles">`-Block in `FwRenderer._injectStyles()`. B9 (App-Fließtext im Piloten, `app.css:13`) als zusätzliche, vom Engine-Block unabhängige Bruchstelle (eigener Fix: `--fw-font-base` → `--font-body`, bereits in AP-17-FONT-SPEC-PARITÄT als Ziel dokumentiert). B6 offen (s. Abschnitt 4). B10/app.test.html: kein Fix nötig (Dev-Harness-only).

**Doppelte Abschlussfrage:**
- **Nächster AP (Erwartung):** Write-AP A — Canvas-Fonts (Opus, metriksensibel wegen Rubikon-Nachbarschaft bei A6/A7), danach Write-AP B — HTML-UI-Fonts (Opus).
- **Was nicht der nächste AP ist:** Rubikon-Symbolmarker-Neumessung (eigener Backlog-Punkt, entkoppelt), andere Apps, Tailwind, Design-Entscheidungen, jede Code-Änderung in diesem AP selbst.

---

## Chat-Ausgabe (Kurzfassung)

**Status:** GRÜN · **Blocker:** nein.
**Flächen gefunden:** 9 Canvas (davon 2 nicht-existent bestätigt: Canvas-Legende, Canvas-Titel) + 10 HTML/DOM (davon 1 „entfällt" — Tooltip-Korrektur).
**Überraschend:** Tooltips sind Canvas, nicht HTML (Korrektur der Vorabliste) · zwei tote Font-Parameter (Y-Achse, Tooltip) · zwei parallele, beide nie CSS-gebrückte FwTheme-Quellen · `screen.css` nutzt eigene Font-Tokens selbst nicht.
**Unklar:** A11y-Datentabelle (B6) — kontextabhängig, `app.js` nicht gelesen.
**Zuordnung:** Write-AP A (Canvas: Achsen, Tooltip, Donut-Center) → Write-AP B (HTML-UI: Legende, Pills, BAN, Popover, Fehlermeldung, App-Fließtext). Rubikon bleibt entkoppelt.
**Kein Commit, kein Abschlussritual, kein Folge-AP-Start ohne Alberts ausdrückliches OK.**
