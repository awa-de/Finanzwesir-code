---
chronik_id: CHRONIK-2026-07-07-ap-prokrast-12-rubikon-symbolmarkers-drehbuch-errata
datum: 2026-07-07
projekt: prokrastinationspreis
thema: ap-prokrast-12-rubikon-symbolmarkers-drehbuch-errata
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [vollstaendigkeit-vs-verdichtung, missverstandene-anforderung, tooling-problem]
---

# Chronik: AP-prokrast-12 — RubikonSymbolMarkers Drehbuch-Errata-Sync

**Hauptgegenstand:** Der Faden behandelte AP-prokrast-12, einen kleinen Doku-Errata-AP im Projekt „Prokrastinationspreis“. Ziel war, einen in AP-prokrast-11 gemeldeten Drift im Drehbuch zu RubikonSymbolMarkers zu prüfen, operativ zu schneiden, als AP-12a/12b/12c abzuarbeiten und anschließend an den Masterfaden zurückzugeben.

## Ausgangslage

Der Nutzer stellte zwei Prompts bereit: den fachlichen AP-12-Prompt und den technischen taktischen Startprompt. Der fachliche Prompt bestimmte, dass AP-prokrast-12 nur den Drehbuch-Widerspruch zu RubikonSymbolMarkers korrigieren sollte: `drehbuch_prokrastinationspreis_app.md:240` beschrieb die Marker noch als „Bau offen“, obwohl AP-prokrast-07 sie bereits gebaut, geprüft und abgenommen hatte. Der taktische Startprompt legte die Arbeitsweise fest: Anamnese zuerst, kleine APs, Write und QA getrennt, Datei-Wahrheit vor Protokoll, kein Commit ohne Freigabe.

## Chronologischer Verlauf

### Klärung der beiden Prompts

Zu Beginn fragte der Nutzer, was zu tun sei und wie Fachprompt und technischer Startprompt zusammenarbeiteten. ChatGPT fasste AP-12 als kleinen Doku-Errata-AP zusammen: Zuerst AP-12a als Drehbuch-Patch, danach AP-12b als read-only Claims-vs-Files-QA, danach AP-12c als Rücklaufkapsel an den Masterfaden. Es wurde abgegrenzt, dass kein Code, keine Marker-Nachjustierung, kein TC-F05-Nachtest und keine Theme-/Font-Bridge gebaut werden sollten.

### Erstellung des AP-12a-Prompts und Formatkorrektur

Der Nutzer verlangte AP-12a als downloadbares Markdown und als kopierbaren Code in einer einzigen Box. ChatGPT erzeugte zunächst die Markdown-Datei `claude_prompt_AP-prokrast-12a_rubikon-symbolmarkers-drehbuch-errata.md`, gab den Prompt aber in einer Form aus, die durch mehrere innere Codeblöcke und Website-Text nicht einfach kopierbar war. Der Nutzer korrigierte die Ausgabeanforderung: Er habe ausdrücklich keine Mischung aus Website-Text und Code-Box gewollt. Daraufhin gab ChatGPT denselben Prompt in einer einzigen äußeren Markdown-Codebox mit Vierfach-Backticks aus. Diese Schleife betraf nicht den fachlichen Inhalt, sondern die Nutzbarkeit des Artefakts.

Der AP-12a-Prompt begrenzte Claude auf eine redaktionelle Korrektur in `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`, verpflichtete zur Vorprüfung, zielgerichteten Suche, minimalem Patch, Wiederlesen nach Write und Ergebnisprotokoll in `docs/steering/patches/AP-prokrast-12a_rubikon-symbolmarkers_drehbuch-errata_Ergebnis.md`.

### Rücklauf AP-12a

Der Nutzer meldete anschließend den Rücklauf aus Claude: AP-prokrast-12a sei GRÜN abgeschlossen. Geändert worden sei `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`, konkret Zeile 240. Das Ergebnisprotokoll lag als `AP-prokrast-12a_rubikon-symbolmarkers_drehbuch-errata_Ergebnis.md` vor. Der wichtigste Befund laut Rücklauf: Zeile 240 behauptete „Bau noch offen“ für RubikonSymbolMarkers, obwohl AP-prokrast-07a–07d sie seit 2026-07-06 gebaut und abgenommen hatten. Die Zeile wurde korrigiert, und die spätere Font-Neumessung wurde als DS-012/DS-013-Folgeauftrag statt als neuer Rubikon-Bau-AP abgegrenzt.

ChatGPT bestimmte danach als nächsten Schritt AP-prokrast-12b, nicht Commit und nicht Abschlussritual. Besonders hervorgehoben wurden die bekannte lokale Änderung an `.claude/learning/session-log.md` und die Pflicht, die reale Drehbuch-Datei zu prüfen, statt nur dem AP-12a-Protokoll zu folgen.

### Erstellung des AP-12b-Prompts

Der Nutzer verlangte, AP-12b zu bauen und diesmal korrekt auszugeben. ChatGPT erzeugte die Datei `claude_prompt_AP-prokrast-12b_abschluss-qa_claims-vs-files_drehbuch-errata.md` und gab den gesamten Prompt in einer einzigen äußeren Markdown-Codebox aus. Der Prompt definierte AP-12b als read-only Abschluss-QA, verbot Reparaturen, Code, Commit und Abschlussritual, und legte fest, dass nur ein Ergebnisprotokoll geschrieben werden durfte: `docs/steering/patches/AP-prokrast-12b_abschluss-qa_claims-vs-files_drehbuch-errata_Ergebnis.md`.

Die QA sollte AP-12a gegen reale Dateien prüfen: Git-Status, Diff, reale Drehbuchstelle um Zeile 240, Altlastenbegriffe wie „Bau offen“, „noch nicht gebaut“, „TC-F05 offen“ und Scope-Verletzungen. Der Prompt enthielt eine Claims-vs-Files-Tabelle und Statuslogik für GRÜN, GELB und ROT.

### Rücklauf AP-12b

Der Nutzer meldete danach, AP-prokrast-12b sei GRÜN abgeschlossen. Die QA-Freigabe wurde mit „ja“ angegeben. Geprüft worden seien die reale Drehbuch-Zeile 240, AP-12a-Protokoll, AP-07d- und AP-11d-Belege sowie Git-Status, Diff und Log. Das Ergebnisprotokoll lag als `AP-prokrast-12b_abschluss-qa_claims-vs-files_drehbuch-errata_Ergebnis.md` vor.

Der wichtigste Befund: Der Diff war exakt einzeilig und deckungsgleich mit dem AP-12a-Claim. Der Gesamt-Grep über das Drehbuch fand keinen verbleibenden aktiven „Bau offen“- oder „TC-F05 offen“-Widerspruch. Keine verbotene Datei wurde angetastet. ChatGPT fasste daraus abgeleitet den nächsten Schritt als AP-prokrast-12c — Rücklaufkapsel an den Masterfaden — zusammen.

### Erstellung der AP-12c-Rücklaufkapsel und fehlende Datei

Der Nutzer gab „Ok,dann 12c“ frei. ChatGPT erstellte daraufhin die Rücklaufkapsel als fertigen Text in einem Writing-Block. Die Kapsel erklärte AP-prokrast-12 insgesamt als GRÜN, nannte AP-12a und AP-12b, dokumentierte geänderte und nicht geänderte Dateien, formulierte die neue Datei-Wahrheit und grenzte offene Punkte wie No-op-Bootstrap/AnchorMeasurement, chartSettled-Doku, TC-E06/TC-E07-Spotcheck, CTA-Copy und DS-012/DS-013 ab.

Der Nutzer fragte anschließend nach der downloadbaren Datei. ChatGPT stellte fest, dass die Datei nicht erzeugt worden war, und erzeugte nachträglich `AP-prokrast-12c_ruecklaufkapsel_master_Ergebnis.md`. Die Datei enthielt die zuvor formulierte Rücklaufkapsel.

### Prüfung der Rücklaufkapsel und Abschluss

Der Nutzer lud die Rücklaufkapsel erneut hoch und fragte, ob sie so an den Masterfaden gehen könne. ChatGPT prüfte den Inhalt und bestätigte, dass die Kapsel fachlich anschlussfähig sei: Status GRÜN, QA-Freigabe, AP-12a/AP-12b-Zusammenfassung, geänderte Dateien, Nicht-Änderungen, neue Datei-Wahrheit, offene Punkte und Abgrenzung gegen einen neuen RubikonSymbolMarkers-Bau-/Nachpolitur-AP seien enthalten. ChatGPT empfahl keine Ergänzungen, um die Kapsel nicht zu verlängern.

Der Nutzer meldete schließlich, Claude habe AP-12 committed und hier sei Schluss. ChatGPT hielt den Endstand fest: AP-prokrast-12 war GRÜN, QA durchgeführt und GRÜN, Rücklaufkapsel erstellt und vom Master anschlussfähig, Commit durch Claude erledigt, nächster Schritt im Masterfaden neu zu schneiden.

## Wendepunkte

Der erste Wendepunkt lag in der Unterscheidung der beiden Promptarten. Aus der Frage „Was ist zu tun?“ wurde eine klare Mini-Kette AP-12a/12b/12c statt eines unscharfen Doku- oder Codeauftrags.

Ein zweiter Wendepunkt entstand durch die Formatkorrektur des Nutzers beim AP-12a-Prompt. Der fachliche Prompt war brauchbar, aber die Ausgabeform erfüllte die Kopieranforderung nicht. Danach wurden AP-Prompts in einer einzigen äußeren Codebox ausgegeben.

Ein dritter Wendepunkt lag nach AP-12b: Die unabhängige QA bestätigte AP-12a vollständig. Dadurch wurde AP-12c zur reinen Rücklaufkapsel, nicht zu einem weiteren Prüf- oder Reparaturauftrag.

Ein vierter Wendepunkt war die Nachfrage nach der downloadbaren AP-12c-Datei. Die Kapsel war textlich vorhanden, aber nicht als Datei erzeugt. Dieser Fehler führte zur nachträglichen Erstellung des Markdown-Artefakts.

## Entscheidungen und Festlegungen

- AP-12 wurde als kleiner Doku-Errata-AP behandelt · zu Beginn des Fadens · weil Fachprompt und AP-11-Fund nur den Drehbuch-Widerspruch betrafen · Status am Ende: gültig.
- Die operative Kette wurde auf AP-12a, AP-12b, AP-12c begrenzt · nach der Promptlektüre · weil Write und Abschluss-QA getrennt werden mussten · Status am Ende: gültig.
- AP-12a durfte nur das Drehbuch und ein Ergebnisprotokoll schreiben · bei Erstellung des AP-12a-Prompts · um Code-, Engine-, CSS- und Daten-Scope auszuschließen · Status am Ende: gültig.
- AP-12b wurde als read-only Claims-vs-Files-QA festgelegt · nach AP-12a-Rücklauf · um Selbstzertifizierung zu vermeiden · Status am Ende: gültig.
- AP-12c wurde als reine Rücklaufkapsel erstellt · nach AP-12b-GRÜN · weil der Masterfaden den nächsten Haupt-AP neu schneiden sollte · Status am Ende: gültig.
- Kein RubikonSymbolMarkers-Bau-/Nachpolitur-AP sollte aus AP-12 folgen · in AP-12c · weil AP-07 als gebaut und abgenommen galt · Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Die erste Schleife betraf die Ausgabeform des AP-12a-Prompts. ChatGPT erzeugte zwar Datei und Inhalt, aber der kopierbare Prompt war durch verschachtelte Codeblöcke und Website-Text nicht in der vom Nutzer verlangten Form nutzbar. Der Nutzer korrigierte dies, und ChatGPT gab denselben Prompt in einer einzigen Box aus.

Eine zweite Schleife betraf AP-12c. ChatGPT erzeugte zuerst nur die Rücklaufkapsel als Text und nicht die downloadbare Markdown-Datei. Der Nutzer fragte nach der Datei. Danach wurde `AP-prokrast-12c_ruecklaufkapsel_master_Ergebnis.md` erzeugt.

Nicht weiterverfolgt wurden Codearbeit, TC-F05-Nachtest, Marker-Nachjustierung, Theme-/Font-Bridge-Anbindung, Abschlussritual und Commit aus dem ChatGPT-Nebenfaden. Diese Ausschlüsse blieben während des Fadens stabil.

## Erzeugte Artefakte

- Markdown-Prompt – `claude_prompt_AP-prokrast-12a_rubikon-symbolmarkers-drehbuch-errata.md` – Zweck: enger Claude-Prompt für AP-12a – Status am Ende: verwendet.
- Kopierbarer AP-12a-Prompt – eine äußere Markdown-Codebox – Zweck: direkte Übergabe an Claude ohne Website-/Codebox-Mischung – Status am Ende: ersetzt die fehlerhafte erste Ausgabeform.
- Markdown-Prompt – `claude_prompt_AP-prokrast-12b_abschluss-qa_claims-vs-files_drehbuch-errata.md` – Zweck: enger Claude-Prompt für read-only Abschluss-QA – Status am Ende: verwendet.
- Ergebnisprotokoll aus Claude – `AP-prokrast-12a_rubikon-symbolmarkers_drehbuch-errata_Ergebnis.md` – Zweck: AP-12a-Rücklauf – Status am Ende: bestätigt.
- Ergebnisprotokoll aus Claude – `AP-prokrast-12b_abschluss-qa_claims-vs-files_drehbuch-errata_Ergebnis.md` – Zweck: Abschluss-QA – Status am Ende: bestätigt.
- Rücklaufkapsel – `AP-prokrast-12c_ruecklaufkapsel_master_Ergebnis.md` – Zweck: Übergabe an Masterfaden – Status am Ende: final.
- Chronik – `CHRONIK-2026-07-07-ap-prokrast-12-rubikon-symbolmarkers-drehbuch-errata.md` – Zweck: Verdichtung dieses Fadens – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: AP-prokrast-12 betraf nur einen aktiven Drehbuch-Widerspruch zu RubikonSymbolMarkers. AP-07 war als gebaut und abgenommen verbindlich. AP-12 durfte daraus keinen neuen Rubikon-Bau-AP ableiten.

Gesicherter Stand: Die Trennung zwischen AP-12a als Write-AP und AP-12b als read-only QA wurde eingehalten. AP-12b bestätigte den AP-12a-Claim gegen reale Datei und Git-Diff.

Gesicherter Stand: Die spätere Rubikon-Positionsmessung nach CI-Font-/Theme-Anbindung blieb DS-012/DS-013 zugeordnet und wurde nicht Teil von AP-12.

Gesicherter Stand: Für den Nutzer war die Ausgabeform von Prompts ein eigenes Arbeitskriterium. Eine fachlich passende, aber schlecht kopierbare Ausgabe erfüllte den Auftrag nicht.

Spätere Korrektur: Die AP-12c-Rücklaufkapsel wurde zunächst ohne downloadbare Datei geliefert und erst nach Nutzerhinweis als Markdown-Datei erzeugt.

## Offene Punkte am Ende

AP-12 selbst war am Ende abgeschlossen und committed.

Außerhalb von AP-12 blieben die im Faden genannten Nicht-Blocker offen: AP-prokrast-08-FOLLOWUP-A / No-op-Bootstrap / AnchorMeasurement, chartSettled Plattform-Doku, TC-E06/TC-E07 Browser-/Reduced-Motion-/A11y-Spotcheck, CTA-Copy und DS-012/DS-013 Theme-Bridge / Font-Neumessung. Diese Punkte wurden nicht bearbeitet.

Der nächste Haupt-AP sollte im Masterfaden neu geschnitten werden.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte die wiederholte Bedeutung enger AP-Schnitte, insbesondere der Trennung von Write und QA.

Für spätere Musteranalyse vormerken: Die Dateiform des Outputs war nicht nur Komfort, sondern Teil der Nutzbarkeit im Arbeitsprozess. Ein fachlich korrekter Prompt musste zusätzlich als einzelne kopierbare Box und bei Bedarf als downloadbare Datei vorliegen.

Für spätere Musteranalyse vormerken: Rücklaufkapseln mussten nicht nur textlich erstellt, sondern auch als Datei bereitgestellt werden, wenn der Arbeitsmodus dies verlangte.

Für spätere Musteranalyse vormerken: Bekannte Scope-Fremdänderungen wie `.claude/learning/session-log.md` wurden nicht ignoriert, sondern als Vorzustand benannt und vom AP-Scope getrennt.

## Bewusst ausgelassen

Ausgelassen wurden reine Höflichkeitsformeln, wiederholte Statusmeldungen ohne neuen Sachstand, die vollständigen Prompttexte von AP-12a und AP-12b, sowie die vollständige Rücklaufkapsel AP-12c. Stattdessen wurden ihre Funktion, Dateinamen, Scope-Grenzen, Status und Verlaufsauswirkung festgehalten.
