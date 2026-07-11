Stand: 2026-07-11 | Session: AP-apptest-02 | Geändert von: Claude

# AP-apptest-02 — Unabhängige Claims-vs-Files-QA

## Status
GRÜN

## Geprüfter realer Diff

`git diff --name-status` zeigt genau 4 geänderte Dateien, deckungsgleich mit dem behaupteten
Umfang von AP-apptest-01:

```
M	.claude/skills/manual-test-plan/SKILL.md
M	.claude/skills/tech-spec-app/SKILL.md
M	docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md
M	docs/testing/TEST_PAGE_STANDARD.md
```

`git status --short` zeigt zusätzlich:
- `M .claude/learning/session-log.md` — Fremd-/Sessionänderung (eigener Session-Start-Eintrag),
  nicht dem AP zugerechnet, nicht angefasst.
- `?? docs/steering/patches/AP-apptest-01_testseiten-handoff-minimal_Ergebnis.md` — das
  Ergebnisprotokoll des geprüften AP selbst, korrekt neu, kein Fund.

`git diff --check` liefert keine Whitespace-Fehler (nur harmlose CRLF/LF-Autocrlf-Hinweise
von Git, keine echten Befunde).

Vollständiger Diff aller 4 Dateien gelesen (siehe Abschnitt Claims-vs-Files) — Umfang pro
Datei liegt zwischen 3 und 9 geänderten/neuen Zeilen, ausschließlich Ergänzungen und
Pfadkorrekturen, keine Strukturumbauten.

## Claims-vs-Files

- **TEST_PAGE_STANDARD**: Bestätigt. §14 enthält jetzt alle 9 geforderten Punkte wörtlich:
  Template-Pfad, Zielpfad `Apps/{slug}/app.test.html`, echte `.fw-app`-Card, sichtbare
  Erwartungsblöcke, `test-data/`-Pfad, `python tools/check-test-pages.py`, zusätzlich neu
  `python tools/check-test-pages.py --write-index` nach grünem Check, explizites Verbot
  „tests/index.html niemals manuell bearbeiten — es entsteht ausschließlich durch
  --write-index (§13)", und die Browserprüfung-Pflicht am Ende. Keine widersprüchliche
  zweite Regel gefunden (Rest des Dokuments, insbesondere §13, bleibt konsistent). Stand-
  Header korrekt auf Standard-Version 3 mitgezogen. Keine neue Architektur (kein Manifest,
  kein Capability-System) hinzugefügt.
- **tech-spec-app**: Bestätigt. Neuer Hinweis nach Abschnitt 16 „Testfälle" sagt knapp: die
  Testfälle sind Grundlage für `app.test.html`, deren Bau folgt ausschließlich
  `TEST_PAGE_STANDARD.md`, `tech-spec-app` erzeugt selbst keine `app.test.html` (Verweis auf
  bestehendes „Nie tun"), `QA_TEST_CASES.md` nur bei realer Komplexität. Vereinbar mit dem
  bestehenden Implementierungsverbot — keine Code-Anleitung, keine globale Testprozedur in
  die APP_SPEC kopiert, reiner Verweis.
- **App-Bau-Workflow** (`04_CLAUDE_WORKFLOW_DRAFT.md`): Bestätigt. Neuer Unterpunkt `5.1b`
  in Phase 5 (Umsetzung — dort wo tatsächlich Code entsteht) verlangt: `app.test.html`
  gleichzeitig mit `app.js`/`app.css` pflegen, kanonisches Template, korrekten Zielpfad
  (implizit über Template-Pfad und Standard-Referenz), Strukturchecker, Launcher mit
  `--write-index`, Browserprüfung (Verweis auf Phase 7). Stelle ist fachlich richtig (Phase 5
  = Umsetzung, nicht Planung) und widerspricht keiner bestehenden Phase — Phase 4.1 nennt
  `app.test.html` weiterhin nur als Slice-0-Artefaktname, Phase 7 bleibt für die inhaltliche
  Testplan-Checkliste zuständig; keine Doppelregelung.
- **manual-test-plan**: Bestätigt. „Primärer Testfall"-Block verweist jetzt auf
  `Apps/{slug}/app.test.html` (App) bzw. `tests/engine/[datei].test.html` (Engine) sowie
  `Apps/{slug}/test-data/` bzw. `tests/fixtures/engine/` — beide Pfade real existent
  (verifiziert). Keine operative Anweisung mehr auf `Theme/chart-tests/` oder `Theme/data/`
  (Grep: 0 Treffer, exit 1). Rest des Skills unverändert — keine unnötige Neufassung.
- **app-spec-create bewusst unverändert**: Bestätigt vertretbar. Datei real ungeändert
  (nicht im Diff). Phase-3-Spec-Gate-Check „18 technische Pflichtabschnitte aus
  `tech-spec-app` vorhanden?" bleibt unverändert bestehen und deckt Abschnitt 16
  „Testfälle" bereits ab — ein zusätzlicher expliziter Testpunkt in `app-spec-create` wäre
  ein Duplikat ohne neuen Inhalt. Alle drei Teilaussagen der Begründung (dünner Koordinator,
  bestehendes 18-Abschnitte-Gate, Abschnitt 16 bereits erfasst) treffen real zu.

## Deterministische Prüfungen

- `python tools/check-test-pages.py`: `TESTSEITEN-STRUKTUR: GRUEN`, 16 geprüfte Testseiten,
  0 Strukturfehler.
- `grep -RIn --exclude-dir=.git -e "Theme/chart-tests" -e "Theme/data" .claude/skills/manual-test-plan docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md`:
  0 Treffer (Exit-Code 1) — keine aktive Anweisung auf tote Pfade mehr in beiden Dateien.

## Scope-Prüfung

- `tests/index.html`: unverändert (nicht im Diff, kein `--write-index`-Lauf in diesem AP).
- `.claude/skills/app-spec-create/SKILL.md`: unverändert (nicht im Diff, real gegengelesen).
- `Apps/**`, `tools/check-test-pages.py`, `docs/testing/templates/app.test.template.html`:
  unverändert (nicht im Diff).
- Kein Produktionscode geändert — ausschließlich `.md`-Dokumentation/Skills.
- Realer Scope deckt sich exakt mit dem behaupteten Scope aus dem AP-apptest-01-
  Ergebnisprotokoll.

## Funde

Keine.

## Entscheidung
Abschlussritual freigegeben: ja
