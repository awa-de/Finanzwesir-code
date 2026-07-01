# AP-14i Ergebnis — regulatorik-dashboard MINI_SPEC-Review / App-Fabrik-Readiness / Commit-Vorbereitung

Stand: 2026-07-01 | Session: AP-14i | Geändert von: Claude

---

## Kurzstatus

```
Status:               GRÜN
Blocker:              nein
Empfehlung nächster Schritt: Commit AP-14h/i, danach AP-14j — APP_SPEC-Vorbereitung / Scope-Schnitt
```

---

## Kettenposition

```
Vorgänger:  AP-14f ✅ | AP-14g ✅ | AP-14g-review ✅ | AP-14h ✅ (alle 2026-06-30/07-01)
Aktuell:    AP-14i — MINI_SPEC-Review / App-Fabrik-Readiness / Commit-Vorbereitung
Nächster:   Commit AP-14h/i, danach AP-14j — APP_SPEC-Vorbereitung / Scope-Schnitt
```

---

## Gate-Ergebnisse

### Gate 1 — Git-Status

```
M   .claude/learning/session-log.md                                 erwartet
M   Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md      erwartet
??  docs/steering/patches/AP-14h_[...].md                           erwartet
```

Keine unerwarteten Änderungen. Befund: GRÜN

### Gate 2 — AP-14h-Protokoll

```
Datei:    docs/steering/patches/AP-14h_regulatorik-dashboard_minispec-neufassung-aus-seed_Ergebnis.md
Status:   GRÜN
Blocker:  nein
MINI_SPEC neu gefasst: ja
Steuerungsblock vorhanden: ja
Marker-QA: 16/16 GRÜN
```

Befund: GRÜN

### Gate 3 — Reale MINI_SPEC

```
Datei gelesen: ja (vollständig, 249 Zeilen)
Titel:         „MINI_SPEC_FROM_HAUPTDOKUMENT — regulatorik-dashboard" ✓
Stand:         „2026-07-01 | AP-14h" ✓
Arbeitsidentität: Abgabenpolitik ✓
ETF-Wahlurne: „Kernmechanik / Metapher — nicht die Identität der App" ✓
Steuerungsblock vorhanden: ja ✓
LLM-Prüffragen: 8 ✓
Alte Rohfassung noch aktiv: nein ✓
```

Befund: GRÜN

---

## Gelesene Quellen

| Quelle | Kategorie | Gelesen? | Rolle |
|---|:---:|:---:|---|
| Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md | Pflicht | ✅ | Prüfobjekt — vollständig gelesen |
| docs/steering/patches/AP-14h_[...].md | Pflicht | ✅ | Gate 2, GRÜN bestätigt |
| Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md | Pflicht | ✅ | Seed-Block (aus AP-14h-Session bekannt, nicht neu gelesen) |
| AP-14g-review-Protokoll | Optional | ✗ | Gate 2 ausreichend |
| Abschlussdokumentation | Optional | ✗ | Gate 3 ausreichend |
| HTML, Bauprompt | Verboten | ✗ | Nicht analysiert |
| Altmaterial/ | Verboten | ✗ | Nicht analysiert |

---

## Reale MINI_SPEC-Befund

```
Datei gelesen:            ja
Alte Rohfassung aktiv:    nein — explizit als „verworfen" markiert in Status-Sektion
Abgabenpolitik Identität: ja — in App-Identität, Zweck, Steuerungsblock
ETF-Wahlurne Mechanik:    ja — in App-Identität + eigene Sektion „Kernmechanik / Metapher"
Steuerungsblock:          vorhanden, Titel exakt
LLM-Prüffragen:           8 vorhanden
```

---

## Altlasten-QA

Geprüfte Altlasten — alle abwesend:

```
OK   Status: ✅ BEREITS GEBAUT           — nicht vorhanden
OK   dashboard-regulatorikXIX            — nicht vorhanden
OK   Zwei Regler                         — nicht vorhanden
OK   Ausgaben (bereits implementiert)    — nicht vorhanden
OK   Nötige Mehrersparnis zum Ausgleich  — nicht vorhanden
OK   Wahrscheinlichkeit 30–60 %          — nicht vorhanden
OK   Wahrscheinlichkeit 10–30 %          — nicht vorhanden
OK   1–5 %                               — nicht vorhanden
OK   Systembruch / Rechtsunsicherheit    — nicht vorhanden
OK   Schwarzer-Schwan-Szenario-Matrix    — nicht vorhanden
OK   KI-Konsens: ★★                      — nicht vorhanden
```

Befund: GRÜN. Alte Roh-MINI_SPEC vollständig beseitigt.

---

## Identitäts- und Drift-QA

| Prüffrage | Befund | Bewertung |
|---|---|---|
| Identität | Abgabenpolitik — in App-Identität, Zweck, Steuerungsblock | OK |
| Slug | regulatorik-dashboard | OK |
| Mechanik | ETF-Wahlurne = „Kernmechanik / Metapher — nicht die Identität der App" | OK |
| Funnel | G1 — Systemkritische Einwände | OK |
| Keine Steuerpolitik-Drift | „Steuerpolitik" nur als Metapher-Erläuterung + LLM-Prüffrage-Negativbeschreibung | OK |
| Keine Regulatorik-Abstraktion | kein Titel „Regulatorisches Risiko Dashboard" oder ähnlich | OK |
| Kein HTML-Vertrag | „Kein technischer Vertrag aus dem HTML-Mockup `etf-wahlurnen-rechner.html`" (zweimal) | OK |
| Keine APP_SPEC | „Keine APP_SPEC. Kein konkreter technischer Bauauftrag aus dieser MINI_SPEC." | OK |

Befund: Alle 8 Identitäts-/Drift-Prüffragen GRÜN.

---

## Inhaltliche Kernprüfung

| Aussage | In MINI_SPEC? | Quelle |
|---|---|---|
| Abgabenpolitik ist kein Naturgesetz | ja | Zweck-Satz, Steuerungsblock-Zweck |
| Abgabenpolitik ist politisch gemacht | ja | Zweck-Satz, Kernmechanik-Sektion |
| Abgabenpolitik kann sich ändern | ja | Zweck-Satz |
| An der Wahlurne veränderbar | ja | Mechanik-Sektion: „Steuerpolitik wird indirekt an der Wahlurne entschieden" |
| Mindert Rendite oft stärker als Produktkosten | ja | Zweck-Satz, Steuerungsblock-Zweck |
| Szenarien und Größenordnungen | ja | Szenarien-Sektion, Kassenbon-Sektion |
| Keine präzise Prognose | ja | Zweck, Modellgrenzen, S2/S3-Beschreibung |
| Nicht planbar bedeutet nicht unsichtbar | ja | Funnel-Sektion explizit |

Alle 8 Kernaussagen: vorhanden. GRÜN.

### Produktkosten-Pointe

```
Starker Satz:    „mindert Rendite oft stärker als Produktkosten" — ja, im Zweck-Satz
Szenario-Sicherung: „Die App macht das über Szenarien und Größenordnungen sichtbar
                    — nicht als präzise Prognose." — ja
Kassenbon-Sicherung: „Im Modell machen Abgaben ca. 2,8-fach mehr aus als alle
                     Produktkosten zusammen. Das gilt bei aktuellem deutschen Recht
                     und stabilen Marktbedingungen." — ja, korrekt gerahmt
```

Bewertung: GRÜN. Starke Aussage vorhanden UND doppelt abgesichert (Szenario + Modellkontext).

---

## Modellgrenzen- und Scheinpräzisionsprüfung

| Zahl | Kontext in MINI_SPEC | Bewertung |
|---|---|---|
| 18,46 % | „18,46 % (eff.)" in Szenario-Tabelle + „Steuern (S1, 18,46 % eff.)" in Kassenbon mit „Im Modell" | GRÜN |
| 26,375 % | Szenario-Tabelle, als Gedankenexperiment gerahmt | GRÜN |
| 44,31 % | Szenario-Tabelle „(Default)" + Gedankenexperiment-Sektion | GRÜN |
| 306 €/Monat | „Als Größenordnung: ca. 306 €/Monat" + „Das ist eine Größenordnung — kein Versprechen und keine Prognose." | GRÜN |
| 110.000 € | „Das sind Modell-Ergebnisse bei stabilen Annahmen." | GRÜN |
| 2,8-fach | „Im Modell machen Abgaben ca. 2,8-fach mehr aus... Das gilt bei aktuellem deutschen Recht und stabilen Marktbedingungen." | GRÜN |

Alle Zahlen korrekt als Modell-Ergebnisse / Modellparameter gerahmt.

Notiz: „Kernaussage (Modell-Ergebnis, kein Fakt)" ist etwas unpräzise — „kein Fakt" ohne Zusatz könnte missverständlich sein. Gemeint ist: kein empirischer Allgemein-Fakt und keine Prognose. Da die umgebende Kontextualisierung ausreichend ist und kein Driftrisiko besteht, kein Handlungsbedarf. GRÜN mit Notiz.

Befund gesamt: GRÜN.

---

## Steuerungsblock-Prüfung

```
Titel exakt vorhanden: „## Steuerungsblock: Zweck, Barriere, Prüfregeln"          ✓
Zweck:                 vorhanden                                                    ✓
Psychologische Barriere: vorhanden                                                  ✓
Falscher Glaubenssatz: vorhanden                                                   ✓
Zielzustand:           vorhanden                                                    ✓
Nicht-Ziele:           vorhanden (9 Punkte)                                        ✓
Muss-Kriterien:        vorhanden (7 Punkte, inkl. S0/S1/S2/S3, Kassenbon)         ✓
Tonalität / Framing:   vorhanden (6 Regeln)                                        ✓
LLM-Prüfscore:         vorhanden (Skala 0/1/2, Mindestscore 12/16)               ✓
8 Prüffragen:          vorhanden (maschinell gezählt: 8)                          ✓
KO-Kriterien:          Frage 3 *(KO)* + Frage 4 *(KO)* markiert                  ✓
```

Befund: GRÜN. Vollständiger App-Fabrik-konformer Steuerungsblock.

---

## LLM-Selbsttest

Skala: 0 = nicht erkannt / falsch | 1 = teilweise erkannt | 2 = klar und präzise erkannt

| # | Prüffrage | Score | Begründung |
|---|---|:---:|---|
| 1 | Abgabenpolitik = Arbeitsidentität | **2** | Explizit in App-Identität, Zweck-Satz, Steuerungsblock; Abgrenzung zu Steuerpolitik und Regulatorik in Prüffrage 1 selbst |
| 2 | ETF-Wahlurne = Mechanik-Metapher | **2** | „nicht die Identität der App" direkt in App-Identität; eigene Sektion „Kernmechanik / Metapher" |
| 3 | Keine politische Kampagne *(KO)* | **2** | Nicht-Ziele (zweimal): „Keine politische Kampagne", „keine Parteipolitik", „keine Wahlempfehlung"; Tonalität: „Keine Parteinamen. Keine Wahlaufrufe." |
| 4 | Keine präzise Prognose *(KO)* | **2** | Zweck: „nicht als präzise Prognose"; Modellgrenzen: „keine Prognosen künftiger Gesetzgebung"; S2/S3: „keine Prognosen" |
| 5 | Nicht planbar, aber einordenbar | **2** | „Nicht planbar bedeutet nicht unsichtbar" in Funnel; Zielzustand: „real und nicht planbar — aber nicht unsichtbar" |
| 6 | etf-wahlurnen-rechner.html = Mockup | **2** | „Kein technischer Vertrag aus dem HTML-Mockup `etf-wahlurnen-rechner.html`" in Nicht-Zielen (zweimal); „Keine APP_SPEC" |
| 7 | S0 = deutsches Recht vor 2009 | **2** | Szenario-Tabelle: „Deutsches Recht bis 31.12.2008"; Muss-Kriterien: „nicht UK ISA oder Roth IRA" |
| 8 | Modell-Aussagen = Modell-Ergebnisse | **2** | „Alle Zahlen sind Modell-Ergebnisse, keine Prognosen" (Zeile 85); Kassenbon: „Im Modell"; „Das sind Modell-Ergebnisse bei stabilen Annahmen" |

**Gesamtscore: 16/16**
Mindestscore GRÜN: 12/16 — deutlich übertroffen.
KO-Kriterien (Fragen 3 + 4): beide 2/2 — kein KO.

Befund: GRÜN.

---

## Marker-QA

### Pflichtmarker (18/18)

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
OK   keine Abgabenberatung
OK   keine Parteipolitik
OK   keine Wahlempfehlung
OK   keine Scheinpräzision
OK   nicht planbar
OK   einordenbar
OK   HTML-Mockup
OK   Steuerungsblock: Zweck, Barriere, Prüfregeln
OK   LLM-Prüfscore
```

Ergebnis: 18/18 — GRÜN

### Gesperrte Formulierungen (0/17 Treffer)

```
OK   real, quantifizierbar, planbar
OK   präzise quantifizierbar
OK   verlässlich berechenbar
OK   exakte Prognose
OK   robust planbar
OK   S2/S3 ist wahrscheinlich
OK   Der Staat holt sich
OK   Der Staat nimmt
OK   BEREITS GEBAUT
OK   Zwei Regler
OK   Ausgaben (bereits implementiert)
OK   dashboard-regulatorikXIX
OK   KI-Konsens
OK   Schwarzer-Schwan-Szenario-Matrix interaktiv
OK   Wahrscheinlichkeitstabelle-Werte
```

Ergebnis: 0/17 — GRÜN

### Planbar-Vorkommen (8 Stellen, alle korrekt negiert)

```
1. „Nicht planbar bedeutet nicht unsichtbar"         Adverb „Nicht" negiert
2. „unplanbar ist" (Falscher Glaubenssatz)           Präfix negiert
3. „nicht planbar — aber" (Zielzustand)              Adverb „nicht" negiert
4. „Keine Planbarkeitsbehauptung" (Nicht-Ziele)      als Verbot
5. „unplanbar" (Steuerungsblock Glaubenssatz)        Präfix negiert
6. „nicht planbar — aber" (Steuerungsblock Zielzst.) Adverb „nicht" negiert
7. „Keine Planbarkeitsbehauptung" (Steuerungsblock)  als Verbot
8. „nicht planbar, aber sichtbar" (LLM-Frage 5)     Adverb „nicht" negiert
```

Ergebnis: alle 8 korrekt negiert — GRÜN

---

## Scope-QA

### Geändert (alle erwartet)

```
M   Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md          ✅
M   .claude/learning/session-log.md                                       ✅
??  docs/steering/patches/AP-14h_[...].md                                ✅
??  docs/steering/patches/AP-14i_[...].md                                ✅ (dieses Protokoll)
```

### Nicht geändert

```
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md      ✅ unberührt
Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html   ✅ unberührt
Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  ✅ unberührt
Apps/regulatorik-dashboard/Bauprompt_[...].md           ✅ unberührt
Apps/regulatorik-dashboard/UX-Synthese-[...].md         ✅ unberührt
Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md  ✅ unberührt
Apps/regulatorik-dashboard/DEV_QA_NOTIZEN.md            ✅ unberührt
Apps/regulatorik-dashboard/Altmaterial/*                ✅ unberührt
APP_SPEC-Dateien                                         ✅ keine erstellt
```

Befund: GRÜN

---

## Commit-Vorbereitung

Status GRÜN — Commit-Kandidaten können vorgeschlagen werden.

### Commit-Kandidaten

```bash
git add Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md \
  docs/steering/patches/AP-14h_regulatorik-dashboard_minispec-neufassung-aus-seed_Ergebnis.md \
  docs/steering/patches/AP-14i_regulatorik-dashboard_minispec-review-app-fabrik-readiness-commit-vorbereitung_Ergebnis.md
```

Optional:

```bash
git add .claude/learning/session-log.md
```

### Commit-Message

```
docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst

- ersetzt historische Roh-MINI_SPEC durch Seed-basierte Fassung
- verankert Abgabenpolitik als Arbeitsidentität
- grenzt ETF-Wahlurne als Mechanik und Metapher ab
- übernimmt Szenarien, Modellgrenzen und Nicht-Ziele
- ergänzt Steuerungsblock mit LLM-Prüfscore
```

---

## Nicht-Ziel-Nachweis

```
MINI_SPEC geändert:          nein
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

## Empfehlung nächster AP

```
Commit AP-14h/i (Commit-Kandidaten und Message oben)
danach AP-14j — regulatorik-dashboard APP_SPEC-Vorbereitung / Scope-Schnitt
```

AP-14j-Hinweis:
- MINI_SPEC ist App-Fabrik-tauglich und kann als Steuerungsgrundlage für die APP_SPEC dienen
- App-Titel für Ghost.io noch offen — klärt AP-14j
- LLM-Selbsttest 16/16 belegt: Drift-Schutz vollständig aktiv
- Einzige stilistische Notiz: „Kernaussage (Modell-Ergebnis, kein Fakt)" könnnte zu „kein empirischer Allgemein-Fakt und keine Prognose" präzisiert werden — kein Blocker, in AP-14j oder APP_SPEC-Erstellung klären
