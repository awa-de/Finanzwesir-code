# AP-14h Ergebnis — regulatorik-dashboard MINI_SPEC-Neufassung aus Seed

Stand: 2026-07-01 | Session: AP-14h | Geändert von: Claude

---

## Kurzstatus

```
Status:               GRÜN
Blocker:              nein
Empfehlung nächster AP: AP-14i — MINI_SPEC-Review / App-Fabrik-Readiness / Commit-Vorbereitung
```

---

## Kettenposition

```
Vorgänger:  AP-14f ✅ 2026-06-30 | AP-14g ✅ 2026-06-30 | AP-14g-review ✅ 2026-06-30
Aktuell:    AP-14h — regulatorik-dashboard MINI_SPEC-Neufassung aus Seed
Nächster:   AP-14i — MINI_SPEC-Review / App-Fabrik-Readiness / Commit-Vorbereitung
```

---

## Gate-Ergebnisse

### Gate 1 — Git-Status

```
M   .claude/learning/session-log.md              erwartet
Keine uncommitted AP-14f/g/review-Dateien.
Kein unerwarteter Seed-, MINI_SPEC- oder APP_SPEC-Status vor AP-14h.
```

Befund: GRÜN

### Gate 2 — AP-14g-review bestätigt

```
Datei:    docs/steering/patches/AP-14g-review_regulatorik-dashboard_seed-review-commit-vorbereitung_Ergebnis.md
Status:   GRÜN
Blocker:  nein
GESICHERT bestätigt: ja
Drift-Schutz: 8/8 OK
Empfehlung: Commit, danach AP-14h
```

Befund: GRÜN

### Gate 3 — Seed-Block vorhanden und GESICHERT

```
Datei:          Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
Abschnitte:     1 (eindeutig)
Status-Feld:    GESICHERT — redaktionell geprüft (AP-14f/AP-14g 2026-06-30)
Arbeitsidentität: Abgabenpolitik
Mechanik/Metapher: ETF-Wahlurne
```

Befund: GRÜN

### Gate 4 — Pflichtquellen vorhanden

```
Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md    VORHANDEN (2647 Bytes, alt)
Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  VORHANDEN (23359 Bytes)
```

Befund: GRÜN

---

## Gelesene Quellen

| Quelle | Kategorie | Gelesen? | Rolle |
|---|:---:|:---:|---|
| Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md | Pflicht | ✅ | Identitätsquelle — vollständiger Seed-Block |
| docs/steering/patches/AP-14g-review_[...].md | Pflicht | ✅ | Gate 2, GRÜN-Bestätigung, Drift-Schutz-Matrix |
| Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md | Pflicht | ✅ | Altes Rohmaterial — bewertet, verworfen |
| Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | Pflicht | ✅ | S0–S3, Zahlen, Modellannahmen |
| AP-14g-Protokoll | Optional | ✗ | Pflichtquellen ausreichend |
| AP-14f-Protokoll | Optional | ✗ | Pflichtquellen ausreichend |
| ANAMNESE_MATERIAL, UX-Synthese, DEV_QA_NOTIZEN | Optional | ✗ | Pflichtquellen ausreichend |
| etf-wahlurnen-rechner.html | Verboten | ✗ | Nicht analysiert |
| Bauprompt | Verboten | ✗ | Nicht analysiert |
| Altmaterial/ | Verboten | ✗ | Nicht analysiert |

---

## Alte MINI_SPEC — Bewertung

```
Datei:          Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md (alt, 2647 Bytes)
Titel:          „Regulatorisches Risiko Dashboard" — falsche Identität
Status-Feld:    „BEREITS GEBAUT" — veraltetes Signal, irreführend
Steuerungsblock: fehlend
Planbarkeits-/Scheinpräzisions-Schutz: fehlend
```

Brauchbare Teile:
- Slug `regulatorik-dashboard` (korrekt)
- Funnel-Position G1 (korrekt)
- Kernbotschaft „Das Risiko ist real. Aber es zerstört nicht deine Strategie — nur die Details." (übernommen)

Verworfene Teile:
- Titel „Regulatorisches Risiko Dashboard" (falsche Identität)
- Status „BEREITS GEBAUT" (kein AP-Fabrik-Muster)
- Szenario-Matrix mit Wahrscheinlichkeits-Spalte (30–60 %, 10–30 %, 1–5 % — verbotene Scheinpräzision)
- Zwei Regler-Beschreibung (technischer Detailvertrag aus altem Mockup)
- KI-Konsens-Feld ★★ (nicht MINI_SPEC-relevant)
- Alle „Ausgaben (bereits implementiert)"-Listen
- Erweiterungsidee V2 (nicht MINI_SPEC-relevant)

---

## Neue MINI_SPEC — Kurzfassung

```
Identität:          Abgabenpolitik
                    (Slug: regulatorik-dashboard, Mechanik: ETF-Wahlurne)

Zweck:              Abgabenpolitik ist kein Naturgesetz. Sie ist politisch gemacht,
                    kann sich ändern, mindert Rendite oft stärker als Produktkosten.
                    Die App zeigt Szenarien und Größenordnungen — keine Prognose.

Barriere:           „Wenn der Staat die Regeln jederzeit ändern kann — warum
                    dann langfristig planen?"

Falscher Glaubenssatz: „Weil Abgabenpolitik unplanbar ist, ist jede langfristige
                    ETF-Strategie unsicher bis sinnlos."

Zielzustand:        Abgabenrisiko ist real und nicht planbar — aber nicht unsichtbar.
                    Größenordnungen einordenbar. Grundstrategie (breit, günstig,
                    regelmäßig) bleibt tragfähig.

Szenarien:          S0 (DE vor 2009, 0 %), S1 (Deutsche Realität, 18,46 % eff.),
                    S2 (Vergünstigungen weg, 26,375 %), S3 (Einkommensteuer,
                    Default 42 %, eff. 44,31 %) — als Gedankenexperiment, keine Prognose.
                    Referenzzahlen (200 €/Mo, 25 J. Anspar, 30 J. Entspar):
                    S0: 872 €/Mo | S1: 798 €/Mo | S2: 662 €/Mo | S3: 566 €/Mo
                    Bandbreite: ca. 306 €/Mo (Modell-Ergebnis).

Nicht-Ziele:        Keine Steuerberatung, keine Abgabenberatung, keine Kampagne,
                    keine Parteipolitik, keine Wahlempfehlung, keine Prognose,
                    keine Scheinpräzision, keine Planbarkeitsbehauptung,
                    keine Katastrophisierung, kein technischer Vertrag aus HTML-Mockup.
```

---

## Steuerungsblock-Befund

```
Steuerungsblock vorhanden:   ja
Titel exakt:                 ja — „## Steuerungsblock: Zweck, Barriere, Prüfregeln"
LLM-Prüffragen vorhanden:   ja — 8 app-spezifische Fragen
KO-Kriterien markiert:       ja — Frage 3 (keine Kampagne), Frage 4 (keine Prognose)
Score-Regel:                 ja — 0/1/2 Skala, Mindestscore 12/16 GRÜN
```

---

## Marker-QA

### Pflichtmarker (16/16)

```
OK   Abgabenpolitik
OK   ETF-Wahlurne
OK   kein Naturgesetz
OK   politisch gemacht
OK   Wahlurne
OK   Größenordnungen
OK   Szenarien
OK   keine Prognose
OK   keine Steuerberatung
OK   keine Parteipolitik
OK   keine Wahlempfehlung
OK   keine Scheinpräzision
OK   nicht planbar
OK   einordenbar
OK   HTML-Mockup
OK   Steuerungsblock: Zweck, Barriere, Prüfregeln
```

Zwischenfund: „keine Steuerberatung" zunächst als „Keine Steuer- oder Abgabenberatung." formuliert — Bindestrich verhindert Substring-Match. Korrigiert zu „Keine Steuerberatung, keine Abgabenberatung." (beide Stellen).

Ergebnis: 16/16 — GRÜN

---

## Gesperrte-Formulierungen-QA

```
OK   real, quantifizierbar, planbar     — nicht vorhanden
OK   präzise quantifizierbar            — nicht vorhanden
OK   verlässlich berechenbar            — nicht vorhanden
OK   exakte Prognose                    — nicht vorhanden
OK   robust planbar                     — nicht vorhanden
OK   S2/S3 ist wahrscheinlich           — nicht vorhanden
OK   Der Staat holt sich                — nicht vorhanden
OK   Der Staat nimmt                    — nicht vorhanden
```

Ergebnis: 0/8 Treffer — GRÜN

### Planbar-Vorkommen (alle korrekt negiert)

```
1. „Nicht planbar bedeutet nicht unsichtbar."       — Adverb „Nicht" negiert
2. „unplanbar" (Falscher Glaubenssatz)              — Präfix negiert
3. „nicht planbar — aber" (Zielzustand)             — Adverb „nicht" negiert
4. „Keine Planbarkeitsbehauptung"                   — als Verbot formuliert
5. „nicht planbar" (Steuerungsblock Zielzustand)    — Adverb „nicht" negiert
6. „unplanbar" (Steuerungsblock Glaubenssatz)       — Präfix negiert
7. „Keine Planbarkeitsbehauptung" (Steuerungsblock) — als Verbot formuliert
8. „nicht planbar, aber sichtbar" (LLM-Frage 5)    — Adverb „nicht" negiert
```

Alle 8: korrekt negiert. Kein ungesichertes „planbar". GRÜN.

### Steuerpolitik-Vorkommen (korrekt kontextualisiert)

```
1. „ETF-Wahlurne — Steuerpolitik wird indirekt an der Wahlurne entschieden."
   → In Mechanik/Metapher-Sektion, als Metapher-Erläuterung. GRÜN.
2. LLM-Prüffrage 1: „nicht Steuerpolitik als alleiniger Begriff"
   → Als Negativbeschreibung in Prüffrage. GRÜN.
```

Kein Vorkommen von „Steuerpolitik" als Identitätsbegriff. GRÜN.

---

## Scope-QA

### Geändert (erwartet)

```
M   Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md   ✅
M   .claude/learning/session-log.md                               ✅ (Session-Start-Eintrag)
??  docs/steering/patches/AP-14h_[...].md                        ✅ (dieses Protokoll, noch untracked)
```

### Nicht geändert (alle GRÜN)

```
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md          ✅ unberührt
Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html       ✅ unberührt
Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  ✅ unberührt
Apps/regulatorik-dashboard/Bauprompt_[...].md               ✅ unberührt
Apps/regulatorik-dashboard/UX-Synthese-[...].md             ✅ unberührt
Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md  ✅ unberührt
Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md                ✅ unberührt
Apps/regulatorik-dashboard/Altmaterial/*                    ✅ unberührt
APP_SPEC-Dateien                                             ✅ keine erstellt
```

Befund: GRÜN

---

## Nicht-Ziel-Nachweis

```
Seed geändert:               nein
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

## Geänderte Dateien

```
Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md
docs/steering/patches/AP-14h_regulatorik-dashboard_minispec-neufassung-aus-seed_Ergebnis.md
```

---

## Empfehlung AP-14i

```
AP-14i — regulatorik-dashboard MINI_SPEC-Review / App-Fabrik-Readiness / Commit-Vorbereitung
```

AP-14i-Hinweise:
- Marker 16/16 bereits grün — kein Nachschärfungsbedarf für Pflichtmarker
- App-Titel für Ghost.io: offen (Arbeitstitel `regulatorik-dashboard`) — AP-14i klärt
- Produktkosten-Aussage: „mindert Rendite oft stärker als Produktkosten" — im Zweck-Satz enthalten, Formulierung prüfen
- LLM-Selbsttest gegen die 8 Prüffragen empfohlen (Pflicht für App-Fabrik-Readiness)
- Commit-Vorbereitung: MINI_SPEC + Protokolle AP-14h zusammen, Seed bleibt aus AP-14f/g-Commit
