# Finanzwesir Design-System

> **Version:** 1.1
> **Stand:** 2026-05-03
> **Plattform:** Ghost CMS 6.x + Tailwind CSS (CDN → Pre-Launch lokal)

---

## Was ist das hier?

Dieses Dokument ist der **Einstiegspunkt** in das visuelle Design-System der Finanzwesir-Website. Es beschreibt, wie die Seite aussieht und sich anfuehlt -- unabhaengig von der Chart-Engine (die hat eigene Specs in `docs/spec/`).

---

## Specs (6 Dateien)

| # | Datei | Inhalt |
|:--|:------|:-------|
| 01 | [01-FARBEN-UND-TYPOGRAFIE.md](01-FARBEN-UND-TYPOGRAFIE.md) | CI-Farben, CSS-Variablen, Schriftarten, Typografie-Skala |
| 02 | [02-KOMPONENTEN.md](02-KOMPONENTEN.md) | Boxen, Listen, Zitate, Tabellen, Accordion, Bilder, Video |
| 03 | [03-LAYOUT-UND-RESPONSIVE.md](03-LAYOUT-UND-RESPONSIVE.md) | Breakpoints, Container, Spacing, Header, Footer |
| 04 | [04-SEITENTYPEN.md](04-SEITENTYPEN.md) | Homepage, Artikel, Impressum, Datenschutz |
| 05 | [05-ICONS-UND-GRAFIKEN.md](05-ICONS-UND-GRAFIKEN.md) | Variante-F-System, Icon-Groessen, Hard-Rim, SVG-Inventar |
| 06 | [06-INTERAKTION.md](06-INTERAKTION.md) | Buttons, Links, Navigation, Focus, Hover-Effekte |

---

## Referenz-Dateien (Golden Masters)

Lebende HTML-Beispiele, die den Ist-Stand zeigen.

| Datei | Beschreibung | Ort |
|:------|:-------------|:----|
| `master-template.html` | Basis-Template mit CSS-Variablen | `templates/` |
| `content-page-demo.html` | Artikel-Seite mit allen Komponenten | `referenz/` |
| `homepage-demo.html` | Homepage mit Timeline und Variante-F-Icons | `referenz/` |
| `impressum-demo.html` | Impressum-Seite | `referenz/` |
| `datenschutz-demo.html` | Datenschutz-Seite | `referenz/` |
| `ui-kit-referenz.html` | Komponentenreferenz mit Labels | `referenz/` |

---

## Archiv

| Datei | Beschreibung |
|:------|:-------------|
| `boxen-stress-test-referenz.html` | Icon/Box-Anschauungsmaterial (Timeline + Artikel-Kontext) |

---

## Assets

18 SVG-Icons + 1 Testbild in `templates/assets/`. Vollstaendiges Inventar in Spec 05.

---

## Tech-Stack

| Was | Technologie | Anmerkung |
|:----|:------------|:----------|
| CMS | Ghost 6.x | "Dummes" CMS, keine Logik |
| CSS-Framework | Tailwind CSS via CDN | Kein Build-Prozess |
| Fonts | Lokal (Archivo Black + Source Sans Pro) | WOFF2, `@font-face` in `screen.css §2`, Dateien in `Theme/assets/fonts/` |
| Farben | CSS Custom Properties (`:root`) | Tailwind referenziert via `var()` |
| Icons | SVG-Dateien | Lokal gehostet |
| Charts | Eigene Engine (Chart.js) | Separate Specs in `docs/spec/` |

---

## Entschiedene Design-Fragen (nicht neu oeffnen)

Diese 12 Entscheidungen wurden in mehreren Evaluationsrunden (ChatGPT + Perplexity) bestaetigt und sind **final**:

1. **H3-Font:** Source Sans Pro Bold (nicht Archivo Black)
2. **Content-Breite:** max-w-800px
3. **Tabellen-Header:** Source Sans Pro Bold (nicht Archivo Black)
4. **Farbpalette:** 4 Farben (Petrol, Blau, Purpur, Gelb) + Abstufungen
5. **Tailwind-Config:** Im `<head>` (CDN-Ansatz, kein Build)
6. **Secondary Button Hover:** text-petrol (nicht text-blau)
7. **Icon-Schatten:** hard-rim (1px drop-shadow)
8. **Icon-Reset:** `!important` Override fuer `.gh-content img.hard-rim`
9. **Focus-Visible:** 2px solid Petrol, 2px Offset
10. **Blockquote Padding:** pl-6 (24px) auch auf Mobile
11. **Tabellen-Header Font:** Source Sans Pro Bold (Wiederholung wg. haeufiger Regression)
12. **Box-Layout:** Variante F (quadratisch, rounded-2xl, 64/72px)

---

## Bekannte offene Punkte

Alle offenen Issues stehen in `docs/context/DESIGN-SYSTEM-ISSUES.md`:

- **DS-001:** Button Touch-Targets (py-3 → min 44px)
- **DS-002:** Secondary Hover in Homepage noch falsch (text-blau statt text-petrol)
- **DS-003:** Focus-Visible nicht browser-getestet
- **DS-004:** WCAG-Kontrast-Tabelle unvollstaendig
- **DS-005:** CSS-Styles doppelt definiert (kein zentrales Stylesheet)
- **DS-006:** Tailwind-Config Divergenz (Homepage hardcoded, Rest CSS-Vars)
- **DS-007:** Homepage Extra-Farben (gradient-light/medium)
- **DS-008:** Janitor-Script fuer Markdown-First-Workflow
- **DS-009:** Spec-Konsolidierung (diese Datei -- erledigt)
- **DS-010:** LLM-Instructions-Konsolidierung
- **DS-011:** Icon-Grafiken nicht final

---

## Verzeichnisstruktur

```
docs/design-system/
  spec/                          ← Du bist hier
    DESIGN-SYSTEM.md             ← Dieses Dokument
    01-FARBEN-UND-TYPOGRAFIE.md
    02-KOMPONENTEN.md
    03-LAYOUT-UND-RESPONSIVE.md
    04-SEITENTYPEN.md
    05-ICONS-UND-GRAFIKEN.md
    06-INTERAKTION.md
    LLM-INSTRUCTIONS.md          ← Fuer Content-Erstellung
  templates/
    master-template.html
    assets/                      ← 18 SVGs + Testbild
  referenz/
    content-page-demo.html
    homepage-demo.html
    impressum-demo.html
    datenschutz-demo.html
    ui-kit-referenz.html
  archiv/
    boxen-stress-test-referenz.html
```
