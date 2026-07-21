---
name: project-ghost-feed-resolver-vertrag
description: "SEC-04 Ghost-Feed-Dateinamenvertrag: data-fw-data/data-fw-config als reine Dateinamen, zentraler AppDataResolver, JSONParser/FinanzwesirJsonData als neue shared Infrastruktur"
metadata: 
  node_type: memory
  type: project
  originSessionId: 705c561f-ded2-4380-a885-b54057eaa88d
  modified: 2026-07-21T20:53:38.470Z
---

Seit 2026-07-21 (Decision Log SEC-04, `docs/App-Fabrik/01_DECISION_LOG.md`): `data-fw-data` und `data-fw-config` auf `fw-app`-Ghost-Cards sind ausschließlich geprüfte, vollständige Dateinamen (Grammatik `^[a-z0-9_-]+\.csv$` bzw. `\.json$`) — kein URL-Feld, kein Pfad, keine Dev-Ausnahme. Ein zentraler Resolver (`Theme/assets/js/fw-chart-engine/data/AppDataResolver.js`, Funktionen `resolveCsvAppDataFile`/`resolveJsonAppDataFile`) bildet reine Präfixbildung zu `/content/files/app-data/<dateiname>` — kein Suffix wird angehängt (Analogie zum bestehenden `data-app-file`-Resolver in `ChartEngine.js`).

Zweite Entscheidung derselben Formalisierung: statischer Theme-Bootstrapper mit fester Registry/Slug-Whitelist (kein Code Injection, keine dynamischen Imports aus `data-*`-Werten) — bislang nur formal verankert, noch nicht implementiert.

Neue shared Infrastruktur unter `Theme/assets/js/fw-chart-engine/data/`: `JSONParser.js` (strukturelle Geschwisterdatei von `CSVParser.js` — gleicher URL-Gate, gleicher Fetch-/Fehlerrahmen, `parseJsonText(text, config)` mit Pflicht-`config.validator`) und `FinanzwesirJsonData.js` (rekursiv einfrierender JSON-Vault, Getter `data`/`metadata`). `CSVParser.js`/`FinanzwesirData.js` bleiben unverändert TABU — nur Referenzvorlage.

`Apps/prokrastinations-preis` ist auf diesen Vertrag migriert: `app.js` lädt CSV/JSON über Resolver + `CSVParser`/`JSONParser` (mit `validateStationsJson` als App-Validator), `buildAppContext()` wird über eine lokale `deepFreezeContext()`-Hilfe rekursiv eingefroren. Die produktive Stationsdatei wurde von `config/stations.de.json` nach `config/stations-de.json` umbenannt (interner Punkt verletzte die neue Grammatik) — Übertragung nach `content/files/app-data/` steht noch aus (Alberts Aufgabe).

`tools/check-test-pages.py` prüft seit derselben Kette nur noch `data-csv` als lokale Testseiten-Fixture-Referenz; `data-fw-data`/`data-fw-config` werden vom Strukturchecker nicht mehr als lokale Dateien behandelt (Ghost-Feed-Namen sind untrusted Laufzeitwerte, ihr Negativtest-Beweis läuft über den Laufzeit-Resolver, nicht den Checker).

**Offener Punkt:** Ein künftiger realer Dateiname mit internem Punkt (z. B. Locale-Suffix wie `xyz.de.json`) würde erneut gegen die Grammatik verstoßen — weder Umbenennungskonvention noch Grammatikerweiterung ist bisher entschieden.

Faden-Chronik: `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-21-ghost-feed-resolver-vertrag.md`.
