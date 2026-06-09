Stand: 2026-06-09 | Session: SKILL-ARCHIV-05 | Geändert von: Claude

# Spezifikation — Skill /archivieren

## Zweck

Der Skill `/archivieren` macht Claude zum Archivsekretär für das Finanzwesir-2.0-Projekt. Er steuert die kontrollierte Überführung von Material aus abgeschlossenen Erkenntnisströmen in die vier Archivstufen: Rohmaterial (`local/`), lokale Archive, Root-Archiv und Making-of.

Der Skill ist kein Aufräumroboter. Er ist ein kuratierender Workflow mit Freigabegates.

Das Archivmodell, auf dem dieser Skill aufbaut, steht vollständig in `docs/steering/ARCHIV-STRATEGIE.md`.

---

## Abgrenzung

### Distill

- **Zweck:** Lerneinträge aus `session-log.md` zu Mustern in `patterns.md` verdichten. Erkenntnisse für zukünftige Sessions extrahieren.
- **Nicht Zweck:** Archivorte entscheiden, Dateien verschieben, historisches Material kuratieren.
- **Abgrenzung zu /archivieren:** Distill arbeitet mit dem lebenden Lernstrom. Archivieren arbeitet mit abgeschlossenem, abgekühltem Material.

### Kassensturz

- **Zweck:** Wöchentlicher Trend-Check — AP-Entwicklung, Blocker, Projekttendenz.
- **Nicht Zweck:** Historisches Material kuratieren oder archivieren.
- **Abgrenzung zu /archivieren:** Kassensturz zeigt den Projektzustand jetzt. Archivieren schützt die Geschichte.

### Abschluss-Ritual

- **Zweck:** AP sauber abschließen — Logs, Status, Backlog, Memory, Commit-Message.
- **Nicht Zweck:** Archiv-Kuratierung unter vollem Tokenfenster.
- **Abgrenzung zu /archivieren:** Das Abschluss-Ritual ist bereits tokenintensiv. Archivierungsaufgaben gehören in einen eigenen Arbeitsmodus, nicht als Anhang an das Ritual. Beide Skills sind sequenziell einsetzbar, nicht verschachtelt.

### /archivieren

- **Zweck:** Material aus abgeschlossenen Erkenntnisströmen kontrolliert in `local/`, lokale Archive, Root-Archiv oder Making-of überführen. Klassifizieren, vorschlagen, freigeben lassen, umsetzen. Transparenz über was nicht übernommen wird.

---

## Trigger

**Albert löst aus:**
- `/archivieren` (direkt)
- `das ist archivierungswürdig`
- `sichere diese Erkenntnisreise`
- `das soll ins Making-of`
- oder sinngemäß ähnliche Formulierungen

**Claude darf vorschlagen, wenn Albert Archivwürdigkeit erwähnt oder eindeutig Rohmaterial bzw. Belegmaterial entstanden ist:**
- Albert hat im aktuellen Faden explizit auf historisches Material, Peer Reviews oder eine Erkenntnisreise hingewiesen
- Im AP ist nachweislich kuratierungswürdiges Belegmaterial entstanden (Gate-Report, Peer Review, Architekturentscheidung)
- Im AP ist nachweislich Rohmaterial entstanden (vollständiger Chat-Export, LLM-Dump), das nach `local/` gehört

Claude schlägt nicht automatisch vor, nur weil ein AP abgeschlossen ist oder eine Session endet.

**Regel:** Claude schlägt vor, führt nicht ohne Freigabe durch.

---

## Arbeitsphasen

Der Skill arbeitet abschnittsweise. Kein monolithisches Vorgehen.

### Phase 0 — Scope klären

Claude fragt, wenn Scope nicht klar (max. 3 Fragen, dann Abbruchpfad):
- Was soll archiviert werden?
- Warum ist es archivwürdig?
- Geht es um Rohmaterial, lokale Entstehungsgeschichte oder projektübergreifendes Material?
- Hat Albert Zielpfade oder Archivstufen im Kopf?

**Wenn Scope nach max. 3 Fragen unklar bleibt:**
Kein Schreibzugriff. Claude gibt Befund und Einschätzung aus und wartet auf Alberts explizite Freigabe bevor Phase 1 beginnt.

Wenn Albert ausreichend Scope mitgegeben hat: Phase 0 überspringen, direkt zu Phase 1.

### Phase 1 — Quellen sammeln

Mögliche Quellen:
- bereitgestellte Markdown-Dateien oder Chat-Inhalte
- Claude-Quittungen, Patch-Quittungen, Gate-Reports
- Commit-Messages
- Peer Reviews (ChatGPT, Perplexity, Gemini)
- lokale Pfadangaben von Albert
- vorhandene Archivdateien im Scope

Claude liest genannte Pfade direkt. Nicht raten, nicht blind suchen.

Wenn Albert keinen konkreten Pfad nennt und der Auftrag allgemein lautet „archivieren" oder „sichere diese Erkenntnisreise", prüft Claude zuerst `Archiv/local/muss noch eingeordnet werden/`, sofern vorhanden. Dieses Verzeichnis ist nur eine Eingangsschublade für noch nicht eingeordnetes Material, keine Zielstruktur. Konkrete Pfadangaben von Albert haben Vorrang. Nichts daraus wird ohne Klassifikation und Blockfreigabe verschoben oder kuratiert.

Für mechanische Inventur: `abschluss-scout` einsetzbar (gleiche Policy wie im Abschluss-Ritual).

### Phase 2 — Material klassifizieren

Jedes Material-Stück bekommt eine Kategorie:

| Kategorie | Bedeutung |
|---|---|
| `RAW` | Rohmaterial: vollständige Chatverläufe, LLM-Dumps, unkuratierte Exporte, Binärdateien, ZIP/PDF/XLSX → nach `local/` |
| `HIST` | Historischer Input — lehrreich, nicht handlungsleitend |
| `ERSETZT` | Durch aktive Regel, Spec oder Entscheidung ersetzt → Nachfolger muss genannt werden |
| `POSTMORTEM` | Material zur späteren Fehler- oder Prozessauswertung |
| `MAKING_OF_BELEG` | Projektübergreifender Erkenntniswert → Root-Archiv / Making-of |
| `LOKALER_KONTEXT` | Subsystemnahe Entstehungsgeschichte → lokales Archiv |
| `ROOT_KURATION` | Projektübergreifend kuratierbares Material → Root-Archiv |
| `SONDERFALL` | Unklar im Archivmodell — Albert entscheidet |
| `ZU_PRUEFEN` | Klassifikation nicht möglich ohne weitere Prüfung — nicht verschieben |

Mehrfach-Kategorien möglich und explizit benennen (z.B. `LOKALER_KONTEXT + MAKING_OF_BELEG`).
**`ARCHIV` niemals verwenden** — zu ungenau (Archivvertrag Regel: nicht verwenden).

### Phase 3 — Archivierungsvorschlag

Claude präsentiert pro Material-Block:
- Vorgeschlagene Kategorie und Begründung
- Empfohlener Zielpfad
- Was nach `local/` geht (gitignored, nicht kuratiert)
- Welche Dateien entstehen (Belegnotiz, README-Ergänzung, Verweis in legacy-map oder KAPITELRAHMEN)
- Welche Dateien unangetastet bleiben
- Was nicht übernommen wird und warum

### Phase 4 — Freigabe pro Block

Claude wartet auf Alberts explizites OK pro Block. Kein Weitermachen ohne Freigabe.

Blockformat:
```
Block [N] — [Bezeichnung]
Kategorie:  [RAW / HIST / MAKING_OF_BELEG / ...]
Zielpfad:   [...]
Begründung: [1–2 Sätze]
Risiko:     [niedrig / mittel / hoch]
Fällt weg:  [...]
→ OK?
```

### Phase 5 — Umsetzung nach Freigabe

Erst nach Alberts OK pro Block:
- Dateien erzeugen (Belegnotizen, README-Ergänzungen)
- Verweise minimal eintragen (legacy-map, KAPITELRAHMEN — nur wenn klar nötig)
- Git-Status prüfen (Gate 3)
- Übergabe an Albert vorbereiten (Gate 4)

Verboten in Phase 5: Löschen, Verschieben ohne explizite Freigabe, `git add .`, `git add -A`, `git add Archiv/`, `local/`-Ordner anlegen ohne Freigabe im aktuellen Block oder gesonderten AP-Auftrag.

### Phase 6 — Abschlussbericht

```
Archiviert:         [Kategorie, Zielpfad je Block]
In local/:          [was gitignored wurde]
Kuratiert:          [Belegnotizen, Verweise]
Nicht übernommen:   [was, warum]
Drift-Risiken:      [was reduziert wurde]
Offen:              [Folgepunkte]
```

---

## Klassifikationslogik

Entscheidungsbaum:

```
Ist es Rohmaterial (vollst. Chat, LLM-Dump, Binärdatei)?
  → RAW → local/

Hat es projektübergreifenden Erkenntniswert (Architekturentscheidung,
Peer Review, KI-Workflow-Wendepunkt)?
  → MAKING_OF_BELEG + ROOT_KURATION → Archiv/making-of/ oder Archiv/[Themeninsel]/

Erklärt es lokale Entstehungsgeschichte eines Subsystems?
  → LOKALER_KONTEXT → [Subsystem]/Archiv/

Ist es durch aktive Regel oder Spec überholt?
  → ERSETZT → Archivdatei mit Nachfolger-Verweis

Dient es späterer Prozessauswertung?
  → POSTMORTEM → lokales oder Root-Archiv je nach Scope

Ist es unklar?
  → ZU_PRUEFEN → nicht verschieben, Befund melden
```

Wenn mehrere Kategorien zutreffen: explizit benennen.

---

## Zielorte

| Material | Zielpfad |
|---|---|
| Rohmaterial (vollst. Chatverläufe, LLM-Dumps, Binärdateien, ZIP/PDF/XLSX) | `Archiv/local/[Themeninsel]/` |
| Projektweiter Erkenntniswert / Making-of | `Archiv/making-of/` — Belegnotiz + Verweis in KAPITELRAHMEN.md |
| Projektweite Querschnittsentscheidung | `Archiv/[Themeninsel]/` (z.B. `Archiv/Peer Review Arbeitspakete/`) |
| Subsystemnahe Entstehungsgeschichte | `[Subsystem]/Archiv/` (z.B. `Apps/prokrastinations-preis/Archiv/`, `docs/spec/archiv/`) |
| Aktive Wahrheit | Nie ins Archiv als einzige Quelle — aktive Datei aktualisieren |
| Unklar | Nicht verschieben — `ZU_PRUEFEN`, Befund melden |

Neuer `local/`-Unterordner: nur nach expliziter Freigabe im aktuellen `/archivieren`-Block oder durch gesonderten AP-Auftrag anlegen. Nicht pauschal, nicht automatisch.

---

## Freigabe-Gates

### Gate 1 — Klassifikation freigeben

Vor jedem Schreibvorgang: Albert bestätigt Kategorie und Zielpfad pro Block. Abschnittsweise, nicht alles auf einmal.

### Gate 2 — Kuratierte Inhalte freigeben

Wenn Claude Belegnotizen oder README-Ergänzungen schreibt: Albert sieht den vorgeschlagenen Inhalt. Erst nach OK schreiben.

### Gate 3 — Git-Status-Check

Vor Übergabe:
```
git status --short
git status --short Archiv/local/
```
Erwartung: `Archiv/local/` zeigt keinen Output (gitignored). Wenn doch Output: stoppen, melden.

### Gate 4 — Übergabe an Albert

Claude zeigt:
- welche Dateien neu sind oder geändert wurden
- welche Dateien unter `Archiv/local/` liegen und deshalb nicht im Git-Status erscheinen sollten
- ob `Archiv/local/` sauber gitignored bleibt
- welche Dateien Albert in VSCode prüfen und selbst stagen kann

Kein Staging durch Claude.

Verboten bleibt:
```
git add .
git add -A
git add Archiv/
```

---

## Git-Sicherheit

- `Archiv/local/` ist gitignored — bei versehentlichem Tracking: sofort stoppen, melden.
- Keine `.gitignore`-Änderungen ohne gesonderten AP-Auftrag.
- Staging und Commit übernimmt Albert in VSCode oder Git.
- Claude prüft Git-Status und meldet neue/geänderte Dateien.
- Claude staged nicht.

---

## Output-Formate

| Output | Wann |
|---|---|
| Klassifikationstabelle | Phase 2 — Überblick über Material mit Kategorie und Zielpfad |
| Archivierungsvorschlag (Blockformat) | Phase 3 — pro Block mit Begründung, Zielpfad, Risiko, Was-fällt-weg |
| Belegnotiz | Phase 5 — kuratierte Notiz für `Archiv/making-of/` (Vorlage: 07a–07c-Belege) |
| README-Ergänzung | Phase 5 — Ergänzung bestehender lokaler Archiv-READMEs |
| legacy-map-Verweis | Phase 5 — nur wenn neuer Archivort entsteht oder sich ändert |
| KAPITELRAHMEN-Ergänzung | Phase 5 — wenn Beleg einem Making-of-Kapitel zugeordnet werden kann |
| Abschlussbericht | Phase 6 — was archiviert, was verworfen, was offen |

---

## Harte Grenzen

Der Skill darf nie automatisch:

- Dateien löschen
- Massenkonsolidierung durchführen
- Archive großflächig verschieben
- `local/`-Ordner ohne explizite Freigabe im aktuellen Block oder gesonderten AP-Auftrag anlegen
- `.gitignore` ändern
- Aktive Projektregeln durch Archivdateien ersetzen
- Fertige Making-of-Kapitel schreiben, wenn nur Belegnotizen gefragt sind
- Mehrere Archivinseln ohne Alberts Freigabe parallel bearbeiten
- Das Abschluss-Ritual mit Archivlogik aufblähen

Der Skill darf vorschlagen, aber nicht ohne Freigabe handeln.

---

## Zusammenspiel mit distill, kassensturz, start und abschluss-ritual

**`/start`** — Liest session-log, empfiehlt /distill bei Schwellenwert. Kein Bezug zu `/archivieren`. Kein automatischer Archivierungscheck. Archivierungshinweise bleiben rein manuell — höchstens nach ausdrücklichem Auftrag als Hinweisregel ergänzbar.

**`/distill`** — Schließt mit geleerten session-log ab. Destillierte Rohmaterialien (vollständige LLM-Dumps, Chat-Exporte) können danach in `/archivieren` überführt werden — manueller Schritt, kein automatischer Aufruf.

**`/kassensturz`** — Trend-Check, kein Kuratierungswerkzeug. Kein Bezug zu `/archivieren`.

**`/abschluss-ritual`** — Endet mit Commit-Message. Enthält keinen eingebetteten Archiv-Schritt. Kein automatischer Archivierungscheck nach dem Ritual. Claude darf `/archivieren` nur vorschlagen, wenn Albert im laufenden Faden Archivwürdigkeit erwähnt hat oder eindeutig Rohmaterial bzw. Belegmaterial entstanden ist — nicht pauschal nach jedem abgeschlossenen AP.

---

## Umsetzungshinweise für SKILL-ARCHIV-02

### Skill-Struktur

Ablegen unter: `.claude/skills/archivieren/SKILL.md`

Frontmatter:
```yaml
---
name: archivieren
description: Kontrollierter Archivierungs-Workflow für Finanzwesir 2.0. Klassifiziert Material, macht Vorschläge, wartet auf Freigabe. Kein Aufräumroboter.
argument-hint: "[was soll archiviert werden? z.B. OA-02-Peer-Reviews, heutiger Chat-Export]"
---
```

### Feste Pfade im Skill (analog zu abschluss-ritual)

| Zweck | Pfad |
|---|---|
| Archivstrategie (SSoT) | `docs/steering/ARCHIV-STRATEGIE.md` |
| Archiv-Inventar | `docs/steering/ARCHIV-INVENTAR.md` |
| Legacy-Map | `Archiv/legacy-map.md` |
| Making-of README | `Archiv/making-of/README.md` |
| Kapitelrahmen | `Archiv/making-of/KAPITELRAHMEN.md` |
| Root-Archiv | `Archiv/` |
| local/-Quarantäne | `Archiv/local/` |

### Subagent

Für mechanische Inventur in Phase 1: `abschluss-scout` einsetzbar. Gleiche Logik wie im Abschluss-Ritual.

### Belegnotiz-Vorlage

Vorhandene Belegnotizen `07a`, `07b`, `07c` in `Archiv/making-of/` als Formatvorlage verwenden. Beim Implementieren: eine dieser Dateien als Referenz lesen.

### Token-Strategie

Phase 0–2: Lesen, Klassifizieren (Scout einsetzbar).
Phase 3–4: Hauptinstanz, interaktiv.
Phase 5–6: Hauptinstanz, schreibend.
Wenn Kontext eng wird: `/uebergabe` anbieten, Stand festhalten.

---

## Offene Fragen

1. **Belegnotiz-Format:** Soll die Vorlage aus den vorhandenen 07a–07c-Dateien direkt in den Skill eingebaut werden, oder reicht ein Verweis auf diese Dateien?

2. **Trigger-Grenze:** Ist "das soll ins Making-of" als Trigger präzise genug, oder braucht es eine engere Definition um versehentliche Skill-Auslösungen zu vermeiden?

3. **Sonderfalllogik:** Soll `/archivieren` eine eigene Behandlung der offenen Sonderfälle aus `ARCHIV-SONDERFAELLE.md` haben (archivliste.md, docs/App-Fabrik/_archive/, Inhalte alte Site/blog/archiv/)? Oder bleiben diese außerhalb des Skills?
