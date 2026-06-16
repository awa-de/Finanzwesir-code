---
name: app-fabrik-struktur-und-z-hlmodell
description: "docs/App-Fabrik Steuerungsverzeichnis; 22+3=25 App-Ordner; B1 APP_SPEC V2.4 operativ (Stationen-Zeitreise); Slice-6 ✅ 2026-06-16; B1-AP-01 bis AP-07 ✅ (ENTSCHEIDUNGSPROTOKOLL + Spec-Umbau + STATIONS_CONFIG_CONTRACT + UX/Heldenreise §23 + A11y/Mobile §14 + QA_TEST_CASES.md + REDAKTIONS_GATE.md); B1-AP-08 nächster Schritt (Widersprüchliche Stellen bereinigen)"
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

**B1-Spec-Status (2026-06-16):** APP_SPEC.md V2.0 operativ (AP-02, Stationen-Zeitreise-Umbau). ENTSCHEIDUNGSPROTOKOLL.md als Architektur-Klammer für AP-02 bis AP-08 angelegt (B1-AP-01). Produktiver Datenpfad: `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`. Contract: `docs/data/contracts/msci-world-net-return-monthly.md`. MINI_SPEC_FROM_HAUPTDOKUMENT.md bleibt als Hintergrundquelle. **SLICE_PLAN.md aktuell — Slice-0 ✅ 2026-06-04, Slice-1/2/3 ✅ 2026-06-05, Slice-4 ✅ 2026-06-11, Slice-5 ✅ 2026-06-15, Slice-6 ✅ 2026-06-16.** AP-UX-01 ✅: Stationen-Zeitreise entschieden (3 Akte, 4 Screens; Screen 2 = ohne Endwissen, Screen 3 = erster vollständiger Reveal). OA-01 entschieden: app.js ES-Modul. OA-02 ✅: `renderFromData()` = Pfad 2. `config.features` = neutrale Fähigkeitswahl. Container-Marker: `data-fw-appchart`. **B1-AP-03 ✅ 2026-06-16:** STATIONS_CONFIG_CONTRACT.md (14 Abschnitte, Felder/Enums/Flags/Redaktions-Gate/Fensterfilter/Fehlerkonzept) angelegt. APP_SPEC.md §8/§21/§22 aktualisiert.
**B1-AP-04 ✅ 2026-06-16:** APP_SPEC.md §23 Beweisdramaturgie auf V2.1 erweitert (§23.1–§23.19). Hindsight Bias als Hauptgegner (§23.11), Aha-Moment-Hierarchie umgebaut (Primär/Sekundär/Transfer §23.4), Dramaturgische Stationsrollen (§23.12), Falsche Auflösung + Finaler Wackler (§23.13–14), Informationsethik/Kein-Dark-Pattern (§23.15), Microcopy-Regeln (§23.16–18), P→B→N (§23.19). MINI_SPEC_FROM_HAUPTDOKUMENT.md enthält veraltete Screen-2-Aussagen → Fundstelle für B1-AP-08.
**B1-AP-05 ✅ 2026-06-16:** APP_SPEC.md §14 von „A11y-Vertrag" (7 Subsektionen) auf „A11y- und Mobile-Regeln" (15 Subsektionen, §14.0–§14.14) erweitert. Mobile als Standardfall (§14.0), Collapsible-Zwischenstand komplett spezifiziert (Spec + A11y + Desktop, §14.5), Fokusführung Variante A/B, Screenreader-Stationswechsel (§14.1), Chart-A11y Screen 2 vs. 3 (§14.2), Reduced Motion + Timing-Grenzen (§14.6), Mobile-Layout (§14.8), Button-Regeln (§14.9), Touch-Ziele/Content-Dichte/Fehlermeldungen (§14.11–§14.13). §22 Gate mit 19 AP-05-Prüfpunkten. Version V2.2. Kein Code geändert. **B1-AP-06 ✅ 2026-06-16:** QA_TEST_CASES.md angelegt (12 Gruppen A–L, 23 Testfälle TC-Format, 18 Muss). APP_SPEC.md §19 Referenzblock + Muss-Kurzliste, Version V2.3. Kein Code geändert.
**B1-AP-07 ✅ 2026-06-16:** REDAKTIONS_GATE.md angelegt (10 Gate-A: G-A01–G-A10 release-blockierend; 7 Gate-B: G-B01–G-B07 qualitätskritisch; 3 Gate-C: G-C01–G-C03 Hinweise). Release-Checkliste, Manuell/Technisch-Trennung, Prod-/Dev-Modus. Verweise in APP_SPEC.md §20 (V2.4), STATIONS_CONFIG_CONTRACT.md §11, QA_TEST_CASES.md (V1.1). Kein Code geändert. Nächster Schritt: **B1-AP-08 (Widersprüchliche Stellen bereinigen) → Slice 7 A11y + Responsive.**
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
