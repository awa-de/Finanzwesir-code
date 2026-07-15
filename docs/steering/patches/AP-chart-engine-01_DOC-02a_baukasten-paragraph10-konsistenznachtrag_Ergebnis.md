Stand: 2026-07-15 | Session: AP-chart-engine-01 / DOC-02a (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, DOC-02a: Baukasten §10 Konsistenz-Nachtrag — Ergebnisprotokoll

Status: GRÜN — reiner Konsistenz-Nachtrag, statische QA bestanden. Kein Code, kein Test, kein Tool, kein Commit.

Reparatur-AP: behebt einen von Albert nach DOC-02-Abnahme gefundenen materiellen Dokumentwiderspruch. Der neue §6.11-Erweiterungsvertrag (DOC-02) verlangt für eine fachlich neue Donut-/Pie-Legendenbedeutung (Segment-Toggle) einen eigenen, künftigen Design-/Vertrags-AP — die bestehende §10-Tabelle nahm diese Entscheidung mit der Formulierung „Pills je Segment (Toggle je nach Chartlogik — Engine entscheidet)" bereits still vorweg. Das widersprach DOC-02.

## Geänderte Dateien

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (eine Tabellenzelle in §10 + Stand-Zeile)
- Diese Ergebnisdatei (neu)

Keine andere Datei geändert.

## Korrektur

§10-Tabelle, Zeile „Legende (vor dem Canvas)", Spalte „Donut":

- **Vorher:** „Pills je Segment (Toggle je nach Chartlogik — Engine entscheidet)"
- **Nachher:** „Rahmen (6.11) übernommen; Legende/Interaktion noch nicht entschieden — wird im CE-5-Preflight fachlich bestimmt (DOC-02a)"

Die Zeilen „Titel", „BAN", „Toolbar", „Canvas", „Caption", „Zustände" sowie die Linie-/Balken-Spalten der Legende-Zeile bleiben unverändert — der Widerspruch betraf ausschließlich diese eine Zelle.

## Konsistenznachweis

Die neue Formulierung deckt sich jetzt wortgleich mit dem Ist-/Soll-Prinzip aus DOC-02:

- §6.11-Erweiterungsvertrag Punkt 4 (DOC-02): „Regel für Donut/Pie und künftige Typen: Vorhandene Bedarfe wiederverwenden; eine neue fachliche Bedeutung nur mit kleinem separatem Design-/Vertrags-AP und anschließend genau einem Renderer-Primitive."
- §10-Tabelle (DOC-02a, jetzt): „Legende/Interaktion noch nicht entschieden — wird im CE-5-Preflight fachlich bestimmt."

Beide Stellen behaupten jetzt identisch: keine vorentschiedene Donut-Legenden-/Toggle-Semantik. Die KDR 15 (`ARCHITECTURE STRATEGY PAPER VX.md`) und Abschnitt 2.6 („Der Rucksack") sind von diesem Widerspruch nicht betroffen — beide äußern sich nicht zu Donut-Legendensemantik, nur zur allgemeinen Strategie-/Renderer-Grenze.

## Dokumentations-QA

1. **`git diff --check`:** exit 0, keine Whitespace-Fehler (nur harmloser LF→CRLF-Hinweis).
2. **Scope-Diff:** `git diff --stat` zeigt ausschließlich `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (+24/−2 Zeilen: Tabellenzelle + Stand-Zeile) geändert. Keine andere Datei im Diff.
3. **Kein Prinzipienverlust:** Nur die eine widersprüchliche Aussage ersetzt, keine sonstige §10-Aussage, keine Tabellenstruktur, kein anderer Paragraph angetastet.

## Nicht Teil dieses APs

Jegliche fachliche Entscheidung über Donut-/Pie-Legendensemantik, Segment-Toggle oder Drill-down-Interaktion — das bleibt CE-5-Preflight-Scope. Kein Code, kein Test, kein Commit.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme dieses Nachtrags: DOC-02 gilt zusammen mit DOC-02a als vollständig und widerspruchsfrei verankert. Danach: CE-5-Preflight für Donut/Pie auf Grundlage des Gesamtvertrags (DOC-02 + DOC-02a).
