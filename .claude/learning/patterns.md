# Patterns — Finanzwesir 2.0
Stand: 2026-05-18 | Muster mit ≥2 Belegen (Normal) oder ≥1 Beleg (High-Impact) werden Kandidaten. Nur Alberts OK → Promotion.

---

## Bereits promoted (Bestand)

- feedback_arbeitsweise.md → promoted
- feedback_sprache_kein_denglisch.md → promoted
- feedback_surgical_check.md → promoted (Distill 2026-05-09: Kandidat B bestätigt, Beleg bereits dokumentiert)
- feedback_ankuendigung_ohne_ausfuehrung.md → promoted 2026-05-09
- feedback_strukturannahmen.md → promoted 2026-05-09
- project_audit_trail.md → promoted 2026-05-09
- feedback_review_als_datei.md → promoted 2026-05-09
- feedback_nummerierung.md → promoted 2026-05-09
- feedback_verifikation_vor_output.md → promoted 2026-05-10 (Distill 2: Zahlen/Referenzen vor Output gegen Quelle prüfen — 2 Belege AF-07 + APP-01-spec)
- feedback_pilot_status_sprache.md → promoted 2026-05-10 (Distill 2: PREF AF-08 — „Arbeitsfassung" statt „freigegeben" bei Pilot-Artefakten)
- feedback_verbote_explizit_formulieren.md → promoted 2026-05-10 (Distill 2: PREF AF-08 — Verbote als Verbote formulieren)
- feedback_glob_vs_read.md → promoted (Bekannte Pfade direkt lesen, nie Glob) | Reoccurrence 2026-05-10 (APP-01-spec-gate: Glob bei bekanntem Pfad SECURITY-BASELINE.md → Albert korrigierte)

---

## Kandidaten

<!-- Einträge aus /distill — Claude schlägt vor, Albert bestätigt j/n/anpassen -->

---

## Observing (≥1 Beleg, noch kein Kandidat)

- Erstanalyse zu konservativ: „das Beste, keine Scheu vor Umbauten" (CLAUDE.md v2.0 Analyse, 2026-05-08) — 1 Beleg, Normal
- Abhängigkeit zwischen Schritten beim Planen übersehen (CLAUDE.md v2.0 Neubau, 2026-05-08) — 1 Beleg, Normal
- Optionsliste ohne Qualitätseinschätzung präsentiert → strategische Klärung nötig (ST-03+ST-04, 2026-05-09) — 1 Beleg, Normal
- Kontext-Überlauf vor Abschluss-Ritual — Session musste mit Zusammenfassung fortgesetzt werden; Abschluss-Ritual erst im Folgekontext (DIST-01, 2026-05-09) — 1 Beleg, Normal
- JSON/Code-Syntaxfehler nach eigenem Edit unbemerkt — fehlendes Komma durch eigenen Edit eingeführt, erst durch Albert benannt (APP-01-spec, 2026-05-10) — 1 Beleg, Normal
- Haiku-Trigger fehlte: Bulk-Write nicht proaktiv mit Haiku ausgeführt (AF-10, 2026-05-10) — resolved: als CLAUDE.md-Regel institutionalisiert (ST-06)
- [A] Whitespace vor Edit geraten statt Read — Edit-Whitespace-Pattern geraten (2 Leerzeilen erwartet, 1 vorhanden) → Edit fehlgeschlagen, Read bei Offset, Retry erfolgreich (AF-12, 2026-05-18) — 1 Beleg, Normal
- [B] Falsches Shell-Tool aufgerufen — Bash-Tool mit Add-Content (PowerShell-Syntax) aufgerufen → Fehler → PowerShell-Tool korrekt (AF-12, 2026-05-18) — 1 Beleg, Normal
- [C] Kontext-Komprimierung vor Abschluss — Abschlussphase musste aus Zusammenfassung wiederaufgenommen werden; Signal: /uebergabe früher starten (AF-12, 2026-05-18) — 1 Beleg, Normal
- [D] Slice-Plan zu früh ohne vollständige Testszenarien — 4 Präzisierungslücken (Container-Selektor, Szenarien C/D/E, Edge-Cases) → 4 Korrekturen auf Alberts Anweisung (APP-01, 2026-05-11) — 1 Beleg, Normal

---

## Retired (abgelehnte Muster)

- KI-Tool-Präferenz (Perplexity > ChatGPT > Gemini) — retired 2026-05-09 | Grund: Einzelpräferenz, kein universelles Verhaltensmuster
- Klassifizierungsbaum bleibt in CLAUDE.md — retired 2026-05-09 | Grund: bereits in CLAUDE.md verankert, kein separates Memory nötig
