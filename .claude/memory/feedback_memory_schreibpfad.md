---
name: feedback-memory-schreibpfad
description: Memory-Symlink bestätigt — C:\Users\...\memory\ ist SYMLINKD auf NAS, Harness-Pfad korrekt und funktionsfähig
metadata:
  type: project
---

Der Memory-Symlink ist getestet und funktioniert korrekt (bestätigt 2026-06-15).

`C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\` ist ein `<SYMLINKD>` der auf `\\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\.claude\memory` zeigt.

Das bedeutet: Das Harness schreibt nach C:\Users\... → Windows folgt SYMLINKD → Dateien landen physisch auf dem NAS. z:\ ist dieselbe NAS-Adresse. Kein Kopieren, keine Synchronisation — eine einzige physische Datei.

**Hintergrund:** Ursprünglich war unklar ob der Symlink steht (daher Vorsichtsreaktion beim ersten Versuch). PowerShell-Test mit `cmd /c dir /aL` hat `<SYMLINKD>` bestätigt.

**How to apply:** Kein besonderes Verhalten nötig. Das Harness darf C:\Users\... verwenden — es landet korrekt auf dem NAS. Bei neuen Maschinen: `tools/setup-memory-junction.ps1` einmalig ausführen.
