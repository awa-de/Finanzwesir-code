PATCH-QUITTUNG | AP RITUAL-OPT-2 (Punkt 8 — REGRESSION-MATRIX Automatik-Review) | 2026-07-12

**Beauftragt:** Je REGRESSION-MATRIX-Eintrag markieren, ob bereits ein automatisches Gate existiert. Die manuelle Testversicherung soll bewusst erhalten bleiben, nicht abgeschafft werden — es geht um eine ehrliche Bestandsaufnahme, nicht um Streichung.

**Befund:** Kompletter Tool-Inventar-Check (`tools/`) durchgeführt. Ergebnis: **kein einziger** der 20 REG-*-Einträge hat ein automatisches Gate.
- `check-test-pages.py` prüft laut eigenem Docstring nur Testseiten-Struktur, nie Chart-Verhalten, und referenziert keine REG-IDs.
- `ci-token-check.js` (`fwCiAudit`/`fwTokenCheck`/`fwFontCheck`) und `rubikon-symbol-markers-diagnose.js` sind manuelle Browser-DevTools-Konsolen-Snippets (Copy-Paste + menschliche Auswertung), keine automatisch laufende Prüfung.
- Keine automatische Test-/CI-Pipeline vorhanden (konsistent mit CLAUDE.md Testrealität-Prinzip).

Die Matrix ist damit ehrlich vollständig manuell — kein „vermeintlich schon abgedeckt"-Blindspot gefunden.

**Geändert:** 1 Datei, 3 Stellen

**Dateien:**
- `docs/steering/engine/REGRESSION-MATRIX.md` (CHANGED) — Stand-Header aktualisiert; neue Tabellenspalte `Automatik-Gate?` (jede der 20 REG-Zeilen: „Nein — nur manuell"); neuer Abschnitt „Automatik-Gate-Review (RITUAL-OPT-2 Punkt 8)" mit Tool-Inventar-Begründung.

**Technischer Stolperstein (gefunden + behoben, vor dem Commit):** Erster Versuch (Python-Transformationsskript) verband alte und neue Spalte ohne trennendes `|` — Markdown-Tabelle wäre kaputt gewesen. Per `git checkout` auf Ausgangsstand zurückgesetzt und mit korrigiertem Skript neu erzeugt; Diff danach gegengelesen.

**CHANGED/NEW:** N/A — reiner Doku-Patch, keine Code-Marker-Konvention betroffen.

**Tabu-Check:** keine ✓ — `docs/steering/engine/` ist nicht in Tabu-Zonen/`PROTECTED_PATHS.json`. Gate-Typ war dennoch Full (jede `docs/steering/`-Änderung schließt Light-Gate laut CLAUDE.md aus).

**Gate-Typ:** Full.

**Testfall:** Kein Laufzeit-/Browser-Test nötig (reine Tabellen-Doku). Verifikation: Diff manuell gegengelesen — Tabellenstruktur intakt (20 Datenzeilen + 1 Hinweiszeile, alle mit korrekter Spaltenzahl), Stand-Header korrekt, neuer Abschnitt inhaltlich mit dem Tool-Befund konsistent.

**Offene Fragen:** keine. RITUAL-OPT-2 ist damit mit allen drei Punkten (6, 7, 8) abgeschlossen. Punkt 9 (optional: DECISION-LOG auf `append-log-line.py`, BACKLOG-ARCHIV-Jahres-Split) steht laut ursprünglicher Übergabe nur bei Bedarf an — geringer Wert, kein Auftrag bisher.

Zählprüfung: Ich habe 3 Stellen in 1 Datei geändert. Aufzählen?
→ Bitte gegenlesen. Damit ist RITUAL-OPT-2 vollständig — soll ich den Abschluss (Ritual/Commit-Message) jetzt vorbereiten, oder zuerst Punkt 9 / etwas anderes?
