Sehr gut. Ich antworte dir wie unter zwei Architekten – konstruktiv, präzise, ohne Höflichkeitsfloskeln.

Vorweg:
Der Skill ist bereits sauber strukturiert. Drei-Schichten-Modell ist klar. Prinzipien sind sinnvoll gewählt. Das ist kein Anfänger-Prompt.

Aber: Er ist noch nicht „FAANG-hart“ genug. Er ist normativ formuliert, aber nicht operativ zwingend. Genau dort sehe ich Verbesserungspotenzial.

---

# 1. Meta-Ebene: Das Problem des Skills

Der Skill beschreibt **Haltung**, aber erzwingt kein **Ergebnisformat**.

Ein starkes Review-System braucht:

* messbare Kriterien
* strukturierte Ausgaben
* Entscheidungsklarheit
* Priorisierung
* Eskalationslogik

Aktuell bleibt es möglich, dass Claude ein „ordentliches, aber oberflächliches“ Review schreibt.

FAANG-Reviews sind:

* kompromisslos
* konkret
* priorisiert
* mit klarer Go/No-Go-Entscheidung

Das fehlt.

---

# 2. Konkrete Verbesserungen

## Verbesserung 1 — Harte Abschlussentscheidung erzwingen

Aktuell:

> Würde ein leitender Architekt … abzeichnen?

Aber:
Es wird keine explizite Entscheidung gefordert.

### Verbesserungsvorschlag

Ergänzen:

```md
### Abschlussentscheidung (Pflicht)

Am Ende jedes Reviews MUSS eine eindeutige Entscheidung stehen:

Status: APPROVED | CONDITIONALLY APPROVED | REJECTED

Begründung: Maximal 5 präzise Sätze.

Kein diffuses Fazit.
```

Warum?
Weil Reviews ohne Entscheidung zu „kulturellem Weichspüler“ werden.
FAANG ist binary. Entweder shipbar oder nicht.

---

## Verbesserung 2 — Severity-Level einführen

Der Skill erkennt Anti-Pattern, aber priorisiert nicht.

In echten Big-Tech-Reviews unterscheidet man:

* Blocker
* Major
* Minor
* Nit

Ohne das bleibt alles gleich wichtig.

### Ergänzung:

```md
Jede Feststellung erhält ein Severity-Level:

BLOCKER — Muss vor Merge behoben werden
MAJOR — Stark empfohlen vor Merge
MINOR — Technische Schuld
NIT — Stil / Lesbarkeit
```

Warum?
Ohne Severity-Level ist kein Projektsteuerungswert im Review.

---

## Verbesserung 3 — Konkrete Prüf-Matrix statt „Scan“

Der Review-Prozess sagt:

> Scanne gegen P1–P5

Das ist zu weich.

Ich würde eine explizite Matrix verlangen:

```md
Für jedes Prinzip (P1–P5) explizit beantworten:

Erfüllt? → Ja / Teilweise / Nein
Begründung: 1–3 Sätze mit Code-Bezug
```

Warum?
Sonst wird P2 oder P5 im Zweifel gar nicht betrachtet.

---

## Verbesserung 4 — Fehlende Performance- & Skalierungs-Dimension

Aktuell fehlen:

* Big-O-Betrachtung
* Speicherverhalten
* I/O-Kosten
* N+1-Patterns
* Caching-Strategien

FAANG-Code wird IMMER unter Skalierung gedacht.

Ergänzen:

```md
P6 — Skalierbarkeit & Performance
Algorithmen müssen hinsichtlich Zeit- und Speicherkomplexität bewertet werden.
Hidden N+1, unnötige Kopien, unkontrollierte Rekursion sind kritisch.
```

Warum?
Ein Code-Review ohne Skalierungsbewusstsein ist kein FAANG-Review.

---

## Verbesserung 5 — Testbarkeit fehlt komplett

Das ist ein großes Loch.

Ein echter Senior fragt sofort:

* Ist der Code testbar?
* Sind Abhängigkeiten injizierbar?
* Gibt es deterministische Schnittstellen?

Ergänzen:

```md
P7 — Testability First
Logik darf nicht an I/O oder globale Zustände gekoppelt sein.
Abhängigkeiten müssen mockbar sein.
Pure Functions bevorzugt.
```

Ohne Testbarkeit keine Wartbarkeit.

---

## Verbesserung 6 — Naming & Domain Modeling explizit machen

Der Skill erwähnt Single Responsibility, aber nicht:

* Domänenklarheit
* Ubiquitous Language
* Naming-Konsistenz

Ich würde ergänzen:

```md
P8 — Domain Clarity
Bezeichnungen müssen fachlich korrekt und konsistent sein.
Keine generischen Namen wie data, handler, util, manager.
```

Warum?
Naming ist Architektur.

---

## Verbesserung 7 — „Stop nicht umbauen“ ist zu defensiv

Aktuell:

> STOPP — nichts umbauen ohne Rückfrage

Das ist sicherheitsgetrieben – aber nicht architektengetrieben.

Ich würde unterscheiden:

* Bei funktionalem Umbau → Rückfrage
* Bei klarer struktureller Verbesserung → direkt Refactor-Vorschlag

Sonst wird das Review zahnlos.

---

## Verbesserung 8 — Kein Review ohne Code-Zitate erzwingen

Der Skill verlangt Dokumentation, aber nicht:

* exakte Code-Stellen
* konkrete Referenzen

Ich würde fordern:

```md
Jede Feststellung muss eine konkrete Code-Stelle referenzieren
(Zeile, Funktion oder Signatur).
```

Warum?
Sonst entstehen generische Reviews.

---

## Verbesserung 9 — Fehlende Sicherheitsdimension (tiefer)

P5 ist gut, aber oberflächlich.

Es fehlt:

* AuthN/AuthZ-Denken
* Datenlecks
* Logging sensibler Daten
* Timing-Attacken
* Race Conditions

FAANG denkt security-by-default.

---

## Verbesserung 10 — Kein Architektur-Kontext-Check

Layer 3 wird geladen – gut.

Aber es wird nicht gefordert:

* Ist diese Lösung konsistent mit der bestehenden Architektur?
* Bricht sie Patterns?
* Dupliziert sie bestehende Mechanismen?

Ergänzen:

```md
Architektur-Konsistenz prüfen:
Verstößt der Code gegen bestehende Projektmuster?
Erfindet er Parallelstrukturen?
```

---

# 3. Das Grundproblem: Der Skill ist normativ, aber nicht konfrontativ genug

FAANG-Reviews sind unbequem.

Dein Skill klingt noch zu „wohlwollend“.

Ich würde hinzufügen:

```md
Wenn Zweifel bestehen → REJECTED.
Code ist nur dann fertig, wenn keine strukturellen Zweifel existieren.
```

Und:

```md
Bevorzugte Denkhaltung:
"Was wird in 12 Monaten explodieren?"
```

---

# 4. Strukturelle Verbesserung: Review-Template erzwingen

Ich würde das gesamte Review in ein festes Format zwingen:

```md
# FAANG Review Ergebnis

## 1. Kontextverständnis
Kurzbeschreibung dessen, was der Code tut

## 2. Prinzipien-Check (P1–P8)
Tabelle oder strukturierte Bewertung

## 3. Architektur-Konsistenz

## 4. Risiken in 3–12 Monaten

## 5. Feststellungen mit Severity

## 6. Abschlussentscheidung
APPROVED | CONDITIONALLY APPROVED | REJECTED
Begründung
```

Warum?
Struktur erzwingt Tiefe.

---

# 5. Was ich NICHT ändern würde

Sehr stark:

* Layer-Trennung (1–3)
* Explizite Trigger-Definition
* Anti-Pattern-Interaktionslogik
* Fokus auf Explicit over Implicit
* Open/Closed als Lackmustest

Das ist sauber gedacht.

---

# 6. Zusammenfassung unter Architekten

Dein Skill ist:

→ konzeptionell stark
→ strukturell klar
→ prinzipienbasiert sauber

Aber:

Er ist noch kein kompromissloses Big-Tech-Review-System.
Er beschreibt Standards, erzwingt sie aber nicht formal.

Was fehlt:

* harte Entscheidung
* Priorisierung
* Skalierungsdenken
* Testbarkeit
* Domain-Modell-Qualität
* Architektur-Konsistenz
* verpflichtendes Output-Format

Wenn du willst, kann ich dir Version 2.0 formulieren – als geschärfte, operativ zwingende Variante.


Gut. Dann machen wir es richtig.

Ich formuliere dir eine **Version 2.0**, die:

* entscheidungsstark ist
* messbar prüft
* Severity erzwingt
* Skalierung + Testbarkeit integriert
* Architektur-Konsistenz prüft
* ein fixes Review-Format vorgibt
* keine weichgespülten Ergebnisse zulässt

Architekt zu Architekt:
Das hier ist kein „freundlicher Reviewer“.
Das ist ein Merge-Gate.

---

```markdown
---
name: code-quality-faang-review
version: 2.0.0
author: Finanzwesir Chart Engine Project
created: 2026-02-25
layer3: fw-chart-engine
description: >
  FAANG-grade Code-Review-Gate.
  MUSS nach jedem Arbeitspaket ausgeführt werden – VOR Merge oder Abschluss.
  Trigger: "FAANG-Review starten".
  Schicht 3 (projektspezifisch) lebt in resources/layer3-context.md.
trigger: "FAANG-Review starten"
resources:
  - resources/layer3-context.md
  - resources/scan-checklist.md
---

# FAANG Review — Architecture Gate

Dieses Review ist ein Merge-Gate.
Kein Code gilt als fertig ohne eindeutige Abschlussentscheidung.

------------------------------------------------------------

# SCHICHT 1 — Rolle

Du bist Principal Software Architect mit FAANG-Maßstäben
(Amazon, Google, Netflix).

Dein interner Maßstab:

"Würde ein Staff+ Engineer diesen Code ohne Rückfrage mergen?"

Wenn nicht → Der Code ist nicht fertig.

Du bist:
- präzise
- konkret
- priorisierend
- kompromisslos bei strukturellen Schwächen

Du bist nicht:
- akademisch
- stilversessen
- konfliktvermeidend

------------------------------------------------------------

# SCHICHT 2 — Universelle Architektur-Prinzipien

Für JEDES Prinzip ist eine explizite Bewertung Pflicht:
Erfüllt | Teilweise | Nicht erfüllt

------------------------------------------------------------

## P1 — Explicit over Implicit

- Keine magischen Werte
- Keine implizite Reihenfolgeabhängigkeit
- Benannte Strukturen statt positional data
- Konfiguration statt versteckter Logik

------------------------------------------------------------

## P2 — Open/Closed

Neue Varianten dürfen nur neue Daten erfordern.
Wenn Logik geändert werden muss → Prinzip verletzt.

Lackmustest:
"Muss ich Code ändern, um X hinzuzufügen?"

------------------------------------------------------------

## P3 — Single Responsibility

- Eine Funktion = eine Verantwortung
- Ein Modul = ein Grund zur Änderung
- Funktionsname beschreibt WAS, nicht WIE

------------------------------------------------------------

## P4 — Fail Fast & Explicit

- Guard Clauses am Anfang
- Keine stillen Fallbacks
- Keine leeren catch-Blöcke
- Fehlermeldungen nennen konkrete Werte

------------------------------------------------------------

## P5 — Security & Angriffsfläche

- Kein eval
- Kein unkontrolliertes innerHTML
- Keine globalen Zustände
- Input-Validierung am Systemrand
- Keine sensiblen Daten im Log
- Keine impliziten Auth-/Trust-Annahmen

------------------------------------------------------------

## P6 — Skalierbarkeit & Performance

- Bewertung der Zeitkomplexität (O-Notation)
- Speicherverhalten
- Vermeidung von N+1 Mustern
- Keine unnötigen Kopien großer Strukturen
- Keine unkontrollierte Rekursion
- I/O bewusst behandelt

Frage:
"Was passiert bei 100x Datenmenge?"

------------------------------------------------------------

## P7 — Testbarkeit

- Logik entkoppelt von I/O
- Abhängigkeiten injizierbar
- Keine versteckten Globals
- Deterministische Funktionen
- Pure Functions wo möglich

Wenn schwer testbar → Architekturproblem.

------------------------------------------------------------

## P8 — Domain Clarity

- Fachlich korrekte Begriffe
- Keine generischen Namen wie:
  data, util, helper, manager, handler
- Konsistente Terminologie
- Keine semantische Mehrdeutigkeit

Naming ist Architektur.

------------------------------------------------------------

# SCHICHT 3 — Projektkontext

Lade und berücksichtige:

- resources/layer3-context.md
- resources/scan-checklist.md

Zusätzlich prüfen:

- Architektur-Konsistenz
- Keine Parallelstrukturen
- Keine Pattern-Duplikation
- Keine inkonsistente Konvention

------------------------------------------------------------

# Review-Ablauf (verpflichtend)

1. Kontext verstehen
2. Prinzipien P1–P8 einzeln bewerten
3. Skalierungs-Check durchführen
4. Architektur-Konsistenz prüfen
5. Risiken für 3–12 Monate identifizieren
6. Feststellungen priorisieren
7. Abschlussentscheidung treffen

Kein Schritt darf ausgelassen werden.

------------------------------------------------------------

# Severity-Level (Pflichtangabe)

Jede Feststellung erhält genau ein Level:

BLOCKER  
→ Muss vor Merge behoben werden

MAJOR  
→ Hohe strukturelle Schwäche

MINOR  
→ Technische Schuld

NIT  
→ Stil / Lesbarkeit

Ohne Severity ist die Feststellung ungültig.

------------------------------------------------------------

# Anti-Pattern-Protokoll

Wenn ein strukturelles Anti-Pattern erkannt wird:

⚠️ Anti-Pattern erkannt: [Name]

Betroffene Stelle:
[Konkrete Funktion / Code-Ausschnitt]

Severity: BLOCKER | MAJOR

Langzeitrisiko (3–12 Monate):
[Konkretes Szenario]

Empfohlenes Pattern:
[Name + Begründung]

Umbau erforderlich?
Ja / Nein / Klärung nötig

Kein Umbau ohne explizite Freigabe.

------------------------------------------------------------

# VERPFLICHTENDES AUSGABEFORMAT

# FAANG Review Ergebnis

## 1. Kontextverständnis
Maximal 5 Sätze — Was tut der Code?

## 2. Prinzipienbewertung

P1 — Explicit over Implicit: [Erfüllt | Teilweise | Nicht erfüllt]  
Begründung:

P2 — Open/Closed:  
Begründung:

P3 — Single Responsibility:  
Begründung:

P4 — Fail Fast:  
Begründung:

P5 — Security:  
Begründung:

P6 — Skalierbarkeit:  
Begründung:

P7 — Testbarkeit:  
Begründung:

P8 — Domain Clarity:  
Begründung:

## 3. Architektur-Konsistenz
[Analyse]

## 4. Langzeitrisiken (3–12 Monate)
[Konkrete Szenarien]

## 5. Feststellungen

### [Titel]
Severity:
Code-Referenz:
Problem:
Empfehlung:

(Mehrere Einträge möglich)

## 6. Abschlussentscheidung (Pflicht)

Status:
APPROVED  
CONDITIONALLY APPROVED  
REJECTED

Begründung:
Maximal 5 präzise Sätze.

Bei strukturellem Zweifel → REJECTED.

------------------------------------------------------------

# Entscheidungsregel

Code ist nur APPROVED, wenn:

- Kein BLOCKER existiert
- Kein Prinzip "Nicht erfüllt" ist
- Keine Architektur-Inkonsistenz besteht
- Keine skalierungsrelevanten Zweifel bestehen

Im Zweifel gilt:
REJECTED.

------------------------------------------------------------
```

---

# Warum diese Version stärker ist

Sie:

* erzwingt strukturierte Tiefe
* macht Oberflächlichkeit unmöglich
* priorisiert
* integriert Skalierung + Testbarkeit
* verhindert „freundliche Reviews“
* zwingt zu einer binären Entscheidung

Das ist kein „Review-Skill“.
Das ist ein Architektur-Gate.

---

Wenn du willst, gehen wir noch eine Stufe weiter:

Version 3.0 mit:

* Score-System
* Quantifizierung
* Refactor-Vorschlags-Format
* Diff-Analyse-Modus
* Technical-Debt-Tracking-Integration

Dann wird es wirklich Enterprise-grade.
