---
name: project-archivstrategie
description: Archivstrategie für Finanzwesir 2.0 — föderiertes Modell mit zentralem Archivvertrag (Stand: 2026-06-08)
metadata:
  type: project
---

`docs/steering/ARCHIV-STRATEGIE.md` ist SSoT für das föderierte Archivmodell.

Föderiertes Modell: Lokale Archive erklären lokale Entstehung. Root-Archiv `/Archiv/` erzählt die projektweite Reise. `local/` schützt Git und Claude vor Rohmaterial. Bestehende Archivstreuung ist historischer Befund, nicht Zielarchitektur — wird nicht blind bereinigt.

Archivvertrag (10 Regeln, vollständig in ARCHIV-STRATEGIE.md): Archivdateien nie als operativer Standardkontext für Claude. Historische Entscheidungen tragen Status (HIST, ERSETZT, POSTMORTEM, RAW). ERSETZT verweist auf Nachfolger. Rohmaterial → `local/`. Keine Massenkonsolidierung ohne gesonderten Plan.

`Archiv/` ist versionierbar und kuratiert. `Archiv/local/` ist gitignored (Rohmaterial, Binärdateien, LLM-Dumps). Gitignore-Umstellung abgeschlossen 2026-06-08 (ST-20/ST-21).

**Why:** Historische Analysen lagen im aktiven Kontext und konnten mit aktuellem Stand verwechselt werden. Massenkonsolidierung würde Subsystem-Kontext zerstören. Föderiertes Modell + zentraler Vertrag löst beides.

**How to apply:** Beim Lesen von Archiv/-Dateien: nur Inhalte außerhalb von `Archiv/local/` sind kuratiert. Bei neuen Archiv-Operationen: Binärdateien, LLM-Dumps, Rohmaterial → `Archiv/local/`. Bestehende lokale Archive nicht blind bereinigen — Archivvertrag aus ARCHIV-STRATEGIE.md gilt. Neue `local/`-Unterverzeichnisse nur auf gesonderten AP-Auftrag anlegen.

Folge-APs: ST-23 ✅, ST-24 ✅ (Inventar — abgeschlossen, Befund in `docs/steering/ARCHIV-INVENTAR.md`), ST-25 (Katalog — offen, Befund vorhanden), ST-26 (Making-of-Rahmen), ST-27 (Pilotarchiv), ST-28 (README-Schablone anwenden).
