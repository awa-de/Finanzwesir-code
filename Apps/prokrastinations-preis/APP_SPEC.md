# APP_SPEC — prokrastinations-preis

Stand: 2026-06-18 | V2.9 — B1-AP-14d4: §16.3 Status-Sync + §1 Status-Tabelle Nachputz | Geändert von: Claude

---

## 1. Status

| Feld | Wert |
|---|---|
| Version | V2.9 — B1-AP-14d4: §16.3 UI-Primitive-Status synchronisiert (V2.8: AP-14d3 Pulse-Produktentscheidung) |
| Phase | Implementierung — Stationen-Zeitreise vollständig (B1-AP-11–AP-14c4 ✅ 2026-06-17/18); Engine-Erweiterungen (Progressive Domain, Annotation-Marker, Pulse) abgeschlossen; nächster Schritt: Transitions + Reduced Motion (B1-AP-15) |
| Nächster Schritt | B1-AP-15 — Transitions + Reduced Motion (B1-AP-14d4 ✅ 2026-06-18) |
| Code-Freigabe | Slice 0 ✅ 2026-06-04, Slice 1–2 ✅ 2026-06-05, Slice 4 ✅ 2026-06-11, Slice 5 ✅ 2026-06-15, Slice 6 ✅ 2026-06-16; B1-AP-11–AP-14c4 ✅ 2026-06-17/18 |
| Code-Stand | Stationen-Zeitreise implementiert: `loadStations()`, `validateStationsJson()`, `renderJourneyStep()`, `buildJourneyStationAnnotations()`, `FwAnnotationPulsePlugin.js`. Screen 2 = Stationen ohne Endwissen; Screen 3 = erster Reveal; Screen 4 = CTA. |
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
| StationenMarker (Reveal) | Marker | Stille, nicht-interaktive Marker der durchlaufenen Stationen | Screen 3 (nach vollständiger Linie) |
| `eingezahlt` | KpiCard | `monatlicheRate × 120 + startBetrag` | Screen 3 |
| `depotwertHeute` | KpiCard | Simulierter Depotwert am letzten Datenpunkt | Screen 3 |
| `differenz` | KpiCard | `depotwertHeute − eingezahlt` (Gewinn oder Verlust) | Screen 3 |
| AssumptionsBox | TextBlock | Historische Basis, kein Zukunftsversprechen | Screen 3 |
| Microcopy | TextBlock | Kontexttext pro Screen | je Screen |
| PrimaryCta | Button/Link | „Heute Marktzeit sammeln" [E-04 → §21; „Ich starte jetzt" nicht mehr aktiv] | Screen 4 |
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
- JSON nicht erreichbar / nicht parsebar → Error-State (d). Kein synthetischer Fallback, keine Ersatzstationen.
- JSON valide, aber keine Station im aktiven Fenster → Empty-Journey-State (STATIONS_CONFIG_CONTRACT.md §12). Kein synthetischer Ersatz.

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
       │         ├─ Error (d)      (Stations-JSON nicht erreichbar / nicht parsebar / Contract ungültig)
       │         ├─ Empty-Journey  (Stations-JSON valide, aber keine Station im aktiven Fenster oder Redaktions-Gate nicht publikationsreif)
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
| Error (d) | Stations-JSON nicht ladbar, nicht parsebar oder Contract ungültig | „Die Zeitreise kann gerade nicht geladen werden." — `textContent`, kein Stacktrace |
| Empty-Journey | Stations-JSON valide, aber keine aktive Station im Fenster oder Redaktions-Gate nicht publikationsreif | „Die Zeitreise ist aktuell nicht vollständig konfiguriert." — `textContent`, kein Stacktrace |

**Ungültige `data-fw-options`-Werte:** Fallback auf internen Default, kein Error-State.

**Error (d) und Empty-Journey-State — Grundregeln:**
- Keine synthetische Ersatzreise.
- Keine Ersatzstationen.
- Keine stillen Defaults.
- Produktivmodus: nutzerfreundlicher Fehler-/Empty-State (Texte: siehe Tabelle oben).
- Dev-Modus: konkrete Gate-/Config-Hinweise (z. B. welche Station fehlt, welches Redaktions-Gate nicht bestanden wurde).
- Das Redaktions-Gate entscheidet Publikationsreife — nicht der Nutzer im UI.
- Details und Fehlerkonzept: `STATIONS_CONFIG_CONTRACT.md §12`.
- Technische Implementierung folgt in Coding-AP.

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

  resultTone:          'neutral',         // V1.0: immer 'neutral'
  stationLiveMessage:  'Neue Station: März 2020. Börsenhandel an der Wall Street ausgesetzt.',
  revealA11ySummary:   'Vollständiger Rückblick: Wer vor 10 Jahren 300 € monatlich investiert hätte, hätte im letzten verfügbaren Datenmonat 52.000 € Depotwert — bei 36.000 € eingezahlt.'
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
| `stationLiveMessage` | ✅ | `''` (leerer String — keine Ankündigung) |
| `revealA11ySummary` | ✅ | `'Ergebnis wird berechnet.'` |

---

## 14. A11y- und Mobile-Regeln

**Leitprinzip:** Mobile ist der Standardfall, nicht die abgespeckte Variante. Die Stationen-Zeitreise muss auf kleinen Bildschirmen funktionieren, ohne dass der Nutzer mikroskopische Zahlen, dichte Tooltips oder überladene Chart-Annotationen entziffern muss.

### 14.0 Mobile-Grundsatz

**Mobile-Leitregeln:**
- eine primäre Aussage pro Station
- ein sichtbarer Hauptbutton
- keine permanent sichtbaren Kleinst-KPIs
- keine Hover-Abhängigkeit
- keine dichten Chart-Labels
- keine roten Alarm-Codes (→ §17)
- keine UI-Elemente, die nur mit Maus funktionieren
- Zwischenwerte nur auf Wunsch

### 14.1 ARIA Live Region

```html
<div aria-live="polite"
     aria-atomic="true"
     data-fw-role="a11y-result"
     class="visually-hidden">
</div>
```

- `aria-live="polite"` — unterbricht keine laufende Sprachausgabe
- `aria-atomic="true"` — vollständige Nachricht wird vorgelesen
- Aktualisierung nur bei Stationswechsel (Screen 2) und Screen-3-Eintritt (kein Screenreader-Spam)

**Endwissens-Verbot:** Live-Regionen dürfen das Endwissen nicht vor Screen 3 verraten. `depotwertHeute`, `eingezahlt`, `differenz` dürfen erst ab Screen 3 in eine Live-Region geschrieben werden.

**Screen 2 — Stationswechsel (`stationLiveMessage`):**
```
Neue Station: März 2020. Börsenhandel an der Wall Street ausgesetzt.
```
Nur Stationsname und Kurztext. Keine Depotwert-Aussage. Nicht zu viel vorlesen. Keine komplette Chartbeschreibung automatisch vorlesen.

**Screen 3 — Erster Reveal (`revealA11ySummary`):**
```
Vollständiger Rückblick: Wer vor 10 Jahren 300 € monatlich investiert hätte, hätte im letzten verfügbaren Datenmonat 52.000 € Depotwert — bei 36.000 € eingezahlt.
```
Wird erst beim Übergang zu Screen 3 gesetzt.

### 14.2 Chart-Accessibility

- Chart hat `role="img"` mit `aria-label` oder `<figure>` mit `<figcaption>`
- Screen 2: Beschreibung muss sagen, dass nur ein Ausschnitt bis zur aktuellen Station gezeigt wird
- Screen 3: Beschreibung muss sagen, dass jetzt der vollständige 10-Jahres-Rückblick gezeigt wird

**Beispiel Screen 2:**
```
Chart: Entwicklung des Sparplans bis März 2020. Die spätere Entwicklung ist noch nicht eingeblendet.
```

**Beispiel Screen 3:**
```
Chart: Vollständige Entwicklung des Sparplans über 120 Monate bis zum letzten verfügbaren Datenmonat.
```

**StationenMarker im Reveal (Screen 3) — A11y:**
Die finalen Stationenmarker dürfen erst auf Screen 3 für Screenreader erwähnt werden, z. B.:
```
Der vollständige Zehn-Jahres-Chart ist jetzt sichtbar. Kleine Markierungen zeigen die Stationen, die Sie eben durchlaufen haben.
```
Keine Einzelauflistung der Marker. Keine Marker-Interaktion für assistive Technologien. Keine Marker-Erwähnung auf Screen 2.

**Keine Chart-Überladung:**
- keine dichten Annotationen auf Mobile
- keine Mikro-Labels an jedem Datenpunkt
- keine Legenden, die nur Farben erklären, wenn Farben nicht nötig sind
- keine rote Verlustfarbe (→ §17)

Stationstexte müssen die Kernaussage auch ohne Chart verständlich machen.

Datentabelle als ergänzende Alternative: [TBD — ob für Pilot nötig]

### 14.3 Slider

- Sichtbares `<label>` mit `for`-Attribut
- `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- Beispiel: `aria-valuetext="300 Euro pro Monat"`

### 14.4 KpiCards

- `<dl>` mit `<dt>` (Label) und `<dd>` (Wert) oder `<div role="group" aria-label="...">`
- Werte mit Einheit: „52.000 €", nicht „52.000"

### 14.5 Stationen (Screen 2) und Collapsible-Zwischenstand

**Stationsbutton:**
- ist ein `<button>`, kein `<a>`
- Button-Label enthält handlungsbezogenen Text, kein „Weiter"
- Stationstext hat sichtbare semantische Überschrift
- Datum und Quellenlabel dürfen nicht nur visuell sein
- Anleger-Anker muss als normaler Text vorgelesen werden können
- Chart darf nicht die einzige Informationsquelle sein

**Fokusführung nach Stationswechsel:**

Zwei zulässige Varianten:

| Variante | Verhalten | Vorteil | Nachteil |
|---|---|---|---|
| A — Fokus bleibt auf Button | Button bleibt an vergleichbarer Stelle, erhält aktualisierten Kontext | weniger Fokus-Sprung, schnelle Bedienung | Screenreader braucht Live-Region oder Kontextänderung |
| B — Fokus springt zur neuen Stations-Überschrift | Neue Station wird sofort vorgelesen | klare Orientierung für Screenreader | stärkerer Fokus-Sprung |

**Präferenz:** Fokus nach Stationswechsel auf die neue Stationsheadline oder den Station-Container setzen, wenn dadurch Screenreader-Nutzer die neue Situation direkt erfassen. Bei visuellen Nutzern muss der Fokus sichtbar und nachvollziehbar bleiben. Die genaue Implementierung folgt im Coding-AP.

**Mobile-Collapsible (Zwischenstand anzeigen):**

Sichtbarer Zustand geschlossen:
```
Zwischenstand anzeigen
```

Geöffneter Zustand:
```
Eingezahlt: {paidInAtStation}
Depotwert damals: {portfolioValueAtStation}
```

Optional bei Platz:
```
Stand: {stationDisplayDate}
```

Regeln:
- Zwischenstand ist optionaler Kontext, nicht Hauptbotschaft
- Zwischenstand darf die Station nicht dominieren
- Werte werden berechnet, nicht in der JSON gepflegt
- Auf Mobile keine Hover-Tooltips
- Auf Mobile keine permanent sichtbaren Mini-KPI-Karten pro Station
- Finale KPI-Cards erscheinen erst auf Screen 3

**Collapsible-A11y:**
- Trigger wird als Button behandelt, nicht als dekorativer Link
- Empfohlene ARIA-Attribute: `aria-expanded`, `aria-controls`, eindeutige ID des aufklappbaren Inhalts
- Beim Öffnen bleibt der Fokus grundsätzlich auf dem Trigger
- Aufgeklappter Inhalt erscheint direkt nach dem Trigger in der Lesereihenfolge
- Beim Schließen verschwindet der Inhalt sauber aus der Tab-Reihenfolge
- Label geschlossen: `Zwischenstand anzeigen`
- Label geöffnet: `Zwischenstand ausblenden`
- Wenn die sichtbare Beschriftung nicht wechselt, muss `aria-expanded` den Status für Assistive Technology signalisieren

**Desktop-Zwischenstand:**

Erlaubt:
- Hover-/Focus-Tooltip auf Station-Marker
- kleiner Zwischenstand im Stationstext
- derselbe Collapsible wie Mobile

Nicht erlaubt:
- Nur-Hover-Informationen als einziger Zugang
- Informationen, die per Tastatur nicht erreichbar sind
- dichte Mini-KPI-Karten unter jeder Station
- rote Verlustmarkierung (→ §17)

**Empfehlung für V1:** Dieselbe Collapsible-Lösung auf allen Breakpoints. Begründung: einfacher, konsistenter, barriereärmer, weniger Sonderlogik. Tooltip kann später optional ergänzt werden.

### 14.6 prefers-reduced-motion

Bei `prefers-reduced-motion` aktiv:
- keine Draw-Animation zwischen Stationen
- kein Pulse auf neu sedimentierten Marker-Ringen (Ringe bleiben statisch sichtbar)
- kein langes Überblenden
- kein Scroll-Jacking
- keine Parallax- oder Dramatisierungseffekte
- direkter Wechsel zur nächsten Station
- neue Station wird klar fokussiert oder angekündigt

**Wichtig:** Reduced Motion darf keine Inhalte entfernen. Es ändert nur die Bewegung, nicht die Information.

**Animation und Timing:**

Im Standardmodus:
```
Zwischen Stationen darf der Chart kurz animiert weitergezeichnet werden. Die Animation soll den Übergang verständlich machen, nicht dramatisieren. Bei reduzierter Bewegung wird direkt auf den neuen Zustand gewechselt.
```

Grenzen:
- kein langes passives Autoplay
- kein automatisches Durchlaufen mehrerer Stationen
- keine künstliche Wartepflicht vor dem Button
- Animation dient Orientierung, nicht Spektakel
- Nutzer behält Kontrolle

### 14.7 Screen-Flow-Navigation und Scroll

- Jeder Screen hat eine sichtbare `<h2>`-Überschrift
- Fokus-Management bei Screen-Wechsel: Fokus auf neue Überschrift setzen
- Tastatur-Navigation: alle 4 Screens erreichbar (Tab, Enter)
- Screen 2: Stationen-Button per Tastatur (Enter/Space) aktivierbar
- Collapsible-Trigger per Tastatur (Enter/Space) bedienbar
- Keine Tastaturfalle

**Scroll-Verhalten:**
- kein Scroll-Jacking
- kein erzwungenes automatisches Scrollen über lange Strecken
- wenn nach Stationswechsel automatisch gescrollt wird, dann nur zur Orientierung und nicht gegen den Nutzer
- auf Mobile muss der neue Stationstext sichtbar werden
- bei Tastatur/Screenreader-Nutzung hat Fokusführung Vorrang vor visueller Scrollposition

### 14.8 Mobile-Layout Screen 2

**Empfohlene vertikale Reihenfolge:**

```
1. Screen-/Stationsheadline
2. Chart-Ausschnitt
3. Datum / Quellenlabel
4. Station-Headline
5. Anleger-Anker
6. Zwischenstand anzeigen (Collapsible)
7. Weiter investiert bleiben (Button)
```

**Regel:** Der Nutzer soll ohne Suche verstehen:
- Wo bin ich in der Zeitreise?
- Was ist gerade passiert?
- Was bedeutet das für den Sparplan?
- Wie komme ich weiter?

**Mobile-Höhenproblem:**
- Der Chart darf Screen 2 auf Mobile nicht vollständig dominieren. Er ist Beweisvisualisierung, aber der Anleger-Anker ist für die psychologische Wirkung gleich wichtig.
- Chart auf Mobile kompakter als auf Desktop
- Stationstext muss ohne übermäßiges Scrollen sichtbar bleiben
- Button darf nicht unter einer langen Scrollstrecke verschwinden

### 14.9 Button — Weiter investiert bleiben

Regeln:
- Button ist pro Station eindeutig
- Normaler Button-Text: `Weiter investiert bleiben`
- Finaler Button: `Ergebnis ansehen`
- Kein generisches `Weiter`
- Keine zwei gleichrangigen Primärbuttons
- Button nicht über dem Chart schweben lassen, wenn er Chartdaten verdeckt
- Button muss mit Daumen erreichbar sein
- Button muss ausreichend groß sein (→ §14.11 Touch-Ziele)

**Sticky-Entscheidung (offen):**
```
Mobile-Button darf sticky im unteren Bereich sein, wenn er keine Inhalte verdeckt und die Fokus-/Screenreader-Reihenfolge korrekt bleibt.
```
Wenn sticky zu komplex oder störend ist, genügt ein normaler Button unter dem Stationstext. AP-05 erzwingt keine finale technische Entscheidung — nur die Bedingungen sind festgehalten.

### 14.10 Quellenlabel auf Mobile

- Quellenlabel kurz halten
- Quelle und Datum sichtbar machen
- Lange URLs nicht sichtbar im Haupttext anzeigen
- Quelle darf verlinkt sein, aber nicht als primäre Handlung erscheinen
- Externe Quelle öffnet nur nach Nutzeraktion
- Linktext verständlich: `Quelle: TAGESSCHAU · 9. MÄRZ 2020` — nicht die rohe URL

### 14.11 Touch-Ziele und Abstand

- Primäre Buttons ausreichend groß
- Collapsible-Trigger ausreichend groß
- Links nicht zu dicht nebeneinander
- Keine kleinen Chartmarker als einzige Interaktion
- Station-Marker auf Mobile nicht als Pflichtinteraktion verwenden
- Nutzer muss die App mit normalem Daumengebrauch bedienen können

Wenn das Projekt globale Touch-Target-Regeln definiert, verweist diese App darauf. Bis dahin gilt: Primärinteraktionen müssen mit normalem Daumengebrauch erreichbar sein.

### 14.12 Content-Dichte pro Station

**Pro Station sichtbar:**
- Datum / Quelle
- eine Headline
- maximal zwei kurze Anker-Sätze
- ein Collapsible-Link
- ein Primärbutton

**Nicht sichtbar im Standardzustand:**
- lange Quellenzitate
- vollständige Nachrichtenzusammenfassung
- externe Prozentwerte
- mehrere KPI-Karten
- technische Renditebegriffe
- Prognosen

**Ziel:** Eine Station ist ein Halt in der Anlegerreise, kein Zeitungsartikel und keine Bilanzanalyse.

### 14.13 Fehlermeldungen — A11y

Fehlermeldungen müssen:
- sichtbar sein
- screenreader-tauglich sein
- nicht nur farblich codiert sein
- konkret sagen, was fehlt
- keine Entwicklerdetails im Produktivmodus zeigen

**Beispiele:**
```
Die Zeitreise kann gerade nicht geladen werden.
```
```
Die Stationendaten sind unvollständig.
```

Im Dev-Modus dürfen technische Details ergänzt werden.

### 14.14 Verhältnis zu globalen Regeln

AP-05 ergänzt ausschließlich app-spezifische A11y- und Mobile-Regeln in dieser Spec.

Wenn globale Dokumente existieren (zentrale Responsive-Regeln, Accessibility-Regeln, UX-Primitiven, Chart-Engine-Regeln):
- `APP_SPEC.md` wird app-spezifisch ergänzt
- auf globale Regeln wird verwiesen, wenn passend
- globale Regeln werden in AP-05 nicht geändert

**Mögliche globale Folgearbeit (Pattern-Update nach Pilot):**
- Touch-Target-Standards (aktuell app-spezifisch)
- Collapsible-A11y-Muster (Kandidat für App-Fabrik-Pattern)
- Chart-A11y-Labels Screen 2/3 (Kandidat für Chart-Engine-Regel)

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
  resultTone:         'neutral',
  stationLiveMessage: '',  // wird bei Stationswechsel in Screen 2 gesetzt — kein Endwissen
  revealA11ySummary:  `Vollständiger Rückblick: Wer vor 10 Jahren ${monatlicheRate} € monatlich investiert hätte, hätte im letzten verfügbaren Datenmonat ${fmt(depotwertHeute)} Depotwert — bei ${fmt(eingezahlt)} eingezahlt.`  // nur Screen 3
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
// Screen 2: Stationswechsel ankündigen (kein Endwissen)
a11yRegion.textContent = appContext.stationLiveMessage;

// Screen 3: erst beim Übergang den vollständigen Reveal ausgeben
// a11yRegion.textContent = appContext.revealA11ySummary;

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

**Chart-Orientierung Screen 2 — feste X-Achse:**

Screen 2 nutzt eine feste 10-Jahres-X-Achse. Die X-Achse zeigt stets den vollständigen 120-Monats-Zeitrahmen. Die Linie wird nur bis zur aktuellen Station gezeichnet. Der rechte, nicht gezeichnete Bereich steht für noch unbekannte Zukunft — nicht für fehlende Daten.

> Zeit bleibt stabil. Wissen wächst.

Die feste Achse verrät nur den Zeitrahmen, den der Nutzer durch „10 Jahre zurückspringen" bereits kennt. Sie verrät nicht: späteren Verlauf, spätere Ereignisse, finale Depotwerte, finale Rendite, finale KPI-Cards, finalen Chartpfad oder konkrete spätere Stationen.

Orientierungslogik Screen 2 (empfohlen):
```
Bekannt bis: <Stationsmonat>
Station <n> von <gesamt>
```

**AP-14b — Architekturentscheidung: Progressive Domain LineChart (Zielbild, Implementierung folgt)**

> X zeigt den Zeithorizont. Linie zeigt den Wissensstand. Y zeigt den bisher bekannten Werteraum.

Der kommende Engine-Umbau führt einen offiziellen Achsenvertrag ein:

| Konzept | Bedeutung |
|---|---|
| `dataRange` | Tatsächlicher sichtbarer Datenbereich — endet in Screen 2 beim aktuellen Stationsmonat. Grundlage für sichtbare Linie, Tooltips, A11y und Y-Skalierung. |
| `displayRange` | Intendierte Anzeige-Domain der X-Achse — umfasst das vollständige 10-Jahres-Fenster. Grundlage für X-Scale, X-Ticks und `durationYears`. |

Öffentliches API-Zielbild:

```js
chartEngine.renderFromData(container, visibleSeries, {
  type: 'line',
  features: { rangeControls: false, headline: false },
  xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth },
  yRangePolicy: 'cumulative-expand-zero'
});
```

`xDisplayRange` ist Top-Level-Optionsfeld (`{ min, max }`) — nicht `features.xDisplayMax`, nicht nur `max`. `displayRange` wird im `fwContext` optional ergänzt. Standard-LineCharts ohne `xDisplayRange` bleiben unverändert.

**`yRangePolicy: 'cumulative-expand-zero'`:**
- `yMin` immer `0`
- `yMax` basiert ausschließlich auf dem bisher bekannten Datenpfad (bis zur aktuellen Station)
- `yMax` darf nur gleich bleiben oder nach oben expandieren — nie schrumpfen
- Kein finaler Maximalwert vor Screen 3
- Y-Achsen-Gedächtnis zurücksetzen bei: Neustart der Zeitreise, Änderung der Sparrate

**Verbotene Implementierungen (AP-14b) — ausdrücklich nicht zulässig:**
- `Chart.getChart()`-Post-Render-Hack
- nachträgliches `options.scales.x.max`
- `chart.update('none')` als Achsenfix
- `setTimeout`-/`requestAnimationFrame`-Kaschierung
- Fake-Daten bis `latestMonth`
- Dummy-Dataset oder transparente Zukunftslinie
- globale Chart.js-Hacks oder neuer Chart-Typ nur für diese App
- Endwissens-Leak in Screen 2
- Y-Achse auf finalen Maximalwert vorab setzen
- Y-Achse während Screen 2 schrumpfen lassen

**Finale Stationenmarker Screen 3:**

Nach dem vollständigen Chart erscheinen die durchlaufenen Stationen als stille, nicht-interaktive Marker auf der vollständigen Linie.

> Die Marker zeigen: Hier warst du eben. Sie erklären nicht erneut die Geschichte.

Erlaubt:
- kleine, nicht-interaktive Marker auf oder nah an der Linie
- kurzer Fade-in nach vollständiger Linie

Nicht erlaubt:
- Labels, Tooltips, Klick-/Tap-Funktion, Legende
- anklickbare Marker, Hover-Tooltips, Event-Legende, nummerierte Marker, Event-Replay

Reveal-Ablauf Screen 3:
1. Vollständige 10-Jahres-Linie erscheint
2. Kurze Pause
3. Stille Stationenmarker erscheinen (Fade-in; bei Reduced Motion: sofort, ohne Animation)
4. KPI-Cards / Ergebnis

**AP-14c — Marker-Zielbild (Implementierung folgt nach AP-14b)**

Für diese App wird keine neue `events.json` eingeführt.

**Datenquelle:**
- Marker werden aus den bestehenden Journey-Stations (`stations.de.json`) abgeleitet
- `final_reveal` wird ausgeschlossen
- Aktuelle Station wird nicht markiert; Zukunftsstationen werden nicht markiert
- Sichtbar sind nur vergangene Stationen: bei Station n Marker für Stationen 1 bis n−1

Begründung: Die Marker sind in dieser App keine generischen Zusatzereignisse — sie sind sedimentierte Stationen der Zeitreise. Eine separate `events.json` würde nur Synchronisationsrisiko erzeugen.

**Marker-Y (Snapshot-Snap):**
```
Eventdatum → Snapshot-Snap analog zur Hauptserie → Lookup des passenden Monatsdatenpunkts → markerY aus Hauptserie
```
Nicht erlaubt: lineare Interpolation als Default, linker Floor-Snap als Default, geschätzte Zwischenwerte, künstliche Datenpunkte.

**Pulse (B1-AP-14c4 ✅ 2026-06-18):**

Pulse ist ephemerer Runtime-State — gehört nicht in `stations.de.json` und nicht dauerhaft in `fwContext`.

Produktentscheidung (freigegeben Albert 2026-06-18):
- Scope: Screen 2 only; Screen 3 kein Pulse
- Welcher Ring pulst: nur der neu sedimentierte Ring (zuletzt hinzugekommen)
- Ausgeschlossen: aktuelle Station, Zukunftsstationen, `final_reveal`
- Pulse-Dauer: 1200 ms (2 Pulse à 600 ms)
- Pulse-Form: `Math.abs(Math.sin(progress × π × 2))` — zwei Auswüchse; zweiter durch Alpha-Fade schwächer (Echo-Effekt)
- Scale-Maximum: 1.8× (Ring wächst auf 180 % des Ausgangsradius)
- Alpha-Fade: 1.0 → 0.0 über gesamte Dauer
- Keine Endlosschleife: Pulse stoppt nach PULSE_DURATION

`prefers-reduced-motion: reduce` → kein Pulse. Ringe bleiben statisch sichtbar.

Implementierung: `FwAnnotationPulsePlugin.js` (WeakMap-State, `afterDraw`-Hook, `chart.draw()`-Pattern).

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
| Slider | monatliche Sparrate (Haupt-Eingabe) | Screen 1 | ✅ umgesetzt |
| Teleportationsbutton | Screen 1 → Screen 2 | Screen 1 | ✅ umgesetzt |
| SparplanChart (wachsend) | Teilansicht bis aktuelle Station | Screen 2 | ✅ umgesetzt |
| StationCard | Datum, Quellenlabel, Headline, Anleger-Anker | Screen 2 | ✅ umgesetzt |
| Stationen-Button | `Weiter investiert bleiben` | Screen 2 | ⚠️ teilweise umgesetzt |
| Mobile-Collapsible | `Zwischenstand anzeigen` → Eingezahlt + Depotwert damals | Screen 2 | ✅ umgesetzt |
| Marker-Pulse-Ring | Neu sedimentierter Ring pulst 1200 ms (1.8×, 2 Pulse) | Screen 2 | ✅ umgesetzt (B1-AP-14c4) |
| Draw-Animation | Chart wächst zur nächsten Station | Screen 2 | ⏳ bewusst offen |
| SparplanChart (vollständig) | 120-Monate-Gesamtverlauf | Screen 3 | ✅ umgesetzt |
| VertikaleLinie | Entscheidungspunkt-Marker bei letztem Datenpunkt | Screen 3 | ✅ umgesetzt |
| KpiCard | eingezahlt / depotwertHeute / differenz | Screen 3 | ✅ umgesetzt |
| AssumptionsBox | Pflichthinweis: Vergangenheit ≠ Garantie | Screen 3 | ✅ umgesetzt |
| TextBlock | Microcopy pro Screen | je Screen | ✅ umgesetzt |
| PrimaryCta | Handlungsaufruf | Screen 4 | ✅ umgesetzt |
| ErrorState | Fehlermeldung auf Deutsch | jederzeit | ✅ umgesetzt |
| LoadingSkeleton | Platzhalter während Datenladen | Loading | ✅ umgesetzt |

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
- Marker-Pulse: deaktiviert bei `prefers-reduced-motion` → Ringe erscheinen statisch, kein Pulse
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

Die vollständigen Test- und QA-Kriterien für die Stationen-Zeitreise sind in `QA_TEST_CASES.md` dokumentiert.

**Muss-Tests (Kurzliste):**
- Screen 2 zeigt nur Teilchart bis zur aktuellen Station
- Screen 2 zeigt keine finalen KPI-Cards
- Stationen werden aus JSON geladen und nach CSV-Fenster gefiltert
- Finaler Reveal kommt aus `latestMonth` der CSV (nicht aus Tagesdatum)
- Mobile-Zwischenstand ist Collapsible, keine permanenten Mini-KPIs
- Keine rote Crash-Codierung
- `prefers-reduced-motion` entfernt Bewegung, nicht Inhalte
- Screen 4 zeigt keine Prognose
- Screenreader erfährt den finalen Depotwert erst auf Screen 3 (`revealA11ySummary` — kein A11y-Endwissens-Leak)

Die Testfälle T-01–T-40 (unten) sind eine ergänzende Kurzreferenz; maßgebend für Abnahme und QA ist `QA_TEST_CASES.md`.

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
| T-11b | Stations-JSON nicht erreichbar | Error-State (d) — kein synthetischer Ersatz |
| T-11c | Station außerhalb des aktiven CSV-Fensters | Station wird nicht angezeigt, kein Fehler |
| T-11d | Alle Stationen außerhalb des Fensters | Empty-Journey-State — kein synthetischer Ersatz |
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

Detaillierte Ausarbeitung: `REDAKTIONS_GATE.md` (→ AP-07, 2026-06-16). Die APP_SPEC definiert UX und Zielzustand; das Redaktions-Gate definiert, ob eine konkrete Stationsauswahl veröffentlicht werden darf.

Mindestregeln (Kurzfassung):

- [ ] Das aktive Fenster enthält mindestens eine Station mit `role: "crisis"` und `priority >= 95`.
- [ ] Keine sichtbare Station bleibt dauerhaft auf `source_claimed_unchecked`.
- [ ] Alle sichtbaren Stationen liegen innerhalb des aktiven CSV-Fensters.
- [ ] Keine rote Crash-Codierung vorhanden (→ §17).
- [ ] Finale KPI-Cards erscheinen erst nach Abschluss der Zeitreise (Screen 3).
- [ ] Mobile-Zwischenstände sind aufklappbar, nicht permanent sichtbar.
- [ ] `dynamic_latest_month` wird aus der validierten CSV erzeugt, nicht aus dem Tagesdatum.
- [ ] Kein A11y-Endwissens-Leak: Live-Region, `aria-label`, `figcaption` und `visually-hidden`-Texte verraten vor Screen 3 keinen Depotwert (→ §14.1, G-A06b).

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
| Ethik-Gate bestanden? | ✅ §23.8, §23.15 |
| A11y-Endwissens-Leak ausgeschlossen? (`revealA11ySummary` nur Screen 3, `stationLiveMessage` kein Depotwert) | ✅ §14.1 |
| Hindsight Bias als Hauptgegner benannt? | ✅ §23.11 |
| Dramaturgische Stationsrollen erklärt? | ✅ §23.12 |
| Falsche Auflösung als Werkzeug dokumentiert? | ✅ §23.13 |
| Finaler Wackler dokumentiert? | ✅ §23.14 |
| Informationsethik (kein Dark Pattern) begründet? | ✅ §23.15 |
| Microcopy-Regeln definiert? | ✅ §23.16 |
| Button `Weiter investiert bleiben` als Micro-Commitment erklärt? | ✅ §23.17 |
| Screen 4 als Transfer ohne Verkaufsdruck beschrieben? | ✅ §23.18 |
| P→B→N-Einordnung dokumentiert? | ✅ §23.19 |
| AP-14b Progressive Domain LineChart dokumentiert? (`xDisplayRange`, `displayRange`, `dataRange`, `yRangePolicy`, Verbote) | ✅ §16.1 |
| AP-14c Marker-Zielbild dokumentiert? (Journey-Stations, kein `events.json`, Snapshot-Snap, keine Interaktion) | ✅ §16.1 |

**A11y- und Mobile-Gate (AP-05):** ✅ angewendet → §14

| A11y/Mobile-Prüfpunkt | Status |
|---|---|
| Mobile als Standardfall dokumentiert? | ✅ §14.0 |
| Screen-2-Mobile-Layout beschrieben? | ✅ §14.8 |
| `Weiter investiert bleiben` als erreichbarer Primärbutton spezifiziert? | ✅ §14.9 |
| Mobile-Zwischenstand als Collapsible dokumentiert? | ✅ §14.5 |
| Collapsible-A11y-Regeln beschrieben? | ✅ §14.5 |
| Desktop-Zwischenstand nicht nur Hover? | ✅ §14.5 |
| Tastaturbedienung dokumentiert? | ✅ §14.7 |
| Fokusführung nach Stationswechsel beschrieben? | ✅ §14.5 |
| Screenreader-Logik Stationswechsel beschrieben? | ✅ §14.1 |
| Chart-A11y Screen 2 und Screen 3 beschrieben? | ✅ §14.2 |
| Reduced Motion dokumentiert? | ✅ §14.6 |
| Scroll-Verhalten geregelt? | ✅ §14.7 |
| Quellenlabel auf Mobile geregelt? | ✅ §14.10 |
| Touch-Ziele und Content-Dichte beschrieben? | ✅ §14.11, §14.12 |
| Fehlermeldungen A11y-konform beschrieben? | ✅ §14.13 |
| Rote Signals weiterhin verboten? | ✅ §17, §14.0, §14.5 |
| Keine Code-Dateien geändert? | ✅ |
| Keine produktive stations.de.json angelegt? | ✅ |
| AP-08b Konsistenz-Nachputz ✅ 2026-06-16? | ✅ |

---

*AP-06 ✅, AP-07 ✅, AP-08 ✅, AP-08b ✅, AP-08c ✅ 2026-06-16 | B1-AP-14a2 ✅ 2026-06-18 | Nächster Schritt: B1-AP-14b — Engine-Umbau Progressive Domain LineChart*

---

## 23. Beweisdramaturgie / Entscheidungspsychologie

*Pflichtabschnitt nach `/heldenreise`-Skill. Aktualisiert in AP-02 2026-06-16 für Zeitreise-Logik.*

### 23.1 Gewohnte Welt / Vorannahme

Der Nutzer kommt mit einer von zwei Vorannahmen:

**Variante A — Verpasster Zug:**
> „Vor zehn Jahren wäre es ideal gewesen. Jetzt ist der Moment vorbei. Die Märkte sind zu hoch."

**Variante B — Wartestrategie:**
> „Ich warte noch. Es könnte günstiger werden. Ich will keinen schlechten Zeitpunkt erwischen."

**Variante C — Rückblick-Illusion:**
> „Damals war es doch offensichtlich einfacher als heute. Die Märkte sind jetzt unberechenbarer."

Diese dritte Vorannahme ist oft unbewusst: Der Nutzer bewertet die Vergangenheit mit Wissen, das damalige Anleger nicht hatten — das ist Hindsight Bias. Die App darf den vollständigen Chart deshalb nicht zu früh zeigen.

Alle drei teilen dieselbe Illusion: **Es gibt einen richtigen Zeitpunkt — und dieser ist nicht heute.**

### 23.2 Nutzerwiderstand

| Widerstand | Mechanismus | Antwort der App |
|---|---|---|
| Verpasster-Zug-Syndrom | „Der beste Zeitpunkt ist vorbei." | Heute wird als neuer Anfang gerahmt |
| Timing-Glaube | „Ich warte auf einen besseren Einstieg." | Zeitreise zeigt: Der perfekte Einstieg ist erst rückblickend sichtbar |
| Hindsight Bias | „Damals war es doch leicht." | Chart wird erst nach der Reise vollständig gezeigt |
| Einbruchs-Angst | „Was, wenn ich direkt vor einem Crash starte?" | Stationen zeigen reale Einbrüche ohne Endwissen |
| Erholungs-Misstrauen | „Nach der Erholung kommt bestimmt wieder etwas." | Falsche Auflösung und finaler Wackler zeigen genau das |
| Prokrastination | „Ich mache es später." | Screen 4 übersetzt Marktzeit in heutige Entscheidung |
| Überforderung | „Zu viele Daten, zu viele Szenarien." | Eine Strecke, wenige Stationen, ein Beweis |

### 23.3 Interaktiver Beweis

Nicht eine Formel. Nicht eine Prognose. Sondern: die echte historische Strecke der letzten 10 Jahre — Station für Station, ohne das Ende zu kennen.

Der Nutzer setzt seine monatliche Sparrate (Screen 1). Die App springt 10 Jahre zurück und zeigt: So hätte **sein** Sparplan begonnen — ohne Endwissen. Station für Station erlebt er echte Einbrüche, Erholungen, Rückschläge und den Impuls aufzugeben.

**Was die Zeitreise beweist:**
1. Niemand kannte das Ende — weder den Crash noch die Erholung.
2. Wer geblieben wäre, hätte Einbrüche mitgemacht — und stünde heute trotzdem besser da als ohne.
3. Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung.
4. Heute ist nicht „nach dem richtigen Zeitpunkt" — heute ist der Ausgangspunkt für die nächsten 10 Jahre.

**Wie die App das beweist — kontrollierter Informationsentzug:**

Die App beweist ihre Aussage nicht durch eine fertige Ergebnisgrafik, sondern durch kontrollierten Informationsentzug: Screen 2 zeigt dem Nutzer zunächst nur das, was ein damaliger Anleger zu diesem Zeitpunkt wissen konnte.

Das ist keine Täuschung. Es ist die ehrliche Rekonstruktion der damaligen Perspektive. Die App legt am Ende vollständig offen: echte historische Daten, echte Stationen, keine Prognose, Vergangenheit keine Garantie, keine Finanzberatung.

Screen 3 liefert den Reveal: Der vollständige Chart erscheint erstmals. KPI-Cards zeigen das Ergebnis. Die Vergangenheit ist abgeschlossen. Screen 4 überträgt die Erkenntnis auf die Gegenwart.

### 23.4 Aha-Moment

**Primärer Aha-Moment:**
> „Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung."

**Sekundärer Aha-Moment:**
> „Heute fühlt sich schwer an, weil du das Ende nicht kennst. Genau so war es vor 10 Jahren auch."

**Transfer-Satz (Screen 4):**
> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

**Kurzform:**
> „Warten nimmt dir Marktzeit."

### 23.5 Emotionale Zielreaktion

**Erwünscht:**
- „Ach so — die wussten damals auch nicht, wie es ausgeht." — Kern-Erkenntnis
- „Der Chart sieht erst im Nachhinein ruhig aus." — Hindsight Bias aufgebrochen
- „Durchhalten war damals keine Selbstverständlichkeit." — Respekt vor dem Weg
- „Heute ist nicht schwieriger als damals. Heute ist nur genauso offen." — Gleichstellung
- „Ich brauche keinen perfekten Zeitpunkt. Ich brauche einen Anfang." — Handlungsfähigkeit
- „Die Einbrüche sehen auf der Langfristgrafik gar nicht mehr so groß aus." — Relativierung der Angst
- „Ich hätte das nicht durchgehalten." — ehrliche Selbsteinschätzung, dann: „Aber ich würde trotzdem besser dastehen."

**Unerwünscht:**
- Scham: „Ich war dumm, nicht früher angefangen zu haben."
- Panik: „Ich muss sofort handeln."
- Fatalismus: „Es kann ja jederzeit alles crashen."
- Triumph: „Aktien gehen immer hoch."
- Scheinsicherheit: „Die nächsten 10 Jahre werden auch so."

### 23.6 Erkenntnishierarchie

**Screen 1 — Frage / Teleportation:**

| Ebene | Element | Darstellung |
|---|---|---|
| **Einstieg** | Slider — personalisierte Sparrate | interaktiv dominant |
| **Kontext** | Subtext: Wir springen 10 Jahre zurück | führend, kurz |
| **Handlung** | Teleportationsbutton | klar, einziger CTA |

**Screen 2 — Zeitreise:**

| Ebene | Element | Darstellung |
|---|---|---|
| **Hauptvisualisierung** | Teilweise enthüllter Chart bis zur aktuellen Station | wachsend, schrittweise |
| **Haupttext** | Stationstext / Anleger-Anker | narrativ dominant |
| **Untergeordnet** | Zwischenstand (Mobile-Collapsible) | ausgeblendet bis Tap |
| **Nicht sichtbar** | Finale KPI-Cards, vollständiger Chart, Zukunftsvorschau | — |

**Screen 3 — Rückblick / Reveal:**

| Ebene | Element | Darstellung |
|---|---|---|
| **Hauptvisualisierung** | Vollständiger Chart | visuell dominant, volle Breite |
| **Pivot** | VertikaleLinie | klar markiert |
| **Hauptzahl** | `depotwertHeute` — Depotwert im letzten CSV-Monat | groß, positiv formuliert |
| **Kontextzahlen** | `eingezahlt`, `differenz` | KpiCards — erklären, konkurrieren nicht |
| **Pflicht-Rahmung** | AssumptionsBox | immer sichtbar |

**Screen 4 — Entscheidung:**

| Ebene | Element | Darstellung |
|---|---|---|
| **Hauptaussage** | „Heute beginnt wieder ein Chart, dessen Ende niemand kennt." | Headline |
| **Keine neue Zahl** | — | keine Prognose, kein Zukunftschart |
| **Handlung** | PrimaryCta | Transfer, kein Druck |

**Tufte-Regel:** Der Chart ist der Beweis, nicht Dekoration. `depotwertHeute` ist die Hauptzahl auf Screen 3. `differenz` ist Kontextinformation — nicht als Hauptzahl (Verlust-Framing vermeiden).

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

---

### 23.11 Hindsight Bias — Hauptgegner dieser App

Der zentrale Gegner dieser App ist Hindsight Bias.

**Definition:**
Sobald der Nutzer den vollständigen 10-Jahres-Chart sieht, bewertet er die Vergangenheit mit Wissen, das damalige Anleger nicht hatten. Die Konsequenz:

Die alte App erzeugte die falsche emotionale Reaktion:
> „Das sieht doch einfach aus. War doch klar."

Die neue App soll die richtige Reaktion auslösen:
> „Damals wusste niemand, dass es gut ausgeht."

**Warum der Chart nicht zu früh gezeigt werden darf:**
Wer das Ergebnis kennt, bewertet rückblickend als Logik, was in Echtzeit eine Entscheidung unter Unsicherheit war. Der vollständige Chart darf deshalb erst auf Screen 3 erscheinen — nach der Zeitreise, nicht vorher.

**Abgrenzung zu anderen Bias-Konzepten:**
- Hindsight Bias: „Im Nachhinein war es offensichtlich." — das ist der Hauptgegner hier
- Timing-Bias: „Es gibt einen perfekten Einstiegszeitpunkt." — wird durch die Zeitreise mitbehandelt
- Status-quo-Bias: „Nichts tun ist sicherer." — wird durch Screen 4 (Transfer) adressiert

---

### 23.12 Dramaturgische Stationsrollen

Die Stationen in Screen 2 folgen einer Bogenstruktur. Sie sind keine willkürlichen Datenpunkte, sondern dramaturgische Werkzeuge.

**Grundstruktur des Bogens:**
```
Ruhiger Start
  → erste Unruhe
  → längere Zermürbung
  → Klimax
  → falsche Auflösung
  → finaler Wackler
  → dynamischer Reveal
```

**Beschlossene aktive Stationsrollen (Launch-Kontext):**

| Station | Rolle | Funktion |
|---|---|---|
| Februar 2018 | Erste Unruhe (`shock`) | Die Ruhe endet, ohne großen äußeren Auslöser |
| Dezember 2018 | Zermürbung (`doubt`) | Ein ganzes Jahr fühlt sich verloren an |
| März 2020 | Klimax (`crisis`) | Der stärkste Schock der Reise |
| November 2020 | Falsche Auflösung (`relief`, `falseResolution: true`) | Erleichterung — aber noch nicht das Ende |
| Februar 2022 | Finaler Wackler beginnt (`geopolitical_shock`, `finalWobble: true`) | Krieg, Inflation, Lieferketten |
| April 2025 | Letzter Wackler (`late_wobble`, `finalWobble: true`) | Kurz vor dem Ziel kommt noch einmal Unsicherheit |
| `dynamic_latest_month` | Reveal (`final_reveal`) | Jetzt erst kennt der Nutzer das Ende |

Die Stationen duplizieren nicht die JSON-Liste — sie beschreiben deren dramaturgischen Zweck.

---

### 23.13 Falsche Auflösung

Die Impfstoff-Erleichterung im November 2020 dient als bewusste falsche Auflösung.

**Zweck:**
Der Nutzer soll kurz glauben, dass die Reise geschafft ist. Danach folgt mit 2022 ein erneuter Test. Diese Wendung ist dramaturgisch gewollt, weil Anleger in Echtzeit nie wissen, ob eine Krise endgültig vorbei ist.

**Umsetzungsregel:**
- Die App soll diese falsche Auflösung nicht ankündigen.
- Der Stationstext für November 2020 darf nicht sagen: „Aber die Reise ist noch nicht vorbei."
- Die nächste Station kommt einfach.

**Ethische Einordnung:**
Das ist kein Dark Pattern. Es ist die historische Rekonstruktion der damaligen Unsicherheit. Anleger im November 2020 wussten nicht, was 2022 kommt. Die App zeigt das ehrlich.

**JSON-Flag:** `flags.falseResolution: true` für die November-2020-Station.

---

### 23.14 Finaler Wackler

Kurz vor dem guten Ende kommt noch einmal Unsicherheit zurück.

**Zweck:**
Der finale Reveal soll nicht wie eine glatte Erfolgsgeschichte wirken, sondern wie das Ergebnis einer Reise, die bis zuletzt offen war.

**Aktuell vorgesehene Station:** April 2025 (Zoll-Schock / `late_wobble`)

**Tonalität:**
- Kein roter Schockeffekt
- Kein Alarm
- Keine Panik
- Nur ein erneuter Hinweis: Langfristcharts fühlen sich nur im Nachhinein glatt an

**Wirkung:**
Der anschließende dynamische Reveal gewinnt an Kraft, weil er nach einer letzten Unsicherheit kommt. Das Ende bleibt bis zuletzt offen — genau wie in Echtzeit.

**JSON-Flag:** `flags.finalWobble: true` für den April-2025-Block.

---

### 23.15 Informationsethik / Kontrollierter Informationsentzug

Der kontrollierte Informationsentzug in Screen 2 ist kein Dark Pattern.

**Begründung — warum er zulässig ist:**
- Die App rekonstruiert historische Perspektive, sie erfindet keine Knappheit
- Die Daten werden am Ende vollständig gezeigt
- Keine Kaufentscheidung wird erzwungen
- Keine künstliche Dringlichkeit wird behauptet
- Keine Zukunft wird versprochen
- Keine Scham wird erzeugt

**Begründung — warum er ethisch korrekt ist:**
Der Nutzer kennt im Rückblick zu viel. Screen 2 nimmt ihm dieses Wissen vorübergehend weg, um die damalige Unsicherheit sichtbar zu machen. Das korrigiert eine kognitive Verzerrung (Hindsight Bias), statt eine neue zu erzeugen.

**Offenlegungs-Test:**
Wenn dem Nutzer erklärt wird, warum die App so gestaltet ist — würde er sich geholfen oder manipuliert fühlen? Antwort muss „geholfen" sein.

**Abgrenzung zu Dark Patterns:**

| Dark Pattern | Was diese App macht |
|---|---|
| Fake-Knappheit | Keine Countdown-Uhr, kein Ablaufdatum |
| Versteckte Kosten | Keine Kosten, kein Produkt |
| Erzwungene Aktion | Nutzer kann jederzeit aufhören |
| Beschämung | Kein Strafzettel, kein Verlierer-Ton |
| Täuschung | Historische Rekonstruktion, keine Erfindung |

---

### 23.16 Microcopy-Regeln

**Tonalität:**
- ruhig
- konkret
- nicht schreiend
- nicht moralisierend
- nicht triumphierend
- nicht defätistisch
- keine Börsenhelden-Sprache
- keine Verlierer-/Gewinner-Beschämung

**Gute Formulierungen:**
```
In der fertigen Rückblick-Grafik ist das später nur ein Knick.
```
```
Der Sparplan läuft weiter — aber die Belohnung ist nicht zu sehen.
```
```
Heute beginnt wieder ein Chart, dessen Ende niemand kennt.
```

**Verbotene Formulierungen:**
```
Wer jetzt verkauft, ist selbst schuld.
```
```
Nur wer durchhält, wird belohnt.
```
```
Jetzt bloß nicht aussteigen!
```
```
Die Börse crasht dramatisch.
```
```
Danach geht es wieder nach oben.
```

**Begründung:**
Die letzten drei verbotenen Formulierungen nehmen dem Nutzer das Endwissen vorweg — genau das, was die App nicht tun darf, solange Screen 2 läuft.

---

### 23.17 Button-Labels als Micro-Commitment

Der Button `Weiter investiert bleiben` ist nicht nur Navigation.

**Er ist ein bewusstes Micro-Commitment:**
Der Nutzer bestätigt nicht „weiter zur nächsten Folie", sondern: „Ich bleibe in dieser historischen Situation investiert."

**Regeln:**
- Dieser Button darf nicht generisch `Weiter` heißen.
- Das Label muss die Handlungsentscheidung benennen, nicht die UI-Navigation.

**Label-Wechsel beim finalen Reveal:**
```
Ergebnis ansehen
```
Dieser Wechsel signalisiert: Die Zeitreise ist abgeschlossen. Jetzt kommt ein anderer Zustand. Der Kontrast ist gewollt.

---

### 23.18 Screen 4 als Transfer, nicht Verkaufsdruck

Screen 4 soll nicht sagen:
> „Jetzt handeln, sonst verpasst du alles."

Screen 4 soll sagen:
> „Heute ist wieder ein Anfang ohne fertigen Chart."

**Ziel:**
Der Nutzer soll Handlungsfähigkeit spüren, nicht Druck.

**CTA-Kandidaten** [redaktionell zu bestätigen — E-04]:
```
Meine nächsten 10 Jahre starten
```
oder
```
Heute Marktzeit sammeln
```

Claude entscheidet diesen CTA nicht selbst, solange die Spec redaktionell offen ist.

**Was Screen 4 nicht enthält:**
- Keine Zukunftsprognose
- Keinen Zukunftschart
- Keine neue Zahl
- Keinen Countdown
- Keine Beschämung für Zögern

---

### 23.19 P→B→N-Einordnung

**Proven — bewährt, ohne Risiko:**
- Echte MSCI-CSV als Datenbasis
- Echte historische 10-Jahres-Strecke
- Echte redaktionell belegte Stationen
- Keine Prognose

**Better — ein klarer Nutzensprung:**
- Nicht nur fertiger Rückblick-Chart, sondern Anti-Hindsight-Zeitreise
- Nutzer erlebt Unsicherheit statt nur Ergebnis
- Hindsight Bias wird aktiv aufgebrochen, nicht bestätigt

**New — bewusst isoliert, mit Nachweis:**
- Keine klassische Rechner-App
- Keine reine Chart-App
- Geführte Psycho-App: historische Zeitreise mit kontrolliertem Endwissens-Entzug
- Dieser Mechanismus (New) ist in Pilot-2 isoliert und wird vor dem Rollout auf weitere Apps evaluiert
