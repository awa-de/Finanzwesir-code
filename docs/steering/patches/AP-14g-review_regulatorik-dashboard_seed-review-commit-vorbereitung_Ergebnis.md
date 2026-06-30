# AP-14g-review Ergebnis — regulatorik-dashboard Seed-Review und Commit-Vorbereitung

Stand: 2026-06-30 | Session: AP-14g-review | Geändert von: Claude

---

## Kurzstatus

```
Status:               GRÜN
Blocker:              nein
Empfehlung nächster Schritt: Commit AP-14f/g/review, danach AP-14h — MINI_SPEC-Neufassung aus Seed
```

---

## Kettenposition

```
Vorgänger:  AP-14f ✅ | AP-14g ✅ (beide 2026-06-30)
Aktuell:    AP-14g-review — Seed-Review und Commit-Vorbereitung
Nächster:   Commit, dann AP-14h — regulatorik-dashboard MINI_SPEC-Neufassung aus Seed
```

---

## Gate-Ergebnisse

### Gate 1 — Git-Status

```
M   .claude/learning/session-log.md              erwartet
M   .claude/memory/feedback_python_powershell_tooling.md  erwartet
M   Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md   erwartet (AP-14g-Schreibung)
??  docs/steering/patches/AP-14f_[...].md        erwartet (AP-14f-Protokoll)
??  docs/steering/patches/AP-14g_[...].md        erwartet (AP-14g-Protokoll)
```

Keine unerwarteten Änderungen. Befund: GRÜN.

### Gate 2 — AP-14g-Protokoll

```
Status:   GRÜN
Blocker:  nein
Seed:     überarbeitet
```

Befund: GRÜN.

### Gate 3 — AP-14f-Protokoll

```
Status:   GRÜN
Blocker:  nein
```

Befund: GRÜN.

### Gate 4 — Seed-Block eindeutig

```
Seed-Datei Gesamtzeilen:           1191
Anzahl regulatorik-dashboard-Blöcke: 1
Block-Start:                       Zeile 885
Block-Ende:                        Zeile 959
Block-Länge:                       75 Zeilen
```

**Zeilenzahl-Widerspruch aus AP-14g geklärt:** AP-14g meldete „817 Zeilen" für Gate 3 (Pflichtquellen-Check). Das war ein PowerShell-`Measure-Object -Line`-Messfehler. Die vollständige H2-Block-Liste zeigt, dass die Seed-Datei schon vor AP-14g deutlich mehr als 817 Zeilen hatte (Abschnitte 4.1, 4.2, 5.1–5.3, Risiko-Header bis Zeile ~1175). Der alte `regulatorik-dashboard`-Block startete tatsächlich bei Zeile 885 (35 Zeilen, bis 919), der neue Block bei Zeile 885 (75 Zeilen, bis 959). Datei-Integrität geprüft: Vorherige Blöcke (879–883 `thesaurierer-rennen`-Ende) und Folgeblöcke (`rendite-kalibrierung` ab 961) sind intakt. Befund: unkritisch, Messfehler in AP-14g-Gate.

---

## Gelesene Quellen

| Quelle | Pflicht/Optional | Gelesen? | Rolle |
|---|:---:|:---:|---|
| Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md | Pflicht | ✅ | Seed-Block vollständig gelesen (Zeilen 885–959), Dateistruktur verifiziert |
| AP-14g-Ergebnisprotokoll | Pflicht | ✅ | Vorgänger-Status, Scope-Bestätigung |
| AP-14f-Ergebnisprotokoll | Pflicht | ✅ | Identitätsentscheidungen als Review-Maßstab |
| App-Quellen (ANAMNESE, MINI_SPEC, Abschluss-Doku, UX-Synthese) | Optional | ✗ | Pflichtquellen ausreichend |
| HTML, Bauprompt | Verboten | ✗ | Nicht analysiert |
| Altmaterial/ | Verboten | ✗ | Nicht analysiert |

---

## Seed-Block-Befund

```
Seed-Datei Gesamtzeilen:              1191
Anzahl regulatorik-dashboard-Blöcke: 1 (eindeutig)
Block-Start:                          Zeile 885
Block-Ende:                           Zeile 959
Block-Zeilenzahl:                     75
Zeilenzahl-Widerspruch aus AP-14g:    geklärt — Messfehler, unkritisch
```

Vorherige Block-Grenze (Zeile 879–883): `thesaurierer-rennen` endet mit `---` bei 883. Zeile 884 ist leer. Korrekte Trennung.
Folge-Block (Zeile 960–): `rendite-kalibrierung` ab 961. Korrekte Trennung nach `---` bei 959.

---

## Statusprüfung `GESICHERT`

**GESICHERT bestätigt: ja**

Begründung:

| Kriterium | Befund |
|---|---|
| Abgabenpolitik eindeutig als Identität | ✅ Header-Feld `**Arbeitsidentität:** Abgabenpolitik` |
| Steuerpolitik nicht als Identität | ✅ "Steuerpolitik" erscheint nur in Metapher-Erläuterung, explizit als "Metapher, nicht App-Identität" |
| Keine abstrakte "regulatorische Renditeminderung" als Titel | ✅ Titel = `## regulatorik-dashboard`, Inhalt = Abgabenpolitik |
| ETF-Wahlurne als Mechanik/Metapher abgegrenzt | ✅ `**Mechanik / Metapher:** ETF-Wahlurne (... — Metapher, nicht App-Identität)` |
| Keine Planbarkeit behauptet | ✅ Alle 5 "planbar"-Vorkommen korrekt negiert |
| Keine Scheinpräzision | ✅ Explizit in Nicht-Zielen und Muss-Kriterien |
| Nicht-Ziele enthalten | ✅ 10 Verbote, inkl. Steuerberatung, Parteipolitik, Prognose |
| Politische Tonalitätsregeln | ✅ Eigenes Feld mit 6 Regeln |
| LLM-Prüffragen | ✅ 8 app-spezifische Fragen + Standard-Gate-Referenz |
| AP-14h kann ohne Identitätsklärung ableiten | ✅ Identität, Barriere, Glaubenssatz, Zielzustand, Muss, Nicht-Ziele, Framing-Regeln vollständig |

---

## Drift-Schutz-Matrix

| Drift-Risiko | Erwarteter Schutz | Befund |
|---|---|---|
| Rückfall auf Steuerpolitik als Identität | Abgabenpolitik als Arbeitsidentität | OK — explizites Header-Feld, Steuerpolitik nur als Metapher-Erläuterung |
| Rückfall auf abstrakte Regulatorik-Sprache | Abgabenpolitik als eingängiger Begriff | OK — "Abgabenpolitik" dominiert durchgehend |
| ETF-Wahlurne wird Identität statt Mechanik | Explizite Mechanik-/Metapher-Abgrenzung | OK — "Metapher, nicht App-Identität" direkt im Feld |
| Abgaben als Naturgesetz | "kein Naturgesetz", politisch gemacht | OK — beides in "Diese App existiert, um"-Satz |
| Präzisionsillusion | Größenordnungen / Szenarien, keine Prognosen | OK — dreifach abgesichert (Zeilen 894, 910, 913) |
| Planbarkeitsillusion | nicht planbar, aber einordenbar | OK — 5 Vorkommen, alle korrekt negiert |
| Politische Kampagne | keine Parteipolitik, keine Wahlempfehlung | OK — Nicht-Ziele und Tonalitäts-Feld |
| HTML-Mockup als technischer Vertrag | Kein Vertrag aus Mockup | OK — Zeile 927 explizit |

Alle 8 Drift-Risiken: **OK**

---

## Produktkosten-Aussage

```
Starker Satz vorhanden:                  ja
Formulierung:                            "beeinflusst die ETF-Rente stärker als Produktkosten"
Erwartete Formulierung (AP prompt):      "mindert Rendite oft stärker als Produktkosten"
Abweichung:                              "beeinflusst" statt "mindert", "ETF-Rente" statt "Rendite", kein "oft"
Szenario-/Größenordnungs-Sicherung:     ja — "Szenarien und Größenordnungen sichtbar, nicht präzise Prognosen"
```

**Bewertung: GRÜN mit Notiz**

Die starke Aussage ist präsent. "Beeinflusst" statt "mindert" ist schwach in der Richtungsaussage — im Kontext von S0→S3 ist die Richtung klar negativ, aber das Wort allein ist richtungsneutral. Ohne "oft" und mit "beeinflusst" statt "mindert" ist die Aussage technisch korrekt (Abgabenpolitik beeinflusst stärker als Produktkosten), durch die Szenario-Sicherung gut kontextualisiert und nicht abschwächend. Kein Handlungsbedarf für diesen AP. AP-14h kann die Formulierung in der MINI_SPEC stärken wenn nötig — dort ist der richtige Ort für finale Redaktion.

---

## Marker-QA

### Pflichtmarker (14/15 — effektiv vollständig)

```
OK   Abgabenpolitik
OK   ETF-Wahlurne
OK   kein Naturgesetz
OK   politisch gemacht
OK   Größenordnungen
OK   Szenarien
NOTIZ "keine präzisen Prognosen" → vorhanden als "nicht präzise Prognosen" (Zeile 894)
     + "nicht als Prognose" (Zeile 913) + "Keine Prognose" (Zeile 922) — inhaltlich vollständig
OK   Keine Steuer- oder Abgabenberatung
OK   Keine Parteipolitik
OK   keine Wahlempfehlung
OK   Keine Scheinpräzision
OK   nicht planbar
OK   einordenbar
OK   etf-wahlurnen-rechner.html (Mockup-Referenz)
OK   LLM-Prüfscore
```

Fazit: 14 exakt + 1 als wortlautähnliche Variante vorhanden. Inhaltlich: 15/15.

### Gesperrte Formulierungen (0/9 Treffer)

```
OK   real, quantifizierbar, planbar     — nicht vorhanden
OK   präzise quantifizierbar            — nicht vorhanden
OK   verlässlich berechenbar            — nicht vorhanden
OK   exakte Prognose                    — nicht vorhanden
OK   robust planbar                     — nicht vorhanden
OK   Rendite wird letztlich an der Wahlurne entschieden — nicht vorhanden
OK   S2/S3 ist wahrscheinlich           — nicht vorhanden
OK   Der Staat holt sich                — nicht vorhanden
OK   Der Staat nimmt                    — nicht vorhanden
```

### Planbar-Prüfung (5 Vorkommen, alle korrekt negiert)

```
1. "unplanbar" — in Falschem Glaubenssatz, Präfix "un-" negiert
2. "nicht planbar — aber" — in Zielzustand, Adverb "nicht" negiert
3. "Planbarkeitsbehauptung" — in Nicht-Zielen, Verbot formuliert
4. "ist nicht planbar" — in Nicht-Zielen, Adverb "nicht" negiert
5. "nicht planbar, aber sichtbar" — in LLM-Prüffrage 5, Adverb "nicht" negiert
```

Alle 5: korrekt negiert. Kein ungesichertes "planbar".

---

## Scope-QA

```
Geändert (erwartet):
  M  Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md     ✅
  M  .claude/learning/session-log.md                         ✅ erwartet
  M  .claude/memory/feedback_python_powershell_tooling.md    ✅ erwartet
  ?? docs/steering/patches/AP-14f_[...].md                   ✅ erwartet
  ?? docs/steering/patches/AP-14g_[...].md                   ✅ erwartet
  (neu) docs/steering/patches/AP-14g-review_[...].md         ✅ dieses Protokoll

Nicht geändert (alle OK):
  Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md
  Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html
  APP_SPEC-Dateien
  Andere Seed-Blöcke
  Altmaterial
```

Befund: GRÜN.

---

## Commit-Vorbereitung

### Commit-Kandidaten

```bash
git add Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md \
  docs/steering/patches/AP-14f_regulatorik-dashboard_identitaets-steuerungsblock-anamnese_Ergebnis.md \
  docs/steering/patches/AP-14g_regulatorik-dashboard_seed-entwurf-steuerungsblock-quelle_Ergebnis.md \
  docs/steering/patches/AP-14g-review_regulatorik-dashboard_seed-review-commit-vorbereitung_Ergebnis.md
```

Optional (falls Session-Inhalte passen):

```bash
git add .claude/learning/session-log.md .claude/memory/feedback_python_powershell_tooling.md
```

### Commit-Message

```
docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament

- Abgabenpolitik als Arbeitsidentität (nicht Steuerpolitik, nicht Regulatorik)
- ETF-Wahlurne als Mechanik/Metapher explizit abgegrenzt
- Szenarien und Größenordnungen statt präziser Prognosen verankert
- Planbarkeits- und Scheinpräzisionsdrift verhindert
- Nicht-Ziele, Framing-Regeln und 8 LLM-Prüffragen integriert
- Seed-Status: REKONSTRUIERT/ZU PRÜFEN → GESICHERT
```

---

## Nicht-Ziel-Nachweis

```
Seed geändert:               nein (nur gelesen und bewertet)
MINI_SPEC geändert:          nein
APP_SPEC erstellt/geändert:  nein
HTML geändert:               nein
Bauprompt geändert:          nein
UX-Synthese geändert:        nein
Wissensdateien geändert:     nein
Altmaterial fachlich analysiert: nein
Dateien verschoben:          nein
Dateien gelöscht:            nein
Dateien staged:              nein
Commit ausgeführt:           nein
Abschlussritual ausgeführt:  nein
```

---

## Empfehlung nächster Schritt

```
Commit AP-14f/g/review (Commit-Message und Kandidaten oben)
danach AP-14h — regulatorik-dashboard MINI_SPEC-Neufassung aus Seed
```

AP-14h-Hinweise:
- Seed-Block als einzige Identitätsquelle verwenden (kein Rückkehren zu AP-14f-Analyse)
- Produktkosten-Aussage in MINI_SPEC kann optional zu "mindert Rendite oft stärker" präzisiert werden
- Keine Planbarkeitsaussage einführen
- S2/S3 als Gedankenexperiment framen
- LLM-Prüffragen 1–8 aus Seed in MINI_SPEC-Steuerungsblock übernehmen
