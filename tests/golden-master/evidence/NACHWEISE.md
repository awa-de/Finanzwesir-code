Stand: 2026-07-23 | AF-GM-02 (Unlock/Werkzeug/Relock + Browserpfad-Nachputz) | Geändert von: Claude

# Nachweise AF-GM-02

Fixture: `tests/fixtures/golden-master-trace/fixture.html`
Action-Script: `tests/golden-master/action-scripts/minimal.actions.json`
Playwright: `1.61.1` | Chromium: `149.0.7827.55` (playwright chromium build v1228)
Browser-Executable: `C:\Tools\finanzwesir-playwright\af-gm-02\browsers\chromium-1228\chrome-win64\chrome.exe`

## Positivnachweise

| # | Modus | Aufnahme | Verifikation |
|---|---|---|---|
| 1 | `normal` | `tests/golden-master/traces/minimal-normal.behavior-trace.json` — 6 Aktionen | `PASS` |
| 2 | `reduced` | `tests/golden-master/traces/minimal-reduced.behavior-trace.json` — 6 Aktionen | `PASS` |

Beleg, dass die Modi real unterschiedlich sind (nicht geraten): `data-motion-state` beobachtet als `normal` im ersten, `reduced` im zweiten Trace (per `page.emulateMedia`).

Python-Strukturvalidierung (`validate_schema.py`) gegen beide Traces: `SCHEMA-VALIDIERUNG: GRUEN (2 Datei(en) geprüft)`.

## Negativnachweise (alle fail-closed, Exit-Code 1)

| # | Szenario | Manipulierte Kopie | Fehler-ID | Meldung |
|---|---|---|---|---|
| 3 | Manipulierte Aktion | `negativ-manipulierte-aktion.behavior-trace.json` (`expected` von `#counter` auf `99` verfälscht) | `GM-ERR-STATE-MISMATCH` | „Aktion #0 (observe-text auf '#counter'): erwartet '99', beobachtet '0'" |
| 4 | Fehlender Selector | `negativ-fehlender-selector.behavior-trace.json` (Click-Selector auf `#does-not-exist` geändert) | `GM-ERR-SELECTOR-NOT-FOUND` | „Selector '#does-not-exist' (Aktion #3, click) löst nicht auf" |
| 5 | Hash-Mismatch | `negativ-hash-mismatch.behavior-trace.json` (`referenceSha256` auf 64×`0` gesetzt) | `GM-ERR-HASH-MISMATCH` | „Fixture-Hash weicht ab: Trace erwartet 000...0, real 226b2fe4...b14b" |

Die drei manipulierten Kopien sind ausschließlich Testartefakte in `tests/golden-master/evidence/` — keine gültigen Traces, nicht zur Weiterverwendung.

## Browserpfad-Nachputz (Nachtrag zur ursprünglichen AF-GM-02-Kette)

Ursprünglich wurde Chromium hermetisch unter `node_modules/playwright-core/.local-browsers` installiert (NAS-/Nextcloud-Sync-Pfad `Z:\`). Auf separaten Auftrag umgestellt auf lokalen, projektgebundenen Pfad:

`C:\Tools\finanzwesir-playwright\af-gm-02\browsers`

Größe der Browserartefakte dort: `chromium-1228` 415,4 MB, `chromium_headless_shell-1228` 269,5 MB, `ffmpeg-1011` 3,4 MB, `winldd-1007` 0,2 MB — gesamt ≈ 688,4 MB.

`browser-path.mjs` setzt `PLAYWRIGHT_BROWSERS_PATH` fest auf diesen Pfad, bevor `playwright` per dynamischem Import geladen wird (kein stiller Fallback möglich, da `import { chromium } from 'playwright'` als statischer Import vor jeder eigenen Codezeile ausgeführt würde). Beide Skripte prüfen zusätzlich `chromium.executablePath()` zur Laufzeit.

Alter Ordner `node_modules/playwright-core/.local-browsers` nach beiden grünen Positivnachweisen entfernt (bestätigt: `Test-Path` → `False`).

**Zwischenfall während der Umstellung:** Der erste Installationsversuch nutzte `powershell.exe -Command "$env:PLAYWRIGHT_BROWSERS_PATH = '...'; ..."` über das Bash-Tool. Git Bash hat `$env` als eigene (leere) Shell-Variable interpretiert und `:PLAYWRIGHT_BROWSERS_PATH` als literalen Text an PowerShell durchgereicht — der Env-Var wurde nie gesetzt, Chromium landete im globalen `%USERPROFILE%\AppData\Local\ms-playwright` (durch Zeitstempel-Vergleich als vollständig neu angelegt bestätigt, nichts Vorbestehendes betroffen). Vor dem Korrekturlauf vollständig entfernt (`Remove-Item -Recurse -Force`, danach `Test-Path` → `False`). Zweiter Versuch über eine `.ps1`-Datei (`powershell.exe -File ...`) statt Inline-Command — dabei kann Bash das `$env:`-Token nicht mehr fehlinterpretieren, weil es nicht mehr durch die Bash-Kommandozeile läuft.
