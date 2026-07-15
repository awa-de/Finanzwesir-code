Stand: 2026-07-15 | Session: AP-chart-engine-01 / DOC-04 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, DOC-04: Legend-Pill-Basisoptik-Vertrag — Ergebnisprotokoll

Status: GRÜN — reiner Dokumentations-AP, statische QA vollständig bestanden. Kein Code, kein Test, kein Tool, keine App, kein Commit.

## Vorfundene Fremdstände und DOC-04-eigener Diff

`git status --short` vor dem ersten Write:

```text
 M Theme/assets/js/fw-chart-engine/core/ChartEngine.js
 M Theme/assets/js/fw-chart-engine/core/FwRenderer.js
 M docs/steering/patches/AP-chart-engine-01_CE-5_donut-pie-chrome_segment-daempfung_Ergebnis.md
 M tools/engine-dom-check.js
?? docs/steering/patches/AP-chart-engine-01_CE-5a_pie-segment-daempfung_focus-visible-korrektur_Ergebnis.md
?? docs/steering/patches/AP-chart-engine-01_CE-5b_pie-focus-petrol500-fallback-korrektur_Ergebnis.md
?? docs/steering/patches/AP-chart-engine-01_CE-5c_gemeinsamer-chart-fokus-fallback_Ergebnis.md
?? tools/pie-segment-damping-interaction-check.js
```

- **Vorbestehender, uncommitteter CE-5/CE-5a/CE-5b/CE-5c-Arbeitsstand (abgenommen bzw. real geprüft, nicht angefasst):** `ChartEngine.js`, `FwRenderer.js`, beide Tools, alle vier CE-5x-Ergebnisdateien. Vollständig unverändert von DOC-04.
- **DOC-04-eigener Diff:** ausschließlich `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (+11/−2 Zeilen) und `docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html` (+8/−3 Zeilen), plus diese neue Ergebnisdatei.

## Explizite Produktentscheidung

Alberts Entscheidung wörtlich dokumentiert: Alle interaktiven Chart-Legend-Pills teilen künftig dieselbe Basisoptik (Ruhe, Hover, Tastaturfokus); nur ihre fachliche Bedeutung und der zugehörige Toggle-/Ghost-Zustand dürfen charttypspezifisch abweichen. Betrifft Line/regulären Bar („Sichtbarkeit von Datenreihen umschalten“) und Donut/Pie („Segment-Dämpfung umschalten“). Der bisherige Pie-Hover (petrol-getönte Innenfläche, `translateY(-1px)`) ist damit **nicht mehr als erhaltenswerte Altoptik geschützt** — er wird erst in einem separaten, künftigen CE-5d tatsächlich entfernt/überführt. DOC-04 ändert selbst keinen Code und keine aktuelle Darstellung; die bestehende Pie-Segment-Dämpfung (Klick → aktiv ↔ ghost, Segment bleibt sichtbar, Daten unverändert, Canvas-Farbdämpfung/Center-Text/Hover/Drill-down bleiben Pie-/Canvas-Besitz) ist fachlich vollständig unverändert.

## Geänderte Dateien

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (§6.11 Legend-Pill-Basis/Bedeutung-Trennung, DOC-03-Migrationsinvariante präzisiert, §10-Zelle präzisiert, Stand-Zeile)
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html` (Legend-Pill-Referenzdarstellung um Ruhe/Hover/Fokus/Datenreihe-aus erweitert)
- Diese Ergebnisdatei (neu)

Kein Code unter `Theme/`, keine Strategie, keine Tests, kein Tool, kein `tokens.css`, kein Backlog, keine App, kein Commit.

## Gemeinsame Basisoptik und fachliche Zustände

**§6.11, direkt bei der Legend-Pill-Regel ergänzt** (neuer Unterabschnitt „Basis/Bedeutung-Trennung (DOC-04, Alberts Produktentscheidung, 2026-07-15)“):

1. Ein gemeinsames visuelles Basis-Primitive — Ruhe: `bg-bg`, `border-border`, `text-text`, `shadow-soft`; Hover: `border-primary`, `bg-bg-faint`, `text-primary`, `shadow-hover`, kein Lift; Fokus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500`. Keine neuen Farb-/Schatten-/Spacing-/Radiuswerte, keine abweichende lokale Hover-Farbfläche.
2. Fachliche Bedeutung getrennt von der Basisoptik: Datenreihen-Sichtbarkeit = `opacity-40 grayscale`; Segment-Dämpfung = nur der bestätigte Pie-aktive/ghost-Zustand bleibt eigenständig, Segment bleibt sichtbar, Canvas-Dämpfung bleibt fachlich unverändert.
3. Strategy benennt nur die Legendenbedeutung, besitzt keine Klassen/CSS-Werte/Hover-Entscheidungen; Renderer liefert die gemeinsame Basisoptik und spiegelt nur den fachlichen Zustand.
4. Eine abweichende Fachbedeutung rechtfertigt keine abweichende Ruhe-/Hover-/Fokusoptik — ausschließlich den belegten Zustandsunterschied.

**DOC-03-Migrationsinvariante präzisiert, nicht zurückgenommen:** Die ursprüngliche CE-5-Migrationsinvariante (Segment-Dämpfung/Canvas-Wirkung/Ghost-Zustand bindend, jede Verhaltens-/Optikänderung braucht Alberts Freigabe) bleibt wörtlich stehen. Direkt danach neu ergänzt, wörtlich aus dem Auftrag übernommen: „Die bisherige geschützte Pie-Altoptik bleibt für die fachliche Segment-Dämpfung, Canvas-Wirkung und den Ghost-Zustand bindend. Nicht mehr geschützt ist allein die allgemeine DOM-Basisinteraktion der Pill (Ruhe/Hover/Fokus); sie folgt ab DOC-04 verbindlich dem gemeinsamen Legend-Pill-Rezept. Diese explizite Entscheidung autorisiert erst CE-5d, den alten petrol-getönten Hover und den Hover-Lift zu entfernen.“

**§10-Tabelle, Donut-Zelle „Legende“ präzisiert:** „Gemeinsame Legend-Pill-Basisoptik wie Line/Bar (DOC-04); Bedeutung = Segment-Dämpfung umschalten (entschieden, DOC-03). Nur der aktiv/ghost-Zustand und die Canvas-Wirkung bleiben Pie-spezifisch — Kategorienliste als abweichende Bedeutung und Drill-down-Popover bleiben offen.“ Titel-/BAN-/Toolbar-/Canvas-/Caption-/Zustände-Zeilen sowie die Line-/Bar-Spalten unverändert.

## Visual-Board-Nachzug

Im bestehenden Block „Segmented-Option … Legend-Pill …“ (Abschnitt „4 · Zustände“) die Legend-Pill-Darstellung von zwei Beispielen („Serie an“/„Serie aus“) auf vier verbindliche Referenzzustände erweitert:

- **Ruhe:** `inline-flex items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft border border-border text-text`
- **Hover:** `inline-flex items-center gap-2 rounded-full bg-bg-faint px-3 py-1 text-sm shadow-hover border border-primary text-primary` — **kein** petrol-getönter Hintergrund, **kein** Lift/`translateY`
- **Fokus:** zusätzlich `ring-2 ring-petrol-500 outline-none` auf der Ruhe-Basis — **ohne** `ring-offset`
- **Datenreihe aus:** zusätzlich `opacity-40 grayscale` auf der Ruhe-Basis (bestehend, unverändert)

Alle verwendeten Klassen sind bereits im Baukasten dokumentierte Tailwind-Utilities (identisch zum §6.11-Legend-Pill-Rezept bzw. bereits im selben Visual-Board-Block für Button/Segmented-Option verwendet, z. B. `ring-2 ring-petrol-500` in der bestehenden Segmented-Option-Fokus-Referenz). Der Dot nutzt weiterhin die bereits im Dokument vorhandene Inline-Style-Farbe `var(--color-petrol-600)` — keine neue Farbdefinition, kein Hexwert. Keine neue Oberfläche, kein neues Layout.

## Strategy-/Renderer-Besitzgrenze

Unverändert und durch DOC-04 bestätigt: Die Strategy (Layer 3) benennt ausschließlich die fachlich benötigte Legendenbedeutung (KDR 15, Abschnitt 2.6 „Der Rucksack“) — sie besitzt keine Klassen, CSS-Werte oder Hover-Entscheidungen. Der Renderer (Layer 5) liefert die gemeinsame Basisoptik und spiegelt ausschließlich den jeweiligen fachlichen Zustand (aktiv/ausgeblendet bzw. aktiv/ghost). DOC-04 fügt dieser bereits in DOC-02/DOC-03 dokumentierten Grenze keine neue Ausnahme hinzu — es präzisiert nur, dass die Basisoptik selbst charttyp-agnostisch ist und nicht Teil der fachlichen Bedeutung.

## Dokumentations-QA

1. **Scope-QA:** `git status --short`/`git diff --stat` zeigen ausschließlich die zwei erlaubten Dateien (+11/−2 bzw. +8/−3 Zeilen) als DOC-04-eigenen Diff. Vorbestehender CE-5/CE-5a/CE-5b/CE-5c-Stand vollständig getrennt ausgewiesen und unverändert.
2. **Widerspruchsfreiheit:** §6.11-Basis/Bedeutung-Trennung, die präzisierte Segment-Dämpfungs-Migrationsinvariante und die §10-Zelle sagen durchgehend dieselbe Trennung „gemeinsame Basis / fachlicher Zustand“ — identische Formulierungen für Ruhe/Hover/Fokus in allen drei Stellen. Das Visual Board zeigt exakt dieselben Hover-Werte (`border-primary bg-bg-faint text-primary shadow-hover`, kein Lift) und denselben Fokus-Ring (`ring-2 ring-petrol-500`, kein Offset) wie im §6.11-Text benannt. Die DOC-02-Rucksack-Grenze (Strategy = Bedarf, Renderer = Optik) bleibt gewahrt (siehe „Strategy-/Renderer-Besitzgrenze“ oben) und wird nicht neu verhandelt.
3. **Token-QA:** Alle neuen Visual-Board-Klassen (`border-border`, `border-primary`, `bg-bg-faint`, `shadow-hover`, `text-primary`, `ring-2`, `ring-petrol-500`, `outline-none`, `opacity-40`, `grayscale`, `bg-bg`, `shadow-soft`, `text-text`) stammen aus bereits im Baukasten dokumentierten Tailwind-Utilities (identisch zum §6.11-Legend-Pill-Rezept bzw. bereits an anderer Stelle im selben Board verwendet) — keine neue CI-Farbe, kein Hexwert eingeführt.
4. **Negativnachweis:** `git status --short` bestätigt — keine Code-, Test-, Tool- oder App-Datei geändert; keine Fachfunktion geändert (Pie-Segment-Dämpfung, Canvas, Center-Text, Drill-down unangetastet, da überhaupt keine Code-Datei im Diff).
5. **`git diff --check`:** exit 0, keine Whitespace-Fehler (nur harmlose LF→CRLF-Hinweise für die beiden geänderten sowie mehrere Fremdstände-Dateien).

## Nicht Teil dieses APs

Jeder Code unter `Theme/assets/js/fw-chart-engine/`, jede Testseite, jedes Tool, jede App-Datei; jede neue Legend-Bedeutung, Registry, generisches Framework oder neue API; jede Änderung an `tokens.css` oder Übernahme von Hexwerten in die Dokumentation; jede Behauptung, CE-5d sei bereits umgesetzt (CE-5d bleibt ausdrücklich zukünftig und unimplementiert); jede Änderung der separaten Canvas-Interaktion oder Legenden-Drill-down-Erfindung; Commit.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme: CE-5d als eigener, künftiger Umsetzungs-AP, der den alten petrol-getönten Pie-Hover und den Hover-Lift entfernt und die Pie-Legend-Pill vollständig auf das gemeinsame Basisrezept umstellt. Kein Code und kein Commit durch DOC-04.
