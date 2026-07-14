# BLOG_MATCHING_DRY_RUN

Dry-Run: Blogpost-Rohmaterial-Zuordnung je App-Fabrik-App.
Quelle Kandidaten: `raw_candidates.json` (mechanischer Wortgrenzen-Vorfilter über 855 Blogposts; disposables Zwischenprodukt, per `tools/app_fabrik/scan_blog_candidates.py` regenerierbar).
Bewertung: inhaltlich gegen `steuerungsbloecke.json` (Zielzustand + Barriere je App).

**Artefakt-Ablage:** Pipeline-Daten (`steuerungsbloecke.json`, `suchachsen.json`, regeneriertes `raw_candidates.json`) unter `tools/app_fabrik/data/`; Migrations-Mappings (`blog_matching_final.json`, `blog_matching_vault.json`) in diesem Ordner (`docs/App-Fabrik/`).

**STATUS: Alle 25 Apps bewertet + kopiert (Aufgabe 1 abgeschlossen).** 148 Kopien in 24 `content/posts/apps/{slug}/Rohmaterial/`-Ordner; 121 Originale nach `Inhalte alte Site/blog/kopiert/` verschoben. 734 .md verbleiben im Blog-Root (nicht migriert). Mapping: `blog_matching_final.json`, Skript: `tools/app_fabrik/copy_rohmaterial.py`.

**Regeln:** Ziel-Dateiname = Original-Dateiname (Traceability). Mehrfach genutzte Originale (25 Stück) wurden in alle Ziel-Ordner kopiert und danach einmal verschoben.

**Zwei harte Filterregeln (beide an der Probe bestätigt):**
1. Wochenüberblick-Posts (`*-wochenueberblick-*`) sind reine Link-Sammlungen → immer verworfen, unabhängig von Wortzahl.
2. Ein bloßer Stichwort-Treffer genügt nicht. Der Post muss inhaltlich um Barriere/Zielzustand der App kreisen, nicht das Wort nur beiläufig nennen (verifiziert durch Lektüre der Originalposts bei Grenzfällen).

---

## risiko-uebersetzer — A1 Dosis-App / Risiko übersetzen

Barriere: Prozentzahlen wirken harmlos, der Nutzer überschätzt seine emotionale Verlusttragfähigkeit. Rohmaterial = Risikotoleranz, gefühlte vs. reale Verlustgröße, tragbare Aktienquote.

Rohkandidaten: 29 → final 7 (22 verworfen: 6 Wochenüberblick, 16 Produkt-/Themenposts mit nur beiläufigem `risikotoleranz`/`aktienquote`-Treffer).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2016-08-01-etf-schwankungen-depot.md | 2016-08-01-etf-schwankungen-depot.md | Nennt wörtlich die App-Barriere: „Neulinge neigen dazu, ihre Risikotoleranz zu überschätzen" — Kernstück des Dosis-Gedankens. |
| 2014-07-11-was-ist-risiko.md | 2014-07-11-was-ist-risiko.md | Grundlegende Definition von Risiko vs. Ungewissheit — Fundament für das Übersetzen abstrakter Prozente. |
| 2016-03-07-podcast-finanzwesir-rockt-folge-12-risiko.md | 2016-03-07-podcast-finanzwesir-rockt-folge-12-risiko.md | Podcast-Folge komplett zum Thema Risiko/Verlusttragfähigkeit. |
| 2021-06-07-risko-el-dinero-folge5.md | 2021-06-07-risko-el-dinero-folge5.md | Eigene Folge zu Risiko — Einsteiger-Perspektive auf tragbares Risiko. |
| 2015-01-21-maximaler-verlust-drawdown-depot.md | 2015-01-21-maximaler-verlust-drawdown-depot.md | Behandelt maximalen Verlust/Drawdown in konkreten Zahlen — übersetzt Verlustgröße in Erlebbares. |
| 2016-09-15-etf-boerse-ab-50.md | 2016-09-15-etf-boerse-ab-50.md | Aktienquote als Entscheidung nach tragbarem Risiko (Lebensphase) — direkt Dosis-Logik. |
| 2015-11-17-boersenpsychologie-aktiver-anleger.md | 2015-11-17-boersenpsychologie-aktiver-anleger.md | Börsenpsychologie/Selbstüberschätzung — psychologische Seite der Verlusttragfähigkeit. |

---

## crash-reaktions-test — A2 Feuerprobe-App

Barriere: Illusion, dass Wissen automatisch korrektes Verhalten im Crash erzeugt. Rohmaterial = Crash-Verhalten, Angst, Verkaufen/Aushalten unter Druck, Verlustpsychologie.

Rohkandidaten: 146 → final 15 (131 verworfen: ~50 Wochenüberblick, Rest Posts mit beiläufigem `crash`-Treffer in Produkt-/Strategie-/Krypto-/Lesertreffen-/Steuertexten; auch `kommentarregeln.md` und `autonome-zelle-*`).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2018-11-30-crash-was-tun.md | 2018-11-30-crash-was-tun.md | „Was tun im Börsencrash?" — direkt die Verhaltensfrage der App. |
| 2017-08-14-crash-angst-finanzwesir-rockt-folge42.md | 2017-08-14-crash-angst-finanzwesir-rockt-folge42.md | „Die Angst vor dem Crash" — Emotion vor dem Ereignis, Kern der Feuerprobe. |
| 2017-05-08-crash-tagesgeld-etf.md | 2017-05-08-crash-tagesgeld-etf.md | „Was tun gegen die Crash-Angst?" — Vorab-Regel statt Spontanreaktion. |
| 2023-02-01-aussitzen.md | 2023-02-01-aussitzen.md | „Ich sitz alles aus" — Halten-Verhalten im Verlust, eine der App-Handlungsoptionen. |
| 2022-04-28-buchverluste.md | 2022-04-28-buchverluste.md | „Buchverluste sind auch Verluste" — Verlustpsychologie, warum Halten schwerfällt. |
| 2018-02-26-verkaufen-finanzwesir-rockt-folge53.md | 2018-02-26-verkaufen-finanzwesir-rockt-folge53.md | „Aktien und ETFs verkaufen" — die Verkaufsentscheidung, zentrale Crash-Handlung. |
| 2017-02-07-msci-world-verlust.md | 2017-02-07-msci-world-verlust.md | „Verluste an der Börse, was tun?" — Handlungsfrage im Verlust. |
| 2021-07-02-boersenpsychologie-kognitive-verzerrungen-risiken-aktienmarkt.md | 2021-07-02-boersenpsychologie-kognitive-verzerrungen-risiken-aktienmarkt.md | „Psychologie gewinnt. Immer." — genau die Wissen-≠-Verhalten-Lücke. |
| 2015-11-17-boersenpsychologie-aktiver-anleger.md | 2015-11-17-boersenpsychologie-aktiver-anleger.md | Langer Grundlagentext Börsenpsychologie/Verhalten unter Stress. |
| 2021-07-16-risikomanagement-boerse-erfolg.md | 2021-07-16-risikomanagement-boerse-erfolg.md | Vorab-Regel/Risikomanagement statt Heldentat im Crash. |
| 2020-03-11-coronavirus-boerse.md | 2020-03-11-coronavirus-boerse.md | Realer Crash-Moment (Corona) mit Verhaltensfrage in Echtzeit. |
| 2022-03-14-etf-sparplan-ukraine-krieg.md | 2022-03-14-etf-sparplan-ukraine-krieg.md | „Sparplan stoppen wegen Ukraine-Krieg" — konkrete Panik-Handlungsentscheidung. |
| 2022-09-05-etf-depot-krisenfest-el-dinero-folge18.md | 2022-09-05-etf-depot-krisenfest-el-dinero-folge18.md | Depot krisenfest — Vorbereitung auf Crash-Verhalten. |
| 2017-03-27-kostolany-finanzwesir-rockt-folge35.md | 2017-03-27-kostolany-finanzwesir-rockt-folge35.md | Geduld/Psychologie des erfolgreichen Anlegers — Haltung vor dem Crash. |
| 2016-01-25-film-the-big-short.md | 2016-01-25-film-the-big-short.md | Crash-Erzählung (Big Short) — anschauliches Material zum Krisenerleben. |

---

## regulatorik-dashboard — G1 Abgabenpolitik / Regulatorisches Risiko

Barriere: Abgabenpolitik fühlt sich unkontrollierbar/lähmend an. Rohmaterial = ETF-Besteuerung, Steuerreform, Vorabpauschale, Abgeltungssteuer, Gesetzesänderung.

Rohkandidaten: 26 → final 5 (21 verworfen: 7 Wochenüberblick, Rest Posts mit beiläufigem `abgeltungssteuer`/`vorabpauschale`-Treffer, Satiretext zu Steuervermeidung, Produkt-/Kostenposts).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2017-03-08-besteuerung-fonds-etf-2018.md | 2017-03-08-besteuerung-fonds-etf-2018.md | „Reform der Fonds-Besteuerung" — Kerntext zur ETF-Abgabenänderung. |
| 2017-02-21-reform-investmentsteuergesetz-2018.md | 2017-02-21-reform-investmentsteuergesetz-2018.md | „Reform des Investmentsteuergesetzes" — Gesetzesänderung als Thema, exakt die App-Achse. |
| 2018-01-15-steuerreform-2018-vorabpauschale-basiszins-finanzwesir-rockt-folge50.md | 2018-01-15-steuerreform-2018-vorabpauschale-basiszins-finanzwesir-rockt-folge50.md | Vorabpauschale und Basiszins — konkrete Abgabenmechanik, S1-Referenzlinie. |
| 2017-12-06-abgeltungssteuer-kapitalertragssteuer.md | 2017-12-06-abgeltungssteuer-kapitalertragssteuer.md | Abgeltungs-/Kapitalertragssteuer erklärt — Grundbausteine der Szenarien S0–S1. |
| 2016-05-16-podcast-finanzwesir-rockt-folge-17-etf-steuer.md | 2016-05-16-podcast-finanzwesir-rockt-folge-17-etf-steuer.md | Podcast-Folge komplett zu ETF-Steuer. |

---

## prokrastinations-preis — B1 Marktzeit-Entscheidungspunkt

Barriere: Rückblick-Illusion — ein guter Einstiegszeitpunkt wirkt im Nachhinein logisch, in Echtzeit unsicher. Rohmaterial = Investieren-Aufschieben, Einstiegszeitpunkt, Hindsight Bias beim Start.

**ACHTUNG: 0 verwertbare Kandidaten (echte Materialknappheit).** Beide Rohtreffer per Lektüre als Fehltreffer bestätigt:
- `2016-05-30-...folge-18-aktiv-aktien...` — „Hindsight Bias" nur als ein Tag/Listeneintrag in einer Debatte über aktives Stockpicking; nicht die Einstiegs-Rückblick-Illusion.
- `2017-12-04-papierkram-...folge48` — „Prokrastination" als Finanzbegriff über **Papierkram**-Aufschieberei (Verträge/Steuern), nicht Investieren-Aufschieben.

Für diese App liefert der 12-Jahre-Blog kein gezieltes Rohmaterial. Empfehlung: entweder breitere Suchachse (z. B. allgemeine „später anfangen"/„Zeit im Markt"-Posts als Kontext) oder redaktionelle Eigenproduktion.

---

## esg-spiegel — E1 ESG-Label entmystifizieren

Rohkandidaten: 21 → final 9 (8 Wochenüberblick + 4 themenferne `sri`/`esg`-Streutreffer verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2018-07-23-esg-sri-etf-finanzwesir-rockt-folge59.md | 2018-07-23-esg-sri-etf-finanzwesir-rockt-folge59.md | „Kann ein ETF überhaupt ethisch sein?" — Kernfrage der Label-Entmystifizierung. |
| 2014-07-16-nachhaltig-anlegen.md | 2014-07-16-nachhaltig-anlegen.md | Grundlagentext nachhaltige Geldanlage. |
| 2020-08-31-nachhaltig-anlegen-esg-sri-finanzwesir-rockt-folge95.md | 2020-08-31-nachhaltig-anlegen-esg-sri-finanzwesir-rockt-folge95.md | „Nachhaltig anlegen — State of the Art" ESG/SRI. |
| 2020-11-12-emerging-markets-sri.md | 2020-11-12-emerging-markets-sri.md | „Schwellenland-Ethik: Bester ETF?" — ESG-Label vs. tatsächlicher Inhalt. |
| 2021-09-23-klima-retten-etf.md | 2021-09-23-klima-retten-etf.md | „Das Klima retten mit ETFs" — Anspruch vs. Wirkung eines grünen Labels. |
| 2022-05-25-demokratisch-anlegen.md | 2022-05-25-demokratisch-anlegen.md | „MSCI World ohne Diktatur" — was ein ESG-Filter real herausnimmt. |
| 2016-08-08-ethisch-nachhaltig-geldanlage-podcast-finanzwesir-rockt-folge-23.md | 2016-08-08-ethisch-nachhaltig-geldanlage-podcast-finanzwesir-rockt-folge-23.md | Podcast ethisch/nachhaltig anlegen. |
| 2021-09-06-etf-gefaehrlich-el-dinero-folge8.md | 2021-09-06-etf-gefaehrlich-el-dinero-folge8.md | Greenwashing-Bezug — kritische ESG-Einordnung. |
| 2015-03-09-msci-world-schwellenlaender-diversifikation.md | 2015-03-09-msci-world-schwellenlaender-diversifikation.md | Weich: Schwellenländer-/SRI-Zusammensetzung als Label-Kontext. |

---

## etf-namensdecoder — D1 ETF-Technik entmystifizieren

Rohkandidaten: 92 → final 7 (starkes Rauschen: `wkn`/`isin`/`thesaurierend` in vielen Posts nur als Spec-Nennung; gefiltert auf Namensbestandteil-Erklärer).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2018-11-19-thesaurierend-detail.md | 2018-11-19-thesaurierend-detail.md | „Wie funktioniert Thesaurierung beim ETF?" — Namensbestandteil erklärt. |
| 2018-11-14-etf-ausschuettend-detail.md | 2018-11-14-etf-ausschuettend-detail.md | Ausschüttend-Komponente des Namens erklärt. |
| 2015-04-22-etf-thesaurierend-ausschuettend.md | 2015-04-22-etf-thesaurierend-ausschuettend.md | Thesaurierend vs. ausschüttend im Namen lesen. |
| 2014-06-17-geldanlage-etf-waehrungsabsicherung.md | 2014-06-17-geldanlage-etf-waehrungsabsicherung.md | Fondswährung/Hedging — Währungskomponente des Namens. |
| 2014-06-18-was-ist-ein-etf.md | 2014-06-18-was-ist-ein-etf.md | ETF-Grundlagen inkl. Replikation/Anbieter — Fundament des Decoders. |
| 2017-09-26-msci-stoxx-ftse-russell-iboxx-index.md | 2017-09-26-msci-stoxx-ftse-russell-iboxx-index.md | „Welche Firmen sind in den ETFs drin?" — Index-Anbieter im Namen. |
| 2022-04-14-etf-boersenplatz-kag.md | 2022-04-14-etf-boersenplatz-kag.md | Weich: KAG/Börsenplatz — weitere Namens-/Ordermerkmale. |

---

## etf-vergleich — D4 ETF-Feinschliff-Entgifter

Rohkandidaten: 16 → final 6 (Wochenüberblick, Lesertreffen `autonome-zelle-*`, Event-Berichte verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2015-04-10-etf-index-rendite-vergleich.md | 2015-04-10-etf-index-rendite-vergleich.md | „Die beste ETF-Kombi finden" — direkter ETF-Vergleich. |
| 2015-04-02-etf-kombination-vergleich.md | 2015-04-02-etf-kombination-vergleich.md | ETF-Kombinationen vergleichen. |
| 2018-05-30-etf-laufende-kosten.md | 2018-05-30-etf-laufende-kosten.md | „Welcher ETF ist der richtige?" — Feinschliff-Kriterien. |
| 2018-10-15-depot-gut-gewaehlt.md | 2018-10-15-depot-gut-gewaehlt.md | „Habe ich mein Depot gut gewählt?" — Auswahl-Nachprüfung als Exit-Gate. |
| 2019-01-24-dimensional-funds-kritik.md | 2019-01-24-dimensional-funds-kritik.md | Fondsvergleich/Bewertung — Feinschliff-Perspektive. |
| 2015-02-24-besten-etf-finden.md | 2015-02-24-besten-etf-finden.md | „Den besten ETF finden" — direkt die Produktoptimierungs-Falle. |

---

## geburtsjahrlos — B2 Börsenepoche als Los

Rohkandidaten: 9 → final 3 (2 Wochenüberblick + 4 `jahrgang`-Streutreffer in Steuer-/Depotwechsel-/Erbe-Posts verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2023-06-15-msci-world-sparplan-dekaden.md | 2023-06-15-msci-world-sparplan-dekaden.md | „Altersarmut? Ihr Geburtsjahr entscheidet" — exakt das Epochen-als-Los-Framing. |
| 2019-05-28-etf-rendite-inflation.md | 2019-05-28-etf-rendite-inflation.md | Rendite je nach Startjahr/Epoche — Kern der Kohortenstreuung. |
| 2015-09-18-vorstellung-leser-depot-vermoegen.md | 2015-09-18-vorstellung-leser-depot-vermoegen.md | Weich: „Wer Jahrgang 1967 ist…" — Lebensphase/Jahrgang als Rahmen. |

---

## komplexitaets-entlarver — C2 Komplexitätsillusion entlarven

Rohkandidaten: 2 → final 2, plus 1 Nachtrag aus Nachbarsuche.

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2021-12-17-etf-perfektes-depot.md | 2021-12-17-etf-perfektes-depot.md | „Wenn drei ETFs schon zu viel sind" — direkt die Einfachheit-vs-Komplexität-Achse. |
| 2018-05-30-etf-laufende-kosten.md | 2018-05-30-etf-laufende-kosten.md | „Welcher ETF ist der richtige?" — ein ETF reicht oft. |
| 2022-03-04-ein-etf-kontrollverlust.md | 2022-03-04-ein-etf-kontrollverlust.md | Nachtrag: „Reicht ein ETF wirklich?" — Ein-ETF vs. Mehr-ETF, Kernthema (Achse hatte ihn verfehlt). |

---

## market-timing-simulator — B3 Timing-Illusions-App

Rohkandidaten: 15 → final 7 (Wochenüberblick + reine Steuerposts verworfen; `kontrollillusion`-Treffer als echtes Inklusionssignal behandelt).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2021-07-02-boersenpsychologie-kognitive-verzerrungen-risiken-aktienmarkt.md | 2021-07-02-boersenpsychologie-kognitive-verzerrungen-risiken-aktienmarkt.md | „Psychologie gewinnt. Immer." — Timing-Gefühl schlägt fehl. |
| 2021-06-17-trendfolgestrategie-was-ist-das.md | 2021-06-17-trendfolgestrategie-was-ist-das.md | Trendfolge/Timing-Strategie kritisch eingeordnet. |
| 2022-03-04-ein-etf-kontrollverlust.md | 2022-03-04-ein-etf-kontrollverlust.md | Kontrollverlust/Kontrollillusion — Kern der Timing-Barriere. |
| 2022-03-14-etf-sparplan-ukraine-krieg.md | 2022-03-14-etf-sparplan-ukraine-krieg.md | „Sparplan stoppen wegen Ukraine-Krieg" — Timing-Impuls in der Krise. |
| 2018-11-30-crash-was-tun.md | 2018-11-30-crash-was-tun.md | Verhalten/Timing im Crash (auch bei crash-reaktions-test). |
| 2018-12-18-short-etf.md | 2018-12-18-short-etf.md | „Short-ETFs sind nutzlos" + Kontrollillusion — Timing-Wette entzaubert. |
| 2019-05-28-etf-rendite-inflation.md | 2019-05-28-etf-rendite-inflation.md | Weich: enthält Kontrollillusion-Passage im Renditekontext. |

---

## markt-kam-zurueck — A3 Ausstiegsfolgen-App

Rohkandidaten: 5 → final 3 (2 Wochenüberblick verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2015-05-20-sell-in-may-and-go-away.md | 2015-05-20-sell-in-may-and-go-away.md | „Sell in May" — Ausstieg und verpasste Rückkehr, exakt das App-Motiv. |
| 2018-02-26-verkaufen-finanzwesir-rockt-folge53.md | 2018-02-26-verkaufen-finanzwesir-rockt-folge53.md | Verkaufsentscheidung — Voraussetzung der Ausstiegsfolgen. |
| 2014-11-10-etf-depot-raffiniertes-trading-rendite.md | 2014-11-10-etf-depot-raffiniertes-trading-rendite.md | Rechnet den Wiedereinstieg nach Verkauf durch — verpasste Erholung. |

---

## plan-generator — H1 Funnel-Finale / nächster Schritt

Rohkandidaten: 14 → final 1 (Wochenüberblick + `checkliste`/`schritt für schritt`-Streutreffer in Immobilien-/Anleihen-/Excel-/Dividendenposts verworfen; `...folge-5-schulden.md` bei der Kopierprüfung als Schulden-Podcast entlarvt und gestrichen). Framing sehr neu → sehr dünn, nicht erzwungen.

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2014-04-24-passive-anlagestrategie.md | 2014-04-24-passive-anlagestrategie.md | Passive Grundstrategie als „so fängst du an"-Basis. |

---

## rendite-kalibrierung — G2 Erwartungsmanagement

Rohkandidaten: 15 → final 6 (Streutreffer in Crowdfunding-/Anleihen-/Erbe-/Versicherungsposts verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2023-03-06-durchschnittsrendite.md | 2023-03-06-durchschnittsrendite.md | „Niemand kriegt die Durchschnittsrendite" — direkt Erwartungs-Kalibrierung. |
| 2014-05-05-rendite-richtig-berechnen-renditetricks-aufdecken.md | 2014-05-05-rendite-richtig-berechnen-renditetricks-aufdecken.md | Rendite korrekt berechnen — Grundlage realistischer Erwartung. |
| 2015-06-02-survivorship-bias.md | 2015-06-02-survivorship-bias.md | Survivorship Bias — warum Renditeerwartungen zu hoch ausfallen. |
| 2023-05-20-low-vola.md | 2023-05-20-low-vola.md | „Fonds volatil? Rendite schlecht!" — Erwartung vs. Realität. |
| 2022-02-04-volatility-drag.md | 2022-02-04-volatility-drag.md | Volatilität senkt reale Rendite (auch bei renditekiller-volatilitaet). |
| 2014-10-20-einzelaktien-statt-etf-geldanlage.md | 2014-10-20-einzelaktien-statt-etf-geldanlage.md | Weich: Renditeerwartung Einzelaktien vs. ETF. |

---

## renditekiller-volatilitaet — F1 Volatilitäts-/Pfadwirkung

Rohkandidaten: 3 → final 3, plus 1 Nachbar-Nachtrag.

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2022-02-04-volatility-drag.md | 2022-02-04-volatility-drag.md | „Wenn Volatilität das Vermögen zerstört" — exakt Volatility Drag. |
| 2021-11-04-ergodizitaet.md | 2021-11-04-ergodizitaet.md | Ergodizität/Pfadabhängigkeit — der Weg zählt. |
| 2023-05-20-low-vola.md | 2023-05-20-low-vola.md | Nachtrag: „Fonds volatil? Rendite schlecht!" — Schwankung frisst Rendite. |
| 2017-06-26-etf-versorgungswerk.md | 2017-06-26-etf-versorgungswerk.md | Weich: enthält Pfadabhängigkeits-Argument (Produktrahmen). |

---

## replizierer-swapper — D2 Replikationsmethode entgiften

Rohkandidaten: 13 → final 6 (Produktreviews mit nur beiläufigem `sampling`/`replikation`-Treffer verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2019-02-05-swap-etf.md | 2019-02-05-swap-etf.md | „Swap ETF Risiko" — direkt die Swap-Entgiftung. |
| 2014-06-18-was-ist-ein-etf.md | 2014-06-18-was-ist-ein-etf.md | Erklärt ETF-Grundmechanik inkl. Replikation. |
| 2016-07-12-creation-redemption-etf.md | 2016-07-12-creation-redemption-etf.md | Creation/Redemption — technische ETF-Mechanik. |
| 2015-02-24-besten-etf-finden.md | 2015-02-24-besten-etf-finden.md | Replikationsmethode als Auswahlkriterium. |
| 2016-06-08-comstage-vermoegensstrategie-etf.md | 2016-06-08-comstage-vermoegensstrategie-etf.md | Swap-basiertes Produkt mit Replikationsdetail. |
| 2015-11-26-etf-probleme.md | 2015-11-26-etf-probleme.md | Weich: ETF-Probleme inkl. Replikationsrisiken. |

---

## rollierende-sparplaene — Companion historische Startjahrlogik

Rohkandidaten: 3 → final 2 (1 Wochenüberblick-nah verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2017-02-07-msci-world-verlust.md | 2017-02-07-msci-world-verlust.md | Untersucht wörtlich „rollierende Haltedauern von 1, 5, 10, 15, 20 Jahren" — exakt die App-Mechanik. |
| 2021-07-27-500000-euro-investieren.md | 2021-07-27-500000-euro-investieren.md | „Wie schnell soll ich investieren?" — gestaffelter Einstieg über Zeiträume. |

---

## depot-kipppunkt — B5 Depot als Mitverdiener

**ACHTUNG: 0 exakte Kandidaten (echte Materialknappheit).** Die Achse (Depot-Jahresertrag kreuzt Job-Netto = Kipppunkt) ist zu neu für den Blog-Wortschatz. Nachbar-Suche liefert thematisch angrenzendes Dividenden-/Passiv-Einkommen-Material — als weiches Rohmaterial, nicht als exakter Treffer:

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2016-07-25-dividendenstrategie-podcast-finanzwesir-rockt-folge-22.md | 2016-07-25-dividendenstrategie-podcast-finanzwesir-rockt-folge-22.md | Weich: Dividenden als laufender Ertragsstrom aus dem Depot. |
| 2014-09-29-etf-dividenden-strategie-leserfrage.md | 2014-09-29-etf-dividenden-strategie-leserfrage.md | Weich: ETF-Ausschüttungen als Einkommen. |
| 2017-04-10-verbindlichkeit-vermoegenswert-finanzwesir-rockt-folge36.md | 2017-04-10-verbindlichkeit-vermoegenswert-finanzwesir-rockt-folge36.md | Weich: Vermögenswert erzeugt Einkommen (Mitverdiener-Gedanke). |
| 2017-09-11-hamsterrad-finanzwesir-rockt-folge44.md | 2017-09-11-hamsterrad-finanzwesir-rockt-folge44.md | Weich: passives Einkommen als Job-Ersatz. |

---

## etf-aera-vorbei — ETF-Skepsis einordnen

**ACHTUNG: 0 exakte Kandidaten (nur Wochenüberblick auf `etf-blase`).** Nachbar-Suche liefert ETF-kritisches/-skeptisches Material als weiches Rohmaterial:

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2015-11-26-etf-probleme.md | 2015-11-26-etf-probleme.md | Weich: „ETF-Probleme" — die skeptische Perspektive direkt. |
| 2021-09-06-etf-gefaehrlich-el-dinero-folge8.md | 2021-09-06-etf-gefaehrlich-el-dinero-folge8.md | Weich: „Sind ETFs gefährlich?" — Skepsis ernst nehmen. |
| 2021-01-21-taures-vermoegensberatung-etf-strukturvertrieb.md | 2021-01-21-taures-vermoegensberatung-etf-strukturvertrieb.md | Weich: „Schlagen aktive Fonds nicht doch die ETFs?" — Gegenposition. |
| 2017-07-31-psychologische-fallstricke-finanzwesir-rockt-folge41.md | 2017-07-31-psychologische-fallstricke-finanzwesir-rockt-folge41.md | Weich: Renditekiller/passiv-investieren-Skepsis. |

---

## der-alte-euro — B4 Zinseszins-Mechanik

Rohkandidaten: 51 → final 5 (`zinseszins` in ~47 Posts nur beiläufig; gefiltert auf Zinseszins-Mechanik-Texte).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2015-10-13-zinseszins.md | 2015-10-13-zinseszins.md | Eigener Text zum Zinseszins — Kernmechanik der App. |
| 2014-01-30-was-1.8prozent-ausmachen.md | 2014-01-30-was-1.8prozent-ausmachen.md | „Der Zinseszins: Ruiniert durch hohe Gebühren" — Zinseszins über Zeit sichtbar. |
| 2014-02-20-die-regel-von-der-72-macht-sie-reich.md | 2014-02-20-die-regel-von-der-72-macht-sie-reich.md | 72er-Regel — Verdopplung durch Zinseszins, direkt anschaulich. |
| 2014-09-03-sparen-wozu.md | 2014-09-03-sparen-wozu.md | Weich: warum frühes Sparen strukturell wirkt. |
| 2015-05-13-optimale-sparrate-berechnen.md | 2015-05-13-optimale-sparrate-berechnen.md | Weich: Sparbetrag über Zeit, Wachstumslogik. |

---

## thesaurierer-rennen — F2 Thesaurierer vs. Ausschütter

Rohkandidaten: 33 → final 8 (Spec-Nennungen in Produkt-/Steuerposts verworfen).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2015-04-22-etf-thesaurierend-ausschuettend.md | 2015-04-22-etf-thesaurierend-ausschuettend.md | „Thesaurierend oder ausschüttend?" — exakt die App-Frage. |
| 2018-11-19-thesaurierend-detail.md | 2018-11-19-thesaurierend-detail.md | „Wie funktioniert Thesaurierung?" — Mechanik der einen Seite. |
| 2018-11-14-etf-ausschuettend-detail.md | 2018-11-14-etf-ausschuettend-detail.md | Ausschüttung erklärt — Mechanik der anderen Seite. |
| 2015-09-07-steuer-thesaurierende-etf.md | 2015-09-07-steuer-thesaurierende-etf.md | Steuerliche Behandlung thesaurierender ETFs. |
| 2017-12-12-etf-110-comstage-aenderung.md | 2017-12-12-etf-110-comstage-aenderung.md | Konkrete Umstellung thesaurierend→ausschüttend als Fallbeispiel. |
| 2022-09-02-umschichtung-steuer.md | 2022-09-02-umschichtung-steuer.md | „Wenn ich alt bin, schichte ich um" — Ausschüttungsart im Lebensverlauf. |
| 2019-08-26-leserfrage-1100-euro-sparplan.md | 2019-08-26-leserfrage-1100-euro-sparplan.md | Weich: Leserfrage zu thesaurierend/ausschüttend im Sparplan. |
| 2016-04-18-podcast-finanzwesir-rockt-folge-15-etf-fonds.md | 2016-04-18-podcast-finanzwesir-rockt-folge-15-etf-fonds.md | Weich: Podcast ETF/Fonds inkl. Ausschüttungsart. |

---

## weltdepot-baukasten — C3 Architektur-Baukasten

Rohkandidaten: 34 → final 7 (Trading-/Alpha-Strategien verworfen; gefiltert auf Depot-Architektur).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2014-11-11-arero-weltfonds.md | 2014-11-11-arero-weltfonds.md | Ein-Fonds-Weltportfolio als fertige Architektur. |
| 2016-12-01-taleb-hantel.md | 2016-12-01-taleb-hantel.md | Hantel-Strategie — klare Architektur mit Tradeoff. |
| 2023-06-30-kommer-strategie.md | 2023-06-30-kommer-strategie.md | „Kommer-Strategie ist viel einfacher" — robuste Grundarchitektur. |
| 2016-09-05-6-etf-depot.md | 2016-09-05-6-etf-depot.md | Mehr-Baustein-Weltdepot mit Rollen je Anlageklasse. |
| 2018-02-21-chaos-depot.md | 2018-02-21-chaos-depot.md | „7 ETFs = Chaos" — Architektur vs. Wildwuchs. |
| 2014-04-24-passive-anlagestrategie.md | 2014-04-24-passive-anlagestrategie.md | Passive Grundarchitektur als Ausgangspunkt. |
| 2022-03-30-70-30-etf-kombi.md | 2022-03-30-70-30-etf-kombi.md | 70/30 World/EM — konkrete Zwei-Baustein-Architektur. |

---

## kostenkiller-ter — D3 Kostenwirkung kalibrieren

Rohkandidaten: 85 → final 12 (`ter`/`kostenquote` in ~65 Posts nur beiläufig; gefiltert auf kostenzentrale Artikel).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2014-01-30-was-1.8prozent-ausmachen.md | 2014-01-30-was-1.8prozent-ausmachen.md | Kostenwirkung über Zeit — Kern der Kostenhierarchie. |
| 2014-09-19-perfekter-etf-ter-tracking-error.md | 2014-09-19-perfekter-etf-ter-tracking-error.md | TER und Tracking Error direkt erklärt. |
| 2018-03-12-kostentransparenz-mifidii.md | 2018-03-12-kostentransparenz-mifidii.md | „Volle Kostentransparenz" — sichtbare vs. wirksame Kosten. |
| 2018-03-28-wertpapier-total-cost-ownership.md | 2018-03-28-wertpapier-total-cost-ownership.md | Total Cost of Ownership — Gesamtkostenblick. |
| 2017-11-16-etf-sparplan-kosten.md | 2017-11-16-etf-sparplan-kosten.md | ETF-Sparplan-Kosten konkret verglichen. |
| 2018-03-29-bafin-kostenausweis-broker.md | 2018-03-29-bafin-kostenausweis-broker.md | Kostenausweis — welche Kosten wo auftauchen. |
| 2014-02-09-wie-fondsmanager-bezahlt-werden.md | 2014-02-09-wie-fondsmanager-bezahlt-werden.md | Fondskosten/Vergütung — laufende Kostenwirkung. |
| 2018-05-30-etf-laufende-kosten.md | 2018-05-30-etf-laufende-kosten.md | Laufende Kosten als langfristiger Effekt. |
| 2020-11-17-etf-kaufkosten.md | 2020-11-17-etf-kaufkosten.md | Kaufkosten vs. laufende Kosten gewichten. |
| 2020-12-08-etf-sparplan-kaufkosten.md | 2020-12-08-etf-sparplan-kaufkosten.md | „Sparplankosten zu hoch?" — einmalig vs. laufend. |
| 2016-04-04-honorarberatung.md | 2016-04-04-honorarberatung.md | Beratungskosten — sichtbare Kosten im Kontext. |
| 2015-10-21-brokerwahl.md | 2015-10-21-brokerwahl.md | Weich: Brokerkosten als Teil der Kostenhierarchie. |

---

## investment-universum — Gegenperspektive / Grundmodell

Rohkandidaten: 83 → final 8 (`anlageklassen`/`assetklassen` in vielen Posts nur beiläufig; gefiltert auf Anlageklassen-Landkarte).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2014-04-23-was-ist-eine-assetklasse.md | 2014-04-23-was-ist-eine-assetklasse.md | „Was ist eine Assetklasse?" — Grundbaustein der Landkarte. |
| 2014-04-23-optimale-zusammenstellung-der-assetklassen-fuers-depot.md | 2014-04-23-optimale-zusammenstellung-der-assetklassen-fuers-depot.md | Zusammenstellung der Assetklassen — Rollenlogik. |
| 2014-05-28-fuenf-ebenen-geldanlage.md | 2014-05-28-fuenf-ebenen-geldanlage.md | „Fünf Ebenen der Geldanlage" — strukturierte Landkarte. |
| 2014-02-28-was-sind-fonds.md | 2014-02-28-was-sind-fonds.md | „Was sind Fonds?" — Grundbaustein einordnen. |
| 2014-11-28-geld-anlegen-ist-wie-kochen.md | 2014-11-28-geld-anlegen-ist-wie-kochen.md | Assetklassen als Zutaten — Landkarten-Metapher. |
| 2018-07-04-investment-universum.md | 2018-07-04-investment-universum.md | „Wie viele ETFs brauche ich?" — Universum vs. Produktzahl. |
| 2015-06-26-anleihen-bonds-rentenpapiere.md | 2015-06-26-anleihen-bonds-rentenpapiere.md | „Was ist eine Anleihe?" — Anlageklasse mit Rolle. |
| 2020-11-09-anleihen-finanzwesir-rockt-folge98.md | 2020-11-09-anleihen-finanzwesir-rockt-folge98.md | Weich: Rolle der Anlageklasse Anleihen. |

---

## diversifikations-detektor — C1 Diversifikationsillusion

Rohkandidaten: 110 → final 8 (`klumpenrisiko` überwiegend in Immobilien-/Crowdfunding-Posts = falsche Fährte; gefiltert auf ETF-Überschneidung/Scheindiversifikation).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2016-12-14-msci-world-dws-top-dividende.md | 2016-12-14-msci-world-dws-top-dividende.md | Enthält `scheindiversifikation` — Kernbegriff der App. |
| 2018-01-22-diversifikation-risikostreuung.md | 2018-01-22-diversifikation-risikostreuung.md | Risikostreuung durch echte Diversifikation erklärt. |
| 2018-07-04-investment-universum.md | 2018-07-04-investment-universum.md | „Wie viele ETFs brauche ich?" — direkt die Mehr-Produkte-Illusion. |
| 2014-03-19-aktienindex-ist-nicht-gleich-aktienindex.md | 2014-03-19-aktienindex-ist-nicht-gleich-aktienindex.md | Überschneidung/Unterschiede von Indizes. |
| 2017-11-08-etf-sparplan-diversifikation.md | 2017-11-08-etf-sparplan-diversifikation.md | Diversifikation im ETF-Sparplan konkret. |
| 2021-10-20-unkorreliert-senkt-risiko.md | 2021-10-20-unkorreliert-senkt-risiko.md | Korrelation/echte Streuung statt Produktanzahl. |
| 2018-01-29-diversifikation-finanzwesir-rockt-folge51.md | 2018-01-29-diversifikation-finanzwesir-rockt-folge51.md | Podcast-Folge zu Diversifikation im Portfolio. |
| 2022-03-30-70-30-etf-kombi.md | 2022-03-30-70-30-etf-kombi.md | Weich: World/EM-Kombi — Überschneidung sichtbar. |

---

## weltkarte-etf-indizes — Companion / visuelles Lernmodul

Rohkandidaten: 190 → final 8 (`msci world`/`acwi`/`emerging markets` in ~170 Posts nur beiläufig; gefiltert auf Index-Geografie/-Zusammensetzung).

| Quelle | Ziel-Dateiname | Begründung |
|--------|----------------|------------|
| 2022-05-25-demokratisch-anlegen.md | 2022-05-25-demokratisch-anlegen.md | „MSCI World ohne Diktatur" — welche Länder wirklich im Index sind. |
| 2022-04-07-russland-index.md | 2022-04-07-russland-index.md | „Wie schmeißt man Russland aus dem Index?" — Länderzusammensetzung. |
| 2014-03-19-aktienindex-ist-nicht-gleich-aktienindex.md | 2014-03-19-aktienindex-ist-nicht-gleich-aktienindex.md | Indizes unterscheiden sich — was steckt real drin. |
| 2017-09-26-msci-stoxx-ftse-russell-iboxx-index.md | 2017-09-26-msci-stoxx-ftse-russell-iboxx-index.md | „Welche Firmen sind in den ETFs drin?" — Indexinhalt. |
| 2022-03-30-70-30-etf-kombi.md | 2022-03-30-70-30-etf-kombi.md | World/EM-Gewichtung — regionale Landkarte. |
| 2015-05-27-sektoren-laender-spezial-etf.md | 2015-05-27-sektoren-laender-spezial-etf.md | Länder-/Sektor-ETFs — Geografie sichtbar. |
| 2023-11-10-msci-world.md | 2023-11-10-msci-world.md | „Mama, der Index performt nicht!" — was der World-Index abbildet. |
| 2015-09-01-etf-world-small-caps.md | 2015-09-01-etf-world-small-caps.md | Weich: World-Segmente (Small Caps) als Indexbestandteil. |

---

## Gesamtbilanz (25 Apps)

| App | Roh | Final | Muster |
|-----|-----|-------|--------|
| crash-reaktions-test | 146 | 15 | Übermenge, Verhaltensartikel |
| diversifikations-detektor | 110 | 8 | Übermenge, klumpenrisiko-Fährte gefiltert |
| kostenkiller-ter | 85 | 12 | Übermenge, TER-Rauschen gefiltert |
| etf-namensdecoder | 92 | 7 | Übermenge, Spec-Nennungen gefiltert |
| investment-universum | 83 | 8 | Übermenge |
| weltkarte-etf-indizes | 190 | 8 | Übermenge, Index-Geografie |
| der-alte-euro | 51 | 5 | zinseszins-Rauschen gefiltert |
| thesaurierer-rennen | 33 | 8 | sauber |
| weltdepot-baukasten | 34 | 7 | sauber |
| risiko-uebersetzer | 29 | 7 | sauber |
| regulatorik-dashboard | 26 | 5 | sauber, Sonderfall-App |
| esg-spiegel | 21 | 9 | sauber |
| etf-vergleich | 16 | 6 | sauber |
| rendite-kalibrierung | 15 | 6 | sauber |
| market-timing-simulator | 15 | 7 | sauber |
| plan-generator | 14 | 1 | sehr dünn, Framing neu |
| replizierer-swapper | 13 | 6 | sauber |
| geburtsjahrlos | 9 | 3 | knapp |
| markt-kam-zurueck | 5 | 3 | knapp |
| renditekiller-volatilitaet | 3 | 4 | knapp (+1 Nachbar) |
| rollierende-sparplaene | 3 | 2 | dünn |
| komplexitaets-entlarver | 2 | 3 | dünn (+1 Nachbar) |
| prokrastinations-preis | 2 | 0 | Materialknappheit |
| depot-kipppunkt | 0 | 4 weich | nur Nachbarmaterial |
| etf-aera-vorbei | 1 | 4 weich | nur Nachbarmaterial |

**Muster-Verteilung:** 12 Apps sauber (3–40 klare Treffer), 7 Apps Übermenge (großzügig gehalten, Keyword-Rauschen gefiltert — Albert dampft beim Schreiben ein), 4 Apps dünn/knapp (geburtsjahrlos, markt-kam-zurueck, rollierende-sparplaene, komplexitaets-entlarver), 1 App sehr dünn (plan-generator, 1), 2 Apps nur Nachbarmaterial (depot-kipppunkt, etf-aera-vorbei), 1 App echte Nullnummer (prokrastinations-preis). Summe kopiert: 148 Kopien / 121 unique Originale.

**Kalibrierung:** Wo viel Material vorhanden ist, großzügig gehalten (Verdichtung erfolgt beim Artikelschreiben). Wo wenig ist, nicht erzwungen — dünn ehrlich als dünn markiert, Nachbarmaterial als „weich" gekennzeichnet. Wochenüberblick-Linksammlungen durchgehend verworfen. Score-Zahlen des Vorfilters flossen nie als Begründung ein; jede Zeile hat einen inhaltlichen Grund.

**Mehrfachnutzung:** Einige Posts passen zu mehreren Apps (z. B. `2018-07-04-investment-universum.md` → investment-universum + diversifikations-detektor; `2022-02-04-volatility-drag.md` → renditekiller-volatilitaet + rendite-kalibrierung). Das ist gewollt — beim Kopieren landet dann je eine Kopie in beiden Rohmaterial-Ordnern.

**Status Kopieren (Aufgabe 1, erledigt):** 148 Kopien in 24 `content/posts/apps/{slug}/Rohmaterial/`-Ordner abgelegt (prokrastinations-preis: 0). 121 unique Originale nach `Inhalte alte Site/blog/kopiert/` verschoben, 734 .md verbleiben im Root als „Überbleibsel" (noch nicht migriert). Ausgeführt via `tools/app_fabrik/copy_rohmaterial.py --run` mit vorgeschaltetem `--check`-Validierungs-Gate.

---

## Zweite Quelle: Vault `2ndbrain/Projekte/Finanzwesir Vermächtnis` (erledigt)

Obsidian-Vault (73 Dateien), überwiegend Design-/Technik-/Legal-/Prozess-Material — kein App-Content. Echter Finanz-Content verstreut in `ETF-Vermächtnis/` + `Meta/Ich bin bullish.md`. Kein mechanischer Keyword-Scan (bei ~4 Content-Dateien in gemischtem Vault nur Rauschen), sondern direkte Triage + Lektüre. Mapping: `blog_matching_vault.json`.

| Quelle | → App(s) | Begründung |
|--------|----------|------------|
| ETF-Vermächtnis/Ist die ETF-Ära vorbei.md | etf-aera-vorbei | Eigenständiger Essay (Passiv-Paradox, Effizienzmarkt-Kritik, Flow-Hypothese) — füllt die 0-Blog-Treffer-Lücke dieser App. |
| ETF-Vermächtnis/Welcher Index welche Indexkombi.md | weltkarte-etf-indizes, weltdepot-baukasten | World/EM/ACWI-Vergleich, Mega-Cap-Konzentration (Apple-Umsatz ≈ Länder-BIP). Rohe Notiz, teils Platzhalter. |
| ETF-Vermächtnis/Tagesgeld-ETF.md | investment-universum | Geldmarkt-ETF als Sicherheits-/Liquiditätsbaustein der Anlageklassen-Landkarte (soft, kein eigenes Cash-App-Ziel). |
| Meta/Ich bin bullish.md | risiko-uebersetzer, crash-reaktions-test, der-alte-euro, market-timing-simulator | Original-Aphorismen: %-Psychologie (risiko), Bärenmarkt-Stoik (crash), Zinseszins-Nichtlinearität (der-alte-euro), Geduld-schlägt-Timing (timing). |

**Bewusst weggelassen:** 5 leere Stubs (nur Frontmatter), `ETF-Vermächtnis MOC.md` (Navigations-Hub, in-place belassen), gesamter Design-/Technik-/Legal-/Prompt-Bereich.

**Ausgeführt:** 4 unique Perlen → 8 Kopien in 8 Rohmaterial-Ordner; 4 Originale nach `…/Finanzwesir Vermächtnis/kopiert/` verschoben. **Wikilinks intakt:** `kopiert/` liegt im Vault, Obsidian löst `[[…]]` über den Dateinamen auf → die MOC-Verweise funktionieren weiter (per Python verifiziert: Dateien via `kopiert/` weiter auffindbar). Einziger Backlink war die `ETF-Vermächtnis MOC.md`.
