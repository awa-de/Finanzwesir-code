Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-5 Preflight (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-5 Preflight: Donut/Pie-Chrome-Vertragskarte — Ergebnisprotokoll

Status: GELB — Albert muss eine einzige fachliche Entscheidung treffen (Legendenbedeutung), bevor CE-5-Code formuliert werden kann. Alle anderen Slots sind eindeutig belegt. Reiner Preflight: kein Code, kein Test, kein Tool, keine Dokuänderung, kein Commit.

## Gelesene Quellen und Nutzungsinventar

**Pflichtquellen vollständig gelesen:**

```text
claude_prompt_AP-chart-engine-01_hauptuebergabe-gestaffelte-entwicklung.md
docs/spec/ARCHITECTURE STRATEGY PAPER VX.md (inkl. neue KDR 15)
docs/spec/Der Rucksack (Context Object Pattern).md (inkl. neuer Abschnitt 2.6)
docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md
docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md (§6.5, §6.11, §10 inkl. DOC-02/DOC-02a-Korrektur)
docs/steering/patches/AP-chart-engine-01_CE-4c_gemeinsamer-chrome-kern_rezeptzentralisierung_Ergebnis.md
docs/steering/patches/AP-chart-engine-01_DOC-02_semantischer-chrome-auftrag-und-erweiterungsvertrag_Ergebnis.md
docs/steering/patches/AP-chart-engine-01_DOC-02a_baukasten-paragraph10-konsistenznachtrag_Ergebnis.md
Theme/assets/js/fw-chart-engine/core/FwRenderer.js
Theme/assets/js/fw-chart-engine/core/ChartEngine.js
Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js
Theme/assets/js/fw-chart-engine/plugins/CenterTextPlugin.js
tests/engine/pie-ci.test.html
tools/engine-dom-check.js
```

Zusätzlich frühere CE-2b/CE-3-Ergebnisprotokolle konsultiert (F-05/F-06-Herkunft), da dort die einzige bestehende Erwähnung der Popover-Schranke (F-06) liegt.

**Repo-weite Grep-Suche (read-only), gescopt auf `tests/`, `Apps/`, `Theme/` (Vollrepo-Grep auf `data-type=` und `type: '...'` lief in Archiv-/Log-Verzeichnissen in Timeout; auf die produktiv relevanten Verzeichnisse eingegrenzt):**

| Muster | Treffer |
|---|---|
| `data-type="pie"` | `tests/engine/ci-theme-bridge.test.html` (1 Container), `tests/engine/tooltip-context.test.html` (1 Container), `tests/engine/pie-ci.test.html` (9 Container) |
| `data-type="doughnut"` | 0 Treffer (kein Testfall, keine App nutzt diesen Wert) |
| `type: 'pie'` | 0 Treffer im Produktivcode |
| `type: 'doughnut'` | genau 1 Treffer: `PieChartStrategy.js:259` (`getChartConfig()`, das an Chart.js übergebene Config-Objekt) |
| `PieChartStrategy` | `PieChartStrategy.js` selbst, `plugins/index.js` (kein Treffer — Barrel exportiert nur `CenterTextPlugin`, nicht die Strategy), `ChartEngine.js` (Import + `this.strategies['pie']`), `NAVIGATION.md`/Chroniken (rein historische AP-Referenzen) |
| `CenterTextPlugin` | `plugins/CenterTextPlugin.js` (Implementierung), `plugins/index.js` (Re-Export), `PieChartStrategy.js` (Import + `plugins: [CenterTextPlugin]`), NAVIGATION.md/Chroniken (historisch) |

**Ergebnis:** Kein Produktions-App nutzt aktuell einen Donut/Pie-Chart (`prokrastinations-preis` nutzt ausschließlich `type: 'line'`). Alle echten Donut/Pie-Aufrufer sind die drei genannten Testseiten. `PieChartStrategy` ist die einzige Datei, die `type: 'doughnut'` an Chart.js übergibt; die HTML-Seite deklariert `data-type="pie"`, `ChartEngine` löst darüber `this.strategies['pie']` auf (Strategy-Key ≠ Chart.js-internem Typ — das ist Ist-Stand, keine Inkonsistenz, da `ChartEngine.strategies` mit `'pie'` schlüsselt, während `PieChartStrategy.getChartConfig()` intern `type: 'doughnut'` an Chart.js reicht).

## Ist-Vertragskarte

### 1. Wie `PieChartStrategy` den Charttyp und seine Konfiguration erzeugt

- `transform()` (`PieChartStrategy.js:61-247`): Zwei Parse-Pfade (`_parseVerticalList`/`_parseHorizontalSnapshot`), Top-5-Aggregation mit „Weitere…“-Sammelsegment, Drill-Down-Payload (`_metaDetails` pro Segment). `fwContext` wird über `_createFwContext()` gepackt mit `chartType: 'pie'`, `axisType: 'NONE'` (V12.0.0 Explicit Opt-Out), `viewMode: 'composition'`, `infoSystem: 'CENTER_TEXT'` (Zeile 209-223).
- `meta: { totalSum, interactiveFilters: true }` (Zeile 242-245) — `interactiveFilters` ist **immer** `true`, unabhängig von Segmentanzahl (kein Single-/Multi-Asset-Unterschied wie bei Bar).
- `getChartConfig()` (Zeile 249-376): `type: 'doughnut'`, `cutout: '70%'`, `scales: undefined` (explizites Opt-Out gegen globale Achsen-Defaults), `plugins.tooltip.enabled: false` (Zeile 308), `plugins.centerText: { enabled: true, ... }` (Zeile 310-320) — Chart.js-Tooltip ist strukturell abgeschaltet, `CenterTextPlugin` übernimmt die Info-Anzeige.
- `onClick`/`onHover` (Zeile 280-373): Canvas-natives Chart.js-Event-Handling für Segment-Hover (Center-Text-Update) und Segment-Klick (Drill-down-Popup bei „Weitere…“-Segmenten über `fw-chart-show-details`-CustomEvent, Zeile 286-297) — beides Canvas-/Plugin-Ebene, kein DOM-Chrome.

### 2. Welche DOM-Slots `FwRenderer` für den Pie-/Donut-Pfad heute wirklich belegt

Beleg: `FwRenderer.js`, Aufrufkette `setupStructure()` (Zeile 154-205), mit `type = 'pie'` (Strategy-Key aus `ChartEngine._processContainer`/`state.type`):

| Slot | Ist-Zustand | Beleg |
|---|---|---|
| Wrapper | belegt, aber **ohne** Typmarker/Chrome-Anker. `wrapper.className = FW_CHROME_WRAPPER_CLASS` (Basis-Rezept `flex flex-col gap-3`, seit CE-4c für alle Typen einheitlich), aber `isLine`/`isBar` beide `false` → kein `classList.add('fw-chart-wrapper--line/--bar', 'fw-chart-chrome')`. | `FwRenderer.js:158-171` |
| Titel | belegt, aber mit dem **generischen** `'fw-chart-title'`-Fallback-CSS (Zeile 622: `.fw-chart-title { ... color: petrol; margin: 0 0 16px 0; font-size: 20px }`), nicht mit `FW_CHROME_TITLE_CLASS` (nur `isLine\|\|isBar`). | `FwRenderer.js:173-179`, `538` |
| BAN | **nie** — Gate ist `type === 'line' && config.headline` (Zeile 182); `PieChartStrategy` setzt `meta.headline` nirgends (kein Treffer im Diff-Beweis von CE-3/DOC-02-Recherche). | `FwRenderer.js:181-185` |
| Toolbar/Range-Control/View-Control | **nie** — `_renderControls()` gibt bei `type === 'pie'` sofort `null` zurück (erste Zeile der Methode). `PieChartStrategy.getViewOptions()` liefert zusätzlich strukturell `null` (Zeile 59). Doppelt abgesichert. | `FwRenderer.js:300-301`, `PieChartStrategy.js:59` |
| Legende | belegt, **interaktiv**, siehe Detailanalyse unten. | `FwRenderer.js:402-472`, `ChartEngine.js:651-686` |
| Canvas-Container/Canvas | belegt, identisch zu Line/Bar (`fw-chart-canvas-container relative w-full`, `<canvas>`), unverändert seit CE-2b. | `FwRenderer.js:193-204` |
| Caption | **nirgends implementiert** — Grep über den gesamten Engine-Ordner nach „Caption“/„caption“ ergibt 0 Treffer. Kein Charttyp (Line/Bar/Donut) hat heute einen Caption-Slot; §6.11 beschreibt ihn als Zielrezept, nicht als Ist-Code. | Grep, 0 Treffer |
| A11y-Tabelle/Statusflächen | belegt, identisch zu Line/Bar (`_renderA11yTable()`, `showLoading()`, `showError()`), typunabhängig. | `FwRenderer.js:495-527`, `72-97` |

### 3. Interaktive vs. nicht-interaktive Elemente; Legenden-Elementtyp, Klickpfad, `aria-*`, Sichtbarkeitsquelle

`_renderLegend()` (`FwRenderer.js:402-472`):

- `isPie = chartConfig.type === 'pie' || chartConfig.type === 'doughnut'` → `true` für Donut (Zeile 406).
- `isChromeLegend = (isLine || isBarRegular)` → **`false`** für Pie (weder `isLine` noch `isBarRegular` greifen; `isBarRegular` prüft `chartConfig.type === 'bar'`, hier `'doughnut'`).
- Damit läuft die Erstellung über den `else`-Zweig von `item.className = ...`: `item.className = 'fw-legend-item'` (Zeile 454) — ein **`<div>`**, **kein** `<button>`, **kein** `type="button"`, **kein** `aria-pressed` (Zeile 448-455). Das unterscheidet sich strukturell vom Line-/regulären-Bar-Chrome-Pill-Vertrag (`<button aria-pressed>`).
- Labels/Farben kommen aus dem `isPie || isRanking`-Zweig (Zeile 420-427): `labels = chartConfig.data.labels` (Segmentnamen), `bgColors = datasets[0].backgroundColor` (Array, ein Eintrag pro Segment) — der `index` ist der **Segmentindex**, nicht ein Dataset-Index (bei Pie gibt es nur ein Dataset).

**Klickpfad:** `ChartEngine._bindLegendEvents()` (Zeile 651-686) bindet einen Click-Listener auf `.fw-chart-legend`. Bei Klick auf `.fw-legend-item`:
1. `state.strategy.handleLegendClick(chart, index)` wird aufgerufen — bei Pie ist das `PieChartStrategy.handleLegendClick()` (Zeile 378-398): liest `ds._status[index]` (`'active'`/`'ghost'`), tauscht die Segmentfarbe gegen `theme.getGhostColor(originalColor)` bzw. zurück auf die Originalfarbe, ruft `chart.update('none')`. **Das ist eine echte, bereits produktive Segment-Ghosting-Interaktion**, keine reine Deko.
2. Danach (`ChartEngine.js:669-674`): `if (state.type === 'line' || state.type === 'bar') { … } else { item.classList.toggle('hidden-dataset'); }` — für Pie greift der `else`-Zweig: das `<div>` bekommt/verliert die Klasse `hidden-dataset` (visuelle Dämpfung: `opacity: 0.6`, Text durchgestrichen, Dot grayscale — CSS-Regeln `FwRenderer.js:548-550`).
3. **Sichtbarkeitsquelle:** Bei Pie gibt es **keine** Chart.js-`isDatasetVisible()`-Abfrage (das ist Dataset-Ebene; Pie hat nur ein Dataset mit vielen Segmenten). Der sichtbare/geisterhafte Zustand wird ausschließlich durch `ds._status[index]` (Strategy-internes Array) und die DOM-Klasse `hidden-dataset` gehalten — zwei parallele, synchron gehaltene, aber getrennte Zustandsquellen (Canvas-Farbe via `_status`, DOM-Optik via `classList`).

**Fachlicher Befund:** Dies ist **weder** „Sichtbarkeit von Datenreihen umschalten“ im Sinn des bereits belegten Line-/Bar-Bedarfs (dort: ganzes Dataset ein-/ausblenden via `chart.isDatasetVisible()`, dort ist genau eine Bedeutung dokumentiert und mit `FW_CHROME_LEGEND_*` verdrahtet) **noch** eine „rein informative Kategorienliste“ (es passiert etwas Reales beim Klick) **noch** ein „Drill-down-Auslöser“ (der Drill-down läuft über den Canvas-`onClick` auf „Weitere…“-Segmente, nicht über die Legende). Es ist der Sache nach am nächsten an „Segment-Toggle“, aber mit einer eigenen, bisher nirgends als Vertrag dokumentierten Ghosting-Semantik (Farbe abdunkeln statt Element komplett verbergen).

### 4. Warum `_renderControls()` beim Pie-/Donut-Pfad leer bleibt

Doppelt strukturell abgesichert, nicht zufällig: (a) `FwRenderer._renderControls()` returned `null` sofort bei `type === 'pie'` (erste Zeile der Funktion, vor jeder weiteren Logik); (b) `PieChartStrategy.getViewOptions()` liefert ohnehin `null`, sodass selbst ohne (a) `viewOptions` leer wäre. `ALLOWED_RANGES` ist zusätzlich ein leeres `Set` (`PieChartStrategy.js:56`) — Pie hat konzeptionell keinen Zeitraum-Begriff (`axisType: 'NONE'`).

### 5. `CenterTextPlugin` — Aufgabe, Zeichenort, Abgrenzung

`plugins/CenterTextPlugin.js`: Chart.js-Plugin (`id: 'centerText'`, Hook `beforeDraw`). Liest `chart.options.plugins.centerText` (von `PieChartStrategy.getChartConfig()` gesetzt) und `chart.activeSegment` (von `PieChartStrategy.onHover()` geschrieben — Canvas-internes Ephemeral-State, kein Domain-State, kein DOM). Zeichnet zwei Textzeilen (Label/Wert) direkt auf den Canvas-Context (`ctx.fillText`, Zeile 78-84), mit Auto-Fit-Schriftgrößenberechnung (`_fitText()`). **Kein DOM-Element, kein HTML, keine Tailwind-Klasse.** Das ist exakt die im Preflight-Auftrag beschriebene Canvas-/Plugin-Zuständigkeit (Layer 3 Brains/Face-Canvas-Anteil) — kein DOM-Chrome-Slot und kein Argument, den Donut wie eine Linie mit BAN zu behandeln, da BAN eine DOM-`aria-live`-Box ist und Center-Text ein Canvas-Zeichenvorgang.

### 6. `pie-ci.test.html` — Container/Fälle und CE-4c-Albert-QA

Drei Abschnitte, je 3 Fälle (9 Container gesamt), alle zum Test der Farb-/Gatekeeper-Logik (`test_data_torte_NEU.csv`, `test_data_torte.csv`, `test_data_torte2.csv`; „Valid“/„Default“/„Toxic“-Farbinjektion), **kein** Testfall adressiert gezielt Legenden-Interaktion oder Chrome-Migration. Aus CE-4c-Ergebnisprotokoll (Punkt 5 der manuellen Albert-QA): „Sichtprüfung ‚Optisch einwandfrei‘. `engine-dom-check.js`: 9/9 Container A11y-/Struktur-Block PASS … Chrome-Kern-Block korrekt mit ‚Kein Line-/Bar-Chrome-Container auf dieser Seite‘ übersprungen … bestätigt strukturell, dass kein Donut/Pie-Wrapper einen Typmarker oder den `fw-chart-chrome`-Anker trägt.“ Es liegt also eine bestehende, grüne Strukturbestätigung vor — aber keine Aussage zur Legenden-Semantik, da diese außerhalb des CE-4c-Scopes lag.

## Semantische Bedarfs-Matrix

| Slot | Bewertung | Beleg |
|---|---|---|
| Titel | **Vorhandener Bedarf genügt** | Wird für alle Typen erzeugt (`setupStructure()`); FW_CHROME_TITLE_CLASS ist reine Rezeptwiederverwendung, keine neue Semantik. §10-Tabelle: „Titel: ja/ja/ja“. |
| Headline/BAN | **Kein Bedarf** | Strukturell auf `type === 'line'` beschränkt (`FwRenderer.js:182`); `PieChartStrategy` erzeugt nie `meta.headline`. Center-Text im Loch übernimmt die Kennzahlrolle (Canvas, siehe unten). |
| Range-Control | **Kein Bedarf** | `_renderControls()` early-return bei `type==='pie'`; `PieChartStrategy.ALLOWED_RANGES` leer; kein Zeitachsenbegriff (`axisType:'NONE'`). |
| View-Control | **Kein Bedarf** | `PieChartStrategy.getViewOptions()` liefert `null`; kein View-Konzept für Snapshot-Kompositionsdaten. |
| Legende | **Neue fachliche Bedeutung — Albert-Entscheidung nötig** | Ist-Code interagiert real (Segment-Ghosting via `handleLegendClick()` + `classList.toggle('hidden-dataset')`), aber diese Bedeutung ist keine der vier Baukasten-Kandidaten deckungsgleich (siehe Detailanalyse Punkt 3 oben). Kein Beleg für „rein informativ“ (da real interaktiv) und kein Beleg für „identisch zur Line/Bar-Sichtbarkeitssemantik“ (andere Zustandsquelle, kein `isDatasetVisible()`). |
| Caption | **Kein Bedarf** (Ist-Stand engine-weit, kein Donut-Spezifikum) | 0 Treffer für „Caption“ im gesamten Engine-Ordner — für keinen Charttyp implementiert, kein CE-5-spezifisches Thema. |
| Center-Text im Donut-Loch | **Ausdrücklich Canvas, kein DOM-Slot** | `CenterTextPlugin.beforeDraw()` zeichnet direkt auf `ctx` (Chart.js-Canvas-API), erzeugt kein DOM-Element. Gehört zu Layer 3/Face-Canvas-Anteil, nicht zu §6.11. |

## Center-Text-/Canvas-Abgrenzung

Center-Text (`CenterTextPlugin`) ist vollständig Canvas-/Plugin-Besitz: Datenquelle ist `chart.activeSegment` (von `PieChartStrategy.onHover()` gesetzt, Canvas-Event-Handler) und die statischen `centerText`-Chart.js-Optionen aus `PieChartStrategy.getChartConfig()`. Es erzeugt kein DOM, keine Tailwind-Klasse, keinen `aria-live`-Bereich. Es ist **kein** Argument dafür, dem Donut eine BAN-artige DOM-Box zu geben — beide Mechanismen (BAN vs. Center-Text) sind laut Baukasten §10 bewusst getrennte, typspezifische Wege zur „großen Zahl“ (D-05: „Getrennt lassen, aber gemeinsame visuelle Grammatik“ für App-KPI/Engine-BAN; Center-Text ist ein dritter, Canvas-interner Weg, der von D-05 nicht erfasst wird und auch nicht erfasst werden muss, da er kein DOM ist).

## Wiederverwendung und Erweiterbarkeitsprüfung

- **Wrapper/Titel/A11y/Status:** `FW_CHROME_*`-Kern ist ohne Kopie oder Typ-Sonderrezept wiederverwendbar — Wrapper-Basisklasse ist bereits typunabhängig vergeben (`FW_CHROME_WRAPPER_CLASS` seit CE-4c für alle Typen), nur Titel bräuchte einen zusätzlichen `isPie`-Zweig analog zu `isLine||isBar`, um `FW_CHROME_TITLE_CLASS` statt des generischen Fallbacks zu ziehen — reine Rezeptwiederverwendung, keine neue Bedeutung, keine neue Konstante.
- **Strukturelle Ausnahme:** Ein reiner Marker/Fallback-Anker (z. B. `fw-chart-wrapper--pie` analog zu `--line`/`--bar`, falls künftig ein Pie-spezifisches Fallback-CSS nötig wird) wäre eine zulässige strukturelle Ausnahme im Sinn von §6.11 Punkt 3 („Charttypmarker sind ausschließlich strukturelle/fallback-begrenzende Ausnahmeanker“) — **keine** neue Rezeptfamilie, solange kein neuer visueller Wert entsteht.
- **Keine Line-/Bar-Pill-Semantik übertragbar:** Die Line-/Bar-Legend-Pill-Bedeutung („Sichtbarkeit von Datenreihen umschalten“, volles Ein-/Ausblenden eines Datasets über `chart.isDatasetVisible()`) passt nicht auf die bestehende Pie-Ghosting-Semantik (Segmentfarbe abdunkeln, Dataset bleibt immer eines). Eine rein optische Übernahme des Pill-Rezepts ohne geklärte Bedeutung wäre genau der in DOC-02/§6.11 Punkt 5(b) verbotene Fall „App-lokale/Charttyp-lokale Optikvariante ohne belegte Funktion“.
- **Reihenfolge bei Bedarf:** Falls Albert eine neue Legendenbedeutung für Pie bestätigt (z. B. „Segment-Toggle“ als eigener, vierter Bedarf neben den drei bestehenden), gilt §6.11 Punkt 4: zuerst ein kleiner Design-/Vertrags-AP, der die Bedeutung fixiert, danach genau ein neues Renderer-Primitive (keine Registry, kein App-Sonderweg, kein Kopieren der Line-/Bar-Pill-Konstanten).
- **Canvas/Plugins/Daten/Tooltips/Chart.js-Konfiguration:** bleiben in diesem Preflight und im gesamten CE-5-DOM-Chrome-Scope unangetastet — bestätigt durch die obige Ist-Vertragskarte (kein einziger der geprüften Canvas-Mechanismen (`CenterTextPlugin`, `onHover`, `onClick`, `cutout`, `scales: undefined`) hat einen DOM-Chrome-Bezug).

## Entscheidungsgate für Albert

```text
A. Der Donut braucht ausschließlich bereits definierte Bedarfe.
   → Trifft NICHT zu für die Legende (siehe Befund oben). Trifft zu für
     Titel/BAN/Range-Control/View-Control/Caption/Center-Text.

B. Der Donut braucht eine neue fachliche Bedeutung — hier: die Legende.
   → STOP vor Code für den Legenden-Slot. Zuerst einen kleinen
     Design-/Vertragsentscheid formulieren: Ist die bestehende
     Segment-Ghosting-Interaktion (Farbe abdunkeln, kein volles Verbergen)
     die gewollte Zielsemantik für CE-5, oder soll sie durch eine der
     anderen drei Baukasten-Kandidaten (rein informativ / Sichtbarkeit
     umschalten / Drill-down-Auslöser) ersetzt werden?
```

**Konkrete Frage an Albert:** Welche der vier Bedeutungen soll die Donut-Legende in CE-5 bekommen — (1) unverändert die bestehende Ghosting-Interaktion nur optisch auf Chrome migrieren, (2) auf „rein informative Kategorienliste“ vereinfachen (Interaktion entfernen), (3) auf „Sichtbarkeit von Datenreihen umschalten“-Semantik umstellen (fachlich nicht passend, da nur ein Dataset existiert), oder (4) als neuer vierter Bedarf „Segment-Toggle“ explizit in §6.11 nachgetragen werden? Titel/Wrapper/A11y/Status können unabhängig davon als „Vorhandener Bedarf genügt“ sofort in einen CE-5-Umsetzungs-AP übernommen werden; Range-Control/View-Control/BAN/Caption bleiben strukturell entbehrlich.

## Scope-QA

- `git status --short` vor der Lektüre: leer (`nothing to commit, working tree clean`, bestätigt durch `git status` und `git log --oneline -5`).
- `git status --short` nach Abschluss des Preflights: unverändert leer, bis auf diese neue Ergebnisdatei (`?? docs/steering/patches/AP-chart-engine-01_CE-5_preflight_donut-pie-chrome-vertragskarte_Ergebnis.md`).
- Keine durch den Preflight erzeugte Änderung an Produktcode, Tests, Tools oder anderer Dokumentation. Kein Fremdstand vorgefunden (Arbeitsbaum war zu Beginn vollständig sauber — der vorherige Commit `6470c71` hatte bereits alles eingecheckt).

## Nicht Teil dieses Preflights

Jede Code-, Test-, Tool-, Strategie-, Renderer-, Plugin-, Daten-, Canvas-, Theme-, Token- oder App-Änderung; jede neue `chromeIntent`-/`chromeRequest`-Runtime-API; jede Festlegung der Donut-Legenden-Interaktion (das ist genau die offene Albert-Entscheidung); jede Bewertung oder Veränderung von F-06 (Pie-Drill-down-Popover an `document.body` — bleibt eigene, unveränderte Entscheidungsschranke, hier nur referenziert); jede Browser-Steuerung oder Automation.

## Nächster zulässiger Schritt

Nur nach Alberts Entscheidung zur Legendenbedeutung (Entscheidungsgate oben): entweder (a) ein kleiner Design-/Vertrags-AP, der die gewählte Legendenbedeutung in §6.11 nachträgt (analog DOC-02-Muster), gefolgt von CE-5 als Umsetzungs-AP, oder (b) falls Albert die bestehende Ghosting-Interaktion unverändert als Zielsemantik bestätigt, kann dieser Entscheid direkt im CE-5-Umsetzungsauftrag dokumentiert werden, ohne separaten Zwischen-AP. Kein Code und kein Commit durch diesen Preflight.
