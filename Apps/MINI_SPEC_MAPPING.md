# MINI_SPEC_MAPPING — Apps / ETF-Apps-Hauptdokument

Stand: 2026-05-18 | Quelle: docs/App-Fabrik/ETF-Apps-Hauptdokument.md

Mapping aller 21 Haupt-App-Abschnitte aus dem Hauptdokument auf die 23 realen App-Ordner unter `/Apps/`.

---

## Tabelle: Alle 23 App-Ordner

| Block | App-ID | App-Titel | Slug | App-Ordner | Mini-Spec vorhanden | Modulrolle | Status |
|-------|--------|-----------|------|------------|---------------------|------------|--------|
| A | A1 | Risiko-Übersetzer (Dacia-Test) | `risiko-uebersetzer` | `/Apps/risiko-uebersetzer/` | ✅ | Haupt-App | Dokumentiert |
| A | A2 | Crash-Reaktions-Test | `crash-reaktions-test` | `/Apps/crash-reaktions-test/` | ✅ | Haupt-App | Dokumentiert |
| B | B1 | Marktzeit schlägt Timing / Lieber heute als morgen | `prokrastinations-preis` | `/Apps/prokrastinations-preis/` | ✅ | Haupt-App | Dokumentiert |
| B | B2 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | `/Apps/geburtsjahrlos/` | ✅ | Haupt-App | Dokumentiert |
| B | B2 (Erw.) | Rollierende Sparpläne | `geburtsjahrlos` | `/Apps/rollierende-sparplaene/` | ✅ | Erweiterungsmodul | Dokumentiert |
| B | B3 | Market-Timing-Fail-Simulator | `market-timing-simulator` | `/Apps/market-timing-simulator/` | ✅ | Haupt-App | Dokumentiert |
| C | C1 | Diversifikations-Detektor | `diversifikations-detektor` | `/Apps/diversifikations-detektor/` | ✅ | Haupt-App | Dokumentiert |
| C | C1 (Geg.) | Investment-Universum | `diversifikations-detektor` | `/Apps/investment-universum/` | ✅ | Gegenperspektive | Dokumentiert |
| C | C1/C3 (Comp.) | Weltkarte ETF-Indizes | `diversifikations-detektor` | `/Apps/weltkarte-etf-indizes/` | ✅ | Companion-App | Dokumentiert |
| C | C2 | Komplexitätsentlarver (1 ETF vs. 5) | `komplexitaets-entlarver` | `/Apps/komplexitaets-entlarver/` | ✅ | Haupt-App | Dokumentiert |
| C | C3 | Weltdepot-Baukasten | `weltdepot-baukasten` | `/Apps/weltdepot-baukasten/` | ✅ | Haupt-App | Dokumentiert |
| D/E | D1 | ETF-Namensdecoder | `etf-namensdecoder` | `/Apps/etf-namensdecoder/` | ✅ | Haupt-App | Dokumentiert |
| D/E | D2 | Replizierer vs. Swapper | `replizierer-swapper` | `/Apps/replizierer-swapper/` | ✅ | Haupt-App | Dokumentiert |
| D/E | D3 | Kostenkiller (TER-Rechner) | `kostenkiller-ter` | `/Apps/kostenkiller-ter/` | ✅ | Haupt-App | Dokumentiert |
| D/E | E1 | ESG-Spiegel | `esg-spiegel` | `/Apps/esg-spiegel/` | ✅ | Haupt-App | Dokumentiert |
| F | F1 | Renditekiller (Volatilitäts-Dämpfer) | `renditekiller-volatilitaet` | `/Apps/renditekiller-volatilitaet/` | ✅ | Haupt-App | Dokumentiert |
| F | F2 | Thesaurierer vs. Ausschütter | `thesaurierer-rennen` | `/Apps/thesaurierer-rennen/` | ✅ | Haupt-App | Dokumentiert |
| G | G1 | Regulatorisches Risiko Dashboard | `regulatorik-dashboard` | `/Apps/regulatorik-dashboard/` | ✅ | Haupt-App | Dokumentiert |
| G | G2 | Rendite-Kalibrierung | `rendite-kalibrierung` | `/Apps/rendite-kalibrierung/` | ✅ | Haupt-App | Dokumentiert |
| G | G3 | Das Passiv-Paradox | `passiv-paradox` | `/Apps/passiv-paradox/` | ✅ | Haupt-App | Dokumentiert |
| H | H1 | ETF-Reifegrad-Test & Start-Konfigurator | `etf-reifegrad-finale` | `/Apps/etf-reifegrad-finale/` | ✅ | Haupt-App | Dokumentiert |
| F | F3 | Der alte Euro | `der-alte-euro` | `/Apps/der-alte-euro/` | ✅ | Mechanik-Mini-App | Dokumentiert |
| F/H | F4 | Depot-Kipppunkt | `depot-kipppunkt` | `/Apps/depot-kipppunkt/` | ✅ | Statuswechsel-App | Dokumentiert |

---

## Erläuterung Multi-Modul-Zuordnungen

### B2 (Geburtsjahrlos) → 2 Ordner:
- `/Apps/geburtsjahrlos/` — Haupt-App (B2 direkt)
- `/Apps/rollierende-sparplaene/` — Erweiterungsmodul (B2-Familie)

Fachlicher Zusammenhang: Der Geburtsjahrlos-Simulator zeigt Startjahr-Abhängigkeit über ein Ganzes Leben (30 Jahre). Das Erweiterungsmodul „Rollierende Sparpläne" untersucht denselben Effekt im Mehrjahrs-Rhythmus und macht die Timing-Abhängigkeit noch greifbarer.

### C1 (Diversifikations-Detektor) → 3 Ordner:
- `/Apps/diversifikations-detektor/` — Haupt-App (C1 direkt)
- `/Apps/investment-universum/` — Gegenperspektive (C1-Familie)
- `/Apps/weltkarte-etf-indizes/` — Companion-App (C1/C3-Familie)

Fachlicher Zusammenhang:
- **C1 Haupt**: Zeigt, dass User Doppelungen kaufen (horizontale Perspektive: Anzahl ETFs).
- **Investment-Universum**: Zeigt, dass das Universum konstant bleibt (vertikale Perspektive: fundamentale Märkte).
- **Weltkarte-Indizes**: Macht Überschneidungen geografisch sichtbar (visuelle Komponente für beide).

---

## Status aller 23 MINI_SPEC_FROM_HAUPTDOKUMENT.md

| App-Ordner | MINI_SPEC-Status | Notizen |
|---|---|---|
| `crash-reaktions-test` | ✅ Erstellt | Haupt-App A2 |
| `diversifikations-detektor` | ✅ Erstellt | Haupt-App C1 |
| `esg-spiegel` | ✅ Erstellt | Haupt-App E1 |
| `etf-namensdecoder` | ✅ Erstellt | Haupt-App D1 |
| `etf-reifegrad-finale` | ✅ Erstellt | Haupt-App H1 |
| `geburtsjahrlos` | ✅ Erstellt | Haupt-App B2 |
| `investment-universum` | ✅ Erstellt | Gegenperspektive zu C1 |
| `komplexitaets-entlarver` | ✅ Erstellt | Haupt-App C2 |
| `kostenkiller-ter` | ✅ Erstellt | Haupt-App D3 |
| `market-timing-simulator` | ✅ Erstellt | Haupt-App B3 |
| `passiv-paradox` | ✅ Erstellt | Haupt-App G3 |
| `prokrastinations-preis` | ✅ Erstellt | Haupt-App B1; APP_SPEC.md vorhanden (nicht überschrieben) |
| `regulatorik-dashboard` | ✅ Erstellt | Haupt-App G1 |
| `rendite-kalibrierung` | ✅ Erstellt | Haupt-App G2 |
| `renditekiller-volatilitaet` | ✅ Erstellt | Haupt-App F1 |
| `replizierer-swapper` | ✅ Erstellt | Haupt-App D2 |
| `risiko-uebersetzer` | ✅ Erstellt | Haupt-App A1 |
| `rollierende-sparplaene` | ✅ Erstellt | Erweiterungsmodul zu B2 |
| `thesaurierer-rennen` | ✅ Erstellt | Haupt-App F2 |
| `weltdepot-baukasten` | ✅ Erstellt | Haupt-App C3 |
| `weltkarte-etf-indizes` | ✅ Erstellt | Companion-App zu C1/C3 |
| `der-alte-euro` | ✅ Erstellt | Mechanik-Mini-App F3 |
| `depot-kipppunkt` | ✅ Erstellt | Statuswechsel-App F4 |

---

## Zusammenfassung

- **21 Haupt-App-Abschnitte** aus ETF-Apps-Hauptdokument dokumentiert (inkl. F3 Der alte Euro, F4 Depot-Kipppunkt)
- **3 Multi-Modul-Abschnitte** mit Zugehörigkeit zur Master-App dokumentiert
- **23 MINI_SPEC_FROM_HAUPTDOKUMENT.md Dateien** erstellt (keine Überschreibung bestehender Dateien)
- **1 APP_SPEC.md** vorhanden (`prokrastinations-preis`) — nicht berührt
- **Alle Umlaute** (ä, ö, ü, ß) korrekt geschrieben
