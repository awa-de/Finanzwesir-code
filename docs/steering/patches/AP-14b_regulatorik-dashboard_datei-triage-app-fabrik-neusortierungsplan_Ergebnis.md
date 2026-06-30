Stand: 2026-06-30 | Session: AP-14b | Geändert von: Claude

# AP-14b Ergebnis — regulatorik-dashboard Datei-Triage und App-Fabrik-Neusortierungsplan

---

## Kurzstatus

```
Status:                GRÜN
Blocker:               nein
Empfohlener nächster AP: AP-14c — Wissenssicherung aus CLAUDE.md und Kernmaterial
```

---

## Kettenposition

```
Vorgänger:  AP-14a — regulatorik-dashboard Drift-Schutz-Inventar und Materialdiagnose (✅ 2026-06-30)
Aktuell:    AP-14b — regulatorik-dashboard Datei-Triage und App-Fabrik-Neusortierungsplan
Nächster:   AP-14c — Wissenssicherung aus CLAUDE.md und Kernmaterial
```

---

## Git-Status zu Beginn

```
 M .claude/learning/session-log.md
```

Nur die session-log.md von Schritt 0 dieses Sessions ist modifiziert.
Keine unerwarteten Änderungen außerhalb des erwarteten Bereichs.
Der manuelle Move von dashboard-regulatorikXIX.html nach Altmaterial/ ist nicht im Git-Status sichtbar
(Datei war wahrscheinlich bereits im letzten Commit in Altmaterial/).

---

## Altmaterial-Zustand

```
Altmaterial/ existiert:               ja
dashboard-regulatorikXIX.html dort:  ja
Altmaterial analysiert:               nein
```

---

## Direktbestand ohne Altmaterial (Gate 3)

13 Dateien direkt in `Apps/regulatorik-dashboard/`:

| Datei | Typ | Größe | Zeilen |
|---|---|---:|---:|
| Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md | .md | 27 KB | 539 |
| Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md | .md | 28 KB | 635 |
| Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md | .md | 32 KB | 627 |
| Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md | .md | 17 KB | 415 |
| CLAUDE.md | .md | 2,6 KB | 41 |
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | .md | 23 KB | 397 |
| etf-wahlurnen-rechner.html | .html | 35 KB | 872 |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md | .md | 2,6 KB | 41 |
| Perplexity_super-app-prompt.md | .md | 10 KB | 181 |
| UX-Feedback ChatGPT auf erste Iteration.md | .md | 12 KB | 173 |
| UX-Feedback Gemini auf erste Iteration.md | .md | 5,7 KB | 70 |
| UX-Feedback Perplexity auf erste Iteration.md | .md | 12 KB | 150 |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | .md | 18 KB | 338 |

---

## App-Fabrik-Prozessmatrix (Gate 4)

Abgeleitet aus: MINI_SPEC-Beispielen (prokrastinations-preis, diversifikations-detektor),
CLAUDE.md (projekt-weit), vorhandenen Patch-Protokollen.

| Artefakt | Zweck heute | Typischer Inhalt | Nicht hinein |
|---|---|---|---|
| MINI_SPEC | App-Identität: Barriere → Zielzustand; Pflichtlektüre vor jeder Änderung | Steuerungsblock (Rolle / Barriere / falscher Glaubenssatz / Zielzustand / Nicht-Ziele / LLM-Prüfscore), Kernbotschaft, grobe Datenlogik, UX-Flow-Skizze | Technische Details, Code, spezifisches Design, verifizierte Berechnungen |
| APP_SPEC | Vollständige Umsetzungsspec — verbindlicher technischer Vertrag | UX-Flow (alle Screens), Technikentscheidungen, Datenmodell, Testfälle, A11y, QA-Gates, CTAs, Microcopy | Fachliche Hintergründe (gehören in Seed), grobe Ideen, historische Iterationen |
| Seed / Steuerungsblock | Redaktionelle Quelle für APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md | Rolle im Funnel, psycholog. Barriere, Zielzustand, Muss-Kriterien, Nicht-Ziele, LLM-Prüfscore | Code, UX-Details, Berechnungen |
| HTML-Mockup | Inspirations- und Story-Artefakt; Referenz für Narrativ und UX-Ideen | Funktionsfähiger Prototyp mit Story und Szenarien | Technischer Vertrag, App-Fabrik-konformer Code, normative Architekturentscheidungen |
| DEV/QA-Notiz | App-spezifisches Dev-Wissen für spätere Coding-Sessions | Regressions-Checkliste, Token-Sparregeln, bekannte Quirks, technische Constraints | Fachliche Inhalte, UX-Beschreibungen |
| Altmaterial / Archiv | Historische Iterationen ohne aktiven Nutzwert | Frühere HTML-Versionen, ersetzte Bauprompts, überholte Einzelfeedbacks | Aktive Arbeitsartefakte, Primärquellen |

---

## Direktbestand-Tabelle (Analyse 2)

| Datei | Typ | Kurzinhalt | Heutige Rolle | Zielkategorie | Spätere Aktion | Prio | Begründung |
|---|---|---|---|---|---|:---:|---|
| etf-wahlurnen-rechner.html | HTML | Funktionsfähiger ETF-Wahlurnen-Rechner: 4 Steuerszenarien S0–S3, Wahlurnen-Modus, Chart.js, responsive | Aktivster Prototyp des aktuellen App-Kerns | MOCKUP / STORY-PROTOTYP | BEHALTEN DIREKT IM ORDNER | HOCH | Primäre Referenz für Narrativ, UX-Ideen, Szenarien — kein App-Fabrik-Artefakt; nicht als technischer Vertrag verwenden |
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | MD | Konzeptdokument (2026-04-30): These, S0–S3-Narrativ, Rechenmodell, verifizierte Schlüsselzahlen | Inhaltliche Grundlage für APP_SPEC und Seed | APP_SPEC-QUELLE + SEED-QUELLE | IN APP_SPEC EINARBEITEN + IN SEED-ENTWURF BERÜCKSICHTIGEN | HOCH | Enthält verifizierte Berechnungen, Szenariodefinitionen, Kernthese — primäre inhaltliche Quelle |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | MD | Konsolidiertes UX-Brief für Iteration 2 (Konsens aller 3 LLMs: ChatGPT, Gemini, Perplexity) | Aktuellste UX-Erkenntnisquelle | APP_SPEC-QUELLE + DEV_QA_WISSEN | IN APP_SPEC EINARBEITEN + IN DEV_QA_NOTIZ ÜBERFÜHREN | HOCH | Synthese schlägt Einzelfeedbacks; direkte Quelle für APP_SPEC §UX |
| Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md | MD | Master-Bauprompt v5.0 (maßgeblich laut lokaler CLAUDE.md): Architektur, Rechenmodell, UX-Flow vollständig | Spec-Master der Iterations-Phase | APP_SPEC-QUELLE | IN APP_SPEC EINARBEITEN (Primärquelle), danach NUR ALS HISTORIE REFERENZIEREN | HOCH | Verbindlichste Bauprompt-Version; sollte Hauptquelle für APP_SPEC-Anamnese sein |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md | MD | Roh-Spec G1 aus Hauptdokument — Slug regulatorik-dashboard, Status "BEREITS GEBAUT", 2 Regler | Veraltete Roh-Spec für Vorgänger-App | MINI_SPEC-QUELLE (stark veraltet) | IN MINI_SPEC EINARBEITEN (vollständige Neufassung nötig) | HOCH | Kein Steuerungsblock-Format; Status "BEREITS GEBAUT" ist falsch; Kernthema gültig, aber Struktur muss neu |
| CLAUDE.md | MD | Haupt-Artefakt-Pointer, Spec-Master-Verweis, Workflow-Regeln, Token-Spare, Regressions-Checkliste | Historisches app-lokales Workflow-Wissen | DEV_QA_WISSEN + ABSCHLUSSDOKU | IN WISSENSDOKUMENT EXTRAHIEREN, dann löschen | MITTEL | Wertvoller Dev-Inhalt (Regressions-Checkliste), aber als aktive CLAUDE.md gefährlich: würde alten Ad-hoc-Workflow reaktivieren |
| Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md | MD | Bauprompt V4 — größte Datei (32 KB), Iterationsversion vor Master | Vorläufer des Master-Prompts | BAUPROMPT_HISTORIE | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | Master ist maßgeblich; V4 nur Iterationshistorie |
| Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md | MD | Bauprompt V3 — frühere Iterationsversion | Ältere Iterationsversion | BAUPROMPT_HISTORIE | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | Vor V4 und Master; nur Iterationshistorie |
| Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md | MD | ChatGPT-generierter Bauprompt — frühe externe Interpretation | Externe LLM-Variante, frühe Quelle | BAUPROMPT_HISTORIE | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | Nicht die Hauptlinie; in Master aufgegangen |
| Perplexity_super-app-prompt.md | MD | Perplexity-Bauprompt mit Drei-Schichten-Architektur und Nexus-Palette | Alternative Bauprompt-Quelle | BAUPROMPT_HISTORIE | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | Nicht die Hauptlinie; ergänzende Perspektive, nicht maßgeblich |
| UX-Feedback ChatGPT auf erste Iteration.md | MD | ChatGPT UX-Analyse Iter. 1 (Krug, Tufte, FAANG, Nutzerpsychologie) | Einzelfeedback; in Synthese aufgegangen | UX_FEEDBACK (historisch) | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | UX-Synthese enthält alle relevanten Punkte |
| UX-Feedback Gemini auf erste Iteration.md | MD | Gemini UX-Analyse Iter. 1 (kürzer als die anderen) | Einzelfeedback; in Synthese aufgegangen | UX_FEEDBACK (historisch) | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | Kürzeste Quelle; in UX-Synthese aufgegangen |
| UX-Feedback Perplexity auf erste Iteration.md | MD | Perplexity UX-Analyse Iter. 1 (Krug, Tufte, FAANG, Responsivität) | Einzelfeedback; in Synthese aufgegangen | UX_FEEDBACK (historisch) | NACH ALTMATERIAL VERSCHIEBEN | NIEDRIG | UX-Synthese enthält alle relevanten Punkte |

---

## CLAUDE.md-Extraktionsmatrix (Analyse 3)

Die lokale `CLAUDE.md` (41 Zeilen, 2,6 KB) enthält folgende Abschnitte:

| Abschnitt / Inhalt | Wertvoll? | Zielort später | Aktion | Begründung |
|---|:---:|---|---|---|
| Haupt-Artefakt: etf-wahlurnen-rechner.html ist einzige produktive Datei | Ja | APP_FABRIK_ANAMNESE_MATERIAL.md | ÜBERNEHMEN | Definiert den App-Kern und seine Single-File-Natur |
| Spec-Master: Bauprompt_Master v5.0 ist verbindlich (bei Konflikten) | Ja | APP_FABRIK_ANAMNESE_MATERIAL.md | ÜBERNEHMEN | Versionshierarchie der Bauprompts dokumentieren |
| Typischer Workflow: Feedback-Datei → Claude liest → HTML direkt ändern | Nein | ALTMATERIAL oder streichen | NUR ALS HISTORIE | Alter Ad-hoc-Workflow; ersetzt durch App-Fabrik-Prozess mit Gate und APP_SPEC |
| Technische Rahmenbedingungen: Single HTML, kein Server, Chart.js via CDN | Ja | APP_SPEC (Technik-Abschnitt) | IN APP_SPEC EINARBEITEN | Gültige technische Constraints für zukünftige Umsetzung |
| Arbeitsregel 1 — Erst prüfen, dann editieren | Bedingt | DEV_QA_NOTIZEN.md | ÜBERFÜHREN (Kurzform) | Allg. Arbeitsregel; bleibt sinnvoll, aber in App-Fabrik-Kontext kürzen |
| Arbeitsregel 2 — Einfachste Interpretation zuerst | Bedingt | DEV_QA_NOTIZEN.md | ÜBERFÜHREN (Kurzform) | Allg. Arbeitsregel; kürzen |
| Arbeitsregel 3 — Batching max. 4 Änderungen, dann Stop | Nein | ALTMATERIAL oder streichen | NICHT ÜBERNEHMEN | Spezifisch für ad-hoc Workflow; App-Fabrik hat eigene Gate-Logik |
| Token-Sparregeln: Zeilennummern, Grep bevorzugen, kein Goldplating | Ja | DEV_QA_NOTIZEN.md | ÜBERFÜHREN | Direkt nützlich für App-spezifische Coding-Sessions |
| Regressions-Checkliste: Tooltip, X-Achse, Abstand Sektionen, Mobile | Ja | DEV_QA_NOTIZEN.md | ÜBERFÜHREN | Wertvollster Teil der CLAUDE.md — direkt in Coding-Session verwendbar |

**Fazit CLAUDE.md:** Nicht löschen bis AP-14c ausgeführt. Nach Extraktion der 5 wertvollen Abschnitte löschen (mit Alberts OK).

---

## HTML-Mockup-Bewertung (Analyse 4)

**Datei:** etf-wahlurnen-rechner.html (35 KB, 872 Zeilen)

**Was es ist:**
Funktionsfähiger visueller Prototyp. Eigene CSS-Variablen (teal, blue, amber, red für S0–S3),
Satoshi-Font via CDN, responsive Grid, Chart.js für Visualisierung.

**Story / Narrativ:**
- 4 Steuerszenarien: S0 (steuerfreie Ära bis 2008), S1 (Abgeltungsteuer seit 2009),
  S2 (ohne Teilfreistellung), S3 (Einkommensteuer / pers. Grenzsteuersatz)
- "Wahlurnen-Modus" als Hauptmechanik: Nutzer wählt Szenario wie an einer Wahlurne
- Kassenbon-Euro-Abschnitt als emotionaler Einstieg
- Ansar- und Entnahmephase in einem Tool

**Was es für MINI_SPEC liefert:**
- App-Kern-Bestätigung: Renditeminderung durch Steuer/Regulatorik; 4 Szenarien
- Emotionaler Einstieg (Kassenbon) → gutes MINI_SPEC-Story-Material
- Kernbotschaft implizit: "Was du nicht kontrollieren kannst, kannst du trotzdem verstehen und einplanen"

**Was es für APP_SPEC liefern könnte:**
- UX-Flow-Skizze (Abschnitte: Hero, Kassenbon, Hauptsimulation, Entnahme)
- Farbkodierung der Szenarien (S0 teal, S1 blau, S2 amber, S3 rot)
- Rechenmodell-Grundstruktur (Spar- + Entnahmephase)

**Was es NICHT ist:**
- Kein App-Fabrik-konformer Code (kein Steuerungsblock, kein Framework)
- Kein technisch verbindlicher Vertrag für APP_SPEC
- Nicht für Ghost.io direkt einbettungsfertig (Wrapper-Klassen nicht geprüft)
- Keine MINI_SPEC-Elemente (Barriere/Zielzustand/Nicht-Ziele fehlen)

**Empfehlung:** Bleibt direkt im Ordner. Dient als Story-Referenz und UX-Inspiration.
Nicht als Vorlage für technische Entscheidungen in APP_SPEC verwenden.

---

## Bauprompt-/Iterationsbewertung (Analyse 5)

**Versionshierarchie (abgeleitet aus lokaler CLAUDE.md):**

```
Chat-GPT_Super-App_Bauprompt (früh, extern) 
  → V3 
    → V4 
      → Master_Obsidian.md (v5.0, maßgeblich)
Perplexity_super-app-prompt.md (parallele externe Variante, nicht Hauptlinie)
```

| Datei | Einschätzung | Aktiv? | Empfehlung |
|---|---|:---:|---|
| Master_Obsidian.md | Maßgeblichste Version (v5.0 laut CLAUDE.md); Primärquelle für APP_SPEC-Anamnese | Ja | BEHALTEN bis APP_SPEC ausgeschlachtet |
| V4_Obsidian.md | Unmittelbarer Vorgänger von Master; 32 KB, größte Datei | Nein | → Altmaterial |
| V3_Obsidian.md | Ältere Iterationsversion | Nein | → Altmaterial |
| Chat-GPT_Bauprompt.md | Externe LLM-Interpretation, frühe Phase | Nein | → Altmaterial |
| Perplexity_super-app-prompt.md | Alternative externe Quelle; Drei-Schichten-Architektur interessant, aber nicht Hauptlinie | Nein | → Altmaterial (ggf. einen Satz in APP_FABRIK_ANAMNESE sichern) |

**Wertvoller Kern:** Master_Obsidian.md als einzige aktiv zu haltende Bauprompt-Datei.

---

## UX-Feedback-Bewertung (Analyse 6)

| Datei | Einschätzung | Noch aktiv? | Empfehlung |
|---|---|:---:|---|
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | Konsolidiertes Brief für Iteration 2; enthält Konsens aller 3 LLMs | Ja — Primärquelle | BEHALTEN, in APP_SPEC §UX einarbeiten |
| UX-Feedback ChatGPT auf erste Iteration.md | Einzelfeedback; Punkte vollständig in Synthese aufgegangen | Nein | → Altmaterial |
| UX-Feedback Gemini auf erste Iteration.md | Einzelfeedback (kürzeste); Punkte in Synthese aufgegangen | Nein | → Altmaterial |
| UX-Feedback Perplexity auf erste Iteration.md | Einzelfeedback; Punkte in Synthese aufgegangen | Nein | → Altmaterial |

**Wichtiger Hinweis:** Die UX-Synthese enthält eine "Minderheitsmeinung mit hohem Hebel":
Vertrauens-Risiko durch politisches Framing (nur ChatGPT). Das muss in AP-14e / MINI_SPEC
als mögliche Nicht-Ziel-Verletzung explizit adressiert werden.

---

## MINI_SPEC-Bewertung (Analyse 7)

**Datei vorhanden:** ja (`MINI_SPEC_FROM_HAUPTDOKUMENT.md`, 41 Zeilen)

**Zustand:** Roh-Spec aus Hauptdokument — sehr kurz, noch nicht im aktuellen Steuerungsblock-Format.

**Probleme:**
1. Status "BEREITS GEBAUT" bezieht sich auf `dashboard-regulatorikXIX.html` — die alte Vorgänger-App.
   Für den aktuellen ETF-Wahlurnen-Kern ist das falsch.
2. Kein Steuerungsblock-Format: Rolle, Barriere, falscher Glaubenssatz, Zielzustand,
   Nicht-Ziele und LLM-Prüfscore fehlen vollständig.
3. Beschreibt alten App-Typ (2 abstrakte Regler, Renditeverlust in %) statt
   ETF-Wahlurnen-Kernmodell (4 Steuerszenarien, Kassenbon-Euro-Einstieg).
4. App-Titel "Regulatorisches Risiko Dashboard" ist möglicherweise zu technisch
   für den emotionalen Finanzwesir-Kontext.

**Was noch gültig ist:**
- Kernthema: Renditeminderung durch Regulatorik/Steuern — vollständig gültig
- Szenario-Matrix (Wahrscheinlichkeit / Schaden) ist gutes APP_SPEC-Material
- Kernbotschaft: "Das Risiko ist real. Aber es zerstört nicht deine Strategie" — ist noch passend
- Slug `regulatorik-dashboard` — gültig

**Empfehlung:** Vollständige Neufassung in AP-14e nötig.
Kein einfaches Update — die Struktur muss komplett neu auf Steuerungsblock-Format gebracht werden.
Bestehende Datei als Rohstoff nutzen, nicht als Basis bewahren.

---

## Zielstruktur-Vorschlag (Analyse 8)

```
Apps/regulatorik-dashboard/
│
│   # AKTIVER KERN — nach Abschluss der APs
│
├── MINI_SPEC_FROM_HAUPTDOKUMENT.md     ← Neufassung mit Steuerungsblock (AP-14e)
├── APP_SPEC.md                         ← neu (AP-14g)
│
│   # PRIMÄRQUELLEN — behalten bis ausgeschlachtet
│
├── etf-wahlurnen-rechner.html          ← Mockup/Story-Referenz (behalten)
├── ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  ← APP_SPEC + Seed Quelle (behalten bis AP-14e/f/g)
├── Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md  ← APP_SPEC Quelle (behalten bis AP-14g)
├── UX-Synthese-LLM-Bewertungen-Iteration-1.md  ← APP_SPEC §UX Quelle (behalten bis AP-14g)
│
│   # WISSEN SICHERN — neu anlegen (AP-14c)
│
├── APP_FABRIK_ANAMNESE_MATERIAL.md     ← aus CLAUDE.md + Abschlussdoku (AP-14c)
├── DEV_QA_NOTIZEN.md                   ← Regressions-Checkliste aus CLAUDE.md (AP-14c)
│
│   # CLAUDE.md — löschen nach AP-14c
│
├── CLAUDE.md                           ← löschen NACH Extraktion (AP-14c, dann Alberts OK)
│
│   # ALTMATERIAL — nach AP-14d verschieben
│
└── Altmaterial/
    ├── dashboard-regulatorikXIX.html       ← bereits verschoben (✅)
    ├── Bauprompt_ETF-Wahlurnen-Super-App_V3_Obsidian.md
    ├── Bauprompt_ETF-Wahlurnen-Super-App_V4_Obsidian.md
    ├── Chat-GPT_Super-App_Bauprompt_ETF-Wahlurnen-Rechner.md
    ├── Perplexity_super-app-prompt.md
    ├── UX-Feedback ChatGPT auf erste Iteration.md
    ├── UX-Feedback Gemini auf erste Iteration.md
    └── UX-Feedback Perplexity auf erste Iteration.md
```

---

## Risiken / Driftquellen

- `CLAUDE.md` ist eine aktive Driftquelle: Solange sie im Ordner liegt, kann Claude versehentlich
  den alten Ad-hoc-Workflow (direktes HTML-Editieren ohne Gate) reaktivieren.
  → Priorität AP-14c: Extraktion und Löschung.

- Der Master-Bauprompt enthält 539 Zeilen technische Beschreibung, die teilweise vom
  gewachsenen HTML-Prototyp abweichen kann. Kein Versionstracking vorhanden.
  → Bei APP_SPEC-Anamnese (AP-14g) beide gegeneinander abgleichen.

- Die UX-Synthese enthält eine ungeklärte Warnung: "Vertrauens-Risiko durch politisches Framing".
  ChatGPT hat das als einziges LLM angemerkt. Wenn die App Steuern mit Parteipolitik verknüpft,
  riskiert sie Polarisierung statt Aufklärung.
  → In AP-14e bei MINI_SPEC-Neufassung als explizites Nicht-Ziel adressieren.

- Die MINI_SPEC-Lage (vollständige Neufassung nötig) bedeutet: Steuerungsblock fehlt aktuell.
  Das blockiert den App-Fabrik-Standard (Steuerungsblock als Pflichtartefakt vor APP_SPEC).
  → AP-14e muss vor AP-14g kommen.

- Bauprompt V4 (32 KB, größte Datei) kann Inhalte enthalten, die im Master nicht aufgegangen sind.
  Vor Verschieben nach Altmaterial kurz prüfen (kann Teil von AP-14d sein).

---

## Folge-AP-Plan (Analyse 9)

| AP | Ziel | Erlaubte Änderungen | Nicht-Ziele | Erfolgskriterium |
|---|---|---|---|---|
| AP-14c | Wissenssicherung aus CLAUDE.md und Kernmaterial | Neue Dateien: APP_FABRIK_ANAMNESE_MATERIAL.md + DEV_QA_NOTIZEN.md; Löschen: CLAUDE.md (nach OK) | Keine MINI_SPEC, APP_SPEC, kein Move | CLAUDE.md-Inhalte in 2 stabilen Zieldateien; CLAUDE.md danach löschreif |
| AP-14d | Ordnerbereinigung — Altmaterial-Kandidaten verschieben | 7 Dateien nach Altmaterial/ (V3, V4, ChatGPT-Prompt, Perplexity-Prompt, 3× UX-Feedback) | Keine MINI_SPEC, keine APP_SPEC, kein Code | Ordner enthält nur noch Kern-6-Dateien + Altmaterial/ |
| AP-14e | MINI_SPEC-Neufassung mit Steuerungsblock | MINI_SPEC_FROM_HAUPTDOKUMENT.md vollständig neu | Kein APP_SPEC, kein Seed, kein HTML | Steuerungsblock vollständig (Rolle, Barriere, Zielzustand, Nicht-Ziele, LLM-Score); Politisches-Framing-Risiko adressiert |
| AP-14f | Seed-Entwurf für APP_STEUERUNGSBLOCK_SEEDS | Seed-Eintrag in APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md | Kein APP_SPEC, kein HTML | Seed-Eintrag vollständig; bereit für mechanisches Einfügen in MINI_SPEC |
| AP-14g | APP_SPEC-Anamnese und Entwurf | Neue Datei APP_SPEC.md (Entwurf) | Kein HTML-Code, keine Umsetzung | APP_SPEC V0.1 auf Basis von Master-Prompt + Abschlussdoku + UX-Synthese; Rechenmodell, Szenarien, UX-Flow drin |

---

## Git-Status am Ende

Erwartet nach diesem AP:
```
 M .claude/learning/session-log.md
?? docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md
```

---

## Geänderte Dateien

```
docs/steering/patches/AP-14b_regulatorik-dashboard_datei-triage-app-fabrik-neusortierungsplan_Ergebnis.md  ← neu
```

---

## Nicht-Ziel-Nachweis

```
Dateien verschoben:         nein
Dateien gelöscht:           nein
Ordner angelegt:            nein
MINI_SPEC geändert:         nein
APP_SPEC erstellt/geändert: nein
Seed geändert:              nein
HTML geändert:              nein
CLAUDE.md geändert/gelöscht: nein
Altmaterial analysiert:     nein
Commit ausgeführt:          nein
Abschlussritual:            nicht ausgeführt (folgt auf Alberts OK)
```
