# Übergabekapsel Steuerungsfaden — CI-Pool/Tailwind-Kette (AP-prokrast-15a bis 16c)

Stand: 2026-07-09 | Erstellt von: Claude (Fable, Steuerungsfaden) | Für: frischen Steuerungsfaden (Opus reicht)

## Zweck und Nutzung

Diese Kapsel ersetzt die Historie des bisherigen Steuerungsfadens. Neuer Faden: Projektordner verbinden, diese Kapsel als Erstkontext geben, zusätzlich Alberts `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` (gilt für das steuernde LLM, NICHT an Claude Code weitergeben). Nichts aus der alten Historie wird benötigt — alles Entschiedene liegt versioniert in den unten gelisteten Dateien.

## Rollenteilung (bewährt, beibehalten)

- **Steuerndes LLM (Desktop/Cowork):** Anamnese, AP-Schnitt, Startprompts bauen, Rückläufe gegen die reale Datei prüfen (nie nur gegen das Protokoll), GRÜN/GELB/ROT-Urteil. Vor jedem neuen AP-Prompt: erst knapp ankündigen, Alberts OK abwarten, dann Prompt-Datei erzeugen. Modell: **Opus** (Fable nur bei offener Gestaltungsarbeit, z. B. Komponentenbaukasten, Dark Mode).
- **Ausführendes LLM (Claude Code, VSCode):** ein AP = ein frischer Faden mit selbsttragendem Startprompt. Modell nach AP-Typ: **Opus** für Engine-berührende Write-APs und den Review; **Sonnet** für mechanische/Doku-APs mit engem Prompt; Haiku nur Vorsortierung; Python für alles Deterministische.
- **Albert:** Masterentscheidungen, visuelle Abnahmen, Live-Server-Tests, Commits.

## Kettenstand (alles GRÜN und von Albert abgenommen)

| AP | Inhalt | Protokoll (docs/steering/patches/) |
|---|---|---|
| 15a | Inventar/Renderfluss/Namensanalyse (read-only) | `AP-prokrast-15a_tailwind-ci-pool-inventar-...Ergebnis.md` |
| — | Rücklaufkapsel: 11 Masterentscheidungen, VOLLENTSCHIEDEN (+ Erratum) | `AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` **(kanonischer Name — nicht umbenennen, wird referenziert)** |
| 15b | Rollen-/Benennungskontrakt geschrieben | `AP-prokrast-15b_ci-pool-rollenkontrakt_Ergebnis.md` |
| 15c | Farbleitern generiert, Board visuell abgenommen, Pin 600 bestätigt, Hexwerte FINAL | `AP-prokrast-15c_farbleiter-generierung_Ergebnis.md` (+ Board/Generator ebd.) |
| 16 | tokens.css + screen.css-Migration + FwTheme-Bridge + 2 Plugin-Fixes; Kontrakt §8 FINAL | `AP-prokrast-16_theme-migration_Ergebnis.md` |
| 16b | Plugin-Konsolidierung (KDR 14.2), Kaskaden-Harness, Testdaten-Refresh 6 Dateien (+Minifix: negative Balken, Mehr-Segment) | `AP-prokrast-16b_bridge-konsolidierung-kaskaden-harness_Ergebnis.md` |
| 16c | Theme-Durchleitung: Constructor Injection mit Graceful Default, 3/3 Strategien, Composition Root = ChartEngine, Null-Delta belegt, beide Harness-Indikatoren LIVE | `AP-prokrast-16c_theme-durchleitung_Ergebnis.md` |

## Maßgebliche Wahrheitsquellen (in dieser Rangfolge)

1. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` — der Vertrag (Rollen, Namensräume, Skalen mit FINAL-Hexwerten, Nutzungsregeln, Konsumenten-Regel, Migrationskette)
2. `docs/steering/patches/AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` — die 11 Masterentscheidungen inkl. Problemliste P1–P20
3. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (bes. KDR 9/14) und `docs/spec/Der Rucksack (Context Object Pattern).md` — bindend; Verstoß = ROT
4. Live-Testinstrument: `Theme/chart-tests/AP-16-abnahme.html` (zwei Indikatoren: Kaskade + Chart-Bridge, müssen LIVE zeigen)

Kernentscheidungen in einem Satz: Petrol = Primary (Pin 600), Blau = Link (keine Ramp, Data-Viz frei), Purpur = Visited/negativer Balken/redaktionelles Achtung (Pin 900), Gelb Pin 500, volle Tailwind-Skalen 50–900 (Strategie B, restauriert, FINAL), Error-Set = zentralisiertes Pilot-Rot, Success/Warning nur per Bedarfsregel, `--fw-*` nur App-Mechanik, Exklusivitätsregel „in der Skala oder raus", eine Bridge (`FwTheme.init()`), Struktur (Spacing/Schatten/Radius) = Tailwind-Defaults.

## Offene Punkte (Reihenfolge = Empfehlung)

1. **Commit-Entscheidung Gesamtkette** — liegt bei Albert; seit 15a ist alles unkommittiert (tokens.css, screen.css, Engine-Dateien, Kontrakt, Protokolle). Vor AP-17 committen empfohlen (sauberer Rollback-Punkt).
2. **KDR-14-Wortlaut-Nachführung** (Mini-AP, Sonnet-tauglich): Spec sagt noch „screen.css :root" + alte Token-Namen und kennt die Strategien-Durchleitung nicht. Chirurgisch: nur KDR 14.2/14.3-Wortlaut + Theme-Zeile der Datei-Matrix, Diff-Ausweis nach Spec-Rewrite-Guard. **Formale Freigabe durch Albert steht noch aus.**
3. **AP-prokrast-17 — Pilot-Migration** `prokrastinations-preis` (Opus): `--fw-color-*`/`--fw-font-*`/`--fw-space-*` raus, Mapping auf Kontrakt-Tokens; Gates: prüfen, ob Tailwind im App-Laufzeitkontext verfügbar ist (Pilot ist heute Vanilla-CSS ohne Tailwind — sonst Token-Vars statt Utilities); `--fw-*`-Mechanik-Tokens bleiben; danach `QA_TEST_CASES.md` komplett + `app.test.html`-Abnahme durch Albert.
4. **AP-prokrast-18 — Claims-vs-Files-Review** der Gesamtkette in frischer Instanz (Opus, kein Selbstzertifikat).
5. Ruhend: T1 im BACKLOG (Produktions-Aufräumtask, Dep CSS-6) · Ghost-Staging/Browser-Stichprobe (erst mit Theme-Build, s. TH-03/CSS-7) · FwLayoutRules nicht anschließen (16c-Empfehlung) · Font-Bridge `FwChartTextPlugin` nur mit Rubikon-Nachmessung · Standalone-Demos bewusst divergent bis T1 · Chronik-Datei aus 16b-Randnotiz noch unidentifiziert (ggf. ins Archiv-Bündel `Archiv/Peer Review Arbeitspakete/2026-07_ruecklaufkapsel-F1-F11_llm-vergleich/`).

## Startprompt-Bauplan (bewährtes Muster der Kette, für neue APs wiederverwenden)

Pflichtblöcke: Rolle (keine Designentscheidungen; Abweichung → GELB statt raten) · Kettenposition (Vorgänger, nächster Schritt je Status, „ausdrücklich NICHT dieser AP") · Harte Gates (Dateien existieren; Namensabweichung: Identität per Inhalts-Marker prüfen → identisch = weiter mit GELB-Vermerk, sonst ROT) · Bindende Specs + Tabu/Protected-Paths · Arbeitsauftrag in fester Reihenfolge (Anamnese vor Änderung) · Erlaubter Schreib-Scope (abschließende Dateiliste) · Werkzeugregeln (Python prüft/`python` nicht `python3`/utf-8, Haiku sortiert vor, LLM entscheidet; kleiner Suchradius) · Vorprüfung (git status/diff, kein Commit) · Nachweis-QA vor GRÜN (Marker-QA, Altlasten-QA, Scope-QA, Wiederlesen der realen Datei; bei Code: node --check, Null-Delta wo zutreffend) · Statuslogik (GRÜN = „bereit für Alberts Test", nie „getestet") · Ergebnisprotokoll-Struktur · knappe Chat-Ausgabe · „Kein Commit. Kein Abschlussritual. Weiter nur nach Nutzer-OK."

## Token-Sparregeln (Beschluss vom 2026-07-09)

Frischer Faden pro AP (Startprompts sind selbsttragend) · Steuerung knapp: Status, Befund, nächster Schritt · Rücklauf-Review per gezieltem Grep gegen reale Dateien, kein Volltext-Nachlesen · Protokolle mit Tabellen statt Prosa, Pfade referenzieren statt Inhalte zitieren · Modell-Faustregel oben · lange Entscheidungsvorlagen nur auf ausdrückliche Anforderung (Entscheidungsphase ist abgeschlossen).
