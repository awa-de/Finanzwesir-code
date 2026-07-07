---
chronik_id: CHRONIK-2026-07-07-ap-prokrast-11-sync
datum: 2026-07-07
projekt: prokrastinationspreis
thema: ap-prokrast-11-sync
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, annahme-verworfen, vollstaendigkeit-vs-verdichtung, konzept-vs-umsetzung]
---

# Chronik: AP-prokrast-11 — Synchronisierung von Spezifikation, Drehbuch und QA

**Hauptgegenstand:** In diesem Faden wurde AP-prokrast-11 für die App `prokrastinations-preis` vorbereitet, begleitet und bis zur Rückgabe an den Masterfaden abgeschlossen. Gegenstand war die Synchronisierung von `APP_SPEC.md`, Drehbuch und `QA_TEST_CASES.md` mit zwei bereits gebauten, aber anders als ursprünglich geplanten Endständen: Card-to-Point aus AP-08 und Screen-3-Kontinuitäts-Reveal aus AP-10.

## Ausgangslage

Der Faden begann mit zwei Prompts: dem Fachprompt AP-11 und dem technischen Startprompt. ChatGPT erklärte, dass AP-11 kein Code-AP sei, sondern ein Doku-/Spec-/QA-Sync nach der AP-10-Implementierung. Es wurde herausgearbeitet, dass AP-11 als Kette laufen sollte: AP-11a Analyse, AP-11b Write-Sync, AP-11c unabhängige Abschluss-QA, AP-11d Rücklaufkapsel. Danach verlangte der Nutzer den engen AP-11a-Anamnese-/Analyse-Prompt als Markdown-Datei und zusätzlich in einer einzigen kopierbaren Codebox.

## Chronologischer Verlauf

### AP-11a: Analyse als Grundlage

ChatGPT erzeugte den AP-11a-Prompt. Nach Durchführung durch Claude brachte der Nutzer das AP-11a-Ergebnis zurück. AP-11a meldete GELB: Die drei Zieldokumente seien unsynchron. `APP_SPEC.md`, Drehbuch und `QA_TEST_CASES.md` beschrieben noch alte oder unvollständige Screen-3-Reveal-Stände. Als nächster Schritt wurde AP-11b empfohlen.

Zunächst wurde der AP-11b-Zuschnitt als Doku-Sync gefasst: APP_SPEC, Drehbuch und QA sollten auf den AP-10-Endstand Variante B++ gebracht werden. Dabei tauchte die Frage auf, wie mit `Card-to-Point` und `Screen-3-Timing-Reveal` umzugehen sei, weil beide in der bestehenden Spezifikation als „noch nicht gebaut" standen.

### Prüfung der Git-/Patch-Wahrheit

Der Nutzer stellte klar, dass sowohl Screen-3-Timing-Reveal als auch Card-to-Point gebaut und erledigt seien, aber anders als geplant. ChatGPT recherchierte daraufhin im GitHub-Repository `awa-de/Finanzwesir-code` die letzten Commit-Messages und Patches. Dabei wurden die Commit-Zusammenfassungen zu AP-08, AP-09 und AP-10 herangezogen.

Für AP-08 ergab sich: Card-to-Point wurde nicht durch direkten Zugriff aus `app.js` auf Chart.js-Internals gebaut, sondern über `FwAnchorMeasurementPlugin.js`, ChartEngine als Vermittler, `anchorMeasurement`, `chartSettled`, `renderMotion` und Flight-Clone-Logik. Für AP-10 ergab sich: Der zunächst verfolgte Text→Chart→KPI-Timing-Reveal wurde nach Nutzerfeedback verworfen und durch Variante B++ ersetzt, den Screen-3-Kontinuitäts-Reveal. Chart und Ergebnislinie erscheinen sofort/still, darunter erscheint eine Bridge-Zeile „Station X von Y · Bekannt bis Z", danach folgen KPI-Karten und Disclaimer.

Der Nutzer präzisierte anschließend, dass beide Planabweichungen gewünscht, abgenommen und zufriedenstellend erledigt seien. Daraus entstand die Leitregel, diese Abweichungen nicht als Mangel, Workaround oder offene Aufgabe zu dokumentieren.

### Forensik-Regel für LLM-lesbare Altstände

Der Nutzer verlangte, alte Fassungen nicht zu löschen, wenn sie den Weg von A nach B erklärten. ChatGPT schlug zunächst eine historische Rahmung vor. Der Nutzer verschärfte die Anforderung: Zielgruppe seien nicht Menschen, sondern spätere LLMs. Daraufhin wurde eine harte Rahmung formuliert: `HISTORISCHER_STAND — NICHT AKTUELLER SOLLSTAND` mit Feldern wie `Status: HISTORISCH / INAKTIV`, `Darf als Implementierungsauftrag verwendet werden: NEIN`, `Darf als QA-Soll verwendet werden: NEIN`, `Darf als offene Aufgabe interpretiert werden: NEIN`. Dem sollte ein klar getrennter Block `AKTUELLER_SOLLSTAND — GÜLTIGER ENDSTAND` gegenüberstehen.

Diese Regel wurde Bestandteil des AP-11b-Prompts.

### AP-11b: Write-Prompt und Rücklauf

ChatGPT schrieb den AP-11b-Prompt als Markdown-Datei und Codeblock. AP-11b sollte die drei Zieldokumente synchronisieren, alte Planstände forensisch erhalten, aktive Sollstände klar trennen und ein Ergebnisprotokoll schreiben.

Nach Durchführung meldete der Nutzer AP-11b als GRÜN. Laut Rücklauf wurden `APP_SPEC.md`, Drehbuch und `QA_TEST_CASES.md` aktualisiert. Die alte Timing-Reveal-Fassung und die beiden veralteten „noch nicht gebaut"-Zeilen wurden als `HISTORISCHER_STAND` gerahmt. `QA_TEST_CASES.md` erhielt TC-E06 für Bridge/Timing und TC-E07 für Reduced Motion; TC-E04 wurde präzisiert. ChatGPT ordnete dies als plausibel GRÜN für AP-11b ein, aber nicht als Abschluss von AP-11 insgesamt. Der nächste Pflichtschritt wurde AP-11c.

### AP-11c: Abschluss-QA

ChatGPT schrieb den AP-11c-Prompt als read-only Abschluss-QA. AP-11c sollte AP-11b nicht reparieren, sondern Claims gegen reale Dateien prüfen: Scope, Spec-vs-Code, LLM-Forensik, TC-E04, TC-E06/TC-E07 und unerlaubte Diffs.

Nach Rücklauf meldete der Nutzer AP-11c als GRÜN. AP-11c bestätigte, dass AP-11b seine Claims hielt: keine Code-/Engine-/Plugin-/Daten-/Spec-Diffs, LLM-Forensik bestanden, TC-E04 trotz kompakter Hinweisform unkritisch, TC-E06/TC-E07 testbar. Ein Nebenfund wurde dokumentiert: Im Drehbuch stand bei RubikonSymbolMarkers noch „Bau noch offen", obwohl AP-07 diese gebaut hatte. Dieser Fund betraf AP-07/Screen 4 und wurde nicht als AP-11-Blocker bewertet.

### A11y-Frage und AP-11d

Der Nutzer fragte, ob durch die abweichenden Lösungen A11y-Funktionalität verloren gegangen sei, ob dies implizit geprüft worden sei und ob dies an den Masterfaden gehöre. ChatGPT antwortete, dass AP-11 keinen Code geändert habe und daher keine neue Laufzeit-A11y-Regression eingebaut haben könne. Reduced Motion sei statisch/implizit gegen `app.js`/`app.css` und die Doku-/QA-Sollstände geprüft worden. Nicht geprüft worden seien Screenreader-Volltest, Tastatur-/Fokus-Test, Live-Region-Praxistest, Assistive-Technology-Test und Browser-Durchlauf von TC-E06/TC-E07. Daraus wurde ein nicht-blockierender Masterfaden-Entscheidungspunkt formuliert.

ChatGPT schrieb daraufhin den AP-11d-Prompt. Dieser sollte die Rücklaufkapsel an den Masterfaden erstellen und die A11y-/Reduced-Motion-Einordnung aufnehmen: kein Hinweis auf A11y-Verlust, aber nur statisch/implizit geprüft; Masterfaden sollte über einen späteren Spotcheck entscheiden.

Nach AP-11d-Rücklauf bestätigte ChatGPT, dass die Kapsel an das Master-LLM gehen könne. Als nicht zu übersehende Punkte wurden genannt: AP-11 sei ein Doku-/Spec-/QA-Sync ohne Code-Diff; A11y-Spotcheck optional/nicht blockierend; RubikonSymbolMarkers-Drehbuchfund als Backlog-Kandidat; Commit-Empfehlung drei Zieldokumente plus AP-11a/b/c/d-Protokolle, `session-log.md` nur bewusst.

Am Ende teilte der Nutzer mit, AP-11 sei mit Abschlussritual committed und der Faden sei hier zu Ende.

## Wendepunkte

Der erste Wendepunkt entstand, als der Nutzer klarstellte, dass Card-to-Point und Screen-3-Timing-Reveal nicht offen seien, sondern gebaut und abgenommen, jedoch anders als geplant. Dadurch verschob sich AP-11b von „nachbauen/nachziehen" zu „abweichenden Endstand als gültigen Sollstand dokumentieren".

Der zweite Wendepunkt war die Forensik-Regel. Alte Fassungen sollten nicht gelöscht werden. Durch die zusätzliche Präzisierung, dass spätere LLMs die Zielgruppe seien, wurde aus einer menschlich lesbaren historischen Notiz eine harte, maschinenlesbare Statusrahmung.

Der dritte Wendepunkt war die A11y-Frage nach AP-11c. Sie änderte AP-11 nicht inhaltlich, führte aber dazu, dass AP-11d eine differenzierte Einordnung an den Masterfaden aufnehmen musste.

## Entscheidungen und Festlegungen

- AP-11 wurde als Doku-/Spec-/QA-Sync-Kette mit AP-11a bis AP-11d geführt. Status am Ende: gültig.
- Card-to-Point wurde als seit AP-08 gebaut, zufriedenstellend erledigt und abgenommen dokumentiert, nicht als offen. Status am Ende: gültig.
- Screen-3-Reveal wurde als seit AP-10 durch Variante B++ ersetzt dokumentiert. Der Text→Chart→KPI-Timing-Reveal wurde historisch/inaktiv. Status am Ende: gültig.
- Alte Planstände wurden nicht gelöscht, sondern LLM-lesbar als `HISTORISCHER_STAND — NICHT AKTUELLER SOLLSTAND` gerahmt. Status am Ende: gültig.
- A11y wurde nicht als praktisch geprüft behauptet. Der Masterfaden sollte über einen späteren Spotcheck entscheiden. Status am Ende: offener, nicht-blockierender Entscheidungspunkt.
- Der RubikonSymbolMarkers-Fund in Drehbuch Z.240 wurde als außerhalb AP-11 liegender Backlog-Kandidat behandelt. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

Der alte Text→Chart→KPI-Timing-Reveal blieb als verworfener Zwischenstand Teil der Chronik. Er wurde nicht als Fehlergeschichte erzählt, sondern als zunächst technisch verfolgter Ansatz, der nach Nutzerfeedback durch den Kontinuitäts-Reveal ersetzt wurde.

Eine zweite verworfene Lesart war, die „noch nicht gebaut"-Zeilen einfach auf „gebaut" zu drehen. Der Nutzer präzisierte, dass die Planabweichungen selbst dokumentiert werden müssten. Daraus entstand die Unterscheidung zwischen historischem Planstand und aktivem Endstand.

Eine weitere Schleife betraf TC-E04: AP-11b rahmte die Änderung nicht mit vollem HISTORISCHER_STAND-Block, sondern mit kompaktem Hinweis. AP-11c prüfte diese Abweichung und bewertete sie als unkritisch, weil kein alter aktiver Solltext im Testfall stehen blieb.

## Erzeugte Artefakte

- Markdown-Datei zum AP-11a-Anamnese-/Analyse-Prompt – Zweck: Analyseauftrag an Claude – Status: verwendet.
- `claude_prompt_AP-prokrast-11b_screen3-kontinuitaets-reveal_spec-qa-sync.md` – Zweck: Write-AP mit Forensik-Regel – Status: verwendet.
- `AP-prokrast-11b_screen3-kontinuitaets-reveal_spec-qa-sync_Ergebnis.md` – Zweck: Rücklauf aus Write-AP – Status: bestätigt.
- `claude_prompt_AP-prokrast-11c_abschluss-qa_claims-vs-files_spec-vs-code.md` – Zweck: read-only Abschluss-QA – Status: verwendet.
- `AP-prokrast-11c_abschluss-qa_claims-vs-files_spec-vs-code_Ergebnis.md` – Zweck: unabhängige QA – Status: GRÜN.
- `claude_prompt_AP-prokrast-11d_ruecklaufkapsel_master.md` – Zweck: Rücklaufkapsel mit A11y-Einordnung – Status: verwendet.
- `AP-prokrast-11d_ruecklaufkapsel_master_Ergebnis.md` – Zweck: Masterfaden-Übergabe – Status: GRÜN, committed laut Nutzer.

## Sachliche Erkenntnisse

Gesicherter Stand: AP-11 änderte keinen Code. Die Kette synchronisierte Dokumentation und QA mit AP-08 und AP-10. AP-11c bestätigte keine Diffs an Code, CSS, Engine, Plugins, Daten oder `docs/spec/**`.

Gesicherter Stand: Card-to-Point war seit AP-08 gebaut und abgenommen, aber über AnchorMeasurement-/ChartEngine-Contract statt direktem Chart.js-Internals-Zugriff aus `app.js`.

Gesicherter Stand: Der aktive Screen-3-Endstand war Variante B++ Kontinuitäts-Reveal, nicht Text→Chart→KPI-Timing-Reveal.

Arbeitsannahme am Ende: Ein späterer Browser-/A11y-Spotcheck von TC-E06/TC-E07 könnte sinnvoll sein, war aber kein AP-11-Blocker.

Offene Frage: Wie der Masterfaden den RubikonSymbolMarkers-Drehbuchfund und den optionalen A11y-Spotcheck priorisiert.

## Offene Punkte am Ende

- Optionaler Browser-/A11y-Spotcheck für TC-E06/TC-E07.
- Drehbuch Z.240: RubikonSymbolMarkers als „Bau noch offen" trotz AP-07-Erledigung.
- Stale Kommentar `app.js:378`.
- Kosmetischer CSS-Fallback `400ms` statt `800ms`.
- AP-09 No-op-Bootstrap/AnchorMeasurement-Masterentscheidung.
- chartSettled-Plattform-Doku.
- DS-012/DS-013 Theme-Bridge/Font-Neumessung.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Die Arbeit verschob sich mehrfach von „Status korrigieren" zu „abweichenden Endstand forensisch dokumentieren". Die Zielgruppe „spätere LLMs" veränderte die Dokumentationsform. Die Kette hielt die Trennung zwischen Write-AP, read-only QA und Rücklaufkapsel durch. Eine nachträgliche A11y-Frage wurde nicht in den abgeschlossenen AP hineingezogen, sondern als Masterfaden-Entscheidungspunkt gekapselt.

## Bewusst ausgelassen

Ausgelassen wurden Höflichkeiten, Download-/Codebox-Bedienwiederholungen, reine Statusmeldungen ohne neue Folge, Dateilinks ohne inhaltliche Wirkung sowie Tooldetails, soweit sie den Verlauf nicht änderten.
