Stand: 2026-06-30 | Session: AP-14c | Geändert von: Claude

# AP-14c Ergebnis — regulatorik-dashboard Wissenssicherung aus CLAUDE.md

---

## Kurzstatus

```
Status:                GRÜN
Blocker:               nein
Empfehlung nächster AP: AP-14d — regulatorik-dashboard Altmaterial-Verschiebung und CLAUDE.md-Entschärfung
```

---

## Kettenposition

```
Vorgänger:  AP-14b — regulatorik-dashboard Datei-Triage und App-Fabrik-Neusortierungsplan (✅ 2026-06-30)
Aktuell:    AP-14c — regulatorik-dashboard Wissenssicherung aus CLAUDE.md
Nächster:   AP-14d — regulatorik-dashboard Altmaterial-Verschiebung und CLAUDE.md-Entschärfung
```

---

## Git-Status zu Beginn

```
 M .claude/learning/session-log.md
?? docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md
```

Keine unerwarteten Änderungen. Nur erwartete Artefakte aus AP-14b sichtbar.

---

## Git-Status nach dem AP

```
 M .claude/learning/session-log.md
?? Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md
?? Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md
?? docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md
```

Nur die drei neuen Dateien dieses AP und das AP-14b-Protokoll (untracked aus letzter Session).
Keine Änderungen an bestehenden Dateien.

---

## Gelesene Dateien

```
Apps/regulatorik-dashboard/CLAUDE.md           (Primärquelle — bereits in Kontext aus AP-14b)
docs/steering/patches/AP-14b_...Ergebnis.md    (Gate-2-Prüfung)
```

---

## Gate-Ergebnisse

| Gate | Prüfung | Ergebnis |
|---|---|---|
| Gate 1 — Git-Status | Nur session-log.md + AP-14b-Protokoll | OK |
| Gate 2 — AP-14b GRÜN | Status GRÜN, nächster AP = AP-14c | OK |
| Gate 3 — CLAUDE.md vorhanden | Datei vorhanden (2.586 Bytes) | OK |
| Gate 4 — Ziel-Dateien | Beide nicht vorhanden → neu angelegt | OK |

---

## Extraktionsentscheidung

| CLAUDE.md-Inhalt | Ziel | Übernommen? | Begründung |
|---|---|:---:|---|
| Hauptartefakt: etf-wahlurnen-rechner.html = einzige produktive Datei (Mockup-Phase) | APP_FABRIK_ANAMNESE_MATERIAL | Ja | Wichtiger historischer Kontext; klar als Mockup eingeordnet |
| Spec-Master: Master_Obsidian.md v5.0 verbindlich für Mockup-Phase | APP_FABRIK_ANAMNESE_MATERIAL | Ja | Versionshierarchie der Bauprompts dokumentieren |
| Typischer Workflow: Feedback-Datei → HTML direkt ändern | APP_FABRIK_ANAMNESE_MATERIAL (nur als Historie) | Ja (Historie) | Nicht als aktive Regel — explizit als eingestellt markiert |
| Technische Rahmenbedingungen: Single HTML, kein Server, Chart.js CDN, responsive | DEV_QA_NOTIZEN | Ja | Gültige technische Constraints; als "zu prüfen" markiert |
| Arbeitsregel 1 — Erst prüfen, dann editieren | DEV_QA_NOTIZEN | Ja (Kurzform) | Allgemein sinnvoll; kein projektspezifisches Mandat |
| Arbeitsregel 2 — Einfachste Interpretation zuerst | DEV_QA_NOTIZEN | Ja (Kurzform) | Allgemein sinnvoll; kein projektspezifisches Mandat |
| Arbeitsregel 3 — Batching max. 4 Änderungen | — | Nein | Alter ad-hoc Workflow; App-Fabrik-Gate ersetzt diese Logik |
| Token-Sparregeln: Zeilennummern, Grep, kein Goldplating | DEV_QA_NOTIZEN | Ja | Direkt nützlich für App-spezifische Coding-Sessions |
| Regressions-Checkliste: Tooltip, X-Achse, Abstände, Mobile | DEV_QA_NOTIZEN | Ja | Wertvollster CLAUDE.md-Inhalt — direkt in Coding-Sessions verwendbar |

---

## Geschriebene Dateien

```
Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md            (neu)
Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md                          (neu)
docs/steering/patches/AP-14c_regulatorik-dashboard_claude-wissenssicherung_Ergebnis.md  (neu)
```

---

## QA-Ergebnisse

**Dateien-Existenz:**

| Datei | Vorhanden? |
|---|:---:|
| APP_FABRIK_ANAMNESE_MATERIAL.md | Ja |
| DEV_QA_NOTIZEN.md | Ja |
| CLAUDE.md (unverändert) | Ja (2.586 Bytes) |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md (unberührt) | Ja |
| etf-wahlurnen-rechner.html (unberührt) | Ja |

**Inhaltliche Mindestmarker:**

APP_FABRIK_ANAMNESE_MATERIAL.md:

| Marker | Vorhanden? |
|---|:---:|
| "keine MINI_SPEC" | Ja |
| "keine APP_SPEC" | Ja |
| "kein Steuerungsblock" | Ja |
| "etf-wahlurnen-rechner.html" | Ja |
| "Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md" | Ja |

DEV_QA_NOTIZEN.md:

| Marker | Vorhanden? |
|---|:---:|
| "keine APP_SPEC" | Ja |
| "Mockup" | Ja |
| "Tooltip" | Ja |
| "X-Achsen-Labels" | Ja |
| "Mobile-Darstellung" | Ja |
| "App-Fabrik" | Ja |

Alle 11 Marker bestätigt.

---

## Offene Punkte für AP-14d

AP-14d kann nun CLAUDE.md entschärfen (verschieben oder löschen — nach Alberts OK).

Bedingungen sind erfüllt:
- Wertvolle Inhalte aus CLAUDE.md gesichert: ✅
- Historische Workflows als eingestellt markiert: ✅
- CLAUDE.md noch vorhanden und unverändert: ✅

AP-14d darf außerdem:
- 7 Altmaterial-Kandidaten nach `Altmaterial/` verschieben:
  - Bauprompt_V3, Bauprompt_V4, ChatGPT-Prompt, Perplexity-Prompt
  - UX-Feedback ChatGPT, UX-Feedback Gemini, UX-Feedback Perplexity
- Danach prüfen: Ordner enthält dann noch 6 Kern-Dateien + Altmaterial/.

Hinweis: Ob CLAUDE.md in AP-14d gelöscht oder nach Altmaterial/ verschoben wird,
entscheidet Albert. Beides ist sicher.

---

## Nicht-Ziel-Nachweis

```
CLAUDE.md geändert:            nein  (Größe unverändert: 2.586 Bytes)
CLAUDE.md gelöscht/verschoben: nein
MINI_SPEC geändert:            nein
APP_SPEC erstellt/geändert:    nein
Seed geändert:                 nein
HTML geändert:                 nein
Bauprompt geändert:            nein
UX-Feedback geändert:          nein
Altmaterial analysiert:        nein
Dateien verschoben:            nein
Commit ausgeführt:             nein
```
