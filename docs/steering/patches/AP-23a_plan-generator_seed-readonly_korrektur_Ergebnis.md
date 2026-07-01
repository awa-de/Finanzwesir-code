# AP-23a — plan-generator Seed-Readonly-Korrektur — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

AP-23 hatte fälschlich die zentrale Seed-Datei `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` verändert, obwohl sie für diesen Workflow read-only ist. AP-23a hat das korrigiert: Die Seed-Datei wurde per `git checkout --` auf den letzten Git-Stand zurückgesetzt und taucht nicht mehr im Diff auf. Zusätzlich enthielt die `plan-generator`-MINI_SPEC zwei falsche Provenienzaussagen (HTML-Kommentar-Quellenangabe und Warnhinweistext), die beide auf die Seed-Datei als Ursprung des lokalen Steuerungsblocks verwiesen — das war nach dem Rollback nicht mehr zutreffend und wurde durch die korrekte Provenienz (AP-22-Klärung + Nutzerentscheidung im AP-23-Auftrag + redaktionelle Umsetzung in AP-23a) ersetzt. Steuerungsblock, APP_SPEC-Stoppwarnhinweis, Entscheidungsblock und LLM-STOP-Regel bleiben inhaltlich vollständig erhalten.

## Ausgangspunkt

Vorgänger: AP-23 (als nicht final akzeptiert zurückgewiesen)
Fehler in AP-23: Seed-Datei `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` wurde entgegen der Read-only-Regel dieses Workflows verändert (plan-generator-Block redaktionell neu gefasst, Status/Verteilungsstatus geändert).
Korrekturauftrag:

- Seed-Datei auf letzten Git-Stand zurücksetzen
- MINI_SPEC-Struktur (Steuerungsblock, Warnhinweis, Entscheidungsblock, LLM-STOP-Regel) grundsätzlich erhalten
- Falsche Seed-Provenienz-Aussagen in der MINI_SPEC korrigieren
- Neue, korrekte Provenienz: AP-22 + Nutzerentscheidung AP-23-Auftrag + redaktionelle Umsetzung AP-23a

## Durchführung

### 1. Seed-Datei zurückgesetzt

```bash
git checkout -- Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
```

### 2. Prüfung nach Reset

```text
git status --short (nach Reset):
 M .claude/learning/session-log.md
 M Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
?? docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md

git diff --name-status (nach Reset):
M	.claude/learning/session-log.md
M	Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

Ergebnis:
- Seed-Datei taucht nicht mehr im Git-Status/-Diff auf — Reset erfolgreich.
- Keine APP_SPEC im Status.
- Keine HTML-Datei im Status.
- Keine anderen Apps im Status.
- `.claude/learning/session-log.md` war bereits vor AP-23/AP-23a dirty (Session-Start-Eintrag), nicht Teil dieser Korrektur.
- Die beiden AP-22/AP-23-Ergebnisprotokolle sind Vorgänger-Artefakte (nicht Teil von AP-23a), bleiben unangetastet stehen.

### 3. MINI_SPEC-Struktur geprüft

Vor der Korrektur real gelesen (nicht aus AP-23-Protokoll übernommen): `plan-generator`-MINI_SPEC enthielt weiterhin genau einen Steuerungsblock, genau einen APP_SPEC-Stoppwarnhinweis, genau einen Entscheidungsblock mit allen 6 Punkten und die LLM-STOP-Regel. Diese Struktur blieb von der Seed-Zurücksetzung unberührt, da der AP-23-Steuerungsblock-Transfer bereits als Text in der MINI_SPEC steht (die Seed-Datei wird nach dem Einfügen nicht mehr referenziert außer über die jetzt korrigierten Provenienz-Textstellen). Kein struktureller Verlust durch den Seed-Reset.

### 4. Falsche Provenienz-Formulierungen gefunden und korrigiert

| Fundstelle | Vorher (falsch) | Nachher (korrigiert) |
|---|---|---|
| Zeile 19–20 (HTML-Kommentar direkt unter der Steuerungsblock-Überschrift) | `<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed plan-generator -->`<br>`<!-- Mechanisch eingefügt. Nicht frei formulieren. -->` | `<!-- Steuerungsblock-Quelle: AP-22-Klärung (docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md) + Nutzerentscheidung im AP-23-Auftrag + redaktionelle Umsetzung in AP-23a. -->`<br>`<!-- Die zentrale Seed-Datei (Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md) wurde bewusst nicht geändert und ist für plan-generator nicht die Provenienz dieses Blocks. -->` |
| Erster Satz des APP_SPEC-Warnhinweises | „Diese MINI_SPEC enthält einen Steuerungsblock aus der Seed-Datei. Der Block konserviert den aktuellen Rollout-Stand, ersetzt aber keine spätere APP_SPEC-Prüfung." | „Diese MINI_SPEC enthält einen redaktionell geklärten Steuerungsblock auf Basis von AP-22 und der Nutzerentscheidung im AP-23-Kontext. Die zentrale Seed-Datei wurde bewusst nicht geändert. Der Block konserviert den aktuellen Klärungsstand, ersetzt aber keine spätere APP_SPEC-Prüfung." |

Geprüft, aber bewusst nicht geändert: Zeile 89 im Standard-Warnhinweis-Checklistentext („Deckt der Steuerungsblock nur den aktuellen Seed-Stand ab oder braucht die spätere APP_SPEC eine strukturelle Neubewertung?"). Das ist eine generische Prüffrage aus dem für alle Apps identischen Warnhinweis-Template (wortgleich z. B. in `etf-vergleich`), keine spezifische Tatsachenbehauptung über die Herkunft des plan-generator-Blocks, und entspricht keinem der drei im Korrekturauftrag benannten falschen Muster („Steuerungsblock aus der Seed-Datei", „Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md", „aus Seed-Datei übertragen"). Nicht angefasst, um nicht vom Standard-Template aller anderen Apps abzuweichen.

Vollständige Grep-Kontrolle nach der Korrektur: keine der drei verbotenen Formulierungen mehr in der Datei vorhanden (siehe Mindest-QA unten).

## Mindest-QA nach Korrektur

```text
OK no_false_seed_datei_quelle_claim   ("Steuerungsblock aus der Seed-Datei" nicht mehr vorhanden)
OK no_false_quelle_line               ("Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md" nicht mehr vorhanden)
OK no_aus_seed_datei_uebertragen      ("aus Seed-Datei übertragen" war nie wörtlich vorhanden, zur Sicherheit mitgeprüft)
OK has_ap22_ap23a_provenance          (AP-22-Klärung und AP-23a im Text vorhanden)
OK has_seed_not_changed_note          ("bewusst nicht geändert" vorhanden)
OK steuerungsblock_1x                 (genau 1×)
OK warnhinweis_1x                     (genau 1×)
OK entscheidungsblock_1x              (genau 1×)
OK punkte_1_6                         (### 1. bis ### 6. vollständig)
OK llm_stop_regel                     (### LLM-STOP-Regel vorhanden)
OK fachinhalt_erhalten                (### Aufbau: Zwei Stufen vorhanden, unverändert)
```

## Geänderte Dateien

```text
Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md   (nur die 2 Provenienz-Textstellen korrigiert, Rest unverändert)
docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md   (neu)
```

Zurückgesetzt (nicht mehr im Diff):

```text
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md   (git checkout -- , Stand vor AP-23 wiederhergestellt)
```

## Scope-QA

Nicht geändert / nicht angefasst:

- Seed-Datei nicht mehr im Git-Diff — bestätigt
- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine anderen MINI_SPECs geändert
- keine App gebaut
- kein Commit erzeugt

## Bewertung

### GRÜN-Kriterien

- Seed-Datei erfolgreich zurückgesetzt, taucht nicht mehr im Status/Diff auf — erfüllt
- keine APP_SPEC/HTML/andere-Apps im Status — erfüllt
- MINI_SPEC-Struktur (Steuerungsblock, Warnhinweis, Entscheidungsblock, Punkte 1–6, LLM-STOP-Regel) vollständig erhalten — erfüllt
- alle drei benannten falschen Provenienz-Muster aus der MINI_SPEC entfernt — erfüllt
- korrekte Provenienz (AP-22 + Nutzerentscheidung AP-23-Auftrag + AP-23a) eingefügt — erfüllt
- nur die beiden erlaubten Dateien verändert — erfüllt
- Ergebnisprotokoll geschrieben — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe, falls zutreffend

Keine.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

AP-24 — Review plan-generator MINI_SPEC ohne Seed-Provenienz, aber mit AP-22/AP-23a-Provenienzprüfung (unabhängige Prüfung ohne Übernahme der AP-23a-Selbstauskunft, analog AP-18/AP-21)

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
