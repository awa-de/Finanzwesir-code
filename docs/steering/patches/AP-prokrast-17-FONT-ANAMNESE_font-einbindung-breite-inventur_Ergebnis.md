Stand: 2026-07-10 | Session: AP-prokrast-17-FONT-ANAMNESE | Geändert von: Claude

# AP-prokrast-17-FONT-ANAMNESE — Ergebnisprotokoll: Breite Inventur der Font-Einbindung

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein (reiner Lese-AP) · **Typ:** Anamnese/Befund, keine Migration, keine Spec-Änderung

---

## 0. Vorprüfung

`git status --short` zeigte 3 bekannte Änderungen (`session-log.md`, `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`, `UEBERGABE_steuerungsfaden_ci-kette-abschluss_app-design_2026-07-10.md`) — alle durch bereits bekannten Kontext erklärt (eigener session-log-Eintrag + uncommittete AP-prokrast-15a–19-Kette laut Hook-Meta). Keine unerwartete Fremdänderung, kein Stopp-Grund.

## 1. Gelesen

Python-Inventur (deterministisch: `@font-face`-Blöcke, `font-family`-Deklarationen, `--font-*`/`--fw-font*`-Token definiert/konsumiert, `@import`/`<link>`/`<script src>`-Ketten) über 26 Dateien:

- `Theme/assets/fonts/styles.css`, `Theme/assets/fonts/stylesheet.css`
- `Theme/assets/css/screen.css`, `Theme/assets/css/tokens.css`
- `Theme/index.html`
- `Apps/prokrastinations-preis/app.css`, `Apps/prokrastinations-preis/app.test.html`
- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
- alle `docs/design-system/spec/*.md` + `docs/design-system/templates/master-template.html`
- `docs/App-Fabrik/_input/perplexity/fw-app-template.html`
- `docs/steering/design/*.md`
- alle App-HTML/-CSS unter `Apps/*` (Glob)

Ergänzend direkt gelesen bzw. per Grep nachrecherchiert: `styles.css`, `stylesheet.css` (Volltext), `screen.css` Z.1–70, `tokens.css` Z.1–93, `FwTheme.js` (Konstruktor + `init()`), `CI-POOL-ROLLENKONTRAKT.md` Z.65–255, `FwChartTextPlugin.js`, `CenterTextPlugin.js`, `BarChartStrategy.js`, `LineChartStrategy.js`, `PieChartStrategy.js`, `FwLayoutRules.js`, `Apps/prokrastinations-preis/app.js` (keine Font-Treffer), repoweite Grep-Suche nach Referenzen auf `styles.css`/`stylesheet.css` außerhalb `Archiv/`/`.claude/`.

0 Dateien fehlend/nicht lesbar.

## 2. Befund je Zielfrage

### F1 — Strategien-Übersicht

| Strategie | Wo (Datei · Zeile) | Rolle |
|---|---|---|
| `@font-face` lokal, WOFF2 | `screen.css` Z.33–67 | **einzige reale, aktiv ladende Quelle**: 'Archivo Black' (400), 'Source Sans Pro' (400/600/700) |
| CSS-Token `--font-display`/`--font-body` | `tokens.css` Z.87–88 | laut Kontrakt SSoT, aber nicht mal von `screen.css` selbst konsumiert (s. F2) |
| Direkte `font-family`-Literale (Duplikate der Tokenwerte) | `screen.css` Z.79/101/109/160/209, `01-FARBEN-UND-TYPOGRAFIE.md`, `master-template.html`, `fw-app-template.html` | Ghost-/Doku-/Template-Schicht schreibt die Namen textidentisch wieder aus statt `var()` |
| Hardcoded JS-Default (`FwTheme.fonts`) | `FwTheme.js` Z.57–60 | Chart-Engine-Typografie, **nicht** von `init()` überschrieben |
| `--fw-font-base` (App-Bridge-Token) | `app.css` Z.13 | einzige Referenz im ganzen Repo — Token wird **nirgendwo** definiert |
| CI-fremde Standalone-Tokens | `regulatorik-dashboard/etf-wahlurnen-rechner.html` (`--font:'Satoshi'`), `rollierende-sparplaene/*.html` (`--font-display:'Instrument Serif'`, `--font-body:'DM Sans'`) | eigene Fontsysteme, extern via Google-Fonts-/Fontshare-CDN |
| Harte Literale ohne jeden Token | `weltkarte-etf-indizes/*.html` ('Satoshi', Fontshare-CDN), `Theme/index.html` ('Source Sans Pro', lädt weder `screen.css` noch eigenes `@font-face`), `app.test.html` Body-Wrapper (`sans-serif`, Dev-Harness-Hülle) | verstreute Einzelfälle |

### F2 — Hard-Coding-Stellen + Schreibweisen-Divergenzen

- Historisch dokumentierter Fehler (`screen.css` Z.30–32, Kommentar): `'ArchivoBlack-Regular'` (falsch, alte `styles.css`) vs. `'Archivo Black'` (korrekt) — brach die Headline-Schrift.
- **Neuer Fund:** `screen.css` importiert `tokens.css` (Z.22) und hat damit `--font-display`/`--font-body` zur Verfügung, nutzt sie aber in seinen eigenen Body-/Heading-Regeln (Z.79/101/109/160/209) **nicht** — schreibt die Literale erneut aus. Kein sichtbarer Bug heute (Werte identisch), aber Drift-Risiko bei künftiger Token-Änderung.
- `FwTheme.js` Kommentar Z.13 behauptet „`init()` liest `:root` CSS Custom Properties" — real liest `init()` (Z.112–172) **ausschließlich Farben** (19 `--color-*`), keine Fonts. `this.fonts` bleibt für immer der Konstruktor-Hardcode.
- `FwChartTextPlugin.js` Z.95: `ctx.font = ... + 'px sans-serif'` — hardcoded generisch, referenziert nicht mal `theme.fonts`. Laut Kontrakt (`CI-POOL-ROLLENKONTRAKT.md` Z.251) **bewusste** Ausklammerung wegen Rubikon-Metrik-Kopplung (DS-FOLLOWUP-07) — ohne den Kontraktverweis technisch nicht von einem Bug unterscheidbar.
- `CenterTextPlugin.js` Z.45–46: eigener dritter hardcoded Default (`'"Source Sans Pro", sans-serif'`), unabhängig von `FwTheme` — wird in der Praxis meist von `PieChartStrategy.js` Z.314 (`fontLabel: t.fonts.body`) überschrieben, ist aber ein redundanter dritter Pfad.

### F3 — Plugins/Bausteine und ihre Font-Einbindung

- **Ghost-Theme** (`screen.css`): definiert `@font-face` (reale Ladequelle), konsumiert selbst literal statt Token.
- **Chart-Engine**: `FwTheme.js` hält hardcodierte Default-Fonts, weitergereicht an `FwRenderer.js`, `BarChartStrategy.js`, `LineChartStrategy.js`, `PieChartStrategy.js`, `CenterTextPlugin.js` (via `t.fonts.body`) — funktioniert nur, weil der Hardcode zufällig mit `tokens.css` übereinstimmt, ist aber **keine echte CSS-Bridge**. `FwLayoutRules.js` Z.17–19 dokumentiert das Problem bereits selbst im Kommentar („fonts.body statisch im Constructor definiert … falls init() künftig Fonts überschreibt, muss diese Stelle angepasst werden").
- **`FwChartTextPlugin.js`**: bewusst nicht an Theme-Fonts gekoppelt (s. F2).
- **App-Pilot** (`app.css`): eigener, isolierter Bridge-Versuch mit falschem/undefiniertem Tokennamen.
- **Design-System-Templates/Doku**: rein redaktionelle Duplikate, keine Laufzeit-Bindung.
- **3 Standalone-Prototypen**: eigenständige, CI-fremde Fontsysteme (bereits in AP-14aR grob gefunden, hier mit exakten Token-/Zeilenbelegen bestätigt).

### F4 — Reale Ist-Kette bis Pilot + Bruchstelle

`tokens.css` definiert `--font-display`/`--font-body` korrekt → `screen.css` importiert `tokens.css`, nutzt die Tokens aber nicht selbst → `app.css` referenziert `var(--fw-font-base, sans-serif)` → `--fw-font-base` ist **im gesamten Repo niemals definiert** → Fallback `sans-serif` greift **immer**, unabhängig davon ob `tokens.css` überhaupt geladen ist.

**Präzisierung gegenüber bisheriger Beschreibung:** es ist keine „fehlende Bridge", sondern ein reiner **Namens-Mismatch** — `--fw-font-base` kollidiert mit keinem realen SSoT-Namen. Deckt sich mit dem AP-17-Fund („Font-Konflikt … widerspricht Kontrakt §9"), verifiziert hier zusätzlich technisch die exakte Bruchursache.

### F5 — Tote vs. lebende Font-CSS

`styles.css` und `stylesheet.css` sind **beide tot** — beide Dateien enthalten nur noch einen DEPRECATED-Kommentarblock (kein CSS-Inhalt mehr, 0 `@font-face`). Repoweite Grep-Suche (außerhalb `Archiv/`/`.claude/`) bestätigt: keine `<link>`/`@import` referenziert sie. Einzige verbliebene Erwähnungen sind rein redaktionell: `NAVIGATION.md` Z.427 listet die Frage weiterhin als „offen" (veraltet — jetzt real beantwortbar: keine von beiden lädt), `screen.css` Z.30–31 (Erklärkommentar), `AP-prokrast-14a`-Protokoll (bereits als deprecated/Löschung-für-AP-8 vermerkt).

## 3. Ausdrücklich NICHT geändert

Kein `@font-face`, kein `tokens.css`/`screen.css`/`app.css`-Edit, keine Löschung, keine Rubikon-Messung, keine Tailwind-/Design-Arbeit. Reiner Lese-AP — `git status` nach Abschluss unverändert gegenüber Vorprüfung (keine neue Datei berührt außer dieser Ergebnisdatei).

## 4. Welche Datei ist Wahrheit

Keine einzelne Datei gibt die vollständige Ist-Kette korrekt wieder — das ist selbst ein Befund. `screen.css` Abschnitt 2 ist Wahrheit für **welche Font-Dateien real geladen werden**. `tokens.css` ist Wahrheit für **Token-Namen/-Werte** (laut Kontrakt SSoT). Die Ghost-`.hbs`-Kette, die `screen.css` überhaupt einbindet, ist repo-technisch nicht verifizierbar (kein `.hbs` im Repo — von Kontrakt Z.247 „P18: .hbs-Kette nicht repo-verifizierbar" bereits separat festgehalten).

## 5. Restliste / offene Klassifikation

| # | Fund | Kategorie |
|---|---|---|
| 1 | `NAVIGATION.md` Z.427 „Font-CSS-Dopplung … offen" — jetzt real beantwortbar (beide Dateien tot) | redaktionell |
| 2 | `FwTheme.js` Z.13 Kommentar überzeichnet `init()`-Scope (nur Farben, keine Fonts) | redaktionell |
| 3 | `FwLayoutRules.js` Z.17–19 kennt das Problem bereits selbst (kein neuer Fund, bestätigt nur bekannte Doku) | — |
| 4 | `--fw-font-base` ist Namens-Mismatch, keine halbe Bridge (Präzisierung, s. F4) | Codefund/Präzisierung |
| 5 | 3 CI-fremde Standalone-Prototypen mit externen CDN-Fonts — In-Scope-Fremdkörper oder nicht? | Produktentscheidung |
| 6 | `CenterTextPlugin.js` dritter hardcoded Font-Default, praktisch meist überschrieben | Tooling-Lücke |

Keiner dieser Punkte wurde in diesem AP repariert (Nicht-Ziel).

## 6. Doppelte Abschlussfrage

**Nächster richtiger AP:** Font-Migrations-AP `--fw-font-base` → `--font-body`/`--font-display`, gekoppelt mit Rubikon-Nachmessung S/M/L (Modell **Opus**, metriksensibel) — bestätigt durch Kontrakt Z.251 und DS-FOLLOWUP-07. Neue Scope-Frage aus diesem Befund: soll dieser AP nur den App-Layer (`app.css`) fixen, oder auch die Chart-Engine-Seite (hardcodierte `FwTheme.fonts`, `FwChartTextPlugin.js`-Ausklammerung) mitnehmen? Bislang nicht entschieden — Albert-Entscheidung nötig.

**Ausdrücklich NICHT der nächste AP:** Tailwind-Arbeit, Design, Löschen der DEPRECATED-CSS (bleibt für AP-8 vorgemerkt), App-Fachlogik, Bereinigung der 3 CI-fremden Prototypen, Korrektur der redaktionellen Kleinfunde aus Restliste 1–3/6.

---

**Kurzfassung:** GRÜN · Kernbefund: die Font-Kette bricht nicht an einer fehlenden Bridge, sondern an einem reinen Namens-Mismatch (`--fw-font-base` vs. `--font-body`, Token existiert nirgendwo) — zusätzlich hat die Chart-Engine eine **parallele, nie CSS-gebrückte** Font-Quelle (hardcoded `FwTheme.fonts`), die bisher nur zufällig mit `tokens.css` übereinstimmt. Kein Blocker. Nächster AP: Font-Migration + Rubikon-Nachmessung, Modell Opus — Scope-Frage (App-only vs. App+Engine) offen für Albert.

Kein Commit, kein Abschlussritual, kein Folge-AP-Start ohne Alberts ausdrückliches OK.
