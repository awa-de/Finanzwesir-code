Stand: 2026-07-01 | Session: AP-16 | Geändert von: Claude

# AP-16 — Steuerungsblock-Rollout Statusabgleich und Restliste — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Die Restliste ist deterministisch bestimmbar und deckt sich vollständig mit der bereits
vorhandenen Inventur aus AP-13a/AP-13b. Von 25 Apps haben 16 einen vollständigen
MINI_SPEC-Steuerungsblock (7× Batch A / AP-12, 7× Batch B / AP-13, 2× Sonderfälle
regulatorik-dashboard/AP-14 und prokrastinations-preis/AP-15). 9 Apps haben noch keinen
Steuerungsblock. Davon sind 4 echte, unbelastete Standard-Kandidaten für einen Batch C;
5 sind bekannte Sonderfälle bzw. Companion-Module, die zuerst Klärung brauchen und nicht
in einen Standard-Batch gehören.

## Gelesene Quellen

```
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md (alle 25, per Python-Skript geprüft)
docs/steering/patches/AP-05_app-steuerungsblock-rollout-plan_Ergebnis.md
docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md
docs/steering/patches/AP-13b_batch-schnitt-drift-pilot-sonderfaelle_Ergebnis.md
docs/steering/patches/PATCH-app-mapping-housekeeping-2026-06-25.md
docs/steering/patches/PATCH-heldenreise-app-mapping-drift-fix-2026-06-25.md
```

Nicht fachlich ausgewertet (nur Existenz-/Pfadbefund, falls im Diff aufgetaucht):
keine — kein HTML, keine APP_SPEC in diesem AP berührt oder gelesen.

## Gefundene frühere Inventur / Batchplanung

Zwei tragende Vorgänger-Protokolle liefern den vollständigen Befundanker:

- **AP-13a** (2026-06-29, GRÜN): Vollinventar aller 25 Apps. Klassifikation in
  Kategorien A (Batch A, 7 erledigt) / B (12 Standard-Kandidaten) / C (Pilot,
  1) / D (bekannte Sonderfälle, 2) / H (Companion-Module, 3).
- **AP-13b** (2026-06-29, GRÜN): Schneidet aus den 12 Kategorie-B-Kandidaten
  Batch B (7 Apps, → AP-13 ausgeführt) und stellt 4 Standard-Kandidaten bewusst
  für einen späteren **Batch C** zurück: `etf-aera-vorbei`, `replizierer-swapper`,
  `thesaurierer-rennen`, `weltdepot-baukasten`. Zusätzlich werden
  `regulatorik-dashboard` (→ AP-14) und `prokrastinations-preis` (→ AP-15) als
  Sonderpfade herausgelöst und `plan-generator`/`etf-vergleich` (Kategorie D)
  sowie `investment-universum`/`rollierende-sparplaene`/`weltkarte-etf-indizes`
  (Kategorie H, Companion-Module) unverändert als Klärungsfälle stehen gelassen.

AP-05 ist eine ältere, grobkörnigere Rollout-Planung (AP-08–AP-13 in alter
Zählung) und wurde durch die tatsächlich gelaufene Kette AP-10/12/13/14/15
überholt — als Historie relevant, nicht als aktueller Statusanker.

Die beiden Housekeeping-Patches vom 2026-06-25 betreffen nur die
Heldenreise-/Mapping-Ebene (Slug-Umbenennung `etf-reifegrad-finale` →
`plan-generator`, Einordnung `etf-vergleich` als Hauptpfad-Station statt
Vertiefungs-App). Sie ändern nichts an der Steuerungsblock-Frage und liegen
zeitlich vor AP-13a/b — die dortige Einordnung als Sonderfälle D gilt damit
als bereits berücksichtigt und weiterhin aktuell.

## Reale Datei-Prüfung

Deterministischer Python-Check über alle 25 `MINI_SPEC_FROM_HAUPTDOKUMENT.md`
gegen Steuerungsblock-Marker (`## Steuerungsblock: Zweck, Barriere,
Prüfregeln`), LLM-Prüfungs-Marker und Seed-Hinweis in
`Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`:

| App | MINI_SPEC | Seed-Block | Steuerungsblock | LLM-Prüfung vorhanden | Status | Begründung | Empf. Batch |
|---|:---:|:---:|:---:|:---:|---|---|---|
| crash-reaktions-test | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| depot-kipppunkt | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| der-alte-euro | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| geburtsjahrlos | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| market-timing-simulator | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| markt-kam-zurueck | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| risiko-uebersetzer | ja | ja | ja | ja | erledigt | Batch A (AP-12) | — |
| diversifikations-detektor | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| esg-spiegel | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| etf-namensdecoder | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| komplexitaets-entlarver | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| kostenkiller-ter | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| rendite-kalibrierung | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| renditekiller-volatilitaet | ja | ja | ja | ja | erledigt | Batch B (AP-13) | — |
| regulatorik-dashboard | ja | ja | ja | ja | Sonderfall erledigt | AP-14h/i, aus Seed neu gefasst | — |
| prokrastinations-preis | ja | ja | ja | ja | Sonderfall erledigt | AP-15b, MINI_SPEC nachgeführt | — |
| etf-aera-vorbei | ja | ja | nein | nein | offen | Standard-Kandidat, in AP-13b bewusst zurückgestellt | Batch C |
| replizierer-swapper | ja | ja | nein | nein | offen | Standard-Kandidat, in AP-13b bewusst zurückgestellt | Batch C |
| thesaurierer-rennen | ja | ja | nein | nein | offen | Standard-Kandidat, in AP-13b bewusst zurückgestellt | Batch C |
| weltdepot-baukasten | ja | ja | nein | nein | offen | Standard-Kandidat, in AP-13b bewusst zurückgestellt | Batch C |
| plan-generator | ja | ja | nein | nein | unklar | Sonderfall D — Funnel-Finale, anderer Zieltyp, ungeklärt seit AP-13b | Klärungs-AP |
| etf-vergleich | ja | ja | nein | nein | unklar | Sonderfall D — andere Entstehungsgeschichte (Intake 2026-05-19), ungeklärt seit AP-13b | Klärungs-AP |
| investment-universum | ja | ja | nein | nein | unklar | Companion-Modul zu diversifikations-detektor, keine eigenständige Rolle geklärt | Klärungs-AP |
| rollierende-sparplaene | ja | ja | nein | nein | unklar | Companion-Modul zu geburtsjahrlos, keine eigenständige Rolle geklärt | Klärungs-AP |
| weltkarte-etf-indizes | ja | ja | nein | nein | unklar | Companion-Modul zu diversifikations-detektor/weltdepot-baukasten, keine eigenständige Rolle geklärt | Klärungs-AP |

Summe: 25 Apps geprüft, 25 MINI_SPECs vorhanden, 25 Seed-Blöcke vorhanden,
16 mit vollständigem Steuerungsblock, 9 ohne.

## Erledigte Apps

Batch A (AP-12, 7): crash-reaktions-test, depot-kipppunkt, der-alte-euro,
geburtsjahrlos, market-timing-simulator, markt-kam-zurueck, risiko-uebersetzer

Batch B (AP-13, 7): diversifikations-detektor, esg-spiegel, etf-namensdecoder,
komplexitaets-entlarver, kostenkiller-ter, rendite-kalibrierung,
renditekiller-volatilitaet

## Sonderfälle erledigt

- regulatorik-dashboard (AP-14h/i — MINI_SPEC vollständig aus Seed neu gefasst,
  Marker-QA 18/18 GRÜN)
- prokrastinations-preis (AP-15b/c — MINI_SPEC nachgeführt, Steuerungsblock
  eingefügt, Review GRÜN)

## Offene Apps

Echte, unbelastete Standard-Kandidaten ohne Sonderfall-Status (4):

```
1. etf-aera-vorbei
2. replizierer-swapper
3. thesaurierer-rennen
4. weltdepot-baukasten
```

Alle 4: MINI_SPEC ✓, Seed-Block ✓, kein Steuerungsblock, laut AP-13a Anker
standardfähig (JA), kein Companion, kein Sonderfall. In AP-13b bewusst aus
Batch B zurückgestellt (Batchgröße kontrollieren, thematische Kohärenz für
Batch C), nicht wegen inhaltlicher Probleme.

## Unklare Apps

5 Apps mit ungeklärtem Sonderstatus — nicht batch-fähig ohne vorherige Klärung:

```
1. plan-generator          — Sonderfall D: Funnel-Finale-Rolle, anderer Zieltyp,
                              KI-Konsens ★ (niedrigster), seit AP-12 explizit
                              ausgeschlossen
2. etf-vergleich            — Sonderfall D: andere Entstehungsgeschichte
                              (Intake-Diskussion 2026-05-19, nicht aus
                              Hauptdokument), seit AP-12 explizit ausgeschlossen
3. investment-universum     — Companion-Modul zu diversifikations-detektor,
                              kein eigenständiger Hauptdokument-Abschnitt
4. rollierende-sparplaene   — Companion-Modul zu geburtsjahrlos, kein
                              eigenständiger Hauptdokument-Abschnitt
5. weltkarte-etf-indizes    — Companion-Modul zu diversifikations-detektor/
                              weltdepot-baukasten, kein eigenständiger
                              Hauptdokument-Abschnitt
```

Diese 5 waren bereits in AP-13a/AP-13b als Klärungsfälle identifiziert und sind
seither unverändert. Kein neuer Befund in diesem AP, nur Bestätigung.

## Vorgeschlagener Batch C

```
1. etf-aera-vorbei
2. replizierer-swapper
3. thesaurierer-rennen
4. weltdepot-baukasten
```

Begründung:
- Alle 4 sind reguläre Standard-Kandidaten ohne offene Klärungsfrage.
- Batchgröße 4 liegt bewusst unter Batch A/B (je 7) — passt zur Vorgabe
  „lieber 3–5 saubere Apps als ein zu großer Rollout" und zur in AP-13b
  bereits vorgesehenen Zurückstellung dieser 4 als eigene, kleinere Gruppe.
- Keine Sonderfälle, keine Companion-Module, keine unklaren Apps enthalten.
- Damit wäre der komplette Batch-Restbestand aus AP-13a/b (12 Kategorie-B-
  Kandidaten) nach Batch A+B+C vollständig abgearbeitet; übrig blieben dann
  nur noch die 5 Klärungsfälle.

## Nicht-Ziel-Nachweis

Nicht geändert / nicht angefasst:

- keine MINI_SPEC geändert
- keine Steuerungsblöcke eingefügt
- keine Seed-Datei geändert
- keine APP_SPEC geschrieben
- keine App gebaut
- kein HTML analysiert
- kein Commit erzeugt

## Bewertung

### GRÜN-Kriterien

- Bisherige Batchplanung (AP-13a/AP-13b) vollständig wiedergefunden, keine
  Rekonstruktion nötig.
- AP-12, AP-13, AP-14, AP-15 korrekt eingeordnet: 2× Batch (14 Apps), 2×
  Sonderfall (2 Apps), beide durch Git-Log und session-log bestätigt
  abgeschlossen.
- Restliste der offenen Apps (4 Standard + 5 Klärungsfälle) plausibel und
  deterministisch begründet — Python-Check und historische Inventur stimmen
  zu 100 % überein.
- Vorgeschlagener Batch C ist direkt aus der Restliste ableitbar, ohne neue
  Bewertung nötig.
- Keine verbotenen Dateien geändert.
- Kein App-Bau-Scope geöffnet.
- Ergebnisprotokoll wird nach dem Schreiben vollständig erneut gelesen
  (siehe unten).

### GELB-Gründe, falls zutreffend

Keine — die 5 Klärungsfälle sind nicht neu, sondern bereits bekannte,
unveränderte Altlast aus AP-13a/b. Sie blockieren Batch C nicht, da Batch C
sie explizit ausschließt.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

AP-17 — Steuerungsblock-Rollout Batch C (die 4 genannten Standard-Kandidaten:
etf-aera-vorbei, replizierer-swapper, thesaurierer-rennen, weltdepot-baukasten).

Optional davor oder danach, unabhängig terminierbar: ein kleiner Klärungs-AP
für die 5 unklaren Apps (plan-generator, etf-vergleich, investment-universum,
rollierende-sparplaene, weltkarte-etf-indizes), da diese sonst dauerhaft
offen bleiben.

## Ausdrücklich nicht nächster AP

AP-14j, APP_SPEC-Vorbereitung, App-Bau, HTML-Analyse.

## Vorprüfung / Gates (Nachweis)

| Gate | Prüfung | Ergebnis |
|---|---|---|
| 1 | `git status --short` zu Beginn | `M .claude/learning/session-log.md`, `M docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`, `?? Archiv/Chroniken/.../CHRONIK-2026-07-01-*.md` — alle drei vor Beginn dieses AP vorhanden, nicht durch AP-16 verursacht |
| 2 | Seed-Datei vorhanden | JA — 1191 Zeilen |
| 3 | `Apps/`-Ordner vorhanden | JA — 25 Verzeichnisse |
| 4 | `docs/steering/patches/` vorhanden mit rekonstruierbarer Inventur | JA — AP-13a/AP-13b liefern vollständigen Befundanker |
| 5 | Scope-Drift Richtung APP_SPEC/HTML/App-Bau | Nein — nicht ausgelöst |

Kein STOP-Trigger ausgelöst.

## Wiederlesen nach Write

Nach dem Schreiben wurde diese Datei vollständig erneut gelesen. Enthalten:
Status GRÜN, 4 offene Apps, 5 unklare Apps, Batch-C-Vorschlag mit 4 Slugs —
alle vorhanden und konsistent mit der Tabelle oben.

`git diff --name-status` und `git status --short` wurden im Anschluss erneut
geprüft (siehe Chat-Ausgabe) — einzige neue Änderung ist diese Protokolldatei.
