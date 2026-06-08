# Übergabe: Selbstlernendes System — nächste Session
Stand: 2026-05-05 | Status: Plan vollständig, Implementierung ausstehend

---

/start

Fortführung: Selbstlernendes System — Implementierung

## Letzter Stand

Der Plan ist vollständig ausgearbeitet und kritik-gehärtet. Alle Dokumente liegen in:
`z:\Documents\Nextcloud\Finanzwesir 2.0\aktuelles Projekt\selbstlernenes System\`

- PLAN-Synthese.md — vollständiger, gehärteter Plan (LESEN, bevor etwas implementiert wird)
- SKILL-uebergabe.md — Entwurf des /uebergabe-Skills (ebenfalls lesen)

## Was in dieser Session erarbeitet wurde

1. Drei LLM-Konzepte (Gemini, ChatGPT, Perplexity) analysiert und synthetisiert
2. Kollisions-Analyse mit bestehendem System durchgeführt
3. Plan durch vier Kritiker gehärtet (Mainstream, Via Negativa/Munger, Occam, Devil's Advocate)
4. HRO-Prinzipien (Kernkraft, Luftfahrt) integriert
5. Überbestimmungs-Problem diagnostiziert und gelöst
6. Lastabwurf-System mit 4 benannten Modi entwickelt

## Was der Plan enthält (Kurzfassung)

**Neue Komponenten (4):**
- `.claude/learning/session-log.md` — Schritt 0 im Abschluss-Ritual, Pflicht, Challenge-Response
- `.claude/learning/patterns.md` — Muster-Clustering, gestufte Schwellen (≥1 High / ≥2 Normal)
- Skill `/distill` — schwellenbasiert (≥5 Einträge ODER >14 Tage), nicht kalenderbasiert
- Skill `/uebergabe` — Delta-Prompt + automatischer Breadcrumb (SKILL-uebergabe.md)

**Erweiterungen (3):**
- Abschluss-Ritual: session-log = Schritt 0 (zuerst, vor allem anderen)
- /start: Lücken-Alarm + Distill-Empfehlung (schwellenbasiert)
- Kassensturz: Lern-Loop-Status + Qualitätsrate (kein auto-distill mehr)

**Lastabwurf-System:**
- 5 Invarianten (niemals opferbar)
- 4 benannte Modi (N/R/M/A)
- Prioritätsgruppen 1–5
- Eidechsen-Prinzip: Schicht 2 opferbar, Schicht 1 niemals

## Mündliche Entscheidungen (noch nicht in Dateien)

- "Quantensprung" = Aufzinsung kleiner Verbesserungen, Albert ist geduldig
- Erratischer Rhythmus: Wochen Pause möglich — System muss das aushalten
- Evolutionsstufe 1: Protokollieren + Muster erkennen. Agentenlogik kommt in ~4 Monaten
- "Erweiterung statt Synthese" ist bewusste Entscheidung — richtig für Stufe 1
- /uebergabe ist eigenständiger Mehrwert, kein Scope-Creep

## Noch zu tun: KRITIK-Haertung.md in PLAN-Synthese.md integrieren

KRITIK-Haertung.md liegt im selben Verzeichnis. Es enthält:
- Alle 4 Kritiker mit Befunden + Antworten
- Die vollständige Schlussbilanz-Tabelle (11 Punkte, alle ✅)
- HRO-Kontext (Lastabwurf-Recherche)

Auftrag: Als Kapitel "Kritik-Härtung" in PLAN-Synthese.md einbauen —
nach "Kollisions-Analyse", vor "Designentscheidungen".

## Nächste Schritte (Implementierungs-Reihenfolge)

| Schritt | Datei | Art |
|---|---|---|
| 1 | `.claude/learning/session-log.md` | Neu (leere Vorlage) |
| 2 | `.claude/learning/patterns.md` | Neu (Vorlage + Bestandsliste) |
| 3 | `.claude/skills/abschluss-ritual/SKILL.md` | Erweitern (Schritt 0, Challenge-Response) |
| 4 | `/start`-Sequenz (CLAUDE.md oder skill) | Erweitern (Lücken-Alarm, Schwellen) |
| 5 | `.claude/skills/kassensturz/SKILL.md` | Erweitern (Lern-Loop-Status) |
| 6 | `.claude/skills/distill/SKILL.md` | Neu (vollständiger Skill) |
| 7 | `.claude/skills/uebergabe/SKILL.md` | Neu (aus SKILL-uebergabe.md übernehmen) |
| 8 | CLAUDE.md | Neues Kapitel: Lastabwurf-System (Modi N/R/M/A) |

**Tabu-Check:** Kein Eingriff in Layer 1. §8-Gate bleibt. ATTEMPT-LOG unberührt.

## Wichtig für die nächste Session

- Erst PLAN-Synthese.md vollständig lesen, DANN implementieren
- Implementierung AP für AP — nach jedem Schritt Pilot-Test
- Albert testet jeden Schritt manuell bevor der nächste beginnt
- Das Lastabwurf-System (Modi N/R/M/A) muss in CLAUDE.md, nicht nur in einem Skill
