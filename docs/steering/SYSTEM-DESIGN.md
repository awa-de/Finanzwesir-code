Stand: 2026-05-03 11:30 | Session: Masterplan-B-Teil-Abschluss | Geändert von: Claude

# System-Design: Das Gehirn von Finanzwesir 2.0

Dieses Dokument erklärt Architektur, Workflow und Designentscheidungen des
KI-Kollaborationssystems. Zielgruppe: neue LLMs, die das System verstehen,
erweitern oder anpassen sollen — ohne bestehende Invarianten zu brechen.

---

## 1. Anatomy — Wer macht was?

Das "Gehirn" besteht aus fünf Schichten, die unterschiedliche Zeiträume abdecken:

| Schicht | Datei/Ort | Funktion | Persistenz |
|---------|-----------|----------|------------|
| **Langzeitgedächtnis** | `C:\Users\...\memory\` | User-Profil, Feedback, Projektfakten | Sitzungsübergreifend, automatisch geladen |
| **Verhaltensregeln** | `.claude/CLAUDE.md` | Arbeitsweise, Verbote, Rituale, Pfadreferenzen | Jede Session, vom Framework geladen |
| **Navigation** | `NAVIGATION.md` | Index aller Dokumente, Routing nach Aufgabe | Jede Session, manuell lesen |
| **Steuerung** | `docs/steering/` | Aktueller Projektzustand, offene Issues, Entscheidungen | Aufgaben-spezifisch |
| **Spezifikationen** | `docs/spec/` | Bindende Architektur-Referenz | Bei Implementierungsarbeit |

### docs/steering/ im Detail

```
docs/steering/
├── engine/          ← Chart-Engine-Zustand
│   ├── KNOWN-ISSUES.md              Offene Bugs + APs (primäre Arbeitsliste)
│   ├── KNOWN-ISSUES-PROMPT.md       Komprimierter Kontext für neue Sessions
│   ├── KNOWN-ISSUES-SCHLACHTPLAN.md Tracking-Tabelle + Abhängigkeiten
│   └── WORKING-FEATURES.md          Regressionswächter — was funktioniert
├── design/          ← CSS + Design-System-Regeln
│   ├── CSS-KONVENTIONEN.md          Bindend für alle CSS-Arbeit
│   └── DESIGN-SYSTEM-ISSUES.md      Offene Design-Probleme
├── theme-build/     ← Deploy-Vorbereitung
│   └── THEME-ASSEMBLY-CHECKLIST.md  Schritt-für-Schritt Deploy-Checkliste
├── audits/          ← Qualitätssicherung
│   ├── PERFORMANCE-ANALYSE.md
│   ├── SECURITY-AUDIT.md
│   └── PROMPT-SECURITY-AUDIT.md
└── archiv/          ← Abgeschlossenes, historische Übergaben
```

---

## 2. Workflow — Wie arbeitet das Gehirn?

### Session-Start

```
1. Framework lädt automatisch:
   - memory/MEMORY.md (Langzeitgedächtnis)
   - .claude/CLAUDE.md (Regeln + Pfade)

2. Claude liest NAVIGATION.md
   → Routing: Welche docs/steering/-Datei ist für diese Aufgabe relevant?

3. Claude liest die aufgaben-spezifischen Steering-Dateien
   → Bei Chart-Arbeit: KNOWN-ISSUES-PROMPT.md → KNOWN-ISSUES.md → WORKING-FEATURES.md
   → Bei CSS-Arbeit: CSS-KONVENTIONEN.md → DESIGN-SYSTEM-ISSUES.md
   → Bei Deploy: THEME-ASSEMBLY-CHECKLIST.md
```

### Während der Arbeit

```
Token-Regeln (in CLAUDE.md, §0 + §6):
- Dateien erst lesen wenn konkret gebraucht
- Plan vor Code — immer
- Kleine, abgegrenzte Patches
- Tabu-Bereiche (Layer 1, fwContext, zentrale Zeit-Erkennung) nur mit Begründung anrühren
```

### Session-Ende: Abschluss-Ritual

Trigger: Albert sagt "fertig, finale Phase" (oder sinngemäß).

```
1. docs/spec/       → betroffene Specs aktualisieren
2. docs/steering/engine/ → KNOWN-ISSUES.md + WORKING-FEATURES.md
3. memory/          → MEMORY.md aktualisieren
4. Commit-Message   → im Template-Format (§8 CLAUDE.md)
5. CLAUDE.md        → nur wenn neue fundamentale Regel entstand
```

Das Ritual ist Pflicht, kein Optional. Es stellt sicher, dass das Gehirn
nach jeder Session aktuell bleibt und die nächste Session auf korrektem
Stand beginnt.

---

## 3. Design Decisions — Warum diese Architektur?

### D-01: .claude/ am Projektroot, nicht in Theme/

**Problem:** Claude Code läuft vom Projektroot `Finanzwesir 2.0/`. CLAUDE.md
lag in `Theme/.claude/` und wurde deshalb nie automatisch geladen — ein
stiller Fehler, der jede Session beeinträchtigte.

**Entscheidung:** `.claude/` liegt am Projektroot. Das Framework lädt
CLAUDE.md jetzt zuverlässig.

**Invariante:** `.claude/` darf nicht zurück nach `Theme/` verschoben werden.

---

### D-02: docs/ außerhalb von Theme/

**Problem:** Dokumentation lag in `Theme/docs/`. Ghost-Deploy würde sie
mitdeployen (unnötig, potenziell problematisch). Außerdem vermischte es
Code und Wissen in einem Verzeichnis.

**Entscheidung:** `docs/` liegt am Projektroot. Theme/ ist code-only.
Nextcloud synchronisiert docs/ ohne Git — das reicht für ein
Einpersonen-Projekt.

**Konsequenz:** `Theme/.git` trackt nur Theme-Code. `docs/` braucht kein
eigenes Git.

**Invariante:** Keine Dokumentation zurück nach `Theme/docs/`. Theme/
bleibt code-only.

---

### D-03: Kein Backend, kein Build-Prozess (im Projekt-Root)

**Entscheidung:** Die Chart-Engine ist vollständig client-seitig (Browser-JS,
keine Transpilierung). Tailwind CSS wird erst beim Ghost-Deploy eingebunden,
nicht im Dev-Workflow.

**Warum:** Ghost.io ist das Deployment-Target. Kein eigener Server, kein
CI/CD-System. Komplexität würde keinen Mehrwert bringen.

**Live Server läuft von `Theme/`** — das ist die einzige Infrastruktur.
Diese Konfiguration darf nicht geändert werden.

---

### D-04: Zweistufige Dokumentation (steering/ vs. spec/)

**steering/** = aktueller Zustand, ändert sich laufend (Issues, Checklisten,
Entscheidungen). Wird im Abschluss-Ritual aktualisiert.

**spec/** = bindende Architektur, ändert sich selten. Nur nach bewusster
Architekturentscheidung durch Albert.

**Warum die Trennung?** Ein LLM, das nur spec/ liest, versteht die
Architektur. Ein LLM, das nur steering/ liest, kennt den aktuellen Stand.
Beides zusammen ergibt vollständigen Kontext. Vermischt man sie, verliert
man die Trennschärfe.

---

### D-05: KI-first Dokumentationsdesign

Alle Steering-Dokumente sind so geschrieben, dass sie von einem LLM
effizient gelesen und verarbeitet werden können:
- Klare Hierarchie (Überschriften, Tabellen)
- Kurze Abschnitte mit eindeutigen Funktionen
- Explizite "Lies das zuerst"-Hinweise (KNOWN-ISSUES-PROMPT.md)
- Abschluss-Ritual erzwingt Aktualität

**Warum:** Albert arbeitet allein. LLMs sind der zweite "Mitarbeiter".
Wenn das Gehirn nicht LLM-lesbar ist, ist es nutzlos.

---

### D-06: Was ein LLM NIEMALS eigenständig ändern darf

| Was | Warum |
|-----|-------|
| `Theme/.git` Konfiguration | Trackt Code für Ghost-Deploy |
| `.gitignore` Einträge (besonders `Active Campaign Liste/`) | Sensible E-Mail-Daten — Datenschutz |
| Live-Server-Root (`Theme/`) | Bricht den Dev-Workflow |
| Layer 1 der Chart-Engine (`FinanzwesirData.js`, `CSVParser.js`) | Datenfundament — Fehler hier brechen alle Charts |
| `fwContext`-Grundstruktur | Single Source of Truth für alle Plugins |
| Architekturprinzipien KDR 1–14 in `docs/spec/` | Nur nach expliziter Entscheidung durch Albert |

---

### D-07: Multi-CLAUDE.md — Trigger, nicht jetzt

**Problem:** Wenn `Apps/` echte Implementierungsarbeit erhält, können app-spezifische
Regeln die Root-`CLAUDE.md` aufblähen und projektweite von app-spezifischen Regeln
nicht mehr trennbar machen.

**Entscheidung:** Heute gilt eine einzige Root-`CLAUDE.md` für das gesamte Projekt.
Solange Apps nur Backlog, Prompts oder Mockups sind, ist das richtig und kein Overhead.

Trigger für Prüfung: Wenn `Apps/` eigene dauerhafte Implementierungsarbeit erhält,
wird geprüft, ob `Apps/.claude/CLAUDE.md` nötig ist.

- Root-`CLAUDE.md`: enthält dann nur projektweite Regeln
- `Apps/.claude/CLAUDE.md`: enthält app-spezifische Regeln, Testprotokolle, Tabu-Bereiche

**Invariante:** Keine `Apps/.claude/CLAUDE.md` anlegen, bevor der Trigger ausgelöst hat.
Tracking: AP-DOC-4 in `docs/steering/BACKLOG.md`.

---

### D-08: NAVIGATION.md ist Router, nicht Wissensspeicher

**Problem:** `NAVIGATION.md` wird mit der Zeit mit Begründungen, Checklisten
und Prozessdetails überfrachtet. Dadurch wächst der Token-Verbrauch beim
Session-Start, und der Router verliert seine Navigationsschärfe.

**Entscheidung:** `NAVIGATION.md` enthält ausschließlich:

- Pfade
- Zweck in einem Satz
- Wann lesen?
- Routing nach Aufgabe

`NAVIGATION.md` enthält nicht:

- lange Begründungen
- vollständige Checklisten
- technische Spezifikationen
- Issue-Details
- Prozesshandbücher

Wenn eine Erklärung länger als 10–15 Zeilen wird, gehört sie in eine eigene Datei.

**Invariante:** Jede Ergänzung an `NAVIGATION.md` muss die Frage bestehen:
„Ist das Routing oder Wissen?" — Wissen kommt nicht in den Router.

---

### D-09: Wissen-vs-Verhalten-Ablageregel

**Problem:** Neue Informationen landen in der falschen Datei — Verhaltensregeln in
Spec-Dateien, Architekturwissen in CLAUDE.md, Projektstatus in Spec-Dateien.

**Entscheidung:** Jedes neue Stück Information wird nach dieser Ablageregel eingeordnet:

| Typ | Zieldatei |
| --- | --- |
| Claude-Verhalten, Regeln, Verbote, Rituale | `.claude/CLAUDE.md` |
| Bindende Architektur- und Fachspezifikationen | `docs/spec/` |
| Aktueller Projektzustand, Tracking, Entscheidungen | `docs/steering/` |
| Historisches Material, abgelöste Versionen | `docs/steering/archiv/` |

**Invariante:** Vor jedem neuen Eintrag die Frage: „Welche Ebene gehört dieser Inhalt?"
Keine Doppelablage ohne explizite Begründung.

---

## 4. Erweiterungsrahmen — Wie dieses System wachsen darf

Ein neues LLM, das dieses System erweitern soll, muss:

1. **Zuerst dieses Dokument lesen** — Invarianten kennen bevor Code oder
   Doku angefasst wird.

2. **CLAUDE.md §7 befolgen** — Das Abschluss-Ritual ist kein Vorschlag.
   Es hält das Gehirn aktuell.

3. **Neue Regeln in CLAUDE.md** — Nur wenn universell + verhaltenssteuernd
   + nicht aus bestehendem Code ableitbar. Keine Einzel-Session-Regeln.

4. **Neue Steering-Dokumente** — Immer in `docs/steering/` mit klarer
   Funktion (engine / design / theme-build / audits). Kein Wildwuchs.

5. **Architekturentscheidungen dokumentieren** — Neue D-0x-Einträge in
   diesem Dokument. Begründung immer: Problem → Entscheidung → Invariante.

6. **Albert entscheidet** — Über Architekturänderungen, neue Invarianten,
   Scope-Erweiterungen. Ein LLM schlägt vor, Albert bestätigt.
