Stand: 2026-06-29 | Session: AP-13b | Geändert von: Claude

# AP-13b Ergebnis — Batch-Schnitt mit Drift-/Pilot-Sonderfällen

## Kurzstatus

```
Status:                  GRÜN
Blocker:                 nein
Batch B:                 7 Standard-Kandidaten geschnitten
Sonderpfade:             2 (regulatorik-dashboard, prokrastinations-preis)
Empfehlung nächster AP:  AP-13c — Batch-B-Ankerinventar und Rollout-Vorbereitung
```

---

## Kettenposition

```
Vorgänger:               AP-13a GRÜN (Restbestand-Inventar)
Aktueller AP:            AP-13b — Batch-Schnitt mit Drift-/Pilot-Sonderfällen
Nächster AP bei GRÜN:    AP-13c — Batch-B-Ankerinventar und Rollout-Vorbereitung für Standard-Kandidaten
Zusätzliche Folge-APs:   AP-14a — regulatorik-dashboard Drift-Schutz-Sonderpfad
                         AP-15a — prokrastinations-preis Pilot-Abgleich MINI_SPEC ↔ APP_SPEC
Nächster AP bei GELB:    Gezielter Klärungs-AP für benannte Batch- oder Sonderfall-Unschärfe
Nächster AP bei ROT:     Kein Rollout; Fix- oder Klärungs-AP zuerst
```

---

## Vorprüfung / Gates

| Gate | Prüfung | Ergebnis |
|---|---|---|
| 1 | `git status --short` | `M .claude/learning/session-log.md` + `?? AP-13a-Protokoll` — kein Problem |
| 2 | AP-13a-Protokoll gelesen | JA — 25 Apps, 12 Kategorie-B-Kandidaten, Status GRÜN |
| 3 | AP-12 final GRÜN bestätigt | JA — aus AP-12d-addendum |
| 4 | Nutzerkorrektur regulatorik-dashboard + prokrastinations-preis integrierbar | JA |
| 5 | Batch-Schnitt ohne Dateiänderungen möglich | JA |
| 6 | Ergebnisprotokoll-Pfad schreibbar | JA |

Alle Gates bestanden. Kein Stop-Trigger ausgelöst.

---

## Gelesene Referenzen

- `docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md` ✓
- `docs/steering/patches/AP-12d-addendum_gelb-entscheidung-aufloesen_Ergebnis.md` ✓ (AP-12 GRÜN bestätigt)
- `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` ✓ (Tool-Lage geprüft)

---

## Git-Status

```
Beginn AP-13b:   M .claude/learning/session-log.md
                 ?? docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md
Ende AP-13b:     M .claude/learning/session-log.md
                 A  docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md
                 A  docs/steering/patches/AP-13b_batch-schnitt-drift-pilot-sonderfaelle_Ergebnis.md
```

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.

---

## Nutzerkorrektur

### regulatorik-dashboard

```
AP-13a-Notiz:   „BEREITS GEBAUT" — wurde in AP-13a als Kategorie-B-Kandidat mit Warnung geführt.
Nutzerkorrektur: Die Notiz „BEREITS GEBAUT" ist kein Fertigstellungsstatus.
                 Die App ist nicht fertig.
                 Es gibt mehr Material und Prototypen als bei anderen Apps,
                 aber das ist gerade die Drift-Gefahr.
                 Altes Material kann überzeugend wirken und in die falsche Richtung führen.
                 Der Steuerungsblock ist hier besonders wichtig,
                 damit spätere APP_SPEC und Prototypen hart dagegen geprüft werden können.
Einordnung AP-13b: B+ — Drift-priorisierter Kandidat / Sonderpfad.
                   Nicht in Standard-Batch B.
                   Eigener AP-14a.
```

### prokrastinations-preis

```
AP-13a-Einordnung: Kategorie C — Pilot / APP_SPEC vorhanden.
Nutzerkorrektur:   Nicht als erledigt behandeln.
                   Die App ist ungefähr 80 % fertig und hat bereits eine APP_SPEC.
                   Trotzdem soll die MINI_SPEC aktualisiert werden,
                   weil der Pilotstatus Ungereimtheiten erzeugt hat.
                   Die aktualisierte MINI_SPEC gibt später die Chance,
                   die APP_SPEC nochmal gegen den Steuerungsblock zu prüfen.
Einordnung AP-13b: P — Pilot-Sonderfall mit MINI_SPEC-Aktualisierung und APP_SPEC-Abgleich.
                   Nicht in Standard-Batch B.
                   Eigener AP-15a.
```

---

## Finaler Batch B

7 Standard-Kandidaten. Kein Tausch gegenüber dem Arbeitsvorschlag — alle Kriterien erfüllt.

| Reihenfolge | Slug | AP-13a-Status | Anker | Notiz |
|---:|---|---|:---:|---|
| 1 | diversifikations-detektor | B — Standard-Kandidat | JA | — |
| 2 | esg-spiegel | B — Standard-Kandidat | JA | — |
| 3 | etf-namensdecoder | B — Standard-Kandidat | JA | — |
| 4 | komplexitaets-entlarver | B — Standard-Kandidat | JA | — |
| 5 | kostenkiller-ter | B — Standard-Kandidat | JA | — |
| 6 | rendite-kalibrierung | B — Standard-Kandidat | JA | — |
| 7 | renditekiller-volatilitaet | B — Standard-Kandidat | JA | — |

Alle 7 erfüllen:
- MINI_SPEC vorhanden ✓
- Seed-Block vorhanden ✓
- Kein MINI_SPEC-Steuerungsblock ✓
- Anker laut AP-13a JA ✓
- Kein Sonderfall ✓
- Kein Companion ✓

Batchgröße 7 entspricht dem bewährten Batch-A-Umfang.

---

## Zurückgestellte Standard-Kandidaten

Vier Kategorie-B-Kandidaten nicht in Batch B — bewusste Zurückstellung, kein Blocker.

| Slug | Grund der Zurückstellung | Empfohlener späterer Pfad |
|---|---|---|
| etf-aera-vorbei | KI-Konsens ★ (niedrigster in Restbestand); thematisch Systemkritik / Einwände-Block | Batch C oder thematisch gruppierten Einwände-Batch |
| replizierer-swapper | ETF-Auswahl-/Produkttechnik-Thema; passt besser in ETF-Detail-Batch | Batch C — ETF-Produkttechnik |
| thesaurierer-rennen | Nebenfrage ETF-Auswahl; KI-Konsens ★; passt besser in ETF-Detail-Batch | Batch C — ETF-Produkttechnik |
| weltdepot-baukasten | Portfolio-/Aufbau-Thema; KI-Konsens ★; eigene thematische Familie | Batch C — Portfolio-Aufbau |

Begründung Gesamtzurückstellung: Batchgröße kontrollierbar halten. Thematische Kohärenz für späteren Batch C. Kein Blocker, kein Problem.

---

## Sonderfälle

| Slug | Neue Kategorie | Warum nicht Batch B | Empfohlener Folge-AP |
|---|---|---|---|
| regulatorik-dashboard | B+ — Drift-priorisierter Kandidat / Sonderpfad | Mehr Vorarbeiten / Prototypen → erhöhtes Drift-Risiko; Standard-Batch würde Drift-Notiz nicht ausreichend sichern | AP-14a — regulatorik-dashboard Drift-Schutz-Sonderpfad |
| prokrastinations-preis | P — Pilot-Sonderfall mit MINI_SPEC ↔ APP_SPEC-Abgleich | APP_SPEC V2.5 maßgeblich; Steuerungsblock bereits in APP_SPEC; Standard-Logik bricht | AP-15a — prokrastinations-preis Pilot-Abgleich MINI_SPEC ↔ APP_SPEC |
| plan-generator | D — Sonderfall Funnel-Finale | Funnel-Finale-Rolle; KI-Konsens ★; anderer Zieltyp; in AP-12 explizit ausgeschlossen | Eigener Funnel-Finale-/Sonderfall-AP (nicht terminiert) |
| etf-vergleich | D — Sonderfall andere Entstehungsgeschichte | Intake-Diskussion 2026-05-19; kein Hauptdokument-Abschnitt; konzeptionelle Spec | Eigener Intake-/Sonderfall-AP (nicht terminiert) |
| investment-universum | H — Companion-Modul C1 | Kein eigenständiger Abschnitt; gehört zu diversifikations-detektor | Companion-Modul-Klärungs-AP (nicht terminiert) |
| rollierende-sparplaene | H — Companion-Modul B2 | Kein eigenständiger Abschnitt; gehört zu geburtsjahrlos; Neuausrichtung 2026-05-18 | Companion-Modul-Klärungs-AP (nicht terminiert) |
| weltkarte-etf-indizes | H — Companion-Modul C1/C3 | Kein eigenständiger Abschnitt; gehört zu diversifikations-detektor + weltdepot-baukasten | Companion-Modul-Klärungs-AP (nicht terminiert) |

---

## Tool-Lage für AP-13c

```
MINI_SPEC-Tool vorhanden:          ja
  Pfad: tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py

Custom-Slug-Fähigkeit geprüft:    ja
  --slug SLUG:    einzelner Slug
  --slugs S1,S2: kommaseparierte Liste
  Standard-Fallback: BATCH_A_SLUGS (die 7 Batch-A-Slugs)

Konsequenz für AP-13c:
  Kein Tool-Erweiterungs-AP nötig.
  Batch B kann direkt mit
    python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py \
      --slugs diversifikations-detektor,esg-spiegel,etf-namensdecoder,... \
      [--dry-run | --write]
  ausgeführt werden.

  AP-13c soll trotzdem:
  - Anker-Inventar für alle 7 Batch-B-Slugs erstellen (wie AP-12a für Batch A),
  - Dry-run ausführen und prüfen,
  - erst nach grünem Dry-run Write freigeben.
```

---

## Bewertung

### Was ist sicher?

- Batch B steht sauber: 7 Standard-Kandidaten, alle Kriterien aus AP-13a erfüllt.
- Nutzerkorrektur korrekt aufgenommen: regulatorik-dashboard ist nicht fertig, prokrastinations-preis ist nicht erledigt.
- Tool ist Custom-Slug-fähig — kein zusätzlicher Tool-AP nötig.
- 4 Standard-Kandidaten bewusst für Batch C zurückgestellt.
- 7 Sonderfälle klar eingeordnet und mit eigenen Folgepfaden versehen.

### Was ist bewusst zurückgestellt?

- etf-aera-vorbei, replizierer-swapper, thesaurierer-rennen, weltdepot-baukasten → Batch C.
- regulatorik-dashboard → AP-14a (nach AP-13c oder parallel).
- prokrastinations-preis → AP-15a (nach AP-13c oder parallel).
- plan-generator, etf-vergleich → eigene Sonderfall-APs (nicht terminiert).
- Companion-Module → eigener Klärungs-AP (nicht terminiert).

### Was ist Sonderfall?

- regulatorik-dashboard: mehr Vorarbeiten als andere, deshalb höheres Drift-Risiko — braucht eigenen Sonderpfad mit expliziter Drift-Notiz.
- prokrastinations-preis: APP_SPEC bereits vorhanden, Steuerungsblock in APP_SPEC — braucht Abgleich statt Standard-Rollout.
- plan-generator, etf-vergleich: andere Entstehungsgeschichte und Zielrolle.
- Companion-Module: kein eigenständiger App-Abschnitt, unklare Rollentrennung.

### Was blockiert AP-13c?

Kein Blocker. AP-13c kann direkt starten.

### Ist Batch B klein genug?

Ja. 7 Apps entspricht Batch A. Kontrollierbar.

---

## Geänderte Dateien

```
docs/steering/patches/AP-13b_batch-schnitt-drift-pilot-sonderfaelle_Ergebnis.md  (dieses Protokoll, neu)
```

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.

---

## Nächster AP

```
AP-13c — Batch-B-Ankerinventar und Rollout-Vorbereitung für Standard-Kandidaten
```

Inhalt AP-13c:
1. Anker-Inventar für die 7 Batch-B-Slugs (wie AP-12a für Batch A) — exakte Einfügestellen prüfen.
2. Dry-run mit `--slugs diversifikations-detektor,esg-spiegel,...` ausführen und Ausgabe prüfen.
3. Bei grünem Dry-run: Write-Freigabe vorbereiten (nicht automatisch ausführen).
4. Kein Write ohne erneuten grünen Dry-run und Alberts OK.

Nur nach Nutzer-OK starten.
