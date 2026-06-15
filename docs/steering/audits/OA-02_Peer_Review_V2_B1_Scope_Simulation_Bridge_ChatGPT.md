# OA-02 Peer Review V2 — Scope, Simulation, Bridge

**Projekt:** Finanzwesir 2.0 / App-Fabrik / `prokrastinations-preis`  
**Repo-Kontext:** `awa-de/Finanzwesir-code`  
**Datum:** 2026-06-09  
**Status:** Fairer Peer Review nach neuer B1-Architektur-Herleitung  
**Gegenstand:** Abgleich von drei Positionen:

1. **Frühere ChatGPT-Entscheidung:** App-lokaler `SparplanChart`-Adapter mit `mount/update/destroy`.
2. **Perplexity-/Scope-Review:** OA-02 primär als Scope-Problem der bestehenden `ChartEngine.init()`.
3. **Neue B1-Herleitung:** OA-02 in zwei Teilentscheidungen zerlegen: `init(scope)` plus `renderFromData()`-Bridge; Simulation bleibt in `app.js`.

---

## 1. Executive Summary

Die neue B1-Herleitung verbessert den bisherigen Peer Review deutlich. Der vorherige Review hatte recht, dass meine erste Antwort den Sonderweg „B1 baut seinen eigenen Chart-Adapter“ zu stark begünstigt hat. Perplexity hatte recht, dass die bestehende ChartEngine bereits fast containerbasiert arbeitet und dass der globale Einstieg über `document.querySelectorAll('.financial-chart-module')` das kleinere, sauberere Problem ist.

Die neue Herleitung korrigiert aber einen wichtigen blinden Fleck im Scope-Review: **B1 ist nicht durch Scope allein gelöst.** B1 braucht zusätzlich eine Entscheidung darüber, wo die Sparplan-Simulation lebt und wie berechnete Daten in die ChartEngine gelangen. Die fachlich sauberste Lösung ist deshalb nicht „nur Scope“ und auch nicht „app-lokaler Chart-Adapter“, sondern:

```text
OA-02a: ChartEngine.init(scope) als Pflichtparameter
OA-02b: Simulation in app.js; Übergabe an ChartEngine über renderFromData()
```

Damit entsteht eine belastbare Dreiteilung:

```text
app.js denkt
ChartEngine zeichnet
CSVParser / FinanzwesirData bleiben geschützt
```

**Endurteil:** Die neue B1-Herleitung ist die bisher stärkste Position. Sie verbindet Perplexitys Scope-Erkenntnis mit der AppContext-/Domänenlogik-Anforderung aus B1. Meine frühere `SparplanChart.js`-Adapterentscheidung war als kurzfristige Pilotlösung verständlich, aber architektonisch zu lokal und zu wenig respektvoll gegenüber der ChartEngine als Single Source of Truth.

---

## 2. Ausgangslage nach Repo- und Dokumentenprüfung

### 2.1 Was stabil feststeht

Aus den Projektdateien ergibt sich ein klarer Rahmen:

- `PROJECT-STATUS.md` benennt OA-02 als nächsten Schritt vor Slice 4.
- `03_APP_FACTORY_STANDARD_DRAFT.md` §1a verankert die Component Composition Architecture:
  - App = komponierte Erlebnisfläche.
  - Komponenten = Bausteine.
  - Engines / Renderer = Spezialwerkzeuge.
  - ChartEngine = Single Source of Truth für Chart-Komponenten.
- `CHART_ENGINE_ROLE_AND_INTEGRATION.md` bestätigt:
  - ChartEngine ist eigenständiges Visualisierungssubsystem.
  - Sie ist keine App-Fabrik.
  - Änderungen an der Engine brauchen separates Gate und explizite Freigabe.
- `APP-INTERFACE.md` §4 lässt den internen Entwicklervertrag ausdrücklich offen:
  - Name
  - API
  - Aufrufkonvention
  - Lifecycle
  - Update-Pfad
- `ChartEngine.js` zeigt:
  - `init()` scannt heute global:
    ```js
    const containers = document.querySelectorAll('.financial-chart-module');
    ```
  - Danach arbeitet die Engine weitgehend containerbezogen:
    - `_processContainer(container)`
    - `_draw(container, state)`
    - `_updateLegend(container, ...)`
    - `_updateUIState(container, state)`
    - `_bindEvents(container, toolbar, state)`

### 2.2 Was B1 zusätzlich verlangt

B1 ist kein reiner Standalone-Chart. Laut `APP_SPEC.md` und Slice-Plan braucht B1:

- Slider für `monatlicheRate`
- historische MSCI-Daten
- Sparplan-Simulation
- `chartSeries`
- KPI-Karten (`eingezahlt`, `depotwertHeute`, `differenz`)
- A11y-Summary
- später 4-Screen-Flow und Entscheidungspunkt-Marker

Das bedeutet: Der Chart ist nur eine Komponente innerhalb einer App-Komposition. Die Sparplan-Simulation ist nicht nur Chart-Zulieferung, sondern erzeugt auch Werte für Nicht-Chart-Komponenten.

---

## 3. Die drei Positionen im fairen Vergleich

## 3.1 Position 1 — Meine frühere Entscheidung: app-lokaler `SparplanChart`-Adapter

### Kernidee

B1 bekommt eine eigene Datei:

```text
Apps/prokrastinations-preis/SparplanChart.js
```

mit Lifecycle:

```js
const chart = new SparplanChart(container, options);
chart.mount(appContext);
chart.update(appContext);
chart.destroy();
```

### Was daran gut war

Diese Position hatte einige echte Stärken:

- Sie respektierte, dass `app.js` bereits `AppContext` erzeugt.
- Sie hielt die Sparplan-Simulation außerhalb der ChartEngine.
- Sie gab B1 eine klare `mount/update/destroy`-Schnittstelle.
- Sie war für Slice 4 schnell verständlich und app-lokal testbar.
- Sie vermied direkte Chart.js-Nutzung aus dem App-Flow zumindest formal.

### Wo sie schwach war

Der entscheidende Fehler: Sie machte B1 zu stark zum Sonderfall.

Die Component Composition Architecture sagt nicht: „Jede App baut ihren eigenen Chart-Adapter.“ Sie sagt: „Chart-Komponenten kommen aus ihrer zuständigen Engine.“ Die zuständige Engine ist die bestehende ChartEngine.

Ein app-lokaler `SparplanChart.js` hätte faktisch eine zweite Chart-Schicht erzeugt:

```text
app.js → SparplanChart.js → Chart.js / Engine-ähnliche Logik
```

Das wäre zwar für B1 bequem, aber mittelfristig gefährlich:

- Jede spätere Chart-App könnte eigene Adapter bauen.
- Die ChartEngine verliert ihre Rolle als Single Source of Truth.
- A11y, Theme, Smart Scales, Tooltip-Logik und Legendenlogik könnten dupliziert oder umgangen werden.
- Die App-Fabrik würde doch wieder Sonderwege zulassen.

### Fairer Befund

Meine frühere Entscheidung war **operativ plausibel**, aber **architektonisch zu lokal**. Sie war besser als direkter Chart.js-Code, aber schlechter als eine saubere Erweiterung der bestehenden ChartEngine.

---

## 3.2 Position 2 — Perplexity-/Scope-Review: `ChartEngine.init(scope)`

### Kernidee

Das eigentliche technische Problem ist nicht die Datenpipeline, sondern der globale Einstieg:

```js
async init() {
  const containers = document.querySelectorAll('.financial-chart-module');
  ...
}
```

Stattdessen:

```js
async init(scope) {
  const containers = scope.querySelectorAll('.financial-chart-module');
  ...
}
```

### Was Perplexity sehr gut erkannt hat

Perplexity hat einen wichtigen Architekturpunkt gefunden, den ich in meiner ersten Entscheidung unterschätzt hatte:

**Die Engine ist intern bereits containerfähig.**

Der globale Scan ist nur der Einstieg. Danach ist der größte Teil des Codes schon auf einen konkreten Container bezogen. Das macht Scope zu einem kleinen, ehrlichen Eingriff:

```text
Nicht: neue App-Chart-Architektur bauen
Sondern: bestehende ChartEngine auf zugewiesenen Suchraum begrenzen
```

Das passt sehr gut zur Component Composition Architecture:

```text
fw-app = App-Hülle / Kompositionsfläche
financial-chart-module = Chart-Komponente innerhalb dieser Hülle
ChartEngine.init(appContainer) = rendert nur Charts in diesem Scope
```

### Wo Perplexity stärker war als meine erste Antwort

Perplexity hat besser gesehen:

1. **ChartEngine bleibt Single Source of Truth.**  
   Meine `SparplanChart.js`-Idee hätte diese Rolle geschwächt.

2. **Der kleinste technische Eingriff sitzt am Einstieg.**  
   `init(scope)` ist viel kleiner als ein neuer Adapter-Layer.

3. **`financial-chart-module` muss nicht abgeschafft werden.**  
   Es kann als internes Chart-Komponenten-Markup innerhalb der App-Hülle weiterleben.

4. **OA-02 ist zuerst eine Scope-/Kompositionsfrage.**  
   Nicht zuerst eine Frage nach einem neuen B1-Chart-Objekt.

### Wo Perplexity zu kurz griff

Der Scope-Review hatte einen wichtigen blinden Fleck:

**B1 ist durch `init(scope)` allein nicht fertig.**

Warum?

Die bestehende ChartEngine kann heute CSV über `data-csv` laden und daraus Charts bauen. B1 hat aber bereits in `app.js` eine Simulation:

```text
CSV → AppData → MarketTimeStrategy → AppContext → chartSeries + KPI-Werte
```

B1 braucht die berechneten Werte nicht nur im Chart, sondern auch in KPI-Karten und Texten. Wenn man nur `init(scope)` einführt, bleibt offen:

- Wie kommt `chartSeries` aus `app.js` in die ChartEngine?
- Oder soll die Sparplan-Simulation in eine ChartEngine-Strategy wandern?
- Wer hält den Slider-Zustand?
- Wer aktualisiert KPI-Karten und Chart synchron?
- Wie werden berechnete Daten im Vault-Prinzip versiegelt?

Perplexity hat also das **Scope-Problem** sehr gut gelöst, aber das **Datenpipeline-/Simulationsproblem** nicht ausreichend getrennt.

### Fairer Befund

Perplexity war **für OA-02a stark**. Für OA-02b war die Analyse unvollständig. Der Scope-Befund bleibt richtig, aber er ist nicht die ganze OA-02-Entscheidung.

---

## 3.3 Position 3 — Neue B1-Herleitung: Simulation in `app.js`, Bridge via `renderFromData()`

### Kernidee

Die neue Herleitung zerlegt OA-02 sauber:

```text
OA-02a: Scope
ChartEngine.init(scope: HTMLElement)

OA-02b: Datenpipeline
Simulation bleibt in app.js
ChartEngine bekommt berechnete, versiegelte Daten über renderFromData()
```

### Warum diese Zerlegung stark ist

Sie trennt zwei Probleme, die vorher vermischt wurden:

| Frage | Richtige Kategorie |
|---|---|
| Wo sucht die ChartEngine nach Chart-Containern? | Scope / DOM-Einstieg |
| Wo lebt die Sparplan-Simulation? | Domänenlogik / Datenpipeline |
| Wie zeichnet die Engine berechnete App-Daten? | Bridge / Engine-API |
| Wie bleiben KPI und Chart synchron? | AppContext / App-State |

Das ist die erste Position, die sowohl die Component Composition Architecture als auch die konkrete B1-Mechanik ernst nimmt.

---

## 4. Die entscheidende neue Erkenntnis: B1 hat sehr wohl eine CSV — aber nicht als fertige Chart-Serie

Der frühere Peer Review formulierte sinngemäß: „B1s SparplanChart hat keine CSV-Datei; die Scope-Lösung löst B1 daher nicht.“

Die neue Herleitung korrigiert das zu Recht.

B1 hat eine CSV:

```text
MSCI World Monatsdaten
```

Aber B1 hat **keine statische CSV mit fertigem Depotverlauf**, weil dieser Verlauf vom Slider abhängt.

Das ist kein Sonderproblem. Die bestehende ChartEngine arbeitet bereits dynamisch:

```text
Originaldaten bleiben stabil
range/view/config ändern sich
Strategy transformiert neu
chart.update()
```

Für B1 ist der Slider strukturell ein weiterer Konfigurationsparameter:

```text
state.data = historische MSCI-Daten
state.config.monatlicheRate = 500
transform/compute erzeugt neuen Verlauf
chart.update()
```

Diese Erkenntnis ist wichtig, weil sie zwei falsche Extreme vermeidet:

- falsch 1: „B1 braucht komplett eigene Chart-Infrastruktur.“
- falsch 2: „B1 kann einfach mit `data-csv` und `init(scope)` gelöst werden.“

Richtig ist:

```text
B1 nutzt CSV als Rohdatenquelle.
B1 berechnet daraus dynamisch AppContext und chartSeries.
ChartEngine zeichnet die berechnete Serie.
```

---

## 5. Wo soll die Simulationslogik leben?

Die neue Herleitung analysiert zwei Optionen. Das ist der Kern von OA-02b.

---

## 5.1 Option A — Simulation in einer ChartEngine-Strategy

### Idee

Eine neue `SparplanStrategy` lebt in:

```text
Theme/assets/js/fw-chart-engine/strategies/SparplanStrategy.js
```

Sie erhält Rohdaten und `monatlicheRate` als Config und berechnet daraus den Depotverlauf.

### Vorteile

Diese Option hat reale technische Vorteile:

- Sie passt formal zum bestehenden Engine-Flow:
  ```text
  CSVParser → ChartEngine → Strategy → Renderer
  ```
- `chart.update()` und Smart Updates sind bereits vorhanden.
- Theming, Tooltips, Responsive und A11y der Engine können direkt genutzt werden.
- Der Slider könnte eventuell als Engine-Event angebunden werden.

### Nachteile

Der Hauptnachteil ist architektonisch schwer:

**Eine Strategy würde Domänenlogik übernehmen.**

Die Chart-Engine-Strategies sind primär dafür da, neutrale Daten in Chart-Konfigurationen zu transformieren. Eine Sparplan-Simulation ist aber keine neutrale Visualisierungstransformation. Sie ist Finanzlogik:

```text
Für jeden Monat:
Anteile += monatlicheRate / indexValue[t]
depotwert[t] = Anteile × indexValue[t]
```

B1 braucht diese Ergebnisse an mehreren Stellen:

- Chart-Linie
- KPI-Karten
- A11y-Summary
- Entscheidungstext
- später eventuell AssumptionsBox / Screen-Flow

Wenn die Simulation in der ChartEngine-Strategy sitzt, müssten KPI und Text entweder:

- dieselbe Logik duplizieren, oder
- Ergebniswerte aus Chart-Metadaten herausziehen, oder
- ChartEngine müsste Domänenergebnisse nach außen exportieren.

Alle drei Wege sind schlechter als eine App-seitige Simulation.

### Fairer Befund zu Option A

Option A ist technisch verführerisch, weil sie den bestehenden Chart-Flow maximal ausnutzt. Für einen reinen Chart wäre sie vielleicht akzeptabel. Für B1 ist sie aber falsch, weil B1 eine App-Komposition ist, kein Chart mit etwas Dekoration.

---

## 5.2 Option B — Simulation in `app.js`, Bridge zur ChartEngine

### Idee

`app.js` bleibt der Ort der B1-Domänenlogik:

```text
CSVParser → app.js / AppData → MarketTimeStrategy → AppContext
```

Die ChartEngine bekommt danach nur die fertige, versiegelte Chart-Datenstruktur:

```text
chartSeries → FinanzwesirData-kompatible Struktur → ChartEngine.renderFromData()
```

### Vorteile

Diese Option ist architektonisch am stärksten:

1. **Domänenlogik bleibt bei der App.**  
   B1 weiß, was ein Sparplan ist. Die ChartEngine weiß, wie man Daten visualisiert.

2. **KPI und Chart kommen aus derselben Quelle.**  
   `depotwertHeute`, `eingezahlt`, `differenz` entstehen zusammen mit `chartSeries`.

3. **Die ChartEngine bleibt sauber.**  
   Keine Sparplan-Finanzlogik in `fw-chart-engine/strategies/`.

4. **Die Lösung skaliert auf 20+ Apps.**  
   Jede App behält ihre fachliche Berechnung lokal. Die Engine bleibt Infrastruktur.

5. **Tests werden einfacher.**  
   `MarketTimeStrategy` kann isoliert getestet werden, ohne Chart.js, Canvas oder Renderer.

6. **Das Vault-Prinzip bleibt erhalten.**  
   Die berechneten Daten werden vor Übergabe versiegelt.

### Nachteile

Option B braucht eine neue Engine-API:

```js
renderFromData(container, finanzwesirData, type, options)
```

Das ist ein echter Eingriff in die ChartEngine und damit gatepflichtig. Außerdem muss sauber geklärt werden:

- Was genau ist ein gültiges `FinanzwesirData`-Objekt?
- Muss es eine echte Instanz sein oder reicht strukturkompatibles, versiegeltes Objekt?
- Wie wird `state` gehalten?
- Ist `renderFromData()` idempotent?
- Gibt es `updateFromData()` oder macht `renderFromData()` beides?
- Wie wird Destroy/Cleanup behandelt?
- Wie reagiert die Engine auf synthetische Monatsdaten bei `detectRhythm()`?

### Fairer Befund zu Option B

Option B ist nicht die kleinste Codeänderung, aber die sauberste Architekturentscheidung. Sie akzeptiert einen kontrollierten Engine-Eingriff, um langfristig Sonderwege zu verhindern.

---

## 6. C2 vs. C3: Bridge-Mechanismus

Die neue Herleitung empfiehlt für B1:

```text
C2: ChartEngine.renderFromData()
```

und C3 erst nach Pilot-2.

Das ist plausibel, aber nicht risikofrei.

---

## 6.1 C2 — `renderFromData(container, data, type, options)`

### Stärken

- Ein einziger neuer öffentlicher Engine-Einstieg.
- Passt zur bestehenden Engine-Struktur.
- Überspringt nur den CSV-Ladeschritt.
- Nutzt weiter Strategies, Renderer, Theme, Smart Update.
- Gut genug für B1.
- Keine neue Wrapper-Klasse, solange es nur einen konkreten Bedarf gibt.

### Risiken

C2 darf nicht zu einer unklaren „mach alles“-Methode werden.

Die Signatur muss sehr streng sein:

```js
async renderFromData(container, data, type = 'line', options = {})
```

oder besser:

```js
async renderFromData(container, {
  data,
  type,
  config,
  mode
})
```

Der zweite Stil ist länger, aber robuster, weil Erweiterungen nicht die Signatur sprengen.

Mindestens zu klären:

- Erwartet `data` ein echtes `FinanzwesirData`?
- Welche Pflichtfelder müssen vorhanden sein?
- Wer erzeugt `viewOptions`?
- Wie wird der State pro Container gespeichert?
- Darf ein zweiter Aufruf denselben Container updaten?
- Was passiert bei Fehler?
- Wird alte Chart-Instanz zerstört, ersetzt oder aktualisiert?
- Wie werden Event-Listener nicht mehrfach gebunden?

### Empfehlung zu C2

C2 ist für B1 richtig, aber nur mit einem kleinen internen Refactoring:

```text
_processContainer(container)
  lädt CSV
  baut State
  ruft _draw()

renderFromData(container, data, type, options)
  nutzt data direkt
  baut denselben State
  ruft _draw()
```

Dazu sollte es idealerweise eine gemeinsame private Methode geben:

```js
_buildState(container, data, type, config)
```

Dann entstehen nicht zwei parallele State-Aufbaupfade.

---

## 6.2 C3 — `FwAppChart` Wrapper

### Stärken

Ein Wrapper mit:

```js
const chart = new FwAppChart(container, options);
chart.render(data);
chart.update(data);
chart.destroy();
```

wäre für App-Code schöner. Er könnte Lifecycle, Data-Freezing, A11y-Summary und Event-Binding kapseln.

### Warum C3 jetzt noch nicht nötig ist

C3 wäre eine zusätzliche Abstraktion, bevor klar ist, ob mehrere Apps denselben Bedarf haben. Genau das widerspricht dem App-Fabrik-Prinzip:

```text
Neue Klassen entstehen durch Bedarf — nicht durch Vorausplanung.
```

C3 sollte erst entstehen, wenn nach B1 mindestens ein zweiter App-Fall denselben Bridge-Schmerz zeigt.

### Fairer Befund zu C3

C3 ist wahrscheinlich die spätere Zielabstraktion, aber nicht der richtige nächste Schritt. Für B1 ist C2 ausreichend und weniger schwer.

---

## 7. Kongruenz: Wo stimmen die Positionen überein?

## 7.1 Alle ernsthaften Positionen lehnen direkten Chart.js-Zugriff aus `app.js` ab

Das ist stabil:

```text
Kein direkter Chart.js-Pfad aus App-Code.
```

Meine frühere Lösung wollte das über `SparplanChart.js` kapseln. Perplexity und die neue Herleitung lösen es besser über die bestehende ChartEngine.

## 7.2 Alle stimmen der Component Composition Architecture zu

Alle relevanten Dokumente und Reviews akzeptieren:

```text
App = Komposition
Chart = Komponente
ChartEngine = Subsystem / Produktionsstraße
```

Der Streit liegt nicht mehr im Modell, sondern in der Schnittstelle.

## 7.3 Alle sehen, dass OA-02 vor Slice 4 entschieden werden muss

Slice 4 ist `AppContext → Chart-Renderer`. Ohne OA-02 ist unklar, welcher Renderer gemeint ist und wo die Datenübergabe stattfindet.

## 7.4 Alle wollen CSVParser und FinanzwesirData schützen

Es gibt keinen ernsthaften Vorschlag, `CSVParser.js` oder `FinanzwesirData.js` umzubauen. Die neue Herleitung respektiert das, erweitert aber die Frage: Darf die Engine auch bereits berechnete, versiegelte FinanzwesirData-kompatible Daten annehmen?

---

## 8. Abweichungen: Wo unterscheiden sich die Positionen wirklich?

| Thema | Frühere ChatGPT-Entscheidung | Perplexity/Scope | Neue B1-Herleitung | Review-Bewertung |
|---|---|---|---|---|
| Kernproblem | B1 braucht Chart-Komponente | Engine scannt global | OA-02a Scope + OA-02b Datenbridge | Neue Herleitung ist präziseste Zerlegung |
| ChartEngine-Rolle | indirekt, aber nicht zentral genug | Single Source of Truth | Single Source of Truth + neue API | Neue Herleitung am stärksten |
| Simulation | app.js | nicht ausreichend geklärt | app.js | Neue Herleitung korrigiert Scope-Blindspot |
| Chart-Daten | AppContext direkt an Adapter | bestehende CSV-Container | berechnete versiegelte Daten via Bridge | Bridge ist sauberste Lösung |
| Eingriff | neue App-Datei | kleine Engine-Änderung | zwei kleine, gatepflichtige Engine-Erweiterungen | Mehr Aufwand, aber besser |
| Skalierung | Risiko vieler Adapter | gut für Standalone/Scope | gut für Apps mit berechneten Daten | Neue Herleitung skaliert besser |
| Slice-4-Tauglichkeit | schnell | unvollständig | vollständig, sofern Bridge entschieden | Neue Herleitung beste Grundlage |

---

## 9. Was Perplexity Wichtiges gefunden hat, das ich übersehen hatte

### 9.1 Die Engine ist bereits containerzentriert

Ich hatte zu sehr aus B1 heraus gedacht. Perplexity hat stärker aus dem vorhandenen Engine-Code heraus gedacht.

Der wichtige Befund:

```text
document.querySelectorAll() ist global,
aber der Rest arbeitet containerbezogen.
```

Das macht `init(scope)` viel naheliegender als einen neuen B1-Adapter.

### 9.2 Scope ist die richtige Kategorie für OA-02a

Der Begriff `scope` ist besser als `appContainer`, weil die ChartEngine nichts über Apps wissen muss. Sie braucht nur einen Suchraum.

### 9.3 `financial-chart-module` muss nicht verschwinden

Mein früherer Vorschlag hätte das Chart-Markup für B1 wahrscheinlich unsichtbar gemacht oder ersetzt. Perplexity hat richtig gesehen: `financial-chart-module` kann als Komponenten-Markup innerhalb von `fw-app` weiterleben.

### 9.4 Keine Abwärtskompatibilität als produktiver Zwang

Perplexity hat sauber argumentiert, dass ein Pflichtparameter besser ist als ein optionaler `document`-Fallback, sofern alte Solo-Charts nur prototypisch sind. Das verhindert, dass der globale Scan als Altlast weiterlebt.

---

## 10. Was die neue B1-Herleitung Wichtiges gefunden hat, das Perplexity übersehen hatte

### 10.1 Scope löst nicht die Simulation

`init(scope)` beantwortet:

```text
Wo sucht die Engine?
```

aber nicht:

```text
Welche Daten zeichnet sie?
```

Für B1 ist diese zweite Frage entscheidend.

### 10.2 Slider ist konzeptionell ein Config-Parameter

Die neue Herleitung erkennt: Der Slider ist strukturell ähnlich wie `range` oder `view`. Er verändert nicht die Rohdaten, sondern die Transformation.

Das ist eine starke Analogie zur bestehenden Engine.

### 10.3 Die Simulation gehört nicht in eine Chart-Strategy

Perplexity hatte den Scope-Fokus. Die neue Herleitung geht tiefer: Sie zeigt, warum eine `SparplanStrategy` in der Engine zwar technisch elegant, aber fachlich falsch wäre.

### 10.4 KPI-Karten sind der Lackmustest

B1 braucht `depotwertHeute` und `eingezahlt` außerhalb des Charts. Das ist der entscheidende Beleg dafür, dass die Simulation in `app.js` leben muss.

### 10.5 `renderFromData()` ist die fehlende API

Perplexity sagte im Kern: „Engine bekommt Scope.“  
Die neue Herleitung ergänzt: „Engine braucht zusätzlich einen Einstieg für bereits berechnete Daten.“

Das ist der zentrale Fortschritt.

---

## 11. Was ich in meiner früheren Arbeit gefunden hatte, das weiter gilt

Meine erste Antwort war im Gesamtergebnis zu lokal, aber nicht wertlos. Weiterhin richtig waren:

### 11.1 Lifecycle-Frage bleibt real

`mount/update/destroy` als Wörter waren vielleicht zu app-adapterlastig, aber die Lifecycle-Frage bleibt:

- Wie wird ein Chart initial erzeugt?
- Wie wird er bei Slider-Input aktualisiert?
- Wie wird er bei App-Neuinitialisierung / Fehlerzustand zerstört?
- Werden Event-Listener mehrfach gebunden?

Diese Fragen muss auch `renderFromData()` beantworten.

### 11.2 AppContext bleibt zentrale App-Schnittstelle

Die Simulation in `app.js` erzeugt AppContext. Das bleibt richtig. Chart, KPI, A11y und Text sollten aus derselben semantischen Quelle gespeist werden.

### 11.3 In-place Update ist richtig

Auch die neue Herleitung bestätigt indirekt: Slider-Updates sollen nicht den gesamten App-Container neu rendern, sondern Chart und KPI gezielt aktualisieren.

### 11.4 `prefers-reduced-motion` und A11y bleiben Gate-Themen

Die ChartEngine hat A11y- und Motion-Mechanik, aber B1 muss prüfen, ob sie tatsächlich für synthetische Daten und die konkrete Chart-Struktur funktioniert.

---

## 12. Kritische Punkte, die vor Implementierung geklärt werden müssen

## 12.1 `renderFromData()` darf CSVParser nicht umgehen, ohne Validitätsvertrag

Ja, B1 berechnet Daten selbst. Aber die Engine darf nicht plötzlich beliebige Datenstrukturen akzeptieren.

Mindestvertrag:

```text
data ist readonly / frozen
data.rows ist Array
jede row hat date + numerischen Wert
metadata.unitKey ist gesetzt
metadata rhythm/frequency ist plausibel oder ableitbar
keine Mutation durch ChartEngine
```

Wenn `FinanzwesirData` eine Klasse mit Invarianten ist, sollte `renderFromData()` möglichst echte Instanzen oder eine offizielle Factory erwarten, nicht irgendein Objekt.

## 12.2 `renderFromData()` muss State-Reuse definieren

Zwei mögliche Semantiken:

### Variante 1 — idempotentes Render/Update

```js
engine.renderFromData(container, data, type, options)
```

- Wenn Container noch keinen Chart-State hat: initial render.
- Wenn Container State hat: update.

### Variante 2 — getrennt

```js
const handle = await engine.renderFromData(container, data, type, options);
handle.update(newData, newOptions);
handle.destroy();
```

Variante 2 ist sauberer, aber näher an C3. Für C2 reicht Variante 1, wenn der Container-State robust gespeichert wird.

## 12.3 Kein mehrfaches Event-Binding

Der bestehende Code bindet Events beim ersten `_draw()`. Bei `renderFromData()`-Wiederaufrufen muss verhindert werden, dass Toolbar- oder Legend-Events mehrfach registriert werden.

Das ist ein echter Gate-Punkt.

## 12.4 `detectRhythm()` muss vor Slice 4 geprüft werden

Die neue Herleitung nennt diesen Punkt zu Recht. Synthetische Monatsdaten mit 28–31-Tage-Abständen dürfen nicht als unregelmäßig fehlklassifiziert werden.

## 12.5 A11y-Pfad muss real geprüft werden

Es reicht nicht, dass `getA11yData()` existiert. Vor Slice 4 muss geprüft werden:

- Wird die A11y-Tabelle / Beschreibung tatsächlich in den DOM injiziert?
- Ist sie für B1 passend?
- Braucht B1 zusätzlich eine eigene Figcaption aus AppContext?

## 12.6 `init(scope)` und `renderFromData()` dürfen nicht gegeneinander arbeiten

Ein möglicher Fehler:

```text
app.js erzeugt Chart per renderFromData()
parallel läuft index.js DOMContentLoaded → init(document)
```

Dann könnte die Engine denselben oder einen verschachtelten Container doppelt initialisieren.

Deshalb muss der Bootstrap-Vertrag klar sein:

- Standalone-Seiten: `index.js` ruft `init(document)` oder `init(root)` auf.
- App-Fabrik-B1: App selbst ruft Engine-API auf.
- Doppelte Initialisierung wird per Container-Guard verhindert.

## 12.7 `index.js` ist Teil des Scope-Problems

Wenn `ChartEngine.init(scope)` Pflicht wird, muss `Theme/assets/js/fw-chart-engine/index.js` angepasst werden:

```js
window.FinanzwesirChartEngine.init(document);
```

Das ist kein verbotener „Export-Fassaden-Umbau“, sondern eine notwendige Anpassung des bestehenden Auto-Starts an den neuen Pflichtparameter. Trotzdem braucht es Freigabe, weil der frühere Rahmen `index.js` als sensibel markierte.

---

## 13. Aktualisiertes OA-02-Endurteil

## 13.1 OA-02a — Scope

**Entscheidung:**

```js
await engine.init(scope);
```

- `scope` ist Pflicht.
- Kein stiller Fallback auf `document`.
- `scope` muss `querySelectorAll` unterstützen; idealerweise `Document` oder `HTMLElement`.
- Die Engine sucht nur innerhalb dieses Bereichs nach `.financial-chart-module`.
- Standalone-Auto-Start darf explizit `document` übergeben.

**Begründung:**  
Das beseitigt den globalen Scan, passt zur Component Composition Architecture und nutzt die bestehende containerbezogene Engine-Struktur.

---

## 13.2 OA-02b — Simulationslogik

**Entscheidung:**

```text
Die Sparplan-Simulation lebt in app.js / MarketTimeStrategy,
nicht in einer ChartEngine-Strategy.
```

**Begründung:**  
Die Simulation erzeugt nicht nur Chart-Daten, sondern auch KPI- und Textwerte. Sie ist Domänenlogik der B1-App. Die ChartEngine bleibt Visualisierungsinfrastruktur.

---

## 13.3 OA-02c — Bridge

**Entscheidung für B1:**

```js
await engine.renderFromData(container, data, type, options);
```

oder als Objekt-Signatur:

```js
await engine.renderFromData(container, {
  data,
  type: 'line',
  config: {
    title: 'Historischer Sparplan-Verlauf',
    valueMode: 'currency',
    currency: 'EUR',
    reducedMotion: true
  }
});
```

**Empfehlung:** Objekt-Signatur bevorzugen. Sie ist etwas ausführlicher, aber zukunftsfähiger.

**Begründung:**  
B1 braucht einen offiziellen Weg, berechnete und versiegelte Daten durch die bestehende ChartEngine zu zeichnen, ohne CSV erneut zu laden und ohne App-lokalen Chart-Sonderweg.

---

## 14. Konkrete Dokumentationsänderungen

## 14.1 `APP-INTERFACE.md` §4

Der bisher offene Entwicklervertrag sollte ersetzt werden durch:

```md
### 4.x Chart-Komponenten in App-Fabrik-Apps

Apps bauen Charts nicht direkt und sprechen Chart.js nicht direkt an.

Es gibt zwei Engine-Einstiege:

1. `ChartEngine.init(scope)`
   - rendert vorhandene `financial-chart-module`-Container innerhalb eines Suchbereichs.
   - `scope` ist Pflicht.
   - Kein impliziter globaler Scan.

2. `ChartEngine.renderFromData(container, payload)`
   - rendert oder aktualisiert einen Chart aus bereits validierten, versiegelten Daten.
   - Wird genutzt, wenn eine App Domänenlogik ausführt und das Ergebnis visualisiert werden soll.
   - Die App bleibt Eigentümerin der Domänenlogik.
   - Die ChartEngine bleibt Eigentümerin der Visualisierung.
```

## 14.2 `03_APP_FACTORY_STANDARD_DRAFT.md` §1a / §9

Ergänzen:

```md
Wenn eine App Chart-Daten aus eigener Domänenlogik berechnet, bleibt diese Logik in der App.
Die ChartEngine erhält nur validierte, versiegelte Darstellungsdaten über den offiziellen
Bridge-Vertrag. Eine ChartEngine-Strategy darf keine app-spezifische Finanzlogik enthalten.
```

## 14.3 `SLICE_PLAN.md` Slice 4

Slice 4 sollte nicht mehr nur „SparplanChart“ heißen, sondern präziser:

```text
Slice 4 — ChartEngine-Bridge für SparplanChart
```

Inhalt:

- `MarketTimeStrategy` bleibt in `app.js`.
- `chartSeries` wird in engine-kompatible Datenstruktur übersetzt.
- ChartEngine zeichnet über `renderFromData()`.
- KPI-Update bleibt app-seitig.
- Kein `SparplanChart.js` als parallele Chart-Infrastruktur.

## 14.4 Archiv / historische Artefakte

Die historische C1/C2/C3-Matrix sollte nicht gelöscht, sondern klar markiert werden:

```text
HIST / ERSETZT durch OA-02a+b+c, 2026-06-09
```

Sonst besteht hohes Kontextdrift-Risiko.

---

## 15. Was ich jetzt anders entscheide als in meiner ersten Antwort

## 15.1 Zurücknehmen

Ich würde meine erste Entscheidung **nicht mehr** so stehen lassen:

```text
SparplanChart als app-lokale Adapter-Komponente mit eigener mount/update/destroy-API.
```

Das ist zu sehr B1-Sonderweg.

## 15.2 Ersetzen durch

```text
B1 nutzt die bestehende ChartEngine.
OA-02a begrenzt die Engine per init(scope).
OA-02b hält die Simulation in app.js.
OA-02c führt renderFromData() als Bridge für berechnete App-Daten ein.
```

## 15.3 Was aus der alten Antwort bleibt

Die Lifecycle-Fragen bleiben als Anforderungen an `renderFromData()` erhalten:

- initial render
- update bei Slider-Input
- cleanup / destroy
- A11y
- reduced motion
- keine doppelte Initialisierung

---

## 16. Risiken des neuen Endurteils

## 16.1 Engine-Gate wird anspruchsvoller

`renderFromData()` ist ein echter Eingriff in Produktionsinfrastruktur. Er braucht:

- Full-Gate
- kleine Diff
- Test gegen bestehende Standalone-Charts
- Test gegen B1-Slice
- Rollback-Plan

## 16.2 Gefahr einer zu generischen API

Wenn `renderFromData()` zu frei wird, entsteht eine Hintertür:

```text
Beliebige App gibt beliebige Daten an Engine.
```

Das muss durch strikten Datenvertrag verhindert werden.

## 16.3 Gefahr von Zustandschaos

Wenn `init(scope)` und `renderFromData()` beide denselben Container erwischen, drohen doppelte Chart-Instanzen. Container-Guards sind Pflicht.

## 16.4 B1 darf ChartEngine nicht zum App-State-Manager machen

Die App hält Slider-, KPI- und Screen-State. Die ChartEngine hält nur Chart-State. Diese Grenze muss sauber bleiben.

---

## 17. Finales Peer-Review-Urteil

### Was Perplexity besser gemacht hat

Perplexity hat die wichtigste Korrektur meiner ersten Antwort geliefert:

```text
Nicht App-Adapter bauen, sondern bestehende ChartEngine scoped nutzen.
```

Das war der entscheidende Schritt weg vom Sonderweg.

### Was die neue B1-Herleitung besser gemacht hat

Die neue Herleitung hat Perplexitys Scope-Befund komplettiert:

```text
Scope löst den Suchraum.
renderFromData löst berechnete App-Daten.
app.js bleibt Ort der Simulation.
```

Das ist die bisher beste Gesamtlösung.

### Was meine frühere Antwort noch beiträgt

Meine frühere Antwort hat die richtigen Lifecycle- und AppContext-Fragen gestellt, aber sie am falschen Objekt aufgehängt. Diese Fragen müssen nun in den `renderFromData()`-Vertrag wandern.

---

## 18. Amtliches Endergebnis

**OA-02 sollte als dreiteilige Entscheidung dokumentiert werden:**

| Teil | Entscheidung | Status |
|---|---|---|
| OA-02a | `ChartEngine.init(scope)` als Pflichtparameter | entscheiden / gatepflichtig umsetzen |
| OA-02b | Sparplan-Simulation bleibt in `app.js` / `MarketTimeStrategy` | entscheiden |
| OA-02c | Bridge `ChartEngine.renderFromData(container, payload)` für berechnete, versiegelte Daten | entscheiden / gatepflichtig umsetzen |

**Nicht mehr empfehlen:**

```text
App-lokaler SparplanChart.js als parallele Chart-Komponente.
Sparplan-Simulation in ChartEngine-Strategy.
Direkter Chart.js-Zugriff aus app.js.
Stiller document-Fallback in ChartEngine.init().
```

**Empfohlene nächste Arbeitsreihenfolge:**

1. OA-02a/b/c formal in `APP-INTERFACE.md` §4 dokumentieren.
2. Full-Gate für `ChartEngine.js` vorbereiten.
3. Minimaldiff planen:
   - `init(scope)`
   - `renderFromData(container, payload)`
   - gemeinsamer `_buildState()`-Pfad
   - Container-Guard gegen Doppelinitialisierung
4. `detectRhythm()` mit synthetischen Monatsdaten prüfen.
5. A11y-Renderpfad prüfen.
6. Slice 4 als „ChartEngine-Bridge für SparplanChart“ umsetzen.
7. Nach Pilot-2 prüfen, ob ein `FwAppChart`-Wrapper (C3) realen Nutzen hat.

---

## 19. Ein-Satz-Fazit

**Die beste Lösung für das Projekt ist nicht `SparplanChart.js` und nicht `init(scope)` allein, sondern eine saubere Trennung: App berechnet, ChartEngine zeichnet, Scope begrenzt, `renderFromData()` verbindet.**
