# APP_SPEC — prokrastinations-preis

Stand: 2026-06-16 | V2.0 — AP-02 Zeitreise-Umbau | Geändert von: Claude

---

## 1. Status

| Feld | Wert |
|---|---|
| Version | Draft V2.0 — Zeitreise-Umbau / AP-02 |
| Phase | Konzept-Umbau auf Stationen-Zeitreise (AP-01 ✅ abgeschlossen) |
| Nächster Schritt | B1-AP-04 — UX/Heldenreise-Abschnitt (AP-03 ✅ 2026-06-16) |
| Code-Freigabe | Slice 0 ✅ 2026-06-04, Slice 1 ✅ 2026-06-05, Slice 2 ✅ 2026-06-05, Slice 6 ✅ 2026-06-16; Slice 7+ erst nach Pre-Code-Gate |
| Grundlage | `Apps/prokrastinations-preis/ENTSCHEIDUNGSPROTOKOLL.md` (AP-01, 2026-06-16) |
| Ersetzt | APP_SPEC V1.7 (Ergebnisgrafik-Logik — Screen 2 zeigte vollständigen Chart mit KPIs) |

---

## 2. Zweck und Nutzerfrage

**Nutzerfrage:** „Der Zug ist doch abgefahren — oder lohnt es sich trotzdem noch?"

**Was soll die App auslösen:** Der Nutzer soll spüren, dass „heute" ein echter Entscheidungspunkt ist — nicht der zweitbeste Zeitpunkt, sondern der einzige verfügbare.

**Leitformulierung:**
> Die App macht den Satz „Die beste Zeit anzulegen war vor 10 Jahren. Die zweitbeste ist heute." als geführte historische Zeitreise erlebbar. Sie zeigt nicht sofort das Ergebnis, sondern nimmt dem Nutzer zunächst das Wissen vom Ende weg.

**Kernaussage (Ausgangspunkt):**
> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

**Kurzform:** „Warten nimmt dir Marktzeit."

**Kernsatz der Zeitreise-Logik:**
> Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung.

**Was nicht Ziel dieser App ist:**
- Keine Prognose-App
- Keine Produktempfehlung
- Kein moralischer Strafzettel / Verlustzähler-Ton als Hauptton
- Kein historischer Epochen-Fächer (das ist B2)
- Keine Kohortenanalyse
- Kein animierter Countdown als Hauptmechanik
- Keine Renditedebatte
- Keine Renditeprojektion (keine glatte 6–8 %-Zukunftskurve)

**Was diese App tut:**
- Zeigt eine echte historische 10-Jahres-Strecke auf Basis der validierten MSCI-CSV
- Beweist nicht „Zukunft wird wie Vergangenheit", sondern: Rückblick sieht einfacher aus als Echtzeit
- Führt den Nutzer als Zeitreise — Station für Station, ohne Endwissen

---

## 3. App-Familie

**Klassifizierung: Geführte historische Zeitreise mit Storytelling-Elementen [aktualisiert — AP-02, 2026-06-16, Basis: E-01 2026-05-28]**

Die neue Logik (Stationen-Zeitreise) geht über die ursprüngliche Szenario-/Vergleichs-App hinaus:
- Nutzer-Eingabe (monatliche Sparrate) — wie Calculator
- Historische Echtdaten mit echten Einbrüchen — wie Szenario-/Vergleichs-App
- Sequentielle 4-Screen-Narration mit Stationen — wie Storytelling-Dashboard
- Der Chart wächst erst mit Nutzeraktion sichtbar — wie geführte Zeitreise

| Familie | Passt weil | Passt nicht weil |
|---|---|---|
| Calculator / Rechner-App | Nutzer gibt Sparrate ein | Kein Formel-Rechner; braucht Echtdaten; kein LiveCounter als Hauptmechanik |
| Szenario-/Vergleichs-App | Daten laden → Chart → Erklärung → CTA | Der Chart erscheint nicht sofort vollständig; kein klassischer Vergleich |
| Storytelling-Dashboard | Sequentielle Screens; narrativer Flow | Kein reines Dashboard; Nutzer gibt Sparrate aktiv ein |
| Geführte Zeitreise | Chart wächst Station für Station; Nutzer kennt das Ende nicht bis Screen 3 | — |

**Entschieden (AP-02, 2026-06-16):** Geführte historische Zeitreise mit Storytelling-Elementen (4 Screens, 3 Akte).

**Pilot-Rolle (E-02, 2026-05-28):** Daten-/Chart-/Story-Pilot (Pilot-2). Pilot-1 ist `risiko-uebersetzer` (Calculator-Pilot). 05_PILOT_STRATEGY.md aktualisiert.

**Wiederverwendbare Bausteine, die dieser Pilot erzwingt:**
- CSV-Datenpipeline für historische Monatsdaten
- Stations-JSON-Pipeline für redaktionelle Haltepunkte
- Chart mit wachsender historischer Sparplan-Linie (sichtbar bis zur aktuellen Station)
- Screen-Flow-Mechanismus (4 Screens sequentiell)
- Stationstexte (Datum, Quellenlabel, Headline, Anleger-Anker)
- Stationen-Button (`Weiter investiert bleiben`)
- Mobile-Collapsible für Zwischenwerte (`Zwischenstand anzeigen`)
- Entscheidungspunkt-Marker (vertikale Linie — erst auf Screen 3)
- KpiCard (eingezahlt / Depotwert / Differenz — erst auf Screen 3)
- Slider für monatliche Sparrate
- Microcopy-Blöcke zwischen Screens

---

## 4. Bezug zur Produktlandkarte / Multi-Modul-Struktur

**Block B — Marktzeit statt Timing:**

| App | Rolle | App-Ordner |
|---|---|---|
| `prokrastinations-preis` | **Master-App** — Marktzeit-Entscheidungspunkt | `Apps/prokrastinations-preis/` |
| B2–B5 | Folge-Apps (Epochen, Depot-Kipppunkt etc.) | je eigener Ordner |

**Scope dieser Spec:** Nur `prokrastinations-preis` (B1).

**Abgrenzung zu B2 (Geburtsjahrlos):**
- B1: „Was mache ich mit dem verpassten Gestern und dem verfügbaren Heute?" → 1 historische Strecke als Zeitreise, Entscheidungspunkt
- B2: „Wie unterschiedlich liefen 30 Jahre ETF-Sparen je nach Börsenepoche?" → Kohortenvergleich, Epochen-Fächer

---

## 5. Inputs

### 5.1 Nutzer-Eingaben

| Parameter | Typ | Default | Min | Max | Einheit | Validierungsregel |
|---|---|---|---|---|---|---|
| `monatlicheRate` | Integer | 300 | 50 | 2.000 | €/Monat | Ganzzahl; außerhalb Range → Clamp |
| `startBetrag` | Integer | 0 | 0 | 50.000 | € | Optional; Ganzzahl; außerhalb Range → Clamp |

**Zeitraum:** Fix 10 Jahre (120 Monate) — kein Nutzer-Parameter. Begründung: „Vor 10 Jahren wäre besser gewesen" ist eine konkrete emotionale Aussage. Ein variabler Zeitraum verwässert die Kernbotschaft.

### 5.2 Eingabewege

| Quelle | Parameter | Zeitpunkt |
|---|---|---|
| Slider (primär) | `monatlicheRate` | laufend bei Nutzerinteraktion |
| `data-fw-options` | `defaultRate`, `startBetrag` | einmalig beim Initialisieren |
| `data-fw-data` | CSV-Datei (MSCI-Monatsdaten) | einmalig beim Laden |

### 5.3 Validierungsregeln (Two-Step-Parsing, P-02)

1. Syntaktisch: Ist der Wert eine Zahl? Integer?
2. Semantisch: Liegt der Wert im erlaubten Bereich?
3. Bei Verletzung: Clamp auf Min/Max. Kein Error-State bei normalem Slider-Betrieb.

---

## 6. Outputs

| Output | UI-Primitive | Beschreibung | Sichtbar ab |
|---|---|---|---|
| Historischer Chart (Teilansicht) | SparplanChart (wachsend) | Simulierter Sparplan-Verlauf bis zur aktuellen Station | Screen 2 |
| Historischer Chart (vollständig) | SparplanChart (komplett) | Vollständige 120-Monate-Darstellung | Screen 3 |
| Stationstext | StationCard | Datum, Quellenlabel, Headline, Anleger-Anker | Screen 2 |
| Stationen-Button | Button | `Weiter investiert bleiben` | Screen 2 |
| Mobile-Collapsible | Collapsible | `Zwischenstand anzeigen` → Eingezahlt + Depotwert damals | Screen 2 |
| Entscheidungspunkt-Marker | VertikaleLinie | Markierung bei letztem Datenpunkt | Screen 3 |
| `eingezahlt` | KpiCard | `monatlicheRate × 120 + startBetrag` | Screen 3 |
| `depotwertHeute` | KpiCard | Simulierter Depotwert am letzten Datenpunkt | Screen 3 |
| `differenz` | KpiCard | `depotwertHeute − eingezahlt` (Gewinn oder Verlust) | Screen 3 |
| AssumptionsBox | TextBlock | Historische Basis, kein Zukunftsversprechen | Screen 3 |
| Microcopy | TextBlock | Kontexttext pro Screen | je Screen |
| PrimaryCta | Button/Link | „Heute Marktzeit sammeln" oder „Ich starte jetzt" [E-04 → §21] | Screen 4 |
| A11y-Summary | ARIA Live Region | Screenreader-Zusammenfassung (→ §14) | Screen 3 |

---

## 7. Datenbedarf / Data Need Snapshot

**Externe Datenpipeline: ja.**

Diese App nutzt den zentralen Finanzwesir-Datenlayer.

Allgemeine Regeln:
- `docs/data/DATENQUELLEN-GOVERNANCE.md`
- `docs/data/SOURCE-TIERS.md`
- `docs/data/INDEX-RETURN-VARIANTEN.md`
- `docs/data/DATASET-CATALOG.md`

### 7.1 Wofür braucht die App diese Daten?

Diese App zeigt, dass Warten Marktzeit kostet.

Die Daten werden benötigt, um den Unterschied zwischen „früher investiert" und „später investiert" nicht als glatte Modellrechnung, sondern anhand eines realen oder möglichst realitätsnahen historischen Kapitalmarktpfads sichtbar zu machen.

Die App lebt davon, dass echte Marktbewegungen, Einbrüche und Erholungen in der Zeitreihe sichtbar sind.

Ohne geeignete historische Monatsdaten wird die App zu einer bloßen Renditeannahmen-Rechnung. Das ist nicht der gewünschte Effekt.

### 7.2 Ideale Datenreihe

| Feld | Wert |
|---|---|
| Datenrolle | Historische Marktreihe für Sparplan-/Marktzeit-Simulation |
| Ideale Reihe | Breiter globaler Aktienindex, monatliche Indexstände, möglichst lange Historie |
| Bevorzugter Kandidat | MSCI World Net Return |
| Datenklasse | Aktienindex |
| Frequenz | Monatlich |
| Mindestzeitraum | Mindestens 120 Monate; fachlich besser: deutlich längere Historie |
| Währung | **EUR** — Pflichtbedingung; Abweichung → App lehnt Datei ab (Error State c) [entschieden B-01-B, 2026-06-04] |
| Return-Variante | Net Return stark bevorzugt; Abweichung nur mit ausdrücklicher Freigabe (→ `docs/data/INDEX-RETURN-VARIANTEN.md`) |
| Dataset-ID | `msci-world-net-return-monthly` (→ `docs/data/DATASET-CATALOG.md`) |
| Status | in Arbeit — Quelle MSCI direkt (msci.com), Tier 0, ab 2000-12-29 [entschieden B-01-C, 2026-06-04]; Währung EUR [entschieden B-01-B, 2026-06-04]; Contract: `docs/data/contracts/msci-world-net-return-monthly.md` |
| Owner | Projektinhaber |

Hinweis: Die ideale Datenreihe beschreibt den fachlichen Wunschzustand. Sie ist nicht automatisch identisch mit der später verfügbaren produktiven Quelle.

### 7.3 Mindeststandard

Die App darf für Layout, Interaktion und Story-Flow mit Mock-Daten vorbereitet werden.

Für produktive Veröffentlichung braucht sie mindestens:

- monatliche Indexstände
- Datumswerte als Monatsultimo
- mindestens 120 Datenmonate
- konsistente Datenreihe ohne undokumentierten Variantenwechsel
- eindeutige Währung
- eindeutige Return-Variante
- dokumentierte Quelle
- keine stillschweigend gefüllten Datenlücken
- Dataset-Eintrag im `DATASET-CATALOG.md`
- Dataset Contract, sobald die Reihe produktiv verwendet wird

Nicht erforderlich: Tagesdaten, Echtzeitdaten, automatische Datenpipeline, Datenbank.

### 7.4 Nicht verwenden

Für diese App ausdrücklich nicht akzeptabel:

- frei erfundene konstante Jahresrendite als produktive Datenbasis
- ETF-Kursdaten als versteckter Ersatz für Indexdaten
- ETF-Daten, die als Indexdaten ausgegeben werden
- kurze ETF-Zeitreihe, wenn dadurch der Langfristeffekt verwässert wird
- Wechsel auf Price Return nur wegen längerer Historie ohne ausdrückliche Freigabe
- unklare Yahoo-/Investing-/Foren-Daten ohne Identitätsprüfung
- nicht dokumentierte Kombination mehrerer Datenreihen
- Interpolation fehlender Monate
- stille Währungswechsel
- stille Variantenwechsel

Begründung: Die App soll ein Marktzeit-Prinzip anhand einer nachvollziehbaren historischen Marktreihe zeigen. Eine bequeme, aber fachlich falsche Ersatzreihe würde die Aussage der App verändern.

### 7.5 Erwartetes CSV-Format

Die spätere produktive CSV muss zum bestehenden CSVParser passen.

Separator: `;` (Semikolon)
Dezimalzeichen: `,` (Komma)
Header-Zeile: Pflicht
Monatsdaten: Monatsultimo

Beispiel:
```
date;index_value
2002-01-31;1234,56 EUR
2002-02-28;1256,78 EUR
2002-03-29;1189,34 EUR
```

Pflicht-Spalten: `date` (String `YYYY-MM-DD`) und `index_value` (Komma-Dezimal)
Mindestlänge: 120 Datenzeilen (ohne Header)

Regeln:
- Semikolon als Trennzeichen
- Komma als Dezimalzeichen
- Header-Zeile Pflicht
- `date` im Format YYYY-MM-DD, entspricht Monatsultimo
- `index_value` enthält den Indexstand mit Währungssuffix `EUR` (Pflicht — Redakteur-Verantwortung; ohne Suffix lehnt die App die Datei mit Error State (c) ab)
- keine Kommentarzeilen
- keine Leerzeilen innerhalb der Daten
- keine Änderung an `CSVParser.js`
- keine Änderung an `FinanzwesirData.js`

Interne JS-Konvention: Nach erfolgreicher Validierung darf `index_value` app-intern auf `indexValue` gemappt werden (snake_case → camelCase beim Übergang CSV → AppData, → §15).

> **Guardrail (→ D-APP-01-B01):** Diese CSV-Entscheidung gilt ausschließlich für diese externe MSCI-Datendatei (`data-fw-data`). JSON bleibt für `data-fw-options`, interne JavaScript-Objekte, AppContext, Registry/Manifest und alle anderen App-Fabrik-Zwecke zulässig. Kein pauschales JSON-Verbot.

### 7.6 Produktive Anbindung

| Feld | Wert |
|---|---|
| Produktiver CSV-Pfad | `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv` [entschieden AP-DATA-05, 2026-06-04] |
| Dataset Contract | `docs/data/contracts/msci-world-net-return-monthly.md` ✅ angelegt 2026-06-04 |
| Catalog-Eintrag | `docs/data/DATASET-CATALOG.md` |
| Einbindung in Ghost | `data-fw-data` (Ghost-Card-Attribut) |
| URL (Ziel) | `https://www.finanzwesir.com/content/files/[Dateiname nach AP-DATA-05]` [nach Upload] |
| Datenstatus für App-Bau | Mock-Daten erlaubt; produktive Daten offen |
| Zeitraum | Mindestens 120 Monate; letzter Eintrag = letzter vollständig verfügbarer Monat |

Cache-Busting: Versionsparameter in URL `?v=2026-05` oder versionierter Dateiname.
Dev-Ausnahme: `localhost`/`127.0.0.1` erlaubt, als Dev-Ausnahme dokumentiert.

> **Datenhoheit:** Der Projektinhaber (Albert Warnecke) erstellt und pflegt die CSV redaktionell. Claude verarbeitet nur freigegebene Datasets (→ `docs/data/DATENQUELLEN-GOVERNANCE.md`).

### 7.7 Was Claude vor dem Bau klären muss

Wenn die App implementiert oder produktiv gemacht werden soll, muss Claude den Projektinhaber fragen bzw. prüfen:

- Liegt bereits eine CSV-Datei vor?
- Wenn ja: Wo liegt sie? Welche Indexreihe ist enthalten? Welche Return-Variante? Welche Währung? Welcher Zeitraum? Ist die Quelle dokumentiert?
- Gibt es einen Dataset-Catalog-Eintrag?
- Gibt es bereits einen Dataset Contract?
- Darf die App mit dieser Datenreihe produktiv gebaut werden oder nur mit Mock-Daten?

Claude darf diese Entscheidungen nicht selbst treffen. Insbesondere darf Claude nicht eigenmächtig entscheiden: Quelle, Währung, Return-Variante, Wechsel auf ETF-Daten, Wechsel auf Price Return, Interpolation fehlender Monate.

### 7.8 Wie Claude eine vorhandene CSV prüfen soll

Wenn eine CSV-Datei bereits vorliegt, prüft Claude vor Verwendung:

**Formale Prüfung**
- Datei ist erreichbar
- Header ist vorhanden
- Spalten `date` und `index_value` sind vorhanden
- Trennzeichen ist Semikolon
- Dezimalzeichen ist Komma
- Datumsformat ist YYYY-MM-DD
- Keine Leerzeilen innerhalb der Daten
- Keine Kommentarzeilen

**Zeitreihenprüfung**
- Alle Datumswerte sind Monatsultimo
- Keine doppelten Monate
- Keine fehlenden Monate innerhalb des dokumentierten Zeitraums
- Mindestens 120 Datenzeilen
- Letzter Datenpunkt ist plausibel dokumentiert

**Fachliche Prüfung**
- Datenklasse ist Index, nicht ETF
- Indexname ist dokumentiert
- Return-Variante ist dokumentiert
- Währung ist dokumentiert
- Quelle ist dokumentiert
- Keine erkennbaren Varianten- oder Währungswechsel innerhalb der Reihe

**Ergebnis:** Claude meldet danach knapp:
- CSV formal ok / nicht ok
- Zeitreihe ok / nicht ok
- Fachliche Dokumentation ok / nicht ok
- Offene Punkte
- Darf verwendet werden als: Mock / Kandidat / produktiv nur nach Freigabe

Claude repariert die CSV nicht eigenmächtig.

### 7.9 Pflegehinweis

Normaler späterer Update-Fall:

1. Produktive CSV öffnen
2. Neue Monatswerte unten ergänzen
3. Spaltennamen unverändert lassen
4. Format unverändert lassen
5. Keine historischen Werte ändern, außer bewusst dokumentierte Korrektur
6. Dataset Contract aktualisieren
7. Dataset Catalog prüfen
8. App lokal öffnen und visuell prüfen
9. `CSVParser.js` und `FinanzwesirData.js` nicht anfassen

Typischer Umfang: ca. 12 neue Monatswerte pro Jahr, manuelle redaktionelle Pflege durch den Projektinhaber. Keine Echtzeitpipeline, keine Datenbank.

### 7.10 App-spezifische Regeln / Berechnung

Die App verwendet die Indexreihe zur Sparplan-Simulation.

Anteilslogik [entschieden — B-02, 2026-05-28]:

```
Startanteile = startBetrag / indexValue[0]

Für jeden Monat t:
  Anteile += monatlicheRate / indexValue[t]
  depotwert[t] = Anteile × indexValue[t]
```

> **Hinweis:** `indexValue[t]` ist hier mathematische Formelnotation. Der externe CSV-Spaltenname bleibt `index_value`; intern darf nach Validierung auf `indexValue` normalisiert werden (→ §15).

App-spezifische Verbote:
- keine Produktempfehlung
- keine exakte ETF-Sparplan-Simulation
- kein ETF-Proxy als Indexersatz
- kein Wechsel auf Price Return wegen längerer Historie ohne ausdrückliche Freigabe
- keine Interpolation fehlender Monate
- keine eigene Parserlogik
- keine Änderung am CSVParser

---

## 8. Zwei-Datenschichten-Architektur

Die App verwendet zwei getrennte Datenquellen. Beide müssen vorhanden und valide sein, bevor der Content-State erreicht wird.

| Datensorte | Format | Pfad | Zweck |
|---|---|---|---|
| MSCI-World-Monatsdaten | CSV | `data-fw-data` (Ghost-Card) | Sparplanberechnung und Chartwerte |
| Stationenbibliothek | JSON | `Apps/prokrastinations-preis/config/stations.de.json` | redaktionelle Haltepunkte der Zeitreise |

**CSV bleibt CSV.** Regeln aus §7 gelten unverändert.

**Stationen-JSON ist neu.** Der detaillierte Vertrag (Felder, Enums, Flags, Quellenstatus, Validierungsregeln) ist in `STATIONS_CONFIG_CONTRACT.md` dokumentiert.

**Redaktionelle Kontrolle:**
Claude darf die redaktionellen Stationen nicht eigenmächtig erfinden, erweitern oder umpriorisieren. Claude lädt die freigegebene JSON-Konfiguration, validiert sie gegen den Vertrag (STATIONS_CONFIG_CONTRACT.md) und rendert sie.

**Fehlerfall Stations-JSON:**
- JSON nicht erreichbar / nicht parsebar → Error-State (d) oder Fallback auf einen definierten Minimalzustand (STATIONS_CONFIG_CONTRACT.md §12)
- JSON valide, aber kein Station im aktiven Fenster → definierten Fallback-State (STATIONS_CONFIG_CONTRACT.md §12)

> **Guardrail:** Depotwerte je Station (Eingezahlt, Depotwert damals) werden aus der Sparplanberechnung abgeleitet, nicht in der JSON gepflegt.

---

## 9. Rolling-Window-Regel

**Beschlossen: Rolling Window aus `latestMonth`, kein fester Zeitraum.**

Das Tagesdatum bestimmt das Chart-Fenster nicht. Die verfügbare und validierte CSV-Datenreihe bestimmt es.

```
latestMonth  = letzter vollständig verfügbarer Datenmonat der CSV
startMonth   = latestMonth − 119 Monate
periodMonths = 120
```

**Stationen-Fenster:**
Eine Station wird nur angezeigt, wenn ihr `date`-Wert innerhalb `[startMonth, latestMonth]` liegt. Stationen außerhalb des Fensters werden übersprungen, nicht angezeigt, nicht als Fehler gewertet.

**Finaler Reveal:**
Der dynamische finale Reveal (`dynamic_latest_month`) kommt aus dem letzten validen CSV-Eintrag. Er ist keine redaktionelle Station, sondern wird automatisch erzeugt.

**Konsequenz:** Die App veraltet nicht, wenn die CSV gepflegt wird. Ein fester Zeitraum (z.B. 2015–2024) würde die App künstlich altern lassen und wurde verworfen (→ ENTSCHEIDUNGSPROTOKOLL.md §8).

---

## 10. Ghost-Card-Vertrag

Gemäß `docs/spec/APP-INTERFACE.md` §3.1.

**Minimal-Card:**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="https://www.finanzwesir.com/content/files/[Dateiname nach AP-DATA-05]">
</div>
```

**Card mit Redakteur-Override (optional):**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="https://www.finanzwesir.com/content/files/[Dateiname nach AP-DATA-05]"
     data-fw-options="defaultRate:500">
</div>
```

**Verboten in dieser Card:**
- Kein `data-app` (veralteter Namespace)
- Kein `data-fw-theme` (reserviert, nicht produktiv)
- Kein freies JSON in `data-fw-options`
- Keine URLs außerhalb erlaubter Domains

**Unterschied zur alten Spec:** Die neue Card hat zwingend `data-fw-data` für die CSV-Datendatei. Die alte Calculator-App hatte keine externe Datenquelle. Die Stations-JSON wird intern geladen, nicht über Ghost-Card-Attribute.

---

## 11. data-fw-options-Whitelist

| Key | Typ | Default | Min | Max | Fallback bei ungültigem Wert |
|---|---|---|---|---|---|
| `defaultRate` | Integer | 300 | 50 | 2.000 | 300 (interner Default) |
| `startBetrag` | Integer | 0 | 0 | 50.000 | 0 (interner Default) |

Unbekannte Keys: stillschweigend ignoriert (Whitelist-Prinzip, APP-INTERFACE.md §5).
Die Datenbasis kommt aus `data-fw-data`, nicht aus `data-fw-options`.

---

## 12. State-Modell

```
Init
  ├─ Slug-Prüfung: ungültig                    → Error (a)
  └─ loadData(data-fw-data) + loadStations()   → Loading
       ├─ CSV: ≥ 120 valide Datenpunkte, unitKey = CURRENCY_EUR
       │    └─ Stations-JSON: laden + validieren
       │         ├─ latestMonth aus CSV bestimmen
       │         ├─ startMonth = latestMonth − 119 Monate
       │         ├─ Stationen auf aktives Fenster filtern
       │         ├─ aktive Stationen sortieren
       │         ├─ finalen Reveal aus CSV erzeugen
       │         └─ Content
       ├─ Error (b)  (URL ungültig / Domain-Lock / CSV nicht parsebar)
       ├─ Error (c)  (CSV parsebar, unitKey ≠ CURRENCY_EUR)
       └─ Empty      (CSV valide aber < 120 Zeilen oder Pflichtfelder fehlen)
```

| State | Bedingung | Ausgabe für Nutzer |
|---|---|---|
| Loading | Daten werden geladen | Lade-Indikator (Skeleton oder Spinner), kein leerer Container |
| Content | CSV und Stations-JSON geladen und valide | Screen-Flow 1→2→3→4 mit wachsendem Chart, Stationstexten, KpiCards, CTA |
| Error (a) | Ungültiger `data-fw-app`-Slug | „Diese App konnte nicht geladen werden. Bitte App-Konfiguration prüfen." — `textContent`, kein Stacktrace |
| Error (b) | URL ungültig / Domain-Lock / CSV nicht parsebar | „Daten konnten nicht geladen werden. Bitte Seite neu laden." — `textContent`, kein Stacktrace |
| Error (c) | CSV parsebar, aber `unitKey ≠ CURRENCY_EUR` (kein oder falscher Währungssuffix) | „Datenreihe hat keine oder ungültige Währungsangabe. Erwartet: EUR." — `textContent`, kein Stacktrace |
| Empty | CSV valide, aber < 120 Datenzeilen oder Pflichtfelder fehlen | „Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen." — `textContent`, kein Stacktrace |

**Ungültige `data-fw-options`-Werte:** Fallback auf internen Default, kein Error-State.

**Stations-JSON-Fehler:** Fallback-Konzept: STATIONS_CONFIG_CONTRACT.md §12. Technische Implementierung folgt in Coding-AP.

---

## 13. AppContext-Schema

**Wer erzeugt AppContext:** `MarketTimeStrategy` nach Datenladen und bei jeder Nutzer-Eingabe.
**Wer konsumiert AppContext:** Renderer (SparplanChart, KpiCards, TextBlocks, StationCards, A11y-Output, PrimaryCta).
**Invariante (P-04):** Renderer interpretieren keine Rohdaten — sie lesen ausschließlich AppContext.

### 13.1 Statischer Kern (einmalig nach Datenladen gesetzt)

```js
{
  valueMode: 'currency',
  currency: 'EUR',             // abgeleitet aus validiertem unitKey (CURRENCY_EUR → 'EUR') — nicht hardcoded blind
  locale: 'de-DE',
  periodMonths: 120,               // fest: 10 Jahre
  msciData: [...],                 // read-only Array, ≥ 120 Einträge
  latestMonth: '<letzter Datenmonat aus CSV>',     // dynamisch aus letztem validen Datenpunkt
  startMonth:  '<latestMonth minus 119 Monate>',   // dynamisch aus latestMonth abgeleitet
  activeWindow: {
    startMonth,
    latestMonth,
    periodMonths: 120
  },
  stations: [...],                 // gefilterte, sortierte Stationen im aktiven Fenster
}
```

### 13.2 Dynamische Schale (nach jeder Nutzer-Eingabe aktualisiert)

```js
{
  monatlicheRate: 300,             // Integer, €/Monat, validiert
  startBetrag:    0,               // Integer, €, validiert

  chartSeries: [                   // simulierter Depotwert für alle 120 Monate (reine Zahlen)
    { month: '<startMonth>', depotwert: 300 },
    ...
    { month: '<latestMonth>', depotwert: 52000 }
  ],
  eingezahlt:      36000,          // monatlicheRate × 120 + startBetrag
  depotwertHeute:  52000,          // letzter Punkt in chartSeries
  differenz:       16000,          // depotwertHeute − eingezahlt

  resultTone:   'neutral',         // V1.0: immer 'neutral'
  a11ySummary:  'Wer vor 10 Jahren 300 € monatlich investiert hätte, hätte heute 52.000 € — bei 36.000 € eingezahlt.'
}
```

### 13.3 Stations-Zustand (während Screen 2 verwaltet)

```js
{
  activeStationIndex: 0,           // Index in stations[]
  activeStation: { ... },          // aktuelle Station-Objekt
  visibleChartSeries: [...],       // Teilmenge von chartSeries bis zur aktuellen Station
  isJourneyComplete: false,        // true nach letzter Station → Screen 3 freigeben
  stationIntermediate: {
    paidIn: 5400,                  // Eingezahlt bis zu dieser Station (berechnet, nicht aus JSON)
    portfolioValueAtStation: 4900  // Depotwert an Stations-Datum (berechnet, nicht aus JSON)
  }
}
```

**Wichtig:**
- `visibleChartSeries` ist für Screen 2 nur der bis zur aktuellen Station sichtbare Ausschnitt.
- `chartSeries` (vollständig) wird erst für Screen 3 verwendet.
- Die endgültige technische Definition der Station-Objekte ist in STATIONS_CONFIG_CONTRACT.md §5–§7 dokumentiert.

### 13.4 Pflichtfelder und Fallbacks

| Feld | Pflicht | Fallback wenn fehlt |
|---|---|---|
| `valueMode` | ✅ | `'currency'` |
| `currency` | ✅ | `'EUR'` |
| `locale` | ✅ | `'de-DE'` |
| `periodMonths` | ✅ | 120 |
| `msciData` | ✅ | Empty-State |
| `latestMonth` | ✅ | letzter Eintrag aus `msciData` |
| `startMonth` | ✅ | berechnet aus `latestMonth − 119` |
| `activeWindow` | ✅ | aus `latestMonth` und `startMonth` |
| `stations` | ✅ | Empty-Journey-State (AP-03 definiert) |
| `monatlicheRate` | ✅ | 300 |
| `startBetrag` | ✅ | 0 |
| `chartSeries` | ✅ | Empty-State wenn Berechnung fehlschlägt |
| `visibleChartSeries` | ✅ | leer bis erste Station |
| `activeStationIndex` | ✅ | 0 |
| `isJourneyComplete` | ✅ | false |
| `eingezahlt` | ✅ | 0 |
| `depotwertHeute` | ✅ | 0 |
| `differenz` | ✅ | 0 |
| `resultTone` | ✅ | `'neutral'` |
| `a11ySummary` | ✅ | `'Ergebnis wird berechnet.'` |

---

## 14. A11y-Vertrag

### 14.1 ARIA Live Region

```html
<div aria-live="polite"
     aria-atomic="true"
     data-fw-role="a11y-result"
     class="visually-hidden">
  Wer vor 10 Jahren 300 € monatlich investiert hätte, hätte heute 52.000 € — bei 36.000 € eingezahlt.
</div>
```

- `aria-live="polite"` — unterbricht keine laufende Sprachausgabe
- `aria-atomic="true"` — vollständige Nachricht wird vorgelesen
- Aktualisierung nach Slider-Release und nach Screen-3-Eintritt (kein Screenreader-Spam)

### 14.2 Chart-Accessibility

- Chart hat `role="img"` mit `aria-label` oder `<figure>` mit `<figcaption>`
- Figcaption enthält Textzusammenfassung: Zeitraum, Sparrate, sichtbarer Ausschnitt (Screen 2) bzw. Gesamtergebnis (Screen 3)
- Datentabelle als ergänzende Alternative: [TBD — ob für Pilot nötig]

### 14.3 Slider

- Sichtbares `<label>` mit `for`-Attribut
- `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- Beispiel: `aria-valuetext="300 Euro pro Monat"`

### 14.4 KpiCards

- `<dl>` mit `<dt>` (Label) und `<dd>` (Wert) oder `<div role="group" aria-label="...">`
- Werte mit Einheit: „52.000 €", nicht „52.000"

### 14.5 Stationen (Screen 2)

- Stationsbutton (`Weiter investiert bleiben`) ist ein `<button>`, kein `<a>`
- Button-Label enthält handlungsbezogenen Text, kein „Weiter"
- Stationstext hat sichtbare semantische Überschrift
- Mobile-Collapsible: `<details>` / `<summary>` oder ARIA-Expand-Pattern; `summary` = „Zwischenstand anzeigen"
- Nach Stationswechsel: Fokus auf neue Stations-Überschrift setzen

### 14.6 prefers-reduced-motion

- Chart-Draw-Animation zwischen Stationen deaktiviert → direkt zur nächsten Station springen (kein Zwischen-Zustand)
- Screen-Flow-Übergänge deaktiviert → direkt Zielzustand
- Kein automatisches Warten, keine erzwungene Pause

### 14.7 Screen-Flow-Navigation

- Jeder Screen hat eine sichtbare `<h2>`-Überschrift
- Fokus-Management bei Screen-Wechsel: Fokus auf neue Überschrift setzen
- Tastatur-Navigation: alle 4 Screens erreichbar (Tab, Enter)
- Screen 2: Stationen-Button per Tastatur (Enter/Space) aktivierbar

---

## 15. Reise eines Inputs / Datenpunkts

**Pflichtabschnitt nach P-10.**

**Beispiel:** CSV-Datei geladen, Nutzer stellt monatlicheRate = 300 € ein.

### Schritt 1 — Eingang

**Quelle A — data-fw-data (Ghost-Card):**
URL wird als String gelesen. Domain-Validierung: muss `finanzwesir.com` enthalten.

**Quelle B — data-fw-options:**
String `"defaultRate:300"` → geparst zu `{ defaultRate: 300 }`, gegen Whitelist geprüft.

**Quelle C — UI-Slider:**
`input`-Event liefert `event.target.value = "300"` als DOM-String.

**Quelle D — Stations-JSON (intern):**
Pfad `config/stations.de.json` → fetch → validieren gegen AP-03-Vertrag → aktive Stationen filtern.

### Schritt 2 — Parsing und Validierung

**CSV-Daten:**
```js
const csvText = await fetch(validatedUrl).then(r => r.text());
// Hat csvText eine Header-Zeile mit 'date' und 'index_value'?
// Hat es ≥ 120 Datenzeilen (ohne Header)?
// Ist jeder index_value-Wert als Komma-Dezimal parsebar?
//   parseFloat(v.replace(',', '.'))
// Fehler → Error-State (b) oder Empty-State
```

**Nutzer-Eingabe monatlicheRate:**
```js
const parsed  = parseInt(event.target.value, 10);     // "300" → 300
const clamped = Math.min(2000, Math.max(50, parsed));  // 300 — innerhalb Range
```

### Namenskonvention / Mapping

**Namenskonvention / Mapping:**
- CSV-Vertrag: `date`, `index_value` (snake_case, tool-neutral für Excel/Python/DuckDB/Validierung).
- Interne AppData-Domainobjekte: `date`, `indexValue` (camelCase, JavaScript-konform).
- Beim Übergang von validierter CSV zu AppData wird `index_value` explizit zu `indexValue` gemappt.
- Ab AppData arbeitet Strategie-Code mit `indexValue`.

### Schritt 3 — Read-only AppData (P-01)

```js
const appData = Object.freeze({
  monatlicheRate: 300,
  startBetrag:    0,
  msciData:       validatedRows.map(row => ({
    date:       row.date,
    indexValue: row.index_value     // snake_case → camelCase beim Übergang CSV → AppData
  }))
});
```

### Schritt 4 — MarketTimeStrategy (reine Zahlen, P-05)

```js
// Anteilslogik (entschieden — B-02, 2026-05-28)
let anteile = appData.startBetrag / appData.msciData[0].indexValue;
const chartSeries = appData.msciData.map(p => {
  anteile += appData.monatlicheRate / p.indexValue;
  return { month: p.date.slice(0, 7), depotwert: anteile * p.indexValue };
});
const eingezahlt     = appData.monatlicheRate * 120 + appData.startBetrag;
const depotwertHeute = chartSeries[119].depotwert;
const differenz      = depotwertHeute - eingezahlt;
// Keine Formatierung in Strategy — nur Zahlen.
```

### Schritt 5 — AppContext befüllen (P-04)

```js
const appContext = {
  ...staticContext,
  monatlicheRate, startBetrag,
  chartSeries, eingezahlt, depotwertHeute, differenz,
  resultTone: 'neutral',
  a11ySummary: `Wer vor 10 Jahren ${monatlicheRate} € monatlich investiert hätte, hätte heute ${fmt(depotwertHeute)} — bei ${fmt(eingezahlt)} eingezahlt.`
};
```

### Schritt 6 — Renderer (P-05)

```js
const fmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

// Screen 2: visibleChartSeries (Teilmenge bis aktiver Station) → SparplanChart
// Screen 3: chartSeries (vollständig) → SparplanChart
// KpiCard: fmt.format(depotwertHeute)  → "52.000 €"  (nur Screen 3)
// KpiCard: fmt.format(eingezahlt)      → "36.000 €"  (nur Screen 3)
// KpiCard: fmt.format(differenz) mit Vorzeichen → "+16.000 €"  (nur Screen 3)
```

### Schritt 7 — A11y-Ausgabe (P-08)

```js
a11yRegion.textContent = appContext.a11ySummary;
slider.setAttribute('aria-valuenow', '300');
slider.setAttribute('aria-valuetext', '300 Euro pro Monat');
```

---

## 16. UX/UI-Primitiven

### 16.1 Screen-Flow (3 Akte, 4 Screens)

Die App ist kein Single-Screen-Calculator. Sie führt den Nutzer als geführte Zeitreise durch 4 sequentielle narrative Screens.

| Screen | Akt | Neue Funktion | Hauptelement |
|---|---|---|---|
| 1 — Frage / Teleportation | Akt 1: Aufbruch | Nutzer personalisiert die Reise und springt 10 Jahre zurück | Slider + Subtext + Teleportationsbutton |
| 2 — Zeitreise | Akt 2: Reise | Nutzer erlebt die historische Strecke ohne Endwissen | wachsender SparplanChart + Stationstexte + Button |
| 3 — Rückblick / Reveal | Akt 3: Rückkehr | Jetzt erst erscheint der vollständige Rückblick | vollständiger SparplanChart + KPI-Cards + AssumptionsBox |
| 4 — Entscheidung | Akt 3: Transfer | Erkenntnis wird auf heute übertragen | Microcopy + PrimaryCta, keine Prognosekurve |

**Harte Grenzen:**
- Screen 2 zeigt **nicht** den vollständigen Chart.
- Screen 2 zeigt **keine** finalen KPI-Cards.
- Screen 2 zeigt **keine** Zukunftsvorschau.
- Screen 3 ist der **erste** vollständige Rückblick.
- Screen 4 enthält **keine** Prognosekurve.
- Finale KPI-Cards erscheinen **erst nach Abschluss der Zeitreise** auf Screen 3.

### 16.2 Screen-Texte

**Screen 1 — Frage / Teleportation:**

Headline:
```
Vor 10 Jahren war der beste Zeitpunkt. Aber wie hätte sich das damals angefühlt?
```

Subtext:
```
Wir springen 10 Jahre zurück. Du nimmst deine Monatsrate mit — aber nicht das Wissen von heute.
```

Button:
```
10 Jahre zurückspringen
```

**Screen 3 — Rückblick / Reveal:**

Empfohlene Headline:
```
Jetzt erst sieht es einfach aus.
```

Empfohlener Text:
```
Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.
```

**Screen 4 — Entscheidung:**

Empfohlene Headline:
```
Heute beginnt wieder ein Chart, dessen Ende niemand kennt.
```

Empfohlener Text:
```
Die letzten 10 Jahre sehen im Rückblick leichter aus, als sie sich unterwegs angefühlt hätten. Die nächsten 10 Jahre werden anders schwierig sein. Aber sie beginnen genauso: ohne fertigen Chart.
```

CTA-Kandidaten: [redaktionell zu bestätigen — E-04 → §21]
```
Meine nächsten 10 Jahre starten
```
oder
```
Heute Marktzeit sammeln
```

### 16.3 UI-Primitive-Liste

| Primitive | Zweck | Sichtbar ab | Status |
|---|---|---|---|
| Slider | monatliche Sparrate (Haupt-Eingabe) | Screen 1 | zu bauen |
| Teleportationsbutton | Screen 1 → Screen 2 | Screen 1 | zu bauen |
| SparplanChart (wachsend) | Teilansicht bis aktuelle Station | Screen 2 | zu bauen |
| StationCard | Datum, Quellenlabel, Headline, Anleger-Anker | Screen 2 | zu bauen |
| Stationen-Button | `Weiter investiert bleiben` | Screen 2 | zu bauen |
| Mobile-Collapsible | `Zwischenstand anzeigen` → Eingezahlt + Depotwert damals | Screen 2 | zu bauen |
| Draw-Animation | Chart wächst zur nächsten Station | Screen 2 | zu bauen |
| SparplanChart (vollständig) | 120-Monate-Gesamtverlauf | Screen 3 | zu bauen |
| VertikaleLinie | Entscheidungspunkt-Marker bei letztem Datenpunkt | Screen 3 | zu bauen |
| KpiCard | eingezahlt / depotwertHeute / differenz | Screen 3 | zu bauen |
| AssumptionsBox | Pflichthinweis: Vergangenheit ≠ Garantie | Screen 3 | zu bauen |
| TextBlock | Microcopy pro Screen | je Screen | zu bauen |
| PrimaryCta | Handlungsaufruf | Screen 4 | zu bauen |
| ErrorState | Fehlermeldung auf Deutsch | jederzeit | zu bauen |
| LoadingSkeleton | Platzhalter während Datenladen | Loading | zu bauen |

### 16.4 Screen-Übergänge und Stationen-Mechanik

**Screen-Übergänge:** Button-getrieben [entschieden — B-03, 2026-05-28]
Screens 1→2→3→4 per sichtbarem Button oder Tastatur (Enter/Space). Kein Autoplay. Kein Scroll-Trigger in V1.

**Stationen-Mechanik (Screen 2):**
- Der Nutzer löst den Schritt zur nächsten Station aktiv aus (Stationen-Button).
- Der Chart wächst bis zur nächsten Station (Draw-Animation).
- Zwischen Stationen gibt es kein passives Autoplay und keine erzwungene Wartezeit.
- Nach der letzten Station erscheint Screen 3 (Reveal).

**Reduced Motion:**
- Draw-Animation zwischen Stationen: deaktiviert bei `prefers-reduced-motion` → sofort zur nächsten Station
- Screen-Flow-Übergänge: deaktiviert → direkt Zielzustand

### 16.5 Label-Konventionen (Krug — Alltagssprache)

| Intern | UI-Label | Begründung |
|---|---|---|
| `monatlicheRate` | „Ich spare monatlich" / „Monatsrate" | handlungsbezogen, Ich-Form |
| `startBetrag` | „Startbetrag (optional)" | ehrlich optional halten |
| `eingezahlt` | „Eingezahlt" | direkt |
| `depotwertHeute` | „Depotwert heute" | konkret, zeitbezogen |
| `differenz` | „Gewinn / Verlust" | wertneutral, beide Richtungen möglich |
| `paidIn` (Station) | „Eingezahlt" | identisch mit Gesamt-KPI |
| `portfolioValueAtStation` | „Depotwert damals" | zeitlich verankert |

---

## 17. Verbotene Visuals und Dark-Pattern-Grenzen

Diese Regeln sind absolut. Kein Einzelfall-Override ohne Albert-Freigabe und ENTSCHEIDUNGSPROTOKOLL-Eintrag.

**Verbotene Visuals:**
- Rote Chart-Linie
- Rotes Segment für Crashphasen
- Rote Verlustzahlen
- Alarmfarben für Drawdowns
- Visuelle Panikcodierung jeder Art
- Vollständiger Chart auf Screen 2 (Endwissen-Verbot)
- KPI-Cards auf Screen 2 (Endwissen-Verbot)
- Gestrichelte Vorschau auf spätere Daten

**Verbotene Dark Patterns:**
- Countdown / tickende Uhr
- Fake-Urgency
- Beschämende Texte
- Zukunftsprognose als Chart oder Zahl
- Fortgeschriebene Linie in die Zukunft

**Begründung:** Die App soll Unsicherheit fühlbar machen, aber ruhig bleiben. Der Chart ist Beweis, nicht Warnschild. Rote Panikcodierung würde die Botschaft invertieren und den Nutzer abstoßen statt zu überzeugen.

---

## 18. Sicherheitsregeln

Aus APP-INTERFACE.md §7 und SECURITY-BASELINE.md:

1. **Alle `data-*` Attribute sind untrusted input** — ohne Ausnahme.
2. **URL-Validierung (data-fw-data):** Domain muss `www.finanzwesir.com` enthalten. Dev-Ausnahme: `localhost`/`127.0.0.1`. Fehlschlag → Error-State (b), kein Crash.
3. **SafeDOM (Q-01):** KpiCard-Werte, TextBlocks, A11y-Summary — ausschließlich `textContent`. Niemals `innerHTML` für Nutzdaten.
4. **CSV validieren:** Format, Pflichtfelder, Mindestlänge (≥ 120). Fehler → Empty-State oder Error-State.
5. **Whitelist-Prinzip (Q-02):** Unbekannte `data-fw-options`-Keys werden ignoriert. Unbekannter Slug → Error-State (a).
6. **Keine externen Scripts.** Alle Abhängigkeiten lokal gebündelt.
7. **Keine geheimen Tokens.** Kein API-Key, keine Credentials in Code oder Config.
8. **Empty-State statt Crash.** Ungültige Daten → sauberer Fehlerzustand, kein Stacktrace für Endnutzer.
9. **XSS-Schutz:** Optionswerte werden als Zahlen geparst — keine String-Injektion. Chart-Datenpunkte kommen aus validierter CSV, nicht aus DOM-Input.
10. **`data-fw-theme` nicht verwendet** — reserviert, nicht produktiv einsetzen.
11. **Stations-JSON:** Textinhalte aus stations.de.json werden als `textContent` gerendert, niemals als `innerHTML`.

**Security-Sync-Status:** synchron mit Nicht-Blockern.

---

## 19. Testfälle

### Ghost-Card und Datenladen

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-01 | Minimal-Card mit gültiger `data-fw-data`-URL | Loading → Content (Screen 1 sichtbar) |
| T-02 | Ungültiger `data-fw-app`-Slug | Error-State (a), nutzerfreundliche Meldung auf Deutsch |
| T-03 | `data-fw-data`-URL mit ungültiger Domain | Error-State (b) |
| T-04 | `data-fw-data`-URL unerreichbar (404, Netzwerkfehler) | Error-State (b) |
| T-05 | CSV nicht parsebar (fehlende Header / ungültige Struktur) | Error-State (b) |
| T-06 | CSV < 120 Datenzeilen | Empty-State |
| T-07 | CSV mit fehlender oder leerer `index_value`-Spalte | Empty-State |
| T-07a | CSV ohne Währungssuffix in `index_value` (`unitKey = UNIT_NONE`) | Error-State (c), Meldung auf Deutsch |
| T-07b | CSV mit USD-Suffix statt EUR (`unitKey = CURRENCY_USD`) | Error-State (c), Meldung auf Deutsch |
| T-08 | Unbekannter Key in `data-fw-options` | Ignoriert, App normal |
| T-09 | `defaultRate:abc` (ungültiger Typ) | Fallback auf Default (300) |
| T-10 | XSS-Versuch in `data-fw-options` (`defaultRate:<script>`) | NaN → Fallback; kein Script-Aufruf |

### Stations-JSON

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-11a | Stations-JSON lädt korrekt | aktive Stationen vorhanden, Screen 2 startet |
| T-11b | Stations-JSON nicht erreichbar | Fallback-State (AP-03 definiert Verhalten) |
| T-11c | Station außerhalb des aktiven CSV-Fensters | Station wird nicht angezeigt, kein Fehler |
| T-11d | Alle Stationen außerhalb des Fensters | Fallback-State (AP-03 definiert Verhalten) |
| T-11e | `source_claimed_unchecked`-Station im Produktionsmodus | Redaktions-Gate schlägt an (→ §20) |

### Slider-Interaktion und Berechnung

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-12 | Slider monatliche Rate bewegen | visibleChartSeries und stationIntermediate aktualisieren sich |
| T-13 | Slider auf Maximalwert (2.000 €) | Berechnung korrekt, kein Crash |
| T-14 | Slider auf Minimalwert (50 €) | Berechnung korrekt |

### Screen-Flow und Zeitreise

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-15 | Screen-Flow 1→2→3→4 vollständig durchlaufen | Alle 4 Screens erreichbar, Inhalte korrekt |
| T-16 | Screen 2 — Chart nur Teilansicht | Chart zeigt nur Daten bis zur aktuellen Station |
| T-17 | Screen 2 — keine KPI-Cards sichtbar | KPI-Cards erscheinen nicht vor Screen 3 |
| T-18 | Screen 2 — Stationen-Button ausgelöst | Chart wächst zur nächsten Station |
| T-19 | Screen 3 — erstmals vollständiger Chart | Vollständiger Chart erscheint mit KPI-Cards |
| T-20 | Screen 3 — Entscheidungspunkt-Marker | VertikaleLinie bei letztem Datenpunkt sichtbar |
| T-21 | Screen 4 — keine Prognose | Kein Zukunftschart, keine fortgeschriebene Linie |

### Mobile-Collapsible

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-22 | `Zwischenstand anzeigen` per Tap | Depotwerte erscheinen: Eingezahlt + Depotwert damals |
| T-23 | Werte kommen aus Berechnung, nicht aus JSON | Berechnete Werte korrekt (monatlicheRate × Monate) |
| T-24 | Collapsible per Tastatur bedienbar | Enter/Space öffnet und schließt |

### Visuals und Dark-Pattern-Check

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-25 | Chart-Farben auf rote Crash-Codierung prüfen | Keine roten Segmente, Linien oder Verlustzahlen |
| T-26 | Screen 2 auf vollständigen Chart prüfen | Chart zeigt nur Teilansicht bis zur Station |
| T-27 | Screen 4 auf Prognosekurve prüfen | Keine fortgeschriebene Linie, keine Zukunftsdaten |

### State-Tests

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-28 | Loading-State | Lade-Indikator sichtbar, kein leerer Container |
| T-29 | Error-State (b) | Meldung auf Deutsch, kein Stacktrace |
| T-30 | Empty-State | Hinweistext auf Deutsch, kein Crash |

### Responsive / Viewport

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-31 | Mobile 375px | Slider bedienbar, Chart lesbar, kein horizontaler Overflow, Collapsible nutzbar |
| T-32 | Tablet 768px | Layout korrekt |
| T-33 | Desktop 1280px | Vollständiges Layout |

### A11y

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-34 | Tastatur-Navigation | Tab durch Slider; Screen-Wechsel und Stationen-Button per Tastatur |
| T-35 | ARIA Live Region | a11ySummary nach Screen-3-Eintritt vorgelesen (polite) |
| T-36 | WCAG-AA-Kontrast | Alle Text/Hintergrund-Kombinationen ≥ 4.5:1 |
| T-37 | prefers-reduced-motion | Chart-Animation und Stationswechsel sofort ohne Animation |
| T-38 | Chart-Alternativtext | role="img" oder figcaption mit beschreibendem Text |
| T-39 | Fokus-Management bei Stationswechsel | Fokus landet auf Stations-Überschrift |
| T-40 | Mobile-Collapsible Accessibility | summary per Tastatur bedienbar, ARIA-Expand-Status korrekt |

---

## 20. Redaktions-Gate (Kurzfassung)

Detaillierte Ausarbeitung folgt in AP-07. Mindestregeln, die bereits jetzt gelten:

- [ ] Das aktive Fenster enthält mindestens eine Station mit `role: "crisis"` und `priority >= 95`.
- [ ] Keine sichtbare Station bleibt dauerhaft auf `source_claimed_unchecked`.
- [ ] Alle sichtbaren Stationen liegen innerhalb des aktiven CSV-Fensters.
- [ ] Keine rote Crash-Codierung vorhanden (→ §17).
- [ ] Finale KPI-Cards erscheinen erst nach Abschluss der Zeitreise (Screen 3).
- [ ] Mobile-Zwischenstände sind aufklappbar, nicht permanent sichtbar.
- [ ] `dynamic_latest_month` wird aus der validierten CSV erzeugt, nicht aus dem Tagesdatum.

Wenn diese Bedingungen nicht erfüllt sind, ist die App redaktionell nicht publikationsreif.

---

## 21. Offene Fragen

### Blocker (vor Implementierungsbeginn zu klären)

| ID | Frage | Konsequenz wenn nicht geklärt |
|---|---|---|
| B-01 | **Datenbasis:** MSCI World Index, monatliche Indexwerte — kein ETF-Proxy | ✅ entschieden 2026-05-28 |
| B-01 | **Format:** CSV, Semikolon-Separator, Komma-Dezimal | ✅ entschieden 2026-05-28 |
| B-01-A | **Indexvariante:** Net Return stark bevorzugt; Abweichung nur mit ausdrücklicher Freigabe | ✅ teilgeklärt 2026-06-03 — konkrete Datenreihe in AP-DATA-01 |
| B-01-B | **Währung:** EUR — Pflichtbedingung; App prüft `unitKey` nach CSV-Laden und lehnt Abweichungen mit Error State (c) ab | ✅ entschieden 2026-06-04 |
| B-01-C | **Datenquelle:** MSCI direkt (msci.com), Tier 0, EUR, ab 2000-12-29 | ✅ entschieden 2026-06-04 — Contract: `docs/data/contracts/msci-world-net-return-monthly.md` |
| B-01-D | **CSV-Erstellung und Freigabe:** Projektinhaber erstellt und pflegt CSV redaktionell; Claude verarbeitet nur freigegebene Datasets | ✅ geklärt 2026-06-03 |
| B-02 | **Berechnungsformel:** Anteilslogik — monatlicher Anteilskauf | ✅ entschieden 2026-05-28 |
| B-03 | **Screen-Flow-Mechanismus:** Button-getrieben, kein Autoplay | ✅ entschieden 2026-05-28 |
| B-04 | **Stations-JSON-Vertrag:** Felder, Enums, Flags, Quellenstatus, Validierungsregeln | ✅ 2026-06-16 — Vertrag: `STATIONS_CONFIG_CONTRACT.md` |

### Entscheidungsfragen für Albert

| ID | Frage | Arbeitsannahme |
|---|---|---|
| E-01 | **App-Familie:** Szenario-/Vergleichs-App oder Hybrid? | ✅ entschieden 2026-05-28, aktualisiert AP-02 2026-06-16: geführte Zeitreise |
| E-02 | **Pilot-Scope:** Bleibt B1 Pilot-2? | ✅ entschieden 2026-05-28: B1 ist Pilot-2 (Daten-/Chart-/Story-Pilot). Pilot-1 ist `risiko-uebersetzer` (Calculator-Pilot). |
| E-03 | **Startbetrag als Eingabe:** Ja (Optional-Slider/Eingabe) oder nein? | Ja, optional mit Default 0 |
| E-04 | **CTA-Text:** „Heute Marktzeit sammeln" oder „Meine nächsten 10 Jahre starten"? | TBD — redaktionell zu bestätigen |

### Nicht-Blocker / Scope-Funde

| ID | Thema |
|---|---|
| SF-01 | Chart-Engine-Integration: welche Bibliothek / welche Komponente für SparplanChart? — nach B-01 und Pilot-Entscheid |
| SF-02 | NumericInput neben Slider für präzise Eingabe — ✅ nach AP-02-Neuausrichtung auf Slice 7 vorgezogen (Mobile ≥ 50 % Traffic) |
| SF-03 | Varianten-Funktion: verschiedene Startpunkte vergleichen — nach Pilot |
| SF-04 | Share-Feature — nach Pilot |

---

## 22. Spec-Gate-Checkliste

| Prüfpunkt | Status |
|---|---|
| Ghost-Card-Vertrag korrekt? (`data-fw-app`, `data-fw-data`, kein `data-app`, kein produktives `data-fw-theme`) | ✅ §10 |
| Kein data-app? | ✅ §10 |
| Kein produktives data-fw-theme? | ✅ §18 |
| data-fw-options whitelistbar? (Whitelist dokumentiert) | ✅ §11 |
| Datenquellen und Cache-Busting geklärt? | ✅ CSV entschieden; Stations-JSON-Vertrag: `STATIONS_CONFIG_CONTRACT.md` |
| Zwei-Datenschichten-Architektur dokumentiert? | ✅ §8 |
| Rolling-Window-Regel korrekt formuliert? | ✅ §9 |
| AppContext definiert? | ✅ §13 |
| Stations-Zustand im AppContext? | ✅ §13.3 (konzeptionell, technisch in AP-03) |
| Pflichtfelder und Fallback-Felder unterschieden? | ✅ §13.4 |
| A11y-Vertrag definiert? | ✅ §14 |
| Stationen-A11y dokumentiert? | ✅ §14.5 |
| State-Modell definiert? | ✅ §12 |
| Reise eines Inputs vollständig beschrieben? | ✅ §15 |
| Sicherheitsregeln erfüllt? | ✅ §18 |
| Verbotene Visuals dokumentiert? | ✅ §17 |
| Redaktions-Gate grob enthalten? | ✅ §20 |
| Keine rote Crash-Codierung als Regel festgehalten? | ✅ §17 |
| Screen 2 als Zeitreise ohne Endwissen spezifiziert? | ✅ §16.1 |
| Screen 3 als erster Reveal mit KPIs spezifiziert? | ✅ §16.1 |
| Screen 4 ohne Prognose spezifiziert? | ✅ §16.1, §16.2 |
| Keine offenen Blocker stillschweigend entschieden? | ✅ §21 — alle Blocker explizit markiert |
| Alte widersprüchliche Screen-2-Aussagen bereinigt? | ✅ §14.1 (alt) ersetzt durch §16.1 |
| Alberts explizites OK? | ✅ 2026-06-16 (AP-02-Freigabe) |

**UX-Gate (heldenreise):** ✅ angewendet → §23

| UX-Prüfpunkt | Status |
|---|---|
| Gewohnte Welt benannt? | ✅ §23.1 |
| Nutzerwiderstand benannt? | ✅ §23.2 |
| Interaktiver Beweis klar? | ✅ §23.3 |
| Aha-Moment in einem Satz? | ✅ §23.4 |
| Genau eine Hauptzahl / Hauptvisualisierung? | ✅ §23.6 |
| Keine Dark Patterns? | ✅ §17, §23.5, §23.8, §23.9 |
| Labels in Alltagssprache (Krug)? | ✅ §16.5 |
| Funnel-Anschluss logisch? | ✅ §23.10 |
| Ethik-Gate bestanden? | ✅ §23.8 |

---

*Nächster Schritt: B1-AP-04 — UX/Heldenreise-Abschnitt für APP_SPEC.md (AP-03 ✅ 2026-06-16)*

---

## 23. Beweisdramaturgie / Entscheidungspsychologie

*Pflichtabschnitt nach `/heldenreise`-Skill. Aktualisiert in AP-02 2026-06-16 für Zeitreise-Logik.*

### 23.1 Gewohnte Welt / Vorannahme

Der Nutzer kommt mit einer von zwei Vorannahmen:

**Variante A — Verpasster Zug:**
> „Vor zehn Jahren wäre es ideal gewesen. Jetzt ist der Moment vorbei. Die Märkte sind zu hoch."

**Variante B — Wartestrategie:**
> „Ich warte noch. Es könnte günstiger werden. Ich will keinen schlechten Zeitpunkt erwischen."

Beide teilen dieselbe Illusion: **Es gibt einen richtigen Zeitpunkt — und dieser ist nicht heute.**

### 23.2 Nutzerwiderstand

| Widerstand | Mechanismus |
|---|---|
| Verpasster-Zug-Syndrom | „Die guten Jahre sind vorbei. Ich bin zu spät." |
| Timing-Glaube | „Ich warte auf die nächste Korrektur." |
| Paralysis by analysis | Zu viele Informationen, keine Entscheidung |
| Einbruchs-Angst | „Was, wenn ich jetzt einsteige und der Markt fällt?" |
| Perfektionismus | „Ich muss erst mehr verstehen. Noch nicht." |
| Unsichtbarer Zinseszins | Exponentielle Wirkung ist intuitiv nicht greifbar — lineare Intuition unterschätzt sie |

### 23.3 Interaktiver Beweis

Nicht eine Formel. Nicht eine Prognose. Sondern: die echte historische Strecke der letzten 10 Jahre — Station für Station, ohne das Ende zu kennen.

Der Nutzer setzt seine monatliche Sparrate (Screen 1). Die App springt 10 Jahre zurück und zeigt: So hätte **sein** Sparplan begonnen — ohne Endwissen. Station für Station erlebt er echte Einbrüche, Erholungen, Rückschläge und den Impuls aufzugeben.

**Was die Zeitreise beweist:**
1. Niemand kannte das Ende — weder den Crash noch die Erholung.
2. Wer geblieben wäre, hätte Einbrüche mitgemacht — und stünde heute trotzdem besser da als ohne.
3. Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung.
4. Heute ist nicht „nach dem richtigen Zeitpunkt" — heute ist der Ausgangspunkt für die nächsten 10 Jahre.

Screen 3 liefert den Reveal: Der vollständige Chart erscheint erstmals. KPI-Cards zeigen das Ergebnis. Die Vergangenheit ist abgeschlossen. Screen 4 überträgt die Erkenntnis auf die Gegenwart.

### 23.4 Aha-Moment

**Primär:**
> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

**Zeitreise-Kernsatz:**
> „Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung."

**Kurzform:**
> „Warten nimmt dir Marktzeit."

### 23.5 Emotionale Zielreaktion

**Erwünscht:**
- „Die Einbrüche sehen auf der Langfristgrafik gar nicht mehr so groß aus." — Relativierung der Angst
- „Ich hätte das nicht durchgehalten." — ehrliche Selbsteinschätzung, dann: „Aber ich würde trotzdem besser dastehen."
- „Heute ist mein ‚vor 10 Jahren'." — Handlungsfähigkeit
- „Ich muss nicht den perfekten Zeitpunkt finden. Ich muss anfangen." — Erlaubnis ohne Druck

**Unerwünscht:**
- Scham: „Ich hätte schon vor Jahren anfangen sollen."
- Panik: „Jetzt muss ich sofort handeln."
- Selbstvorwurf, künstliche Dringlichkeit, Überforderung durch zu viele Zahlen.

### 23.6 Erkenntnishierarchie

| Ebene | Element | Darstellung | Screen |
|---|---|---|---|
| **Einstieg** | Slider — personalisierte Sparrate | interaktiv dominant | 1 |
| **Zeitreise** | wachsender Chart + Stationstexte | visuell dominant, schrittweise | 2 |
| **Hauptbeweis** | vollständiger SparplanChart | visuell dominant, volle Breite | 3 |
| **Pivot** | VertikaleLinie „heute" | klar markiert | 3 |
| **Hauptzahl** | `depotwertHeute` | groß unter dem Chart — positiv formuliert | 3 |
| **Kontext** | `eingezahlt`, `differenz` | KpiCards — erklären, konkurrieren nicht | 3 |
| **Rahmung** | Microcopy pro Screen | kurz, führt die Erkenntnis | je Screen |
| **Handlung** | PrimaryCta | nach dem Beweis | 4 |

**Tufte-Regel:** Der Chart ist der Beweis, nicht Dekoration. `depotwertHeute` ist die Hauptzahl. `differenz` ist Kontextinformation — nicht als Hauptzahl (Verlust-Framing vermeiden).

### 23.7 Dramaturgische UI-Reihenfolge

| Screen | Heldenreise-Rolle | Inhalt |
|---|---|---|
| **1 — Frage / Teleportation** | Ruf zum Abenteuer | Headline: „Vor 10 Jahren war der beste Zeitpunkt. Aber wie hätte sich das damals angefühlt?" / Slider monatliche Rate / Subtext: „Wir springen 10 Jahre zurück." / Button: „10 Jahre zurückspringen" |
| **2 — Zeitreise** | Die Reise — ohne Endwissen | wachsender Chart bis aktuelle Station / Stationstext (Datum, Headline, Anker) / Button: „Weiter investiert bleiben" / Mobile-Collapsible: Zwischenstand |
| **3 — Rückblick / Reveal** | Aha-Moment — erstmals das Ende | vollständiger Chart + VertikaleLinie / KPI-Cards / Headline: „Jetzt erst sieht es einfach aus." / AssumptionsBox |
| **4 — Entscheidung** | Rückkehr / Transfer | Headline: „Heute beginnt wieder ein Chart, dessen Ende niemand kennt." / Microcopy / PrimaryCta |

**Slider steht in Screen 1** — bevor der Chart erscheint. Der Nutzer personalisiert zuerst (seine Rate), dann erlebt er die personalisierte Zeitreise. Das macht Screen 2 zu „seiner" Reise, nicht zu einem abstrakten Marktchart.

### 23.8 Ehrlichkeitsregeln

1. **Echte Daten mit echten Einbrüchen.** Keine bereinigten oder geglätteten Kurven.
2. **Nur ein Zeitfenster.** Die App zeigt genau das aktuellste 10-Jahres-Fenster. Ein anderes Fenster könnte anders aussehen.
3. **Keine Zukunftsaussage.** Screen 4 enthält keine Prognose. Kein „so wird es laufen."
4. **Vergangenheit ≠ Zukunft.** Sichtbarer Hinweis in AssumptionsBox Pflicht.
5. **Keine Finanzberatung.** Hinweis in AssumptionsBox.
6. **Offenlegungs-Test:** Wenn dem Nutzer erklärt wird, warum die App so gestaltet ist — würde er sich geholfen oder manipuliert fühlen? Antwort muss „geholfen" sein.

**AssumptionsBox (immer sichtbar, Screen 3):**
> „Basis: MSCI World Index, monatliche Indexwerte, 10 Jahre rückwärts bis zum letzten vollständig verfügbaren Monat. Die Werte zeigen das Marktprinzip, keine konkrete ETF-Produktempfehlung. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft. Keine Finanzberatung."

### 23.9 Bewusst nicht in dieser App

| Weggelassen | Grund |
|---|---|
| Zukunftsprognose als Chart | Keine belastbare Grundlage; erzeugt Scheingenauigkeit |
| Mehrere Zeitfenster-Vergleich | Das ist B2 (Geburtsjahrlos / Epochen-Fächer) |
| Rendite-Angabe in % | Würde Renditedebatte auslösen — nicht Thema dieser App |
| Inflationsbereinigung | Erhöht kognitive Last ohne Kernaussage zu stärken |
| Animierter Countdown / tickende Uhr | Fake-Urgency — Dark-Pattern-Grenze |
| „Günstiger Einstieg"-Hinweis | Würde Timing-Glauben verstärken statt auflösen |
| Startbetrag als Haupteingabe | Lenkt von Kernbotschaft ab; nur optionaler Input |
| Rote Crash-Codierung | Panikcodierung widerspricht der ruhigen Beweisführung (→ §17) |

### 23.10 Funnel-Anschluss

**Was der Nutzer nach dieser App weiß:**
Warten ist keine neutrale Position. Die vergangene Marktzeit ist unwiederbringlich. Heute ist der Ausgangspunkt für die nächsten 10 Jahre. Im Rückblick sieht alles einfacher aus.

**Welche Frage entsteht danach logisch:**
> „Verstanden. Aber ich habe Angst vor Einbrüchen. Wie viel Risiko halte ich eigentlich aus?"

**Nächste App:** `risiko-uebersetzer` (Pilot-1)

**CTA-Text-Empfehlung:** „Heute Marktzeit sammeln →" [redaktionell zu bestätigen — E-04]

Begründung: „Marktzeit" ist der Kernbegriff dieser App — der CTA wiederholt das Gelernte als Handlungsimpuls. Kein Imperativ wie „Jetzt handeln!" (vermeidet Druck-Formulierung).
