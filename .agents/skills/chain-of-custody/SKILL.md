---
name: chain-of-custody
description: Datenfluss-Prüfung bei Berührung von fwContext, Layer-1-Dateien, Plugin-/Tooltip-/Layout-Kontext oder Layer-Grenzen. Läuft nach Full-Gate, nicht stattdessen.
---

# Skill: chain-of-custody

Trigger: Wenn `fwContext`, `FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js`,
Layer-1-Grenzen, Plugin-/Tooltip-/Layout-Kontext oder Datenfluss zwischen Layern berührt wird.
Läuft nach Full-Gate — ist Erweiterung, kein Ersatz.

---

## 7 Pflichtfragen vor Code

1. Welche Datei ist Single Source of Truth für diese Daten/Logik?
2. Wer konsumiert diese Daten downstream?
3. Welche Transformationen sind laut Spec erlaubt?
4. Wo endet die Zuständigkeit dieser Datei (Layer-Grenze)?
5. Was bricht downstream, wenn sich Format oder Typ ändert?
6. Ist eine Tabu-Datei beteiligt? Falls ja: hat Albert in diesem Faden explizit Freigabe erteilt?
7. Fließen die Daten nur abwärts (Layer 1→2→3→4→5)?

---

## Output

**Wenn alles intakt:**
```
CHAIN-OF-CUSTODY-CHECK: intakt ✓
```

**Wenn Problem erkannt:**
```
CHAIN-OF-CUSTODY-CHECK: STOP
Grund: [konkrete Antwort auf welche Frage gescheitert ist]
Kleinste Alternative: [1 Satz]
```
