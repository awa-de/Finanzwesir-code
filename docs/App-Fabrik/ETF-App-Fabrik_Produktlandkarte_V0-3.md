# ETF-App-Fabrik – Produktlandkarte V0.3

Stand: 2026-05-09 | Arbeitsstand | Geändert von: Claude

**Neu in V0.3 gegenüber V0.2:**
- Sauberes Zählmodell (18 Master-Apps + 3 Zusatz-Module = 21 App-Ordner)
- Multi-Modul-Master-Apps explizit dokumentiert (B2 + C1)
- Chart-Engine als Infrastruktur separat ausgewiesen
- Abschnitt B: vollständige Liste aller 21 realen App-Ordner mit Verweisen

**Was V0.3 nicht wiederholt:**
- Detaillierte App-Briefings → weiterhin in `ETF-Apps-Hauptdokument.md`
- App-Familien-Details, Factory-Lücken, Pilotstrategie → weiterhin in V0.2
- Vollständige Inventar-Tabelle → `APP_INVENTORY.md`

---

## A — 18 Funnel-Master-Apps

Vollständige Briefings: `ETF-Apps-Hauptdokument.md` (Blöcke A–H)
App-Familien, Factory-Lücken, Pilotstrategie: `ETF-App-Fabrik_Produktlandkarte_V0-2.md`

| # | App | Slug | Block | Factory-Familie | Status |
|---:|---|---|---|---|---|
| 1 | Risiko-Übersetzer / Dacia-Test | `risiko-uebersetzer` | A1 | Calculator + Translator | Offen |
| 2 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | B2 | Scenario Chart | Offen — Multi-Modul |
| 3 | Crash-Reaktions-Test | `crash-reaktions-test` | A2 | Decision + Scenario Chart | Offen |
| 4 | Diversifikations-Detektor | `diversifikations-detektor` | C1 | Explorer / Compare | Offen — Multi-Modul |
| 5 | ETF-Namensdecoder | `etf-namensdecoder` | D1 | Parser / Explainer | Offen |
| 6 | Regulatorisches Risiko Dashboard | `regulatorik-dashboard` | G1 | Dashboard + Scenario Calculator | Prototyp vorhanden |
| 7 | Rendite-Kalibrierung / ETF-Ära | `rendite-kalibrierung` | G2 | Scenario Calculator + Compare | Offen |
| 8 | Market-Timing-Simulator | `market-timing-simulator` | B3 | Challenge / Decision + Reveal Chart | Offen |
| 9 | 1 ETF vs. 5 ETFs / Komplexitätsentlarver | `komplexitaets-entlarver` | C2 | Compare / Complexity Reducer | Offen |
| 10 | TER-Rechner / Kostenkiller | `kostenkiller-ter` | D3 | Calculator + Cost Scenario Chart | Offen |
| 11 | Prokrastinations-Preis | `prokrastinations-preis` | B1 | Calculator + Live Counter | Pilot 1 🟢 (P-01 entschieden) |
| 12 | ESG-Spiegel | `esg-spiegel` | E1 | Explorer / Compare | Offen |
| 13 | Renditekiller Volatilität | `renditekiller-volatilitaet` | F1 | Calculator / Simulation | Offen |
| 14 | Passiv-Paradox | `passiv-paradox` | G3 | Interactive Explainer | 🟡 Eigenständige App (Arbeitsannahme) |
| 15 | Replizierer vs. Swapper | `replizierer-swapper` | D2 | Explainer / Animation | Offen |
| 16 | Thesaurierer vs. Ausschütter | `thesaurierer-rennen` | F2 | Calculator / Comparison Race | Offen |
| 17 | Weltdepot-Baukasten | `weltdepot-baukasten` | C3 | Configurator / Portfolio Compare | Offen |
| 18 | ETF-Reifegrad-Test + Start-Konfigurator | `etf-reifegrad-finale` | H1 | Quiz + Configurator | Offen |

---

## B — 21 reale App-Ordner in /Apps

Alle realen Arbeitsordner. In `docs/App-Fabrik` nur Verweise, kein Code.

**18 Master-Apps** (vollständige Inventar-Tabelle: `APP_INVENTORY.md`):

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
