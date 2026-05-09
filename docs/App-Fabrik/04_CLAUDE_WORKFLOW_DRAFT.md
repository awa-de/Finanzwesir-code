# Claude-Workflow für App-Fabrik — Draft V0.1

Stand: 2026-05-09 | Draft, noch nicht bindend | Geändert von: Claude
Quelle: App-Fabrik_Konsolidierung_Naechste-Schritte_V0-1.md §8, App-Fabrik_Zusatzpaket-Integration_V0-1.md §8

**Leitprinzip:** Vorhandenes Claude-Betriebssystem nutzen, nicht parallel neu bauen.

---

## 1. Vorhandene Skills und ihr Einsatz in der App-Fabrik

| Phase | Skill / Command | Rolle |
|---|---|---|
| Session-Start | `/start` | Projektzustand laden, BLOCKED prüfen |
| Neue App-Aufgabe | `/intake` | Arbeitspaket erfassen (App-Familie, Daten, UX-Flow, Annahmen) |
| Briefing prüfen | `01-process-extreme-ownership` | Lücken im App-Briefing finden, Scope-Risiken benennen |
| Architektur klären | `spec-mode-architecture` | App-Familie, Datenvertrag, Shell-Schnittstellen |
| Vor Code | `/pre-code-gate full` | Immer Full-Gate bei App-Arbeit (CLAUDE.md-Regel) |
| Implementierung planen | `impl-mode-workpackages` | Arbeitspakete schneiden |
| Code prüfen | `code-quality-faang-review` | Qualitätsgate nach Build, vor Release |
| Testplan | `manual-test-plan` | Reproduzierbare Testschritte definieren |
| Security prüfen | Lesen: `docs/steering/audits/SECURITY-BASELINE.md` | Vor jeder App-Arbeit |
| Patch abschließen | `/patch-quittung` | Nach jedem Patch |
| App abschließen | `/abschluss-ritual [AP-N]` | Nach vollständigem App-Build |

---

## 2. Ablauf: Von App-Idee bis Release

### Phase 1 — Intake und Briefing

```
1. Albert nennt App-Name oder Slug
2. Claude führt /intake aus:
   - App aus APP_INVENTORY.md identifizieren
   - App-Familie bestimmen
   - Datenbedarf klären (CSV / JSON / Config)
   - UX-Flow und Annahmen benennen
   - Offene Klärungen aus APP_INVENTORY.md ansprechen
3. 01-process-extreme-ownership: Briefing auf Lücken prüfen
4. Albert bestätigt Briefing oder ergänzt
```

### Phase 2 — Spezifikation

```
5. spec-mode-architecture:
   - App-Familie final bestimmen
   - Ghost-Card-Vertrag entwerfen
   - Config-Schema entwerfen
   - State-Modell (Loading/Content/Error/Empty)
   - UI-Primitiven auswählen (aus V0.1-Liste)
   - Annahmen und Grenzen definieren
6. Spec-Dokument zeigen, Albert bestätigt
7. Wenn offen: Fragen aus 02_OPEN_QUESTIONS.md klären
```

### Phase 3 — Gate und Build

```
8. /pre-code-gate full — immer, keine Ausnahme bei App-Arbeit
9. Albert: OK
10. impl-mode-workpackages:
    - README.md + app.config.json zuerst
    - app.schema.json
    - test.html (Grundstruktur)
    - app.module.js (dünne Logik)
    - ghost-card.example.html
11. Nach jedem Patch: /patch-quittung
12. Albert testet nach jedem Patch
```

### Phase 4 — Review und Release

```
13. code-quality-faang-review
14. manual-test-plan ausführen:
    - alle vier States
    - Mobile (375px), Tablet (768px), Desktop (1280px)
    - Tastaturnavigation
    - prefers-reduced-motion
15. Security-Baseline abgleichen
16. /abschluss-ritual [AP-N]
```

---

## 3. Wichtige Workflow-Regeln

### 3.1 Keine neuen Skills vor dem Piloten

Neue App-spezifische Commands (z. B. `app-factory-build.md`) werden erst angelegt, wenn klar ist, dass vorhandene Skills nicht ausreichen. Der erste Pilot läuft mit vorhandenen Skills.

### 3.2 01-process-extreme-ownership nur in Intake/Spec

Extreme Ownership prüft das Briefing und Scope-Risiken. Nicht im Coding-Modus anwenden — dort zählt nur das Gate.

### 3.3 Full-Gate ist immer Pflicht bei App-Arbeit

CLAUDE.md: „APP-ARBEIT → Full-Gate (immer, keine Ausnahme)". Das gilt auch für kleine Patches an bestehenden Prototypen.

### 3.4 Prototypen nicht blind überschreiben

Bestehende Single-HTML-Prototypen bleiben als `_legacy/` erhalten. Factory-Version entsteht daneben in derselben Ordnerstruktur.

### 3.5 Security beginnt vor dem Code

`docs/steering/audits/SECURITY-BASELINE.md` lesen, bevor App-Arbeit beginnt. Security ist kein Abschluss-Audit.

---

## 4. Wann sind neue Commands sinnvoll?

Ein neuer App-Fabrik-Command ist sinnvoll, wenn:
- derselbe Ablauf (≥3 Schritte) bei jeder neuen App wiederholt wird
- und vorhandene Skills diesen Ablauf nicht ordnen können

Empfehlung nach dem Piloten prüfen:
- `app-factory-intake.md` — falls `/intake` zu generisch ist
- `app-factory-spec.md` — falls spec-mode-architecture zu wenig App-Kontext hat

**Nicht jetzt.** Erst nach dem Pilot-App-Build.

---

## 5. Dokumentation pro App (Pflicht)

Jede fertige App hinterlässt in ihrem `/Apps/{slug}/`-Ordner:

| Datei | Inhalt |
|---|---|
| `README.md` | Zweck, Funnel-Block, Inputs, Outputs, Annahmen, Grenzen |
| `ghost-card.example.html` | Vollständiges Copy/Paste-Beispiel für Redakteur |
| `test.html` | Lokale Testseite mit allen vier States |
| `app.config.json` | Kommentiertes Config mit allen Defaults |

---

## Offene Punkte in diesem Draft

- Wf-01: Wann braucht die App-Fabrik eigene Commands? → nach Pilot entscheiden
- Wf-02: App-Briefing-Protokoll für /intake → nach Pilot verfeinern
- Wf-03: Factory-Migration bestehender Prototypen → Prozess nach Pilot definieren
- Wf-04: Test-Gate: was ist Pflicht vor Release? → Definition of Done in Standard Draft
