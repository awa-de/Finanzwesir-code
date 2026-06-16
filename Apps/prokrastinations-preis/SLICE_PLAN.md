> [!note] AKTUELLE VERSION — Neue Mechanik (Marktzeit)
>
> Diese Datei ersetzt `SLICE_PLAN.md` (alte Calculator-Mechanik, 2026-05-11).
> Basis: `APP_SPEC.md` V1.6 + RFC (~95% verbindlich) + Decision Log.

---

# SLICE_PLAN — prokrastinations-preis

Stand: 2026-06-16 | Session: APP-01-Slice6 | Geändert von: Claude

---

## Status

| Feld | Wert |
|---|---|
| App | prokrastinations-preis (B1) |
| Pilot-Rolle | Pilot-2 — Daten-/Chart-/Story-Pilot (D-APP-01-E02) |
| APP_SPEC | V1.6 (2026-06-04) |
| Spec-Gate | OK erteilt 2026-06-04 (mündlich durch Albert) |
| Pre-Code-Gate | OK 2026-06-04 (Full-Gate, 9 Fragen) |
| Freigabe Slice 0 | OK 2026-06-04, getestet ✅ (Szenarien A–G) |
| Freigabe Slice 1 | OK 2026-06-05, getestet ✅ (Szenarien A–N) |
| Freigabe Slice 2 | OK 2026-06-05, getestet ✅ (Szenarien A–P, KpiCards 36.000 € / 72.176 € / +36.176 €) |
| Freigabe Slice 3 | OK 2026-06-05, getestet ✅ (Szenarien A–T, Viewport 375px, Slider-Interaktion) |
| Freigabe Slice 4 | OK 2026-06-11, getestet ✅ (SparplanChart, Chart.js, Szenarien S–U) |
| Freigabe Slice 5 | OK 2026-06-15, getestet ✅ (Szenarien S–X, Screen-Flow 1→4, Diskussion 2026-06-15 abgeschlossen) |
| Nächster Schritt | Slice 7 — A11y-Härtung + Responsive (nach UX-Entscheidung Screen-Flow) |

---

## Grundsatzentscheidungen (~95% verbindlich, Quelle: RFC + Decision Log)

| Entscheidung | Quelle | Status |
|---|---|---|
| Vanilla JS, kein Framework, kein Bundler | RFC §D1, D2 | 🟢 |
| ES-Modul, kein globaler Namespace | OA-01, Chart-Engine-Muster | 🟢 |
| `async initApp()`, `async loadData()` | A-11 | 🟢 |
| `Object.freeze()` für AppData nach Parsing | A-09 | 🟢 |
| Two-Step Parsing (Syntax → Semantik) | A-10 | 🟢 |
| CSS-Namespace: ausschließlich `.fw-app` | RFC §D3 | 🟢 |
| Theme-Tokens via CSS Custom Properties; Fallbacks erlaubt bis NB-3 | A-04, A-17, RFC §D4 | 🟢 |
| Keine globalen IDs im App-Container | Q-03 | 🟢 |
| SafeDOM: kein `innerHTML` für Nutzdaten | Q-01 | 🟢 |
| `data-fw-options` Whitelist-Prinzip | Q-02 | 🟢 |
| app-lokal: kein Core vor App-2 | RFC §D8 | 🟢 |
| Lokale `app.test.html`, kein E2E | RFC §D6 | 🟢 |
| CSVParser.js + FinanzwesirData.js: TABU (nicht ändern) | CLAUDE.md | 🟢 |
| Berechnungsformel: Anteilslogik | B-02, APP_SPEC §7.10 | 🟢 |
| Screen-Flow: Button-getrieben, kein Autoplay | B-03, APP_SPEC §14.3 | 🟢 |

---

## Offene Architekturfragen

### OA-01 — ES-Modul für app.js (ENTSCHIEDEN 2026-06-04)

`app.js` wird als ES-Modul geschrieben (`<script type="module">`). Kein IIFE-Wrapper.

**Begründung:** Exakt das Muster der Chart-Engine — `ChartEngine.js` importiert `CSVParser` direkt mit `import { CSVParser } from '../data/CSVParser.js'`. Das RFC-Prinzip „kein globaler Namespace" ist mit ES-Modulen genauso erfüllt, konsistent mit der bestehenden Codebasis.

Slice-1-Import: `import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js'`
Produktionspfad (Ghost-Upload): offen (NB-4).

### OA-02 — SparplanChart: Bibliothek und Integrationsform (Pflicht vor Slice 4)

APP_SPEC §17 SF-01: „Chart-Engine-Integration: welche Bibliothek / welche Komponente für SparplanChart?"
Diese Frage ist nach B-01-Entscheidungen weiterhin offen.
**Muss vor Slice 4 entschieden sein.**

---

## Slice-Übersicht

| Slice | Ziel | Layer | Voraussetzung | Status |
|---|---|---|---|---|
| **0** | App-Shell + Slug-Prüfung + URL-Attribut-Lesen + State-Maschine | Ghost-Card → Bootstrap → State → CSS | — | ✅ 2026-06-04 |
| **1** | CSV-Datenladen + Datenvalidierung + Daten-States | Fetch → CSVParser → Validierung → AppData | OA-01 entschieden ✓ | ✅ 2026-06-05 |
| **2** | MarketTimeStrategy + KpiCards | AppData → Strategy → AppContext → Renderer | Slice 1 | ✅ 2026-06-05 |
| **3** | Slider monatlicheRate | UI → Event → Clamp → Strategy → AppContext → Renderer → ARIA | Slice 2 | ✅ 2026-06-05 |
| **4** | SparplanChart | AppContext → Chart-Renderer | Slice 2 + OA-02 entschieden | ✅ 2026-06-11 |
| **5** | 4-Screen-Flow (Button-getrieben) | Screen-Controller → Fokus-Management | Slice 2 + 3 | ✅ 2026-06-15 |
| **6** | VertikaleLinie + AssumptionsBox | Chart-Erweiterung + TextBlock + PrimaryCta | Slice 4 + 5 | ✅ 2026-06-16 |
| **7** | A11y-Härtung + Responsive | app.js, app.css | Slice 6 | Offen |
| **8a** | QA / Testseite vollständig | app.test.html | Slice 7 | Offen |
| **8b** | Ghost-Integrationstest | Ghost-Deploy | NB-4 (Bootstrapper + Upload-URL) | Offen |

---

## Slice 0 — App-Shell + Slug-Prüfung + URL-Attribut-Lesen + State-Maschine

### Ziel

Beweisen: Container wird erkannt, Slug-Prüfung funktioniert, `data-fw-data`-URL wird als Attribut gelesen (aber **nicht validiert und nicht gefetcht**), States schalten sauber.

### Nutzerwert

„Die App startet, zeigt den richtigen State, stürzt nicht ab." — kein leerer Container, kein Stack-Trace, kein XSS.

### Betroffene Layer

Ghost-Card → Bootstrap → URL-Leser → State-Renderer → CSS

### Erlaubte Dateien (exakt — alle NEU)

```
Apps/prokrastinations-preis/app.js
Apps/prokrastinations-preis/app.css
Apps/prokrastinations-preis/app.test.html
Apps/prokrastinations-preis/ghost-card.example.html   ← optional
```

Keine bestehende Datei wird verändert. Keine Dateien außerhalb dieses Ordners.

### Was Slice 0 NICHT enthält

- Kein CSV-Fetch, kein CSVParser.js-Import
- Keine Berechnung (MarketTimeStrategy, Anteilslogik)
- Kein Slider, kein Input-Handler, kein data-fw-options-Parsing
- Kein Screen-Flow, kein SparplanChart, keine KpiCards mit echten Zahlen
- Kein Shadow DOM, kein Framework, kein Build-System
- Keine Dateien außerhalb `Apps/prokrastinations-preis/`
- Keine URL-/Domain-Validierung in Slice 0; diese kommt in Slice 1 im Datenladepfad zusammen mit CSVParser/Daten-States.
- Fehlendes `data-fw-data` ist nur in Slice 0 kein Error-State, weil Slice 0 keinen Datenladepfad hat. Ab Slice 1 muss fehlendes, leeres oder ungültiges `data-fw-data` über den Daten-State-Pfad behandelt werden.

### Akzeptanzkriterien

| ID | Kriterium |
|---|---|
| A0-1 | Minimal-Card mit `data-fw-data` → Content-State mit Platzhalter sichtbar, kein leerer Container |
| A0-2 | Ungültiger Slug → Error-State (a): „Diese App konnte nicht geladen werden." — kein Stacktrace |
| A0-3 | Fehlender `data-fw-app`-Slug → Error-State (a): gleiche Meldung |
| A0-4 | Loading-State implementiert; darf sofort in Content/Error übergehen; kein künstlicher Timeout |
| A0-5 | Kein `innerHTML` für Nutzdaten, Fehlertexte oder Platzhalter — ausschließlich `textContent` |
| A0-6 | Keine JS-Exception in Browser-Konsole bei allen Testszenarien |
| A0-7 | Kein horizontaler Overflow bei 375px, 768px, 1280px |
| A0-8 | XSS-Versuch in `data-fw-options`: kein Alert, kein innerHTML, App stabil |
| A0-9 | Mehrere Container: alle initialisiert, `data-fw-initialized`-Guard aktiv, kein doppelter DOM-Node |
| A0-10 | CSS-Leak: Ghost-Elemente neben `.fw-app` visuell unverändert |

### Testaufruf (Albert)

`app.test.html` im VSCode Live Server öffnen (`http://127.0.0.1:5500/...`).
Szenarien A–G durchlaufen. DevTools: Console auf Fehler. Viewport: 375px / 768px / 1280px.

Relevante APP_SPEC-Testfälle: T-02, T-08, T-10, T-16.

---

## Slice 1 — CSV-Datenladen + Datenvalidierung + Daten-States

### Voraussetzung

OA-01 entschieden: `app.js` als ES-Modul (`<script type="module">`), folgt Chart-Engine-Muster (2026-06-04).

### Ziel

Beweisen: CSV wird über CSVParser.js geladen, Format korrekt validiert, `unitKey = CURRENCY_EUR` geprüft, alle Daten-States korrekt implementiert.

### Was drin ist

- Echter `fetch` via CSVParser.js (Weg je nach OA-01-Entscheid)
- Domain-Validierung: `www.finanzwesir.com` oder `localhost` (APP_SPEC §15 Regel 2)
- CSV-Validierung: Pflichtfelder `date` + `index_value`, ≥ 120 Zeilen, `unitKey = CURRENCY_EUR`
- Mapping: `index_value` (CSV snake_case) → `indexValue` (JS camelCase) bei CSV → AppData
- `Object.freeze()` für AppData (A-09): `{ msciData, latestMonth, startMonth, periodMonths: 120, currency: 'EUR', locale: 'de-DE' }`
- Alle Daten-States: Loading, Content-Gerüst (Zahlen noch 0/Platzhalter), Error (b), Error (c), Empty
- A11y: Lade-Indikator im Content-State (kein leerer Container während Loading)

### Was NICHT drin ist

- Keine Berechnung (MarketTimeStrategy kommt in Slice 2)
- Kein Slider, kein Chart, kein Screen-Flow

### Neue Testszenarien

Erweitert app.test.html aus Slice 0 um: T-03, T-04, T-05, T-06, T-07, T-07a, T-07b.

---

## Slice 2 — MarketTimeStrategy + KpiCards

### Voraussetzung

Slice 1 abgeschlossen und bestätigt.

### Ziel

Berechnung läuft mit Default-Werten (300 €/Monat), KpiCards zeigen echte Zahlen.

### Was drin ist

- MarketTimeStrategy: Anteilslogik (APP_SPEC §7.10, §13 Schritt 4)
- AppContext (statischer Kern + dynamische Schale, APP_SPEC §11)
- KpiCard-Renderer: `eingezahlt`, `depotwertHeute`, `differenz` via `textContent`
- Formatierung: `Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })`
- `a11ySummary`-Text in ARIA Live Region via `textContent`
- Vorzeichen-Formatierung für `differenz` (+/-)

### Was NICHT drin ist

- Kein Slider (Default-Wert 300 € direkt in Berechnung)
- Kein Chart

### Neue Testszenarien

T-11 (Slider-Interaktion kommt erst Slice 3), T-12, T-13 mit fixen Werten verifizieren.

---

## Slice 3 — Slider monatlicheRate

### Voraussetzung

Slice 2 abgeschlossen.

### Was drin ist

- `<input type="range">`: `monatlicheRate`, 50–2.000, Default 300, Step 50
- `data-fw-options` Parsing: `defaultRate` aus Whitelist (APP_SPEC §9)
- Live-Neuberechnung bei `input`-Event (Strategy → AppContext → Renderer)
- ARIA: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` („300 Euro pro Monat")
- ARIA Live Region: Update nach Slider-Release (nicht bei jedem Tick — kein Screenreader-Spam)
- `prefers-reduced-motion`: keine Animation, direkt Endwert

### Was NICHT drin ist

- Kein `startBetrag`-Slider (optional, nach Pilot)
- Kein Chart

---

## Slice 4 — SparplanChart

### Voraussetzung

Slice 2 abgeschlossen. **OA-02 entschieden** (Chart-Bibliothek und Integrationsform).

### Was drin ist

- SparplanChart: historische Depotwert-Linie (1 Datenserie, chartSeries aus AppContext)
- Chart `role="img"` mit `aria-label` oder `<figure><figcaption>`
- `prefers-reduced-motion`: Chart sofort vollständig, keine Zeichenanimation

### Offene Frage (SF-01)

Direkte Chart.js-Nutzung? Eigene Canvas-Implementierung? Chart-Engine-Adapter? Entscheid vor diesem Slice notwendig.

---

### Pflicht-Gate vor Slice 4: OA-02 Advocatus-Diaboli-Prüfung

Bevor für Slice 4 `SparplanChart` Code geschrieben wird, müssen die drei OA-02-Dissens-Risiken aktiv geprüft und beantwortet werden.

### Risiko 1 — Legacy-Vertrag wird fälschlich als abgelöst interpretiert

Frage:
Bleibt `financial-chart-module` ausschließlich der bestehende deklarative CSV-/Legacy-Vertrag und wird nicht für app-berechnete Daten verwendet?

Muss gelten:
- Kein Umbau bestehender `financial-chart-module`-Charts.
- Keine Migration alter Charts.
- Kein Mischbetrieb im selben Container.
- App-berechnete Charts bekommen einen separaten Zielcontainer.

### Risiko 2 — Falscher Adapter-/Sonderlayer entsteht

Frage:
Wird die ChartEngine als gemeinsamer Rendering-Kern genutzt, ohne einen neuen parallelen Chart-Sonderweg oder app-lokalen Chart.js-Bypass zu bauen?

Muss gelten:
- Kein eigener Chart.js-Renderingpfad in APP-01.
- Kein separater „Chart-Datenadapter" als neue Architekturwelt.
- Die App liefert berechnete Daten.
- Die ChartEngine verantwortet Visualisierung, Skalen, Renderer, Tooltips und Chart-State.
- Offene API-/Lifecycle-Fragen werden vor Code explizit entschieden.

### Risiko 3 — `fw-appchart` wird vorschnell verfestigt

Frage:
Wird der In-App-Chart-Zielcontainer bewusst und kollisionsfrei festgelegt, statt den Namen `fw-appchart` unreflektiert aus der Doku in Code zu gießen?

Muss gelten:
- Marker-Form vor Implementierung festlegen: class oder data-Attribut.
- Kein globaler DOM-Scan für In-App-Charts.
- Container wird lokal innerhalb der App-Hülle gefunden.
- Kein `data-csv`, kein `financial-chart-module` auf diesem Container.
- Container-Guard gegen Doppelinitialisierung/Mischbetrieb definieren.

### Ergebnis dieses Gates

Vor Code muss Claude kurz dokumentieren:

1. Welche Container-Konvention wird für Slice 4 verwendet?
2. Welche ChartEngine-Einstiegsfunktion wird genutzt oder minimal ergänzt?
3. Wie wird Mischbetrieb verhindert?
4. Was bleibt weiterhin offen für ein späteres ChartEngine-Gate?
5. Welche Dateien werden geändert — und welche ausdrücklich nicht?

Ohne diese Antworten kein Slice-4-Code.

---

## Slice 5 — 4-Screen-Flow

### Voraussetzung

Slice 2 und 3 abgeschlossen.

### Was drin ist

- Screen-Flow-Controller: Screens 1→2→3→4 sequenziell (APP_SPEC §14.1)
- Button-Navigation (kein Autoplay, kein Scroll-Trigger in V1)
- Fokus-Management: Fokus auf neue `<h2>` bei Screen-Wechsel
- Jeder Screen: sichtbare `<h2>`, Microcopy aus APP_SPEC §14.1 / MINI_SPEC
- `prefers-reduced-motion`: Übergänge deaktiviert, direkt Zielzustand

---

## Slice 6 — VertikaleLinie + AssumptionsBox + PrimaryCta

### Voraussetzung

Slice 4 und 5 abgeschlossen.

### Was drin ist

- VertikaleLinie im Chart bei letztem Datenpunkt (Screen 3, APP_SPEC §14.2)
- AssumptionsBox (immer sichtbar, Screen 2 oder 3, APP_SPEC §19.8):
  > „Basis: MSCI World Index, monatliche Indexwerte, 10 Jahre rückwärts bis zum letzten vollständig verfügbaren Monat. Keine Finanzberatung. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft."
- PrimaryCta: „Heute Marktzeit sammeln →" (APP_SPEC §19.10); `href` zunächst leer (NB-1)
- Microcopy-Schicht (Krug — Don't Make Me Think): Screen-Headlines (h2) visuell dominant als erste Wahrnehmungsebene; Subline direkt über oder unter dem Chart erklärt in einem Satz was zu sehen ist (Sparrate, Zeitraum, Datenquelle); Screen-3-Kontext verbindet Subline explizit mit der VertikaleLinie

---

## Slice 7 — A11y-Härtung + Responsive

### Was drin ist

- WCAG-AA: Kontrast ≥ 4.5:1 für alle Text/Hintergrund-Paare
- 375px / 768px / 1280px: kein Overflow, Slider bedienbar, Chart lesbar
- Tastatur-Navigation: alle 4 Screens, Slider, CTA erreichbar
- Screenreader: a11ySummary vollständig, Chart-Alternativtext
- `prefers-reduced-motion`: vollständig geprüft
- Theme-Token-Inventar aus `screen.css` prüfen; Fallback-Tokens durch echte Tokens ersetzen (NB-3)
- Slider + NumericInput Hybrid (SF-02): Direkteingabe neben Slider — beide synchronisiert; Slider für Exploration, Zahlenfeld für Präzision auf Mobile

---

## Slice 8a — QA / Testseite vollständig

### Was drin ist

- Alle T-01 bis T-26 aus APP_SPEC §16 lokal prüfbar
- `app.test.html` mit dokumentierten Szenarien und erwarteten Ergebnissen
- Manuelle Testcheckliste

---

## Slice 8b — Ghost-Integrationstest

### Voraussetzungen

- NB-4a: B3 (Bootstrapper-Strategie) entschieden
- NB-4b: B2 (Ghost-Upload-URL-Schema) bekannt

### Was drin ist

- App lädt in echter Ghost-Seite über HTML-Card
- `data-fw-data` URL (produktiver Ghost-Upload-Pfad) funktioniert
- Kein CSS-Bleeding ins Ghost-Theme
- Kein JS-Fehler in Browser-Konsole

---

## Nicht-Blocker

| ID | Thema | Betrifft | Status |
|---|---|---|---|
| NB-1 | PrimaryCta `href` leer — `risiko-uebersetzer` URL unbekannt | Slice 6 / Release | Offen |
| NB-2 | `startBetrag`-Slider optional | Nach Pilot | Offen (SF-02) |
| NB-3 | Theme-Token-Inventar aus `screen.css` | Slice 7 | Offen — Fallback-Tokens bis dahin erlaubt |
| NB-4 | Bootstrapper + Ghost-Upload-URL | Slice 8b | Offen (B2, B3) |
| NB-5 | Perf: `marketTimeStrategy` + DOM-Neuaufbau auf jedem Slider-Tick (synchron) — für Pilot ok; bei Bedarf `<dd>`-Werte in-place aktualisieren statt Container leeren | Slice 7 / nach Pilot | Offen |
| SF-02 | Slider + NumericInput Hybrid für mobile Präzision (≥ 50 % Mobile-Traffic bestätigt) | Slice 7 | Vorgezogen aus „nach Pilot" — Entschieden 2026-06-15 |
| OA-01 | ES-Modul für app.js | Slice 1 | **ENTSCHIEDEN 2026-06-04** — `<script type="module">`, Chart-Engine-Muster |
| OA-02 | Chart-Bibliothek / SparplanChart-Integrationsform | Slice 4 | Offen (SF-01) |

---

## Binding Decisions (relevant für alle Slices)

| ID | Entscheidung |
|---|---|
| Q-01 | SafeDOM: kein `innerHTML` für Nutzdaten |
| Q-02 | Whitelist-Prinzip für `data-fw-options` |
| A-09 | Read-only AppData: `Object.freeze()` nach Parsing |
| A-10 | Two-Step Parsing |
| A-11 | `async initApp()`, `async loadData()` |
| A-13 | Unit Sovereignty: Mathematik mit reinen Zahlen |
| A-14 | Truthful UX: AssumptionsBox Pflicht |
| A-17 | Theme-Hoheit: CSS Custom Properties, keine eigenständigen Hex-Werte |
| B-02 | Berechnungsformel: Anteilslogik (APP_SPEC §7.10) |
| B-03 | Screen-Flow: Button-getrieben, kein Autoplay |
| D-APP-01-E02 | prokrastinations-preis ist Pilot-2 (Daten-/Chart-/Story-Pilot) |
