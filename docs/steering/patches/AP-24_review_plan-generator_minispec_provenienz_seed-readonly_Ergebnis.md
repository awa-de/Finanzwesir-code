# AP-24 — Review plan-generator MINI_SPEC, Provenienz und Seed-Read-Only-QA — Ergebnis

## Status

Status: GELB
Blocker: nein

## Kurzbefund

Unabhängige Prüfung der realen Datei (nicht der AP-23a-Selbstauskunft): Die zentrale Seed-Datei `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` taucht nicht im Git-Status/Diff auf — der Reset aus AP-23a ist wirksam und stabil. `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md` enthält genau einen Steuerungsblock, genau einen APP_SPEC-Stoppwarnhinweis, genau einen Entscheidungsblock mit vollständigen Punkten 1–6 (je mit Optionen, Empfehlung, Begründung, offener Nutzerentscheidung — Empfehlungsbuchstaben stimmen mit der erwarteten Struktur B/B/C/C/B/C überein), einer eigenen LLM-STOP-Regel und dem ursprünglichen Fachinhalt. Keine der vier explizit verbotenen falschen Seed-Provenienz-Formulierungen ist vorhanden. Ein einzelner, nicht-blockierender Formulierungsbefund bleibt offen: Die Datei benennt AP-22, den AP-23-Kontext, AP-23a und die bewusste Nicht-Änderung der Seed-Datei vollständig und korrekt, verwendet aber nirgends das Wort „Sonderfall" zur expliziten Kennzeichnung von plan-generator als Ausnahme vom Standard-Seed-Provenienz-Muster. Das ist eine kleinere Formulierungslücke, keine sachliche Falschaussage — daher GELB, kein ROT.

## Ausgangspunkt

Vorgänger: AP-23a
AP-23a-Status: GRÜN
Review-Gegenstand:

- Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
- Seed-Read-Only-QA
- Sonderfall-Provenienz AP-22/AP-23-Kontext/AP-23a
- Entscheidungsblock 1–6

Wichtig:

- Keine Seed-Provenienzprüfung durchgeführt (bewusster Unterschied zu AP-18/AP-21).
- Seed-Datei musste unverändert bleiben — bestätigt.
- Review prüft ausschließlich den lokalen plan-generator-Sonderfall, keine anderen Apps.

## Vorprüfung / Git-Baseline

```text
git status --short (vor AP-24):
 M .claude/learning/session-log.md
 M Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
?? docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md
?? docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md

git log --oneline -5:
7104b77 docs(AP-20/20b/21): Steuerungsblock-Rollout Sonderbatch D ohne plan-generator + Seed-Provenienz-Review
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

git diff --name-status (vor AP-24):
M	.claude/learning/session-log.md
M	Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

Befund:

- Vor AP-24 dirty: `session-log.md` (bereits vor der gesamten AP-22/23/23a-Kette vorhanden, Session-Start-Eintrag) und `plan-generator`-MINI_SPEC (aus AP-23/AP-23a).
- Seed-Datei nicht im Status/Diff — bestätigt sauber nach AP-23a-Reset.
- AP-22-, AP-23- und AP-23a-Protokolle sind untracked (noch nicht committed), aber vollständig vorhanden.
- Keine APP_SPEC-, HTML- oder anderen-App-Dateien im Status/Diff.
- Kein STOP-Trigger ausgelöst.

## Gelesene Quellen

- `docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md` (vollständig)
- `docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md` (vollständig)
- `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig, reale Datei, nicht aus Protokollen übernommen)
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`: nicht fachlich gelesen. Nur geprüft, ob der Dateipfad im `git status --short`-Output auftaucht (nicht der Fall).

Nicht gelesen (Scope-Verbot eingehalten): `docs/steering/patches/AP-23_..._Ergebnis.md` (nicht benötigt, AP-23a-Kontext war ausreichend verständlich), alle `Apps/*/APP_SPEC.md`, alle `*.html`, alle anderen MINI_SPECs.

## MINI_SPEC-Struktur-QA

| Prüfung | Ergebnis |
|---|---|
| Steuerungsblock genau 1× | GRÜN |
| APP_SPEC-Stoppwarnhinweis genau 1× | GRÜN |
| Entscheidungsblock genau 1× | GRÜN |
| Punkte 1–6 vorhanden | GRÜN |
| Optionen vorhanden (alle 6) | GRÜN |
| Empfehlungen vorhanden (alle 6) | GRÜN |
| Begründungen vorhanden (alle 6) | GRÜN |
| offene Nutzerentscheidungen vorhanden (alle 6) | GRÜN |
| LLM-STOP-Regel vorhanden | GRÜN |
| ursprünglicher Fachinhalt erhalten (`### Aufbau: Zwei Stufen` inkl. Stufe 1/2, Output-Beispiel, CTA) | GRÜN |

## Provenienz-QA

| Prüfung | Ergebnis |
|---|---|
| AP-22 als Quelle/Klärung genannt | GRÜN |
| AP-23-Kontext / Nutzerentscheidung genannt | GRÜN |
| AP-23a genannt | GRÜN |
| Sonderfall plan-generator explizit als solcher benannt (Wort „Sonderfall") | **FEHLER** — Wort „Sonderfall" kommt in der Datei nicht vor; die Sonderfall-Eigenschaft ist inhaltlich klar beschrieben (AP-22/23/23a-Provenienz + „Seed bewusst nicht geändert"), aber nicht mit diesem Begriff etikettiert |
| Seed-Datei als bewusst nicht geändert dokumentiert | GRÜN (zweifach: Zeile 20 HTML-Kommentar, Zeile 83 Warnhinweis-Absatz) |
| falsche Aussage „Steuerungsblock aus Seed-Datei" nicht vorhanden | GRÜN |
| falsche Seed-Quellenzeile („Steuerungsblock-Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md") nicht vorhanden | GRÜN |
| „aus der Seed-Datei übertragen" nicht vorhanden | GRÜN |
| „aus Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md übertragen" nicht vorhanden | GRÜN |
| Seed-Datei nicht im Git-Status/Diff | GRÜN |

## Entscheidungsblock 1–6

| Punkt | Optionen vorhanden | Empfehlung vorhanden | Begründung vorhanden | offene Nutzerentscheidung vorhanden | Empfehlungsbuchstabe | Ergebnis |
|---|---:|---:|---:|---:|---|---|
| 1. Wie konkret darf der finale Plan werden? | ja | ja | ja | ja | B (erwartet B) | GRÜN |
| 2. Dürfen konkrete ETF-Namen genannt werden? | ja | ja | ja | ja | B (erwartet B) | GRÜN |
| 3. Darf der Plan einen Euro-Betrag nennen? | ja | ja | ja | ja | C, optional B (erwartet C) | GRÜN |
| 4. Was ist der Output? | ja | ja | ja | ja | C (erwartet C) | GRÜN |
| 5. Was passiert, wenn der Nutzer noch nicht reif ist? | ja | ja | ja | ja | B (erwartet B) | GRÜN |
| 6. Soll der Plan-Generator später einen echten Waschzettel liefern? | ja | ja | ja | ja | C (erwartet C) | GRÜN |

Zusätzlich programmatisch verifiziert (Python-Regex-Split der 6 Unterabschnitte): alle vier Pflichtelemente je Punkt vorhanden, alle Empfehlungsbuchstaben stimmen mit der in diesem AP-Auftrag erwarteten Struktur überein.

## Scope- und Diff-QA

```text
git status --short (nach AP-24, vor Schreiben dieses Protokolls):
 M .claude/learning/session-log.md
 M Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
?? docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md
?? docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md
```

- Seed-Datei: nicht im Status — bestätigt.
- Keine APP_SPEC-Datei im Status.
- Keine HTML-Datei im Status.
- Keine anderen MINI_SPECs im Status.
- Keine unerwarteten Pfade (Python-Scope-Check bestätigt: alle Pfade entweder erlaubt oder bereits vor AP-24 bekannt/dirty).
- AP-24 hat bis zu diesem Punkt keine Datei außer diesem Ergebnisprotokoll neu angelegt oder verändert.

## Bewertung

### GRÜN-Kriterien

- plan-generator MINI_SPEC vorhanden und vollständig gelesen — erfüllt
- genau ein Steuerungsblock vorhanden — erfüllt
- genau ein APP_SPEC-Stoppwarnhinweis vorhanden — erfüllt
- genau ein Entscheidungsblock vorhanden — erfüllt
- Punkte 1–6 vollständig, alle mit Optionen/Empfehlung/Begründung/offener Nutzerentscheidung — erfüllt
- LLM-STOP-Regel vorhanden — erfüllt
- Seed-Datei nicht im Git-Status/Diff — erfüllt
- keine APP_SPEC/HTML/andere-Apps verändert — erfüllt
- AP-24 hat nur dieses Ergebnisprotokoll geschrieben — erfüllt
- korrekte Sonderfall-Provenienz (AP-22 + AP-23-Kontext + AP-23a + „Seed bewusst nicht geändert") inhaltlich vollständig — erfüllt
- falsche Seed-Provenienz vollständig entfernt — erfüllt

Fast alle GRÜN-Kriterien erfüllt; ein Kriterium ist nicht vollständig im wörtlichen Sinn erfüllt (siehe GELB-Grund).

### GELB-Gründe

- Die Datei benennt plan-generator inhaltlich korrekt als Ausnahme vom Standard-Seed-Rollout (durch die zweifache „bewusst nicht geändert"-Formulierung und die AP-22/23/23a-Kette), verwendet aber nicht das Wort „Sonderfall" zur expliziten Kennzeichnung. Diese AP-24-Prüfvorgabe ist strenger formuliert als das, was AP-23a tatsächlich beauftragt bekam (AP-23a sollte AP-22/Nutzerentscheidung-AP-23-Kontext/AP-23a nennen und die Nicht-Änderung der Seed-Datei dokumentieren — beides ist der Fall). Kein Sicherheitsrisiko, keine Falschaussage, keine strukturelle Lücke. Kleiner, optionaler Formulierungs-Nachputz für einen künftigen AP oder das Commit-Protokoll, nicht blockierend für die Akzeptanz des Arbeitsstands.

### ROT-Gründe

Keine.

## Nächster richtiger AP

Bei diesem GELB-Fall (kein Blocker, keine verbotene Änderung, keine Falschaussage): Der Nutzer kann direkt zum Commit-/Abschluss-AP für AP-22/AP-23/AP-23a/AP-24 und plan-generator MINI_SPEC übergehen. Alternativ, falls das Wort „Sonderfall" explizit gewünscht ist, ein minimaler Formulierungs-Zusatz-AP (z. B. AP-24a) vor dem Commit — das ist eine redaktionelle Ermessensfrage, keine Sicherheits- oder Scope-Frage, und wird hiermit zur Entscheidung vorgelegt statt eigenmächtig repariert.

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
