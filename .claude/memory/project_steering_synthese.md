---
name: Projektsteuerung Synthese aktiviert
description: CLAUDE.md v2.0 live seit 2026-05-08 — Wissenschaftler-Grundmodell, Invarianten, semantische Namen, Commands-Ordner
metadata:
  type: project
  originSessionId: fe492953-0f83-4810-b454-e50f8ffb07a7
---
Neue Projektsteuerungsarchitektur aktiv. CLAUDE.md v2.0 seit 2026-05-08 live.

**Why:** Peer-Review (ChatGPT, Gemini, Perplexity) + Neubau-Entscheidung: Verfassung kürzer durch Auslagerung von Prozeduren, schärfer durch 3 neue Prinzipien.

**How to apply:** Diese Architektur ist der aktuelle Stand. Keine §-Nummern mehr — semantische Namen verwenden: [Gate-Prinzip], [Tabu-Zonen], [Freigabeprinzip], [Regelaufnahme-Schutz], [Lastabwurf-System].

## Kernprinzip

Kreuzfahrt-Modell: Albert gibt das Ziel, Claude navigiert das Protokoll.
Labormodell: Wissenschaftler im Hochsicherheitslabor — zwei Zustände: regelkonformer Betrieb / Notfallprotokoll.

## CLAUDE.md v2.0 Struktur (aktiv seit 2026-05-08)

Neue Sektionen (NEU):
- Grundmodell: Wissenschaftler im Hochsicherheitslabor (Primacy-Effekt)
- Invarianten: 9 Regeln, niemals opferbar, an einem Ort konsolidiert
- Freigabeprinzip: eigener Abschnitt (war Fließtext in §2)

Geänderte Sektionen:
- Gate-Prinzip: Trigger bleibt, Checklisten → .claude/commands/pre-code-gate.md
- Gate-Prinzip: +Surgical-Check, +Annahmenregel (neu)
- Eingangs-Routing: NEUE AUFGABE → /intake (komprimiert), BUG/FIX +Schritt 7 (Subagenten)
- Autoritäten: .claude/commands/ als neue Ebene

Entfernt:
- §11 Commit-Message → lebt jetzt in abschluss-ritual/SKILL.md
- §-Nummern als Querverweise → semantische Namen in eckigen Klammern

Erhalten (bewusste Entscheidung Option B):
- §2 Klassifizierungsbaum bleibt in CLAUDE.md — „Steuerungslogik, kein Prozesshandbuch" (Albert)

## Neue Dateien (2026-05-08)

- `.claude/commands/pre-code-gate.md` — Light (3 Fragen) + Full (9 Fragen inkl. Simplicity-Check)
- `.claude/commands/intake.md` — Intake-Protokoll neue Aufgaben (5 Fragen → BACKLOG)
- `.claude/skills/subagent-dispatch/SKILL.md` — Haiku/Sonnet/Opus Tiering + Eskalationsregel

## Schadensanalyse-Ergebnis (umgesetzt)

7 §-Nummern-Verweise in 4 Dateien — alle ersetzt oder entfernt:
- NAVIGATION.md Z.47 → /start ✓
- NAVIGATION.md Z.70 → /pre-code-gate ✓
- abschluss-ritual/SKILL.md Z.85 → Format eingebettet ✓
- abschluss-ritual/SKILL.md Z.115 → [Regelaufnahme-Schutz] ✓
- distill/SKILL.md Z.79 + Z.88 → [Regelaufnahme-Schutz]-Gate ✓

## Offene Entscheidung

settings.json env-Variablen (Infrastrukturebene, Separatentscheidung Albert):
- CLAUDE_CODE_DISABLE_1M_CONTEXT=1
- CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80
Noch nicht entschieden. Kein Handlungsbedarf bis Albert freigibt.

## Testfaden ausstehend

Verifikation im nächsten /start: SESSION-START-Zeile erscheint, Gate-Verweise auf semantische Namen, /intake trigger funktioniert.
