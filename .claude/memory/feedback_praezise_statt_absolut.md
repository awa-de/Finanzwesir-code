---
name: feedback-praezise-statt-absolut
description: "Scheinbar absolute Formulierungen vermeiden, wenn Restfälle/Ausnahmen real bestehen — konkret beschreiben was gilt statt pauschal zu behaupten"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
---

Formulierungen wie „keine eigenen Werte mehr" werden vermieden, wenn tatsächlich noch Restfälle existieren. Stattdessen präzise beschreiben, was konkret gilt (z.B. „per @import aus SSoT-Datei X" statt „keine eigenen Hex-Werte mehr").

**Why:** AP-prokrast-19 (2026-07-10): Albert korrigierte eine Kopf-Formulierung von „keine eigenen Hex-Werte mehr" auf „@import aus tokens.css (Single Source of Truth)" — Grund: `screen.css` enthielt real weiterhin zwei Neutral-Hex-Werte, die absolute Aussage hätte nur eine alte Ungenauigkeit durch eine neue ersetzt.

**How to apply:** Vor einer pauschalen Statusaussage („komplett", „keine … mehr", „alle") kurz gegenprüfen, ob wirklich keine Ausnahme bekannt ist. Wenn Ausnahmen bestehen: den tatsächlichen Mechanismus/Zustand präzise benennen statt zu pauschalisieren.
