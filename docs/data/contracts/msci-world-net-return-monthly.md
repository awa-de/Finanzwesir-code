Stand: 2026-06-04 | Erstellt von: Claude | Session: AP-DATA-04-Contract

# Dataset Contract: MSCI World Net Return EUR Monthly

---

## Zweck

Benchmark-Reihe für die App prokrastinations-preis: monatliche Net-Return-Zeitreihe
des MSCI World in EUR — zeigt die Marktrendite als Vergleichsmaßstab für die
Opportunitätskosten von Prokrastination bei der Geldanlage.

---

## Konsumenten / Apps

- Apps/prokrastinations-preis (Pilot)

---

## Datenklasse

[x] Index

---

## Fachliche Definition

| Feld        | Wert                             |
|-------------|----------------------------------|
| Name        | MSCI World Index                 |
| Anbieter    | MSCI Inc.                        |
| Variante    | Net Return                       |
| Währung     | EUR                              |
| Frequenz    | monatlich                        |
| Startdatum  | 2000-12-29                       |
| Enddatum    | laufend                          |

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
2000-12-29;135,668 EUR
2001-01-31;139,603 EUR
```

Trennzeichen: Semikolon
Dezimalzeichen: Komma
Datumsformat: YYYY-MM-DD (letzter Handelstag des Monats)
Währungssuffix: Pflicht — `EUR` nach dem Wert, CSVParser erkennt daraus unitKey = CURRENCY_EUR

---

## Qualitätsregeln

- [ ] Monatsultimo-Konformität geprüft (letzter Handelstag je Monat)
- [ ] Keine fehlenden Monate innerhalb des Zeitraums
- [ ] Keine Duplikate
- [ ] Numerische Werte vorhanden (keine leeren Zellen)
- [ ] Mindestanzahl Datenpunkte: ca. 306 Monate (Dez 2000 bis laufend)
- [ ] Reihe konsistent (kein Varianten- oder Währungswechsel innerhalb der Datei)
- [ ] EUR-Suffix in allen Datenwerten vorhanden

---

## Einschränkungen

- Startdatum 2000-12-29 (tatsächlicher erster Datenpunkt aus MSCI Performance Tool)
- MSCI-Daten nur für interne Redaktionsarbeit — keine öffentliche Weiterverbreitung der Rohdaten
- Kein automatischer Update — manueller Abruf erforderlich
- Rohdatei (historyIndex.xls) liegt in `Datenquellen für Apps/` — nicht im produktiven Pfad

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

## Änderungsprotokoll

| Datum      | Geändert von | Was         |
|------------|--------------|-------------|
| 2026-06-04 | Claude       | Erstversion |
