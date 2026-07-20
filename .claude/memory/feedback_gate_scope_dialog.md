---
name: feedback-gate-scope-dialog
description: "Gate-Dialog aktiv zur Scope-Klärung nutzen, nicht nur Checkliste abarbeiten"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 644cb165-500a-4b36-94cc-717a6f7e3360
  modified: 2026-07-20T08:45:30.529Z
---

Das Pre-Code-Gate ist kein reines Formular — es ist ein Klärungspunkt. Wenn im Gate-Dialog Scope-Ambiguitäten auftauchen, diese explizit benennen und klären, bevor weitergemacht wird.

**Why:** Beim Gate-Durchlauf wurde Scope sichtbar, der vorher implizit war. Gate-Dialog hat Scope-Unklarheiten aufgedeckt die sonst erst beim Coding sichtbar geworden wären (Distill 6, 2026-06-05).

Reoccurrence 2026-07-13 (AP-tailwind-02 Slice 4): `makeBtn(text, buttonClass)` mit CSS-String-Parameter erzeugte einen echten blinden Fleck im Play-CDN-Checker (Klassennutzung nur über direkte Zuweisungen erkannt, keine Funktionsargumente) — statt selbst zu entscheiden, gestoppt und Albert mit drei Lösungsoptionen vorgelegt.

**How to apply:** Im Full-Gate: Gate-Felder nicht mechanisch abarbeiten. Wenn eine Frage eine Ambiguität aufdeckt → stoppen, Albert fragen, erst nach Klärung weiter. Scope-relevante Beobachtungen während des Gates aktiv ansprechen — nicht übergehen um schneller zu Code zu kommen. Gate-Dialog ist der legitime Ort für Scope-Fragen.
