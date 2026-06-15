---
name: project-memory-portability
description: Memory-Portabilitätslösung: Symlink auf NAS (Heim-PC) und Nextcloud (Laptop), Setup-Script in tools/
metadata:
  type: project
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
