Stand: 2026-06-16 | V1.2 — AP-08b/AP-08c Konsistenz-Nachputz abgeschlossen | Geändert von: Claude

# QA_TEST_CASES — prokrastinations-preis

Vollständige Test- und QA-Kriterien für die Stationen-Zeitreise.

**Bindende Quellen:**
- `APP_SPEC.md` V2.5 (führende Spec)
- `STATIONS_CONFIG_CONTRACT.md` (Felder, Enums, Fensterfilter, Redaktions-Gate)
- `ENTSCHEIDUNGSPROTOKOLL.md` (dramaturgische Regeln)
- `REDAKTIONS_GATE.md` (Gate-Regeln und Release-Checkliste — `QA_TEST_CASES.md` beschreibt das Wie der Prüfung, `REDAKTIONS_GATE.md` das Was)

**Geltungsbereich:** AP-06 definiert Testfälle für Coding- und QA-Arbeitspakete. Kein Code, keine automatisierten Tests, keine produktive `stations.de.json`.

---

## Testgruppen-Übersicht

| Gruppe | Zweck |
|---|---|
| A — Datenladen und Validierung | CSV + Stations-JSON laden und prüfen |
| B — Rolling Window und Stationenfilter | aktives 120-Monats-Fenster korrekt bilden |
| C — Screen-Flow | 4 Screens / 3 Akte korrekt abbilden |
| D — Screen 2 Stationen-Zeitreise | Teilchart, Stationstexte, Button, kein Endwissen |
| E — Screen 3 Reveal | vollständiger Chart und KPI-Cards erst nach Zeitreise |
| F — Screen 4 Transfer | heutige Entscheidung ohne Prognose |
| G — Mobile und Collapsible | Zwischenstand mobil aufklappbar, keine Zahlenfliegen |
| H — Accessibility | Tastatur, Fokus, Screenreader, Chart-A11y |
| I — Reduced Motion | ohne Animation vollständige Information |
| J — Visual- und Ethikregeln | keine rote Codierung, keine Fake-Urgency |
| K — Fehler- und Empty-States | JSON-/Datenfehler verständlich behandeln |
| L — Regression gegen alte Logik | alte Screen-2-Ergebnisgrafik darf nicht zurückkehren |

---

## Testfall-Format

```md
### TC-XX — Kurzer Testname

**Typ:** Manuell / Automatisierbar / Visuell / A11y / Regression
**Priorität:** Muss / Soll / Kann
**Voraussetzung:** ...
**Schritte:**
1. ...

**Erwartetes Ergebnis:**
- ...

**Fehlschlag, wenn:**
- ...
```

**Prioritäten:**

| Priorität | Bedeutung |
|---|---|
| Muss | Release-blockierend |
| Soll | wichtig, aber nicht zwingend blockierend |
| Kann | spätere Verbesserung |

---

## Gruppe A — Datenladen und Validierung

### TC-A01 — CSV und Stations-JSON werden getrennt geladen

**Typ:** Automatisierbar
**Priorität:** Muss
**Voraussetzung:** Valide CSV und valide Stations-JSON sind vorhanden.

**Schritte:**
1. App starten.
2. Prüfen, ob CSV geladen wird.
3. Prüfen, ob Stations-JSON geladen wird.
4. Prüfen, ob beide Datenquellen getrennt verarbeitet werden.

**Erwartetes Ergebnis:**
- CSV dient der Sparplanberechnung.
- Stations-JSON dient nur der redaktionellen Zeitreise.
- Keine Station wird aus dem Code erfunden.
- Keine Performancewerte werden aus der Stations-JSON gelesen.

**Fehlschlag, wenn:**
- Stationen in `app.js` hardcodiert sind.
- Depotwerte aus der JSON kommen.
- JSON die CSV-Logik überschreibt.

---

### TC-A02 — Ungültige Stations-JSON erzeugt Config-Fehler

**Typ:** Automatisierbar
**Priorität:** Muss
**Voraussetzung:** Stations-JSON enthält fehlende Pflichtfelder oder ungültige Enums.

**Schritte:**
1. App mit ungültiger Stations-JSON starten.
2. Prüfen, ob die Config erkannt wird.
3. Prüfen, ob keine fehlerhafte Zeitreise gerendert wird.

**Erwartetes Ergebnis:**
- App erkennt ungültige Config.
- Produktivmodus zeigt nutzerfreundlichen Fehler.
- Dev-Modus darf Details anzeigen.
- Keine kaputte oder irreführende Zeitreise wird angezeigt.

**Fehlschlag, wenn:**
- App rendert trotz ungültiger Stationen weiter.
- Fehlermeldung nur in der Konsole erscheint.
- Nutzer sieht halbfertige Stationen.

---

### TC-A03 — Quellenstatus wird geprüft

**Typ:** Automatisierbar / Manuell
**Priorität:** Muss
**Voraussetzung:** Eine sichtbare Station hat `sourceStatus = "source_claimed_unchecked"`.

**Schritte:**
1. App im Produktivmodus mit dieser Config starten.
2. Prüfen, ob Redaktions-Gate greift.

**Erwartetes Ergebnis:**
- Sichtbare Stationen mit ungeprüftem Quellenstatus sind nicht publikationsreif.
- Produktivmodus darf diese Stationen nicht stillschweigend als final behandeln.
- Dev-Modus darf konkrete Station nennen.

**Fehlschlag, wenn:**
- Ungeprüfte Quelle im Produktivmodus normal erscheint.
- Quelle als geprüft dargestellt wird, obwohl Status ungeprüft ist.

---

## Gruppe B — Rolling Window und Stationenfilter

### TC-B01 — `latestMonth` kommt aus CSV, nicht aus Tagesdatum

**Typ:** Automatisierbar
**Priorität:** Muss
**Voraussetzung:** CSV endet z. B. mit `2026-06`.

**Schritte:**
1. App starten.
2. `latestMonth` bestimmen.
3. Prüfen, welches Enddatum die App verwendet.

**Erwartetes Ergebnis:**
- `latestMonth = 2026-06`.
- App verwendet nicht das aktuelle Tagesdatum.
- Finaler Reveal hängt am letzten CSV-Monat.

**Fehlschlag, wenn:**
- App verwendet `new Date()` als fachlichen Endpunkt.
- App zeigt Monate, die nicht in der CSV vorhanden sind.

---

### TC-B02 — Startmonat ist `latestMonth − 119 Monate`

**Typ:** Automatisierbar
**Priorität:** Muss
**Voraussetzung:** CSV enthält mindestens 120 gültige Monatsdaten.

**Schritte:**
1. `latestMonth` aus CSV bestimmen.
2. `startMonth` berechnen.
3. Prüfen, ob genau 120 Monatsdaten im aktiven Fenster liegen.

**Erwartetes Ergebnis:**
- Aktives Fenster enthält 120 Monatsdatenpunkte.
- Startmonat ist exakt `latestMonth − 119 Monate`.

**Fehlschlag, wenn:**
- App 121 oder 119 Monate zeigt.
- App Kalenderjahre statt Monatsfenster verwendet.
- App „heute minus 10 Jahre" aus Tagesdatum berechnet.

---

### TC-B03 — Stationen außerhalb des Fensters werden nicht angezeigt

**Typ:** Automatisierbar
**Priorität:** Muss
**Voraussetzung:** Stationsbibliothek enthält Stationen vor `startMonth` und innerhalb des Fensters.

**Schritte:**
1. App starten.
2. Aktive Stationen prüfen.
3. Prüfen, ob alte Stationen ausgefiltert wurden.

**Erwartetes Ergebnis:**
- Nur Stationen innerhalb des aktiven CSV-Fensters erscheinen.
- Archivstationen bleiben in der Bibliothek, aber nicht im UI.

**Fehlschlag, wenn:**
- Brexit oder andere alte Stationen sichtbar bleiben, obwohl sie außerhalb des Fensters liegen.
- App Stationen nach `latestMonth` zeigt.

---

### TC-B04 — Finaler Reveal wird dynamisch erzeugt

**Typ:** Automatisierbar
**Priorität:** Muss
**Voraussetzung:** Stations-JSON enthält Template `dynamic_latest_month`.

**Schritte:**
1. App mit CSV-Endmonat A starten.
2. Finalen Reveal prüfen.
3. CSV-Endmonat auf B ändern.
4. App erneut starten.

**Erwartetes Ergebnis:**
- Finaler Reveal verwendet jeweils den letzten CSV-Monat.
- Datum und Werte kommen aus CSV/Sparplanberechnung.
- JSON enthält keinen harten finalen Datenmonat.

**Fehlschlag, wenn:**
- Finaler Reveal auf August 2024 oder ein anderes hartes Datum fixiert ist.
- Finale Werte aus JSON kommen.

---

## Gruppe C — Screen-Flow

### TC-C01 — App hat vier Screens

**Typ:** Manuell / Automatisierbar
**Priorität:** Muss

**Schritte:**
1. App starten.
2. Durch alle Screens navigieren.
3. Screen-Funktionen prüfen.

**Erwartetes Ergebnis:**

| Screen | Erwartete Funktion |
|---|---|
| 1 | Teleportation / Eingabe |
| 2 | Stationen-Zeitreise |
| 3 | Reveal / vollständiger Rückblick |
| 4 | Transfer auf heute |

**Fehlschlag, wenn:**
- Screen 2 bereits vollständiger Rückblick ist.
- Screen 3 nur eine Wiederholung von Screen 2 ist.
- Screen 4 eine Prognose zeigt.

---

### TC-C02 — Screen 1 teleportiert, statt nur zu rechnen

**Typ:** Manuell
**Priorität:** Soll

**Schritte:**
1. Screen 1 lesen.
2. Slider bedienen.
3. Primärbutton prüfen.

**Erwartetes Ergebnis:**
- Screen 1 rahmt die Reise als historischen Sprung.
- Button lautet sinngemäß `10 Jahre zurückspringen`.
- Nutzer versteht: Ich nehme meine Sparrate mit, aber nicht das Wissen von heute.

**Fehlschlag, wenn:**
- Screen 1 wie ein neutraler Renditerechner wirkt.
- Button nur `Berechnen` oder `Weiter` sagt.

---

## Gruppe D — Screen 2 Stationen-Zeitreise

### TC-D01 — Screen 2 zeigt nur Teilchart bis aktueller Station

**Typ:** Automatisierbar / Visuell
**Priorität:** Muss

**Schritte:**
1. Screen 2 an erster Station öffnen.
2. Chartdaten prüfen.
3. Zur nächsten Station weitergehen.
4. Chartdaten erneut prüfen.

**Erwartetes Ergebnis:**
- Chart endet jeweils an der aktuellen Station.
- Spätere Daten sind nicht sichtbar.
- Kein gestrichelter Zukunftspfad.
- Kein blasser Vorschauverlauf.
- Kein finaler Endpunkt.

**Fehlschlag, wenn:**
- Vollständige 10-Jahres-Linie sichtbar ist.
- Spätere Stationen visuell erkennbar sind.
- Y-Achse oder Labels das Ende indirekt verraten, soweit vermeidbar.

---

### TC-D02 — Screen 2 zeigt keine finalen KPI-Cards

**Typ:** Regression
**Priorität:** Muss

**Schritte:**
1. Screen 2 öffnen.
2. Alle sichtbaren Karten und Zahlen prüfen.

**Erwartetes Ergebnis:**
- Keine finalen KPI-Cards.
- Kein finaler Depotwert.
- Kein finaler Gesamtgewinn.
- Zwischenstand nur optional über Collapsible.

**Fehlschlag, wenn:**
- KPI-Cards aus alter Screen-2-Logik sichtbar sind.
- Finaler Depotwert vor Screen 3 sichtbar wird.

---

### TC-D03 — Button lautet `Weiter investiert bleiben`

**Typ:** Manuell / Automatisierbar
**Priorität:** Muss

**Schritte:**
1. Jede normale Station prüfen.
2. Button-Text prüfen.
3. Finalen Reveal prüfen.

**Erwartetes Ergebnis:**
- Normale Stationen: `Weiter investiert bleiben`.
- Finaler Schritt: `Ergebnis ansehen`.
- Kein generisches `Weiter`.

**Fehlschlag, wenn:**
- Button `Weiter` heißt.
- Buttontext beliebig pro Station variiert.
- Finaler Label-Wechsel fehlt.

---

### TC-D04 — Falsche Auflösung verrät sich nicht

**Typ:** Manuell / Dramaturgie-Check
**Priorität:** Muss
**Voraussetzung:** Station November 2020 ist aktiv.

**Schritte:**
1. Impfstoff-Station anzeigen.
2. Headline und Ankertext lesen.
3. Prüfen, ob spätere Rückschläge angekündigt werden.

**Erwartetes Ergebnis:**
- Station wirkt wie eine echte Erleichterung.
- Kein Text sagt: „Aber die Reise ist noch nicht vorbei."
- Nächste Station kommt ohne Vorwarnung.

**Fehlschlag, wenn:**
- Text die spätere Krise ankündigt.
- UI zeigt Progress wie „Station 4 von 7" so prominent, dass die falsche Auflösung entwertet wird.
- Station als „Falle" bezeichnet wird.

---

### TC-D05 — Finaler Wackler bleibt ruhig

**Typ:** Manuell / Visuell
**Priorität:** Muss
**Voraussetzung:** April 2025 oder äquivalenter `late_wobble` ist aktiv.

**Schritte:**
1. Late-Wobble-Station anzeigen.
2. Text und Chart prüfen.

**Erwartetes Ergebnis:**
- Unsicherheit wird gezeigt.
- Keine rote Codierung.
- Keine Panikformulierung.
- Keine Prognose.
- Station macht klar: Langfristcharts wirken nur rückblickend glatt.

**Fehlschlag, wenn:**
- Station alarmistisch wirkt.
- Chart rot markiert ist.
- Text Zukunftsausgang vorwegnimmt.

---

## Gruppe E — Screen 3 Reveal

### TC-E01 — Vollständiger Chart erscheint erstmals auf Screen 3

**Typ:** Regression / Visuell
**Priorität:** Muss

**Schritte:**
1. Screen 2 vollständig durchlaufen.
2. Zu Screen 3 wechseln.
3. Chart prüfen.

**Erwartetes Ergebnis:**
- Erst Screen 3 zeigt den vollständigen 120-Monats-Chart.
- Screen 3 fühlt sich erkennbar wie der Reveal an.
- Vorher war das Ende nicht sichtbar.

**Fehlschlag, wenn:**
- Vollständiger Chart schon auf Screen 2 sichtbar war.
- Screen 3 keine neue Erkenntnis bringt.

---

### TC-E02 — Finale KPI-Cards erscheinen erst auf Screen 3

**Typ:** Regression
**Priorität:** Muss

**Schritte:**
1. Screen 2 prüfen.
2. Screen 3 prüfen.

**Erwartetes Ergebnis:**
- Screen 2: keine finalen KPI-Cards.
- Screen 3: finale KPI-Cards sichtbar.
- Werte basieren auf Sparplanberechnung und CSV.

**Fehlschlag, wenn:**
- Finale KPIs vorher sichtbar sind.
- Finale KPIs aus Stations-JSON kommen.

---

### TC-E03 — AssumptionsBox bleibt sichtbar

**Typ:** Manuell
**Priorität:** Muss

**Schritte:**
1. Screen 3 öffnen.
2. AssumptionsBox prüfen.

**Erwartetes Ergebnis:**
- Annahmen sind sichtbar.
- Vergangenheit wird nicht als Zukunftsversprechen dargestellt.
- Keine Finanzberatung / keine Produktempfehlung.

**Fehlschlag, wenn:**
- Annahmen fehlen.
- Text suggeriert: Die nächsten 10 Jahre werden genauso.

---

## Gruppe F — Screen 4 Transfer

### TC-F01 — Screen 4 enthält keine Prognose

**Typ:** Manuell / Regression
**Priorität:** Muss

**Schritte:**
1. Screen 4 öffnen.
2. Visuals und Texte prüfen.

**Erwartetes Ergebnis:**
- Kein Zukunftschart.
- Keine fortgeschriebene Linie.
- Keine Renditeannahme.
- Keine simulierten nächsten 10 Jahre.
- Transfer auf heutige Entscheidung.

**Fehlschlag, wenn:**
- App eine Zukunftsentwicklung zeigt.
- Screen 4 wie eine Prognose wirkt.

---

### TC-F02 — Screen 4 erzeugt Handlungsfähigkeit, keinen Druck

**Typ:** Manuell / Ethik-Check
**Priorität:** Muss

**Schritte:**
1. Screen 4 Texte lesen.
2. CTA prüfen.

**Erwartetes Ergebnis:**
- Ton ist ruhig.
- Keine Scham.
- Keine Fake-Urgency.
- Keine Countdown-Logik.
- Aussage: Heute beginnt wieder ein Chart, dessen Ende niemand kennt.

**Fehlschlag, wenn:**
- Text Druck erzeugt.
- Nutzer beschämt wird.
- CTA wie Verkaufsdruck klingt.

---

## Gruppe G — Mobile und Collapsible

### TC-G01 — Mobile zeigt keine permanenten Mini-KPIs je Station

**Typ:** Mobile / Visuell
**Priorität:** Muss

**Schritte:**
1. App auf Mobile-Breite öffnen.
2. Stationen durchlaufen.
3. Standardzustand je Station prüfen.

**Erwartetes Ergebnis:**
- Kein permanenter Depotwert je Station.
- Keine Mini-KPI-Karten unter jeder Station.
- Kein Zahlenmüll im engen Layout.
- Nur `Zwischenstand anzeigen`.

**Fehlschlag, wenn:**
- Mobile mit kleinen Zahlen überladen ist.
- Depotwerte dauerhaft sichtbar sind.

---

### TC-G02 — Zwischenstand ist auf Mobile aufklappbar

**Typ:** Mobile / A11y
**Priorität:** Muss

**Schritte:**
1. Station öffnen.
2. `Zwischenstand anzeigen` antippen.
3. Aufgeklappte Werte prüfen.
4. Wieder schließen.

**Erwartetes Ergebnis:**
- Geschlossen: `Zwischenstand anzeigen`.
- Geöffnet: `Eingezahlt` und `Depotwert damals`.
- Optional: Station-Datum.
- Label wechselt sinnvoll oder Status ist assistiv erkennbar.
- Werte werden berechnet.

**Fehlschlag, wenn:**
- Trigger nicht bedienbar ist.
- Werte fehlen.
- Werte redaktionell aus JSON kommen.
- Geöffneter Zustand bleibt für Screenreader unsichtbar.

---

### TC-G03 — Mobile Button ist erreichbar

**Typ:** Mobile / Manuell
**Priorität:** Soll

**Schritte:**
1. Stationen auf Mobile durchlaufen.
2. Button-Position prüfen.

**Erwartetes Ergebnis:**
- Primärbutton ist gut erreichbar.
- Button verdeckt keine Chartdaten.
- Kein langes Suchen nach Weiterführung.
- Sticky-Button nur, wenn keine Inhalte verdeckt werden.

**Fehlschlag, wenn:**
- Button unter langer Scrollstrecke verschwindet.
- Button Chart oder Text verdeckt.
- Zwei gleichrangige Primärbuttons konkurrieren.

---

## Gruppe H — Accessibility

### TC-H01 — Zeitreise ist vollständig per Tastatur bedienbar

**Typ:** A11y / Manuell
**Priorität:** Muss

**Schritte:**
1. App ohne Maus bedienen.
2. Slider bedienen.
3. Stationen weiterführen.
4. Collapsible öffnen/schließen.
5. Screen 3 und Screen 4 erreichen.

**Erwartetes Ergebnis:**
- Alle interaktiven Elemente sind fokussierbar.
- Enter/Space funktionieren.
- Fokusreihenfolge ist logisch.
- Keine Tastaturfalle.

**Fehlschlag, wenn:**
- Stationen nur per Maus erreichbar sind.
- Collapsible nicht per Tastatur bedienbar ist.
- Fokus verschwindet.

---

### TC-H02 — Fokus nach Stationswechsel bleibt nachvollziehbar

**Typ:** A11y / Manuell
**Priorität:** Muss

**Schritte:**
1. Mit Tastatur auf `Weiter investiert bleiben`.
2. Aktivieren.
3. Fokus nach Stationswechsel prüfen.

**Erwartetes Ergebnis:**
- Fokus landet sinnvoll.
- Nutzer erkennt die neue Station.
- Screenreader-Nutzer bekommen Kontext.
- Visueller Fokus ist sichtbar.

**Fehlschlag, wenn:**
- Fokus an alter unsichtbarer Stelle bleibt.
- Fokus an Seitenanfang springt ohne Grund.
- Neue Station wird nicht angekündigt.

---

### TC-H03 — Chart hat zugängliche Beschreibung

**Typ:** A11y
**Priorität:** Muss

**Schritte:**
1. Screen 2 mit Screenreader prüfen.
2. Screen 3 mit Screenreader prüfen.

**Erwartetes Ergebnis:**

Screen 2:
```
Chart beschreibt Sparplanentwicklung bis zur aktuellen Station; spätere Entwicklung ist noch nicht eingeblendet.
```

Screen 3:
```
Chart beschreibt vollständige Entwicklung über 120 Monate bis zum letzten CSV-Monat.
```

**Fehlschlag, wenn:**
- Chart nur als „Grafik" vorgelesen wird.
- Screenreader nur visuelle Linie ohne Kontext erhält.
- Screen 2 und Screen 3 identisch beschrieben werden.

---

### TC-H04 — Stationswechsel kann angekündigt werden

**Typ:** A11y
**Priorität:** Soll

**Schritte:**
1. Mit Screenreader von Station zu Station gehen.
2. Prüfen, ob neue Station erkennbar ist.

**Erwartetes Ergebnis:**
- Neue Station ist als Überschrift / Region erkennbar.
- Optional Live-Region kündigt kurz an:
  ```
  Neue Station: März 2020. Börsenhandel an der Wall Street ausgesetzt.
  ```

**Fehlschlag, wenn:**
- Nutzer nicht merkt, dass sich Inhalt geändert hat.
- Komplette lange Texte automatisch vorgelesen werden und überfordern.

---

### TC-H05 — Kein A11y-Endwissens-Leak vor Screen 3

**Typ:** A11y / Manuell
**Priorität:** Muss

**Hintergrund:** `revealA11ySummary` enthält den finalen Depotwert. Wird er auf Screen 2 in die ARIA Live Region geschrieben, erfährt der Screenreader-Nutzer das Ergebnis vor dem dramaturisch vorgesehenen Reveal auf Screen 3. Das ist ein Endwissens-Leak.

**Schritte:**
1. Screenreader aktivieren.
2. App starten, Slider bedienen (Screen 1).
3. Zeitreise starten, mehrere Stationen durchlaufen (Screen 2).
4. Auf jeder Station prüfen: ARIA Live Region, `aria-label`-Attribute, `figcaption`-Texte, `visually-hidden`-Elemente und Chartbeschreibungen.

**Erwartetes Ergebnis:**
- Live Region auf Screen 1 und Screen 2: leer oder enthält nur `stationLiveMessage` (Stationsname + Kurztext, kein Depotwert).
- `aria-label` und `figcaption` des Charts auf Screen 2: beschreiben nur Teilausschnitt bis zur aktuellen Station, nennen kein Endergebnis.
- `visually-hidden`-Texte: kein Depotwert, keine Gewinn-/Verlustangabe vor Screen 3.
- Live Region erst auf Screen 3: `revealA11ySummary` mit vollständigem Ergebnis.

**Fehlschlag, wenn:**
- Live Region, `aria-label`, `figcaption` oder `visually-hidden` auf Screen 1/2 einen Depotwert oder die Gesamtaussage „X € bei Y € eingezahlt" enthalten.
- Screenreader-Nutzer das finale Ergebnis vor dem Übergang zu Screen 3 erfährt.

---

## Gruppe I — Reduced Motion

### TC-I01 — Reduced Motion entfernt Bewegung, nicht Inhalt

**Typ:** A11y / Automatisierbar / Manuell
**Priorität:** Muss
**Voraussetzung:** `prefers-reduced-motion` aktiv.

**Schritte:**
1. App mit Reduced Motion starten.
2. Stationen durchlaufen.
3. Inhalte vergleichen.

**Erwartetes Ergebnis:**
- Keine Draw-Animation.
- Keine langen Übergänge.
- Keine Parallax-/Dramatisierungseffekte.
- Alle Stationen und Inhalte bleiben vorhanden.
- Nutzer behält Kontrolle.

**Fehlschlag, wenn:**
- Stationen übersprungen werden.
- Inhalte fehlen.
- Animation trotzdem lang läuft.

---

## Gruppe J — Visual- und Ethikregeln

### TC-J01 — Keine rote Crash-Codierung

**Typ:** Visuell / Regression
**Priorität:** Muss

**Schritte:**
1. Alle Stationen prüfen.
2. Besonders Crash- und Drawdown-Stationen prüfen.

**Erwartetes Ergebnis:**
- Keine rote Chart-Linie.
- Keine roten Verlustzahlen.
- Keine roten Crash-Segmente.
- Keine Alarm-Icons.
- Keine farbliche Gut/Schlecht-Codierung.

**Fehlschlag, wenn:**
- Irgendeine Verlustphase rot codiert wird.
- Rote Hervorhebung als dramaturgischer Effekt genutzt wird.

---

### TC-J02 — Keine Fake-Urgency und keine Scham

**Typ:** Redaktionell / Manuell
**Priorität:** Muss

**Schritte:**
1. Alle Stationstexte lesen.
2. Screen 3 und Screen 4 lesen.
3. CTA prüfen.

**Erwartetes Ergebnis:**
- Keine Beschämung.
- Kein „nur wer jetzt handelt".
- Kein Countdown.
- Keine Garantie.
- Keine Verkaufssprache.

**Fehlschlag, wenn:**
- Nutzer unter Druck gesetzt wird.
- Text suggeriert, dass Zukunft sicher ist.
- Prokrastination moralisiert wird.

---

## Gruppe K — Fehler- und Empty-States

### TC-K01 — Stations-JSON nicht ladbar

**Typ:** Fehlerfall / Automatisierbar
**Priorität:** Muss

**Schritte:**
1. App mit fehlender oder nicht ladbarer Stations-JSON starten.
2. UI prüfen.

**Erwartetes Ergebnis:**
- Nutzerfreundliche Fehlermeldung.
- Keine halbfertige Zeitreise.
- Dev-Modus darf Details zeigen.
- Produktivmodus zeigt keine technischen Interna.

**Fehlschlag, wenn:**
- App still scheitert.
- Nur Konsole Fehler zeigt.
- Kaputte UI erscheint.

---

### TC-K02 — Keine Crisis im aktiven Fenster

**Typ:** Redaktions-Gate
**Priorität:** Muss
**Voraussetzung:** Aktives Fenster enthält keine Station mit `role = "crisis"` und `priority >= 95`.

**Schritte:**
1. App mit entsprechender Config starten.
2. Gate-Verhalten prüfen.

**Erwartetes Ergebnis:**
- Redaktions-Gate erkennt Problem.
- App ist nicht publikationsreif.
- Dev-Hinweis benennt Problem.
- Keine schwache Zeitreise wird still veröffentlicht.

**Fehlschlag, wenn:**
- App läuft normal weiter.
- Zeitreise ohne Klimax produktiv erscheint.

---

### TC-K03 — Zu wenige sichtbare Stationen

**Typ:** Redaktions-Gate
**Priorität:** Soll
**Voraussetzung:** Filterung ergibt weniger als `minVisibleStations`.

**Schritte:**
1. App mit entsprechender Config starten.
2. Gate-Verhalten prüfen.

**Erwartetes Ergebnis:**
- App erkennt unzureichende Stationenzahl.
- Dev-Hinweis erklärt: zu wenige aktive Stationen.
- Produktivverhalten ist nutzerfreundlich.

**Fehlschlag, wenn:**
- Dünne Zeitreise still gerendert wird.
- Nutzer sieht fast leeren Ablauf.

---

## Gruppe L — Regression gegen alte Logik

### TC-L01 — Alte Screen-2-Ergebnisgrafik kehrt nicht zurück

**Typ:** Regression
**Priorität:** Muss

**Schritte:**
1. Screen 2 öffnen.
2. Auf alte Komponenten prüfen.

**Erwartetes Ergebnis:**
- Kein vollständiger Chart.
- Keine finalen KPI-Cards.
- Keine „Heute"-Reveal-Logik auf Screen 2.
- Keine alte Copy, die fertigen Rückblick voraussetzt.

**Fehlschlag, wenn:**
- Screen 2 wieder wie alte Ergebnisgrafik funktioniert.
- Alte KPIs oder Today-Line auftauchen.

---

### TC-L02 — Alte Dokumentannahmen bleiben nicht testleitend

**Typ:** Dokumentations-Regression
**Priorität:** Soll

**Schritte:**
1. Test-/QA-Dokumente prüfen.
2. Prüfen, ob alte Aussagen noch als aktive Testanforderung auftauchen.

**Erwartetes Ergebnis:**
- Testfälle folgen aktuelle `APP_SPEC.md` (V2.5 oder neuer).
- Alte Screen-2-Vollchart-Logik ist nicht mehr testleitend.
- Bekannte Fundstellen wurden in AP-08/AP-08b/AP-08c bereinigt.

**Fehlschlag, wenn:**
- Tests weiterhin vollständigen Chart auf Screen 2 erwarten.
- Widersprüchliche Dokumente die neue Spec übersteuern.

---

## Manuell vs. automatisierbar

### Eher automatisierbar

- JSON-Struktur, Pflichtfelder, Enums (TC-A02)
- Rolling Window — `latestMonth` und `startMonth` (TC-B01, TC-B02)
- Stationenfilter (TC-B03)
- `dynamic_latest_month` (TC-B04)
- Keine finalen KPI-Komponenten auf Screen 2 (TC-D02, TC-E02)
- `prefers-reduced-motion`-Klasse / Motion-Modus (TC-I01)
- Fehlende Quellenstatus im Produktivmodus (TC-A03)
- Stations-JSON nicht ladbar (TC-K01)
- Redaktions-Gate Mindestkrise (TC-K02)

### Eher manuell / visuell

- Dramaturgische Wirkung — falsche Auflösung verrät sich nicht (TC-D04)
- Rote Codierung visuell nicht vorhanden (TC-J01, TC-D05)
- Mobile wirkt nicht überladen (TC-G01)
- Button ist gut erreichbar (TC-G03)
- Screenreader-Erfahrung (TC-H01, TC-H02, TC-H03, TC-H04)
- Tonalität / keine Scham (TC-J02, TC-F02)
- Screen 4 wirkt nicht wie Verkaufsdruck (TC-F02)
- Screen 1 teleportiert dramaturgisch (TC-C02)

---

## Historische Fundstellen (AP-08 bis AP-08c bereinigt)

Diese Stellen waren beim Anlegen von QA_TEST_CASES.md (AP-06) als offene Fundstellen notiert. Sie wurden in AP-08/AP-08b/AP-08c vollständig bereinigt und sind keine aktiven To-dos mehr.

- `SLICE_PLAN.md` — alte Screen-2-Vollchart-Annahmen ✅ bereinigt (AP-08/AP-08c)
- `MINI_SPEC_FROM_HAUPTDOKUMENT.md` — Screen-2-Aussagen widersprechend Zeitreise-Logik ✅ bereinigt (AP-08)
- TC-L02 Dokumentations-Regression ✅ bereinigt (AP-08c)

---

*AP-06 ✅ 2026-06-16, AP-07 ✅ 2026-06-16, AP-08b ✅ 2026-06-16, AP-08c ✅ 2026-06-16 | Nächster Schritt: B1-AP-09 — produktive `stations.de.json` anlegen*
