# Architekturbericht: Zentrale Subagent-Policy für das Claude-Betriebssystem

Stand: 2026-05-11  
Projekt: Finanzwesir 2.0  
Zweck: Peer-Review-fähige Entscheidungsgrundlage für die nächste Optimierung des Claude-Code-Betriebssystems

---

## 1. Kurzfassung

Das Projekt hat bereits eine funktionierende Haiku-Subagenten-Infrastruktur:

- `CLAUDE_CODE_SUBAGENT_MODEL=haiku` ist gesetzt.
- Der `SessionStart`-Hook liefert maschinenlesbaren Kontext.
- `/start` nutzt bereits `spec-scout` für mechanische Backlog-/Archiv-/AP-ID-Arbeit.
- Es gibt mehrere spezialisierte Scout-Agenten:
  - `spec-scout`
  - `codebase-scout`
  - `regression-scout`
  - `abschluss-scout`

Die offene Architekturfrage lautet nicht mehr:

> „Können wir Haiku-Subagenten nutzen?“

Sondern:

> „Wie verankern wir die Subagenten-Nutzung so, dass sie wartbar, konsistent und nicht in 15 Skills dupliziert ist?“

Die empfohlene Lösung:

**`subagent-dispatch/SKILL.md` wird zur zentralen Subagent-Policy.**  
Betroffene Commands und Skills erhalten nur kurze lokale Verweise, an welcher Stelle ihres Ablaufs diese Policy anzuwenden ist.

Damit entsteht:

- eine zentrale Agentenmatrix,
- einheitliche Trigger,
- klare Nicht-Delegationsregeln,
- keine verstreuten Copy/Paste-Regeln,
- weniger Tokenverbrauch,
- bessere Wartbarkeit in 6 Monaten.

---

## 2. Ausgangslage

### 2.1 Projektkontext

Finanzwesir 2.0 verwendet ein Claude-Code-Betriebssystem aus:

| Bereich | Rolle |
|---|---|
| `CLAUDE.md` | Verfassung: Verhalten, Grenzen, Invarianten, Gates |
| `NAVIGATION.md` | Routing: was liegt wo, was wann lesen |
| `.claude/commands/` | operative Slash-Commands |
| `.claude/skills/` | Detailprozeduren / wiederverwendbare Workflows |
| `.claude/agents/` | Subagenten für mechanische Zuarbeit |
| `PROJECT-STATUS.md` | Tageslage, Fokus, nächster Schritt, Blocker |
| `.claude/learning/` | session-log, patterns, Lernschleifen |

Die bisherige Session-Start-Architektur wurde bereits verbessert:

1. `SessionStart`-Hook liefert Kontext.
2. `CLAUDE_CODE_SUBAGENT_MODEL=haiku` zwingt Subagenten auf Haiku.
3. `/start` delegiert mechanische Backlog-/Archiv-/AP-ID-Arbeit an `spec-scout`.
4. Die Hauptinstanz bleibt zuständig für Urteil, Synthese und Ausgabe.

Diese Architektur gilt aktuell zuverlässig für `/start`.

### 2.2 Aktuelles Problem

Viele Folgeprozesse sind ebenfalls quellen- und inventarlastig:

- `pre-code-gate.md`
- `app-spec-create.md`
- `tech-spec-app`
- `kassensturz`
- `spec-rewrite-guard`
- `manual-test-plan`
- `selftest-chatgpt`
- `code-quality-faang-review`

Dort entsteht regelmäßig mechanische Arbeit:

- viele Pflichtquellen lesen,
- relevante Stellen extrahieren,
- Dateien inventarisieren,
- Widerspruchskandidaten markieren,
- Backlog-/Archiv-/Statusdaten zählen,
- Regressionstestflächen suchen,
- Alt/Neu-Diffs vorbereiten.

Diese Arbeit ist für Haiku-Scouts geeignet.

Aber: Wenn jede Skill- oder Command-Datei eigene Subagenten-Regeln bekommt, entsteht Regelduplikation.

---

## 3. Zentrale Architekturfrage

Die Kernfrage lautet:

> Sollen alle betroffenen Skills und Commands individuell mit eigener Subagentenlogik optimiert werden, oder soll es eine zentrale Policy geben, auf die sie nur verweisen?

Die Empfehlung ist eindeutig:

**Keine dezentrale Subagentenlogik in vielen Dateien.**

Stattdessen:

1. Zentrale Policy in `subagent-dispatch/SKILL.md`.
2. Kurze lokale Verweise in betroffenen Commands/Skills.
3. Keine eigene Mini-Agentenmatrix pro Datei.

---

## 4. 6-Monats-Regret-Test

Die Leitfrage war:

> „After this works, what's the one thing about this code I'd regret in 6 months?“

Die wahrscheinlichste Reue wäre:

> In 6 Monaten stehen in zwölf Skills leicht unterschiedliche Subagenten-Regeln.

Beispiele für zukünftige Drift:

- Eine Datei sagt: „bei mehr als 5 Pflichtquellen `spec-scout` nutzen.“
- Eine andere sagt: „bei mehr als 3 Dateien Scout nutzen.“
- Eine dritte sagt: „bei App-Arbeit immer Scout nutzen.“
- Eine vierte nennt einen alten Agentennamen.
- Eine fünfte delegiert versehentlich eine Bewertung statt nur Fundstellen.
- Eine sechste widerspricht der zentralen Sicherheitsregel, dass Gates nie delegiert werden.

Das wäre der Rückfall in das ursprüngliche Problem: ökonomisches Arbeiten als verstreute Prompt-Regel statt als strukturelle Betriebslogik.

---

## 5. Gedankenexperiment: Vier extreme Perspektiven

Zur Schärfung der Entscheidung wurde das Problem aus vier Denkstilen betrachtet:

1. Captain America
2. Iron Man
3. Deadpool
4. Das Känguru

Ziel war nicht Rollenspiel, sondern Extremperspektiven:

- Pflicht / Integrität
- Effizienz / Skalierung
- Widerspruchsfindung / Absurditätsprüfung
- Bürokratiekritik / Anti-Drift

### 5.1 Captain America: Verlässlichkeit und Verantwortung

Kernaussage:

- Klare Verantwortlichkeiten sind wichtiger als lokale Cleverness.
- Scouts dürfen Fakten sammeln, aber nie Entscheidungen treffen.
- Zentralisierung schützt die Invarianten.

Übernahme:

- Strikte Grenze zwischen mechanischer Zuarbeit und Hauptinstanz-Urteil.
- Keine Delegation von Gate, Freigabe, Security-Bewertung, Architekturentscheidung oder finalem Plan.
- Selftest nach Umsetzung.

### 5.2 Iron Man: Skalierbarkeit und Hebel

Kernaussage:

- Das Problem ist ein Routingproblem, kein Stilproblem.
- Dezentrale Regeln sind technische Schulden.
- Eine zentrale Agentenmatrix ist der Hebel.

Übernahme:

- `subagent-dispatch` als zentrale Routing-Matrix.
- Betroffene Skills/Commands bekommen nur lokale Adapter.
- Agentenwahl nach Arbeitstyp:
  - Specs/Doku → `spec-scout`
  - Code → `codebase-scout`
  - Regression → `regression-scout`
  - Abschluss/Backlog/Status → `abschluss-scout`

### 5.3 Deadpool: Widerspruchsjagd und Drift-Vermeidung

Kernaussage:

- Copy/Paste-Regeln werden zwangsläufig widersprüchlich.
- Ein zentraler Ort für die Subagentenlogik ist besser als Regelmikroplastik im ganzen System.
- Selftests sollen alte oder widersprüchliche Scout-Regeln finden.

Übernahme:

- Keine vollständigen Subagentenregeln in 10 Dateien.
- Nur kurze Verweise auf die zentrale Policy.
- Selftest sollte später nach veralteten Begriffen suchen:
  - `Haiku`
  - `Subagent`
  - `Scout`
  - Agentennamen
  - alte Referenz auf „Universeller Subagent-Check“

### 5.4 Das Känguru: Zentralisierung ohne Bürokratie

Kernaussage:

- Eine zentrale Policy ist gut, aber sie darf nicht zur neuen Mega-Verfassung werden.
- Nicht alles in `CLAUDE.md`.
- Nicht alles in jeden Skill.
- Eine Matrix, kurze Verweise, keine Regelprosa-Monokultur.

Übernahme:

- `CLAUDE.md` bleibt schlank.
- `subagent-dispatch` bleibt operative Policy, nicht Verfassung.
- Lokale Skills enthalten nur:
  - wann die Policy anzuwenden ist,
  - welcher Agent typischerweise passt,
  - dass die Hauptinstanz entscheidet.

---

## 6. Bestes aus allen Welten

Die konsolidierte Lösung kombiniert:

| Perspektive | Übernommener Beitrag |
|---|---|
| Captain America | harte Verantwortungsgrenzen und Nicht-Delegationsregeln |
| Iron Man | zentrale Agentenmatrix als skalierbare Infrastruktur |
| Deadpool | Anti-Drift, keine Copy/Paste-Regeln, Selftest gegen veraltete Logik |
| Känguru | zentrale Policy ja, Regelbürokratie nein |

Daraus ergibt sich:

> Eine zentrale Subagent-Policy in `subagent-dispatch/SKILL.md`, ergänzt durch kurze lokale Verweise in den wenigen betroffenen Commands und Skills.

---

## 7. Zielbild

### 7.1 Zentrale Policy-Datei

Empfohlener Ort:

```text
.claude/skills/subagent-dispatch/SKILL.md
```

Begründung:

- Der Skill existiert bereits.
- Er ist semantisch genau zuständig: Subagenten-Auswahl.
- Keine neue Datei / Struktur nötig.
- `NAVIGATION.md` verweist bereits auf `/subagent-dispatch`.

Alternative wäre:

```text
.claude/agents/AGENT-ROUTING.md
```

Diese Alternative ist weniger empfehlenswert, weil sie eine neue Struktur einführt und wieder zusätzlich erklärt werden müsste.

### 7.2 Zentrale Agentenmatrix

Die Policy soll mindestens diese Matrix enthalten:

| Arbeitstyp | Agent |
|---|---|
| Specs, Doku, Steering, Commands, Skills, Regelstellen, Pflichtquellen, Widerspruchskandidaten | `spec-scout` |
| Code-Fundstellen, Imports/Exports, Symbole, CSS-Klassen, ähnliche Implementierungen | `codebase-scout` |
| Regressionsflächen, Testfälle, Call-Sites, Working-Features, Test-HTMLs | `regression-scout` |
| Abschluss, DoD, Backlog, Archiv, PROJECT-STATUS, Navigation, Commit-Kontext | `abschluss-scout` |

### 7.3 Standard-Trigger

Subagentenprüfung bei:

- mehr als 5 Pflichtquellen,
- mehr als 3 Dateien nur zu lesen,
- mechanischer Inventur,
- Backlog-/Archiv-/Status-Zählung,
- Diff-/Alt-Neu-Vergleich,
- Regression-Matrix- oder Testfall-Suche,
- System-Selftest / Red-Team / Pfadmatrix,
- App-Spec-Erstellung,
- Full-Gate mit vielen Quellen.

### 7.4 Nicht delegierbar

Niemals an Scouts delegieren:

- Gate-Urteil,
- Blocker/Nicht-Blocker-Entscheidung,
- Security-Bewertung,
- Architekturentscheidung,
- Konfliktauflösung bei widersprüchlichen Regeln,
- Freigabefrage an Albert,
- Slice-Plan-Finalisierung,
- APP_SPEC final schreiben,
- Commit-Message final formulieren,
- PROJECT-STATUS final aktualisieren,
- Regelaufnahme in `CLAUDE.md`.

### 7.5 Erwartetes Scout-Rückgabeformat

Die zentrale Policy sollte ein generisches Rückgabeformat definieren:

```markdown
## Scout-Befund

Aufgabe: [kurz]
Agent: [spec-scout | codebase-scout | regression-scout | abschluss-scout]
Scope: [gelesene Pfade / Suchmuster]

### Relevante Fundstellen
| Datei | Stelle | Fund | Warum relevant |
|---|---:|---|---|

### Mögliche Widersprüche / Risiken
- [nur markieren, nicht entscheiden]

### Nicht gefunden
- [falls relevant]

### Grenzen des Befunds
- [was nicht geprüft wurde]
```

---

## 8. Lokale Verweise statt lokaler Vollregeln

Die betroffenen Commands und Skills sollen nicht die ganze Matrix wiederholen.

Sie sollen nur kurze, kontextspezifische Hooks enthalten:

```markdown
### Subagent-Zuarbeit

Bei mechanischer Quellenarbeit Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Typischer Agent: `[agent-name]`.

Die Hauptinstanz bleibt verantwortlich für Urteil, Gate, Synthese, Schreiben und Freigaben.
```

Je nach Datei kann ergänzt werden, wann im Ablauf der Hook greift.

---

## 9. Betroffene Dateien

### 9.1 Zentral vollständig aktualisieren

```text
.claude/skills/subagent-dispatch/SKILL.md
```

Ziel:

- veralteten Trigger entfernen,
- zentrale Agentenmatrix einfügen,
- Standard-Trigger definieren,
- Nicht-Delegationsregeln definieren,
- Rückgabeformat definieren,
- klare Aussage: Hauptinstanz entscheidet.

Wichtig: Falls dort noch ein Trigger auf den alten „Universeller Subagent-Check“ steht, muss er entfernt werden. Dieser Check wurde bewusst aus `CLAUDE.md` gestrichen.

### 9.2 Kurze lokale Verweise ergänzen

Nur in Dateien, die regelmäßig mechanische Vorarbeit haben:

```text
.claude/commands/pre-code-gate.md
.claude/commands/app-spec-create.md
.claude/commands/selftest-chatgpt.md
.claude/skills/tech-spec-app/SKILL.md
.claude/skills/kassensturz/SKILL.md
.claude/skills/spec-rewrite-guard/SKILL.md
.claude/skills/manual-test-plan/SKILL.md
.claude/skills/code-quality-faang-review/SKILL.md
```

### 9.3 Optional nur prüfen, nicht zwingend ändern

```text
.claude/commands/selftest-perplexity.md
.claude/skills/patch-quittung/SKILL.md
.claude/skills/chain-of-custody/SKILL.md
.claude/skills/spec-quote/SKILL.md
.claude/skills/spec-mode-architecture/SKILL.md
.claude/skills/impl-mode-workpackages/SKILL.md
.claude/skills/analysis-top-01/SKILL.md
```

Diese Dateien können mechanische Arbeit enthalten, sollten aber nicht in der ersten Welle geändert werden, wenn dadurch Scope wächst.

### 9.4 Nicht ändern

```text
.claude/commands/intake.md
.claude/commands/start.md
.claude/skills/00-style-sei-deutsch/SKILL.md
.claude/skills/01-process-extreme-ownership/SKILL.md
.claude/skills/grill-me/SKILL.md
.claude/skills/personas-4-marvel-kaenguru/SKILL.md
.claude/skills/uebergabe/SKILL.md
.claude/skills/uncertainty-map/SKILL.md
.claude/skills/finde-skills/SKILL.md
.claude/skills/abschluss-ritual/SKILL.md
```

Begründung:

- `start.md` ist bereits umgestellt.
- `finde-skills` enthält bereits klare Haiku/Sonnet-Trennung.
- `abschluss-ritual` enthält bereits `abschluss-scout`-Logik.
- Stil-, Persona-, Übergabe- und Unsicherheits-Skills sind urteils- bzw. kontextdominant.
- `intake.md` ist kurz, dialogisch, entscheidungsnah.

---

## 10. Konkrete lokale Ziel-Verweise

### 10.1 `pre-code-gate.md`

Zielverweis:

```markdown
### Subagent-Zuarbeit

Bei umfangreichen Full-Gates Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Typische Zuordnung:
- Pflichtquellen / Spec-Regeln / Security-Regeln → `spec-scout`
- geplante Codeänderung / Regressionstestflächen → `regression-scout`

Die Hauptinstanz beantwortet danach die 9 Gate-Fragen und entscheidet Blocker/Nicht-Blocker, Plan oder Slice-Plan.
```

### 10.2 `app-spec-create.md`

Zielverweis:

```markdown
### Subagent-Zuarbeit

Dieses Command hat viele Pflichtquellen.
Vor Phase 1 Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard: `spec-scout` für Mini-Spec, APP_SPEC, APP_INVENTORY, APP-INTERFACE, SECURITY-BASELINE, Decision Log und Open Questions.

Die Hauptinstanz erstellt oder aktualisiert die APP_SPEC.
```

### 10.3 `selftest-chatgpt.md`

Zielverweis:

```markdown
### Subagent-Zuarbeit

Bei `full` und `redteam` Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Typische Zuordnung:
- Regel-/Command-/Skill-Konsistenz → `spec-scout`
- referenzierte Pfade, Hooks, Agents, Datei-Existenz → `codebase-scout`

Die Hauptinstanz simuliert Szenarien und bewertet Systemgesundheit.
```

### 10.4 `tech-spec-app/SKILL.md`

Zielverweis:

```markdown
## Subagent-Zuarbeit bei Pflichtquellen

Bei mehr als 5 Pflichtquellen Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard: `spec-scout`.

Scout-Zuarbeit:
- relevante Abschnitte aus Mini-Spec, APP_SPEC und Standards
- fehlende Pflichtabschnitte
- mögliche Widersprüche
- offene Fragen / Scope-Funde
- Security- und APP-INTERFACE-Pflichten

Die Hauptinstanz erstellt oder prüft danach die APP_SPEC.
```

### 10.5 `kassensturz/SKILL.md`

Zielverweis:

```markdown
## Subagent-Zuarbeit

Für mechanische Projektinventur Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard: `abschluss-scout`.

Scout-Zuarbeit:
- AP-Zählung nach Priorität
- neue/abgeschlossene APs
- BLOCKED-APs
- ältester offener AP
- session-log-/patterns-Rohsignale
- PROJECT-STATUS-/HOOK-META-Fundstellen

Die Hauptinstanz formuliert Trend, Abweichung, Risiko und Empfehlung.
```

### 10.6 `spec-rewrite-guard/SKILL.md`

Zielverweis:

```markdown
## Subagent-Zuarbeit bei größeren Rewrites

Bei Abschnittsersatz, Vollrewrite oder mehr als ca. 80 geänderten Zeilen Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard: `spec-scout`.

Scout-Zuarbeit:
- Alt/Neu-Fundstellenliste
- entfernte Abschnitte
- hinzugefügte Abschnitte
- mögliche verlorene Prinzipien, Constraints oder Sicherheitsregeln
- Widerspruchskandidaten

Die Hauptinstanz entscheidet, ob Prinzipienverlust vorliegt, und wartet auf Alberts OK.
```

### 10.7 `manual-test-plan/SKILL.md`

Zielverweis:

```markdown
## Subagent-Zuarbeit

Bei komplexen visuellen oder regressionsrelevanten Testfällen Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard: `regression-scout`.

Scout-Zuarbeit:
- relevante Regression-Matrix-Fälle
- Working-Features-Fundstellen
- Test-HTMLs
- CSV-/Datenfälle
- mögliche Viewport-/A11y-Testflächen

Die Hauptinstanz erstellt den manuellen Testplan.
```

### 10.8 `code-quality-faang-review/SKILL.md`

Zielverweis:

```markdown
## Subagent-Zuarbeit

Bei Reviews über mehr als 2 Dateien oder bei Architektur-/Pattern-Verdacht Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Typische Zuordnung:
- Code-Fundstellen, Parallelstrukturen, Imports, CSS-Klassen → `codebase-scout`
- mögliche Regressionen / Testflächen → `regression-scout`
- relevante Architekturregeln / Specs → `spec-scout`

Die Hauptinstanz bewertet Severity, Architekturwirkung und Abschlussentscheidung.
```

---

## 11. Warum diese Lösung besser ist als individuelle Optimierung

### 11.1 Wartbarkeit

Eine Agentenmatrix ist leichter zu pflegen als viele verstreute Regeln.

Wenn später ein neuer Agent hinzukommt, muss primär `subagent-dispatch` angepasst werden, nicht 12 Skills.

### 11.2 Konsistenz

Alle Skills verwenden dieselben Trigger, dieselben Nicht-Delegationsregeln und dieselben Agentenrollen.

### 11.3 Sicherheit

Die gefährlichsten Aufgaben bleiben zentral ausgeschlossen:

- Security-Bewertung,
- Gate-Urteil,
- Architekturentscheidung,
- Freigabe.

### 11.4 Token-Ökonomie

Mechanische Lese- und Sucharbeit wird häufiger ausgelagert, aber nicht durch viele lokale Regeln erzwungen.

### 11.5 Weniger Regelrauschen

Die betroffenen Skills bleiben lesbar. Sie sagen nur:

> „Hier im Ablauf Policy anwenden.“

Nicht:

> „Hier ist eine eigene Subagentenverfassung.“

---

## 12. Risiken der empfohlenen Lösung

### Risiko 1: `subagent-dispatch` wird zu groß

Wenn die zentrale Policy zu ausführlich wird, entsteht dort eine neue Mini-`CLAUDE.md`.

Gegenmaßnahme:

- Matrix statt Prosa,
- klare Trigger,
- klare Verbote,
- kurzes Rückgabeformat,
- keine fachlichen Spezialregeln.

### Risiko 2: Skills vergessen, die Policy aufzurufen

Wenn ein Skill keinen lokalen Verweis hat, nutzt Claude die zentrale Policy eventuell nicht.

Gegenmaßnahme:

- Nur die wichtigsten betroffenen Dateien in Welle 1 ergänzen.
- Selftest später auf fehlende Verweise prüfen.

### Risiko 3: Claude liest die zentrale Policy zu selten

Wenn lokale Verweise zu schwach sind, wird die Policy ignoriert.

Gegenmaßnahme:

- Lokale Verweise müssen konkret sagen:
  - wann anwenden,
  - typischer Agent,
  - Hauptinstanz bleibt verantwortlich.

### Risiko 4: Agenten werden für Urteile missbraucht

Gegenmaßnahme:

- zentrale Nicht-Delegationsliste,
- Scout-Rückgabeformat „Fundstellen, keine Entscheidung“,
- lokale Skills wiederholen nur den Hauptinstanz-Satz.

---

## 13. Abgrenzung: Was diese Änderung nicht löst

Diese Änderung löst nicht:

- fachliche Qualität der App-Specs,
- technische Qualität der Implementierung,
- Designqualität der App-Fabrik,
- Vollständigkeit der Agents selbst,
- fehlende automatische Tests,
- die Frage, ob ein zukünftiger `learning-scout` sinnvoll ist.

Sie löst nur:

> Wie mechanische Zuarbeit konsistent, kostensparend und wartbar an vorhandene Haiku-Subagenten delegiert wird.

---

## 14. Empfohlener Umsetzungsauftrag für Claude

```markdown
# Auftrag: Zentrale Subagent-Policy einführen und lokale Verweise ergänzen

Ziel:
Subagenten-Nutzung nicht in vielen Skills duplizieren.
`subagent-dispatch/SKILL.md` wird zentrale Subagent-Policy.
Betroffene Commands/Skills bekommen nur kurze lokale Verweise.

Wichtig:
- Kein produktiver Code.
- Keine neuen Skills, Commands oder Agents ohne Albert-OK.
- Keine große Neustrukturierung.
- Chirurgische Änderungen.
- Erst Full-Gate, dann Dateien ändern.
- Hauptinstanz bleibt verantwortlich für Urteil, Gate, Synthese, Schreiben, Security-Bewertung und Freigaben.

Pflichtdateien lesen:
- `.claude/skills/subagent-dispatch/SKILL.md`
- `.claude/commands/pre-code-gate.md`
- `.claude/commands/app-spec-create.md`
- `.claude/commands/selftest-chatgpt.md`
- `.claude/skills/tech-spec-app/SKILL.md`
- `.claude/skills/kassensturz/SKILL.md`
- `.claude/skills/spec-rewrite-guard/SKILL.md`
- `.claude/skills/manual-test-plan/SKILL.md`
- `.claude/skills/code-quality-faang-review/SKILL.md`

Zentrale Änderung:
1. `subagent-dispatch/SKILL.md` zur zentralen Policy machen.
2. Veraltete Referenz auf „Universeller Subagent-Check“ entfernen.
3. Agentenmatrix einfügen:
   - Specs/Doku/Regeln/Pflichtquellen → `spec-scout`
   - Code-Fundstellen/Imports/Symbole/CSS → `codebase-scout`
   - Regression/Testflächen/Working-Features → `regression-scout`
   - Abschluss/Backlog/Archiv/PROJECT-STATUS → `abschluss-scout`
4. Standard-Trigger definieren:
   - mehr als 5 Pflichtquellen
   - mehr als 3 Dateien nur zu lesen
   - mechanische Inventur
   - Diff-/Alt-Neu-Vergleich
   - Backlog-/Archiv-/Status-Zählung
   - Regression-Matrix- oder Testfall-Suche
   - Selftest / Red-Team / Systeminventur
   - App-Spec-Erstellung
   - Full-Gate mit vielen Quellen
5. Nicht delegierbar definieren:
   - Gate-Urteil
   - Blocker/Nicht-Blocker
   - Security-Bewertung
   - Architekturentscheidung
   - Konfliktauflösung
   - Freigabefrage
   - Slice-Plan-Finalisierung
   - APP_SPEC final schreiben
   - Commit-Message final formulieren
   - PROJECT-STATUS final aktualisieren
   - Regelaufnahme in CLAUDE.md
6. Generisches Scout-Rückgabeformat definieren.

Lokale kurze Verweise ergänzen:
- `pre-code-gate.md`
- `app-spec-create.md`
- `selftest-chatgpt.md`
- `tech-spec-app/SKILL.md`
- `kassensturz/SKILL.md`
- `spec-rewrite-guard/SKILL.md`
- `manual-test-plan/SKILL.md`
- `code-quality-faang-review/SKILL.md`

Nicht ändern:
- `start.md`
- `intake.md`
- `finde-skills`
- `abschluss-ritual`
- `uebergabe`
- `00-style-sei-deutsch`
- `01-process-extreme-ownership`
- `grill-me`
- `personas-4-marvel-kaenguru`
- `uncertainty-map`

Nach Umsetzung:
- Diff je Datei zeigen
- Prüfen, dass keine lokale Datei vollständige Agentenmatrix dupliziert
- Prüfen, dass lokale Dateien nur kurze Verweise enthalten
- Abschluss-Ritual ausführen
- Commit-Message erzeugen
```

---

## 15. Dateien, die ein anderes LLM für Peer Review zusätzlich braucht

Damit ein anderes LLM diesen Report fair prüfen kann, sollte es zusätzlich folgende Dateien erhalten.

### 15.1 Zentrale Steuerung

```text
CLAUDE.md
NAVIGATION.md
.claude/settings.local.json
.claude/hooks/session-start.ps1
PROJECT-STATUS.md
```

Warum:

- prüft Rollenverteilung Verfassung vs. Routing vs. Hook,
- prüft, ob Subagent-Policy nicht in `CLAUDE.md` gehört,
- prüft, ob `CLAUDE_CODE_SUBAGENT_MODEL=haiku` gesetzt ist.

### 15.2 Commands

```text
.claude/commands/start.md
.claude/commands/pre-code-gate.md
.claude/commands/app-spec-create.md
.claude/commands/selftest-chatgpt.md
.claude/commands/selftest-perplexity.md
.claude/commands/intake.md
```

Warum:

- prüft, ob lokale Verweise ausreichend sind,
- prüft, ob `/start` bereits korrekt ist,
- prüft, ob `pre-code-gate` und `app-spec-create` zentrale Policy brauchen,
- prüft, ob Selftests Policy-Drift finden können.

### 15.3 Skills

```text
.claude/skills/subagent-dispatch/SKILL.md
.claude/skills/tech-spec-app/SKILL.md
.claude/skills/kassensturz/SKILL.md
.claude/skills/spec-rewrite-guard/SKILL.md
.claude/skills/manual-test-plan/SKILL.md
.claude/skills/code-quality-faang-review/SKILL.md
.claude/skills/abschluss-ritual/SKILL.md
.claude/skills/finde-skills/SKILL.md
.claude/skills/uebergabe/SKILL.md
.claude/skills/distill/SKILL.md
```

Warum:

- prüft zentrale Policy,
- prüft betroffene lokale Verweise,
- prüft Beispiele bereits guter Trennung (`abschluss-ritual`, `finde-skills`),
- prüft, warum `uebergabe` nicht auszulagern ist,
- prüft, ob `distill` wirklich später einen eigenen `learning-scout` braucht.

### 15.4 Agents

```text
.claude/agents/spec-scout.md
.claude/agents/codebase-scout.md
.claude/agents/regression-scout.md
.claude/agents/abschluss-scout.md
```

Warum:

- prüft, ob die Agentenbeschreibungen zur empfohlenen Matrix passen,
- prüft, ob Tools read-only sind,
- prüft, ob Agenten keine Entscheidungen treffen dürfen.

### 15.5 Inventarlisten

```text
inhalt commands.txt
inhalt skills.txt
```

Warum:

- prüft Vollständigkeit der betrachteten Commands und Skills,
- verhindert Missverständnisse zwischen Commands und Skills.

---

## 16. Peer-Review-Fragen

Das andere LLM sollte besonders diese Fragen beantworten:

1. Ist `subagent-dispatch/SKILL.md` der richtige Ort für die zentrale Policy?
2. Sind die lokalen Verweise ausreichend, oder braucht es in einzelnen Commands mehr Spezifik?
3. Ist die Agentenmatrix korrekt?
4. Gibt es Fälle, in denen `spec-scout` und `codebase-scout` verwechselt werden könnten?
5. Sind die Nicht-Delegationsregeln vollständig?
6. Besteht die Gefahr, dass `subagent-dispatch` selbst zu groß wird?
7. Reicht die erste Umsetzungswelle, oder fehlen kritische Dateien?
8. Sollte `distill` sofort angepasst werden oder erst später mit eigenem `learning-scout`?
9. Ist die Lösung konsistent mit der Trennung `CLAUDE.md` = Verfassung, `NAVIGATION.md` = Routing, Commands/Skills = operative Abläufe?
10. Wird das 6-Monats-Regret-Risiko ausreichend reduziert?

---

## 17. Schlussbewertung

Die beste Lösung ist nicht, jeden Skill individuell zu optimieren.

Die beste Lösung ist:

> Eine zentrale Subagent-Policy in `subagent-dispatch/SKILL.md`, kurze lokale Verweise in den wenigen relevanten Commands und Skills, keine Copy/Paste-Agentenregeln.

Das übernimmt:

- Captain Americas Verlässlichkeit,
- Iron Mans Skalierbarkeit,
- Deadpools Drift-Paranoia,
- und die Känguru-kompatible Bürokratiekritik.

Ziel ist ein System, das in sechs Monaten noch wartbar ist:

- eine Matrix,
- klare Verantwortungsgrenzen,
- wenige lokale Adapter,
- keine Regelduplikation,
- keine Delegation von Urteilen.
