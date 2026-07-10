Stand: 2026-07-10 20:51 | Session: AP-prokrast-17-FONT-CODE-A-REVIEW | Geändert von: Claude

**Status:** GRÜN · **Blocker:** nein · **Commit-Empfehlung:** ja · **Typ:** Review, kein Code

---

## Rahmen

Unabhängiger Review von Pfad A (Canvas-Font-Migration) — Claims-vs-Files. Reviewer: **Opus 4.8**, frische Instanz, **nicht** die Schreib-Instanz. Abweichung zum AP-Erwartungswert (Sonnet-Klasse) transparent gemeldet; die kritische Unabhängigkeitsregel (nicht der Autor) ist erfüllt. Das Write-Protokoll (`AP-prokrast-17-FONT-CODE-A-CANVAS_Ergebnis.md`) wurde als Behauptungsliste behandelt, jede Behauptung gegen die reale, aktuelle Datei geprüft (Pfad + Zeile). „GRÜN" im Write-Protokoll zählte nicht — nur die Datei.

**Gate-Vorprüfung:** `git status --short` / `git diff --name-status` / `git log -1`. Pfad-A-Änderungen liegen **uncommittet** vor (6 Engine-Dateien modifiziert + `session-log.md` aus Schritt 0); letzter Commit ist `a266cb2` (Font-Anamnese+Spec-Parität), **nicht** Pfad A. Entspricht der AP-Erwartung. Keine verbotene Datei im Diff.

---

## 1. Verdikt je Prüfauftrag (gegen die reale Datei)

**Prüfauftrag 1 — `FwTheme.init()` liest Fonts: BESTÄTIGT.**
- Font-Read steht real im `init()`-Fluss, nicht im Kommentar: `FwTheme.js:151-152` `this.fonts.body = read('--font-body', this.fonts.body);` / `this.fonts.heading = read('--font-display', this.fonts.heading);`, direkt nach dem UI-Colors-Block (nach `--color-loader-bg`, Z.146).
- `read` (Z.119-122) ist der reale getComputedStyle-Leser: `style.getPropertyValue(prop).trim() || fallback`.
- Liest **beide** Tokens in die realen Constructor-Properties: `this.fonts.body` **und** `this.fonts.heading` (Constructor-Property heißt `heading`, nicht `.heading` eines anderen Objekts — Z.57-60).
- Constructor-Hardcode `FwTheme.js:57-60` (`body: '"Source Sans Pro", sans-serif'`, `heading: '"Archivo Black", sans-serif'`) **unverändert** = Fallback erhalten (Diff berührt ihn nicht).
- Init-Reihenfolge unverändert: der Patch fügt nur zwei Read-Zeilen in `init()` ein, `_injectStyles()`/Constructor-Ablauf nicht angefasst.

**Prüfauftrag 2 — Zwei-Instanzen-Auflösung real (nicht nur umbenannt): BESTÄTIGT.**
- Signatur real `FwLayoutRules.js:31` `static getResponsiveFont(ctx, family)`; `resolvedFamily = family || _theme.fonts.body` (Z.33); Rückgaben `{ size, family: resolvedFamily }`.
- Privatinstanz `_theme` (Z.21) ist nachweislich **nur noch Fallback** — sie wird ausschließlich erreicht, wenn `family` falsy ist. Kein Aufrufer reicht falsy durch (siehe Prüfauftrag 3).
- `family` kommt an **jeder** Aufrufstelle aus der injizierten, `init()`'ten Theme (`t = this.theme`, AP-16c Composition Root), pro Strategie geprüft:
  - **Line** (`LineChartStrategy.js`): `t = this.theme` (356), `ciFont = t.fonts.body` (358); X `{ family: ciFont }` (419), Y flach `family: ciFont` (422), Tooltip `titleFont/bodyFont: { family: ciFont }` (388/389).
  - **Bar** (`BarChartStrategy.js`): `t = this.theme` (235), `ciFont = t.fonts.body` (236); Zeitachse `{ color, family: ciFont }` (239), Y flach `family: ciFont` (272), Tooltip `titleFont/bodyFont: { family: ciFont }` (280/281). Kategorie-Achse (A2, else-Zweig 244-247) nutzt nativ `font: { family: ciFont, size: 12 }` — ruft `getResponsiveFont` gar nicht → kein Fallback-Pfad.
  - **Pie** (`PieChartStrategy.js`): `t = this.theme` (250); `scales: undefined` (276), Tooltip `enabled: false` (308) → **kein** `getResponsiveFont`-Pfad. A7 Donut-Center über `centerText.fontLabel/fontValue = t.fonts.body` (314/315) aus der injizierten Theme.
- Plumbing intakt: `FwSmartScales.getTimeAxis(min,max,fontConfig,opts)` → `FwSmartXAxis.compute(fwContext, fontConfig)` (Scales:36); `getSmartYAxis(fwContext,fontConfig)` → `FwSmartYAxis.compute(fwContext, fontConfig)` (Scales:56). Dasselbe `fontConfig`-Objekt trägt bereits produktiv `fontConfig.color` — `family` reist auf derselben Bahn.

**Prüfauftrag 3 — Tote Parameter wirklich lebendig: BESTÄTIGT (deterministisch).**
- Python-Scan aller `getResponsiveFont`-Aufrufe: genau **5** Aufrufstellen, **alle zwei-argumentig**, **0 Aufrufe ohne `family`**:
  - `FwSmartXAxis.js:260` `getResponsiveFont(ctx, fontConfig.family)` (SNAPSHOT)
  - `FwSmartXAxis.js:383` `getResponsiveFont(ctx, fontConfig.family)` (PERIOD)
  - `FwSmartYAxis.js:117` `getResponsiveFont(context, fontConfig.family)`
  - `FwSmartTooltips.js:112` `getResponsiveFont(ctx, styleConfig.titleFont && styleConfig.titleFont.family)`
  - `FwSmartTooltips.js:117` `getResponsiveFont(ctx, styleConfig.bodyFont && styleConfig.bodyFont.family)`
- Die Consumer lesen den übergebenen Wert real: XAxis/YAxis via `fontConfig.family`, Tooltip via `styleConfig.{title,body}Font.family`. Drei zuvor tote Übergabewerte (Y `fontConfig.family`, Tooltip `title/bodyFont.family`, X-Line `fontConfig.family`) sind damit lebendig.

**Prüfauftrag 4 — Null-Delta belegt: BESTÄTIGT.**
- `tokens.css:88` `--font-body: 'Source Sans Pro', sans-serif;` vs. Constructor-Fallback `"Source Sans Pro", sans-serif`.
- `tokens.css:87` `--font-display: 'Archivo Black', sans-serif;` vs. Constructor-Fallback `"Archivo Black", sans-serif`.
- Identische Schrift-Familien, Unterschied nur Anführungszeichen-Stil (einfach vs. doppelt) — CSS-font-family rendert beides identisch. **Metrik-neutral.** Die Migration dreht die Quelle (Constructor → Token), nicht den Wert. Deckt sich mit Alberts empirischer Runtime-Gegenprobe (Quote-Stil als Diskriminator).

**Prüfauftrag 5 — Scope-QA (nichts still mitgezogen): BESTÄTIGT.**
- `git diff --name-status`: genau die 6 erwarteten Engine-Dateien (`FwTheme.js`, `FwLayoutRules.js`, `FwSmartXAxis.js`, `FwSmartYAxis.js`, `FwSmartTooltips.js`, `BarChartStrategy.js`) + `session-log.md` (Schritt-0-Invariante). Keine weitere Datei.
- **A6** (`FwChartTextPlugin.js:95`) real geprüft: weiterhin `ctx.font = fontWeight + ' ' + fontSize + 'px sans-serif';` — hart `sans-serif`, **unberührt** (auch nicht im Diff).
- `tokens.css`/`screen.css`-**Werte** unverändert (nicht im Diff; tokens.css nur gelesen).
- **Keine** HTML-UI-/`app.*`-Datei im Diff.
- **Fonts nicht in `fwContext`**: Scan leer; `_createFwContext`-Aufrufe (Line/Pie gelesen) enthalten keine Font-Keys — Durchleitung ausschließlich über Theme/`fontConfig`/`styleConfig`. Rucksack-Grenze gewahrt.
- Kein verbotener Pfad (Vault `FinanzwesirData.js`/`CSVParser.js`, `FwDateUtils.js`) berührt.

**Prüfauftrag 6 — Spec-Status-Ehrlichkeit: BESTÄTIGT.**
- ARCH `ARCHITECTURE STRATEGY PAPER VX.md:145` „… Farbe implementiert, Font-Parität als Ziel (Code offen)"; Z.152 Punkt 5 „Font-Parität (**Ziel**, festgelegt 2026-07-10)".
- TECH-SPEC §5.4 (Z.187) „Ziel-Mechanismus (Font-Parität zu Farben …, **Code-Umsetzung offen**)".
- CI-POOL §9 (Z.255) „Font-Bridge-Zielmechanismus … soll `FwTheme.init()` **künftig** …".
- Der Spec-Status wurde vom Write-AP **nicht** vorzeitig auf „implementiert" gehoben.

---

## 2. Was geprüft und für sauber befunden

- Mechanik real umgesetzt: `init()` liest Fonts; Parameter-Durchreichung Strategie → Scales → Axis/Tooltip → `getResponsiveFont`; Privatinstanz nur Fallback.
- Kein still mitgezogener Fremdcode; Diff-Scope exakt 6 Engine-Dateien.
- A6 unberührt; `tokens.css`/`screen.css`-Werte unverändert; keine `app.*`/HTML-UI; keine Tabu-/Vault-/`FwDateUtils`-Berührung.
- Null-Delta beidseitig (Token-Wert ≙ Constructor-Fallback, nur Quote-Stil).
- Keine Fonts im `fwContext` (Layer-/Rucksack-Grenze intakt).

---

## 3. Abweichungen / Mängel

**Keine.** Keine Kernbehauptung des Write-APs fiel gegen die Datei durch. Kein `getResponsiveFont`-Aufruf ohne `family`, kein Strategie-lokaler Font-Hardcode statt injizierter Quelle, keine verbotene Datei im Diff.

**Beobachtungen (nicht-blockierend, kein Fix in diesem AP, kein neuer Scope):**
- **B-1 (bestehend, außerhalb Pfad A):** Bar-Kategorie-Achse (A2, `BarChartStrategy.js:246`) nutzt hartes `size: 12` statt `getResponsiveFont` — Schriftgröße dort nicht S/M/L-responsiv. Familie ist korrekt `ciFont`. Vorbestehend, nicht durch diesen Patch verursacht, nicht im Diff. Nur notiert.
- **B-2 (Doku, informativ):** `this.fonts.heading` wird gelesen, hat aber in Pfad A (Canvas) noch keinen Consumer — bewusste Parität für Write-AP B / Headlines. Vom Write-Protokoll offen deklariert. Harmlos.
- **B-3 (Scope-Rand):** Zwei weitere untracked Doku-Dateien liegen vor (`AP-prokrast-17-FONT-FLAECHEN-ANAMNESE_Ergebnis.md`, `…-FONT-FLAECHEN-SCHLIESSUNG_Ergebnis.md`) — reine Doku, kein Code, außerhalb der Pfad-A-Verifikation. Nur erwähnt.

---

## 4. Commit-Empfehlung

**JA — Pfad A committen.** Mechanik real umgesetzt, Null-Delta belegt, Scope sauber, nichts still mitgezogen, Tabu-Zonen unberührt. Commit-Freigabe liegt bei Albert.

**Spec-Status-Hebung (vorgeschlagen, NICHT geschrieben — separater gegatterter Schritt nach Albert-OK).** Nach Commit die drei „Ziel/offen"-Formulierungen auf „implementiert" heben, an genau diesen Stellen:
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` — KDR 14 Überschrift (Z.145) und Punkt 5 (Z.152): „Ziel (Code offen)" → „implementiert (AP-prokrast-17-FONT-CODE-A)".
- `docs/spec/…TECH-SPEC…Theme-Integration Chart-Engine.md` — §5.4 (Z.187): „Code-Umsetzung offen" → „implementiert".
- `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` — §9 (Z.255): „soll … künftig" → „umgesetzt (Canvas/Pfad A)"; Stand-Header nachziehen.
- Empfehlung: die Hebung erst **nach** dem Commit, damit der Spec-Status eine committete Code-Realität referenziert. `spec-rewrite-guard`-Diff vor Write zeigen.

---

## 5. Doppelte Abschlussfrage

- **Nächster AP (Erwartung):** Commit Pfad A + Spec-Status-Hebung (gegatterter Schritt, Diff vor Write), danach **Write-AP B — HTML-UI-Fonts** (B2 Legende/Pills, B3 Range-Buttons, B4 BAN, B5 Popover, B6 A11y, B7 Fehlermeldung, B9 App-Fließtext).
- **Was NICHT der nächste AP ist:** Rubikon-Nachmessung/A6 (Backlog, entkoppelt, DS-FOLLOWUP-07), Tailwind, Design-Entscheidungen, andere Apps, jede weitere Code-Änderung.

**Kein Commit, kein Abschlussritual, keine Code-/Spec-Änderung in diesem Review-AP. Weiter nur nach Alberts OK.**
