Stand: 2026-06-30 | Session: AP-14d | Geändert von: Claude

# AP-14d Ergebnis — regulatorik-dashboard Altmaterial-Verschiebung und CLAUDE.md-Entschärfung

---

## Kurzstatus

```
Status:                GRÜN
Blocker:               nein
Empfehlung nächster AP: AP-14e — regulatorik-dashboard Struktur-Review und Commit-Vorbereitung
```

---

## Kettenposition

```
Vorgänger:  AP-14c — regulatorik-dashboard Wissenssicherung aus CLAUDE.md (✅ 2026-06-30)
Aktuell:    AP-14d — regulatorik-dashboard Altmaterial-Verschiebung und CLAUDE.md-Entschärfung
Nächster:   AP-14e — regulatorik-dashboard Struktur-Review und Commit-Vorbereitung
```

---

## Git-Status zu Beginn

```
 M .claude/learning/session-log.md
?? Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md
?? Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md
?? docs/steering/patches/AP-14b_...
?? docs/steering/patches/AP-14c_...
```

Keine unerwarteten Änderungen.

---

## Git-Status nach AP-14d

```
 M .claude/learning/session-log.md
R  Apps/regulatorik-dashboard/CLAUDE.md → Apps/regulatorik-dashboard/Altmaterial/CLAUDE_historisch_ETF-Wahlurne.md
R  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md → Altmaterial/...
R  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md → Altmaterial/...
R  Apps/regulatorik-dashboard/Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md → Altmaterial/...
R  Apps/regulatorik-dashboard/Perplexity_super-app-prompt.md → Altmaterial/...
R  Apps/regulatorik-dashboard/UX-Feedback ChatGPT auf erste Iteration.md → Altmaterial/...
R  Apps/regulatorik-dashboard/UX-Feedback Gemini auf erste Iteration.md → Altmaterial/...
R  Apps/regulatorik-dashboard/UX-Feedback Perplexity auf erste Iteration.md → Altmaterial/...
?? Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md
?? Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md
?? docs/steering/patches/AP-14b_...
?? docs/steering/patches/AP-14c_...
?? docs/steering/patches/AP-14d_...
```

Git meldet alle 8 Renames als `R100` (100% Ähnlichkeit = reines Umbenennen/Verschieben, kein Inhalt geändert).

---

## Gate-Ergebnisse

| Gate | Prüfung | Ergebnis |
|---|---|---|
| Gate 1 — Git-Status | Nur erwartete Einträge (session-log, AP-14b/c-Protokolle, neue Wissensdateien) | OK |
| Gate 2 — AP-14c GRÜN | AP-14c-Protokoll vorhanden, Status GRÜN, Wissensdateien geschrieben | OK |
| Gate 3 — Sicherungsdateien | APP_FABRIK_ANAMNESE_MATERIAL.md + DEV_QA_NOTIZEN.md vorhanden | OK |
| Gate 4 — Altmaterial/ vorhanden | Altmaterial/ existiert, enthielt dashboard-regulatorikXIX.html | OK |
| Gate 5 — Move-Liste | Alle 8 Quellen vorhanden, kein Ziel vorhanden → alle auf git mv | OK |

---

## Move-Tabelle

| Quelle | Ziel | Aktion | Vorher-Hash | Nachher-Hash | Ergebnis |
|---|---|---|---|---|---|
| CLAUDE.md | Altmaterial/CLAUDE_historisch_ETF-Wahlurne.md | git mv | 2dad2a3539d5 | 2dad2a3539d5 | OK |
| Bauprompt_..._V3_Obsidian.md | Altmaterial/Bauprompt_..._V3_Obsidian.md | git mv | a1aec1d84027 | a1aec1d84027 | OK |
| Bauprompt_..._V4_Obsidian.md | Altmaterial/Bauprompt_..._V4_Obsidian.md | git mv | fab7ee70e6af | fab7ee70e6af | OK |
| Chat-GPT_Super-App_Bauprompt_..md | Altmaterial/Chat-GPT_Super-App_Bauprompt_..md | git mv | 3d3876a818f7 | 3d3876a818f7 | OK |
| Perplexity_super-app-prompt.md | Altmaterial/Perplexity_super-app-prompt.md | git mv | b2b44324220d | b2b44324220d | OK |
| UX-Feedback ChatGPT auf erste Iteration.md | Altmaterial/UX-Feedback ChatGPT auf erste Iteration.md | git mv | 89e1f5462951 | 89e1f5462951 | OK |
| UX-Feedback Gemini auf erste Iteration.md | Altmaterial/UX-Feedback Gemini auf erste Iteration.md | git mv | 028040d7bd7e | 028040d7bd7e | OK |
| UX-Feedback Perplexity auf erste Iteration.md | Altmaterial/UX-Feedback Perplexity auf erste Iteration.md | git mv | b2cc5596f176 | b2cc5596f176 | OK |

8/8 Hashes identisch. Kein Inhalt wurde verändert.

---

## Direktbestand vorher / nachher

**Vorher (13 Dateien direkt):**

```
Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md
Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md     ← verschoben
Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md     ← verschoben
Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md ← verschoben
CLAUDE.md                                             ← verschoben (umbenannt)
ETF-Wahlurnen-App-Abschlussdokumentation_V2.md
MINI_SPEC_FROM_HAUPTDOKUMENT.md
Perplexity_super-app-prompt.md                        ← verschoben
UX-Feedback ChatGPT auf erste Iteration.md            ← verschoben
UX-Feedback Gemini auf erste Iteration.md             ← verschoben
UX-Feedback Perplexity auf erste Iteration.md         ← verschoben
UX-Synthese-LLM-Bewertungen-Iteration-1.md
etf-wahlurnen-rechner.html
```

Plus (untracked aus AP-14c):
```
APP_FABRIK_ANAMNESE_MATERIAL.md
DEV_QA_NOTIZEN.md
```

**Nachher (7 Dateien direkt + Altmaterial/):**

```
Altmaterial/
APP_FABRIK_ANAMNESE_MATERIAL.md
Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md
DEV_QA_NOTIZEN.md
ETF-Wahlurnen-App-Abschlussdokumentation_V2.md
MINI_SPEC_FROM_HAUPTDOKUMENT.md
UX-Synthese-LLM-Bewertungen-Iteration-1.md
etf-wahlurnen-rechner.html
```

Exakt der erwartete Zielzustand.

---

## QA-Ergebnisse

| Prüfung | Erwartung | Ergebnis |
|---|---|---|
| Alle 8 Moves ausgeführt | ja | ✓ |
| Alle Hashes Quelle→Ziel identisch | ja | ✓ 8/8 |
| CLAUDE.md direkt im App-Ordner | nein | ✓ |
| CLAUDE_historisch_ETF-Wahlurne.md in Altmaterial | ja | ✓ |
| Direktbestand = 7 Dateien + Altmaterial/ | ja | ✓ |
| Keine Inhaltsänderungen (R100) | ja | ✓ |
| Kein Commit ausgeführt | ja | ✓ |

---

## Geänderte Dateien / Moves

```
Verschoben (8 git mv):
  Apps/regulatorik-dashboard/CLAUDE.md
    → Apps/regulatorik-dashboard/Altmaterial/CLAUDE_historisch_ETF-Wahlurne.md
  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md
    → Apps/regulatorik-dashboard/Altmaterial/Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md
  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md
    → Apps/regulatorik-dashboard/Altmaterial/Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md
  Apps/regulatorik-dashboard/Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md
    → Apps/regulatorik-dashboard/Altmaterial/Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md
  Apps/regulatorik-dashboard/Perplexity_super-app-prompt.md
    → Apps/regulatorik-dashboard/Altmaterial/Perplexity_super-app-prompt.md
  Apps/regulatorik-dashboard/UX-Feedback ChatGPT auf erste Iteration.md
    → Apps/regulatorik-dashboard/Altmaterial/UX-Feedback ChatGPT auf erste Iteration.md
  Apps/regulatorik-dashboard/UX-Feedback Gemini auf erste Iteration.md
    → Apps/regulatorik-dashboard/Altmaterial/UX-Feedback Gemini auf erste Iteration.md
  Apps/regulatorik-dashboard/UX-Feedback Perplexity auf erste Iteration.md
    → Apps/regulatorik-dashboard/Altmaterial/UX-Feedback Perplexity auf erste Iteration.md

Neu geschrieben (AP-14d):
  docs/steering/patches/AP-14d_regulatorik-dashboard_altmaterial-verschiebung-claude-entschaerfung_Ergebnis.md
```

---

## Offene Punkte für AP-14e

AP-14e (Struktur-Review und Commit-Vorbereitung) muss:

1. Den Gesamtzustand aller AP-14x-Artefakte prüfen und konsolidieren.
2. Die Commit-Message für die gesamte AP-14x-Kette (14b/c/d) vorbereiten.
3. Alles für den Commit-Ready-Zustand prüfen:
   - alle Patch-Protokolle vorhanden?
   - session-log aktuell?
   - NAVIGATION.md / PROJECT-STATUS.md aktualisierungsbedürftig?
4. Ggf. AP-14e als Abschluss-Ritual für AP-14b/c/d fungieren lassen.

Anmerkung: Die untracked Dateien (AP-14b/c/d-Protokolle + Wissensdateien) liegen noch außerhalb
des Git-Index. AP-14e / das Abschluss-Ritual müssen `git add` und Commit vorbereiten.

---

## Nicht-Ziel-Nachweis

```
Inhalte geändert:              nein  (alle R100)
Dateien gelöscht:              nein
CLAUDE.md aktiv im Direktordner: nein  (entschärft: nach Altmaterial als CLAUDE_historisch_...)
MINI_SPEC geändert:            nein
APP_SPEC erstellt/geändert:    nein
Seed geändert:                 nein
HTML geändert:                 nein
Master-Bauprompt geändert:     nein
UX-Synthese geändert:          nein
Wissensdateien geändert:       nein
Steuerdateien geändert:        nein
Commit ausgeführt:             nein
```
