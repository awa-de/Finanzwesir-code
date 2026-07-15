Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-5 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-5: Donut/Pie-Chrome mit Segment-Dämpfung — Ergebnisprotokoll

Status: GELB — statische QA und Kernpunkte der manuellen Albert-Browser-QA (Struktur + Klick-Rundreise) bestanden; Canvas-/Drill-down- und Line-/Bar-Referenzcheck sowie eine Fokusring-Rückfrage stehen noch aus.

Kettenposition: CE-4/CE-4c, DOC-02/DOC-02a, CE-5-Preflight und DOC-03 sind committed (Voraussetzung erneut geprüft, siehe unten). Dieser AP migriert die Donut-/Pie-Legende auf ein echtes, A11y-fähiges Renderer-Primitive für die in DOC-03 entschiedene Bedeutung „Segment-Dämpfung umschalten“ — ohne die abgenommene Optik oder Funktion zu verändern.

## Vorfundene Fremdstände und CE-5-eigener Diff

`git status --short` vor dem ersten Write: leer (`nothing to commit, working tree clean`).

`git status --short` nach Abschluss:

```text
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
```

Kein Fremdstand vorgefunden. Beide geänderten Dateien sind vollständig CE-5-eigener Diff.

**Voraussetzungsprüfung (Prompt-Pflicht vor dem ersten Write):** `git log --oneline` bestätigt CE-4/CE-4c (`76d7080`) und DOC-02/DOC-02a+DOC-03+CE-5-Preflight (zwei Folgecommits nach `76d7080`, working tree davor vollständig sauber) als committed. Voraussetzung erfüllt.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (+26/−2 Zeilen)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (+7 Zeilen)
- Diese Ergebnisdatei (ersetzt die vorherige ROT-Fassung)

`Apps/prokrastinations-preis/app.test.html` **nicht** geändert — kein neues vollständiges Tailwind-Literal wurde eingeführt (Begründung siehe „Wiederverwendung statt Neubau“ unten), daher 0 fehlende Manifest-Tokens. `PieChartStrategy.js`, `CenterTextPlugin.js`, `FwTheme.js`, `tokens.css`, alle Tests: nicht geändert.

**Tooling-Nachtrag (auf Alberts direkten Auftrag, nach erster Sichtprüfung):** `tools/engine-dom-check.js` um einen additiven, rein strukturellen „Segment-Dämpfungs-Struktur-Check“-Block erweitert (echter `<button>`, `aria-pressed` vorhanden, Fokussierbarkeit, Initialzustand — read-only, passt zum dokumentierten Vertrag des Tools). Neues, separates Werkzeug `tools/pie-segment-damping-interaction-check.js` (NEU) für die Klick-Rundreise (dämpfen/wiederherstellen, andere Segmente unverändert, kein Drill-down) — bewusst nicht in `engine-dom-check.js`, da es echte Klicks simuliert und damit kurzzeitig echten Zustand mutiert (dokumentiert im Dateikopf).

## Vorher-Nachher-Paritätskarte

Committed Ausgangsstand (`git show HEAD:...` vor CE-5) geprüft. Pie-spezifische Ist-Werte, unverändert seit vor CE-5:

| Element | Ist-Wert (unverändert) | Quelle |
|---|---|---|
| Wrapper | `FW_CHROME_WRAPPER_CLASS` (`flex flex-col gap-3`), **kein** Typmarker, **kein** `fw-chart-chrome`-Anker (seit CE-4c) | `FwRenderer.js` `setupStructure()` |
| Titel | generische `fw-chart-title`-Klasse (nicht `FW_CHROME_TITLE_CLASS`) | `FwRenderer.js` `setupStructure()` |
| Legende-Gruppe | `fw-chart-legend` (nicht `FW_CHROME_LEGEND_GROUP_CLASS`) — eigene Optik mit Trennlinie (`margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid grid`) | `_injectStyles()` Basisblock |
| Legendeneintrag (Ruhe) | `<div class="fw-legend-item">`: `background:bgWhite; border:1px solid grid; border-radius:9999px; box-shadow:0 1px 2px rgba(0,0,0,.05)` | `_injectStyles()` Basisblock |
| Legendeneintrag (Hover) | `border-color:petrol; background:getGhostColor(petrol,.08); box-shadow:0 2px 4px rgba(0,0,0,.08); transform:translateY(-1px)` | `_injectStyles()` Basisblock |
| Legendeneintrag (gedämpft/„ghost“) | `.hidden-dataset`: `background:grid; border-color:transparent; box-shadow:none; opacity:.6; transform:none`; Text `text-decoration:line-through`; Dot `grayscale(100%);opacity:.5` | `_injectStyles()` Basisblock |
| Dot | `width/height:10px; border-radius:2px` (fast quadratisch, **nicht** `rounded-full`) | `_injectStyles()` Basisblock |
| Zone S | keine Pie-spezifische `@container`-Regel — Legende bricht nur über `flex-wrap` | `_injectStyles()` |
| Zustandsquelle | `ds._status[index]` (`'active'`/`'ghost'`, gepflegt von `PieChartStrategy.handleLegendClick()`), **parallel** dazu ein unabhängiges `item.classList.toggle('hidden-dataset')` in `ChartEngine._bindLegendEvents()` — zwei getrennte, nur durch gleichzeitiges Feuern synchron gehaltene Zustände | `PieChartStrategy.js:378-398`, `ChartEngine.js` (Alt-Stand) |

**Geprüfte, aber bewusst NICHT vollzogene Rundung (Rezeptkonflikt, kein Ersatzdesign):** Der Ruhe-/Hover-/Ghost-Zustand nutzt drei unterschiedliche Box-Shadow-Werte (`0 1px 2px`, `0 2px 4px`, `none`) plus einen Hover-Lift (`translateY(-1px)`). Baukasten D-09 lässt für Tailwind-Rezepte ausschließlich zwei Schattenstufen zu (`shadow-soft`/`shadow-hover`) und schließt Tailwinds eigene `shadow-sm…shadow-2xl` ausdrücklich aus. `shadow-sm` träfe den Ist-Wert `0 1px 2px rgba(0,0,0,.05)` zwar zufällig exakt, ist aber verboten; `shadow-soft` (`0 4px 20px -2px rgba(39,39,39,.05)`) ist ein sichtbar anderer, diffuserer Schatten. Eine vollständige Tailwind-Übersetzung dieses Dreizustands-Schattensystems ist daher **nicht verlustfrei möglich**, ohne entweder D-09 zu verletzen oder die abgenommene Optik sichtbar zu verändern. Entscheidung (siehe nächster Abschnitt): keine neue Tailwind-Rezeptur für die Legende, stattdessen Wiederverwendung der bestehenden, bereits CI-token-gesteuerten CSS unverändert.

## Umgesetztes DOM-/A11y-Delta

Wrapper und Titel: **keine Änderung.** Der Wrapper ist bereits seit CE-4c korrekt (gemeinsames Basisrezept, kein falscher Chrome-Anker). Der Titel würde bei einer Migration auf `FW_CHROME_TITLE_CLASS` durch dessen `m-0`-Utility die bestehende 16px-Bodenmarge verlieren und durch `text-lg` die Schriftgröße von 20px auf 18px ändern — beides sichtbare Optikänderungen ohne Produktentscheidung. Nach Prompt-Vorgabe B.2 „nicht automatisch übernehmen, wenn das die aktuelle Pie-Ausgabe sichtbar verändert“ bleibt der Titel unverändert bei der generischen Klasse.

Legende (einziges tatsächliches Delta dieses APs):

- `FwRenderer._renderLegend()`: Pie-Legendeneinträge werden jetzt als echtes `<button type="button">` erzeugt (vorher `<div>`), mit initialem `aria-pressed="true"` (alle Segmente starten aktiv, deckungsgleich mit `ds._status`-Initialisierung `fill('active')`). **Klasse bleibt unverändert `fw-legend-item`** — keine neue Tailwind-Rezeptur (Begründung oben).
- Neuer Zustandshelfer `FwRenderer._setPieSegmentDampingState(item, isActive)`: setzt `classList.toggle('hidden-dataset', !isActive)` und `aria-pressed` konsistent aus einem übergebenen Boolean — ersetzt keinen bestehenden Helfer, ist ein neues, eigenes Primitiv.
- `ChartEngine._bindLegendEvents()`: neuer `else if (state.type === 'pie')`-Zweig, der nach dem bereits bestehenden `handleLegendClick()`-Aufruf `chart.data.datasets[0]._status[index] === 'active'` liest und darüber den neuen Helfer aufruft — ersetzt den vorherigen blinden `item.classList.toggle('hidden-dataset')` für Pie. Line-/Bar-Zweig (`isDatasetVisible()`/`_setChromeLegendPillState`) ist byte- und verhaltensgleich geblieben (siehe Diff).
- Eine defensive, ein-eigenschaftige Ergänzung an der bestehenden `.fw-legend-item`-Basisregel: `font-family: ${f.body};`. Kein Ist-Fehler behauptet — schließt lediglich eine Restunsicherheit, ob ein `<button>`-Element (anders als zuvor ein `<div>`) auf den Tailwind-freien Engine-Testseiten (kein Preflight-Reset vorhanden) den Body-Font zuverlässig erbt. Wirkt identisch für Line/Bar (die dieselbe Basisklasse als ersten Klassentoken tragen), keine Regression möglich, da diese Eigenschaft dort vorher unbestimmt war.

Kein Drill-down-Bezug, kein Eingriff in `CenterTextPlugin`, `onHover`, `onClick`, `cutout`, Segmentfarben, Tooltip-Konfiguration, Canvas-Höhe, Datenpfade oder `fwContext`.

## Segment-Dämpfungs-Vertrag und Zustandsquelle

Die neue Bedeutung „Segment-Dämpfung umschalten“ (DOC-03) ist jetzt durch ein benanntes, eigenständiges Renderer-Primitiv (`_setPieSegmentDampingState`) abgebildet, das ausschließlich A11y-/DOM-Semantik (Button, `aria-pressed`) hinzufügt, ohne die visuelle Bedeutung neu zu erfinden:

- Klick → `PieChartStrategy.handleLegendClick()` läuft unverändert zuerst (Farbwechsel, `ds._status`-Update, `chart.update('none')`).
- Danach liest `ChartEngine` den realen `ds._status`-Wert und spiegelt ihn in Klasse + `aria-pressed` — keine zweite, unabhängige Zustandsquelle mehr (vorher: paralleler blinder Toggle).
- Das Segment bleibt im Canvas sichtbar; es werden keine Daten entfernt oder umgerechnet; keine neue Animation.
- Kein Drill-down über die Legende — der bestehende Drill-down für „Weitere …“ bleibt ausschließlich ein Canvas-Klickpfad (`onClick` in `PieChartStrategy.js`, unverändert).
- Keine `FW_CHROME_LEGEND_PILL_*`-Klassen und keine Dataset-Sichtbarkeitslogik (`isDatasetVisible()`) auf Pie übertragen — bewusst vermieden, da fachlich unpassend (DOC-03).

## Fallback- und Manifest-Parität

Da keine neue Tailwind-Klasse eingeführt wurde, ist die Frage „Tailwind-Rezept vs. Tailwind-freier Fallback“ für dieses Delta gegenstandslos: Die bestehende `.fw-legend-item`/`.hidden-dataset`-CSS in `_injectStyles()` ist bereits unconditional (kein `@source inline`, kein Tailwind-Bezug) und funktioniert identisch auf Tailwind-freien Engine-Testseiten (`pie-ci.test.html`, `ci-theme-bridge.test.html`, `tooltip-context.test.html`) und auf der einzigen Tailwind-aktiven Testseite (`Apps/prokrastinations-preis/app.test.html`, die aktuell keinen Pie-Chart rendert). Manifest-QA: 0 neue Tailwind-Utility-Tokens, `app.test.html` bytegleich unverändert (bestätigt durch `git status`).

## Line-/Bar-/Canvas-/Drill-down-Schranken

- **Line/Bar:** `git diff` zeigt den `if (state.type === 'line' || state.type === 'bar')`-Zweig in `ChartEngine._bindLegendEvents()` und den `isChromeLegend`-Zweig in `FwRenderer._renderLegend()`/`_setChromeLegendPillState()` als reine Kontextzeilen (kein `+`/`-`) — byte- und verhaltensgleich.
- **Ranking-Bar:** rendert weiterhin nie eine `.fw-chart-legend` (`meta.interactiveFilters = false` in `BarChartStrategy._transformAssetView()`, unverändert, nicht im Diff) — der neue Pie-Zweig wird für Ranking-Bar strukturell nie erreicht.
- **Canvas/Drill-down:** `PieChartStrategy.js`, `CenterTextPlugin.js` nicht im Diff (bestätigt durch `git status`). `onHover`, `onClick`, `fw-chart-show-details`, `cutout`, Segmentfarben, Tooltip-Konfiguration (`tooltip.enabled:false`), Canvas-Höhe: unverändert.
- **Datenpfade/`fwContext`:** `ChartEngine._draw()`, `_processContainer()`, `renderFromData()` nicht im Diff — unverändert.

## Statische QA

1. **Scope-/Diff-QA:** `git status --short` zeigt ausschließlich `FwRenderer.js` und `ChartEngine.js` geändert; keine Fremdstände vorgefunden.
2. **`node --check`:** exit 0 für beide geänderten Dateien.
3. **`git diff --check`:** exit 0, keine Whitespace-Fehler.
4. **Positiv-/Negativnachweis:**
   - Genau ein neues semantisches Segment-Dämpfungs-Primitiv (`_setPieSegmentDampingState`), keine Kopie eines `FW_CHROME_*`-Rezepts — bestätigt durch Diff (keine neue `FW_*_CLASS`-Konstante eingeführt).
   - Echte Pie-Legendenbuttons mit `type="button"` und initialem `aria-pressed="true"` — bestätigt durch Diff (`item.type = 'button'`, `item.setAttribute('aria-pressed', 'true')`).
   - Aktiv/ghost wird ausschließlich aus `chart.data.datasets[0]._status[index]` abgeleitet — bestätigt durch Diff, keine zweite Quelle.
   - Line-/Bar-Dataset-Sichtbarkeitslogik byte- und verhaltensgleich — bestätigt (siehe „Line-/Bar-/Canvas-/Drill-down-Schranken“ oben).
5. **Paritätsnachweis:** Wrapper/Titel unverändert (kein Diff an den entsprechenden Zeilen außer der neuen Legend-Logik). Legendengruppe/-dot/-hover/-ghost-CSS unverändert (nur eine `font-family`-Eigenschaft ergänzt, keine bestehende Eigenschaft entfernt oder verändert). Keine Abweichung, die nicht entweder unverändert oder als exakt begründete, risikofreie Ergänzung (Font-Family) dokumentiert ist.
6. **Manifest-QA:** 0 fehlende Tokens, da keine neue Tailwind-Klasse eingeführt wurde; `app.test.html` unverändert.
7. **Schutzprüfung:** Kein Diff in `CenterTextPlugin.js`, anderen Plugins, `FwTheme.js`, `tokens.css`, Tests, Tools, Datenpfaden oder Strategien — bestätigt durch `git status --short` (siehe oben, nur die zwei erlaubten Dateien geändert; `PieChartStrategy.js` war nicht nötig, da `ChartEngine` den realen Zustand bereits direkt über `chart.data.datasets[0]._status` lesen kann).

## Manuelle Albert-QA

Status: **Punkte 1–3 bestanden** (Sichtprüfung + zwei reale Werkzeuglaeufe). Punkte 4–5 sowie eine Rückfrage stehen noch aus.

1. **Sichtprüfung** (`pie-ci.test.html`): **bestanden.** Albert: „Optisch ok.“ Keine sichtbare Änderung gegenüber dem Vor-CE-5-Zustand.
2. **Struktur** (echter `<button>`, `aria-pressed`, Fokussierbarkeit, Initialzustand): **bestanden.** `tools/engine-dom-check.js`-Segment-Dämpfungs-Struktur-Check: 9/9 Container `buttonStruktur`/`tastaturfaehig`/`initialAktiv`/`ergebnis` PASS.
3. **Klick-Rundreise** (dämpft genau das gewählte Segment, andere Segmente unverändert, kein Drill-down über die Legende, Wiederherstellung durch zweiten Klick): **bestanden.** `tools/pie-segment-damping-interaction-check.js`: 51/51 Segmente über alle 9 Legenden PASS (`toggleKorrekt`/`andereSegmenteUnveraendert`/`keinDrilldown`/`wiederhergestellt`/`ergebnis` durchgehend PASS). Da native Buttons Enter/Space laut HTML-Spezifikation automatisch als Klick behandeln und die Struktur-QA (Punkt 2) Fokussierbarkeit bereits strukturell bestätigt, deckt dieser Nachweis Tastatur-Aktivierung inhaltlich mit ab — eine separate manuelle Tab/Enter/Space-Probe ist optional, kein Blocker mehr.
4. **Canvas/Drill-down:** **bestanden.** Albert: „ok für Screen S, M, L“ — Hover/Center-Text unverändert, „Weitere …“-Drill-down über den Canvas funktioniert weiterhin, kein Drill-down über die Legende.
5. **Line-/Bar-Referenzfall:** **bestanden.** Albert: „optisch ok, für Screen S, M, L“ — CE-4c-Chrome und Dataset-Pills unverändert; die `font-family`-Ergänzung an der gemeinsamen `.fw-legend-item`-Basisklasse hat keine sichtbare Regression verursacht.
6. **Offene Rückfrage:** Der Fokusring für die Pie-Legende ist der native Browser-Standard (kein Baukasten-`focus-visible:ring-2`-Rezept, da bewusst keine neue Tailwind-Klasse eingeführt wurde) — reicht das für diesen AP, oder soll das Fokusring-Design in einem eigenen kleinen Folge-AP auf das Baukasten-Rezept gehoben werden? Klargestellt: betrifft aktuell nicht `prokrastinations-preis`/`app.test.html` (App rendert bisher nur Line-Charts), nur die drei Donut/Pie-Engine-Testseiten und künftige Apps mit Donut-Charts. Antwort noch offen.

## Nicht Teil dieses APs

Wrapper- oder Titel-Migration auf ein volles `FW_CHROME_*`-Rezept (bewusst zurückgestellt, siehe Paritätskarte); jede neue Tailwind-Visual-Rezeptur für die Legende (bewusst nicht eingeführt, D-09-Konflikt); Fokusring-Design (`focus-visible:ring-2`) für die Pie-Legende; BAN, Range-/View-Control, Caption, Popover für Pie; jede Änderung an `PieChartStrategy.js`, `CenterTextPlugin.js`, Canvas, Daten, Datenpfaden, `fwContext`; F-06 (Pie-Drill-down-Popover an `document.body`, weiterhin unverändert und unbewertet).

## Nächster zulässiger Schritt

Nur nach Alberts realer Browser-QA (Checkliste oben, insbesondere Punkt 3 zum nativen Fokusring): Abnahme dieses Protokolls. Danach CE-6 (Cross-Type-Abschluss) oder eine separate Entscheidung, ob Wrapper/Titel/Fokusring-Feinschliff für Pie in einem eigenen, kleinen Folge-AP nachgezogen werden sollen. Kein Commit ohne Alberts expliziten Auftrag.
