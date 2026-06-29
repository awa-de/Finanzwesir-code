# AP-11a Ergebnis — Template-Status und Skill-Begriff Nachputz

Stand: 2026-06-29 | Session: APP-01 AP-11a | Geändert von: Claude

---

## Auftrag

Nach AP-11 drei Driftstellen bereinigen:

- lokales `Status`-Feld aus dem Steuerungsblock-Template entfernen
- `tech-spec-app` Skill-Begriff von `LLM-Selbsttest` auf `LLM-Prüfscore pro Änderung` synchronisieren
- falschen offenen Punkt im AP-11-Protokoll zur `prokrastinations-preis`-APP_SPEC entfernen

---

## Geänderte Dateien

- `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`
- `.claude/skills/tech-spec-app/SKILL.md`
- `docs/steering/patches/AP-11_template-sync-steuerungsblock-score_Ergebnis.md`
- `docs/steering/patches/AP-11a_template-status-skill-begriff-nachputz_Ergebnis.md` (dieses Protokoll)

---

## Änderungen im Detail

### 1. §5 Standardblock — `Status`-Feld entfernt

**Entfernt aus dem Template-Codeblock für APP_SPEC.md:**
```
**Status:** Arbeitsfassung
```

Der Steuerungsblock beginnt jetzt direkt mit `**Diese App existiert, um:**`.

### 2. §5 Standardblock — alter Selbsttest-Block als Drift erkannt

AP-11a hatte zunächst nur den Feldnamen `LLM-Selbsttest vor jeder Änderung` auf `LLM-Prüfscore pro Änderung` synchronisiert. Dabei blieb der alte 5-Fragen-Selbsttest inhaltlich erhalten.

Das wurde nachträglich als Drift erkannt und in AP-11b korrigiert: Der Template-Block verwendet jetzt den echten standardisierten 4-Kriterien-Score mit Score-Regel (Barriere-Abbau / Zielzustand / Nicht-Ziele / Mentorrolle, je 0–2, Score-Regel 8/8).

### 3. §6 Reduzierter Vorläuferblock — `Status`-Feld entfernt, Hinweis ergänzt

**Entfernt aus dem Template-Codeblock für MINI_SPEC:**
```
**Status:** Vorläufig — vollständiger Block in APP_SPEC.md erwartet
```

**Ergänzt als erklärender Satz vor dem Codeblock:**
> Vorläuferblöcke sind Arbeitsfassungen. Dieser Reifegrad wird nicht als lokales `Status`-Feld in die spätere APP_SPEC übernommen.

### 4. §12 Seed-Metadaten-Trennung — widersprüchlichen Satz korrigiert

**Entfernt (widersprach der Regel „kein lokales Status-Feld"):**
```
**Die lokale APP_SPEC kennt nur:**

**Status:** Arbeitsfassung

(gesetzt durch das Einbau-Tool; nicht aus dem Seed übernommen)
```

**Ersetzt durch:**
> Die lokale APP_SPEC übernimmt keine Seed-Metadaten. Der Steuerungsblock beginnt nach den Quellenkommentaren mit `**Rolle:**` oder, falls keine Rolle definiert ist, mit `**Diese App existiert, um:**`.

### 5. `tech-spec-app` SKILL.md — Begriff synchronisiert

**Alt:** `Enthält: ..., LLM-Selbsttest`  
**Neu:** `Enthält: ..., LLM-Prüfscore pro Änderung`

### 6. AP-11-Protokoll — falscher offener Punkt entfernt

Entfernt: Verweis auf `prokrastinations-preis`-APP_SPEC mit `80%-Nordstern`-Status (war bereits in AP-10 als historisch korrekt eingebaut — kein Handlungsbedarf).

---

## Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `**Status:** Arbeitsfassung` als Template-Feld in §5/§6: entfernt | ✅ |
| `LLM-Selbsttest` in Template und Skill: entfernt | ✅ |
| `LLM-Prüfscore pro Änderung` in §5 und SKILL.md: verankert | ✅ |
| `80%-Nordstern` im Template: nicht vorhanden | ✅ |
| AP-11-Protokoll korrigiert | ✅ |
| keine APP_SPEC neu verteilt | ✅ |
| kein `--write` ausgeführt | ✅ |
| keine App-Fachinhalte geändert | ✅ |
| Seed-Datei nicht geändert | ✅ |
| Script-Logik nicht geändert | ✅ |
| kein Commit | ✅ |
| kein Abschlussritual (AP-Anweisung) | ✅ |

### `git diff --name-only`

```
.claude/learning/session-log.md          (← Warm-Start-Eintrag, nicht AP-11a)
.claude/skills/tech-spec-app/SKILL.md
docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md
docs/steering/patches/AP-11_template-sync-steuerungsblock-score_Ergebnis.md
docs/steering/patches/AP-11a_template-status-skill-begriff-nachputz_Ergebnis.md
```

---

## Status

GRÜN

---

## Offene Punkte

Keine.
