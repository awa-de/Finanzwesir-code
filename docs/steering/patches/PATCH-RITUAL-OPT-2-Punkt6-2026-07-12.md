PATCH-QUITTUNG | AP RITUAL-OPT-2 (Punkt 6 + BACKLOG-Mitnahme) | 2026-07-12

**Beauftragt:** NAVIGATION.md-AP-Status-Flip und BACKLOG.md-Zeilenentfernung im `/abschluss-ritual` read-frei machen (kein Voll-Read mehr über Edit-Tool-Präkondition), analog zum bestehenden `append-log-line.py`-Muster für BACKLOG-ARCHIV.

**Befund vor dem Patch:** `abschluss-writer.md` definierte für NAVIGATION (`replace_exact_ap_status`) und BACKLOG (`remove_exact_line`) Aktionen ohne read-freies Tool. Da das Edit-Tool einen vorherigen Read derselben Datei verlangt, kostete jeder NAVIGATION-Flip einen Voll-Read von NAVIGATION.md (74,6 KB / ~18,5k Tokens) trotz „gezielt" in der Skill-Beschreibung. BACKLOG.md (14,7 KB) hatte dasselbe, kleinere Problem. Zusatzbefund: NAVIGATION.md ist strukturell fast durchgehend Append-only (AP-Zeilen werden fertig mit ✅ geschrieben); ein echter 🟡→✅-Flip kommt nur 2× im ganzen File vor — der Normalfall ist Append, nicht Replace.

**Geändert:** 3 Dateien, 9 Stellen

**Dateien:**
- `tools/replace-matched-line.py` (NEU) — read-freies Entfernen (`--remove-containing`) oder Ersetzen (`--replace-containing --with`) genau einer per Substring eindeutig gefundenen Zeile. FAIL bei 0 oder >1 Treffern, kein Dateiinhalt im Output.
- `.claude/agents/abschluss-writer.md` (CHANGED) — §2 Punkt 2+4 (Normalfall Append / Sonderfall Flip für NAVIGATION, Tool-Verweis für BACKLOG), §4 YAML-Beispiel (2 alte Edit-Aktionen → 4 `run:`-Aufrufe), §6 Echo-Regeln (NAVIGATION-Ausgabeformat auf tatsächliche Tool-Ausgabe umgestellt), §7 Fehlerfälle (auf Tool-FAIL-Meldungen umgestellt).
- `.claude/skills/abschluss-ritual/SKILL.md` (CHANGED) — §3.3 Punkt 2 (Wortlaut Append/Flip), neues §3.6a „NAVIGATION.md" (Normalfall/Sonderfall-Regel mit Tool-Aufrufen), §3.7 BACKLOG-Bullet (Tool-Aufruf statt unspezifisch „entfernen"), §3.9 Haiku-darf-Liste (Wortlaut synchronisiert).

**CHANGED/NEW:** N/A — Markdown-/Tooling-Patch, keine Code-Marker-Konvention betroffen (kein produktiver App-/Engine-Code).

**Tabu-Check:** keine ✓ — `tools/`, `.claude/agents/`, `.claude/skills/` sind nicht in Tabu-Zonen oder `PROTECTED_PATHS.json`.

**Gate-Typ:** Full (mehrere Dateien, Ritual-Mechanik-Änderung — von Albert freigegeben).

**Isoliertes Tool-Testprotokoll (Scratchpad, vor dem Verdrahten):**
1. Eindeutiger Remove → OK, Zeile entfernt.
2. 0 Treffer beim Remove → FAIL, Datei unverändert.
3. Eindeutiger Replace → OK, Zeile ersetzt, Zeilenende erhalten.
4. `--remove-containing` + `--replace-containing` gleichzeitig → FAIL (genau ein Modus erzwungen).
5. 2 Treffer beim Remove → FAIL, Datei unverändert (keine stille Mehrfachänderung).

Alle 5 Fälle grün.

**Realer Testfall (steht noch aus):** Nächster echter Ketten-Minimalabschluss beobachten — Writer soll für NAVIGATION den Append-Pfad (`append-log-line.py`) nutzen und für BACKLOG-Entfernung `replace-matched-line.py` statt Read+Edit; kein Voll-Read von NAVIGATION.md im Tool-Transcript.

**Offene Fragen:** keine für diesen Patch. RITUAL-OPT-2 Punkt 6 damit erledigt; Punkt 7 (start/Hook-Umbau, PROTECTED_PATHS zuerst) und Punkt 8 (REGRESSION-MATRIX-Gate-Spalte) stehen noch aus.

Zählprüfung: Ich habe 9 Stellen in 3 Dateien geändert. Aufzählen?
→ Bitte bestätige den Testfall (nächster Ketten-Minimalabschluss, oder direkt inhaltlich gegenlesen). Ich warte vor dem nächsten Patch.
