# App-Inventar — App-Fabrik

Stand: 2026-05-18 | Arbeitsstand | Geändert von: Claude
Quelle: Repo-Stand 2026-05-18 | ETF-Apps-Hauptdokument.md | ETF-App-Fabrik_Produktlandkarte_V0-2.md

**Alle Verweise auf Arbeitsordner zeigen auf `/Apps/[slug]/`.**
In `docs/App-Fabrik` liegt nur diese Inventar-Tabelle, kein produktiver Code.

---

## Legende

| Spalte | Erklärung |
|---|---|
| App-Ordner | Realer Ordner in `/Apps/` |
| Master-Zuordnung | Zugehöriger Funnel-Block aus ETF-Apps-Hauptdokument.md |
| Modulrolle | Master-App / Erweiterungsmodul / Companion-App / Konzept-Fragment |
| Eigenständigkeit | Kann die App allein stehen? |
| Factory-Familie | Technische Template-Familie |
| Datenbedarf | Datenformat und Typ |
| Chartbedarf | Visualisierungsintensität |
| Offene Klärung | Was muss noch entschieden werden |

---

## Vollständige Inventar-Tabelle (22 App-Ordner)

| App-Ordner | Master-Zuordnung | Modulrolle | Eigenständigkeit | Factory-Familie | Datenbedarf | Chartbedarf | Offene Klärung |
|---|---|---|---|---|---|---|---|
| `crash-reaktions-test` | A2 Crash-Reaktions-Test | Master-App | vollständig eigenständig | Decision + Scenario Chart | Historische Crash/Recovery-Daten (CSV) | Hoch — animierter Linien-Chart | Crash-Szenario (2020?), Nachkaufannahme, Animationstiefe |
| `diversifikations-detektor` | C1 Diversifikations-Detektor | Master-App | vollständig eigenständig | Explorer / Compare | ETF-/Index-Overlap-Daten (JSON) | Hoch — Donut + Weltkarte + Heatmap | ETF-Datenmodell, Overlap-Engine, Verbindung zu Companion-Apps (→ Data-02) |
| `esg-spiegel` | E1 ESG-Spiegel | Master-App | vollständig eigenständig | Explorer / Compare | ETF-Holdings/Overlap (JSON) | Mittel — Kachelgrid + Compare | Datenquelle, Aktualisierungsprozess, rechtliche Sauberkeit |
| `etf-namensdecoder` | D1 ETF-Namensdecoder | Master-App | vollständig eigenständig | Parser / Explainer | Token-Dictionary (JSON) | Niedrig — Token-Chips, keine Charts | Freitext-Eingabe ja/nein, garantierte Kürzel-Liste |
| `etf-reifegrad-finale` | H1 ETF-Reifegrad-Test + Start-Konfigurator | Master-App | vollständig eigenständig | Quiz + Configurator | Fragen/Scoring/Empfehlungen (JSON) | Niedrig bis mittel — Score-Anzeige | Quiz-Engine, State-Übernahme aus anderen Apps (→ UX-02) |
| `geburtsjahrlos` | B2 Geburtsjahrlos-Simulator | Master-App + Multi-Modul | eigenständig; rollierende-sparplaene als Erweiterungsmodul | Scenario Chart | Historische MSCI-/CPI-Daten (CSV + normiertes JSON) | Hoch — Fächer-Diagramm, Linien, Vergleich | Datenpipeline normieren, Chart-Engine-Integration. Rollenaufteilung 🟡 Arbeitsannahme (→ Z-03) |
| `investment-universum` | C1 Diversifikations-Detektor | Gegenperspektive / Grundmodell | kein Code, Konzept-Fragment | Explorer / Compare (Erweiterung) | Indexhierarchie (JSON) | Mittel — Baustein-Ansicht | Abgrenzung zu Weltkarte, Verbindung C1/C2/C3 (→ Fam-03) |
| `komplexitaets-entlarver` | C2 Komplexitätsentlarver | Master-App | vollständig eigenständig | Compare / Complexity Reducer | Portfolio-/Vergleichsdaten | Mittel — Kachelgrid + Kollaps-Animation | Echte oder didaktische Performancedaten? Kollaps-Komponente |
| `kostenkiller-ter` | D3 TER-Rechner / Kostenkiller | Master-App | vollständig eigenständig | Calculator + Cost Scenario Chart | Formeln + Beispielwerte (Config-JSON) | Mittel — drei Kurven + Vergleichstabelle | Formelstandard, monatl. vs. jährl. Verzinsung, Defaults |
| `market-timing-simulator` | B3 Market-Timing-Simulator | Master-App | vollständig eigenständig | Challenge / Decision + Reveal Chart | Historische Kursdaten (CSV) | Hoch — interaktiver Zeitreihen-Chart | Reveal-Chart-Komponente, Erfolgskriterium, Börsenuhr-Variante ja/nein |
| `markt-kam-zurueck` | A3 Der Markt kam zurück. Du nicht. | Master-App / Companion im A-Trio | vollständig eigenständig; dramaturgisch eng mit A1/A2 | Scenario Chart + Decision Threshold + Translator | Historische MSCI-World-Daten (CSV), optional CPI/Realwerte; Nutzereingaben Startjahr, Verlusttoleranz, optional Depotwert/Sparrate | Hoch — historische Linie, Ausstiegsmarker, weiterlaufende Marktkurve, verpasste Erholung | Datenbasis MSCI World definieren, Startjahr-Range, Verlustschwellen-Logik, A1-Ankerliste wiederverwenden |
| `passiv-paradox` | G3 Passiv-Paradox | Master-App | 🟡 Arbeitsannahme: eigenständig, fachlich eng mit G2 | Interactive Explainer | Textzustände/Annahmen (JSON) | Niedrig bis mittel | Eigenständige App, keine Zusammenlegung (→ Fam-01 in Decision Log) |
| `prokrastinations-preis` | B1 Prokrastinations-Preis | Master-App | vollständig eigenständig | Calculator + Live Counter | Keine externen Daten; Config-JSON | Mittel — zwei Linien + animierter Counter | Default-Rendite, real/nominal, Formelstandard |
| `regulatorik-dashboard` | G1 Regulatorisches Risiko Dashboard | Master-App | vollständig eigenständig; Prototyp vorhanden | Dashboard + Scenario Calculator | Szenarien/Annahmen (Config-JSON) | Mittel bis hoch — KPI-Grid + Szenariomatrix | Factory-Migration, CDN entfernen, Tests, Tonalität Block G |
| `rendite-kalibrierung` | G2 Rendite-Kalibrierung | Master-App | vollständig eigenständig | Scenario Calculator + Compare Chart | Annahmen zu Renditen/Kosten (Config-JSON) | Mittel — Szenarien + Balkenvergleich | Annahmen definieren, Unsicherheitsmarkierung, CAPE-Kontext |
| `renditekiller-volatilitaet` | F1 Renditekiller Volatilität | Master-App | vollständig eigenständig | Calculator / Simulation | Modellannahmen | Mittel — zwei animierte Linien | Fachliches Modell (Pfad-/Volatilitätsmodell) sauber definieren |
| `replizierer-swapper` | D2 Replizierer vs. Swapper | Master-App | vollständig eigenständig | Explainer / Animation | Statische Mechanik-/Risikodaten | Mittel — zwei parallele Animationen | Fachliche Tiefe begrenzen, Animationstemplate |
| `risiko-uebersetzer` | A1 Risiko-Übersetzer / Dacia-Test | Master-App | vollständig eigenständig | Calculator + Translator | Statische Ankerliste (Config-JSON) | Niedrig bis mittel — KPI-Cards + Ergebnissatz | Ankerliste finalisieren, Rendite-/Inflationsannahmen standardisieren |
| `rollierende-sparplaene` | B2 Geburtsjahrlos-Simulator | Erweiterungsmodul / Analysemodus | kein eigenständiger Funnel-Slot; Prototyp v2 vorhanden | Scenario Chart (Erweiterung) | MSCI NTR + CPI-Daten (CSV) | Hoch — rollierende Kohorten-Chart | Datenpipeline normieren. Rolle als Erweiterungsmodul von B2 🟡 Arbeitsannahme (→ Z-03) |
| `thesaurierer-rennen` | F2 Thesaurierer vs. Ausschütter | Master-App | vollständig eigenständig | Calculator / Comparison Race | Annahmen (Config-JSON) | Mittel — Wettrennen / zwei Linien | Steuerlogik vereinfachen oder bewusst ausklammern |
| `weltdepot-baukasten` | C3 Weltdepot-Baukasten | Master-App | vollständig eigenständig | Configurator / Portfolio Compare | Portfolio-Templates (JSON) | Hoch — Tortendiagramme + Vergleich | Baukasten-Datenmodell, Varianten-Renderer, Performancedaten |
| `weltkarte-etf-indizes` | C1 Diversifikations-Familie | Visuelles Lernmodul / Companion-App | eigenständig nutzbar; Prototyp v2 vorhanden | Explorer / Visual | Index-/Geo-Daten (JSON) | Hoch — interaktive Weltkarte (D3) | D3/TopoJSON lokal gebundelt 🟢 (→ A-08). Verbindung zu C1 🟡 Arbeitsannahme (→ Z-04) |

---

## Zusammenfassung: App-Familien

| Factory-Familie | Apps |
|---|---|
| Calculator | risiko-uebersetzer, prokrastinations-preis, kostenkiller-ter, rendite-kalibrierung (teil), thesaurierer-rennen, renditekiller-volatilitaet |
| Scenario Chart | geburtsjahrlos, rollierende-sparplaene, crash-reaktions-test, markt-kam-zurueck, market-timing-simulator, regulatorik-dashboard (teil) |
| Decision / Quiz | crash-reaktions-test, market-timing-simulator, etf-reifegrad-finale |
| Explorer / Compare | diversifikations-detektor, investment-universum, weltkarte-etf-indizes, esg-spiegel, komplexitaets-entlarver, weltdepot-baukasten |
| Parser / Explainer | etf-namensdecoder, replizierer-swapper, passiv-paradox |
| Dashboard | regulatorik-dashboard |
| Configurator / Quiz | etf-reifegrad-finale |

---

## Multi-Modul-Master-Apps

### A — Risiko überleben (Durchhalte-Trio)

| Ordner | Rolle | Fachliche Aussage |
|---|---|---|
| `/Apps/risiko-uebersetzer/` | A1 Dosis-App | Verlust muss in Euro und konkrete Dinge übersetzt werden, damit der Nutzer seine tragbare ETF-Dosis findet |
| `/Apps/crash-reaktions-test/` | A2 Feuerprobe-App | Im Crash entscheidet Verhalten, nicht Wissen |
| `/Apps/markt-kam-zurueck/` | A3 Ausstiegsfolgen-App | Der teuerste Verlust ist oft nicht der Crash, sondern die verpasste Erholung nach dem Ausstieg |

### B2 — Geburtsjahrlos-Simulator (Multi-Modul)

| Ordner | Rolle | Fachliche Aussage |
|---|---|---|
| `/Apps/geburtsjahrlos/` | Master-App | Timing-Illusion zerstören — historischer Fächer zeigt Renditeabhängigkeit vom Startjahr |
| `/Apps/rollierende-sparplaene/` | Erweiterungsmodul / Analysemodus | Dieselben Sparpläne aus verschiedenen Startjahren — macht Startjahrabhängigkeit quantifizierbar |

### C1 — Diversifikations-Detektor + Familie (Multi-Modul)

| Ordner | Rolle | Fachliche Aussage |
|---|---|---|
| `/Apps/diversifikations-detektor/` | Master-App | Scheindiversifikation sichtbar machen — mehr ETFs = mehr Doppelungen |
| `/Apps/investment-universum/` | Gegenperspektive / Grundmodell | Das Investment-Universum bleibt konstant — Industrieländer + Schwellenländer |
| `/Apps/weltkarte-etf-indizes/` | Visuelles Lernmodul / Companion-App | Index-Zusammensetzung auf Weltkarte farblich hervorheben |

---

## Prototypen-Status

| App-Ordner | Prototyp-Zustand | Priorität Factory-Migration |
|---|---|---|
| `regulatorik-dashboard` | Vollständig (Single-HTML, Tailwind-CDN) | Mittel — wichtige Referenz, aber kein erster Pilot |
| `rollierende-sparplaene` | Stark (msci-sparplan_v2 + annotated) | Mittel — nach B2-Template |
| `weltkarte-etf-indizes` | Stark (etf-index-map_v2, 16 Indizes, Mobile Bottom Sheet) | Mittel — nach Explorer-Template |
| `investment-universum` | Konzept-Fragment (Prompt-Dokument, kein Code) | Niedrig — erst nach C1 |
| `markt-kam-zurueck` | Kein Code vorhanden; Ordner bereits angelegt; Mini-Spec neu | Nach A1/A2 als Block-A-Trio spezifizieren |
| `prokrastinations-preis` | Kein Code vorhanden | **Pilot 1 (P-01 entschieden 2026-05-09)** |
| `risiko-uebersetzer` | Kein Code vorhanden | Pilot 2 |
| Alle anderen | Kein Code vorhanden | Gemäß Pilot-Strategie (05_PILOT_STRATEGY.md) |
