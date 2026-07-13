---
name: feedback-qa-ketten-status-aufhebung
description: "Bei mehrstufigen QA-Ketten (Bau → Abschluss-QA → Nachtrag) frühere GELB/Blocker-Status nicht still korrigieren, sondern als „zum Prüfzeitpunkt korrekt, durch neue Fakten nachträglich aufgehoben\" dokumentieren"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
---

Wenn ein späterer AP in derselben Kette einen früheren GELB-Grund oder Blocker auflöst, wird der frühere Status nicht rückwirkend als falsch umgedeutet oder still korrigiert. Stattdessen: „Status X war zum damaligen Prüfzeitpunkt korrekt, wird durch neue Fakten aus AP Y nachträglich aufgehoben."

**Why:** Albert bevorzugt bei mehrstufigen QA-Ketten (Bau → Abschluss-QA → Nachtrag/Rücklaufkapsel) dieses saubere Muster explizit gegenüber einer stillen Korrektur (AP-prokrast-07d, 2026-07-06) — der frühere QA-Schritt (AP-07b) hatte GELB korrekt gemeldet (DOM-/Accessibility-Check fehlte), der Nachtrag (AP-07d) löste den Grund auf, ohne AP-07b nachträglich als falsch darzustellen.

**How to apply:** Bei Rücklaufkapseln/Nachträgen, die einen früheren GELB-Status auflösen: explizit benennen, dass der frühere Status zum damaligen Zeitpunkt korrekt war, und welche neue Tatsache ihn jetzt aufhebt. Nie so formulieren, als wäre der frühere Befund ein Fehler gewesen.
