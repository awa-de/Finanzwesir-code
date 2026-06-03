Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Offene Arbeitspunkte — Datenlayer Finanzwesir 2.0

---

## AP-DATA-01: Quellenrecherche MSCI World Net Return

**Priorität:** hoch
**Status:** offen

**Ziel:**
Eine belastbare Quelle für MSCI World Net Return Monatsdaten finden.

**Akzeptanzkriterien:**
- Quelle liefert MSCI World, nicht ETF
- Return-Variante ist eindeutig Net Return
- Währung ist eindeutig dokumentiert
- Monatsdaten sind verfügbar oder sauber auf Monatsultimo reduzierbar
- Startdatum und Enddatum sind dokumentiert
- Quelle ist reproduzierbar dokumentiert
- Wenn nur MSCI direkt ab 31.01.2002 verfügbar ist: das als sauberer Mindeststand dokumentieren

**Bekannter Ausgangspunkt:**
MSCI direkt liefert Net Return ab 31.01.2002 (USD und EUR verfügbar).

---

## AP-DATA-02: Prüfung archivierter MSCI-Dateien

**Priorität:** mittel
**Status:** offen

**Ziel:**
Prüfen, ob alte MSCI-Originaldateien mit längerer Historie existieren.

**Quellenarten:**
- Alte MSCI-Excel-Dateien
- Archivierte Downloads
- Wayback-Funde
- Historische MSCI-Factsheets
- Referenzierte Dateien in Wikipedia, Foren oder alten Artikeln

**Akzeptanzkriterien:**
- Datei stammt nachvollziehbar von MSCI oder einer eindeutig seriösen Quelle
- Variante, Währung und Frequenz sind eindeutig
- Keine Verwendung, wenn unklar ist, ob es Net Return ist

---

## AP-DATA-03: Quellenbewertung Yahoo / Investing / Stooq

**Priorität:** mittel
**Status:** offen

**Ziel:**
Bewerten, ob öffentliche Portale für MSCI-World-Daten als produktive Quelle,
Prüfquelle oder nur Notquelle taugen.

**Akzeptanzkriterien:**
- Konkrete Ticker / Symbole dokumentiert
- Datenart geklärt: Price, Net Return, Gross Return, ETF, NAV oder Börsenkurs
- Währung geklärt
- Downloadbarkeit geprüft
- Entscheidung dokumentiert: produktiv / Plausibilisierung / nicht verwenden

---

## AP-DATA-04: Dataset Contract für MSCI World Pilot

**Priorität:** hoch — Blocker für Slice-0
**Status:** offen

**Ziel:**
Ersten konkreten Dataset Contract für den Pilot erstellen.

**Vorgeschlagene Datei:**
`docs/data/contracts/msci-world-net-return-monthly.md`

Das Verzeichnis `contracts/` wird bei Bedarf angelegt. Kurze Begründung vorab.

**Akzeptanzkriterien (aus Template `DATASET-CONTRACT-TEMPLATE.md`):**
- Zweck
- Konsumenten / Apps
- Datenklasse
- Fachliche Definition (Name, Anbieter, Variante, Währung, Frequenz, Start, Ende)
- Quelle (primär, praktisch, Tier, Abrufdatum, Exportmethode, Plausibilitätsprüfung)
- CSV-Schema
- Qualitätsregeln
- Einschränkungen
- LLM-Regeln
- Owner
- Änderungsprotokoll

**Abhängigkeit:** AP-DATA-01 muss vorher mindestens teilweise geklärt sein
(Quelle, Variante, Währung).

---

## AP-DATA-05: Entscheidung Dateiname produktive CSV

**Priorität:** hoch — Blocker für Dateianlage
**Status:** offen

**Ziel:**
Einen stabilen Dateinamen für die spätere MSCI-World-CSV festlegen.

**Kandidaten:**
- `msci-world-net-return-usd-monthly.csv`
- `msci-world-net-return-eur-monthly.csv`
- `msci-world-net-return-monthly.csv` (nur wenn Währung dauerhaft offen bleibt)

**Entscheidungsregel:**
Wenn Währung feststeht → Währung in den Dateinamen aufnehmen.
Wenn Währung noch offen ist → keine produktive CSV anlegen.

**Abhängigkeit:** AP-DATA-01 (Währung muss geklärt sein).

---

## AP-DATA-06: Optionales Validierungsskript prüfen

**Priorität:** niedrig
**Status:** offen

**Ziel:**
Prüfen, ob ein externes Validierungsskript sinnvoll ist.

**Wichtig:** Dieses Skript darf den CSVParser nicht ersetzen. Es darf nur
außerhalb des Parsers vorab prüfen:

- Header-Konformität
- Datumsformat
- Monatsultimo-Konformität
- Lückenlose Monatsfolge
- Mindestanzahl Monate
- Numerische Werte (keine leeren Zellen)
- Duplikate

**Akzeptanzkriterium:**
Empfehlung dokumentieren: jetzt bauen / später bauen / nicht nötig.

---

## AP-DATA-07: App-Spec prokrastinations-preis auf Datenlayer umstellen

**Priorität:** mittel
**Status:** abgeschlossen | 2026-06-03

**Ziel:**
Die App-Spec soll auf den zentralen Datenlayer verweisen statt eigene
Quellenregeln vollständig zu duplizieren.

**Akzeptanzkriterien:**
- App-Spec verweist auf `docs/data/`
- App-Spec enthält nur app-spezifische Ergänzungen
- Keine Dopplung der allgemeinen Datenquellenregeln
- Keine Änderung am CSVParser

**Abhängigkeit:** Datenlayer muss stabil sein (diese Datei und DATENQUELLEN-GOVERNANCE.md).
