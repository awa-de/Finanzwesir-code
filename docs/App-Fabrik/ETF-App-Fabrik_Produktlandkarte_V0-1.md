# ETF-App-Fabrik – Produktlandkarte V0.1

**Quelle:** `ETF-Apps-Hauptdokument.md` aus `Apps.zip`, ergänzt um die bereits vorliegenden Architektur-, Interface- und Ghost-Theme-Informationen.  
**Zweck:** Arbeitsdokument für die App-Fabrik. Diese Tabelle ist bewusst nicht final, sondern eine bestmöglich vorausgefüllte Struktur, die anschließend manuell ergänzt werden kann.  
**Stand:** 2026-05-09

---

## 0. Lesehilfe

Diese Produktlandkarte beantwortet nicht die Frage „Welche App ist wichtiger?“. Das Hauptdokument setzt alle Apps als strategisch relevant. Die entscheidende Fabrik-Frage lautet stattdessen:

> Welche Apps gehören zur selben App-Familie und können deshalb mit demselben technischen Template gebaut werden?

Die Spalte **App-Familie** ist deshalb die wichtigste Spalte dieser Tabelle. Wenn sie stimmt, kann aus 18 Einzelprojekten eine App-Fabrik werden.

---

## 1. Empfohlene Standardisierung der Datenformate

Für die App-Fabrik empfiehlt sich ein gemischtes Modell:

| Zweck | Format | Begründung |
|---|---|---|
| Tabellarische Daten | CSV | Für Redakteure am einfachsten, gut aus Excel/Sheets exportierbar, ideal für Zeitreihen, Vergleichstabellen, historische Daten. |
| App-Konfiguration | JSON | Besser für strukturierte App-Parameter: Slider-Grenzen, Defaults, Texte, Szenarien, Tooltips, Whitelists, Validierungsregeln. |
| Kleine HTML-Card-Overrides | `data-options` | Nur für einfache Redakteursbefehle wie `range:5y`, `benchmark:ACWI`, `mode:ranking`. Nicht als Hauptkonfiguration missbrauchen. |

**Praktische Konsequenz:**  
Der Redakteur sollte möglichst selten JSON direkt schreiben müssen. JSON sollte aus Vorlagen, Generatoren oder validierten Beispiel-Dateien entstehen. Für redaktionelle Daten bleibt CSV der Standard.

Empfohlenes Muster:

```text
app-name.config.json   # Struktur, Defaults, Slider, Texte, Szenarien
app-name.data.csv      # Tabellen-/Zeitreihen-/Vergleichsdaten
HTML-Card              # App-Aufruf + Pfade + wenige Overrides
```

---

## 2. Produktlandkarte – Kurzfassung

| # | App | Slug | Block | Funnel-Funktion | App-Familie | Hauptinteraktion | Datenbedarf | Chartbedarf | Rechenlogik | Status | Aufwand | Fabrik-Relevanz | Offene Klärung |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Risiko-Übersetzer / Dacia-Test | `risiko-uebersetzer` | A1 | Verlusttoleranz fühlbar machen | Rechner + psychologischer Translator | Slider für Gesamtvermögen und ETF-Anteil; Ja/Nein-Schmerztest | Statische Ankerliste; optional JSON | Niedrig; evtl. einfache KPI-/Balkenanzeige | Mittel: Verlust, Renditeerwartung, Realrendite | Offen | Gering | Sehr hoch: ideales Calculator-Template | Exakte Ankerliste finalisieren; Rendite-/Inflationsannahmen standardisieren |
| 2 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | B2 | Timing-Illusion zerstören | Szenario-Rechner + Zeitreihen-Visualisierung | Startjahr/Geburtsjahr, Sparrate, Laufzeit; historische Pfade | Historische MSCI-World-Daten; vermutlich CSV für Zeitreihe, JSON für Szenarien | Hoch: Fächerdiagramm / Linien / Vergleich | Hoch: rollierende Sparpläne, Opportunitätskosten | Offen | Mittel | Hoch: Standard für historische Szenario-Apps | Datenquelle, Renditeberechnung, reale/nominale Werte klären |
| 3 | Crash-Reaktions-Test | `crash-reaktions-test` | A2 | Crash-Angst in Verhalten übersetzen | Entscheidungs-Test + Szenario-Chart | Drei Entscheidungen: verkaufen, halten, nachkaufen | Historische Crash-/Recovery-Daten | Hoch: animierter Linienchart | Mittel bis hoch: Pfade nach Entscheidung | Offen | Mittel | Hoch: Template für Entscheidungs-/Reaktions-Apps | Historisches Referenzszenario; Nachkaufannahme; Animationstiefe |
| 4 | Diversifikations-Detektor | `diversifikations-detektor` | C1 | Scheindiversifikation sichtbar machen | Explorer + Overlap-Analyse | ETF-Auswahl per Klick; regionale/inhaltliche Überlappung | ETF-/Index-Kompositionsdaten; JSON sinnvoll | Hoch: Kreisdiagramm, Weltkarte, Heatmap | Hoch: Overlap- und Gewichtungslogik | Offen; Weltkarte ergänzend in Arbeit | Mittel | Sehr hoch: Template für Explorer/Overlap-Apps | Datenmodell für ETF-Überschneidungen; Verbindung zur Weltkarten-App |
| 5 | ETF-Namensdecoder | `etf-namensdecoder` | D1 | Sprachbarriere abbauen | Parser + interaktive Erklärung | ETF-Name auswählen oder eingeben; Token anklicken | Token-Dictionary als JSON | Niedrig | Mittel: Regex-/Dictionary-Parsing | Offen | Gering | Sehr hoch: gutes Parser-/Explainer-Template | Freitext ja/nein? Welche Namen/Kürzel werden garantiert erkannt? |
| 6 | Regulatorisches Risiko Dashboard | `regulatorik-dashboard` | G1 | Systemkritischen Einwand ernst nehmen | Dashboard + Szenario-Rechner | Regler für Anspar-/Rentenphase; Szenarioauswahl | Annahmen/Szenarien; aktuell wohl hardcoded, später JSON | Mittel bis hoch: Vermögen, Auszahlung, Szenariomatrix | Hoch: Finanzmodell + Sensitivitäten | Gebaut | — | Hoch: Referenz für komplexe Story-Dashboards | In Factory-Standard überführen; Sonderlogik vom Template trennen |
| 7 | Rendite-Kalibrierung / ETF-Ära | `rendite-kalibrierung` | G2 | Erwartungsmanagement, Alternativenvergleich | Szenario-Rechner + Vergleichsdiagramm | Rendite-Slider; 3 ETF-Szenarien + Alternativencheck | Annahmen zu Renditen/Kosten; JSON für Szenarien | Mittel: Balkenvergleich | Mittel: Zukunftswerte, Szenarien | Offen | Mittel | Sehr hoch: Standard für Erwartungs-/Alternativenrechner | Annahmen, nominal/real, Kostenlogik, CAPE-Kontext |
| 8 | Market-Timing-Simulator | `market-timing-simulator` | B3 | Market Timing als Illusion erlebbar machen | Challenge-App + Reveal-Chart | Nutzer klickt Einstiegszeitpunkt; Zukunft wird enthüllt | Historische Kursdaten | Hoch: interaktiver Zeitreihenchart | Mittel: Vergleich Klick vs. sofort investiert | Offen | Mittel | Mittel bis hoch: Template für „Try-and-fail“-Apps | Zeitraum, Klickmechanik, Erfolgskriterium, Börsenuhr-Variante ja/nein |
| 9 | 1 ETF vs. 5 ETFs / Komplexitätsentlarver | `komplexitaets-entlarver` | C2 | Einfachheit legitimieren | Vergleichs-App + Reduktionsanimation | Experten-Depot kollabiert zu einfacher Lösung | Vergleichsdaten; ETF-Kategorien; Performancewerte | Mittel: Tabelle, ggf. Linien/Balken | Mittel: Vergleich/Ähnlichkeit | Offen | Gering | Hoch: Template für Komplexitätsreduktion | 5 oder 11 ETFs? Echte Daten oder didaktisches Beispiel? |
| 10 | TER-Rechner / Kostenkiller | `kostenkiller-ter` | D3 | Laufende Kosten wichtiger machen als Kaufkosten | Rechner + Kostenvergleich | Sparrate, Laufzeit, Kaufkosten, TER | Formeln + Beispielwerte aus Seminar; CSV optional | Mittel: drei Kurven / Vergleichstabelle | Hoch: Kostenwirkung über Zeit | Offen | Mittel | Sehr hoch: Standard-Calculator für Finanzmathematik | Formelstandard, monatliche vs. jährliche Verzinsung, Defaults |
| 11 | Prokrastinations-Preis | `prokrastinations-preis` | B1 | Aufschieben in Euro übersetzen | Rechner + Live-Counter | Sparrate, Anlagedauer, Rendite, Startverzögerung | Keine externe Datenquelle nötig; Defaults als JSON | Mittel: zwei Linien + Counter | Mittel: Zukunftswertformel | Offen | Gering | Sehr hoch: einfaches Calculator-Pilottemplate | Default-Rendite, Inflation ja/nein, reale/nominale Darstellung |
| 12 | ESG-Spiegel | `esg-spiegel` | E1 | ESG-Komplexität entzaubern | Vergleichs-/Explorer-App | Zwei ESG-ETFs auswählen; Top-Holdings vergleichen | ETF-Holdings/Top-5/Overlap; JSON | Mittel: Kachelgrid, Vergleichsmarkierung | Mittel: Überschneidungsgrad | Offen | Mittel | Mittel: spezieller Explorer, aber wiederverwendbare Compare-Komponenten | Datenquelle, Aktualisierung, rechtliche/inhaltliche Sauberkeit |
| 13 | Renditekiller Volatilität | `renditekiller-volatilitaet` | F1 | Volatilität als Renditeproblem erklären | Simulations-Rechner | Volatilitätsdämpfer-Slider | Modellannahmen; ggf. synthetische Daten | Mittel: zwei animierte Linien | Hoch: Volatilitäts-/Pfadmodell | Offen | Gering | Mittel: Mathematik-Erklärtemplate | Formel/Modell fachlich sauber definieren |
| 14 | Passiv-Paradox | `passiv-paradox` | G3 | Akademischen Einwand einordnen | Interaktiver Erklärungstext / Slider | Passiv-Anteil-Slider; Erklärung verändert sich | Statische Annahmen; JSON für Textzustände | Niedrig | Niedrig bis mittel | Offen; eher Ergänzungs-App | Gering | Mittel: Template für interaktive Erklärung | Eigene App oder Bestandteil von G2? |
| 15 | Replizierer vs. Swapper | `replizierer-swapper` | D2 | Produkttechnik entängstigen | Erkläranimation + Vergleich | Zwei parallele Mechanik-Animationen | Statische Mechanik- und Risikodaten | Mittel: Animation + Performancevergleich | Niedrig bis mittel | Offen | Hoch | Mittel: Animationserklärtemplate | Wie tief technisch? Performancevergleich echte Daten oder didaktisch? |
| 16 | Thesaurierer vs. Ausschütter | `thesaurierer-rennen` | F2 | Nebenentscheidung relativieren | Vergleichsrechner + Wettrennen | Zeitraum wählen; Ausschüttung vs. Wiederanlage | Annahmen zu Ausschüttung/Steuer; JSON | Mittel: Wettrennen / Linien | Mittel bis hoch: Wiederanlage, Steuer optional | Offen | Gering | Mittel: Vergleichsrechner mit starker Relativierung | Steuerlogik ja/nein; bewusst vereinfachen? |
| 17 | Weltdepot-Baukasten | `weltdepot-baukasten` | C3 | Konkrete Portfolio-Optionen zeigen | Konfigurator + Variantenvergleich | Tabs A–D; Varianten vergleichen | Portfolio-Templates; Gewichtungen; JSON | Hoch: Tortendiagramme, Vergleich | Mittel: Rebalancing-/Aufwandslogik | Offen | Mittel | Hoch: Template für Baukasten-/Konfigurator-Apps | Varianten finalisieren; Performancevergleich Datenbasis |
| 18 | ETF-Reifegrad-Test + Start-Konfigurator | `etf-reifegrad-finale` | H1 | Funnel abschließen und CTA geben | Quiz/Test + Konfigurator | 5 Reifegradfragen + 3 Startfragen | Fragen/Antwortpfade/Empfehlungen als JSON | Niedrig bis mittel | Mittel: Scoring + Empfehlung | Offen | Hoch | Sehr hoch: Abschluss-Template für Quiz/Score/CTA | Soll Ergebnisse aus vorherigen Apps übernehmen? State-Persistenz ja/nein? |

---

## 3. Produktlandkarte – Detail nach App-Familien

### 3.1 Rechner- und Szenario-Apps

Diese Apps sollten denselben technischen Kern verwenden:

```text
Input Controls → Validation → Calculation Engine → KPI Output → optional Chart → CTA
```

| App | Gemeinsamer Kern | App-spezifische Logik | Wahrscheinliche gemeinsame Komponenten |
|---|---|---|---|
| Risiko-Übersetzer | Slider, Live-KPIs, Ergebnistext | Verlust in Konsumgut übersetzen | Slider, KPI-Karten, Ergebnis-Satz, CTA |
| Prokrastinations-Preis | Sparplanformel, Live-Counter | Verzögerungskosten emotionalisieren | Sparrate/Laufzeit/Rendite-Inputs, Counter, Linienvergleich |
| TER-Rechner | Kostenwirkung über Zeit | Kaufkosten vs. laufende Kosten trennen | Kosten-Inputs, Kurvenvergleich, Tabelle |
| Rendite-Kalibrierung | Zukunftswerte mit Szenarien | ETF vs. Alternativen | Rendite-Slider, Szenariokarten, Balkenvergleich |
| Thesaurierer vs. Ausschütter | Vergleich zweier Pfade | Ausschüttung/Reinvestition | Zwei-Pfade-Vergleich, Wettrennen/Chart |
| Renditekiller Volatilität | Modell-Simulation | Volatilitätsdämpfung | Simulationsslider, animierte Linien |

**Architektur-Hinweis:** Diese Apps sind die besten Kandidaten für das erste generische Calculator-Template.

---

### 3.2 Entscheidungs-, Test- und Quiz-Apps

Gemeinsames Muster:

```text
Frage/Challenge → Nutzerentscheidung → Auswertung → personalisierte Einordnung → CTA
```

| App | Gemeinsamer Kern | App-spezifische Logik | Wahrscheinliche gemeinsame Komponenten |
|---|---|---|---|
| Crash-Reaktions-Test | Entscheidungsscreen, Ergebniszustände | Crash-Verhalten simulieren | Choice Cards, Result Screen, Szenariochart |
| Market-Timing-Simulator | Challenge, Reveal, Vergleich | Nutzerklick gegen „sofort investieren“ | Reveal-Chart, Ergebnisvergleich, Punchline |
| ETF-Reifegrad-Test | Fragen, Scoring, Empfehlung | Funnel-Zusammenfassung + Startkonfiguration | Quiz Engine, Score, Empfehlungskarten, CTA |

**Architektur-Hinweis:** Diese Apps brauchen vermutlich eine kleine `DecisionEngine` oder `QuizEngine`, bei der Fragen, Optionen, Ergebniszustände und CTA-Texte aus JSON kommen.

---

### 3.3 Explorer-, Parser- und Vergleichs-Apps

Gemeinsames Muster:

```text
Auswahl/Eingabe → Analyse/Parsing/Mapping → Visualisierung → Erklärung
```

| App | Gemeinsamer Kern | App-spezifische Logik | Wahrscheinliche gemeinsame Komponenten |
|---|---|---|---|
| ETF-Namensdecoder | Text-/Auswahlinput, Token-Erklärung | ETF-Namen per Regeln zerlegen | Token Chips, Accordion, Dictionary Lookup |
| Diversifikations-Detektor | Auswahl mehrerer Objekte, Overlap | ETF-Überschneidung/Regionen | Multi-Select, Donut/Karte, Warnhinweis |
| ESG-Spiegel | Vergleich zweier Objekte | ESG-Top-Holdings und Overlap | Compare Cards, Highlighting, Kachelgrid |
| 1 ETF vs. 5 ETFs | Komplexität reduzieren | Depotvergleich und Ähnlichkeit | Kachelgrid, Kollaps-Animation, Vergleichstabelle |
| Weltdepot-Baukasten | Variantenvergleich | Portfolio-Templates A–D | Tabs, Portfolio-Karten, Donut, Checklist |

**Architektur-Hinweis:** Diese Apps brauchen wahrscheinlich einen gemeinsamen `CompareRenderer` und eine standardisierte Datenstruktur für `items`, `attributes`, `weights`, `overlaps` und `explanations`.

---

### 3.4 Systemkritische Dashboards und Erklär-Apps

Gemeinsames Muster:

```text
Einwand ernst nehmen → Szenarien zeigen → Schaden einordnen → robuste Entscheidung ableiten
```

| App | Gemeinsamer Kern | App-spezifische Logik | Wahrscheinliche gemeinsame Komponenten |
|---|---|---|---|
| Regulatorisches Risiko Dashboard | Szenarioregler, KPI-Vergleich | regulatorischer Renditeverlust | Scenario Matrix, Sensitivitätsregler, KPI-Vergleich |
| Rendite-Kalibrierung | Rendite-Szenarien + Alternativen | reduzierte Markterwartung | Szenariokarten, Balkendiagramm, Alternativencheck |
| Passiv-Paradox | Einwand-Slider, Erklärung | Marktstruktur/Passivanteil | Slider, erklärende Zustände, Accordion |

**Architektur-Hinweis:** Block G sollte tonal und gestalterisch eigene Regeln bekommen: weniger motivierend, mehr respektvoll-analytisch, mit klaren Unsicherheitsmarkierungen.

---

## 4. Technische Ableitung für die App-Fabrik

### 4.1 Voraussichtliche App-Familien

| App-Familie | Typische Apps | Benötigtes Template |
|---|---|---|
| Calculator | Risiko-Übersetzer, Prokrastinations-Preis, TER-Rechner, Rendite-Kalibrierung | `calculator-template` |
| Scenario Chart | Geburtsjahrlos, Crash-Reaktions-Test, Market-Timing, Regulatorik | `scenario-chart-template` |
| Quiz / Decision | Crash-Reaktions-Test, ETF-Reifegrad-Test, Market-Timing | `decision-template` |
| Explorer / Compare | Diversifikations-Detektor, ESG-Spiegel, 1 ETF vs. 5 ETFs, Weltdepot-Baukasten | `compare-explorer-template` |
| Parser / Explainer | ETF-Namensdecoder, Replizierer vs. Swapper, Passiv-Paradox | `explainer-template` |
| Dashboard | Regulatorik, ggf. Rendite-Kalibrierung als größere Variante | `dashboard-template` |

### 4.2 Vorläufige Standard-Dateistruktur pro App

```text
apps/{slug}/
  app.config.json        # Texte, Defaults, Slider, Szenarien, Whitelist
  app.data.csv           # tabellarische Daten, falls nötig
  app.schema.json        # Validierung der Konfiguration
  app.module.js          # app-spezifische Logik, möglichst dünn
  README.md              # Zweck, Inputs, Outputs, Annahmen
  test.html              # lokale Entwicklungs-/Review-Seite
```

### 4.3 Vorläufiger HTML-Card-Standard

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

Für reine Chart-Module kann der bestehende Chart-Contract weiterhin unterstützt werden. Langfristig sollte die App-Fabrik aber einen allgemeineren `data-fw-*`-Namensraum verwenden, damit Charts nur eine App-Familie unter mehreren sind.

---

## 5. Priorisierte Fabrik-Piloten

Da alle Apps strategisch wichtig sind, sollte die erste Pilot-App nicht nach Wichtigkeit gewählt werden, sondern nach **Template-Nutzen**.

| Pilot-Kandidat | Warum geeignet | Risiko |
|---|---|---|
| Prokrastinations-Preis | Sehr klares Calculator-Muster, geringe Datenabhängigkeit, hoher Wiederverwendungswert | Gefahr der Übervereinfachung bei Renditeannahmen |
| Risiko-Übersetzer | Emotional stark, Slider/KPI/CTA-Muster sehr wiederverwendbar | Konsumgut-Anker müssen redaktionell sauber sein |
| ETF-Namensdecoder | Sehr gute Parser-/Explainer-App, geringer Chartbedarf | Freitext-Parsen kann ausufern; besser mit kontrollierter Vorauswahl starten |
| Rendite-Kalibrierung | Sehr wertvoll für Szenario-/Alternativenrechner | Annahmen müssen besonders sauber dokumentiert werden |

**Empfehlung:**  
Für die App-Fabrik zuerst ein kleines, robustes `calculator-template` bauen. Dafür sind `Prokrastinations-Preis` oder `Risiko-Übersetzer` am besten geeignet. Danach ein `explainer-template` mit dem `ETF-Namensdecoder`. Erst danach komplexere Chart-/Explorer-/Dashboard-Apps.

---

## 6. Manuell zu ergänzen

Diese Punkte sind bewusst offen gelassen und sollten durch Albert / Redaktion ergänzt werden:

| Feld | Warum wichtig |
|---|---|
| Finale Datenquelle pro App | Entscheidet über CSV/JSON, Datenpflege und Validierung. |
| Fachliche Annahmen | Verhindert Scheingenauigkeit und spätere Widersprüche. |
| Muss-/Kann-Funktionen | Verhindert Scope Creep. |
| CTA pro App | Jede App ist Funnel-Station und Standalone-Embed. |
| Artikel-Kontext | Was erklärt der Artikel, was muss die App selbst erklären? |
| Aktualisierungsbedarf | Manche Daten sind statisch, andere müssen gepflegt werden. |
| Rechtliche/inhaltliche Sensibilität | Besonders bei ESG, Regulatorik, Renditeannahmen, Steuerlogik. |

---

## 7. Nächster sinnvoller Schritt

Nach dem manuellen Ergänzen dieser Produktlandkarte sollte daraus abgeleitet werden:

1. finale App-Familien,
2. erstes generisches App-Template,
3. HTML-Card-Contract für alle Apps,
4. Config-/CSV-Konvention,
5. Claude-Commands für Inventur, Konzept, Build, Review und Release.

Erst danach sollte Claude einzelne Apps produktiv bauen.
