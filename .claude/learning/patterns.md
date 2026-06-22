# Patterns — Finanzwesir 2.0
Stand: 2026-06-22 | Muster mit ≥2 Belegen (Normal) oder ≥1 Beleg (High-Impact) werden Kandidaten. Nur Alberts OK → Promotion.

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
- feedback_python_powershell_tooling.md → promoted 2026-06-05 (Distill 6: Python für Datei-Inhalte, PowerShell für Dateisystem/Git — 2 Belege PREF)
- feedback_gate_scope_dialog.md → promoted 2026-06-05 (Distill 6: Gate-Dialog als Scope-Klärungs-Kanal — 1 Beleg PREF)
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
- [L] Riskante Operation ohne Vorbriefing gestartet — Albert stoppte vor NAVIGATION.md-Edit: „Erkläre erst in eigenen Worten." Nach Erklärung Freigabe. Bei signifikanten Edits erst Absicht verbalisieren, dann ausführen. Verwandt: [[feedback_gate_scope_dialog]]. (Archiv/local/-Verschiebung, 2026-06-08) — 1 Beleg, Normal
- [M] Stand-Datum im Hauptpatch vergessen — bei Mehrfach-Datei-Patches steht das Stand-Datum-Update nicht auf der mentalen Checkliste; separater Nachpatch nötig (OA-02-Dissens-1, 2026-06-09) — 1 Beleg, Normal
- [N] Code-Marker in Dokumentationsdateien — `// NEW`-Marker in .md-Dateien eingefügt; CLAUDE.md-Regel „im Code" gilt nicht für Doku-Dateien (OA-02-Dissens-3, 2026-06-10) — 1 Beleg, Normal
- [O] Handover-Lücke: Umgebungsabhängigkeiten fehlen — `app.test.html` brauchte Chart.js CDN-Script-Tag, nicht im Handover dokumentiert; erst beim Browser-Test erkannt (APP-01 Slice 4, 2026-06-11) — 1 Beleg, Normal
- [P2] Seiteneffekte von Patches proaktiv benennen — Albert war besorgt wegen Fetch-Cache-Verlust, weil Seiteneffekte nicht erklärt wurden; erst auf Nachfrage bestätigt. Bei Patches die Verhalten berühren das andere Komponenten nutzen: Seiteneffekte proaktiv im Patch-Echo nennen (APP-01 Slice 5, 2026-06-15) — 1 Beleg, Normal
- [P3] AP-Brief-Scope vor Gate klären — AP-Name „Marker + Pulse Screen 2" war zu breit; Scope erst während Umsetzung auf reinen Datenvertrag reduziert. Wenn AP-Brief mehrere Konzepte umfasst: Scope-Grenze explizit vor Gate-Start klären (B1-AP-14c1, 2026-06-18) — 1 Beleg, Normal

---

## Retired (abgelehnte Muster)

- KI-Tool-Präferenz (Perplexity > ChatGPT > Gemini) — retired 2026-05-09 | Grund: Einzelpräferenz, kein universelles Verhaltensmuster
- Klassifizierungsbaum bleibt in CLAUDE.md — retired 2026-05-09 | Grund: bereits in CLAUDE.md verankert, kein separates Memory nötig
