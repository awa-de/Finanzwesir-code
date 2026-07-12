# ARCHIV — Design-System Jahrgang 2026-05 (v1.1)

**Status: HISTORISCH / ERSETZT — NICHT ALS QUELLE VERWENDEN**
Archiviert: 2026-07-12 | Grund: Ablösung durch tokens.css + CI-POOL-ROLLENKONTRAKT + Tailwind-App-Baukasten

## Schutzsatz für LLMs

Aus diesem Verzeichnis wird **niemals** Code, Klassennamen, Farbwerte oder Markup kopiert.
Insbesondere: Die hier definierten Farbnamen (`--color-petrol-80`, `-50`, `-20`, `-30`, `-tint` u. a.)
sind laut CI-POOL-ROLLENKONTRAKT §3 **verboten** — und `--color-petrol-50` bedeutet in der
lebenden `tokens.css` eine **andere Farbe** (hellste Leiterstufe `#F4FBFB`) als hier (50 %-Mischung
`#90C1BF`). Wer diese Dateien als Vorlage nutzt, produziert falsche Farben mit gültig aussehenden Namen.

## Was liegt hier

Das komplette Content-/Website-Design-System Stand Mai 2026 (Version 1.1):

| Ordner | Inhalt |
|---|---|
| `spec/` | Specs 01–04 + 06, `DESIGN-SYSTEM.md` (alter Einstiegspunkt), `LLM-INSTRUCTIONS.md` |
| `referenz/` | die früheren „Golden Master"-HTML-Demos (Tailwind-CDN, Alt-Klassen) |
| `templates/` | `master-template.html` + SVG-Duplikate (kanonische Icons: `Theme/assets/images/`) |
| `archiv/` | das damalige Unter-Archiv (Boxen-Stresstest) |

**Nicht mit archiviert (lebt weiter):** `docs/design-system/spec/05-ICONS-UND-GRAFIKEN.md`
(Icon-System, Variante F) und die kanonischen Icon-Dateien in `Theme/assets/images/`.

## Archivvertrag

Zweck dieses Archivs ist die historische Betrachtung („so hat sich das Design-System entwickelt").
Dateien hier werden nicht gepflegt, nicht korrigiert und nicht gelöscht. Die lebende Wahrheit:

1. Farben/Fonts/Schatten → `Theme/assets/css/tokens.css` (SSoT) + `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`
2. App-Fabrik-Gestaltung → `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
3. Content-/Website-Design → wird nach Janitor-Sanierung neu aufgebaut (siehe BACKLOG), bis dahin gilt `docs/steering/design/CSS-KONVENTIONEN.md`
