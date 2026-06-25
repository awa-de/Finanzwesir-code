# AP-00 Ergebnis — Steuerungsblock Einstiegspunkt-Anamnese

Stand: 2026-06-25 | Session: AP-00 | Geändert von: Claude

---

## Auftrag

Einstiegspunkt-Anamnese für standardisierten LLM-Steuerungsblock (80%-Nordstern) in App-Specs.
Ziel: klären, wo Verhaltensregel, Routing-Hinweis, Skills und lokale Spec-Blöcke verankert werden sollen.
Keine Umsetzung. Nur Befund.

---

## Geänderte Dateien

- NEU: `docs/steering/patches/AP-00_steuerungsblock-einstiegspunkt-anamnese_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`: ` M .claude/learning/session-log.md`
- Erwartete Änderungen: `.claude/learning/session-log.md` (WARM-START AP-Wechsel-Eintrag)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — WARM-START-Protokoll)
- Befund: GRÜN — kein Konfliktrisiko, kein unbekannter Zustand

---

### Autoritäten-Gate

- `CLAUDE.md` gefunden: ja
- Rolle laut Datei: „Verfassung: Verhalten, Grenzen, Invarianten, Gates. Kein Routing."
- `NAVIGATION.md` gefunden: ja
- Rolle laut Datei: „**Routing-Dokument.** Gibt Pfade und Lese-Reihenfolgen vor — KEINE Verhaltensregeln (die stehen in CLAUDE.md)."
- Trennung Verhalten/Routing bestätigt: ja — beide Dateien dokumentieren ihre Rolle explizit und abgegrenzt; die Autoritäts-Tabelle in beiden Dateien ist konsistent
- Befund: GRÜN — Trennung ist klar, stabil, gegenseitig bestätigt. Verhaltensregel gehört in CLAUDE.md, Routing-Hinweis in NAVIGATION.md.

---

### App-Arbeitskette

- Route „App bauen / ändern" gefunden: ja — NAVIGATION.md § „App bauen / ändern"
- Gelesene Dateien laut Route (Reihenfolge):
  1. `docs/spec/APP-INTERFACE.md` (Pflicht)
  2. `docs/steering/audits/SECURITY-BASELINE.md` (Pflicht)
  3. `docs/steering/design/CSS-KONVENTIONEN.md`
  4. `docs/design-system/`
  5. `docs/App-Fabrik/APP_INVENTORY.md`
  6. `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md`
  7. `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md`
  8. `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md`
  9. `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md`
  10. `Apps/[App-Name]/` + `SLICE_PLAN.md`
  11. (datengetrieben) `docs/data/...`
  12. (mit Chart) Chart-Engine-Spec + `WORKING-FEATURES.md`
  - **Keine explizite Stelle, an der die lokale APP_SPEC.md auf ihren Steuerungsblock geprüft wird.**

- Beteiligte Skills (aus NAVIGATION.md Tabelle + 04_CLAUDE_WORKFLOW_DRAFT.md):

  | Skill | Status | Wann |
  |---|---|---|
  | `/heldenreise` | vorhanden, SKILL.md gelesen | Pflicht bei App-Fabrik-Apps; nur manuell (Albert) |
  | `/tech-spec-app {slug}` | vorhanden, SKILL.md gelesen | Pflicht bei App-Fabrik-Apps |
  | `/app-spec-create {slug}` | **ACHTUNG: Verzeichnis existiert, SKILL.md fehlt** | soll tech-spec-app + heldenreise bündeln |
  | `spec-mode-architecture` | vorhanden (Verzeichnis bestätigt) | Phase 2 laut 04_CLAUDE_WORKFLOW_DRAFT.md — aber **nicht in NAVIGATION.md-Skill-Tabelle** |
  | `01-process-extreme-ownership` | vorhanden | Phase 1 Briefing-Check |
  | `impl-mode-workpackages` | vorhanden | Phase 4 Arbeitspakete |
  | `code-quality-faang-review` | vorhanden | Phase 6 Review-Gate |
  | `/pre-code-gate full` | vorhanden | Pflicht vor App-Code (keine Ausnahme) |
  | `/patch-quittung` | vorhanden | nach jedem Patch |
  | `/abschluss-ritual` | vorhanden | Abschluss |

- Beteiligte Hooks:
  - `PreToolUse (Write|Edit)`: `check-protected-paths.ps1` — schützt Tabu-Zonen vor Schreibzugriff
  - `SessionStart`: `session-start.ps1` — liefert HOOK-META aus PROJECT-STATUS.md (Fokus-AP, Blocker, Log-Zählung, Kassensturz-Datum, Wochentag)
  - **Kein Hook, der beim Start von App-Arbeit spezifisch auf Steuerungsblock hinweist.**

- Pre-Code-Gates: Light-Gate (1 Datei, kein Tabu) + Full-Gate (IMMER bei App-Arbeit — keine Ausnahme laut CLAUDE.md)

- Befund: GELB
  - App-Arbeitskette ist vollständig und konsistent dokumentiert.
  - Drei Drift-Stellen identifiziert:
    1. `app-spec-create/SKILL.md` fehlt — Skill in NAVIGATION.md referenziert, Verzeichnis vorhanden, Datei nicht auffindbar.
    2. `spec-mode-architecture` in 04_CLAUDE_WORKFLOW_DRAFT.md Phase 2 benannt, aber nicht in NAVIGATION.md-Skill-Tabelle.
    3. Kein einziger Punkt in der Route liest APP_SPEC.md gezielt auf Steuerungsblock und signalisiert: „80%-Nordstern prüfen bevor Arbeit startet."

---

### Stichprobe lokale Specs

- `prokrastinations-preis` Zweck/Barriere vorhanden: **ja, implizit**
  - §2 enthält Nutzerfrage, Leitformulierung, Kernaussage, Nicht-Ziele
  - Barriere erkennbar: „Der Zug ist doch abgefahren" → Prokrastinations-Preise-Mechanismus
  - ABER: nicht als benannter, operationaler LLM-Steuerungsblock formuliert (kein Label, kein „falscher Glaubenssatz vorher", kein „Zielzustand nachher", kein Prüfscore)

- `prokrastinations-preis` operationaler Steuerungsblock vorhanden: **nein**
  - Die Felder existieren thematisch, aber als Prosa verteilt über §2–§3, nicht als strukturierter Block mit definierter Semantik für Claude

- `etf-vergleich` Zweck/Barriere vorhanden: **ja, implizit in MINI_SPEC**
  - Barriere explizit: „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss."
  - Modullrolle klar: Funnel-Master-App / ETF-Perfektionismus-Entgifter
  - ABER: ebenfalls kein strukturierter LLM-Steuerungsblock, kein Prüfscore

- `plan-generator` Zweck/Barriere: **Zweck klar, Barriere nicht explizit**
  - H1 Plan-Generator, CTA-Abschluss der Heldenreise — aber keine psychologische Barriere explizit benannt

- Einheitliches Format vorhanden: **nein**
  - Drei geprüfte Apps, drei verschiedene Formulierungsmuster, keine gemeinsame Struktur

- Befund: GELB
  - Inhalt ist teilweise vorhanden (implizit in Prosa), aber nicht operational für Claude als LLM-Steuerungsblock.
  - Format fehlt vollständig.

---

## Fehlerflächenkarte

### Globale Regelstelle

- Empfohlene Datei: **`CLAUDE.md`**
- Begründung: CLAUDE.md ist die Verfassung — Verhalten, Gates, Entscheidungsregeln. Die Verhaltensregel „Steuerungsblock kritisch prüfen, nicht blind ausführen" gehört ausschließlich hierher. Die NAVIGATION.md ist ausdrücklich nur Router (keine Verhaltensregel).
- Einbaustelle in CLAUDE.md: Abschnitt „Eingangs-Routing > APP-ARBEIT" — dort, wo Claude bereits Pflichtschritte für App-Arbeit beschreibt. Der 80%-Wächter ist ein Verhaltensprinzip, kein Routing-Hinweis.
- Änderungstyp für AP-01: Ergänzung von 3–6 Zeilen im APP-ARBEIT-Block von CLAUDE.md. Kein Vollrewrite. Regel: „Wenn App-Arbeit: lokalen Steuerungsblock lesen, kritisch prüfen (5 Fragen), Diskussion mit Albert wenn Qualität < 80%."

---

### Routing-Stelle

- Empfohlene Datei: **`NAVIGATION.md`** — Abschnitt § „App bauen / ändern"
- Begründung: Die Route liest aktuell bis zu 12 Dateien, aber keine liest APP_SPEC.md gezielt auf den Steuerungsblock. Ein Routing-Hinweis (kein Verhaltensgebot!) macht Claude auf die Pflichtlektüre aufmerksam.
- Einbaustelle: Zwischen Schritt 10 (`Apps/[App-Name]/`) und eventuellem Schritt 11 (`SLICE_PLAN.md`) ein Hinweis: „[App-Name]/APP_SPEC.md → § Steuerungsblock lesen (Pflicht vor App-Arbeit, → CLAUDE.md § APP-ARBEIT)."
- Wichtig: NAVIGATION.md darf nur zeigen WO — die Verhaltensregel WIE bleibt in CLAUDE.md.
- Änderungstyp für AP-02: 1–2 Zeilen Ergänzung in der Routing-Liste. Kein Vollrewrite.

---

### Skill-Stellen

- Betroffene Skills:

  | Skill | Änderungsbedarf | Priorität |
  |---|---|---|
  | `heldenreise/SKILL.md` | Wächter-Prüfschritt ergänzen: bevor Beweisdramaturgie entworfen wird, Steuerungsblock kritisch prüfen | hoch (Pflicht-Skill bei App-Fabrik) |
  | `tech-spec-app/SKILL.md` | Steuerungsblock als Pflichtabschnitt in APP_SPEC.md-Struktur aufnehmen (nach Status, vor App-Familie) | hoch (Pflicht-Skill) |
  | `app-spec-create/SKILL.md` | **muss erst angelegt werden** — Verzeichnis vorhanden, Datei fehlt; dann Steuerungsblock-Wächter integrieren | kritisch (Drift-Stelle) |
  | `spec-mode-architecture/SKILL.md` | Steuerungsblock-Prüfung in Phase 2 Pflichtschritte aufnehmen; Skill in NAVIGATION.md-Tabelle nachtragen | mittel |
  | `04_CLAUDE_WORKFLOW_DRAFT.md` | Phase 2 Pflichtschritt: „Steuerungsblock prüfen" ergänzen; spec-mode-architecture in Tabelle aufnehmen | mittel (kein Skill, aber Teil der Kette) |

- Begründung: Ohne Änderung in heldenreise und tech-spec-app kann Claude bei jeder neuen App blind den Steuerungsblock ausführen, auch wenn er 80%-Qualität unterschreitet.
- Änderungstyp: Kleinere chirurgische Ergänzungen pro Skill-Datei, kein Vollrewrite. Reihenfolge: erst AP-03 (Format klären), dann Skills.

---

### Lokale Spec-Stelle

- Empfohlene Position in APP_SPEC.md: **direkt nach § Status (§1), vor § App-Familie / Datenbedarf / UX-Detail**
  - Begründung: Der Steuerungsblock ist die Geschäftsentscheidung hinter der App. Er muss sichtbar sein, bevor technische Details beginnen. APP_SPEC.md §2 heißt aktuell „Zweck und Nutzerfrage" — der Steuerungsblock erweitert diesen Abschnitt oder ersetzt ihn durch eine strukturierte Variante.

- Behandlung von `APP_SPEC.md`:
  - Steuerungsblock als eigener § mit definierten Feldern (Format in AP-03 klären)
  - Felder: Zweck / Psychologische Barriere / Falscher Glaubenssatz vorher / Zielzustand nachher / Muss-Kriterien / Nicht-Ziele / LLM-Prüfscore
  - Position: §2 (nach Status, vor App-Familie)

- Behandlung von `MINI_SPEC_FROM_HAUPTDOKUMENT.md`:
  - Bei Apps ohne APP_SPEC.md: vereinfachter Steuerungsblock am Dokumentanfang (nach Metadaten, vor Trichter-Einordnung)
  - Mindestfelder: Zweck, Barriere, Nicht-Ziele
  - Status: „Vorläufig — vollständiger Block in APP_SPEC.md erwartet"

- Offene Sonderfälle:
  - Apps im Konzeptphase (nur MINI_SPEC, kein App-Ordner noch): Steuerungsblock in MINI_SPEC als Placeholder
  - Apps mit Legacy-Prosa (wie prokrastinations-preis): Migration des impliziten Inhalts in Struktur (AP-04/05 klären)

---

## Empfohlene Zielarchitektur

- Globaler 80%-Wächter: In `CLAUDE.md` § „Eingangs-Routing > APP-ARBEIT" als Verhaltensregel. Formulierung: Steuerungsblock lesen, 5 Prüffragen stellen, Diskussion mit Albert wenn Qualität < 80%.
- Lokaler Steuerungsblock: In jeder `APP_SPEC.md` als §2 (nach Status). In `MINI_SPEC_FROM_HAUPTDOKUMENT.md` als Vorläufer-Block.
- LLM-Prüfscore: Teil des lokalen Steuerungsblocks — operational, nicht qualitativ (z.B. Checkliste, nicht Note). Format in AP-03 klären.
- Diskussion vor Umsetzung: Claude prüft aktiv, fragt wenn unklar, wartet auf Alberts Entscheidung bei Qualitätslücke. Kein Blind-Ausführen.
- Stop bei unklarem Steuerungsblock: Wenn Steuerungsblock < 80% und kein Konsens mit Albert: stoppen, Lücke benennen, warten.

---

## Folge-APs

### AP-01

- Titel: Globaler 80%-Wächter in CLAUDE.md
- Ziel: Verhaltensregel „Steuerungsblock kritisch prüfen (5 Fragen), nicht blind ausführen" in CLAUDE.md § APP-ARBEIT einbauen. Claude soll bei jeder App-Arbeit den lokalen Steuerungsblock zuerst aktiv prüfen.
- Erlaubte Dateien: `CLAUDE.md` (chirurgische Ergänzung im APP-ARBEIT-Block, 3–6 Zeilen)
- Nicht-Ziele: kein Routing, keine Skill-Änderung, kein Steuerungsblock formulieren, keine NAVIGATION.md anfassen

### AP-02

- Titel: Routing-Hinweis in NAVIGATION.md
- Ziel: In der Route § „App bauen / ändern" einen Lese-Hinweis ergänzen: APP_SPEC.md → Steuerungsblock lesen (Verweis auf CLAUDE.md § APP-ARBEIT). Nur Routing — keine Verhaltensregel.
- Erlaubte Dateien: `NAVIGATION.md` (1–2 Zeilen in der Routing-Liste)
- Nicht-Ziele: keine Verhaltensregel in NAVIGATION.md, keine Skill-Änderung, keine CLAUDE.md anfassen

### AP-03

- Titel: Standardformat Steuerungsblock + Prüfscore
- Ziel: Format für den lokalen Steuerungsblock definieren — 7 Felder (Zweck, Barriere, Falscher Glaubenssatz, Zielzustand, Muss-Kriterien, Nicht-Ziele, Prüfscore) — und Format für LLM-Prüfscore operationalisieren. Ergebnis: Template-Datei oder Abschnitt in 03_APP_FACTORY_STANDARD_DRAFT.md.
- Erlaubte Dateien: neues `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` ODER Ergänzung in `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md`
- Nicht-Ziele: kein Einbau in App-Specs, keine CLAUDE.md, keine Skills noch

### AP-04

- Titel: Inventar Steuerungsblock über alle 25 Apps
- Ziel: Für alle 25 App-Ordner prüfen, ob und wie gut Zweck/Barriere/Nicht-Ziele vorhanden sind. Lücken-Karte erstellen. Klassifizierung: vorhanden-strukturiert / vorhanden-implizit / fehlt.
- Erlaubte Dateien: nur lesen (alle MINI_SPEC + vorhandene APP_SPEC); Ergebnisprotokoll neu anlegen in `docs/steering/patches/`
- Nicht-Ziele: kein Einbau, keine APP_SPEC ändern, kein Formulieren von Blöcken

### AP-05

- Titel: Zentrale 25er-Vorschlagsliste Steuerungsblöcke
- Ziel: Für jede App mit Lücke (aus AP-04) einen Vorschlag-Steuerungsblock formulieren — strukturiert nach AP-03-Format, 80%-Qualität angestrebt. Albert prüft, entscheidet, freigibt.
- Erlaubte Dateien: neues Protokoll in `docs/steering/patches/`; APP_SPEC und MINI_SPEC noch nicht ändern
- Nicht-Ziele: kein direkter Einbau, kein Commit — erst nach Alberts Freigabe pro App

---

### Weitere APs (aus Befund abgeleitet, nicht im ursprünglichen Scope)

### AP-06 (neu aus Befund)

- Titel: `app-spec-create/SKILL.md` anlegen / Drift beheben
- Ziel: Klären ob der Skill bewusst leer ist oder ob SKILL.md fehlt. Wenn fehlt: anlegen (bündelt tech-spec-app + heldenreise + Steuerungsblock-Wächter + Spec-Gate-Checkliste). Nebenbefund: `spec-mode-architecture` in NAVIGATION.md-Skill-Tabelle nachtragen.
- Erlaubte Dateien: `.claude/skills/app-spec-create/SKILL.md` (neu), ggf. `NAVIGATION.md` (+1 Zeile)
- Nicht-Ziele: keine anderen Skills ändern, kein Code

### AP-07 (nach AP-03)

- Titel: Skill-Update heldenreise + tech-spec-app
- Ziel: Steuerungsblock-Wächter-Prüfschritt in `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md` einbauen (nach AP-03-Format feststeht)
- Erlaubte Dateien: `.claude/skills/heldenreise/SKILL.md`, `.claude/skills/tech-spec-app/SKILL.md`
- Nicht-Ziele: kein Vollrewrite, kein Code, keine App-Specs

### AP-08 (nach AP-05)

- Titel: Einzel-Einbau Steuerungsblöcke pro App
- Ziel: Freigegebene Steuerungsblöcke (aus AP-05) in APP_SPEC.md / MINI_SPEC einbauen — eine App nach der anderen, mit Gate
- Erlaubte Dateien: je App: `Apps/{slug}/APP_SPEC.md` oder `Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- Nicht-Ziele: nicht alle 25 auf einmal; kein Code; keine Steuerungsdateien

---

## Status

- **GELB**

---

## Blocker

- nein — kein Blocker für die Befund-Phase selbst
- Hinweis: `app-spec-create/SKILL.md` fehlt (AP-06) — kein Blocker für AP-01 bis AP-05, aber muss vor produktiver Nutzung des Skills behoben werden

---

## Offene Punkte

1. `app-spec-create/SKILL.md` fehlt — Ursache unklar (bewusst leer? nie erstellt?). Vor AP-06 mit Albert klären.
2. `spec-mode-architecture` fehlt in NAVIGATION.md-Skill-Tabelle — gehört eingetragen (in AP-02 oder AP-06).
3. AP-03-Format: Soll der LLM-Prüfscore als Checkliste, als Scoring-Matrix oder als Freitext-Fragen operationalisiert werden? Albert entscheidet.
4. Reihenfolge AP-01 vs. AP-02: Beide können parallel bearbeitet werden (verschiedene Dateien, keine Abhängigkeit). AP-03 muss vor AP-07 (Skills).
5. APP_SPEC.md von `prokrastinations-preis` hat impliziten Inhalt, der migriert werden könnte — Zeitpunkt: frühestens nach AP-03-Format, kein eigenes AP nötig wenn Einbau in AP-08 enthalten.

---

## Bestätigungen

- Keine globale Regel eingebaut: **ja**
- Kein Routing geändert: **ja**
- Keine Skills geändert: **ja**
- Keine Hooks geändert: **ja**
- Keine App-Specs geändert: **ja**
- Keine Mini-Specs geändert: **ja**
- Keine Code-Dateien geändert: **ja**
- Keine Daten geändert: **ja**
- Kein Commit: **ja**
- Kein Abschlussritual: **ja**
