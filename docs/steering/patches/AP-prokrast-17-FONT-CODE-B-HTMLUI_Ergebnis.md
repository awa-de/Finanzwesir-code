Stand: 2026-07-11 06:41 | Session: AP-prokrast-17-FONT-CODE-B | Geändert von: Claude

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein (Freigabe bei Albert) · **Typ:** Code/CSS, HTML-UI-Font-Migration

---

## Ziel

HTML-UI-Font durchgängig über Tokens (`--font-body`/`--font-display`), analog zum bereits committeten Canvas-Pfad A (KDR 14). Einziger realer Bruch war der App-Zweig (`--fw-font-base` nirgends definiert → Fallback `sans-serif`).

## Gelesen (Verifikation vor Code)

- `Apps/prokrastinations-preis/app.css` (voll)
- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (Konstruktor Z.27-31, `showError` 48-59, `_renderControls`/`_renderLegend`/`_renderA11yTable`/`_injectStyles` 248-459)
- `Theme/assets/css/tokens.css` (nur lesen — Font-Token-Definitionen)
- `Theme/assets/js/fw-chart-engine/core/FwTheme.js` (Font-Lesestellen `init()` Z.151-152)
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (KDR 14 inkl. P5, Layer-5-Zelle)
- `docs/spec/Der Rucksack (Context Object Pattern).md` (keine Font-Erwähnung → fwContext font-frei)
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` (Face-Layer/Renderer)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` (TC-N07, TC-N09)

## Zentrale Frage geklärt: Herkunft von `f` in `FwRenderer` → init()'te `this.theme`

- `FwRenderer`-Konstruktor Z.27-31: `this.theme = new FwTheme(); this.theme.init();` — `this.theme` ist die init()'te Instanz.
- `FwTheme.init()` Z.151-152 liest real `--font-body`→`this.fonts.body`, `--font-display`→`this.fonts.heading` (Pfad A, committet `dbe5007`).
- `_injectStyles()` Z.406 `var f = theme.fonts`; `showError` Z.50/55 `f = this.theme.fonts` ziehen genau daraus.
- `tokens.css`: `--font-body: 'Source Sans Pro', sans-serif` / `--font-display: 'Archivo Black', sans-serif`.

**→ B2–B7 sind token-gespeist, verify-only (keine Änderung):**

| Fläche | Stelle | Quelle | Verdikt |
|---|---|---|---|
| B2 Legende/Pills | `_injectStyles` Z.409 `.fw-chart-wrapper` | `${f.body}` | ✅ verify-only |
| B3 Range-Buttons/Toggle | Z.414 `.fw-btn,.fw-toggle-opt` | `${f.body}` | ✅ verify-only |
| B4 BAN | Z.447-449 `.fw-ban-*` | `${f.body}` | ✅ verify-only |
| B5 Popover | Z.430 `.fw-chart-popover` / 442 Btn | `${f.body}` | ✅ verify-only |
| B7 Fehlermeldung (Engine) | `showError` Z.55 | `this.theme.fonts.body` | ✅ verify-only |
| B6 A11y-Tabelle | `_renderA11yTable` 368-399 | kein eigenes font-family → erbt Container (`.fw-chart-wrapper`=f.body bzw. im Piloten `.fw-app`) | ✅ verify-only |

Keine engine-injizierte Fläche zieht aus einer nicht-init()'ten Quelle oder einem Literal → **keine Angleichung nötig, keine Engine-Datei geändert.**

## Geänderte Dateien mit Patch je Stelle

### 1. `Apps/prokrastinations-preis/app.css`

**Patch 1 — Z.13 (der sichtbare Fix):**
```
- font-family: var(--fw-font-base, sans-serif);
+ font-family: var(--font-body, sans-serif); /* CHANGED — AP-prokrast-17-FONT-CODE-B: Namens-Mismatch behoben, HTML-UI-Font über tokens.css (Source Sans Pro), analog Canvas-Pfad KDR 14 */
```
Damit B9 (Fließtext) repariert; App-Headlines (`.fw-app__screen-headline` Z.133, `.fw-app__station-headline` Z.225, kein eigenes font-family), A11y-Tabelle-im-Piloten und App-Lade-/Fehlermeldungen (`app.js` render into `.fw-app`) ziehen automatisch mit (gleiche Vererbungsquelle). `--font-body` kommt aus `tokens.css` auf `:root` — dieselbe Quelle wie das schon genutzte `--color-text` (Z.15).

**Patch 2 — Kopf-Kommentar Z.4-6 (chirurgische Folgekorrektur):** Der AP-17-Kommentar „Bewusst NICHT migriert: `--fw-font-base` …" wäre nach Patch 1 eine Falschaussage → umgeschrieben auf „`--fw-font-base` in AP-prokrast-17-FONT-CODE-B zu `--font-body` migriert (… Rubikon-Nachmessung dadurch fällig → DS-FOLLOWUP-07). Weiterhin NICHT migriert: `--fw-space-*` und alle Mechanik-Tokens". Kein sich selbst widersprechender Kommentar zurückgelassen.

### 2. `Apps/prokrastinations-preis/QA_TEST_CASES.md`

**Patch 3 — QA-Soll nachgezogen (kein widersprüchlicher QA-Stand):**
- **TC-N07:** Schritt 2 zählt jetzt zusätzlich `var(--font-body`; Erwartung Z.1717 `var(--fw-font-base` genau **0×** (migriert) + `var(--font-body` genau **1×**; Fehlschlagbedingung und Status auf neuen Soll umgeschrieben. Verifizierter Soll: `--fw-color-` 0 / `--color-` 24 / `var(--fw-font-base` 0 / `var(--font-body` 1 / `--fw-space-` 19.
- **TC-N09:** Titel + Schritte + Erwartung + Fehlschlag + Status komplett umgeschrieben von „Font bewusst nicht migriert, Position stabil" → „Font zu `--font-body` migriert, Rubikon-Nachmessung fällig". Rubikon-Nachmessung ist jetzt sachlich nötig (Font hat gewechselt), nicht mehr nur vorsorglich (DS-FOLLOWUP-07).

## Headline-Entscheidung: H-A (body-only) — was gemacht, warum

Albert entschied H-A. Headlines (`.fw-app__screen-headline`, `.fw-app__station-headline`) erben `--font-body` (Source Sans Pro, bold) — **keine** eigene `--font-display`/Archivo-Black-Regel eingebaut. Begründung: Nicht-Ziel „Design über minimalen Token-Bezug hinaus"; die Engine gibt selbst `.fw-chart-title` nur `f.body` (Z.410), nicht heading; `--font-display` hat repo-weit null Consumer. Archivo-Black-Headlines = eigenständige spätere Design-Entscheidung, nicht Teil dieses AP.

## Ausdrücklich NICHT geändert

- **Canvas-Pfad A1–A7** (`FwLayoutRules`, `FwSmart*Axis`, `FwSmartTooltips`, Strategy-`fontConfig`) — unberührt (`git diff` zeigt keinen `Theme/`-Diff).
- **A6** (`FwChartTextPlugin.js:95`, Rubikon-Marker) — unberührt (Backlog).
- **`FwRenderer.js`** — verify-only, kein Diff.
- **`tokens.css` / `screen.css`** — Werte nicht geändert (nur `tokens.css` gelesen).
- **`fwContext`** — nicht berührt; keine Fonts in fwContext (Der Rucksack font-frei).
- **Spec-Status KDR 14 P5** — bewusst NICHT gehoben (bleibt „Code offen"; Hebung kommt einmal nach dem Review-AP).
- **`--fw-space-*`**, **`app.test.html`**, **`app.js`** — unberührt.

## Body-QA (Datei = Wahrheit, nach jedem Write voll gelesen)

- `app.css` Z.1-16: Kopf-Kommentar korrekt umgeschrieben, Z.14 `var(--font-body, sans-serif)` mit `// CHANGED`-Marke ✅
- `QA_TEST_CASES.md` TC-N07 (1704-1726) + TC-N08 unverändert dazwischen + TC-N09 (1752-1771): neuer Soll durchgängig konsistent, keine Rest-`bewusst nicht migriert`-Aussage zu `--fw-font-base` mehr ✅
- Deterministische Zählung gegen die reale `app.css`: `var(--fw-color-` 0 · `var(--color-` 24 · `var(--fw-font-base` 0 · `var(--font-body` 1 · `var(--fw-space-` 19 ✅
- `git diff --name-status`: nur `app.css` + `QA_TEST_CASES.md` (+ `session-log.md` aus Warm-Start), kein `Theme/`-Diff ✅

## Positiv-/Negativkriterien

- **Positiv erfüllt:** App-Fließtext/-Headlines + A11y-im-Piloten + App-Meldungen tragen CI-Font über Tokens; B2–B7 nachweislich token-gespeist (verifiziert); keine undefinierte `var(--fw-font-base`-Referenz mehr.
- **Negativ eingehalten:** kein Font-Hardcode/undefinierte Referenz übrig; keine Fonts in fwContext; Canvas-Pfad unberührt; `tokens.css`/`screen.css`-Werte unverändert.

## Restliste / Konsequenzen (kein Fix hier)

- **DS-FOLLOWUP-07 (Backlog):** Body-Font `sans-serif`→`Source Sans Pro` ändert die Textmetrik → die statisch gemessene Rubikon-„?"-DOM-Textposition kann sich verschieben. Nachmessung S/M/L jetzt sachlich fällig — nur benannt, nicht gefixt (Nicht-Ziel).
- **TC-N08** (S/M/L-Farb-Viewport-Matrix) bleibt unverändert offen (nicht Font-bezogen).
- **Praktischer Font-Rendering-Test — LIVE BESTÄTIGT (Albert, 2026-07-11, `app.test.html`):** `--font-body` löst auf `'Source Sans Pro', sans-serif` auf (tokens.css greift live), `document.fonts.check("16px 'Source Sans Pro'")` = ✅ verfügbar (Schrift real geladen, kein sans-serif-Fallback). **Alle fünf HTML-UI-Flächen direkt beobachtet** (Albert, 2026-07-11, `app.test.html`, `fwFontCheck()`): Fließtext (`.fw-app`), Screen-Headline, Station-Headline, A11y-Tabelle und App-Meldung — jede computed = `"Source Sans Pro", sans-serif`, Body-Match ✅. Font-Tokens `--font-body`/`--font-display` in `:root` definiert, aufgelöst, geladen ✅. Kein Vererbungs-Schluss mehr nötig. Verifiziert mit dem in AP-prokrast-17-FONT-CODE-B aufgewerteten `tools/ci-token-check.js` (Farbtabelle identisch zum Vorstand → Regressionsbeweis, dass der Farb-Pfad unberührt blieb). Nebenbefund `Theme/chart-tests/index_alt.html`: Engine-Harness ohne tokens.css/`.fw-app` → out of scope, kein Handlungsbedarf.

## Abschlussfrage (doppelt)

- **Nächster AP = unabhängiger Review-AP für Pfad B** (Claims-vs-Files, frische Instanz), danach **einmalige Spec-Status-Hebung (Engine + HTML-UI) + Commit**.
- **NICHT nächster AP:** Rubikon-Nachmessung, Tailwind, Design (Archivo-Black-Headlines), andere Apps.

**Kein Commit, kein Abschlussritual, kein Review in diesem AP. Weiter nur nach Alberts OK.**
