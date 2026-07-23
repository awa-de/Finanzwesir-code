Stand: 2026-07-23 | AF-GM-02b (Eingaben/Slider-Spur) | Geändert von: Claude

# Nachweise AF-GM-02b

Neue Fixture: `tests/fixtures/golden-master-input-controls/fixture.html` (eigenständig, synthetisch, kein externer Aufruf, keine Werkstattübernahme). Action-Script: `tests/golden-master/action-scripts/input-controls.actions.json`. Ablauf: Ausgangswert beobachten → Zahl setzen → Zahl-Ausgabe beobachten → Slider setzen → Slider-Ausgabe beobachten (5 Aktionen).

## 1. Neue Spur aufnehmen und real verifizieren

```
node tools/golden-master/record.mjs tests/golden-master/action-scripts/input-controls.actions.json normal tests/golden-master/traces/input-controls-normal.behavior-trace.json tests/golden-master/screenshots/input-controls-normal
```
Exit-Code: `0` — `AUFNAHME OK: ... (Modus normal, 5 Aktionen, Chromium 149.0.7827.55)`

```
node tools/golden-master/verify.mjs tests/golden-master/traces/input-controls-normal.behavior-trace.json
```
Exit-Code: `0` — `{"status": "PASS", "mode": "normal", "actionsVerified": 5}`

Aufgezeichnete `set-input-value`-Aktionen (Belegwerte getrennt, angefordert vs. beobachtet):
- Aktion #1 `#amount`: `value="42"` → `expected="42"`
- Aktion #3 `#intensity`: `value="7"` → `expected="7"`

## 2. Strukturprüfung: neue Spur + bestehende AF-GM-02-Spuren

```
python tools/golden-master/validate_schema.py tests/golden-master/traces/input-controls-normal.behavior-trace.json tests/golden-master/traces/minimal-normal.behavior-trace.json tests/golden-master/traces/minimal-reduced.behavior-trace.json
```
Exit-Code: `0` — `SCHEMA-VALIDIERUNG: GRUEN (3 Datei(en) geprüft)`

## 3. Negativ: erwarteter sichtbarer Wert nach `set-input-value` manipuliert

Kopie `tests/golden-master/evidence/negativ-input-controls-state-mismatch.behavior-trace.json` — `expected` der Beobachtung nach dem Zahlen-Setzen auf `"999"` verfälscht.

```
node tools/golden-master/verify.mjs tests/golden-master/evidence/negativ-input-controls-state-mismatch.behavior-trace.json
```
Exit-Code: `1` — Fehler-ID `GM-ERR-STATE-MISMATCH` — „erwartet '999', beobachtet '42'"

## 4. Negativ: Selector einer `set-input-value`-Aktion auf nicht vorhandenen Selector

Kopie `tests/golden-master/evidence/negativ-input-controls-selector-not-found.behavior-trace.json` — Selector der Zahl-Aktion auf `#does-not-exist` geändert.

```
node tools/golden-master/verify.mjs tests/golden-master/evidence/negativ-input-controls-selector-not-found.behavior-trace.json
```
Exit-Code: `1` — Fehler-ID `GM-ERR-SELECTOR-NOT-FOUND`

## 5. Negativ: `set-input-value` auf vorhandenes Nicht-`input`-Element

Kopie `tests/golden-master/evidence/negativ-input-controls-target-invalid.behavior-trace.json` — Selector der Zahl-Aktion auf `#amount-output` (existiert, ist `<output>`) geändert.

```
node tools/golden-master/verify.mjs tests/golden-master/evidence/negativ-input-controls-target-invalid.behavior-trace.json
```
Exit-Code: `1` — Fehler-ID `GM-ERR-INPUT-TARGET-INVALID` — „zeigt auf <output>, nicht auf ein natives <input>"

## 6. Negativ: `value` aus einer `set-input-value`-Aktion entfernt

Kopie `tests/golden-master/evidence/negativ-input-controls-missing-value.behavior-trace.json` — Feld `value` der Zahl-Aktion gelöscht.

```
python tools/golden-master/validate_schema.py tests/golden-master/evidence/negativ-input-controls-missing-value.behavior-trace.json
```
Exit-Code: `1` — `SCHEMA-VALIDIERUNG: FEHLGESCHLAGEN (1 Befund)` — „actions[1].value muss ein nichtleerer String sein (set-input-value)"

## 7. Regression: bestehende AF-GM-02-Traces bleiben grün

```
node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-normal.behavior-trace.json
```
Exit-Code: `0` — `PASS`, 6 Aktionen

```
node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-reduced.behavior-trace.json
```
Exit-Code: `0` — `PASS`, 6 Aktionen

## 8. Regression: AF-GM-03-Positivpaket bleibt grün

```
python tools/golden-master/validate_package.py tests/golden-master/packages/af-gm-03-positive
```
Exit-Code: `0` — `{"status": "PASS", "sourcesChecked": 3, "assumptionsChecked": 2}`

Bestätigt: das um `set-input-value`/`value` erweiterte Schema wird vom Eingabepaket-Validator unverändert akzeptiert (kein neues Pflichtfeld für bestehende Aktionstypen).

## 9. Browserpfad-Bestätigung

Jeder Positivlauf oben (Nachweis 1, 7, 1-Verifikation) gab aus:

```
Browser-Executable: C:\Tools\finanzwesir-playwright\af-gm-02\browsers\chromium-1228\chrome-win64\chrome.exe
```

Chromium läuft weiterhin ausschließlich aus dem lokalen, projektgebundenen Pfad — kein Rückfall auf `node_modules/playwright-core/.local-browsers` oder das globale `%USERPROFILE%\AppData\Local\ms-playwright`.

## Bekannter kosmetischer Befund

Wie in den vorherigen AF-GM-Nachweisen: einzelne deutsche Sonderzeichen erscheinen in der Bash-Tool-Konsolenausgabe als `�` (Windows-Codepage-Darstellung). Kein funktionaler Fehler.
