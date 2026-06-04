Stand: 2026-06-04 | Geändert von: Claude | Session: data-raw-Workflow

# Datenquellen-Governance — Finanzwesir 2.0

## Verzeichnisstruktur

| Pfad | Rolle | Git-Status |
|---|---|---|
| `data-raw/` | Bronze-Zone: Rohdaten, unveraendert vom Anbieter | gitignored |
| `data-raw/index/[dataset]/` | Marktindizes (MSCI, S&P, ...) | gitignored |
| `data-raw/etf/[dataset]/` | ETF-Kursdaten | gitignored |
| `data-raw/macro/[dataset]/` | Makrodaten (Inflation, Wechselkurse, Geldmarkt) | gitignored |
| `Theme/assets/data/b1/` | Gold-Zone: normalisierte CSV fuer Apps | versioniert |
| `docs/data/contracts/` | Dataset Contracts (Lineage-Dokumentation) | versioniert |

Rohdateien sind unveraenderlich. Neue Version eines Datasets → neue Datei, alte bleibt.
Details und Checkliste direkt im Ordner: `data-raw/README.md`

## Neue Datenquelle hinzufuegen — Checkliste

1. Rohdatei in `data-raw/[klasse]/[dataset]/` ablegen (Original-Dateiname behalten)
2. Rohdatei **nicht bearbeiten** — Bronze-Regel
3. CSV exportieren und normalisieren → `Theme/assets/data/b1/[dateiname nach Contract-Konvention].csv`
4. Dataset Contract anlegen oder pruefen → `docs/data/contracts/[dataset].md`
   Pflichtfelder: Datenklasse, Quelle, Variante, Waehrung, Frequenz, Startdatum, Enddatum, Einschraenkungen
5. `docs/data/DATASET-CATALOG.md` aktualisieren

Referenzbeispiel fuer den vollstaendigen Durchlauf: MSCI World Net Return EUR Monthly
(`data-raw/index/msci-world/historyIndex.xls` → `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`)

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

### Data Need Snapshot in APP_SPEC.md

Jede datengetriebene App-Spec enthält einen Abschnitt
`Datenbedarf / Data Need Snapshot`.

Der Snapshot beschreibt den fachlichen Datenbedarf der konkreten App.
Er ersetzt keinen Dataset Contract.

Für dieses Projekt gilt:

- `APP_SPEC.md` beschreibt: Was braucht diese App konkret?
- `DATASET-CATALOG.md` beschreibt: Welche Datenreihen gibt es oder sind geplant?
- Dataset Contract beschreibt: Was ist bei einer freigegebenen Datenreihe wirklich wichtig?
- Produktive CSV-Datei enthält: die tatsächlichen Werte.

Der Snapshot soll Drift verhindern, aber keine Datenbank im Markdown-Format werden.

Er muss festhalten:

- wofür die App die Daten braucht
- welche ideale Datenreihe fachlich gewünscht ist
- welche Mindestanforderung gilt
- welche Ersatzdaten nicht verwendet werden dürfen
- welche Dataset-ID gemeint ist
- wo später CSV und Contract liegen
- welches CSV-Format erwartet wird
- wie Claude eine vorhandene CSV prüfen soll
- welche Fragen vor dem produktiven Bau offen sind
- welche app-spezifischen Regeln oder Berechnungen gelten

Allgemeine CSV-, Quellen- und Return-Regeln werden nicht pro App dupliziert.
Dafür wird auf `docs/data/` verwiesen.

Grundsatz: So wenig Struktur wie möglich. So viel Klarheit wie nötig.
Keine neuen Dateien, wenn eine bestehende Datei den Zweck erfüllt.
Keine neuen Kategorien, wenn eine bestehende Statusliste reicht.
Keine abstrakte Perfektion, wenn ein konkretes Beispiel robuster ist.
