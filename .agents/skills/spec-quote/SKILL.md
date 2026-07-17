---
name: spec-quote
description: Verhindert, dass Annahmen als Spec-Fakten ausgegeben werden. Bei Engine-, App-, CSS-, Architektur-Entscheidungen und technischen Tatsachenbehauptungen immer anwenden (inline, kein separater Block).
---

# Skill: spec-quote

Trigger: Bei implementierungsrelevanten Behauptungen, die nicht direkt aus aktuell gelesenen
Dateien ableitbar sind — konkret: Engine-, App-, CSS-, Architektur-Entscheidungen sowie
technische Tatsachen, die Codex nicht soeben in einer gelesenen Datei gesehen hat.
Nicht anwenden für: direkt sichtbare Dateiinhalte, allgemein bekannte Syntax, offensichtliche
Ableitungen aus dem aktuellen Kontext.
Ziel: Verhindert, dass Annahmen als Spec-Fakten ausgegeben werden — ohne jeden Satz zu markieren.

---

## Format (inline — kein separater Block nötig)

Nach jeder technischen Behauptung:

```
[Behauptung]
→ Quelle: [Spec-Datei, Abschnitt / Code-Datei, Zeile / ANNAHME — nicht belegt]
→ Status: belegt ✓ / Interpretation / UNBELEGT ⚠
```

---

## Schlüsselregel

Wenn nicht belegt → Präfix **„UNBELEGT:"** zwingend.
Nicht als Tatsache ausgeben.

Beispiel:
```
fwContext wird in FwChartPlugins.js konsumiert.
→ Quelle: ANNAHME — nicht belegt
→ Status: UNBELEGT ⚠
```
