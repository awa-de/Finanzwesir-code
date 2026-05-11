---
name: subagent-dispatch
description: Zentrale Subagent-Policy für Finanzwesir 2.0. Agentenmatrix, Trigger, Faustregel, Nicht-Delegationsregeln und Standard-Rückgabeformat. Alle lokalen Commands/Skills verweisen hierher.
---

# Subagent-Dispatch – Finanzwesir 2.0

Trigger:
- explizit per `/subagent-dispatch`
- aus Commands/Skills, die mechanische Zuarbeit auslagern
- bei Full-Gates mit vielen Pflichtquellen
- bei App-Spec-Erstellung, Selftests, Kassensturz, Spec-Rewrites, Code-Reviews,
  manuellen Testplänen oder Abschluss-Ritual

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

Nicht delegieren — Hauptinstanz behält immer:
- Gate-Urteil
- Blocker/Nicht-Blocker
- Security-Bewertung
- Architekturentscheidung
- Freigabefrage
- Risikoabwägung
- Synthese widersprüchlicher Befunde
- finale APP_SPEC-Formulierung
- Slice-Plan-Finalisierung
- Dateiänderungen
- Commit-Message
- PROJECT-STATUS-Finalisierung
- Regelaufnahme in CLAUDE.md
- Rollback-Entscheidung (ob zurückgerollt, verworfen oder fortgeführt wird)

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

## Agentenmatrix

| Agent | Einsatz |
|---|---|
| `spec-scout` | Specs, Doku, Steering, Commands, Skills, Regelstellen, Pflichtquellen, Widerspruchskandidaten |
| `codebase-scout` | Code-Fundstellen, Imports/Exports, Symbole, CSS-Klassen, ähnliche Implementierungen |
| `regression-scout` | Regressionsflächen, Testfälle, Call-Sites, Working-Features, Test-HTMLs, Testdaten |
| `abschluss-scout` | Abschluss, DoD, Backlog, Archiv, PROJECT-STATUS, HOOK-META, Commit-Kontext |

Default:
Mechanische Recherche immer mit passendem Haiku-Agent, sofern vorhanden.
Wenn kein passender Agent existiert: Hauptinstanz erledigt es direkt oder fragt Albert, ob ein Agent angelegt werden soll.

---

## Faustregel: spec-scout vs. codebase-scout

- Prosa, Regeln, Tabellen, Spezifikationen, Markdown-Erklärungen → `spec-scout`
- Code, Symbole, Imports, Exports, CSS-Klassen, Funktionsstrukturen → `codebase-scout`
- Markdown mit Codebeispielen: Zielinformation entscheidet.
  - Prosa-Regel / fachlicher Vertrag → `spec-scout`
  - konkrete Code-Struktur / Symbolik → `codebase-scout`

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

## Standard-Rückgabeformat

Scouts geben zurück:

```
## Scout-Ergebnis

Aufgabe: [...]
Scope: [...]
Gelesene Quellen:
- [...]

Relevante Fundstellen:
- Datei / Abschnitt / kurzer Befund

Mögliche Widersprüche:
- [...]

Nicht gefunden / offene Punkte:
- [...]

Grenze:
Keine Bewertung, keine Entscheidung, keine Änderung.
```

---

## Modell-Tiering

| Modell | Einsatzbereich |
|---|---|
| Haiku | Mechanische Zuarbeit: Suche, Inventur, Extraktion, einfache Checkliste |
| Sonnet | Hauptinstanz: Synthese, Gate, Codeplan, Kommunikation mit Albert |
| Opus | Reserve: besonders schwierige Architektur-, Sicherheits- oder Tradeoff-Fragen |

In diesem Projekt: `CLAUDE_CODE_SUBAGENT_MODEL=haiku` ist in `.claude/settings.local.json` gesetzt
und erzwingt Haiku für alle Subagenten zentral.
Agent-Dateien in `.claude/agents/` setzen trotzdem `model: haiku` — damit die Absicht lokal sichtbar bleibt.
Wenn beides fehlt, kann ein Subagent das Modell der Hauptinstanz erben.

---

## Eskalationsregel

Wenn ein Subagent urteilen, gewichten, priorisieren oder riskant entscheiden müsste:
→ Abbruch. Befund an Hauptinstanz zurückgeben:
„Hier ist, was ich gefunden habe. Bewertung liegt bei dir."

---

## Sichtbare Dispatch-Quittung

Vor jedem Subagent-Aufruf meldet Claude sichtbar:

`Subagent-Dispatch: [agent-name] (Haiku) — [mechanische Aufgabe], keine Entscheidungen.`

Beispiele:

`Subagent-Dispatch: spec-scout (Haiku) — mechanische Quellenextraktion aus Pflichtquellen, keine Entscheidungen.`
`Subagent-Dispatch: regression-scout (Haiku) — Testflächen und Regressionsrisiken sammeln, keine Bewertung.`
`Subagent-Dispatch: codebase-scout (Haiku) — Code-Fundstellen und Symbolik sammeln, keine Bewertung.`
`Subagent-Dispatch: abschluss-scout (Haiku) — Backlog-/Status-/DoD-Fundstellen sammeln, keine Entscheidungen.`

Nach Rückkehr des Subagenten meldet Claude sichtbar:

`Scout-Ergebnis erhalten: [Kurzumfang]. Hauptinstanz übernimmt Urteil/Synthese.`

Beispiel:

`Scout-Ergebnis erhalten: 8 Quellen, 14 Fundstellen, 2 Widerspruchskandidaten, 1 nicht gefunden. Hauptinstanz übernimmt Gate-Urteil und Slice-Plan.`

Kein stiller Subagent-Aufruf.
Scout-Ergebnis und Hauptinstanz-Urteil müssen sichtbar getrennt sein.

---

## Rückfall-Regel

Wenn Subagent-Zuarbeit laut Policy angezeigt ist, aber nicht genutzt wird, muss Claude sichtbar begründen:

`Subagent übersprungen: [Grund].`

Zulässige Gründe:
- Scope zu klein
- benötigter Agent passt nicht
- Agent nicht verfügbar
- Aufgabe ist Urteil/Synthese, nicht mechanische Zuarbeit
- Sicherheits-/Kontextgrund

Unzulässig:
- stilles Selbstlesen vieler Pflichtquellen
- stiller Rückfall auf Hauptinstanz-Lesen
- nachträgliche Behauptung, ein Scout sei genutzt worden, ohne Dispatch-Quittung

Merksatz:
Kein stiller Scout.
Kein stiller Nicht-Scout.

---

## Anti-Drift

Diese Datei ist die einzige Stelle für:
- vollständige Agentenmatrix
- vollständige Nicht-Delegationsliste
- Standard-Rückgabeformat

Lokale Commands/Skills enthalten nur kurze Verweise auf diese Policy.
Keine Kopien der Matrix oder Nicht-Delegationsliste in anderen Dateien.
