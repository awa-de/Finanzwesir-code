# AP-20 — Steuerungsblock-Rollout Sonderbatch D mit APP_SPEC-Stoppwarnung — Ergebnis

## Status

Status: GELB
Blocker: nein

## Kurzbefund

4 von 5 Sonderbatch-D-Apps sind sowohl mechanisch (Tool-Marker) als auch inhaltlich (reale Seed-Substanz) bereit für die Steuerungsblock-Integration: `etf-vergleich`, `investment-universum`, `rollierende-sparplaene`, `weltkarte-etf-indizes`.

`plan-generator` besteht die mechanische Tool-Validierung ebenfalls (5/5 GRÜN laut Dry-run), enthält aber laut Seed-Datei den Status **GESPERRT** (`Verteilungsstatus: Gesperrt`) und vier Kernfelder mit reinem Platzhaltertext `[Klärungsbedarf]` statt echtem Inhalt (Zweck, Barriere, Glaubenssatz, Zielzustand). Die Seed-Datei selbst definiert in Abschnitt „1. Quellenstatus": „GESPERRT: Nicht verteilen, erst fachliche Klärung." Das Tool prüft nur das Vorhandensein von Markern/Labels, nicht den Wahrheitsgehalt des Inhalts dahinter — die mechanische GRÜN-Meldung für `plan-generator` ist deshalb irreführend.

Da AP-20 für den Dry-run ausdrücklich vorschreibt „Wenn eine App im Dry-run nicht GRÜN ist: STOP für den gesamten Batch. Keine Teilübertragung.", wurde **kein Write ausgeführt**. Es wurden keine MINI_SPEC-Dateien verändert. Der APP_SPEC-Stoppwarnhinweis wurde ebenfalls noch nicht eingefügt, da er im selben Batch-Write hätte erfolgen sollen.

## Ausgangspunkt

Befundanker: AP-16, AP-17, AP-18
AP-18-Status: GRÜN (unabhängiger Review Batch C bestätigt)
Sonderbatch-D-Kandidaten:

- plan-generator
- etf-vergleich
- investment-universum
- rollierende-sparplaene
- weltkarte-etf-indizes

Arbeitsentscheidung laut Auftrag:

- Seed-Blöcke werden integriert, sofern vorhanden.
- Rollenunsicherheit wird nicht vorab final geklärt.
- Jede Ziel-MINI_SPEC sollte zusätzlich einen APP_SPEC-Stoppwarnhinweis erhalten.

Diese Arbeitsentscheidung ging von „Seed-Block vorhanden = integrierbar" aus. Für `plan-generator` ist zwar ein Seed-Block *vorhanden* (Überschrift, Struktur), aber sein Status ist explizit GESPERRT und sein Inhalt ist kein echter Seed, sondern eine Klärungsfrage-Liste. Das ist ein Unterschied zwischen „Block existiert" und „Block ist verteilungsreif", den der Auftrag selbst nicht vorgesehen hatte.

## Vorprüfung / Git-Baseline

```text
git status --short (vor AP-20-Write):
 M .claude/learning/session-log.md   ← bereits vor AP-20 vorhanden (KETTENMODUS-Session-Start-Eintrag)

git log --oneline -5:
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt
83d0df6 docs(AP-14a): regulatorik-dashboard Drift-Schutz-Inventar und Materialdiagnose

git diff --name-status (vor AP-20-Write):
M	.claude/learning/session-log.md
```

- Vor AP-20 bereits dirty: `.claude/learning/session-log.md` (Session-Start-Schreibung, nicht Teil von AP-20).
- Durch AP-20 neu verändert: nur dieses Ergebnisprotokoll (neue Datei).
- Unerwartete Änderungen an nicht erlaubten Dateien: keine.

## Gelesene Quellen

- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (Kopfteil §0–§2.1 vollständig, sowie alle 5 Ziel-Seed-Blöcke einzeln: rollierende-sparplaene, investment-universum, weltkarte-etf-indizes, etf-vergleich, plan-generator)
- `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/investment-universum/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/rollierende-sparplaene/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/weltkarte-etf-indizes/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `docs/steering/patches/AP-16_steuerungsblock-rollout_statusabgleich-restliste_Ergebnis.md` (indirekt bereits aus Vorsession bekannt, Restliste bestätigt)
- `docs/steering/patches/AP-18_review_steuerungsblock-rollout_batch-c_Ergebnis.md` (indirekt bereits aus Vorsession bekannt)
- `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` (vollständig gelesen)

## Gefundene bestehende Tools / Protokolle

`tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` (aus AP-12b, bereits in AP-17 für Batch C verwendet) ist für diese 5 Slugs direkt geeignet:

- unterstützt `--slugs slug1,slug2,...` für eine beliebige Teilmenge
- Seed bleibt unverändert (nur gelesen)
- Anker-Regel (AP-12a) funktioniert unverändert: erster App-H2-Header, dann nächste `##`/`###`-Überschrift
- Marker-Validierung (Positiv-/Negativ-Marker) läuft automatisch mit

Kein neues Tool gebaut. Für den APP_SPEC-Stoppwarnhinweis existiert kein Tool — dieser Teil war für einen zweiten, separaten Schritt (temporäres Skript nach erfolgreichem Steuerungsblock-Write) vorgesehen, kam aber wegen des Batch-Stops nicht zur Ausführung.

## Dry-run-Ergebnis

| App | Seed-Block eindeutig | Ziel ohne Steuerungsblock | Warnhinweis noch nicht vorhanden | Einfügestellen eindeutig | Dry-run Status | Begründung |
|---|---:|---:|---:|---:|---|---|
| plan-generator | ja | ja | ja | ja | **GELB** (mechanisch GRÜN, inhaltlich gesperrt) | Seed-Status GESPERRT, 4 Kernfelder nur `[Klärungsbedarf]`-Platzhalter statt echtem Inhalt — Distribution widerspricht Seed-eigener Governance-Regel (§1: „GESPERRT: Nicht verteilen") |
| etf-vergleich | ja | ja | ja | ja | GRÜN | Vollständiger, inhaltlich echter Seed-Block, Anker eindeutig vor Zeile 26 |
| investment-universum | ja | ja | ja | ja | GRÜN | Vollständiger, inhaltlich echter Seed-Block, Anker eindeutig vor Zeile 13 |
| rollierende-sparplaene | ja | ja | ja | ja | GRÜN | Vollständiger, inhaltlich echter Seed-Block, Anker eindeutig vor Zeile 14 |
| weltkarte-etf-indizes | ja | ja | ja | ja | GRÜN | Vollständiger, inhaltlich echter Seed-Block, Anker eindeutig vor Zeile 13 |

Tool-Ausgabe (mechanische Marker-Validierung, ohne semantische Prüfung): `5/5 GRUEN | 0 GELB | 0 ROT` — die GELB-Einstufung für `plan-generator` in obiger Tabelle ist eine zusätzliche, im Tool nicht abgebildete inhaltliche Bewertung dieser Session, keine Tool-Ausgabe.

**Batch-Entscheidung gemäß AP-20-Vorgabe „keine Teilübertragung":** Da nicht alle 5 Apps ohne Vorbehalt GRÜN sind, wurde kein Write für den gesamten Sonderbatch D ausgeführt.

## Geänderte Dateien

Nur diese Datei (neu angelegt):

```text
docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md
```

Keine der 5 Ziel-MINI_SPECs wurde verändert. Kein Steuerungsblock, kein Warnhinweis eingefügt.

## Datei-Wahrheit nach Write

Entfällt — kein Write ausgeführt. Alle 5 Ziel-MINI_SPECs sind unverändert gegenüber dem Stand vor AP-20 (per `git diff --name-status` bestätigt: nur das Ergebnisprotokoll ist neu).

| App | Steuerungsblock-Marker genau 1× | LLM-Prüfung vorhanden | Warnhinweis genau 1× | STOP-Regel vorhanden | Wiederlesen erfolgt | Status |
|---|---:|---:|---:|---:|---:|---|
| plan-generator | nein (0×) | nein | nein (0×) | nein | ja (Baseline bestätigt) | unverändert |
| etf-vergleich | nein (0×) | nein | nein (0×) | nein | ja (Baseline bestätigt) | unverändert |
| investment-universum | nein (0×) | nein | nein (0×) | nein | ja (Baseline bestätigt) | unverändert |
| rollierende-sparplaene | nein (0×) | nein | nein (0×) | nein | ja (Baseline bestätigt) | unverändert |
| weltkarte-etf-indizes | nein (0×) | nein | nein (0×) | nein | ja (Baseline bestätigt) | unverändert |

## Scope-QA

Nicht geändert / nicht angefasst:

- Seed-Datei unverändert (nur gelesen)
- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine bereits erledigten Apps (Batch A/B/C, Sonderfälle) geändert
- kein Parent-/Companion-Merge
- kein App-Bau-Scope geöffnet
- kein Commit erzeugt

## Bewertung

### GRÜN-Kriterien

Nicht erfüllt — Dry-run war nicht für alle 5 Ziel-Apps vorbehaltlos GRÜN (`plan-generator` inhaltlich blockiert). Deshalb kein Write, keine GRÜN-Vergabe für den Gesamtbatch.

### GELB-Gründe

- Dry-run zeigt eine klärbare Lücke: `plan-generator` ist im Seed explizit GESPERRT und enthält nur Klärungsfrage-Platzhalter statt Inhalt.
- Keine Datei wurde verändert außer diesem Ergebnisprotokoll — keine unerlaubte oder unvollständige Schreibaktion.
- Ein kleiner Folge-AP kann den Befund klären (die vier im Seed selbst bereits vorhandenen Klärungsfragen zu `plan-generator` beantworten).
- Die 4 übrigen Apps sind inhaltlich und mechanisch bereit; sie wurden bewusst nicht separat geschrieben, weil AP-20 „keine Teilübertragung" ausdrücklich verbietet.

### ROT-Gründe

Keine. Keine falsche Datei verändert, keine Seed-Datei verändert, kein Scope-Drift, kein Write ohne Dry-run.

## Nächster richtiger AP

Bei GRÜN: AP-21 — unabhängiger Review Sonderbatch D (entfällt, da kein Write erfolgte)

Bei GELB (dieser Fall): kleiner Klärungs-/Fix-AP zu `plan-generator`, der die vier bereits im Seed formulierten Klärungsfragen beantwortet:

- Wofür existiert diese App?
- Welche Barriere soll sie entfernen?
- Was darf sie ausdrücklich nicht tun?
- Bleibt sie Teil der App-Fabrik oder wird sie gestrichen/verschoben?

Erst danach ist ein erneuter Dry-run für den vollständigen Sonderbatch D sinnvoll. Alternativ kann Albert entscheiden, `plan-generator` aus Sonderbatch D herauszulösen und die 4 übrigen Apps in einem eigenen, kleineren AP (z. B. AP-20b) schreiben zu lassen — das wäre eine bewusste Abweichung von der „keine Teilübertragung"-Regel dieses AP und bedarf daher ausdrücklich Alberts Entscheidung, nicht meiner eigenen.

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
