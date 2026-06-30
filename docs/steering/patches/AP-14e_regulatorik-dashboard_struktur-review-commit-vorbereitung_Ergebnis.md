Stand: 2026-06-30 | Session: AP-14e | Geändert von: Claude

# AP-14e Ergebnis — regulatorik-dashboard Struktur-Review und Commit-Vorbereitung

---

## Kurzstatus

```
Status:          GRÜN
Blocker:         nein
Commit-ready:    ja
Empfohlener nächster Schritt:
  1. Add-Befehl unten ausführen (Albert)
  2. Commit mit vorbereiteter Message (Albert)
  3. Abschlussritual AP-14b–e
  4. Folgepfad: AP-14f — regulatorik-dashboard Identitäts- und Steuerungsblock-Anamnese
```

---

## Kettenposition

```
Vorgänger:  AP-14d — regulatorik-dashboard Altmaterial-Verschiebung und CLAUDE.md-Entschärfung (✅ 2026-06-30)
Aktuell:    AP-14e — regulatorik-dashboard Struktur-Review und Commit-Vorbereitung
Nächster:   Commit durch Albert → Abschlussritual AP-14b–e → AP-14f
```

---

## Git-Status / Staging-Hygiene

**Bereits staged (`git diff --cached`):**

```
R100  Apps/regulatorik-dashboard/CLAUDE.md
        → Apps/regulatorik-dashboard/Altmaterial/CLAUDE_historisch_ETF-Wahlurne.md
R100  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md
        → Apps/regulatorik-dashboard/Altmaterial/Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md
R100  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md
        → Apps/regulatorik-dashboard/Altmaterial/Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md
R100  Apps/regulatorik-dashboard/Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md
        → Apps/regulatorik-dashboard/Altmaterial/Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md
R100  Apps/regulatorik-dashboard/Perplexity_super-app-prompt.md
        → Apps/regulatorik-dashboard/Altmaterial/Perplexity_super-app-prompt.md
R100  Apps/regulatorik-dashboard/UX-Feedback ChatGPT auf erste Iteration.md
        → Apps/regulatorik-dashboard/Altmaterial/UX-Feedback ChatGPT auf erste Iteration.md
R100  Apps/regulatorik-dashboard/UX-Feedback Gemini auf erste Iteration.md
        → Apps/regulatorik-dashboard/Altmaterial/UX-Feedback Gemini auf erste Iteration.md
R100  Apps/regulatorik-dashboard/UX-Feedback Perplexity auf erste Iteration.md
        → Apps/regulatorik-dashboard/Altmaterial/UX-Feedback Perplexity auf erste Iteration.md
```

8 Renames bereits gestaged durch `git mv` aus AP-14d. Erwarteter Zustand — kein Problem.

**Unstaged (`git diff`):**

```
M .claude/learning/session-log.md  (+2 Zeilen)
```

**Untracked (`??`):**

```
Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md
Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md
docs/steering/patches/AP-14b_...Ergebnis.md
docs/steering/patches/AP-14c_...Ergebnis.md
docs/steering/patches/AP-14d_...Ergebnis.md
```

Die neuen Dateien aus AP-14c/d/e sind noch untracked — müssen per Add in den Commit.

---

## Vorgänger-Review AP-14b/c/d

| AP | Status laut Protokoll | Aufgabe | Review-Befund |
|---|---|---|---|
| AP-14b | GRÜN | Datei-Triage und Neusortierungsplan | Vollständig: 13 Dateien inventarisiert, Zielstruktur geplant, Folge-APs geschnitten |
| AP-14c | GRÜN | Wissenssicherung aus CLAUDE.md | Vollständig: APP_FABRIK_ANAMNESE_MATERIAL.md + DEV_QA_NOTIZEN.md geschrieben, CLAUDE.md unberührt |
| AP-14d | GRÜN | Altmaterial-Verschiebung + CLAUDE.md-Entschärfung | Vollständig: 8 Moves R100, Direktbestand exakt, Hashes alle identisch |

Kein GELB, kein ROT in der Kette.

---

## Struktur-Review Direktbestand

| Eintrag | Erwartet? | Vorhanden? | Befund |
|---|:---:|:---:|---|
| Altmaterial/ | Ja | Ja | OK |
| APP_FABRIK_ANAMNESE_MATERIAL.md | Ja | Ja | OK — neu aus AP-14c |
| Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md | Ja | Ja | OK — Primärquelle unberührt |
| DEV_QA_NOTIZEN.md | Ja | Ja | OK — neu aus AP-14c |
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | Ja | Ja | OK — Primärquelle unberührt |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md | Ja | Ja | OK — unberührt (Neufassung kommt in AP-14g) |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | Ja | Ja | OK — Primärquelle unberührt |
| etf-wahlurnen-rechner.html | Ja | Ja | OK — Mockup unberührt |
| CLAUDE.md | Nein | Nein | OK — entschärft (nach Altmaterial als CLAUDE_historisch_...) |

Unerwartete Einträge: keine.
Direktbestand entspricht exakt dem Zielzustand aus AP-14d.

---

## Struktur-Review Altmaterial

| Eintrag | Erwartet? | Vorhanden? | Befund |
|---|:---:|:---:|---|
| dashboard-regulatorikXIX.html | Ja | Ja | OK — manuell von Albert verschoben (vor AP-14x) |
| CLAUDE_historisch_ETF-Wahlurne.md | Ja | Ja | OK — in AP-14d verschoben + umbenannt |
| Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md | Ja | Ja | OK |
| Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md | Ja | Ja | OK |
| Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md | Ja | Ja | OK |
| Perplexity_super-app-prompt.md | Ja | Ja | OK |
| UX-Feedback ChatGPT auf erste Iteration.md | Ja | Ja | OK |
| UX-Feedback Gemini auf erste Iteration.md | Ja | Ja | OK |
| UX-Feedback Perplexity auf erste Iteration.md | Ja | Ja | OK |

9/9 Pflichteinträge vorhanden.

---

## Nicht-Ziel-Nachweis (AP-14b–d kumuliert)

```
MINI_SPEC geändert:          nein  (unverändet, Gate 6 bestätigt)
APP_SPEC erstellt/geändert:  nein
Seed geändert:               nein
HTML geändert:               nein
Master-Bauprompt geändert:   nein  (unberührt)
UX-Synthese geändert:        nein  (unberührt)
Inhalte verschobener Dateien geändert: nein (alle R100, Hashes identisch laut AP-14d)
Commit ausgeführt:           nein
```

---

## Commit-Kandidatenliste

**Bereits gestaged (durch git mv aus AP-14d) — kein weiteres Add nötig:**

```
R  Apps/regulatorik-dashboard/CLAUDE.md
     → Apps/regulatorik-dashboard/Altmaterial/CLAUDE_historisch_ETF-Wahlurne.md
R  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md
     → Apps/regulatorik-dashboard/Altmaterial/...
R  Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md
     → Apps/regulatorik-dashboard/Altmaterial/...
R  Apps/regulatorik-dashboard/Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md
     → Apps/regulatorik-dashboard/Altmaterial/...
R  Apps/regulatorik-dashboard/Perplexity_super-app-prompt.md
     → Apps/regulatorik-dashboard/Altmaterial/...
R  Apps/regulatorik-dashboard/UX-Feedback ChatGPT auf erste Iteration.md
     → Apps/regulatorik-dashboard/Altmaterial/...
R  Apps/regulatorik-dashboard/UX-Feedback Gemini auf erste Iteration.md
     → Apps/regulatorik-dashboard/Altmaterial/...
R  Apps/regulatorik-dashboard/UX-Feedback Perplexity auf erste Iteration.md
     → Apps/regulatorik-dashboard/Altmaterial/...
```

**Noch untracked — müssen per Add aufgenommen werden:**

```
Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md
Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md
docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md
docs/steering/patches/AP-14c_regulatorik-dashboard_claude-wissenssicherung_Ergebnis.md
docs/steering/patches/AP-14d_regulatorik-dashboard_altmaterial-verschiebung-claude-entschaerfung_Ergebnis.md
docs/steering/patches/AP-14e_regulatorik-dashboard_struktur-review-commit-vorbereitung_Ergebnis.md
```

**Optional (nur wenn session-log ausschließlich AP-14-Einträge enthält):**

```
.claude/learning/session-log.md
```

**Nicht im Commit:**

```
Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md  (unverändert, kein Grund)
Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html       (unverändert, kein Grund)
Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md
Apps/regulatorik-dashboard/Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md
Apps/regulatorik-dashboard/UX-Synthese-LLM-Bewertungen-Iteration-1.md
```

---

## Empfohlener Add-Befehl

Die 8 Renames sind durch `git mv` bereits gestaged. Nur die neuen Dateien noch hinzufügen:

```bash
git add \
  "Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md" \
  "Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md" \
  "docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md" \
  "docs/steering/patches/AP-14c_regulatorik-dashboard_claude-wissenssicherung_Ergebnis.md" \
  "docs/steering/patches/AP-14d_regulatorik-dashboard_altmaterial-verschiebung-claude-entschaerfung_Ergebnis.md" \
  "docs/steering/patches/AP-14e_regulatorik-dashboard_struktur-review-commit-vorbereitung_Ergebnis.md"
```

Alternativ als Einzeiler:

```bash
git add "Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md" "Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md" "docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md" "docs/steering/patches/AP-14c_regulatorik-dashboard_claude-wissenssicherung_Ergebnis.md" "docs/steering/patches/AP-14d_regulatorik-dashboard_altmaterial-verschiebung-claude-entschaerfung_Ergebnis.md" "docs/steering/patches/AP-14e_regulatorik-dashboard_struktur-review-commit-vorbereitung_Ergebnis.md"
```

Danach optional:

```bash
git add ".claude/learning/session-log.md"
```

Nicht ausführen: `git add -A` ohne Einschränkung — könnte unerwünschte Dateien aufnehmen.

---

## Commit-Message

```
docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

- sichert CLAUDE.md-Wissen in stabile Anamnese- und QA-Notizen
- verschiebt historische Bauprompts und UX-Einzelfeedbacks nach Altmaterial
- entschaerft lokale CLAUDE.md durch Umbenennung ins Altmaterial
- erhaelt Mockup, Master-Bauprompt, UX-Synthese und Roh-MINI_SPEC unveraendert
- bereitet regulatorik-dashboard fuer fachliche Neufassung vor
```

Hinweis: Umlaute in der Commit-Message als ae/oe/ue/ss (PowerShell-Terminal-Kompatibilität).
Für git commit via Terminal-Heredoc:

```
docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

- sichert CLAUDE.md-Wissen in stabile Anamnese- und QA-Notizen
- verschiebt historische Bauprompts und UX-Einzelfeedbacks nach Altmaterial
- entschaerft lokale CLAUDE.md durch Umbenennung ins Altmaterial
- erhaelt Mockup, Master-Bauprompt, UX-Synthese und Roh-MINI_SPEC unveraendert
- bereitet regulatorik-dashboard fuer fachliche Neufassung vor
```

---

## Folgepfad

```
1. Commit durch Albert (Add-Befehl oben + Commit mit Message)
2. Abschlussritual für AP-14b–e (nach Commit)
3. AP-14f — regulatorik-dashboard Identitäts- und Steuerungsblock-Anamnese
   (fachliche Neufassung: Steuerungsblock-Entwurf, Seed-Vorbereitung)
```

---

## Geänderte Dateien in AP-14e

```
docs/steering/patches/AP-14e_regulatorik-dashboard_struktur-review-commit-vorbereitung_Ergebnis.md  (neu)
```

---

## Nicht-Ziel-Nachweis für AP-14e selbst

```
Dateien verschoben:        nein
Dateien gelöscht:          nein
Dateien gestaged:          nein
Commit ausgeführt:         nein
Abschlussritual:           nein
MINI_SPEC geändert:        nein
APP_SPEC erstellt/geändert: nein
Seed geändert:             nein
HTML geändert:             nein
Steuerdateien geändert:    nein
```
