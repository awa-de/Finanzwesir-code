Stand: 2026-06-26 | Session: AP-06b | Geändert von: Claude

# AP-06b Ergebnis — app-spec-create Skill Nachputz

## Auftrag

Drei fachliche Präzisierungen in `.claude/skills/app-spec-create/SKILL.md` einbauen: Stop-Regel logisch korrekt (APP_SPEC-oder-MINI_SPEC-Logik), Score-Regel AP-03-konform (6–7/8 nur mit Kriterium 3 = 2), Mini-Spec-Ableitung abgesichert (nur aus vorhandenen Aussagen, Unsicherheiten als Klärungsbedarf, nichts erfinden). Kein Vollrewrite.

---

## Geänderte Dateien

- GEÄNDERT: `.claude/skills/app-spec-create/SKILL.md` (4 chirurgische Edits)
- NEU: `docs/steering/patches/AP-06b_app-spec-create-skill-nachputz_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`:
  ```
   M .claude/learning/session-log.md
   M NAVIGATION.md
  ?? .claude/skills/app-spec-create/
  ?? docs/steering/patches/AP-06_app-spec-create-skill_Ergebnis.md
  ```
- AP-06 uncommitted: ja — erwartet, kein Stop-Grund
- Erwartete Änderungen: session-log.md (WARM-START), NAVIGATION.md (AP-06), app-spec-create/ (AP-06), AP-06-Protokoll (AP-06)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — WARM-START)
- Befund: **GRÜN**

---

### AP-06-Gate

- AP-06-Protokoll gefunden: ja — `docs/steering/patches/AP-06_app-spec-create-skill_Ergebnis.md`
- AP-06-Status: **GRÜN**
- AP-06-Blocker: nein
- app-spec-create Skill bestätigt: ja — neu angelegt (Fall A), Verzeichnis und Datei fehlten
- AP-06 hat keine bestehenden App-Specs, Mini-Specs, Code-Dateien oder anderen Skills geändert: bestätigt
- Befund: **GRÜN**

---

### Zielstellen

- Mini-Spec-Ableitungsstelle gefunden: ja — Zeile 51 (Phase 0 Prüfpfad): `vorläufigen Block ableiten (Template § 6), Status „Vorläufig" setzen`
- Score-Regel gefunden: ja — Zeile 65 (LLM-Prüfscore-Pflicht): `6–7/8: Weiter mit Vorbehalt, Lücken sichtbar machen`
- Stop-Regel gefunden: ja — Zeile 114 (Stop-Regeln): `Keine \`MINI_SPEC_FROM_HAUPTDOKUMENT.md\` vorhanden`
- Spec-Gate-Score-Regel gefunden: ja — Zeile 85 (Phase 3 Spec-Gate): `Steuerungsblock-Score ≥ 6/8?`
- chirurgische Änderung möglich: ja — alle vier Stellen eindeutig, keine Überlappung, kein Vollrewrite nötig
- Befund: **GRÜN**

---

## Umsetzung

### Mini-Spec-Ableitung präzisiert

Vorher:
```
- Nur `MINI_SPEC_FROM_HAUPTDOKUMENT.md`? → vorläufigen Block ableiten (Template § 6), Status „Vorläufig" setzen
```
Nachher:
```
- Nur `MINI_SPEC_FROM_HAUPTDOKUMENT.md`? → vorläufigen Block ausschließlich aus vorhandenen Aussagen ableiten (Template § 6), Status „Vorläufig" setzen, Unsicherheiten als Klärungsbedarf markieren — nichts erfinden
```

### Score-Regel 6–7/8 präzisiert

Vorher:
```
- 6–7/8: Weiter mit Vorbehalt, Lücken sichtbar machen
```
Nachher:
```
- 6–7/8: Weiter nur, wenn Kriterium 3 (Nicht-Ziele) = 2; Vorbehalte und Lücken sichtbar machen
```

### Spec-Gate präzisiert

Vorher:
```
- Steuerungsblock-Score ≥ 6/8?
```
Nachher:
```
- Steuerungsblock-Score ≥ 6/8 und Kriterium 3 (Nicht-Ziele) = 2?
```

### Stop-Regel korrigiert

Vorher:
```
- Keine `MINI_SPEC_FROM_HAUPTDOKUMENT.md` vorhanden
```
Nachher:
```
- Weder `APP_SPEC.md` mit Steuerungsblock noch `MINI_SPEC_FROM_HAUPTDOKUMENT.md` vorhanden
```

### Warum kein Vollrewrite

Die vier Präzisierungen sind lokal und eindeutig. Der restliche Skill ist korrekt. Ein Vollrewrite würde Scope verletzen und bestehende korrekte Inhalte destabilisieren.

### Warum keine NAVIGATION.md-Änderung

Die NAVIGATION.md-Tabelle zeigt nur die Rolle des Skills auf hoher Ebene — die Feinjustierung interner Score-Regeln ist nicht Sache der Routing-Tabelle.

### Warum keine anderen Skills geändert

AP-07 ist der vorgesehene AP für `heldenreise` und `tech-spec-app`. Die Nachputz-Änderungen betreffen ausschließlich den Koordinations-Skill `app-spec-create`.

---

## Prüfungen

- Ableitung nur aus vorhandenen Aussagen: **ja** — „ausschließlich aus vorhandenen Aussagen ableiten"
- Klärungsbedarf bei Unsicherheit: **ja** — „Unsicherheiten als Klärungsbedarf markieren"
- nichts erfinden: **ja** — „nichts erfinden" explizit am Ende der Zeile
- 6–7/8 nur mit Kriterium 3 = 2: **ja** — „Weiter nur, wenn Kriterium 3 (Nicht-Ziele) = 2"
- Spec-Gate mit Score ≥ 6/8 und Kriterium 3 = 2: **ja** — „Steuerungsblock-Score ≥ 6/8 und Kriterium 3 (Nicht-Ziele) = 2?"
- Stop-Regel mit APP_SPEC-oder-MINI_SPEC-Logik: **ja** — „Weder APP_SPEC.md mit Steuerungsblock noch MINI_SPEC_FROM_HAUPTDOKUMENT.md vorhanden"
- keine NAVIGATION.md-Änderung: **ja**
- keine CLAUDE.md-Änderung: **ja**
- keine AP-03-Template-Änderung: **ja**
- keine anderen Skills geändert: **ja**
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

1. `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md` haben noch keinen Steuerungsblock-Wächter — vorgesehen für AP-07.
2. Kriterium 3 = 1 (Nicht-Ziele unvollständig, aber keine Verletzung) ist im Skill nicht explizit geregelt — AP-03-Template § 7 regelt diesen Fall; der Skill verweist auf das Template, daher kein unmittelbarer Handlungsbedarf.

---

## Empfohlener nächster AP

**AP-07 — Steuerungsblock-Wächter in `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md`**

Begründung: `app-spec-create` koordiniert die beiden Skills, aber ohne eigenen Wächter-Schritt in Phase 1 und 2 kann es passieren, dass tech-spec-app oder heldenreise ohne Steuerungsblock-Prüfung direkt aufgerufen werden. AP-07 schließt diese Lücke chirurgisch.

---

## Commit-Hinweis

AP-06 und AP-06b sind beide GRÜN und zusammen uncommitted. Gemeinsam committen:
- `.claude/skills/app-spec-create/SKILL.md`
- `NAVIGATION.md`
- `docs/steering/patches/AP-06_app-spec-create-skill_Ergebnis.md`
- `docs/steering/patches/AP-06b_app-spec-create-skill-nachputz_Ergebnis.md`
- `.claude/learning/session-log.md` nur wenn Albert Session-Logs bewusst versioniert

---

## Bestätigungen

- Kein Vollrewrite: **ja**
- Keine Änderung an NAVIGATION.md: **ja**
- Keine Änderung an CLAUDE.md: **ja**
- Keine Änderung am AP-03-Template: **ja**
- Keine Änderung anderer Skills: **ja**
- Kein App-Spec-Einbau: **ja**
- Keine 25er-Liste: **ja**
- Kein Code: **ja**
- Kein Commit: **ja**
- Kein Abschlussritual: **ja**
