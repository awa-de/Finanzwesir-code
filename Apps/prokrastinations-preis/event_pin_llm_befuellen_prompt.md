# Auftrag an das LLM: Event-Pins für `stations.de.json` recherchieren und befüllen

## Ziel

Du suchst belegte historische Event-Pins für eine Finanzzeitreihe.

Ein Event-Pin ist ein Nachrichtenmoment, der Anleger damals emotional beeinflussen konnte: Furcht, Zweifel, Panik, Erleichterung, Euphorie, Gier oder FOMO.

Die App zeigt diese Pins entlang eines Charts. Sie ist keine Weltchronik und kein Börsenlexikon. Gesucht werden nur große Furcht-&-Gier-Momente mit klarem Börsen-/Anlegerbezug.

Wichtig: Der Zweck der App hilft nur bei der Auswahl der Events. Der Text im Feld `anchorText` darf nicht aus dem App-Zweck heraus formuliert werden. `anchorText` ist keine Dramaturgie, keine Lehre, kein Kommentar und kein Anleger-Coaching. `anchorText` ist eine nüchterne Essenz dessen, was im Artikel steht.


## Stop-Regel: Zeitraum fehlt

Wenn der Nutzer keinen Zeitraum nennt, frage zuerst nach dem Zeitraum.

Nicht recherchieren.
Keine Kandidatenliste erstellen.
Keine Annahme treffen.
Keinen Standardzeitraum wählen.

Stelle genau eine Rückfrage:

```text
Für welchen Zeitraum soll ich Event-Pins suchen? Bitte Start- und Enddatum oder Start- und Endjahr nennen.
```

Erst wenn der Zeitraum eindeutig ist, beginnt die Recherche.

## Zulässige Events

Ein Event ist nur zulässig, wenn alle Bedingungen erfüllt sind:

1. Es liegt im vorgegebenen Zeitraum.
2. Es hat klaren Bezug zu Börse, Kursen, Anlegerstimmung, Weltwirtschaft, Zinsen, Inflation, Banken, Energie, Lieferketten, IPO-/Tech-/KI-Euphorie oder Marktliquidität.
3. Es konnte Anleger damals emotional zu falschem Handeln verleiten: verkaufen, pausieren, hektisch kaufen, FOMO, Flucht in Sicherheit.
4. Es wurde in einem deutschsprachigen Mainstream-Medium aus dem DACH-Raum berichtet.
5. Die Quelle ist frei prüfbar.
6. Die Headline ist sicher 1:1 feststellbar.
7. Das Veröffentlichungsdatum ist tagesgenau feststellbar.

Wenn Quelle, Datum oder Headline nicht sauber prüfbar sind: Quelle verwerfen und weitersuchen.

## Quellenpräferenz

Bevorzugt:

1. Tagesschau / ARD / ZDF / Deutschlandfunk
2. Der Spiegel / Zeit Online / FAZ / Süddeutsche Zeitung
3. Handelsblatt / Wirtschaftswoche, nur wenn frei prüfbar
4. Deutsche Welle
5. NZZ / SRF / ORF

Mainstream ist hier ein Filter: Was dort auftaucht, war groß genug, um normale Anleger damals emotional zu erreichen.

## JSON-Zielformat

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

Keine weiteren Felder.

## Feldregeln

### `id`

Format:

```text
station_YYYY_MM_DD_slug
```

Beispiel:

```json
"id": "station_2022_02_24_ukraine_invasion"
```

### `date`

Fachtyp: DateOnly. JSON-Serialisierung: ISO-Datum `YYYY-MM-DD`.

Regeln:

- tagesgenau
- keine Monatsstrings
- keine Uhrzeit
- keine Zeitzone
- Tag, an dem der Anleger diesen Nachrichtenmoment im deutschsprachigen Mainstream wahrnehmen konnte
- in der Regel identisch mit dem Veröffentlichungsdatum der Quelle

### `source`

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

Die Headline des verlinkten Mediums. 1:1.

Gemeint ist die sichtbare Hauptheadline, die der Nutzer im Artikel sieht.

Regeln:

- sichtbare Hauptheadline verwenden
- SEO-Titel ignorieren
- Browser-Title ignorieren
- Social-Share-Title ignorieren
- Suchmaschinen-Snippet ignorieren
- nicht umformulieren
- nicht kürzen
- nicht übersetzen
- nicht dramaturgisch verbessern
- keine LLM-Zusammenfassung verwenden
- keine Suchmaschinen-Zusammenfassung verwenden
- keine Headline aus einem anderen Medium übernehmen

Wenn ein Artikel getrennte Elemente hat:

- Hauptheadline verwenden
- Untertitel nicht in `headline` übernehmen
- Teaser nicht in `headline` übernehmen
- Dachzeile/Rubrik nicht in `headline` übernehmen

Beispiel:

Wenn der SEO-Titel lautet:

```text
Nvidia überholt Microsoft und Apple …
```

aber die sichtbare Hauptheadline lautet:

```text
Chiphersteller Nvidia wertvollster Konzern der Welt
```

dann ist korrekt:

```json
"headline": "Chiphersteller Nvidia wertvollster Konzern der Welt"
```

Wenn sichtbare Headline, SEO-Titel und Snippet voneinander abweichen, zählt immer die sichtbare Hauptheadline.

Wenn die sichtbare Hauptheadline nicht sicher feststellbar ist: Quelle verwerfen und weitersuchen.

### `anchorText`

`anchorText` ist eine nüchterne Ein-Satz-Essenz des Artikels.

Er beantwortet nur diese Frage:

> Was berichtet der Artikel, das für diesen Event-Pin relevant ist?

Er beantwortet nicht:

- Was soll der Nutzer aus der App lernen?
- Wie soll sich ein Anleger fühlen?
- Was wissen wir im Rückblick?
- Was wäre für Anleger besser gewesen?
- Welche Dramaturgie braucht die App?

#### Harte Regel

Jede konkrete Aussage im `anchorText` muss im Artikel stehen oder unmittelbar aus dem Artikel hervorgehen.

Wenn der Artikel einen Punkt nicht hergibt, darf er im `anchorText` nicht erscheinen.

Wenn der Artikel nicht genug Substanz für einen sachlichen `anchorText` liefert, ist die Quelle für diesen Event-Pin zu schwach. Dann suche eine bessere Quelle.

#### Stil

- ein Satz
- maximal 130 Zeichen inklusive Leerzeichen
- nüchtern, konkret, sachlich
- keine App-Perspektive
- keine Rückblick-Grafik
- kein „wer verkauft hat“
- kein „was Anleger verpasst haben“
- kein Coaching
- kein Moralton
- kein dramatischer Zusatz
- kein späteres Wissen
- keine rhetorische Frage, außer die Frage steht sinngemäß im Artikel selbst

#### Inhalt

Gute `anchorText`-Sätze enthalten nur Artikelmaterial, zum Beispiel:

- Marktreaktion: Dax fällt, Wall Street bricht ein, Kurse steigen, Börsen jubeln.
- Auslöser: Krieg, Zinssorge, Inflation, Bankenkrise, Impfstoffmeldung, Lieferkettenproblem.
- berichtete Unsicherheit: Anleger sind nervös, Märkte reagieren panisch, Volatilität steigt.
- konkret genannte Zahlen: Prozentverluste, Rekordstände, VIX-Anstieg, Wirksamkeit, Zinsschritte.

Nenne Zahlen nur, wenn sie im Artikel stehen.

Nenne Anlegerreaktionen nur, wenn der Artikel sie beschreibt oder eindeutig berichtet.

#### Selbstprüfung vor Ausgabe

Prüfe den `anchorText` vor Ausgabe Satz für Satz:

1. Kann ich jede konkrete Aussage mit dem Artikel belegen?
2. Habe ich nur berichtet, was im Artikel steht?
3. Habe ich App-Zweck, Rückblickwissen und Anleger-Coaching weggelassen?
4. Ist der Satz kurz genug?
5. Klingt der Satz wie Nachrichten-Essenz statt wie Werbe- oder Dramaturgietext?

Nur wenn alle fünf Fragen mit Ja beantwortet sind, darf der `anchorText` ausgegeben werden.

Beispiel für die gewünschte Richtung:

```json
"anchorText": "Die Börsen fallen deutlich, die Volatilität steigt, Anleger fürchten höhere Zinsen."
```

Dieses Beispiel ist nur zulässig, wenn diese Punkte im Artikel stehen.

### `sourceUrl`

Direkter Link zur Quelle.

Wird nicht sichtbar gerendert, bleibt aber als Prüfanker in der JSON.

Regeln:

- vollständige URL
- frei prüfbar
- keine Suchergebnisse
- keine Archivlisten
- keine Social-Media-Links
- keine unprüfbare Paywall

## Arbeitsweise

### Schritt 1: Kandidaten liefern

Liefere zuerst eine Kandidatenliste. Noch keine finale JSON schreiben.

Pro Kandidat:

```json
{
  "date": "YYYY-MM-DD",
  "source": "Medium",
  "headline": "1:1-Headline des Mediums",
  "anchorText": "Nüchterne Ein-Satz-Essenz des Artikels",
  "sourceUrl": "https://...",
  "whyRelevant": "Warum war das für Anleger Furcht/Gier/Unsicherheit?"
}
```

Der Mensch entscheidet:

- nehmen
- verwerfen
- bessere Quelle suchen
- Zeitraum ist schwach, weiter suchen

### Schritt 2: Finale JSON schreiben

Nur vom Menschen ausgewählte Events kommen in die finale JSON.

Finale JSON:

```json
{
  "version": "3.0",
  "locale": "de-DE",
  "app": "prokrastinations-preis",
  "stations": [
    {
      "id": "station_2022_02_24_ukraine_invasion",
      "date": "2022-02-24",
      "source": "Tagesschau",
      "headline": "Russland greift die Ukraine an",
      "anchorText": "Krieg ist zurück in Europa. Energie, Inflation, Lieferketten — alles wird neu bewertet.",
      "sourceUrl": "https://www.tagesschau.de/..."
    }
  ]
}
```

Stations werden chronologisch nach `date` sortiert.
