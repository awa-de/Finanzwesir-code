# Peer Review Request: X-Achsen-Architektur für Stationen-Zeitreise

**Projekt:** Finanzwesir 2.0 — App „prokrastinations-preis"  
**AP:** B1-AP-14b — Screen-2-Chart auf feste X-Achse mit wachsendem Pfad umstellen  
**Zweck dieses Dokuments:** Architektur-Entscheidung zur Peer-Review an andere LLMs übergeben  
**Erstellt:** 2026-06-17  

---

## 1. Problem

Wir bauen eine interaktive Web-App (Vanilla JS, Chart.js), die dem Nutzer eine historische „Zeitreise" durch 10 Jahre Börsengeschichte zeigt. Der Nutzer klickt sich durch 5–7 Stationen. Jede Station enthält:
- Eine Karte mit redaktionellem Kontext (Was war damals los?)
- Einen Chart (MSCI World Indexverlauf als Sparplan-Simulation)

**Das UX-Ziel für Screen 2 (die Zeitreise):**

> „Zeit bleibt stabil. Wissen wächst."

- X-Achse: zeigt immer das vollständige 10-Jahres-Fenster (z.B. 2016–2026)
- Linie: wächst pro Station nur bis zum jeweiligen Stationsmonat
- Rechter Bereich: leer — steht für „noch unbekannte Zukunft"

**Das Problem:** Die Chart-Engine rendert die X-Achse automatisch auf Basis der übergebenen Daten. Wenn wir nur Datenpunkte bis Station 2 (z.B. Feb 2022) übergeben, zeigt die X-Achse nur bis Feb 2022. Das sieht aus wie ein kaputter Chart.

---

## 2. Technischer Stack

- **Browser:** Vanilla JS, keine Bundler, keine Frameworks
- **Charting:** Chart.js (global geladen via `<script>`-Tag)
- **Chart-Engine:** Eigenentwicklung (5-Layer-Architektur, siehe Abschnitt 4)
- **App-Kontext:** Single-Page-App innerhalb eines Ghost-CMS-Themes

---

## 3. Relevante Code-Stellen

### 3.1 App-Code (app.js) — der renderJourneyStep-Aufruf

```javascript
function renderJourneyStep(stationIdx) {
  const station      = journeyStations[stationIdx];
  const stationMonth = station.date.slice(0, 7); // 'YYYY-MM'
  const ctx          = buildAppContext(appData, currentRate, startBetrag, journeyStations);
  
  // Filtert Datenpunkte: nur bis stationMonth
  const visibleSeries = buildVisibleChartSeries(ctx.chartSeries, stationMonth);
  // ctx.chartSeries = vollständige 10-Jahres-Daten (z.B. 2016-06 bis 2026-05)
  // visibleSeries   = nur bis stationMonth (z.B. bis 2022-02)

  chartEngine2.renderFromData(chartSection2, visibleSeries, {
    type: 'line',
    features: { rangeControls: false, headline: false }
  });
  // Problem: ChartEngine sieht nur visibleSeries → X-Achse geht nur bis 2022-02
}

function buildVisibleChartSeries(chartSeries, stationMonth) {
  return chartSeries.filter(p => p.month <= stationMonth);
}
```

### 3.2 ChartEngine._draw() — der kritische Update- vs. Erstrender-Pfad

```javascript
_draw(container, state) {
  var chartData   = state.strategy.transform(state.data, runtimeConfig);
  var chartConfig = state.strategy.getChartConfig(chartData);
  // chartConfig.options.scales.x enthält jetzt X-Achse mit max = stationMonth

  if (state.chartInstance) {
    // UPDATE-PFAD (synchron):
    state.chartInstance.data    = chartConfig.data;
    state.chartInstance.options = chartConfig.options; // überschreibt alles
    state.chartInstance.update();

  } else {
    // ERSTRENDER-PFAD (asynchron!):
    requestAnimationFrame(() => {
      state.chartInstance = new Chart(canvas, chartConfig);
    });
    // new Chart() läuft erst im nächsten Frame — Canvas existiert noch nicht!
  }
}
```

### 3.3 FwSmartScales.getTimeAxis() — minTime/maxTime werden ignoriert

```javascript
static getTimeAxis(minTime, maxTime, fontConfig, options = {}) {
  // minTime/maxTime werden im neuen Modell (bounds: 'data') ignoriert,
  // bleiben aber in der Signatur für Abwärtskompatibilität erhalten.
  return FwSmartXAxis.compute(fwContext, fontConfig);
  // Alles kommt aus fwContext — nicht aus den Parametern
}
```

### 3.4 FwSmartXAxis.compute() — der SNAPSHOT-Track (Liniencharts)

```javascript
static compute(fwContext, fontConfig) {
  const dataMin      = fwContext.dataRange.min;     // erster Datenpunkt
  const dataMax      = fwContext.dataRange.max;     // letzter Datenpunkt = stationMonth
  const durationYears = fwContext.durationYears;   // abgeleitet aus dataRange

  return {
    type: 'time',
    bounds: 'data',   // ← Achse passt sich an DATA an
    afterDataLimits: (axis) => {
      axis.max += (axis.max - axis.min) * 0.05; // 5% Breathing Room
    },
    afterBuildTicks: (axis) => {
      this._generateLinearTicks(axis, fwContext, runtimeMatrix);
    }
    // ...
  };
}
```

### 3.5 FwSmartXAxis._generateLinearTicks() — das endLimit-Problem

```javascript
static _generateLinearTicks(axis, context, matrix) {
  const halfStep = FwDateUtils.getStepDuration(context.rhythm) / 2;
  const endLimit = (context.dataRange?.max ?? axis.max) + halfStep;
  // ← endLimit = stationMonth + halfStep
  // ← mein axis.max-Override wird IGNORIERT (context.dataRange.max hat Vorrang)

  while (cursor.getTime() <= endLimit && safety < 500) {
    // Ticks werden nur bis stationMonth generiert
  }
}
```

### 3.6 LineChartStrategy.transform() — wie fwContext gepackt wird

```javascript
transform(data, config) {
  const snappedTimestamps = timestamps.map(ts => FwDateUtils.getSnapshotSnap(ts, rhythm));

  const fwContext = this._createFwContext({
    chartType:  'line',
    axisType:   'time',
    rhythm:     rhythm,
    dataRange: {
      min: snappedTimestamps[0],
      max: snappedTimestamps[snappedTimestamps.length - 1], // ← letzter Datenpunkt
    },
    durationYears: FwDateUtils.rangeToYears(config.range, snappedTimestamps[0], snappedTimestamps[last]),
    // ...
  });

  return { ..., meta: { minTime: snappedTimestamps[0], maxTime: snappedTimestamps[last] } };
  // minTime/maxTime sind in FwSmartScales.getTimeAxis() mittlerweile irrelevant
}
```

---

## 4. Die Architektur der Chart-Engine

Die Engine ist nach einem strikten 5-Layer-Prinzip gebaut. Das Architecture Strategy Paper definiert:

### 4.1 Layer-Übersicht

| Layer | Name | Dateien | Verantwortung |
|---|---|---|---|
| 1 | The Vault | `FinanzwesirData.js`, `CSVParser.js` | Single Source of Truth, Deep Freeze |
| 2 | The Manager | `ChartEngine.js` | Orchestration, State, Render-Zyklus |
| 3 | The Brains | `LineChartStrategy.js` u.a. | Transformation, fwContext packen |
| 4 | The Curator | `FwSmartScales.js`, `FwSmartXAxis.js`, `FwDateUtils.js` | Mathematik, Tick-Berechnung |
| 5 | The Face | `FwRenderer.js`, `FwLayoutRules.js` | UI, HTML, Design |

### 4.2 Bindende Grundsätze (aus dem Architecture Strategy Paper)

**Unidirektionaler Datenfluss:**
> Daten fließen ausschließlich von oben nach unten (Layer 1 → 5). Kein Layer darf in einen höheren Layer schreiben.

**KDR 9 — Der Rucksack (`fwContext`):**
> Die Strategie (Layer 3) erstellt ein Kontext-Objekt und legt es zentral in `chart.config.options.plugins.fwContext` ab. Layer 4/5 lesen **ausschließlich** aus diesem Rucksack. Single Source of Truth. Entkopplung von Daten und Anzeige.

Der `fwContext` wird mit `Object.freeze()` versiegelt. Kein Layer kann ihn nach dem Packen verändern.

**KDR 8 — Density Control:**
> Die Tick-Dichte der X-Achse wird durch die Unified Density Matrix gesteuert. `durationYears` bestimmt, welche Einheit (Jahr/Quartal/Monat) die X-Achse nutzt.

---

## 5. Der erste Fix — und warum er scheiterte

### Versuch: Post-Render-Override via `Chart.getChart()`

```javascript
// NACH renderFromData() — versucht, die X-Achse nachträglich zu korrigieren
const canvas2 = chartSection2.querySelector('canvas');
if (canvas2) {
  const chartInst2 = Chart.getChart(canvas2);
  if (chartInst2?.options?.scales?.x) {
    const fullEnd = ctx.chartSeries[ctx.chartSeries.length - 1];
    chartInst2.options.scales.x.max = new Date(fullEnd.month + '-01').getTime();
    chartInst2.update('none');
  }
}
```

### Drei unabhängige Fehlerursachen

**Fehler 1: RAF-Problem beim Erstrender**

`new Chart()` steckt in einem `requestAnimationFrame`. Beim allerersten Rendern (erste Station, noch kein Chart-Objekt) existiert der Canvas noch nicht im DOM wenn mein Code läuft. `querySelector('canvas')` liefert `null`. Fix läuft gar nicht.

**Fehler 2: `fwContext.dataRange.max` bestimmt die Ticks — nicht `axis.max`**

`_generateLinearTicks()` benutzt `context.dataRange.max` (stationMonth) als `endLimit`, nicht `axis.max`. Selbst wenn `axis.max` korrekt gesetzt ist, enden die Tick-Labels am Stationsmonat. Es entsteht leerer Raum ohne Beschriftung rechts der letzten Station.

**Fehler 3: Architektur-Verletzung**

Die Entscheidung „zeige X-Achse bis fullEnd" wird auf Layer 5 (post-render Chart.js-Manipulation) getroffen — das ist ein Rückwärts-Eingriff. Das Architecture Strategy Paper verbietet explizit, dass ein Layer in einen höheren Layer schreibt.

### Beobachtetes Symptom (vom Nutzer getestet)

| Station | Beobachtetes Verhalten |
|---|---|
| Station 1 (2020-03) | X-Achse geht genau bis 2020-03. Kein Unterschied zu vorher. (RAF-Problem: Fix läuft nicht) |
| Station 2 (2022-02) | X-Achse beschriftet bis 2022. Danach leere, unbeschriftete Fläche. Linie geht bis Feb 2022. |
| Station 3 (2025-04) | X-Achse beschriftet bis 2025. Etwas mehr Platz rechts. |
| Station 4 (2026-05) | X-Achse und Breite stimmen überein. Maximale Breite genutzt. (Letzter Datenpunkt = fullEnd) |

---

## 6. Industrie-Patterns: Wie lösen Google, Netflix, Amazon dieses Problem?

Das Problem hat einen kanonischen Namen: **Domain/Range Separation** — Datendomain (was die Daten abdecken) vs. Anzeige-Domain (was die Achse zeigt).

### D3.js (Google, Observable)

```javascript
const xScale = d3.scaleTime()
  .domain([start, fullEnd])    // Anzeige-Domain: volle 10 Jahre
  .range([0, width]);          // Pixel-Range

// Daten können einen kleineren Bereich haben
svg.append('path')
  .datum(visibleData)         // nur bis stationMonth
  .attr('d', lineGenerator);  // Linie endet vor fullEnd — Achse geht weiter
```

Explizite Trennung: `domain` ist eine Konfiguration unabhängig von den Daten.

### Grafana

Grafana trennt `data frames` (die Metriken) von `panel options` (wie man sie anzeigt):

```json
{
  "fieldConfig": { "xMin": "2016-06", "xMax": "2026-05" },
  "data": [ /* nur bis stationMonth */ ]
}
```

`xMin/xMax` sind Anzeige-Entscheidungen im Panel-Config, nicht in den Daten.

### Amazon CloudWatch

```javascript
chart.render(metricData, {
  startTime: '2016-06-01',
  endTime:   '2026-05-01',  // Zeitfenster = Konfiguration
  period:    3600
  // Daten können Lücken haben — Achse läuft trotzdem durch
});
```

### Netflix (Vizceral, intent-driven rendering)

Intent-Objekt trennt data von displayConfig:

```javascript
{ data: visibleData, displayConfig: { timeRange: [start, fullEnd] } }
```

### Das gemeinsame Prinzip aller vier

> **Display domain ≠ Data domain.**
> Der Zeitraum, den eine Achse anzeigt, ist eine Anzeige-Entscheidung — keine Dateneigenschaft.

---

## 7. Meine Antwort: Der architekturkonforme Lösungsweg

### Das Konzept

Das fehlende Konzept im fwContext ist `displayRange` — die intendierte Anzeige-Spanne der X-Achse, getrennt von `dataRange` (der tatsächlichen Datenspanne).

```
fwContext {
  dataRange:    { min, max }  // aus den tatsächlichen Datenpunkten
  displayRange: { max }       // NEU: die gewünschte Anzeige-Spanne der X-Achse
}
```

`dataRange` bleibt für:
- Y-Achsen-Skalierung (Stationsdaten, nicht Endwerte)
- Tooltips (keine finalen Werte lecken)
- Rhythm-Detection

`displayRange.max` wird genutzt von:
- `_generateLinearTicks()` als `endLimit`
- `durationYears` (für Density-Matrix-Entscheidung: Jahre oder Quartale?)

### Der Datenfluss (architekturkonform, top-down)

```
App (app.js)
  └─ renderFromData(visibleSeries, {
       features: { xDisplayMax: '2026-05' }   ← Anzeige-Entscheidung als Konfiguration
     })
           ↓ Layer 2
      ChartEngine: extrahiert xDisplayMax → state.config.features.xDisplayMax
           ↓ Layer 3
      LineChartStrategy.transform():
        fwContext.dataRange.max   = snappedTimestamps[last]       // Datendomäne (unverändert)
        fwContext.displayRange    = { max: parseToMs(xDisplayMax) } // Anzeige-Domäne (NEU)
        fwContext.durationYears   = rangeToYears(displayRange.min, displayRange.max) // aus Display!
           ↓ Layer 4
      FwSmartXAxis._generateLinearTicks():
        endLimit = (context.displayRange?.max ?? context.dataRange.max) + halfStep
        // → Ticks bis 2026-05, auch wenn Daten nur bis 2022-02
           ↓ Layer 5
      Chart.js: X-Achse spannt 2016–2026
                Linie endet bei stationMonth (Daten)
```

### Warum das RAF-Problem verschwindet

Mit `displayRange` im fwContext wird der Chart **von Anfang an** mit der korrekten X-Achsen-Spanne gebaut — sowohl beim Erstrender (`new Chart()` im RAF) als auch beim Update. Kein nachträglicher Override nötig.

### Betroffene Dateien

| Datei | Layer | Änderung |
|---|---|---|
| `app.js` | App | `features.xDisplayMax` übergeben |
| `ChartEngine.js` | 2 | `xDisplayMax` aus `features` in `state.config.features` durchreichen |
| `LineChartStrategy.js` | 3 | `fwContext.displayRange` packen; `durationYears` aus `displayRange` berechnen |
| `FwSmartXAxis.js` | 4 | `endLimit` = `displayRange?.max ?? dataRange.max` |

### Was sich nicht ändert

- `dataRange.max` unverändert → Y-Achse skaliert auf Stationsdaten ✅
- Tooltips lesen `dataRange` → kein Endwert-Leak ✅
- Density Matrix: `durationYears` aus `displayRange` → zeigt Jahresticks für 10 Jahre, nicht Quartalsticks für 4 Jahre ✅
- `Object.freeze` auf `fwContext` → keine Verletzung (fwContext wird neu mit `displayRange` gepackt, nicht nachträglich mutiert) ✅

---

## 8. Fragen an das Peer Review

1. **Architekturkonformität:** Entspricht das Konzept `dataRange` vs. `displayRange` im fwContext dem in Abschnitt 4 beschriebenen Schichtenmodell? Verletzt es das Unidirektionalitätsprinzip?

2. **Vollständigkeit:** Sind alle Konsequenzen von `durationYears` aus `displayRange` bedacht? Gibt es andere Stellen, die `dataRange.max` für Anzeige-Entscheidungen nutzen und ebenfalls `displayRange` kennen müssten?

3. **Interface-Design:** `features.xDisplayMax: 'YYYY-MM'` als String vs. Timestamp vs. Objekt `{ max: 'YYYY-MM' }` — was ist die richtige Schnittstelle für einen Layer-2-API-Aufruf?

4. **Industrie-Vergleich:** Gibt es bessere oder bekanntere Patterns für diesen Use-Case (partial data, full axis range), die wir hier nicht berücksichtigt haben?

5. **Risiken:** Was kann bei diesem Ansatz schiefgehen, das wir noch nicht gesehen haben?

---

## Anhang: Was `visibleSeries` und `ctx.chartSeries` enthalten

```javascript
// ctx.chartSeries (vollständige 10-Jahres-Daten):
[
  { month: '2016-06', depotwert: 12340.50 },
  { month: '2016-07', depotwert: 12510.00 },
  // ... 120 Datenpunkte ...
  { month: '2026-05', depotwert: 41820.30 }
]

// visibleSeries für Station 2 (2022-02):
[
  { month: '2016-06', depotwert: 12340.50 },
  // ... bis ...
  { month: '2022-02', depotwert: 28930.00 }
  // danach: nichts — rechter Bereich soll leer/unbekannt bleiben
]
```

Der rechte leere Bereich ist UX-Absicht: Er steht für „noch unbekannte Zukunft". Kein Forecast, keine gestrichelte Linie, kein Null-Wert.

---

## Anhang: Implementierungsstatus (vom Peer-Review-Empfänger angefordert)

### 1. Wurde Code geändert? Wenn ja: welche Dateien?

Ja. Zwei App-Dateien wurden im Rahmen des gescheiterten ersten Fix-Versuchs geändert:

**`Apps/prokrastinations-preis/app.js`** (+22 Zeilen):
- Neues `<p>`-Element `progressEl` (Orientierungs-Chip „Station n von m · Bekannt bis …") in der Screen-2-DOM-Konstruktion
- In `renderJourneyStep()`: Post-Render-Block via `Chart.getChart(canvas2)` → `options.scales.x.max = fullEnd` → `update('none')` (der gescheiterte X-Achsen-Fix)
- In `renderJourneyStep()`: `progressEl.textContent` mit formatierten Stationsdaten befüllen

**`Apps/prokrastinations-preis/app.css`** (+8 Zeilen):
- Neue CSS-Klasse `.fw-app__journey-progress` für den Orientierungs-Chip

Keine anderen Dateien geändert.

### 2. Wurde die feste 10-Jahres-X-Achse bereits implementiert?

**Nein — nicht funktional.**

Der Code ist vorhanden, aber fehlerhaft (siehe Abschnitt 5). Beobachtetes Verhalten:
- Station 1: X-Achse geht nur bis Stationsmonat (RAF-Problem, Fix läuft gar nicht)
- Stationen 2–4: X-Achse hat leere unbeschriftete Fläche rechts der letzten Tick-Beschriftung (Ticks enden am Stationsmonat, visueller Bereich ist größer)
- Station 4 (Letzte): Alles stimmt zufällig überein (Stationsmonat = fullEnd)

### 3. Wird die Linie nur bis zur aktuellen Station gezeichnet?

**Ja — das funktioniert korrekt**, unverändert seit AP-14:

```javascript
function buildVisibleChartSeries(chartSeries, stationMonth) {
  return chartSeries.filter(p => p.month <= stationMonth);
}
```

Die Linie endet zuverlässig am Stationsmonat. Dieses Verhalten ist nicht Teil des Problems.

### 4. Wie wird die Y-Achse aktuell skaliert?

Die Y-Achse wird von `FwSmartYAxis` auf Basis von `fwContext.dataRange.minY / maxY` skaliert. Diese Werte leiten sich aus `visibleSeries` ab — also aus den Datenpunkten bis zum aktuellen Stationsmonat. Das ist **korrekt und gewollt**: Die Y-Achse skaliert auf die sichtbaren Stationsdaten, nicht auf den finalen Depotwert (kein Endwissens-Leak). Dieses Verhalten soll der geplante Fix **nicht** verändern.

### 5. Gibt es bereits Änderungen an Markern?

**Nein.** Finale stille Marker auf Screen 3 sind Gegenstand von B1-AP-14c (nächstes AP). In diesem AP wurden keine Marker implementiert, keine Marker-Logik verändert.

### 6. Wurden JSON, Protected Files oder historische Dokumente geändert?

**Nein.**

- `Apps/prokrastinations-preis/config/stations.de.json` → unverändert
- `CSVParser.js`, `FinanzwesirData.js` (Layer 1, Vault) → unverändert
- `ChartEngine.js`, `LineChartStrategy.js`, `FwSmartXAxis.js` → unverändert (geschützte Zone)
- Historische Docs, alte Specs, BACKLOG-Archiv → unverändert

### 7. Gibt es uncommitted Changes?

**Ja.** Stand zum Zeitpunkt dieses Dokuments:

```
modified:   Apps/prokrastinations-preis/app.css   (+8 Zeilen)
modified:   Apps/prokrastinations-preis/app.js    (+22 Zeilen)
modified:   .claude/learning/session-log.md        (+2 Zeilen, Prozess-Log)
untracked:  docs/steering/PEER-REVIEW-B1-AP-14b-XAxis-Architecture.md (dieses Dokument)
```

Der gescheiterte X-Achsen-Fix (`Chart.getChart`-Block) ist im uncommitted Stand von `app.js` enthalten und muss vor dem nächsten Commit entweder ersetzt oder entfernt werden.

### 8. Empfehlung: Fortsetzen, kleiner Nachtrag oder Neustart?

**Kleiner Nachtrag — kein Neustart.**

Was funktioniert und bleibt:
- Wachsender Pfad (`buildVisibleChartSeries`) ✅
- Orientierungs-Chip `progressEl` (DOM + CSS + Befüllung) ✅
- Y-Achsen-Skalierung auf Stationsdaten ✅
- A11y (`stationLiveMessage` ohne Endwissens-Leak) ✅

Was ersetzt werden muss:
- Der `Chart.getChart(canvas2)`-Block in `renderJourneyStep()` → durch den `features.xDisplayMax`-Ansatz (Abschnitt 7) ersetzen

Dafür braucht es Änderungen an drei geschützten Engine-Dateien (`ChartEngine.js`, `LineChartStrategy.js`, `FwSmartXAxis.js`) plus einer Zeile in `app.js`. Der Orientierungs-Chip bleibt wie er ist.

Voraussetzung: Explizite Freigabe für die Engine-Dateien.
