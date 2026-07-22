Stand: 2026-07-22 | Session: peer-review-ghost-app-css-architektur | Geändert von: Claude (Fable, unabhängiges Peer-Review, read-only)

# Peer Review — Ghost-App-CSS-Architektur

**Review-Paket:** `docs/steering/audits/GHOST_APP_CSS_ARCHITEKTUR_BUGREPORT_PEER_PAKET_V1.md`
**Modus:** read-only. Alle 22 Pflichtquellen aus Abschnitt 7 vollständig gelesen; zusätzlich read-only geprüft: `Theme/assets/css/screen.css` (Build-Artefakt), `Theme/default.hbs`, `Theme/post.hbs`, `Theme/page.hbs`, Verzeichnisinventar `Apps/prokrastinations-preis/`.
**Kennzeichnung:** [F] = nachweisbarer Fakt (am Code/Artefakt verifiziert), [S] = plausible Schlussfolgerung, [A] = offene Annahme mit Unsicherheitsangabe.

---

## Gesamturteil

**GO MIT AUFLAGEN**

Die Diagnose des Pakets ist im Kern korrekt und am Code verifiziert: nicht überführte Mechanik-CSS erklärt die Funktionssymptome 4–6 vollständig, die `.gh-content`-Regeln erklären die Symptome 2, 3 und 7, der Preflight-Verzicht erklärt Symptom 1. Die Zielarchitektur ist tragfähig, aber an drei Stellen zu korrigieren, bevor implementiert wird:

1. Der Kaskadenmechanismus ist im Paket unvollständig begründet (Spezifität statt Cascade Layers). Daraus folgt eine andere, kleinere Bauform der Host-Grenze (Auflage A2).
2. Die veraltete `@source`-Zeile ist kein Nebenbefund, sondern ein eigenständiger P1: Der nächste Tailwind-Build verliert sämtliche nur von der App-Runtime genutzten Utilities und bricht die Produktion still (Auflage A1).
3. Für die Mechanik-Auslieferung existiert eine kleinere Alternative zum vorgeschlagenen JS-Mechanikmodul (reiner CSS-Weg über den vorhandenen Build); beide sind sicherheitskonform, die Wahl liegt bei Albert (Auflage A3).

---

## Antworten auf die Prüffragen (Abschnitt 8)

### Architektur

**1. „Chart = App" vereinbar mit Specs und Runtime? — bestätigt (mit Präzisierung).**
[F] `MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md:10` („Ein Chart ist technisch eine App"), `01_DECISION_LOG.md:55` (A-05: Chart-Apps als App-Familie), `01_DECISION_LOG.md:191` (D-04: „sie ist in diesem Kontext ebenfalls eine App"). [F] Real existieren zwei getrennte Bootstrap-Einstiege: `Theme/assets/js/apps/index.js:8–10` (fw-app-Registry, enthält keinen Chart-Eintrag) und `Theme/default.hbs:27` vs. `Theme/post.hbs:51` (`fw-chart-engine/index.js`). [S] Die Gleichsetzung ist als Architekturbegriff tragfähig (eigene Card, eigener Datenpfad, eigener Rucksack, eigener Renderer) und erfordert keinen Code-Umbau; „App" bedeutet hier nicht „Eintrag in der fw-app-Registry". Kein Widerspruch zur älteren Formulierung „Infrastruktur" (A-05) — beide beschreiben dieselbe Realität aus zwei Blickwinkeln.

**2. Unterscheidung Chart-Plugin / App-Mechanik / Rucksack korrekt? — bestätigt.**
[F] Flug, KPI-Fade, Rubikon liegen ausschließlich in App-Runtime + `app.css` (`Theme/assets/js/apps/prokrastinations-preis.js:1013–1058`, `Apps/prokrastinations-preis/app.css:65–173`); Canvas-Plugins tragen keine App-Choreografie (`FwAnnotationPulsePlugin.js:8–9` „Kein Domain-State. Kein CSS."); `fwContext` bleibt Darstellungssemantik (KDR 9). [F] `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md:530` deklariert Flug/Rubikon/Reveal-Dauern als lokale Mechanik ohne Verallgemeinerungsanspruch.

**3. Ausreichende lokale Renderer-Grenze in `prokrastinations-preis.js`? — bestätigt, keine Vorab-Korrektur nötig.**
[F] Reine Berechnung (`marketTimeStrategy`, Z. 179–189) ist DOM-frei; `buildAppContext()` ist tief eingefroren (Z. 194–230); flüchtiger Screen-/Timer-/Fokus-Zustand lebt in Controller-Closures (Z. 414–419, 656–666); Chart-Zugriff läuft ausschließlich über den `renderFromData()`-Vertrag inkl. `chartSettled`/`anchorMeasurement` ohne Chart.js-Internals (Z. 687–710, 956–994). [S] Die `render…()`-Funktionen bilden eine fachlich ausreichende Renderer-Grenze; eine Klassen-Extraktion vor dem CSS-Fix wäre reine Umformung ohne Fehlerbezug.

**4. Globale `FwAppRenderer`-Abstraktion jetzt begründet? — widerlegt (= Vorratsarchitektur, wie vom Paket selbst vermutet).**
[F] Es existiert genau eine normale App in der Registry (`index.js:8–10`). [F] `01_DECISION_LOG.md:282` (Q-04: neue Komponente erst wenn ≥ 2 Apps sie brauchen); Paket Abschnitt 5 formuliert dieselbe Schwelle. [S] Vor der zweiten migrierten App gibt es keine belegte gemeinsame DOM-Primitive auf Renderer-Ebene.

### CSS, Kaskade und Build

**5. Erklärt die nicht überführte `app.css` die drei Funktionssymptome vollständig? — bestätigt.**
[F] Ghost lädt nur `css/screen.css` und `js/apps/index.js` (`Theme/default.hbs:8, 27`); kein Theme-Artefakt enthält die Mechanik-Selektoren — repositoryweite Suche nach `flight-clone|screen3-reveal|rubikon-text|kpi-slot` unter `Theme/` trifft ausschließlich die Runtime-JS-Datei, keine CSS-Datei. [F] Kausalketten am Code:
- Kartenflug: `flyCardToPoint()` hängt den Clone ein und aktiviert `--flight-active` (`prokrastinations-preis.js:1033, 1047–1049`); ohne `app.css:65–81` (position:absolute, Transition, Transform) ist der Clone ein statisches Element im Fluss und wird nach `getFlightDurationMs()+20 ms` entfernt — ohne CSS-Variable greift der 450-ms-Fallback (`prokrastinations-preis.js:1003`) statt der 1350 ms aus `app.css:20`. Exakt Symptom 4.
- KPI-Fade: `fw-app__screen3-reveal--visible` wird gesetzt (`prokrastinations-preis.js:813–819`), aber `app.css:157–166` (opacity 0 → 1, Transition) fehlt → hartes Erscheinen nach der Bridge-Phase. Symptom 5.
- Rubikon: `fw-app__rubikon-text` wird in den Wrapper gebaut (`prokrastinations-preis.js:584–631`), ohne `app.css:92–108` (absolute Positionierung im Zukunftsfeld) steht er als Blockelement unter dem Chart. Symptom 6.
[S] Randnotiz über die drei Symptome hinaus: Mit der Mechanik-CSS fehlen auch `.fw-app__screen-subline` (Typografie, `app.css:44–48`) und der 1350-ms-Flugschalter — beides gehört mit in den Auslieferungsumfang.

**6. Erklären die `.gh-content`-Regeln die Font-/Abstands-/CTA-Symptome? — bestätigt, aber mit korrigiertem Mechanismus (siehe Finding F-03).**
[F] `Theme/src/css/screen.source.css:21–23`: Tailwind-Theme und -Utilities werden in benannte Layer importiert (`@layer theme, utilities`); die `.gh-content`-Regeln (Z. 172–177 h1/h2, Z. 190–192 p, Z. 196–209 a) stehen außerhalb jedes Layers. [F] Im Build-Artefakt `Theme/assets/css/screen.css` existieren nur die Blöcke `@layer properties/theme/utilities`; die `.gh-content`-Regeln liegen unlayered. [S → zwingend] Nach CSS-Kaskadenregel gewinnen ungelayerte Autorenstile gegen gelayerte **unabhängig von Spezifität und Reihenfolge**. Konsequenz: `.gh-content a` schlägt `text-white no-underline` (Symptom 7), `.gh-content p` schlägt `m-0` (Symptom 3), `.gh-content h2` setzt `font-family` direkt und schlägt jede geerbte `font-body`-Angabe (Symptom 2) — und zwar selbst dann, wenn man den Utilities höhere Spezifität gäbe. Die Paket-Begründung „weil der Host-Selektor spezifischer ist" (Abschnitt 3.2) ist damit unvollständig; sie beschreibt den Nebeneffekt, nicht die entscheidende Ursache. Das ist implementierungsrelevant: **Kein Utility-basiertes Gegenmittel kann diese Leaks je gewinnen.** Die Host-Grenze muss entweder ungelayerte CSS sein oder — kleiner und robuster — die `.gh-content`-Regeln per `:not(.fw-app *)` vom App-Teilbaum ausnehmen (F-03).

**7. Preflight-Verzicht nachweisbar; Button-Basisrezept der kleinere Eingriff? — bestätigt (mit Erweiterung).**
[F] `screen.source.css:22–23` importiert nur `theme.css` und `utilities.css`; kein Preflight-Import im Quell- oder Build-Artefakt. [F] `FW_BUTTON_NEXT_CLASS`/`FW_BUTTON_JOURNEY_CLASS` (`prokrastinations-preis.js:42, 44`) enthalten weder `border-0` noch eine Font-Utility; nur `secondary` setzt `border border-border` (Z. 43). [S] Ohne Preflight behalten native Buttons ihren UA-Rahmen → Symptom 1. [S — Erweiterung] Native Buttons erben zusätzlich **keine Schriftfamilie**; ohne Preflight rendert der Button-Text in Ghost in der System-UI-Schrift, nicht in Source Sans Pro. Das ist ein bislang unberichtetes achtes Symptom derselben Klasse. Das gemeinsame Button-Basisrezept muss deshalb mindestens `border-0` **und** `font-body` neutralisieren (Fokusring bleibt über die vorhandenen `focus-visible:`-Utilities erhalten; Tailwind-Scan erfasst Literale weiter; kein Preflight nötig). Bestätigt: Das ist gegenüber globalem Preflight der deutlich kleinere Eingriff — Preflight würde ungeprüft Ghost-Editorial, hbs-Chrome und Karten treffen (Theme-Gesamtaudit, laut Leitplanke verboten).

**8. Statisches, idempotentes App-Mechanikmodul sicherheitskonform? — bestätigt (vereinbar), aber nicht die kleinste Lösung (siehe Frage 9).**
[F] Vorbild existiert: `FwRenderer._injectStyles()` mit ID-Guard (`FwRenderer.js:561–562`). [F] SEC-04/SEC-05 (`01_DECISION_LOG.md:400–437`) verbieten dynamische Import-/Script-/CSS-URLs aus Cards — ein statisch im Theme-Bundle mitgeliefertes Style-Literal verletzt nichts davon; `SECURITY-BASELINE.md` §6.10 (fw-app-Namespace, keine Styles aus Nutzdaten) ist einhaltbar. [S] Ein per JS injizierter `<style>` ist ungelayert und gewinnt damit korrekt gegen die Utilities-Layer — kaskadenseitig funktionsfähig.

**9. Kleinste Alternative? — Es gibt eine kleinere: Mechanik-CSS als reguläre Theme-CSS-Quelle über den vorhandenen Build.**
[S] Option B: Mechanik-CSS zieht als Datei ins Theme (z. B. `Theme/src/css/apps/prokrastinations-preis.css`) und wird per einer `@import`-Zeile in `screen.source.css` eingebunden — exakt der Mechanismus, mit dem bereits `tokens.css` eingebunden wird (`screen.source.css:20`; der Import überlebt den Build nachweislich, siehe `Theme/assets/css/screen.css` Zeile 2). Eigenschaften: kein neuer JS-Mechanismus, kein Timing, ausgeliefert im selben Artefakt, unlayered (gewinnt gegen Utilities dort, wo Mechanik das braucht), maschinell im Build-Artefakt prüfbar (grep), ein Deploy-Weg. Kosten: ~2–4 KB CSS pro App laden auf jeder Seite (bei 25 Apps grob 50–100 KB unminifiziert; nach Minify/Gzip unkritisch). Option A (JS-Modul analog `_injectStyles()`): lädt nur bei App-Nutzung, hält Mechanik neben der Runtime, kostet dafür einen neuen (kleinen) Injektionsmechanismus pro App und ist im Build-Artefakt nicht sichtbar. **Beide Optionen respektieren alle Leitplanken. Empfehlung des Reviews: Option B (Ockham — vorhandener Mechanismus statt neuem), Entscheidung liegt bei Albert.** In beiden Fällen: Die Kopie unter `Apps/{slug}/app.css` darf nicht zweite Wahrheit bleiben — `app.test.html:11` stellt auf die Theme-Quelle um (analog SEC-05-Runtime-Grenze).

**10. Zentraler `.fw-app`-Hostschutz ausreichend präzise? — bestätigt, mit korrigierter Bauform.**
[S] Die im Paket skizzierte Bridge aus **Gegenregeln** („schützt gegen Überschriften-/Absatz-/Link-Leaks") hat eine strukturelle Falle: Eine ungelayerte Gegenregel wie `.fw-app a { color:inherit; text-decoration:none }` schlägt auch die App-eigenen Utilities (`text-white` ist gelayert und verliert gegen die eigene Grenze) — der CTA bliebe falsch, nur anders. Kleinste präzise Form ist stattdessen die **Ausnahme an der Quelle**: die vier `.gh-content`-Regelgruppen in `screen.source.css` (Z. 172–177, 179–186, 190–192, 196–209) erhalten `:not(.fw-app *)` (z. B. `.gh-content p:not(.fw-app *)`). Wirkung: Ghost-Regeln greifen im App-Teilbaum gar nicht mehr; die App-Utilities stylen frei; Editorial-Content außerhalb `.fw-app` bleibt byte-identisch; der Chart-Host (`financial-chart-module`) wird nicht berührt (bislang kein belegter Leak — via Negativa: nicht mitverändern). `:not()` mit komplexem Selektor ist in allen Zielbrowsern seit Jahren verfügbar. [A — 90–95 %] Restunsicherheit: künftige `.gh-content`-Regeln müssen die Ausnahme mitführen; das gehört als Satz in den Theme-CSS-Kommentar und ins Gate (F-06).

**11. `.fw-app--{slug}` kleinster robuster Kapselungsweg? — bestätigt, mit kleinerer Umsetzung als im Paket skizziert.**
[F] Mechanik-Klassen wie `fw-app__kpi-slot` oder `fw-app__screen-subline` sind generisch benannt und werden bei App Nr. 2 kollidieren. [S] Kleinste Umsetzung: nicht der Bootstrapper vergibt die Wurzelklasse (das hieße Klassenbildung aus dem Slug — auch wenn whitelisted, unnötig), sondern jede App führt sie als Literal in ihrer eigenen Shell-Konstante: `FW_SHELL_CLASS = 'fw-app fw-app--prokrastinations-preis relative …'` (`prokrastinations-preis.js:21`). Das respektiert die Literalregel (Baukasten §2.2), braucht null Bootstrapper-Änderung und ist pro App genau eine Zeile. Mechanik-Selektoren scopen dann auf `.fw-app--{slug} .fw-app__…`. Akut (eine App) ist die Kollision theoretisch — als verbindliche Konvention ab jetzt trotzdem richtig, weil nachträgliches Scopen teurer wird.

**12. Veraltete `@source`-Zeile ein tatsächlicher Wiederholbarkeitsfehler? — bestätigt, und schwerer als im Paket eingestuft: P1.**
[F] `screen.source.css:30` referenziert `../../../Apps/prokrastinations-preis/app.js`; diese Datei existiert nicht mehr (Verzeichnisinventar `Apps/prokrastinations-preis/` enthält keine `app.js`; SEC-05). [F] Kein `@source` deckt `Theme/assets/js/apps/` ab (Z. 26–30). [F] Utilities, die ausschließlich die App-Runtime nutzt (`accent-primary`, `basis-36`, `rotate-180`, `grid-cols-2`, `min-w-[7ch]`, `w-fit`, `opacity-60` …), kommen in keiner anderen gescannten Quelle vor (repositoryweite Suche: einziger Treffer ist `Theme/assets/js/apps/prokrastinations-preis.js`) — und sind dennoch im aktuellen Build-Artefakt `Theme/assets/css/screen.css` enthalten. [S → zwingend] Das Artefakt stammt aus einem Build vor der Runtime-Verschiebung. **Der nächste kanonische Build entfernt alle diese Utilities und zerlegt das App-Layout in Ghost still und vollständig** — unabhängig vom hier behandelten Bugfix. Wahrscheinlichkeit > 95 %; einzige Unsicherheitsquelle wäre eine nicht im Repo sichtbare Build-Zusatzquelle. Ersatz (bestätigt wie vom Paket gefordert, als Ordner statt pro App): `@source "../../assets/js/apps";`

### Wiederverwendung und Größe

**13. Welche Teile des Prokrastinations-CSS sind gemeinsame Primitive, welche beweisbar lokal? — beantwortet.**
[F] Bereits als gemeinsame Primitive migriert (leben als `FW_*_CLASS`-Utilities in der Runtime, nicht mehr in `app.css`): Shell, Loading/Empty/Error-States, KPI-Karten, Slider-Field, Button-Familie/CTA, Stationen-Panel, Disclosure, Callout, sr-only, Chart-Slot, Screen-Flow (`prokrastinations-preis.js:21–87`). [F] Beweisbar lokal (Baukasten §11, `app.css`-Restbestand): Card-to-Point-Flug inkl. `--fw-card-to-point-flight-duration` und `--fw-flight-delta-*` (Z. 15–87), Screen-3-Reveal-Fade inkl. `--fw-screen3-reveal-fade-duration` (Z. 157–173), Rubikon-Overlay inkl. Sonderbreakpoints 480/1024 px (Z. 92–147), `.fw-app__screen-headline:focus` (Z. 40–42). [S] Grenzfall `.fw-app__screen-subline` (Z. 44–48): kein Mechanik-, sondern ein noch unmigrierter Typografie-Rest — Kandidat für Utilities im nächsten regulären Slice, bis dahin mit der Mechanik ausliefern (dokumentierte Übergangsschuld, F-08).

**14. Wird eine mehrfach genutzte Utility nur einmal erzeugt? — bestätigt (unter Voraussetzung von F-01).**
[F] Es gibt genau ein Build-Artefakt (`screen.css`), Tailwind dedupliziert Utilities über alle Quellen; die Chart-Chrome-Rezepte (`FW_CHROME_*`, `FwRenderer.js:32–58`) und App-Rezepte teilen sich denselben Utility-Pool. Voraussetzung ist die reparierte Quellenliste (Frage 12).

**15. Entsteht ein unnötiger globaler Wachstumspfad? — widerlegt (kein unnötiger Pfad), mit zwei Minimierungsregeln.**
[S] Das Muster wächst pro App um (a) einmal generierte Utilities (dedupliziert) und (b) einen kleinen Mechanik-Block — beides beschränkt und beabsichtigt. Minimierungsregeln: die `@source`-Quelle als **Ordner** führen (keine Zeile pro App, Frage 12); keine `FwAppRenderer`-/Registry-Vorratsstrukturen (Frage 4). Bei Option B wächst `screen.css` um die Mechanik aller Apps (~2–4 KB/App); wem das bei 25 Apps zu viel ist, wählt Option A — ein Grundsatzproblem ist es nicht.

### Testbarkeit

**16. Zwingende automatische Nachweise vs. unverzichtbare Browserprüfungen? — beantwortet.**
Automatisch (maschinell, im Folge-AP):
1. `@source`-Existenz-Gate: jede in `screen.source.css` referenzierte Quelle existiert im Repo (hätte F-01 gefangen).
2. Utility-Deckungs-Gate: jede Utility-Token-Menge aller `FW_*_CLASS`-Konstanten unter `Theme/assets/js/apps/*.js` ist im Build-Artefakt `screen.css` enthalten (Produktions-Pendant zur bestehenden `check-test-pages.py`-Manifest-Invariante; im Decision Log A-04 als „Produktions-Gate" bereits vorgesehen, aber ungebaut).
3. Mechanik-Paritäts-Gate: jede in `Theme/assets/js/apps/*.js` gesetzte Nicht-Tailwind-Klasse (`fw-app__*`) und jede gelesene `--fw-*`-Property ist in einer im Theme ausgelieferten CSS-Quelle definiert (hätte F-02 gefangen).
4. Grep: `.gh-content`-Regeln tragen die `:not(.fw-app *)`-Ausnahme.
Unverzichtbar manuell im lokalen Ghost (Browser, Albert): die sieben Symptome aus Paket-Abschnitt 2; Tastaturfokus auf allen Bedienelementen; Reduced Motion (Flug entfällt, KPI sofort); Viewports 375/768/1280; Editorial-Umgebung unverändert (Absatz vor/nach der Card). Begründung: Kaskaden-Endergebnisse und Bewegungschoreografie sind statisch nicht beweisbar.

**17. Fehlt ein Migrations-Gate? — bestätigt (es fehlte).**
[F] `app.test.html` bindet `app.css` direkt ein (Z. 11), lädt Tailwind über Play-CDN (Z. 12) und enthält keinen `.gh-content`-Kontext — die Testseite konnte keines der sieben Symptome zeigen. [A — 75–85 %] Das Play-CDN (`@tailwindcss/browser@4`) liefert Preflight mit; dann war auch Symptom 1 auf der Testseite strukturell unsichtbar. Unsicherheitsquelle: das CDN-Bundle-Verhalten ist im Repo nicht verifizierbar; Prüfschritt: Buttons auf `app.test.html` im Browser inspizieren (Rahmen ja/nein). Kleinster Gate-Satz (für `MIGRATIONSSTRATEGIE` §7a bzw. das DoD):
> „Eine App-Runtime gilt erst als ins Theme migriert, wenn (1) jede von ihr gesetzte Nicht-Tailwind-Klasse und jede von ihr gelesene `--fw-*`-Property in einer im Theme ausgelieferten CSS-Quelle definiert ist, (2) die Tailwind-`@source`-Liste die neue Runtime-Quelle abdeckt und ein frischer Build die App-Utilities nachweislich enthält, und (3) die sichtbare Abnahme in einer Ghost-nahen Umgebung (Artikelkontext, produktives `screen.css`, ohne Play-CDN) erfolgt ist."

---

## Findings

| ID | Priorität | Prüffrage | Befund | Beleg | Kleinste Korrektur |
|---|---|---|---|---|---|
| F-01 | **P1** | 12, 14 | Veraltete `@source`-Zeile zeigt auf gelöschte `Apps/prokrastinations-preis/app.js`; kein `@source` deckt die reale Runtime ab. Der nächste kanonische Build entfernt alle nur app-genutzten Utilities (`accent-primary`, `basis-36`, `min-w-[7ch]` …) und bricht das Ghost-Layout still — unabhängig vom Bugfix. Das aktuelle `screen.css` ist ein Alt-Build. | `Theme/src/css/screen.source.css:30`; Inventar `Apps/prokrastinations-preis/` (keine `app.js`); `Theme/assets/css/screen.css` Zeile 2 (Utilities noch enthalten); einziger Repo-Treffer für `accent-primary`/`basis-36`: `Theme/assets/js/apps/prokrastinations-preis.js` | Zeile 30 ersetzen durch `@source "../../assets/js/apps";` (Ordner, nicht pro App); danach Build + Deckungs-Gate. **Stop-Befund: bis dahin keinen Theme-CSS-Build deployen.** |
| F-02 | **P1** | 5, 8, 9 | Mechanik-CSS (`app.css`) wird in Ghost nicht ausgeliefert; Ghost lädt nur `screen.css` + `apps/index.js`. Erklärt Symptome 4–6 vollständig; zusätzlich fehlen Subline-Typografie und der 1350-ms-Flugschalter (450-ms-Fallback greift). | `Theme/default.hbs:8, 27`; `Apps/prokrastinations-preis/app.css:20, 65–173`; `Theme/assets/js/apps/prokrastinations-preis.js:1003, 1033, 813–819, 592–594`; Theme-weite Selektorsuche ohne CSS-Treffer | Mechanik-CSS ins Theme ausliefern — Option B (Datei `Theme/src/css/apps/{slug}.css` + eine `@import`-Zeile in `screen.source.css`, Empfehlung) oder Option A (statisches, idempotentes JS-Mechanikmodul analog `_injectStyles()`). Entscheidung Albert; `app.test.html:11` auf die Theme-Quelle umstellen (keine zweite Wahrheit). |
| F-03 | **P1** | 6, 10 | Kaskadenbegründung des Pakets unvollständig: Entscheidend ist, dass die `.gh-content`-Regeln **ungelayert** sind und Tailwind-Utilities **gelayert** — ungelayert schlägt gelayert unabhängig von Spezifität. Folge: Utility-Gegenmittel können nie gewinnen; eine Gegenregel-Bridge (`color:inherit` u. ä.) würde zudem die App-eigenen Utilities mit erschlagen. | `Theme/src/css/screen.source.css:21–23, 172–177, 190–192, 196–209`; Build-Artefakt: `@layer properties/theme/utilities`-Blöcke, `.gh-content` unlayered | Host-Grenze als **Ausnahme an der Quelle**: die vier `.gh-content`-Regelgruppen um `:not(.fw-app *)` ergänzen (z. B. `.gh-content p:not(.fw-app *)`). Kein Theme-JS-Bridge-Modul nötig; Editorial und Chart-Host unberührt. |
| F-04 | P2 | 7 | Button-Basisrezept muss mehr als den Rahmen neutralisieren: native Buttons erben keine Schriftfamilie — ohne Preflight rendert Button-Text in Ghost in System-UI-Schrift (unberichtetes achtes Symptom derselben Klasse). | `Theme/assets/js/apps/prokrastinations-preis.js:42–45` (keine `border-0`-/Font-Utility in primary/journey); `screen.source.css:22–23` (kein Preflight) | `border-0 font-body` in die Primary-/Journey-Rezepte (secondary: nur `font-body`, Rahmen ist dort gewollt); Manifest in `app.test.html` (Z. 84) mengengleich nachziehen. Kein Preflight. |
| F-05 | P2 | 17 | Test-Harness strukturell blind für alle sieben Symptome: Testseite lädt `app.css` direkt, nutzt Play-CDN (inkl. Preflight, [A 75–85 %]) und hat keinen `.gh-content`-Kontext. Die Abnahme „GRÜN auf app.test.html" beweist nichts über Ghost. | `Apps/prokrastinations-preis/app.test.html:9–12`; `TEST_PAGE_STANDARD.md` §6 („behauptet keine vollständige Simulation") | Ghost-nahe Abnahme als Pflichtschritt des Folge-AP dokumentieren (lokales Ghost, produktives `screen.css`, Artikelkontext); mittelfristig `tests/ghost/`-Seite gemäß Standard §3. Kein Umbau der bestehenden Testseite in diesem AP. |
| F-06 | P2 | 17 | Verbindlicher Migrations-Gate fehlte — genau deshalb konnte die Runtime ohne ihre sichtbare Fachmechanik ins Theme ziehen. | `MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md` §7a (regelt nur JS-Ablage); `TEST_PAGE_STANDARD.md` §12 (nur Struktur) | Gate-Satz (siehe Antwort 17) in `MIGRATIONSSTRATEGIE` §7a aufnehmen; maschinelle Gates 1–3 aus Antwort 16 im Folge-AP bauen. |
| F-07 | P3 | 11 | Wurzelklasse `.fw-app--{slug}`: sinnvolle Konvention, aber kleinste Form ist das Literal in der App-Shell-Konstante, nicht eine Bootstrapper-Generik (Literalregel §2.2, null Bootstrapper-Änderung). | `Theme/assets/js/apps/prokrastinations-preis.js:21`; Baukasten §2.2 | `FW_SHELL_CLASS` um das Literal `fw-app--prokrastinations-preis` erweitern; Mechanik-Selektoren beim Umzug (F-02) darauf scopen. |
| F-08 | P3 | 13 | Restschulden in `app.css`: `.fw-app__screen-subline` referenziert den aufgelösten Namensraum `--fw-space-md` (Fallback 1rem greift); Subline ist unmigrierter Typografie-Rest, keine Mechanik. | `Apps/prokrastinations-preis/app.css:47` | Beim Umzug (F-02) `var(--fw-space-md, 1rem)` durch `1rem` ersetzen; Subline-Migration auf Utilities als regulären Folge-Slice notieren (nicht Teil dieses Fixes). |

---

## Bestätigte Architekturentscheidungen

- Chart = App; die Chart-App wird von `prokrastinations-preis` ausschließlich über den `renderFromData()`-Vertrag aufgerufen — kein Umbau nötig (Fragen 1–3).
- Die Ursachendiagnose des Pakets: Mechanik-CSS-Lücke (Symptome 4–6), `.gh-content`-Leak (2, 3, 7), Preflight-Verzicht (1) — am Code vollständig verifiziert (Fragen 5–7).
- Kein globales Preflight ohne Theme-Gesamtaudit; das gemeinsame Button-Basisrezept ist der kleinere Eingriff (Frage 7).
- Ein statisches, idempotentes Mechanikmodul wäre sicherheitskonform mit SEC-04/SEC-05 (Frage 8) — es ist nur nicht die kleinste Option.
- Keine `FwAppRenderer`-Abstraktion vor der zweiten normalen App (Frage 4).
- `@source` als Ordnerquelle `Theme/assets/js/apps/`, nicht pro App (Frage 12).
- Ein Build, ein Utility-Pool, keine Duplikate (Frage 14); kein unnötiger Wachstumspfad (Frage 15).

## Widerlegte oder unsichere Annahmen

- **Widerlegt (wichtigste):** „`.gh-content` gewinnt, weil der Host-Selektor spezifischer ist" — der entscheidende Mechanismus ist die Layer-Trennung (unlayered schlägt layered). Eine als Gegenregeln gebaute App-Style-Bridge im Theme-JS würde deshalb die App-eigenen Utilities mit überschreiben; die Grenze gehört als `:not(.fw-app *)`-Ausnahme an die `.gh-content`-Regeln selbst (F-03).
- **Widerlegt:** Die veraltete `@source`-Zeile sei „kein unmittelbarer Grund" mit rein zukünftiger Wirkung — sie ist ein scharfgestellter P1: Der nächste Build zerstört das App-Layout in Produktion; das heutige Funktionieren beruht auf einem Alt-Artefakt (F-01).
- **Widerlegt:** Das Button-Problem sei mit Rahmen-Neutralisierung erledigt — die Schriftvererbung fehlt ebenfalls (F-04).
- **Unsicher [A 75–85 %]:** Play-CDN liefert Preflight auf der Testseite mit (erklärt, warum Symptom 1 im Test unsichtbar blieb). Prüfbar in zwei Minuten im Browser; ändert an den Auflagen nichts.
- **Unsicher [A ~90 %]:** Kein weiterer, hier nicht sichtbarer Build-Mechanismus speist `screen.css` (F-01-Schweregrad hängt daran; das Repo zeigt keinen).

## Minimaler Folge-AP

**Write-Scope (abschließend, nichts darüber hinaus):**
1. `Theme/src/css/screen.source.css`: (a) Zeile 30 ersetzen durch `@source "../../assets/js/apps";` (b) die vier `.gh-content`-Regelgruppen (h1/h2, h3–h5, p, a/a:hover) um `:not(.fw-app *)` ergänzen, mit Ein-Satz-Kommentar zur Fortführungspflicht.
2. Mechanik-Auslieferung nach Alberts Optionswahl: **B** — `Theme/src/css/apps/prokrastinations-preis.css` (Inhalt = heutige `app.css` inkl. Flug, Reveal, Rubikon, Subline, `:focus`-Regel; `--fw-space-md`-Referenz → `1rem`) plus eine `@import`-Zeile in `screen.source.css`; **oder A** — statisches, idempotentes Mechanikmodul in `Theme/assets/js/apps/` mit ID-Guard analog `_injectStyles()`. In beiden Fällen `Apps/prokrastinations-preis/app.test.html:11` auf die Theme-Quelle umstellen.
3. `Theme/assets/js/apps/prokrastinations-preis.js`: `border-0 font-body` in `FW_BUTTON_NEXT_CLASS`/`FW_BUTTON_JOURNEY_CLASS`, `font-body` in `FW_BUTTON_PREV_CLASS`; optional (P3) `fw-app--prokrastinations-preis` als Literal in `FW_SHELL_CLASS`. `app.test.html`-Manifest (Z. 84) mengengleich nachziehen.
4. Kanonischer Tailwind-Build; generiertes `screen.css` nicht von Hand bearbeiten.
5. `MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md` §7a: Gate-Satz aus Antwort 17 ergänzen.

**Explizite No-Go-Änderungen:** kein Tailwind-Preflight; keine Layer-Verschiebung der `.gh-content`-Regeln (Ghost-Core-CSS würde sonst global gewinnen — verdeckte Regressionfläche); kein `FwAppRenderer`; keine Änderung an Parser/Vault/Resolver/Registry/Bootstrapper/Chart-Engine/Plugins; keine Script-/CSS-URLs in Cards; kein zweites Deployment- oder Manifest-System; keine Änderung an Ghost-HTML-Cards.

**Maschinelle Nachweise:** die vier Gates aus Antwort 16 (mindestens als einmalige Grep-Protokolle im AP-Ergebnis; Ausbau von `tools/check-test-pages.py` um das Produktions-Deckungs-Gate ist zulässiger Teil des AP, aber kein neues System).

**Manuelle Browser-Abnahme (lokales Ghost, Albert):** alle sieben Symptome aus Paket-Abschnitt 2 behoben; Button-Schrift = Source Sans Pro; Tastaturfokus sichtbar (Buttons, Slider, Disclosure); Reduced Motion (kein Flug, KPI sofort, Ringe statisch); Viewports 375/768/1280; Editorial-Absätze vor/nach der Card unverändert; `financial-chart-module`-Bestandschart auf einer Artikelseite unverändert.

**Erfolgskriterium unverändert:** Paket-Abschnitt 10, Punkte 1–10.
