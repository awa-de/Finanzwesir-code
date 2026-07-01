---
name: Session-Start-Infrastruktur
description: Wie Session-Start technisch funktioniert — Hook-Architektur, HOOK-META, /start-Command, getestete Alternativen
metadata:
  type: project
  originSessionId: 1c8b5766-b556-472d-baec-d8e09cea9321
---
Albert tippt `/start` als erstes in jeden neuen Faden. Claude führt die Sequenz aus und gibt aus:
`SESSION-START ✓ | Fokus: [...] | Aktive APs: [...] | BLOCKED: [...]`

Wenn Albert direkt eine Frage stellt ohne `/start`: Claude fragt nach (steht in CLAUDE.md §2).

**Aktive Architektur (ab ST-15, 2026-05-11):**

Zwei-Stufen-Modell:
1. `SessionStart`-Hook (`.claude/hooks/session-start.ps1`) feuert automatisch beim Fadenbeginn.
   - Liest HOOK-META-Block aus `PROJECT-STATUS.md` (maschinenlesbare SSoT für Fokus-AP, Nächster-Schritt, Blocker)
   - Liest ATTEMPT-LOG.json, session-log.md, patterns.md für Zustandsdaten
   - Gibt strukturierten Block aus: `Hook-Status: OK` oder `Hook-Status: DEGRADED` + Warnungen
   - RepoRoot wird aus `$PSScriptRoot` abgeleitet (nicht CWD-abhängig), UTF-8 explizit gesetzt
2. `/start` synthetisiert Hook-Output: BLOCKED-Check, spec-scout-Dispatch für Backlog-Abgleich, Urteile, SESSION-START-Zeile.

**HOOK-META-Block** steht ganz oben in `PROJECT-STATUS.md`:
```
<!-- HOOK-META
Version: 1
Stand: YYYY-MM-DD
Fokus-AP: [AP-ID — Titel]
Nächster-Schritt: [nächster Schritt]
Blocker: [keine oder konkrete Blocker]
-->
```
Bei jeder Änderung an Fokus/Blocker/Next-Step: HOOK-META UND sichtbaren Fließtext synchron halten (abschluss-ritual Schritt 6).

**Bei `Hook-Status: DEGRADED`:** sichtbar melden, nicht still fortfahren, /start nutzt verfügbare Fakten.

**Getestete Alternativen — beide verworfen:**
1. UserPromptSubmit-Hook: Hook-Output überschritt 2KB-Inline-Limit.
2. `@`-Imports in CLAUDE.md: Funktioniert nur in der CLI, NICHT in der VSCode Extension (bestätigter Anthropic-GitHub-Bug, Stand: 2026-05-04).

**How to apply:** `/start` bleibt der einzige Trigger für Albert. Die interne Mechanik läuft über Hook + /start-Synthese.
