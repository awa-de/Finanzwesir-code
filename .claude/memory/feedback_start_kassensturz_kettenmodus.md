---
name: start-kassensturz-kettenmodus
description: KETTENMODUS muss Kassensturz/Distill-Routinen AUCH ausführen (nicht nur VOLLMODUS)
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e4adc210-9dfa-4525-84b7-a1f29113042b
---

**Regel:** Wenn Hook-Output `Wochentag: Monday`, dann wird `/kassensturz` und Distill-Empfehlung **auch in KETTENMODUS** ausgeführt, nicht nur in VOLLMODUS.

**Why:** RITUAL-OPT-2 (2026-07-12) optimierte `/start` read-frei, aber vergaß dabei die Kassensturz/Distill-Logik in KETTENMODUS einzubauen. Folge: Montags kam keine automatische Kassensturz → Reporting-Lücke. Die Dokumentation in start.md enthielt die Logik, aber nur in "Schritt 5 (Vollmodus)", nicht in KETTENMODUS.

**How to apply:** Vor /start-Änderungen: prüfen, dass Kassensturz-Logik in BEIDEN Pfaden (VOLLMODUS + KETTENMODUS) aktiv ist. Schwellen aus Hook-Output nutzen (`Kassensturz-Datum`, `Letzter-Distill`, `Log-Eintraege`, `Pattern-Kandidaten`) — nicht read-frei verlangen, Hook liefert die Daten bereits.

**Related:** 
- start.md Zeile 27–35 (KETTENMODUS)
- start.md Zeile 97–125 (Schritt 5, Kassensturz + Distill)
- NAVIGATION.md Zeile 41 (Kassensturz auch in KETTENMODUS)
