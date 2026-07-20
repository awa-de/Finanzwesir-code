# GHOST-CHART-00 – Chart-Page-Vorprüfung

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/steering/theme-build/GHOST-LOKALBETRIEB.md
- docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md
- docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md
- docs/spec/CHART_PLUGIN_ARCHITEKTUR.md
- docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/steering/engine/WORKING-FEATURES.md
- tests/engine/line-ci.test.html
- tests/fixtures/engine/test_data-Liniendiagramm.csv
- Theme/page.hbs
- Theme/post.hbs
- Theme/assets/js/fw-chart-engine/index.js

## Auftrag

1. Ermittle anhand des Codes exakt, welche JavaScript-Dateien und in welcher Reihenfolge eine Page laden muss, damit eine HTML-Card mit `.financial-chart-module` arbeitet.
2. Weise nach, ob `Theme/page.hbs` diese Laufzeit heute lädt oder nicht.
3. Vergleiche den funktionierenden Testaufbau aus `line-ci.test.html` mit `post.hbs` und `page.hbs`. Prüfe insbesondere, ob eine Engine-Initialisierung doppelt erfolgen könnte.
4. Lies die Header-Zeile der Test-CSV. Weise nach, ob die Zuordnung `World: #0071BF, EM: #8D0267, ACWI: #218380` exakt zu den CSV-Spalten passt.
5. Prüfe die Dokumentation auf den vorgesehenen Ghost-Upload-Ablauf für CSV-Dateien. Trenne sauber: durch Dokumentation belegt, nur technisch wahrscheinlich und nur durch einen realen lokalen Ghost-Upload testbar.
6. Lege den minimalen Umsetzungsumfang für GHOST-CHART-01 fest.

## Feste Grenzen

- Nichts ändern.
- Keine Dateien schreiben.
- Kein Build, kein ZIP, kein Ghost-Upload.
- Keine Änderungen an ChartEngine, CSVParser, Renderern, Strategien, Janitor, CSS, Homepage oder Posts vorschlagen.
- Kein neues Plugin, kein neues Datenformat, kein neuer CSS-Namespace.
- `financial-chart-module` ist der bestehende Engine-Vertrag; kein neues `fw-*` für Pages einführen.
- Die Test-Überschrift, `status-badge`, `badge-success` und der manuelle `kg-card`-Wrapper gehören nicht automatisch in die Produktions-HTML-Card. Beurteile sie ausdrücklich.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- Tatsächlicher Startpunkt der Chart-Laufzeit
- Befund zu `page.hbs`
- Befund zu möglicher Doppelinitialisierung
- CSV-Header und Ergebnis des Farb-Mappings
- Belegter CSV-Upload-Workflow und offene reale Ghost-Prüfung
- Exakter Minimalumfang für GHOST-CHART-01
- Geänderte Dateien: keine
- Blocker oder Restunsicherheiten
