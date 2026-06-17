---
name: feedback-abschluss-ritual-timing
description: "Abschluss-Ritual sofort anbieten wenn AP fertig — in der Session ausführen, nicht verschieben"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e17af1c3-51c1-4128-b8a6-ba4b1cb266ec
---

Nach Fertigstellung eines Arbeitspakets: proaktiv anbieten „Abschluss-Ritual für [AP-ID] jetzt?". Nicht warten bis Albert fragt. Abschluss-Ritual in der Session ausführen, in der die Arbeit abgeschlossen wird — nicht auf die nächste Session verschieben.

**Why:** Dreimal vergessen oder zu spät angeboten (Distill 6, 2026-06-05). Drei weitere Belege (DIST-01 2026-05-09, AF-12 2026-05-18, APP-01-Slice-2 2026-06-05): Abschluss-Ritual landete in der Folgesession. Konsequenz: Artefakte (session-log, commit) fehlen in der richtigen Session; Folgesession muss Nacharbeit leisten.

**How to apply:** Trigger: AP-Status wechselt zu ✅, Slice wird als „abgeschlossen" bestätigt, oder Albert sagt „fertig". Dann sofort: „Abschluss-Ritual für [AP-ID] jetzt?" — ohne Verzögerung. Signal für drohendes Kontext-Überlaufen: /uebergabe früh starten, nicht warten bis der Kontext eng ist. Wenn Abschluss-Ritual einer Session noch nicht ausgeführt wurde und neue Session beginnt: sofort als erste Aufgabe nachholen.

**Block-Modus (ab 2026-06-17):** Wenn viele APs direkt aufeinander folgen und zusammenhängen, auf Block-Modus umschalten (→ abschluss-ritual/SKILL.md § Block-Modus). Pro AP nur: session-log + NAVIGATION.md + PROJECT-STATUS.md + Commit-Message. BACKLOG-ARCHIV.md + BACKLOG.md + MEMORY.md einmalig am Block-Ende. Lücken-Alarm beim /start ist im Block-Modus erwartetes Verhalten — nicht als Fehler werten.
