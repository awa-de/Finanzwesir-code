# AP-14e1 — Plugin-Ist-Befund finalisieren — Ergebnis

Stand: 2026-06-19 | Session: B1-AP-14e1 | Geändert von: Claude

> **Hinweis (2026-06-19):** AP-14e3 wurde neu definiert als reiner Doku-AP (Engine-Datenpfad-Regressionsregel verankern). Die ursprünglich hier geplante CenterTextPlugin + CrosshairPlugin-Auslagerung läuft als **B1-AP-14e4** weiter.

---

## Kurzurteil

Fünf Chart.js-Plugins im Repo — davon zwei ausgelagerte Module, drei Inline-Plugins.
Der dringendste Befund: `fwVerticalLine` setzt `chartConfig.plugins = [...]` per Zuweisung
und vernichtet dabei jeden Strategie-Plugin-Array. Screen 3 (prokrastinations-preis) hat
dadurch keinen CrosshairPlugin mehr. Das ist ein bestätigter Architektur-Bug, kein Verdacht.

---

## Geprüfte Dateien

```
Theme/assets/js/fw-chart-engine/core/FwChartPlugins.js       — gelesen vollständig
Theme/assets/js/fw-chart-engine/core/ChartEngine.js          — gelesen vollständig
Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js  — gelesen vollständig
Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js      — gelesen vollständig
Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js     — gelesen vollständig
Theme/assets/js/fw-chart-engine/strategies/BarChartStrategy.js      — per Grep geprüft
Apps/prokrastinations-preis/app.js                            — gelesen vollständig
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md                         — gelesen vollständig
```

---

## Verwendete Suchbegriffe / Suchbefehle

```
Grep: chartConfig\.plugins       (context 3)
Grep: plugins:\s*\[              (context 2)
Grep: FwBarLayoutPlugin|beforeUpdate|afterDraw|beforeDraw|afterDatasetsDraw
Grep: import.*FwChartPlugins|from.*FwChartPlugins|import.*plugins
Grep: fwVerticalLine|verticalLine|CenterTextPlugin|CrosshairPlugin|FwAnnotationPulsePlugin|chartConfig\.plugins
PowerShell: Get-ChildItem Apps/prokrastinations-preis -Recurse -Filter "*.js"
```

---

## Plugin-Inventar

| Plugin / Kandidat         | Aktuelle Datei                           | Art     | Chart.js-id       | Hook(s)              | Aktivierung / Feature-Flag          | Charttypen              | Import-/Erzeugungsstellen                                      | Risiko   |
|---------------------------|------------------------------------------|---------|-------------------|----------------------|-------------------------------------|-------------------------|----------------------------------------------------------------|----------|
| CenterTextPlugin          | `core/FwChartPlugins.js`                 | Modul   | `centerText`      | `beforeDraw`         | `options.plugins.centerText.enabled` | `doughnut`              | Import in PieChartStrategy; `plugins: [CenterTextPlugin]` in `getChartConfig()` | MITTEL — liegt in `core/`, Spec §3 bevorzugt `plugins/` |
| CrosshairPlugin           | `core/FwChartPlugins.js`                 | Modul   | `crosshair`       | `afterDatasetsDraw`  | `options.plugins.crosshair.enabled`  | `line`                  | Import in LineChartStrategy; `plugins: [CrosshairPlugin]` in `getChartConfig()` | HOCH — wird durch fwVerticalLine-Zuweisung überschrieben (→ Befund fwVerticalLine) |
| FwAnnotationPulsePlugin   | `plugins/FwAnnotationPulsePlugin.js`     | Modul   | `fwAnnotationPulse` | `afterDraw`        | `annotationPulse.enabled && mode === 'newly-added'` | `line` | Import in ChartEngine; `chartConfig.plugins.push(...)` in `_draw()` | NIEDRIG — architekturkonform; Spec-Referenzbeispiel §14 |
| fwVerticalLine            | `core/ChartEngine.js` (inline in `_draw()`) | Inline | `fwVerticalLine` | `afterDraw`         | `features.verticalLine === 'last'`   | alle mit Dataset.x      | Inline-Objekt in ChartEngine `_draw()` Z.317–335; keine eigene Datei | HOCH — Zuweisung überschreibt Strategie-Plugins |
| FwBarLayoutPlugin         | `strategies/BarChartStrategy.js` (inline in `getChartConfig()`) | Inline | `fwBarLayout` | `beforeUpdate` | Immer aktiv für BarCharts (kein Opt-in) | `bar` | Lokal als `const` in `BarChartStrategy.getChartConfig()` Z.238–247; kein Import | NIEDRIG — Spec §3-Ausnahme trifft zu (engine-interne Hilfsfunktion); kein App-Opt-in vorgesehen |

---

## Import- und Erzeugungsstellen

### `CenterTextPlugin`

```
Exportiert aus:  core/FwChartPlugins.js  (Z.21)
Importiert in:   strategies/PieChartStrategy.js  (Z.32)
Erzeugt in:      PieChartStrategy.getChartConfig() → plugins: [CenterTextPlugin]  (Z.264)
```

### `CrosshairPlugin`

```
Exportiert aus:  core/FwChartPlugins.js  (Z.122)
Importiert in:   strategies/LineChartStrategy.js  (Z.29)
Erzeugt in:      LineChartStrategy.getChartConfig() → plugins: [CrosshairPlugin]  (Z.396)
```

### `FwAnnotationPulsePlugin`

```
Exportiert aus:  plugins/FwAnnotationPulsePlugin.js  (Z.77)
Importiert in:   core/ChartEngine.js  (Z.68)
Erzeugt in:      ChartEngine._draw() → chartConfig.plugins.push(FwAnnotationPulsePlugin)  (Z.341)
Bedingung:       runtimeConfig.annotationPulse?.enabled === true
```

### `fwVerticalLine`

```
Kein Export, kein Import.
Erzeugt in:      ChartEngine._draw() als Inline-Objekt  (Z.317–335)
Zuweisung:       chartConfig.plugins = [{ id: 'fwVerticalLine', afterDraw: ... }]
Bedingung:       (runtimeConfig.features || {}).verticalLine === 'last'
```

### `FwBarLayoutPlugin`

```
Kein Export, kein Import.
Erzeugt in:      BarChartStrategy.getChartConfig() als lokale const  (Z.238–247)
Übergabe:        plugins: [FwBarLayoutPlugin]  (Z.266)
Bedingung:       immer (kein Opt-in)
```

---

## Befund zu CenterTextPlugin

- Liegt in `core/FwChartPlugins.js` zusammen mit CrosshairPlugin.
- Die Spec (§3) bevorzugt `plugins/` als Ablageort für wiederverwendbare Plugins.
- `FwChartPlugins.js` ist etabliert und die Spec §3-Ausnahme greift: "Kleine ChartEngine-interne Plugins,
  die ausschließlich als technische Hilfsfunktion für genau einen vorhandenen Engine-Call dienen,
  dürfen in der bestehenden Engine-Struktur bleiben."
- CenterTextPlugin ist PieChart-exklusiv. Die Ausnahme ist vertretbar.
- Kein unmittelbares Risiko. Langfristig wäre Auslagerung nach `plugins/` konsequenter.
- Opt-in-Muster korrekt: `options.plugins.centerText.enabled` muss `true` sein.
- Kein globaler unkontrollierter State.

**Befund: KONFORM. Auslagerung ist Qualitätspflege, kein Bug.**

---

## Befund zu CrosshairPlugin

- Liegt in `core/FwChartPlugins.js`.
- Opt-in korrekt: `options.plugins.crosshair.enabled`.
- LineChart-exklusiv durch Strategy-Einbindung.
- Kein globaler State.
- **Hauptproblem: CrosshairPlugin wird durch fwVerticalLine-Zuweisung überschrieben (→ Befund fwVerticalLine).**
  Screen 3 der App `prokrastinations-preis` nutzt `features.verticalLine: 'last'` —
  dabei wird `chartConfig.plugins = [{ id: 'fwVerticalLine' }]` gesetzt und
  der von LineChartStrategy gesetzte `plugins: [CrosshairPlugin]` Array verloren.

**Befund: STRUKTURELLES RISIKO durch ChartEngine-Bug. CrosshairPlugin selbst ist korrekt.**

---

## Befund zu FwAnnotationPulsePlugin

- Liegt in `plugins/FwAnnotationPulsePlugin.js` — der spec-konformen Ablage.
- Opt-in korrekt: `annotationPulse.enabled === true && mode === 'newly-added'`.
- Scope korrekt: nur Screen 2 der App aktiviert, Screen 3 nicht.
- Reduced Motion implementiert: `_reducedMotion()` prüft `prefers-reduced-motion: reduce`.
- State ephemer: `WeakMap` pro Chart-Instanz (`_pulseState`).
- Kein Domain-State, kein JSON-Schreiben, keine Achsenmanipulation.
- Animationstreiber: `requestAnimationFrame → chart.draw() → afterDraw` — spec-konform (§6.2).
- Tooltip/Legende nicht betroffen.

**Befund: VOLLSTÄNDIG ARCHITEKTURKONFORM. Referenzimplementierung gemäß Spec §14.**

---

## Befund zu fwVerticalLine

### 1. Existiert `fwVerticalLine` in `ChartEngine.js`?

Ja. Bestätigt in `ChartEngine._draw()` Z.315–335.

### 2. Wird es als Chart.js-Plugin-Objekt erzeugt?

Ja. Als Inline-Objekt: `{ id: 'fwVerticalLine', afterDraw: function(chart) { ... } }`.
Es landet in `chartConfig.plugins = [...]`.

### 3. Welchen Hook nutzt es?

`afterDraw`.

### 4. Wie wird es aktiviert?

```js
if ((runtimeConfig.features || {}).verticalLine === 'last') {
    chartConfig.plugins = [{ id: 'fwVerticalLine', afterDraw: ... }];
}
```

Opt-in über `features.verticalLine === 'last'`.

### 5. Wird `chartConfig.plugins` neu gesetzt oder erweitert?

**NEU GESETZT** — Zuweisung, kein push. Das ist der Bug.

```js
chartConfig.plugins = [{...}];   // Z.317 — überschreibt alles vorher Gesetzte
```

Direkt danach:
```js
if (runtimeConfig.annotationPulse?.enabled) {
    if (!chartConfig.plugins) chartConfig.plugins = [];
    chartConfig.plugins.push(FwAnnotationPulsePlugin);  // Z.341 — push (korrekt)
}
```

Die Pulse-Logik prüft korrekt mit `if (!chartConfig.plugins)` — funktioniert nach der Zuweisung.
Aber der Strategie-Plugin-Array wurde bereits vernichtet.

### 6. Kann dadurch CrosshairPlugin oder andere Strategie-Plugins verloren gehen?

**Ja. Bestätigt.**

Ablauf bei Screen 3 (LineChart + `verticalLine: 'last'`):
```
1. LineChartStrategy.getChartConfig() → chartConfig.plugins = [CrosshairPlugin]
2. ChartEngine._draw() Z.317 → chartConfig.plugins = [{ id: 'fwVerticalLine', ... }]
   → CrosshairPlugin VERLOREN
3. annotationPulse nicht aktiv → kein push
Ergebnis: plugins = [fwVerticalLine] — CrosshairPlugin fehlt auf Screen 3
```

### 7. Ist `fwVerticalLine` an LineCharts gebunden oder allgemein?

Technisch allgemein: Die Implementierung liest `chart.getDatasetMeta(0).data[last].x` und zeichnet
eine vertikale Linie. Das funktioniert bei jedem Chart mit Datasets und kartesischer X-Position.
Für Pie/Doughnut würde es technisch scheitern (kein `data[].x`). Für Bar und Scatter wäre es möglich.
Fachlich ist es an „letzter Datenpunkt auf einer Zeitachse" gebunden — also de facto LineChart-Semantik.

### 8. Wäre Auslagerung in `plugins/FwVerticalLinePlugin.js` technisch plausibel?

Ja. Das Plugin ist in sich vollständig und hat keine Abhängigkeiten auf ChartEngine-Interna außer `chart.ctx` und `chart.chartArea`.

### 9. Welche Dateien wären bei Auslagerung betroffen?

```
ChartEngine.js         — Import hinzufügen, Inline-Block entfernen, Zuweisung in push/merge ändern
plugins/FwVerticalLinePlugin.js  — neue Datei
```

Keine Strategy-Dateien. Kein App-Code (`features.verticalLine` bleibt das Aktivierungsfeld).

### 10. Als eigener Folge-AP schneiden?

Ja. Empfohlen als `B1-AP-14e2` — Begründung: die Auslagerung löst gleichzeitig den Plugin-Verlust-Bug.

---

## Befund zu `chartConfig.plugins`

Es gibt fünf Stellen, an denen `chartConfig.plugins` gesetzt oder erweitert wird:

| Datei / Zeile | Art | Inhalt |
|---|---|---|
| `LineChartStrategy.getChartConfig()` Z.396 | Initialisierung (Strategie) | `plugins: [CrosshairPlugin]` |
| `PieChartStrategy.getChartConfig()` Z.264 | Initialisierung (Strategie) | `plugins: [CenterTextPlugin]` |
| `BarChartStrategy.getChartConfig()` Z.266 | Initialisierung (Strategie) | `plugins: [FwBarLayoutPlugin]` |
| `ChartEngine._draw()` Z.317 | **Zuweisung (überschreibend)** | `chartConfig.plugins = [{ id: 'fwVerticalLine', ... }]` |
| `ChartEngine._draw()` Z.340–341 | Erweiterung (push) | `chartConfig.plugins.push(FwAnnotationPulsePlugin)` |

Die Zeile Z.317 ist die einzige Zuweisung nach Strategie-Initialisierung. Sie überschreibt immer.
Alle anderen Stellen sind entweder initiale Strategie-Definitionen oder korrekte push-Erweiterungen.

---

## Risiko-Klassifikation

| Plugin | Risiko | Beschreibung |
|---|---|---|
| CenterTextPlugin | NIEDRIG | Liegt in `core/` statt `plugins/`, funktioniert korrekt |
| CrosshairPlugin | MITTEL | Liegt in `core/` statt `plugins/`; wird durch fwVerticalLine-Bug überschrieben |
| FwAnnotationPulsePlugin | NIEDRIG | Architekturkonform, kein Handlungsbedarf |
| fwVerticalLine | HOCH | Überschreibende Zuweisung vernichtet Strategie-Plugin-Arrays; Plugin nicht ausgelagert |
| FwBarLayoutPlugin | NIEDRIG | Kein Opt-in, aber Spec §3-Ausnahme vertretbar; kein App-Einfluss |

**Hauptrisiko: `fwVerticalLine`-Zuweisung in `ChartEngine._draw()` Z.317.**
CrosshairPlugin fehlt auf Screen 3 der App `prokrastinations-preis`.
Pie-Charts und BarCharts sind nicht betroffen, da `verticalLine: 'last'` dort nicht eingesetzt wird.

---

## Empfohlene Folge-APs

### B1-AP-14e2 — fwVerticalLine: Plugin-Verlust-Bug beheben + Auslagerung

Scope:
```
ChartEngine._draw() Z.317: Zuweisung in merge-Logik ändern (push oder Array-Concat)
plugins/FwVerticalLinePlugin.js anlegen
ChartEngine.js: Import + Inline-Block entfernen
```

Dateien: `ChartEngine.js` + neue `plugins/FwVerticalLinePlugin.js`

Dringlichkeit: HOCH — bestätigter Plugin-Verlust auf Screen 3.

### B1-AP-14e3 — CenterTextPlugin + CrosshairPlugin nach `plugins/` auslagern (optional, Qualitätspflege)

Scope:
```
core/FwChartPlugins.js aufteilen oder umbenennen:
  → plugins/FwCenterTextPlugin.js
  → plugins/FwCrossairPlugin.js
Import-Stellen in PieChartStrategy und LineChartStrategy aktualisieren
```

Dateien: `core/FwChartPlugins.js`, `strategies/PieChartStrategy.js`, `strategies/LineChartStrategy.js`,
zwei neue Dateien unter `plugins/`.

Dringlichkeit: NIEDRIG — kein Bug, Architektur-Alignment mit Spec §3.

---

## Offene Punkte

1. `FwBarLayoutPlugin` hat kein Opt-in. Die Spec §4 verlangt Opt-in für Plugins. Die Spec §3-Ausnahme greift
   als engine-interne Hilfsfunktion, aber wenn der BarChart in weiteren Apps eingesetzt wird, sollte
   geprüft werden ob das `_fwGeometry`-Pattern auch ohne `beforeUpdate`-Plugin erreichbar wäre.

2. `plugins/index.js` als Barrel ist im Zielbild genannt, existiert noch nicht.
   Nicht für diesen AP relevant. Sinnvoll erst nach vollständiger Plugin-Auslagerung.

3. `BarChartStrategy.js` wurde nur per Grep geprüft. Falls `FwBarLayoutPlugin` für AP-14e3 relevant wird,
   vollständig lesen.

---

## Blocker

Keine.

---

## Bestätigungen

- Keine Codeänderung vorgenommen ✓
- Keine CSS-Änderung vorgenommen ✓
- Keine JSON-Änderung vorgenommen ✓
- Keine CSV-Änderung vorgenommen ✓
- Keine Protected Files geändert ✓
- Keine AP-15-Arbeit begonnen ✓
- Keine Plugin-Registry gebaut ✓
- Keine Commits ausgeführt ✓
- Kein Abschlussritual ausgeführt ✓
