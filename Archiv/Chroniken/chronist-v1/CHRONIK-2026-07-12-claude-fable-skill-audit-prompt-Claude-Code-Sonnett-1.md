---
chronik_id: CHRONIK-2026-07-12-claude-fable-skill-audit-prompt-Claude-Code-Sonnett-1
datum: 2026-07-12
projekt: finanzwesir-2-0
thema: abschlussritual-token-optimierung
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [scope-drift, durchbruch, praezisierung-durch-gegenfrage, tooling-problem, annahme-verworfen]
---

# Chronik: Vom Fable-Prompt zum Umbau des Abschluss-Rituals

**Hauptgegenstand:** Der Faden begann mit der Bewertung eines Prompts für das Modell Fable und wandelte sich in einen mehrstufigen Umbau des Abschluss-Rituals und der Steuerungsdateien von Finanzwesir 2.0. Ein enforcing-Validator, drei Python-Werkzeuge und ein neues Kostenprinzip (read-freies Anhängen, Snapshot statt Log) entstanden; ein Teil der Arbeit wurde abgeschlossen und committed, ein Teil an einen Folgefaden übergeben.

## Ausgangslage

Der Nutzer legte einen Prompt vor, der ein Modell namens Fable als „ausscheidenden Principal Engineer" die Skill-Bibliothek auditieren lassen sollte. Er bat um Analyse und Verbesserung, ausdrücklich ohne den Prompt ins Verzeichnis zu schreiben. Mitgeliefert wurden empirische Nutzungsdaten (abschluss-ritual ~21 %, start ~3,0 % der Nutzung; Read ~59 % der Tool-Result-Tokens).

## Chronologischer Verlauf

### Prompt-Bewertung
Der Prompt wurde als inhaltlich stark, aber nicht Fable-tauglich beschrieben: die geforderte Urteils- und Architekturarbeit widerspreche der eigenen Modell-Routing-Regel des Prompts. Eine gestraffte Fassung mit deterministischem Inventar-Schritt, `file:line`-Evidenzpflicht und Stopp-Gate wurde vorgeschlagen.

### Verengung auf zwei Skills
Der Nutzer offenbarte, der Prompt sei die Evolutionsstufe eines einfacheren Internet-Prompts, besprochen mit ChatGPT und Perplexity. Sein Ziel: Fable solle die zwei teuersten Skills — `abschluss-ritual` und `start` — optimieren. Ein auf zwei Skills verengter, previews-only-Prompt wurde erstellt.

### Nutzungsdaten als Priors
Der Nutzer lieferte einen Nutzungs-Export. Es wurde getrennt, welche Zahlen als Priorisierungssignal taugten (u. a. abgeleitet: abschluss-ritual pro Lauf ~1,7× teurer als start) und welche Rauschen waren. Ein knapper PRIORS-Block wurde formuliert, mit dem Hinweis, dass die Aggregate keiner der zwei Skills zugeordnet seien.

### Fable-Ergebnis und Verifikation
Der Nutzer meldete, Fable habe geliefert (`ANALYSE_skill-optimierung_...md`). Die Datei wurde gelesen. Der Hauptbefund — ein HOOK-META-Feld `Nebenabschluss` sei zu ~14.000 Zeichen gewuchert — wurde gegen `PROJECT-STATUS.md` geprüft und bestätigt: das Feld stand als einzelne, sehr lange Zeile im Maschinenblock und fehlte im SessionStart-Hook-Output, wurde vom Hook also nicht geparst.

### Beginn der Umsetzung
Auf die Frage „Was machen wir damit?" entschied der Nutzer, alles umzusetzen und `Nebenabschluss` zu streichen. Schritt 1 reduzierte den HOOK-META-Block per Skript von 16.982 auf 411 Bytes. Bei der Suche nach dem im Ritual referenzierten Validator zeigte sich, dass `tools/check-project-status-hook-meta.py` nicht existierte. Der Nutzer formulierte: „Solche heimlichen Erweiterungen sind genauso schlimm wie leises Sterben." Schritt 2 baute den Validator (Feld-Whitelist, Feldlängen, Blockgröße), verdrahtete ihn unbedingt in `SKILL.md §3.6` und den Writer-Kontrakt; drei Test-Kopien (sauber / mit `Nebenabschluss` / Überlänge) bestätigten Exit-Verhalten.

### Kostenmodell und Dateiklassen
Auf die Frage nach Ersparnis und weiteren Dateien wurde das Kostenmodell benannt: teuer sei der Modell-Read, nicht der Schreibvorgang. Daraus die Unterscheidung Snapshot (klein halten) versus append-only-Log (read-frei anhängen). Auf „Wo überall einsetzen?" folgte die Regel, dass read-freies Anhängen ein Format ohne schließende Klammer verlange (Markdown/JSONL ja, JSON-Array/YAML nein).

### Rückfragen des Nutzers zu drei Artefakten
Der Nutzer fragte nach `ATTEMPT-LOG.json` (Grund für JSON), einem Patch-Ledger und der `REGRESSION-MATRIX`. Die frühere Einordnung von ATTEMPT-LOG als Append-Kandidat wurde korrigiert: es sei ein per-AP-Zustandsspeicher, JSON also passend. Der Patch-Ledger wurde nur als Regressions-Messinstrument als sinnvoll bezeichnet. Für die Matrix wurde empfohlen, sie zu behalten und Richtung Automatik zu entwickeln, nicht abzuschaffen.

### PROJECT-STATUS-Trim
Ein erster Schnitt betraf §1 (108 → 62,7 KB). Dabei zeigte sich §8 „Letzte Session" als 330-Zeilen-Log, getarnt als Snapshot-Sektion. Unter Berufung auf die Abbruchregel „Scope wächst über die Aufgabe hinaus" wurde gestoppt und der Nutzer gefragt; er gab §8 und §3 frei. Ergebnis 19,4 KB. Ein Datei-Größen-Riegel (WARN>30, FAIL>50 KB) wurde dem Validator hinzugefügt und getestet.

### BACKLOG-ARCHIV
Für das Archiv wurde die Frage Batch versus Zeile berechnet. Ergebnis: nicht batchen, sondern den Einzel-Append read-frei machen. Drei fachliche Verfahren wurden benannt (Event-Sourcing/Snapshot, Log-Rotation/LSM, Hot-Cold-Tiering). `tools/append-log-line.py` entstand; die widersprüchliche Header-Invariante „neueste zuerst (append-only)" wurde auf „append-only, neueste unten" geändert und ins Ritual verdrahtet.

### session-log-Rotation und Kollisionsprüfung
`tools/rotate-log.py` wurde gebaut. Der Nutzer fragte, ob die Hygiene-Skills `distill` und `kassensturz` dadurch beschädigt würden. Beide Skills wurden gelesen. Befund: `distill` Schritt 7 leerte den Log (verwarf Rohdaten); `kassensturz-archiv-query.py` war datumsbasiert und damit gegen die neue Reihenfolge unempfindlich. Versöhnung: `distill` Schritt 7 wurde von „löschen" auf „rotieren" geändert (Rohlog bleibt im Jahres-Segment). Der Live-Log wurde bewusst nicht rotiert, da 54 un-destillierte Einträge zuerst zu destillieren seien.

### Erster Lauf des neuen Rituals
Der Nutzer startete `/abschluss-ritual`. Als Voll-Abschluss (Pfad A) wurden session-log-Eintrag, read-freie Archiv-Zeile (erste Produktivnutzung des Tools), HOOK-META und §1-Meilenstein gesetzt; der Validator prüfte den eigenen Block (grün). Ein Folge-AP `RITUAL-OPT-2` kam ins BACKLOG, ein Memory-Fakt wurde angelegt, die Integritätsprüfung nach Ergänzung des Frontmatters grün. Eine Commit-Message im Langformat wurde ausgegeben.

### Nachprüfung der Ersparnis
Der Nutzer beobachtete, der Ritual-Lauf habe je Schritt über 7.000 Tokens und 108 Sekunden gekostet, und fragte, ob tatsächlich gespart werde. Es wurde festgehalten: dieser Lauf beweise die Ersparnis nicht; die sichtbaren Kosten stammten aus Modell-Reasoning und dem Voll-Abschluss-Inhalt, nicht aus Datei-Reads; die Ersparnis sei ein nicht gezahlter, unsichtbarer Preis und bislang geschätzt, nicht gemessen. Als Restposten wurde benannt, dass §1-Meilensteine noch Absätze waren.

### Feinschliff
Der Nutzer beauftragte (a) Ein-Zeilen-Meilensteine für §1 und (b) ein Ritual, das den Aufwand an die Schwierigkeit anpasst. §1 wurde per Wholesale-Replace auf Ein-Zeiler umgestellt (20,3 → 8,6 KB). In `SKILL.md` wurde §0.6 „Aufwand nach Schwierigkeit — Determinismus zuerst" ergänzt (Sonnet-Standard, Mechanik über Haiku/Python, kein Doppelarbeiten) sowie die §1-Snapshot-Regel; es wurde festgehalten, dass dies den bereits vorhandenen, aber wirkungslosen Merksatz §10 operationalisiere.

### Übergabe
Nach dem Commit erzeugte der Nutzer über `/uebergabe` einen Übergabeprompt für einen Folgefaden (Modell Sonnet) für die offenen Punkte inklusive `start`. Auf die Frage, ob Sonnet reiche, wurde bejaht, mit dem Vorbehalt, dass der `start`/Hook-Umbau über Gate und `PROTECTED_PATHS`-Prüfung abzusichern sei.

## Wendepunkte

- Übergang von „einen Fable-Prompt bewerten" zu „die Optimierung selbst umsetzen", nachdem Fable die Analyse geliefert hatte.
- Die Einsicht, Batching sei die falsche Optimierung; stattdessen den Einzel-Append read-frei machen.
- Die Nutzerfrage „machen wir distill/kassensturz kaputt?" löste einen Halt und die Kollisionsprüfung aus.
- Die Nutzerfrage „sparen wir wirklich?" löste die Trennung von einmaligen Baukosten und Steady-State sowie die §0.6-Regel und die §1-Ein-Zeiler aus.

## Entscheidungen und Festlegungen

- Fable-Prompt nicht ins Verzeichnis, auf zwei Skills verengt · früh · Nutzervorgabe · gültig.
- `Nebenabschluss` streichen · nach Verifikation der Dreifach-Redundanz · Nutzerentscheid · umgesetzt.
- BACKLOG-ARCHIV-Invariante „append-only, neueste unten" statt „neueste zuerst" · bei der Batch-Berechnung · datierte Zeilen machen physische Reihenfolge unerheblich · gültig.
- `distill` Schritt 7 „löschen" → „rotieren/archivieren" · nach Kollisionsprüfung · Rohlog-Erhalt für Forensik · gültig.
- `ATTEMPT-LOG` bleibt JSON · auf Nutzerfrage · Zustandsspeicher, kein Log · gültig.
- `REGRESSION-MATRIX` behalten, Richtung Automatik entwickeln · auf Nutzerfrage · gültig (Umsetzung offen).
- Ritual-Standardmodell Sonnet, Mechanik über Haiku/Python (§0.6) · im Feinschliff · gültig.
- §1 als Ein-Zeilen-Meilensteine · im Feinschliff · gültig.
- BACKLOG-ARCHIV-Jahres-Split zurückgestellt · read-frei, geringer Wert · offen.

## Irrwege, Schleifen und verworfene Ansätze

- Der erste PROJECT-STATUS-Schnitt betraf nur §1 und endete bei 62,7 KB; erst danach wurde §8 als Hauptmasse sichtbar und ein zweiter Schnitt nötig.
- Ein Trim-Skript brach zweimal ab: zunächst an einer zu strikten CRLF-Prüfung, dann an verschobenen absoluten Zeilennummern, nachdem der Editor die Datei auf CRLF umgestellt hatte. Danach wurde auf inhaltsbasierte Schnittgrenzen umgestellt.
- Ein Skript zur PROJECT-STATUS/BACKLOG-Aktualisierung enthielt ein gerades Anführungszeichen innerhalb eines deutschen Zitats, das das Python-String-Literal vorzeitig schloss; die Stelle wurde entschärft.
- Die Memory-Integritätsprüfung brach zunächst wegen fehlenden Frontmatters ab; es wurde ergänzt.
- ATTEMPT-LOG wurde anfangs als Append-Kandidat gelistet und auf Nutzerfrage als Snapshot korrigiert.
- Eine per Auswahldialog gestellte Frage zur distill-Rotation wurde vom Nutzer abgelehnt; die Fragestellung wurde daraufhin neu gefasst.

## Erzeugte Artefakte

- `tools/check-project-status-hook-meta.py` — HOOK-META-Validator inkl. Größen-Riegel — final, committed.
- `tools/append-log-line.py` — read-freies Anhängen mit Dublettensperre — final, committed.
- `tools/rotate-log.py` — Log-Rotation in Jahres-Segmente — final, committed.
- `.claude/memory/project_ritual_token_optimization.md` — Projektfakt — final, committed.
- Änderungen an `abschluss-ritual/SKILL.md` (§3.6, §3.7, §0.6, §1-Regel), `abschluss-writer.md`, `distill/SKILL.md` — final, committed.
- `PROJECT-STATUS.md` (108 → 8,6 KB), `BACKLOG-ARCHIV.md` (Invariante + RITUAL-OPT-1), `BACKLOG.md` (RITUAL-OPT-2), `session-log.md` — final, committed.
- Mehrere Fable-Prompt-Fassungen und ein Übergabeprompt — im Faden ausgegeben, nicht als Repo-Datei.
- `ANALYSE_skill-optimierung_...md` — Eingangsmaterial (Fable), vorbestehend.

## Sachliche Erkenntnisse

- `Nebenabschluss` wurde am 2026-07-01 (Commit fe7747d) eingeführt und wuchs seither, ohne vom Hook geparst zu werden; Inhalt dreifach redundant (git, BACKLOG-ARCHIV, sichtbarer Körper). Gesicherter Stand.
- Der im Ritual referenzierte Validator existierte nicht („falls Validator vorhanden"). Gesicherter Stand.
- `kassensturz-archiv-query.py` filtert datumsbasiert und ist gegen die Zeilen-Reihenfolge unempfindlich. Gesicherter Stand.
- Der Merksatz §10 enthielt das Spar-Prinzip bereits, band das Verhalten aber nicht. Gesicherter Stand.
- Höhe der Token-Ersparnis: Arbeitsannahme, aus Dateigrößen geschätzt, nicht aus Ritual-Läufen gemessen.

## Offene Punkte am Ende

- `RITUAL-OPT-2`: NAVIGATION gezielter Read, `start`/`session-start.ps1`-Umbau (PROTECTED_PATHS zuerst), REGRESSION-MATRIX-Automatik-Review.
- Messung der tatsächlichen Ersparnis an kommenden Ketten-Minimalabschlüssen steht aus.
- „Append-only read-frei + Snapshot klein" als CLAUDE.md-Prinzip: Kandidat, nicht aufgenommen.
- Optional: BACKLOG-ARCHIV-Jahres-Split, DECISION-LOG auf das Append-Tool.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: die wiederholte Ausweitung des Bearbeitungsumfangs (ein Feld → eine Sektion → mehrere Sektionen → mehrere Dateien → Ritual-Regeln); die Rolle der Nutzer-Gegenfragen als Auslöser von Halten und Prüfen; die Trennung von einmaligen Baukosten und Steady-State-Kosten; die Beobachtung, dass ein Werkzeug-Umbau zur Token-Senkung selbst Tokens verbraucht; das Verhältnis von deterministischen Skript-Schritten zu Modell-Reasoning innerhalb desselben Fadens.

## Bewusst ausgelassen

Tool-Bedien- und Wiederholungsrauschen, exakte Token- und Sekundenwerte je Einzelschritt, der volle Wortlaut der mehreren Fable-Prompt-Fassungen und des Übergabeprompts, wiederholte Patch-Quittungs-Formulierungen, sowie vollständig ersetzte Zwischenstände der PROJECT-STATUS-Schnitte (62,7 KB, 20,3 KB), soweit sie nicht einen Wendepunkt markierten.
