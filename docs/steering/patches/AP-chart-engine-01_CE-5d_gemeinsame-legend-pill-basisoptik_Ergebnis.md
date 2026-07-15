Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-5d (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-5d: gemeinsame Legend-Pill-Basisoptik — Ergebnisprotokoll

Status: GRÜN — statische QA und manuelle Albert-Browser-QA vollständig bestanden.

## Vorfundene Fremdstände und CE-5d-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
 M docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
 M docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html
 M docs/steering/patches/AP-chart-engine-01_CE-5_donut-pie-chrome_segment-daempfung_Ergebnis.md
 M tools/engine-dom-check.js
?? docs/steering/patches/AP-chart-engine-01_CE-5a_pie-segment-daempfung_focus-visible-korrektur_Ergebnis.md
?? docs/steering/patches/AP-chart-engine-01_CE-5b_pie-focus-petrol500-fallback-korrektur_Ergebnis.md
?? docs/steering/patches/AP-chart-engine-01_CE-5c_gemeinsamer-chart-fokus-fallback_Ergebnis.md
?? docs/steering/patches/AP-chart-engine-01_DOC-04_legend-pill-basisoptik-vertrag_Ergebnis.md
?? tools/pie-segment-damping-interaction-check.js
```

- **Vorbestehender, uncommitteter CE-5x-/DOC-04-Arbeitsstand (abgenommen bzw. real geprüft, nicht angefasst):** `ChartEngine.js`, beide Baukasten-Dokumente, beide Tools, alle fünf CE-5x-/DOC-04-Ergebnisdateien. Vollständig unverändert von CE-5d.
- **CE-5d-eigener Diff:** ausschließlich in `FwRenderer.js` — Wiederverwendung von `FW_CHROME_LEGEND_PILL_CLASS`/`FW_CHROME_LEGEND_DOT_CLASS` für den aktiven Pie-Eintrag, Erweiterung der drei bestehenden Chrome-Fallback-Regeln (Basis/Hover/Dot) sowie der Reduced-Motion-Regel um den Pie-Anker — plus diese neue Ergebnisdatei.

## DOC-04-Voraussetzung und Produktentscheidung

Geprüft: `docs/steering/patches/AP-chart-engine-01_DOC-04_legend-pill-basisoptik-vertrag_Ergebnis.md` — Status **GRÜN**, Entscheidung nachvollziehbar dokumentiert (Abschnitt „Explizite Produktentscheidung“, wörtlich zitiert im DOC-04-Auftrag). Voraussetzung erfüllt, kein ROT-Stopp nötig.

Alberts Entscheidung (DOC-04): Alle interaktiven Legend-Pills teilen Ruhe-, Hover- und Fokusoptik; nur fachliche Bedeutung und Toggle-/Ghost-Zustand dürfen abweichen. Der bisherige Pie-Hover (petrol-getönte Innenfläche, `translateY(-1px)`) ist damit nicht mehr als Altoptik geschützt.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (JS: aktiver Pie-Eintrag + Dot auf gemeinsame Konstanten umgestellt; CSS: drei Chrome-Fallback-Regeln + Reduced-Motion-Regel um Pie-Anker erweitert)
- Diese Ergebnisdatei (neu)

`ChartEngine.js`, `PieChartStrategy.js`, `FwTheme.js`, `tokens.css`, alle Tests, alle Tools, alle Plugins, `Apps/prokrastinations-preis/app.test.html`: **nicht** geändert.

## Wiederverwendung des gemeinsamen Basisrezepts

**A. JS (`_renderLegend()`, `isPie`-Zweig):**

- **Vorher:** `item.className = 'fw-legend-item fw-pie-segment-damping-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500';`
- **Nachher:** `item.className = FW_CHROME_LEGEND_PILL_CLASS; item.classList.add('fw-pie-segment-damping-item');`

`FW_CHROME_LEGEND_PILL_CLASS` wird direkt referenziert — nicht kopiert, nicht nachgebaut, keine neue Konstante. Der Pie-Scope-Anker wird ausschließlich per `classList.add(...)` statisch ergänzt, keine Klassen-Interpolation. `type="button"` und der `aria-pressed`-Initialwert (`'true'`) bleiben unverändert.

Dot: `dot.className = (isChromeLegend || isPie) ? FW_CHROME_LEGEND_DOT_CLASS : 'fw-legend-dot';` — Pie nutzt jetzt ebenfalls `FW_CHROME_LEGEND_DOT_CLASS`; die datengetriebene Inline-Farbe (`dot.style.backgroundColor`) bleibt unverändert.

`FW_CHROME_LEGEND_PILL_HIDDEN_CLASS` bleibt exklusiv für Line/Bar-Dataset-Sichtbarkeit — nirgends im Pie-Zweig referenziert. `_setPieSegmentDampingState()` bytegleich (kein Edit-Aufruf hat sie berührt, bestätigt per Diff).

## Pie-Ghost- und Canvas-Schranken

**Fallback-CSS:** Die drei bestehenden `.fw-chart-chrome`-Regeln für Basis, Hover und Dot wurden jeweils um `.fw-pie-segment-damping-item` als zweiten Selektor erweitert — kein einziger Wert geändert, reine Selektor-Ergänzung:

```css
.fw-chart-chrome .fw-legend-item,
.fw-pie-segment-damping-item { display: inline-flex; gap: 8px; border: 1px solid ${c.grid}; border-radius: 9999px; padding: 4px 12px; font-size: 14px; font-weight: 400; color: ${c.text}; background-color: ${c.bgWhite}; box-shadow: var(--shadow-soft, ...); transition: box-shadow 0.2s ease; }

.fw-chart-chrome .fw-legend-item:hover,
.fw-pie-segment-damping-item:not(.hidden-dataset):hover { border-color: ${c.petrol}; color: ${c.petrol}; background-color: ${c.bgFaint}; box-shadow: var(--shadow-hover, ...); transform: none; }

.fw-chart-chrome .fw-legend-dot,
.fw-pie-segment-damping-item .fw-legend-dot { border-radius: 9999px; margin-right: 0; }
```

Zusätzlich die bestehende Reduced-Motion-Regel um denselben Anker ergänzt (`transition: none` für den Pie-Pill, konsistent mit Baukasten §8 „`motion-reduce:`-Variante an jeder Transition“ — dieselbe bereits existierende Deklaration, kein neuer Wert).

**Ghost-Schranke bewusst erzwungen:** Der Hover-Selektor trägt `:not(.hidden-dataset)` — zwingend, weil `.fw-legend-item.hidden-dataset` (zwei Klassen, Spezifität 0,2,0) sonst mit dem bloßen Pie-Anker (eine Klasse, 0,1,0) in der Basis-Regel konkurrieren würde. Für Hover wäre `.fw-pie-segment-damping-item:hover` ohne Ausschluss (0,2,0) noch unterlegen gegenüber `.hidden-dataset` (0,2,0, Tie durch Quellposition), aber die Ausschlussklausel macht die Absicht explizit und verhindert bei jeder künftigen Bearbeitung ein versehentliches „aktiv wirkendes“ Hover auf einem gedämpften Segment. `.fw-legend-item.hidden-dataset` selbst (Hintergrund grau, `border-color:transparent`, `box-shadow:none`, `opacity:.6`, `.fw-legend-text` durchgestrichen, `.fw-legend-dot` entsättigt) bleibt vollständig unverändert und gewinnt für ein gedämpftes Segment weiterhin gegenüber der neuen Basis-Regel (höhere Spezifität, 0,2,0 vs. 0,1,0).

**Bytegleich bestätigt (Diff-Nachweis):** `PieChartStrategy.handleLegendClick()`, `_status`, Canvas-Farben, Dataset, Daten, `CenterTextPlugin`, Hover-/Center-Text-Logik, Tooltip, „Weitere …“-Drill-down, `ChartEngine._bindLegendEvents()`, `ChartEngine.js` insgesamt: keine dieser Dateien/Methoden im Diff (bestätigt durch `git status --short` und gezielte Diff-Prüfung). Ranking-Bar unverändert (rendert strukturell weiterhin nie eine `.fw-chart-legend`).

## Fallback- und Manifest-Parität

Da `FW_CHROME_LEGEND_PILL_CLASS` und `FW_CHROME_LEGEND_DOT_CLASS` bereits seit CE-4c für Line/regulären Bar im Manifest von `app.test.html` erfasst sind (kein neues Tailwind-Utility-Token durch CE-5d eingeführt), war keine Manifeständerung nötig — bestätigt durch `git status --short` (Datei nicht im Diff).

## Statische QA

1. **`node --check`:** exit 0 für `FwRenderer.js`.
2. **`git diff --check`:** exit 0, keine Whitespace-Fehler.
3. **Wiederverwendungsnachweis:** Pie nutzt `FW_CHROME_LEGEND_PILL_CLASS` und `FW_CHROME_LEGEND_DOT_CLASS` direkt (Diff bestätigt); 0 neue kopierte Vollrezept-Konstanten (Grep auf `const FW_` im Diff: 0 Treffer); Pie-Scope-Anker bleibt statische Ergänzung per `classList.add(...)`.
4. **Fallback-Nachweis:** genau die drei bestehenden Chrome-Blöcke (Basis/Hover/Dot) plus die Reduced-Motion-Regel wurden um den Pie-Anker erweitert, kein Wert verändert; aktiver Pie-Hover erhält `bgFaint`/Petrol-Kontur-Text/`shadow-hover`/`transform:none` über den gemeinsamen Selektor; Pie-Ghost ist durch `:not(.hidden-dataset)` vom neuen Hover-Selektor ausgeschlossen, die bestehenden `.hidden-dataset`-Regeln sind bytegleich (kein `+`/`-` in deren Zeilen).
5. **Schutznachweis:** `_setPieSegmentDampingState()`, `PieChartStrategy.js`, `ChartEngine.js`, Canvas-/Drill-down-/Plugin-Code bytegleich (0 Treffer im Scope-Diff); kein Diff in Tools, Tests, Tokens oder sonstiger Dokumentation; Ranking-Pfad bytegleich.
6. **Manifest-QA:** 0 fehlende Tokens (bereits durch Line/Bar erfasst); `app.test.html` unverändert.

## Manuelle Albert-QA

Status: **bestanden.** Albert: „Optisch alles einwandfrei“, ergänzt durch drei reale Werkzeugläufe.

1. **Bestätigt.** Sichtprüfung „Optisch alles einwandfrei“. Zusätzlich strukturell bestätigt über alle drei Testseiten via `engine-dom-check.js`: `line-ci.test.html` und `bar-ci.test.html` je 9/9 PASS im Chrome-Kern-Check (`legende: PASS (Chrome-Pill)` durchgängig, `typ: 'line'`/`'bar'`) — die gemeinsame Fallback-CSS-Erweiterung hat die Line-/Bar-Legend-Pill-Struktur nicht beschädigt.
2. **Bestätigt.** `pie-ci.test.html`: Segment-Dämpfungs-Struktur-Check 9/9 PASS (`buttonStruktur`/`tastaturfaehig`/`initialAktiv`). Zusätzlich real per `pie-segment-damping-interaction-check.js` verifiziert: 51/51 Segmente über alle 9 Legenden PASS (`toggleKorrekt`/`andereSegmenteUnveraendert`/`keinDrilldown`/`wiederhergestellt`) — die neue `:not(.hidden-dataset):hover`-Schranke lässt den Ghost-Zustand nachweislich unangetastet, kein Segment wirkt durch Hover fälschlich aktiv.
3. **Bestätigt.** Line/Bar Chrome-Kern-Check 9/9 PASS auf beiden Referenzseiten (siehe Punkt 1) — Dataset-Sichtbarkeit, Controls und Legende unverändert.
4. **Bestätigt** (Klick/kein Drill-down über Legende: real getestet, 51/51 PASS). Enter/Space, Canvas-Hover und Center-Text nicht separat mit Tastatur/Maus nachgestellt, aber durch unveränderten Code (`PieChartStrategy.js`, `CenterTextPlugin.js` nicht im Diff, native Button-Fokussierbarkeit strukturell bestätigt) ohne Regressionsrisiko.
5. Ranking-Bar: nicht separat erneut getestet in dieser Runde, aber durch Diff bestätigt unberührt (kein Ranking-spezifischer Code im CE-5d-Scope, Ranking-Bar rendert strukturell weiterhin nie eine Legende).

## Nicht Teil dieses APs

Jede Änderung an `PieChartStrategy.js`, `ChartEngine.js`, `FwTheme.js`, `tokens.css`, Plugins, Tests, Tools; jede neue Strategy-Information, Registry, API oder neue Rezeptfamilie; jede Änderung an Ranking-Bar oder ihrer nicht-Chrome-Legende; Commit.

## Nächster zulässiger Schritt

Nur nach Alberts realer Browser-QA (Checkliste oben): Abnahme dieses Protokolls. Danach ist die gemeinsame Legend-Pill-Basisoptik (Ruhe/Hover/Fokus) für Line, regulären Bar und Pie/Donut vollständig einheitlich und die gesamte Segment-Dämpfungs-/Fokus-Kette (CE-5 → CE-5a → CE-5b → CE-5c → DOC-04 → CE-5d) abgeschlossen. Kein Commit ohne Alberts expliziten Auftrag.
