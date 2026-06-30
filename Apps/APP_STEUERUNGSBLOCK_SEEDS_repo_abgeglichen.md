# APP_STEUERUNGSBLOCK_SEEDS — Nordstern-Blöcke aus dem Faden

Stand: 2026-06-26  
Status: redaktionelle Seed-Datei, nicht automatisch verteilt  
Zweck: zentrale Masterquelle für spätere mechanische Verteilung in `APP_SPEC.md` / `MINI_SPEC_FROM_HAUPTDOKUMENT.md`

---

## 0. Arbeitsregel

Diese Datei trennt:

```text
Denken / Extraktion / redaktionelle Entscheidung
von
mechanischem Verteilen in App-Dateien
```

Späterer Verteilungsauftrag an Claude:

```text
Nimm den freigegebenen Seed-Block für App X.
Füge ihn in App X an der definierten Stelle ein.
Formuliere nicht um.
Verbessere nicht.
Interpretiere nicht neu.
Markiere nur technische Konflikte.
```

---

## 1. Quellenstatus

| Status | Bedeutung |
|---|---|
| GESICHERT | Aus Faden / vorhandener Spec / Mini-Spec sehr klar ableitbar |
| REKONSTRUIERT | Aus früheren Nordstern-Formulierungen, App-Landkarte und Fadenlogik rekonstruiert |
| ZU PRÜFEN | Plausibler Seed, aber vor Verteilung redaktionell prüfen |
| GESPERRT | Nicht verteilen, erst fachliche Klärung |

Wichtig:

- Diese Datei ist ein 80%-Arbeitsstand.
- Jede App hat ihre eigene psychologische Barriere.
- Die Glaubenssätze einer App dürfen **nicht** auf andere Apps kopiert werden.
- Die kölsche-Grundgesetz-Haltung ist ein Ton- und Nervenkostüm-Prinzip, nicht automatisch Zweck jeder App.
- Wenn Zweck, Barriere oder Nicht-Ziele unklar sind: nicht verteilen, sondern klären.

---

## 2. Standardstruktur je Seed

```md
## {slug}

**Status:** GESICHERT / REKONSTRUIERT / ZU PRÜFEN / GESPERRT

**Diese App existiert, um:**  
...

**Zu entfernende psychologische Barriere:**  
...

**Falscher Glaubenssatz vorher:**  
„...“

**Zielzustand nach der App:**  
„...“

**Muss-Kriterien für jede Umsetzung:**  
- ...
- ...
- ...

**Nicht-Ziele / harte Verbote:**  
- ...
- ...
- ...

**LLM-Prüfscore pro Änderung:**  
Standard-Gate aus Abschnitt 2.1 unverändert übernehmen.

**Klärungsbedarf vor Verteilung:**  
- ...

**Verteilungsstatus:**  
Nicht verteilt / freigegeben / gesperrt
```

---

## 2.1 Standardisiertes Änderungsgate: LLM-Prüfscore pro Änderung

Dieser Prüfscore ist **kein app-spezifischer Inhalt**, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App.

Er wird bei der späteren Verteilung in jeden lokalen Steuerungsblock übernommen und dort **unverändert** verwendet.

**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.

---

# 3. Seed-Blöcke

---

## prokrastinations-preis

**Status:** GESICHERT, aber vor Einbau redaktionell final prüfen  
**Rolle:** B1 — Marktzeit-Entscheidungspunkt / geführte Stationen-Zeitreise  
**Verteilungsstatus:** Verteilt in APP_SPEC und MINI_SPEC (AP-15b)

**Diese App existiert, um:**  
aus Bedauern über das verpasste Gestern eine Entscheidung für das verfügbare Heute zu machen.

**Zu entfernende psychologische Barriere:**  
Die Rückblick-Illusion: Im Nachhinein wirkt ein guter Einstiegszeitpunkt logisch und erkennbar; in Echtzeit fühlt er sich aber unsicher, unfertig und falsch an.

**Falscher Glaubenssatz vorher:**  
„Ein guter Einstiegszeitpunkt müsste sich heute so klar anfühlen, wie er im Rückblick aussieht.“

**Zielzustand nach der App:**  
„Rückblick täuscht. Heute fühlt sich nicht wie der richtige Zeitpunkt an — aber genau so fühlte es sich damals auch an. Ich kann nicht mit Endwissen starten, aber ich kann heute anfangen.“

**Kernsatz der App:**  
„Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung.“

**Ton / Haltung:**  
Kölsches-Grundgesetz-Haltung: realistischer Fatalismus plus Optimismus. Nicht: „Alles wird gut.“ Sondern: „Et kütt wie et kütt — und trotzdem ist Anfangen besser als auf Gewissheit zu warten.“

**Muss-Kriterien für jede Umsetzung:**  
- Die App ist eine geführte historische Stationen-Zeitreise, kein Verlustzähler.
- Screen 2 zeigt nur Wissen aus damaliger Perspektive; kein vollständiger Chart, keine finalen KPIs, kein Endwissen.
- Screen 3 ist der erste vollständige Reveal: erst dort darf der Rückblick logisch wirken.
- Screen 4 überträgt die Einsicht auf heute: Auch heute beginnt wieder ein Chart, dessen Ende niemand kennt.
- Echte historische Daten und echte Stationen; keine Prognose und keine erfundene Dramatisierung.
- Ton ruhig, entlastend, fatalistisch-optimistisch; nicht beschämend.

**Nicht-Ziele / harte Verbote:**  
- Kein moralischer Strafzettel, kein Verlustzähler-Ton als Hauptmechanik.
- Kein Countdown, keine Fake-Urgency, keine Scham, keine rote Panikcodierung.
- Keine Zukunftsprognose, keine glatte Zukunftskurve, keine Zahlenversprechen.
- Kein historischer Epochen-Fächer; das gehört zu `geburtsjahrlos`.
- Keine Kohortenanalyse.
- Keine Produktempfehlung.

**Klärungsbedarf vor Verteilung:**  
- App-Titel / Slug-Frage nicht im Steuerungsblock entscheiden; Slug bleibt zunächst `prokrastinations-preis`.
- Prüfen, ob APP_SPEC-Kopf noch alte Verlustzähler-Reste enthält, die vor Verteilung bereinigt werden müssen.

---

## risiko-uebersetzer

**Status:** REKONSTRUIERT  
**Rolle:** A1 — Dosis-App / Risiko übersetzen  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
abstrakte Prozentverluste in persönlich spürbare Euro- und Lebenswelt-Verluste zu übersetzen, damit der Nutzer seine tragbare ETF-Dosis findet.

**Zu entfernende psychologische Barriere:**  
Prozentzahlen wirken harmlos und theoretisch; der Nutzer überschätzt deshalb seine emotionale Verlusttragfähigkeit.

**Falscher Glaubenssatz vorher:**  
„Einen Crash von 30 oder 40 Prozent halte ich schon aus — ich weiß ja, dass ETFs langfristig steigen.“

**Zielzustand nach der App:**  
„Ich kenne nicht nur meine gewünschte Rendite, sondern meine tragbare Dosis. Ich weiß, welcher Verlust in Euro und Alltag wirklich zu mir passt.“

**Muss-Kriterien für jede Umsetzung:**  
- Verlust wird in Euro und konkrete Alltagsanker übersetzt.
- Ergebnis führt zu einer tragbaren ETF-Dosis / Aktienquote, nicht zu Maximalrendite.
- Ton ruhig und klärend, nicht beschämend.
- Nutzer darf sich für eine niedrigere Dosis entscheiden, ohne als feige gerahmt zu werden.

**Nicht-Ziele / harte Verbote:**  
- Keine Renditeoptimierung.
- Keine Produktempfehlung.
- Keine Crash-Prognose.
- Keine Beschämung niedriger Aktienquoten.
- Kein „du musst mehr Risiko nehmen“.

**Klärungsbedarf vor Verteilung:**  
- Konkrete Ankerlisten / Dacia-Test-Materialien im App-Ordner prüfen.

---

## crash-reaktions-test

**Status:** REKONSTRUIERT  
**Rolle:** A2 — Feuerprobe-App  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
den Nutzer vorab erleben zu lassen, wie schwer korrektes Verhalten im Crash ist, bevor echtes Geld und echte Angst gleichzeitig auftreten.

**Zu entfernende psychologische Barriere:**  
Die Illusion, dass Wissen automatisch zu richtigem Verhalten im Crash führt.

**Falscher Glaubenssatz vorher:**  
„Wenn es wirklich kracht, bleibe ich natürlich ruhig — ich kenne die Theorie.“

**Zielzustand nach der App:**  
„Ich brauche vor dem Crash eine Regel, nicht im Crash eine spontane Heldentat.“

**Muss-Kriterien für jede Umsetzung:**  
- Der Nutzer trifft im simulierten Stress eine Entscheidung.
- Die App zeigt Folgen von Halten, Verkaufen, Nachkaufen oder Reduzieren.
- Die App knüpft an die eigene Risikodosis an.
- Die App zeigt Verhalten, nicht Fachwissen.

**Nicht-Ziele / harte Verbote:**  
- Keine Panikinszenierung.
- Keine Crash-Vorhersage.
- Kein Trading-Simulator.
- Keine Beschämung einer defensiveren Entscheidung.
- Keine Theoriebegriffe als Haupt-UI.

**Klärungsbedarf vor Verteilung:**  
- Konkrete Entscheidungsoptionen gegen Mini-Spec prüfen.

---

## markt-kam-zurueck

**Status:** GESICHERT / REKONSTRUIERT  
**Rolle:** A3 — Ausstiegsfolgen-App  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
sichtbar zu machen, dass der teuerste Verlust oft nicht der Crash ist, sondern die verpasste Erholung nach dem Ausstieg.

**Zu entfernende psychologische Barriere:**  
Verkaufen fühlt sich im Verlust wie Rettung an; die spätere Rückkehr in den Markt wird überschätzt.

**Falscher Glaubenssatz vorher:**  
„Wenn es schlimm wird, verkaufe ich halt. Später kann ich ja wieder einsteigen.“

**Zielzustand nach der App:**  
„Der Ausstieg kann teurer sein als der Crash. Meine ETF-Dosis muss so gewählt sein, dass ich meinen schlimmsten Abschnitt durchhalte.“

**Muss-Kriterien für jede Umsetzung:**  
- Nutzer wählt zuerst sein Startjahr selbst.
- Verlusttoleranz / Ausstiegspunkt wird sichtbar.
- App zeigt Ausstiegswert, heutige Erholung und verpasste Erholung.
- Optionaler Härtetest kommt erst nach dem persönlichen Ergebnis.
- Ton ernst und konfrontativ, aber nicht manipulativ.

**Nicht-Ziele / harte Verbote:**  
- Kein fest vorgegebenes Katastrophenjahr als Start.
- Kein Trading-, Stop-Loss- oder Re-Entry-Simulator.
- Keine Drawdown-Theorie im Haupt-UI.
- Keine Panikmache.
- Keine Nutzerbeschämung.

**Klärungsbedarf vor Verteilung:**  
- Historische Datenbasis, Jahrbereich und Trigger-Logik prüfen.

---

## market-timing-simulator

**Status:** REKONSTRUIERT  
**Rolle:** B3 — Timing-Illusions-App  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
den Nutzer die Unmöglichkeit des perfekten Einstiegs selbst erleben zu lassen, statt Timing nur argumentativ zu widerlegen.

**Zu entfernende psychologische Barriere:**  
Die Kontrollillusion, dass der Nutzer durch Warten und Beobachten einen besseren Einstiegspunkt finden kann.

**Falscher Glaubenssatz vorher:**  
„Ich warte noch auf den Rücksetzer und steige dann besser ein.“

**Zielzustand nach der App:**  
„Ich erkenne den perfekten Einstieg erst hinterher. Eine robuste Regel ist besser als mein Timing-Gefühl.“

**Muss-Kriterien für jede Umsetzung:**  
- Nutzer trifft Timing-Entscheidungen unter unvollständiger Information.
- Ergebnis wird gegen eine einfache Regel / Sparplanlogik kalibriert.
- Die App zeigt Scheitern der Timing-Kontrolle ohne Spott.
- Keine Signale, keine Tipps, keine Mustererkennung als Belohnung.

**Nicht-Ziele / harte Verbote:**  
- Kein Trading-Spiel.
- Keine technische Analyse.
- Keine Kauf-/Verkaufssignale.
- Keine Optimierung des besten Einstiegs.
- Keine Prognose.

**Klärungsbedarf vor Verteilung:**  
- Konkrete Spielmechanik aus Mini-Spec prüfen.

---

## geburtsjahrlos

**Status:** REKONSTRUIERT  
**Rolle:** B2 — historische Robustheit / Börsenepoche als Los  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
zu zeigen, dass die erlebte Börsenepoche ein Los ist, keine persönliche Leistung und kein persönliches Versagen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer bewertet Strategien und eigene Entscheidungen anhand eines einzelnen historischen Startzeitpunkts.

**Falscher Glaubenssatz vorher:**  
„Mein Ergebnis zeigt, ob ich gut oder schlecht investiert habe.“

**Zielzustand nach der App:**  
„Startjahre sind Schicksal. Ich brauche einen Plan, der verschiedene Epochen überlebt, statt eine perfekte Epoche zu verlangen.“

**Muss-Kriterien für jede Umsetzung:**  
- Rollierende historische Zeiträume sichtbar machen.
- Börsenepoche als Los darstellen, nicht als Können.
- Inflations-/Kaufkraftlogik prüfen, falls in der Mini-Spec verbindlich.
- Klare Abgrenzung zu B1: hier geht es um Epochenvergleich, nicht um das verfügbare Heute.

**Nicht-Ziele / harte Verbote:**  
- Kein Kindersparplan.
- Kein „vor 10 Jahren vs. heute“-Motiv.
- Keine Prokrastinationskosten-App.
- Keine Optimierung des besten Startjahres.
- Keine persönliche Schuldlogik.

**Klärungsbedarf vor Verteilung:**  
- Exakte Laufzeit / inflationsbereinigte Darstellung aus aktueller Mini-Spec prüfen.

---

## rollierende-sparplaene

**Status:** ZU PRÜFEN  
**Rolle:** Companion / Erweiterungsmodul zu historischer Startjahrlogik  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
mehrere Startzeitpunkte systematisch vergleichbar zu machen, damit ein einzelnes Beispiel nicht als Wahrheit missverstanden wird.

**Zu entfernende psychologische Barriere:**  
Der Nutzer verallgemeinert aus einem ausgewählten Zeitraum und hält diesen für repräsentativ.

**Falscher Glaubenssatz vorher:**  
„Wenn ein Beispielzeitraum überzeugt, ist die Sache bewiesen.“

**Zielzustand nach der App:**  
„Ich sehe die Bandbreite historischer Verläufe und verstehe, warum robuste Regeln wichtiger sind als ein schönes Einzelbeispiel.“

**Muss-Kriterien für jede Umsetzung:**  
- Rollierende Zeiträume statt cherry-picking.
- Klare Verbindung zu Startjahr-/Epochenlogik.
- Ergebnis als Bandbreite, nicht als Prognose.
- Keine Überladung mit Statistikbegriffen.

**Nicht-Ziele / harte Verbote:**  
- Kein weiterer Prokrastinationspreis.
- Kein Kindersparplan-Rest.
- Keine Zukunftsprognose.
- Keine Optimierung auf bestes Startjahr.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, ob diese App eigenständig bleiben soll oder als Erweiterungsmodul in `geburtsjahrlos` aufgeht.

---

## der-alte-euro

**Status:** GESICHERT / REKONSTRUIERT  
**Rolle:** B4 — Mechanik der Marktzeit / Zinseszins sichtbar machen  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
zu zeigen, was Zeit im Inneren eines einzelnen investierten Euros bewirkt: Ein alter Euro arbeitet nicht allein, sondern mit seinen Erträgen und den Erträgen auf frühere Erträge.

**Zu entfernende psychologische Barriere:**  
„Früh anfangen“ klingt wie moralische Mahnung; der Nutzer sieht nicht, warum frühes Geld strukturell anders arbeitet.

**Falscher Glaubenssatz vorher:**  
„Ein Euro bleibt im Kern ein Euro, nur mit etwas Rendite obendrauf.“

**Zielzustand nach der App:**  
„Ich sehe: Zeit macht aus einem Euro ein kleines Team. Der ursprüngliche Euro wird relativ kleiner, seine Ertragsfamilie größer.“

**Muss-Kriterien für jede Umsetzung:**  
- Ein Euro wird über 10, 20, 30 und 40 Jahre gezeigt.
- Gestapelte Balken trennen ursprünglichen Euro, Ertrag auf den Euro und Ertrag auf frühere Erträge.
- Nur wenige Renditeannahmen, keine freie Parameterorgie.
- Zinseszins wird gezeigt, nicht theoretisch erklärt.

**Nicht-Ziele / harte Verbote:**  
- Kein Heute-vs.-Später-Vergleich.
- Keine Opportunitätskosten.
- Keine historische MSCI-World-Simulation.
- Keine Sparrate, kein Depot, kein Einkommen.
- Keine ETF-Produktentscheidung.
- Keine Thesaurierer-vs.-Ausschütter-Debatte.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, ob Block-B-Position final ist.

---

## depot-kipppunkt

**Status:** GESICHERT / REKONSTRUIERT  
**Rolle:** B5 — Statuswechsel-App / Depot als Mitverdiener  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
Sparen vom Gefühl des Konsumverzichts in die Vorstellung eines zweiten Einkommensstroms zu drehen.

**Zu entfernende psychologische Barriere:**  
Sparen fühlt sich wie Verzicht an, weil der spätere Statuswechsel nicht sichtbar ist.

**Falscher Glaubenssatz vorher:**  
„Nur mein Job verdient Geld. Das Depot ist ein abstrakter Zukunftstopf.“

**Zielzustand nach der App:**  
„Irgendwann bringt mein Depot rechnerisch pro Jahr mehr ein als mein Job. Sparen baut einen Mitverdiener.“

**Muss-Kriterien für jede Umsetzung:**  
- Vergleich heutiges Job-Netto pro Jahr vs. rechnerischer Depot-Ertrag pro Jahr.
- Schnittpunkt / Kipppunkt sichtbar machen.
- Transparenzsatz: keine Prognose, keine Steuerplanung, keine Rentenplanung.
- Fortschrittsmarken möglich: 25 %, 50 %, 75 %, 100 %.

**Nicht-Ziele / harte Verbote:**  
- Keine Finanzfreiheit berechnen.
- Keine Entnahmerate.
- Keine Steuerdetails, Sozialabgaben, Gehaltssteigerung, Inflation.
- Keine Sparratendynamik.
- Keine historischen MSCI-Pfade.
- Keine Renditedebatte.

**Klärungsbedarf vor Verteilung:**  
- CTA im Hauptpfad prüfen: „Welche Dosis hältst du aus?“ vs. Standalone „Startplan bauen“.

---

## diversifikations-detektor

**Status:** REKONSTRUIERT  
**Rolle:** C1 — Diversifikationsillusion entlarven  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
sichtbar zu machen, dass mehrere ETFs nicht automatisch mehr echte Diversifikation bedeuten.

**Zu entfernende psychologische Barriere:**  
Produktanzahl fühlt sich wie Sicherheit an, auch wenn dieselben Aktien mehrfach enthalten sind.

**Falscher Glaubenssatz vorher:**  
„Wenn ich fünf ETFs habe, bin ich fünfmal besser diversifiziert.“

**Zielzustand nach der App:**  
„Ich prüfe Überschneidungen und Konzentrationen, nicht nur die Anzahl meiner Produkte.“

**Muss-Kriterien für jede Umsetzung:**  
- Überschneidungen zwischen ETFs sichtbar machen.
- Top-Positionen / Länder / Sektoren verständlich zeigen.
- Mehr-Produkte-Illusion ohne Fachjargon entlarven.
- Einfache Entscheidung unterstützen: bewusst vereinfachen oder bewusst ergänzen.

**Nicht-Ziele / harte Verbote:**  
- Keine Produktempfehlung.
- Kein ETF-Ranking.
- Keine Überredung zu maximaler Einfachheit.
- Keine Portfolio-Optimierung für Fortgeschrittene.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, ob `investment-universum` und `weltkarte-etf-indizes` als Gegenperspektive / Companion explizit abgegrenzt werden müssen.

---

## investment-universum

**Status:** REKONSTRUIERT  
**Rolle:** Gegenperspektive / Grundmodell zur Diversifikation  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
dem Nutzer eine einfache Landkarte des investierbaren Universums zu geben, bevor er Produktlisten mit echter Diversifikation verwechselt.

**Zu entfernende psychologische Barriere:**  
Der Nutzer sieht nur Produkte und Namen, aber nicht die darunterliegenden Anlageklassen, Rollen und Risikotreiber.

**Falscher Glaubenssatz vorher:**  
„Alles, was investierbar ist, ist nur eine weitere Produktvariante derselben Sache.“

**Zielzustand nach der App:**  
„Ich erkenne die großen Bausteine des Universums und kann Produkte ihrer Rolle zuordnen.“

**Muss-Kriterien für jede Umsetzung:**  
- Einfache visuelle Landkarte statt Produktkatalog.
- Rollenlogik: Wachstum, Sicherheit, Stabilisierung, Sonderbausteine.
- Fachbegriffe sparsam und optional.
- Verbindung zu Portfolio-Chemie vorbereiten, ohne sie auszubreiten.

**Nicht-Ziele / harte Verbote:**  
- Kein Produktkatalog.
- Keine konkrete Kaufempfehlung.
- Keine Theorievorlesung über Assetklassen.
- Keine fortgeschrittene Portfolio-Optimierung.

**Klärungsbedarf vor Verteilung:**  
- Exakte Rolle im C-Cluster gegen `diversifikations-detektor` und `weltkarte-etf-indizes` prüfen.

---

## komplexitaets-entlarver

**Status:** REKONSTRUIERT  
**Rolle:** C2 — Komplexitätsillusion entlarven  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
zu zeigen, wann zusätzliche Bausteine echten Nutzen bringen und wann sie nur Aufwand, Pflege und Fehlerrisiko erhöhen.

**Zu entfernende psychologische Barriere:**  
Komplexität fühlt sich professionell und sicher an.

**Falscher Glaubenssatz vorher:**  
„Ein komplexeres Depot ist automatisch durchdachter und robuster.“

**Zielzustand nach der App:**  
„Ich füge nur Bausteine hinzu, die eine erkennbare Aufgabe erfüllen. Sonst ist Einfachheit kein Mangel, sondern Robustheit.“

**Muss-Kriterien für jede Umsetzung:**  
- 1-ETF-Variante vs. Mehr-ETF-Variante verständlich vergleichen.
- Aufwand, Pflege, Überschneidung und Zusatznutzen sichtbar machen.
- Kein Spott über komplexere Portfolios.
- Entscheidung nach Nutzen, nicht nach Eleganz.

**Nicht-Ziele / harte Verbote:**  
- Keine pauschale Ein-ETF-Doktrin.
- Keine Fortgeschrittenen-Portfolios abwerten.
- Keine Produktauswahl-App.
- Keine Steuer- oder Rebalancing-Detailtiefe.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, welche konkrete Vergleichskonstellation Mini-Spec vorgibt.

---

## weltkarte-etf-indizes

**Status:** REKONSTRUIERT  
**Rolle:** Companion-App / visuelles Lernmodul  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
ETF-Indexnamen in eine sichtbare Weltkarte zu übersetzen.

**Zu entfernende psychologische Barriere:**  
Indexnamen klingen global, neutral und eindeutig; der Nutzer sieht die tatsächliche Länder- und Regionenlogik nicht.

**Falscher Glaubenssatz vorher:**  
„World, ACWI oder Emerging Markets sagt mir schon intuitiv, was wirklich drin ist.“

**Zielzustand nach der App:**  
„Ich sehe, welche Welt ich mit einem Index wirklich kaufe — und welche nicht.“

**Muss-Kriterien für jede Umsetzung:**  
- Indexgewichtungen geografisch sichtbar machen.
- Begriffe wie World, ACWI, EM, Europe etc. alltagstauglich übersetzen.
- Keine moralische Länderwertung.
- Als Lernmodul, nicht als Produktempfehlung.

**Nicht-Ziele / harte Verbote:**  
- Keine politische Bewertung von Ländern.
- Kein ETF-Ranking.
- Keine Prognose über Gewinnerregionen.
- Keine Empfehlung bestimmter Regionenquoten.

**Klärungsbedarf vor Verteilung:**  
- Datenquelle und Aktualisierungslogik für Indexgewichte prüfen.

---

## weltdepot-baukasten

**Status:** REKONSTRUIERT  
**Rolle:** C3 / Architektur-Baukasten  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
aus der offenen ETF-Produktwelt wenige verständliche Depot-Architekturen zu machen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer glaubt, er müsse aus tausenden ETFs selbst eine perfekte Struktur erfinden.

**Falscher Glaubenssatz vorher:**  
„Ohne perfekte Eigenkonstruktion ist mein Depot nicht richtig.“

**Zielzustand nach der App:**  
„Ich erkenne wenige robuste Grundarchitekturen und kann eine passende Richtung wählen.“

**Muss-Kriterien für jede Umsetzung:**  
- Wenige Varianten, nicht beliebige Kombinatorik.
- Jede Variante hat eine klare Rolle und einen Tradeoff.
- Kein Einzelsieger.
- Verbindung zum späteren Waschzettel vorbereiten, aber nicht ersetzen.

**Nicht-Ziele / harte Verbote:**  
- Keine individuelle Anlageberatung.
- Keine Produktempfehlung als finale Wahrheit.
- Keine Optimierungsmaschine.
- Keine 20 Varianten.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, welche vier Depotvarianten führend sind.

---

## etf-namensdecoder

**Status:** REKONSTRUIERT  
**Rolle:** D1 — ETF-Technik entmystifizieren  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
ETF-Namen so zu zerlegen, dass der Nutzer das Etikett lesen kann, ohne im Fachjargon stecken zu bleiben.

**Zu entfernende psychologische Barriere:**  
ETF-Namen wirken wie Expertencode und erzeugen Abhängigkeit von Vergleichsportalen.

**Falscher Glaubenssatz vorher:**  
„Ich verstehe ETF-Namen nicht; ich kann deshalb noch keine Auswahl treffen.“

**Zielzustand nach der App:**  
„Ich kann Anbieter, Index, Ausschüttung, Replikation und Währung grob einordnen. Das reicht, um nicht mehr gelähmt zu sein.“

**Muss-Kriterien für jede Umsetzung:**  
- ETF-Name farblich / segmentiert zerlegen.
- Nur handlungsrelevante Begriffe erklären.
- Plain German statt Prospekt-Sprache.
- Übergang zu Detail-Apps ermöglichen.

**Nicht-Ziele / harte Verbote:**  
- Kein vollständiger Prospektkurs.
- Keine Produktempfehlung.
- Kein ETF-Ranking.
- Keine Detailtiefe, die neue Blockade erzeugt.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, welche Namensbestandteile verbindlich in Mini-Spec genannt sind.

---

## replizierer-swapper

**Status:** REKONSTRUIERT  
**Rolle:** D2 — Replikationsmethode entgiften  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
physische Replikation, Sampling und Swap so zu erklären, dass Technikangst nicht zur Startbremse wird.

**Zu entfernende psychologische Barriere:**  
Unverstandene ETF-Technik wird als verstecktes Risiko empfunden.

**Falscher Glaubenssatz vorher:**  
„Swap klingt gefährlich; physisch klingt automatisch sicher.“

**Zielzustand nach der App:**  
„Ich verstehe die Grundmechanik und kann Replikationsmethode als Kriterium einordnen, ohne in Panik oder Perfektionismus zu fallen.“

**Muss-Kriterien für jede Umsetzung:**  
- Zwei Replikationsmethoden anschaulich gegenüberstellen.
- Risiken und Schutzmechanismen nüchtern erklären.
- Keine Methode dämonisieren.
- Entscheidung auf Einordnung reduzieren, nicht auf absolute Wahrheit.

**Nicht-Ziele / harte Verbote:**  
- Keine Derivate-Vorlesung.
- Keine Produktberatung.
- Keine Angstmacherei.
- Keine Aussage: physisch immer gut / synthetisch immer schlecht.

**Klärungsbedarf vor Verteilung:**  
- Sampling explizit einordnen oder nur physisch/swap? Mini-Spec prüfen.

---

## kostenkiller-ter

**Status:** REKONSTRUIERT  
**Rolle:** D3 — Kostenwirkung kalibrieren  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
sichtbar zu machen, welche Kosten langfristig wirklich wirken und welche sichtbaren Kosten psychologisch überschätzt werden.

**Zu entfernende psychologische Barriere:**  
Der Nutzer verheddert sich in Kosten-Feinschliff oder gewichtet einmalige Kosten stärker als laufende Kosten.

**Falscher Glaubenssatz vorher:**  
„Wenn ich die kleinsten sichtbaren Kosten finde, habe ich die wichtigste Entscheidung gelöst.“

**Zielzustand nach der App:**  
„Ich verstehe die Kostenhierarchie und lasse Kosten nicht zur Startbremse werden.“

**Muss-Kriterien für jede Umsetzung:**  
- Einmalige und laufende Kosten über Zeit sichtbar machen.
- TER / laufende Kosten als langfristigen Effekt erklären.
- Kosten wichtig nehmen, aber nicht als alleinigen Haupthebel inszenieren.
- Übergang zu ETF-Vergleich / Feinschliff-Entgiftung ermöglichen.

**Nicht-Ziele / harte Verbote:**  
- Kein ETF-Ranking.
- Keine Jagd nach dem billigsten Produkt um jeden Preis.
- Keine Renditeprognose.
- Keine Steuerdetails.

**Klärungsbedarf vor Verteilung:**  
- Exakte Kostenarten aus Mini-Spec prüfen.

---

## etf-vergleich

**Status:** GESICHERT / ZU PRÜFEN  
**Rolle:** D4 — ETF-Feinschliff-Entgifter / Exit-Gate aus Produktoptimierung  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
den Nutzer aus der ETF-Produktoptimierung herauszuführen, sobald die Unterschiede innerhalb solider Kandidaten nicht mehr der Grund sein dürfen, den Start zu vertagen.

**Zu entfernende psychologische Barriere:**  
Produktdetails wirken kontrollierbar; deshalb werden sie als legitime Startbremse benutzt.

**Falscher Glaubenssatz vorher:**  
„Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss.“

**Zielzustand nach der App:**  
„ETF-Feinschliff ist real, aber nicht der Wald. Innerhalb solider Kandidaten ist der laufende Sparplan wichtiger als die perfekte Produktnuance.“

**Muss-Kriterien für jede Umsetzung:**  
- Typische Produktdetails einsammeln: TER, Ausschüttung, Replikation, Fondsgröße, Anbieter.
- Unterschiede nicht leugnen, sondern gegen den Haupthebel Start kalibrieren.
- Als Exit-Gate aus D1–D3 funktionieren.
- Nicht-Ziele explizit übernehmen und hart schützen.

**Nicht-Ziele / harte Verbote:**  
- Nicht sagen: „TER ist egal.“
- Nicht sagen: „Alle ETFs sind gleich.“
- Kein Einzelsieger.
- Keine Affiliate- oder Ranking-Inszenierung.
- Keine neue Perfektionsmaschine bauen.
- Keine Startverzögerung durch noch mehr Vergleichstiefe.

**Klärungsbedarf vor Verteilung:**  
- D4-Mini-Spec ist reich; vor Verteilung gesondert prüfen.

---

## esg-spiegel

**Status:** REKONSTRUIERT / ZU PRÜFEN  
**Rolle:** E1 — ESG-Label entmystifizieren  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
ESG-Etiketten mit den tatsächlichen Top-Positionen zu spiegeln.

**Zu entfernende psychologische Barriere:**  
Der Nutzer vertraut dem Label und verwechselt ESG-Variante mit moralisch eindeutig anderer Geldanlage.

**Falscher Glaubenssatz vorher:**  
„Wenn ESG draufsteht, ist mein Geld automatisch deutlich anders und moralisch sauber investiert.“

**Zielzustand nach der App:**  
„Ich sehe, was wirklich drin ist, und treffe eine bewusste ESG-Entscheidung ohne Etikettenmagie.“

**Muss-Kriterien für jede Umsetzung:**  
- Top-Positionen verschiedener ESG-Varianten sichtbar machen.
- Überschneidungen nüchtern zeigen.
- ESG nicht lächerlich machen.
- Entscheidung bewusst machen, nicht moralisieren.

**Nicht-Ziele / harte Verbote:**  
- Kein ESG-Bashing.
- Keine moralische Belehrung.
- Keine Produktempfehlung.
- Keine politische Debatte als Hauptpfad.

**Klärungsbedarf vor Verteilung:**  
- Exakte Vergleichsgruppe und Datenquelle prüfen.

---

## renditekiller-volatilitaet

**Status:** REKONSTRUIERT  
**Rolle:** F1 — Volatilitäts-/Pfadwirkung zeigen  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
sichtbar zu machen, dass der Weg zählt: hohe Schwankung kann trotz gleicher Durchschnittsrendite das Endvermögen senken.

**Zu entfernende psychologische Barriere:**  
Der Nutzer schaut nur auf Durchschnittsrendite und unterschätzt Pfadabhängigkeit.

**Falscher Glaubenssatz vorher:**  
„Solange die Durchschnittsrendite stimmt, ist der Weg egal.“

**Zielzustand nach der App:**  
„Der Weg frisst Rendite. Ruhigere Pfade können mehr wert sein als eine theoretisch höhere Durchschnittszahl.“

**Muss-Kriterien für jede Umsetzung:**  
- Zwei Pfade mit gleicher Durchschnittsrendite, aber unterschiedlichem Endwert sichtbar machen.
- Volatility Drag zeigen, ohne den Begriff im Hauptpfad aufzudrängen.
- Wirkung erleben lassen, nicht mathematisch dozieren.
- Verbindung zu psychologischer Durchhaltefähigkeit herstellen.

**Nicht-Ziele / harte Verbote:**  
- Keine Theorievorlesung.
- Keine Derivate-/Trendfolge-Empfehlung.
- Keine Portfoliooptimierung.
- Keine Fachbegriffe als Einstieg.

**Klärungsbedarf vor Verteilung:**  
- Prüfen, ob diese App im Hauptpfad oder Fortgeschrittenenpfad liegt.

---

## thesaurierer-rennen

**Status:** REKONSTRUIERT  
**Rolle:** F2 — Ausschütter/Thesaurierer-Perfektionismus entschärfen  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
den Unterschied zwischen thesaurierend und ausschüttend sichtbar zu machen, ohne daraus eine Startbremse zu bauen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer glaubt, die Ausschüttungsart sei eine über Erfolg oder Misserfolg entscheidende Produktfrage.

**Falscher Glaubenssatz vorher:**  
„Wenn ich bei thesaurierend vs. ausschüttend falsch liege, ruiniere ich mein Ergebnis.“

**Zielzustand nach der App:**  
„Ich verstehe den Unterschied und kann pragmatisch entscheiden, ohne die Produktwahl zu überhöhen.“

**Muss-Kriterien für jede Umsetzung:**  
- Wettrennen / Vergleich überraschend klein oder einordnend darstellen.
- Steuer- und Wiederanlageannahmen transparent machen.
- Keine Empfehlung als allgemeingültige Wahrheit.
- Entscheidung entkrampfen.

**Nicht-Ziele / harte Verbote:**  
- Keine Steuerberatung.
- Keine Produktempfehlung.
- Keine Detailtiefe, die neuen Perfektionismus erzeugt.
- Keine pauschale Überlegenheit einer Variante.

**Klärungsbedarf vor Verteilung:**  
- Steuerannahmen und Vergleichslogik vor Umsetzung prüfen.

---

## regulatorik-dashboard

**Status:** REKONSTRUIERT / ZU PRÜFEN  
**Rolle:** G1 — Systemrisiken einordnen  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
Regulierung, Steuern und politische Eingriffe als reale Faktoren sichtbar zu machen, ohne daraus Lähmung oder Weltuntergang abzuleiten.

**Zu entfernende psychologische Barriere:**  
Systemrisiken werden als Grund benutzt, gar nicht zu handeln.

**Falscher Glaubenssatz vorher:**  
„Der Staat, Steuern oder Regulierung machen langfristiges Investieren ohnehin sinnlos.“

**Zielzustand nach der App:**  
„Systemrisiken sind real. Ich kann sie einpreisen und robust planen, statt mich lähmen zu lassen.“

**Muss-Kriterien für jede Umsetzung:**  
- Mehrere Regulierungs-/Steuer-Szenarien nüchtern zeigen.
- Keine politische Kampfrhetorik.
- Keine exakten Rechtsversprechen.
- Keine Handlungslähmung.
- Handlungsspielraum sichtbar lassen.

**Nicht-Ziele / harte Verbote:**  
- Keine Rechts- oder Steuerberatung.
- Kein politischer Rant.
- Keine Untergangs-App.
- Keine Lähmung durch Worst-Case-Übergewichtung.

**Klärungsbedarf vor Verteilung:**  
- Konkrete Szenarien aus Mini-Spec prüfen.

---

## rendite-kalibrierung

**Status:** REKONSTRUIERT  
**Rolle:** G2 — Erwartungsmanagement  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
Renditeerwartungen so zu kalibrieren, dass der Plan auch bei niedrigeren Ergebnissen mental und rechnerisch tragfähig bleibt.

**Zu entfernende psychologische Barriere:**  
Der Nutzer baut seinen Plan auf Wunschzahlen und wird bei realistischeren Annahmen entweder euphorisch oder gelähmt.

**Falscher Glaubenssatz vorher:**  
„Wenn ETFs nicht sieben Prozent bringen, lohnt sich der Plan nicht.“

**Zielzustand nach der App:**  
„Ich sehe, was 4 %, 5 %, 6 % oder 7 % bedeuten, und kann meinen Plan robust statt optimistisch bauen.“

**Muss-Kriterien für jede Umsetzung:**  
- Verschiedene Renditeannahmen nüchtern vergleichen.
- Keine Prognose, sondern Sensitivitätsprüfung.
- Ergebnis muss Handlung ermöglichen, nicht Hoffnung zerstören.
- Einordnung statt Renditedebatte.

**Nicht-Ziele / harte Verbote:**  
- Keine Renditeprognose.
- Kein Szenario als wahrscheinlich markieren.
- Keine Angstmacherei mit Niedrigrendite.
- Keine Produkt- oder Faktorwette.

**Klärungsbedarf vor Verteilung:**  
- Welche Renditestufen verbindlich sind, Mini-Spec prüfen.

---

## etf-aera-vorbei

**Status:** REKONSTRUIERT / ZU PRÜFEN  
**Rolle:** Zweifel prüfen / ETF-Ära-Skepsis einordnen  
**Verteilungsstatus:** Nicht verteilt

**Diese App existiert, um:**  
berechtigte ETF-Skepsis von lähmender Ausrede zu trennen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer benutzt „Vielleicht funktioniert ETF-Investieren künftig nicht mehr“ als Grund, gar nicht zu starten.

**Falscher Glaubenssatz vorher:**  
„Die gute ETF-Zeit ist vorbei; deshalb bringt ein einfacher Weltportfolio-Plan nichts mehr.“

**Zielzustand nach der App:**  
„Ich sehe, welche ETF-Risiken real sind, welche übertrieben sind und welche Konsequenzen sie für einen robusten Plan haben.“

**Muss-Kriterien für jede Umsetzung:**  
- Skepsis ernst nehmen, nicht abwinken.
- Argumente strukturieren: Bewertungen, Konzentration, Regulierung, passives Volumen, Zukunftsrenditen.
- Ergebnis muss zur robusten Planung führen, nicht zur Lähmung.
- Keine Garantien.

**Nicht-Ziele / harte Verbote:**  
- Kein ETF-Marketing.
- Kein Untergangsnarrativ.
- Keine Prognose.
- Keine komplexe Kapitalmarkttheorie im Hauptpfad.

**Klärungsbedarf vor Verteilung:**  
- Exakte App-Rolle im Funnel gegen `rendite-kalibrierung`, `regulatorik-dashboard` und `passiv-paradox` prüfen.

---

## plan-generator

**Status:** GESPERRT  
**Rolle:** H1 / Startplan-Konfigurator, aber aktuelle Quellenlage laut Inventar nicht tragfähig  
**Verteilungsstatus:** Gesperrt

**Diese App existiert, um:**  
[Klärungsbedarf]

**Zu entfernende psychologische Barriere:**  
[Klärungsbedarf]

**Falscher Glaubenssatz vorher:**  
[Klärungsbedarf]

**Zielzustand nach der App:**  
[Klärungsbedarf]

**Muss-Kriterien für jede Umsetzung:**  
- Erst klären, welche Entscheidung diese App im Kopf des Nutzers verändern soll.
- Erst klären, ob sie Startplan, Waschzettel, Konfigurator oder etwas anderes ist.
- Erst klären, welche Nicht-Ziele gelten.
- Keine APP_SPEC aus dünnem Material erzeugen.

**Nicht-Ziele / harte Verbote:**  
- Kein automatisches Ausfüllen aus App-Namen.
- Keine Anlageberatung aus dem Nichts.
- Keine Waschzettel-Logik ohne redaktionelle Freigabe.
- Keine Verteilung, bevor die vier Klärungsfragen beantwortet sind.

**Klärungsbedarf vor Verteilung:**  
- Wofür existiert diese App?
- Welche Barriere soll sie entfernen?
- Was darf sie ausdrücklich nicht tun?
- Bleibt sie Teil der App-Fabrik oder wird sie gestrichen / verschoben?

---

# 4. Repo-Abgleich und Altspuren

## 4.1 Ergebnis des Repo-Abgleichs

Abgleich gegen das im Repo liegende AP-04-Inventar (`docs/App-Fabrik/APP_STEUERUNGSBLOCK_INVENTORY.md`) und den AP-05-Rollout-Plan (`docs/App-Fabrik/APP_STEUERUNGSBLOCK_ROLLOUT_PLAN.md`).

Ergebnis:

- Repo-Inventar: 25 App-Ordner unter `Apps/*/`
- Seed-Sektion dieser Datei nach Bereinigung: 25 App-Seeds
- Fehlende Repo-Apps in dieser Datei: keine
- Zusätzliche Seed-Apps ohne App-Ordner: keine
- Altspur außerhalb der Seed-Sektion: `passiv-paradox`

Regel:

```text
Nur Überschriften unter "# 3. Seed-Blöcke" gelten als verteilbare App-Seeds.
Altspuren unter "# 4. Repo-Abgleich und Altspuren" werden nicht in App-Dateien verteilt.
```

## 4.2 Altspur: passiv-paradox

`passiv-paradox` ist im aktuellen AP-04-Inventar nicht als App-Ordner unter `Apps/*/` geführt und deshalb kein verteilbarer App-Seed.

Arbeitsnotiz:

- `passiv-paradox` wurde offenbar umbenannt oder archiviert.
- Backlog-/Archivspur separat klären.
- Nicht aus `etf-aera-vorbei`, `regulatorik-dashboard` oder anderen Apps ableiten.
- Erst wieder als Seed aufnehmen, wenn ein aktueller App-Ordner oder eine freigegebene Reaktivierungsentscheidung existiert.

Ursprünglicher Hinweis aus der Seed-Arbeitsfassung:

```md
## passiv-paradox / nicht vorhandener Ordner

**Status:** HINWEIS  
**Rolle:** In älteren App-Listen als G3 vorhanden, im AP-04-Inventar nicht als App-Ordner geführt,
**Verteilungsstatus:** Nicht verteilen

**Hinweis:**  
passiv-paradox wurde umbenannt. Siehe  backlog-Archiv für diesen Task. Räume entsprechend auf und passe an.
```

---

# 5. Prozess für die nächste Stufe

## 5.1 Redaktionelle Prüfung

Albert prüft diese Datei zuerst auf:

1. Stimmt die Barriere je App?
2. Ist der falsche Glaubenssatz wirklich app-spezifisch?
3. Ist der Zielzustand klar unterscheidbar?
4. Sind Nicht-Ziele hart genug?
5. Gibt es falsche Übertragungen aus anderen Apps?
6. Gibt es Apps, die zusammengelegt oder gesperrt werden müssen?

## 5.2 Verteilung erst nach Freigabe

Nach Freigabe gilt:

```text
Seed-Datei ist Quelle.
App-Dateien sind Ziel.
Claude verteilt mechanisch.
Keine neue Interpretation je App.
Der LLM-Prüfscore aus Abschnitt 2.1 wird in jeden lokalen Steuerungsblock unverändert übernommen.
```

## 5.3 Empfohlene Verteilungsreihenfolge

1. `prokrastinations-preis` nach finaler Korrektur des Fokus.
2. Sonderfall `etf-vergleich`.
3. Gesicherte / rekonstruierte Apps mit starkem Rohmaterial.
4. Dünnere Apps mit `ZU PRÜFEN`.
5. `plan-generator` erst nach fachlicher Klärung.
6. Altspur `passiv-paradox` außerhalb der Verteilung klären; nicht als App-Seed verteilen.


---

# 6. Bekannte Risiken

## Risiko 1 — Seed wird zu früh als Wahrheit behandelt

Gegenmaßnahme:
Alle Blöcke bleiben 80%-Nordsterne, bis Albert sie freigibt.

## Risiko 2 — Prokrastinationspreis-Barriere wird kopiert

Gegenmaßnahme:
Jede App hat eigene Barriere. `prokrastinations-preis` ist nur B1, nicht Universalmodell.

## Risiko 3 — Claude verbessert beim Verteilen

Gegenmaßnahme:
Verteilungsauftrag muss mechanisch sein: kopieren, nicht interpretieren.

## Risiko 4 — Dünne Apps werden schöngeschrieben

Gegenmaßnahme:
`ZU PRÜFEN` und `GESPERRT` ernst nehmen. Lücken markieren, nicht füllen.

## Risiko 5 — Score wird als Rechenfreigabe missverstanden

Gegenmaßnahme:
Der Score ist ein Stop-/Prüfgate, kein Freifahrtschein. Besonders Punkt 3 (`Nicht-Ziele`) bleibt KO-Kriterium: jede Nicht-Ziel-Verletzung stoppt die Änderung.

---

# 7. Nächster sinnvoller Schritt

Nicht direkt verteilen.

Nächster Schritt:

```text
Seed-Datei redaktionell prüfen und korrigieren.
Danach erst ein einzelner mechanischer Einbau-Test.
```
