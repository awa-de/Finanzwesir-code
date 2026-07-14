Stand: 2026-07-14 | Session: AP-chart-engine-01 / CE-3 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-3: Line-Chart-Chrome — Ergebnisprotokoll

**Status: GELB — statische QA vollständig bestanden; manuelle Albert-Browser-QA noch offen (keine Browser-Automation, wie vom AP vorgeschrieben).**

Kettenposition: CE-1 ✅, CE-1a ✅, CE-2b ✅, CE-2c ✅ (statisch), Tool-Abnahme ✅. **CE-3** (dieser AP). Nächster Schritt nur nach Alberts Abnahme: CE-4 (Bar-Chart-Chrome).

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (+167/−22)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (+19/−6)
- `Apps/prokrastinations-preis/app.test.html` — ausschließlich das eine `@source inline(...)`-Manifest, 18 fehlende Tokens ergänzt, sonst keine Änderung
- Diese Ergebnisdatei

Keine andere Datei geändert. `tools/engine-dom-check.js` bytegleich unverändert (`git diff --stat` leer).

## Umgesetztes Line-Delta

**Titel und BAN:** Titel erhält bei Linie zusätzlich `m-0 text-lg font-bold text-primary` (`FW_LINE_TITLE_CLASS`). BAN-Container/Hauptwert/Sub/Hint erhalten `inline-block min-w-48 rounded-lg bg-bg-faint px-4 py-3` / `text-xl font-bold text-text` / `text-sm text-text-sec` (beide). `aria-live="polite"` war bereits vorhanden — verifiziert, nicht neu ergänzt. Die BAN-Klassen gelten **unbedingt** (kein zusätzlicher Typ-Parameter in `_renderBAN`/`_updateBAN`): per Grep verifiziert liefert ausschließlich `LineChartStrategy.js` `meta.headline` (0 Treffer in `BarChartStrategy.js`/`PieChartStrategy.js`), BAN ist damit empirisch bereits line-exklusiv. Die bestehende Zone-L-Container-Query (`@container fw-chart (min-width:450px)`, BAN-Skalierung auf 24px) bleibt unverändert erhalten (Delta B.4 „bewahren").

**Toolbar und Range-/View-Zustand:** Toolbar erhält bei Linie zusätzlich `flex flex-wrap items-center gap-2`. Range- und View-Gruppe werden bei Linie zu `<div role="group" aria-label="…">` (Range: „Zeitspanne", View: „Ansicht" — generische, spec-neutrale Labels, da die Strategie die konkreten Optionslabels liefert und keine App-/Strategie-Datei berührt werden durfte) mit dem Gruppenrezept `inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5` (neue Klasse `fw-chart-segmented-group`, keine Kollision mit `fw-btn-group`/`fw-toggle`). Optionen sind bei Linie echte `<button type="button">` mit vollständigem Aktiv-/Inaktiv-Literalrezept (`fw-chart-segmented-option …`) und `aria-pressed`; die View-Optionen wechseln bei Linie von `<span>` auf `<button>`. `data-action`/`data-value` unverändert — Event-Delegation in `ChartEngine._bindEvents` bleibt unberührt funktionsfähig. Smart-Update-Pfad (`_updateUIState`) setzt bei Linie denselben vollständigen Klassentausch + `aria-pressed` über die neue Renderer-Methode `_setLineSegmentedOptionState()`; die alte `active`-Suffixlogik steuert für Linie weder Optik noch A11y mehr.

**Legende und Serien-Toggle-Zustand:** Legende erhält bei `chartConfig.type === 'line'` `flex flex-wrap gap-2`. Line-Einträge werden echte `<button type="button">` mit bestehendem `fw-legend-item`-Anker, `data-index` unverändert. Sichtbare Pill: vollständiges aktives Rezept; ausgeblendete Pill: vollständiger, unabhängiger Alternativ-String mit `opacity-40 grayscale`. Dot erhält `h-2.5 w-2.5 rounded-full`, die datengetriebene `style.backgroundColor` bleibt unverändert. `aria-pressed` bedeutet „Serie sichtbar": initial `true` (kein Dataset startet hidden — Bestandsverhalten, verifiziert über `BaseChartStrategy.handleLegendClick()`), beim Klick liest `ChartEngine._bindLegendEvents` den realen Chart.js-Zustand via `chart.isDatasetVisible(index)` (Chart.js-API real in der vendorten `chart.umd.min.js` verifiziert, nicht angenommen) aus und setzt über `_setLineLegendPillState()` Klasse + `aria-pressed` konsistent. Bar-/Pie-/Ranking-Legenden bleiben strukturell, semantisch und beim Klick (`hidden-dataset`-Toggle) unverändert — der Bedingungscheck `chartConfig.type === 'line'` schließt Ranking (immer `chartConfig.type==='bar'`) korrekt aus.

**Line-Fallback und App-Test-Manifest:** Neuer, ausschließlich unter `.fw-chart-wrapper--line` selektierter CSS-Block in `_injectStyles()` (Titel, Toolbar, Segmented-Group/-Option inkl. Hover/Aktiv-Zustand, BAN-Container/-Sub/-Hint, Legende-Gruppe/-Item/-Hover/-Ausgeblendet/-Dot, `prefers-reduced-motion`). Jede Regel wurde gegen die jeweilige **bestehende generische** Regel abgeglichen und alle abweichenden Eigenschaften (u. a. `justify-content`, `margin-bottom`, `border`, `padding`, `font-size` 13px→14px, `font-weight` 600→400, `box-shadow`, `transform`, doppeltes Dot-Spacing) explizit zurückgesetzt, damit Tailwind- und Tailwind-freie Darstellung deckungsgleich sind. Zone-S-`!important`-Sonderregeln (`@container fw-chart (max-width:450px)`) wurden für Linie **bewusst nicht dupliziert** — Baukasten §6.11 Responsive-Absatz stellt ausdrücklich fest, dass `flex-wrap` das Umbruchverhalten bereits leistet; die Zone-S-Regeln bleiben unverändert ausschließlich für Bar wirksam. Manifest-Abgleich: 18 fehlende Tokens identifiziert und ergänzt (`text-primary bg-bg-faint p-0.5 gap-0.5 rounded px-2.5 py-1 shadow-soft inline-block min-w-48 py-3 select-none transition-shadow hover:shadow-hover opacity-40 grayscale h-2.5 w-2.5`), alle anderen benötigten Tokens (`flex`, `flex-wrap`, `items-center`, `gap-2`, `inline-flex`, `rounded-md`, `rounded-lg`, `text-sm`, `text-text-sec`, `text-xl`, `text-text`, `font-bold`, `font-semibold`, `m-0`, `text-lg`, `px-4`, `bg-bg`, `cursor-pointer`, `focus-visible:*`, `transition-colors`, `motion-reduce:transition-none`, `hover:text-text`, `rounded-full`) waren bereits vorhanden.

## Beweise

- **Scope-/Diff-QA:** `git status`/`git diff --stat` zeigen ausschließlich die drei erlaubten Produkt-/Manifestdateien + diese Ergebnisdatei geändert; alle Fremdstände (`session-log.md`, zwei Chroniken, drei vorherige Ergebnisprotokolle, `engine-dom-check.js`) unberührt.
- **Syntax:** `node --check` auf beide geänderten `.js`-Dateien: exit 0, keine Fehler.
- **Line-vs.-Non-Line-QA:** Vollständiger Diff Zeile für Zeile geprüft — jeder `else`-Zweig (Bar-Pfad) enthält den ursprünglichen Code byte-identisch (`'fw-btn ' + (isActive?'active':'')`, `<span>` mit `'fw-toggle-opt ' + …`, `<div class="fw-legend-item">`, `<span class="fw-legend-dot">`, `classList.add/remove('active')`, `classList.toggle('hidden-dataset')`). Kein Marker, keine neue Klasse, kein neues Element betrifft Bar/Donut/Pie.
- **Literal-/SafeDOM-QA:** Grep auf neue Template-Literal- oder Variablen-Konkatenation in Klassenzuweisungen — einzige Treffer sind die unveränderten Bestands-Konkatenationen des Bar-Pfads (`'fw-btn ' + …`, `'fw-toggle-opt ' + …`); alle neuen Line-Zuweisungen sind Ternäre zwischen vollständigen Literal-Konstanten. Keine neue variable `innerHTML`-Nutzung (nur Bestandsreset `container.innerHTML=''` und statisches `closeBtn.innerHTML='&times;'`).
- **Canvas-/Theme-/Container-Query-QA:** `fw-chart-show-details`-Event, `this.theme.init()`-Reihenfolge, `container-name: fw-chart` unverändert vorhanden (Grep bestätigt).
- **`chart.isDatasetVisible`-Nachweis:** In der vendorten `Theme/assets/js/vendor/chart.umd.min.js` real vorhanden (Grep bestätigt) — keine angenommene API.
- **`handleLegendClick`-Nachweis:** `BaseChartStrategy.js` toggelt `chart.getDatasetMeta(index).hidden` + `chart.update()`; `LineChartStrategy extends BaseChartStrategy` ohne eigene Überschreibung (Grep/Read bestätigt) — der neue `isDatasetVisible()`-Read liest denselben, bereits vorhandenen Zustand, keine neue Datenquelle.
- **Manifest-QA:** Genau ein `@source inline(...)` in `app.test.html`, wohlgeformt geschlossen (`grep -c` = 1, schließende Klammer vorhanden). Keine freie Klassenbildung eingeführt.
- **`engine-dom-check.js` unverändert:** `git diff --stat` leer.

## Manuelle Albert-QA (Checkliste)

Status: **offen** — noch nicht rückgemeldet. Bitte im lokalen Live-Server prüfen:

1. Bestehenden Linienchart im CSV-/Standardpfad bei S/M/L ansehen; Titel, BAN, Zeitspannen und Legenden-Pills prüfen (insbesondere: kein Doppel-Spacing am Legend-Dot, keine Hover-Lift-Restanimation, Segmented-Group-Optik).
2. Zeitspanne wechseln: aktive Option, `aria-pressed`, Chart-Update und BAN müssen zusammenpassen.
3. Eine Serie in der Legende aus- und wieder einblenden: Pill-Zustand, `aria-pressed`, Linie und BAN müssen zusammenpassen.
4. `prokrastinations-preis/app.test.html` auf Screen 2/3/4 prüfen: kein unerwarteter Range-/BAN-/View-Control (beide Screens nutzen laut APP_SPEC `features.rangeControls:false`/`headline:false`), Journey, Rubikon, Card-to-Point-Flug und vertikale Linie unverändert.
5. Bei vorhandenem Screenreader-Setup den A11y-Zustand prüfen (Segmented-Group-Labels „Zeitspanne"/„Ansicht", Pill-`aria-pressed`); ansonsten als offen markieren.

**Empfohlenes Werkzeug:** `tools/engine-dom-check.js` deckt CE-3 selbst noch nicht ab (prüft nur die CE-2b-Struktur: A11y-Verbergung, Wrapper/Canvas-Anker) — für CE-3 ist die Sichtprüfung/DevTools-Inspektion aus obiger Checkliste maßgeblich.

## Offene, transparent gemachte Annahmen

- **`aria-label`-Texte „Zeitspanne"/„Ansicht":** generisch gewählt, da die konkreten View-Optionslabels aus der jeweiligen Strategie stammen (nicht Teil des Write-Scopes). Bitte bei der Browser-Abnahme auf Sinnhaftigkeit prüfen.
- **Initial-Sichtbarkeit der Legend-Pills:** angenommen „alle Serien starten sichtbar" (kein Dataset startet mit `hidden=true`) — begründet über `BaseChartStrategy.handleLegendClick()`, aber nicht am realen Chart visuell nachgewiesen.
- **BAN-`line-height` bei `text-xl`:** Tailwinds exakter gebündelter `line-height`-Wert für `text-xl` wurde nicht verifiziert; der bestehende Wert (`line-height:1.25`) wurde unverändert gelassen statt geraten. Rein typografische Nuance, keine Layoutbrechung erwartet.
- **Fallback-CSS-Präzision:** Die tokenbasierten Line-Fallback-Regeln wurden durch sorgfältige, aber rein statische Kaskaden-Analyse abgeleitet (kein Browser-Rendering verfügbar). Punkt 1 der manuellen Checkliste ist der reale Gegencheck.

## Nicht Teil dieses APs

Canvas, Datenpfade, `fwContext`, Strategien, Skalen/Achsen/Ticks/Tooltips, Datasets, Crosshair, Marker, Annotationen, vertikale Linie, Journey, Rubikon, `anchorMeasurement`, `chartSettled`, `renderMotion` — alle unverändert. Bar- und Donut/Pie-Chrome bleiben im DOM, in Klassen, Elementtypen und Verhalten unverändert (eigene, spätere Slices CE-4/CE-5). Popover unverändert — F-06 bleibt Schranke vor CE-5. F-05 (veraltete Theme-TECH-SPEC) bleibt separater Dokumentationsbefund.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme (inkl. der oben offenen manuellen Browser-QA): CE-4 Bar-Chart-Chrome.

Kein Commit. Stop.
