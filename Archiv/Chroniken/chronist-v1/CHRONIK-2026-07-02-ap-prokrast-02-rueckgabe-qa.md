---
chronik_id: CHRONIK-2026-07-02-ap-prokrast-02-rueckgabe-qa
datum: 2026-07-02
projekt: finanzwesir-2-prokrastinations-preis
thema: ap-prokrast-02-rueckgabe-qa
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, durchbruch, konzept-vs-umsetzung, abbruchregel]
---

# Chronik: AP-prokrast-02, Migrationsschnitt und Abschluss-QA

**Hauptgegenstand:** Der Faden behandelte die Konsolidierung von AP-prokrast-02 für die App `Apps/prokrastinations-preis`. Im Mittelpunkt standen das freigegebene Drehbuch, die Reihenfolge der Umsetzung, der Migrationsschnitt an den Hauptfaden, das nachträglich eingeforderte Abschluss-QA und eine aktualisierte Übergabekapsel.

## Ausgangslage

Der Faden setzte auf bereits erarbeiteten Befunden zu AP-prokrast-02a bis AP-prokrast-02c auf. Das neue Drehbuch für die Prokrastinationspreis-App galt als amtliches fachliches Zielbild. Als offene Arbeitsfrage stand im Raum, wie die noch nicht umgesetzten Drehbuchteile in eine Reihenfolge gebracht werden sollten, ohne die Chart-Engine-Architektur zu verletzen. Besonders betroffen waren Screen 2 mit der Card-to-Point-Animation, Screen 3 mit einem Timing-Reveal und Screen 4 mit dem Rubikon-Moment.

## Chronologischer Verlauf

### Klärung, ob Card-to-Point nur verschoben wurde

Zunächst fragte der Nutzer, ob Card-to-Point nur zurückgestellt werde oder ob die Wirkung aus dem verabschiedeten Drehbuch herausfalle. Daraufhin wurde festgehalten, dass Card-to-Point verbindlicher Bestandteil des Zielbilds blieb. Die Zurückstellung wurde als Reihenfolgeentscheidung beschrieben: Nicht die Wirkung wurde entfernt, sondern der riskante Bauabschnitt wurde hinter das Rubikon-Minimum gelegt. Als Formulierung für AP-02d wurde festgehalten, Card-to-Point bleibe Pflicht und dürfe nicht in einen unverbindlichen Backlog verschoben werden.

### Senior-Engineering-Rahmung

Der Nutzer fragte anschließend, wie ein Senior-Engineering-Team bei Netflix, Google oder Amazon mit einer solchen Situation umgehen würde. Die Antwort ordnete die Situation als Governance-Frage ein: Produktziel entschieden, Bau-Reihenfolge und Schnittstellenrisiken getrennt. Die Muster wurden auf die App übertragen: vom Kundenerlebnis rückwärts denken, reversible und schwer rückgängig zu machende Entscheidungen unterscheiden, Invarianten festhalten und die riskanteste DOM↔Canvas-Kopplung nicht zuerst bauen. Daraus wurde die Reihenfolge abgeleitet: Rubikon-Minimum zuerst, Card-to-Point später mit eigenem Schnittstellen-AP.

### Erstellung von AP-prokrast-02d

Der Nutzer gab daraufhin „AP-02d“ frei. Es wurde ein Claude-Prompt für `AP-prokrast-02d — Migrationsschnitt, AP-Schnitt und Rücklaufkapsel` erzeugt. Der Prompt schrieb vor, keine Umsetzung auszuführen, keine APP_SPEC zu ändern, keinen Code zu ändern und genau ein Ergebnisprotokoll unter `docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md` zu erzeugen. Der Prompt übernahm die Steuerfaden-Klärungen: lokaler Repo-Name `Finanzwesir 2.0` als gültig, Drehbuch als amtliches Zielbild, 7 Stationen, Future-Ticks als Pflicht, parametrische Rubikon-Domain mit `pastMonths = 120` und `futureMonths = 120`, 800ms-Stille als fachlich entschieden und Card-to-Point als Pflicht, aber nachgelagert.

### Begründung des Rückgabeschnitts

Nach der Prompt-Erstellung fragte der Nutzer, warum an dieser Stelle aufgehört werde: wegen der ursprünglichen Planung bis 02d oder wegen eines sachlichen Schnitts. Daraufhin wurde erklärt, AP-02 habe als Nebenfaden die Aufgabe gehabt, Sollbild, Architektur-Kontrakt und Migrationsschnitt zu klären. Nach AP-02d beginne die Frage des nächsten Bau-APs, die an den Hauptfaden zurückgehöre. Als Formel wurde festgehalten: Nebenfaden klärt, Masterfaden entscheidet, Baufaden baut.

### AP-02d-Rückmeldung und Anstoß zur Abschluss-QA

Der Nutzer brachte danach Claudes Rückmeldung zu AP-02d ein. Diese meldete Status GRÜN, keinen Blocker, Ergebnisprotokoll unter `docs/steering/patches/`, Rücklaufkapsel GRÜN und als nächsten Haupt-AP `AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe`. Zugleich fragte der Nutzer, ob eine unabhängige QA-Runde nach dem Schema früherer LLMs laufen solle. Ein zuerst erzeugter QA-Prompt zielte noch auf AP-02d. Der Nutzer korrigierte sofort, dass nicht nur AP-02d, sondern AP-02a bis AP-02d geprüft werden müssten.

Daraufhin wurde ein neuer Prompt `AP-prokrast-02e — Abschluss-QA für AP-02a–d Claims-vs-Files` erzeugt. Er sollte alle Ergebnisprotokolle, Claims, Git-Zustände, App-Dateien, Architektur-Dokumente und optional relevante Engine-Dateien gegenprüfen. Die QA sollte keine Reparatur ausführen, sondern genau ein Ergebnisprotokoll unter `docs/steering/patches/AP-prokrast-02e_abschluss-qa_ap02a-b-c-d_claims-vs-files_Ergebnis.md` schreiben.

### Nacharbeitung der Prozessregel

Der Nutzer stellte danach die Frage, warum die QA-Runde nicht proaktiv angeboten worden war und ob dies nicht im technischen Startprompt gestanden habe. Es wurde eingeräumt, dass die Regel hätte angewandt werden müssen. Die Unterscheidung wurde präzisiert: Scope-QA, Diff-QA und Wiederlesen innerhalb eines APs ersetzen keinen unabhängigen Review-AP. Aus dieser Korrektur entstand eine künftig zu verwendende Regel: Kein operativer AP gelte ohne Ergebnisprotokoll als abgeschlossen, und keine Rücklaufkapsel oder Hauptfaden-Rückgabe gelte ohne separaten Abschluss-QA-AP als freigegeben.

Der Nutzer fragte anschließend nach dem genauen Satz für den fachlichen Übergabeprompt. Es wurde die Formulierung erstellt: „Nicht verhandelbare Prozessregel: Kein operativer AP gilt als abgeschlossen ohne Ergebnisprotokoll in `docs/steering/patches/`; keine Rücklaufkapsel, kein Hauptfaden-Rücklauf und kein nächster Haupt-AP gelten als freigegeben, bevor ein separater Abschluss-QA-AP die gesamte Unter-AP-Kette Claims-vs-Files geprüft hat. Selbstprüfung im selben AP zählt nicht als Abschluss-QA. Alles weitere im technischen Startprompt.“

### AP-02e-Ergebnis und aktualisierte Übergabekapsel

Der Nutzer lieferte danach die Rückmeldung zu AP-prokrast-02e. Das QA meldete Status GRÜN, keinen Blocker, alle Teil-QAs AP-02a bis AP-02d auf GRÜN und die Rückgabe an den Hauptfaden als freigegeben. Als eigenständige Befunde wurden genannt: Die Engine-Behauptungen aus AP-02c seien direkt am Code geprüft worden; `xDisplayRange` habe keine Obergrenzenprüfung, `FwVerticalLinePlugin` positioniere sich am letzten echten Datenpunkt, `ChartEngine` exponiere keine Koordinaten-API. Außerdem sei die Git-Status-Kette über alle fünf APs lückenlos.

Auf dieser Grundlage wurde eine neue Markdown-Datei `rueckgabe_hauptfaden_AP-prokrast-02_abschluss_qa-geprueft.md` erzeugt. Sie enthielt das QA-Urteil, die nicht verhandelbare Prozessregel, den Kernbefund, die fest entschiedenen Punkte, den empfohlenen nächsten AP, Pflichtumfang für AP-03, Nicht-Ziele, Schutzgeländer, spätere AP-Reihenfolge, geänderte Dateien und eine Änderungsbegründung gegenüber der AP-02d-Rücklaufkapsel.

## Wendepunkte

Ein erster Wendepunkt trat ein, als der Nutzer klarstellte, dass Card-to-Point nicht aus dem Drehbuch herausfallen dürfe. Dadurch wurde die Zurückstellung als Reihenfolgeentscheidung und nicht als Streichung festgelegt.

Ein zweiter Wendepunkt lag in der Senior-Engineering-Rahmung. Aus ihr wurde der Schnitt abgeleitet, nicht mit der riskantesten DOM↔Canvas-Kopplung zu beginnen, sondern zuerst eine vertikale Scheibe des Rubikon-Moments zu bauen.

Ein dritter Wendepunkt entstand, als der Nutzer den zunächst auf AP-02d begrenzten QA-Ansatz korrigierte. Dadurch wurde AP-02e als Abschluss-QA für die gesamte Unter-AP-Kette AP-02a bis AP-02d formuliert.

Ein vierter Wendepunkt lag in der Prozessnacharbeit. Der Nutzer fragte, warum die Ergebnisprotokoll- und QA-Regeln nicht von Anfang an proaktiv angewandt worden waren. Daraus entstand die nicht verhandelbare Prozessregel für künftige Fachfäden.

## Entscheidungen und Festlegungen

- Das Drehbuch blieb vollständig verbindlich. Status am Ende: gültig.
- Card-to-Point blieb Pflichtbestandteil des Drehbuchs, wurde aber hinter AP-03 gelegt. Status am Ende: gültig.
- Screen 3 Timing-Reveal blieb Pflicht, aber nachgelagert. Status am Ende: gültig.
- AP-prokrast-03 wurde als nächster Haupt-AP festgelegt: Rubikon-Minimum als vertikale Scheibe. Status am Ende: gültig.
- Future-Ticks wurden als Pflicht festgelegt. Status am Ende: gültig.
- Die Rubikon-Domain wurde parametrisch festgelegt: `referenceMonth`, `pastMonths`, `futureMonths`, aktuell 120/120 Monate. Status am Ende: gültig.
- Die 800ms-Stille wurde als fachlich entschieden und Reduced-Motion-beständig festgelegt. Status am Ende: gültig.
- Ergebnisprotokolle unter `docs/steering/patches/` wurden als Pflicht behandelt. Status am Ende: gültig.
- Ein separater Abschluss-QA-AP vor Hauptfaden-Rückgabe wurde als künftig nicht verhandelbare Prozessregel formuliert. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Ein Irrweg bestand darin, die QA-Runde zunächst nur auf AP-02d zu richten. Der Nutzer wies darauf hin, dass AP-02a bis AP-02d geprüft werden müssten. Daraus wurde AP-02e als Claims-vs-Files-QA für die gesamte Kette erzeugt.

Eine Schleife entstand um die Frage, ob die Arbeit nach AP-02d enden solle. Dabei wurde geklärt, dass AP-02d kein Ende des Vorhabens, sondern der Rückgabeschnitt des Nebenfadens war.

Ein weiterer verworfener Ansatz war die implizite Gleichsetzung von AP-interner Scope-/Diff-QA mit unabhängiger Abschluss-QA. Dieser Ansatz wurde nach Nutzerhinweis ersetzt durch die Regel, dass Selbstprüfung im selben AP nicht als Abschluss-QA zählt.

## Erzeugte Artefakte

- Markdown-Prompt `claude_prompt_AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel.md` – Zweck: AP-02d ausführen lassen – Status am Ende: final.
- Markdown-Prompt `claude_prompt_AP-prokrast-02e_abschluss-qa_ap02a-b-c-d_claims-vs-files.md` – Zweck: unabhängige Abschluss-QA für AP-02a bis AP-02d – Status am Ende: final.
- Markdown-Datei `rueckgabe_hauptfaden_AP-prokrast-02_abschluss_qa-geprueft.md` – Zweck: aktualisierte Rückgabe an den Hauptfaden nach AP-02e – Status am Ende: final.
- Formulierung „Nicht verhandelbare Prozessregel …“ – Zweck: Aufnahme in künftige fachliche Übergabeprompts – Status am Ende: gültig.

## Sachliche Erkenntnisse

Gesicherter Stand am Ende: AP-prokrast-02a bis AP-prokrast-02e waren als Kette abgeschlossen und QA-geprüft. Die Rückgabe an den Hauptfaden war freigegeben.

Gesicherter Stand am Ende: AP-prokrast-03 sollte nicht Card-to-Point, nicht Screen 3 und nicht APP_SPEC-Patch bauen, sondern Screen 4 als Rubikon-Minimum.

Gesicherter Stand am Ende: Die technische Begründung für AP-03 beruhte nicht nur auf Vorgängerprotokollen, sondern wurde durch AP-02e am Code geprüft.

Gesicherter Stand am Ende: Card-to-Point blieb Teil des Drehbuchs, benötigte aber später eine eigene Koordinaten-Schnittstelle.

Spätere Korrektur im Faden: AP-interne QA wurde als nicht ausreichend erkannt, wenn eine Unter-AP-Kette an den Hauptfaden zurückgegeben werden sollte.

## Offene Punkte am Ende

Offen blieb die tatsächliche Erstellung des AP-03-Bauprompts im Hauptfaden.

Offen blieb die spätere technische Entscheidung für Card-to-Point: Read-only-Koordinaten-API oder Plugin/Event-Ansatz.

Offen blieb die spätere Umsetzung von Screen 3 Timing-Reveal.

Offen blieb die APP_SPEC-Migration nach dem Umsetzungsschnitt.

Offen blieben spätere Commit- und Abschlussritual-Schritte nach Nutzer-OK.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte eine Trennung zwischen Produktziel und Bau-Reihenfolge.

Für spätere Musteranalyse vormerken: Eine vom Nutzer eingeforderte QA-Runde veränderte den Prozessstandard für künftige Fachfäden.

Für spätere Musteranalyse vormerken: Die Erkenntnis „Selbstprüfung im selben AP zählt nicht als Abschluss-QA“ entstand nicht am Anfang, sondern nach einem konkreten Versäumnis.

Für spätere Musteranalyse vormerken: Die Diskussion um Card-to-Point zeigte den Konflikt zwischen Drehbuchtreue und Architekturschnitt.

Für spätere Musteranalyse vormerken: Die Rückgabe an den Hauptfaden wurde erst nach AP-02e als freigegeben behandelt.

## Bewusst ausgelassen

Ausgelassen wurden reine Statusformeln, Download-Bestätigungen ohne neue Sachinformation, Wiederholungen identischer AP-Listen und Bedienrauschen um Dateiuploads. Ebenfalls ausgelassen wurden längere Wortlaute der erzeugten Prompts, soweit sie nicht den weiteren Verlauf veränderten. Die wesentlichen Dateinamen, Regeln, Entscheidungen und Korrekturen wurden erhalten.
