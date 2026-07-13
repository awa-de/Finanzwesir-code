Stand: 2026-07-13 | Session: AP-tailwind-02_slice-6 | Geändert von: Claude

# AP-tailwind-02, Slice 6: Disclosure / Callout / sr-only — Ergebnisprotokoll

```text
Status: GELB
Modell: Claude Sonnet
Risikoklasse: B

Disclosure migriert: ja
Callout migriert: ja
Live-Region sr-only: ja
ARIA-/hidden-/Textvertrag unverändert: ja
Screen-3-Reveal-Mechanik unverändert: ja
Manifest-Mengengleichheit: ja
Checker: ja
Marker-QA / Scope-QA / Wiederlesen: ja
Browser-Abnahme Albert: offen
Geänderte Dateien: Apps/prokrastinations-preis/app.js, app.css, app.test.html
Restabweichungen: keine
Nächster Schritt bei GRÜN: Slice 7 Chart-Slot
Kein Commit. Stop.
```

## Was wurde gemacht

Zwischenstand-Disclosure (Screen 2), Annahmen-Callout (Screen 3) und ARIA-Live-Region auf den Tailwind-Baukasten migriert (`TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.7 Callout, §6.8 Disclosure, §6.9 ARIA-Live-Region, §9 Migrationskarte).

- `app.js`: neun neue Klassenkonstanten (`FW_DISCLOSURE_TRIGGER_CLASS`, `FW_DISCLOSURE_INDICATOR_CLOSED_CLASS`, `FW_DISCLOSURE_INDICATOR_OPEN_CLASS`, `FW_DISCLOSURE_CONTENT_CLASS`, `FW_INTERMEDIATE_VALUES_CLASS`, `FW_INTERMEDIATE_LABEL_CLASS`, `FW_INTERMEDIATE_VALUE_CLASS`, `FW_ASSUMPTIONS_CLASS`, `FW_A11Y_LIVE_REGION_CLASS`) ergänzt. `collapsibleWrap` verliert seine Klasse (Stationen-Panel-`gap-3` liefert bereits den Abstand). Trigger bekommt `FW_DISCLOSURE_TRIGGER_CLASS`; sichtbarer Labeltext liegt jetzt in einem eigenen `<span>` (`triggerLabel`), daneben ein neuer `aria-hidden`-Indikator-Span (`▾`) mit `FW_DISCLOSURE_INDICATOR_CLOSED_CLASS`/`_OPEN_CLASS`. Beim Toggle wechselt nur `triggerLabel.textContent` (statt vorher `trigger.textContent`) und die Indikator-Klasse; `aria-expanded`/`hidden`/ID/Listener-Reihenfolge unverändert. `content`, `dl`, `dt`, `dd` auf die jeweiligen Rezeptkonstanten umgestellt. `assumptionsS3.className` und `a11yRegion.className` auf `FW_ASSUMPTIONS_CLASS`/`FW_A11Y_LIVE_REGION_CLASS` (`sr-only`) umgestellt — Marker `fw-app__assumptions` bleibt Teil der Callout-Konstante für die bestehende Reveal-Mechanik.
- `app.css`: `.fw-app__assumptions` (Optikblock), `.fw-app__visually-hidden`, `.fw-app__collapsible*`, `.fw-app__intermediate-values*` entfernt. Die drei Reveal-Mechanikblöcke (`opacity`/`transition`, `.fw-app__screen3-reveal--visible`, `prefers-reduced-motion`) sowie alle Flug-/Chart-/Screen-/Rubikon-Regeln unangetastet stehen gelassen.
- `app.test.html`: Runtime-Manifest um die neuen Utility-Tokens ergänzt (`justify-between`, `gap-2`, `px-3`, `text-left`, `font-semibold`, `hover:text-text`, `transition-transform`, `rotate-180`, `pl-3`, `grid`, `grid-cols-2`, `gap-y-1`, `text-base`, `border-l-2`, `pl-4`, `sr-only`).

Unverändert: `aria-expanded`/`aria-controls`/instanzpräfixierte ID/`hidden`/Beschriftungen, Zwischenwert-Berechnung, DOM-/Lesereihenfolge, Fokus auf dem Trigger, Live-Region-Attribute (`aria-live`/`aria-atomic`), Screen-2-Endwissens-Verbot, Screen-3-Reveal-Text, Screen-3-Bridge/Timer/`fw-app__screen3-reveal--visible`/Reduced Motion, Panel/KPI/Buttons/Chart-Slot/Card-to-Point-Flug/Rubikon.

## Nachweise

- `python -B tools/check-test-pages.py`: GRÜN, 16/16 Testseiten, 0 Strukturfehler.
- `git diff --check`: keine Whitespace-Fehler. `git status --short` / `git diff --name-status`: nur `app.js`, `app.css`, `app.test.html` verändert (+ dieses Protokoll) — Scope-QA bestanden.
- Marker-QA: alle neun Rezeptkonstanten vollständige String-Literale (Grep bestätigt 9/9); keine `+`-/Template-Literal-Konstruktion in einer Klassenzuweisung (Grep leer); kein `fw-app__collapsible`-, `fw-app__intermediate-values`- oder `fw-app__visually-hidden`-Stylesheetrest mehr in `app.js`/`app.css`; die drei Assumptions-Reveal-Mechanikblöcke weiterhin vorhanden.

## Offen

Manuelle Abnahme durch Albert (Live Server, `app.test.html`): Screen 2 Disclosure-Trigger zurückhaltend (kein Button-Look), Hover/Tastaturfokus klar; Enter/Space toggelt `aria-expanded`/`hidden`/Label/▾-Rotation korrekt, Fokus bleibt auf Trigger, Zwischenwerte in zwei Spalten; Screen 3 KPI/Annahmen-Timing nach Bridge unverändert, Callout nur linke Akzentkante ohne Fläche/Schatten; Live-Region per `sr-only` verborgen, kein Endwissen auf Screen 2; 375/768/1280px ohne Überlauf, Disclosure/Callout/Journey-Flug/Slider/Buttons/Rubikon intakt.

Kein Commit. Nicht mit Slice 7 (Chart-Slot) fortgefahren.
