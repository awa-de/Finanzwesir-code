# AP-prokrast-08b2 — Kontextdokument für externes LLM-Review

Stand: 2026-07-06 | Geschrieben von: Claude (ausführendes Modell dieser AP-Kette) | Zweck: vollständiger, in sich geschlossener Kontext für ein Review durch ein anderes LLM (kein Vorwissen aus diesem Chatverlauf vorausgesetzt)

**Wichtig für den Reviewer:** Dies ist kein offizielles Ergebnisprotokoll im Sinne des Projektformats (das folgt separat als `AP-prokrast-08b2_sequenzkorrektur_card-to-point_Ergebnis.md`). Dies ist eine explizit von Albert (Projektinhaber) angeforderte, ehrliche Rekonstruktion des gesamten bisherigen Wegs — inklusive eines Bugs, den Albert live im Browser gefunden hat, und eines zweiten Bugs, den ich (Claude) danach selbst beim Nachdenken über die Architektur gefunden und gerade behoben habe, ohne dass er bereits im Browser bestätigt wurde. Bitte diesen Unterschied (browserbestätigt vs. nur code-analytisch hergeleitet) beim Review im Blick behalten.

---

## 1. Projektkontext (Minimum, das ein Reviewer braucht)

- Projekt: „Finanzwesir 2.0", ein Ghost-Blog mit eingebetteten interaktiven Apps.
- Betroffene App: `Apps/prokrastinations-preis/` — eine „geführte historische Stationen-Zeitreise", die zeigt, dass Warten Marktzeit kostet. Screen 2 dieser App führt den Nutzer durch 7 historische Marktereignisse (Trump-Wahl 2016, Bitcoin-Hype 2017, Corona-Crash 2020, Impfstoff-Rally 2020, Ukraine-Invasion 2022, Nvidia/KI 2024, „SaaS-Apokalypse" 2026), jeweils als „Ereigniskarte" mit Schlagzeile.
- Betroffene Engine: `Theme/assets/js/fw-chart-engine/` — eine zentrale, app-übergreifende Chart.js-Wrapper-Engine mit strikter Layer-Architektur (Vault/Manager/Brains/Curator/Face) und einer eigenen Plugin-Architektur-Spec (`docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`).
- Zentrale Architekturregel (aus `docs/spec/APP-INTERFACE.md` §4): Apps dürfen **keine** Chart.js-Internals (`chart.scales`, `getDatasetMeta`, `getPixelForValue`, `chartArea`, `Chart.getChart`) direkt lesen. Die Engine ist die einzige Schicht, die Chart.js kennt.

## 2. Produktziel dieser AP-Kette

Auf Screen 2 soll beim Übergang von einer Station zur nächsten eine „Card-to-Point"-Animation entstehen: Die aktuell sichtbare Ereigniskarte soll sich sichtbar zu dem Chart-Punkt bewegen, der dieses Ereignis repräsentiert, dort „ankommen" (der Punkt pulst), und erst danach erscheint die nächste Karte. Kernbotschaft an den Nutzer: „Dieses Ereignis gehört zu diesem Punkt im Chart."

## 3. AP-Kette bisher

```
AP-prokrast-08a  — Koordinaten-Schnittstellenanalyse (read-only)
AP-prokrast-08b  — AnchorMeasurement v1 (Plattform) + erste Card-to-Point-Implementierung
AP-prokrast-08b  (Nachtrag) — Fluggeschwindigkeits-Schalter (Albert: „Animation zu schnell")
AP-prokrast-08b2 — Sequenzkorrektur (Albert fand: Karte fliegt vor Chart-Update ins Nirgendwo)
AP-prokrast-08b2 (dieser Nachtrag) — Regressionsbug nach der Sequenzkorrektur behoben (Albert: „Flug findet gar nicht mehr statt")
```

Kein Schritt in dieser Kette wurde committet. Kein Abschlussritual wurde durchgeführt.

---

## 4. AP-prokrast-08a — Schnittstellenanalyse (Ausgangspunkt)

**Frage:** Gibt es bereits eine Möglichkeit, aus `app.js` heraus die Pixel-Position eines Chart-Punkts zu bekommen, ohne die Architekturregel (kein Chart.js-Internal-Zugriff in `app.js`) zu verletzen?

**Befund:** Nein. Es gab drei bestehende Chart.js-Plugins (`FwVerticalLinePlugin`, `FwChartTextPlugin`, `FwAnnotationPulsePlugin`), die alle intern Chart.js-Pixelkoordinaten lesen (`chart.getDatasetMeta(...)`, `chart.scales`), aber keins von ihnen gibt diese Koordinate nach außen. `FwChartTextPlugin.js` dokumentiert sogar explizit als Nicht-Ziel: „keine Pixelkoordinaten nach außen, keine Card-to-Point-API". `app.js` selbst enthielt zu diesem Zeitpunkt keinerlei Chart.js-Internal-Zugriff.

**Entscheidung:** Variante B — ein neues, kleines, opt-in Plugin bauen, das eine Pixelkoordinate über einen von der Engine vermittelten Kanal nach außen gibt. Keine Erweiterung bestehender Plugins (das hätte deren dokumentierte Nicht-Ziele gebrochen). Keine Nutzung von `fwContext` (laut Rucksack-Spec strikt Domain-Semantik, keine Pixeldaten). Kein `chart._fwGeometry` (ein in der Spec explizit als tot und nicht reaktivierbar dokumentierter Alt-Mechanismus).

Ergebnisdatei: `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md`

---

## 5. AP-prokrast-08b — AnchorMeasurement v1 (Plattform) + erste Implementierung

### 5.1 Was gebaut wurde

**Neues Plugin:** `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js`

Ein Chart.js-Plugin mit `id: 'fwAnchorMeasurement'` und einem `afterDraw(chart)`-Hook. Es liest `chart.options.plugins.fwAnchorMeasurement` (nur wenn `enabled === true`), berechnet für jeden übergebenen Anker (`{id, x, y}` in Datenkoordinaten) die Pixelposition über `chart.scales.x.getPixelForValue(a.x)` / `chart.scales.y.getPixelForValue(a.y)` (das ist der von `CHART_PLUGIN_ARCHITEKTUR.md` §7 offiziell sanktionierte Weg, Pixelpositionen aus Datenwerten abzuleiten — kein Hack), prüft Sichtbarkeit gegen `chart.chartArea`, und ruft — falls in den Options gesetzt — `opts.onMeasurement(measurements)` auf. Das Plugin kennt keine App-/Screen-/Card-/Station-Begriffe, importiert nichts, schreibt nirgends Domain-State.

**Barrel:** `Theme/assets/js/fw-chart-engine/plugins/index.js` exportiert das neue Plugin zusätzlich.

**ChartEngine (`Theme/assets/js/fw-chart-engine/core/ChartEngine.js`):**
- `renderFromData(container, chartSeries, options)` validiert jetzt zusätzlich `options.anchorMeasurement` (nur `enabled === true` aktiviert etwas), speichert `anchors` in `state.config.anchorMeasurement` und den **App-Callback separat** in `state.anchorMeasurementCallback` (bewusst nicht im selben Objekt, das an Chart.js/das Plugin weitergereicht wird).
- `_draw()` registriert das Plugin bei `runtimeConfig.anchorMeasurement?.enabled` und setzt `chartConfig.options.plugins.fwAnchorMeasurement = { enabled: true, anchors: ..., onMeasurement: (raw) => this._emitAnchorMeasurements(container, state, raw) }`. Der `onMeasurement`-Callback, den das Plugin aufruft, ist **eine ChartEngine-eigene Methode**, nicht der App-Callback.
- Neue Methode `_emitAnchorMeasurements(container, state, rawMeasurements)`: übersetzt Canvas-relative Pixel in Container-relative Pixel (`canvas.getBoundingClientRect()` vs. `container.getBoundingClientRect()` — Standard-DOM-Geometrie, kein Chart.js-Internal-Zugriff), friert das Ergebnis ein (`Object.freeze`), und ruft **erst dann** `state.anchorMeasurementCallback` auf — das ist der eigentliche, in `app.js` definierte Callback.

Damit ist die Kette real dreistufig: **Plugin misst → ChartEngine übersetzt/vermittelt → app.js bekommt nur fertige Zahlen.** Das Plugin hält nie eine Referenz auf den App-Callback; es kennt nur die ChartEngine-eigene Vermittlungsfunktion.

**app.js — erste Card-to-Point-Umsetzung (jetzt durch AP-08b2 überholt, s. Abschnitt 6):**
- `renderJourneyStep(stationIdx)` aktivierte `anchorMeasurement` für den Punkt der *aktuell gerade angezeigten* Station und schrieb das Ergebnis in eine Closure-Variable `currentStationAnchorMeasurement`.
- Beim Klick auf „Weiter investiert bleiben" wurde ein `aria-hidden`/`inert`-DOM-Klon der aktuellen Karte erzeugt (`flyCardToPoint()`), der zu genau dieser zwischengespeicherten Position flog; **danach erst** wurde `renderJourneyStep(nextIndex)` für die nächste Station aufgerufen.

### 5.2 Nachtrag innerhalb AP-08b: Fluggeschwindigkeit

Albert testete und fand die Fluganimation zu schnell. Fix: ein zentraler CSS-Schalter `--fw-card-to-point-flight-duration` (definiert auf `.fw-app`, Default von 300ms auf 450ms erhöht). `app.js` liest denselben Wert über `getFlightDurationMs()` aus, damit CSS-Transition-Dauer und JS-Timeout nie auseinanderlaufen. Zusätzlich wurde auf Alberts ausdrücklichen Wunsch ein BACKLOG-Eintrag (`DS-FOLLOWUP-08`) angelegt und `docs/steering/BACKLOG.md` aktualisiert (bewusste Abweichung von der ursprünglich engeren Dateiliste des AP-08b-Prompts, gedeckt durch Alberts explizite Anweisung in der Session).

Ergebnisdatei: `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md`

---

## 6. AP-prokrast-08b2 — Sequenzkorrektur (Albert-Bugreport #1)

### 6.1 Der von Albert live beobachtete Fehler

Albert beobachtete im Browser folgende, dramaturgisch falsche Reihenfolge:

```
1. Klick auf „Weiter investiert bleiben"
2. Die Karte fliegt los
3. Der Chart ist noch auf altem Stand
4. Die Karte fliegt dadurch nach unten ins Nirgendwo
5. Danach aktualisiert sich der Chart
6. Die Grafik baut sich auf den neuen Stand auf
7. Der pulsierende Punkt erscheint
8. Die nächste Karte erscheint
```

Kernproblem: Der Zielpunkt existierte zum Zeitpunkt des Flugstarts noch nicht als sichtbares, pulsierendes Element — er war lediglich der unmarkierte, kommentarlose Endpunkt der aktuell gezeichneten Linie. Für den Nutzer ist ein Flug zu einem nicht erkennbaren Ziel nicht verständlich.

**Meine Einordnung (Claude) zur wahrscheinlichsten technischen Ursache**, ohne dass ich das im Browser nachstellen konnte: In der AP-08b-Version wurde `currentStationAnchorMeasurement` aus dem `afterDraw`-Callback des Plugins befüllt, der bei **jedem** Chart.js-Draw-Frame feuert — auch während einer noch laufenden Chart.js-eigenen Reveal-/Update-Animation (Chart.js animiert Punkte/Linien standardmäßig über ca. 1000ms). Klickte der Nutzer, bevor diese interne Animation vollständig „eingerastet" war, konnte die zwischengespeicherte Messung eine Zwischen-Frame-Position widerspiegeln statt der finalen Ruheposition — was ein Wegfliegen „nach unten" plausibel erklären würde, da Chart.js Linien/Punkte typischerweise von der Nulllinie nach oben einblendet. Ich kann diese Ursache aber nicht als einzige/sichere Erklärung belegen, da mir kein Browser zur Verfügung steht. Wichtiger als die exakte Ursache war für den Redesign-Auftrag von Albert: **das strukturelle Problem** (Ziel existiert zum Flugstart-Zeitpunkt noch nicht als echtes, sichtbares/pulsierendes Chart-Element) — und dieses strukturelle Problem wird durch das Redesign unabhängig von der exakten Ursache behoben.

### 6.2 Von Albert vorgegebene neue Soll-Sequenz

```
Klick → Chart-Reveal (Chart wächst auf den Stand der aktuell sichtbaren Karte)
      → Zielpunkt erscheint und pulst
      → Card-Flight (Klon fliegt zum jetzt pulsierenden, gemessenen Punkt)
      → nächste Karte erscheint erst danach
```

Als explizite kleine State Machine vorgegeben: `idle → chart-revealing → point-pulsing-ready → card-flying → next-card-entering → idle`.

Nicht verhandelbare Regel: „Die Karte darf erst fliegen, wenn ihr Ziel sichtbar ist." Kein Card-Flight ohne sichtbaren Zielpunkt. Keine nächste Karte vor Flight-Ende.

### 6.3 Was ich (Claude) daraufhin umgebaut habe

**Kernidee:** Den bisherigen einen atomaren Render-Aufruf (`renderJourneyStep`, der gleichzeitig Kartenwechsel UND Chart-Update erledigte) in zwei getrennte Phasen aufteilen:

1. **Neue Funktion `revealCurrentStationPoint(stationIdx, onPointReady)`** (in `app.js`): Rendert den Chart für die *aktuell sichtbare* Karte neu — aber diesmal mit der aktuellen Station bereits als Vergangenheits-Annotation eingeschleust (`buildJourneyStationAnnotations(journeyStations.slice(0, stationIdx + 1), ...)` statt `slice(0, stationIdx)` wie im normalen „Idle"-Rendering). Dadurch erkennt das bereits bestehende `FwAnnotationPulsePlugin` (unverändert, nicht angefasst) diesen Punkt als „newly-added" und lässt ihn pulsen — ganz ohne jede Plugin-Änderung, rein durch die veränderte Annotationsliste. Gleichzeitig aktiviert dieser Aufruf `anchorMeasurement` für genau diesen Punkt; sobald das Measurement mit `visible: true` zurückkommt, wird `onPointReady(measurement)` aufgerufen.

2. **Journey-Button-Click-Handler umgebaut** auf eine kleine State Machine (`journeyState`-Variable: `'idle' | 'chart-revealing' | 'point-pulsing-ready' | 'card-flying' | 'next-card-entering'`):
   - Klick → falls nicht `idle`, Klick ignorieren (kein Button-Disable, um kein Fokusverlust-Risiko einzugehen — bewusste, dokumentierte Entscheidung).
   - `journeyState = 'chart-revealing'`, `revealCurrentStationPoint()` aufrufen.
   - Deren Callback (`handlePointReady`) setzt `journeyState = 'point-pulsing-ready'` und startet — außer bei `prefers-reduced-motion` oder fehlendem/unsichtbarem Measurement — den Kartenflug (`journeyState = 'card-flying'`, `flyCardToPoint(measurement, enterNextCard)`).
   - `flyCardToPoint()` selbst ist unverändert aus AP-08b übernommen (Klon-Erzeugung, `aria-hidden`, `inert`, IDs entfernt, CSS-Transition über den zentralen Geschwindigkeits-Schalter).
   - Erst nach Abschluss des Flugs (`onComplete`-Callback) wird `enterNextCard()` aufgerufen: `journeyState = 'next-card-entering'`, `activeStationIndex++`, `renderJourneyStep(activeStationIndex)` (Kartenwechsel + „Idle"-Chart-Rendering für die neue Station), danach `journeyState = 'idle'`.
   - Zusätzlich ein defensives 1500ms-Fallback-Timeout: Falls `revealCurrentStationPoint()` nie ein sichtbares Measurement liefert, wird nach 1500ms trotzdem (ohne Flug) zur nächsten Karte übergegangen — verhindert dauerhaftes Steckenbleiben, ist aber ausdrücklich kein primärer Timing-Mechanismus.

3. **`renderJourneyStep()`** wurde von seiner ursprünglichen `anchorMeasurement`-Nutzung befreit (die Messung läuft jetzt in `revealCurrentStationPoint()`) — dazu gleich mehr in Abschnitt 7, das war zunächst zu radikal.

Reduced Motion: `revealCurrentStationPoint()` läuft in jedem Fall (auch bei Reduced Motion) — der Chart aktualisiert sich, der Punkt erscheint (bei Reduced Motion ohne Pulse-Animation, da `FwAnnotationPulsePlugin` selbst bereits `prefers-reduced-motion` respektiert und dann nur einen statischen Ring zeichnet — unverändert aus AP-14). Nur `flyCardToPoint()` (der eigentliche Flug) wird bei Reduced Motion übersprungen; die kausale Reihenfolge (Chart/Punkt zuerst, Karte danach) bleibt in beiden Fällen erhalten.

Keine Engine-/Plugin-Datei wurde für diesen Umbau angefasst — die gesamte Sequenzkorrektur liegt in `app.js`.

---

## 7. Regressionsbug nach der Sequenzkorrektur (Albert-Bugreport #2, gerade eben behoben)

### 7.1 Was Albert beobachtete

Direkt im Anschluss an die Sequenzkorrektur: „Funktioniert nicht, die Karten werden nicht animiert. Der Flug von oben in Richtung des pulsierenden Punktes findet nicht statt."

### 7.2 Root-Cause-Analyse (von mir, Claude, durch Code-Lesen hergeleitet — noch nicht im Browser verifiziert)

`ChartEngine.js` hat in seiner `_draw()`-Methode zwei strukturell unterschiedliche Pfade:

- **Erstellungspfad** (`state.chartInstance` existiert noch nicht): baut `chartConfig` inklusive `chartConfig.plugins` (Array der aktiven Chart.js-Plugin-Objekte) komplett neu und ruft `new Chart(canvas, chartConfig)` auf. **Chart.js entscheidet zu diesem Zeitpunkt einmalig**, welche Plugin-Objekte für die gesamte Lebensdauer dieser Chart-Instanz aktiv sind.
- **Update-Pfad** („Smart Update", `state.chartInstance` existiert bereits): hier werden ausschließlich `state.chartInstance.data` und `state.chartInstance.options` neu zugewiesen, danach `chart.update()` aufgerufen (`ChartEngine.js`, Zeilen ca. 410–412). **Der neu gebaute `chartConfig.plugins`-Array wird in diesem Zweig nirgends an die bestehende Chart.js-Instanz weitergereicht.** Er wird stillschweigend verworfen.

Konsequenz: Chart.js-Plugins können bei dieser Engine **nur beim allerersten Aufbau eines Charts registriert werden**. Ein Plugin, das erst bei einem späteren Update-Aufruf zum ersten Mal `enabled: true` bekommt, wird von Chart.js nie tatsächlich ausgeführt — sein `afterDraw`-Hook feuert einfach nie, egal wie oft man danach die Options setzt.

**Genau das ist mir in Abschnitt 6.3 passiert:** Ich hatte `anchorMeasurement` komplett aus `renderJourneyStep()` entfernt, weil ich davon ausging, es würde jetzt nur noch in der neuen `revealCurrentStationPoint()` gebraucht. Aber `renderJourneyStep(0)` ist genau der Aufruf, der den Chart für Screen 2 überhaupt erst erzeugt (`new Chart()`, beim ersten Betreten von Screen 2). Ohne `anchorMeasurement.enabled` in genau diesem allerersten Aufruf wurde `FwAnchorMeasurementPlugin` nie in Chart.js' Plugin-Liste aufgenommen. Alle späteren `revealCurrentStationPoint()`-Aufrufe setzten zwar korrekt `chart.options.plugins.fwAnchorMeasurement`, aber Chart.js hat dieses (nie registrierte) Plugin einfach nicht ausgeführt. Der `afterDraw`-Hook feuerte nie, `onAnchorMeasurement` kam nie an, `handlePointReady` wurde nie vom echten Measurement aufgerufen — nur mein defensives 1500ms-Fallback-Timeout griff am Ende und löste (ohne jeden Flug) den Kartenwechsel aus. Das erklärt exakt Alberts Beobachtung: kein Flug, aber die App „hängt" auch nicht komplett (weil der Fallback nach 1,5s doch noch weitermacht).

### 7.3 Der soeben angewendete Fix

`renderJourneyStep()` bekommt einen minimalen, absichtlich harmlosen `anchorMeasurement`-Eintrag zurück — mit denselben Ankerdaten wie zuvor, aber einem **No-op-Callback** (`onAnchorMeasurement: () => {}`). Zweck ausschließlich: Sicherstellen, dass `FwAnchorMeasurementPlugin` bereits beim allerersten `new Chart()`-Aufruf registriert wird. Die tatsächliche, für den Flug relevante Messung läuft weiterhin ausschließlich über `revealCurrentStationPoint()` — deren `.options`-Zuweisung (inklusive frischer Anker und echtem Callback) wird vom bestehenden Update-Pfad korrekt übernommen, weil dieser Pfad `.options` (im Gegensatz zu `.plugins`) sehr wohl neu zuweist. Das Plugin selbst liest seine Konfiguration ohnehin bei jedem `afterDraw`-Aufruf frisch aus `chart.options.plugins.fwAnchorMeasurement` (kein interner Cache) — das war von Anfang an so dokumentiert und ist der Grund, warum dieser Fix ohne Engine-/Plugin-Änderung auskommt.

**Status dieses Fixes:** syntaktisch geprüft (`node --check`), Grep-Checks (kein neuer Chart.js-Internal-Zugriff in `app.js`, kein neues `_fwGeometry`) grün. **Noch nicht im Browser bestätigt.** Das ist der Hauptgrund, warum dieses Dokument jetzt geschrieben wird, statt direkt ein GRÜN-Ergebnisprotokoll zu behaupten.

---

## 8. Aktueller Dateistand (nur betroffene Dateien)

| Datei | Rolle in dieser Kette |
|---|---|
| `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js` | neu (AP-08b), seither unverändert |
| `Theme/assets/js/fw-chart-engine/plugins/index.js` | ein neuer Export (AP-08b), seither unverändert |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | `anchorMeasurement`-Optionsvertrag + `_emitAnchorMeasurements()` (AP-08b), seither **nicht** noch einmal geändert (auch nicht für den Bugfix in Abschnitt 7.3 — der Fix liegt komplett in `app.js`) |
| `Apps/prokrastinations-preis/app.js` | AP-08b: erste Card-to-Point-Fassung. AP-08b2: `revealCurrentStationPoint()` neu, State Machine im Klick-Handler, `renderJourneyStep()` von `anchorMeasurement` befreit. AP-08b2-Nachtrag (Abschnitt 7.3): `anchorMeasurement`-Bootstrap in `renderJourneyStep()` wiederhergestellt (mit No-op-Callback) |
| `Apps/prokrastinations-preis/app.css` | AP-08b: `.fw-app__screen { position: relative }`, `--flight-clone`/`--flight-active`-Regeln, zentraler Geschwindigkeits-Schalter `--fw-card-to-point-flight-duration`. Seit AP-08b2 unverändert |
| `docs/steering/BACKLOG.md` | AP-08b-Nachtrag: neuer Eintrag `DS-FOLLOWUP-08` |
| `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` | Ergebnisprotokoll AP-08a |
| `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md` | Ergebnisprotokoll AP-08b (inkl. Fluggeschwindigkeits-Nachtrag) |

**Nicht geändert in der gesamten Kette:** `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`, `stations.de.json`, Finanzdaten-CSV, `FwAnnotationPulsePlugin.js`, `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `FwDateUtils.js`, Screen-4-Code, RubikonSymbolMarkers.

## 9. Deterministische Checks, die bereits gelaufen sind (nach dem Fix in Abschnitt 7.3)

```bash
node --check Apps/prokrastinations-preis/app.js
# → OK, keine Syntaxfehler

grep -nE "chart\.scales|getDatasetMeta|getPixelForValue|chartArea|Chart\.getChart" Apps/prokrastinations-preis/app.js
# → keine Treffer

git diff --name-status
# → nur die in Abschnitt 8 gelisteten Dateien
```

## 10. Was dieses Dokument NICHT behauptet

- Es behauptet **nicht**, dass die Card-to-Point-Animation jetzt im Browser sichtbar korrekt funktioniert — das ist nach dem Fix in Abschnitt 7.3 noch nicht getestet.
- Es behauptet **nicht**, dass die Root-Cause-Analyse in Abschnitt 6.2 (zur ersten, von Albert beobachteten Fehlreihenfolge) zweifelsfrei bewiesen ist — sie ist die plausibelste Erklärung anhand des Codes, aber ohne Browser-Nachstellung nicht verifiziert.
- Es ersetzt **nicht** das formale Ergebnisprotokoll `AP-prokrast-08b2_sequenzkorrektur_card-to-point_Ergebnis.md`, das nach erfolgreicher Browser-Bestätigung noch zu schreiben ist.

## 11. Offene Fragen für den Reviewer

1. Ist die Diagnose in Abschnitt 7.2 (Chart.js-Plugins können nur bei `new Chart()` registriert werden, nicht nachträglich per Update) korrekt und vollständig? Das ist die zentrale technische Behauptung dieses Dokuments.
2. Ist der No-op-Bootstrap-Ansatz in Abschnitt 7.3 die sauberste Lösung, oder wäre es architektonisch sauberer, `ChartEngine._draw()` so zu erweitern, dass Plugins auch nachträglich registriert werden können (das wäre eine Engine-Änderung, die der AP-08b2-Auftrag nur „falls zwingend nötig" erlaubt hätte)?
3. Gibt es einen Fall, in dem der No-op-Callback in `renderJourneyStep()` und der echte Callback in `revealCurrentStationPoint()` sich gegenseitig in einer Weise überschreiben könnten, die zu einem Race Condition führt (z. B. wenn Chart.js während der Übergangsphase noch einen `afterDraw`-Frame mit der alten Konfiguration verarbeitet)?
4. Ist das 1500ms-Fallback-Timeout in der State Machine lang genug/kurz genug bemessen, oder sollte es an Chart.js' tatsächliche Default-Animationsdauer gekoppelt werden, statt eine feste Zahl zu sein?
