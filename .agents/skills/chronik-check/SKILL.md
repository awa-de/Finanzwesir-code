---
name: chronik-check
description: Prüft eine neue Faden-Chronik deterministisch gegen den Frontmatter-Vertrag (docs/steering/CHRONIK-SPEZIFIKATION.md) und bietet bei Abweichung eine chirurgische Header-Korrektur an. Auslösen mit "prüf die neue Chronik" oder /chronik-check.
argument-hint: "[Pfad zur Chronik; leer = neueste/ungetrackte in Archiv/Chroniken/]"
---

# /chronik-check

Bezug: `docs/steering/CHRONIK-SPEZIFIKATION.md` (SSoT der Vokabel).

Zweck: Eine gerade hinzugefügte Chronik deterministisch validieren und das
Frontmatter bei Bedarf chirurgisch korrigieren. Der Chronik-Text bleibt
unangetastet — er ist Primärquelle.

## Vorgehen

1. **Zieldatei bestimmen.**
   - Pfad als Argument übergeben → diesen verwenden.
   - Sonst die neu hinzugekommene/geänderte Chronik finden:
     `git status --porcelain Archiv/Chroniken/` (untracked oder modifizierte
     `*.md`). Bei mehreren Kandidaten: Albert fragen, welche.

2. **Engine ausführen** (deterministisch, kein Ermessen):

   ```
   python .Codex/skills/chronik-check/validate_chronik.py <pfad-zur-chronik>
   ```

   Exit 0 = gültig, Exit 1 = harte Fehler. Die Ausgabe nennt jede Abweichung
   feldgenau.

3. **Ergebnis prüfen.** Bei Exit 0 ohne Warnung: „Chronik konform" — fertig.
   **Warnungen ernst nehmen** — besonders „Autor-Signal …": Das Skript meldet,
   wenn der Body ein LLM als Autor/Chronist nennt (z.B. „Chronist: Perplexity"
   oder Perplexitys `[file:NNN]`-Zitate), das nicht in `beteiligte` steht. Dann
   den Body lesen und abgleichen: Wer war **direkter Faden-Teilnehmer** (inkl.
   des chronikführenden LLM), wer war nur zitiertes Material? Stimmt
   `beteiligte` nicht, korrigieren (nur Frontmatter, nie Body). Faktizität ist
   dein Urteil — der Validator prüft nur die Vokabel, nicht die Wahrheit.

4. **Bei harten Fehlern: nur das FRONTMATTER korrigieren, nie den Body.**
   - geschlossene Felder auf den korrekten Listenwert bringen
     (z.B. `faden_typ: Prompt-Entwicklung` → `prompt-erstellung`;
     `status: fertig` → `abgeschlossen`; `Kurswechsel` → `richtungswechsel`).
   - fehlende Pflichtfelder ergänzen, **nur** wenn aus der Chronik eindeutig
     ableitbar; sonst Albert fragen — nichts erfinden.
   - `datum` auf `YYYY-MM-DD` bringen; `chronik_id` an den Dateinamen angleichen.
   Erlaubte Werte stehen in `CHRONIK-SPEZIFIKATION.md` (= Vokabel im Skript).
   Bei Unsicherheit über den richtigen Wert: fragen, nicht raten.

5. **Nachprüfen.** Engine erneut laufen lassen, bis Exit 0. Dann die geänderten
   Frontmatter-Zeilen als Diff zeigen.

## Grenzen

- Nur Frontmatter wird angefasst, nie der Body.
- Keine erfundenen Werte für unklare Felder.
- Die Vokabel im Skript ist die Maschinen-Spiegelung der Spec. Weicht die Spec
  ab, zuerst Skript **und** Spec im Gleichschritt aktualisieren (eigener Gate),
  nicht die Chronik an ein veraltetes Skript anpassen.
