---
name: abschluss-ritual
description: Abschluss-Ritual nach Fertigstellung einer Aufgabe in Finanzwesir 2.0. Aktualisiert start- und steuerungskritische Projektartefakte, verhindert Drift und erzeugt Commit-Message.
argument-hint: "[AP-ID, z.B. B1-AP-14e2] — optional. Albert muss kein Argument mitgeben."
---

# Skill: abschluss-ritual

Trigger: Albert sagt „fertig“, „finale Phase“, „abschließen“, „mach den Abschluss“ oder sinngemäß — oder Claude bietet den Skill proaktiv an, wenn ein AP erkennbar fertig ist.

Ziel: Abschluss zuverlässig machen, ohne den hochfrequenten AP-Abschluss unnötig teuer zu machen.

Leitsatz:

> **Genau schlägt preiswert. Token sparen ist erlaubt, solange keine start- oder steuerungskritische Wahrheit auf später verschoben wird.**

---

## 0. Grundsätze

### 0.1 Prozessverantwortung

Albert muss sich den Abschlussmodus nicht merken. Claude trägt die Prozessverantwortung.

Claude darf interaktiv fragen, wenn der Abschlussmodus nicht sicher ist. Das ist kein Fehler, sondern Drift-Schutz.

Albert soll nur antworten müssen, nicht das Ritual im Kopf behalten.

### 0.2 Kein startkritischer Drift

Nach jedem echten AP-Abschluss müssen alle start- und steuerungskritischen Artefakte stimmen.

Start- und steuerungskritisch sind:

| Artefakt | Warum kritisch? |
|---|---|
| `PROJECT-STATUS.md` | Wird vom nächsten `/start` gelesen |
| HOOK-META in `PROJECT-STATUS.md` | Maschinenlesbares Startsignal |
| `NAVIGATION.md` | Routing und Projektkarte |
| `docs/steering/BACKLOG.md` | Offene Arbeit |
| `docs/steering/BACKLOG-ARCHIV.md` | Erledigte Arbeit |
| `.claude/learning/session-log.md` | lückenlose AP-Spur |

Diese Artefakte werden bei jedem echten AP-Abschluss sofort aktualisiert. Nicht am Kettenende. Nicht später.

### 0.3 Was deferred werden darf

Deferred ist nur für nicht-startkritische Reflexionsarbeit erlaubt:

- `MEMORY-CHECK`
- `SPEC-CHECK`
- `WORKING-FEATURES-CHECK`

Nicht deferred werden dürfen:

- `PROJECT-STATUS`
- HOOK-META
- `NAVIGATION`
- `BACKLOG`
- `BACKLOG-ARCHIV`
- `DOD`
- session-log

### 0.4 Bei Zweifel sicherer Modus

Wenn Claude unsicher ist:

1. Rückfrage an Albert.
2. Wenn Antwort unklar bleibt: Voll-Abschluss.
3. Kein stilles Raten.
4. Kein Kettenmodus aus Hoffnung.

---

## 1. Feste Pfade

Claude verwendet diese Pfade direkt. Nicht im Root raten, außer der Pfad ist ausdrücklich Root.

| Zweck | Pfad |
|---|---|
| NAVIGATION | `NAVIGATION.md` |
| Praxis-Anleitung | `PRAXIS-ANLEITUNG.md` |
| PROJECT-STATUS | `PROJECT-STATUS.md` |
| Definition of Done | `docs/steering/DEFINITION-OF-DONE.md` |
| BACKLOG | `docs/steering/BACKLOG.md` |
| BACKLOG-Archiv | `docs/steering/BACKLOG-ARCHIV.md` |
| Working Features | `docs/steering/engine/WORKING-FEATURES.md` |
| Regression-Matrix | `docs/steering/engine/REGRESSION-MATRIX.md` |
| Session-Log | `.claude/learning/session-log.md` |
| Memory-Verzeichnis | `.claude/memory/` |
| Haiku-Scout | `.claude/agents/abschluss-scout.md` |
| Haiku-Writer | `.claude/agents/abschluss-writer.md` |

Wenn ein Pfad nicht existiert:

1. Nicht raten.
2. Nur wenn für den Abschluss zwingend: `NAVIGATION.md` prüfen.
3. Wenn weiterhin unklar: Albert fragen oder Voll-Abschluss.

---

## 2. Modus-Erkennung

### 2.1 Ziel

Der Modus soll korrekt sein, nicht maximal autonom.

Claude prüft zuerst Kontext, AP-Status und eigene Edit-History. Wenn das nicht reicht, fragt Claude.

### 2.2 Modi

| Modus | Zweck |
|---|---|
| Pfad A — Voll-Abschluss | Sicherheitsanker; bei Kettenende, Unsicherheit, Scope, Engine, Spec, Memory, Regression |
| Pfad B — Ketten-Minimalabschluss | AP ist fertig, nächster AP derselben Serie folgt direkt |
| Pfad C — Mini-Abschluss | Kleine Doku-/Steering-Korrektur ohne AP-/Projektstatuswirkung |

### 2.3 Sichere Erkennung ohne Rückfrage

Claude kann ohne Rückfrage entscheiden, wenn der Fall eindeutig ist:

| Signal | Modus |
|---|---|
| Aktueller AP ist fertig, Nachfolge-AP derselben Serie ist bekannt, keine offene Bewertung | Ketten-Minimalabschluss |
| Themenblock abgeschlossen, Kettenende, kein nächster Serien-AP | Voll-Abschluss |
| Code-/Engine-/Spec-/Memory-/Backlog-/Scope-Relevanz | Voll-Abschluss |
| Nur kleine Doku-/Header-Korrektur, keine AP-Wirkung | Mini-Abschluss |

### 2.4 Rückfrage statt Raten

Wenn Claude nicht sicher ist, genau diese Frage stellen:

```text
Ich bin beim Abschlussmodus nicht sicher.

Welche Art Abschluss soll ich machen?

1. Ketten-Minimalabschluss — AP ist fertig, nächster AP folgt direkt
2. Vollabschluss — Themenblock/Session sauber abschließen
3. Miniabschluss — nur kleine Doku-/Steering-Korrektur

Wenn du unsicher bist: Vollabschluss.
```

Regeln:

- Keine Datei-Vollscans nur zur Modusbestimmung.
- Keine stille Default-Annahme auf Kettenmodus.
- Wenn Albert nicht eindeutig antwortet: Vollabschluss.
- Wenn HOOK-META, BACKLOG oder NAVIGATION widersprüchlich wirken: Rückfrage oder Vollabschluss.
- Interaktivität ist erlaubt. Albert soll nur antworten müssen, nicht den Prozess selbst im Kopf behalten.

### 2.5 Minimaler technischer Fallback

Wenn nur die technische Lage unklar ist, darf Claude gezielt prüfen:

- HOOK-META aus den ersten 10–15 Zeilen von `PROJECT-STATUS.md`
- konkrete AP-Zeile in `BACKLOG.md`
- konkrete AP-Zeile in `NAVIGATION.md`

Nicht erlaubt:

- NAVIGATION/BACKLOG/PROJECT-STATUS komplett lesen, nur um den Modus zu erraten.
- mehrere Steuerdateien breit lesen, bevor eine Rückfrage gestellt wurde.

---

## 3. Pfad B — Ketten-Minimalabschluss

### 3.1 Zweck

Der Ketten-Minimalabschluss ist nicht „lückenhaft“. Er ist ein vollständiger Abschluss aller start- und steuerungskritischen Artefakte mit kurzer Commit-Message.

### 3.2 Voraussetzungen

Ketten-Minimalabschluss nur wenn:

- `CURRENT-AP` sicher identifiziert ist.
- `NEXT-AP` derselben Serie sicher bekannt ist oder von Albert bestätigt wurde.
- AP ist tatsächlich fertig.
- Keine offene DoD-/Regression-/Scope-Frage.
- Keine neue stabile Projektentscheidung, die sofort in MEMORY muss.
- Keine normative Spec-Änderung, die sofort dokumentiert werden muss.
- Keine widersprüchlichen Steuerdateien.

Bei Zweifel: Rückfrage oder Voll-Abschluss.

### 3.3 Pflichtschritte pro AP

Bei jedem Ketten-Minimalabschluss sofort erledigen:

1. `.claude/learning/session-log.md`: AP-Eintrag.
2. `NAVIGATION.md`: AP-Status auf ✅ setzen.
3. `PROJECT-STATUS.md`: nächster Schritt + HOOK-META synchronisieren.
4. `docs/steering/BACKLOG.md`: erledigten AP entfernen.
5. `docs/steering/BACKLOG-ARCHIV.md`: erledigten AP eintragen.
6. Commit-Message im Kurzformat ausgeben.

### 3.4 Deferred nur für Reflexion

Optional im session-log markieren:

```markdown
### YYYY-MM-DD — AP-ID ✅ | DEFERRED: MEMORY-CHECK SPEC-CHECK
```

Erlaubte Tokens:

- `MEMORY-CHECK`
- `SPEC-CHECK`
- `WORKING-FEATURES-CHECK`

Kein anderer DEFERRED-Token ist erlaubt.

Wenn nichts aufzuschieben ist:

```markdown
### YYYY-MM-DD — AP-ID ✅
```

### 3.5 Kettenkredit

Ketten-Minimalabschluss darf nicht endlos Reflexionsarbeit aufschieben.

Regel:

- Maximal 3 Ketten-Minimalabschlüsse mit offenen DEFERRED-Markern, oder
Danach: Voll-Abschluss oder gezielter Reflexions-Check.

### 3.6 PROJECT-STATUS / HOOK-META

HOOK-META `Nächster-Schritt` immer mit Kettensignal schreiben:

```text
Nächster-Schritt: NEXT-AP — Bezeichnung (CURRENT-AP ✅ YYYY-MM-DD)
```

Beispiel:

```text
Nächster-Schritt: B1-AP-14e3 — Animation finalisieren (B1-AP-14e2 ✅ 2026-06-19)
```

Nach HOOK-META-Änderung:

- geschriebenen HOOK-META-Block prüfen,
- sichtbaren Text und HOOK-META auf Widerspruch prüfen,
- falls Validator vorhanden: ausführen.

### 3.7 BACKLOG / ARCHIV

BACKLOG und BACKLOG-ARCHIV dürfen im Kettenmodus nicht deferred werden.

Mechanische Regel:

- Aus `BACKLOG.md` genau die Zeile für `CURRENT-AP` entfernen.
- In `BACKLOG-ARCHIV.md` genau eine Archiv-Zeile für `CURRENT-AP` append.
- Wenn AP-Zeile nicht eindeutig ist: Voll-Abschluss.

Archiv-Zeilen müssen dem vorhandenen Tabellenformat in `BACKLOG-ARCHIV.md` entsprechen. Wenn das Tabellenformat unklar ist: gezielt Kopfzeile und eine passende Nachbarzeile lesen, nicht raten.

### 3.8 BACKLOG-FAIL Recovery

Wenn der Writer bei BACKLOG/ARCHIV scheitert:

1. Sonnet liest gezielt nur die konkrete AP-Zeile in `BACKLOG.md` anhand der AP-ID.
2. Sonnet baut daraus den exakten Literal für einen zweiten Writer-Versuch.
3. Kein Vollscan.
4. Kein Retry-Loop.
5. Bei zweitem FAIL: Voll-Abschluss und Albert auf manuelle Bereinigung hinweisen.

Das ist ein Einmal-Fallback, keine neue Schleife.

### 3.9 Haiku-Writer im Kettenmodus

Haiku darf mechanische Edits ausführen, wenn Sonnet Zielstrings exakt vorgibt.

Haiku darf:

- session-log-Zeile anhängen
- NAVIGATION-Zeile auf ✅ setzen
- HOOK-META-Literal ersetzen
- BACKLOG-Zeile entfernen
- ARCHIV-Zeile append

Haiku darf nicht:

- AP bestimmen
- Modus bestimmen
- BACKLOG interpretieren
- MEMORY schreiben
- Specs aktualisieren
- DoD bewerten
- Commit-Message formulieren

Pflicht-Echo nach kritischen Edits:

```text
ECHO session-log:
[geschriebene Zeile]

ECHO HOOK-META:
[geschriebener Block]

BACKLOG:
removed 1 line for CURRENT-AP

ARCHIV:
appended exact line for CURRENT-AP
```

Bei Abweichung: stoppen und Voll-Abschluss.

---

## 4. Pfad B — Kettenende / Reflexions-Check

Kettenende liegt vor, wenn:

- kein Nachfolge-AP derselben Serie folgt,
- Albert Themenwechsel signalisiert,
- der Kettenkredit aufgebraucht ist,
- offene DEFERRED-Marker geprüft werden müssen,
- oder Claude unsicher wird.

Am Kettenende:

1. Offene `MEMORY-CHECK`, `SPEC-CHECK`, `WORKING-FEATURES-CHECK` seit letztem `RECONCILED:` sammeln.
2. MEMORY gezielt prüfen.
3. Specs gezielt prüfen.
4. WORKING-FEATURES nur bei Engine-APs prüfen.
5. Reconciliation-Zeile schreiben:

```markdown
### YYYY-MM-DD — Kettenabschluss ✅ | RECONCILED: AP-ID AP-ID AP-ID
```

6. Wenn Änderungen entstanden: Langformat-Commit-Message.
7. Wenn keine Änderungen entstanden: kurze Notiz, dass keine weitere Commit-Message nötig ist.

### 4.1 Sessionwechsel mit offenen DEFERRED-Markern

Wenn `/start` offene DEFERRED-Marker meldet:

- erster Schritt der neuen Session ist der Reflexions-Check nach Abschnitt 4,
- nicht direkt das nächste AP,
- falls `/start` offene Marker nur meldet, aber nicht interpretieren kann: als eigenes Folge-AP `/start-DEFERRED-Erkennung` aufnehmen.

Die eigentliche `/start`-Anpassung ist ein separater AP und nicht Teil dieses Skills.

---

## 5. Pfad C — Mini-Abschluss

Mini-Abschluss ist eng begrenzt.

Erlaubt nur wenn:

- keine AP-ID betroffen,
- keine Code-Datei geändert,
- keine Engine-/Architekturwirkung,
- keine normative Spec-Änderung,
- keine neue/verschobene Datei,
- keine BACKLOG-/ARCHIV-/PROJECT-STATUS-/MEMORY-Wirkung,
- maximal 5 Dateien im aktuellen Turn,
- Datei-Edit-History sicher bekannt.

Schritte:

1. Dateien aus eigener Turn-Edit-History identifizieren.
2. Nur bei berührten Steering-Dateien Stand-Header aktualisieren:

```text
Stand: YYYY-MM-DD HH:MM | Session: [Name] | Geändert von: Claude
```

3. Commit-Message im Kurzformat ausgeben.

Kein Scout. Kein Writer. Kein BACKLOG. Kein MEMORY. Kein PROJECT-STATUS.

Wenn keine Edit-History sicher verfügbar ist: kein Mini, sondern Voll-Abschluss oder Rückfrage.

---

## 6. Pfad A — Voll-Abschluss

Voll-Abschluss ist der Sicherheitsanker. Hier nicht aggressiv tokenoptimieren.

### 6.1 Auslöser

Voll-Abschluss bei:

- Kettenende
- unklarem Modus nach Rückfrage
- Engine-Änderung mit Regressionseffekt
- Spec-Änderung mit normativer Wirkung
- neuer stabiler Projektentscheidung
- Scope-Fund
- Sofort-erledigt-Pfad mit ID-Vergabe
- fehlender DoD-Klarheit
- HOOK-META-/BACKLOG-/NAVIGATION-Widerspruch
- nach spätestens 3 Ketten-Minimalabschlüssen mit offenen DEFERRED-Markern

### 6.2 Session-log zuerst

Eintrag in `.claude/learning/session-log.md` mit Datum + AP-Titel.

Challenge-Response:

- Gab es eine Korrektur oder Abweichung vom Plan? → j/n
- Gab es eine Überraschung oder neue Erkenntnis? → j/n

Beide nein:

```markdown
- [OK] Keine Vorkommnisse
```

Mindestens eines ja — Tag wählen:

- `[FRICTION]` Albert hat Richtung korrigiert / Schritt wurde nachgeholt / Missverständnis
- `[WIN]` Etwas lief schneller oder sicherer als erwartet — messbar oder bestätigt
- `[PREF]` Albert hat Formulierung, Reihenfolge oder Darstellung bevorzugt
- `[QUESTION]` Claude traf Annahme ohne Bestätigung

Sprachprinzip: beschreibend, nicht evaluativ.

Abbruchformat:

```markdown
## YYYY-MM-DD – [AP-ID] (Abbruch bei Schritt [N])
- [OK] Abbruch ohne Vorkommnis / [FRICTION] Grund: ...
```

### 6.3 Optionaler Abschluss-Scout

Scout ist erlaubt, wenn mechanische Fundstellenrecherche hilft.

Scout-Kriterien:

- Engine-Änderung
- Spec-/Doku-Änderung mit unklarem Scope
- AP im BACKLOG unklar
- Sofort-erledigt-Pfad mit ID-Vergabe
- NAVIGATION-Relevanz unklar
- Praxis-Anleitung potenziell relevant
- mehr als 3 Steuerungsdateien müssen gelesen werden

Sichtbare Meldung:

```text
Abschluss-Scout (Haiku) wird gestartet: mechanische Fundstellenrecherche, keine Änderungen.
```

Scout liefert nur Fundstellen. Bewertung bleibt bei Sonnet.

### 6.4 DoD und Regression

- `docs/steering/DEFINITION-OF-DONE.md` prüfen.
- Bei Engine-Änderungen relevante Fälle aus `docs/steering/engine/REGRESSION-MATRIX.md` nennen.
- Wenn visuelle Prüfung fehlt: Albert klar informieren.

### 6.5 Specs

Betroffene Dateien in `docs/spec/` gezielt aktualisieren. Kein Vollrewrite.

### 6.6 BACKLOG und Archiv

Normalfall:

- erledigte Zeile aus `docs/steering/BACKLOG.md` entfernen.
- erledigte Zeile mit Datum + Session in `docs/steering/BACKLOG-ARCHIV.md` append.
- `docs/steering/engine/WORKING-FEATURES.md` nur bei Engine-APs aktualisieren.

Sofort-erledigt-Pfad:

- `BACKLOG-ARCHIV.md` lesen.
- letzten passenden Domänen-Prefix finden.
- nächste freie ID vergeben.
- direkt ins Archiv schreiben.
- nicht in BACKLOG schreiben.

### 6.7 Scope-Check

Neuen Scope explizit behandeln:

- als neuen AP in BACKLOG aufnehmen, oder
- mit Begründung verwerfen.

Nichts still verschwinden lassen.

### 6.8 MEMORY

`.claude/memory/` nur aktualisieren bei stabilen Projektfakten, Entscheidungen oder wiederverwendbarem Feedback.

Nach Änderungen in `.claude/memory/`:

- `python tools/check-memory-integrity.py` empfehlen oder ausführen, falls vorhanden.

### 6.9 PROJECT-STATUS

Bei jeder Änderung an Fokus, nächstem Schritt oder Blockern:

- sichtbaren Fließtext aktualisieren,
- HOOK-META synchronisieren,
- HOOK-META prüfen,
- Validator ausführen, falls vorhanden.

Sichtbarer Text und HOOK-META dürfen nicht widersprechen.

### 6.10 CLAUDE.md

Nur wenn eine neue fundamentale, universelle Verhaltensregel entstanden ist. Sonst nicht.

---

## 7. Commit-Message-Formate

Ausgabe immer als reiner Text für VSCode Message-Feld.

Keine Code-Blöcke. Keine git-Kommandos.

### 7.1 Kurzformat für Pfad B und C

```text
B1-AP-14e2: fwVerticalLine ausgelagert

Bereiche: FwChartPlugins.js, ChartEngine.js
Sicher: opt-in, Standardcharts unverändert, Smoke-Test grün
```

Regeln:

- Zeile 1: AP-ID + Ergebnis, knapp.
- `Bereiche:` wichtigste Dateien.
- `Sicher:` warum keine offensichtliche Regression.

### 7.2 Langformat für Pfad A

Pflichtfelder:

- Zeile 1: Typ + Zusammenfassung, 50–72 Zeichen.
- Was war das Problem?
- Wie wurde es gelöst?
- Warum ist die Lösung sicher?
- Betroffene Bereiche: Datei (Methode/Abschnitt)
- Kontext: Issue / Spec / Tested

---

## 8. Ausgabe-Disziplin

Während des Abschlusses:

- keine langen Erklärungen,
- keine Schritt-für-Schritt-Erzählung,
- nur melden, wenn Scout/Writer gestartet wird, ein Validator scheitert, eine Rückfrage nötig ist oder ein Abschluss blockiert ist.

Am Ende:

- Commit-Message,
- ggf. knapper Hinweis auf offene manuelle Tests,
- ggf. Hinweis auf Reconciliation.

---

## 9. Merksatz

> **Wir sparen nicht, indem wir Genauigkeit weglassen. Wir sparen, indem Claude nicht rät, nicht unnötig liest, nicht labert und mechanische Arbeit nicht mit Sonnet erledigt.**
