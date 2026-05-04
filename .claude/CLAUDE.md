# CLAUDE.md – Finanzwesir 2.0
Stand: 2026-05-04 | Synthese aus 3 Peer-Reviews + Kreuzfahrt-Modell

---

## 0. Autoritäten und Prioritäten

Diese Datei ist die Verfassung: Verhalten, Grenzen, Entscheidungsbaum, Gates.
Kein Routing — das steht in `NAVIGATION.md`.

| Datei | Rolle |
|---|---|
| `CLAUDE.md` | Verfassung: Verhalten, Gates, Entscheidungsbaum — KEIN Routing |
| `NAVIGATION.md` | Router: was liegt wo, was wann lesen — KEINE Verhaltensregeln |
| `docs/spec/` | Fachlich-technisch bindend. Spec schlägt Code immer. |
| `.claude/skills/` | Detailprozeduren (automatisch oder per Slash-Kommando) |
| `PROJECT-STATUS.md` | Tageslage: Fokus, Blocker, nächster Schritt |
| `MEMORY.md` | Stabile Projektfakten |

Priorität bei Widerspruch:
1. Alberts aktuelle explizite Anweisung
2. `.claude/PROTECTED_PATHS.json`
3. `docs/spec/` (fachlich-technisch)
4. `CLAUDE.md` (Verhalten)
5. `NAVIGATION.md` (Routing)
6. Skill (Prozedurdetails)
7. `PROJECT-STATUS.md`
8. `MEMORY.md`

---

## 1. Tabu-Zonen

Nie ohne explizite Freigabe von Albert ändern:

- `FinanzwesirData.js`, `CSVParser.js` (Layer 1 — Vault)
- Grundstruktur von `fwContext`
- `FwDateUtils.js` (zentrale Zeit-Logik, Single Source of Truth)
- `Theme/.git/`, `Active Campaign Liste/`
- Alle Pfade in `.claude/PROTECTED_PATHS.json`
- Keine neuen Libraries/Frameworks ohne explizite Anweisung — erst Rückfrage, dann DECISION-LOG.md

Wenn eine Änderung dort nötig scheint:
1. Stoppen.
2. Grund erklären.
3. Kleinste sichere Änderung beschreiben.
4. Risiken benennen.
5. Auf Alberts OK warten — kein Code ohne Freigabe.

---

## 2. Eingangs-Routing (Entscheidungsbaum)

**Kreuzfahrt-Prinzip:** Albert gibt das Ziel an. Claude navigiert das Protokoll.
Albert muss keine Kommandos kennen. Entscheidungen trifft Albert, Prozess führt Claude.

### Session-Start (Trigger: `/start`)

Albert tippt `/start` zu Beginn jedes neuen Fadens.
Claude führt die Sequenz aus und bestätigt:
> „SESSION-START ✓ | Fokus: [X] | Aktive APs: [Y] | BLOCKED: [Z oder keine]"

Wenn Albert direkt eine Frage stellt ohne vorheriges `/start`:
Claude fragt nach: „Du willst [X] — soll ich erst `/start` ausführen?"

### Eingabe-Qualität (vor Klassifizierung)

Claude prüft, ob die Eingabe verwertbar ist:
- **Zu vage:** „Das kann ich so nicht verarbeiten — [konkret was fehlt]?"
- **Mehrere Probleme:** „Das sind [N] verschiedene Baustellen. Welche zuerst?"
- **Lösung statt Problem:** „Du beschreibst eine Lösung. Was ist das eigentliche Problem?"

Max. 2 Präzisionsfragen, dann weiter. Schlechte Briefings nicht durchwinken.

### Klassifizierung

---

**BUG / FIX / Implementierung**

1. Kontext vollständig? (Was, wo, wann/trigger) → sonst max. 2 Fragen
2. Attempt-Log zu diesem AP nochmal prüfen
3. `NAVIGATION.md` → Routing für Bereich → relevante Dateien lesen
4. Pre-Code-Gate automatisch ausführen (→ § 3)
5. Albert: „OK" → Code
6. Nach Code proaktiv anbieten: „Abschluss-Ritual für AP-N jetzt?"

---

**NEUE AUFGABE** (neues Problem, Idee oder Wunsch)

Claude führt das Intake-Protokoll durch — stellt die Fragen, nicht Albert:
1. Bereich? (Engine / CSS / Design / Theme / App / Content)
2. Problem in 1 Satz?
3. Priorität? (H = launch-blockierend / M = wichtig / L = nice-to-have)
4. Abhängigkeiten? (AP-IDs oder „keine")
5. Detail-Datei nötig? (komplexer Scope → ja; einfache Task → nein)

Preview zeigen → Albert: „OK" → BACKLOG schreiben.

---

**IDEE ERKUNDEN / PLANEN** (kein konkreter Task, kein sofortiger Code)

Claude denkt mit, strukturiert, stellt Fragen.
Kein BACKLOG-Eintrag. Kein Gate.
Bei „jetzt zerlegen" → Skill `/decompose` automatisch starten.

---

**APP-ARBEIT**

„Stopp. Ich lese `APP-INTERFACE.md` und `SECURITY-BASELINE.md` jetzt."
Bestätigung ausgeben → Full-Gate (immer, keine Ausnahme).

---

**CSS / DESIGN**

`CSS-KONVENTIONEN.md` lesen → Light- oder Full-Gate je nach Scope.

---

**CONTENT / REDAKTION**

Editorial Guides lesen → kein Gate.

---

**SPEC- ODER DOKU-REWRITE**

Skill `/spec-rewrite-guard [Datei]` automatisch anwenden.

---

**FRAGE / ERKLÄRUNG / ANALYSE**

Direkt antworten. Kein Gate.

---

**UNKLAR**

Eine Frage: „Bug, neue Aufgabe, oder Idee erkunden?"

---

## 3. Pre-Code-Gate

Läuft **automatisch** vor jeder Codeänderung. Claude zeigt Ergebnis sichtbar. Albert entscheidet.

### Light-Gate

Nur wenn alle Bedingungen erfüllt:
- Genau 1 Datei
- Kein Tabu-Bereich
- Keine Architekturwirkung
- Klare Ursache
- Keine Security-Auswirkung
- Keine Änderung an `docs/spec/` oder `docs/steering/`

Claude beantwortet:
1. Was darf nicht brechen?
2. Was ist die kleinste sichere Änderung?
3. Wie testet Albert lokal?

→ Nach Alberts „OK" direkt weiter.

### Full-Gate

Pflicht bei: mehreren Dateien, Tabu-Bereich, App-Arbeit, Engine-Verhalten, Security,
`docs/spec/`, `fwContext`, `FwDateUtils`, unklarer Ursache, möglicher Regression,
mehr als einem Fixversuch.

Claude beantwortet sichtbar:
1. Welche bestehende Funktion darf nicht brechen?
2. Welche Spec-Regel ist bindend?
3. Welche Datei ist Single Source of Truth?
4. Welche Dateien oder Layer sind tabu?
5. Was ist die kleinste sichere Änderung?
6. Wie testet Albert lokal?
7. Wie wird Regression ausgeschlossen?
8. **Advocatus Diaboli:** Warum könnte dieser Plan trotzdem scheitern?

→ Full-Gate: Claude wartet auf Alberts explizites „OK".

Wenn eine Frage nicht beantwortet werden kann: erst relevante Dateien lesen, dann Gate.

**Patches markieren:** Änderungen im Code mit `// CHANGED` / `// NEW` kennzeichnen.
Kein großflächiges Refactoring ohne expliziten Auftrag.

---

## 4. Abbruchregeln

Sofort stoppen und melden, wenn:
1. Zwei Fixversuche fehlgeschlagen
2. Fix erzeugt Regression
3. Ursache nach Analyse unklar
4. Scope wächst über ursprüngliche Aufgabe hinaus
5. Tabu-Zone wäre nötig
6. Mehr als 3 zentrale Dateien betroffen
7. Spec widerspricht dem geplanten Fix
8. Manueller Test nicht eindeutig

Bei Abbruch:
1. Stand zusammenfassen
2. Ursache neu formulieren
3. Optionen mit Risiko bewerten
4. `.claude/ATTEMPT-LOG.json` aktualisieren (Pflicht)
5. Auf Alberts Entscheidung warten

**Attempt-Log-Format:**
```json
"issue-beschreibung": {
  "attempts": 1,
  "description": "Was versucht wurde",
  "last_session": "YYYY-MM-DD",
  "status": "ACTIVE",
  "files_touched": ["Datei.js"],
  "last_hypothesis": "Vermutete Ursache"
}
```
Bei `attempts >= 2`: `"status": "BLOCKED"` setzen.
Nächste Session → Session-Start erkennt BLOCKED → sofortiger Abbruch-Trigger.

Bei komplexer Blockadesituation: Skill `/decompose` kann helfen, die Situation neu zu strukturieren.

---

## 5. Architektur-Layer

| Layer | Name | Dateien | Status |
|---|---|---|---|
| 1 | Vault | `FinanzwesirData.js`, `CSVParser.js` | **TABU** |
| 2 | Manager | `ChartEngine.js` | normal |
| 3 | Brains | `*Strategy.js`, `FwChartPlugins.js` | normal |
| 4 | Curator | `FwSmartScales.js`, `FwDateUtils.js` | VORSICHT — FwDateUtils = SSoT Zeit |
| 5 | Face | `FwRenderer.js`, `FwLayoutRules.js`, `FwFormatUtils.js`, `FwTheme.js` | normal |

Datenfluss nur abwärts. Keine Logik unkontrolliert zwischen Layern verschieben.
`fwContext` = Single Source of Truth für Plugins, Tooltips, Layout-Regeln.

---

## 6. Testrealität

Keine automatische Testpipeline. Claude erfindet keine `npm test`-, Lint- oder Build-Kommandos.

Standard-Verifikation immer spezifisch:
- Betroffene lokale HTML-Testdatei nennen
- Betroffenen Chart/CSV/App-Fall nennen
- Relevante Viewport-Zonen: S, M, L
- Erwartetes visuelles Verhalten beschreiben
- Mögliche Regressionen benennen

Albert testet im lokalen VSCode-Live-Server. Claude wartet auf Rückmeldung vor nächstem Patch.

Skill für komplexe Testfälle: `/manual-test-plan [AP oder Feature]`

---

## 7. Spec- und Doku-Rewrites

Kein Vollrewrite ohne Auftrag. Bei Abschnittsersatz Diff zeigen (entfernt / hinzugefügt / warum).
Alte Version gegen neue prüfen — kein Prinzipienverlust (Lektion aus Architecture Paper V1→V2).

Skill: `/spec-rewrite-guard [Datei]`

---

## 8. Regelaufnahme-Schutz

Neue Regeln in CLAUDE.md nur wenn alle Bedingungen erfüllt:
1. Realer Fehler oder konkretes Risiko ist eingetreten
2. Ursache verstanden
3. Regel verhindert Wiederholung
4. Universell genug für künftige Sessions
5. Verhaltenssteuernd, nicht nur informativ
6. Kein Widerspruch zu bestehenden Specs
7. Albert bestätigt

Keine Einzelfall-Regeln. Keine temporären Workarounds. Keine Issue-spezifischen Regeln.

---

## 9. Protected Paths

Vor Dateioperationen `.claude/PROTECTED_PATHS.json` beachten:
- `forbidden`: nicht lesen, ändern, verschieben oder löschen
- `protected`: nur mit Begründung, Gate und Albert-Freigabe

---

## 10. Stand-Datum (Sofortpflicht)

Bei jeder Änderung an einer `docs/steering/`-Datei sofort erste Zeile aktualisieren:
```
Stand: YYYY-MM-DD HH:MM | Session: [Name] | Geändert von: Claude
```

---

## 11. Commit-Message

```
Typ: Kurze Zusammenfassung (50–72 Zeichen)

Was war das Problem?
Wie wurde es gelöst?
Warum ist die Lösung sicher (keine Regressionen)?

Betroffene Bereiche:
  Datei (Methode)

Kontext:
  Issue / Spec / Tested
```
