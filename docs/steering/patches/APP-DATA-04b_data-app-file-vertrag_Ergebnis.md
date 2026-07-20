Stand: 2026-07-20 | Session: APP-DATA-04b | Geändert von: Claude

# APP-DATA-04b — `data-app-file`-Vertrag umgesetzt und live bestätigt

## Status: GRÜN

Vertrag aus APP-DATA-04a vollständig umgesetzt, automatisiert verifiziert und von
Albert live in einem echten Ghost-Post (`/index-vergleich/`) bestätigt.

## Umsetzung

`Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `_processContainer()`
(vormals Z.320-324, jetzt Z.320-339): `data-app-file` als zweite, zu `data-csv`
exklusive Datenquelle. Bei `data-app-file` wird der Wert gegen
`^[a-z0-9_-]+\.csv$` geprüft und zu `/content/files/app-data/<name>.csv`
aufgelöst; bei `data-csv` bleibt alles exakt wie zuvor. Kein Zeichen nach diesem
Block verändert — derselbe `csvUrl` speist denselben `parser.parse()`-Aufruf
wie vor diesem AP.

Kein Eingriff an `CSVParser.js`, `FinanzwesirData.js` oder
`.claude/PROTECTED_PATHS.json`.

## Nachweise

- **Validierungslogik** (isoliert in Node nachgebaut, da `ChartEngine` eng an
  echtes DOM gekoppelt ist): 17/17 grün — Exklusivität (beide/keine Quelle
  gesetzt), `data-csv` unverändert, 3 gültige `data-app-file`-Namen, alle 11 im
  Auftrag genannten unzulässigen Formen (Leerzeichen, Großbuchstabe, Umlaut,
  `/`, `\`, `..`, Prozentkodierung, Query, Fragment, volle URL, absoluter Pfad).
- **Parser-Regression:** 7 bestehende Bar-/Line-/Pie-Fixtures erneut über
  `parseCsvText()` fehlerfrei gelesen.
- **Testseite** `tests/engine/app-file.test.html` (neu): 3 Positivfälle je
  Charttyp + 2 Exklusivitätsfälle + 11 Fälle unzulässiger Dateinamen.
- **Theme-ZIP:** aus `Theme/` ohne `src/` gebaut, ohne `npm run css:build`
  (Alberts ausdrückliche Abweichung vom ursprünglichen Auslieferungsplan, da
  keine CSS-Datei geändert wurde). Struktur geprüft (`package.json`,
  `index.hbs`, `post.hbs` auf ZIP-Root-Ebene, aktualisierte `ChartEngine.js`
  enthalten).
- **Live-Bestätigung durch Albert:** Theme `finanzwesir-theme-app-data-04b`
  über Ghost Admin aktiv. Realer Post `/index-vergleich/` mit
  `data-app-file="world-acwi-em.csv"` rendert korrekt gegen die bereits im
  Ghost-Laufzeitordner (`C:\Tools\ghost-local\site\content\files\app-data\`)
  liegende, vorher offline geprüfte Datei.

## Befund während der Live-Prüfung — kein Code-Fehler, Bedienfehler korrigiert

Albert hatte zunächst `data-csv="world-acwi-em.csv"` verwendet (bloßer
Dateiname ohne Pfadmarkierung). Das ist unverändertes, korrektes
GATEKEEPER-Verhalten aus `CSVParser.js`: `isRelative` erkennt nur Werte, die
mit `/`, `./` oder `../` beginnen — ein bloßer Dateiname erfüllt keine der drei
Bedingungen und wird zu Recht abgelehnt (`data-csv` erwartet immer einen
vollständigen, direkt nutzbaren Pfad; das war schon vor diesem AP so). Fix war
keine Codeänderung, sondern die Korrektur auf das dafür vorgesehene Attribut:
`data-app-file="world-acwi-em.csv"`. Danach lief es. Für Folge-Threads: bei der
redaktionellen Umstellung bestehender Karten von `data-csv` auf
`data-app-file` ist dieser Attributwechsel der einzige nötige Schritt.

## Geänderte Dateien

`Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `tests/engine/app-file.test.html` (neu).
Ephemer außerhalb jedes Repos: 2 zusätzliche Test-CSVs im Ghost-Laufzeitordner
(`bd_single_year.csv`, `test_data_torte.csv`), können jederzeit gelöscht werden.

## Restabweichungen oder Blocker

Keine. `data-app-file` ist produktiv nutzbar. Nicht Teil dieses Auftrags: die
Rest-Redaktion bestehender Ghost-Karten von `data-csv` auf `data-app-file`
(betrifft nur, was Albert künftig manuell umstellt).
