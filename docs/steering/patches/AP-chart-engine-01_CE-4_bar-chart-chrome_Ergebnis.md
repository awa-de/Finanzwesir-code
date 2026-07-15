Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-4 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-4: Bar-Chart-Chrome — Ergebnisprotokoll

Status: GELB — statische QA vollständig bestanden, manuelle Albert-Browser-QA offen.

Kettenposition: CE-3b ist abgenommen (Albert: „Optische Prüfung: Alles einwandfrei"), CE-4 damit freigegeben (Ergebnisprotokoll CE-3b, Abschnitt „Nächster zulässiger Schritt"). Dieser AP migriert ausschließlich das HTML-Chrome regulärer Mehrserien-Balkencharts auf den abgenommenen Baukastenvertrag.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- Diese Ergebnisdatei

`Apps/prokrastinations-preis/app.test.html` **nicht** geändert — programmatischer Tokenabgleich (PowerShell, alle 11 neuen `FW_BAR_*_CLASS`-Konstanten gegen das `@source inline(...)`-Manifest geprüft) ergab: kein einziges neues Tailwind-Utility-Token, da die Bar-Rezepte inhaltsgleich mit den bereits seit CE-3/CE-3b im Manifest vorhandenen Line-Rezepten sind (chart-typ-agnostisches Baukasten-Primitive §6.11). Kein anderer Datenpfad, keine Strategie, kein Test unter `tests/engine/` geändert.

## Bar-Vertragskarte und Scope

- **Reguläre Mehrserien-Bar** (History-View, `isSingleAsset === false`, z. B. `bd_ranking_stress.csv` mit 10 Assets im Default-View „Verlauf"): `meta.interactiveFilters = true` (BarChartStrategy.js:189) → `_renderLegend()` wird aufgerufen; `chartConfig.data.datasets.length > 1` und jedes Dataset trägt eine einzelne `backgroundColor`-Farbe (kein Array, da `isSingleAsset === false` → `theme.getColor(i-1)`) → `isRanking` ist `false` → Legende läuft durch den bestehenden „else"-Zweig (nicht `isPie || isRanking`). **Dies ist die einzige Stelle, an der CE-4 die Legend-Pill-/Button-Semantik einführt.**
- **Einzeldataset-Bar** (History-View, ein Asset, z. B. alle übrigen `bd_*`-CSVs in `bar-all.test.html`): `isSingleAsset === true` → `meta.interactiveFilters = false` (BarChartStrategy.js:189) → `_renderLegend()` wird gar nicht aufgerufen (`FwRenderer._renderLegend`: `if (interactiveFilters !== true) return null;`). Kein Legend-Pill-Delta betrifft diesen Fall — unverändert vor/nach CE-4. Wrapper/Titel/Range-Controls (kein View-Toggle, da `getViewOptions()` bei `columns.length <= 2` `[]` liefert) erhalten dennoch das neue Bar-Chrome, da dieses unabhängig vom Legend-Zweig ist.
- **Ranking-Bar geschützt** (View „Vergleich"): `_transformAssetView()` liefert `meta.interactiveFilters = false` **hartcodiert, unabhängig von der Datenmenge** (BarChartStrategy.js:226) → `_renderLegend()` wird nie aufgerufen → Ranking-Bar zeigt vor **und** nach CE-4 keine Legende. Der interne `isPie || isRanking`-Zweig in `_renderLegend()` (Array-basierte `backgroundColor`-Erkennung) bleibt dadurch für Bar weiterhin unerreichbarer, unveränderter Bestandscode — CE-4 fasst ihn nicht an. Damit ist die Ranking-Schranke strukturell erfüllt: kein Test kann eine Verhaltensänderung an der Ranking-Bar-Legende zeigen, weil dort nie eine Legende gerendert wird.
- **Range-/View-Controls gelten bei allen `type === 'bar'`-Fällen** (History wie Ranking) — das ist laut AP explizit erlaubt („Wrapper, Titel und vorhandene Controls dürfen bei allen `type === 'bar'`-Charts den gemeinsamen Bar-Chrome erhalten"), da sie unabhängig vom aktuell aktiven View gerendert werden.

## Umgesetztes Bar-Delta

**Wrapper/Titel/Fallback-Rhythmus (Delta A):** `type === 'bar'` erhält den stabilen Marker `fw-chart-wrapper--bar` über die neue Konstante `FW_BAR_WRAPPER_CLASS` (`fw-chart-wrapper flex flex-col gap-3 fw-chart-wrapper--bar`) sowie `FW_BAR_TITLE_CLASS` (`fw-chart-title m-0 text-lg font-bold text-primary`) — inhaltsgleich mit den Line-Rezepten aus CE-3, als eigene Konstanten geführt, damit Line byte-identisch bleibt. Der Tailwind-freie Fallback `.fw-chart-wrapper--bar { display:flex; flex-direction:column; gap:12px; }` spiegelt `gap-3` exakt (analog zur CE-3b-Lehre zum Line-Wrapper).

**Controls und M/L/S (Delta B):** Range- und View-Gruppen werden bei Bar zu echten `<div role="group" aria-label="Zeitspanne|Ansicht">` (`FW_BAR_SEGMENTED_GROUP_CLASS`/`FW_BAR_VIEW_GROUP_CLASS`), Optionen zu echten `<button type="button" aria-pressed>` (`FW_BAR_SEGMENTED_OPTION_CLASS`/`_ACTIVE_CLASS`) — vorher war die View-Option ein `<span>` ohne Button-Semantik. `ChartEngine._updateUIState()` setzt den Zustand für Bar jetzt über die neue Methode `_setBarSegmentedOptionState()` (vollständiger Klassentausch + `aria-pressed`), analog zu Line; die alte `classList.add/remove('active')`-Logik greift für Bar nicht mehr. Zone-S-Verhalten (Toolbar bleibt Zeile, zweite Gruppe bricht linksbündig um) ist strikt unter `.fw-chart-wrapper--bar` gekapselt und nutzt denselben CE-3b-Kaskaden-Tiebreak (bar-spezifischer `@container`-Block bewusst nach der Basisregel `margin-left:auto` platziert).

**Reguläre Legend-Pill und Toggle (Delta C):** Nur bei `chartConfig.type === 'bar' && !isRanking` (neue lokale Variable `isBarRegular`) erhält die Legendengruppe `FW_BAR_LEGEND_GROUP_CLASS` und jeder Eintrag wird ein echtes `<button type="button" aria-pressed>` mit `FW_BAR_LEGEND_PILL_CLASS`/`_HIDDEN_CLASS` (identisches DOC-01-Pill-Rezept: `border-border`-Ruhekontur, `hover:border-primary`/`hover:bg-bg-faint`/`hover:text-primary`). `ChartEngine._bindLegendEvents()` liest bei `state.type === 'bar'` den realen `chart.isDatasetVisible(index)`-Zustand und setzt ihn über die neue Methode `_setBarLegendPillState()` — keine eigene Sichtbarkeitsquelle, identisches Muster zu Line. Ranking-Bar-Legende (eigener, unveränderter Zweig) und Pie-Legende bleiben unangetastet.

**Manifest (Delta D):** Programmatisch geprüft (siehe Beweise) — keine Ergänzung nötig, `app.test.html` unverändert.

## Beweise

- **Scope-/Diff-/Syntax-QA:** `git status`/`git diff --stat` zeigen ausschließlich `FwRenderer.js` (+133/-9 Zeilen) und `ChartEngine.js` (+18/-5 Zeilen) sowie diese Ergebnisdatei geändert; keine Testseite, kein `tokens.css`, keine Strategie, kein App-Code, keine Spec/Doku/Backlog berührt. `node --check` auf beiden Dateien: exit 0.
- **Tailwind-/Fallback-Paritätsmatrix:** Wrapper (`display:flex/flex-direction:column/gap:12px` ↔ `flex flex-col gap-3`), Titel (`margin:0;font-size:18px` ↔ `m-0 text-lg font-bold text-primary`), Toolbar (`justify-content:flex-start;gap:8px` ↔ `flex flex-wrap items-center gap-2`), Segmented-Gruppe/-Option inkl. `[aria-pressed="true"]`-Aktivzustand, reguläre Legend-Pill inkl. Ruhe-/Hover-Kontur (`border:1px solid c.grid` → Hover `border-color:c.petrol;background-color:c.bgFaint`) und `[aria-pressed="false"]` (`opacity:0.4;grayscale`) — jeweils M/L (Basisregel `margin-left:auto`) und Zone S ≤450px (dedizierter, nach der Basisregel platzierter `@container`-Block, `margin-left:0`, kein `!important` auf `margin-left`) vollständig gespiegelt. Kein neues Token, kein neuer Hex-Wert — ausschließlich bereits vorhandene `c.*`/`f.*`-Theme-Werte und CSS-Var-Fallbacks (`--shadow-soft`/`--shadow-hover`) wiederverwendet.
- **Manifest-QA (programmatisch, PowerShell):** alle Tailwind-Utility-Tokens aus den 11 neuen `FW_BAR_*_CLASS`-Konstanten gegen das `@source inline(...)`-Manifest von `app.test.html` abgeglichen — 0 fehlende Tokens. `app.test.html` deshalb korrekt unverändert gelassen.
- **Line-/Donut-/Ranking-/Canvas-/Datenpfad-QA:** Vollständiger Diff zeilenweise geprüft — jede `isLine`-Bedingung/jeder `FW_LINE_*`-Aufruf ist byte-identisch zum Vor-CE-4-Stand (nur Kommentare ergänzt, keine Logik geändert); Pie-Zweig (`type==='pie'` → `_renderControls` liefert `null`; `isPie`-Branch in `_renderLegend`) unverändert; der `isPie || isRanking`-Legend-Zweig ist unverändert (Ranking-Bar ruft `_renderLegend` weiterhin nie auf, siehe Vertragskarte); `BarChartStrategy.js`, Datenpfade, `fwContext`, Achsen, Ticks, Tooltips, Datasets, Canvas, Canvas-Höhe, `FwTheme.init()`-Reihenfolge, Container-Query-Name `fw-chart` unverändert (keine dieser Dateien im Diff). Alte generische `.fw-btn-group`/`.fw-toggle`/`.fw-btn`/`.fw-toggle-opt`-Regeln inkl. ihres Zone-S-Blocks bewusst unverändert gelassen (nach CE-3+CE-4 für Bar/Line unbenutzt, aber außerhalb des Scopes — kein Aufräumauftrag).
- **`engine-dom-check.js`:** nicht geändert (`git status` bestätigt); der geprüfte Wrapper-Klassenvertrag (`hasClasses(wrapper, ['fw-chart-wrapper','flex','flex-col','gap-3'])`) bleibt erfüllt, da `FW_BAR_WRAPPER_CLASS` diese vier Klassen weiterhin als Teilmenge enthält (zusätzlich `fw-chart-wrapper--bar`, von `classList.contains` unberührt) — Tool ohne Browser lokal nicht ausführbar (DOM-abhängig), Code-Vertrag aber statisch verifiziert.

## Manuelle Albert-QA

1. `tests/engine/bar-all.test.html`: `bd_ranking_stress.csv`-Fall „4.2. Nichts angegeben" (Default-View „Verlauf", 10 Assets) auf M/L ansehen — Wrapper-Rhythmus, Titel, Range-/View-Controls, reguläre Pill-Legende (Ruhe-/Hover-Kontur, `aria-pressed`), Balken/Canvas unverändert.
2. Dieselbe Bar bei Engine-Containerbreite ≤450px: Controls/Pills umbrechen ruhig und linksbündig; keine zusätzliche Luft oder zentrierte Spalte.
3. Range-Buttons und View-Toggle („Verlauf"/„Vergleich") sowie reguläre Serien-Pill schalten: Aktivzustand, `aria-pressed`, Chart und BAN-freier Bestand bleiben synchron (kein BAN bei Bar).
4. Denselben Fall auf „Vergleich" (Ranking) umschalten: keine Legende sichtbar (unverändertes Bestandsverhalten), Range-/View-Controls weiterhin bedienbar mit neuem Bar-Chrome, Balken/Canvas unverändert.
5. Weitere Einzeldataset-Bar-Fälle (z. B. `bd_negative_crash.csv`, `test_data_singlebalken.csv`) ansehen: Wrapper/Titel/Range-Controls im neuen Bar-Chrome, keine Legende (unverändert, da `interactiveFilters=false`).
6. Einen Line- und einen Donut/Pie-Referenzfall ansehen: CE-3b-Line-Optik unverändert; keine neue Bar-Klasse dort.

Status: **offen** — noch keine reale Browser-Rückmeldung von Albert zu diesem AP.

## Nicht Teil dieses APs

Canvas, Balkengeometrie, Achsen, Skalen, Farben der Daten, Tooltips, Daten, Animationen, Plugins; BAN (bleibt line-exklusiv, keine Bar-BAN erzeugt); Ranking-Bar-Legende (unverändert, eigener Zweig); Line- und Donut/Pie-Chrome (unverändert); Popover (F-06 bleibt Schranke vor CE-5); Tokens (`tokens.css`/`FwTheme`); `tools/engine-dom-check.js`; die alten generischen `.fw-btn-group`/`.fw-toggle`/`.fw-btn`/`.fw-toggle-opt`-CSS-Regeln (jetzt für Bar/Line unbenutzt, aber nicht entfernt — kein Aufräumauftrag dieses APs).

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme dieses Protokolls (inkl. realer Browser-QA): CE-5 Donut/Pie-Chart-Chrome; F-06 bleibt vorherige Scope-Schranke für Popover.
