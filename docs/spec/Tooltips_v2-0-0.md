# 📄 SPEZIFIKATION: Information Systems & Interaction (The Service Contract)

**Projekt:** Finanzwesir Chart Engine  
**Modul:** Core / Interaction & Information  
**Datei:** `docs/spec/Information_Systems_v2.0.md`  
**Version:** **2.0.0 (The Complete Development Chronicle)**  
**Datum:** 23.01.2026  
**Status:** **BINDING / ARCHITECTURAL GOLD STANDARD**  
**Implementierung:** `core/FwSmartTooltips.js`, `core/FwDateUtils.js`, `strategies/BarChartStrategy.js`, `strategies/LineChartStrategy.js`

---

## 1. Executive Summary: Das Geschwister-Modell

Diese Spezifikation beendet das Zeitalter der "impliziten Defaults". In der Finanzwesir Chart Engine sind alle Chart-Typen (Line, Bar, Pie) **gleichberechtigte Geschwister**.

Jede Strategie muss beim Schnüren des **Rucksacks (fwContext)** explizit deklarieren, welches Informations-System sie zur Vermittlung von Details nutzt. Diese Version dokumentiert die vollständige Entwicklungsgeschichte, alle gefixten Regressionen und die Entscheidungsgrundlagen.

---

## 2. Der Rucksack-Vertrag (The Subscription Protocol)

Der `fwContext` dient als offizieller Vertrag zwischen der Strategie (Layer 3) und den Core-Services (Layer 4).

### 2.1 Deklaration des Info-Systems

Jede Strategie muss das Feld `infoSystem` befüllen:

```javascript
fwContext = {
    // Welches System liefert die Detail-Information?
    infoSystem: 'TOOLTIP' | 'CENTER_TEXT' | 'NONE',
    
    // Steuerungs-Parameter für das gewählte System
    tooltipLayout: 'SINGLE' | 'COMPARE' | 'NONE',
    
    // Metadaten (identisch für alle Geschwister)
    chartType: 'bar' | 'line' | 'pie',
    rhythm: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY',
    viewMode: 'history' | 'ranking',
    valueMode: 'value' | 'percent',
    currency: 'EUR' | 'USD' | 'PERCENT',
    dateSemantics: 'PERIOD'
}
```

---

## 3. Die Service-Matrix (Ebene der Geschwister)

| Strategie | Primäres Info-System | Begründung |
| :--- | :--- | :--- |
| **LineChart** | TOOLTIP | Zeitreihen erfordern Vergleich an X-Koordinate. |
| **BarChart** | TOOLTIP | Balken-Fokus erfordert Detail-Popups. |
| **PieChart** | CENTER_TEXT | Polare Daten nutzen den Donut-Kern; Tooltip wird abgemeldet. |

---

## 4. The Deterministic Format Matrix (Header Strategy)

Anstatt auf Heuristiken zu vertrauen, nutzt der Tooltip eine strikte Wahrheitstabelle. Diese definiert deterministisch, wie der Header basierend auf dem Daten-Rhythmus und der Bildschirmgröße formatiert wird.

### 4.1 Zone Definitions (Physical Constraints)

| Zone | Code | Breite | Strategie |
| :--- | :--- | :--- | :--- |
| **S (Mobile)** | `isMobile` | < 450px | Survival: Aggressive Ausdünnung. Vermeidung von Zeilenumbrüchen und Occlusion (Finger verdeckt Tooltip). |
| **M (Tablet)** | `width < 900` | 450–899px | Hybrid: Hohe Dichte, aber zwingend kurze Texte (Touch-First). |
| **L (Desktop)** | `else` | ≥ 900px | Aesthetics: Hohe Dichte, höfliche Langtexte (Mouse-First). |

### 4.2 Format Lookup Table (The Law)

Diese Tabelle ist bindend. Abweichungen sind Bugs.

| Daten-Rhythmus | Zone S/M (Touch) | Zone L (Desktop) | Beispiel (S / L) | Begründung |
| :--- | :--- | :--- | :--- | :--- |
| **DAILY** | `DD. MMM 'YY` | `Weekday, DD. MMMM YYYY` | 12. Jan '24 / Fr, 12. Januar 2024 | Mobile: Alphanumerik bricht "Zahlensalat" auf. Desktop: Wochentag für Kontext. |
| **WEEKLY** | `DD.MM.–DD.MM.` | `Woche vom DD. – DD. MMMM YYYY` | 12.01.–18.01. / Woche vom 12. – 18. Januar 2024 | Range-Logik: Keine Ambiguität durch "KW". Wir zeigen physikalische Grenzen. |
| **MONTHLY** | `MMM 'YY` | `MMMM YYYY` | Jan '24 / Januar 2024 | Standard. |
| **QUARTERLY** | `MMM 'YY` | `MMMM YYYY` | Mrz '24 / März 2024 | No-Q-Policy: Wir zeigen den Bewertungs-Monat (März, Juni…), keine abstrakten "Q1" Labels. |
| **HALF_YEARLY** | `MMM 'YY` | `MMMM YYYY` | Jun '24 / Juni 2024 | No-Q-Policy konsequent: Monat zeigen, nicht "1. Halbjahr". Identisch mit MONTHLY/QUARTERLY. |
| **YEARLY** | `YYYY` | `YYYY` | 2024 / 2024 | Minimalismus. |
| **NONE (Pie)** | Asset-Name | Asset-Name | Gold / Gold | Fallback. |

### 4.3 Architectural Rules (The Virtual Accessor)

Um die Matrix sauber umzusetzen, gilt folgende Architektur-Richtlinie für Weekly Ranges:

* **Keine Daten-Redundanz:** Das Enddatum einer Woche wird nicht in der Datenstruktur (Layer 3) gespeichert.
* **Logic Separation:** Die Berechnung (StartDatum + 6 Tage) erfolgt ausschließlich in `FwDateUtils` (Layer 2).
* **Dumb View:** Der Tooltip-Service (Layer 4) rechnet nicht. Er übergibt nur Startdatum + Rhythmus an die Utils und rendert den String.

---

## 5. Das "Smart Tooltip" System (Abo-Pflicht)

Der `FwSmartTooltips`-Service agiert nicht mehr als autonomer Diktator, sondern als gehorsamer Dienstleister.

* **Explicit Opt-In:** Der Service wird nur aktiv, wenn `infoSystem === 'TOOLTIP'` im Rucksack steht.
* **Library Veto:** Meldet eine Strategie `infoSystem: 'CENTER_TEXT'` oder `'NONE'`, unterdrückt die Engine jegliche automatische "Hilfsbereitschaft" von Chart.js bezüglich Tooltips.

---

## 6. Smart Redundancy & Pill-Reaktivität (Layer 4)

Dieses Kapitel definiert den Schutz vor kognitiver Überlastung durch die Vermeidung von redundanten Informationen im Tooltip. Es wird zwischen zwei Szenarien unterschieden:

### 6.1 Dynamische Redundanz (Pill-Sensitivität)

Gilt für alle Strategien, die das System TOOLTIP abonniert haben (z. B. LineChart, BarChart History):

* **Regel:** Der Service zählt zur Laufzeit die sichtbaren Assets (`!ds.hidden`).
* **Dynamisches Veto:** Wenn nur noch **1 Asset** sichtbar ist, wird das Label (z. B. "World:") im Tooltip unterdrückt, auch wenn der Rucksack initial `COMPARE` bestellt hat.

### 6.2 Strukturelle Redundanz (Ranking-Mode Verbot)

Speziell für das BarChart im Ranking-Modus (Asset-View), um die "Doublette" zu verhindern:

* **Kontext:** Im Ranking-Modus entspricht das Dataset-Label bereits der zeitlichen Einordnung (z. B. "Dezember 2026").
* **Die "No-Doublette" Regel:** Da diese Information bereits deterministisch im **Header** (Zeile 1 fett) steht, ist das Label in der Wertzeile (Zeile 2) zu 100% redundant.
* **Striktes Veto:** Wenn `fwContext.viewMode === 'ranking'`, muss das Label in der Wertzeile zwingend unterdrückt werden.
* **Ergebnis:**
  * Zeile 1 (Header): **Dezember 2026**
  * Zeile 2 (Wert): **10,00 €** (Kein erneutes "Dezember 2026:" vor dem Wert)

**Warum explizit dokumentiert:**
Professionelle Technical Writer (Google/Amazon) verlassen sich nie auf implizite Logik, sondern arbeiten mit expliziten Invarianten und Context-Specific Constraints. Diese Regel verhindert, dass LLMs oder Entwickler die "Doublette" versehentlich reproduzieren.

---

## 7. Implementierungs-Anweisung (The "Hard-Contract" Gatekeeper)

### 7.1 Der Gatekeeper-Check (in FwSmartTooltips.js)

```javascript
static configure(fwContext, styleConfig) {
    if (fwContext.infoSystem !== 'TOOLTIP') {
        return { enabled: false }; 
    }
    // ... Matrix-Lookup starten
}
```

### 7.2 Matrix-Implementation (in FwSmartTooltips.js)

Der Service darf keine eigenen if/else Kaskaden für Formate enthalten. Er muss:

1. `fwContext.rhythm` lesen.
2. `isMobile` prüfen (Zonen-Erkennung: chart.width).
3. Das Format aus der Konstanten-Tabelle lesen.
4. An `FwDateUtils.formatTooltipDate(timestamp, rhythm, zone)` delegieren.

### 7.3 Dynamischer Interaction-Mode

```javascript
// Tooltip-Service entscheidet basierend auf viewMode
mode: fwContext.viewMode === 'ranking' ? 'nearest' : 'index',
intersect: fwContext.viewMode === 'ranking',
```

**Ranking-Modus:** Balken-Fokus (`nearest`) für Einzelbalken-Tooltips  
**History-Modus:** Vergleichs-Fokus (`index`) für alle Assets an einer X-Koordinate

### 7.4 Redundanz-Management im Label-Callback

```javascript
label: (context) => {
    const value = context.parsed.y;
    const label = context.dataset.label || '';
    if (value === null || value === undefined) return '';
    
    // A. Pill-Sensitivität (Regel 6.1)
    const visibleDatasets = context.chart.data.datasets.filter(ds => !ds.hidden).length;
    
    // B. Strukturelles Veto (Regel 6.2)
    const isRanking = fwContext.viewMode === 'ranking';
    
    const formattedValue = value.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const unit = fwContext.valueMode === 'percent' ? '%' : ' €';
    
    // REDUNDANZ-CHECK: Label unterdrücken bei:
    // 1. Ranking-Modus (Datum steht im Header)
    // 2. Nur 1 Asset sichtbar (Info durch Pills bekannt)
    if (isRanking || visibleDatasets <= 1) {
        return `${formattedValue}${unit}`;
    }
    return `${label}: ${formattedValue}${unit}`;
}
```

---

## 8. Entwicklungsgeschichte: Gefixte Regressionen

### 8.1 Regression: "Listen-Monster" vs. Balken-Fokus (Screenshot 1)

**Problem:**
- Tooltip zeigte endlose Liste von Monaten für ein Asset
- Statt Einzelbalken-Fokus: Kategorie-Fokus

**Root Cause:**
- Hard-codiert `mode: 'index'` sammelt alle Datenpunkte unter einer Kategorie
- Im Ranking-View führt das zur Katastrophe: alle Zeitpunkte eines Assets gleichzeitig

**Verstoß:**
- Section 3: BarChart soll "Balken-Fokus" haben, nicht Kategorie-Fokus
- Section 6: Kognitive Entlastung - Liste von 12+ Werten ist das Gegenteil

**Lösung:**
Dynamischer mode-Switch basierend auf viewMode

### 8.2 Regression: Pill-Reaktivität fehlt (Screenshot 2)

**Problem:**
- Label "50/50: 85.964,36 €" obwohl nur 1 Asset sichtbar
- Information bereits durch Pill bekannt → kognitive Redundanz

**Verstoß:**
- Section 6.1: Smart Redundancy fordert Label-Unterdrückung bei 1 Asset

**Lösung:**
Zählen der visibleDatasets, Label nur bei >1 anzeigen

### 8.3 Regression: No-Q-Policy Verstoß (Screenshot 3)

**Problem:**
- "31.03.2023" statt "März 2023" bei QUARTERLY
- Numerisches Datum statt Monatsname

**Verstoß:**
- Section 4.2: QUARTERLY muss Monatsnamen zeigen, keine Q1-Labels oder numerische Daten
- Deterministische Matrix ignoriert

**Lösung:**
Strikte Matrix-Implementation in FwDateUtils mit Zone-Aware Formatting

### 8.4 Regression: Balken-Sichtbarkeit im Ranking-Modus

**Problem:**
- Nach Objekt-Switch (Number → Object) verschwanden Balken
- X-Achse korrekt beschriftet, aber keine Balken sichtbar

**Root Cause:**
- Chart.js Auto-Index funktioniert nur für Numbers: `[100, 200, 300]`
- Bei Objekten `{y: val, _originalDate: ts}` fehlt explizite X-Koordinate
- Date(0) = Unix Epoch = "Januar 1970" im Tooltip

**Lösung: Semantisches Mapping (Weg 2)**
```javascript
return { x: col, y: val, _originalDate: ts };
```
- **x: col** mappt direkt auf Asset-Namen
- Robust gegen Sortierung/Filterung
- KDR 4 konform (Snapshot Mode)

### 8.5 Regression: Doublette im Ranking-Modus

**Problem:**
```
Zeile 1: Dezember 2026 (fett)
Zeile 2: Dezember 2026: 6 € (normal)
```

**Root Cause:**
- Dataset-Label = Datum ("Dezember 2026")
- Tooltip-Header zieht dasselbe Datum aus _originalDate
- Kein Veto für strukturelle Redundanz im Ranking-Mode

**Lösung:**
Dokumentations-Erweiterung (Section 6.2) + Strukturelles Veto im Label-Callback

### 8.6 Regression: LineChartStrategy API-Missmatch

**Problem:**
"FwSmartTooltips.getInteractionConfig is not a function"

**Root Cause:**
- LineChartStrategy (V12.1.0) in "Zwischenwelt"
- Erwartete separate Methode für Interaktion
- Moderne Architektur: Interaktions-Logik zentral in `.configure()`

**Weitere Defizite:**
- Kein `_originalDate` in Datenpunkten
- Parser-Regression: `getTime()` statt `FwDateUtils.parse()`
- Style-Leakage: manuelle styleConfig

**Lösung: Symmetrie-Upgrade (V13.0.0)**
- Metadaten-Integrität: _originalDate huckepack
- UTC-Integrität: FwDateUtils.parse() konsequent
- Interface-Harmonisierung: Zentrale Tooltip-Konfiguration
- Design Token Adoption: Keine manuellen Styles

---

## 9. Design Token Integration

### 9.1 Problem: Style Leakage in Strategien

**BarChart BorderRadius:**
- History-View: 90-Grad-Winkel (borderRadius fehlte)
- Ranking-View: borderRadius: 4 (manuell kodiert)
- **Root Cause:** DRY-Verletzung, Feature Drift zwischen Ansichten

**LineChart BorderWidth:**
- Hart kodiert in transform(): `borderWidth: isBenchmark ? 4 : 2`
- **Root Cause:** Visuelle Vorgaben in Transformations-Methoden vergraben

### 9.2 FAANG-Lösung: "Inheritance over Transformation"

#### Phase 1: Design Tokens in FwTheme.js (V4.0.0 → V4.1.0)

```javascript
this.ui = {
    barBorderRadius: 4,           // CI-konformer Radius für alle Balken
    legendDotRadius: 2,            // Radius für Legenden-Icons
    popoverBorderRadius: 12,       // Abrundung der Detail-Fenster
    tooltipBorderRadius: 4,        // Abrundung der Tooltips
    
    // V4.1.0: Adaptive Stroke Width Matrix
    lineWeights: {
        normal: { S: 1.5, M: 2, L: 2.5 },
        benchmark: { S: 3, M: 4, L: 5 }
    }
};

// Accessor-Methode
getLineWidth(isBenchmark, width) {
    const zone = width < 450 ? 'S' : (width < 900 ? 'M' : 'L');
    const type = isBenchmark ? 'benchmark' : 'normal';
    return this.ui.lineWeights[type][zone];
}
```

#### Phase 2: Globale Konfiguration in Strategien

**BarChartStrategy.js (V41.2.0):**
```javascript
options: {
    elements: {
        bar: {
            borderRadius: this.theme.ui.barBorderRadius
        }
    }
}
```

**LineChartStrategy.js:**
```javascript
// In transform(): NUR Semantik, keine Pixel
// Entfernung von: borderWidth: isBenchmark ? 4 : 2

// In getChartConfig(): Design-Injektion
const chartWidth = chart.width;
datasets.forEach(ds => {
    ds.borderWidth = this.theme.getLineWidth(ds._isBenchmark, chartWidth);
});
```

#### Phase 3: Sanitary Cleanup
- Entfernung aller manuellen Design-Werte aus Transformations-Methoden
- Transformation (Layer 3) = Mathematik + Rucksack-Kontext
- Design = erst in Endmontage (getChartConfig)

### 9.3 Warum NICHT im Rucksack?

| Aspekt | Rucksack (fwContext) | Theme (FwTheme) |
|--------|---------------------|-----------------|
| Zweck | Request-Scoped Context | Globales Design-System |
| Inhalt | Daten-Info: rhythm, viewMode, valueMode | Erscheinungsbild: Farben, Fonts, Radien |
| Stabilität | Ändert sich pro Render/User-Aktion | Fest im CI-Bauplan |

**Rucksack-Integrität:**
- borderRadius: 4px = globale Design-Konstante
- Ändert sich NICHT, weil User "1 Jahr" → "5 Jahre" klickt
- Im Rucksack wäre "Mitschleppen" unnötiger Design-Werte

---

## 10. Adaptive Stroke Width: Usability-Standards

### 10.1 Material Design / HIG Richtwerte

| Zone | Breite | Normal | Benchmark | Begründung |
|------|--------|--------|-----------|------------|
| S (Mobile) | <450px | 1.5-2px | 3px | Präzision: Peaks dürfen nicht ineinanderlaufen |
| M (Tablet) | 450-899px | 2px | 4px | Sweet Spot für Touch-Geräte |
| L (4K/Desktop) | ≥900px | 2.5-3px | 4-5px | Kontrast auf hochauflösenden Screens |

### 10.2 Warum Zone-Aware statt Fix-Werte?

**1. Wahrung KDR 6 (Responsive Isolation):**
- Chart bleibt stabil
- Diskrete Stufen (S, M, L), kein "Zittern" beim Resizen

**2. Kein Rucksack-Overhead:**
- `isBenchmark` = Semantik (im Rucksack)
- Pixel-Wert = Darstellung (Layer 5)

**3. Wartbarkeit:**
- Design-Änderung nur im Theme: 3 → 2.5 für Mobile
- Code der Strategie unberührt

---

## 11. FAANG-Qualitätssicherung

### 11.1 Pure Functional Logic (No Side Effects)
- FwDateUtils-Methoden sind pure: gleicher Input = gleicher Output
- Keine Abhängigkeit von Browser-Systemzeit
- UTC-only, keine DST-Probleme

### 11.2 Logic Encapsulation (Layer 4 Isolation)
- Wochenberechnung NUR in FwDateUtils
- Verhindert "Schatten-Logik" in anderen Layers
- Single Point of Truth

### 11.3 Interface Stability (The Diff Principle)
- Bestehende Methoden (parse, getBopAnchor) bleiben identisch
- Neue Features sind additiv, nicht modifizierend
- Backward-kompatibel

### 11.4 Physical Boundary Awareness
- Tooltip misst chart.width in jedem Render
- Garantiert: 4K zeigt nie Mobile-Kürzung
- Deterministische Zonen-Zuordnung

### 11.5 State-Reactive Labeling
- Echtzeit-Prüfung !ds.hidden
- Reagiert auf Nutzer-Pills ohne Datenstruktur-Änderung
- Idempotente Callbacks

### 11.6 Explicit Anchoring (Semantische Kopplung)
- Datenpunkte "kleben" an Labels (x: "World")
- Robust gegen dynamische Sortierung
- Shadow Metadata Pattern (_originalDate)

### 11.7 Contract-Based Rendering
- Keine Heuristiken ("Sieht das Label wie ein Datum aus?")
- Nur harter Vertrag im Rucksack (viewMode === 'ranking')
- Protocol Enforcement

---

## 12. Architektur-Prinzipien (Die Rote Linie)

### 12.1 Unberührbar
- X-Achsen-Geometrie in FwSmartXAxis.js
- Layout-Hooks in BarChartStrategy.js (afterFit, _userMin/Max, halfBarPixel)
- **Grund:** Mühsam stabilisiert für 4K-Clipping Prevention

### 12.2 Layer-Trennung (Zwiebel-Prinzip)
- **Layer 3 (Strategie):** Liefert unveränderlichen Kern (rhythm, viewMode)
- **Layer 4 (Services):** Verheiratet Kern mit dynamischer Schale (Bildschirmbreite)
- **Layer 4 (FwDateUtils):** Single Point of Truth für Zeit-Semantik
- **Layer 5 (Theme):** Single Source of Truth für Design-Tokens

### 12.3 Context Object Pattern
- **Rucksack (fwContext):** Semantischer Kontext (Was? Warum?)
- **Theme (FwTheme):** Globales Design-System (Wie sieht es aus?)
- **Strikte Trennung:** Design wandert NICHT durch Rucksack

### 12.4 Prevention by Architecture
**Visual Sovereignty:**
- Alle visuellen Eigenschaften zentral über FwTheme
- Oder in globalen options der Strategie

**Dataset-Templates:**
- Standard-Objekt für Datensätze in BaseChartStrategy
- Alle CI-konformen Standardwerte vorhanden

**Strict Review:**
- Änderungen visueller Details in _transform-Methoden = "Architektur-Verstoß"

---

## 13. Metadata Integrity: Das Huckepack-System

### 13.1 Warum _originalDate zwingend ist

**Problem ohne Metadaten:**
- Tooltip-Service greift auf Achsen-X-Wert zurück
- Führt zu Rundungsfehlern bei Formatierung
- Bei category-Achsen: Date(0) = "Januar 1970"

**Lösung: Shadow Metadata Pattern**
```javascript
return { 
    x: anchor,           // Für Chart-Physik
    y: val,              // Für Chart-Physik
    _originalDate: ts    // Für Tooltip-Service (Layer 4)
};
```

**Eigenschaften:**
- `_originalDate` stört Chart-Physik nicht
- Chart.js reagiert nur auf x/y
- Tooltip-Service hat Zugriff auf "echte" zeitliche Information

### 13.2 Strikte Anforderung für beide Chart-Typen

**BarChartStrategy:** History + Ranking  
**LineChartStrategy:** Alle Ansichten

**Warum auch für LineChart:**
- Obwohl Linien in Chart.js einfacher
- Architektonische Integrität des Gesamtsystems
- Prinzip der absoluten Symmetrie

---

## 14. Implementierungs-Versionen

### FwDateUtils.js (V4.4.0)
- Deterministische Matrix v1.3.1
- Zone-Awareness (S, M, L)
- Weekly-Range Mathematik (Start + 6 Tage)
- No-Q-Policy für QUARTERLY
- Pure Functional, UTC-only

### FwSmartTooltips.js (V3.3.0)
- Gatekeeper-Check (infoSystem Protocol)
- Dynamischer Interaction-Mode (Ranking vs. History)
- Pill-reaktive Label-Unterdrückung (Regel 6.1)
- Strukturelles Veto (Regel 6.2)
- Physikalische Zonen-Erkennung (S, M, L)

### BarChartStrategy.js (V41.2.0)
- Metadata Integrity (_originalDate)
- Semantisches X-Mapping (x: assetName)
- Design Token Integration (barBorderRadius)
- ViewMode: 'ranking' vs 'history' im fwContext
- X-Achsen-Physik: KOMPLETT UNANGETASTET

### LineChartStrategy.js (V13.0.0)
- Architectural Symmetry mit BarChart
- UTC-Integrität (FwDateUtils.parse())
- Metadata Integrity (_originalDate)
- Interface-Harmonisierung (configure statt getInteractionConfig)
- Design Token Adoption

### FwTheme.js (V4.1.0)
- Design Token Era (ui-Objekt)
- Adaptive Stroke Width Matrix (lineWeights)
- Zone-Aware Accessor (getLineWidth)
- Deterministische Skalierung S/M/L

---

## 15. Entscheidungsgrundlagen

### 15.1 Warum Semantisches Mapping (Weg 2)?

**Bewertung der 3 Wege:**
1. **Index-Mapping:** x: rowIndex - fragil bei Sortierung
2. **Semantisches Mapping:** x: assetName - **GEWINNER** (robust, natürlich, KDR 4)
3. **Adapter-Layer:** _toDataPoint() - Over-Engineering für Projektgröße

**Begründung:**
- Kein Over-Engineering: Eine Zeile Code, maximale Stabilität
- KDR 4 konform: Snapshot Mode erlaubt Kategorien
- Zukunftssicher: Reihenfolge/Filter-Änderungen kein Problem

### 15.2 Warum explizite Dokumentation (Section 6.2)?

**Professionelle Technical Writer (Google/Amazon):**
- Verlassen sich nie auf implizite Logik
- Arbeiten mit expliziten Invarianten
- Context-Specific Constraints

**Warum wichtig für LLMs:**
- LLMs neigen zu lokalem Optimieren
- Ohne globales Verbot: label: date + show label = Doublette
- Explizite Regel verhindert "logischen Kurzschluss"

### 15.3 Warum Zone-Aware Tokens statt Fix-Werte?

**Usability-Standards (Material Design / HIG):**
- Mobile: Filigran (1.5-2px) für Präzision
- Tablet: Sweet Spot (2px) für Touch
- 4K: Kontrast (2.5-3px) für Sichtbarkeit

**Architektur:**
- Diskrete Stufen verhindern "Zittern"
- Strategie kennt Pixel-Grenzen nicht
- Theme entscheidet über Ästhetik

---

## 16. Fazit

Diese Architektur garantiert:

* **Deterministik:** Gleicher Input (Daten) + Gleicher Screen = Gleicher Output
* **Kognitive Entlastung:** Keine "KW"-Rechnerei, keine Doubletten, keine Redundanz
* **Wartbarkeit:** Geschäftslogik (Woche = 7 Tage) in Utils gekapselt; Layout im Service gekapselt; Design im Theme gekapselt
* **Robustheit:** Explizite Verträge, keine impliziten Defaults, keine Heuristiken
* **Symmetrie:** Alle Chart-Typen folgen denselben Protokollen
* **Regression-Schutz:** Alle gefixten Bugs dokumentiert mit Root Cause + Lösung

---

## 17. Glossar

**Rucksack (fwContext):** Semantischer Kontext-Container, der von Strategie zu Services wandert  
**Zwiebel-Prinzip:** Kern (unveränderlich) + Schale (dynamisch zur Laufzeit)  
**Design Tokens:** Zentrale Konstanten für visuelles Erscheinungsbild  
**Shadow Metadata:** Zusatzinformationen (_originalDate), die Chart-Physik nicht beeinflussen  
**Zone-Aware:** Responsive basierend auf diskreten Größen-Zonen (S, M, L)  
**Deterministic Matrix:** Wahrheitstabelle ohne Heuristiken oder Raten  
**The Law:** Bindende Formatierungs-Tabelle (Abweichungen = Bugs)  
**Gatekeeper:** Service-Eingangs-Prüfung (infoSystem-Vertrag)  
**Pill-Reaktivität:** Dynamische Anpassung basierend auf sichtbaren Assets  
**No-Doublette Regel:** Strukturelles Veto gegen redundante Information  
**Semantic Mapping:** X-Koordinate via Asset-Namen statt Index  
**Style Leakage:** Visuelle Vorgaben in falscher Layer-Ebene

---

**Version History:**
- V1.3.1 (20.01.2026): Deterministic Matrix, Initial Release
- V2.0.0 (23.01.2026): Complete Development Chronicle, Alle Regressionen dokumentiert, Design Token Integration, Adaptive Stroke Width, LineChart Symmetrie-Upgrade

