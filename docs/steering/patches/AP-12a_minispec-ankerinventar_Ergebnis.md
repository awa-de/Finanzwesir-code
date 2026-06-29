# AP-12a Ergebnis — MINI_SPEC-Ankerinventar für vollständigen Steuerungsblock

Stand: 2026-06-29 | Session: AP-12a | Geändert von: Claude

---

## Kurzstatus

```
Status:                   GRÜN
Blocker:                  nein
Empfehlung nächster AP:   AP-12b — Python-Tool für Seed → MINI_SPEC
```

---

## Verwendete Quelle und Ziele

```
Quelle:    Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
Zieltyp:   Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Nicht-Ziel: Apps/{slug}/APP_SPEC.md
```

---

## Git-Status vor dem AP

```
 M .claude/learning/session-log.md
 M docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
```

Kein schmutziger Stand der App-Dateien oder Mini-Specs. Inventarisierung nicht beeinträchtigt.

---

## Tabelle je Slug

| Slug | MINI_SPEC vorhanden | Seed-Block vorhanden | Ziel-Steuerungsblock vorhanden | Auffällige alte/konkurrierende Struktur | Früher Ankerkandidat | Empfohlene Einfügestelle | Status | Notiz |
|---|:---:|:---:|:---:|---|---|---|:---:|---|
| risiko-uebersetzer | ✅ | ✅ (Z. 173) | ❌ | keine | nach Zeile 14 (**Priorität:**) | vor `### Problem, das gelöst wird` (Z. 16) | GRÜN | Pattern A |
| crash-reaktions-test | ✅ | ✅ (Z. 209) | ❌ | keine | nach Zeile 14 (**Priorität:**) | vor `### Problem, das gelöst wird` (Z. 16) | GRÜN | Pattern A |
| markt-kam-zurueck | ✅ | ✅ (Z. 245) | ❌ | keine | nach `---` (Z. 18) | vor `## Strategische Einordnung` (Z. 20) | GRÜN | Pattern B, Sonderfall: erste H2-Fachsektion nicht „Problem" |
| market-timing-simulator | ✅ | ✅ (Z. 282) | ❌ | keine | nach Zeile 14 (**Priorität:**) | vor `### Problem, das gelöst wird` (Z. 16) | GRÜN | Pattern A |
| geburtsjahrlos | ✅ | ✅ (Z. 318) | ❌ | keine | nach `---` (Z. 17) | vor `## Problem, das gelöst wird` (Z. 19) | GRÜN | Pattern B |
| der-alte-euro | ✅ | ✅ (Z. 389) | ❌ | keine | nach `---` (Z. 16) | vor `## Problem, das gelöst wird` (Z. 18) | GRÜN | Pattern B |
| depot-kipppunkt | ✅ | ✅ (Z. 426) | ❌ | keine | nach `---` (Z. 16) | vor `## Problem, das gelöst wird` (Z. 18) | GRÜN | Pattern B |

---

## Frühe Struktur je Slug (Detailbefund)

### Pattern A — kein `---` nach Metadaten, erste Fachsektion als H3

Betrifft: `risiko-uebersetzer`, `crash-reaktions-test`, `market-timing-simulator`

```
Zeile 1:  # MINI_SPEC_FROM_HAUPTDOKUMENT — {Name}
Zeile 2:  (leer)
Zeile 3:  > Quelle: ...
Zeile 4:  > Status: ...
Zeile 5:  (leer)
Zeile 6:  ---
Zeile 7:  (leer)
Zeile 8:  ## {ID} — {App-Name}
Zeile 9:  (leer)
Zeile 10: **Slug:** ...
Zeile 11: **KI-Konsens:** ...
Zeile 12: **Folienbezug:** ...
Zeile 13: **Funnel-Position:** ...
Zeile 14: **Priorität:** ...
Zeile 15: (leer)
Zeile 16: ### Problem, das gelöst wird   ← ERSTE FACHLICHE SEKTION
```

Anker: Einfügen zwischen Zeile 15 und Zeile 16.

### Pattern B — `---` nach Metadaten, erste Fachsektion als H2

Betrifft: `markt-kam-zurueck`, `geburtsjahrlos`, `der-alte-euro`, `depot-kipppunkt`

```
Zeile 1:  # MINI_SPEC_FROM_HAUPTDOKUMENT — {Name}
Zeile 2:  (leer)
Zeile 3-5: > Blockquote (Quelle, Status, ggf. Ordner/Letzte Änderung)
Zeile 6:  (leer)
Zeile 7:  ---
Zeile 8:  (leer)
Zeile 9:  ## {ID} — {App-Name}
Zeile 10: (leer)
Zeile 11-15: **bold** Metadaten-Felder (variiert: 4–6 Felder)
Zeile 16/17: (leer)
Zeile 17/18: ---
Zeile 18/19: (leer)
Zeile 19/20: ## {Erste H2-Fachsektion}   ← ERSTE FACHLICHE SEKTION
```

Anker: Einfügen zwischen dem `---` nach den Metadaten und der ersten H2-Fachsektion.

**Sonderfall markt-kam-zurueck:** Erste H2-Fachsektion ist `## Strategische Einordnung`, nicht `## Problem, das gelöst wird`. Die Ankerregel gilt trotzdem unverändert — der Steuerungsblock kommt vor der ersten H2-Fachsektion, unabhängig von deren Namen.

---

## Gemeinsame Ankerregel

```
Einheitliche Regel möglich: JA

Regel:
  Einfügen nach dem letzten Bold-Metadaten-Feld unter `## {ID}` —
  inkl. eventuell nachfolgendem `---`-Separator —
  vor der ersten fachlichen H2- oder H3-Sektion.

Deterministischer Algorithmus für AP-12b (Python):
  1. Finde die Zeile mit `## {slug}` ODER `## {ID} — {App-Name}` (enthält slug im Markdown-Text).
  2. Scanne vorwärts: Überspringe blank lines, **bold:** Metadaten-Felder, `---`-Separatoren.
  3. Einfügeposition = unmittelbar vor der ersten `## ` oder `### ` Zeile nach dem Metadaten-Block.
  4. Füge ein: blank line + `## Steuerungsblock: Zweck, Barriere, Prüfregeln` + Seed-Inhalt + blank line.

Begründung:
  Alle 7 Mini-Specs folgen einem von zwei Mustern (A oder B), die durch dieselbe Regel abgedeckt werden.
  Der Unterschied (H3 vs. H2 als erste Fachsektion, `---` vorhanden oder nicht) erfordert keine
  separate Logik — „erste ## oder ### nach Metadaten-Block" gilt für beide Muster.
```

---

## Befund zu ausgeschlossenen Slugs

```
Nicht geprüft / nicht bearbeitet:
  - prokrastinations-preis  (Pilot, hat bereits APP_SPEC.md)
  - plan-generator          (Sonderfall)
  - etf-vergleich           (separater Sonderfall)
  - alle anderen Apps außerhalb Batch A
```

---

## Bewertung

### Was ist sicher?

- Alle 7 Batch-A-Mini-Specs existieren.
- Alle 7 passenden Seed-Blöcke in der Seed-Datei existieren.
- Keine Mini-Spec enthält bereits einen `## Steuerungsblock`-Abschnitt.
- Keine Mini-Spec enthält alte oder konkurrierende Strukturen (kein Nordstern, keine Heldenreise, kein LLM-Selbsttest, kein 5-Fragen-Block, keine Prüfscore-Abschnitte).
- Für alle 7 Mini-Specs ist ein früher, stabiler Einfügeanker identifiziert.
- Eine einheitliche deterministisch formulierbare Ankerregel deckt alle 7 Dateien ab.

### Was ist unsicher?

- Die Seed-Blöcke wurden nur auf Existenz geprüft (Zeilen-Positions-Verifikation), nicht auf inhaltliche Vollständigkeit oder psychologische Korrektheit. Das ist Aufgabe von AP-12b beim deterministischen Lesen.
- `markt-kam-zurueck` hat als erste H2-Sektion `## Strategische Einordnung` statt `## Problem`. Der Steuerungsblock käme damit **vor** der strategischen Einordnung, was inhaltlich sinnvoll ist (Steuerungsblock = Navigationshilfe, gehört an den Anfang). Kein Risiko.
- Die Zeilenzahlen der Anker sind exakt für den heutigen Stand. Wenn eine Mini-Spec noch bearbeitet wird, können sich Zeilen verschieben — das Python-Tool muss per Muster suchen, nicht per fester Zeilennummer.

### Was blockiert AP-12b?

Nichts. Alle Voraussetzungen erfüllt.

### Was muss AP-12b berücksichtigen?

1. **Pattern A vs. B unterscheiden** oder eine einheitliche Suchlogik verwenden (empfohlen: einheitlich, kein explizites Pattern-Flagging nötig).
2. **Kein Überschreiben**: Vor Einfügen prüfen, ob `## Steuerungsblock: Zweck, Barriere, Prüfregeln` bereits existiert → Abbruch mit Fehler.
3. **Seed-Block-Suche im Seed-File**: Muster `^## {slug}$` — exakt, kein Substring-Match.
4. **Einfügeinhalt**: Vollständiger Seed-Block aus Seed-Datei, nicht reduziert, nicht paraphrasiert.
5. **Zeilenzahlen als Referenz, nicht als Anker** im Tool: immer per Muster navigieren.
6. **Leerzeilen**: Vor und nach dem eingefügten Block eine Leerzeile — konsistent mit bestehendem Markdown-Stil der Mini-Specs.

---

## Geänderte Dateien

```
docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md  (neu, dieses Protokoll)
```

Keine App-Datei wurde verändert.  
Keine Mini-Spec wurde verändert.  
Kein Tool wurde verändert.

---

## Nächster AP

```
AP-12b — Python-Tool für Seed → MINI_SPEC

Voraussetzungen erfüllt: ja
Ankerregel steht: ja
Seed und Ziele vollständig: ja
Keine Blocker: ja
```
