# HANDOVER — APP-01 Slice 4 / ChartEngine Pfad 2 / OA-02

Stand: 2026-06-10 | Session: APP-01-Slice-4-Gate | Geändert von: Claude

---

## 1. Kurzstatus

**App:** `prokrastinations-preis` (B1, Pilot-2 — Daten-/Chart-/Story-Pilot)
**Spec:** `Apps/prokrastinations-preis/APP_SPEC.md` V1.7
**Slice-Plan:** `Apps/prokrastinations-preis/SLICE_PLAN.md`

**Slices 0–3 sind fertig und getestet:**
- Slice 0: App-Shell, Slug-Prüfung, URL-Attribut-Lesen, State-Maschine
- Slice 1: CSV-Datenladen, Datenvalidierung, Daten-States (Loading / Content / Error / Empty)
- Slice 2: MarketTimeStrategy, KpiCards (eingezahlt / depotwertHeute / differenz)
- Slice 3: Slider monatlicheRate (50–2.000 €), data-fw-options-Parsing, ARIA

`Apps/prokrastinations-preis/app.js` hat 346 Zeilen. Enthält: Shell, CSV-Laden via CSVParser.js, MarketTimeStrategy (Anteilslogik), KpiCard-Renderer, Slider mit Live-Update, ARIA Live Region.

**Was fehlt: Slice 4 — SparplanChart.**
Der Chart existiert noch nicht. Es gibt noch keine Slice-4-Implementierung.

**Warum dieser Braindump:** Der aktuelle Faden ist voll. Der neue Faden soll mit einer Spec-Trace-Matrix starten, bevor er einen Gate-Plan formuliert.

---

## 2. Laienziel von Slice 4

Die App soll dem Nutzer nicht nur Zahlen zeigen — sie soll die Wirkung von Marktzeit sichtbar machen.

Der Chart zeigt den simulierten Depotwert Monat für Monat über die letzten 10 Jahre. Die Datenreihe basiert auf echten MSCI-World-Monatsdaten. Der Nutzer gibt eine monatliche Sparrate ein (Slider) und sieht: Wäre ich früher gestartet, hätte mein Depot so ausgesehen — mit echten Einbrüchen, ohne geglättete Traumkurve.

Kernbotschaft: Warten ist nicht neutral. Die Lücke zwischen „eingezahlt" und „Depotwert" wächst mit der Zeit — aber nur wer dabei war, hat Marktzeit gesammelt.

Verantwortungstrennung:
- **App rechnet:** Slider lesen, AppContext aktualisieren, `chartSeries` berechnen (120 Datenpunkte, `{ month: 'YYYY-MM', depotwert: number }`)
- **ChartEngine zeichnet:** Visualisierung, Achsen, Skalen, Tooltip, Responsive, Chart-State

---

## 3. Bindende Entscheidungen

- Kein app-lokaler `new Chart(...)` in `Apps/prokrastinations-preis/app.js`
- Kein app-lokaler Canvas-/Chart.js-Renderer in APP-01
- Pfad 2 läuft über ChartEngine — die App übergibt berechnete Daten, ChartEngine zeichnet
- Es braucht eine neue programmatische Einstiegsfunktion in `ChartEngine.js`, Arbeitstitel `renderFromData()`
- `init()` für `.financial-chart-module` bleibt vollständig unverändert
- Bestehende `.financial-chart-module`-Charts werden nicht migriert
- App-berechnete Charts bekommen einen separaten Zielcontainer (nicht `financial-chart-module`)
- Container-Konvention aktueller Stand: `data-fw-appchart="sparplan"` (data-Attribut, kein class)
- ChartEngine darf keine APP-01-Domainlogik enthalten — kein Begriff „Sparplan" in ChartEngine
- Kein `SparplanAdapter` in ChartEngine — weder als Klasse, Datei noch als benanntes Inline-Objekt
- ChartEngine bleibt Manager/Bridge (Layer 2) — nimmt keine neue Strategie-Logik auf

---

## 4. Die drei OA-02 Advocatus-Diaboli-Risiken

### Risiko 1 — Legacy-Vertrag wird fälschlich als abgelöst interpretiert

Muss gelten:
- `financial-chart-module` bleibt ausschließlich der deklarative CSV-/Legacy-Vertrag
- wird nicht für app-berechnete Daten verwendet
- keine Migration bestehender Charts
- kein Mischbetrieb im selben Container

### Risiko 2 — Falscher Adapter-/Sonderlayer entsteht

Muss gelten:
- kein zweiter Chart-Sonderweg außerhalb der ChartEngine
- keine app-lokale Chart.js-Welt
- keine Mini-Strategy im falschen Layer
- bestehende ChartEngine-/Strategy-/Renderer-Schichten werden genutzt

### Risiko 3 — `fw-appchart` wird vorschnell verfestigt

Aktueller Stand:
- class `fw-appchart` nicht verwenden (Risiko CSS-Kollision)
- data-Attribut: `data-fw-appchart="sparplan"`
- Container lokal innerhalb `.fw-app` finden: `this.container.querySelector('[data-fw-appchart]')`
- kein globaler DOM-Scan
- Guard gegen `financial-chart-module` class und `data-csv` attribute am Container

---

## 5. Was in den bisherigen Gate-Revisionen passierte

### Revision 1

`renderFromData()` als minimale ChartEngine-Erweiterung vorgeschlagen. Container-Konvention noch nicht entschieden (`data-fw-role="appchart"` vs. spezifischerer Wert). Noch zu wenig gegen Architecture Strategy Paper und bestehende Engine-Architektur geprüft.

### Revision 2

Kernproblem erkannt: `renderFromData()` teilte keinen Code-Pfad mit `_processContainer()` und hätte eine eigene Inline-Chart.js-Config aufgebaut:

```
Pfad 1: CSV → bestehende Engine
Pfad 2: Daten → eigene Inline-Chart.js-Config in renderFromData()
```

Das wäre ein Engine-interner Bypass — zweites Chartsystem innerhalb ChartEngine.

### Revision 3

`_draw()` als gemeinsamer Render-Kern identifiziert. Container-Konvention auf `data-fw-appchart="sparplan"` korrigiert (Alberts Präferenz akzeptiert). Neutraler Adaptername statt `SparplanAdapter`. `tooltipDateMode: 'month'` ergänzt. Besser, aber Layer-Frage noch nicht gelöst.

### Revision 4

Validierung, Freeze (Layer-1-Invariante), A11y (KDR 13), fwContext (KDR 9), Unit Sovereignty (KDR 10), Zeitachse mit ms-Timestamps statt Kategorieachse ergänzt. Aber das Hauptproblem blieb ungelöst:

Das vorgeschlagene `appDataLineStrategy` (inline object literal in `ChartEngine.js`) enthielt:
- `transform()` mit Datenumwandlung
- `getChartConfig()` mit fwContext-Befüllung
- `getA11yData()` mit Tabellenerzeugung
- Zeitlogik (ms-Konvertierung)

All das gehört in Layer 3, nicht in Layer 2. Revision 4 nicht freigegeben.

---

## 6. Wichtigste Erkenntnis aus Revision 4

**Revision 4 ist nicht freigegeben.**

`ChartEngine.js` ist laut Architecture Strategy Paper (VX.md) Layer 2: Manager, State Holder, Orchestration. Layer 2 hält State, steuert Render-Zyklen, delegiert an Strategien — es transformiert keine Daten, packt kein `fwContext` und erzeugt keine A11y-Tabellen.

Ein inline `appDataLineStrategy`-Objekt in `ChartEngine.js` verschiebt Transformation, ChartConfig, Zeitachsenlogik, `fwContext`, A11y und Unit-Sovereignty-Logik in Layer 2. Das widerspricht dem Architecture Strategy Paper explizit.

Die richtige Frage, die Revision 4 nicht gestellt hat: Kann `renderFromData()` die App-Daten in ein Format bringen, das die **bestehende `LineChartStrategy`** (Layer 3) direkt verarbeiten kann — statt neue Logik in Layer 2 zu bauen?

---

## 7. Vermutete richtige Richtung für Revision 5

Noch keine Implementierung. Arbeitshypothese:

**Richtig:**
```
APP-01 chartSeries
→ ChartEngine.renderFromData()
   (Layer 2: Guard, Validierung, Freeze, Übersetzung in kanonisches Format)
→ bestehende LineChartStrategy (Layer 3)
   (transform(), getChartConfig() mit fwContext, getA11yData())
→ _draw()
```

**Falsch (Revision 4):**
```
APP-01 chartSeries
→ renderFromData()
   → inline appDataLineStrategy in ChartEngine.js
      (Transformation, fwContext, A11y — alles in Layer 2)
→ _draw()
```

Die zentrale Frage: Was ist das kanonische Datenformat, das `LineChartStrategy.transform()` erwartet? Kann `chartSeries` (`[{ month, depotwert }]`) in dieses Format übersetzt werden, ohne `LineChartStrategy` zu ändern — oder braucht es eine minimale, sauber platzierte Erweiterung?

---

## 8. Offene Kernfragen für den neuen Faden

Der neue Faden muss zuerst eine **Spec-Trace-Matrix** liefern, bevor er einen Plan formuliert.

Pflichtfragen:

1. Welche kanonische Datenstruktur erwartet `LineChartStrategy.transform()`? (`rows`, `columns`, `metadata` — wie sehen diese konkret aus?)
2. Kann `chartSeries` (`[{ month: 'YYYY-MM', depotwert: number }]`) in dieses Format übersetzt werden?
3. Wie sehen `columns`, `rows`, `metadata.unitKey` für einen monatlichen EUR-Depotwert-Datensatz konkret aus?
4. Wie bleiben Daten validiert, kopiert und eingefroren (Layer-1-Freeze-Invariante)?
5. Wie nutzt der Pfad bestehende Schichten: `LineChartStrategy`, `FwDateUtils`, `FwSmartScales`, `sourceTicks`, `fwContext`, A11y, Unit Sovereignty?
6. Welche UI-Elemente erzeugt `LineChartStrategy` + `_draw()` automatisch? (Range-Buttons? View-Toggle? BAN? Legende?) Sind diese für APP-01 Slice 4 gewünscht oder müssen sie deaktiviert werden?
7. Wenn deaktivieren: Reicht State-Konfiguration (`viewOptions: []`, `config.headline: null`, `interactiveFilters: null`) oder muss `_draw()` minimal erweitert werden?
8. Welche Dateien wären bei der richtigen Lösung wirklich zu ändern?
9. Wie bleibt `init()` vollständig unberührt?
10. Wie wird Mischbetrieb sicher verhindert (Guards, WeakMap, Container-Marker)?

---

## 9. Relevante Dateien

```
docs/spec/ARCHITECTURE STRATEGY PAPER VX.md           ← bindende Architektur-Referenz
docs/spec/APP-INTERFACE.md                            ← Pfad-1/Pfad-2-Vertrag §4
docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md  ← Rolle der Engine, P-01–P-10
Apps/prokrastinations-preis/SLICE_PLAN.md             ← Slice-Übersicht, OA-02-Gate
Apps/prokrastinations-preis/APP_SPEC.md               ← fachliche Spec, AppContext §11, §13
Apps/prokrastinations-preis/app.js                    ← aktueller Implementierungsstand
Apps/prokrastinations-preis/app.css
Apps/prokrastinations-preis/app.test.html
Theme/assets/js/fw-chart-engine/core/ChartEngine.js           ← Layer 2
Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js ← Layer 3 (Zielstrategie)
Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js ← Layer 3 (Basis)
Theme/assets/js/fw-chart-engine/core/FwRenderer.js            ← Layer 5
Theme/assets/js/fw-chart-engine/core/FwSmartScales.js         ← Layer 4
Theme/assets/js/fw-chart-engine/core/FwDateUtils.js           ← Layer 4, SSoT Zeit (VORSICHT)
Theme/assets/js/fw-chart-engine/core/FwFormatUtils.js         ← Layer 5
Theme/assets/js/fw-chart-engine/data/CSVParser.js             ← Layer 1 (TABU — nicht lesen als Vorlage für Änderungen)
Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js       ← Layer 1 (TABU)
```

---

## 10. Tabu / Nicht anfassen ohne explizite Freigabe

- `CSVParser.js` — TABU
- `FinanzwesirData.js` — TABU
- `FwDateUtils.js` — TABU (SSoT Zeit; bei Bedarf nur lesen, nie ändern ohne Gate)
- Alle bestehenden `.financial-chart-module`-Charts — keine Migration
- Keine neue ChartEngine-Gesamtarchitektur
- Kein app-lokaler Chart.js-Renderer
- Kein `new Chart(...)` in APP-01
- Keine Domainlogik in ChartEngine (`SparplanAdapter`, `SparplanStrategy` o.ä.)
- Kein `inline appDataLineStrategy` in `ChartEngine.js` — das ist Layer-2-Verschmutzung
- Keine Implementierung ohne Gate-Freigabe durch Albert

---

## 11. Spec-Trace-Prompt für den neuen Faden

```md
# Prompt für neuen Claude-Faden — Spec-Trace vor APP-01 Slice 4

Du arbeitest im Repo `Finanzwesir-code`.

Lies zuerst diese Übergabedatei vollständig:

`docs/steering/handovers/HANDOVER-APP-01-SLICE-4-CHARTENGINE-PFAD-2-2026-06-10.md`

Du bist nicht zur Implementierung freigegeben.

Bevor du einen Plan formulierst, erstelle eine Spec-Trace-Matrix.

Lies dafür mindestens:

- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`
- `docs/spec/APP-INTERFACE.md` §4
- `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md`
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`
- relevante Renderer-/SmartScale-/DateUtils-Dateien nur soweit nötig

Gib eine Tabelle aus:

| Thema | Spec sagt | Zuständige Datei / Layer | Konsequenz für Slice 4 | Verbotene Abkürzung |
|---|---|---|---|---|

Pflichtthemen:

1. Daten-Bridge / Layer 1
2. Orchestration / Layer 2
3. Transformation / Layer 3
4. Zeitlogik / FwDateUtils
5. SmartScales / Achsen
6. fwContext
7. A11y
8. Unit Sovereignty
9. Container / Mischbetrieb
10. APP-01 Verantwortung

Danach beantworte:

1. Welche Annahme aus Revision 4 war falsch?
2. Welche Logik lag in Revision 4 im falschen Layer?
3. Welche bestehende Datei muss stattdessen genutzt oder minimal erweitert werden?
4. Was darf `ChartEngine.renderFromData()` maximal tun?
5. Welche Lösung ist nach Spec die kleinste korrekte Lösung?

Keine Datei ändern.
Keinen Code schreiben.
Nur Spec-Trace-Matrix, Selbstkorrektur und Vorschlag für den nächsten Gate-Plan liefern.
Dann warten auf Albert.
```

---

## 12. Abschluss

```
Braindump erstellt.
Keine Implementierung.
Keine Code-Dateien geändert.
Nächster Schritt: neuer Claude-Faden mit Spec-Trace-Prompt.
```
