# CLAUDE.md Upgrade 2026-05 — Analyse & Implementierungs-Prompt

Stand: 2026-05-08 | v2 (erweitert) | Erstellt von: Claude Sonnet 4.6 | Für: Albert Warnecke

---

## Kontext

Drei LLMs (ChatGPT, Gemini, Perplexity) haben die bestehende CLAUDE.md (Stand 2026-05-04)
mit zwei viralen Claude.md-Fragmenten verglichen:

- Fragment 1: Token-Optimierung, Subagents, Kostenreduktion, PDF-Tooling
- Fragment 2: Behavioral Guidelines, Surgical Changes, Simplicity First, Tests First

Leitfrage: Was bringt uns dem Ziel am nächsten?
Nicht: Was können wir noch anhängen?

---

## Ziel — Der Wissenschaftler im Hochsicherheitslabor

Claude ist die Hälfte eines Mensch/Maschine-Teams.
Selbständig in der Arbeit. Unverhandelbar gebunden an Sicherheitsregeln.

Es gibt nur zwei Zustände:
1. Regelkonformer Betrieb.
2. Notfallprotokoll — klar definierte Schritte zurück zum Normalzustand.

Eine CLAUDE.md, die dieses Ziel vollständig erreicht:
- Ist kurz genug, um vollständig internalisiert zu werden (kein TL;DR-Risiko).
- Enthält die Verfassung, nicht das Prozesshandbuch.
- Trennt Prinzipien (bleiben) von Ritualen (gehören in Commands).

---

## Teil 1: Analyse

### Konsens aller drei LLMs

| Vorschlag | ChatGPT | Gemini | Perplexity | Urteil |
|---|:---:|:---:|:---:|---|
| Labormodell / 2-Zustände explizit vorn | ✓ | ✓ | ✓ | Übernehmen |
| Surgical Changes explizit formulieren | ✓ | ✓ | ✓ | Übernehmen |
| Simplicity-Check ins Full-Gate | ✓ | ✓ | ✓ | Übernehmen |
| Subagenten für mechanische Arbeit | ✓ | ✓ | ✓ | Übernehmen |
| Kein PDF-Tooling in CLAUDE.md | ✓ | ✓ | ✓ | Bestätigt — bleibt draußen |

---

### Was die LLMs unterschiedlich einschätzten

**Wie stark umstrukturieren?**

- ChatGPT: Neue Ordner (commands/), 18 Abschnitte → LÄNGER als das Original. Löst das TL;DR-Problem nicht.
- Gemini: 5 Abschnitte, alles in Skills → Zu dünn. Verliert funktionierendes Verhalten.
- Perplexity: Bestehende Struktur, 4 chirurgische Eingriffe → Zu konservativ für das Beste.

**Diagnose von ChatGPT (richtig):** Die aktuelle CLAUDE.md ist gleichzeitig
Verfassung + Prozesshandbuch + Gate-Checkliste + Commit-Vorlage + Routing + Skill-Ersatz.
Das erzeugt ein TL;DR-Risiko.

**Aber ChatGPTs Lösung (falsch):** Mehr Abschnitte und neue Ordner erhöhen die Gesamtkomplexität.

**Das Beste liegt dazwischen:**
Verfassung kürzer machen (durch Auslagerung von Ritualen) UND gleichzeitig
die vier konsensuell empfohlenen Inhalte hinzufügen.
Netto: gleiche Länge oder kürzer. Aber schärfer.

---

### Wertvolle Einzelmeinungen

**Perplexity: env-Variablen als Infrastrukturebene**

`CLAUDE_CODE_DISABLE_1M_CONTEXT=1` und `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`

Das Lastabwurf-System (§12) ist die Verhaltensebene. env-Variablen sind die Infrastrukturebene.
Beide zusammen sind robuster als eine allein: die Infrastrukturebene verhindert,
dass Claude überhaupt in MODUS R fallen muss.
Kein CLAUDE.md-Inhalt — Infrastrukturentscheidung. Separatentscheidung für Albert.

**ChatGPT: Annahmenregel**

„Entscheidungsrelevante Annahmen vor Code sichtbar machen, wenn mehrere Interpretationen möglich."
Das Gate erzwingt Freigabe. Es erzwingt nicht das Sichtbarmachen von Annahmen davor.
Echter Lücke. Kleiner Zusatz, echter Effekt.

---

### Was nicht übernommen wird

| Vorschlag | Warum nicht |
|---|---|
| commands/ als neue Ordner-Hierarchie | Löst kein reales Problem. Skills reichen. |
| Subagent-Details in CLAUDE.md | Falsche Abstraktionsebene. Gehört in Skill. |
| „Think Before Coding" als Kapitel | Gate-System leistet mehr, strukturierter. |
| Goal-Driven Execution Tabelle | Patch-Quittung + Abbruchregeln sind stärker. |
| Geminis 5-Abschnitte-Kompression | Zu dünn. Verliert funktionierendes Verhalten. |
| PDF-Tooling | Kein PDF-Workflow. Instruction Bloat. |

---

## Teil 2: Empfehlung — Das Beste

**5 Inhalts-Ergänzungen + 2 Auslagerungen = CLAUDE.md schärfer, nicht länger.**

---

### Ergänzung 1 — §0 Labormodell (NEU, ganz vorne)

**Was:** Rollenmodell + 2-Zustände-Logik explizit als erstes, bevor die Autoritäten-Tabelle kommt.

**Warum:** Das Labormodell ist das Kernmotiv des Systems. Es steht in jedem Kontext,
in jeder Begründung, aber nirgendwo in der Verfassung selbst.
Durch das Voranstellen wird das Rollenverständnis für jede Session sofort aktiv —
noch bevor Claude eine Regel liest.
Die 2-Zustände-Logik macht die Systemlogik auf einen Blick sichtbar.

**Tradeoff:** 8–10 Zeilen mehr. Offset: Commit-Message wird ausgelagert (≥15 Zeilen raus).

---

### Ergänzung 2 — Surgical-Check in §3 (UMFORMULIEREN + ERWEITERN)

**Was:** Verbots-Regel → Prüffrage. Eigener Mess vs. fremder Mess.

**Warum:** „Kein Refactoring ohne Auftrag" ist eine Grenze. „Warum wurde diese Zeile angefasst?"
ist eine Prüfhandlung. Prüfhandlungen sind kognitiv wirksamer als Grenzen.

Die Unterscheidung eigen/fremd ist neu und präzise:
- Eigener Mess (durch diesen Patch verwaist) → entfernen = nötig, sonst Inkonsistenz.
- Fremder Mess (bestehender toter Code) → nicht anfassen = Scope-Creep.

Diese Unterscheidung war implizit vorhanden, aber nie ausformuliert.

**Tradeoff:** +4 Zeilen in §3. Kein struktureller Umbau.

---

### Ergänzung 3 — Simplicity-Check als Punkt 9 im Full-Gate

**Was:** Neunter Prüfpunkt: Könnte dieselbe Funktion mit weniger als der Hälfte erreicht werden?
Wenn ja: Was wird weggelassen — und warum ist das richtig?

**Warum:** Punkt 8 (Advocatus Diaboli) prüft: Kann der Plan scheitern?
Punkt 9 prüft: Ist der Plan überhaupt nötig?
Zwei verschiedene Fragen. Die Begründungspflicht verhindert reflexhafte Vereinfachung
genauso wie reflexhafte Komplexität.

**Richtige strukturelle Heimat:** das Gate, nicht ein eigenes Kapitel.
Als Gate-Punkt ist der Check automatisch aktiv — als Kapitel müsste Albert ihn aktivieren.

**Tradeoff:** Full-Gate hat jetzt 9 Punkte. Full-Gate ist per Definition bei komplexen
Änderungen aktiv — ein zusätzlicher Prüfpunkt ist dort verhältnismäßig.

---

### Ergänzung 4 — Subagenten-Trigger in §2 (EINE ZEILE)

**Was:** Im Routing-Block „BUG / FIX / Implementierung", nach Schritt 6:
`7. Bei Datei-Suche, Bulk-Read oder parallelen Teilaufgaben: /subagent-dispatch prüfen.`

Außerdem: `.claude/skills/subagent-dispatch/SKILL.md` erstellen.

**Warum:** Mechanische Such- und Inventurarbeit (grep, glob, Bulk-Read) kostet Hauptkontext
ohne Synthesewert. Der Hauptagent soll synthetisieren, abwägen, entscheiden —
nicht mit Rohmaterial-Listen geflutet werden.

Eine Zeile in der Verfassung. Details (Tiering, Eskalationsregel) im Skill.

**Tradeoff:** +1 Zeile in §2, +1 Skill-Datei.

---

### Ergänzung 5 — Annahmenregel in §3 (MINI-ABSATZ)

**Was:** „Entscheidungsrelevante Annahmen sichtbar machen, wenn mehrere Interpretationen möglich.
Sicherheitsrelevante Annahmen werden nicht still gemacht — klären, nicht raten."

**Warum:** Das Gate setzt Freigabe voraus. Es erzwingt nicht das Sichtbarmachen von Annahmen
davor. Wenn Claude still die falsche Interpretation wählt, ist das erst nach dem Patch sichtbar.
Kleiner Zusatz, echter Hebel.

**Tradeoff:** +3 Zeilen in §3.

---

### Auslagerung 1 — Commit-Message raus aus CLAUDE.md

**Was:** §11 (Commit-Message-Template) aus CLAUDE.md entfernen.
Ziel: `.claude/skills/abschluss-ritual/` (dort gehört es ohnehin hin — das Commit ist Teil des Abschluss-Rituals).

**Warum:** Das Commit-Message-Format ist ein Ritual, keine Verfassungsregel.
Eine Verfassung definiert Verhalten und Grenzen. Sie beschreibt nicht, wie ein Commit-Betreff
formatiert ist. Das abschluss-ritual-Skill enthält den natürlichen Kontext.

**Tradeoff:** Wer CLAUDE.md liest, sieht keine Commit-Vorlage mehr. Aber wer ein Commit
vorbereitet, führt ohnehin /abschluss-ritual aus — dort ist die Vorlage.
Risiko gering. Wenn die Vorlage aktuell NICHT im Skill steht, muss sie dort ergänzt werden
bevor sie aus CLAUDE.md entfernt wird.

**Einsparung:** ~15 Zeilen.

---

### Auslagerung 2 — Session-Start-Beschreibung in §2 komprimieren

**Was:** Die aktuelle §2-Untersektion „Session-Start" beschreibt detailliert, was /start tut.
Diese Detail-Beschreibung ist redundant — /start ist ein Skill, der die Sequenz enthält.
In CLAUDE.md bleibt nur das Prinzip: wann /start getriggert wird, was die Ausgabe ist.

**Warum:** CLAUDE.md beschreibt Verhalten, nicht Prozeduren. Die /start-Prozedur steht im Skill.
Redundanz erzeugt Drift-Risiko (wenn Skill und CLAUDE.md auseinanderlaufen).

**Tradeoff:** ~6 Zeilen kürzer in §2.

---

### Netto-Bilanz

| Aktion | Zeilen |
|---|---|
| §0 Labormodell (neu) | +10 |
| Surgical-Check | +4 |
| Simplicity-Check (1 Punkt) | +3 |
| Subagenten-Trigger | +1 |
| Annahmenregel | +3 |
| Commit-Message auslagern | −15 |
| Session-Start komprimieren | −6 |
| **Netto** | **≈ 0 (ggf. leicht kürzer)** |

CLAUDE.md wird nicht länger. Sie wird schärfer.

---

## Teil 3: Implementierungs-Anweisung

Das ausführende LLM führt folgende Schritte aus.
Vor jedem Schritt: Diff zeigen (entfernt / hinzugefügt / warum). Albert bestätigt.

---

### Vorarbeit: Prüfen

1. Lies `CLAUDE.md` vollständig.
2. Prüfe `.claude/skills/abschluss-ritual/`: Ist das Commit-Message-Format dort bereits enthalten?
   Wenn nein: erst ergänzen, dann aus CLAUDE.md entfernen.
3. Lies `.claude/skills/00-style-sei-deutsch/SKILL.md`.
4. Führe `/spec-rewrite-guard CLAUDE.md` aus.

---

### Schritt 1 — §0 Labormodell einfügen

Position: Als Freitext-Absatz an den Anfang des bestehenden §0, VOR der Autoritäten-Tabelle.
Die Tabelle und der Rest von §0 bleiben unverändert.

Einzufügender Text:

```markdown
## 0. Grundmodell: Der Wissenschaftler im Hochsicherheitslabor

Claude ist die Hälfte eines Mensch/Maschine-Teams.

Claude ist nicht der freischaffende Künstler, der nach eigenem Ermessen handelt.
Claude ist nicht der Fließbandarbeiter ohne Freiheitsgrade.

Claude ist der Wissenschaftler im Hochsicherheitslabor:
- Selbständig in Analyse, Experiment-Planung und Umsetzung.
- Strikt gebunden an Sicherheitsregeln, Gates, Tabu-Zonen und Freigaben.
- Verantwortlich dafür, den Prozess zu führen — Albert gibt das Ziel, Claude navigiert das Protokoll.

Es gibt nur zwei Zustände:
1. Regelkonformer Betrieb.
2. Notfallprotokoll: Regelverletzung oder Regelunklarheit → klar definierte Schritte zurück zum Normalzustand.

Das Notfallprotokoll ist immer sichtbar, nicht in einer Schublade versteckt (→ §12 Lastabwurf).
Wenn regelkonformer Zustand nicht herstellbar: stoppen, Situation beschreiben, Alberts Entscheidung einholen.
```

Dann folgt — ohne Überschriftenwechsel — der bestehende Tabellenblock (Autoritäten-Tabelle + Prioritätsliste).

---

### Schritt 2 — Session-Start in §2 komprimieren

Bestehende Untersektion „Session-Start":

```
### Session-Start (Trigger: `/start`)

Albert tippt `/start` zu Beginn jedes neuen Fadens.
Claude führt die Sequenz aus und bestätigt:
> „SESSION-START ✓ | Fokus: [X] | Aktive APs: [Y] | BLOCKED: [Z oder keine]"

Wenn Albert direkt eine Frage stellt ohne vorheriges `/start`:
Claude fragt nach: „Du willst [X] — soll ich erst `/start` ausführen?"
```

Diese bleibt vollständig erhalten. Entfernt wird nur: falls im Skill-Aufruf irgendwo in §2
eine detailliertere Ablaufbeschreibung der /start-Sequenz steht, die bereits im Skill
selbst steht — diese entfernen.

(Wenn §2 nur die obigen ~6 Zeilen enthält: kein Eingriff nötig, dieser Schritt entfällt.)

---

### Schritt 3 — Subagenten-Trigger in §2

Im Block „BUG / FIX / Implementierung", nach Schritt 6:

```
6. Nach Code proaktiv anbieten: „Abschluss-Ritual für AP-N jetzt?"
7. Bei Datei-Suche, Bulk-Read oder parallelen Teilaufgaben: `/subagent-dispatch` prüfen.
```

---

### Schritt 4 — Simplicity-Check als Punkt 9 ins Full-Gate

Im Full-Gate-Block, nach Punkt 8 (Advocatus Diaboli):

```
9. **Simplicity-Check:** Wie viele Zeilen umfasst die geplante Änderung?
   Könnte dieselbe Funktion mit weniger als der Hälfte erreicht werden?
   Wenn ja: Was wird weggelassen — und warum ist das richtig?
```

---

### Schritt 5 — Surgical-Check und Annahmenregel in §3

Nach dem bestehenden Satz
`**Nach jedem abgeschlossenen Patch:** Claude führt /patch-quittung automatisch aus.
Kein weiterer Patch ohne Alberts Bestätigung des Testfalls.`

Einfügen:

```
**Surgical-Check (gilt für jeden Patch):**
Jede geänderte Zeile muss direkt auf Alberts Anfrage, das Gate oder eine notwendige Folgeänderung zurückführbar sein.
- Eigener Mess (durch diesen Patch verwaist): Imports, Variablen, Funktionen → entfernen.
- Fremder Mess (bestehender toter Code, ungenutzter Stil) → melden, nicht anfassen.
- Stil: Bestehendem Code-Stil folgen, auch wenn Claude es anders machen würde.

Merksatz: Angrenzendes nicht „verbessern" — reparieren was kaputt ist, berühren was nötig ist.

**Annahmenregel:**
Entscheidungsrelevante Annahmen sichtbar machen, wenn mehrere Interpretationen möglich sind.
Keine künstlichen Annahmenlisten bei eindeutigen Aufgaben.
Sicherheitsrelevante Annahmen werden nicht still gemacht — klären, nicht raten.
```

---

### Schritt 6 — Commit-Message aus §11 entfernen

Voraussetzung: Commit-Message-Format ist im abschluss-ritual-Skill enthalten (Vorarbeit-Check).

§11 (Commit-Message) vollständig aus CLAUDE.md entfernen.

Alle folgenden §-Nummern bleiben, oder werden um 1 nach oben angepasst
(§12 Lastabwurf → §11 Lastabwurf) — je nach Format-Entscheidung.
Einfachste Variante: §11 entfernen, §12 bleibt §12, kein Nummernumbau.
Dann hat CLAUDE.md einen Nummernsprung von §10 auf §12 — akzeptabel, da keine Querverweise.

---

### Schritt 7 — Skill `.claude/skills/subagent-dispatch/SKILL.md` erstellen

```markdown
# Subagent-Dispatch — Finanzwesir 2.0

## Wann Subagents einsetzen?

Geeignet (mechanisch, überprüfbar, kein Urteil nötig):
- grep/glob über mehrere Dateien
- Import-/Export-Inventur
- Vorkommenssuche in der Codebase
- Extraktion relevanter Spec-Stellen
- einfache Checklistenprüfung
- Regression-Scout als Zuarbeit (Fundstellen liefern, nicht bewerten)
- Zusammenfassung einzelner isolierter Quellen

Nicht geeignet (Urteil, Abwägung, Risiko):
- Architekturentscheidung
- Gate-Entscheidung
- Tabu-Zonen-Abwägung
- Synthese widersprüchlicher Befunde
- Sicherheitsurteil
- finale Patchplanung

## Modell-Tiering

- Haiku: mechanische Zuarbeit (Suche, Inventur, Extraktion, einfache Checkliste)
- Sonnet: Hauptinstanz (Synthese, Gate, Codeplan, Kommunikation mit Albert)
- Opus: Reserve für besonders schwierige Architektur-, Sicherheits- oder Tradeoff-Fragen

## Eskalationsregel

Wenn ein Subagent urteilen, gewichten, priorisieren oder riskant entscheiden müsste:
→ Abbruch. Befund an Hauptinstanz zurückgeben:
„Hier ist was ich gefunden habe. Bewertung liegt bei dir."

## Hauptinstanz bleibt verantwortlich für

Interpretation, Risikoabwägung, Gate, Kommunikation mit Albert, finaler Patchplan, finale Antwort.
```

---

## Separatentscheidung: settings.json

Nicht Teil dieser CLAUDE.md-Änderung — eigenständige Freigabe durch Albert.

`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`
→ Verhindert 1M-Token-Calls (exponentiell teurer, selten nötig für Einzel-Projekt).

`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`
→ Früheres Compacting auf Infrastrukturebene, bevor Kontextsymptome auftreten.

Das Lastabwurf-System (§12) ist die Verhaltensebene.
Diese env-Variablen sind die Infrastrukturebene.
Beide zusammen robuster als eine allein.

Tradeoff: früheres Compacting kann Details wegkomprimieren.
Gegenmaßnahme bereits vorhanden: `/uebergabe` + MODUS M.

---

## Abschluss-Checkliste (Regelaufnahme-Schutz)

| Kriterium | §0 Labor | Surgical | Simplicity | Subag. | Annahmen | Commit out |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1. Realer Mangel | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 2. Ursache verstanden | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 3. Verhindert Wiederholung | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 4. Universell genug | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 5. Verhaltenssteuernd | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| 6. Kein Widerspruch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7. Albert bestätigt | ○ | ○ | ○ | ○ | ○ | ○ |

---

# ERWEITERUNG v2 — Architekturentscheidungen (2026-05-08)

---

## Architektur-Entscheidung: Block 1 / Block 2 / Gehirn-Modell

### Das Kernproblem mit "Block 2 in CLAUDE.md"

Ursprüngliche Idee: CLAUDE.md in Block 1 (sicherheitskritisch) und Block 2 (prozessual)
strukturieren, damit wichtiges oben steht.

**Fehler:** CLAUDE.md wird immer vollständig geladen. Es gibt keine selektive Ladefunktion
innerhalb einer Datei. Block 1 und Block 2 wären immer gleichzeitig aktiv.
Die Blocks wären nur visuelle Strukturhilfe, kein echter Lademechanismus.

**Lösung:** Block 2 existiert nicht in CLAUDE.md — er existiert als Skills und Commands.
Skills und Commands werden auf Abruf geladen, durch explizite Trigger in CLAUDE.md.

CLAUDE.md = Block 1 (Verfassung, ~130 Zeilen, immer aktiv)
Skills/Commands = Block 2 (Prozeduren, auf Abruf, durch Trigger aktiviert)

### Das Gehirn-Modell

Das System als Ganzes ist das Gehirn — nicht nur CLAUDE.md:

| Komponente | Analogie | Geladen |
|---|---|---|
| `CLAUDE.md` | Großhirn / Neokortex | Immer, vollständig |
| `.claude/commands/` | Frontallappen-Prozeduren | Auf Abruf durch expliziten Trigger |
| `.claude/skills/` | Prozedurales Gedächtnis | Auf Abruf, automatisch oder per Slash-Kommando |
| `MEMORY.md` | Hippocampus / Langzeitgedächtnis | Immer, als Kontext |
| Hooks | Stammhirn / Reflexe | Automatisch bei Ereignis |
| Session-Kontext | Arbeitsgedächtnis | Faden-spezifisch, vergänglich |

---

## LLM-kognitive Designprinzipien (Prävention statt Heilung)

Ziel: Das System so bauen, dass Regelverletzungen gar nicht erst entstehen.
Nicht: Gute Regeln haben und dann Verletzungen reparieren.

### Primacy-Effekt

Die ersten ~20% eines Dokuments werden vom LLM am stärksten gewichtet.
Regeln, die dort stehen, sind am zuverlässigsten internalisiert.
Regeln, die in der Mitte begraben liegen, konkurrieren mit zu viel anderem Inhalt.

**Konsequenz:** Sicherheitskritisches zuerst.
Grundmodell → Invarianten → Tabu → Gate → Freigabe → Abbruch

Routing und Prozesse kommen danach — sie sind wichtig, aber nicht sicherheitskritisch.

### Context Dilution

Jede zusätzliche Regel verdünnt alle anderen in der Aufmerksamkeit des Modells.
Eine CLAUDE.md mit 12 Abschnitten gibt jedem Abschnitt weniger Gewicht als eine mit 8.
Regeln, die nicht in die Verfassung gehören, nehmen anderen Regeln Aufmerksamkeit weg.

**Konsequenz:** Prozeduren auslagern. Nur Prinzipien bleiben.
Checklisten → Commands. Details → Skills. Vorlagen → Skills.

### Trigger-Response-Paare

LLMs folgen konkreten "Wenn X → dann Y"-Paaren zuverlässiger als abstrakten Prinzipien.
"Bei App-Arbeit: Full-Gate, immer" wird zuverlässiger befolgt als
"denk daran, bei sicherheitsrelevanten Bereichen vorsichtig zu sein."

**Konsequenz:** Commands werden nicht passiv vorausgesetzt.
In CLAUDE.md steht der explizite Trigger: "→ /pre-code-gate ausführen"
Das ist zuverlässig, weil Claude eine explizite Anweisung befolgt, keine implizite Erwartung.

### Benannte Zustände

Benannte Modi (MODUS R, MODUS M, MODUS A) sind für LLMs zuverlässiger als unbeschriebene.
Ein benannter Zustand kann referenziert werden: "Ich bin in MODUS M."
Ein unbenannter Zustand erzeugt halluzinierte Selbstdiagnosen.

**Konsequenz:** Das Lastabwurf-System bleibt vollständig in CLAUDE.md.
Es ist das Notfallprotokoll — darf nicht ausgelagert werden.

---

## CL-14 Erweiterung: Semantisches Naming (Systemweit)

CL-14 war ursprünglich: "Abschluss-Ritual: Schritte semantisch benennen (kein Nummern-Drift)"
Prio L im Backlog.

**Entscheidung:** CL-14 wird auf das gesamte System erweitert und vorgezogen.
Begründung: Wir bauen CLAUDE.md gerade komplett neu. Wenn wir §-Nummern als
Querverweise beibehalten, bricht das nächste Mal alles wieder. Einmalige Gelegenheit,
schwache Verbindungen durch starke zu ersetzen.

### Konvention

| Verweistyp | Alt (schwach) | Neu (stark) |
|---|---|---|
| CLAUDE.md-Abschnitt | `CLAUDE.md § 8` | `[Regelaufnahme-Schutz]` |
| CLAUDE.md-Abschnitt | `→ § 3` | `→ [Gate-Prinzip]` |
| Skill / Command | implizit | `→ /pre-code-gate` (bleibt so) |
| Datei | explizit | explizit (bleibt so) |

Regel: Eckige Klammern = exakter Abschnittsname aus der Überschrift.
Der Verweis ist prüfbar: steht `[Regelaufnahme-Schutz]` als Überschrift in der Datei? Dann gilt er.
Ändert sich die Überschrift, muss der Verweis angepasst werden — das ist eine bewusste Entscheidung.

### Schadensanalyse: 7 Stellen in 4 Dateien

Vollständige Liste aller §-Nummern-Verweise, die angepasst werden müssen:

| Datei | Zeile | Aktuell | Neu |
|---|---|---|---|
| `CLAUDE.md` | intern | `→ § 3` | `→ [Gate-Prinzip]` |
| `NAVIGATION.md` | 47 | `→ CLAUDE.md § 2` | `→ [Eingangs-Routing]` oder `→ /start` |
| `NAVIGATION.md` | 70 | `→ CLAUDE.md § 3` | `→ [Gate-Prinzip]` oder `→ /pre-code-gate` |
| `abschluss-ritual/SKILL.md` | 85 | `CLAUDE.md § 11` | Format direkt einbetten (§11 entfällt) |
| `abschluss-ritual/SKILL.md` | 115 | `CLAUDE.md § 8` | `[Regelaufnahme-Schutz]` |
| `distill/SKILL.md` | 79 | `§8-Gate` | `[Regelaufnahme-Schutz]-Gate` |
| `distill/SKILL.md` | 88 | `§8-Gate` | `[Regelaufnahme-Schutz]-Gate` |

Sonderstatus §11: Diese Referenz wird nicht ersetzt — sie entfällt.
Die Commit-Message-Vorlage lebt nach dem Umbau direkt im abschluss-ritual-Skill.

---

## Vollständige Implementierungs-Reihenfolge (v2 — Neubau)

Dies ersetzt die Schritte 1–7 aus Teil 3 (die galten für chirurgische Eingriffe in die alte Struktur).
Wir bauen neu. Der Entwurf liegt in: `aktuelles Projekt/CLAUDE-v2-ENTWURF.md`

### Vorarbeit (einmalig)

1. Aktuelle `CLAUDE.md` lesen und verstehen.
2. `aktuelles Projekt/CLAUDE-v2-ENTWURF.md` vollständig lesen (Entwurf + alle IMPL-Kommentare).
3. `/spec-rewrite-guard CLAUDE.md` ausführen.
4. Albert-Freigabe einholen (explizites "OK").

### Phase 1: Neue CLAUDE.md schreiben

Aus dem Entwurf `CLAUDE-v2-ENTWURF.md` die finale CLAUDE.md erstellen:
- Alle `[IMPL: ...]`-Kommentare entfernen
- Alle `#`-Kommentare im Header entfernen
- Ergebnis in `.claude/CLAUDE.md` schreiben (ersetzt die alte Version)

Erwartet: ~130 Zeilen. Wenn deutlich mehr: Prozeduren sind noch drin → auslagern.

### Phase 2: Commands erstellen (neu)

**`.claude/commands/pre-code-gate.md`** — erstellen:
Inhalt: Light-Gate (3 Fragen) und Full-Gate (9 Fragen inkl. Advocatus Diaboli + Simplicity-Check)
aus der alten CLAUDE.md §3. Ergänzt um Simplicity-Check als Frage 9.

**`.claude/commands/intake.md`** — erstellen:
Inhalt: Das Intake-Protokoll für neue Aufgaben (5 Fragen aus §2 "NEUE AUFGABE").
Wird durch `/intake` ausgelöst. NAVIGATION.md entsprechend ergänzen.

### Phase 3: Skills anpassen

**`.claude/skills/abschluss-ritual/SKILL.md`** — 2 Eingriffe:
1. Zeile 85: `CLAUDE.md § 11` → Commit-Message-Vorlage direkt einbetten (aus alter §11)
2. Zeile 115: `CLAUDE.md § 8` → `[Regelaufnahme-Schutz]`

**`.claude/skills/distill/SKILL.md`** — 2 Eingriffe:
1. Zeile 79: `§8-Gate` → `[Regelaufnahme-Schutz]-Gate`
2. Zeile 88: `§8-Gate` → `[Regelaufnahme-Schutz]-Gate`

**`.claude/skills/subagent-dispatch/SKILL.md`** — neu erstellen:
Inhalt: Tiering (Haiku/Sonnet/Opus), geeignete Aufgaben, ungeeignete Aufgaben, Eskalationsregel.

### Phase 4: NAVIGATION.md anpassen

2 Eingriffe:
1. Zeile 47: `→ CLAUDE.md § 2` → `→ /start` (Routing ist im Skill)
2. Zeile 70: `→ CLAUDE.md § 3` → `→ /pre-code-gate` (Gate-Checkliste ist im Command)

### Phase 5: Backlog aktualisieren

CL-14 als erledigt markieren (wurde durch diesen Umbau abgedeckt).
BACKLOG-ARCHIV.md: CL-14 mit Datum 2026-05-XX eintragen.

### Phase 6: Abschluss-Ritual

`/abschluss-ritual` für diesen Umbau ausführen.
session-log Schritt 0 schreiben.
Commit-Message erstellen (Format: jetzt im abschluss-ritual-Skill).

---

## Separatentscheidung: settings.json (env-Variablen)

Nicht Teil des CLAUDE.md-Neubaus. Eigenständige Freigabe durch Albert.

Perplexity-Empfehlung (begründet, valide):
- `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` — verhindert 1M-Token-Calls (exponentiell teurer)
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` — früheres Compacting auf Infrastrukturebene

Verhaltensebene (Lastabwurf-System) + Infrastrukturebene (env-Variablen) = robuster als eine allein.
Tradeoff: Früheres Compacting kann Details wegkomprimieren.
Gegenmaßnahme: `/uebergabe` + MODUS M deckten diesen Fall bereits ab.

Wenn Albert freigegeben: in `.claude/settings.json` eintragen.

---

## Artefakte dieser Analyse-Session

| Datei | Inhalt | Status |
|---|---|---|
| `aktuelles Projekt/SYNTHESE-IMPLEMENTIERUNGS-PROMPT.md` | Diese Datei — vollständige Analyse + Implementierungsanweisung | Fertig |
| `aktuelles Projekt/CLAUDE-v2-ENTWURF.md` | Neue CLAUDE.md mit Implementierungskommentaren | Fertig, wartet auf Freigabe |
| `.claude/CLAUDE.md` | Aktuelle Verfassung (v1) | Unverändert — wird ersetzt |
| `.claude/commands/pre-code-gate.md` | Gate-Checklisten | Noch nicht erstellt |
| `.claude/commands/intake.md` | Intake-Protokoll | Noch nicht erstellt |
| `.claude/skills/subagent-dispatch/SKILL.md` | Subagent-Tiering | Noch nicht erstellt |
