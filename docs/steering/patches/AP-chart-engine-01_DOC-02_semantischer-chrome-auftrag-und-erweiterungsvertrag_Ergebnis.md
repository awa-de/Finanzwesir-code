Stand: 2026-07-15 | Session: AP-chart-engine-01 / DOC-02 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, DOC-02: Semantischer Chrome-Auftrag und Erweiterungsvertrag — Ergebnisprotokoll

Status: GRÜN — reiner Dokumentations-AP, statische QA vollständig bestanden. Kein Code, kein Test, kein Tool, kein Commit.

Kettenposition: CE-4c ist vollständig abgenommen (Line/Bar/Donut, statische QA + Browser-QA GRÜN). Dieser AP verankert vor CE-5 (Donut/Pie-Chart-Chrome) den dahinterliegenden semantischen Strategie-zu-Renderer-Vertrag in den maßgeblichen Architektur- und Baukastendokumenten — reine Dokumentation, kein Ist-Code.

## Vorfundene Fremdstände und DOC-02-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M .claude/.gitignore
 M .claude/learning/session-log.md
?? .claude/settings.json
```

- **Echte Fremdstände (vor dieser Session vorhanden, nicht angefasst):** `.claude/.gitignore`, `.claude/settings.json`.
- **Eigenes Artefakt aus einem vorherigen Schritt dieser Session, nicht DOC-02-Scope:** `.claude/learning/session-log.md` (regulärer `/start`-Warm-Start-Eintrag, vor DOC-02 geschrieben).
- **DOC-02-eigener Diff:** ausschließlich die drei unten genannten Dokumentationsdateien plus diese neue Ergebnisdatei.

## Geänderte Dateien

- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (+12 Zeilen: neue KDR 15)
- `docs/spec/Der Rucksack (Context Object Pattern).md` (+21 Zeilen: neuer Abschnitt 2.6)
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (+24/−1 Zeilen: §6.11-Erweiterung + Stand-Zeile)
- Diese Ergebnisdatei (neu)

Keine andere Datei geändert. Insbesondere kein JavaScript, kein Test, kein Tool, keine App, keine Strategie, kein `tokens.css`, kein Backlog, keine Navigation, kein Projektstatus, keine Session-Logs/Chroniken (außer dem bereits vor DOC-02 geschriebenen `/start`-Eintrag), kein Commit.

## Architekturvertrag: Strategie, Manager, Renderer

Neue KDR 15 in `ARCHITECTURE STRATEGY PAPER VX.md` (nach KDR 14, vor „## 5. Roadmap & Status"):

1. Strategien (Layer 3) liefern fachlich-semantische Render-Absicht; sie erzeugen keine DOM-/Tailwind-/CSS-Rezepte.
2. Der Renderer (Layer 5, `FwRenderer`) besitzt die vollständigen statischen Chrome-Rezepte, HTML-Reihenfolge, A11y-Semantik, Interaktionsoberflächen und die tokenbasierten Fallbacks für Tailwind-freie Testseiten.
3. Der Manager (Layer 2, `ChartEngine`) besitzt weiterhin den dynamischen UI-State und die Smart Updates; die Strategie besitzt nicht den gerade aktiven Buttonzustand.
4. Der semantische Chrome-Auftrag ist request-scoped und unveränderlich wie der Rucksack (KDR 9) — folgt demselben Context-Pattern, enthält aber keine CSS-/Tailwind-/DOM-Werte. Technische Durchleitung: späterer Code-AP, nicht dieser Eintrag.
5. Chart.js-Canvas, Plugins und fachliche Charttyp-Physik bleiben auf ihren bestehenden Layern unberührt.

Explizite Abgrenzung zu KDR 9 aufgenommen: KDR 9 (Rucksack) bleibt unverändert gültig für Darstellungssemantik; der Chrome-Auftrag ist ein eigenständiger, strukturell verwandter, aber inhaltlich getrennter Vertrag für DOM-Chrome-Bedarfe. Er erweitert `fwContext` nicht rückwirkend und wird nicht mit ihm vermischt. Status-Zeile markiert den Eintrag ausdrücklich als Zielvertrag: Rezeptzentralisierung (CE-4c) implementiert, semantische technische Durchleitung nicht implementiert.

## Rucksack-Erweiterung

Neuer Abschnitt 2.6 „Der Chrome-Auftrag (verwandtes Pattern, kein Rucksack-Feld) — Zielvertrag" in `Der Rucksack (Context Object Pattern).md`, vor „## 3. Warum haben wir das gemacht?":

- Anschauliche Wunschzettel-Analogie (Strategie bestellt Chrome-Bedarf, keine Pill/Farbe/Abstand).
- Ausdrücklich als eigenständiges Pattern markiert, **kein** Feld des bestehenden `fwContext`.
- Fünf technisch verbindliche Punkte für eine künftige Durchleitung: statischer/fachlicher Bedarf (kein dynamischer UI-State); Renderer liest, schreibt nicht in Domain-/Strategie-Daten zurück; kein Auftrag → kein optionales Chrome-Verhalten (kein globales Auto-Verhalten); Resize ändert nur die dynamische Schale, nicht den Auftrag; bestehende Canvas-/Tooltip-/Plugin-Verbraucher des `fwContext` bleiben unverändert gültig.

## Baukasten-Erweiterungsvertrag

Neuer Unterabschnitt „Semantischer Chrome-Auftrag und Erweiterung (DOC-02, 2026-07-15 — Zielvertrag, kein Ist-Code)" am Ende von §6.11 in `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, vor „## 7. Kompositionen":

1. `FW_CHROME_*`-Rezepte (seit CE-4c) sind Renderer-Besitz, gemeinsame Umsetzung bereits belegter Primitiven für Line/regulären Bar.
2. Minimale, geschlossene Bedarfsliste wörtlich aus dem Auftrag übernommen (Headline/Range-Control/View-Control/Legende/Caption, je „keine" oder die eine belegte Bedeutung).
3. Charttypmarker sind strukturelle/fallback-begrenzende Ausnahmeanker, keine zweite Rezeptfamilie.
4. Erweiterungsregel für Donut/Pie und künftige Typen: vorhandene Bedarfe wiederverwenden; neue fachliche Bedeutung nur über kleinen separaten Design-/Vertrags-AP + genau ein neues Renderer-Primitive.
5. Vier ausdrückliche Verbote: kein `FW_LINE_*`-/`FW_BAR_*`-Kopieren, keine App-lokale Optikvariante, kein Stylewissen in Strategien, keine globale Chrome-/Plugin-Registry.
6. Differenz `tokens.css` (CI-Quelle) vs. Tailwind-Defaults (Struktur-Skala) vs. Tailwind-freier Fallback dokumentiert — zwei Implementierungswege für einen visuellen Vertrag, keine zwei Designwahrheiten.

Stand-Zeile der Baukasten-Datei aktualisiert (2026-07-14 → 2026-07-15, Session DOC-02) gemäß CLAUDE.md-Pflicht für `docs/steering/`-Dateien.

## Ist-/Soll-Abgrenzung

Alle drei Ergänzungen sind ausdrücklich als Zielvertrag markiert:

- KDR 15 trägt „Zielvertrag, technische Durchleitung noch nicht implementiert" im Titel und eine explizite Status-Zeile.
- Abschnitt 2.6 trägt „Status: Konzeptionell verankert … Kein Ist-Code, keine neue `fwContext`-Eigenschaft."
- Der §6.11-Zusatz trägt „Zielvertrag, kein Ist-Code" im Titel und einen Abschlusssatz: „ändert aber selbst keine Datei unter `Theme/assets/js/fw-chart-engine/`."

Keiner der drei Texte behauptet, `chromeIntent` oder eine gleichnamige Runtime-API sei bereits implementiert. CE-4c hat ausschließlich gemeinsame Renderer-Rezepte (`FW_CHROME_*`) implementiert — das bleibt so benannt; der künftige semantische Durchleitungsmechanismus (Strategie → Renderer) ist an allen drei Stellen als offen gekennzeichnet.

## Dokumentations-QA

1. **`git diff --check`:** exit 0. Nur harmlose LF→CRLF-Konvertierungshinweise für zwei Fremdstände-/Session-Dateien und die beiden neu geänderten Dateien — keine Whitespace-Fehler.
2. **Diff-/Scope-Prüfung:** `git status --short` und `git diff --stat` zeigen ausschließlich die drei erlaubten Dokumente (+12/+21/+24−1 Zeilen) plus diese neue Ergebnisdatei als DOC-02-eigenen Diff. Fremdstände (`.claude/.gitignore`, `.claude/settings.json`) unverändert von diesem AP, wie oben ausgewiesen. Kein `.js`, kein Test, kein Tool, kein Backlog/Navigation/Projektstatus im Diff.
3. **Konsistenzprüfung über alle drei geänderten Quellen:** „Strategie meldet Was, Renderer baut Wie" identisch in KDR 15 Punkt 1/2 und Abschnitt 2.6 formuliert; „keine CSS-/Tailwind-Kenntnis bei Strategien" in KDR 15 Punkt 1 und §6.11 Verbot (c) deckungsgleich; „request-scoped, unveränderlich, kein globales Auto-Verhalten" in KDR 15 Punkt 4 und Abschnitt 2.6 identisch; „Manager besitzt dynamischen Zustand" in KDR 15 Punkt 3 und Abschnitt 2.6 Punkt 1 deckungsgleich; „Canvas/Plugins/Datenpfade bleiben getrennt" in KDR 15 Punkt 5 und §6.11-Präambel („Nicht verwenden für / harte Grenze") unverändert bestätigt; „Erweiterung nur bei belegter neuer Semantik" in KDR 15 (implizit über Layer-Trennung) und §6.11 Punkt 4 explizit wortgleich zum Ursprungsauftrag.
4. **Keine Umbenennung bestehender Begriffe:** `fwContext`, Strategy, Renderer, Manager, Plugin an keiner der drei Stellen umbenannt oder umgedeutet — grep-artige Durchsicht der Ergänzungen bestätigt ausschließlich Referenzen auf bestehende Begriffe.
5. **Keine nicht erlaubte Datei verändert:** bestätigt durch Punkt 2 oben.

## Nicht Teil dieses APs

Jeglicher Produktcode (`Theme/assets/js/fw-chart-engine/**`), Tests, Tools, App-Code, `tokens.css`, Backlog, Navigation, Projektstatus, Chroniken, Commit. Keine „Pill" als Strategiebegriff, keine Tailwind-Klassen/CSS-Selektoren/Farben/Abstände/Radien/Schatten/Breakpoints/Container-Query-Werte als Strategie-Vokabular, kein aktueller Auswahlzustand, keine Pie-/Donut-Segment-Toggle-, Drill-down-Popover- oder Kategorienlegenden-Spezifikation (CE-5 entscheidet das anhand seines Preflights). Keine neue produktive API, kein Pseudocode als vermeintlich umgesetzter Ist-Stand.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme dieses Protokolls: CE-5-Preflight für Donut/Pie auf Grundlage des neuen Vertrags. Kein Code und kein Commit durch DOC-02.
