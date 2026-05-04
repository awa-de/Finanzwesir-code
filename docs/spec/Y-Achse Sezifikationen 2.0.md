# 📄 SPEZIFIKATION: Y-Achsen-Matrix (Vertical Authority)

**Version:** 2.2.0 UNIVERSAL CLEARANCE
**Status:** BINDING
**Zugehörigkeit:** Layer 2 (SmartScales) & Layer 4 (FormatUtils)
**Ursprungsdatum:** 20.01.2026
**Aktualisierung:** 16.02.2026

---

## CHANGELOG & ENTWICKLUNGSGESCHICHTE

### V1.0.0 – Initiale Version "Vertical Authority"
- Grundlegende Matrix-Struktur mit Screen-Zonen (S/M/L)
- Nice-Number-Quantisierung nach der 1-2-5-Regel
- Magnitude-Klassen: Micro, Standard, Large, Whale
- Deterministische Formatierung mit de-DE Locale

### V1.1.0 – STRICT COMPLIANCE (Architektur-Reparatur)
**Problem:** Schriftart-Inkohärenz zwischen X- und Y-Achse
**Lösung:** Service Delegation Pattern – Nutzung von `FwLayoutRules` (Layer 0) statt direkter Config-Tunneling

### V1.2.0 – BOUNDARY EXPANSION (Nice Numbers Fix)
**Problem:** Krumme Startwerte bei Achsengrenzen (z.B. Achse begann bei 12 statt 10)
**Lösung:** Snap-to-Grid-Logik mit `Math.floor(min/step) * step` und `Math.ceil(max/step) * step`

### V1.3.0 – FONT SERVICE DELEGATION
**Problem:** Responsive Font-Größen waren nicht dynamisch
**Lösung:** Integration von `FwLayoutRules.getResponsiveFont(context)` für echte Responsivität

### V1.4.0 – DYNAMIC AUTO-ZOOM (Initialer Entwurf)
**Problem:** Y-Achse blieb statisch beim Ein-/Ausblenden von Legenden-Pills
**Versuch:** Implementierung des `afterDataLimits`-Hooks für Echtzeit-Rescaling
**Grace-Buffer:** 15% Puffer nach oben eingeführt (1.15x)
**Ergebnis:** Konzeptionell richtig, aber **nicht funktionsfähig** – Achse blieb starr

### V1.5.0 – DYNAMIC RESCUE ⚠️ **Kritischer Fix**
**Problem:** Statische `min`/`max`-Werte in der Config sperrten die Achse (ähnlich wie X-Achse mit `userMin: true`)
**Root Cause:** In `FwSmartXAxis` wird die Skala bewusst mit `axis.userMin = true` eingefroren, um geometrische Stabilität zu gewährleisten. Dieses Muster wurde versehentlich auf die Y-Achse übertragen.
**Lösung:** 
- Entfernung statischer `min: niceMin` und `max: niceMax` aus dem Config-Objekt
- Chart.js berechnet nun basierend auf `isDatasetVisible()` die Limits selbst
- Hook veredelt diese Werte "on the fly" mit Nice Numbers + Grace
**Wichtig:** Kein `userMin: true` setzen – Achse muss "atmen" können!

### V1.6.0 – NEGATIVE RANGE MIRROR
**Problem:** Negative Werte wurden abgeschnitten, da Balkendiagramme hart auf `min = 0` gesetzt waren
**Klarstellung durch den Nutzer:**
- **Balkendiagramme:** Balken müssen IMMER an der Nulllinie starten (keine abgeschnittenen Balken ab 60!)
- **Liniendiagramme:** Magnetische Null greift nur bei kleinen Zahlen nahe Null (z.B. 3,45 → 0)
- **Spiegel-Logik:** Grace-Buffer und Baseline-Regeln müssen symmetrisch funktionieren

**Lösung:**
1. **Symmetrischer Grace-Buffer:** 15% Expansion sowohl nach oben (max) als auch nach unten (min)
2. **Baseline-Garantie für Bar Charts:**
   - Wenn `min >= 0`: `min = 0` (positive Balken)
   - Wenn `max <= 0`: `max = 0` (negative Balken)
   - Wenn beides: Achse umspannt beide Richtungen
3. **Symmetrische Magnetische Null für Line Charts:**
   - Wenn Daten knapp über Null: `min = 0`
   - Wenn Daten knapp unter Null: `max = 0`

### V1.7.0 – PROPORTIONAL GRACE
**Problem:** Die additive Grace-Formel (`span × 0.15` auf beide Seiten) bläht bei asymmetrischen Daten die schwache Seite unverhältnismäßig auf.
**Reales Beispiel:** Daten -2,9% bis +155,4% (Jahresperformance). Der Gesamtspan (158,3) dominiert durch den positiven Extremwert (Bitcoin +155%). Die additive Grace addiert 23,7 Prozentpunkte auf die -2,9% → -26,6% (Faktor 9x). Nach Nice-Number-Snapping wird daraus -200%. Die Achse geht von -200% bis 200%, obwohl der schlimmste Verlust nur -2,9% beträgt.

**Kognitive Begründung (warum das ein UX-Problem ist):**
- **Tufte – Data-Ink-Ratio:** Über 50% der Zeichenfläche transportiert null Information (leerer Negativraum).
- **Tufte – Lie Factor:** -2,9% visuell im Raum von -200% → Leser nimmt massives Verlustrisiko wahr, das nicht existiert.
- **Kahneman – Anchoring:** Die Y-Achsen-Endpunkte verankern die Risiko-Wahrnehmung. -200% als Anker verzerrt die Interpretation systematisch.
- **Krug – Don't Make Me Think:** Leser muss aktiv nachdenken, warum die Skala so weit reicht.

**Zweiter Bug:** Zone-Erkennung in `_performDynamicRescaling` nutzte `axis.width` (Y-Label-Spaltenbreite ~60px) statt `axis.chart.width` (Canvas-Gesamtbreite). Ergebnis: immer Zone S (targetTicks=4) → zu grobe Schrittweite. Verstößt gegen KDR 6 (Container Rule) und KDR 8 (Zone Zero Logic).

**Lösung:**
1. **Multiplikativer Grace-Buffer:** Jede Seite bekommt 15% ihres *eigenen* Betrags (statt 15% des Gesamtspans).
   - "Symmetrisch" = *gleichbehandelt* (beide Seiten 15%), NICHT *identischer Absolutbetrag*.
   - Analog: Eine proportionale Steuer (15%) ist fair; eine Kopfpauschale (identischer Betrag) bevorzugt die größere Seite.
2. **Korrekte Zone-Erkennung:** `axis.chart.width` statt `axis.width` für konsistente S/M/L-Zonen zwischen X- und Y-Achse.

### V1.8.0 – FINE-SNAP
**Problem:** Bei asymmetrischen Daten dominiert der Extremwert die Schrittweite. Die schwache Seite (z.B. -3,3% bei step=50) wurde durch `Math.floor` auf -50 gezerrt (Lie-Factor 15×).
**Lösung:** Wenn `|Wert| < step`, nutze `niceNum(|Wert|)` statt Grid-Snap. Ergebnis: -5 statt -50.
**Einschränkung:** Funktioniert nur, wenn -5 zufällig auf einer Tick-Grenze liegt (step=10 → ja, step=50 → nein). Chart.js `buildTicks` überschreibt die berechneten Grenzen.

### V1.9.0 – TIGHT FRAME
**Drei Probleme:**
1. **Chart.js buildTicks-Override:** Fine-Snap berechnet `axis.min = -5` korrekt, aber Chart.js's internes `buildTicks` zerrt es auf die nächste Tick-Grenze (bei step=50 wird -5 zu -50).
2. **Bildschirmabhängige Rahmenberechnung:** `zone.targetTicks` (4/6/8 je nach Screen-Zone) fließt in die Step-Berechnung → gleiche Daten, verschiedene Achsen-Grenzen auf verschiedenen Bildschirmen.
3. **Nur zwei Snap-Kandidaten:** Grid-Snap (oft zu weit) oder niceNum (manchmal zu eng).

**Lösung:**
1. **afterBuildTicks-Guardian:** Neuer Hook `_guardBoundaries()` stellt die berechneten Grenzen nach `buildTicks` wieder her und filtert Out-of-Range-Ticks. Gleicher Pattern wie X-Achse.
2. **FRAME_TICKS=10:** Feste Tick-Anzahl für die Rahmenberechnung, unabhängig von der Bildschirmgröße. Architektur-Prinzip: Framing (min/max) ist datengetrieben, Ticking (Schrittweite/Dichte) ist bildschirmgetrieben.
3. **Drei-Kandidaten-Boundary-Selektion (`_tightBound`):**
   - `gridSnapGraced`: Grid-Snap des Grace-Werts (klassisch, immer sicher)
   - `niceNumRaw`: niceNum-Ceiling der Rohdaten (1-2-5-Raster, psychologisch intuitiv)
   - `gridSnapRaw`: Grid-Snap der Rohdaten ohne Grace (tightest possible)
   - Wählt den engsten Kandidaten mit ≥5% Atemraum. Fallback: gridSnapGraced.

### V2.0.0 – MINIMUM BREATHING ROOM

**Problem 1 (Clearance):** Bei asymmetrischen Mixed-Sign-Balkencharts (z.B. -2,9% bis +155,4%) kann die Minor-Side-Grenze weniger als 1 Step von Null entfernt liegen. Ergebnis: **kein Tick im Negativbereich** — tickloses Niemandsland zwischen Nulllinie und Canvas-Kante. Der Balken-Stummel ist visuell nicht ablesbar (Krug-Verstoß).

**Lösung 1: Minor-Side Minimum Clearance (§14, bar-only)**
In Mixed-Sign-Charts (axis.min < 0, axis.max > 0) wird jede Achsengrenze < 1 Step von Null auf ±1 Step expandiert.
- Gilt für Bar UND Line Charts (seit V2.2.0 universal, vorher bar-only)
- Grid-aligned, deterministisch, bildschirmunabhängig

**Problem 2 (Richtungs-Filter):** `_tightBound` war richtungsagnostisch — `niceNumRaw` rundet immer weg von Null (ceiling). Bei positiven floor-Werten (z.B. rawMin=88 in einem Liniendiagramm) wählte `_tightBound` niceNum(88)=100, was den Datenpunkt clippt (88 < 100 → unsichtbar). Betrifft nur Line Charts mit rein positiven Daten fern von Null (Bar Charts nicht betroffen, da Baseline rawMin=0).

**Lösung 2: Richtungs-Filter in `_tightBound`**
Vor der Kandidaten-Selektion werden Werte gefiltert: floor-Kandidaten müssen ≤ rawValue sein, ceil-Kandidaten ≥ rawValue. `gridSnapGraced`/`gridSnapRaw` erfüllen dies konstruktionsbedingt. Nur `niceNumRaw` kann auf der falschen Seite liegen.

**Referenzfälle:**
- Clearance: -2,9% / +155,4%, Bar, step=20 → min: -5 → -20 (1 Step Expansion)
- Richtungs-Filter: 88% / 155%, Line, step=10 → min: 80 (statt 100 = Clipping)

### V2.1.0 – ENHANCED MAGNETIC ZERO (Aktueller Stand)

**Problem:** Die span-relative Magnetische Null (Schwelle = span × 15%) versagt bei eng geclusterten Prozentwerten nahe Null. Beispiel: Tagesgeld 3,2–4,0% → Span = 0,8, Schwelle = 0,12 → Magnet greift nicht → Y-Achse startet bei 3,2% → sieht optisch aus wie Null. Lie Factor (Tufte), Anchoring-Verzerrung (Kahneman), "How to Lie with Statistics" (Huff).

**Analyse der UX-Literatur:**
- **Edward Tufte:** Truncated Y-axes erzeugen Lie Factor. Für kleine Prozentwerte ist Zero der ehrliche Ankerpunkt.
- **Darrell Huff:** Abgeschnittene Y-Achsen sind die Nr.-1-Methode, mit Charts zu lügen.
- **Stephen Few:** Liniendiagramme SOLLTEN Null zeigen, wenn die Distanz zu Null semantisch bedeutsam ist. Bei Renditen: Null = "keine Veränderung" — immer bedeutsam.
- **Konsens:** Für Finanz-Prozentwerte ≤ 20% ist Null immer der kognitive Ankerpunkt.

**Lösung: Duale Magnetische Null**
Für Prozentwerte (`valueMode = 'percent'` oder `'return'`): `magnetThreshold = max(span × 15%, 20)`. Die absolute Schwelle von 20% fängt eng geclusterte Daten nahe Null ab, bei denen die span-relative Schwelle versagt.

Für Nicht-Prozentwerte (z.B. Euro): Keine Änderung, span-relative Schwelle bleibt.

**Entscheidungsmatrix:**
| Werte | Regel |
|:------|:------|
| 0–20% (Prozent) | Immer bei Null starten |
| > 20% (Prozent) | Null weglassen OK (Muster wichtiger als Position) |
| Vorzeichenwechsel | Null ist implizit enthalten (Daten kreuzen Null) |
| Nicht-Prozentwerte | Span-relative Schwelle (15%) wie bisher |

### V2.2.0 – UNIVERSAL CLEARANCE (Aktueller Stand)

**Problem:** Minor-Side Clearance (§14) war bar-only. Bei asymmetrischen Line Charts (z.B. -3,5% / +155%) lag die Nulllinie bei 2,7% der Charthöhe vom Canvas-Rand — visuell kaum unterscheidbar vom Rand (Cleveland: *"Make the data stand out clearly from the graphical structure"*).

**Lösung:** Clearance gilt jetzt für **alle** Mixed-Sign-Charts (Bar und Line). Drei Wörter gelöscht (`fwContext.chartType === 'bar' &&`), eine Sonderlocke weniger. Kein neuer Code.

**Begründung:** Die Nulllinie ist bei Finanzdaten der primäre Ankerpunkt (Grenze Gewinn/Verlust). Sie muss klar sichtbar sein — für Linien genauso wie für Balken. 7% zusätzliche Fläche für eine klar sichtbare Nulllinie ist kein verschwendetes Data-Ink (Tufte), sondern Information.

---

## 1. Die Nice-Number-Quantisierung

Bevor die Matrix greift, wird die theoretische Schrittweite nach folgender Formel berechnet:

$$S_{raw} = \frac{\text{Max} - \text{Min}}{\text{Ticks}_{Target}}$$

Diese wird auf das nächste Element aus der Menge $\{1, 2, 5\} \times 10^n$ gerundet.

**Beispiel:**
- Berechnet: $S_{raw} = 347$
- Nächstes Nice Number: $500$ (aus der Menge $\{1, 2, 5\} \times 10^2$)

**Algorithmus (niceNum):**
```javascript
static niceNum(range, round) {
  if (range <= 0) return 1;
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction;
  
  if (round) {
    if (fraction <= 1.5) niceFraction = 1;
    else if (fraction <= 3) niceFraction = 2;
    else if (fraction <= 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }
  
  return niceFraction * Math.pow(10, exponent);
}
```

---

## 2. Matrix: Screen L (Desktop)

**Ziel:** Kaufmännische Eleganz und maximale Detailtiefe (> 900px).

| Magnitude | Intervall-Schritt (Nice No.) | Präzision (Nachkomma) | Formatierung |
| :--- | :--- | :--- | :--- |
| **Micro** (< 10) | 0,01 / 0,1 / 0,25 / 0,5 | Immer 2 | 1,25 % |
| **Standard** (< 10k) | 1 / 10 / 50 / 100 | Smart (0 bei Integer) | 1.250 € |
| **Large** (< 1M) | 500 / 1.000 / 5.000 | Smart (0 bei Integer) | 250.000 € |
| **Whale** (> 1M) | 100k / 500k / 1M | Abkürzung ab 10M | 1.200.000 € / 15M € |

---

## 3. Matrix: Screen M (Tablet)

**Ziel:** Ausgewogenheit zwischen Lesbarkeit und Platzbedarf (450px–899px).

| Magnitude | Intervall-Schritt (Nice No.) | Präzision (Nachkomma) | Formatierung |
| :--- | :--- | :--- | :--- |
| **Micro** (< 10) | 0,1 / 0,5 / 1,0 | Max 2 (nur bei Bedarf) | 1,2 % / 1,25 % |
| **Standard** (< 10k) | 10 / 50 / 100 | Strikt 0 (bei Ganzzahl) | 1.250 € |
| **Large** (< 1M) | 5.000 / 10.000 | Smart (Abkürzung ab 100k) | 50.000 € / 150k € |
| **Whale** (> 1M) | 1M / 5M | Zwingend (M) | 1,2M € |

---

## 4. Matrix: Screen S (Mobile)

**Ziel:** Survival-Modus. Maximale Breite für den Chart (< 450px).

| Magnitude | Intervall-Schritt (Nice No.) | Präzision (Nachkomma) | Formatierung |
| :--- | :--- | :--- | :--- |
| **Micro** (< 10) | 0,5 / 1,0 / 2,0 | Max 1 | 1,5 % / 2 % |
| **Standard** (< 10k) | 50 / 100 / 500 | Strikt 0 | 1.250 € |
| **Large** (< 1M) | 10.000 / 50.000 | Zwingend (k) | 25k € / 150k € |
| **Whale** (> 1M) | 5M / 10M | Zwingend (M) | 1M € / 12M € |

---

## 5. Basiseinstellungen und semantische Weichen

### 5.1 Chart-Typ spezifische Regeln

**Balkendiagramme (Bar Charts):**
- **Nulllinie als Baseline:** Balken starten IMMER bei Null – egal ob positive oder negative Werte
- **Begründung:** Rechteckhöhe = Wert (visueller Bezug zur Nulllinie kritisch)
- **Unseriös:** Ein Balkendiagramm, das erst bei 60 losgeht (abgeschnittene Balken)
- **Symmetrie:** 
  - Wenn `min >= 0`: `min = 0` (positive Balken starten bei 0)
  - Wenn `max <= 0`: `max = 0` (negative Balken starten bei 0)
  - Wenn beides: Achse umspannt beide Richtungen

**Liniendiagramme (Line Charts):**
- **Zwei Modi:**
  1. **Smart Window (Zoom):** Wenn alle Werte zwischen 98 und 105 liegen → Achse beginnt bei ~90, um Schwankungen sichtbar zu machen
  2. **Magnetische Null:** Wenn Werte nahe Null sind → Achse schnappt auf Null
- **Duale Schwelle (V2.1.0):**
  - Prozentwerte (`valueMode` = `'percent'`/`'return'`): `max(span × 15%, 20)`
  - Nicht-Prozentwerte: `span × 15%`
- **Begründung:** Für Finanz-Prozentwerte ≤ 20% ist Null immer der kognitive Ankerpunkt (Few, Tufte, Huff). Span-relative Schwelle versagt bei eng geclusterten Daten nahe Null.
- **Symmetrisch:**
  - Wenn Daten knapp über Null: `min = 0`
  - Wenn Daten knapp unter Null: `max = 0`

### 5.2 Zero-Line Hervorhebung

- **Visueller Kontrast:** Die Nulllinie wird stärker hervorgehoben als normale Gridlines
- **Grund:** Nulllinie ist der wichtigste kognitive Ankerpunkt für Gewinn/Verlust-Interpretation
- **Farbe:** Dunklere Grid-Color für Null (`--color-zero-line` / Token `zeroLine`), Standard-Grid für andere (`--color-grid` / Token `grid`)
- **Strichstärke (lineWidth):** Nur bei **Mixed-Sign-Charts** (`min < 0 && max > 0`) bekommt die Nulllinie `lineWidth: 2` (doppelt so dick wie normale Gridlines). Bei rein positiven oder rein negativen Charts bleibt `lineWidth: 1` — die Nulllinie liegt dort am Chart-Rand und würde als unerwünschter Rahmen wirken.
- **Implementierung:** `FwSmartYAxis.compute()` → `grid.lineWidth` Callback mit Mixed-Sign-Guard via `context.chart.scales.y`

### 5.3 Einheiten-Anker (Unit Optimization)

Um horizontalen Platz zu sparen, wird die Einheit (€, %, etc.) bei Screen S/M bevorzugt:

- **Einmalig im Titel** oder
- **Als Label über der Achse** (statt an jedem Tick)

**Vorteil:** Y-Achsen-Labels bleiben kompakt; keine redundanten Einheiten-Wiederholungen.

---

## 6. Implementierungs-Architektur

### 6.1 FwSmartScales Service Flow

```
Input: { min, max, chartType, screenZone, currency }
    ↓
[KEIN statisches min/max mehr in Config!]
    ↓
Chart.js berechnet axis.min/max basierend auf sichtbaren Daten
    ↓
afterDataLimits Hook greift ein:
    ↓
1. Lese axis.min/max (bereits gefiltert nach isDatasetVisible)
    ↓
2. Proportionaler Grace-Buffer (15% pro Seite, multiplikativ)
    ↓
3. Baseline-Regeln (Bar vs. Line, Enhanced Magnetic Zero V2.1.0)
    ↓
4. Nice Step berechnen (FRAME_TICKS=10, bildschirmunabhängig)
    ↓
5. Tight Boundary Selection (3 Kandidaten, Richtungs-Filter, tightest-wins mit ≥5% Atemraum)
    ↓
5.5 Minor-Side Minimum Clearance (universal V2.2.0): Mixed-Sign → |boundary| < step → ±step (§14)
    ↓
6. Setze axis.min/max + Guardian-Marker (_fwMin/_fwMax)
    ↓
Chart.js buildTicks generiert Ticks (kann min/max verändern!)
    ↓
afterBuildTicks Guardian greift ein:
    ↓
7. Restauriere axis.min/max, filtere Out-of-Range-Ticks
    ↓
Output: Chart.js Scales Config (dynamisch, reaktiv & bildschirmunabhängig)
```

### 6.2 Gatekeeper-Entscheidungen (in Code)

```javascript
// === afterDataLimits Hook ===
static performDynamicRescaling(axis, fwContext) {
  // 1. Chart.js hat bereits gefilterte Limits berechnet
  let rawMin = axis.min;
  let rawMax = axis.max;

  // 2. Sicherheitscheck
  if (rawMin === Infinity || rawMax === -Infinity || (rawMin === 0 && rawMax === 0)) {
    axis.min = 0;
    axis.max = 100;
    return;
  }

  // 3. Proportionaler Grace-Buffer (15% pro Seite, multiplikativ)
  let gracedMin = rawMin < 0 ? rawMin * 1.15 : rawMin;
  let gracedMax = rawMax > 0 ? rawMax * 1.15 : rawMax;

  // 4. Baseline-Regeln (Mirror Logic)
  const span = rawMax - rawMin;
  if (fwContext.chartType === 'bar') {
    if (rawMin > 0) { rawMin = 0; gracedMin = 0; }
    if (rawMax < 0) { rawMax = 0; gracedMax = 0; }
  } else {
    // Enhanced Magnetic Zero (V2.1.0): Duale Schwelle
    const spanThreshold = span * 0.15;
    const PERCENT_MAGNET_CEILING = 20;
    const isPercentLike = ['percent', 'return'].includes(fwContext.valueMode);
    const magnetThreshold = isPercentLike
        ? Math.max(spanThreshold, PERCENT_MAGNET_CEILING)
        : spanThreshold;
    if (rawMin > 0 && rawMin < magnetThreshold) { rawMin = 0; gracedMin = 0; }
    if (rawMax < 0 && Math.abs(rawMax) < magnetThreshold) { rawMax = 0; gracedMax = 0; }
  }

  // 5. Screen-independent Nice Step (FRAME_TICKS=10, fest)
  const FRAME_TICKS = 10;
  const step = this.calculateNiceStep(gracedMin, gracedMax, FRAME_TICKS).stepSize;

  // 6. Tight Boundary Selection (Richtungs-Filter + 3 Kandidaten, tightest-wins)
  // _tightBound filtert Kandidaten, die den Datenwert clippen würden:
  // floor-Kandidaten müssen ≤ rawValue sein, ceil ≥ rawValue.
  axis.min = this.tightBound(rawMin, gracedMin, step, 'floor');
  axis.max = this.tightBound(rawMax, gracedMax, step, 'ceil');

  // 6.5 Minor-Side Minimum Clearance (§14, universal V2.2.0)
  if (axis.min < 0 && axis.max > 0) {
    if (Math.abs(axis.min) < step) axis.min = -step;
    if (Math.abs(axis.max) < step) axis.max = step;
  }

  // 7. Guardian-Marker für afterBuildTicks
  axis._fwMin = axis.min;
  axis._fwMax = axis.max;
}

// === afterBuildTicks Guardian ===
static guardBoundaries(axis) {
  if (axis._fwMin == null || axis._fwMax == null) return;
  axis.min = axis._fwMin;
  axis.max = axis._fwMax;
  axis.ticks = axis.ticks.filter(t => t.value >= axis._fwMin && t.value <= axis._fwMax);
}
```

---

## 7. Analytische Rahmenwerke (FAANG-Qualität)

### Via Negativa (Charlie Munger)
**Was wir vermeiden:**
1. **Kollaps:** Achse darf nicht auf 0 zusammenbrechen, wenn alle Datensätze ausgeblendet sind → Fallback auf 0-100
2. **Jitter:** Keine Layout-Shifts der X-Achse durch Y-Achsen-Änderungen
3. **Rounding-Gaps:** Keine krummen Ticks wie 11,43 → Immer Nice Numbers

### Occam's Razor
**Einfachste Lösung wählen:**
- Nutze nativen Chart.js Lifecycle (`afterDataLimits`) statt Custom-Animation-Loops
- Chart.js triggert Re-Rendering automatisch bei Legenden-Klicks
- Manipulation von `axis.min/max` aktiviert interne Interpolations-Engine

### Devil's Advocate (Edge Cases)
1. **Ein einzelner Datenpunkt:** Grace-Factor verhindert Clipping
2. **Nur Nullwerte:** Fallback auf 0-100
3. **Alle Datensätze ausgeblendet:** Sicherheitscheck mit Infinity-Abfrage
4. **Negative Werte:** Symmetrische Behandlung durch Mirror Logic

---

## 8. Fallbeispiele

### Beispiel 1: Desktop, Balkendiagramm, 12.500€–250.000€

- **Magnitude:** Large
- **Matrix Row:** Screen L / Large
- **Nice Number:** 50.000
- **Präzision:** 0 (Smart)
- **Ausgabe:** `50.000 €`, `100.000 €`, `150.000 €`, `200.000 €`, `250.000 €`

### Beispiel 2: Mobile, Liniendiagramm, 0,50%–2,30%

- **Magnitude:** Micro
- **Matrix Row:** Screen S / Micro
- **Nice Number:** 0,5
- **Präzision:** Max 1
- **Magnetische Null:** JA (V2.1.0: rawMin=0,5 < 20% Ceiling → min=0)
- **Ausgabe:** `0,0%`, `0,5%`, `1,0%`, `1,5%`, `2,0%`, `2,5%`

### Beispiel 3: Tablet, Balkendiagramm, 2.500.000€–15.000.000€

- **Magnitude:** Whale
- **Matrix Row:** Screen M / Whale
- **Nice Number:** 5M
- **Präzision:** Zwingend (M)
- **Ausgabe:** `2,5M €`, `7,5M €`, `12,5M €`

### Beispiel 4: Desktop, Balkendiagramm, -80€ bis +50€ (Negativ + Positiv, symmetrisch)

- **Magnitude:** Standard
- **Matrix Row:** Screen L / Standard
- **Grace Buffer:** -80 × 1.15 = -92, +50 × 1.15 = +57,5 (proportional 15%)
- **Baseline:** Nulllinie bleibt (min < 0 und max > 0)
- **Nice Number:** 20 oder 50
- **Ausgabe:** `-100 €`, `-50 €`, `0 €`, `50 €`, `100 €`

### Beispiel 5: Mobile, Balkendiagramm, -120€ bis -20€ (Nur Negativ)

- **Magnitude:** Standard
- **Matrix Row:** Screen S / Standard
- **Grace Buffer:** -120 × 1.15 = -138
- **Baseline:** `max = 0` (Balken starten bei Null)
- **Nice Number:** 50
- **Ausgabe:** `-150 €`, `-100 €`, `-50 €`, `0 €`

### Beispiel 6: Desktop, Balkendiagramm, -2,9% bis +155,4% (Asymmetrisch — Referenzfall)

- **Daten:** test_data.csv, Zeitrahmen 1 Jahr (Bitcoin +155%, Anleihen -2,9%)
- **Grace Buffer:** -2,9 × 1.15 = -3,34%, +155,4 × 1.15 = +178,7% (proportional 15%)
- **Baseline:** min < 0 und max > 0 → Nulllinie bleibt
- **Nice Step:** Step 20 (FRAME_TICKS=10, bildschirmunabhängig)
- **Tight Boundary min:** Kandidaten -20 (gridSnapGraced), -5 (niceNumRaw), -20 (gridSnapRaw) → Tightest: -5 (72% Atemraum)
- **Tight Boundary max:** Kandidaten 180 (gridSnapGraced), 200 (niceNumRaw), 160 (gridSnapRaw) → 160 hat nur 3% Raum → 180 (16% Atemraum)
- **Minor-Side Clearance (§14):** |-5| = 5 < step = 20 → min expandiert auf -20
- **Achse:** -20% bis 180%
- **Ticks:** -20, 0, 20, 40, 60, 80, 100, 120, 140, 160, 180
- **afterBuildTicks Guardian:** Alle Ticks in [-20, 180] → kein Filtering nötig.

### Beispiel 7: Desktop, Balkendiagramm, 0 bis 125.000€ (Singlebalken — nur positive Werte)

- **Daten:** test_data_singlebalken.csv (Portfoliowert)
- **Baseline:** rawMin → 0 (Bar-Regel: positive Balken starten bei 0)
- **Grace Buffer:** 125.000 × 1.15 = 143.750
- **Nice Step:** Step 20.000 (FRAME_TICKS=10)
- **Tight Boundary max:** Kandidaten 160.000 (gridSnapGraced), 200.000 (niceNumRaw), 140.000 (gridSnapRaw) → Tightest: 140.000 (12% Atemraum)
- **Achse:** 0 bis 140.000€
- **Ticks:** 0, 20.000, 40.000, 60.000, 80.000, 100.000, 120.000, 140.000

---

## 9. FAANG-Qualität: Ausschluss von Quereffekten

### 9.1 Encapsulated Lifecycle Hook
- Logik nur im `afterDataLimits`-Hook der Y-Achse
- Chart.js berechnet Achsen isoliert → Keine Schreibzugriffe auf X-Achse
- X-Achse bleibt "Black Box" mit `userMin: true`

### 9.2 Idempotenz der Berechnung
- `performDynamicRescaling` ist zustandslos
- Nimmt aktuelle Roh-Datenlimits und transformiert mathematisch
- Ergebnis für spezifische Asset-Kombination ist deterministisch

### 9.3 Anatomische Trennung von Viewport und Daten
- Y-Achse arbeitet rein auf Daten-Ebene (axis.min/max)
- Keine Änderungen am `fwGeometry`-Objekt
- Keine Berührung mit `halfBarPixel`-Berechnung der BarChartStrategy

### 9.4 Lifecycle-Isolation
- `afterDataLimits` feuert NACH Datenmenge-Festlegung, ABER VOR Layout-Berechnung
- Verhindert Achsen-Flackern
- Native Chart.js Animationen (Easing) werden automatisch übernommen → Keine Race-Conditions

### 9.5 Graceful Degradation
- Sicherheitscheck mit `min === Infinity || max === -Infinity`
- Fallback auf 0-100 statt NaN-Crash
- Kein Absturz bei allen ausgeblendeten Assets

---

## 10. Architektur-Kontext

### Layer-System
- **Layer 0:** `FwLayoutRules` (Responsive Fonts)
- **Layer 2:** `FwSmartYAxis` (Scales Logic)
- **Layer 4:** `FwFormatUtils` (String Formatting)

### Service Delegation
- **NICHT:** Config-Tunneling (direkte Font-Objekte durchreichen)
- **SONDERN:** Service-Aufruf `FwLayoutRules.getResponsiveFont(context)`

### X-Achse als Lehrbeispiel
- **Analogie:** X-Achse zeigt, wie Lifecycle-Hooks funktionieren
- **WICHTIG:** X-Achse nutzt `userMin: true` für zeitliche Stabilität → NICHT für Y-Achse kopieren!
- **Y-Achse:** Muss "atmen" können → Dynamisches Rescaling bei Sichtbarkeitswechseln

---

## 11. Zusammenfassung

Diese Spezifikation garantiert:

✅ **Determinismus:** Gleiche Input-Parameter führen immer zum gleichen Y-Achsen-Layout  
✅ **Responsive Design:** Jede Screen-Zone hat optimale Balancierung (Dichte vs. Lesbarkeit)  
✅ **Kaufmännische Konvention:** Nice Numbers, aussagekräftige Formatierung, Zero-Line-Fokus  
✅ **Wartbarkeit:** Matrix ist zentral dokumentiert; keine versteckten Heuristiken  
✅ **Dynamik:** Achse reagiert auf Legenden-Klicks und passt sich sichtbaren Daten an  
✅ **Symmetrie:** Negative und positive Werte werden gleichwertig behandelt  
✅ **Stabilität:** Keine Seiteneffekte auf X-Achse oder Performance

---

## 12. Kritische Erkenntnisse für Entwickler

### ⚠️ Niemals statische min/max in Config setzen!
```javascript
// ❌ FALSCH (sperrt die Achse)
return {
  type: 'linear',
  min: niceMin,
  max: niceMax,
  // ...
};

// ✅ RICHTIG (lässt Chart.js die Limits berechnen)
return {
  type: 'linear',
  beginAtZero: false,
  afterDataLimits: (axis) => this.performDynamicRescaling(axis, fwContext),
  // ...
};
```

### ⚠️ Niemals userMin/userMax setzen!
```javascript
// ❌ FALSCH (für X-Achse OK, für Y-Achse tödlich)
axis.min = Math.floor(min / step) * step;
axis.max = Math.ceil(max / step) * step;
axis.userMin = true; // ← NEIN!
axis.userMax = true; // ← NEIN!
```

### ⚠️ Grace-Buffer muss proportional und bidirektional sein!

"Symmetrisch" bedeutet **gleichbehandelt** (beide Seiten bekommen 15% ihres eigenen Betrags), NICHT **identischer Absolutbetrag**. Der Grace-Buffer ist eine proportionale Steuer, keine Kopfpauschale.

```javascript
// ❌ FALSCH (nur nach oben)
if (max > 0) max *= 1.15;

// ❌ FALSCH (additiv — bläht schwache Seite bei asymmetrischen Daten auf)
// Bei Daten -2,9% bis +155,4% addiert dies 23,7 Punkte auf die -2,9% → Faktor 9x!
const span = max - min;
if (max > 0) max += span * 0.15;
if (min < 0) min -= span * 0.15;

// ✅ RICHTIG (multiplikativ — proportional zu jeder Seite)
if (max > 0) max *= 1.15;   // +155,4 → +178,7 (15% von 155,4)
if (min < 0) min *= 1.15;   // -2,9 → -3,3 (15% von 2,9)
```

### ⚠️ afterBuildTicks Guardian ist Pflicht!
Chart.js `buildTicks` überschreibt `axis.min`/`axis.max` (gesetzt in `afterDataLimits`) auf Tick-Grenzen. Ohne Guardian gehen eng berechnete Grenzen (z.B. -5) verloren und werden auf die nächste Tick-Grenze gezerrt (z.B. -50 bei step=50).
```javascript
// ✅ RICHTIG (Guardian schützt berechnete Grenzen)
afterBuildTicks: (axis) => {
  if (axis._fwMin == null) return;
  axis.min = axis._fwMin;
  axis.max = axis._fwMax;
  axis.ticks = axis.ticks.filter(t => t.value >= axis._fwMin && t.value <= axis._fwMax);
}
```

### ⚠️ Baseline-Regeln beachten!
```javascript
// Bar Charts: Nulllinie als Anker
if (chartType === 'bar') {
  if (min >= 0) min = 0; // Positive Balken
  if (max <= 0) max = 0; // Negative Balken
}

// Line Charts: Enhanced Magnetic Zero (V2.1.0)
// Duale Schwelle: span-relativ ODER absolut 20% für Prozentwerte
else {
  const spanThreshold = span * 0.15;
  const isPercentLike = ['percent', 'return'].includes(fwContext.valueMode);
  const magnetThreshold = isPercentLike ? Math.max(spanThreshold, 20) : spanThreshold;
  if (min >= 0 && min <= magnetThreshold) min = 0;
  if (max <= 0 && Math.abs(max) <= magnetThreshold) max = 0;
}
```

---

## 13. Testing-Szenarien

Folgende Szenarien müssen getestet werden:

1. **Positive Werte (Bar):** 100 bis 10.000 → Achse beginnt bei 0
2. **Negative Werte (Bar):** -10.000 bis -100 → Achse endet bei 0
3. **Gemischte Werte (Bar):** -5.000 bis +5.000 → Achse umspannt 0
4. **Nur Nullwerte:** 0 bis 0 → Fallback auf 0-100
5. **Ein Datenpunkt (Bar):** Nur 42 → Grace-Buffer verhindert Clipping
6. **Alle ausgeblendet:** Leeres Chart → Fallback auf 0-100
7. **Liniendiagramm nahe Null:** 0,5 bis 3,2 → Magnetische Null schnappt auf 0
8. **Liniendiagramm weit weg von Null:** 98 bis 105 → Smart Window (beginnt bei ~90)
9. **Responsive Wechsel:** Desktop → Tablet → Mobile → Andere Tick-Anzahl & Formatierung
10. **Schnelle Legenden-Klicks:** Keine Race-Conditions oder Flackern
11. **Asymmetrische Daten (Bar):** -2,9% bis +155% → Achse bei -20 bis 180 (nicht -5 oder -200). Minor-Side Clearance expandiert -5 auf -20 (1 Step).
12. **Singlebalken (Bar):** 0 bis 125.000€ → Achse bei 0 bis 140.000 (nicht 160.000)
13. **Multibalken, Assets ausblenden:** max 30% → Achse bei 35 (nicht 40), max 27% → Achse bei 30
14. **Screen-Unabhängigkeit:** Fenster resizen → Y-Achsen-Rahmen (min/max) bleibt identisch
15. **Minor-Side Clearance (Universal, Mixed-Sign):** -2,9% / +155% → min = -20 (nicht -5). Tick bei -20 sichtbar. Gilt für Bar UND Line Charts (V2.2.0).
16. **Richtungs-Filter (Line, positiv):** 88% / 155% → min = 80 (nicht 100). Beide Datenpunkte sichtbar, kein Clipping.
17. **Line Chart, Mixed-Sign (V2.2.0):** -3,5% / +155% → min = -20 (Clearance expandiert -5 auf -20). Nulllinie klar sichtbar, nicht am Canvas-Rand.
18. **Enhanced Magnetic Zero (Line, Prozent, nahe Null):** 3,2% / 4,0% → rawMin=3,2 < 20% Ceiling → min=0. Achse startet bei Null. Tagesgeld-Szenario.
19. **Enhanced Magnetic Zero (Line, Prozent, fern von Null):** 85% / 92% → rawMin=85 > 20% Ceiling → kein Magnet. Achse bleibt eng (Smart Window).
20. **Enhanced Magnetic Zero (Line, alle negativ):** -12% / -88% → rawMax=-12, |-12| < 20% → max=0. Null als obere Referenz sichtbar.
21. **Enhanced Magnetic Zero (Line, Euro, nahe Null):** 5€ / 15€ → Nicht-Prozentwert → nur span-relative Schwelle (span=10, threshold=1,5). rawMin=5 > 1,5 → kein Magnet. Korrekt: 5€ ist NICHT semantisch "nahe Null" für Euro.

---

## 14. Minimum Breathing Room (Minor-Side Clearance)

### 14.1 Problem

In Mixed-Sign-Charts (Daten auf beiden Seiten der Nulllinie) kann die Minor-Side-Grenze weniger als 1 Step von Null entfernt sein. Die Tight-Boundary-Selektion (§6.2 Schritt 5) wählt die engste mathematisch korrekte Grenze, berücksichtigt aber nicht, ob diese Grenze innerhalb des ersten Grid-Felds liegt.

Wenn die Grenze < 1 Step beträgt, wird der einzige Tick im Minor-Bereich (bei -1×step) vom afterBuildTicks-Guardian gefiltert, da er außerhalb [axis.min, axis.max] liegt. Ergebnis: **kein Tick, kein Label, keine Gridline** zwischen Nulllinie und Canvas-Kante.

### 14.2 Regel

**Bedingung:** axis.min < 0 UND axis.max > 0 (alle Chart-Typen, V2.2.0)

**Aktion:**
- Wenn |axis.min| < step → axis.min = −step
- Wenn |axis.max| < step → axis.max = +step

**Gilt für Bar UND Line Charts (V2.2.0):** Die Nulllinie ist bei Finanzdaten der primäre Ankerpunkt (Grenze Gewinn/Verlust). Bei asymmetrischen Line Charts (z.B. -3,5% / +155%) lag die Nulllinie ohne Clearance bei 2,7% der Charthöhe vom Rand — visuell kaum unterscheidbar (Cleveland). Die 7% zusätzliche Fläche für eine klar sichtbare Nulllinie ist kein verschwendetes Data-Ink, sondern Information.

### 14.3 Design-Begründung

| Kriterium | Begründung |
|:----------|:-----------|
| **Warum 1 Step?** | Kleinste bedeutungsvolle Einheit des Grid-Vokabulars. Garantiert genau einen Tick im Minor-Bereich. |
| **Warum nicht 2 Steps?** | Unverhältnismäßig. Zwei leere Grid-Zellen für wenige Prozent Daten. |
| **Warum kein Pixel-Minimum?** | Koppelt Framing an Bildschirmgröße. Widerspricht FRAME_TICKS-Prinzip (V1.9.0). |
| **Warum keine asymmetrischen Steps?** | Ungleichmäßiges Grid suggeriert nichtlineare Skala (Tufte: Lie Factor). |
| **Grid-Alignment** | Step ist immer eine Nice Number → ±step ist immer grid-aligned. |
| **Determinismus** | Step kommt aus FRAME_TICKS=10 (bildschirmunabhängig) → Ergebnis ist deterministisch. |

### 14.4 Nicht-Auslösung

Die Regel triggert **nicht** bei:
- Single-Sign-Charts (nur positiv oder nur negativ) — Bedingung `min < 0 && max > 0` ist false
- Symmetrischen Mixed-Sign-Charts — beide Seiten haben |boundary| ≥ step
- Achsengrenzen von exakt 0 — `_tightBound` gibt 0 für rawValue=0 zurück

### 14.5 Implementierung

```javascript
// Schritt 5.5 in _performDynamicRescaling, nach Tight Boundary Selection:
// Universal für alle Chart-Typen (V2.2.0, vorher bar-only)
if (axis.min < 0 && axis.max > 0) {
    if (Math.abs(axis.min) < step) axis.min = -step;
    if (Math.abs(axis.max) < step) axis.max = step;
}
```

### 14.6 Referenzfall

**Daten:** test_data.csv, 1J Bar, alle Assets. Bitcoin +155,4%, Anleihen -2,9%.

| Schritt | Wert |
|:--------|:-----|
| rawMin / rawMax | -2,9 / +155,4 |
| gracedMin / gracedMax | -3,34 / +178,7 |
| step (FRAME_TICKS=10) | 20 |
| Tight Bound min | -5 (niceNumRaw, 72% Atemraum) |
| Tight Bound max | 180 (gridSnapGraced, 16% Atemraum) |
| **Clearance Check min** | **|-5| = 5 < step = 20 → min = -20** |
| Clearance Check max | |180| = 180 > step = 20 → keine Änderung |
| **Endergebnis** | **-20 / 180** |
| Ticks | -20, 0, 20, 40, ..., 160, 180 |

---

**Nächster Schritt:** Integration und Testing mit realen Chart-Daten. Bei Problemen: Prüfe zunächst, ob `axis._fwMin`/`axis._fwMax` korrekt gesetzt werden (Console-Log im Hook) und ob der `afterBuildTicks` Guardian aktiv ist.
