Stand: 2026-06-04 | Erstellt von: Claude | Session: raw-to-csv-acwi

# Dataset Contract: MSCI ACWI Net Return EUR Monthly

---

## Zweck

Benchmark-Reihe für die App prokrastinations-preis: monatliche Net-Return-Zeitreihe
des MSCI ACWI in EUR — zeigt die globale Marktrendite (Industrieländer + Schwellenländer)
als Vergleichsmaßstab für die Opportunitätskosten von Prokrastination bei der Geldanlage.

---

## Konsumenten / Apps

- Apps/prokrastinations-preis (Pilot)

---

## Datenklasse

[x] Index

---

## Fachliche Definition

| Feld        | Wert                                      |
|-------------|-------------------------------------------|
| Name        | MSCI ACWI Index                           |
| Anbieter    | MSCI Inc.                                 |
| Variante    | Net Return                                |
| Währung     | EUR                                       |
| Frequenz    | monatlich                                 |
| Startdatum  | 2000-12-29                                |
| Enddatum    | laufend                                   |

---

## Quelle

| Feld                      | Wert                                            |
|---------------------------|-------------------------------------------------|
| Primäre Definitionsquelle | MSCI Inc. (msci.com)                            |
| Praktische Datenquelle    | MSCI Performance Tool (msci.com)                |
| Tier                      | 0                                               |
| Abrufdatum                | beim Download nachtragen                        |
| Exportmethode             | Export über MSCI Performance Tool               |
| Plausibilitätsprüfung     | nach Download festlegen                         |

---

## CSV-Schema

```
date;index_value
2000-12-29;100,000 EUR
2001-01-31;103,495 EUR
```

Trennzeichen: Semikolon
Dezimalzeichen: Komma
Datumsformat: YYYY-MM-DD (letzter Handelstag des Monats)
Währungssuffix: Pflicht — `EUR` nach dem Wert, CSVParser erkennt daraus unitKey = CURRENCY_EUR

---

## Qualitätsregeln

- [x] Monatsultimo-Konformität geprüft (letzter Handelstag je Monat)
- [x] Keine fehlenden Monate innerhalb des Zeitraums
- [x] Keine Duplikate
- [x] Numerische Werte vorhanden (keine leeren Zellen)
- [x] Mindestanzahl Datenpunkte: ca. 306 Monate (Dez 2000 bis laufend) — tatsächlich: 306
- [x] Reihe konsistent (kein Varianten- oder Währungswechsel innerhalb der Datei)
- [x] EUR-Suffix in allen Datenwerten vorhanden

---

## Einschränkungen

- Startdatum 2000-12-29 (tatsächlicher erster Datenpunkt aus MSCI Performance Tool)
- MSCI-Daten nur für interne Redaktionsarbeit — keine öffentliche Weiterverbreitung der Rohdaten
- Kein automatischer Update — manueller Abruf erforderlich
- Rohdatei (historyIndex.xls) liegt in `data-raw/index/msci-acwi/` — nicht im produktiven Pfad

---

## LLM-Regeln

- Daten nicht erfinden oder interpolieren
- Variante nicht eigenmächtig ändern (Net Return bleibt Net Return)
- Währung nicht eigenmächtig ändern (EUR bleibt EUR)
- Quelle nicht eigenmächtig austauschen
- ETF-Daten nicht als Indexdaten verwenden
- CSVParser nicht ändern
- Fehlende Monate nicht stillschweigend auffüllen

---

## Owner

Projektinhaber: Albert Warnecke

Änderungen an Quelle, Variante, Währung oder Freigabestatus nur durch den Projektinhaber.

---

## Extraktion

Parameter für `tools/raw-to-csv.py` — wird durch Skill `/raw-to-csv` gelesen.

```
source:         data-raw/index/msci-acwi/historyIndex.xls
output:         Theme/assets/data/b1/msci-acwi-net-return-eur-monthly.csv
header_row:     7
date_col:       0
date_format:    %b %d, %Y
value_col:      1
expected_start: 2000-12-29
min_rows:       306
```

Neue MSCI-Lieferung: neue XLS in `data-raw/index/msci-acwi/` ablegen, `/raw-to-csv` aufrufen.

---

## Änderungsprotokoll

| Datum      | Geändert von | Was         |
|------------|--------------|-------------|
| 2026-06-04 | Claude       | Erstversion |
