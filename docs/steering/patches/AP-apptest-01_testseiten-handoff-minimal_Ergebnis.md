Stand: 2026-07-11 | Session: AP-apptest-01 | Geändert von: Claude

# AP-apptest-01 — Testseiten-Handoff minimal verankern

## Ausgangslücke

Die reale Testumgebung (`docs/testing/TEST_PAGE_STANDARD.md`, Template, Checker) ist vollständig
gebaut und GRÜN (16 Testseiten). Der Handoff zu den App-Bau-Skills war jedoch lückenhaft:

1. `TEST_PAGE_STANDARD.md` §14 („Verbindliche Anweisung an bauende LLMs") nannte den
   Strukturchecker, aber nirgends `--write-index` oder ein explizites Verbot der Handpflege
   von `tests/index.html`. §13 beschreibt das Konzept „automatisch erzeugt", aber nicht als
   Pflicht-Handlungsanweisung.
2. `.claude/skills/tech-spec-app/SKILL.md` enthielt **keinen einzigen Verweis** auf
   `TEST_PAGE_STANDARD.md`, das Template oder `test-data/` (Grep: 0 Treffer) — nur ein Verbot
   („Nie tun: … app.test.html … erzeugen"), aber keinen positiven Handoff „wohin dann".
3. `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md` enthielt ebenfalls 0 Treffer für dieselben
   Begriffe — Phase 5 (Umsetzung) nannte `app.test.html` nur als Artefaktnamen ohne
   Template-/Checker-/Launcher-Bezug.
4. `.claude/skills/manual-test-plan/SKILL.md` referenzierte tote Pfade: `Theme/chart-tests/`
   und `Theme/data/` existieren seit der TESTENV-1eB-Migration nicht mehr (verifiziert:
   beide Ordner nicht mehr vorhanden; Nachfolger `tests/engine/` und `tests/fixtures/engine/`).

## Geänderte Dateien

1. `docs/testing/TEST_PAGE_STANDARD.md` — §14 um zwei Pflichtpunkte ergänzt
   (`--write-index` nach grünem Check, explizites Verbot der Handpflege von
   `tests/index.html`); Stand-Header/Standard-Version 2→3 nach bestehender
   Eigenkonvention der Datei mitgezogen.
2. `.claude/skills/tech-spec-app/SKILL.md` — nach Abschnitt 16 „Testfälle" ein
   Handoff-Hinweis (4 Sätze): Testfälle sind Grundlage für `app.test.html`, deren Bau folgt
   ausschließlich `TEST_PAGE_STANDARD.md`, `tech-spec-app` baut selbst keine Testseite,
   `QA_TEST_CASES.md` nur bei realer Komplexität.
3. `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md` — neuer Unterpunkt `5.1b` (Muster wie
   bestehendes `2.3b`) in Phase 5 mit Template, Zielpfad, Checker, Launcher, Browserprüfung.
4. `.claude/skills/manual-test-plan/SKILL.md` — „Primärer Testfall"-Block auf reale Pfade
   korrigiert (App vs. Engine getrennt, `tests/fixtures/engine/` statt totem `Theme/data/`).

**Bewusst nicht geändert:** `.claude/skills/app-spec-create/SKILL.md`. Der Spec-Gate-Check
„18 technische Pflichtabschnitte aus tech-spec-app vorhanden?" deckt Testfälle (Abschnitt 16)
bereits implizit ab — ein expliziter Zusatzpunkt wäre Duplikat, kein neuer Inhalt.

## Warum keine neue Standarddatei

Alle neun im Auftrag gestellten Fragen ließen sich nach Lesen der bestehenden Quellen
eindeutig beantworten oder durch eine kleine, chirurgische Ergänzung an genau der Stelle
schließen, an der die Lücke real bestand. Kein Konzept fehlte — nur die Verknüpfung zwischen
den bestehenden Dokumenten war unvollständig. Eine neue Datei, ein Manifest oder ein
Capability-System hätten eine bereits bestehende, funktionierende Struktur dupliziert.

## Prüfungen

- `git status --short` vor Beginn: nur `.claude/learning/session-log.md` (eigener
  Session-Start-Eintrag) unstaged — kein Fremdstand berührt.
- `.claude/PROTECTED_PATHS.json` geprüft: keine der 4 Zieldateien dort gelistet.
- `git diff --name-status`: exakt die 4 geplanten Dateien geändert, keine weiteren.
- `git diff --check`: keine Whitespace-Fehler (nur harmlose CRLF/LF-Autocrlf-Hinweise).
- Alle 4 geänderten Dateien vollständig neu gelesen: keine doppelte globale Regel, keine
  Anleitung zur Handpflege von `tests/index.html`, keine alten Defaultpfade mehr in
  `manual-test-plan`, `app-spec-create` unverändert dünn, `tech-spec-app` definiert
  weiterhin nur Testfälle ohne selbst eine Testseite zu bauen, der App-Bau-Workflow nennt
  jetzt Template, Zielpfad, Checker, Launcher und Browserprüfung.
- `python tools/check-test-pages.py` (read-only) nach der `TEST_PAGE_STANDARD.md`-Änderung:
  `TESTSEITEN-STRUKTUR: GRUEN`, 16 geprüfte Testseiten, 0 Strukturfehler.
- `--write-index` bewusst nicht ausgeführt: keine realen Testseiten in diesem AP geändert,
  Launcher-Inhalt bliebe ohnehin identisch (`tests/index.html` wird nur bei abweichendem
  Inhalt neu geschrieben).

## Scope

Nur Dokumentation/Skills geändert. Kein Produktionscode, kein Test-HTML, kein Checker-Code,
keine `Apps/**`-Datei berührt. Kein Commit in diesem AP — Commit-Freigabe liegt bei Albert.

## Verbleibende echte offene Punkte

- Keine neuen Lücken entdeckt, die über den Auftragsscope hinausgehen.
- Bestehende, unabhängig davon offene Backlog-Punkte (DS-FOLLOWUP-07,
  TESTENV-1-FOLLOWUP-BORDER, App-Pool-Rollout Font-Bridge) sind durch diesen AP nicht
  berührt und bleiben unverändert offen.
