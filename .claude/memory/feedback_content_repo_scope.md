---
name: feedback-content-repo-scope
description: "content/ gehört zum separaten Content-Repo — nie in Code-Repo-Commit-Messages, Ritual-Dateizählungen oder Bereiche-Listen aufnehmen"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 27504c35-b159-4002-a4a4-7410207593e3
---

`content/` ist ein eigenständiges, privates Git-Repo (`Finanzwesir-content`), das Albert selbst über Obsidian/Obsidian-Git-Plugin verwaltet — siehe [[project-content-system]]. Es ist nicht Teil des Code-Repos, in dem Claude als Git-Nutzer operiert.

**Why:** Albert korrigierte am 2026-07-09 eine Commit-Message, die `content/posts/apps/**` fälschlich unter „Bereiche:" eines Code-Repo-Commits gelistet hatte — Dateien aus zwei verschiedenen Git-Repos können nicht in einem gemeinsamen Commit auftauchen. Auslöser war eine Verwechslung: „Session-weite Dateizählung fürs Abschluss-Ritual" wurde mit „git-relevante Bereiche für die Commit-Message" vermischt.

**How to apply:** Bei jedem Abschluss-Ritual/jeder Commit-Message strikt trennen: Dateien unter `content/` zählen zwar für die Einordnung des Ritual-Modus (z.B. Housekeeping wegen „neue Dateien"), gehören aber nie in eine Commit-Message-„Bereiche:"-Zeile und nie in eine Aussage über Commit-Freigabe/-Status des Code-Repos. `git status`/`git log` im Code-Repo zeigt `content/`-Änderungen ohnehin nie (Root-`.gitignore` schließt den Ordner komplett aus).
