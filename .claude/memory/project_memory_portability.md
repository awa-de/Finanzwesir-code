---
name: project-memory-portability
description: "Memory-Portabilitätslösung: Symlink auf NAS (Heim-PC) und Nextcloud (Laptop), Setup-Script in tools/"
metadata: 
  node_type: memory
  type: project
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
---

Claude Code Memory ist maschinenuebergreifend portabel durch symbolische Links auf das kanonische Memory-Verzeichnis im Nextcloud-Projekt (abgeschlossen 2026-06-15, ST-18).

Kanonischer Speicherort: `Z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\memory\` (NAS, via Nextcloud synced zur Cloud)

Heim-PC: Symlink von `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\` auf UNC-Pfad `\\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\.claude\memory`
Voraussetzung: Windows Developer Mode (Einstellungen → System → Entwickler) aktiv

Laptop (kuenftig): Symlink von lokalem Claude-Slug-Pfad auf lokalen Nextcloud-C:\-Pfad — kein Developer Mode noetig, Junction reicht (beide Pfade lokal)

Einmalig-Setup pro Maschine: `.\tools\setup-memory-junction.ps1` ausfuehren
Das Script leitet Slug automatisch ab und erstellt mklink /D.

**Why:** Jede Maschine hatte ihr eigenes Brain-Silo; Memory auf Laptop und Heim-PC divergierten (34 vs. 37 Dateien). ST-18 fusigte beide Verzeichnisse und loeste das Silo-Problem.

**How to apply:** Neue Maschine: Developer Mode pruefen, dann `.\tools\setup-memory-junction.ps1` ausfuehren. Kanonische Quelle ist immer das NAS/.claude/memory-Verzeichnis. Laptop-Setup noch ausstehend (beim naechsten Laptop-Faden ausfuehren).

## Risiko: parallele Schreibwerkzeuge beschädigen das NAS-Repo

Mehrere Tools/Prozesse (Cowork-Sandbox, Claude Desktop, VSCode), die unkoordiniert auf dasselbe NAS/Nextcloud-Repo schreiben, haben es zweimal beschädigt: Git-Index-Korruption durch `git mv` aus der Cowork-Sandbox (2026-07-12, AP-tailwind-Fable-Runde — die Sandbox darf umbenennen, nicht löschen, das beschädigte Lock/Index; Working Tree blieb unversehrt, Albert reparierte am Host per `git read-tree HEAD`) und CRLF-Zeilenumbruch-Umstellung samt Zeilenverschiebung durch Claude Desktop (2026-07-12, RITUAL-OPT-1).

**Why:** Das kanonische NAS-Repo wird von mehreren unabhängigen Schreibpfaden gleichzeitig berührt (Sandbox, Desktop-App, VSCode/Nextcloud-Sync) — keiner davon kennt den Zustand des anderen. Albert hat Claude Desktop nach dem zweiten Vorfall abgestellt.

**How to apply:** Keine git-Schreibbefehle aus einer Cowork-Sandbox auf das NAS-Repo — Dateioperationen dort nur mit `mv`/Dateisystem, Git-Aktionen macht Albert in VSCode. Bei unerwarteten Zeilenendungen/Verschiebungen in einer Datei: Verdacht auf gleichzeitigen Fremdzugriff prüfen, nicht sofort als eigenen Fehler werten. Offene Empfehlung (nicht umgesetzt): `.git` vom Nextcloud-Sync ausschließen.
