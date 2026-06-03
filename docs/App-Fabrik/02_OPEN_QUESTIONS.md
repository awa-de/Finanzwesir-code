# Offene Fragen — App-Fabrik

Stand: 2026-06-03 | Datenlayer-Konsistenzpatch | Geändert von: Claude

**Status-Codes:** ❓ offen | ⏳ in Klärung | ✅ geklärt (→ 01_DECISION_LOG.md)

---

## Architektur

### Arch-06 — AppContext-Schema: Welche Pflichtfelder pro App-Familie?
**Status:** ❓  
**Frage:** Welche Felder muss jeder AppContext mindestens enthalten, damit Renderer, Formatierung und A11y einheitlich funktionieren? Was ist pro App-Familie vorgeschrieben, was optional?  
Kandidaten: `valueMode`, `currency`, `resultTone`, `a11ySummary`, `layout`  
**Kontext:** A-12 legt das Prinzip (AppContext als semantischer Rucksack) fest. Das konkrete Schema fehlt noch. Blockiert saubere Strategie-Implementierung.  
**Klärungsschritt:** Bei APP_SPEC für Pilot-1 (prokrastinations-preis) erstmalig definieren; nach 2 Apps verallgemeinern und als Standard festschreiben.

---

### Arch-07 — A11y-Strategie-Vertrag: Konkrete Darstellung pro App-Familie?
**Status:** ❓  
**Frage:** Wie sieht die A11y-Repräsentation konkret aus, die jede App-Strategie liefern muss?  
Kandidaten: Calculator = ARIA Live Region + Ergebnis-Text, Quiz = Fragenstatus + Summary, Explorer = Tabellarische Alternative, Scenario Chart = Tabelle wichtiger Szenarien  
**Kontext:** A-16 legt das Prinzip (A11y als Strategie-Vertrag) fest. Die familien-spezifische Umsetzung fehlt noch.  
**Klärungsschritt:** Bei Pilot-1 (Calculator-Familie) erstmalig spezifizieren; dann familien-weise erweitern.

---

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
**Status:** ✅ Geklärt → A-08 in 01_DECISION_LOG.md  
**Entscheidung:** Lokal bundeln. Keine CDN-Sonderregel. Konsistent mit Chart.js-Strategie.  
**Frage:** Weltkarte v2 nutzt D3 + TopoJSON vom CDN. Für Produktion: lokale Assets oder speziell gemanagtes CDN?  
**Kontext:** DSGVO, Performance, Konsistenz mit Theme-Build. Gilt auch für alle anderen Nicht-Chart.js-Dependencies.  
**Blockiert:** Factory-Migration `weltkarte-etf-indizes`

---

## Daten

### Data-01 — Historische MSCI-World-Daten: Quelle und Format
**Status:** ⚠️ teilweise entschieden — in Klärung (AP-DATA-01 offen)
**Entschieden:**
- Datenbasis = MSCI World Index, monatliche Indexwerte; kein ETF-Proxy. ✅
- Format = CSV (Semikolon, Komma-Dezimal), Datum `YYYY-MM-DD` (Monatsultimo), Spalten `date`/`index_value`. ✅ (V1.4)
- Datenhoheit = Projektinhaber erstellt CSV redaktionell; Claude verarbeitet nur. ✅ **B-01-D geklärt**
- Return-Variante = Net Return stark bevorzugt; Abweichung nur mit ausdrücklicher Freigabe. ✅ **B-01-A teilgeklärt** (→ `docs/data/INDEX-RETURN-VARIANTEN.md`)
- Governance = zentraler Datenlayer `docs/data/` (angelegt 2026-06-03). ✅

**Noch offen:**
- B-01-B: Währung (USD oder EUR) — abhängig von AP-DATA-01
- B-01-C: Konkrete Datenquelle — abhängig von AP-DATA-01

**Klärungsweg:** AP-DATA-01 → AP-DATA-04 (Dataset Contract) → AP-DATA-05 (Dateiname) → Slice-0

**Dokumentiert in:** `Apps/prokrastinations-preis/APP_SPEC.md` §7 (V1.4) | `docs/data/OFFENE-ARBEITSPUNKTE.md`
**Blockiert:** B1 Slice-0 (B-01-B/C noch offen); B2, A2, B3 finale Implementierung

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
**Status:** ✅ In Arbeitsannahme überführt → Fam-01 in 01_DECISION_LOG.md  
**Arbeitsannahme:** Eigenständige App, fachlich eng mit G2 gekoppelt. Keine Zusammenlegung.  
**Frage:** Ist G3 (passiv-paradox) eine eigenständige App oder ein eingebetteter Abschnitt von G2 (rendite-kalibrierung)?  
**Kontext:** G3 hat niedrigen Implementierungsaufwand, passt inhaltlich zu G2.

---

### Fam-02 — B2 Multi-Modul: wie werden Geburtsjahrlos + Rollierende Sparpläne verbunden?
**Status:** ✅ In Arbeitsannahme überführt → Z-03 in 01_DECISION_LOG.md  
**Arbeitsannahme:** Separate App-Ordner, fachlich als zwei Perspektiven der Master-App behandelt. `geburtsjahrlos` = Haupt-App, `rollierende-sparplaene` = Erweiterungsmodul.  
**Weiterhin offen:** Ob später eine gemeinsame UI mit Modi entsteht — Klärungsschritt: nach Pilot-Abschluss, basierend auf Datenbedarf, UX-Komplexität und Chartbedarf.  
**Frage:** Werden sie als separate Apps mit Verlinkung oder als Modi einer App (`data-fw-mode="geburtsjahrlos"` / `"rollierende"`) implementiert?  
**Kontext:** Fachlich ergänzen sie sich, technisch könnten sie separat bleiben.

---

### Fam-03 — C1 Multi-Modul: wie werden Diversifikations-Detektor + Investment-Universum + Weltkarte verbunden?
**Status:** ✅ In Arbeitsannahme überführt → Z-04 in 01_DECISION_LOG.md  
**Arbeitsannahme:** Lose Kopplung, einzeln einbettbar. Begriffe, Datenlogik und Designsemantik konsistent halten.  
**Weiterhin offen:** Konkrete technische Kopplung und Navigation — Klärungsschritt: wenn Datenbedarf und UX-Flow für C1 spezifiziert werden.  
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

---

## Redaktion / Doku

### Red-01 — AUTHOR_GUIDE: `data-app` vs. `data-fw-app`
**Status:** ⬜ → BACKLOG AF-04  
Erkannt in AF-03. Kein Blocker für Standard V0.1. Klärung nach Pilot-1, wenn App-Card-Vertrag validiert.

---

### Red-02 — Redakteurs-Cheat-Sheet für fw-apps
**Status:** ⬜ → BACKLOG AF-05  
Erkannt in AF-03. Kein Blocker für Standard V0.1. Erstellung nach Pilot-1.
