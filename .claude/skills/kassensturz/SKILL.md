---
name: kassensturz
description: Wöchentlicher Trend-Check des Projektstands. Automatisch montags in /start, sonst manuell per /kassensturz. Zeigt AP-Entwicklung, Blocker und Tendenz.
---

# Skill: kassensturz

Trigger: Automatisch wenn /start an einem Montag ausgeführt wird, ODER manuell per `/kassensturz`.

---

## Sequenz

1. `docs/steering/BACKLOG.md` lesen (live — keine hardcodierten Spalten)
2. `.claude/ATTEMPT-LOG.json` lesen
3. `PROJECT-STATUS.md` — letzte Session lesen
4. Output erzeugen (Format unten)
5. Abschlussfrage stellen

---

## Output-Format

```
KASSENSTURZ | KW [N] | [Datum]
APs gesamt:              [N] (H: [a] | M: [b] | L: [c])
Abgeschlossen seit KW [N-1]: [N]
Neu hinzugekommen:       [N]
BLOCKED:                 [N] — [AP-IDs / "keine"]
Ältester offener AP:     [AP-ID] seit [Datum wenn bekannt / "unbekannt"]
Trend vs. KW [N-1]:      besser / schlechter / stabil
Abweichungen:            [konkret, z.B. "AP-6c seit 3 Wochen aktiv ohne Fortschritt" / "keine"]
Empfehlung:              [1 Satz]

→ Stimmt dieses Bild mit deiner Wahrnehmung überein?
```

**Wenn Basisdaten fehlen:** BACKLOG-ARCHIV.md enthält keine einheitlichen KW-Angaben — Trend und
KW-Vergleichswerte sind dann nicht berechenbar. In diesem Fall:
→ „Trend vs. KW [N-1]: nicht berechenbar (kein Vorwert)"
→ „Abgeschlossen seit KW [N-1]: nicht berechenbar"
→ Alle anderen Felder aus aktuellem BACKLOG.md berechnen
→ Trotzdem vollständig ausgeben — Teilinformation ist besser als kein Kassensturz.

**Schlüsselregel:** Kassensturz ist Trend-Check, nicht Tageslage.
Kernfrage: „Wird das Projekt besser oder schlechter?"
