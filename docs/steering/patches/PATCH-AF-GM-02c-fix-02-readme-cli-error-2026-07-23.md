Stand: 2026-07-23 | Session: AF-GM-02c-Fix-02 | Geändert von: Claude

# Patch-Quittung | AF-GM-02c-Fix-02 | 2026-07-23

**Beauftragt:** Dokumentationslücke schließen — die bereits implementierte, stabile Fehler-ID `GM-ERR-CLI-ARGS-INVALID` (aus AF-GM-02c-cli-args-fix) fehlte in der Fehler-ID-Tabelle von `tools/golden-master/README.md`. Auftragsquelle: `Archiv/local/muss noch eingeordnet werden/PROMPT_CLAUDE_AF-GM-02C_FIX-02_README_CLI_ERROR_V1.md`.

**Geändert:** 1 Datei, 1 Stelle

**Dateien:**
- `tools/golden-master/README.md`

**CHANGED/NEW-Markierungen:** N/A — reine Markdown-Doku, kein Code-Marker nötig.

**Delta:** genau eine neue Zeile in der bestehenden Fehler-ID-Tabelle (zwischen `GM-ERR-TARGET-URL-NOT-LOCAL` und `GM-ERR-UNEXPECTED`):

> `GM-ERR-CLI-ARGS-INVALID` | Aufruf entspricht weder `<trace>` noch `<trace> --target-url <url>` (fehlender Wert, unbekanntes Argument, doppeltes `--target-url`) — bricht vor Hash-Prüfung, Browserstart und Zielnavigation ab (AF-GM-02c-Fix)

Keine weitere Umstrukturierung, keine Wiederholung derselben Regel an anderer Stelle.

**Tabu-Check:** keine ✓ — nur `README.md` im Scope, kein `forbidden`/`protected`-Pfad berührt. `verify.mjs`, Tests, Fixtures, Evidenzdatei, Schema, App-/Theme-Code und Schutzprofil unangetastet.

**Gate-Typ:** Light

**Nachbedingungen (real ausgeführt):**

1. Geänderter README-Block mit Kontext erneut gelesen — Zeile korrekt zwischen den beiden Nachbarzeilen eingefügt.
2. `node tools/golden-master/verify.mjs tests/golden-master/traces/minimal-normal.behavior-trace.json --target-url` → Exit `1`, `{"status":"FAIL","errorId":"GM-ERR-CLI-ARGS-INVALID", ...}`, kein Browserstart (kein `Browser-Executable:`-Log).
3. Diff geprüft: `git status --short` zeigt für diesen Patch nur `tools/golden-master/README.md` als neu geändert. Alle übrigen Einträge (`verify.mjs`, Session-Log, Chronik, frühere neue Dateien) stammen aus vorherigen, bereits quittierten Patches derselben Session und sind unverändert dazu — Albert hat noch nichts committet, daher bleiben sie im kumulativen Arbeitsbaum-Diff sichtbar.

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 1 Stelle geändert. Aufzählen? Nein — vollständig oben dokumentiert.

→ Bitte teste mit dem Kommando aus Nachbedingung 2. Keine Evidenzdatei geschrieben. Ich warte auf deine Testbestätigung.
