---
chronik_id: CHRONIK-2026-07-01-steuerungsblock-rollout-abschluss
datum: 2026-07-01
projekt: finanzwesir-2-0
thema: steuerungsblock-rollout-abschluss
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, sackgasse, durchbruch, tooling-problem, annahme-verworfen]
---

# Chronik: Abschluss des Steuerungsblock-Rollouts und Sicherung der operativen Erkenntnisse

**Hauptgegenstand:** Der Faden behandelte den Abschluss des Steuerungsblock-Rollouts für die `Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md` im Projekt Finanzwesir 2.0. Im Mittelpunkt standen der zuvor gesperrte `plan-generator`, die Korrektur einer unerwünschten Seed-Datei-Änderung, mehrere Review- und Audit-Schleifen sowie die Verdichtung der operativen Erkenntnisse für einen künftigen taktischen Startprompt.

## Ausgangslage

Der Faden setzte nach AP-22 ein. `plan-generator` war zuvor als gesperrter Fall behandelt worden. AP-22 hatte geklärt, dass die Rolle nicht unklar war: `plan-generator` war H1, Funnel-Finale und Abschlussmodul. Die Sperre beruhte auf dem Inhalt des bisherigen Rohentwurfs, der eine konkrete Produkt- und Betragsempfehlung nahelegte. Der Nutzer wollte die offenen Output-Fragen nicht sofort entscheiden, sondern als Arbeitsmaterial in der `MINI_SPEC_FROM_HAUPTDOKUMENT.md` sichern lassen, damit spätere Arbeit an der App dort wieder ansetzen konnte.

## Chronologischer Verlauf

### Klärung des nächsten Vorgehens nach AP-22

Zunächst wurde aus AP-22 abgeleitet, dass kein weiterer Rollenklärungs-AP nötig war. Die offene Frage lautete, wie konkret der spätere finale Plan werden durfte. Es wurde ein Set aus sechs Entscheidungsfragen formuliert: Konkretheit des Plans, ETF-Namen, Euro-Betrag, sprachliches Output-Label, Umgang mit nicht reifen Nutzern und spätere Waschzettel-Frage. Diese Fragen sollten nicht entschieden, sondern als offener Entscheidungsblock konserviert werden.

Der Nutzer präzisierte danach, dass Claude den Steuerungsblock schreiben solle und dass der Block „Wie konkret darf der finale Plan werden?“ mit allen Optionen und Empfehlungen in die MINI_SPEC übernommen werden solle. Das spätere LLM sollte erkennen, dass diese Fragen iterativ mit dem Nutzer zu besprechen waren.

### AP-23 und der Scope-Fehler an der Seed-Datei

Daraufhin wurde AP-23 als Umsetzungs-Prompt erstellt. Der Prompt verlangte eine Seed-Neufassung und ließ `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` ausdrücklich als erlaubte Änderungsdatei zu. Claude führte diesen Auftrag aus und meldete AP-23 GRÜN. Im Ergebnis standen Änderungen an der Seed-Datei, an der `plan-generator`-MINI_SPEC und am AP-23-Protokoll.

Der Nutzer fragte anschließend, warum die Seed-Datei im Git als modified erschien. Damit wurde sichtbar, dass der Prompt-Schnitt die Seed-Datei als Zielartefakt behandelt hatte, obwohl sie in diesem Workflow nur Quelle sein sollte. Der Zustand AP-23 wurde daraufhin nicht als final akzeptiert. Es wurde festgehalten, dass Claude nicht gegen den Auftrag verstoßen hatte, sondern dass der Auftrag selbst die Seed-Datei fälschlich freigegeben hatte.

### AP-23a als Korrektur der Seed-Read-Only-Regel

Als Korrektur wurde AP-23a erstellt. Er setzte ausschließlich die Seed-Datei per `git checkout -- Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` zurück, ließ die inhaltlich nützliche Arbeit in der `plan-generator`-MINI_SPEC stehen und korrigierte die Provenienz. Aus dem lokalen Steuerungsblock wurde dadurch ein dokumentierter Fall, der nicht aus der Seed-Datei übertragen war, sondern auf AP-22, Nutzerentscheidung im AP-23-Kontext und AP-23a beruhte.

AP-23a meldete GRÜN. Die Seed-Datei tauchte nicht mehr im Diff auf. In der MINI_SPEC blieben Steuerungsblock, Warnhinweis, Entscheidungsblock mit sechs Punkten und LLM-STOP-Regel erhalten. Der Nutzer fragte, wie es zu diesem Fehler hatte kommen können. Es wurde festgehalten, dass die Ursache im Prompt-Schnitt lag: Quelle und Zielartefakt waren verwechselt worden, und die Allowed-Files-Liste hatte den Schaden ermöglicht.

### AP-24 und AP-24a als Review- und Mini-Fix-Schleife

Anschließend wurde AP-24 als unabhängiger Review-Prompt erstellt. Er folgte wieder dem bekannten Prüf-Schema: keine Reparatur, kein Commit, nur Ergebnisprotokoll. Anders als AP-18/AP-21 sollte er keine Seed-Provenienz prüfen, sondern AP-22/AP-23a-Provenienz und Seed-Read-Only-QA.

AP-24 meldete GELB. Sachlich waren Steuerungsblock, Warnhinweis, Entscheidungsblock, LLM-STOP-Regel, Scope-QA und Seed-Read-Only GRÜN. Der einzige Befund war, dass die Datei die Abweichung inhaltlich beschrieb, aber das Wort „Sonderfall“ nicht ausdrücklich enthielt.

Daraufhin wurde AP-24a als Mini-Fix-Prompt erstellt. Der Auftrag war auf eine einzelne Ergänzung begrenzt: eine Formulierung, dass der lokale Steuerungsblock ein dokumentierter Sonderfall für `plan-generator` sei und nicht als zeilengetreuer Transfer aus der zentralen Seed-Datei stamme. AP-24a meldete GRÜN. Der Entscheidungsblock und die LLM-STOP-Regel blieben erhalten.

### AP-25 und AP-25a als mechanischer Finalaudit

Der Nutzer verlangte danach einen letzten unabhängigen Test: alle MINI_SPECs in den Unterverzeichnissen von `Apps/` sollten gegen den Text in der Seed-Datei geprüft werden. Es wurde ein Python-only-Audit-Prompt AP-25 erstellt. Er sollte alle lokalen Steuerungsblöcke mechanisch prüfen und `plan-generator` als Sonderfall behandeln.

AP-25 meldete GELB. Zunächst wurde dokumentiert, dass das mitgelieferte Python-Gerüst zu False Positives geführt hätte, weil es den falschen LLM-Prüfscore-Abschnitt erwischt und lokale Blöcke zu weit extrahiert hätte. Claude ersetzte die Analyse durch die bewährten Extraktionsfunktionen aus dem Rollout-Tool. Danach waren 23 von 24 Standard-Apps mechanisch GRÜN, `plan-generator` als Sonderfall GRÜN. Ein Nebenbefund blieb: `regulatorik-dashboard` passte nicht in das mechanische Standardformat, weil es seit AP-14h/AP-14i bewusst ein erweitertes Steuerungsblock-Format mit eigenem 8-Fragen-Score nutzte.

Daraufhin wurde AP-25a erstellt. Der Audit-Scope wurde angepasst: 23 Standard-Apps wurden mechanisch geprüft, `plan-generator` wurde als Sonderfall ohne Seed-Provenienz geprüft, `regulatorik-dashboard` als Sonderfall mit Seed-Provenienz, aber erweitertem AP-14h/AP-14i-Format. AP-25a meldete GRÜN: 25 MINI_SPECs geprüft, 23/23 Standard-Apps GRÜN, beide Sonderfälle GRÜN, Seed-Datei nicht im Diff, Scope-QA GRÜN.

### Verdichtung der operativen Erkenntnisse

Nach dem fachlichen Abschluss verlangte der Nutzer einen Prompt, der die im Operativen gewonnenen Erkenntnisse für die Verbesserung des bestehenden taktischen Startprompts festhielt. Zunächst wurde beschrieben, was aufgenommen werden sollte und was nicht. Danach verlangte der Nutzer eine Priorisierung nach Wichtigkeit, weil der technische Prompt nicht zu lang werden sollte.

Es wurden drei Stufen festgelegt: P1 für Regeln, die echte Schäden verhindern; P2 für Regeln gegen Umwege, Gelb-Schleifen und Audit-Reibung; P3 für Material, das nicht in den Hauptprompt gehört. Daraus entstand die Datei `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT_V4_INTEGRATIONSNOTIZ_ARTEFAKTKONTROLLE_UND_AUDITGATES.md`.

## Wendepunkte

Der erste Wendepunkt war die Rückmeldung des Nutzers, dass die Seed-Datei nach AP-23 im Git als modified erschien. Dadurch wurde der AP-23-Zustand nicht übernommen, sondern in eine Korrekturkette überführt.

Der zweite Wendepunkt war AP-24 mit GELB statt GRÜN. Das Review reparierte nicht, sondern dokumentierte nur das fehlende Wort „Sonderfall“. Daraus entstand ein klar begrenzter Mini-Fix AP-24a.

Der dritte Wendepunkt war AP-25. Der mechanische Audit zeigte, dass der Audit-Scope unvollständig war. `regulatorik-dashboard` wurde als zweiter Sonderfall erkannt. Erst AP-25a bildete die reale Struktur des Projekts im Prüfmodell ab.

Der vierte Wendepunkt war der Übergang vom Artefaktabschluss zur Prozesssicherung. Die Arbeitserfahrung wurde nicht als Chronik, sondern als priorisierte Integrationsnotiz für den taktischen Startprompt festgehalten.

## Entscheidungen und Festlegungen

Es wurde festgelegt, dass `plan-generator` als lokaler Sonderfall behandelt wurde. Der Steuerungsblock blieb in der MINI_SPEC, die Seed-Datei blieb unverändert. Status am Ende: gültig.

Es wurde festgelegt, dass Review-APs nicht reparieren sollten. AP-24 dokumentierte daher GELB und leitete AP-24a als separaten Mini-Fix ein. Status am Ende: gültig.

Es wurde festgelegt, dass AP-25 nicht mit GELB abgeschlossen werden sollte. Stattdessen wurde AP-25a erstellt, um den Audit-Scope um `regulatorik-dashboard` als zweiten Sonderfall zu erweitern. Status am Ende: gültig.

Es wurde festgelegt, dass die Erkenntnisse aus dem operativen Verlauf nicht als lange Chronik in den taktischen Startprompt sollten, sondern priorisiert nach P1, P2 und P3. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Der zentrale Irrweg war AP-23. Der Prompt erlaubte die Änderung der Seed-Datei. Die dadurch erzeugte Änderung wurde nicht committed, sondern durch AP-23a zurückgedreht. Aus diesem Vorgang entstand die spätere Regel, Masterdateien und Quellen als read-only zu behandeln, sofern der Nutzer nicht ausdrücklich eine Änderung freigibt.

Eine zweite Schleife entstand um das fehlende Wort „Sonderfall“. Inhaltlich war die Provenienz nach AP-24 beschrieben, aber ein explizites Prüfwort fehlte. Der Vorgang führte zu AP-24a und zur Festlegung, Mini-Fixes klein zu schneiden.

Eine dritte Schleife entstand im mechanischen Audit. Das zunächst mitgelieferte Python-Gerüst hätte viele Apps wegen Extraktionsproblemen als ROT bewertet. Die realitätsnähere Prüfung nutzte die bewährte Tool-Logik. Daraus entstand die Erkenntnis, dass Python-Gerüste als Hypothesen zu behandeln waren.

## Erzeugte Artefakte

- `claude_prompt_AP23_plan_generator_seed_neufassung_steuerungsblock_entscheidungsblock.md` – Prompt für AP-23 – Status am Ende: durch AP-23a korrigierter Fehl-AP.
- `claude_prompt_AP23a_plan_generator_seed_readonly_korrektur.md` – Korrekturprompt zur Seed-Read-Only-Wiederherstellung – Status am Ende: final.
- `claude_prompt_AP24_review_plan_generator_minispec_provenienz_seed_readonly.md` – unabhängiger Review-Prompt – Status am Ende: führte zu GELB.
- `claude_prompt_AP24a_minifix_sonderfall_plan_generator.md` – Mini-Fix-Prompt zur Sonderfall-Kennzeichnung – Status am Ende: final.
- `claude_prompt_AP25_finalaudit_minispecs_gegen_seed.md` – erster Finalaudit-Prompt – Status am Ende: ersetzt durch AP-25a-Scope.
- `claude_prompt_AP25a_finalaudit_mit_sonderfaellen.md` – Finalaudit-Prompt mit zwei Sonderfällen – Status am Ende: final.
- `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT_V4_INTEGRATIONSNOTIZ_ARTEFAKTKONTROLLE_UND_AUDITGATES.md` – priorisierte Integrationsnotiz für den bestehenden taktischen Startprompt – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: Der Steuerungsblock-Rollout war am Ende für 25 Apps geschlossen: 23 Standard-Apps wurden mechanisch gegen die Seed-Datei geprüft, `plan-generator` wurde als Sonderfall ohne Seed-Provenienz geprüft, `regulatorik-dashboard` als Sonderfall mit Seed-Provenienz und erweitertem Format.

Gesicherter Stand: Die Seed-Datei stand am Ende nicht im Git-Diff. APP_SPEC- und HTML-Dateien standen nicht im Scope.

Gesicherter Stand: Die wichtigste operative Ursache des AP-23-Vorfalls lag in der Allowed-Files-Liste. Eine Quelle wurde als Zielartefakt zugelassen.

Gesicherter Stand: Mechanische Gesamtprüfungen benötigten vorab ein Sonderfall-Register. Andernfalls wurden dokumentierte Sonderstrukturen als Standardabweichungen sichtbar.

Arbeitsannahme am Ende: Die neuen Regeln sollten nicht als langer Erfahrungsbericht, sondern als kurze, harte Gates in den taktischen Startprompt integriert werden.

## Offene Punkte am Ende

Der Commit-/Abschluss-AP für die gesamte AP-22-bis-AP-25a-Kette war noch nicht ausgeführt. Die Datei `.claude/learning/session-log.md` stand als nicht blind zu committender Dirty-Eintrag im Raum.

Die Integration der Datei `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT_V4_INTEGRATIONSNOTIZ_ARTEFAKTKONTROLLE_UND_AUDITGATES.md` in den bestehenden taktischen Startprompt war noch nicht durchgeführt.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein falscher Prompt-Schnitt kann entstehen, wenn ein bisher funktionierendes Muster auf einen Sonderfall übertragen wird.

Für spätere Musteranalyse vormerken: Ein GELB-Befund kann den Audit-Scope betreffen, nicht das geprüfte Artefakt.

Für spätere Musteranalyse vormerken: Getrennte Write-, Review-, Mini-Fix- und Audit-APs erhöhten die Nachvollziehbarkeit der Korrekturkette.

Für spätere Musteranalyse vormerken: Mechanische Python-Prüfungen erzeugten erst dann belastbare Ergebnisse, wenn die Extraktion gegen die reale Dateistruktur validiert wurde.

## Bewusst ausgelassen

Ausgelassen wurden reine Download-Hinweise, wiederholte Statusbestätigungen ohne neue Wirkung, vollständige Codeblöcke der erzeugten Prompts und die langen Audit-Tabellen. Ebenfalls ausgelassen wurden Details der APP_SPEC-Verbote, soweit sie sich in jedem AP nur wiederholten und keine neue Zustandsänderung bewirkten.
