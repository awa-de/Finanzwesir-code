# APP-DATA-01 – Upload-Dienst: Architektur und verbindlicher Vertrag

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/steering/theme-build/GHOST-LOKALBETRIEB.md
- docs/spec/ARCHITECTURE STRATEGY PAPER VX.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/steering/engine/WORKING-FEATURES.md
- docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md
- Theme/assets/js/fw-chart-engine/data/CSVParser.js
- Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js
- Theme/assets/js/fw-chart-engine/core/ChartEngine.js
- tests/engine/bar-all.test.html
- tests/engine/line-ci.test.html
- tests/engine/pie-ci.test.html

## Gesicherter Ausgangspunkt

Die Zielarchitektur ist beschlossen:

Datei wählen
→ lokaler Upload-Dienst
→ serverseitiger Parser prüft und normalisiert
→ nur akzeptierte CSV wird atomisch nach `content/files/app-data` gespeichert
→ Chart lädt ausschließlich diesen geprüften Datenbestand
→ der Browser-Parser erzeugt daraus erneut den versiegelten `FinanzwesirData`-Tresor.

Der lokale Zielpfad lautet:

`C:\Tools\ghost-local\site\content\files\app-data`

Ghost liefert Dateien darunter bereits als statische öffentliche Dateien unter
`/content/files/app-data/<dateiname>.csv` aus. Diese Dateien sind bewusst nicht geheim.

`bar` bleibt unverändert eine datierte Zeitreihe (`expectDate: true`).
`data-csv` bleibt unverändert der Fixture-Adapter der Tests. Produktive Ghost-Cards sollen künftig zusätzlich `data-app-file` verwenden; deren vollständiger Card-Vertrag ist nicht Gegenstand dieses Auftrags.

## Auftrag

Lege den minimalen, verbindlichen Architektur- und Schnittstellenvertrag für den eigenständigen lokalen Upload-Dienst fest. Der Dienst ist weder Teil von Ghost noch des Themes.

Er muss folgende Punkte konkret entscheiden und begründen:

1. **Systemgrenzen und Verantwortlichkeiten**
   - Browser-Upload-Oberfläche;
   - lokaler Upload-Dienst;
   - gemeinsamer Parser-/Normalisierungsvertrag;
   - Ghost als unveränderter statischer Auslieferer;
   - Theme und Chart-Engine als unveränderte Konsumenten.

2. **Sicherer Upload-Ablauf**
   - Die Datei wird serverseitig geprüft, bevor sie einen endgültigen Namen im Zielordner erhält.
   - Fehlerhafte Dateien dürfen weder im Zielordner noch unter einer öffentlich erreichbaren URL zurückbleiben.
   - Bestimme temporären Eingangsbereich, atomisches Ersetzen/Verschieben und Aufräumverhalten bei Fehler oder Abbruch.
   - Kein Ghost-Core-Patch, keine Ghost-Admin-API, keine Ghost-File-Card, keine Browser-Credentials für Schreibzugriff.

3. **Parser-Vertrag ohne zwei Implementierungen**
   - Der Upload-Dienst darf die CSV-Prüfung nicht nur im Browser ausführen.
   - Bestimme konkret, wie derselbe fachliche Parser-/Normalisierungsvertrag im Upload-Dienst und im Browser genutzt wird, ohne zwei auseinanderlaufende Implementierungen zu schaffen.
   - Prüfe dazu insbesondere, ob ein schmaler, gemeinsamer, textbasierter Kern aus dem bestehenden Parser herauslösbar ist; keine Implementierung und keine unbelegte Härtung empfehlen.
   - Bestimme, was „normalisiert speichern“ technisch bedeutet, obwohl die Chart-Engine anschließend CSV lädt: gespeicherte Repräsentation, Zeichensatz, Trennzeichen und Zeilenenden.
   - Die bestehende Bar-, Line- und Pie-Semantik bleibt unverändert. Keine Typ-Erkennung auf Verdacht: Lege fest, woher der Upload-Dienst die notwendige Datenform (Zeitreihe oder Snapshot) verbindlich erhält.

4. **Datei- und Fehlervertrag**
   - erlaubte Endung und Dateiname;
   - Bereinigung bzw. Ablehnung von Pfadbestandteilen;
   - eindeutige Überschreibregel;
   - Rückmeldung an die Oberfläche für Erfolg, Validierungsfehler, Namenskonflikt und internen Fehler;
   - welche stabile App-URL nach Erfolg zurückgegeben wird.

5. **Betrieb auf Windows 11**
   - minimaler lokaler Start-/Stop- und Konfigurationsbedarf;
   - welche Konfiguration für einen späteren Produktionsserver bewusst getrennt werden muss;
   - keine Docker-, Cloud-, POSIX- oder Plugin-Lösung ohne nachgewiesenen Bedarf.

6. **Minimaler Folgeauftrag APP-DATA-02**
   - eine konkrete, kleinste Implementierungsreihenfolge;
   - exakte Dateien bzw. neuen Verzeichnisse;
   - Tests, die vor dem ersten echten Schreiben zwingend sind;
   - ausdrücklich ausgeschlossene Arbeiten.

## Feste Grenzen

- Nichts ändern und keine Dateien schreiben.
- Kein Build, kein ZIP und kein Ghost-Upload.
- Ghost-Core, Ghost-Konfiguration, Theme und bestehende Chart-Engine bleiben unverändert.
- Keine Änderung an CSVParser.js, FinanzwesirData.js oder ChartEngine.js vorschlagen, sofern sie nicht zwingend für einen nachweislich gemeinsamen Parser-Kern erforderlich ist.
- Keine Aufweichung des Bar-Vertrags und keine automatische Semantik-Heuristik.
- Die in APP-DATA-00 gefundenen Abweichungen zu doppelten Headern und Spaltenzahlen nicht stillschweigend durch Dokumentenänderung erledigen. Sie nur als offene Vertragsentscheidung ausweisen.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- verbindliche Zielarchitektur mit Datenfluss
- Verantwortlichkeits- und Vertrauensgrenzen
- präziser Upload-, Speicher- und Fehlervertrag
- Entscheidung zum gemeinsamen Parser-Kern
- Entscheidung zur Datenform Zeitreihe/Snapshot
- Windows-11-Betriebsmodell
- Minimalumfang für APP-DATA-02
- offene, echte Entscheidungen für Albert
- Geänderte Dateien: keine
- Blocker oder Restunsicherheiten
