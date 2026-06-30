Stand: 2026-06-30 | Session: AP-14a | Geändert von: Claude

# AP-14a Ergebnis — regulatorik-dashboard Drift-Schutz-Inventar und Materialdiagnose

## Kurzstatus

```
Status:                   GELB
Blocker:                  nein (Umsetzung nicht aktiv blockiert)
Empfehlung nächster AP:   AP-14b — regulatorik-dashboard Klärung: Folder-Struktur + Seed-Vervollständigung + MINI_SPEC-Steuerungsblock-Vorbereitung
```

---

## Kettenposition

```
Vorgänger:               AP-15 abgeschlossen (prokrastinations-preis Pilot-Sonderfall GRÜN, commitbereit 2026-06-30)
                         AP-13 Batch-B Rollout abgeschlossen (7 Standard-Kandidaten)
                         AP-12 Batch-A Rollout abgeschlossen
Aktueller AP:            AP-14a — regulatorik-dashboard Drift-Schutz-Inventar und Materialdiagnose
Nächster AP bei GELB:    AP-14b — Klärung Folder-Struktur + Seed-Vervollständigung + MINI_SPEC-Steuerungsblock-Vorbereitung
Nächster AP bei ROT:     Kein Rollout; Fix- oder Klärungs-AP zuerst
```

---

## Git-Status

```
Beginn AP-14a:   M .claude/learning/session-log.md
Ende AP-14a:     M .claude/learning/session-log.md
                 A  docs/steering/patches/AP-14a_regulatorik-dashboard_drift-schutz-inventar-materialdiagnose_Ergebnis.md

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.
```

---

## Gelesene Referenzen

- `docs/steering/patches/AP-13b_batch-schnitt-drift-pilot-sonderfaelle_Ergebnis.md` ✓ (Gate 2: Vorgänger)
- `docs/steering/patches/AP-15c_prokrastinations-preis_review-commit-vorbereitung_Ergebnis.md` ✓ (Gate 2: AP-15 abgeschlossen)
- `Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md` ✓ (Gate 4 + Diagnose)
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` ✓ (Gate 5 + Seed-Extraktion)
- `Apps/regulatorik-dashboard/CLAUDE.md` ✓ (Drift-Signal erkannt)
- `Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md` ✓ (Kontext ETF-Wahlurnen)
- `Apps/regulatorik-dashboard/dashboard-regulatorikXIX.html` (erste 80 Zeilen) ✓ (Prototyp-Identifikation)
- `Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html` (erste 60 Zeilen) ✓ (Fremd-App-Identifikation)

---

## Gate-Ergebnisse

| Gate | Prüfung | Ergebnis |
|---|---|:---:|
| 1 | Git-Status sauber | GRÜN — nur session-log.md modifiziert, AP-15 sauber abgeschlossen |
| 2 | AP-13b: regulatorik-dashboard als Drift-Sonderpfad bestätigt | GRÜN — explizit als B+ / Sonderpfad eingetragen |
| 2 | AP-15c: prokrastinations-preis abgeschlossen oder commitbereit | GRÜN — Status GRÜN, Commit-Kandidatenliste bereit |
| 3 | App-Pfad `Apps/regulatorik-dashboard/` vorhanden | GRÜN |
| 4 | `MINI_SPEC_FROM_HAUPTDOKUMENT.md` vorhanden | GRÜN (2647 B, 60 Z) |
| 4 | `APP_SPEC.md` vorhanden | ROT → KEINE APP_SPEC — kein Blocker für AP-14a |
| 4 | `APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` vorhanden | GRÜN (40602 B) |
| 5 | Seed-Block `## regulatorik-dashboard` vorhanden | GRÜN (36 Zeilen) |
| 6 | Steuerungsblock in MINI_SPEC | NEIN — kein `## Steuerungsblock: Zweck, Barriere, Prüfregeln` |
| 6 | Steuerungsblock in APP_SPEC | N/A — keine APP_SPEC |
| 6 | Seed-Block vollständig für Steuerungsblock-Ableitung | GELB — Status REKONSTRUIERT, kein LLM-Prüfscore |

---

## Materialinventar `Apps/regulatorik-dashboard/`

| Datei | Typ | vermutete Rolle | aktuell/historisch/unklar | Steuerungsrelevanz | Notiz |
|---|---|---|---|---|---|
| `MINI_SPEC_FROM_HAUPTDOKUMENT.md` | MINI_SPEC | Spec-Quelle für Steuerungsblock-Rollout | aktuell (maßgeblich) | HOCH | Kein Steuerungsblock vorhanden; Status "✅ BEREITS GEBAUT" ist irreführend |
| `dashboard-regulatorikXIX.html` | HTML / Prototyp | Regulatorik-Dashboard Prototyp (1155 Z) | aktuell / Entwurf | MITTEL | Entspricht MINI_SPEC-Konzept (Slider: Ansparphase/Rentenphase); title="ETF-Regulatorik XIX"; kein Bezug auf Steuerungsblock |
| `etf-wahlurnen-rechner.html` | HTML / App | Eigenständige App "ETF-Wahlurnen-Rechner" (961 Z) | aktuell / eigenes Projekt | HOCH (Drift-Risiko) | Andere App; Konzept: Steuern durch Wahlurne; Bauprompt-Iterationen + UX-Feedback existieren |
| `CLAUDE.md` | Konfig / Metadaten | Claude-Workflow-Regeln für ETF-Wahlurnen-Rechner | unklar (scheint aktiv) | HOCH (Drift-Risiko) | DEFINIERENDE FEHLERQUELLE: Benennt den Ordner als "Projekt: ETF-Wahlurnen-Super-App", nicht als regulatorik-dashboard |
| `Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md` | Dokumentation | Spec v5.0 für ETF-Wahlurnen-Rechner (796 Z) | historisch/aktuell für Wahlurnen-App | GERING (für regulatorik-dashboard) | Gehört zur Wahlurnen-App, nicht regulatorik-dashboard |
| `Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md` | Dokumentation | Vorgängerversion Bauprompt (849 Z) | historisch | GERING | Entwicklungshistorie Wahlurnen-App |
| `Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md` | Dokumentation | Vorgängerversion Bauprompt (852 Z) | historisch | GERING | Entwicklungshistorie Wahlurnen-App |
| `Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md` | Dokumentation | ChatGPT-Prompt für Wahlurnen-App (613 Z) | historisch | GERING | Externe LLM-Entwicklungsarbeit |
| `ETF-Wahlurnen-App-Abschlussdokumentation_V2.md` | Dokumentation | Inhaltliche Konzeptdoku Wahlurnen-App (523 Z) | aktuell für Wahlurnen | GERING (für regulatorik-dashboard) | Angelegt 2026-04-30; These + Argumentationsstruktur |
| `Perplexity_super-app-prompt.md` | Dokumentation | Perplexity-Prompt für Wahlurnen (229 Z) | historisch | GERING | |
| `UX-Feedback ChatGPT auf erste Iteration.md` | Dokumentation | UX-Review Wahlurnen-App (290 Z) | historisch | GERING | |
| `UX-Feedback Gemini auf erste Iteration.md` | Dokumentation | UX-Review Wahlurnen-App (90 Z) | historisch | GERING | |
| `UX-Feedback Perplexity auf erste Iteration.md` | Dokumentation | UX-Review Wahlurnen-App (198 Z) | historisch | GERING | |
| `UX-Synthese-LLM-Bewertungen-Iteration-1.md` | Dokumentation | LLM-UX-Synthese Wahlurnen (466 Z) | historisch | GERING | |

**Befund Materialinventar:**  
Von 14 Dateien im Ordner gehören **1 Datei** (MINI_SPEC) klar zum regulatorik-dashboard-Rollout, **1 Datei** (dashboard-regulatorikXIX.html) ist der regulatorik-dashboard-Prototyp, und **12 Dateien** gehören zum ETF-Wahlurnen-Rechner-Projekt. Das Verhältnis ist 2:12.

---

## Dokumentenlandkarte

| Datei | Existiert | Rolle | Steuerungsblock vorhanden | Bedeutung für Folgearbeit |
|---|:---:|---|:---:|---|
| `Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md` | JA | Maßgebliche Spec-Quelle | NEIN | Zieldatei für Steuerungsblock-Insertion |
| `Apps/regulatorik-dashboard/APP_SPEC.md` | NEIN | — | N/A | Keine APP_SPEC; Folgepfad ohne APP_SPEC möglich |
| `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` § regulatorik-dashboard | JA | Seed-Quelle | NEIN (Seed selbst hat keinen SB, er ist die Quelle) | Seed REKONSTRUIERT / ZU PRÜFEN — vor Insertion klären |
| `Apps/regulatorik-dashboard/dashboard-regulatorikXIX.html` | JA | Prototyp regulatorik-dashboard | NEIN | Vergleichsmaterial; entspricht MINI_SPEC-Konzept |
| `Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html` | JA | Eigenständige Fremd-App | NEIN | Drift-Risiko-Quelle; Klärung ob Ordner-Trennung nötig |
| `Apps/regulatorik-dashboard/CLAUDE.md` | JA | Claude-Regeln für Wahlurnen-Projekt | N/A | DEFINIERENDE FEHLERQUELLE: falsche Projektidentität |

---

## MINI_SPEC-Inventar

**Datei:** `Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md`  
**Größe:** 2647 B, 60 Zeilen

**Struktur:**

```
H1: # MINI_SPEC_FROM_HAUPTDOKUMENT — Regulatorisches Risiko Dashboard
  Meta-Header: Quelle, Status (Roh-Mini-Spec, noch nicht APP_SPEC)
  H2: ## G1 – Regulatorisches Risiko Dashboard
    Metadaten: Slug, KI-Konsens (★★), Folienbezug, Funnel-Position, Priorität (#6)
    Status: ✅ BEREITS GEBAUT (dashboard-regulatorikXIX-3.html) — ACHTUNG: Datei heißt tatsächlich dashboard-regulatorikXIX.html ohne "-3"
    H3: ### Was die App zeigt
    H3: ### Ausgaben (bereits implementiert)
    H3: ### Kernbotschaft der App
    H3: ### Inhaltlicher Rahmen (mit Szenario-Matrix-Tabelle)
    CTA: „Ich halte es einfach und flexibel."
    H3: ### Erweiterungsidee (V2 der App)
  H2: ## Mini-Spec-Metadaten
    Quelle, Block, App-ID, Titel, Slug, Ordner, Modulrolle, Status
```

**Steuerungsblock in MINI_SPEC:** NEIN  
**Möglicher späterer Anker:** Nach der Meta-Header-Sektion, vor `## G1` oder nach letztem Bold-Metadaten-Feld und `---` (wie Standard-Tool) — GRÜN/bestimmbar, aber erst nach Seed-Klärung sinnvoll  
**Notiz:** Die MINI_SPEC enthält keine psychologische Barrieren-Formulierung als explizites Feld (kein „Falscher Glaubenssatz vorher") — dieser steht nur im Seed. Die Kernbotschaft ist vorhanden. Keine Widersprüche zum Seed erkennbar.

---

## APP_SPEC-Inventar

**Befund:** Keine `APP_SPEC.md` vorhanden.  
Kein Blocker für AP-14a.  
Für AP-14b relevant: Der Steuerungsblock kann in die MINI_SPEC eingefügt werden, ohne dass eine APP_SPEC existieren muss. Nach dem Standard-Rollout-Pfad ist MINI_SPEC die Zieldatei, wenn keine APP_SPEC vorhanden ist.

---

## Prototypen-/Umsetzungsinventar

### Prototyp 1: `dashboard-regulatorikXIX.html` (1155 Zeilen)

| Datei | Rolle | sichtbare Logik / Story | Driftrelevanz | Notiz |
|---|---|---|---|---|
| `dashboard-regulatorikXIX.html` | Regulatorik-Dashboard Prototyp | Zwei Slider (Ansparphase/Rentenphase), Chart.js, zeigt Endvermögen mit/ohne Regulatorikeffekt, nötige Mehrersparnis, Jahresauszahlung — entspricht MINI_SPEC-Ausgaben-Beschreibung | GERING (entspricht MINI_SPEC) | title="ETF-Regulatorik XIX"; Tailwind CSS + Chart.js; Satoshi-Font |

Dieser Prototyp entspricht dem Konzept aus der MINI_SPEC. Kein konzeptioneller Drift sichtbar.

### Prototyp 2: `etf-wahlurnen-rechner.html` (961 Zeilen) — FREMD-APP

| Datei | Rolle | sichtbare Logik / Story | Driftrelevanz | Notiz |
|---|---|---|---|---|
| `etf-wahlurnen-rechner.html` | Eigenständige App "ETF-Wahlurnen-Rechner" | Narrative: Steuern werden an der Wahlurne entschieden; historische Szenarien (vor/nach 2009 Abgeltungsteuer, Zukunftsszenarien); "Kassenbon"-UX-Muster | HOCH (falsche App im Ordner) | Kein Regulatorik-Slider; andere App-Familie; title="ETF-Wahlurnen-Rechner" |

### Wahlurnen-Entwicklungsartefakte (nicht direkt zu regulatorik-dashboard)

| Datei | Rolle | sichtbare Logik / Story | Driftrelevanz | Notiz |
|---|---|---|---|---|
| `ETF-Wahlurnen-App-Abschlussdokumentation_V2.md` | Konzept-Doku Wahlurnen (2026-04-30) | These: Marktschwankungen egalisieren sich, Steuern sind der entscheidende Faktor, Wahlurne entscheidet; S0/S1/S2/S3-Szenarioachse | HOCH | Eigenständiges Konzept; enthält Obsidian-Metadaten |
| Bauprompt-Dateien (3) | Build-Spezifikationen Wahlurnen | Iterierte App-Spezifikation (Master v5.0, V3, V4) | MITTEL | Entwicklungshistorie; kein direkter Bezug zu regulatorik-dashboard |
| UX-Feedback-Dateien (3 + Synthese) | UX-Reviews für Wahlurnen-Iteration-1 | ChatGPT, Gemini, Perplexity haben erste Iteration bewertet | MITTEL | Signifikante Entwicklungsarbeit vorhanden |
| `CLAUDE.md` | Workflow-Regeln für Wahlurnen | definiert Arbeitsregeln (Erst prüfen, Batching, Token-Sparen) für etf-wahlurnen-rechner.html | HOCH | Benennt Ordner als falsches Projekt |

---

## Seed-Block-Kernfelder

Seed-Block: `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md § ## regulatorik-dashboard` (36 Zeilen)

| Feld | Seed-Inhalt |
|---|---|
| Status | REKONSTRUIERT / ZU PRÜFEN |
| Rolle | G1 — Systemrisiken einordnen |
| Verteilungsstatus | Nicht verteilt |
| Diese App existiert, um | Regulierung, Steuern und politische Eingriffe als reale Faktoren sichtbar zu machen, ohne daraus Lähmung oder Weltuntergang abzuleiten |
| Zu entfernende psychologische Barriere | Systemrisiken werden als Grund benutzt, gar nicht zu handeln |
| Falscher Glaubenssatz vorher | „Der Staat, Steuern oder Regulierung machen langfristiges Investieren ohnehin sinnlos." |
| Zielzustand nach der App | „Systemrisiken sind real. Ich kann sie einpreisen und robust planen, statt mich lähmen zu lassen." |
| Muss-Kriterien | Mehrere Szenarien nüchtern zeigen; keine Kampfrhetorik; keine Rechtsversprechen; keine Handlungslähmung; Handlungsspielraum sichtbar |
| Nicht-Ziele / harte Verbote | Keine Rechts- oder Steuerberatung; kein politischer Rant; keine Untergangs-App; keine Lähmung durch Worst-Case |
| LLM-Prüfscore | FEHLT — kein Prüfscore-Block im Seed |
| Klärungsbedarf | „Konkrete Szenarien aus Mini-Spec prüfen." — offen, ungelöst |

---

## Vergleich MINI_SPEC ↔ Seed ↔ APP_SPEC ↔ Prototypen

| Prüfbereich | MINI_SPEC | Seed | APP_SPEC | Prototyp / Material | Befund |
|---|---|---|---|---|---|
| App-Zweck | Regulatorische Eingriffe quantitativ zeigen (Slider-Modell) | Regulierung sichtbar machen, ohne Lähmung | NICHT VORHANDEN | Slider-Prototyp dashboard-regulatorikXIX.html entspricht MINI_SPEC | KONSISTENT (MINI_SPEC ↔ Seed ↔ Prototyp) |
| Nutzerproblem | Regulatorische Drift bedroht Renditestrategie | Systemrisiken werden als Lähmungsgrund benutzt | N/A | dashboard-regulatorikXIX.html zeigt Endvermögen-Delta | KONSISTENT |
| Psychologische Barriere | Implizit: „regulatorische Drift macht ETF sinnlos" | Explizit: „Systemrisiken → gar nicht handeln" | N/A | Keine explizite Barrieren-Adressierung sichtbar | KONSISTENT, aber unterschiedliche Explizitheit |
| Falscher Glaubenssatz | Nicht explizit als Feld | Explizit: „Staat macht Investieren sinnlos" | N/A | Nicht sichtbar im Prototyp | KONSISTENT (Seed hat das Feld expliziter) |
| Zielzustand | Implizit: einfache Strategie überlebt (CTA: „Ich halte es einfach") | Explizit: „einpreisen und robust planen" | N/A | Nicht explizit | KONSISTENT (verschiedene Formulierungen, gleiche Richtung) |
| Kernbotschaft | „Das Risiko ist real. Aber es zerstört nicht deine Strategie – nur die Details." | Nicht als Kernbotschaft benannt, aber inhaltlich konsistent | N/A | Nicht explizit sichtbar | KONSISTENT |
| Nicht-Ziele | Nicht explizit als Nicht-Ziele-Block | Explizit: keine Beratung, kein Rant, keine Untergangs-App | N/A | Nicht überprüfbar ohne JS-Analyse | LÜCKE in MINI_SPEC (kein Nicht-Ziele-Block), aber kein Widerspruch |
| Mentorrolle / Tonalität | Nüchtern, pragmatisch; CTA sachlich | Kein politischer Rant; keine Lähmung | N/A | Nicht tief geprüft | KONSISTENT |
| Daten-/Regulatoriklogik | Szenario-Matrix: 4 Szenarien mit Wahrscheinlichkeit/Schaden | Klärungsbedarf: „Szenarien aus Mini-Spec prüfen" | N/A | Slider mit Renditeverlust in % | ABWEICHUNG: Seed verweist auf MINI_SPEC-Szenarien, aber Klärungsbedarf ist noch offen |
| LLM-Prüfscore | Nicht vorhanden | FEHLT im Seed | N/A | N/A | LÜCKE (struktureller Mangel im Seed) |
| CLAUDE.md / Projektidentität | MINI_SPEC korrekt | Seed korrekt | N/A | CLAUDE.md falsche Identität (ETF-Wahlurnen) | MATERIAL DRIFTGEFÄHRDET |
| ETF-Wahlurnen-Rechner | Kein Bezug in MINI_SPEC | Kein Bezug im Seed | N/A | Gesamte Wahlurnen-App mit Abschlussdokumentation, 3 Bauprompts, 4 UX-Reviews | MATERIAL WEITER ALS MINI_SPEC / ABWEICHUNG (andere App-Idee) |
| Filename-Referenz | „dashboard-regulatorikXIX-3.html" | Kein Filename | N/A | Tatsächlich: `dashboard-regulatorikXIX.html` (ohne „-3") | ABWEICHUNG (vermutlich veralteter Verweis in MINI_SPEC) |

---

## Drift-Risikoliste

```
Sichere Konsistenzen:
- App-Zweck, Nutzerproblem, Zielzustand: MINI_SPEC ↔ Seed ↔ dashboard-regulatorikXIX.html konsistent
- Nicht-Ziele im Seed klar (keine Rechtsberatung, kein Rant, keine Untergangs-App)
- MINI_SPEC ist die richtige Zieldatei für Steuerungsblock-Insertion (Standard-Rollout-Pfad)
- dashboard-regulatorikXIX.html entspricht dem MINI_SPEC-Konzept ohne erkennbare konzeptionelle Drift

Mögliche Abweichungen:
- Filename-Referenz in MINI_SPEC: "dashboard-regulatorikXIX-3.html" → tatsächlich "dashboard-regulatorikXIX.html"
- Klärungsbedarf im Seed ("Konkrete Szenarien aus Mini-Spec prüfen") ist noch offen
- MINI_SPEC hat keinen expliziten Nicht-Ziele-Block — Seed hat ihn; kein Widerspruch, aber Lücke

Material-/Prototypen-Altlasten:
- ETF-Wahlurnen-Rechner-Entwicklung (etf-wahlurnen-rechner.html + 10 Begleitdateien) im regulatorik-dashboard-Ordner abgelegt
- Diese Arbeit (2026-04 datierbar) scheint in der regulatorik-dashboard-Ordnerstruktur gelandet zu sein
- Die Wahlurnen-App ist inhaltlich verwandt (beide: Steuer/Regulierung im ETF-Kontext), aber eine andere App-Idee
- Die Wahlurnen-App hatte bereits: Abschlussdokumentation, 3 Bauprompt-Versionen, 4 externe UX-Reviews (ChatGPT/Gemini/Perplexity)

Drift-Risiken:
1. CLAUDE.md: Benennt den Ordner als "Projekt: ETF-Wahlurnen-Super-App" — jede neue Session im Ordner würde diesen Kontext laden und in die falsche App arbeiten
2. Seed Status REKONSTRUIERT / ZU PRÜFEN: Bedeutet, der Seed wurde nicht aus der Originalquelle übernommen, sondern nachträglich erstellt. Vor Steuerungsblock-Insertion sollte geprüft werden, ob der rekonstruierte Seed korrekt ist.
3. Kein LLM-Prüfscore im Seed: Andere Seed-Blöcke (z.B. prokrastinations-preis) haben einen 4-Kriterien-Score. Dieser fehlt für regulatorik-dashboard.
4. ETF-Wahlurnen-App könnte als "zugehörig" missverstanden werden: Wer den Ordner ohne Kontext öffnet, sieht 10+ Dateien einer anderen App + CLAUDE.md mit falscher Identität.

Unklare Punkte:
- Was ist die Beziehung zwischen dashboard-regulatorikXIX.html und etf-wahlurnen-rechner.html?
  Option A: Beide sind Prototypen derselben App-Idee in verschiedenen Iterationen (Wahlurnen = V2 von regulatorik-dashboard?)
  Option B: Es sind zwei eigenständige Apps, die zufällig im selben Ordner gelandet sind
  Option C: Die Wahlurnen-App soll die regulatorik-dashboard-App ersetzen
- Soll etf-wahlurnen-rechner.html in einen eigenen App-Ordner?
- Soll CLAUDE.md korrigiert werden (auf regulatorik-dashboard) oder entfernt werden?
- Ist der REKONSTRUIERTE Seed bereits ausreichend für Steuerungsblock-Insertion, oder muss er erst vollständig werden (LLM-Prüfscore, Klärungsbedarf auflösen)?

Blocker:
- Kein harter Blocker für AP-14a (Diagnose vollständig möglich)
- Soft-Blocker für Steuerungsblock-Insertion: Seed-Status REKONSTRUIERT / ZU PRÜFEN und fehlender LLM-Prüfscore sollten vor Write-Ausführung adressiert werden
```

---

## Diagnosebewertung

### Was ist sicher?

- MINI_SPEC ist vorhanden, inventarisierbar und die richtige Zieldatei für Steuerungsblock-Insertion.
- Seed-Block ist vorhanden und inhaltlich konsistent mit MINI_SPEC (Zweck, Barriere, Zielzustand).
- `dashboard-regulatorikXIX.html` ist der tatsächliche regulatorik-dashboard-Prototyp — er entspricht dem MINI_SPEC-Konzept ohne erkennbare konzeptionelle Drift.
- Keine APP_SPEC vorhanden — kein Problem für den MINI_SPEC-Rollout-Pfad.
- Alle Standard-Rollout-Gates (App-Pfad, MINI_SPEC, Seed) sind grundsätzlich erfüllt.

### Was ist unklar?

- Beziehung ETF-Wahlurnen-Rechner ↔ regulatorik-dashboard — inhaltlich verwandt, aber unterschiedliche App-Idee.
- Ob CLAUDE.md im Ordner aktuell noch genutzt wird oder historisch ist.
- Ob der REKONSTRUIERTE Seed als Basis für den Steuerungsblock akzeptiert wird, ohne den Klärungsbedarf aufzulösen.
- Ob ein LLM-Prüfscore für den Seed nachgetragen werden soll.

### Was ist kritisch?

- **CLAUDE.md mit falscher Projektidentität**: Wenn ein neuer Faden in `Apps/regulatorik-dashboard/` geöffnet wird, lädt die IDE dieses CLAUDE.md — und jede weitere Arbeit wäre im Kontext "ETF-Wahlurnen-Super-App". Das ist ein strukturiertes Drift-Risiko, das sich in jeder Session reproduziert.
- **Seed-Status REKONSTRUIERT / ZU PRÜFEN**: Dieser Status bedeutet, dass der Seed nicht als geprüft gilt. Der Standard-Rollout fügt den Seed-Block unverändert als Steuerungsblock in die MINI_SPEC ein — wenn der Seed unvollständig oder fehlerhaft rekonstruiert ist, wird ein falscher Steuerungsblock eingefügt.

### Was blockiert Umsetzung?

Keine harten Blocker. Aber:
1. Seed-Status und fehlender LLM-Prüfscore sollten vor einem Write-Lauf adressiert werden.
2. CLAUDE.md-Problem und ETF-Wahlurnen-Strukturfrage sind Albert-Entscheidungen, die vor der Insertion geklärt werden sollten.

### Ist eine standardnahe MINI_SPEC-Insertion wahrscheinlich möglich?

**Ja, technisch.** Der Anker ist bestimmbar, der Seed-Inhalt ist vorhanden.  
**Aber vor einem Write** sollte Albert entscheiden:
1. Seed-Status REKONSTRUIERT akzeptiert als-is? Oder zuerst vervollständigen (LLM-Prüfscore)?
2. CLAUDE.md im Ordner korrigieren (bevor ein neuer Faden Wahlurnen-Kontext lädt)?

### Ist vorher eine APP_SPEC-/Prototypen-Driftprüfung nötig?

**Nein** — die APP_SPEC existiert nicht, und `dashboard-regulatorikXIX.html` zeigt keine konzeptionelle Drift gegen MINI_SPEC/Seed. Eine separate Driftprüfung gegen den Prototypen ist nicht erforderlich.  
Die ETF-Wahlurnen-Dateien sind eine **Ordnerstruktur-Frage**, keine Driftfrage innerhalb des regulatorik-dashboard-Konzepts.

---

## Empfohlener Folgepfad

```
AP-14b — regulatorik-dashboard: Klärungsentscheidungen + MINI_SPEC-Steuerungsblock-Vorbereitung
```

### Inhalt AP-14b

**Schritt 1 — Albert-Entscheidungen (kein Claude-Code-Handeln ohne OK):**

Frage A: Was ist die Beziehung zwischen `dashboard-regulatorikXIX.html` und `etf-wahlurnen-rechner.html`?
- Option: Wahlurnen-Rechner ist eine eigenständige App → eigener Ordner empfohlen
- Option: Wahlurnen-Rechner ersetzt regulatorik-dashboard → Klärung welche App weitergeführt wird

Frage B: Was soll mit `Apps/regulatorik-dashboard/CLAUDE.md` passieren?
- Option: CLAUDE.md auf regulatorik-dashboard korrigieren (angepasste Projektbeschreibung)
- Option: CLAUDE.md entfernen (regulatorik-dashboard braucht kein eigenes CLAUDE.md)
- Option: CLAUDE.md belassen, da Wahlurnen-Arbeit zu dieser App gehört

Frage C: Ist der REKONSTRUIERTE Seed-Status akzeptiert?
- Option: Seed as-is akzeptiert — dann Steuerungsblock-Dry-run kann starten
- Option: Seed erst mit LLM-Prüfscore vervollständigen — dann AP-14b erstellt zuerst den Score

**Schritt 2 — nach Alberts Entscheidungen:**
- Ggf. Seed-LLM-Prüfscore nachtragen (wenn Option C2)
- Anker-Inventar MINI_SPEC (wie AP-12a/AP-13c)
- Dry-run mit Tool für regulatorik-dashboard
- Write-Freigabe nach grünem Dry-run

**Warum diese Option?**

Die inhaltliche Drift zwischen MINI_SPEC und Seed ist gering. Technisch wäre eine sofortige Steuerungsblock-Insertion möglich. Aber die CLAUDE.md-Situation und der Seed-Status REKONSTRUIERT sind zwei Punkte, bei denen Albert eine explizite Entscheidung treffen sollte, bevor Claude in den Write-Modus geht. Diese Klärungen sind kurz und erfordern keine eigene Diagnose-Session — AP-14b kann direkt mit den Entscheidungsfragen starten.

---

## Geänderte Dateien

```
docs/steering/patches/AP-14a_regulatorik-dashboard_drift-schutz-inventar-materialdiagnose_Ergebnis.md  (neu, dieses Protokoll)
```

---

## Nicht-Ziel-Nachweis

```
MINI_SPEC geändert:        nein
APP_SPEC geändert:         nein (keine APP_SPEC vorhanden)
Seed geändert:             nein
Tool geändert:             nein
Prototypen geändert:       nein
HTML/CSS/JS geändert:      nein
CLAUDE.md geändert:        nein (nur gelesen)
Write ausgeführt:          nein (außer diesem Protokoll)
Commit ausgeführt:         nein
```
