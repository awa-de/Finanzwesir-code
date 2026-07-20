# APP-DATA-05 – CSV-App-Daten, Chart-Cards und Spezifikationen dokumentarisch konsolidieren

Lies vollständig zuerst:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/steering/patches/UEBERGABE_steuerungsfaden_csv-upload-pipeline-app-data-00-03a_2026-07-20.md
- docs/steering/patches/APP-DATA-03b_upload-dienst-rueckbau_Ergebnis.md
- docs/steering/patches/APP-DATA-04b_data-app-file-vertrag_Ergebnis.md
- docs/spec/ARCHITECTURE STRATEGY PAPER VX.md
- docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md
- docs/spec/APP-INTERFACE.md
- docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md
- docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md
- docs/editorial/Cheat-Sheet HTML-Karten.md
- docs/editorial/AUTHOR_GUIDE-v3.md
- docs/steering/engine/WORKING-FEATURES.md
- docs/steering/theme-build/GHOST-LOKALBETRIEB.md
- Theme/assets/js/fw-chart-engine/core/ChartEngine.js
- Theme/assets/js/fw-chart-engine/data/CSVParser.js
- content/files/app-data/csv-validator.mjs
- content/files/app-data/pruefe-csv.bat

Danach durchsuche vollständig die aktive Dokumentation und ihre Indizes nach mindestens:

```text
data-csv
data-app-file
app-data
upload-dienst
4790
FileZilla
CSV
financial-chart-module
```

## Ziel

Ziehe die **gesamte aktive Dokumentation** auf den tatsächlich funktionierenden Stand der CSV-App-Daten-Pipeline und des `data-app-file`-Card-Vertrags nach.

Das Ziel ist eine für Redakteure und Entwickler widerspruchsfreie Wahrheit: kein veralteter HTTP-Upload-Dienst, keine falschen Card-Beispiele, kein Theme-Build pro CSV und keine implizite Datenquelle.

## Verbindlicher Ist-Stand

### 1. Lokale Prüfung und Veröffentlichung

```text
CSV unter content/files/app-data ablegen
→ pruefe-csv.bat doppelklicken
→ Prüfer kanonisiert den Dateinamen und prüft neue/geänderte CSVs
→ bei GRÜN: für den lokalen Laufzeittest CSV manuell nach
  C:\Tools\ghost-local\site\content\files\app-data kopieren
→ für Produktion dieselbe geprüfte CSV mit FileZilla (SFTP/FTPS) nach
  Ghost/content/files/app-data übertragen
```

- Ghost ist am Kopier-/FileZilla-Schritt nicht beteiligt; es liefert die Datei danach lediglich statisch aus.
- Die CSV ist öffentlich lesbar, weil der Browser sie zum Chart-Laden benötigt.
- CSV-Änderungen erfordern weder Theme-Build noch Theme-Upload.
- Der frühere HTTP-Upload-Dienst unter `tools/upload-dienst/` und Port `4790` ist verworfen und zurückgebaut. Er darf nicht als aktueller Weg erscheinen.

### 2. Offline-Prüfer

- Ort: `content/files/app-data/` im eigenständigen `content`-Git-Repository.
- Start: `pruefe-csv.bat` per Doppelklick unter Windows 11.
- Gemeinsamer Parser-Kern: `parseCsvText()` aus `Theme/assets/js/fw-chart-engine/data/CSVParser.js`; keine zweite Parser-Implementierung.
- Der Prüfer kanonisiert Dateinamen: kleingeschrieben, `ä→ae`, `ö→oe`, `ü→ue`, `ß→ss`; danach nur ASCII-Buchstaben, Ziffern, `-`, `_` und `.csv`.
- Die Datenform wird automatisch und strukturell ermittelt; keine manuell zu pflegende `dataForm`-Eingabe. Zeitreihe verlangt ISO-Daten in Spalte 1; Snapshot schließt eine vollständig ISO-datierte Kategorie-Spalte aus.
- SHA-256-Zustand verhindert unnötige Wiederholungsprüfungen. Geänderte Datei oder Prüfer führt zur erneuten Prüfung.

### 3. Produktive HTML-Card

Produktive Ghost-Cards verwenden ausschließlich `data-app-file`:

```html
<div class="financial-chart-module"
     data-app-file="world-acwi-em.csv"
     data-type="line">
</div>
```

Die Engine validiert den Namen und bildet zentral:

```text
/content/files/app-data/world-acwi-em.csv
```

Zulässige Namen: `^[a-z0-9_-]+\.csv$`.

`data-csv` bleibt bewusst der Fixture-Adapter der Tests. Es enthält dort immer einen unmittelbar nutzbaren relativen oder erlaubten URL-Pfad, zum Beispiel:

```html
data-csv="../fixtures/engine/test_data-Liniendiagramm.csv"
```

Ein bloßer Dateiname in `data-csv` ist ungültig. Produktive Beispiele dürfen ihn nicht verwenden.

`data-csv` und `data-app-file` sind gegenseitig exklusiv. Alle weiteren Card-Attribute bleiben unabhängig davon verfügbar: mindestens `data-type`, `data-title`, `data-colors`, `data-options` sowie spätere, hier nicht eingeschränkte Erweiterungen.

### 4. Unveränderte Semantik

- `line` und `bar`: `expectDate: true`.
- `pie` und `doughnut`: `expectDate: false`.
- Parser, `FinanzwesirData`, Bar-/Line-/Pie-Semantik sowie die offenen Fragen zu doppelten Headern und Spaltenzahl werden durch diesen Auftrag nicht verändert oder neu entschieden.

## Auftrag

1. **Dokumentinventar und Klassifikation**
   - Klassifiziere alle Treffer in aktiv/normativ, aktiv/redaktionell, Vorlage, Archiv oder historische Patch-/Ergebnisdokumentation.
   - Aktualisiere alle aktiven normativen, technischen und redaktionellen Dokumente, die den Ist-Stand berühren.
   - Historische Patch-, Ergebnis- und Archivdokumente nicht umschreiben. Sie bewahren die damalige Wahrheit. Falls eine aktive Navigation auf sie verweist, darf sie als historische Referenz gekennzeichnet werden.

2. **Neue kanonische Workflow-Seite**
   - Lege genau eine neue, aktive Referenzseite an:
     `docs/editorial/CSV-APP-DATEN-WORKFLOW.md`.
   - Sie beschreibt den vollständigen Redaktionsablauf, lokale Simulation, FileZilla-Übertragung, Namensvertrag, Offline-Prüfer, Hash-Verhalten, produktive Card, Fixture-Ausnahme und typische Fehlerbilder.
   - Sie enthält eine kurze Checkliste „Neue Chart-CSV veröffentlichen“ und eine Checkliste „Bestehende Chart-Card auf data-app-file umstellen“.
   - Verlinke diese Seite aus den passenden Navigations-/Handbuchseiten.

3. **Bestehende Dokumente nachziehen**
   - Aktualisiere alle aktiven produktiven HTML-Card-Beispiele von einem produktiv gemeinten `data-csv` auf `data-app-file`.
   - Erhalte Test-/Fixture-Beispiele mit `data-csv` und erkläre ihren anderen Zweck dort, wo Verwechslung möglich wäre.
   - Entferne oder kennzeichne aktive Aussagen zum HTTP-Upload-Dienst, Port 4790, dessen Oberfläche oder einer Ghost-File-Card als Datenweg als überholt.
   - Ergänze die App-Daten-Pipeline und den gemeinsamen Parser-Kern in den zutreffenden Architektur- und Schnittstellenspezifikationen.
   - Stelle klar: Theme-Upload ist für Theme-/Code-Änderungen nötig, nicht für CSV-Inhaltsänderungen.
   - Prüfe auch Querreferenzen, Inhaltsverzeichnisse, Indizes, Cheat-Sheets und Vorlagen; keine tote oder widersprüchliche Navigation zurücklassen.

4. **Begriffe präzisieren**
   - Verwende für `/index-vergleich/` und vergleichbare Inhalte den korrekten Ghost-Inhaltstyp „Page“, sofern es eine Page ist; keine unzutreffende Bezeichnung „Post“ übernehmen.
   - Unterscheide konsequent: lokale Quell-CSV, lokaler Ghost-Laufzeitordner, Produktions-Ghost-Content-Pfad und öffentlich ausgelieferte URL.
   - Nenne die Dateitransfer-Software sachlich „FileZilla (SFTP/FTPS)“; keine automatische Übertragung behaupten.

## Feste Grenzen

- Dokumentation und Navigationsdateien ändern, sonst nichts.
- Keine Änderungen an JavaScript, CSS, Theme-Dateien, Tests, CSV-Dateien, Prüfer-Skripten, Ghost, `C:\Tools` oder Git-Historie.
- Keine neue technische Funktion, keine neuen Datenform-Regeln und keine erneute Parser-Härtung.
- Keine automatisierte FTP-/SFTP-Übertragung, keinen HTTP-Dienst und keine Ghost-Core-Erweiterung einführen.
- Kein Theme-Build, kein ZIP, kein Ghost-Upload und keine Commits.
- Kein blindes globales Ersetzen von `data-csv`; erst Rolle jedes Treffers klassifizieren.

## Deterministische Abschlussprüfung

1. Liste aller geänderten aktiven Dokumente mit der jeweils korrigierten Aussage.
2. Suche erneut über die aktive Dokumentation:
   - Jeder produktive Card-Beleg verwendet `data-app-file`.
   - Verbleibende `data-csv`-Belege sind als Fixture/Test klar gekennzeichnet oder liegen in historischen/Archivdateien.
   - Keine aktive Betriebsanweisung verweist auf `tools/upload-dienst`, Port `4790` oder eine Ghost-File-Card als App-Datenweg.
   - Jede relevante aktive Dokumentation verlinkt korrekt auf den neuen Workflow oder erklärt ihre bewusste Abgrenzung.
3. Prüfe alle neuen/aktualisierten Markdown-Links lokal auf Ziel und Überschrift.
4. Bestätige ausdrücklich, dass keine nicht-dokumentarische Datei verändert wurde.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- Inventar: aktiv aktualisiert / historisch bewusst unverändert
- neue kanonische Workflow-Seite
- alle geänderten Dateien und präzises Delta
- Nachweise der drei Dokumentationssuchen
- ungeklärte Widersprüche oder bewusst offene Vertragsfragen
- Bestätigung: keine Code-, Theme-, Test-, CSV- oder Ghost-Datei verändert
