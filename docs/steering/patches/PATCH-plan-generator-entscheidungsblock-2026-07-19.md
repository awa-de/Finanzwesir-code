PATCH-QUITTUNG | AP plan-generator-Entscheidungsblock | 2026-07-19
Beauftragt:    Die 6 offenen Nutzerentscheidungen im Entscheidungsblock „Wie konkret darf der finale Plan werden?" der Mini-Spec plan-generator klären und dokumentieren, LLM-STOP-Regel entsprechend als erfüllt markieren.
Geändert:      1 Datei, 8 Stelle(n)
Dateien:       Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md (1x Kopftext „Zusätzlich für plan-generator" + Blocktitel aktualisiert, 6x „Alberts Entscheidung" je Frage ergänzt, 1x LLM-STOP-Regel auf „erfüllt" umgestellt)
CHANGED/NEW:   N/A — Markdown-Patch, keine Code-Marker nötig
Tabu-Check:    keine ✓ (Pfad gegen .claude/PROTECTED_PATHS.json geprüft, nicht gelistet; keine Layer-1-Datei)
Gate-Typ:      Full (App-Arbeit — immer Full-Gate laut CLAUDE.md, unabhängig von Dateizahl)
Testfall:      Albert liest Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md und bestätigt, dass alle 6 „Alberts Entscheidung"-Zeilen korrekt seinen Antworten entsprechen (Frage 1: A + Indexname; Frage 2: C; Frage 3: C+B, 150€-Anker; Frage 4: C; Frage 5: B; Frage 6: A) und die STOP-Regel als erfüllt markiert ist.
Offene Fragen: keine

Zählprüfung: Ich habe 8 Stellen geändert (Kopftext, Blocktitel, 6x Entscheidung, STOP-Regel-Status — STOP-Regel-Änderung zählt als eigene Stelle neben Blocktitel). Aufzählen? Siehe oben unter „Dateien".
→ Bitte teste mit obigem Testfall. Ich warte vor dem nächsten Patch.
