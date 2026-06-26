# Claude-Workflow für App-Fabrik — V0.2

Stand: 2026-05-10 | konsistenz-korrektur | Geändert von: Claude  
Status: Arbeitsfassung. Bindend für Pilot-1 nach Alberts expliziter Freigabe.

**Leitprinzip:** Vorhandenes Claude-Betriebssystem nutzen — kein Parallelsystem, keine neuen Commands vor dem Piloten.

---

## 1. Zweck dieses Workflows

### Warum braucht die App-Fabrik einen Workflow?

Ohne gemeinsamen Prozess entstehen 21 Einzelentscheidungen in 21 Sessions. Claude weiß nicht, welche Specs gelten. Albert weiß nicht, an welchem Punkt Freigaben erforderlich sind. Sicherheitsregeln werden in Hektik vergessen. Prototypen landen ohne Dokumentation im Repo.

Der Workflow ist das Fließband. Er legt fest: welche Fragen in welcher Reihenfolge gestellt werden, welche Dokumente wann gelesen werden müssen, und an welchen Punkten ohne Alberts Freigabe nichts weitergeht.

### Was soll verhindert werden?

- Code vor Spec: App wird gebaut, bevor Ghost-Card-Vertrag geklärt ist
- Silent Assumptions: AppContext-Schema, A11y-Vertrag oder Whitelist werden stillschweigend erfunden
- Scope-Drift: Neue offene Fragen werden beiläufig entschieden, statt gemeldet
- Interface-Fehler: `data-app` statt `data-fw-app`, freies JSON in `data-fw-options`, unkontrollierte innerHTML-Nutzung
- Doppelstrukturen: Neue Backlogs oder zweite Interface-Specs neben den bestehenden Dokumenten

### Was bedeutet „vorhandenes Claude-Betriebssystem nutzen"?

Das Claude-Betriebssystem (CLAUDE.md, Gates, Skills, Commands) ist für allgemeine Softwarearbeit gebaut und deckt alle kritischen Schritte ab. Die App-Fabrik nutzt es als Schicht, nicht als Alternative:

- `/intake` erfasst neue App-Aufgaben
- `01-process-extreme-ownership` prüft das Briefing
- `app-spec-create` koordiniert die APP_SPEC-Erstellung; `spec-mode-architecture` unterstützt technische Architekturfragen ergänzend
- `/pre-code-gate full` ist Pflicht vor jedem App-Code
- `impl-mode-workpackages` schneidet Arbeitspakete
- `code-quality-faang-review` ist das Code-Qualitätsgate
- `manual-test-plan` erzeugt den Testplan
- `/patch-quittung` quittiert jeden Patch
- `/abschluss-ritual` schließt eine App ab

Neue App-Fabrik-spezifische Commands werden erst nach Pilot-1 angelegt, wenn klar ist, dass vorhandene Skills nicht ausreichen. → `02_OPEN_QUESTIONS.md` Wf-01

### Warum gilt: erst Spezifikation, dann Code?

Eine App ohne Spec ist ein Prototyp, kein Fabrik-Produkt. Ohne APP_SPEC.md fehlen:

- der Ghost-Card-Vertrag (welche Attribute, welche Whitelist?)
- das AppContext-Schema (was liefert die Strategie an den Renderer?)
- der A11y-Vertrag (was muss die Strategie für Barrierefreiheit liefern?)
- die Reise eines Inputs (wie läuft ein Wert von Ghost-Card bis zur Anzeige?)
- die State-Definition (was passiert bei Ladefehler, fehlenden Daten, leerem Ergebnis?)

Ohne Spec ist kein Gate möglich. Ohne Gate schreibt Claude keinen App-Code.

---

## 2. Rollen

| Rolle | Verantwortung |
|---|---|
| **Albert** | Fachliche Freigaben, strategische Entscheidungen, manuelles Testen, Bestätigung jedes Testfalls nach Patch |
| **Claude** | Analyse, Spezifikation, Umsetzungsvorschlag, Codearbeit nach Gate, Code-Review, Scope-Funde melden |
| **Skills** | Expertisebausteine: `01-process-extreme-ownership`, `spec-mode-architecture`, `impl-mode-workpackages`, `code-quality-faang-review`, `manual-test-plan` |
| **Commands** | Prozesssteuerung: `/intake`, `/pre-code-gate full`, `/patch-quittung`, `/abschluss-ritual` |
| **Backlog** | Zentrale Steuerung unter `docs/steering/BACKLOG.md` — keine zweite Backlog-Datei anlegen |
| **02_OPEN_QUESTIONS.md** | Register für App-Fabrik-Fragen — kein Backlog-Ersatz, kein AP-Tracker |
| **docs/spec/APP-INTERFACE.md** | Kanonische Schnittstellen-Spec: `fw-app`, `financial-chart-module`, `data-fw-*`, `data-options`, Datenquellen, Sicherheitsregeln, Empty-State, Cache-Busting |
| **03_APP_FACTORY_STANDARD_DRAFT.md** | App-Familien, Dateistruktur, DoD, Architekturprinzipien P-01–P-10 |
| **01_DECISION_LOG.md** | Getroffene Entscheidungen (entschieden / Arbeitsannahme / offen) |

---

## 3. Workflow-Phasen

### Phase 0 — Intake

**Ziel:** Vollständiges Bild der App bevor irgendeine Entscheidung getroffen wird.

```
0.1 Vorhandenes Material sammeln:
    - App-Ordner unter /Apps/[slug]/ prüfen — was existiert schon?
    - Prototypen, Legacy-Code, README: sichten, nicht überschreiben

0.2 APP_INVENTORY.md prüfen:
    - App-Familie identifiziert?
    - Datenbedarf und offene Klärungen bekannt?

0.3 App-Familie bestimmen:
    → 03_APP_FACTORY_STANDARD_DRAFT.md §4 lesen

0.4 docs/spec/APP-INTERFACE.md lesen, wenn Ghost-Card, Datenquelle
    oder Embed-Vertrag betroffen:
    - Welche Attribute werden benötigt?
    - Sind data-fw-data / data-fw-config / data-fw-options relevant?
    - Welche Sicherheitsregeln gelten?

0.5 docs/steering/audits/SECURITY-BASELINE.md lesen (Pflicht)

0.6 /intake ausführen:
    - App-Slug, App-Familie, Datenbedarf, UX-Flow, Annahmen erfassen
    - Offene Klärungen aus APP_INVENTORY.md ansprechen

0.7 Scope-Funde melden:
    - Neue Fragen → 02_OPEN_QUESTIONS.md
    - Echte Arbeitspakete → docs/steering/BACKLOG.md
```

**Nicht in Phase 0:** Entscheidungen treffen, Code schreiben, Dateien anlegen.

---

### Phase 1 — Briefing-Check

**Ziel:** Sicherstellen, dass die Aufgabe vollständig und klar ist, bevor Spezifikationsarbeit beginnt.

```
1.1 01-process-extreme-ownership anwenden:
    - Ist das Ziel der App klar?
    - Ist die Nutzerfrage konkret?
    - Sind Constraints und Deliverable definiert?
    - Welche Annahmen stecken im Briefing?
    - Was fehlt, was ist unklar?

1.2 Lücken benennen:
    - Zu vage → Rückfrage, max. 2 Fragen
    - Lösung statt Problem → auf das eigentliche Problem zeigen
    - Mehrere Baustellen → priorisieren lassen

1.3 Albert bestätigt Briefing oder ergänzt.
```

**Nicht in Phase 1:** Codearbeit, Spec-Erstellung, Gate.

---

### Phase 2 — APP_SPEC erstellen

**Ziel:** Vollständige technische Spezifikation für die App als Grundlage für Gate und Implementierung.

**Werkzeug:** `app-spec-create` koordiniert; `spec-mode-architecture` für technische Architekturfragen (ergänzend, kein Ersatz für `app-spec-create`, lokalen Steuerungsblock, `tech-spec-app` oder `heldenreise`)

```
2.0 Pflichtschritt: Lokalen App-Steuerungsblock prüfen

    Vor Spec-, Architektur-, UX- oder Detailarbeit den lokalen Steuerungsblock lesen:

    a) Apps/{slug}/APP_SPEC.md → Abschnitt „Steuerungsblock: Zweck, Barriere, Prüfregeln"
    b) Falls keine APP_SPEC: Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md → „Vorläufiger Steuerungsblock"

    Prüfmaßstab: docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md

    Stoppen, wenn Zweck, Barriere oder Nicht-Ziele fehlen, unklar oder widersprüchlich sind.
    → Nicht weitermachen. Albert klären lassen.

2.1 APP_SPEC.md erstellen unter /Apps/[slug]/APP_SPEC.md

2.2 Pflichtabschnitte:
    - Zweck / Nutzerfrage / Kernaussage
    - App-Familie (Calculator, Scenario Chart, Decision, Explorer, ...)
    - Inputs und Outputs
    - Datenbedarf (CSV, JSON, keine)
    - Ghost-Card-Beispiel gemäß docs/spec/APP-INTERFACE.md
    - data-fw-options-Whitelist (falls genutzt): alle erlaubten Keys
    - AppContext-Schema (was liefert die Strategie?)
    - A11y-Vertrag für diese App-Familie
    - State-Modell: Loading → Content / Error / Empty
    - Reise eines Inputs / Datenpunkts (P-10, Pflicht)
    - Testfälle
    - Offene Fragen (markiert als Entscheidung / Arbeitsannahme / offen)

2.3 Ghost-Card-Prüfung (APP-INTERFACE.md §3):
    - Ist data-fw-app korrekt? (kein data-app)
    - Wird data-fw-data oder data-fw-config benötigt?
    - Gibt es data-fw-options? → Whitelist in APP_SPEC.md definieren
    - Gibt es CSV oder JSON? → Datenquelle, Validierung, Cache-Busting klären
    - Sind Empty / Error / Loading definiert?
    - Werden alle data-* Attribute als untrusted input behandelt?
    - Ist data-fw-theme explizit ausgeschlossen? (reserviert, nicht produktiv)

2.3b Security-Sync prüfen:
    - Enthält APP_SPEC neue Sicherheitsannahmen, die über APP-INTERFACE.md §7
      oder SECURITY-BASELINE.md §5/§6 hinausgehen?
    - APP_SPEC darf Sicherheitsdetails nicht still erfinden, die SECURITY-BASELINE.md
      oder APP-INTERFACE.md widersprechen.
    - Neue Sicherheitsregel entdeckt → als Scope-Fund melden, nicht still einbauen.
    - Widerspruch → stoppen, melden, nicht implementieren.

2.4 AppContext-Schema prüfen (P-04 / Arch-06):
    Jede App-Strategie erzeugt einen AppContext — den semantischen Rucksack
    (Context Object Pattern, docs/spec/Der Rucksack.md).
    Für Calculator mindestens:
    - valueMode: 'currency' | 'percent' | 'number'
    - currency: 'EUR' | ''
    - resultTone: 'neutral' | 'positive' | 'warning'
    - a11ySummary: formatierter Ergebnistext für Screen Reader
    Renderer lesen den AppContext — sie interpretieren keine Rohdaten.

2.5 A11y-Vertrag prüfen (P-08 / Arch-07):
    Calculator: ARIA Live Region bei Neuberechnung + Ergebnis-Summary
    Quiz: Fragenstatus + Ergebnis-Summary
    Explorer: Tabellarische Alternative zur Visualisierung
    Konkrete Spezifikation in APP_SPEC.md festlegen.

2.6 Reise eines Inputs (P-10 — Pflicht):
    Beispiel für einen konkreten Wert durch alle Schichten:
    Ghost-Card → data-fw-options Parsing (P-02) → AppData freeze (P-01)
    → Strategie → AppContext → Renderer (Rehydrierung, P-05)
    Wer diesen Pfad nicht beschreiben kann, hat die Architektur
    nicht vollständig durchdacht.

2.7 Entscheidungsklarheit sicherstellen:
    - Entscheidung: bereits entschieden, Quelle benennen
    - Arbeitsannahme: hinreichend gesichert, aber noch offen
    - Offen: Blocker oder Klärungsbedarf → melden, nicht still lösen
```

---

### Phase 3 — Spec-Gate / Pre-Code-Gate

**Ziel:** Sicherstellen, dass die APP_SPEC vollständig ist und keine Blocker offen sind, bevor Code entsteht.

```
3.1 Spec-Gate-Prüfung (Claude führt durch, Albert entscheidet):

    Pflichtfragen:
    □ Ist der Ghost-Card-Vertrag aus APP-INTERFACE.md korrekt angewendet?
      (data-fw-app vorhanden? kein data-app? data-fw-theme nicht produktiv?)
    □ Ist der AppContext mit Pflichtfeldern definiert?
    □ Sind Pflichtfelder und Fallback-Felder unterschieden?
    □ Sind data-fw-options whitelistbar? (Whitelist in APP_SPEC.md dokumentiert?)
    □ Sind Datenquellen und Cache-Busting-Strategie geklärt?
    □ Ist der Empty-State definiert? (kein leerer Container, kein Stack-Trace)
    □ Ist der A11y-Vertrag für diese App-Familie definiert?
    □ Reise eines Inputs vollständig beschrieben?
    □ Keine offenen Fragen stillschweigend entschieden?
    □ Security-Sync (→ SECURITY-BASELINE.md §10):
      Sind SECURITY-BASELINE.md, APP-INTERFACE.md und APP_SPEC.md synchron?
      Ergebnis: synchron / synchron mit Nicht-Blockern / nicht synchron = Blocker

    Offene Blocker markieren — App wartet auf Klärung.
    Kein Gate ohne klare Antworten auf alle Pflichtfragen.

3.2 APP_FACTORY_IMPLEMENTATION_RFC.md lesen (docs/App-Fabrik/):
    Pflicht vor /pre-code-gate full bei jeder App-Fabrik-Implementierung.
    - keine Implementierung ohne dokumentierten Slice-Plan
    - Vertical Slicing ist Pflicht — kein horizontaler Vorab-Aufbau
    - Slice 0 (App-Shell + Ghost-Card-Bootstrap) ist immer erster Implementierungsschritt
    - keine Framework-/Build-System-/Shadow-DOM-/Core-Entscheidung still treffen
    Status RFC: noch Draft, noch nicht docs/spec/ — dennoch Pflichtquelle.

3.3 /pre-code-gate full ausführen:
    App-Arbeit ist immer Full-Gate (CLAUDE.md — keine Ausnahme).

3.4 Albert gibt explizit OK.
    Schweigen ≠ Freigabe.
```

---

### Phase 4 — Implementierungsplanung

**Ziel:** Konkrete, überprüfbare Arbeitspakete vor Codebeginn.

**Werkzeug:** `impl-mode-workpackages`

```
4.1 Workpackages als Vertical Slices planen:
    Implementierung erfolgt in Vertical Slices gemäß APP_FACTORY_IMPLEMENTATION_RFC.md §7+§8.
    Kein horizontaler Vorbau — kein "erst Core/CSS/Testinfrastruktur bauen".
    Reihenfolge startet mit Slice 0 (App-Shell + Ghost-Card-Bootstrap).

    Dateiperspektive (ergibt sich aus den Slices):
    a) app.js, app.css, app.test.html (Slice 0 — App-Shell)
    b) app.js erweitern (folgende Slices — Berechnung, Inputs, States)
    c) README.md, NOTES.md (begleitend)

4.2 Für jeden Slice festlegen:
    - Ziel des Slices
    - Nutzerwert / Erkenntniswert (was kann Albert nach diesem Slice sehen und prüfen?)
    - Betroffene Layer
    - Geänderte Dateien
    - Akzeptanzkriterien (wie ist "fertig" definiert?)
    - Nicht-Ziele dieses Slices
    - Risiken

4.3 Keine ungeplanten Refactorings:
    Fremder Mess (bestehender Code, schlechter Stil) → melden, nicht anfassen.
    Chart-Engine-Refactorings sind immer separates Gate.

4.4 Bestehende Prototypen nicht überschreiben:
    Vorhandene Single-HTML-Dateien bleiben als Referenz.
    Factory-Version entsteht daneben in der Standard-Dateistruktur.
```

---

### Phase 5 — Umsetzung

**Ziel:** App-Code schreiben nach Gate, Workpackage für Workpackage.

```
5.1 Nur nach Alberts explizitem OK aus dem Gate.
    Implementierung erfolgt Slice für Slice gemäß Slice-Plan aus Phase 4.
    Kein nächster Slice ohne: lokalen Test, /patch-quittung und Alberts Bestätigung.

5.2 App-Fabrik-Standard einhalten (03_APP_FACTORY_STANDARD_DRAFT.md):
    - Vanilla JS, clientseitig, kein Backend (A-03)
    - App.js enthält nur app-spezifische Logik — kein Shell-Code
    - Alle Selektoren relativ zum App-Root (ctx.root)
    - Keine globalen IDs als App-API (Q-03)
    - Fehler pro App isolieren — kein App-Crash bringt die Seite zum Absturz

5.3 APP-INTERFACE.md einhalten (docs/spec/APP-INTERFACE.md):
    - Kein data-app — nur data-fw-app
    - Kein freies JSON in data-fw-options
    - URL-Validierung gegen erlaubte Domains
    - Kein innerHTML für Nutzdaten (SafeDOM, Q-01)
    - Whitelist-Prinzip für data-fw-options und data-fw-app (Q-02)

5.4 Architekturprinzipien P-01–P-10 einhalten:
    - P-01: AppData nach Parsing einfrieren (Object.freeze)
    - P-02: Two-Step Parsing für alle Eingaben
    - P-03: async init(), async loadData(), async parseConfig()
    - P-04: AppContext mit semantischen Feldern befüllen (Rucksack)
    - P-05: Berechnungen mit reinen Zahlen, Einheiten im AppContext
    - P-06: Annahmen sichtbar machen, keine Scheingenauigkeit
    - P-08: A11y-Repräsentation durch die Strategie liefern
    - P-09: Semantische Rollen (resultTone: 'warning'), keine Hex-Werte

5.5 Keine Änderungen außerhalb freigegebener Pfade.

5.6 Nach jedem Patch:
    - Diff zeigen
    - /patch-quittung ausführen
    - Albert testet, bestätigt Testfall
    - Kein nächster Patch ohne Alberts Bestätigung
```

---

### Phase 6 — Review

**Ziel:** Code-Qualität, Sicherheit und Standard-Konformität vor Release prüfen.

**Werkzeug:** `code-quality-faang-review`

```
6.1 Code-Qualitätsgate:
    code-quality-faang-review ausführen
    Blockierender Review → kein Release ohne Klärung.

6.2 Sicherheitscheck (APP-INTERFACE.md §7):
    □ fw-app-Vertrag korrekt? (class="fw-app", data-fw-app, keine data-app)
    □ Kein data-fw-theme produktiv verwendet?
    □ Kein freies JSON in data-fw-options?
    □ Keine unvalidierten URLs? (data-fw-data / data-fw-config gegen Domain-Whitelist)
    □ Kein innerHTML für Nutzdaten?
    □ Alle data-* Attribute als untrusted input behandelt?
    □ CSV/JSON validiert vor Verwendung?
    □ Keine externen CDN-Abhängigkeiten ohne DECISION-LOG-Eintrag?
    □ Neue Sicherheitsregeln entstanden? → SECURITY-BASELINE.md und 01_DECISION_LOG.md aktualisiert?

6.3 Design-System-Check (03_APP_FACTORY_STANDARD_DRAFT.md §8):
    □ Keine Hex-Werte hardcoded?
    □ CSS Custom Properties aus screen.css genutzt?
    □ Semantische Rollen statt Farben im AppContext?

6.4 App-Familien-Konformität:
    □ App nutzt nur dokumentierte UI-Primitiven?
    □ Neue Primitive? → Nur wenn ≥ 2 Apps sie brauchen + Design-System-Aufnahme
    □ State-Modell vollständig (Loading / Content / Error / Empty)?

6.5 Chart-Engine-Check (falls Charts genutzt):
    □ App baut keine eigene Chart-Logik?
    □ Keine Destabilisierung der Chart-Engine?
    □ Chart-Engine-Änderungen durch separates Gate abgedeckt?
```

---

### Phase 7 — Manueller Testplan

**Ziel:** Alle kritischen Pfade und Edge Cases vor Release abdecken.

**Werkzeug:** `manual-test-plan`

```
7.1 Testplan erstellen:
    Viewports: Mobile (375px), Tablet (768px), Desktop (1280px)

7.2 Pflicht-Testfälle:

    Ghost-Card:
    - Minimal-Card (nur data-fw-app) lädt korrekt
    - Card mit data-fw-options lädt Overrides korrekt
    - Ungültiger data-fw-app-Slug → Error-State, kein Crash
    - data-fw-data mit gültiger URL → Daten laden
    - data-fw-data mit ungültiger URL → Error-State, nutzerfreundliche Meldung
    - data-fw-data mit Domain außerhalb Whitelist → blockiert, Error-State

    States:
    - Loading: sichtbarer Lade-Zustand
    - Content: alle Berechnungen/Daten korrekt dargestellt
    - Error: Fehlermeldung auf Deutsch, kein Stack-Trace
    - Empty: sauberer Fehlerzustand bei fehlenden/unvollständigen Daten

    Daten:
    - Ungültige CSV/JSON → Error-State
    - Fehlende Pflichtfelder in CSV/JSON → Empty-State
    - data-fw-options mit unbekanntem Key → wird ignoriert, kein Crash
    - data-fw-options mit ungültigem Wert → Fallback auf Default

    A11y:
    - Tastatur-Navigation funktioniert
    - ARIA-Labels für alle Slider, Inputs, interaktive Elemente vorhanden
    - Live Region bei Neuberechnung aktiv
    - WCAG-AA-Kontrast erfüllt

    Sicherheit:
    - Kein innerHTML für Nutzdaten nachweisbar
    - XSS-Versuch in data-fw-options wird nicht ausgeführt

    prefers-reduced-motion:
    - Animationen pausieren oder reduzieren
```

---

### Phase 8 — Pilot-Auswertung / Learning

**Ziel:** Erkenntnisse aus dem Piloten in den Standard zurückführen.

```
8.1 Was wurde am Standard bestätigt?
    → 03_APP_FACTORY_STANDARD_DRAFT.md ergänzen (falls nötig)

8.2 Was muss angepasst werden?
    → 01_DECISION_LOG.md: neue oder geänderte Entscheidungen
    → 03_APP_FACTORY_STANDARD_DRAFT.md: Korrekturen

8.3 Neue offene Fragen:
    → 02_OPEN_QUESTIONS.md: App-Fabrik-Fragen
    → docs/steering/BACKLOG.md: echte Arbeitspakete

8.4 Was wird nicht übernommen?
    → 01_DECISION_LOG.md: explizit notieren, was abgelehnt wurde und warum

8.5 Calculator-Template:
    Ist das Template explizit für risiko-uebersetzer (Pilot 2) wiederverwendbar dokumentiert?
    → Exit-Kriterium: 05_PILOT_STRATEGY.md

8.6 /abschluss-ritual ausführen.
```

---

## 4. Gates

### Intake Gate

**Zweck:** Sicherstellen, dass genug Kontext vorhanden ist, um Spezifikationsarbeit zu beginnen.

| | |
|---|---|
| **Input** | Albert nennt App-Name oder Slug |
| **Output** | Vollständiges Intake-Ergebnis: App-Familie, Datenbedarf, UX-Flow, Annahmen, offene Klärungen |
| **Entscheidet** | Claude prüft Vollständigkeit; Albert bestätigt oder ergänzt |
| **Blocker** | App-Familie unklar / Datenbedarf unbekannt / Ghost-Card-Fragen offen |
| **Claude darf** | Fragen stellen (max. 2 pro Runde), Material sichten, offene Fragen sammeln |
| **Claude darf nicht** | Spec schreiben, Code schreiben, Entscheidungen treffen |

**APP-INTERFACE.md:** Pflichtlektüre wenn Ghost-Card, data-* Attribute oder Datenquellen betroffen.

---

### Spec Gate

**Zweck:** Sicherstellen, dass die APP_SPEC vollständig und widerspruchsfrei ist.

| | |
|---|---|
| **Input** | Vollständige APP_SPEC.md |
| **Output** | Freigabe zur Implementierungsplanung (Phase 4) |
| **Entscheidet** | Albert — explizites OK erforderlich |
| **Blocker** | Ghost-Card-Vertrag nicht aus APP-INTERFACE.md / AppContext-Schema fehlt / A11y-Vertrag fehlt / Reise eines Inputs fehlt / Offene Fragen still entschieden |
| **Claude darf** | Spec-Checkliste durchlaufen, Blocker benennen, Klärung vorschlagen |
| **Claude darf nicht** | Implementierung beginnen, Code schreiben, Scope-Funde still entscheiden |

**APP-INTERFACE.md:** Prüfgrundlage für §3 (Redakteursvertrag), §5 (data-options), §6 (Datenquellen), §7 (Sicherheitsregeln), §8 (Empty-State), §9 (Cache-Busting).

---

### Pre-Code Gate

**Zweck:** Formal sicherstellen, dass alle Voraussetzungen für die Codearbeit erfüllt sind.

| | |
|---|---|
| **Input** | Spec Gate bestanden, SECURITY-BASELINE.md gelesen, APP_FACTORY_IMPLEMENTATION_RFC.md gelesen, Slice-Plan dokumentiert |
| **Output** | Freigabe zum ersten Workpackage |
| **Entscheidet** | Albert — explizites OK |
| **Blocker** | Tabu-Zone betroffen / Spec-Lücke / Sicherheitsregel verletzt / Mehr als 3 zentrale Dateien ohne Freigabe |
| **Claude darf** | /pre-code-gate full ausführen, Ergebnis zeigen, Fragen stellen |
| **Claude darf nicht** | Code schreiben ohne OK, Scope erweitern, Fremdcode anfassen |

**Werkzeug:** `/pre-code-gate full` (CLAUDE.md — App-Arbeit ist immer Full-Gate)

---

### Review Gate

**Zweck:** Code-Qualität, Sicherheit und Standard-Konformität vor dem Testplan prüfen.

| | |
|---|---|
| **Input** | Alle Workpackages abgeschlossen, /patch-quittung für jeden Patch vorliegt |
| **Output** | Freigabe zum manuellen Testplan |
| **Entscheidet** | Claude führt Review durch; Albert entscheidet bei Blocker-Funden |
| **Blocker** | innerHTML-Nutzung für Nutzdaten / unvalidierte URLs / data-app statt data-fw-app / fehlender AppContext / fehlende State-Behandlung |
| **Claude darf** | code-quality-faang-review ausführen, Checkliste abarbeiten, Funde benennen |
| **Claude darf nicht** | Release vorbereiten, Testplan überspringen |

---

### Release Gate

**Zweck:** Sicherstellen, dass alle Exit-Kriterien erfüllt sind und die App fertig für den Einsatz in Ghost ist.

| | |
|---|---|
| **Input** | Review Gate bestanden, manueller Testplan abgeschlossen, Albert hat getestet und bestätigt |
| **Output** | /abschluss-ritual freigegeben |
| **Entscheidet** | Albert — explizites OK nach manuellem Test |
| **Blocker** | Offener Testfall / ungeklärter Sicherheitsfund / Ghost-Card-Beispiel nicht funktionsfähig / Calculator-Template nicht dokumentiert (Pilot-1) |
| **Claude darf** | Abschluss-Ritual vorbereiten, Pilot-Auswertung schreiben |
| **Claude darf nicht** | Als abgeschlossen deklarieren ohne Alberts Testbestätigung |

**Für alle Gates gilt:**
- APP-INTERFACE.md ist Pflichtreferenz, sobald Ghost-Card, data-* Attribute, Datenquellen oder Embed-Verträge betroffen sind.
- Offene Fragen werden nie still entschieden.
- Scope-Funde → 02_OPEN_QUESTIONS.md (App-Fabrik-Fragen) oder docs/steering/BACKLOG.md (Arbeitspakete).

---

## 5. Artefakte pro App

*Diese Struktur ist Draft und wird nach Pilot-1 validiert. → 03_APP_FACTORY_STANDARD_DRAFT.md §5, F-03*

```
/Apps/{slug}/
  README.md             — Zweck, Funnel-Block, Inputs, Outputs, Annahmen, Modulrolle
  APP_SPEC.md           — technische Spezifikation (Ergebnis von Phase 2)
  app.config.json       — Texte, Defaults, Slider-Grenzen, Szenarien, Whitelists
  app.data.csv          — tabellarische Zeitreihen (optional; wenn extern: Verweis)
  data/                 — alternativ zu app.data.csv bei mehreren Datendateien
  app.js                — dünne app-spezifische Logik (kein Shell-Code)
  app.test.html         — lokale Testseite (alle vier States, Live-Server)
  NOTES.md              — Entwicklungsnotizen, Prototypen-Verweise, offene Fragen
```

**Ghost-Card-Beispiel** ist Pflicht und wird in APP_SPEC.md dokumentiert (alternativ als `ghost-card.example.html`).

**APP_SPEC.md muss mindestens enthalten:**

| Abschnitt | Pflicht |
|---|---|
| Zweck / Nutzerfrage / Kernaussage | ✅ |
| App-Familie | ✅ |
| Inputs und Outputs | ✅ |
| Datenbedarf (CSV, JSON, keine) | ✅ |
| Ghost-Card-Beispiel gemäß docs/spec/APP-INTERFACE.md | ✅ |
| data-fw-options-Whitelist (falls genutzt) | ✅ |
| AppContext-Schema (Pflichtfelder + Fallbacks) | ✅ |
| A11y-Vertrag für diese App-Familie | ✅ |
| State-Modell (Loading / Content / Error / Empty) | ✅ |
| Reise eines Inputs / Datenpunkts (P-10) | ✅ |
| Testfälle | ✅ |
| Offene Fragen (Entscheidung / Arbeitsannahme / offen) | ✅ |
| Steuerungsblock: Zweck, Barriere, Prüfregeln | ✅ |

---

## 6. Umgang mit offenen Fragen

**Grundregel:** Offene Fragen nicht still lösen. Melden — dann entscheiden lassen.

| Art | Wohin |
|---|---|
| App-Fabrik-Fragen (Architektur, UX, Daten, Workflow) | `02_OPEN_QUESTIONS.md` |
| Echte Arbeitspakete mit Aufwand | `docs/steering/BACKLOG.md` |
| Getroffene Entscheidungen | `01_DECISION_LOG.md` |
| Geklärte Fragen in 02_OPEN_QUESTIONS.md | Status: ✅ geklärt + Verweis auf DECISION_LOG setzen |

**Verboten:** Neue Backlog-Dateien, zweite OPEN_QUESTIONS-Register, parallele Entscheidungs-Listen.

**Scope-Funde:** Jede Frage, die beim Arbeiten entsteht und über den aktuellen Auftrag hinausgeht, ist ein Scope-Fund. Scope-Funde werden sofort gemeldet und eingeordnet — nicht still im laufenden Workpackage mitgelöst.

---

## 7. Umgang mit APP-INTERFACE.md

- `docs/spec/APP-INTERFACE.md` liegt unter `docs/spec/` und bleibt dort — nicht kopieren, nicht duplizieren.
- Sie ist die **kanonische Schnittstellen-Spec** für alle Apps und Charts.
- Keine zweite APP-INTERFACE.md unter `docs/App-Fabrik/` anlegen.
- Änderungen am Interface-Vertrag (neue Attribute, neue Regeln) brauchen bewusste Entscheidung, `/spec-rewrite-guard`, und Dokumentation in `01_DECISION_LOG.md`.
- `AUTHOR_GUIDE-v3.md` harmonisieren: Backlog AF-04 — nach Pilot 1, wenn Vertrag stabil.
- fw-app Cheat-Sheet erstellen: Backlog AF-05 — nach Pilot 1.
- Bestehende Ghost-HTML-Cards mit `data-app` (falls vorhanden): kein Breaking Change, solange kein fw-app-Bootstrapper aktiv ist.

**Was APP-INTERFACE.md enthält (Schnittstellen-Scope):**

| Thema | Zuständigkeit |
|---|---|
| fw-app Attribut-Referenz | APP-INTERFACE.md §3.1 |
| financial-chart-module Attribut-Referenz | APP-INTERFACE.md §3.2 |
| data-fw-options Syntax und Whitelist-Prinzip | APP-INTERFACE.md §5 |
| Erlaubte Datenquellen und Domains | APP-INTERFACE.md §6 |
| Sicherheitsregeln (SafeDOM, URL-Validierung, etc.) | APP-INTERFACE.md §7 |
| Empty-State und State-Pflicht | APP-INTERFACE.md §8 |
| Cache-Busting | APP-INTERFACE.md §9 |

**Was nicht in APP-INTERFACE.md gehört** (und wohin es gehört):

| Thema | Zuständigkeit |
|---|---|
| App-Familien, Dateistruktur, DoD | 03_APP_FACTORY_STANDARD_DRAFT.md |
| Architekturprinzipien P-01–P-10 | 03_APP_FACTORY_STANDARD_DRAFT.md §10, CHART_ENGINE_ROLE_AND_INTEGRATION.md |
| AppContext-Schema konkret | APP_SPEC.md pro App + Arch-06 |
| Redakteursdoku, Cheat-Sheets | docs/editorial/ (nach Pilot 1) |

---

## 8. Umgang mit Chart-Engine

- Die Chart-Engine ist Visualisierungs-Subsystem — kein App-Fabrik-Produkt.
- Apps bauen keine eigene Chart-Logik — sie nutzen die Chart-Engine als Baustein.
- App-interne Chart-Nutzung erst nach definierter ChartAdapter/API. Genaue Schnittstelle noch offen → APP-INTERFACE.md §4.
- Der bestehende Standalone-Vertrag (`financial-chart-module`) bleibt vollständig gültig und wird nicht auf `fw-app` migriert.
- **Chart-Engine-Änderungen brauchen immer ein separates Gate und Alberts explizite Freigabe** — unabhängig von diesem Workflow.
- Architekturprinzipien P-01–P-10 sind als **Referenzmuster** für App-Fabrik-Apps gültig. Chart-spezifische Mechanik (Canvas-Pixel-Logik, Density Matrix, Chart.js-Plugin-Struktur) bleibt chart-spezifisch und wird nicht übertragen.

---

## 9. Pilot-1-Sonderregeln

Für `prokrastinations-preis`:

- **Ziel ist nicht nur eine fertige App.** Ziel ist Validierung des Calculator-Familien-Templates und Verifikation des gesamten Workflows.
- **Arch-06** (AppContext-Schema): Nur für Calculator konkretisieren — keine globale Lösung für alle Familien erzwingen.
- **Arch-07** (A11y-Vertrag): Nur für Calculator konkretisieren — dann familien-weise erweitern.
- **Ghost-Card** muss dem fw-app-Vertrag aus `docs/spec/APP-INTERFACE.md` entsprechen.
- **Kein `data-app`** in neuen App-Fabrik-Ghost-Cards.
- **`data-fw-theme`** nicht produktiv verwenden — reserviert, nicht implementiert.
- **Erkenntnisse zurückführen:** Was bestätigt, was korrigiert, was bleibt offen → §8 Pilot-Auswertung.
- **Exit-Kriterien:** → `05_PILOT_STRATEGY.md`

---

## 10. Do / Don't

**Do:**
- Kleine, überprüfbare Schritte
- Diffs und Patch-Quittung nach jedem Patch
- Bestehende Struktur respektieren (vorhandene Prototypen, PROTECTED_PATHS.json)
- Erst Spec, dann Gate, dann Code
- Scope-Funde sofort melden und einordnen
- Zentrale Backlog-Struktur nutzen (`docs/steering/BACKLOG.md`)
- APP-INTERFACE.md bei allen Schnittstellenfragen lesen
- AppContext explizit mit Pflichtfeldern beschreiben
- Reise eines Inputs vor Codearbeit durchdenken

**Don't:**
- Keinen neuen Backlog anlegen
- Keine neuen Skills/Commands ohne Freigabe
- Keine App-Ordner verschieben oder umbenennen
- Kein produktiver Code ohne Gate
- Keine Chart-Engine-Refactorings nebenbei
- Keine offenen Fragen stillschweigend entscheiden
- Keine zweite Interface-Spec anlegen
- Kein `data-app` in neuen App-Fabrik-Ghost-Cards
- Kein `data-fw-theme` produktiv verwenden
- Kein `innerHTML` für Nutzdaten
- Keinen freien JSON-String in `data-fw-options`

---

## 11. Skills und Commands — Übersicht

| Phase | Werkzeug | Rolle |
|---|---|---|
| Session-Start | `/start` | Projektzustand laden, BLOCKED prüfen |
| Phase 0 | `/intake` | Arbeitspaket erfassen |
| Phase 1 | `01-process-extreme-ownership` | Briefing auf Lücken und Scope-Risiken prüfen |
| Phase 2 | `app-spec-create` | APP_SPEC.md-Erstellung koordinieren |
| Phase 2 ergänzend | `spec-mode-architecture` | technische Architekturfragen klären |
| Phase 3 | `/pre-code-gate full` | Full-Gate (immer bei App-Arbeit) |
| Phase 4 | `impl-mode-workpackages` | Arbeitspakete schneiden |
| Phase 5 | `/patch-quittung` | Quittung nach jedem Patch |
| Phase 6 | `code-quality-faang-review` | Qualitätsgate |
| Phase 7 | `manual-test-plan` | Reproduzierbarer Testplan |
| Phase 8 | `/abschluss-ritual [AP-N]` | App abschließen, Learning zurückführen |
| Spec-Änderung | `/spec-rewrite-guard` | Vor Änderungen an docs/spec/-Dateien |
| Bulk-Read | `/subagent-dispatch` | Bei Datei-Suche oder parallelen Teilaufgaben |

---

## 12. Nächster Schritt

Nach Freigabe dieser V0.2 durch Albert:

1. **BACKLOG-AP prüfen** für Pilot 1 (`prokrastinations-preis`): Existiert bereits ein AP in `docs/steering/BACKLOG.md`? → bestehenden AP verwenden. Falls nicht → neuen AP im bestehenden Backlog anlegen. Keine parallele Backlog-Struktur anlegen.
2. **Phase 0 starten** — App-Ordner sichten, APP_INVENTORY prüfen, APP-INTERFACE.md lesen
3. **APP_SPEC.md erstellen** — per `app-spec-create`; `spec-mode-architecture` nur ergänzend für technische Architekturfragen; mit AppContext-Schema (Arch-06) und A11y-Vertrag Calculator (Arch-07) als Pflichtabschnitte
4. **Spec Gate** — Albert bestätigt Spec
5. **Pilot 1 bauen**

---

## Offene Punkte in diesem Draft

| ID | Frage | Quelle |
|---|---|---|
| Wf-01 | Wann braucht die App-Fabrik eigene Commands? | 02_OPEN_QUESTIONS.md — nach Pilot entscheiden |
| Wf-02 | App-Briefing-Protokoll für /intake verfeinern | 02_OPEN_QUESTIONS.md — nach Pilot |
| Wf-03 | Factory-Migration bestehender Prototypen | 02_OPEN_QUESTIONS.md — Legacy als `_legacy/` behalten |
| Wf-04 | Test-Gate Definition of Done vollständig? | Exit-Kriterien in 05_PILOT_STRATEGY.md |
| Arch-06 | AppContext-Schema: Pflichtfelder pro App-Familie | Erstmalig für Calculator in Pilot-1-APP_SPEC |
| Arch-07 | A11y-Vertrag: Konkrete Darstellung pro Familie | Erstmalig für Calculator in Pilot-1-APP_SPEC |
