Stand: 2026-07-23 | AF-GM-02c (Target-Replay) + AF-GM-02c-cli-args-fix (P1) + AF-GM-02c-Fix-02 (README) | Geändert von: Claude

# Nachweise AF-GM-02c

Erweiterung von `tools/golden-master/verify.mjs` um einen optionalen `--target-url`-Modus: dieselbe gespeicherte Trace-Spur wird gegen eine explizit lokale HTTP-Loopback-URL statt gegen die referenzierte Fixture-Datei abgespielt. Referenz-Hash bleibt immer zuerst und unverändert gegen `trace.referencePath` geprüft. Die Ziel-URL ist keine neue Trace-Eigenschaft — Schema und bestehende Spuren bleiben unverändert.

**Gültiger CLI-Vertrag (final, nach P1-Fix):** ausschließlich `<trace>` oder `<trace> --target-url <url>`. Jede andere Form (fehlender Wert, unbekanntes Argument, doppeltes `--target-url`) bricht mit `GM-ERR-CLI-ARGS-INVALID` ab, bevor Hash-Prüfung, Browserstart oder Zielnavigation stattfinden.

Positiv-Fixture (Zielmodus): `tests/fixtures/golden-master-trace/fixture.html`, ausgeliefert über `tests/golden-master/local-target-server.mjs` (Loopback-HTTP, `node:http`, kein neues Paket). Negativ-Fixtures: `tests/fixtures/golden-master-target-replay/target-state-mismatch.html`, `target-missing-selector.html`. Deterministischer Treiber: `tests/golden-master/target-replay-check.mjs` (startet Server, führt `verify.mjs` als Kindprozess aus, schließt Server garantiert). Spur in allen Fällen: `tests/golden-master/traces/minimal-normal.behavior-trace.json`.

## Positivnachweis

| # | Szenario | Kommando | Exit | Ergebnis |
|---|---|---|---|---|
| 1 | Bestehende, gültige Spur gegen lokales HTTP-Ziel | `node tests/golden-master/target-replay-check.mjs tests/fixtures/golden-master-trace fixture.html tests/golden-master/traces/minimal-normal.behavior-trace.json` | `0` | `{"status":"PASS","mode":"normal","actionsVerified":6,"targetUrl":"http://127.0.0.1:49907/fixture.html"}` |

## Negativnachweise — Zielmodus (alle fail-closed)

| # | Szenario | Kommando | Exit | Fehler-ID | Meldung |
|---|---|---|---|---|---|
| 2 | Zielzustandsabweichung | `node tests/golden-master/target-replay-check.mjs tests/fixtures/golden-master-target-replay target-state-mismatch.html tests/golden-master/traces/minimal-normal.behavior-trace.json` | `1` | `GM-ERR-STATE-MISMATCH` | „Aktion #0 (observe-text auf '#counter'): erwartet '0', beobachtet '5'" |
| 3 | Fehlender Zielselector | `node tests/golden-master/target-replay-check.mjs tests/fixtures/golden-master-target-replay target-missing-selector.html tests/golden-master/traces/minimal-normal.behavior-trace.json` | `1` | `GM-ERR-SELECTOR-NOT-FOUND` | „Selector '#increment-btn' (Aktion #2, observe-class) löst nicht auf" |
| 4 | Nichtlokale Ziel-URL | `node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-normal.behavior-trace.json --target-url http://example.com/` | `1` | `GM-ERR-TARGET-URL-NOT-LOCAL` | Bricht vor jedem Browserstart ab (kein `Browser-Executable:`-Log) |

## Negativnachweise — CLI-Argumentvertrag (P1-Befund + Fix)

Ein unabhängiger Test fand, dass `--target-url` ohne Wert fälschlich mit Exit 0 endete und still auf den Fixture-Modus zurückfiel (Root Cause: `rawArgs[i+1] ?? null` lieferte `null`, die anschließende `if (targetUrlArg)`-Prüfung übersprang dadurch die Lokalitätsvalidierung komplett). Behoben durch eine strikte Positivliste der beiden gültigen Aufrufformen; alle drei folgenden Fälle wurden real erneut geprüft:

| # | Szenario | Kommando | Exit | Fehler-ID | Browserstart |
|---|---|---|---|---|---|
| 5 | `--target-url` ohne Wert (gemeldeter P1-Befund) | `node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-normal.behavior-trace.json --target-url` | `1` | `GM-ERR-CLI-ARGS-INVALID` | nein |
| 6 | Unbekanntes Argument | `node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-normal.behavior-trace.json --wat foo` | `1` | `GM-ERR-CLI-ARGS-INVALID` | nein |
| 7 | Doppeltes `--target-url` | `node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-normal.behavior-trace.json --target-url http://127.0.0.1:1 --target-url http://127.0.0.1:2` | `1` | `GM-ERR-CLI-ARGS-INVALID` | nein |

## Regressionsnachweise

**Bestehende Mockup-Replays ohne `--target-url`** — Output bytegleich zum ursprünglichen Format (kein `targetUrl`-Feld):

| # | Spur | Exit | Ergebnis |
|---|---|---|---|
| 8 | `minimal-normal.behavior-trace.json` | `0` | `{"status":"PASS","mode":"normal","actionsVerified":6}` |
| 9 | `minimal-reduced.behavior-trace.json` | `0` | `{"status":"PASS","mode":"reduced","actionsVerified":6}` |
| 10 | `input-controls-normal.behavior-trace.json` | `0` | `{"status":"PASS","mode":"normal","actionsVerified":5}` |

**Schema- und Paketvalidierung (Python, unverändert):**

```
python tools/golden-master/validate_schema.py tests/golden-master/traces/minimal-normal.behavior-trace.json tests/golden-master/traces/minimal-reduced.behavior-trace.json tests/golden-master/traces/af-gm-03-synthetic.behavior-trace.json tests/golden-master/traces/input-controls-normal.behavior-trace.json
```
Exit `0` — `SCHEMA-VALIDIERUNG: GRUEN (4 Datei(en) geprüft)`

```
python tools/golden-master/validate_package.py tests/golden-master/packages/af-gm-03-positive
```
Exit `0` — `{"status":"PASS","sourcesChecked":3,"assumptionsChecked":2}`

## Scope-QA

`git status --short` vor diesem Evidenz-Patch enthielt ausschließlich die in den vorangegangenen, bereits quittierten Patches dieser AP-Kette erzeugten/geänderten Dateien (`verify.mjs`, `README.md`, `local-target-server.mjs`, `target-replay-check.mjs`, zwei synthetische Ziel-Fixtures, drei Patch-Quittungen) sowie zwei fremde, vorbestehende Einträge außerhalb dieses APs (`.claude/learning/session-log.md` aus dem `/start`-Session-Start, eine unabhängig entstandene Chronik-Datei). Dieser Evidenz-Patch fügt ausschließlich diese Datei hinzu.

## Grenze

Dieser AP beweist keinen lokalen Ghost-Page-Replay und keine Produkt- oder Launch-Reife — beides bleibt AF-GM-04 vorbehalten. Der Zielmodus wurde ausschließlich gegen synthetische, projekteigene Fixtures über einen selbstgehosteten Loopback-Server geprüft.

## Bekannter kosmetischer Befund

Wie in den vorherigen AF-GM-Nachweisen: einzelne deutsche Sonderzeichen erscheinen in der Bash-Tool-Konsolenausgabe (`validate_schema.py`) als `�` (Windows-Codepage-Darstellung). Kein funktionaler Fehler.
