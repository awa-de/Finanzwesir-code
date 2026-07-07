# AP-prokrast-10a — Screen-3 Timing-Reveal Analyse Ergebnis

## Status

GELB

## Kurzbefund

Screen 3 zeigt aktuell keinerlei Timing-Reveal: Text, Chart und KPI-Karten werden synchron in einem einzigen Funktionsaufruf gerendert. Drehbuch und APP_SPEC dokumentieren seit AP-14 einen gestuften Reveal (Text → Verzögerung → Chart fadet ein → Verzögerung → KPI-Karten), der nie gebaut wurde. Der in diesem Prompt vorgegebene verbindliche Text ist bereits exakt im Code vorhanden (seit AP-14/B1-AP-16b). AP-10b ist ohne Engine-/Plugin-/Spec-Eingriff baubar (nur `app.js`/`app.css`), aber mehrere Parameter (exakte ms-Werte, Fade-Mechanismus, Reduced-Motion-Verhalten, Granularität der Beats) sind nicht spezifiziert und dürfen nicht erfunden werden — offene Punkte für den AP-10b-Kickoff.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: nur `.claude/learning/session-log.md` (M) — eigener `/start`-Edit dieser Session, keine App-/Engine-Datei betroffen
- `git diff --name-status`: `M .claude/learning/session-log.md` (identisch)
- `git log --oneline -15`: aktueller HEAD `706b1fd` — AP-prokrast-09a-09d ist bereits committed. Hinweis: PROJECT-STATUS.md/session-log gingen zu Sessionbeginn noch von „Commit-Freigabe ausstehend" aus; git log zeigt zum Zeitpunkt dieser Analyse bereits einen Commit für die 09-Kette. Kein Blocker für AP-10a, da der Worktree sauber ist.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/app.js` (vollständig, 1181 Zeilen)
- `Apps/prokrastinations-preis/app.css` (vollständig, 385 Zeilen)
- `Apps/prokrastinations-preis/APP_SPEC.md` (gezielt: §16-Bereich Reveal-Ablauf Screen 3 Zeile ~1190-1260; Output-Tabelle Zeile 208-224; A11y-Abschnitt §14; T-19/T-20 Testreferenz)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (Screen-3-Abschnitt Zeile 92-115; Responsive-Regel-Tabelle Zeile 170-180; Implementierungs-Notizen Zeile 193-203)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` (Gruppe E — Screen 3 Reveal, TC-E01–E04; TC-F03/F04 Screen-4-Timing-Präzedenz; TC-H05/H06 A11y-Endwissen; TC-P04 kein Pulse auf Screen 3)

## Optional gelesene Quellen

- `.claude/learning/session-log.md` (AP-08b/b2/b3/b4a/b5/c- und AP-09a-d-Zusammenfassungen — zur Regressionsprüfung der chartSettled-/renderMotion-/anchorMeasurement-Verträge, gegen echten `app.js`-Code kreuzverifiziert)
- `docs/steering/BACKLOG.md` (Grep auf „AP-prokrast-10"/„Timing"/„Reveal" — keine Treffer, kein Duplikat-Backlog-Eintrag)
- `Theme/assets/js/fw-chart-engine/plugins/` (Verzeichnislisting — Bestätigung: kein bestehendes Fade-/Reveal-Plugin, das für Screen 3 wiederverwendet werden könnte)

## Nicht gelesen / nicht nötig

- AP-prokrast-07a-d/08a-c/09a-d-Protokolldateien einzeln: bewusst nicht gelesen. Die relevanten Verträge (chartSettled, renderMotion, anchorMeasurement, RubikonSymbolMarkers/TC-F05) wurden stattdessen direkt am aktuellen `app.js`-Code verifiziert (reale Datei = Wahrheit, Protokolle = Hinweis — Präzedenzfall AP-08c).
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `FwAnchorMeasurementPlugin.js`, `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `LineChartStrategy.js`: nicht gelesen. Kein Regressionsverdacht, da AP-10b laut Architektur-Leitplanken nur bestehende, bereits genutzte `renderFromData()`-Optionen (renderMotion, chartSettled) wiederverwenden müsste — keine neuen Engine-Aufrufe nötig.
- `STATIONS_CONFIG_CONTRACT.md`, `ARCHITECTURE STRATEGY PAPER`, `Context Object Pattern`, `CHART_PLUGIN_ARCHITEKTUR.md`, `APP-INTERFACE.md`: nicht gelesen — für einen reinen app.js/app.css-Timing-Fix ohne Engine-/Contract-Änderung nicht entscheidungsrelevant.
- `stations.de.json`, `Theme/assets/data/**`: nicht gelesen — keine Datenmutation im Scope.

## Screen-3-Iststand

- Einstieg / Funktion: `showScreen(3, focus)` (app.js:662) ruft bei Ratenänderung `renderS3(currentRate)` (app.js:597) auf und entfernt danach synchron nur das `hidden`-Attribut der gesamten `<section data-fw-screen="3">`.
- Text: `h2S3.textContent = 'Jetzt erst sieht es einfach aus.'` (app.js:387) + `sublineS3.textContent = 'Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.'` (app.js:392). Beides statischer DOM-Text, immer im Screen-3-Markup vorhanden, kein eigenes hidden/Reveal.
- Chart: `chartEngine3.renderFromData(chartSection3, ctx.chartSeries, { verticalLine:'last', annotations:{events: revealAnnotations} })` (app.js:600-603) — läuft synchron in `renderS3()`, kein `renderMotion`-Override (Chart.js-Default-Tweening aktiv), kein `chartSettled`-Gate.
- KPI-Karten: `renderKpiCards(kpiContainerS3, ctx)` (app.js:606) wird in derselben Synchron-Ausführung von `renderS3()` unmittelbar nach dem Chart-Aufruf gerendert, kein Timer, kein hidden-Zustand.
- Aktuelles Timing: keins. Text, Chart-Aufruf und KPI-Rendering laufen in einem einzigen synchronen Funktionsdurchlauf; alle drei werden gemeinsam sichtbar, sobald `showScreen()` das `hidden`-Attribut der ganzen Section entfernt.
- Reduced Motion: keine `prefersReducedMotion()`-Abfrage in `renderS3()`/`showScreen(n===3)` — die vorhandene Helper-Funktion (app.js:50) wird hier nicht genutzt.
- A11y / Fokus: `h2.focus()` bei `focus=true` (app.js:672-673); `a11yRegion.textContent = lastRevealA11yText` wird synchron beim Eintritt gesetzt, ohne Bezug zu einem visuellen Timing.
- DOM-Reihenfolge: h2 → subline → chartSection3 → kpiContainerS3 → assumptionsS3 → navS3 (app.js:384-415) — entspricht bereits der gewünschten Soll-Reihenfolge.
- Sichtbare Reihenfolge: keine gestufte Reihenfolge — alle Elemente erscheinen im selben Moment (Chart-Innenanimation von Chart.js ausgenommen, aber nicht mit einer Text-/KPI-Verzögerung koordiniert).
- Semantische Reihenfolge: entspricht der DOM-Reihenfolge (kein aria-hidden/inert im Einsatz auf Screen 3).

## Sollabgleich

| Soll | Ist | Lücke | Empfehlung |
|---|---|---|---|
| Text zuerst | Text ist im DOM immer vorhanden, aber nicht separat „zuerst" sichtbar — erscheint zeitgleich mit Chart/KPI | kein eigenständiger erster Beat | AP-10b: Chart-Sektion + KPI-Slot beim Screen-Eintritt visuell zurückhalten, Text bleibt sofort sichtbar |
| verbindlicher Text exakt | `h2S3`/`sublineS3` enthalten exakt den in diesem Prompt vorgegebenen Text (app.js:387, 392) | keine | erfüllt — nicht anfassen |
| Chart danach | Chart rendert synchron mit KPI, kein „danach" | vollständig fehlend | AP-10b: Chart-Reveal nach kurzer Verzögerung nach Text |
| KPI-Karten danach | KPI rendern synchron mit Chart | vollständig fehlend | AP-10b: KPI-Reveal nach weiterer Verzögerung nach Chart |
| Reihenfolge code-seitig testbar | keine Timer/State, die eine Reihenfolge abbilden | nicht vorhanden | AP-10b sollte denselben Timer+hidden-Toggle-Ansatz wie `revealScreen4()` (app.js:637-657) verwenden — dort bereits testbar per DevTools/Timing |
| Reduced Motion semantisch sauber | keine Prüfung vorhanden | offen | APP_SPEC §16 verlangt für Stationenmarker explizit „bei Reduced Motion: sofort, ohne Animation" — Screen 4 (`revealScreen4`) prüft `prefersReducedMotion()` dagegen gar nicht (bestehende Inkonsistenz im Code, nicht Teil dieses AP) |
| A11y-/Fokuszustände konsistent | h2-Fokus + a11y-Region bereits vorhanden, unabhängig vom fehlenden visuellen Timing | teilweise erfüllt | AP-10b darf a11yRegion-Timing und Fokusverhalten unverändert lassen, nur visuelle Reveal-Stufen ergänzen |
| keine Screen-1-Regression | renderS3/showScreen(3) berühren Screen 1 nicht | erfüllt | — |
| keine Screen-2/Card-to-Point-Regression | renderJourneyChartOnly/-CardOnly, chartEngine2 komplett getrennt von chartEngine3/renderS3 | erfüllt | — |
| keine Screen-4/Rubikon-Regression | renderScreen4Chart/revealScreen4 nutzen eigene chartEngine4, keine gemeinsame Funktion mit renderS3 | erfüllt | — |
| AP-07/TC-F05 nicht berührt | RubikonSymbolMarkers laufen ausschließlich in renderScreen4Chart (chartText-Feature), renderS3 nutzt dieses Feature nicht | erfüllt | — |
| AP-09 Engine-Verträge nicht ausgebaut | `renderFromData()` unterstützt renderMotion/chartSettled bereits additiv (AP-08/09) — Wiederverwendung für Screen 3 erweitert keinen Contract | erfüllt, sofern AP-10b nur bestehende Optionen aufruft | AP-10b: renderMotion/chartSettled nur als bestehende, dokumentierte Aufrufoptionen verwenden, keine neuen Plugin-Contracts |

## Entscheidung für AP-10b

- bauen ja/nein: ja, mit offenen Parametern zu klären vor/am Anfang von AP-10b
- wenn nein, warum: entfällt
- erlaubte Dateien: `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.css`
- verbotene Dateien: alle Engine-/Plugin-/Spec-/QA-/Daten-Dateien (siehe Verbotsliste dieses Prompts)
- vorgeschlagener Timing-Ansatz: Struktur analog `revealScreen4()` (zwei verkettete `setTimeout` + `hidden`-Attribut-Toggle statt CSS-Übergang) ODER CSS-Opacity-Transition analog `.fw-app__station-area--flight-clone` (app.css:299-324), falls ein echtes visuelles Fade (Drehbuch Zeile 102/104: „fadet ein") gewünscht ist. Exakte ms-Werte nicht erfunden — Drehbuch nennt nur „kurze Verzögerung"/„nochmal mit Verzögerung", ohne Zahl; einzige im Projekt kodifizierte Konvention ist Screen 4s 800ms-Stille-Beat (APP_SPEC/Drehbuch-Tabelle). Empfehlung: 800ms als konsistenten Default vorschlagen, aber von Albert bestätigen lassen.
- vorgeschlagener A11y-Ansatz: bestehendes Muster wiederverwenden — natives `hidden`-Attribut (wie Screen-Sections, Collapsible-Content) entfernt Inhalte vollständig aus dem Accessibility-Baum, kein zusätzliches aria-hidden/inert nötig, da die KPI-`<dl>` keine fokussierbaren Elemente enthält. a11yRegion-Timing (bereits vorhanden) unverändert lassen.
- vorgeschlagener Reduced-Motion-Ansatz: APP_SPEC §16 (Stationenmarker-Reveal) verlangt explizit „bei Reduced Motion: sofort, ohne Animation" — als Präzedenzfall für Chart-/KPI-Fade übernehmen. Hinweis: Screen 4 tut dies aktuell NICHT — bestehende Inkonsistenz, nicht in AP-10a/10b zu reparieren, aber Albert zur Kenntnis zu geben.
- besondere QA-Punkte: TC-E01–TC-E04 (Gruppe E) müssen nach AP-10b weiterhin bestehen; TC-P04 (kein Pulse auf Screen 3) darf durch neue Timing-Logik nicht verletzt werden; TC-F04-Präzedenz (Screen 4, Reduced-Motion-neutral) als Referenzmuster nutzbar.
- Browser-QA nötig: ja (S/M/L, sichtbare Reihenfolge, gefühltes Timing)
- DOM-Mini-QA nötig: ja (hidden-/aria-Zustände vor und nach jedem Reveal-Schritt, Fokus-Reihenfolge)
- Screenreader-Volltest nötig ja/nein/optional: optional — DOM-Mini-QA zuerst, Screenreader-Volltest nur bei Auffälligkeiten (wie bei AP-07d)

## Architekturbewertung

- app.js: einzige Codeänderung nötig (renderS3/showScreen(n===3)-Zweig um Timing/State erweitern) — analog bestehendem revealScreen4()-Muster
- app.css: neue Klassen für Fade-Zustände (nur falls CSS-Transition-Ansatz gewählt wird), analog `.fw-app__station-area--flight-clone`
- ChartEngine-Aufruf: keine neue Aufrufart nötig — renderMotion/chartSettled sind bereits additive, dokumentierte Optionen aus AP-08/09
- Chart.js-Internals in app.js: keine — weiterhin nur renderFromData()-Optionen
- fwContext: unberührt
- Engine-/Plugin-Contracts: keine neuen — reine Wiederverwendung bestehender Optionen
- Datenmutation: keine
- Regressionsrisiko: gering, da renderS3()/showScreen(n===3) ausschließlich screen3-lokal sind und keine von Screen 1/2/4 geteilte Funktion verändert werden müsste

## Deterministische Checks

- verbindlicher Text: exakt 1 Treffer pro Zeile — „Jetzt erst sieht es einfach aus." (app.js:387) und „Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand." (app.js:392) — Volltextübereinstimmung mit dem in diesem Prompt vorgegebenen Text bestätigt
- Screen-3-Fundstellen: app.js Zeilen 378-415 (Markup), 597-608 (renderS3), 676-686 (showScreen n===3-Zweig)
- KPI-/Metric-Fundstellen: renderKpiCards() app.js:120-152, Aufruf app.js:606
- Reveal-/Hidden-/A11y-Fundstellen: kein hidden/aria-hidden/inert auf Screen-3-internen Elementen (nur auf Screen-Section-Ebene und beim Collapsible aus Screen 2)
- Reduced-Motion-Fundstellen: prefersReducedMotion() app.js:50-58, genutzt im journeyBtn-Click-Handler (app.js:907) — NICHT genutzt in renderS3/showScreen(3)/revealScreen4
- chartSettled/renderMotion-Fundstellen: renderJourneyChartOnly (app.js:554,560), revealCurrentStationPoint (app.js:752,767) — beide nur Screen 2, kein Einsatz in renderS3
- `node --check Apps/prokrastinations-preis/app.js`: ausgeführt, SYNTAX OK (nur Statusklärung, keine inhaltliche Prüfung)
- Git-Diff nach AP-10a: nur `.claude/learning/session-log.md` (eigener /start-Edit) + diese neue Datei
- unzulässige Dateiänderungen: keine

## Nicht geändert

- app.js: unverändert
- app.css: unverändert
- Engine: unverändert
- Plugins: unverändert
- APP_SPEC: unverändert
- Drehbuch: unverändert
- QA_TEST_CASES: unverändert
- Stationsdaten: unverändert
- Finanzdaten: unverändert
- package-/lockfiles: unverändert

## Offene Punkte

- Code: exakte Timing-Werte (ms), Fade-Mechanismus (Timer+hidden vs. CSS-Opacity-Transition) — nicht erfunden, für AP-10b-Kickoff zu klären
- UX: soll der Stationenmarker-Fade (APP_SPEC §16) als eigener dritter Beat zwischen Chart und KPI gebaut werden, oder reicht die Drehbuch-Fassung (Chart+Marker in einem Fade)? Beide Quellen widersprechen sich nicht direkt, sind aber unterschiedlich granular
- CSS: neue Fade-Klassen nötig, falls CSS-Transition-Ansatz gewählt wird
- A11y: keine neuen Fragen — bestehendes hidden-/a11yRegion-Muster ausreichend
- Reduced Motion: Screen-3-Reveal sollte laut APP_SPEC §16 bei Reduced Motion sofort (ohne Fade) erscheinen — Screen 4 tut das aktuell nicht (bestehende Inkonsistenz, nicht Teil dieses AP, aber Albert zur Kenntnis)
- Browser-QA: offen (S/M/L, gefühltes Timing)
- Screenreader: optional, nur bei DOM-Mini-QA-Auffälligkeiten
- Daten: keine
- Test: QA_TEST_CASES.md Gruppe E ggf. um einen neuen TC für die Timing-Reihenfolge zu ergänzen (Entscheidung liegt außerhalb von AP-10a — kein QA-Dateizugriff in AP-10a)
- Backlog: keine neuen Einträge nötig, AP-prokrast-10 ist bereits in NAVIGATION.md als Kette geführt
- Masterentscheidung: keine echte Masterentscheidung nötig (kein Spec-Konflikt auf Architekturebene wie beim No-op-Bootstrap-Fall) — aber die oben genannten UX-/Timing-Parameter sollten von Albert vor Codebeginn kurz bestätigt werden, damit AP-10b nicht raten muss

## Empfehlung

- nächster interner AP: AP-prokrast-10b (Implementierung), aber erst nachdem Albert die im Abschnitt „Offene Punkte" genannten Timing-/UX-Parameter bestätigt oder AP-10b diese explizit im eigenen Gate klärt
- warum: Architektur ist sauber baubar (nur app.js/app.css, keine neuen Engine-Contracts), Soll ist durch Drehbuch + APP_SPEC §16 bereits klar dokumentiert — es fehlen nur wenige, nicht erfindbare Detailwerte
- ausdrücklich nicht nächster AP: AP-prokrast-10c (Abschluss-QA) — es gibt noch nichts zu prüfen, da AP-10b nicht gebaut wurde
- Stop-/Blocker-Hinweis: kein Blocker. Einzige Auffälligkeit: Drehbuch-Zitat in Zeile 100 („Im Rückblick ist es eine Linie. Unterwegs war jedes Mal offen.") ist veraltet und weicht vom tatsächlich gebauten, in APP_SPEC §16.2 referenzierten Text ab — anders als bei Screen 4 (Beat 1-3) fehlt hier ein „abgelöst"-Hinweis im Drehbuch. Rein dokumentarischer Befund, kein Code-Risiko, da app.js bereits den korrekten (in diesem Prompt vorgegebenen) Text nutzt.
