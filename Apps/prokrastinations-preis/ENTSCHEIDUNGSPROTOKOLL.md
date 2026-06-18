# Entscheidungsprotokoll — prokrastinations-preis

Stand: 2026-06-18 | Session: AP-14a2 | Geändert von: Claude

Dieses Dokument ist die verbindliche gedankliche Klammer für AP-02 bis AP-08.  
Es hält fest: was entschieden wurde, was verworfen wurde, warum, und welche Konsequenzen folgen.  
Kein Code. Keine Spec-Überarbeitung. Nur Entscheidungen.

---

## 1. Ausgangsproblem

Die App `Apps/prokrastinations-preis` ist technisch korrekt und erreichte Slice 6.  
Die bisherige Umsetzung erfüllt die bestehende Spec — funktioniert aber dramaturgisch nicht.

**Konkretes Problem:**  
Screen 2 zeigt den vollständigen 10-Jahres-Chart zu früh.  
Der Nutzer kennt das Ende sofort. Die psychologische Botschaft wird geschwächt, weil der Nutzer die Vergangenheit mit Rückblickwissen bewertet.

**Symptom:**  
Die App behauptet:
> Wer vor 10 Jahren angefangen hätte, hätte heute mehr Geld.

Das ist korrekt, aber nicht erlebbar. Hindsight Bias wird nicht aufgebrochen — er wird bestätigt.

---

## 2. Ziel der App (unverändert)

Die App bleibt eine Psycho-App gegen Prokrastination und Hindsight Bias.

Der Kernsatz, den sie erlebbar machen soll:
> Die beste Zeit anzulegen war vor 10 Jahren. Die zweitbeste ist heute.

Die App darf diesen Satz nicht nur behaupten. **Sie muss ihn als geführte Zeitreise beweisen.**

Der Unterschied zur alten Umsetzung:

| Alt | Neu |
|---|---|
| Chart wird vollständig gezeigt | Chart wächst Station für Station |
| Nutzer kennt das Ende sofort | Nutzer erlebt die Strecke ohne Endwissen |
| Ergebnis-App | Zeitreise-App |

---

## 3. Grundentscheidung: Stationen-Zeitreise

**Beschlossen.**

Screen 2 nimmt dem Nutzer das Wissen vom Ende weg.  
Screen 3 gibt es ihm zurück.  
Screen 4 überträgt die Erkenntnis auf heute.

Die App gliedert sich in **drei Akte** über **vier Screens**:

| Screen | Neue Funktion | Hauptelement |
|---|---|---|
| 1 — Frage / Teleportation | Nutzer gibt Sparrate ein und springt 10 Jahre zurück | Slider + Teleportationsbutton |
| 2 — Zeitreise | Nutzer erlebt die Strecke ohne Endwissen | wachsender Chart + Stationstexte |
| 3 — Rückblick / Reveal | Erstmals erscheint der vollständige Chart | kompletter Chart + KPI-Cards + finaler Datenpunkt |
| 4 — Entscheidung | Transfer auf heute | Microcopy + CTA, keine Prognosekurve |

**Harte Grenzen aus dieser Struktur:**

- Screen 2 zeigt **nicht** den vollständigen Chart.
- Screen 3 zeigt **erstmals** den vollständigen Chart und die finalen KPIs.
- Screen 4 ist kein weiterer Ergebnis-Screen, sondern der Transfer auf die heutige Entscheidung.
- Finale KPI-Cards erscheinen **erst nach Abschluss der Zeitreise** auf Screen 3.

---

## 4. Zwei Datenschichten

Die App verwendet zwei getrennte Datenquellen:

| Datensorte | Format | Zweck |
|---|---|---|
| MSCI-World-Monatsdaten | CSV | bestehende Zeitreihe, Sparplanberechnung |
| Stationenbibliothek | JSON | redaktionelle Haltepunkte der Zeitreise |

**CSV bleibt CSV.**  
Stationen werden nicht in `app.js` hardcodiert, sondern aus einer separaten JSON-Datei geladen.

Vorgesehener Pfad:
```
Apps/prokrastinations-preis/config/stations.de.json
```

**Redaktionelle Kontrolle:**  
Claude darf die redaktionellen Stationen nicht eigenmächtig erfinden, erweitern oder umpriorisieren.  
Claude lädt die freigegebene JSON-Konfiguration, validiert und rendert sie.

---

## 5. Rollierendes Fenster aus `latestMonth`

**Beschlossen: Rolling Window, kein fester Zeitraum.**

- Umfang: 120 Monatsdatenpunkte aus der validierten MSCI-CSV.
- Endpunkt: `latestMonth` — letzter verfügbarer CSV-Monat.
- Startpunkt: `latestMonth − 119 Monate`.
- Stationen werden nur angezeigt, wenn ihr `date` innerhalb dieses Fensters liegt.
- Der finale Reveal kommt dynamisch aus der CSV: `dynamic_latest_month`.

**Nicht das Tagesdatum**, sondern die verfügbare und validierte CSV-Datenreihe bestimmt den Chart.

---

## 6. Finale Stationsliste v2.1

Aktuell beschlossen für den Launch-Kontext:

| Datum | Ereignis | Dramaturgische Funktion |
|---|---|---|
| Februar 2018 | Die ruhigen Börsenjahre enden abrupt | Erster Einbruch |
| Dezember 2018 | Das Jahr endet tief im Minus | Zermürbung / Zweifel |
| März 2020 | Corona-Crash | Klimax |
| November 2020 | Impfstoff-Erleichterung | **Falsche Auflösung** |
| Februar 2022 | Krieg in Europa | Finaler Wackler beginnt |
| April 2025 | Zoll-Schock | `late_wobble` — letzter Wackler |
| dynamisch | Letzter CSV-Monat | Finaler Reveal |

Diese Liste ist redaktionell weiter zu prüfen. Die dramaturgische Struktur ist entschieden.

---

## 7. Wichtige Detailentscheidungen

### 7a. Falsche Auflösung bleibt erhalten

Die Impfstoff-Erleichterung im November 2020 bleibt als bewusste falsche Auflösung erhalten.

**Zweck:**  
Der Nutzer soll kurz glauben, dass die Reise geschafft ist. Danach kommt mit 2022 noch ein erneuter Test. Das ist dramaturgisch gewollt.

**Umsetzung:**
- `flags.falseResolution = true`
- Kein Hinweis im UI, dass später noch eine weitere Krise kommt.
- Der Ankertext darf die spätere Wendung nicht vorwegnehmen.

### 7b. 2022 wird gebündelt

Der 2022-Block wird nicht in Ukraine, Zinswende und Bärenmarkt-Tief zerlegt.

**Beschluss:**  
Eine Station. Gewählt: **Februar 2022 — Russland greift die Ukraine an.**

**Begründung:**
- Konkretes Datum, klarer Nachrichtenanker.
- Dramaturgisch ausreichend.
- Verhindert Krisenchronik.
- Zinswende, Inflation und Lieferketten können im Ankertext mitschwingen.

### 7c. April 2025 als letzter Wackler

Die Trump-Zoll-Station im April 2025 wird als `late_wobble` übernommen.

**Funktion:**  
Kurz vor dem Ende kommt noch einmal Unsicherheit zurück. Der finale Reveal wird stärker, weil die Zeitreise nicht nach 2022 einfach ausläuft.

### 7d. Keine rote Crash-Codierung

**Ausdrücklich verboten:**

- Rote Chart-Linie
- Rotes Segment für Crashphasen
- Rote Verlustzahlen
- Alarmfarben für Drawdowns
- Visuelle Panikcodierung

**Begründung:**  
Die App soll Unsicherheit fühlbar machen, aber ruhig bleiben. Der Chart ist Beweis, nicht Warnschild.

### 7e. Mobile-Zwischenstand als Collapsible

Depotwerte je Station werden auf Mobile nicht permanent sichtbar angezeigt.

**Beschluss:**  
Unter dem Stationstext gibt es einen kleinen aufklappbaren Link:
```
Zwischenstand anzeigen
```
Nach Tap:
```
Eingezahlt: 18.000 €
Depotwert damals: 14.600 €
```

**Regeln:**
- Die konkreten Werte werden aus der Sparplanberechnung abgeleitet, nicht redaktionell in der JSON gepflegt.
- Finale KPI-Cards erscheinen erst nach Abschluss der Zeitreise auf Screen 3.

### 7f. Keine Prognose auf Screen 4

Screen 4 zeigt **keine** Zukunftsprognose und **keine** fortgeschriebene Linie.

Screen 4 leistet nur den Transfer:
> Heute beginnt wieder ein Chart, dessen Ende niemand kennt.

Keine Zukunftsdaten, keine Simulation, keine Renditeannahme.

---

## 8. Verworfene Alternativen

### Fester Zeitraum 2015–2024

**Verworfen.**  
Die App soll rollierend mit der gepflegten CSV arbeiten. Ein fester Zeitraum würde der vorhandenen Datenlogik widersprechen und die App künstlich altern lassen.

### Brexit als aktive Station

**Verworfen für das aktive Launch-Fenster.**  
Brexit liegt im Juni 2016. Wenn das aktive Fenster ab Launch ungefähr ab August 2016 beginnt, liegt Brexit außerhalb des sichtbaren 120-Monats-Fensters.  
Brexit kann in der Stationsbibliothek als historischer Kandidat bleiben — wird aber nur angezeigt, wenn er im aktiven Fenster liegt.

### Drei 2022-Stationen

**Verworfen.**  
Ukraine, Zinswende und Bärenmarkt-Tief als drei Stationen in kurzer Zeit würden das Pacing zerstören. Die App würde zur Krisenchronik.

### SVB / Bankenstress 2023

**Verworfen.**  
Im Chart zu schwach sichtbar. Eine Station, die sich visuell kaum zeigt, schwächt die Glaubwürdigkeit der Zeitreise.

### Erholungsstation Februar 2024

**Verworfen.**  
Eine zusätzliche positive Station vor dem finalen Reveal nimmt der Auflösung Kraft. Es soll keine zweite Happy-End-Station vor dem Happy End geben.

### USD-Performancewerte im sichtbaren Text

**Verworfen.**  
Die App rechnet mit einer EUR-Zeitreihe. Sichtbare USD-Prozentwerte wären fachlich unsauber und würden eine zweite Datenlogik öffnen.  
Erlaubt sind nur: aus der App-Berechnung abgeleitete EUR-Werte und redaktionell vorsichtige Beschreibungen.

### Ungeprüfte Quellen als final markiert

**Verworfen.**  
Quellenstatus muss ehrlich sein. Eine Quelle darf nur als `primary_verified` oder `secondary_verified` geführt werden, wenn der Link geprüft ist und der Inhalt passt.

---

## 9. Quellenstatus-Schema

Für die Stations-JSON gelten folgende Quellenstatus-Werte:

| Wert | Bedeutung |
|---|---|
| `primary_verified` | Primärquelle geprüft, direkt erreichbar, Inhalt passt |
| `secondary_verified` | Sekundärquelle geprüft, direkt erreichbar, Inhalt passt |
| `source_claimed_unchecked` | Quelle behauptet oder plausibel, aber noch nicht final geprüft |
| `derived_from_app_data` | aus CSV/App-Daten abgeleitet |

Produktiv sichtbare Stationen dürfen nicht dauerhaft auf `source_claimed_unchecked` stehen.

---

## 10. Redaktions-Gate

Vor Veröffentlichung muss geprüft werden:

- [ ] Das aktive Fenster enthält mindestens eine Station mit `role: "crisis"` und `priority >= 95`.
- [ ] Sichtbare Stationen liegen im aktiven CSV-Fenster.
- [ ] Jede sichtbare Station hat einen publikationsreifen Quellenstatus.
- [ ] Keine rote Crash-Codierung vorhanden.
- [ ] Finale KPI-Cards erscheinen erst nach der Zeitreise (Screen 3).
- [ ] Mobile-Zwischenstände sind aufklappbar, nicht permanent sichtbar.
- [ ] `dynamic_latest_month` wird aus der validierten CSV erzeugt.

Wenn diese Bedingungen nicht erfüllt sind, ist die App redaktionell nicht publikationsreif.

---

## 11. Konsequenzen für AP-02 bis AP-08

| AP | Aufgabe | Kern-Änderung durch dieses Protokoll |
|---|---|---|
| AP-02 | APP_SPEC.md konzeptionell umbauen | Screen-Tabelle und UX-Flow auf Zeitreise-Logik umstellen |
| AP-03 | Datenvertrag für Stations-JSON | Felder, Enums, Flags, Quellenstatus, Validierungsregeln |
| AP-04 | UX-/Heldenreise-Abschnitt | Hindsight Bias, falsche Auflösung, late_wobble, dynamischer Reveal |
| AP-05 | A11y- und Mobile-Regeln | Collapsible-Zwischenstand, Fokusführung, Reduced Motion, Button-Labels |
| AP-06 | Testfälle aktualisieren | Stations-JSON lädt, Fensterfilter, Reveal aus CSV, kein Rot, Collapsible, kein KPI vor S3 |
| AP-07 | Redaktions-Gate dokumentieren | Quellenstatus, Mindestkrise, Produktivfähigkeit, sichtbare Stationen |
| AP-08 | Widersprüchliche Stellen bereinigen | Alle Stellen, die behaupten Screen 2 zeige vollständigen Chart mit KPIs |

---

## 12. AP-14b — Progressive Domain LineChart

Beschlossen 2026-06-18 (B1-AP-14a2).

### Grundentscheidung

Der Chart-Umbau für Screen 2 ist kein App-Hack. Er führt einen offiziellen Achsenvertrag in der Chart-Engine ein.

**Leitsatz:**
> X zeigt den Zeithorizont. Linie zeigt den Wissensstand. Y zeigt den bisher bekannten Werteraum.

**Produkt-Leitsatz:**
> Zeit bleibt stabil. Wissen wächst. Der bekannte Werteraum wächst.

### Achsenvertrag: dataRange vs. displayRange

| Konzept | Bedeutung |
|---|---|
| `dataRange` | Tatsächlicher sichtbarer Datenbereich — endet in Screen 2 beim aktuellen Stationsmonat. Grundlage für sichtbare Linie, Tooltips, A11y und Y-Skalierung. |
| `displayRange` | Intendierte Anzeige-Domain der X-Achse — umfasst das vollständige 10-Jahres-Fenster. Grundlage für X-Scale, X-Ticks und `durationYears`. |

`displayRange` wird im `fwContext` optional ergänzt. Standard-LineCharts ohne `xDisplayRange` bleiben unverändert.

### Öffentlicher API-Vertrag (Zielbild)

```js
chartEngine.renderFromData(container, visibleSeries, {
  type: 'line',
  features: { rangeControls: false, headline: false },
  xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth },
  yRangePolicy: 'cumulative-expand-zero'
});
```

`xDisplayRange` ist Top-Level-Optionsfeld — nicht `features.xDisplayMax`, nicht nur `max`.

### Y-Achsen-Vertrag

`yRangePolicy: 'cumulative-expand-zero'`:
- `yMin` immer `0`
- `yMax` basiert ausschließlich auf dem bisher bekannten Datenpfad
- `yMax` darf nur gleich bleiben oder nach oben expandieren — nie schrumpfen
- Kein finaler Maximalwert vor Screen 3
- Y-Achsen-Gedächtnis wird zurückgesetzt bei: Neustart der Zeitreise, Änderung der Sparrate

### Verbotene Implementierungen

Ausdrücklich nicht zulässig:

- `Chart.getChart()`-Post-Render-Hack
- nachträgliches `options.scales.x.max`
- `chart.update('none')` als Achsenfix
- `setTimeout`-/`requestAnimationFrame`-Kaschierung
- Fake-Daten bis `latestMonth`
- Dummy-Dataset für leeren Zukunftsbereich
- transparente Zukunftslinie
- neuer Chart-Typ nur für diese App
- globale Chart.js-Hacks
- Endwissens-Leak in Screen 2
- Y-Achse auf finalen Maximalwert vorab setzen
- Y-Achse während Screen 2 schrumpfen lassen

---

## 13. AP-14c — Event-Marker-Zielbild

Beschlossen 2026-06-18 (B1-AP-14a2). Implementierung folgt nach AP-14b.

### Datenquelle: Journey-Stations, keine events.json

Für diese App wird keine neue `events.json` eingeführt.

- `stations.de.json` bzw. die bestehenden Journey-Stations bleiben die redaktionelle Quelle
- Event-Marker werden aus den Journey-Stations abgeleitet
- `final_reveal` wird ausgeschlossen
- Die aktuelle Station wird nicht markiert
- Zukunftsstationen werden nicht markiert
- Sichtbar sind nur vergangene Stationen: bei Station n sind Marker für Stationen 1 bis n−1 sichtbar

**Begründung:** Die Marker sind in dieser App keine generischen Zusatzereignisse. Sie sind sedimentierte Stationen der Zeitreise. Eine separate `events.json` würde nur Synchronisationsrisiko erzeugen.

### Marker-Y: Snapshot-Snap

```
Eventdatum → Snapshot-Snap analog zur Hauptserie → Lookup des passenden Monatsdatenpunkts → markerY aus Hauptserie
```

Nicht erlaubt:
- lineare Interpolation als Default
- linker Floor-Snap als Default
- geschätzte Zwischenwerte
- künstliche Datenpunkte

### Marker-Visual

- offener Ring
- nicht rot
- keine gefüllten dicken Punkte
- keine Labels, Tooltips, Legende
- keine Klick-/Tap-Funktion
- keine Interaktion

### Pulse (Zielbild für spätere Implementierung)

- Pulse ist ephemerer Runtime-State
- Pulse gehört nicht in `stations.de.json`
- Pulse gehört nicht dauerhaft in `fwContext`
- Implementierung folgt außerhalb des Domain-State
