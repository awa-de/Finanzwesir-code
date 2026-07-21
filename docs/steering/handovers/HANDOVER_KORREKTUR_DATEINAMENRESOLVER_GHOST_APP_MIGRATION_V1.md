# Claude-Auftrag — P1-Korrektur: vollständiger Dateiname wird genau einmal aufgelöst

**Risikoklasse:** B — begrenzter Vertragskorrektur-AP nach realem Codeabgleich.

## Befund und verbindliche Invariante

Die Ghost-Card enthält den **vollständigen** kanonischen Dateinamen einschließlich Suffix, beispielsweise `msci-world.csv` oder `stations.de.json`.

Der zentrale Resolver führt ausschließlich eine Präfixbildung aus:

```text
url = '/content/files/app-data/' + filename
```

Er hängt **kein** `.csv` und **kein** `.json` an. Der reale Chart-Engine-Referenzpfad belegt das: `ChartEngine.js` liest `data-app-file`, validiert `^[a-z0-9_-]+\.csv$` und bildet `'/content/files/app-data/' + appFile`.

Die bisherige Formalisierung mischt „vollständiger Dateiname einschließlich Suffix" mit Formulierungen wie `/content/files/app-data/<dateiname>.csv`. Das würde zu `abc.csv.csv` beziehungsweise `stations.de.json.json` führen.

## Ziel

Die aktive Dokumentation ist nach dem AP eindeutig: vollständiger Dateiname in der Card, einmalige Präfixbildung im Resolver. Anschließend ist der formale Nachzug wieder GO für die technischen Migrations-APs.

## Pflicht lesen

1. `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, besonders der `data-app-file`-Resolver.
2. `docs/spec/APP-INTERFACE.md` vollständig.
3. `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md` vollständig.
4. `Apps/prokrastinations-preis/APP_SPEC.md` vollständig.
5. `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md` vollständig.

## Erlaubter Write-Scope

Nur diese vier Markdown-Dateien:

1. `docs/spec/APP-INTERFACE.md`
2. `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md`
3. `Apps/prokrastinations-preis/APP_SPEC.md`
4. `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`

Keine neue Datei anlegen. Kein Code, keine Tests, keine Daten, keine Security Baseline und keinen Decision Log ändern.

## Konkrete Korrekturen

1. **`APP-INTERFACE.md`**
   - In der `fw-app`-Attributtabelle und allen aktiven Erläuterungen den Platzhalter so formulieren, dass der Wert ein vollständiger Dateiname ist, z. B. `data-fw-data="datei.csv"` und `data-fw-config="datei.json"`.
   - Resolver-Ziel immer als `/content/files/app-data/<dateiname>` beschreiben, wobei `<dateiname>` den vollständigen Wert einschließlich `.csv` bzw. `.json` bedeutet.
   - Auch den bestehenden Chart-Card-Vertrag `data-app-file` (§3.2) auf diese eindeutige Semantik korrigieren: die Engine präfigiert den bereits vollständigen Dateinamen; keine `.csv`-Doppelung. Das ist keine Namespace- oder Architekturänderung.

2. **`APP_FACTORY_IMPLEMENTATION_RFC.md`**
   - Die aktive `data-fw-config`-Resolverbeschreibung auf einmalige Präfixbildung korrigieren.
   - Die vier neu eingeführten nachgestellten Leerzeichen entfernen, damit `git diff --check` sauber endet.

3. **`APP_SPEC.md`**
   - Jede aktive Pfadbeschreibung, die bei einem schon vollständigen `data-fw-data`- oder `data-fw-config`-Wert noch `.csv` bzw. `.json` anhängt, auf `/content/files/app-data/<dateiname>` korrigieren.
   - Card-Beispiele mit konkreten vollständigen Namen (`msci-world-net-return-eur-monthly.csv`, `stations.de.json`) unverändert als Referenz beibehalten.

4. **`PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`**
   - Einen kurzen datierten Nachtrag ergänzen: Der nach der Formalisierung gefundene Resolver-Suffixwiderspruch wurde gegen den realen ChartEngine-Pfad korrigiert; der Resolver präfigiert nur. Der Status **GO für die nachfolgenden Migrations-APs** bleibt danach bestehen.

## Nicht-Ziele

- Keine Änderung an `ChartEngine.js`, `CSVParser.js`, künftigem `JSONParser`, Resolver-Code, Bootstrapper-Code oder Tests.
- Keine Änderung der Dateinamen-Grammatiken, der Albert-Entscheidungen oder der Bootstrapper-Entscheidung.
- Keine neue Review-Schleife und keine technische Migrationsarbeit.

## Stop-Regeln

- Wenn ein weiterer aktiver Vertragsort mit Suffix-Doppelung außerhalb des erlaubten Write-Scopes gefunden wird: stoppen, Pfad und Zeile melden.
- Wenn die reale ChartEngine nicht die beschriebene reine Präfixbildung zeigt: stoppen und den Codebefund melden.

## Nachbedingungen

1. Die vier geänderten Dateien vollständig mit UTF-8 erneut lesen.
2. Deterministisch prüfen: In den vier Dateien gibt es keine aktive Resolverformulierung `/content/files/app-data/<dateiname>.csv` oder `/content/files/app-data/<dateiname>.json` mehr.
3. Deterministisch prüfen: Alle Card-Beispiele enthalten weiterhin vollständige Dateinamen mit genau einem Suffix.
4. `git diff --check` für die drei versionierten Dateien endet fehlerfrei.
5. Scope-QA: Nur die vier erlaubten Dateien wurden verändert.
6. Kein Commit, kein Deploy, keine weitere Arbeit.

## Erwartete Abschlussmeldung

- Status: bestanden / gestoppt.
- Geänderte Dateien und konkrete korrigierte Fundstellen.
- Ergebnis der fünf Nachbedingungen.
- Nächster Schritt: Shared-Daten-AP (zentraler Resolver, JSONParser/Vault), nicht Teil dieses Auftrags.
