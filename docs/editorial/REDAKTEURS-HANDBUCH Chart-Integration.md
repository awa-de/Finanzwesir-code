# Redakteurs-Handbuch: Chart-Integration in Ghost

**Version:** 1.0.0
**Datum:** 17.02.2026
**Status:** Verbindliche Referenz
**Zielgruppe:** Redakteure, die Artikel mit Charts im Ghost-CMS erstellen.

---

## Was dieses Dokument ist

Dieses Handbuch erklärt, wie Sie als Redakteur interaktive Charts in einen Ghost-Artikel einbinden. Sie brauchen dafür **kein** Programmier-Wissen — nur dieses Dokument und Ihre CSV-Datei.

**Kurzfassung des Workflows:**

1. CSV-Datei vorbereiten (Excel/Numbers → Speichern als CSV)
2. CSV-Datei hochladen (Ghost Storage oder Server)
3. HTML-Snippet in den Artikel kopieren
4. Parameter anpassen (Typ, Titel, Farben, Optionen)
5. Vorschau prüfen

---

## 1. Die CSV-Datei vorbereiten

Die Engine liest CSV-Dateien mit **strengen Regeln**. Wenn die Datei nicht exakt diesem Format entspricht, wird der Chart nicht angezeigt und eine Fehlermeldung erscheint.

### 1.1 Grundregeln (gelten immer)

| Regel | Richtig | Falsch |
|:------|:--------|:-------|
| **Trennzeichen** ist Semikolon | `Datum;Wert` | `Datum,Wert` |
| **Dezimalzeichen** ist Komma | `10,5` | `10.5` (wird zu 105!) |
| **Erste Zeile** ist die Kopfzeile | `Datum;MSCI World` | (keine Kopfzeile) |
| **Einheiten** direkt in die Zelle | `10,5 %` oder `25,00 €` | Einheit in die Kopfzeile |
| **Keine Leerzeilen** am Ende | — | (unsichtbare Leerzeile) |

### 1.2 Zeitreihen-Format (Linien- und Balken-Charts)

Für Linien- (`line`) und Balken-Charts (`bar`) ist ein Datum in der ersten Spalte **Pflicht**.

**Datumsformat:** Streng `YYYY-MM-DD` (ISO-Format).

| Richtig | Falsch |
|:--------|:-------|
| `2024-01-15` | `15.01.2024` (deutsch) |
| `2024-12-31` | `12/31/2024` (US-Format) |
| `2020-01-01` | `Jan 2020` (Textformat) |

**Beispiel-CSV (korrekt):**

```csv
Datum;MSCI World;Emerging Markets
2020-01-01;10,5 %;8,2 %
2020-02-01;11,3 %;7,8 %
2020-03-01;9,1 %;6,5 %
2021-01-01;12,1 %;7,9 %
```

### 1.3 Kategorie-Format (nur Tortendiagramme)

Beim Tortendiagramm (`pie`) entfällt das Datum. Stattdessen steht in der ersten Spalte eine Kategorie-Bezeichnung.

**Beispiel-CSV (korrekt):**

```csv
Kategorie;Anteil
Gold;15,0 %
Aktien;80,0 %
Cash;5,0 %
```

### 1.4 Erkannte Einheiten

Die Engine erkennt folgende Symbole automatisch und zeigt sie korrekt in Tooltips und Achsen an:

| Symbol in der CSV | Bedeutung | Beispiel |
|:------------------|:----------|:---------|
| `%` | Prozent | `10,5 %` |
| `€` oder `EUR` | Euro | `25,00 €` |
| `$` oder `USD` | US-Dollar | `100,00 $` |
| `£` oder `GBP` | Britisches Pfund | `50,00 £` |
| `¥` oder `JPY` | Japanischer Yen | `1.000 ¥` |
| `CHF` | Schweizer Franken | `30,00 CHF` |
| `pts` | Punkte (Index) | `1.234 pts` |
| `Stk.` | Stück | `100 Stk.` |

Wird **kein** Symbol gefunden, behandelt die Engine den Wert als neutrale Zahl in Euro (Standardfall).

### 1.5 Typische Fehlerquellen

| Problem | Ursache | Lösung |
|:--------|:--------|:-------|
| "105" statt "10,5" | Punkt als Dezimalzeichen (`10.5`) | Komma verwenden: `10,5` |
| "Ungültiges Datum" | Deutsches Datumsformat (`15.01.2024`) | ISO-Format: `2024-01-15` |
| Chart zeigt nichts | CSV leer, falsche URL, oder Kopfzeile fehlt | CSV im Editor prüfen |
| Falsche Spaltenanzahl | Zeilen haben unterschiedlich viele Semikolons | Jede Zeile muss gleich viele `;` haben |

---

## 2. Das HTML-Snippet

Charts werden in Ghost über eine **HTML-Card** eingebunden. Dafür:

1. Im Ghost-Editor an der gewünschten Stelle das `+`-Menü öffnen
2. **HTML** auswählen (nicht Markdown, nicht Embed!)
3. Das Snippet hineinkopieren und anpassen

### 2.1 Das Grund-Snippet

```html
<div class="financial-chart-module"
     data-type="line"
     data-title="Mein Chart-Titel"
     data-csv="https://www.finanzwesir.com/content/files/datei.csv"
     data-colors="Spalte1: #0071BF, Spalte2: #218380"
     data-options="range:5y">
</div>
```

### 2.2 Die fünf Parameter im Detail

#### `data-type` — Chart-Typ (Pflicht)

Bestimmt, welche Art von Chart angezeigt wird.

| Wert | Ergebnis | Wann verwenden? |
|:-----|:---------|:----------------|
| `line` | Liniendiagramm | Zeitreihen-Vergleiche (z.B. Kursentwicklung) |
| `bar` | Balkendiagramm | Perioden-Vergleiche (z.B. Jahresrenditen) |
| `pie` | Tortendiagramm | Zusammensetzungen (z.B. Asset Allokation) |

#### `data-title` — Überschrift (Optional)

Freitext. Wird als Überschrift über dem Chart angezeigt. Wenn leer oder weggelassen, wird **keine Überschrift** angezeigt — der Chart beginnt direkt mit der Toolbar.

#### `data-csv` — Dateipfad (Pflicht)

Die vollständige URL zur CSV-Datei. Der Redakteur lädt die CSV-Datei über das Upload-Feld im Ghost-Backend hoch und kopiert die resultierende URL hierher.

**Sicherheitsregel:** Die URL **muss** mit `https://www.finanzwesir.com` beginnen. CSV-Dateien von Drittseiten werden nicht akzeptiert.

**Workflow:**
1. Im Ghost-Editor: Artikel bearbeiten
2. CSV-Datei über das Upload-Feld hochladen
3. Ghost gibt eine URL zurück (z.B. `https://www.finanzwesir.com/content/files/2024/renditen.csv`)
4. Diese URL in `data-csv` eintragen

```html
data-csv="https://www.finanzwesir.com/content/files/2024/renditen.csv"
```

**Nicht erlaubt:**
- Relative Pfade (`./data/datei.csv`)
- Externe URLs (`https://andere-seite.de/datei.csv`)
- URLs ohne Domain (`/content/files/datei.csv`)

#### `data-colors` — Farbzuweisung (Pflicht)

Weist jeder Datenspalte eine Farbe aus der CI-Palette zu. **Nur CI-Farben sind erlaubt** — andere Hex-Codes werden von der Engine abgelehnt, und es greift die Standard-Palette.

**Format:** `Spaltenname: #HexCode, Spaltenname: #HexCode`

**Die verfügbare Farbpalette:**

| Farbname | Hex-Code | Verwendung |
|:---------|:---------|:-----------|
| Blau | `#0071BF` | Primärfarbe für das wichtigste Asset |
| Purpur | `#8D0267` | Zweite Farbe für Vergleiche |
| Petrol | `#218380` | Dritte Farbe / Benchmark-Hervorhebung |
| Gelb | `#DFC805` | Akzentfarbe |
| Purpur (hell) | `#C57EB2` | Ergänzung bei vielen Linien |
| Petrol (hell) | `#90C1BF` | Ergänzung bei vielen Linien |
| Gelb (hell) | `#F9EF9E` | Ergänzung bei vielen Linien |
| Grau | `#4C4C4C` | Sekundärfarbe |

**Wichtig:** Die Spaltennamen in `data-colors` müssen **exakt** mit den Spaltennamen in der CSV-Kopfzeile übereinstimmen (Groß-/Kleinschreibung zählt!).

**Beispiel:** CSV-Kopfzeile `Datum;MSCI World;Emerging Markets`
→ `data-colors="MSCI World: #0071BF, Emerging Markets: #8D0267"`

#### `data-options` — Feinsteuerung (Optional)

Hier werden Anzeige-Optionen als kommagetrennte `key:value`-Paare übergeben.

---

## 3. Die Options-Referenz

### 3.1 Welche Optionen gibt es?

| Option | Beschreibung | Erlaubte Werte | Line | Bar | Pie |
|:-------|:-------------|:---------------|:----:|:---:|:---:|
| `range` | Zeitraum beim Start | `1y`, `3y`, `5y`, `10y`, `max` | Ja | Ja | — |
| `mode` | Werte-Darstellung | `value`, `percent`, `return` | Ja | Ja | — |
| `view` | Initiale Ansicht | `history`, `ranking` | — | Ja | — |
| `benchmark` | Hervorgehobene Linie | Spaltenname aus der CSV | Ja | — | — |

### 3.2 Was bedeuten die Optionen?

**`range`** — Wie viel Geschichte zeigt der Chart beim ersten Laden?

| Wert | Bedeutung |
|:-----|:----------|
| `1y` | Letztes Jahr |
| `3y` | Letzte 3 Jahre |
| `5y` | Letzte 5 Jahre |
| `10y` | Letzte 10 Jahre |
| `max` | Alle verfügbaren Daten (Standard, wenn nichts angegeben) |

Der Leser kann den Zeitraum danach über Buttons umschalten.
Buttons werden automatisch ausgeblendet, wenn der gewählte Zeitraum weniger als
2 Datenpunkte enthält (z.B. "1J" bei jährlichen Daten). "Max" ist immer sichtbar.

**Semantik-Unterschied Line vs. Bar:** Bei Linien-Charts umfasst "NJ" den Zeitraum
inklusive Start- und Endpunkt (nötig für Liniensegmente). Bei Balken-Charts zeigt "NJ"
exakt N Periodenbalken — "3J" bei jährlichen Daten = 3 Balken, nicht 4.

**`mode`** — In welcher Einheit werden die Werte dargestellt?

| Wert | Bedeutung | Beispiel |
|:-----|:----------|:---------|
| `value` | Absoluter Wert (Kurs, Euro-Betrag) | "12.345,67 €" |
| `percent` | Prozentualer Wert | "10,5 %" |
| `return` | Rendite relativ zum Startpunkt | "+23,4 %" (nur Line) |

Wenn `mode` nicht angegeben wird, erkennt die Engine die Einheit automatisch aus der CSV-Datei.

**`view`** — Wie startet der Balken-Chart?

| Wert | Bedeutung |
|:-----|:----------|
| `history` | Zeitverlauf (Balken pro Periode) |
| `ranking` | Rangliste (sortiert nach Wert) |

**`benchmark`** — Welche Linie wird hervorgehoben? (nur Line-Chart)

Geben Sie den exakten Spaltennamen an. Diese Linie wird dicker dargestellt und dient als Referenz.

### 3.3 Hinweis zu ignorierten Optionen

Optionen, die für einen Chart-Typ nicht relevant sind, werden **stillschweigend ignoriert** (kein Fehler). Beispiel: `range:5y` bei einem Tortendiagramm hat keine Wirkung.

---

## 4. Fertige Vorlagen zum Kopieren

### 4.1 Linien-Chart: Rendite-Vergleich

```html
<div class="financial-chart-module"
     data-type="line"
     data-title="Rendite-Vergleich (5 Jahre)"
     data-csv="https://www.finanzwesir.com/content/files/rendite-vergleich.csv"
     data-colors="MSCI World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
```

**Was passiert:** Zeigt einen 5-Jahres-Vergleich. Die ACWI-Linie ist dicker hervorgehoben (Benchmark). Der Leser kann den Zeitraum über Buttons wechseln.

### 4.2 Balken-Chart: Jahresrenditen

```html
<div class="financial-chart-module"
     data-type="bar"
     data-title="Jahresrenditen MSCI World"
     data-csv="https://www.finanzwesir.com/content/files/jahresrenditen.csv"
     data-colors="MSCI World: #0071BF">
</div>
```

**Was passiert:** Zeigt die Jahresrenditen als Balken. Positive Werte nach oben, negative nach unten. Zeitraum-Buttons zum Filtern.

### 4.3 Balken-Chart: Ranking-Ansicht

```html
<div class="financial-chart-module"
     data-type="bar"
     data-title="Asset-Ranking 2024"
     data-csv="https://www.finanzwesir.com/content/files/ranking.csv"
     data-colors="World: #0071BF, EM: #8D0267, Gold: #DFC805"
     data-options="view:ranking">
</div>
```

**Was passiert:** Zeigt eine sortierte Rangliste der Assets. Kein Zeitverlauf, sondern ein Snapshot.

### 4.4 Torten-Chart: Asset Allokation

```html
<div class="financial-chart-module"
     data-type="pie"
     data-title="Asset Allokation"
     data-csv="https://www.finanzwesir.com/content/files/allokation.csv"
     data-colors="Gold: #DFC805, Aktien: #0071BF, Cash: #4C4C4C">
</div>
```

**Was passiert:** Zeigt die Aufteilung als Tortenstücke. Beim Hovern erscheint der Anteil.

### 4.5 Minimal-Chart (nur Pflichtangaben)

```html
<div class="financial-chart-module"
     data-type="line"
     data-csv="https://www.finanzwesir.com/content/files/meine-daten.csv"
     data-colors="Spalte1: #0071BF">
</div>
```

**Was passiert:** Linien-Chart ohne Titel, voller Zeitraum (`max`), automatische Einheitenerkennung.

---

## 5. Checkliste vor dem Publizieren

- [ ] CSV-Datei geprüft: Semikolon-Trennung, Komma als Dezimalzeichen, ISO-Datum
- [ ] CSV-Datei hochgeladen und URL/Pfad korrekt
- [ ] `data-type` ist `line`, `bar` oder `pie` (kein Tippfehler)
- [ ] `data-colors`: Spaltennamen stimmen exakt mit CSV-Kopfzeile überein
- [ ] `data-colors`: Nur CI-Farben aus der Palette (siehe Abschnitt 2.2)
- [ ] Ghost-Vorschau: Chart rendert korrekt
- [ ] Tooltips prüfen: Werte und Einheiten korrekt?

---

## 6. Fehlerbehandlung

Die Engine ist fehlertolerant gestaltet. Wenn etwas nicht stimmt, passiert Folgendes:

| Situation | Verhalten der Engine |
|:----------|:--------------------|
| CSV nicht erreichbar | Fehlermeldung im Chart-Bereich |
| CSV-URL nicht von finanzwesir.com | Wird abgelehnt (Sicherheitsregel) |
| Falsche Farbe (z.B. `#ZZZ`) | Fallback auf Standard-Palette |
| Unbekannte Option (z.B. `mode:xyz`) | Option wird ignoriert, Standard-Verhalten |
| Fehlender Titel | Kein Titel angezeigt (kein Fallback) |
| Falsches Datumsformat | Fehlermeldung (kein Fallback!) |
| Punkt statt Komma als Dezimal | **Stille Fehlinterpretation** (10.5 → 105) |

**Die gefährlichsten Fehler** sind die stillen: Punkt als Dezimalzeichen (wird als Tausender behandelt) und falsche Spaltennamen in `data-colors` (Farben greifen nicht). Beides sieht man erst in der Vorschau.
