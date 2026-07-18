---
name: project-app-duell-pipeline
description: "Der /app-duell Mockup-Duell-Prozess der App-Fabrik — Ablage, Werkzeug, ID-gebundenes Produktentscheidungs-Gate"
metadata: 
  node_type: memory
  type: project
  originSessionId: eaa149ec-5113-487b-98ec-1cdda2327e1b
---

Skill `/app-duell` fährt den App-Fabrik-Mockup-Duell-Prozess. Claude ist **Orchestrator** (fährt nur das Werkzeug, gibt Starttexte); Sol/Fable/Grok/Sonnet sind vier **externe** Konversationen des Nutzers. Kette: Mini-Spec → gemeinsamer Psychosprint (Sol+Fable, exakt derselbe Prompt) → Grok-Gegenkritik → Sonnet baut zwei getrennte Happy-Path-Mockups → Albert testet A gegen B. Definition of Done = zwei Mockups zuverlässig gebaut + GELB; **kein** LLM-Gewinner, kein APP_SPEC, danach freies taktisches Arbeiten.

Kanonische, getrackte Orte (AP-09h–09k, freigegeben 2026-07-18):
- Prozess (einzige Wahrheit, Skill lädt sie): `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`
- Skill: `.claude/skills/app-duell/SKILL.md` + `.claude/skills/app-duell/README.md` (Debug-Abhängigkeitskarte, im Betrieb nicht geladen)
- Prompt-Vorlagen: `docs/App-Fabrik/vorlagen/{PSYCHOSPRINT_GRUNDPROMPT,GROK_GEGENKRITIK_VORLAGE,SONNET_MOCKUP-DUELL_VORLAGE}.md` (Werkzeug liest sie via `VORLAGEN_REL`; NIE ins gitignored `Archiv/local`)
- Werkzeug: `tools/app-fabrik-psychosprint.py` (Subcommands `prepare`/`grok-paket`/`sonnet-paket`, Dry-Run-Default, `--self-test`)
- Werkstatt je App: `tests/scratch/<slug>/`; Ergebnis: `docs/steering/patches/AF_<slug>_mockup-duell_Ergebnis.md`

Schutzmechanismen im Werkzeug: Quellensperre-Marker (Sonnet-Vorlage muss `## Quellensperre — Harter Stop` tragen, sonst kein Bau — keine Fremd-App als Scaffold), Nicht-Überschreiben, Anonymisierung A=Sol/B=Fable, und das **ID-gebundene Produktentscheidungs-Gate**: Grok taggt jeden Fund `Produktentscheidung nötig [E<k>]`, `PRODUKTENTSCHEIDUNGEN.md` trägt dieselben IDs; `sonnet-paket` prüft **Mengen-Gleichheit** (nicht Zählung) und blockt bei Lücke/Extra/Duplikat/fehlender ID. Lehre: ein reines Zähl-Gate ist Scheinsicherheit (extern via ChatGPT-Peer-Review aufgedeckt) — erst Identitätsbindung ist echte Sicherheit → [[feedback_gruendlichkeit_vor_tempo]]. Verwandt: [[project_app_fabrik_struktur]], [[project_pbn_strategy]].
