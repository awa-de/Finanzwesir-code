---
name: feedback-strukturannahmen
description: Pfade, Dateistrukturen und Code-Strukturen immer aus aktuellem Stand lesen — nie annehmen
metadata:
  type: feedback
---

Datei- und Ordnerstrukturen, Pfade und Code-Signaturen immer aus dem aktuellen Projektstand lesen. Keine Annahmen über „wo etwas liegen dürfte".

**Why:** Mehrfach nachgewiesene Fehlerquelle:
- 2026-06-03: NAVIGATION.md-Textreferenz angenommen statt verifiziert
- 2026-06-04: CSVParser-Pfad als `fw-chart-engine/*.js` angenommen, korrekt war `data/`
- 2026-06-05: `hasRequiredColumns` date-Prüfung als toter Code angenommen

**How to apply:** Vor Pfadangaben: Read oder Grep ausführen. Vor Aussagen über Code-Struktur: die Datei lesen. „Dürfte in .../X liegen" ist kein valider Zustand — immer verifizieren. Verwandt: [[feedback-glob-vs-read]].
