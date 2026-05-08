---
name: subagent-dispatch
description: Entscheidungshilfe für den Einsatz von Subagenten bei mechanischer Zuarbeit (Suche, Inventur, Extraktion). Trigger aus BUG/FIX-Schritt 7 in CLAUDE.md.
---

# Subagent-Dispatch – Finanzwesir 2.0

Trigger: Aus [Eingangs-Routing] BUG/FIX Schritt 7 — bei Datei-Suche, Bulk-Read
oder parallelen Teilaufgaben prüfen ob Subagent sinnvoll ist.

---

## Wann Subagenten einsetzen?

Geeignet — mechanisch, überprüfbar, kein Urteil nötig:
- grep/glob über mehrere Dateien
- Import-/Export-Inventur
- Vorkommenssuche in der Codebase
- Extraktion relevanter Spec-Stellen
- einfache Checklistenprüfung
- Regression-Scout als Zuarbeit (Fundstellen liefern, nicht bewerten)
- Zusammenfassung einzelner isolierter Quellen

Nicht geeignet — Urteil, Abwägung, Risiko:
- Architekturentscheidung
- Gate-Entscheidung
- Tabu-Zonen-Abwägung
- Synthese widersprüchlicher Befunde
- Sicherheitsurteil
- finale Patchplanung

---

## Modell-Tiering

| Modell | Einsatzbereich |
|---|---|
| Haiku | Mechanische Zuarbeit: Suche, Inventur, Extraktion, einfache Checkliste |
| Sonnet | Hauptinstanz: Synthese, Gate, Codeplan, Kommunikation mit Albert |
| Opus | Reserve: besonders schwierige Architektur-, Sicherheits- oder Tradeoff-Fragen |

---

## Eskalationsregel

Wenn ein Subagent urteilen, gewichten, priorisieren oder riskant entscheiden müsste:
→ Abbruch. Befund an Hauptinstanz zurückgeben:
„Hier ist was ich gefunden habe. Bewertung liegt bei dir."

---

## Hauptinstanz bleibt verantwortlich für

Interpretation, Risikoabwägung, Gate, Kommunikation mit Albert,
finaler Patchplan, finale Antwort.

Subagenten spawnen keine weiteren Subagenten. Nur die Hauptinstanz spawnt.
