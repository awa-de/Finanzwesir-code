# Offene Fragen — App-Fabrik

Stand: 2026-05-09 | Arbeitsstand | Geändert von: Claude

**Status-Codes:** ❓ offen | ⏳ in Klärung | ✅ geklärt (→ 01_DECISION_LOG.md)

---

## Architektur

### Arch-01 — AppRegistry-Implementierung: ES-Module oder globale Registry?
**Status:** ❓  
**Frage:** Wie wird die App-Factory-Registry implementiert?  
Option A: `AppRegistry.register('slug', factory)` als globales Singleton  
Option B: ES-Module mit `export default { slug, init }` + Theme-seitigem Import  
Option C: Hybrid (Registry mit dynamischen Imports)  
**Blockiert:** A-06, A-07 in Decision Log, Bootstrapper-Implementierung

---

### Arch-02 — Bootstrapper: Wann initialisiert er Apps?
**Status:** ❓  
**Frage:** DOMContentLoaded, load, IntersectionObserver (lazy) oder explizites Trigger-Attribut?  
**Kontext:** Für Seiten mit mehreren Apps und großen Datenpaketen relevant.

---

### Arch-03 — Chart-Engine: Wie wird sie App-Familie?
**Status:** ❓  
**Frage:** Wie wird die bestehende Chart-Engine in die App-Fabrik-Architektur eingebunden, ohne sie zu destabilisieren?  
**Kontext:** Chart-Engine hat eigenen Bootstrapper und `fwContext`. Keine Änderung ohne separates Gate.

---

### Arch-04 — `data-fw-family` in HTML-Card oder nur in Registry?
**Status:** ❓  
**Frage:** Muss `data-fw-family="calculator"` im HTML stehen (für CSS-Scoping), oder reicht es wenn die Registry es kennt?  
**Kontext:** Wenn keine CSS-Klassen pro Familie: Attribut im HTML nicht nötig.

---

### Arch-05 — D3/TopoJSON für Weltkarte: lokal bundeln oder CDN zulassen?
**Status:** ❓  
**Frage:** Weltkarte v2 nutzt D3 + TopoJSON vom CDN. Für Produktion: lokale Assets oder speziell gemanagtes CDN?  
**Kontext:** DSGVO, Performance, Konsistenz mit Theme-Build. Gilt auch für alle anderen Nicht-Chart.js-Dependencies.  
**Blockiert:** Factory-Migration `weltkarte-etf-indizes`

---

## Daten

### Data-01 — Historische MSCI-World-Daten: Quelle und Normierungsformat
**Status:** ❓  
**Frage:** Woher kommen die historischen MSCI-World-Renditedaten (B2, A2, B3)? Welches normierte Format (Felder, Zeiteinheit, real/nominal, Quelle-Metadaten)?  
**Kontext:** Rollierende-Sparpläne-Prototyp hat bereits Datenpipeline-Idee (MSCI NTR + CPI → normalisierte Ergebnisdatei).  
**Blockiert:** B2, A2, B3 finale Implementierung

---

### Data-02 — ETF-/Index-Overlap-Daten: Wer pflegt das?
**Status:** ❓  
**Frage:** Für C1, C2, E1 werden ETF-Kompositionsdaten und Overlap-Werte benötigt. Woher kommen diese, und wie oft müssen sie aktualisiert werden?  
**Kontext:** MSCI.com liefert öffentlich verfügbare Daten; aber Aktualisierung erfordert Prozess.

---

### Data-03 — JSON-Vorlagen-Workflow für Redakteure
**Status:** ❓  
**Frage:** Wie entstehen und werden validiert JSON-Config-Dateien pro App, ohne dass der Redakteur freies JSON tippt?  
Option A: Claude erzeugt JSON auf Basis von Albert-Input  
Option B: Schema + Generator-Skript  
Option C: Vorgefertigte Beispieldateien zum Kopieren

---

### Data-04 — Versionierung von Datendateien
**Status:** ❓  
**Frage:** Wie werden CSV/JSON-Datendateien versioniert (URL-Parameter `?v=`, Dateiname mit Datum, git)?  
**Kontext:** Ghost-Cache und Browser-Cache erfordern Cache-Busting bei Datenaktualisierungen.

---

## UX/UI

### UX-01 — Gemeinsame App-Hülle: Anatomie?
**Status:** ❓  
**Frage:** Was sind die Pflichtbereiche jeder App-Hülle?  
Kandidaten: App-Header | Subline | Control-Zone | Ergebnis-Zone | Annahmenbox | CTA | Quellenhinweis  
**Kontext:** Prototypen lösen das jeweils individuell.

---

### UX-02 — CTA-Standard: Funnel-Station vs. Standalone
**Status:** ❓  
**Frage:** Jede App muss als Funnel-Station (CTA = nächste App) UND standalone Embed (CTA = Sparplan starten) funktionieren. Wie wird das konfiguriert?  
Option A: Zwei CTA-Varianten per `data-fw-options="cta:funnel"` / `"cta:standalone"`  
Option B: Immer beides, untereinander  
Option C: Redakteur konfiguriert CTA-Text und -URL in Ghost-Card

---

### UX-03 — Viralität / Share-Feature
**Status:** ❓  
**Frage:** Das Hauptdokument nennt die Idee, dass Nutzer ihr App-Ergebnis teilen können (Sozialprestige). Wann und wie wird das standardisiert?  
**Kontext:** Post-Launch-Feature, aber Design-System muss es vorbereiten.

---

### UX-04 — Mobile-Patterns: Bottom Sheet Standard?
**Status:** ❓  
**Frage:** Weltkarte v2 nutzt ein Mobile Bottom Sheet. Soll das ein Standard für Explorer-Apps werden?  
**Blockiert:** Explorer-Template-Spezifikation

---

### UX-05 — Unsicherheits-Copy: Pflicht oder optional?
**Status:** ❓  
**Frage:** Jede App mit Renditeannahmen braucht eine sichtbare Annahmenbox. Ist das Pflicht (wird im Factory-Standard verankert) oder optional?  
**Kontext:** Finanzapps können Scheingenauigkeit erzeugen.

---

## App-Familien

### Fam-01 — G3 Passiv-Paradox: eigene App oder G2-Section?
**Status:** ❓  
**Frage:** Ist G3 (passiv-paradox) eine eigenständige App oder ein eingebetteter Abschnitt von G2 (rendite-kalibrierung)?  
**Kontext:** G3 hat niedrigen Implementierungsaufwand, passt inhaltlich zu G2.

---

### Fam-02 — B2 Multi-Modul: wie werden Geburtsjahrlos + Rollierende Sparpläne verbunden?
**Status:** ❓  
**Frage:** Werden sie als separate Apps mit Verlinkung oder als Modi einer App (`data-fw-mode="geburtsjahrlos"` / `"rollierende"`) implementiert?  
**Kontext:** Fachlich ergänzen sie sich, technisch könnten sie separat bleiben.

---

### Fam-03 — C1 Multi-Modul: wie werden Diversifikations-Detektor + Investment-Universum + Weltkarte verbunden?
**Status:** ❓  
**Frage:** Wie stark ist die technische Kopplung? Gemeinsame Datenbasis? Navigation zwischen den drei Apps?  
**Kontext:** Drei separate Prototypen/Konzepte, die fachlich dieselbe Welt zeigen.

---

## Claude-Workflow

### Wf-01 — Wann braucht die App-Fabrik eigene Commands?
**Status:** ❓  
**Frage:** Reichen vorhandene Skills (intake, spec-mode-architecture, impl-mode-workpackages, code-quality-faang-review) aus — oder braucht es eigene Commands wie `app-factory-spec.md`, `app-factory-build.md`?  
**Kontext:** Konsolidierungsdok §8 empfiehlt Commands als Orchestrierungsschicht, nicht als neue Skills.  
**Empfehlung:** Erst Pilot bauen, dann entscheiden ob Commands nötig sind.

---

### Wf-02 — App-Briefing-Protokoll: wie wird eine neue App aufgenommen?
**Status:** ❓  
**Frage:** Welche Minimalinformationen braucht Claude für eine neue App? (App-Familie, Datenbedarf, UX-Flow, Annahmen, Pilot oder Serie?)  
**Kontext:** `/intake` ist vorhanden, aber nicht app-spezifisch.

---

### Wf-03 — Factory-Migration bestehender Prototypen: Prozess?
**Status:** ❓  
**Frage:** Wie werden `regulatorik-dashboard`, `rollierende-sparplaene` und `weltkarte-etf-indizes` in die Factory-Struktur migriert, ohne die Prototypen zu zerstören?  
**Empfehlung aus V0.2:** Legacy-Ordner als `_legacy/` behalten, Factory-Version daneben aufbauen.

---

### Wf-04 — Test-Gate für Apps: wer testet was?
**Status:** ❓  
**Frage:** Welche Tests sind Pflicht vor Release einer App?  
Kandidaten: manuelle Testmatrix (Claude erstellt, Albert testet), automatische Komponenten-Tests, Ghost-Integration-Test, Viewport-Test (375/768/1280)
