Stand: 2026-07-13 | Session: AP-tailwind-02_slice-8 | Geändert von: Claude

# AP-tailwind-02, Slice 8: Screen-Flow-Nachputz — Ergebnisprotokoll

**Status: GRÜN — Alberts Browser-Abnahme bestätigt (2026-07-13).**

## Klassenrezepte und Zuweisungen

```js
const FW_SCREEN_CLASS = 'relative';
const FW_SCREEN_HEADLINE_CLASS = 'fw-app__screen-headline m-0 mb-2 text-xl font-bold text-text';
const FW_SCREEN_NAV_CLASS = 'flex flex-wrap gap-3 mt-6';
```

- **Screen:** 4 Zuweisungen (`screen1`–`screen4`) auf `FW_SCREEN_CLASS`.
- **Headline:** 4 Zuweisungen (`h2S1`–`h2S4`) auf `FW_SCREEN_HEADLINE_CLASS`.
- **Navigation:** 2 Zuweisungen (`navS3`, `navS4`) auf `FW_SCREEN_NAV_CLASS`.

`data-fw-screen` (`dataset.fwScreen`, alle vier Werte `'1'`–`'4'`), `tabIndex = -1` an allen vier Headlines, `hidden`-Zustände, Texte, DOM-Reihenfolge und Event-Handler unverändert.

## Entfernte CSS-Blöcke und bewahrte Fokusregel

Entfernt: `.fw-app__screen { position: relative; }`, `.fw-app__screen-headline { font-size/font-weight/color/margin }`, `.fw-app__screen-nav { display/gap/margin-top }`.

Wortgleich stehen gelassen: `.fw-app__screen-headline:focus { outline: none; /* nur JS-Fokus (tabIndex=-1), kein Tastatur-Fokus-Ring nötig */ }` — expliziter A11y-Kompatibilitätsrest, kein neues `focus:`-Muster.

## Manifest-/Checker-Nachweis

`app.test.html`-Manifest um die fehlenden Tokens `mb-2` und `text-xl` ergänzt (`relative`, `flex-wrap`, `gap-3`, `mt-6` waren bereits vorhanden). `python -B tools/check-test-pages.py`: GRÜN, 16/16 Testseiten, 0 Strukturfehler.

## Geschützte Bereiche — Nachweis

- `.fw-app__screen-subline` vollständig unverändert stehen gelassen (inklusive ihrer `--fw-space-md`-Margin).
- Gesamter Rubikon-Bereich (`fw-app__rubikon-chart-wrap`, `-text`, `-variant--short`, `-line`, `-footnote`, beide Breakpoint-Media-Queries), Card-to-Point-Flug (`fw-app__station-area--flight-*`), Screen-3-Reveal-Mechanik (`fw-app__kpi-slot`, `fw-app__assumptions`, `fw-app__screen3-reveal--visible`) — Grep bestätigt: keine geänderten Zeilen in diesen Bereichen.
- Verbleibende echte `--fw-space-*`-CSS-Deklaration in `app.css`: ausschließlich `.fw-app__screen-subline { margin: 0 0 var(--fw-space-md, 1rem); }` (Zeile 47) — bewusster, nicht gelöster Rubikon-Kompatibilitätsrest (dieselbe Klasse trägt geschützten Rubikon-Fließtext, siehe CSS-Inventur). Keine globale Leerheit von `--fw-space-*` behauptet.

## Nachweise

- 3 Konstanten je genau einmal deklariert (Grep bestätigt).
- 4 Screen- + 4 Headline- + 2 Nav-Zuweisungen exakt gezählt (Grep bestätigt: 4/4/2).
- Keine Klassenverkettung/Interpolation (`${`/`+`) an den geänderten Stellen (Grep leer).
- `git diff --check`: keine Whitespace-Fehler. `git status --short`/`git diff --name-status`: nur `app.js`, `app.css`, `app.test.html` verändert (+ dieses Protokoll) — der AP-Diff enthält ausschließlich die vier erlaubten Dateien.

## Deterministischer Tool-Nachweis (Nachtrag, 2026-07-13)

Zusätzlich zur Sichtprüfung mit `tools/ci-token-check.js` (`fwScreenFlowCheck()`) in `app.test.html` real verifiziert, je einzeln bei sichtbarem Screen aufgerufen (nicht nur beim initialen Auto-Lauf, bei dem nur Screen 1 sichtbar ist):

| Screen | `position: relative` | `text-xl font-bold` | Textfarbe | `tabIndex=-1` | Kein Outline bei echtem `.focus()`-Aufruf |
|---|---|---|---|---|---|
| 1 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4 | ✅ | ✅ | ✅ | ✅ | ✅ |

Der `.focus()`-Outline-Test ist programmatisch (nicht nur Sichtprüfung): Skript ruft `.focus()` real auf der Headline auf und liest `getComputedStyle().outlineStyle` — bestätigt für alle vier Screens einzeln, dass die Fokus-Kompatibilitätsregel (`.fw-app__screen-headline:focus { outline: none; }`) tatsächlich greift, nicht nur im Stylesheet steht. Navigation (`flex flex-wrap`, `gap-3`, `mt-6`) ebenfalls durchgängig grün über alle Testseiten-Instanzen.

## Manuelle Abnahme durch Albert

Bestätigt (2026-07-13): Headline-Optik/Abstand, Fokus bei Screenwechsel, Nav-Umbruch, Rubikon/Flug unverändert — alles ok.

Der Rubikon-Subline-Rest bleibt ausdrücklich offen — dies ist keine abgeschlossene Gesamtmigration von `app.css`, sondern nur der Screen-Rahmen/Headline/Nav-Anteil.

Kein Commit. Stop.
