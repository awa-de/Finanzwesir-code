Stand: 2026-06-26 | Session: AP-07 | Geändert von: Claude

# AP-07 Ergebnis — Steuerungsblock-Wächter in tech-spec-app und heldenreise

## Auftrag

Minimalen Steuerungsblock-Wächter in `.claude/skills/tech-spec-app/SKILL.md` und `.claude/skills/heldenreise/SKILL.md` einbauen. Beide Skills sollen bei App-Fabrik-App-Arbeit auf den lokalen App-Steuerungsblock verweisen, stoppen wenn Zweck/Barriere/Nicht-Ziele schwach sind, und auf `app-spec-create` als Gesamtprozess verweisen.

---

## Geänderte Dateien

- GEÄNDERT: `.claude/skills/tech-spec-app/SKILL.md` (neuer Abschnitt `## Steuerungsblock-Wächter`)
- GEÄNDERT: `.claude/skills/heldenreise/SKILL.md` (neuer Abschnitt `\## Steuerungsblock-Wächter`)
- NEU: `docs/steering/patches/AP-07_steuerungsblock-waechter-tech-heldenreise_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short` (vor Edits): ` M .claude/learning/session-log.md`
- AP-06/AP-06b committed: ja — nur session-log.md sichtbar, keine app-spec-create oder NAVIGATION.md als offen
- Erwartete Änderungen: `.claude/learning/session-log.md` (WARM-START AP-Wechsel-Eintrag)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — WARM-START)
- Befund: **GRÜN**

### Vorgänger-Gate

- AP-03-Protokoll gefunden: ja — `docs/steering/patches/AP-03_app-steuerungsblock-template_Ergebnis.md`
- AP-06-Protokoll gefunden: ja — `docs/steering/patches/AP-06_app-spec-create-skill_Ergebnis.md`
- AP-06b-Protokoll gefunden: ja — `docs/steering/patches/AP-06b_app-spec-create-skill-nachputz_Ergebnis.md`
- AP-03-Template vorhanden: ja — `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`
- app-spec-create Skill vorhanden: ja — `.claude/skills/app-spec-create/SKILL.md`
- AP-06b-Status: **GRÜN**
- AP-06 nennt AP-07 als nächsten Schritt: ja — „Steuerungsblock-Wächter in heldenreise/SKILL.md und tech-spec-app/SKILL.md"
- AP-06b nennt AP-07 als nächsten Schritt: ja — „app-spec-create koordiniert die beiden Skills, aber ohne eigenen Wächter-Schritt in Phase 1 und 2 kann es passieren, dass tech-spec-app oder heldenreise ohne Steuerungsblock-Prüfung direkt aufgerufen werden"
- Blocker: keine
- Befund: **GRÜN**

### Zielskills

| Skill | Existiert | Steuerungsblock-Hinweis vorher | Zielstelle eindeutig | Befund |
| ----- | --------: | -----------------------------: | -------------------: | ------ |
| `tech-spec-app` | ja | nein | ja — nach `## Wann verwenden?`, vor `## Pflichtquellen` | GRÜN |
| `heldenreise` | ja | nein | ja — nach `\## Wann verwenden?`, vor `\## Grundhaltung` | GRÜN |

---

## Umsetzung

### tech-spec-app

- Wächter-Abschnitt eingefügt: ja
- Position: nach `## Wann verwenden?` (nach der Zeile `Pflicht bei jeder App-Fabrik-App.`), vor `## Pflichtquellen`
- Stil: sauberes Markdown (`## `, `- `, keine Backslash-Escapes) — bestehender Stil der Datei
- Inhalt:

```
## Steuerungsblock-Wächter

Bei App-Fabrik-App-Arbeit zuerst den lokalen App-Steuerungsblock lesen:

1. `Apps/{slug}/APP_SPEC.md` → Abschnitt `Steuerungsblock: Zweck, Barriere, Prüfregeln`
2. Falls keine APP_SPEC existiert: `Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md` → `Vorläufiger Steuerungsblock`
3. Prüfmaßstab: `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`
4. Verhalten: `.claude/CLAUDE.md` § APP-ARBEIT

Vor technischer Spec-Arbeit stoppen, wenn:
- kein Steuerungsblock vorhanden ist
- Zweck oder Barriere unklar ist
- Nicht-Ziele fehlen, unklar sind oder verletzt werden
- die technische Umsetzung über die Muss-Kriterien oder Nicht-Ziele hinausdriftet

Für vollständige APP_SPEC-Erstellung: `app-spec-create` verwenden; `tech-spec-app` ist Phase 1, nicht Gesamtprozess.
```

- Warum kein Vollrewrite: Der restliche Skill (18 Pflichtabschnitte, Quellenhierarchie, Subagent-Policy, Abschlussregel) ist korrekt und vollständig. Ein Vollrewrite wäre Scope-Verletzung. Der Wächter ist eine logische Ergänzung nach `## Wann verwenden?`.

### heldenreise

- Wächter-Abschnitt eingefügt: ja
- Position: nach `\## Wann verwenden?` (nach der Zeile `Pflicht bei App-Fabrik-Apps.`), vor `\## Grundhaltung`
- Stil: Backslash-Escape-Stil (`\## `, `\- `, `APP\_SPEC.md`) — bestehender Stil der Datei; Zeilenabstand mit Leerzeilen zwischen Listenpunkten gemäß Dateikonvention
- Inhalt:

```
\## Steuerungsblock-Wächter

Bei App-Fabrik-App-Arbeit zuerst den lokalen App-Steuerungsblock lesen:

1\. `Apps/{slug}/APP\_SPEC.md` → Abschnitt `Steuerungsblock: Zweck, Barriere, Prüfregeln`

2\. Falls keine APP\_SPEC existiert: `Apps/{slug}/MINI\_SPEC\_FROM\_HAUPTDOKUMENT.md` → `Vorläufiger Steuerungsblock`

3\. Prüfmaßstab: `docs/App-Fabrik/APP\_SPEC\_STEUERUNGSBLOCK\_TEMPLATE.md`

4\. Verhalten: `.claude/CLAUDE.md` § APP-ARBEIT

Vor Beweisdramaturgie stoppen, wenn:

\- Zweck oder Barriere unklar ist

\- falscher Glaubenssatz und Zielzustand nicht unterscheidbar sind

\- Nicht-Ziele fehlen, unklar sind oder verletzt werden

\- die vorgeschlagene Heldenreise eine andere App-Rolle erzeugt als der Steuerungsblock erlaubt

Für vollständige APP\_SPEC-Erstellung: `app-spec-create` verwenden; `heldenreise` ist Phase 2, nicht Gesamtprozess.
```

- Warum kein Vollrewrite: heldenreise ist ein umfangreicher Skill mit Tufte, Krug, FAANG, Dark-Pattern-Grenzwissen, Microcopy, UX-Gate-Checkliste und Pilotbeispiel. All das ist korrekt und unveränderlich. Der Wächter ist logische Voraussetzung vor dem Dramaturgieaufbau, nicht Ersatz dafür.

### Abgrenzungen

- Warum app-spec-create nicht geändert: AP-06b hat app-spec-create bereits präzisiert. AP-07 ist der AP für die Spezial-Skills, nicht für den Koordinator.
- Warum NAVIGATION.md nicht geändert: Die NAVIGATION.md-Routing-Tabelle zeigt nur die Rolle der Skills auf hoher Ebene. Interne Wächter-Regeln gehören nicht ins Routing.
- Warum CLAUDE.md nicht geändert: Der globale Wächter steht bereits in CLAUDE.md § APP-ARBEIT (AP-01/AP-01b). AP-07 macht ihn in den Skills sichtbar, nicht in CLAUDE.md doppelt.
- Warum AP-03-Template nicht geändert: Das Template ist fertig und korrekt (AP-03 GRÜN). AP-07 verweist darauf, ändert es nicht.
- Warum 04_CLAUDE_WORKFLOW_DRAFT.md nicht geändert: Explizit nicht in Scope von AP-07. Vorgesehen für AP-07b oder eigenen AP.

---

## Prüfungen

- tech-spec-app geändert: **ja**
- heldenreise geändert: **ja**
- tech-spec-app verweist auf Template (`docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`): **ja**
- tech-spec-app verweist auf CLAUDE.md § APP-ARBEIT: **ja**
- tech-spec-app verweist auf app-spec-create als Gesamtprozess: **ja** — „app-spec-create verwenden; tech-spec-app ist Phase 1, nicht Gesamtprozess"
- tech-spec-app stoppt bei schwachem Steuerungsblock: **ja** — 4 Stop-Bedingungen
- heldenreise verweist auf Template: **ja**
- heldenreise verweist auf CLAUDE.md § APP-ARBEIT: **ja**
- heldenreise verweist auf app-spec-create als Gesamtprozess: **ja** — „app-spec-create verwenden; heldenreise ist Phase 2, nicht Gesamtprozess"
- heldenreise stoppt bei schwachem Steuerungsblock: **ja** — 4 Stop-Bedingungen
- keine Score-Tabelle dupliziert: **ja** — kein Prüfscore in Wächter-Abschnitt
- kein AP-03-Template kopiert: **ja** — nur Verweis, keine Struktur kopiert
- keine anderen Skills geändert: **ja**
- keine CLAUDE.md geändert: **ja**
- keine NAVIGATION.md geändert: **ja**
- keine App-Specs geändert: **ja**
- keine Mini-Specs geändert: **ja**
- kein Code geändert: **ja**
- keine Daten geändert: **ja**
- kein Commit: **ja**
- kein Abschlussritual: **ja**

---

## Status

**GRÜN**

---

## Blocker

nein

---

## Offene Punkte

1. `04_CLAUDE_WORKFLOW_DRAFT.md` Phase 2 nennt `spec-mode-architecture`, aber der Pflichtschritt „Steuerungsblock prüfen" ist dort noch nicht ergänzt — vorgesehen für AP-07b.
2. heldenreise-Datei verwendet Backslash-Escape-Stil (`\## `, `\- `, usw.) durchgehend — ungewöhnlich, aber konsistent. Kein Handlungsbedarf für AP-07, ggf. Stil-Normalisierung als eigener AP wenn gewünscht.

---

## Empfohlener nächster AP

**AP-07b — `04_CLAUDE_WORKFLOW_DRAFT.md` Phase 2 mit Steuerungsblock-Pflichtschritt synchronisieren**

Begründung: `04_CLAUDE_WORKFLOW_DRAFT.md` beschreibt den Claude-Workflow für App-Specs, nennt in Phase 2 `spec-mode-architecture`, enthält aber noch keinen expliziten Steuerungsblock-Pflichtschritt. Das ist die letzte verbleibende Drift-Stelle aus AP-00.

Alternativ wenn AP-07b bewusst verschoben wird: **AP-04 — Inventar Steuerungsblöcke über alle 25 Apps** (nur lesend, keine Abhängigkeit von AP-07b).

---

## Commit-Hinweis

Wenn GRÜN:
- AP-07 als eigenen Commit committen (oder zusammen mit AP-06/AP-06b wenn noch nicht committed — laut git status waren AP-06/AP-06b bereits committed).
- Dateien: `.claude/skills/tech-spec-app/SKILL.md`, `.claude/skills/heldenreise/SKILL.md`, `docs/steering/patches/AP-07_steuerungsblock-waechter-tech-heldenreise_Ergebnis.md`
- `.claude/learning/session-log.md` nur mitnehmen, wenn Albert Session-Logs bewusst versioniert.

---

## Bestätigungen

- Kein Vollrewrite: **ja**
- Keine Änderung an app-spec-create: **ja**
- Keine Änderung an NAVIGATION.md: **ja**
- Keine Änderung an CLAUDE.md: **ja**
- Keine Änderung am AP-03-Template: **ja**
- Keine Änderung an 04_CLAUDE_WORKFLOW_DRAFT: **ja**
- Kein App-Spec-Einbau: **ja**
- Keine 25er-Liste: **ja**
- Kein Code: **ja**
- Kein Commit: **ja**
- Kein Abschlussritual: **ja**
