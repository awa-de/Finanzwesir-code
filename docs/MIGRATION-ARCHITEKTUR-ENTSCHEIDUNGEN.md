# Architekturentscheidungen: Migration zur neuen Projektstruktur

**Autor:** Claude (Senior-Architekt-Rolle) | **Datum:** 2026-05-02
**Adressat:** Albert Warnecke (Projektinhaber / de-facto CTO)
**Zweck:** Begründung aller Entscheidungen im Übergabeprompt-Phase6.md

---

## Das Problem, das wir lösen

Diese Struktur ist nicht schlecht — sie ist *überholt*. Sie wurde für eine Maschine gebaut
(Chart-Engine), als es noch kein Theme gab, keine Apps, keinen Redaktions-Workflow.
Dann kam das Theme dazu, und die Docs zogen in `Theme/docs/` ein — logisch zu dem Zeitpunkt.
Dann kamen Apps. Jetzt haben wir drei Maschinen, die alle dasselbe Wissen brauchen
(Design-System, CSS-Konventionen, Specs), aber das Wissen lebt in Maschine 1.

Das ist technische Schuld durch Wachstum, nicht durch schlechtes Design.
Der richtige Zeitpunkt zum Beheben ist jetzt — bevor App-Bau beginnt.

---

## Leitprinzip

> **Das Wissen gehört dem Projekt, nicht einer seiner Maschinen.**

Jede andere Entscheidung folgt aus diesem Satz.

---

## Entscheidungen im Detail

### 1. `docs/` am Projektroot statt unter `Theme/`

**Entschieden:** Alle Docs raus aus `Theme/`, zentrale `docs/` am Projektroot.

**Warum:** Das Design-System wird von `Theme/` UND von `Apps/` gebraucht. Die CSS-Konventionen
definieren Klassen-Naming — das gilt für jeden Button in jedem App-HTML. Die Chart-Engine-Specs
werden gebraucht wenn die Engine in eine App eingebettet wird.

Solange Docs unter `Theme/` leben, ist `Theme/` nicht nur ein Ghost-Theme — es ist ein
verstecktes Wissens-Repository. Das bricht das Single-Responsibility-Prinzip auf Verzeichnisebene.

**Was ich nicht gemacht habe:** Separate `docs/` unter jeder Maschine
(`Theme/docs/`, `Apps/docs/`). Das wäre DRY-Verletzung: CSS-Konventionen müssten in
beiden referenziert werden. Ein Update an einer Stelle → zwei Stellen veralten.

**Analogie:** Bei Google/Meta leben Service-Specs nicht unter dem Service-Verzeichnis,
sondern in einem zentralen Knowledge-Repo. Der Service-Code bleibt schlank.

---

### 2. `steering/` statt `context/`

**Entschieden:** Das Tracking-Verzeichnis heißt `docs/steering/`, nicht `docs/context/`.

**Warum:** "Context" ist zu vage — alles ist Kontext. Ein neues LLM das den Ordnernamen sieht,
weiß nicht was es dort findet. "Steering" ist funktional: es beschreibt was das Verzeichnis
*tut*. Es steuert. Hier liegen offene Issues, Tracking-Tabellen, Entscheidungsprotokolle —
alles was ein Projekt in Bewegung hält.

Namen sind Verträge. Ein guter Name macht Dokumentation überflüssig.

**Verworfen:** `tracking/`, `ops/`, `control/`, `management/`. Zu eng, zu IT-lastig, falsche Konnotation.

---

### 3. `engine/`, `design/`, `theme-build/` als Sub-Verzeichnisse

**Entschieden:** Drei Unterordner in `steering/` statt einer flachen Liste.

**Warum:** Die alten 9 Dateien in `context/` hatten keine erkennbare Gruppierung.
Ein LLM das einen Chart-Engine-Bug fixen soll, musste an `CSS-KONVENTIONEN.md` und
`DESIGN-SYSTEM-ISSUES.md` vorbeiscrollen. Das ist kognitiver Overhead — für das LLM
(Token-Verschwendung beim Directory-Scan) und für Albert (mentale Karte muss manuell
gepflegt werden).

Die drei Gruppen spiegeln die drei Aktivitätsmuster des Projekts:
- `engine/` — der komplexeste, am häufigsten geänderte Bereich
- `design/` — cross-cutting, relevant für Theme *und* Apps
- `theme-build/` — sequenziell, einmalig pro Release-Zyklus

**Granularitätsregel:** Nicht feiner unterteilen als nötig. Drei Gruppen decken alle
aktuellen Fälle ab. Die Regel: erst abstrahieren wenn dasselbe Muster dreimal auftritt.
Jetzt gibt es drei Gruppen — das ist die richtige Granularität für heute.

---

### 4. `Content-Workflow/` → `docs/editorial/`

**Entschieden:** Umbenennung und Einordnung unter `docs/`.

**Warum:** Konsistenz schlägt Vertrautheit. Wenn das Verzeichnis-Schema lautet
`docs/steering/`, `docs/spec/`, `docs/design-system/` — dann ist `Content-Workflow/` an
der Projektwurzel ein Ausreißer. Es ist eine Dokumentation, kein Code.
Der neue Name `editorial/` beschreibt den Inhalt präziser (es ist ein redaktioneller Prozess)
und folgt dem Schema.

**Was ich nicht gemacht habe:** Den Ordner einfach nach `docs/content-workflow/` verschieben.
Das hätte die Inkonsistenz nur verschoben. Wenn man schon umbaut, baut man richtig um.

---

### 5. `.git` bleibt in `Theme/` — kein neues Repo am Projektroot

**Entschieden:** `.git` verbleibt in `Theme/`. Kein `git init` am Projektroot.

**Warum — und das ist die wichtigste "Nicht-Entscheidung":**

`.git` in `Theme/` trackt genau das was zu Ghost deployed wird. Das ist *korrekte Scope-Definition*.
Git ist hier ein Delivery-Tool, kein Projekt-Archiv-Tool.

Wenn wir `.git` nach Projektroot verschieben, entstehen sofort drei Probleme:

1. **Historische Pfade brechen.** Alle commits referenzieren Pfade relativ zu `Theme/`
   (z.B. `assets/js/fw-chart-engine/core/FwSmartXAxis.js`). Nach dem Verschieben
   zeigt `git log` diese Dateien als "deleted" und neue gleichnamige als "added".
   Die Geschichte — AP-1 bis AP-18, alle Spec-Commits — ist nicht mehr navigierbar.

2. **Scope-Drift.** Git am Root würde `Active Campaign Liste/`, `Archiv/`, `Datenquellen/`
   in seinen Sichtbereich bekommen. Dann brauchen wir ein komplexes `.gitignore`
   das diese Ordner ausschließt. Jeder neue Ordner muss bewusst gitignored werden.
   Das ist ein Wartungsproblem das wächst.

3. **Die 2-Repo-Frage ist noch offen.** Gibt es ein Repo für Code (Theme) und ein
   separates für Content (Artikel)? Diese Entscheidung ist noch nicht getroffen.
   Ein voreiliges `git init` am Root würde eine Option verbauen.

**Grundsatz:** Irreversible Entscheidungen nicht treffen wenn reversible Optionen noch offen sind.
`.git` an seinem Platz zu lassen ist reversibel. Es nach Root zu verschieben ist es nicht
(ohne History-Verlust oder komplexe Git-Chirurgie).

---

### 6. `.claude/` Migration als Schritt 1 — der wichtigste Einzelschritt

**Entschieden:** `.claude/` zuerst verschieben, vor allem anderen.

**Warum:** CLAUDE.md liegt in `Theme/.claude/CLAUDE.md`. Claude Code läuft vom Projektroot.
Das bedeutet: eine 11 KB Arbeitsanleitung — Layer-Architektur, Tabu-Bereiche, UX-Kriterien,
Code-Stil — wird in *jeder* Session ignoriert. Das LLM arbeitet ohne Standing Orders.

Ein CLAUDE.md das nicht geladen wird ist schlimmer als kein CLAUDE.md: Es erzeugt falsche
Sicherheit. Albert denkt die Regeln gelten. Sie gelten nicht.

Risiko des Schritts: minimal (Verzeichnis verschieben).
Wert: maximal (wirkt ab der nächsten Session sofort).

Das ist die Definition von "zuerst machen".

---

### 7. CLAUDE.md erweitern, nicht neu schreiben

**Entschieden:** Zwei Sektionen hinzufügen (Abschluss-Ritual + Commit-Template),
bestehenden Inhalt unangetastet lassen.

**Warum:** Die bestehende CLAUDE.md ist 11 KB gut destilliertes Wissen:
5-Layer-Architektur, Tabu-Zonen mit Begründungen, UX-Referenzen (Tufte, Krug, Nielsen),
Code-Stil-Regeln. Das ist das Ergebnis von Monaten Arbeit und Fehler-Lernen.

Neuschreiben bedeutet: dieses Wissen geht durch Filterprozesse die Nuancen verlieren.
Der Unterschied zwischen "Layer 1 nicht anfassen" und "Layer 1 NIEMALS ohne explizite
Begründung und Rückfrage anfassen" ist klein im Text, groß im Verhalten.

**Open-Closed-Prinzip:** Offen für Erweiterung, geschlossen für Modifikation.
Die zwei neuen Sektionen fügen Verhalten hinzu, sie ersetzen nichts.

**Was ich nicht gemacht habe:** Separate CLAUDE.md-Dateien pro Maschine
(`Theme/CLAUDE.md`, `Apps/CLAUDE.md`). Das wäre das richtige Muster bei einem Team
mit mehreren Entwicklern auf mehreren Services. Bei einem Einpersonen-Projekt mit einem LLM
das den Gesamtkontext hält, ist eine CLAUDE.md mit Sektionen effizienter. Der Overhead
des Multi-File-Systems (welche Datei gilt gerade? in welchem Verzeichnis starte ich?)
überwiegt den Nutzen.

Dieser Punkt wird revisitiert wenn App-Entwicklung ernsthaft beginnt.

---

### 8. Abschluss-Ritual in CLAUDE.md, nicht in Memory

**Entschieden:** Das 5-Schritte-Ritual gehört in CLAUDE.md, nicht in MEMORY.md.

**Warum — und das ist ein wichtiger Architekturunterschiede zwischen den zwei Systemen:**

Memory speichert *Wissen*: was entschieden wurde, warum, welche Patterns existieren.
CLAUDE.md speichert *Verhalten*: wie gearbeitet wird, was immer zu tun ist.

Das Abschluss-Ritual ist kein Wissen — es ist eine Verhaltensinstruktion.
Wenn es in Memory liegt, "weiß" das LLM davon. Das bedeutet nicht dass es es tut.
Wenn es in CLAUDE.md liegt, ist es eine Regel. Regeln werden ausgeführt.

Der Unterschied: "Ich weiß dass nach einer Session aufgeräumt werden sollte"
vs. "Nach jeder Session räume ich auf — das ist nicht optional."

Die alte Theme-Memory hatte das Ritual korrekt identifiziert aber falsch abgelegt
(unter "Arbeitsmodell" in MEMORY.md). Das erklärte warum es nicht konsequent ausgeführt wurde.

---

### 9. NAVIGATION.md am Projektroot — nicht unter `docs/`

**Entschieden:** NAVIGATION.md bleibt an der Projektwurzel.

**Warum:** Eine Karte gehört zum Eingang, nicht ins Innere des Geländes.
Wenn NAVIGATION.md unter `docs/` läge, müsste ein neues LLM bereits wissen,
dass es unter `docs/` nachschauen soll — bevor es navigieren kann. Zirkelschluss.

Der Root ist der einzige Ort, den ein LLM ohne Vorkenntnisse als erstes sieht.
NAVIGATION.md ist keine Dokumentation über das Projekt — es ist der Dispatcher.
Es hat eine andere Qualität als der Rest der Docs.

---

### 10. Neun Schritte in dieser Reihenfolge

**Entschieden:** .claude/ → .gitignore → Struktur anlegen → Dateien verschieben → CLAUDE.md → NAVIGATION.md → Archivieren.

**Warum diese Sequenz:**

Die Reihenfolge folgt einer Abhängigkeitskette:

```
.claude/ verschieben     → unabhängig, höchster Wert, zuerst
.gitignore anlegen       → unabhängig, Infrastruktur
docs/ Struktur anlegen   → Voraussetzung für Schritt 4–6
Dateien verschieben      → erst wenn Zielstruktur existiert
CLAUDE.md erweitern      → erst wenn .claude/ am richtigen Ort
NAVIGATION.md updaten    → erst wenn Dateien an neuen Orten
Archivieren              → letzter Schritt, Cleanup
```

Dateien in nicht-existente Verzeichnisse verschieben schlägt fehl.
Pfade in NAVIGATION.md updaten bevor Dateien verschoben sind erzeugt inkonsistenten Zustand.

---

## Was bewusst NICHT gemacht wurde

### A. `fw-chart-engine/` als Top-Level-Verzeichnis herauslösen

Die Aufräum-Analyse hat das korrekt identifiziert: die Chart-Engine gehört konzeptionell
nicht unter ein CSS-Theme. Sie ist ein eigenständiges Produkt.

**Warum nicht jetzt:** Das ist eine *Code*-Migration, keine *Docs*-Migration.
Dateien verschieben ist eine Sache. Code-Pfade, Import-Statements, Script-Tags in
Test-HTMLs, Referenzen in Specs — das sind 50+ Touchpoints die alle gleichzeitig
geändert werden müssen und getestet werden müssen.

Diese Migration ist docs-only. Code-Restrukturierung ist eine eigene Phase
(nach dem Theme-Deploy, nicht davor).

### B. Basis/Prompts/ in .claude/ mergen

Fünf Dateien (CONTENT_GUIDE, LLM_INSTRUCTIONS, OUTPUT_SPECS, PROJECT_CORE, SOURCES).
Laut letzter Einschätzung: ~80% aktuell, ~20% veraltet.

**Warum nicht jetzt:** Die 20% veralteten Inhalte sind giftig. Veraltete Instruktionen
in CLAUDE.md erzeugen falsches Verhalten das schwer zu diagnostizieren ist.
"Warum macht das LLM das?" — weil eine drei Monate alte Instruktion es so sagt.

Jede der fünf Dateien muss einzeln gelesen und bewertet werden.
Das ist eine eigene Aufgabe mit eigenem Budget. Nicht in eine Migration einbetten.

### C. Neues Git-Repository am Projektroot

Bereits unter Entscheidung 5 erklärt. Zusätzlicher Punkt:

Die Frage "brauchen wir 2 Repos?" ist architektonisch relevant und noch offen.
Ein `git init` am Root wäre eine Vorentscheidung für "1 Repo für alles".
Das kann richtig sein — aber es sollte eine bewusste Entscheidung sein, nicht ein Nebenprodukt.

### D. Komplette CLAUDE.md-Neufassung

Die bestehende CLAUDE.md hat eine Qualität die durch Neufassung nicht verbessert werden kann —
sie hat die *richtigen Narben*. Der Eintrag "FwDateAdapter.startOf ist ein Chart.js-API-Vertrag —
NIEMALS die Semantik ändern" existiert weil jemand diesen Fehler gemacht hat und der Schmerz
dokumentiert wurde. Eine Neufassung verliert genau diese Narben.

Nur addieren. Nicht ersetzen.

### E. Theme/docs/ sofort löschen nach Migration

Nach dem Verschieben aller Docs bleiben leere Verzeichnisse in `Theme/docs/` übrig.
Diese sollten erst nach einer Verifikation gelöscht werden: prüfen ob alle Dateien
tatsächlich am Zielort angekommen sind, und ob Git den Verlust korrekt dokumentiert.

Erst prüfen, dann löschen. Nie umgekehrt.

---

## Risiken und Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|--------|-------------------|------------|
| CLAUDE.md Pfade zeigen nach Migration ins Leere | Mittel | Schritt 8 aktualisiert explizit alle geänderten Pfade |
| `docs/spec/` Pfad-Referenzen in Code brechen | Niedrig | Pfad bleibt `docs/spec/` — relativ zum Root unverändert |
| Live Server bricht weil Theme/ sich ändert | Keine | Theme/-Inhalte (Code, Assets) werden nicht verschoben |
| Git zeigt Theme/docs/ als "deleted" | Sicher | Bewusst akzeptiert — Docs leben in Nextcloud, brauchen kein Git |
| skills/ Inhalt geht beim Verschieben verloren | Niedrig | Expliziter Prüfschritt vor dem Verschieben (Schritt 1) |

---

## Architekturprinzipien die diese Entscheidungen leiten

1. **Single Responsibility** — jedes Verzeichnis hat eine Aufgabe
2. **Open-Closed** — erweitern statt ersetzen wenn möglich
3. **Irreversibilität vermeiden** — reversible Entscheidungen bevorzugen solange Optionen offen sind
4. **Scope-Disziplin** — eine Migration löst ein Problem, nicht drei
5. **Namen sind Verträge** — ein guter Name macht Dokumentation überflüssig
6. **Wert vor Reihenfolge** — höchster Wert zuerst, nicht alphabetisch oder chronologisch
