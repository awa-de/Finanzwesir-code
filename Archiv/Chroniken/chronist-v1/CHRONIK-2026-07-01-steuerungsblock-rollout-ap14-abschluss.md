---
chronik_id: CHRONIK-2026-07-01-steuerungsblock-rollout-ap14-abschluss
datum: 2026-07-01
projekt: finanzwesir-2-0
thema: steuerungsblock-rollout-ap14-abschluss
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, sackgasse, tooling-problem, annahme-verworfen, konzept-vs-umsetzung, abbruchregel]
---

# Chronik: AP-14-Abschluss im Steuerungsblock-Rollout

**Hauptgegenstand:** Der Faden behandelte den Abschluss des Sonderfalls `regulatorik-dashboard` im Rahmen des Steuerungsblock-Rollouts. Im Verlauf wurden Seed, MINI_SPEC und Review-Prompts für AP-14g-review, AP-14h und AP-14i erzeugt, geprüft und korrigiert. Am Ende wurde der Faden nicht in Richtung APP_SPEC oder App-Bau fortgesetzt, sondern mit drei Übergabe- und Erkenntnisdateien geschlossen.

## Ausgangslage

Der Nutzer arbeitete an einem Rollout, bei dem alle `MINI_SPEC_FROM_HAUPTDOKUMENT.md`-Dateien in `Apps/` mit Steuerungsblöcken aus `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` versehen werden sollten. Aus dem vorherigen Verlauf standen zwei reguläre Batches sowie zwei Sonderfälle im Raum: `prokrastinations-preis` und `regulatorik-dashboard`. Für `regulatorik-dashboard` war die Identität nach mehreren Schritten auf `Abgabenpolitik` festgelegt worden; `ETF-Wahlurne` galt als Mechanik und Metapher, nicht als App-Identität.

## Chronologischer Verlauf

### AP-14g-review wurde als Sicherheitsprüfung eingesetzt

Der Nutzer verlangte den Prompt für AP-14g-review. ChatGPT lieferte zunächst den Downloadlink und anschließend den vollständigen Prompt in einer Kopierbox. Der Prompt sollte nicht ändern, sondern prüfen: die Blockgrenzen des Seed-Blocks, den Status `GESICHERT`, den Drift-Schutz und die Produktkosten-Pointe. Dabei wurde ausdrücklich festgelegt, dass Python als `python` und nicht als `python3` aufzurufen sei.

Nach Ausführung meldete der Nutzer AP-14g-review mit Status GRÜN. Der Seed-Block sei eindeutig, `GESICHERT` bestätigt, acht Drift-Risiken seien abgedeckt. Die Produktkosten-Aussage war vorhanden, allerdings als „beeinflusst stärker als Produktkosten“ statt „mindert Rendite oft stärker als Produktkosten“. Diese Abweichung wurde nicht als Blocker behandelt, sondern als AP-14h-Notiz.

### AP-14h sollte die MINI_SPEC neu fassen

Der Nutzer fragte, ob nach AP-14g-review ein Abschlussritual genüge oder ein Mini-Nachputz nötig sei. ChatGPT bewertete den Stand als ausreichend und empfahl Commit, Abschlussritual und neuen Faden. Anschließend verlangte der Nutzer AP-14h. ChatGPT erzeugte eine Markdown-Datei und eine Kopierfassung für einen Prompt, der die alte MINI_SPEC aus dem gesicherten Seed neu fassen sollte. AP-14h durfte `Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md` und ein Ergebnisprotokoll ändern, aber keine APP_SPEC, kein HTML und kein Altmaterial.

Der Nutzer meldete AP-14h mit Status GRÜN. Kurz darauf zeigte er jedoch eine MINI_SPEC, die weiterhin die alte Rohfassung enthielt: `Regulatorisches Risiko Dashboard`, `BEREITS GEBAUT`, `Zwei Regler`, implementierte Ausgaben und eine Wahrscheinlichkeitsmatrix. ChatGPT bewertete dies zunächst als Widerspruch zum AP-14h-Protokoll und als ROT. Der Nutzer prüfte nochmals im Dateimanager und wies darauf hin, dass im Kopf der Datei ein aktueller AP-14h-Stand stand. Daraus wurde rekonstruiert, dass Claude wahrscheinlich nur den Kopf angepasst hatte, während der alte Body stehen geblieben war.

Später legte der Nutzer eine andere Variante der MINI_SPEC vor. Diese enthielt `Abgabenpolitik` als Arbeitsidentität, `regulatorik-dashboard` als Slug, `ETF-Wahlurne` als Mechanik/Metapher, den Zwecksatz „Abgabenpolitik ... mindert Rendite oft stärker als Produktkosten“, Szenarien S0–S3, Modellgrenzen, Nicht-Ziele, Tonalitätsregeln und den Steuerungsblock mit LLM-Prüfscore. ChatGPT bewertete diese Variante als brauchbar, aber mit Notizen zu „Modell-Ergebnis, kein Fakt“, Dezimalzahlen und der Formulierung „Steuerpolitik wird indirekt an der Wahlurne entschieden“.

Der Nutzer lud die Datei anschließend hoch. Der Upload bestätigte, dass diese neue Fassung tatsächlich in der Datei stand.

### AP-14i prüfte die reale MINI_SPEC

Nach Bestätigung der Datei erzeugte ChatGPT den Prompt für AP-14i als Review- und Commit-Vorbereitungs-AP. Dieser Prompt verlangte ausdrücklich, dass die Wahrheit der aktuelle Dateiinhalt sei, nicht das AP-14h-Protokoll. AP-14i durfte die MINI_SPEC nicht ändern, sondern nur ein Ergebnisprotokoll schreiben.

Der Nutzer ließ AP-14i ausführen. Das Ergebnis war GRÜN: Die alte Rohfassung sei nicht mehr aktiv, der Steuerungsblock sei vorhanden, der LLM-Score liege bei 16/16, die Produktkosten-Pointe sei stark formuliert und doppelt abgesichert. Die MINI_SPEC wurde nicht mehr geändert. Der Nutzer commitete AP-14h/i.

### AP-14j wurde begonnen und dann verworfen

Nach dem Commit verlangte der Nutzer zunächst AP-14j. ChatGPT begann einen Prompt zur APP_SPEC-Vorbereitung und zum Scope-Schnitt zu erzeugen. Währenddessen stellte der Nutzer klar, dass die MINI_SPEC-Arbeit damit genüge. Er wolle keine große APP_SPEC, weil dies der Beginn des App-Baus wäre. Die eigentliche Aufgabe des Fadens sei weiterhin, alle MINI_SPECs in den Unterverzeichnissen von `Apps/` mit Steuerungsblöcken aus der Seed-Datei zu versehen.

ChatGPT korrigierte die Richtung: AP-14j sollte gestrichen werden. AP-14 sei mit AP-14i abgeschlossen. Der nächste Schritt solle nicht APP_SPEC oder App-Bau sein, sondern der Rollout-Status der übrigen Apps. Als möglicher nächster AP wurde zunächst eine Inventur vorgeschlagen. Der Nutzer erinnerte daran, dass eine solche Inventur wahrscheinlich bereits am Anfang des Fadens stattgefunden hatte. Darauf wurde die Formulierung präzisiert: nicht neue Inventur, sondern `AP-16 — Steuerungsblock-Rollout Statusabgleich und Restliste`.

### Der Faden wurde bewusst geschlossen

Der Nutzer fragte, ob hier Schluss gemacht werden solle und schlug drei Abschlussartefakte vor: einen fachlichen Übergabeprompt für ein neues LLM, Erkenntnisse zur Verbesserung des taktischen Startprompts und Erkenntnisse zum tokensparsamen Arbeiten mit Python, Haiku und Sonnet. ChatGPT bewertete dies als besseren Schnitt und erzeugte drei Markdown-Dateien:

- `fachlicher_uebergabeprompt_neuer_faden_steuerungsblock_rollout.md`
- `erkenntnisse_taktischer_startprompt_verbesserung.md`
- `erkenntnisse_tokensparsam_arbeiten_python_haiku_sonnet.md`

Damit wurde der Faden fachlich geschlossen, ohne in APP_SPEC oder App-Bau überzugehen.

## Wendepunkte

Der erste Wendepunkt entstand, als AP-14h zunächst GRÜN meldete, die tatsächlich sichtbare MINI_SPEC aber weiterhin die alte Rohfassung zeigte. Dadurch wurde die Regel gestärkt, dass nicht das Protokoll, sondern die reale Datei maßgeblich ist.

Ein zweiter Wendepunkt entstand, als der Nutzer die echte neue MINI_SPEC hochlud. Damit wurde aus dem ROT-Verdacht wieder ein akzeptierter AP-14h-Stand, der durch AP-14i überprüft wurde.

Ein dritter Wendepunkt entstand, als AP-14j in Richtung APP_SPEC-Vorbereitung lief und der Nutzer diese Richtung stoppte. Danach wurde der Faden wieder auf den ursprünglichen Rollout-Zweck zurückgeführt.

## Entscheidungen und Festlegungen

`regulatorik-dashboard` wurde als MINI_SPEC-Sonderfall abgeschlossen. Status am Ende: gültig.

`Abgabenpolitik` blieb die Arbeitsidentität. `ETF-Wahlurne` blieb Mechanik und Metapher. Status am Ende: gültig.

Die Produktkosten-Pointe „Abgabenpolitik mindert Rendite oft stärker als Produktkosten“ blieb erhalten, musste aber durch Szenario- und Modellkontext abgesichert werden. Status am Ende: gültig.

APP_SPEC und App-Bau wurden für diesen Faden ausgeschlossen. Status am Ende: gültig.

AP-14j wurde verworfen. Status am Ende: verworfen.

Der nächste fachliche Anschluss wurde als Statusabgleich und Restliste für den Steuerungsblock-Rollout bestimmt, nicht als neue Inventur und nicht als App-Bau. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

Ein Irrweg bestand in der Annahme, AP-14h sei allein aufgrund des Ergebnisprotokolls abgeschlossen. Die Kontrolle des Dateiinhalts zeigte zunächst einen Widerspruch. Später wurde durch den Upload der neuen Datei geklärt, dass die brauchbare Fassung tatsächlich existierte.

Ein weiterer Irrweg bestand in der beginnenden AP-14j-Richtung. Diese öffnete APP_SPEC-Scope, obwohl der Nutzer nur die Steuerungsblock-Befüllung der MINI_SPECs verfolgen wollte. Der Ansatz wurde verworfen.

Die vorgeschlagene neue Inventur wurde ebenfalls relativiert. Da am Anfang des Fadens offenbar bereits eine Inventur oder Batchplanung existierte, sollte nicht neu erfunden, sondern die vorhandene Planung wieder aufgenommen und abgeglichen werden.

## Erzeugte Artefakte

- `claude_prompt_AP-14g-review_regulatorik-dashboard_seed-review-commit-vorbereitung.md` – Review-Prompt für den Seed-Block – Status am Ende: verwendet.
- `claude_prompt_AP-14h_regulatorik-dashboard_minispec-neufassung-aus-seed.md` – Prompt zur MINI_SPEC-Neufassung – Status am Ende: verwendet.
- `claude_prompt_AP-14i_regulatorik-dashboard_minispec-review-app-fabrik-readiness-commit-vorbereitung.md` – Review-Prompt für die reale MINI_SPEC – Status am Ende: verwendet.
- `MINI_SPEC_FROM_HAUPTDOKUMENT.md` für `regulatorik-dashboard` – Seed-basierte MINI_SPEC mit Steuerungsblock – Status am Ende: final im Faden, committed.
- `fachlicher_uebergabeprompt_neuer_faden_steuerungsblock_rollout.md` – Übergabe an neuen Faden – Status am Ende: final.
- `erkenntnisse_taktischer_startprompt_verbesserung.md` – Startprompt-Erkenntnisse – Status am Ende: final.
- `erkenntnisse_tokensparsam_arbeiten_python_haiku_sonnet.md` – Tokenarbeits-Erkenntnisse – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: Ergebnisprotokolle können falsch positiv sein. Dateiinhalt muss nach Schreiboperationen erneut gelesen und gegen Marker sowie Altlasten geprüft werden.

Gesicherter Stand: Ein aktualisierter Dateikopf beweist nicht, dass der Body ersetzt wurde.

Gesicherter Stand: Sonderfälle im MINI_SPEC-Rollout bedeuten nicht, dass die betroffenen Apps anschließend gebaut werden.

Gesicherter Stand: Python eignet sich für deterministische Prüfungen, Haiku für günstige Vorstrukturierung und Sonnet für finale redaktionelle Entscheidungen.

Arbeitsannahme: Zwei reguläre Batches und zwei Sonderfälle waren abgeschlossen. Die genaue Restliste der offenen Apps sollte im neuen Faden aus bestehenden Protokollen rekonstruiert oder bestätigt werden.

## Offene Punkte am Ende

Die vollständige Restliste der noch offenen Apps lag am Ende nicht im Faden als geprüfte Tabelle vor.

Die vorhandene frühe Inventur oder Batchplanung musste im Repo wiedergefunden und gegen AP-12, AP-13, AP-14 und AP-15 abgeglichen werden.

Ein neuer Faden sollte mit dem Übergabeprompt starten und den Steuerungsblock-Rollout fortsetzen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ergebnisprotokoll und Dateiinhalt fielen zeitweise auseinander.

Für spätere Musteranalyse vormerken: Scope driftete kurzfristig von MINI_SPEC-Rollout zu APP_SPEC-Vorbereitung und wurde durch den Nutzer korrigiert.

Für spätere Musteranalyse vormerken: Sonderfälle erzeugten die Gefahr, als Beginn eines App-Baus missverstanden zu werden.

Für spätere Musteranalyse vormerken: Der Nutzer bevorzugte am Ende einen sauberen Fadenschnitt mit Übergabeartefakten statt weiterer operativer APs.

## Bewusst ausgelassen

Ausgelassen wurden Downloadlink-Wiederholungen, reine Kopierbox-Anforderungen ohne neue inhaltliche Entscheidung, technische Toolmeldungen ohne Einfluss auf den Arbeitsstand und Statusformulierungen, die später vollständig durch Datei- oder Uploadprüfungen ersetzt wurden.
