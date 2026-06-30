# AP-14g Ergebnis — regulatorik-dashboard Seed-Entwurf / Steuerungsblock-Quelle

Stand: 2026-06-30 | Session: AP-14g | Geändert von: Claude

---

## Kurzstatus

```
Status:               GRÜN
Blocker:              nein
Empfehlung nächster AP: AP-14h — regulatorik-dashboard MINI_SPEC-Neufassung aus Seed
```

---

## Kettenposition

```
Vorgänger:  AP-14b–f ✅ 2026-06-30
Aktuell:    AP-14g — Seed-Entwurf / Steuerungsblock-Quelle
Nächster:   AP-14h — MINI_SPEC-Neufassung aus Seed
```

---

## Gate-Ergebnisse

### Gate 1 — Git-Status

```
M  .claude/learning/session-log.md              (Session-Log — erwartet)
M  .claude/memory/feedback_python_powershell_tooling.md  (Memory-Update aus AP-14f — erwartet)
?? docs/steering/patches/AP-14f_[...].md        (AP-14f-Protokoll, noch nicht staged — erwartet)
```

Befund: Keine unerwarteten App-Änderungen. Sauber.

### Gate 2 — AP-14f bestätigt

```
Status:   GRÜN
Blocker:  nein
Empfehlung: AP-14g
```

Befund: GRÜN.

### Gate 3 — Pflichtquellen vorhanden

```
OK  APP_FABRIK_ANAMNESE_MATERIAL.md       (77 Zeilen)
OK  MINI_SPEC_FROM_HAUPTDOKUMENT.md       (41 Zeilen)
OK  ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  (397 Zeilen)
OK  UX-Synthese-LLM-Bewertungen-Iteration-1.md  (338 Zeilen)
OK  APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md  (817 Zeilen)
```

Befund: Alle Pflichtquellen vorhanden.

### Gate 4 — Seed-Format verstanden

Bestehender Block `## regulatorik-dashboard` gefunden: Zeile 885–919.
Status war: `REKONSTRUIERT / ZU PRÜFEN`
Aktion: überarbeiten (nicht neu anlegen).

Format der Seed-Datei:
- Standardstruktur aus Abschnitt 2 (inkl. LLM-Prüfscore Standard-Gate)
- Status-Feld: GESICHERT / REKONSTRUIERT / ZU PRÜFEN / GESPERRT
- Verteilungsstatus-Feld am Anfang
- Abschluss: `---` als Block-Separator

### Gate 5 — Scope-Sicherheit

Genau ein `## regulatorik-dashboard`-Block wird überarbeitet.
Keine anderen Seed-Blöcke berührt.
Befund: GRÜN.

---

## Gelesene Quellen

| Quelle | Pflicht/Optional | Gelesen? | Rolle |
|---|:---:|:---:|---|
| AP-14f-Ergebnisprotokoll | Pflicht | ✅ | Fachliche Anamnese-Basis, Identitäts- und Framing-Entscheidungen |
| APP_FABRIK_ANAMNESE_MATERIAL.md | Pflicht | ✅ (aus AP-14f-Faden geladen) | App-Kern-Hypothese, Mockup-Status, Primärquellen-Übersicht |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md | Pflicht | ✅ (aus AP-14f-Faden geladen) | Kernbotschaft, Szenario-Matrix |
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | Pflicht | ✅ (aus AP-14f-Faden geladen) | Verifizierte Zahlen, These, Narrativ S0–S3 |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | Pflicht | ✅ (aus AP-14f-Faden geladen) | Framing-Warnungen, Tonalitätsregeln |
| APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md | Pflicht | ✅ | Format, bestehender Block, Einfügestelle |
| Bauprompt / DEV_QA_NOTIZEN / HTML | Optional | ✗ | Pflichtquellen ausreichend |
| Altmaterial/ | Verboten | ✗ | Nicht analysiert |

---

## Seed-Datei-Befund

```
Bestehender Block vorhanden:  ja (Zeile 885–919)
Status vorher:                REKONSTRUIERT / ZU PRÜFEN
Aktion:                       überarbeitet (Block vollständig ersetzt)
Einfügestelle:                Zeile 885 (unverändert)
Neue Block-Grenzen:           Zeile 885–959
```

Der alte Block war eine knappe Rohrekonstruktion ohne:
- Abgabenpolitik als Identitätsbegriff
- ETF-Wahlurne als Mechanik-Abgrenzung
- Framing-Regeln
- LLM-Prüffragen
- Tonalitätsregeln
- Differenzierte Planbarkeits-Abgrenzung

---

## Redaktionelle Korrektur gegenüber AP-14f

| Aspekt | AP-14f-Formulierung | AP-14g-Korrektur |
|---|---|---|
| Identitätsbegriff | Steuerpolitik / Renditeminderung | Abgabenpolitik |
| Quantifizierbarkeit | quantifizierbar | Größenordnungen und Szenarien |
| Planbarkeit | planbar | nicht planbar, aber einordenbar |
| Kernthese | real, quantifizierbar, planbar | kein Naturgesetz — politisch gemacht — Szenarien und Größenordnungen |

---

## Kurzfassung des neuen Seed-Kerns

```
Arbeitsidentität:  Abgabenpolitik
Mechanik/Metapher: ETF-Wahlurne (Metapher für politisches Steuerprinzip, nicht App-Identität)
Funnel:            G1 — Systemkritische Einwände
Status:            GESICHERT — redaktionell geprüft (AP-14f/AP-14g 2026-06-30)

Barriere:
  Abgabenpolitische Eingriffe fühlen sich unkontrollierbar und lähmend an.
  „Wenn der Staat die Regeln ändern kann — warum langfristig planen?"

Falscher Glaubenssatz:
  „Weil Abgabenpolitik unplanbar ist, ist jede langfristige ETF-Strategie sinnlos."

Zielzustand:
  Abgabenrisiko ist real und nicht planbar — aber nicht unsichtbar.
  S0–S3 zeigen Größenordnungen: Hunderte Euro/Monat über Jahrzehnte.
  Ändert Beträge, zerstört nicht das Prinzip: einfach, günstig, regelmäßig.

Kernsatz:
  „Das Risiko ist real. Aber es zerstört nicht deine Strategie — nur die Details."

Kernthese im Seed:
  Abgabenpolitik ist kein Naturgesetz.
  Nicht planbar, aber einordenbar.
  Die App zeigt Szenarien und Größenordnungen.
```

---

## QA-Ergebnisse

### QA 1 — Scope

```
M  Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md   OK
M  .claude/learning/session-log.md                       erwartet
M  .claude/memory/feedback_python_powershell_tooling.md  erwartet
?? docs/steering/patches/AP-14g_[...].md                 neu, erwartet

NICHT geändert: MINI_SPEC, HTML, APP_SPEC, Bauprompt, Altmaterial
```

### QA 2 — Pflichtmarker im Block (10/10 OK)

```
OK  Abgabenpolitik
OK  ETF-Wahlurne
OK  kein Naturgesetz
OK  Größenordnungen
OK  Keine Steuer- oder Abgabenberatung
OK  Keine Parteipolitik
OK  Keine Prognose
OK  GESICHERT
OK  Keine Scheinpräzision
OK  Keine Katastrophisierung
```

### QA 3 — Gesperrte Formulierungen (0/4 Treffer)

```
OK  "real, quantifizierbar, planbar" — nicht vorhanden
OK  "präzise quantifizierbar"        — nicht vorhanden
OK  "verlässlich berechenbar"         — nicht vorhanden
OK  "robust planen"                   — nicht vorhanden
```

Hinweis: QA-Script meldete Warnung für "planbar ohne Negation" — False Positive.
Alle tatsächlichen Vorkommen im Block sind korrekt negiert:
- "unplanbar" (Glaubenssatz)
- "nicht planbar — aber" (Zielzustand)
- "nicht planbar" (Muss-Kriterien, Nicht-Ziele, LLM-Frage 5)

### QA 4 — Keine Nebenschäden

```
OK  MINI_SPEC_FROM_HAUPTDOKUMENT.md — unverändert
OK  etf-wahlurnen-rechner.html      — unverändert
OK  APP_SPEC                        — nicht erstellt
OK  Altmaterial                     — nicht analysiert
```

---

## Geänderte Dateien

```
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
  (Block ## regulatorik-dashboard, Zeile 885–919 → 885–959 ersetzt)
docs/steering/patches/AP-14g_regulatorik-dashboard_seed-entwurf-steuerungsblock-quelle_Ergebnis.md
  (dieses Protokoll, neu)
```

---

## Nicht-Ziel-Nachweis

```
MINI_SPEC geändert:            nein
APP_SPEC erstellt/geändert:    nein
HTML geändert:                 nein
Bauprompt geändert:            nein
UX-Synthese geändert:          nein
Wissensdateien geändert:       nein
Altmaterial fachlich analysiert: nein
Andere Seed-Blöcke geändert:   nein
Dateien verschoben:            nein
Dateien gelöscht:              nein
Commit ausgeführt:             nein
Abschlussritual ausgeführt:    nein
```

---

## Empfehlung AP-14h

```
AP-14h — regulatorik-dashboard MINI_SPEC-Neufassung aus Seed
```

Aufgabe AP-14h:
- Seed-Block aus `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md ## regulatorik-dashboard` als Quelle verwenden.
- MINI_SPEC neu fassen: Abgabenpolitik als Identität, Steuerungsblock einfügen.
- Inhaltliche Grundlage: ETF-Wahlurnen-App-Abschlussdokumentation_V2.md (Zahlen, Szenarien).
- Framing: Tonalitätsregeln und Nicht-Ziele aus Seed direkt übernehmen.
- LLM-Prüfscore: App-spezifische Fragen 1–8 aus Seed integrieren.
- HTML und Bauprompt bleiben unberührt.
