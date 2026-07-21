# Claude-Auftrag — Nachputz Testseiten: zentraler Feed-Resolver-Vertrag

**Risikoklasse:** B — begrenzte Anpassung eines repositoryweiten Testwerkzeugs und seiner verbindlichen Testseitendokumentation. Keine Produktlogik.

## Ziel

Bringe den Testseiten-Checker in Einklang mit dem bereits verbindlichen Ghost-Feed-Vertrag:

```text
data-fw-data="dateiname.csv" / data-fw-config="dateiname.json"
  → zentraler Resolver zur Laufzeit
  → keine lokale Datei neben der Testseite

data-csv="relativer-fixture-pfad.csv"
  → lokale Fixture-Referenz
  → weiter durch den Checker prüfen
```

Danach muss `python tools/check-test-pages.py` repositoryweit grün enden. Beseitige dabei die zwei realen, unabhängigen Strukturfehler der betroffenen Testseiten.

## Ausgangsbefund

`tools/check-test-pages.py` behandelt momentan `data-fw-data`, `data-fw-config` und `data-csv` gleich und löst alle drei als lokale Dateireferenzen auf. Das erzeugt in `Apps/prokrastinations-preis/app.test.html` 57 Fehlalarme: Die dortigen Namen werden korrekt erst vom `AppDataResolver` zu `/content/files/app-data/<dateiname>` aufgelöst.

Zusätzlich bestehen zwei reale Strukturfehler:

1. Das Play-CDN-Manifest in `Apps/prokrastinations-preis/app.test.html` enthält Utilities, die in keiner `FW_*_CLASS`-Konstante von `app.js` vorkommen.
2. `tests/engine/app-file.test.html` hat keine strukturellen Testfälle mit `data-fw-test-case` und sichtbaren Erwartungsblöcken.

Die Datenmigration selbst ist abgeschlossen und nicht Gegenstand dieses Auftrags.

## Pflicht lesen

1. `tools/check-test-pages.py` vollständig, insbesondere `check_data_ref()`, `validate_references()`, `validate_allow_missing_markers()` und `validate_test_page()`.
2. `docs/testing/TEST_PAGE_STANDARD.md` vollständig; maßgeblich §10 und §10.1.
3. `docs/spec/APP-INTERFACE.md` §3.1, §6 und §7.
4. `Apps/prokrastinations-preis/app.test.html` vollständig.
5. `Apps/prokrastinations-preis/app.js` nur die `FW_*_CLASS`-Konstanten.
6. `tests/engine/app-file.test.html` vollständig.

## Verbindliche Invarianten

1. `data-fw-data` und `data-fw-config` sind ausschließlich untrusted Laufzeitnamen. Der Testseiten-Checker darf sie **nicht** als lokale Dateien auflösen oder ihre Existenz verlangen.
2. Der Checker darf für diese beiden Attribute keine URL-/Regex-/Grammatik-Validierung ergänzen: Die App-Testseite enthält absichtliche Negativwerte; deren Beweis ist der Laufzeit-Resolver-Test.
3. `data-csv` bleibt eine lokale Fixture-Referenz und wird unverändert auf Existenz, Repository-Grenze und Groß-/Kleinschreibung geprüft.
4. `data-fw-test-allow-missing-ref` gilt danach nur für bewusst fehlende `data-csv`-Fixtures. Es ist keine Mehrfach- oder Umgehungsregel.
5. Die Testseiten dürfen keine Produktionsdateien unter `content/files/app-data/` anlegen, kopieren oder verändern.
6. Keine Änderung an App-Code, Parsern, Resolvern, Theme-Code, Dateninhalt, Ghost-Integration oder Produkt-Specs.

## Erlaubter Write-Scope

Nur diese vier Dateien:

1. `tools/check-test-pages.py`
2. `docs/testing/TEST_PAGE_STANDARD.md`
3. `Apps/prokrastinations-preis/app.test.html`
4. `tests/engine/app-file.test.html`

Keine neue Datei. Kein Commit. Kein Deploy.

## Umsetzung

### 1. Checker und Testseitenstandard synchronisieren

- Passe den Checker minimal an: Nur `data-csv` wird als lokale Datenreferenz geprüft.
- Behalte die Prüfung leerer lokaler `data-csv`-Werte und alle bisherigen lokalen Pfadprüfungen bei.
- Passe Benennung, Kommentare und Docstrings so an, dass sie nicht mehr behaupten, `data-fw-data` oder `data-fw-config` seien lokale Referenzen.
- Passe die Markerlogik konsistent an: `data-fw-test-allow-missing-ref` darf nur noch `data-csv` zuordnen.
- Aktualisiere in `TEST_PAGE_STANDARD.md` das alte lokale `data-fw-data`-Beispiel und alle Sammelaussagen über `data-fw-data`/`data-fw-config`/`data-csv`:
  - `data-fw-data` = voller CSV-Dateiname für den zentralen Resolver.
  - `data-fw-config` = voller JSON-Dateiname für den zentralen Resolver.
  - `data-csv` = lokale Test-Fixture.
  - Die Laufzeit-App, nicht der Strukturchecker, beweist bewusst ungültige Feednamen in Negativtests.
- Keine neue Ausnahmeliste, kein dateinamenspezifischer Sonderfall und keine stille Lockerung für `data-csv`.

### 2. Prokrastinations-Testseite bereinigen

- Entferne nur die nach der Checker-Umstellung fachlich überflüssigen Marker `data-fw-test-allow-missing-ref` für die beiden Ghost-Feed-Fälle `nonexistent.csv` und `stations-missing.json`. Die Szenarien und ihr erwartetes Laufzeitverhalten bleiben bestehen.
- Bereinige den `@source inline(...)`-Manifeststring auf exakt die Union der tatsächlich in `Apps/prokrastinations-preis/app.js` deklarierten `FW_*_CLASS`-Rezeptkonstanten. Erfinde keine neue Klasse und ändere keine `FW_*_CLASS`-Konstante.
- Vor dem Schreiben die vom Checker gemeldete Extra-Menge ermitteln; danach nachweisen: keine fehlenden und keine zusätzlichen Utilities.

### 3. Engine-Vertragstest strukturell reparieren

`tests/engine/app-file.test.html` ist ein inhaltlich vorhandener Vertragstest, aber keine gültige Testseite im Standardformat. Strukturiere ausschließlich das vorhandene Markup in drei echte Testfallgruppen um:

1. Positivfälle 1–3,
2. Exklusivität 4–5,
3. ungültige `data-app-file`-Werte 6–16.

Jede Gruppe erhält genau ein umschließendes Element mit `data-fw-test-case` und genau einen sichtbaren `data-fw-expected-behavior`-Block mit Überschrift und nichtleerer Liste. Verwende die schon vorhandenen, fachlich richtigen Erwartungstexte; keine neue Chart-Logik, keine neuen Datenwerte und keine Änderung der bestehenden Container-/Attributwerte.

## Nachbedingungen / Beweisplan

1. Lies alle vier geänderten Dateien nach dem Schreiben vollständig erneut.
2. Führe `python tools/check-test-pages.py` aus. Erwartung: Exit Code 0 und `TESTSEITEN-STRUKTUR: GRUEN`; keine Rest-Ausnahme.
3. Weise zusätzlich deterministisch nach:
   - Ein fehlendes `data-csv` wird weiterhin durch die lokale Referenzprüfung beanstandet.
   - Die Prokrastinations-Testseite erzeugt keine lokale Existenzmeldung mehr für `data-fw-data` oder `data-fw-config`.
   - Das Prokrastinations-Manifest hat weder fehlende noch zusätzliche Utility-Tokens gegenüber den `FW_*_CLASS`-Konstanten.
4. `git diff --check` für die vier erlaubten Dateien.
5. Scope-QA: `git diff --name-only` und `git status --short` trennen; melde fremde, bereits vorhandene Änderungen, verändere sie nicht.

## Stop-Regeln

Stoppe und berichte statt zu improvisieren, wenn:

- ein grüner Vollcheck nach dem beschriebenen, begrenzten Delta noch weitere unabhängige Fehler außerhalb des Write-Scopes meldet;
- die strukturkonforme Reparatur von `app-file.test.html` eine Änderung an ChartEngine, Produktdaten oder `data-app-file` selbst verlangen würde;
- die Dokumentation mit `APP-INTERFACE.md` nur durch eine Vertragsänderung synchronisierbar wäre.

## Abschlussmeldung

Kurz berichten:

- Status: bestanden / blockiert,
- geänderte Dateien und je ein Satz Wirkung,
- vollständige Checker-Ausgabe bzw. Fehlerzahl,
- Beweise zu den drei Punkten im Beweisplan,
- unveränderte Restarbeit.

Keine Ergebnisdatei anlegen. Danach auf weitere Anweisung warten.
