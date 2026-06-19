Stand: 2026-06-19 | Session: B1-AP-14e2-Vorbereitung | Geändert von: Claude

# Peer-Review-Briefing: Token-Optimierung /abschluss-ritual

## Auftrag an die reviewenden LLMs

Dieses Dokument fasst einen vollständigen Analyse-Faden zusammen. Ihr bekommt:

- Den vollständigen Kontext des Projekts und des Skills
- Das Problem mit Begründung
- Den Gesprächsverlauf und die entstandenen Ideen
- Den aktuellen Skill-Text (unverändert)
- Einen konkreten Architekturvorschlag mit Begründung

**Eure Aufgabe:** Bewertet den Vorschlag fair und zielführend. Identifiziert Schwachstellen, Lücken oder bessere Alternativen. Ihr dürft alles infrage stellen. Haltet euch nicht zurück.

---

## 1. Projekthintergrund (für Kontext)

**Finanzwesir 2.0** ist ein Einzelpersonen-Softwareprojekt (Einpersonen-Team: Albert als Entwickler/Entscheider, Claude als technischer Partner). Das Projekt baut eine interaktive Web-App auf Basis von Ghost.io mit einer selbst entwickelten Chart-Engine (Chart.js-basiert, ca. 10 Layer-Dateien).

**Arbeitsweise:**
- Kein automatisches Test-Framework. Kein CI/CD.
- Manuelle Tests via VSCode Live Server.
- Claude schlägt vor, Albert entscheidet und committet.
- Jede Session beginnt mit `/start`, das eine Reihe von Dateien liest und einen strukturierten Kontext aufbaut.
- Arbeit ist in Arbeitspakete (APs) gegliedert, z.B. `B1-AP-14e2`.
- APs laufen oft in Ketten (B1-AP-14a → 14b → 14c → ...).

**Warum Abschluss-Rituale überhaupt?**
Ohne strukturierten Abschluss entsteht über Iterationszyklen hinweg Drift:
- Steuerungsdateien (BACKLOG, NAVIGATION, PROJECT-STATUS) werden nicht aktualisiert
- Der nächste Faden startet mit falschem Kontext
- Lücken im session-log machen Muster unsichtbar
- Die Session-Start-Hook liest PROJECT-STATUS.md und zeigt falsche Infos

Das Abschluss-Ritual ist **der Mechanismus, der den Laden zusammenhält.** Es ist nicht optional.

---

## 2. Das Problem: Hochfrequenz-Skill mit zu hohen Token-Kosten

### Warum hochfrequent?

Der Skill wird bei **jedem AP-Abschluss** aufgerufen. In einem typischen Arbeitstag gibt es 3–8 AP-Abschlüsse, viele davon in Ketten (z.B. 5 APs in einem Nachmittag). Der Skill ist also der meistgerufene Skill im Projekt.

### Warum teuer?

In der Praxis verbraucht ein Ketten-AP-Abschluss ~1000–1500 Token (Sonnet). Ein Voll-Abschluss ~2000–2500 Token. Das summiert sich erheblich.

**Die Token gehen verloren für:**

| Ursache | Anteil |
|---|---|
| Sonnet liest NAVIGATION.md, um die richtige Zeile zu finden | ~300–500 Token |
| Sonnet liest PROJECT-STATUS.md, um das HOOK-META-Format zu verstehen | ~300–500 Token |
| Sonnet erklärt verbal, was es gerade tut | ~200–300 Token |
| Commit-Message-Template ist für alle Pfade gleich (6 Pflichtfelder) | ~300–400 Token |
| Modus-Erkennung (welcher der 3 Pfade?) kostet selbst Files-lesen | ~200–400 Token |

### Das Paradox der Modus-Erkennung

Der Skill definiert 3 Pfade (Mini, Ketten-Modus, Voll-Abschluss) und behauptet, den Modus automatisch zu erkennen. In der Realität liest Sonnet dafür NAVIGATION.md oder BACKLOG.md — die Erkennung selbst verursacht also Token-Kosten, bevor die eigentliche Arbeit beginnt.

---

## 3. Die drei Pfade des Skills

```
/abschluss-ritual aufgerufen
        │
        ▼
  Modus-Erkennung
        │
   ┌────┴──────────────────┐──────────────────────┐
   ▼                       ▼                      ▼
Mini-Abschluss      Ketten-Modus            Voll-Abschluss
(Pfad C)            (Pfad B)                (Pfad A)
                         │
                    ┌────┴────┐
                    ▼         ▼
                 Pro-AP   Kettenende
                (mehrfach) (→ Voll-Abschluss)
```

**Pfad A — Voll-Abschluss** (teuerster Pfad):

0. Session-Log befüllen (Challenge-Response)
0a. Optionaler Abschluss-Scout (Haiku)
0b. NAVIGATION.md prüfen
0c. Definition of Done prüfen
0d. Regression-Matrix (nur bei Engine-Änderungen)
1. Specs aktualisieren
2. BACKLOG bereinigen (inkl. Sofort-erledigt-Pfad + Scope-Check)
3. MEMORY aktualisieren
4. Commit-Message erzeugen (6 Pflichtfelder)
5. CLAUDE.md (nur bei neuer universeller Regel)
6. PROJECT-STATUS.md + HOOK-META

**Pfad B — Ketten-Modus Pro-AP** (4 Schritte, hochfrequentester Pfad):

1. session-log — 1 Zeile ✅
2. NAVIGATION.md — AP-Status → ✅
3. PROJECT-STATUS.md — Nächster Schritt + HOOK-META synchronisieren
4. Commit-Message ausgeben

**Pfad C — Mini-Abschluss** (2 Schritte):

1. Stand-Datum der berührten Steering-Dateien aktualisieren
2. Commit-Message erzeugen

**Am Kettenende** (einmalig, automatisch als Voll-Abschluss):

5. BACKLOG-ARCHIV.md — alle Ketten-APs archivieren
6. BACKLOG.md — alle Ketten-APs entfernen
7. MEMORY.md — einmal aktualisieren
8. Specs prüfen (falls Spec-Dateien während der Kette geändert wurden)

---

## 4. Nicht verhandelbare Constraints

Diese Constraints dürfen bei keiner Optimierung geopfert werden:

1. **Kein Drift**: BACKLOG, NAVIGATION, PROJECT-STATUS müssen am Ende eines AP-Blocks korrekt sein
2. **HOOK-META muss korrekt sein**: Die Datei PROJECT-STATUS.md wird von einem Session-Start-Hook gelesen. Falsches Format dort → kaputte Session beim nächsten Faden. Das ist der kritischste Single Point of Failure.
3. **session-log muss lückenlos sein**: Jeder AP muss einen Eintrag haben. Fehlende Einträge = verlorene Lerndaten
4. **Lücken in Ketten sind akzeptabel** — ABER: Die Lücke muss explizit dokumentiert sein (nicht still), und Pfad A muss sie beim Kettenende zuverlässig füllen können
5. **Albert gibt kein Argument mit**: Er tippt nur `/abschluss-ritual`. Der Skill muss den Modus selbst erkennen, ohne dass Albert nachdenkt oder tippt
6. **Kein Verlust bei Modellwechsel**: Wenn Haiku einen Schritt übernimmt, muss das Ergebnis identisch zu Sonnet sein — kein Qualitätsverlust durch Modell-Downgrade

---

## 5. Alberts Wünsche (direkte Formulierung)

> "Ich will so viel Sonnet wie nötig und so viel Haiku wie möglich."

> "Das klingt gut. Schreibe diesen ganzen Faden ... in eine Markdown-Datei, die andere LLMs für ein Peer-Review verwenden können."

> "Beim Pfad B akzeptieren wir Lücken, aber das sind Lücken, die vom Pfad A wieder gefüllt werden können. Der Weg zur Lücke muss klar sein und es muss für den Skill möglich sein, diese Lücken transparent zu füllen. Weil explizit klar ist, was da reingehört."

> "Schaue über den Tellerrand, wie gehen andere Industrien mit diesem Phänomen um?"

---

## 6. Cross-Industry-Inspiration (Claude's Analyse)

Vier Industrie-Analogien, die für dieses Problem relevant sind:

### 6.1 Aviation — Minimum Equipment List (MEL)
Flugzeuge dürfen mit defekten Komponenten fliegen. Jede Lücke ist im MEL-Eintrag dokumentiert: *was fehlt, unter welchen Bedingungen, wann es nachzuholen ist*. Die Wartung arbeitet die MEL-Liste mechanisch ab — keine Analyse nötig.

**Übertragbares Prinzip:** Lücke ≠ Fehler. Lücke = expliziter Eintrag mit Rückführungspfad.

### 6.2 Doppelte Buchführung
Jede Transaktion wird zweimal erfasst: einmal sofort (Kasse), einmal beim Abschluss (Bilanz). Die Bilanz gleicht sich aus, weil das Format invariant ist — nicht weil jemand aufpasst.

**Übertragbares Prinzip:** Deferred-Eintrag beim Buchen + automatische Reconciliation am Periodenende.

### 6.3 Checklisten-Manifest (Atul Gawande)
Chirurgische Checklisten sind bewusst minimal. Items sind "Kill Items": wenn eins fehlt, wird gestoppt. Kein Ermessen, kein Kontext-Lesen. Die Kürze ist kein Zufall — sie ist das Design.

**Übertragbares Prinzip:** Minimal by design, nicht by accident. Format invariant, kein Spielraum.

### 6.4 Kanban — Das Karten-Signal
Die Karte trägt alle nötigen Informationen selbst. Kein Mensch muss den Status analysieren — das Signal ist das Artefakt.

**Übertragbares Prinzip:** Das Artefakt trägt das Signal. Kein externes Lookup nötig.

---

## 7. Der Architekturvorschlag (Claude's Entwurf)

### Kernidee: DEFERRED-Marker + Context-First-Erkennung

**Inspiration:** MEL + Doppelte Buchführung

Jeder Pro-AP-Abschluss (Pfad B) schreibt einen **maschinenlesbaren DEFERRED-Marker** in den session-log:

```
### 2026-06-19 — B1-AP-14e2 ✅ | DEFERRED: ARCHIV MEMORY SPECS
```

Am Kettenende liest Haiku alle DEFERRED-Marker aus dem session-log → liefert die Liste an Sonnet → Sonnet weiß **exakt** was aufzuholen ist, ohne Analyse.

### Modus-Erkennung ohne File-Reads (Context-First)

| Signal | Modus | Quelle |
|---|---|---|
| HOOK-META `Nächster-Schritt` enthält `(AP-ID ✅ Datum)` | Ketten-Modus | Bereits im Konversationskontext |
| AP-Präfix passt zu vorherigem AP im Faden | Ketten-Modus | Konversations-History |
| Nur Steering-/Doku-Dateien berührt, kein Code | Mini | Eigene Edit-History des aktuellen Turns |
| Alles andere | Voll-Abschluss | Default |

**Kein File-Read zur Modus-Bestimmung.**

### Aufgabenteilung Sonnet/Haiku je Pfad

**Pfad B — Ketten Pro-AP:**

| Schritt | Modell | Begründung |
|---|---|---|
| Werte berechnen (AP-ID, next-AP, Datum, Log-Zeile) | Sonnet | Synthesis aus Kontext |
| session-log + DEFERRED-Marker schreiben | Haiku | Mechanisches Edit, exakter String |
| NAVIGATION.md Status → ✅ | Haiku | Find + Replace, kein Ermessen |
| PROJECT-STATUS.md HOOK-META | Haiku | Exakter String, 1:1-Ersatz — ACHTUNG: kritischster Schritt |
| Commit-Message (Kurzformat, 3 Zeilen) | Sonnet | Synthesis nötig |

**Pfad B → Kettenende:**

| Schritt | Modell | Begründung |
|---|---|---|
| DEFERRED-Marker aus session-log sammeln | Haiku | Mechanisches Lesen + Extrahieren |
| Voll-Abschluss für ARCHIV/MEMORY/SPECS | Sonnet | Gezielt, weil Liste explizit |

**Pfad C — Mini-Abschluss:**

| Schritt | Modell | Begründung |
|---|---|---|
| Stand-Datum schreiben | Haiku | Dateien bekannt aus Edit-History |
| Commit-Message (Kurzformat, 3 Zeilen) | Sonnet | Synthesis nötig |

### Zwei Commit-Message-Formate

**Kurzformat (Pfad B + C):**
```
B1-AP-14e2: fwVerticalLine ausgelagert + ChartEngine-Fix

Bereiche: FwChartPlugins.js, ChartEngine.js
Sicher: Guard in _draw() isoliert, Standard-Charts unberührt
```

**Langformat (Pfad A — Voll-Abschluss):** wie bisher (6 Pflichtfelder).

### Erwartete Token-Einsparung

| Pfad | Heute | Nach Umbau | Einsparung |
|---|---|---|---|
| Ketten Pro-AP (B) | ~1200 Token | ~350 Token | ~70 % |
| Mini (C) | ~600 Token | ~200 Token | ~65 % |
| Voll-Abschluss (A) | ~2500 Token | ~1800 Token | ~30 % |

---

## 8. Offene Risiken und Fragen (ehrlich)

### Risiko 1: HOOK-META ist der kritischste Punkt
PROJECT-STATUS.md HOOK-META wird von einem automatischen Session-Start-Hook gelesen. Format-Fehler dort → kaputte Session. Wenn Haiku diesen Schritt übernimmt und das Format leicht falsch schreibt, fällt das erst beim nächsten Faden-Start auf.

**Mögliche Absicherungen:**
- Sonnet liefert den exakten HOOK-META-String als unveränderlichen Wert → Haiku macht nur Find + 1:1-Replace
- Alternativ: HOOK-META bleibt bei Sonnet, Haiku macht nur session-log + NAVIGATION

### Risiko 2: Haiku-Dispatch-Overhead
Jeder Agent-Dispatch kostet selbst Token (Kontext-Übergabe, Result-Parsing). Bei sehr kurzen Ketten (1–2 APs) könnte der Overhead die Einsparung auffressen.

**Schwellenwert:** Ab welcher Kettenlänge lohnt sich Haiku-Dispatch?

### Risiko 3: DEFERRED-Marker werden falsch geparst
Wenn der Marker-Format nicht strikt genug ist, könnte Haiku beim Kettenende falsche Items zurückliefern.

**Mögliche Lösung:** Exaktes Format definieren: `| DEFERRED: ARCHIV MEMORY SPECS |` (Pipe-getrennt, Schlüsselwörter fest).

### Risiko 4: Modus-Erkennung aus Konversationskontext
Sonnet hat keine garantierte Sicht auf seine eigene Edit-History über Kontextgrenzen hinweg (Context-Compaction). Bei langen Sessions könnte die Context-First-Erkennung fehleranfällig werden.

**Frage an die Reviewer:** Ist Context-First robust genug, oder braucht es einen Fallback?

### Risiko 5: Drift über Iterationszyklen
Das Ziel ist: Kein Drift. Wenn der Haiku-Dispatch einen Schritt falsch ausführt und Sonnet das nicht verifiziert, akkumuliert sich Drift still. Wie viel Verifikation braucht es — und wie viel davon kann Haiku selbst leisten?

---

## 9. Der aktuelle Skill-Text (unverändert)

```markdown
---
name: abschluss-ritual
description: Abschluss-Ritual nach Fertigstellung einer Aufgabe in Finanzwesir 2.0. Aktualisiert Docs, Backlog, Memory und erzeugt Commit-Message.
argument-hint: "[AP-ID, z.B. AP-20] — oder Aufgabenbeschreibung wenn kein BACKLOG-Eintrag vorhanden (Sofort-erledigt-Pfad)"
---

# Skill: abschluss-ritual

Trigger: Albert sagt „fertig" / „finale Phase" / sinngemäß — oder Claude bietet proaktiv an nach erkennbarem Task-Ende.
Argumente: $ARGUMENTS (AP-ID oder Aufgabenbeschreibung)

**Modus-Erkennung (automatisch — kein Trigger von Albert nötig):**
- **Ketten-Modus**: nächster AP nach diesem Abschluss hat denselben Serien-Präfix (z.B. B1-AP-13 → B1-AP-14). Claude erkennt das selbst. → Pro-AP-Abschluss (schlank), Voll-Abschluss am Kettenende.
- **Mini**: kleine, klar abgegrenzte Änderung ohne Code- oder Architekturwirkung, kein Serien-AP.
- **Voll**: alles andere, Kettenende, oder bei Zweifel immer Voll.

---

## Feste Pfade — keine Suche, wenn hier angegeben

Claude verwendet diese Pfade direkt. Nicht im Root raten, außer der Pfad ist ausdrücklich Root.

| Zweck | Pfad |
|---|---|
| NAVIGATION | `NAVIGATION.md` |
| Praxis-Anleitung | `PRAXIS-ANLEITUNG.md` |
| Definition of Done | `docs/steering/DEFINITION-OF-DONE.md` |
| BACKLOG | `docs/steering/BACKLOG.md` |
| BACKLOG-Archiv | `docs/steering/BACKLOG-ARCHIV.md` |
| Working Features | `docs/steering/engine/WORKING-FEATURES.md` |
| Regression-Matrix | `docs/steering/engine/REGRESSION-MATRIX.md` |
| Session-Log | `.claude/learning/session-log.md` |
| Memory-Verzeichnis | `.claude/memory/` |

Wenn ein Pfad nicht existiert:
1. Nicht im Root raten.
2. `NAVIGATION.md` prüfen.
3. Wenn weiterhin unklar: Albert fragen oder MODUS A, falls der Abschluss dadurch blockiert ist.

---

## Subagent-Nutzung im Voll-Abschluss

Nur im Voll-Abschluss. Kein Scout bei Mini-Abschluss.

Einmaliger Scout-Dispatch ist erlaubt, wenn mindestens eines gilt:
- Engine-Änderung
- Spec-/Doku-Änderung
- AP im BACKLOG unklar
- Sofort-erledigt-Pfad mit ID-Vergabe
- NAVIGATION-Relevanz unklar
- Praxis-Anleitung potenziell relevant
- mehr als 3 Steuerungsdateien müssen gelesen werden

Dann `abschluss-scout` verwenden.

Claude meldet den Aufruf sichtbar, bevor der Agent startet:

> `Abschluss-Scout (Haiku) wird gestartet: mechanische Fundstellenrecherche, keine Änderungen.`

Der Scout liefert nur Fundstellen. Die Hauptinstanz bleibt verantwortlich für:
- DoD-Bewertung
- BACKLOG-Archivierung
- MEMORY-Update
- Commit-Message
- PROJECT-STATUS
- CLAUDE.md-Regelaufnahme
- alle Dateiänderungen

Wenn kein Scout nötig ist, meldet Claude kurz:

> `Abschluss-Scout nicht nötig: Mini-Abschluss oder kein mechanischer Recherche-Scope.`

---

## Voll-Abschluss (Reihenfolge einhalten)

**0. Session-Log befüllen — PFLICHT, ZUERST, kein Ermessen**
Eintrag schreiben in `.claude/learning/session-log.md` mit Datum + AP-Titel als Header.
Jetzt schreiben, nicht bewerten — /distill bewertet später.

Challenge-Response:
"Gab es eine Korrektur oder Abweichung vom Plan?"   → j/n
"Gab es eine Überraschung oder neue Erkenntnis?"    → j/n

Beide nein:
- [OK] Keine Vorkommnisse

Mindestens eines ja — Tag nach Kriterium wählen, kein Freitext-Urteil:

Tag-Kriterien:
[FRICTION]  Albert hat eine Richtung korrigiert / ein Schritt wurde nachgeholt /
            ein Missverständnis trat auf
[WIN]       Etwas lief schneller oder sicherer als erwartet — messbar oder von Albert bestätigt
[PREF]      Albert hat eine Formulierung, Reihenfolge oder Darstellung explizit bevorzugt
[QUESTION]  Claude hat eine Annahme getroffen ohne Alberts Bestätigung

Sprach-Prinzip: beschreibend, nicht evaluativ.
Richtig:   "[FRICTION] Gate-Schritt 7 übersprungen → manuell nachgeholt"
Falsch:    "[FRICTION] Claude hat versagt"

Kein AP ohne Eintrag. Fehlendes Log = Anomalie.
Abbruch-Format (wenn Ritual unterbrochen — 1 Zeile genügt):

    ## YYYY-MM-DD – [AP-ID] (Abbruch bei Schritt [N])
    - [OK] Abbruch ohne Vorkommnis  /  [FRICTION] Grund: ...

**0a. Optionaler Abschluss-Scout (Haiku) — nur wenn Kriterien erfüllt**
Wenn die Kriterien aus „Subagent-Nutzung im Voll-Abschluss" erfüllt sind:
1. Sichtbar melden: `Abschluss-Scout (Haiku) wird gestartet: mechanische Fundstellenrecherche, keine Änderungen.`
2. `abschluss-scout` mit AP-ID/Aufgabenbeschreibung, betroffenen Dateien und bekanntem Scope beauftragen.
3. Scout-Befund lesen.
4. Nur als Zuarbeit verwenden; Bewertung und Änderungen bleiben bei der Hauptinstanz.

Wenn Kriterien nicht erfüllt sind:
- Sichtbar melden: `Abschluss-Scout nicht nötig: Mini-Abschluss oder kein mechanischer Recherche-Scope.`

**0b. NAVIGATION.md prüfen**
Pfad: `NAVIGATION.md`
Hat sich die Verzeichnisstruktur geändert? Neue Steering-, Spec- oder Template-Datei angelegt?
Datei verschoben oder umbenannt? → Sofort aktualisieren.

**0c. Definition of Done prüfen**
Pfad: `docs/steering/DEFINITION-OF-DONE.md`
Sind alle Fertig-Kriterien für diesen Aufgabentyp erfüllt?
Falls nicht: stoppen und Albert informieren, was noch fehlt.

**0d. Regression-Matrix** (nur bei Engine-Änderungen)
Pfad: `docs/steering/engine/REGRESSION-MATRIX.md`
Relevante Testfälle nennen.
Sind diese visuell geprüft? Falls nicht: Albert darauf hinweisen.

**1. Specs aktualisieren**
Betroffene Dateien in `docs/spec/` auf Aktualität prüfen.
Nur gezielte Edits, kein Vollrewrite.

**2. BACKLOG bereinigen**

War diese Aufgabe im BACKLOG registriert?

**Ja (Normalfall):**
- Abgeschlossene Zeile als ✅ in `docs/steering/BACKLOG-ARCHIV.md` verschieben (append mit Datum + Session)
- Zeile aus `docs/steering/BACKLOG.md` löschen
- `docs/steering/engine/WORKING-FEATURES.md` nur bei Engine-APs aktualisieren

**Nein (Sofort-erledigt-Pfad):**
- `docs/steering/BACKLOG-ARCHIV.md` lesen → letzten Eintrag mit passendem Domänen-Prefix finden → ID vergeben (Prefix + nächste freie Nummer). Kein passender Prefix vorhanden: bei 01 beginnen.
- Eintrag direkt in `docs/steering/BACKLOG-ARCHIV.md` schreiben (append, gleiche Tabellenzeile wie Normalfall)
- Format: `| [ID] | [Bereich] | [kurze Ergebnisbeschreibung] *(sofort erledigt)* | [Datum] | [Session] |`
- Nicht in `docs/steering/BACKLOG.md` schreiben.

**2b. Scope-Check**
Während der Arbeit an diesem AP neuen Scope entdeckt?
Beobachtungen, die nicht zum AP gehörten?
→ Jeden Fund explizit behandeln:
   - Als neuen AP in BACKLOG anlegen (mit Prio + Abhängigkeiten), ODER
   - Explizit verwerfen mit Begründung
→ Kein stilles Verschwinden — was nicht festgehalten wird, existiert nicht.

**3. MEMORY aktualisieren**
Pfad: `.claude/memory/`
Neue stabile Projektfakten, Feedback oder Entscheidungen eintragen.
Bei Änderungen in `.claude/memory/`: `python tools/check-memory-integrity.py` empfehlen oder ausführen.

**4. Commit-Message erzeugen**
Format (eigenständig — kein externer Verweis nötig): Ausgabe als reinen Text, bereit zum Einfügen in VSCode Message-Feld.
Keine git-Kommandos drum herum. Keine Code-Blöcke. Nur der Text selbst.

Pflichtfelder:
- Zeile 1: Typ + Zusammenfassung (50–72 Zeichen)
- Was war das Problem?
- Wie wurde es gelöst?
- Warum ist die Lösung sicher (keine Regressionen)?
- Betroffene Bereiche: Datei (Methode)
- Kontext: Issue / Spec / Tested

**5. CLAUDE.md** — nur wenn eine neue fundamentale, universelle Verhaltensregel entstanden ist.
[Regelaufnahme-Schutz] beachten.

**6. PROJECT-STATUS.md** — nach längeren Sessions oder Meilensteinen aktualisieren.
Bei jeder Änderung an Fokus, nächstem Schritt oder Blockern HOOK-META synchronisieren:
- `Stand`, `Fokus-AP`, `Nächster-Schritt`, `Blocker` im HOOK-META-Block aktualisieren.
- Sichtbarer Fließtext und HOOK-META dürfen nicht widersprechen — kein Widerspruch erlaubt.

---

## Ketten-Modus (sequenzielle AP-Kette)

**Auto-erkannt — kein Trigger von Albert nötig.**

**Erkennung beim Abschluss:**
Hat der nächste AP in NAVIGATION.md / BACKLOG.md denselben Serien-Präfix wie der aktuelle?
- Ja → Ketten-Modus aktiv, Pro-AP-Abschluss ausführen.
- Nein (anderer Präfix, kein nächster AP, Themenwechsel) → Kettenende → Voll-Abschluss.

**Pro AP (ca. 2 Min.):**
1. session-log — 1 Zeile ✅
2. NAVIGATION.md — AP-Status → ✅
3. PROJECT-STATUS.md — Nächster Schritt + HOOK-META synchronisieren.
   HOOK-META `Nächster-Schritt` immer mit Kettensignal schreiben:
   `Nächster-Schritt: NEXT-AP — Bezeichnung (CURRENT-AP ✅ YYYY-MM-DD)`
   → Das ist das maschinenlesbare Signal für den Ketten-Modus-Check beim nächsten Faden-Start.
4. Commit-Message ausgeben.

**Am Kettenende (einmalig, automatisch als Voll-Abschluss):**
5. BACKLOG-ARCHIV.md — alle Ketten-APs archivieren.
6. BACKLOG.md — alle Ketten-APs entfernen.
7. MEMORY.md — einmal aktualisieren.
8. Specs prüfen (Schritt 1) — falls Spec-Dateien während der Kette geändert wurden.

Nicht verzichtbar pro AP (Hook liest diese Felder beim Session-Start):
NAVIGATION.md, PROJECT-STATUS.md HOOK-META, session-log.

Akzeptierte Inkonsistenz bis Kettenende:
Lücken-Alarm beim /start feuert für BACKLOG-ARCHIV — ist im Ketten-Modus erwartetes Verhalten.

---

## Mini-Abschluss

Nur Stand-Datum der berührten Steering-Dateien aktualisieren und Commit-Message erzeugen.
Kein Abschluss-Scout.
Kein BACKLOG-/MEMORY-/PROJECT-STATUS-Update, außer Albert verlangt es ausdrücklich.

---

## Pflicht bei jeder berührten Steering-Datei

Erste Zeile aktualisieren:

```
Stand: YYYY-MM-DD HH:MM | Session: [Name] | Geändert von: Claude
```
```

---

## 10. Fragen an die Reviewer

1. **HOOK-META-Risiko**: Ist Haiku mit einem exakten String-Input für das HOOK-META-Edit sicher genug — oder sollte dieser Schritt bei Sonnet bleiben, auch wenn es Token kostet?

2. **DEFERRED-Marker-Format**: Ist `| DEFERRED: ARCHIV MEMORY SPECS |` robust genug für maschinelles Parsen? Oder besser JSON? YAML? Separates File?

3. **Context-First-Erkennung**: Kann Sonnet den Modus zuverlässig aus Konversationskontext + HOOK-META erkennen, ohne Files zu lesen? Was sind die Randfälle?

4. **Agent-Overhead-Schwelle**: Ab welcher Kettenlänge lohnt sich ein Haiku-Dispatch für Pro-AP? Oder lohnt er sich immer?

5. **Verifikation**: Wieviel Verifikation braucht es nach Haiku-Writes, damit kein stiller Drift entsteht? Kann Haiku selbst verifizieren, oder muss Sonnet nachprüfen?

6. **Alternativen**: Gibt es Ansätze, die wir nicht gesehen haben? Andere Verteilungen von Sonnet/Haiku? Andere Skill-Strukturen?

7. **Mini-Abschluss**: Der Mini-Pfad ist aktuell underspezifiziert ("berührte Steering-Dateien" — welche?). Ist der vorgeschlagene Fix (Datei aus eigener Edit-History) robust? Oder braucht Mini einen anderen Ansatz?

---

## 11. Zusammenfassung der Entscheidungsmatrix

| Eigenschaft | Pfad A (Voll) | Pfad B (Ketten Pro-AP) | Pfad C (Mini) |
|---|---|---|---|
| Frequenz | niedrig | sehr hoch | mittel |
| Token-Kosten heute | ~2500 | ~1200 | ~600 |
| Lücken akzeptabel? | nein | ja (explizit) | nein |
| Haiku-Potenzial | mittel (Scout vorhanden) | hoch | mittel |
| Kritischster Schritt | BACKLOG-Archivierung | HOOK-META | Stand-Datum |
| Optimierungs-Priorität | niedrig (akzeptabel) | sehr hoch | mittel |
