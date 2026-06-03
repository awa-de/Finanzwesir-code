Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Datenquellen-Governance — Finanzwesir 2.0

## Grundprinzip

Externe Finanzdaten sind für Finanzwesir 2.0 ein redaktionelles Produkt.

Sie unterliegen denselben Qualitäts- und Dokumentationspflichten wie Texte und Charts.

## Was Claude darf

- CSV-Dateien technisch verarbeiten (über den bestehenden CSVParser)
- App-Logik auf freigegebene Datasets aufbauen
- README- und Contract-Dateien dokumentieren
- Fehler in Daten dokumentieren und melden
- Validierungsideen vorschlagen
- Validierungsskripte außerhalb des Parsers bauen, wenn ausdrücklich beauftragt

## Was Claude nicht darf

Claude darf bei externen Finanzdaten niemals:

- Daten erfinden oder interpolieren
- Fehlende Monate stillschweigend auffüllen
- Indexvariante eigenmächtig ändern
- Währung eigenmächtig ändern
- Quelle eigenmächtig austauschen
- ETF-Daten als Indexdaten deklarieren oder verwenden
- Price Return wegen längerer Historie eigenmächtig wählen, wenn Net Return verfügbar ist
- Yahoo-/Investing-/Foren-Daten ohne explizite Identitätsprüfung als Net Return deklarieren
- App-lokale Datenregeln bauen, wenn sie allgemein gelten
- Den CSVParser ändern
- Eine alternative CSV-Parsing-Logik bauen
- „Verbesserungen" am CSVParser vorschlagen

## CSVParser ist untouchable

Der CSVParser liegt unter:

```
Theme/assets/js/fw-chart-engine/data/CSVParser.js
```

Er ist Teil der bestehenden Chart-Engine-Infrastruktur. Er liest CSV-Dateien,
erwartet standardmäßig Datumsspalten, prüft erlaubte URL-Quellen, wandelt
YYYY-MM-DD in echte Date-Objekte um, normalisiert deutsche Dezimalzahlen und
baut daraus ein FinanzwesirData-Objekt.

**Claude darf diesen Parser nur nutzen, nie ändern.**

Gilt auch für FinanzwesirData.js — ebenfalls untouchable.

## Pflichtfelder für jede externe CSV

Jede externe CSV-Datei braucht einen Dataset Contract oder mindestens eine
dokumentierte Erfassung folgender Felder:

| Feld | Bedeutung |
|---|---|
| Datenklasse | Index / ETF / Makro / Wechselkurs / Geldmarkt / sonstiges |
| Quelle | Primäre Definitionsquelle + praktische Datenquelle |
| Variante | Price Return / Net Return / Gross Return / NAV / Börsenkurs |
| Währung | ISO-Code (z.B. USD, EUR) |
| Frequenz | täglich / monatlich / jährlich |
| Startdatum | frühestes Datum in der Reihe |
| Enddatum | letztes Datum oder „laufend" |
| Einschränkungen | bekannte Lücken, Qualitätsprobleme, Nutzungsrechte |

Keine Daten ohne Dokumentation.

## Indexdaten sind keine ETF-Proxies

Wenn eine App ein Marktprinzip anhand eines Index zeigt, darf kein konkreter ETF
als Proxy verwendet werden, solange dadurch eine Produktdiskussion ausgelöst würde.

ETF-Daten dürfen nicht als Indexdaten getarnt werden.

Indexdaten dürfen nicht durch ETF-Proxies ersetzt werden, wenn die App ein
Prinzip anhand eines Index zeigen soll.

## Datenhoheit

Die Datenhoheit liegt beim Projektinhaber (Albert Warnecke).

Der Projektinhaber erstellt und pflegt externe CSV-Dateien redaktionell.

Claude unterstützt Dokumentation, Validierung und App-Logik — aber er entscheidet
nicht über Quellen, Varianten oder Währungen.

## Verhältnis zur App-Spec

Apps, die externe Daten nutzen, sollen auf `docs/data/` verweisen statt eigene
Quellenregeln vollständig zu duplizieren. App-spezifische Ergänzungen sind erlaubt,
allgemeine Datenquellenregeln jedoch nicht pro App zu wiederholen.

→ Aufgabe AP-DATA-07: App-Spec prokrastinations-preis auf Datenlayer umstellen.
