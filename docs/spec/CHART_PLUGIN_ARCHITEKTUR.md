# Chart-Plugin-Architektur

**Pfad:** `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`  
**Status:** Verbindlicher Engine-Architekturvertrag  
**Geltungsbereich:** `Theme/assets/js/fw-chart-engine/`  
**Erstellt aus:** B1-AP-14 / `FwAnnotationPulsePlugin.js` / AP-14-Rettung  
**Stand:** 2026-07-06

---

## 1. Zweck dieser Spec

Diese Spec definiert, wie Chart.js-Plugins in der Finanzwesir-ChartEngine architekturkonform gebaut, aktiviert, begrenzt, getestet und dokumentiert werden.

Sie entstand aus B1-AP-14, konkret aus der Einführung des `FwAnnotationPulsePlugin.js` für die App `prokrastinations-preis`.

Der wichtigste Grundsatz lautet:

```text
Ein Chart-Plugin ist Präsentations- und Runtime-Schicht.
Ein Chart-Plugin ist kein Datenlayer, kein Domain-State und keine Redaktion.
```

Diese Spec soll verhindern, dass künftige Plugins wieder als Post-Render-Hacks, globale Nebenwirkungen oder App-Sonderlogik entstehen.

---

## 2. Einordnung in die Chart-Engine-Schichten

Die Finanzwesir-ChartEngine folgt sinngemäß dieser Schichtung:

```text
Vault     = Datenzugriff, CSV, Rohdaten
Manager   = ChartEngine, State, Render-Orchestrierung
Brains    = Strategien, z. B. LineChartStrategy
Curator   = Smart Scales, Achsen, Ticks, Datumslogik
Face      = Renderer, Theme, Tooltip, Legende, Plugin-Zeichnung
```

Plugins gehören in die Präsentations-/Runtime-Schicht.

Erlaubt:

```text
temporäre visuelle Hervorhebung
Canvas-Overlay
Runtime-Animation
nicht-fachliche Interaktionsergänzung
Anzeige-Hilfe auf Basis bestehender Daten
```

Nicht erlaubt:

```text
neue Fachwerte erzeugen
CSV-Daten verändern
stations.de.json verändern
fwContext als dauerhaften Domain-State verwenden
Achsen-Domain fachlich verändern
Post-Render-Hacks gegen Chart.js ausführen
```

---

## 3. Ablageort

Chart-Plugins liegen unter:

```text
Theme/assets/js/fw-chart-engine/plugins/
```

Beispiel:

```text
Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js
```

Nicht bevorzugt:

```text
Plugin-Logik direkt in app.js
Plugin-Logik direkt in FwSmartXAxis.js / FwSmartYAxis.js
Plugin-Logik als Inline-Hack nach chart.render()
```

### Stand ab AP-14e10b

Ab AP-14e10b gilt für Chart.js-Plugins strenger:

```text
Chart.js-Plugin-Implementierungen liegen ausschließlich unter
Theme/assets/js/fw-chart-engine/plugins/.

Ein Plugin = eine Datei.

Inline-Plugins in Strategies, Plugin-Implementierungen in core/
oder technische Re-Export-Shims wie core/FwChartPlugins.js sind
nicht mehr architekturkonform.

Ausnahmen benötigen einen eigenen Design-AP mit dokumentierter Begründung.
```

Wichtig:

```text
Technische Hilfsfunktionen ohne Chart.js id und ohne Chart.js Lifecycle-Hook
sind keine Plugins. Sie müssen entsprechend anders benannt und dokumentiert werden.
```

---

## 4. Aktivierung über expliziten Options-Vertrag

Plugins dürfen nicht automatisch global wirken.

Ein Plugin wird nur aktiviert, wenn eine App oder Engine-Strategie dies explizit über Optionen verlangt.

Beispiel:

```js
chartEngine.renderFromData(container, series, {
  type: 'line',
  annotations: { events: journeyAnnotations },
  annotationPulse: {
    enabled: true,
    mode: 'newly-added'
  }
});
```

Regel:

```text
kein Optionsfeld
→ kein Plugin-Verhalten
```

Plugins müssen opt-in sein.

Verboten:

```text
Plugin aktiviert sich aufgrund zufällig vorhandener Datenstruktur global selbst.
Plugin wirkt auf alle LineCharts.
Plugin wirkt auf Screen 3, obwohl nur Screen 2 gewollt ist.
```

Opt-in bedeutet: kein globales Plugin-Register und keine automatische Aktivierung über alle Charts.

Eine Strategy darf ein Plugin als charttypischen lokalen Bestandteil ihrer Chart-Konfiguration einbinden,
wenn das Plugin dort semantisch zum Charttyp gehört und die Plugin-Optionen weiterhin respektiert werden.

Beispiele:

```text
LineChartStrategy kann CrosshairPlugin lokal als Teil von chartConfig.plugins einbinden.
PieChartStrategy kann CenterTextPlugin lokal als Teil von chartConfig.plugins einbinden.
ChartEngine ergänzt FwVerticalLinePlugin / FwAnnotationPulsePlugin nur bei passender Runtime-Option.
```

Diese lokale Einbindung ist kein Verstoß gegen die Opt-in-Regel, solange kein Plugin global wirkt.

---

## 5. Plugin-State ist ephemer

Plugin-State ist Runtime-State.

Erlaubt:

```text
WeakMap pro Chart-Instanz
WeakMap pro Container
lokale Closure für laufende Animation
temporäre Sets / Maps für Rendervergleich
```

Nicht erlaubt:

```text
State in stations.de.json
State in events.json
dauerhafte Flags in Annotation-Objekten
dauerhafte Flags in fwContext als Fachzustand
globale Modulvariable ohne Chart-/Container-Bezug
localStorage / sessionStorage ohne expliziten Architekturentscheid
```

Bevorzugtes Muster:

```js
const _state = new WeakMap();

function getState(chart) {
  if (!_state.has(chart)) {
    _state.set(chart, {
      previousIds: new Set(),
      animations: new Map(),
      rafPending: false
    });
  }
  return _state.get(chart);
}
```

Grund:

```text
State endet mit Chart-Lebensdauer.
Kein Cross-Chart-Leak.
Keine Persistenz in Daten oder Redaktion.
```

---

## 6. Chart.js Lifecycle und Canvas Ownership

Chart.js besitzt den Canvas.

Plugins dürfen nicht gegen den Chart.js-Lifecycle zeichnen.

### 6.1 Zulässiges Zeichenmuster

Wenn ein Plugin nach dem normalen Chart-Rendering zeichnen muss, ist `afterDraw` der bevorzugte Hook.

Grund:

```text
afterDraw ist spät im Chart.js-Zyklus.
Das Plugin zeichnet nach Datasets, Achsen, Plugins und Overlays.
```

Beispiel:

```js
const FwAnnotationPulsePlugin = {
  id: 'fwAnnotationPulse',

  afterDraw(chart, args, options) {
    // Plugin-Zeichnung hier
  }
};
```

### 6.2 Animationstreiber

Wenn ein Plugin eine temporäre Animation benötigt, soll der rAF-Loop nicht direkt dauerhaft gegen `chart.ctx` malen.

Bewährtes Muster aus AP-14:

```text
requestAnimationFrame
→ chart.draw()
→ Chart.js rendert normal
→ afterDraw zeichnet Overlay
```

Grund:

```text
Chart.js behält Canvas-Ownership.
Resize / interne Renderzyklen überschreiben das Plugin nicht unkontrolliert.
afterDraw bleibt einziger Zeichenort.
```

### 6.3 Verbotene Muster

Nicht verwenden:

```js
Chart.getChart(container).options.scales.x.max = ...
chart.update('none')
chart.ctx direkt dauerhaft außerhalb eines Chart.js-Hooks bemalen
```

Insbesondere verboten:

```text
Post-Render-Achsen-Hack
chart.update('none') als Animationstreiber
direkter Canvas-Loop, der Chart.js umgeht
```

`chart.draw()` kann als Animationstreiber genutzt werden, wenn dabei keine Scales neu berechnet werden und die Zeichnung ausschließlich über Plugin-Hooks erfolgt.

---

## 7. Achsenvertrag

Plugins dürfen keine fachliche X- oder Y-Domain verändern.

Nicht erlaubt:

```text
x.min / x.max nachträglich setzen
y.min / y.max nachträglich setzen
Datenpunkte hinzufügen, um Achsen zu beeinflussen
Dummy-Datasets zur Achsensteuerung
Fake-Daten
Forecast-Daten
```

Erlaubt:

```text
Overlay-Zeichnung auf bestehende Pixelpositionen
Nutzung bestehender dataset-/scale-Koordinaten
visuelle Hervorhebung bestehender Datenpunkte
```

Wenn ein Plugin Pixelpositionen braucht:

```js
const x = xScale.getPixelForValue(point.x);
const y = yScale.getPixelForValue(point.y);
```

Das Plugin darf daraus zeichnen, aber nicht die Scale-Domain verändern.

---

## 8. Tooltip- und Legend-Vertrag

Plugins dürfen bestehende Tooltip- und Legendenregeln nicht brechen.

Wenn ein Plugin ein eigenes Dataset nutzt, muss dieses eindeutig markiert werden.

Beispiel:

```js
{
  type: 'scatter',
  label: '',
  _fwAnnotationMarker: true,
  data: ...
}
```

Tooltip-Ausschluss:

```js
tooltipConfig.filter = (item) => !item.dataset._fwAnnotationMarker;
```

Legend-Ausschluss:

```js
datasets.filter(ds => !ds._fwAnnotationMarker);
```

Regel:

```text
Plugin-Datasets erscheinen nicht automatisch in Tooltips.
Plugin-Datasets erscheinen nicht automatisch in Legenden.
Plugin-Datasets erzeugen keine Klick-/Tap-Affordance, wenn keine Interaktion vorgesehen ist.
```

---

## 9. Reduced Motion

Jedes animierende Plugin muss `prefers-reduced-motion` respektieren.

Pflichtregel:

```text
prefers-reduced-motion: reduce
→ Animation aus
→ fachlicher Inhalt bleibt sichtbar
→ kein Ersatzflackern
→ kein Fehler
```

Beispiel:

```js
function reducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
```

Wenn `window` nicht verfügbar ist:

```text
kein Fehler werfen
Animation defensiv deaktivieren oder sicher fallbacken
```

Wichtig:

```text
Reduced Motion darf nicht bedeuten, dass relevante Inhalte verschwinden.
Nur die Bewegung verschwindet.
```

---

## 10. Datenvertrag: Plugin ≠ Domain

Plugins dürfen bestehende Fachobjekte lesen, aber nicht in Domain-Objekte schreiben.

Beispiel für erlaubte Nutzung:

```text
annotations.events lesen
Annotation-ID lesen
Annotation x/y lesen
```

Nicht erlaubt:

```text
annotation.hasPulsed = true
station.pulse = true
fwContext.animationState = ...
stations.de.json um Pulse-Felder erweitern
```

Wenn ein Plugin wissen muss, was neu ist:

```text
Runtime-State aus vorherigem Render vergleichen
nicht das Fachobjekt markieren
```

---

## 11. App-Scope

Eine App aktiviert Plugins nur dort, wo das Produktverhalten es verlangt.

Beispiel AP-14:

```text
Screen 2:
annotationPulse.enabled = true

Screen 3:
kein annotationPulse
```

Grund:

```text
Screen 2 zeigt sedimentierende Vergangenheit.
Screen 3 zeigt fertigen Rückblick.
```

Regel:

```text
Plugin-Scope immer app-semantisch begründen.
Kein Plugin pauschal auf alle Screens anwenden.
```

---

## 12. Dokumentationspflicht

Wenn ein neues Plugin eingeführt wird, müssen mindestens diese Orte geprüft werden:

```text
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md
App-spezifische APP_SPEC.md
QA_TEST_CASES.md
NAVIGATION.md oder passende Steuerdatei
docs/steering/patches/<AP>_<Name>_Ergebnis.md
```

Wenn das Plugin ein neues wiederverwendbares Muster schafft, muss diese Spec erweitert werden.

Wenn das Plugin nur eine App-Sondernutzung eines bestehenden Musters ist, reicht ein Verweis in der App-Spec.

---

## 13. Testpflicht

Für jedes Plugin sind mindestens diese Prüfungen nötig.

### 13.1 Statische Prüfung

```text
Plugin wird nur per Optionsfeld aktiviert.
Plugin verändert keine CSV-/JSON-Daten.
Plugin verändert keine X-/Y-Achsendomain.
Plugin hat keinen globalen unscoped State.
Plugin respektiert reduced-motion, falls animiert.
Plugin-Datasets sind aus Tooltip/Legende ausgeschlossen, falls nötig.
Charts ohne Plugin-Option bleiben unverändert.
```

### 13.2 Manuelle Prüfung

```text
Plugin-Effekt sichtbar?
Plugin-Effekt nur im vorgesehenen Screen?
Plugin-Effekt stoppt?
Kein Flackern?
Keine Endlosschleife?
Reduced-motion funktioniert?
Tooltip/Legende unverändert?
Achsen unverändert?
```

### 13.3 Regression

```text
Standard-LineCharts ohne Plugin funktionieren.
Bar/Pie-Charts sind nicht betroffen.
Protected Files bleiben unverändert.
Keine Doku-Drift.
```

---

## 14. Beispiel: FwAnnotationPulsePlugin

`FwAnnotationPulsePlugin.js` ist das Referenzbeispiel für diese Spec.

Eigenschaften:

```text
Ablage: Theme/assets/js/fw-chart-engine/plugins/
Aktivierung: annotationPulse.enabled
Scope: Screen 2 der App prokrastinations-preis
State: WeakMap pro Chart-Instanz
Hook: afterDraw
Animationstreiber: requestAnimationFrame → chart.draw()
Reduced Motion: window.matchMedia('(prefers-reduced-motion: reduce)')
Domain-State: keiner
JSON-State: keiner
fwContext-State: keiner
Screen 3: nicht aktiviert
```

Produktentscheidung aus B1-AP-14:

```text
Dauer: 1200 ms
Scale-Maximum: 1.8×
Form: 2 Pulse, zweiter wirkt als Echo
Keine Alarmfarbe
Keine Endlosschleife
```

Diese Werte sind app-/produktbezogen. Das Architekturpattern ist wiederverwendbar; die konkreten visuellen Parameter sind nicht automatisch Standard für alle künftigen Plugins.

---

## 15. Wann Peer Review Pflicht ist

Bei folgenden Plugin-Arten sollte vor Implementierung ein kurzer Senior-Engineer-/Peer-Review-Befund eingeholt werden:

```text
Canvas-Overlay
Animation mit requestAnimationFrame
Chart.js-Hook-Reihenfolge
State über mehrere Render hinweg
Achsen-/Scale-nahe Logik
Tooltip-/Legend-Eingriffe
Reduced-Motion-Sonderfälle
Crosshair / Hover / Interaction
```

Ziel ist kein langer Review, sondern ein kurzer Befund:

```text
größtes Risiko
richtiger Hook
State-Ort
No-Go-Muster
kleinster sicherer Implementierungsschnitt
```

---

## 16. Stop-Regeln

Sofort stoppen, wenn ein Plugin-AP eines dieser Muster erzeugt:

```text
Post-Render-Achsenmanipulation
chart.update('none') als Animationstreiber
direktes dauerhaftes Canvas-Zeichnen außerhalb Chart.js-Hooks
Plugin schreibt in stations.de.json
Plugin schreibt dauerhafte Runtime-Flags in Annotationen
Plugin wirkt global auf alle Charts
Plugin bricht Standard-LineCharts ohne Optionsfeld
Plugin verändert Protected Files
Plugin ignoriert reduced-motion
Plugin braucht mehr als drei Code-Dateien ohne Begründung
```

Dann ist kein größerer Coding-Versuch erlaubt. Zuerst muss ein Befund-/Rettungs-AP erstellt werden.

---

## 17. Verhältnis zu anderen Specs

Diese Spec ersetzt nicht:

```text
Tooltip-Specs
X-Achsen-Specs
Y-Achsen-Specs
Responsive-/A11y-Specs
App-spezifische APP_SPEC.md
```

Sie ergänzt sie.

Wenn ein Plugin Tooltips verändert, gilt zusätzlich die Tooltip-Spec.  
Wenn ein Plugin Achsen berührt, ist besondere Vorsicht nötig; im Regelfall darf es Achsen nicht verändern.  
Wenn ein Plugin Animation erzeugt, gilt diese Spec plus App-spezifische Reduced-Motion-Regel.

---

## 18. Kurzform für Claude-Prompts

Bei künftigen Plugin-APs in Claude-Prompts einfügen:

```text
Plugin muss docs/spec/CHART_PLUGIN_ARCHITEKTUR.md folgen:
- opt-in über Optionsfeld
- kein Domain-State
- kein JSON-/CSV-Schreiben
- State nur ephemer und chart-/containerbezogen
- reduced-motion respektieren
- keine Achsen-Domain verändern
- keine Tooltip-/Legend-Regression
- keine Post-Render-Hacks
- kein chart.update('none') als Animationstreiber
- Ergebnisprotokoll dokumentiert Scope, State, Hook, Tests
- Plugin-Implementierungen liegen ausschließlich unter plugins/ (ein Plugin = eine Datei)
- Engine/Strategies importieren aktive Plugins grundsätzlich über ../plugins/index.js
- selektiver Named Import aus dem Barrel ist korrekt (nur genutztes Plugin importieren)
- Plugin-Dateien importieren nie aus core/, strategies/ oder plugins/index.js
- keine Inline-Plugins, keine Plugin-Registry, kein globales Chart.register()
- kein FwBarLayoutPlugin, kein chart._fwGeometry als aktiver Kommunikationskanal
- _originalDate ist Tooltip-/Snapshot-Metadatum, kein Plugin-Kommunikationskanal
- BarChartStrategy ist Hybrid-Sonderzone: Änderungen an _originalDate, dateSemantics, axisType,
  viewMode, BOP-Ankern oder semantischem X-Mapping nur über eigenen Design-/Regression-AP
```

---

## 19. Merksatz

```text
Ein Chart-Plugin darf zeigen, was die Engine bereits weiß.
Es darf der Engine nicht heimlich neues Wissen unterschieben.
```

---

## 20. Plugin-Bestand, Barrel, Importregeln und Drift-Abgrenzung (Stand: AP-prokrast-08b, 2026-07-06)

### 20.1 Aktiver Plugin-Bestand

Nach Abschluss von B1-AP-14e2–AP-14e9 waren genau vier Plugins aktiv; seit AP-prokrast-08b (Card-to-Point-Motion, `prokrastinations-preis` Screen 2) sind es fünf:

```text
CenterTextPlugin          — Doughnut/Pie-Chart-Zentrumstext
CrosshairPlugin           — vertikale/horizontale Fadenkreuz-Linie
FwAnnotationPulsePlugin   — Pulse-Animation auf Annotationspunkten
FwVerticalLinePlugin      — vertikale Trennlinie (z. B. Investitionszeitpunkt)
FwAnchorMeasurementPlugin — meldet Pixel-Koordinaten von Datenpunkten per Callback an die App (afterDraw, kein Rückkanal außer onMeasurement)
```

Ablageort:

```text
Theme/assets/js/fw-chart-engine/plugins/CenterTextPlugin.js
Theme/assets/js/fw-chart-engine/plugins/CrosshairPlugin.js
Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js
Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js
Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js
```

### 20.2 Kanonischer Barrel

```text
Theme/assets/js/fw-chart-engine/plugins/index.js
```

Dieser Barrel ist der kanonische Exportpunkt für Plugin-Imports aus Engine und Strategies.

Eigenschaften des Barrels:

```text
Enthält ausschließlich Named Re-Exports der vier aktiven Plugins.
Enthält keine Logik.
Enthält keine Registry.
Ist kein Laufzeit-Schalter.
Ruft kein Chart.register() auf.
```

### 20.3 Importregel

Engine-Dateien und Strategies importieren aktive Plugins grundsätzlich über den Barrel:

```js
import { FwAnnotationPulsePlugin, FwVerticalLinePlugin } from '../plugins/index.js';
import { CrosshairPlugin } from '../plugins/index.js';
import { CenterTextPlugin } from '../plugins/index.js';
```

Regel:

```text
Der Barrel ist der Standardimportpfad für Engine und Strategies.
Direktimporte aus einzelnen Plugin-Dateien sind nur als begründeter Sonderfall erlaubt.
Ein solcher Sonderfall muss im Ergebnisprotokoll des jeweiligen AP dokumentiert werden.
Plugin-Dateien selbst importieren nie aus plugins/index.js.
```

Selektive Named Imports sind korrekt.

Ein Konsument importiert aus `plugins/index.js` nur die Plugins, die er tatsächlich verwendet.

```text
Beispiele nach AP-14e9 / AP-prokrast-08b:
- ChartEngine.js importiert FwAnnotationPulsePlugin, FwVerticalLinePlugin und
  FwAnchorMeasurementPlugin, weil nur diese Engine-seitig dynamisch in
  chartConfig.plugins ergänzt werden.
- LineChartStrategy.js importiert CrosshairPlugin.
- PieChartStrategy.js importiert CenterTextPlugin.
```

Nicht erforderlich und nicht gewünscht: dass ChartEngine.js alle vier Plugins importiert,
obwohl zwei davon Strategy-lokal verwendet werden.

### 20.4 Importzyklus-Verbot

Plugin-Dateien dürfen keine Engine-Dateien importieren.

Verboten:

```text
Plugin importiert aus core/
Plugin importiert aus strategies/
Plugin importiert aus plugins/index.js
```

Erlaubt:

```text
Plugin importiert externe Bibliotheken (z. B. Chart.js)
```

Ziel: kein Zyklus `ChartEngine → plugins/index.js → Plugin → Engine/Core/Strategy`.

### 20.5 Verbotene Mechanismen

Für alle Plugin-Arbeit in dieser Engine ausdrücklich verboten:

```text
Plugin-Registry (statisch oder dynamisch)
Runtime-Registry
Auto-Registration
globales Chart.register()
implizite Plugin-Aktivierung ohne Optionsfeld
Plugin-Liste als zentraler Laufzeit-Schalter
```

Plugins sind opt-in (→ §4). Jedes Plugin wird ausschließlich dort aktiviert, wo eine App oder Strategie es explizit über Optionen anfordert.

### 20.6 Entfernte und nicht aktive Elemente

Folgende Elemente existieren nicht mehr und dürfen nicht reaktiviert werden:

**core/FwChartPlugins.js**

```text
War ein reiner Re-Export-Shim ohne eigene Logik.
Entfernt in B1-AP-14e6 (2026-06-22).
Alle Imports wurden auf die direkten Plugin-Dateien oder den Barrel umgestellt.
```

**FwBarLayoutPlugin**

```text
War ein Inline-Plugin in BarChartStrategy.js.
Entfernt in B1-AP-14e8 (2026-06-22) nach verschärftem Dead-State-Nachweis.
Ursache: Plugin schrieb chart._fwGeometry.halfBarPixel,
aber kein produktiver JS-Code las diesen Wert.
FwSmartXAxis.afterFit() berechnet halfBarPixel eigenständig.
Reaktivierung nur über eigenen Design-AP.
```

**chart._fwGeometry als aktiver Kommunikationskanal**

```text
_fwGeometry war eine frühere Designidee für den Datenaustausch Plugin → Achse.
Der Kanal wurde nie produktiv verdrahtet.
FwSmartXAxis.afterFit() liest _fwGeometry nicht.
_fwGeometry darf nicht ohne eigenen Design-AP wieder eingeführt werden.
```

Spec-Drift-Hinweis (Stand: AP-14e12, 2026-06-22):

```text
Alle drei X-Achsen-Dokumente beschreiben die ursprüngliche Designintention, nicht den aktuellen Code.
Sie sind mit Statusbannern versehen (AP-14e12). Maßgeblich ist der aktuelle Implementierungsstand.

docs/spec/Dokumentation Die Baendigung der X-Achse I.md
  enthält historische Plugin-beforeUpdate-zu-_fwGeometry-Designideen.
  _fwGeometry wurde nicht produktiv verdrahtet.
  FwSmartXAxis.afterFit() berechnet halfBarPixel eigenständig.

docs/spec/Dokumentation Die Baendigung der X-Achse II.md
  enthält historische Re-Engineering-Blueprints,
  unter anderem Chart.register(...)-Beispiele.
  Diese Beispiele sind nach AP-14e10b/AP-14e12 kein zulässiges Muster.

docs/spec/Dokumentation Die Baendigung der X-Achse III.md
  enthält historische FwBarLayoutPlugin- und _fwGeometry-Architektur.
  FwBarLayoutPlugin wurde in AP-14e8 nach Dead-State-Nachweis entfernt.
```

### 20.7 BarChart-Hybrid-Warnung

`BarChartStrategy` ist ein Hybrid mit zwei Modi:

```text
History-Modus:  Zeitachse (monatliche Datenpunkte, X = Datum)
Ranking-Modus:  Kategorieachse (Vergleichs-Items, X = Label)
```

Diese Strategy ist eine Sonderzone.

```text
Alte X-Achsen-Ideen dürfen in BarChartStrategy nicht beiläufig reaktiviert werden.
Änderungen an BarChart-Achse, _originalDate, dateSemantics,
BOP-Ankern oder semantischem X-Mapping brauchen einen eigenen Design-/Regression-AP.
```

### 20.8 Erlaubte Strategy-Metadaten und Abgrenzung zu _fwGeometry

Die ChartEngine nutzt interne Metadaten, um Achsen-, Tooltip- und View-Semantik korrekt abzubilden.

Erlaubte Strategy-/fwContext-/Datenpunkt-Metadaten:

```text
_originalDate           — Datenpunkt-Metadatum für Tooltip-/Snapshot-Semantik
dateSemantics           — Strategy-Metadatum für Achseninterpretation
axisType                — Strategy-Metadatum
viewMode                — fwContext-Metadatum
BOP-Anker / getBopAnchor  — Datumsnormalisierung via FwDateUtils
semantisches X-Mapping    — Strategy-/Achsen-Semantik
```

Diese Felder sind erlaubt, weil sie:

```text
zur Strategy-/Tooltip-/Achsen-Semantik gehören,
nicht von Plugins geschrieben werden,
keinen Plugin-zu-Achse-Kommunikationskanal bilden,
nicht mit chart._fwGeometry identisch sind.
```

Abgrenzung:

```text
_originalDate ist Datenpunkt-Metadatum (z. B. für Tooltip-/Snapshot-Semantik).
chart._fwGeometry war eine alte Plugin-zu-Achse-Geometrieidee — kein aktiver Kanal.
Beides darf nicht gleichgesetzt werden.
```

Regel:

```text
Diese Felder dürfen nicht ohne eigenen Design-/Regression-AP erweitert,
umgedeutet oder als Vorbild für neue Plugin-Kommunikationskanäle genutzt werden.
```
