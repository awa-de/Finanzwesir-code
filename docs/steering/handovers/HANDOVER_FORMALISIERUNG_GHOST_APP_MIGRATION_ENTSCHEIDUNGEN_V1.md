# Claude-Auftrag — Formale Verankerung der Ghost-App-Migrationsentscheidungen

**Risikoklasse:** C — verbindlicher Vertrags- und Sicherheitsnachzug mit Wirkung auf die App-Fabrik.

## Auftrag

Übernimm **ausschließlich** die unten freigegebenen Entscheidungen in die bindenden Dokumente. Die Entscheidungen sind nicht mehr zu diskutieren oder abzuwandeln. Es gibt in diesem Auftrag **keine** Code-, Parser-, Test-, Theme- oder Ghost-Deployment-Implementierung.

## Verbindliche Entscheidungen von Albert (2026-07-21)

### 1. Datenvertrag für `fw-app`

`data-fw-data` und `data-fw-config` enthalten ausschließlich geprüfte Dateinamen.

- `data-fw-data`: nur kanonischer CSV-Dateiname, Grammatik `^[a-z0-9_-]+\.csv$`.
- `data-fw-config`: nur kanonischer JSON-Dateiname, Grammatik `^[a-z0-9_-]+\.json$`.
- Kein Protokoll, keine Domain, kein Pfad, kein Slash, kein Query-String, kein Fragment und keine URL als Attributwert.
- Der zentrale Resolver bildet ausschließlich `/content/files/app-data/<dateiname>`.
- Die Daten bleiben zur Laufzeit untrusted input: Dateinamen werden vor der Auflösung geprüft; CSV und JSON werden danach vom jeweiligen spezialisierten Parser erneut validiert und versiegelt.
- Es gibt keinen URL-Kompatibilitätsmodus für `fw-app`-Cards und keine Dev-Ausnahme in diesen beiden Attributen.

### 2. `fw-app`-Theme-Einstieg

Statischer Bootstrapper im Theme-Bundle mit fester Registry/Slug-Whitelist.

- Die Registry ist Code im Theme-Bundle. Jeder Eintrag ordnet einen Literal-Slug einer statisch importierten Init-Funktion zu.
- Kein Wert aus einem `data-*`-Attribut darf — auch nicht teilweise oder nach Validierung — einen Import-Pfad, eine Script-URL oder einen `import()`-Ausdruck beeinflussen.
- Unbekannter Slug führt zum Error-State; es findet kein Nachladen statt.
- Jeder `.fw-app`-Container erhält eine eigene `try/catch`-Error-Boundary. Der bestehende Doppelinitialisierungs-Guard `data-fw-initialized` bleibt Pflicht.
- Genau ein Theme-Einstieg, analog `fw-chart-engine/index.js`: kein Script pro Ghost-Card, keine Code-Injection pro Seite, kein CDN, kein Loader-Framework und keine Manifest-/Registry-Datei außerhalb des Codes.
- Wachstumspfad nur dokumentieren, nicht bauen: Code-Splitting mit ausschließlich literalen Importpfaden erst dann neu bewerten, wenn eine einzelne App etwa die Größe von `chart.umd.min.js` erreicht (ca. zehnmal heutige App-Größe).

## Pflicht lesen

1. `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md` vollständig.
2. `docs/steering/audits/SECURITY-BASELINE.md` vollständig.
3. `docs/spec/APP-INTERFACE.md` vollständig.
4. `docs/App-Fabrik/01_DECISION_LOG.md` vollständig.
5. `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md` vollständig.
6. `Apps/prokrastinations-preis/APP_SPEC.md` vollständig.
7. `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md` vollständig.

## Erlaubter Write-Scope

Nur diese sieben Pflichtquellen. Keine neue Datei anlegen. Keine Code-, Test-, Daten-, Theme- oder Build-Datei ändern.

## Konkrete Deltas

1. **`docs/App-Fabrik/01_DECISION_LOG.md`**
   - Einen neuen entschiedenen Security-Eintrag nach `SEC-03` anlegen.
   - Beide Entscheidungen, Datum, Sicherheitsbegründung, zentralen Resolver, statische Registry, Error-Boundary, Guard, Ausschlüsse und dokumentierten Wachstumspfad nachvollziehbar festhalten.

2. **`docs/steering/audits/SECURITY-BASELINE.md`**
   - §6.5 und §7 vom URL-/Domain-Lock für `data-fw-data` und `data-fw-config` auf den Dateinamen-/Resolver-Vertrag umstellen. Der Domain-Lock bleibt für tatsächlich externe Quellen und den bestehenden Chart-Testpfad gültig.
   - §6.9 von „offen" auf die freigegebene Theme-Bootstrapper-Strategie umstellen und auf den neuen Decision-Log-Eintrag verweisen.
   - Keine neue Sicherheitsregel erfinden; nur die oben freigegebenen Regeln präzise verankern.

3. **`docs/spec/APP-INTERFACE.md`**
   - §3.1, Beispiele, Attributtabelle, §6 und §7 vollständig auf den Dateinamenvertrag umstellen.
   - Dokumentieren, dass beide App-Feeds denselben produktiven `app-data`-Lieferweg nutzen wie `data-app-file`, aber die getrennten Attributnamen und Parser behalten.
   - Alle aktiven URL-, Domain-, Dev-URL- und Query-String-Aussagen für diese beiden `fw-app`-Attribute entfernen oder korrekt eingrenzen.
   - Der bestehende Chart-Card-Vertrag bleibt unverändert; keine Namespace-Migration der Charts vornehmen.

4. **`docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md`**
   - Den nun entschiedenen Theme-Bootstrapper als verbindlichen Factory-Standard nachziehen.
   - Die offene Alternative „Code Injection oder Theme" und die offene Bootstrapper-Frage B3 als erledigt markieren; historische Aussagen dürfen als historisch erhalten bleiben, aber nicht weiter als aktive offene Entscheidung erscheinen.
   - Die spätere externe `data-fw-config`-Beschreibung auf den verbindlichen Dateinamen-/Resolver-Vertrag korrigieren. Keine Parser- oder JSON-Implementierung planen.

5. **`Apps/prokrastinations-preis/APP_SPEC.md`**
   - Alle aktiven URL- und Pfadangaben zu `data-fw-data` auf den Dateinamenvertrag und `/content/files/app-data/` synchronisieren; insbesondere §7.6, §10, Datenfluss, Sicherheitsregeln und Testmatrix.
   - Die Stations-Konfiguration als zweiten Ghost-Card-Feed `data-fw-config="stations.de.json"` dokumentieren. Sie wird nicht mehr seitenrelativ oder intern aus `config/` geladen.
   - Die Ghost-Card-Beispiele müssen CSV- und JSON-Dateiname enthalten.
   - URL-Domaintests durch entsprechende ungültige Dateinamen-/Resolver-Fehlerfälle ersetzen; kein Testcode schreiben.

6. **`Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md`**
   - Produktionsquelle auf den Dateinamen `stations.de.json` im zentral aufgelösten `app-data`-Pfad umstellen.
   - Die Kopie in `Apps/prokrastinations-preis/config/` nur noch als Quell-/Fixture-Datei kennzeichnen, nicht als Ghost-Laufzeitquelle.

7. **`docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`**
   - Einen datierten Nachtrag ergänzen: beide vormals blockierenden Entscheidungen sind am 2026-07-21 freigegeben und durch diesen Nachzug formal verankert.
   - Den Status auf **GO für die nachfolgenden Migrations-APs** ändern, jedoch klarstellen: F2, F4, F5 und P2 bleiben verpflichtende Umsetzungs- und Testarbeit; das ist keine Produktionsfreigabe.

## Nicht-Ziele

- Kein `JSONParser`, kein Resolver, kein Vault, kein Bootstrapper-Code.
- Keine Änderung an `CSVParser.js`, `FinanzwesirData.js`, Chart-Engine, Theme-Templates oder App-JavaScript.
- Keine neue Datenprüfung, kein Datei-Upload, keine Änderung von CSV- oder JSON-Inhalten.
- Keine neue Architekturentscheidung und keine Erweiterung des Scope auf andere Apps.

## Stop-Regeln

- Wenn eine Pflichtquelle einer freigegebenen Entscheidung widerspricht und sich der Widerspruch nicht durch das ausdrücklich vorgegebene Delta auflösen lässt: stoppen, Pfad und Abschnitt melden, nichts still entscheiden.
- Wenn eine Änderung außerhalb des erlaubten Write-Scopes nötig wäre: stoppen und nur begründen.

## Nachbedingungen und Beweis

1. Alle sieben betroffenen Dateien nach dem Schreiben vollständig und mit UTF-8 erneut lesen.
2. Deterministisch prüfen: In den aktiven Vertragsabschnitten bleibt keine Aussage, dass `data-fw-data` oder `data-fw-config` eine URL, Domain-Validierung, `localhost`-Ausnahme oder Query-String akzeptiert.
3. Deterministisch prüfen: Keine aktive Bootstrapper-Aussage lässt Code Injection, dynamisches Nachladen oder eine offene B3-Entscheidung zu.
4. Prüfen: App-Interface, Security Baseline und Prokrastinations-APP_SPEC sind semantisch synchron.
5. Prüfen: Nur die sieben erlaubten Dateien wurden verändert.
6. Kein Commit, kein Deploy und keine weitere Arbeit.

## Erwartete Abschlussmeldung

Kurz und belegbar:

- Status: bestanden / gestoppt.
- Geänderte Dateien.
- Je Datei ein Satz zum realen Delta.
- Ergebnisse der fünf Nachbedingungen.
- Verbleibender nächster Schritt: technischer Migrations-AP, nicht Teil dieses Auftrags.
