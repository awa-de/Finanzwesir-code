---
chronik_id: CHRONIK-2026-07-04-ap-prokrast-06-symbolik-rubikon
datum: 2026-07-04
projekt: ap-prokrast
thema: symbolik-rubikon
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, missverstandene-anforderung, annahme-verworfen, konzept-vs-umsetzung]
---

# Chronik: AP-prokrast-06 — ✅/❓-Symbolik am Rubikon

**Hauptgegenstand:** Der Faden behandelte AP-prokrast-06 zur ✅/❓-Symbolik im Screen-4-Rubikon-Chart der Prokrastinationspreis-App. Aus einer zunächst als offene Produktentscheidung behandelten Frage wurde nach Nutzerkorrektur ein Regression-Sync mit bindender Festlegung: ✅ links und ❓ rechts der blauen Rubikon-Linie, rein visuell, späterer Bau über `FwChartTextPlugin.js`.

## Ausgangslage

Der Nutzer legte zwei Dateien vor: den fachlichen AP-Prompt zu `AP-prokrast-06 — Produktentscheidung ✅/❓-Symbolik Beat 2` und den taktischen Startprompt für operative LLM-Arbeit. ChatGPT sollte erklären, was fachlich der Auftrag war und wie Fachprompt und technischer Prompt zusammenarbeiteten.

ChatGPT las die hochgeladenen Dateien und fasste AP-prokrast-06 zunächst als Produktentscheidungs-AP ein: Die ✅/❓-Symbolik aus Drehbuch Beat 2 sollte nicht gebaut, sondern zwischen den Optionen A behalten, B streichen, C ersetzen oder D parken entschieden werden. Der taktische Prompt wurde als Arbeitsmodus verstanden: Anamnese, kleine APs, Datei-Wahrheit, Scope-Grenzen, getrennte QA.

## Chronologischer Verlauf

### Erster Prompt für AP-prokrast-06a

Der Nutzer verlangte den ersten Claude-Prompt, sowohl als Markdown-Datei als auch als kopierbaren Prompt in einem einzigen Codeabschnitt. ChatGPT erzeugte `claude_prompt_AP-prokrast-06a_symbolik-beat2_entscheidung.md`. Der Prompt schnitt AP-06a als reine Symbolik-Entscheidung: Pflichtquellen lesen, Fundstellen suchen, A/B/C/D bewerten, ein Ergebnisprotokoll schreiben, nichts bauen.

Der Nutzer beanstandete anschließend die Kopierbarkeit des Prompts. ChatGPT gab denselben Prompt erneut aus, diesmal als durchgehenden Markdown-Codeblock, ohne eingestreute normale Textabschnitte.

### Präzisierung der Prompt-Regel

Der Nutzer legte fest, dass ausführende LLMs künftig nur den jeweiligen Prompt kennen sollen, nicht den taktischen Startprompt und nicht den Fachprompt. Prompts sollten knapp, aber eigenständig ausführbar sein und nur Informationen enthalten, die „auf Gehaltsstufe“ des ausführenden LLM liegen. ChatGPT bestätigte diese Regel und speicherte sie als künftige Arbeitspräferenz.

### AP-06a-Rücklauf und erste Fehlrichtung

Claude meldete zu AP-06a Status GELB. Der Rücklauf lautete: kein A/B/C/D final gewählt, Empfehlung B streichen, Fallback D parken. Begründet wurde dies damit, dass der DOM-Haupttext im Zukunftsraum die Aussage bereits trage, ein zusätzliches ✅/❓-Iconpaar redundant sei und die ursprüngliche Form mit grünem ✅ gegen Nudging-Verbot und A11y-Vorrang verstoße.

ChatGPT schloss sich zunächst dieser Empfehlung an und sprach sich für Option B aus. Die Begründung war, dass die APP_SPEC den Screen-4-Sollstand ohne Symbolik beschreibe und die UI-Primitive-Liste keine Symbolik enthalte.

### Nutzerkorrektur: Die Symbolik war gesetzt

Der Nutzer stoppte diese Richtung. Er stellte klar, dass links und rechts von der blauen Linie genau diese beiden Symbole gewollt seien und dass dafür `FwChartTextPlugin.js` in `Theme/assets/js/fw-chart-engine/plugins` gebaut worden sei. Die Frage sei nicht mehr, ob die Symbolik bleibe, sondern wie sie spec-konform umgesetzt werde.

ChatGPT korrigierte daraufhin die Einordnung: Nicht Streichen, sondern Option A — behalten und später bauen. Es wurde festgehalten, dass die APP_SPEC diese Symbolik wieder aufnehmen müsse, bevor ein Bau-AP geschnitten werde. Der Nutzer präzisierte, dass dies eine Regression sei: Die Symbolik sei gesetzt gewesen und vor zwei APs verloren gegangen.

### Visuelle Marker statt DOM/A11y

ChatGPT formulierte zunächst, die A11y-Bedeutung werde über DOM-Haupttext abgesichert. Der Nutzer präzisierte weiter: Die Symbole seien visuelle Marker, deshalb müssten sie nicht ins DOM. Ob A11y sie mitbekomme, sei egal.

ChatGPT passte die Zieldefinition an: ✅/❓ sind rein visuelle Chart-Marker, kein DOM, keine A11y-Pflicht, keine Live-Region, kein Fokus, keine Interaktion. Der Nutzer verdichtete den Auftrag anschließend auf den Kern: Das Plugin tackert die beiden Symbole rechts und links der Linie in den Chart, unabhängig von Screensize S, M oder L. Mehr müsse gewährleistet sein.

Diese Festlegung wurde als künftige Projektregel gespeichert: `FwChartTextPlugin.js` muss die Symbole für S/M/L in den Chart setzen; sie sind visuell-only.

### AP-06b Regression-Sync

Der Nutzer beauftragte ChatGPT, den nächsten Prompt zu erstellen. ChatGPT erzeugte `claude_prompt_AP-prokrast-06b_regression-sync_symbolik-chartmarker.md`. Der Prompt schnitt AP-06b als Doku-/Spec-Sync, nicht als Bau-AP. Er erlaubte Änderungen an `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md` und einem Ergebnisprotokoll. Er verbot Codeänderungen, insbesondere an `app.js`, `app.css` und `FwChartTextPlugin.js`.

Claude stoppte beim Ausführen, weil der Prompt die Lage als Regression bezeichnete, während die zuvor gelesene Datei-Historie die Symbolik durchgängig als offen/nie entschieden dokumentiert hatte. Claude wollte nicht ins Protokoll schreiben, dass ein final entschiedener Fakt verlorengegangen sei, wenn die Dateien das nicht belegten.

ChatGPT schlug daraufhin einen Vermittlungstext vor: Claude solle weiterarbeiten, aber die Historie nicht verfälschen. Im Protokoll solle unterschieden werden zwischen Datei-/Repo-Wahrheit („offen/ungeklärt“) und Nutzer-/Produktentscheidung jetzt („Albert stellt klar, dass ✅/❓ gesetzt sind“). Der AP solle als „Korrektur durch bindende Nutzerentscheidung nach AP-06a-GELB“ oder „Spec-Sync auf jetzt bindend gesetzten Sollstand“ dokumentiert werden.

Claude führte AP-06b danach aus und meldete GRÜN. Geändert wurden `APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md`, `QA_TEST_CASES.md` und `docs/steering/patches/AP-prokrast-06b_regression-sync_symbolik-chartmarker_Ergebnis.md`. Nicht geändert wurden Code, Plugin, Engine, Strategies, Stationsdaten und BACKLOG. Ergebnis: ✅ links und ❓ rechts der blauen Rubikon-Linie wurden wieder als visuelle Chart-Marker im Soll verankert, S/M/L-Pflicht dokumentiert, kein DOM, keine A11y-Pflicht, keine Zukunftsdaten, keine Future-Line, keine Prognose. In `QA_TEST_CASES.md` entstand TC-F05.

### AP-06c Abschluss-QA

Nach dem GRÜN von AP-06b schlug ChatGPT AP-prokrast-06c als read-only Abschluss-QA vor. Der QA-AP sollte prüfen, ob APP_SPEC, Drehbuch und QA_TEST_CASES wirklich konsistent waren, ob S/M/L, `FwChartTextPlugin.js`, Nicht-DOM/Nicht-A11y, keine Zukunftsdaten/Future-Line/Prognose und Scope-Sauberkeit belegt waren.

Der Nutzer verlangte den Prompt. ChatGPT erzeugte `claude_prompt_AP-prokrast-06c_abschluss-qa_regression-sync_symbolik-chartmarker.md`. Der Prompt erlaubte nur ein neues QA-Protokoll und keine Reparaturen.

Claude führte AP-06c aus und meldete GRÜN. Die QA bestätigte alle Claims aus AP-06b: APP_SPEC enthielt ✅/❓ als aktives Screen-4-Soll und `RubikonSymbolMarkers` in der UI-Primitive-Liste; das Drehbuch behandelte Beat 2 nicht mehr als offen/ungeklärt; `QA_TEST_CASES.md` enthielt TC-F05; S/M/L, FwChartTextPlugin, keine DOM-/A11y-Pflicht und keine Zukunftsdaten/Future-Line/Prognose waren belegt. `FwChartTextPlugin.js` blieb unverändert. Ein Restsatz im Drehbuch („✅ ❓ reichen“) wurde als nicht-blockierend bewertet, weil er nur eine separate Linien-Erklärung ausschloss, nicht die vom DOM-Haupttext getragene Hauptaussage.

### AP-06d Rücklaufkapsel

Nach AP-06c schlug ChatGPT AP-prokrast-06d als Rücklaufkapsel an den Masterfaden vor. Der Nutzer verlangte den Prompt. ChatGPT erstellte `claude_prompt_AP-prokrast-06d_ruecklaufkapsel_masterfaden.md`. Der Prompt schnitt AP-06d als reinen Übergabe-AP: AP-06a/06b/06c lesen, Git-/Scope-Lage prüfen, Rücklaufkapsel schreiben, keine neue Entscheidung, kein Bau, kein Commit, kein Abschlussritual.

Claude führte AP-06d aus und meldete GRÜN. Die Rücklaufkapsel erklärte AP-prokrast-06 als abgeschlossen und abgenommen. Entscheidung: Option A — behalten und bauen, präzisiert als ✅ links und ❓ rechts der blauen Rubikon-Linie, rein visuelle Chart-Marker, S/M/L, späterer Bau über `FwChartTextPlugin.js`, kein DOM, keine A11y-Pflicht, keine Zukunftsdaten, keine Future-Line, keine Prognose, keine Interaktion, kein CTA.

Die Kapsel listete die geänderten Dateien: `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md` sowie die AP-06a–06d-Protokolle. Nicht geändert wurden `app.js`, `app.css`, `FwChartTextPlugin.js`, andere Engine-/Plugin-/Strategy-Dateien, Stationsdaten, BACKLOG, Card-to-Point, Screen-3 und CTA-Copy. Offene Punkte waren unter anderem BACKLOG AP-26, Bau `RubikonSymbolMarkers`, Farbe/optische Details, Card-to-Point, Screen-3-Timing, CTA-Copy, Mobile-Verifikation und Reduced-Motion-Bestätigung.

### Strategische Zusatznotizen

Der Nutzer fragte, ob der Rücklauf in Ordnung sei und ob ChatGPT noch etwas Strategisches hinzuzufügen habe. ChatGPT erklärte die Rücklaufkapsel für anschlussfähig und schlug nur zwei knappe Zusatznotizen für den Masterfaden vor: Beim Commit-Scope sollten unabhängige Meta-Dateien wie `.claude/session-log` und die Chronik AP-05 nicht versehentlich mitgenommen werden; AP-07 dürfe die Produktentscheidung nicht erneut öffnen, sondern solle nur `RubikonSymbolMarkers` über `FwChartTextPlugin.js` bauen, mit TC-F05 als zentralem Akzeptanztest.

## Wendepunkte

Der erste Wendepunkt trat ein, als ChatGPT nach AP-06a zunächst der Empfehlung „streichen“ folgte. Der Nutzer stoppte dies und stellte klar, dass die Symbole links und rechts der blauen Linie gesetzt seien.

Der zweite Wendepunkt war die Präzisierung der Symbolik als rein visuelle Chart-Marker. Dadurch entfielen DOM- und A11y-Anforderungen für die Symbole, und `FwChartTextPlugin.js` wurde als passender technischer Ort bestätigt.

Der dritte Wendepunkt entstand, als Claude AP-06b stoppte, weil die Bezeichnung „Regression“ nicht mit der dokumentierten Datei-Historie übereinstimmte. Die Lösung war eine doppelte Wahrheit im Protokoll: Datei-Historie offen bis AP-06a, bindende Nutzerentscheidung danach.

## Entscheidungen und Festlegungen

- Das ausführende LLM kennt künftig nur den jeweils erstellten Prompt, nicht Fachprompt oder taktischen Startprompt. Status am Ende: gültig.
- ✅/❓ werden nicht gestrichen, ersetzt oder geparkt. Status am Ende: ersetzt die AP-06a-Empfehlung.
- Gewählte Option: A — behalten und bauen. Status am Ende: gültig.
- ✅ steht links, ❓ rechts der blauen Rubikon-Linie. Status am Ende: gültig.
- Die Symbole sind rein visuelle Chart-Marker. Kein DOM, keine A11y-Pflicht, keine Live-Region, kein Fokus. Status am Ende: gültig.
- Die Platzierung muss für S, M und L gewährleistet sein. Status am Ende: gültig.
- Späterer Bau erfolgt über `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js`. Status am Ende: gültig.
- AP-06b synchronisierte APP_SPEC, Drehbuch und QA_TEST_CASES; AP-06c bestätigte dies. Status am Ende: gültig.
- Nächster empfohlener Haupt-AP: AP-prokrast-07 — Bau `RubikonSymbolMarkers` über `FwChartTextPlugin.js`. Status am Ende: Empfehlung an Masterfaden.
- BACKLOG AP-26 muss auf „entschieden, Bau offen“ nachgezogen werden. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

Die erste Fehlrichtung war die Übernahme von Claudes AP-06a-Empfehlung B („streichen“). Sie beruhte auf der Dateiwahrheit, dass APP_SPEC und UI-Primitive-Liste keine Symbolik enthielten. Der Nutzer korrigierte dies als verlorene Produktabsicht.

Ein zweiter verworfener Ansatz war die Formulierung, die A11y-Bedeutung der Icons werde über DOM-Haupttext abgesichert. Der Nutzer stellte klar, dass die Icons selbst gar keine A11y-Relevanz haben sollten. Daraus entstand die finale visuell-only-Definition.

Eine weitere Schleife betraf die Bezeichnung „Regression“. Claude wollte nicht dokumentieren, dass ein final beschlossener Fakt aus der Datei-Historie verloren gegangen sei. Die spätere Formulierung unterschied zwischen Nutzer-/Produktwahrheit und Datei-/Repo-Wahrheit.

## Erzeugte Artefakte

- `claude_prompt_AP-prokrast-06a_symbolik-beat2_entscheidung.md` – Prompt für AP-06a Produktentscheidung – Status am Ende: ausgeführt, durch spätere Nutzerentscheidung überholt.
- `AP-prokrast-06a_symbolik-beat2_entscheidung_Ergebnis.md` – Ergebnis AP-06a – Status am Ende: GELB, historischer Befund gültig, Empfehlung ersetzt.
- `claude_prompt_AP-prokrast-06b_regression-sync_symbolik-chartmarker.md` – Prompt für Doku-/Spec-Sync – Status am Ende: ausgeführt.
- `AP-prokrast-06b_regression-sync_symbolik-chartmarker_Ergebnis.md` – Ergebnis AP-06b – Status am Ende: GRÜN.
- `claude_prompt_AP-prokrast-06c_abschluss-qa_regression-sync_symbolik-chartmarker.md` – Prompt für read-only Abschluss-QA – Status am Ende: ausgeführt.
- `AP-prokrast-06c_abschluss-qa_regression-sync_symbolik-chartmarker_Ergebnis.md` – QA-Protokoll – Status am Ende: GRÜN.
- `claude_prompt_AP-prokrast-06d_ruecklaufkapsel_masterfaden.md` – Prompt für Rücklaufkapsel – Status am Ende: ausgeführt.
- `AP-prokrast-06d_ruecklaufkapsel_Ergebnis.md` – Rücklauf an Masterfaden – Status am Ende: GRÜN.
- `APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md`, `QA_TEST_CASES.md` – durch AP-06b synchronisierte Projektdokumente – Status am Ende: aktualisiert, QA-geprüft.

## Sachliche Erkenntnisse

Gesicherter Stand: Die führende Spec enthält nach AP-06b/06c wieder `RubikonSymbolMarkers` als Screen-4-Soll. `QA_TEST_CASES.md` enthält TC-F05 als Akzeptanztest für die spätere Umsetzung.

Gesicherter Stand: `FwChartTextPlugin.js` blieb unverändert und wurde als geeigneter technischer Baustein für reine Chart-/Canvas-Positionierung eingeordnet.

Gesicherter Stand: Die Symbole sind keine Datenpunkte, keine Future-Line, keine Prognose und keine Interaktion.

Gesicherter Stand: Die Symbole müssen nicht im DOM erscheinen und nicht screenreader-lesbar sein.

Arbeitsannahme: Der Bau-AP kann direkt auf APP_SPEC, Drehbuch und TC-F05 aufsetzen, ohne erneute Produktklärung.

Offene Frage: Farbe und exakte optische Details wurden nicht abschließend spezifiziert. Das alte Drehbuch nannte ✅ „grün“, der neue bindende Auftrag ließ die Farbe offen.

## Offene Punkte am Ende

- BACKLOG AP-26 auf „entschieden, Bau offen“ nachziehen.
- AP-prokrast-07 für den Bau von `RubikonSymbolMarkers` schneiden.
- Im Bau-AP Größe, Abstand und mögliche Farbdetails der Symbole konkretisieren.
- S/M/L visuell prüfen.
- TC-F05 nach Implementierung ausführen.
- Card-to-Point, Screen-3-Timing und CTA-Copy bleiben getrennte offene Haupt-AP-Kandidaten.
- Commit-Scope später bewusst schneiden, damit unabhängige Meta-Dateien nicht versehentlich mitgenommen werden.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte eine Spannung zwischen Datei-Wahrheit und Nutzer-/Produktwahrheit. Claude hielt an der dokumentierten Historie fest; der Nutzer stellte eine Produktabsicht klar, die in den Dateien nicht mehr abgebildet war.

Für spätere Musteranalyse vormerken: Eine LLM-Empfehlung auf Basis der vorhandenen Quellen führte in eine fachlich unerwünschte Richtung, obwohl sie innerhalb der Datei-Historie nachvollziehbar war.

Für spätere Musteranalyse vormerken: Die Klärung „visuelle Marker, nicht DOM/A11y“ reduzierte Scope und verhinderte zusätzliche technische und semantische Anforderungen.

Für spätere Musteranalyse vormerken: Der Stopp von Claude bei AP-06b verhinderte eine verfälschte Historisierung und führte zu einer präziseren Protokollsprache.

## Bewusst ausgelassen

Ausgelassen wurden reine Bedienmeldungen, doppelte Prompt-Ausgaben ohne inhaltliche Änderung, Download-Hinweise, Toolstatus ohne Einfluss auf den Verlauf und wiederholte Statusformeln. Ebenfalls verdichtet wurden die vollständigen Prompt-Texte; aufgenommen wurden nur ihre Funktion, Scope-Grenzen und die daraus entstandenen Artefakte.
