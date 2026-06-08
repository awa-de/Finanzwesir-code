# Begründung: Synthese-Version Projektsteuerung Finanzwesir 2.0
Stand: 2026-05-03 | Synthese aus 3 Peer-Reviews + Kreuzfahrt-Gespräch

---

## Executive Summary

Diese Version ist keine Kompromisslösung aus drei Reviews — sie ist eine Synthese auf Basis
eines Architekturprinzips, das keiner der drei Reviews explizit formuliert hatte:

> **Kreuzfahrt-Modell:** Albert gibt das Ziel an. Claude navigiert das Protokoll.
> Albert entscheidet. Claude führt aus. Albert muss sich keine Prozeduren merken.

Alle drei Reviews diagnostizierten dieselben strukturellen Probleme korrekt.
Die Lösungen unterschieden sich im Risikoprofil. Diese Synthese nimmt das Beste aus allen dreien.

---

## Was aus welcher Quelle kommt

### Aus allen drei Reviews (Konsens)

- CLAUDE.md = Verfassung (Verhalten, Grenzen, Gates) — KEIN Routing
- NAVIGATION.md = Router (Pfade, Lese-Reihenfolgen) — KEINE Verhaltensregeln
- Procedures externalisieren, nicht inline in CLAUDE.md
- Tabu-Zonen und Pre-Code-Gate müssen prominent stehen (nicht im hinteren Drittel)

### Aus ChatGPT (wichtigste Einzelbeiträge)

**Light-Gate / Full-Gate:** Die graduierte Reibung ist die praktisch wichtigste Einzelverbesserung.
Ein 3-Zeilen-CSS-Fix braucht nicht dasselbe Gate wie eine Multi-File-Engine-Änderung.
Bürokratiemüdigkeit und schleichendes Gate-Überspringen werden so verhindert.

**Skills-Architektur:** YAML-Frontmatter, klare Benennung, Projektkontext.
Auch wenn `disable-model-invocation: true` nicht gesetzt wird (weil Claude proaktiv fahren soll),
ist die Skill-Struktur die richtige technische Grundlage.

**Begründungstiefe:** ChatGPTs Begründungsdokument war das konzeptuell stärkste der drei Reviews.
First-Principles-Denken über LLM-Kontextgewichtung, Autoritätshierarchie, Sicherheit vs. Ablauf.

### Aus Perplexity (wichtigste Einzelbeiträge)

**Positionseffekt:** Tabu-Zonen stehen jetzt in § 1, Pre-Code-Gate in § 3 — nicht hinten.
Empirisch belegt durch Anthropic-Dokumentation und SFEIR-Institute-Messungen:
frühe Instruktionen werden stärker gewichtet. Einfachste Verbesserung mit hohem Nutzen.

**SSoT-Trennung:** „CLAUDE.md = KEINE Routing-Infos, NAVIGATION.md = KEINE Verhaltensregeln."
Beide Dateien haben jetzt explizite Header die das klarstellen. Verhindert erneutes Anwachsen.

**Skills vs. Denkmodi:** Die vorhandenen globalen Skills (spec-mode-architecture, impl-mode-workpackages,
check-mode-gatekeeper, 01-process-extreme-ownership, analysis-top-01, code-quality-faang-review)
sind THINKING MODES — keine Prozedur-Auslöser. Sie werden in NAVIGATION.md an den richtigen
Workflow-Punkten referenziert, nicht als Projekt-Skills dupliziert.

### Aus Gemini (ein wertvoller Einzelbeitrag)

**Advocatus Diaboli:** Frage 8 im Full-Gate — „Warum könnte dieser Plan trotzdem scheitern?"
Nicht optional, nicht auf Abruf, sondern fester Bestandteil des Full-Gates.
Albert muss sie nicht aufrufen — Claude stellt sie immer.

**Nicht übernommen — Geminis Refactor-First-Doktrin:**
„Logik-Leaking triggert sofortiges Refactoring" ist für dieses Projekt gefährlich.
1-Personen-Projekt ohne automatische Testpipeline + sofortiges Refactoring bei jeder
Architekturverletzung = hohes Regressionsrisiko. Stabilität geht vor Zero-Tech-Debt.

### Aus dem Kreuzfahrt-Gespräch (Architekturprinzip das fehlte)

Alle drei Reviews bauten auf demselben Fehlannahme auf:
Albert erinnert sich, `/pre-code-gate` oder `/advocatus-diaboli` aufzurufen.

Das Kreuzfahrt-Modell dreht das um:
- Claude navigiert alle Protokolle automatisch
- Albert trifft nur die echten Entscheidungen (OK/Stopp, Prio, Ja/Nein)
- `disable-model-invocation: true` entfällt — Claude darf und soll proaktiv fahren
- Advocatus Diaboli ist mandatory, kein Opt-in

### Aus dem Stil-Gespräch

Der `00-style-sei-deutsch`-Skill deckt:
- Input-Qualitäts-Check (§ 5: max. 3 Rückfragen bei fehlenden Infos)
- Verbindliche Ablehnung schlechter Briefings (§ 2)
- Schlechte Inputs nicht durchwinken (§ 4)

Konsequenz: CLAUDE.md braucht keinen Kommunikationsstil-Abschnitt.
Einziger Verweis: eine Zeile in § 0.

---

## Was nicht übernommen wurde und warum

| Element | Herkunft | Grund |
|---|---|---|
| `disable-model-invocation: true` auf allen Skills | ChatGPT | Kreuzfahrt-Modell erfordert proaktive Claude-Navigation |
| Refactor-First-Doktrin | Gemini | Regressionsrisiko ohne Testpipeline |
| Radikale Minimierung (35 Zeilen CLAUDE.md) | Gemini | Zu viele implizite Annahmen, zu wenig Verlässlichkeit |
| `projekt-start`-Skill | ChatGPT | Session-Start ist automatisches Verhalten in CLAUDE.md § 2 |
| `pre-code-gate`-Skill | ChatGPT | Gate läuft automatisch — kein Aufruf durch Albert nötig |
| `blocked-analysis`-Skill | ChatGPT | Abbruch-Protokoll ist vollständig inline in CLAUDE.md § 4 |
| `app-start`-Skill | ChatGPT | App-Routing steht in NAVIGATION.md, Stopp-Verhalten in CLAUDE.md |
| `neue-aufgabe`-Skill | ChatGPT | Intake-Protokoll ist automatisches Verhalten in CLAUDE.md § 2 |
| Skills/Commands-Trennung als separate Verzeichnisse | Perplexity | Konzeptuell richtig, in der Praxis irrelevant — Skill-Struktur reicht |

---

## Resultierende Architektur

```
CLAUDE.md          = Verfassung + automatischer Entscheidungsbaum
NAVIGATION.md      = Router + Routing-Tabellen
00-style-sei-deutsch (global) = Kommunikationsregeln + Input-Qualität
Globale Skills     = Denkmodi (spec-mode, impl-mode, check-mode, analysis-top-01 etc.)
Projekt-Skills (4) = Detailprozeduren die zu komplex für CLAUDE.md inline wären
  /abschluss-ritual    = 6-Schritte-Abschluss
  /decompose           = Zerlegungsprotokoll mit Preview/Approval-Loop
  /manual-test-plan    = strukturierter visueller Testplan
  /spec-rewrite-guard  = Diff-Protokoll für Spec-Änderungen
```

---

## Globale Skills: Einordnung und Nutzung

Die vorhandenen globalen Skills sind kein Duplikat der Projekt-Skills.
Sie operieren auf einer anderen Ebene:

| Skill | Wann sinnvoll |
|---|---|
| `01-process-extreme-ownership` | Vor neuen Apps oder größeren Features: Brief validieren |
| `spec-mode-architecture` | Wenn eine Idee in eine belastbare technische Spec überführt werden soll |
| `impl-mode-workpackages` | Bei der eigentlichen Implementierung nach geklärtem Scope |
| `check-mode-gatekeeper` | Nach Implementierung, vor Abschluss: QA-Gate |
| `code-quality-faang-review` | Nach größeren Arbeitspaketen: Codequalität bewerten |
| `analysis-top-01` | Bei komplexen Architekturentscheidungen |
| `security-review` | Bei App-Arbeit oder security-relevanten Änderungen |

Claude schlägt diese proaktiv vor wenn der Kontext passt.
Albert muss die Namen nicht kennen — Claude sagt: „Soll ich eine Architektur-Spec machen?"

---

## Trade-offs

**Sicherheit vs. Geschwindigkeit:**
Light-Gate reduziert Reibung bei einfachen Änderungen ohne Sicherheitsverlust.
Full-Gate + Advocatus Diaboli erhöht Qualität bei komplexen Änderungen.

**Kontrolle vs. Automatik:**
Claude fährt Protokolle automatisch — aber Albert entscheidet an jedem echten Entscheidungspunkt.
Das ist Kontrolle ohne Gedächtnislast.

**Zentralisierung vs. Modularität:**
4 Projekt-Skills für echte Detailprozesse. Rest inline oder in globalen Skills.
Nicht mehr modular als nötig.
