# AP-prokrast-10b — Screen-3 Kontinuitäts-Reveal Implementierung Ergebnis

## Status

GRÜN

## Kurzbefund

Der Screen-2→Screen-3-Übergang wurde von einem harten, gestuften Timing-Reveal (Text→Chart→KPI, alter AP-10b-Zuschnitt) auf einen Kontinuitäts-Reveal (Variante B++) umgebaut: Chart und Ergebnis-/Endlinie erscheinen beim Screen-3-Eintritt sofort, vollständig und still (kein hidden/Fade mehr auf dem Chart). Nur der Bereich unter dem Chart ist gestuft — ein neues, Screen-3-lokales Bridge-Element zeigt zunächst dieselbe „Station X von Y · Bekannt bis Z"-Zeile wie zuletzt auf Screen 2, bevor es nach 800ms durch KPI-Karten + Disclaimer ersetzt wird (Fade-Dauer 800ms, auf Alberts Wunsch von ursprünglich 400ms verlangsamt). Albert hat den neuen Ablauf live getestet und bestätigt: Kontinuität funktioniert, KPI-Fade-Timing ist nach Anpassung gut. Die blaue Ergebnislinie selbst bleibt technisch bedingt unanimiert (Plugin-Limitierung, mit Albert besprochen und akzeptiert — „So lassen"). Nur `app.js`/`app.css` geändert, keine Engine-/Plugin-/Spec-/QA-/Daten-Datei berührt, `progressEl` nicht verschoben, keine Headline/String-Änderung.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor dieser Nachsteuerung): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.css`, `M Apps/prokrastinations-preis/app.js` (aus dem verworfenen ersten AP-10b-Versuch), `?? docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-10b_screen3-timing-reveal_implementierung_Ergebnis.md`
- `git diff --name-status` (aktuell, nach dieser Umsetzung): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.css`, `M Apps/prokrastinations-preis/app.js`
- `git log --oneline -15`: HEAD weiterhin `706b1fd` (AP-prokrast-09a-09d bereits committed)
- Bereits vorhandene AP-10b-Artefakte im Worktree: `AP-prokrast-10b_screen3-timing-reveal_implementierung_Ergebnis.md` (alter, jetzt überholter Zuschnitt) und `AP-prokrast-10b_screen2-screen3-kontinuitaet_llm-review-kontext.md` (neutrales Kontext-Dokument zur Architektur-Fork-Klärung, in dieser Session vor der Nachsteuerung geschrieben). Beide Dateien wurden nicht gelöscht (kein Schreibzugriff auf Löschen außerhalb der erlaubten Dateien nötig/angefragt) — dieses neue Protokoll ist ab jetzt das maßgebliche AP-10b-Ergebnis.

## Grundlage aus AP-10a und neuer Nutzerentscheidung

- AP-10a-Protokoll: `docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`
- AP-10a-Status: GELB (kein Blocker)
- übernommener Istbefund: Screen 3 hatte ursprünglich keinerlei Timing-Reveal; der erste AP-10b-Versuch (Text→Chart→KPI, alle gestuft innerhalb von Screen 3) behob das Timing, verschärfte aber das eigentliche Problem — der Screen-2→3-Wechsel selbst wirkte wie ein psychologischer Neustart, weil Chart und KPI zusätzlich künstlich verzögert wurden.
- neue UX-Entscheidung (Nachsteuerung, Variante B++): 4-Screen-Schema bleibt, `showScreen(3, true)` bleibt der technische Übergang, aber Screen 3 muss beim Eintritt so vorbereitet sein, dass kein psychologischer Neustart entsteht — kein Screen-2-Ergebnismodus, kein Verschieben von `progressEl`, stattdessen ein Screen-3-lokales Bridge-Element.
- warum der alte AP-10b-Zuschnitt nicht genügte: er löste ein anderes Problem (Reihenfolge innerhalb von Screen 3) und verschärfte das eigentliche Problem (Chart startete `hidden`, blieb bis zu 1600ms lang „leer" sichtbar bzw. bei opacity:0 unsichtbar — von Albert während des Umbaus live als „Chart ist leer" gemeldet, bevor die Umstellung fertig war).
- in AP-10b fixierte Timing-/UX-Parameter: Bridge-Haltephase 800ms (kein expliziter Wert vorgegeben, aber Hauskonvention aus Screen-4-Beat übernommen); KPI-/Disclaimer-Fade ursprünglich 400ms, auf Alberts expliziten Wunsch nach Live-Test auf 800ms verlangsamt; Reduced Motion = sofortiger Endzustand, Bridge nie sichtbar.

## Mini-Anamnese Ergebnisübergang

- Klickpfad „Ergebnis ansehen": `journeyBtn`-Click-Handler (app.js, Screen 2) — bei `isLast === true` ruft er unverändert `showScreen(3, true)` auf (kein Architekturbruch, wie in der Nachsteuerung vorgegeben).
- Endscreen vor Klick: Screen 2, letzte (synthetische) Station — `chartSection2`/`chartEngine2` zeigt zu diesem Zeitpunkt bereits die **vollständige** Depotwert-Linie (Enddatum der letzten Station = Enddatum der gesamten Datenreihe), aber ohne vertikale Endlinie und ohne KPI-Karten. `progressEl` zeigt „Station 8 von 8 · Bekannt bis [Monat]".
- Ergebniszustand nach Klick: Screen 3 — eigene, feste Headline/Subline, eigener Chart-Container (`chartSection3`/`chartEngine3`), eigener KPI-Slot, eigene AssumptionsBox.
- obere Texte: `h2S3`/`sublineS3` — unverändert, immer sichtbar, kein eigener Reveal-Beat (bestätigt: „Headline/Subline oberhalb des Charts bleiben sichtbar und stabil").
- Chart: rendert jetzt synchron und sofort beim Screen-3-Eintritt, inklusive Ergebnis-/Endlinie, mit `renderMotion:{mode:'instant'}` — keine Kurslinien-Neuaufbauanimation, kein leerer Zwischenframe (kein separates Warm-up nötig, s. Implementierungsdetails).
- Ergebnis-/Endlinie: real `FwVerticalLinePlugin` über `features.verticalLine:'last'` (bestätigt am Code — kein anderer Name). Zeichnet statisch bei jedem `afterDraw` an der aktuellen X-Position, keine eigene Animationsfähigkeit.
- Stationszeile: real `progressEl` auf Screen 2 (`fw-app__journey-progress`) — wird NICHT verschoben. Neues, eigenständiges Screen-3-Bridge-Element (`bridgeS3`, gleiche CSS-Klasse `fw-app__journey-progress` für optische Konsistenz) zeigt beim Screen-3-Eintritt denselben, frisch berechneten Text.
- KPI-Karten: `renderKpiCards(kpiContainerS3, ctx)` — bestehender Screen-3-Pfad, unverändert in der Implementierung, nur zeitlich verschoben (jetzt Teil der Bridge→Ergebnis-Ablösung statt eines eigenen Timing-Beats).
- Disclaimer: `assumptionsS3` — bereits vorhandener Screen-3-Text, identisch zum im Auftrag zitierten Disclaimer-Text (keine neue Texterstellung nötig).
- minimaler Implementierungsweg: (1) Chart+Endlinie von Anfang an rendern, kein Chart-Timing mehr; (2) ein neues Bridge-Element mit gemeinsamer Formel `formatStationProgress()` (aus Screen 2 extrahiert); (3) ein einziger Timer (800ms) zwischen Bridge-Anzeige und KPI-/Disclaimer-Reveal.

## Gelesene Quellen

- Pflichtquellen: `docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`, `Apps/prokrastinations-preis/app.js` (vollständig, vor/während/nach den Änderungen mehrfach wiedergelesen), `Apps/prokrastinations-preis/app.css` (vollständig), `Apps/prokrastinations-preis/APP_SPEC.md`/`drehbuch_prokrastinationspreis_app.md`/`QA_TEST_CASES.md` (bereits aus AP-10a bekannt, zur Regressionseinordnung erneut herangezogen, nicht geändert)
- optional gelesene Quellen (read-only, zur Klärung der Mini-Anamnese-Fragen 7-9): `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (vollständig) — bestätigt: `.plugins` wird nur beim allerersten `new Chart()`-Aufruf gelesen, nie im Update-Pfad; `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` (vollständig, 27 Zeilen) — bestätigt: reiner statischer `afterDraw`-Draw, keine Animationsfähigkeit; `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (Ausschnitt, `setupStructure`-Signatur) — zur Einordnung der Warm-up-Frage
- nicht gelesen / nicht nötig: `FwAnchorMeasurementPlugin.js`, `FwChartTextPlugin.js`, `LineChartStrategy.js` — für diesen Umbau nicht regressionsrelevant (keine Berührung); AP-07/08/09-Protokolldateien einzeln — Verträge bereits in AP-10a/vorherigem AP-10b-Durchgang am realen Code verifiziert

## Geänderte Dateien

- Datei: `Apps/prokrastinations-preis/app.js`
  - Änderung: (1) `chartSection3` verliert das `hidden`-Startattribut (Chart erscheint sofort); (2) neues Screen-3-lokales Bridge-Element `bridgeS3` (eigene `<p>`, Klassen `fw-app__journey-progress fw-app__screen3-bridge`, startet `hidden`); (3) `assumptionsS3` erhält neu ein `hidden`-Startattribut; (4) neue Helper-Funktion `formatStationProgress(stationIdx)`, extrahiert aus `renderJourneyCardOnly()` (dort jetzt per Aufruf genutzt statt inline berechnet); (5) `renderS3()` bekommt `renderMotion:{mode:'instant'}` (verhindert erneutes Einschwingen der bereits sichtbaren Kurslinie); (6) `revealScreen3()` komplett neu geschrieben: kein Chart-Timing mehr, ein einziger Timer (`screen3BridgeTimer`, 800ms) zwischen Bridge-Anzeige und KPI-/Disclaimer-Reveal, Reduced-Motion-Zweig ohne sichtbare Bridge-Zwischenstufe; (7) State-Variablen `screen3ChartTimer`/`screen3KpiTimer` durch einzelnes `screen3BridgeTimer` ersetzt; (8) `showScreen()`-Timer-Cleanup-Block entsprechend angepasst
  - Warum im Scope: einzige Datei, die laut Auftrag die Screen-3-lokale Reveal-Logik tragen darf
  - Risiko: gering — alle Änderungen bleiben screen3-lokal, Screen 2 (`progressEl`, `chartEngine2`, `journeyBtn`-Handler) strukturell unverändert (nur die interne Berechnungsformel wurde in eine gemeinsame Funktion ausgelagert, das Ergebnis ist identisch)
  - nach Write vollständig wiedergelesen: ja (Zeilen 378-427, 578-708 nach jeder Änderung erneut gelesen)
- Datei: `Apps/prokrastinations-preis/app.css`
  - Änderung: Opacity-Fade-Regel für `.fw-app__chart-section[data-fw-appchart="sparplan-s3"]` entfernt (Chart braucht keinen Fade mehr); `.fw-app__assumptions` in die bestehende Fade-Gruppe mit `.fw-app__kpi-slot` aufgenommen; zugehörige Reduced-Motion-Media-Query entsprechend angepasst; `--fw-screen3-reveal-fade-duration` von 400ms auf 800ms erhöht (Albert-Nachtrag nach Live-Test)
  - Warum im Scope: sichtbarer Fade nur per CSS-Klasse, screen-3-lokal benannt, keine Engine-/Chart.js-Klassen berührt
  - Risiko: gering
  - nach Write vollständig wiedergelesen: ja
- Datei: `docs/steering/patches/AP-prokrast-10b_screen3-kontinuitaets-reveal_implementierung_Ergebnis.md`
  - Änderung: dieses Ergebnisprotokoll neu angelegt
  - Warum im Scope: laut Auftrag Pflichtdatei für diesen AP-10b-Zuschnitt
  - Risiko: keins
  - nach Write vollständig wiedergelesen: ja

## Nicht geändert

- APP_SPEC.md: unverändert
- Drehbuch: unverändert
- QA_TEST_CASES.md: unverändert
- stations.de.json: unverändert
- Theme/assets/data/**: unverändert
- Engine: unverändert (`ChartEngine.js` nur read-only gelesen zur Klärung der Plugin-/Warm-up-Fragen)
- Plugins: unverändert (`FwVerticalLinePlugin.js` nur read-only gelesen)
- LineChartStrategy.js: unverändert (nicht gelesen, nicht nötig)
- Screen 1: unverändert
- Screen 2 / Card-to-Point: strukturell unverändert — `progressEl` bleibt exakt an seiner Stelle und Funktion; einzige Berührung ist die Extraktion von `formatStationProgress()`, die die vorher inline berechnete Formel 1:1 abbildet (kein Verhaltensunterschied)
- Screen 4 / Rubikon: unverändert
- RubikonSymbolMarkers: unverändert
- AP-09 Engine-Verträge: unverändert (renderMotion/chartSettled/anchorMeasurement nicht erweitert; `renderMotion:{mode:'instant'}` ist Wiederverwendung einer bereits bestehenden, additiven Option)
- package-/lockfiles: unverändert

## Kontinuitäts-Reveal gegen Pflichtumfang

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| Klick auf Ergebnis führt nicht zu psychologischem Alles-weg-Reset | ja | Chart+Endlinie sofort vollständig sichtbar, Bridge-Text ersetzt sofort die Screen-2-Zeile — kein Leerzustand |
| oberer Textbereich bleibt stabil | ja | `h2S3`/`sublineS3` unverändert, kein eigener Reveal-Beat |
| Chartcontainer bleibt stabil | ja | `chartSection3` hat kein `hidden`/Fade mehr, rendert synchron mit Screen-3-Eintritt |
| Ergebnis-/Endlinie erscheint dezent | teilweise — technisch nicht animierbar, mit Albert besprochen und akzeptiert | `FwVerticalLinePlugin` zeichnet statisch, keine Animationsfähigkeit (verifiziert am Plugin-Code); Albert-Entscheidung: „So lassen" |
| Stationszeile verschwindet erst danach | ja | `bridgeS3` bleibt 800ms sichtbar, danach `hidden` |
| KPI-Karten erscheinen erst danach | ja | `kpiContainerS3` startet hidden, wird erst in `revealResult()` nach dem 800ms-Timer befüllt und sichtbar |
| Disclaimer erscheint mit KPI-/Resultatbereich | ja | `assumptionsS3` teilt denselben Reveal-Zeitpunkt und dieselbe Fade-Klasse wie `kpiContainerS3` |
| Reduced Motion sofortiger Endzustand ohne Animation | ja | `reduced`-Zweig in `revealScreen3()`: kein Timer, Bridge bleibt hidden, KPI/Disclaimer sofort sichtbar |
| A11y-/Fokuszustände konsistent | ja | `h2.focus()` unverändert; `a11yRegion`-Ansage bleibt genau einmal pro Reveal, jetzt am KPI-/Disclaimer-Zeitpunkt |
| Wiederholtes Betreten robust | ja | `screen3RevealedRate === rate`-Kurzschluss überspringt Replay, analog Screen 4 |
| Timer werden sauber gecleart | ja | `revealScreen3()` cleart eigenen Timer zu Beginn; `showScreen()` cleart ihn bei `n !== 3` |
| Screen 1 nicht regressiert | ja | keine Berührung |
| Screen 2 nicht regressiert | ja | nur Formel-Extraktion, Verhalten identisch |
| Screen 4 nicht regressiert | ja | keine Berührung |
| AP-07/TC-F05 nicht berührt | ja | `chartText`/RubikonSymbolMarkers nicht angefasst |
| AP-08/Card-to-Point nicht berührt | ja | `flyCardToPoint`, `journeyBtn`-Kernlogik unverändert |
| AP-09 Engine-Verträge nicht ausgebaut | ja | nur bestehende `renderMotion`-Option wiederverwendet |

## Implementierungsdetails

- State/Timer: `screen3RevealedRate` (Rate-Gate, ersetzt alten Namen), `screen3BridgeTimer` (einziger Timer, 800ms Bridge-Haltephase)
- Initialzustand: `chartSection3` sichtbar/ungehindert von Anfang an (kein `hidden`); `bridgeS3`, `kpiContainerS3`, `assumptionsS3` starten `hidden`
- Ergebnis-/Endlinie: Teil des einzigen `renderS3()`-Aufrufs (`features.verticalLine:'last'`, bestehende Option), kein zweiter Render-Aufruf, kein Toggle nach Erstkonstruktion (technisch unmöglich, s. Deterministische Checks/ChartEngine-Fund)
- unterer Bereich: `bridgeS3` wird bei jedem Reveal frisch mit `formatStationProgress(activeStationIndex)` befüllt, dann nach 800ms durch `kpiContainerS3`+`assumptionsS3` ersetzt
- KPI-/Disclaimer-Reveal: `renderKpiCards()` unverändert übernommen, `hidden` entfernt, Fade-Klasse `fw-app__screen3-reveal--visible` per `requestAnimationFrame` gesetzt (Reduced Motion: sofort ohne rAF)
- Reduced-Motion-Pfad: `bridgeS3` bleibt durchgängig `hidden` (kein Zwischenzustand sichtbar), `revealResult()` läuft synchron ohne Timer
- CSS-Klassen: `.fw-app__kpi-slot`, `.fw-app__assumptions` (Basis `opacity:0`, Transition über `--fw-screen3-reveal-fade-duration`, jetzt 800ms); `.fw-app__screen3-reveal--visible` (Zielzustand `opacity:1`); Reduced-Motion-Media-Query neutralisiert die Transition
- Cleanup bei Screenwechsel/Ratenänderung: `showScreen()` cleart `screen3BridgeTimer` bei jedem `n !== 3`; Slider-Handler setzt `screen3RevealedRate = null`
- Warum architekturkonform: keine neue `renderFromData()`-Option, keine Chart.js-Internals, keine Engine-/Plugin-Datei geändert — reine App-Orchestrierung (`app.js`) plus lokale CSS-Klassen (`app.css`)

## Reduced Motion / A11y

- DOM-Reihenfolge: h2 → subline → chartSection3 → bridgeS3 → kpiContainerS3 → assumptionsS3 → navS3 (unverändert zur bisherigen Struktur, nur `bridgeS3` neu eingefügt)
- sichtbare Reihenfolge: Chart+Endlinie sofort, Bridge sofort, dann (nach 800ms) Bridge weg / KPI+Disclaimer da
- semantische Reihenfolge: entspricht der sichtbaren — `hidden` entfernt Elemente vollständig aus dem Accessibility-Tree, solange ihr Zeitpunkt nicht erreicht ist
- Fokusverhalten: unverändert — `showScreen(3, true)` fokussiert weiterhin `h2S3`
- hidden-/aria-/inert-Strategie: ausschließlich natives `hidden`, keine zusätzliche `aria-hidden`/`inert`-Schicht (KPI-`<dl>` und Disclaimer-`<aside>` enthalten keine fokussierbaren Controls)
- Reduced-Motion-Endzustand: Bridge nie sichtbar, KPI+Disclaimer sofort im Endzustand, keine Wartezeit
- Live-Region: keine neue Live-Region, weiterhin genau eine `revealA11ySummary`-Ansage pro Rate, jetzt am KPI-/Disclaimer-Reveal-Zeitpunkt
- Screenreader-Annahmen: kein Screenreader-Volltest durchgeführt — nur Code-/Struktur-Prüfung und Alberts informeller Live-Test (visuell/Timing-Fokus, kein Screenreader)

## Deterministische Checks

- `node --check Apps/prokrastinations-preis/app.js`: SYNTAX OK
- Grep Klickpfad: `journeyBtn`-Click-Handler ruft bei `isLast` weiterhin unverändert `showScreen(3, true)` auf
- Grep Ergebnis-/Endlinie: `features: { ..., verticalLine: 'last' }` in `renderS3()` — realer, bestätigter Optionsname, keine Erfindung
- Grep Stationszeile: `bridgeS3`/`formatStationProgress` an 8 Fundstellen, konsistent verdrahtet (Erstellung, Aufruf in `renderJourneyCardOnly()`, zwei Aufrufe in `revealScreen3()`)
- Grep KPI-/Disclaimer-Reveal: `kpiContainerS3`/`assumptionsS3` je einmal `hidden` gesetzt (Reset) und einmal entfernt (Reveal), Fade-Klasse konsistent
- Grep `prefersReducedMotion()` im Ergebnis-Pfad: `const reduced = prefersReducedMotion();` in `revealScreen3()`
- Grep Timer-Cleanup: `screen3BridgeTimer` wird zu Beginn von `revealScreen3()` und in `showScreen()` bei `n !== 3` gecleart
- Grep Chart.js-Internals in app.js: keine Treffer (`_fwGeometry`, `chart._`, `getDatasetMeta` — keine Vorkommen)
- Grep alte Timer-Variablen (`screen3ChartTimer`/`screen3KpiTimer`): keine Treffer mehr (vollständig ersetzt)
- `git diff --name-status`: `M Apps/prokrastinations-preis/app.css`, `M Apps/prokrastinations-preis/app.js` (+ bekannte `M .claude/learning/session-log.md`-Geräuschkulisse)
- Engine-/Plugin-Diff: keiner
- Spec-/Drehbuch-/QA-Diff: keiner
- Stations-/Daten-Diff: keiner
- package-/lockfile-Diff: keiner
- Diff-Umfang: `app.js` 120 Zeilen hinzugefügt / 27 entfernt (kumulativ über beide AP-10b-Durchgänge dieser Session); `app.css` 31 Zeilen hinzugefügt / 0 entfernt
- alle bestehenden Strings unverändert: bestätigt — verbindlicher Screen-3-Text (`h2S3`/`sublineS3`), Disclaimer-Text (`assumptionsS3`), KPI-Labels (`renderKpiCards()`) alle wortidentisch zum Ausgangszustand

## Browser-/Runtime-QA

- durchgeführt: teilweise — Albert hat live getestet (Hot-Reload während der Umsetzung)
- Normaler Motion-Pfad: von Albert bestätigt — Kontinuität funktioniert („Jetzt ist es gut"), KPI-Fade-Timing nach Anpassung auf 800ms bestätigt gut
- Reduced-Motion-Pfad: nicht von Albert getestet, nur code-seitig geprüft
- S/M/L: nicht systematisch getestet
- DOM-Mini-QA: nicht durchgeführt
- Auffälligkeiten: während des Umbaus (vor Fertigstellung) meldete Albert „Chart ist leer" — das war der alte, alte Zwischenstand (Chart startete `hidden`/opacity:0, Reveal-Klasse griff nicht zuverlässig) und ist durch die vollständige Umstellung (kein `hidden`/Fade mehr auf dem Chart) behoben; nach Fertigstellung meldete Albert keine leeren/fehlerhaften Chart-Zustände mehr
- falls nicht vollständig durchgeführt: Reduced-Motion-Pfad und S/M/L-Breiten sind noch offen — empfohlen für AP-10c oder eine gezielte manuelle Nachprüfung durch Albert

## Risiken

- Code: gering — Mechanik ist einfacher als der verworfene erste Zuschnitt (ein Timer statt zwei, kein Chart-Fade mehr)
- UX: die Ergebnis-/Endlinie ist nicht animierbar (Plugin-Limitierung) — mit Albert besprochen und explizit als „so lassen" akzeptiert, kein offener Punkt mehr
- CSS: gering — Selektoren sauber auf Screen 3 begrenzt (`.fw-app__kpi-slot`, `.fw-app__assumptions` werden nirgendwo sonst verwendet)
- A11y: gering — kein neues `aria-hidden`/`inert`, keine neue Live-Region
- Reduced Motion: code-seitig korrekt, aber nicht browserseitig mit aktivierter Systemeinstellung getestet
- Timing: 800ms Bridge-Haltephase ist ein Erfahrungswert (Screen-4-Konvention übernommen), nicht einzeln von Albert bestätigt (nur die KPI-Fade-Dauer wurde explizit nachjustiert)
- Regression: gering — Screen 2 strukturell unverändert, nur eine bereits vorher identische Formel wurde in eine Funktion ausgelagert

## Offene Punkte

- Code: keine
- UX: keine (Ergebnislinie-Frage geklärt: „so lassen")
- CSS: keine
- Test: QA_TEST_CASES.md könnte um einen Testfall für den Kontinuitäts-Übergang ergänzt werden (außerhalb des AP-10b-Scopes)
- A11y: keine
- Reduced Motion: Browser-Bestätigung mit aktivierter Systemeinstellung steht noch aus
- Browser-QA: S/M/L und Reduced Motion noch nicht systematisch getestet (normaler Pfad von Albert bereits bestätigt)
- Screenreader: kein Volltest durchgeführt
- Backlog: keine neuen Einträge nötig
- Masterentscheidung: keine — Architektur-Fork wurde durch Alberts Nachsteuerung (Variante B++) bereits entschieden

## Empfehlung

- nächster interner AP: AP-prokrast-10c — Abschluss-QA Claims-vs-Files / Timing / Regression
- warum: Kontinuitäts-Reveal ist vollständig gebaut, scope-konform und von Albert im normalen Motion-Pfad bereits live bestätigt; es fehlt die unabhängige, read-only Gegenprüfung plus die noch offene Reduced-Motion-/S-M-L-Bestätigung
- ausdrücklich nicht: AP-prokrast-10d (Rücklaufkapsel) — verfrüht, solange AP-10c nicht gelaufen ist
