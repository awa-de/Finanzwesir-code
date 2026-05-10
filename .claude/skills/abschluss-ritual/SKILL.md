---
name: abschluss-ritual
description: Abschluss-Ritual nach Fertigstellung einer Aufgabe in Finanzwesir 2.0. Aktualisiert Docs, Backlog, Memory und erzeugt Commit-Message.
argument-hint: "[AP-ID, z.B. AP-20] — oder Aufgabenbeschreibung wenn kein BACKLOG-Eintrag vorhanden (Sofort-erledigt-Pfad)"
---

# Skill: abschluss-ritual

Trigger: Albert sagt „fertig" / „finale Phase" / sinngemäß — oder Claude bietet proaktiv an nach erkennbarem Task-Ende.
Argumente: $ARGUMENTS (AP-ID oder Aufgabenbeschreibung)

**Mini vs. Voll:**
- Mini (nur Stand-Datum + Commit-Message): für kleine, klar abgegrenzte Änderungen ohne Code- oder Architekturwirkung
- Voll: alles andere — bei Zweifel immer Voll

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
| Memory-Verzeichnis | `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\` |

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
Pfad: `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\`
Neue stabile Projektfakten, Feedback oder Entscheidungen eintragen.

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

Beispiel-Ausgabe:

Abschluss AP-20: Mixed-Rhythm CV-Heuristik implementiert

Was war das Problem?
...

Wie wurde es gelöst?
...

Warum ist die Lösung sicher (keine Regressionen)?
...

Betroffene Bereiche:
  ChartEngine.js (detectRhythm)

Kontext:
  AP-20-DETAIL.md / Tested: scenario_3_short_14m.csv

Albert committed via VSCode Git Extension (Message-Feld). Keine Terminal-Befehle liefern.

**5. CLAUDE.md** — nur wenn eine neue fundamentale, universelle Verhaltensregel entstanden ist.
[Regelaufnahme-Schutz] beachten.

**6. PROJECT-STATUS.md** — nach längeren Sessions oder Meilensteinen aktualisieren.

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
