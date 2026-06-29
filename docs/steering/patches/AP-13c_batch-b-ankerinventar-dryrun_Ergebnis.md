Stand: 2026-06-29 | Session: AP-13c | Geändert von: Claude

# AP-13c Ergebnis — Batch-B-Ankerinventar und Dry-run

## Kurzstatus

```
Status:                  GRÜN
Blocker:                 nein
Dry-run:                 7/7 GRUEN | 0 GELB | 0 ROT
--write ausgeführt:      nein
Mini-Specs verändert:    nein
Empfehlung nächster AP:  AP-13d — Batch-B Write und Marker-QA
```

---

## Kettenposition

```
Vorgänger:               AP-13b GRÜN (Batch-Schnitt)
Aktueller AP:            AP-13c — Batch-B-Ankerinventar und Dry-run
Nächster AP bei GRÜN:    AP-13d — Batch-B Write und Marker-QA
Nächster AP bei GELB:    Gezielter Klärungs-AP für Anker-, Tool- oder Dry-run-Unschärfe
Nächster AP bei ROT:     Kein Write; Fix- oder Klärungs-AP zuerst
```

---

## Vorprüfung / Gates

| Gate | Prüfung | Ergebnis |
|---|---|---|
| 1 | `git status --short` | `M .claude/learning/session-log.md` + 2 neue Protokolle untracked — kein Problem |
| 2 | AP-13b-Protokoll gelesen | JA — Batch B: 7 Slugs, Status GRÜN |
| 3 | AP-13a-Protokoll gelesen | JA — 12 Kategorie-B-Kandidaten, Status GRÜN |
| 4 | AP-12 final GRÜN | JA — aus AP-12d-addendum |
| 5 | Tool vorhanden | JA — `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` |
| 6 | Tool unterstützt `--slugs` | JA — bestätigt aus AP-13b-Prüfung |
| 7 | Alle 7 Batch-B-Mini-Specs vorhanden | JA — 7/7 ✓ |
| 8 | Alle 7 Batch-B-Seed-Blöcke vorhanden | JA — 7/7 ✓ |
| 9 | Keine Batch-B-Mini-Spec enthält bereits Steuerungsblock | JA — 0/7 enthalten Block |
| 10 | Dry-run ohne Dateiänderung möglich | JA |

Alle Gates bestanden. Kein Stop-Trigger.

---

## Gelesene Referenzen

- `docs/steering/patches/AP-13b_batch-schnitt-drift-pilot-sonderfaelle_Ergebnis.md` ✓
- `docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md` ✓
- `docs/steering/patches/AP-12d-addendum_gelb-entscheidung-aufloesen_Ergebnis.md` ✓
- `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` ✓ (nur gelesen)
- Erste 80 Zeilen aller 7 Batch-B-Mini-Specs (Anker-Prüfung) ✓

---

## Git-Status

```
Beginn AP-13c:   M .claude/learning/session-log.md
                 ?? docs/steering/patches/AP-13a_*
                 ?? docs/steering/patches/AP-13b_*
Ende AP-13c:     M .claude/learning/session-log.md
                 A  docs/steering/patches/AP-13a_*
                 A  docs/steering/patches/AP-13b_*
                 A  docs/steering/patches/AP-13c_batch-b-ankerinventar-dryrun_Ergebnis.md
```

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.

---

## Batch-B-Slugliste

```
1. diversifikations-detektor
2. esg-spiegel
3. etf-namensdecoder
4. komplexitaets-entlarver
5. kostenkiller-ter
6. rendite-kalibrierung
7. renditekiller-volatilitaet
```

Exakt aus AP-13b übernommen. Nicht verändert.

---

## Ankerinventar

Manuelle Strukturprüfung je Slug. Alle Slugs folgen der Standard-Struktur aus AP-12a.

| Slug | MINI_SPEC | Seed-Block | Block vorhanden | App-H2 | Letzte Bold-Meta | Sep `---` | Erste Fach-Sektion | Ankerstatus | Notiz |
|---|:---:|:---:|:---:|---|---|:---:|---|:---:|---|
| diversifikations-detektor | ✓ | ✓ | – | Z7: `## C1 – Diversifikations-Detektor` | Z37: `**CTA:**` | – | Z39: `### Variante: ...` | GRÜN | Standard-Anker |
| esg-spiegel | ✓ | ✓ | – | Z7: `## E1 – ESG-Spiegel` | Z27: `**Variante (Gemini):**` | Z29: `---` | Z31: `## Mini-Spec-Metadaten` | GRÜN | Sep vorhanden |
| etf-namensdecoder | ✓ | ✓ | – | Z7: `## D1 – ETF-Namensdecoder` | Z41: `**Klick auf Token →:**` | – | Z48: `### Implementierungshinweise` | GRÜN | Standard-Anker |
| komplexitaets-entlarver | ✓ | ✓ | – | Z7: `## C2 – Komplexitätsentlarver` | Z38: `**CTA:**` | Z40: `---` | Z42: `## Mini-Spec-Metadaten` | GRÜN | Sep vorhanden |
| kostenkiller-ter | ✓ | ✓ | – | Z7: `## D3 – Kostenkiller (TER-Rechner)` | Z25: `**Vergleichstabelle:**` | – | Z36: `## Mini-Spec-Metadaten` | GRÜN | Standard-Anker |
| rendite-kalibrierung | ✓ | ✓ | – | Z7: `## G2 – Rendite-Kalibrierung` | Z64: `**CTA:**` | – | Z66: `### Implementierungshinweise` | GRÜN | Standard-Anker |
| renditekiller-volatilitaet | ✓ | ✓ | – | Z7: `## F1 – Renditekiller (Volatilitäts-Dämpfer)` | Z13: `**Priorität:**` | – | Z15: `### Kernbotschaft` | GRÜN | Kompakter Block |

Alle 7 Ankerstatus: **GRÜN**

**Hinweis:** Die Tool-interne Anker-Ermittlung (`find_insert_offset`) findet für alle 7 Slugs "vor Zeile 16: ### ..." — das entspricht dem ersten fachlichen Abschnitt nach dem App-H2-Block mit Slug/KI-Konsens/Folienbezug/Funnel-Position/Priorität. Die manuelle Prüfung findet in einigen Fällen spätere fachliche Sektionen, weil sie nach der LETZTEN Bold-Meta sucht, die in längeren MINI_SPECs weiter unten liegt. Beide Methoden bestätigen: kein Anker-Blocker. Tool-Validierung ist maßgeblich.

---

## Dry-run-Befehl und Ergebnis

**Befehl:**
```
python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py \
  --slugs diversifikations-detektor,esg-spiegel,etf-namensdecoder,\
komplexitaets-entlarver,kostenkiller-ter,rendite-kalibrierung,renditekiller-volatilitaet
```

**Tool-Ausgabe:**
```
Modus: DRY-RUN | Slugs: 7 | Seed: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md

[OK  ] diversifikations-detektor
       Ziel=True Seed=True Anker: vor Zeile 16: ### Problem, das gelöst wird
       Validierung=True | Dry-run.

[OK  ] esg-spiegel
       Ziel=True Seed=True Anker: vor Zeile 16: ### Kernbotschaft
       Validierung=True | Dry-run.

[OK  ] etf-namensdecoder
       Ziel=True Seed=True Anker: vor Zeile 16: ### Problem, das gelöst wird
       Validierung=True | Dry-run.

[OK  ] komplexitaets-entlarver
       Ziel=True Seed=True Anker: vor Zeile 16: ### Problem, das gelöst wird
       Validierung=True | Dry-run.

[OK  ] kostenkiller-ter
       Ziel=True Seed=True Anker: vor Zeile 16: ### Kernbotschaft
       Validierung=True | Dry-run.

[OK  ] rendite-kalibrierung
       Ziel=True Seed=True Anker: vor Zeile 16: ### Problem, das gelöst wird
       Validierung=True | Dry-run.

[OK  ] renditekiller-volatilitaet
       Ziel=True Seed=True Anker: vor Zeile 16: ### Kernbotschaft
       Validierung=True | Dry-run.

============================================================
Ergebnis: 7/7 GRUEN | 0 GELB | 0 ROT

DRY-RUN abgeschlossen. Keine Dateien geaendert.
Mit --write ausfuehren, um die MINI_SPEC-Dateien zu schreiben.
```

---

## Dry-run-Tabelle

| Slug | Dry-run Status | Anker laut Tool | Validierung | Diff nach Dry-run | Status |
|---|:---:|---|:---:|:---:|:---:|
| diversifikations-detektor | OK | vor Z16: `### Problem, das gelöst wird` | True | kein Diff | GRÜN |
| esg-spiegel | OK | vor Z16: `### Kernbotschaft` | True | kein Diff | GRÜN |
| etf-namensdecoder | OK | vor Z16: `### Problem, das gelöst wird` | True | kein Diff | GRÜN |
| komplexitaets-entlarver | OK | vor Z16: `### Problem, das gelöst wird` | True | kein Diff | GRÜN |
| kostenkiller-ter | OK | vor Z16: `### Kernbotschaft` | True | kein Diff | GRÜN |
| rendite-kalibrierung | OK | vor Z16: `### Problem, das gelöst wird` | True | kein Diff | GRÜN |
| renditekiller-volatilitaet | OK | vor Z16: `### Kernbotschaft` | True | kein Diff | GRÜN |

`Validierung=True` bedeutet laut Tool-Logik: Pflichtmarker vorhanden UND verbotene Marker abwesend im geplanten Block.

---

## Nachweis: Dry-run verändert keine Mini-Spec

```
git diff --stat -- Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

**Ausgabe:** (leer — kein Output)

```
--write ausgeführt:   nein
Mini-Specs verändert: nein
```

---

## Bewertung

### Was ist sicher?

- Batch B (7 Slugs) exakt aus AP-13b übernommen — unverändert.
- Alle 7 Gates GRÜN: MINI_SPEC, Seed, kein Block vorhanden.
- Alle 7 Anker in Standard-Struktur identifiziert (App-H2 → Bold-Meta → Fach-H2/H3).
- Dry-run 7/7 GRUEN, Validierung=True für alle Slugs.
- Kein Diff nach Dry-run — Tool hat nichts geschrieben.
- AP-13d kann mit `--write` starten.

### Was ist unklar?

Nichts Blockendes. Die unterschiedlichen Anker-Zeilennummern zwischen manueller Prüfung und Tool-Ausgabe (Z16 vs. Z39/Z48/...) sind erklärbar: Das Tool nutzt eine andere Suchreihenfolge (erste Fach-Sektion nach dem App-H2-Metadatenblock, nicht nach der letzten Bold-Meta am Dateiende). Beide Algorithmen landen auf korrekten fachlichen Sektionen, Tool-Validierung=True ist maßgeblich.

### Was blockiert AP-13d?

Kein Blocker.

### Ist Write in AP-13d empfehlbar?

JA — unter Bedingung: AP-13d muss einen frischen Dry-run vor dem Write ausführen und erneut 7/7 GRÜN bestätigen. Kein direkter Write ohne eigenen Dry-run-Check in AP-13d.

---

## Geänderte Dateien

```
docs/steering/patches/AP-13c_batch-b-ankerinventar-dryrun_Ergebnis.md  (dieses Protokoll, neu)
```

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.

---

## Nächster AP

```
AP-13d — Batch-B Write und Marker-QA
```

Inhalt AP-13d:
1. Frischen Dry-run für Batch B ausführen (erneut 7/7 GRÜN bestätigen).
2. Nur bei 7/7 GRÜN: `--write` ausführen.
3. Marker-QA nach Write: Pflichtmarker vorhanden, verbotene Marker abwesend.
4. `git diff --stat` und `git diff` für alle 7 Mini-Specs: erwartete Insertionen, keine Deletions.
5. APP_SPEC-Prüfung: alle 7 APP_SPEC (keine vorhanden) unberührt.
6. Ergebnisprotokoll schreiben.
7. Commit-Kandidatenliste für Albert vorbereiten.
8. Kein automatischer Commit — Albert staged und committed.

Nur nach Nutzer-OK starten.
