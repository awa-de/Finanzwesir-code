# APP-DATA-02 – Lokalen CSV-Upload-Dienst implementieren

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/steering/theme-build/GHOST-LOKALBETRIEB.md
- docs/spec/ARCHITECTURE STRATEGY PAPER VX.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- Theme/assets/js/fw-chart-engine/data/CSVParser.js
- Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js
- Theme/assets/js/fw-chart-engine/core/ChartEngine.js
- tests/engine/bar-all.test.html
- tests/engine/line-ci.test.html
- tests/engine/pie-ci.test.html
- docs/steering/patches/PATCH-APP-DATA-00-2026-07-20.md
- docs/steering/patches/PATCH-APP-DATA-01-2026-07-20.md

## Ziel

Implementiere einen eigenständigen lokalen Upload-Dienst für geprüfte Chart-CSV-Dateien.

Der Dienst ist weder Ghost-Core noch Theme und läuft ausschließlich auf Windows 11 unter `127.0.0.1` auf einem von Ghost (`2368`) verschiedenen konfigurierbaren Port.

Verbindlicher Datenfluss:

Datei wählen
→ lokaler Upload-Dienst
→ serverseitige Prüfung mit demselben Parser-Kern wie der Browser
→ nur bei Erfolg atomar speichern
→ Ghost liefert die gespeicherte CSV statisch aus
→ ein späterer, eigener Auftrag verbindet `data-app-file` mit dieser URL.

Zielordner:

`C:\Tools\ghost-local\site\content\files\app-data`

Erfolgs-URL:

`/content/files/app-data/<dateiname>.csv`

## Festgelegte V1-Entscheidungen

- Es gibt keine Ghost-Admin-API, keine Ghost-File-Card, keinen Ghost-Core-Patch und kein Theme-Build.
- Der Dienst verwendet die vorhandene Node-22-Laufzeit unter `C:\Tools\ghost-local\runtime\node22\` und keine neue Laufzeit oder Bibliothek, sofern Node-22-Bordmittel ausreichen.
- Die Browser-Oberfläche wird vom Upload-Dienst selbst ausgeliefert. Damit gibt es keinen CORS- und keinen Ghost-Theme-Eingriff.
- Die Oberfläche fragt die Datenform verpflichtend ab:
  - `timeseries` für Linie und Balken → `expectDate: true`;
  - `snapshot` für Torte/Donut → `expectDate: false`.
  Keine Heuristik. Der bestehende Bar-Vertrag bleibt unverändert.
- Der sichtbare Dateiname ist ein vom Nutzer gewählter reiner Basisname mit Endung `.csv`. Er bildet die stabile App-URL. Pfadbestandteile, `..`, führender Punkt und NUL werden abgelehnt.
- Es gibt keinen stillen Namenswechsel. Ein vorhandener Name erzeugt `409`. Ein ausdrücklicher Ersetzen-Schalter ist Teil von V1 und ersetzt ausschließlich atomar.
- Die gespeicherte Repräsentation ist eine **transportkanonische, validierte CSV**: UTF-8 ohne BOM, Zeilenenden `\n`, Semikolon als Trennzeichen. Feldinhalte werden nicht aus `FinanzwesirData` zurückserialisiert und weder fachlich umgerechnet noch umsortiert. Die fachliche Normalisierung in das versiegelte Objekt erfolgt weiterhin beim Parser-Lauf. Damit bleiben doppelte Header und abweichende Spaltenzahlen ausdrücklich unverändert offene Vertragsfragen und werden in diesem Auftrag weder akzeptiert noch abgelehnt verändert.
- `data-csv` bleibt der Test-/Fixture-Adapter. Dieser Auftrag implementiert **nicht** `data-app-file` und verändert weder ChartEngine noch Ghost-Cards.

## Harte Vorprüfungen – vor dem Implementierungsschritt

Führe zuerst nachweisbar diese drei Prüfungen aus:

1. **Gemeinsamer Parser-Kern:** Prüfe mit der realen Node-22-Laufzeit, ob der bestehende ES-Module-Code einschließlich `FinanzwesirData` ohne Browser-Global importierbar ist. Prüfe zusätzlich, dass ein extrahierter textbasierter Kern dieselbe gültige Zeitreihe, denselben Pie-Snapshot und denselben ungültigen Datumsfehler verarbeitet wie bisher.

2. **UTF-8-BOM:** Prüfe das tatsächliche Verhalten des bestehenden Parsers bei einer UTF-8-BOM-CSV. Lege den kleinsten Weg fest, wie der Upload-Dienst vor der gemeinsamen Parser-Prüfung exakt ein führendes BOM entfernt und anschließend transportkanonisch speichert. Das darf keine Änderung am Verhalten bestehender `data-csv`-Fixtures auslösen.

3. **Atomarer Austausch:** Prüfe auf dem konkreten Laufwerk `C:` mit isolierten Testdateien, dass der gewählte Node-22-Mechanismus eine vorhandene CSV nur bei erfolgreichem Ersatz atomar austauscht. Temp- und Zielpfad müssen auf demselben NTFS-Volume liegen. Testdateien danach vollständig entfernen.

Wenn eine Vorprüfung scheitert, nicht mit einem Ersatzmechanismus improvisieren, keine Parser-Kopie anlegen und keine produktive Datei schreiben. Dann Status ROT mit Befehl, Ergebnis und kleinstem notwendigen Folgeauftrag ausgeben.

## Umsetzung nach drei grünen Vorprüfungen

1. **Eine Parser-Quelle**
   - Löse aus `CSVParser.js` einen schmalen, fetch-freien, textbasierten exportierten Kern heraus.
   - `CSVParser.parse(url, options)` bleibt nach außen und im Verhalten unverändert und nutzt diesen Kern weiter.
   - Der Upload-Dienst importiert genau diesen Kern; kein zweites Parser-Modul, kein Code-Kopieren und keine neue Parser-Semantik.
   - Bestehende Line-, Bar- und Pie-Tests dürfen nicht regressieren.

2. **Upload-Dienst**
   - Lege den neuen Dienst unter `tools/upload-dienst/` an.
   - Nutze einen kleinen Node-HTTP-Server mit Node-22-Bordmitteln. Füge keine Laufzeitabhängigkeit hinzu, sofern der Multipart-Empfang mit Bordmitteln nachweislich funktioniert.
   - Binde ausschließlich an `127.0.0.1`.
   - Liefere die Upload-Oberfläche über denselben Prozess aus.
   - Implementiere `POST /upload` mit `multipart/form-data` und den Feldern `file`, `dataForm` und optional `replace`.
   - Begrenze den Upload auf eine dokumentierte, konfigurierbare Maximalgröße; beim Überschreiten abbrechen und nichts unter `content/files/app-data` schreiben.

3. **Schreib- und Fehlervertrag**
   - Rohdaten nur in einem nicht öffentlich ausgelieferten Temp-Verzeichnis auf `C:` ablegen, niemals unter `content/files/`.
   - Vor dem endgültigen Schreiben: Endung, Basisname, Datenform, UTF-8, BOM-Behandlung und gemeinsamer Parser-Kern prüfen.
   - Fehler oder Abbruch: Temp-Datei entfernen; beim Start verwaiste Temp-Dateien bereinigen; Zielordner unberührt lassen.
   - Erfolg: transportkanonische Datei in Temp schreiben und atomar in den Zielordner übernehmen.
   - HTTP-Antworten:
     - Erfolg: `201` mit `{ "status": "ok", "url": "/content/files/app-data/<dateiname>.csv" }`;
     - Parser-/Validierungsfehler: `422`, ohne Dateischreiben;
     - Namenskonflikt: `409`;
     - zu große Datei: `413`;
     - interner Fehler: `500`, ohne interne Pfade in der Browser-Antwort.

4. **Lokaler Betrieb**
   - Lege ein sichtbares PowerShell-Startskript im Dienstordner an, das die festgelegte Node-22-Laufzeit verwendet und mit `Strg+C` beendet wird.
   - Lege eine versionskontrollierbare Beispielkonfiguration und eine lokale Konfiguration an. Pfade, Port, Bind-Adresse und Maximalgröße dürfen nicht im Code fest verdrahtet sein.
   - Verwende einen sicheren, von Ghost verschiedenen Standardport. Den konkreten Port durch eine Vorprüfung auf Verfügbarkeit bestimmen und dokumentieren.

5. **Minimale Upload-Oberfläche**
   - Dateiauswahl, Auswahl Zeitreihe/Snapshot, Upload-Schaltfläche und ausdrücklich sichtbarer Ersetzen-Schalter.
   - Zeige Erfolg mit kopierbarer relativer App-URL oder verständliche Fehlermeldung.
   - Kein Design-Ausbau, keine Ghost-Einbettung und keine Authentifizierung in V1.

## Zwingende Nachweise

- gültige Zeitreihe → `201`, Datei im Zielordner, URL per Ghost erreichbar, bestehender Linienchart kann mit dieser URL geladen werden;
- gültiger Snapshot → `201`, URL per Ghost erreichbar, bestehender Piechart kann mit dieser URL geladen werden;
- ungültiges Datum bei `timeseries` → `422`, keine neue Datei und keine erreichbare URL;
- unzulässiger Dateiname/Pfad-Traversal → `422`, kein Schreiben außerhalb des Zielordners;
- Namenskonflikt ohne Ersetzen → `409`, vorhandene Datei bytegleich erhalten;
- explizites Ersetzen → Erfolg, neue Datei erreichbar, keine Zwischen- oder Restdatei im Zielordner;
- Abbruch während Upload → keine Zieldatei, verwaistes Temp wird beim nächsten Start bereinigt;
- BOM-CSV → gespeicherte Datei ohne BOM und mit `\n`-Zeilenenden;
- Regression: `bar-all.test.html`, `line-ci.test.html` und `pie-ci.test.html` bestehen unverändert.

## Feste Grenzen

- Keine Änderung an Ghost-Core, Ghost-Konfiguration, Ghost-Admin oder dem hochgeladenen Theme.
- Kein ZIP, kein Theme-Upload und kein direkter Eingriff in eine Ghost-Page.
- Keine Änderung der Bar-/Line-/Pie-Semantik, der fachlichen Werteinterpretation oder der offenen Regeln zu doppelten Headern und Spaltenanzahlen.
- Kein Docker, keine Cloud, kein POSIX-Skript, kein Plugin und kein Produktions-Deployment.
- Keine Browser-Credentials für Schreibzugriff.
- Keine Arbeit an `data-app-file`; das folgt erst nach erfolgreichem Upload-Dienst.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- gelesene Pflichtquellen
- Ergebnis der drei Vorprüfungen
- geänderte Dateien und präzises Delta
- Build-/Startnachweis unter Windows 11
- Nachweis jedes Pflichtfalls
- bestätigter Zielpfad und Beispiel-URL
- Regressionsergebnis für Bar, Line und Pie
- Bedienanleitung: Starten → Datei wählen → Datenform wählen → Upload → URL kopieren → Ersetzen
- Restabweichungen oder Blocker
