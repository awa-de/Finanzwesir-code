Stand: 2026-06-17 | Session: start-warm-start | Geändert von: Claude

# PATCH-QUITTUNG | /start Warm-Start-Check | 2026-06-17

**Beauftragt:** Warm-Start-Erkennung in `/start` einbauen — bei laufendem Faden (heutiger SESSION-START-Eintrag vorhanden) nur AP-Wechsel loggen statt volle Kaltstart-Sequenz ausführen.

**Geändert:** 1 Datei, 1 Stelle
**Dateien:** `.claude/commands/start.md`

**CHANGED/NEW:** N/A — Markdown-Patch, keine Code-Marker nötig

**Tabu-Check:** keine ✓

**Gate-Typ:** Light

**Testfall:** `/start` zweimal in derselben Session aufrufen:
1. Erster Aufruf → normaler Kaltstart, SESSION-START-Eintrag in session-log.md
2. Zweiter Aufruf (gleicher Tag, gleicher Faden) → Ausgabe muss `[WARM-START] AP-Wechsel | Jetzt: ...` zeigen, kein Haiku-Dispatch, kein Kassensturz

**Offene Fragen:** keine
