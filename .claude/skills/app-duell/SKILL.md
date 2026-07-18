---
name: app-duell
description: Startet und führt das App-Fabrik-Mockup-Duell einer App durch — Psychosprint für Sol und Fable, Grok-Gegenkritik, dann Sonnet baut zwei getrennte Happy-Path-Mockups. Auslösen mit /app-duell (optional /app-duell <slug>) oder „Mockup-Duell für <App> starten".
version: 1.0.0
author: user
language: de
argument-hint: "[slug] — optional. Ohne Argument werden die Intake-Fragen gestellt."
tags:
  - app-fabrik
  - mockup-duell
  - psychosprint
---

# Skill: app-duell

Trigger: Albert tippt `/app-duell` (optional `/app-duell <slug>`) oder sinngemäß „Mockup-Duell für <App> starten".

## Was dieser Skill tut

Dieser Skill startet den kanonischen Mockup-Duell-Prozess und fährt ihn als **Orchestrator**.

1. Lies **vollständig**: `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`. Das ist die **einzige** Quelle des Prozesses — nicht aus dem Gedächtnis arbeiten, nicht paraphrasieren, nichts hinzuerfinden.
2. Arbeite ihn **exakt wie dort beschrieben** ab, beginnend bei „# Start": die drei Intake-Fragen, dann die Vorprüfungen, dann Phase 1 → Phase 4 → Prozessende.
3. Halte die „Harte Regeln" des Masterprompts ein — u. a.: `.claude/PROTECTED_PATHS.json` vor jeder Dateioperation lesen; Mini-Spec nur unter `Apps/<slug>/`; `tests/scratch/<slug>/` existiert bereits → Hände weg (bereits bearbeitete App); vor jedem `--write` erst Dry-Run zeigen und auf Bestätigung warten; Rohtexte/Gutachten nie von Hand reparieren.
4. Du bist **Orchestrator, kein Bauteil**: du fährst nur `tools/app-fabrik-psychosprint.py`, prüfst die erzeugten Dateien und gibst dem Nutzer fertige Starttexte. Sol, Fable, Grok und Sonnet sind vier **separate, externe** Konversationen, die Albert selbst füttert. Du schreibst selbst keinen Psychosprint, keine Gegenkritik und baust keine Mockups.
5. **Warte an jedem markierten Übergang auf Alberts ausdrückliche Bestätigung**, bevor du mit `--write` schreibst oder in die nächste Phase gehst.

## Argument

`/app-duell <slug>`: Nimm `<slug>` als App-Slug und frage nur die noch fehlenden Intake-Angaben ab (sichtbarer App-Name, Mini-Spec-Bestätigung, Modelle bereit). Ohne Argument stelle alle drei Intake-Fragen des Masterprompts.

## Nicht-Ziele

Kein APP_SPEC, kein Produktionscode, keine LLM-Gewinnerwahl. **Definition of Done** (siehe Masterprompt „# Prozessende"): zwei getrennte Mockups zuverlässig gebaut, Status GELB, Browser-Testauftrag an Albert übergeben. Danach endet der Prozess; alles Weitere ist freies taktisches Arbeiten.

## Debug / Abhängigkeitskarte

Nur im Fehlerfall: `README.md` in diesem Verzeichnis (Kette, hart verdrahtete Werkzeugpfade, Selbsttest, Gefahrenstellen). Im normalen Betrieb nicht nötig — nicht mitladen.

## Changelog
- v1.0.0 — Initiale Version. Dünner Launcher für `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md` (Prozessstand AP-app-fabrik-09h/09i; deterministisches Produktentscheidungs-Gate aktiv).
- v1.0.1 — Vorlagen nach `docs/App-Fabrik/vorlagen/` befördert (AP-09j); Debug-README ergänzt.
