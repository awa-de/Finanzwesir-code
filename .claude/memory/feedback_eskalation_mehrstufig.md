---
name: feedback-eskalation-mehrstufig
description: "Offene Punkte, die Alberts Entscheidung brauchen, müssen in mehrstufigen AP-Ketten aktiv und prominent bis zu ihm durchgereicht werden — nicht nur einmal im tiefsten Protokoll dokumentiert"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: da7839f1-b4ab-4028-a1e5-b2114da16312
---

Wenn ein Sub-AP (z.B. AP-X.a) einen offenen Punkt findet, der Alberts Entscheidung braucht, reicht es nicht, ihn einmal im tiefsten Ergebnisprotokoll zu dokumentieren. Er muss aktiv durch jede weitere Verdichtungsstufe (Abschluss-QA-AP, Rücklaufkapsel, Masterfaden) prominent mitgeführt werden, bis er Albert selbst erreicht — nicht nur "abgelegt", sondern jedes Mal erneut sichtbar herausgestellt (eigener Abschnitt/Callout, nicht in Fließtext untergemischt).

**Why:** Bei AP-prokrast-04a fand die Advocatus-Diaboli-Frage im Full-Gate zwei Fallen (offene ✅/❓-Symbolik-Entscheidung; unsynchronisierte QA_TEST_CASES.md). Albert bestätigte explizit: "Die brauchen wir! Wären beinahe unter den Tisch gefallen" und verlangte, dass sie "2 Stufen nach oben" durchgereicht werden müssen — nicht nur im ersten Protokoll stehen. In einer mehrstufigen Kette (04a → 04b QA → 04c Rücklaufkapsel) hätte ein Punkt, der nur in 04a steht, beim Verdichten in 04b/04c leicht verloren gehen können.

**How to apply:** Bei jedem Sub-AP, das Teil einer mehrstufigen Kette ist (Bau-AP → QA-AP → Rücklaufkapsel/Masterfaden), offene, entscheidungsbedürftige Punkte in einem eigenen, unübersehbaren Abschnitt (z.B. "Eskalationspflicht") führen und in JEDEM nachfolgenden Verdichtungsschritt erneut explizit aufgreifen, nicht stillschweigend voraussetzen, dass die vorherige Erwähnung reicht. Gilt besonders für App-Fabrik-Ketten und andere AP-Xa/Xb/Xc-Strukturen mit mehreren Verdichtungsebenen vor Albert. Verwandt: [[project_audit_trail]].
