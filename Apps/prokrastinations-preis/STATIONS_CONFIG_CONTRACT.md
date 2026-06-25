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
- Medium als Quelle
- 1:1-Headline des Mediums
- ein kurzer KI-Satz: „Was geht ab?“
- URL als interner Prüfanker

Alles andere gehört nicht in den Event-Datensatz.

Formatierungen gehören nicht in die JSON. Die Chart-/UI-Strategie entscheidet über Darstellung und baut die sichtbare Quellenzeile aus `source` und `date`.

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
Tagesschau · 24. Februar 2022

Russland greift die Ukraine an
Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.
```

Die JSON speichert dafür nur die Rohinformationen:

```json
{
  "source": "Tagesschau",
  "date": "2022-02-24",
  "headline": "Russland greift die Ukraine an",
  "anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet."
}
```

Die sichtbare Quellenzeile wird nicht als fertiger String gespeichert. Die Chart-/UI-Strategie erzeugt sie aus `source` und `date`.

Sichtbar gerendert werden:

- `source`, formatiert durch die Strategie
- `date`, formatiert durch die Strategie
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
  "source": "Tagesschau",
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

- beginnt mit `station_`
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
- in der Regel identisch mit dem Veröffentlichungsdatum der Quelle
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

### `source`

Fachtyp: String  
Pflicht: ja

Name des Mediums.

Regeln:

- nur das Medium eintragen
- keine Datumsangabe
- keine typografische Formatierung
- keine künstliche Versalschreibung
- Medium so schreiben, wie es sich selbst nennt oder im DACH-Raum eindeutig bekannt ist
- die Chart-/UI-Strategie entscheidet später über Darstellung und baut daraus zusammen mit `date` die sichtbare Quellenzeile

Beispiele:

```json
"source": "Tagesschau"
```

```json
"source": "Handelsblatt"
```

```json
"source": "NDR"
```

```json
"source": "Zeit Online"
```

```json
"source": "Der Spiegel"
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
- muss zu `source`, `date` und `headline` passen
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

Wenn Quelle, Datum oder Headline nicht sauber prüfbar sind: Quelle verwerfen und weitersuchen.

## 9. Quellenpräferenz

Bevorzugt:

1. Tagesschau / ARD / ZDF / Deutschlandfunk
2. Der Spiegel / Zeit Online / FAZ / Süddeutsche Zeitung
3. Handelsblatt / Wirtschaftswoche, nur wenn frei prüfbar
4. Deutsche Welle
5. NZZ / SRF / ORF

Mainstream ist hier ein Filter: Was dort auftaucht, war groß genug, um normale Anleger damals emotional zu erreichen.

## 10. Sortierung

Stationen werden chronologisch nach `date` sortiert.

Die Reihenfolge im JSON soll chronologisch sein. Die App darf zusätzlich nach `date` aufsteigend sortieren.

Keine manuelle Gewichtung. Keine Rollenlogik.

## 11. Gültiges Beispiel

```json
{
  "id": "station_2022_02_24_ukraine_invasion",
  "date": "2022-02-24",
  "source": "Tagesschau",
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
  "source": "Internet · Februar 2022",
  "headline": "Krieg ist zurück in Europa",
  "anchorText": "Danach fallen die Kurse, aber später erholt sich alles wieder.",
  "sourceUrl": "https://example.com"
}
```

Warum ungültig:

- `date` ist nicht tagesgenau
- `source` enthält kein sauber benanntes Medium
- `source` enthält Datum und Formatierung
- `headline` ist nicht als 1:1-Medienheadline belegt
- `anchorText` enthält späteres Wissen

## 13. Migrationshinweis

Diese Minimalversion ist das Zielschema.

Die Datenstruktur bleibt klein, weil sie nur Event-Pins beschreibt. UI-Regeln, Auswahlheuristiken, Button-Texte und Visual-Regeln gehören in Code oder separate App-Konfiguration, nicht in historische Eventdaten.
