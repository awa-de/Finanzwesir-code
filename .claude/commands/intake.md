Führe das Intake-Protokoll für eine neue Aufgabe aus.

---

# Intake – Neue Aufgabe aufnehmen

Trigger: Albert sagt „neue Aufgabe" / „neues Problem" / sinngemäß — oder Claude klassifiziert
die Eingabe als NEUE AUFGABE (→ [Eingangs-Routing] in CLAUDE.md).

Claude stellt die Fragen. Albert antwortet kurz. Claude schreibt den BACKLOG-Eintrag.

---

## Protokoll (Reihenfolge einhalten)

Claude stellt diese 5 Fragen nacheinander:

1. **Bereich?**
   Engine / CSS / Design / Theme / App / Content / Cleanup / Sonstiges

2. **Problem in 1 Satz?**
   Was ist das eigentliche Problem — nicht die Lösung.

3. **Priorität?**
   H = launch-blockierend / M = wichtig, aber nicht blockierend / L = nice-to-have

4. **Abhängigkeiten?**
   AP-IDs die vorher abgeschlossen sein müssen — oder „keine".

5. **Detail-Datei nötig?**
   Komplexer Scope (viele Dateien, unklare Ursache, Architekturwirkung) → ja
   Einfache Task (klar, 1–2 Dateien, bekannte Lösung) → nein

---

## Abschluss

Claude zeigt den geplanten BACKLOG-Eintrag als Preview:

```
| [ID] | [Bereich] | [Titel] | [Prio] | [Dep] | [Detail oder —] |
```

Albert: „OK" → Claude schreibt den Eintrag in `docs/steering/BACKLOG.md`.
Kein Schreiben ohne Alberts explizite Bestätigung.
