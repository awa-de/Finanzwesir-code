---
chronik_id: CHRONIK-2026-06-23-abschluss-ritual-tokenoptimierung
datum: 2026-06-23
projekt: finanzwesir-code
thema: abschluss-ritual-tokenoptimierung
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, praezisierung-durch-gegenfrage, tooling-problem, annahme-verworfen, vollstaendigkeit-vs-verdichtung]
---

# Chronik: Token-Optimierung des Abschluss-Rituals

**Hauptgegenstand:** Der Faden behandelte die Überarbeitung des zentralen Skills `/abschluss-ritual` im Repository `Finanzwesir-code`. Ziel war, Drift in der Projektsteuerung zu vermeiden und zugleich die Tokenkosten eines hochfrequenten Abschluss-Skills zu senken.

## Ausgangslage
Der Nutzer bat darum, bei Bedarf das Repository `Finanzwesir-code` einzubeziehen und Vorschläge zur Optimierung des Skills `abschluss-ritual` zu machen. Als Material lagen ein Peer-Review-Briefing zur Token-Optimierung und die damalige `SKILL.md` vor. Der bestehende Skill unterschied Voll-Abschluss, Ketten-Modus und Mini-Abschluss, war aber im Kettenpfad tokenintensiv, weil Modus-Erkennung, Datei-Lektüre, lange Commit-Message und verbale Ausführung Kosten erzeugten.

## Chronologischer Verlauf

### Erste Analyse und V2-Entwurf
Zunächst wurde der Vorschlag aus dem Briefing bewertet: `DEFERRED-Marker`, Context-first-Erkennung und Sonnet/Haiku-Aufgabenteilung wurden als tragfähig beschrieben. Zugleich wurde das Risiko des HOOK-META-Blocks in `PROJECT-STATUS.md` hervorgehoben. Es entstand ein erstes Paket `abschluss_ritual_v2_paket.zip` mit neuer `SKILL.md`, `abschluss-writer.md`, einem HOOK-META-Validator und einer Entscheidungsdokumentation.

### Einbezug von Perplexity und Kombination der Reviews
Der Nutzer brachte anschließend eine Perplexity-Analyse ein. Daraus wurden Gemeinsamkeiten und Einzelpositionen konsolidiert. Perplexity bestätigte DEFERRED-Marker und Context-first, verlangte aber Whitelist, Echo-Verifikation, 10-Zeilen-Fallback und Kurz-Commit-Format. Daraus entstand ein Review-Paket V2.1 mit `SKILL.md`, `abschluss-writer.md`, Entscheidungsdokument, Peer-Review-Briefing und Installationshinweisen.

### Philosophische Gegenprüfung
Der Nutzer verlangte eine erneute Prüfung unter den Blickwinkeln Advocatus Diaboli, Ockhams Rasiermesser, Via Negativa und Charlie Mungers „Invert, always invert“. Dabei wurde die V2 als zu aggressiv erkannt, weil `BACKLOG` und `BACKLOG-ARCHIV` im Kettenmodus bis zum Kettenende aufgeschoben werden konnten. Der Arbeitsstand änderte sich: Start- und steuerungskritische Dateien sollten bei jedem echten AP-Abschluss sofort aktualisiert werden. Deferred blieb nur noch für `MEMORY-CHECK`, `SPEC-CHECK` und `WORKING-FEATURES-CHECK` zulässig.

### Interaktivität statt vollständiger Autonomie
Der Nutzer präzisierte, Claude dürfe bei Unsicherheit fragen. Problematisch sei nicht Interaktion, sondern dass der Nutzer sich selbst merken müsse, welcher Abschlussmodus nötig sei. Daraus wurde eine Regel abgeleitet: Claude führt den Prozess; bei Modusunsicherheit fragt Claude; wenn die Antwort unklar bleibt, gilt Vollabschluss. Diese Änderung ersetzte die frühere Annahme, Claude müsse den Modus möglichst autonom erkennen.

### Finale Review-Schleife und Patches
Der Nutzer ließ V2.1 von Claude und Perplexity prüfen und brachte beide Reviews ein. Daraus wurden Muss-Patches und Kann-Patches tabellarisch bewertet. Übernommen wurden P1 „Ketten-Minimalabschluss“ als Terminologie, P2 Streichung der 90-Minuten-Regel, P3 NAVIGATION-Mehrdeutigkeit im Writer, P4 als einmalige BACKLOG-FAIL-Recovery, P5 als Hinweis auf Sessionwechsel mit offenen DEFERRED-Markern und P6 als BACKLOG-ARCHIV-Template. Daraus entstand ein finales Paket mit `SKILL.md`, `abschluss-writer.md`, Entscheidungsdokument und Installationshinweisen.

### Test des neuen Skills und P7
Der Nutzer berichtete, Claude habe das Abschluss-Paket einsortiert, das temporäre Verzeichnis gelöscht und anschließend das neue Abschluss-Ritual getestet. Claude behandelte die Installation als Zwischenaufgabe, las HOOK-META, prüfte NAVIGATION, schrieb einen session-log-Eintrag und erzeugte eine Commit-Message. Der Nutzer empfand den Ablauf als aufwändig. Die objektive Prüfung ergab: Es entstand kein erkennbarer Drift, aber Claude hatte sichtbar zwischen Modi oszilliert und nicht gefragt. Daraus wurde eine fehlende Kategorie abgeleitet: Infrastruktur-/Housekeeping-Aufgaben ohne AP-ID. Als P7 wurde ein neuer Pfad D „Housekeeping-Abschluss“ in den Skill eingefügt. Der `abschluss-writer` blieb unverändert.

### Chronik-Prompt als Abschluss
Am Ende brachte der Nutzer einen Chronik-Prompt ein, der als Werkzeug zur Erstellung bewertungsfreier Faden-Chroniken dienen sollte. Nachdem zunächst gefragt wurde, ob der Prompt geprüft, paketiert oder angewendet werden solle, präzisierte der Nutzer, die angehängte Anweisung sofort auf diesen Gesprächsfaden anzuwenden. Der Chronik-Prompt wurde damit zum Abschlussauftrag des Fadens.

## Wendepunkte
Ein erster Wendepunkt lag im Übergang von V2 zu V2.1: Die frühere Idee, `BACKLOG` und `BACKLOG-ARCHIV` im Kettenmodus zu deferieren, wurde verworfen. Auslöser war die erneute Prüfung unter Drift-Gesichtspunkten.

Ein zweiter Wendepunkt entstand durch die Aussage des Nutzers, Claude dürfe fragen. Damit wurde Interaktivität Teil der Sicherheitsarchitektur und Context-first wurde relativiert.

Ein dritter Wendepunkt entstand nach dem praktischen Test durch Claude. Der Ablauf machte sichtbar, dass Housekeeping ohne AP-ID nicht sauber modelliert war. Daraus entstand P7.

## Entscheidungen und Festlegungen
- `PROJECT-STATUS.md`, HOOK-META, `NAVIGATION.md`, `BACKLOG.md`, `BACKLOG-ARCHIV.md` und `session-log.md` wurden als start- und steuerungskritisch festgelegt; Status am Ende: gültig.
- Deferred wurde auf `MEMORY-CHECK`, `SPEC-CHECK`, `WORKING-FEATURES-CHECK` begrenzt; Status am Ende: gültig.
- Claude darf bei Modusunsicherheit fragen; Status am Ende: gültig.
- Der `abschluss-writer` darf nur Literal-Edits ausführen und nicht entscheiden; Status am Ende: gültig.
- Ein neuer Pfad D „Housekeeping-Abschluss“ wurde eingeführt; Status am Ende: gültig als bereitgestellte Datei, Integration durch den Nutzer offen.

## Irrwege, Schleifen und verworfene Ansätze
Die JSONL-Manifest-Idee wurde als technisch sauber, aber für Phase 1 zu schwer verworfen. Die 90-Minuten-Regel für den Kettenkredit wurde nach Peer Review gestrichen, weil sie ohne belastbaren Zeitmechanismus nicht messbar war. Die Annahme, Context-first solle möglichst autonom funktionieren, wurde ersetzt durch Rückfrage bei Unsicherheit. Die breite DEFERRED-Liste wurde durch eine enge Whitelist ersetzt. Der Versuch, die Installation des Abschluss-Pakets mit den bestehenden Modi Mini/Voll/Kette zu fassen, führte zur Ergänzung des Housekeeping-Pfads.

## Erzeugte Artefakte
- `abschluss_ritual_v2_paket.zip` – erstes V2-Paket – ersetzt.
- `abschluss_ritual_v2_1_review_paket.zip` – Peer-Review-Paket – ersetzt.
- `abschluss_ritual_final_paket.zip` – Finalpaket nach P1–P6 – durch P7 ergänzt.
- `SKILL_abschluss_ritual_FINAL_P7.md` und `abschluss_ritual_FINAL_P7.zip` – neuer Skill mit Housekeeping-Abschluss – Entwurf/finaler Kopierstand.
- `abschluss-writer_FINAL.md` – Writer nach Patches P1–P6 – finaler Stand vor P7, unverändert durch P7.
- `ABSCHLUSS-RITUAL-FINAL-ENTSCHEIDUNG.md` – Entscheidungsdokument – finaler Stand vor P7.
- Chronik-Prompt – Werkzeug zur späteren Faden-Chronik – eingebracht und angewendet.

## Sachliche Erkenntnisse
Gesicherter Stand: Der Abschluss-Skill benötigt eine Unterscheidung zwischen echten AP-Abschlüssen, Mini-Korrekturen, Voll-Abschlüssen und Housekeeping-Aufgaben. Gesicherter Stand: Tokenersparnis soll nicht durch Aufschub startkritischer Arbeit entstehen, sondern durch weniger Raten, weniger Lesen, weniger Reden und mechanische Literal-Edits. Arbeitsannahme: Der Housekeeping-Pfad reduziert die im Test beobachtete Modus-Oszillation. Offene Frage: Ob Claude den P7-Pfad im realen Einsatz knapper anwendet, blieb am Ende ungeprüft.

## Offene Punkte am Ende
Die P7-Version musste noch in das passende Verzeichnis kopiert werden. Die Anpassung des `/start`-Skills zur Erkennung offener DEFERRED-Marker wurde als eigenes späteres AP benannt, aber nicht umgesetzt. Der praktische Test des P7-Housekeeping-Pfads stand noch aus.

## Analysefähige Rohmuster
Für spätere Musteranalyse vormerken: Der Nutzer akzeptierte Interaktivität, wenn die Prozessverantwortung beim LLM blieb. Für spätere Musteranalyse vormerken: Peer Review durch mehrere LLMs führte nicht zu einer einzelnen fremden Lösung, sondern zu einer schrittweisen Verengung des zulässigen Fehlerspielraums. Für spätere Musteranalyse vormerken: Ein praktischer Test deckte einen Fall auf, der in der konzeptionellen Modellierung nicht enthalten war.

## Bewusst ausgelassen
Ausgelassen wurden Tool-Statusmeldungen, Download-Links, wiederholte Dateinamenlisten, interne Erstellungsdetails der ZIP-Dateien, reine Zustimmungssätze und Zwischenformulierungen ohne Einfluss auf den weiteren Verlauf.
