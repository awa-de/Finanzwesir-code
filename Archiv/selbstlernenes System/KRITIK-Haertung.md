# Kritik-Härtung: Vier Kritiker, ihre Befunde und die Antworten
Stand: 2026-05-05 | Für nächste Session: In PLAN-Synthese.md integrieren

---

## Auftrag

Der Plan wurde durch vier unabhängige Denk-Werkzeuge geprüft:
1. Mainstream-Ansicht (Konsens aus Literatur)
2. Via Negativa / Munger ("Invert, always invert")
3. Occam's Razor (einfachste hinreichende Erklärung)
4. Devil's Advocate (stärkste Gegenargumente)

Quellen: Weick/Sutcliffe *Managing the Unexpected* (HRO), Gawande *The Checklist Manifesto*,
Munger *Poor Charlie's Almanack*, Kahneman *Thinking Fast and Slow*,
Hollnagel *ETTO Principle*, NASA ASRS (Aviation Safety Reporting System).

---

## 1. Mainstream-Ansicht

### Befund
Der Plan folgt dem PDCA-Modell (Plan-Do-Check-Act) und dem Lean-Startup-Loop
(Build-Measure-Learn). Das ist der Konsens für kontinuierliche Verbesserungssysteme.

Gawande-Kriterien für funktionierende Checklisten:
- Kurze Zykluszeit ✅ (Abschluss-Ritual = sofort)
- Niedriger Aufwand ✅ (Claude schreibt, Albert entscheidet nur bei /distill)
- Menschliche Kontrolle ✅ (j/n/anpassen bei jeder Promotion)
- Messbarkeit ⚠️ (problematisch — dazu unten)

### Urteil
Solide Grundlage. Ein offenes Problem: die [OK]-Metrik ist self-reported und damit
anfällig für unbewusste Schwellenabsenkung (Kahneman: Availability Heuristic).

### Antwort
[OK]-Freitext ersetzt durch Challenge-Response (2 explizite Fragen j/n).
Damit ist [OK] eine aktive Bestätigung, kein passives Leerzeichen.

---

## 2. Via Negativa / Munger — "Invert, always invert"

### Methode
Nicht fragen "Wie bringen wir das System zum Laufen?" sondern
"Was bringt dieses System sicher zum Scheitern?"

### Befunde: 5 Versagenswege

**Versagensweg 1 — Circulus vitiosus**
Das System soll Fehler im Abschluss-Ritual einfangen — durch einen neuen Schritt
im Abschluss-Ritual. Wenn das Ritual unzuverlässig ausgeführt wird (das ist die Diagnose!),
produziert Schritt 3b keine Daten. Die Lernschleife versagt genau dann wenn sie gebraucht wird.

→ **Antwort:** session-log = Schritt 0 (vor allem anderen). Auch ein abgebrochenes
Ritual hinterlässt einen Eintrag. Soforteintrag vor Analyse (HRO-Prinzip).

**Versagensweg 2 — Monday-Lock**
/distill läuft montags automatisch. Alberts erratischer Rhythmus (Wochen Pause möglich)
macht einen Kalender-Trigger wertlos. Lange Pause → session-log mit 20+ Einträgen →
/distill wird Wochenend-Reinigung statt Routine.

→ **Antwort:** Kalender-Trigger gestrichen. Stattdessen zwei Schwellen:
≥5 Einträge im session-log ODER >14 Tage seit letztem Distill → /start empfiehlt /distill.
Albert entscheidet wann, nicht der Kalender.

**Versagensweg 3 — Chilling**
Claude schreibt [OK] wenn nichts war — oder schreibt gar nichts weil "nicht der Rede wert".
Albert schaut nach Wochen in eine leere Datei.

→ **Antwort:** /start prüft Lücken (HRO: "fehlendes Log = Anomalie").
Wenn AP abgeschlossen aber kein session-log-Eintrag existiert: Claude muss erklären.
Kein stilles Überspringen.

**Versagensweg 4 — Graveyard**
patterns.md sammelt "observing"- und "retired"-Einträge ohne Verfallsdatum.
Nach 18 Monaten: unlesbarer Friedhof.

→ **Antwort:** Automatische Hygiene in /distill:
"observing"-Einträge >90 Tage → nach patterns-archiv.md verschieben.
"retired"-Einträge: max. 15 behalten, älteste fallen raus (FIFO).

**Versagensweg 5 — [OK]-Metrik lügt**
Zielwert 100% [OK] kann durch Schwellenabsenkung erreicht werden —
Claude schreibt [OK] wenn etwas "nicht der Rede wert" schien.
Die Metrik misst dann Claudes Urteilsschwelle, nicht die Qualität.

→ **Antwort:** Challenge-Response statt Freitext.
"Gab es eine Korrektur oder Abweichung?" j/n
"Gab es eine Überraschung oder neue Erkenntnis?" j/n
Beide nein → [OK]. Zwei explizite Fragen erzwingen aktive Prüfung.
(HRO-Quelle: Luftfahrt Challenge-Response Verfahren)

### Munger-Bilanz: alle 5 Versagenswege geschlossen ✅

---

## 3. Occam's Razor

### Methode
Die einfachste Erklärung die alle Daten erklärt ist zu bevorzugen.
Keine Komponente ohne eigenen, nicht-redundanten Nutzen.

### Befund: Warum baut der Plan eine 7-Komponenten-Pipeline?

Drei Hypothesen für das Kernproblem (Korrekturen gehen verloren):
- H1: Fehlende Infrastruktur → session-log fehlt
- H2: Zu vage Instruktion → Schritt 3 "neue Fakten eintragen" ist zu abstrakt
- H3: Fehlende Disziplin → Abschluss-Ritual wird inkonsistent ausgeführt

Occams Urteil: **H2 ist die einfachste hinreichende Erklärung.**
Der bestehende Schritt 3 ("neue stabile Projektfakten eintragen") lässt Claude
selbst urteilen was relevant ist — und trifft das ~50% falsch.

Die einfachste Lösung wäre: Schritt 3 präzisieren, 4 konkrete Fragen.
Kein session-log, kein patterns.md, kein /distill.

### Anfangsproblem im Plan
Der Plan rechtfertigte die volle 7-Komponenten-Pipeline nicht explizit.
Occam hätte gefragt: "Warum nicht einfach Schritt 3 verbessern?"

### Antwort: Occam-Tabelle im Plan
Jede Komponente löst ein Problem das keine andere löst:

| Komponente | Löst welches Problem | Ohne diese Komponente |
|---|---|---|
| session-log + Schritt 0 | Korrekturen gehen verloren | Kern-Diagnose ungelöst |
| Challenge-Response | Freitext-Urteil unzuverlässig | [OK]-Metrik bedeutungslos |
| patterns.md | Muster über Sessions sichtbar | Jede Session lernt neu |
| /distill | Muster in Regeln übersetzen | patterns.md wächst ohne Konsequenz |
| /uebergabe | Multi-Thread-Kontinuität | Friktionen aus Thread 1 in Thread 3 verloren |
| /start-Erweiterung | Lücken + Empfehlungen sichtbar | System läuft still leer |
| Kassensturz-Erweiterung | Qualitätsrate messbar | Kein Trend erkennbar |

**Occam-Urteil:** Jede Komponente ist nötig. Keine ist redundant.
Challenge-Response löst das Capture-Problem.
patterns.md löst das Pattern-Problem — das ist ein anderes Problem.

### Occam-Bilanz: offener Punkt geschlossen ✅

---

## 4. Devil's Advocate

### Methode
Bewusst gegen die dominante Position argumentieren.
Stärkste Gegenargumente, mögliche Schwachstellen und blinde Flecken.

### Gegenargument 1: "System lernt nicht — es protokolliert"
Das System gibt Claude keine echte Lernfähigkeit. Albert lernt was Claude falsch macht
und entscheidet dann ob eine Regel geändert wird. Das ist ein gut strukturierter
manueller Verbesserungsprozess, kein selbstlernendes System.
"Quantensprung" durch ein selbstlernendes System ist unzutreffend.

→ **Alberts Antwort:** Quantensprung = Aufzinsung von 1000 kleinen Verbesserungen.
Er ist geduldig. Evolutionsstufe 1: protokollieren und Muster erkennen.
In ~4 Monaten: echte Agentenlogik. Das ist die angemessene Evolutionsstufe.
**Bewusst akzeptiert. ✅**

### Gegenargument 2: /uebergabe ist Scope-Creep
Der Kern-Plan (Lernschleife) war noch nicht gelöst als /uebergabe hinzukam.
Zwei verschiedene Probleme in einer Synthese vermischt.

→ **Entscheidung:** /uebergabe löst ein echtes, eigenständiges Problem
(Multi-Thread-Kontinuität). Der Breadcrumb verbindet es mit dem Lern-Loop.
**Eigenständiger Mehrwert, kein Scope-Creep. Akzeptiert. ✅**

### Gegenargument 3: Pattern-Schwelle ≥2 zu hoch für kleines Projekt
Bei 2–4 APs pro Woche und erratischem Rhythmus braucht ein spezifisches Muster
Monate bis es ≥2 Belege hat. System ist in dieser Zeit "stumm".

→ **Antwort:** Gestufte Schwelle eingeführt:
- ≥1 Beleg bei High-Impact (Tabu-Zone berührt, Gate übersprungen, Richtungskorrektur,
  Regression) → sofort Kandidat
- ≥2 Belege bei Normal-Impact (Stil, Präferenz, Prozessdetail)
**Gelöst. ✅**

### Gegenargument 4: "Erweiterung statt Synthese"
Das Bestandssystem bleibt dominant. session-log, patterns.md, /distill sind Anbauten.
Kein echtes Kind aus zwei Eltern — der alte Parent mit Accessories.
Eine echte Synthese hätte §8, /start und das Gate-System von Grund auf neu integriert.

→ **Alberts Entscheidung:** Bewusste Designentscheidung.
Erweiterung ist robuster: wenn der Lern-Loop nicht funktioniert oder aufgegeben wird,
läuft das Basissystem weiter. Das passt zur Evolutionsstrategie.
Synthese kommt in Stufe 2 (Agentenlogik). Stufe 1 = Erweiterung ist korrekt.
**Bewusst akzeptiert. ✅**

---

## 5. Schlussbilanz: alle Kritikpunkte

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

---

## 6. Zusatz: HRO-Prinzipien (kam nach der Kritik-Runde)

Aus der Kritik (Gawande, Munger) entstand die Frage: Wie regeln Branchen die nie in
einen unkontrollierten Zustand kommen dürfen den Lastabwurf?

Recherchierte Industrien: Stromnetz (Lastabwurf), Luftfahrt (MEL, ASRS),
Kernkraft (EOP), Software (Circuit Breaker), Medizin (START-Triage), ETTO-Prinzip.

Gemeinsames Prinzip aller Industrien:
> Entscheidungen im Voraus — nicht in der Krise.
> Modus immer benannt — nie stummes Überspringen.
> Invarianten sind hart — nicht fuzzy.

Ergebnis: Das Lastabwurf-System mit 4 benannten Modi (N/R/M/A),
5 Invarianten und Prioritätsgruppen 1–5 wurde in den Plan integriert.
Siehe Abschnitt "Lastabwurf-System" in PLAN-Synthese.md.

---

## Auftrag für nächste Session

Dieses Dokument in PLAN-Synthese.md integrieren — als eigenständiges Kapitel
"Kritik-Härtung" nach dem Abschnitt "Kollisions-Analyse" und vor "Designentscheidungen".
Die Schlussbilanz-Tabelle gehört prominent sichtbar.
