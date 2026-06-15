Stand: 2026-06-05 | Autor: Claude Sonnet 4.6 | Status: Historischer Input / vor ADR-COMP-ARCH-01 / zu aktualisieren

> [!warning] Historischer Peer-Review-Stand — vor ADR-COMP-ARCH-01
> Dieses Dokument ist wertvolle Vorarbeit, aber **nicht mehr der aktuelle Entscheidungsstand**.
> Es wurde vor der Verankerung der Component Composition Architecture erstellt.
>
> Veraltete / zu prüfende Punkte in diesem Dokument:
> - `C3 / FwAppChart` ist **keine finale Empfehlung** mehr.
> - Der Begriff „App-Chart" ist zu eng. Maßgeblich ist jetzt: **Chart-Komponente innerhalb einer App-Komposition**.
> - `fw-chart-engine/index.js` darf **nicht** als neue Export-Fassade vorgeschlagen oder umgebaut werden, weil diese Datei bereits Auto-Start-Code enthält.
> - OA-02 ist nach ADR-COMP-ARCH-01 neu zu rahmen als **Chart-Komponenten-Vertrag** innerhalb der App-Fabrik.
>
> Maßgeblich für den nächsten OA-02-Schritt:
> - `docs/steering/audits/ADR-COMP-ARCH-01-component-composition-architecture.md`
> - `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` §1a
> - `docs/spec/APP-INTERFACE.md` §4
>
> Dieses Dokument darf nur als historischer Input verwendet werden, nicht als Implementierungsanweisung.

# OA-02 — Chart-Engine-Integration: Architekturentscheidung

**Peer-Review-Dokument.** Dieses Dokument fasst den Architekturkontext, das konkrete Problem und alle diskutierten Lösungsoptionen zusammen. Ziel: eine informierte, egofreie Entscheidung durch Senior Engineers / Architekten.

---

## 1. Systemkontext — Was existiert heute

### Das Projekt

Finanzwesir 2.0 ist ein Einpersonen-Finanzinformationsblog, der auf Ghost.io läuft. Interaktive Finanzvisualisierungen werden als eigenständige JavaScript-Apps in Ghost-Content-Cards eingebettet. Das Projekt hat eine selbst entwickelte Chart-Engine und baut jetzt eine **App-Fabrik**: mehrere unabhängige Mini-Apps, die in Cards eingebettet werden.

**Deployment:** Statisch. Ghost liefert HTML/CSS. Alle Apps sind rein client-seitig (kein Backend, kein Server für Laufzeitdaten). Live Server (VS Code) für lokale Entwicklung.

### Die Chart-Engine (5-Layer-Architektur)

Die Chart-Engine ist ein vollständig implementiertes, produktives System. Datenpfad heute:

```
HTML-Attribut
  data-type="line|bar|pie"
  data-csv="https://finanzwesir.com/data/..."
        ↓
ChartEngine._processContainer()      [Layer 2 — Manager]
        ↓
CSVParser.parse(url, options)        [Layer 1 — Vault, TABU]
  → URL-Whitelist-Prüfung (nur finanzwesir.com / localhost)
  → NOON ANCHOR: Datum → UTC 12:00 normalisiert
  → unitKey-Erkennung (€, $, %)
  → Rückgabe: FinanzwesirData (immutable, Object.freeze())
        ↓
Strategy.transform(data, config)     [Layer 3 — Brains]
  → Range-Filter, Rhythmus-Erkennung (DAILY → YEARLY)
  → Dataset-Arrays für Chart.js
  → fwContext: semantischer Kontext-Rucksack (Rhythmus, ViewMode, Currency …)
        ↓
Strategy.getChartConfig()
  → vollständige Chart.js-Konfiguration
        ↓
FwRenderer.setupStructure()          [Layer 5 — Face]
  → DOM: A11y-Tabelle, Titel, BAN, Toolbar, Canvas
        ↓
new Chart(canvas, chartConfig)       [Chart.js, bereits geladen]
```

### Layer-Übersicht

| Layer | Name | Dateien | Status |
|---|---|---|---|
| 1 | Vault | `FinanzwesirData.js`, `CSVParser.js` | **TABU — nicht ändern** |
| 2 | Manager | `ChartEngine.js` | Änderbar mit Full-Gate |
| 3 | Brains | `LineChartStrategy.js`, `BarChartStrategy.js`, `PieChartStrategy.js`, `FwChartPlugins.js` | Änderbar mit Gate |
| 4 | Curator | `FwSmartScales.js`, `FwDateUtils.js` | Vorsicht — FwDateUtils ist SSoT Zeit |
| 5 | Face | `FwRenderer.js`, `FwLayoutRules.js`, `FwFormatUtils.js`, `FwTheme.js` | Normal |

### Öffentliche ChartEngine-API (heute)

```js
const engine = new ChartEngine();
await engine.init();  // scannt DOM, verarbeitet alle .financial-chart-module Container
```

**Kein weiterer öffentlicher Einstiegspunkt.** `_draw()`, `_processContainer()` sind private Methoden.

### DOM-Contract für bestehende Charts

```html
<div class="financial-chart-module"
     data-type="line"
     data-csv="https://finanzwesir.com/data/depot.csv"
     data-options="range:5y">
</div>
```

### Vorhandene Strategien

Alle drei Strategien implementieren dasselbe Interface:

```js
strategy.getViewOptions(data)       → Array verfügbarer Views
strategy.transform(data, config)    → { datasets, plugins: { fwContext }, meta }
strategy.getChartConfig(transformed)→ vollständige Chart.js-Config
strategy.getA11yData(data, config)  → Tabellendaten für Screen Reader
```

### Generisch wiederverwendbar (ohne Änderung)

| Komponente | Was sie liefert |
|---|---|
| `FwTheme` | Farben, Fonts, CSS-Token via CSS Custom Properties |
| `FwFormatUtils` | Zahlenformatierung de-DE (EUR, %, Rohdaten) |
| `FwLayoutRules` | Responsive Schriftgrößen je Canvas-Breite (S/M/L) |
| `FwDateUtils` | Datums-Parsing, Rhythmus-Erkennung, Calendar-Snapping |
| `FwRenderer.showLoading/showError` | Ladezustand und Fehlermeldungen |
| `Chart.js` | Global verfügbar (bereits geladen) |

---

## 2. Das Problem — OA-02 konkret

### Der neue Anwendungsfall: App-Fabrik

Die App-Fabrik beschreibt das Muster, in dem eigenständige Mini-Apps in Ghost-Cards eingebettet werden. Im Unterschied zu den bestehenden „reinen Chart-Pages" (wo die Chart-Engine die gesamte Seite kontrolliert) sind App-Fabrik-Apps eigenständige JavaScript-Module mit:

- eigenem State (Slider, Inputs)
- eigenen Berechnungen (Strategien, Simulationen)
- **eigenem Bedarf an Chart-Visualisierung** — als Teil der App, nicht als gesamte App

Die erste App (B1: prokrastinations-preis) berechnet simulierte Sparplan-Entwicklungen und muss das Ergebnis als Liniendiagramm zeigen.

### Der konkrete Datenpfad in App B1

```js
// app.js — MarketTimeStrategy berechnet:
appContext.chartSeries = [
  { month: '2014-12', depotwert: 300 },
  { month: '2015-01', depotwert: 295 },
  // ... 120 Monate Simulation
  { month: '2024-11', depotwert: 52000 }
]
// + weitere Felder:
// appContext.monatlicheRate = 300 (vom Slider, ändert sich dynamisch)
// appContext.depotwertHeute = 52000
// appContext.eingezahlt = 36000
```

### Warum der bestehende Einstiegspunkt nicht funktioniert

Die bestehende Engine braucht:
1. Ein DOM-Element mit `class="financial-chart-module"`
2. Ein `data-csv` Attribut mit einer **URL** (nur `finanzwesir.com` / `localhost`)
3. Kein weiterer öffentlicher Einstiegspunkt für in-memory Daten

Die App-Fabrik-Daten sind **dynamisch berechnet** — der Slider ändert `monatlicheRate` und damit das gesamte `chartSeries`-Array in Echtzeit. Es gibt keine static CSV-Datei dafür (und kann es nicht geben: Simulation läuft client-seitig).

**Der CSVParser ist TABU** (Layer 1 Vault): URL-Whitelist kann nicht ohne explizite Freigabe geändert werden.

### Was aus APP-INTERFACE.md dokumentiert ist (aber nicht implementiert)

```
„Langfristig: App → ChartAdapter/API → Chart-Engine."
„Der genaue Entwicklervertrag (ChartAdapter-API, Aufrufkonvention, Lifecycle) 
ist noch offen und wird nicht jetzt implementiert."
```

Die Architektur-Vision existiert, die Implementierung fehlt. OA-02 ist die Entscheidung, wie diese Lücke geschlossen wird.

### SparplanChart-Anforderungen (aus APP_SPEC.md §17)

| Feld | Anforderung |
|---|---|
| Datenreihe | 1 Serie: simulierter Depotwert über ~120 Monate |
| X-Achse | Monatliche Zeitstempel (MONTHLY-Rhythmus) |
| Y-Achse | EUR |
| Marker | Vertikale Linie am letzten Datenpunkt ("heute") |
| A11y | `role="img"` + `aria-label` ODER `<figure><figcaption>` |
| Responsive | `prefers-reduced-motion`: Animation deaktiviert, Chart sofort vollständig |
| Update | Slider-Änderung → Chart neu rendern (Echtzeit) |

---

## 3. Ausgeschiedene Optionen

Diese Optionen wurden diskutiert und vom Projektinhaber verworfen:

**Option A — Canvas direkt:** `<canvas>` mit roher Canvas 2D API, keine externe Bibliothek. Kein Styling-Sync mit Chart-Engine. Für Pilot-1 technisch ausreichend, aber schafft zweiten Rendering-Pfad ohne Infrastruktur-Wiederverwendung.

**Option B — Chart.js direkt in app.js:** App importiert Chart.js und konfiguriert es eigenständig. Verletzt explizit das dokumentierte Prinzip aus APP-INTERFACE.md: „Apps bauen keine Charts direkt." Dupliziert Chart-Engine-Logik (Skalierung, Formatierung, Theming).

**Begründung für Ausschluss:** Beide Optionen erzeugen einen zweiten Rendering-Pfad. In einem System mit mehreren Apps bedeutet das: Styling-Drift, zwei Implementierungen zu pflegen, Regressionspotential bei jedem Theme-Update.

---

## 4. Lösungsraum für Option C: Chart-Engine-Adapter

Die Entscheidung ist gefallen: **Option C — Chart-Engine-Adapter**. Offen ist die Frage, wie der Adapter konkret implementiert wird. Es gibt vier Varianten:

---

### C1 — Synthetisches FinanzwesirData (0 Engine-Änderungen)

**Hypothese:** `FinanzwesirData` ist ein Konstruktor ohne inhärente Validierung der Datenherkunft. `Object.freeze()` wird aufgerufen, aber nicht überprüft, ob Daten aus CSVParser stammen. Daher könnte ein synthetisches Objekt konstruiert und direkt an `LineChartStrategy.transform()` übergeben werden.

```js
// Adapter-Code in der App (konzeptuell):
import { FinanzwesirData } from '…/fw-chart-engine/data/FinanzwesirData.js';
import { LineChartStrategy } from '…/fw-chart-engine/strategies/LineChartStrategy.js';
import { FwTheme } from '…/fw-chart-engine/core/FwTheme.js';
import { FwDateUtils } from '…/fw-chart-engine/core/FwDateUtils.js';

// chartSeries aus MarketTimeStrategy (already computed)
const columns = ['date', 'Depotwert'];
const rows = chartSeries.map(s => [
  FwDateUtils.parse(`${s.month}-15`),  // → UTC 12:00 normalisiert
  s.depotwert
]);
const metadata = { unitKey: '€', parsedAt: Date.now(), source: 'computed' };
const data = new FinanzwesirData(columns, rows, metadata);

// Bestehende Strategy verwenden:
const strategy = new LineChartStrategy();
const transformed = strategy.transform(data, { range: 'max', view: 'value' });
const chartConfig = strategy.getChartConfig(transformed);

FwTheme.init();
new Chart(canvas, chartConfig);
```

**Vorteile:**
- Null Änderungen an Engine-Dateien
- 100% Wiederverwendung von Strategie, Scaling, Formatting, Theming
- Kein neues öffentliches API nötig
- Minimal invasiv

**Risiken / offene Fragen:**
- Erwartet `LineChartStrategy.transform()` implizit, dass Rows aus CSVParser kommen? (z.B. durch Annahmen über Row-Format oder Metadaten-Felder?)
- `FinanzwesirData` freezt Rows sofort. Falls Strategy intern mutierende Operationen auf Rows ausführt (Strict Mode), kracht das lautlos.
- `detectRhythm()` in `FwDateUtils` erwartet konsistente Zeitstempel-Abstände. Sind synthetisch generierte Monatsdaten (28/29/30/31 Tage) stabil genug für die Buckets-basierte Erkennung?
- Pfad ist undokumentiert — kein Vertrag, kein öffentliches API. Spätere Engines könnten den Konstruktor ändern und diese Nutzung still brechen.

**Bewertung:** Höchste Wiederverwendung, kleinstes Scope, aber verstecktes Schnittstellenrisiko. Muss durch Test verifiziert werden, bevor andere Apps darauf aufbauen.

---

### C2 — Neue Methode `ChartEngine.renderFromData()` (1 Datei, ~40 Zeilen)

**Idee:** ChartEngine.js erhält eine neue öffentliche Methode, die den CSV-Ladeschritt überspringt und direkt mit einem `FinanzwesirData`-Objekt einsteigt.

```js
// In ChartEngine.js (neue öffentliche Methode):
async renderFromData(container, finanzwesirData, type, options = {}) {
  const strategy = this.strategies[type];
  if (!strategy) throw new Error(`Unbekannter Chart-Typ: ${type}`);
  
  const state = this._buildState(finanzwesirData, strategy, type, options);
  this._draw(container, state);
  return state;
}

// App-seitige Nutzung:
const engine = new ChartEngine();
await engine.renderFromData(chartContainer, syntheticData, 'line', {
  range: 'max',
  view: 'value'
});
```

**Vorteile:**
- Saubere, explizite öffentliche API
- Alle privaten Methoden (_buildState, _draw) laufen unverändert
- Kapselt die synthetische Datenkonstruktion hinter einem Vertrag
- Erweiterbar: künftige Apps nutzen dieselbe Methode

**Risiken / offene Fragen:**
- Erfordert Änderung an `ChartEngine.js` (Full-Gate, Projektkonvention)
- `_buildState()` muss als separate private Methode extrahiert werden — heute ist der State-Aufbau direkt in `_processContainer()` inline
- Versionierungsrisiko: wenn andere Chart-Engine-Features sich ändern, muss `renderFromData()` mitsynchronisiert werden

**Bewertung:** Sauberere API als C1, mehr Änderungsaufwand, aber robuster für mehrere Apps.

---

### C3 — FwAppChart-Klasse (neues gemeinsames Modul, API-first)

**Idee:** Eine neue Klasse `FwAppChart` (Name: Finanzwesir + App + Chart) lebt außerhalb der Core-Engine aber innerhalb der Fw-Infrastruktur. Sie kapselt den gesamten Adapter-Code und bietet eine stabile API für alle App-Fabrik-Apps.

```js
// Theme/assets/js/fw-app-chart/FwAppChart.js (neue Datei)
import { FwTheme } from '../fw-chart-engine/core/FwTheme.js';
import { FwFormatUtils } from '../fw-chart-engine/core/FwFormatUtils.js';
import { FwLayoutRules } from '../fw-chart-engine/core/FwLayoutRules.js';
import { FwDateUtils } from '../fw-chart-engine/core/FwDateUtils.js';
import { LineChartStrategy } from '../fw-chart-engine/strategies/LineChartStrategy.js';
import { FinanzwesirData } from '../fw-chart-engine/data/FinanzwesirData.js';

export class FwAppChart {
  constructor({ container, series, type = 'line', options = {} }) {
    this.container = container;
    this.series = series;
    this.type = type;
    this.options = options;
    this._chart = null;
  }

  render() {
    const data = this._buildData();
    const strategy = this._getStrategy();
    const transformed = strategy.transform(data, this.options);
    const chartConfig = strategy.getChartConfig(transformed);
    FwTheme.init();
    this._chart = new Chart(this._getCanvas(), chartConfig);
  }

  update(newSeries) {
    this.series = newSeries;
    this._chart?.destroy();
    this.render();
  }

  destroy() {
    this._chart?.destroy();
    this._chart = null;
  }

  _buildData() { /* FinanzwesirData aus series konstruieren */ }
  _getStrategy() { /* Strategy-Instanz je type */ }
  _getCanvas() { /* Canvas aus container */ }
}
```

**App-seitige Nutzung:**

```js
const chart = new FwAppChart({
  container: document.querySelector('#chart-container'),
  series: appContext.chartSeries,
  type: 'line',
  options: { currency: '€', range: 'max' }
});
chart.render();

// Slider-Update:
slider.addEventListener('input', () => {
  const newSeries = marketTimeStrategy.compute(slider.value);
  chart.update(newSeries);
});
```

**Vorteile:**
- Sauberer API-Vertrag: `render()`, `update(newSeries)`, `destroy()`
- Alle künftigen Apps nutzen dieselbe Klasse
- Kein Eindringen in ChartEngine-Interna
- Slider-Lifecycle (`update()`) ist explizit modelliert
- `FwAppChart` ist generisch — funktioniert für Balken- und Kreisdiagramme ebenso

**Risiken / offene Fragen:**
- Neue Datei, die importiert aus mehreren Engine-Layer-Dateien → enge Kopplung an Engine-Interna (aber keine Änderung daran)
- Die Direktimporte aus Layer-Dateien erzeugen implizite Abhängigkeiten ohne formalen Kontrakt
- Alternative: Ein `fw-chart-engine/index.js` Re-Export-Fassade würde die öffentlichen Teile explizit machen. Kostet eine weitere Datei, macht die Grenze aber formal.

**Bewertung:** Sauberste Lösung für mehrere Apps. Einmalig etwas mehr Aufwand. Empfohlen.

---

### C4 — DataSource-Abstraktion in ChartEngine (Platform-Ansatz)

**Idee:** ChartEngine erhält eine `DataSource`-Abstraktion. Statt hardkodiertem CSV-URL-Laden gibt es austauschbare DataSource-Implementierungen:

```js
class UrlDataSource {
  async load(url, options) { return CSVParser.parse(url, options); }
}

class MemoryDataSource {
  constructor(data) { this._data = data; }
  async load() { return Promise.resolve(this._data); }
}

// ChartEngine akzeptiert DataSource:
engine.init({ sources: [new MemoryDataSource(finanzwesirData)] });
```

**Vorteile:**
- Maximale Erweiterbarkeit (API-Endpoint, WebSocket, IndexedDB)
- Engine bleibt einziger Einstiegspunkt — kein zweites Modul

**Risiken / Nachteile:**
- Erheblicher Umbau an ChartEngine.js
- Löst Probleme, die heute nicht existieren
- Verletzt das YAGNI-Prinzip für ein Einpersonen-Blog
- Verführt zu over-engineering in der Spec

**Bewertung:** Für diesen Kontext Overengineering. Fällt aus.

---

## 5. Analytische Linsen

### Advocatus Diaboli

Das synthetische `FinanzwesirData` (C1) ist die verlockendste Option, weil sie keine Engine-Änderungen erfordert. Aber:

1. **Stille Kupplung:** `LineChartStrategy.transform()` wurde nie dafür designed, synthetische Daten zu verarbeiten. Es gibt keinen Vertrag darüber, was der Konstruktor annimmt. Wenn eine künftige Engine-Version die interne Row-Verarbeitung ändert, bricht C1 ohne Fehlermeldung.
2. **Testbarkeit:** Wie verifiziert man, dass synthetisches FinanzwesirData korrekt durch `detectRhythm()` läuft? MONTHLY-Rhythmus mit 28–31-Tage-Varianz muss stabil erkannt werden.
3. **Slider-Lifecycle:** `chart.update(newSeries)` ist bei C1 undefiniert. Der bestehende Chart.js Smart-Update-Pfad in `ChartEngine._draw()` ist nicht zugänglich. Jeder Slider-Tick würde `new Chart()` + `chart.destroy()` bedeuten — Performance-Frage bei 120 Datenpunkten.

### Occam's Razor

Die einfachste Lösung, die tatsächlich alle Anforderungen erfüllt:

- 0 Engine-Änderungen → C1 (aber Slider-Update-Pfad fehlt)
- Expliziter Slider-Update-Pfad + 0 Engine-Änderungen → C3 (`FwAppChart`)
- Sauberster ChartEngine-Einstieg + minimale Engine-Änderung → C2

**Schärfster Test:** Slider-Tick → welche Lösung ist am wenigsten schmerzhaft?
- C1: Destroy + Recreate auf jedem Tick. Funktioniert. Wahrscheinlich akzeptabel für 120 Punkte.
- C3: `chart.update(newSeries)` kapselt diese Logik. Sauber.

Occam bevorzugt C3 — es ist minimal, aber vollständig.

### Munger: Invert — Was würde garantiert scheitern?

1. **Zwei Rendering-Pfade:** Ein Chart-System in der Engine, ein weiteres in der App → Styling-Drift, doppelte Pflege. (Schon ausgeschieden mit Optionen A und B.)
2. **Kein Update-Pfad für Slider:** Charts die auf jede Slider-Bewegung mit `new Chart()` antworten → Flackern, CPU-Spitze, schlechte UX.
3. **Kein formaler API-Vertrag:** Direkte Nutzung privater Engine-Methoden ohne Dokumentation → spätere Engines brechen silent.
4. **Spezialisierte Klasse statt generischer:** Eine `SparplanChart`-Klasse, die nur für einen Anwendungsfall gebaut ist → jede neue App braucht eine neue Klasse, alle leicht verschieden.

**Invertiert:** Gesucht ist eine generische, benannte Klasse mit explizitem Lifecycle, die Engine-Utilities importiert aber keine Engine-Interna berührt.

---

## 6. FAANG-Analogien

### Netflix — „No premature abstractions"

Netflix-Prinzip: Eine Abstraktion bauen, wenn der Schmerz real ist — nicht vorher.

Für Pilot-1 (eine App, ein Chart): Kein `FwAppChart` sofort. Direkt den minimalen Adapter-Code inline in `app.js` schreiben (~50 Zeilen). Wenn Pilot-2 denselben Code braucht, erst dann extrahieren.

**Konsequenz für OA-02:** C1 als erste Iteration. Nach Pilot-2: Extraktion zu C3.

**Problem hier:** Das Projekt hat explizit Pilot-2 als „Chart-Engine-Integration-Beweis" definiert (PILOT_STRATEGY.md). Der Druck, die Abstraktion jetzt sauber zu machen, ist real — nicht hypothetisch.

### Amazon — „API-first, implementation second"

Amazon schreibt zuerst die Pressemitteilung und das FAQ. Der API-Vertrag ist das Produkt:

```js
// Der Vertrag (spec-first):
const chart = new FwAppChart({
  container: element,
  series: [{ x: Date, y: number }],
  type: 'line',
  options: { currency: '€', range: 'max' }
});
chart.render();
chart.update(newSeries);  // Slider-Tick
chart.destroy();
```

Implementierung kann sich ändern — der API-Vertrag nicht. Alle künftigen Apps nutzen diesen Vertrag ohne Implementierungsdetails zu kennen.

**Konsequenz für OA-02:** C3 (`FwAppChart`) mit dem API-Vertrag zuerst in die Spec schreiben, dann implementieren.

### Google — „Platform thinking"

Google würde die DataSource-Abstraktion (C4) bauen und die Engine zur echten Plattform machen. Für ein Einpersonen-Blog mit einer Handvoll Apps ist das Overengineering.

**Konsequenz für OA-02:** C4 explizit ausgeschlossen. Aber der Google-Ansatz des „gemeinsamen Re-Export-Index" (`fw-chart-engine/index.js`) wäre eine sinnvolle Ergänzung zu C3: Apps importieren nicht direkt aus Layer-Dateien, sondern aus einem formalen öffentlichen Export.

---

## 7. Empfehlung des einreichenden Engineers

### Primäre Empfehlung: C3 — FwAppChart (mit optionalem Export-Index)

**Begründung:**

1. **Generisch:** `FwAppChart` ist nicht an einen Anwendungsfall gebunden. Jede App-Fabrik-App nutzt dieselbe Klasse.
2. **Vollständiger Lifecycle:** `render()`, `update(newSeries)`, `destroy()` — Slider-Updates sind explizit modelliert.
3. **0 Engine-Änderungen:** Keine Touches an ChartEngine.js, CSVParser.js, FinanzwesirData.js.
4. **Synthetisches FinanzwesirData:** C3 nutzt intern dieselbe Hypothese wie C1 (FinanzwesirData konstruieren ohne CSVParser), aber kapselt das Risiko hinter einem Vertrag. Wenn die Hypothese falsch ist, ist der Fehler an einer Stelle, nicht verstreut in 5 Apps.
5. **API-first:** Der Vertrag (`render/update/destroy`) kann in `APP-INTERFACE.md §4` dokumentiert werden, bevor die Implementierung beginnt.

### Optionaler Zusatz: Export-Fassade

Eine neue Datei `fw-chart-engine/index.js`, die nur die öffentlichen Teile re-exportiert:

```js
// Theme/assets/js/fw-chart-engine/index.js
export { FwTheme } from './core/FwTheme.js';
export { FwFormatUtils } from './core/FwFormatUtils.js';
export { FwLayoutRules } from './core/FwLayoutRules.js';
export { FwDateUtils } from './core/FwDateUtils.js';
export { FinanzwesirData } from './data/FinanzwesirData.js';
export { LineChartStrategy } from './strategies/LineChartStrategy.js';
// Bewusst NICHT exportiert: CSVParser (TABU), ChartEngine._draw() (privat)
```

`FwAppChart` importiert dann ausschließlich aus diesem Index — nicht aus Layer-Dateien direkt. Das macht die Engine/App-Grenze formal sichtbar.

**Kosten:** 1 weitere Datei, ~10 Zeilen. Nutzen: formaler API-Kontrakt für alle künftigen Importeure.

### Vorher zu verifizieren (Pflicht vor Implementierung)

1. **Synthetisches FinanzwesirData:** Läuft `LineChartStrategy.transform()` korrekt durch, wenn FinanzwesirData aus berechneten Monatsdaten (nicht aus CSVParser) konstruiert wird? Insbesondere: `detectRhythm()` mit MONTHLY-Zeitstempeln (28–31-Tage-Varianz)?
2. **Slider-Update-Pfad:** Ist `chart.destroy()` + `new Chart()` bei 120 Datenpunkten schnell genug für flüssige Slider-UX (debounced, ~100ms)? Oder braucht es `chart.data.datasets[0].data = newData; chart.update()`?
3. **A11y-Anforderungen:** `getA11yData()` existiert in LineChartStrategy. Wird das Ergebnis im aktuellen Renderer tatsächlich in den DOM injiziert? (Scout hat eine Implementierungslücke gemeldet.)

---

## 8. Offene Fragen für das Peer-Review

1. **C1 vs. C3:** C1 (synthetisches FinanzwesirData direkt) hat 0 neue Dateien. C3 (FwAppChart) hat 1 neue Datei. Ist der Overhead von C3 für ein Einpersonen-Blog gerechtfertigt, oder ist C1 + spätere Extraktion (Netflix) die bessere Sequenz?

2. **Vertrag vor Implementierung:** Sollte der `FwAppChart`-API-Vertrag (`render/update/destroy`) zuerst in `APP-INTERFACE.md §4` spezifiziert werden, bevor eine Zeile Code geschrieben wird? Oder direkt in Code iterieren?

3. **Export-Fassade:** Ist `fw-chart-engine/index.js` sinnvoll? Oder ist es Overengineering, wenn die Engine nie als npm-Paket veröffentlicht wird?

4. **Slider-Update-Strategie:** `destroy() + new Chart()` vs. `chart.data = …; chart.update()` — welcher Ansatz ist für 120 Datenpunkte + 100ms Debounce realistisch?

5. **FinanzwesirData als Grenze:** Der Konstruktor ist nicht dokumentiert als „öffentlich nutzbar ohne CSVParser". Sollte er explizit als solcher markiert/dokumentiert werden? Oder wäre das eine riskante Erweiterung der TABU-Datei?

6. **Naming:** `FwAppChart` folgt dem bestehenden `Fw*`-Schema. Alternativen: `AppChartAdapter`, `FwChartBridge`, `FwInlineChart`. Was signalisiert die Rolle am klarsten?

---

## Anhang: Dateistruktur (relevant für diese Entscheidung)

```
Theme/assets/js/fw-chart-engine/
  core/
    ChartEngine.js          ← Layer 2, Änderbar mit Full-Gate
    FwSmartScales.js        ← Layer 4, Vorsicht
    FwDateUtils.js          ← Layer 4, SSoT Zeit — VORSICHT
    FwRenderer.js           ← Layer 5
    FwLayoutRules.js        ← Layer 5
    FwFormatUtils.js        ← Layer 5
    FwTheme.js              ← Layer 5
  data/
    FinanzwesirData.js      ← Layer 1, TABU (nicht ändern)
    CSVParser.js            ← Layer 1, TABU (nicht ändern)
  strategies/
    LineChartStrategy.js    ← Layer 3
    BarChartStrategy.js     ← Layer 3
    PieChartStrategy.js     ← Layer 3
  plugins/
    FwChartPlugins.js       ← Layer 3

Theme/assets/js/fw-app-chart/   ← NEU (für C3)
  FwAppChart.js
  index.js (optional)

Theme/assets/js/fw-chart-engine/index.js   ← NEU (Export-Fassade, optional)

Apps/prokrastinations-preis/
  app.js
  MarketTimeStrategy.js
  APP_SPEC.md
  SLICE_PLAN.md

docs/spec/APP-INTERFACE.md   ← §4 ChartAdapter/API: heute TBD, muss konkretisiert werden
docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
```
