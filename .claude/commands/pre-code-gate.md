Führe das Pre-Code-Gate aus. Argument: $ARGUMENTS (light | full)

---

# Pre-Code-Gate – Finanzwesir 2.0

Trigger: Automatisch vor jeder Codeänderung (→ [Gate-Prinzip] in CLAUDE.md).
Argument: `light` oder `full` — Claude wählt basierend auf den Bedingungen in [Gate-Prinzip].

---

## Light-Gate

Voraussetzung: ALLE Bedingungen erfüllt (genau 1 Datei, kein Tabu-Bereich,
keine Architekturwirkung, klare Ursache, keine Security-Auswirkung,
keine Änderung an `docs/spec/` oder `docs/steering/`).

Claude beantwortet diese 3 Fragen sichtbar, dann wartet er auf Alberts „OK":

1. **Was darf nicht brechen?**
   [bestehende Funktionen, die durch diese Änderung berührt werden könnten]

2. **Was ist die kleinste sichere Änderung?**
   [genau die Zeilen, die nötig sind — nicht mehr]

3. **Wie testet Albert lokal?**
   [konkrete Testdatei, Chart/CSV/App-Fall, Viewport, erwartetes Verhalten]

→ Nach Alberts „OK" direkt weiter.

---

## Full-Gate

Pflicht bei: mehreren Dateien, Tabu-Bereich, App-Arbeit, Engine-Verhalten, Security,
`docs/spec/`, `fwContext`, `FwDateUtils`, unklarer Ursache, möglicher Regression,
mehr als einem Fixversuch.

Claude beantwortet diese 9 Fragen sichtbar, dann wartet er auf Alberts explizites „OK":

1. **Welche bestehende Funktion darf nicht brechen?**
   [konkrete Funktion/Feature — nicht „nichts"]

2. **Welche Spec-Regel ist bindend?**
   [Datei + Abschnitt — oder „keine Spec betroffen"]

3. **Welche Datei ist Single Source of Truth?**
   [für die betroffene Logik]

4. **Welche Dateien oder Layer sind tabu?**
   [aus [Tabu-Zonen] und [Architektur-Layer] — explizit benennen]

5. **Was ist die kleinste sichere Änderung?**
   [genau die Zeilen/Funktionen, die nötig sind]

6. **Wie testet Albert lokal?**
   [konkrete Testdatei, Chart/CSV/App-Fall, Viewport S/M/L, erwartetes Verhalten]

7. **Wie wird Regression ausgeschlossen?**
   [welche anderen Features könnten betroffen sein — und warum nicht]

8. **Advocatus Diaboli:** Warum könnte dieser Plan trotzdem scheitern?
   [stärkster Gegengrund — nicht „könnte klappen"]

9. **Simplicity-Check:** Wie viele Zeilen umfasst die geplante Änderung?
   Könnte dieselbe Funktion mit weniger als der Hälfte erreicht werden?
   Wenn ja: Was wird weggelassen — und warum ist das richtig?

### Subagent-Zuarbeit bei umfangreichen Full-Gates

Subagent-Policy: `.claude/skills/subagent-dispatch/SKILL.md`

Dispatch prüfen wenn:
- mehr als 5 Pflichtquellen, oder
- mehr als 3 Dateien nur zum Lesen/Extrahieren, oder
- App-Arbeit mit mehreren Spec-/Steering-Dateien, oder
- Security-, Regression- oder Architekturbezug.

Typisch:
- Pflichtquellen, Spec-Regeln, Security-/App-Fabrik-Regeln → `spec-scout`
- Regressionsflächen, Testfälle, betroffene Call-Sites → `regression-scout`

Die Hauptinstanz beantwortet danach die 9 Gate-Fragen und entscheidet Blocker,
Nicht-Blocker, kleinste sichere Änderung, Teststrategie und ggf. Slice-Plan.
Subagent-Aufruf und Rückfall müssen sichtbar quittiert werden (→ `.claude/skills/subagent-dispatch/SKILL.md`).

→ Full-Gate: Claude wartet auf Alberts explizites „OK". Kein Code ohne Freigabe.
