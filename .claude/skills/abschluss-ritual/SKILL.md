---
name: abschluss-ritual
description: Abschluss-Ritual nach Fertigstellung einer Aufgabe in Finanzwesir 2.0. Aktualisiert Docs, Backlog, Memory und erzeugt Commit-Message.
argument-hint: "[AP-ID, z.B. AP-20]"
---

# Skill: abschluss-ritual

Trigger: Albert sagt „fertig" / „finale Phase" / sinngemäß — oder Claude bietet proaktiv an nach erkennbarem Task-Ende.
Argumente: $ARGUMENTS (AP-ID oder Aufgabenbeschreibung)

**Mini vs. Voll:**
- Mini (nur Stand-Datum + Commit-Message): für kleine, klar abgegrenzte Änderungen ohne Code- oder Architekturwirkung
- Voll: alles andere — bei Zweifel immer Voll

---

## Voll-Abschluss (Reihenfolge einhalten)

**0. Session-Log befüllen — PFLICHT, ZUERST, kein Ermessen**
Eintrag schreiben in `.claude/learning/session-log.md` mit Datum + AP-Titel als Header.
Jetzt schreiben, nicht bewerten — /distill bewertet später.

Challenge-Response (Kernkraftwerk-Prinzip):
"Gab es eine Korrektur oder Abweichung vom Plan?"   → j/n
"Gab es eine Überraschung oder neue Erkenntnis?"    → j/n

Beide nein:
- [OK] Keine Vorkommnisse

Mindestens eines ja — Tag nach Kriterium wählen, kein Freitext-Urteil:

Tag-Kriterien (NASA ASRS-Prinzip — Trigger, nicht Einschätzung):
[FRICTION]  Albert hat eine Richtung korrigiert / ein Schritt wurde nachgeholt /
            ein Missverständnis trat auf
[WIN]       Etwas lief schneller oder sicherer als erwartet — messbar oder von Albert bestätigt
[PREF]      Albert hat eine Formulierung, Reihenfolge oder Darstellung explizit bevorzugt
[QUESTION]  Claude hat eine Annahme getroffen ohne Alberts Bestätigung

Sprach-Prinzip: beschreibend, nicht evaluativ (HRO: Signal, kein Blame)
Richtig:   "[FRICTION] Gate-Schritt 7 übersprungen → manuell nachgeholt"
Falsch:    "[FRICTION] Claude hat versagt"

Kein AP ohne Eintrag. Fehlendes Log = Anomalie (HRO-Prinzip).
Abbruch-Format (wenn Ritual unterbrochen — 1 Zeile genügt):

    ## YYYY-MM-DD – [AP-ID] (Abbruch bei Schritt [N])
    - [OK] Abbruch ohne Vorkommnis  /  [FRICTION] Grund: ...

**0a. NAVIGATION.md prüfen**
Hat sich die Verzeichnisstruktur geändert? Neue Steering-, Spec- oder Template-Datei angelegt?
Datei verschoben oder umbenannt? → Sofort aktualisieren.

**0b. Definition of Done prüfen**
`docs/steering/DEFINITION-OF-DONE.md` lesen.
Sind alle Fertig-Kriterien für diesen Aufgabentyp erfüllt?
Falls nicht: stoppen und Albert informieren was noch fehlt.

**0c. Regression-Matrix** (nur bei Engine-Änderungen)
`docs/steering/engine/REGRESSION-MATRIX.md` — relevante Testfälle nennen.
Sind diese visuell geprüft? Falls nicht: Albert darauf hinweisen.

**1. Specs aktualisieren**
Betroffene Dateien in `docs/spec/` auf Aktualität prüfen.
Nur gezielte Edits, kein Vollrewrite.

**2. BACKLOG bereinigen**
- Abgeschlossene Zeile als ✅ in `docs/steering/BACKLOG-ARCHIV.md` verschieben (append mit Datum + Session)
- Zeile aus `docs/steering/BACKLOG.md` löschen
- `docs/steering/engine/WORKING-FEATURES.md` nur bei Engine-APs aktualisieren

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
```
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
```

Albert committed via VSCode Git Extension (Message-Feld). Keine Terminal-Befehle liefern.

**5. CLAUDE.md** — nur wenn eine neue fundamentale, universelle Verhaltensregel entstanden ist.
[Regelaufnahme-Schutz] beachten.

**6. PROJECT-STATUS.md** — nach längeren Sessions oder Meilensteinen aktualisieren.

---

## Pflicht bei jeder berührten Steering-Datei

Erste Zeile aktualisieren:
```
Stand: YYYY-MM-DD HH:MM | Session: [Name] | Geändert von: Claude
```
