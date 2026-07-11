# ARCHITECTURE STRATEGY PAPER
## Finanzwesir Chart Engine (Client-Side BI)

**Version:** 12.0.0 (The Complete Record)
**Datum:** 17.02.2026
**Status:** Final Specification & Binding Reference
**Kontext:** Dieses Dokument ist die alleinige Wahrheit für die technische Umsetzung.

> *Die Engine verwaltet den Prozess, das Plugin kapselt die Intelligenz, die Library übernimmt das Zeichnen.*

---

## 0. Präambel: Management Summary (Funktionsweise)

*Für die Geschäftsführung: Wie die Engine Sicherheit und Design-Treue garantiert.*

Um zu verstehen, wie wir **Datensicherheit** (keine falschen Zahlen) und **Design-Konsistenz** (Corporate Identity) bei gleichzeitig hoher Flexibilität gewährleisten, gilt das Prinzip der modernen Fertigungsstraße:

1.  **Das Zentrale Daten-Reservoir (Der "Topf" - Layer 1)**
    Alle Rohdaten (aus der CSV oder über den Daten-Bridge-Pfad als app-berechnete, versiegelte Objekte) landen in einem zentralen, streng bewachten Speicher (`FinanzwesirData`). Diese Daten sind **unveränderlich** — erzwungen durch `Object.freeze` (Deep Freeze). Kein Chart darf in diesem Topf rühren oder Zahlen ändern. Das garantiert, dass "10% Rendite" auch immer "10%" bleiben.

2. **Der Betriebsleiter (Der "Manager" - Layer 2)**
   Zwischen dem Tresor und den Robotern steht die ChartEngine. Sie ist der Orchestrator der Fabrik. Sie fasst die Daten selbst nicht an und malt auch keine Bilder, aber sie steuert den Prozess.
- **State Management**: Sie merkt sich, was der Nutzer sehen will (z.B. "Nur 5 Jahre" oder "Ansicht: Rendite").
- **Auftragsvergabe**: Sie ruft den passenden Roboter (Strategie) zur richtigen Zeit auf.
- **Sicherheit**: Sie verhindert, dass Roboter wild durcheinander laufen (Lifecycle Management).

3.  **Die Roboter (Die "Strategien" - Layer 3)**
    Für jeden Chart-Typ (Linie, Balken, Torte) gibt es einen spezialisierten Roboter.
    * Er analysiert die Daten (erkennt Rhythmus und Einheiten).
    * Er packt einen "Rucksack" (`fwContext`) mit Anweisungen für die Darstellung.
    * Er darf **niemals** Daten in den Topf zurücklegen.

4.  **Die Qualitätskontrolle (Der "Renderer" & "Curator" - Layer 4/5)**
    Der Roboter übergibt sein Werkstück an die Endmontage.
    * **The Curator (`FwSmartScales`):** Entscheidet mathematisch, welche Labels Platz haben. Kennt keine Pixel — nur Zeiteinheiten und Zahlenräume.
    * **The Renderer:** Wendet das Design (Farben, Schriften) an.
    * **The Translator (`FwLayoutRules`):** Entscheidet über Pixel-Dimensionen und formatiert Text strikt nach den Anweisungen im "Rucksack".

**Grundgesetz: Unidirektionaler Datenfluss.**
Daten fließen ausschließlich von oben nach unten (Layer 1 → 2 → 3 → 4 → 5). UI-Events (Klick auf Range-Button, Legend-Toggle) fließen über den Manager (Layer 2) zurück und lösen einen neuen Top-Down-Zyklus aus. Kein Layer darf in einen höheren Layer schreiben. Plugins erhalten Daten **Read-Only** — `array.sort()` auf dem Original ist verboten, `[...array].sort()` ist erlaubt.

---

## [Die Datei-Matrix: Wer wohnt wo?]

Hier ist die vollständige Inventurliste der Architektur:

| Ebene (Layer) | Modul-Name | Zugehörige Dateien | Verantwortung |
| :--- | :--- | :--- | :--- |
| **Layer 1** | **The Vault**<br>(Daten & Ingestion) | `FinanzwesirData.js`<br>`CSVParser.js` | **Single Source of Truth.**<br>Liest Rohdaten, erkennt Einheiten (Ingestion) und versiegelt sie schreibgeschützt (Deep Freeze).<br>**Parser-Vertrag:** Two-Step Parsing (1. syntaktisch: CSV→JSON, 2. semantisch: `analyzeStructure` erkennt Datentyp). Invarianten: Jede Zeile = gleiche Spaltenzahl wie Header, Header eindeutig, numerische Spalten ohne Strings (außer `null`).<br>**API:** `parse()` ist `async` (öffentliche Schnittstelle), intern synchron. Erlaubt späteren Wechsel auf Web Worker ohne API-Bruch.<br>**Zwei zulässige Produzenten validierter und versiegelter Daten:** (1) CSVParser — parst externe CSV-Dateien wie bisher; (2) App-Berechnung/App-Strategie — liefert bereits berechnete, typsichere Objekte über den Daten-Bridge-Pfad (OA-02-Dissens-2). Für beide gilt: Unveränderlichkeit nach Übergabe, Deep-Freeze-Invariante, unidirektionaler Datenfluss. |
| **Layer 2** | **The Manager**<br>(State & Orchestration) | `ChartEngine.js` | **State Holder.**<br>Verwaltet Interaktionen, Zeiträume und steuert den Render-Zyklus.<br>**Error Boundary:** `_processContainer()` umschließt den gesamten Render-Zyklus mit try-catch. Bei Fehler wird ein neutraler Platzhalter angezeigt (via `renderer.showError()`), die restliche Seite bleibt funktionsfähig.<br>**Smart Updates:** Re-Renders (View-/Range-Wechsel) nutzen `chart.update()` statt destroy/recreate — bewahrt Chart.js-Animationen. Nur der Erstaufbau nutzt `new Chart()`. |
| **Layer 3** | **The Brains**<br>(Logik & Strategie) | `_TemplateStrategy.js`<br>`BaseChartStrategy.js`<br>`LineChartStrategy.js`<br>`BarChartStrategy.js`<br>`PieChartStrategy.js`<br>`FwChartPlugins.js` | **Transformation.**<br>Wandeln neutrale Daten in spezifische Chart-Konfigurationen um. Packen den "Context-Rucksack".<br>**Legend Toggle:** `BaseChartStrategy.handleLegendClick()` schaltet Datasets ein/aus via `meta.hidden` + `chart.update()`. |
| **Layer 4** | **The Curator**<br>(Mathematik & Analyse) | `FwSmartScales.js`<br>`FwDateUtils.js` | **Intelligence.**<br>`SmartScales` berechnet Achsen und Ticks (Platz). Kennt keine Pixel — nur Zeiteinheiten und Zahlenräume.<br>`DateUtils` erkennt Rhythmen (Zeit-Intelligenz). |
| **Layer 5** | **The Face**<br>(UI & Design) | `FwRenderer.js`<br>`FwLayoutRules.js`<br>`FwFormatUtils.js`<br>`FwTheme.js` | **Assembly & Finish.**<br>`Renderer` baut HTML, enthält `_sanitize()` und `_renderA11yTable()`.<br>`LayoutRules` entscheidet über Pixel-Dimensionen und übersetzt Context in Text.<br>`Theme` liefert Farben aus `tokens.css` per CSS-Variables Bridge (implementiert und an alle Strategien durchgeleitet, siehe KDR 14). |



## 1. Kern-Design-Entscheidungen (KDR)

### KDR 1: Client-Side Logic (Fat Client)
* **Entscheidung:** 100% Client-Side (Vanilla JS).
* **Begründung:** Ghost ist ein "dummes" CMS. Der Browser erhält Rohdaten (CSV) und rendert interaktiv. Keine Server-Komplexität.

### KDR 2: Monorepo-Struktur
* **Entscheidung:** Plugins sind Dateien im Ordner `/strategies`, keine NPM-Pakete.
* **Begründung:** Reduktion von Komplexität. Kein Semantic Versioning Overhead.

### KDR 3: Lokalisierung (Hardcoded DE)
* **Entscheidung:** `Locale: de-DE` ist fest verdrahtet.
* **Begründung:** Zielgruppe ist strikt deutschsprachig. i18n wäre Over-Engineering.

### KDR 4: Polymorphe Datenhaltung
* **Entscheidung:** Unterscheidung nach Semantik, nicht Chart-Typ.
    * **Time Series Mode:** Datum ist Pflicht (Line/Bar History). Strict Validation.
    * **Snapshot Mode:** Kategorien erlaubt (Pie/Donut). Loose Validation.
* **Begründung:** Verhindert Hacks. Die Engine entscheidet anhand der Datensignatur.

### KDR 5: Visuelle Modularität (Plugins)
* **Regel:**
    * Standard-Config -> `Strategy`.
    * Custom-Pixel-Zeichnen -> `core/FwChartPlugins.js` (z.B. Center Text).

### KDR 6: Responsive Isolation (The Container Rule)
* **Entscheidung:** Wir nutzen CSS Container Queries (`@container`) und Pixel-Fixed Fonts.
* **Begründung:** Ein Chart ist ein "Bild". Es muss interne Stabilität wahren, unabhängig vom Browser-Zoom.

### KDR 7: Semantic Time & The Smart Curator
* **Kontext:** Chart.js neigt dazu, Ticks zu "erfinden" (Interpolation), was zu falschen Labels führt (z.B. 12:00 Uhr mittags).
* **Entscheidung:** **Curated Linear Time.**
    1.  **Linear Scale:** Wir nutzen physikalisch korrekte Zeitachsen (Millisekunden).
    2.  **Explicit Tick Injection:** Die Strategie übergibt *alle* Timestamps als `sourceTicks` an die Achse.
    3.  **Generator Suppression:** Wir setzen `forceGenerator: true`. Dies verbietet Chart.js, eigene Ticks zu erfinden.
* **Begründung:** Nur so können wir logische Filter ("Zeige nur Montage") auf einer linearen Achse anwenden, ohne dass die Geometrie kollabiert.
* **Truthful UX:** Lücken in den Daten werden als Lücken im Chart sichtbar — keine Interpolation, keine erfundenen Datenpunkte. Die Achse ist physikalisch korrekt (Millisekunden), deshalb erzeugen fehlende Zeiträume automatisch sichtbare Leerräume. Das Gehirn benötigt bei kurzen Zeiträumen andere Anker (Wochentage, Grenzen) als bei langen Historien (Jahre).

### KDR 8: Zone Zero Logic & Density Control
* **Kontext:** Wie viele Ticks zeigen wir auf der X-Achse? Jeden Tag? Jeden Monat?
* **Problem:** Ein Konflikt zwischen "Daten-Wahrheit" (Täglich) und "Screen-Physik" (360px Breite). Zu viele Ticks führen zu Überlappung oder "Text-Wüsten".
* **Entscheidung:** Die Dichte der X-Achse wird durch die **Unified Density Matrix** gesteuert.
    * Es gilt das Prinzip **"Constraint Dominance"**: Wenn der Zeitraum (Zoom) zu groß für die Daten-Frequenz ist, gewinnt der Zeitraum.
    * Beispiel: Tägliche Daten auf 1 Jahr Sicht → Anzeige: Monatlich (um Rauschen zu entfernen).
* **Normative Referenz:** Die exakten Regeln, Tabellen und die "Unified Density Matrix" für die Implementierung sind in **`Charts Ticks und Label_v13.md`** definiert. Diese Datei ist bindend für die Berechnung der `time.unit` und der Formate.

### KDR 9: The Plugin Context Protocol (Evolution von "Axis Context")
* **Kontext:** Tooltips und Legenden (Plugins) haben keinen direkten Zugriff auf die Strategie-Logik.
* **Problem:** Früher versuchten Tooltips, Daten von der X-Achse zu lesen. Das führte zu Fehlern, da Achsen-Labels gekürzt sind ("Jan '24").
* **Entscheidung:** **Der "Rucksack" (`fwContext`).**
    1.  **Packen:** Die Strategie erstellt ein Kontext-Objekt (Währung, Rhythmus, Modus).
    2.  **Injizieren:** Dieses Objekt wird zentral in `chart.config.options.plugins.fwContext` abgelegt.
    3.  **Konsumieren:** `FwLayoutRules` und Tooltips lesen **ausschließlich** aus diesem Rucksack.
* **Begründung:** Single Source of Truth. Entkopplung von Daten (Langform) und Anzeige (Kurzform).

### KDR 10: Unit Sovereignty (Strip & Tag)
* **Kontext:** Wie wird aus einem `%` in der CSV wieder ein `%` im Chart?
* **Mechanik:**
    1.  **Ingestion (Strip):** `CSVParser` entfernt das Zeichen, speichert aber den Key `metadata.unitKey: 'UNIT_PERCENT'`.
    2.  **Translation (Map):** Die Strategie MUSS eine `UNIT_MAP` besitzen. Sie übersetzt `UNIT_PERCENT` in `{ mode: 'percent', currency: 'PERCENT' }` und packt dies in den `fwContext`.
    3.  **Re-Hydration:** Der Renderer (via `FwFormatUtils`) liest den Context und fügt das Symbol visuell wieder an.
* **Begründung:** Trennung von Mathematik (reine Zahlen) und Semantik (Einheiten).

### KDR 11: The Brain Transplant (Layer Shift)
* **Kontext:** Wer erkennt, ob Daten "täglich" oder "monatlich" sind?
* **Entscheidung:** `core/FwDateUtils.js` ist die **Single Source of Truth** für Zeit-Intelligenz.
* **Änderung:** Die Methode `detectRhythm(timestamps)` wurde aus `FwSmartScales` (Layer 4) entfernt und zentralisiert. Die Strategie ruft dies einmalig auf und speichert das Ergebnis im `fwContext`.

### KDR 12: Security by Construction (SafeDOM)
* **Kontext:** Die Engine rendert Daten aus externen CSV-Dateien in den DOM (Tooltips, Legenden, Achsen-Labels, A11y-Tabellen). Jede Stelle, an der CSV-Daten im DOM landen, ist ein potenzieller XSS-Vektor.
* **Entscheidung: textContent-Only-Regel.**
    1. **Alle Daten aus CSV** (Labels, Kategorien, Zahlenwerte) werden ausschließlich via `textContent` oder `innerText` in den DOM geschrieben.
    2. **`innerHTML` ist für Nutzdaten tabu.** `innerHTML` darf nur für kontrolliertes, statisches Engine-HTML verwendet werden (z.B. Loading-Spinner-SVG, Button-Icons).
    3. **`_sanitize()` als Backup:** `FwRenderer` enthält eine `_sanitize()`-Methode, die `<` und `>` stripped. Sie dient als zweite Verteidigungslinie, nicht als primärer Schutz.
* **Begründung:** Defense-in-Depth. Auch wenn CSV-Daten selbst verfasst sind (kein User-Generated Content), garantiert die textContent-Regel, dass ein kompromittiertes oder fehlerhaftes CSV niemals Script-Injection auslösen kann.
* **Detail-Referenz:** `docs/context/SECURITY-AUDIT.md` enthält die vollständige Härtungsanleitung inkl. IST/SOLL-Code.

### KDR 13: Accessibility (A11y as Contract)
* **Kontext:** Canvas-Charts sind für Screen Reader unsichtbar. Das BFSG (Barrierefreiheitsstärkungsgesetz) verpflichtet öffentliche Webauftritte zur Barrierefreiheit (seit Juni 2025). W3C WCAG 2.1, Guideline 1.1 fordert Textalternativen für nicht-textliche Inhalte.
* **Entscheidung: A11y-Tabelle als Pflichtbestandteil.**
    1. **Jede Strategie** muss eine `getA11yData()`-Methode implementieren, die tabellarische Daten (Header + Rows) zurückgibt.
    2. **`FwRenderer._renderA11yTable()`** erzeugt eine visuell verborgene, aber für Screen Reader zugängliche HTML-Tabelle (`sr-only`).
    3. **Datenbegrenzung:** Bei > 20 Datenpunkten werden die letzten 20 Zeilen + eine Summary-Zeile ausgegeben (Performance für Assistive Technology).
* **Status:** Vollständig implementiert (2026-02-19). Alle drei Strategien liefern tabellarische Daten: Line/Bar History (letzte 20 Zeilen + Summary), Bar Ranking (alle Perioden), Pie (alle Segmente aufgelöst, kein „Weitere…"-Aggregat). Formatierung via `FwFormatUtils.formatSmart()` (de-DE).
* **Begründung:** Barrierefreiheit ist keine Option, sondern Grundanforderung. Nielsen Heuristik 7: "Flexibility and efficiency of use."

### KDR 14: CSS-Variables Bridge (Design-Hoheit beim Theme) — Farbe implementiert, Font-Parität implementiert (Pilot)
* **Kontext:** Wer bestimmt die Farben — das JavaScript oder das CSS?
* **Entscheidung:** Das Ghost-Theme (CSS) hat die Design-Hoheit. Die Engine liest Farben zur Laufzeit.
    1. **Architektur:** `FwTheme.init()` liest CSS-Custom-Properties (`--color-petrol`, `--color-text`, etc.) via `getComputedStyle()` aus `tokens.css` aus. `ChartEngine` erzeugt den `FwRenderer` als Composition Root und reicht die init()'te Instanz per Constructor Injection an alle drei Strategien durch (Graceful Default: `constructor(theme = new FwTheme())` bleibt eigenständig testbar). Hardcodierte Hex-Werte im Constructor dienen als Fallback für Test-HTMLs ohne geladene `tokens.css`.
    2. **Status:** Implementiert (2026-02-25, CSS-3) und durchgeleitet (2026-07-09, AP-16/16c): alle drei Strategien erhalten dieselbe `FwTheme`-Instanz, Null-Delta zwischen `tokens.css` und Fallback-Konstanten belegt (Null-Delta-QA, AP-16c). Verbleibende Hex-Werte in Utility-Dateien sind defensive Fallbacks (Injection-Pattern: Strategy übergibt Tokens, Utility hat Fallback).
    3. **Init-Reihenfolge (bindend):** `new FwTheme()` → `theme.init()` → `_injectStyles()`. Dokumentiert in `FwRenderer.constructor()` und `ChartEngine.js`.
    4. **Konsequenz:** Farbänderungen erfordern nur eine Änderung in `tokens.css` (Single Source of Truth seit AP-16; `screen.css` bindet sie per `@import` ein). Kein JavaScript-Eingriff nötig.
    5. **Font-Parität (implementiert 2026-07-11):** Fonts nutzen denselben Mechanismus wie Farben — `FwTheme.init()` liest zusätzlich `--font-display`/`--font-body` aus `tokens.css` via `getComputedStyle()`, dieselbe Composition-Root-/Constructor-Injection-Kette, derselbe Constructor-Hardcode als Fallback, dieselbe Init-Reihenfolge. **Status: implementiert (2026-07-11, AP-prokrast-17-FONT-CODE-A/B).** `FwTheme.init()` liest jetzt real `--font-display`/`--font-body` aus `tokens.css`; Canvas (Pfad A: Achsen-Ticks/Tooltip/Donut-Center) und HTML-UI (Pfad B: App-Text/Headlines/A11y/Meldungen) sind token-gespeist. Unabhängig reviewt (Opus, frische Instanz, GRÜN) und browserverifiziert am Piloten `prokrastinations-preis` (s. `AP-prokrast-17-FONT-CODE-A-CANVAS_Ergebnis.md`, `..._REVIEW_Ergebnis.md`, `..._CODE-B-HTMLUI_Ergebnis.md`). Reichweite: Mechanismus + Pilot — Rollout auf den übrigen App-Pool ist ein separater, noch offener Schritt. Rubikon-Nachmessung S/M/L (`FwChartTextPlugin`, Textmetrik-Verschiebung durch Font-Wechsel) ist durch den Font-Wechsel jetzt sachlich fällig (DS-FOLLOWUP-07, Backlog), nicht Teil dieser Hebung.
* **Begründung:** 100% Trennung von Logik und Design. Das CMS-Theme steuert die Corporate Identity, die Engine passt sich an. Kein Designer muss JavaScript anfassen.

---

## 5. Roadmap & Status

* **Phase 1-6:** Abgeschlossen (Foundation, Parser, Linear Scales).
* **Phase 7:** Zone Zero & Pulse Strategy (Abgeschlossen).
* **Phase 8:** Rhythm Awareness (Abgeschlossen).
* **Phase 9:** Smart Curator & Explicit Tick Injection (Abgeschlossen).
* **Phase 10:** The Plugin Context Protocol (Abgeschlossen).
* **Phase 11:** The Unified Density Matrix (Abgeschlossen).
    * Harmonisierung von Phase 7 (Zone Zero) und Phase 8 (Rhythm).
    * Einführung der `docs/spec/Charts Ticks und Label_v13.md` (vormals v8).
    * Fix der "Geister-Ticks" und "Missing Anchors".
* **Phase 12 (AKTUELL):** **The Complete Record.**
    * Dokumentation aller impliziten Architektur-Entscheidungen (KDR 12–14).
    * Security-Härtung (SECURITY-AUDIT.md).
    * A11y-Tabellen befüllen.
    * CSS-Variables Bridge für FwTheme.

---

## Appendix A: Die Reise eines Datenpunkts (End-to-End Data Flow)

Dieses Appendix zeigt den Lebenszyklus **eines einzigen Datenpunkts** auf seinem Weg durch alle fünf Layer -- von der CSV-Datei bis zum Pixel auf dem Bildschirm und zurück in den Tooltip.

### Beispiel-Datenpunkt: `10,5 %`

```
CSV-Zeile:  "2024-01-15; 10,5 %"
```

**Layer 1 -- The Vault (Ingestion)**

| Schritt | Actor | Was passiert | Ergebnis |
|---------|-------|-------------|----------|
| Detect | CSVParser | Scannt `"10,5 %"` nach Symbolen | Fund: `%` |
| Map | CSVParser | Schlägt `%` in der ALLOW_LIST nach | `UNIT_PERCENT` |
| Strip | CSVParser | Entfernt Symbol, wandelt Komma→Punkt | `10.5` (Number) |
| Tag | CSVParser | Speichert Einheit als Metadatum | `metadata.unitKey = 'UNIT_PERCENT'` |
| Freeze | FinanzwesirData | `Object.freeze()` auf alle Daten | Unveränderlich. Für immer. |

```
Vault-Zustand:  { value: 10.5, date: Date(2024-01-15), unitKey: 'UNIT_PERCENT' }
```

**Layer 2 -- The Manager (Orchestration)**

| Schritt | Actor | Was passiert |
|---------|-------|-------------|
| Typ-Erkennung | ChartEngine | Liest `data-type` aus HTML-Container → `'line'` |
| Strategie-Wahl | ChartEngine | Instanziiert `LineChartStrategy` |
| Render-Trigger | ChartEngine | `requestAnimationFrame` → Strategie bekommt die Daten |

**Layer 3 -- The Brain (Transformation)**

| Schritt | Actor | Was passiert | Ergebnis |
|---------|-------|-------------|----------|
| Unit Sovereignty | Strategy | Liest `unitKey`, übersetzt via `UNIT_MAP` | `{ valueMode: 'percent' }` |
| Rhythm Detection | FwDateUtils | Analysiert Abstände aller Timestamps | `rhythm: 'DAILY'` |
| Rucksack packen | Strategy | Erstellt `fwContext` mit allen Feldern | `Object.freeze({ valueMode: 'percent', rhythm: 'DAILY', ... })` |
| Datenpunkt verpacken | Strategy | Wandelt in Chart.js-Format | `{ x: 1705276800000, y: 10.5 }` |

```
fwContext:  { valueMode: 'percent', rhythm: 'DAILY', dateSemantics: 'SNAPSHOT', ... }
```

**Layer 4 -- The Curator (Curation)**

| Schritt | Actor | Was passiert |
|---------|-------|-------------|
| X-Achse | FwSmartScales | Lineare Skala (ms-Basis), Density Matrix wählt Ticks |
| Y-Achse | FwSmartScales | Nice-Number-Quantisierung, Grace-Buffer, Magnetic Zero |
| Tick-Filterung | FwSmartScales | Deduplizierung, Proximity Guard |

**Layer 5 -- The Face (Rendering)**

| Schritt | Actor | Was passiert | Ergebnis |
|---------|-------|-------------|----------|
| Zeichnen | Chart.js | Punkt bei x=1705276800000, y=10.5 auf Canvas | Ein Pixel. |
| Tooltip (bei Hover) | FwSmartTooltips | Holt `fwContext` aus Plugin-Config | Weiß: `valueMode = 'percent'` |
| Re-Hydration | FwFormatUtils | `10.5` → deutsches Format + Einheit | `"10,5 %"` |
| Datum | FwLayoutRules | Timestamp → lesbares Datum via Density-Format | `"15. Jan 2024"` |

```
Screen:  "15. Jan 2024: 10,5 %"
```

### Der Kreislauf

```
CSV: "10,5 %"  →  Vault: 10.5 + UNIT_PERCENT  →  Context: { valueMode: 'percent' }
                                                            ↓
Screen: "10,5 %"  ←  Re-Hydration  ←  Tooltip liest fwContext  ←  User hovert
```

Das Symbol `%` wird beim Einlesen entfernt (Strip) und beim Anzeigen wieder angehängt (Re-Hydration). Dazwischen existiert nur die nackte Zahl und ein Metadatum. **Die Einheit reist als Etikett, nicht als Teil des Werts.** Das ist KDR 10 (Unit Sovereignty) in Aktion.

**Pfad 2 — App-berechnete Daten (Daten-Bridge):** Wenn eine App-Fabrik-App Werte selbst berechnet (z.B. Depotwert über die Anteilslogik), übergibt sie die Daten bereits als typsicheres, validiertes Objekt an die Engine — kein CSV-Parsing nötig. Die Freeze-Invariante und alle Layer-3–5-Mechanismen gelten identisch. → `docs/steering/DECISION-LOG.md` D-OA-02-2