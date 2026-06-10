# HANDOVER — APP-01 Slice 4 Implementierung

Stand: 2026-06-10 | Session: APP-01-Slice-4-Gate | Geändert von: Claude

---

## 1. Status

- APP-01 `prokrastinations-preis`
- Slices 0–3 fertig und getestet
- Slice 4 soll SparplanChart ergänzen
- Gate 1 Spec-Trace bestanden
- Gate 2 Bridge-Plan bestanden
- Gate 3 Implementierungsplan mit Auflagen freigegeben
- **Noch keine Implementierung erfolgt**

---

## 2. Akzeptierte Architekturentscheidung

- Kein app-lokaler Chart.js-Renderer
- Kein `new Chart()` in APP-01
- Kein `financial-chart-module` für AppChart
- Pfad 2 läuft über `ChartEngine.renderFromData()`
- `renderFromData()` ist nur Bridge / Orchestration
- `ChartEngine.js` bleibt Layer 2
- Bestehende `LineChartStrategy.js` bleibt Layer 3 / Brain — **keine Änderung**
- Keine inline Strategy in `ChartEngine.js`
- Keine Domainlogik in ChartEngine oder Renderer
- Keine AppChart-Sonderlogik
- Kein `isAppChart`
- App wählt deklarativ Engine-Fähigkeiten per `features`

---

## 3. Datenpfad

```
APP-01 chartSeries
→ ChartEngine.renderFromData()
→ Validierung / Mapping / Deep-Freeze / WeakMap-State
→ bestehende LineChartStrategy
→ _draw()
→ Renderer / Chart.js
```

APP-01 liefert:

```js
[{ month: 'YYYY-MM', depotwert: number }, ...]
```

Bridge erzeugt:

```js
{
  columns: ['Date', 'Depotwert'],
  rows: [
    { Date: 'YYYY-MM-01', Depotwert: number }
  ],
  metadata: { unitKey: 'CURRENCY_EUR' }
}
```

Hinweis zu `'-01'`-Suffix: `'YYYY-MM-01'` wird von `FwDateUtils.parse()` korrekt verarbeitet (`new Date('YYYY-MM-01')` ist in allen Engines ein valider ISO-String). `'YYYY-MM'` ohne Tag ist nicht portabel.

---

## 4. Feature-/Capability-Konfiguration

Nicht „Unterdrückung" als Sonderfall, sondern offizielle App-Auswahl aus Engine-Fähigkeiten.

Für Slice 4 nur wirklich ausgewertete Features setzen:

```js
features: {
  rangeControls: false,
  headline: false
}
```

Nicht in diesem Patch setzen:

```js
// legend: 'auto'   → wird im Minimalpatch nicht aktiv ausgewertet;
// tooltip: true     → bleibt über bestehende Engine-Defaults aktiv
// a11y: true        → bleibt über bestehende Engine-Defaults aktiv
```

Begründung: Tooltip, A11y und Legende funktionieren über bestehende Engine-Logik korrekt für 1-Serien-EUR-Daten ohne zusätzliche Flags.

---

## 5. Implementierungsauftrag

### 5.1 ChartEngine.js

**Datei:** `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`

**Änderungen:**

**a) Constructor:** Nach `this.renderer = new FwRenderer();` ergänzen:

```js
this._appChartStates = new WeakMap();
```

**b) Neue Methode `renderFromData(container, chartSeries, options = {})`:**

Pflichten in dieser Reihenfolge:

Container-Guard (alle vier, mit `console.error` + return):
- Container ist HTMLElement
- Container hat Attribut `data-fw-appchart`
- Container hat nicht `.financial-chart-module` in classList
- Container hat kein Attribut `data-csv`

chartSeries-Validierung (mit `this.renderer.showError(container, ...)` + return):
- Array und nicht leer
- jedes Element: `month` entspricht `YYYY-MM` (Regex `^\d{4}-\d{2}$`)
- jedes Element: `depotwert` ist `Number.isFinite()` und `> 0`
- Reihenfolge aufsteigend: letzter month ≥ erster month

Typ-Auflösung:
```js
const type = (options.type && this.strategies[options.type]) ? options.type : 'line';
```

Mapping `chartSeries` → kanonisches Format:
```js
const frozenData = Object.freeze({
  columns: Object.freeze(['Date', 'Depotwert']),
  rows: Object.freeze(
    chartSeries.map(item =>
      Object.freeze({ Date: item.month + '-01', Depotwert: item.depotwert })
    )
  ),
  metadata: Object.freeze({ unitKey: 'CURRENCY_EUR' })
});
```

Feature-Normalisierung (nur ausgewertete Features):
```js
const inputFeatures = options.features || {};
const features = Object.freeze({
  rangeControls: inputFeatures.rangeControls,
  headline:      inputFeatures.headline
});
```

WeakMap-State-Mechanik:
- Erster Aufruf (kein Eintrag): State anlegen, in WeakMap speichern, `_draw()` nimmt Initial-Pfad
- Folgeaufruf (Eintrag vorhanden):
  - `state.data = frozenData` (Daten ersetzen)
  - `state.config.features = features`
  - `state.chartInstance` bleibt erhalten → `_draw()` nimmt Smart-Update-Pfad (`chart.update()`)
  - Typ-Wechsel verboten: `if (state.type !== type) { console.error(...); return; }`

State-Objekt beim ersten Aufruf:
```js
{
  data:          frozenData,
  strategy:      this.strategies[type],
  type:          type,
  config:        { colors: {}, options: '', title: '', features },
  range:         'max',
  view:          'value',
  viewOptions:   [],
  benchmark:     null,
  chartInstance: null
}
```

Abschluss: `this._draw(container, state);`

Kein `this.renderer.showLoading()` — Daten sind app-berechnet, kein Fetch.

**Pflichten für den Methoden-Rumpf:**
- Keine inline Strategy
- Keine Chart.js-Logik
- Keine Domainbegriffe (`Sparplan`, `ProkrastinationsPreis`, `APP-01`)
- Kein `isAppChart`

---

### 5.2 Headline-Feature in `_draw()`

**Datei:** `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`

In `_draw()`, unmittelbar nach der bestehenden Zeile:
```js
runtimeConfig.headline = meta.headline || null; // BAN V5.0.0
```

Diese 2 Zeilen ergänzen:
```js
// CHANGED — Feature-Auswahl: headline === false → BAN unterdrücken
if ((runtimeConfig.features || {}).headline === false) runtimeConfig.headline = null;
```

Keine Wirkung auf bestehende Charts (kein `features` → `{}.headline` = `undefined` ≠ `false`).

---

### 5.3 FwRenderer.js

**Pfad zuerst prüfen** (der korrekte Pfad ist):

```
Theme/assets/js/fw-chart-engine/core/FwRenderer.js
```

(Nicht `renderer/FwRenderer.js` — dieser Pfad existiert nicht.)

**Änderung in `_renderControls()`:**

Unmittelbar nach dem bestehenden Pie-Guard (`if (type === 'pie') return null;`) einfügen:

```js
// CHANGED — Feature-Auswahl: rangeControls === false → keine Range-Buttons
const features = config.features || {};
if (features.rangeControls === false) return null;
```

Keine weiteren Änderungen an FwRenderer.js.

**Warum bestehende Charts unverändert bleiben:** `config.features` fehlt bei allen bestehenden `_processContainer()`-Charts → `config.features || {}` = `{}` → `{}.rangeControls` = `undefined` → `undefined === false` ist `false` → Range-Button-Logik läuft wie bisher durch.

Keine AppChart-Sonderlogik, kein `isAppChart`, keine Domainbegriffe.

---

### 5.4 APP-01

**Dateien:**
```
Apps/prokrastinations-preis/app.js
Apps/prokrastinations-preis/app.css
Apps/prokrastinations-preis/app.test.html
```

**app.js — was bereits vorhanden ist:**
- `marketTimeStrategy()` berechnet bereits `chartSeries` (Z.68–71): `[{ month: 'YYYY-MM', depotwert: number }]`
- `buildAppContext()` speichert `chartSeries` im AppContext (Z.95)
- `updateKpiCards()` gibt `ctx` zurück, der `ctx.chartSeries` enthält (Z.193–198)
- Slider-`input`-Handler ruft `updateKpiCards(rate)` auf — Rückgabewert wird aktuell verworfen (Z.209)

**app.js — was hinzukommt:**

1. Import am Dateianfang ergänzen:
```js
import { ChartEngine } from '../../Theme/assets/js/fw-chart-engine/core/ChartEngine.js';
```

2. In `renderContent()` — ChartEngine-Instanz und Chart-Container erstellen (nach `kpiArea`, vor `a11yRegion`):
```js
const chartEngine = new ChartEngine();

const chartSection = document.createElement('div');
chartSection.setAttribute('data-fw-appchart', 'sparplan');
chartSection.className = 'fw-app__chart-section';
container.appendChild(chartSection);
```

Kein `financial-chart-module`, kein `data-csv`.

3. Initialer Chart-Aufruf nach `const initCtx = updateKpiCards(initialRate)`:
```js
chartEngine.renderFromData(chartSection, initCtx.chartSeries, {
  type: 'line',
  features: {
    rangeControls: false,
    headline: false
  }
});
```

4. Slider-`input`-Handler — Rückgabewert nutzen und Chart aktualisieren:
```js
slider.addEventListener('input', () => {
  const rate = clamp(parseInt(slider.value, 10), 50, 2000);
  slider.setAttribute('aria-valuenow', String(rate));
  slider.setAttribute('aria-valuetext', rate + ' Euro pro Monat');
  valueDisplay.textContent = rate + ' €/Monat';
  const ctx = updateKpiCards(rate);                               // CHANGED: Rückgabewert nutzen
  chartEngine.renderFromData(chartSection, ctx.chartSeries, {    // NEW
    type: 'line',
    features: { rangeControls: false, headline: false }
  });
});
```

`chartEngine.renderFromData()` findet State via WeakMap → `state.chartInstance` ist gesetzt → Smart-Update-Pfad → `chart.update()` ohne DOM-Rebuild.

Kein `new Chart()`, kein Chart.js-Import, keine Canvas-Logik.

**app.css — neuer Block:**
```css
/* Slice 4: SparplanChart */
.fw-app__chart-section {
  position: relative;
  width: 100%;
  margin-top: var(--fw-space-md, 1rem);
}
```

Keine Engine-Klassen überschreiben. Innere Höhe kommt aus FwRenderer._injectStyles() (`.fw-chart-canvas-container { height: 400px }`).

**app.test.html:** Nur ergänzen wenn nötig. Der Chart-Container entsteht dynamisch in `renderContent()` — keine statische Duplikation erzwingen.

---

## 6. Harte Verbote

- Kein `new Chart()` in APP-01
- Kein Chart.js-Import in APP-01
- Keine inline Strategy in `ChartEngine.js`
- Keine Domainbegriffe in `ChartEngine.js` oder `FwRenderer.js`
- Kein `isAppChart`
- Keine negativen Sonderflags wie `noRangeButtons`
- Keine Migration bestehender `.financial-chart-module`-Charts
- Keine Änderung an:
  - `CSVParser.js`
  - `FinanzwesirData.js`
  - `FwDateUtils.js`
  - `LineChartStrategy.js`

---

## 7. Checks nach Implementierung

**Mechanische Checks (PowerShell oder Bash):**

```bash
grep -R "new Chart(" Apps/prokrastinations-preis/app.js
grep -R -i "sparplan\|prokrastination\|APP-01" Theme/assets/js/fw-chart-engine/core/ChartEngine.js
grep -R -i "sparplan\|prokrastination\|APP-01" Theme/assets/js/fw-chart-engine/core/FwRenderer.js
grep -R "isAppChart" Theme/assets/js/fw-chart-engine/
grep -R "noRangeButtons" Theme/assets/js/fw-chart-engine/
grep -R "appDataLineStrategy" Theme/assets/js/fw-chart-engine/
```

Erwartung: **Keine Treffer** für alle sechs Abfragen.

**Manuelle Browser-Checks:**

| Check | Kriterium |
|---|---|
| APP-01 lädt | Kein Fehler, kein leerer Container |
| Chart erscheint | Canvas sichtbar, 120 Monatsdatenpunkte |
| Keine Range-Buttons | `features.rangeControls === false` wirkt |
| Keine BAN/Headline | `features.headline === false` wirkt |
| Kein View-Toggle | `viewOptions: []` wirkt |
| Keine Legende | 1 Dataset → `_renderLegend()` gibt null zurück |
| Tooltip aktiv | Hover zeigt Monat + EUR-Depotwert |
| A11y-Tabelle vorhanden | Im DOM, `position: absolute; left: -9999px`, 20 Zeilen + Summary |
| Slider-Update = Smart Update | Chart aktualisiert ohne sichtbaren Flicker / DOM-Rebuild |
| KpiCards korrekt | Chart-Render beeinflusst KpiCards nicht |
| Bestehende `.financial-chart-module`-Charts | Range-Buttons, BAN, View-Toggle vollständig unverändert |

---

## 8. Abbruchkriterien

Sofort stoppen und Bericht abgeben, wenn:

- `LineChartStrategy.transform()` wirft bei der Bridge-Datenstruktur
- `features`-Patch verändert Verhalten bestehender `.financial-chart-module`-Charts
- `WeakMap`-State führt nicht zum Smart-Update-Pfad (zweiter Aufruf: `state.chartInstance` ist null)
- APP-01 benötigt Chart.js-Import oder `new Chart()`
- Domainlogik müsste in `ChartEngine.js` oder `FwRenderer.js`
- Eine Tabu-Datei müsste geändert werden
- Feature-Auswahl erfordert `isAppChart` oder Pfad-Sonderlogik

---

## 9. Nächster Schritt im neuen Faden

Der neue Faden liest diese Datei und implementiert direkt — aber ausschließlich im oben definierten Scope.

Nach Implementierung Bericht ausgeben:

```md
# APP-01 Slice 4 — Implementierungsbericht

## Geänderte Dateien
...

## Was wurde umgesetzt?
...

## Welche Checks wurden ausgeführt?
...

## Ergebnis der Checks
...

## Offene Punkte / Risiken
...

## Abbruchkriterien verletzt?
Ja/nein
```
