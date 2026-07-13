Stand: 2026-07-13 | Session: AP-tailwind-02_slice-7 | Geändert von: Claude

# AP-tailwind-02, Slice 7: Chart-Slot — Ergebnisprotokoll

**Status: GRÜN — Alberts Browser-Abnahme bestätigt (2026-07-13).**

## Was wurde gemacht

App-seitiger unsichtbarer Chart-Slot (`.fw-app__chart-section`) auf den Tailwind-Baukasten migriert (D-04 Ein-Container-Vertrag, `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §9). Drei Slots betroffen — Screen 2 (`sparplan-s2`), Screen 3 (`sparplan-s3`), Screen 4 (`sparplan-s4`).

- **Exakt verwendete Konstante:** `const FW_CHART_SLOT_CLASS = 'relative mt-6';`
- **app.js:** `chartSection2.className`, `chartSection3.className`, `chartSection4.className` von `'fw-app__chart-section'` auf `FW_CHART_SLOT_CLASS` umgestellt. `data-fw-appchart`-Attribute (`sparplan-s2`/`-s3`/`-s4`) und DOM-Reihenfolge unverändert.
- **Entfernter CSS-Selector:** `.fw-app__chart-section { position: relative; width: 100%; margin-top: var(--fw-space-md, 1rem); }` vollständig aus `app.css` entfernt — kein wirksamer Selector mehr vorhanden.
- **app.test.html:** Manifest um das fehlende Token `mt-6` ergänzt (`relative` war bereits vorhanden, aus `FW_SHELL_CLASS`).

Rubikon-Vertrag (`fw-app__rubikon-chart-wrap`, Overlay, Breakpoints), Card-to-Point-Flug, Screen-3-Bridge/Reveal, alle `ChartEngine`/`renderFromData()`-Aufrufe, Canvas/Chart.js unangetastet.

## Manifest-/Checker-Nachweis

`python -B tools/check-test-pages.py`: GRÜN, 16/16 Testseiten, 0 Strukturfehler. Manifest-Mengengleichheit erfüllt.

## Mechanik-Marker-Nachweis

Grep bestätigt, weiterhin vorhanden in `app.css`: `fw-app__rubikon-chart-wrap`, `fw-app__rubikon-text`, `fw-app__station-area--flight-clone`, `--fw-screen3-reveal-fade-duration`, `--fw-card-to-point-flight-duration`.

## Scope-QA und Wiederlesen

- Genau 1 Deklaration `const FW_CHART_SLOT_CLASS = 'relative mt-6';` (Grep bestätigt).
- Genau 3 Zuweisungen `chartSection[234].className = FW_CHART_SLOT_CLASS;` (Grep bestätigt).
- Alle drei `data-fw-appchart`-Werte weiterhin je genau einmal vorhanden.
- Keine wirksame `fw-app__chart-section`-Zuweisung mehr in `app.js`, kein wirksamer Selector mehr in `app.css`.
- Keine Klassenverkettung/Interpolation (`${`/`+`) an den geänderten Stellen (Grep leer).
- `git diff --check`: keine Whitespace-Fehler. `git status --short`/`git diff --name-status`: nur `app.js`, `app.css`, `app.test.html` verändert (+ dieses Protokoll) — der AP-Diff enthält ausschließlich die vier erlaubten Dateien.

## Deterministischer Tool-Nachweis (Nachtrag, 2026-07-13)

Zusätzlich zur Sichtprüfung mit `tools/ci-token-check.js` (`fwChartSlotCheck()`) in `app.test.html` real verifiziert, während Screen 2 aktiv war (Chart im Aufbau):

| Slot | Positionierung | `mt-6` | Flächenlos | Kein Rahmen | Kein Schatten | Kein Radius | Kein Padding | Engine-Wrapper |
|---|---|---|---|---|---|---|---|---|
| `sparplan-s2` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (aktiv gerendert) |
| `sparplan-s3` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — (Screen noch nicht besucht, kein Fehler) |
| `sparplan-s4` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — (Screen noch nicht besucht, kein Fehler) |

Durchgängig grün über alle Testseiten-Instanzen. Bestätigt den D-04-Ein-Container-Vertrag real am DOM (nicht nur am Quelltext): kein Slot trägt jemals Fläche/Rahmen/Schatten/Radius/Padding; der engine-eigene `fw-chart-wrapper` ist der einzige sichtbare Container, sobald ein Chart gerendert wurde.

## Manuelle Abnahme durch Albert

Bestätigt (2026-07-13), 100%: Chart-Optik S2/S3/S4, Card-to-Point-Flug, Rubikon-Breakpoints, kein zusätzlicher Rahmen/Schatten — alles ok. Hinweis: `mt-6` (24px) ist geringfügig größer als der bisherige `--fw-space-md`-Fallback (1rem/16px) — dies ist die im Rezept selbst vorgegebene Differenz (D-04-Rundung), keine Regression.

Kein Commit. Stop.
