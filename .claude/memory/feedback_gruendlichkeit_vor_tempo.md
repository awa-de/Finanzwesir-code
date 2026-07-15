---
name: feedback-gruendlichkeit-vor-tempo
description: "Vor jeder Aussage über Struktur, Zahlen, Zustand oder bestehende Konvention die Quelle in diesem Moment prüfen — nie aus Erinnerung, Vorlage oder Tempo behaupten"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e7cbd7dc-2859-4d18-a3e4-fb07cad77ddd
---

Wenn eine Aussage mechanisch prüfbar ist (Datei lesen, grep, git log, zählen), wird sie in genau diesem Moment geprüft — nicht aus dem Kopf, nicht aus einer Vorlage, nicht aus einer früheren Session übernommen.

**Why:** Wiederkehrende Fehlerquelle seit Mai 2026, mind. 4 Ausprägungen — jeweils weil Tempo vor Prüfung ging. Zwei separate Memories (feedback-strukturannahmen, feedback-verifikation-vor-output) haben das trotz je mehrerer Reoccurrences nicht abgestellt — am 2026-07-06 zu dieser Datei zusammengeführt.

*Struktur/Pfade/Existenz:*
- 2026-06-03: NAVIGATION.md-Textreferenz angenommen statt verifiziert
- 2026-06-04: CSVParser-Pfad falsch angenommen (fw-chart-engine/*.js statt data/)
- 2026-06-05: hasRequiredColumns date-Prüfung fälschlich als toter Code angenommen
- 2026-06-06: Klassifizierungsbaum „bereits in /start vorhanden" — war er nicht
- 2026-06-08: legacy-map als leer angenommen — hatte 349 Bytes Inhalt
- 2026-06-10: FwRenderer-Pfad falsch angenommen (renderer/ statt core/)

*Zahlen/Referenzen:*
- 2026-05-10: Prinzipien-Zählung falsch (4 statt 2 Dateien)
- 2026-05-10: falsche O-Verweise O-02/O-03 in §4/§5 eingetragen
- 2026-06-08: Gate-Output nannte ARCHIV-STRATEGIE.md statt ARCHIV-INVENTAR.md

*Zustand/Status:*
- 2026-07-04 + 2026-07-06: Commit-Status aus PROJECT-STATUS.md/HOOK-META unreflektiert übernommen — zweimal identisch, obwohl `git log` sofort das Gegenteil zeigte
- 2026-07-09 (AP-prokrast-kdr14): HOOK-META behauptete weiterhin „AP-prokrast-15a–16c uncommitted", `git log` zeigte bereits `1357b46` als HEAD — zwischen Sessions von Albert committed, Steuerungsdatei nicht nachgezogen; vor dem Ritual per `git log --oneline -5` gefunden und korrigiert
- 2026-07-10 (AP-prokrast-17-FONT-CODE-A-REVIEW): zwei stale Commit-Status-Behauptungen in HOOK-META gegen `git log` korrigiert (Anamnese+Spec-Parität-Kette `a266cb2`, 17b–19 `8a4163a` — beide fälschlich „uncommitted")
- 2026-07-11 (AP-apptest-01/02): drei Stellen in PROJECT-STATUS.md behaupteten weiterhin „uncommitted" (TESTENV-1g, TESTENV-1eA, AP-prokrast-17-FONT-CODE-A/B+SPEC-HEBUNG), obwohl `git log` bereits vier eigene Commits zeigte — alle vier Stellen korrigiert. Diese Reoccurrence-Häufung selbst bestätigt: der mechanische Schutz (git-log-Check vor jeder Commit-Status-Aussage in kassensturz/SKILL.md + abschluss-ritual/SKILL.md) fängt den Fehler zuverlässig ab, bevor er nach außen dringt — die Drift entsteht weiterhin (Albert committed zwischen Sessions, Steuerungsdatei zieht nicht automatisch nach), aber der Check verhindert die Weitergabe der falschen Aussage.
- 2026-07-15 (AP-chart-engine-01 CE-6a Voll-Abschluss): Innerhalb derselben Session `git log` bereits korrekt für CE-6 selbst geprüft (bestätigte `93c884f` als committed) — beim anschließenden Voll-Abschluss aber sechs Steuerdateien (MEMORY, WORKING-FEATURES, session-log, NAVIGATION, BACKLOG-ARCHIV, PROJECT-STATUS) mit „CE-5-Kette noch nicht committed" beschrieben, weil die stale BACKLOG.md-Formulierung mechanisch übernommen statt der bereits im selben Gespräch gewonnene git-log-Befund erneut angewendet wurde. Erst ein expliziter zweiter `git status`-Abgleich vor dem Commit-Message-Schritt deckte den Widerspruch auf. **Neue Lehre:** Ein einmal im Gespräch verifizierter Fakt schützt nicht automatisch die nächsten zehn Textstellen, die denselben Fakt behaupten — jede Steuerdatei-Aussage zum Commit-Status einzeln gegen die eigene, bereits vorliegende git-log-Erkenntnis gegenprüfen, nicht aus der Vorlage/BACKLOG-Zeile fortschreiben.
- 2026-06-30: python3 statt python verwendet (Windows-Store-Umleitung) — Umgebungskonvention war bereits geklärt (ST-19), nicht abgerufen

*Bestehende Entscheidung/Konvention übersehen:*
- 2026-07-04: Memory-Datei angelegt statt zu prüfen, ob session-log (bereits dokumentierte Routing-Regel, project_audit_trail.md) gemeint war

**How to apply:**
- Pfad-/Struktur-Aussagen → Read/Grep, nicht erinnern.
- Zahlen/Abschnittsverweise → zählen/nachlesen, nicht schätzen.
- Status-Aussagen (committed? erledigt? vorhanden?) → git log/Datei direkt prüfen — auch wenn eine Vorlage das schon behauptet.
- Vor dem Anlegen eines neuen Artefakts prüfen, ob dafür schon eine Routing-Regel existiert.
- Gemeinsamer Auslöser ist Tempo, nicht fehlendes Wissen — diese Datei ersetzt vier Einzel-Erinnerungen durch eine Gewohnheit. Für den mechanisch prüfbaren Spezialfall Commit-Status siehe zusätzlich die feste Checkliste in `.claude/skills/kassensturz/SKILL.md` und `.claude/skills/abschluss-ritual/SKILL.md`.

Verwandt: [[feedback-glob-vs-read]]
