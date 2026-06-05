Stand: 2026-06-05 | Session: COMP-ARCH-Verankerung | Geändert von: Claude

# ADR-COMP-ARCH-01: Component Composition Architecture

**Typ:** Architekturentscheidung  
**Status:** 🟢 ENTSCHIEDEN — 2026-06-05  
**Kontext:** Architekturdiskussion im Umfeld von OA-02 (Bibliothek + Integrationsform für SparplanChart / B1 Slice-4)

---

## Entscheidung

Finanzwesir-Apps werden als **komponierte Erlebnisflächen** modelliert.

Das verbindliche mentale Modell:

- **Die App ist das Lego-Brett.**
- **Die Komponenten sind die Steine.**
- **Engines und Renderer sind die Spezialwerkzeuge, die bestimmte Steine korrekt herstellen.**

Fachbegriff: **Component Composition Architecture** (Komponentenbasierte App-Komposition)

---

## Kontext

Die App-Fabrik ist mit einer starken Chart-Engine-Geschichte gewachsen. Der MSCI-World-Chart war das erste prominente Produkt, und das mentale Modell „App = Chart mit Drumherum" prägte frühe Entscheidungen und Begriffe.

Die Analyse der 21 geplanten Apps zeigt: Nur ein Teil der Apps hat Charts als Hauptbaustein. Viele Apps sind Calculator-, Quiz-, Explorer- oder Dashboard-Formen ohne Chart-Komponente oder mit Chart als Nebenrolle (A1, D1, Weltkarte ETF-Indizes, G1, H1 u.a.).

Die Entscheidung OA-02 (Bibliothek und Integrationsform für Chart-Komponenten in App-Fabrik-Apps) hat diese Asymmetrie aufgedeckt: Eine Lösung für „App-Charts" hätte ein falsches Sondermodell etabliert und die App-Fabrik implizit auf Chart-Produktion reduziert.

---

## Begründung

- Ohne explizites Modell entstehen Implementierungen, die Charts als architektonischen Sonderfall behandeln.
- Die Chart-Engine ist vorhanden und gut ausgebaut — sie ist die richtige Single Source of Truth für Chart-Komponenten. Sie bleibt das.
- Andere Komponentenklassen (Map, Card, Control) müssen gleichwertig behandelt werden.
- Ein späteres LLM oder Teammitglied muss ohne Kenntnis der Geschichte zum richtigen Modell gelangen können.

---

## Konsequenzen

**Positiv:**

- OA-02 ist jetzt klar gerahmt: Eine Chart-Komponente app-fabrikfähig machen — nicht einen Sonderweg für „App-Charts" bauen.
- Zukünftige Map-, Card- oder Control-Engines haben einen definierten Platz im Modell.
- Keine App muss mehr als „Chart mit Drumherum" implementiert werden.
- Der Begriff „Normaler Chart vs. App-Chart" fällt weg — es gibt nur Chart-Komponenten in unterschiedlichen Kompositionen.

**Offene Folgeentscheidungen:**

| Frage | Status |
|---|---|
| OA-02: Welche Bibliothek und Integrationsform für Chart-Komponenten? | Offen |
| Card-Komponente: Wann und wie entsteht ein CardRenderer? | Durch Bedarf |
| Map-Komponente: Weltkarte ETF-Indizes als erster Fall — Standardisierung? | Durch Bedarf |
| Control-Komponente: Wann wandern Slider/Buttons in eine eigene UI-Shell? | Durch Bedarf |

---

## Was diese Entscheidung nicht ändert

- Die Chart-Engine (ChartEngine.js, Layer 1–5) bleibt unverändert — TABU.
- Bestehende Ghost-Card-Verträge (`financial-chart-module`) bleiben vollständig gültig.
- Bestehende Mini-Specs werden nicht umgeschrieben.
- App-Fabrik-Familien (§4 in 03_APP_FACTORY_STANDARD_DRAFT.md) bleiben gültig — sie beschreiben Interaktionsmuster, keine Architekturmodelle.
- P-01–P-11 aus dem Architecture Strategy Paper bleiben unverändert gültig.

---

## Kanonischer Ort

Vollständige Dokumentation des Modells: `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` §1a  
Querverweise:
- `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md` §1 (Einordnung in die Component Composition Architecture)
- `docs/spec/APP-INTERFACE.md` §4 (Querverweis im internen Entwicklervertrag)
