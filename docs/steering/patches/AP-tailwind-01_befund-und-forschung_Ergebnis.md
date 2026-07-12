Stand: 2026-07-12 | Session: AP-tailwind-01 | Geändert von: Claude

# AP-tailwind-01 — Befund und Forschung: Tailwind-Fundament der App-Fabrik

Status: **GELB** (ein Research-Gap-Punkt bewusst geklärt statt vermieden: Ghost-`.hbs`-Kette ist repo-intern nicht verifizierbar — das ist ein Alt-Befund aus dem CI-Pool-Kontrakt selbst, kein neuer Fund dieses APs. Alle anderen Abschnitte sind vollständig und evidenzbasiert.)

---

## 0. Metadaten

| Feld | Wert |
|---|---|
| Datum | 2026-07-12 |
| Repository | `Finanzwesir-code` (Remote `git@github.com:awa-de/Finanzwesir-code.git`, verifiziert) |
| Branch | `master` |
| Commit (HEAD) | `27deffa` |
| Git-Status vor AP | `M .claude/learning/session-log.md` (eigener Session-Start-Eintrag dieser Session, Schritt 0), `M docs/steering/BACKLOG-ARCHIV.md` (vorbestehend, unabhängig von diesem AP — nicht angefasst) |
| Git-Status nach AP | zusätzlich: `?? docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md` (diese Datei) — sonst identisch |
| Modellrollen | Sonnet (Synthese, Quellenhierarchie, DOM/Canvas-Grenze, Fable-Dossier); 3× `codebase-scout`/`spec-scout` (Haiku, mechanische Datei-Extraktion mit Zeilenverweisen, keine Bewertung) |
| Werkzeuge | Python (repo-weite Fundstellenkarte, App-Pool-Inventur, Strukturwert-Stichproben), Grep/Read (Direktverifikation der 10+ folgenreichsten Claims), WebSearch (externe Recherche) |
| Forschungszugang | Ja — WebSearch verfügbar und genutzt, kein RESEARCH-GAP bei externen Quellen |
| Status | GELB (siehe oben) |

**Scope-Bestätigung (Gate A vorweggenommen):** Einzige neue/geänderte Repository-Datei ist diese Ergebnisdatei. Kein Produktionscode, kein Test-Code, keine Spec berührt.

---

## 1. Executive Befund

**Tailwind ist bereits verbindlich als Ziel-Fundament beschlossen — aber im App-Pool faktisch noch nicht angekommen.** Der Kontrakt `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` (Stand 2026-07-11, durch Albert freigegeben) legt fest: CI-Schicht liefert nur Farben/Fonts, „Struktur (Spacing, Schatten, Radius, Borders) kommt aus Tailwinds Default-Skalen", volle Tailwind-Farbskalen 50–900, Refactoring-UI-Doktrin „Abstand > Flächenton > Schatten > Border zuletzt" ist bereits zitierte Leitlinie. Die Migrationskette (AP-15c Farben → AP-16 Theme-Migration → AP-17 Pilot-Migration `prokrastinations-preis` → AP-18 Review) gilt laut BACKLOG-ARCHIV als abgeschlossen.

**Aber:** Die einzige real produktive App (`prokrastinations-preis`) enthält null Tailwind-Utility-Klassen und keinen Tailwind-Ladevorgang — sie nutzt ausschließlich eigene BEM-artige `fw-app__*`-Klassen mit CSS Custom Properties. Die „Pilot-Migration" AP-17 hat nachweislich nur den CSS-Custom-Property-Namensraum umbenannt (`--fw-color-*` → `--color-*`), nicht die Struktur auf Tailwind-Utilities umgestellt. Die Chart-Engine erzeugt ihr komplettes DOM-Chrome (Titel, Toolbar, Legende, BAN-Headline, Popover) über eigene `fw-*`-Klassen in eigenem CSS — ebenfalls kein Tailwind. Die drei „Standalone-Demo"-Apps (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) haben je ein eigenes, in sich geschlossenes Design-Token-System (eigene Farben, Radien, Schatten, sogar eigene Fonts) — CI-fremd und Tailwind-fremd. 21 von 25 App-Ordnern enthalten nur Spec-Material, keine Laufzeit.

Real produktiv Tailwind-Utility-Klassen erzeugt **einzig** `Theme/assets/js/fw-janitor.js` — ein Content-Design-System-Skript für Ghost-Redaktionsboxen, außerhalb des App-Fabrik-Scopes.

**Was Fable entscheiden muss:** nicht *ob* Tailwind kommt (das ist entschieden), sondern *wie* die App-Fabrik (25+ Apps, Chart-Engine-DOM-Chrome, 3 divergente Standalone-Prototypen) von eigenem CSS auf die bereits beschlossene Tailwind-Struktur überführt wird — welche Primitiven zuerst, welche Card-/Panel-Taxonomie, wie Utility-Klassen und JS-erzeugtes DOM zusammenspielen, ohne den späteren lokalen Build (Purge/Safelist) zu gefährden.

**Blocker/Informationslücken:** Ob und wo Tailwind im echten Ghost-Theme (`.hbs`-Templates) geladen wird, ist aus diesem Repository nicht feststellbar — es existieren keine `.hbs`-Dateien und kein `Theme/.git` im Repo (Theme enthält nur `package.json`, `assets/`, `apps/`, leeres `partials/`). Das ist ein bereits im Kontrakt selbst dokumentierter offener Punkt (P18), kein neuer Befund.

---

## 2. Quellenhierarchie und Statuskarte

| Quelle | Status | Geltungsbereich | Konflikt? |
|---|---|---|---|
| `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` (Stand 2026-07-11) | **KANONISCH/VERBINDLICH** | Farb-/Font-Rollenmodell, Tailwind-Grundsatzentscheidung, Konsumenten-Regel, Struktur=Tailwind-Defaults | nein — höchste Autorität in diesem Themenfeld |
| `Theme/assets/css/tokens.css` | **AKTUELLER IST-CODE** | Einzige Quelle für `--color-*`/`--font-*`/`--shadow-*`; „FINAL, Änderungsverbot" | keiner |
| `Theme/assets/css/screen.css` | **AKTUELLER IST-CODE** | Ghost-Theme-CSS, 7 Abschnitte; Abschnitt 7 „Janitor Fallback ohne Tailwind" ist leer | keiner (Leerstand ist dokumentierter Zwischenstand) |
| `Apps/prokrastinations-preis/{app.css,app.js,app.test.html,APP_SPEC.md}` | **AKTUELLER IST-CODE** | einzige real integrierte App | Spannung zu CI-POOL §9 (siehe Abschnitt 10, F-03) |
| `Theme/assets/js/fw-chart-engine/**`, `tests/engine/*.test.html` | **AKTUELLER IST-CODE / AKTUELLER TESTSTANDARD** | Chart-Engine DOM+Canvas, 15 Testseiten | keiner |
| `docs/App-Fabrik/01_DECISION_LOG.md` (A-04) | **KANONISCH/VERBINDLICH** (Einzelentscheidung) | „Kein Tailwind CDN in Produktion" für Apps | Scheinwiderspruch zu CI-POOL, aufgelöst in Abschnitt 10 (F-04) |
| `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (KDR 14) | **KANONISCH/VERBINDLICH** | CSS-Variablen-Bridge Farbe+Font, Chart-Engine liest zur Laufzeit aus `tokens.css` | keiner |
| `docs/testing/TEST_PAGE_STANDARD.md` §10 | **AKTUELLER TESTSTANDARD** | verbietet absolute CDN-URLs (`cdn.tailwindcss.com`, `cdn.jsdelivr.net`) in dauerhaften Testseiten | konsistent mit A-04/T1 |
| `docs/steering/BACKLOG.md` (DS-012/013/014, CSS-6, T1, DS-006, TESTENV-1-FOLLOWUP-BORDER) | **ERGEBNISPROTOKOLL/EVIDENZ (offen)** | dokumentiert genau die hier gefundenen Lücken als bereits bekannte, noch offene Arbeitspakete | keiner — bestätigt diesen Befund |
| `docs/App-Fabrik/_input/perplexity/fw-app-template.html` | **ROHREFERENZ/STEINBRUCH** (per CI-POOL §10 explizit „Steinbruch mit Prüfauftrag", keine Bindungskraft) | zeigt vollständige Tailwind-CDN+Config-Vorlage für alle Apps | historisch, nicht produktiv |
| `Archiv/**`, `docs/design-system/referenz/**`, `docs/design-system/archiv/**`, `docs/homepage/09-erste-html-version/**`, `Apps/regulatorik-dashboard/Altmaterial/**` | **HISTORISCH/ERSETZT bzw. ARCHIV** | 39 von 39 gefundenen `cdn.tailwindcss.com`-Einbindungen liegen hier oder in der Rohreferenz oben — keine einzige in aktivem Produktionscode | keiner |
| `docs/steering/design/CSS-KONVENTIONEN.md` | **KANONISCH/VERBINDLICH** (Website-Ebene, nicht App-Fabrik) | „Layout/Abstände/Flexbox/Grid → Tailwind-Klassen; Marken-Styling/Hover/Übergänge → Custom CSS" | betrifft Ghost-Content-Seiten, nicht direkt Apps |

---

## 3. Repository- und App-Pool-Inventar

Python-Auszählung (`os.walk` über `Apps/`, Tiefe 1 pro App-Ordner), 25 App-Ordner real vorhanden (bestätigt deckungsgleich mit Memory „22+3=25"):

| Gruppe | Anzahl | Ordner | Merkmale |
|---|---|---|---|
| **Real integrierte produktive App** | 1 | `prokrastinations-preis` | `app.css`+`app.js`+`app.test.html`+`APP_SPEC.md`, Subordner `Archiv/`,`config/`,`test-data/` |
| **Realer Standalone-Prototyp** (eigenständiges HTML, eigenes Tokensystem, nicht in App-Fabrik-Muster integriert) | 3 | `regulatorik-dashboard` (+ Subordner `Altmaterial/`), `rollierende-sparplaene`, `weltkarte-etf-indizes` | je 1–2 `.html`-Dateien mit vollständigem `<style>`-Block im `<head>`, eigene `:root`/Klassen-Tokens |
| **Spec-/Planungs-App ohne Runtime** | 21 | u. a. `crash-reaktions-test`, `depot-kipppunkt`, `der-alte-euro`, `diversifikations-detektor`, `esg-spiegel`, `etf-aera-vorbei`, `etf-namensdecoder`, `etf-vergleich`, `geburtsjahrlos`, `investment-universum`, `komplexitaets-entlarver`, `kostenkiller-ter`, `market-timing-simulator`, `markt-kam-zurueck`, `plan-generator`, `rendite-kalibrierung`, `renditekiller-volatilitaet`, `replizierer-swapper`, `risiko-uebersetzer`, `thesaurierer-rennen`, `weltdepot-baukasten` | enthalten ausschließlich `MINI_SPEC_FROM_HAUPTDOKUMENT.md` (+ 2 Root-Dateien `APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`, `MINI_SPEC_MAPPING.md`) — kein HTML/CSS/JS |

**Tailwind-Spuren je Zustand (repo-weite Python-Fundstellenkarte, 2525 Dateien gesehen, 2330 Textdateien durchsucht):**

| Zustand | Befund | Belegzahl |
|---|---|---|
| **Tailwind verfügbar** (irgendwo im Repo dokumentiert/referenziert) | ja, als beschlossene Zielarchitektur (CI-POOL-Kontrakt) | — |
| **Tailwind konfiguriert** | nur in Rohreferenz `fw-app-template.html` (`tailwind.config = {...}`, Zeilen 73–97) — Steinbruch, keine Bindungskraft | 1 Datei |
| **Tailwind tatsächlich im Markup genutzt** (Utility-Klassen im produktiven DOM) | nur `Theme/assets/js/fw-janitor.js` (Content-Design-System, nicht App-Fabrik) — `rounded-xl`, `p-6`, `md:p-8`, `flex`, `gap-4`, `w-16 h-16`, `shrink-0`, `text-lg`, `space-y-3` u.v.a. | 1 Datei, produktiv |
| **Tailwind als strukturelles Fundament der App-Fabrik genutzt** | **nein, noch nicht** — 0 Treffer für `cdn.tailwindcss.com` in `Apps/**` (außer `Altmaterial/`) oder `Theme/assets/css/**` | 0 von 25 Apps |
| **`cdn.tailwindcss.com`-Einbindungen gesamt (repo-weit)** | 60 Zeilen-Treffer / 39 Dateien | **alle 39 Dateien** liegen in `Archiv/`, `docs/design-system/referenz`, `docs/design-system/archiv`, `docs/homepage/09-erste-html-version`, `Apps/regulatorik-dashboard/Altmaterial/` oder der Rohreferenz `fw-app-template.html` — **keine einzige in aktivem Produktions- oder Testcode** |

---

## 4. Ist-Zustand Tailwind

**Vier-Zustände-Trennung (wie vom Auftrag gefordert):**

1. **Verfügbar:** Ja, als kanonisch beschlossene Zielarchitektur seit `AP-prokrast-15a`–`15c` (Rücklaufkapsel, Masterentscheidungen F1–F11, durch Albert freigegeben).
2. **Konfiguriert:** Nein, produktiv nirgends. Einzige existierende `tailwind.config`-Instanz liegt in der als Steinbruch markierten Rohreferenz `docs/App-Fabrik/_input/perplexity/fw-app-template.html:73–97`.
3. **Genutzt (Utility-Klassen im Markup):** Nur in `fw-janitor.js` (Content-Boxen: Info/Warn/Fazit, Checklisten) — dies ist **Content-Design-System**, nicht App-Fabrik, und liegt damit außerhalb des unmittelbaren Fable-Scopes dieses APs, ist aber ein wichtiger Beleg dafür, dass Tailwind-Utility-Klassen bereits *irgendwo* live im Ghost-Rendering erwartet werden (siehe F-07).
4. **Fundament der App-Fabrik:** Nein. `prokrastinations-preis`, die Chart-Engine und alle drei Standalone-Prototypen sind vollständig auf eigenem CSS aufgebaut.

**CDN-Duplikations-/Build-Risiko:** Da produktiv aktuell *nirgends* in der App-Fabrik eine Tailwind-CDN-Einbindung existiert, besteht heute kein akutes „zwei Markup-Verträge"-Risiko (CDN heute vs. lokaler Build später) — dieses Risiko entsteht erst, sobald die App-Fabrik-Migration beginnt, und ist bereits vorausschauend in `docs/steering/BACKLOG.md` als **T1** benannt („CDN → lokaler, komprimierter Build", abhängig von **CSS-6** „Tailwind Production-Build < 30 KB"). Für `fw-janitor.js` (Content-System) muss die Frage gesondert beantwortet werden, wo dessen Tailwind-Quelle heute tatsächlich lädt — im Repository nicht verifizierbar (kein `.hbs`, siehe Abschnitt 10, F-08).

---

## 5. UI-Primitiven-Katalog

Quelle: eigenes Lesen + 3 dispatchte Scout-Berichte (Datei+Zeile-Belege), Redundanzen entduplizert.

| ID | Primitive-ID | Name/Klassen | Verbraucher | Produktionsrelevant | Strukturquelle | Aktuelles visuelles Muster | Responsive | A11y | Tailwind-nahe Kandidat | Fable-Frage | Evidenz |
|---|---|---|---|---|---|---|---|---|---|---|---|
| UI-01 | App-Root/Shell | `.fw-app` | prokrastinations-preis | ja | CSS | `position:relative`, eigene Font/Farbe via `var(--font-body)`/`var(--color-*)` | — | — | ja (Container/Padding) | Wird App-Shell ein Tailwind-Utility-Verbund oder bleibt `.fw-app` als benannte Komponentenklasse? | `app.css:9-27` |
| UI-02 | Screen/Step-Container | `.fw-app__screen` + `data-fw-screen` | prokrastinations-preis | ja | CSS+JS | 4 sequenzielle Screens, `hidden`-Attribut außer aktiv | — | `hidden`-Attribut steuert A11y-Tree | mittel | Bleibt Screen-Flow App-Mechanik oder wird Grundmuster (Stepper) Tailwind-Kandidat? | `app.js:302,351,381,435` |
| UI-03 | Headline/Subline | `.fw-app__screen-headline` (h2), `.fw-app__screen-subline` (p) | prokrastinations-preis | ja | CSS | `font-size:1.5em` bold / `0.9em` muted, `tabIndex=-1` | — | JS-Fokus nach Screenwechsel | ja | Typografie-Skala aus Tailwind (`text-xl`/`text-sm`) übernehmbar? | `app.css:134-149`, `app.js:305-313` |
| UI-04 | KPI-Gruppe/KPI-Karte | `.fw-app__kpi-cards` (dl), `.fw-app__kpi-card` | prokrastinations-preis | ja | CSS+JS | `display:flex;flex-wrap;gap`, Karte `flex:1 1 140px`, Surface-BG, `border-radius:4px` | flex-wrap implizit | native `dl/dt/dd` | ja (klassisches Stat-Grid) | Eigene KPI-Card-Komponente oder Tailwind-Stat-Grid-Pattern (Refactoring-UI „Stat Group")? | `app.css:55-81`, Scout A |
| UI-05 | Chart-Section/Chart-Container | `.fw-app__chart-section` (App-Seite), `.fw-chart-wrapper`/`.fw-chart-canvas-container` (Engine-Seite) | App+Engine | ja | CSS (2 Systeme, nicht verbunden) | App-Seite: reiner Positionierungs-Wrapper; Engine-Seite: eigenes Chrome (siehe UI-08 ff.) | Container Queries (Engine-Seite) | — | teilweise (Wrapper ja, Canvas-Innenleben nein) | Wie integriert sich `.fw-app__chart-section` mit dem Engine-eigenen `.fw-chart-wrapper`, ohne doppelte Container zu erzeugen? | `app.css:118-123`, `FwRenderer.js:121` |
| UI-06 | Slider inkl. Label+Wert | `.fw-app__slider-section/-label/-label-text/-slider/-slider-value` | prokrastinations-preis | ja | CSS+JS | `<label>` um `<input type="range">`, ARIA `valuemin/max/now/text` | `flex-wrap` | vollständig (Scout F) | ja (Form-Control-Pattern) | Slider als natives `<input>` + Tailwind-Utilities stylen oder Headless-UI-artige Komponente? | `app.css:83-116`, Scout A/F |
| UI-07 | Primär-/Sekundär-CTA/Journey-Button | `.fw-app__btn`, `--next`, `--prev`, `--journey`, `.fw-app__cta` | prokrastinations-preis | ja | CSS+JS | Base-Klasse + Modifier, `border`/`background` Primary-Token | 1 Breakpoint (600px, Journey-Button full→auto) | `<button type="button">` konsequent, keine `<a>` für Nicht-Navigation | ja (klassische Button-Hierarchie) | Tailwind-Button-Varianten (primary/secondary/ghost) statt BEM-Modifier? | `app.css:157-187,296-309`, Scout D |
| UI-08 | Station-/Story-Karte | `.fw-app__station-area` (+ `-source-label`,`-headline`,`-anchor`) | prokrastinations-preis | ja | CSS+JS | `display:flex;flex-direction:column;gap` | — | `tabIndex=-1` auf Headline | ja | Story-Karten-Pattern als wiederverwendbare Komposition für andere Apps? | `app.css:211-243` |
| UI-09 | Collapsible/Disclosure | `.fw-app__collapsible(-trigger,-content)` | prokrastinations-preis | ja | CSS+JS | eigener Trigger-Button, `hidden`-Attribut am Content | — | `aria-expanded`,`aria-controls` vollständig | ja — direkter Headless-UI-Disclosure-Kandidat | Eigenbau ablösen durch Headless-UI-Disclosure-Pattern (siehe R-04)? | `app.css:245-264`, Scout B/D |
| UI-10 | Zwischenstand-/Definition-List | `.fw-app__intermediate-values` (dl) | prokrastinations-preis | ja | CSS | `display:grid;grid-template-columns:1fr 1fr` | 2-Spalten fix | native `dl` | ja | Grid-Utility direkt übernehmbar | `app.css:270-286` |
| UI-11 | Annahmen-/Disclaimer-Box | `.fw-app__assumptions` (aside) | prokrastinations-preis | ja | CSS | `border-left:3px`, kleine Schrift, muted | — | — | ja | Callout-Pattern (siehe UI-19) wiederverwenden? | `app.css:189-196` |
| UI-12 | ARIA-Live-Region | `.fw-app__visually-hidden` | prokrastinations-preis | ja | CSS | `clip:rect(0,0,0,0)` Standard-Visually-Hidden-Pattern | — | `aria-live="polite"`,`aria-atomic="true"` | ja (Tailwind `sr-only` ist Standard-Äquivalent) | `.fw-app__visually-hidden` 1:1 durch Tailwind `sr-only` ersetzbar? | `app.css:198-209` |
| UI-13 | App-Mechanik: Card-to-Point-Flug | `.fw-app__station-area--flight-clone/-active` + `--fw-*`-Custom-Properties | prokrastinations-preis | ja | CSS+JS | Transform/Opacity-Transition, `prefers-reduced-motion`-Aus | — | Reduced-Motion behandelt | **nein — App-Mechanik, kein Primitive** | bleibt lokal, keine Fable-Entscheidung nötig | `app.css:310-335`, Scout H |
| UI-14 | App-Mechanik: Rubikon-Text-Overlay | `.fw-app__rubikon-*` + Positions-Custom-Properties | prokrastinations-preis | ja | CSS+JS | `position:absolute`, 3 Breakpoint-Varianten (S/M/L-Position) | 3 Breakpoints (480/1024px) | `pointer-events:none`, A11y-Text separat | **nein — App-Mechanik** | bleibt lokal | `app.css:337-385`, Scout H |
| UI-15 | Chart-Titel | `.fw-chart-title` (h3) | Engine (alle Charts) | ja | CSS (Engine-intern) | Petrol-Farbe, Font-Weight 700 | — | — | ja | Chart-Titel als Tailwind-Typo-Utility oder engine-eigene Klasse bleibt? | `FwRenderer.js:125-128` |
| UI-16 | Chart-Toolbar/Button-Group/Toggle | `.fw-chart-toolbar`,`.fw-btn-group`,`.fw-btn`,`.fw-toggle(-opt)` | Engine | ja | CSS (Engine-intern) | Flex, Grauer BG, Border-Radius, Active-State | Container Query S (≤450px) → Spalten/Grid | — | ja (Segmented-Control-Pattern) | Segmented-Control aus Tailwind/Headless-UI statt Eigenbau? | `FwRenderer.js:248-310,451-463` |
| UI-17 | Chart-Legende | `.fw-chart-legend`,`.fw-legend-item(-dot,-text)` | Engine | ja | CSS (Engine-intern) | Rounded Pill, Shadow, Hover-Lift, Toggle-Grayscale | Flex-Wrap | click-interaktiv, kein ARIA belegt | ja | Legend-Pill-Pattern aus Tailwind? A11y-Lücke (kein `aria-pressed` dokumentiert) an Fable/Engine-Team melden | `FwRenderer.js:312-366` |
| UI-18 | BAN-Headline (Big-Ass-Number) | `.fw-ban-container(-series,-main,-sub,-hint)` | Engine | ja | CSS (Engine-intern) | Fade-in-Animation, Font-Size-Sprung per Container Query | Container Query (≤450 vs. >450, **keine M/L-Trennung**) | `aria-live="polite"` | ja (Stat-Tile-Pattern) | Stat-Tile-Pattern aus Tailwind/Refactoring-UI direkt für BAN übernehmbar? | `FwRenderer.js:487-564` |
| UI-19 | Popover (Drill-Down) | `.fw-popover-*` (backdrop, box, headline, close, body, row, label-box, dot, value, footer, btn-close) | Engine | ja | CSS (Engine-intern) | Fixed-Modal, Backdrop-Blur, eigene Row/Dot/Value-Struktur | `90% width, max-width 340px` | Close-Button vorhanden, Fokus-Trap nicht belegt | ja — direkter Headless-UI-Dialog-Kandidat | Modal/Popover durch Headless-UI-Dialog ersetzen (Fokus-Trap, Escape, Backdrop kostenlos)? | `FwRenderer.js:161-239` |
| UI-20 | Loading/Empty/Error-State | `.fw-loading-container/.fw-loader` (Engine), `data-fw-state` (App) | Engine+App | ja | CSS+JS (2 unabhängige Muster) | Engine: Spinner-Animation; App: Opacity-Reduktion per Attribut-Selektor | — | Engine: kein `role` belegt; App: `role="status"`/`role="alert"` (Scout F) | ja (Skeleton/Spinner-Pattern) | Ein gemeinsames Loading/Empty/Error-Vokabular für App+Engine statt zwei getrennter? | `FwRenderer.js:38-59`, `app.css:29-52`, Scout C |
| UI-21 | Fokus-/A11y-Helfer (App) | `tabIndex=-1` + `.focus()`, `aria-live`, `role=status/alert`, `aria-valuemin/max/now/text` | prokrastinations-preis | ja | JS | vollständiges, konsistentes A11y-Muster | — | siehe Abschnitt 9 | teils (Tailwind `focus-visible:`-Utilities ergänzbar) | Fokus-Ring-Styling über Tailwind `focus-visible:ring-*` vereinheitlichen? | Scout F (vollständige Tabelle) |
| UI-22 | Content-Callout (Info/Warn/Fazit-Box) | `fw-janitor.js`-generierte Klassen: `bg-petrol-tint`,`border-petrol-20`,`rounded-xl`,`p-6 md:p-8`,`flex flex-col md:flex-row`,`gap-4 md:gap-8` u.a. | Ghost-Content (Redaktion), **nicht App-Fabrik** | ja (Content-System) | JS (generiert reine Tailwind-Utility-Strings) | einziger Ort mit produktiv genutzten Tailwind-Utilities im ganzen Repo | `md:`-Prefix-Responsive | Icon+Text-Pattern (keine reine Farbcodierung) | **bereits Tailwind** | Nutzt dieses Muster veraltete Klassennamen (`-tint`,`-20`) aus der **verbotenen** Namensraum-Liste (§3 CI-POOL-Kontrakt)? Migrations-Reichweite von DS-012/T1 klären | `fw-janitor.js:42-64` |
| UI-23 | Testharness-Chrome (Engine-Tests) | `.fw-test-page/-header/-runtime-status/-errors/-case/-expected/-instruction/-main/-index-*` | `tests/engine/**`,`tests/shared/**` | **nein — nur Testseite** | CSS (`tests/shared/test-page.css`) | dashed Border, Erwartungs-Box, Statusanzeige | — | — | nein (bewusst kein Tailwind-Kandidat, siehe TEST_PAGE_STANDARD) | keine — sauber von Produktion getrennt | `test-page.css:14-153` |
| UI-24 | Testharness-Chrome (App-Test) | `.fw-test-case`,`.kg-card` (Ghost-Emulation) | `Apps/prokrastinations-preis/app.test.html` | **nein — nur Testseite** | HTML (inline `<style>`) | Szenario+Erwartung+`.kg-card`-Wrapper+unverändertes `.fw-app` | — | — | nein | keine | Scout G |
| UI-25 | Standalone-Prototyp-eigene Primitiven | z. B. `.er-bon`,`.er-intro` (regulatorik-dashboard); eigene `--radius-*`/`--space-*`/`--color-*` (rollierende-sparplaene, weltkarte-etf-indizes) | je 1 Standalone-App | ja (produktiv als Einzelapp), **aber CI-fremd** | CSS (3× komplett eigenständig) | 3 unterschiedliche, nicht untereinander konsistente Systeme | je eigene Breakpoints | nicht geprüft (außerhalb Scope) | **nein — bewusste Übergangs-Divergenz (CI-POOL §10, E9/P20)** | Migrationsreihenfolge dieser 3 Prototypen relativ zu `prokrastinations-preis` festlegen (Teil von T1) | `etf-wahlurnen-rechner.html:10-27`, `msci-sparplan_v2.html:15-43`, `etf-index-map_v2.html:12-56` |

---

## 6. Strukturwerte und visuelle Grammatik im Bestand

Python-Stichprobe (Regex-Werteextraktion) auf den 7 zentralen Dateien: `Apps/prokrastinations-preis/app.css`, `Theme/assets/css/{screen.css,tokens.css}`, `tests/shared/test-page.css`, plus die 3 Standalone-Prototypen. Kein Vollhistogramm über alle 2330 Textdateien (siehe Scanner-Grenzen, Abschnitt 16) — repräsentative, belegte Stichprobe.

| Kategorie | Befund | Kennzeichnung |
|---|---|---|
| **Radius** | `prokrastinations-preis`: harte `4px` (4×, App-Buttons/KPI-Karten). `screen.css`: `0.5rem`/`0.75rem` (Tailwind-default-nah: entspricht `rounded-lg`/`rounded-xl`). `regulatorik-dashboard`: eigene `--r-sm/-md/-lg`. `rollierende-sparplaene`+`weltkarte-etf-indizes`: eigene `--radius-sm/-md/-lg/-xl`, Namensschema **imitiert Tailwind-Sprache, ist aber nicht an Tailwind-Config gebunden** | 3 parallele Radius-Vokabulare, keins davon ist die kanonische Tailwind-Skala aus dem CI-POOL-Kontrakt |
| **Shadow** | `screen.css`: `--shadow-soft`/`--shadow-hover` (kanonisch, CI-POOL §2 erlaubter Namensraum). Standalone-Prototypen: je eigene `--shadow-sm/-md`, eigene rohe `rgba(...)`-Werte, teils `var(--color-shadow)` mit `oklch()`-Farbraum (`msci-sparplan_v2.html`) | kanonisch vs. 2 weitere Sonderfälle |
| **Border** | Kanonisch: `--color-border` (`#E7ECEF`, `tokens.css`). Testharness: 13 von 15 `tests/engine/*.test.html`-Dateien tragen noch den **harten Legacy-Hex** `border: 1px solid #ddd` (direkt verifiziert, siehe F-01) — bereits als `TESTENV-1-FOLLOWUP-BORDER` gebacklogged | Sonderwert mit bekanntem Klärungsbedarf, **kein neuer Fund**, nur direkt bestätigt |
| **Spacing (gap/padding/margin)** | `prokrastinations-preis`: fast durchgehend `var(--fw-space-sm/-md, 0.5rem/1rem)` — **noch nicht auf Tailwind-Spacing migriert**, obwohl CI-POOL §7.6/§3 das explizit verlangt („kein `--fw-space-*` für allgemeine Gestaltung"). `screen.css`: rohe `rem`-Werte (`0.75rem`,`1.5rem`,`2rem`,`2.5rem`,`3rem`) — alle Tailwind-default-nah (`3`,`6`,`8`,`10`,`12` in Tailwinds 4er-Rem-Skala), aber nicht als Utilities, sondern hart in Custom-CSS. Standalone-Prototypen: je eigene `--space-*`-Skalen oder rohe `rem` | **F-02: `--fw-space-*` ist laut Kontrakt (§3) explizit verboten für allgemeine Gestaltung, ist aber in `app.css` aktuell noch produktiv im Einsatz** |
| **Typografie** | CI-Fonts (`Archivo Black`/`Source Sans Pro`) korrekt zentral in `tokens.css`; Standalone-Prototypen nutzen fremde Fonts (Satoshi, DM Sans, Instrument Serif) — CI-fremd | kanonisch (App+Engine) vs. Sonderwert (Standalone) |
| **Transitionen** | Card-to-Point (`1350ms`), Screen-3-Reveal (`800ms`), Hover-Lift (`0.3s`) — alle als benannte `--fw-*`-Custom-Properties, korrekt als „App-Mechanik" eingeordnet (CI-POOL §2 erlaubt das) | kanonisch nach Kontrakt-Regel, keine Migration nötig |

---

## 7. Responsive- und Dichtematrix

| Bereich | Breakpoints (real) | Mobile-first? | Tailwind-Default-Vergleich | Offene Fable-Frage |
|---|---|---|---|---|
| `prokrastinations-preis` App-CSS | `600px` (Journey-Button), `480px`/`481–1024px` (Rubikon-Position, App-Mechanik) | nein — `max-width`-Queries dominieren (Desktop-Basis, Mobile-Override) | weicht von Tailwinds `sm 640/md 768/lg 1024` ab; `481–1024px` ist eine App-eigene Sonderzone (kommentiert: „angelehnt an Tailwind md/lg", `app.css:378`) | Werden App-Breakpoints auf Tailwinds `sm/md/lg/xl/2xl`-Set vereinheitlicht, oder bleibt App-Mechanik (Rubikon-Position) bewusst außerhalb? |
| Chart-Engine DOM | Container Query `@container fw-chart`, Grenze `450px` (S vs. „Rest") | mobile-first im Sinne der S-Zone als Default-Override-Ziel | **keine explizite M/L-Trennung** auf DOM-Seite — nur Canvas-seitig (`FwTheme.js`: S<450/M<900/L≥900) gibt es eine 3-Zonen-Matrix | Soll die DOM-Seite die 3-Zonen-Matrix aus `FwTheme.js` übernehmen, oder bleibt die Engine bei 2 Zonen? |
| Standalone-Prototypen | je eigene, nicht harmonisierte Grenzen (nicht im Detail geprüft, außerhalb Kern-Scope) | unterschiedlich | unbekannt | Werden diese 3 Prototypen vor oder nach der App-Fabrik-Migration behandelt (T1-Reihenfolge)? |
| `prefers-reduced-motion` | 2× in `app.css` behandelt (Flight-Clone, KPI/Assumptions-Fade) | — | Tailwind hat `motion-reduce:`-Variant als direktes Äquivalent | 1:1 auf `motion-reduce:` übertragbar |

---

## 8. Chart-Engine-Grenzmatrix (DOM vs. Canvas)

| Bereich | DOM oder Canvas | Tailwind geeignet | Grund | aktueller Besitzer | spätere Schnittstellenfrage |
|---|---|---|---|---|---|
| Chart-Wrapper, Titel, Toolbar, Legende, BAN-Headline, Popover, Loading/Error-State | **DOM** | **ja** | reine HTML/CSS-Struktur, von `FwRenderer.js` per `createElement` gebaut | Chart-Engine (Layer 5/Face laut Architektur-Layer-Tabelle) | Wie viel DOM-Chrome wandert in generische Tailwind-Komponenten vs. bleibt Engine-Vertrag? |
| Container-Query-Layout (`@container fw-chart`) | **DOM** (steuert Layout) | ja, mit Einschränkung | Container Queries sind kein Tailwind-Utility-Konzept per se, aber Tailwind v4 unterstützt `@container`-Varianten nativ | Chart-Engine | Auf Tailwinds native Container-Query-Utilities umstellen oder Custom-CSS behalten? |
| Chart.js Dataset-/Scale-Konfiguration, Tooltip-Callbacks | **Canvas** (Chart.js-intern) | **nein** | Chart.js rendert selbst auf `<canvas>`, kein DOM | Chart-Engine Core/Strategies | keine — bleibt Engine-Vertrag |
| Plugin-Zeichenoperationen (`FwVerticalLinePlugin`, `CrosshairPlugin`: `ctx.stroke()`, `ctx.lineTo()`) | **Canvas** | **nein** | direkte Canvas-2D-Context-Operationen | Chart-Engine Plugins | keine |
| `FwTheme.js` Farb-/Font-Bridge | **Brücke** (liest DOM-CSS-Variablen, speist Canvas) | indirekt — nutzt bereits CI-Tokens, keine Utility-Klassen nötig | `getComputedStyle()` auf `--color-*`/`--font-*`, dann an Chart.js übergeben | Chart-Engine Core | keine Änderung nötig, funktioniert bereits token-basiert |
| A11y-Tabelle (Screenreader-Only) | **DOM** (aber `position:absolute;left:-9999px` statt Klasse) | ja | Tailwind `sr-only` ist funktionales Äquivalent | Chart-Engine | Auf `sr-only` vereinheitlichen? |

---

## 9. A11y-/Interaktionsmatrix

Nur real belegte Verträge (kein Screenreader-Test durchgeführt):

| Aspekt | App (`prokrastinations-preis`) | Chart-Engine | Lücke? |
|---|---|---|---|
| ARIA-Live-Region | `aria-live="polite"`, `aria-atomic="true"` (App), BAN-Headline `aria-live="polite"` (Engine) | vorhanden beidseitig | keine |
| Disclosure (`aria-expanded`/`aria-controls`) | vollständig (Collapsible) | n/a | keine |
| Fokus-Management | `tabIndex=-1` + `.focus()` bei Screen-/Stationswechsel | nicht dokumentiert für Popover (Fokus-Trap unklar) | **Lücke: Popover-Fokus-Trap nicht belegt** |
| Reduced Motion | `prefers-reduced-motion` konsequent behandelt (2×) | nicht geprüft (Engine-Animationen) | offen |
| Statuscodierung nie durch Farbe allein | CI-POOL §7.7 verlangt Icon+Text; App nutzt `role="status"`/`role="alert"` zusätzlich zu Text | Legende: Toggle nur visuell (`hidden-dataset`-Klasse), kein `aria-pressed` belegt | **Lücke: Chart-Legend-Toggle ohne dokumentiertes ARIA-Pressed-Äquivalent** |
| Slider-A11y | vollständig (`aria-valuemin/max/now/text`) | n/a | keine |
| Touch-Targets | nicht explizit vermessen | nicht explizit vermessen | nicht geprüft — keine Behauptung |

---

## 10. Konflikte, Altlasten und falsche Freunde

| ID | Fund | Einordnung | Quelle |
|---|---|---|---|
| **F-01** | 13 von 15 `tests/engine/*.test.html`-Dateien tragen noch `border: 1px solid #ddd` (Legacy-Hex, kein CI-Token) auf dem lokalen `.financial-chart-module`-Test-Override. `screen.css` (Produktion) selbst hat **kein** Border auf `.financial-chart-module`. | Testharness vs. Produktion — bereits als `TESTENV-1-FOLLOWUP-BORDER` gebacklogged, bewusst bis Tailwind-Arbeit zurückgestellt (Alberts Entscheidung 2026-07-11). Kein neuer Fund, direkt nachverifiziert. | `tests/engine/{bar-all,bar-ci,cadence-density,irregular-bar,irregular-line,line-ci,line-scenarios,line-short-series,minmax,pie-ci,security-gatekeeper,tooltip-context,tooltip}.test.html` |
| **F-02** | `Apps/prokrastinations-preis/app.css` nutzt weiterhin `--fw-space-sm`/`--fw-space-md` produktiv (7 Fundstellen) — der CI-POOL-Kontrakt §3 verbietet `--fw-space-*` explizit für „allgemeine Gestaltung" und verweist auf Tailwind-Spacing-Utilities als Ersatz. Der Kontrakt selbst kennzeichnet dies als bekannt: „`--fw-space-*` des Piloten löst sich in Tailwind-Spacing auf" (§7.6) — als **noch ausstehend**, nicht als Fehler. | Kanonischer Vertrag vs. Ist-Code — Migration ist vom Kontrakt selbst als offen markiert, kein Widerspruch, sondern dokumentierter Zwischenstand. | `app.css:38,44,51,59,67,85,92,...`; CI-POOL-Kontrakt §3,§7.6 |
| **F-03** | Die „Pilot-Migration" `AP-prokrast-17` gilt laut `BACKLOG-ARCHIV.md` als abgeschlossen (2026-07-09). Real enthält `Apps/prokrastinations-preis/{app.css,app.js,app.test.html}` jedoch **null** Tailwind-Utility-Klassen und keine Tailwind-Ladung — nur `fw-app__*`-BEM-Klassen. | Ist-Code vs. Kettenerwartung aus CI-POOL §9 (AP-17 sollte laut Migrationsreihenfolge auch das Gate „Tailwind-Verfügbarkeit im App-Laufzeitkontext prüfen" durchlaufen). Repo-Scan findet keinen Beleg, dass dieses Gate durchgeführt wurde. Interpretation: AP-17 hat nur den CSS-Custom-Property-Namensraum umbenannt (`--fw-color-*`→`--color-*`), **nicht** die Struktur auf Tailwind umgestellt — der Name „Pilot-Migration" deckt real weniger ab, als der Kontrakttext suggeriert. | `app.css` Kommentarzeile 2-6 (Namensmigration bestätigt Farbe/Font, nicht Struktur); CI-POOL-Kontrakt §9 |
| **F-04** | `01_DECISION_LOG.md` A-04 (🟢 ENTSCHIEDEN): „Kein Tailwind CDN in Produktion." Scheint auf ersten Blick der CI-POOL-Leitentscheidung „Wir arbeiten mit Tailwind" zu widersprechen. | **Kein echter Widerspruch**: A-04 verbietet die CDN-*Auslieferungsform*, nicht Tailwind selbst — konsistent mit T1 („CDN → lokaler Build"). Beide Quellen sind vereinbar, wenn „Tailwind ja, CDN nein" gelesen wird. | `01_DECISION_LOG.md:35-38`; BACKLOG.md T1-Zeile |
| **F-05** | 3 „Standalone-Demo"-Apps (`regulatorik-dashboard/etf-wahlurnen-rechner.html`, `rollierende-sparplaene/msci-sparplan_v2.html`, `weltkarte-etf-indizes/etf-index-map_v2.html`) haben je ein eigenes, komplett CI-fremdes Design-Token-System (eigene Farben, Radien, Schatten, Fonts wie Satoshi/DM Sans/Instrument Serif). | CI-POOL-Kontrakt §10 kennzeichnet dies bereits als „bewusste Übergangs-Divergenz" (E9, P20) — kein neuer Fund, aber hohe Relevanz für Fable: diese 3 Apps sind die zweitgrößte Baustelle nach der Haupt-App. | jeweilige `<style>`-Blöcke, siehe UI-25 |
| **F-06** | `fw-app-template.html` (Rohreferenz) zeigt eine vollständige `tailwind.config`, deren Farbnamen (`petrol.80`, `petrol.tint`, `petrol.30` usw.) exakt die in CI-POOL §3 **verbotenen** Namensmuster (Prozent-Stufennamen, Alpha-Pseudostufen) verwenden. | Historisch/Steinbruch — der Kontrakt selbst hat diese Konfiguration bereits verworfen (§3, §4.1: „volle Tailwind-Skalen 50–900" statt Prozentnamen). Für Fable wichtig: die Rohreferenz-Config ist **nicht** die Zielconfig, auch wenn sie strukturell die richtige Idee zeigt. | `fw-app-template.html:73-97` vs. CI-POOL §3/§4 |
| **F-07** | `Theme/assets/js/fw-janitor.js` erzeugt produktiv echte Tailwind-Utility-Klassen (`bg-petrol-tint`, `border-petrol-20`, `rounded-xl`, `p-6 md:p-8` u.a.) für Ghost-Redaktionsboxen — und verwendet dabei dieselben **verbotenen** Namensmuster wie F-06 (`-tint`, `-20`, `-30`). | Dies ist der einzige Ort im Repository, an dem Tailwind-Utility-Klassen tatsächlich live gerendert werden sollen — außerhalb des App-Fabrik-Scopes (Content-Design-System), aber technisch von derselben Tailwind-Instanz abhängig, falls eine gemeinsame Ladung existiert. Nicht Teil des Nutzerauftrags (Farben/Fonts werden nicht neu entschieden), aber als Randbefund für Fable/Albert relevant, da die alten `-tint`/`-20`-Klassennamen laut Kontrakt bereits als abzulösen gelten. | `fw-janitor.js:42-64`; CI-POOL-Kontrakt §3 |
| **F-08** | Kein `.hbs`-Ghost-Template und kein `Theme/.git` im Repository vorhanden (`Theme/` enthält nur `package.json`, `assets/`, `apps/`, leeres `partials/`). | Bereits im Kontrakt selbst als offener Punkt P18 dokumentiert: „Es existiert noch kein Ghost-Template und keine Live-Auslieferung im Repo." Direkt nachverifiziert (kein neuer Fund) — bedeutet: **ob und wie Tailwind auf der echten Website geladen wird, ist aus diesem Repo nicht feststellbar.** | eigene Verzeichnisprüfung `Theme/` |
| **F-09** | Chart-Legend-Toggle (`.fw-legend-item.hidden-dataset`) hat keinen dokumentierten `aria-pressed`- oder gleichwertigen ARIA-Zustand — nur visuelle Grayscale-Klasse. | Kein Tailwind-Thema im engeren Sinne, aber A11y-Lücke, die bei einer Tailwind-Überarbeitung des Chart-Chromes mitgelöst werden könnte (Randnotiz für Fable/Engine-Team). | `FwRenderer.js:350` (Scout E) |

---

## 11. Externe Forschung

Abrufdatum: 2026-07-12, via WebSearch (kein RESEARCH-GAP).

| ID | These | Quelle | Autorität | Relevanz für Finanzwesir-Apps | Grenze | Fable-Frage |
|---|---|---|---|---|---|---|
| **R-01** | Tailwinds Theme-Konfiguration ist vollständig optional-additiv: fehlende Werte fallen auf Framework-Defaults zurück; eigene Werte gehören unter `theme.extend`, nicht als Ersatz der Kern-Skala. | [Theme variables – Tailwind CSS](https://tailwindcss.com/docs/theme), [Adding custom styles – Tailwind CSS](https://tailwindcss.com/docs/adding-custom-styles) | primär (offizielle Doku) | Deckt sich exakt mit CI-POOL §4/§7.6: volle Default-Skalen behalten, nur Brand-Farben per `extend`. | Gilt nur, solange keine tiefen Struktur-Overrides (z. B. eigene Spacing-Skala) eingeführt werden — hier nicht der Fall. | Soll die künftige Tailwind-Config ausschließlich `extend` nutzen (keine Kern-Skalen-Overrides), wie es CI-POOL bereits verlangt? |
| **R-02** | Refactoring-UI-Doktrin (Wathan/Schoger): Trennung von Elementen bevorzugt in dieser Reihenfolge — Abstand vor Flächenton vor Schatten vor Border zuletzt; wenige, aber konsequent eingesetzte Schattenstufen (kleine Schatten für nahe Elemente wie Buttons, große diffuse Schatten für „erhobene" Elemente wie Modals). | [refactoringui.com](https://refactoringui.com/), [Buchzusammenfassung — Top 20 Key Points](https://medium.com/design-bootcamp/top-20-key-points-from-refactoring-ui-by-adam-wathan-steve-schoger-d81042ac9802) | sekundär (Sekundärquellen/Rezensionen des Originalbuchs; das Buch selbst ist kostenpflichtig und nicht per Web-Volltext einsehbar) | CI-POOL-Kontrakt §7.5 zitiert diese Doktrin bereits wörtlich („Abstand > Flächenton > Schatten > Border zuletzt") — die Recherche bestätigt, dass dies korrekt auf die Originalquelle zurückgeht. | Rezension-Paraphrasen, kein Original-Volltext-Zugriff — Kernaussage aber durch mehrere unabhängige Rezensionen konsistent bestätigt. | Keine neue Entscheidung nötig — bereits im Kontrakt verankert. Relevant nur als Bestätigung, dass F-01 (13 Testdateien mit hartem Border) genau der Anti-Pattern-Kategorie entspricht, die die Doktrin vermeiden will. |
| **R-03** | Tailwind ist standardmäßig mobile-first: unpräfixierte Utilities gelten für alle Breakpoints, `md:`-Präfixe wirken „ab dieser Breite aufwärts". Default-Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`. Eigene Breakpoints werden in `theme.screens` definiert, nicht daneben erfunden. | [Responsive design – Tailwind CSS](https://tailwindcss.com/docs/responsive-design), [Customizing Screens – Tailwind CSS](https://tailwindcss.com/docs/screens) | primär | Die App-eigenen Breakpoints (`600px`, `480px`, `481–1024px` in `app.css`, `450px`-Container-Query in der Engine) weichen **alle** von Tailwinds Default-Set ab. | Framework-Doku sagt nichts darüber, ob Container Queries (Engine-Ansatz) grundsätzlich vorzuziehen sind — das ist eine Architekturfrage, keine Tailwind-Doku-Aussage. | Werden App-interne Breakpoints (600/480/1024) auf Tailwinds Standardraster vereinheitlicht, oder bleiben sie als dokumentierte App-Mechanik-Ausnahme bestehen? |
| **R-04** | Headless UI (offizielles Tailwind-Labs-Projekt) liefert vollständig unstyled, aber A11y-fertige Komponenten für genau die Muster, die in `prokrastinations-preis` und der Chart-Engine bereits von Hand gebaut wurden: Disclosure (`aria-expanded`/`aria-controls`, Tastatur-Navigation automatisch), Dialog/Popover (Fokus-Falle, Escape-Handling, Backdrop). | [Headless UI – Disclosure](https://headlessui.com/react/disclosure), [Headless UI v1.0 – Tailwind CSS Blog](https://tailwindcss.com/blog/headless-ui-v1) | primär (offizielles Tailwind-Labs-Projekt) | UI-09 (Collapsible) und UI-19 (Popover) sind funktional deckungsgleich mit Headless-UI-Disclosure/Dialog — die App-eigenen Implementierungen erreichen bereits ähnliche A11y-Tiefe manuell. | Headless UI ist React/Vue-fokussiert; die Finanzwesir-Apps sind Vanilla-JS — eine direkte Bibliotheksübernahme ist nicht ohne Framework-Entscheidung möglich, nur das **Muster** (ARIA-Vertrag, Tastaturlogik) ist 1:1 übertragbar. | Wird das Headless-UI-*Interaktionsmuster* (nicht die Bibliothek) als Referenzvertrag für Disclosure/Modal in Vanilla-JS übernommen? |
| **R-05** | Tailwinds Utility-Scanner erkennt nur vollständige, im Quelltext wörtlich vorkommende Klassennamen; dynamisch zusammengesetzte Strings (`` `bg-${color}-500` ``) werden beim Purge/Build nicht erkannt und verschwinden im Produktions-CSS, sofern nicht per `safelist` explizit erhalten. | [Optimizing for Production – Tailwind CSS](https://v2.tailwindcss.com/docs/optimizing-for-production), [Understanding Tailwind CSS Safelist](https://franklam.hashnode.dev/understanding-tailwind-css-safelist-and-how-it-solves-purging-issues) | primär + etablierte Sekundärquelle | **Direkt relevant**: `fw-janitor.js` baut Klassen teils aus Template-Strings zusammen (`config.wrapperClass`, `config.iconBgClass` als vorgefertigte volle Strings — das ist bereits sicher). Für eine künftige App-Fabrik-Migration mit dynamisch pro-App generierten Klassen (z. B. datengetriebene Farbwahl in Charts) ist dies ein Kernrisiko. | Gilt nur für den *lokalen Build*-Fall (T1); solange CDN mit Runtime-Compiler läuft (aktuell nirgends produktiv der Fall), ist das Risiko inaktiv. | Muss die App-Fabrik-Migration von Anfang an „nur vollständige Klassenstrings, nie zusammengesetzt" als harte Regel für alle 25 Apps festschreiben (Build-Sicherheit vor lokalem T1-Build)? |
| **R-06** | Tailwind-eigene Karten-/Panel-Vorlagen (Tailwind UI „Application UI → Layout → Cards") unterscheiden Card (in sich geschlossener Inhalt, z. B. Produkt/Stat) von Panel (größerer Layoutabschnitt, z. B. Settings-Panel) als zwei getrennte Kompositionsebenen, nicht als Namensvarianten derselben Sache. | [Tailwind CSS Cards – Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/application-ui/layout/cards) | primär (offizielles Tailwind-Produkt), aber Blocks selbst sind kostenpflichtig — nur Konzeptbeschreibung frei zugänglich | Die App-eigenen `.fw-app__kpi-card` (Card) und `.fw-app__station-area` (eher Panel-artig, enthält mehrere Sub-Elemente) folgen bereits intuitiv dieser Trennung, ohne sie benannt zu haben. | Die konkreten Tailwind-UI-Blocks sind für Dashboard-/Admin-Kontexte designt — Finanzwesir-Apps sind Ghost-eingebettete Content-Apps, Übertragung von Dashboard-Chrome (Sidebars, Top-Nav) ist **nicht** automatisch passend (siehe Nutzerauftrag-Nuance). | Wird eine explizite Card-vs-Panel-Taxonomie für die App-Fabrik benannt, und welche der bestehenden Tailwind-UI-Card-Muster passen zu einer *einzelnen eingebetteten* App (nicht einem Multi-Card-Dashboard)? |

---

## 12. Anforderungen an eine gemeinsame Tailwind-Schnittstelle

Belegte Anforderungen (kein Design, nur Bedingungen), mit Herkunft:

| Anforderung | Herkunft | Betroffene Primitiven |
|---|---|---|
| App-Shell und Content-Boxen dürfen sich nicht gegenseitig leaken (Ghost-Artikel-Fließtext vs. eingebettete App-Instanz) | CI-POOL §0 (Rollentrennung), Nutzerauftrag (Ghost-eingebettete Apps, keine Dashboard-Chrome) | UI-01 |
| DOM-Chrome der Chart-Engine muss integrierbar sein, Canvas-Mechanik bleibt strikt getrennt | Abschnitt 8 (Grenzmatrix), Nutzerauftrag §9 | UI-05, UI-15 bis UI-19 |
| Struktur (Spacing/Radius/Shadow/Border) kommt aus Tailwind-Default-Skalen, kein Eigenbau-Namensraum daneben | CI-POOL §2, §3, §7.6 (bereits kanonisch entschieden) | UI-01 bis UI-11, UI-15 bis UI-19 |
| Farben/Fonts bleiben CI-Token-gesteuert (`--color-*`/`--font-*`), Tailwind referenziert sie über `extend`, erfindet keine eigenen Werte | CI-POOL §4, §5 | alle |
| Mehrfachinstanz-Fähigkeit (mehrere Apps/Charts auf einer Ghost-Seite) ohne globale ID-Kollision | bereits belegter Ist-Zustand (`data-fw-initialized`-Guard in `app.js:1265`, Scout C) | UI-01, UI-05 |
| Dynamische Klassen müssen build-sicher sein (keine zusammengesetzten Tailwind-Klassenstrings ohne Safelist) | R-05 | UI-22 (fw-janitor bereits sicher), künftige App-Migration |
| CDN heute (faktisch: fast nirgends in der App-Fabrik aktiv) und lokaler lokaler Build später (T1) dürfen keine zwei Markup-Verträge erzeugen | BACKLOG T1, CI-POOL §10 | gesamte App-Fabrik |
| App-spezifische Mechanik (Card-to-Point-Flug, Rubikon-Position) bleibt lokal, wird nicht zum allgemeinen Primitive verallgemeinert | Nutzerauftrag §8 (App-Mechanik ≠ Tailwind-Primitive) | UI-13, UI-14 |
| A11y- und Reduced-Motion-Verträge (bereits vorhanden in `prokrastinations-preis`) dürfen durch eine CSS-Umstellung nicht verloren gehen | Abschnitt 9, Nutzerauftrag Invarianten | UI-06, UI-09, UI-12, UI-13 |
| Verbotene Namensräume (`-tint`, Prozentstufen, `--fw-color-*`/`--fw-font-*`/`--fw-space-*` für allgemeine Gestaltung) bleiben verboten, auch im Content-System (F-07) | CI-POOL §3 | UI-22 |

---

## 13. Fable Decision Docket

| ID | Entscheidung | Warum jetzt? | belegter Ist-Zustand | nicht verhandelbare Leitplanken | reale Optionen | Trade-offs (Wirkung auf 25+ Apps) | Fable soll liefern | Nutzerentscheidung danach nötig? | betroffene Folge-APs |
|---|---|---|---|---|---|---|---|---|---|
| **D-01** | Wie sieht die App-Shell (`.fw-app`-Äquivalent) aus Tailwind-Utilities aus, und bleibt der Root-Container eine benannte Klasse oder ein reiner Utility-Verbund? | Betrifft jede künftige App-Migration als erstes | `.fw-app` heute: 1 Klasse, wenige Properties (`app.css:9-27`) | Ghost-Artikel darf nicht geleakt werden; Mehrfachinstanz-Fähigkeit erhalten (`data-fw-initialized`) | (a) benannte Komponentenklasse mit `@apply`, (b) reiner Utility-Verbund im HTML, (c) Hybrid (Klasse für Scoping, Utilities für Feindetails) | (a) besser lesbar/wartbar bei 25 Apps, aber `@apply`-Kritik (Tailwind-Team rät seit v3 eher ab); (b) maximale Konsistenz mit Tailwind-Philosophie, aber lange Klassenlisten in generiertem JS-Markup; (c) Kompromiss | konkrete Entscheidung + Beispielmarkup für 1 Referenz-App | ja | Vertrags-/Komponenten-Spec |
| **D-02** | Welche Hierarchie-Regel gilt verbindlich für Trennung von Elementen (Abstand/Flächenton/Schatten/Border) in der App-Fabrik? | F-01 zeigt akuten Verstoß (harter Border in 13 Testdateien) | CI-POOL §7.5 zitiert bereits „Abstand > Flächenton > Schatten > Border zuletzt" | Regel ist bereits kanonisch entschieden (R-02 bestätigt Quelle) | keine Optionen — nur Anwendungsdetails offen | — | konkrete Anwendungsbeispiele für Card/Panel/Chart-Container nach dieser Regel | nein (Grundsatz bereits entschieden), ja (für Anwendungsdetails) | Komponenten-Spec |
| **D-03** | Card- vs. Panel-Taxonomie: Wird zwischen in sich geschlossenem „Card"-Primitive (z. B. KPI-Karte) und größerem „Panel"-Container (z. B. Stationen-Bereich) explizit unterschieden? | UI-04/UI-08 zeigen bereits intuitiv unterschiedliche Muster ohne Namen | `.fw-app__kpi-card` (Card-artig) vs. `.fw-app__station-area` (Panel-artig, mehrere Sub-Elemente) | keine „Card-in-Card"-Verschachtelung (R-02/R-06) | (a) zwei benannte Ebenen mit Doku, (b) nur eine generische „Box"-Ebene | (a) klarer für 25 Apps mit unterschiedlichem Bedarf; (b) einfacher, aber Risiko diffuser Grenzen | Taxonomie-Definition + Zuordnungsregel | ja | Komponenten-Spec |
| **D-04** | Wie integriert sich `.fw-app__chart-section` (App-Wrapper) mit `.fw-chart-wrapper` (Engine-eigener Container), ohne doppelte Container/Border/Padding zu erzeugen? | UI-05 zeigt zwei unabhängige CSS-Systeme am selben DOM-Übergang | App: reiner Positionierungs-Wrapper (`app.css:118-123`); Engine: vollständiges eigenes Chrome (`FwRenderer.js:121`) | Chart-Engine-Verträge bleiben unangetastet (Nutzerauftrag §3.1) | (a) App-Wrapper bleibt unsichtbar (nur Position), Engine behält eigenes Chrome; (b) Engine-Chrome wird auf Tailwind umgestellt und App-Wrapper entfällt ganz | (a) minimal-invasiv, aber zwei CSS-Sprachen bleiben nebeneinander; (b) konsistenter, aber Engine-Team-Koordination nötig | Schnittstellenvertrag App↔Engine | ja | Engine-DOM-Chrome (separater Folge-AP) |
| **D-05** | KPI-/Stats-Muster: Wird `.fw-app__kpi-cards`/`-card` durch ein Tailwind-Stat-Grid-Pattern ersetzt, und gilt dasselbe Muster auch für die Chart-BAN-Headline (UI-18)? | Beide Primitiven lösen dasselbe Problem (Kennzahl hervorheben) mit zwei unabhängigen CSS-Lösungen | `app.css:55-81` vs. `FwRenderer.js:487-564` | A11y (`dl`-Semantik, `aria-live`) bleibt erhalten | (a) ein gemeinsames Stat-Pattern für App+Engine, (b) getrennt lassen (App=KPI, Engine=BAN sind semantisch verschieden: Endzustand vs. Live-Zahl) | (a) Konsistenz, aber Kopplung zwischen App- und Engine-Vertrag; (b) Unabhängigkeit, aber zwei visuelle Sprachen für „große Zahl" | Entscheidung + Begründung | ja | Komponenten-Spec, Engine-DOM-Chrome |
| **D-06** | Button-/CTA-Hierarchie: Werden `.fw-app__btn`, `--next`, `--prev`, `--journey`, `.fw-app__cta` sowie die Engine-eigenen `.fw-btn`/`.fw-btn-group` auf ein gemeinsames Tailwind-Button-Vokabular vereinheitlicht? | Zwei unabhängige Button-Systeme (App vs. Engine-Toolbar) heute | `app.css:157-187` vs. `FwRenderer.js:283` | „Genau ein CTA pro App, immer am Ende" (Rohreferenz-Konvention, `fw-app-template.html:43` — als Hinweis, nicht bindend) | (a) ein Button-Primitive-Set für App+Engine, (b) getrennt (App-Navigation vs. Chart-Controls sind funktional verschieden) | (a) Wiedererkennbarkeit; (b) Chart-Toolbar hat andere Dichte-Anforderungen (kompakter, Icon-lastiger) | Entscheidung + Variantenliste (primary/secondary/ghost/toolbar) | ja | Komponenten-Spec |
| **D-07** | Controls und mobile Stapelung: Wird die App-eigene `600px`/`480px`/`1024px`-Breakpoint-Logik auf Tailwinds Default-Set (`sm/md/lg`) umgestellt? | R-03 zeigt Abweichung von Tailwind-Konvention | `app.css:303-308,362-385` | Rubikon-Positionslogik (App-Mechanik, UI-14) bleibt inhaltlich unangetastet, nur die Trägerbreakpoints stehen zur Diskussion | (a) volle Umstellung auf `sm/md/lg`, (b) App-Mechanik behält Sonderbreakpoints, nur generische UI (Buttons, KPI) wechselt | (a) einheitlich für alle 25 Apps; (b) pragmatisch, vermeidet Rubikon-Nachmessungs-Kaskade (vgl. DS-FOLLOWUP-07) | Breakpoint-Vertrag für App-Fabrik | ja | Vertrags-Spec, ggf. Rubikon-Nachmessung |
| **D-08** | Spacing-Rhythmus: Wird die vertikale/horizontale Abstandslogik der App-Fabrik direkt aus Tailwinds `space-*`/`gap-*`/`p-*`-Skala bezogen, und wie wird `--fw-space-*` (F-02) konkret abgelöst? | CI-POOL §3/§7.6 verlangt das bereits, F-02 zeigt den noch offenen Ist-Zustand | `app.css` nutzt `--fw-space-sm/-md` an 7+ Stellen | kein Spacing-Eigenbau-Namensraum (§3) | (a) direkte 1:1-Ablösung durch Utility-Klassen im HTML, (b) `--fw-space-*` bleibt als Bridge-Variable bestehen, referenziert aber intern Tailwind-Werte | (a) sauberste Lösung, erfordert Markup-Änderungen in `app.js`; (b) weniger invasiv, aber löst den Namensraum-Verstoß nicht wirklich auf | konkreter Migrationsplan für `--fw-space-*` | ja | Pilotumsetzung |
| **D-09** | Radius-/Shadow-Auswahl: Welche konkreten Tailwind-Stufen (`rounded-md`/`-lg`/`-xl`, `shadow-sm`/`shadow`/`shadow-md`) werden für welches Primitive kanonisch, angesichts von 3 parallelen Radius-Vokabularen (Abschnitt 6)? | 3 unterschiedliche Radius-Systeme im Bestand (App: `4px` hart, 2 Standalone-Systeme: `--r-*`/`--radius-*`) | Abschnitt 6 | `--shadow-soft`/`--shadow-hover` bleiben als benannte CI-Zusatzstufen (§2) | (a) reine Tailwind-Defaults ohne Zusatzstufen, (b) Tailwind-Defaults + die 2 bestehenden benannten Shadow-Stufen als Ergänzung | (a) einfacher, verliert aber die bereits abgenommenen Soft/Hover-Stufen; (b) Kontinuität zum bestehenden CI-System | konkrete Radius-/Shadow-Zuordnungstabelle je Primitive | ja | Komponenten-Spec |
| **D-10** | Breakpoint-/Responsive-Vertrag der Chart-Engine: Wird die DOM-seitige Container-Query-Grenze (nur `450px`) um eine explizite M/L-Trennung ergänzt, analog zur bereits vorhandenen Canvas-seitigen 3-Zonen-Matrix in `FwTheme.js`? | Abschnitt 7 zeigt Inkonsistenz zwischen DOM (2 Zonen) und Canvas (3 Zonen) | `FwRenderer.js:451-463` vs. `FwTheme.js:184-200` | Container-Query-Ansatz (nicht Media-Query) bleibt Engine-Vertrag (Nutzerauftrag: Chart-Engine funktioniert, wird nicht neu gestaltet) | (a) dritte Container-Query-Stufe ergänzen, (b) 2 Zonen beibehalten (M/L visuell bereits ausreichend ähnlich) | (a) Konsistenz zur Canvas-Seite, mehr Pflegeaufwand; (b) einfacher, ggf. suboptimal bei mittleren Breiten | Empfehlung mit Begründung | ja, falls (a) | Engine-DOM-Chrome (separater Folge-AP, nicht dieses APs Scope) |
| **D-11** | Zustände Loading/Empty/Error: Wird ein gemeinsames Tailwind-Skeleton-/Spinner-/Alert-Vokabular für App (`data-fw-state`) und Engine (`.fw-loading-container`/`.fw-loader`) definiert? | Abschnitt 5 (UI-20) zeigt zwei unabhängige Muster für dasselbe Konzept | `app.css:29-52` vs. `FwRenderer.js:38-59` | `role="status"`/`role="alert"` (App-Seite bereits vorhanden) bleibt erhalten | (a) ein gemeinsames Muster, (b) getrennt (App-States sind grob/screenweit, Engine-States sind lokal im Chart-Container) | (a) Konsistenz; (b) pragmatischer Cut entlang bestehender Verantwortungsgrenze (App vs. Engine) | Entscheidung + A11y-Vertrag (inkl. Engine-Loading, das aktuell keinen `role` trägt) | ja | Komponenten-Spec, Engine-DOM-Chrome |
| **D-12** | Disclosure/Station-Story-Pattern: Wird das App-eigene Collapsible (UI-09) durch das Headless-UI-*Interaktionsmuster* (R-04) als Referenzvertrag ersetzt (nicht die Bibliothek, da Vanilla-JS)? | R-04 zeigt, dass das App-eigene Muster funktional bereits sehr nah an Headless-UI-Disclosure liegt | `app.css:245-264`, `app.js` Collapsible-Handler (Scout B) | Vanilla-JS bleibt (kein Framework-Wechsel, außerhalb Scope dieses APs) | (a) App-Muster als Referenzvertrag für alle 25 Apps kodifizieren, (b) nichts ändern (funktioniert bereits) | (a) Wiederverwendbarkeit für künftige Apps mit Disclosure-Bedarf; (b) kein Zusatzaufwand, aber keine Wiederverwendbarkeit dokumentiert | Entscheidung, ob ein Referenzvertrag-Dokument entsteht | nein (kann Fable direkt empfehlen) | Komponenten-Spec |
| **D-13** | Utility-Klassen vs. extrahierte Komponenten: Nutzt die App-Fabrik-Migration rohe Utility-Klassen direkt im (teils JS-generierten) Markup, oder werden wiederkehrende Kombinationen als benannte Komponentenklassen extrahiert (`@apply` oder Komponentenbibliothek)? | Grundsatzfrage, die D-01/D-03/D-06 durchzieht | 35+ eigene `fw-app__*`-Klassen heute, alle JS-generiert (Scout A/B) | keine zusätzliche parallele Design-Sprache neben Tailwind (CI-POOL Leitentscheidung) | (a) reine Utilities im generierten Markup, (b) extrahierte Komponentenklassen mit `@apply`, (c) JS-seitige Klassen-Konstanten (Utility-Strings als benannte JS-Konstanten, kein CSS-`@apply`) | (a) Tailwind-idiomatisch, aber lange Strings in `app.js`-Template-Code; (b) kürzer im JS, aber Tailwind-Team rät von `@apply` für Komponenten eher ab; (c) Mittelweg, hält Build-Sicherheit (volle Strings, kein dynamisches Zusammensetzen, vgl. R-05) | konkrete Entscheidung + 1 durchgängiges Beispiel (z. B. KPI-Karte) in allen 3 Varianten zum Vergleich | ja | Vertrags-Spec, Pilotumsetzung |
| **D-14** | JS-erzeugtes DOM und Build-Sicherheit: Welche Konvention verhindert, dass zukünftige App- oder Engine-Klassen dynamisch aus Variablen zusammengesetzt werden (R-05-Risiko), bevor der lokale Tailwind-Build (T1) kommt? | R-05 zeigt konkretes Build-Risiko; `fw-janitor.js` macht es heute bereits richtig (volle Strings) | `fw-janitor.js:42-64` (positives Gegenbeispiel), `app.js` (Scout B: alle `className =`-Zuweisungen sind heute volle String-Literale, kein Interpolations-Risiko gefunden) | keine dynamisch komponierten Tailwind-Klassennamen (harte Regel für T1-Sicherheit) | (a) explizite Coding-Konvention dokumentieren (+ Lint-Regel falls möglich), (b) erst bei T1 (Build-Umstellung) regeln | (a) verhindert Drift schon während der Migration; (b) Risiko wächst mit jeder neu migrierten App, falls Konvention erst spät kommt | verbindliche Konventionsregel für alle 25 Apps | nein (kann Fable direkt festlegen, Albert nur zur Kenntnis) | Vertrags-Spec |
| **D-15** | Trennung Testharness/Produktion: Bleibt die bestehende, bereits funktionierende Trennung (`fw-test-*`-Klassen vs. `fw-chart-*`/`fw-app__*`-Produktionsklassen, TEST_PAGE_STANDARD-Verbot von CDN-URLs) bei der Tailwind-Migration unverändert erhalten? | Grundsatzfrage, ob Migration die bestehende, funktionierende Trennung gefährdet | Abschnitt 5 (UI-23/UI-24), `TEST_PAGE_STANDARD.md §10` | Testseiten-Standard ist bereits kanonisch, wird nicht neu verhandelt (Nutzerauftrag: kein Antasten von Test-Code) | keine echten Optionen — Bestätigungsfrage, kein Entscheidungsbedarf | — | Bestätigung, dass Migration diese Trennung respektiert | nein | — |
| **D-16** | Umgang mit historischen Prototypen: Werden die 3 Standalone-Demo-Apps (UI-25) vor, während oder erst nach der Haupt-App-Fabrik-Migration auf das gemeinsame Tailwind-Fundament gehoben — oder dauerhaft als Rohreferenz/Archiv behandelt? | F-05, bereits im Kontrakt als „bewusste Übergangs-Divergenz" markiert, aber Reihenfolge nicht festgelegt | UI-25, CI-POOL §10 (Standalone-Demos-Zeile) | Werden „nicht archiviert, bleiben funktionsfähig im Ist-Zustand" bis T1 (bereits entschieden) | (a) nach der Haupt-App (prokrastinations-preis-Muster zuerst stabilisieren, dann übertragen), (b) parallel, (c) diese 3 werden dauerhaft nicht migriert (bewusster Sonderstatus) | (a) risikoärmer, sequenziell; (b) schneller, aber doppelte Baustelle; (c) spart Aufwand, aber inkonsistentes Erscheinungsbild bleibt dauerhaft | Reihenfolge-Empfehlung innerhalb T1 | ja | T1-Feinplanung |

---

## 14. Fable-Briefing zum direkten Weiterreichen

*(Eigenständig verständlich, ohne Repository-Zugriff nutzbar.)*

**Produkt- und Nutzungskontext:** Finanzwesir ist eine Personal-Finance-Publikation auf Ghost CMS. Die „App-Fabrik" umfasst 25 geplante interaktive Finanz-/Lern-/Rechner-Apps, die als eingebettete HTML-Cards in redaktionelle Ghost-Artikel eingebettet werden — **keine** eigenständige Dashboard-/Admin-Anwendung. Nur 1 App (`prokrastinations-preis`) ist heute vollständig gebaut und produktiv; sie besteht aus 4 sequenziellen „Screens" (Slider-Eingabe → Stationen-Zeitreise → KPI-Ergebnis → Zukunfts-Ausblick mit Chart), gerendert per Vanilla-JS in eine Ghost-HTML-Card. Eine gemeinsame Chart-Engine (Chart.js-basiert, eigenes DOM-Chrome + Canvas-Zeichnung) wird von dieser App und von 15 Engine-Testseiten genutzt.

**Nicht verhandelbare Entscheidungen (bereits kanonisch, nicht neu zu diskutieren):**
- Tailwind wird das strukturelle Fundament (Spacing/Radius/Border/Shadow) — bereits per Masterentscheidung beschlossen, nicht mehr offen.
- Farben und Fonts bleiben zentral CSS-Custom-Property-gesteuert (`tokens.css`), Tailwind referenziert sie, erfindet keine eigenen Werte.
- Kein Tailwind-CDN in Produktion — nur lokaler Build (Zeitpunkt: eigener Folge-AP „T1", nicht Teil dieser Fable-Runde).
- Volle Tailwind-Farbskalen `50`–`900` für die 3 Brand-Farben (Petrol/Gelb/Purpur), keine Prozentnamen, keine Alpha-Pseudostufen.
- Chart-Engine-Canvas-Mechanik (Chart.js-Konfiguration, Plugin-Zeichenoperationen) ist kein Tailwind-Thema und bleibt unangetastet.
- App-spezifische Mechanik (z. B. eine Kartenflug-Animation, Text-Overlay-Positionierung) bleibt lokale App-Logik, wird nicht zu einem allgemeinen Tailwind-Primitive verallgemeinert.

**Bereits vorhandene CI-Schicht:** 4 Brand-Farbleitern (Petrol/Gelb/Purpur mit vollen Tailwind-kompatiblen Stufen 50–900, Blau nur als Einzelwert), 2 CI-Fonts (Display + Body), 2 benannte Zusatz-Schattenstufen (`shadow-soft`/`shadow-hover`) — alles bereits final abgenommen und in einer einzigen `tokens.css` zentralisiert.

**App-/Engine-Struktur:** 25 App-Ordner, davon 1 real gebaut, 3 eigenständige HTML-Prototypen mit komplett CI-fremden Design-Systemen (bewusst als Übergangszustand akzeptiert), 21 reine Spec-Ordner ohne Code. Die Chart-Engine ist DOM+Canvas-hybrid: DOM-Chrome (Titel, Toolbar, Legende, große Kennzahl-Anzeige, Modal/Popover) ist Tailwind-fähig, Canvas-Zeichnung ist es nicht.

**Reale UI-Primitiven (Kernliste):** App-Shell, Screen-/Step-Container, Headline/Subline, KPI-Karten-Gruppe, Slider mit Label+Wert, Primär-/Sekundär-/CTA-Button, Story-/Stationen-Karte, Collapsible/Disclosure, Annahmen-Box, ARIA-Live-Region — auf App-Seite. Chart-Titel, Toolbar/Segmented-Buttons, Legende, große Kennzahl-Anzeige („BAN"), Modal/Popover, Loading-Spinner — auf Engine-Seite. Vollständige Tabelle mit Belegstellen: Abschnitt 5 dieses Dossiers.

**Hauptkonflikte:**
1. Die als „abgeschlossen" geführte Pilot-Migration der Haupt-App hat bisher nur Farbnamen umbenannt, nicht die Struktur auf Tailwind umgestellt — die App enthält heute null Tailwind-Utility-Klassen.
2. 13 von 15 Chart-Test-Seiten tragen noch einen hartcodierten Border-Wert statt des CI-Tokens (bereits bekannt, bewusst bis zur Tailwind-Arbeit zurückgestellt).
3. Drei Standalone-Demo-Apps haben je ein komplett eigenes, CI-fremdes Design-Vokabular.
4. Das einzige produktiv Tailwind-Utility-Klassen erzeugende Skript (Content-Redaktionsboxen) nutzt bereits als „verboten" markierte alte Namensmuster.
5. Ob/wo Tailwind im echten Ghost-Theme geladen wird, ist aus dem Code-Repository nicht feststellbar (Ghost-Template-Dateien liegen außerhalb dieses Repos).

**Forschungserkenntnisse (Kurzfassung):** Tailwind-Theme-Konfiguration ist additiv (nur `extend`, keine Kern-Overrides) — deckt sich mit dem bestehenden Kontrakt. Die zitierte Refactoring-UI-Trennungsregel („Abstand vor Flächenton vor Schatten vor Border") ist echt und bereits im Kontrakt verankert. Tailwind ist mobile-first mit Default-Breakpoints `640/768/1024/1280/1536px` — die App weicht davon mit eigenen `480/600/1024px`-Grenzen ab. Headless UI (offizielles Tailwind-Projekt) bietet für Disclosure/Modal exakt die Interaktionsmuster, die die App bereits manuell nachgebaut hat. Dynamisch zusammengesetzte Tailwind-Klassennamen sind ein reales Build-Risiko für den späteren lokalen Build — heute im Repo noch nicht beobachtet, aber als Konvention früh festzulegen.

**Decision Docket:** 16 priorisierte Entscheidungsfragen (D-01 bis D-16, Abschnitt 13) — u. a. App-Shell-Form, Card-vs-Panel-Taxonomie, App↔Chart-Container-Schnittstelle, KPI-/BAN-Vereinheitlichung, Button-Hierarchie, Breakpoint-Vertrag, Spacing-Migration von `--fw-space-*`, Radius-/Shadow-Zuordnung, Chart-DOM-Responsive-Zonen, Loading/Error-Vokabular, Disclosure-Referenzvertrag, Utility-vs-Komponenten-Strategie, Build-Sicherheits-Konvention, Testharness-Trennung (Bestätigungsfrage), Reihenfolge für die 3 Standalone-Prototypen.

**Ausdrücklich nicht zu behandeln:** keine neuen Farb-/Font-/Radius-/Schatten-Werte erfinden (bereits final entschieden); keine Chart.js-Canvas-Konfiguration; keine Entscheidung über lokalen Tailwind-Build-Mechanismus selbst (das ist T1, eigener späterer AP); keine Bewertung der App-Mechanik (Kartenflug, Rubikon-Positionierung) als Tailwind-Thema.

**Gewünschtes Ergebnis von Fable:** Für jede der 16 Entscheidungsfragen (D-01–D-16) eine konkrete Wahl mit kurzer Begründung, plus — falls möglich — ein durchgängiges Beispielmarkup für 1 Referenz-Primitive (Vorschlag: KPI-Karte, da sie sowohl App- als auch potenziell Engine-Seite betrifft, siehe D-05).

---

## 15. Empfohlene Folge-AP-Kette

Nur grobe Reihenfolge, keine Implementierungsdetails, keine ungefragte Aufblähung:

1. Fable-Entscheidungsrunde (dieses Dossier als Input, Ergebnis: Antworten zu D-01–D-16).
2. Vertrags-/Komponenten-Spec (kodifiziert Fables Entscheidungen als verbindliches Dokument, analog zu `CI-POOL-ROLLENKONTRAKT.md`).
3. Pilotumsetzung an `prokrastinations-preis` (echte Tailwind-Utility-Einführung, nicht nur Namensraum-Umbenennung wie bisher — löst F-02/F-03 auf).
4. Unabhängiger Claims-vs-Files-Review (frische Instanz, analog zum bereits etablierten Muster AP-prokrast-18).
5. Engine-DOM-Chrome-Migration (separater AP, da Chart-Engine-Team-Koordination und Regressionsfläche größer).
6. App-Pool-Rollout (die weiteren 3 Standalone-Prototypen + künftige Spec-only-Apps bei Bau).
7. Spätere lokale Tailwind-Produktion (T1 — bereits im BACKLOG, abhängig von CSS-6, nicht Gegenstand dieser Kette).

---

## 16. Evidenzanhang

**Verwendete Python-/Git-Befehle:**
- `git rev-parse --show-toplevel`, `git branch --show-current`, `git rev-parse --short HEAD`, `git status --short`, `git remote -v`
- Repo-weiter rekursiver Dateiscan (`os.walk`, 2525 Dateien gesehen, 2330 Textdateien durchsucht) mit Fundstellenkarte für 27 Suchbegriffe (Tailwind-Marker, CSS-Struktureigenschaften, bekannte Klassenpräfixe)
- App-Pool-Inventur (`os.walk` über `Apps/`, Klassifikation nach Dateityp-Vorhandensein)
- Regex-Werteextraktion für `border-radius`, `box-shadow`, `gap`, `padding`, `margin`, `border` auf 7 Kern-CSS-Dateien

**Relevante Counts:** 2525 Dateien gesamt, 2330 Textdateien durchsucht, 25 App-Ordner (1 produktiv, 3 Standalone-Prototypen, 21 Spec-only), 60 `cdn.tailwindcss.com`-Treffer in 39 Dateien (0 davon in aktivem Produktionscode), 13 von 15 Test-Engine-Seiten mit hartem `#ddd`-Border, 35+ eigene `fw-app__*`-Klassen in `prokrastinations-preis`.

**Suchbegriffe (Fundstellenkarte):** `tailwind`, `cdn.tailwindcss.com`, `@tailwindcss/browser`, `tailwind.config`, `@theme`, `@layer`, `@apply`, `class=`, `className`, `classList`, `box-shadow`, `border-radius`, `border:`, `gap:`, `padding:`, `margin:`, `@media`, `min-width`, `max-width`, `financial-chart-module`, `kg-card`, `fw-chart`, `fw-app`, `shadow-soft`, `shadow-hover`, `--fw-space-`, `--color-`, `--font-`.

**Bekannte Grenzen des Scanners:** Der Regex-Scan ist ein Fundstellen-Radar, kein vollständiger CSS-/JS-Parser — dynamische Template-Literale mit Klassennamen wurden dort, wo relevant (App-JS, `fw-janitor.js`), zusätzlich manuell gelesen, aber nicht jede JS-Datei im Repository wurde auf dynamische Klassenkomposition geprüft (außerhalb des Kern-Scopes dieses APs). Die Strukturwert-Häufigkeitstabelle (Abschnitt 6) ist eine Stichprobe auf 7 Kerndateien, kein Histogramm über alle 2330 Textdateien — für die Entscheidungsfragen ausreichend, da die 3 relevanten „Systeme" (App, Engine/Theme, Standalone-Prototypen) alle erfasst sind.

**Quellenlinks der Webrecherche (Abrufdatum 2026-07-12):**
- [Theme variables – Tailwind CSS](https://tailwindcss.com/docs/theme)
- [Adding custom styles – Tailwind CSS](https://tailwindcss.com/docs/adding-custom-styles)
- [Optimizing for Production – Tailwind CSS](https://v2.tailwindcss.com/docs/optimizing-for-production)
- [Understanding Tailwind CSS Safelist and How It Solves Purging Issues](https://franklam.hashnode.dev/understanding-tailwind-css-safelist-and-how-it-solves-purging-issues)
- [Responsive design – Tailwind CSS](https://tailwindcss.com/docs/responsive-design)
- [Customizing Screens – Tailwind CSS](https://tailwindcss.com/docs/screens)
- [Headless UI – Disclosure](https://headlessui.com/react/disclosure)
- [Headless UI v1.0 – Tailwind CSS Blog](https://tailwindcss.com/blog/headless-ui-v1)
- [Tailwind CSS Cards – Tailwind Plus](https://tailwindcss.com/plus/ui-blocks/application-ui/layout/cards)
- [refactoringui.com](https://refactoringui.com/)
- [Top 20 Key Points from Refactoring UI (Sekundärquelle/Rezension)](https://medium.com/design-bootcamp/top-20-key-points-from-refactoring-ui-by-adam-wathan-steve-schoger-d81042ac9802)

**Nicht geprüfte Bereiche (bewusst außerhalb Scope):** tatsächliche Ghost-`.hbs`-Template-Kette (nicht im Repo vorhanden), Browser-/Screenreader-Live-Test, vollständige Regex-Wertehistogramme über alle 2330 Textdateien, detaillierte Prüfung der 21 Spec-only-Apps (enthalten keinen Code), tiefergehende Analyse der 3 Standalone-Prototypen jenseits ihrer Token-Systeme.

---

**Nächster richtiger Schritt:** Ergebnis an steuerndes LLM zurückgeben und danach Fable-Prompt schneiden.
**Ausdrücklich nicht der nächste Schritt:** Tailwind implementieren.
