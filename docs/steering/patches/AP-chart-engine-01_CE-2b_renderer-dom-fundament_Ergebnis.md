Stand: 2026-07-14 | Session: AP-chart-engine-01 / CE-2b | Geändert von: Claude

# AP-chart-engine-01, CE-2b: Gemeinsames Renderer-DOM-Fundament — Ergebnisprotokoll

**Status: GRÜN — Alberts Browser-Abnahme bestätigt (2026-07-14): Struktur beide Datenpfade grün, Fehlerfläche auf Tailwind-freier und Tailwind-Seite CI-konform und identisch.**

Kettenposition: CE-1 (Inventur) ✅, CE-1a (Quellenabschluss) ✅, **CE-2b** (dieser AP, ersetzt den gestoppten CE-2). Nächster Schritt nur nach Abnahme: CE-3 (Line-Chrome).

## Was wurde gemacht

Die charttypübergreifenden gemeinsamen DOM-Slots in `FwRenderer.js` auf statische Tailwind-Literalrezepte migriert und mit einem tokenbasierten CSS-Kompatibilitätsboden für die absichtlich Tailwind-freien Engine-Testseiten abgesichert (Auflösung von Finding **F-07** aus CE-2). Zielrezepte: `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.9/§6.10/§6.11.

- **Wrapper:** `fw-chart-wrapper flex flex-col gap-3` — Klasse `fw-chart-wrapper` bleibt Container-Query-Anker (`container-type: inline-size`, `container-name: fw-chart`).
- **Canvas-Container:** `fw-chart-canvas-container relative w-full` — Klasse bleibt Engine-Höhen-Anker (400px).
- **A11y-Tabelle:** Inline-Verbergung (`left:-9999px`) entfernt; Tabelle trägt `sr-only fw-chart-a11y-fallback`. Neuer `_injectStyles`-Fallback `.fw-chart-a11y-fallback` (absolut, 1×1px, overflow:hidden) hält die Datentabelle auch ohne Tailwind verborgen — bewusst voll-spezifisch, damit die Verbergung nie überschreibbar ist.
- **Loading:** `showLoading()` — Träger `role="status"`, Zentrier-Wrapper `flex items-center justify-center gap-3 p-6 text-text-muted` (+ Anker `fw-loading-container`), Spinner `h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-border border-t-primary` (+ Anker `fw-loader`), sichtbarer Text „Daten werden geladen …". Bestehende `.fw-loading-container`/`.fw-loader`/`@keyframes fw-spin` (FwTheme-Token-basiert) als Fallback belassen.
- **Error:** `showError()` — `role="alert"`, `fw-chart-error rounded-lg border border-error-border bg-error-bg p-4 text-error-text`, Inline-Farb-/Padding-/Font-/Weight-Werte entfernt (inkl. der dadurch verwaisten `c`/`f`-Deklarationen — Surgical-Cleanup). „❌ Fehler: …"-Präfix + `textContent` (SafeDOM) bleiben.
- **Error-Fallback (CI-konform):** `.fw-chart-error` in `_injectStyles` spiegelt das CI-Error-Rezept aus §6.10 über die Tokens `var(--color-error-text/-bg/-border)` (Hex nur als Fallback für Test-HTMLs ohne `tokens.css`), Radius `0.5rem` (= `rounded-lg`), Padding 16px (= `p-4`). Dadurch ist die Engine-Fehlerfläche auf Tailwind-freien wie Tailwind-Seiten CI-konform und identisch.

Unangetastet: `ChartEngine.js`, `FwTheme.js`, `FwLayoutRules.js`, Strategien, Plugins, Datenpfade, CSVParser/FinanzwesirData/DateUtils, Achsen/Ticks/Tooltips, Canvas, Event `fw-chart-show-details`, Canvas-Höhe, `@container fw-chart`-Zonen, `FwTheme.init()`-Reihenfolge, Titel/BAN/Toolbar/Legende/Popover-Chrome (charttypspezifische Folge-Slices).

## Korrekturverlauf Fehlerfläche (Transparenz)

Der erste CE-2b-Wurf legte den Error-Fallback auf `${c.purpur}` (Purpur, fett) — „lesbar", aber **nicht CI-konform**. Auf Tailwind-Seiten überschrieb dieser Fallback per Quell-Reihenfolge sogar Tailwinds `text-error-text`, sodass die Fehlerfläche auf beiden Seiten purpur war. Albert (2026-07-14) hat das als Fehler markiert: Lesbarkeit ≠ CI-Konformität. Korrigiert auf das §6.10-Tokenrezept (oben). Diese CI-Konformität hat bewusst Vorrang vor der ursprünglichen CE-2b-Prompt-Vorgabe „minimal, keine Card-Optik, kein Hex" (Alberts aktuelle Anweisung + §6.10 schlagen die archivierte Prompt-Detailregel).

## Verifikationswerkzeug (neu, dauerhaft)

`tools/engine-dom-check.js` — read-only Browser-Konsolen-Diagnose für das Engine-DOM, AP-neutral und wiederverwendbar für CE-3–CE-6 und alle Chart-Typen. Prüft über beide Datenpfade (`.financial-chart-module`, `[data-fw-appchart]`) je Chart: A11y-Tabelle vorhanden **und** effektiv verborgen, Verbergungs-Mechanismus (`sr-only` vs. Fallback), Wrapper-Klassenanker + Container-Query, Canvas-Container-Anker + 400px, `<canvas>`; zusätzlich Loading/Error-Status-Flächen (`role`). Nicht gerenderte Container (Multi-Szenario-Seiten) werden als „inaktiv" übersprungen, nicht als FAIL gewertet. Abgrenzung: kein CI-Token-/Farb-Check (das bleibt `ci-token-check.js`), kein fachliches Chart-Verhalten (das bleibt die manuelle REGRESSION-MATRIX).

## Beweise

**Statisch / Code (durch Claude):**
- `git diff`: nur `FwRenderer.js` geändert (5 Slot-Regionen + 2 Fallback-Regeln + Klärkommentare); neue Datei `tools/engine-dom-check.js`. Fremdstände (`session-log.md`, zwei Chroniken) unberührt.
- Erhalten (Grep): `container-type: inline-size`, `container-name: fw-chart`, beide `@container fw-chart`-Zonen, Canvas-Höhe 400px, `this.theme.init()`.
- Neue Klassen/Rollen präsent: `sr-only fw-chart-a11y-fallback`, `role="status"`, `role="alert"`, `fw-chart-error rounded-lg …`, Ladetext.
- Keine neue dynamische Tailwind-Klassenbildung (die einzigen `+`-Konkatenationen `'fw-btn ' + …`/`'fw-toggle-opt ' + …` sind Bestand, charttypspezifisch, außerhalb Scope). Kein neuer variabler `innerHTML`-Pfad; Nutzdaten via `textContent` (SafeDOM).

**Tool-/Browser (durch Albert, `engine-dom-check.js`):**

| Seite | Umgebung | Aktive Charts | A11y verborgen | Verbergung | Struktur |
|---|---|---|---|---|---|
| `tests/engine/line-ci.test.html` | Tailwind-frei | 9/9 | PASS | `Fallback(left:-9999px)` | alle PASS |
| `app.test.html` Screen 2 | Tailwind | idx 0 | PASS | `sr-only+Fallback` | alle PASS |
| `app.test.html` Screen 4 | Tailwind | idx 0–2 | PASS | `sr-only+Fallback` | alle PASS |

**Fehlerfläche (Error-Probe, `role="alert"` PASS):**

| Seite | `color` | `background` | CI-konform |
|---|---|---|---|
| `app.test.html` (Tailwind) | `#B71C1C` (`--color-error-text`) | `#FFF8F8` (`--color-error-bg`) | ✅ |
| `line-ci.test.html` (Tailwind-frei) | `#B71C1C` (Token-Fallback) | `#FFF8F8` (Token-Fallback) | ✅ |

Albert-Bestätigung: „Jetzt auf beiden Seiten CI-konform."

## Scope-QA

- Zulässiger Write-Scope eingehalten: genau `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` geändert; `tools/engine-dom-check.js` als separat freigegebenes Diagnosewerkzeug neu.
- Keine Änderung an Testseiten, deren CSS, Manifesten, `tokens.css`, Specs, Backlog oder App-Code.
- `FwTheme`-Bridge, Container-Queries und Canvas-Höhe nachweislich intakt.

## Restbefunde (nicht Teil dieses APs)

- **Loading-Fallback-Koexistenz:** Auf Tailwind-Seiten können die beibehaltenen `.fw-loading-container`/`.fw-loader`-Fallbackregeln per Quell-Reihenfolge über das Tailwind-Spinner-Rezept gewinnen (3px/`loaderBg` statt 4px/`border`; Spinnerfarbe petrol=primary, also gleich). Kosmetisch, transient, von Albert nicht beanstandet — offen für optionale Harmonisierung, falls gewünscht.
- **F-05:** veraltete `TECH-SPEC Theme-Integration Chart-Engine.md` — separater Dokumentationsbefund.
- **F-06:** Pie-Drill-down-Popover an `document.body` — Entscheidungsschranke vor CE-5.
- Titel/BAN/Toolbar/Controls/Legende/Popover (`aria-pressed` inkl.), Canvas, Plugins — spätere charttypspezifische Slices.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme dieses Protokolls: CE-3 Line-Chart-Chrome. Ausdrücklich nicht: CE-3 ausführen, Bar-/Donut-/Popover-/Plugin-/Canvas-/Daten-/App-Arbeit.

Commit erfolgt durch Albert (Code: `FwRenderer.js` + `tools/engine-dom-check.js`; dazu dieses Protokoll). Kein Commit durch Claude. Stop.
