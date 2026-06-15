Stand: 2026-06-09 | Autor: Claude Sonnet 4.6 | Status: Übergabeprompt + Archivbeleg

# OA-02 — B1 Architektur-Herleitung: Wo lebt die Simulationslogik?

Zweck: Übergabeprompt für Folgearbeiten (Vertragsanpassungen, offene Entscheidungen) und
Archivbeleg, der nachvollziehbar macht, wie die Schlussfolgerungen in dieser Session
erarbeitet wurden.

Voraussetzung: Das parallel entstandene Dokument
`docs/steering/audits/OA-02-peer-review-claude-vs-perplexity-2026-06-09.md`
hat OA-02 in zwei Teile zerlegt:
- **OA-02a** (Scope) → `init(scope)` als Pflichtparameter — bereits konsentiert
- **OA-02b** (Datenpipeline) → wo lebt die Simulationslogik? — Gegenstand dieses Dokuments

---

## 1. Ausgangsfrage und Korrektur

Der Peer-Review hatte behauptet: "B1's SparplanChart hat keine CSV-Datei — die Scope-Lösung
löst B1 daher nicht."

Albert widersprach mit einem konkreten Gegenbeispiel aus der bestehenden Chart-Engine:

> "Ich kann bereits in der aktuellen Version der Chart-Engine Kurven ein- oder ausschalten
> oder Zeitfenster verändern. Dann muss der Chart auch neu berechnet werden.
> Entstehen diese Daten nicht auch erst zur Laufzeit im Browser?"

Das ist sachlich korrekt. Die Korrektur:

**Was tatsächlich gilt:**
- Die historischen MSCI-World-Renditen kommen aus einer CSV (existiert, ist produktiv).
- Die Simulation (Sparplan-Entwicklung) ist eine Transformation dieser Daten — analog zu
  einem Range-Filter oder View-Wechsel.
- Der Slider-Wert (`monatlicheRate`) ist ein Konfigurationsparameter, konzeptuell ähnlich
  wie `range:5y` bei bestehenden Charts.
- Dass "keine statische CSV für das Chart-Ergebnis existiert" stimmt — aber das gilt auch
  für gefilterte Range-Ansichten. Die Chart-Engine berechnet sie jedes Mal neu.

**Was sich dadurch ändert:**
Die Frage ist nicht mehr "CSV ja oder nein", sondern: wo genau entsteht das Rechenwerk,
und wie wird der Slider daran angebunden?

---

## 2. Wie dynamische Neuberechnung heute funktioniert

Zum Verständnis: was passiert in der bestehenden Engine bei einem Range-Wechsel?

```
Nutzer klickt "5y"
→ _bindEvents() erkennt data-action="setRange", value="5y"
→ state.range = "5y"
→ _draw(container, state)
→ strategy.transform(state.data, { range: "5y", ... })
   ↑ state.data ist immer die originale, versiegelte FinanzwesirData aus CSV
→ Strategy filtert Zeilen, berechnet Chart.js-Datasets
→ state.chartInstance.update()   ← Smart Update, kein Canvas-Neuaufbau
```

Kernpunkt: `state.data` ändert sich nie. Nur der Konfigurationsparameter `range` ändert sich.
Die Strategy rechnet aus denselben Rohdaten ein anderes Ergebnis.

**B1's Slider wäre strukturell dasselbe:**

```
Nutzer bewegt Slider auf 500€
→ event → state.config.monatlicheRate = 500
→ _draw(container, state)
→ SparplanStrategy.transform(state.data, { monatlicheRate: 500, ... })
   ↑ state.data = historische Renditen aus CSV (unverändert)
→ Strategy berechnet für jeden Monat: Depotwert(t) = Depotwert(t-1) × Rendite(t) + 500
→ state.chartInstance.update()
```

Das Muster ist identisch. Der Slider ist ein weiterer Konfigurationsparameter.

---

## 3. Das tatsächliche technische Problem

Nachdem die CSV-Frage geklärt ist, gibt es zwei konkrete technische Lücken:

### Lücke 1: Slider → ChartEngine-State

`_bindEvents()` kennt heute nur `setRange` und `setView` als Actions, reagiert auf `click`-
Events auf dem Toolbar-Element.

Ein Slider braucht:
- Reaktion auf `input`- oder `change`-Events (nicht `click`)
- Eine neue Action, z.B. `setMonthlyRate`
- Zugriff auf den internen `state` des Containers

**Offene Entscheidung:** Lohnt sich die Erweiterung von `_bindEvents()` für Slider-Events,
oder ist ein separater Bind-Mechanismus sauberer? Das hängt davon ab, wo der Slider im
DOM sitzt:
- Im `financial-chart-module`-Container → `_bindEvents()` erreichbar
- In der `fw-app`-Hülle außerhalb des Containers → anderer Kanal nötig

Antwort hängt von der HTML-Struktur ab, die für B1's Slice 4 festgelegt wird.

### Lücke 2: Wo lebt die Simulationslogik?

Das ist OA-02b. Zwei Optionen wurden vollständig analysiert.

---

## 4. Option A — Simulation in einer ChartEngine-Strategy

`SparplanStrategy` lebt in `fw-chart-engine/strategies/`. Sie bekommt die historischen
Renditen als `FinanzwesirData` und `config.monatlicheRate` als Parameter.

```
CSV (MSCI World Renditen)
  → CSVParser → FinanzwesirData (Layer 1, TABU)
  → ChartEngine._processContainer() (Layer 2)
  → SparplanStrategy.transform(data, { monatlicheRate: 300 }) (Layer 3)
      ↳ berechnet Depotwert(t) = Depotwert(t-1) × Rendite(t) + 300
      ↳ packt fwContext mit valueMode, currency, rhythm
  → FwSmartScales / FwRenderer (Layer 4/5)
  → Chart
```

**Vorteile:**
- Passt sofort ins bestehende Layer-Muster
- Smart-Update-Pfad (`chart.update()`) funktioniert automatisch
- A11y, Theming, Responsive — alles kostenlos
- Slider kann als `data-action` in den bestehenden Event-Mechanismus eingehängt werden
- Zero neue Infrastruktur

**Nachteile:**
- Design-Fehler: Die Strategy soll **transformieren**, nicht domain-spezifisch **berechnen**.
  KDR (Layer 3): "Wandeln neutrale Daten in spezifische Chart-Konfigurationen um."
  Eine Sparplan-Simulation ist keine neutrale Datentransformation — sie ist Finanzlogik.
- B1 braucht die Simulationsergebnisse an **mehreren Stellen**: als Chart-Linie,
  als KPI-Karte ("Depotwert heute: 52.000 €"), als Ergebnissatz. Wenn die Logik in der
  Strategy sitzt, sind diese Werte im Chart-Output eingeschlossen und schwer herauszulösen.
- Skalierungsproblem: Bei 20+ Apps bekommt jede berechnungsintensive App eine eigene
  Strategy. `fw-chart-engine/strategies/` wird zum Sammelsurium aus Visualisierungs- und
  Domänenlogik.

---

## 5. Option B — Simulation in app.js, Bridge zur ChartEngine

`MarketTimeStrategy` (oder äquivalente Logik) lebt in `Apps/prokrastinations-preis/app.js`.
Sie rechnet die Simulation und übergibt das Ergebnis als versiegelte Datenstruktur an die
ChartEngine zum Zeichnen.

```
CSV (MSCI World Renditen)
  → CSVParser → FinanzwesirData (Layer 1 — wie bisher)
  → app.js liest die Daten (read-only)
  → Slider-Wert (monatlicheRate = 300)
  → MarketTimeStrategy.compute(renditen, 300)
      ↳ berechnet chartSeries[], depotwertHeute, eingezahlt
  → chartSeries wird in FinanzwesirData-Struktur verpackt + Object.freeze()
  → Übergabe an ChartEngine via Bridge (OA-02b-Detail)
  → LineChartStrategy.transform(syntheticData, config) (Layer 3 — wie bisher)
  → Chart
```

**Vorteile:**
- Klare Trennung: app.js **denkt**, ChartEngine **zeichnet**
- `depotwertHeute` und `eingezahlt` stehen in app.js für KPI-Karten und Ergebnissatz
  zur Verfügung — kein Herausgreifen aus Chart-Metadaten
- ChartEngine bleibt sauber: Strategies sind Visualisierungs-Transformatoren, sonst nichts
- 20+ Apps: jede App enthält ihre Domänenlogik in ihrer eigenen `app.js` — unabhängig,
  isoliert, testbar ohne Chart-Stack
- Simulation isoliert testbar

**Nachteile:**
- Braucht einen Bridge-Mechanismus (OA-02b-Detail): wie kommen berechnete Daten in die
  ChartEngine?

---

## 6. Bewertung gegen das Architecture Strategy Paper

Das Architecture Strategy Paper (V12.0.0, `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`)
legt fest:

**Grundgesetz:** Unidirektionaler Datenfluss. Layer 1 → 2 → 3 → 4 → 5.
Kein Layer schreibt in einen höheren Layer.

**Vault-Prinzip:** Rohdaten werden versiegelt (`Object.freeze()`), danach unveränderlich.

**Layer 3 (Strategies):** "Wandeln **neutrale Daten** in spezifische Chart-Konfigurationen um."

Option B gegen diese Prinzipien:

| Prinzip | Option B — Bewertung |
|---|---|
| Unidirektionaler Fluss | ✅ Innerhalb der Engine weiterhin Layer 1→5. Einstiegspunkt erweitert sich. |
| Vault / Object.freeze() | ✅ Berechnetes Ergebnis wird versiegelt übergeben. Freeze-Prinzip gilt. |
| Layer 3: neutrale Transformation | ✅ Strategy transformiert Daten → Chart. Weiß nicht, woher die Daten stammen. |
| fwContext / Rucksack | ✅ Strategy packt ihn weiterhin korrekt. |
| Single Source of Truth | ⚠️ Leichte Erweiterung: Vault-Befüllung kommt nicht mehr nur aus CSV, sondern auch aus verarbeiteter Berechnung. Widerspricht dem Geist des Papers nicht — das Paper kennt die App-Fabrik noch nicht. |

**Fazit:** Option B ist mit dem Architecture Paper konsistent. Die einzige Erweiterung:
Layer 1 wird nicht ausschließlich durch CSVParser befüllt, sondern kann auch eine
berechnete, versiegelte Datenstruktur empfangen. Das ist eine natürliche Erweiterung,
kein Bruch.

---

## 7. Was Amazon, Netflix, Google machen würden

Alle drei kamen zum selben Ergebnis, mit unterschiedlicher Begründung:

**Amazon (API-first):** "ChartEngine-API-Vertrag: du gibst mir Daten, ich zeichne."
Simulation ist Domänenlogik, nicht Visualisierungsinfrastruktur. Option B.

**Netflix (kein frühzeitiger Overhead):** Würde nie Domänenlogik in Infrastruktur stecken,
weil das Extraktion später unmöglich macht. Natürliche Teilung von Anfang an. Option B.

**Google (Plattform-Denken):** "Was ist die Invariante der ChartEngine?" — sie visualisiert.
Simulation in Strategies bricht die Invariante. Bei 20+ Apps kämpft jeder neue Engineer
gegen einen Monolith. Option B.

---

## 8. Offene Entscheidungen für Folgearbeiten

### OA-02a — Scope (bereits konsentiert)

`ChartEngine.init()` bekommt einen Pflichtparameter `scope: HTMLElement`.
Kein Fallback auf `document`. Caller entscheidet:
- Standalone-Charts: `engine.init(document)` (oder ein bekannter Root-Container)
- App-Fabrik-Apps: `engine.init(appContainer)`

**Nächster Schritt:** Full-Gate auf `ChartEngine.js`. Signatur und Fehlerbedingung
(kein DOM-Element → Fehler) festlegen. `APP-INTERFACE.md` §4 aktualisieren.

### OA-02b — Datenpipeline (noch offen)

**Entscheidung: Option B (Simulation in app.js)** — konsentiert in dieser Session.

Offen: welcher konkrete Bridge-Mechanismus?

**Kandidat C2:** `ChartEngine.renderFromData(container, finanzwesirData, type, options)`
- Neue öffentliche Methode in `ChartEngine.js`
- ~40 Zeilen, Full-Gate-pflichtig
- Überspringt den CSV-Lade-Schritt, steigt direkt mit `FinanzwesirData` in
  `_buildState()` / `_draw()` ein
- Slider-Lifecycle: app.js hält Referenz auf `state` (oder Engine gibt Callback zurück)
  und ruft erneut `renderFromData()` bei jedem Slider-Tick auf

**Kandidat C3:** `FwAppChart`-Wrapper mit `render() / update(newSeries) / destroy()`
- Neue Datei außerhalb der Core-Engine
- Saubererer Slider-Lifecycle
- Extraktion nach Pilot-2 wenn mehrere Apps denselben Bedarf zeigen (Netflix-Prinzip)

**Empfehlung:** C2 für B1. C3 nach Pilot-2 wenn der Schmerz real ist.

### Slider-Binding (zu prüfen vor Slice-4-Gate)

- Wo sitzt der Slider im DOM? Im `financial-chart-module` oder in der `fw-app`-Hülle?
- Kann `_bindEvents()` um `input`-Events und eine `setMonthlyRate`-Action erweitert werden?
- Falls ja: kein separater Bridge-Mechanismus für den Slider nötig.
- Falls nein: app.js hält Slider-Listener und ruft `renderFromData()` direkt auf.

**Nächster Schritt:** HTML-Struktur für Slice 4 definieren, dann entscheiden.

### detectRhythm()-Verifikation (Pflicht vor Implementierung)

`FwDateUtils.detectRhythm()` muss mit synthetisch generierten Monatsdaten
(28–31-Tage-Varianz) stabil MONTHLY erkennen.

Noch nicht verifiziert. Muss vor dem ersten renderFromData()-Aufruf mit Sparplan-Daten
geprüft werden. Kein Gate ohne diese Verifikation.

### A11y-Lücke (zu klären)

`getA11yData()` existiert in den Strategies. Unklar: wird das Ergebnis tatsächlich
korrekt in den DOM injiziert (`FwRenderer._renderA11yTable()`)? Vor Slice-4-Gate prüfen.

---

## 9. Was sich an bestehenden Verträgen ändern muss

### APP-INTERFACE.md §4 (Interner Entwicklervertrag)

Heute: "Der genaue Entwicklervertrag ist OA-02 und bleibt offen."

Nach OA-02a + OA-02b muss §4 konkret werden:

```
OA-02a: ChartEngine.init(scope: HTMLElement): Promise<void>
- scope ist Pflicht. Kein Fallback auf document.
- Fehler wenn scope kein HTMLElement oder kein DOM-Element.

OA-02b: ChartEngine.renderFromData(
  container: HTMLElement,
  data: FinanzwesirData,
  type: 'line' | 'bar' | 'pie',
  options?: object
): void
- Überspringt CSV-Lade-Schritt.
- Erwartet versiegeltes FinanzwesirData-Objekt.
- Slider-Updates: erneuter Aufruf mit neuen Daten.
```

### NAVIGATION.md → App bauen-Routing

Schritt 13 ("bei Chart-Nutzung: relevante Chart-Engine-Spec lesen") muss nach OA-02b
konkretisiert werden: welche Spec beschreibt den `renderFromData()`-Vertrag?

### 03_APP_FACTORY_STANDARD_DRAFT.md §1a + §9 (Chart-Engine respektieren)

§9 heute: "Apps, die Charts nutzen, greifen auf die Chart-Engine als Subsystem zu —
kein direktes Canvas-Rendering an ihr vorbei."

Nach OA-02b ergänzen: "Die Schnittstelle ist `renderFromData()`. Die App berechnet Daten
in app.js und übergibt ein versiegeltes FinanzwesirData-Objekt. Die Strategy weiß nicht,
dass die Daten berechnet wurden."

---

## 10. Zusammenfassung in einem Satz je Entscheidung

| Entscheidung | Ergebnis |
|---|---|
| Wo die Simulationslogik lebt | app.js (Option B) |
| Begründung | Domänenlogik und Visualisierungsinfrastruktur trennen; Chart-Ergebnis und KPI-Ergebnis aus derselben Quelle |
| Bridge-Mechanismus | C2 (`renderFromData`) für B1; C3 nach Pilot-2 evaluieren |
| Scope | `init(scope)` Pflichtparameter — OA-02a, bereits konsentiert |
| Architecture Paper | Option B konsistent; Vault-Prinzip auf berechnete Daten erweiterbar |
| detectRhythm() | Verifikation offen — Pflicht vor Implementierung |
| Slider-Binding | HTML-Struktur festlegen, dann entscheiden |

---

## 11. Einstieg für den nächsten Thread

Kontext, den der nächste Thread braucht:

1. OA-02 ist entschieden: Simulation in app.js, Bridge via `renderFromData()` (C2).
2. Scope: `init(scope)` Pflichtparameter — Full-Gate auf `ChartEngine.js` steht aus.
3. Vor Slice 4: HTML-Struktur definieren (Slider-Position), `detectRhythm()`-Verifikation,
   A11y-Lücke klären.
4. Nach Slice 4: `APP-INTERFACE.md` §4 konkretisieren,
   `03_APP_FACTORY_STANDARD_DRAFT.md` §9 aktualisieren.
5. Pilot-2-Abschluss: evaluieren ob C3 (`FwAppChart`) extrahiert wird.

Relevante Dateien:
- `docs/spec/APP-INTERFACE.md` §4 (Entwicklervertrag — heute noch offen)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (Änderungsziel OA-02a + OA-02b)
- `Apps/prokrastinations-preis/SLICE_PLAN.md` (Slice 4 SparplanChart)
- `Apps/prokrastinations-preis/APP_SPEC.md` §17 (SparplanChart-Anforderungen)
- `docs/steering/audits/OA-02-peer-review-claude-vs-perplexity-2026-06-09.md` (Kontext)
