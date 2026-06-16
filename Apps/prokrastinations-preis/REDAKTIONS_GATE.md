Stand: 2026-06-16 | V1.0 — AP-07 | Erstellt von: Claude

# Redaktions-Gate — prokrastinations-preis

Dieses Dokument legt fest, wann die Stationenbibliothek der App `prokrastinations-preis` publikationsreif ist und wann nicht.

`APP_SPEC.md` definiert UX und Zielzustand. Dieses Gate definiert, ob eine konkrete Stationsauswahl veröffentlicht werden darf. Eine JSON kann strukturell valide sein und das Redaktions-Gate trotzdem nicht bestehen.

---

## Verhältnis zu anderen Dokumenten

- `STATIONS_CONFIG_CONTRACT.md` definiert die JSON-Struktur. Dieses Gate definiert die Publikationsreife.
- `QA_TEST_CASES.md` beschreibt, wie die Bedingungen dieses Gates geprüft werden. Dieses Dokument beschreibt, welche Bedingungen erfüllt sein müssen.
- `ENTSCHEIDUNGSPROTOKOLL.md` hält die dramaturgischen Grundentscheidungen fest (AP-01, 2026-06-16).

---

## Was dieses Gate nicht entscheidet

- welche finalen Quellen konkret verwendet werden,
- ob Business Insider 2018 oder WiWo 2018 ersetzt werden,
- welche finale Impfstoff-Quelle genutzt wird,
- ob die produktive `stations.de.json` schon angelegt wird,
- wie technische Gate-Fehler implementiert werden,
- wie Dev-/Prod-Modus technisch erkannt wird.

Diese Punkte gehören in spätere Arbeitspakete.

---

## Gate-Typen

| Stufe | Name | Konsequenz |
|---|---|---|
| A | Release-blockierend | App darf nicht produktiv veröffentlicht werden. |
| B | Qualitätskritisch | App soll nicht veröffentlicht werden, außer mit dokumentierter bewusster Ausnahme. |
| C | Redaktioneller Hinweis | Kein direkter Release-Blocker; vor späteren Iterationen prüfen. |

---

## Gate A — Release-blockierend

### G-A01 — Aktives Fenster enthält eine echte Krise

Regel:

```text
Im aktiven 120-Monats-Fenster muss mindestens eine sichtbare Station mit
role = "crisis" und priority >= 95 liegen.
```

Begründung: Ohne Krise fehlt der Klimax. Die App wird zur netten Zeitlinie, aber nicht zur Psycho-App gegen Hindsight Bias.

Erwartete aktuelle Erfüllung:

```text
station_2020_03_covid_crash
role: crisis
priority: 100
```

Hinweis: Wenn Corona später aus dem aktiven Fenster fällt, muss eine neue reale Krise in der Stationsbibliothek ergänzt werden. Keine Platzhalter, keine Spekulation.

---

### G-A02 — Sichtbare Stationen müssen publikationsreifen Quellenstatus haben

Regel:

```text
Sichtbare produktive Stationen dürfen nicht sourceStatus = "source_claimed_unchecked" haben.
```

Erlaubt produktiv:

```text
primary_verified
secondary_verified
derived_from_app_data
```

Nicht produktiv erlaubt:

```text
source_claimed_unchecked
```

Begründung: Die App nutzt Quellenlabels als Echtheitsbeweis. Ungeprüfte Quellen würden Vertrauen vortäuschen.

`source_claimed_unchecked` darf in Entwicklung und Entwurf vorkommen, aber nicht im produktiven aktiven Fenster.

---

### G-A03 — Quellenstatus darf nicht lügen

Regel: Eine Quelle darf nur dann `primary_verified` oder `secondary_verified` sein, wenn:
- die URL geprüft ist,
- die Quelle erreichbar ist,
- der Inhalt zur Station passt,
- Datum und Ereignis plausibel übereinstimmen,
- das sichtbare Quellenlabel korrekt ist.

Fehlschlag:
- Startseite statt Artikellink
- Artikel existiert, aber sagt etwas anderes
- Quelle passt nur grob
- Artikel ist hinter Paywall nicht überprüfbar und wird trotzdem als gesichert dargestellt
- Primärstatus ohne Primärquelle

---

### G-A04 — Stationen liegen im aktiven CSV-Fenster

Regel:

```text
startMonth <= station.date <= latestMonth
```

Für normale Stationen. Der finale Reveal ist Sonderfall:

```text
date = "dynamic_latest_month"
```

Begründung: Die App darf keine Ereignisse zeigen, die außerhalb des sichtbaren 120-Monats-Charts liegen.

---

### G-A05 — Finaler Reveal kommt aus der CSV

Regel: Der finale Reveal darf kein hartkodiertes Datum verwenden. Er muss aus dem letzten validierten CSV-Monat erzeugt werden:

```text
latestMonth = letzter valider CSV-Monat
```

Fehlschlag:
- August 2024 oder anderer fixer Endmonat als finaler Reveal
- finale Werte aus JSON statt aus CSV-Berechnung
- finaler Text suggeriert Allzeithoch, obwohl aktueller CSV-Monat das nicht hergibt

---

### G-A06 — Screen 2 verrät das Ende nicht

Regel: Screen 2 darf nicht zeigen:
- vollständigen 120-Monats-Chart,
- finale KPI-Cards,
- finalen Depotwert,
- finalen Gewinn,
- heutigen Endpunkt,
- gestrichelte Zukunftslinie,
- Vorschau auf spätere Stationen.

Begründung: Wenn Screen 2 das Ende verrät, ist der Hindsight-Bias-Beweis zerstört.

---

### G-A07 — Finale KPIs erst auf Screen 3

Regel: Finale KPI-Cards erscheinen erst nach Abschluss der Zeitreise auf Screen 3.

Erlaubt auf Screen 2:
- optionaler Zwischenstand pro Station,
- nur per Collapsible auf Mobile,
- aus Sparplanberechnung abgeleitet.

Nicht erlaubt auf Screen 2:
- finale KPI-Cards,
- Gesamtgewinn bis `latestMonth`,
- finale Rendite.

---

### G-A08 — Keine rote Crash-Codierung

Regel: In der gesamten Zeitreise verboten:
- rote Chart-Linie,
- rotes Crash-Segment,
- rote Verlustzahlen,
- rote Warnicons für Drawdowns,
- farbliche Gut/Schlecht-Codierung,
- Alarmfarben als dramaturgischer Effekt.

Begründung: Die App soll Unsicherheit fühlbar machen, aber ruhig bleiben. Der Chart ist Beweis, nicht Warnschild.

---

### G-A09 — Keine Prognose

Regel: Die App darf keine Zukunftsentwicklung zeigen oder simulieren.

Besonders Screen 4:
- kein Zukunftschart,
- keine fortgeschriebene Linie,
- keine Renditeannahme,
- keine nächsten 10 Jahre als Simulation.

Erlaubt:

```text
Heute beginnt wieder ein Chart, dessen Ende niemand kennt.
```

---

### G-A10 — Keine Scham, keine Fake-Urgency, keine Verkaufssprache

Regel: Texte dürfen nicht:
- beschämen,
- moralisch abwerten,
- Druck erzeugen,
- künstliche Dringlichkeit erzeugen,
- sichere Zukunft suggerieren,
- als Produktempfehlung wirken.

Verbotene Muster:

```text
Wer jetzt nicht handelt, ist selbst schuld.
Nur wer durchhält, wird belohnt.
Jetzt bloß nicht aussteigen.
Die nächste Chance kommt nicht wieder.
```

---

## Gate B — Qualitätskritisch

### G-B01 — Sichtbare Stationenzahl ist ausreichend

Empfohlene Regel:

```text
minVisibleStations: 5
targetVisibleStations: 6
maxVisibleStations: 7
```

Finaler Reveal zählt separat (wie in `STATIONS_CONFIG_CONTRACT.md §4` definiert).

Begründung: Zu wenige Stationen erzeugen keine Reise. Zu viele Stationen erzeugen Krisenchronik.

---

### G-B02 — Pacing ist ausgewogen

Regel: Nicht zu viele Stationen in kurzer Zeit.

Beispiel: Drei Stationen im Jahr 2022 wurden bewusst verworfen, weil sie den Rhythmus brechen.

Guter Bogen:

```text
erste Unruhe → Zermürbung → Klimax → falsche Auflösung → finaler Wackler → Reveal
```

---

### G-B03 — Station muss im Chart sichtbar oder psychologisch relevant sein

Regel: Eine Station soll entweder:
- im Chart sichtbar sein,
- oder psychologisch zentral sein,
- oder eine dramaturgisch notwendige Wendung markieren.

Verworfenes Beispiel: SVB März 2023. Im MSCI-World-Chart zu schwach sichtbar und dramaturgisch nicht stark genug (→ `ENTSCHEIDUNGSPROTOKOLL.md §8`).

---

### G-B04 — Positive Stationen vor dem Reveal sparsam verwenden

Regel: Keine zweite echte Happy-End-Station vor dem finalen Reveal.

Begründung: Die Impfstoff-Station ist als falsche Auflösung erlaubt. Weitere positive Stationen vor Screen 3 nehmen dem Reveal Kraft.

Verworfenes Beispiel: Februar 2024 Erholungs-/Allzeithoch-Station (→ `ENTSCHEIDUNGSPROTOKOLL.md §8`).

---

### G-B05 — Mobile bleibt lesbar

Regel: Auf Mobile:
- keine permanenten Mini-KPIs,
- keine dichten Chart-Labels,
- keine Hover-Abhängigkeit,
- kein Zahlenmüll,
- Zwischenstand nur auf Wunsch.

Wenn Mobile überladen wirkt, ist die Stationenreise nicht abnahmefähig.

---

### G-B06 — Stationstexte bleiben kurz

Empfehlung pro Station sichtbar:
- Datum / Quelle,
- eine Headline,
- maximal zwei kurze Anker-Sätze,
- ein Collapsible,
- ein Primärbutton.

Nicht pro Station:
- langer Nachrichtenabsatz,
- vollständige Quellenzusammenfassung,
- mehrere externe Prozentwerte,
- technische Kapitalmarktanalyse.

---

### G-B07 — Button-Logik bleibt konsistent

Regel:
- Normale Stationen: `Weiter investiert bleiben`
- Finaler Reveal: `Ergebnis ansehen`
- Kein generisches `Weiter`.

Begründung: Der Button ist Micro-Commitment, nicht nur Navigation.

---

## Gate C — Redaktionelle Hinweise

### G-C01 — Beste verfügbare Quelle bevorzugen

Wenn mehrere Quellen möglich sind, Priorität:
1. öffentliche Primärquelle,
2. öffentlich gut zugängliche reputierliche Sekundärquelle,
3. andere Quelle nur mit Begründung.

Bevorzugt: Tagesschau / ARD, öffentlich erreichbare Wirtschaftsmedien, Quellen ohne unnötige Paywall-Hürde.

Nicht bevorzugt: unklare Blogs, Finanzwerbung, Social Media, reine Börsenforen, Quellen ohne Datum.

---

### G-C02 — Quellenlabel kurz halten

Sichtbares Label:

```text
TAGESSCHAU · 9. MÄRZ 2020
```

Vollständige URL nicht im sichtbaren Haupttext:

```text
https://www.tagesschau.de/wirtschaft/corona-wirtschaft-wallstreet-103.html
```

---

### G-C03 — Externe Prozentwerte vermeiden

Wenn Prozentwerte gezeigt werden, sollen sie bevorzugt aus der App-Berechnung kommen. Externe USD-Performancewerte im sichtbaren Text vermeiden, wenn die App mit EUR-Zeitreihe arbeitet.

Erlaubt:

```text
deutlicher Rückgang
starke Erholung
erneuter Rückschlag
```

Oder berechnete Zwischenwerte:

```text
Eingezahlt: {paidInAtStation}
Depotwert damals: {portfolioValueAtStation}
```

---

## Manuell vs. technisch prüfbar

### Technisch gut prüfbar

- JSON Pflichtfelder vorhanden
- Enums gültig
- `app` korrekt (`prokrastinations-preis`)
- `date` gültig (`YYYY-MM` oder `dynamic_latest_month`)
- Stationen im aktiven CSV-Fenster
- `sourceStatus` im Produktivmodus nicht `source_claimed_unchecked`
- Mindestens eine Station mit `role = "crisis"` und `priority >= 95`
- `dynamic_latest_month` vorhanden
- `visualRules.redCrashColor = false`
- `visualRules.lossColoring = false`
- `visualRules.crashSegmentColoring = false`

### Manuell / redaktionell zu prüfen

- Quelle passt wirklich zum Ereignis (nicht nur URL-Struktur)
- Headline ist nicht irreführend
- AnchorText verrät die falsche Auflösung nicht
- Station ist im Chart sichtbar genug
- Dramaturgie wirkt als Reise, nicht als Krisenliste
- Ton erzeugt keine Scham und keine Fake-Urgency
- Screen 4 erzeugt Handlungsfähigkeit statt Druck
- Mobile wirkt nicht überladen

---

## Produktivmodus vs. Dev-Modus

### Produktivmodus

Der Nutzer soll keine technischen Debug-Details sehen. Bei nicht publikationsreifer Stationenbibliothek:
- keine halbfertige Zeitreise zeigen,
- keine ungeprüften Quellen als final zeigen,
- nutzerfreundliche Fehlermeldung,
- keine Stacktraces,
- keine internen IDs.

Beispiel:

```text
Die Zeitreise kann gerade nicht geladen werden.
```

### Dev-Modus

Dev-Modus darf konkrete Hinweise zeigen:

```text
Redaktions-Gate nicht bestanden:
- keine crisis-Station im aktiven Fenster
- station_2020_11_vaccine_relief hat sourceStatus source_claimed_unchecked
```

AP-07 implementiert das nicht, sondern dokumentiert die Regel. Technische Umsetzung folgt in Coding-APs.

---

## Release-Checkliste Stationen-Zeitreise

### Daten / Fenster

- [ ] CSV enthält mindestens 120 valide Monatsdaten.
- [ ] `latestMonth` wird aus CSV bestimmt, nicht aus dem Tagesdatum.
- [ ] Aktive Stationen liegen im Fenster `startMonth` bis `latestMonth`.
- [ ] Finaler Reveal kommt aus `dynamic_latest_month`.

### Stationen / Dramaturgie

- [ ] Mindestens eine sichtbare `crisis`-Station mit `priority >= 95`.
- [ ] Falsche Auflösung ist vorhanden oder bewusst nicht aktiv (mit Begründung).
- [ ] Finaler Wackler ist vorhanden oder bewusst nicht aktiv (mit Begründung).
- [ ] Stationenzahl liegt im Zielkorridor (5–7 plus finaler Reveal).
- [ ] Pacing wirkt nicht wie Krisenchronik.

### Quellen

- [ ] Jede sichtbare Station hat publikationsreifen Quellenstatus.
- [ ] Keine sichtbare Station steht auf `source_claimed_unchecked`.
- [ ] Quellenlabel stimmt mit Quelle und Datum überein.
- [ ] Keine Startseiten-URL als vermeintlicher Artikel.

### UI / Ethik

- [ ] Screen 2 zeigt keinen vollständigen Chart.
- [ ] Screen 2 zeigt keine finalen KPI-Cards.
- [ ] Screen 3 zeigt erstmals vollständigen Chart + KPIs.
- [ ] Screen 4 zeigt keine Prognose.
- [ ] Keine rote Crash-Codierung.
- [ ] Keine Scham, keine Fake-Urgency, keine Verkaufssprache.

### Mobile / A11y

- [ ] Mobile-Zwischenstand ist Collapsible.
- [ ] Keine permanenten Mini-KPIs auf Mobile.
- [ ] Button ist gut erreichbar.
- [ ] Zeitreise ist per Tastatur bedienbar.
- [ ] Reduced Motion entfernt Bewegung, nicht Inhalte.

---

## Offene Punkte für Folge-APs

| AP | Offener Punkt |
|---|---|
| AP-09 | Produktive `stations.de.json` anlegen — finale Quellen pro Station recherchieren und `sourceStatus` setzen |
| Coding-AP | Technische Gate-Prüfung implementieren (Dev-Modus-Fehlerausgabe) |
| Coding-AP | Dev-/Prod-Modus-Erkennung technisch umsetzen |
| Offen | Business Insider 2018 oder WiWo 2018 ersetzen — Quellenentscheidung |
| Offen | Finale Impfstoff-Quelle (November 2020) bestätigen |

*Nächster Schritt: B1-AP-08 — Widersprüchliche Stellen bereinigen (AP-07 ✅ 2026-06-16)*
