---
chronik_id: CHRONIK-2026-07-03-ap-prokrast-04-nebenfaden
datum: 2026-07-03
projekt: finanzwesir-prokrastination
thema: ap-prokrast-04-nebenfaden
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [missverstandene-anforderung, unklare-zustaendigkeit, vollstaendigkeit-vs-verdichtung, konzept-vs-umsetzung]
---

# Chronik: AP-prokrast-04 Nebenfaden, Prompt-Erstellung und Rücklauf

**Hauptgegenstand:** Der Faden behandelte die operative Führung von AP-prokrast-04 zur Soll-/Spec-Synchronisierung nach der Rubikon-Entscheidung. Er begann mit der Prüfung zweier Prompts, führte über die Erstellung von Claude-Prompts für AP-04a und AP-04b zur Einordnung der AP-04c-Rücklaufkapsel und endete mit der Feststellung, dass dieser Nebenfaden beendet war.

## Ausgangslage

Der Nutzer legte zwei Prompts vor: einen Fachprompt zu `AP-prokrast-04 — Soll-/Spec-Synchronisierung nach Rubikon-Entscheidung` und einen taktischen Startprompt für operative LLM-Führung. ChatGPT sollte beide lesen und in eigenen Worten wiedergeben, was die Aufgabe war und wie Fachprompt und taktischer Startprompt zusammenarbeiteten. Inhaltlich stand fest, dass AP-prokrast-03 den Screen 4 nicht als Morph- oder Achsenanimationslösung abgeschlossen hatte, sondern als stehenden Rubikon-Screen mit DOM-Overlay-Haupttext.

## Chronologischer Verlauf

### Klärung der Rollen von Fachprompt und taktischem Startprompt

ChatGPT stellte den Fachprompt als inhaltlichen Auftrag dar: AP-prokrast-04 sollte die Rubikon-Sollwahrheit in `APP_SPEC.md`, Drehbuch und Protokollen verankern, ohne App-Code zu ändern. Der taktische Startprompt wurde als Arbeitsmodus beschrieben: Anamnese zuerst, kleine APs, dreistufiger Scope, Datei-Wahrheit statt Protokollwahrheit, getrennte QA, kein Commit ohne ausdrücklichen Auftrag.

### Erstellung des AP-04a-Prompts

Der Nutzer forderte den ersten Prompt als Markdown-Datei zum Download und als 1:1 kopierbare Version in einer einzigen Codebox. ChatGPT erstellte einen ausführlichen Prompt für `AP-prokrast-04a — Soll-/Spec-Synchronisierung nach Rubikon-Entscheidung`. Der Prompt enthielt Ausgangslage, Ziel, Nicht-Ziele, Kettenposition, Vorprüfung, Scope, Write-Scope, Altlastensuche, Wiederlesen nach Write, Ergebnisprotokoll und Statuslogik.

Der Nutzer beanstandete danach, dass die kopierbare Version nicht in einer einzigen Codebox stand, sondern durch interne Codeblöcke und Website-Text zerfiel. ChatGPT gab eine korrigierte Datei `claude_prompt_AP-prokrast-04a_soll-spec-synchronisierung_v2.md` aus und stellte den Prompt als eine einzige äußere Markdown-Codebox dar.

### Präzisierung der Prompt-Anforderung

Der Nutzer fragte, ob der Prompt wirklich tokensparend formuliert gewesen sei. ChatGPT erklärte, der Prompt sei robust, aber nicht wirklich tokensparend, weil er Projektgeschichte, Scope und Statuslogik mehrfach wiederholte. Darauf präzisierte der Nutzer die Leitlinie: Das ausführende LLM kenne nur den jeweiligen Prompt, nicht Fachprompt und taktischen Startprompt. Deshalb müsse ein Prompt knapp und eng geschnitten sein, aber genug lokalen Kontext enthalten. Die Formulierung „oberhalb ihrer Gehaltsstufe“ wurde als Bild genutzt: Das ausführende LLM solle nur die Informationen erhalten, die für seine konkrete Arbeit nötig seien.

### Rücklauf AP-04a und Anpassung für AP-04b

Der Nutzer meldete `AP-prokrast-04a abgeschlossen`, Status GRÜN. Geändert worden waren `Apps/prokrastinations-preis/APP_SPEC.md` und `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`; App-Code, CSS, Stationsdaten, Engine, Plugins, Strategies, package-/lockfiles und vendor-Dateien waren nicht geändert worden. Als Kernbefund wurde genannt, dass `APP_SPEC.md` noch pauschal „Screen 4 hat keinen Chart“ enthalten hatte und dies gegen den freigegebenen Rubikon-Chart-Stand aus AP-03f–03i synchronisiert worden war.

Der Nutzer verlangte ausdrücklich, zwei Punkte festzuhalten: „die ungeklärte ✅/❓-Symbolik (Beat 2) und die unsynchronisierte QA_TEST_CASES.md (außerhalb des Write-Scopes dieses APs).“ Diese Punkte sollten im Abschlussbericht an das Master-LLM gemeldet werden. ChatGPT hielt fest, dass AP-04b wie geplant folgen sollte, aber mit der Pflicht, diese beiden Eskalationspunkte zu prüfen und für die Rücklaufkapsel zu sichern.

### Erstellung des AP-04b-Prompts

Auf Nutzer-OK erstellte ChatGPT `claude_prompt_AP-prokrast-04b_abschluss-qa_claims-vs-files.md`. Der Prompt war read-only angelegt. Er konzentrierte sich auf Claims-vs-Files-Prüfung, Scope-QA, Altlastensuche und die explizite Prüfung der beiden Eskalationspunkte. Er erlaubte als einzige Schreiboperation das Protokoll `docs/steering/patches/AP-prokrast-04b_abschluss-qa_claims-vs-files_Ergebnis.md`. Nicht-Ziele waren Reparatur, Codeänderung, `QA_TEST_CASES.md`-Sync, Produktentscheidung zu ✅/❓, Commit, Abschlussritual und AP-05.

### Rücklauf AP-04c und Frage nach dem weiteren Vorgehen

Später meldete der Nutzer, `AP-prokrast-04c` sei abgeschlossen. Die Rücklaufkapsel war GRÜN, mit einer neuen Datei `docs/steering/patches/AP-prokrast-04c_ruecklaufkapsel_Ergebnis.md`. Sie konsolidierte AP-04a und AP-04b und erklärte den Rubikon-Sollstand als synchronisiert und unabhängig bestätigt. Die beiden Eskalationspunkte wurden erneut genannt: Beat-2-Symbolik als offene Produktentscheidung und `QA_TEST_CASES.md` mit Zeile 557 „Kein Zukunftschart.“ als unsynchronisiert.

ChatGPT ordnete ein, dass AP-prokrast-04 damit operativ abgeschlossen war, und schlug als mögliche Reihenfolge vor: zuerst `QA_TEST_CASES.md`-Synchronisierung, danach Produktklärung der ✅/❓-Symbolik, danach Card-to-Point. Diese Einordnung wurde als Überlegung für den Masterfaden formuliert, nicht als Fortsetzung des Nebenfadens.

### Feststellung des Fadenendes und Begleitnotiz

Der Nutzer fragte, ob „hier jetzt Schluss“ sei. ChatGPT bestätigte, dass dieser Nebenfaden nicht den nächsten AP schneiden solle, weil er sonst die Rolle des Masterfadens übernehmen würde. Der richtige nächste Schritt sei, die AP-04c-Rücklaufkapsel in den Masterfaden zu geben.

Der Nutzer verlangte anschließend eine Markdown-Datei mit ChatGPTs Überlegungen zur Claude-Übergabekapsel für den Masterprompt. ChatGPT erzeugte die Datei `ap-prokrast-04_begleitnotiz_masterfaden_ueberlegungen.md`.

## Wendepunkte

Der erste Wendepunkt entstand, als der Nutzer die Ausgabeform des AP-04a-Prompts beanstandete. Dadurch wurde die Regel „eine einzige kopierbare Codebox“ für künftige Prompt-Ausgaben wirksam.

Der zweite Wendepunkt entstand durch die Nutzerpräzisierung zur Tokenökonomie: Nicht die gesamte Projektgeschichte sollte in Prompts übernommen werden, aber das ausführende LLM musste ohne Kenntnis der übergeordneten Prompts arbeitsfähig sein.

Der dritte Wendepunkt entstand mit dem Rücklauf aus AP-04a. Die ungeklärte ✅/❓-Symbolik und die unsynchronisierte `QA_TEST_CASES.md` wurden von offenen Punkten zu ausdrücklich weiterzureichenden Eskalationspunkten.

Der vierte Wendepunkt war die Feststellung nach AP-04c, dass der Nebenfaden nicht mehr weiterarbeiten sollte, sondern an den Masterfaden zurückgeben musste.

## Entscheidungen und Festlegungen

- AP-prokrast-04a wurde als Write-AP zur Soll-/Spec-Synchronisierung geschnitten · früh im Verlauf · auf Basis des Fachprompts · Status am Ende: gültig.
- Künftige ausführbare Prompts sollten knapp, aber lokal vollständig sein · nach Kritik am Tokenumfang · Begründung: ausführende LLMs kennen nur den promptinternen Kontext · Status am Ende: gültig.
- AP-prokrast-04b wurde als read-only Abschluss-QA geschnitten · nach AP-04a-Rücklauf · Begründung: Write-AP und QA-AP mussten getrennt bleiben · Status am Ende: gültig.
- Die Punkte ✅/❓-Symbolik und `QA_TEST_CASES.md` mussten im Master-Rücklauf erscheinen · nach Nutzeranweisung und AP-04a-Protokoll · Status am Ende: gültig.
- Der Nebenfaden sollte nach AP-04c enden · gegen Ende · Begründung: weitere AP-Schneidung gehört in den Masterfaden · Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Der erste ausgegebene AP-04a-Prompt erfüllte die gewünschte Kopierform nicht. Die Korrektur führte zur expliziten Anforderung, künftige Prompts als Download plus eine einzige kopierbare Codebox auszugeben.

Der AP-04a-Prompt war außerdem umfangreicher als vom taktischen Startprompt gefordert. Dies wurde nicht rückwirkend geändert, weil AP-04a bereits bearbeitet wurde. Für den Folgeprompt wurde daraus abgeleitet, knapper zu formulieren und nur lokalen Kontext mitzugeben.

Ein möglicher direkter Übergang zu Card-to-Point wurde nicht weiterverfolgt. Nach AP-04c wurde festgehalten, dass zunächst der Masterfaden die nächste AP-Schneidung vornehmen sollte.

## Erzeugte Artefakte

- `claude_prompt_AP-prokrast-04a_soll-spec-synchronisierung.md` – erster Claude-Prompt für AP-04a – Status am Ende: ersetzt.
- `claude_prompt_AP-prokrast-04a_soll-spec-synchronisierung_v2.md` – korrigierte kopierbare Fassung des AP-04a-Prompts – Status am Ende: verwendet.
- `claude_prompt_AP-prokrast-04b_abschluss-qa_claims-vs-files.md` – Claude-Prompt für den read-only Abschluss-QA-AP – Status am Ende: verwendet.
- `ap-prokrast-04_begleitnotiz_masterfaden_ueberlegungen.md` – Begleitnotiz mit ChatGPTs Einordnung zur AP-04c-Rücklaufkapsel – Status am Ende: final.
- `CHRONIK-2026-07-03-ap-prokrast-04-nebenfaden.md` – Chronik dieses Gesprächsfadens – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: AP-prokrast-04 wurde im Nebenfaden über AP-04a, AP-04b und AP-04c als GRÜN abgeschlossen gemeldet. Die Rubikon-Sollwahrheit wurde in `APP_SPEC.md` und Drehbuch synchronisiert und durch QA bestätigt.

Gesicherter Stand: Die zwei offenen Punkte blieben am Ende bestehen: die ungeklärte ✅/❓-Symbolik in Drehbuch Beat 2 und die unsynchronisierte `QA_TEST_CASES.md`, insbesondere die alte Formulierung „Kein Zukunftschart.“ bei TC-F01.

Arbeitsannahme: Ein Folge-AP zur `QA_TEST_CASES.md`-Synchronisierung wäre kleiner und dokumentarisch näherliegend als ein sofortiger Card-to-Point-Bau. Diese Annahme wurde als Überlegung für den Masterfaden formuliert, nicht als Entscheidung dieses Nebenfadens.

Offene Frage: Die Reihenfolge der drei Kandidaten A, B, C blieb dem Masterfaden bzw. Albert vorbehalten.

## Offene Punkte am Ende

- Die AP-04c-Rücklaufkapsel musste in den Masterfaden übernommen werden.
- Die Begleitnotiz mit ChatGPTs Überlegungen musste zusammen mit der Claude-Kapsel an den Masterprompt gegeben werden.
- Der Masterfaden musste über den nächsten Haupt-AP entscheiden.
- `QA_TEST_CASES.md` blieb unsynchronisiert.
- Die ✅/❓-Symbolik in Beat 2 blieb als Produktentscheidung offen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte eine Spannung zwischen Vollständigkeit und Verdichtung bei ausführbaren LLM-Prompts. Er zeigte außerdem, dass Ausgabeformate selbst zu arbeitsrelevanten Anforderungen werden können, wenn Kopierbarkeit Teil des Workflows ist. Ein weiterer beobachtbarer Punkt war die Trennung zwischen Nebenfaden und Masterfaden: Der Nebenfaden durfte operativ führen, musste aber am Ende stoppen, um keine neue AP-Ebene zu erzeugen.

## Bewusst ausgelassen

Ausgelassen wurden reine Bestätigungen, wiederholte Statusangaben ohne neue Zustandsänderung, Bedienrauschen zu Datei-Uploads sowie die vollständigen Langtexte der erzeugten Prompts. Beibehalten wurden nur die Bestandteile, die den Verlauf, die Entscheidungen, die offenen Punkte oder die erzeugten Artefakte veränderten.
