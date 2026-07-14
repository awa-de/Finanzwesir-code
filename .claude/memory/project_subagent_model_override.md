---
name: subagent-model-override-gilt-nicht
description: Agent-Tool model:opus-Parameter übersteuert CLAUDE_CODE_SUBAGENT_MODEL=haiku NICHT; alle Subagenten laufen Haiku
metadata: 
  node_type: memory
  type: project
  originSessionId: e7f30bca-3957-4b76-8bb3-ab1e0ef88940
---

In `.claude/settings.local.json` steht `"env": { "CLAUDE_CODE_SUBAGENT_MODEL": "haiku" }`. Diese Variable erzwingt Haiku für **alle** Subagent-Dispatches projektweit. Der `model: "opus"`-Parameter am Agent-Tool übersteuert sie **nicht** — der Subagent lief trotz `model: opus` nachweislich als `claude-haiku-4-5` (per Selbstauskunft verifiziert, 2026-07-14).

**Why:** Ein Opus-Dispatch für eine anspruchsvolle Bewertungsaufgabe (Blogpost-Matching, 25 Apps) lief still auf Haiku und lieferte generische Textbausteine + Zählfehler. Erst die Modell-Selbstauskunft deckte auf, dass nicht Opus lief.

**How to apply:** Wenn eine Subagent-Aufgabe echt Opus-Qualität braucht, reicht `model: opus` am Agent-Tool nicht. Optionen: (a) Aufgabe im Hauptfaden selbst erledigen und vorher per `/model opus` den Hauptfaden auf Opus stellen (der `/model`-Wechsel betrifft nur den Hauptfaden, nicht Subagenten); (b) `CLAUDE_CODE_SUBAGENT_MODEL` in settings.local.json temporär auf `opus` setzen und danach zurück auf `haiku` (global, Rückstellung nicht vergessen). Bei Zweifel, welches Modell ein Subagent fährt: ihn nach seiner Model-ID fragen. Siehe [[subagent-setup-v2-1-2]].
