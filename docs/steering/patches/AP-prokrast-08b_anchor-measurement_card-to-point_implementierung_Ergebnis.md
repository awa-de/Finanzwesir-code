# AP-prokrast-08b — AnchorMeasurement v1 und Card-to-Point Implementierung Ergebnis

## Status

GELB

## Kurzbefund

AnchorMeasurement v1 ist als neues, separates, opt-in Plugin gebaut, über den Barrel exportiert/importiert und über eine echte ChartEngine-Vermittlungsmethode (`_emitAnchorMeasurements`) an `app.js` angebunden — kein direkter Plugin→App-Kanal, kein `fwContext`-Pixelkanal, kein `chart._fwGeometry`, keine Zweckentfremdung bestehender Plugins. Screen-2 Card-to-Point nutzt dieses Muster: ein `aria-hidden`/`inert`-Klon der aktuellen Stationskarte fliegt visuell zum gemessenen Chart-Anker; die echte Karte bleibt während des gesamten Flugs unverändert im DOM sichtbar (keine Fokus-/Live-Region-/Tastatur-Änderung möglich, weil sich am echten DOM in diesem Fenster nichts ändert); erst nach Ablauf der Fluganimation wird die nächste Station gerendert (Zielpunkt-Pulse und Kartenwechsel gemeinsam, im selben `renderJourneyStep()`-Aufruf). Alle deterministischen QA-Checks (Chart.js-Internals-Grep in `app.js`, `_fwGeometry`-Grep, Plugin-Importverbote, Barrel-Export/-Import, Scope-Diff) sind grün. Status GELB statt GRÜN ausschließlich wegen der Statuslogik-Vorgabe: Browser-S/M/L und echter DOM-/Accessibility-Tree-/Screenreader-Test sind in dieser Umgebung nicht ausführbar und daher nur statisch/strukturell plausibilisiert, nicht empirisch bestätigt — Albert-Test im lokalen Live-Server ausständig.

**Nachtrag (noch in dieser Session, vor Albert-Test):** Albert fand die Fluganimation zu schnell. Statt den Wert erneut hart zu verdrahten, wurde ein zentraler CSS-Schalter (`--fw-card-to-point-flight-duration`, definiert auf `.fw-app`) eingeführt: `app.css` referenziert ihn in der Transition, `app.js` liest denselben Wert (`getFlightDurationMs()`) für das Timeout der Klon-Entfernung/des Stationswechsels — CSS und JS können dadurch nicht auseinanderlaufen (kein zweiter Ort zum Pflegen). Default von 300ms auf 450ms angehoben (vorläufiger Zwischenwert, keine finale UX-Abnahme). Auf Alberts ausdrücklichen Wunsch als eigener BACKLOG-Punkt `DS-FOLLOWUP-08` dokumentiert (analog `DS-FOLLOWUP-07`) und `docs/steering/BACKLOG.md` bereits in dieser Session aktualisiert (Stand-Zeile ebenfalls aktualisiert) — kein separater Nachfolge-AP nötig, aber die endgültige Geschwindigkeit ist erst nach CI-Font-Anbindung final abzunehmen (gleicher Rhythmus wie DS-FOLLOWUP-07).

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Bau): ` M .claude/learning/session-log.md`, `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-06-ap-prokrast-07-rubikon-symbolmarkers.md`, `?? docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` — alle bekannt, außerhalb App-/Engine-/Plugin-/Spec-/QA-Scope
- `git diff --name-status` (vor Bau): `M .claude/learning/session-log.md` — keine Code-/Spec-/QA-Änderung
- `git log --oneline -10`: `ca45c94` (AP-prokrast-07a-07d, committed), `4093808`, `0f355f7`, `a735981`, `c633f82`, `ffacc13`, `a399b5f`, `eacdc0e`, `cba810e`, `7104b77` — lückenlos, AP-07 sichtbar committed

Keine unerwarteten Änderungen. Gate-Voraussetzung erfüllt.

## Gelesene Quellen

- `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` — vollständig
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — vollständig (inkl. §20 Barrel/Importregeln, §20.6 `_fwGeometry`-Verbot)
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` — vollständig
- `docs/spec/Der Rucksack (Context Object Pattern).md` — vollständig
- `docs/spec/APP-INTERFACE.md` §4 — gezielt
- `Apps/prokrastinations-preis/app.js` — vollständig (vor und nach Änderung)
- `Apps/prokrastinations-preis/app.css` — vollständig (vor und nach Änderung)
- `Apps/prokrastinations-preis/config/stations.de.json` — vollständig (aus AP-08a übernommen, nicht erneut gelesen, keine Änderung nötig)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — aus AP-08a übernommen (Beat A–C)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` — aus AP-08a übernommen (Gruppe D/I)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig (vor und nach Änderung)
- `Theme/assets/js/fw-chart-engine/plugins/index.js` — vollständig
- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` — vollständig (Referenzmuster, nicht geändert)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — vollständig (Referenzmuster, nicht geändert)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — vollständig (Referenzmuster, nicht geändert)

Nicht erneut gelesen (aus AP-08a bereits belastbar geklärt): `LineChartStrategy.js`, `FwSmartXAxis.js`, `FwDateUtils.js`, AP-07-Protokolle.

## Design-Gate — AnchorMeasurement v1

### Problemklasse

DOM-orchestrierte Produktanimationen (Card-to-Point) brauchen echte Chart-Ankerpositionen, ohne dass `app.js` Chart.js-Internals liest.

### Nicht-Ziel

Keine Card-to-Point-API, keine allgemeine Geometry Bridge, kein `chart._fwGeometry`, kein `fwContext`-Pixelkanal.

### Contract

- Input: `anchors: [{ id, x, y }]` — x/y in Datenkoordinaten (Timestamp/Depotwert), identische Konvention wie `buildJourneyStationAnnotations` (`new Date(month+'-01').getTime()`).
- Output: `[{ id, x, y, visible, coordinateSpace }]` — Plain Numbers, `Object.freeze`t.
- Coordinate Space: `chart-container` (relativ zum Container, den `app.js` an `renderFromData()` übergibt — nicht Viewport, nicht Document).
- Payload-Felder: `id` (string), `x`/`y` (number), `visible` (boolean), `coordinateSpace` (string-Literal).
- Explizit nicht im Payload: Chart/Canvas/ctx/Scale/DatasetMeta/DOM-Node/Annotation-Objekt/Station-Objekt.

### Layer-Verantwortung

- **Plugin** (`FwAnchorMeasurementPlugin.js`): misst nur — liest `chart.scales.x/y.getPixelForValue()` (offiziell sanktionierter Weg laut `CHART_PLUGIN_ARCHITEKTUR.md` §7) und `chart.chartArea` für die Sichtbarkeitsprüfung; ruft ausschließlich die von der ChartEngine übergebene `onMeasurement`-Funktion auf (nie einen App-Callback direkt).
- **ChartEngine**: vermittelt echt — übersetzt Canvas-relative in Container-relative Pixel (`canvas.getBoundingClientRect()` vs. `container.getBoundingClientRect()`, Standard-DOM-Geometrie, keine Chart.js-Internals), friert das Ergebnis ein und ruft erst danach den tatsächlichen App-Callback auf, der ausschließlich in `state.anchorMeasurementCallback` gehalten wird — nie an Chart.js/das Plugin durchgereicht.
- **app.js**: orchestriert DOM-Motion — bildet `anchors` aus vorhandenen Stations-/Chartserien-Daten, aktiviert `anchorMeasurement` opt-in, empfängt fertige Container-relative Messwerte, misst Karten-/Motion-Container per `getBoundingClientRect()`, berechnet Delta, setzt CSS Custom Properties und Motion-Klassen.

### Hook

`afterDraw` — spätester Chart.js-Zeichenpunkt (§6.1), identisch zum Muster der drei bestehenden Plugins. Liest Konfiguration bei jedem Draw frisch, kein gecachter State beim Registrieren.

### Warum kein vorhandenes Plugin

- **FwAnnotationPulsePlugin**: eigener, enger V1-Vertrag (Pulse-Timing, WeakMap-State für Ring-Animation); eine Koordinatenexport-Erweiterung wäre Zweckentfremdung und laut ROT-Liste verboten.
- **FwChartTextPlugin**: dokumentiert „keine Pixelkoordinaten nach außen, keine Card-to-Point-API" explizit als V1-Nicht-Ziel (AP-prokrast-03d/07a) — Erweiterung hier würde eine dokumentierte Architekturentscheidung stillschweigend aufheben.
- **FwVerticalLinePlugin**: zeichnet nur die eine feste Linie am letzten Datenpunkt, kein generischer Anker-Mechanismus, kein Optionsvertrag für beliebige Anker.

### Warum kein fwContext

`fwContext` ist laut Rucksack-Spec (KDR 9) strikt Domain-Semantik (`chartType`, `rhythm`, `currency`, `dataRange` …) — ein „Request-Scoped Context" für fachliche Anweisungen an Achsen/Tooltips, niemals für Pixelkoordinaten oder Motion-State vorgesehen. `CHART_PLUGIN_ARCHITEKTUR.md` §10 verbietet explizit, Fachobjekte/Kontext mit Laufzeit-/Pixeldaten zu beschreiben.

### Warum kein chart._fwGeometry

`CHART_PLUGIN_ARCHITEKTUR.md` §20.6 dokumentiert `_fwGeometry` als toten, nie produktiv verdrahteten Kommunikationskanal (`FwBarLayoutPlugin`, in AP-14e8 nach Dead-State-Nachweis entfernt) und verbietet Reaktivierung ohne eigenen Design-AP. AnchorMeasurement verwendet stattdessen einen expliziten, funktionalen Rückweg (Callback-Vermittlung durch die ChartEngine) statt eines impliziten Objekt-Felds am Chart-Objekt.

## Geänderte Dateien

| Datei | Änderung | Warum im Scope | Nach Write wiedergelesen? |
|---|---|---|---:|
| `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js` | neu, ~75 Zeilen, ein Plugin, keine Fremdimporte | einzige laut Auftrag vorgesehene neue Plugin-Datei | ja |
| `Theme/assets/js/fw-chart-engine/plugins/index.js` | ein neuer Named Re-Export | Pflicht laut Barrel-Regel (§20.2) | ja |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | Import erweitert; `anchorMeasurement`-Optionsvalidierung in `renderFromData()` (beide State-Zweige); Plugin-Registrierung + Vermittlungs-Closure in `_draw()`; neue private Methode `_emitAnchorMeasurements()` | einzige laut Auftrag erlaubte Engine-Datei; additiv, analog `chartText`/`annotationPulse` | ja |
| `Apps/prokrastinations-preis/app.js` | `prefersReducedMotion()`-Helfer; `currentStationAnchorMeasurement`/`stationTransitionInProgress`-State; `anchorMeasurement`-Aktivierung in `renderJourneyStep()`; neue Funktion `flyCardToPoint()`; `journeyBtn`-Handler umgebaut (Flug vor Stationswechsel, Doppelklick-Schutz); **Nachtrag:** neue Funktion `getFlightDurationMs()`, `flyCardToPoint()` liest Timeout jetzt darüber statt fest 320ms | einzige laut Auftrag erlaubte App-Datei | ja |
| `Apps/prokrastinations-preis/app.css` | `.fw-app__screen { position: relative }`; neue `--flight-clone`/`--flight-active`-Regeln inkl. `prefers-reduced-motion`-Zweig; **Nachtrag:** zentraler Schalter `--fw-card-to-point-flight-duration` auf `.fw-app` (450ms, war hart 300ms), Transition referenziert ihn statt fixer Werte | einzige laut Auftrag erlaubte CSS-Datei | ja |
| `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md` | neu (dieses Protokoll) | Pflicht-Ergebnisdatei | wird nach Write geprüft |
| `docs/steering/BACKLOG.md` | **Nachtrag, auf Alberts explizite Anweisung:** neuer Eintrag `DS-FOLLOWUP-08` (Card-to-Point-Geschwindigkeit final abnehmen nach CI-Font-Anbindung, analog `DS-FOLLOWUP-07`), Stand-Zeile aktualisiert | Albert forderte explizit „nach oben reporten"/Backlog-Eintrag; Priorität 1 (Alberts aktuelle Anweisung) sticht die AP-Prompt-eigene Dateiliste | ja |

## AnchorMeasurement-Contract umgesetzt

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| neues separates Plugin | ja | `FwAnchorMeasurementPlugin.js`, eigene Datei, ein Plugin |
| opt-in über Optionsfeld | ja | `chart.options.plugins.fwAnchorMeasurement.enabled === true`, sonst kein Verhalten |
| Export über plugins/index.js | ja | `plugins/index.js` Zeile 15 |
| ChartEngine-Import über Barrel | ja | `ChartEngine.js` Zeile 69, `from '../plugins/index.js'` |
| kein Plugin→App-Direktkanal | ja | Plugin ruft nur `opts.onMeasurement` (ChartEngine-Closure) auf; App-Callback lebt ausschließlich in `state.anchorMeasurementCallback`, wird nie an Chart.js/Plugin übergeben |
| Payload Plain Numbers only | ja | `{id, x, y, visible}` (Plugin→Engine), `{id, x, y, visible, coordinateSpace}` (Engine→App) — beide `Object.freeze`t, keine Objektreferenzen |
| coordinateSpace chart-container | ja | `_emitAnchorMeasurements()` setzt `coordinateSpace: 'chart-container'` nach Offset-Übersetzung via `getBoundingClientRect()` |
| kein fwContext-Pixelkanal | ja | Grep/Lesen bestätigt: kein Zugriff auf `fwContext` im neuen Code |
| kein chart._fwGeometry | ja | Grep bestätigt: keine neue produktive Verwendung (siehe QA unten) |
| keine App-Begriffe im Plugin | ja | Plugin-Datei enthält keine Screen-/Card-/Station-/Journey-/Rubikon-/SaaS-Begriffe (nur `anchors`/`id`/`x`/`y`) |

## Card-to-Point gegen Pflichtumfang

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| Karte erscheint groß | ja (unverändert aus AP-14) | `renderStationCard()` nicht verändert |
| Karte schrumpft/bewegt sich zum Punkt | ja, strukturell | `flyCardToPoint()` + `--flight-active`-Transform (`scale(0.15)` + `translate(delta)`), statisch geprüft, Browser-Bestätigung offen |
| Zielpunkt wird wahrnehmbar markiert/pulst | ja (bestehender Mechanismus) | `annotationPulse`/`FwAnnotationPulsePlugin` unverändert, feuert bei nächstem `renderJourneyStep()`-Aufruf auf dem neu sedimentierten Punkt |
| nächste Karte folgt danach | ja, jetzt strikt sequenziert | `renderJourneyStep(activeStationIndex)` wird erst im `onComplete`-Callback von `flyCardToPoint()` aufgerufen, nie während des Flugs |
| 7/7 Stationen | ja, unverändert | `journeyStations` unverändert, Flug-Logik ist stationsunabhängig (nutzt `station.id` generisch) |
| SaaS kein Sonderfall | ja | keine SaaS-spezifische Verzweigung im neuen Code |
| keine Chart.js-Internals in app.js | ja | Grep bestätigt (siehe QA unten) |
| keine DOM↔Canvas-Hackkopplung | ja | app.js liest nur fertige, von der Engine gelieferte Zahlen; keine Canvas-/Chart.js-Objekte in app.js |
| keine Zukunftsdaten | ja | keine neuen Datenpunkte, `chartSeries`/`visibleSeries` unverändert |
| keine Dummy-Datasets | ja | kein neues Dataset eingeführt |
| keine Future-Line/Prognose | ja | `xDisplayRange`/Achsenlogik unverändert |

## Responsive S/M/L

- **S:** Kein hardcodierter Zielpixel — `flyCardToPoint()` berechnet Delta ausschließlich aus gemessenen Rects (`stationArea`, `chartSection2`, `screen2`) plus dem gemessenen Anker. Bei sehr schmalen Viewports ist die Flugstrecke tendenziell kürzer (Karte und Chart liegen näher beieinander); kein explizites Clamping ergänzt, da keine Fixpixel-Werte im Spiel sind, die überlaufen könnten — statisch plausibel, Browser-S-Test offen.
- **M:** Standardfall, keine Sonderlogik nötig.
- **L:** Größere Distanz möglich, dieselbe Formel; keine Sonderlogik.
- **Keine hardcodierten Zielpixel:** bestätigt — jede Positionsangabe kommt aus `getBoundingClientRect()` oder aus dem AnchorMeasurement-Payload.
- **Clamp-/Lesbarkeitsregel:** nicht separat implementiert (kein fixer Pixel-Offset, der geclampt werden müsste); falls der reale S-Test zeigt, dass die Karte durch die Skalierung `scale(0.15)` zu klein/unleserlich früh wird, ist das ein Nachjustierungspunkt für den Browser-Test, kein Architekturproblem.

## A11y / Reduced Motion

- **Semantische Quelle der aktiven Station:** die echte `stationArea` — bleibt während des gesamten Flugs strukturell und inhaltlich unverändert im DOM; wird erst nach Ablauf der Fluganimation (im `onComplete`-Callback) durch `renderJourneyStep()` auf die nächste Station aktualisiert.
- **Live-Region unverändert:** `a11yRegion.textContent = station.headline` wird weiterhin ausschließlich innerhalb von `renderJourneyStep()` gesetzt — feuert also frühestens nach Abschluss des Flugs, nie während der Animation. Keine zusätzliche Live-Region-Aktualisierung durch `flyCardToPoint()` selbst.
- **Fokusverhalten:** unverändert gegenüber AP-14/AP-17b (`(h3 ?? screen2.querySelector('h2'))?.focus()`), jetzt innerhalb `advanceToNextStation()`, ausgeführt nach dem Flug. Da sich am echten DOM während des Flugs nichts ändert, kann sich der Fokus während dieses Fensters nicht unbeabsichtigt verschieben.
- **Keyboard-Verhalten:** `journeyBtn` bleibt während des Flugs unverändert im DOM und fokussierbar (bewusst nicht `disabled`, um keinen Fokusverlust zu riskieren); ein Doppelklick/Doppel-Enter während des Flugs wird über `stationTransitionInProgress` ignoriert, nicht durch Deaktivieren des Buttons.
- **Animations-Clone vorhanden:** ja.
- **Falls Clone:** `aria-hidden="true"` gesetzt; zusätzlich `inert` (moderne Browser, harmloser No-op-Fallback in älteren); alle `id`-Attribute und `aria-controls`-Referenzen im Klon entfernt (verhindert doppelte IDs während der kurzen DOM-Überlappung); `button`/`[tabindex]`-Elemente im Klon erhalten `tabindex="-1"` und `disabled` als zusätzliche, redundante Absicherung zum `aria-hidden`/`inert`.
- **Doppelte Screenreader-Inhalte ausgeschlossen:** strukturell ja — der Klon ist per `aria-hidden`/`inert` aus dem Accessibility-Tree entfernt, die echte Karte ändert sich während der Überlappung nicht; kein Live-Browser-/Screenreader-Test in dieser Umgebung durchgeführt (kein DevTools-/Screenreader-Zugriff verfügbar).
- **Reduced-Motion-Endzustand:** kein Klon, kein Flug (`prefersReducedMotion()` prüft vor `flyCardToPoint()`); `advanceToNextStation()` läuft sofort, identisch zum bisherigen (bereits AP-14-approved) Sofort-Wechsel-Verhalten inklusive des bestehenden statischen-Ring-Verhaltens von `FwAnnotationPulsePlugin` unter Reduced Motion.
- **DOM-Mini-QA:** statisch durchgeführt (Code-Grep/-Lesen: kein zweiter `id`-Träger, `aria-hidden`/`inert` gesetzt, keine zusätzliche Live-Region-Schreibstelle) — kein Live-DOM-Inspektor-Check in dieser Umgebung möglich.
- **Screenreader-Volltest:** offen (wie bereits bei AP-07 dokumentiert, unabhängig von diesem AP — kein NVDA/VoiceOver in dieser Umgebung verfügbar).

## Deterministische QA

### app.js Chart.js-Internals-Grep

Befehl: `grep -nE "chart\.scales|getDatasetMeta|getPixelForValue|chartArea|Chart\.getChart" Apps/prokrastinations-preis/app.js`
Ergebnis: keine Treffer (Exit 1)
Bewertung: bestanden — `app.js` bleibt vollständig frei von Chart.js-Internals.

### _fwGeometry-Grep

Befehl: `grep -RIn "_fwGeometry" Theme/assets/js/fw-chart-engine Apps/prokrastinations-preis docs/spec docs/steering/patches`
Ergebnis: Treffer nur (a) im Kopfkommentar des neuen Plugins (dokumentiert das Verbot, keine Nutzung) und (b) in bereits vorhandenen, historisch als Drift markierten Spec-/Protokoll-Dateien (`CHART_PLUGIN_ARCHITEKTUR.md` §20.6, „Baendigung der X-Achse"-Dokumente, AP-14e-Protokolle).
Bewertung: bestanden — keine neue produktive `_fwGeometry`-Verdrahtung.

### Plugin-Importverbote

Befehl: `grep -nE "from ['\"].*(core|strategies|plugins/index)" Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js`
Ergebnis: keine Treffer (Exit 1)
Bewertung: bestanden — Plugin hat gar keine Imports (weder verboten noch erlaubt nötig).

### Barrel-QA

- Export: `plugins/index.js` Zeile 15 — `export { FwAnchorMeasurementPlugin } from './FwAnchorMeasurementPlugin.js';`
- Import: `ChartEngine.js` Zeile 69 — selektiver Named Import zusammen mit den drei bereits genutzten Plugins aus `../plugins/index.js`.

### Scope-QA

- `git diff --name-status`: `Apps/prokrastinations-preis/app.css`, `Apps/prokrastinations-preis/app.js`, `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `Theme/assets/js/fw-chart-engine/plugins/index.js` (alle erlaubt) + `.claude/learning/session-log.md` (Session-Meta, außerhalb Scope). Neu (`??`): `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js`, dieses Ergebnisprotokoll, sowie die bereits vor diesem AP vorhandenen `AP-prokrast-08a_*`- und Chronik-Dateien.
- verbotene Dateien unverändert: bestätigt — `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`, `stations.de.json`, `Theme/assets/data/**`, `FwAnnotationPulsePlugin.js`, `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `FwDateUtils.js`, `FinanzwesirData.js`, `CSVParser.js` erscheinen in keinem Diff.
- **Nachtrag:** zusätzlich `docs/steering/BACKLOG.md` geändert (`M`) — bewusste Abweichung von der ursprünglichen AP-Prompt-Dateiliste, gedeckt durch Alberts explizite Anweisung in dieser Session (Prioritätsregel 1 aus CLAUDE.md: „Alberts aktuelle explizite Anweisung" sticht die AP-Prompt-eigene Dateiliste). Kein anderer Steering-/Spec-File (NAVIGATION.md, PROJECT-STATUS.md, BACKLOG-ARCHIV.md) wurde angefasst — das bleibt dem regulären Abschluss-Ritual vorbehalten.

## Datenwahrheit

- Stationsdaten unverändert: bestätigt (`stations.de.json` nicht im Diff)
- Finanzdaten unverändert: bestätigt (`Theme/assets/data/**` nicht im Diff)
- keine Zukunftsdaten: bestätigt
- keine Dummy-Datasets: bestätigt
- keine Future-Line: bestätigt
- keine Prognose: bestätigt

## Regression

- Screen 1: nicht angefasst, kein Diff außerhalb der genannten Stellen
- Screen 3: nicht angefasst (`renderS3()` unverändert)
- Screen 4: nicht angefasst (`renderScreen4Chart()`/`revealScreen4()` unverändert, kein Diff in diesem Bereich)
- RubikonSymbolMarkers: nicht angefasst (`FwChartTextPlugin.js` nicht im Diff)
- TC-F05 nicht wieder geöffnet: bestätigt, kein Bezug in diesem AP

## Doku-/Spec-Folgepflicht

- Neues wiederverwendbares Muster entstanden: ja — `FwAnchorMeasurementPlugin` ist als generisches Anker-Mess-Muster für künftige Apps gedacht (analog zur Rolle von `FwAnnotationPulsePlugin` als Referenzbeispiel in §14).
- Muss `CHART_PLUGIN_ARCHITEKTUR.md` später erweitert werden: ja — ein neuer Abschnitt (analog §14) sollte `FwAnchorMeasurementPlugin` als zweites Referenzbeispiel dokumentieren (Ablage, Aktivierung, Scope, State, Hook, Vermittlungsmuster Plugin→Engine→App).
- Muss APP_SPEC/QA_TEST_CASES später synchronisiert werden: ja — Screen-2-Verhalten (Card-to-Point-Flug) ist neu und aktuell nicht in `APP_SPEC.md`/`QA_TEST_CASES.md` (Gruppe D/I) abgebildet; sollte in einem eigenen Spec-Sync-AP nachgezogen werden, nicht in diesem AP.
- Empfehlung für Masterfaden: eigenen kleinen Nachfolge-AP für die Doku-Synchronisierung (CHART_PLUGIN_ARCHITEKTUR.md §21 + APP_SPEC/QA_TEST_CASES) einplanen, unabhängig von der Browser-QA-Bestätigung.
- **Nachtrag — Fluggeschwindigkeit:** BACKLOG-Eintrag `DS-FOLLOWUP-08` bereits in dieser Session angelegt (kein offener Folgepflicht-Punkt mehr für die reine Verankerung); die eigentliche Feinjustierung des Werts bleibt aber wie bei `DS-FOLLOWUP-07` bis nach CI-Font-Anbindung zurückgestellt.

## Risiken

| Risiko | Kategorie | Blockierend? | Empfehlung |
|---|---|---:|---|
| Browser-S/M/L und Screenreader-/Accessibility-Tree-Verhalten nur statisch geprüft | QA-Lücke | nein, aber vor Commit sinnvoll zu schließen | Albert-Test im lokalen Live-Server (Screen 2, alle 7 Stationen, S/M/L, Tab-Reihenfolge, DevTools Accessibility-Pane) |
| `scale(0.15)` könnte auf sehr kleinen Viewports zu abrupt wirken | UX-Feinschliff | nein | nach Browser-Test ggf. Skalierungswert/Timing nachjustieren |
| Pulse (Beat B) und nächste Karte (Beat C) laufen im selben `renderJourneyStep()`-Aufruf, nicht als getrennt sichtbare Phasen | Interpretationsentscheidung | nein | im Protokoll dokumentiert; falls Albert eine sichtbar getrennte Pulse-Vorphase will, eigener Folge-AP nötig (würde eine Teilaufspaltung von `renderJourneyStep()` erfordern) |
| Doku-Folgepflicht (CHART_PLUGIN_ARCHITEKTUR.md §21, APP_SPEC/QA_TEST_CASES) offen | Doku-Drift-Risiko | nein, aber sollte zeitnah geschlossen werden | eigener kleiner Nachfolge-AP |
| Fluggeschwindigkeit (450ms) ist ein Zwischenwert, nicht final von Albert abgenommen | UX-Feinschliff | nein | im Live-Server-Test zusammen mit S/M/L final bewerten; BACKLOG `DS-FOLLOWUP-08` bereits verankert |

## Nicht geändert

- APP_SPEC.md: nicht geändert (nicht gelesen in diesem AP, aus AP-08a übernommen)
- Drehbuch: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- Finanzdaten: nicht geändert
- FwAnnotationPulsePlugin.js: nicht geändert
- FwChartTextPlugin.js: nicht geändert
- FwVerticalLinePlugin.js: nicht geändert
- Screen 4: nicht geändert
- RubikonSymbolMarkers: nicht geändert

## Empfehlung

- nächster interner AP: AP-prokrast-08c — Abschluss-QA Claims-vs-Files / Motion / Regression (inkl. Albert-Browser-Test S/M/L, DevTools-Accessibility-Check)
- ausdrücklich nicht: Commit, Abschlussritual, AP-07-Nacharbeit, Spec-Sync ohne Masterentscheidung
