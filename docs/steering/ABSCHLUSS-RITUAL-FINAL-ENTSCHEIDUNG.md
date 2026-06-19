Stand: 2026-06-19 | Session: Abschluss-Ritual-Final | Geändert von: ChatGPT

# Abschluss-Ritual Final — Endentscheidung

## Amtliches Ergebnis

Die finale Version übernimmt die Endentscheidung aus dem Review:

1. P1, P2, P3 werden unverändert eingebaut.
2. P4 wird als einmaliger BACKLOG-FAIL-Recovery eingebaut, kein Loop.
3. P5 wird als Sessionwechsel-Hinweis eingebaut; die eigentliche `/start`-Anpassung ist ein eigenes AP.
4. P6 wird als BACKLOG-ARCHIV-Template in den Writer eingebaut.

Finaler Leitsatz:

> **Genau schlägt preiswert. Token sparen ist erlaubt, solange keine start- oder steuerungskritische Wahrheit auf später verschoben wird.**

---

## Patch-Entscheidung

| Patch | Entscheidung | Begründung |
|---|---|---|
| P1 — Terminologie „Ketten-Minimalabschluss“ | übernommen | Konsistente Sprache verhindert Fehlbedienung |
| P2 — 90-Minuten-Regel streichen | übernommen | Nicht zuverlässig messbar, erzeugt Scheinpräzision |
| P3 — NAVIGATION-Mehrdeutigkeit | übernommen | echter Drift-Pfad, niedrige Kosten |
| P4 — BACKLOG-FAIL Recovery | abgeschwächt übernommen | ein gezielter Retry, kein Loop |
| P5 — DEFERRED bei Sessionwechsel | übernommen | wichtiger Hinweis, `/start`-Umsetzung später |
| P6 — BACKLOG-ARCHIV-Template | übernommen | billige Absicherung gegen Formatdrift |

---

## Risikomatrix

| Patch | Risiko ohne Patch | Schaden | Token-Kosten | Sicherheitsgewinn |
|---|---|---:|---:|---:|
| P1 | Begriffliche Unschärfe beim Rückfragemodus | niedrig–mittel | praktisch 0 | niedrig–mittel |
| P2 | nicht umsetzbare Zeitregel, stilles Ignorieren | mittel | spart sogar Komplexität | mittel |
| P3 | falsche NAVIGATION-Zeile oder Mehrfachtreffer | hoch | sehr niedrig | hoch |
| P4 | BACKLOG-FAIL führt zu unnötiger Eskalation oder gleicher Fehler wiederholt sich | mittel–hoch | nur im Fehlerfall | mittel–hoch |
| P5 | offene DEFERRED-Marker nach Sessionwechsel werden übersehen | mittel | fast 0 | mittel–hoch |
| P6 | Archivzeile driftet im Tabellenformat | mittel | fast 0 | mittel |

---

## Finale Architektur

Der Ketten-Minimalabschluss ist ein vollständiger Steuerdateien-Abschluss, kein Lückenmodus.

Sofort aktualisiert werden:

- session-log
- NAVIGATION
- PROJECT-STATUS/HOOK-META
- BACKLOG
- BACKLOG-ARCHIV

Deferred ist nur erlaubt für:

- MEMORY-CHECK
- SPEC-CHECK
- WORKING-FEATURES-CHECK

Haiku darf mechanisch schreiben, aber nicht entscheiden.

Claude darf bei Modusunsicherheit fragen. Albert muss sich nichts merken.

---

## Noch offener Folgepunkt

Eigenes späteres AP:

```text
/start-DEFERRED-Erkennung: Offene DEFERRED-Marker aus session-log beim Start erkennen und Reflexions-Check vorschlagen.
```

Dieses AP ist nicht Teil des Abschluss-Ritual-Skills, aber die finale Version enthält einen Hinweis darauf.
