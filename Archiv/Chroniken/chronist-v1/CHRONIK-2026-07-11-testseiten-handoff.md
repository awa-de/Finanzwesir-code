---
chronik_id: CHRONIK-2026-07-11-testseiten-handoff
datum: 2026-07-11
projekt: finanzwesir-code
thema: testseiten-handoff
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, annahme-verworfen, vollstaendigkeit-vs-verdichtung, tooling-problem]
---

# Chronik: Vom umfassenden Testprozess zum minimalen Testseiten-Handoff

**Hauptgegenstand:** Der Faden klärte, wie die bestehende Testseiten-Infrastruktur der App-Fabrik mit den Skills `app-spec-create`, `tech-spec-app` und dem App-Bau-Workflow verbunden werden sollte. Aus einem zunächst umfassend angelegten Standardisierungsauftrag entstand ein begrenzter Handoff: Die APP_SPEC sollte app-spezifische Testfälle enthalten, während der Bau von `app.test.html` weiterhin durch den bestehenden Testseitenstandard geregelt wurde.

## Ausgangslage

Zu Beginn lag ein umfangreicher Claude-Prompt für `AP-apptest-01` vor. Dieser Prompt sollte den App-Testprozess repo-weit ordnen, die Rollen von `APP_SPEC.md`, `QA_TEST_CASES.md` und `app.test.html` definieren sowie mehrere Standards und Skills synchronisieren. Der Nutzer widersprach dem Ansatz, den gesamten Testprozess in jede `APP_SPEC.md` aufzunehmen. Er bat darum, stattdessen die Skills `app-spec-create` und `tech-spec-app` zu prüfen und den Bedarf auf das zu reduzieren, was ein App-Baumeister tatsächlich wissen musste.

Als gewünschter Kern wurden genannt: das zu verwendende Template, dessen Ablageort, der Einbau des App-Codes über eine HTML-Card, der Ort von `app.test.html` sowie die Aufnahme der Testseite in `tests/index.html`. Zugleich verlangte der Nutzer eine erneute Prüfung des Prompts anhand von Advocatus Diaboli, Ockhams Rasiermesser, Via Negativa und Charlie Mungers Inversion.

## Chronologischer Verlauf

### Prüfung der bestehenden Skills und Standards

`app-spec-create` wurde als koordinierender Skill gelesen. Er führte den Steuerungsblock, `tech-spec-app`, `heldenreise` und das Spec-Gate zusammen. Seine bestehende Rolle war die eines dünnen Koordinators; eine Bauanleitung für Testseiten war dort nicht vorgesehen.

`tech-spec-app` wurde als Ort für die technische Grundlage der `APP_SPEC.md` gelesen. Der Skill verlangte bereits einen Abschnitt „Testfälle“, definierte Ghost-Card-Vertrag, A11y, State-Modell und Sicherheitsregeln und untersagte zugleich das Erzeugen von `app.test.html` in der Spec-Phase. Daraus wurde die Trennung abgeleitet: Die APP_SPEC beschreibt, was app-spezifisch zu testen ist; der spätere Bau der Testseite folgt einem globalen Standard.

Parallel wurde `docs/testing/TEST_PAGE_STANDARD.md` geprüft. Dort war bereits festgelegt, dass App-Testseiten unter `Apps/{slug}/app.test.html` liegen, aus `docs/testing/templates/app.test.template.html` entstehen und echte `.fw-app`-Cards verwenden. Der Standard verlangte sichtbare Erwartungsblöcke, app-spezifische Testdaten unter `Apps/{slug}/test-data/`, Shared CSS/JS, einen Strukturcheck und eine anschließende manuelle Browserprüfung.

### Korrektur der Annahme zu `tests/index.html`

Die anfängliche Formulierung des Nutzers ließ offen, ob der App-Baumeister die Testseite manuell in `tests/index.html` einbauen sollte. Die Prüfung des Checkers zeigte, dass dies nicht vorgesehen war. `tests/index.html` wurde automatisch aus den real gefundenen Testseiten erzeugt. Der relevante Befehl lautete:

`python tools/check-test-pages.py --write-index`

Damit änderte sich der Handoff: Der Baumeister sollte nicht den Launcher bearbeiten, sondern die Testseite korrekt anlegen und danach den Launcher generieren lassen.

### Verwerfung des umfassenden Prompts

Der erste Prompt wurde unter den vier Prüflinsen neu bewertet. Advocatus Diaboli stellte die Notwendigkeit einer zusätzlichen Standarddatei infrage. Ockhams Rasiermesser reduzierte den Bedarf auf wenige Verweise und Pflichten. Via Negativa entfernte neue Frameworks, Manifest- oder Capability-Systeme, pauschale `QA_TEST_CASES.md`-Pflichten und mehrstufige Review-Ketten. Die Inversion fragte, wie ein App-Baumeister trotz bestehender Infrastruktur scheitern könnte: durch ein falsches Template, einen falschen Ablageort, eine unechte Card, fehlende Erwartungsblöcke, einen ausgelassenen Checker, manuelle Launcher-Pflege oder die Gleichsetzung eines grünen Strukturchecks mit einer funktionierenden App.

Daraufhin wurde ein neuer, kürzerer Prompt erzeugt:

`claude_prompt_AP-apptest-01_testseiten-handoff-minimal.md`

Er begrenzte den Auftrag auf chirurgische Änderungen an `TEST_PAGE_STANDARD.md`, `tech-spec-app`, dem App-Bau-Workflow und `manual-test-plan`. `app-spec-create` sollte nur geändert werden, falls sein bestehendes Gate nicht ausreichte.

### Rücklauf aus AP-apptest-01

Claude meldete vier geänderte Dateien:

- `docs/testing/TEST_PAGE_STANDARD.md`
- `.claude/skills/tech-spec-app/SKILL.md`
- `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md`
- `.claude/skills/manual-test-plan/SKILL.md`

`app-spec-create` blieb unverändert, weil sein Check auf die 18 Pflichtabschnitte von `tech-spec-app` den Testfall-Abschnitt bereits einschloss. Im Testseitenstandard wurden `--write-index` und das Verbot manueller Pflege von `tests/index.html` ergänzt. `tech-spec-app` erhielt einen kurzen Handoff zur späteren Testseite. Der App-Bau-Workflow erhielt Template, Zielpfad, Checker, Launcher-Erzeugung und Browserprüfung. `manual-test-plan` wurde von nicht mehr existierenden Pfaden auf die aktuellen Testorte umgestellt.

Als Ergebnisprotokoll entstand:

`docs/steering/patches/AP-apptest-01_testseiten-handoff-minimal_Ergebnis.md`

### Frage nach unabhängiger Prüfung

Der Nutzer fragte, ob der Task abgeschlossen sei und vor dem Abschlussritual noch eine unabhängige Prüfroutine eingesetzt werden könne. Zunächst wurde angekündigt, die tatsächlichen Dateien und den Diff zu prüfen. Der Nutzer wies darauf hin, dass dies über den GitHub-Connector nicht möglich sei, weil die Änderungen noch nicht committed waren.

Daraufhin wurde die Werkzeuggrenze ausdrücklich korrigiert: Der Connector zeigte nur den committed Stand. Für den uncommitteten Working Tree wurde deshalb ein neuer Prompt für einen frischen lokalen Claude-Faden erstellt:

`claude_prompt_AP-apptest-02_unabhaengige-claims-vs-files-QA.md`

Die Prüfroutine war read-only, durfte nur ein eigenes Ergebnisprotokoll schreiben und sollte den realen Diff, die vollständigen geänderten Dateien, die Scope-Grenzen und den Strukturchecker prüfen.

### Unabhängige Claims-vs-Files-QA

Der Rücklauf von `AP-apptest-02` meldete GRÜN. Der reale Diff umfasste genau die vier behaupteten Dateien. `tests/index.html`, `app-spec-create`, `Apps/**`, der Checker und das Template blieben unberührt. Die QA bestätigte alle fünf Prüffelder: Testseitenstandard, `tech-spec-app`, App-Bau-Workflow, `manual-test-plan` und die bewusste Nichtänderung von `app-spec-create`.

`python tools/check-test-pages.py` meldete 16 Testseiten und 0 Strukturfehler. Die alten Pfade `Theme/chart-tests/` und `Theme/data/` waren in den geprüften aktiven Anweisungen nicht mehr vorhanden. Das Ergebnisprotokoll lautete:

`docs/steering/patches/AP-apptest-02_unabhaengige-claims-vs-files-QA_Ergebnis.md`

Die unabhängige Prüfung gab das Abschlussritual frei.

## Wendepunkte

Der erste Wendepunkt entstand durch den Einwand, den gesamten App-Testprozess nicht in jede `APP_SPEC.md` aufzunehmen. Dadurch verlagerte sich der Gegenstand von einer neuen Testprozess-Architektur zu einem minimalen Handoff zwischen bestehenden Quellen.

Der zweite Wendepunkt war die Klärung, dass `tests/index.html` nicht manuell gepflegt, sondern durch `--write-index` erzeugt wurde.

Der dritte Wendepunkt entstand durch die Feststellung, dass der GitHub-Connector den uncommitteten Diff nicht prüfen konnte. Die Prüfung wurde daraufhin in einen frischen lokalen Claude-Faden verlagert.

## Entscheidungen und Festlegungen

- `app-spec-create` blieb ein dünner Koordinator · nach Prüfung der Skill-Rollen · zusätzliche Testseiten-Bauanweisungen wären dort doppelt gewesen · Status am Ende: gültig.
- `tech-spec-app` blieb für app-spezifische Testfälle in der `APP_SPEC.md` zuständig · nach der Skill-Prüfung · der Skill sollte keinen Testseiten-Code erzeugen · Status am Ende: gültig.
- `docs/testing/TEST_PAGE_STANDARD.md` blieb die kanonische Quelle für `app.test.html` · nach Prüfung der bestehenden Infrastruktur · keine neue Standarddatei wurde benötigt · Status am Ende: gültig.
- `tests/index.html` wurde ausschließlich über `python tools/check-test-pages.py --write-index` erzeugt · nach Prüfung des Checkers · manuelle Pflege wurde ausgeschlossen · Status am Ende: gültig.
- Eine separate `QA_TEST_CASES.md` wurde nicht pauschal für jede App verlangt · im Minimal-Prompt festgelegt · nur reale Komplexität sollte sie auslösen · Status am Ende: gültig.
- Vor dem Abschlussritual wurde eine unabhängige Claims-vs-Files-QA eingesetzt · nach der Werkzeugkorrektur · Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Der erste Claude-Prompt behandelte das Thema als repo-weite Standardisierungs- und Architekturaufgabe mit möglicher neuer Standarddatei, Traceability-Regeln, objektivem QA-Gate und mehrstufiger Review-Kette. Dieser Ansatz wurde verworfen, nachdem die bestehenden Skills und der Testseitenstandard den größten Teil bereits regelten.

Die Annahme, `tests/index.html` müsse durch den App-Baumeister manuell ergänzt werden, wurde durch die reale Checker-Implementierung ersetzt.

Die angekündigte direkte Prüfung des uncommitteten Diffs über den GitHub-Connector wurde zurückgenommen, nachdem der Nutzer auf die fehlende Commit-Basis hingewiesen hatte.

## Erzeugte Artefakte

- Claude-Prompt – `claude_prompt_AP-apptest-01_testseiten-handoff-minimal.md` – minimaler Umsetzungsauftrag – Status am Ende: final.
- Ergebnisprotokoll – `AP-apptest-01_testseiten-handoff-minimal_Ergebnis.md` – Rücklauf der Umsetzung – Status am Ende: final.
- Claude-Prompt – `claude_prompt_AP-apptest-02_unabhaengige-claims-vs-files-QA.md` – unabhängige read-only Prüfung – Status am Ende: final.
- Ergebnisprotokoll – `AP-apptest-02_unabhaengige-claims-vs-files-QA_Ergebnis.md` – Claims-vs-Files-QA mit Freigabe – Status am Ende: final.
- Abschlussanweisung – kurzer Text für das Abschlussritual mit Ausschluss von `.claude/learning/session-log.md` – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: Der Testseitenstandard enthielt bereits Template, Ablageort, Card-Vertrag, Erwartungsblöcke, Testdatenpfad, Strukturcheck und Browserprüfung. Ergänzt werden mussten vor allem die Verknüpfungen zu den bauenden Skills und die explizite Launcher-Erzeugung.

Gesicherter Stand: Ein grüner Lauf von `tools/check-test-pages.py` belegte nur Strukturkorrektheit, nicht fachliche oder visuelle Funktion.

Gesicherter Stand: Der GitHub-Connector konnte den uncommitteten Working Tree nicht als reale Prüfgrundlage liefern.

Spätere Korrektur: Die Launcher-Pflege wurde von einer möglichen manuellen Aufgabe zu einer ausschließlich generierten Komfortschicht präzisiert.

## Offene Punkte am Ende

Für den behandelten AP blieben keine fachlichen oder prüfbezogenen Punkte offen. Das Abschlussritual war freigegeben. Bestehende, nicht zu diesem AP gehörende Backlog-Punkte wurden nicht verändert.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein vorhandener Standard wurde zunächst wie eine fehlende Architektur behandelt; die gezielte Prüfung der beteiligten Skills reduzierte den Auftrag auf Verweise und Handoffs.

Für spätere Musteranalyse vormerken: Die vier Prüflinsen wurden nicht als abstrakte Bewertung verwendet, sondern zur Reduktion eines konkreten Prompts.

Für spätere Musteranalyse vormerken: Eine Werkzeuggrenze wurde erst nach Einwand des Nutzers sichtbar und führte zu einer getrennten lokalen Prüfroutine.

Für spätere Musteranalyse vormerken: Die unabhängige Prüfung wurde als eigener read-only AP mit Ergebnisprotokoll organisiert, bevor das Abschlussritual freigegeben wurde.

## Bewusst ausgelassen

Ausgelassen wurden Tippfehler, wiederholte Statusformulierungen, technische Tool-Aufrufdetails ohne Einfluss auf den Verlauf sowie wörtliche Wiederholungen der vollständigen erzeugten Prompts. Erhalten blieben deren Zweck, Scope, Dateinamen, Richtungswechsel und Endstatus.
