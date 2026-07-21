---
chronik_id: CHRONIK-2026-07-21-ghost-feed-resolver-vertrag
datum: 2026-07-21
projekt: finanzwesir-2-0
thema: ghost-feed-resolver-vertrag
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [sackgasse, tooling-problem, annahme-verworfen, richtungswechsel]
---

# Chronik: Formalisierung, Korrektur und Umsetzung des Ghost-Feed-Dateinamenvertrags

**Hauptgegenstand:** Ein Faden aus fünf aufeinanderfolgenden, von Albert vorformulierten Handover-Aufträgen, die gemeinsam einen zuvor entschiedenen Architekturwechsel für `fw-app`-Ghost-Cards (`data-fw-data`/`data-fw-config` als reine Dateinamen statt URLs, zentraler Resolver, statischer Theme-Bootstrapper) formal verankerten, in Code umsetzten und die zugehörige Testinfrastruktur nachzogen.

## Ausgangslage

Der Faden begann mit `/start` in WARM-START-Modus (bereits laufende Session vom selben Tag). Fokus laut Hook-Meta: Ghost-Prototyp, App-Duell 19 Apps, CSV-App-Daten-Pipeline und ein bereits am selben Tag umgesetzter SEO/GEO-Feldvertrag (GHOST-02–04). Für den vorliegenden Faden begann die eigentliche Arbeit mit dem ersten Handover-Dokument, das Albert per UNC-Pfad (`\\NAS-DATENGRAB\...`) bereitstellte. Alle fünf Aufträge in diesem Faden folgten demselben Muster: Albert übergab ein vollständig vorformuliertes `HANDOVER_*.md` mit Risikoklasse, Pflichtquellen, engem Write-Scope, Stop-Regeln und Nachbedingungen; Claude las es vollständig, führte ein knappes Full-Gate durch und setzte es exakt um.

## Chronologischer Verlauf

### Phase 1 — Formalisierung zweier Architekturentscheidungen (`HANDOVER_FORMALISIERUNG_GHOST_APP_MIGRATION_ENTSCHEIDUNGEN_V1.md`)
Auftrag: zwei bereits von Albert getroffene, aber nur mündlich/im Peer-Review dokumentierte Entscheidungen — (1) `data-fw-data`/`data-fw-config` sind reine, geprüfte Dateinamen statt URLs, aufgelöst über einen zentralen Resolver zu `/content/files/app-data/<dateiname>`; (2) ein statischer Theme-Bootstrapper mit fester Registry/Slug-Whitelist statt Code-Injection — in sieben bindende Dokumente einzutragen. Write-Scope: `01_DECISION_LOG.md`, `SECURITY-BASELINE.md`, `APP-INTERFACE.md`, `APP_FACTORY_IMPLEMENTATION_RFC.md`, `Apps/prokrastinations-preis/APP_SPEC.md`, `STATIONS_CONFIG_CONTRACT.md`, `PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`. Claude bestätigte den Gate-Ablauf sichtbar (9 Full-Gate-Fragen), trug den neuen Eintrag SEC-04 im Decision Log ein, stellte Domain-Lock-Formulierungen in Security-Baseline und APP-INTERFACE um, aktualisierte RFC und beide App-Dokumente und änderte den Peer-Review-Status von NO-GO auf „GO für die nachfolgenden Migrations-APs" mit einem neuen datierten Nachtrag. Ergebnis dokumentiert in einem eigenen Abschlussmeldungstext.

Direkt danach bat Albert, diese Abschlussmeldung als Datei unter `docs/steering/patches/` abzulegen. Claude ermittelte per `ls`/Glob (nach einem ersten Ripgrep-Timeout auf dem Netzlaufwerk) die aktuelle Namenskonvention aus dem Bestand (`GHOST-0x_THEMA_TYP.md`) und legte `GHOST-APP-MIGRATION_ENTSCHEIDUNGEN-FORMALISIERUNG_ERGEBNIS.md` an, da für diesen Auftrag keine AP-ID vergeben war.

### Phase 2 — Korrektur eines Suffix-Widerspruchs (`HANDOVER_KORREKTUR_DATEINAMENRESOLVER_GHOST_APP_MIGRATION_V1.md`)
Albert übergab einen zweiten, engeren Auftrag: Die in Phase 1 formulierten Resolver-Beschreibungen sagten an mehreren Stellen zugleich „der Card-Wert ist bereits ein vollständiger Dateiname einschließlich Suffix" UND „der Resolver bildet `/content/files/app-data/<dateiname>.csv`" — was bei einem bereits vollständigen Namen zu `abc.csv.csv` geführt hätte. Claude verifizierte das reale Verhalten in `ChartEngine.js` (`'/content/files/app-data/' + appFile`, keine Suffix-Anhängung) und korrigierte die Formulierung in `APP-INTERFACE.md`, `APP_FACTORY_IMPLEMENTATION_RFC.md` und `APP_SPEC.md` auf reine Präfixbildung. Zusätzlich wurden vier von Claude selbst in Phase 1 eingeführte nachgestellte Leerzeichen in der RFC entfernt (`git diff --check`-Anforderung). Ein neuer Nachtrag im Peer-Review-Dokument hielt die Korrektur fest, ohne den GO-Status zurückzunehmen.

### Phase 3 — Shared-Datenlayer: Resolver, JSONParser, Vault (`HANDOVER_SHARED_DATEN_JSONPARSER_VAULT_RESOLVER_V1.md`)
Auftrag: `AppDataResolver.js` (zwei Funktionen, reine Präfixbildung, harte Regex-Grammatik), `JSONParser.js` als strukturelle Geschwesterdatei von `CSVParser.js`, `FinanzwesirJsonData.js` als rekursiv einfrierender JSON-Vault sowie `tests/json-parser.test.mjs`. `CSVParser.js`/`FinanzwesirData.js` blieben unangetastet (nur Referenzlektüre). Beim ersten Testlauf schlug ein selbst geschriebener Testfall fehl: `resolveJsonAppDataFile('stations.de.json')` wurde vom Resolver abgelehnt, weil der reale, seit Juni bestehende Produktivname `stations.de.json` einen internen Punkt enthält, den die vorgeschriebene Grammatik `^[a-z0-9_-]+\.json$` nicht zulässt. Der Fund wurde nicht stillschweigend über einen anderen Beispieldateinamen im Test verdeckt, sondern als eigener, ausdrücklich dokumentierter Testfall (§1b) sowie als offener Punkt in der Abschlussmeldung festgehalten — eine Entscheidung über Umbenennung oder Grammatikänderung war laut Handover nicht Teil dieses Auftrags. Beide geforderten Node-Tests liefen grün (32 Prüfungen JSONParser/Resolver, bestehende CSV-Regression unverändert grün).

### Phase 4 — App-Migration `prokrastinations-preis` (`HANDOVER_PROKRASTINATIONS_DATENMIGRATION_V1.md`)
Auftrag: `app.js` auf den neuen Resolver/JSONParser umstellen, `config/stations.de.json` in `config/stations-de.json` umbenennen (Inhalt bytegleich), `app.test.html` entsprechend anpassen, `APP_SPEC.md`/`STATIONS_CONFIG_CONTRACT.md` synchronisieren. Claude änderte `loadData()`/`loadStations()` so, dass rohe Card-Werte zuerst durch die Resolver-Funktionen laufen (keine `.trim()`-Kanonisierung), ersetzte den direkten `fetch('config/stations.de.json')` durch `JSONParser.parse(url, { validator: validateStationsJson })`, und fügte eine lokale `deepFreezeContext()`-Hilfe hinzu, die den Rückgabewert von `buildAppContext()` rekursiv einfriert. In `app.test.html` wurden alle Erfolgsfälle auf reine Dateinamen umgestellt, ein testseitig lokaler Fetch-Stub vor dem Modulimport ergänzt (mappt feste Resolverpfade auf reale lokale Fixtures bzw. liefert synthetische Fehlerantworten für Error-(d)-Fälle), der bisherige Fremd-Domain-Testfall (H) durch einen Test auf einen die Resolver-Grammatik verletzenden Dateinamen ersetzt, vier neue Error-(d)-Szenarien und ein als Anleitung (nicht als ausgeführter Browsertest) gekennzeichnetes Reduced-Motion-Szenario ergänzt. Der geforderte Node-Test lief lokal grün; der CSV-Regressionstest über das Netzlaufwerk scheiterte zunächst zweimal mit „Das System kann den angegebenen Pfad nicht finden" — Ursache war fehlende Anführungszeichen um den leerzeichenhaltigen UNC-Pfad in der `cmd`-Aufrufkette; nach Korrektur lief er grün. Der Deep-Freeze-Nachweis für `buildAppContext()` wurde nicht als neue Testdatei, sondern als einmaliger `node -e`-Aufruf mit demselben Algorithmus gegen ein realistisch geformtes Kontextobjekt erbracht (14 Prüfungen grün) — ein erster Durchlauf ohne `'use strict'` hatte fälschlich „Mutation wirft nicht" gemeldet, weil `node -e`-Skripte standardmäßig im Sloppy Mode laufen; mit `'use strict'` bestätigte sich das erwartete Wurfverhalten. Der abschließende Strukturchecker-Lauf (`tools/check-test-pages.py`) meldete 59 Strukturfehler: 57 durch die Umstellung auf reine Dateinamen verursachte Fehlalarme (der Checker prüfte `data-fw-data`/`data-fw-config` noch als lokale Pfade) sowie zwei unabhängige, vor diesem Auftrag bereits bestehende Befunde (ein Manifest-Utility-Überschuss, ein strukturell ungültiger Engine-Test). Alle drei wurden gemeldet, keiner im Rahmen dieses Auftrags behoben (außerhalb des Write-Scope).

### Phase 5 — Nachputz des Testseiten-Checkers (`HANDOVER_NACHPUTZ_TESTSEITEN_RESOLVER_VERTRAG_V1.md`)
Auftrag: die in Phase 4 gemeldeten 59 Befunde auflösen. Claude änderte `tools/check-test-pages.py` so, dass nur noch `data-csv` als lokale Fixture-Referenz geprüft wird (`LOCAL_DATA_ATTRS` von drei auf ein Attribut reduziert, `check_data_ref` in `check_data_csv_ref` umbenannt, keine neue Regex-/Grammatikprüfung für `data-fw-data`/`data-fw-config` ergänzt), synchronisierte `docs/testing/TEST_PAGE_STANDARD.md` (§7, §10, §10.1-Beispiel, §14) entsprechend, entfernte die dadurch überflüssigen `data-fw-test-allow-missing-ref`-Marker in `app.test.html`, bereinigte das Play-CDN-Manifest um 21 nicht deklarierte Utility-Tokens und strukturierte `tests/engine/app-file.test.html` in drei echte Testfallgruppen (Positivfälle, Exklusivität, ungültige Werte) um, ohne Container- oder Attributwerte zu ändern. Der Checker meldete danach `TESTSEITEN-STRUKTUR: GRUEN, Strukturfehler: 0`. Drei zusätzliche deterministische Nachweise (fehlendes `data-csv` weiterhin beanstandet, keine Existenzmeldung mehr für `data-fw-data`/`data-fw-config`, Manifest exakt) wurden über direkte Python-Importe der Checker-Funktionen erbracht, nachdem ein erster Versuch an einem relativen statt absoluten Pfad scheiterte.

Ein Löschversuch des durch die Testläufe entstandenen `tools/__pycache__/`-Verzeichnisses wurde von der Berechtigungsprüfung abgelehnt und blieb als harmloser, nicht behobener Nebeneffekt bestehen.

Mitten in dieser Phase sendete Albert eine isolierte Nachricht „nius.de" und stellte kurz darauf klar: „mach weiter, vertippt, alles bleibt bheim prompt" — Claude bestätigte kurz und setzte die laufende Arbeit unverändert fort.

## Wendepunkte

- Phase 2 entstand, weil die in Phase 1 formulierte Resolver-Beschreibung sich selbst widersprach (vollständiger Dateiname UND zusätzliches Suffix) — ausgelöst durch Alberts Vergleich mit dem realen `ChartEngine.js`-Code.
- Phase 3 verschob den Fokus von Dokumentation auf Code: erstmals in diesem Faden wurden neue Produktionsdateien angelegt statt bestehende Dokumente geändert.
- Der in Phase 3 entdeckte Widerspruch zwischen der realen Datei `stations.de.json` und der neu formalisierten Grammatik veränderte den weiteren Verlauf unmittelbar: Phase 4 musste die Umbenennung nach `stations-de.json` als expliziten Auftragsbestandteil enthalten.
- Der in Phase 4 sichtbar gewordene Bruch zwischen dem neuen Architekturmodell und dem bestehenden Strukturchecker führte zu Phase 5 als eigenem, vollständig auf den Checker begrenzten Auftrag.

## Entscheidungen und Festlegungen

- **Reine Präfixbildung des Resolvers** (`/content/files/app-data/<dateiname>`, kein Suffix anhängen) · festgelegt in Phase 2, anhand von `ChartEngine.js` verifiziert · Status am Ende: gültig, in Phase 3 als `AppDataResolver.js` implementiert.
- **`JSONParser`/`FinanzwesirJsonData` als strukturelle Geschwister von `CSVParser`/`FinanzwesirData`**, `options.validator` Pflicht · Phase 3 · Status: gültig, in Phase 4 an `validateStationsJson()` angebunden.
- **Umbenennung `stations.de.json` → `stations-de.json`**, Inhalt bytegleich · Phase 4, ausgelöst durch den in Phase 3 gefundenen Grammatikwiderspruch · Status: umgesetzt; reale Übertragung in den `app-data`-Auslieferungsweg bleibt Albert vorbehalten.
- **`buildAppContext()` wird rekursiv eingefroren** über eine lokale `deepFreezeContext()`-Hilfe, kein neues globales Utility · Phase 4 · Status: umgesetzt, empirisch nachgewiesen.
- **Nur `data-csv` ist eine lokale Testseiten-Fixture-Referenz**, `data-fw-data`/`data-fw-config` werden vom Strukturchecker nicht mehr lokal aufgelöst · Phase 5 · Status: umgesetzt, Checker grün.

## Irrwege, Schleifen und verworfene Ansätze

- In Phase 4 wurde zunächst erwogen, den bereits vorhandenen `data-fw-test-allow-missing-ref`-Mechanismus für die neuen Ghost-Feed-Bare-Dateinamen zu nutzen; eine nähere Prüfung des Mechanismus (ein Wert pro Testfall, keine Mehrfachzuordnung) zeigte, dass er für Karten mit gleichzeitig zwei kanonischen Namen (CSV und JSON) strukturell nicht passt. Der Ansatz wurde verworfen zugunsten einer transparenten Meldung der 57 Fehlalarme als bekannte Restbedingung statt einer Umgehung — dies bereitete unmittelbar den Auftrag für Phase 5 vor.
- Der erste Versuch, den CSV-Regressionstest über den vorgegebenen UNC-Pfad auszuführen, scheiterte zweimal wortgleich mit „Das System kann den angegebenen Pfad nicht finden"; die Ursache (fehlende Anführungszeichen um einen leerzeichenhaltigen Pfad in einer verschachtelten `cmd`-Aufrufkette über Git Bash) wurde erst nach einem Diagnoseschritt (`net use`, `whoami`, isolierter `dir`-Befehl) gefunden.
- Der erste Deep-Freeze-Nachweis in Phase 4 meldete fälschlich fehlgeschlagene Mutationsprüfungen, weil das Test-Snippet ohne `'use strict'` im Sloppy Mode lief; nach Ergänzung von `'use strict'` bestätigten sich die erwarteten Wurf-Ergebnisse.
- Der erste Versuch, die drei Beweispunkte in Phase 5 per direktem Python-Import der Checker-Funktionen zu erbringen, scheiterte an einem relativen statt absoluten `base_dir`-Pfad (fälschliche Meldung „verlässt das Repository"); nach Umstellung auf absolute Pfade lieferten die Aufrufe die erwarteten Ergebnisse.

## Erzeugte Artefakte

- `Theme/assets/js/fw-chart-engine/data/AppDataResolver.js` — Resolver, final.
- `Theme/assets/js/fw-chart-engine/data/JSONParser.js` — JSON-Parser, final.
- `Theme/assets/js/fw-chart-engine/data/FinanzwesirJsonData.js` — JSON-Vault, final.
- `tests/json-parser.test.mjs` — Node-Testsuite, final, grün.
- `docs/steering/patches/GHOST-APP-MIGRATION_ENTSCHEIDUNGEN-FORMALISIERUNG_ERGEBNIS.md` — Abschlussmeldung als Datei, final.
- `Apps/prokrastinations-preis/config/stations-de.json` — umbenannte Produktivdatei (vormals `stations.de.json`), final; Übertragung in den Ghost-Auslieferungsweg offen.
- Geänderte Bestandsdateien (final, jeweils mehrfach über die Phasen aktualisiert): `docs/App-Fabrik/01_DECISION_LOG.md`, `docs/steering/audits/SECURITY-BASELINE.md`, `docs/spec/APP-INTERFACE.md`, `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md`, `Apps/prokrastinations-preis/APP_SPEC.md`, `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md`, `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`, `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.test.html`, `tools/check-test-pages.py`, `docs/testing/TEST_PAGE_STANDARD.md`, `tests/engine/app-file.test.html`.

## Sachliche Erkenntnisse

- **Gesicherter Stand:** `ChartEngine.js` bildet den `data-app-file`-Pfad durch reine String-Konkatenation ohne Suffix-Anhängung (`'/content/files/app-data/' + appFile`).
- **Gesicherter Stand:** Der reale Produktivdateiname `stations.de.json` erfüllt die Grammatik `^[a-z0-9_-]+\.json$` nicht (interner Punkt).
- **Gesicherter Stand:** `tools/check-test-pages.py` prüfte vor Phase 5 `data-fw-data`, `data-fw-config` und `data-csv` einheitlich als lokale Dateipfade.
- **Arbeitsannahme (unverändert seit Phase 4):** Der Live-Server/Ghost-lokal-Server bedient absolute, root-relative Pfade wie `/content/files/app-data/...` gegen den realen Ordner `content/files/app-data/` im Repository-Wurzelverzeichnis.
- **Spätere Korrektur:** Die in Phase 1 formulierte Resolver-Beschreibung („vollständiger Dateiname" plus „bildet .../<name>.csv") wurde in Phase 2 als in sich widersprüchlich erkannt und korrigiert.

## Offene Punkte am Ende

- Albert muss `stations-de.json` validieren und vor einem Ghost-Produktivtest tatsächlich nach `content/files/app-data/` übertragen.
- Der in Phase 3 gefundene Widerspruch zwischen realen JSON-Dateinamen mit internem Punkt (z. B. künftige Locale-Suffixe) und der Resolver-Grammatik ist nicht aufgelöst; eine Entscheidung (Umbenennungskonvention oder Grammatikerweiterung) steht aus.
- Die App selbst (`Apps/prokrastinations-preis/app.js`) ist auf den Resolver/JSONParser umgestellt, aber `AppContext`-Tiefenfreeze, Error-(d)-UI und Reduced-Motion sind laut Phase-4-Handover ausdrücklich als „bekannte, noch offene nächste Arbeit" benannt, soweit sie über den reinen Datenpfad hinausgehen (insbesondere Screen 4 prüft `prefers-reduced-motion` nicht).
- Kein Rename per `git mv`, keine Staging-Aktion durch Claude in diesem Faden — die Umbenennung von `stations.de.json` erscheint erst nach Alberts eigenem `git add` als Git-Rename.
- `tools/__pycache__/` (Nebenprodukt der Checker-Läufe) besteht weiterhin; Löschversuch wurde abgelehnt.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: In allen fünf Phasen dieses Fadens lieferte Albert vollständig vorformulierte Handover-Dokumente mit Risikoklasse, Pflichtquellenliste, engem Write-Scope, Stop-Regeln und explizitem Nachbedingungs-/Beweisplan; Claude wich in keinem Fall vom vorgegebenen Scope ab und meldete gefundene Randprobleme (Grammatikwiderspruch bei `stations.de.json`, Checker-Inkompatibilität, pycache-Artefakt) statt sie eigenmächtig innerhalb oder außerhalb des Scopes zu beheben.

## Bewusst ausgelassen

Vollständige Diff-Inhalte der einzelnen Textänderungen (Wortlaut einzelner Satzumformulierungen in Sicherheits-/Spezifikationsdokumenten); der vollständige Inhalt aller ausgegebenen Testkonsolenprotokolle (nur Ergebnis und Anzahl der Prüfungen wurden übernommen); wiederholte, inhaltsgleiche Bestätigungen einzelner Zwischenschritte (z. B. mehrfaches erneutes Lesen derselben Datei nach kleinen Änderungen); reine Werkzeugbedienhinweise ohne Bedeutungsänderung.
