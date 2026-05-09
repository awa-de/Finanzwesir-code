# Decision Log — App-Fabrik

Stand: 2026-05-09 | Arbeitsstand | Geändert von: Claude

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
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §4.1

---

### A-05 — Chart-Engine als Infrastruktur, nicht als Sonderwelt
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Die Chart-Engine ist ein Subsystem der App-Fabrik. Chart-Apps sind eine App-Familie unter mehreren, kein Sonderfall.  
**Quelle:** ETF-App-Fabrik_Produktlandkarte_V0-2.md §0

---

### A-06 — Gemeinsame App-Shell, kein Global-Initialisierer
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** Gemeinsame App-Shell macht Container finden, Config lesen, Daten laden, States verwalten. App-spezifische Datei enthält nur Fachlogik. Kein `window.FwAppInit` / globale Window-API.  
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

## Zählmodell und App-Struktur

### Z-01 — 18 Funnel-Master-Apps + 3 Zusatz-Module = 21 App-Ordner
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Die Differenz zwischen 18 geplanten Master-Apps und 21 realen App-Ordnern erklärt sich durch 3 korrekt zugeordnete Zusatz-Module. Keine unklaren Apps.  
**Zuordnung:**  
- `rollierende-sparplaene` → B2 (Erweiterungsmodul)  
- `investment-universum` → C1 (Gegenperspektive/Grundmodell)  
- `weltkarte-etf-indizes` → C1 (Companion-App)

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

## Demo-Template

### T-01 — Perplexity-Demo ist Labor, nicht Produktionsstandard
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Das Perplexity-Demo-Template (`_input/perplexity/`) ist Prüflabor und visuelle Referenz, kein produktiver App-Code. Ideen übernehmen, Implementierung härten.  
**Quelle:** App-Fabrik_Zusatzpaket-Integration_V0-1.md §2

---

## Pilot

### P-01 — Pilot-Reihenfolge nach Template-Nutzen, nicht nach Wichtigkeit
**Status:** 🟢 ENTSCHIEDEN  
**Entscheidung:** Pilot 1: `prokrastinations-preis`. Pilot 2: `risiko-uebersetzer`.  
**Begründung:** `prokrastinations-preis` ist als erster Factory-Pilot besser geeignet, weil die App voraussichtlich ein klarer Rechner mit einfachen Eingaben, klarer Ausgabe und wenig Sonderlogik ist. Ziel ist nicht die inhaltlich wichtigste App zuerst, sondern das Fließband an einer überschaubaren App zu härten.  
**Quelle:** ETF-App-Fabrik_Produktlandkarte_V0-2.md §10 | Entschieden: 2026-05-09

---

## App-Familien

### Fam-01 — G3 Passiv-Paradox: eigenständige App
**Status:** 🟡 ARBEITSANNAHME  
**Entscheidung:** `passiv-paradox` bleibt vorerst eigenständige Funnel-Master-App, wird aber fachlich eng mit G2 `rendite-kalibrierung` gekoppelt.  
**Begründung:** G2 und G3 gehören zur gleichen App-Familie, beantworten aber unterschiedliche Nutzerfragen. Keine Zusammenlegung.  
**Weiterhin offen:** Keine — Eigenständigkeit ist für den aktuellen Planungshorizont ausreichend geklärt.  
**Quelle:** 2026-05-09
