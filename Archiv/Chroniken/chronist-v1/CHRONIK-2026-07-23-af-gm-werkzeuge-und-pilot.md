---
chronik_id: CHRONIK-2026-07-23-af-gm-werkzeuge-und-pilot
datum: 2026-07-23
projekt: finanzwesir-2-0
thema: af-gm-werkzeuge-und-pilot
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, praezisierung-durch-gegenfrage, tooling-problem, konzept-vs-umsetzung]
---

# Chronik: Golden-Master-Werkzeuge und technischer Pilot

**Hauptgegenstand:** Der Faden behandelte die Vorbereitung einer Golden-Master-Produktionslinie der App-Fabrik. Er umfasste die Abgrenzung zwischen steuerndem und ausführendem LLM, die Prüfung der Werkzeuge AF-GM-02 und AF-GM-03, die Ergänzung von Eingabe- und Slider-Spuren sowie die Planung eines technischen Ghost-Piloten mit dem Depot-Kipppunkt-Mockup.

## Ausgangslage

Zu Beginn lag ein Übergabeauftrag für AF-GM-02 vor. Der Nutzer stellte klar, dass die taktischen und strukturellen Steuerungsdokumente nur dem steuernden LLM dienten. Claude sollte als ausführendes LLM ausschließlich einen begrenzten, operativen Auftrag erhalten. Daraufhin wurden Claude-Prompts als Dateien im Archivbereich angelegt und jeweils zusätzlich als kopierbarer Text ausgegeben.

## Chronologischer Verlauf

### Abgrenzung von Steuerung und Umsetzung

Die erste Claude-Prompt-Datei für AF-GM-02 enthielt Verweise auf übergeordnete Steuerungsdokumente. Der Nutzer beanstandete diese Verweise. Die Prompt-Datei wurde so gefasst, dass Claude nur noch die für den jeweiligen Arbeitsschritt erforderlichen Quellen, Schreibgrenzen, Nachweise und Stop-Regeln erhielt.

Im weiteren Verlauf wurden Fragen zur Playwright-Installation geklärt. Das Paket lag projektgebunden unter `node_modules`; der Chromium-Browser wurde unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers` abgelegt. Die Browser-Binaries wurden nicht in das NAS-Repository aufgenommen.

### AF-GM-02: Recorder und Verifizierer

Claude meldete die Fertigstellung von AF-GM-02 mit Recorder, Verifizierer, Schema, synthetischer Fixture, Traces, Screenshots und Negativnachweisen. Der Browserpfad wurde von einem zunächst unerwünschten Speicherort auf den lokalen Pfad unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers` umgestellt. Ein Session-Log-Eintrag wurde nach einer Duplizierung auf ein einzelnes Vorkommen zurückgeführt.

Der Stand wurde durch erneute Läufe geprüft: Normal- und Reduced-Traces wurden wiedergegeben; manipulierte Zustände, fehlende Selector und abweichende Hashes führten jeweils zu den vorgesehenen Fehler-IDs.

### AF-GM-03: Eingabepaket und Inhaltsgate

Claude baute für AF-GM-03 einen Generator, einen Validator und Testpakete. Bei der ersten inhaltlichen Prüfung wurde festgestellt, dass ein Positivpaket zwar strukturell gültig war, dessen Trace aber auf ein anderes Mockup als der Abnahmebeleg verwies. Weitere Punkte betrafen Pfadgrenzen und den Umgang mit `permitted`.

Der daraus entstandene Nachputz verlangte eine exakte Bindung von Trace und Abnahmebeleg, eine Repo-Pfadgrenze, eine explizite Quellenfreigabe und Pflichtabschnitte im Produktionsplan. Danach wurde ein eigener synthetischer Trace aufgenommen. Positivpaket, Hashbindung, Pfad-Traversal, Quellenfreigabe, Produktionsplan und bestehende Negativfälle wurden erneut geprüft.

Der Nutzer legte für weitere Schritte fest, dass formale Gültigkeit nicht genügte. Jeder tragende Claim sollte einen passenden Real- und Gegenbeweis erhalten. Prüfungen ohne zusätzlichen ausgeschlossenen Fehlmodus sollten unterbleiben.

### AF-GM-02b: Eingaben und Slider

Für interaktive Mockups wurde festgestellt, dass der ursprüngliche Recorder nur Klicks und Beobachtungen kannte. Es wurde eine Claude-Prompt-Datei für AF-GM-02b angelegt. Sie begrenzte die Erweiterung auf die Aktion `set-input-value` für native Zahl- und Range-Eingaben.

Claude ergänzte Recorder, Verifizierer, Schema und Strukturvalidator. Eine neue synthetische Fixture setzte einen Zahlenwert und einen Sliderwert über ein `input`-Event und zeigte beide Folgen sichtbar an. Der Trace wurde real aufgenommen und wiedergegeben. Manipulierte sichtbare Werte, fehlende Selector, Nicht-`input`-Ziele und fehlende `value`-Felder wurden abgewiesen. Bestehende AF-GM-02-Traces sowie das AF-GM-03-Positivpaket wurden erneut geprüft.

### Technischer Pilot mit Depot-Kipppunkt

Der Nutzer schlug `tests/scratch/depot-kipppunkt/mockup-duell/b-fable/mockup.html` als Gegenstand eines technischen Piloten vor. Das Mockup war als Werkstattstand gekennzeichnet. Der Nutzer akzeptierte es mit dem Satz: „Ich akzeptiere `tests/scratch/depot-kipppunkt/mockup-duell/b-fable/mockup.html` mit seinem aktuellen Hash ausschließlich als technischen AF-GM-04-Piloten. Keine fachliche Produktfreigabe, kein Ghost-Release."

Es wurde unterschieden zwischen dem technischen Pilot und einem späteren Golden Master. Der Pilot sollte die Produktionslinie bis in eine lokale Ghost-Integration nachweisen. Finale Texte, Anordnung, Gestaltung, Finanzmathematik und ein Launch blieben außerhalb dieses Zwecks.

Bei der Trockenübung wurde festgestellt, dass `verify.mjs` einen Trace nur gegen dessen `referencePath`, also gegen das Mockup, abspielt. Für einen Vergleich mit der gebauten lokalen Ghost-App fehlte ein Zielmodus. Als nächster Werkzeugschritt wurde AF-GM-02c festgelegt: ein optionaler, lokaler Target-Replay gegen eine Ghost-URL. Erst danach sollten Pilot-Snapshot, Abnahmebeleg, Spur, Eingabepaket, App-lokale Herstellung und gegebenenfalls die getrennte Shared-Integration folgen.

## Wendepunkte

- Die Steuerungsdokumente wurden aus den Claude-Prompts entfernt und blieben beim steuernden LLM.
- Die erste AF-GM-03-Prüfung unterschied zwischen formaler Struktur und semantischer Bindung von Trace und Abnahmebeleg.
- Die Forderung nach inhaltlichen Nachweisen führte zu Positiv-, Negativ- und Integrationsprüfungen mit begrenztem Umfang.
- Die Betrachtung des Depot-Kipppunkt-Mockups führte zur Ergänzung von `set-input-value` für Eingaben und Slider.
- Die Trockenübung des Ghost-Piloten machte den fehlenden Target-Replay gegen die gebaute App sichtbar.

## Entscheidungen und Festlegungen

- Claude erhielt für weitere Arbeiten begrenzte operative Prompt-Dateien. Status am Ende: gültig.
- Playwright blieb als projektgebundenes Paket installiert; Chromium blieb unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers`. Status am Ende: gültig.
- AF-GM-02, AF-GM-03 und AF-GM-02b wurden jeweils als Werkzeugschritte behandelt. Status am Ende: abgeschlossen.
- Formale Prüfungen wurden durch passende inhaltliche Gegenbeweise ergänzt; doppelte Prüfschritte ohne zusätzlichen Fehlmodus sollten unterbleiben. Status am Ende: gültig.
- `b-fable/mockup.html` wurde ausschließlich für einen technischen AF-GM-04-Piloten akzeptiert. Status am Ende: gültig.
- AF-GM-02c wurde vor AF-GM-04 als nächster Schritt festgelegt. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

- Eine erste Claude-Prompt-Datei verwies auf Steuerungsdokumente, die nach der Rollenklärung nicht für Claude bestimmt waren. Die Verweise wurden entfernt.
- Ein Browserpfad zeigte während AF-GM-02 zunächst auf einen globalen Benutzerpfad. Der Pfad wurde auf `C:\Tools\finanzwesir-playwright\af-gm-02\browsers` umgestellt.
- Der AF-GM-03-Positivfall enthielt zunächst eine Trace-Referenz auf ein anderes Mockup. Der Positivfall und die Validatorlogik wurden nach einem Inhaltsgate geändert.
- Für den AF-GM-04-Piloten wurde zunächst eine reine Paket- und Mockup-Wiedergabe erwogen. Die Trockenübung führte zur Festlegung, dass ein Target-Replay gegen die lokale Ghost-App zuvor benötigt wurde.

## Erzeugte Artefakte

- Mehrere Claude-Prompt-Dateien für AF-GM-02, AF-GM-03 und AF-GM-02b im Archivbereich. Status am Ende: Material für ausgeführte oder folgende Arbeitsaufträge.
- `tools/golden-master/` mit Recorder, Verifizierer, Browserpfad, Schema, Paketwerkzeugen und Pfadschutz. Status am Ende: Arbeitsstand für die Produktionslinie.
- AF-GM-02- und AF-GM-02b-Traces, Screenshots, synthetische Fixtures und Evidenzdateien. Status am Ende: Nachweise und Regressionen.
- AF-GM-03-Testpakete und Evidenzdateien. Status am Ende: Nachweise und Regressionen.
- Diese Chronik und eine Übergabedatei für den neuen Codex-Faden. Status am Ende: angelegt.

## Sachliche Erkenntnisse

- Gesicherter Stand: Ein Verhaltenstrace muss dieselbe Referenz und denselben Hash wie der Abnahmebeleg binden.
- Gesicherter Stand: `set-input-value` kann Zahl- und Range-Eingaben mit einem `input`-Event wiedergeben und danach sichtbare Folgen prüfen.
- Gesicherter Stand: Ein Trace-Replay gegen das Mockup prüft nicht die gebaute App.
- Arbeitsannahme: Ein lokaler Target-Replay kann den technischen Vergleich zwischen Golden-Master-Spur und lokaler Ghost-App abbilden.
- Offene Frage: Welche Shared-Änderungen für die spätere lokale Ghost-Einbindung nötig sein werden, war noch nicht bestimmt.

## Offene Punkte am Ende

- AF-GM-02c als begrenzten Target-Replay-Werkzeugschritt ausführen und prüfen.
- Den Pilot-Snapshot für `b-fable` anlegen und den technischen Abnahmebeleg erzeugen.
- AF-GM-04 nach AF-GM-02c in einzelnen Produktions- und Integrationsschritten vorbereiten.
- Für einen späteren Golden Master des Depot-Kipppunkts finale Texte, Anordnung und Gestaltung außerhalb des technischen Piloten überarbeiten.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Die Trennung von steuerndem und ausführendem LLM wurde innerhalb des Fadens präzisiert. Mehrere Werkzeugschritte erhielten nach formaler Prüfung ergänzende, gezielte Gegenbeweise. Die Planung des Piloten legte eine zusätzliche Systemgrenze zwischen Mockup-Wiedergabe und App-Wiedergabe offen.

## Bewusst ausgelassen

Wiederholte Statusmeldungen, vollständige Konsolenausgaben, Prompt-Volltexte, einzelne Formatierungs- und Encoding-Hinweise sowie unveränderte fremde Arbeitsbaumänderungen wurden verdichtet oder ausgelassen.
