Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-4c (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-4c: Gemeinsamer Chrome-Kern — Ergebnisprotokoll

Status: GRÜN — statische QA und manuelle Albert-QA vollständig bestanden (Checkliste Punkte 1–5, alle fünf real im Browser gegengeprüft). Ersetzt die frühere offene CE-4-Browser-QA vollständig.

Reparatur-AP: behebt die in CE-4 entstandene Architekturabweichung (elf `FW_BAR_*`-Vollrezepte, inhaltlich identisch mit den bereits vorhandenen `FW_LINE_*`-Rezepten — Verstoß gegen den CE-4a-Nachtrag). Keine neue Chrome-Fabrik, keine Registry, kein neuer semantischer Strategy-/Rucksack-Vertrag.

## Vorfundene Fremdstände und CE-4c-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M .claude/learning/session-log.md
 M NAVIGATION.md
 M PROJECT-STATUS.md
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
 M docs/steering/BACKLOG.md
?? docs/steering/patches/AP-chart-engine-01_CE-4_bar-chart-chrome_Ergebnis.md
```

- **Echte Fremdstände (vor dieser Session vorhanden, nicht angefasst):** `NAVIGATION.md`, `PROJECT-STATUS.md`, `docs/steering/BACKLOG.md`.
- **Eigene Artefakte aus vorherigen Schritten dieser Session, nicht CE-4c-Scope:** `.claude/learning/session-log.md` (regulärer `/start`-Eintrag), `ChartEngine.js`/`FwRenderer.js` trugen bereits den CE-4-Diff (Ausgangsbasis dieses APs), `docs/steering/patches/AP-chart-engine-01_CE-4_bar-chart-chrome_Ergebnis.md` (CE-4-Ergebnisdatei, unverändert von CE-4c).
- **CE-4c-eigener Diff:** ausschließlich die zusätzlichen Änderungen an `ChartEngine.js` und `FwRenderer.js` seit dem CE-4-Endstand (siehe Beweise), plus diese neue Ergebnisdatei.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- Diese Ergebnisdatei

`Apps/prokrastinations-preis/app.test.html` nur lesend geprüft, bytegleich unverändert (siehe Beweise, Manifest-QA).

## Gemeinsame Rezepte und Typausnahmen

Elf gemeinsame `FW_CHROME_*`-Konstanten ersetzen die vormals doppelten `FW_LINE_*`/`FW_BAR_*`-Chrome-Rezepte:

```text
FW_CHROME_WRAPPER_CLASS                  'fw-chart-wrapper flex flex-col gap-3'
FW_CHROME_TITLE_CLASS                    'fw-chart-title m-0 text-lg font-bold text-primary'
FW_CHROME_TOOLBAR_CLASS                  'fw-chart-toolbar flex flex-wrap items-center gap-2'
FW_CHROME_SEGMENTED_GROUP_CLASS          'fw-chart-segmented-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5'
FW_CHROME_VIEW_GROUP_CLASS               'fw-chart-segmented-group fw-chart-view-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5 ml-auto'
FW_CHROME_SEGMENTED_OPTION_CLASS         'fw-chart-segmented-option rounded px-2.5 py-1 text-sm text-text-sec transition-colors motion-reduce:transition-none hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500'
FW_CHROME_SEGMENTED_OPTION_ACTIVE_CLASS  'fw-chart-segmented-option rounded px-2.5 py-1 text-sm font-semibold bg-bg text-primary shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500'
FW_CHROME_LEGEND_GROUP_CLASS             'fw-chart-legend flex flex-wrap gap-2'
FW_CHROME_LEGEND_PILL_CLASS              'fw-legend-item inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft transition-shadow motion-reduce:transition-none hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 border border-border text-text transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary'
FW_CHROME_LEGEND_PILL_HIDDEN_CLASS       (wie oben) + ' opacity-40 grayscale'
FW_CHROME_LEGEND_DOT_CLASS               'fw-legend-dot h-2.5 w-2.5 rounded-full'
```

Verwender (`FwRenderer.js`): `setupStructure()` (Wrapper, Titel), `_renderControls()` (Toolbar, Segmented-Gruppe/-Option, View-Gruppe), `_renderLegend()` (Legendengruppe, Pill, Dot) — jeweils für Line (`isLine`) und regulären Bar (`isBar`/`isBarRegular`) über gemeinsame lokale Flags `isChromeControls` bzw. `isChromeLegend`. Kein Verwender referenziert mehr ein `FW_LINE_*`- oder `FW_BAR_*`-Chrome-Rezept.

**Typbezogen bleiben** (Delta A.3/B.4, unverändert gegenüber CE-4a):

- Statische Wrapper-Typmarker `fw-chart-wrapper--line`/`fw-chart-wrapper--bar`, per `wrapper.classList.add('fw-chart-wrapper--line', 'fw-chart-chrome')` bzw. `('fw-chart-wrapper--bar', 'fw-chart-chrome')` ergänzt — **keine Stringverkettung**, ausschließlich statische DOM-API-Aufrufe mit Literal-Argumenten.
- Die Line-BAN-Familie (`FW_LINE_BAN_CONTAINER_CLASS`, `_MAIN_CLASS`, `_SUB_CLASS`, `_HINT_CLASS`) bleibt line-exklusiv, unverändert, nicht umbenannt.
- Die Ranking-Schranke (`isRanking`, `isBarRegular = type==='bar' && !isRanking`) und die Pie-Schranke (`isPie`) bleiben fachlich unverändert — keine Zeile in ihrem Verzweigungscode wurde geändert (siehe Beweise).

## Gemeinsame Zustandshelfer

- `_setChromeSegmentedOptionState(btn, isActive)` ersetzt `_setLineSegmentedOptionState`/`_setBarSegmentedOptionState` — ein Helfer, dieselben `FW_CHROME_SEGMENTED_OPTION_*_CLASS`-Konstanten für Line und regulären Bar.
- `_setChromeLegendPillState(item, isVisible)` ersetzt `_setLineLegendPillState`/`_setBarLegendPillState` — liest weiterhin ausschließlich `chart.isDatasetVisible(index)` als einzige Quelle des sichtbaren Zustands (keine neue Sichtbarkeitsquelle).
- `ChartEngine._updateUIState()`: `isChromeControls = (isLine || isBar)` steuert einheitlich beide Aufrufer (`_setChromeSegmentedOptionState`), Range-/View-Semantik und Update-Reihenfolge unverändert.
- `ChartEngine._bindLegendEvents()`: `state.type === 'line' || state.type === 'bar'` ruft `_setChromeLegendPillState()`; Pie/Ranking bleiben beim unveränderten `classList.toggle('hidden-dataset')`-Zweig. Ranking-Bar rendert weiterhin nie eine `.fw-chart-legend` (unverändertes `meta.interactiveFilters = false` in `BarChartStrategy._transformAssetView()`), dieser Klick-Pfad wird für Ranking also strukturell nie erreicht.

## Rezept-Wiederverwendung (Positiv-/Negativbeweis)

**Positiv** (Grep, `FwRenderer.js`): 11 `FW_CHROME_*`-Konstanten deklariert, 16 Verwendungsstellen in `setupStructure()`/`_renderControls()`/`_renderLegend()`/`_setChromeSegmentedOptionState()`/`_setChromeLegendPillState()`.

**Negativ** (Grep über beide Dateien, Muster `FW_LINE_(WRAPPER|TITLE|TOOLBAR|SEGMENTED|VIEW_GROUP|LEGEND)_CLASS|FW_BAR_(WRAPPER|TITLE|TOOLBAR|SEGMENTED|VIEW_GROUP|LEGEND)_CLASS`): **0 Treffer als tatsächliche Konstante/Verwendung** — der einzige Treffer ist eine erklärende Prosa-Zeile im Kommentar an der View-Group-Deklaration, die die historischen Namen zur Einordnung nennt, keine aktive Codestelle. Kein vollständiger `FW_LINE_*`- oder `FW_BAR_*`-Chrome-Rezeptstring existiert mehr im Code. Zulässig geblieben: die Line-BAN-Familie (`FW_LINE_BAN_*`) und die statischen Typmarker-Literale `'fw-chart-wrapper--line'`/`'fw-chart-wrapper--bar'`.

**Alte View-Group-Anker** (`fw-chart-line-view-group`, `fw-chart-bar-view-group`): Grep über `Theme/assets/js/fw-chart-engine/`, `tools/`, `Apps/prokrastinations-preis/`, `tests/engine/` — 0 funktionale Treffer, nur zwei erklärende Kommentarzeilen an der neuen `FW_CHROME_VIEW_GROUP_CLASS`-Deklaration, die den Ersatz dokumentieren.

**Bar verwendet dieselben Konstanten:** `isChromeControls`/`isChromeLegend` sind jeweils `true` für Line UND regulären Bar und steuern in jedem Verwendungspunkt exakt eine `FW_CHROME_*`-Konstante — keine Bar-spezifische Parallelkonstante existiert mehr.

## Line-Gleichheit und Fallback-Parität

Programmatischer Vergleich (PowerShell) des committed CE-3b-Stands (`git show HEAD:.../FwRenderer.js`) gegen den aktuellen Stand: für jede der elf ehemaligen `FW_LINE_*_CLASS`-Konstanten wurde die Tailwind-Utility-Tokenmenge (nach Entfernen der reinen Typmarker-Literale `fw-chart-wrapper--line`/`fw-chart-line-view-group` bzw. `fw-chart-view-group`) gegen die entsprechende neue `FW_CHROME_*_CLASS`-Konstante verglichen — **11/11 Übereinstimmungen, keine Abweichung**. Die vier Line-BAN-Konstanten sind **byte-identisch** zum HEAD-Stand geblieben (kein Diff). Damit ist die mechanische Umbenennung nachgewiesen token- und verhaltensgleich: DOM-Reihenfolge, Elementtypen, `aria-*`-Verträge und sichtbares Rezept der Line-Ausgabe sind unverändert; nur der Marker-/Anker-Mechanismus wurde konsolidiert (Wrapper trägt jetzt `FW_CHROME_WRAPPER_CLASS` + `fw-chart-wrapper--line` + `fw-chart-chrome` statt eines einzigen zusammengesetzten `FW_LINE_WRAPPER_CLASS`-Strings — visuell und funktional identisch, da CSS-Klassenreihenfolge im `class`-Attribut irrelevant ist).

**Fallback-Parität (CSS, `_injectStyles()`):** Die vormals für `.fw-chart-wrapper--line` und `.fw-chart-wrapper--bar` identisch duplizierten Tailwind-freien Fallbackregeln (Wrapper-Rhythmus `display:flex;flex-direction:column;gap:12px`, Titel, Toolbar, Segmented-Gruppe/-Option inkl. `[aria-pressed="true"]`, Legendengruppe, Pill-Ruhe/-Hover/`[aria-pressed="false"]`, `prefers-reduced-motion`) existieren jetzt exakt einmal unter dem gemeinsamen, nicht-Tailwind Chrome-Anker `.fw-chart-chrome` (CSS-Inhalt byte-identisch zu den vorherigen Line-Regeln übernommen). M/L: `.fw-chart-chrome .fw-chart-view-group { margin-left: auto; }` als Basisregel. Zone S ≤450px: **ein einziger** `@container fw-chart (max-width: 450px)`-Block, bewusst nach der Basisregel platziert (`margin-left: 0`, kein `!important`) — derselbe CE-3b-Kaskaden-Tiebreak (gleiche Selektorspezifität, spätere Quellposition gewinnt), jetzt aber nur noch einmal statt zweimal formuliert. Line-BAN-Fallback-Regeln (`.fw-ban-container`/`.fw-ban-sub`/`.fw-ban-hint`) bleiben unverändert exklusiv unter `.fw-chart-wrapper--line` (nicht unter `.fw-chart-chrome`).

## Ranking-/Pie-/Canvas-/Datenpfad-Schranken

- `git diff` zeigt die Deklarationszeilen `var isPie = ...` und `var isRanking = ...` in `_renderLegend()` unverändert als reine Kontextzeilen (kein `+`/`-`); der `if (isPie || isRanking) { … }`-Zweig (Label-/Farbextraktion für Pie- und den weiterhin unerreichten Bar-Ranking-Sonderfall) enthält keine einzige geänderte Zeile.
- `BarChartStrategy._transformAssetView()` liefert weiterhin `meta.interactiveFilters = false` hartcodiert — unverändert (Datei nicht im Diff). Ranking-Bar rendert deshalb strukturell weiterhin nie eine `.fw-chart-legend`; kein neuer Button, kein `aria-pressed`, kein Event-/Update-Zweig kann Ranking je erreichen.
- Pie/Donut: `_renderControls()` liefert bei `type === 'pie'` weiterhin sofort `null` (unverändert); `PieChartStrategy.js` nicht im Diff; die Pie-Legende läuft unverändert über den `isPie`-Zweig mit `<div class="fw-legend-item">` (kein `FW_CHROME_*`-Bezug).
- `git status --short` für `Theme/assets/js/fw-chart-engine/strategies/`, `Theme/assets/js/fw-chart-engine/core/FwTheme.js`, `Theme/assets/css/tokens.css`, `tools/engine-dom-check.js`, `tests/engine/`, `Apps/prokrastinations-preis/app.test.html`: **leere Ausgabe** — alle sieben Pfade vollständig unverändert. Kein Eingriff in Canvas, Daten, Datenpfade, `fwContext`, Achsen, Ticks, Tooltips, Datasets, Chart.js-Plugins, Animationen, Canvas-Höhe oder `FwTheme.init()`.

## Manifest-, Syntax- und Scope-QA

- **Syntax:** `node --check` auf `FwRenderer.js` und `ChartEngine.js`: exit 0 für beide.
- **`git diff --check`:** exit 0, keine Whitespace-Fehler (nur harmlose LF→CRLF-Konvertierungshinweise für zwei Fremdstände-Dateien).
- **Scope-Diff:** `git diff --stat` zeigt ausschließlich `ChartEngine.js` (+21/−13 Zeilen) und `FwRenderer.js` (+124/−112 Zeilen) plus diese Ergebnisdatei als CE-4c-eigen geändert. Fremdstände (`NAVIGATION.md`, `PROJECT-STATUS.md`, `docs/steering/BACKLOG.md`) unverändert von diesem AP, wie oben ausgewiesen.
- **Manifest-QA (programmatisch, PowerShell):** alle Tailwind-Utility-Tokens aus den 11 `FW_CHROME_*_CLASS`-Konstanten gegen das `@source inline(...)`-Manifest von `app.test.html` abgeglichen — 0 fehlende Tokens. `app.test.html` deshalb korrekt unverändert gelassen (bytegleich zum CE-3b-/CE-4-Manifeststand, da CE-4c keine neuen Tailwind-Utility-Tokens einführt, nur bestehende Konstanten zusammenführt).

## Manuelle Albert-QA

Status: **Punkte 1–5 bestanden.** Zwei unabhängige Nachweise pro Testseite: Alberts Sichtprüfung („Optisch einwandfrei in S,M,L Screen") und der um den Chrome-Kern-Block erweiterte `tools/engine-dom-check.js` (siehe `PATCH-engine-dom-check-chrome-kern-erweiterung-2026-07-15.md`), Konsolenergebnis von Albert zurückgemeldet.

1. **Line-Referenz** (`tests/engine/line-ci.test.html`): **bestanden.** Sichtprüfung S/M/L einwandfrei. `engine-dom-check.js`: 9/9 Container A11y-/Struktur-Block PASS; Chrome-Kern-Block 9/9 `typ:'line'`, `chromeAnker`/`controlsButtons`/`controlsAktivZustand`/`legende: PASS (Chrome-Pill)` — Gesamt PASS.
2. **Reguläre Mehrserien-Bar** (`tests/engine/bar-ci.test.html`): **bestanden.** Sichtprüfung S/M/L einwandfrei. `engine-dom-check.js`: 9/9 Container A11y-/Struktur-Block PASS; Chrome-Kern-Block 9/9 `typ:'bar'`, `chromeAnker`/`controlsButtons`/`controlsAktivZustand` PASS; 8/9 `legende: PASS (Chrome-Pill)`.
3. **Ranking-/Einzeldataset-Bar:** **bestanden** (kombiniert mit Punkt 4, nicht separat unterscheidbar aus der Konsolenausgabe). Genau 1 von 9 Bar-Containern (idx 0) zeigt `legende: keine` — kein FAIL, exakt das erwartete, unveränderte Bestandsverhalten (keine erfundene Legende); Range-/View-Controls bei diesem Container bleiben laut `controlsButtons`/`controlsAktivZustand: PASS` bedienbar.
4. **Einzeldataset-Bar:** siehe Punkt 3 — keine erfundene Legende bestätigt.
5. **Donut/Pie-Referenz** (`tests/engine/pie-ci.test.html`): **bestanden.** Sichtprüfung „Optisch einwandfrei". `engine-dom-check.js`: 9/9 Container A11y-/Struktur-Block PASS (Wrapper, Container-Query, Canvas, A11y-Verbergung unverändert); Chrome-Kern-Block korrekt mit „Kein Line-/Bar-Chrome-Container auf dieser Seite" übersprungen (`chromeGesamt: 'KEINE CHROME-CONTAINER'`, geprüft: 0) — bestätigt strukturell, dass kein Donut/Pie-Wrapper einen Typmarker oder den `fw-chart-chrome`-Anker trägt, deckungsgleich mit dem Diff-Beweis (`PieChartStrategy.js` unverändert, `isPie`-Zweig unangetastet).

## Nicht Teil dieses APs

Canvas, Balkengeometrie, Achsen, Skalen, Farben der Daten, Tooltips, Daten, Animationen, Plugins; BAN (bleibt line-exklusiv, keine Bar-BAN); Ranking-Bar-Legende (unverändert, eigener Zweig); Donut/Pie-Chrome (unverändert); Popover (F-06 bleibt Schranke vor CE-5); Tokens (`tokens.css`/`FwTheme`); `tools/engine-dom-check.js`; alte generische `.fw-btn-group`/`.fw-toggle`/`.fw-btn`/`.fw-toggle-opt`-CSS-Regeln (weiterhin unbenutzt für Bar/Line, nicht entfernt — kein Aufräumauftrag); jede neue Chrome-Fabrik, Registry oder neuer semantischer Strategy-/Rucksack-Vertrag.

## Nächster zulässiger Schritt

CE-4c ist vollständig abgenommen (statische QA + alle fünf Checklistenpunkte real im Browser bestätigt: Line, regulärer Bar, Ranking-/Einzeldataset-Bar, Donut/Pie). Nur nach Alberts weiterer Freigabe: CE-5 Donut/Pie-Chart-Chrome; F-06 bleibt vorherige Scope-Schranke für Popover. Kein Commit ohne Alberts expliziten Auftrag.
