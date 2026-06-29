---
name: feedback-kontext-vs-tokens
description: "Kontext vor Token-Effizienz — Outputs lieber selbsterklärend als kurz, wenn LLM-Lesbarkeit oder git-History auf dem Spiel steht"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ad62bdbb-a95b-4dbc-af77-94f5ebbe6106
---

Wenn zwischen tokeneffizientem Kurzformat und kontextreichem Langformat abgewogen wird: Langformat bevorzugen, sofern der Output als Gedächtnisspur für zukünftige LLM-Kontext-Queries oder als git-History dient.

**Why:** LLM-Tauglichkeitstest mit Commit-Messages (B1-AP-15d, 2026-06-22): Kurzform versagt bei Kontext-Queries wie „warum kein FwBarLayoutPlugin?" — Langform liefert selbsterklärende git-History. Albert hat Langformat als bewusste Design-Entscheidung bestätigt.

**How to apply:** Betrifft primär Commit-Messages (Langformat per abschluss-ritual §8.1), aber auch Ergebnisprotokolle und Dokumentations-Abschnitte. Tokeneinsparung ist kein Grund für Informationsverlust, wenn der Output als Gedächtnisspur für LLM-Sessions oder als git-History-Nachweis dient.
