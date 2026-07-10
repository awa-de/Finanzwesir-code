# Übergabekapsel Steuerungsfaden — CI-Kette abgeschlossen → App-Design/Tailwind (Stand 2026-07-10)

Erstellt von: Steuerungsfaden (Opus) · Für: frischen Steuerungsfaden. Diese Kapsel ist selbsttragend — ersetzt die Historie des alten Fadens. Nichts aus der alten Historie wird gebraucht; alles Entschiedene liegt versioniert in den unten referenzierten Dateien.

## Rollenteilung (bewährt, beibehalten)

- **Steuerndes LLM (dieser Faden, Desktop/Cowork):** Anamnese, AP-Schnitt, selbsttragende Startprompts bauen, Rückläufe **gegen die reale Datei** prüfen (nie nur gegen das Protokoll), GRÜN/GELB/ROT-Urteil, Backlog-Housekeeping. Modell: **Opus** — **Fable** bei offener Gestaltungsarbeit (Design-Konzept, Komponentenbaukasten).
- **Ausführendes LLM (Claude Code, VSCode):** ein AP = ein frischer Faden, bekommt **nur den einen Startprompt**. Modell nach AP-Typ: **Opus** engine-/integrationsberührend + Reviews; **Sonnet** mechanische/Doku-APs; **Fable** offene Gestaltung. Python für alles Deterministische.
- **Albert:** Masterentscheidungen, visuelle Abnahmen, Live-Server-Tests, Commits.

## Etablierte Arbeitskonventionen (WICHTIG — im alten Faden hart erarbeitet)

1. **AP-Startprompts sind selbsttragend.** Der nötige Arbeitsmodus (Anamnese zuerst · Datei-Wahrheit vor Protokoll · Wiederlesen nach Write · Werkzeugwahl Python/Haiku/Sonnet · GRÜN nur nach Marker-/Altlasten-/Scope-QA + Wiederlesen · „weiter nur nach Nutzer-OK") wird **in jeden Prompt eingebaut**. **Kein** Verweis auf einen externen taktischen Startprompt — das ausführende LLM bekommt nur diesen einen Prompt.
2. **Startprompt-Dateien** landen in `Archiv/local/muss noch eingeordnet werden/`.
3. **Backlog-/Archiv-Pflege macht der Steuerungsfaden selbst** (direkt via Datei-Edit). App-/Spec-/QA-Dokumente ändert dagegen das ausführende LLM per AP.
4. **Bei Modellwechsel: Selbst-Identifikation verlangen** („Ich bin …") als Schritt 0 des Prompts — so ist der Wechsel (z. B. auf Opus/Fable) verifiziert.
5. **Jeder Rücklauf wird vom Steuerungsfaden gegen die reale Datei gegengeprüft**, bevor GRÜN bestätigt wird.
6. Normative Doku (`docs/spec/`, `docs/steering/design/`, `NAVIGATION.md`, `CLAUDE.md`): Änderung nur mit **spec-rewrite-guard**-Diff + Albert-OK.

## Stand: CI-Pool/Tailwind-Farbkette 15a–19 — ABGESCHLOSSEN & committed

| Ergebnis | Status |
|---|---|
| CI-Kontrakt, `tokens.css` = SSoT, `screen.css` migriert, Theme-Bridge + Durchleitung zur Chart-Engine | GRÜN, unabhängig belegt (AP-18) |
| Pilot `prokrastinations-preis`: **Farben** CI-konform (`--fw-color-*` → Kontrakt-`--color-*`, Petrol-Primary), Albert-abgenommen | GRÜN |
| Property-Zahl geklärt: `FwTheme.init()` liest **19** `--color-*` in **20** Tokens (`linesDark` abgeleitet) | erledigt (FOLLOWUP-B archiviert) |
| Doku-Falschaussagen (Kontrakt-Zahl, TC-N05, NAVIGATION, Spec) | korrigiert (AP-19), GRÜN |
| AP-17…19 Abschluss-Ritual + Commit | durch |

**Wichtig:** **Fonts sind NOCH NICHT CI-konform.** Der Pilot rendert auf Fallback-`sans-serif`; `--font-display` (Archivo Black) / `--font-body` (Source Sans Pro) liegen in `tokens.css`, sind aber nicht in die App gebrückt (in AP-17 Fork 5 bewusst vertagt).

## Fahrplan bis „Pilot-App fertig" (Alberts gestraffte Entscheidung 2026-07-10)

| # | Schritt | Modell | Abhängigkeit |
|---|---|---|---|
| 1 | **CI-Fonts in die App** — `AP-prokrast-17-FOLLOWUP-FONT` (`--fw-font-base` → `--font-body`) **gekoppelt mit** DS-FOLLOWUP-07 (Rubikon-Nachmessung S/M/L, Font-Wechsel verschiebt Textmetrik). **Prerequisite vor Tailwind** — Struktur auf finaler Typografie bauen, nicht auf Fallback. | Opus (Engine/Metrik) | — |
| 2 | **Tailwind (CDN) + App-Struktur/Design** — Tailwind per **CDN** einbinden (kein Build!), dann DS-014 **Design-API-Baukasten** (im Backlog „Blocker für alle App-Entwicklung") + AF-21/22/23 Familienstandards. Die App strukturell gestalten (Karten, Schatten, Linien, Rhythmus). **Konzept/Gestaltung zuerst = Fable** (Anamnese: welche Wirkung/Struktur — kein sofortiges CSS), **technische Integration = Opus**. | Fable → Opus | Schritt 1 |
| 3 | → Pilot „fertig". | — | 1+2 |

**Bewusst NICHT auf dem kritischen Pfad:** T1/CSS-6 (Tailwind-Produktions-Build) = **ganz zuletzt**, CDN reicht bis dahin. Ghost/Theme-Auslieferung (TMPL-1, TH-03…06) = **entfällt vorerst** — Arbeits-/Testfläche bleiben die einfachen HTML-Testseiten.

**Parallele Infrastruktur:** **TESTENV-1** (Backlog-Epic) — konsolidierte Testumgebung (Testverzeichnis, Pro-App-Harness + Launcher-Index + Harness-Template, Chart-Harness-Konsolidierung, versioniert-Kanon vs. Scratch). Löst zugleich F-3 (gitignoreter Abnahme-Harness) und AP-23 (Chart.js pinnen). Start: Inventar-/Anamnese-AP.

## Maßgebliche Wahrheitsquellen

1. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` — Rollen, Token-Namen, FINAL-Hexe, Nutzungsregeln.
2. `Theme/assets/css/tokens.css` — SSoT der Werte. `Theme/assets/css/screen.css` — Ghost-Stylesheet, `@import tokens.css` (2 Rest-Hexe `#f9fafb`/`#f3f4f6` → T1).
3. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (KDR 9/14), `docs/spec/Der Rucksack (Context Object Pattern).md` — bindend.
4. `Apps/prokrastinations-preis/` — Pilot: `app.css`/`app.js`/`app.test.html`/`QA_TEST_CASES.md` (Gruppe N = CI-Farbtoken).
5. `docs/steering/BACKLOG.md` — offene Punkte (u. a. DS-012/013/014, AF-21/22/23, T1/CSS-6, TESTENV-1, AP-prokrast-17-FOLLOWUP-FONT, AP-prokrast-17b-QA).

## Nächster erster AP im neuen Faden

**Anamnese/Konzept-Start, kein sofortiger Code.** Empfehlung: Schritt 1 (CI-Fonts) als erste Kette schneiden — beginnend mit einer kurzen Anamnese (welche `@font-face`-Einbindung nutzt der Test-Harness, welche Rubikon-Positionen hängen an der Metrik), dann Font-Migration + Nachmessung. Parallel kann die Design-Anamnese (Fable) für Schritt 2 vorbereitet werden.
