# Inhaltlicher Übergabeprompt — CI-Kette abgeschlossen → App-Fonts/Tailwind/Design (Stand 2026-07-10)

Für: frischen Steuerungsfaden. **Nur Inhalt** — der Arbeitsmodus (Anamnese, Datei-Wahrheit, Werkzeugwahl, Stop-Regeln, AP-Muster) kommt aus dem **taktischen Startprompt** (`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`), der zusätzlich mitgegeben wird. Diese Kapsel ersetzt die Historie des alten Fadens; alles Entschiedene liegt versioniert in den unten referenzierten Dateien.

## Stand: CI-Pool/Tailwind-Farbkette 15a–19 — ABGESCHLOSSEN & committed

| Ergebnis | Status |
|---|---|
| CI-Kontrakt, `tokens.css` = SSoT, `screen.css` migriert, Theme-Bridge + Durchleitung zur Chart-Engine | GRÜN, unabhängig belegt (AP-18) |
| Pilot `prokrastinations-preis`: **Farben** CI-konform (`--fw-color-*` → `--color-*`, Petrol-Primary), Albert-abgenommen | GRÜN |
| Property-Zahl: `FwTheme.init()` liest **19** `--color-*` in **20** Tokens (`linesDark` abgeleitet) | erledigt |
| Doku-Falschaussagen (Kontrakt-Zahl, TC-N05, NAVIGATION, Spec) korrigiert (AP-19) | GRÜN |
| AP-17…19 Abschluss-Ritual + Commit | durch |

**Offen und wichtig: Fonts sind NOCH NICHT CI-konform.** Der Pilot rendert auf Fallback-`sans-serif`; `--font-display` (Archivo Black) / `--font-body` (Source Sans Pro) liegen in `tokens.css`, sind aber nicht in die App gebrückt (in AP-17 Fork 5 bewusst vertagt).

## Fahrplan bis „Pilot-App fertig" (Alberts Entscheidung 2026-07-10)

| # | Schritt | Modell |
|---|---|---|
| 1 | **CI-Fonts in die App** — `AP-prokrast-17-FOLLOWUP-FONT` (`--fw-font-base` → `--font-body`) **gekoppelt mit** DS-FOLLOWUP-07 (Rubikon-Nachmessung S/M/L, weil der Font-Wechsel die Textmetrik verschiebt). **Prerequisite vor Tailwind** — Struktur auf der finalen Typografie bauen, nicht auf Fallback. | Opus |
| 2 | **Tailwind (CDN) + App-Struktur/Design** — Tailwind per **CDN** (kein Build), dann DS-014 **Design-API-Baukasten** (Backlog: „Blocker für alle App-Entwicklung") + AF-21/22/23. Die App strukturell gestalten (Karten, Schatten, Linien, Rhythmus). Konzept/Gestaltung zuerst = **Fable**; technische Integration = **Opus**. | Fable → Opus |
| 3 | → Pilot „fertig". | — |

**Nicht auf dem kritischen Pfad:** T1/CSS-6 (Tailwind-Produktions-Build) = **ganz zuletzt**, CDN reicht bis dahin. Ghost/Theme-Auslieferung (TMPL-1, TH-03…06) = **entfällt vorerst** — Arbeits-/Testfläche bleiben die einfachen HTML-Testseiten.

**Parallele Infrastruktur:** **TESTENV-1** (Backlog-Epic) — konsolidierte Testumgebung (Testverzeichnis, Pro-App-Harness + Launcher-Index + Harness-Template, Chart-Harness-Konsolidierung, versioniert-Kanon vs. Scratch). Löst zugleich F-3 (gitignoreter Abnahme-Harness) und AP-23 (Chart.js pinnen). Start: Inventar-/Anamnese-AP.

## Maßgebliche Wahrheitsquellen

1. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` — Rollen, Token-Namen, FINAL-Hexe, Nutzungsregeln.
2. `Theme/assets/css/tokens.css` — SSoT der Werte. `Theme/assets/css/screen.css` — Ghost-Stylesheet, `@import tokens.css` (2 Rest-Hexe `#f9fafb`/`#f3f4f6` → T1).
3. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (KDR 9/14), `docs/spec/Der Rucksack (Context Object Pattern).md` — bindend.
4. `Apps/prokrastinations-preis/` — Pilot: `app.css`/`app.js`/`app.test.html`/`QA_TEST_CASES.md` (Gruppe N = CI-Farbtoken).
5. `docs/steering/BACKLOG.md` — offene Punkte (u. a. DS-012/013/014, AF-21/22/23, T1/CSS-6, TESTENV-1, AP-prokrast-17-FOLLOWUP-FONT, AP-prokrast-17b-QA).

## Erster AP im neuen Faden

Schritt 1 (CI-Fonts), **Anamnese zuerst, kein sofortiger Code**: welche `@font-face`-Einbindung nutzt der Test-Harness, welche Rubikon-Positionen hängen an der Metrik — dann Font-Migration + Nachmessung. Parallel kann die Design-Anamnese (Fable) für Schritt 2 vorbereitet werden.
