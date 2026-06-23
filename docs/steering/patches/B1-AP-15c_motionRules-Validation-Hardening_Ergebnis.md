Stand: 2026-06-23 16:00 | Session: B1-AP-15c | Geändert von: Claude

# B1-AP-15c Ergebnis

## Geänderte Dateien

- `Apps/prokrastinations-preis/app.js` — 3 neue motionRules-Guards in `validateStationsJson()`

## Ziel / Ergebnis

Alle 4 bindenden `motionRules`-Felder in `stations.de.json` werden jetzt hart validiert.
Zuvor war nur `mode` geprüft; `betweenStations`, `forcedWaitBeforeContinue` und `reducedMotion`
wurden akzeptiert ohne Prüfung. Dieser Drift ist behoben.

## AP-15b-Gate

- AP-15b im lokalen Arbeitsbaum vorhanden: **ja**
- Geprüfte Stellen:
  - `_prefersReducedMotion()`: Zeile 477–485 in ChartEngine.js — defensiv implementiert mit try/catch
  - `update('none')`: Zeile 363 — Update-Pfad bei Reduced Motion korrekt
  - `animation = false`: Zeile 383–386 — Initial-Render bei Reduced Motion korrekt
- Befund: AP-15b vollständig und korrekt im lokalen Arbeitsbaum vorhanden. Gate 1 grün.

## Implementierung

Eingefügt nach dem bestehenden `mode`-Check (Zeile 691), im exakten Stil der Nachbarn:

```js
// CHANGED: AP-15c — betweenStations, forcedWaitBeforeContinue, reducedMotion hart validiert
if (json.motionRules.betweenStations !== 'short_draw_animation')
    return { ok: false, code: 'invalid_value', detail: 'motionRules.betweenStations must be "short_draw_animation"' };
if (json.motionRules.forcedWaitBeforeContinue !== false)
    return { ok: false, code: 'invalid_value', detail: 'motionRules.forcedWaitBeforeContinue must be false' };
if (json.motionRules.reducedMotion !== 'instant_step')
    return { ok: false, code: 'invalid_value', detail: 'motionRules.reducedMotion must be "instant_step"' };
```

Keine Defaults. Keine automatische Korrektur. Keine Mutation der JSON-Daten.
Kein neues Validierungsframework. Keine Runtime-Nutzung als Feature-Flag.

## Prüfungen

- Aktuelle `stations.de.json` akzeptiert: **ja** — alle 4 Felder haben die erwarteten Werte
- `mode`-Abweichung würde fehlschlagen: **ja** — bestehender Check (unverändert)
- `betweenStations`-Abweichung würde fehlschlagen: **ja** — neuer Guard `!== 'short_draw_animation'`
- `forcedWaitBeforeContinue`-Abweichung würde fehlschlagen: **ja** — neuer Guard `!== false` (strict)
- `reducedMotion`-Abweichung würde fehlschlagen: **ja** — neuer Guard `!== 'instant_step'`
- AP-15b-Änderungen unangetastet: **ja** — ChartEngine.js nicht berührt
- Protected Files unangetastet: **ja**

## Nicht geändert

- `Apps/prokrastinations-preis/app.css`
- `Apps/prokrastinations-preis/config/stations.de.json`
- `Apps/prokrastinations-preis/APP_SPEC.md`
- `Apps/prokrastinations-preis/QA_TEST_CASES.md`
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- Alle Strategy-, Plugin- und Layer-1-Dateien

## Offene Punkte

- Dead CSS Reduced-Motion Cleanup bleibt Folge-AP **B1-AP-15d**.
- Motion Mini-QA bleibt Folge-AP **B1-AP-15e**.
- Draw-Animation normal bleibt bewusst offen, solange Spec dies so führt.
- Marker-Fade-in Screen 3 ist nicht Teil dieses AP.

## Blocker

nein

## Bestätigungen

- Keine Protected Files geändert: ✓
- Keine CSS-Änderung: ✓
- Keine JSON-Änderung: ✓
- Keine Spec-Änderung: ✓
- Keine QA-Testfall-Änderung: ✓
- Keine Engine-Änderung: ✓
- Keine Strategy-Änderung: ✓
- Keine Plugin-Änderung: ✓
- Keine AP-15d/AP-15e-Arbeit: ✓
- Keine AP-16/AP-17/AP-18-Arbeit: ✓
- Keine AP-19/AP-20/AP-21-Arbeit: ✓
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓
