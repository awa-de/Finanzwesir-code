# Decision Log — App-Fabrik

Stand: 2026-06-04 | APP-01-slice-planung | Geändert von: Claude

**Legende:**
- 🟢 ENTSCHIEDEN — robuste Entscheidung, Grundlage für weitere Schritte
- 🟡 ARBEITSANNAHME — hinreichend gesichert, aber noch nicht endgültig bestätigt
- 🔴 OFFEN — Entscheidung ausstehend, blockiert ggf. weitere Schritte

---

## Architektur

### A-01 — App-Fabrik integriert vorhandenes Claude-Betriebssystem
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Die App-Fabrik wird als Schicht in das bestehende Claude-Betriebssystem integriert. Keine zweite Projektsteuerung, keine zweite Skill-Logik, keine Schattenarchitektur.  
**Quelle:** App-Fabrik_Konsolidierung_Naechste-Schritte_V0-1.md §1

---

### A-02 — Ghost bleibt CMS, Apps als HTML-Cards
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Ghost bleibt das CMS. Apps werden über HTML-Cards (`<div class="fw-app" data-fw-app="...">`) im Artikel eingebettet. Kein iframe als Primärweg.  
**Quelle:** docs/spec/APP-INTERFACE.md + Produktlandkarte V0.2 §2

---

### A-03 — Kein Backend
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** JavaScript läuft clientseitig beim Seitenaufruf. Kein Server-seitiges Rendering, keine Backend-API.  
**Quelle:** ETF-Apps-Hauptdokument.md (Technische Rahmenbedingungen)

---

### A-04 — Design-System-Bridge via CSS Custom Properties
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Apps nutzen dieselbe Theme-Bridge wie die Chart-Engine: CSS Custom Properties aus `screen.css`, gelesen via `FwTheme.js`. Kein `FW_THEME_OVERRIDE`, kein Tailwind CDN in Produktion.  
**Präzisierung (AP-tailwind-02a, 2026-07-13):** Vorproduktive Entwicklungs- und Testphase (vor Ghost-Integration): statische HTML-Testseiten, Visual Boards, Mockups und aktive Referenztemplates laden Tailwind CSS v4 ausschließlich über den kanonischen Play-CDN-Tag `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. Produktionsphase (nach Ghost-Integration): weiterhin kein CDN — Tailwind wird gegen die realen Quellen gebaut, ungenutzte Utilities werden entfernt, das CSS wird minimiert und lokal ausgeliefert (eigener Folgeauftrag, nicht Teil von AP-tailwind-02a). Kein Widerspruch zwischen den Phasen, keine neue Einzelfallentscheidung nötig.
**Präzisierung (AP-tailwind-02d, 2026-07-13):** Play-CDN generiert CSS für zur Laufzeit per JS gesetzte Tailwind-Utilities nicht zuverlässig genug. Für die vorproduktive Phase trägt jede `Apps/{slug}/app.test.html` deshalb genau einen `<style type="text/tailwindcss">`-Manifestblock mit `@source inline(...)`, der die zur Laufzeit gesetzten Utilities explizit safelistet; `tools/check-test-pages.py` prüft Manifest und `app.js` deterministisch auf Mengengleichheit. Zielbild für danach:
```text
Vor Ghost-Integration: Play-CDN + App-Testseiten-Manifest.
Nach Ghost-Integration: kein CDN. Der lokale Tailwind-Build scannt die realen
Theme-, Template- und App-JS-Quellen einschließlich der vollständigen benannten
Klassenlisten; er erzeugt minimiertes, lokal ausgeliefertes CSS.
Ein Produktions-Gate weist nach, dass jede App-Manifest-Utility im erzeugten CSS-Artefakt enthalten ist.
```
Kein Artefaktname, Build-Befehl, Pfad oder Build-Tool an dieser Stelle festgelegt — das bleibt der bestehende Folgeauftrag T1.
**Präzisierung (AP-tailwind-02e, 2026-07-13):** Das Manifest aus AP-tailwind-02d (`@source inline(...)`) safelistet nur die zur Laufzeit gesetzten App-Klassen, registriert aber die CI-Tokens selbst nicht als Tailwind-Utilities — `bg-error-bg`, `border-error-border`, `text-error-text` u. ä. blieben deshalb wirkungslos. Play-CDN-Testseiten brauchen deshalb zusätzlich eine wertfreie `@theme inline`-Bridge (Tailwind-v4-CSS-Syntax, kein `theme.extend`-Objekt), die jeden benötigten CI-Token 1:1 auf sich selbst abbildet (`--color-error-bg: var(--color-error-bg);` usw.) — ausgenommen die drei Bridge-only-Tokens `--color-grid`/`--color-zero-line`/`--color-loader-bg`. Kanonische Textquelle ist `docs/testing/templates/app.test.template.html`; jede `Apps/{slug}/app.test.html` trägt denselben Block bytegleich vor ihrem `@source inline(...)`. `tools/check-test-pages.py` prüft das deterministisch. T1 übernimmt später die Theme-Bridge-Idee (reale Werte statt CDN), nicht das CDN-Safelist-Gerüst selbst.
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §4.1 | Präzisiert: AP-tailwind-02a, 2026-07-13 | AP-tailwind-02d, 2026-07-13 | AP-tailwind-02e, 2026-07-13

---

### A-05 — Chart-Engine als Infrastruktur, nicht als Sonderwelt
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Die Chart-Engine ist ein Subsystem der App-Fabrik. Chart-Apps sind eine App-Familie unter mehreren, kein Sonderfall.  
**Quelle:** ETF-App-Fabrik_Produktlandkarte_V0-2.md §0

---

### A-06 — Gemeinsame App-Shell, keine globale Window-API als App-Vertrag
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Gemeinsame App-Shell macht Container finden, Config lesen, Daten laden, States verwalten. App-spezifische Datei enthält nur Fachlogik. Kein `window.FwAppInit` oder gleichwertige freie globale Window-API als App-Vertrag für app-spezifische Logik.  
**Nicht verboten:** Ein zentral eingebundener Bootstrapper oder eine gemeinsame Runtime, die alle `fw-app`-Container initialisiert — sofern er nicht als freie globale Window-API für app-spezifische Logik missbraucht wird. Siehe A-07 (Langfrist-Bootstrapper) und SECURITY-BASELINE.md §6.9 (Bootstrapper als Sicherheitsperimeter).  
**Offen:** AppRegistry-Implementierung (`AppRegistry.register(slug, factory)` oder ES-Module) noch nicht entschieden.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §3.2

---

### A-07 — Kein Script pro App in der Ghost-Card (Langfrist)
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Langfristig lädt das Theme einmal eine gemeinsame Runtime, die alle `fw-app`-Container initialisiert. Script pro App nur als Übergangslösung für erste Prototypen.  
**Offen:** Bootstrapper-Implementierung ausstehend.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §4.3

---

### A-08 — D3/TopoJSON lokal bundeln
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** TopoJSON, Karten- und Kartenbibliotheks-Abhängigkeiten werden lokal gebundelt. Keine CDN-Sonderregel für die Weltkarte oder andere Nicht-Chart.js-Abhängigkeiten.  
**Begründung:** Konsistenz mit bestehender lokaler Chart.js-Strategie. Reduziert externe Abhängigkeiten, ist DSGVO-freundlicher und vermeidet Sonderlogik für einen Einzelfall.  
**Quelle:** Entschieden: 2026-05-09

---

### A-09 — Read-only AppData nach Ingestion
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Alle Eingaben (CSV, JSON, `data-fw-options`, User Input) werden nach Parsing und Validierung in einem read-only AppData-Objekt abgelegt (`Object.freeze()` oder äquivalentes Schutzmuster). App-Strategien dürfen lesen, nicht mutieren. Transformationen erfolgen auf Kopien oder abgeleiteten ViewModels.  
**Quelle:** Architecture Strategy Paper VX, KDR 1 / Layer 1 Vault | Übernommen: 2026-05-10

---

### A-10 — Two-Step Parsing
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Jeder Parser läuft in zwei Phasen: (1) syntaktisches Parsing — Struktur, Typen, Pflichtfelder prüfen. (2) semantische Analyse / Normalisierung — Bedeutung extrahieren, Defaults setzen, Wertebereiche validieren. Kein Parser überspringt Phase 1, um direkt in Phase 2 zu springen.  
**Quelle:** Architecture Strategy Paper VX, Layer 1 Parser-Vertrag | Übernommen: 2026-05-10

---

### A-11 — Async-fähige öffentliche APIs
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Öffentliche Loader-, Parser- und Init-Methoden werden als `async` designt, auch wenn sie intern zunächst synchron arbeiten. Konkret: `async init()`, `async loadData()`, `async parseConfig()`.  
**Begründung:** Nachträgliche API-Änderung von sync → async bricht alle Aufrufer. Wer von Anfang an `async` designt, ermöglicht spätere Datenquellen (Remote-Fetch, Web Worker) ohne API-Bruch.  
**Offen:** Konkretes Implementierungsmuster für die App-Shell (wird in Pilot-1 festgelegt).  
**Quelle:** Architecture Strategy Paper VX, Layer 1 API | Adaptiert: 2026-05-10

---

### A-12 — AppContext als semantischer Rucksack
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Jede App-Strategie erzeugt neben Ergebnisdaten einen AppContext mit semantischen Informationen für Renderer, Formatierung, A11y, Copy und Layout. Renderer interpretieren nicht selbst Rohdaten — sie lesen den AppContext. Rohdaten verbleiben in AppData.  
**Offen:** Konkretes AppContext-Schema pro App-Familie → `02_OPEN_QUESTIONS.md` Arch-06.  
**Quelle:** Architecture Strategy Paper VX, KDR 9 (`fwContext`) | Adaptiert (kein Chart.js): 2026-05-10

---

### A-13 — Unit Sovereignty
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Mathematik arbeitet mit reinen Zahlen (`42000`, nicht `"42.000 €"`). Einheiten, Währungen, Prozent und Zeitbezüge reisen als Metadaten im AppContext. Renderer rehydriert die Einheit erst bei Anzeige.  
**Merksatz:** Wert und Einheit nie als formatierter String durch die Berechnungsschicht ziehen.  
**Quelle:** Architecture Strategy Paper VX, KDR 10 | Übernommen: 2026-05-10

---

### A-14 — Truthful UX
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Keine erfundenen Datenpunkte, keine versteckte Interpolation, keine Scheingenauigkeit. Fehlende Daten, Annahmen und Grenzen werden sichtbar gemacht. Kein Rechner zeigt Nachkommastellen, die durch die Eingabegenauigkeit nicht gedeckt sind.  
**Konsequenz:** Fachliche Begründung für die Pflicht-AssumptionsBox in Calculator-Apps.  
**Quelle:** Architecture Strategy Paper VX, KDR 7 | Übernommen: 2026-05-10

---

### A-15 — Constraint Dominance
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Wenn Informationsmenge, Screen-Größe und Verständlichkeit kollidieren, gewinnt Verständlichkeit. Mobile darf Details reduzieren, aber nie die Kernaussage verfälschen oder andere Zahlen zeigen als Desktop.  
**Nicht erlaubt:** Mobile-Version zeigt vereinfachte Zahlen, weil es einfacher wirkt.  
**Quelle:** Architecture Strategy Paper VX, KDR 8 (Constraint Dominance) | Adaptiert (ohne Density-Matrix-Algorithmus): 2026-05-10

---

### A-16 — A11y als Strategie-Vertrag
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Barrierefreiheit ist kein nachträgliches Audit. Jede App-Strategie liefert eine A11y-Repräsentation (Tabelle, ARIA Live Region oder Ergebnis-Summary). Der Renderer erfindet keine Barrierefreiheit nachträglich.  
**Mindeststandard:** WCAG 2.1 AA, Tastatur-Navigation, ARIA-Labels für alle interaktiven Elemente.  
**Offen:** Konkrete A11y-Spezifikation pro App-Familie → `02_OPEN_QUESTIONS.md` Arch-07.  
**Quelle:** Architecture Strategy Paper VX, KDR 13 | Übernommen: 2026-05-10

---

### A-17 — Theme-Hoheit: semantische Rollen statt Hex-Werte
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** App-Strategien liefern semantische Rollen (`resultTone: "warning"`), keine freien Hex-Werte oder Inline-Styles. Das Ghost-Theme hat Design-Hoheit. Farbänderungen erfordern nur eine `screen.css`-Änderung, kein App-Code wird angefasst.  
**Erweiterung von:** A-04 (Design-System-Bridge via CSS Custom Properties) — ergänzt die Anforderung, dass semantische Rollen von der Strategie, nicht vom Renderer vergeben werden.  
**Quelle:** Architecture Strategy Paper VX, KDR 14 | Übernommen: 2026-05-10

---

### A-18 — Reise eines Inputs als Pflichtabschnitt in APP_SPEC.md
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Jede `APP_SPEC.md` enthält einen Abschnitt „Reise eines Inputs / Datenpunkts". Er zeigt am Beispiel eines konkreten Werts, wie ein Input durch alle Schichten läuft: Eingang → Two-Step Parsing → AppData (read-only) → Strategie → AppContext → Renderer (Rehydrierung).  
**Begründung:** Wer diesen Pfad nicht beschreiben kann, hat die App-Architektur nicht vollständig durchdacht.  
**Vorlage:** Appendix A im Architecture Strategy Paper VX.  
**Quelle:** Architecture Strategy Paper VX, Appendix A | Übernommen: 2026-05-10

---

## Datenformate

### D-01 — CSV für Tabellen, JSON für Konfiguration, Inline-Options nur klein
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** CSV = tabellarische Daten (Zeitreihen, Vergleiche). JSON = strukturierte Konfiguration (Slider, Defaults, Texte, Szenarien). `data-options` = nur kleine menschenlesbare Overrides.  
**Quelle:** ETF-App-Fabrik_Produktlandkarte_V0-1.md §1, V0.2 §2

---

### D-02 — Redakteur schreibt kein freies JSON in Ghost-Cards
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** JSON wird aus validierten Vorlagen kopiert oder von Claude/Entwicklung erzeugt. Der Redakteur bearbeitet CSV-Dateien und kleine Inline-Overrides.  
**Offen:** Generator/Schema-Check-Workflow noch nicht implementiert.

---

### D-03 — Schwere Datenaufbereitung nicht im Browser
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Historische Daten werden vorverarbeitet und als normalisierte Ergebnisdatei bereitgestellt. Beispiel B2: Browser bekommt `sparplan_results.json`, nicht Rohdaten.  
**Quelle:** ETF-App-Fabrik_Produktlandkarte_V0-2.md §6.2

---

### D-04 — CSVParser.js ist shared App-Fabrik-Infrastruktur
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Alle Apps, die externe CSV-Daten laden (`data-fw-data`), nutzen `CSVParser.js` und `FinanzwesirData.js` als gemeinsame Infrastruktur. Keine App implementiert eigene CSV-Parser-Logik. Die Chart-Engine nutzt denselben Mechanismus — sie ist in diesem Kontext ebenfalls eine App, die sich des geteilten Datenlayers bedient.  
**Muster:** `import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js'`; `new CSVParser(); await parser.parse(url, options)` → `FinanzwesirData` (unitKey, bereinigte Werte, Date-Objekte).  
**Physischer Ort:** `Theme/assets/js/fw-chart-engine/data/` — der Pfad ist historisch, die Nutzung ist app-fabrik-weit.  
**Konsequenz:** Kein zweiter CSV-Parser, keine eigene Unit-Detection, keine eigene Domain-Validierung in App-Code. CSVParser.js und FinanzwesirData.js bleiben TABU (nicht ändern).  
**Quelle:** Entschieden 2026-06-04 — OA-01-Auflösung + APP_SPEC §7.5 + Chart-Engine-Muster

---

## Zählmodell und App-Struktur

### Z-01 — Historisches Ausgangsmodell: 18 Funnel-Master-Apps + 3 Zusatz-Module = 21 App-Ordner
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Die Differenz zwischen 18 geplanten Master-Apps und 21 realen App-Ordnern erklärt sich durch 3 korrekt zugeordnete Zusatz-Module. Keine unklaren Apps.  
**Zuordnung:**  
- `rollierende-sparplaene` → B2 (Erweiterungsmodul)  
- `investment-universum` → C1 (Gegenperspektive/Grundmodell)  
- `weltkarte-etf-indizes` → C1 (Companion-App)

**Hinweis 2026-05-19:** Das aktuelle Zählmodell wurde durch spätere Ergänzungen erweitert. Maßgeblich für den aktuellen Stand ist Z-05: 22 Funnel-Master-Apps, 25 reale App-Ordner, 3 Zusatz-Module. Die Differenz bleibt 3.

---

### Z-02 — Multi-Modul-Master-Apps
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** B2 (Geburtsjahrlos) und C1 (Diversifikations-Detektor) sind Multi-Modul-Master-Apps. Ihre Zusatz-Module sind eigenständig entwickelbar, aber fachlich und navigatorisch verbunden.  
**Rollen-Zuordnungen und Kopplungslogik:** → Z-03 (B2) und Z-04 (C1)  
**Quelle:** Arbeitsauftrag 2026-05-09

---

### Z-03 — B2 Rollen-Zuordnung: Geburtsjahrlos + Rollierende Sparpläne
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** `geburtsjahrlos` ist die Haupt-App (Startjahr-Schicksal), `rollierende-sparplaene` ist das Erweiterungsmodul (rollierender Startjahrvergleich). Beide bleiben separate App-Ordner, werden aber fachlich als zwei Modi / Perspektiven derselben Master-App behandelt.  
**Rollen:**
- `geburtsjahrlos`: Haupt-App / historischer Fächer, Startjahr-Schicksal
- `rollierende-sparplaene`: Erweiterungsmodul / rollierender Kohorten-Vergleich  
**Weiterhin offen:** Ob beide später in einer gemeinsamen UI als Modi zusammengeführt werden oder eigenständig einbettbar bleiben — Entscheidung nach Prüfung von Datenbedarf, UX-Komplexität und Chartbedarf.  
**Quelle:** 2026-05-09

---

### Z-04 — C1 Rollen-Zuordnung: Diversifikations-Familie
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** C1 ist eine App-Familie mit drei lose gekoppelten Modulen. Technisch sollen die Module lose gekoppelt bleiben und einzeln einbettbar sein. Begriffe, Datenlogik und Designsemantik sollen konsistent sein.  
**Rollen:**
- `diversifikations-detektor`: Master-App / Diagnose, Nutzerportfolio
- `investment-universum`: Gegenperspektive / globaler Anlagekuchen
- `weltkarte-etf-indizes`: Visuelles Lernmodul / Index-Länder-Karte  
**Weiterhin offen:** Konkrete technische Kopplung und Navigation zwischen den drei Modulen — Entscheidung wenn Datenbedarf und UX-Flow für C1 spezifiziert werden.  
**Quelle:** 2026-05-09

---

### Z-05 — D4 ETF-Vergleich als Funnel-Master-App
**Status:** 🟢 ENTSCHIEDEN

**Entscheidung:** `etf-vergleich` wird als D4 im Block D geführt. Die App ist keine D3-Erweiterung und kein Zusatzmodul, sondern das Exit-Gate aus der ETF-Auswahl. D1–D3 erklären ETF-Details, D4 entgiftet die Fixierung auf diese Details und führt Richtung H1 Start-Konfigurator. E1 ESG bleibt eigenständiger Spezialpfad, keine Pflichtstation nach D4.

**Begründung:** Die App löst eine eigene Blockade: „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss." Sie behandelt TER, Ausschüttung, Replikation, Fondsgröße und Produktvertrauen gemeinsam und kalibriert diese gegen Starten, Sparrate und früher loslegen. Merksatz: D1–D3 erklären die Bäume. D4 zeigt den Wald.

**Konsequenz Zählmodell:** Funnel-Master-Apps 21 → 22, reale App-Ordner 24 → 25, Differenz bleibt 3.

**Quelle:** App-Intake-Diskussion | 2026-05-19

---

## Qualität und Sicherheit

### Q-01 — SafeDOM-Prinzip
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Nutzdaten nie via `innerHTML`. Ausgabe über `textContent` oder sichere Renderer. Gilt für alle Apps.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §3.4

---

### Q-02 — Whitelist-Prinzip für `data-options`
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Nur bekannte Options-Keys werden verarbeitet. Unbekannte werden ignoriert.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §3.3

---

### Q-03 — Keine globalen IDs als App-API
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Keine globalen IDs innerhalb wiederholbarer App-Komponenten. Alle Selektoren relativ zum App-Root (`ctx.root`). Elemente über `data-fw-role` oder `data-fw-kpi` finden.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §4.5

---

### Q-04 — UI-Primitiven V0.1 mit Erweiterungsprozess
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Starter-Set: Slider, KPI-Cards, Range-Buttons, CTA, Annahmenbox, Error-State, Loading/Skeleton. Neue Komponente nur erlaubt wenn ≥2 Apps sie brauchen, Design-System-Aufnahme, A11y-Check, Demo-Template-Test, Dokumentation.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §3.4

---

### Q-05 — Tonalität Block G
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Apps G1–G3 sind tonal anders als der Rest: nicht motivierend, nicht vereinfachend — respektvoll-analytisch. „Du hast recht, das ist ein echtes Problem. Hier ist die vollständige Antwort."  
**Quelle:** ETF-Apps-Hauptdokument.md Block G

---

### Q-06 — Label-Konvention für Formular-Controls in App-Containern
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Formular-Controls (`<input>`, `<select>` etc.) in App-Fabrik-Apps werden mit einem wrapping `<label>` versehen statt mit `for`/`id`. Das wrapping Label ist semantisch gleichwertig und WCAG-konform. Hardcodierte IDs wie `id="fw-slider-rate"` sind verboten, weil mehrere App-Instanzen auf einer Seite (→ Q-03) dieselbe ID doppelt setzen würden — HTML-Spec-Verletzung und AT-Verknüpfungsbruch. Falls ein explizites `for`/`id` in Ausnahmefällen unvermeidbar ist: ID pro Container-Instanz eindeutig generieren (z.B. über Zähler), nie hardcoden.  
**Begründung:** Abgeleitet aus Pilot-2 `prokrastinations-preis` Slice 3, Full-Gate 2026-06-05. Szenario D (zwei Container) macht das Problem sichtbar.  
**Quelle:** Full-Gate APP-01-slice3 | 2026-06-05

---

### Q-07 — Loading-Statusvertrag: Spinner + sichtbarer Text
**Status:** 🟢 ENTSCHIEDEN
**Entscheidung:** Der Loading-Zustand für App-Fabrik-Apps zeigt einen Spinner zusammen mit sichtbarem Text „Daten werden geladen …" im selben `role="status"`-Container. Kein zusätzlicher `sr-only`-Text — der sichtbare Text ist bereits für Screenreader zugänglich.
**Begründung:** Ein doppelter, unsichtbarer Text neben identischem sichtbarem Text ist redundant und pflegeaufwendig ohne A11y-Gewinn.
**Quelle:** AP-tailwind-02c | 2026-07-13

---

## Demo-Template

### T-01 — Perplexity-Demo ist Labor, nicht Produktionsstandard
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Das Perplexity-Demo-Template (`_input/perplexity/`) ist Prüflabor und visuelle Referenz, kein produktiver App-Code. Ideen übernehmen, Implementierung härten.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §2

---

## Pilot

### P-01 — Pilot-Reihenfolge nach Template-Nutzen, nicht nach Wichtigkeit
**Status:** 🟢 ENTSCHIEDEN — ÜBERHOLT DURCH D-APP-01-E02 (2026-05-28)
**Entscheidung:** Pilot 1: `prokrastinations-preis`. Pilot 2: `risiko-uebersetzer`.  
**Begründung:** `prokrastinations-preis` ist als erster Factory-Pilot besser geeignet, weil die App voraussichtlich ein klarer Rechner mit einfachen Eingaben, klarer Ausgabe und wenig Sonderlogik ist. Ziel ist nicht die inhaltlich wichtigste App zuerst, sondern das Fließband an einer überschaubaren App zu härten.  
**Quelle:** ETF-App-Fabrik_Produktlandkarte_V0-2.md §10 | Entschieden: 2026-05-09

**Hinweis 2026-05-28:** Diese Pilot-Reihenfolge wurde durch Entscheidung D-APP-01-E02 ersetzt. Aktuell gilt:
- Pilot 1: `risiko-uebersetzer` (Calculator-Pilot — App-Shell, kein externe Datenpipeline)
- Pilot 2: `prokrastinations-preis` (Daten-/Chart-/Story-Pilot — historische Datenpipeline, Chart-Engine)
→ D-APP-01-E02 | `docs/App-Fabrik/05_PILOT_STRATEGY.md`

---

### D-APP-01-E02 — Pilot-Reihenfolge aktualisiert
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Pilot 1 ist `risiko-uebersetzer` (Calculator-Pilot); Pilot 2 ist `prokrastinations-preis` (Daten-/Chart-/Story-Pilot).  
**Begründung:** Calculator-Mechanik zuerst härten (keine externe Datenpipeline), historische Datenpipeline und Chart als zweiter Komplexitätsschritt.  
**Quelle:** `docs/App-Fabrik/05_PILOT_STRATEGY.md` | Entschieden: 2026-05-28

---

## App-Familien

## Spec-Gates

### SG-01 — Historisch: prokrastinations-preis Spec-Gate V0.3 bestanden
**Status:** 🟢 ENTSCHIEDEN (historisch — vor E-02)

**Hinweis 2026-05-28:** Historischer Eintrag vor Entscheidung D-APP-01-E02. `prokrastinations-preis` ist heute Pilot-2; Pilot-1 ist `risiko-uebersetzer`.

**Entscheidung:** APP_SPEC.md V0.3 für `prokrastinations-preis` hat das Spec-Gate bestanden (bestanden mit Nicht-Blockern). Keine echten Blocker. Vier Nicht-Blocker mit definierten Klärungszeitpunkten (NB-1 vor Release, NB-2 Phase 4, NB-3 Slice 6, NB-4 vor Ghost-Deploy). Alberts vier Grundsatzbestätigungen für Pre-Code-Gate erteilt (globaler Bootstrapper, lokale Testseite ausreichend für Slices 0–6, Core-Extraktion nach Pilot 2, Fallback-Tokens erlaubt).  
**Nächster Schritt:** Pre-Code-Gate Full mit Slice-Plan aus RFC §8.  
**Quelle:** `/Apps/prokrastinations-preis/SPEC_GATE_REPORT.md` | 2026-05-10

---

### Fam-01 — G3 Passiv-Paradox: eigenständige App
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** `passiv-paradox` bleibt vorerst eigenständige Funnel-Master-App, wird aber fachlich eng mit G2 `rendite-kalibrierung` gekoppelt.  
**Begründung:** G2 und G3 gehören zur gleichen App-Familie, beantworten aber unterschiedliche Nutzerfragen. Keine Zusammenlegung.  
**Weiterhin offen:** Keine — Eigenständigkeit ist für den aktuellen Planungshorizont ausreichend geklärt.  
**Quelle:** 2026-05-09

---

## Security

### SEC-01 — SECURITY-BASELINE.md um App-Fabrik / fw-app Regeln erweitert
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** `docs/steering/audits/SECURITY-BASELINE.md` wurde um App-Fabrik-spezifische Sicherheitsregeln (§6.1–§6.12) sowie Quellenhierarchie (§2), Security-Sync-Regel (§8), Decision-Log-Pflicht (§9), Gate-Prüffrage (§10), Testpflicht (§11) und App-Fabrik-Pflegepflicht (§12) ergänzt.  
**Begründung:** SECURITY-BASELINE.md war 2026-05-03 entstanden — vor App-Fabrik-Start (2026-05-09). Sie enthielt allgemeine Sicherheitsregeln, aber keine `fw-app` / Ghost-HTML-Card / `data-*`-spezifischen Regeln. Als amtliche Gate-Bezugsgröße war sie für App-Fabrik-Apps unvollständig. Spec-Gate für `prokrastinations-preis` stellte die Lücke fest.  
**Quelle:** Arbeitsauftrag security-baseline-sync | 2026-05-10

---

### SEC-02 — Security-Sync-Regel eingeführt
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Bei jeder sicherheitsrelevanten Spec-, Interface- oder App-Änderung müssen `SECURITY-BASELINE.md`, `APP-INTERFACE.md` und `APP_SPEC.md` auf Konsistenz geprüft werden. Die sechs Pflichtfragen sind in `SECURITY-BASELINE.md §8` definiert. Gate-Prüffrage und Sync-Ergebnis-Kategorien sind in `§10` definiert. Die Regel ist in `04_CLAUDE_WORKFLOW_DRAFT.md`, `tech-spec-app/SKILL.md` und `app-spec-create.md` verankert.  
**Begründung:** Ohne Sync-Regel können `SECURITY-BASELINE.md` und `APP-INTERFACE.md` divergieren, ohne dass es sichtbar wird. Bei 21 geplanten Apps würde die Divergenz unkontrolliert wachsen.  
**Quelle:** Arbeitsauftrag security-baseline-sync | 2026-05-10

---

### SEC-03 — Decision-Log-Pflicht für sicherheitsrelevante Architekturentscheidungen
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Jede sicherheitsrelevante Architekturentscheidung (neue Domain, neue `data-*` Semantik, Bootstrapper-Strategie, Shadow DOM, externe Scripts, neue Abhängigkeiten, SafeDOM-Regeländerungen, Slug-Whitelist-Änderungen) bekommt einen Eintrag in `01_DECISION_LOG.md`. Detailregeln: → `SECURITY-BASELINE.md §9`.  
**Begründung:** Sicherheitsentscheidungen müssen nachvollziehbar und auditierbar sein, auch über Sessions hinweg.  
**Quelle:** Arbeitsauftrag security-baseline-sync | 2026-05-10
