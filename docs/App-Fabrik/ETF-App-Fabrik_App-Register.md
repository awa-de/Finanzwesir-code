# ETF-App-Fabrik – App-Register

Stand: 2026-05-18 | V0.5 | Geändert von: Claude

**Dieses Dokument enthält:**
- Schlanke Master-App-Liste (21 Apps: #, Slug, Block, Factory-Familie, Status)
- Vollständige Liste aller 24 realen App-Ordner in /Apps
- Chart-Engine als gemeinsame Infrastruktur
- Multi-Modul-Master-Apps (B2, C1)

**Was dieses Dokument nicht wiederholt:**
- Detaillierte App-Briefings → `ETF-Apps-Hauptdokument.md`
- App-Familien-Details, Factory-Lücken, Pilotstrategie → `ETF-App-Fabrik_Factory-Analyse.md`
- Vollständige Inventar-Tabelle → `APP_INVENTORY.md`

---

## A — 21 Funnel-Master-Apps

Vollständige Briefings: `ETF-Apps-Hauptdokument.md` (Blöcke A–H)
App-Familien, Factory-Lücken, Pilotstrategie: `ETF-App-Fabrik_Factory-Analyse.md`

| # | App | Slug | Block | Factory-Familie | Status |
|---:|---|---|---|---|---|
| 1 | Risiko-Übersetzer / Dacia-Test | `risiko-uebersetzer` | A1 | Calculator + Translator | Offen |
| 2 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | B2 | Scenario Chart | Offen — Multi-Modul |
| 3 | Crash-Reaktions-Test | `crash-reaktions-test` | A2 | Decision + Scenario Chart | Offen |
| 4 | Der Markt kam zurück. Du nicht. | `markt-kam-zurueck` | A3 | Scenario Chart + Decision Threshold | Offen |
| 5 | Diversifikations-Detektor | `diversifikations-detektor` | C1 | Explorer / Compare | Offen — Multi-Modul |
| 6 | ETF-Namensdecoder | `etf-namensdecoder` | D1 | Parser / Explainer | Offen |
| 7 | Regulatorisches Risiko Dashboard | `regulatorik-dashboard` | G1 | Dashboard + Scenario Calculator | Prototyp vorhanden |
| 8 | Rendite-Kalibrierung / ETF-Ära | `rendite-kalibrierung` | G2 | Scenario Calculator + Compare | Offen |
| 9 | Market-Timing-Simulator | `market-timing-simulator` | B3 | Challenge / Decision + Reveal Chart | Offen |
| 10 | 1 ETF vs. 5 ETFs / Komplexitätsentlarver | `komplexitaets-entlarver` | C2 | Compare / Complexity Reducer | Offen |
| 11 | TER-Rechner / Kostenkiller | `kostenkiller-ter` | D3 | Calculator + Cost Scenario Chart | Offen |
| 12 | Marktzeit schlägt Timing / Lieber heute als morgen | `prokrastinations-preis` | B1 | Scenario Chart (historische Monatsdaten) | Pilot 1 🟢 (P-01 entschieden) |
| 13 | ESG-Spiegel | `esg-spiegel` | E1 | Explorer / Compare | Offen |
| 14 | Renditekiller Volatilität | `renditekiller-volatilitaet` | F1 | Calculator / Simulation | Offen |
| 15 | Passiv-Paradox | `passiv-paradox` | G3 | Interactive Explainer | 🟡 Eigenständige App (Arbeitsannahme) |
| 16 | Replizierer vs. Swapper | `replizierer-swapper` | D2 | Explainer / Animation | Offen |
| 17 | Thesaurierer vs. Ausschütter | `thesaurierer-rennen` | F2 | Calculator / Comparison Race | Offen |
| 18 | Weltdepot-Baukasten | `weltdepot-baukasten` | C3 | Configurator / Portfolio Compare | Offen |
| 19 | ETF-Reifegrad-Test + Start-Konfigurator | `etf-reifegrad-finale` | H1 | Quiz + Configurator | Offen |
| 20 | Der alte Euro | `der-alte-euro` | F3 | Calculator-Visualisierung / Mechanik-Mini-App | Offen |
| 21 | Depot-Kipppunkt | `depot-kipppunkt` | F4 | Calculator / Scenario-Chart | Offen |

---

## B — 24 reale App-Ordner in /Apps

Alle realen Arbeitsordner. In `docs/App-Fabrik` nur Verweise, kein Code.

**21 Master-Apps** (vollständige Inventar-Tabelle: `APP_INVENTORY.md`):

| App-Ordner | Zugehöriger Funnel-Block | Prototyp-Stand |
|---|---|---|
| `/Apps/crash-reaktions-test/` | A2 | Kein Code |
| `/Apps/diversifikations-detektor/` | C1 | Kein Code |
| `/Apps/esg-spiegel/` | E1 | Kein Code |
| `/Apps/etf-namensdecoder/` | D1 | Kein Code |
| `/Apps/etf-reifegrad-finale/` | H1 | Kein Code |
| `/Apps/geburtsjahrlos/` | B2 | Kein Code |
| `/Apps/komplexitaets-entlarver/` | C2 | Kein Code |
| `/Apps/kostenkiller-ter/` | D3 | Kein Code |
| `/Apps/markt-kam-zurueck/` | A3 | Kein Code — Mini-Spec vorhanden |
| `/Apps/market-timing-simulator/` | B3 | Kein Code |
| `/Apps/passiv-paradox/` | G3 | Kein Code |
| `/Apps/prokrastinations-preis/` | B1 | Kein Code — Pilot-Kandidat |
| `/Apps/regulatorik-dashboard/` | G1 | Vollständiger Single-HTML-Prototyp |
| `/Apps/rendite-kalibrierung/` | G2 | Kein Code |
| `/Apps/renditekiller-volatilitaet/` | F1 | Kein Code |
| `/Apps/replizierer-swapper/` | D2 | Kein Code |
| `/Apps/risiko-uebersetzer/` | A1 | Kein Code |
| `/Apps/thesaurierer-rennen/` | F2 | Kein Code |
| `/Apps/weltdepot-baukasten/` | C3 | Kein Code |

**3 Zusatz-Module** (kein eigener Funnel-Slot):

| App-Ordner | Gehört zu | Modulrolle | Prototyp-Stand |
|---|---|---|---|
| `/Apps/investment-universum/` | C1 Diversifikations-Detektor | Gegenperspektive / Grundmodell | Konzept-Fragment (Prompt-Dokument, kein Code) |
| `/Apps/rollierende-sparplaene/` | B2 Geburtsjahrlos-Simulator | Erweiterungsmodul / Analysemodus | Starker Prototyp (msci-sparplan_v2.html + annotated) |
| `/Apps/weltkarte-etf-indizes/` | C1 Diversifikations-Familie | Visuelles Lernmodul / Companion-App | Starker Prototyp (etf-index-map_v2.html, 16 Indizes, Mobile Bottom Sheet) |
| `/Apps/der-alte-euro/` | F3 Der alte Euro | Master-App | Kein Code — Mini-Spec vorhanden |
| `/Apps/depot-kipppunkt/` | F4 Depot-Kipppunkt | Master-App | Kein Code — Mini-Spec vorhanden |

---

## C — Chart-Engine als gemeinsame Infrastruktur

Die Chart-Engine ist **kein App-Unterverzeichnis** und **kein Funnel-Slot**.

| Aspekt | Detail |
|---|---|
| Pfad | `Theme/assets/js/fw-chart-engine/` |
| Rolle | Gemeinsame Infrastruktur für alle Chart-basierten Apps |
| Verhältnis zu App-Fabrik | Subsystem — Chart-Apps sind eine App-Familie unter mehreren |
| Architektur-Bedeutung | Vorbild für App-Fabrik: Daten rein → validieren → versiegeln → Strategie wählen → rendern → Fehler abfangen |
| Status | Stabil — keine Änderung ohne separates Gate |
| TABU | kein Eingriff ohne explizite Freigabe |

---

## D — Multi-Modul-Master-Apps

### D.1 — B2: Geburtsjahrlos-Simulator (Multi-Modul)

**Master-App:** `/Apps/geburtsjahrlos/`  
**Fachliche Aussage:** Du kontrollierst weder die Börse noch dein Geburtsjahr — aber du kontrollierst, wann du anfängst.

**Erweiterungsmodul:** `/Apps/rollierende-sparplaene/`  
**Modulrolle:** Analysemodus — zeigt quantitativ, wie stark die Rendite vom Startjahr abhängt  
**Fachliche Aussage:** Starte denselben Sparplan mit X Euro und Laufzeit Y im Jahr Z, dann denselben in Z+1, Z+2 usw. — die Streuung der Ergebnisse macht die Startjahrabhängigkeit sichtbar.

**Verbindung:** Beide Apps teilen dieselbe historische Datenbasis (MSCI NTR + CPI). Technisch können sie getrennt bleiben und sich per Verlinkung ergänzen. 🟡 Arbeitsannahme: separate Ordner, fachlich als zwei Perspektiven behandelt (→ Z-03 in 01_DECISION_LOG.md). Weiterhin offen: gemeinsame UI mit Modi — Klärung nach Pilot.

---

### D.2 — C1: Diversifikations-Detektor + Familie (Multi-Modul)

**Master-App:** `/Apps/diversifikations-detektor/`  
**Fachliche Aussage:** Mehr ETFs bedeuten oft nur mehr Doppelungen — du kaufst das Gleiche zweimal.

**Companion-App:** `/Apps/weltkarte-etf-indizes/`  
**Modulrolle:** Visuelles Lernmodul — macht Index-Zusammensetzungen räumlich greifbar  
**Fachliche Aussage:** Nutzer klickt auf einen Index; die enthaltenen Länder werden auf einer Weltkarte farblich hervorgehoben. So wird sichtbar, welche Regionen in welchen Indizes stecken.

**Gegenperspektive / Grundmodell:** `/Apps/investment-universum/`  
**Modulrolle:** Zeigt die konstante Grundstruktur des Investment-Universums  
**Fachliche Aussage:** Egal wie kleinteilig man ETFs schneidet — das Investment-Universum bleibt in Summe konstant: Industrieländer plus Schwellenländer. Wer viele ETFs kauft, kauft dasselbe Universum in verschiedenen Verpackungen.

**Verbindung:** Alle drei teilen den Explorer/Compare-Ansatz. Gemeinsames Datenmodell (Indexhierarchie, Länder-/Gewichtungsdaten) sinnvoll. 🟡 Arbeitsannahme: lose Kopplung, einzeln einbettbar (→ Z-04 in 01_DECISION_LOG.md). Weiterhin offen: konkrete technische Kopplung und Navigation — Klärung bei C1-Spezifikation.

---

## E — Änderungsprotokoll

| Version | Datum | Änderungen |
|---|---|---|
| V0.1 | 2026-05-09 | Erste Produktlandkarte aus ETF-Apps-Hauptdokument. 18 Apps, App-Familien, Datenbedarf, Chartbedarf. |
| V0.2 | 2026-05-09 | Repo-Abgleich, vorhandene Prototypen dokumentiert, Factory-Lücken identifiziert, Pilotstrategie. |
| V0.3 | 2026-05-09 | Sauberes Zählmodell (18+3=21), Multi-Modul-Master-Apps B2+C1, Chart-Engine als Infrastruktur, vollständige App-Ordner-Liste. |
| V0.3.1 | 2026-05-09 | Entscheidungen eingetragen: P-01 (Pilot-Reihenfolge), A-08 (D3/TopoJSON lokal), Fam-01 (G3 eigenständig), Z-03/Z-04 (B2/C1 Rollen-Zuordnung). Statuszeilen aktualisiert. |
| V0.4 | 2026-05-18 | + A3 „Der Markt kam zurück. Du nicht." (markt-kam-zurueck). Zählmodell 18+3=21 → 19+3=22. |
| V0.5 | 2026-05-18 | B1 umgerahmt (Marktzeit schlägt Timing). B2 bereinigt (Epochen-Fokus, Realwerte). + F3 Der alte Euro + F4 Depot-Kipppunkt. Master-Apps 19→21, reale Ordner 22→24. |
