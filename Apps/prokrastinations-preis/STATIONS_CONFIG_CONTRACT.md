Stand: 2026-06-24 | Geändert von: ChatGPT | Zweck: schlanker Event-Pin-Vertrag mit rückwärtskompatiblem Feldschema

# Stations-JSON-Datenvertrag — prokrastinations-preis

## 1. Zweck

`Apps/prokrastinations-preis/config/stations.de.json` enthält belegte historische Event-Pins für Screen 2 der Prokrastinationspreis-App.

Ein Event-Pin markiert einen historischen Markt- und Anleger-Moment entlang einer Finanzzeitreihe. Die App zeigt keine allgemeine Weltchronik, sondern Momente, in denen normale Anleger emotional herausgefordert waren: Furcht, Zweifel, Panik, Erleichterung, Euphorie, Gier oder FOMO.

Die Stationsbibliothek ist kein Performance-Datensatz und keine zweite Marktdatenquelle. Externe Quellen werden nie zur Rendite- oder Chartberechnung verwendet.

`sourceUrl` bleibt als redaktioneller Prüfanker in der JSON, wird aber in der App nicht sichtbar gerendert.

## 2. Produktiver Dateipfad

```text
Apps/prokrastinations-preis/config/stations.de.json
```

## 3. Kompatibilitätsentscheidung

Das bestehende Feldschema bleibt erhalten, damit `LineChartStrategy`, Loader und bestehende Screen-2-Logik möglichst wenig brechen.

Nicht eingeführt werden neue öffentliche Felder wie `medium`, `summary`, `eventDate` oder `publishedDate`. Ihre Funktionen werden von bestehenden Feldern übernommen:

| Gewünschte Information | Bestehendes JSON-Feld |
|---|---|
| Medium + sichtbares Datum | `sourceLabel` |
| tagesgenauer Zeitpunkt für Chart und Quelle | `date` |
| 1:1-Medienheadline | `headline` |
| KI-Satz: „Was geht ab?“ | `anchorText` |
| interner Prüfanker | `sourceUrl` |

## 4. Top-Level-Struktur

```json
{
  "version": "2.2",
  "locale": "de-DE",
  "app": "prokrastinations-preis",
  "selectionPolicy": {},
  "visualRules": {},
  "motionRules": {},
  "stations": []
}
```

### `version`

Typ: String | Pflicht: ja

```json
"version": "2.2"
```

### `locale`

Typ: String | Pflicht: ja | Erlaubter Wert:

```json
"locale": "de-DE"
```

### `app`

Typ: String | Pflicht: ja | Erlaubter Wert:

```json
"app": "prokrastinations-preis"
```

Wenn `app` nicht passt, gilt die Config als ungültig.

### `selectionPolicy`

Typ: Object | Pflicht: ja

Bestehende Struktur bleibt erhalten, solange `LineChartStrategy` sie verwendet.

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

Pflicht: keine rote Crash-Codierung, keine Verlustdramatisierung, keine Zukunftsvorschau.

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

Pflicht: Nutzer löst Schritte aus, keine erzwungene Wartezeit, Reduced Motion zeigt sofort den nächsten Zustand.

### `stations`

Typ: Array | Pflicht: ja

Enthält historische Event-Pins und genau einen finalen Reveal.

## 5. Sichtbarer Zielblock

Eine historische Station erscheint in der App so:

```text
TAGESSCHAU · 24. FEBRUAR 2022

Russland greift die Ukraine an
Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.
```

Das kommt aus:

```json
{
  "sourceLabel": "TAGESSCHAU · 24. FEBRUAR 2022",
  "headline": "Russland greift die Ukraine an",
  "anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet."
}
```

Sichtbar gerendert werden nur `sourceLabel`, `headline` und `anchorText`. `sourceUrl` wird nicht sichtbar gerendert.

## 6. Was ein Event qualifiziert

Ein Event ist nur zulässig, wenn alle Bedingungen erfüllt sind:

1. Es liegt im aktiven oder beauftragten Zeitraum.
2. Es hat klaren Bezug zu Börse, Kursen, Anlegerstimmung, Weltwirtschaft, Zinsen, Inflation, Banken, Energie, Lieferketten, IPO-/Tech-/KI-Euphorie oder Marktliquidität.
3. Es konnte Anleger damals emotional zu falschem Handeln verleiten: verkaufen, pausieren, hektisch kaufen, FOMO, Flucht in Sicherheit.
4. Es wurde in einem deutschsprachigen Mainstream-Medium aus dem DACH-Raum berichtet.
5. Die Quelle ist frei erreichbar oder mindestens Headline, Datum und Artikelkontext sind frei prüfbar.
6. Die Headline ist sicher 1:1 feststellbar.
7. Das Veröffentlichungsdatum ist tagesgenau feststellbar.

Nicht zulässig: Sportereignisse ohne Marktbezug, Prominenten-/Kulturereignisse, rein politische Ereignisse ohne erkennbare Markt-/Anlegerrelevanz, Blogs, Foren, Social Media, Newsletter, YouTube, Podcasts, Paywall-Quellen ohne frei prüfbare Headline/Kontext, englischsprachige Quellen, LLM- oder Suchmaschinen-Zusammenfassungen als Headline.

Wenn Quelle, Datum oder Headline nicht sauber prüfbar sind: Quelle verwerfen und weitersuchen.

## 7. Quellenpräferenz

Bevorzugt:

1. Tagesschau / ARD / ZDF / Deutschlandfunk
2. DER SPIEGEL / ZEIT ONLINE / FAZ / Süddeutsche Zeitung
3. Handelsblatt / Wirtschaftswoche, nur wenn frei prüfbar
4. Deutsche Welle
5. NZZ / SRF / ORF

Mainstream ist hier ein Filter: Was dort auftaucht, war groß genug, um normale Anleger damals emotional zu erreichen.

## 8. Pflichtfelder pro historischer Station

| Feld | Typ | Pflicht | Bedeutung |
|---|---|---|---|
| `id` | String | ja | eindeutige technische ID |
| `date` | DateOnly | ja | tagesgenaues ISO-Datum `YYYY-MM-DD` |
| `priority` | Number | ja | technische Auswahlpriorität |
| `status` | String | ja | technischer/redaktioneller Status |
| `role` | String | ja | grobe dramaturgische Kategorie |
| `headline` | String | ja | 1:1-Headline des Mediums |
| `sourceLabel` | String | ja | sichtbares Quellenlabel `MEDIUM · DATUM` |
| `sourceUrl` | String | ja | Prüfanker, wird nicht sichtbar gerendert |
| `sourceStatus` | String | ja | Quellenstatus-Enum |
| `anchorText` | String | ja | KI-Satz: „Was geht ab?“ |
| `continueLabel` | String | ja | Button-Text |
| `mobileIntermediate` | Object | ja | mobile Zwischenstand-Regel |
| `flags` | Object | ja | technische Sondermarkierungen |

`DateOnly` bedeutet: fachlich ein Datum ohne Uhrzeit; JSON-Serialisierung als ISO-String `YYYY-MM-DD`. Monatsstrings wie `2022-02` sind für historische Stationen nicht mehr zulässig.

## 9. Feldregeln pro Station

### `id`

Format:

```text
station_YYYY_MM_DD_slug
```

Beispiel:

```text
station_2022_02_24_ukraine_invasion
```

### `date`

Fachtyp: DateOnly. JSON-Serialisierung: String im Format `YYYY-MM-DD`.

Regeln:

- Historische Stationen müssen `YYYY-MM-DD` verwenden.
- `date` ist der Tag, an dem der Anleger diesen Nachrichtenmoment im Mainstream wahrnehmen konnte.
- In der Regel ist `date` identisch mit dem Veröffentlichungsdatum im `sourceLabel`.
- Keine Monatsstrings.
- Keine Uhrzeit.
- Für Monatsfenster wird der Monat technisch aus `date.slice(0, 7)` abgeleitet.
- `dynamic_latest_month` ist nur für den finalen Reveal erlaubt.

Erlaubt:

```json
"date": "2022-02-24"
```

Nicht erlaubt:

```json
"date": "2022-02"
```

Technische Folge: Loader, Validator und Fensterfilter müssen historische `YYYY-MM-DD`-Werte akzeptieren und für Monatsvergleiche den Monatsanteil ableiten.

### `priority`

Typ: Number | Pflicht: ja

| Wert | Verwendung |
|---|---|
| `100` | zentrale Krise/Klimax des Bogens |
| `90` | vom Menschen ausgewählte Kernstation |
| `80` | schwächere, aber brauchbare Station |
| `999` | nur finaler Reveal |

Keine Scheingenauigkeit erzeugen. Wenn der Mensch die Eventliste ausgewählt hat, ist für historische Stationen meist `90` korrekt.

### `status`

Typ: String | Pflicht: ja

Erlaubte Werte:

```text
core
supporting
optional
archival
final
```

Regel: Vom Menschen ausgewählte historische Stationen erhalten normalerweise `core`. `supporting`, `optional`, `archival` nur verwenden, wenn ausdrücklich beauftragt. `final` nur für den finalen Reveal.

### `role`

Typ: String | Pflicht: ja

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

| Wert | Wann verwenden? |
|---|---|
| `shock` | plötzlicher negativer Markt-/Nachrichtenschock |
| `doubt` | längere Zermürbung, schlechte Stimmung, Geduldsprüfung |
| `crisis` | zentrale Krise/Klimax des Bogens |
| `relief` | Erleichterung, Hoffnung, scheinbare Entwarnung |
| `geopolitical_shock` | Krieg, Sanktionen, geopolitischer Schock mit Marktbezug |
| `late_wobble` | späte erneute Nervenprobe nach scheinbarer Beruhigung |
| `final_reveal` | nur finaler Reveal |

Wenn unsicher: `shock` für negative plötzliche Ereignisse, `relief` für Erholung/Hoffnung, `doubt` für Zermürbung.

### `headline`

Typ: String | Pflicht: ja

Die Headline des Mediums. 1:1.

Regeln: nicht umformulieren, nicht kürzen, nicht übersetzen, nicht dramaturgisch verbessern, keine LLM-Zusammenfassung verwenden, keine Suchmaschinen-Zusammenfassung verwenden, keine Headline aus einem anderen Medium übernehmen. Wenn Titel und Untertitel getrennt sind: nur den Haupttitel verwenden. Wenn die echte Headline nicht sicher feststellbar ist: Quelle verwerfen und weitersuchen.

### `sourceLabel`

Typ: String | Pflicht: ja

Sichtbare Quellenzeile.

Format:

```text
MEDIUM · TAGESGENAUES DATUM
```

Beispiele:

```text
TAGESSCHAU · 24. FEBRUAR 2022
ZEIT ONLINE · 6. FEBRUAR 2018
DEUTSCHE WELLE (DW) · 6. FEBRUAR 2018
```

Medienname so, wie das Medium sich selbst nennt oder im DACH-Raum eindeutig bekannt ist. Datum tagesgenau. Muss zu `sourceUrl` und `headline` passen.

### `sourceUrl`

Typ: String | Pflicht: ja

Direkter Link zur Quelle. Dient als Prüfanker und wird in der App nicht sichtbar gerendert.

Regeln: vollständige URL bei historischen Stationen; keine Suchergebnisse; keine Archivlisten; keine Social-Media-Links; keine Paywall-Quelle, wenn Headline oder Artikelkontext nicht frei prüfbar sind; externe Links dürfen nicht zur Datenberechnung verwendet werden.

Leerer String ist nur erlaubt bei `sourceStatus = "derived_from_app_data"`.

### `sourceStatus`

Typ: String | Pflicht: ja

Erlaubte Werte:

```text
primary_verified
secondary_verified
source_claimed_unchecked
derived_from_app_data
```

Regeln:

- Finale, vom Menschen ausgewählte historische Stationen sollen `primary_verified` haben.
- `primary_verified` heißt: Quelle, Datum, Headline und Artikelkontext sind geprüft und passen direkt.
- `secondary_verified` nur für geprüfte, aber schwächere Belege; nicht für normale produktive Kernstationen bevorzugen.
- `source_claimed_unchecked` ist nur Arbeitsstatus und darf produktiv nicht sichtbar bleiben.
- `derived_from_app_data` nur für finalen Reveal oder aus App-Daten abgeleitete Stationen.

### `anchorText`

Typ: String | Pflicht: ja

Der KI-generierte 1-Satz-Subtext: „Was geht ab?“

Regeln: maximal 130 Zeichen inklusive Leerzeichen; ein Satz, höchstens zwei sehr kurze Sätze; erklärt die damalige Anlegeremotion; sachlich vom Artikel gedeckt; keine Zukunftsvorschau; keine Anlageempfehlung; kein Moralton; kein späteres Wissen; kein Fachjargon.

Gutes Beispiel:

```text
Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.
```

### `continueLabel`

Typ: String | Pflicht: ja

Standard für historische Stationen:

```text
Weiter investiert bleiben
```

Finaler Reveal:

```text
Ergebnis ansehen
```

Nicht pro Station kreativ variieren.

### `mobileIntermediate`

Typ: Object | Pflicht: ja

Standard:

```json
"mobileIntermediate": {
  "label": "Zwischenstand anzeigen",
  "fields": ["paidIn", "portfolioValueAtStation"]
}
```

Werte werden berechnet, nicht in der JSON gespeichert. Erlaubte `fields`: `paidIn`, `portfolioValueAtStation`.

### `flags`

Typ: Object | Pflicht: ja

Standard:

```json
"flags": {
  "falseResolution": false,
  "finalWobble": false,
  "noRedColor": true
}
```

Regeln:

- `noRedColor` muss immer `true` sein.
- `falseResolution: true` nur bei Erholung/Hoffnung, die sich damals wie Entwarnung anfühlte.
- `finalWobble: true` nur bei später erneuter Nervenprobe nach scheinbarer Beruhigung.
- Im Zweifel beide Sonderflags `false` lassen.

## 10. Finaler Reveal

Der finale Reveal ist kein historisches Nachrichtenereignis.

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

`dynamic_latest_month` ist nur hier zulässig.

## 11. Fensterfilter und Sortierung

Das aktive Fenster wird aus der CSV bestimmt:

```text
latestMonth = letzter valider CSV-Monat
startMonth  = latestMonth − 119 Monate
```

Historische Stationen nutzen tagesgenaue `date`-Werte. Für Monatsvergleiche gilt:

```text
stationMonth = station.date.slice(0, 7)
startMonth <= stationMonth <= latestMonth
```

Sortierung:

1. Historische Stationen nach `date` aufsteigend sortieren.
2. Wenn mehr als `maxVisibleStations` im Fenster liegen, nach `priority` auswählen.
3. Danach chronologische Reihenfolge wiederherstellen.
4. Finaler Reveal wird zusätzlich angehängt.

Nicht angezeigt werden Stationen vor `startMonth`, nach `latestMonth`, mit ungültigem Datum, mit `sourceStatus = source_claimed_unchecked` im Produktivmodus oder mit Pflichtregelverstoß.

## 12. Redaktions-Gate

Vor Veröffentlichung muss gelten:

- [ ] Historische Stationen verwenden tagesgenaues `date` im Format `YYYY-MM-DD`.
- [ ] Jede sichtbare historische Station hat eine deutschsprachige Mainstream-Quelle.
- [ ] Jede sichtbare historische Station hat eine 1:1-Headline des Mediums.
- [ ] Jede sichtbare historische Station hat ein tagesgenaues `sourceLabel`.
- [ ] `sourceUrl` ist vorhanden und prüfbar, wird aber nicht sichtbar gerendert.
- [ ] Kein sichtbares Event hat `sourceStatus = "source_claimed_unchecked"`.
- [ ] `anchorText` ist kurz, sachlich getragen und ohne Zukunftswissen.
- [ ] Keine Station erlaubt rote Codierung.
- [ ] Es gibt genau einen finalen Reveal.

Wenn das Redaktions-Gate nicht bestanden ist, ist die App nicht publikationsreif.

## 13. Beispiel: gültiger Ausschnitt

```json
{
  "id": "station_2022_02_24_ukraine_invasion",
  "date": "2022-02-24",
  "priority": 90,
  "status": "core",
  "role": "geopolitical_shock",
  "headline": "Russland greift die Ukraine an",
  "sourceLabel": "TAGESSCHAU · 24. FEBRUAR 2022",
  "sourceUrl": "https://www.tagesschau.de/wirtschaft/ukraine-krieg-aktienkuse-dax-absturz-101.html",
  "sourceStatus": "primary_verified",
  "anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.",
  "continueLabel": "Weiter investiert bleiben",
  "mobileIntermediate": {
    "label": "Zwischenstand anzeigen",
    "fields": ["paidIn", "portfolioValueAtStation"]
  },
  "flags": {
    "falseResolution": false,
    "finalWobble": true,
    "noRedColor": true
  }
}
```

## 14. Folge-APs

| AP | Offener Punkt |
|---|---|
| Contract-Migration | `stations.de.json` auf tagesgenaue `date`-Werte migrieren |
| Code-Migration | Loader/Validator/Fensterfilter auf `YYYY-MM-DD` plus `date.slice(0, 7)` umstellen |
| Redaktion | Quellen prüfen, Headlines 1:1 übernehmen, `anchorText` auf 130 Zeichen begrenzen |
