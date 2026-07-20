# APP-DATA-03a – Lokalen Offline-CSV-Prüfer implementieren

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/spec/ARCHITECTURE STRATEGY PAPER VX.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md
- Theme/assets/js/fw-chart-engine/data/CSVParser.js
- Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js
- Theme/assets/js/fw-chart-engine/core/ChartEngine.js
- tests/engine/bar-all.test.html
- tests/engine/line-ci.test.html
- tests/engine/pie-ci.test.html
- .gitignore
- content/.gitignore, falls vorhanden
- docs/steering/patches/PATCH-APP-DATA-00-2026-07-20.md
- docs/steering/patches/PATCH-APP-DATA-01-2026-07-20.md
- docs/steering/patches/PATCH-APP-DATA-02-2026-07-20.md

## Ziel

Baue den lokalen, per Doppelklick startbaren Offline-Prüfer für Chart-CSV-Dateien.

Der Redaktionsablauf lautet künftig:

```text
CSV lokal unter content/files/app-data ablegen
→ pruefe-csv.bat doppelklicken
→ neue oder inhaltlich geänderte Dateien werden geprüft
→ bei GRÜN später manuell per FileZilla (SFTP/FTPS) hochladen
→ lokal zum Laufzeittest nur die geprüften CSV nach C:\Tools\ghost-local\site\content\files\app-data kopieren
```

Der Offline-Prüfer nutzt denselben vorhandenen Parser-Kern `parseCsvText()` wie die Browser-Chart-Engine. Es gibt keinen Parser-Klon und keine Änderung an `CSVParser.js`.

## Feste Grenzen

- `tools/upload-dienst/` bleibt in diesem Auftrag vollständig unangetastet. Kein Stoppen, Löschen oder Umbauen des HTTP-Diensts.
- Kein FTP-/SFTP-Upload und keine automatische Datenübertragung implementieren.
- Keine Änderung an Ghost, Theme, ChartEngine, CSVParser.js oder FinanzwesirData.js.
- Kein Theme-Build, kein ZIP und kein Ghost-Upload.
- Kein `data-app-file`; das ist ein späterer, separater Auftrag.
- Keine Datenform-Heuristik. Der Bar-Vertrag bleibt `timeseries` mit `expectDate: true`.
- Keine stillen, über die ausdrücklich genannten deutschen Zeichen hinausgehenden Dateinamen-Umschreibungen.

## Zielstruktur

Lege an:

```text
content/files/app-data/
├── csv-contract.json          # versioniert; Datenform je kanonischem Dateinamen
├── csv-validator.mjs          # versioniert; lokale Prüflogik
├── pruefe-csv.bat             # versioniert; Windows-Doppelklick-Einstieg
└── validation-state.json      # lokal, gitignoriert; Prüfzustände und Hashes
```

Lege außerdem einen kleinen, versionierten Test unter `tests/` an, nicht unter `content/files/app-data/`. Testartefakte dürfen nicht als potenzielle Upload-Dateien neben den echten CSVs liegen.

`validation-state.json` ist mit einem gezielten Eintrag in der passenden `.gitignore` auszuschließen. `csv-contract.json`, Batch-Datei und Validator bleiben versioniert.

## Verbindlicher Namensvertrag

Für jede CSV wird vor Vertragsauflösung, Hash und Parser-Prüfung der kanonische Dateiname gebildet:

1. vollständig kleinschreiben;
2. deutsche Zeichen ersetzen:
   - `ä` → `ae`
   - `ö` → `oe`
   - `ü` → `ue`
   - `ß` → `ss`
   Großschreibung wird durch Schritt 1 abgedeckt.
3. Endung ist ausschließlich `.csv`.

Beispiel: `MSCI-Überblick.csv` wird zu `msci-ueberblick.csv`.

Ist der kanonische Name anders, benennt der Prüfer die echte Datei um. Vor **jeder** Umbenennung muss er jedoch den vollständigen Dateisatz vorprüfen:

- kein Überschreiben vorhandener Dateien;
- kein Konflikt, wenn zwei Eingaben auf denselben kanonischen Namen fallen;
- bei Konflikt keinerlei Umbenennung und klarer Fehler.

Nach dieser Umwandlung sind nur ASCII-Buchstaben, Ziffern, `-`, `_` und `.csv` zulässig. Andere Zeichen werden abgewiesen, nicht automatisch ersetzt. Keine Leerzeichen-zu-Bindestrich-Regel und keine weitere Transkription erfinden.

## Vertrags- und Zustandsdateien

`csv-contract.json` ist die fachliche, versionierte Zuordnung. Beispiel:

```json
{
  "files": {
    "acwi-world.csv": { "dataForm": "timeseries" },
    "asset-allocation.csv": { "dataForm": "snapshot" }
  }
}
```

Zulässige Werte sind ausschließlich:

- `timeseries` → `expectDate: true` für Linie und Balken;
- `snapshot` → `expectDate: false` für Torte und Donut.

Eine CSV ohne Vertragszeile ist ein klarer Fehler und wird nicht geprüft oder als erfolgreich markiert. Der Prüfer darf keine Datenform erraten.

`validation-state.json` enthält pro erfolgreicher Datei mindestens:

- kanonischen Dateinamen;
- SHA-256 der exakten geprüften Dateibytes;
- `dataForm`;
- kombinierten Prüfer-Fingerabdruck aus `CSVParser.js` und `csv-validator.mjs`;
- Zeitpunkt des letzten Erfolgs.

Ändert sich Dateiinhalt, Datenform oder Prüfer-Fingerabdruck, muss die Datei erneut geprüft werden. Bei einem Fehler bleibt der vorherige erfolgreiche Zustand unverändert. Für nicht mehr vorhandene Dateien dürfen reine Zustandszeilen bereinigt werden; die fachliche Vertragsdatei bleibt unverändert.

## Prüflogik

1. Alle unmittelbaren `*.csv` im App-Datenordner ermitteln; Hilfs-, Konfigurations- und Skriptdateien ignorieren.
2. Vollständige Namensvorprüfung und gegebenenfalls konfliktfreie kanonische Umbenennung durchführen.
3. Zu jedem kanonischen Namen die fachliche Datenform aus `csv-contract.json` laden.
4. SHA-256 und Prüfer-Fingerabdruck gegen `validation-state.json` vergleichen.
5. Bei unverändertem, gültigem Zustand: als „übersprungen – unverändert“ ausgeben.
6. Bei neu/geändert: Datei mit `parseCsvText(text, { expectDate, delimiter: ';' })` prüfen.
7. Erfolg: Zustand atomar aktualisieren und grüne Datei-Zeile ausgeben.
8. Fehler: Dateiname, Datenform und originale Parser-Fehlermeldung einschließlich Zeilennummer ausgeben; Zustand dieser Datei nicht aktualisieren.
9. Am Ende klare Zusammenfassung: geprüft, übersprungen, erfolgreich, fehlgeschlagen; Exit-Code ungleich null bei mindestens einem Fehler.

Die Prüfung verändert den CSV-Inhalt nicht. Der gespeicherte SHA-256 bezieht sich deshalb exakt auf die Datei, die später per FileZilla hochgeladen wird.

## Windows-Doppelklick

`pruefe-csv.bat`:

- ermittelt seinen eigenen Ordner robust;
- nutzt zuerst `C:\Tools\ghost-local\runtime\node22\node.exe`;
- gibt bei fehlender Laufzeit eine klare Fehlermeldung aus;
- startet `csv-validator.mjs` im selben Ordner;
- lässt das sichtbare Fenster nach Erfolg oder Fehler mittels `pause` geöffnet;
- reicht den Exit-Code des Prüfers nachvollziehbar aus.

## Zwingende Nachweise

Erstelle und führe einen automatisierten Test mit isolierten temporären Testordnern aus. Nach dem Test keine Artefakte unter `content/files/app-data/` zurücklassen.

Nachweisen:

1. `MSCI-Überblick.csv` wird konfliktfrei in `msci-ueberblick.csv` umbenannt.
2. Ein Kanonisierungs-Konflikt führt zu keiner einzigen Umbenennung.
3. Gültige Zeitreihe wird mit `timeseries` akzeptiert.
4. Gültiger Snapshot wird mit `snapshot` akzeptiert.
5. Ungültiges Datum bei `timeseries` schlägt fehl; Hash-Zustand bleibt unverändert.
6. Unveränderte, vorher gültige Datei wird übersprungen.
7. Inhaltliche Änderung löst erneute Prüfung aus.
8. Änderung von `dataForm` löst erneute Prüfung aus.
9. Änderung des Prüfer-Fingerabdrucks löst erneute Prüfung aus.
10. Fehlender Vertrags-Eintrag schlägt verständlich fehl.
11. Bestehende Bar-, Line- und Pie-Fixtures bleiben per `parseCsvText()` ohne Regression lesbar.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- gelesene Pflichtquellen
- geänderte Dateien und präzises Delta
- Namensvertrag mit einem realen Beispiel
- Ergebnis aller elf Nachweise
- Bedienanleitung: CSV ablegen → Vertragszeile ergänzen → BAT doppelklicken → grüne Dateien mit FileZilla übertragen
- bestätigte Nicht-Änderungen: Upload-Dienst, Ghost, Theme, ChartEngine, CSVParser.js
- Restabweichungen oder Blocker
