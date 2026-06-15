---
name: feedback-surgical-check
description: Nur ändern was direkt zum Auftrag gehört — gilt für alle Edits (Code, Docs, JSON), nicht nur Code
metadata:
  type: feedback
---

Jede geänderte Zeile muss auf Alberts Auftrag, das Gate oder eine notwendige Folgeänderung zurückführbar sein. Nachbarcode nicht „verbessern" — nur reparieren was kaputt ist, nur berühren was nötig ist.

Gilt für jeden Patch — nicht nur für Code-Änderungen. Auch .md, .json, .txt.

**Why:** Gut gemeinte Nebenarbeiten erzeugen Scope-Creep und unerwartete Regressionen. Beim Umbenennen eines Buchstaben-Labels (N→M) in selftest-chatgpt.md wurde der Surgical-Check nicht angewendet, weil die Änderung als „kleine Kosmetik, kein Code" eingestuft wurde. Albert hat das direkt korrigiert. Die Rationalisierung „es ist nur ein Buchstabe / nur Kosmetik / nur 5 Sekunden" ist genau die Falle, gegen die die Regel existiert.

**How to apply:** Vor jedem Edit — egal ob .js, .md, .json oder .txt: „Ist diese Zeile direkt durch Alberts Auftrag, das Gate oder eine notwendige Folgeänderung gedeckt?" Wenn nein: benennen, nicht anfassen. Fremder Mess (bestehender toter Code, schlechter Stil) → melden, nicht anfassen. Eigener Mess (durch diesen Patch verwaist) → entfernen.
