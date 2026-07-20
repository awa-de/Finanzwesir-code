# APP-DATA-04a – `data-app-file`-Card-Vertrag analysieren

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/spec/ARCHITECTURE STRATEGY PAPER VX.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md
- docs/steering/engine/WORKING-FEATURES.md
- docs/steering/patches/UEBERGABE_steuerungsfaden_csv-upload-pipeline-app-data-00-03a_2026-07-20.md
- docs/steering/patches/PATCH-APP-DATA-03B-2026-07-20.md
- Theme/assets/js/fw-chart-engine/core/ChartEngine.js
- Theme/assets/js/fw-chart-engine/data/CSVParser.js
- Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js
- tests/engine/bar-all.test.html
- tests/engine/line-ci.test.html
- tests/engine/pie-ci.test.html
- tests/engine/security-gatekeeper.test.html

## Ausgangslage

Der aktive Redaktionsweg für App-Daten ist abgeschlossen:

```text
CSV lokal unter content/files/app-data prüfen
→ manuell per FileZilla (SFTP/FTPS) nach Ghost/content/files/app-data übertragen
→ Ghost liefert sie unter /content/files/app-data/<dateiname>.csv aus
```

Der ehemalige HTTP-Upload-Dienst ist zurückgebaut. Der gemeinsame Parser-Kern und die bestehende Chart-Semantik bleiben unverändert.

Aktuell versteht `ChartEngine` nur `data-csv`. Das ist der explizite Fixture-Adapter der Testseiten und bleibt dafür erhalten.

Für produktive Ghost-HTML-Cards soll zusätzlich `data-app-file` eingeführt werden. Die Card darf später weitere Optionen enthalten; dieser Auftrag regelt ausschließlich die Datenquellen-Schnittstelle.

Zielbild:

```html
<div class="financial-chart-module"
     data-app-file="acwi-world.csv"
     data-type="line">
</div>
```

Die Engine ergänzt zentral den festen relativen Basiswert:

```text
/content/files/app-data/
```

## Auftrag

Ermittle und dokumentiere den minimalen, sicheren und testbaren Vertrag für `data-app-file`. Ändere nichts.

Beantworte mit Code- und Testbelegen:

1. **Bestehender Quellpfad**
   - Wo liest ChartEngine aktuell `data-csv`?
   - Welche Fehlermeldungen, URL-Prüfungen und Parser-Optionen greifen danach?
   - Welche tatsächlichen Test-Verwendungen von `data-csv` müssen unverändert bleiben?

2. **Neuer `data-app-file`-Vertrag**
   - Definiere den exakten zulässigen Wert als kanonischen Basisnamen aus Kleinbuchstaben, Ziffern, `-`, `_` und Endung `.csv`.
   - Definiere ausdrücklich unzulässige Werte: Leerzeichen, Großbuchstaben, Umlaute, Slash, Backslash, `..`, Prozentkodierung, Query/Fragment, URL und absoluter Pfad.
   - Leite die genaue relative CSV-URL aus dem konstanten Basiswert und dem Dateinamen ab.
   - Bestimme, ob `data-csv` und `data-app-file` gegenseitig exklusiv sein müssen und wie die klare Fehlermeldung bei keinem oder beiden Attributen lautet.
   - Bestimme, welche bestehenden Card-Attribute (`data-type`, Titel, Farben, Optionen) davon bewusst unberührt bleiben.

3. **Semantik und Sicherheit**
   - Belege, dass die aus `data-app-file` gebildete relative URL die bestehende URL-Gatekeeper-Prüfung passieren darf.
   - Belege, dass Line/Bar weiterhin `expectDate: true` und Pie/Donut weiterhin `expectDate: false` erhalten.
   - Bestimme, ob die Engine lokalen Offline-Prüfzustand oder dessen Erkennungsergebnis kennen muss. Keine Annahme ohne Codebeleg.

4. **Minimaler Umsetzungsumfang für APP-DATA-04b**
   - Benenne die exakten Dateien und das kleinstmögliche Delta.
   - Definiere neue bzw. angepasste Testfälle für:
     - gültige `data-app-file`-Cards für Linie, Balken und Torte;
     - weiterhin gültige `data-csv`-Fixture-Cards;
     - fehlende Datenquelle;
     - beide Quellen zugleich;
     - jeden Typ unzulässigen Dateinamens;
     - unveränderte Parser- und Chart-Semantik.
   - Lege einen Windows-11-Build-, ZIP- und manuellen Ghost-Prüfplan vor. Theme wird weiterhin nur über Ghost Admin hochgeladen, nie direkt in `C:\Tools\ghost-local\site\content\themes\` kopiert.

## Feste Grenzen

- Nichts ändern und keine Dateien schreiben.
- Kein Parser-Umbau und keine Änderung an CSVParser.js oder FinanzwesirData.js.
- Keine Änderung an Bar-, Line-, Pie- oder Donut-Semantik.
- Kein Zugriff auf den lokalen Offline-Prüfzustand aus dem Browser.
- Kein Theme-Build, kein ZIP und kein Ghost-Upload.
- Kein Rückgriff auf den entfernten HTTP-Upload-Dienst.
- Kein Redesign und keine Beschränkung künftiger Card-Optionen außer dem hier geregelten Datenquellen-Attribut.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- belegter Ist-Zustand von `data-csv`
- vollständiger `data-app-file`-Vertrag
- Quellen-Entscheidungstabelle einschließlich Fehlerfällen
- Semantik-/Sicherheitsbefund
- Minimalumfang und Testmatrix für APP-DATA-04b
- Windows-11-Auslieferungsplan
- Geänderte Dateien: keine
- Restabweichungen oder Blocker
