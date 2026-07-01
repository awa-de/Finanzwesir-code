Stand: 2026-07-01 | Session: AP-17 | Geändert von: Claude

# AP-17 — Steuerungsblock-Rollout Batch C — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Alle 4 Batch-C-Standard-Kandidaten (etf-aera-vorbei, replizierer-swapper,
thesaurierer-rennen, weltdepot-baukasten) haben nach vollständig grünem
Dry-run einen mechanisch aus der Seed-Datei übertragenen Steuerungsblock
erhalten. Verwendet wurde das bestehende, aus Batch A/B bewährte Tool
`tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py`. Kein
neues Tool gebaut, keine Seed-Datei geändert, keine der 5 ausgeschlossenen
Apps berührt.

## Ausgangspunkt

Vorgänger: AP-16
AP-16-Status: GRÜN
Batch-C-Kandidaten:

- etf-aera-vorbei
- replizierer-swapper
- thesaurierer-rennen
- weltdepot-baukasten

Ausgeschlossen:

- plan-generator
- etf-vergleich
- investment-universum
- rollierende-sparplaene
- weltkarte-etf-indizes

## Vorprüfung / Git-Baseline

Baseline vor AP-17 (bereits vor AP-16 bestehend, nicht durch AP-17 verursacht):

```
M  .claude/learning/session-log.md
M  docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-01-steuerungsblock-rollout-ap14-abschluss.md
?? docs/steering/patches/AP-16_steuerungsblock-rollout_statusabgleich-restliste_Ergebnis.md
```

Durch AP-17 neu entstanden:

```
M  Apps/etf-aera-vorbei/MINI_SPEC_FROM_HAUPTDOKUMENT.md
M  Apps/replizierer-swapper/MINI_SPEC_FROM_HAUPTDOKUMENT.md
M  Apps/thesaurierer-rennen/MINI_SPEC_FROM_HAUPTDOKUMENT.md
M  Apps/weltdepot-baukasten/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-17_steuerungsblock-rollout_batch-c_Ergebnis.md
```

`session-log.md` und `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` waren
bereits vor AP-16 dirty und blieben durch AP-17 unverändert (identischer
Diff-Zustand vorher/nachher). Keine unerwarteten Änderungen an nicht
erlaubten Dateien.

Pflichtdateien-Check vor Beginn: alle 6 Pflichtquellen (AP-16-Protokoll,
Seed-Datei, 4 Ziel-MINI_SPECs) vorhanden — Skript-Exit 0.

## Gelesene Quellen

```
docs/steering/patches/AP-16_steuerungsblock-rollout_statusabgleich-restliste_Ergebnis.md
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
Apps/etf-aera-vorbei/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Apps/replizierer-swapper/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Apps/thesaurierer-rennen/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Apps/weltdepot-baukasten/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

Keine APP_SPEC-, HTML-, Mockup- oder Sonderfall-/Companion-Dateien gelesen
oder verändert.

## Gefundene bestehende Tools / Protokolle

Zwei ähnlich benannte Tools gefunden:

- `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py`
  — Ziel: `MINI_SPEC_FROM_HAUPTDOKUMENT.md`. Genau das für AP-17 passende
  Werkzeug (bereits in AP-12c für Batch A und laut AP-13b-Protokoll für
  Batch B verwendet). Unterstützt `--slug`, `--slugs` (kommasepariert),
  Standard-Dry-run, `--write`, `--diff`.
- `tools/app_fabrik/insert_steuerungsblock_from_seed.py`
  — Ziel: `APP_SPEC.md` (AP-10, prokrastinations-preis). Nicht einschlägig
  für AP-17, da Batch C keine APP_SPEC-Ziele hat. Nicht verwendet.

Entscheidung: bestehendes MINI_SPEC-Tool direkt verwendet, kein neues Skript
gebaut.

## Dry-run-Ergebnis

| App | Seed-Block eindeutig | Ziel ohne Steuerungsblock | Einfügestelle eindeutig | Dry-run Status | Begründung |
|---|---:|---:|---:|---|---|
| etf-aera-vorbei | ja | ja | ja (vor Zeile 17: `### Problem, das gelöst wird`) | GRÜN | Ziel/Seed gefunden, Anker eindeutig, Marker-Validierung bestanden |
| replizierer-swapper | ja | ja | ja (vor Zeile 16: `### Kernbotschaft`) | GRÜN | Ziel/Seed gefunden, Anker eindeutig, Marker-Validierung bestanden |
| thesaurierer-rennen | ja | ja | ja (vor Zeile 16: `### Kernbotschaft`) | GRÜN | Ziel/Seed gefunden, Anker eindeutig, Marker-Validierung bestanden |
| weltdepot-baukasten | ja | ja | ja (vor Zeile 16: `### Kernbotschaft`) | GRÜN | Ziel/Seed gefunden, Anker eindeutig, Marker-Validierung bestanden |

Gesamtergebnis Dry-run: 4/4 GRÜN, 0 GELB, 0 ROT. Diff-Stichprobe für
`etf-aera-vorbei` geprüft — Steuerungsblock wird unmittelbar nach dem
Metadaten-Block eingefügt, keine Fremdinhalte, keine Umformulierung.

## Geänderte Dateien

```
Apps/etf-aera-vorbei/MINI_SPEC_FROM_HAUPTDOKUMENT.md       (Steuerungsblock eingefügt)
Apps/replizierer-swapper/MINI_SPEC_FROM_HAUPTDOKUMENT.md    (Steuerungsblock eingefügt)
Apps/thesaurierer-rennen/MINI_SPEC_FROM_HAUPTDOKUMENT.md    (Steuerungsblock eingefügt)
Apps/weltdepot-baukasten/MINI_SPEC_FROM_HAUPTDOKUMENT.md    (Steuerungsblock eingefügt)
docs/steering/patches/AP-17_steuerungsblock-rollout_batch-c_Ergebnis.md  (dieses Protokoll, neu)
```

Keine Seed-, APP_SPEC-, HTML- oder Sonderfall-/Companion-Datei geändert.

## Datei-Wahrheit nach Write

Für jede Ziel-MINI_SPEC nach vollständigem Wiederlesen aus der realen Datei:

| App | Steuerungsblock-Marker genau 1× | LLM-Prüfung vorhanden | Wiederlesen erfolgt | Status |
|---|---:|---:|---:|---|
| etf-aera-vorbei | ja (1) | ja | ja | GRÜN |
| replizierer-swapper | ja (1) | ja | ja | GRÜN |
| thesaurierer-rennen | ja (1) | ja | ja | GRÜN |
| weltdepot-baukasten | ja (1) | ja | ja | GRÜN |

Marker-QA-Skript-Ausgabe (Auszug): `marker_count=1, llm=True` für alle 4
Dateien, keine QA-Fehler ausgelöst.

## Scope-QA

Nicht geändert / nicht angefasst:

- Seed-Datei unverändert (`git diff --stat` auf Seed-Pfad: kein Treffer)
- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine erledigten Apps (Batch A/B, regulatorik-dashboard, prokrastinations-preis) geändert
- keine unklaren Apps geändert (`git diff --stat` auf plan-generator,
  etf-vergleich, investment-universum, rollierende-sparplaene,
  weltkarte-etf-indizes: kein Treffer)
- kein App-Bau-Scope geöffnet
- kein Commit erzeugt

## Bewertung

### GRÜN-Kriterien

- Dry-run für alle 4 Ziel-Apps vollständig GRÜN — erfüllt.
- Write nur für die 4 Ziel-MINI_SPECs ausgeführt — erfüllt.
- Ergebnisprotokoll geschrieben — erfüllt.
- Alle 4 Ziel-MINI_SPECs nach Write vollständig wieder gelesen — erfüllt.
- Marker-QA bestanden (genau 1 Steuerungsblock je Datei) — erfüllt.
- LLM-Prüfungs-QA bestanden (LLM-Prüfscore-Abschnitt in allen 4 vorhanden) — erfüllt.
- Scope-QA bestanden (Seed, unklare Apps, APP_SPEC, HTML unberührt) — erfüllt.
- Keine verbotenen Dateien geändert — erfüllt.

### GELB-Gründe, falls zutreffend

Keine.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

AP-18 — unabhängiger Review Steuerungsblock-Rollout Batch C

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
- Klärung der 5 Sonder-/Companion-Fälle ohne separaten Klärungs-AP
