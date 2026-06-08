# WORKFLOW – Finanzwesir 2.0
Stand: 2026-05-03 12:00 | Session: Synthese-Aktivierung | Geändert von: Claude

Kochbuch für den Projektalltag. Kein Lesen nötig — einfach der Reihe nach folgen.
Vollständige Anleitung mit Beispieldialogen: `docs/steering/PRAXIS-ANLEITUNG.md`

---

## Situation A: Wiedereinstieg nach Pause

*"Ich habe einen Monat nicht am Projekt gearbeitet."*

### Schritt 1 — Drei Dateien lesen (in dieser Reihenfolge, ca. 5 min)

```
1. PROJECT-STATUS.md        ← Was war zuletzt der Fokus? Gibt es Blocker?
2. NAVIGATION.md            ← Routing: Was liegt wo?
3. .claude/ATTEMPT-LOG.json ← Gibt es BLOCKED-Einträge? (→ sofortiger Stopp)
4. docs/steering/BACKLOG.md ← Was ist offen? Was kommt als nächstes?
```

Danach weißt du: Was du zuletzt gemacht hast, wo du aufgehört hast, und was jetzt dran ist.

### Schritt 2 — Nächstes Arbeitspaket wählen

Öffne `docs/steering/BACKLOG.md`. Suche in **Abschnitt 🟡 Aktiv** nach einem unvollendeten AP.
Falls leer: Geh zu **Abschnitt ⬜ Offen – Pre-Launch**.

**Auswahlregel:**
1. Höchste Priorität (H vor M vor L)
2. Alle Deps müssen ✅ sein (Spalte "Dep")
3. Kein Eintrag im ATTEMPT-LOG mit `attempts >= 2` für dieses AP

### Schritt 3 — Neuen Faden öffnen

Öffne einen neuen Claude-Chat. Kopiere den Inhalt von
`docs/steering/BACKLOG-PROMPT.md` als **erste Nachricht** in den Faden.

Das war's. Claude übernimmt den Rest des Einstiegs.

---

## Situation B: Arbeitspaket abarbeiten (innerhalb eines Fadens)

### Ablauf

```
Albert → "Ich will AP-19 angehen"
Claude → liest BACKLOG.md + AP-19-DETAIL.md
Claude → formuliert Plan (3–5 Punkte)
Albert → "OK" (oder korrigiert)
Claude → Pre-Code-Gate (7 Fragen, sichtbar im Chat)
Albert → "OK" (oder wartet bei Multi-File/Tabu)
Claude → Code
Albert → testet manuell
Albert → "Passt" oder "Stimmt noch nicht: [was]"
Claude → (bei Bedarf nachbessern, max. 2 Versuche)
Claude → Abschluss-Ritual
```

### Pre-Code-Gate (Claude führt automatisch aus)

Claude wählt je nach Scope:
- **Light-Gate** (1 Datei, kein Tabu-Bereich, klare Ursache): 3 Fragen — Claude macht nach deinem "OK" weiter.
- **Full-Gate** (mehrere Dateien, Tabu-Bereich, App-Arbeit, Engine, unklare Ursache): 8 Fragen inkl. Advocatus Diaboli — Claude wartet auf dein "OK".

Details: `.claude/CLAUDE.md §3`

### Manueller Test (dein Job)

```
1. Live-Server starten: Theme/chart-tests/[relevantes HTML] öffnen
2. Test-CSV laden, die im AP als Testfall genannt ist
3. Drei Zonen prüfen: Viewport 375px (S), 768px (M), 1200px (L)
4. Alles so wie erwartet? → "Passt"
5. Etwas falsch? → Genau beschreiben was (welcher Chart, welche Zone, was sieht man)
```

### Abschluss-Ritual

Sag „fertig" oder „Abschluss-Ritual" — Claude startet `/abschluss-ritual` automatisch.
Details: `.claude/skills/abschluss-ritual/SKILL.md`

---

## Situation C: Neue Aufgabe entdeckt (während der Arbeit)

Sag: **„Neue Aufgabe: [1 Satz was das Problem ist]"**

Claude fragt dann ab:
- Bereich? (Engine / CSS / Design / Theme / Cleanup)
- Priorität? (H / M / L)
- Abhängigkeiten?
- Detail-Datei nötig?

Claude trägt ein, du bestätigst. Die Aufgabe wird NICHT sofort umgesetzt — erst wenn sie an der Reihe ist.

---

## Situation D: Neue App entwickeln (iterative Planung)

**Phase 1 — Explorations-Modus** (kein BACKLOG-Eintrag):
```
"Ich will eine App bauen, die [Zweck]."
```
Claude denkt mit, stellt Fragen, strukturiert. Nichts wird in BACKLOG.md geschrieben.
Dieser Modus kann mehrere Fäden dauern.

**Phase 2 — Zerlegungs-Protokoll** (wenn der Plan klar ist):
```
"Jetzt zerlegen."
```
Claude erstellt eine Preview-Liste mit APP-01, APP-02, ... — zeigt sie im Chat.
Du reviewst: streichen, korrigieren, genehmigen.
Nach deinem „OK" schreibt Claude in BACKLOG.md.

---

## Situation E: Blockiert / 2 Versuche gescheitert

Claude stoppt automatisch nach 2 gescheiterten Fixversuchen.

Du siehst dann:
- Aktueller Stand (was versucht wurde)
- Neu formulierte Ursachenhypothese
- Optionen mit Risikobewertung
- Frage: Wie weiter?

Deine Entscheidung: Anderen Ansatz wählen, Scope eingrenzen, oder AP auf 🔴 Blockiert setzen.

Falls du Claude-seitig nachschauen willst: `.claude/ATTEMPT-LOG.json` enthält alle gescheiterten Versuche mit Datum und Hypothese.

---

## Situation F: App-Arbeit (Pflicht-Check)

Sobald eine Aufgabe `Apps/` betrifft, **vor dem Start**:
```
"Stopp. Ich lese APP-INTERFACE.md und SECURITY-BASELINE.md."
```
Claude liest beide Dateien und bestätigt explizit, bevor der Code beginnt.

---

## Kurzreferenz: Wichtigste Dateipfade

| Was | Pfad |
|-----|------|
| Wo bin ich? | `PROJECT-STATUS.md` |
| Was ist offen? | `docs/steering/BACKLOG.md` |
| Neuen Faden starten | `docs/steering/BACKLOG-PROMPT.md` kopieren |
| AP-Details | `docs/steering/engine/detail/[AP-N]-DETAIL.md` |
| Was darf nicht brechen? | `docs/steering/engine/WORKING-FEATURES.md` |
| Abgeschlossene APs | `docs/steering/BACKLOG-ARCHIV.md` |
| Alte AP-Specs (1–18) | `docs/steering/engine/KNOWN-ISSUES-ARCHIV.md` |
| Historischer Schlachtplan | `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` |
| Routing | `NAVIGATION.md` |
| Claude-Regeln | `.claude/CLAUDE.md` |

---

## Entscheidungsbaum: Was mache ich jetzt?

```
Wiedereinstieg nach Pause?
  └─ ja → Situation A (PROJECT-STATUS + NAVIGATION + BACKLOG lesen)

Weiter an laufendem AP?
  └─ ja → Situation B (BACKLOG-PROMPT in neuen Faden, AP wählen)

Neue Aufgabe entdeckt?
  └─ ja → Situation C ("Neue Aufgabe: [Satz]")

Neue App planen?
  └─ ja → Situation D (Explorations-Modus, dann "Jetzt zerlegen")

Festgefahren / Claude schlägt Kreise?
  └─ ja → Situation E (Manueller Stop, ATTEMPT-LOG prüfen)

App-Arbeit (Apps/ Verzeichnis)?
  └─ ja → Situation F (APP-INTERFACE.md + SECURITY-BASELINE.md zuerst)
```
