# Skill: tech-spec-app

## Zweck

Dieser Skill erzeugt oder prüft die technische Grundlage einer APP_SPEC.md für eine App der Finanzwesir-App-Fabrik.

Die App-Fabrik baut keine 21 Einzelanfertigungen. Sie baut standardisierte Apps auf gemeinsamer Architektur, gemeinsamen Schnittstellen, gemeinsamer Datenlogik, gemeinsamen UI-Primitiven und gemeinsamen Qualitätsregeln.

Dieser Skill deckt die technische Pflicht ab:
- App-Familie bestimmen
- fachlichen Rohkern aus Mini-Spec übernehmen
- Datenbedarf klären
- Ghost-Card-Vertrag definieren
- data-fw-options-Whitelist definieren
- State-Modell definieren
- AppContext definieren
- A11y-Vertrag definieren
- Sicherheitsregeln übernehmen
- Testfälle vorbereiten
- Spec-Gate-Checkliste erstellen

Dieser Skill erzeugt noch keine Implementierung.

Die UX-/Wirkungsdimension wird anschließend durch den Skill heldenreise ergänzt.

## Wann verwenden?

Immer wenn eine technische App-Spec erstellt oder geprüft wird:
- neue APP_SPEC.md
- Überarbeitung bestehender APP_SPEC.md
- Pilot-App
- App-Familien-Template
- Spec-Gate-Vorbereitung
- Abgleich einer bestehenden APP_SPEC.md mit MINI_SPEC_FROM_HAUPTDOKUMENT.md

Pflicht bei jeder App-Fabrik-App.

## Pflichtquellen

Für jede App unter /Apps/{slug}/ müssen diese Quellen geprüft werden:

App-spezifisch:
- /Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md
- /Apps/{slug}/APP_SPEC.md, falls vorhanden
- weitere vorhandene Dateien im App-Ordner, falls vorhanden

App-Fabrik-Standard:
- docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md
- docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md
- docs/spec/APP-INTERFACE.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md (Pflicht vor Übergabe an Pre-Code-Gate)
- docs/App-Fabrik/01_DECISION_LOG.md
- docs/App-Fabrik/02_OPEN_QUESTIONS.md
- docs/App-Fabrik/APP_INVENTORY.md
- docs/App-Fabrik/05_PILOT_STRATEGY.md
- docs/steering/audits/SECURITY-BASELINE.md, falls vorhanden

UX-/Wirkung:
- Skill heldenreise wird nach diesem Skill angewendet.
- tech-spec-app darf die Heldenreise nicht ersetzen.

Grenzziehung Implementation-RFC:
- tech-spec-app erzeugt die APP_SPEC (fachliche + technische Spec, Ghost-Card-Vertrag, AppContext, A11y).
- APP_FACTORY_IMPLEMENTATION_RFC.md regelt Build-System, Framework, CSS-Isolation, Teststrategie, Code-Ablage, Vertical Slicing.
- Diese Entscheidungen gelten projektübergreifend für alle App-Fabrik-Apps — sie werden nicht app-lokal neu erfunden.

## Quellenhierarchie

Bei Konflikten gilt:
1. docs/spec/APP-INTERFACE.md ist kanonisch für Schnittstellen, Ghost-Cards, data-fw-*, Datenquellen, data-options, Sicherheitsregeln, Empty-State und Cache-Busting.
2. 03_APP_FACTORY_STANDARD_DRAFT.md ist maßgeblich für App-Fabrik-Prinzipien, App-Familien, 5-Layer-Modell und Definition of Done.
3. CHART_ENGINE_ROLE_AND_INTEGRATION.md ist maßgeblich für Chart-Engine-Einordnung.
4. MINI_SPEC_FROM_HAUPTDOKUMENT.md ist maßgeblich für den fachlichen Rohkern der App.
5. Bestehende APP_SPEC.md wird respektiert, aber gegen Mini-Spec und Standards geprüft.
6. heldenreise ist maßgeblich für Beweisdramaturgie und Entscheidungspsychologie.

Keine stillen Annahmen bei Widersprüchen. Widersprüche werden als offene Fragen oder Scope-Funde markiert.

## Grundregeln

Immer tun:
- Mini-Spec lesen.
- App-Ordner prüfen.
- Bestehende APP_SPEC.md lesen, falls vorhanden.
- Fachlichen Kern aus der Mini-Spec übernehmen.
- App-Familie bestimmen.
- Systemarchitektur nach App-Fabrik-Standard aufbauen.
- APP-INTERFACE.md für Ghost-Card und Datenquellen anwenden.
- Entscheidungen, Arbeitsannahmen und offene Fragen trennen.
- Scope-Funde sichtbar machen.
- Keine Code-Arbeit vor Spec-Gate.

Nie tun:
- Keine produktiven Code-Dateien erstellen.
- Keine app.js, app.test.html, CSS oder Theme-Dateien erzeugen.
- Keine Chart-Engine ändern.
- Keine APP_SPEC.md blind überschreiben.
- Keine App-Ordner verschieben oder umbenennen.
- Keine zweite Interface-Spec anlegen.
- Kein data-app für neue App-Fabrik-Cards.
- Kein data-fw-theme produktiv verwenden.
- Keine komplexen JSON-Strukturen in data-fw-options.

## Eingabe

Dieser Skill wird auf einen bestehenden App-Ordner angewendet:

/Apps/{slug}/

Beispiele:
- /Apps/prokrastinations-preis/
- /Apps/geburtsjahrlos/
- /Apps/risiko-uebersetzer/

## Erwartete Ausgangslage

### Fall A — APP_SPEC.md existiert bereits

Dann:
1. APP_SPEC.md lesen.
2. MINI_SPEC_FROM_HAUPTDOKUMENT.md lesen.
3. Abgleichen:
   - fachlicher Kern übernommen?
   - technische Pflichtabschnitte vorhanden?
   - Schnittstellenvertrag korrekt?
   - offene Fragen sichtbar?
4. Nur gezielt ergänzen.
5. Keine komplette Neuerstellung ohne explizite Freigabe.

### Fall B — nur MINI_SPEC_FROM_HAUPTDOKUMENT.md existiert

Dann:
1. Mini-Spec lesen.
2. App-Familie bestimmen.
3. Neue APP_SPEC.md erzeugen.
4. Technische Pflichtstruktur vollständig anlegen.
5. Danach heldenreise anwenden.

### Fall C — keine Mini-Spec vorhanden

Dann abbrechen mit Meldung:

Für /Apps/{slug}/ fehlt MINI_SPEC_FROM_HAUPTDOKUMENT.md.
Bitte zuerst Mini-Spec aus ETF-Apps-Hauptdokument erzeugen.
Keine APP_SPEC.md aus dem Nichts erstellen.

## APP_SPEC.md — technische Pflichtstruktur

Eine technische APP_SPEC.md muss mindestens diese Abschnitte enthalten:

1. Status
- Status: Draft
- Phase
- Kein Code-Freigabe-Dokument
- Grundlage für Spec-Gate
- Quelle: MINI_SPEC_FROM_HAUPTDOKUMENT.md

2. Zweck und Nutzerfrage
- Welche konkrete Nutzerfrage beantwortet die App?
- Was soll die App auslösen?
- Was ist die Kernaussage?
- Was ist nicht Ziel dieser App?

3. App-Familie
Bestimmen nach App-Fabrik-Standard:
- Calculator / Rechner-App
- Szenario-/Vergleichs-App
- Diagnose-/Test-App
- Explorer-/Karten-App
- Storytelling-Dashboard
- Chart-/Datenvisualisierung
- Companion-/Erklärmodul

Pflicht:
- Warum diese Familie?
- Welche wiederverwendbaren Bausteine werden getestet?
- Welche App-Familien-Risiken gibt es?

4. Bezug zu Produktlandkarte / Multi-Modul-Struktur
Pflicht bei Multi-Modul-Familien:
- Master-App
- Erweiterungsmodul
- Companion-App
- Gegenperspektive
- App-Ordner-Bezug
- Scope dieser Spec

Bekannte Multi-Modul-Strukturen:
B2 Geburtsjahrlos:
- geburtsjahrlos = Haupt-App
- rollierende-sparplaene = Erweiterungsmodul / rollierender Startjahrvergleich

C1 Diversifikation:
- diversifikations-detektor = Haupt-App
- investment-universum = Gegenperspektive / Grundmodell
- weltkarte-etf-indizes = Companion-App / visuelles Lernmodul

5. Inputs
Pflicht:
- Nutzer-Eingaben
- Defaults
- Wertebereiche
- Einheiten
- Validierungsregeln
- Eingabequelle: UI, data-fw-options, data-fw-data, data-fw-config, interne Config, CSV/JSON

Regeln:
- Werte und Einheiten trennen.
- Keine unvalidierten Daten.
- Keine versteckten Defaults.
- Defaults begründen.

6. Outputs
Pflicht:
- Hauptzahl / Hauptvisualisierung
- Nebenwerte
- Ergebnistext
- Annahmenbox
- CTA
- A11y-Ausgabe
- Error/Empty-Ausgaben

Regel:
Nicht alle Outputs gleich gewichten. Hauptwert und Nebenwerte unterscheiden.

7. Datenbedarf
Klären:
- Keine externe Datenquelle?
- CSV nötig?
- JSON-Konfiguration nötig?
- data-fw-data nötig?
- data-fw-config nötig?
- interne Config ausreichend?
- historische Daten nötig?
- Datenvalidierung?
- Cache-Busting?
- Domain-/Pfadregeln?

Bei CSV/JSON:
- erwartete Spalten / Felder
- Typen
- Pflichtfelder
- Fallbacks
- Fehlerzustände

8. Ghost-Card-Vertrag
Gemäß docs/spec/APP-INTERFACE.md.

Pflicht:
- Minimalcard
- optionale Card mit data-fw-options, falls genutzt
- optionale Card mit data-fw-data, falls genutzt
- optionale Card mit data-fw-config, falls genutzt

Regeln:
- Neue Apps nutzen class="fw-app" und data-fw-app.
- Kein data-app.
- Kein produktives data-fw-theme.
- Kein freies JSON in data-fw-options.

Minimalbeispiel:

<div class="fw-app"
     data-fw-app="{slug}">
</div>

9. data-fw-options-Whitelist
Falls genutzt:
- erlaubte Keys
- Typ
- Default
- Min
- Max
- Fallback
- Verhalten bei unbekannten Keys
- Verhalten bei ungültigen Werten

Falls nicht genutzt:
Diese App nutzt in V1 keine data-fw-options.

10. State-Modell
Pflichtzustände:
- Init
- Loading
- Content
- Error
- Empty

Für jeden State:
- Auslöser
- Nutzeranzeige
- technische Ursache
- Sicherheitsregel
- Fallback

Regeln:
- Kein leerer Container.
- Kein Stacktrace für Endnutzer.
- Error-State menschlich, nicht technisch.
- Empty-State statt Crash.

11. AppContext-Schema
Pflicht:
- statischer Kern
- dynamische Schale
- Pflichtfelder
- Fallback-Felder
- wer erzeugt den Context
- wer konsumiert ihn

Regeln:
- Strategy erzeugt Ergebnisdaten + AppContext.
- Renderer interpretiert keine Rohdaten.
- Werte und Einheiten reisen getrennt.
- Semantische Rollen statt Farben.
- resultTone, falls genutzt, ist semantisch, nicht visuell.

12. A11y-Vertrag
Pflicht:
- Screenreader-Zusammenfassung
- Tastaturbedienung
- Live Region, falls Ergebnisse live aktualisiert werden
- alternative Darstellung für Visualisierungen
- sichtbare Labels
- keine rein visuelle Ergebnisvermittlung
- prefers-reduced-motion, falls Animation genutzt wird

13. Reise eines Inputs / Datenpunkts
Pflichtabschnitt nach App-Fabrik-Prinzip P-10.

Beschreibe einen konkreten Input oder Datenpunkt durch:
1. Quelle: Ghost-Card, Config, CSV/JSON oder UI
2. Parsing und Validierung
3. read-only AppData
4. Strategie
5. AppContext
6. Renderer
7. A11y-Ausgabe

14. UX/UI-Primitiven
Technisch benennen:
- benötigte UI-Primitiven
- Zweck
- Status: vorhanden, zu bauen, aus Design-System abzuleiten
- Bezug zur App-Familie
- Bezug zur späteren Heldenreise

Hinweis:
Die Wirkungslogik selbst kommt aus dem Skill heldenreise.

15. Sicherheitsregeln
Mindestens:
- alle data-* Attribute sind untrusted input
- SafeDOM
- keine innerHTML-Nutzdaten
- Whitelist
- keine externen Scripts ohne Architekturentscheidung
- keine Tokens
- CSV/JSON validieren
- Domain-/Pfadregeln
- Empty-State statt Crash
- keine geheimen Annahmen in Datenquellen

16. Testfälle
Mindestens:
- Minimalcard lädt
- ungültiger data-fw-app-Slug
- unbekannte Optionen
- ungültiger Optionswert
- XSS-Versuch in Optionswert
- fehlende Datenquelle, falls relevant
- ungültige Datenquelle, falls relevant
- Mobile 375px
- Tablet
- Desktop
- Tastaturbedienung
- reduced motion
- A11y-Ausgabe
- Error-State
- Empty-State

17. Offene Fragen
Trennen:
- Blocker
- Nicht-Blocker
- spätere Backlog-Themen
- Entscheidungen für Albert
- Scope-Funde

Keine offenen Fragen still lösen.

18. Spec-Gate-Checkliste
Technik prüfen:
- Ghost-Card-Vertrag korrekt?
- Kein data-app?
- Kein produktives data-fw-theme?
- data-fw-options whitelistbar?
- Datenquellen und Cache-Busting geklärt?
- AppContext definiert?
- Pflichtfelder / Fallbacks getrennt?
- A11y-Vertrag definiert?
- State-Modell definiert?
- Reise eines Inputs vollständig?
- Sicherheitsregeln erfüllt?
- Keine offenen Blocker?
- Mini-Spec berücksichtigt?

UX-Gate aus heldenreise wird nach Anwendung des Skills ergänzt.

## Umgang mit bestehenden APP_SPEC.md-Dateien

Wenn APP_SPEC.md existiert:
- nicht überschreiben
- vollständig lesen
- mit Mini-Spec abgleichen
- technische Lücken identifizieren
- gezielt ergänzen
- Entscheidungen nicht rückgängig machen, außer sie widersprechen kanonischen Standards
- Änderungen sichtbar im Diff halten

## Umgang mit Mini-Specs

MINI_SPEC_FROM_HAUPTDOKUMENT.md ist Pflichtquelle.

Aus der Mini-Spec übernehmen:
- App-Titel
- Block
- Slug
- fachliche Erklärung
- Nutzerfrage
- Interaktionsidee
- UI-/UX-Hinweise
- Datenbedarf
- Implementationshinweise
- Microcopy-Rohmaterial
- Scope-Hinweise

Wenn Mini-Spec und technische Standards kollidieren:
- nicht still entscheiden
- Konflikt dokumentieren
- Arbeitsannahme oder offene Frage markieren

## Umgang mit Chart-Engine

Falls App Charts benötigt:
- CHART_ENGINE_ROLE_AND_INTEGRATION.md lesen
- Chart-Engine bleibt Visualisierungs-Subsystem
- Apps bauen keine eigene Chart-Logik
- App-interne Chart-Nutzung erst nach definierter ChartAdapter/API
- Standalone-Chart-Vertrag financial-chart-module nicht mit fw-app vermischen
- Chart-Scope bewusst entscheiden: Pilot-Scope, späterer Scope oder eigenes Arbeitspaket

## Abschlussausgabe des Skills

Am Ende muss Claude melden:
- APP_SPEC.md erstellt oder aktualisiert?
- Welche Quellen gelesen?
- Welche Inhalte aus Mini-Spec übernommen?
- Welche technischen Entscheidungen getroffen?
- Welche Arbeitsannahmen gesetzt?
- Welche Blocker offen?
- Welche Nicht-Blocker / Scope-Funde offen?
- Ob heldenreise noch angewendet werden muss.
- Ob die Spec technisch gate-nah ist.
- Git-Diff zeigen.

## Abschlussregel

Eine technische APP_SPEC ist erst bereit für den nächsten Schritt, wenn sie diese Frage beantwortet:

Kann diese App nach App-Fabrik-Standard sicher, reproduzierbar und ohne Sonderlocken implementiert werden?

Danach muss zusätzlich heldenreise angewendet werden, um diese Frage zu beantworten:

Welche Entscheidung verändert diese App im Kopf des Nutzers — und wie beweist die UI das interaktiv?
