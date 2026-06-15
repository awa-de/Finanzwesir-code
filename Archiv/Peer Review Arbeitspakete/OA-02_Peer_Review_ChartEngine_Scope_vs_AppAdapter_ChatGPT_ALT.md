# OA-02 Peer Review — Scope-Lösung vs. App-lokaler SparplanChart-Adapter

**Projekt:** Finanzwesir 2.0 / App-Fabrik / `prokrastinations-preis`  
**Repo-Kontext:** `awa-de/Finanzwesir-code`  
**Datum:** 2026-06-09  
**Review-Gegenstand:** Vergleich der bisherigen OA-02-Entscheidung „App-lokaler `SparplanChart`-Adapter“ mit dem neuen Briefing zur Scope-basierten ChartEngine-Integration.

---

## 1. Executive Summary

Der neue Perplexity-/Briefing-Befund ist in einem zentralen Punkt stärker als meine vorige OA-02-Entscheidung: **OA-02 ist primär keine Frage „Wie baut B1 eine eigene Chart-Komponente?“, sondern eine Frage „Wie wird die bestehende ChartEngine als Komponenten-Subsystem innerhalb einer App-Komposition sauber begrenzt?“**

Die Scope-Lösung trifft die Component Composition Architecture besser als mein vorheriger Vorschlag eines app-lokalen `SparplanChart.js`-Adapters. Sie nimmt ernst, dass die ChartEngine die Single Source of Truth für Chart-Komponenten bleibt und dass Charts keine Sonder-Apps sind.

Gleichzeitig ist die Scope-Lösung **nicht vollständig ausreichend für B1 Slice 4**, wenn man sie wörtlich als alleinige Lösung versteht. Der Grund: `prokrastinations-preis` braucht einen dynamischen Chart aus `AppContext.chartSeries`, der sich bei Slider-Änderung ändert. Die aktuelle ChartEngine liest dagegen beim Initialisieren eine CSV über `data-csv`, hält diese Daten im internen `state.data` und hat keine öffentliche API, um bereits berechnete AppContext-Daten in eine bestehende Chart-Komponente zu pushen.

**Endurteil:**

- **Perplexity hat die bessere Architekturrahmung gefunden:** Scope statt App-Sonderadapter.
- **Meine vorige Entscheidung war zu app-lokal und hätte den Chart-Sonderweg teilweise wieder eingeführt.**
- **Perplexity unterschätzt aber die B1-spezifische Daten-/Update-Frage:** Scope löst den Suchraum, nicht die dynamische `chartSeries`-Übergabe.
- **Empfohlene OA-02-Neufassung:** OA-02 sollte zweigeteilt entschieden werden:
  1. **OA-02-A:** ChartEngine bekommt einen verpflichtenden `init(scope)`-Einstieg für scoped Discovery.
  2. **OA-02-B:** Für B1 wird zusätzlich explizit entschieden, wie `AppContext.chartSeries` als Chart-Datenquelle in die ChartEngine gelangt. Ohne diese zweite Entscheidung ist Slice 4 nicht sauber implementierbar.

---

## 2. Quellenbasis

Ich habe für dieses Review herangezogen:

1. Das neue Briefing `oa-02_peer_review_briefing.md`.
2. `PROJECT-STATUS.md` — bestätigt OA-02 als nächsten Schritt vor Slice 4 und dokumentiert COMP-ARCH-Verankerung.
3. `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` — Component Composition Architecture.
4. `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md` — Rolle der ChartEngine.
5. `docs/spec/APP-INTERFACE.md` — Redakteursvertrag und offener interner Entwicklervertrag.
6. `docs/steering/audits/ADR-COMP-ARCH-01-component-composition-architecture.md` — Architekturentscheidung.
7. `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — realer Engine-Code.
8. `Theme/assets/js/fw-chart-engine/index.js` — aktueller Auto-Start.
9. `Apps/prokrastinations-preis/app.js` — realer Slice-3-Code.
10. `Apps/prokrastinations-preis/APP_SPEC.md` und `SLICE_PLAN.md` — B1-Spezifikation und Slice-Plan.

---

## 3. Was der Projektstand verbindlich sagt

### 3.1 OA-02 ist der aktuelle Blocker

`PROJECT-STATUS.md` sagt im Hook-Meta ausdrücklich:

```text
Nächster-Schritt: OA-02 entscheiden (COMP-ARCH-01 + historischer Peer-Review liegen vor) → dann Slice 4 SparplanChart
```

Später wird derselbe Punkt wiederholt: Nächster Schritt B1 ist OA-02, danach Slice 4 SparplanChart.

**Folgerung:** OA-02 darf nicht als Nebenfrage behandelt werden. Sie ist das Gate vor Slice 4.

### 3.2 Component Composition Architecture ist entschieden

Der Factory-Standard-Draft definiert das verbindliche Modell:

- App = komponierte Erlebnisfläche.
- Komponenten = Steine.
- Engines / Renderer = Spezialwerkzeuge.
- ChartEngine = Single Source of Truth für Chart-Komponenten.
- ChartEngine ist nicht die App-Fabrik.

Das ADR-COMP-ARCH-01 bestätigt dieselbe Entscheidung und erklärt ausdrücklich, dass OA-02 jetzt klar gerahmt ist: **eine Chart-Komponente app-fabrikfähig machen, nicht einen Sonderweg für „App-Charts“ bauen.**

### 3.3 APP-INTERFACE lässt den Entwicklervertrag offen

`APP-INTERFACE.md` trennt zwei Ebenen:

- Öffentlicher Redakteursvertrag:
  - `fw-app` für neue App-Fabrik-Apps.
  - `financial-chart-module` für bestehende ChartEngine-Charts.
- Interner Entwicklervertrag:
  - Apps bauen Charts nicht direkt.
  - Sie nutzen die ChartEngine als Subsystem.
  - Name, API, Lifecycle und Update-Pfad sind OA-02 und noch offen.

Das ist wichtig: Der Redakteursvertrag ist nicht die Antwort auf OA-02. OA-02 muss den internen Kopplungsvertrag schließen.

---

## 4. Meine vorige OA-02-Position

Meine vorige Entscheidung lautete sinngemäß:

```text
SparplanChart ist eine App-lokale Komponenten-Adapter-Komponente.
Sie konsumiert ausschließlich AppContext.
Sie besitzt mount/update/destroy.
Sie aktualisiert die bestehende Chart-Instanz in-place.
App-Code spricht nicht direkt mit Chart.js.
fw-chart-engine/index.js bleibt unverändert.
```

Das hatte eine starke Seite: Es nahm die B1-Spezifikation ernst. B1 hat bereits `AppContext.chartSeries`, und Slice 4 ist im Slice-Plan als `AppContext → Chart-Renderer` definiert. Der aktuelle `app.js` baut `chartSeries` schon in `buildAppContext()` auf und aktualisiert KPI-Cards bei Slider-Input.

Aber die Entscheidung hatte einen gravierenden Architekturfehler: Sie machte `SparplanChart.js` app-lokal und rückte dadurch wieder in Richtung „App baut ihren Chart selbst“. Auch wenn ich verbal gesagt habe, dass App-Code nicht direkt mit Chart.js sprechen soll, war die Grenze nicht sauber genug. Es wäre sehr leicht daraus geworden:

```text
Apps/prokrastinations-preis/SparplanChart.js → eigene Chart.js-Logik
```

Das widerspricht dem Geist von COMP-ARCH-01: Chart-Komponenten sollen aus der ChartEngine kommen, nicht aus jedem App-Ordner neu entstehen.

---

## 5. Was Perplexity / das Briefing besser gesehen hat

### 5.1 Das eigentliche aktuelle Engine-Problem ist der globale DOM-Scan

Der reale Code in `ChartEngine.js` zeigt:

```js
async init() {
    const containers = document.querySelectorAll('.financial-chart-module');
    const tasks = Array.from(containers).map(container => this._processContainer(container));
    await Promise.all(tasks);
}
```

Der Einstieg ist global. Danach arbeitet die Engine bereits containerbezogen:

- `_processContainer(container)` verarbeitet genau einen Container.
- `_draw(container, state)` rendert genau in diesen Container.
- `_updateLegend(container, ...)` arbeitet containerlokal.
- `_updateUIState(container, state)` sucht nur im Container.
- `_bindEvents(container, ...)` und `_bindLegendEvents(container, ...)` binden Events containerlokal.

**Perplexitys starker Befund:** Die Engine ist intern schon fast scope-fähig. Das Hauptproblem sitzt im Einstieg, nicht in der gesamten Pipeline.

Das habe ich in meiner vorigen Entscheidung nicht ausreichend gewürdigt.

### 5.2 `scope` ist der präzisere Begriff als `appContainer`

Das Briefing argumentiert überzeugend: Der Parameter sollte nicht `appContainer` heißen, weil die ChartEngine nicht wissen muss, ob der Suchraum semantisch eine App ist. Sie braucht nur einen Suchbereich.

`scope` beschreibt die technische Funktion:

```js
chartEngine.init(scope)
```

Die App-Hülle kann dieser Scope sein, aber nicht jeder Scope muss eine App sein. Das ist geringere semantische Kopplung und langfristig robuster.

### 5.3 Kein zweiter Einstiegspfad, keine synthetische Parallelwelt

Das Briefing räumt zurecht mit alten Optionen auf:

- `FwAppChart`
- C1/C2/C3
- synthetische `FinanzwesirData`-Objekte
- zweiter App-Chart-Weg
- Chart als Sonder-App

Diese Denkpfade waren historisch plausibel, aber unter COMP-ARCH-01 nicht mehr passend. Mein vorheriger `SparplanChart.js`-Vorschlag war zwar einfacher als C1/C2/C3, hatte aber denselben gefährlichen Drall: eine app-spezifische Chart-Zwischenschicht außerhalb der ChartEngine.

### 5.4 Die bestehende Chart-HTML-Card wird nicht abgeschafft, sondern eingeordnet

Das Briefing sieht richtig: `financial-chart-module` muss nicht verschwinden. Der Vertrag kann als Chart-Komponenten-Markup innerhalb eines `fw-app`-Scopes weiterleben.

Das ist kongruent mit `APP-INTERFACE.md`, das beide Verträge explizit koexistieren lässt:

```text
fw-app                 → App-Fabrik-App
financial-chart-module → bestehender ChartEngine-Chart
```

---

## 6. Wo meine vorige Position trotzdem etwas Wichtiges gesehen hat

Perplexitys Scope-Lösung ist architektonisch sauberer, aber sie beantwortet nicht alle B1-Fragen.

### 6.1 B1 braucht `AppContext.chartSeries`, nicht nur CSV-Discovery

Die B1-Spec sagt:

```text
Wer konsumiert AppContext: Renderer (SparplanChart, KpiCards, TextBlocks, A11y-Output, PrimaryCta).
Renderer interpretieren keine Rohdaten — sie lesen ausschließlich AppContext.
```

Das AppContext-Schema enthält dynamisch:

```js
chartSeries: [
  { month: '<startMonth>', depotwert: 300 },
  ...
]
```

Der Slice-Plan sagt für Slice 4:

```text
SparplanChart: historische Depotwert-Linie (1 Datenserie, chartSeries aus AppContext)
```

Das ist nicht dasselbe wie „ChartEngine findet im Scope einen `financial-chart-module` mit `data-csv`“.

### 6.2 Die aktuelle ChartEngine kann keine AppContext-Daten entgegennehmen

Der reale Engine-Code zeigt:

```js
var csvUrl = container.dataset.csv;
var data = await this.parser.parse(csvUrl, { expectDate: isTimeSeries });
var chartData = state.strategy.transform(state.data, runtimeConfig);
```

Die Engine erwartet also:

1. `data-csv` am Chart-Container.
2. Parser lädt CSV.
3. Strategie transformiert geparste Daten.
4. State hält `data` intern.

Es gibt keine öffentliche API wie:

```js
engine.render(container, chartSeries)
engine.update(container, chartSeries)
engine.mount(container, chartSpec)
```

Scope löst nur:

```text
Wo sucht die Engine nach Chart-Containern?
```

Scope löst nicht:

```text
Wie bekommt die Engine bereits berechnete AppContext-Daten?
```

### 6.3 Slider-Updates sind bei B1 fachlich zentral

Der aktuelle `app.js` erzeugt bei jeder Slider-Änderung einen neuen AppContext:

```js
const ctx = buildAppContext(appData, rate, startBetrag);
```

`chartSeries` hängt direkt an `monatlicheRate`. Der Chart muss sich bei Slider-Bewegung aktualisieren.

Die ChartEngine hat zwar intern Smart Updates für Range/View/Legend, aber diese Smart Updates betreffen den internen Chart-State. Die Datenquelle wird beim Initialisieren geparst und dann im State gehalten. Es gibt keinen B1-tauglichen öffentlichen Update-Pfad für neue `chartSeries`.

### 6.4 Scope-only könnte zu doppelter Datenpipeline führen

B1 lädt die MSCI-CSV bereits in `app.js` über `CSVParser.js`, validiert `unitKey`, baut `AppData`, berechnet `chartSeries` und rendert KPI-Cards.

Wenn zusätzlich innerhalb derselben App ein `financial-chart-module` liegt, würde die ChartEngine über `data-csv` dieselbe CSV erneut laden und parsen. Dann hätten wir:

```text
fw-app data-fw-data → app.js → CSVParser → AppData → AppContext
financial-chart-module data-csv → ChartEngine → CSVParser → FinanzwesirData → Chart
```

Das ist nicht automatisch falsch, aber es ist nicht die in der APP_SPEC dokumentierte B1-Reise eines Datenpunkts. Es erhöht außerdem Drift-Gefahr: App und Chart könnten unterschiedliche Datenstände, Validierungslogik oder Fehlerzustände haben.

### 6.5 `financial-chart-module` kann die Sparplan-Simulation nicht ohne Zusatzlogik darstellen

Die produktive CSV enthält `date;index_value`. B1 braucht aber `depotwert[t] = Anteile × indexValue[t]`, abhängig von `monatlicheRate` und `startBetrag`.

Ein normaler `financial-chart-module` kann aus der CSV den Indexverlauf zeichnen, aber nicht automatisch den simulierten Sparplan-Depotwert, sofern keine passende Strategie existiert.

Damit gibt es drei Möglichkeiten:

1. Die App berechnet `chartSeries` und übergibt sie an die ChartEngine. Dafür fehlt aktuell die API.
2. Die ChartEngine bekommt eine B1-spezifische Sparplan-Strategie, die `monatlicheRate` und `startBetrag` aus Optionen liest. Dann wandert B1-Fachlogik in die ChartEngine.
3. Die App erzeugt eine temporäre abgeleitete CSV/Blob-URL für `chartSeries`. Das wäre technisch möglich, aber konzeptionell unschön und unnötig indirekt.

Perplexitys Briefing entscheidet diese Frage nicht. Genau hier bleibt OA-02 offen.

---

## 7. Kongruenz: Wo beide Positionen übereinstimmen

| Punkt | Meine vorige Position | Perplexity-Briefing | Review |
|---|---|---|---|
| Chart.js nicht direkt aus App-Code | Ja | Ja | Kongruent. |
| Kein Sonderweg „App-Charts“ | Ja, behauptet | Ja, konsequenter | Perplexity setzt es sauberer um. |
| ChartEngine bleibt wichtig | Ja | Ja | Kongruent. |
| `fw-chart-engine/index.js` nicht zur Export-Fassade umbauen | Ja | Ja | Kongruent. |
| AppContext ist zentral für B1 | Ja | Nur indirekt / untergewichtet | Meine Position war hier stärker. |
| Lifecycle / Update muss entschieden werden | Ja | Ja, aber anders gerahmt | Beide sehen den Bedarf. |
| Bestehenden CSVParser nicht anfassen | Ja | Ja | Kongruent. |
| Scope statt globalem Scan | Nein / übersehen | Ja | Perplexity klar besser. |

---

## 8. Abweichungen: Wo die Positionen auseinanderlaufen

### 8.1 Komponentenname und Ort

**Meine vorige Position:**

```text
Apps/prokrastinations-preis/SparplanChart.js
```

**Perplexity-Befund:**

```text
ChartEngine.init(scope)
```

**Review:** Perplexity ist architektonisch überzeugender. Ein app-lokaler `SparplanChart.js` wäre nur dann akzeptabel, wenn er eine extrem dünne Hülle um eine offiziell freigegebene ChartEngine-API wäre. Als Ort für Chartlogik ist der App-Ordner falsch.

### 8.2 Datenübergabe

**Meine vorige Position:**

```text
SparplanChart konsumiert AppContext.chartSeries.
```

**Perplexity-Befund:**

```text
ChartEngine sucht scoped nach financial-chart-module und arbeitet mit bestehendem CSV-Flow.
```

**Review:** Beide haben jeweils nur die halbe Wahrheit:

- Für die Plattform ist Scope richtig.
- Für B1 ist `chartSeries` nötig.

OA-02 muss deshalb beides trennen: Discovery-Scope und Daten-/Update-Vertrag.

### 8.3 Lifecycle

**Meine vorige Position:**

```js
mount(appContext)
update(appContext)
destroy()
```

**Perplexity-Befund:**

```js
init(scope)
```

**Review:** `init(scope)` ist die bessere erste öffentliche Engine-API, aber kein vollständiger Lifecycle-Vertrag. Für B1-Slider-Updates braucht es mindestens zusätzlich einen definierten Update-Pfad. Der bestehende interne `_draw(container, state)` ist keine öffentliche API und sollte nicht von App-Code aufgerufen werden.

### 8.4 Abwärtskompatibilität

**Briefing:** Keine doppelte Logik; kein `init()` ohne Parameter; kein Fallback auf `document`.

**Repo-Dokumente:** `APP-INTERFACE.md` sagt zugleich, der bestehende Standalone-Chart-Vertrag bleibe vollständig gültig und werde nicht auf `fw-app` migriert.

**Review:** Der beste Kompromiss ist:

```js
init(scope) // Pflichtparameter
```

aber `index.js` darf für Standalone-Charts explizit übergeben:

```js
window.FinanzwesirChartEngine.init(document);
```

Das ist kein optionaler Fallback im Engine-Code, sondern ein expliziter Scope im Bootstrapper. Dadurch bleibt der Vertrag klar:

- Engine hat keinen stillen globalen Default.
- Standalone-Charts können über expliziten `document`-Scope weiter funktionieren.
- App-Fabrik-Apps übergeben ihren eigenen App-Container als Scope.

---

## 9. Wo Perplexity wichtige Dinge gefunden hat, die ich übersehen habe

### 9.1 Der minimale Eingriff liegt in `ChartEngine.init()`

Ich hatte die Lösung zu weit oben in der App gesucht. Perplexity hat richtig erkannt: Die Engine ist nach dem Einstieg schon containerlokal. Daher ist die kleinste saubere Plattformänderung tatsächlich der Wechsel von:

```js
init() → document.querySelectorAll(...)
```

zu:

```js
init(scope) → scope.querySelectorAll(...)
```

### 9.2 `scope` ist semantisch sauberer als `appContainer`

Ich hätte wahrscheinlich `container` oder `appContainer` vorgeschlagen. `scope` ist besser, weil die Engine dadurch nicht an die App-Semantik gekoppelt wird.

### 9.3 Die Gefahr historischer Denkpfade ist real

Das Briefing macht sauber sichtbar, dass C1/C2/C3, `FwAppChart` und synthetische Daten aus einer alten Problemrahmung stammen. Meine vorige Entscheidung hatte zwar diese alten Optionen nicht direkt übernommen, aber sie war noch nicht radikal genug von ihnen gelöst.

### 9.4 Chart-HTML-Card als Komponenten-Markup ist plausibel

Ich hatte stärker in Richtung eigener Komponente gedacht. Perplexity sieht besser: `financial-chart-module` kann innerhalb einer App-Hülle weiterverwendet werden, wenn die Engine scoped initialisiert wird.

---

## 10. Wo ich Dinge gefunden habe, die Perplexity übersehen oder unterschätzt hat

### 10.1 B1 ist kein statischer CSV-Chart

B1 ist nicht nur „zeige MSCI-Indexreihe“. B1 ist „berechne Sparplan-Depotwert abhängig von Slider und Startbetrag“. Die sichtbare Datenserie ist `chartSeries`, nicht die Roh-CSV.

### 10.2 Die bestehende ChartEngine hat keine öffentliche AppData-/AppContext-API

Der Engine-Code bietet nur:

```js
init()
```

und intern:

```js
_processContainer(container)
_draw(container, state)
```

Es gibt keinen offiziellen Weg für:

```js
update chart with appContext.chartSeries
```

### 10.3 Scope löst nicht die Slider-Update-Strategie

Bei B1 muss der Chart auf `input` reagieren. Die Engine kann intern Chart.js-Instanzen updaten, aber nur innerhalb ihres eigenen State-Modells. App-Code darf nicht in diesen State greifen.

### 10.4 APP_SPEC und Slice-Plan sprechen ausdrücklich von `AppContext → Chart-Renderer`

Das ist eine starke Quelle gegen eine reine `financial-chart-module data-csv`-Lösung. Eine Scope-Lösung muss erklären, wie diese Spezifikationsaussage erhalten oder bewusst geändert wird.

### 10.5 Engine-Änderungen sind nicht frei verfügbar

`CHART_ENGINE_ROLE_AND_INTEGRATION.md` und ADR-COMP-ARCH-01 betonen: Die ChartEngine bleibt eigenständig; Änderungen an ihr brauchen separates Gate und explizite Freigabe. Eine Änderung an `ChartEngine.init()` ist klein, aber trotzdem eine Engine-Änderung.

Das Briefing behandelt sie etwas zu sehr als offensichtlichen Minimalpatch. Aus Projektsteuerungssicht muss daraus ein bewusst freigegebener OA-02-Beschluss werden.

---

## 11. Technischer Risikobefund zur Scope-Lösung

### 11.1 Positiv

Der Code ist scope-freundlich:

- `_processContainer(container)` existiert schon.
- `_draw(container, state)` ist containerlokal.
- Legende, Toolbar und UI-State verwenden `container.querySelector...`.
- Keine offensichtliche harte Kopplung an `document` außer in `init()`.

### 11.2 Guardrails für `init(scope)`

Ein sauberer Patch müsste mindestens prüfen:

```js
async init(scope) {
  if (!scope || typeof scope.querySelectorAll !== 'function') {
    throw new Error('ChartEngine.init(scope): scope mit querySelectorAll erforderlich.');
  }

  const containers = scope.querySelectorAll('.financial-chart-module');
  const tasks = Array.from(containers).map(container => this._processContainer(container));
  await Promise.all(tasks);
}
```

Wichtig: kein stiller Fallback auf `document`.

### 11.3 `index.js` müsste bewusst angepasst werden

Aktuell:

```js
window.FinanzwesirChartEngine = new ChartEngine();
window.FinanzwesirChartEngine.init();
```

Nach Scope-Entscheidung:

```js
window.FinanzwesirChartEngine = new ChartEngine();
window.FinanzwesirChartEngine.init(document);
```

Das ist formal eine Änderung an `fw-chart-engine/index.js`. Das alte Verbot „index.js nicht zur Export-Fassade umbauen“ bleibt eingehalten, denn `index.js` wird nicht zur Fassade. Er übergibt nur explizit den Scope an den bestehenden Auto-Start.

### 11.4 Doppelte Initialisierung verhindern

Wenn App-Scopes und `document`-Scope koexistieren, entsteht ein mögliches Doppel-Init-Problem:

- Auto-Start `init(document)` findet alle `financial-chart-module` auf der Seite.
- App-Bootstrapper ruft zusätzlich `init(appContainer)` auf.
- Derselbe Chart könnte zweimal initialisiert werden.

Daraus folgt: OA-02 muss auch eine Initialisierungsregel enthalten.

Mögliche Regel:

```text
Variante A: Standalone-Auto-Start nur auf Seiten ohne fw-app-Charts.
Variante B: ChartEngine markiert verarbeitete Chart-Container mit data-fw-chart-initialized="true" und überspringt sie.
Variante C: App-Fabrik-Seiten laden nicht den globalen ChartEngine-Autostart, sondern instanziieren scoped.
```

Für die Projektlogik ist Variante B am robustesten, aber sie ist eine weitere Engine-Änderung.

---

## 12. Empfohlene neue OA-02-Entscheidung

### 12.1 OA-02-A — Discovery-/Scope-Vertrag

**Entscheidung:**

```text
ChartEngine.init() wird zu ChartEngine.init(scope).
```

**Vertrag:**

- `scope` ist Pflicht.
- `scope` muss `querySelectorAll` unterstützen.
- Die Engine sucht nur innerhalb dieses Scopes nach `.financial-chart-module`.
- Kein stiller Fallback auf `document`.
- `index.js` darf für Standalone-Charts explizit `document` übergeben.
- App-Fabrik-Apps übergeben ihren App-Container oder einen dedizierten Chart-Bereich.

**Begründung:**

Das entspricht COMP-ARCH-01: Die App ist die Kompositionsfläche; die ChartEngine produziert Chart-Komponenten innerhalb eines zugewiesenen Bereichs.

### 12.2 OA-02-B — Daten-/Update-Vertrag für B1

**Entscheidung noch offen, aber zwingend vor Slice 4 zu schließen:**

B1 braucht einen offiziellen Weg:

```text
AppContext.chartSeries → ChartEngine-kompatible Chart-Komponente
```

Nicht ausreichend ist:

```text
Scope enthält financial-chart-module mit data-csv
```

weil dadurch nur Roh-CSV gefunden wird, nicht die dynamische Sparplan-Serie.

**Empfohlene Minimalrichtung:**

Kein app-lokaler Chart.js-Sonderweg. Stattdessen eine kleine, offizielle ChartEngine-Komponenten-API für bereits berechnete Serien, z.B. konzeptionell:

```js
chartEngine.mountSeries(container, chartSpec)
chartEngine.updateSeries(container, chartSpec)
chartEngine.destroy(container)
```

oder, wenn das zu groß für jetzt ist, eine bewusst dokumentierte Zwischenlösung:

```text
B1-SparplanChart ist Pilot-Ausnahme bis ChartEngine-Series-API existiert.
Ausnahme muss im Decision Log stehen, darf nicht als App-Fabrik-Muster gelten.
```

Ich würde aber keine stille Ausnahme empfehlen. Sie würde genau den Sonderweg einführen, den COMP-ARCH-01 verhindern soll.

### 12.3 Was nicht beschlossen werden sollte

Nicht beschließen:

```text
Apps/prokrastinations-preis/SparplanChart.js rendert eigenständig mit Chart.js.
```

Nicht beschließen:

```text
Die App erzeugt temporäre CSVs/Blob-URLs, nur damit die bestehende CSV-Engine sie wieder parst.
```

Nicht beschließen:

```text
B1-Fachlogik wandert in eine generische ChartEngine-Strategie, ohne klare Grenze.
```

---

## 13. Konkrete Kongruenz-/Abweichungsmatrix

| Thema | Perplexity-Briefing | Meine vorige Entscheidung | Review-Urteil |
|---|---|---|---|
| Architekturmodell | Component Composition ernst nehmen | verbal ja, strukturell zu app-lokal | Perplexity besser |
| ChartEngine-Rolle | Single Source of Truth | anerkannt, aber durch App-Adapter verwässert | Perplexity besser |
| Technischer Minimalpatch | `init(scope)` | neue `SparplanChart`-Klasse | Perplexity besser |
| B1-AppContext | kaum gelöst | sauber berücksichtigt | Meine Position stärker |
| Slider-Update | nicht ausreichend geklärt | `update(appContext)` vorgesehen | Meine Position stärker |
| Risiko Sonderweg | gering bei Scope | mittel bis hoch bei App-Komponente | Perplexity besser |
| Risiko unvollständiger Slice-4-Plan | hoch, wenn Scope-only | niedriger fachlich, höher architektonisch | Beide unvollständig |
| Dokumentationsanschluss | APP-INTERFACE §4 klar schließbar | App-spezifischer Vertrag schwieriger | Perplexity besser |
| Engine-Gate | etwas unterschätzt | vermieden durch „Engine unverändert“ | Beide brauchen Korrektur |

---

## 14. Faire Gesamtbewertung

### 14.1 Bewertung Perplexity / neues Briefing

**Stärken:**

- Sehr gute Rückkehr zum aktiven Architekturmodell.
- Erkennt den globalen Scan als eigentlichen technischen Engpass.
- Vermeidet den falschen Sonderfall „App-Chart“.
- Benennt `scope` präzise.
- Schützt die bestehende ChartEngine-Pipeline besser als meine vorige Entscheidung.

**Schwächen:**

- Behandelt B1 zu stark wie einen normalen Datenchart.
- Löst nicht die `AppContext.chartSeries`-Übergabe.
- Löst nicht die Slider-Update-Frage.
- Löst nicht die mögliche Doppelinitialisierung mit `index.js`.
- Unterschätzt, dass selbst ein kleiner `init(scope)`-Patch eine Engine-Änderung mit Gate ist.

### 14.2 Bewertung meiner vorigen Entscheidung

**Stärken:**

- Nah an B1-APP_SPEC und Slice-Plan.
- Klare Lifecycle-Begriffe: mount / update / destroy.
- Erkennt, dass B1 dynamisch aus `AppContext.chartSeries` rendert.
- Erkennt, dass Slider-Updates in-place passieren sollten.

**Schwächen:**

- Zu app-lokal.
- Zu wenig Nutzung der vorhandenen ChartEngine-Struktur.
- Gefahr eines neuen Chart-Sonderwegs.
- Nicht ausreichend kongruent mit COMP-ARCH-01.
- Übersieht, dass `ChartEngine.js` intern schon containerbezogen arbeitet und nur der Einstieg global ist.

---

## 15. Konkrete Empfehlung für das Projekt

### 15.1 Nicht einfach meine vorige Entscheidung umsetzen

Die vorige Entscheidung sollte **nicht** 1:1 umgesetzt werden. Vor allem diese Aussage muss zurückgenommen werden:

```text
SparplanChart.js liegt app-lokal und ist die primäre Chart-Komponente.
```

Das ist nicht robust genug für die App-Fabrik.

### 15.2 Perplexitys Scope-Lösung übernehmen — aber nicht als vollständige B1-Lösung verkaufen

Diese Aussage sollte übernommen werden:

```text
ChartEngine.init(scope) ist der neue interne Discovery-Vertrag.
```

Diese Aussage sollte nicht übernommen werden:

```text
Damit ist OA-02 vollständig entschieden und Slice 4 kann direkt gebaut werden.
```

Denn für B1 fehlt noch der Daten-/Update-Vertrag.

### 15.3 OA-02 formal neu rahmen

Empfohlener finaler OA-02-Beschluss:

```text
OA-02 entscheidet zwei Ebenen:

A) Discovery-Vertrag:
   ChartEngine arbeitet künftig scoped: init(scope).
   Scope ist Pflicht. Kein stiller document-Fallback.
   Standalone-Bootstrap übergibt document explizit.
   App-Fabrik-Bootstrap übergibt den App- oder Chart-Scope.

B) Daten-/Update-Vertrag:
   B1-SparplanChart darf nicht app-lokal an Chart.js vorbei rendern.
   Für dynamische AppContext.chartSeries braucht es eine offizielle ChartEngine-kompatible Serien-API oder eine explizit dokumentierte Pilot-Ausnahme.
   Ohne B ist Slice 4 fachlich nicht abgeschlossen.
```

### 15.4 Minimaler nächster Arbeitsschritt

Nicht sofort Code schreiben. Erst diese Mini-Entscheidung schließen:

```text
Soll B1 Slice 4 nur die Scope-Fähigkeit der bestehenden ChartEngine nutzen,
oder braucht B1 zusätzlich eine neue ChartEngine-Series-API für AppContext.chartSeries?
```

Meine fachliche Antwort:

```text
B1 braucht zusätzlich eine Series-API oder eine explizite Pilot-Ausnahme.
Scope-only reicht nicht.
```

---

## 16. Vorgeschlagene Entscheidungsvorlage für das Decision Log

```markdown
## D-OA-02 — Chart-Komponenten-Vertrag für App-Fabrik-Apps

**Status:** entschieden / zweistufig  
**Datum:** 2026-06-09  
**Kontext:** COMP-ARCH-01, B1 Slice 4 SparplanChart

### Entscheidung A — Scope Discovery

Die ChartEngine bekommt einen verpflichtenden scoped Einstieg:

```js
chartEngine.init(scope)
```

`scope` ist ein DOM-Suchbereich mit `querySelectorAll`. Die Engine sucht nur innerhalb dieses Bereichs nach `.financial-chart-module`. Es gibt keinen stillen Fallback auf `document`.

Standalone-Charts dürfen über den bestehenden Bootstrapper weiterhin unterstützt werden, aber nur durch explite Übergabe:

```js
chartEngine.init(document)
```

App-Fabrik-Apps übergeben ihren App-Container oder einen dedizierten Chart-Scope.

### Entscheidung B — Dynamische App-Daten

B1 `prokrastinations-preis` benötigt eine dynamische Chart-Serie aus `AppContext.chartSeries`. Die reine Scope-Discovery der bestehenden `financial-chart-module`-CSV-Pipeline reicht dafür nicht aus.

Vor Slice 4 muss deshalb entschieden werden, ob:

1. eine kleine offizielle ChartEngine-Series-API entsteht, oder
2. B1 eine ausdrücklich dokumentierte Pilot-Ausnahme erhält.

App-lokales direktes Chart.js-Rendering ohne ChartEngine-Vertrag ist nicht zulässig.

### Begründung

Die Entscheidung respektiert COMP-ARCH-01: Charts sind Komponenten, die ChartEngine ist ihre Single Source of Truth, Apps sind Kompositionsflächen. Scope löst die DOM-Zuordnung. Die zusätzliche Daten-/Update-Entscheidung verhindert, dass B1s dynamische AppContext-Daten still an der ChartEngine vorbei gerendert werden.
```

---

## 17. Schlussurteil

Perplexity hat die wichtigere Architekturkorrektur geliefert. Mein vorheriger Vorschlag war für B1 funktional naheliegend, aber für die App-Fabrik als Standard zu gefährlich. Er hätte den Chart-Sonderstatus unter anderem Namen zurückgebracht.

Aber Perplexitys Lösung ist nicht das vollständige Ende von OA-02. Sie ist der richtige erste Teil: **Scope als Discovery-Vertrag.** Der zweite Teil bleibt zwingend: **Wie kommt `AppContext.chartSeries` in eine ChartEngine-kompatible Komponente und wie wird sie bei Slider-Updates aktualisiert?**

Das beste Ergebnis für das Projekt ist deshalb keine simple Gewinnerentscheidung „Perplexity oder ChatGPT“, sondern eine konsolidierte Entscheidung:

```text
Perplexitys Scope-Rahmung übernehmen.
Meine AppContext-/Update-Bedenken beibehalten.
App-lokalen Chart-Sonderweg verwerfen.
OA-02 zweistufig schließen: Scope + dynamische Series-API/Pilot-Ausnahme.
```
