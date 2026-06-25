Stand: 2026-06-25 | Zweck: Minimaler Event-Pin-Vertrag für Screen 2 der Prokrastinationspreis-App

# Stations-JSON-Datenvertrag — Minimalversion

## 1. Zweck

`Apps/prokrastinations-preis/config/stations.de.json` enthält belegte historische Event-Pins für eine Finanzzeitreihe.

Ein Event-Pin markiert einen Nachrichtenmoment, der für Anleger damals emotional relevant war: Furcht, Zweifel, Panik, Erleichterung, Euphorie, Gier oder FOMO.

Die App zeigt keine allgemeine Weltchronik. Sie zeigt wenige belegte Momente entlang des Charts, in denen Anleger emotional versucht waren, ihre langfristige Strategie zu verlassen.

`sourceUrl` bleibt als redaktioneller Prüfanker in der JSON, wird aber in der App nicht sichtbar gerendert.

## 2. Produktiver Dateipfad

```text
Apps/prokrastinations-preis/config/stations.de.json
```

## 3. Minimalprinzip

Die JSON enthält nur das, was für Event-Pins zwingend gebraucht wird:

- Zeitpunkt im Chart
- sichtbares Medium mit Datum
- 1:1-Headline des Mediums
- ein kurzer KI-Satz: „Was geht ab?“
- URL als interner Prüfanker

Alles andere gehört nicht in den Event-Datensatz.

Nicht mehr Teil des Event-Pin-Vertrags:

- `priority`
- `status`
- `role`
- `sourceStatus`
- `continueLabel`
- `mobileIntermediate`
- `flags`
- `selectionPolicy`
- `visualRules`
- `motionRules`

Wenn Code diese Felder noch erwartet, ist der Code an diesen Vertrag anzupassen. Die Felder werden nicht aus Rücksicht auf alte Mechanik im Vertrag behalten.

## 4. Top-Level-Struktur

```json
{
  "version": "3.0",
  "locale": "de-DE",
  "app": "prokrastinations-preis",
  "stations": []
}
```

### `version`

Typ: String  
Pflicht: ja

Vertragsversion dieser JSON-Struktur.

```json
"version": "3.0"
```

### `locale`

Typ: String  
Pflicht: ja  
Erlaubter Wert:

```json
"locale": "de-DE"
```

### `app`

Typ: String  
Pflicht: ja  
Erlaubter Wert:

```json
"app": "prokrastinations-preis"
```

### `stations`

Typ: Array  
Pflicht: ja

Enthält historische Event-Pins in chronologischer Reihenfolge.  
Die App darf zusätzlich nach `date` aufsteigend sortieren.  
Manuelle Priorisierung gibt es nicht.

## 5. Sichtbarer Zielblock

Eine Station erscheint in der App als kompakter Quellenblock:

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

Sichtbar gerendert werden nur:

- `sourceLabel`
- `headline`
- `anchorText`

Nicht sichtbar gerendert wird:

- `sourceUrl`

## 6. Pflichtfelder pro Station

Jede Station hat genau diese Felder:

```json
{
  "id": "station_2022_02_24_ukraine_invasion",
  "date": "2022-02-24",
  "sourceLabel": "TAGESSCHAU · 24. FEBRUAR 2022",
  "headline": "Russland greift die Ukraine an",
  "anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.",
  "sourceUrl": "https://www.tagesschau.de/..."
}
```

Keine weiteren Felder in historischen Event-Pins.

## 7. Feldregeln

### `id`

Fachtyp: String  
Pflicht: ja

Stabile technische ID der Station.

Format:

```text
station_YYYY_MM_DD_slug
```

Regeln:

- beginnt mit `station_`, weil bestehende App-Logik und alte Daten dieses Präfix bereits verwenden
- Datumsteil entspricht `date`
- nur Kleinbuchstaben, Zahlen und `_`
- keine Leerzeichen
- nach Veröffentlichung nicht ohne Grund ändern

Beispiel:

```json
"id": "station_2022_02_24_ukraine_invasion"
```

### `date`

Fachtyp: DateOnly  
Pflicht: ja  
JSON-Serialisierung: ISO-Datum `YYYY-MM-DD`

`date` ist der Tag, an dem der Anleger diesen Nachrichtenmoment im deutschsprachigen Mainstream wahrnehmen konnte.

Regeln:

- historische Stationen verwenden immer ein tagesgenaues Datum
- keine Monatsstrings
- keine Uhrzeit
- keine Zeitzone
- in der Regel identisch mit dem Datum in `sourceLabel`
- die ChartEngine nutzt `date` für die X-Achse
- für Monatsfenster wird der Monat aus `date.slice(0, 7)` abgeleitet

Erlaubt:

```json
"date": "2022-02-24"
```

Nicht erlaubt:

```json
"date": "2022-02"
```

Hinweis: JSON kennt keinen nativen Date-Typ. Fachlich ist `date` ein DateOnly. Technisch wird es als ISO-String gespeichert und muss von Loader/Validator als Datum validiert werden.

### `sourceLabel`

Fachtyp: String  
Pflicht: ja

Sichtbare Quellenzeile der App.

Format:

```text
MEDIUM · TAGESGENAUES DATUM
```

Regeln:

- Medium so schreiben, wie es in der App erscheinen soll
- Datum tagesgenau auf Deutsch formatieren
- Datum muss zu `date` passen
- Medium und Datum müssen zur `sourceUrl` passen
- keine freien Beschreibungen
- keine Domain statt Medienmarke, wenn die Medienmarke klar ist

Beispiele:

```text
TAGESSCHAU · 24. FEBRUAR 2022
ZEIT ONLINE · 6. FEBRUAR 2018
DEUTSCHE WELLE (DW) · 6. FEBRUAR 2018
DER SPIEGEL · 9. NOVEMBER 2020
```

### `headline`

Fachtyp: String  
Pflicht: ja

Die Headline des verlinkten Mediums. 1:1.

Regeln:

- nicht umformulieren
- nicht kürzen
- nicht übersetzen
- nicht dramaturgisch verbessern
- keine LLM-Zusammenfassung verwenden
- keine Suchmaschinen-Zusammenfassung verwenden
- keine Headline aus einem anderen Medium übernehmen
- wenn Titel und Untertitel getrennt sind: nur den Haupttitel verwenden
- wenn die echte Headline nicht sicher feststellbar ist: Quelle verwerfen und weitersuchen

Beispiel:

```json
"headline": "Russland greift die Ukraine an"
```

### `anchorText`

Fachtyp: String  
Pflicht: ja

Ein KI-generierter Satz: „Was geht ab?“

`anchorText` ist die kurze Essenz des Artikels für die Anlegerperspektive.

Regeln:

- ein Satz; zwei sehr kurze Sätze nur wenn nötig
- maximal 130 Zeichen inklusive Leerzeichen
- erklärt die damalige Anlegeremotion
- muss sachlich vom Artikel getragen sein
- keine Zukunftsvorschau
- kein späteres Wissen
- keine Anlageempfehlung
- kein Moralton
- kein Fachjargon
- keine Schamformel

Gutes Beispiel:

```json
"anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet."
```

### `sourceUrl`

Fachtyp: String  
Pflicht: ja

Direkter Link zur Quelle.

Regeln:

- vollständige URL
- frei erreichbar oder mindestens Headline, Datum und Kontext frei prüfbar
- muss zu `sourceLabel`, `date` und `headline` passen
- keine Suchergebnisse
- keine Archivlisten
- keine Social-Media-Links
- keine unprüfbare Paywall

`sourceUrl` wird nicht sichtbar gerendert. Sie bleibt als interner Prüfanker in der JSON.

## 8. Was ein Event qualifiziert

Ein Event ist nur zulässig, wenn alle Bedingungen erfüllt sind:

1. Es liegt im gesuchten Zeitraum.
2. Es hat klaren Bezug zu Börse, Kursen, Anlegerstimmung, Weltwirtschaft, Zinsen, Inflation, Banken, Energie, Lieferketten, IPO-/Tech-/KI-Euphorie oder Marktliquidität.
3. Es konnte Anleger damals emotional zu falschem Handeln verleiten: verkaufen, pausieren, hektisch kaufen, FOMO, Flucht in Sicherheit.
4. Es wurde in einem deutschsprachigen Mainstream-Medium aus dem DACH-Raum berichtet.
5. Die Quelle ist frei prüfbar.
6. Die Headline ist sicher 1:1 feststellbar.
7. Das Veröffentlichungsdatum ist tagesgenau feststellbar.

Nicht zulässig:

- Sportereignisse ohne Marktbezug
- Prominenten-/Kulturereignisse
- rein politische Ereignisse ohne erkennbare Markt-/Anlegerrelevanz
- Blogs, Foren, Social Media, Newsletter, YouTube, Podcasts
- Paywall-Quellen ohne frei prüfbare Headline und Kontext
- englischsprachige Quellen
- LLM- oder Suchmaschinen-Zusammenfassungen als Headline

Wenn Quelle, Datum oder Headline nicht sauber prüfbar sind: Quelle verwerfen und weitersuchen.

## 9. Quellenpräferenz

Bevorzugt:

1. Tagesschau / ARD / ZDF / Deutschlandfunk
2. DER SPIEGEL / ZEIT ONLINE / FAZ / Süddeutsche Zeitung
3. Handelsblatt / Wirtschaftswoche, nur wenn frei prüfbar
4. Deutsche Welle
5. NZZ / SRF / ORF

Mainstream ist hier ein Filter: Was dort auftaucht, war groß genug, um normale Anleger damals emotional zu erreichen.

## 10. Sortierung

Stations werden chronologisch nach `date` sortiert.

Die Reihenfolge im JSON soll chronologisch sein. Die App darf zusätzlich nach `date` aufsteigend sortieren.

Keine `priority`. Keine manuelle Gewichtung. Keine Rollenlogik.

## 11. Gültiges Beispiel

```json
{
  "id": "station_2022_02_24_ukraine_invasion",
  "date": "2022-02-24",
  "sourceLabel": "TAGESSCHAU · 24. FEBRUAR 2022",
  "headline": "Russland greift die Ukraine an",
  "anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.",
  "sourceUrl": "https://www.tagesschau.de/..."
}
```

## 12. Ungültiges Beispiel

```json
{
  "id": "station_2022_02_ukraine_invasion",
  "date": "2022-02",
  "priority": 90,
  "status": "core",
  "role": "geopolitical_shock",
  "headline": "Krieg ist zurück in Europa",
  "sourceLabel": "Internet · Februar 2022",
  "sourceUrl": "https://example.com",
  "sourceStatus": "primary_verified",
  "anchorText": "Danach fallen die Kurse, aber später erholt sich alles wieder.",
  "continueLabel": "Weiter investiert bleiben",
  "flags": {
    "finalWobble": true
  }
}
```

Warum ungültig:

- `date` ist nicht tagesgenau
- `headline` ist nicht als 1:1-Medienheadline belegt
- `sourceLabel` nennt kein echtes Medium und kein tagesgenaues Datum
- `anchorText` enthält späteres Wissen
- überflüssige alte Steuerfelder sind enthalten

## 13. Migrationshinweis

Diese Minimalversion ist das Zielschema.

Wenn bestehender Code noch `priority`, `status`, `role`, `sourceStatus`, `continueLabel`, `mobileIntermediate`, `flags`, `selectionPolicy`, `visualRules` oder `motionRules` erwartet, ist der Code an diese Minimalversion anzupassen.

Nicht umgekehrt.

Die Datenstruktur bleibt klein, weil sie nur Event-Pins beschreibt. UI-Regeln, Auswahlheuristiken, Button-Texte und Visual-Regeln gehören in Code oder separate App-Konfiguration, nicht in historische Eventdaten.
