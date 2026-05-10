# Command: app-spec-create

## Zweck

Erstellt oder aktualisiert eine vollständige APP_SPEC.md für eine App der Finanzwesir-App-Fabrik.

Dieses Command orchestriert:
1. Intake des App-Ordners
2. Lesen der Mini-Spec
3. technische App-Spec mit Skill tech-spec-app
4. UX-/Wirkungsdramaturgie mit Skill heldenreise
5. Spec-Gate-Vorbereitung

Es erzeugt keinen produktiven Code.

## Aufruf

/app-spec-create {slug}

Beispiele:
- /app-spec-create prokrastinations-preis
- /app-spec-create geburtsjahrlos
- /app-spec-create risiko-uebersetzer

{slug} muss einem bestehenden Ordner unter /Apps/{slug}/ entsprechen.

## Strikte Regeln

- Kein produktiver Code.
- Keine app.js.
- Keine app.test.html.
- Kein CSS.
- Keine Theme-Änderungen.
- Keine Chart-Engine-Änderungen.
- Keine neuen App-Ordner.
- Keine App-Ordner umbenennen.
- Keine bestehenden APP_SPEC.md blind überschreiben.
- Keine neuen Backlogs.
- Keine neuen Skills oder Commands.
- Keine Implementierung vor Spec-Gate und Pre-Code-Gate.

## Pflichtpfade

Für {slug} gelten:

/Apps/{slug}/
/Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md
/Apps/{slug}/APP_SPEC.md

Wenn /Apps/{slug}/ nicht existiert:
Abbrechen. App-Ordner existiert nicht.

Wenn MINI_SPEC_FROM_HAUPTDOKUMENT.md nicht existiert:
Abbrechen. Mini-Spec fehlt.
Erst Mini-Spec aus docs/App-Fabrik/ETF-Apps-Hauptdokument.md erzeugen.

Wenn APP_SPEC.md existiert:
Bestehende Spec lesen und gezielt aktualisieren.
Nicht neu schreiben.

Wenn APP_SPEC.md nicht existiert:
Neue APP_SPEC.md erzeugen.

## Pflichtquellen

Vor Erstellung oder Aktualisierung lesen:
- /Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md
- /Apps/{slug}/APP_SPEC.md, falls vorhanden
- weitere Dateien unter /Apps/{slug}/, falls vorhanden
- docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md
- docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md
- docs/spec/APP-INTERFACE.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/App-Fabrik/01_DECISION_LOG.md
- docs/App-Fabrik/02_OPEN_QUESTIONS.md
- docs/App-Fabrik/APP_INVENTORY.md
- docs/App-Fabrik/05_PILOT_STRATEGY.md
- docs/steering/audits/SECURITY-BASELINE.md, falls vorhanden

Zusätzlich anwenden:
- Skill tech-spec-app
- Skill heldenreise

## Ablauf

### Phase 0 — Intake

1. Prüfe, ob /Apps/{slug}/ existiert.
2. Liste vorhandene Dateien im App-Ordner.
3. Prüfe, ob MINI_SPEC_FROM_HAUPTDOKUMENT.md existiert.
4. Prüfe, ob APP_SPEC.md existiert.
5. Lies APP_INVENTORY.md.
6. Bestimme:
   - App-Familie
   - Funnel-Block
   - Master-App / Modulrolle
   - Multi-Modul-Beziehungen
7. Melde Scope-Funde.

Kein Code.

### Phase 1 — Mini-Spec-Auswertung

Lies MINI_SPEC_FROM_HAUPTDOKUMENT.md.

Extrahiere:
- App-Titel
- App-ID
- Block
- Slug laut Hauptdokument
- fachliche Erklärung
- Nutzerfrage
- Interaktion
- Datenbedarf
- UI-/UX-Hinweise
- Implementationshinweise
- Microcopy-Rohmaterial
- offene Fragen

Keine freie Neuerfindung.

Wenn die Mini-Spec unklar oder dünn ist:
- Arbeitsannahmen markieren
- offene Fragen markieren
- nicht blockieren, wenn Spec mit klaren Annahmen möglich ist

### Phase 2 — Technische APP_SPEC

Wende Skill tech-spec-app an.

Ziel:
- technische APP_SPEC.md erstellen oder aktualisieren
- App-Familie definieren
- Inputs / Outputs definieren
- Datenbedarf definieren
- Ghost-Card-Vertrag nach APP-INTERFACE.md definieren
- data-fw-options-Whitelist definieren
- State-Modell definieren
- AppContext definieren
- A11y-Vertrag definieren
- Reise eines Inputs / Datenpunkts definieren
- Sicherheitsregeln definieren
- Testfälle definieren
- technische Spec-Gate-Checkliste definieren

Kein Code.

### Phase 3 — Heldenreise / Beweisdramaturgie

Wende Skill heldenreise an.

Ziel:
APP_SPEC.md muss den Abschnitt enthalten:

## Beweisdramaturgie / Entscheidungspsychologie

Dieser Abschnitt muss enthalten:
- Gewohnte Welt / Vorannahme
- Nutzerwiderstand
- Ruf zum Abenteuer
- Interaktiver Beweis
- Aha-Moment
- Emotionale Zielreaktion
- Erkenntnishierarchie
- Dramaturgische UI-Reihenfolge
- Ehrlichkeitsregeln
- Bewusst nicht in dieser App
- Funnel-Anschluss

Außerdem:
- UX/UI-Primitiven auf die Beweisdramaturgie zurückführen
- Spec-Gate-Checkliste um UX-Gate ergänzen
- Tufte / Krug / FAANG / Ethik prüfen
- Dark-Pattern-Grenzen einhalten

Kein Code.

### Phase 4 — Abgleich bestehender APP_SPEC

Falls APP_SPEC.md bereits existierte:

Prüfe zusätzlich:
- Hat sie den Mini-Spec-Kern übernommen?
- Widerspricht sie der Mini-Spec?
- Sind bewusste Abweichungen markiert?
- Sind technische Standards aktuell?
- Ist heldenreise ergänzt?
- Sind alte Entscheidungen noch gültig?

Nur gezielt aktualisieren.

### Phase 5 — Spec-Gate-Vorbereitung

Am Ende muss APP_SPEC.md eine Checkliste enthalten.

Technik-Gate:
- Ghost-Card-Vertrag korrekt?
- Kein data-app?
- Kein produktives data-fw-theme?
- Datenquellen geklärt?
- data-fw-options whitelistbar?
- State-Modell definiert?
- AppContext definiert?
- A11y-Vertrag definiert?
- Sicherheitsregeln definiert?
- Testfälle definiert?
- Keine offenen technischen Blocker?

UX-Gate:
- Heldenreise vorhanden?
- Interaktiver Beweis klar?
- Aha-Moment definiert?
- Emotionale Zielreaktion definiert?
- Unerwünschte Emotionen ausgeschlossen?
- Erkenntnishierarchie klar?
- Eine Hauptzahl / Hauptvisualisierung?
- Funnel-Anschluss logisch?
- Tufte / Krug / FAANG berücksichtigt?
- Ethikgrenzen eingehalten?

## Umgang mit Multi-Modul-Apps

Wenn {slug} Teil einer Multi-Modul-Struktur ist:

B2 Geburtsjahrlos:
- geburtsjahrlos
- rollierende-sparplaene

Dann:
- beide Mini-Specs lesen, wenn relevant
- Haupt-App und Erweiterungsmodul trennen
- gemeinsamen Datenbedarf markieren
- Scope nicht still zusammenziehen

C1 Diversifikation:
- diversifikations-detektor
- investment-universum
- weltkarte-etf-indizes

Dann:
- fachliche Familie markieren
- technische Kopplung nicht still entscheiden
- gemeinsame Begriffe / Datenmodelle markieren
- eigenständige App-Scope-Grenzen klar halten

## Umgang mit prokrastinations-preis

Wenn {slug} = prokrastinations-preis:
- bestehende APP_SPEC.md respektieren
- technische Entscheidungen nicht umwerfen:
  - kein Chart in Pilot 1
  - kein Rendite-Slider in Pilot 1
  - resultTone neutral
  - keine externe data-fw-config
  - Minimal-Ghost-Card mit data-fw-app
- heldenreise ergänzen, falls noch nicht vorhanden
- Mini-Spec-Abweichungen als bewusst übernommen / bewusst verschoben markieren

## Abschlussausgabe

Am Ende berichten:
- Welche Dateien gelesen wurden.
- Ob APP_SPEC.md erstellt oder aktualisiert wurde.
- Welche Inhalte aus der Mini-Spec übernommen wurden.
- Welche technischen Entscheidungen getroffen wurden.
- Welche Heldenreise / Beweisdramaturgie ergänzt wurde.
- Welche Arbeitsannahmen gesetzt wurden.
- Welche echten Blocker offen sind.
- Welche Nicht-Blocker / Scope-Funde offen sind.
- Ob die Spec aus Claude-Sicht Spec-Gate-reif ist.
- Git-Diff zeigen.

## Abschlussregel

Nach diesem Command darf noch kein Code existieren.

Nächster Schritt ist:
Spec-Gate

Danach erst:
Pre-Code-Gate

Danach erst:
Implementierungsplanung
