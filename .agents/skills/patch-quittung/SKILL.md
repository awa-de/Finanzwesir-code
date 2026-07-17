---
name: patch-quittung
description: Automatische Quittung nach jedem abgeschlossenen Patch (Light- und Full-Gate). Zählt Änderungen, bestätigt Tabu-Check, benennt Testfall. Kein nächster Patch ohne Alberts Testbestätigung.
---

# Skill: patch-quittung

Trigger: Automatisch nach jedem abgeschlossenen Patch — Light-Gate UND Full-Gate.
Aufwand für Albert: 5 Sekunden überfliegen + Testfall bestätigen.

---

## Sequenz

1. AP-ID und Datum aus aktuellem Kontext bestimmen
2. Geänderte Dateien und Stellen zählen (exakt)
3. Tabu-Dateien prüfen (Layer-1 + PROTECTED_PATHS)
4. CHANGED/NEW-Markierungen im Code bestätigen
5. Testfall aus Gate übernehmen
6. Quittungsdatei in `docs/steering/patches/` schreiben (Pflicht — nicht nur Chat-Ausgabe)
   Dateiname: `PATCH-[AP-ID oder Kurzname]-[YYYY-MM-DD].md`
7. Quittung zusätzlich im Chat ausgeben (Kurzform)

---

## Output-Format

```
PATCH-QUITTUNG | AP [ID] | [Datum]
Beauftragt:    [1-Satz Beschreibung des Auftrags]
Geändert:      [N] Datei(en), [M] Stelle(n)
Dateien:       [Liste]
CHANGED/NEW:   [✓ markiert / FEHLT: Zeile X / N/A — Markdown-Patch, keine Code-Marker nötig]
Tabu-Check:    [keine ✓ / ACHTUNG: ...]
Gate-Typ:      [Light / Full]
Testfall:      [lokale HTML-Datei + Chart/CSV-Fall]
Offene Fragen: [keine / Liste]

Zählprüfung: Ich habe [M] Stellen geändert. Aufzählen?
→ Bitte teste mit [Testfall]. Ich warte vor dem nächsten Patch.
```

**Schlüsselregel:** Kein nächster Patch ohne Alberts Testbestätigung.
