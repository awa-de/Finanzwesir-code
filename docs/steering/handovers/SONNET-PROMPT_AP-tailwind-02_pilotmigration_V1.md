Stand: 2026-07-13 | Session: AP-tailwind-02a | Geändert von: Claude (Sonnet)

# ÜBERGABEPROMPT — AP-tailwind-02: Pilotmigration `prokrastinations-preis` auf den Tailwind-Baukasten

**Ziel-LLM: Sonnet.** Die Konzeptphase ist abgeschlossen (Fable, 2026-07-12). Ab hier ist es eng
geführte Umsetzungsarbeit nach fertigem Vertrag — keine Designentscheidungen mehr treffen,
keine Alternativen erkunden. Wo der Vertrag schweigt: stoppen und Albert fragen.

---

## 1. Start

1. `/start` ausführen (CLAUDE.md-Sequenz), dann dieses Dokument.
2. Das ist **APP-ARBEIT** → laut CLAUDE.md: „Stopp. Ich lese `APP-INTERFACE.md` und
   `SECURITY-BASELINE.md` jetzt." → Full-Gate, immer.
3. Pflichtlektüre in dieser Reihenfolge:
   - `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` — **der Vertrag** (FREIGEGEBEN
     2026-07-12). Besonders §2 (Klassenkonvention), §3/D-08 (Spacing-Ablösung), §6 (Primitive-Rezepte),
     §9 (Migrationskarte prokrastinations-preis — deine Arbeitsliste).
   - `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` — Farb-/Namensregeln.
   - `Apps/prokrastinations-preis/APP_SPEC.md` → lokaler Steuerungsblock.
   - Visual Board + Mockups daneben (`TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html`,
     `..._MOCKUPS_V0-1.html`) — zeigen die Zieloptik mit exakt den Vertragsrezepten.

## 2. Auftrag

`Apps/prokrastinations-preis/` (`app.css` + `app.js`-Klassenstrings + `app.test.html` soweit nötig)
von `fw-app__*`-Eigenbau-CSS auf die Baukasten-Rezepte migrieren — exakt nach Konzept §9
(Migrationskarte, Zeile für Zeile). Fachlogik, Screens-Mechanik, ARIA-Verträge: unverändert.

Tailwind-Laufzeit für den Piloten ist entschieden: `app.test.html` lädt im `<head>` exakt
`<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>`. Dies ist
ausschließlich die vorproduktive Testphase. Der spätere Ghost-Produktionsbuild erzeugt
bereinigtes, minimiertes und lokal gehostetes CSS. Keine erneute Laufzeitdiskussion; direkt mit
dem ersten Migrations-Slice beginnen.

**In kleinen Slices** (je Slice: Gate → Alberts OK → Patch → `/patch-quittung` → Albert
testet im VSCode-Live-Server → erst dann weiter):
Shell/States → KPI → Slider → Buttons/CTA → Stationen-Panel → Disclosure/Callout/sr-only →
Chart-Slot (nur `relative mt-6`!) → Aufräumen `app.css`.

## 3. Harte Regeln (aus Vertrag + Verfassung, nicht verhandelbar)

- **Literalregel (Konzept §2.2):** Klassenlisten nur als vollständige String-Literale bzw. benannte
  JS-Konstanten (`FW_CLASSES.*`). Kein `${`, kein `+` in Klassennamen, kein `@apply`.
- **Utility-Suffix = Token-Name** (Konzept §2.1). Verboten: `-tint`, `-20`, `-30`, `-80` u. ä.
  Taucht so ein Name in einer Quelle auf, ist die Quelle historisch (`Archiv/design-system-2026-05/`) —
  nicht verwenden.
- **`--fw-space-*` wird ersatzlos abgelöst** (D-08). Abnahmekriterium: `grep -r "fw-space" Apps/prokrastinations-preis/` = leer.
- **App-Mechanik nicht anfassen:** Card-to-Point-Flug, Rubikon (inkl. 480/1024-Breakpoints),
  `--fw-card-to-point-flight-duration`, `--fw-screen3-reveal-fade-duration` bleiben wörtlich bestehen
  (als Mechanik-Block kommentiert). Rubikon-Nachmessung ist DS-FOLLOWUP-07, nicht dein AP.
- **Chart-Grenze:** Der App-Chart-Slot bekommt nur `relative` + Abstand (D-04). Engine-DOM
  (`fw-chart-*`, `FwRenderer.js`) und alles im Canvas: tabu — eigener Folge-AP.
- **Kein Engine-/Vault-Code:** `FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js`, `tokens.css`,
  `screen.css` — nicht anfassen (Tabu-Zonen/PROTECTED_PATHS beachten).
- **A11y-Erhalt:** Alle bestehenden ARIA-Attribute, `tabindex`-Fokusführung, `sr-only`-Ersatz für
  `.fw-app__visually-hidden`, `motion-reduce:` an jeder Transition. Kein Verlust gegenüber Bestand.
- **Rundungen sind entschieden** (Konzept §2.3): 200px→`min-h-48`, 140px→`basis-36`, 4px→`rounded-lg`,
  3px→`border-l-2`, 600px→`sm:`. Nicht neu diskutieren, nicht „verbessern".
- **Patches markieren** (`// CHANGED`/`// NEW`), Surgical-Check, keine Nachbar-„Verbesserungen".
- **Testrealität:** Es gibt kein `npm test`. Verifikation = `app.test.html` im Live-Server durch
  Albert, je Slice konkrete Erwartung benennen (Screen, Viewport S/M/L, erwartete Optik laut
  Board/Mockups).

## 4. Abbruch nach CLAUDE.md

Zwei Fehlversuche, Regression, unklare Ursache, Scope-Wachstum, Tabu-Zone nötig → stoppen,
ATTEMPT-LOG, Albert. Der `.hbs`-/Ghost-Auslieferungs-Gap ist bekannt und **kein** Blocker für
diesen AP (nur die Slice-0-Frage oben ist zu klären).

## 5. Definition of Done (dieser AP)

1. Alle §9-Zeilen der Migrationskarte umgesetzt, `app.css` enthält nur noch Mechanik-Block
   (+ ggf. schlanke `data-fw-state`-Sammler laut Vertrag 6.10).
2. `--fw-space-*`-Grep leer; keine dynamisch komponierten Klassen (Review-Grep `\${`/`' +` in
   Klassenkontexten leer).
3. Albert hat alle 4 Screens in S/M/L im Live-Server abgenommen (Optik-Referenz: Mockups).
4. Mehrfachinstanz-Guard, alle ARIA-Verträge, Reduced-Motion nachweislich erhalten.
5. Abschluss-Ritual **nur nach Alberts explizitem „mach den Abschluss"** — nicht proaktiv ausführen.

## 6. Nicht-Ziele

Engine-DOM-Migration, die 3 Standalone-Prototypen, Content-System/Janitor (DS-015), T1/lokaler
Build, Testseiten-Umbau über das für `app.test.html` Nötige hinaus, neue Libraries/Plugins,
Farb-/Font-/Radius-Wertänderungen, Git-Schreibbefehle aus einer Cowork-Sandbox auf das NAS-Repo
(Dateioperationen ja, Git macht Albert in VSCode).
