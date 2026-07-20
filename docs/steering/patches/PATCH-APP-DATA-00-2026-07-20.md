# APP-DATA-00 – Parser-Vertrag und Bar-Regressionsschutz

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/spec/ARCHITECTURE STRATEGY PAPER VX.md
- docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/steering/engine/WORKING-FEATURES.md
- docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md
- Theme/assets/js/fw-chart-engine/data/CSVParser.js
- Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js
- Theme/assets/js/fw-chart-engine/core/ChartEngine.js
- tests/engine/bar-all.test.html
- tests/engine/irregular-bar.test.html
- tests/engine/bar-ci.test.html
- tests/engine/line-ci.test.html
- tests/engine/pie-ci.test.html
- tests/engine/security-gatekeeper.test.html

## Ausgangslage

Die Architektur für App-Daten ist beschlossen:

Datei wählen
→ Upload-Eingang
→ Parser prüft, normalisiert und akzeptiert/verwirft
→ nur akzeptierte CSV wird nach `content/files/app-data` gespeichert
→ Chart lädt nur diesen geprüften Datenbestand
→ Parser erzeugt im Browser erneut den versiegelten `FinanzwesirData`-Tresor

Der bestehende CSVParser ist bewährter, breit getesteter Bestand. Kein Aktionismus.

Besonders geschützt ist der aktuelle Bar-Vertrag:
`bar` nutzt heute `expectDate: true`.
Bar-Zeitreihen dürfen durch diesen Auftrag keinesfalls verändert oder regressiert werden.

## Auftrag

1. Vergleiche Strategiepapier, Parser-Code, ChartEngine und Testbestand.

2. Erstelle eine belegte Parser-Verhaltensmatrix für:
   - gültige Zeitreihe;
   - gültige Snapshot-/Pie-CSV;
   - doppelte Header;
   - zu kurze Zeile;
   - zu lange Zeile;
   - leere Werte;
   - ungültiges Datum;
   - ungültiger Zahlenwert;
   - Einheiten wie €, %, CHF;
   - abschließendes Semikolon.

   Für jeden Fall ausweisen:
   - Aussage der bindenden Doku;
   - tatsächliches Code-Verhalten;
   - vorhandene Testabdeckung;
   - Bewertung: konsistent / Doku-Drift / möglicher Code-Konflikt.

3. Prüfe den Bar-Vertrag ausdrücklich:
   - Welche Bar-Datenformen verwenden die vorhandenen Tests?
   - Ist `expectDate: true` mit dem Strategiepapier vereinbar?
   - Gibt es einen belegten Grund, Bar-Semantik anzufassen?

4. Prüfe `data-csv`:
   - Welche tatsächlichen Verwendungen existieren im Testbestand?
   - Gibt es belegte veröffentlichte Ghost-Inhalte, die davon abhängen?
   - Leite ab, ob `data-csv` als expliziter Fixture-Adapter für Tests erhalten bleiben muss, während produktive Ghost-Cards künftig `data-app-file` verwenden.

5. Lege erst danach den minimalen, risikoärmsten Umfang von APP-DATA-01 fest.

## Feste Grenzen

- Nichts ändern.
- Keine Dateien schreiben.
- Keine Testdateien erzeugen oder ändern.
- Kein Build, kein ZIP, kein Ghost-Upload.
- Keine Änderung an Bar-, Line- oder Pie-Semantik vorschlagen, sofern kein eindeutiger, belegter Vertragsbruch vorliegt.
- Keine Parser-Härtung nur aufgrund einer abstrakten Wunschregel vorschlagen.
- Ghost-Core bleibt vollständig unberührt.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- Parser-Verhaltensmatrix
- Befund zum Bar-Vertrag
- Befund zu `data-csv`
- Klare Empfehlung: Code unverändert / Doku korrigieren / gezielte Codeänderung nötig
- Falls Codeänderung: exakte Ursache, kleinstes Delta und zwingende Regressionstests
- Minimalumfang für APP-DATA-01
- Geänderte Dateien: keine
- Blocker oder Restunsicherheiten
