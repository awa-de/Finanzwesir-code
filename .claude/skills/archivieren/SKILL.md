---
name: archivieren
description: Kontrollierter Archivierungs-Workflow für Finanzwesir 2.0. Klassifiziert Material, macht Vorschläge, wartet auf Freigabe. Kein Aufräumroboter.
argument-hint: "[was soll archiviert werden? z.B. OA-02-Peer-Reviews, heutiger Chat-Export]"
---

# Skill: archivieren

Trigger: Albert sagt `/archivieren`, „das ist archivierungswürdig", „sichere diese Erkenntnisreise", „das soll ins Making-of" — oder sinngemäß ähnlich.
Argumente: $ARGUMENTS (was soll archiviert werden)

Claude darf vorschlagen wenn Albert Archivwürdigkeit erwähnt hat oder eindeutig Rohmaterial bzw. Belegmaterial entstanden ist. Kein automatischer Vorschlag bei AP-Ende oder Session-Ende.

---

## Zweck

/archivieren steuert die kontrollierte Überführung von Material aus abgeschlossenen Erkenntnisströmen in `local/`, lokale Archive, Root-Archiv oder Making-of.

Kein Aufräumroboter. Kuratierender Workflow mit Freigabegates.

---

## Wann verwenden?

- Rohmaterial (vollständige Chatverläufe, LLM-Dumps, Peer Reviews) ist entstanden
- Erkenntnisreise soll gesichert werden
- Belegmaterial für Making-of ist entstanden
- Albert löst explizit aus

## Nicht verwenden für

- `/distill` — Lernstrom verdichten
- `/kassensturz` — Projekttrend prüfen
- `/abschluss-ritual` — AP abschließen
- allgemeines Aufräumen oder Massenkonsolidierung
- aktive Architekturentscheidungen

Wenn etwas aktuelle Wahrheit ist: aktive Datei aktualisieren, nicht nur archivieren.

---

## Verbindliche Quellen — keine Suche, wenn hier angegeben

| Zweck | Pfad |
|---|---|
| Archivstrategie (SSoT) | `docs/steering/ARCHIV-STRATEGIE.md` |
| Archiv-Inventar | `docs/steering/ARCHIV-INVENTAR.md` |
| Skill-Spezifikation | `docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md` |
| Legacy-Map | `Archiv/legacy-map.md` |
| Making-of README | `Archiv/making-of/README.md` |
| Kapitelrahmen | `Archiv/making-of/KAPITELRAHMEN.md` |
| Root-Archiv | `Archiv/` |
| local/-Quarantäne | `Archiv/local/` |
| Belegnotiz-Vorlagen | `Archiv/making-of/07a_*_BELEGNOTIZ.md`, `07b_*`, `07c_*` |

Bei Archivarbeit zuerst relevante Quellen lesen. Nicht aus Erinnerung arbeiten.

---

## Arbeitsmodus

Der Skill arbeitet abschnittsweise. Kein monolithisches Vorgehen.

**Token-Strategie:**
- Phase 0–2: Lesen, klassifizieren — Scout einsetzbar
- Phase 3–4: Hauptinstanz, interaktiv
- Phase 5–6: Hauptinstanz, schreibend
- Wenn Kontext eng: `/uebergabe` anbieten, Stand festhalten

---

## Phasen

### Phase 0 — Scope klären

Wenn Scope nicht klar: max. 3 Fragen.
- Was soll archiviert werden?
- Warum ist es archivwürdig?
- Geht es um Rohmaterial, lokale Entstehungsgeschichte oder projektübergreifendes Material?

Wenn Scope nach 3 Fragen weiterhin unklar: kein Schreibzugriff. Befund und Einschätzung ausgeben, auf Alberts Freigabe warten.

Wenn Albert ausreichend Scope mitgegeben hat: direkt zu Phase 1.

### Phase 1 — Quellen sammeln

Mögliche Quellen:
- bereitgestellte Markdown-Dateien, Chat-Inhalte
- Claude-Quittungen, Patch-Quittungen, Gate-Reports
- Commit-Messages
- Peer Reviews (ChatGPT, Perplexity, Gemini)
- lokale Pfadangaben von Albert
- vorhandene Archivdateien im Scope

Genannte Pfade direkt lesen. Nicht raten, nicht blind global suchen.

Für mechanische Inventur: `abschluss-scout` einsetzbar (gleiche Policy wie im Abschluss-Ritual).

### Phase 2 — Material klassifizieren

Jedes Material-Stück bekommt eine Kategorie:

| Kategorie | Bedeutung |
|---|---|
| `RAW` | Rohmaterial: vollst. Chatverläufe, LLM-Dumps, Binärdateien, ZIP/PDF/XLSX → nach `local/` |
| `HIST` | Historischer Input — lehrreich, nicht handlungsleitend |
| `ERSETZT` | Durch aktive Regel/Spec/Entscheidung ersetzt — Nachfolger muss genannt werden |
| `POSTMORTEM` | Material zur späteren Fehler- oder Prozessauswertung |
| `MAKING_OF_BELEG` | Projektübergreifender Erkenntniswert → Root-Archiv / Making-of |
| `LOKALER_KONTEXT` | Subsystemnahe Entstehungsgeschichte → lokales Archiv |
| `ROOT_KURATION` | Projektübergreifend kuratierbares Material → Root-Archiv |
| `SONDERFALL` | Unklar im Archivmodell — Albert entscheidet |
| `ZU_PRUEFEN` | Klassifikation nicht möglich ohne weitere Prüfung — nicht verschieben |

Mehrfach-Kategorien möglich und explizit benennen (z.B. `LOKALER_KONTEXT + MAKING_OF_BELEG`).
`ARCHIV` niemals verwenden — zu ungenau.

### Phase 3 — Archivierungsvorschlag

Claude präsentiert pro Material-Block:
- Vorgeschlagene Kategorie und Begründung
- Empfohlener Zielpfad
- Was nach `local/` geht
- Welche Dateien entstehen (Belegnotiz, README-Ergänzung, Verweis in legacy-map oder KAPITELRAHMEN)
- Welche Dateien unangetastet bleiben
- Was nicht übernommen wird und warum

### Phase 4 — Freigabe pro Block

Kein Weitermachen ohne Alberts OK pro Block.

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
- Nur gezieltes Staging (Gate 4)

Verboten in Phase 5:
- Löschen
- Verschieben ohne explizite Freigabe
- `git add .` / `git add -A` / `git add Archiv/`
- `local/`-Ordner ohne Freigabe im aktuellen Block oder gesonderten AP-Auftrag anlegen

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

## Klassifikationskategorien — Entscheidungsbaum

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
| Rohmaterial (vollst. Chatverläufe, LLM-Dumps, Binärdateien) | `Archiv/local/[Themeninsel]/` |
| Projektweiter Erkenntniswert / Making-of | `Archiv/making-of/` — Belegnotiz + Verweis in KAPITELRAHMEN.md |
| Projektweite Querschnittsentscheidung | `Archiv/[Themeninsel]/` |
| Subsystemnahe Entstehungsgeschichte | `[Subsystem]/Archiv/` |
| Aktive Wahrheit | Nie ins Archiv als einzige Quelle — aktive Datei aktualisieren |
| Unklar | Nicht verschieben — ZU_PRUEFEN, Befund melden |

Neuer `local/`-Unterordner: nur nach expliziter Freigabe im aktuellen Block oder durch gesonderten AP-Auftrag.

---

## Freigabe-Gates

### Gate 1 — Klassifikation freigeben

Vor jedem Schreibvorgang: Albert bestätigt Kategorie und Zielpfad pro Block. Abschnittsweise, nicht alles auf einmal.

### Gate 2 — Kuratierte Inhalte freigeben

Wenn Claude Belegnotizen oder README-Ergänzungen schreibt: vorgeschlagenen Inhalt zeigen. Erst nach OK schreiben.

### Gate 3 — Git-Status-Check

Vor Staging:
```
git status --short
git status --short Archiv/local/
```
Erwartung: `Archiv/local/` zeigt keinen Output (gitignored). Wenn doch Output: stoppen, melden.

### Gate 4 — Gezieltes Staging

Verboten:
```
git add .
git add -A
git add Archiv/
```
Nur gezieltes Staging der konkret freigegebenen Dateien.

---

## Git-Sicherheit

- `Archiv/local/` ist gitignored — bei versehentlichem Tracking: sofort stoppen, melden.
- Keine `.gitignore`-Änderungen ohne gesonderten AP-Auftrag.
- Staging immer nach Vier-Augen-Prinzip: Claude zeigt was gestagtet wird, Albert gibt frei.

---

## Harte Grenzen

Der Skill darf nie automatisch:
- Dateien löschen
- Massenkonsolidierung durchführen
- Archive großflächig verschieben
- `local/`-Ordner ohne explizite Freigabe anlegen
- `.gitignore` ändern
- Aktive Projektregeln durch Archivdateien ersetzen
- Fertige Making-of-Kapitel schreiben, wenn nur Belegnotizen gefragt sind
- Mehrere Archivinseln ohne Freigabe parallel bearbeiten
- Das Abschluss-Ritual mit Archivlogik aufblähen

---

## Zusammenspiel mit anderen Skills

| Skill | Abgrenzung |
|---|---|
| `/start` | Kein automatischer Archivierungscheck |
| `/distill` | Lernstrom verdichten — kein Archivieren |
| `/kassensturz` | Projekttrend prüfen — kein Archivieren |
| `/abschluss-ritual` | AP abschließen — kein eingebetteter Archivschritt |

Sequenziell möglich: Nach Abschluss-Ritual kann Albert `/archivieren` separat auslösen.
Nicht verschachteln.

---

## Subagent / Scout

Für mechanische Inventur in Phase 1: `abschluss-scout` einsetzbar.
Gleiche Policy wie im Abschluss-Ritual: Scout sammelt nur, entscheidet nicht, schreibt nicht.

Claude meldet den Aufruf sichtbar vor dem Start:
> `Abschluss-Scout (Haiku) wird gestartet: mechanische Inventur, keine Änderungen.`

---

## Abschlussformat

Abschlussbericht (Phase 6) ist Pflicht. Kein stilles Beenden.

```
Archiviert:         [Kategorie, Zielpfad je Block]
In local/:          [was gitignored wurde]
Kuratiert:          [Belegnotizen, Verweise]
Nicht übernommen:   [was, warum]
Drift-Risiken:      [was reduziert wurde]
Offen:              [Folgepunkte]
```
