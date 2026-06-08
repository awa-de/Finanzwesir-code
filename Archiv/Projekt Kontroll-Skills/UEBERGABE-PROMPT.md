# Übergabe-Prompt: Kontroll-Rückkopplungs-System implementieren

Stand: 2026-05-04 | Für neuen Faden

---

## Deine Aufgabe

Implementiere das Kontroll-Rückkopplungs-System für Finanzwesir 2.0 exakt nach Plan.
Der vollständige Plan liegt in dieser Datei:

`docs/Projekt Kontroll-Skills/IMPLEMENTIERUNGSPLAN.md`

**Lies diesen Plan zuerst vollständig, bevor du irgendetwas tust.**

---

## Kontext in einem Satz

Albert fokussiert auf Inhalt, Claude trägt das operative Protokoll allein — wenn Claude
eine Regel vergisst, denkt niemand mehr daran. Das neue System baut Rückkopplungsschleifen ein.

---

## Was bereits entschieden ist (nicht neu diskutieren)

- **Hybrid-Ansatz:** Geminis 8 Mechanismen als Gerüst, Perplexitys Sequenzen als Implementierung, ChatGPTs chain-of-custody + spec-quote als Zusatz-Skills
- **Alles auf einmal:** Kein phasenweiser Rollout — alle Artefakte in dieser Session
- **Patch-Quittung:** Immer automatisch nach jedem Patch (Light- und Full-Gate)
- **Kassensturz:** Automatisch montags im `/start`, sonst manuell per `/kassensturz`
- **session-end:** Wird NICHT gebaut — konkurriert mit abschluss-ritual
- **Scope-Check:** Geht als neuer Schritt 2b ins abschluss-ritual — aber NICHT in diesem Faden

---

## Was du implementierst (Reihenfolge einhalten)

1. **CLAUDE.md §2 + §3** — Ergänzungen A1 + A2 (Details im Plan)
2. **Skill: `kassensturz`** — neu, zuerst weil `start` ihn referenziert
3. **Command: `start` (Upgrade)** — G1 Layer-1-Fingerabdruck, G2 Zählprüfung, G3 Montags-Trigger
4. **Skill: `patch-quittung`** — neu
5. **Skill: `chain-of-custody`** — neu
6. **Skill: `spec-quote`** — neu
7. **Skill: `abschluss-ritual` (Upgrade)** — Schritt 2b Scope-Check einfügen
8. **Review-Pass** — `/check-mode-gatekeeper` über alle neuen/geänderten Skills

---

## Was du NICHT anfasst

- `settings.local.json` — bleibt unverändert
- Alle Dateien in `.claude/PROTECTED_PATHS.json`
- Alles in `Theme/assets/js/fw-chart-engine/core/`

---

## Relevante Dateien lesen (vor Implementierungsbeginn)

- `docs/Projekt Kontroll-Skills/IMPLEMENTIERUNGSPLAN.md` — **Pflicht, vollständig**
- `.claude/CLAUDE.md` — aktueller Stand vor deinen Änderungen
- `.claude/commands/start.md` — aktueller Stand vor deinem Upgrade
- `.claude/skills/abschluss-ritual/SKILL.md` — lesen vor dem Upgrade (Schritt 7)

---

## Gate vor Implementierungsstart

Full-Gate läuft automatisch (mehrere Dateien, Architekturwirkung).
Claude beantwortet die 8 Punkte sichtbar, Albert sagt "OK", dann erst Code.
