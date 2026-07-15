Stand: 2026-07-15 | Session: AP-chart-engine-01 / DOC-03 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, DOC-03: Segment-Dämpfung, Vertragsnachtrag — Ergebnisprotokoll

Status: GRÜN — reiner Dokumentations- und Vertrags-AP, statische QA vollständig bestanden. Kein Code, kein Test, kein Tool, kein Commit.

Kettenposition: Der CE-5-Preflight (GELB) hatte die Donut-Legende als einzigen offenen Punkt identifiziert — Ist-Code interagiert real (Segment-Ghosting via `PieChartStrategy.handleLegendClick()` + `classList.toggle('hidden-dataset')`), passt aber auf keine der drei bereits belegten Baukasten-Bedeutungen. Albert hat entschieden: dieses Verhalten unverändert als vierter Legendenbedarf „Segment-Dämpfung umschalten“ zu übernehmen. DOC-03 verankert diese Entscheidung im Baukastenvertrag.

## Vorfundene Fremdstände und DOC-03-eigener Diff

`git status --short` vor dem ersten Write:

```text
?? docs/steering/patches/AP-chart-engine-01_CE-5_preflight_donut-pie-chrome-vertragskarte_Ergebnis.md
```

- **Kein Fremdstand im engeren Sinn:** Die einzige vorgefundene Datei ist die eigene Ergebnisdatei des vorherigen CE-5-Preflight-Schritts derselben Session — vor DOC-03 entstanden, nicht DOC-03-Scope, unverändert von diesem AP.
- **DOC-03-eigener Diff:** ausschließlich `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` plus diese neue Ergebnisdatei.

## Geänderte Dateien

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (13 Zeilen eingefügt, 4 ersetzt: Bedarfsliste, neue Definition + Migrationsinvariante, präzisiertes Punkt 4, §10-Zelle, Stand-Zeile)
- Diese Ergebnisdatei (neu)

Keine andere Datei geändert. Insbesondere nicht `ARCHITECTURE STRATEGY PAPER VX.md`, nicht `Der Rucksack (Context Object Pattern).md`, kein Code unter `Theme/`, keine Tests, kein Tool, keine App, kein `tokens.css`, kein Backlog, keine Navigation, keine Session-Logs/Chroniken, kein Commit.

## Entschiedene Legendenbedeutung

Im DOC-02-Unterabschnitt „Semantischer Chrome-Auftrag und Erweiterung“ von §6.11:

1. Die Bedarfsliste (Punkt 2) trägt bei „Legende“ jetzt einen dritten Eintrag: „Legende: keine | Sichtbarkeit von Datenreihen umschalten | Segment-Dämpfung umschalten“.
2. Direkt danach eine eigene, verbindliche Definition „Segment-Dämpfung umschalten (Donut/Pie, bestätigt DOC-03, 2026-07-15)“ mit den fünf vom Auftrag vorgegebenen Punkten: gilt für einzelne Segmente eines Donut-/Pie-Datasets; Klick wechselt ausschließlich aktiv/gedämpft, Segment bleibt sichtbar, Daten unverändert; keine neue Daten-/`fwContext`-/Plugin-/Strategy-Schnittstelle; DOM und Canvas müssen später denselben Zustand vermitteln (CE-5-Scope); kein Drill-down über die Legende.
3. Eine eng begrenzte Migrationsinvariante direkt im Anschluss, wörtlich aus dem Auftrag übernommen: CE-5 darf Technik/Optik in DOM-/Tailwind-/A11y-Rezepte überführen, aber Wirkung/Funktion nicht still verändern — jede Verhaltens- oder Optikänderung braucht Alberts ausdrückliche Freigabe.
4. Punkt 4 des Erweiterungsvertrags umformuliert: „Bereits entschieden“ (Segment-Dämpfung, DOC-03, keine offene Frage mehr) klar von „Weiterhin offen“ (eine rein informative Kategorienliste als abweichende Bedeutung, oder ein Drill-down-Popover) getrennt. Zusätzlicher Satz: „Drill-down-Auslöser“ bleibt weiterhin kein Legendenbedarf — der bestehende Drill-down läuft ausschließlich über einen separaten Canvas-Klickpfad.

## Abgrenzung zu Dataset-Sichtbarkeit, Kategorienliste und Drill-down

- **Dataset-Sichtbarkeit** (Line/regulärer Bar, `chart.isDatasetVisible()`): explizit als eigener, unveränderter erster Bedarfseintrag stehen gelassen — kein `isDatasetVisible()`-Versprechen für Pie/Donut irgendwo im Text.
- **Rein informative Kategorienliste:** in Punkt 4 ausdrücklich als „weiterhin offen“ markiert — eine mögliche künftige, andere Bedeutung, nicht die jetzt entschiedene.
- **Drill-down-Auslöser:** in Punkt 4 und in der Segment-Dämpfung-Definition zweifach ausgeschlossen — „kein Drill-down über die Legende“ bzw. „bleibt weiterhin kein Legendenbedarf“, da der bestehende Drill-down für „Weitere …“-Segmente ein separater Canvas-Klickpfad ist (`PieChartStrategy.onClick`, `fw-chart-show-details`-CustomEvent), nicht Teil der Legende.
- **§10-Konsistenz:** Die Donut-Zelle in der §10-Tabelle (Zeile „Legende (vor dem Canvas)“) widersprach nach der jetzt getroffenen Entscheidung der Formulierung „noch nicht entschieden“ (DOC-02a-Stand) — das ist nach DOC-03 ein echter Widerspruch, kein Ergänzungswunsch. Minimal korrigiert auf: „Bedeutung = Segment-Dämpfung umschalten (entschieden, DOC-03) — Kategorienliste als abweichende Bedeutung und Drill-down-Popover bleiben offen.“ Keine weitere §10-Zeile berührt.

## Migrationsinvariante für CE-5

Wörtlich im Baukasten verankert (§6.11-Erweiterungsvertrag, direkt nach der Segment-Dämpfung-Definition):

> CE-5 darf die bestehende Segment-Dämpfung in DOM-/Tailwind-/A11y-Rezepte überführen, aber ihre sichtbare Wirkung und fachliche Funktion nicht still verändern. Jede Änderung von Verhalten oder abgenommener Optik braucht Alberts ausdrückliche Produktentscheidung.

Diese Invariante gilt ausschließlich für den Donut-Legendenbedarf — sie erweitert nicht die allgemeinen §6.11-Migrationsregeln für Wrapper/Titel/Toolbar/BAN/Popover.

## Dokumentations-QA

1. **`git diff --check`:** exit 0, keine Whitespace-Fehler (nur harmloser LF→CRLF-Hinweis).
2. **Scope-Diff:** `git diff --stat` zeigt ausschließlich `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (+13/−4 Zeilen) geändert; `git status --short` bestätigt keine weitere Datei. Fremdstand (CE-5-Preflight-Ergebnisdatei) unverändert.
3. **Konsistenzprüfung:** Grep in der geänderten Datei nach `Segment`, `Dämpfung`, `Ghost`, `Legende`, `Drill-down`, `Datenreihen`, `Kategorienliste` — 35 Treffer insgesamt über alle sieben Suchbegriffe (u. a. bereits bestehende Treffer aus DOC-02/DOC-02a), die neuen DOC-03-Textstellen sind darin vollständig enthalten (Bedarfsliste, Definition, Migrationsinvariante, Punkt 4, §10-Zelle).
4. **Belege:**
   - Segment-Dämpfung ist als bestehende, bestätigte Bedeutung dokumentiert (Bedarfsliste dritter Eintrag + eigene Definition + Punkt 4 „Bereits entschieden“).
   - Dataset-Sichtbarkeit, informative Kategorienliste und Drill-down bleiben davon getrennt (siehe Abschnitt „Abgrenzung“ oben — jede der drei Alternativbedeutungen ist explizit benannt und ausgeschlossen bzw. als offen markiert, nie vermischt).
   - CE-5 darf Technik/A11y migrieren, aber keine stillschweigende Verhaltens- oder Optikänderung vornehmen (Migrationsinvariante wörtlich verankert).
   - Kein Ist-Code behauptet oder geändert: keine Tailwind-Klasse, keine CSS-/A11y-Implementierung, kein Pseudocode; `Theme/assets/js/fw-chart-engine/**` nicht im Diff (bestätigt durch Scope-Diff oben).

## Nicht Teil dieses APs

Jegliche Tailwind-Klasse, CSS-/A11y-Implementierung oder Pseudocode für die Segment-Dämpfung (das ist CE-5-Scope); jede Änderung an `PieChartStrategy.js`, `CenterTextPlugin.js`, `FwRenderer.js`, `ChartEngine.js`; jede Änderung an `ARCHITECTURE STRATEGY PAPER VX.md` oder „Der Rucksack“; jede Bewertung oder Veränderung von F-06 (Pie-Drill-down-Popover an `document.body`); Tests, Tools, Backlog, Navigation, Session-Logs, Commit.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme: CE-5-Umsetzungsauftrag für Donut/Pie, der die jetzt vollständige Bedarfsmatrix (Titel/Wrapper/A11y/Status = vorhandener Bedarf; Range-Control/View-Control/BAN/Caption = kein Bedarf; Legende = Segment-Dämpfung umschalten) 1:1 in DOM-/Tailwind-/A11y-Rezepte überführt — ohne stille Funktions- oder Optikänderung. Kein Code und kein Commit durch DOC-03.
