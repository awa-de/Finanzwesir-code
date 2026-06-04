# Session-Log — Finanzwesir 2.0
Wird geleert nach /distill. Einträge: [FRICTION] [WIN] [PREF] [QUESTION] [OK]

## 2026-06-04 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-04 – SESSION START (Faden 2) | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-04 – Konsistenzpatch Datenlayer nach raw-to-csv-Arbeit
- [PREF] §9 in PROJECT-STATUS.md (Einstieg nächste Session) nach Gate-Beobachtung explizit in Scope aufgenommen — Gate-Dialog als Scope-Klärungs-Kanal bewährt

## 2026-06-04 – MSCI ACWI Net Return EUR — Contract + CSV (Sofort-erledigt)
- [OK] Keine Vorkommnisse
- Contract docs/data/contracts/msci-acwi-net-return-monthly.md angelegt
- CSV Theme/assets/data/b1/msci-acwi-net-return-eur-monthly.csv erstellt — 306 Zeilen, 2000-12-29 bis 2026-05-29, alle Checks grün

## 2026-06-04 – Python vs. PowerShell
- [PREF] Python für Datei-Inhalt (lesen, parsen, validieren) — PowerShell für Dateisystem und Git. Grund: PowerShell COM ist locale-abhängig und nicht deterministisch. Python-Libraries (xlrd, openpyxl, csv) liefern gleichen Output auf jedem Rechner.

## 2026-06-04 – data-raw-Infrastruktur + APP-01-B01 CSV + /raw-to-csv Skill
- [PREF] Python statt PowerShell für XLS-Verarbeitung (Alberts expliziter Wunsch)
- [WIN] .gitignore hatte Datenquellen für Apps/ bereits drin — kein Datenschutz-Risiko während Umbenennung
- [FRICTION] Ordnerstruktur zweimal erweitert: msci/ → msci-world/ → index/msci-world/ — schrittweise im Dialog entwickelt
- [WIN] Validierungs-Script mit 5 Checks — erkennt Lücken, Duplikate, falsches Startdatum; CSV nur bei grünem Report
- [WIN] openpyxl fehlte — sofort nachinstalliert; XLSX-Support vollständig

## 2026-06-04 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-04 – AP-DATA-01/04/05 | Quellenrecherche, Dataset Contract, Dateiname abgeschlossen
- [WIN] Startdatum 2000-12-29 — 14 Monate früher als Annahme (2002-01-31 war unbelegt); Rohdatei bestätigt
- [FRICTION] Contract-Vorschau zeigte `1234,56` ohne EUR-Suffix; nach CSVParser-Analyse korrigiert auf `135,668 EUR`
- [WIN] EUR-Suffix-Lösung vollautomatisch durch Parser — kein Code nötig; unitKey CURRENCY_EUR aus _detectSuffix

## 2026-06-04 – SESSION START | Fokus: APP-01 — prokrastinations-preis (Faden 2)
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-04 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-04 – B-01-B Währung | APP_SPEC + OFFENE-ARBEITSPUNKTE aktualisiert
- [WIN] CSVParser hat Währungserkennung (unitKey) bereits eingebaut — kein neuer Code nötig
- [WIN] Rucksack-Prinzip klärt Architektur: currency kommt aus Daten, nicht hardcoded
- [OK] B-01-B entschieden: EUR Pflicht, Error State (c) bei Abweichung, Redakteur-Verantwortung für EUR-Suffix in CSV
- [OK] APP_SPEC §7.2/§7.5/§10/§11/§16/§17/§18 + OFFENE-ARBEITSPUNKTE.md aktualisiert

## 2026-06-03 – AP-DATA-08-Nachputz | Status- und Versionsdrift bereinigt
- [OK] Keine Vorkommnisse

## 2026-06-03 – DIST-05 | Distill + Abschluss-Ritual
- [OK] Keine Vorkommnisse

## 2026-06-03 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-03 – Datenlayer-Setup | docs/data/ + Theme/assets/data/b1/
- [OK] Keine Vorkommnisse

## 2026-06-03 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-03 – APP-01-datenlayer-konsistenz | Advocatus-Diaboli-Konsistenzpatch
- [WIN] Post-Patch-Verifikation fand T-07 mit altem Spaltennamen (indexValue → index_value) → sofort behoben; 8 Edits statt 7 geplanter

## 2026-06-03 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## 2026-06-03 – AP-DATA-08 | Data Need Snapshot Blaupause in Factory-Standard dokumentiert
- [OK] Keine Vorkommnisse

## 2026-06-03 – AP-DATA-07 | Data Need Snapshot dokumentiert
- [FRICTION] APP_SPEC.md Edit-Match fehlgeschlagen (ausdrücklicher vs. ausdrückliche in Z. 210) → §7-Umbau in 4 Teiledits zerlegt

## 2026-06-03 – SESSION START | Fokus: APP-01 — prokrastinations-preis
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`
