Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-5b (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-5b: Pie-Fokus, Petrol-500-Fallbackkorrektur — Ergebnisprotokoll

Status: GELB — statische QA vollständig bestanden; die hier korrigierte, eigenständige Pie-Fallback-Regel wurde durch CE-5c (gemeinsamer Chart-Fokus-Fallback) vollständig ersetzt, bevor eine separate manuelle Albert-QA speziell für CE-5b stattfand. **Aufgehoben durch CE-5c** — die hier belegte Token-Korrektur (`c.petrol` → `c.petrol80`, Petrol-600 → Petrol-500) ist inhaltlich in die neue gemeinsame Regel übernommen und real bestätigt (Albert: „Fokus auf Line/Bar/Pie in S/M/L geprüft und ok“).

## Vorfundene Fremdstände und CE-5b-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
 M docs/steering/patches/AP-chart-engine-01_CE-5_donut-pie-chrome_segment-daempfung_Ergebnis.md
 M tools/engine-dom-check.js
?? docs/steering/patches/AP-chart-engine-01_CE-5a_pie-segment-daempfung_focus-visible-korrektur_Ergebnis.md
?? tools/pie-segment-damping-interaction-check.js
```

- **Vorbestehender, uncommitteter CE-5/CE-5a-Arbeitsstand (abgenommen bzw. manuell geprüft, nicht angefasst):** `ChartEngine.js`, beide Tools, die CE-5- und CE-5a-Ergebnisdateien. Vollständig unverändert von CE-5b.
- **CE-5b-eigener Diff:** genau eine Ein-Wert-Korrektur in `FwRenderer.js` (siehe unten), plus diese neue Ergebnisdatei.

## Fehlerbeleg und verbindlicher Tokenvertrag

CE-5a setzte im Tailwind-freien Fallback der Pie-`focus-visible`-Regel `${c.petrol}` als Ringfarbe ein. `c.petrol` ist der Alias für Petrol-600 (`#218380`, `FwTheme.js` Konstruktor-Default), nicht Petrol-500. Der Baukasten-Vertrag (§6.4/§8) und das Visual Board definieren den Fokusring verbindlich als `focus-visible:ring-petrol-500`; `tokens.css` definiert `--color-petrol-500: #49B3AF` (Zeile 23, geprüft). `FwTheme.js` liest genau diesen Wert in `this.colors.petrol80` (`petrol80 = read('--color-petrol-500', ...)`, Konstruktor-Default ebenfalls `#49B3AF`). Der Tailwind-Pfad war bereits korrekt (`focus-visible:ring-petrol-500`, CE-5a unverändert); nur der Fallback verwendete die falsche Ramp-Stufe — ein sichtbarer Bruch zwischen Tailwind-Ausgabe und Testseiten-Fallback.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (eine Zeile, ein Wert geändert)
- Diese Ergebnisdatei (neu)

Keine andere Datei geändert. Insbesondere nicht `FwTheme.js`, nicht `tokens.css`, nicht `ChartEngine.js`, keine Strategie, keine Tests, kein Tool, kein Manifest, keine Spec-/Design-Dokumentation, kein Commit.

## Exaktes Ein-Wert-Delta

In der ausschließlich Pie-spezifischen Regel `.fw-pie-segment-damping-item:focus-visible`:

- **Vorher:** `box-shadow: 0 0 0 2px ${c.bgWhite}, 0 0 0 4px ${c.petrol};`
- **Nachher:** `box-shadow: 0 0 0 2px ${c.bgWhite}, 0 0 0 4px ${c.petrol80};`

Selektor, `outline: none`, weißer 2px-Abstand, Reihenfolge, alle übrigen Werte: bytegleich. Keine Hexfarbe geschrieben — `c.petrol80` ist der bereits vorhandene Theme-Ramp-Slot. Keine Änderung an `fw-pie-segment-damping-item` (Name, Zusammensetzung), an den Tailwind-Klassen (bereits korrekt `focus-visible:ring-petrol-500`) oder an einer anderen `c.petrol`-Verwendung im Renderer.

## Token-Nachweis

| Quelle | Beleg |
|---|---|
| `tokens.css` | Zeile 23: `--color-petrol-500: #49B3AF;` |
| `FwTheme.js` | `this.colors.petrol80 = read('--color-petrol-500', this.colors.petrol80);` (Konstruktor-Default ebenfalls `#49B3AF`) |
| Tailwind-Literal (Pie-Button, CE-5a, unverändert) | `focus-visible:ring-petrol-500` |
| Fallback (CE-5b, neu) | `${c.petrol80}` → `#49B3AF` — identische CI-Stufe wie das Tailwind-Literal |

## Statische QA

1. **`node --check`:** exit 0 für `FwRenderer.js`.
2. **`git diff --check`:** exit 0, keine Whitespace-Fehler.
3. **Diff-Nachweis:** `git diff` zeigt in `FwRenderer.js` gegenüber dem CE-5a-Stand genau eine fachliche Änderung — `c.petrol` → `c.petrol80` in der Pie-`focus-visible`-Zeile. Keine weitere Zeile im Diff verändert.
4. **Negativnachweis:** `git status --short` zeigt keine weitere Datei verändert; keine weitere `c.petrol`-Verwendung im Diff berührt; `engine-dom-check.js` unverändert (prüft bewusst keine Fokusfarben, gehört nicht zu diesem Minifix).

## Manuelle Albert-QA

Status: **offen** — noch keine reale Browser-Rückmeldung von Albert zu diesem AP.

1. `tests/engine/pie-ci.test.html` auf S, M und L: Tab-Fokus auf aktivem und gedämpftem Legendeneintrag — derselbe helle Petrol-500-Ring wie im Visual Board, kein dunkler Petrol-600-, schwarzer oder oranger Ring.
2. Maus-Klick, Hover, ghost und Segment-Dämpfung: unverändert (bereits über CE-5/CE-5a bestätigt, hier nur erneut als Regressionsschranke).
3. Ein Line- und Bar-Referenzfall: unverändert.

## Nicht Teil dieses APs

Jede Änderung an `FwTheme.js`, `tokens.css`, `ChartEngine.js`, Strategien, Tests, Tools, Manifest, Dokumentation; jede Änderung an `aria-pressed`, `hidden-dataset`, Ghosting, Klicklogik, Canvas, Daten, Plugins, Center-Text, Drill-down, `.fw-legend-item`, `.fw-chart-chrome` oder Line-/Bar-Rezepten; Commit.

## Nächster zulässiger Schritt

Nur nach Alberts realer Browser-QA (Checkliste oben): Abnahme dieses Protokolls zusammen mit CE-5 und CE-5a. Danach gilt die Pie-Segment-Dämpfung inkl. CI-konformer Fokusdarstellung als vollständig abgeschlossen. Kein Commit ohne Alberts expliziten Auftrag.
