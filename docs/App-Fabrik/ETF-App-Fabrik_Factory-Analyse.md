# ETF-App-Fabrik – Factory-Analyse

**Stand:** 2026-05-09 | Umbenannt: 2026-05-18  
**Quelle:** lokaler Repo-Abgleich mit `Finanzwesir-code-master.zip`, insbesondere `Apps/ETF-Apps-Hauptdokument-v2.md`, vorhandene App-Prototypen unter `Apps/`, Theme/Chart-Engine unter `Theme/`, Design-System unter `docs/design-system/`, Steuerungsdokumente unter `.claude/` und `docs/steering/`.  
**Zweck:** Repo-Abgleich, App-Familien-Zielmodell (7 Familien), Factory-Lücken-Analyse, Mini-Briefings. Ergänzung zu `ETF-App-Fabrik_App-Register.md` (schlanker Index) und `APP_INVENTORY.md` (vollständige Inventar-Tabelle).

---

## 0. Executive Summary

Die App-Landschaft ist noch nicht „beste App vs. schlechteste App”, sondern ein **Funnel-System aus 19 geplanten Apps** plus mehreren vorhandenen Prototypen. Die wichtigste Erkenntnis aus dem Repo-Abgleich:

> Wir bauen nicht 18 Einzelanfertigungen. Wir bauen 5–7 App-Familien mit gemeinsamen Templates, Datenverträgen, UI-Komponenten, Test-Gates und Claude-Workflows.

Der aktuelle Stand ist gut genug, um die App-Fabrik zu spezifizieren, aber noch nicht standardisiert genug, um sofort skaliert Code zu produzieren.

**Was bereits stark ist:**

- Entscheidungs-Trichter und App-Briefings sind im Hauptdokument gut beschrieben.
- Theme, Design-System, Chart-Engine und Claude-Projektsteuerung existieren bereits.
- Es gibt echte Prototypen für Regulatorik, rollierende Sparpläne und ETF-Weltkarte.
- Die Chart-Engine liefert ein starkes Architektur-Vorbild: Daten rein, validieren, versiegeln, Strategie wählen, rendern, Fehler abfangen.

**Was fehlt:**

- Ein verbindlicher App-Fabrik-Standard für alle Apps.
- Ein allgemeiner `fw-app` Bootstrapper neben der bestehenden Chart-Engine.
- Standard-Dateistruktur pro App.
- Config-/CSV-Konventionen pro App-Familie.
- Wiederverwendbare Komponenten für Slider, KPI-Karten, CTA, Szenario-Karten, Quiz, Explorer, Result-Screens.
- Test- und Review-Gates speziell für Apps.
- Migration der vorhandenen Single-HTML-Prototypen in die Factory-Struktur.

---

## 1. Repo-Realität: Was tatsächlich vorhanden ist

### 1.1 Vorhandene App-Artefakte im Repo

| Bereich | Vorhandene Dateien / Ordner | Einordnung für App-Fabrik |
|---|---|---|
| Master-Shortlist | `Apps/ETF-Apps-Hauptdokument-v2.md` | Primärquelle für 18 Apps, Funnel-Blöcke, Kernbotschaften, UX-Flows, Implementierungshinweise. |
| Regulatorik | `Apps/regulatorik-dashboard/` mit `dashboard-regulatorikXIX.html`, `etf-wahlurnen-rechner.html`, mehreren Bauprompts und UX-Reviews | Echte Prototypen / Super-App-Fragmente. Hoher fachlicher Wert, aber noch nicht factory-konform. |
| Rollierende Sparpläne | `Apps/rollierende-sparplaene/` mit `msci-sparplan_v2.html`, `msci-sparplan-annotated.html`, `ghost-integration-prompt.md` | Starker Kandidat für B2/Geburtsjahrlos bzw. historische Szenario-App. Enthält bereits Ziel-Datenpipeline. |
| Weltkarte | `Apps/weltkarte-etf-indizes/` mit `etf-index-map.html`, `etf-index-map_v2.html` | Vorhandener Explorer-Prototyp. Wichtig für C1 Diversifikations-Detektor und ggf. Investment-Universum. |
| Investment-Universum | `Apps/investment-universum/Prompt ...md` | Konzeptfragment für eine eigene App nahe C1/C2/C3. Noch kein Code. |
| Theme | `Theme/`, insbesondere `assets/css/screen.css`, `assets/js/fw-chart-engine/`, `package.json` | Ghost-Theme, Design-Tokens, lokale Fonts, Chart-Engine. Muss Host für App-Fabrik werden. |
| Design-System | `docs/design-system/` | Spezifikationen und Referenzen für Farben, Typografie, Komponenten, Layout, Interaktion. |
| Claude-System | `.claude/`, `docs/steering/` | Bereits stark: Commands, Skills, protected paths, Definition of Done, Security-/Performance-Audits. App-Fabrik muss integriert werden, nicht daneben entstehen. |

### 1.2 Vorhandene HTML-Prototypen

| Prototyp | Pfad | App-Bezug | Technischer Zustand | Factory-Bewertung |
|---|---|---|---|---|
| ETF-Regulatorik XIX | `Apps/regulatorik-dashboard/dashboard-regulatorikXIX.html` | G1 Regulatorisches Risiko Dashboard | Große Single-HTML-App mit Tailwind-CDN, Chart.js-CDN, inline CSS/JS, vielen Controls und KPIs | Inhaltlich wertvoll, aber muss in Module, Config, Daten und Theme-Anbindung zerlegt werden. |
| ETF-Wahlurnen-Rechner | `Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html` | G1 / Vorläufer oder Spezialvariante | Single-HTML, eigene CSS-Namespace-Konvention `er-*`, Szenarien S0–S3 | Als fachliche Quelle nutzen, nicht 1:1 als Factory-Standard. |
| MSCI Sparplan v2 | `Apps/rollierende-sparplaene/msci-sparplan_v2.html` | B2 Geburtsjahrlos / rollierende Sparpläne | Single-HTML mit Chart.js-CDN, eigenen Tokens, Dark/Light-Logik, KPIs | Sehr gutes Szenario-Chart-Material. Muss an Chart-Engine/Theme/Config angebunden werden. |
| MSCI Sparplan annotated | `Apps/rollierende-sparplaene/msci-sparplan-annotated.html` | B2 Geburtsjahrlos | Kommentierte Variante | Besonders wertvoll für Migration, weil Intention und Integration erläutert sind. |
| ETF Index Weltkarte | `Apps/weltkarte-etf-indizes/etf-index-map.html` | C1 / Weltkarte | D3 + TopoJSON-CDN, eigene App-Hülle, Auswahl bis 3 Indizes | Explorer-Prototyp. Braucht Datenmodell, lokale Dependencies oder Bundle-Entscheidung. |
| ETF Index Weltkarte v2 | `Apps/weltkarte-etf-indizes/etf-index-map_v2.html` | C1 / Weltkarte / Investment-Universum-Nähe | Erweiterte 16-Index-Variante mit Mobile Bottom Sheet | Bester Explorer-Prototyp im Repo. Gute Quelle für Compare-/Explorer-Template. |

### 1.3 Factory-Lücke aus Repo-Sicht

Die vorhandenen Prototypen zeigen, was fachlich und UX-seitig gemeint ist. Sie zeigen aber auch die Hauptlücke:

> Aktuell sind die Apps überwiegend **Single-HTML-Prototypen**. Die App-Fabrik braucht daraus **normierte App-Pakete**.

Zielzustand pro App:

```text
Apps/{slug}/
  README.md                 # App-Briefing, Zweck, Inputs, Outputs, Annahmen
  app.config.json            # Texte, Defaults, Slider, Szenarien, Whitelists
  app.data.csv               # optionale tabellarische Daten
  app.data.json              # optionale strukturierte Daten
  app.schema.json            # Validierung der Config/Daten
  app.module.js              # dünne app-spezifische Logik
  test.html                  # lokale Entwicklungsseite
  ghost-card.example.html    # Copy/Paste-Beispiel für Redakteur
```

---

## 2. Datenentscheidung: CSV, JSON oder beides?

### 2.1 Empfehlung

Für die App-Fabrik ist **beides** sinnvoll, aber mit klar getrennten Aufgaben:

| Zweck | Format | Warum |
|---|---|---|
| Tabellarische Daten | CSV | Am einfachsten für Redaktion, Excel/Sheets, Zeitreihen, Vergleichstabellen, historische Renditen. |
| Strukturierte Konfiguration | JSON | Besser für Slider, Defaults, Texte, Zustände, Szenarien, Whitelists, Tooltips, Scoring, UI-Flows. |
| Kleine Inline-Overrides in Ghost | `data-options` | Nur für kleine Redakteursbefehle, nicht als Hauptkonfiguration. |

### 2.2 Praktische Regel für Nicht-Programmierer

Redakteur soll möglichst **keinen JSON-Code frei tippen**. JSON ist technisch sinnvoll, aber fehleranfällig, wenn man ihn manuell schreibt.

Deshalb:

- CSV darf redaktionell bearbeitet werden.
- JSON wird aus validierten Vorlagen kopiert oder später über Generator/Schema geprüft.
- `data-options` bleibt klein und menschenlesbar.
- Jede App bekommt Beispiel-Dateien.

### 2.3 Standard-Muster

```html
<div
  class="fw-app"
  data-fw-app="risiko-uebersetzer"
  data-fw-family="calculator"
  data-fw-config="https://www.finanzwesir.com/content/files/apps/risiko-uebersetzer.config.json"
  data-fw-data="https://www.finanzwesir.com/content/files/apps/risiko-uebersetzer.data.csv"
  data-fw-options="variant:default">
</div>
```

Für reine Charts kann der bestehende `financial-chart-module`-Vertrag weiter unterstützt werden. Für die 18 Apps sollte aber ein allgemeiner `data-fw-*`-Namensraum entstehen.

---

## 3. App-Familien – Zielmodell

| App-Familie | Technisches Grundmuster | Typische Komponenten | Apps |
|---|---|---|---|
| **Calculator** | Inputs → Validierung → Formel → KPIs → Ergebnistext → CTA | Slider, Numeric Input, KPI Cards, Live Counter, Ergebnis-Satz | A1, B1, D3, F1, F2, G2 teilweise |
| **Scenario Chart** | Daten/Szenario → Transformation → Chart → Erklärung → CTA | Chart, Scenario Cards, Toggle, Legend, Tooltip, A11y-Tabelle | B2, A2, A3, B3, G1, G2 |
| **Decision / Quiz** | Frage/Challenge → Auswahl → Ergebniszustand → Empfehlung → CTA | Choice Cards, Result Screen, Score, Empfehlungskarten | A2, B3, H1 |
| **Explorer / Compare** | Auswahl/Eingabe → Mapping/Overlap/Parsing → visuelle Erklärung | Multi-Select, Chips, Tabs, Cards, Donut, Map, Compare Table | C1, C2, C3, E1, Investment-Universum |
| **Parser / Explainer** | Text/Objekt → Tokenisierung/Erklärung → Aufklapp-Details | Token Chips, Dictionary, Accordion, Tooltip | D1, D2, G3 teilweise |
| **Dashboard** | Mehrere Module → mehrere KPIs → Szenario-/Story-Logik | Sections, KPI Grid, mehrere Charts, Szenariomatrix | G1, ggf. G2 als größere Variante |
| **Finale / Configurator** | Diagnose → personalisierter Plan → CTA | Quiz, Form, Empfehlung, Copyable Output | H1 |

---

## 4. Produktlandkarte V0.2 – Gesamtübersicht

| # | App | Slug | Block | App-Familie | Hauptinteraktion | Datenbedarf | Chartbedarf | Rechenlogik | Repo-Status | Vorhandener Prototyp / Quelle | Factory-Lücke |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Risiko-Übersetzer / Dacia-Test | `risiko-uebersetzer` | A1 | Calculator + psychologischer Translator | Slider Gesamtvermögen, ETF-Anteil, Schmerztest Ja/Nein | Statische Ankerliste; Config-JSON | Niedrig | Verlust, ETF-Anteil, Renditeerwartung, Realrendite | Offen | Nur Hauptdokument | Calculator-Template, Ankerlisten-Config, KPI-Komponenten fehlen. |
| 2 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | B2 | Scenario Chart | Startjahr/Geburtsjahr, Sparrate, Laufzeit, historischer Fächer | Historische MSCI-/CPI-Daten; Ergebnis-JSON/CSV | Hoch | Rollierende Sparpläne, Real-/Nominalwerte, Opportunitätskosten | Teilweise Prototyp vorhanden | `Apps/rollierende-sparplaene/` | Prototyp muss von Single-HTML in Datenpipeline + Chart-Engine/Scenario-Template überführt werden. |
| 3 | Crash-Reaktions-Test | `crash-reaktions-test` | A2 | Decision + Scenario Chart | Crash-Animation, drei Entscheidungen: verkaufen/halten/nachkaufen | Historische Crash-/Recovery-Daten | Hoch | Pfade je Entscheidung, Nachkaufannahme | Offen | Nur Hauptdokument | Decision-Template, Result-Screen, Szenario-Datenformat fehlen. |
| 4 | Der Markt kam zurück. Du nicht. | `markt-kam-zurueck` | A3 | Scenario Chart + Decision Threshold + psychologischer Translator | Startjahr wählen, Verlusttoleranz setzen, Ausstiegspunkt und verpasste Erholung sehen | Historische MSCI-World-Daten; optional Depotwert/Sparrate; A1-Ankerliste als Config-JSON | Hoch | Maximaler Drawdown ab Startjahr, Trigger bei Verlusttoleranz, Ausstiegswert, heutiger Marktwert, verpasste Erholung | Offen; Ordner vorhanden | Neue Mini-Spec in `/Apps/markt-kam-zurueck/` | Historische Datenbasis, Chart-Logik, A1-Ankerlisten-Wiederverwendung und Härtetest-Modus definieren. |
| 5 | Diversifikations-Detektor | `diversifikations-detektor` | C1 | Explorer / Compare | ETF-Auswahl, Überlappung, regionale Aufteilung | ETF-/Index-Gewichte, Overlap-Daten | Hoch | Gewichtung, Overlap, Regionen | Teilweise Prototyp vorhanden | `Apps/weltkarte-etf-indizes/`, Investment-Universum-Konzept | Explorer-Datenmodell, Overlap-Engine, Verbindung Weltkarte ↔ Detektor fehlen. |
| 6 | ETF-Namensdecoder | `etf-namensdecoder` | D1 | Parser / Explainer | ETF-Name auswählen/eingeben, Token anklicken | Token-Dictionary JSON | Niedrig | Regex-/Dictionary-Parsing | Offen | Nur Hauptdokument | Parser-Template, Token-Dictionary, sichere Freitext-Regeln fehlen. |
| 7 | Regulatorisches Risiko Dashboard | `regulatorik-dashboard` | G1 | Dashboard + Scenario Calculator | Regler Anspar-/Rentenphase, Szenarien S0–S3 | Szenarioannahmen; später Config-JSON | Mittel bis hoch | Finanzmodell, Steuer-/Renditeeffekte, Rentenphase | Gebaut als Prototyp | `Apps/regulatorik-dashboard/` | Migration in Module/Config/Design-System, Entfernung CDN/Inline-Sonderlogik, Testplan. |
| 8 | Rendite-Kalibrierung / ETF-Ära | `rendite-kalibrierung` | G2 | Scenario Calculator + Compare Chart | Rendite-Slider, ETF-Szenarien, Alternativencheck | Annahmen zu Renditen/Kosten; Config-JSON | Mittel | Zukunftswerte, Szenarien, Alternativenvergleich | Offen | Nur Hauptdokument | Szenario-Calculator-Template, Annahmenstandard, Unsicherheits-Copy fehlen. |
| 9 | Market-Timing-Simulator | `market-timing-simulator` | B3 | Challenge / Decision + Reveal Chart | Nutzer klickt Einstiegspunkt, Zukunft wird enthüllt | Historische Kursdaten | Hoch | Vergleich Klick vs. sofort investiert | Offen | Nur Hauptdokument | Reveal-Chart-Komponente, Challenge-State, Erfolgskriterium fehlen. |
| 10 | 1 ETF vs. 5 ETFs / Komplexitätsentlarver | `komplexitaets-entlarver` | C2 | Compare / Complexity Reducer | ETF-Kacheln kollabieren, Performance-/Aufwandvergleich | Portfolio-/Vergleichsdaten | Mittel | Ähnlichkeit, Aufwand, Performancevergleich | Konzeptnah vorhanden | Investment-Universum-Konzept grenzt verwandte Idee ab | Compare-Template, Kachel-/Kollaps-Komponente, Datenmodell fehlen. |
| 11 | TER-Rechner / Kostenkiller | `kostenkiller-ter` | D3 | Calculator + Cost Scenario Chart | Sparrate, Laufzeit, Kaufkosten, TER | Formeln + Beispielwerte; Config-JSON | Mittel | Kostenwirkung über Zeit | Offen | Nur Hauptdokument | Kosten-Calculator-Template, Formelfestlegung, Default-Set fehlen. |
| 12 | Prokrastinations-Preis | `prokrastinations-preis` | B1 | Calculator + Live Counter | Sparrate, Dauer, Rendite, Startverzögerung | Keine externen Daten; Config-JSON | Mittel | Zukunftswertformel, Differenzberechnung | Offen | Nur Hauptdokument | Einfachster Calculator-Pilot; Standardkomponenten fehlen. |
| 13 | ESG-Spiegel | `esg-spiegel` | E1 | Explorer / Compare | ESG-ETFs auswählen, Top-Holdings vergleichen | ETF-Holdings/Overlap JSON | Mittel | Überschneidungsgrad, Highlighting | Offen | Nur Hauptdokument | Datenpflege-/Aktualisierungsstrategie, Compare-Komponenten fehlen. |
| 14 | Renditekiller Volatilität | `renditekiller-volatilitaet` | F1 | Calculator / Simulation | Volatilitätsdämpfer-Slider, Linienvergleich | Modellannahmen | Mittel | Pfad-/Volatilitätsmodell | Offen | Nur Hauptdokument | Fachliches Modell und Simulations-Template fehlen. |
| 15 | Passiv-Paradox | `passiv-paradox` | G3 | Interactive Explainer | Passiv-Anteil-Slider, Erklärung verändert sich | Textzustände/Annahmen als JSON | Niedrig | Niedrig bis mittel | Offen | Nur Hauptdokument | Entscheiden: eigene App oder G2-Section; Explainer-Template fehlt. |
| 16 | Replizierer vs. Swapper | `replizierer-swapper` | D2 | Explainer / Animation | Zwei parallele Mechanik-Animationen | Statische Mechanik-/Risikodaten | Mittel | Niedrig bis mittel | Offen | Nur Hauptdokument | Animationstemplate und fachliche Tiefengrenze fehlen. |
| 17 | Thesaurierer vs. Ausschütter | `thesaurierer-rennen` | F2 | Calculator / Comparison Race | Wettrennen über 10/20/30 Jahre | Annahmen zu Ausschüttung, Wiederanlage, ggf. Steuer | Mittel | Wiederanlage-/Steuerlogik | Offen | Nur Hauptdokument | Steuervereinfachung, Vergleichsmodell, Race-Komponente fehlen. |
| 18 | Weltdepot-Baukasten | `weltdepot-baukasten` | C3 | Configurator / Portfolio Compare | Tabs A–D, Variantenvergleich | Portfolio-Templates JSON | Hoch | Gewichtungen, Rebalancing-/Aufwandslogik | Teilweise Konzept/Prototyp-Nähe | Weltkarte + Investment-Universum berühren Thema | Baukasten-Datenmodell, Varianten-Renderer, Donut/Checklist fehlen. |
| 19 | ETF-Reifegrad-Test + Start-Konfigurator | `etf-reifegrad-finale` | H1 | Quiz + Configurator | 5 Reifegradfragen, 3 Startfragen, personalisierter Output | Fragen/Scoring/Empfehlungen JSON | Niedrig bis mittel | Scoring + Empfehlung | Offen | Nur Hauptdokument | Quiz-Engine, State-Übernahme, Finale-CTA-Standard fehlen. |

---

## 5. Sehr kleine App-Briefings pro App

### A1 – Risiko-Übersetzer / Dacia-Test

- **Nutzerfrage:** Wie viel ETF-Anteil halte ich emotional aus?
- **Kernbotschaft:** Verlust muss fühlbar werden, nicht abstrakt bleiben.
- **Familie:** Calculator + psychologischer Translator.
- **Inputs:** Gesamtvermögen, ETF-Anteil, Crash-Szenario fix –50 %.
- **Outputs:** Absoluter Verlust, Verlust vom Gesamtvermögen, Konsumgut-Anker, langfristige Renditeerwartung, CTA.
- **Factory-Nutzen:** Idealer erster Calculator-Standard mit Slider, KPI-Karten, Ergebnis-Satz.
- **Lücke:** Ankerliste, Rendite-/Inflationsannahmen, Slider-Design und Copy finalisieren.

### A2 – Crash-Reaktions-Test

- **Nutzerfrage:** Was mache ich, wenn mein Depot plötzlich 30 % fällt?
- **Kernbotschaft:** Verhalten entscheidet mehr als ETF-Auswahl.
- **Familie:** Decision + Scenario Chart.
- **Inputs:** Nutzerentscheidung: verkaufen, halten, nachkaufen.
- **Outputs:** Ergebnisverlauf je Verhalten, Erklärung, Punchline, CTA.
- **Factory-Nutzen:** Template für Entscheidungsscreen → Result-Screen → Chart.
- **Lücke:** Historisches Crash-Szenario, Nachkaufannahme und Animationsumfang festlegen.

### A3 – Der Markt kam zurück. Du nicht.

- **Nutzerfrage:** Was kostet es mich, wenn ich im Verlust aussteige und nie wieder zurückkomme?
- **Kernbotschaft:** Der Durchschnitt hilft dir nicht, wenn dich der schlimmste Abschnitt aus dem Markt wirft.
- **Familie:** Scenario Chart + Decision Threshold + psychologischer Translator.
- **Inputs:** Startjahr, Verlusttoleranz, optional Depotwert oder Sparrate.
- **Outputs:** Maximaler Verlust ab Startjahr, Ausstiegsmarker, Ergebnis „durchgekommen / ausgestiegen", verpasste Erholung bis heute, Übersetzung in konkrete Dinge/Erlebnisse.
- **Factory-Nutzen:** Standard für historische Belastungstests mit persönlichem Trigger und Ergebnisübersetzung.
- **Lücke:** Historische Datenbasis, Jahrbereich, Trigger-Logik, Härtetest-Modus und A1-Ankerlisten-Wiederverwendung definieren.

### B1 – Prokrastinations-Preis

- **Nutzerfrage:** Was kostet es mich, wenn ich später anfange?
- **Kernbotschaft:** Warten ist kein neutraler Zustand, sondern kostet Euro.
- **Familie:** Calculator + Live Counter.
- **Inputs:** Sparrate, Anlagedauer, Rendite, Startverzögerung.
- **Outputs:** Heute-starten vs. später-starten, Differenz in Euro, CTA.
- **Factory-Nutzen:** Einfachster Pilot für Calculator-Template.
- **Lücke:** Default-Rendite, real/nominal, Inflationsdarstellung und Formelstandard definieren.

### B2 – Geburtsjahrlos-Simulator

- **Nutzerfrage:** Wie stark hängt mein Ergebnis vom Startzeitpunkt ab?
- **Kernbotschaft:** Du kontrollierst nicht dein Geburtsjahr, aber den Start.
- **Familie:** Scenario Chart / historische Sparplan-App.
- **Inputs:** Startjahr/Geburtsjahr, Sparrate, Laufzeit.
- **Outputs:** Historischer Fächer, Kindersparplan, „hätte ich damals“-Vergleich.
- **Factory-Nutzen:** Standard für historische Szenario-Apps.
- **Repo-Bezug:** `rollierende-sparplaene` enthält bereits starke Vorarbeit.
- **Lücke:** Datenpipeline und Chart-Engine-Integration normieren.

### B3 – Market-Timing-Simulator

- **Nutzerfrage:** Kann ich den perfekten Einstieg treffen?
- **Kernbotschaft:** Du bist nicht schlauer als der Markt.
- **Familie:** Challenge / Decision + Reveal Chart.
- **Inputs:** Klick auf historischen Chart-Zeitpunkt.
- **Outputs:** Enthüllung Zukunft, Vergleich User-Klick vs. sofort investieren.
- **Factory-Nutzen:** Template für spielerische „Try-and-fail“-Apps.
- **Lücke:** Reveal-Chart-Komponente und Datenformat fehlen.

### C1 – Diversifikations-Detektor

- **Nutzerfrage:** Bin ich wirklich diversifiziert oder kaufe ich dasselbe mehrfach?
- **Kernbotschaft:** Mehr ETFs bedeuten oft nur mehr Doppelungen.
- **Familie:** Explorer / Compare.
- **Inputs:** Auswahl mehrerer ETFs/Indizes.
- **Outputs:** Regionale Aufteilung, Überschneidung, Weltkarte/Donut, Warnhinweis.
- **Factory-Nutzen:** Kern-Template für Explorer/Overlap-Apps.
- **Repo-Bezug:** Weltkarten-App und Investment-Universum-Konzept liefern Vorarbeit.
- **Lücke:** ETF-/Index-Datenmodell, Overlap-Engine, Verbindung Weltkarte ↔ Detektor.

### C2 – Komplexitätsentlarver / 1 ETF vs. 5 ETFs

- **Nutzerfrage:** Bringt ein komplexes Depot wirklich mehr als ein einfacher Welt-ETF?
- **Kernbotschaft:** Mehr Arbeit, kaum Mehrwert.
- **Familie:** Compare / Complexity Reducer.
- **Inputs:** Auswahl oder Anzeige eines Experten-Depots.
- **Outputs:** Vereinfachungsanimation, Vergleichstabelle, Performance-/Aufwandsvergleich.
- **Factory-Nutzen:** Wiederverwendbare Vergleichs- und Reduktionslogik.
- **Lücke:** Entscheiden, ob echte Daten oder didaktisches Beispiel; Kollaps-Komponente fehlt.

### C3 – Weltdepot-Baukasten

- **Nutzerfrage:** Welche einfache Weltdepot-Variante passt?
- **Kernbotschaft:** Mehrere Wege führen zum Ziel; Einfachheit bleibt robust.
- **Familie:** Configurator / Portfolio Compare.
- **Inputs:** Tabs A–D oder Variante auswählen.
- **Outputs:** Portfolio-Gewichte, Checkliste, Rebalancing-Aufwand, Performancevergleich.
- **Factory-Nutzen:** Template für Konfigurator-Apps.
- **Lücke:** Portfolio-Templates, Datenmodell, Variantenrenderer.

### D1 – ETF-Namensdecoder

- **Nutzerfrage:** Was bedeutet dieser kryptische ETF-Name?
- **Kernbotschaft:** Wenn du den Namen lesen kannst, sinkt die Angst.
- **Familie:** Parser / Explainer.
- **Inputs:** Vorauswahl realer ETF-Namen oder Freitext.
- **Outputs:** Farbige Token-Zerlegung, Erklärung je Token.
- **Factory-Nutzen:** Sehr gutes Parser-/Explainer-Template.
- **Lücke:** Token-Dictionary, Freitext-Grenzen, sichere Parsing-Regeln.

### D2 – Replizierer vs. Swapper

- **Nutzerfrage:** Ist ein Swap-ETF gefährlich?
- **Kernbotschaft:** Mechanik unterschiedlich, Ergebnis oft ähnlich, beide reguliert.
- **Familie:** Explainer / Animation.
- **Inputs:** Wenig bis keine; ggf. Umschalter Mechanik/Performance/Risiko.
- **Outputs:** Zwei parallele Abläufe, Risikometer, Performancevergleich.
- **Factory-Nutzen:** Animationserklärtemplate.
- **Lücke:** Fachliche Tiefe begrenzen; Animationstemplate fehlt.

### D3 – TER-Rechner / Kostenkiller

- **Nutzerfrage:** Welche Kosten sind wirklich gefährlich?
- **Kernbotschaft:** Kaufkosten-Optimierung ist Hobby, TER-Optimierung ist Pflicht.
- **Familie:** Calculator + Cost Scenario Chart.
- **Inputs:** Sparrate, Laufzeit, Kaufkosten, TER.
- **Outputs:** Drei Kurven, fehlende Anteile, Vergleich Kaufkosten vs. laufende Kosten.
- **Factory-Nutzen:** Standard-Calculator für Finanzmathematik.
- **Lücke:** Formelstandard, Periodisierung, Defaults.

### E1 – ESG-Spiegel

- **Nutzerfrage:** Unterscheiden sich ESG-ETFs wirklich stark?
- **Kernbotschaft:** Die Top-Positionen sind oft dieselben.
- **Familie:** Explorer / Compare.
- **Inputs:** Auswahl von zwei ESG-ETFs.
- **Outputs:** Top-Holdings-Vergleich, Überschneidung, Highlight identischer Firmen.
- **Factory-Nutzen:** Compare-Komponenten wiederverwendbar.
- **Lücke:** Datenquelle und Aktualisierungspflege kritisch.

### F1 – Renditekiller Volatilität

- **Nutzerfrage:** Warum kann weniger Schwankung mehr Ergebnis bedeuten?
- **Kernbotschaft:** Ein Anleihenanteil kann Kalkül sein, nicht Feigheit.
- **Familie:** Calculator / Simulation.
- **Inputs:** Volatilitätsdämpfer-Slider.
- **Outputs:** Zwei Pfade, Endwertdifferenz, Erklärung.
- **Factory-Nutzen:** Simulations-Template.
- **Lücke:** Mathematisches Modell fachlich sauber definieren.

### F2 – Thesaurierer vs. Ausschütter

- **Nutzerfrage:** Muss ich thesaurierend oder ausschüttend wählen?
- **Kernbotschaft:** Nachkomma-Entscheidung; wichtiger ist anfangen.
- **Familie:** Calculator / Comparison Race.
- **Inputs:** Zeitraum, Annahmen zu Ausschüttung/Wiederanlage.
- **Outputs:** Wettrennen, Ergebnisdifferenz, Relativierung.
- **Factory-Nutzen:** Vergleichsrechner mit bewusstem De-Eskalationsabschluss.
- **Lücke:** Steuerlogik bewusst vereinfachen oder ausklammern.

### G1 – Regulatorisches Risiko Dashboard

- **Nutzerfrage:** Was, wenn Politik und Steuern die ETF-Rendite beschädigen?
- **Kernbotschaft:** Risiko ist real, zerstört aber eher Details als die Strategie.
- **Familie:** Dashboard + Scenario Calculator.
- **Inputs:** Ansparphase, Entnahmephase, Szenarioauswahl.
- **Outputs:** Endvermögen, Mehrersparnis, Rentenauszahlung, Szenariomatrix.
- **Factory-Nutzen:** Referenz für komplexe Story-Dashboards.
- **Repo-Bezug:** Prototypen und umfangreiche Prompt-/Review-Dokumentation vorhanden.
- **Lücke:** Migration in Factory-Struktur, Konfigurationsauslagerung, Tests.

### G2 – Rendite-Kalibrierung / „Ist die ETF-Ära vorbei?"

- **Nutzerfrage:** Was, wenn ETFs künftig schlechter performen?
- **Kernbotschaft:** Selbst wenn ETFs schlechter werden, werden Alternativen nicht besser.
- **Familie:** Scenario Calculator + Compare Chart.
- **Inputs:** Erwartete Rendite, Sparrate/Laufzeit als Defaults.
- **Outputs:** optimistisch/realistisch/pessimistisch, Alternativenvergleich.
- **Factory-Nutzen:** Sauberer Standard für Erwartungsmanagement-Apps.
- **Lücke:** Annahmen, Unsicherheitsmarkierung, Alternative-Renditen definieren.

### G3 – Passiv-Paradox

- **Nutzerfrage:** Was passiert, wenn alle passiv investieren?
- **Kernbotschaft:** Das Paradox ist real, ändert aber nicht die Privatanlegerentscheidung.
- **Familie:** Interactive Explainer.
- **Inputs:** Passiv-Anteil-Slider.
- **Outputs:** Erklärung je Marktstruktur-Zustand.
- **Factory-Nutzen:** Template für kleine interaktive Erklärstücke.
- **Lücke:** Entscheiden, ob eigene App oder Untersektion von G2.

### H1 – ETF-Reifegrad-Test + Start-Konfigurator

- **Nutzerfrage:** Bin ich bereit, und was soll ich konkret tun?
- **Kernbotschaft:** Wenn die Blockaden gelöst sind, wird der Start banal.
- **Familie:** Quiz + Configurator.
- **Inputs:** 5 Reifegradfragen, 3 Startfragen.
- **Outputs:** Reifegrad, Rückverweis auf Apps, Startempfehlung.
- **Factory-Nutzen:** Finale-Template für Funnel/CTA.
- **Lücke:** Quiz-Engine, Scoring, State-Übernahme aus vorherigen Apps klären.

---

## 6. Vorhandene Prototypen: Was daraus in die Factory übernommen werden sollte

### 6.1 Regulatorik-Dashboard

**Übernehmen:**

- Szenario-Denke S0–S3.
- Storytelling-Achse „früher / heute / denkbar morgen".
- KPI-Logik: Endvermögen, Mehrersparnis, Rentenauszahlung.
- Tonalität Block G: ernst, respektvoll, nicht motivierend-verkürzend.

**Nicht übernehmen als Standard:**

- Single-HTML-Struktur.
- CDN-Abhängigkeiten innerhalb der App.
- Inline-Tailwind-Konfiguration pro App.
- App-spezifische Sonderklassen als allgemeines Muster.

**Factory-Migration:**

```text
regulatorik-dashboard/
  README.md
  app.config.json        # Szenarien, Defaultwerte, Texte, Tooltips
  app.module.js          # dünne Logik
  regulatorik.model.js   # fachliche Berechnungen
  ghost-card.example.html
  test.html
```

### 6.2 Rollierende Sparpläne / Geburtsjahrlos

**Übernehmen:**

- 24/25 rollierende 30-Jahres-Kohorten.
- Real-/Nominal-Umschalter.
- KPI-Zeile.
- Historischer Startjahr-Vergleich.
- Datenpipeline-Idee: MSCI NTR + CPI → normalisierte Ergebnisdatei.

**Factory-Migration:**

```text
geburtsjahrlos/
  README.md
  app.config.json
  msci_ntr.csv
  us_cpi.csv
  sparplan_results.json
  app.module.js
  ghost-card.example.html
```

**Wichtige Architekturentscheidung:**

Die schwere Datenaufbereitung sollte nicht im Browser passieren. Browser-App bekommt bereits normalisierte Ergebnisse. Das passt zur Factory: Frontend bleibt robust, schnell und erklärbar.

### 6.3 Weltkarte / ETF-Indizes

**Übernehmen:**

- Auswahl bis 3 Indizes.
- Mobile Bottom Sheet aus v2.
- Gruppierung nach Region/Universum.
- Overlap-Idee: Überlappungen sichtbar machen.
- Weltkarten-/Explorer-Interaktion.

**Factory-Migration:**

```text
weltkarte-etf-indizes/
  README.md
  app.config.json
  index-data.json
  geo-data.json oder lokale Quelle
  app.module.js
  ghost-card.example.html
```

**Offene technische Entscheidung:**

D3/TopoJSON lokal ins Theme legen, bundeln oder für diese App separat zulassen. Für App-Fabrik gilt: keine zufälligen CDN-Abhängigkeiten je App.

### 6.4 Investment-Universum

**Übernehmen:**

- Klare Abgrenzung zur Weltkarte.
- Idee: Nutzer baut scheinbar komplexe ETF-Kombination, App zeigt: „Du baust ACWI nach".
- Mobile-first-Denke.
- Hierarchie: ACWI/All-World → Developed + EM → Europa/USA/Pazifik.

**Factory-Einordnung:**

Nicht als weitere Weltkarte bauen. Besser als **Explorer/Compare-App mit Bausteinen**. Sie könnte langfristig C1/C2/C3 verbinden.

---

## 7. Factory-Lücken nach Kategorie

### 7.1 Architektur-Lücken

| Lücke | Warum kritisch | Empfehlung |
|---|---|---|
| Kein allgemeiner App-Bootstrapper | Chart-Engine findet Charts, aber nicht alle App-Typen. | `FwAppFactory` oder `AppBootstrapper` einführen, der `[data-fw-app]` initialisiert. |
| Kein App-Registry-Konzept | Jede App würde sonst eigene Initialisierung bekommen. | `AppRegistry.register(slug, factory)` als zentraler Einstieg. |
| Kein Standard-App-Paket | Prototypen bleiben Single-HTML. | Standard-Dateistruktur verbindlich machen. |
| Keine gemeinsame Config-Validierung | JSON/CSV-Fehler würden spät auffallen. | Schema + Validator + Empty State pro App-Familie. |
| Keine Wiederverwendungsbibliothek für Controls | Slider/KPI/CTA werden sonst pro App neu gebaut. | `components/` für Slider, KPI, CTA, Tabs, ChoiceCards, ResultScreens. |
| Chart-Engine und Nicht-Chart-Apps getrennt | Gefahr zweier Welten. | Chart-Engine als Subsystem der App-Fabrik behandeln, nicht als Sonderwelt. |

### 7.2 Daten-Lücken

| Lücke | Betroffene Apps | Empfehlung |
|---|---|---|
| Historische Renditedaten nicht final normiert | B2, A2, B3, G2 | Einheitliches Rendite-Datenformat mit Quelle, Datum, real/nominal, Währung. |
| ETF-/Index-Overlap-Daten fehlen | C1, C2, C3, E1 | Gemeinsames `index-universe.json` / `holdings.json` Schema. |
| Szenarioannahmen hardcoded | G1, G2, D3, F1, F2 | Szenarien in `app.config.json`, Formeln in Modul. |
| Redakteur-Workflow für JSON offen | Alle komplexeren Apps | JSON-Vorlagen + Schema-Check + später Generator. |
| Versionierung von Daten fehlt | Alle datengetriebenen Apps | `meta.generated_at`, `source`, `version`, `assumptions` verpflichtend. |

### 7.3 UX/UI-Lücken

| Lücke | Warum kritisch | Empfehlung |
|---|---|---|
| Gemeinsame App-Hülle fehlt | Apps wirken sonst ähnlich, aber nicht gleich. | Standard: Header, Subline, Control-Zone, Ergebnis-Zone, CTA, Quellen/Annahmen. |
| Mobile-Patterns nicht zentral definiert | Prototypen lösen Mobile individuell. | Bottom Sheet, Sticky CTA, vertikale Toolbar, Cards als Standards. |
| CTA-Standard fehlt | Jede App ist Funnel-Station und standalone Embed. | Pro App: primärer CTA + optionaler Rückverweis in Funnel. |
| Unsicherheits-Copy fehlt | Finanzapps können Scheingenauigkeit erzeugen. | Standard-Komponente „Annahmen & Grenzen". |
| Share/Viralität offen | Hauptdokument nennt Sozialprestige-Idee. | Kleine `share-result` Komponente später standardisieren. |

### 7.4 Code-Qualitäts-Lücken

| Lücke | Risiko | Empfehlung |
|---|---|---|
| Inline-CSS/JS in Prototypen | Nicht wartbar über 18 Apps. | Migration in Module + gemeinsame Styles. |
| CDN pro App | DSGVO/Performance/Konsistenz-Risiko. | Lokale Vendor-Assets oder definierter Build. |
| App-spezifische Tokens | Design driftet. | Nur CSS-Custom-Properties aus Theme. |
| Fehlende App-Tests | Fehler werden erst im Artikel sichtbar. | Pro App `test.html` + manuelle Testmatrix + Claude-Review-Gate. |
| Kein einheitliches Naming | „Kennt man eine App, kennt man alle" wird verfehlt. | Namenskonventionen für Dateien, Funktionen, DOM, CSS, Data-Attributes. |

### 7.5 Claude-/Workflow-Lücken

| Lücke | Empfehlung |
|---|---|
| Vorhandene Skills sind stark, aber nicht app-spezifisch orchestriert. | App-Fabrik-Commands bauen, die vorhandene Skills in richtiger Reihenfolge nutzen. |
| Extreme Ownership kann Scope aufblasen, wenn falsch eingesetzt. | Nur in Intake/Briefing/Spec nutzen, nicht während Codeproduktion. |
| Code-Quality-Review muss Qualitätsgate sein. | Nach Build und vor Release als Pflicht-Gate. |
| App-Factory-Standard fehlt als bindende Referenz. | `docs/spec/APP-FACTORY-STANDARD.md` anlegen. |

---

## 8. Empfohlene Factory-Struktur im Repo

### 8.1 Minimalinvasiv, passend zur bestehenden Struktur

```text
Apps/
  ETF-Apps-Hauptdokument-v2.md
  _factory/
    APP-FACTORY-STANDARD.md
    APP-FAMILIES.md
    APP-DATA-CONTRACT.md
    APP-HTML-CARD-CONTRACT.md
    APP-DEFINITION-OF-DONE.md
    templates/
      calculator/
      scenario-chart/
      decision-quiz/
      explorer-compare/
      parser-explainer/
      dashboard/
  risiko-uebersetzer/
  prokrastinations-preis/
  geburtsjahrlos/
  ...
```

Alternative: Standards unter `docs/spec/` ablegen. Vorteil: passt zur vorhandenen Dokumentationslogik. Nachteil: Apps-spezifische Standards liegen weiter weg von `Apps/`.

**Empfehlung:**

- Verbindliche Spezifikationen unter `docs/spec/`.
- App-nahe Templates unter `Apps/_factory/`.

### 8.2 Vorgeschlagene neue Dateien

```text
docs/spec/APP-FACTORY-STANDARD.md
docs/spec/APP-DATA-CONTRACT.md
docs/spec/APP-HTML-CARD-CONTRACT.md
docs/spec/APP-FAMILY-TEMPLATES.md
docs/steering/APP-FACTORY-DECISION-LOG.md
Apps/_factory/templates/calculator/README.md
Apps/_factory/templates/scenario-chart/README.md
Apps/_factory/templates/explorer-compare/README.md
```

---

## 9. Claude-Commands für die App-Fabrik

Nicht viele neue Skills bauen. Besser: vorhandene Skills orchestrieren.

### 9.1 Vorgeschlagene Commands

| Command | Zweck | Nutzt vorhandene Skills |
|---|---|---|
| `app-factory-intake.md` | App aus Hauptdokument in standardisiertes Briefing überführen | `01-process-extreme-ownership`, `uncertainty-map`, `distill` |
| `app-factory-spec.md` | App-Familie, Datenvertrag, HTML-Card, UX-Flow, Annahmen finalisieren | `spec-mode-architecture`, `spec-rewrite-guard`, `chain-of-custody` |
| `app-factory-build.md` | Code innerhalb des gewählten Templates erzeugen | `impl-mode-workpackages`, `check-mode-gatekeeper` |
| `app-factory-review.md` | Code, UX, Sicherheit, Design-System, Ghost-Integration prüfen | `code-quality-faang-review`, `manual-test-plan`, `patch-quittung` |
| `app-factory-release.md` | Doku, Ghost-Card, Daten, Testprotokoll, Übergabe finalisieren | `abschluss-ritual`, `uebergabe`, `chain-of-custody` |

### 9.2 Skill-Einordnung

| Skill | Nutzen für App-Fabrik | Einsatzphase |
|---|---|---|
| `01-process-extreme-ownership` | Briefing-Lücken und Scope-Risiken sichtbar machen | Intake/Spec, nicht im Coding-Modus |
| `code-quality-faang-review` | Standardisierung, Wartbarkeit, robuste Architektur prüfen | Review/Release |
| `spec-mode-architecture` | Vor dem Code belastbare technische Spezifikation erzeugen | Spec |
| `manual-test-plan` | Reproduzierbare Testschritte definieren | Review |
| `check-mode-gatekeeper` | Verhindert unkontrolliertes Ändern geschützter Bereiche | Build/Review |
| `chain-of-custody` | Nachvollziehbarkeit: welche Quelle führte zu welcher Entscheidung | Spec/Release |

---

## 10. Priorisierte Pilotstrategie V0.2

Da alle Apps strategisch wichtig sind, wird der Pilot nicht nach Wichtigkeit gewählt, sondern nach **Template-Nutzen**.

### 10.1 Empfohlene Pilot-Reihenfolge

| Rang | Pilot | Warum | Risiko |
|---:|---|---|---|
| 1 | **Prokrastinations-Preis** | Einfachster Calculator, kaum externe Daten, starker Wiederverwendungswert für Slider/KPI/Counter/CTA | Renditeannahmen dürfen nicht unseriös wirken. |
| 2 | **Risiko-Übersetzer** | Emotional stark, gleiche Calculator-Basis, Ankerlisten-Config testet JSON/Copy | Konsumgut-Anker müssen redaktionell sauber sein. |
| 3 | **ETF-Namensdecoder** | Explainer/Parser-Template ohne Chart-Komplexität | Freitext darf nicht ausufern. |
| 4 | **Geburtsjahrlos** | Nutzt vorhandenen Prototyp, testet Datenpipeline + Scenario Chart | Datenaufbereitung muss sauber ausgelagert werden. |
| 5 | **Weltkarte / Diversifikations-Detektor** | Nutzt vorhandenen Explorer-Prototyp, testet komplexere Interaktion | D3/TopoJSON- und Overlap-Datenmodell sind Zusatzkomplexität. |
| 6 | **Regulatorik-Dashboard** | Wichtiges fertiges Material, aber komplex | Nicht als erster Standard geeignet, weil Sonderfall-/Super-App-Gefahr. |

### 10.2 Warum nicht mit Regulatorik starten?

Regulatorik ist wichtig und bereits gebaut. Aber als erster Factory-Pilot ist sie riskant:

- zu viele Sonderfälle,
- zu viel Fachlogik,
- zu viele Szenarien,
- hoher Story-Dashboard-Anteil,
- Gefahr, dass das Sondermodell zum Standard erklärt wird.

Besser: Erst kleine Templates härten, dann Regulatorik in diese Standards migrieren.

---

## 11. Konkrete nächste Schritte

### Schritt 1 – App-Fabrik-Standard schreiben

Erstelle:

```text
docs/spec/APP-FACTORY-STANDARD.md
```

Inhalt:

- App-Familien
- Standard-Dateistruktur
- HTML-Card-Contract
- Datenformate CSV/JSON
- Design-System-Vertrag
- Code-Konventionen
- Sicherheitsregeln
- UX-Grundstruktur
- Definition of Done

### Schritt 2 – Calculator-Template bauen

Pilot mit `prokrastinations-preis` oder `risiko-uebersetzer`.

Template-Komponenten:

```text
Slider
NumericInput
KpiCard
LiveCounter
ResultSentence
AssumptionsBox
PrimaryCta
```

### Schritt 3 – App-Fabrik-Commands anlegen

Neue Commands unter:

```text
.claude/commands/app-factory-intake.md
.claude/commands/app-factory-spec.md
.claude/commands/app-factory-build.md
.claude/commands/app-factory-review.md
.claude/commands/app-factory-release.md
```

### Schritt 4 – Bestehende Prototypen nicht anfassen, sondern migrieren

Die Prototypen bleiben als Referenz erhalten. Neue Factory-Versionen entstehen daneben.

Beispiel:

```text
Apps/regulatorik-dashboard/_legacy/
Apps/regulatorik-dashboard/factory-version/
```

Oder:

```text
Apps/regulatorik-dashboard/prototypes/
Apps/regulatorik-dashboard/src/
```

### Schritt 5 – Danach erst Serienproduktion

Erst wenn eine App-Familie einmal sauber funktioniert, werden weitere Apps derselben Familie produziert.

---

## 12. Ausfüllfelder für manuelle Ergänzung

Diese Felder sind bewusst noch nicht final. Sie sollten pro App ergänzt werden.

| Feld | Frage |
|---|---|
| Finale Datenquelle | Woher kommen die Zahlen wirklich? |
| Datenpflege | Muss die Datei jährlich/monatlich/nie aktualisiert werden? |
| Fachliche Annahmen | Welche Annahmen müssen sichtbar gemacht werden? |
| Redakteurs-Optionen | Was darf in der HTML-Card geändert werden? |
| App-Kontext im Artikel | Was erklärt der Text, was muss die App selbst erklären? |
| CTA | Wohin führt die App als Funnel-Station? |
| Share-Satz | Welches Ergebnis kann der Nutzer sozialprestige-tauglich teilen? |
| Rechtliche Sensibilität | Rendite, Steuer, ESG, Produkttechnik: wo sind Warnhinweise nötig? |
| Minimum Lovable Version | Was ist die kleinste gute Version? |
| Nicht bauen | Was wird bewusst ausgeschlossen? |

---

## 13. Kurzfazit

V0.2 zeigt: Die App-Fabrik ist realistisch, weil schon genug Substanz vorhanden ist. Aber der kritische Schritt ist jetzt Standardisierung, nicht weiteres Prompting.

Die richtige Reihenfolge lautet:

```text
Produktlandkarte → App-Familien → Factory-Standard → erstes Template → Pilot-App → Review-Gate → Serienproduktion
```

Die falsche Reihenfolge wäre:

```text
18 Apps nacheinander prompten → 18 Single-HTML-Dateien → spätere Vereinheitlichung
```

Genau das würde den Zinseszins der Schlamperei erzeugen, den wir vermeiden wollen.
