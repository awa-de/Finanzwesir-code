---
name: feedback-scope-auftragstreue
description: Nicht mehr oder anders tun als beauftragt — auch nicht in guter Absicht; bei bewährter Lösung exakt kopieren statt neu formulieren; wenn doch abgewichen wird oder Nebenwirkungen auftauchen, proaktiv nennen statt still zu fixen
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
  modified: 2026-07-20T08:44:10.542Z
---

Wenn ein enger Auftrag vorliegt (z.B. „nur diese eine Datei schreiben") oder eine bewährte Lösung aus einem früheren Commit existiert, wird exakt das getan bzw. exakt kopiert — nicht eigenständig erweitert, ausgewertet oder umformuliert, auch wenn die Erweiterung sinnvoll erscheint.

**Why:** Zwei Vorfälle mit identischer Ursache, beide von Albert korrigiert. AP-prokrast-12c (2026-07-07): nach einem reinen Rücklaufkapsel-Auftrag eigenständig eine volle Masterfaden-Auswertung begonnen (BACKLOG.md-Zeile entfernt, Stand-Header geändert) — Albert: „Du sollst nichts auswerten, nur das hier machen", BACKLOG.md musste per `git checkout` zurückgesetzt werden. Regression-Reparatur KETTENMODUS (2026-07-13): eigene Formulierung erfunden statt die bereits bewährte Lösung (Commit 381f12a) exakt zu kopieren — genau das, was CLAUDE.md §7 (Surgical-Check) verbietet. Albert dazu: Prinzipien müssen angewendet werden, nicht nur gekannt sein — das war die entscheidende Differenzierung, nicht die Existenz der Regel an sich.

**How to apply:** Vor jeder Aktion prüfen: Ist das exakt das, was beauftragt/vorgegeben wurde, oder tue ich mehr/anders? Bei einer bereits bewährten Lösung: kopieren, nicht neu erfinden. Bei Unsicherheit über den Scope: fragen statt eigenständig erweitern. Gilt unabhängig davon, ob die Erweiterung inhaltlich sinnvoll wäre — Auftragstreue steht vor Eigeninitiative.

## Seiteneffekte/Scope-Abweichungen proaktiv nennen

Wenn ein Patch doch über den engen Auftrag hinausgreift (z.B. weil ein bestehender Mechanismus dadurch mitbetroffen ist) oder dabei nebenbei ein zusätzliches Problem auffällt: explizit im Ergebnisprotokoll/Patch-Echo benennen — nicht still mitfixen und nicht verschweigen.

**Why:** Zwei Belege. APP-01 Slice 5 (2026-06-15, [P2]): Albert war besorgt wegen Fetch-Cache-Verlust, weil ein Seiteneffekt nicht proaktiv erklärt wurde, erst auf Nachfrage bestätigt. AP-tailwind-02 Slice 4 (2026-07-13): opacity-60-Fund (Loading-State, aus Slice 1) fiel durch eine neue Checker-Invariante — ergänzt und die Abweichung vom ursprünglichen Delta transparent im Ergebnisprotokoll vermerkt statt stillschweigend gefixt. Gleiche Ursache wie oben (Auftragstreue), andere Facette: hier geht es nicht um das Vermeiden der Abweichung, sondern um die Pflicht zur Offenlegung, wenn sie doch passiert oder etwas Angrenzendes betroffen ist.

**How to apply:** Bei Patches, die Verhalten berühren das andere Komponenten nutzen, oder bei Funden außerhalb des engen Deltas: Seiteneffekte/Abweichungen proaktiv im Patch-Echo oder Ergebnisprotokoll nennen, bevor Albert danach fragen muss.
