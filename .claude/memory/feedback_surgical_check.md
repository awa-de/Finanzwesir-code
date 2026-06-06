---
name: feedback-surgical-check
description: Nur ändern was direkt zum Auftrag gehört — keine opportunistischen Verbesserungen am Nachbarcode
metadata:
  type: feedback
---

Jede geänderte Zeile muss auf Alberts Auftrag, das Gate oder eine notwendige Folgeänderung zurückführbar sein. Nachbarcode nicht „verbessern" — nur reparieren was kaputt ist, nur berühren was nötig ist.

**Why:** Gut gemeinte Nebenarbeiten erzeugen Scope-Creep und unerwartete Regressionen. Die Grenze zwischen Auftrag und Eigeninitiative muss sichtbar bleiben.

**How to apply:** Vor jedem Edit: „Ist diese Zeile direkt durch Alberts Auftrag oder Gate gedeckt?" Fremder Mess (bestehender toter Code, schlechter Stil) → melden, nicht anfassen. Eigener Mess (durch diesen Patch verwaist) → entfernen.
