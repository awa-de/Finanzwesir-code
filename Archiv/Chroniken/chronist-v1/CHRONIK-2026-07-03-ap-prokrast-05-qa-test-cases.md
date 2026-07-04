---
chronik_id: CHRONIK-2026-07-03-ap-prokrast-05-qa-test-cases
datum: 2026-07-03
projekt: prokrastinationspreis-app
thema: ap-05-qa-test-cases-rubikon-sync
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, abbruchregel, vollstaendigkeit-vs-verdichtung]
---

# Chronik: AP-prokrast-05 — QA_TEST_CASES.md nach Rubikon-Soll

**Hauptgegenstand:** Der Faden führte AP-prokrast-05 als Nebenfaden zur Synchronisierung von `QA_TEST_CASES.md` mit dem nach AP-prokrast-03/04 verbindlichen Rubikon-Sollstand. ChatGPT schnitt dafür mehrere Claude-Code-Prompts, wertete Rückläufe aus und hielt die Trennung zwischen operativer AP-Führung und Masterfaden-Rücklauf aufrecht.

## Ausgangslage

Zu Beginn lagen zwei Dateien vor: der taktische Startprompt `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT(10).md` und der fachliche Startprompt `AP-prokrast-05_qa-test-cases-rubikon-sync_STARTPROMPT(1).md`. Der Nutzer verlangte zunächst eine Erklärung, was fachlich der Auftrag sei und wie Fachprompt und technischer Prompt zusammenarbeiteten.

ChatGPT stellte fest, dass AP-prokrast-05 kein Bau-AP war, sondern ein enger Dokumentations- und QA-Sync-AP. Fachlich sollte `QA_TEST_CASES.md` die alte Formulierung `Kein Zukunftschart.` in TC-F01 verlieren oder entschärfen, weil Screen 4 inzwischen einen stehenden Rubikon-Chart vorsah: echte Vergangenheit links, Heute/Rubikon in der Mitte, leerer datenfreier Zukunftsraum rechts. Verboten bleiben sollten Zukunftsdaten, Future-Line, Prognosekurve, Forecast-Korridor, Dummy-Dataset und vergleichbare Datenbehauptungen. Der taktische Startprompt lieferte dazu die Arbeitsdisziplin: Anamnese, kleiner Scope, Datei-Wahrheit, getrennte Write- und QA-APs, Stop-Regeln und Statuslogik.

## Chronologischer Verlauf

### Klärung von Auftrag und Prompt-Zusammenspiel

Der Nutzer fragte, was fachlich zu tun sei. ChatGPT trennte Fachprompt und taktischen Startprompt: Der Fachprompt definierte Ziel, Sollwahrheit, Scope und Rücklaufstruktur dieses APs; der taktische Prompt definierte, wie gearbeitet werden sollte. Daraus folgte die interne Kette AP-prokrast-05a, 05b und 05c, wobei 05a schreiben, 05b read-only prüfen und 05c den Masterrücklauf erzeugen sollte.

### Erstellung des Prompts für AP-prokrast-05a

Auf das OK des Nutzers hin erstellte ChatGPT den Claude-Code-Prompt `claude_prompt_AP-prokrast-05a_qa-test-cases-rubikon-sync.md`. Der Nutzer präzisierte dabei, dass das ausführende LLM nur diesen Prompt kenne, nicht den taktischen Startprompt und nicht den Fachprompt. ChatGPT schnitt den Prompt deshalb eigenständig: Der Prompt enthielt den notwendigen Rubikon-Kontext, den erlaubten und verbotenen Scope, Vorprüfung, Pflichtquellen, Schreibscope, Nach-Write-QA, Ergebnisprotokoll und Chat-Ausgabe. Er belastete das ausführende LLM nicht mit Masterfaden-Kontext.

Anschließend fragte der Nutzer, ob ChatGPT verstanden habe, wie die Dreifaltigkeit `Python-Script / Haiku / Sonnet` einzusetzen sei. ChatGPT erklärte: Python für deterministische Suche, Zählung, Diff und Wiederlesen; Haiku nur optional für billige Vorsortierung langer Abschnitte; Sonnet bzw. Hauptmodell für Entscheidung, Redaktion und Status. ChatGPT erkannte, dass der AP-05a-Prompt diese Dreifaltigkeit noch nicht ausdrücklich enthielt. Der Nutzer entschied, dies erst für den nächsten Prompt zu beachten, da AP-05a bereits lief. ChatGPT speicherte diese Regel als künftige Arbeitsweise.

### AP-prokrast-05a: erster Write-AP

Der Nutzer meldete AP-prokrast-05a als abgeschlossen. Claude hatte `Apps/prokrastinations-preis/QA_TEST_CASES.md` geändert: TC-F01 wurde neu gefasst, TC-F03 und TC-F04 wurden ergänzt. Der alte Satz `Kein Zukunftschart.` wurde als aktiver Widerspruch zum Rubikon-Chart-Sollstand eingeordnet. Zusätzlich waren DOM-Text, Timing und Reduced Motion testbar gemacht worden. Das Ergebnisprotokoll `docs/steering/patches/AP-prokrast-05a_qa-test-cases-rubikon-sync_Ergebnis.md` wurde hochgeladen.

ChatGPT stellte fest, dass nun nicht Commit oder Rücklaufkapsel folgten, sondern AP-prokrast-05b als unabhängige read-only Abschluss-QA. Es benannte die zu prüfenden Claims, den Scope, die Rubikon-Soll-QA, die Eskalationspunkte und eine Spezialprüfung, weil TC-F03/TC-F04 neue Testfälle waren. Danach erstellte ChatGPT den Prompt `claude_prompt_AP-prokrast-05b_abschluss-qa_claims-vs-files.md`. In diesem Prompt wurde die Werkzeugdreifaltigkeit ausdrücklich aufgenommen.

### AP-prokrast-05b: Abschluss-QA und GELB-Fund

Der Nutzer meldete AP-prokrast-05b als abgeschlossen, Status GELB. Claude hatte alle AP-05a-Claims bestätigt: TC-F01 war korrekt neu gefasst, TC-F03/TC-F04 waren im Scope und fachlich begründet, `Kein Zukunftschart` war entfernt, der Scope war sauber. Zusätzlich fand die QA eine eigene Testabdeckungslücke: `QA_TEST_CASES.md` testete noch nicht, dass die CTA während der beiden 800ms-Pausen auf Screen 4 nicht per Tastatur oder Screenreader erreichbar sein durfte. Diese Anforderung war bereits in AP-prokrast-02d dokumentiert, aber in der Testdatei nicht geschlossen.

Der Nutzer fragte, warum der Status GELB sei und wie er auf GRÜN zu bringen sei. ChatGPT trennte den bestätigten AP-05a-Kern vom neuen QA-Fund. Der GELB-Status beruhte nicht auf einem AP-05a-Widerspruch, sondern auf einer zusätzlichen realen Lücke. Um AP-05 insgesamt auf GRÜN zu bringen, schlug ChatGPT keinen Rücklauf mit GELB vor, sondern einen kleinen Nachputz-AP und eine Re-QA: AP-prokrast-05c als Light-Gate-Minifix und AP-prokrast-05d als read-only Re-QA. Damit wurde die ursprüngliche Kette erweitert.

### AP-prokrast-05c: Light-Gate-Minifix zur CTA-Erreichbarkeit

Der Nutzer beauftragte AP-prokrast-05c. ChatGPT erstellte den Prompt `claude_prompt_AP-prokrast-05c_cta-fokus-rubikon-pausen.md`. Der Prompt erlaubte nur `QA_TEST_CASES.md` und ein Ergebnisprotokoll. Inhaltlich sollte TC-F03 so ergänzt werden, dass während beider 800ms-Pausen die CTA nicht sichtbar, nicht per Tab erreichbar, nicht `document.activeElement`-fähig und nicht im Accessibility Tree erreichbar war. Erst nach dem CTA-Reveal sollte sie sichtbar, fokussierbar und screenreader-erreichbar sein. TC-F04 durfte minimal ergänzen, dass diese Nicht-Erreichbarkeit auch bei Reduced Motion gilt. Der Prompt hielt fest, keinen Screenreader-Volltest zu behaupten, sondern DOM-/Fokus-/A11y-Mini-QA.

Der Nutzer meldete AP-05c anschließend als GRÜN. Claude hatte TC-F03 um drei Prüfschritte, Erwartetes-Ergebnis- und Fehlschlag-Zeilen ergänzt und TC-F04 minimal erweitert. TC-F01 blieb unangetastet. ChatGPT hielt fest, dass nach jedem Write-AP eine separate Re-QA folgen musste, und nannte AP-prokrast-05d als nächsten Schritt.

### AP-prokrast-05d: Re-QA nach Nachputz

Nach dem OK des Nutzers erstellte ChatGPT den Prompt `claude_prompt_AP-prokrast-05d_re-qa_claims-vs-files_cta-fokus.md`. Er war read-only geschnitten und durfte nur das eigene QA-Protokoll schreiben. Er sollte prüfen, ob AP-05c den GELB-Fund aus AP-05b tatsächlich geschlossen hatte.

Der Nutzer meldete AP-05d als GRÜN. Claude bestätigte, dass TC-F03 nun den CTA-Zustand in beiden 800ms-Pausen und nach dem Reveal prüfte, TC-F04 dieselbe Anforderung für Reduced Motion erbte, TC-F01 nicht neu geöffnet wurde und keine stille Produktentscheidung entstand. Das Ergebnisprotokoll `docs/steering/patches/AP-prokrast-05d_re-qa_claims-vs-files_cta-fokus_Ergebnis.md` wurde hochgeladen. ChatGPT stellte fest, dass der Weg nun für AP-prokrast-05e als Rücklaufkapsel offen war.

### AP-prokrast-05e: Rücklaufkapsel an den Masterfaden

Auf Nutzer-OK erstellte ChatGPT den Prompt `claude_prompt_AP-prokrast-05e_ruecklaufkapsel_masterfaden.md`. Der Prompt war ein Übergabe-AP: keine weiteren Änderungen an `QA_TEST_CASES.md`, keine App-, Spec- oder Codearbeit, nur Verdichtung in `docs/steering/patches/AP-prokrast-05e_ruecklaufkapsel_Ergebnis.md`. Er legte als Endwahrheit fest: AP-05a synchronisierte, AP-05b fand eine CTA-Fokus-Lücke, AP-05c schloss sie, AP-05d bestätigte die Schließung, AP-05e verdichtete den Rücklauf.

Der Nutzer meldete AP-05e als GRÜN, abgenommen und QA-freigegeben. Die Rücklaufkapsel sagte, AP-prokrast-05 sei vollständig abgeschlossen; `QA_TEST_CASES.md` sei die neue Datei-Wahrheit für Rubikon-QA; ausschließlich `QA_TEST_CASES.md` sei geändert worden; Regressionsrisiko sei niedrig; BACKLOG AP-27 könne als erledigt nachgezogen werden. Offene Kandidaten für den Master blieben ✅/❓-Symbolik, Card-to-Point, Screen-3-Timing-Reveal und CTA-Copy.

### Klärung der Zusatzanmerkungen für den Masterfaden

Der Nutzer fragte, ob die Rücklaufkapsel an den Masterfaden gegeben werden könne und ob ChatGPT zusätzliche Anmerkungen habe. ChatGPT erzeugte zunächst eine Markdown-Datei mit nicht-blockierenden Anmerkungen, darunter Commit-Umfang, `.claude/learning/session-log.md`, BACKLOG AP-27 und Screenreader-Overclaiming.

Der Nutzer hinterfragte danach, ob solche operativen Hinweise den Masterfaden interessierten. ChatGPT korrigierte die Einordnung: Die Hinweise zu `.claude/learning/session-log.md` und Commit-Hygiene seien für den Big-Boss-Masterfaden eher Rauschen und gehörten höchstens in einen späteren Commit-/Staging-AP. Für den Master seien nur AP-05 GRÜN, BACKLOG AP-27 erledigen, offene Masterthemen und kein Screenreader-Volltest relevant. Auf die Nachfrage, ob es zusätzlich zur Claude-Übergabekapsel noch nicht-rauschende Anmerkungen gebe, antwortete ChatGPT, es gebe keine zusätzliche Anmerkungsdatei. Die Rücklaufkapsel reiche.

## Wendepunkte

Ein erster Wendepunkt entstand, als der Nutzer nach der Dreifaltigkeit Python/Haiku/Sonnet fragte. Dadurch wurde eine Regel für folgende Prompts festgehalten: Die Werkzeugwahl musste ausdrücklich genannt werden, sofern relevant.

Ein zweiter Wendepunkt entstand durch AP-05b. Bis dahin war die erwartete Kette AP-05a → AP-05b → Rücklaufkapsel. AP-05b bestätigte zwar AP-05a, fand aber eine nicht geschlossene CTA-Fokus-Testlücke. Dadurch wurde die Kette um AP-05c und AP-05d erweitert.

Ein dritter Wendepunkt entstand bei den Masterfaden-Anmerkungen. ChatGPT hatte zunächst operative Zusatzhinweise erstellt. Der Nutzer fragte, ob diese für den Master nicht rauschten. ChatGPT änderte die Einordnung und reduzierte den Master-Rücklauf auf die Claude-Kapsel ohne zusätzliche Datei.

## Entscheidungen und Festlegungen

- AP-prokrast-05 wurde als Dokumentations-/QA-Sync-AP behandelt, nicht als Bau-AP. Status am Ende: gültig.
- `QA_TEST_CASES.md` war die einzige fachlich zu ändernde Datei. Status am Ende: gültig.
- TC-F01 sollte nicht mehr `Kein Zukunftschart.` als pauschales Verbot enthalten. Status am Ende: gültig.
- Zukunftsdaten, Future-Line, Prognose, Dummy-Dataset, `null`-Padding und transparente Zukunftslinie blieben verboten. Status am Ende: gültig.
- TC-F03/TC-F04 durften ergänzt werden, weil DOM-Haupttext, Timing, Reduced Motion und CTA-Fokus direkt abhängige Rubikon-Testlogik waren. Status am Ende: gültig.
- AP-05b-GELB wurde nicht an den Master zurückgegeben, sondern durch AP-05c/05d geschlossen. Status am Ende: gültig.
- Für künftige Prompts sollte Python/Haiku/Sonnet ausdrücklich als Werkzeugwahl enthalten sein, wenn relevant. Status am Ende: gültig.
- Zusatzanmerkungen zu `session-log.md` und Commit-Hygiene wurden nicht als Masterfaden-relevant eingeordnet. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Die erste verworfene Richtung war die implizite Annahme, nach AP-05b könne direkt die Rücklaufkapsel erstellt werden. AP-05b fand einen GELB-Punkt; daraus wurde ein Nachputz mit eigener Re-QA.

Eine zweite Schleife betraf die zusätzliche Anmerkungsdatei für den Masterfaden. ChatGPT erzeugte sie zunächst, ordnete sie danach aber als zu operativ ein. Die Schlussfassung lautete, dass keine zusätzliche Anmerkungsdatei nötig sei.

Ein kleiner Zwischenstand betraf den AP-05a-Prompt. Dort war die Werkzeugdreifaltigkeit noch nicht ausdrücklich enthalten. Der Nutzer ließ den laufenden Prompt unverändert und legte fest, die Regel für den nächsten Prompt zu beachten.

## Erzeugte Artefakte

- `claude_prompt_AP-prokrast-05a_qa-test-cases-rubikon-sync.md` – Claude-Code-Prompt für den Write-AP – Status am Ende: genutzt.
- `docs/steering/patches/AP-prokrast-05a_qa-test-cases-rubikon-sync_Ergebnis.md` – Ergebnisprotokoll AP-05a – Status am Ende: Grundlage für QA.
- `claude_prompt_AP-prokrast-05b_abschluss-qa_claims-vs-files.md` – Claude-Code-Prompt für Abschluss-QA – Status am Ende: genutzt.
- `docs/steering/patches/AP-prokrast-05b_abschluss-qa_claims-vs-files_Ergebnis.md` – QA-Protokoll mit GELB-Fund – Status am Ende: durch Nachputz geschlossen.
- `claude_prompt_AP-prokrast-05c_cta-fokus-rubikon-pausen.md` – Prompt für Light-Gate-Minifix – Status am Ende: genutzt.
- `docs/steering/patches/AP-prokrast-05c_cta-fokus-rubikon-pausen_Ergebnis.md` – Ergebnisprotokoll Nachputz – Status am Ende: durch Re-QA bestätigt.
- `claude_prompt_AP-prokrast-05d_re-qa_claims-vs-files_cta-fokus.md` – Prompt für Re-QA – Status am Ende: genutzt.
- `docs/steering/patches/AP-prokrast-05d_re-qa_claims-vs-files_cta-fokus_Ergebnis.md` – Re-QA-Protokoll – Status am Ende: GRÜN-Basis für Rücklauf.
- `claude_prompt_AP-prokrast-05e_ruecklaufkapsel_masterfaden.md` – Prompt für Rücklaufkapsel – Status am Ende: genutzt.
- `docs/steering/patches/AP-prokrast-05e_ruecklaufkapsel_Ergebnis.md` – Rücklaufkapsel an den Masterfaden – Status am Ende: finaler Rücklauf.
- `AP-prokrast-05e_anmerkungen_fuer_masterfaden.md` – Zusatzanmerkungsdatei – Status am Ende: nicht als nötig für den Masterfaden eingeordnet.

## Sachliche Erkenntnisse

Gesicherter Stand am Ende: AP-prokrast-05 war GRÜN abgeschlossen. `QA_TEST_CASES.md` enthielt die synchronisierte Rubikon-QA für Screen 4. TC-F01 behandelte den stehenden Rubikon-Chart nicht mehr als Fehler. TC-F03 deckte DOM-Haupttext, zweistufiges 800ms-Timing und CTA-Nicht-Erreichbarkeit während beider Pausen ab. TC-F04 hielt Reduced-Motion-Invarianz einschließlich CTA-Nicht-Erreichbarkeit fest.

Gesicherter Stand: Der Begriff `Kein Zukunftschart.` war als pauschales Verbot nicht mehr passend, weil der Rubikon-Screen gerade einen Chart mit leerem Zukunftsraum vorsah.

Gesicherter Stand: Die CTA-Fokus-Anforderung stammte nicht aus AP-05c neu, sondern aus AP-prokrast-02d. AP-05c machte sie nur in `QA_TEST_CASES.md` testbar.

Gesicherter Stand: Es wurde kein Screenreader-Volltest behauptet. Die Testlogik blieb bei DOM-/Fokus-/A11y-Mini-QA.

Offene Frage: Welche der weiterhin offenen Masterthemen als nächstes geschnitten werden sollten, blieb dem Masterfaden vorbehalten.

## Offene Punkte am Ende

- ✅/❓-Symbolik aus Drehbuch Beat 2 blieb als Produktentscheidung offen.
- Card-to-Point blieb offen.
- Screen-3-Timing-Reveal blieb offen.
- CTA-Copy für Screen 4 blieb als bereits bekannter redaktioneller Punkt offen.
- Ein vollständiger Screenreader-Praxistest mit echter AT-Software wurde nicht durchgeführt und blieb, falls gewünscht, ein eigener späterer QA-AP.
- BACKLOG AP-27 sollte im Masterfaden als erledigt nachgezogen werden.
- Ein Commit oder Abschlussritual wurde nicht ausgeführt.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte eine wiederholte Trennung von Write-AP und unabhängiger QA. Ein GELB-Fund wurde nicht an den Master weitergereicht, sondern durch einen engen Nachputz mit Re-QA geschlossen.

Für spätere Musteranalyse vormerken: Der Nutzer korrigierte die Informationshöhe für ausführende LLMs. Prompts sollten genug lokalen Kontext enthalten, aber nicht das Gesamtprojekt überladen.

Für spätere Musteranalyse vormerken: Die Werkzeugdreifaltigkeit wurde als Prompt-Bestandteil nachgeschärft, nachdem sie im ersten Prompt nur teilweise explizit war.

Für spätere Musteranalyse vormerken: Operative Hygienehinweise wurden zunächst als Zusatzanmerkung formuliert und danach als Masterfaden-Rauschen erkannt.

## Bewusst ausgelassen

Ausgelassen wurden reine Bestätigungen, Download-Hinweise ohne neuen Arbeitsstand, Wiederholungen der vollständigen Prompttexte, Dateilink-Routinen, kleinere Tippfehler und Tool-Metadaten. Ebenfalls ausgelassen wurden längere wörtliche Tabellen aus den Claude-Prompts, soweit ihre Funktion in der Chronik bereits durch Ziel, Scope, Status und erzeugte Artefakte abgebildet wurde.
