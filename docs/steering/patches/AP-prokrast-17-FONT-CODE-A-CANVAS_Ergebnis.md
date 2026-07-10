Stand: 2026-07-10 20:05 | Session: AP-prokrast-17-FONT-CODE-A | Geändert von: Claude

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein (Freigabe bei Albert) · **Typ:** Code, Canvas-Font-Migration

---

## Gelesen

**Spec (Zielvorgabe):** `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (KDR 14 inkl. Punkt 5 + Init-Reihenfolge), `docs/spec/Der Rucksack (Context Object Pattern).md` (Abgrenzung: Design/Fonts gehören NICHT in den fwContext-Kern, sondern in die Theme-/Regenjacke-Schicht), `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` (Face-Layer = Theme/Tooltip; CenterText erhält Font per Options-Injection aus der Strategie).
**Code (gelesen/geändert):** `FwTheme.js`, `FwLayoutRules.js`, `FwSmartXAxis.js`, `FwSmartYAxis.js`, `FwSmartTooltips.js`, `BarChartStrategy.js`.
**Code (verify-only, nicht geändert):** `LineChartStrategy.js`, `PieChartStrategy.js`, `CenterTextPlugin.js`, `ChartEngine.js`, `FwRenderer.js`. `tokens.css` nur gelesen (Token-Namen).

**Vorab verifiziert (nicht angenommen):** `const t = this.theme` + `ciFont = t.fonts.body` in Line (356/358), Bar (235/236), Pie (250 + A7 bei 314-315); `constructor(theme = new FwTheme())` + `this.theme = theme` in allen drei Strategien (AP-16c Composition Root). Alle drei nutzen die injizierte, init()'te Instanz.

---

## Geänderte Dateien (Patch je Stelle, alt → neu)

**1. `FwTheme.js` — `init()` liest Fonts (KDR 14 Punkt 5)**
Nach dem UI-Colors-Block (nach `--color-loader-bg`) eingefügt:
```js
// NEW — AP-prokrast-17-FONT-CODE-A: Fonts aus tokens.css lesen (KDR 14 Punkt 5, Farb-Parität).
this.fonts.body = read('--font-body', this.fonts.body);
this.fonts.heading = read('--font-display', this.fonts.heading);
```
Constructor-Hardcode (`this.fonts`, Z.57-60: `body: '"Source Sans Pro", sans-serif'`, `heading: '"Archivo Black", sans-serif'`) **unverändert** = Fallback.

**2. `FwLayoutRules.js` — `getResponsiveFont` nimmt `family` (Kern der Zwei-Instanzen-Auflösung)**
- Kommentar Z.17-20 aktualisiert (Rolle von `_theme`: nur noch Fallback).
- `static getResponsiveFont(ctx)` → `static getResponsiveFont(ctx, family)`; `const family = _theme.fonts.body;` → `const resolvedFamily = family || _theme.fonts.body;`; Rückgaben `{ size, family }` → `{ size, family: resolvedFamily }`.

**3. `FwSmartXAxis.js` — A1 (X-Ticks Line+Bar), beide Ticks-Blöcke (SNAPSHOT Z.260, PERIOD Z.383)**
`getResponsiveFont(ctx)` → `getResponsiveFont(ctx, fontConfig.family)`.

**4. `FwSmartYAxis.js` — A3 (Y-Ticks), Z.117**
`getResponsiveFont(context)` → `getResponsiveFont(context, fontConfig.family)`.

**5. `FwSmartTooltips.js` — A4 (Tooltip), Z.112 + Z.117**
`getResponsiveFont(ctx)` → `getResponsiveFont(ctx, styleConfig.titleFont && styleConfig.titleFont.family)` bzw. `… styleConfig.bodyFont && styleConfig.bodyFont.family`.

**6. `BarChartStrategy.js` — A1 Bar-Zeitachse + A3 Bar-Y**
- Z.239 Zeitachse-`fontConfig`: `{ color: t.colors.textMuted }` → `{ color: t.colors.textMuted, family: ciFont }` (family war nicht übergeben).
- Z.272 Y-`fontConfig`: `font: { family: ciFont },` → `family: ciFont,` (flache Form; die nested `font:{}`-Form wurde von `FwSmartYAxis` nie gelesen — tote nested Form entfernt, Line-Parität hergestellt).

---

## Zwei-Instanzen-Auflösung — wie gelöst

Die Schrift wird jetzt — **exakt wie die Farben** — über den `fontConfig`/`styleConfig`-Parameter aus der injizierten, `init()`'ten `FwTheme`-Instanz (`t.fonts.body`, `t` = Composition-Root-Instanz aus AP-16c) an `getResponsiveFont` durchgereicht. Die modul-lokale, nie-`init()`'te `_theme`-Instanz in `FwLayoutRules.js:21` bleibt ausschließlich als **Fallback** (`family || _theme.fonts.body`) — das exakte Analogon zum Constructor-Hex-Fallback der Farben. Damit ziehen A1/A3/A4 ihre Schrift aus derselben token-gespeisten Kette wie A2/A7 — **keine** parallele „privates-Singleton-`init()`'en"-Mechanik (die wäre laut KDR 14 Punkt 5 nicht dieselbe Kette).

## Tote Parameter — verdrahtet (nicht entfernt), welcher Weg und warum

**Weg: lebendig verdrahtet.** Y-Achse (`fontConfig.family`) und Tooltip (`styleConfig.titleFont/bodyFont.family`) wurden von den Consumern (`FwSmartYAxis`, `FwSmartTooltips`) bisher nicht gelesen; jetzt reichen sie den Wert an `getResponsiveFont` durch. Zusätzlich fiel dabei ein **dritter** bis dahin toter Übergabewert auf (X-Achse Line: `fontConfig.family` wurde in `FwSmartXAxis` nie gelesen) — im selben Zug lebendig gemacht.
**Warum verdrahten statt entfernen:** Das Verdrahten erschlägt beide Ziele gleichzeitig — der Parameter ist danach nicht mehr tot **und** trägt den Token-Wert an die Fläche. Entfernen hätte den Rückfall auf die nie-`init()`'te Privatinstanz zementiert (verletzt „token-fed") oder Option A (privates Singleton `init()`'en) erzwungen, die dem Spec-Punkt-5-Mechanismus widerspricht.

---

## Ausdrücklich NICHT geändert

- **A6** (Rubikon-Symbolmarker, `FwChartTextPlugin.js:95` hart `sans-serif`) — Datei unberührt (per Python-Marker bestätigt: Hardcode noch vorhanden). Backlog/entkoppelt (DS-FOLLOWUP-07).
- **HTML-UI-Flächen** (B2 Legende/Pills, B3 Range-Buttons, B4 BAN, B5 Popover, B7 Fehlermeldung, B6 A11y, B9 App-Fließtext) — Write-AP B.
- **`app.css`/`app.js`** — nicht berührt (Scope-Check: nicht im Diff).
- **`tokens.css`/`screen.css`-Werte** — unverändert (nur gelesen).
- **Spec-Status** NICHT auf „implementiert" gehoben (bleibt „Code-Umsetzung offen") — das übernimmt der Review-AP nach bestandener QA.
- **Fonts NICHT in `fwContext`** — Durchleitung ausschließlich über Theme/`fontConfig`-Parameter (Rucksack-Grenze gewahrt).
- **Constructor-Fallback** in `FwTheme` erhalten.
- **Composition Root / Injection-Kette / Init-Reihenfolge** (`new FwTheme()` → `init()` → `_injectStyles()`) unverändert — nur um Font-Reads ergänzt.

---

## Body-QA je Datei (vollständig neu gelesen)

- `FwTheme.js` ✅ — Constructor-Fallback Z.57-60 intakt; `init()` liest `--font-body`/`--font-display` Z.151-152.
- `FwLayoutRules.js` ✅ — Signatur `getResponsiveFont(ctx, family)`, `resolvedFamily = family || _theme.fonts.body`, Rückgaben korrekt; Kommentar-Rolle aktualisiert.
- `FwSmartXAxis.js` ✅ — beide Ticks-Blöcke (Z.260 SNAPSHOT, Z.383 PERIOD) reichen `fontConfig.family` durch.
- `FwSmartYAxis.js` ✅ — Z.117 reicht `fontConfig.family` durch.
- `FwSmartTooltips.js` ✅ — Z.112/117 reichen `styleConfig.titleFont/bodyFont.family` durch.
- `BarChartStrategy.js` ✅ — Zeitachse-`fontConfig` mit `family: ciFont` (Z.239); Y-`fontConfig` flach `family: ciFont` (Z.272).

**Deterministische Marker-Prüfung (Python):** kein `getResponsiveFont`-Aufruf ohne `family`-Argument mehr (0 Treffer); `init()` liest beide Font-Tokens; Constructor-Fallback erhalten; `tokens.css`-Font-Tokens unverändert vorhanden; A6-`sans-serif`-Hardcode unberührt.
**Scope (git diff):** genau 6 Engine-Dateien geändert (+ session-log Schritt 0), keine verbotene Datei im Diff.

---

## Erwartetes Regressionsverhalten (Null-Delta)

`tokens.css` liefert `'Source Sans Pro', sans-serif`, der Constructor-Fallback ist `"Source Sans Pro", sans-serif` — **dieselbe Schrift** (nur Anführungszeichen-Stil differiert, rendert identisch). Die Migration dreht die **Quelle** (Constructor-Zufall → Token), nicht den **Wert**: rechnerisch **metrik-neutral**, kein sichtbarer Font-Wechsel, keine Rubikon-Metrik-Berührung (A6 ohnehin out of scope). Analog zum AP-16c-Null-Delta bei Farben.

**Regressionsflächen:** A1 (X-Ticks Line+Bar Zeitachse), A2 (X-Ticks Bar Kategorie), A3 (Y-Ticks), A4 (Tooltip Titel/Body Line+Bar), A7 (Donut-Center) — alle Chart-Typen (Line/Bar/Pie), S/M/L.

---

## Runtime-Verifikation — manuell durch Albert (Browser-Konsole, VSCode Live Server, 2026-07-10)

**Methode:** Albert führte im laufenden Browser ein Konsolen-Diagnoseskript aus, das drei Dinge misst: (1) die aufgelösten CSS-Tokens via `getComputedStyle(document.documentElement)` (`--font-body`/`--font-display`), (2) die Webfont-Verfügbarkeit via `document.fonts.check('16px "…"')`, (3) die real vom Chart genutzte Schriftfamilie via `Chart.getChart(canvas).scales.{x,y}.options.ticks.font({chart})` bzw. `…plugins.tooltip.bodyFont`. **Diskriminator:** Token-Pfad liefert einfache Quotes (`'Source Sans Pro'`, direkt aus `tokens.css`), Constructor-Fallback liefert doppelte (`"Source Sans Pro"`).

**Manuell geprüft — `app.test.html`** (lädt `tokens.css`, 2 gerenderte Charts). Ergebnis:
- `--font-body` = `'Source Sans Pro', sans-serif`, `--font-display` = `'Archivo Black', sans-serif` (Tokens lösen auf).
- Webfonts verfügbar: `Source Sans Pro` **true**, `Archivo Black` **true** (Korrektur einer Vorab-Annahme: der CI-Font ist auf `app.test.html` verfügbar, nicht — wie zunächst vermutet — mangels `screen.css`-`@font-face` abwesend).
- X-Achse / Y-Achse / Tooltip: alle `'Source Sans Pro', sans-serif` mit **einfachen** Anführungszeichen → **Token-Pfad aktiv**. Der Constructor-Fallback hätte doppelte Quotes (`"…"`) geliefert; der Quote-Stil ist damit der harte Diskriminator, dass die Schrift aus `tokens.css` kommt, nicht aus der nie-init()'ten Privatinstanz.
- A2 (Bar-Kategorie) / A7 (Donut-Center) nicht direkt auf dem Schirm (App nutzt nur Line-Charts), aber transitiv mitbelegt (gleiche injizierte `t.fonts.body`; dass `init()` den Token liest, ist durch X/Y/Tooltip bewiesen).
- Viewport-Abdeckung: `getResponsiveFont` variiert nur die Größe nach S/M/L, die Schriftfamilie ist breitenunabhängig — ein Check deckt alle Viewports ab.

**Manuell geprüft — Gegenprobe Fallback-Richtung (`index_alles test.html`, keine Theme-CSS eingebunden):** `--font-body`/`--font-display` = leer (Seite lädt weder `tokens.css` noch `screen.css`), Canvas-Fonts = `"Source Sans Pro"` mit **doppelten** Quotes → Graceful Default (Constructor-Fallback) greift wie vorgesehen; Font rendert korrekt (Webfont system-verfügbar). Damit ist das Null-Delta **empirisch von beiden Seiten** belegt: mit `tokens.css` → Token-Wert, ohne → identischer Constructor-Fallback. Gilt analog zu den Farben seit AP-16 (dieselben Seiten liefen immer auf Fallback). Kanonische Kaskaden-Seite bleibt `AP-16-abnahme.html` (`screen.css`+`tokens.css`, lokales Vendor).

**Fazit: Pfad A laufzeitverifiziert GRÜN.**

## Restliste

- **Live-Server-Sichtprüfung** — erledigt via Runtime-Verifikation (s.o.).
- **Spec-Status-Hebung** auf „implementiert" — dem Review-AP vorbehalten.
- **Test-Harness-Beobachtungen (bewusst NICHT verfolgt, Albert-Entscheidung 2026-07-10):**
  - `app.test.html`/`index_alles test.html` laden Chart.js aus dem CDN (`cdn.jsdelivr.net`) → langsames Chart-Rendering („Seite da, Charts kommen irgendwann"). Ursache ist die CDN-Latenz, **kein** Engine-Code-Regress — die Parallel-Lade-Fixes (`ChartEngine.init()` Promise.all, `_dataCache`-Dedup) sind intakt und vom Font-Patch unberührt. `AP-16-abnahme.html` nutzt bereits lokales `vendor/chart.umd.min.js`.
  - `index_alles test.html` bindet **gar kein** Theme-CSS ein → `--font-*`/`--color-*` leer, Engine läuft auf Constructor-Fallbacks (erwartetes Graceful-Default-Verhalten, gilt so seit AP-16 auch für Farben).
  - Fix beider Punkte (CDN → lokales Vendor + `tokens.css`-`<link>` in den alten Testseiten) wäre ein eigener Harness-Hygiene-AP. **Albert hat das in diesem Faden ausdrücklich zurückgestellt („lassen wir das, das wird zu viel").** Hier nur dokumentiert, nicht offen als To-do.

---

## Doppelte Abschlussfrage

- **Nächster AP (Erwartung):** **unabhängiger Review-AP für Pfad A** (Claims-vs-Files, Null-Delta-Gegenprobe), danach **Write-AP B (HTML-UI-Fonts)**.
- **Was nicht der nächste AP ist:** Rubikon-Nachmessung (Backlog, entkoppelt), Tailwind, Design-Entscheidungen, andere Apps, jede weitere Code-Änderung in diesem AP.

**Kein Commit, kein Abschlussritual, kein Review/Rubikon in diesem AP. Weiter nur nach Alberts OK.**
