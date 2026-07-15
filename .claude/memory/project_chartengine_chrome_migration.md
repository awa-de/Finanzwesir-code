---
name: project-chartengine-chrome-migration
description: "Status und Architekturmuster des Engine-DOM-Chrome-Migrationsprogramms (AP-chart-engine-01, CE-1 bis CE-6) — FW_CHROME_*-Musterlektion aus CE-4/CE-4c"
metadata: 
  node_type: memory
  type: project
  originSessionId: 668a2e33-f9c4-4c3a-9d56-2a29a690930a
---

AP-chart-engine-01 migriert das Engine-DOM-Chrome (Wrapper, Titel, Toolbar, Segmented-Controls, Legende) aller Charttypen auf den Tailwind-Baukastenvertrag (`docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.11), in kleinen einzeln abgenommenen Slices: CE-1 (Inventur) → CE-2/CE-2b (gemeinsames DOM-Fundament) → CE-3/3a/3b (Line-Chrome) → CE-4/CE-4c (Bar-Chrome) → CE-5 (Donut/Pie, offen) → CE-6 (Cross-Type-Abschluss, offen).

**Stand 2026-07-15:** CE-1 bis CE-4c fertig und browserabgenommen (Sicht + `tools/engine-dom-check.js`, alle drei Charttypen geprüft). CE-1–CE-3b + Tool-01 + DOC-01 sind committed (`20bb90c`, `9dd899d`); CE-4/CE-4c sind **noch nicht committed**. Nächster Schritt: CE-5 Donut/Pie-Chart-Chrome, nur nach Alberts explizitem Auftrag.

**Architekturmuster (verbindlich für CE-5/CE-6):** Identische Chrome-Rezepte (Wrapper, Titel, Toolbar, Segmented-Gruppe/-Option, Legendengruppe, Legend-Pill, Dot) werden in `FwRenderer.js` **immer nur einmal** als gemeinsame `FW_CHROME_*`-Konstanten geführt und von allen Charttypen referenziert, die sie nutzen — nie als typspezifische Parallelkonstanten (`FW_LINE_*`/`FW_BAR_*`/`FW_PIE_*`). Statische, nicht-Tailwind Typmarker (`fw-chart-wrapper--line`/`--bar`/…) und ein gemeinsamer Chrome-Anker (`fw-chart-chrome`) werden ausschließlich per `classList.add()` (DOM-API, keine Stringverkettung) ergänzt. Typspezifische Ausnahmen (Line-BAN, Ranking-Bar-Legendenverzicht) bleiben eng auf ihren Typmarker begrenzt.

**Lehre aus CE-4/CE-4c:** CE-4 (Bar-Chrome) wurde zunächst mit elf vollständig duplizierten `FW_BAR_*`-Konstanten umgesetzt, obwohl deren Inhalt byte-identisch mit den bereits bestehenden `FW_LINE_*`-Konstanten war — ein direkter Verstoß gegen den vorher erteilten CE-4a-Nachtrag ("identische reine Chrome-Rezepte existieren genau einmal"). CE-4c musste als eigener Reparatur-AP nachgezogen werden, um dies auf gemeinsame `FW_CHROME_*`-Konstanten zu konsolidieren. Bei künftigen Chrome-Slices (CE-5 Donut/Pie) vorher explizit prüfen, ob ein benötigtes Rezept bereits als `FW_CHROME_*` existiert, bevor eine neue typspezifische Konstante angelegt wird.

**Diagnosewerkzeug:** `tools/engine-dom-check.js` (Read-only-Konsolen-Snippet, AP-neutral) prüft seit CE-2b A11y-Verbergung + Struktur-Anker (Wrapper/Canvas-Container), seit CE-4c zusätzlich einen Chrome-Kern-Block (Typmarker+Anker, `<button aria-pressed>` bei Controls/Legend-Pills, genau ein aktiver Button pro `role="group"`). Sollte bei CE-5 um denselben Block erweitert werden (Wrapper-Prüfung ist bereits generisch, Legend-Check greift bereits typneutral via `isChromeType`-Parameter).

Verwandt: [[project-chartengine-anchormeasurement-contracts]] (anderes Teilthema: AnchorMeasurement/ChartSettled/RenderMotion-Contracts, nicht das DOM-Chrome).
