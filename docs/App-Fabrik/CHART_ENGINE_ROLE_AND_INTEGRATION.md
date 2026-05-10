# Chart-Engine: Rolle und Architekturprinzipien für die App-Fabrik

Stand: 2026-05-10 | Chart-Engine-Referenzmodell | Geändert von: Claude

**Zweck:** Klärt die Stellung der Chart-Engine im App-Fabrik-Ökosystem und dokumentiert, welche Architekturprinzipien aus dem Architecture Strategy Paper VX als Referenzmuster für App-Fabrik-Apps gelten.

**Quelle:** `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`  
**Bindend für:** Alle App-Fabrik-Apps (Prinzipien P-01–P-10). Die Chart-Engine selbst bleibt ein eigenständiges Subsystem — wird durch dieses Dokument nicht verändert.

---

## 1. Rolle der Chart-Engine

Die Chart-Engine ist ein **eigenständiges Visualisierungs-Subsystem** — keine normale App, kein App-Fabrik-Produkt.

| Was sie ist | Was sie nicht ist |
|---|---|
| Gemeinsame Infrastruktur für Datenvisualisierung | Ein App-Fabrik-App-Ordner mit `fw-app`-Namespace |
| Hat eigenen Ghost-Card-Vertrag (`financial-chart-module`) | Von der App-Fabrik gesteuert oder verwaltet |
| Hat eigene Layer-Architektur (Layer 1–5, 14 KDRs) | Durch neue App-Fabrik-Prinzipien veränderbar |
| Wird von Chart-Apps als Baustein eingesetzt | Ein Sonderfall, der App-Fabrik-Regeln bricht |

**Konsequenz:** Änderungen an der Chart-Engine erfordern ein separates Gate und Alberts explizite Freigabe — unabhängig von diesem Dokument. Dieses Dokument ändert nichts an der Chart-Engine.

---

## 2. Was bleibt chart-spezifisch (nicht auf App-Fabrik übertragen)

Diese Konzepte aus dem Architecture Strategy Paper sind Chart.js- und Canvas-spezifisch:

| Konzept | Warum chart-spezifisch |
|---|---|
| Linear Time Scale (ms-Basis für Zeitachsen) | Chart.js-Zeitachsen-Mechanik |
| Explicit Tick Injection (`sourceTicks`) | Chart.js-Plugin-API |
| `forceGenerator: true` | Chart.js-Konfiguration |
| Unified Density Matrix (konkrete Tabellen) | X-Achsen-Logik für Zeitreihen-Charts |
| Chart.js-Plugin-Struktur (`FwChartPlugins.js`) | Canvas-Plugin-API |
| Canvas-spezifische Pixel-Logik (`FwSmartScales`) | Canvas-Rendering, keine HTML-App-Entsprechung |
| Legend Toggle via `meta.hidden` | Chart.js-Dataset-API |
| Zone Zero Logic als konkreter Algorithmus | Chart-spezifische Tick-Filterung |

Das **Prinzip** hinter diesen Mechanismen (z.B. Truthful UX hinter Explicit Tick Injection, Constraint Dominance hinter der Density Matrix) ist übertragbar. Die konkrete Implementierung nicht.

---

## 3. Was übertragen wird (Prinzipien P-01–P-10)

Diese 10 Architekturprinzipien aus dem Chart-Engine-Paper gelten als Referenzmuster für alle App-Fabrik-Apps.

| ID | Prinzip | Quelle im Paper | Status |
|---|---|---|---|
| P-01 | Read-only AppData nach Ingestion | KDR 1 / Layer 1 Vault | 🟢 direkt übernommen |
| P-02 | Two-Step Parsing | Layer 1 Parser-Vertrag | 🟢 direkt übernommen |
| P-03 | Async-fähige öffentliche APIs | Layer 1 API (`parse()` ist `async`) | 🟡 adaptiert |
| P-04 | AppContext als semantischer Rucksack | KDR 9 (`fwContext`) | 🟡 adaptiert (kein Chart.js) |
| P-05 | Unit Sovereignty | KDR 10 | 🟢 direkt übernommen |
| P-06 | Truthful UX | KDR 7 | 🟢 direkt übernommen |
| P-07 | Constraint Dominance | KDR 8 | 🟡 adaptiert (ohne Density Matrix) |
| P-08 | A11y als Strategie-Vertrag | KDR 13 | 🟢 direkt übernommen |
| P-09 | Theme-Hoheit — semantische Rollen | KDR 14 | 🟢 direkt übernommen |
| P-10 | Reise eines Inputs als Pflichtdokumentation | Appendix A | 🟢 direkt übernommen |

**🟢 direkt übernommen:** Das Prinzip gilt 1:1 für App-Fabrik-Apps.  
**🟡 adaptiert:** Das Prinzip gilt sinngemäß. Die Implementierung weicht ab, weil App-Fabrik-Apps kein Chart.js und kein Canvas nutzen.

Vollständige Beschreibung aller Prinzipien: `03_APP_FACTORY_STANDARD_DRAFT.md` §10.

---

## 4. Wie diese Prinzipien genutzt werden

**Bei APP_SPEC.md erstellen:**
- P-04: AppContext-Schema dokumentieren (welche Felder liefert die App-Strategie?)
- P-08: A11y-Darstellung festlegen (Tabelle? Live Region? Ergebnis-Summary?)
- P-10: Abschnitt „Reise eines Inputs / Datenpunkts" ist Pflicht

**Bei Code-Review:**
P-01 (Read-only), P-05 (Unit Sovereignty) und P-09 (Theme-Hoheit) sind harte Regeln — Verletzungen blockieren den Review.

**Bei Daten-Architektur:**
P-02 (Two-Step Parsing) und P-03 (Async API) bestimmen das Parsing-Muster jedes Dateneingangs.

**Bei UX-Entscheidungen:**
P-06 (Truthful UX) und P-07 (Constraint Dominance) sind Abwägungsrahmen — keine Pixel-Algorithmen, sondern Designprinzipien.

---

## 5. Offene Fragen

| Frage | Quelle |
|---|---|
| Konkretes AppContext-Schema pro App-Familie (Pflichtfelder?) | `02_OPEN_QUESTIONS.md` Arch-06 |
| A11y-Vertrag: Konkrete Darstellung pro App-Familie? | `02_OPEN_QUESTIONS.md` Arch-07 |
