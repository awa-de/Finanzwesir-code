# AP-prokrast-08b5 — RenderMotion instant für Screen-2-Journey Ergebnis

## Status

GELB

## Kurzbefund

Ein neuer, enger, opt-in Engine-Contract `renderMotion.mode = 'default' | 'instant'` wurde in `ChartEngine.js` ergänzt — additiv, analog zu `chartSettled`/`anchorMeasurement`. `mode: 'instant'` unterdrückt Chart.js-Tweening ausschließlich für den konkreten `renderFromData()`-Aufruf, der ihn anfordert, indem er denselben `update('none')`-Mechanismus wiederverwendet, der bereits für Reduced Motion existiert — kein neuer Mechanismus, kein globales `update('none')`, keine Änderung an `LineChartStrategy.js`, kein Eingriff in `fwContext`. `app.js` setzt `renderMotion: { mode: 'instant' }` ausschließlich in den beiden Screen-2-Journey-Chart-Funktionen (`renderJourneyChartOnly()`, `revealCurrentStationPoint()`) — Screen 1/3/4 bleiben unverändert bei Chart.js-Default-Animation. `chartSettled` feuert unter `instant` zuverlässig weiter (derselbe synchrone Nachreich-Pfad, der bereits für Reduced Motion gebaut war, greift jetzt auch hier). Alle deterministischen Checks sind grün: keine Chart.js-Internals/kein `chart.update()` in `app.js`, kein `fwContext`-Missbrauch, `LineChartStrategy.js` und alle vier Plugin-Dateien unverändert, kein neues produktives `_fwGeometry`, Scope-Diff enthält nur erwartete Dateien. Status GELB statt GRÜN ausschließlich, weil in dieser Umgebung keine Browser-Bestätigung möglich ist — die entscheidende visuelle Frage (verschwindet das Y-Einschwingen wirklich, bleibt `chartSettled` zuverlässig) ist code-analytisch hergeleitet, nicht empirisch verifiziert.

## Ausgangsproblem

- **Browser-Befund:** Nach AP-08b4a funktioniert die Sequenz strukturell, aber Chart.js' Default-Tweening-Animation wirkt kognitiv falsch — der Graph scheint sich bei jedem Journey-Update vollständig neu aufzubauen und am rechten Ende von unten nach oben einzuschwingen, statt ruhig linear nach rechts zu wachsen. Das erzeugt visuelle Energie ohne zusätzliche Datenbedeutung.
- **Warum Chart.js-Default-Tweening kognitiv falsch ist:** Auf Screen 2 ist der Chart nicht der Hauptdarsteller. Die semantische Bewegung ist bereits vollständig durch Pulse (Zielpunkt) und Card-to-Point (Karte fliegt zum Punkt) abgedeckt. Eine zusätzliche, davon unabhängige Chart.js-eigene Tweening-Animation (Linie wächst, Y-Achse schwingt ein) konkurriert visuell mit dieser eigentlichen Bedeutung und suggeriert fälschlich eine "Wertbewegung", die es fachlich nicht gibt (die Linie zeigt nur denselben, bereits bekannten historischen Verlauf bis zu einem neuen Endpunkt).
- **Warum Flugzeit-Verlängerung nicht Hauptlösung ist:** Die von Albert testweise gesetzte `--fw-card-to-point-flight-duration: 1350ms` betrifft ausschließlich die CSS-Transition des Card-to-Point-Flugs (`app.css`/`getFlightDurationMs()` in `app.js`, unverändert seit AP-08b) — sie ändert nichts an der Chart.js-Tweening-Animation selbst, die das eigentliche Problem ist. Sie bleibt in diesem AP unverändert (weder weiter erhöht noch reduziert), da sie ein reines Beobachtungs-/UX-Hilfsmittel ist, kein Fix für das Kernproblem.

## Architekturentscheidung

- **Warum nicht Rucksack/fwContext:** `fwContext` beantwortet laut `Der Rucksack (Context Object Pattern).md` (KDR 9) ausschließlich „Was ist der Chart semantisch?" (`chartType`, `axisType`, `rhythm`, `dataRange`, `viewMode`, `valueMode`, `currency`). `renderMotion` beantwortet dagegen „Wie soll dieser konkrete Renderlauf ausgeführt werden?" — eine flüchtige Prozesssteuerung des Managers (Layer 2), keine semantische Chart-Identität. Eine Ablage in `fwContext` würde Motion-Steuerung mit Fachsemantik vermischen — genau das Muster, das `CHART_PLUGIN_ARCHITEKTUR.md` §10 bereits für Plugin-State verbietet und das hier analog für Render-Aufträge gilt.
- **Warum nicht LineChartStrategy:** `LineChartStrategy.js` ist laut `ARCHITECTURE STRATEGY PAPER VX.md` Layer 3 („The Brain" — wandelt Daten in Chart-Konfigurationen, packt den Rucksack). Sie ist für den Normalfall gebaut, in dem Chart.js-Default-Animation weiterhin erwünscht ist (z. B. Screen 3, Screen 4, jede andere App). Eine Änderung dort hätte zwangsläufig alle Nutzer dieser Strategie betroffen oder eine bedingte Sonderlogik erzwungen — genau das in diesem AP explizit verbotene App-/Screen-Wissen in einer Layer-3-Datei.
- **Warum ChartEngine/Manager:** `ChartEngine._draw()` (Layer 2) steuert bereits den gesamten Render-Lifecycle (Smart-Update-Pfad, `chart.update()`-Aufruf, Reduced-Motion-Weiche, `chartSettled`-Vermittlung). Ein Render-Auftrag wie `renderMotion.mode` gehört exakt in diese Schicht — sie „kennt" Chart.js-Verhalten bereits (das ist ihre Aufgabe laut Architekturpapier: „Steuert Prozess, Lifecycle und konkrete Renderläufe"), ohne dass `app.js` selbst Chart.js-Internals berühren müsste.
- **Warum keine Sonderlocke:** Der Contract prüft ausschließlich `options.renderMotion.mode === 'instant'` — ein reiner Datenwert aus den Aufruf-Options, kein `if (appId === 'prokrastinations-preis')`, kein `if (screen === 2)`, kein `if (journeyMode)`. `ChartEngine.js` kennt nach dieser Änderung weiterhin keine App-, Screen- oder Journey-Begriffe (per Grep bestätigt, s. u.).
- **Warum übertragbar auf weitere Apps:** Jede App, die für einen bestimmten Renderlauf Chart.js-Tweening unterdrücken will (z. B. weil eine andere UI-Bewegung bereits die semantische Aufgabe übernimmt), kann `renderMotion: { mode: 'instant' }` genau wie `chartSettled`/`anchorMeasurement` einfach mitgeben — ohne eigenes Wissen über `update('none')`, `animation.onComplete` oder sonstige Chart.js-Interna.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Bau): ` M .claude/learning/session-log.md`, ` M Apps/prokrastinations-preis/app.css` (inkl. der testweisen `1350ms`-Änderung), ` M Apps/prokrastinations-preis/app.js`, ` M Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, ` M Theme/assets/js/fw-chart-engine/plugins/index.js`, ` M docs/steering/BACKLOG.md` + bekannte `??`-Neuzugänge (Plugin-Datei, AP-08a/08b/08b2/08b3/08b4a-Protokolle, Chronik) — alles bereits aus AP-08b–08b4a bekannt
- `git diff --name-status` (vor Bau): identisch zur obigen Liste
- `git log --oneline -10`: `ca45c94` (AP-prokrast-07a-07d, committed) bis `7104b77` — lückenlos, kein Commit aus AP-08-Kette
- **Liegt `--fw-card-to-point-flight-duration: 1350ms` vor?** Ja, bestätigt in `app.css` (`.fw-app`-Regel). Diese Änderung wurde außerhalb eines formalen AP als von Albert explizit angeordneter Light-Gate-Patch vorgenommen (kein Gate verlangt, direkte Anweisung „Ändere einfach die Variable"), nicht in AP-08b5 selbst. In diesem AP bewusst unverändert gelassen (s. Ausgangsproblem).

Keine unerwarteten Änderungen. Gate-Voraussetzung erfüllt.

## Gelesene Quellen

- `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b2_llm-review-kontext.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b3_chart-settled-gate_card-to-point_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b4a_architektur-gate_anchormeasurement_chartsettled_Ergebnis.md` — vollständig
- `Apps/prokrastinations-preis/app.js` — vollständig (vor und nach Änderung)
- `Apps/prokrastinations-preis/app.css` — geprüft (Fluggeschwindigkeits-Variable bestätigt, keine weitere Änderung in diesem AP)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig (vor und nach Änderung)
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — vollständig gelesen (Diagnosequelle, nicht geändert — bereits in AP-08b4a vollständig gelesen, hier erneut auf `animation`-Bezug geprüft: keine `animation`-Option in `getChartConfig()`, unverändert)
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`, `docs/spec/Der Rucksack (Context Object Pattern).md`, `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`, `docs/spec/APP-INTERFACE.md` — aus Vorgänger-APs bereits belastbar geklärt, für die Architekturentscheidung dieses APs gezielt referenziert (KDR 9, Layer-2/3-Schichtung, §10 Plugin-State), nicht erneut vollständig neu gelesen
- `Theme/assets/js/fw-chart-engine/strategies/BarChartStrategy.js`, `PieChartStrategy.js` — nicht gelesen; nicht nötig, da `renderMotion` ausschließlich in `ChartEngine._draw()` (Layer 2, strategieunabhängig) implementiert wurde und keine Strategie-Datei berührt

## Design-Gate vor Code

- **renderFromData-Optionspfad:** `ChartEngine.renderFromData(container, chartSeries, options)`, Options-Validierung Zeilen ~146–250, Speicherung in `state.config`/`state.<x>Callback` in beiden State-Zweigen (Creation/Update).
- **Bestehender chartSettled-Contract:** Ja (AP-08b3) — folgt exakt demselben Muster (Validierung → `state.config` → Anwendung in `_draw()`), diente als direktes Vorbild für `renderMotion`.
- **Smart-Update-Pfad:** `if (state.chartInstance) {...}`-Zweig in `_draw()`, `state.chartInstance.update(...)`-Aufruf ist die einzige Stelle im Modul.
- **Reduced-Motion-Pfad:** `_prefersReducedMotion()` (globale System-Präferenz) steuert zwei Stellen — `chartConfig.options.animation = false` bei Erstellung, `update('none')` bei Update. Beide Stellen wurden für `renderMotion.mode === 'instant'` additiv um dieselbe Bedingung erweitert (`||`-Verknüpfung), ohne die Reduced-Motion-Logik selbst zu verändern.
- **Zusammenspiel chartSettled mit instant/none:** Bereits in AP-08b3 gelöst — bei `'none'`-Modus feuert `animation.onComplete` nicht, daher reicht `_emitChartSettled()` das Signal synchron direkt nach `.update()` nach. Diese bestehende Logik wurde nur um die zusätzliche Auslösebedingung `renderMotion.mode === 'instant'` erweitert (`instantUpdate = reducedMotionUpdate || renderMotion.mode === 'instant'`), nicht neu gebaut.
- **Entscheidung Contract-Name:** `renderMotion.mode` (statt `chartMotion.mode`) — „Motion" bezieht sich auf den Renderlauf/Prozess (Layer-2-Zuständigkeit), nicht auf den Chart als Objekt.
- **Erlaubte Werte:** `'default'` (fehlend oder Feld mit anderem Wert — keine Änderung am Verhalten) und `'instant'` (unterdrückt Chart.js-Tweening für diesen einen Aufruf).
- **Default unverändert:** Ja — ohne `renderMotion` oder mit `mode !== 'instant'` ändert sich an keiner Stelle etwas gegenüber dem Vor-AP-08b5-Verhalten (Bedingungen bleiben additiv `||`-verknüpft mit dem bereits bestehenden `reducedMotionUpdate`).
- **Kein App-/Screen-Wissen in ChartEngine:** Bestätigt — `ChartEngine.js` prüft ausschließlich `options.renderMotion.mode === 'instant'`, keinen App-Namen, keine Screen-Nummer, kein Journey-Begriff (per Grep bestätigt, s. u.).
- **Kein fwContext-Eingriff:** Bestätigt — `renderMotion` wird nirgends an `_createFwContext(...)` (in `LineChartStrategy.transform()`) übergeben oder dort gelesen; `LineChartStrategy.js` ist unverändert (per `git diff` bestätigt, kein Diff).
- **Kein LineChartStrategy-Eingriff:** Bestätigt — kein Diff.

Alle elf Design-Gate-Fragen waren sauber beantwortbar — kein Stopp nötig.

## Gewählte Implementierung

- **ChartEngine:** `renderFromData()` validiert `options.renderMotion` (nur `mode === 'instant'` wird übernommen, alles andere ergibt `renderMotion = null` → Default-Verhalten). Gespeichert in `state.config.renderMotion` (beide State-Zweige). In `_draw()`: (1) Update-Pfad — `instantUpdate = reducedMotionUpdate || runtimeConfig.renderMotion?.mode === 'instant'`, steuert sowohl `update('none')` als auch das synchrone `chartSettled`-Nachreichen; (2) Creation-Pfad — dieselbe `||`-Bedingung unterdrückt zusätzlich `chartConfig.options.animation` bei der Erst-Erstellung (`new Chart()`), analog zur bestehenden Reduced-Motion-Behandlung dort.
- **app.js:** `renderMotion: { mode: 'instant' }` in `renderJourneyChartOnly()` (deckt sowohl den Screen-2-Ersteintritt als auch den Zyklus-2-Übergang in `enterNextCard()` ab, da beide dieselbe Funktion nutzen) und in `revealCurrentStationPoint()` (Zyklus 1) ergänzt. Screen 1/3/4 (`renderS3()`, `renderScreen4Chart()`) bleiben unverändert bei Chart.js-Default-Animation.
- **CSS:** keine Änderung in diesem AP. Die bereits vorhandene `--fw-card-to-point-flight-duration: 1350ms` bleibt unangetastet.
- **chartSettled-Zusammenspiel:** Unter `instant` feuert `chartSettled` jetzt über denselben synchronen Pfad wie unter Reduced Motion — kein Doppel-Feuern (die `instantUpdate`-Bedingung wird nur einmal pro `_draw()`-Aufruf ausgewertet und der Emit nur einmal aufgerufen), kein Feuern vor dem Update (der Emit steht im Code direkt nach `state.chartInstance.update(...)`, nie davor).
- **Reduced Motion:** unverändert in ihrer eigenen Auslösebedingung (`_prefersReducedMotion()`); `renderMotion.mode === 'instant'` wirkt zusätzlich und unabhängig — ein Nutzer mit Reduced-Motion-Präferenz UND ein Journey-Chart mit `renderMotion:'instant'` erzeugen exakt dasselbe (bereits vorher korrekte) Instant-Verhalten, ohne dass sich die beiden Bedingungen gegenseitig stören (reines `||`, kein Konflikt möglich).

## Geänderte Dateien

| Datei | Änderung | Warum im Scope | Nach Write wiedergelesen? |
|---|---|---|---:|
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | neuer `renderMotion`-Optionsvertrag in `renderFromData()` (beide State-Zweige); `instantUpdate`-Verknüpfung im Smart-Update-Pfad (Update + synchrones `chartSettled`-Nachreichen); Erweiterung der Reduced-Motion-Bedingung im Creation-Pfad | einzige laut Auftrag erwartete Engine-Datei | ja |
| `Apps/prokrastinations-preis/app.js` | `renderMotion: { mode: 'instant' }` in `renderJourneyChartOnly()` und `revealCurrentStationPoint()` ergänzt | einzige laut Auftrag erwartete App-Datei | ja |
| `docs/steering/patches/AP-prokrast-08b5_rendermotion_instant_screen2_journey_Ergebnis.md` | neu (dieses Protokoll) | Pflicht-Ergebnisdatei | wird nach Write geprüft |

**Nicht geändert (bewusst):** `Apps/prokrastinations-preis/app.css` (keine Änderung nötig — die Flugzeit-Variable ist unabhängig vom Chart-Tweening-Problem), `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` (Diagnosequelle, wie im Auftrag verlangt, nicht Patch-Ziel), `BarChartStrategy.js`, `PieChartStrategy.js` (nicht gelesen, nicht berührt), alle vier Plugin-Dateien, `plugins/index.js`.

## Zielsequenz

| Schritt | Erwartung | Code-/Browser-Beleg |
|---|---|---|
| Klick | State Machine startet (`journeyState = 'chart-revealing'`) | unverändert aus AP-08b3/08b4a |
| Chart instant/final | Chart springt ohne Tweening auf den neuen Zielzustand | `revealCurrentStationPoint()` und `renderJourneyChartOnly()` setzen jetzt `renderMotion:{mode:'instant'}` → `ChartEngine` nutzt `update('none')` statt Default-Animation — code-analytisch belegt, Browser-Bestätigung offen |
| kein Y-Einschwingen | Y-Achse springt direkt auf ihren finalen Wert, kein eased Übergang | Chart.js' `update('none')`-Modus deaktiviert laut Dokumentation sämtliche Animationen dieses Update-Zyklus, nicht nur Datenpunkte — Browser-Bestätigung offen |
| Punkt X pulst | `FwAnnotationPulsePlugin` erkennt die Station als „newly-added" | unverändert aus AP-08b2/08b3, keine Plugin-Änderung in diesem AP |
| Karte X fliegt | `flyCardToPoint()` startet erst nach `chartSettled` | unverändert aus AP-08b3 — `chartSettled` feuert jetzt zuverlässig auch unter `instant`, code-analytisch belegt |
| Puls X wird Kringel | `FwAnnotationPulsePlugin`-eigenes Timing (1200ms, unverändert) | unverändert, keine Plugin-Änderung |
| Karte X+1 erscheint | Erst nach `enterNextCard()`s zweitem gegateten Zyklus | unverändert aus AP-08b4a, jetzt zusätzlich mit `renderMotion:'instant'` für den Chart-Teil |

## A11y / Reduced Motion

- **Live-Region:** unverändert — wird ausschließlich in `renderJourneyCardOnly()` gesetzt, von diesem AP nicht berührt.
- **Fokus:** unverändert.
- **aria-hidden Clone:** unverändert, `flyCardToPoint()` in diesem AP nicht angefasst.
- **Keyboard:** unverändert — Guard `journeyState !== 'idle'` bleibt bestehen.
- **Reduced Motion:** bleibt kausal korrekt — `_prefersReducedMotion()` und `renderMotion.mode==='instant'` sind unabhängige, additiv verknüpfte (`||`) Bedingungen; keine der beiden kann die andere unterdrücken oder mit ihr in Konflikt geraten.
- **chartSettled unter instant:** feuert zuverlässig — derselbe synchrone Nachreich-Pfad, der bereits für Reduced Motion bewiesen war (AP-08b3), wird jetzt zusätzlich durch `renderMotion.mode==='instant'` ausgelöst, ohne Sonderfall-Code.

## Deterministische QA

### app.js Chart.js-Internals-Grep

Befehl: `grep -nE "chart\.scales|getDatasetMeta|getPixelForValue|chartArea|Chart\.getChart|chart\.update\(" Apps/prokrastinations-preis/app.js`
Ergebnis: keine Treffer
Bewertung: bestanden — `app.js` liest weiterhin keine Chart.js-Internals und ruft `chart.update()` nirgends selbst auf.

### fwContext-Missbrauch-Grep

Befehl: `grep -RIn "renderMotion|chartMotion|motionMode|updateTransition" Theme/assets/js/fw-chart-engine Apps/prokrastinations-preis docs/spec docs/steering/patches`
Ergebnis: Treffer ausschließlich in `ChartEngine.js` (Contract-Definition + Anwendung, erlaubt) und `app.js` (zwei neutrale Renderaufträge `renderMotion:{mode:'instant'}`, erlaubt). Keine Treffer in `fwContext`-Erzeugung, keine Treffer in Strategy-Dateien, keine Treffer in der Rucksack-Spec.
Bewertung: bestanden — kein Motion-Feld in `fwContext`, kein Strategy-Eingriff.

### LineChartStrategy-Diff

Befehl: `git diff -- Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`
Ergebnis: kein Diff (leere Ausgabe)
Bewertung: bestanden

### Plugin-Diff

Befehl: `git diff -- Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js`
Ergebnis: kein Diff (leere Ausgabe)
Bewertung: bestanden

### _fwGeometry-Grep

Befehl: `grep -RIn "_fwGeometry" Theme/assets/js/fw-chart-engine Apps/prokrastinations-preis docs/spec docs/steering/patches`
Ergebnis: Treffer nur im Kopfkommentar von `FwAnchorMeasurementPlugin.js` (dokumentiert das Verbot, unverändert seit AP-08b) und in bereits vorhandenen, historisch als Drift markierten Spec-Dateien (`CHART_PLUGIN_ARCHITEKTUR.md`)
Bewertung: bestanden — keine neue produktive Verwendung

### Scope-QA

Befehl: `git diff --name-status`
Ergebnis: `.claude/learning/session-log.md`, `Apps/prokrastinations-preis/app.css` (nur die bereits vor diesem AP vorgenommene `1350ms`-Änderung), `Apps/prokrastinations-preis/app.js`, `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `Theme/assets/js/fw-chart-engine/plugins/index.js` (unverändert seit AP-08b, kein neuer Diff in diesem AP), `docs/steering/BACKLOG.md`
Bewertung: bestanden — nur erlaubte Dateien plus bekannte Vor-AP-Dateien, keine verbotene Datei berührt.

## Browser-QA

- **durchgeführt:** nein — in dieser Umgebung kein Browser-/Live-Server-Zugriff verfügbar
- **Browser/Viewport:** —
- **7/7 Stationen:** nicht geprüft (unverändert an der Stationslogik, kein Grund zur Regression erkennbar, aber nicht empirisch bestätigt)
- **S/M/L:** offen
- **Reduced Motion:** offen
- **Sequenz bestätigt:** offen — insbesondere die zentrale visuelle Frage (verschwindet das Y-Einschwingen tatsächlich sichtbar) ist nicht empirisch verifiziert
- **offene Punkte:** vollständige Browser-Bestätigung der Zielsequenz aus diesem und den vorherigen AP-08b-Protokollen

## Datenwahrheit

- Stationsdaten unverändert: bestätigt (`stations.de.json` nicht im Diff)
- Finanzdaten unverändert: bestätigt (`Theme/assets/data/**` nicht im Diff)
- keine Zukunftsdaten: bestätigt
- keine Dummy-Datasets: bestätigt
- keine Future-Line: bestätigt
- keine Prognose: bestätigt

## Regression

- Screen 1: nicht angefasst
- Screen 3: nicht angefasst (`renderS3()` setzt kein `renderMotion`, bleibt bei Chart.js-Default-Animation)
- Screen 4: nicht angefasst (`renderScreen4Chart()` setzt kein `renderMotion`, bleibt bei Chart.js-Default-Animation)
- RubikonSymbolMarkers: nicht angefasst
- AP-07: nicht angefasst
- TC-F05 nicht wieder geöffnet: bestätigt, kein Bezug in diesem AP

## Risiken

| Risiko | Kategorie | Blockierend? | Empfehlung |
|---|---|---:|---|
| Browser-Bestätigung der gesamten RenderMotion-Wirkung steht komplett aus | QA-Lücke | ja für GRÜN, nein für GELB | Albert-Test im lokalen Live-Server ist Pflichtvoraussetzung für ein GRÜN-Protokoll |
| Chart.js' `update('none')`-Verhalten bezüglich vollständiger Animationsunterdrückung (inkl. Achsen-Tweening, nicht nur Datenpunkte) ist aus Dokumentation hergeleitet, nicht in diesem Environment lauffähig getestet | technisches Restrisiko | nein, aber substanziell | im Browser-Test explizit beobachten, ob Y-Achse wirklich sofort final steht |
| No-op-Bootstrap (AP-08b2/08b4a, weiterhin HÄRTEN mit offener Folgepflicht) ist von diesem AP unberührt, aber weiterhin ungelöst | technische Schuld, dokumentiert | nein | unverändert: Masterfaden-Entscheidung vor CHART_PLUGIN_ARCHITEKTUR.md-Dokumentation von AnchorMeasurement/chartSettled/renderMotion als Plattform-Pattern einholen |
| Drei Engine-Contracts (`anchorMeasurement`, `chartSettled`, `renderMotion`) sind jetzt alle in Screen-2-Journey-Aufrufen kombiniert aktiv — Interaktionsreihenfolge in `_draw()` (Plugin-Registrierung → animation-Komposition → update-Aufruf → Settled-Emit) ist bislang nur einzeln, nicht in Kombination browsergetestet | Komplexitätsrisiko | nein | im Browser-Test gezielt beobachten, ob alle drei Signale gemeinsam sauber zusammenspielen |

## Nicht geändert

- APP_SPEC.md: nicht geändert
- Drehbuch: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- Finanzdaten: nicht geändert
- FwAnnotationPulsePlugin.js: nicht geändert
- FwChartTextPlugin.js: nicht geändert
- FwVerticalLinePlugin.js: nicht geändert
- FwAnchorMeasurementPlugin.js: nicht geändert
- LineChartStrategy.js: nicht geändert
- Screen 4: nicht geändert
- RubikonSymbolMarkers: nicht geändert

## Entscheidung für Masterfaden

- **RenderMotion-Contract behalten/härten/ersetzen/zurückbauen:** BEHALTEN (vorbehaltlich Browser-Bestätigung) — erfüllt alle vier Kriterien (produktlogisch richtig, spec-konform, plattformfähig, wartbar) nach demselben Muster wie `chartSettled` in AP-08b4a; kein Registrierungsproblem wie bei `anchorMeasurement`/No-op-Bootstrap, da rein optionsbasiert und bei jedem `_draw()`-Aufruf frisch ausgewertet.
- **No-op-Bootstrap-Folgepflicht unverändert:** ja, weiterhin offen (AP-08b2/08b4a), von diesem AP nicht berührt.
- **nächster empfohlener AP:** Browser-Bestätigung durch Albert (kein neuer AP, sondern Testfeedback zu diesem AP); danach entweder GRÜN-Nachtrag oder AP-prokrast-08c (Abschluss-QA); unabhängig davon bleibt die Masterfaden-Entscheidung zur No-op-Bootstrap-Folgepflicht offen.
- **ausdrücklich nicht:** Commit, Abschlussritual, AP-07-Nacharbeit, Spec-Sync ohne Masterentscheidung.
