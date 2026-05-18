# Status — App-Fabrik

Stand: 2026-05-18 | Arbeitsstand | Geändert von: Claude
Verzeichnis: `docs/App-Fabrik` — temporärer Konsolidierungsraum, kein produktiver Code

---

## Verzeichnis-Trennung (Invariante)

| Verzeichnis | Zweck |
|---|---|
| `/Apps/[slug]/` | Reale App-Arbeitsordner — Code, Prototypen, Daten, Prompts |
| `/docs/App-Fabrik/` | Konsolidierung, Standards, Entscheidungen — nur Verweise auf /Apps/..., kein Code |

**Alle Dokumente in `docs/App-Fabrik` sind Arbeitsstände.** Begriffe wie „final" oder „binding" in Dateinamen beschreiben eine Absicht, keine Realität. Erst nach Überführung in `docs/spec/` gilt etwas als bindend.

---

## Sauberes Zählmodell

| Kategorie | Anzahl | Quelle |
|---|---|---|
| Funnel-Master-Apps | 21 | ETF-Apps-Hauptdokument.md v5.0 (Blöcke A–H, B4/B5 in Block B) |
| Reale App-Ordner in /Apps | 24 | Repo-Stand 2026-05-18; +der-alte-euro, +depot-kipppunkt |
| Differenz | 3 | Keine unklaren Apps — korrekte Zuordnung bekannt |
| Chart-Engine | 1 | Gemeinsame Infrastruktur — kein App-Ordner, kein Funnel-Slot |

### Die 3 Zusatz-Module (keine unklaren Apps)

| App-Ordner | Gehört zu | Modulrolle | Fachliche Aussage |
|---|---|---|---|
| `/Apps/rollierende-sparplaene/` | B2 Geburtsjahrlos-Simulator | Erweiterungsmodul / Analysemodus | Starte denselben Sparplan in Jahr Z, Z+1, Z+2 — zeigt Renditabhängigkeit vom Startjahr |
| `/Apps/investment-universum/` | C1 Diversifikations-Detektor | Gegenperspektive / Grundmodell | Egal wie kleinteilig man ETFs schneidet: Industrieländer plus Schwellenländer bleiben das konstante Universum |
| `/Apps/weltkarte-etf-indizes/` | C1 Diversifikations-Familie | Visuelles Lernmodul / Companion-App | Nutzer klickt Index; enthaltene Länder werden auf Weltkarte farblich hervorgehoben |

---

## Robuste Arbeitsannahmen

Hinreichend gesichert — gelten als Basis für weitere Entscheidungen:

1. Die App-Fabrik baut keine 21 Einzelanfertigungen — sie baut App-Familien mit gemeinsamen Templates.
2. 18 Master-Apps → 5–7 App-Familien (Calculator, Scenario Chart, Decision/Quiz, Explorer/Compare, Parser/Explainer, Dashboard, Configurator).
3. Die 3 Zusatz-Module sind Erweiterungen definierter Master-Apps, keine isolierten Projekte.
4. Ghost bleibt CMS; Apps werden über HTML-Cards eingebettet.
5. JavaScript läuft clientseitig; kein Backend.
6. Design-System kommt aus Theme/CSS-Tokens — kein App-spezifisches Styling.
7. Claude nutzt vorhandene Skills, Commands und Gates — baut keine Parallelstruktur.
8. Demo-Template (Perplexity) ist Labor, nicht Produktionsstandard.
9. Bestehende Prototypen bleiben Referenz — werden nicht blind überschrieben.
10. Chart-Engine ist gemeinsame Infrastruktur — wird als Subsystem der App-Fabrik behandelt, nicht als Sonderwelt.

---

## Aktueller Stand: Was vorhanden ist

| Was | Wo | Zustand |
|---|---|---|
| Funnel-Architektur + 18 App-Briefings | `ETF-Apps-Hauptdokument.md` | Primärquelle, inhaltlich stark |
| Factory-Analyse | `ETF-App-Fabrik_Factory-Analyse.md` | App-Familien-Zielmodell, Repo-Abgleich, Factory-Lücken |
| App-Register | `ETF-App-Fabrik_App-Register.md` | Schlanker Index: 19 Master-Apps + 22 reale Ordner |
| App-Fabrik-Konsolidierung | `App-Fabrik_Konsolidierung_Naechste-Schritte_V0-1.md` | Strategisches Leitdokument |
| Zusatzpaket-Bewertung | `App-Fabrik_Zusatzpaket-Integration_V0-1.md` | Demo vs. Produktion klar getrennt |
| Demo-Template (Perplexity) | `_input/perplexity/` | Input-Material, nicht bindend |
| Prototyp: Regulatorik | `/Apps/regulatorik-dashboard/` | Vollständig, Single-HTML, factory-Migration ausstehend |
| Prototyp: Rollierende Sparpläne | `/Apps/rollierende-sparplaene/` | MSCI Sparplan v2 + annotiert, starke Vorarbeit |
| Prototyp: Weltkarte v2 | `/Apps/weltkarte-etf-indizes/` | Bester Explorer-Prototyp im Repo |
| Konzept-Fragment | `/Apps/investment-universum/` | Prompt-Dokument, kein Code |
| Theme + Chart-Engine | `Theme/assets/js/fw-chart-engine/` | Stabil, Architektur-Vorbild |
| Design-System | `docs/design-system/` | Tokens, Komponenten-Specs |

---

## Was fehlt (kritische Factory-Lücken)

Detaillierte Lücken-Analyse: `ETF-App-Fabrik_Factory-Analyse.md` §7

| Kategorie | Kritischste Lücke |
|---|---|
| Architektur | Kein allgemeiner App-Bootstrapper / AppRegistry |
| Architektur | Kein verbindlicher App-Fabrik-Standard (`docs/spec/APP-FACTORY-STANDARD.md`) |
| Daten | Historische Renditedaten nicht normiert |
| UX/UI | Gemeinsame App-Hülle (Header, Controls, Ergebnis-Zone, CTA) nicht definiert |
| Workflow | Vorhandene Claude-Skills nicht app-spezifisch orchestriert |
| Pilot | Keine erste App durch die Factory gelaufen |

---

## Nächste Schritte (Priorität)

1. APP_INVENTORY.md — vollständige Zuordnungstabelle aller 21 App-Ordner ✅
2. 01_DECISION_LOG.md — Entscheidungen und Arbeitsannahmen trennen ✅
3. 02_OPEN_QUESTIONS.md — offene Fragen sammeln ✅
4. 03_APP_FACTORY_STANDARD_DRAFT.md — Standard formulieren (Draft) ✅
5. 04_CLAUDE_WORKFLOW_DRAFT.md — Workflow mit vorhandenen Skills orchestrieren ✅
6. 05_PILOT_STRATEGY.md — erste Pilot-App und Reihenfolge festlegen ✅
7. → Pilot-App bauen (empfohlen: `prokrastinations-preis`)
