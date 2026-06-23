Stand: 2026-06-23 09:41 | Session: CHRONIK-SPEC-01 | Geändert von: Claude

# Chroniken — Finanzwesir 2.0

Dieser Ordner ist die Heimat der **Chroniken**: verdichtete, bewertungsfreie
Extrakte abgeschlossener LLM-Arbeitsfäden. Eine Chronik friert einen
Arbeitsmoment ein — Was war das Ziel, was wurde versucht, welche Irrwege,
welche Wendepunkte, welcher Endstand — als Rohmaterial für spätere
Musteranalyse und das Making-of.

Verbindliche Regeln (Definition, Frontmatter-Vertrag, geschlossene Vokabel,
Namenskonvention, Workflow): **`docs/steering/CHRONIK-SPEZIFIKATION.md`**.
Werkzeug zur Erstellung: `docs/steering/CHRONIK-PROMPT.md`.

## Aufbau

- `chronist-v1/` — Chroniken nach aktuellem Standard (bewertungsfrei, mit
  vollständigem Frontmatter `standard: chronist-v1`).
- `legacy/` — Proto-Chroniken aus der Frühzeit (`standard: legacy`).
  Auffindbar, aber nicht qualitätsgleich. Inhalt unangetastet, nur das
  Frontmatter wurde nachträglich ergänzt. Archäologen-Prinzip: das
  angeknabberte Papyrus wird ehrlich etikettiert, nicht nachgemalt.

## Einordnung im Archivmodell

Chroniken tragen den Status `HIST + MAKING_OF_BELEG` (siehe
`docs/steering/ARCHIV-STRATEGIE.md`).

Dieser Ordner ist **kein operativer Standardkontext** für Claude. Claude liest
Chroniken nur auf ausdrückliche Anweisung von Albert oder wenn ein AP explizit
Chronik-/Archivarbeit verlangt. Aktuelle, handlungsleitende Regeln stehen im
aktiven Pfad, nicht hier.

## Hinzufügen einer neuen Chronik

1. `docs/steering/CHRONIK-PROMPT.md` ans Ende des abzuschließenden Fadens
   kopieren; das LLM liefert eine `.md` mit Frontmatter und Dateinamen
   `CHRONIK-YYYY-MM-DD-thema.md`.
2. Datei in `chronist-v1/` ablegen.
3. `/chronik-check` ausführen (Frontmatter deterministisch gegen die geschlossenen
   Listen prüfen).
