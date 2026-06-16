Stand: 2026-06-16 | Geändert von: Claude | Session: AP-03 / AP-07

# Stations-JSON-Datenvertrag — prokrastinations-preis

---

## 1. Zweck der Stationsbibliothek

Die Stationsbibliothek beschreibt redaktionelle Haltepunkte für Screen 2 der App.

Sie beantwortet:
- An welchen historischen Punkten hält die Zeitreise an?
- Welche Headline wird gezeigt?
- Welcher Anleger-Anker wird gezeigt?
- Welche Quelle stützt den redaktionellen Kontext?
- Welche Station ist Klimax, falsche Auflösung oder finaler Wackler?

Die Stationsbibliothek ist kein Performance-Datensatz und keine zweite Marktdatenquelle.

---

## 2. Geplanter Dateipfad

Vorgesehener produktiver Pfad:

```text
Apps/prokrastinations-preis/config/stations.de.json
```

AP-03 legt diese JSON-Datei noch nicht produktiv an. AP-03 definiert nur den Vertrag.

---

## 3. Top-Level-Struktur

```json
{
  "version": "2.1",
  "locale": "de-DE",
  "app": "prokrastinations-preis",
  "selectionPolicy": {},
  "visualRules": {},
  "motionRules": {},
  "stations": []
}
```

---

## 4. Top-Level-Felder

### `version`

Typ: String | Pflicht: ja

```json
"version": "2.1"
```

Redaktionelle Vertrags-/Config-Version. Keine Dateiversionierung im Dateinamen.

---

### `locale`

Typ: String | Pflicht: ja | Erlaubter Wert in V1:

```json
"locale": "de-DE"
```

---

### `app`

Typ: String | Pflicht: ja | Erlaubter Wert:

```json
"app": "prokrastinations-preis"
```

Wenn `app` nicht passt, muss die Config als ungültig gelten.

---

### `selectionPolicy`

Typ: Object | Pflicht: ja

Beschreibt, wie aktive Stationen aus der Bibliothek ausgewählt werden.

```json
"selectionPolicy": {
  "window": "rolling_120_months_from_latest_csv_month",
  "minVisibleStations": 5,
  "targetVisibleStations": 6,
  "maxVisibleStations": 7,
  "includeFinalReveal": true,
  "sort": "date_asc",
  "selection": "highest_priority_within_window",
  "editorialGate": {
    "requiresCrisis": true,
    "crisisRole": "crisis",
    "minCrisisPriority": 95
  }
}
```

---

### `visualRules`

Typ: Object | Pflicht: ja

```json
"visualRules": {
  "redCrashColor": false,
  "lossColoring": false,
  "crashSegmentColoring": false,
  "futurePreview": false,
  "stationValueMobile": "collapsible",
  "stationValueDesktop": "hover_or_focus_optional"
}
```

**Pflichtregeln:**
- `redCrashColor` muss `false` sein.
- `lossColoring` muss `false` sein.
- `crashSegmentColoring` muss `false` sein.
- `futurePreview` muss `false` sein.
- `stationValueMobile` muss `"collapsible"` sein.

Wenn diese Werte in der JSON anders gesetzt sind, ist die Config ungültig. Kein stiller Override, kein Fallback auf sichere Defaults. Die App zeigt Config-Error. Technische Fehlerbehandlung folgt in Coding-AP.

---

### `motionRules`

Typ: Object | Pflicht: ja

```json
"motionRules": {
  "mode": "user_stepped",
  "betweenStations": "short_draw_animation",
  "forcedWaitBeforeContinue": false,
  "reducedMotion": "instant_step"
}
```

**Pflichtregeln:**
- Kein langes passives Autoplay.
- Nutzer löst den Schritt zur nächsten Station aus.
- Keine erzwungene Wartezeit.
- Reduced Motion zeigt den nächsten Zustand sofort.

---

### `stations`

Typ: Array | Pflicht: ja | Mindestlänge im Dokument: 1

Produktiv sichtbar nach Filter: abhängig vom Redaktions-Gate.

Enthält redaktionelle Stationen und optional ein Template für den finalen Reveal.

---

## 5. Station-Objekt

```json
{
  "id": "station_2020_03_covid_crash",
  "date": "2020-03",
  "priority": 100,
  "status": "core",
  "role": "crisis",
  "headline": "Börsenhandel an der Wall Street ausgesetzt",
  "sourceLabel": "TAGESSCHAU · 9. MÄRZ 2020",
  "sourceUrl": "https://www.tagesschau.de/wirtschaft/corona-wirtschaft-wallstreet-103.html",
  "sourceStatus": "primary_verified",
  "anchorText": "In der fertigen Rückblick-Grafik ist das später nur ein Knick. Heute fühlt es sich an wie ein freier Fall.",
  "continueLabel": "Weiter investiert bleiben",
  "mobileIntermediate": {
    "label": "Zwischenstand anzeigen",
    "fields": ["paidIn", "portfolioValueAtStation"]
  },
  "flags": {
    "falseResolution": false,
    "finalWobble": false,
    "noRedColor": true
  }
}
```

---

## 6. Pflichtfelder pro Station

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | String | ja | eindeutige technische ID |
| `date` | String | ja | `YYYY-MM` oder Sonderwert `dynamic_latest_month` |
| `priority` | Number | ja | redaktionelle Priorität 1–999 |
| `status` | String | ja | redaktioneller Status |
| `role` | String | ja | dramaturgische Rolle |
| `headline` | String | ja | kurze sichtbare Headline |
| `sourceLabel` | String | ja | sichtbares Quellenlabel oder Datenquelle |
| `sourceUrl` | String | ja | URL oder leerer String bei derived/final |
| `sourceStatus` | String | ja | Quellenstatus-Enum |
| `anchorText` | String | ja | Anleger-Anker in Alltagssprache |
| `continueLabel` | String | ja | Button-Text |
| `mobileIntermediate` | Object | ja | mobile Zwischenstand-Regel |
| `flags` | Object | ja | dramaturgische/visuelle Flags |

---

## 7. Feldregeln pro Station

### `id`

Muss eindeutig sein. Empfohlenes Format:

```text
station_YYYY_MM_slug
```

Beispiele:
```text
station_2020_03_covid_crash
station_2025_04_tariff_shock
station_final_latest_month
```

---

### `date`

Erlaubt:
```text
YYYY-MM
dynamic_latest_month
```

Regeln:
- Normale Stationen müssen `YYYY-MM` verwenden.
- `dynamic_latest_month` ist nur für den finalen Reveal erlaubt.
- Normale Stationen werden nur angezeigt, wenn `date` zwischen `startMonth` und `latestMonth` liegt.
- `dynamic_latest_month` wird aus der CSV erzeugt und nicht als historisches Datum interpretiert.

---

### `priority`

Typ: Number | Empfohlene Skala: 1–100 | Sonderfall finaler Reveal: 999

| Bereich | Bedeutung |
|---|---|
| 95–100 | Klimax / strukturell zentrale Krise |
| 80–94 | Kernstation |
| 60–79 | unterstützende Station |
| 1–59 | optional / Archivkandidat |
| 999 | finaler Reveal |

---

### `status`

Erlaubte Werte:
```text
core
supporting
optional
archival
final
```

| Wert | Bedeutung |
|---|---|
| `core` | soll im aktiven Fenster bevorzugt angezeigt werden |
| `supporting` | kann angezeigt werden, wenn Platz im Stationenbogen ist |
| `optional` | Reserve |
| `archival` | bleibt in Bibliothek, wird meist nicht angezeigt |
| `final` | dynamischer Reveal |

---

### `role`

Erlaubte Werte:
```text
shock
doubt
crisis
relief
geopolitical_shock
late_wobble
final_reveal
```

| Wert | Bedeutung |
|---|---|
| `shock` | erster Bruch der Normalität |
| `doubt` | längere Zermürbung / Geduldsprüfung |
| `crisis` | Klimax der Zeitreise |
| `relief` | Erholung / falsche Auflösung |
| `geopolitical_shock` | externer politischer Schock |
| `late_wobble` | letzter Wackler vor dem Reveal |
| `final_reveal` | dynamische Schlussstation |

Für spätere Erweiterungen: neue Rollen nur nach Spec-Änderung ergänzen.

---

### `headline`

Sichtbarer kurzer Text.

Regeln:
- Maximal ca. 70 Zeichen.
- Klare Alltagssprache.
- Keine langen Zitate.
- Keine alarmistische Übertreibung.
- Keine Prognose.
- Keine Clickbait-Formulierung.

---

### `sourceLabel`

Sichtbares Quellenlabel. Format:

```text
QUELLE · DATUM
```

Beispiele:
```text
TAGESSCHAU · 9. MÄRZ 2020
WIRTSCHAFTSWOCHE · 31. DEZEMBER 2018
MSCI-Datenreihe
```

---

### `sourceUrl`

String.

Regeln:
- Vollständige URL, wenn eine externe Quelle verwendet wird.
- Leerer String erlaubt bei `sourceStatus = derived_from_app_data`.
- Keine URL-Validierung gegen die CSV-Domain-Regel. Stationsquellen sind redaktionelle Links, keine Marktdatenquelle.
- Externe Links dürfen nicht zur Datenberechnung verwendet werden.

---

### `sourceStatus`

Erlaubte Werte:
```text
primary_verified
secondary_verified
source_claimed_unchecked
derived_from_app_data
```

| Wert | Bedeutung |
|---|---|
| `primary_verified` | Primärquelle geprüft, direkt erreichbar, Inhalt passt |
| `secondary_verified` | Sekundärquelle geprüft, direkt erreichbar, Inhalt passt |
| `source_claimed_unchecked` | Quelle behauptet/plausibel, aber noch nicht final geprüft |
| `derived_from_app_data` | aus CSV/App-Daten abgeleitet |

Produktiv sichtbare Stationen dürfen nicht dauerhaft `source_claimed_unchecked` sein.

---

### `anchorText`

Der Anleger-Anker versetzt den Nutzer in die damalige Unsicherheit.

Regeln:
- Alltagssprache.
- Kein Fachjargon.
- Keine Schamformeln.
- Keine Fake-Urgency.
- Keine Zukunftsvorschau.
- Keine Formulierung, die den späteren Ausgang verrät, außer beim finalen Reveal.

Gute Muster:
```text
In der fertigen Rückblick-Grafik ist das später nur ein Knick. Heute fühlt es sich an wie ein freier Fall.
```
```text
Ein ganzes Jahr Sparplan. Ein ganzes Jahr minus. Der Sparplan läuft weiter — aber die Belohnung ist nicht zu sehen.
```

Verbotene Muster:
```text
Wer jetzt verkauft, ist selbst schuld.
Nur wer jetzt durchhält, wird reich.
Danach wird alles wieder gut.
```

---

### `continueLabel`

Button-Text.

Standardwert für normale Stationen:
```text
Weiter investiert bleiben
```

Finaler Reveal:
```text
Ergebnis ansehen
```

Der Label-Wechsel beim finalen Reveal ist bewusst. Er signalisiert: Jetzt kommt ein anderer Zustand.

---

### `mobileIntermediate`

Pflichtobjekt. Standard:

```json
"mobileIntermediate": {
  "label": "Zwischenstand anzeigen",
  "fields": ["paidIn", "portfolioValueAtStation"]
}
```

Regeln:
- Werte werden berechnet, nicht in der JSON gespeichert.
- Auf Mobile werden Werte nicht permanent angezeigt.
- `fields` darf nur erlaubte berechnete Feldnamen enthalten.

Erlaubte `fields` in V1:
```text
paidIn
portfolioValueAtStation
```

---

### `flags`

Pflichtobjekt. Standard:

```json
"flags": {
  "falseResolution": false,
  "finalWobble": false,
  "noRedColor": true
}
```

**`falseResolution`**

Typ: Boolean. Nur eine Station im aktiven Bogen sollte `true` haben. Aktuell: Impfstoff-Erleichterung November 2020.

Wenn `falseResolution = true`, darf der Ankertext nicht ankündigen, dass später noch ein Rückschlag kommt.

**`finalWobble`**

Typ: Boolean. Markiert späte Unsicherheitsstationen nach der falschen Auflösung.

Beispiele: Ukraine / 2022, Zoll-Schock / 2025.

**`noRedColor`**

Typ: Boolean | Pflichtwert: `true`

Wenn eine Station `noRedColor: false` setzt, ist die Config ungültig. Kein stiller Override, kein Ignorieren. Vertraglich gilt: rote Codierung ist verboten — ohne Ausnahme.

---

## 8. Finaler Reveal

Der finale Reveal ist kein normales historisches Nachrichtenereignis.

Er kann als Template in der JSON stehen:

```json
{
  "id": "station_final_latest_month",
  "date": "dynamic_latest_month",
  "priority": 999,
  "status": "final",
  "role": "final_reveal",
  "headline": "Jetzt kennst du das Ende",
  "sourceLabel": "MSCI-Datenreihe",
  "sourceUrl": "",
  "sourceStatus": "derived_from_app_data",
  "anchorText": "Die Strecke sieht im Rückblick einfacher aus, weil du sie jetzt vollständig siehst. Vor 10 Jahren kannte sie niemand.",
  "continueLabel": "Ergebnis ansehen",
  "mobileIntermediate": {
    "label": "Zwischenstand anzeigen",
    "fields": ["paidIn", "portfolioValueAtStation"]
  },
  "flags": {
    "falseResolution": false,
    "finalWobble": false,
    "noRedColor": true
  }
}
```

Regeln:
- Das tatsächliche Datum kommt aus `latestMonth` der CSV.
- Der finale Depotwert kommt aus der Sparplanberechnung.
- Finaler Reveal wird immer nach den historischen Stationen gezeigt.
- Finale KPI-Cards erscheinen erst nach Abschluss dieses Reveals auf Screen 3.

---

## 9. Fensterfilter

Das aktive Fenster wird ausschließlich aus der CSV bestimmt:

```text
latestMonth = letzter valider CSV-Monat
startMonth  = latestMonth − 119 Monate
```

Filterregel:
```text
startMonth <= station.date <= latestMonth
```

Nicht angezeigt werden:
- Stationen vor `startMonth`
- Stationen nach `latestMonth`
- Stationen mit ungültigem Datum
- Stationen mit `sourceStatus = source_claimed_unchecked` im Produktivmodus
- Stationen, die gegen Visual- oder Pflichtregeln verstoßen

Der finale Reveal wird gesondert aus `dynamic_latest_month` erzeugt.

---

## 10. Sortierung und Auswahl

Nach Filterung:
1. Stationen nach `date` aufsteigend sortieren.
2. Wenn mehr als `maxVisibleStations` im Fenster liegen:
   - Stationen mit höchster Priorität behalten
   - dramaturgische Reihenfolge nach Datum wiederherstellen
   - `crisis`-Station bevorzugen
   - `falseResolution`-Station bevorzugen
   - `late_wobble`-Station am Ende bevorzugen
3. Finaler Reveal wird zusätzlich angehängt.

Die Auswahl darf die Zeitlogik nicht brechen. Am Ende muss die sichtbare Reihenfolge immer chronologisch sein.

---

## 11. Redaktions-Gate

Vor Veröffentlichung muss gelten:

- [ ] Mindestens eine sichtbare Station hat `role = "crisis"` und `priority >= 95`.
- [ ] Sichtbare Stationen haben keinen `sourceStatus = "source_claimed_unchecked"`.
- [ ] Alle sichtbaren Stationen liegen im aktiven CSV-Fenster.
- [ ] Es gibt genau einen finalen Reveal.
- [ ] Keine Station erlaubt rote Codierung.
- [ ] `visualRules.redCrashColor = false`.
- [ ] `visualRules.lossColoring = false`.
- [ ] `visualRules.crashSegmentColoring = false`.
- [ ] Mobile-Zwischenstand ist `collapsible`.
- [ ] Finale KPIs erscheinen erst nach der Zeitreise.

Wenn das Redaktions-Gate nicht bestanden ist, ist die App nicht publikationsreif.

Vollständige Ausarbeitung: `REDAKTIONS_GATE.md` (→ AP-07). `STATIONS_CONFIG_CONTRACT.md` definiert die JSON-Struktur; `REDAKTIONS_GATE.md` definiert die Publikationsreife.

---

## 12. Fehler- und Empty-State-Konzept

AP-03 baut keine Implementierung, benennt aber die Fehlerfälle:

| Fehler | Erwartetes Verhalten |
|---|---|
| JSON nicht ladbar | nutzerfreundlicher Error-State |
| JSON parsebar, aber `app` falsch | Config-Error |
| Pflichtfeld fehlt | Config-Error |
| Stationenarray leer | Config-Error oder Empty-State |
| keine `crisis` im aktiven Fenster | Redaktions-Gate nicht bestanden |
| sichtbare Station mit ungeprüfter Quelle | Redaktions-Gate nicht bestanden |
| `dynamic_latest_month` fehlt | Config-Error — kein synthetischer Default; App zeigt Error-State |
| rote Visualregel auf `true` | Config ungültig — kein stiller Override; App zeigt Config-Error |

Die genaue technische Fehlerbehandlung folgt in Coding-APs.

---

## 13. Beispiel: gültiger Ausschnitt

```json
{
  "id": "station_2020_03_covid_crash",
  "date": "2020-03",
  "priority": 100,
  "status": "core",
  "role": "crisis",
  "headline": "Börsenhandel an der Wall Street ausgesetzt",
  "sourceLabel": "TAGESSCHAU · 9. MÄRZ 2020",
  "sourceUrl": "https://www.tagesschau.de/wirtschaft/corona-wirtschaft-wallstreet-103.html",
  "sourceStatus": "primary_verified",
  "anchorText": "In der fertigen Rückblick-Grafik ist das später nur ein Knick. Heute fühlt es sich an wie ein freier Fall.",
  "continueLabel": "Weiter investiert bleiben",
  "mobileIntermediate": {
    "label": "Zwischenstand anzeigen",
    "fields": ["paidIn", "portfolioValueAtStation"]
  },
  "flags": {
    "falseResolution": false,
    "finalWobble": false,
    "noRedColor": true
  }
}
```

---

## 14. Offene Punkte für Folge-APs

| AP | Offener Punkt |
|---|---|
| AP-09 | Produktive `stations.de.json` anlegen (redaktionelle Stationsliste befüllen) |
| AP-11 | Stations-JSON-Loader implementieren (fetch, validieren gegen diesen Vertrag) |
| AP-12 | Fensterfilter und Auswahllogik implementieren |
| Coding-AP | Technische Fehlerbehandlung bei Config-Error und Empty-State implementieren |
