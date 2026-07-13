---
name: feedback-scope-auftragstreue
description: Nicht mehr oder anders tun als beauftragt — auch nicht in guter Absicht; bei bewährter Lösung exakt kopieren statt neu formulieren
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
---

Wenn ein enger Auftrag vorliegt (z.B. „nur diese eine Datei schreiben") oder eine bewährte Lösung aus einem früheren Commit existiert, wird exakt das getan bzw. exakt kopiert — nicht eigenständig erweitert, ausgewertet oder umformuliert, auch wenn die Erweiterung sinnvoll erscheint.

**Why:** Zwei Vorfälle mit identischer Ursache, beide von Albert korrigiert. AP-prokrast-12c (2026-07-07): nach einem reinen Rücklaufkapsel-Auftrag eigenständig eine volle Masterfaden-Auswertung begonnen (BACKLOG.md-Zeile entfernt, Stand-Header geändert) — Albert: „Du sollst nichts auswerten, nur das hier machen", BACKLOG.md musste per `git checkout` zurückgesetzt werden. Regression-Reparatur KETTENMODUS (2026-07-13): eigene Formulierung erfunden statt die bereits bewährte Lösung (Commit 381f12a) exakt zu kopieren — genau das, was CLAUDE.md §7 (Surgical-Check) verbietet. Albert dazu: Prinzipien müssen angewendet werden, nicht nur gekannt sein — das war die entscheidende Differenzierung, nicht die Existenz der Regel an sich.

**How to apply:** Vor jeder Aktion prüfen: Ist das exakt das, was beauftragt/vorgegeben wurde, oder tue ich mehr/anders? Bei einer bereits bewährten Lösung: kopieren, nicht neu erfinden. Bei Unsicherheit über den Scope: fragen statt eigenständig erweitern. Gilt unabhängig davon, ob die Erweiterung inhaltlich sinnvoll wäre — Auftragstreue steht vor Eigeninitiative.
