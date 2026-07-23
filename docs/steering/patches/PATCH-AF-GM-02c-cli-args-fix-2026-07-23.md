Stand: 2026-07-23 | Session: AF-GM-02c-cli-args-fix | Geändert von: Claude

# Patch-Quittung | AF-GM-02c-cli-args-fix | 2026-07-23

**Beauftragt:** P1-Befund aus unabhängigem Test beheben: `node tools/golden-master/verify.mjs <trace> --target-url` (ohne Wert) endete fälschlich mit Exit 0 und spielte still die Referenz-Fixture statt der angeforderten Ziel-URL ab. Ein angefordertes Target-Replay darf nie still auf den Fixture-Modus zurückfallen. Zusätzlich verlangt: nur die zwei gültigen Aufrufformate akzeptieren, fehlenden Wert/unbekannte Argumente/doppeltes `--target-url` fail-closed vor Hash-/Browser-/Zielnavigation ablehnen, dafür eine stabile Fehler-ID, PASS-Output ohne `--target-url` wieder ohne `targetUrl`-Feld.

**Geändert:** 1 Datei, 3 Stellen

**Dateien:**
- `tools/golden-master/verify.mjs`

**CHANGED/NEW-Markierungen:**
- Neue Fehler-ID `ERR.CLI_ARGS_INVALID` (`GM-ERR-CLI-ARGS-INVALID`) — `// NEW (AF-GM-02c-Fix)`
- Argument-Parser ersetzt: strikte Positivliste `[]` oder `['--target-url', <nichtleerer String>]`, alles andere fail-closed vor Hash-Check — `// CHANGED (AF-GM-02c-Fix)`
- PASS-Output: `targetUrl`-Feld nur noch bedingt gesetzt (Fixture-Modus wieder bytegleich zum Ursprungsformat) — `// CHANGED (AF-GM-02c-Fix)`

**Tabu-Check:** keine ✓ — nur `verify.mjs` im Scope, kein `forbidden`/`protected`-Pfad berührt.

**Gate-Typ:** Full (Full-Gate-Update vor diesem Fix separat vorgelegt und von Albert freigegeben)

**Root Cause (dokumentiert im Full-Gate-Update):** `targetUrlArg = rawArgs[i + 1] ?? null;` lieferte bei `--target-url` als letztem Argument `null` (falsy) → die anschließende `if (targetUrlArg)`-Prüfung übersprang die Lokalitätsvalidierung komplett → `page.goto(targetUrl ?? fixtureUrl)` fiel auf `fixtureUrl` zurück → Hash-Check bereits grün → Exit 0 trotz angefordertem, aber nie ausgeführtem Target-Replay.

**Tatsächliche Tests (reale Kommandos, reale Exit-Codes):**

| # | Szenario | Kommando (gekürzt) | Exit | Fehler-ID / Ergebnis |
|---|---|---|---|---|
| P1 | gemeldeter Befund: `--target-url` ohne Wert | `verify.mjs <trace> --target-url` | 1 | `GM-ERR-CLI-ARGS-INVALID`, kein Browser gestartet |
| N1 | unbekanntes Argument | `verify.mjs <trace> --wat foo` | 1 | `GM-ERR-CLI-ARGS-INVALID`, kein Browser gestartet |
| N2 | doppeltes `--target-url` | `verify.mjs <trace> --target-url http://127.0.0.1:1 --target-url http://127.0.0.1:2` | 1 | `GM-ERR-CLI-ARGS-INVALID`, kein Browser gestartet |
| 1 | Positivlauf HTTP-Ziel | `target-replay-check.mjs tests/fixtures/golden-master-trace fixture.html <trace>` | 0 | `PASS`, `targetUrl` gesetzt |
| 2 | Zielzustandsabweichung | `target-replay-check.mjs ... target-state-mismatch.html <trace>` | 1 | `GM-ERR-STATE-MISMATCH` |
| 3 | fehlender Zielselector | `target-replay-check.mjs ... target-missing-selector.html <trace>` | 1 | `GM-ERR-SELECTOR-NOT-FOUND` |
| 4 | nichtlokale Ziel-URL | `verify.mjs <trace> --target-url http://example.com/` | 1 | `GM-ERR-TARGET-URL-NOT-LOCAL` |
| 5a–c | Regression ohne `--target-url` (3 Spuren) | `verify.mjs <trace>` | je 0 | `PASS`, **kein** `targetUrl`-Feld im Output (wiederhergestellt) |
| 6a | Regression Schema (4 Spuren) | `validate_schema.py ...` | 0 | `SCHEMA-VALIDIERUNG: GRUEN` |
| 6b | Regression Paket `af-gm-03-positive` | `validate_package.py ...` | 0 | `PASS` |

**Scope-QA:** `git status --short` enthält nur `tools/golden-master/verify.mjs` als neu geänderte Datei plus diese Quittungsdatei; alle übrigen Einträge (Session-Log, Chronik, aus Patch 1 bereits vorhandene neue Dateien) unverändert/fremd zu diesem Fix.

**Offene, bewusst nicht behobene Randnotiz:** `tools/golden-master/README.md` listet `GM-ERR-CLI-ARGS-INVALID` noch nicht in der Fehler-ID-Tabelle. Nicht Teil des explizit beauftragten Fix-Scopes dieses Patches — gemeldet, nicht still mitgezogen (Scope-Auftragstreue).

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 3 Stellen geändert. Aufzählen? Nein — vollständig oben dokumentiert.

→ Bitte teste mit den Kommandos oben, insbesondere dem ursprünglich gemeldeten P1-Fall. Ich warte vor dem nächsten Patch (Evidenzdatei) auf deine Bestätigung.
