Stand: 2026-07-23 | AF-GM-03 Inhaltsgate-Nachputz | Geändert von: Claude

# Nachweise AF-GM-03 (inkl. Inhaltsgate-Nachputz)

Alle Pfade repo-relativ. Kein echtes Paket, kein Werkstattpfad, kein Pilot — ausschließlich synthetische Testdaten unter `tests/golden-master/`.

Eingabe-Spec: `tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec.json`
Synthetische Quellen: `synthetic-mockup.html`, `synthetic-icon.svg`, `synthetic-data.csv` (alle unter `tests/golden-master/fixtures/af-gm-03-synthetic-package/`).

## Trace-Bindung (Umsetzung 1)

Der bisherige Trace der Positivfixture (wiederverwendeter AF-GM-02-Trace) referenzierte ein anderes Mockup als `acceptance.json.mockupPath` — genau die Lücke, die dieser Nachputz schließt. Neuer, real aufgezeichneter Trace gegen die eigene Fixture:

```
node tools/golden-master/record.mjs tests/golden-master/action-scripts/af-gm-03-synthetic.actions.json normal tests/golden-master/traces/af-gm-03-synthetic.behavior-trace.json tests/golden-master/screenshots/af-gm-03-synthetic
```
Exit-Code: `0` — `AUFNAHME OK: ... (Modus normal, 6 Aktionen, Chromium 149.0.7827.55)`

`package-spec.json.behaviorTracePath` zeigt jetzt auf diesen Trace statt auf den AF-GM-02-Trace.

## 1. Positiv: Vorlage/Fixture erzeugt und vollständig validiert

```
python tools/golden-master/generate_package.py tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec.json tests/golden-master/packages/af-gm-03-positive
```
Exit-Code: `0` — `PAKET ERZEUGT: ... (8 Pflichtdateien)`

```
python tools/golden-master/validate_package.py tests/golden-master/packages/af-gm-03-positive
```
Exit-Code: `0` — `{"status": "PASS", "sourcesChecked": 3, "assumptionsChecked": 2}`

Explizite Bindungsprüfung (Python-Direktvergleich, zusätzlich zum Validator-internen Check):
`acceptance.mockupPath == trace.referencePath` und `acceptance.mockupSha256 == trace.referenceSha256` → `MATCH: True` (Hash `7d2716a6f54892078dee97e5f468b244fa4e01b994b85d32d87d4ab5cfea441b`).

## 2. Neue Negativfälle (Inhaltsgate-Nachputz)

| # | Fall | Paket/Spec | Befehl | Exit | Fehler-ID |
|---|---|---|---|---|---|
| 2.1 | Trace verweist auf anderes, valides Mockup | `af-gm-03-negative-trace-mismatch` (AF-GM-02-Trace `minimal-normal` statt eigenem Trace) | `validate_package.py tests/golden-master/packages/af-gm-03-negative-trace-mismatch` | 1 | `GM03-ERR-TRACE-ACCEPTANCE-MISMATCH` |
| 2.2 | Quellpfad mit `../` | `af-gm-03-negative-path-traversal` (`source-manifest.json` erster Pfad → `../outside-repo-test.txt`) | `validate_package.py tests/golden-master/packages/af-gm-03-negative-path-traversal` | 1 | `GM03-ERR-PATH-OUTSIDE-REPO` |
| 2.3a | Quelle mit `permitted: false` (Validator) | `af-gm-03-negative-not-permitted` (`source-manifest.json` erster Eintrag `permitted: false`) | `validate_package.py tests/golden-master/packages/af-gm-03-negative-not-permitted` | 1 | `GM03-ERR-SOURCE-NOT-PERMITTED` |
| 2.3b | Quelle mit `permitted: false` (Generator) | `package-spec-not-permitted.json` (Spec-Kopie, erste Quelle `permitted: false`) | `generate_package.py tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec-not-permitted.json tests/golden-master/packages/af-gm-03-negative-not-permitted-generator` | 1 | `GM03-ERR-SOURCE-NOT-PERMITTED` — kein Ordner/keine Datei geschrieben |
| 2.4 | Produktionsplan ohne `## Tests` | `af-gm-03-negative-production-plan` (`production-plan.md` ohne den `## Tests`-Abschnitt) | `validate_package.py tests/golden-master/packages/af-gm-03-negative-production-plan` | 1 | `GM03-ERR-PRODUCTION-PLAN-INCOMPLETE` |

Alle fünf Läufe: Exit-Code `1`, JSON-Ausgabe mit `"status": "FAIL"` und der jeweils genannten Fehler-ID.

## 3. Regression: bestehende Negativfälle bleiben rot

Alle drei aus dem korrigierten Positiv-Stand neu abgeleitet (gleiche Mutation wie zuvor), damit sie nicht durch die neue Trace-Bindungsprüfung verdeckt werden:

| # | Fall | Befehl | Exit | Fehler-ID |
|---|---|---|---|---|
| 3.1 | Fehlendes Acceptance-Feld (`acceptedBy`) | `validate_package.py tests/golden-master/packages/af-gm-03-negative-acceptance` | 1 | `GM03-ERR-MISSING-FIELD` |
| 3.2 | Source-Hash-Mismatch | `validate_package.py tests/golden-master/packages/af-gm-03-negative-source` | 1 | `GM03-ERR-HASH-MISMATCH` |
| 3.3 | `blocked`-Annahmenstatus | `validate_package.py tests/golden-master/packages/af-gm-03-negative-assumption` | 1 | `GM03-ERR-ASSUMPTION-BLOCKED` |

Unverändert gegenüber dem ursprünglichen AF-GM-03-Nachweis — bestätigt, dass der Inhaltsgate-Nachputz diese drei Fälle nicht verändert hat.

## 4. Regressionsnachweis: AF-GM-02-Strukturvalidierung bleibt grün

```
python tools/golden-master/validate_schema.py tests/golden-master/traces/minimal-normal.behavior-trace.json tests/golden-master/traces/minimal-reduced.behavior-trace.json
```
Exit-Code: `0` — `SCHEMA-VALIDIERUNG: GRUEN (2 Datei(en) geprüft)`

## 5. Bonus (nicht Teil der Pflichtnachweise): expliziter Lesebann

```
python -c "... safe_repo_path('Active Campaign Liste/irgendwas.csv') ..."
```
Ergebnis: `GM03-ERR-SOURCE-READ-FORBIDDEN` — bestätigt, dass `repo_path_guard.safe_repo_path()` einen laut `PROTECTED_PATHS.json` explizit „Niemals lesen"-Pfad ablehnt, bevor irgendein Lesezugriff stattfindet. Kein eigenes Testpaket dafür angelegt, da nicht in der geforderten Nachweisliste — nur direkter Funktionsaufruf zur Absicherung.

## Bekannter kosmetischer Befund

Wie im ursprünglichen AF-GM-03-Nachweis: einzelne deutsche Sonderzeichen erscheinen in der Bash-Tool-Konsolenausgabe als `�` (Windows-Codepage-Darstellung). Kein funktionaler Fehler — alle Dateien sind korrekt UTF-8-kodiert.
