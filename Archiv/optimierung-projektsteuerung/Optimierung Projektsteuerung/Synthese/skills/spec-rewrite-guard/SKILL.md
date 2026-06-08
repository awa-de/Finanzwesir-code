---
name: spec-rewrite-guard
description: Schützt Spec- und Doku-Rewrites vor Prinzipienverlust. Erzwingt Diff-Anzeige und expliziten Vergleich Alt vs. Neu.
argument-hint: "[Pfad zur Spec-Datei]"
---

# Skill: spec-rewrite-guard

Trigger: Claude startet automatisch bei Änderungen an `docs/spec/`-Dateien.
Manuelle Aktivierung: `/spec-rewrite-guard docs/spec/[Dateiname]`
Argumente: $ARGUMENTS (Dateipfad)

Hintergrund: Beim Übergang Architecture Paper V1.4 → V2.0 gingen vier Architektur-Prinzipien
(A11y, Security, dispose, Sandbox) verloren, weil die Neufassung nicht gegen die Vorfassung
abgeglichen wurde. Dieser Skill verhindert das.

---

## Protokoll

**1. Beide Versionen laden**
- Aktuelle Datei lesen (ist-Zustand)
- Geplante Änderung identifizieren

**2. Diff erzeugen und zeigen**

```
ENTFERNT:
- [Was wird gelöscht oder überschrieben]

HINZUGEFÜGT:
- [Was kommt neu rein]

BEGRÜNDUNG:
- [Warum diese Änderung]
```

**3. Prinzipien-Check**
Folgende Fragen beantworten:
- Gehen durch diese Änderung Prinzipien, Constraints oder Sicherheitsregeln verloren?
- Widerspruch zu anderen Dateien in `docs/spec/`?
- Widerspruch zu `CLAUDE.md` oder `NAVIGATION.md`?

**4. Auf Alberts OK warten**
Claude schreibt die Änderung erst nach Alberts expliziter Freigabe.

---

## Regeln

- Kein Vollrewrite ohne expliziten Auftrag
- Bei Abschnittsersatz immer Diff zeigen — nie einfach überschreiben
- Alte Version vor Löschen gegen neue prüfen
- Im Zweifel: lieber zu viel zeigen als zu wenig
