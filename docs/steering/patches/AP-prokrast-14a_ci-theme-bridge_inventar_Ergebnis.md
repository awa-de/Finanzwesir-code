# AP-prokrast-14a — CI-/Theme-Bridge Inventar-Anamnese Ergebnis

## Status

GRÜN

## Kurzfazit

Es existiert bereits ein vollständiges, dokumentiertes CI-/Design-System (`docs/design-system/spec/`, 6 Spec-Dateien + Referenz-HTMLs, Stand 2026-05-03, Status "Final") sowie eine technisch produktionsreife CSS-Variablen-Bridge für die Chart-Engine (`FwTheme.js` v5.0.0, "CSS-VARIABLES BRIDGE — KDR-14", Status "PRODUCTION READY"). Fonts (Archivo Black + Source Sans Pro, WOFF2) liegen real im Repo, sind lizenzdokumentiert (OFL.txt) und korrekt in `screen.css §2` eingebunden.

Der zentrale Befund: Es gibt eine **formal entschiedene Architektur** (`docs/App-Fabrik/01_DECISION_LOG.md` A-04, Status 🟢 ENTSCHIEDEN — "Apps nutzen dieselbe Theme-Bridge wie die Chart-Engine: CSS Custom Properties aus `screen.css`, gelesen via `FwTheme.js`. Kein Tailwind CDN in Produktion"), die im einzigen real gebauten App-Code (`Apps/prokrastinations-preis/app.css`) **nicht umgesetzt** ist. `app.css` verwendet stattdessen eine eigene, nirgendwo definierte `--fw-*`-Namensräume (`--fw-color-primary`, `--fw-font-base`, `--fw-space-md` …) mit hartcodierten Fallback-Werten — diese Custom Properties werden an keiner Stelle im Repo tatsächlich gesetzt, die App läuft also technisch dauerhaft auf ihren eigenen Fallbacks, nie auf echten CI-Werten. Dieser exakte Befund wurde bereits am 2026-07-06 von AP-prokrast-07b unabhängig gefunden und ist hier bestätigt, nicht neu.

Tailwind ist vollständig dokumentiert und in Referenz-Demos (`docs/design-system/`, `master-template.html`) technisch funktionsfähig — hat aber **keine einzige Fundstelle** im echten `Theme/`-Ordner, der Ghost ausliefern würde. Es existieren zudem keine Ghost-`.hbs`-Templates im Repo; `Theme/index.html` ist kein Ghost-Template, sondern ein interner Chart-Engine-Testharness. Die tatsächliche CI-Auslieferung an echte Ghost-Seiten läuft laut Doku über Ghost Admin "Code Injection", was aus dem Repo allein nicht verifizierbar ist.

DS-012/DS-013/DS-014 (BACKLOG.md) beschreiben genau diese Lücke bereits — AP-14 muss sie nicht neu entdecken, sondern kann direkt darauf aufsetzen.

## Gates

- Repo-Wurzel: `z:\Documents\Nextcloud\Finanzwesir 2.0` (bestätigt)
- git status --short vor Start: `M .claude/learning/session-log.md` (eigener /start-Warmstart-Eintrag), zwei neue `?? Archiv/Chroniken/chronist-v1/CHRONIK-*.md` (unabhängige Chronist-Artefakte, kein App-/Theme-/Engine-/Spec-Bezug)
- git diff --name-status vor Start: nur `M .claude/learning/session-log.md`
- unerwartete Änderungen: nein
- Stop-Regel ausgelöst: nein

## Gelesen / geprüft

| Pfad/Bereich | Art der Prüfung | Relevanz | Befund |
|---|---|---:|---|
| `docs/design-system/spec/DESIGN-SYSTEM.md` | vollständig gelesen | hoch | Einstiegspunkt, Status Final, verweist auf falschen Pfad für Issues (`docs/context/...` existiert nicht) |
| `docs/design-system/spec/01-FARBEN-UND-TYPOGRAFIE.md` | vollständig gelesen | hoch | Kanonische CI-Farben/Fonts/WCAG-Tabelle, deckungsgleich mit `screen.css` |
| `docs/design-system/templates/master-template.html` | gezielt (Tailwind-Config-Block) gelesen | hoch | Einziger Ort mit echter Tailwind-CDN-Einbindung im Repo |
| `Theme/assets/css/screen.css` | vollständig gelesen (453 Zeilen) | hoch | Einzige CSS-Wahrheit, 7 Abschnitte bindend, Tokens+Fonts korrekt implementiert |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js` | vollständig gelesen | hoch | CSS-Variablen-Bridge für Farben produktionsreif; Fonts nur hartcodiert, nicht gebridged |
| `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` | gezielt (Font-Handling) gelesen | hoch | `ctx.font` hartcodiert `sans-serif`, kein Theme-Zugriff — RubikonSymbolMarkers nutzen keine CI-Fonts |
| `Apps/prokrastinations-preis/app.css` | vollständig gegrept, gezielt gelesen | hoch | Eigener `--fw-*`-Namensraum, nirgendwo definiert, reine Fallback-Werte |
| `Apps/prokrastinations-preis/app.js` | Bootstrap-Funktion + Kopf/Fuß gelesen | mittel | Self-Bootstrapping pro App über `.fw-app`/`data-fw-app`, kein globaler Bootstrapper |
| `docs/spec/APP-INTERFACE.md` §3.1/§4 | gezielt gelesen | hoch | Redakteursvertrag `.fw-app`/`data-fw-app` dokumentiert, `data-fw-theme` reserviert/nicht implementiert |
| `docs/steering/design/CSS-KONVENTIONEN.md` | vollständig gelesen | hoch | Gilt nur für `screen.css`; `fw-*`-Präfix als "reserviert für Chart-Engine" deklariert — App-`--fw-*`-Namensraum ohne jede Konvention |
| `docs/App-Fabrik/01_DECISION_LOG.md` A-04 | gezielt gelesen | hoch | Formale Architekturentscheidung Theme-Bridge via `FwTheme.js`, widerspricht real gebautem `app.css` |
| `docs/steering/BACKLOG.md` (DS-012/013/014, CSS-5) | gezielt gelesen | hoch | Lücke bereits bekannt und getrackt, DS-014 (App-Komponenten-Baukasten) noch nicht begonnen |
| `docs/steering/design/DESIGN-SYSTEM-ISSUES.md` | vollständig gelesen | mittel | Redirect-Stub, bestätigt Pfad-Drift in DESIGN-SYSTEM.md |
| `Theme/assets/fonts/*.css`, `OFL.txt` | Kopfzeilen/Status gelesen | mittel | Alte Font-Dateien explizit deprecated, ersetzt durch `screen.css §2`; Lizenz vorhanden |
| `Theme/index.html` | Kopf gelesen | mittel | Kein Ghost-Template, interner Testharness mit eigenen hartcodierten Farben |
| `Theme/package.json` | vollständig gelesen | niedrig | Kein Tailwind-/Build-Dependency-Eintrag |
| Alle 25 `Apps/*/`-Ordner | strukturell geprüft (Bash-Loop) | hoch | Nur `prokrastinations-preis` hat `app.css`/`app.js` — einzige reale Pilotfläche |

## Nicht gelesen / bewusst ausgespart

| Pfad/Bereich | Grund |
|---|---|
| `docs/design-system/referenz/*.html` (5 weitere Demo-Dateien) | Struktur/Zweck aus `DESIGN-SYSTEM.md` bereits eindeutig, kein zusätzlicher Erkenntnisgewinn für AP-14a-Scope erwartet |
| `docs/design-system/spec/02–06` (Komponenten, Layout, Seitentypen, Icons, Interaktion) | Nur stichprobenartig (Breakpoints) geprüft; volle inhaltliche Auswertung ist AP-14b-Aufgabe (Zielkontrakt), nicht Inventur |
| `docs/App-Fabrik/_input/`, `_working/`, `_archive/`, `_prompts/` | Arbeitsstände/Zwischenversionen, für Ist-Inventur nicht kanonisch; `01_DECISION_LOG.md` als konsolidierte Quelle ausreichend |
| `Theme/apps/`, `Theme/chart-tests/` | Kein Treffer in Pflicht-Suchbegriffen, kein CI-Bezug erkennbar aus Verzeichnisnamen |
| `docs/homepage/`, `Archiv/**` | Historisch/Altstände laut Verzeichnisname, laut Auftrag nur zur Kennzeichnung als historisch, nicht als aktuelle Wahrheit auszuwerten |
| Fontdateien selbst (`.woff2`) | Verboten laut Auftrag (keine Fontbinaries öffnen/kopieren/weitergeben) — nur Existenz und Dateinamen geprüft |

## Datei-Inventar CI-/Theme-relevant

| Pfad | Bereich | Relevanz | Trefferkategorien | Kurzbefund |
|---|---|---:|---|---|
| `docs/design-system/spec/DESIGN-SYSTEM.md` | Doku | hoch | Fonts/Farben/Tailwind/Tokens | Kanonischer Einstieg, 1 toter interner Link |
| `docs/design-system/spec/01-FARBEN-UND-TYPOGRAFIE.md` | Doku | hoch | Farben/Tokens/Fonts/Kontrast | Deckungsgleich mit `screen.css` |
| `docs/design-system/templates/master-template.html` | Referenz | hoch | Tailwind/Farben/Fonts | Einzige echte Tailwind-Einbindung im Repo |
| `docs/design-system/referenz/*.html` (5 Dateien) | Referenz | mittel | Komponenten/Layout | Golden Masters für Ghost-Content-Seiten, kein App-Bezug |
| `Theme/assets/css/screen.css` | Theme CSS | hoch | Tokens/Fonts/Spacing/A11y | Einzige CSS-Wahrheit, technisch korrekt |
| `Theme/assets/fonts/*.woff2` + `OFL.txt` | Theme Assets | hoch | Fonts/Lizenz | Real vorhanden, lizenzdokumentiert |
| `Theme/assets/fonts/styles.css`, `stylesheet.css` | Theme CSS (deprecated) | niedrig | Fonts | Explizit deprecated, Löschung für "AP-8" vorgemerkt (nicht erledigt) |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js` | Chart Engine | hoch | Farben/Fonts/Chart-Theme | Farb-Bridge produktionsreif, Font-Bridge fehlt |
| `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` | Chart Engine | hoch | Fonts/Chart-Theme | Hartcodiertes `sans-serif`, kein Theme-Zugriff |
| `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`, `FwLayoutRules.js`, Strategien | Chart Engine | mittel | Fonts/Chart-Theme | Nutzen korrekt `theme.fonts.body/heading` |
| `Theme/index.html` | Sonstiges | niedrig | Farben (hartcodiert) | Testharness, kein Ghost-Template, keine Tailwind-Spur |
| `Theme/package.json` | Build | niedrig | — | Kein Tailwind-/Build-Tooling |
| `Apps/prokrastinations-preis/app.css` | App | hoch | Fonts/Farben/Tokens/Spacing/CTA | Eigener `--fw-*`-Namensraum, ungebridged |
| `Apps/prokrastinations-preis/app.js` | App | hoch | App-Shell/Ghost | Self-Bootstrap über `.fw-app`/`data-fw-app` |
| `docs/spec/APP-INTERFACE.md` | Doku | hoch | App-Shell/Ghost/Tokens | Redakteursvertrag, `data-fw-theme` reserviert |
| `docs/steering/design/CSS-KONVENTIONEN.md` | Steering | hoch | Tokens/Namenskonvention | Gilt nur `screen.css`, `fw-*` dort "reserviert für Chart-Engine" |
| `docs/App-Fabrik/01_DECISION_LOG.md` | Steering | hoch | Tokens/Architektur | A-04: Theme-Bridge formal entschieden, nicht umgesetzt |
| `docs/steering/BACKLOG.md` | Steering | hoch | alle Kategorien | DS-012/013/014, CSS-5, DS-FOLLOWUP-07/08 bereits erfasst |
| `docs/steering/design/DESIGN-SYSTEM-ISSUES.md` | Steering | niedrig | Doku-Pfad | Redirect-Stub |
| 24 weitere `Apps/*/`-Ordner | App | niedrig | — | Keine `app.css`/`app.js` vorhanden — reine Spec-Stände |

## Fundstellenkarte

| Pfad | Fundstelle | Kategorie | Befund | Einordnung |
|---|---|---|---|---|
| `Theme/assets/css/screen.css:20-56` | `:root` TOKENS-Block | Farben/Tokens | Alle CI-Farben als `--color-*` definiert, 1:1 zu Design-System-Spec | shared/dokumentiert |
| `Theme/assets/css/screen.css:59-101` | FONTS-Block | Fonts | `@font-face` korrekt, `font-family` explizit als Bugfix kommentiert ("MUSS 'Archivo Black' heißen") | shared/dokumentiert |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js:110-169` | `init()` | Farben/Chart-Theme | `getComputedStyle()`-Bridge von `--color-*` nach `this.colors`, Status "PRODUCTION READY" | shared, technisch nachgewiesen |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js:55-58` | `this.fonts` | Fonts/Chart-Theme | Hartcodiert im Constructor, wird in `init()` **nicht** überschrieben — kein CSS-Var-Bridge für Fonts | shared, aber Lücke |
| `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js:95` | `ctx.font = ... + 'px sans-serif'` | Fonts/Chart-Theme | Kein Zugriff auf `theme.fonts` — RubikonSymbolMarkers (✅/❓) rendern in Browser-Fallback-Font | app-lokal (im Engine-Plugin), unklar ob Absicht |
| `Apps/prokrastinations-preis/app.css:9-10` | `.fw-app { font-family: var(--fw-font-base, sans-serif); color: var(--fw-color-text, #1a1a1a); }` | Fonts/Farben/Tokens | `--fw-font-base`/`--fw-color-text` an keiner Stelle im Repo definiert | app-lokal, implizit (Fallback wird real genutzt) |
| gesamtes `Apps/prokrastinations-preis/app.css` (Grep `--fw-`) | ca. 30 Fundstellen | Tokens/Farben/Spacing/CTA | Eigener Namensraum `--fw-color-*`, `--fw-space-*`, `--fw-font-base` — durchgängig nur Fallback-Werte aktiv | app-lokal, unklar/nicht dokumentiert |
| `docs/App-Fabrik/01_DECISION_LOG.md:33-38` (A-04) | Decision-Log-Eintrag | Tokens/Architektur | "Apps nutzen dieselbe Theme-Bridge wie die Chart-Engine … Kein Tailwind CDN in Produktion" — Status 🟢 ENTSCHIEDEN | dokumentiert, widerspricht Realität in app.css |
| `docs/steering/design/CSS-KONVENTIONEN.md:85` | Namenskonventionen | Tokens | "`fw-*` ist reserviert für die Chart-Engine — nicht in screen.css verwenden" | dokumentiert, deckt App-`--fw-*`-Namensraum nicht ab |
| `docs/design-system/templates/master-template.html:1` | `<script src="https://cdn.tailwindcss.com">` + `tailwind.config` | Tailwind | Einzige reale Tailwind-Einbindung im Repo, referenziert `var(--color-*)` | dokumentiert/Referenz, nicht produktiv im Theme |
| `Theme/` (gesamt, Grep `tailwindcss`) | keine Treffer | Tailwind | Kein Tailwind-Skript, keine Config im echten Theme-Ordner | Lücke — nur dokumentiert, technisch nicht vorhanden |
| `Theme/` (gesamt, Grep `.hbs`) | keine Treffer | App-Shell/Ghost | Keine Ghost-Handlebars-Templates im Repo | unklar — Ghost-Einbindung nicht aus Repo verifizierbar |
| `docs/spec/APP-INTERFACE.md:61-107` | §3.1 App-Fabrik-App-Card | App-Shell/Ghost | `.fw-app`/`data-fw-app` als Redakteursvertrag dokumentiert, `data-fw-theme` reserviert/nicht implementiert | dokumentiert, technisch in `app.js` umgesetzt |
| `Apps/prokrastinations-preis/app.js` Ende (`bootstrap()`) | Funktion | App-Shell/Ghost | Self-Bootstrap pro App-Datei über `.fw-app`-Scan, kein globaler Bootstrapper wie in RFCs diskutiert | app-lokal, funktioniert, Duplikationsrisiko bei 25 Apps ungeprüft |
| `docs/design-system/spec/03-LAYOUT-UND-RESPONSIVE.md:8-12` | Breakpoints | Spacing/Breakpoints | Tailwind-Mobile-First, Bezug 768px | dokumentiert (Ghost-Content-Kontext) |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js` `getLineWidth`/`getPointRadius` | Zonen-Matrix | Spacing/Breakpoints | Eigene S/M/L-Zonengrenzen bei 450px/900px | shared (Chart-Engine-Kontext) |
| `Apps/prokrastinations-preis/app.css:297,356,374` | `@media`-Regeln | Spacing/Breakpoints | Eigene Grenzen 480px/481-1024px/600px | app-lokal, dritte unabhängige Skala |
| `docs/steering/design/DESIGN-SYSTEM-ISSUES.md` | ganze Datei | Doku-Wahrheit | Redirect-Stub, `DESIGN-SYSTEM.md` verlinkt trotzdem noch auf nicht existierenden Pfad `docs/context/DESIGN-SYSTEM-ISSUES.md` | historisch/Doku-Drift |
| `docs/steering/BACKLOG.md:30-35` | DS-012/013/014, DS-FOLLOWUP-07/08 | alle Kategorien | Lücke bereits vollständig als Backlog-Punkte erfasst, DS-014 abhängig von DS-012 | dokumentiert, aktiv offen |

## Vorläufige Architekturtrennung

- **Wirkt wie Plattform/shared:** `screen.css` TOKENS+FONTS-Abschnitte, `FwTheme.js`-Farb-Bridge, Font-Dateien selbst, `docs/design-system/spec/` als kanonische CI-Quelle.
- **Wirkt app-lokal:** `Apps/prokrastinations-preis/app.css` komplett (eigener `--fw-*`-Namensraum, eigene Breakpoints, eigene Button-/CTA-Farben), `FwChartTextPlugin.js`-Font-Hartcodierung (technisch im Engine-Ordner, verhält sich aber wie ein lokaler Sonderfall statt Theme-Zugriff).
- **Wirkt historisch gewachsen:** `Theme/assets/fonts/styles.css` + `stylesheet.css` (explizit deprecated, Löschung für "AP-8" vorgemerkt, nie ausgeführt); `Theme/index.html` als Altlast-Testharness ohne Ghost-Bezug.
- **Nur dokumentiert, technisch nicht nachgewiesen:** Tailwind in Produktion (nur in `docs/design-system/`-Referenzen real, nicht im `Theme/`-Ordner); Ghost-Template-Einbindung von `screen.css`/Tailwind (keine `.hbs`-Dateien im Repo, nur Doku-Aussagen zu "Code Injection").
- **Technisch vorhanden, aber nicht dokumentiert:** `Apps/prokrastinations-preis/app.css`s `--fw-*`-Tokennamensraum — existiert im Code, aber weder in `APP-INTERFACE.md` noch in `CSS-KONVENTIENEN.md`/Design-System-Spec als Konvention beschrieben.
- **Redundant:** Zwei parallele Farb-Namensräume (`--color-*` in `screen.css`, real gebridged; `--fw-color-*` in `app.css`, nie gebridged) für dieselben CI-Farben.
- **Hardcodiert:** `FwChartTextPlugin.js` `sans-serif`; `app.css`-Fallbacks (`#1a1a1a`, `#0071bf` klein geschrieben — CI-Spec nutzt `#0071BF` groß); `Theme/index.html`-Testharness-Farben.
- **Riskant für ca. 25 Apps:** Der `--fw-*`-Namensraum aus `app.css` ist die einzige real existierende App-Vorlage. Würden weitere Apps ihn 1:1 kopieren (naheliegend, da einzige Referenz), würde sich die Nicht-Bridge auf alle 25 Apps vervielfachen, bevor DS-012/013/014 geklärt sind.

| Bereich | Plattform/shared | App-lokal | Nur Doku | Nur implizit | Unklar | Risiko |
|---|---:|---:|---:|---:|---:|---|
| Fonts | Dateien + `screen.css` ✓ | `app.css`-Fallback | Design-System-Spec ✓ | `FwTheme.js`-Fonts (hartcodiert korrekt, ungebridged) | — | mittel |
| Farben | `screen.css` + `FwTheme.js`-Bridge ✓ | `app.css`-eigener Namensraum | — | — | Casing-Divergenz (`#0071bf` vs `#0071BF`) | hoch |
| Tokens | `--color-*` | `--fw-*` (App) | — | — | Governance für `--fw-*` fehlt komplett | hoch |
| Tailwind | — | — | Nur `docs/design-system/` | — | Produktions-Einsatz laut A-04 explizit ausgeschlossen | niedrig (bewusst entschieden) |
| Spacing/Layout | — | — | Design-System 768px-Basis | Chart-Engine 450/900px-Zonen; App 480/1024/600px | 3 unabhängige Skalen nie abgeglichen | mittel |
| Chart-Theme | `FwTheme.js` Farben ✓ | `FwChartTextPlugin.js` Font hartcodiert | — | — | Ist Font-Hartcodierung Bug oder Zwischenstand? | mittel |
| App-Shell/Ghost | `.fw-app`/`data-fw-app`-Vertrag ✓ (Doku) | Self-Bootstrap in `app.js` | Ghost-"Code-Injection"-Mechanismus nur in Doku | — | Reale Ghost-Live-Einbindung nicht aus Repo prüfbar | mittel/unklar |
| Prokrastinations-App CSS | — | gesamt `app.css` | — | — | — | hoch (einzige Vorlage für 24 weitere Apps) |

## Lücken und Risiken AP-14a

| Befund | Kategorie | Risiko für 25 Apps | Dringlichkeit | Beleglage | Empfehlung für AP-14b |
|---|---|---:|---:|---:|---|
| `--fw-*`-App-Tokens nie definiert, App läuft dauerhaft auf Fallbacks | Token-Lücke | hoch | hoch | stark | Entscheiden: `--fw-*`→`--color-*`-Mapping in `screen.css` ergänzen (analog `FwTheme.js`-Bridge) oder Apps direkt auf `--color-*` umstellen |
| A-04-Architekturentscheidung nicht umgesetzt | Plattform-/Engine-Lücke | hoch | hoch | stark | AP-14b als formalen Nachvollzug von A-04 rahmen, nicht als neue Entscheidung |
| RubikonSymbolMarkers (Canvas) + DOM-Rubikon-Text nutzen beide `sans-serif`-Fallback, nicht CI-Font | Font-Lücke | mittel (nur 1 App betroffen, aber exemplarisch) | mittel | stark | Nach Tokenklärung: `FwChartTextPlugin.js` optional Theme-Font-Parameter geben; DS-FOLLOWUP-07 danach abarbeiten |
| Tailwind nur in Doku-Referenzen, nicht im echten Theme; A-04 schließt Tailwind in Produktion explizit aus | Tailwind-/Build-Lücke | niedrig | niedrig | stark | Bestätigen: Tailwind bleibt Ghost-Content-only, Apps nutzen nie Tailwind — als Klarstellung in DS-012 aufnehmen |
| Keine Ghost-`.hbs`-Templates im Repo, reale CSS/Font-Auslieferung nicht verifizierbar | Ghost-/Einbettungs-Lücke | mittel | mittel | schwach (nur Doku-Aussagen zu Code Injection) | AP-14b sollte Repo-Grenze benennen; echte Verifikation nur mit Ghost-Admin-Zugriff möglich, kein Repo-Fund |
| Casing-Divergenz `#0071bf` (App-Fallback) vs. `#0071BF` (CI-Spec) | Farb-Lücke | niedrig (technisch identisch, CSS ist case-insensitive bei Hex) | niedrig | stark | Bei Token-Bridge-Umbau ohnehin gelöst, kein Extra-AP nötig |
| Drei unabhängige Breakpoint-Systeme (768px Design-System / 450+900px Chart-Engine / 480+1024+600px App) | Responsiveness-Lücke | mittel | mittel | stark | AP-14b sollte klären, ob eine gemeinsame Breakpoint-Quelle sinnvoll/nötig ist, oder ob die drei Kontexte bewusst getrennt bleiben dürfen |
| `--fw-*`-Namensraum in keiner Konvention geregelt (`CSS-KONVENTIENEN.md` gilt nur `screen.css`) | Doku-/Spec-Lücke | mittel | mittel | stark | Namenskonvention für App-lokale CSS-Variablen als Teil von DS-014 (App-Komponenten-Baukasten) festlegen |
| `DESIGN-SYSTEM.md` verweist auf nicht existierenden Pfad `docs/context/DESIGN-SYSTEM-ISSUES.md` | Doku-/Spec-Lücke | niedrig | niedrig | stark | Kleiner Doku-Fix (1 Zeile), unabhängig von AP-14b erledigbar |
| DS-014 (07-APP-KOMPONENTEN.md) noch nicht begonnen, aber als "Blocker für alle App-Entwicklung" markiert | App-Shell-/Ghost-Lücke | hoch | hoch | stark | AP-14b sollte prüfen, ob DS-014 der eigentliche Zielkontrakt-Träger für AP-14 werden soll |
| Gefahr: 24 weitere Apps könnten `app.css`-Pattern unreflektiert kopieren, bevor Bridge geklärt ist | Plattform-/Engine-Lücke | hoch | hoch | mittel (spekulativ, aber strukturell naheliegend) | AP-14b sollte Zielkontrakt VOR nächstem App-Build klären, nicht erst danach |

## Fonts / Font-Strategie

- Befund: Archivo Black + Source Sans Pro (Regular/SemiBold/Bold) liegen real als WOFF2 in `Theme/assets/fonts/`, inklusive `OFL.txt`-Lizenz.
- technisch eingebunden: ja, in `screen.css §2` via `@font-face`, mit explizit korrigiertem `font-family`-Namen (Bugfix-Kommentar im Code).
- dokumentiert: ja, in `01-FARBEN-UND-TYPOGRAFIE.md` §3, deckungsgleich.
- unklar: ob die Fonts auf echten Ghost-Live-Seiten tatsächlich geladen werden (keine `.hbs`-Templates im Repo, Auslieferung vermutlich über Ghost Code Injection, nicht verifizierbar).
- Risiko: mittel — Chart-Engine (`FwTheme.js`) hat Fonts nur hartcodiert (korrekt, aber nicht CSS-Var-gebridged); `FwChartTextPlugin.js` (Rubikon-Marker) und App-DOM-Text nutzen beide `sans-serif`-Fallback, nicht die realen CI-Fonts.

## Farben / Farbtoken

- Befund: 4 Basisfarben + Abstufungen + Neutralfarben vollständig als `--color-*` in `screen.css :root` definiert, deckungsgleich mit `01-FARBEN-UND-TYPOGRAFIE.md`.
- technisch eingebunden: ja, doppelt — direkt per CSS-Variable in `screen.css`/Ghost-Content, und per `getComputedStyle()`-Bridge in `FwTheme.js` für die Chart-Engine (Status "PRODUCTION READY").
- dokumentiert: ja, inklusive WCAG-Kontrast-Tabelle und expliziter Verbotsliste ("keine erfundenen Farben").
- hardcodiert: `app.css`-Fallbackwerte (`#1a1a1a`, `#0071bf`, `#555555`, `#f5f5f5` …) sind eigene Werte, teils CI-nah, teils nicht CI-Werte (`#1a1a1a`, `#555555` stehen nicht in der CI-Tabelle).
- unklar: ob die App-Fallbacks bewusst als Not-Fallback für Kontext ohne `screen.css` gedacht sind, oder ob sie schlicht die fehlende Bridge kaschieren.
- Risiko: hoch — zwei parallele Farb-Namensräume, nur einer davon lebendig gebridged.

## CSS-/Design-Tokens

- Befund: Zwei komplett getrennte Token-Systeme: `--color-*` (shared, `screen.css`, gebridged) und `--fw-*` (App, ungebridged, nirgendwo definiert).
- shared: `--color-*`-Familie.
- app-lokal: `--fw-*`-Familie, bislang nur in `prokrastinations-preis`.
- hardcodiert: alle `--fw-*`-Fallback-Defaultwerte in `app.css`.
- Risiko: hoch — genau der Kern des offenen Themenblocks CI/Theme-Bridge.

## Tailwind / Build / Einbettung

- Befund: Tailwind ist als CI-Werkzeug für Ghost-Content-Seiten dokumentiert und in Referenz-HTMLs demonstriert (CDN-Skript + Inline-Config in `master-template.html`).
- technisch nachgewiesen: nur in `docs/design-system/`-Referenzdateien, nicht im echten `Theme/`-Ordner.
- nur dokumentiert: Tailwind-Einsatz für den produktiven Ghost-Blog-Content generell (kein `.hbs`-Nachweis im Repo möglich).
- unklar: keins — für Apps ist Tailwind laut A-04 explizit ausgeschlossen ("Kein Tailwind CDN in Produktion"), das ist eindeutig.
- Risiko: niedrig, da bewusste Architekturentscheidung vorliegt, kein Uminterpretationsbedarf.

## Spacing / Layout / Breakpoints

- Befund: Drei unabhängige, nicht aufeinander abgestimmte Breakpoint-/Spacing-Systeme (Design-System/Tailwind 768px, Chart-Engine-Zonenmatrix 450/900px, App-lokale Media-Queries 480/600/1024px).
- shared: keins — jedes System lebt in seinem eigenen Kontext (Ghost-Content vs. Chart-Rendering vs. App-DOM).
- app-lokal: `app.css` Media-Queries.
- hardcodiert: alle drei Systeme, keine gemeinsame Quelle.
- Risiko: mittel — funktional aktuell unproblematisch (unterschiedliche Kontexte), aber ungeklärt, ob das für 25 Apps so bleiben soll.

## Chart-Theme / Chart-Farben / Chart-Typografie

- Befund: `FwTheme.js` ist die zentrale, produktionsreife Chart-Theme-Quelle für Farben (Bridge) und Geometrie (Linienstärken, Punktradien nach S/M/L-Zonen). Fonts sind korrekt, aber hartcodiert (kein Bridge-Bedarf, da Werte bereits CI-konform sind).
- Engine/shared: `FwTheme.js`, `FwRenderer.js`, `FwLayoutRules.js`, alle `*Strategy.js` nutzen `theme.fonts.body`/`.heading` korrekt.
- app-lokal: `FwChartTextPlugin.js` (RubikonSymbolMarkers) bricht dieses Muster — hartcodiert `sans-serif` statt Theme-Zugriff.
- hardcodiert: `FwChartTextPlugin.js:95`.
- Risiko: mittel — betrifft aktuell nur eine sichtbare Stelle (✅/❓-Marker), aber als Präzedenzfall relevant für künftige Text-Plugins.

## App-Shell / Ghost / Einbettung

- Befund: Redakteursvertrag (`class="fw-app"`, `data-fw-app`, optional `data-fw-data`/`data-fw-config`/`data-fw-options`) ist in `APP-INTERFACE.md` §3.1 dokumentiert und in `app.js` über eine lokale `bootstrap()`-Funktion (DOMContentLoaded → `querySelectorAll('.fw-app')`) umgesetzt. Kein globaler, geteilter Bootstrapper — jede App bringt ihre eigene Bootstrap-Logik mit.
- shared: nur der Vertrag (HTML-Attribute), nicht die Implementierung.
- app-lokal: die komplette Bootstrap-/Init-/Guard-Logik liegt 1:1 in `app.js`.
- dokumentiert: Vertrag ja, Implementierungsmuster nein (in `APP-INTERFACE.md` §4 explizit als "separates Gate" für später vertagt).
- unklar: ob echte Ghost-Seiten `screen.css`/Fonts tatsächlich laden, wenn eine App-Card eingebettet wird (Repo enthält keine `.hbs`-Templates, keine Ghost-Config).
- Risiko: mittel — funktioniert für 1 App, Duplikationsverhalten bei 25 Apps ungetestet, `data-fw-theme` als reservierter, nicht implementierter Override-Pfad ist ein offener Faden.

## Prokrastinationspreis-App: app-lokale Gestaltungslogik

- Befund: `app.css` (415 Zeilen) ist vollständig app-lokal, nutzt durchgängig den `--fw-*`-Namensraum mit Fallback-Werten, dazu mehrere feinjustierte, punktuell nachgemessene CSS-Variablen für Positionierung/Timing (`--fw-rubikon-text-top/-left`, `--fw-card-to-point-flight-duration`, `--fw-screen3-reveal-fade-duration`).
- relevante Dateien: `Apps/prokrastinations-preis/app.css`, `app.js` (Klassenvergabe `fw-app__*`, BEM-artig).
- Pilotflächen-Hinweise für AP-14b: Diese App ist die einzige reale Vorlage für alle künftigen Apps — jede Entscheidung in AP-14b zur Token-Bridge betrifft unmittelbar `app.css` als Migrationsziel.
- Risiken: Wenn 24 weitere Apps nach diesem Muster gebaut würden, bevor die Bridge steht, vervielfacht sich die Nicht-Anbindung an echte CI-Werte.

## Vorläufige Architekturtrennung

(siehe Tabelle oben unter „Vorläufige Architekturtrennung")

## Alte offene Punkte: nur Einordnung für spätere APs

### No-op-Bootstrap / AnchorMeasurement

- in AP-14a gefunden: nein, keine neue Fundstelle. Bereits als `AP-prokrast-08-FOLLOWUP-A` in `BACKLOG.md` dokumentiert.
- CI-Bezug erkennbar: nein — reiner Chart.js-Plugin-Registrierungs-Mechanismus, kein Farb-/Font-/Token-Bezug.
- Empfehlung für AP-14b: nicht mitziehen, eigenständiger Engine-Architektur-Strang, unabhängig von CI/Theme-Bridge.

### chartSettled-Plattform-Doku

- in AP-14a gefunden: nein, keine neue Fundstelle. Laut `session-log.md` bereits in AP-prokrast-09b geschlossen (Creation-Pfad), offene Restpflicht ist reine Plattform-Dokumentation, kein CI-Bezug.
- CI-Bezug erkennbar: nein.
- Empfehlung für AP-14b: nicht mitziehen.

### RubikonSymbolMarkers-Font-Neumessung

- in AP-14a gefunden: ja — bestätigt über `FwChartTextPlugin.js:95` (hartcodiert `sans-serif`) und `app.css`-DOM-Text (`--fw-font-base`-Fallback). Deckt sich exakt mit `DS-FOLLOWUP-07`.
- Abhängigkeit von echter CI/Fonts: vollständig — Neumessung ergibt erst nach Klärung der Token-Bridge (DS-012/013) einen stabilen Endstand, sonst müsste nach jeder Bridge-Änderung erneut nachgemessen werden.
- Empfehlung für AP-14b: `DS-FOLLOWUP-07`/`-08` explizit als Nachfolge-AP nach dem Zielkontrakt einplanen, nicht vorher anfassen.

### TC-E06 / TC-E07 / A11y-Praxistests

- in AP-14a gefunden: kein direkter CI-Bezug in den Testfällen selbst gefunden (nicht vertieft gelesen, außerhalb Scope).
- Abhängigkeit von echter CI-Basis: potenziell mittelbar (Kontrast-/Fokus-Styles hängen an `--color-*`, die bereits gebridged sind — vermutlich nicht blockiert durch die `--fw-*`-Lücke).
- Empfehlung für AP-14b: nicht vordringlich mitziehen, eigenständiger QA-Strang.

## Geänderte Dateien

- docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md

## Explizit nicht geändert

- app.js: nicht geändert
- app.css: nicht geändert
- Theme/assets/js/fw-chart-engine/**: nicht geändert
- Theme/assets/css/**: nicht geändert
- stations.de.json: nicht geändert (nicht gelesen, kein CI-Bezug)
- APP_SPEC.md: nicht geändert
- drehbuch: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- Produktentscheidungen Screen 2/3/4: nicht geändert, nicht neu diskutiert
- RubikonSymbolMarkers: nicht geändert (nur gelesen/inventarisiert)

## Wiederlesen / Datei-Wahrheit

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- git diff --name-status nach Write: `M .claude/learning/session-log.md` (vorbestehend aus /start-Warmstart, nicht Teil dieses APs); `?? docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md` (dieser Write); zwei vorbestehende `?? Archiv/Chroniken/chronist-v1/CHRONIK-*.md` (nicht Teil dieses APs)
- nur erlaubter Write-Scope verändert: ja
- Abweichungen: keine

## Empfehlung für AP-prokrast-14b

- Nächster sinnvoller Unter-AP: Zielkontrakt-/Architektur-Analyse auf Basis dieser Fundstellenkarte, mit Fokus auf die Token-Bridge-Entscheidung (`--color-*` vs. `--fw-*`) als zentralem Hebel.
- Warum: Alle anderen Lücken (Fonts, Chart-Text-Plugin, Breakpoints, DS-FOLLOWUP-07/08) hängen kausal an dieser einen Entscheidung. Die Architektur ist bereits formal entschieden (A-04) — AP-14b muss primär den Nachvollzug/die Umsetzung planen, nicht neu verhandeln.
- Was AP-14b vertiefen sollte: konkretes Bridge-Design (liest `app.css` künftig `--color-*` direkt, oder bekommt `screen.css` einen neuen `--fw-*`-Alias-Block analog zur `FwTheme.js`-Bridge?), Governance/Namenskonvention für App-lokale Tokens (Teil von DS-014), Umgang mit `FwChartTextPlugin.js`-Font-Hartcodierung, Klärung ob/wie Breakpoint-Systeme vereinheitlicht werden sollen.
- Was ausdrücklich nicht AP-14b sein sollte: keine Migration von `app.css` selbst, keine Umsetzung, kein Anfassen von Screen 2/3/4-Produktentscheidungen, keine Ghost-Admin-Praxisprüfung (liegt außerhalb Repo-Zugriff).

## Chat-Kurzfassung für den Nebenfaden

Es existiert bereits ein vollständiges, dokumentiertes CI-System und eine produktionsreife Farb-Bridge für die Chart-Engine (`FwTheme.js`). Der reale App-Code (`prokrastinations-preis/app.css`, einzige gebaute App von 25) setzt die dafür bereits formal entschiedene Architektur (`01_DECISION_LOG.md` A-04: Apps nutzen dieselbe Theme-Bridge wie die Chart-Engine) jedoch nicht um — er nutzt einen eigenen, nirgendwo definierten `--fw-*`-Token-Namensraum und läuft dauerhaft auf Fallback-Werten. Tailwind ist nur in Doku-Referenzen real, für Apps explizit ausgeschlossen. Drei unabhängige Breakpoint-Systeme existieren nebeneinander. BACKLOG DS-012/013/014 trackt die Lücke bereits — AP-14b kann direkt auf dieser Karte und auf A-04 aufsetzen, statt neu zu explorieren.
