# Claude-Auftrag — Shared-Daten-AP: Dateinamenresolver, JSONParser und JSON-Vault

**Risikoklasse:** B — shared Infrastruktur mit Sicherheits- und Vertragswirkung.

## Ziel

Baue ausschließlich die gemeinsame Datenbasis für künftige `fw-app`-Feeds:

```text
vollständiger Dateiname aus der Card
  -> zentraler, typisierter Resolver
  -> bestehender CSVParser oder neuer JSONParser
  -> versiegelter CSV- oder JSON-Vault
```

Der JSON-Pfad ist ein struktureller Klon des vorhandenen CSV-Pfads, kein Universalparser. Die Prokrastinations-App, ihr Bootstrapper, ihre Testseite und ihre UI bleiben in diesem AP unverändert.

## Architektur und verbindliche Invarianten

- `data-fw-data` enthält den vollständigen CSV-Dateinamen; `data-fw-config` den vollständigen JSON-Dateinamen. Der Resolver präfigiert nur: `/content/files/app-data/` + Dateiname. Er hängt kein Suffix an.
- `CSVParser.js` und `FinanzwesirData.js` sind TABU. CSV bleibt funktionsgleich.
- `JSONParser.js` ist Schwesterdatei von `CSVParser.js`: gleicher öffentlicher Zuschnitt (`async parse(url, options)`, fetch-freier Export `parseJsonText(text, config)`), gleicher URL-Gate, `fetch(..., { priority: 'high' })`, HTTP- und Fehlerrahmen.
- JSON unterscheidet sich nur dort, wo das Format es verlangt: `JSON.parse`, verpflichtender app-spezifischer Validator und rekursives Einfrieren.
- Der JSONParser kennt keine Stationssemantik. `options.validator` ist Pflicht, eine Funktion und liefert wie das vorhandene `validateStationsJson()` ein Objekt `{ ok: true }` oder `{ ok: false, code?, detail? }`. Bei `ok !== true` wirft der Parser einen verständlichen Fehler. Der Parser transformiert keine Nutzdaten.
- `FinanzwesirJsonData` ist der JSON-Vault: Nutzdaten, Arrays, verschachtelte Objekte und Metadaten sind nach erfolgreichem Parsing rekursiv eingefroren. Öffentliche Getter: `data` und `metadata`; Metadaten enthalten mindestens `source: 'JSON'` und `parsedAt`.
- Der Resolver akzeptiert Rohwerte ohne vorheriges Trimmen oder Normalisieren. Leerzeichen, URL, Query, Fragment, Slash, Traversal und falsches Suffix werden verworfen. Es gibt genau zwei öffentliche Funktionen: `resolveCsvAppDataFile(filename)` und `resolveJsonAppDataFile(filename)`.
- Keine Datei aus einer Card beeinflusst Import-Pfade oder Script-URLs.

## Pflicht lesen

1. `Theme/assets/js/fw-chart-engine/data/CSVParser.js` vollständig — das ist der Quelltext, der strukturell kopiert wird.
2. `Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js` vollständig — Vault-Referenz.
3. `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `data-app-file`-Resolver.
4. `tests/csv-validator.test.mjs` vollständig — vorhandenes Node-Testmuster.
5. `docs/spec/APP-INTERFACE.md` vollständig.
6. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`, Layer 1 und Deep-Freeze-Invariante.
7. `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md` vollständig.

## Erlaubter Write-Scope

1. **Neu:** `Theme/assets/js/fw-chart-engine/data/AppDataResolver.js`
2. **Neu:** `Theme/assets/js/fw-chart-engine/data/JSONParser.js`
3. **Neu:** `Theme/assets/js/fw-chart-engine/data/FinanzwesirJsonData.js`
4. **Neu:** `tests/json-parser.test.mjs`
5. `docs/spec/APP-INTERFACE.md`

Keine weiteren Dateien anlegen oder ändern. Insbesondere tabu: `CSVParser.js`, `FinanzwesirData.js`, `ChartEngine.js`, alle App-Dateien, Theme-Templates, Bootstrapper, JSON-Inhalte, Offline-Prüfer und Decision Log.

## Umsetzung

### 1. Zentraler Resolver

Lege `AppDataResolver.js` im bestehenden Datenlayer an.

- `resolveCsvAppDataFile(filename)` prüft exakt `^[a-z0-9_-]+\.csv$`.
- `resolveJsonAppDataFile(filename)` prüft exakt `^[a-z0-9_-]+\.json$`.
- Beide geben bei Erfolg ausschließlich `'/content/files/app-data/' + filename` zurück.
- Beide werfen bei ungültigem Eingabewert vor jeder Netzwerkanfrage einen deutschen, typbezogenen Fehler.
- Keine Konfiguration, keine Domain-URL, kein optionales Suffix und keine Erweiterung auf beliebige Dateitypen.

### 2. JSON-Vault und JSONParser

Lege `FinanzwesirJsonData.js` und `JSONParser.js` als engste sinnvolle Strukturkopie der beiden CSV-Dateien an.

- `parseJsonText(text, config)` ist der fetch-freie Kern für spätere Offline-Prüfung und Browserpfad.
- Leerer Text, ungültiges JSON, fehlender/nicht-funktionaler Validator und Validator-Ergebnis ohne `ok: true` schlagen fehl.
- `JSONParser.parse(url, options)` verwendet den gleichen URL-Gate und Fetch-/HTTP-/Catch-Ablauf wie `CSVParser.parse()`; es ruft intern `parseJsonText()` auf.
- Der Vault friert rekursiv ein; keine Mutation, keine Normalisierung und kein Clonen nach dem Validator.

### 3. Vertragssynchronisierung

Aktualisiere in `docs/spec/APP-INTERFACE.md` ausschließlich:

- den JSON-Lademechanismus: `JSONParser.js` und `FinanzwesirJsonData.js` sind shared Infrastruktur; App-Code liefert den app-spezifischen `validator`;
- §9 Cache-Busting: Für produktive `data-fw-data`/`data-fw-config` und `data-app-file` ausschließlich versionierter Dateiname. Kein Query-Parameter und kein `Date.now()` in Card-Attributen. Der bestehende `data-csv`-Testpfad bleibt davon unberührt.

## Testnachweis

Lege `tests/json-parser.test.mjs` nach dem vorhandenen Node-Muster an. Es darf ausschließlich temporäre Daten und gemocktes `fetch` verwenden.

Mindestens nachweisen:

1. CSV- und JSON-Resolver akzeptieren jeweils einen gültigen vollständigen Dateinamen und bilden exakt den Präfixpfad.
2. Beide Resolver lehnen URL, Slash/Traversal, Query, Fragment, Leerzeichen, Großbuchstaben und falsches Suffix ab — ohne `fetch`.
3. `parseJsonText()` akzeptiert gültiges JSON bei `{ ok: true }`, ruft den Validator auf und liefert einen vollständig eingefrorenen Vault (Wurzel, verschachteltes Objekt, Array, Metadaten).
4. Ungültiges JSON, fehlender Validator und `{ ok: false }` schlagen fehl.
5. `JSONParser.parse()` nutzt den relativen Resolverpfad, `{ priority: 'high' }`, behandelt HTTP-Fehler und bewahrt den Fehlerrahmen.
6. Der bestehende CSV-Regressionstest `tests/csv-validator.test.mjs` bleibt grün.

Nutze für beide Node-Tests den vorhandenen Node-22-Pfad aus dem CSV-Test. Kein neues Testframework, kein Browser- und kein Ghost-Test in diesem AP.

## Nicht-Ziele

- Keine Umstellung von `app.js` auf den Resolver oder JSONParser.
- Kein `loadStations()`-Umbau, kein `buildAppContext()`-Freeze, kein Error-(d)-UI-Test und kein Reduced-Motion-Test.
- Kein App-Bootstrapper, keine Registry, kein Theme-Bundle und kein Tailwind-Build.
- Kein JSON-Offline-Prüfer und kein Upload/FTP-Schritt.

## Fehler-Todeszonen

- Vollständigen Dateinamen versehentlich um ein zweites Suffix erweitern.
- Card-Rohwert direkt an `fetch` geben oder durch `trim()` kanonisieren.
- JSON ohne app-spezifischen Validator in den Vault lassen.
- Nur die Vault-Wurzel einfrieren, verschachtelte JSON-Daten aber mutierbar lassen.
- Den bestehenden CSVParser im Zuge des Klons verändern.

## Stop-Regeln

- Wenn die benannten CSV-Referenzdateien nicht den beschriebenen Ablauf zeigen: stoppen und den Befund melden.
- Wenn der JSON-Validatorvertrag mit `validateStationsJson()` nicht kompatibel ist: stoppen; keine neue Validator-Sprache erfinden.
- Wenn für den Testnachweis eine Datei außerhalb des Write-Scopes nötig wäre: stoppen und begründen.

## Nachbedingungen

1. Alle fünf geänderten/neu angelegten Dateien vollständig mit UTF-8 erneut lesen.
2. Beide Node-Tests laufen grün:
   - `C:\Tools\ghost-local\runtime\node22\node.exe tests/json-parser.test.mjs`
   - `C:\Tools\ghost-local\runtime\node22\node.exe tests/csv-validator.test.mjs`
3. `git diff --check` für den erlaubten Scope ist fehlerfrei.
4. Deterministische Suche bestätigt: keine URL aus `data-fw-data`/`data-fw-config` im neuen Datenlayer; kein dynamischer Import; keine Änderung an CSVParser oder FinanzwesirData.
5. Scope-QA: nur die fünf erlaubten Dateien verändert.

## Erwartete Abschlussmeldung

- Status: bestanden / gestoppt.
- Geänderte Dateien mit einem Satz je Datei.
- Testausgaben und Nachbedingungen.
- Bekannte, bewusst offene nächste Arbeit: Prokrastinations-App auf Resolver/JSONParser umstellen, AppContext tief einfrieren und Error (d)/Reduced Motion nachweisen.
- Kein Commit, kein Deploy und keine Ergebnisdatei außerhalb des Write-Scopes.
