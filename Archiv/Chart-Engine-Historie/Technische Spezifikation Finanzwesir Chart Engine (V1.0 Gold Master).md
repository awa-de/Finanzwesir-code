---
Angelegt am: 03.12.2025 19:47:39
zuletzt verändert am: 2025-12-03T19:49:14+01:00
---
---
up:: 

Finanzwesir Vermächtnis | P3 Dynamische Charts

## Technische Spezifikation: Finanzwesir Chart Engine (V1.0 Gold Master)

Dokumententyp: Reverse Engineering Guide / Systemarchitektur

Status: Live / Production Ready

Zweck: Ermöglicht die exakte Reproduktion der Chart-Logik und des Designs durch Dritte (LLMs/Entwickler).

## 1. System-Architektur (High Level)

Das System ist eine **Client-Side Rendering Engine**, die in eine bestehende Ghost.io-Umgebung injiziert wird. Sie arbeitet autark im Browser des Besuchers.

- **Host:** Ghost CMS (Code Injection im Footer).
    
- **Datenquelle:** Statische CSV-Dateien (gehostet auf demselben Server oder extern).
    
- **Core Libraries:**
    
    1. `Chart.js` (Rendering Engine, v4+)
        
    2. `PapaParse` (CSV Parsing)
        
    3. `chartjs-adapter-date-fns` (Zeitachsen-Logik)
        
    4. `chartjs-plugin-zoom` (Interaktion)
        
- **Abhängigkeiten:** Keine Build-Pipeline (Webpack/Vite). Reines Vanilla JS (ES6 class-based).
    

## 2. Input-Spezifikation (Daten)

Die Engine akzeptiert **eine universelle CSV-Struktur** für alle Chart-Typen.

### CSV Format-Regeln

- **Trennzeichen:** Semikolon `;` (bevorzugt/DE) oder Komma `,` (US) – Auto-Detection.
    
- **Dezimaltrenner:** Komma `,` (DE) oder Punkt `.` (US) – Auto-Detection & Sanitization.
    
- **Erste Spalte:** Muss zwingend ein Datum enthalten (Header: `Date` oder `Datum`).
    
    - Format: ISO (`YYYY-MM-DD`), DE (`DD.MM.YYYY`) oder US (`MMM DD, YYYY`).
        
- **Weitere Spalten:** Beliebige Anzahl an Assets/Indizes. Der Header-Name wird als Legenden-Label genutzt.
    

**Beispiel-Datenstruktur:**

```
Datum;World;Emerging Markets;Gold
31.01.2023;100,50 €;50,20;1800,00
28.02.2023;102,00 €;49,80;1820,50
```

## 3. Output-Spezifikation (Die Chart-Typen)

Die Engine ist **polymorph**. Sie entscheidet anhand des HTML-Attributs `data-type`, wie die _gleiche_ CSV interpretiert wird.

### Typ A: Liniendiagramm (`data-type="line"`)

- **Zweck:** Historische Performance / Kursverlauf.
    
- **Daten-Logik:** Plottet alle Zeilen der CSV. X-Achse = Zeit.
    
- **Features:**
    
    - **Time Selector:** Buttons für `1J`, `3J`, `5J`, `Max` (Zoom).
        
    - **Mode Switch:** Umschalter zwischen `Wert (€)` (Absolute Zahlen) und `Rendite (%)`.
        
    - **Logik Rendite:** Normalisiert alle Graphen auf Start = 0% basierend auf dem ersten sichtbaren Wert.
        

### Typ B: Balkendiagramm (`data-type="bar"`)

- **Zweck:** Jahresvergleiche, Renditen, Dividenden.
    
- **Daten-Logik:** Plottet alle Zeilen.
    
- **View Switch:**
    
    - **Zeit-Ansicht (Standard):** Gruppiert nach Datum (X-Achse = Zeit). Vergleich der Assets pro Jahr.
        
    - **Asset-Ansicht:** Gruppiert nach Asset (X-Achse = Asset-Namen). Zeigt den Trend _eines_ Assets über die Jahre nebeneinander.
        
- **Besonderheit:** Tooltips zeigen im Asset-View das Jahr, im Zeit-View den Asset-Namen.
    

### Typ C: Kreisdiagramm (`data-type="pie"`)

- **Zweck:** Asset Allocation (Ist-Stand).
    
- **Daten-Logik:** Ignoriert die Historie. Nutzt **nur die allerletzte Zeile** der CSV.
    
- **Darstellung:** Doughnut (Ring) mit `cutout: 50-70%`.
    
- **Center-Text Plugin:** Zeigt in der Mitte dynamisch die Summe der _sichtbaren_ Slices an.
    
    - _Reaktivität:_ Klick auf Legende blendet Slice aus -> Summe in der Mitte rechnet sich live neu.
        
    - _Auto-Fit:_ Schriftgröße passt sich der Lochgröße an.
        

## 4. Corporate Identity (Hardcoded Specs)

Diese Werte sind fest in der Engine verdrahtet, um Konsistenz zu erzwingen.

### Farben (Palette)

Priorisierte Reihenfolge der Zuweisung:

1. `#0071BF` (Blau) - Primär / World / Aktien
    
2. `#218380` (Petrol) - Sekundär / ACWI / Anleihen
    
3. `#8D0267` (Purpur) - Akzent 1 / IMI / Krypto
    
4. `#DFC805` (Gelb) - Akzent 2 / Gold / EM
    
5. `#4C4C4C` (Dunkelgrau) - Fallback / Text
    

### Typografie

- **Schriftart:** `Source Sans Pro` (Google Fonts).
    
- **Schnitt:** Regular (400) für Achsen/Body, Bold (700) für Titel/Summen.
    
- **Besonderheit:** Keine Serifenschriften, keine _Archivo Black_ in kleinen Elementen (Lesbarkeit).
    

### UI-Design (Card Look)

Der Container muss folgende CSS-Werte haben:

- `border-radius: 12px` (Rounded XL)
    
- `box-shadow: 0 1px 2px rgba(0,0,0,0.05)` (Shadow SM)
    
- `border: 1px solid #E5E7EB` (Gray 200)
    
- `padding: 24px` (Desktop) / `10px` (Mobile)
    

## 5. Logik & Algorithmen (Re-Engineering Guide)

Für den Nachbau der Engine sind diese drei Kern-Funktionen essentiell:

### A. Der "Smart Parser"

1. Lese CSV als Text.
    
2. Erkenne Trennzeichen (Zähle `;` vs `,` in Zeile 1).
    
3. Identifiziere Datumsspalte (Suche nach "date", "datum").
    
4. Iteriere über alle anderen Spalten:
    
    - Bereinige Werte: Entferne `€`, `$`, `%`, Leerzeichen.
        
    - Erkenne Format: `1.000,00` (DE) vs `1,000.00` (US) und parse zu `float`.
        
5. Output: Ein sauberes Objekt `{ labels: [Date objects], datasets: { "World": [100, 102...], ... } }`.
    

### B. Die "Color Determinism" Funktion

Wie wird einem Asset eine Farbe zugewiesen?

1. **Manueller Override:** Prüfe, ob im HTML `data-colors` gesetzt ist (z.B. "World: #Red"). Match via `string.includes()`.
    
2. **Längen-Sortierung:** Sortiere die Farb-Regeln nach Länge des Namens (damit "ACWI IMI" vor "ACWI" matched).
    
3. **Hash-Fallback:** Wenn keine Regel passt: Erzeuge einen numerischen Hash aus dem Asset-Namen und nimm `Palette[Hash % Palette.length]`. _Garantie: Gleicher Name bekommt immer gleiche Farbe, auch nach Reload._
    

### C. Das "Center Text" Plugin (Canvas Drawing)

Für den Doughnut-Chart muss direkt in den Canvas-Kontext gezeichnet werden (`beforeDraw` Hook).

1. Berechne Summe aller Datensätze, wo `hidden === false`.
    
2. Messe die Breite des Textes.
    
3. Vergleiche mit `innerRadius` des Doughnuts.
    
4. Wenn Text zu breit: Reduziere `fontSize` proportional.
    
5. Zeichne Text exakt bei `(chart.width / 2, chart.height / 2)`.
    

## 6. Workflow & Integration (SOP)

So wird die Engine vom CMS (Ghost) angesteuert:

1. **Code Injection:** Das JS-Bundle liegt im Footer (global).
    
2. **Trigger:** Der Code sucht nach `div.financial-chart-module`.
    
3. **Konfiguration via Data-Attribute:**
    
    - `data-csv`: URL zur Datei.
        
    - `data-type`: `line` | `bar` | `pie`.
        
    - `data-colors`: Optionaler String "Name:Hex, Name2:Hex".
        
    - `data-center-text`: `true`/`false` (für Pie).
        

### HTML Snippet Vorlage

```
<div class="financial-chart-module" 
     data-type="line" 
     data-csv="/content/files/daten.csv" 
     data-colors="World: #0071BF">
</div>
```

## 7. Sicherheits- & Performance-Audit

- **XSS-Schutz:** Der Parser (`PapaParse`) darf kein HTML interpretieren. Daten werden als reine Zahlen/Strings an Chart.js übergeben (Canvas Rendering verhindert Script-Injection).
    
- **DSGVO:** Alle externen Bibliotheken (`chart.js`, `date-fns` etc.) müssen lokal vom eigenen Server geladen werden (`/assets/js/`). Keine CDN-Links in Produktion.
    
- **Cache-Busting:** An die CSV-URL wird beim Fetch ein Timestamp gehängt (`?t=12345`), um Browser-Caching bei Updates zu umgehen.
