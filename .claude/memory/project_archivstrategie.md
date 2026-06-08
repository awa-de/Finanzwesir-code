---
name: project-archivstrategie
description: Archivstrategie für Finanzwesir 2.0 entschieden (2026-06-08) — drei Ebenen: Aktive Dateien / Archiv / Git
metadata:
  type: project
---

`Archiv/` ist versionierbares kuratiertes Projektarchiv. `Archiv/local/` ist gitignored und enthält Rohmaterial, Binärdateien, LLM-Dumps und unkuratiertes Material.

**Why:** Historische Analysen und LLM-Peer-Reviews lagen im aktiven Kontext und konnten mit aktuellem Stand verwechselt werden. Die Dreiteilung (Aktive Dateien / Archiv / Git) schafft klare Wahrheitsebenen.

**How to apply:** Beim Lesen von Archiv/-Dateien: nur Inhalte außerhalb von `Archiv/local/` sind kuratiert und versionierbar. Bei neuen Archiv-Operationen: Binärdateien, LLM-Dumps, Rohmaterial → `Archiv/local/`. Kuratierte Erkenntnisse → `Archiv/`. Grundsatz in [[NAVIGATION]] § Archivstrategie / Kontext-Hygiene verankert.
