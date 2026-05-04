# Dokumentation: Die Bändigung der X-Achse (Version 33.1.0)

Dieses Dokument beschreibt die Lösung des „Viewport-Clipping-Problems“ und der „Tick-Synchronisation“ in der Finanzwesir Bar-Chart-Engine.

---

## Teil 1: Die Sendung mit der Maus – Wie der Chart seinen Teppich bekam

Das hier ist unser Balkendiagramm. Es zeigt uns, wie viel Geld wir in verschiedenen Jahren gesichert haben. Jeder Balken steht für ein Jahr.

**Das Problem:**
Stell dir vor, der Balken ist wie ein kleiner Mensch, der auf einem gelben Teppich steht. Der Teppich ist die „X-Achse“. Bisher war der Teppich aber ganz genau so zugeschnitten, dass die Füße der Menschen exakt auf der Kante standen. 
* Wenn der Mensch aber dicke Winterschuhe anhatte (das sind unsere breiten Balken auf einem 4K-Monitor), dann hingen die Schuhe links und rechts über den Teppich rüber.
* Links standen sie dann auf den Zahlen (der Y-Achse) und man konnte nichts mehr lesen.
* Rechts hingen sie in der Luft und wurden einfach abgeschnitten. Das sah kaputt aus.

**Die Lösung:**
Wir haben nicht einfach die Menschen verschoben. Wir haben den Teppich größer gemacht! 
1. Zuerst messen wir mit einem Lineal, wie breit die Schuhe (Balken) in Wirklichkeit sind.
2. Dann sagen wir dem Teppich (der Achse): „Bitte rolle dich links und rechts noch ein Stückchen weiter aus!“
3. Damit der Teppich nicht einfach wieder zurückrollt, haben wir ihn mit Spezial-Nägeln (`_userMin` und `_userMax`) am Boden festgetackert.

Jetzt stehen alle Balken sicher und gemütlich auf ihrem gelben Teppich. Nichts wird mehr abgeschnitten, und die Zahlen an der Seite haben genug Platz zum Atmen. Klingt komisch, ist aber so!

---

## Teil 2: Die Profi-Blaupause – Reverse Engineering der Geometrie-Engine

Diese Sektion ist für Entwickler und LLMs konzipiert, um das System von Grund auf zu rekonstruieren.

### 1. Die Kern-Herausforderung (Problemstellung)
Standard-Chart-Bibliotheken zentrieren Balken auf einem Datenpunkt. Wenn dieser Datenpunkt exakt auf dem Achsen-Minimum (`axis.min`) liegt, ragt die linke Hälfte der Balken-Geometrie ($50\% \text{ barWidth}$) in den Padding-Bereich (Viewport-Bleeding).
* **Regression-Gefahr:** Statisches `layout.padding` führt bei Chart.js zu unvorhersehbarem Tick-Rounding (das „1999-Problem“), da die Engine versucht, die Achse auf „schöne“ Werte zu runden, um Platz zu schaffen.

### 2. Die Architektur-Säulen

#### A. Semantische Normalisierung (Vertical Truth)
Die Datenpunkte werden auf den **Periodenbeginn (BOP - Beginning of Period)** normiert. Die Ticks werden jedoch auf den **Perioden-Midpoint** gesetzt.
* **Code-Anker:** `FwDateUtils.getBopAnchor()` für die Daten, `FwDateUtils.getPeriodMidpoint()` für die Ticks.
* **Ergebnis:** Der Balken ist optisch perfekt über dem Jahr zentriert, obwohl er technisch am 01.01. startet.

#### B. Dynamische Sensorik (The Geometry Hook)
Anstatt statische Pixelwerte zu nutzen, misst ein Plugin (`beforeUpdate`) in jedem Frame die reale Pixel-Situation:
1. Berechnung der `slotWidth` (Verfügbare Breite / Anzahl Balken).
2. Berechnung der `halfBarPixel` unter Berücksichtigung von `categoryPercentage` und `barPercentage`.
3. Speicherung dieser Werte im internen Chart-Objekt (`chart._fwGeometry`).



#### C. Die Achsen-Expansion (The afterFit Hack)
Der entscheidende Eingriff erfolgt im `afterFit`-Hook der X-Achse. Hier wird der Viewport mathematisch gedehnt:
1. **Konvertierung:** Pixel werden via `msPerPixel` (Interpolation) in Zeit-Millisekunden umgerechnet.
2. **Expansion:** Die Achsengrenzen werden erweitert:
   $$axis.min = dataMin - (halfBarPixel \cdot msPerPixel \cdot 1.5)$$
   $$axis.max = dataMax + (halfBarPixel \cdot msPerPixel \cdot 1.5)$$
3. **The Lock:** Um das automatische Resnap-Verhalten von Chart.js zu unterbinden, werden die internen Flags `_userMin = true` und `_userMax = true` gesetzt. Dies zwingt die Engine, exakt unseren berechneten (unrunden) Viewport zu nutzen.

### 3. Kochrezept für den Nachbau

1. **Daten-Transformation:**
   - Erstelle ein `fwContext`-Objekt, das den Rhythmus und die `dataRange` (echtes Min/Max der Daten) speichert.
   - Sichere das Original-Datum (EOP) in jedem Datenpunkt unter `_originalDate` ab, um Tooltip-Regressionen zu vermeiden.

2. **Layout-Plugin implementieren:**
   - In `beforeUpdate`: Messe `yAxis.width` und berechne `halfBarPixel`.
   - Setze `layout.padding.left` auf `yWidth + Puffer`, um die Beschriftung zu schützen.

3. **X-Achsen Spezialisierung:**
   - Implementiere `afterFit`: Berechne die zeitliche Dehnung basierend auf den Pixeln aus Schritt 2.
   - Nutze einen Sicherheitsfaktor von **1.5**, um Aliasing-Effekte und optisches „Kleben“ am Rand zu verhindern.
   - Implementiere `afterBuildTicks`: Filtere alle Ticks, die außerhalb des `fwContext.dataRange` liegen (Ghost-Guard), aber zentriere sie auf den Midpoints.

4. **Tooltip-Synchronisation:**
   - Setze `mode: 'index'` und `intersect: false`.
   - In den Callbacks: Greife immer auf `item.raw._originalDate` zu, niemals auf den (verschobenen) technischen X-Wert der Achse.

### 4. Ausschluss von Seiten- und Quereffekten (QA-Protokoll)
- **4K-Stabilität:** Durch die Zeit-zu-Pixel-Interpolation in `afterFit` skaliert der Puffer linear mit der Auflösung.
- **Ghosting-Schutz:** Der Abgleich gegen `fwContext.dataRange` im Tick-Generator und im Debugger verhindert, dass Daten aus dem „Off“ in den sichtbaren Bereich rücken.
- **Theme-Integrität:** Schriften werden via `FwLayoutRules` injiziert, damit Tooltips und Achsen synchron skalieren.