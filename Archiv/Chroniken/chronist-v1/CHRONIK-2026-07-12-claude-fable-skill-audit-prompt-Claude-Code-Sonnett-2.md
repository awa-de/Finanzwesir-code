---
chronik_id: CHRONIK-2026-07-12-claude-fable-skill-audit-prompt-Claude-Code-Sonnett-2
datum: 2026-07-12
projekt: finanzwesir-2-0
thema: ritual-opt-2
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [tooling-problem, annahme-verworfen, praezisierung-durch-gegenfrage, scope-drift, richtungswechsel]
---

# Chronik: RITUAL-OPT-2 — Abschluss-Ritual und /start vollständig read-frei

**Hauptgegenstand:** Fortsetzung und Abschluss der Arbeitspakete 6–9 aus RITUAL-OPT-2 (Fortsetzung von RITUAL-OPT-1), gefolgt vom formalen Voll-Abschluss-Ritual für diesen AP.

## Ausgangslage

Der Faden begann im Kettenmodus (`/start` erkannte ein frisches Kettensignal aus RITUAL-OPT-1). Der Nutzer übergab eine Zusammenfassung des Standes: RITUAL-OPT-1 hatte bereits drei Werkzeuge geliefert (`check-project-status-hook-meta.py`, `append-log-line.py`, `rotate-log.py`) und PROJECT-STATUS verkleinert. Offen aus der Übergabe waren vier Punkte: Punkt 6 (NAVIGATION.md gezielter Zeilen-Read statt Voll-Read im Ritual), Punkt 7 (`/start`/`session-start.ps1` — Haiku-Dispatch teilweise durch Hook-Regex-Felder ersetzen, vorher PROTECTED_PATHS prüfen), Punkt 8 (REGRESSION-MATRIX-Automatik-Review), sowie ein als „geringer Wert, nur wenn Zeit" markierter optionaler Punkt 9 (DECISION-LOG auf `append-log-line.py`, BACKLOG-ARCHIV-Jahres-Split). Der Nutzer wies an, für Punkt 7 mit echtem Urteil zu arbeiten, sonst reiche das Standardmodell.

## Chronologischer Verlauf

### Punkt 6 — NAVIGATION.md/BACKLOG.md read-frei machen

Claude prüfte zunächst den Wortlaut von `abschluss-ritual/SKILL.md` und stellte fest, dass dieser bereits „gezielt" statt Vollread vorschrieb — kein Wortlautfehler. Die tatsächliche Lücke lag tiefer: `abschluss-writer.md` definierte für NAVIGATION.md und BACKLOG.md Aktionen, die über das Edit-Werkzeug liefen; Edit verlangt zwingend einen vorherigen Read derselben Datei, wodurch trotz „gezielt"-Anspruch ein Voll-Read von NAVIGATION.md (18,5 KB) anfiel. Zusatzbefund: NAVIGATION.md ist überwiegend Append-only-Fließtext (Einträge werden bereits fertig mit ✅ geschrieben); ein echter 🟡→✅-Flip kam nur zweimal im gesamten File vor.

Claude schlug ein neues Werkzeug vor, `tools/replace-matched-line.py`, das eine Zeile per Substring eindeutig findet und ersetzt oder entfernt (FAIL bei 0 oder >1 Treffern). Der Nutzer stimmte zu und erweiterte den Auftrag auf BACKLOG.md gleich mit. Das Werkzeug wurde gebaut, an Scratch-Fixtures getestet (eindeutiger Remove, 0-Treffer-FAIL, eindeutiger Replace, Doppelmodus-FAIL, Mehrdeutigkeits-FAIL) und in `abschluss-writer.md` sowie `abschluss-ritual/SKILL.md` (neuer Abschnitt 3.6a) verdrahtet.

### Punkt 7 — Hook-Redesign für `/start`

Claude stellte fest, dass der Hook selbst (`session-start.ps1`) NAVIGATION/BACKLOG/BACKLOG-ARCHIV nicht liest — der Kostenblock lag im Haiku-Dispatch von `/start` Schritt 2, der nur im Kaltstart-Vollmodus läuft. Eine Dateistrukturprüfung ergab: BACKLOG.md (14,7 KB) und BACKLOG-ARCHIV.md (Größe zu diesem Zeitpunkt auf „36 KB" aus einer früheren Session geschätzt) sind saubere Markdown-Tabellen, NAVIGATION.md (18,5 KB) dagegen Fließtext, in dem AP-IDs auch beiläufig in Nachbarabsätzen auftauchen.

Claude fand zudem, dass der bisherige Skill-Wortlaut nicht eindeutig festlegte, woraus die Kennzahl „Aktive APs" für die Zählprüfung stammen sollte. Drei Designfragen wurden dem Nutzer per Rückfrage vorgelegt: (1) Quelle der Aktive-APs-Zahl, (2) ob BACKLOG.md/BACKLOG-ARCHIV.md auf Hook-Regex umgestellt werden sollen, (3) Umgang mit NAVIGATION.md. Der Nutzer entschied: BACKLOG.md-🟡-Tabelle als Quelle, Umstellung auf Hook-Regex ja, NAVIGATION.md bleibt beim Haiku-Dispatch (empfohlene, sicherste Option).

Bei der Umsetzung schlug der erste Testlauf mit `Hook-Status: DEGRADED` fehl. Ursache: Windows PowerShell 5.1 parst `.ps1`-Dateien ohne Byte-Order-Mark nicht als UTF-8, wodurch ein im Regex-Quelltext eingebettetes Mehrbyte-Emoji (🟡) bereits beim Skript-Parsen korrumpiert wurde — unabhängig vom `-Encoding UTF8` beim Lesen der Zieldatei. Der Fix bestand darin, das Emoji zur Laufzeit aus dem Codepoint zu bauen (`[char]::ConvertFromUtf32(0x1F7E1)`). Danach lief der Hook korrekt (`Aktive-APs: 5 (...)`, `Archiv-seit-Log: keine`). `start.md` wurde entsprechend angepasst: Schritt 2 dispatcht nur noch NAVIGATION.md, Schritt 3 und 5 lesen die neuen Hook-Felder direkt.

### Punkt 8 — REGRESSION-MATRIX-Automatik-Review

Claude prüfte das vorhandene Tool-Inventar (`check-test-pages.py`, `ci-token-check.js`, `rubikon-symbol-markers-diagnose.js`) und stellte fest, dass keines davon automatisiert Chart-Verhalten prüft — alle sind entweder reine Strukturchecker oder manuelle DevTools-Konsolen-Snippets. Der Befund: keiner der 20 REG-Einträge in der Matrix hat ein automatisches Gate. Ein erster Versuch, eine „Automatik-Gate?"-Spalte per Python-Skript in die Tabelle einzufügen, erzeugte eine fehlerhafte Tabelle (fehlende Pipe-Trennung zwischen alter und neuer Zelle). Der Stand wurde per `git checkout` zurückgesetzt, das Skript korrigiert und erneut ausgeführt. Ein neuer Abschnitt dokumentierte den Befund samt Begründung.

### Punkt 9 — auf Nachfrage nachgeholt

Nach Abschluss der Punkte 6–8 fragte der Nutzer, was genau „Punkt 9" beinhalte. Claude erläuterte die zwei zurückgestellten Teilaufgaben. Der Nutzer wies an, diese jetzt fertigzustellen und dabei „mit derselben Sorgfalt wie bei großen Dingen" auf mögliche Regressionen zu prüfen.

Claude stellte fest, dass `rotate-log.py` (aus RITUAL-OPT-1) auf Header-Blöcken (`##`/`###`) basiert und strukturell nicht zu BACKLOG-ARCHIV.md passt, das eine reine Markdown-Tabelle ist. Weiterer Befund: BACKLOG-ARCHIV.md dokumentiert selbst, dass ihr Altbestand vor der Append-only-Umstellung (2026-07-12) in umgekehrter chronologischer Reihenfolge steht — eine positionsbasierte „letzte N Zeilen"-Rotation hätte dort teils neuere Zeilen archiviert und ältere aktiv gelassen, was den in Punkt 7 gebauten Datumsfilter (`Archiv-seit-Log`, liest nur die aktive Datei) still falsch gemacht hätte. Claude baute stattdessen `tools/rotate-table-log.py`, das Zeilen nach Datum auswählt (global älteste zuerst), nicht nach Position, und testete dies gezielt an einem Fixture, das genau dieses Reverse-Order-Szenario nachstellte.

Ein Trockenlauf gegen die reale Datei zeigte, dass BACKLOG-ARCHIV.md tatsächlich 145,4 KB groß war — nicht die zuvor angenommenen 36 KB. Zwei Rotationsvarianten (zeilenbasiert „sanft" vs. größenbasiert „aggressiv") ergaben stark unterschiedliche Ergebnisse (133 KB vs. 27 KB aktiv), weil wenige, sehr lange Einträge den Großteil der Dateigröße ausmachten. Claude legte dies dem Nutzer per Rückfrage vor, inklusive der Feststellung, dass der ursprüngliche Token-Sparzweck der Rotation nach Punkt 7 bereits größtenteils entfallen war (der Hook liest die Datei ohnehin lokal, nicht über das Modell). Der Nutzer wählte die aggressive Variante.

Die Rotation wurde ausgeführt (219 → 12 aktive Zeilen, 207 Zeilen nach `BACKLOG-ARCHIV-2026.md`) und verifiziert: Zeilensumme stimmte exakt (12+207=219), keine doppelten IDs, beide Tabellenstrukturen intakt. Der stale gewordene Hinweistext in BACKLOG-ARCHIV.md (der noch von reversem Altbestand „oberhalb" sprach) wurde korrigiert.

Für DECISION-LOG.md stellte Claude fest, dass dessen Einträge mehrzeilige Blöcke (`## D-XX` + mehrere `####`-Abschnitte) sind, während `append-log-line.py` explizit jeden Zeilenumbruch ablehnt. Ein neues Werkzeug, `tools/append-block.py`, wurde gebaut (Blockinhalt aus separater Datei, um Shell-Escaping bei Anführungszeichen/Backticks zu vermeiden) und getestet.

Claude prüfte proaktiv, ob die Rotation `tools/kassensturz-archiv-query.py` beeinträchtigt haben könnte, da dieses Skript BACKLOG-ARCHIV.md nach einem `--since`-Datum durchsucht. Es bestätigte sich: das Skript las nur die aktive Datei; eine `--since`-Abfrage vor dem Rotations-Schnitt hätte Treffer aus dem neuen Segment stillschweigend verloren. Das reale Kassensturz-Datum (2026-07-06) fiel zufällig fast exakt auf den Rotationsschnitt und verdeckte das Problem im Moment. Das Skript wurde so erweitert, dass es zusätzlich Jahres-Segmente mit Jahr ≥ dem `--since`-Jahr einbezieht. Beim Testen dieses Fixes wurde ein zweiter, unabhängiger, vorbestehender Fehler im selben Skript entdeckt: es fehlte die in allen anderen `tools/*.py`-Skripten vorhandene UTF-8-Stdout-Kodierung, wodurch es bei AP-IDs mit Sonderzeichen (z. B. „→") abstürzte. Beide Fehler wurden behoben; eine Testabfrage `--since 2025-01-01` lieferte danach exakt 219 Treffer — dieselbe Zahl wie vor der Rotation insgesamt vorhanden war.

### Rückfrage zum Gesamtstand und Voll-Abschluss

Nach Abschluss aller vier Punkte fragte der Nutzer, ob Ritual und `/start` damit „auf dem neusten tokensparenden Weg" seien. Claude differenzierte: mehrere Pfade seien vollständig read-frei gemacht worden, die NAVIGATION.md-Extraktion in `/start` bleibe jedoch bewusst beim Haiku-Dispatch (eine vom Nutzer selbst getroffene Sicherheitsentscheidung), und einige kleine Dateien (PROJECT-STATUS-HOOK-META, Stand-Header) blieben unangetastet, da der Aufwand eines eigenen Werkzeugs den Nutzen nicht rechtfertige. Der Nutzer bestätigte, dass dies die gewünschte Antwort sei, und wies an, das Abschluss-Ritual auszuführen.

Claude bestimmte den Ritual-Modus als Pfad A (Voll-Abschluss), da RITUAL-OPT-2 zwar eine AP-ID mit BACKLOG-Eintrag hatte, aber kein bekannter Nachfolge-AP derselben Serie vorlag. Es folgten: Prüfung von `DEFINITION-OF-DONE.md` und `git log` (letzter realer Commit war RITUAL-OPT-1-Feinschliff, RITUAL-OPT-2 also noch uncommitted), Aktualisierung dreier MEMORY-Dateien, ein grüner `check-memory-integrity.py`-Lauf, Entfernen der BACKLOG.md-Zeile und Anhängen eines Archiv-Eintrags (wobei die Dublettensperre zunächst fälschlich anschlug, weil „RITUAL-OPT-2" bereits beiläufig im Stand-Header und in einer Nachbarzeile vorkam — ein präziserer Dublettenschlüssel löste dies), ein mehrzeiliger session-log-Eintrag, sowie PROJECT-STATUS/HOOK-META-Synchronisierung. Der HOOK-META-Validator schlug beim ersten Versuch fehl (Fokus-AP-Feld mit 190 Zeichen über dem Limit von 160); das Feld wurde auf 140 Zeichen gekürzt, danach lief der Validator grün. Ein abschließender Hook-Lauf bestätigte einen konsistenten Endstand.

## Wendepunkte

- Die Feststellung, dass Edit-basierte Aktionen in `abschluss-writer.md` trotz „gezielt"-Anspruch einen Voll-Read erzwangen, verschob den Fokus von Punkt 6 von einer reinen Wortlautprüfung zu einem neuen Werkzeug.
- Die Erkenntnis, dass BACKLOG-ARCHIV.md real 145,4 KB statt der angenommenen 36 KB groß war, änderte die Einschätzung der Rotationsdringlichkeit und führte zur Rückfrage nach der Rotationsvariante.
- Der Befund, dass `rotate-log.py` und `append-log-line.py` strukturell nicht zu BACKLOG-ARCHIV.md bzw. DECISION-LOG.md passen, führte zum Bau zweier neuer, spezialisierter Werkzeuge statt einer Wiederverwendung bestehender.
- Die proaktive Prüfung von `kassensturz-archiv-query.py` nach der Rotation deckte eine Regression auf, die ohne diese Prüfung unbemerkt geblieben wäre.

## Entscheidungen und Festlegungen

- NAVIGATION.md/BACKLOG.md-Schreiboperationen laufen über `replace-matched-line.py`/`append-log-line.py` statt Read+Edit — festgelegt in Punkt 6, gültig.
- „Aktive APs" wird aus BACKLOG.md's 🟡-Aktiv-Tabelle berechnet, nicht aus NAVIGATION.md — festgelegt nach Rückfrage in Punkt 7, gültig.
- BACKLOG.md/BACKLOG-ARCHIV.md-Extraktion läuft im Hook (PowerShell), NAVIGATION.md bleibt beim Haiku-Dispatch — festgelegt nach Rückfrage in Punkt 7, gültig.
- BACKLOG-ARCHIV.md wird per Datum statt Position rotiert (`rotate-table-log.py`) — festgelegt in Punkt 9 als Reaktion auf das Reverse-Order-Risiko, gültig.
- Rotationsvariante für BACKLOG-ARCHIV.md: größenbasiert/aggressiv (145→27 KB) statt zeilenbasiert/sanft — nach Rückfrage vom Nutzer entschieden, gültig, einmalig ausgeführt.
- Ritual-Modus für den Abschluss: Pfad A (Voll-Abschluss) — von Claude ohne Rückfrage bestimmt, da Kriterien eindeutig erfüllt waren.

## Irrwege, Schleifen und verworfene Ansätze

- Ein erster Ansatz, DECISION-LOG.md direkt mit `append-log-line.py` read-frei zu machen (wie in der ursprünglichen Nutzer-Übergabe vorgeschlagen), wurde verworfen, da das Werkzeug mehrzeilige Blöcke ablehnt; stattdessen wurde `append-block.py` neu gebaut.
- Ein erster Versuch, die REGRESSION-MATRIX-Tabellenspalte per Skript zu ergänzen, erzeugte eine fehlerhafte Tabelle (fehlende Pipe-Trennung); der Stand wurde per `git checkout` zurückgesetzt und das Skript korrigiert, bevor erneut geschrieben wurde.
- Die anfängliche Annahme, BACKLOG-ARCHIV.md sei rund 36 KB groß, erwies sich beim Dry-Run als falsch (145,4 KB); dies führte zu einer erneuten Rückfrage zur Rotationsvariante statt einer stillen Fortsetzung mit den ursprünglich angenommenen Parametern.
- Die Dublettensperre beim ersten Versuch, den BACKLOG-ARCHIV-Eintrag für RITUAL-OPT-2 anzuhängen, löste fälschlich aus (Substring „RITUAL-OPT-2" kam bereits beiläufig dreimal in der Datei vor); ein präziserer, zeilenanfang-spezifischer Dublettenschlüssel behob dies im zweiten Versuch.

## Erzeugte Artefakte

- `tools/replace-matched-line.py` — Neu, read-freies Ersetzen/Entfernen einer eindeutigen Zeile. Final.
- `tools/rotate-table-log.py` — Neu, datumsbasierte Rotation von Markdown-Tabellen in Jahres-Segmente. Final, einmal produktiv angewendet.
- `tools/append-block.py` — Neu, read-freies Anhängen mehrzeiliger Blöcke. Final.
- `tools/kassensturz-archiv-query.py` — Geändert: Segment-Scan ergänzt, UTF-8-Stdout-Fix. Final.
- `.claude/hooks/session-start.ps1` — Geändert: neue Felder `Aktive-APs`, `Archiv-seit-Log`; PS-5.1-Emoji-Fix. Final.
- `.claude/commands/start.md`, `.claude/agents/abschluss-writer.md`, `.claude/skills/abschluss-ritual/SKILL.md` — Geändert entsprechend der neuen Werkzeuge/Hook-Felder. Final.
- `docs/steering/engine/REGRESSION-MATRIX.md` — Geändert: neue Spalte + Audit-Abschnitt. Final.
- `docs/steering/BACKLOG-ARCHIV.md` (rotiert) und `docs/steering/BACKLOG-ARCHIV-2026.md` (neues Segment) — Final.
- `docs/steering/DECISION-LOG.md` — Geändert: Nutzungshinweis auf `append-block.py` ergänzt. Final.
- Vier Patch-Quittungen (`docs/steering/patches/PATCH-RITUAL-OPT-2-Punkt6..9-2026-07-12.md`) — Final.
- `PROJECT-STATUS.md`, `.claude/learning/session-log.md`, drei MEMORY-Dateien — Final, im Rahmen des Voll-Abschlusses aktualisiert.
- Eine Langformat-Commit-Message — erzeugt, am Fadenende noch nicht committed (Freigabe liegt beim Nutzer).

## Sachliche Erkenntnisse

- Gesicherter Stand: Windows PowerShell 5.1 parst `.ps1`-Quelldateien ohne BOM nicht als UTF-8; eingebettete Mehrbyte-Zeichen im Skript-Quelltext werden dadurch unabhängig vom Encoding beim Lesen der Zieldatei korrumpiert.
- Gesicherter Stand: Das Edit-Werkzeug erzwingt einen vorherigen Read derselben Datei — ein „gezielter" Zugriff ist über Edit allein nicht erreichbar, dafür braucht es dateibasierte Skripte.
- Gesicherter Stand: Nach der Rotation liefert `--since 2025-01-01` über `kassensturz-archiv-query.py` weiterhin exakt 219 Treffer, was Datenerhalt über die Rotation hinweg belegt.
- Arbeitsannahme (nicht abschließend geprüft): Der reale Nutzen einer weiteren BACKLOG-ARCHIV-Rotation in der Zukunft dürfte gering sein, da nach Punkt 7 kein Modellkontext mehr routinemäßig die volle Datei liest — dies wurde als Argument in der Rückfrage genannt, aber nicht weiter verifiziert.
- Offene Frage: Ob NAVIGATION.md künftig doch auf ein regexbasiertes Verfahren umgestellt werden sollte, bleibt unentschieden — die aktuelle Festlegung ist eine bewusste Risikoabwägung, kein endgültiger Ausschluss.

## Offene Punkte am Ende

- Ein realer `/start`-Lauf im frischen Faden mit Kaltstart-Vollmodus wurde nicht durchgeführt; der Hook wurde nur direkt per `powershell -File` verifiziert, nicht über den vollständigen Skill-Fluss.
- Sämtliche Änderungen dieses Fadens sind uncommitted; die Commit-Freigabe liegt beim Nutzer.
- Drei Dateien `CHRONIK-*.md` in `Archiv/Chroniken/chronist-v1/`, die nicht aus diesem Faden stammen, wurden bemerkt, aber nicht untersucht oder verändert.
- Der nächste inhaltliche Schritt nach RITUAL-OPT-2 ist am Fadenende nicht festgelegt; `AP-tailwind-02` steht als Kandidat im Raum, ohne dass der Nutzer sich festgelegt hätte.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Mehrfach traten falsche Annahmen über Dateigröße oder Werkzeug-Passung erst beim tatsächlichen Ausführen (Dry-Run, Testlauf) zutage, nicht bei der vorherigen Planung — in allen beobachteten Fällen wurde vor jeder produktiven Ausführung an einem synthetischen Fixture getestet, bevor reale Dateien verändert wurden.

Für spätere Musteranalyse vormerken: Mehrere Rückfragen im Faden entstanden nicht aus offensichtlicher Unklarheit des Auftrags, sondern aus eigener Recherche, die eine ursprünglich für eindeutig gehaltene Spezifikation (Quelle der „Aktive APs"-Zahl) als unterspezifiziert entlarvte.

## Bewusst ausgelassen

Ausführliche Zwischenausgaben der einzelnen Testläufe (vollständige Konsolen-Outputs, wiederholte Hook-Läufe mit identischem Ergebnis) sowie der vollständige Wortlaut der vier Patch-Quittungen wurden nicht referenziert, da ihr Inhalt in den Artefakten selbst erhalten bleibt und die Verdichtung hier keinen zusätzlichen Analysewert daraus gezogen hätte. Höflichkeitsfloskeln und reine Bestätigungen ohne inhaltliche Wirkung wurden ebenfalls weggelassen.
