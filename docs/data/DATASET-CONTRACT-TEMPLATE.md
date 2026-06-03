Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Dataset Contract: [Dataset-ID]

Vorlage — vor Verwendung alle Platzhalter ersetzen.
Abgelegter Contract: `docs/data/contracts/[dataset-id].md`

---

## Zweck

[Warum existiert dieses Dataset? Welches fachliche Ziel wird damit verfolgt?]

---

## Konsumenten / Apps

[Welche Apps oder Features nutzen dieses Dataset?]

---

## Datenklasse

[ ] Index
[ ] ETF
[ ] Makro
[ ] Wechselkurs
[ ] Geldmarkt
[ ] Sonstiges: ___

---

## Fachliche Definition

| Feld | Wert |
|---|---|
| Name | [offizieller Indexname oder Produktname] |
| Anbieter | [Organisation, die den Index/das Produkt betreibt] |
| Variante | Price Return / Net Return / Gross Return / Total Return / NAV / Börsenkurs |
| Währung | [ISO-Code] |
| Frequenz | täglich / monatlich / jährlich |
| Startdatum | [YYYY-MM-DD] |
| Enddatum | [YYYY-MM-DD oder „laufend"] |

---

## Quelle

| Feld | Wert |
|---|---|
| Primäre Definitionsquelle | [offizielle Institution] |
| Praktische Datenquelle | [wo die Daten tatsächlich heruntergeladen wurden] |
| Tier | [0 / 1 / 2 / 3 — gemäß SOURCE-TIERS.md] |
| Abrufdatum | [YYYY-MM-DD] |
| Exportmethode | [z.B. CSV-Download, Excel-Export, manuelle Erstellung] |
| Plausibilitätsprüfung | [womit wurde die Reihe gegengeprüft?] |

---

## CSV-Schema

```
[Spaltennamen, Trennzeichen, Dezimalzeichen, Datumsformat]

Beispiel:
Datum;Wert
2002-01-31;1234,56
```

Technische Anforderungen (→ CSVParser.js):
- Semikolon als Trennzeichen
- Komma als Dezimalzeichen
- Datum im Format YYYY-MM-DD
- Monatsultimo bei monatlichen Daten
- Keine Kommentarzeilen
- Keine Leerzeilen innerhalb der Daten

---

## Qualitätsregeln

- [ ] Monatsultimo-Konformität geprüft
- [ ] Keine fehlenden Monate innerhalb des Zeitraums
- [ ] Keine Duplikate
- [ ] Numerische Werte vorhanden (keine leeren Zellen)
- [ ] Mindestanzahl Datenpunkte: [N] Monate
- [ ] Reihe ist konsistent (keine Varianten- oder Währungswechsel innerhalb der Datei)

---

## Einschränkungen

[Bekannte Lücken, Qualitätsprobleme, lizenzrechtliche Hinweise,
Nutzungsbeschränkungen, Caveats für die Interpretation.]

---

## LLM-Regeln

Diese Regeln gelten für Claude und andere LLMs, die dieses Dataset verwenden:

- Daten nicht erfinden oder interpolieren
- Variante nicht eigenmächtig ändern
- Währung nicht eigenmächtig ändern
- Quelle nicht eigenmächtig austauschen
- ETF-Daten nicht als Indexdaten verwenden
- CSVParser nicht ändern
- Fehlende Monate nicht stillschweigend auffüllen
- [Dataset-spezifische Regeln ergänzen]

---

## Owner

Projektinhaber: Albert Warnecke

Änderungen an Quelle, Variante, Währung oder Freigabestatus nur durch den Projektinhaber.

---

## Änderungsprotokoll

| Datum | Geändert von | Was |
|---|---|---|
| [YYYY-MM-DD] | [Name] | Erstversion |
