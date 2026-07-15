Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-5c (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-5c: gemeinsamer Chart-Fokus-Fallback — Ergebnisprotokoll

Status: GRÜN — statische QA und manuelle Albert-Browser-QA vollständig bestanden.

## Vorfundene Fremdstände und CE-5c-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
 M docs/steering/patches/AP-chart-engine-01_CE-5_donut-pie-chrome_segment-daempfung_Ergebnis.md
 M tools/engine-dom-check.js
?? docs/steering/patches/AP-chart-engine-01_CE-5a_pie-segment-daempfung_focus-visible-korrektur_Ergebnis.md
?? docs/steering/patches/AP-chart-engine-01_CE-5b_pie-focus-petrol500-fallback-korrektur_Ergebnis.md
?? tools/pie-segment-damping-interaction-check.js
```

- **Vorbestehender, uncommitteter CE-5/CE-5a/CE-5b-Arbeitsstand (abgenommen bzw. manuell geprüft, nicht angefasst):** `ChartEngine.js`, beide Tools, die CE-5-/CE-5a-/CE-5b-Ergebnisdateien. Nicht zurückgesetzt, nicht neu formatiert, nicht funktional verändert.
- **CE-5c-eigener Diff:** ausschließlich in `FwRenderer.js` — Entfernung der alleinstehenden Pie-Fokusregel samt `ring-offset-2` aus dem Pie-Klassenliteral, Ergänzung einer gemeinsamen `:focus-visible`-Fallback-Regel für Line-/Bar-/Pie-Chart-Primitiven — plus diese neue Ergebnisdatei.

## Ursache und spezifischer Fokusvertrag

Die gemeinsamen Line-/Bar-Rezepte `FW_CHROME_SEGMENTED_OPTION_*`/`FW_CHROME_LEGEND_PILL_*` enthalten bereits korrekt `focus-visible:ring-2 focus-visible:ring-petrol-500` (Tailwind-Pfad). Die permanenten, absichtlich Tailwind-freien Engine-Testseiten hatten dafür aber nie eine `:focus-visible`-Fallback-Regel — Browser zeigten dort den schwarzen Standardring. CE-5a/CE-5b hatten stattdessen ausschließlich für Pie eine eigene Fallback-Regel mit `ring-offset-2` ergänzt (aus dem allgemeinen Button-Vertrag §6.4 übernommen) — das erzeugte einen unzulässigen optischen Sonderweg: Pie mit weißem Fokus-Abstand, Line/Bar ohne jeden Fallback-Fokus. Der spezifischere Chart-Primitive-Vertrag (Baukasten §6.5/§6.11/§8, Visual Board „Fokus“) verlangt für Segmented-Option, Legend-Pill und Pie-Segment-Dämpfung denselben Petrol-500-Ring **ohne** Offset — er präzisiert den allgemeinen Button-Vertrag hier bewusst.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (drei zusammenhängende Änderungen, siehe unten)
- Diese Ergebnisdatei (neu)

Keine andere Datei geändert. Insbesondere nicht `FwTheme.js`, nicht `tokens.css`, nicht `ChartEngine.js`, keine Strategie, keine Plugins, keine Tests, kein Tool, kein Manifest, keine sonstige Dokumentation, kein Commit.

## Gemeinsame Fallback-Regel

Die bisher alleinstehende Pie-Regel (`.fw-pie-segment-damping-item:focus-visible { outline: none; box-shadow: 0 0 0 2px ${c.bgWhite}, 0 0 0 4px ${c.petrol80}; }`, samt der jetzt falschen „Offset“-Aussage) wurde entfernt. Am Ende der `.fw-chart-chrome`-Fallback-Regeln (nach dem Zone-S-`@container`-Block, vor dem Line-BAN-exklusiven Abschnitt) steht jetzt genau eine gemeinsame Regel:

```css
.fw-chart-chrome .fw-chart-segmented-option:focus-visible,
.fw-chart-chrome .fw-legend-item:focus-visible,
.fw-pie-segment-damping-item:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${c.petrol80};
}
```

Die ersten beiden Selektoren sind durch den gemeinsamen `.fw-chart-chrome`-Anker auf Line und regulären Bar begrenzt; der dritte durch den bereits vorhandenen, Pie-eigenen Segment-Dämpfungs-Anker. Ranking-Bar (rendert strukturell nie eine `.fw-chart-legend`, unverändert), alte generische Legenden und andere Charttypen sind von keinem der drei Selektoren erfasst. Genau `0 0 0 2px ${c.petrol80}` — kein weißer Offset-Schatten mehr, exakte Spiegelung von `ring-2 ring-petrol-500` ohne `ring-offset-2`. Nur während `:focus-visible` aktiv; bei Fokusverlust greifen die bisherigen Ruhe-/Hover-/Ghost-Schatten unverändert (native CSS-Pseudoklasse, kein JS nötig).

## Pie-Angleichung

Im statischen Klassenliteral der Pie-Segment-Dämpfungs-Buttons (`FwRenderer._renderLegend()`, `isPie`-Zweig) wurde ausschließlich `focus-visible:ring-offset-2` entfernt:

- **Vorher:** `'fw-legend-item fw-pie-segment-damping-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2'`
- **Nachher:** `'fw-legend-item fw-pie-segment-damping-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500'`

Kein anderer Teil des Literals, kein `aria-pressed`, kein `hidden-dataset`, keine Klick-/Canvas-Logik geändert — bestätigt durch Diff (nur diese eine Zeile im entsprechenden Codeblock verändert, begleitende Kommentare aktualisiert, keine Funktionszeile berührt).

## Token- und Schutznachweise

- **Token-Nachweis:** `tokens.css` → `--color-petrol-500: #49B3AF` (unverändert seit CE-5b geprüft); `FwTheme.js` → `petrol80` liest genau diesen Wert (unverändert, nicht Teil dieses Write-Scopes); Tailwind-Literale (`FW_CHROME_SEGMENTED_OPTION_*`, `FW_CHROME_LEGEND_PILL_*`, Pie-Literal) und der neue gemeinsame Fallback nutzen durchgehend dieselbe Stufe (`ring-petrol-500` / `c.petrol80`).
- **Positivnachweis:** genau eine gemeinsame `:focus-visible`-Fallback-Regel mit den drei festgelegten Selektoren (bestätigt per Grep); sie nutzt ausschließlich `c.petrol80` und exakt `0 0 0 2px` ohne weißen Offset-Schatten; das Pie-Literal enthält kein `focus-visible:ring-offset-2` mehr (bestätigt: einziger Treffer für „ring-offset-2“ im Diff ist eine erklärende Kommentarzeile, keine Codezeile); `FW_CHROME_SEGMENTED_OPTION_*`/`FW_CHROME_LEGEND_PILL_*`-Konstantendeklarationen: 0 Treffer im Diff — bytegleich.
- **Negativnachweis:** kein allgemeiner `.fw-legend-item:focus-visible`-Selektor ohne Chrome-/Pie-Anker (Grep bestätigt: einziger Treffer ist `.fw-chart-chrome .fw-legend-item:focus-visible`, korrekt gescoped); keine Änderung an Click-/State-/Canvas-Code, `ChartEngine.js`, Strategien, Plugins, Tests, Tool oder Manifest (bestätigt durch Scope-Diff, `git status --short`); keine `:focus`-Regel ohne `-visible` (Grep-Treffer für bares „:focus“ sind ausschließlich Kommentartext).

## Statische QA

1. **`node --check`:** exit 0 für `FwRenderer.js`.
2. **`git diff --check`:** exit 0, keine Whitespace-Fehler.
3. **Scope-Diff:** `git status --short` zeigt nur `FwRenderer.js` zusätzlich verändert; vorbestehender CE-5/CE-5a/CE-5b-Stand und Fremdstände unangetastet.
4. **Positiv-/Negativnachweis:** siehe „Token- und Schutznachweise“ oben — vollständig bestanden.
5. `engine-dom-check.js` nicht verändert und nicht als Farbtest herangezogen — es deckt strukturelle Tastaturfähigkeit ab, nicht den Pseudoklassen-Stil (wie im Auftrag festgehalten).

## Manuelle Albert-QA

Status: **bestanden.** Albert: „Fokus auf Line/Bar/Pie in S/M/L geprüft und ok.“

1. `line-ci.test.html`, `bar-ci.test.html`, `pie-ci.test.html`: auf S, M und L mit Tab durch Zeitfenster, View-Control und Pills navigiert. **Bestätigt.**
2. Jeder Fokus ist derselbe Petrol-500-Ring wie „Fokus“ im Visual Board; kein schwarzer/oranger Browser-Ring, kein weißer Offset mehr nur bei Pie. **Bestätigt.**
3. Maus-Hover, aktiv/ausgeblendet bzw. ghost, Enter/Space, Segment-Dämpfung und Canvas bleiben unverändert (bereits über CE-5/CE-5a/CE-5b bestätigt, hier als Regressionsschranke erneut mitgeprüft). **Keine Abweichung gemeldet.**
4. Ranking-Bar: unverändert, keine erfundene Fokusregel an seiner nicht-Chrome-Legende. **Keine Abweichung gemeldet.**

## Nicht Teil dieses APs

Jede Änderung an `FwTheme.js`, `tokens.css`, `ChartEngine.js`, Strategien, Plugins, Tests, Tools, Manifest, sonstiger Dokumentation; jede neue `FW_*`-Konstante, Registry oder neues CSS-Primitive; jede Änderung an `aria-pressed`, `hidden-dataset`, Ghosting, Klicklogik, Canvas, Daten, Center-Text, Drill-down; Commit.

## Nächster zulässiger Schritt

Nur nach Alberts realer Browser-QA (Checkliste oben): Abnahme dieses Protokolls zusammen mit CE-5, CE-5a und CE-5b. Danach gilt die Chart-Chrome-Fokusdarstellung für Line, regulären Bar und Pie/Donut als einheitlich und vollständig abgeschlossen. Kein Commit ohne Alberts expliziten Auftrag.
