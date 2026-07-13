Stand: 2026-07-13 | Session: AP-tailwind-02f | Geändert von: Claude

# AP-tailwind-02f: Responsiver Disclosure-Kontrakt synchronisiert — Ergebnisprotokoll

**Status: GRÜN — Alberts Browser-Abnahme bestätigt (2026-07-13).**

## Kanonische Entscheidung

**Q-08** (`docs/App-Fabrik/01_DECISION_LOG.md`, direkt nach Q-07): Disclosure-Auslöser bleibt auf Mobile volle Zeile (Label links, Indikator rechts); ab `sm` kompakte Inline-Fläche (`inline-flex`, natürliche Breite, `justify-start`, Text und Pfeil zusammen). Zwischenwerte-`dl`: Mobile volle Breite, ab `sm` Inhaltsbreite (`sm:w-fit`). Ein semantisches Disclosure-Primitive, identische ARIA-/Tastaturbedienung auf allen Breakpoints — keine Desktop-Ausnahme, keine zweite Implementierung.

## Fundstellenkarte (real, via Python erzeugt)

| Datei | Status |
|---|---|
| `docs/App-Fabrik/01_DECISION_LOG.md` | keine Alt-Treffer — Q-08 neu ergänzt nach Q-07 |
| `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` | geändert: §6.8 Trigger-Rezept + Responsive-Absatz, §9 Migrationskarte `dl`-Rezept |
| `docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html` | geändert: 1 Disclosure-Trigger (Zeile 284) |
| `docs/steering/design/TAILWIND-APP-BAUKASTEN_MOCKUPS_V0-1.html` | geändert: 3 Disclosure-Trigger (Zeilen 239, 399, 400) |
| `Apps/prokrastinations-preis/app.js` | geändert: `FW_DISCLOSURE_TRIGGER_CLASS`, `FW_INTERMEDIATE_VALUES_CLASS` |
| `Apps/prokrastinations-preis/app.test.html` | geändert: Manifest um 3 fehlende `sm:`-Tokens ergänzt (`sm:w-auto` war bereits vorhanden) |
| `Apps/prokrastinations-preis/APP_SPEC.md` | nur Texttreffer „Zwischenstand ausblenden" (Label, §14.5) — kein Rezept, nicht geändert (weiterhin wahr: dieselbe Collapsible-Funktion auf allen Breakpoints) |

Keine weitere aktive Datei enthielt das vollständige alte Trigger- oder `dl`-Rezept als Baukasten-Rezept — kein zusätzlicher Write-Kandidat.

## Exakte Klassenrezepte (nach Änderung)

```text
FW_DISCLOSURE_TRIGGER_CLASS:
flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-text-sec transition-colors motion-reduce:transition-none hover:bg-bg-faint hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 sm:inline-flex sm:w-auto sm:justify-start

FW_INTERMEDIATE_VALUES_CLASS:
m-0 grid w-full grid-cols-2 gap-x-4 gap-y-1 sm:w-fit
```

## Nachweise

1. `sm:inline-flex sm:w-auto sm:justify-start` vollständig vorhanden in Konzept (1×), Visual Board (1×), Mockups (3×), `app.js` (1×) — Grep bestätigt.
2. `FW_DISCLOSURE_TRIGGER_CLASS` entspricht exakt dem vorgegebenen String (Grep-Vergleich bestanden).
3. `FW_INTERMEDIATE_VALUES_CLASS` entspricht exakt `m-0 grid w-full grid-cols-2 gap-x-4 gap-y-1 sm:w-fit` (Grep-Vergleich bestanden).
4. `python -B tools/check-test-pages.py`: GRÜN, 16/16 Testseiten, 0 Strukturfehler. Manifest um `sm:inline-flex`, `sm:justify-start`, `sm:w-fit` ergänzt (`sm:w-auto` war bereits vorhanden).
5. Alte Rezepte (`flex w-full items-center justify-between gap-2 … focus-visible:ring-petrol-500` ohne `sm:`-Suffix, `m-0 grid grid-cols-2 gap-x-4 gap-y-1` ohne `w-full`/`sm:w-fit`) in keiner aktiven Baukasten-/Pilotquelle mehr auffindbar (Grep leer). Verbleibende `focus-visible:ring-petrol-500`-Treffer ohne `sm:` gehören zu Segmented-Control/Legend-Pill-Rezepten (§6.5/§6.11) — andere Primitive, korrekt unberührt.
6. `git diff --check`: keine Whitespace-Fehler. `git status --short` / `git diff --name-status`: exakt die im Write-Scope gelisteten Dateien verändert, keine Scope-Ausweitung (`app.css`, `APP_SPEC.md`, `check-test-pages.py`, `ci-token-check.js`, `TEST_PAGE_STANDARD.md` unangetastet, wie vorgegeben).

Das Slice-6-Ergebnisprotokoll (`docs/steering/patches/AP-tailwind-02_slice-6_disclosure-callout-sr-only_Ergebnis.md`) ist bewusst **nicht** umgeschrieben worden — es bleibt historische GELB-Evidenz zum damaligen (nicht-responsiven) Rezeptstand.

## Manuelle Abnahme durch Albert

Bestätigt (2026-07-13), 100%: 375px volle Zeile, 768/1280px kompakt, Toggle/Fokus/Tastatur, Visual Board/Mockups — alles ok.

Kein Commit. Stop.
