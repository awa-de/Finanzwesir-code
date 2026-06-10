---
name: feedback_git_staging
description: Albert führt Git-Staging und Commits selbst aus — Claude liefert Commit-Message nur als reinen Text, kein git-Kommando
metadata:
  type: feedback
---

Albert führt git add, git commit und alle weiteren Git-Operationen selbst aus (z. B. über VSCode Git Extension). Claude liefert die Commit-Message ausschließlich als reinen, kopierbaren Text — keine `git`-Kommandos, kein Staging, kein automatisches Ausführen.

**Why:** Albert lehnte einen git-staging-Befehl explizit ab (OA-02-Nachputz, 2026-06-10). Vier-Augen-Prinzip und Kontrolle über den Git-Stand bleiben bei Albert.

**How to apply:** Nach jedem Abschluss-Ritual: Commit-Message als Fließtext ausgeben, fertig. Nie `git add` oder `git commit` vorschlagen oder ausführen — auch nicht als Bestätigung oder „Hilfe". Gilt auch für Archivieren-Skill und alle anderen Workflows.

Verwandt: [[feedback_arbeitsweise]]
