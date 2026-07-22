---
name: project-powershell-dotnet-quirks
description: "Zwei verifizierte Windows-PowerShell-5.1/.NET-Framework-Fallstricke (File.Replace mit $null, Zip-Pfadtrenner) — relevant für jedes künftige PowerShell-Konsolenwerkzeug oder Theme-ZIP-Building in diesem Projekt"
metadata: 
  node_type: memory
  type: project
  originSessionId: 98ca12f3-c1dc-4b71-ab8b-162154762c8c
  modified: 2026-07-22T17:33:34.212Z
---

Zwei empirisch verifizierte Fallstricke der hier laufenden Windows-PowerShell-5.1-Umgebung (Version `5.1.22621.6133`, .NET Framework, nicht .NET Core/pwsh):

**1. `[System.IO.File]::Replace($src, $dst, $null)` wirft „Der Pfad hat ein ungültiges Format".**
Das dritte Argument (destinationBackupFileName) darf laut .NET-Doku `null` sein („kein Backup"), tut das aber unter dieser PS-5.1-Version nicht — der Aufruf schlägt zuverlässig fehl, auch mit `[string]$null` oder der 4-Parameter-Überladung mit `ignoreMetadataErrors`. Reproduziert in `Archiv/local/.../HANDOVER_CLAUDE_JSON_EINGABE_TOOL_GRUNDLAGE_C3.md`-Umsetzung: Der ursprüngliche Rubikon-Editor (C1/C2) nutzte genau dieses Muster und hat dadurch *nie* erfolgreich geschrieben — unbemerkt, weil nie interaktiv end-to-end getestet.
**Fix:** Immer einen echten (temporären, im `finally`-Block aufgeräumten) Backup-Pfad übergeben, nie `$null`. Umgesetzt in `content/files/app-data/json-eingabe-tool-core.psm1` (`Invoke-JsonEingabeCommit`) — dort auch als Code-Kommentar dokumentiert.

**2. `Compress-Archive` UND `[System.IO.Compression.ZipFile]::CreateFromDirectory` erzeugen Backslash-Pfade als Zip-Eintragsnamen.**
Beide Wege liefern unter Windows-PowerShell-5.1/.NET-Framework `assets\css\screen.css` statt des ZIP-Standard-Vorwärtsslash `assets/css/screen.css`. Auf einem Linux-Ghost-Server würde ein Unzip-Tool das als wörtlichen Dateinamen mit Backslashes interpretieren statt als Verzeichnisstruktur — Theme-Struktur wäre nach dem Entpacken zerstört. Bisherige Theme-ZIPs (v1–v4) hatten dieses Problem nicht (andere Bauweise/Session), das V5-ZIP-Script in dieser Session hätte es sonst neu eingeführt.
**Fix:** ZIP manuell über `ZipArchive` + `CreateEntryFromFile` bauen, Eintragsname explizit per String-Replace auf `/` normalisieren (nicht per `Substring`-Längenberechnung — `env:TEMP` liefert den kurzen 8.3-Pfad, `Get-ChildItem().FullName` den langen; Längen passen nicht zusammen. Erst `(Get-Item $stagingDir).FullName` auflösen, dann für Relativpfad-Vergleich nutzen).
**Wann prüfen:** Vor jedem künftigen Theme-ZIP-Build oder jeder neuen PowerShell-Atomschreib-Logik in diesem Projekt — kein offizielles npm-Zip-Script existiert, jeder Build ist bisher Ad-hoc-PowerShell in der Session.

Verwandt: [[project_json_eingabe_tool_kern]]
