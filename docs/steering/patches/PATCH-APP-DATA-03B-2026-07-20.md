# APP-DATA-03b – HTTP-Upload-Dienst kontrolliert zurückbauen

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/steering/patches/UEBERGABE_steuerungsfaden_csv-upload-pipeline-app-data-00-03a_2026-07-20.md
- docs/steering/patches/PATCH-APP-DATA-02-2026-07-20.md
- docs/steering/patches/PATCH-APP-DATA-03A-2026-07-20.md
- tools/upload-dienst/server.js
- tools/upload-dienst/config.example.json
- tools/upload-dienst/config.local.json, falls vorhanden
- tools/upload-dienst/package.json
- tools/upload-dienst/start-upload-dienst.ps1
- tools/upload-dienst/public/upload.html
- content/files/app-data/csv-validator.mjs
- content/files/app-data/pruefe-csv.bat
- .gitignore
- content/.gitignore

## Ausgangslage

Der lokale Offline-Prüfer unter `content/files/app-data/` ist von Albert mit echten CSV-Dateien geprüft und abgenommen.

Der frühere HTTP-Upload-Dienst unter `tools/upload-dienst/` auf Port 4790 ist ein verworfener Architekturpfad. Er darf vollständig entfernt werden.

Der gemeinsame Parser-Kern `parseCsvText()` in `Theme/assets/js/fw-chart-engine/data/CSVParser.js` bleibt bestehen. Er wird vom Offline-Prüfer benötigt und ist wieder als `forbidden` geschützt.

## Auftrag

Baue ausschließlich den verworfenen HTTP-Upload-Dienst kontrolliert zurück.

1. **Vorprüfung**
   - Suche nach allen tatsächlichen Laufzeitreferenzen auf `tools/upload-dienst`, Port `4790` und dessen Startskript.
   - Historische Erwähnungen in Patch- und Übergabedokumenten sind ausdrücklich kein Löschgrund.
   - Prüfe, ob aktuell ein Prozess auf `127.0.0.1:4790` lauscht. Falls ja, verifiziere zusätzlich über Kommandozeile/Pfad, dass es genau der Prozess aus `tools/upload-dienst` ist, und beende ausschließlich diesen Prozess. Keine anderen Node- oder Ghost-Prozesse anfassen.

2. **Rückbau**
   - Entferne nach erfolgreicher Vorprüfung den vollständigen Ordner `tools/upload-dienst/` einschließlich lokaler Konfiguration, Startskript, Oberfläche, Server und `package.json`.
   - Entferne aus der Root-`.gitignore` ausschließlich den zugehörigen APP-DATA-02-Block für `tools/upload-dienst/config.local.json`.
   - Keine Dateien im eigenständigen `content`-Repository löschen oder verändern.
   - Keine historischen Patch- oder Übergabedokumente ändern oder löschen.

3. **Negativnachweise**
   - Kein lauschender Prozess auf Port 4790.
   - `tools/upload-dienst/` existiert nicht mehr.
   - Keine nicht-historische Laufzeitreferenz auf den entfernten Dienst, seine Konfigurationsdatei oder sein Startskript.
   - Root-`.gitignore` enthält keinen verwaisten Upload-Dienst-Eintrag mehr.

4. **Positivnachweise**
   - `content/files/app-data/csv-validator.mjs` und `pruefe-csv.bat` bleiben unverändert vorhanden.
   - Der Offline-Prüfer und seine automatisierten Tests laufen weiter grün.
   - `CSVParser.js`, `FinanzwesirData.js`, `ChartEngine.js`, Theme, Ghost-Installation und `C:\Tools\ghost-local\site\content\files\app-data` bleiben vollständig unangetastet.

## Feste Grenzen

- Kein `data-app-file`; das folgt erst als eigener Auftrag.
- Keine Änderung an CSVParser.js, FinanzwesirData.js, ChartEngine.js oder `.claude/PROTECTED_PATHS.json`.
- Kein Theme-Build, kein ZIP, kein Ghost-Upload und keine Ghost-Konfigurationsänderung.
- Keine Änderung an CSV-Dateien, Vertrags-/Protokolldateien oder Skripten unter `content/files/app-data/`.
- Keine Commits.
- Keine pauschale Beendigung von `node.exe` oder anderen Prozessen.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- Ergebnis der Prozess- und Referenzvorprüfung
- exakt entfernte Dateien und `.gitignore`-Delta
- Negativnachweise zum entfernten Dienst
- Positivnachweise zum Offline-Prüfer und den unangetasteten Tabu-Zonen
- Restabweichungen oder Blocker
