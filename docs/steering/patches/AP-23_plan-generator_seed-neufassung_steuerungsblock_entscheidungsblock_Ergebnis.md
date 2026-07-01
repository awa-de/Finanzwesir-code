# AP-23 — plan-generator Seed-Neufassung, Steuerungsblock und Entscheidungsblock — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Der gesperrte `plan-generator`-Seed-Block wurde redaktionell neu gefasst: die vier `[Klärungsbedarf]`-Kernfelder (Zweck, Barriere, Glaubenssatz, Zielzustand) sind durch die AP-22-Entscheidung ersetzt, Status von `GESPERRT` auf `GESICHERT — redaktionell geprüft (AP-22/AP-23 2026-07-01)` und Verteilungsstatus von `Gesperrt` auf `Verteilt in MINI_SPEC (AP-23)` gesetzt — exakt im bestehenden Status-Vokabular der Seed-Datei, keine neuen Statuswerte erfunden. Der Rollout in die MINI_SPEC erfolgte mit dem bereits vorhandenen, unveränderten Tool `insert_steuerungsblock_into_minispec_from_seed.py` (Dry-run GRÜN, dann `--write`). Zusätzlich wurden der APP_SPEC-Stoppwarnhinweis (Standardtext wie Sonderbatch D, plus ein plan-generator-spezifischer Zusatz) und der vollständige, wörtlich aus dem Auftrag übernommene Entscheidungsblock „Wie konkret darf der finale Plan werden?" mit allen sechs Punkten, Optionen, Empfehlungen, Begründungen, offenen Nutzerentscheidungen und der LLM-STOP-Regel eingefügt. Keine APP_SPEC, kein App-Bau, keine finale Produkt-/ETF-Entscheidung.

## Ausgangspunkt

Vorgänger: AP-22
AP-22-Status: GRÜN
Rolle plan-generator: H1 / Funnel-Finale / Abschlussmodul
Nutzerentscheidung:

- Seed-Neufassung jetzt
- Steuerungsblock jetzt in MINI_SPEC
- Entscheidungsblock „Wie konkret darf der finale Plan werden?" 1:1 in MINI_SPEC
- keine APP_SPEC
- keine App

## Vorprüfung / Git-Baseline

```text
git status --short (vor AP-23):
 M .claude/learning/session-log.md   ← bereits vor AP-23 vorhanden (Session-Start-Eintrag)
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md   ← Vorgänger-AP, neu, nicht Teil von AP-23

git log --oneline -5:
7104b77 docs(AP-20/20b/21): Steuerungsblock-Rollout Sonderbatch D ohne plan-generator + Seed-Provenienz-Review
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

git diff --name-status (vor AP-23):
M	.claude/learning/session-log.md
```

- Repo war vor AP-23 nur durch den bereits vor diesem AP vorhandenen Session-Start-Eintrag und das neue, noch ungeschriebene AP-22-Protokoll dirty.
- Keine unerwarteten Änderungen an nicht erlaubten Dateien.

Pflichtdateien-Check (alle 3 vorhanden):

```text
OK docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
OK Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
OK Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

Vor dem Write geprüft und bestätigt: `plan-generator`-MINI_SPEC enthielt noch keinen lokalen Steuerungsblock, keinen APP_SPEC-Stoppwarnhinweis und keinen Entscheidungsblock (reale Datei gelesen, nicht aus AP-20/AP-21-Protokollen übernommen).

## Gelesene Quellen

- `docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md` (vollständig)
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (plan-generator-Block Zeile 1031–1067 vor Änderung, Status-Vokabular-Abschnitt §1, Vergleichsblöcke regulatorik-dashboard und prokrastinations-preis als Präzedenz für Status-/Verteilungsstatus-Formulierung)
- `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig, vor und nach jedem Schreibschritt)
- `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` (vollständig, zur Bestätigung der Eignung für einen einzelnen Slug via `--slug`)
- `Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (gezielt: exakter Wortlaut des bestehenden APP_SPEC-Stoppwarnhinweises aus Sonderbatch D, zur wortgleichen Wiederverwendung)

Nicht gelesen (Scope-Verbot eingehalten): alle `Apps/*/APP_SPEC.md`, alle `*.html`, alle anderen MINI_SPECs außer `etf-vergleich` (nur zur Wortlaut-Prüfung des Standard-Warnhinweises, keine inhaltliche Auswertung).

## Seed-Neufassung

| Feld | Vorher | Nachher | Status |
|---|---|---|---|
| Zweck | `[Klärungsbedarf]` | „Den Nutzer am Ende der Entscheidungs-Reise von gesammeltem Wissen zu einem einzigen, klein dimensionierten nächsten Schritt führen …" (vollständiger Text aus AP-22-Entwurfsvorschlag übernommen) | ersetzt |
| Barriere | `[Klärungsbedarf]` | „Entscheidungslähmung durch Informationsüberfluss nach Durchlaufen mehrerer Apps …" | ersetzt |
| Glaubenssatz | `[Klärungsbedarf]` | „Ich brauche noch mehr Wissen, bevor ich anfangen kann." | ersetzt |
| Zielzustand | `[Klärungsbedarf]` | „Ich habe einen konkreten, klein dimensionierten, selbst gewählten nächsten Schritt vor Augen. Wenn ich noch nicht bereit bin, weiß ich, zu welcher Funnel-Station ich zurückkehren muss." | ersetzt |
| Status / Verteilungsstatus | `GESPERRT` / `Gesperrt` | `GESICHERT — redaktionell geprüft (AP-22/AP-23 2026-07-01)` / `Verteilt in MINI_SPEC (AP-23)` | geändert, im bestehenden Vokabular (Präzedenz: regulatorik-dashboard, prokrastinations-preis) |
| Rolle | „H1 / Startplan-Konfigurator, aber aktuelle Quellenlage laut Inventar nicht tragfähig" | „H1 / Funnel-Finale — Abschlussmodul, zugleich als Haupt-App geführt" | präzisiert gemäß AP-22-Rollenentscheidung |
| Muss-Kriterien | 4 Klärungsaufforderungen („Erst klären …") | 4 konkrete Umsetzungsregeln (Funnel-Vorbedingungen, Reifegrad-Filter, Output-Dimensionierung, Klärungspflicht vor APP_SPEC) | ersetzt |
| Nicht-Ziele | 4 Punkte, davon 1 durch Klärung obsolet (`Keine Verteilung, bevor …`) | 6 Punkte: alle 3 verbleibenden Original-Punkte inhaltlich erhalten/geschärft + 3 neue aus AP-22-Mindestanforderung (`keine konkrete ETF-/ISIN-/WKN-Empfehlung`, `keine APP_SPEC-Ableitung ohne Output-Klärung`) | erweitert, keine Abschwächung |
| Klärungsbedarf vor Verteilung | vorhanden (4 Fragen, identisch mit AP-22-Kernfragen) | entfernt | analog zu bereits vollständig aufgelösten Blöcken (regulatorik-dashboard, prokrastinations-preis haben nach Auflösung ebenfalls keine `Klärungsbedarf vor Verteilung`-Sektion mehr) |

Formatkorrektur während der Arbeit: Die zwei neu geschriebenen Zitate (Glaubenssatz, Zielzustand) hatten zunächst eine gemischte Anführungszeichen-Konvention (öffnendes „ / schließendes gerades "). Vor dem MINI_SPEC-Transfer korrigiert auf die in der Seed-Datei durchgängig verwendete Konvention „…" (siehe z. B. prokrastinations-preis-Block). Dieser Fehler wurde vor dem Tool-Write erkannt und behoben, betrifft also nicht den finalen Zustand.

## MINI_SPEC-Integration

| Prüfpunkte | Ergebnis |
|---|---|
| Steuerungsblock genau 1× | ja (`## Steuerungsblock: Zweck, Barriere, Prüfregeln`, 1×) |
| LLM-Prüfung vorhanden | ja (gemeinsamer 4-Kriterien-Score aus Seed §2.1, unverändert übernommen) |
| APP_SPEC-Stoppwarnhinweis genau 1× | ja (`## Warnhinweis für spätere APP_SPEC-Erstellung`, 1×, Wortlaut identisch mit Sonderbatch-D-Standard plus plan-generator-spezifischem Zusatzabsatz) |
| Entscheidungsblock genau 1× | ja (`## Offener Entscheidungsblock: Wie konkret darf der finale Plan werden?`, 1×) |
| Punkte 1–6 vorhanden | ja (`### 1.` bis `### 6.`, alle vorhanden) |
| Optionen vorhanden | ja (`Optionen:` in allen 6 Unterpunkten) |
| Empfehlungen vorhanden | ja (`Empfehlung:` in allen 6 Unterpunkten) |
| offene Nutzerentscheidungen vorhanden | ja (`Offene Nutzerentscheidung:` in allen 6 Unterpunkten) |
| LLM-STOP-Regel vorhanden | ja (eigener Abschnitt `### LLM-STOP-Regel` am Ende des Entscheidungsblocks) |
| ursprünglicher Fachinhalt erhalten | ja (`### Aufbau: Zwei Stufen` mit Stufe 1/2, Output-Beispiel und CTA unverändert, direkt im Anschluss an den Entscheidungsblock) |

Automatisierte Marker-QA (Python, siehe unten) bestätigt alle Punkte zusätzlich mechanisch.

## Output-Entscheidungsblock

Der Block wurde wortgleich aus dem Auftrag übernommen und enthält alle sechs geforderten Punkte:

- 1. Wie konkret darf der finale Plan werden? — Optionen A/B/C, Empfehlung B, Begründung, offene Nutzerentscheidung
- 2. Dürfen konkrete ETF-Namen genannt werden? — Optionen A/B/C, Empfehlung B, Begründung, offene Nutzerentscheidung
- 3. Darf der Plan einen Euro-Betrag nennen? — Optionen A/B/C/D, Empfehlung C (+B als Rahmen), Begründung, offene Nutzerentscheidung
- 4. Was ist der Output: Empfehlung, Beispiel oder Startvorschlag? — Optionen A/B/C/D, Empfehlung C, Begründung, offene Nutzerentscheidung
- 5. Was passiert, wenn der Nutzer noch nicht reif ist? — Optionen A/B/C, Empfehlung B, Begründung, offene Nutzerentscheidung
- 6. Soll der Plan-Generator später einen echten Waschzettel liefern? — Optionen A/B/C, Empfehlung C, Begründung, offene Nutzerentscheidung

Am Ende: eigene `### LLM-STOP-Regel`-Sektion, die ein späteres LLM zwingt, die offenen Nutzerentscheidungen 1–6 zuerst mit Albert zu klären, bevor aus der MINI_SPEC eine APP_SPEC oder Bauanweisung abgeleitet wird.

## Geänderte Dateien

```text
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md         (nur plan-generator-Block, Zeile 1033–1065)
Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md        (Steuerungsblock, Warnhinweis, Entscheidungsblock eingefügt; Fachinhalt unverändert)
docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md  (neu)
```

Nicht angetastet, obwohl inhaltlich leicht veraltet: `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` §5.3 „Empfohlene Verteilungsreihenfolge", Punkt 5 „`plan-generator` erst nach fachlicher Klärung." Diese Zeile ist nach AP-22/AP-23 nicht mehr aktuell (Klärung ist abgeschlossen, Block ist verteilt), liegt aber außerhalb des `## plan-generator`-Blocks und damit außerhalb des für dieses AP erlaubten Scopes („nur im plan-generator-Block geändert"). Nicht repariert, hier gemeldet — kleiner redaktioneller Nachputz für einen späteren AP oder das nächste Seed-Housekeeping.

## Scope-QA

Nicht geändert / nicht angefasst:

- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine anderen MINI_SPECs geändert (nur zur Wortlautprüfung gelesen: `etf-vergleich`, keine Schreiboperation)
- keine App gebaut
- kein Commit erzeugt

Bestätigt per Python-Scope-Check nach dem Write: `git status --short` zeigt ausschließlich die 3 erlaubten AP-23-Pfade plus die 2 bereits vor AP-23 vorhandenen Dirty-Einträge (`session-log.md`, AP-22-Protokoll). Keine unerwarteten Pfade, kein `APP_SPEC.md`, keine `.html`-Datei im Status.

## Bewertung

### GRÜN-Kriterien

- Seed-Datei nur im plan-generator-Block geändert — erfüllt
- die vier `[Klärungsbedarf]`-Felder ersetzt — erfüllt
- Status-/Verteilungsstatus mit Seed-Governance konsistent (bestehendes Vokabular, Präzedenzfälle regulatorik-dashboard/prokrastinations-preis) — erfüllt
- plan-generator MINI_SPEC enthält genau einen Steuerungsblock — erfüllt
- plan-generator MINI_SPEC enthält genau einen APP_SPEC-Stoppwarnhinweis — erfüllt
- plan-generator MINI_SPEC enthält genau einen Entscheidungsblock — erfüllt
- Entscheidungsblock enthält alle Punkte 1–6 mit Optionen, Empfehlungen und offenen Nutzerentscheidungen — erfüllt
- LLM-STOP-Regel enthalten — erfüllt
- keine APP_SPEC- oder App-Bau-Anweisung entstanden — erfüllt
- keine anderen MINI_SPECs geändert — erfüllt
- keine HTML-/APP_SPEC-Dateien verändert — erfüllt
- Ergebnisprotokoll geschrieben — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe, falls zutreffend

Keine harten GELB-Gründe. Ein kleiner, dokumentierter Nachputzpunkt bleibt offen (siehe „Geänderte Dateien": veraltete Zeile in Seed-§5.3), wurde aber bewusst nicht repariert, um den Scope „nur plan-generator-Block" nicht zu verletzen — das ist eine Scope-Disziplin-Entscheidung, kein Qualitätsmangel dieses AP.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

Bei GRÜN (dieser Fall):

AP-24 — Review plan-generator Seed-Provenienz + Entscheidungsblock (unabhängige Prüfung ohne Übernahme der AP-23-Selbstauskunft, analog AP-18/AP-21)

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
