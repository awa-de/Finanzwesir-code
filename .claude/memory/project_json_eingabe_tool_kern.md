---
name: project-json-eingabe-tool-kern
description: "json-eingabe-tool-core.psm1 ist der allgemeine, wiederverwendbare Mechanik-Kern für konsolenbasierte JSON-Eingabewerkzeuge; Rubikon ist das erste Profil darüber"
metadata: 
  node_type: memory
  type: project
  originSessionId: 98ca12f3-c1dc-4b71-ab8b-162154762c8c
  modified: 2026-07-22T17:34:13.268Z
---

Seit C3 (HANDOVER_CLAUDE_JSON_EINGABE_TOOL_GRUNDLAGE_C3.md, 2026-07-22) existiert `content/files/app-data/json-eingabe-tool-core.psm1` als allgemeiner Mechanik-Kern für Windows-Konsolen-Eingabewerkzeuge: Mehrzeileneingabe mit Abschlussgeste (zwei leere Zeilen), Esc-Abbruch, UTF-8-Konsolenbehandlung, ein vom Aufrufer gelieferter Normalisierungs-Scriptblock, sowie `Invoke-JsonEingabeCommit` (Node-Validator-Aufruf + atomarer Doppelschreibvorgang + Rollback).

`content/files/app-data/bearbeite-rubikon-text.ps1` ist das **erste Profil** darüber — dünner Adapter mit L/K-Auswahl, Zielpfaden (`rubikon.long`/`short`) und der Rubikon-spezifischen Zeilen-Normalisierung (`##Text`→`## Text` u.ä.).

**Bewusste Grenze (nicht vorwegbauen):** Kein allgemeines `bearbeite-json.bat`, keine App-Auswahl, kein allgemeiner Feldeditor — weitere Profile erst bei konkretem Bedarf. Der Kern liest keine Profile aus Dateien und akzeptiert keine Nutzereingabe als Ziel-Pfad/Befehl/Validatorname — nur explizite Parameter vom aufrufenden Profil-Code.

**Testbarkeits-Trick:** `bearbeite-rubikon-text.ps1` wrapped seinen Hauptfluss in `Invoke-RubikonEditorMain`, die nur läuft, wenn `$MyInvocation.InvocationName -ne '.'` (also nicht bei Dot-Sourcing) — dadurch ist die reine Normalisierungsfunktion (`ConvertTo-NormalizedRubikonLine`) nicht-interaktiv testbar (`tests/json-eingabe-tool-core.test.ps1`), ohne den ReadKey-Editor über Konsoleneingabe simulieren zu müssen.

Verwandt: [[project_powershell_dotnet_quirks]] (File.Replace/Zip-Fallstricke, die beim Bau dieses Kerns gefunden wurden)
