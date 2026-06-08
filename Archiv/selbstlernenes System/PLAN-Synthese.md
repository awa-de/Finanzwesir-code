# Plan: Selbstlernendes System — Synthese + Integration
Stand: 2026-05-05 | Status: HRO-Explizitätsprüfung abgeschlossen, Implementierung ausstehend

---

## Kontext

Drei LLMs (Gemini, ChatGPT, Perplexity) haben Konzepte für ein selbstlernendes System
entworfen. Das Bestehende hat alle richtigen Teile — aber keine Pipeline, die sie verbindet.
Wenn Albert Claude korrigiert, landet die Korrektur heute mit ~50% Wahrscheinlichkeit
im Gedächtnis. Der Quantensprung ist die geschlossene Lernschleife: jede Korrektur wird
eingefangen, klassifiziert, und entweder dauerhaft promoted oder bewusst verworfen.

---

## Meine Meinung zu den drei Systemen

### Gemini — klarste Metapher, schwächste Mechanik

Das 3-Schichten-Modell (Log → Muster → Regel) ist das beste mentale Modell.
Als Denkmodell wertvoll, als Bauplan unfertig: der Skill `!log_observation` ist nicht
implementiert, Trigger sind vage, Destillations-Heuristik nicht definiert.

### ChatGPT — ausgefeilteste Mechanik, höchster Overhead

Incident-Metadaten (Type, Surface, Impact, Root-cause), explizites Promotion-Board
mit Risiko-Bewertung, Multi-Target-Routing (CLAUDE.md / MEMORY.md / Skills / Commands /
Hooks), "Kompression statt Akkumulation" als Prinzip.
Aber: zu komplex für ein Einpersonen-Projekt. 5 neue Dateien, 5 neue Commands,
Quartalsreviews — viel Verwaltung, wenig Inhalt.

### Perplexity — beste UX, schwächste Tiefe

4-Tag-System ([FRICTION], [WIN], [PREF], [QUESTION]) ist sofort verständlich und
hat minimale Einstiegshürde. `/reflect` als einziger Trigger. Aber die Tiefe fehlt.

### Fazit: Keines davon eins-zu-eins nehmen

---

## Die eigentliche Diagnose: Was fehlt?

Das bestehende System hat alle richtigen Teile — aber keine Pipeline zwischen ihnen.

Wenn Albert Claude korrigiert, landet die Korrektur heute mit ~50% Wahrscheinlichkeit
im Gedächtnis. Manchmal schreibt Claude sie in eine memory-Datei. Oft nicht.
Es gibt keinen Mechanismus, der systematisch Korrekturen einfängt, klassifiziert
und auf Promotion prüft.

**Der Quantensprung ist nicht mehr Struktur — es ist die geschlossene Schleife.**

Jede Korrektur wird eingefangen → klassifiziert → bewertet → entweder promoted
oder bewusst verworfen. Nichts verschwindet unbemerkt.

---

## Kollisions-Analyse: Bestandssystem vs. neue Konzepte

| Konzept-Element | Bestand | Bewertung |
|---|---|---|
| MEMORY.md-Zieldateien | feedback_*.md, project_*.md — bereits vorhanden | Verwenden, nicht ersetzen |
| Promotion-Gate | CLAUDE.md §8 — bereits vorhanden, 7 Bedingungen | Verwenden, schützt vor Bloat |
| Session-Endpunkt | abschluss-ritual — vorhanden, Schritt 3 = Memory | Einhängen, nicht neu bauen |
| Wöchentlicher Review | kassensturz — vorhanden | Erweitern um Lern-Status |
| Incident-Log | ATTEMPT-LOG.json — nur für BLOCKED | Ergänzen, nicht ersetzen |
| Pattern-Clustering | Fehlt vollständig | Neu bauen (minimal) |
| Distillations-Command | Fehlt vollständig | Neu bauen |
| Session-Logging | Fehlt vollständig | Neu bauen (Perplexity-Stil) |

**Was NICHT aufpfropfen:**
- Kein Promotion-Board (§8 CLAUDE.md ist bereits der Gate)
- Keine reichen Incident-Metadaten pro Eintrag (zu komplex für 1 Person)
- Keine neuen Zieldateien (bestehende feedback_*.md verwenden)
- Kein Eingriff in Layer 1, ATTEMPT-LOG, Gate-System

---

## Kritik-Härtung

Der Plan wurde durch vier unabhängige Denk-Werkzeuge geprüft.
Quellen: Weick/Sutcliffe *Managing the Unexpected* (HRO), Gawande *The Checklist Manifesto*,
Munger *Poor Charlie's Almanack*, Kahneman *Thinking Fast and Slow*,
Hollnagel *ETTO Principle*, NASA ASRS (Aviation Safety Reporting System).

### 1. Mainstream-Ansicht

**Befund:** Der Plan folgt PDCA und Lean-Startup-Loop. Gawande-Kriterien: kurze Zykluszeit ✅,
niedriger Aufwand ✅, menschliche Kontrolle ✅, Messbarkeit ⚠️.
Offenes Problem: [OK]-Metrik ist self-reported → anfällig für Schwellenabsenkung
(Kahneman: Availability Heuristic).

**Antwort:** [OK]-Freitext ersetzt durch Challenge-Response (2 explizite j/n-Fragen).
[OK] ist eine aktive Bestätigung, kein passives Leerzeichen.

### 2. Via Negativa / Munger — "Invert, always invert"

Nicht "Wie bringen wir das System zum Laufen?" sondern "Was bringt es sicher zum Scheitern?"

**Versagensweg 1 — Circulus vitiosus:** Das System soll Fehler im Abschluss-Ritual einfangen —
durch einen neuen Schritt im Abschluss-Ritual. Wenn das Ritual unzuverlässig ausgeführt wird
(das ist die Diagnose!), produziert der neue Schritt keine Daten. Lernschleife versagt genau dann wenn sie gebraucht wird.
→ **Antwort:** session-log = Schritt 0 (vor allem anderen). Auch ein abgebrochenes Ritual
hinterlässt einen Eintrag. Soforteintrag vor Analyse (HRO-Prinzip).

**Versagensweg 2 — Monday-Lock:** /distill läuft montags automatisch. Alberts erratischer Rhythmus
macht einen Kalender-Trigger wertlos. Lange Pause → 20+ Einträge → /distill wird Wochenend-Reinigung.
→ **Antwort:** Kalender-Trigger gestrichen. Zwei Schwellen: ≥5 Einträge ODER >14 Tage
→ /start empfiehlt /distill. Albert entscheidet wann, nicht der Kalender.

**Versagensweg 3 — Chilling:** Claude schreibt [OK] wenn nichts war — oder nichts weil
"nicht der Rede wert". Albert schaut nach Wochen in eine leere Datei.
→ **Antwort:** /start prüft Lücken (HRO: "fehlendes Log = Anomalie"). Abgeschlossenes AP
ohne Eintrag: Claude muss erklären. Kein stilles Überspringen.

**Versagensweg 4 — Graveyard:** patterns.md sammelt "observing"- und "retired"-Einträge ohne
Verfallsdatum. Nach 18 Monaten: unlesbarer Friedhof.
→ **Antwort:** Automatische Hygiene in /distill: "observing" >90 Tage → patterns-archiv.md.
"retired" max. 15 behalten, älteste fallen raus (FIFO).

**Versagensweg 5 — [OK]-Metrik lügt:** Zielwert 100% [OK] kann durch Schwellenabsenkung
erreicht werden. Metrik misst dann Claudes Urteilsschwelle, nicht die Qualität.
→ **Antwort:** Challenge-Response: "Gab es eine Korrektur?" j/n + "Gab es eine Überraschung?" j/n.
Beide nein → [OK]. Zwei explizite Fragen erzwingen aktive Prüfung (HRO: Luftfahrt-Verfahren).

**Munger-Bilanz: alle 5 Versagenswege geschlossen ✅**

### 3. Occam's Razor

**Befund:** Die einfachste Erklärung für das Kernproblem ist H2: Schritt 3 des Abschluss-Rituals
ist zu abstrakt — Claude urteilt selbst was relevant ist und trifft das ~50% falsch.
Einfachste Lösung: Schritt 3 präzisieren, 4 konkrete Fragen. Kein session-log, kein patterns.md.

**Antwort:** Schritt 3 allein löst nur das Capture-Problem. patterns.md löst das Pattern-Problem —
das ist ein anderes Problem. Jede Komponente löst etwas das keine andere löst
(→ Occam-Tabelle in "Warum alle 7 Komponenten?").

**Occam-Bilanz: Pipeline gerechtfertigt ✅**

### 4. Devil's Advocate

**Gegenargument 1: "System lernt nicht — es protokolliert"**
Claude bekommt keine echte Lernfähigkeit. "Quantensprung" ist unzutreffend.
→ **Alberts Antwort:** Quantensprung = Aufzinsung von 1000 kleinen Verbesserungen.
Evolutionsstufe 1: protokollieren und Muster erkennen. In ~4 Monaten: Agentenlogik.
**Bewusst akzeptiert. ✅**

**Gegenargument 2: /uebergabe ist Scope-Creep**
Kern-Plan noch nicht gelöst als /uebergabe hinzukam. Zwei Probleme vermischt.
→ **Entscheidung:** /uebergabe löst ein eigenständiges Problem (Multi-Thread-Kontinuität).
Der Breadcrumb verbindet es mit dem Lern-Loop. **Eigenständiger Mehrwert. ✅**

**Gegenargument 3: Pattern-Schwelle ≥2 zu hoch für kleines Projekt**
Bei 2–4 APs pro Woche und erratischem Rhythmus braucht ein Muster Monate bis ≥2 Belege. System stumm.
→ **Antwort:** Gestufte Schwelle: ≥1 Beleg bei High-Impact (Tabu-Zone, Gate übersprungen,
Richtungskorrektur, Regression) → sofort Kandidat. ≥2 bei Normal-Impact. **Gelöst. ✅**

**Gegenargument 4: "Erweiterung statt Synthese"**
Kein echtes Kind aus zwei Eltern — alter Parent mit Accessories.
→ **Alberts Entscheidung:** Bewusste Designentscheidung. Erweiterung ist robuster:
wenn der Lern-Loop aufgegeben wird, läuft das Basissystem weiter.
Synthese kommt in Stufe 2 (Agentenlogik). **Bewusst akzeptiert. ✅**

### Schlussbilanz — alle Kritikpunkte

| Kritiker | Punkt | Status |
|---|---|---|
| Mainstream | [OK]-Metrik self-reported, anfällig | ✅ Challenge-Response |
| Munger | Circulus vitiosus | ✅ Schritt 0 (zuerst) |
| Munger | Monday-Lock | ✅ Schwellen-Trigger |
| Munger | Chilling / leere Datei | ✅ Lücken-Alarm in /start |
| Munger | Graveyard patterns.md | ✅ Auto-Hygiene in /distill |
| Munger | [OK]-Bias | ✅ Challenge-Response |
| Occam | Pipeline nicht gerechtfertigt | ✅ Occam-Tabelle im Plan |
| Devil's Advocate | Protokolliert, lernt nicht | ✅ Akzeptiert als Stufe 1 |
| Devil's Advocate | /uebergabe Scope-Creep | ✅ Eigenständiger Mehrwert |
| Devil's Advocate | Pattern-Schwelle zu hoch | ✅ Gestufte Schwelle |
| Devil's Advocate | Erweiterung statt Synthese | ✅ Bewusste Entscheidung |

**Kein offener Punkt. Der Plan ist kritik-gehärtet.**

### HRO-Kontext (Lastabwurf-Recherche)

Aus der Kritik-Runde entstand die Frage: Wie regeln Branchen die nie in einen unkontrollierten
Zustand kommen dürfen den Lastabwurf? Recherchierte Industrien: Stromnetz (priorisierter Lastabwurf),
Luftfahrt (MEL, ASRS), Kernkraft (EOP), Software (Circuit Breaker), Medizin (START-Triage),
ETTO-Prinzip (Hollnagel).

Gemeinsames Prinzip: Entscheidungen im Voraus — nicht in der Krise.
Modus immer benannt — nie stummes Überspringen. Invarianten sind hart — nicht fuzzy.

Ergebnis: Das Lastabwurf-System mit 4 benannten Modi (N/R/M/A), 5 Invarianten
und Prioritätsgruppen 1–5 (→ Abschnitt "Lastabwurf-System").

---

## Designentscheidungen (Alberts Antworten)

| Frage | Entscheidung |
|---|---|
| Log-Trigger | Nur im Abschluss-Ritual (kein mid-session Interrupt) |
| Distill-Rhythmus | Schwellen-basiert (≥5 Einträge ODER >14 Tage) — kein Kalender, /start empfiehlt |
| Ablehnungen | Status "retired" in patterns.md — nie wieder vorschlagen |
| Retroaktiv | Bestehende feedback_*.md gelten als "already promoted" |
| Logbuch-Pflicht | Jedes AP bekommt einen Eintrag — auch "Keine Vorkommnisse" ist Pflicht |
| Übergabeprompt | Delta-Prinzip: /start liefert Basis, Übergabeprompt nur das AP-spezifische Delta |
| Log-Position | session-log = Schritt 0 (vor allem anderen) — HRO-Prinzip: Soforteintrag vor Analyse |
| Distill-Trigger | Daten-Schwelle (≥5 Einträge) ODER Zeit-Schwelle (>14 Tage) — kein Kalender |
| Lücken-Alarm | AP-ID-Abgleich: AP-ID in BACKLOG-ARCHIV.md ohne session-log-Eintrag = Anomalie |
| HRO-Sprache | Einträge beschreibend, nicht evaluativ — Signal, kein Blame |
| [OK]-Format | Challenge-Response: 2 explizite Fragen j/n — kein Freitext-Urteil |
| patterns-Hygiene | Hygiene-Vorschlag in /distill — erst nach Alberts Bestätigung archivieren |
| Tag-Grenzziehung | Explizite Trigger-Tabelle (NASA ASRS) — kein Claude-Ermessen beim Tagging |
| [PREF]-Routing | pref-pending in patterns.md — Promotion erst nach Alberts j bei /distill |
| Muster-Clustering | 2-Schritt: Claude schlägt vor, Albert bestätigt j/n — kein stilles Clustering |
| Lastabwurf-Trigger | Verhaltens-Proxy (beobachtbar) statt Kontext-%-Schätzung |
| MODUS M + /uebergabe | Explizit gekoppelt — MODUS M deklarieren = /uebergabe anbieten |
| Abbruch-Format | Minimal-Eintrag (1 Zeile) definiert — Schritt 0 gilt als erfüllt sobald Zeile existiert |

---

## Synthese: Was von jedem System übernommen wird

| Quelle | Übernommenes Element |
|---|---|
| Gemini | Mentales Modell: Log → Muster → Regel |
| ChatGPT | patterns.md mit Status + Root-cause + Ziel-Routing |
| Perplexity | 4-Tag-System: [FRICTION], [WIN], [PREF], [QUESTION] |

---

## Empfohlene Architektur: 4 neue Komponenten, 3 Erweiterungen

### Neu bauen

**1. `.claude/learning/session-log.md`** (Perplexity-Stil, ephemer)

Wird im Abschluss-Ritual befüllt. Wird nach `/distill` geleert.

Beispiel:

    # Session-Log — Finanzwesir 2.0
    Wird geleert nach /distill. Einträge: [FRICTION] [WIN] [PREF] [QUESTION] [OK]

    ## 2026-05-05 – AP-22 Zero-Line
    - [FRICTION] Claude hat Schritt 2b im Abschluss-Ritual übersprungen → Scope-Fund verloren
    - [WIN] Light-Gate reichte aus — keine Regression, kein Rollback nötig
    - [PREF] Albert will keine Terminal-Kommandos in der Commit-Message

    ## 2026-05-05 – AP-6c Touch-Tooltip
    - [OK] Keine Vorkommnisse

**Logbuch-Prinzip:** Jedes AP bekommt einen Eintrag — Pflicht, kein Ermessen.
Wenn alles glatt lief: [OK] Keine Vorkommnisse.
Ziel: X von N APs ohne Vorkommnisse → messbare Qualitätsrate pro Woche.
Zielwert: 100% — wie ein Kapitän, der am liebsten "Ruhige Fahrt" ins Logbuch schreibt.

**Abbruch-Format:** Wenn das Abschluss-Ritual unterbrochen wird, gilt Schritt 0 als erfüllt
sobald eine Zeile existiert (Luftfahrt-Prinzip: abgebrochener Start → trotzdem Write-Up):

    ## YYYY-MM-DD – [AP-ID] (Abbruch bei Schritt [N])
    - [OK] Abbruch ohne Vorkommnis  /  [FRICTION] Grund: ...

**2. `.claude/learning/patterns.md`** (ChatGPT-Stil, persistent bis promoted/retired)

Geclusterte Muster aus mehreren session-log-Einträgen. Promotion-Kandidaten.

Beispiel:

    # Patterns — Finanzwesir 2.0
    Muster mit ≥2 Belegen werden Kandidaten. Nur Alberts OK → Promotion.

    ## Muster: Scope-Check 2b wird übersprungen
    - Belege: 2026-04-28, 2026-05-05
    - Auslöser-Kriterium: AP dauert < 30 Minuten, kein Full-Gate erforderlich
    - Root cause: Claude vergisst 2b wenn AP kurz war
    - Vorschlag: CLAUDE.md §3 Scope-Check als eigene Zeile mit Checkbox
    - Ziel: CLAUDE.md (§3) | Risiko: low | Status: candidate

    ## Präferenz: [Beispiel pref-pending]
    - Status: pref-pending | Albert bestätigt bei /distill

    ## Muster: [Beispiel abgelehnt]
    - Status: retired | Grund: Einzelfall, nicht universell

**3. Skill `/distill`**

Trigger: manuell auf Alberts Wunsch — oder von /start empfohlen wenn Schwelle erreicht.
(Nicht kalenderbasiert — passt zu erratischem Arbeitsrhythmus.)

Ablauf:
1. session-log.md lesen
2. Einträge nach Tag gruppieren
   - [FRICTION] → Muster-Kandidaten
   - [WIN] → Bestätigung dass etwas gut läuft
   - [PREF] → Status "pref-pending" in patterns.md (kein direktes Promote —
     Albert bestätigt bei /distill)
   - [QUESTION] → offene Frage in patterns.md notieren
3. Muster-Clustering — zwei explizite Schritte (Toyota Andon-Prinzip: kein stilles Clustering):
   a. Claude zeigt Gruppierungsvorschlag:
      „Diese [N] Einträge beschreiben vermutlich dasselbe Muster: [Beschreibung].
      Gleiche Ursache?" → Albert: j / n / reformulieren
   b. Erst nach Alberts j → Kandidat in patterns.md. Kein stilles Clustering ohne Bestätigung.
   Gestufte Schwelle:
   - ≥1 Beleg bei High-Impact: Tabu-Zone berührt, Gate explizit übersprungen,
     Albert musste Richtung korrigieren, Regression erzeugt → sofort Kandidat (Vorschlag)
   - ≥2 Belege bei Normal-Impact: Stil, Präferenz, Prozessdetail → erst bei Wiederholung
4. patterns.md: neue Kandidaten hinzufügen, bestehende Kandidaten anzeigen
5. Für jeden Kandidaten: Albert entscheidet mit j / n / anpassen
   - j → Promotion zur Zieldatei
   - n → Status "retired" + Ablehnungsgrund
   - anpassen → Claude reformuliert, Albert bestätigt
6. Einzelne [FRICTION]-Einträge (kein zweiter Beleg) → Status "observing" in patterns.md
7. Hygiene-Vorschlag (kein stilles Archivieren — Luftfahrt: Logs bleiben, nichts verschwindet):
   Claude zeigt am Ende einen Hygiene-Block:

   "Hygiene-Vorschlag:
    Archivieren (>90 Tage observing): [Liste oder 'keine']
    Aus retired entfernen (FIFO, >15): [Liste oder 'keine']
    → Bestätigen mit 'j' oder überspringen"

   Erst nach Alberts 'j' → Verschieben nach patterns-archiv.md.
   Kein Eintrag wird unilateral gelöscht.
8. session-log.md leeren, patterns.md Stand-Datum aktualisieren

**Einmalschritt bei erster Ausführung (Retroaktiv):**
patterns.md erhält Abschnitt "Bereits promoted (Bestand)":
- feedback_arbeitsweise.md → promoted
- feedback_sprache_kein_denglisch.md → promoted

**4. Skill `/uebergabe`** (neu — ersetzt freihändigen Übergabeprompt)

Trigger:
- Albert sagt: "Übergabeprompt", "Übergabe", "neuer Thread", "wir werden voll"
- Claude deklariert MODUS M → /uebergabe wird automatisch mitangeboten
MODUS M und /uebergabe sind nicht trennbar — MODUS M ohne /uebergabe-Angebot ist unvollständig.

**Delta-Prinzip:** `/start` lädt bereits PROJECT-STATUS.md, NAVIGATION.md, BACKLOG.md,
ATTEMPT-LOG. Der Übergabeprompt wiederholt das NICHT — er liefert nur das AP-spezifische
Delta das `/start` nicht kennen kann.

Claude macht automatisch zwei Dinge gleichzeitig:
1. Breadcrumb in session-log.md schreiben (unsichtbar für Albert)
2. Übergabeprompt ausgeben (Albert kopiert ihn in den nächsten Thread)

Format des Übergabeprompts (~10 Zeilen, nicht mehr):

    /start

    Fortführung AP-20: Mixed-Rhythm CV-Heuristik

    Letzter Stand:
    - T5→T3 implementiert, scenario_3 läuft durch
    - T6→T7-Übergang noch offen

    Nächster Schritt:
    - FwSmartScales.js ab Zeile 142, detectRhythm() für T6→T7 erweitern

    Mündliche Entscheidungen (noch nicht in Dateien):
    - Schwellenwert: 180 Tage (Albert bestätigt)

    Laufende Hypothese:
    - Grenzfall bei exakt 180 Tagen ist das Problem

Enthält NICHT (weil /start das schon lädt):
AP-Beschreibung, Projektstruktur, Regeln, Routing, Dateipfade.

Session-Log-Breadcrumb (gleichzeitig, automatisch):

    ## 2026-05-06 – AP-20 (Übergabe, läuft noch)
    - [FRICTION] Interim: ... (falls vorhanden)
    - [WIN] Interim: ... (falls vorhanden)

### Erweitern (bestehende Skills)

**5. Abschluss-Ritual — session-log wird Schritt 0 (zuerst)**

Nicht Schritt 3b nach Memory-Update — sondern der allererste Schritt, vor allem anderen.
HRO-Prinzip: Soforteintrag vor Analyse. Auch ein abgebrochenes Ritual hinterlässt einen Eintrag.

    Schritt 0. Session-Log befüllen — PFLICHT, ZUERST, kein Ermessen
    Eintrag schreiben in .claude/learning/session-log.md mit Datum + AP-Titel als Header.
    Jetzt schreiben, nicht bewerten — /distill bewertet später.

    Challenge-Response (Kernkraftwerk-Prinzip):
    "Gab es eine Korrektur oder Abweichung vom Plan?"   → j/n
    "Gab es eine Überraschung oder neue Erkenntnis?"    → j/n

    Beide nein:
    - [OK] Keine Vorkommnisse

    Mindestens eines ja — Tag nach Kriterium wählen, kein Freitext-Urteil:

    Tag-Kriterien (NASA ASRS-Prinzip — Trigger, nicht Einschätzung):
    [FRICTION]  Albert hat eine Richtung korrigiert / ein Schritt wurde nachgeholt /
                ein Missverständnis trat auf
    [WIN]       Etwas lief schneller oder sicherer als erwartet — messbar oder von Albert bestätigt
    [PREF]      Albert hat eine Formulierung, Reihenfolge oder Darstellung explizit bevorzugt
    [QUESTION]  Claude hat eine Annahme getroffen ohne Alberts Bestätigung

    Sprach-Prinzip: beschreibend, nicht evaluativ (HRO: Signal, kein Blame)
    Richtig:   "[FRICTION] Gate-Schritt 7 übersprungen → manuell nachgeholt"
    Falsch:    "[FRICTION] Claude hat versagt"

    Kein AP ohne Eintrag. Fehlendes Log = Anomalie (HRO-Prinzip).
    Abbruch-Format (wenn Ritual unterbrochen — 1 Zeile genügt):
    ## YYYY-MM-DD – [AP-ID] (Abbruch bei Schritt [N])
    - [OK] Abbruch ohne Vorkommnis  /  [FRICTION] Grund: ...

**6. `/start` — neuer Schritt 3c**

Nach Attempt-Log-Check:

    3c. Learning-Pipeline prüfen
    session-log.md UND patterns.md lesen.

    Lücken-Alarm (HRO: fehlendes Log = Anomalie):
    Mechanismus (AP-ID-Abgleich — kein Datum-Vergleich, keine Schätzung):
    1. BACKLOG-ARCHIV.md: welche AP-IDs seit letztem session-log-Eintrag hinzugefügt?
    2. session-log.md: gibt es einen Eintrag mit "## YYYY-MM-DD – [AP-ID]"?
    3. AP-ID in Archiv ohne passenden Eintrag = Lücke
    → "Kein session-log-Eintrag für [AP-ID]. Abschluss-Ritual vollständig ausgeführt?"

    Distill-Empfehlung (Schwellen-basiert, kein Kalender):
    session-log ≥ 5 Einträge?   → "Distill empfohlen (Daten-Schwelle erreicht)"
    Letzter Distill > 14 Tage?  → "Distill überfällig (Zeit-Schwelle überschritten)"
    Pattern-Kandidaten offen?   → "X Muster warten auf Promotion"

    SESSION-START-Zeile:
    "SESSION-START ✓ | Fokus: X | APs: Y | Log: Z Einträge | BLOCKED: keine"

**7. Kassensturz — neuer Abschnitt am Ende**

Kassensturz zeigt Status, löst /distill NICHT automatisch aus (zu fragil bei erratischem Rhythmus).
Distill-Trigger liegt bei /start (Schwellen-basiert).

    ## Lern-Loop
    - Session-Log: X Einträge seit letztem Distill (YYYY-MM-DD)
    - Qualitätsrate: X von N APs ohne Vorkommnisse (Ziel: 100%)
    - Pattern-Kandidaten: X offen | "observing": X | "retired": X
    - Letzte Promotion: YYYY-MM-DD (Muster: "...")
    - Zeit seit letztem Distill: X Tage

    → Empfehlung wenn Schwelle erreicht: "/distill ausführen?" (Albert entscheidet)

---

## Warum brauchen wir alle 7 Komponenten? (Occam-Rechtfertigung)

Occam's Razor verlangt: keine Komponente ohne eigenen, nicht-redundanten Nutzen.

| Komponente | Löst welches Problem | Ohne diese Komponente |
|---|---|---|
| session-log.md + Schritt 0 | Korrekturen gehen verloren (50%-Problem) | Kern-Diagnose ungelöst |
| Challenge-Response [OK] | Freitext-Urteil ist unzuverlässig | [OK]-Metrik bedeutungslos |
| patterns.md | Muster über Sessions sichtbar machen | Jede Session lernt neu von vorn |
| /distill | Muster in Regeln übersetzen | patterns.md wächst ohne Konsequenz |
| /uebergabe | Multi-Thread-Kontinuität ohne Gedächtnisverlust | Friktionen aus Thread 1 unsichtbar in Thread 3 |
| /start-Erweiterung | Lücken-Alarm + Distill-Empfehlung sichtbar machen | System läuft still leer |
| Kassensturz-Erweiterung | Qualitätsrate messbar machen | Kein Trend erkennbar |

**Occam-Urteil:** Jede Komponente löst ein Problem das keine andere löst.
Die verbesserte Checkliste (Challenge-Response) löst das Capture-Problem.
patterns.md löst das Pattern-Problem — das ist ein anderes Problem.
Beide sind nötig. Keine ist redundant.

---

## Routing der Promotions

| Typ | Zieldatei |
|---|---|
| Präferenz / Kommunikation / Arbeitsweise | memory/feedback_*.md (neue Datei je Thema) |
| Projektfakt / Entscheidung | memory/project_*.md |
| Universelle Verhaltensregel | CLAUDE.md via §8-Gate (alle 7 Bedingungen!) |
| Wiederholbarer Workflow | .claude/skills/[name]/SKILL.md |

---

## Lastabwurf-System: Claudes abgesicherter Modus

Quelle: Stromnetz (priorisierter Lastabwurf), Luftfahrt (MEL), Circuit Breaker Pattern,
ETTO-Prinzip (Hollnagel). Gemeinsames Prinzip: Entscheidungen im Voraus, Modus immer
benannt, niemals stummes Überspringen.

### Invarianten — niemals opferbar (MEL "airworthiness")

Egal wie eng der Kontext, egal wie komplex die Situation:
1. Tabu-Zonen nicht berühren
2. Gate nicht vollständig überspringen (Light-Gate als absolutes Minimum)
3. Schweigen ≠ OK bei destruktiven Aktionen
4. session-log Schritt 0 — max. 30 Sekunden, 1–2 Zeilen
5. Commit-Message korrekt ausgeben

### Prioritätsgruppen — Abwurfreihenfolge

| Gruppe | Was wird abgeworfen | Ab welchem Modus |
|---|---|---|
| 5 — zuerst | Kassensturz-Lernabschnitt, patterns.md-Lesen bei /start | MODUS R |
| 4 | Lücken-Alarm, Scope-Check 2b bei minimalen APs | MODUS M |
| 3 | PROJECT-STATUS.md Update, WORKING-FEATURES-Check | MODUS M |
| 2 | MEMORY-Update (auf nächste Session verschieben) | MODUS A |
| 1 — niemals | Die fünf Invarianten | — |

### Die vier benannten Modi

```
MODUS N — NORMALBETRIEB
Alle Schichten aktiv. Standard.

MODUS R — REDUZIERT
Trigger (eines davon — beobachtbar, nicht geschätzt):
  - Full-Gate: mehr als 3 Dateien betroffen
  - AP läuft seit mehr als einem Faden (Übergabe war bereits nötig)
  - Claude kann frühere Details nicht reproduzieren (Kontext-Verlust erkennbar)
Abgeworfen: Gruppe 5.
Ausgabe: "[MODUS R] Kassensturz-Lernabschnitt und patterns.md-Lesen entfallen."

MODUS M — MINIMAL
Trigger (eines davon):
  - /uebergabe wurde bereits einmal in diesem AP ausgeführt
  - Claude kann den eigenen Schritt-0-Eintrag nicht mehr vollständig reproduzieren
Abgeworfen: Gruppen 4 + 5.
Ausgabe: "[MODUS M] Nur Invarianten aktiv — /uebergabe wird jetzt ausgeführt."
Kopplung: MODUS M deklarieren = /uebergabe anbieten. Immer beides, nie eines ohne das andere.

MODUS A — ABGESICHERT
Trigger: Widerspruch zwischen Regeln / Konfusion ob Tabu-Zone betroffen /
         unklar welche Rule gilt.
Abgeworfen: alle Schicht-2-Regeln.
Ausgabe: "[MODUS A] Ich stoppe. Ich beschreibe was ich weiß und was nicht.
         Bitte explizite Anweisung geben."
Kein Code ohne Alberts explizite Freigabe aus MODUS A.
```

### Wiederherstellung

Nach /uebergabe oder Alberts "weiter normal":
`[MODUS N] Normalbetrieb wiederhergestellt.`

### Das Eidechsen-Prinzip

Schicht 2 (Lernregeln) = Schwanz — opferbar, wächst nach.
Schicht 1 (Strukturregeln) + eigentliche Arbeit = Eidechse — niemals.
Geopferte Lernschleifen werden beim nächsten Abschluss-Ritual nachgeholt.
Nichts geht verloren — es wird verschoben.

---



| Schritt | Datei | Art |
|---|---|---|
| 1 | `.claude/learning/session-log.md` | Neu (leere Vorlage) |
| 2 | `.claude/learning/patterns.md` | Neu (Vorlage + Bestandsliste) |
| 3 | `.claude/skills/abschluss-ritual/SKILL.md` | Erweitern (Schritt 3b, Logbuch-Pflicht) |
| 4 | `/start`-Sequenz | Erweitern (Schritt 3c) |
| 5 | `.claude/skills/kassensturz/SKILL.md` | Erweitern (Lern-Loop-Abschnitt) |
| 6 | `.claude/skills/distill/SKILL.md` | Neu (vollständiger Skill) |
| 7 | `.claude/skills/uebergabe/SKILL.md` | Neu (Delta-Übergabeprompt + Breadcrumb) |

**Tabu-Check:**
- Kein Eingriff in Layer 1
- Keine Änderung an CLAUDE.md §8 (Gate bleibt)
- Kein Eingriff in ATTEMPT-LOG.json (andere Funktion)
- 7 Dateien total, kein Architektureingriff

---

## Verifikation (nach Implementierung)

**Pilot-Test 1 — Logging:**
AP abschließen → Abschluss-Ritual → Erscheint Schritt 3b?
session-log.md öffnen → Eintrag vorhanden? Format korrekt?

**Pilot-Test 2 — Start-Integration:**
Nächsten `/start` ausführen → prüft er patterns.md?
SESSION-START-Zeile: erscheint "Log: X Einträge"?

**Pilot-Test 3 — Distill:**
Montags Kassensturz → erscheint Lern-Loop-Abschnitt?
`/distill` ausführen → Kandidaten korrekt erkannt?
Einen Kandidaten mit "j" bestätigen → Eintrag in feedback_*.md korrekt?
Einen Kandidaten mit "n" ablehnen → Status "retired" in patterns.md gesetzt?

**Pilot-Test 4 — Logbuch-Pflicht:**
AP abschließen, kein Vorkommnis → Abschluss-Ritual → erscheint "[OK] Keine Vorkommnisse"?
Nächsten Montag Kassensturz → zeigt er "X von N APs ohne Vorkommnisse"?

**Pilot-Test 5 — Übergabeprompt:**
Übergabeprompt anfordern → erscheint strukturierter Delta-Prompt (~10 Zeilen)?
session-log.md öffnen → Interim-Breadcrumb eingetragen?
Prompt in neuen Thread kopieren + /start ausführen → nahtlose Fortsetzung möglich?
