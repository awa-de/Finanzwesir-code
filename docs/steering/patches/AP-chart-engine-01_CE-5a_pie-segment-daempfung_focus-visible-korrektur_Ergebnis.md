Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-5a (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-5a: Pie-Segment-Dämpfung, focus-visible-Korrektur — Ergebnisprotokoll

Status: GELB — statische QA vollständig bestanden; die eigenständige, hier eingeführte Fallback-Regel wurde durch CE-5c (gemeinsamer Chart-Fokus-Fallback) ersetzt, bevor eine separate manuelle Albert-QA speziell für CE-5a stattfand. **Aufgehoben durch CE-5c** — CE-5c hat den korrekten Petrol-500-Ring inkl. Pie real im Browser bestätigt (Albert: „Fokus auf Line/Bar/Pie in S/M/L geprüft und ok“); der Kern dieses APs (echter Anker + `focus-visible`-Semantik statt nativem Browser-Standard) bleibt gültig, nur der konkrete Regelkörper wurde in CE-5c aktualisiert (kein Offset mehr).

## Vorfundene Fremdstände und CE-5a-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
 M docs/steering/patches/AP-chart-engine-01_CE-5_donut-pie-chrome_segment-daempfung_Ergebnis.md
 M tools/engine-dom-check.js
?? tools/pie-segment-damping-interaction-check.js
```

- **Vorbestehender, uncommitteter CE-5-Arbeitsstand (von Albert manuell geprüft, nicht angefasst):** `ChartEngine.js`, `tools/engine-dom-check.js`, `tools/pie-segment-damping-interaction-check.js`, die CE-5-Ergebnisdatei. Vollständig unverändert von CE-5a — keine Zeile davon berührt.
- **CE-5a-eigener Diff:** ausschließlich zwei zusätzliche, isolierte Ergänzungen in `FwRenderer.js` (statischer Klassenanker + Fokus-Tokens am Pie-Button-Literal; neue, ausschließlich an diesen Anker gebundene `:focus-visible`-Fallback-Regel), plus diese neue Ergebnisdatei.

## Ursache und begrenztes Designziel

CE-5 hat die Pie-Legendeneinträge korrekt zu echten `<button type="button" aria-pressed>` gemacht, aber ohne eigene `:focus-visible`-Regel — der Browser zeigte deshalb seinen nativen, plattform-/browserabhängigen Fokus (schwarz/orange je nach Screen), kein bewusst gestalteter, CI-konsistenter Zustand. Ziel: derselbe petrol-/türkisfarbene, abgesetzte Fokusring, den die Button-Familie (Baukasten §6.4) und der A11y-Vertrag (§8) bereits für alle interaktiven Primitiven verlangen — ausschließlich bei Tastaturfokus (`:focus-visible`), nie als dauerhafte Maus-Kontur, ohne die abgenommene Ruhe-/Hover-/Ghost-Optik der Segment-Dämpfung zu verändern.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (zwei isolierte Ergänzungen, siehe unten)
- Diese Ergebnisdatei (neu)

`ChartEngine.js`, `PieChartStrategy.js`, `CenterTextPlugin.js`, alle Tests, alle Tools, `Apps/prokrastinations-preis/app.test.html`: **nicht** geändert.

## Umgesetzter Pie-spezifischer Fokusvertrag

**A. Statischer, Pie-spezifischer Anker** (`FwRenderer._renderLegend()`, `isPie`-Zweig): Das Klassenliteral der Pie-Legendeneinträge trägt jetzt zusätzlich zu `fw-legend-item` den neuen, semantischen Scope-Anker `fw-pie-segment-damping-item` sowie das vollständige, statische Fokus-Token-Literal der Button-Familie:

```text
fw-legend-item fw-pie-segment-damping-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2
```

Ein einziges statisches String-Literal, keine dynamische Klassenbildung, keine Verkettung, keine Interpolation (Baukasten §2.2). Der Anker bleibt bei aktivem UND gedämpftem Eintrag erhalten, weil `_setPieSegmentDampingState()` ausschließlich `classList.toggle('hidden-dataset', ...)` nutzt (kein `className`-Ersatz) — unverändert seit CE-5, hier nur bestätigt, nicht angefasst.

**B. Tailwind-freier Fallback** (`_injectStyles()`, direkt nach den bestehenden Pie-Legenden-Zuständen, vor `.fw-loading-container`):

```css
.fw-pie-segment-damping-item:focus-visible { outline: none; box-shadow: 0 0 0 2px ${c.bgWhite}, 0 0 0 4px ${c.petrol}; }
```

Ausschließlich vorhandene Theme-/CI-Farbwerte (`c.bgWhite`, `c.petrol`), kein Hexwert, keine neue Designvariable. Die Regel ist ausschließlich an den neuen, Pie-eigenen Anker gebunden — `.fw-legend-item`, `.fw-chart-chrome` und alle bestehenden Line-/Bar-Rezepte bleiben unverändert. Gleiche Spezifität (zwei Klassen-Ebenen) wie `.fw-legend-item:hover`/`.fw-legend-item.hidden-dataset`; da die neue Regel im Quelltext später steht, überlagert ihr Box-Shadow den Ruhe-/Hover-/Ghost-Schatten ausschließlich während `:focus-visible` (gilt für aktiven und gedämpften Eintrag gleichermaßen) — bei Fokusverlust kehren die bisherigen Werte automatisch zurück, da `:focus-visible` eine native, JS-freie CSS-Pseudoklasse ist.

**C. Manifest:** Alle vier benötigten Tokens (`focus-visible:outline-none`, `focus-visible:ring-2`, `focus-visible:ring-petrol-500`, `focus-visible:ring-offset-2`) sind bereits im bestehenden `@source inline(...)`-Manifest von `app.test.html` enthalten (Herkunft: Slider-Field-Rezept, Baukasten §6.6, identisches Fokusring-Literal). 0 fehlende Tokens — `app.test.html` bleibt bytegleich unverändert.

## Fallback- und Manifest-Parität

Siehe B/C oben — der Tailwind-Rezept-Pfad (App-Testseiten mit CDN) und der Tailwind-freie Fallback-Pfad (Engine-Testseiten `pie-ci.test.html`/`ci-theme-bridge.test.html`/`tooltip-context.test.html`) bilden denselben visuellen Ring nach, ausschließlich über den neuen, eng gefassten Anker — keine zweite Designquelle.

## Schutzschranken und Byte-Nachweise

- `git status --short` nach Abschluss zeigt ausschließlich `FwRenderer.js` zusätzlich verändert (gegenüber dem vorgefundenen CE-5-Stand) — `ChartEngine.js` nicht berührt.
- **Negativnachweis:** Grep über `FwRenderer.js` nach `:focus-visible`/`:focus` zeigt ausschließlich die neue, eng gebundene `.fw-pie-segment-damping-item:focus-visible`-Regel sowie zwei erklärende Kommentarzeilen — keine generische `.fw-legend-item:focus-visible`-Regel, kein `:focus` ohne `-visible`.
- `PieChartStrategy.handleLegendClick()`, `ChartEngine._bindLegendEvents()`, `FwRenderer._setPieSegmentDampingState()`: bytegleich zum vorgefundenen CE-5-Stand — keine dieser drei Stellen wurde in diesem AP editiert (kein Edit-Aufruf hat sie berührt).
- Keine Änderung an `hidden-dataset`, Ghosting, Daten, Dataset-Sichtbarkeit, Canvas, Segmentfarben, Tooltip, Center-Text, Hover-Verhalten oder „Weitere …“-Drill-down.
- Line, regulärer Bar und Ranking-Bar bleiben bytegleich — keine generische `.fw-legend-item:focus-visible`-Regel wurde ergänzt, die andere Charttypen mitgefasst hätte; die neue Regel ist ausschließlich über `.fw-pie-segment-damping-item` erreichbar, eine Klasse, die nur der Pie-Zweig vergibt.

## Statische QA

1. **Scope-QA:** `git status --short` bestätigt: nur `FwRenderer.js` zusätzlich verändert; vorbestehender CE-5-Stand und Fremdstände (`ChartEngine.js`, beide Tools, CE-5-Ergebnisdatei) unangetastet.
2. **`node --check`:** exit 0 für `FwRenderer.js`.
3. **`git diff --check`:** exit 0, keine Whitespace-Fehler.
4. **Negativnachweis:** keine neue generische `.fw-legend-item:focus-visible`-Regel; kein `:focus` ohne `-visible`; `ChartEngine.js`, `PieChartStrategy.js`, Plugins, Tests, Tools unverändert (bestätigt durch Scope-QA).
5. **Positivnachweis:** Die Pie-Segment-Dämpfungs-Buttons tragen den statischen Pie-Anker (`fw-pie-segment-damping-item`) und exakt den dokumentierten vierteiligen `focus-visible`-Tokenvertrag; genau eine entsprechend eng begrenzte Fallback-Regel existiert; der Fallback verwendet ausschließlich vorhandene Theme-Werte (`c.bgWhite`, `c.petrol`), keine Hexfarbe; `aria-pressed`-/Ghosting-Code ist bytegleich (siehe „Schutzschranken" oben).
6. **Manifest-QA:** alle vier tatsächlich verwendeten Tokens bereits erfasst (Herkunft Slider-Field-Rezept); `app.test.html` unverändert.

## Manuelle Albert-QA

Status: **offen** — noch keine reale Browser-Rückmeldung von Albert zu diesem AP.

1. In `tests/engine/pie-ci.test.html` auf S, M und L: Per Tab auf einen aktiven und einen gedämpften Legendeneintrag gehen. Der Ring sollte überall petrol/türkis mit sichtbarem Abstand erscheinen — kein schwarzer oder oranger Browser-Standard-Ring mehr.
2. Maus-Klick auf einen Legendeneintrag: keine dauerhafte Fokus-Kontur; Hover, Ruhe und ghost sehen ansonsten exakt wie vor CE-5a aus (unverändert seit CE-5, von Albert bereits bestätigt).
3. Enter und Space auf einem fokussierten Eintrag: Segment-Dämpfung, Rückweg und `aria-pressed` funktionieren wie in CE-5 bereits bestätigt (51/51 PASS, `pie-segment-damping-interaction-check.js`).
4. Je ein Line- und Bar-Referenzfall: deren bestehende Chrome-Pills und Fokusdarstellung sind unverändert (bereits von Albert bestätigt für die CE-5-Änderungen; hier nochmal zu bestätigen, dass CE-5a keine neue Abweichung einführt).

## Nicht Teil dieses APs

Jede Änderung an `ChartEngine.js`, `PieChartStrategy.js`, Plugin-Code, Tests, Tools, Spec-/Design-Dokumentation, `tokens.css`, App-Logik oder Session-Log; jede Änderung an Ruhe-/Hover-/Ghost-Optik, Daten, Canvas, Tooltip, Center-Text oder Drill-down; jede neue Rezeptfamilie, jedes Framework, jede Registry, jede neue öffentliche API; Commit.

## Nächster zulässiger Schritt

Nur nach Alberts realer Browser-QA (Checkliste oben): Abnahme dieses Protokolls zusammen mit dem bereits weitgehend bestätigten CE-5-Protokoll. Danach gilt die Pie-Segment-Dämpfung als vollständig abgeschlossen (Struktur, Interaktion, Fokusdarstellung) — offen bleibt nur noch eine Entscheidung, ob Wrapper/Titel-Feinschliff für Pie in einem eigenen, kleinen Folge-AP nachgezogen werden soll (siehe CE-5-Ergebnisdatei, „Nicht Teil dieses APs"). Kein Commit ohne Alberts expliziten Auftrag.
