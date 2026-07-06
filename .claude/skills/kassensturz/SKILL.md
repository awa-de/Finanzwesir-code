---
name: kassensturz
description: Wöchentlicher Trend-Check des Projektstands. Automatisch montags in /start, sonst manuell per /kassensturz. Zeigt AP-Entwicklung, Blocker und Tendenz.
---

# Skill: kassensturz

Trigger: Automatisch wenn /start an einem Montag ausgeführt wird, ODER manuell per `/kassensturz`.

---

## Sequenz

1. `docs/steering/BACKLOG.md` lesen (live — keine hardcodierten Spalten)

1a. `.claude/learning/session-log.md` lesen
1b. `.claude/learning/patterns.md` lesen
1c. Python-Abfrage ausführen (Bash-Tool):
    `python tools/kassensturz-archiv-query.py --since [Kassensturz-Datum aus HOOK-META]`
    → Ergebnis direkt als `Abgeschlossen seit KW [N-1]` + AP-IDs in Output einsetzen.
    → Fallback wenn Skript fehlschlägt: „nicht berechenbar (Skript-Fehler)"

2. `.claude/ATTEMPT-LOG.json` lesen
3. `PROJECT-STATUS.md` — letzte Session lesen
3a. Wenn PROJECT-STATUS.md/HOOK-META eine Commit-Status-Aussage enthält („Commit steht aus“ o.ä.): vor Übernahme in „Abweichungen“/„Empfehlung“ gegen `git log --oneline -5` prüfen, nicht ungeprüft weiterreichen (Reoccurrence 2026-07-04/2026-07-06, siehe [[feedback-gruendlichkeit-vor-tempo]]).
4. Output erzeugen (Format unten)
5. Abschlussfrage stellen

---

## Subagent-Zuarbeit

Für mechanische Projektinventur Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard-Agent: `abschluss-scout`

`abschluss-scout` liefert:

- AP-Zählung nach Priorität, neu hinzugekommene und abgeschlossene APs
- BLOCKED-APs, ältester offener AP
- relevante session-log- / patterns-Signale
- PROJECT-STATUS- / HOOK-META-Fundstellen

Die Hauptinstanz formuliert Trend, Abweichung, Risiko und Empfehlung.
Subagent-Aufruf und Rückfall müssen sichtbar quittiert werden (→ `.claude/skills/subagent-dispatch/SKILL.md`).

---

## Output-Format

```
KASSENSTURZ | KW [N] | [Datum]
APs gesamt:              [N] (H: [a] | M: [b] | L: [c])
Abgeschlossen seit KW [N-1]: [N] — [AP-IDs aus Python-Skript]
Neu hinzugekommen:       [N / "nicht berechenbar"]
BLOCKED:                 [N] — [AP-IDs / "keine"]
Ältester offener AP:     [AP-ID] seit [Datum wenn bekannt / "unbekannt"]
Trend vs. KW [N-1]:      besser / schlechter / stabil
Abweichungen:            [konkret, z.B. "AP-6c seit 3 Wochen aktiv ohne Fortschritt" / "keine"]
Empfehlung:              [1 Satz]

→ Stimmt dieses Bild mit deiner Wahrnehmung überein?

## Lern-Loop
Session-Log:         [X] Einträge seit letztem Distill ([YYYY-MM-DD / "noch kein Distill"])
Qualitätsrate:       [X] von [N] APs ohne Vorkommnisse (Ziel: 100%)
Pattern-Kandidaten:  [X] offen | observing: [X] | retired: [X]
Letzte Promotion:    [YYYY-MM-DD (Muster: "...") / "noch keine"]
Zeit seit Distill:   [X] Tage / "noch kein Distill"

→ /distill ausführen? (nur wenn Schwelle erreicht — Albert entscheidet)
```

**Hinweis:** Kassensturz löst `/distill` nicht automatisch aus — zu fragil bei erratischem Rhythmus.
Distill-Trigger liegt bei `/start` (Schwellen-basiert).

**Wenn Basisdaten fehlen:** Skript (Schritt 1c) schlägt fehl oder Kassensturz-Datum fehlt im HOOK-META:
→ „Abgeschlossen seit KW [N-1]: nicht berechenbar (Skript-Fehler)"
→ Alle anderen Felder aus aktuellem BACKLOG.md berechnen
→ Trotzdem vollständig ausgeben — Teilinformation ist besser als kein Kassensturz.

„Neu hinzugekommen" und „Ältester offener AP" bleiben nicht berechenbar — BACKLOG.md
enthält kein Erstelldatum pro Eintrag.

**Schlüsselregel:** Kassensturz ist Trend-Check, nicht Tageslage.
Kernfrage: „Wird das Projekt besser oder schlechter?"