---
name: patch-quittung-workflow
description: "Patch-Quittung/Ergebnisbericht: immer im Chat anzeigen UND als Datei in docs/steering/patches/ ablegen — beides Pflicht"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fee6cbf1-99c6-49d3-8cf9-d5755e0c6d94
---

Patch-Quittung (auch: Ergebnisbericht, Ergebnisprotokoll) besteht aus zwei Pflichtschritten:

1. **Im Chat anzeigen** — als formatierter Abschnitt direkt nach Abschluss des Patches
2. **Als Datei ablegen** — in `docs/steering/patches/` als committed Datei

Beide Schritte sind gleichwertig und müssen immer gemeinsam ausgeführt werden. Nur Chat ohne Datei ist ein Fehler.

**Namensregel:** „Patch-Quittung" und „Ergebnisbericht" bezeichnen dasselbe Artefakt — beide Namen kommen im Projekt vor. Konsistente Benennung bevorzugen: „Ergebnisprotokoll" oder „Patch-Quittung".

**Why:** Dieses Muster wurde nach Distill 7 (2026-06-15) noch zweimal verletzt (B1-AP-03 + B1-AP-14, 2026-06-16/17): Albert musste jeweils nachfragen, weil die Datei fehlte. Die Datei ist das persistente Audit-Artefakt im Repo — der Chat-Text ist flüchtig.

**How to apply:** Nach jedem abgeschlossenen Patch sofort beide Schritte ausführen. Die Datei-Ablage steht in `.claude/skills/patch-quittung/SKILL.md`. Kein Warten auf Alberts Nachfrage.
