# AP-21 Implementationsplan — SNAPSHOT X-Achse (Liniendiagramme)

## 1. Ausgangslage

### Was kaputt ist
Die SNAPSHOT X-Achse (Liniendiagramme) zeigt visuell erratische Tick-Positionen auf ALLEN Rhythmen und ALLEN Bildschirmgroessen. Die Console-Diagnostik zeigt korrekte `tick.value` und `tick.label` — aber Chart.js rendert die Ticks nicht an den erwarteten Pixel-Positionen.

Sechs Teilfixes wurden bereits in V10.4.0 eingebaut (autoSkip, Runtime Zone-Detection, SNAPSHOT/PERIOD Config-Alignment, afterTickToLabelConversion, SNAPSHOT_BASE <=0.5y, QUARTERLY-Tabelle). Keiner davon hat das Kernproblem geloest.

### Was fehlend ist
1. **CV-Heuristik (Spec v13 §4):** SNAPSHOT-Rhythmus-Erkennung nutzt noch Bucket-Statistik statt Median+CV. Drei Klassen (Regulaer/Lueckenhaft/Erratisch) fehlen.
2. **Pixel-Budget-Validierung (Spec §5.9):** Noch nicht gegen reale Canvas-Breiten geprueft.
3. **FwDateAdapter UTC-Konsistenz:** Adapter nutzt lokale Zeit statt UTC — Inkonsistenz mit dem Noon-Protokoll (Spec §2.1).

### Was funktioniert (NICHT anfassen)
- PERIOD-Track (Balkendiagramme): komplett stabil, alle Rhythmen, alle Screens
- Y-Achse, Tooltips, Calendar Snap, BAN-Headline
- Density Matrix Lookup, Tick-Erzeugung, Label-Formatierung (alle korrekt verifiziert)
- Balkendiagramm-Ast in FwSmartXAxis.js: out of scope

---

## 2. Architektur & Root-Cause-Analyse

### Wie Chart.js TimeScale und unser Tick-System zusammenspielen

Chart.js Scale-Lifecycle (vereinfacht):

```
determineDataLimits()     → setzt axis.min/max aus Datenpunkten
afterDataLimits(axis)     ← UNSER HOOK (SNAPSHOT: +5% Breathing Room)
buildTicks()              → Chart.js generiert interne Ticks, KANN axis.min/max modifizieren
afterBuildTicks(axis)     ← UNSER HOOK (ersetzt axis.ticks mit Kalender-Ticks)
generateTickLabels()      → Chart.js formatiert Labels (ueberschreibt unsere!)
afterTickToLabelConversion ← UNSER HOOK (re-setzt unsere Labels)
fit()                     → Layout-Berechnung
afterFit(axis)            ← PERIOD HOOK (setzt axis.min/max definitiv)
```

**Pixel-Position:** `getPixelForValue(value)` berechnet `(value - axis.min) / (axis.max - axis.min)` und mappt auf Canvas-Pixel. Rein lineare Interpolation — die Position haengt nur von `value`, `axis.min` und `axis.max` ab.

### Root Cause: axis.min/max-Drift (PRIMAERE HYPOTHESE)

**Vergleich der beiden Tracks:**

| Aspekt | PERIOD (funktioniert) | SNAPSHOT (kaputt) |
|--------|----------------------|-------------------|
| min/max setzen | `afterFit` (NACH buildTicks) | `afterDataLimits` (VOR buildTicks) |
| Timing | Definitiv — buildTicks kann nichts mehr ueberschreiben | Fragil — buildTicks kann min/max danach modifizieren |
| axis.min = | `dataMin - extensionMs` (explizit) | Was auch immer Chart.js uebrig laesst |
| axis.max = | `dataMax + extensionMs` (explizit) | afterDataLimits setzt +5%, buildTicks kann ueberschreiben |

**Das Problem:** SNAPSHOT setzt `axis.max += range * 0.05` in `afterDataLimits`. Danach ruft Chart.js `buildTicks()` auf, das anhand von `time.unit` und dem Adapter interne Ticks generiert. Dabei kann `buildTicks()` die min/max-Werte recalculieren — z.B. auf "schoene" Periodengrenzen runden. Unsere +5% Breathing Room geht verloren oder wird verschoben.

Ergebnis: `afterBuildTicks` setzt korrekte `tick.value`-Werte, aber `axis.min` und `axis.max` stimmen nicht mehr mit den Tick-Werten ueberein. `getPixelForValue()` interpoliert auf Basis falscher Grenzen → **erratische Pixel-Positionen**.

**Warum PERIOD nicht betroffen:** PERIOD setzt min/max in `afterFit` — das ist der LETZTE Hook vor dem Rendering. buildTicks kann nichts mehr ueberschreiben.

### Verstaerkender Faktor: `time.unit`-Mismatch

```js
// Config-Zeit (width=1000, zone='L'):
const matrix = this._getDensityMatrix(durationYears, zone, rhythm, semantics);
return { time: { unit: matrix.unit } };  // z.B. 'month'

// Runtime (afterBuildTicks, echte width=350, zone='S'):
const runtimeMatrix = this._getDensityMatrix(..., runtimeZone, ...);  // z.B. 'quarter'
this._generateLinearTicks(axis, fwContext, runtimeMatrix);  // generiert Quartals-Ticks
```

`time.unit` wird zur Config-Zeit gesetzt (zone L Fallback), aber `afterBuildTicks` nutzt runtimeMatrix (echte Zone). Wenn Zone L `unit:'month'` ergibt und Zone S `unit:'quarter'`, dann:
- Chart.js `buildTicks()` generiert interne **monatliche** Ticks (basierend auf `time.unit`)
- Chart.js setzt min/max auf monatliche Grenzen
- Unser `afterBuildTicks` ersetzt Ticks durch **quartalsweise** Ticks
- Pixel-Positionen basieren auf monatlichen min/max → **Mismatch**

### Sekundaerer Defekt: FwDateAdapter Local-Time-Bug

`FwDateAdapter.startOf()`, `.format()`, `.add()`, `.diff()` nutzen lokale Zeit (`new Date(time)`, `setHours`, `getMonth`) statt UTC-Methoden. Alle Engine-Timestamps sind UTC noon (Noon-Protokoll, Spec §2.1).

Beispiel `startOf('month')` in UTC+1 (Deutschland):
- Input: Jan 15, 12:00 UTC = Jan 15, 13:00 CET
- `setDate(1)` → Jan 1, 13:00 CET
- `setHours(0)` → Jan 1, 00:00 CET = **Dec 31, 23:00 UTC** (falscher Tag!)

Chart.js ruft `adapter.startOf()` in `buildTicks()` auf, um Tick-Grenzen zu berechnen. Diese 1-Stunde-Drift ist konsistent (kein "erratisches" Verhalten), verstaerkt aber den min/max-Drift-Effekt und kann in Randfaellen Ticks in die falsche Periode verschieben.

---

## 3. Task-Liste

**Reihenfolge:** Task 0 → 1 → 2 → 4 → 5 → 3 → 6 → 7

Begruendung: Task 3 (FwDateAdapter UTC) hat das hoechste Regressionsrisiko (betrifft beide Tracks). Erst Tasks 1/2/4/5 stabilisieren den SNAPSHOT-Track, dann wird der Adapter angefasst.

---

### Task 0: Diagnostik — min/max-Drift verifizieren

**Ziel:** Bestaetigen oder widerlegen der primaeren Hypothese, bevor Code geaendert wird.

**Betroffene Dateien:** `FwSmartXAxis.js` (temporaere console.log, werden wieder entfernt)

**Aktion:** In den SNAPSHOT-Hooks temporaere Diagnostik einbauen:
```js
afterDataLimits: (axis) => {
    console.log('[DIAG] afterDataLimits:', { min: axis.min, max: axis.max });
    axis.max += (axis.max - axis.min) * 0.05;
    console.log('[DIAG] afterDataLimits AFTER:', { min: axis.min, max: axis.max });
},
afterBuildTicks: (axis) => {
    console.log('[DIAG] afterBuildTicks ENTRY:', { min: axis.min, max: axis.max });
    // ... bestehender Code ...
    console.log('[DIAG] afterBuildTicks EXIT:', { min: axis.min, max: axis.max, tickCount: axis.ticks.length });
},
```

**Testkriterium:** Console-Output zeigt, ob `axis.min`/`axis.max` zwischen afterDataLimits und afterBuildTicks veraendert wurden. Wenn JA → Hypothese bestaetigt, weiter mit Task 1. Wenn NEIN → alternative Ursache suchen (Task 0b).

**Abhaengigkeiten:** Keine.

**Heute zustaendig:** `FwSmartXAxis.compute()` SNAPSHOT return block Z.225-259. Staerke: Hooks sind vorhanden. Schwaeche: Kein Logging, keine Sichtbarkeit in den Lifecycle.

---

### Task 1: SNAPSHOT min/max-Kontrolle (Kern-Fix)

**Ziel:** axis.min und axis.max explizit in afterBuildTicks setzen, analog zum funktionierenden PERIOD-Track.

**Betroffene Dateien:** `FwSmartXAxis.js` — SNAPSHOT return block (Z.225-259)

**Aenderung:** In `afterBuildTicks`, NACH `_generateLinearTicks()`, explizit setzen:
```js
afterBuildTicks: (axis) => {
    // Runtime Zone-Detection + Tick-Erzeugung (bestehend)
    // ...
    this._generateLinearTicks(axis, fwContext, runtimeMatrix);

    // NEU: Definitive min/max-Kontrolle (analog PERIOD afterFit)
    const breathingRoom = (dataMax - dataMin) * 0.05;
    axis.min = dataMin;
    axis.max = dataMax + breathingRoom;
},
```

`afterDataLimits` kann danach entfernt werden (redundant, da afterBuildTicks spaeter laeuft und min/max ueberschreibt).

**Testkriterium:**
- Alle 6 Test-CSVs (daily_90d, monthly_30m, monthly_4m, quarterly_3y, weekly_18m, yearly_langzeit) zeigen aequidistante Ticks auf allen 3 Zonen (S/M/L).
- Tick-Positionen korrelieren visuell mit den tick.value-Timestamps.
- PERIOD-Track unveraendert (keine Regression).

**Abhaengigkeiten:** Task 0 (Diagnostik bestaetigt Hypothese)

**Heute zustaendig:** `afterDataLimits` (Z.229-232). Staerke: Breathing Room korrekt berechnet. Schwaeche: Falscher Hook-Zeitpunkt — zu frueh im Lifecycle, wird von buildTicks ueberschrieben.

---

### Task 2: `time.unit`-Synchronisation

**Ziel:** Config-Zeit `time.unit` mit Runtime-Matrix synchronisieren, damit Chart.js `buildTicks()` keine widersprüchlichen internen Ticks erzeugt.

**Betroffene Dateien:** `FwSmartXAxis.js` — SNAPSHOT return block

**Aenderung:** `time.unit` entfernen oder auf den konservativsten Wert setzen (z.B. `undefined`). Chart.js bestimmt `_unit` dann automatisch — irrelevant, da wir Ticks und Labels ohnehin in den Hooks ueberschreiben.

```js
time: {
    // unit: matrix.unit,  ← ENTFERNEN (Mismatch-Quelle)
    displayFormats: { year: 'yyyy', quarter: "MMM 'yy", month: "MMM 'yy", day: "d. MMM" }
},
```

**Risiko-Check:** `time.unit` wird in Chart.js fuer drei Dinge genutzt:
1. `buildTicks()` Tick-Generierung → irrelevant, wir ueberschreiben in afterBuildTicks
2. `generateTickLabels()` Label-Formatierung → irrelevant, wir ueberschreiben in afterTickToLabelConversion
3. Interne `_unit`-Bestimmung fuer Adapter-Aufrufe → irrelevant nach Task 1 (min/max explizit)

**Testkriterium:** Wie Task 1, plus: Console zeigt keine Chart.js-Warnungen.

**Abhaengigkeiten:** Task 1 (min/max muss kontrolliert sein, bevor unit entfernt wird)

**Heute zustaendig:** `time: { unit: matrix.unit }` (Z.249). Schwaeche: Config-Zeit-Wert, der zur Runtime nicht mehr stimmt.

---

### Task 4: Chart.js baendigen — Tick-Generator-Unterdrueckung (KDR 7)

**Ziel:** Sicherstellen, dass Chart.js keine eigenen Ticks generiert, die unsere Kalender-Ticks untergraben.

**Betroffene Dateien:** `FwSmartXAxis.js` — SNAPSHOT return block

**Analyse des Ist-Zustands:**
- `autoSkip: false` ✅ (verhindert Tick-Ueberspringen)
- `afterBuildTicks` ✅ (ersetzt Ticks)
- `afterTickToLabelConversion` ✅ (re-setzt Labels)
- **Fehlend:** `ticks.source` Config — Default ist `'auto'`, was Chart.js erlaubt, Ticks aus seinem internen Generator zu beziehen

**Aenderung pruefen:** `ticks.source: 'data'` oder `ticks.source: 'labels'` als zusaetzliche Absicherung. Aber:
- `source: 'data'` nutzt Datenpunkt-Timestamps → das sind unsere Daten, nicht Kalender-Ticks
- `source: 'labels'` nutzt `chart.data.labels` → wir setzen keine Labels (nutzen {x,y}-Punkte)

**Empfehlung:** KEIN `ticks.source` setzen. Stattdessen genuegt die Kombination aus:
1. Task 1 (min/max explizit kontrollieren) — Chart.js kann Achse nicht verschieben
2. Task 2 (time.unit entfernen) — Chart.js generiert keine widersprüchlichen Ticks
3. afterBuildTicks (bestehend) — ersetzt alle Ticks
4. afterTickToLabelConversion (bestehend) — re-setzt alle Labels

Chart.js `buildTicks()` laeuft zwar noch (unvermeidbar), aber seine Ergebnisse werden in `afterBuildTicks` komplett verworfen, und min/max werden danach explizit gesetzt. Der Generator ist damit de facto unterdrueckt.

**Falls Task 1+2 nicht ausreichen — Eskalationsstufe:**
Chart.js `time` Scale komplett umgehen, stattdessen `linear` Scale mit manuellen Ticks und Labels. Verliert keine Proportionalitaet (Timestamps sind Zahlen auf einer linearen Achse), eliminiert aber ALLE Chart.js-TimeScale-Interna. Dieser Weg sollte nur gewaehlt werden, wenn Task 1+2 das Problem nicht loesen. Details → Abschnitt 3a.

**Testkriterium:**
- Identisch mit Task 1 (aequidistante Ticks, korrekte Positionen)
- Keine Chart.js-Warnungen in der Console
- `autoSkip: false` bleibt gesetzt, Spec §5.4-5.9 Tick-Anzahlen eingehalten

**Abhaengigkeiten:** Task 1, Task 2

**Heute zustaendig:** SNAPSHOT return block (Z.225-259). Staerke: Drei Hooks korrekt implementiert. Schwaeche: `time.unit` in Config schafft unnoetige Kopplung an Chart.js-Interna.

---

### Task 5: CV-Heuristik implementieren (Spec v13 §4)

**Ziel:** SNAPSHOT-Rhythmus-Erkennung von Bucket-Statistik auf CV-Heuristik umstellen. Drei Klassen: Regulaer (CV<=0.30), Lueckenhaft (0.30<CV<=0.60), Erratisch (CV>0.60 oder N<=2).

**Betroffene Dateien:**
- `core/FwDateUtils.js` — `detectRhythm()` SNAPSHOT-Pfad (Z.134-152)
- `strategies/LineChartStrategy.js` — `transform()` (uebergibt allTimestamps)
- `core/FwSmartXAxis.js` — neue ERRATIC-Tabelle in SNAPSHOT_TABLES

**Heutiger Zustand:** `detectRhythm(timestamps, 'SNAPSHOT')` Z.134-152. Staerke: Einfach, funktioniert fuer regulaere Daten. Schwaeche: Bucket-Grenzen (5/12/25/35/80/140/300) sind willkuerlich — Intervalle zwischen 12-25 und 35-80 fallen in KEIN Bucket und werden ignoriert. Plurality-Vote ist fragil bei Mixed-Rhythmus-Daten.

**Aenderungen in FwDateUtils.detectRhythm (SNAPSHOT-Pfad ersetzen):**

```
Schritt 1: Intervalle berechnen (bestehend — diffs Array)
Schritt 2: Median M (NEUER Parameter: allTimestamps fuer Gesamtdatensatz)
    - M aus allTimestamps berechnen (zoom-stabil, Spec §4.2 Scope-Regel)
    - Fallback: wenn allTimestamps nicht uebergeben, M aus timestamps
Schritt 3: CV berechnen (Standardabweichung / Mittelwert der diffs)
Schritt 4: Klassifikation
    - N <= 2 → Erratisch
    - CV > 0.60 → Erratisch
    - CV > 0.30 → Lueckenhaft (wie Regulaer behandelt)
    - CV <= 0.30 → Regulaer
Schritt 5: Rhythmus bestimmen
    - Regulaer/Lueckenhaft: M-Mapping (§4.3): <=2d→DAILY, <=10d→WEEKLY, <=45d→MONTHLY, <=100d→QUARTERLY, <=200d→HALF_YEARLY, >200d→YEARLY
    - Erratisch: Nicht hier — wird in FwSmartXAxis mit T_window entschieden
```

**Signatur-Aenderung:** `detectRhythm(timestamps, semantics, allTimestamps)` — dritter Parameter optional, Fallback auf `timestamps`. BarChartStrategy (PERIOD) uebergibt keinen dritten Parameter → kein Breaking Change.

**Problem: Erratisch-Fallback braucht T_window**
Die Spec sagt: Bei Erratisch bestimmt T_window (sichtbares Zeitfenster) die Tick-Basis (§4.4). Aber `detectRhythm` kennt T_window nicht — es bekommt nur Timestamps.

**Loesung:** `detectRhythm` gibt bei Erratisch den speziellen Rueckgabewert `'ERRATIC'` zurueck. Die Tick-Einheit wird dann in `FwSmartXAxis._getDensityMatrix` anhand von `durationYears` (= T_window) bestimmt.

Dazu braucht `_getDensityMatrix` eine neue Tabelle `SNAPSHOT_TABLES.ERRATIC`:

```js
ERRATIC: [
    { maxYears: 1,        unit: 'quarter', stepSize: 1, mode: 'QUARTER', format: "MMM 'yy" },
    { maxYears: 3,        unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR', format: "MMM 'yy" },
    { maxYears: 10,       unit: 'year',    stepSize: 1, mode: 'YEAR',    format: 'yyyy' },
    { maxYears: Infinity, unit: 'year',    stepSize: 5, mode: 'YEAR',    format: 'yyyy' },
]
```

Das ist 1:1 Spec §4.4 in Tabellenform.

**Aenderung in LineChartStrategy.transform():**
```js
// HEUTE:
const rhythm = FwDateUtils.detectRhythm(timestamps, 'SNAPSHOT');
// NEU:
const allTimestamps = data.rows.map(r => r[dateCol].getTime()); // vor Filterung
const rhythm = FwDateUtils.detectRhythm(timestamps, 'SNAPSHOT', allTimestamps);
```

**Zoom-Button-Mechanik fuer ERRATIC:**
Bei Zoom-Button-Wechsel (z.B. 5J → 1J) wird `transform()` in LineChartStrategy erneut aufgerufen. `detectRhythm` erhaelt die gefilterten `timestamps` des aktuellen Fensters. Wenn `N <= 2` im Fenster → ERRATIC. Die `durationYears` im fwContext aendert sich mit dem Zoom-Range. `_getDensityMatrix` bekommt die neue `durationYears` und waehlt aus der ERRATIC-Tabelle die passende Zeile.

**Trigger-Kette:** Range-Button-Klick → `ChartEngine._handleRangeClick()` → `strategy.transform(data, config)` mit neuem `config.range` → `detectRhythm()` mit gefilterten Timestamps → neuer fwContext mit ggf. anderem rhythm/durationYears → `FwSmartXAxis.compute()` → `_getDensityMatrix(durationYears, ...)` → neue Density-Zeile → neue Ticks.

**Testkriterium (5 Referenz-CSVs aus Spec §4.6):**
1. `snap_period_monthly_30m.csv`: M~31d, CV~0 → Regulaer → MONTHLY ✓
2. `tool_tip_monthly_gaps.csv`: M=31d, CV=0.53 → Lueckenhaft → MONTHLY ✓
3. `tt_gap_test_irregular.csv`: M=73d, CV=0.31 → Lueckenhaft → QUARTERLY ✓
4. `snap_period_yearly_irregular.csv`: M=488d, CV=0.18 → Regulaer → YEARLY ✓, Zoom 1J: N=2 → Erratisch → T_window Quartal ✓
5. `scenario_4_crash.csv`: CV=0.86 → Erratisch → T_window-gesteuert ✓

**Zoom-Wechsel-Test (Pflicht):**
- `scenario_4_crash.csv`: Zoom max (5J) → Jahres-Ticks. Klick auf "1J" → Quartal-Ticks. Klick auf "3J" → Halbjahres-Ticks. Klick auf "max" → zurueck zu Jahres-Ticks.
- `snap_period_yearly_irregular.csv`: Zoom max → Jahres-Ticks. Klick auf "1J" → N=2 im Fenster → Erratisch → Quartal-Ticks.

**Abhaengigkeiten:** Task 1+2+4 (X-Achse muss korrekt rendern, damit CV-Ergebnisse visuell verifizierbar sind). Tabu-Bereich: FwDateUtils ist Tabu-Zone — Aenderung ist spec-konform und betrifft NUR den SNAPSHOT-Pfad. PERIOD-Pfad bleibt unberuehrt.

---

### Task 3: FwDateAdapter UTC-Konsistenz

**Ziel:** Alle Adapter-Methoden auf UTC-Methoden umstellen. Behebt den 1-Stunde-Drift und stellt Konsistenz mit dem Noon-Protokoll (Spec §2.1) her.

**Betroffene Dateien:** `core/FwDateAdapter.js`

**ACHTUNG: Hoechstes Regressionsrisiko aller Tasks.** Dieser Adapter wird von Chart.js fuer BEIDE Tracks genutzt. Deshalb kommt er NACH der SNAPSHOT-Stabilisierung (Tasks 1/2/4/5), damit eine Regression isoliert diesem Task zugeordnet werden kann.

**Aenderungen (5 Methoden):**
- `format()`: `getFullYear()` → `getUTCFullYear()`, `toLocaleDateString` → manuelle UTC-Formatierung
- `add()`: `setDate()` → `setUTCDate()`, `setMonth()` → `setUTCMonth()`, etc.
- `diff()`: `getMonth()` → `getUTCMonth()`, `getFullYear()` → `getUTCFullYear()`
- `startOf()`: `setHours(0,0,0,0)` → `setUTCHours(12,0,0,0)` (Noon-Protokoll!), alle set/get auf UTC
- `endOf()`: Folgt aus startOf-Fix

**Kritische Entscheidung bei `startOf`:** Chart.js erwartet, dass `startOf('month', ts)` den Anfang des Monats zurueckgibt. Soll das Ergebnis UTC Mitternacht (00:00 UTC) oder UTC Noon (12:00 UTC) sein?

**Empfehlung:** UTC Noon (12:00 UTC). Begruendung:
- Alle Engine-Timestamps nutzen Noon-Protokoll
- Wenn Chart.js intern `startOf` auf unsere Timestamps anwendet, bleiben sie im Noon-Raum
- Konsistenz: `startOf('month', Jan 15 12:00 UTC)` → `Jan 1 12:00 UTC` (korrekt)

**Testkriterium:**
- `startOf('month', Date.UTC(2024, 0, 15, 12, 0, 0))` === `Date.UTC(2024, 0, 1, 12, 0, 0)`
- `startOf('quarter', Date.UTC(2024, 4, 15, 12, 0, 0))` === `Date.UTC(2024, 3, 1, 12, 0, 0)` (Apr 1)
- `startOf('year', Date.UTC(2024, 6, 15, 12, 0, 0))` === `Date.UTC(2024, 0, 1, 12, 0, 0)`
- **PERIOD-Track:** Alle Balken-CSVs in 3 Zonen pruefen — KEINE Regression
- **SNAPSHOT-Track:** Profitiert (keine Perioden-Grenz-Drift mehr)

**Abhaengigkeiten:** Tasks 1/2/4/5 muessen vorher stabil sein (Isolation des Regressionsrisikos)

**Heute zustaendig:** `FwDateAdapter` (Z.96-121 `startOf`, Z.49-61 `format`, Z.63-78 `add`, Z.80-94 `diff`). Staerke: Funktional korrekt fuer lokale Zeitzone. Schwaeche: Inkonsistent mit UTC-basiertem Noon-Protokoll der Engine.

---

### Task 6: Pixel-Budget-Validierung (Spec §5.9)

**Ziel:** Die in §5.9 angegebenen repraesentativen Achsenbreiten (~270/~620/~940px) gegen reale Canvas-Breiten in der Testseite verifizieren.

**Betroffene Dateien:** Keine Code-Aenderung. Nur Messung + ggf. Spec-Update.

**Methode:**
1. `index.html` oeffnen, Browser-DevTools → Canvas-Element inspizieren
2. Fuer jede Zone (S: 375px Viewport, M: 768px, L: 1200px) die tatsaechliche Canvas-Breite ablesen
3. Y-Achsen-Breite ablesen (Canvas-Breite minus Plot-Area-Breite, ablesbar via Chart.js `chart.chartArea.left`)
4. Nutzbare X-Achse = `chart.chartArea.right - chart.chartArea.left`
5. Vergleich mit Spec-Werten: ~270px (S), ~620px (M), ~940px (L)

**Testkriterium:**
- Spec-Werte sind ausreichend konservativ (real >= Spec) → kein Handlungsbedarf
- Spec-Werte sind zu optimistisch (real < Spec) → Sub-Task: Kapazitaetstabelle in §5.9 anpassen

**Abhaengigkeiten:** Task 1 (Achse muss korrekt rendern fuer sinnvolle Messung)

**Heute zustaendig:** Spec §5.9 Tabelle. Staerke: Konservative Schaetzung mit Y-Achse ~60px. Schwaeche: Nie gegen reale Werte validiert.

---

### Task 7: Toter Code entfernen (Aufraeumen)

**Ziel:** Code-Pfade entfernen, die nach v13 und dem AP-21-Umbau obsolet sind.

**Betroffene Dateien:** `FwSmartXAxis.js`

**Kandidaten:**
1. `afterDataLimits` im SNAPSHOT-Block → obsolet nach Task 1 (min/max in afterBuildTicks)
2. `time.unit` im SNAPSHOT return → obsolet nach Task 2
3. Diagnostik-Logging aus Task 0 → entfernen

**Testkriterium:** Alle CSVs rendern identisch vor und nach Entfernung. PERIOD-Track unveraendert.

**Abhaengigkeiten:** Tasks 1, 2, 5, 3 (Code erst entfernen, wenn alles verifiziert ist)

---

## 3a. Eskalationspfad: Linear Scale statt Time Scale

**Trigger:** Tasks 1+2+4 loesen das Positionsproblem NICHT. Trotz expliziter min/max-Kontrolle und time.unit-Entfernung bleiben Ticks visuell erratisch.

**Massnahme:** Chart.js `type: 'time'` durch `type: 'linear'` ersetzen.

**Warum das funktioniert:** Unsere Timestamps sind Millisekunden-Zahlen. Eine lineare Achse plottet sie proportional korrekt. Wir verlieren keine Proportionalitaet — Zeitachsen SIND linear (1 Tag = 86.4M ms, egal wo im Kalender).

**Was sich aendert:**
- `type: 'linear'` statt `type: 'time'`
- `time: {}` Block entfaellt
- `adapters: {}` Block entfaellt
- FwDateAdapter wird fuer SNAPSHOT nicht mehr genutzt (nur noch PERIOD)
- afterBuildTicks/afterTickToLabelConversion bleiben identisch

**Was gleich bleibt:**
- `_generateLinearTicks()` — erzeugt Ticks als Timestamps, funktioniert auf linear Scale
- `_formatLabel()` — formatiert Timestamp → Label-String
- `_getDensityMatrix()` — unveraendert
- Alle Density-Tabellen — unveraendert

**Risiko:** GERING. Die Linear Scale hat weniger Interna die interferieren. Alle unsere Hooks arbeiten mit rohen Timestamps, nicht mit Chart.js-TimeScale-Features.

---

## 4. Schnitte & Haltepunkte

### Haltepunkt 1: Nach Task 0 (Diagnostik)
- **Gate:** Ist die min/max-Drift-Hypothese bestaetigt?
- JA → Weiter mit Task 1+2
- NEIN → Alternative Ursache analysieren, ggf. direkt zu Eskalationspfad (Linear Scale)

### Haltepunkt 2: Nach Task 1+2+4 (min/max + unit-Sync + Chart.js-Absicherung)
- **Gate:** Sind SNAPSHOT-Ticks auf allen 3 Zonen visuell aequidistant und korrekt positioniert?
- **PERIOD-Regressionstest:** Alle Balken-CSVs in 3 Zonen pruefen (DevTools Responsive Mode)
- JA → Weiter mit Task 5 (CV-Heuristik)
- NEIN → Eskalationspfad pruefen (Linear Scale)

### Haltepunkt 3: Nach Task 5 (CV-Heuristik)
- **Gate:** Alle 5 Referenz-CSVs liefern korrekte Rhythmus-Klassifikation + korrekte Ticks. Zoom-Wechsel-Test bestanden (scenario_4_crash: 5J→1J wechselt von Jahres- auf Quartal-Ticks).
- JA → Weiter mit Task 3 (Adapter UTC-Fix — hoechstes Regressionsrisiko)
- NEIN → CV-Schwellwerte nachjustieren

### Haltepunkt 4: Nach Task 3 (Adapter UTC-Fix)
- **Gate:** Keine Perioden-Grenz-Drift mehr? PERIOD-Track keine Regression? SNAPSHOT-Track weiterhin korrekt?
- JA → Task 6 (Pixel-Budget) + Task 7 (Aufraeumen) → Fertig
- NEIN → Adapter-Fix revertieren, Ursache isolieren

---

## 5. Risiken

### R1: PERIOD-Track-Regression durch Adapter-Fix (HOCH → durch Reihenfolge mitigiert)
FwDateAdapter wird von Chart.js fuer BEIDE Tracks genutzt. UTC-Umstellung in `startOf` aendert Perioden-Grenzen.
**Mitigation:** Task 3 kommt NACH allen anderen Code-Tasks. PERIOD-Track hat eigene afterBuildTicks + afterFit, die min/max und Ticks explizit setzen. PERIOD-Regression als erstes Testkriterium nach Adapter-Fix. Bei Regression: Adapter-Fix revertieren.

### R2: CV-Heuristik aendert bestehende Rhythmus-Erkennung (MITTEL)
Bucket-Statistik und CV koennten fuer gleiche Daten unterschiedliche Rhythmen liefern.
**Mitigation:** 5 Referenz-CSVs mit exakten erwarteten Ergebnissen. Alle bestehenden CSVs als Regressionstests. Zoom-Wechsel-Test fuer ERRATIC.

### R3: `time.unit` entfernen bricht Chart.js-Interna (NIEDRIG)
Ohne `time.unit` bestimmt Chart.js `_unit` automatisch via Adapter. Da wir Ticks und Labels ueberschreiben, ist das harmlos.
**Mitigation:** Falls Chart.js Warnings wirft, `time.unit` auf einen "harmlosen" Default setzen (z.B. immer `'day'` — der feinste Wert, der keine Rundung erzwingt).

### R4: `detectRhythm`-Signatur bricht bestehende Aufrufer (NIEDRIG)
Neuer optionaler Parameter `allTimestamps` mit Fallback. BarChartStrategy uebergibt keinen dritten Parameter → Fallback greift. Kein Breaking Change.

### R5: Eskalationspfad (Linear Scale) nicht noetig — aber riskant falls doch (NIEDRIG)
Linear Scale entfernt Chart.js-TimeScale-Interna komplett. Risiko: andere Plugins (die TimeScale-Features erwarten) brechen.
**Mitigation:** Nur als letzter Ausweg. Pruefen, ob Tooltips oder andere Plugins `scale.type === 'time'` abfragen.

---

## 6. Verifizierung (End-to-End)

Nach Abschluss aller Tasks muessen folgende Checks bestehen:

### SNAPSHOT-Track (Liniendiagramme)
- [ ] `snap_period_daily_90d.csv` — Ticks aequidistant, Zone S/M/L
- [ ] `snap_period_monthly_30m.csv` — Ticks aequidistant, Zone S/M/L
- [ ] `snap_period_monthly_4m.csv` — Ticks aequidistant, Zone S/M/L
- [ ] `snap_period_quarterly_3y.csv` — Ticks Mar/Jun/Sep/Dez, Zone S/M/L
- [ ] `snap_period_weekly_18m.csv` — Ticks aequidistant, Zone S/M/L
- [ ] `test_data-Liniendiagramm.csv` — Ticks aequidistant, Zone S/M/L
- [ ] `tool_tip_monthly_gaps.csv` — Lueckenhaft → Monats-Ticks
- [ ] `tt_gap_test_irregular.csv` — Lueckenhaft → Quartals-Ticks
- [ ] `snap_period_yearly_irregular.csv` — Regulaer → Jahres-Ticks, Zoom 1J → Erratisch → Quartals-Ticks
- [ ] `scenario_4_crash.csv` — Erratisch → T_window-gesteuerte Ticks
- [ ] `scenario_4_crash.csv` — Zoom-Wechsel: 5J→1J (Jahres→Quartal), 1J→3J (Quartal→Halbjahr), 3J→max (zurueck)

### PERIOD-Track (Balkendiagramme) — Regressionsschutz
- [ ] Alle Balken-CSVs in 3 Zonen unveraendert korrekt
- [ ] Tooltips korrekt (nicht anfassen, nur pruefen)

### Cross-Check
- [ ] Y-Achse unveraendert
- [ ] BAN-Headline unveraendert
- [ ] Range-Buttons funktionieren (Zoom aendert Ticks gemaess Density Matrix)

---

## 7. Plan-Delta nach Task 0 (2026-02-28)

### Ergebnis Task 0: min/max-Drift-Hypothese WIDERLEGT

Diagnostik-Logs in `afterDataLimits` und `afterBuildTicks` zeigen: `axis.min`/`axis.max` sind zwischen beiden Hooks **identisch**. Chart.js `buildTicks()` ueberschreibt unsere Werte nicht. Auch `_generateLinearTicks` aendert min/max nicht (ENTRY = EXIT).

Getestet mit `index_linien.html` (scenario_1_long_25y.csv + weitere). PERIOD-Track (`index_balken.html`) zeigt keine DIAG-Logs (korrekt isoliert).

### Neuer Root Cause: Calendar Snap + Mixed-Rhythm-Daten

**Beobachtung:** `scenario_1_long_25y.csv` zeigt Schlaufe bei 2020 und senkrechten Anstieg bei 2024.

**Ursache:** Die CSV hat gemischten Rhythmus (Quartale 2000-2002, Jahre 2003-2019, Quartale 2020, Jahre 2021-2023, Quartale 2024-2025). `detectRhythm` liefert YEARLY (Plurality-Vote). `getSnapshotSnap(ts, 'YEARLY')` snappt ALLE Punkte auf Jan 1. Quartals-Punkte (Apr, Jul, Okt) kollabieren auf denselben Jan-1-Timestamp → mehrere Datenpunkte auf derselben x-Koordinate → Chart.js verbindet sie in Array-Reihenfolge → Schlaufe/vertikaler Strich.

**Mechanik im Detail:**
- 2020-01-01 (y=280) → snap → 2020-01-01
- 2020-04-01 (y=240) → snap → 2020-01-01 ← SELBE x-Position
- 2020-07-01 (y=290) → snap → 2020-01-01 ← SELBE x-Position
- Chart.js zeichnet: 280 → 240 → 290, alle auf x=2020 → **Schlaufe**

### Task-Status-Update

| Task | Alt | Neu | Begruendung |
|------|-----|-----|-------------|
| T0 Diagnostik | ⬜ | ✅ erledigt | min/max-Drift widerlegt. Logs temporaer im Code (T7 entfernt sie). |
| T1 min/max-Kontrolle | ⬜ | ❌ streichen | min/max werden nicht von buildTicks() ueberschrieben. Kein Problem zu loesen. |
| T2 time.unit-Sync | ⬜ | ❌ streichen | Mismatch Config/Runtime ist real, hat aber keine sichtbare Auswirkung (Hooks ueberschreiben alles). |
| T4 Chart.js baendigen | ⬜ | ❌ streichen | War Absicherung fuer T1/T2. Ohne Drift-Problem unnoetig. |
| T5 CV-Heuristik | ⬜ | 🔄 anpassen | Bleibt sinnvoll: CV erkennt mixed-rhythm als ERRATIC. NEU: `getSnapshotSnap` muss fuer ERRATIC Identitaets-Snap liefern (kein Kalender-Snap). |
| T3 FwDateAdapter UTC | ⬜ | ⬜ unveraendert | Local-Time-Bug ist real, unabhaengig vom Root Cause. Prioritaet niedrig. |
| T6 Pixel-Budget | ⬜ | ⬜ unveraendert | Reine Validierung. |
| T7 Aufraeumen | ⬜ | 🔄 anpassen | Nur noch: T0-Diagnostik-Logs entfernen. T1/T2-Artefakte gibt es nicht. |

### Neue Task-Reihenfolge

T5 (CV-Heuristik + Snap-Anpassung) → T3 (Adapter UTC) → T6 (Pixel-Budget) → T7 (Aufraeumen)

### Offene Fragen fuer naechsten Thread

1. Sind die „erratischen Ticks auf ALLEN Rhythmen" (§1) auch bei mono-rhythm CSVs sichtbar? Falls ja, ist Calendar Snap nicht der einzige Faktor.
2. Braucht T5 einen neuen Sub-Task fuer `getSnapshotSnap` ERRATIC-Pfad, oder ist Identitaets-Snap (kein Snap) ausreichend?
3. Soll `detectRhythm` bei mixed-rhythm ERRATIC zurueckgeben, oder braucht es einen separaten Rhythm-Wechsel-Detektor?
