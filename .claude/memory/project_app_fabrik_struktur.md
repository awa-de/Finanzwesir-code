---
name: app-fabrik-struktur-und-z-hlmodell
description: "docs/App-Fabrik Steuerungsverzeichnis; 22+3=25 App-Ordner; B1 APP_SPEC V1.7 operativ; Slice-4 ✅ 2026-06-11 (renderFromData+SparplanChart); Slice-5 ✅ 2026-06-15 (Screen-Flow 1→4, SF-02 auf Slice 7 vorgezogen); Slice-6 nächster Schritt; OA-01: ES-Modul"
metadata: 
  node_type: memory
  type: project
  originSessionId: a83f5901-0f2b-4f79-9002-790577adbecf
---

docs/App-Fabrik ist das Steuerungsverzeichnis für die App-Fabrik — kein Code, nur Referenzen auf /Apps/*.

**Why:** Trennung: /Apps = reale Arbeitsordner (Code, Prototypen); docs/App-Fabrik = Planung, Standards, Entscheidungen.

**How to apply:** Bei App-Arbeit zuerst docs/App-Fabrik/APP_INVENTORY.md lesen (alle 25 Ordner). Dann 03_APP_FACTORY_STANDARD_DRAFT.md und 04_CLAUDE_WORKFLOW_DRAFT.md.

## Zählmodell (Stand 2026-05-19, AF-17)

- 22 Funnel-Master-Apps (A1–H1; B4/B5 in Block B; D4 ETF-Vergleich neu)
- 3 Zusatz-Module (kein eigener Funnel-Slot)
- = 25 reale App-Ordner in /Apps/

**D4 ETF-Vergleich / ETF-Feinschliff-Entgifter** (2026-05-19):
- Slug: etf-vergleich | Block D | Exit-Gate aus Block D
- Löst Blockade: „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss."
- Blindverkostung 4 MSCI-World-ETFs, Schutzplanken: 25.09.2009–Datenstand dominant, kein Crash, keine Empfehlung
- E1 ESG bleibt Spezialpfad, nicht Pflichtstation nach D4

**Multi-Modul-Master-Apps:**
- B2 Geburtsjahrlos → Erweiterungsmodul: rollierende-sparplaene
- C1 Diversifikations-Detektor → Companion: weltkarte-etf-indizes; Gegenperspektive: investment-universum

## Rollenformel App-Sequenz (verbindlich seit 2026-05-18)

B1 Marktzeit schlägt Timing → Heute ist der einzige Startpunkt, den du noch hast.
B2 Geburtsjahrlos → Deine Börsenepoche ist ein Los.
B4 Der alte Euro → So arbeitet Zeit im einzelnen Euro.
B5 Depot-Kipppunkt → So wird daraus irgendwann ein Mitverdiener.

## B1-Pivot (2026-05-18)

B1 heißt jetzt „Marktzeit schlägt Timing / Lieber heute als morgen". Slug bleibt `prokrastinations-preis`.
- Alt: animierter Verlustzähler, Zukunftsprojektion
- Neu: echte MSCI-World-Monatsdaten, 4-Screen-Flow, Marktzeit-Framing

**B1-Spec-Status (2026-06-11):** APP_SPEC.md V1.7 operativ. Produktiver Datenpfad: `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`. Contract: `docs/data/contracts/msci-world-net-return-monthly.md`. MINI_SPEC_FROM_HAUPTDOKUMENT.md bleibt als Hintergrundquelle. **SLICE_PLAN.md aktuell (neue Mechanik) — Slice-0 ✅ 2026-06-04, Slice-1/2/3 ✅ 2026-06-05, Slice-4 ✅ 2026-06-11, Slice-5 ✅ 2026-06-15 abgeschlossen.** OA-01 entschieden: app.js ist ES-Modul (`<script type="module">`), CSVParser.js liegt in `Theme/assets/js/fw-chart-engine/data/`. OA-02 ✅ entschieden (2026-06-10): `renderFromData()` = offizieller zweiter Engine-Einstieg (Pfad 2). `config.features` = neutrale Fähigkeitswahl (kein `isAppChart`, kein `noRangeButtons`). Container-Marker: `data-fw-appchart`. **Nächster Schritt: Slice 6 — VertikaleLinie + AssumptionsBox + PrimaryCta + Microcopy-Schicht.** Slice-3-Ergebnis: clamp() + parseOptions() (Whitelist defaultRate/startBetrag), renderContent() neu (Slider + wrapping label Q-06, ARIA-Slider, ARIA Live Region input/change getrennt), 20 Szenarien A–T ✅. Q-06 in Decision Log + Factory Standard §9 formalisiert. NB-5 (synchrone DOM-Neuaufbau pro Slider-Tick) als Nicht-Blocker dokumentiert (Slice 7). P-11 Fetch-Dedup-Cache: _dataCache Map, loadData-Shell + _loadDataImpl, formalisiert in Factory-Standard-Draft §9.
**B1-App-Familie (entschieden E-01, 2026-05-28):** Szenario-/Vergleichs-App mit Storytelling-Elementen. Kein Calculator. APP_SPEC §3 gültig.
**B1-Pilot-Rolle (entschieden E-02, 2026-05-28):** Pilot-2 (Daten-/Chart-/Story-Pilot). Pilot-1 ist risiko-uebersetzer (Calculator-Pilot).
**B1-Datenbasis (alle B-01 entschieden):** MSCI World Index, monatliche Indexwerte, CSV-Format (Semikolon/Komma). Kein ETF-Proxy. B-01-A Net Return. **B-01-B EUR Pflicht (2026-06-04):** CSV-Werte mit EUR-Suffix; App prüft `unitKey === CURRENCY_EUR`; Abweichung → Error State (c). **B-01-C MSCI direkt (2026-06-04):** msci.com, Tier 0, ab 2000-12-29; Rohdatei historyIndex.xls in `Datenquellen für Apps/`; Contract angelegt. B-01-D: Projektinhaber erstellt CSV redaktionell.
**B1-CSV-Guardrail (2026-06-03):** CSV gilt ausschließlich für die externe MSCI-Datendatei (data-fw-data). JSON bleibt für data-fw-options, AppContext, Registry/Manifest, interne JavaScript-Objekte und alle anderen App-Fabrik-Zwecke zulässig. Kein pauschales JSON-Verbot. → D-APP-01-B01 im DECISION-LOG.
**B1-Berechnungsformel (entschieden B-02, 2026-05-28):** Anteilslogik — monatlicher Anteilskauf. Keine Annuität, keine Durchschnittsrendite. startBetrag optional (Default 0).
**B1-Screen-Flow (entschieden B-03, 2026-05-28):** Button-getrieben V1. Screens 1→2→3→4 per Button/Tastatur. Kein Autoplay, kein Scroll-Trigger. prefers-reduced-motion respektiert.

## B2-Bereinigung (2026-05-18)

B2 = rein Epochen-Fokus: rollierende 30-Jahres-Zeiträume, inflationsbereinigt.
Entfernt: Kindersparplan, vor-10-Jahren-Motiv, Warte-Button, Opportunitätskosten-Framing.

## Neue Apps (2026-05-18)

- B4 Der alte Euro: /Apps/der-alte-euro/ | Slug: der-alte-euro | 4 gestapelte Balken, 1 Euro, 4/6/8 % Rendite
- B5 Depot-Kipppunkt: /Apps/depot-kipppunkt/ | Slug: depot-kipppunkt | Job-Netto vs. Depot-Ertrag, Schnittpunkt

## Pilot-Strategie

Pilot 1: risiko-uebersetzer (Calculator-Pilot) — entschieden E-02, 2026-05-28. Ziel: App-Shell, Slider, Formel, KPI, CTA, State-Modell, A11y, Ghost-Card-Vertrag validieren.
Pilot 2: prokrastinations-preis (Daten-/Chart-/Story-Pilot) — entschieden E-02, 2026-05-28. Ziel: CSV-Datenpipeline, historischer Chart, Screen-Flow, Entscheidungspunkt-Marker, AssumptionsBox validieren.

## Schlüsseldateien docs/App-Fabrik/

- 00_STATUS.md — Zählmodell (22/25), Trennungsinvariante
- 01_DECISION_LOG.md — Entscheidungen/Arbeitsannahmen (Z-05 D4)
- APP_INVENTORY.md — vollständige Inventartabelle aller 25 App-Ordner
- ETF-Apps-Hauptdokument.md — Vollständige Briefings Blöcke A–H (v6.0)
- ETF-App-Fabrik_App-Register.md — Schlanker Index 22 Master-Apps + 25 reale Ordner (v0.7)
