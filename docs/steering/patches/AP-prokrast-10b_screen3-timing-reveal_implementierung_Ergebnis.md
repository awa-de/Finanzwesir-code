> [!WARNING]
> FORENSISCHES ARTEFAKT — NICHT MASSGEBLICH
>
> Diese Datei dokumentiert den ersten, später verworfenen AP-10b-Zuschnitt
> „Screen-3 Timing-Reveal: Text → Chart → KPI".
>
> Dieser Stand wurde in derselben AP-10b-Session durch die spätere
> Nachsteuerung „Variante B++ — Screen-3-Eintritt als Kontinuitäts-Reveal"
> ersetzt.
>
> Maßgebliches AP-10b-Ergebnisprotokoll ist:
> `docs/steering/patches/AP-prokrast-10b_screen3-kontinuitaets-reveal_implementierung_Ergebnis.md`
>
> Der unten stehende Status „GRÜN" gilt ausschließlich für den damals gebauten,
> inzwischen verworfenen Zwischenstand. Er darf nicht als aktueller AP-10b-Status
> interpretiert werden.
>
> Diese Datei bleibt nur aus Forensik-/Chronikgründen erhalten.

# AP-prokrast-10b — Screen-3 Timing-Reveal Implementierung Ergebnis

## Status

GRÜN

## Kurzbefund

Der Screen-3-Timing-Reveal wurde gebaut: Text ist sofort sichtbar, Chart-Bereich und KPI-Karten starten `hidden`, werden über eine neue `revealScreen3()`-Funktion gestuft enthüllt (Chart nach 800 ms, KPI-Karten nach weiteren 800 ms) und faden per CSS-Opacity-Transition ein. Reduced Motion überspringt Timer und Fade vollständig — Endzustand erscheint sofort. Nur `app.js` und `app.css` geändert, keine Engine-/Plugin-/Spec-/QA-/Daten-Datei berührt. Der verbindliche Text ist unverändert und weiterhin exakt vorhanden. Browser-/DOM-Mini-QA wurde in dieser Session nicht durchgeführt (kein Live-Browser verfügbar) — als offen dokumentiert, empfohlen für Albert vor/mit AP-10c.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Implementierung): nur `.claude/learning/session-log.md` (M, bekannte `/start`-Geräuschkulisse) + `?? docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`
- `git diff --name-status` (vor Implementierung): `M .claude/learning/session-log.md`
- `git log --oneline -15`: HEAD `706b1fd` (AP-prokrast-09a-09d bereits committed) — Worktree sauber genug, um AP-10b isoliert zu bauen
- AP-10a-Protokoll: vorhanden (`docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`, Status GELB, kein Blocker)

## Grundlage aus AP-10a

- AP-10a-Protokoll: `docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`
- AP-10a-Status: GELB (kein Blocker)
- übernommener Istbefund: Screen 3 rendert Text, Chart und KPI-Karten synchron in `renderS3()`/`showScreen(3)` — kein Timing, keine Reduced-Motion-Prüfung, verbindlicher Text bereits exakt im Code.
- übernommene Empfehlung: Timer+hidden-Muster analog `revealScreen4()`, KPI-`<dl>` ohne fokussierbare Elemente reicht `hidden` ohne zusätzliches `aria-hidden`/`inert`, Reduced-Motion-Präzedenz aus APP_SPEC §16 (Stationenmarker: sofort, ohne Animation) auf Chart/KPI übertragen.
- in AP-10b fixierte Timing-/UX-Parameter (durch diesen Prompt vorgegeben, nicht neu verhandelt): 800 ms / 800 ms, Fade per CSS-Klasse, kein separater Stationenmarker-Beat (Chart inkl. Annotationen ist ein gemeinsamer Beat), Reduced Motion = sofortiger Endzustand ohne Fade/Timer.

## Gelesene Quellen

- Pflichtquellen: `docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`, `Apps/prokrastinations-preis/app.js` (vollständig, vor und nach Änderung), `Apps/prokrastinations-preis/app.css` (vollständig, vor und nach Änderung), `Apps/prokrastinations-preis/APP_SPEC.md` (§16-Bereich, aus AP-10a bereits bekannt), `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (Screen-3-Abschnitt, aus AP-10a bereits bekannt), `Apps/prokrastinations-preis/QA_TEST_CASES.md` (Gruppe E, aus AP-10a bereits bekannt) — nur zur Soll-/Regressionseinordnung, nicht geändert
- optional gelesene Quellen: `Apps/prokrastinations-preis/app.test.html` (Grep auf „Screen 3" — bestehende manuelle Testszenarien referenzieren Screen 3 funktional, nicht timingbezogen; kein Widerspruch zur neuen Reveal-Logik, Datei nicht geändert, da außerhalb des erlaubten Schreibzugriffs)
- nicht gelesen / nicht nötig: `Theme/assets/js/fw-chart-engine/**`, `LineChartStrategy.js` — kein neuer Engine-Aufruf, nur bestehende `renderFromData()`-Optionen wiederverwendet (unverändert gegenüber AP-10a-Befund); AP-07/08/09-Protokolldateien einzeln — Verträge bereits in AP-10a am realen Code verifiziert, keine neue Regressionsfrage in AP-10b aufgetaucht

## Geänderte Dateien

- Datei: `Apps/prokrastinations-preis/app.js`
  - Änderung: (1) `chartSection3`/`kpiContainerS3` erhalten bei Erstellung `hidden` als Ausgangszustand; (2) `renderS3()` auf reine Chart-Berechnung/-Rendering reduziert (KPI-Rendering entfernt); (3) neue Funktion `revealScreen3(rate)` mit verschachtelten `revealChart()`/`revealKpi()`-Schritten, Timer-State (`screen3ChartTimer`, `screen3KpiTimer`), Reveal-State (`screen3RevealedRate`, ersetzt `lastRenderedRateS3`), Reduced-Motion-Zweig; (4) `showScreen()`: Timer-Cleanup beim Verlassen von Screen 3 ergänzt, alter inline `renderS3`-Gate-Block durch `revealScreen3(currentRate)`-Aufruf ersetzt; (5) Slider-Input-Handler: `lastRenderedRateS3 = null` → `screen3RevealedRate = null`; (6) veralteten Kommentarverweis in `revealScreen4()` („analog lastRenderedRateS3") auf neuen Variablennamen korrigiert (direkte Folge der Umbenennung, kein Scope-Zuwachs)
  - Warum im Scope: einzige Datei, die laut AP-10b-Auftrag die Screen-3-lokale Reveal-Logik tragen darf
  - Risiko: gering — alle neuen Funktionen sind screen3-lokal, keine geteilte Funktion mit Screen 1/2/4 verändert, keine neuen Chart.js-Aufrufarten
  - nach Write vollständig wiedergelesen: ja (Zeilen 378-457, 596-720 erneut gelesen, `showScreen()`/Slider-Handler erneut gelesen)
- Datei: `Apps/prokrastinations-preis/app.css`
  - Änderung: neue CSS-Variable `--fw-screen3-reveal-fade-duration: 400ms` auf `.fw-app` (analog `--fw-card-to-point-flight-duration`); neuer, mit Attribut-Selektor auf Screen 3 eingegrenzter Block (`.fw-app__chart-section[data-fw-appchart="sparplan-s3"]`, `.fw-app__kpi-slot`) für Opacity-Fade + `.fw-app__screen3-reveal--visible`-Zielzustand; `@media (prefers-reduced-motion: reduce)` neutralisiert die Transition
  - Warum im Scope: sichtbarer Fade laut Auftrag nur per CSS-Klasse, screen-3-lokal benannt
  - Risiko: gering — Attribut-Selektor verhindert Kollision mit `.fw-app__chart-section` auf Screen 2/4; `.fw-app__kpi-slot` wird nirgendwo sonst verwendet
  - nach Write vollständig wiedergelesen: ja (neuer Block direkt nach Write eingesehen)
- Datei: `docs/steering/patches/AP-prokrast-10b_screen3-timing-reveal_implementierung_Ergebnis.md`
  - Änderung: dieses Ergebnisprotokoll neu angelegt
  - Warum im Scope: laut Auftrag Pflichtdatei für AP-10b
  - Risiko: keins
  - nach Write vollständig wiedergelesen: ja

## Nicht geändert

- APP_SPEC.md: unverändert
- Drehbuch: unverändert
- QA_TEST_CASES.md: unverändert
- stations.de.json: unverändert
- Theme/assets/data/**: unverändert
- Engine: unverändert
- Plugins: unverändert
- LineChartStrategy.js: unverändert
- Screen 1: unverändert (keine gemeinsame Funktion mit Screen 3 berührt)
- Screen 2 / Card-to-Point: unverändert (`renderJourneyChartOnly`/`renderJourneyCardOnly`/`chartEngine2` nicht angefasst)
- Screen 4 / Rubikon: unverändert (nur ein veralteter Kommentarverweis in `revealScreen4()` korrigiert, keine Verhaltensänderung)
- RubikonSymbolMarkers: unverändert (`renderScreen4Chart()`/`chartText`-Feature nicht angefasst)
- AP-09 Engine-Verträge: unverändert (renderMotion/chartSettled/anchorMeasurement-Contracts nicht erweitert, in Screen 3 gar nicht genutzt)
- package-/lockfiles: unverändert

## Screen-3-Reveal gegen Pflichtumfang

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| verbindlicher Text exakt | ja | `app.js:387,392` unverändert, Grep bestätigt je 1 Treffer |
| Text sofort sichtbar | ja | `h2S3`/`sublineS3` nie `hidden`, kein eigener Reveal-Zweig für Text |
| Chart nach 800 ms sichtbar/fadet ein | ja | `revealScreen3()` → `screen3ChartTimer = setTimeout(revealChart, 800)`, `revealChart()` entfernt `hidden`, setzt `fw-app__screen3-reveal--visible` |
| KPI-Karten nach weiteren 800 ms sichtbar/faden ein | ja | `revealChart()` → `screen3KpiTimer = setTimeout(() => revealKpi(ctx), 800)`, `revealKpi()` entfernt `hidden`, setzt `fw-app__screen3-reveal--visible` |
| Reihenfolge code-seitig testbar | ja | zwei verkettete, benannte Timer + zwei distinkte hidden-Zustände — per DevTools/Timing beobachtbar, analog Screen-4-Präzedenz |
| Reduced Motion sofortiger Endzustand ohne Animation | ja | `const reduced = prefersReducedMotion()`; bei `reduced === true` laufen `revealChart()`/`revealKpi()` synchron ohne `setTimeout`, Klasse wird ohne `requestAnimationFrame`-Verzögerung gesetzt, CSS-Transition per Media Query neutralisiert |
| A11y-/Fokuszustände konsistent | ja | `h2.focus()` unverändert in `showScreen()`; `a11yRegion`-Text wird weiterhin genau einmal pro Reveal gesetzt (jetzt am KPI-Reveal-Zeitpunkt statt am Chart-Zeitpunkt — bewusste Verschiebung, s. Risiken) |
| Wiederholtes Betreten robust | ja | `screen3RevealedRate === rate`-Kurzschluss überspringt Replay bei unverändertem Rate, analog `screen4RevealedRate` |
| Timer werden sauber gecleart | ja | `revealScreen3()` cleart eigene Timer zu Beginn; `showScreen()` cleart beide Timer bei `n !== 3` |
| Screen 1 nicht regressiert | ja | keine gemeinsame Funktion verändert |
| Screen 2 nicht regressiert | ja | `chartEngine2`, `renderJourneyChartOnly/-CardOnly` unverändert |
| Screen 4 nicht regressiert | ja | `chartEngine4`, `renderScreen4Chart`, `revealScreen4` verhaltensgleich (nur Kommentarkorrektur) |
| AP-07/TC-F05 nicht berührt | ja | `chartText`-Feature/RubikonSymbolMarkers nicht angefasst |
| AP-08/Card-to-Point nicht berührt | ja | `flyCardToPoint`, `journeyBtn`-Handler unverändert |
| AP-09 Engine-Verträge nicht ausgebaut | ja | keine neue `renderFromData()`-Option eingeführt, Screen 3 nutzt weiterhin nur `type`/`features`/`annotations` wie zuvor |

## Implementierungsdetails

- Screen-3-State/Timer: `screen3RevealedRate` (ersetzt `lastRenderedRateS3`), `screen3ChartTimer`, `screen3KpiTimer` — alle als `let` im selben Closure-Scope wie die bestehenden Screen-4-Timer deklariert (app.js:514-516)
- Initialzustand: `chartSection3`/`kpiContainerS3` erhalten `hidden` bereits bei Erstellung (app.js:398,403) — Text bleibt unhidden Teil des statischen Screen-3-Markups
- Chart-Reveal: `revealChart()` entfernt `hidden` von `chartSection3` **vor** dem `renderS3(rate)`-Aufruf, damit die ChartEngine beim Sizing reale Layout-Maße vorfindet (kein Rendern in einen `display:none`-Container); danach Fade-Klasse setzen (sofort bei Reduced Motion, sonst per `requestAnimationFrame`, analog `.fw-app__station-area--flight-clone`)
- KPI-Reveal: `revealKpi(ctx)` rendert die KPI-Cards zuerst in den bereits geleerten Container, entfernt dann `hidden`, setzt die Fade-Klasse, und setzt erst danach die `revealA11ySummary`-Ansage (zeitlich an den sichtbaren KPI-Reveal gekoppelt, nicht mehr an den Chart-Reveal — s. Risiken)
- Reduced-Motion-Pfad: `prefersReducedMotion()` einmalig zu Beginn von `revealScreen3()` geprüft; bei `true` laufen `revealChart()` und darin `revealKpi()` synchron ohne jeden `setTimeout`/`requestAnimationFrame` — Endzustand erscheint in einem Zug
- CSS-Klassen: `.fw-app__chart-section[data-fw-appchart="sparplan-s3"]`, `.fw-app__kpi-slot` (Basis: `opacity:0`, `transition: opacity var(--fw-screen3-reveal-fade-duration, 400ms) ease-in`); `.fw-app__screen3-reveal--visible` (Zielzustand `opacity:1`); Reduced-Motion-Media-Query setzt `transition: none`
- Cleanup bei Screenwechsel/Ratenänderung: `showScreen()` cleart beide Screen-3-Timer bei jedem `n !== 3`; Slider-`input`-Handler setzt `screen3RevealedRate = null`, wodurch der nächste Screen-3-Besuch zwingend einen vollen Reveal-Neustart auslöst (inkl. Zurücksetzen von `hidden` und Entfernen der Fade-Klasse zu Beginn von `revealScreen3()`)
- Warum architekturkonform: keine neue `renderFromData()`-Option, keine Chart.js-Internals, keine Engine-/Plugin-Datei berührt — reine Orchestrierung in `app.js` (Screen-Flow-Ebene, laut Architektur-Leitplanken erlaubt) plus lokale CSS-Klassen (`app.css`, laut Auftrag erlaubt)

## Reduced Motion / A11y

- DOM-Reihenfolge: unverändert — h2 → subline → chartSection3 → kpiContainerS3 → assumptionsS3 → navS3
- sichtbare Reihenfolge: jetzt gestuft (Text → 800 ms → Chart → 800 ms → KPI), vorher simultan
- semantische Reihenfolge: entspricht der sichtbaren Reihenfolge — `hidden` entfernt Chart/KPI vollständig aus dem Accessibility-Tree, solange ihr Timer nicht gefeuert hat; kein `aria-hidden`/`inert` nötig, da KPI-`<dl>` keine fokussierbaren Controls enthält (bestätigt bereits in AP-10a)
- Fokusverhalten: unverändert — `showScreen(3, true)` fokussiert weiterhin `h2S3` über die bestehende `focus`-Logik, unabhängig vom neuen Timing
- hidden-/aria-/inert-Strategie: ausschließlich natives `hidden` auf Container-Ebene, keine zusätzliche `aria-hidden`/`inert`-Schicht — konsistent mit AP-10a-Empfehlung
- Reduced-Motion-Endzustand: Text, Chart und KPI-Karten erscheinen bei `prefers-reduced-motion: reduce` synchron im finalen Zustand, keine 800-ms-Wartezeiten, keine Opacity-Transition (Media Query neutralisiert `transition`)
- Live-Region: keine neue Live-Region, keine zusätzliche Aktualisierung — weiterhin genau eine `revealA11ySummary`-Ansage pro Rate, jetzt zeitlich an den KPI-Reveal gekoppelt statt an den Chart-Reveal
- Screenreader-Annahmen: kein Screenreader-Volltest durchgeführt — nur statische Code-/DOM-Struktur-Prüfung. Keine Behauptung eines bestandenen Screenreader-Tests.

## Deterministische Checks

- `node --check Apps/prokrastinations-preis/app.js`: SYNTAX OK
- Grep verbindlicher Text: je 1 Treffer für beide Zeilen (`Jetzt erst sieht es einfach aus.` / `Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.`)
- Grep 800-ms-Timing: `screen3ChartTimer = setTimeout(revealChart, 800)` (app.js:670), `screen3KpiTimer = setTimeout(() => revealKpi(ctx), 800)` (app.js:666) — beide auffindbar
- Grep `prefersReducedMotion()` im Screen-3-Pfad: `const reduced = prefersReducedMotion();` in `revealScreen3()` (app.js:637)
- Grep hidden-/Reveal-Zustände: `chartSection3`/`kpiContainerS3` setzen und entfernen `hidden` korrekt gepaart (Erstellung → hidden; `revealScreen3()`-Reset → hidden; `revealChart()`/`revealKpi()` → hidden entfernt)
- Grep Chart.js-Internals in app.js: keine Treffer (`_fwGeometry`, `getDatasetMeta`, `chart.draw(` — keine neuen Vorkommen)
- Klassen-Konsistenz JS↔CSS: `fw-app__screen3-reveal--visible` kommt in beiden Dateien mit demselben Namen vor (app.js: 6×, app.css: 2× als Selektor)
- `git diff --name-status`: `M Apps/prokrastinations-preis/app.css`, `M Apps/prokrastinations-preis/app.js` (+ bekannte `M .claude/learning/session-log.md`-Geräuschkulisse)
- Engine-/Plugin-Diff: keiner (`git diff --name-only -- Theme/assets/js/fw-chart-engine/` liefert keine Treffer)
- Spec-/Drehbuch-/QA-Diff: keiner (APP_SPEC.md, Drehbuch, QA_TEST_CASES.md unverändert)
- Stations-/Daten-Diff: keiner (`stations.de.json`, `Theme/assets/data/**` unverändert)
- package-/lockfile-Diff: keiner
- Diff-Umfang: `app.js` 76 Zeilen hinzugefügt / 19 entfernt; `app.css` 27 Zeilen hinzugefügt / 0 entfernt

## Browser-/Runtime-QA

- durchgeführt: nein
- Screen 3 normal: nicht getestet (kein Live-Browser in dieser Session verfügbar)
- Screen 3 Reduced Motion: nicht getestet
- S/M/L: nicht getestet
- DOM-Mini-QA: nicht durchgeführt (nur statische Code-Analyse, kein aufgebautes DOM zur Laufzeit inspiziert)
- Auffälligkeiten: keine, da keine Laufzeitprüfung stattfand
- falls nicht durchgeführt, warum nicht: kein Browser-/DOM-Werkzeug in dieser Session verfügbar; laut CLAUDE.md-Testrealität testet Albert lokal im VSCode-Live-Server — empfohlen vor/mit AP-10c: Screen 1→2→3-Durchlauf normal und mit `prefers-reduced-motion: reduce`, auf S/M/L, inklusive Rückkehr zu Screen 3 nach Ratenänderung und nach unveränderter Rate

## Risiken

- Code: gering — Timer-/Hidden-Logik ist strukturell identisch zum bewährten `revealScreen4()`-Muster, zusätzlich um Reduced-Motion-Zweig erweitert
- UX: die `revealA11ySummary`-Ansage wurde bewusst vom Chart-Reveal-Zeitpunkt (800 ms) auf den KPI-Reveal-Zeitpunkt (1600 ms) verschoben, damit Screenreader-Nutzer die konkreten Euro-Zahlen nicht hören, bevor die zugehörigen KPI-Karten überhaupt sichtbar sind. Das ist eine bewusste Kleinentscheidung dieses AP (keine Spec-Anweisung dazu, kein Widerspruch zu APP_SPEC §14.1 „wird erst beim Übergang zu Screen 3 gesetzt" — beide Zeitpunkte liegen innerhalb von Screen 3), aber nicht explizit von Albert bestätigt
- CSS: gering — Attribut-Selektor grenzt sauber auf Screen 3 ein, geprüft gegen Screen-2-/Screen-4-Kollision
- A11y: gering — kein neues `aria-hidden`/`inert`, keine neue Live-Region
- Reduced Motion: gering — Pfad ist synchron und deterministisch, aber nicht in einem echten Browser mit aktivierter Systemeinstellung getestet
- Timing: die exakte gefühlte Wirkung der 800 ms/800 ms-Kette sowie der 400 ms-Fade-Dauer ist nicht browserseitig verifiziert
- Regression: gering, siehe Sollabgleich-Tabelle — alle geprüften Punkte erfüllt, aber ohne Browser-Bestätigung bleibt ein Rest-Risiko auf Interaktion mit echtem Rendering (z. B. Chart.js-Sizing-Verhalten beim Entfernen von `hidden` unmittelbar vor `renderFromData()`)

## Offene Punkte

- Code: keine
- UX: Verschiebung der `revealA11ySummary`-Ansage auf den KPI-Reveal-Zeitpunkt (statt Chart-Reveal) sollte von Albert bestätigt werden
- CSS: keine
- Test: QA_TEST_CASES.md Gruppe E könnte um einen expliziten Timing-Testfall ergänzt werden (kein QA-Dateizugriff in AP-10b — Entscheidung liegt außerhalb dieses AP)
- A11y: keine
- Reduced Motion: keine offenen Fragen, nur Browser-Bestätigung ausstehend
- Browser-QA: offen — S/M/L, normal + Reduced Motion, Wiedereintritt nach Ratenänderung und ohne Ratenänderung
- Screenreader: kein Volltest durchgeführt, optional nach Browser-QA
- Backlog: keine neuen Einträge nötig
- Masterentscheidung: keine — nur die oben genannte UX-Detailfrage zur A11y-Timing-Kopplung sollte Albert kurz bestätigen

## Empfehlung

- nächster interner AP: AP-prokrast-10c — Abschluss-QA Claims-vs-Files / Timing / Regression
- warum: Implementierung ist vollständig, scope-konform und deterministisch gegen die realen Dateien verifiziert; es fehlt ausschließlich die unabhängige, read-only Gegenprüfung plus Alberts Browser-Bestätigung
- ausdrücklich nicht: AP-prokrast-10d (Rücklaufkapsel) — verfrüht, solange AP-10c nicht gelaufen ist
