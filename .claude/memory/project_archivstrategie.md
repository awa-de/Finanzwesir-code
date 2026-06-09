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

Föderierter Archivkatalog: `Archiv/legacy-map.md` (AP-6 / ST-25 ✅) — zentrale Steuerkarte mit 16 Archivorte, Zielrollen, Drift-Risiken, AP-9-Startbasis. Vor Archiv-Arbeit lesen.

Archiv-Sonderfälle: `docs/steering/ARCHIV-SONDERFAELLE.md` (AP-KORR-7 ✅) — Arbeitsliste für 3 Sonderfälle (archivliste.md, docs/App-Fabrik/_archive/, Inhalte alte Site/blog/archiv/). Entscheidungen bei Albert. Claude darf ohne eigenen AP nicht handeln.

Setup-Serie AP 3–9 ✅ + Nachputzserie AP-KORR-1 bis AP-KORR-8 ✅ (2026-06-08) — Archivstrategie vollständig etabliert. Keine Folge-APs als Pflichtkette. Weitere Archivarbeit nur auf gesonderten Auftrag.

SKILL-ARCHIV-01 ✅ (2026-06-09) — Spezifikation für Skill `/archivieren` angelegt (`docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md`): 6 Arbeitsphasen, 9 Klassifikationskategorien, 4 Freigabe-Gates. SKILL-ARCHIV-02 (Implementierung der Skill-Datei) ist nächster geplanter AP — nur auf gesonderten Auftrag.
