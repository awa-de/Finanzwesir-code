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

### 0.5 Keine sichtbare Modus-Oszillation

Claude denkt die Moduswahl intern durch. Sichtbar wird nur:

- die klare Modusentscheidung, oder
- eine Rückfrage, wenn die Entscheidung nicht sicher ist.

Nicht sichtbar ausgeben:

- „Ich überlege, ob Mini passt...“
- „Vielleicht Voll, vielleicht Zwischenaufgabe...“
- „Ich muss noch einmal nachdenken...“

Wenn unsicher: fragen. Wenn sicher: knapp entscheiden.

### 0.6 Aufwand nach Schwierigkeit — Determinismus zuerst

Der Abschluss skaliert mit der Schwierigkeit, nicht mit dem Modell-Budget. Determinismus liefert Genauigkeit **und** spart — das ist kein Widerspruch zum Leitsatz, sondern seine Umsetzung. (Operationalisiert den Merksatz aus §10.)

- **Standardausführung: Sonnet.** Opus-Niveau-Reasoning nur bei echtem Urteil: unklarer Modus, Scope-Fund, Spec-Konflikt, Regression, widersprüchliche Steuerdateien.
- **Mechanik ist mechanisch:** session-log-Append, Archiv-Append, BACKLOG-Zeile entfernen, NAVIGATION-✅-Flip, HOOK-META-Ersatz, Validator, Rotation laufen über Python-Tools bzw. den Haiku-Writer — nicht über Modell-Reasoning.
- **Nicht doppelt arbeiten:** nicht lesen, was ein Tool liefert; nicht verifizieren, was ein Assert/Validator garantiert; kein mehrfaches Gegenlesen derselben Datei.
- **Die Hauptinstanz komponiert Literale einmal** und übergibt sie an Writer/Tools. Danach kein erneutes Lesen der Zieldatei.

Je einfacher der Abschluss, desto näher an null Modell-Reasoning. Nur der schwierige Abschluss (Pfad A mit echtem Urteil) darf teuer denken.

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
| Pfad D — Housekeeping-Abschluss | Infrastruktur-/Aufräumaufgabe ohne AP-ID und ohne Änderung am fachlichen Projektstatus |

### 2.3 Sichere Erkennung ohne Rückfrage

Claude kann ohne Rückfrage entscheiden, wenn der Fall eindeutig ist:

| Signal | Modus |
|---|---|
| Aktueller AP ist fertig, Nachfolge-AP derselben Serie ist bekannt, keine offene Bewertung | Ketten-Minimalabschluss |
| Themenblock abgeschlossen, Kettenende, kein nächster Serien-AP | Voll-Abschluss |
| Code-/Engine-/Spec-/Memory-/Backlog-/Scope-Relevanz | Voll-Abschluss |
| Nur kleine Doku-/Header-Korrektur, keine AP-Wirkung | Mini-Abschluss |
| Infrastruktur-/Housekeeping-Aufgabe ohne AP-ID, keine fachliche Projektstatusänderung, kein BACKLOG-AP | Housekeeping-Abschluss |

### 2.4 Rückfrage statt Raten

Wenn Claude nicht sicher ist, ob es Ketten-Minimalabschluss, Vollabschluss oder Miniabschluss ist, genau diese Frage stellen:

```text
Ich bin beim Abschlussmodus nicht sicher.

Welche Art Abschluss soll ich machen?

1. Ketten-Minimalabschluss — AP ist fertig, nächster AP folgt direkt
2. Vollabschluss — Themenblock/Session sauber abschließen
3. Miniabschluss — nur kleine Doku-/Steering-Korrektur

Wenn du unsicher bist: Vollabschluss.
```

Wenn es wie eine Infrastruktur-/Housekeeping-Aufgabe ohne AP-ID aussieht, genau diese Frage stellen:

```text
Das wirkt wie eine Infrastruktur-/Housekeeping-Aufgabe ohne AP-ID.

Soll ich einen schlanken Housekeeping-Abschluss machen?

1. Ja — session-log + Commit, PROJECT-STATUS bleibt unverändert
2. Nein — Vollabschluss

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
- bei Housekeeping: gezielt prüfen, ob neue dauerhafte Steering-/Skill-/Agent-Dateien routing-relevant sind

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
6. Commit-Message im Langformat ausgeben.

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

**§1 „Aktueller Fokus" ist Snapshot, kein Log:** nächster Schritt (1 Zeile) + max. ~5 Meilensteine, **je genau eine Zeile** im Format `- **AP-ID** (YYYY-MM-DD) ✅ Kurzbeschreibung`. Der Volltext gehört ins BACKLOG-ARCHIV, nie in §1. Beim Abschluss: neue Meilenstein-Zeile oben einfügen, älteste entfernen (rollierendes Fenster). Kein Absatz, keine Wiederholung des Archiv-Texts. Der Größen-Riegel im Validator (FAIL>50 KB) fängt Rückfall ab.

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
- Validator **unbedingt** ausführen (kein „falls vorhanden" — der Riegel existiert seit 2026-07-12):
  `python tools/check-project-status-hook-meta.py PROJECT-STATUS.md --expect-current-ap CURRENT-AP --expect-date YYYY-MM-DD`
  Exit ≠ 0 → HOOK-META ist verriegelt: **Ritual stoppt sofort**, kein Commit, Fehlermeldung wörtlich an Albert. Kein Durchwinken. Der Validator setzt die Feld-Whitelist und die Längengrenzen hart durch — er ist der Riegel gegen stille Phantom-Felder (Lehre aus `Nebenabschluss`, das ~14.000 Zeichen groß wurde, weil das Schema nie maschinell durchgesetzt war).

Wenn der Text eine Commit-Status-Aussage enthält („committed“, „Commit steht aus“, „noch nicht committed“): vorher `git log --oneline -5` gegen die Behauptung prüfen, nicht aus einer Vorlage oder Vorgänger-Session übernehmen (Reoccurrence 2026-07-04/2026-07-06, siehe [[feedback-gruendlichkeit-vor-tempo]]).

### 3.7 BACKLOG / ARCHIV

BACKLOG und BACKLOG-ARCHIV dürfen im Kettenmodus nicht deferred werden.

Mechanische Regel:

- Aus `BACKLOG.md` genau die Zeile für `CURRENT-AP` entfernen.
- In `BACKLOG-ARCHIV.md` genau eine Archiv-Zeile für `CURRENT-AP` **ans Ende** anhängen — read-frei über das Tool, nie per Voll-Read:
  `python tools/append-log-line.py docs/steering/BACKLOG-ARCHIV.md --line "<Archiv-Zeile>" --unless-contains "<CURRENT-AP-ID>"`
  Das Tool hängt ans Dateiende an (neueste unten) und überspringt bei bereits vorhandener AP-ID (Dublettensperre). Das Archiv wird dabei nie in den Kontext gelesen.
- Wenn AP-Zeile nicht eindeutig ist: Voll-Abschluss.

Die Archiv-Zeile folgt dem Tabellenformat aus dem Writer-Kontrakt (`abschluss-writer.md` §5). Das Format ist dort dokumentiert — kein Nachbarzeilen-Lesen aus dem Archiv nötig.

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


## 6. Pfad D — Housekeeping-Abschluss

### 7.1 Zweck

Housekeeping-Abschluss ist für Infrastruktur-/Aufräumaufgaben ohne AP-ID, die dokumentations- oder steuerungsnah sind, aber den fachlichen Projektstatus nicht ändern.

Beispiele:

- Skill installiert oder ersetzt
- Agent installiert oder ersetzt
- Steering-Doku ergänzt
- temporäre Dateien/Verzeichnisse aufgeräumt
- Review-Paket einsortiert
- keine App-/Engine-Codeänderung
- keine Änderung des fachlichen nächsten AP
- kein BACKLOG-AP

### 7.2 Voraussetzungen

Housekeeping-Abschluss nur wenn:

- keine formale AP-ID betroffen ist,
- kein BACKLOG-Eintrag existiert oder aktualisiert werden muss,
- `PROJECT-STATUS.md` fachlich unverändert bleiben kann,
- keine App-/Engine-/Spec-Arbeit abgeschlossen wurde,
- keine neue Projektentscheidung entstand, die sofort in MEMORY muss,
- keine Routingänderung zwingend ist, außer sie wird gezielt geprüft.

Wenn unsicher: Rückfrage nach Abschnitt 2.4 oder Voll-Abschluss.

### 7.3 Pflichtschritte

1. `.claude/learning/session-log.md`: knapper Eintrag zur Housekeeping-Aufgabe.
2. `PROJECT-STATUS.md`: nur prüfen/ändern, wenn der fachliche nächste Schritt betroffen sein könnte.
3. `NAVIGATION.md`: nur prüfen/ändern, wenn neue dauerhafte Steering-/Skill-/Agent-Dateien routing-relevant sind.
4. `BACKLOG.md` und `BACKLOG-ARCHIV.md`: nicht anfassen, wenn keine AP-ID und kein formaler Sofort-erledigt-AP vorliegt.
5. Commit-Message im kurzen oder mittleren Format ausgeben.

### 7.4 Session-log-Format

```markdown
### YYYY-MM-DD — Housekeeping: [kurze Beschreibung] ✅
- [OK] [knappe Ergebnisliste]
```

Optional bei stabiler Präferenz oder Korrektur:

```markdown
- [PREF] [knappe Präferenz]
- [FRICTION] [knappe Korrektur]
```

Keine langen Erklärungen.

### 7.5 Commit-Message für Housekeeping

Kurz- bis Mittelformat:

```text
Abschluss-Ritual: Finalpaket installiert

Bereiche: .claude/skills/abschluss-ritual/SKILL.md, .claude/agents/abschluss-writer.md
Sicher: PROJECT-STATUS bleibt unverändert, kein BACKLOG-AP betroffen
```

Wenn mehrere Dateien betroffen sind, `Bereiche:` knapp halten. Keine lange Historie wiederholen.

---

## 7. Pfad A — Voll-Abschluss

Voll-Abschluss ist der Sicherheitsanker. Hier nicht aggressiv tokenoptimieren.

### 7.1 Auslöser

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
- Housekeeping-Fall, der doch fachlichen Projektstatus oder BACKLOG berührt

### 7.2 Session-log zuerst

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

### 7.3 Optionaler Abschluss-Scout

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

### 7.4 DoD und Regression

- `docs/steering/DEFINITION-OF-DONE.md` prüfen.
- Bei Engine-Änderungen relevante Fälle aus `docs/steering/engine/REGRESSION-MATRIX.md` nennen.
- Wenn visuelle Prüfung fehlt: Albert klar informieren.

### 7.5 Specs

Betroffene Dateien in `docs/spec/` gezielt aktualisieren. Kein Vollrewrite.

### 7.6 BACKLOG und Archiv

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

### 7.7 Scope-Check

Neuen Scope explizit behandeln:

- als neuen AP in BACKLOG aufnehmen, oder
- mit Begründung verwerfen.

Nichts still verschwinden lassen.

### 7.8 MEMORY

`.claude/memory/` nur aktualisieren bei stabilen Projektfakten, Entscheidungen oder wiederverwendbarem Feedback.

Nach Änderungen in `.claude/memory/`:

- `python tools/check-memory-integrity.py` empfehlen oder ausführen, falls vorhanden.

### 7.9 PROJECT-STATUS

Bei jeder Änderung an Fokus, nächstem Schritt oder Blockern:

- sichtbaren Fließtext aktualisieren (§1 = Ein-Zeilen-Meilensteine, rollierendes Fenster — §1-Snapshot-Regel aus §3.6),
- HOOK-META synchronisieren,
- HOOK-META prüfen,
- Validator ausführen, falls vorhanden.

Sichtbarer Text und HOOK-META dürfen nicht widersprechen.

Commit-Status-Aussagen immer gegen `git log --oneline -5` prüfen, bevor sie geschrieben werden — auch wenn eine Vorlage oder ein Vorgänger-Text das bereits behauptet.

### 7.10 CLAUDE.md

Nur wenn eine neue fundamentale, universelle Verhaltensregel entstanden ist. Sonst nicht.

---

## 8. Commit-Message-Formate

Ausgabe immer als reiner Text für VSCode Message-Feld.

Keine Code-Blöcke. Keine git-Kommandos.

### 8.1 Langformat für Pfad A und B (Voll-Abschluss und Ketten-Minimalabschluss)

Pflichtfelder:

- Zeile 1: AP-ID + Ergebnis, 50–72 Zeichen.
- Was war das Problem / der Ausgangszustand?
- Wie wurde es gelöst?
- Warum ist die Lösung sicher (keine Regressionen)?
- Betroffene Bereiche: Datei (Methode/Abschnitt)
- Kontext: Kette / Spec / Tested

Hintergrund: Die Langform ist Pflicht für alle Abschlüsse mit Projektgeschichte.
Ziel ist eine spätere Debrief-Analyse („Was haben wir gemacht und warum?") —
git-History muss sich selbst erklären, kein Nachschlagen in anderen Artefakten nötig.

Beispiel:

```text
feat(B1-AP-14e9): Plugin-Barrel anlegen — plugins/index.js als kanonischer Exportpunkt

Was war das Problem?
Nach AP-14e6 (Shim entfernt) und AP-14e8 (FwBarLayoutPlugin als Dead State entfernt)
importierten ChartEngine.js, LineChartStrategy.js und PieChartStrategy.js ihre Plugins
noch direkt aus einzelnen Plugin-Dateien — kein zentraler Exportpunkt, inkonsistente
Importstruktur.

Wie wurde es gelöst?
plugins/index.js NEU: 4 Named Re-Exports (CenterTextPlugin, CrosshairPlugin,
FwAnnotationPulsePlugin, FwVerticalLinePlugin). Kein FwBarLayoutPlugin — AP-14e8 hat
diesen Dead State entfernt. Kein Chart.register(), keine Registry, keine Logik.
Alle 3 Konsumenten auf ../plugins/index.js umgestellt.

Warum ist die Lösung sicher (keine Regressionen)?
ES-Modul-Re-Exports sind semantisch identisch zu Direktimporten. Plugin-Implementierungen
unverändert. BarChartStrategy.js nicht berührt. Alle manuellen Tests bestanden.

Betroffene Bereiche:
  plugins/index.js (NEU)
  core/ChartEngine.js (Import Z.68-71)
  strategies/LineChartStrategy.js (Import Z.29)
  strategies/PieChartStrategy.js (Import Z.32)

Kontext:
  Kette AP-14e1–14e11 | AP-14e9
  Getestet: Screen 2 Pulse, Screen 3 Crosshair+VerticalLine, Doughnut, BarChart History+Ranking
```

### 8.2 Kurzformat für Pfad C und D (Mini und Housekeeping)

Nur für Korrekturen ohne Projektgeschichte (Tipp-/Doku-Fix, Infrastruktur).

```text
B1-AP-14e2: fwVerticalLine ausgelagert

Bereiche: FwChartPlugins.js, ChartEngine.js
Sicher: opt-in, Standardcharts unverändert, Smoke-Test grün
```

Regeln:

- Zeile 1: AP-ID + Ergebnis, knapp; bei Housekeeping ohne AP-ID: Bereich + Ergebnis.
- `Bereiche:` wichtigste Dateien.
- `Sicher:` warum keine offensichtliche Regression oder kein Projektstatus-Drift.

---

## 9. Ausgabe-Disziplin

Während des Abschlusses:

- keine langen Erklärungen,
- keine Schritt-für-Schritt-Erzählung,
- keine sichtbare Modus-Oszillation,
- nur melden, wenn Scout/Writer gestartet wird, ein Validator scheitert, eine Rückfrage nötig ist oder ein Abschluss blockiert ist.

Am Ende:

- Commit-Message,
- ggf. knapper Hinweis auf offene manuelle Tests,
- ggf. Hinweis auf Reconciliation.

---

## 10. Merksatz

> **Wir sparen nicht, indem wir Genauigkeit weglassen. Wir sparen, indem Claude nicht rät, nicht unnötig liest, nicht labert und mechanische Arbeit nicht mit Sonnet erledigt.**
