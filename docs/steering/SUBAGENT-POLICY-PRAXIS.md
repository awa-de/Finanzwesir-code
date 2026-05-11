# Subagent-Policy Praxisnotiz – Finanzwesir 2.0

Stand: 2026-05-11  
Zweck: Nachvollziehbare Dokumentation der Entscheidung, wie Subagenten/Haiku-Scouts im Claude-Betriebssystem wartbar eingesetzt werden sollen.

---

## 1. Kurzfassung

Wir haben das Claude-Betriebssystem so weiterentwickelt, dass mechanische Arbeit kostengünstig und deterministischer an Haiku-Subagenten ausgelagert werden kann, ohne dass Claude bei jeder Aufgabe neu „nach Gefühl“ entscheiden muss.

Der wichtigste Architekturentscheid:

> Subagentenlogik wird zentral in `.claude/skills/subagent-dispatch/SKILL.md` gepflegt.  
> Einzelne Commands und Skills enthalten nur kurze lokale Verweise, wann diese Policy anzuwenden ist.

Damit vermeiden wir Copy/Paste-Regeln in vielen Skills, widersprüchliche Trigger, veraltete Agentennamen und schwer wartbare Prompt-Prosa.

---

## 2. Ausgangsproblem

Das ursprüngliche Problem war nicht, dass Claude gar keine Subagenten nutzen kann. Das Problem war:

- Claude nutzt Subagenten nur zuverlässig, wenn die Delegation strukturell erzwungen oder sehr explizit eingebaut ist.
- Allgemeine Regeln wie „prüfe, ob Haiku sinnvoll ist“ sind urteilsabhängig.
- Urteilsabhängige Regeln werden in Sonderpfaden wie `/start`, Full-Gates oder App-Arbeit leicht übersprungen.
- Wenn man dieselbe Subagentenlogik in viele Skills schreibt, entsteht langfristig Regel-Drift.

Typisches 6-Monats-Problem:

```text
Skill A sagt: bei mehr als 5 Pflichtquellen spec-scout.
Skill B sagt: bei mehr als 3 Dateien spec-scout.
Skill C nennt noch einen alten Agenten.
Skill D delegiert Security-Bewertung versehentlich mit.
Skill E hat eine eigene Nicht-Delegationsliste.
```

Dann weiß Claude nicht mehr, welche Regel gilt. Das System wird schwer wartbar.

---

## 3. Was bereits vor dieser Entscheidung umgesetzt war

Vor dieser Praxisnotiz war bereits umgesetzt oder beschlossen:

1. `CLAUDE_CODE_SUBAGENT_MODEL=haiku` ist in `.claude/settings.local.json` gesetzt.  
   Dadurch laufen Subagent-Dispatches strukturell auf Haiku.

2. Der `SessionStart`-Hook liefert beim Start maschinenlesbaren Kontext.  
   Der Hook liest unter anderem:
   - `PROJECT-STATUS.md` über `HOOK-META`
   - `.claude/ATTEMPT-LOG.json`
   - `.claude/learning/session-log.md`
   - `.claude/learning/patterns.md`
   - Subagent-Modellstatus

3. `/start` nutzt Hook-Output und delegiert mechanischen Backlog-/Archiv-/AP-ID-Abgleich an `spec-scout`.

4. Der alte allgemeine `Universeller Subagent-Check` in `CLAUDE.md` wurde als falscher Ort identifiziert.  
   Grund: `CLAUDE.md` ist Verfassung, nicht Routing- oder Ökonomie-Logik.

---

## 4. Erkenntnis aus dem Gedankenexperiment

Wir haben das Problem durch vier extreme Perspektiven betrachtet:

### Captain America

Fokus:
- Verlässlichkeit
- klare Verantwortung
- Regeln, die auch unter Stress halten

Übernahme:
- Scouts dürfen nur Fakten liefern.
- Hauptinstanz behält Urteil, Gates, Freigaben und Risikoentscheidungen.

### Iron Man

Fokus:
- Skalierbarkeit
- Effizienz
- technische Hebel
- keine manuelle Regelpflege in vielen Dateien

Übernahme:
- zentrale Routing-Matrix statt dezentrale Wiederholung.
- Skills/Commands nur mit kurzen lokalen Hooks.

### Deadpool

Fokus:
- Widersprüche, Absurditäten, alte Regelreste
- keine Hydra aus Copy/Paste-Regeln

Übernahme:
- Selftest muss nach Policy-Drift suchen:
  - alte Begriffe
  - falsche Agentennamen
  - lokale Agentenmatrizen
  - duplizierte Nicht-Delegationslisten

### Das Känguru

Fokus:
- zentrale Planwirtschaft für Subagenten
- aber keine neue Bürokratie-Monsterdatei

Übernahme:
- eine zentrale Policy ja.
- keine neue Struktur, wenn `subagent-dispatch` bereits existiert.
- Matrix statt Roman.

---

## 5. Entscheidung

Wir übernehmen das Beste aus allen Perspektiven:

```text
Eine zentrale Policy.
Kurze lokale Verweise.
Keine Copy/Paste-Agentenlogik.
Kein stiller Scout.
Kein stiller Nicht-Scout.
```

Zentrale Datei:

```text
.claude/skills/subagent-dispatch/SKILL.md
```

Diese Datei ist die operative Subagent-Policy.

Sie enthält:
- Zweck
- Agentenmatrix
- Trigger
- Faustregel zur Agentenwahl
- Nicht-Delegationsliste
- kompaktes Rückgabeformat
- sichtbare Dispatch-Quittung
- Rückfall-Regel
- Anti-Drift-Hinweis

---

## 6. Agentenrollen

Es gibt vier relevante Haiku-Scouts:

| Arbeitstyp | Agent |
|---|---|
| Specs, Doku, Steering, Commands, Skills, Regelstellen, Pflichtquellen, Widerspruchskandidaten | `spec-scout` |
| Code-Fundstellen, Imports/Exports, Symbole, CSS-Klassen, ähnliche Implementierungen | `codebase-scout` |
| Regressionsflächen, Testfälle, Call-Sites, Working-Features, Test-HTMLs, Testdaten | `regression-scout` |
| Abschluss, DoD, Backlog, Archiv, PROJECT-STATUS, HOOK-META, Commit-Kontext | `abschluss-scout` |

Faustregel:

```text
Prosa, Regeln, Tabellen, Spezifikationen, Markdown-Erklärungen → spec-scout
Code, Symbole, Imports, Exports, CSS-Klassen, Funktionsstrukturen → codebase-scout
Regressionen, Testfälle, Working-Features, Test-HTMLs → regression-scout
Backlog, Abschluss, DoD, PROJECT-STATUS, Commit-Kontext → abschluss-scout
```

Bei Markdown mit Codebeispielen entscheidet die Zielinformation:

- Geht es um eine Regel oder fachliche Aussage? → `spec-scout`
- Geht es um konkrete Code-Struktur? → `codebase-scout`

---

## 7. Was nie delegiert wird

Scouts sammeln. Scouts entscheiden nicht.

Nie delegieren:

- Gate-Urteil
- Blocker/Nicht-Blocker-Entscheidung
- Security-Bewertung
- Architekturentscheidung
- Freigabefrage
- Risikoabwägung
- Synthese
- finale APP_SPEC-Formulierung
- Slice-Plan-Finalisierung
- Dateiänderung
- Commit-Message
- PROJECT-STATUS-Finalisierung
- Regelaufnahme in `CLAUDE.md`
- Rollback-Entscheidung oder Entscheidung, ob eine Änderung verworfen, zurückgedreht oder fortgeführt wird

Diese Punkte bleiben bei der Hauptinstanz.

---

## 8. Sichtbarkeit: Woran Albert erkennt, dass Scouts wirklich genutzt werden

Die Policy muss sichtbare Quittungen verlangen.

Vor Scout-Aufruf:

```text
Subagent-Dispatch: spec-scout (Haiku) — mechanische Quellenextraktion aus Pflichtquellen, keine Entscheidungen.
```

Nach Scout-Rückkehr:

```text
Scout-Ergebnis erhalten: 8 Quellen, 14 Fundstellen, 2 Widerspruchskandidaten, 1 nicht gefunden. Hauptinstanz übernimmt Gate-Urteil und Slice-Plan.
```

Wenn trotz Policy kein Scout genutzt wird:

```text
Subagent übersprungen: Scope zu klein — nur 1 Datei, keine mechanische Quellenextraktion nötig.
```

Merksatz:

```text
Kein stiller Scout.
Kein stiller Nicht-Scout.
```

---

## 9. Betroffene Dateien

### Zentrale Policy

```text
.claude/skills/subagent-dispatch/SKILL.md
```

### Lokale Kurzverweise

Nur dort, wo regelmäßig mechanische Arbeit anfällt:

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

### Prüfen, aber nicht pauschal umbauen

```text
.claude/skills/abschluss-ritual/SKILL.md
.claude/skills/distill/SKILL.md
.claude/commands/start.md
.claude/commands/intake.md
.claude/skills/finde-skills/SKILL.md
.claude/skills/uebergabe/SKILL.md
```

### Nicht anfassen für Subagentenlogik

```text
.claude/skills/00-style-sei-deutsch/SKILL.md
.claude/skills/01-process-extreme-ownership/SKILL.md
.claude/skills/grill-me/SKILL.md
.claude/skills/personas-4-marvel-kaenguru/SKILL.md
.claude/skills/uncertainty-map/SKILL.md
```

---

## 10. Eigene Datei oder Teil der PRAXIS-ANLEITUNG?

Empfehlung: **eigene Datei**, nicht Teil der `PRAXIS-ANLEITUNG.md`.

Begründung:

Die `PRAXIS-ANLEITUNG.md` ist ein operatives Einstiegs- und Arbeitsdokument. Wenn jede vertiefte Architekturentscheidung dort landet, wird sie zu groß und verliert ihren Nutzen.

Diese Subagenten-Entscheidung ist:
- wichtig,
- dauerhaft,
- aber spezialisiert,
- und vor allem für Skill-/Command-Bau relevant.

Deshalb gehört sie in eine eigene Praxisnotiz.

Die `PRAXIS-ANLEITUNG.md` sollte nur einen kurzen Verweis enthalten:

```markdown
## Subagenten und Haiku-Scouts

Die Subagentenlogik ist zentral dokumentiert in:
`docs/steering/SUBAGENT-POLICY-PRAXIS.md`

Kurzregel:
Mechanische Fundstellenarbeit kann an Scouts gehen.
Urteile, Gates, Freigaben, Security-Bewertungen und Dateiänderungen bleiben bei der Hauptinstanz.
```

---

## 11. Empfohlener Speicherort

Empfohlener Pfad:

```text
docs/steering/SUBAGENT-POLICY-PRAXIS.md
```

Warum dort?

- Es ist ein Steuerungs-/Betriebsdokument.
- Es ist kein Skill und kein Command.
- Es erklärt das Warum und Wie der Policy.
- Es ist für Albert und Claude lesbar.
- Es gehört nicht in `.claude/skills/subagent-dispatch/`, weil dort die ausführbare Policy liegt, nicht die Langzeit-Erklärung.
- Es gehört nicht direkt in `CLAUDE.md`, weil das keine Verfassung ist.
- Es gehört nicht vollständig in `PRAXIS-ANLEITUNG.md`, weil es zu spezialisiert ist.

Zusätzlich sollten kurze Verweise ergänzt werden in:

```text
PRAXIS-ANLEITUNG.md
NAVIGATION.md
```

Minimaler NAVIGATION-Eintrag:

```markdown
| Subagent-Policy Praxisnotiz | `docs/steering/SUBAGENT-POLICY-PRAXIS.md` | Warum und wie Haiku-Scouts zentral genutzt werden |
```

---

## 12. Regel für neue Skills

Wenn ein neuer Skill gebaut wird:

1. Erst fachlichen Ablauf sauber konzipieren.
2. Dann Subagenten-Optimierung separat prüfen.
3. Keine Agentenmatrix in den Skill kopieren.
4. Nur lokalen Anwendungspunkt einbauen:
   - wann Policy anwenden?
   - typischer Agent?
   - was bleibt Hauptinstanz?
5. Zentrale Policy bleibt in `subagent-dispatch/SKILL.md`.

---

# 13. Prompt für Claude: neuen Skill ökonomisch optimieren

Diesen Prompt verwenden, nachdem der fachliche Skill-Entwurf steht.

```markdown
# Auftrag: Skill ökonomisch mit Subagent-Policy optimieren

Kontext:

Ich habe den fachlichen Teil eines neuen oder überarbeiteten Skills konzipiert.
Jetzt sollst Du prüfen, ob und wie dieser Skill ökonomisch mit Haiku-Subagenten arbeiten kann.

Wichtig:
Nutze unser zentrales Rahmenwerk.
Die Subagentenlogik wird nicht individuell neu erfunden.
Die zentrale Policy liegt hier:

`.claude/skills/subagent-dispatch/SKILL.md`

Ergänzende Praxisnotiz:

`docs/steering/SUBAGENT-POLICY-PRAXIS.md`

Ziel:

Mechanische Lese-, Such-, Inventar-, Diff-, Zähl- und Fundstellenarbeit soll an passende Haiku-Scouts gehen.
Urteile, Gates, Synthese, Schreiben, Sicherheitsbewertungen und Freigaben bleiben bei der Hauptinstanz.

Verfügbare Scouts:

- `spec-scout`: Specs, Doku, Steering, Commands, Skills, Regelstellen, Pflichtquellen, Widerspruchskandidaten
- `codebase-scout`: Code-Fundstellen, Imports/Exports, Symbole, CSS-Klassen, ähnliche Implementierungen
- `regression-scout`: Regressionsflächen, Testfälle, Call-Sites, Working-Features, Test-HTMLs, Testdaten
- `abschluss-scout`: Abschluss, DoD, Backlog, Archiv, PROJECT-STATUS, HOOK-META, Commit-Kontext

Aufgabe:

Prüfe den Skill-Entwurf anhand dieser Fragen:

1. Welche Schritte sind mechanisch?
   Beispiele:
   - Dateien lesen
   - Fundstellen sammeln
   - Pflichtquellen extrahieren
   - Tabellen vergleichen
   - Diff/Alt-Neu-Vergleich
   - Backlog-/Status-Zählung
   - Testfall-/Regression-Suche
   - Code-Symbolik suchen

2. Welche Schritte sind Urteil/Synthese?
   Diese dürfen nicht delegiert werden:
   - Gate-Urteil
   - Security-Bewertung
   - Architekturentscheidung
   - Blocker/Nicht-Blocker
   - Freigabefrage
   - Risikoabwägung
   - finale Formulierung
   - Dateiänderung
   - Rollback-Entscheidung

3. Falls Subagenten sinnvoll sind:
   - Wo im Ablauf wird die zentrale Subagent-Policy angewendet?
   - Welcher Standard-Agent ist typisch?
   - Welche mechanische Aufgabe bekommt er?
   - Was bleibt ausdrücklich bei der Hauptinstanz?

4. Falls kein Subagent sinnvoll ist:
   - Begründe knapp, warum der Skill zu dialogisch, urteilsnah oder kontextabhängig ist.

Wichtig:

- Kopiere keine vollständige Agentenmatrix in den Skill.
- Kopiere keine vollständige Nicht-Delegationsliste in den Skill.
- Verweise nur kurz auf:
  `.claude/skills/subagent-dispatch/SKILL.md`
- Ergänze höchstens einen kurzen Abschnitt wie:

## Subagent-Zuarbeit

Bei [konkretem Trigger] Subagent-Policy anwenden:
`.claude/skills/subagent-dispatch/SKILL.md`

Standard-Agent:
`[agent-name]`

Der Scout sammelt:
- [mechanische Aufgabe 1]
- [mechanische Aufgabe 2]
- [mechanische Aufgabe 3]

Die Hauptinstanz bleibt verantwortlich für:
- [Urteil/Synthese/Freigabe/Schreiben]

Sichtbarkeit:

Wenn ein Scout genutzt wird, muss Claude sichtbar melden:

`Subagent-Dispatch: [agent-name] (Haiku) — [mechanische Aufgabe], keine Entscheidungen.`

Wenn kein Scout genutzt wird, obwohl es möglich scheint:

`Subagent übersprungen: [Grund].`

Merksatz:

Kein stiller Scout.
Kein stiller Nicht-Scout.

Arbeitsweise:

1. Lies zuerst den Skill-Entwurf vollständig.
2. Lies `.claude/skills/subagent-dispatch/SKILL.md`.
3. Lies bei Bedarf `docs/steering/SUBAGENT-POLICY-PRAXIS.md`.
4. Erstelle zuerst eine kurze Analyse:
   - mechanische Schritte
   - nicht delegierbare Schritte
   - empfohlener Agent oder kein Agent
   - minimaler Einfügepunkt
5. Warte auf mein OK.
6. Erst nach OK den Skill-Text ändern.
7. Keine neuen Agents, Skills oder Commands anlegen.
8. Keine produktiven Codeänderungen.

Erfolgskriterium:

Der Skill bleibt fachlich klar.
Die Subagentenlogik ist nur lokal angedockt, nicht dupliziert.
Die zentrale Policy bleibt die einzige Quelle für Agentenmatrix und Nicht-Delegationsregeln.
```

---

## 14. Prompt für Claude: diese Praxisnotiz ins Projekt einbauen

```markdown
# Auftrag: Subagent-Policy Praxisnotiz ins Projekt einbauen

Erstelle eine neue Dokumentationsdatei:

`docs/steering/SUBAGENT-POLICY-PRAXIS.md`

Zweck:
Langfristige Erklärung der Entscheidung, warum Subagentenlogik zentral in `.claude/skills/subagent-dispatch/SKILL.md` liegt und lokale Skills/Commands nur kurze Verweise enthalten.

Nutze den Inhalt aus dieser Praxisnotiz.

Zusätzlich:
1. Ergänze in `PRAXIS-ANLEITUNG.md` einen kurzen Verweis auf diese Datei.
2. Ergänze in `NAVIGATION.md` einen kurzen Eintrag auf diese Datei.
3. Keine Änderung an `CLAUDE.md`, außer Albert verlangt es ausdrücklich.
4. Keine produktiven Codeänderungen.
5. Vor Änderungen Full-Gate ausführen und auf Alberts OK warten.
6. Nach Änderungen Diff zeigen.
7. Abschluss-Ritual ausführen.
8. Commit-Message erzeugen.
```

---

## 15. Wartungsregel

Wenn neue Skills oder Commands entstehen:

- Fachlicher Ablauf zuerst.
- Subagenten-Optimierung danach.
- Zentrale Policy lesen.
- Nur kurzer lokaler Verweis.
- Keine Agentenmatrix duplizieren.
- Keine Nicht-Delegationsliste duplizieren.
- Sichtbare Dispatch-Quittung beachten.
- Selftest auf Drift erweitern, wenn neue Subagenten-Muster entstehen.

---

## 16. Merksätze

```text
Eine Matrix, viele Verweise.
Scouts sammeln, Hauptinstanz entscheidet.
Kein stiller Scout.
Kein stiller Nicht-Scout.
Keine Copy/Paste-Agentenlogik.
Zentral für das Was, lokal nur für das Wann.
```
