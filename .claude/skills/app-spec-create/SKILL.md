---
name: app-spec-create
version: 1.0.0
description: >
  Erstellt oder überarbeitet die vollständige APP_SPEC.md einer App-Fabrik-App.
  Koordiniert: Steuerungsblock-Prüfung (Phase 0) → tech-spec-app (Phase 1) → heldenreise (Phase 2) → Spec-Gate (Phase 3).
author: user
language: de
tags:
  - app-spec
  - steuerungsblock
  - app-fabrik
  - coordination
---

# Skill: app-spec-create

## Zweck

Koordiniert die vollständige Erstellung oder Überarbeitung einer `APP_SPEC.md` für eine App-Fabrik-App in vier Phasen:

0. Lokalen App-Steuerungsblock prüfen — **Pflicht vor allem anderen**
1. Technische Spec: `/tech-spec-app {slug}`
2. Beweisdramaturgie: `/heldenreise`
3. Spec-Gate: Vollständigkeit und Qualität

Keine APP_SPEC ohne geprüften, belastbaren Steuerungsblock.

## Wann verwenden?

- Neue `APP_SPEC.md` erstellen
- Bestehende `APP_SPEC.md` vollständig überarbeiten
- Pilot-App-Spec
- Pflicht bei App-Fabrik-Apps

## Pflichtquellen

1. `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` — Steuerungsblock-Format und LLM-Prüfscore
2. `Apps/{slug}/APP_SPEC.md` (falls vorhanden) oder `Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
3. `.claude/CLAUDE.md` § APP-ARBEIT — globaler Wächter
4. `NAVIGATION.md` § App bauen / ändern — Routing

Für Phase 1 und 2 gelten die Pflichtquellen von `tech-spec-app` und `heldenreise` zusätzlich.

## Phase 0 — Steuerungsblock prüfen

Quelle: `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`

Prüfpfad:
- `Apps/{slug}/APP_SPEC.md` mit Steuerungsblock-Abschnitt? → LLM-Prüfscore anwenden (Template § 7)
- Nur `MINI_SPEC_FROM_HAUPTDOKUMENT.md`? → vorläufigen Block ausschließlich aus vorhandenen Aussagen ableiten (Template § 6), Status „Vorläufig" setzen, Unsicherheiten als Klärungsbedarf markieren — nichts erfinden
- Weder noch? → Stopp

Standardblock-Felder (Template § 5):
1. Zweck
2. Psychologische Barriere
3. Falscher Glaubenssatz vorher
4. Zielzustand nachher
5. Muss-Kriterien
6. Nicht-Ziele
7. LLM-Prüfscore

LLM-Prüfscore-Pflicht:
- 8/8: Weiter
- 6–7/8: Weiter nur, wenn Kriterium 3 (Nicht-Ziele) = 2; Vorbehalte und Lücken sichtbar machen
- ≤ 5/8 oder Kriterium 3 (Nicht-Ziele) = 0: **Stopp** — Lücke benennen, mit Albert klären

Der Steuerungsblock gilt als 80%-Entwurf. Er muss nicht perfekt sein — er muss belastbar genug sein, dass die Spec-Arbeit nicht in eine falsche Richtung führt.

## Phase 1 — Technische Spec

Erst starten, wenn Phase 0 grün ist.

Skill: `/tech-spec-app {slug}`

## Phase 2 — Beweisdramaturgie

Erst starten, wenn Phase 1 abgeschlossen ist.

Skill: `/heldenreise`

## Phase 3 — Spec-Gate

Prüfung:
- Steuerungsblock-Score ≥ 6/8 und Kriterium 3 (Nicht-Ziele) = 2?
- 18 technische Pflichtabschnitte aus `tech-spec-app` vorhanden?
- `Beweisdramaturgie / Entscheidungspsychologie`-Abschnitt aus `heldenreise` vorhanden?
- Keine offenen Blocker?
- Kein Widerspruch zwischen Steuerungsblock und geplanter Spec?

## Abgrenzung

### `spec-mode-architecture`

Allgemeiner Architektur-Skill: erzeugt technische Spezifikationen, Edge-Cases, Testszenarien und API-Vorschläge für beliebige Module. Kennt keinen App-Fabrik-Steuerungsblock und keine heldenreise.

Kann als Zuarbeit für einzelne technische Teilfragen genutzt werden — ersetzt weder `app-spec-create` noch den lokalen App-Steuerungsblock.

### `tech-spec-app`

Erzeugt die technische Grundlage der APP_SPEC (App-Familie, Ghost-Card-Vertrag, AppContext, A11y, Sicherheit, Testfälle). Prüft keinen Steuerungsblock, führt keine heldenreise durch.

Ist Phase 1 in `app-spec-create` — kein Ersatz für den Gesamtprozess.

### `heldenreise`

Erzeugt Beweisdramaturgie (Heldenreise-Struktur, Tufte, Krug, FAANG, Ethik-Gate). Prüft keinen Steuerungsblock und keine technischen Pflichtabschnitte.

Ist Phase 2 in `app-spec-create` — kein Ersatz für den Gesamtprozess.

## Stop-Regeln

Sofort stoppen wenn:
- Weder `APP_SPEC.md` mit Steuerungsblock noch `MINI_SPEC_FROM_HAUPTDOKUMENT.md` vorhanden
- Steuerungsblock-Score ≤ 5/8 ohne Konsens mit Albert
- Nicht-Ziel-Kriterium (Kriterium 3) = 0
- Zweck oder Barriere unklar ohne Konsens mit Albert
- Spec-Scope wächst über Phase-0-Steuerungsblock hinaus
- Widerspruch zwischen Steuerungsblock-Nicht-Zielen und geplanter Spec-Detailarbeit

## Output-Anforderung

Abschlussmeldung muss enthalten:
- Steuerungsblock-Status und LLM-Prüfscore
- Phase 1 (`tech-spec-app`) abgeschlossen?
- Phase 2 (`heldenreise`) abgeschlossen?
- Phase 3 (Spec-Gate) bestanden?
- Offene Blocker
- Git-Diff

## Nicht-Ziele

- Kein Code
- Kein App-Einbau
- Keine Inventur aller 25 Apps
- Keine 25er-Vorschlagsliste
- Kein Abschlussritual starten (→ Albert startet `/abschluss-ritual`)
- Keine Steuerungsblöcke aus dem Nichts erfinden
- Keine Mini-Spec aus dem Nichts erfinden
