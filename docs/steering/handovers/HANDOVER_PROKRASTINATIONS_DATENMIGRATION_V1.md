# Claude-Auftrag — Prokrastinationspreis: CSV-/JSON-Datenmigration auf Ghost-Feed-Vertrag

**Risikoklasse:** B — begrenzte App-Migration auf bereits freigegebene shared Infrastruktur.

## Ziel

Migriere ausschließlich die Datenanbindung von `prokrastinations-preis` auf den bindenden Ghost-Feed-Vertrag:

```text
data-fw-data="msci-world-net-return-eur-monthly.csv"
data-fw-config="stations-de.json"
  -> AppDataResolver
  -> CSVParser / JSONParser + validateStationsJson
  -> versiegelte Vaults
  -> tief eingefrorener AppContext
```

Die freigegebene Umbenennung ist Teil dieses AP:

```text
Apps/prokrastinations-preis/config/stations.de.json
-> Apps/prokrastinations-preis/config/stations-de.json
```

Der JSON-Inhalt bleibt bytegleich. Es findet kein Upload, keine Kopie nach `content/files/app-data` und keine Ghost-Produktivprüfung statt.

## Verbindliche Invarianten

- Beide Card-Werte sind vollständige, kanonische Dateinamen. Kein URL-, Pfad-, Query- oder Fragmentwert wird getrimmt, normalisiert oder an `fetch` gegeben.
- CSV wird ausschließlich durch `resolveCsvAppDataFile()` und den unveränderten `CSVParser` geladen.
- Stationen-JSON wird ausschließlich durch `resolveJsonAppDataFile()` und `JSONParser.parse(url, { validator: validateStationsJson })` geladen.
- `validateStationsJson()` bleibt die app-spezifische Fachvalidierung. JSONParser kennt keine Stationssemantik.
- CSV-Fehler bleiben Error (b); ungültiger/missing JSON-Dateiname, JSON-HTTP-, JSON-Parse- und JSON-Contract-Fehler sind Error (d).
- `buildAppContext()` versiegelt seinen gesamten berechneten, request-scoped Kern tief. Screen-, Fokus-, Timer- und Animationszustand verbleiben im Controller und dürfen nicht in den Kontext wandern.
- Der bestehende lokale DOMContentLoaded-Bootstrap bleibt für diesen AP unverändert. Kein Theme-Bootstrapper, keine Registry und keine Modulverlagerung.

## Pflicht lesen

1. `Apps/prokrastinations-preis/app.js` vollständig.
2. `Apps/prokrastinations-preis/app.test.html` vollständig.
3. `Apps/prokrastinations-preis/APP_SPEC.md` vollständig.
4. `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md` vollständig.
5. `Apps/prokrastinations-preis/config/stations.de.json` vollständig, vor der Umbenennung.
6. `Theme/assets/js/fw-chart-engine/data/AppDataResolver.js` vollständig.
7. `Theme/assets/js/fw-chart-engine/data/JSONParser.js` vollständig.
8. `docs/spec/APP-INTERFACE.md` §3.1, §6–§9.
9. `docs/spec/Der Rucksack (Context Object Pattern).md` §2.2–§2.3.

## Erlaubter Write-Scope

1. `Apps/prokrastinations-preis/app.js`
2. `Apps/prokrastinations-preis/app.test.html`
3. **Rename:** `Apps/prokrastinations-preis/config/stations.de.json` → `Apps/prokrastinations-preis/config/stations-de.json`
4. `Apps/prokrastinations-preis/APP_SPEC.md`
5. `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md`

Keine weiteren Dateien anlegen oder ändern. Insbesondere tabu: alle Dateien unter `content/files/app-data/`, die shared Datenlayer-Dateien, ChartEngine, Theme-Templates, Bootstrapper, CSS, Tailwind-Build, weitere historische Prokrastinations-Dokumente und Decision Log.

## Umsetzung

### 1. App-Code

- Importiere `resolveCsvAppDataFile`, `resolveJsonAppDataFile` und `JSONParser` aus dem shared Datenlayer.
- Ersetze die direkte Übergabe von `container.dataset.fwData` an den CSVParser: Der rohe Card-Wert geht zuerst durch den CSV-Resolver, dessen Ergebnis an CSVParser.parse(). Keine `.trim()`-Kanonisierung des Dateinamens.
- Ersetze `fetch('config/stations.de.json')` vollständig: `loadStations()` erhält den rohen Config-Dateinamen aus `container.dataset.fwConfig`, löst ihn zentral auf und lädt ihn über JSONParser mit `validateStationsJson`.
- Lies in `initApp()` beide Rohwerte getrennt aus der Card und übergib sie parallel an die beiden Loader.
- Implementiere eine kleine lokale Deep-Freeze-Hilfe und verwende sie ausschließlich für den Rückgabewert von `buildAppContext()`. Keine neue globale Utility-Datei.
- Behalte SafeDOM, vorhandene Fachlogik, ChartEngine-Aufrufe, Slug-Check, States und den bisherigen Bootstrap unverändert, soweit sie nicht unmittelbar den Datenpfad betreffen.

### 2. Stationsdatei und aktive Verträge

- Benenne die Quelldatei exakt nach `stations-de.json` um; ihr JSON-Inhalt darf sich nicht ändern.
- Aktualisiere in `APP_SPEC.md` und `STATIONS_CONFIG_CONTRACT.md` alle **aktiven** Produktions-, Card-, Quell-/Fixture- und Sicherheitsreferenzen auf `stations-de.json` und den zentralen app-data-Pfad.
- Historische Befund- und Abschlussdokumente außerhalb des Write-Scopes bleiben historische Wahrheit und werden nicht umgeschrieben.

### 3. Lokale Testseite

- Stelle jede `data-fw-data`-Card der Testseite auf einen reinen kanonischen Dateinamen um; ergänze bei allen Erfolgsfällen `data-fw-config="stations-de.json"`.
- Baue vor dem Modulimport einen **testseitig lokalen** Fetch-Stub ein. Er darf ausschließlich die festen Resolverpfade auf vorhandene lokale CSV-/JSON-Fixtures abbilden und muss alle anderen URLs an den originalen Fetch delegieren oder für gezielte Fehlerfälle deterministisch 404/ungültiges JSON liefern.
- Der Stub ist keine Produktionseinrichtung und darf weder `app.js` noch Theme-Code beeinflussen.
- Ersetze den bisherigen Fremd-URL-Test durch einen ungültigen Dateinamen-Test (Error b).
- Ergänze mindestens drei Error-(d)-Fälle: ungültiger JSON-Dateiname, JSON-404 und syntaktisch oder fachlich ungültiges Stations-JSON. Jeder Fall zeigt den deutschen Error-State, ohne andere Container zu beeinträchtigen.
- Ergänze einen Reduced-Motion-Nachweis: Testseite dokumentiert und simuliert `prefers-reduced-motion: reduce`; Screen 3 zeigt den Ergebniszustand ohne verzögerten Bridge-/Reveal-Zwischenzustand. Keine Behauptung eines Browsernachweises, falls keiner wirklich ausgeführt wurde.

## Nicht-Ziele

- Kein statischer Theme-Bootstrapper, keine literale Registry, keine Änderung der Theme-Einbindung.
- Kein JSON-Offline-Prüfer, kein Upload/FTP und keine Datei unter `content/files/app-data/`.
- Keine Änderung von Stationsinhalten, CSV-Inhalten, ChartEngine, Plugins oder Chart-Strategien.
- Kein neues Testframework und keine neue Ergebnisdatei.

## Fehler-Todeszonen

- `stations.de.json` nach der Umbenennung irgendwo als aktive Laufzeitreferenz belassen.
- Card-Dateiname vor dem Resolver trimmen oder direkt fetchen.
- JSON ohne `validateStationsJson()` in den Vault lassen.
- Error (d) als CSV-Error (b) einordnen oder eine ganze Seite durch einen Containerfehler stören.
- `buildAppContext()` nur an der Wurzel statt rekursiv einfrieren.
- Test-Fetch-Stub versehentlich in Produktionscode übernehmen.

## Nachbedingungen

1. Alle fünf geänderten/umbenannten Dateien vollständig mit UTF-8 erneut lesen.
2. Suche über den erlaubten Scope: keine aktive Laufzeitreferenz auf `stations.de.json`; nur `stations-de.json` ist aktiv.
3. Suche in `app.js`: kein `fetch('config/…')`, kein direkter JSON.parse-Fetchpfad und keine direkte Card-URL an CSVParser/JSONParser.
4. Prüfe mit einem kleinen Node-/Browser-geeigneten Test oder statischem Nachweis: `buildAppContext()` sowie verschachtelte Arrays/Objekte seines Ergebnisses sind eingefroren.
5. Führe aus:
   - `C:\Tools\ghost-local\runtime\node22\node.exe tests/json-parser.test.mjs`
   - CSV-Regression über temporär gemapptes Laufwerk: `cmd /d /c "pushd \\NAS-DATENGRAB\Albert\Documents\Nextcloud\Finanzwesir 2.0 && C:\Tools\ghost-local\runtime\node22\node.exe tests\csv-validator.test.mjs"`
   - `python tools/check-test-pages.py`
6. `git diff --check` für den erlaubten Scope ist fehlerfrei.
7. Scope-QA: nur die fünf erlaubten Ziele verändert; die Umbenennung erscheint als Rename, nicht als doppelte Datei.

## Stop-Regeln

- Wenn der lokale Fetch-Stub nicht ohne Änderung außerhalb des Scope testbar ist: stoppen und den konkreten Bedarf melden.
- Wenn der JSON-Inhalt zur Umbenennung geändert werden müsste: stoppen.
- Wenn ein bestehender Test ohne produktive `app-data`-Datei nicht ehrlich nachstellbar ist: als operative Restbedingung melden, nicht durch eine neue Produktionsdatei umgehen.

## Erwartete Abschlussmeldung

- Status: bestanden / gestoppt.
- Geänderte Dateien und Rename-Nachweis.
- Testnachweise, einschließlich echter vs. nur dokumentierter Browserprüfung.
- Expliziter Rest: Albert validiert und überträgt `stations-de.json` vor dem Ghost-Produktivtest in den app-data-Auslieferungsweg.
- Kein Commit, kein Deploy und keine Ergebnisdatei außerhalb des Write-Scopes.
