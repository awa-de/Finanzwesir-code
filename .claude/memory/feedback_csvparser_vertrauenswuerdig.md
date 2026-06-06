---
name: feedback-csvparser-vertrauenswuerdig
description: CSVParser-Output vollständig vertrauen — keine sekundäre Validierung des Parser-Outputs
metadata:
  type: feedback
---

Was CSVParser.js zurückgibt, ist korrekt und vollständig validiert. Keine eigene Re-Validierung der Parser-Felder im App-Code.

**Why:** CSVParser ist Layer-1-TABU und direkt von Albert kontrolliert. Doppelvalidierung ist widersprüchlich (impliziert Misstrauen gegenüber Layer 1) und unnötig. Promoviert in Distill 6, 2026-06-05.

**How to apply:** Nach `CSVParser.parse()`: Ergebnis direkt verwenden. Keine eigene CSV-Logik, kein erneutes Prüfen der `date`- oder `index_value`-Felder auf Korrektheit. Fehlerbehandlung nur für Netzwerk-/Lade-Fehler, nicht für Parser-Output-Qualität.
