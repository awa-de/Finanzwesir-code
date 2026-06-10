# Memory — Finanzwesir 2.0
<!-- Index-Datei. Einträge max. 200 Zeilen. Jeder Eintrag eine Zeile. -->
<!-- Ort: .claude/memory/ (Nextcloud + git). Nicht in ~/.claude/ — kein Auto-Load durch Harness. -->
<!-- /start liest diese Datei in Schritt 1b. Einzelne Files bei Bedarf nachladen. -->
<!-- MERGE-HINWEIS: Auf Heim-PC mit ~/.claude/projects/.../memory/ abgleichen (ST-18). -->

- [Arbeitsweise](feedback_arbeitsweise.md) — Sachlich-direkter Arbeitsstil, kein Smalltalk, Ergebnis zuerst
- [Kein Denglisch](feedback_sprache_kein_denglisch.md) — Nur reines Deutsch, keine englischen Einschübe wenn deutsches Äquivalent existiert
- [Surgical Check](feedback_surgical_check.md) — Nur ändern was direkt zum Auftrag gehört, keine opportunistischen Verbesserungen am Nachbarcode
- [Ankündigung = Ausführung](feedback_ankuendigung_ohne_ausfuehrung.md) — Was angekündigt wird ausführen, was ausgeführt wird ankündigen
- [Strukturannahmen](feedback_strukturannahmen.md) — Pfade und Strukturen immer aus aktuellem Stand lesen, nie annehmen (reoccurrences 2026-06-03/04/05)
- [Audit Trail](project_audit_trail.md) — Jede Entscheidung dokumentieren: DECISION-LOG (architektonisch) oder session-log (operativ)
- [Review als Datei](feedback_review_als_datei.md) — Gate-Reports und Reviews als committed Files ablegen, nicht nur Chat-Output
- [Nummerierung](feedback_nummerierung.md) — AP-IDs und Distill-Kandidaten nach Projekt-Schema (APP-01, ST-16, A/B/C...)
- [Verifikation vor Output](feedback_verifikation_vor_output.md) — Zahlen und Referenzen gegen Quelle prüfen bevor ausgegeben
- [Pilot-Status-Sprache](feedback_pilot_status_sprache.md) — Pilot-Artefakte als „Arbeitsfassung" bezeichnen, nie als „freigegeben"
- [Verbote explizit](feedback_verbote_explizit_formulieren.md) — Verbote als Verbote formulieren, keine Weichzeichner bei echten Grenzen
- [Glob vs. Read](feedback_glob_vs_read.md) — Bekannter Pfad → sofort Read verwenden, nie Glob als Sicherheitsnetz
- [Spec-Verbote scopten](feedback_spec_verbote_scope.md) — Spec-Verbote präzise scopten, nicht so breit dass legitime Use-Cases ausgeschlossen werden
- [Python/PowerShell](feedback_python_powershell_tooling.md) — Python für Datei-Inhalte, PowerShell für Dateisystem/Git
- [Gate als Scope-Dialog](feedback_gate_scope_dialog.md) — Gate-Dialog aktiv zur Scope-Klärung nutzen, nicht nur Checkliste abarbeiten
- [CSVParser vertrauen](feedback_csvparser_vertrauenswuerdig.md) — CSVParser-Output vollständig vertrauen, keine sekundäre Validierung
- [Edit vorab lesen](feedback_edit_vorab_lesen.md) — Datei immer mit Read lesen bevor Edit verwendet wird
- [Abschluss-Ritual-Timing](feedback_abschluss_ritual_timing.md) — Abschluss-Ritual sofort nach AP-Fertigstellung anbieten, nicht auf Alberts Initiative warten
- [Archivstrategie](project_archivstrategie.md) — Dreiteilung: Aktive Dateien / Archiv (versioniert) / Git; `Archiv/local/` gitignored für Rohmaterial, LLM-Dumps, Binärdateien
- [Git-Staging durch Albert](feedback_git_staging.md) — Claude liefert Commit-Message nur als reinen Text, kein git add/commit; Albert staged und committed selbst
