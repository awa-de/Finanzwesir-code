# docs/design-system — Statuskarte

Stand: 2026-07-12 | Session: design-ablage-konsolidierung | Geändert von: Claude

**Dieses Verzeichnis wurde am 2026-07-12 konsolidiert.** Der Jahrgang 2026-05 (Specs 01–04/06,
DESIGN-SYSTEM.md, LLM-INSTRUCTIONS.md, Referenz-HTMLs, master-template, SVG-Duplikate) liegt in
`Archiv/design-system-2026-05/` — nur für historische Betrachtung, **nie als Quelle**.

## Was hier noch lebt

| Datei | Status | Geltung |
|---|---|---|
| `spec/05-ICONS-UND-GRAFIKEN.md` | GÜLTIG (mit Statuskopf) | Icon-System Variante F, Größen, Hard-Rim, Inventar |

Kanonische Icon-Dateien: `Theme/assets/images/` (nicht hier).

## Die lebende Wahrheit für Design-Fragen

| Frage | Quelle |
|---|---|
| Farben, Fonts, Schatten | `Theme/assets/css/tokens.css` (SSoT) + `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` |
| Struktur (Spacing/Radius/Border/Shadow/Responsive) | Tailwind-Default-Skalen laut Kontrakt + `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` |
| App-Fabrik-Primitiven und -Kompositionen | `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (+ Visual Board / Mockups daneben) |
| CSS-Arbeit im Theme | `docs/steering/design/CSS-KONVENTIONEN.md` |
| Icons | `spec/05-ICONS-UND-GRAFIKEN.md` + `Theme/assets/images/` |

## Harte Regeln für operative LLMs

1. Farben/Fonts nur mit Namen aus `tokens.css`. Wer `-tint`, `-20`, `-30`, `-80` liest oder
   schreiben will: **stoppen** — das ist der verbotene Alt-Namensraum (Kontrakt §3).
2. Vor Design-Arbeit zuerst diese Statuskarte bzw. das Routing in `NAVIGATION.md` lesen.
3. Dateien ohne Statuskopf sind keine zulässige Quelle.
4. Aus `Archiv/**` wird niemals kopiert.

## Zukunft dieses Verzeichnisses

Das Content-/Website-Design-System wird nach der Janitor-Sanierung (Alt-Klassen `-tint`/`-20`,
Befund F-07/DS-012) auf Basis von tokens.css + Tailwind-Baukasten **neu aufgebaut** und dann
wieder hier abgelegt. Bis dahin bleibt dieses Verzeichnis bewusst fast leer.

Der Janitor-Ausschluss für `.fw-app`-Teilbäume ist bereits umgesetzt (CSS-Altlastenabschluss,
2026-07-23) — die inhaltliche Sanierung der Alt-Klassenrezepte selbst bleibt DS-015 vorbehalten
und ist keine Voraussetzung der App-Fabrik.
