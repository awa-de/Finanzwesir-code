# AP-12b Ergebnis — Python-Tool für Seed → MINI_SPEC

Stand: 2026-06-29 | Session: AP-12b | Geändert von: Claude

---

## Kurzstatus

```
Status:                   GRÜN
Blocker:                  nein
Empfehlung nächster AP:   AP-12c — Batch-A Dry-run und Write
```

---

## Git-Status vor dem AP

```
 M .claude/learning/session-log.md
 M docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
?? docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md
```

Keine Mini-Spec-Datei oder App-Datei vor AP-12b modifiziert.

## Git-Status nach dem AP

```
 M .claude/learning/session-log.md
 M docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
?? docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md
?? docs/steering/patches/AP-12b_minispec-tool_Ergebnis.md          (neu, dieses Protokoll)
?? tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py  (neu, das Tool)
```

Kein `git diff` auf `Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md` — bestätigt.

---

## Gelesene Referenzen

```
tools/app_fabrik/insert_steuerungsblock_from_seed.py                  (Referenztool APP_SPEC)
docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md       (Vorbefund)
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md                    (Seed-Datei, §2.1 + Blöcke)
alle 7 Batch-A-MINI_SPEC_FROM_HAUPTDOKUMENT.md-Dateien               (Struktur-Verifikation)
```

---

## Architekturentscheidung

```
Entscheidung:              Separates MINI_SPEC-Tool

Begründung:
  Der Ankermechanismus ist grundlegend verschieden:
  - APP_SPEC-Tool: fest auf "## 1. Status" + "## 2." ausgerichtet
  - MINI_SPEC-Tool: AP-12a-Regel (erste H2 → nächste Heading)
  Erweiterung hätte die APP_SPEC-Logik destabilisiert.

Wiederverwendete Logik:
  - configure_utf8_stdio()
  - read_text(path)
  - remove_seed_management_fields() (Status, Verteilungsstatus, Klärungsbedarf)
  - extract_seed_block() — gleiche Regex ^## {slug}\s*\n ... ^---\s*\n\s*##
  - extract_score_block() — gleiche Regex ## 2.1 Standardisiertes...
  - build_local_block() — gleiche Kommentar-Notation
  - unified_diff()
  - Dry-run/Write-Mechanik

Nicht wiederverwendete APP_SPEC-spezifische Logik:
  - insert_after_status() — APP_SPEC-Ankermuster (## 1. Status → ## 2.)
  - --slug als Pflichtargument (MINI_SPEC-Tool batcht by default)
  - Protokoll-Schreibfunktion (MINI_SPEC-Tool schreibt kein AP-Protokoll)
```

---

## Toolpfad

```
tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py
```

---

## Umgesetzte Sicherheitsregeln

| Regel | Umgesetzt |
|---|:---:|
| Dry-run by default (kein --write → kein Write) | ✅ |
| Write nur mit `--write` Flag | ✅ |
| Seed-Block-Suche: `^## {slug}\s*\n` (exakt, kein Substring-Match) | ✅ |
| Seed-Verwaltungsfelder entfernt: Status, Verteilungsstatus, Klärungsbedarf | ✅ |
| `**Rolle:**` bleibt (kein Verwaltungsfeld) | ✅ |
| Bestehender Steuerungsblock = SlugError (kein Überschreiben) | ✅ |
| Fehlende Zieldatei = SlugError (Abbruch nur für Slug, nicht Batch) | ✅ |
| Fehlender Seed-Block = SlugError | ✅ |
| Fehlender Anker = SlugError | ✅ |
| Pflichtmarker-Prüfung (15 positive Marker) | ✅ |
| Negativmarker-Prüfung (7 verbotene Marker) | ✅ |
| Kein Diff → ROT (unerwarteter Zustand) | ✅ |
| Keine Umformulierung / kein Reformat fremder Inhalte | ✅ |
| UTF-8 mit `encoding="utf-8", newline="\n"` | ✅ |
| Score-Block aus § 2.1 standardisiert (4 Kriterien) | ✅ |
| Keine Mini-Spec-Änderung in AP-12b | ✅ |

---

## Dry-run-Ergebnis je Slug

| Slug | Seed gefunden | Ziel gefunden | Anker gefunden | Pflichtmarker vorhanden | Verbotene Marker abwesend | Geplante Einfügestelle | Status |
|---|:---:|:---:|:---:|:---:|:---:|---|:---:|
| risiko-uebersetzer | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 16: `### Problem, das gelöst wird` | GRÜN |
| crash-reaktions-test | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 16: `### Problem, das gelöst wird` | GRÜN |
| markt-kam-zurueck | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 20: `## Strategische Einordnung` | GRÜN |
| market-timing-simulator | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 16: `### Problem, das gelöst wird` | GRÜN |
| geburtsjahrlos | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 19: `## Problem, das gelöst wird` | GRÜN |
| der-alte-euro | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 18: `## Problem, das gelöst wird` | GRÜN |
| depot-kipppunkt | ✅ | ✅ | ✅ | ✅ | ✅ | vor Zeile 18: `## Problem, das gelöst wird` | GRÜN |

Dry-run-Terminal-Output: `7/7 GRUEN | 0 GELB | 0 ROT`

---

## Inhaltlicher Spot-Check (risiko-uebersetzer --diff)

Geplante Einfügung enthält:
- `## Steuerungsblock: Zweck, Barriere, Prüfregeln` ✓
- `**Rolle:** A1 — Dosis-App / Risiko übersetzen` (behalten) ✓
- `**Diese App existiert, um:**` ✓
- `**Zu entfernende psychologische Barriere:**` ✓
- `**Falscher Glaubenssatz vorher:**` ✓
- `**Zielzustand nach der App:**` ✓
- `**Muss-Kriterien für jede Umsetzung:**` ✓
- `**Nicht-Ziele / harte Verbote:**` ✓
- Score-Block aus §2.1 (Barriere-Abbau, Zielzustand, Nicht-Ziele, Mentorrolle, 8/8, 6–7/8, ≤5/8) ✓

Entfernt:
- `**Status:** REKONSTRUIERT` ✓ (nicht in geplantem Block)
- `**Verteilungsstatus:** Nicht verteilt` ✓
- `**Klärungsbedarf vor Verteilung:**` ✓

Einfügestelle: nach `**Priorität:** #1`, vor `### Problem, das gelöst wird` — korrekt per AP-12a-Regel.

---

## Nachweis: Keine Mini-Spec verändert

```
git diff -- Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md
→ (kein Output — kein Diff)
```

---

## Geänderte Dateien

```
tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py   (neu, das Tool)
docs/steering/patches/AP-12b_minispec-tool_Ergebnis.md               (neu, dieses Protokoll)
```

Kein Commit. Kein Abschlussritual (AP-12b-Scope).

---

## Offene Punkte

Keine Blocker. Keine Tooling-Lücken.

| Punkt | Klasse | Notiz |
|---|---|---|
| `--diff` zeigt max. 40 Zeilen pro Slug | Backlog | Für AP-12c kein Problem — dort wird --write genutzt |
| Tool schreibt kein eigenes AP-Protokoll | Design | AP-12b-Protokoll manuell geschrieben; AP-12c kann Tool-Output dokumentieren |

---

## Nächster AP

```
AP-12c — Batch-A Dry-run und Write

Voraussetzungen:
  Tool läuft trocken: ja
  7/7 GRÜN: ja
  Keine Mini-Spec verändert: ja
  Ankerregel stabil: ja
  Seed-Bereinigung korrekt: ja
  Pflichtmarker vollständig: ja
  Verbotene Marker absent: ja
```
