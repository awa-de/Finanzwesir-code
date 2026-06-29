---
name: feedback-verbalisierung-vor-aktion
description: "Erst Ansatz verbalisieren, dann Gate/Edit/Aktion starten — bei nicht-trivialen Aktionen nicht direkt in die Ausführung springen"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ad62bdbb-a95b-4dbc-af77-94f5ebbe6106
---

Bei nicht-trivialen Aktionen erst den Ansatz in eigenen Worten formulieren, dann Gate oder Aktion starten.

**Why:** Zweimal aufgetreten: (1) Claude startete sofort Full-Gate ohne zu prüfen ob der Ansatz (Python-Datei schreiben) überhaupt richtig war (Kassensturz-Archiv-Query, 2026-06-22). (2) Albert stoppte Claude vor NAVIGATION.md-Edit: „Erkläre erst in eigenen Worten" — erst nach Verbalisierung Freigabe (Archiv/local/-Verschiebung, 2026-06-08). Gemeinsames Muster: direkt in Ausführungsebene gesprungen ohne Ansatz abgestimmt zu haben.

**How to apply:** Wenn die Aufgabe noch nicht als konkreter Ansatz vorliegt (z.B. „ich schreibe ein Python-Skript" wurde noch nicht abgestimmt): erst sagen was geplant ist, dann Gate starten. Gilt besonders bei: neuer Implementierungsentscheidung, mehreren betroffenen Dateien, schwer umkehrbaren Operationen. Verwandt: [[feedback_gate_scope_dialog]].
