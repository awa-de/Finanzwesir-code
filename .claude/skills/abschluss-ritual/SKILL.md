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

**0. NAVIGATION.md prüfen**
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
Format aus CLAUDE.md § 11. Ausgabe als reinen Text — bereit zum Einfügen in VSCode Message-Feld.
Keine git-Kommandos drum herum. Keine Code-Blöcke. Nur der Text selbst:

Zeile 1: Titel (50–72 Zeichen)
Zeile 2: leer
Zeile 3+: strukturierter Body

Beispiel-Ausgabe:
```
Abschluss AP-20: Mixed-Rhythm CV-Heuristik implementiert

Was war das Problem?
...

Wie wurde es gelöst?
...

Warum ist die Lösung sicher?
...

Betroffene Bereiche:
  ChartEngine.js (detectRhythm)

Kontext:
  AP-20-DETAIL.md / Tested: scenario_3_short_14m.csv
```

Albert committed via VSCode Git Extension (Message-Feld). Keine Terminal-Befehle liefern.

**5. CLAUDE.md** — nur wenn eine neue fundamentale, universelle Verhaltensregel entstanden ist.
Regelaufnahme-Schutz aus CLAUDE.md § 8 beachten.

**6. PROJECT-STATUS.md** — nach längeren Sessions oder Meilensteinen aktualisieren.

---

## Pflicht bei jeder berührten Steering-Datei

Erste Zeile aktualisieren:
```
Stand: YYYY-MM-DD HH:MM | Session: [Name] | Geändert von: Claude
```
