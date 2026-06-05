# App-Fabrik-Standard — Draft V0.1

Stand: 2026-06-03 | AP-DATA-08-Nachputz | Geändert von: Claude  
Ziel-Pfad wenn bindend: `docs/spec/APP-FACTORY-STANDARD.md`

**Alle Inhalte hier sind Arbeitsstände.**  
Erst nach Überführung in `docs/spec/` und Alberts expliziter Freigabe gilt dieser Standard als bindend.  
Begriffe wie „Standard", „Pflicht" oder „Regel" in diesem Dokument beschreiben die Zielvorstellung, nicht den heutigen Produktionsstand.

Quellen für diesen Draft:
- `01_DECISION_LOG.md` — Entscheidungen und Arbeitsannahmen
- `02_OPEN_QUESTIONS.md` — offene Fragen
- `APP_INVENTORY.md` — alle 21 App-Ordner mit Zuordnung
- `05_PILOT_STRATEGY.md` — Pilot-Reihenfolge
- `ETF-App-Fabrik_App-Register.md` — Zählmodell
- `App-Fabrik_Zusatzpaket-Integration_V0-1.md` — Demo-Template-Bewertung
- `_input/perplexity/APP-ARCHITEKTUR.md` — Architekturvorschlag (Input, nicht bindend)
- `docs/editorial/AUTHOR_GUIDE-v3.md` — redaktioneller Workflow
- `docs/editorial/Cheat-Sheet HTML-Karten.md` — Chart-Vertrag für Redakteure
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` — Chart-Engine-Architekturprinzipien (P-01–P-10)
- `CHART_ENGINE_ROLE_AND_INTEGRATION.md` — Zuordnung: was übertragen, was chart-spezifisch

---

## 1. Zweck der App-Fabrik

### Warum existiert sie?

Die App-Fabrik löst ein strukturelles Problem: Ohne gemeinsamen Standard entstehen 21 Einzelanfertigungen mit 21 verschiedenen Dateistrukturen, 21 verschiedenen Ghost-Card-Varianten, 21 verschiedenen Sicherheitsmodellen und 21 verschiedenen Testprozessen. Jede App ist dann ein Sonderfall — schwer zu warten, schwer zu verstehen, schwer zu skalieren.

### Was soll verhindert werden?

- 21 voneinander unabhängige App-Architekturen
- Kein gemeinsames Fehlerbild (jede App schlägt anders fehl)
- Redakteure, die für jede App eine andere Ghost-Card-Syntax lernen müssen
- CDN-Abhängigkeiten, die unkontrolliert in Produktion rutschen
- Security-Lücken, weil jede App ihren eigenen `innerHTML`-Weg geht
- App-Prototypen, die ohne Dokumentation im Repo veralten

### Was ist das Zielbild?

**Wer eine App kennt, kennt das Muster aller Apps derselben Familie.**

Die App-Fabrik definiert:
- 5–7 App-Familien mit gemeinsamen Templates, Datenverträgen und UI-Mustern
- einen einheitlichen Ghost-HTML-Card-Vertrag für Redakteure
- einen wiederholbaren Claude-Workflow: Intake → Spec → Gate → Build → Release
- eine klare Dateistruktur pro App-Ordner
- gemeinsame Sicherheits- und Design-Regeln

### Warum keine 21 Einzelanfertigungen?

Die 21 App-Ordner sind keine 21 verschiedenen Probleme. Sie sind Variationen von 5–7 Grundmustern:
- Rechner mit Slider-Eingabe und KPI-Ausgabe
- Szenario-Chart mit Datenvergleich
- Diagnose- oder Quiz-Flow mit Ergebnis
- Explorer mit Suchfunktion oder Kartennavigation
- Dashboard mit mehreren KPI-Modulen
- Chart-/Datenvisualisierung
- Companion-Modul oder Explainer

Jede Familie hat einen eigenen Shell-Code. Die App-spezifische Datei enthält nur Fachlogik. Gemeinsamer Code wird einmal geschrieben und wiederverwendet.

---

## 2. Begriffe und Ebenen

| Begriff | Definition |
|---|---|
| **Funnel-Master-App** | Eine der 19 im ETF-Apps-Hauptdokument beschriebenen Apps. Hat einen eigenen Funnel-Slot (A1–H1), eine Zielgruppe und eine Kernaussage. Entspricht immer einem realen App-Ordner in `/Apps/`. |
| **Realer App-Ordner** | Ein Ordner unter `/Apps/[slug]/`. Enthält Code, Prototypen, Daten und Prompts. Der reale Arbeitsort einer App. |
| **App-Modul** | Eigenständige Funktionseinheit innerhalb einer Multi-Modul-Master-App (z.B. `geburtsjahrlos` innerhalb von B2). Kann separat eingebettet werden. |
| **Companion-App** | Eigenständig einbettbares Modul, das fachlich zu einer Master-App gehört, aber auch ohne sie verständlich ist. Beispiel: `weltkarte-etf-indizes` als Companion zu C1. |
| **Erweiterungsmodul** | Modul, das eine Master-App in einem zusätzlichen Analysemodus erweitert. Kein eigenständiger Funnel-Slot. Beispiel: `rollierende-sparplaene` als Erweiterung von B2. |
| **App-Familie** | Technische Template-Klasse. Fasst Apps mit gleichem Interaktionsmuster zusammen (z.B. alle Calculator-Apps). Die Familie definiert Shell-Code, UI-Muster und Testanforderungen. |
| **Chart-Engine** | Gemeinsame Infrastruktur für Datenvisualisierung. Kein App-Ordner, kein Funnel-Slot. Wird von Apps genutzt, nicht von der App-Fabrik gesteuert. Hat eigenen Ghost-Card-Vertrag (`financial-chart-module`), der vorerst unverändert bleibt. |
| **Design-System** | CSS Custom Properties aus `screen.css`, gelesen via Theme-Bridge. Liefert Farben, Typografie und Abstände. Apps hardcoden keine Hex-Werte. |
| **Ghost-HTML-Card** | Ein einzelner `<div>`-Container, den der Redakteur in Ghost einfügt. Enthält keine App-Logik — das Theme lädt diese automatisch. Zwei Vertragstypen: `fw-app` (App-Fabrik-Apps) und `financial-chart-module` (Chart-Engine, bestehend). |

---

## 3. Zählmodell

🟢 ENTSCHIEDEN — Quelle: `01_DECISION_LOG.md` Z-01, Z-02, Z-03, Z-04

| Kategorie | Anzahl | Quelle |
|---|---|---|
| Funnel-Master-Apps | 19 | ETF-Apps-Hauptdokument.md (Blöcke A–H) |
| Reale App-Ordner in /Apps | 22 | Repo-Stand 2026-05-09; +1 markt-kam-zurueck (2026-05-18) |
| Differenz | 3 | Korrekt zugeordnete Zusatz-Module |
| Chart-Engine | 1 | Gemeinsame Infrastruktur — kein App-Ordner, kein Funnel-Slot |

### Die 3 Zusatz-Module (keine unklaren Apps)

| App-Ordner | Gehört zu | Modulrolle | Fachliche Aussage |
|---|---|---|---|
| `/Apps/rollierende-sparplaene/` | B2 Geburtsjahrlos-Simulator | Erweiterungsmodul / Analysemodus | Startet denselben Sparplan in Jahr Z, Z+1, Z+2 — zeigt Renditabhängigkeit vom Startjahr |
| `/Apps/investment-universum/` | C1 Diversifikations-Detektor | Gegenperspektive / Grundmodell | Egal wie kleinteilig man ETFs schneidet: Industrieländer plus Schwellenländer bleiben das konstante Universum |
| `/Apps/weltkarte-etf-indizes/` | C1 Diversifikations-Familie | Visuelles Lernmodul / Companion-App | Nutzer klickt Index; enthaltene Länder werden auf Weltkarte farblich hervorgehoben |

### Multi-Modul-Master-Apps

**B2 — Geburtsjahrlos-Simulator**  
🟡 ARBEITSANNAHME — Quelle: `01_DECISION_LOG.md` Z-03

| Ordner | Rolle | Kopplung |
|---|---|---|
| `/Apps/geburtsjahrlos/` | Haupt-App / Startjahr-Schicksal | eigenständiger Funnel-Slot B2 |
| `/Apps/rollierende-sparplaene/` | Erweiterungsmodul / rollierender Startjahrvergleich | kein eigener Funnel-Slot; fachlich als zweiter Modus von B2 |

Offen: Ob später beide als Modi in einer gemeinsamen UI zusammengeführt werden — Entscheidung nach Prüfung von Datenbedarf, UX-Komplexität und Chartbedarf.

**C1 — Diversifikations-Familie**  
🟡 ARBEITSANNAHME — Quelle: `01_DECISION_LOG.md` Z-04

| Ordner | Rolle | Kopplung |
|---|---|---|
| `/Apps/diversifikations-detektor/` | Master-App / Diagnose, Nutzerportfolio | eigenständiger Funnel-Slot C1 |
| `/Apps/investment-universum/` | Gegenperspektive / globaler Anlagekuchen | lose gekoppelt, einzeln einbettbar |
| `/Apps/weltkarte-etf-indizes/` | Visuelles Lernmodul / Index-Länder-Karte | lose gekoppelt, einzeln einbettbar |

Offen: Konkrete technische Kopplung und Navigation zwischen den drei Modulen — Klärungsschritt wenn Datenbedarf und UX-Flow für C1 spezifiziert werden.

---

## 4. App-Familien

🟡 ARBEITSANNAHME — Familien-Einteilung ist Arbeitshypothese, wird durch Pilot-Erfahrung geschärft.

### 4.1 Rechner-App (Calculator)

**Zweck:** Nutzer gibt Parameter ein; die App rechnet ein Ergebnis und macht eine abstrakte Zahl greifbar.

**Typisches Interaktionsmuster:** Slider oder Zahleneingabe → Live-Berechnung → KPI-Ausgabe → Ergebnissatz → CTA

**Typische Eingaben:** Monatliche Rate, Zeitraum, Renditeerwartung, Vergleichsgröße (Konsumgut-Anker)

**Typische Ausgaben:** Eurobetrag, Prozentzahl, animierter Zähler, Ergebnissatz in natürlicher Sprache

**Datenbedarf:** Gering. Formeln + Defaults als Config-JSON. Keine externe Datenpipeline.

**Chartbedarf:** Mittel. Zwei bis drei Linien als Ergebnis-Visualisierung, oder animierter Counter als Hauptausgabe.

**Risiken:** Rendite- und Inflationsannahmen müssen seriös wirken; keine Scheingenauigkeit erzeugen. Slider-Eingaben sind untrusted input.

**Wiederverwendbare Bausteine:** Slider, NumericInput, KpiCard, LiveCounter, RangeButtons, ResultSentence, AssumptionsBox, PrimaryCta

**Apps dieser Familie:** `risiko-uebersetzer` (Pilot-1), `kostenkiller-ter`, `thesaurierer-rennen`, `renditekiller-volatilitaet`

---

### 4.2 Szenario-/Vergleichs-App (Scenario Chart)

**Zweck:** Nutzer vergleicht historische Szenarien oder Strategien über Zeiträume. Daten sprechen für sich — die App bereitet sie auf.

**Typisches Interaktionsmuster:** Daten laden → Chart rendern → Zeitraum wählbar → Erklärungstext → CTA

**Typische Eingaben:** Zeitraumauswahl (Range-Buttons), ggf. Startjahr oder Startkapital

**Typische Ausgaben:** Linien-Chart mit Szenariovergleich, KPIs für Rendite-Kennzahlen, Kohorten-Diagramm

**Datenbedarf:** Hoch. Historische Zeitreihen (CSV oder vorverarbeitetes normiertes JSON). Schwere Datenaufbereitung läuft nicht im Browser.

**Chartbedarf:** Hoch. Chart-Engine als Hauptausgabe.

**Risiken:** Historische Daten müssen sauber normiert sein. Datenpipeline-Entscheidungen blockieren Implementierung.

**Wiederverwendbare Bausteine:** RangeButtons, Chart-Engine-Integration, AssumptionsBox, KpiCard, ResultSentence, PrimaryCta

**Apps dieser Familie:** `prokrastinations-preis` (Pilot-2), `geburtsjahrlos`, `rollierende-sparplaene`, `crash-reaktions-test`, `market-timing-simulator`

---

### 4.3 Diagnose-/Test-App (Decision / Quiz)

**Zweck:** Nutzer durchläuft eine Frage-Sequenz oder ein Challenge-Szenario und erhält ein personalisiertes Ergebnis oder eine Empfehlung.

**Typisches Interaktionsmuster:** Frage/Challenge → Auswahl → Ergebnis → Reflexion → Empfehlung → CTA

**Typische Eingaben:** Multiple-Choice-Auswahl, Schieberegler für Risikobereitschaft, Selbsteinschätzungen

**Typische Ausgaben:** Score, Kategorie, personalisierter Ergebnissatz, Empfehlungspfad

**Datenbedarf:** Mittel. Fragen, Scoring-Regeln und Empfehlungstexte als Config-JSON.

**Chartbedarf:** Niedrig bis mittel. Ergebnis-Visualisierung (Score-Skala, Fortschrittsbalken).

**Risiken:** Quiz-Engine-Komplexität kann ausufern. Ergebnisse dürfen keine echte Finanzberatung simulieren.

**Wiederverwendbare Bausteine:** QuizEngine (noch nicht gebaut), KpiCard, ResultSentence, PrimaryCta, ErrorState

**Apps dieser Familie:** `crash-reaktions-test`, `market-timing-simulator`, `etf-reifegrad-finale`

---

### 4.4 Explorer-/Karten-App

**Zweck:** Nutzer erkundet eine Datenwelt interaktiv — durch Auswahl, Filterung oder geografische Navigation.

**Typisches Interaktionsmuster:** Auswahl/Suche/Klick → Mapping/Overlap-Berechnung → Visualisierung (Karte, Heatmap, Donut) → Details on Demand

**Typische Eingaben:** ETF-Auswahl, Index-Klick auf Karte, Filterkritierien, Portfolio-Eingabe

**Typische Ausgaben:** Weltkarte mit farbiger Länderhervorhebung, Donut-Chart, Overlap-Tabelle, Kachel-Grid

**Datenbedarf:** Hoch. ETF-Kompositionsdaten, Index-Geo-Daten, Overlap-Matrizen (JSON). Externe Kartenbibliotheken (D3/TopoJSON) lokal gebündelt.

**Chartbedarf:** Hoch. Interaktive Visualisierungen, kein Standard-Chart-Engine-Chart.

**Risiken:** D3/TopoJSON-Lokalbündelung erhöht Build-Komplexität. Datenaktualität schwer automatisierbar. Mobile Bottom Sheet als Muster noch nicht standardisiert.

**Wiederverwendbare Bausteine:** Karten-Shell (noch nicht gebaut), Donut-Chart, Heatmap, ErrorState, LoadingSkeleton

**Apps dieser Familie:** `diversifikations-detektor`, `investment-universum`, `weltkarte-etf-indizes`, `esg-spiegel`, `komplexitaets-entlarver`, `weltdepot-baukasten`

---

### 4.5 Storytelling-Dashboard

**Zweck:** Mehrere KPI-Module werden zu einem kohärenten Gesamtbild zusammengesetzt. Nutzer wechselt zwischen Szenarien oder Modulen.

**Typisches Interaktionsmuster:** Überblick → Modul-Navigation → Szenario-Auswahl → Detail-KPIs → CTA

**Typische Eingaben:** Szenario-Auswahl, Modulwechsel, ggf. eigene Parameter

**Typische Ausgaben:** KPI-Grid, Szenariomatrix, kombinierte Chart-Ausgaben

**Datenbedarf:** Hoch. Szenarien und Annahmen als Config-JSON, ggf. Zeitreihendaten.

**Chartbedarf:** Mittel bis hoch. Mehrere Chart-Instanzen koordiniert.

**Risiken:** Sonderfall-Gefahr: Dashboard-Komplexität kann nicht als Pilot für einfachere Apps dienen. Tonalität Block G: nicht motivierend, sondern respektvoll-analytisch.

**Wiederverwendbare Bausteine:** KpiCard, RangeButtons, ScenarioSelector (noch nicht gebaut), Chart-Engine-Integration, AssumptionsBox, PrimaryCta

**Apps dieser Familie:** `regulatorik-dashboard`, `rendite-kalibrierung` (teilweise)

---

### 4.6 Chart-/Datenvisualisierung

**Zweck:** Daten werden primär über die Chart-Engine visualisiert. Die App ist dünner Wrapper um einen oder mehrere Charts mit Konfiguration.

**Typisches Interaktionsmuster:** Daten laden → Chart rendern → Zeitraum- oder Ansichtswahl → CTA

**Typische Eingaben:** Range-Auswahl, Benchmark-Wahl, ggf. Datei-URL

**Typische Ausgaben:** Chart-Engine-Output (Linien, Balken, Torte), KPIs als Begleittext

**Datenbedarf:** CSV für Zeitreihen, Config-JSON für Chartoptionen.

**Chartbedarf:** Hoch. Chart-Engine als primäre Ausgabe.

**Risiken:** Abgrenzung zur reinen Chart-Engine-Einbettung noch offen. Langfristig wird geprüft, ob Charts als App-Familie in die App-Fabrik integriert werden.

**Wiederverwendbare Bausteine:** RangeButtons, Chart-Engine-Integration, AssumptionsBox

**Abgrenzung:** Die bestehende Chart-Engine-Einbettung via `financial-chart-module` ist kein App-Fabrik-Produkt. Diese Familie beschreibt Apps, die die Chart-Engine als Baustein einsetzen, aber eigene Logik und Config-Verwaltung mitbringen.

---

### 4.7 Companion-/Erklärmodul (Parser / Explainer)

**Zweck:** Ein Text-Objekt oder ein Nutzerinput wird analysiert, erklärt oder übersetzt. Keine externe Datenpipeline — Logik und Wissen stecken im Config-JSON.

**Typisches Interaktionsmuster:** Text/Objekt-Eingabe → Tokenisierung/Parsing/Lookup → Erklärung → CTA

**Typische Eingaben:** ETF-Name (Freitext oder Dropdown), Replikationstyp, Anlageklasse

**Typische Ausgaben:** Token-Chips mit Erklärung, Vergleichs-Animation, Ergebnissatz

**Datenbedarf:** Gering. Statisches Dictionary oder Mechanik-Daten als Config-JSON.

**Chartbedarf:** Niedrig bis mittel. Animationen oder einfache Vergleichsgrafiken.

**Risiken:** Freitext-Parsing kann ausufern. Kürzel-Listen müssen kuratiert und aktuell gehalten werden.

**Wiederverwendbare Bausteine:** TokenChip (noch nicht gebaut), ResultSentence, PrimaryCta, AssumptionsBox

**Apps dieser Familie:** `etf-namensdecoder`, `replizierer-swapper`, `passiv-paradox`

---

## 5. Standard-Dateistruktur pro App

🟡 ARBEITSANNAHME — Draft-Vorschlag. Nicht sofort repo-weit erzwingen.  
Wird verbindlich erst nach Pilot-Erfahrung und expliziter Freigabe.

```text
/Apps/{app-slug}/
  README.md           — App-Briefing: Zweck, Inputs, Outputs, Annahmen, Modulrolle
  APP_SPEC.md         — technische Spezifikation: Shell, Daten, UI, States, Ghost-Card
  app.config.json     — Texte, Defaults, Slider-Grenzen, Szenarien, Whitelists
  app.data.csv        — tabellarische Zeitreihen (optional, wenn extern gehostet: Verweis)
  data/               — alternativ zu app.data.csv wenn mehrere Datendateien nötig
  app.js              — dünne app-spezifische Logik (kein Shell-Code)
  app.test.html       — lokale Entwicklungs- und Testseite
  NOTES.md            — Entwicklungsnotizen, offene Fragen, Anmerkungen zu Prototypen
```

**Für bestehende Prototypen:** Vorhandene Single-HTML-Dateien bleiben als Referenz erhalten.  
**Nicht sofort erzwingen:** Bestehende Ordner werden nicht blind umstrukturiert, bis der Factory-Workflow erprobt ist.  
**APP_SPEC.md** ist der technische Vertrag pro App — wird durch den Spec-Workflow (`spec-mode-architecture`) erzeugt und gilt als Freigabe-Grundlage vor dem Gate.

---

## 6. Ghost-HTML-Card-Vertrag

### Redaktionsprinzip

🟢 ENTSCHIEDEN — Quelle: `docs/editorial/AUTHOR_GUIDE-v3.md`, `Cheat-Sheet HTML-Karten.md`, Alberts Briefing 2026-05-09

- **Markdown** für normalen Artikelinhalt: Text, Listen, Tabellen, Boxen, Zitate.
- **HTML-Cards** ausschließlich für Apps, Charts und komplexe Medien (Video, Audio, interaktive Einbettungen).
- **Redakteure kopieren keine vollständigen App-Templates** in Ghost. Nur der minimale Container wird eingefügt.
- **Apps werden über einen einzelnen `<div>`-Container eingebunden.** Keine Inline-Logik, kein Inline-CSS, kein Inline-JSON.
- **Das Theme lädt App-Logik, Design-System und Fonts automatisch.** Der Redakteur muss nichts weiter tun als den Container einzufügen und die Attribute zu setzen.

---

### App-Card-Standard (Namespace: `fw-app`)

🟢 ENTSCHIEDEN — Quelle: Alberts Briefing 2026-05-09

Für App-Fabrik-Apps wird der Finanzwesir-Namespace verwendet.

**Attribut-Referenz:**

| Attribut | Status | Zweck |
|---|---|---|
| `class="fw-app"` | Pflicht | Identifiziert den Container als App-Fabrik-App |
| `data-fw-app="[slug]"` | Pflicht | App-Slug, bestimmt welche App geladen wird |
| `data-fw-data="[url]"` | Optional | URL zur CSV-Datendatei |
| `data-fw-config="[url]"` | Optional | URL zur JSON-Konfigurationsdatei |
| `data-fw-options="[key:val]"` | Optional | Kleine Inline-Overrides, key:value-Syntax |
| `data-fw-theme="[enum]"` | Optional | Theme-Override (z.B. `inverted`) — noch nicht implementiert |

**Was niemals in `data-*` Attribute gehört:**
- Freies JSON direkt im HTML (`data-fw-options='{"key": "value"}'`) — Fehlerquelle für Redakteure
- URLs außerhalb erlaubter Domains
- Ausführbarer Code jeder Art
- Nutzerdaten oder personenbezogene Informationen

---

**App ohne externe Daten:**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis">
</div>
```

**App mit kleinen Overrides:**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="defaultRate:300, years:30">
</div>
```

**App mit CSV-Daten:**

```html
<div class="fw-app"
     data-fw-app="geburtsjahrlos"
     data-fw-data="https://www.finanzwesir.com/content/files/2026/msci-world.csv">
</div>
```

**App mit JSON-Konfiguration:**

```html
<div class="fw-app"
     data-fw-app="risiko-uebersetzer"
     data-fw-config="https://www.finanzwesir.com/content/files/2026/risiko-uebersetzer.config.json">
</div>
```

**App mit Daten und Optionen:**

```html
<div class="fw-app"
     data-fw-app="rollierende-sparplaene"
     data-fw-data="https://www.finanzwesir.com/content/files/2026/world-returns.csv"
     data-fw-options="duration:30, monthlyRate:300">
</div>
```

---

### Chart-Card-Sonderfall (bestehender Vertrag)

🟢 ENTSCHIEDEN — Quelle: Alberts Briefing 2026-05-09; `Cheat-Sheet HTML-Karten.md`

Der bestehende Chart-Engine-Vertrag bleibt vollständig gültig und wird **nicht** auf `fw-app` migriert:

```html
<div class="financial-chart-module"
     data-type="line"
     data-title="Rendite-Vergleich (5 Jahre)"
     data-csv="https://..."
     data-colors="World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
```

**Regeln für Chart-Cards:**
- `data-type` nimmt `line`, `bar` oder `pie`
- `data-options` ist eine einfache `key:value, key:value`-Syntax — keine komplexen JSON-Strukturen
- `data-colors` enthält Name-Farbe-Paare: `Name: #HEX, Name2: #HEX`
- Die Chart-Engine wird vorerst nicht auf den `fw-app`-Namespace migriert
- Langfristig kann geprüft werden, ob Charts als App-Familie in die App-Fabrik integriert werden

**Zwei-Vertrags-Modell:**

| Vertrag | Klasse | Wann |
|---|---|---|
| App-Fabrik-Apps | `class="fw-app"` | Alle neuen interaktiven Apps |
| Chart-Engine (bestehend) | `class="financial-chart-module"` | Daten-Charts (line, bar, pie) |

Beide Verträge koexistieren. Kein gegenseitiges Überschreiben.

---

## 7. CSV / JSON / data-options

🟢 ENTSCHIEDEN — Quelle: `01_DECISION_LOG.md` D-01, D-02, D-03

### Welches Format wofür

| Zweck | Format | Wer erstellt | Wer pflegt |
|---|---|---|---|
| Tabellarische Zeitreihen (Renditen, Verläufe) | CSV | Claude/Entwicklung | Albert oder Claude bei Update |
| Strukturierte Konfiguration (Slider-Defaults, Texte, Szenarien, Whitelists) | JSON | Claude auf Basis Albert-Input | Claude, Albert bestätigt |
| Kleine Inline-Overrides im Ghost-Card | `data-fw-options` | Redakteur direkt in Ghost | Redakteur |

### Arbeitsannahmen zu den Formaten

**CSV:**
- Für tabellarische Daten mit Zeitachse (Renditen, Verläufe, Szenarien)
- Redakteur kann CSV-Dateien in Ghost hochladen oder über bekannte Finanzwesir-Pfade referenzieren
- Schwere Datenaufbereitung (z.B. historische Rohdaten normieren) läuft nicht im Browser — vorverarbeitete Ergebnisdatei bereitstellen

**JSON:**
- Für strukturierte Konfiguration: Slider-Grenzen, Default-Werte, Ergebnistexte, Szenarien, Ankerlisten
- JSON-Dateien werden von Claude erzeugt oder aus validierten Vorlagen kopiert
- Der Redakteur bearbeitet JSON nicht direkt — zu fehleranfällig
- JSON muss später durch Templates oder Validatoren abgesichert werden (→ Offene Frage Data-03)

**data-fw-options:**
- Nur für kleine, menschlich lesbare Overrides
- Syntax: `key:value, key:value` — gleich wie `data-options` bei Chart-Cards
- Kein komplexes JSON in `data-fw-options`
- Unbekannte Keys werden vom App-Bootstrapper ignoriert (Whitelist-Prinzip)
- Maximal 3–4 einfache Parameter — mehr gehört in eine JSON-Config-Datei

### Redakteursfreundlichkeit

- CSV: direkt verständlich, in Excel pflegbar
- JSON-Config: nicht direkt im Ghost-Card, immer als externe Datei
- `data-fw-options`: einfach genug dass ein Redakteur nach einem Cheat-Sheet arbeiten kann

### CSV/JSON-Quellen und Versioning

- CSV/JSON-URLs kommen aus Ghost-Upload oder erlaubten Finanzwesir-Pfaden
- CSV und JSON werden als Daten behandelt — niemals als Code
- Cache-Busting via URL-Parameter `?v=YYYY-MM` bei Datenaktualisierungen (🟡 Arbeitsannahme — Quelle: Data-04 in 02_OPEN_QUESTIONS.md)

---

## 7a. Data Need Snapshot — Blaupause für APP_SPEC.md

🟡 ARBEITSANNAHME — Blaupause abgeleitet aus Pilot `prokrastinations-preis` (APP_SPEC V1.5).
Bestehende APP_SPEC.md werden noch nicht umgebaut. Rollout: AP-DATA-08 (→ `docs/data/OFFENE-ARBEITSPUNKTE.md`).

**Warum ein expliziter Abschnitt in jeder APP_SPEC.md?**

`Benötigter Index: keiner` ist eine wichtige Information. Kein Abschnitt ist mehrdeutig —
unklar bleibt dann, ob der Datenbedarf vergessen wurde oder bewusst nicht besteht.

---

### Statuswerte

| Status | Bedeutung |
|---|---|
| `offen` | Datenbedarf noch nicht entschieden |
| `keine externe Datenreihe erforderlich` | Bewusst keine externe Index-/ETF-/Makrozeitreihe nötig |
| `Wunschdaten definiert` | Fachlicher Bedarf klar, Quelle/Daten noch offen |
| `Datenkandidat vorhanden` | Datei oder Quelle liegt vor, noch nicht freigegeben |
| `produktiv` | Daten liegen vor und dürfen verwendet werden |
| `gesperrt` | Nicht verwenden |

Keine weiteren Statuswerte einführen, außer zwingend nötig.

---

### Ebene A — Minimalblock (Pflicht in jeder APP_SPEC.md)

Jede APP_SPEC.md enthält mindestens diesen Block — auch wenn keine externe Datenreihe nötig ist.

```markdown
## Datenbedarf / Data Need Snapshot

| Feld | Wert |
|---|---|
| Datenstatus | offen / keine externe Datenreihe erforderlich / Wunschdaten definiert / Datenkandidat vorhanden / produktiv / gesperrt |
| Externe Daten erforderlich? | ja / nein / offen |
| Benötigter Index | keiner / offen / ... |
| Benötigte ETF-Zeitreihe | keine / offen / ... |
| Benötigte Makrodaten | keine / offen / ... |
| Benötigte Modell-/Konfigurationsdaten | keine / offen / ... |
| Produktive CSV/JSON vorhanden? | ja / nein / nicht erforderlich |
| Dataset-ID | keine / offen / ... |
| Nächster Klärungsschritt | ... |
```

---

### Ebene B — Detailblock (nur wenn externe Daten / Zeitreihen / CSVs nötig)

Nur ergänzen wenn die App echte externe Daten, Zeitreihen, CSVs, ETF-Daten, Indexdaten,
Makrodaten oder kuratierte Daten braucht. Nicht jede App braucht alle Unterabschnitte.

```markdown
### [Abschnittsnummer].1 Wofür braucht die App diese Daten?

### [Abschnittsnummer].2 Ideale Datenreihe / Datenstruktur

### [Abschnittsnummer].3 Mindeststandard

### [Abschnittsnummer].4 Nicht verwenden

### [Abschnittsnummer].5 Erwartetes CSV-/JSON-Format

### [Abschnittsnummer].6 Produktive Anbindung

### [Abschnittsnummer].7 Was Claude vor dem Bau klären muss

### [Abschnittsnummer].8 Wie Claude vorhandene Daten prüfen soll

### [Abschnittsnummer].9 Pflegehinweis

### [Abschnittsnummer].10 App-spezifische Regeln / Berechnung
```

Hinweise:
- Bei reinen Calculator-Apps reicht Ebene A plus kurzer Hinweis zu Modellannahmen.
- Bei JSON-Konfigurationsdaten kein CSV-Format-Abschnitt erzwingen.
- Bei Apps ohne externe Daten explizit: `keine externe Datenreihe erforderlich`.

---

### Beispiele

#### Beispiel 1: Externe Indexzeitreihe

| Feld | Wert |
|---|---|
| Datenstatus | Wunschdaten definiert |
| Externe Daten erforderlich? | ja |
| Benötigter Index | MSCI World Net Return / offen |
| Benötigte ETF-Zeitreihe | keine |
| Benötigte Makrodaten | keine |
| Benötigte Modell-/Konfigurationsdaten | Slider-Defaults |
| Produktive CSV/JSON vorhanden? | nein |
| Dataset-ID | offen / bestehende ID |
| Nächster Klärungsschritt | Quelle, Währung, Zeitraum klären |

#### Beispiel 2: Calculator ohne externe Daten

| Feld | Wert |
|---|---|
| Datenstatus | keine externe Datenreihe erforderlich |
| Externe Daten erforderlich? | nein |
| Benötigter Index | keiner |
| Benötigte ETF-Zeitreihe | keine |
| Benötigte Makrodaten | keine |
| Benötigte Modell-/Konfigurationsdaten | ja — Annahmen/Defaults in APP_SPEC dokumentieren |
| Produktive CSV/JSON vorhanden? | nicht erforderlich |
| Dataset-ID | keine |
| Nächster Klärungsschritt | Modellannahmen prüfen |

#### Beispiel 3: Datenbedarf noch offen

| Feld | Wert |
|---|---|
| Datenstatus | offen |
| Externe Daten erforderlich? | offen |
| Benötigter Index | offen |
| Benötigte ETF-Zeitreihe | offen |
| Benötigte Makrodaten | offen |
| Benötigte Modell-/Konfigurationsdaten | offen |
| Produktive CSV/JSON vorhanden? | nein |
| Dataset-ID | offen |
| Nächster Klärungsschritt | Erst App-Mechanik klären, dann Datenbedarf konkretisieren |

#### Beispiel 4: Kuratierte JSON-/Konfigurationsdaten

| Feld | Wert |
|---|---|
| Datenstatus | Wunschdaten definiert |
| Externe Daten erforderlich? | nein / teilweise |
| Benötigter Index | keiner |
| Benötigte ETF-Zeitreihe | keine |
| Benötigte Makrodaten | keine |
| Benötigte Modell-/Konfigurationsdaten | ja — kuratierte Konfigurationsdaten |
| Produktive CSV/JSON vorhanden? | nein |
| Dataset-ID | keine / offen |
| Nächster Klärungsschritt | Datenmodell und redaktionelle Pflege klären |

---

### Rollout-Logik

- Jetzt: nur diese Blaupause dokumentiert. Bestehende APP_SPEC.md werden noch nicht umgebaut.
- Später: vorhandene APP_SPEC.md strukturell angleichen (→ AP-DATA-09).
- Beim Rollout: keine Datenbedarfe erfinden. Wenn unklar: `offen`. Wenn bewusst nicht nötig: `keine externe Datenreihe erforderlich`.
- Ein leerer oder fehlender Abschnitt soll künftig vermieden werden.

---

## 8. Design-System-Vertrag

🟢 ENTSCHIEDEN (Grundprinzipien) — Quelle: `01_DECISION_LOG.md` A-04, Q-04

### Grundprinzipien

- Apps nutzen CSS Custom Properties aus `screen.css` — kein Hardcoding von Hex-Werten
- Theme-Bridge ist vorhanden (`FwTheme.js` mit CSS-Variables-Bridge) — kein `FW_THEME_OVERRIDE`
- Keine eigenen Farblogiken pro App
- Keine App-spezifischen CSS-Dateien — alle Styles über `fw-*`-Namespace in `screen.css`
- Kein Tailwind CDN in Produktion — nur im Demo-Template erlaubt
- `prefers-reduced-motion` respektieren: Animationen pausieren oder reduzieren

### Erlaubte UI-Primitiven V0.1 (Starter-Set)

🟡 ARBEITSANNAHME — Erweiterungsprozess gilt für Ergänzungen

| Primitive | Beschreibung | Status |
|---|---|---|
| Slider | Touch-fähig, mit Live-Output | ❓ noch zu bauen |
| NumericInput | Zahleingabe mit Validierung | ❓ noch zu bauen |
| KpiCard | Einzelne Kennzahl mit Label | ❓ noch zu bauen |
| LiveCounter | Animierter Zähler (requestAnimationFrame) | ❓ noch zu bauen |
| RangeButtons | Vorauswahl-Buttons (z.B. 10y / 20y / 30y) | ❓ noch zu bauen |
| ResultSentence | Auto-generierter Ergebnissatz | ❓ noch zu bauen |
| AssumptionsBox | Annahmen und Grenzen transparent machen | ❓ noch zu bauen |
| PrimaryCta | Haupt-CTA-Button | ❓ noch zu bauen |
| ErrorState | Fehlermeldung (kein technischer Stack-Trace) | ❓ noch zu bauen |
| LoadingSkeleton | Lade-Platzhalter | ❓ noch zu bauen |

**Erweiterungsprozess:** Neue Primitive nur wenn ≥ 2 Apps sie brauchen + Design-System-Aufnahme + A11y-Check + Demo-Template-Test + Dokumentation.

### Responsive-Pflicht

- Mobile-First: Mindestbreite 375px funktioniert vollständig
- Kein separates mobiles Layout — responsive Design mit denselben Primitiven
- Tabelle-/Grid-Layouts kollabieren auf Mobile korrekt
- Karten-Apps: Mobile Bottom Sheet als Pattern-Kandidat (noch nicht standardisiert → UX-04)

### Kognitive Last

- Minimale kognitive Last bei hoher Informationsdichte
- Normale Artikelgestaltung bleibt Markdown/Theme-Aufgabe — nicht App-Aufgabe
- Apps ersetzen keine Artikel-Prosa; sie ergänzen sie

---

## 9. Code-Prinzipien

🟢/🟡 ENTSCHIEDEN bzw. ARBEITSANNAHME — Quelle: `App-Fabrik_Zusatzpaket-Integration_V0-1.md` §3, `01_DECISION_LOG.md` A-03, A-06, Q-03

### Grundregeln

- **Vanilla JS, clientseitig** — kein Backend, kein Server-seitiges Rendering (🟢 A-03)
- **Keine 21 Einzelanfertigungen** — App-Familie → gemeinsame Shell → App-spezifische Datei enthält nur Fachlogik
- **Gemeinsame App-Shell** verwaltet: Container finden, Config lesen, Daten laden, States verwalten, sichere DOM-Helfer bereitstellen (🟡 A-06)
- **App-spezifische Logik isolieren:** Was in einer anderen App genauso stehen könnte → gehört in die Shell, nicht in die App-Datei
- **Keine globalen App-Initialisierer** (kein `window.FwAppInit`, kein `window.FW_APP_OPTIONS_WHITELIST` als Produktionsstandard) — AppRegistry oder ES-Module-Export (🟡 A-06)
- **Fehler pro App isolieren** — ein Fehler in App A bringt nicht App B oder die Seite zum Absturz
- **Mehrere App-Instanzen auf einer Seite** perspektivisch ermöglichen — keine globalen IDs als App-API

### Namenskonventionen

| Typ | Konvention | Beispiel |
|---|---|---|
| CSS-Klassen | `fw-[komponente]__[element]--[modifier]` | `fw-kpi-card`, `fw-slider--disabled` |
| JS-Variablen | camelCase | `csvText`, `rangeButtons` |
| JS-Klassen | PascalCase | `AppRegistry`, `StateController` |
| JS-Konstanten | SCREAMING_SNAKE | `ALLOWED_CSV_DOMAINS` |
| DOM-Selektoren | `data-fw-role`, `data-fw-kpi`, `data-fw-section` | keine globalen IDs in wiederholbaren Komponenten |
| App-Slug | kebab-case | `prokrastinations-preis` |
| Dateien | `[slug].js`, `[slug].config.json`, `[slug].data.csv` | |

**Keine globalen IDs als App-API:** Alle Selektoren relativ zum App-Root (`ctx.root`). Elemente über `data-fw-role` oder `data-fw-kpi` finden, nicht über `getElementById`. (🟡 Q-03)

**Label-Konvention für Formular-Controls:** `<label>` als Elternelement um `<input>` wickeln statt `for`/`id` — vermeidet globale ID-Konflikte bei mehreren App-Instanzen auf einer Seite. Falls `for`/`id` in Ausnahmefällen unvermeidbar: ID pro Container-Instanz eindeutig generieren (Zähler), nie hardcoden. (🟢 Q-06)

### State-Modell (Pflicht für jede App)

Jede App muss alle vier Zustände behandeln:

```
Loading → Content
       → Error
       → Empty (ungültige oder fehlende Daten)
```

- Kein technischer Stack-Trace für Endnutzer
- Error-State zeigt einen sinnvollen Hinweis auf Deutsch
- Empty-State ist immer eine gültige Antwort — keine App crasht bei fehlenden Daten

### Chart-Engine respektieren

- Die Chart-Engine ist vorhandene Infrastruktur — nicht destabilisieren
- Änderungen an der Chart-Engine erfordern ein separates Gate und explizite Freigabe
- Apps, die Charts nutzen, greifen auf die Chart-Engine als Subsystem zu — kein direktes Canvas-Rendering an ihr vorbei

---

## 10. Architekturprinzipien (Chart-Engine-Referenzmodell)

🟢/🟡 Quelle: `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` | Zuordnung: `CHART_ENGINE_ROLE_AND_INTEGRATION.md`

Die Chart-Engine ist kein App-Fabrik-Produkt, aber ihre Architekturprinzipien sind erprobt genug, um als Referenzmuster zu dienen. Die folgenden 10 Prinzipien (P-01–P-10) gelten für alle neuen App-Fabrik-Apps.

Chart-spezifisch bleiben und werden **nicht** übertragen: Linear Time Scale, Explicit Tick Injection, `forceGenerator`, Unified Density Matrix in konkreter Form, Chart.js-Plugin-Struktur, Canvas-Pixel-Logik, Legend Toggle via `meta.hidden`. Das Prinzip dahinter (Truthful UX, Constraint Dominance) ist trotzdem übertragbar.

---

### P-01 — Read-only AppData nach Ingestion

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, KDR 1 / Layer 1 Vault

Alle externen und redaktionellen Eingaben (CSV, JSON, `data-fw-options`, User Input) werden nach Parsing und Validierung in einem read-only AppData-Objekt abgelegt (`Object.freeze()` oder äquivalentes Schutzmuster). App-Strategien dürfen AppData lesen, aber nicht mutieren. Transformationen erfolgen auf Kopien oder abgeleiteten ViewModels.

**Merksatz:** Der Datentopf wird einmal befüllt, dann versiegelt.

---

### P-02 — Two-Step Parsing

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, Layer 1 Parser-Vertrag

Jeder Parser läuft in zwei Phasen:
1. **Syntaktisches Parsing** — Struktur prüfen: gültiges Format? Pflichtfelder vorhanden? Korrekte Typen?
2. **Semantische Analyse / Normalisierung** — Bedeutung extrahieren: Felder zuordnen, Defaults setzen, Wertebereiche validieren

| Eingabe | Syntaktisch | Semantisch |
|---|---|---|
| CSV | Header, Zeilen, Typen | Zeitreihe/Snapshot, Einheiten |
| JSON Config | Gültiges JSON, Pflichtfelder | App-Familie, Defaults, Slider-Grenzen, Texte |
| `data-fw-options` | `key:value`-Syntax | Whitelist-Check, Typen, Wertebereiche |
| User Input | Zahl/Text/Choice | Domänenlogik, Min/Max, Kontext |

---

### P-03 — Async-fähige öffentliche APIs

🟡 ADAPTIERT — Quelle: Architecture Strategy Paper VX, Layer 1 API

Öffentliche Loader-, Parser- und Init-Methoden werden als `async` designt, auch wenn sie intern zunächst synchron arbeiten.

**Warum:** Wer von Anfang an `async` designt, macht den späteren Bruch von sync → async unmöglich. Zukünftige Datenquellen (Remote-Fetch, Web Worker, größere Datasets) können ohne API-Änderung eingebaut werden.

**Konkret:** `async init()`, `async loadData()`, `async parseConfig()` — auch wenn Pilot-1 intern synchron rechnet.

---

### P-04 — AppContext als semantischer Rucksack

🟡 ADAPTIERT (kein Chart.js, kein `fwContext`) — Quelle: Architecture Strategy Paper VX, KDR 9

Jede App-Strategie erzeugt neben Ergebnisdaten einen AppContext mit semantischen Informationen für Renderer, Formatierung, A11y, Copy und Layout.

**Was in AppContext gehört:** Einheiten und Modi (`valueMode: 'currency'`), Ergebnis-Semantik (`resultTone: 'warning'`), A11y-Texte (`a11ySummary: '42.000 €'`), Layout-Hinweise.

**Was nicht hineingehört:** Rohdaten (bleiben in AppData), Rendering-Details (liegen im Renderer), Hex-Werte.

Renderer interpretieren nicht selbst Rohdaten — sie lesen den AppContext.

**Offen:** Konkretes AppContext-Schema pro App-Familie → `02_OPEN_QUESTIONS.md` Arch-06

---

### P-05 — Unit Sovereignty

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, KDR 10

Werte und Einheiten werden strikt getrennt:
- Mathematik arbeitet mit reinen Zahlen (`42000`, nicht `"42.000 €"`).
- Einheiten, Währungen, Prozent und Zeitbezüge reisen als Metadaten im AppContext.
- Renderer rehydriert die Einheit erst bei Anzeige: `42000` + `EUR` → `"42.000 €"`.

**Merksatz:** Wert und Einheit nie als formatierter String durch die Berechnungsschicht ziehen.

---

### P-06 — Truthful UX

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, KDR 7

Keine erfundenen Datenpunkte, keine versteckte Interpolation, keine Scheingenauigkeit.

- Fehlende oder unsichere Daten werden als solche angezeigt — kein stilles Auffüllen.
- Annahmen (Rendite, Inflation, Zeitraum) sind sichtbar für den Nutzer (Annahmenbox).
- Grenzen des Modells werden kommuniziert, nicht verschwiegen.
- Kein Rechner zeigt Nachkommastellen, die durch die Eingabegenauigkeit nicht gedeckt sind.

Dies ist die fachliche Begründung für die Pflicht-`AssumptionsBox` in Calculator-Apps und für `02_OPEN_QUESTIONS.md` UX-05.

---

### P-07 — Constraint Dominance

🟡 ADAPTIERT (kein Density-Matrix-Algorithmus) — Quelle: Architecture Strategy Paper VX, KDR 8

Wenn Informationsmenge, Screen-Größe und Verständlichkeit kollidieren, gewinnt Verständlichkeit.

- Mobile darf Details reduzieren, aber nie die Kernaussage verfälschen.
- Weniger Daten zeigen ist besser als unlesbares Rauschen.
- Komplexe Szenarien dürfen auf Mobile vereinfacht werden — solange die fachliche Wahrheit erhalten bleibt.

**Nicht erlaubt:** Mobile zeigt andere Zahlen als Desktop, weil es einfacher wirkt.

---

### P-08 — A11y als Strategie-Vertrag

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, KDR 13

Barrierefreiheit ist kein nachträgliches Audit — sie ist ein Vertrag zwischen Strategie und Renderer. Jede App-Strategie liefert eine A11y-Repräsentation.

| App-Familie | A11y-Minimalanforderung |
|---|---|
| Calculator | Ergebnis-Summary als Text + ARIA Live Region bei Neuberechnung |
| Scenario Chart | Tabellarische Darstellung der wichtigsten Szenarien |
| Chart-App (via Chart-Engine) | Chart-Engine-eigene A11y-Tabelle (`_renderA11yTable()`) |
| Quiz / Decision | Fragenstatus + Ergebnissummary |
| Explorer / Karte | Tabellarische Alternative zur Visualisierung |

Der Renderer erfindet keine Barrierefreiheit nachträglich — die Strategie liefert die Daten.

**Offen:** Konkrete A11y-Spezifikation pro App-Familie → `02_OPEN_QUESTIONS.md` Arch-07

---

### P-09 — Theme-Hoheit: semantische Rollen statt Hex-Werte

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, KDR 14

Das Ghost-Theme hat Design-Hoheit. Apps liefern semantische Rollen, keine freien Farbwerte.

| Richtig ✓ | Falsch ✗ |
|---|---|
| `resultTone: "warning"` | `resultColor: "#ff0000"` |
| CSS Custom Property via `FwTheme.js` | Hardcoded Hex-Wert in JS |

Farbänderungen erfordern nur eine Änderung in `screen.css :root`. Kein App-Code wird für Design-Anpassungen angefasst.

Erweitert `01_DECISION_LOG.md` A-04 (Design-System-Bridge) um die Anforderung: semantische Rollen werden von der Strategie vergeben, nicht vom Renderer.

---

### P-10 — Reise eines Inputs als Pflichtabschnitt in APP_SPEC.md

🟢 DIREKT ÜBERNOMMEN — Quelle: Architecture Strategy Paper VX, Appendix A

Jede `APP_SPEC.md` enthält einen Abschnitt „Reise eines Inputs / Datenpunkts". Er zeigt am Beispiel eines konkreten Werts, wie ein Input durch alle Schichten läuft:

1. Eingang (Ghost-Card, CSV, JSON, User Input)
2. Parsing und Validierung (Two-Step, P-02)
3. Freezing in AppData (P-01)
4. Transformation in der Strategie
5. Verpackung im AppContext (P-04)
6. Rehydrierung und Rendering (Unit Sovereignty, P-05)

**Warum:** Wer diesen Pfad nicht beschreiben kann, hat die App-Architektur nicht vollständig durchdacht. Dieser Abschnitt ist Spec-Pflicht, kein Doku-Bonus.

**Vorlage:** Appendix A im Architecture Strategy Paper VX.

---

### P-11 — Fetch-Dedup-Cache

🟢 ENTSCHIEDEN — Quelle: Pilot-Erfahrung `prokrastinations-preis` Slice 2, 2026-06-05

Jede `loadData`-Funktion, die externe Dateien lädt (CSV, JSON), cacht das laufende Promise auf Modul-Level. Mehrere Container mit derselben URL lösen nur einen HTTP-Request und einen Parse-Vorgang aus.

**Implementierungsmuster:**

```js
const _dataCache = new Map();

async function loadData(url) {
  if (!url) return { error: 'b', message: '...' };
  if (!_dataCache.has(url)) _dataCache.set(url, _loadDataImpl(url));
  return _dataCache.get(url);
}

async function _loadDataImpl(url) { /* eigentliche Lade- und Parse-Logik */ }
```

**Warum Promise cachen, nicht Result:** Mehrere Container starten gleichzeitig beim `DOMContentLoaded`. Erst das Cachen der Promise — vor dem ersten `await` — verhindert Race Conditions. Alle gleichzeitigen Aufrufe bekommen dieselbe Promise zurück.

**Scope:** Gilt für alle Apps mit externer Datenpipeline (CSV, JSON). Calculator-Apps ohne externe Daten sind ausgenommen.

**Übergangsregel:** Bis die gemeinsame App-Shell existiert (→ offene Frage F-06 in §13), liegt dieser Cache in jeder `app.js`. Wenn die Shell kommt, wandert der Cache dorthin. P-11 bleibt als Prinzip — nur der Ablageort ändert sich.

---

## 11. Sicherheitsregeln

🟢 ENTSCHIEDEN — Quelle: `01_DECISION_LOG.md` Q-01, Q-02; `docs/steering/audits/SECURITY-BASELINE.md`

Vor App-Arbeit: `docs/steering/audits/SECURITY-BASELINE.md` lesen — Pflicht, kein optionaler Schritt.

### Grundregeln

- **Alle `data-*` Attribute sind untrusted input.** Keine Ausnahme, auch bei intern erstellten Cards.
- **SafeDOM:** Nutzdaten nie via `innerHTML` — immer `textContent` oder sichere Renderer
- **Kein Code aus Daten ausführen** — CSV und JSON sind Daten, keine Programmierschnittstelle
- **Whitelist-Prinzip für `data-fw-options`:** Nur bekannte Keys werden verarbeitet, unbekannte stillschweigend ignoriert
- **CSV/JSON validieren** vor Verwendung: Format, Felder, Wertebereich
- **Domain-/Pfadregeln:** Externe URLs nur aus erlaubten Quellen (`www.finanzwesir.com`-Domain)
- **Empty-State statt Crash:** Ungültige Daten → sauberer Fehlerzustand, kein technischer Absturz
- **Keine externen CDN-Abhängigkeiten** ohne explizite Architekturentscheidung und Eintrag im DECISION-LOG
- **TopoJSON und Karten-Abhängigkeiten lokal bundeln** — keine CDN-Sonderregel für die Weltkarte oder andere Nicht-Chart.js-Abhängigkeiten (🟢 A-08)

### Attribut-Sicherheit

| Attribut | Behandlung |
|---|---|
| `data-fw-app` | Whitelist-Check gegen bekannte App-Slugs |
| `data-fw-data` | URL-Validierung gegen erlaubte Domains |
| `data-fw-config` | URL-Validierung gegen erlaubte Domains |
| `data-fw-options` | Key-Whitelist pro App; Werte-Typ-Check |
| `data-fw-theme` | Enum-Whitelist (`default`, `inverted`) |

---

## 12. Definition of Done für eine App

Gegliedert nach Verantwortungsbereich. Alle Punkte müssen vor Release erfüllt sein.

### Fachlich

- [ ] Kernaussage der App entspricht dem App-Briefing im ETF-Apps-Hauptdokument
- [ ] Annahmen (Rendite, Inflation, Zeitraum) explizit dokumentiert und sichtbar für Nutzer
- [ ] Tonalität passt zur App-Familie (Block G: respektvoll-analytisch, nicht motivierend)

### UX/UI

- [ ] Alle vier States implementiert: Loading, Content, Error, Empty
- [ ] Mobile-Test (375px) bestanden
- [ ] `prefers-reduced-motion` respektiert
- [ ] A11y-Mindestanforderungen: Tastatur-Navigation, ARIA-Labels für Slider/Inputs, WCAG-AA-Kontrast
- [ ] Kein technischer Stack-Trace sichtbar für Endnutzer

### Daten

- [ ] CSV und/oder JSON-Config vorhanden und validiert
- [ ] Datenquellen in README.md dokumentiert
- [ ] Cache-Busting-Strategie für Datendateien definiert
- [ ] Schwere Datenaufbereitung nicht im Browser — vorverarbeitete Ergebnisdatei

### Code

- [ ] `app.js` enthält nur App-spezifische Logik (kein Shell-Code)
- [ ] Keine globalen IDs als App-API
- [ ] Alle DOM-Selektoren relativ zum App-Root
- [ ] Whitelist für `data-fw-options` definiert und implementiert
- [ ] Keine CDN-Abhängigkeiten ohne DECISION-LOG-Eintrag

### Ghost-Integration

- [ ] `ghost-card.example.html` in `APP_SPEC.md` oder als Datei im App-Ordner
- [ ] Ghost-Card-Beispiel auf Copy-Paste-Tauglichkeit geprüft
- [ ] URL-Schema für Datendateien definiert (inkl. Cache-Busting)

### Sicherheit

- [ ] `SECURITY-BASELINE.md` vor Implementierung gelesen
- [ ] SafeDOM-Prinzip umgesetzt: kein `innerHTML` für Nutzdaten
- [ ] Alle `data-*` Attribute als untrusted input behandelt
- [ ] CSV/JSON-Validierung implementiert

### Dokumentation

- [ ] `README.md`: Zweck, Inputs, Outputs, Annahmen, Modulrolle
- [ ] `APP_SPEC.md`: Shell, Daten, UI-Primitiven, States, Ghost-Card-Vertrag
- [ ] `NOTES.md`: Entwicklungsnotizen, Prototypen-Verweise, offene Fragen

### Testbarkeit

- [ ] `app.test.html`: Lokale Testseite mit Live-Server lauffähig
- [ ] Manueller Testplan (`/manual-test-plan`) ausgeführt
- [ ] `code-quality-faang-review` durchgeführt
- [ ] Albert hat getestet und bestätigt

---

## 13. Offene Fragen

Nur die für den App-Fabrik-Standard relevanten Fragen. Vollständige Liste: `02_OPEN_QUESTIONS.md`.

### Namespace und Vertrag

**F-01 — Soll `data-app` aus AUTHOR_GUIDE langfristig auf `data-fw-app` migriert werden?**  
❓ OFFEN  
Der `AUTHOR_GUIDE-v3.md` nennt `data-app="[slug]"` als Attribut. Der aktuelle Standard verwendet `data-fw-app`. Wann und wie wird der AUTHOR_GUIDE aktualisiert? Braucht es eine Migrations-Dokumentation für bestehende Ghost-Cards?

**F-02 — Braucht es ein eigenes Redakteurs-Cheat-Sheet für `fw-apps` analog zum Chart-Cheat-Sheet?**  
❓ OFFEN  
Das `Cheat-Sheet HTML-Karten.md` deckt nur die Chart-Engine ab. App-Fabrik-Apps haben eigene Attribute (`data-fw-app`, `data-fw-data`, `data-fw-options`). Ein separates Cheat-Sheet für Redakteure wäre konsequent. Empfehlung: nach Pilot-1 erstellen, wenn der Vertrag stabil ist.

### Dateistruktur

**F-03 — Wann wird die Draft-Dateistruktur pro App verbindlich?**  
❓ OFFEN  
Die in §5 definierte Struktur ist ein Draft-Vorschlag. Sie wird verbindlich nach: erfolgreichem Pilot-1-Abschluss, Alberts expliziter Freigabe, Überführung in `docs/spec/`. Bis dahin: keine repo-weite Erzwingung.

### Daten und Konfiguration

**F-04 — Wie werden JSON-Konfigurationen redakteursfreundlich erzeugt und validiert?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` Data-03  
Option A: Claude erzeugt JSON auf Basis von Albert-Input. Option B: Schema + Generator-Skript. Option C: Vorgefertigte Beispieldateien zum Kopieren. Empfehlung: Option A für Pilot, danach Prozess evaluieren.

**F-05 — Versionierung von Datendateien?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` Data-04  
URL-Parameter `?v=YYYY-MM`, Dateiname mit Datum oder Git-Versioning? Ghost-Cache und Browser-Cache erfordern Cache-Busting.

### Architektur

**F-06 — AppRegistry-Implementierung: ES-Module oder globale Registry?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` Arch-01  
Blockiert die Bootstrapper-Implementierung. Entscheidung nach Pilot-1.

**F-07 — Bootstrapper: Wann initialisiert er Apps?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` Arch-02  
DOMContentLoaded, load, IntersectionObserver (lazy) oder explizites Trigger-Attribut?

**F-08 — Wo liegt langfristig die Grenze zwischen Chart-Engine und App-Fabrik?**  
❓ OFFEN  
Charts sind heute Infrastruktur mit eigenem Vertrag. App-Fabrik-Apps nutzen die Chart-Engine als Baustein. Wird diese Grenze formell definiert? Wann wird geprüft ob Charts als App-Familie migriert werden?

### UX/UI

**F-09 — Gemeinsame App-Hülle: Anatomie der Pflichtbereiche?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` UX-01  
Kandidaten: App-Header, Subline, Control-Zone, Ergebnis-Zone, Annahmenbox, CTA, Quellenhinweis. Wird konkretisiert in `04_CLAUDE_WORKFLOW_DRAFT.md`.

**F-10 — CTA-Standard: Funnel-Station vs. Standalone?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` UX-02  
Jede App muss als Funnel-Station (CTA = nächste App) und Standalone-Embed (CTA = Sparplan starten) funktionieren.

**F-11 — Unsicherheits-Copy: Pflicht oder optional?**  
❓ OFFEN — Quelle: `02_OPEN_QUESTIONS.md` UX-05  
Jede App mit Renditeannahmen braucht eine sichtbare Annahmenbox. Ist das Pflicht (wird in DoD verankert) oder optional?

---

## 14. Nächster Schritt

Nach Freigabe dieser V0.1 durch Albert:

1. **`04_CLAUDE_WORKFLOW_DRAFT.md` ausarbeiten** — Orchestrierung der vorhandenen Skills für den App-Entwicklungs-Workflow (Intake → Spec → Gate → Build → Release)
2. **`APP_SPEC.md` für Pilot-1 erstellen** — `risiko-uebersetzer`, App-Familie Calculator, kein externer Datenbedarf, Ghost-Card-Beispiel, alle vier States. Pilot-2: `prokrastinations-preis` (Daten-/Chart-/Story-Pilot).
3. **Pilot-1 bauen** — `risiko-uebersetzer` als ersten App-Fabrik-Durchlauf; Factory-Lücken durch echte Erfahrung identifizieren
4. **Standard erhärten** — nach Pilot-1-Abschluss diesen Draft in `docs/spec/APP-FACTORY-STANDARD.md` überführen

Der Pilot testet nicht die inhaltlich wichtigste App zuerst. Er härtet das Fließband an einer überschaubaren App, bevor komplexere Apps gebaut werden.
