# AP-24a — Mini-Fix Sonderfall-Kennzeichnung plan-generator — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Der einzige GELB-Befund aus AP-24 (fehlende explizite Kennzeichnung von `plan-generator` als „Sonderfall") wurde behoben. Ein dritter HTML-Kommentar wurde direkt an die bestehende Provenienzstelle unter dem Steuerungsblock angehängt: „Dieser lokale Steuerungsblock ist ein dokumentierter Sonderfall für `plan-generator`: Er stammt nicht als zeilengetreuer Transfer aus der zentralen Seed-Datei, sondern aus AP-22-Klärung, Nutzerentscheidung im AP-23-Kontext und AP-23a-Provenienzkorrektur." Keine andere Textstelle wurde angefasst. Steuerungsblock, Warnhinweis, Entscheidungsblock mit allen 6 Punkten und LLM-STOP-Regel bleiben unverändert. Seed-Datei weiterhin nicht im Git-Status/Diff.

## Ausgangspunkt

AP-24 war GELB, weil in der plan-generator-MINI_SPEC die explizite Kennzeichnung als „Sonderfall" fehlte. Alle anderen AP-24-Prüfpunkte waren bereits GRÜN (Struktur, Entscheidungsblock, LLM-STOP-Regel, Seed-Read-Only, keine falschen Provenienzbehauptungen).

## Git-Baseline

```text
git status --short (vor AP-24a):
 M .claude/learning/session-log.md
 M Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
?? docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md
?? docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md
?? docs/steering/patches/AP-24_review_plan-generator_minispec_provenienz_seed-readonly_Ergebnis.md

git log --oneline -5:
7104b77 docs(AP-20/20b/21): Steuerungsblock-Rollout Sonderbatch D ohne plan-generator + Seed-Provenienz-Review
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

git diff --name-status (vor AP-24a):
M	.claude/learning/session-log.md
M	Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

Befund:

- Seed-Datei nicht im Status/Diff — bestätigt.
- plan-generator MINI_SPEC bereits dirty aus AP-23/AP-23a (erwartet, nicht Teil von AP-24a-Änderung selbst, sondern Vorzustand).
- Keine APP_SPEC-, HTML- oder anderen-App-Dateien im Diff.
- Kein STOP-Trigger ausgelöst.

## Änderung

Ergänzte Formulierung (als dritter HTML-Kommentar direkt unter den beiden bestehenden Provenienz-Kommentaren):

```text
Dieser lokale Steuerungsblock ist ein dokumentierter Sonderfall für `plan-generator`: Er stammt nicht als zeilengetreuer Transfer aus der zentralen Seed-Datei, sondern aus AP-22-Klärung, Nutzerentscheidung im AP-23-Kontext und AP-23a-Provenienzkorrektur.
```

Einfügeort: direkt nach den bestehenden zwei HTML-Kommentaren unter der Überschrift `## Steuerungsblock: Zweck, Barriere, Prüfregeln` (Zeile 19–20 vor der Änderung), vor der Leerzeile und `**Rolle:**`-Zeile. Keine andere Textstelle in der Datei wurde verändert.

## QA

| Prüfung | Ergebnis |
|---|---|
| Wort „Sonderfall" vorhanden | GRÜN |
| AP-22 genannt | GRÜN |
| AP-23-Kontext / Nutzerentscheidung genannt | GRÜN |
| AP-23a genannt | GRÜN |
| Seed-Datei nicht Provenienz | GRÜN (Satz „nicht als zeilengetreuer Transfer aus der zentralen Seed-Datei") |
| Seed-Datei nicht im Diff | GRÜN |
| Steuerungsblock genau 1× | GRÜN |
| Warnhinweis genau 1× | GRÜN |
| Entscheidungsblock genau 1× | GRÜN |
| Punkte 1–6 erhalten | GRÜN |
| LLM-STOP-Regel erhalten | GRÜN |
| keine falsche Seed-Provenienz (4 verbotene Formulierungen geprüft) | GRÜN |

## Geänderte Dateien

```text
Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md   (1 neuer HTML-Kommentar ergänzt, sonst unverändert)
docs/steering/patches/AP-24a_plan-generator_sonderfall-formulierung_minifix_Ergebnis.md   (neu)
```

Bereits vorhanden, nicht Teil dieser Änderung (nur zur Vollständigkeit im Status sichtbar):

```text
.claude/learning/session-log.md
docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md
docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md
docs/steering/patches/AP-24_review_plan-generator_minispec_provenienz_seed-readonly_Ergebnis.md
```

## Scope-QA

Nicht geändert / nicht angefasst:

- Seed-Datei nicht im Diff
- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine anderen MINI_SPECs geändert
- keine App gebaut
- kein Commit erzeugt
- Entscheidungsblock, Punkte 1–6, Optionen, Empfehlungen, Begründungen, offene Nutzerentscheidungen, LLM-STOP-Regel, ursprünglicher Fachinhalt: alle unverändert

## Bewertung

### GRÜN-Kriterien

- einziger AP-24-GELB-Punkt behoben — erfüllt
- Wort „Sonderfall" vorhanden — erfüllt
- korrekte Provenienz weiter vorhanden (AP-22/AP-23-Kontext/AP-23a) — erfüllt
- Seed-Datei nicht im Diff — erfüllt
- Entscheidungsblock unverändert erhalten — erfüllt
- LLM-STOP-Regel erhalten — erfüllt
- nur erlaubte Dateien geändert — erfüllt
- Ergebnisprotokoll geschrieben — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe, falls zutreffend

Keine.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

Bei GRÜN (dieser Fall):

AP-24b — Mini-Review Sonderfall-Kennzeichnung + Final-QA (unabhängige Prüfung ohne Übernahme der AP-24a-Selbstauskunft)

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
