---
name: subagent-dispatch
description: Entscheidungshilfe für den Einsatz von Subagenten bei mechanischer Zuarbeit (Suche, Inventur, Extraktion). Trigger aus dem Universellen Subagent-Check in CLAUDE.md.
---

# Subagent-Dispatch – Finanzwesir 2.0

Trigger: Aus [Eingangs-Routing] Universeller Subagent-Check — bei mechanischen
Teilschritten prüfen, ob ein Subagent sinnvoll ist.

---

## Grundsatz

Subagenten sind keine zweite Meinung und kein Ersatz für Urteil.
Sie sind mechanische Zuarbeiter.

Die Hauptinstanz bleibt verantwortlich für:
- Interpretation
- Risikoabwägung
- Gate
- Kommunikation mit Albert
- Patchplan
- finale Antwort

Subagenten spawnen keine weiteren Subagenten. Nur die Hauptinstanz spawnt.

---

## Wann Subagenten einsetzen?

Geeignet — mechanisch, überprüfbar, kein Urteil nötig:
- grep/glob über mehrere Dateien
- Import-/Export-Inventur
- Vorkommenssuche in der Codebase
- Extraktion relevanter Spec-Stellen
- einfache Checklistenprüfung
- Regression-Scout als Zuarbeit: Fundstellen liefern, nicht bewerten
- Zusammenfassung einzelner isolierter Quellen

Nicht geeignet — Urteil, Abwägung, Risiko:
- Architekturentscheidung
- Gate-Entscheidung
- Tabu-Zonen-Abwägung
- Synthese widersprüchlicher Befunde
- Sicherheitsurteil
- finale Patchplanung

---

## Dispatch-Schwellenwert

Dispatch lohnt sich bei mindestens einem dieser beobachtbaren Kriterien:
- mehr als 3 Dateien lesen
- mehr als 5 Fundstellen sammeln
- Bulk-Verarbeitung von mehr als 5 gleichartigen Elementen
- Suche über mehrere Verzeichnisse
- isolierbare Spec-/Codebase-Scout-Aufgabe

Darunter: Hauptinstanz erledigt es direkt.

---

## Wirtschaftlichkeits-Check

Vor jedem Dispatch drei Fragen beantworten:

1. Scope: Wie viele Dateien/Stellen werden durchsucht?
2. Nutzung: Fließt das Ergebnis direkt in Gate, Plan oder Antwort ein?
3. Overhead: Ist das Briefing in einem Satz formulierbar?

Nur wenn alle drei Antworten positiv sind: Dispatch ausführen.

---

## Bevorzugte Agenten

| Agent | Einsatz |
|---|---|
| `codebase-scout` | Code-Suche, Imports, Exports, Vorkommen, Datei-Inventur |
| `spec-scout` | Spec-/Doku-Fundstellen extrahieren |
| `regression-scout` | potenzielle Regressionstellen sammeln, nicht bewerten |

Default:
Mechanische Recherche immer mit passendem Haiku-Agent, sofern vorhanden.
Wenn kein passender Agent existiert: Hauptinstanz erledigt es direkt oder fragt Albert, ob ein Agent angelegt werden soll.

---

## Briefing-Template

Für jeden Dispatch verwenden:

```markdown
## Subagent-Briefing
Aufgabe: [1 Satz — was suchen/inventarisieren/extrahieren]
Scope:   [Verzeichnis / Dateimuster]
Output:  [Liste / JSON / Zeilennummer + Kontext]
Nicht tun: bewerten, verändern, raten
Rückgabe: Fundstellen — fertig.
```

---

## Modell-Tiering

| Modell | Einsatzbereich |
|---|---|
| Haiku | Mechanische Zuarbeit: Suche, Inventur, Extraktion, einfache Checkliste |
| Sonnet | Hauptinstanz: Synthese, Gate, Codeplan, Kommunikation mit Albert |
| Opus | Reserve: besonders schwierige Architektur-, Sicherheits- oder Tradeoff-Fragen |

Wichtig:
Subagenten nutzen Haiku nur dann verlässlich, wenn die jeweilige Agent-Datei in `.claude/agents/`
`model: haiku` setzt. Ohne Modellfeld kann der Subagent das Modell der Hauptinstanz erben.

---

## Eskalationsregel

Wenn ein Subagent urteilen, gewichten, priorisieren oder riskant entscheiden müsste:
→ Abbruch. Befund an Hauptinstanz zurückgeben:
„Hier ist, was ich gefunden habe. Bewertung liegt bei dir."
