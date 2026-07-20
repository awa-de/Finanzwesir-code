# Patterns — Finanzwesir 2.0
Stand: 2026-07-20 | Distill 12 | Muster mit ≥2 Belegen (Normal) oder ≥1 Beleg (High-Impact) werden Kandidaten. Nur Alberts OK → Promotion.

---

## Bereits promoted (Bestand)

- feedback_arbeitsweise.md → promoted
- feedback_sprache_kein_denglisch.md → promoted
- feedback_surgical_check.md → promoted (Distill 2026-05-09: Kandidat B bestätigt, Beleg bereits dokumentiert)
- feedback_ankuendigung_ohne_ausfuehrung.md → promoted 2026-05-09
- feedback_strukturannahmen.md → promoted 2026-05-09 | Reoccurrence 2026-06-03 (NAVIGATION.md-Text-Referenz) | Reoccurrence 2026-06-04 (CSVParser-Pfad: fw-chart-engine/*.js statt data/) | Reoccurrence 2026-06-05 (date-Prüfung in hasRequiredColumns als toter Code angenommen) | Reoccurrence 2026-06-06 (ST-19: Write vor Zielort-Klärung gestartet) | Reoccurrence 2026-06-08 (AP-KORR-7: legacy-map Datei als leer angenommen — 349 Bytes mit Inhalt) | Reoccurrence 2026-06-10 (FwRenderer-Pfad: renderer/ statt core/ angenommen)
- project_audit_trail.md → promoted 2026-05-09
- feedback_review_als_datei.md → promoted 2026-05-09
- feedback_nummerierung.md → promoted 2026-05-09
- feedback_verifikation_vor_output.md → promoted 2026-05-10 (Distill 2: Zahlen/Referenzen vor Output gegen Quelle prüfen — 2 Belege AF-07 + APP-01-spec) | Reoccurrence 2026-06-08 (AP-KORR-6: Gate-Output nannte ARCHIV-STRATEGIE.md statt ARCHIV-INVENTAR.md → Edit fehlgeschlagen)
- feedback_pilot_status_sprache.md → promoted 2026-05-10 (Distill 2: PREF AF-08 — „Arbeitsfassung" statt „freigegeben" bei Pilot-Artefakten)
- feedback_verbote_explizit_formulieren.md → promoted 2026-05-10 (Distill 2: PREF AF-08 — Verbote als Verbote formulieren)
- feedback_glob_vs_read.md → promoted (Bekannte Pfade direkt lesen, nie Glob) | Reoccurrence 2026-05-10 (APP-01-spec-gate: Glob bei bekanntem Pfad SECURITY-BASELINE.md → Albert korrigierte)
- feedback_spec_verbote_scope.md → promoted 2026-06-03 (Distill 5: Spec-Verbote zu breit formuliert — High-Impact, 1 Beleg)
- feedback_python_powershell_tooling.md → promoted 2026-06-05 (Distill 6: Python für Datei-Inhalte, PowerShell für Dateisystem/Git — 2 Belege PREF) | Reoccurrence 2026-06-22 (Kassensturz-Archiv-Query: Tooling-Memory nicht proaktiv abgerufen — 3 LLM-Optionen präsentiert statt Python-Regel zu prüfen)
- feedback_gate_scope_dialog.md → promoted 2026-06-05 (Distill 6: Gate-Dialog als Scope-Klärungs-Kanal — 1 Beleg PREF) | Reoccurrence 2026-07-13 (AP-tailwind-02 Slice 4: makeBtn-Checker-Lücke gestoppt, 3 Optionen statt Alleinentscheidung)
- feedback_csvparser_vertrauenswuerdig.md → promoted 2026-06-05 (Distill 6: Parser-Output vollständig vertrauenswürdig — 1 Beleg PREF)
- feedback_edit_vorab_lesen.md → promoted 2026-06-05 (Distill 6: Edit-Vorab-Lesen — 2 Belege Normal)
- feedback_abschluss_ritual_timing.md → promoted 2026-06-05 (Distill 6: Abschluss-Ritual-Timing — 3 Belege Normal)
- feedback_patch_quittung_workflow.md → promoted 2026-06-15 (Distill 7: PREF OA-02-Dissens-1/2 — Patch-Quittung als committed Datei in docs/steering/patches/)
- feedback_skill_spec_klaerung_vorab.md → promoted 2026-06-15 (Distill 7: PREF SKILL-ARCHIV-01 — Präzisierungen vor dem Schreiben klären)
- feedback_engine_layer_grenzen.md → promoted 2026-06-15 (Distill 7: [P] 2 Belege — Layer-Verschmutzung in frühen Engine-Entwürfen, APP-01 Slice-4)
- feedback_arbeitsweise.md → ergänzt 2026-06-15 (Distill 7: PREF OA-02-Nachputz — Git-Commit als reiner Text, kein Staging)
- project_comp_arch.md → ergänzt 2026-06-15 (Distill 7: PREF Slice-4-Gate — config.features-Doktrin, neutrale Boolean-Flags)
- feedback_patch_quittung_workflow.md → verstärkt 2026-06-22 (Distill 8: F1+F2 beide nach Distill-7-Promotion — 2 Belege Normal → Zwei-Schritte-Pflicht + Namensregel explizit)
- feedback_sprache_kein_denglisch.md → ergänzt 2026-06-22 (Distill 8: PREF P1 — Commit-Messages: Umlaute in Claudes Text-Output sicherstellen, da Albert selbst committed)
- feedback_verbalisierung_vor_aktion.md → promoted 2026-06-29 (Distill 9: 2 Belege [L]+FRICTION2 — Ansatz verbalisieren vor Gate/Aktion; verwandt: [[feedback_gate_scope_dialog]])
- feedback_kontext_vs_tokens.md → promoted 2026-06-29 (Distill 9: PREF B1-AP-15d — Langformat für LLM-lesbare git-History; Kontext > Token-Effizienz)
- feedback_strukturannahmen.md → zusammengeführt in feedback_gruendlichkeit_vor_tempo.md, 2026-07-06 (Distill 10) — Historie (6 Reoccurrences) im neuen Dokument erhalten
- feedback_verifikation_vor_output.md → zusammengeführt in feedback_gruendlichkeit_vor_tempo.md, 2026-07-06 (Distill 10) — Historie (1 Reoccurrence) im neuen Dokument erhalten
- feedback_gruendlichkeit_vor_tempo.md → promoted 2026-07-06 (Distill 10: Zusammenlegung der beiden obigen Dateien nach 3. wiederkehrendem Versagen derselben Ursache — Commit-Status ×2 identisch am 2026-07-04 und 2026-07-06 trotz dokumentierter erster Korrektur, plus python3/python und Memory-vs-session-log als weitere Ausprägungen. Zusätzlich mechanischer Schutz für den Commit-Status-Fall in `.claude/skills/kassensturz/SKILL.md` + `.claude/skills/abschluss-ritual/SKILL.md` — dort wird git log jetzt zwingend vor jeder Commit-Status-Aussage geprüft, statt sich auf Erinnerung zu verlassen)
- feedback_test_html_dauerhaft.md → promoted 2026-07-06 (Distill 10: PREF AP-prokrast-03d — app.test.html bleibt dauerhaftes Testszenario)
- feedback_scope_auftragstreue.md → promoted 2026-07-13 (Distill 11: Kandidat 1 — 2 Belege High-Impact, AP-prokrast-12c + Regression-Reparatur KETTENMODUS)
- project_memory_portability.md → ergänzt 2026-07-13 (Distill 11: Kandidat 2 — Risiko paralleler Schreibwerkzeuge auf NAS-Repo, 2 Belege High-Impact, AP-tailwind-Fable-Runde + RITUAL-OPT-1)
- feedback_qa_ketten_status_aufhebung.md → promoted 2026-07-13 (Distill 11: PREF AP-prokrast-07d)
- feedback_explizite_anweisung_ersetzt_gate.md → promoted 2026-07-13 (Distill 11: PREF AP-prokrast-08c)
- feedback_arbeitsweise.md → ergänzt 2026-07-13 (Distill 11: PREF AP-prokrast-16c — exakte Verhaltensbeschreibung statt generischer Labels)
- feedback_tools_generisch_dauerhaft.md → promoted 2026-07-13 (Distill 11: PREF AP-prokrast-17)
- feedback_praezise_statt_absolut.md → promoted 2026-07-13 (Distill 11: PREF AP-prokrast-19)
- project_ritual_token_optimization.md → ergänzt 2026-07-13 (Distill 11: PREF RITUAL-OPT-2 — aggressive Rotation bevorzugt; zusätzlich QUESTION „Append-only/Snapshot als CLAUDE.md-Prinzip" final als retired dokumentiert)
- feedback_gruendlichkeit_vor_tempo.md → Reoccurrence 2026-07-20 nachgetragen (Distill 12: Kassensturz KW30 fand vier stale Commit-Status-Zeilen in PROJECT-STATUS.md/BACKLOG-ARCHIV.md — durch die verdrahtete Skill-Pflichtprüfung selbst gefunden, nicht von Albert)
- feedback_scope_auftragstreue.md → ergänzt 2026-07-20 (Distill 12: Kandidat „Seiteneffekte/Scope-Abweichungen proaktiv nennen" — [P2] + AP-tailwind-02 Slice 4 opacity-60, 2 Belege — bewusst hier eingehängt statt eigene Datei, Albert-Entscheidung nach LLM-Retrieval-Abwägung: gleicher Auslösekontext, weniger Fragmentierung)
- feedback_arbeitsweise.md → ergänzt 2026-07-20 (Distill 12: PREF — bei CLAUDE.md-Regelfragen begründete Einschätzung inkl. Einordnung gegen Anthropic-Guidance statt neutraler Pro/Contra-Liste)

---

## Kandidaten

<!-- Einträge aus /distill — Claude schlägt vor, Albert bestätigt j/n/anpassen -->

---

## Observing (≥1 Beleg, noch kein Kandidat)

- Erstanalyse zu konservativ: „das Beste, keine Scheu vor Umbauten" (CLAUDE.md v2.0 Analyse, 2026-05-08) — 1 Beleg, Normal
- Abhängigkeit zwischen Schritten beim Planen übersehen (CLAUDE.md v2.0 Neubau, 2026-05-08) — 1 Beleg, Normal
- Optionsliste ohne Qualitätseinschätzung präsentiert → strategische Klärung nötig (ST-03+ST-04, 2026-05-09) — 1 Beleg, Normal
- JSON/Code-Syntaxfehler nach eigenem Edit unbemerkt — fehlendes Komma durch eigenen Edit eingeführt, erst durch Albert benannt (APP-01-spec, 2026-05-10) — 1 Beleg, Normal
- Haiku-Trigger fehlte: Bulk-Write nicht proaktiv mit Haiku ausgeführt (AF-10, 2026-05-10) — resolved: als CLAUDE.md-Regel institutionalisiert (ST-06)
- [B] Falsches Shell-Tool aufgerufen — Bash-Tool mit Add-Content (PowerShell-Syntax) aufgerufen → Fehler → PowerShell-Tool korrekt (AF-12, 2026-05-18) — 1 Beleg, Normal
- [D] Slice-Plan zu früh ohne vollständige Testszenarien — 4 Präzisierungslücken (Container-Selektor, Szenarien C/D/E, Edge-Cases) → 4 Korrekturen auf Alberts Anweisung (APP-01, 2026-05-11) — 1 Beleg, Normal
- [E] Subagent-Existenzaussagen vor Write-Operationen verifizieren — Spec-Scout meldete nicht-existente Verzeichnisse; beide bereits vorhanden. Vor Write: Existenz selbst prüfen. Verwandt: [[feedback_strukturannahmen]]. (Block-B-Umbau, 2026-05-18) — 1 Beleg, Normal
- [F] JSON-Format-Vorschlag ohne Spec-Intent-Check — Datenbasis als JSON vorgeschlagen, Albert entschied auf CSV; fehlende Verifikation des Spec-Intents vor Format-Entscheidung. (APP-01 B-01, 2026-05-28) — 1 Beleg, Normal
- [G] Edit-Tool-Ablehnung beim session-log-Schreiben — Edit-Tool abgelehnt zu Sessionbeginn; sofort neu gestartet, kein Datenverlust (APP-01-Slice-3, 2026-06-05) — 1 Beleg, Normal
- [H] CSVParser-console.error-Verwirrung — TABU-Komponente loggt eigene console.error für Error-(b)-Szenarien; Albert hielt sie für Bugs; erwartetes Fangverhalten nicht erklärt (APP-01-Slice-1, 2026-06-05) — 1 Beleg, Normal
- [I] Ordnerstruktur schrittweise erweitert — msci/ → msci-world/ → index/msci-world/ zweimal erweitert; Endstruktur im Dialog statt vorab geklärt (data-raw-Infrastruktur, 2026-06-04) — 1 Beleg, Normal
- [J] Contract-Vorschau falscher Standardwert — Vorschau zeigte 1234,56 ohne EUR-Suffix; erst nach CSVParser-Analyse korrigiert (AP-DATA-01, 2026-06-04) — 1 Beleg, Normal
- [K] Externer Pfad ungeprüft übernommen — Python312\python.exe aus ChatGPT-Quelle direkt verwendet → mehrfache abgelehnte Tool-Calls; Albert klärte: python ist im PATH. Externe Umgebungsangaben vor Ausführung prüfen. (ST-19-Fix, 2026-06-06) — 1 Beleg, Normal
- [M] Stand-Datum im Hauptpatch vergessen — bei Mehrfach-Datei-Patches steht das Stand-Datum-Update nicht auf der mentalen Checkliste; separater Nachpatch nötig (OA-02-Dissens-1, 2026-06-09) — 1 Beleg, Normal
- [N] Code-Marker in Dokumentationsdateien — `// NEW`-Marker in .md-Dateien eingefügt; CLAUDE.md-Regel „im Code" gilt nicht für Doku-Dateien (OA-02-Dissens-3, 2026-06-10) — 1 Beleg, Normal
- [O] Handover-Lücke: Umgebungsabhängigkeiten fehlen — `app.test.html` brauchte Chart.js CDN-Script-Tag, nicht im Handover dokumentiert; erst beim Browser-Test erkannt (APP-01 Slice 4, 2026-06-11) — 1 Beleg, Normal
- [P2] Seiteneffekte von Patches proaktiv benennen (APP-01 Slice 5, 2026-06-15) — promoted 2026-07-20 (Distill 12, 2. Beleg AP-tailwind-02 Slice 4 → eingehängt in feedback_scope_auftragstreue.md)
- [P3] AP-Brief-Scope vor Gate klären — AP-Name „Marker + Pulse Screen 2" war zu breit; Scope erst während Umsetzung auf reinen Datenvertrag reduziert. Wenn AP-Brief mehrere Konzepte umfasst: Scope-Grenze explizit vor Gate-Start klären (B1-AP-14c1, 2026-06-18) — 1 Beleg, Normal
- [Q] Komplexere Lösung vorgeschlagen wenn einfachere verfügbar — Batch-Umbenennung §2–§18 vorgeschlagen, unnummerierter Einschub war ausreichend und chirurgischer. Vor Batch-Operationen auf Spec/Doc: strukturell einfachere Alternative prüfen. (AP-07b-mini, 2026-06-26) — 1 Beleg, Normal
- [R] „BEREITS GEBAUT" als Statuswort missverstanden — regulatorik-dashboard trug diesen Vermerk, der kein Fertigstellungsstatus war, sondern nur eine grobe Notiz; führte zu Drift-Sonderpfad AP-14a. (AP-13, 2026-06-29) — 1 Beleg, Normal
- [S] App-Kategorie fehleingeordnet — prokrastinations-preis in Kat C statt P-Sonderpfad eingeordnet, von Albert korrigiert. (AP-13/15a, 2026-06-29) — 1 Beleg, Normal
- [T] PowerShell Measure-Object -Line lieferte falsche Zeilenzahl — Messfehler, in Folge-AP geklärt, kein Fachfehler. (AP-14g, 2026-06-30) — 1 Beleg, Normal
- [U] Memory-Integritätscheck fand 8 vorbestehende Frontmatter-Fehler + 1 veraltete Prüfregel, sofort auf Alberts Wunsch repariert. (AP-16–18, 2026-07-01) — 1 Beleg, Normal
- [V] Mitgeliefertes Python-Audit-Gerüst hatte 2 Extraktionsfehler und hätte alle Standard-Apps fälschlich als ROT gemeldet — durch Wiederverwendung bewährter Extraktionsfunktionen transparent korrigiert statt blind übernommen. (AP-25, 2026-07-01) — 1 Beleg, Normal
- [W] Eigene GELB-Einschätzung (Repo-Namensdiskrepanz) vom Steuerfaden als „kein Blocker" übersteuert, in Folge-APs korrekt übernommen. (AP-prokrast-02a, 2026-07-01) — 1 Beleg, Normal
- [X] Kettenmodus-Trigger prüft nur Datumsmuster, nicht inhaltliche Gültigkeit des HOOK-META-Felds „Nächster-Schritt" — führte kurzzeitig zu falschem AP-14j-Bezug, von Albert korrigiert. Systemschwäche der /start-Sequenz, nicht nur ein Einzelfehler. (2026-07-02) — 1 Beleg, Normal
- [Y] Eigenes Testszenario hatte 2 CSS-Bugs (Layout-Overlap, Höhen-Kollision) — von Albert im Browser gefunden, korrekt als Testharness- statt Plugin-/Engine-Fehler diagnostiziert und behoben. (AP-prokrast-03d, 2026-07-02) — 1 Beleg, Normal
- [Z] Peer-Review-Beleg „Smart Update ist bereits in Screen 2 erprobt" war irreführend — der betroffene Achsen-Animationspfad wurde vor der Behauptung nie tatsächlich durchlaufen. Vor Wiederverwendung eines Belegs aus Vor-AP: prüfen, ob der konkrete Codepfad wirklich identisch durchlaufen wurde. (AP-prokrast-03f, 2026-07-02) — 1 Beleg, Normal
- [AA] Auftrag benannte einen Vorgang fälschlich als „Regression" (verlorene, bereits entschiedene Wahrheit) statt als „Korrektur nach bindender Nutzerentscheidung" — vor dem Schreiben geklärt, Historie ehrlich dokumentiert statt der falschen Rahmung gefolgt. (AP-prokrast-06b, 2026-07-04) — 1 Beleg, Normal
- [AB] Beat-2-Symbolik (✅/❓) laut Datei-Historie durchgängig offen; eigene Empfehlung „streichen" von Albert außerhalb der Datei-Historie überstimmt. (AP-prokrast-06a, 2026-07-04) — resolved: Symbole bleiben als reiner Canvas-Marker ohne DOM/A11y-Anspruch, in APP_SPEC/Drehbuch/QA_TEST_CASES verankert (AP-06b)
- [AC] M/L teilten sich zunächst eine CSS-Basisregel, brauchten aber unterschiedliche Werte — erst durch Messung bemerkt (AP-prokrast-07a/07c, 2026-07-06) — 1 Beleg, Normal
- [AD] Sequenzreparatur erzeugte eigene Zwischenregression (No-op-Bootstrap-Fix ließ den Flug ganz ausbleiben), Root Cause war Chart.js-Plugin-Lese-Verhalten (AP-prokrast-08b2, 2026-07-06) — 1 Beleg, Normal
- [AE] Erster Lösungszuschnitt fühlte sich wie Screen-Neustart an, komplette Umsteuerung während der Session nötig (AP-prokrast-10b, 2026-07-07) — 1 Beleg, Normal
- [AF] Python-Replace-Assertion schlug am eigenen Doku-Header-Prosastring an, vor Write korrigiert (AP-prokrast-17, 2026-07-09) — 1 Beleg, Normal
- [AG] Modell-Identifikationsgate widersprüchliches Signal (`/model opus` lief, Systemprompt behauptete weiterhin „Sonnet 5"), über externen Harness-Beleg statt Introspektion aufgelöst (AP-18-Start, 2026-07-10) — 1 Beleg, Normal
- [AH] BACKLOG-ARCHIV enthielt bereits eine uncommittete Zeile, die in diesem Faden nie geschrieben wurde — als bereits erledigte Vorarbeit übernommen statt dupliziert (AP-19, 2026-07-10) — 1 Beleg, Normal
- [AI] CANVAS-Write-AP (6 Engine-Dateien) wurde im Vorfaden nie ins session-log/PROJECT-STATUS/Archiv geschlossen, Lücke nachträglich geschlossen (AP-prokrast-17-FONT-CODE-A-REVIEW, 2026-07-10) — 1 Beleg, Normal
- [AJ] Diff-Plan hatte Kopf-aktualisiert-Body-alt-Drift (Vorsätze noch im Futur-Ton neben bereits gehobenem Statussatz), vor Write korrigiert (AP-prokrast-17-FONT-SPEC-HEBUNG, 2026-07-11) — 1 Beleg, Normal
- [AK] Vollständige Rohausgabe in Ergebnisdatei geschrieben, Albert wollte nur einen Einzeiler — Verifikations-Gründlichkeit überschoss das tatsächliche Doku-Bedürfnis (TESTENV-1g, 2026-07-11) — 1 Beleg, Normal
- [AL] Zwei fachliche Korrekturen durch Albert an Platzhaltern (Donut statt Torte, echte Chart-Chrome-Elemente aus FwRenderer übernehmen) (AP-tailwind-Fable-Runde, 2026-07-12) — 1 Beleg, Normal
- [AM] Vor Vorschlag einer neuen Datei/eines neuen Checks: erst gezielt `tools/` prüfen statt anzunehmen, dass nichts Passendes existiert (AP-tailwind-02 Slice 1+2, 2026-07-13) — 1 Beleg, Normal
- [AN] Bei Fokusring-/Primitive-Design zuerst prüfen, ob ein spezifischerer Vertrag existiert, bevor der allgemeine übernommen wird (CE-5a, 2026-07-15) — 1 Beleg, Normal

---

## Retired (abgelehnte Muster)

- KI-Tool-Präferenz (Perplexity > ChatGPT > Gemini) — retired 2026-05-09 | Grund: Einzelpräferenz, kein universelles Verhaltensmuster
- Klassifizierungsbaum bleibt in CLAUDE.md — retired 2026-05-09 | Grund: bereits in CLAUDE.md verankert, kein separates Memory nötig
- Geschützte Seed-Datei trotz Read-only verändert (AP-23, 2026-07-01) — retired 2026-07-06 | Grund: einmaliges Missverständnis über den Sonderfall-Workflow, sofort korrigiert (AP-23a), kein wiederkehrendes Muster
- „Append-only read-frei + Snapshot klein" als CLAUDE.md-Prinzip? (QUESTION RITUAL-OPT-1, 2026-07-12) — retired 2026-07-13 | Grund: Regelaufnahme-Schutz-Bedingung 4 (universell genug) nicht erfüllt — gilt nur für Append-only-/Snapshot-Steuerungsdateien, nicht für jede Codeänderung; Durchsetzung liegt bereits mechanisch in append-log-line.py/rotate-log.py/check-project-status-hook-meta.py; Wortlaut bereits in abschluss-ritual/SKILL.md §0.6/§3.6a/§3.7 — keine CLAUDE.md-Reife
- BOM in Sol-Rohtexten blockiert grok-paket-Frontmatter-Check (2× identisch, esg-spiegel + regulatorik-dashboard, 2026-07-19) — retired 2026-07-20 (Distill 12) | Grund (Albert): Ursache liegt bei Schreibproblemen von ChatGPT/Windows-Editor, kein Claude-Verhaltensmuster; bestehendes Prüfen-und-Blocken im Werkzeug ist bereits die richtige Reaktion, kein weiteres Memory nötig
