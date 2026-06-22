Dieses Dokument dient als ultimative Referenz für die geometrische Architektur der Finanzwesir Chart-Engine. Es fixiert den Wissensstand nach der erfolgreichen Lösung des Viewport-Clipping-Problems und dient als Blaupause für zukünftige Entwicklungen oder Re-Engineering-Prozesse.

---

# 🏛️ Technical Wiki: High-Precision X-Axis Architecture (V33.1.0)

**Status:** Final Production Release

**Versionen:** Strategy V33.1.0 | Axis V4.9.0 | Tooltips V3.2.0 | Utils V4.4.0

**Kernziel:** 100% visuelle Integrität auf High-Resolution-Displays (4K) bei gleichzeitiger Wahrung der semantischen Daten-Wahrheit.

> **Status nach B1-AP-14e12 (2026-06-22): Historische Designintention / nicht aktueller Implementierungsvertrag**
>
> Dieses Dokument bleibt als Design- und Entstehungsdokument erhalten.
> Es ist aber nicht mehr vollständig deckungsgleich mit dem aktuellen Implementierungsstand der ChartEngine.
>
> Für Chart.js-Plugins gilt jetzt vorrangig:
>
> - `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`
> - `docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md`
>
> Insbesondere gilt:
>
> - `FwBarLayoutPlugin` ist entfernt.
> - `chart._fwGeometry` ist kein aktiver Kommunikationskanal.
> - `Chart.register()` ist in der Finanzwesir-ChartEngine nicht architekturkonform.
> - Plugin-Implementierungen liegen unter `Theme/assets/js/fw-chart-engine/plugins/`.
> - Aktive Plugins werden über `plugins/index.js` importiert.
>
> Reaktivierung alter Mechanismen nur über eigenen Design-AP.
>
> Die Aussagen zu `FwBarLayoutPlugin` und `_fwGeometry` beschreiben die frühere Designidee.
> Der aktuelle Code nutzt diese Architektur nicht.
> `FwBarLayoutPlugin` wurde in AP-14e8 nach Dead-State-Nachweis entfernt.

---

## 1. Das Konzept (Executive Summary / ELI5)

Um das Problem der abgeschnittenen Balken an den Rändern zu lösen, haben wir das Prinzip des **„Dynamischen Teppichs“** eingeführt.

* **Die Analogie:** Ein Balken ist wie ein Wanderer auf einem Teppich (der Achse). Sind die Schuhe (Balkenbreite) zu breit, stehen sie über den Teppichrand hinaus. Links verdecken sie die Beschriftung, rechts hängen sie im „Nichts“ und werden abgeschnitten.
* **Die Lösung:** Anstatt die Balken zu verkleinern, messen wir ihre Breite in Echtzeit und rollen den Teppich (die Achse) exakt so weit aus, dass jeder Balken sicher darauf steht. Mit Spezial-Fixierungen (`_userMin/Max`) verhindern wir, dass der Teppich wieder zurückrollt.

---

## 2. Die Problem-Analyse (Root Cause)

Mainstream-Entwickler nutzen oft `layout.padding`, um Platz am Rand zu schaffen. Bei Finanz-Zeitachsen führt dies jedoch zum **„1999-Fehler“**:

1. Die Engine erkennt das Padding.
2. Die interne „Nice-Numbers“-Logik versucht, die Achse auf „schöne“ Werte zu runden.
3. Das Startjahr springt von 2000 auf 1999 zurück, um den Pufferraum zu füllen.
4. **Ergebnis:** Die visuelle Synchronisation zwischen Balken und Label bricht zusammen.

---

## 3. Die Architektur-Säulen (Technical Blueprint)

### A. BOP-Anchoring (Vertical Truth)

Datenpunkte werden strikt auf den **Beginning of Period (BOP)** normiert (z.B. 01.01. 12:00 UTC). Dies ist der technische Anker. Die optische Zentrierung erfolgt separat über die Verschiebung der Labels auf den Midpoint.

### B. Dynamische Geometrie-Sensorik

Ein dediziertes Plugin (`FwBarLayoutPlugin`) misst in der `beforeUpdate`-Phase die physische Realität auf dem Monitor:

* Berechnung der `slotWidth` (Gesamtbreite / Anzahl Balken).
* Ermittlung der `halfBarPixel` unter Einbeziehung von `categoryPercentage` (0.8) und `barPercentage` (0.9).
* Diese Werte werden als `_fwGeometry` an die Achse übergeben.

### C. Koordinatenraum-Dilation (`afterFit`)

In der `afterFit`-Phase der X-Achse wird der Koordinatenraum physikalisch gedehnt:

1. **Konvertierung:** Pixelwerte werden in Millisekunden umgerechnet.
2. **Expansion:** Anwendung des **1.5 Sicherheitsfaktors** (50% extra Puffer zur Balkenkante).
3. **User-Lock:** Manuelle Fixierung der Grenzen via `axis._userMin = true` und `axis._userMax = true`. Dies übersteuert die Standard-Rundungslogik der Bibliothek.

---

## 4. Methodik & Qualitäts-Sicherung

### Via Negativa (Weglassen von Komplexität)

Wir lösen das Layout-Problem nicht durch komplexe CSS-Verschiebungen oder Padding-Hacks, sondern durch die Beseitigung der Layout-Autonomie des Browsers. Wir diktieren die Geometrie.

### Invert, always invert (Charlie Munger)

Anstatt zu fragen: „Wie zentriere ich den Balken?“, fragten wir: „Was darf unter keinen Umständen passieren?“

* *Antwort:* Der Balken darf niemals die `chartArea`-Grenze berühren.
* *Lösung:* Wir definieren die Grenze dynamisch basierend auf der Balkenbreite.

### Occam’s Razor (Die einfachste Lösung)

Die stabilste Lösung ist diejenige, die nur eine einzige Variable (`halfBarPixel`) nutzt, um sowohl das Padding der Y-Achse als auch die Dehnung der X-Achse zu steuern.

---

## 5. Handling von Datendichten (Rhythmus-Stabilität)

Das System ist so gebaut, dass es sich jedem Daten-Rhythmus anpasst:

* **Yearly:** Breite Balken triggern eine massive Achsendehnung.
* **Daily:** Schmale Balken triggern eine minimale Dehnung.
* **Ghost-Guard:** In `afterBuildTicks` werden Ticks außerhalb der `fwContext.dataRange` unterdrückt, um trotz breiter Achse keine Beschriftungen in „leeren“ Bereichen anzuzeigen.

---

## 6. Kochrezept für Re-Engineering

Wenn das System in einer neuen Umgebung nachgebaut werden muss:

1. **Normalisiere** alle Zeitstempel auf BOP (UTC).
2. **Messe** die Balkenbreite in Pixeln vor dem Render-Vorgang.
3. **Erweitere** `axis.min` und `axis.max` um `halfBarPixel * 1.5` (konvertiert in ms).
4. **Setze** den `_userMin/Max` Lock.
5. **Validiere** Tooltips gegen das weggesicherte `_originalDate` (EOP), um die CSV-Wahrheit beizubehalten.

---


Diese Ergänzung vervollständigt das technische Wiki. Wir behandeln hier die „Grenzbereiche“ der Geometrie – jene Momente, in denen Standard-Algorithmen normalerweise versagen, weil ihnen die mathematische Basis (z. B. ein zweiter Datenpunkt) fehlt.

---

## Addendum: Edge-Case-Management & Geometrische Grenzwerte

### 1. Der „Einsame Wanderer“ (Ein einziger Datenpunkt)

**Die Sendung mit der Maus:**
Was passiert, wenn wir nur einen einzigen Balken haben? Normalerweise braucht der Computer zwei Punkte, um zu wissen, wie breit der Teppich sein soll. Wenn nur einer da ist, weiß der Computer nicht: „Bin ich im Jahr 2026 oder im Weltall?“

* **Unsere Lösung:** Wir tun so, als gäbe es einen unsichtbaren Nachbarn. Wir rollen den Teppich einfach ein halbes „Phantombild“ nach links und rechts aus. So steht auch der einsame Balken genau in der Mitte und sieht nicht verloren aus.

**Die Profi-Blaupause (Elite Logic):**
Ein einzelner Punkt erzeugt eine Differenz von  Millisekunden. Dies führt bei der Division in der `msPerPixel`-Berechnung zu einem `Infinity`-Fehler.

* **Inversion (Munger):** Was darf nicht passieren? Der Chart darf nicht abstürzen oder eine leere Fläche zeigen.
* **Lösung:** In `FwDateUtils.detectRhythm` und der `afterFit`-Logik implementieren wir einen **Virtual Rhythm Fallback**. Wenn `data.length === 1`, setzen wir eine künstliche Achsendehnung von  Einheiten des erkannten Rhythmus (z. B.  Monate bei `YEARLY`).
* **Occam’s Razor:** Anstatt eine Sonderlogik für Einzelsegmente zu bauen, geben wir der bestehenden Expansionsformel einfach einen Standardwert für `msPerPixel` vor, falls die `axis.width` oder `data.length` keine valide Berechnung zulässt.

---

### 2. Die „Nulllinie“ (Daten mit Wert 0)

**Die Sendung mit der Maus:**
Manchmal haben wir in einem Jahr gar nichts gespart. Der Wert ist Null. Der Balken ist also unsichtbar.

* **Das Problem:** Wenn alle Balken Null sind, weiß die Y-Achse nicht, wo oben und unten ist. Sie sackt in sich zusammen wie ein leerer Luftballon.
* **Unsere Lösung:** Wir geben der Achse ein „Mindestmaß“. Sie muss immer von -1 bis +1 zeigen, auch wenn alles Null ist. So bleibt das Spielfeld stabil und zittert nicht.

**Die Profi-Blaupause (Elite Logic):**
Wenn `minY` und `maxY` identisch sind (beide 0), kollabiert die Y-Achse.

* **Via Negativa:** Wir entfernen die Unsicherheit durch einen `Grace`-Faktor in der `FwSmartScales.getSmartYAxis`.
* **Implementierung:** Wir erzwingen einen symmetrischen Viewport um die Nulllinie. Dies verhindert „Springen“ beim Umschalten zwischen Assets, die teilweise keine Daten für den gewählten Zeitraum haben.

---

### 3. Der „Zeit-Sprung“ (Große Datenlücken)

**Die Profi-Blaupause (Elite Logic):**
Was passiert, wenn wir Daten für 2020 haben und dann erst wieder für 2025?

* **Mainstream-Ansicht:** Chart.js würde eine riesige Lücke zeichnen und versuchen, 2021, 2022 etc. zu beschriften.
* **Unser „Ghost-Guard“-Ansatz:** Da wir `bounds: 'data'` verwenden und unsere `afterBuildTicks`-Logik die Ticks gegen die tatsächlichen Datenpunkte validiert, werden keine Ticks für die „leeren Jahre“ generiert.
* **Geometrie-Fix:** Der Sicherheitsfaktor von **1.5** sorgt dafür, dass auch bei großen Lücken der erste Balken (2020) und der letzte Balken (2025) ihre Pufferzonen behalten, ohne dass die Achse dazwischen „ausleiert“.

---

### 4. Das „Asymmetrie-Risiko“ (Sehr unterschiedliche Balkenhöhen)

**Der Teufelsadvokat (Devil's Advocate):**
„Wenn ein Balken 1 Million ist und der andere 1 Euro, wird dann der kleine Balken durch die Achsendehnung nicht unsichtbar?“

* **Gegenargument:** Nein, da die X-Achsen-Dehnung (Zeit) mathematisch vollkommen entkoppelt ist von der Y-Achsen-Skalierung (Wert). Unser **User-Lock** auf der X-Achse garantiert, dass die horizontale Symmetrie gewahrt bleibt, egal wie extrem die vertikalen Ausschläge sind.

---

### Zusammenfassung der Edge-Case-Parameter

| Edge-Case | Strategie | Technischer Hook |
| --- | --- | --- |
| **Einzelpunkt** | Virtual Rhythm Expansion | `afterFit` Fallback |
| **All-Zero Data** | Min-Max Floor Allocation | `SmartYAxis` Config |
| **Zeitlücken** | Tick-Filtering & Data-Bounds | `afterBuildTicks` |
| **4K Ultrawide** | Linear Pixel-to-MS Mapping | `_fwGeometry` Sensor |

---

