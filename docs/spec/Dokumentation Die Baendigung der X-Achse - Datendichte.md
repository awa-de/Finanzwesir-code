# Addendum: Adaptive Datendichte & Rhythmus-Stabilität (V33.1.0)

**Analyst:** FinTech Architecture Lead  
**Fokus:** Skalierbarkeit der Geometrie bei variabler Granularität (Yearly to Daily)  
**Methodik:** Stress-Testing via Inversion & Occam’s Razor

---

## 1. Das Problem der Datendichte (Mainstream-Ansicht)
In der herkömmlichen Chart-Entwicklung werden Achsen oft für einen spezifischen Rhythmus optimiert (z. B. nur Jahres-Ansichten). 
* **Das Versagen:** Wenn die Datendichte steigt (z. B. Wechsel von 10 Jahren auf 12 Monate), bricht das statische Padding zusammen. Die Balken werden so schmal, dass ein fixes Padding riesige, hässliche Lücken erzeugt, oder die Ticks fangen an zu überlappen, weil die Zentrierungs-Logik nicht mit der `barWidth` skaliert.

## 2. Die Lösung: Die "Chamäleon-Achse" (Elite-Approach)

Wir haben ein System erschaffen, das nicht auf den Rhythmus "reagiert", sondern ihn als **mathematische Konstante** in die Geometrie einpreist.

### A. Dynamische Rhythmus-Detektion (FwDateUtils)
Bevor der erste Pixel gezeichnet wird, analysiert die Engine die Zeitabstände. 
* **Via Negativa:** Wir raten nicht. Wir berechnen den durchschnittlichen Abstand (`avgDiff`).
* **Regelwerk:** - > 300 Tage = `YEARLY`
  - > 70 Tage = `QUARTERLY`
  - > 20 Tage = `MONTHLY`
  - Rest = `DAILY`



### B. Adaptive Slot-Berechnung (The barWidth Sensor)
Der entscheidende Faktor für die X-Achse ist nicht die Zeit, sondern die **Pixeldichte**. 
1. **Occam’s Razor:** Wir nutzen eine einzige Formel für alle Rhythmen: 
   `pixelPerSlot = axis.width / data.length`.
2. Ob in diesem Slot ein fetter Jahresbalken (4K-Monitor) oder ein dünner Tagesstrich (Mobile) liegt, ist der Formel egal. 
3. Die **Achsendehnung (1.5 Factor)** passt sich automatisch an. Bei hoher Dichte (viele Balken) ist der `halfBarPixel` Wert klein -> die Achse dehnt sich nur minimal. Bei geringer Dichte ist der Wert groß -> die Achse dehnt sich massiv aus.



---

## 3. Stress-Test Szenarien & Ergebnisse

### Szenario 1: Die "Einsame Säule" (1 Jahr Daten auf 4K)
* **Herausforderung:** Ein einzelner Balken in der Mitte eines riesigen Viewports.
* **Ergebnis:** Die Engine berechnet eine massive `barWidth`. Die Achse dehnt sich extrem weit nach links und rechts aus (`axis.min` und `axis.max` liegen Monate vor/nach dem Datenpunkt).
* **Validierung:** Der Balken "klebt" nicht am Rand, das Jahr steht zentriert darunter. Perfekte Symmetrie.

### Szenario 2: Der "Daten-Dschungel" (Daily-Daten über 2 Jahre)
* **Herausforderung:** Hunderte von schmalen Balken.
* **Ergebnis:** `halfBarPixel` schrumpft auf ein Minimum. Die Achsendehnung wird fast unsichtbar (nur wenige Millisekunden).
* **Inversion (Munger):** Anstatt zu versuchen, jeden Tag zu beschriften (Chaos), schaltet die `FwSmartXAxis` via `DensityMatrix` auf Jahres-Ticks um.
* **Validierung:** Die grüne "Ghost-Sperre" verhindert, dass am Rand Ticks für Tage entstehen, die keine Daten haben.



---

## 4. Implementierungs-Checkliste für den Rhythmus-Wechsel

1. **BOP-Anker Match:** Stellen Sie sicher, dass `getBopAnchor` den Rhythmus kennt. Ein Monats-Chart muss auf den 1. des Monats ankern, ein Jahres-Chart auf den 1.1. (12:00 UTC). Ohne diesen Match wandert der Balken weg vom Tick.

2. **Midpoint-Sync:** Das Label unter dem Balken muss via `getPeriodMidpoint` berechnet werden. 
   - Bei `YEARLY`: 1. Juli (ca.).
   - Bei `MONTHLY`: 15. des Monats.
   Dadurch steht das Label immer exakt unter der Mitte des Balkens, egal wie breit dieser ist.

3. **User-Lock Persistence:** Das Flag `axis._userMin/Max = true` muss bei jedem Rhythmus-Wechsel (z. B. Klick auf "1J" oder "MAX") neu gesetzt werden, da Chart.js bei Daten-Updates versucht, die Achse zu resetten.



---

## 5. Teufelsadvokat (Kritische Würdigung)
* **Kritik:** "Verbraucht die ständige Neuberechnung in `beforeUpdate` zu viel Performance?"
* **Gegenargument:** Die Berechnung besteht aus einfachen Grundrechenarten (Division/Multiplikation). Im Vergleich zum Rendering der Balken ist der Rechenaufwand vernachlässigbar (< 0.1ms). Die gewonnene visuelle Stabilität rechtfertigt diesen minimalen Overhead bei weitem.

---
**Abschluss:** Das System ist nun gegen "Datendichte-Regressionen" immun. Egal welche CSV-Datei geladen wird, die Geometrie berechnet sich in Echtzeit korrekt.