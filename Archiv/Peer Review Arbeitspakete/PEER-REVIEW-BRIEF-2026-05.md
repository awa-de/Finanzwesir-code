# Architectural Review Brief: Human+AI Project Management System

**Datum:** 2026-05-02  
**Autor:** Albert Warnecke (Finanzwesir 2.0)  
**Zweck:** Peer Review durch andere LLMs — kritisches Feedback auf Architektur-Ebene  
**Sprache:** Deutsch (technische Terme bleiben englisch)

---

## 1. Executive Summary

Ich betreibe ein Einpersonen-Softwareprojekt mit Claude als primärem Entwicklungspartner. Das Besondere: Die Projektdokumentation ist gleichzeitig die operative Spec für die KI. Claude liest zu Session-Beginn eine definierte Dateiliste, bekommt dadurch vollständigen Arbeitskontext, und führt dann Protokolle aus — Pre-Code-Gates, Abschluss-Rituale, Backlog-Pflege.

In dieser Session haben wir das Tracking-System grundlegend restrukturiert: 6 verstreute Issue-Dateien wurden zu einem Unified Flat Backlog konsolidiert. Dazu wurden Workflow-Kochbücher und Intake-Protokolle gebaut.

**Ich suche:** Architekturkritik. Was sehe ich nicht? Wo bricht dieses System? Was optimiere ich am Falschen?

---

## 2. Projektkontext

### 2.1 Das Projekt

- **Produkt:** Finanzwesir 2.0 — Ghost.io-basierter Finanzblog mit eingebetteter Chart-Engine
- **Tech-Stack:**
  - Ghost CMS als "dummes" CMS (kein Templating-Overhead, kein API-Call zur KI)
  - 100% client-side JavaScript, kein Backend, kein Build-Step, kein npm run
  - Chart.js + 5-Layer custom engine (Vault/Manager/Strategies/Curator/Face)
  - Tailwind CSS (production build <30 KB geplant), eine screen.css als SSOT
- **Entwicklungsumgebung:** Live-Server auf lokalem HTML, manuelle Tests, kein CI/CD
- **Team:** 1 Person (nicht-Vollzeit) + Claude Sonnet 4.x als primärer Entwicklungspartner

### 2.2 Das Kollaborationsmodell

Das Projekt arbeitet mit einem **dokumentenbasierten AI-Kollaborationsmodell**. Es gibt keine spezielle Integration, kein MCP-Server, keine Toolchain. Die KI liest Markdown-Dateien und schreibt Markdown-Dateien. Das ist bewusst so.

**Session-Beginn (Pflicht, every time):**
```
1. PROJECT-STATUS.md lesen     → Fokus, Blocker, letzter Stand
2. NAVIGATION.md lesen         → Routing: welche Dateien sind relevant?
3. BACKLOG.md lesen            → Was ist offen? Prio? Deps?
4. ATTEMPT-LOG.json lesen      → Gibt es blockierte Items (attempts >= 2)?
5. Bestätigen: "[Bereich X] Aufgabe [Y], Routing: [Z]."
```

**Division of Labor:**
- Claude: strukturiert, implementiert Code, schreibt Doku, führt Protokolle aus, pflegt Backlog
- Albert: validiert Pläne ("OK" oder Korrektur), testet manuell, committet in Git, trifft Architekturentscheidungen

**CLAUDE.md** ist nicht eine klassische README — sie ist ein **Verhaltensvertrag**. Sie definiert:
- Pre-Code-Gate (7 Pflichtfragen vor jedem Code-Change, sichtbar im Chat)
- Abbruchkriterien (8 Trigger für "stop and replan")
- Pflicht-Protokolle (Session-Start, Neue Aufgabe, Abschluss-Ritual)
- Tabu-Zonen (Layer 1 des Chart-Engine-Codes ohne explizite Freigabe nicht anfassen)
- Regelaufnahme-Schutz (neue CLAUDE.md-Regeln nur nach 7 definierten Bedingungen)

---

## 3. Das Problem, das wir gelöst haben

### 3.1 Ausgangslage: 6 verstreute Tracking-Dateien

| Datei | Domain | Symptom |
|-------|--------|---------|
| `docs/steering/engine/KNOWN-ISSUES-SCHLACHTPLAN.md` | Chart-Engine | 900+ Zeilen, ~1.800 Tokens — wurde **jede Session vollständig geladen** |
| `docs/steering/engine/KNOWN-ISSUES.md` | Chart-Engine | Duplikat-Summary des Schlachtplans, immer leicht veraltet |
| `docs/steering/design/DESIGN-SYSTEM-ISSUES.md` | Design/CSS | Separate Datei, keine Verlinkung zu Engine-Issues |
| `docs/steering/theme-build/THEME-ASSEMBLY-CHECKLIST.md` | Theme | Gemischte Checkliste + offene Issues, kein Prio-Ranking |
| `Apps/[App-Name]/` | Apps | Pro-App-Backlog ohne zentralen Überblick |
| `docs/steering/ISSUE-TEMPLATE.md` | Alle | Template, kein echter Backlog |

**Konkrete Failure-Modes der alten Struktur:**
- **Keine cross-domain Dependency-Sicht:** CSS-5 blockiert TH-03 blockiert TH-04A/B blockiert TH-05. Diese Kette war nicht erkennbar ohne alle Dateien zu lesen.
- **Token-Overhead:** ~1.800 Tokens Kontext-Last pro Session allein für den Schlachtplan. Bei einem Context-Window von ~200k ist das zwar kein hard limit — aber es akkumuliert mit dem Rest der Pflichtlektüre.
- **Keine Prioritäts-Konsistenz:** Verschiedene Dateien verwendeten verschiedene Prio-Schemas.
- **KI-Kontext-Fragmentierung:** Claude musste mehrere Dateien traversieren, um die nächste Aufgabe zu finden. Das erhöht die Wahrscheinlichkeit, dass ein AP übersehen wird.
- **Neue Aufgaben wurden ad-hoc eingetragen** — kein Intake-Protokoll, kein Preview-Gate.

---

## 4. Die Lösung: Unified Flat Backlog

### 4.1 Kernarchitektur

**Ein `BACKLOG.md` für alle Domains.** Alle offenen Arbeitspakete in einer Tabelle, nach Priorität sortiert. Domain erkennbar über ID-Präfix:

| Präfix | Domain | Beispiel |
|--------|--------|---------|
| AP-N | Chart-Engine | AP-19, AP-20/21 |
| CSS-N | CSS | CSS-5, CSS-6 |
| DS-N | Design-System | DS-003, DS-004 |
| TH-N | Theme-Build | TH-03, TH-04A |
| CL-N | Cleanup | CL-01, CL-02 |
| APP-N | App (neu) | APP-01, APP-02 |

**Tabellenformat:**
```
| ID    | Bereich | Titel                   | Prio | Dep        | Detail                      |
|-------|---------|-------------------------|------|------------|-----------------------------|
| CL-01 | Cleanup | Git-Repo-Ort entscheiden| H    | —          | —                           |
| AP-19 | Engine  | PERIOD_TABLES DRY-Refactoring | M | AP-18 ✅ | engine/detail/AP-19-DETAIL.md |
```

Drei Sektionen: `🟡 Aktiv` / `⬜ Offen – Pre-Launch` / `📋 Post-Launch`.

**Aktueller Stand:** 22 Items, 6 Domains, alles in einer Datei. BACKLOG.md als Session-Context: ~100 Tokens.

### 4.2 Architektur-Entscheidungen und ihre Begründungen

**Entscheidung A: Flat statt hierarchisch (keine Epics/Stories)**

Abgelehnte Alternative: Epics → Stories → Tasks-Hierarchie.

Begründung: Hierarchische Systeme erzeugen AI-Traversal-Overhead (mehr Dateien lesen) und Maintenance-Overhead (Sync der Hierarchie-Ebenen). Bei 1 Person und max. 40 simultanen Items bringt die Hierarchie keinen Mehrwert — sie kostet nur.

Trade-off: Bei zunehmender Komplexität oder mehreren parallelen Workstreams wird diese Entscheidung brüchig. Bruchpunkt liegt vermutlich bei ~80–100 simultanen Items oder bei 3+ parallelen Entwicklern.

**Entscheidung B: Sofortige Archivierung (kein Akkumulation)**

Abgeschlossene Items werden im Abschluss-Ritual sofort nach `BACKLOG-ARCHIV.md` verschoben und aus `BACKLOG.md` gelöscht. Keine ✅-Zeilen, die sich akkumulieren.

Begründung: Token-Budget bleibt dauerhaft stabil, unabhängig von Projektlaufzeit. BACKLOG.md bleibt bei ~50 Zeilen, egal ob das Projekt 3 Monate oder 3 Jahre läuft.

**Entscheidung C: Detail-Files für komplexe APs**

Einfache Aufgaben: vollständig in der BACKLOG-Zeile beschreibbar.  
Komplexe Aufgaben (Code-Spec, Testmatrix, Lösungsvorschlag mit BEFORE/AFTER-Code): eigene Datei in `docs/steering/engine/detail/AP-N-DETAIL.md`.

BACKLOG.md verlinkt auf Detail-Files — wird nur geladen, wenn diese AP aktiv ist. Beispiel AP-20-DETAIL.md enthält: Root-Cause-Analyse, Task-Reihenfolge, exakten Code-Diff, 5 Referenz-CSVs mit erwarteten Testresultaten.

**Entscheidung D: Thin-Redirect Pattern für alte Dateien**

Alte Dateien werden nicht gelöscht. `KNOWN-ISSUES.md` (früher: 200 Zeilen Summary) enthält jetzt:
```markdown
# KNOWN-ISSUES – Finanzwesir 2.0
Diese Datei wurde durch `docs/steering/BACKLOG.md` ersetzt.
Alle offenen Engine-APs sind dort nach Priorität gelistet.
Detail-Specs: `docs/steering/engine/detail/`
Abgeschlossene APs: `docs/steering/engine/KNOWN-ISSUES-ARCHIV.md`
```

Begründung: Discoverability erhalten. Wer eine alte Referenz folgt oder sucht, landet trotzdem korrekt. Harter Delete würde externe Referenzen und Muscle-Memory brechen — ohne Mehrwert.

**Entscheidung E: BACKLOG-PROMPT.md als Session-Starter**

Eine einzelne Datei, die Albert als erste Nachricht in jeden neuen Chat-Faden kopiert. Inhalt: Lesereihenfolge (4 Schritte), Aufgaben-Ablauf (5 Schritte inkl. Abschluss-Ritual), Regeln (6 Bullet Points). ~400 Tokens.

Begründung: Claude bekommt den gesamten operativen Kontext in 400 Tokens statt ~2.000 Tokens Schlachtplan. Das ist ein 5x-Faktor auf dem Session-Opener allein.

### 4.3 Workflow-Protokolle (parallel entwickelt)

**WORKFLOW.md** — Kochbuch für 6 Situationen:
1. Wiedereinstieg nach Pause (3 Dateien lesen → AP wählen → neuen Faden öffnen)
2. AP abarbeiten (Plan → OK → Pre-Code-Gate → Code → Test → Abschluss-Ritual)
3. Neue Aufgabe entdeckt (während laufendem AP)
4. Neue App entwickeln (iterativer Planungsprozess)
5. Blockiert (2 Versuche gescheitert → ATTEMPT-LOG → Abbruch-Protokoll)
6. App-Arbeit (Pflicht-Security-Check vor Code)

**NEUE-AUFGABEN.md** — Intake-Protokoll für 2 Situationen:

*Situation 1: Einzelidee*  
Trigger: `"Neue Aufgabe: [1 Satz]"`  
Claude führt 6-Fragen-Protokoll durch (Bereich, Problem, Symptom, Priorität, Abhängigkeiten, Detail-File nötig?), zeigt Preview-Tabelle im Chat. Erst nach Alberts "OK" schreibt Claude in BACKLOG.md.

*Situation 2: Whiteboard-Phase abgeschlossen*  
Trigger: `"Jetzt zerlegen."`  
Claude inventarisiert die bisherige Konversation (alle Aufgaben-Kandidaten), trennt "eigenständig testbar" von "Unter-Schritt", strukturiert pro Kandidat (Domain/Titel/Prio/Dep), zeigt vollständige Preview-Liste im Chat. Albert reviewed (streichen, korrigieren, zusammenführen, teilen). Erst nach "OK" schreibt Claude in BACKLOG.md.

**Explorations-Modus (explizit definiert):**  
Während neuer App-Planung oder Konzept-Diskussion schreibt Claude NICHTS in BACKLOG.md. Die Konversation ist das Whiteboard. Trigger für den Übergang ist explizit: Albert muss "Jetzt zerlegen" sagen. Ohne diesen Trigger: kein Schreiben.

---

## 5. Review-Fragen

Das sind die Fragen, für die ich das kritischste Feedback suche. Keine höflichen Antworten.

### F1: Token-Ökonomie als Design-Ziel

Die Kern-These: Ein AI-Kollaborationssystem sollte auf Token-Budget pro Session optimieren, weil es den Kontext-Overhead begrenzt und die Qualität der AI-Arbeit über lange Projektlaufzeiten stabil hält.

BACKLOG.md ~100 Tokens/Session vs. alter Schlachtplan ~1.800 Tokens = 18x-Faktor.

**Ist Token-Ökonomie das richtige Optimierungsziel?** Oder gibt es etwas Wichtigeres, das ich dabei vernachlässige? Was kostet mich ein zu kleines BACKLOG-Entry, wenn der Kontext fehlt?

### F2: Flat Backlog — Bruchpunkt

Wir haben uns bewusst gegen Epics/Stories-Hierarchie entschieden. Alle 22 Items sind gleichrangige Zeilen mit einer Dep-Spalte.

**Wo bricht dieses Modell?** Bei welcher Itemzahl, Komplexitätstiefe oder Teamgröße versagt ein flat Backlog zuverlässig? Gibt es Projekttypen, bei denen es generell ungeeignet ist?

### F3: CLAUDE.md als Verhaltensvertrag — bekannte Grenzen

Das Modell: Eine Markdown-Datei definiert das Verhalten der KI. Pre-Code-Gates, Abbruchkriterien, Pflicht-Protokolle, Tabu-Zonen. Claude liest die Datei zu Session-Beginn und hält sich daran.

Das funktioniert — bis es nicht mehr funktioniert. LLMs haben keinen persistenten State. Jede Session ist ein frischer Kontext. Die Verhaltensregeln müssen jedes Mal neu ingestiert werden.

**Bekannte Failure-Modes dieses Patterns:**
- Regeln die zu lang/komplex sind, werden selektiv ignoriert
- Widersprüche zwischen Regeln werden ohne Hinweis "aufgelöst" (KI wählt still)
- Regeln ohne Enforcement-Mechanismus werden unter Zeitdruck wegoptimiert

**Was fehlt in dieser Liste? Welche Failure-Modes sehe ich nicht?** Gibt es robustere Patterns für AI-Verhaltensverträge in laufenden Projekten?

### F4: Explorations-Modus — Determinismus

Der Zerlegungs-Protokoll-Ansatz setzt voraus, dass Claude aus einer freien Konversation (Whiteboard-Phase) zuverlässig diskrete, testbare Arbeitspakete extrahiert.

**Wie deterministisch ist das?** Gleiche Konversation, zweimal zerlegt — bekomme ich dieselbe Liste? Was sind die Failure-Modes bei der Extraktion (falsche Granularität, übersehene Abhängigkeiten, aus Architekturentscheidungen werden Tasks gemacht)?

### F5: Ritual-Atomizität

Das Abschluss-Ritual hat 5 Schritte:
1. BACKLOG.md: Zeile auf ✅
2. BACKLOG-ARCHIV.md: Zeile anhängen
3. BACKLOG.md: Zeile löschen
4. WORKING-FEATURES.md aktualisieren (nur Engine-APs)
5. Commit-Message liefern

Wenn ein Ritual abgebrochen wird (Session-Timeout, Albert schließt den Chat, KI-Fehler), gibt es keinen Recovery-Path. Der Zustand ist dann inkonsistent: ein AP ist in BACKLOG.md als ✅ markiert, aber nicht in BACKLOG-ARCHIV.md.

**Wie robust ist ein nicht-atomares Ritual in einem menschlich-geführten Prozess?** Brauche ich einen expliziten Recovery-Path? Oder ist die Fehlerrate gering genug, dass ein manueller Fix realistisch ist?

### F6: Single Source of Truth — Brüchigkeit bei Parallelarbeit

Claude vergibt IDs selbst: "nächste freie Nummer im Bereich". Das funktioniert solange ein Chat-Faden zur Zeit aktiv ist. Ein Faden = eine Aufgabe ist eine explizite Regel.

**Realistisches Szenario:** Albert öffnet zwei Chat-Fenster parallel (z.B. eines für Code, eines für Content). Beide Claude-Instanzen lesen BACKLOG.md, beide vergeben AP-24 für eine neue Aufgabe.

Ist die "1 Faden = 1 Aufgabe"-Regel eine ausreichende Gegenmassnahme? Oder brauche ich einen anderen ID-Vergabe-Mechanismus?

### F7: ATTEMPT-LOG.json als Blockierungs-Detektor

Bei jedem gescheiterten Fix-Versuch schreibt Claude in `.claude/ATTEMPT-LOG.json`:
```json
"issue-kurz": {
  "attempts": 2,
  "status": "BLOCKED",
  "last_hypothesis": "...",
  "files_touched": ["Datei.js"]
}
```

Bei `attempts >= 2` und `status: BLOCKED`: Session-Start triggert automatischen Abbruch. Kein weiterer Fix-Versuch ohne Alberts explizite Freigabe.

**Ist JSON als Format für diesen Zweck sinnvoll, wenn Claude es schreibt?** Was sind die Risiken, wenn Claude sich beim Schreiben von ATTEMPT-LOG.json verschreibt oder ein Eintrag falsch formatiert ist?

---

## 6. Was wir NICHT brauchen

Damit das Review fokussiert bleibt:

- **Kein Tool-Wechsel:** Keine Empfehlungen für Jira, Linear, Notion, GitHub Projects. Das System lebt in Markdown-Dateien — das ist Constraint, keine Präferenz. Grund: AI-lesbar, versionierbar, kein Vendor-Lock-in, offline-fähig.
- **Kein Tech-Stack-Critique:** Ghost.io, Chart.js, kein Build-Step — alles gesetzte Constraints.
- **Kein "schöner machen" ohne Begründung:** Kosmetische Vorschläge ohne strukturellen Mehrwert sind nicht hilfreich.
- **Kein Scope Creep:** Es geht um das Projektverwaltungssystem, nicht um die Chart-Engine-Implementierung selbst.

---

## 7. Dateiliste zum Hochladen

Diese Dateien solltest du zum Review-Brief hochladen — in dieser Reihenfolge, von wichtig nach nachgelagert:

### Pflicht (für kompetente Antworten auf alle 7 Fragen)

| Datei | Pfad | Warum |
|-------|------|-------|
| `CLAUDE.md` | `.claude/CLAUDE.md` | Der Verhaltensvertrag. Zentral für F3, F4, F5. |
| `BACKLOG.md` | `docs/steering/BACKLOG.md` | Die neue Zentrale. Zeigt Struktur, IDs, Deps. |
| `BACKLOG-PROMPT.md` | `docs/steering/BACKLOG-PROMPT.md` | Session-Starter. Zeigt wie eine Session beginnt. |
| `WORKFLOW.md` | `WORKFLOW.md` | Kochbuch. Zeigt Abschluss-Ritual und Entscheidungsbaum. |
| `NEUE-AUFGABEN.md` | `NEUE-AUFGABEN.md` | Intake-Protokoll. Zeigt Zerlegungs-Protokoll (F4). |

### Kontext (für tieferes Verständnis)

| Datei | Pfad | Warum |
|-------|------|-------|
| `NAVIGATION.md` | `NAVIGATION.md` | Routing-System. Zeigt wie die Dateien zusammenhängen. |
| `PROJECT-STATUS.md` | `PROJECT-STATUS.md` | Aktueller Stand. Zeigt Projektkomplexität. |
| `AP-20-DETAIL.md` | `docs/steering/engine/detail/AP-20-DETAIL.md` | Beispiel Detail-File. Zeigt Tiefe der technischen Dokumentation (F1). |
| `DEFINITION-OF-DONE.md` | `docs/steering/DEFINITION-OF-DONE.md` | Fertig-Kriterien. Zeigt wie DoD und Abschluss-Ritual zusammenhängen. |

### Optional (für Vergleich alt vs. neu)

| Datei | Pfad | Warum |
|-------|------|-------|
| `KNOWN-ISSUES.md` (Thin-Redirect) | `docs/steering/engine/KNOWN-ISSUES.md` | Zeigt Thin-Redirect-Pattern (Entscheidung D). |
| `BACKLOG-ARCHIV.md` | `docs/steering/BACKLOG-ARCHIV.md` | Zeigt Archiv-Struktur (noch leer — das ist der Punkt). |

### Nicht hochladen

- Chart-Engine-Sourcecode (`Theme/assets/js/`) — zu groß, nicht review-relevant
- `KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` — 900+ Zeilen Historienarchiv, würde überfluten
- `Active Campaign Liste/` — sensible E-Mail-Daten, niemals
- `.claude/ATTEMPT-LOG.json` — aktuell leer, kein Mehrwert

---

## 8. Hintergrund-These (zum Diskutieren)

Das hier ist kein Standard-Projektmanagement. Es ist der Versuch, **AI-Kontext als primäres Produktionsgut zu managen** — ähnlich wie in der klassischen Softwareentwicklung RAM oder CPU-Zyklen gemanagt werden.

Jede Datei die Claude zu Session-Beginn liest kostet Tokens. Jede CLAUDE.md-Regel kostet Aufmerksamkeit (Attention Budget). Jede schlecht strukturierte Aufgabe kostet Iterationen.

Die Hypothese: Ein gut strukturiertes AI-Kollaborationssystem sieht nicht wie ein klassisches Projektmanagement-System aus — es sieht aus wie ein **Betriebssystem für die KI**: Minimaler Kontext-Overhead, eindeutige State-Maschine, atomare Operationen, Recovery-Paths.

Bin ich auf dem richtigen Weg? Oder ist das Over-Engineering für ein 1-Personen-Projekt?
