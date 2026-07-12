# 05 Icons & Grafiken

Stand: 2026-07-12 | Session: design-ablage-konsolidierung | Geändert von: Claude

> **Status:** GÜLTIG — einzige überlebende Spec des Jahrgangs 2026-05 (Konsolidierung 2026-07-12).
> **Geltung:** Icon-System (Variante F), Größen, Hard-Rim-Regeln, SVG-Inventar.
> **Bei Widerspruch gilt:** Farb-/Fontwerte immer aus `Theme/assets/css/tokens.css` (SSoT) —
> falls dieses Dokument Farbnamen wie `-tint`/`-20`/`-80` erwähnt, sind das Alt-Namen und zu ignorieren
> (verbotener Namensraum, CI-POOL-ROLLENKONTRAKT §3).
> **Kanonische Icon-Dateien:** `Theme/assets/images/` (die früheren Kopien unter `templates/assets/`
> liegen im `Archiv/design-system-2026-05/`).
> **Alt-Quellen** (Design-Matrix v7, boxen-stress-test, ui-kit-referenz): archiviert, nur Historie.

---

## 1. Icon-System (Variante F)

### 1.1 Konzept

Grosse, quadratische Icons als "Kapitel-Initialen". Einheitliches System fuer Homepage-Cards UND Artikel-Boxen -- der Nutzer lernt: "Quadratisch + Icon = wichtiges Konzept".

### 1.2 Groessen

| Viewport | Groesse | Tailwind |
|:---------|:--------|:---------|
| Mobile (< 768px) | 64x64px | `w-16 h-16` |
| Desktop (>= 768px) | 72x72px | `md:w-[72px] md:h-[72px]` |

### 1.3 Container-Aufbau

```html
<div class="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl bg-[FARBE]-30 p-1">
    <img src="[ICON].svg" alt="[ALT]" class="w-full h-full object-contain hard-rim">
</div>
```

| Eigenschaft | Wert | Grund |
|:------------|:-----|:------|
| Eckenradius | `rounded-2xl` | Quadratisch-modern, nicht kreisfoermig |
| Hintergrund | `bg-[farbe]-30` (30% Opacity) | Dezent genug fuer Kontrast, stark genug als Flaeche |
| Padding | `p-1` (4px) | Minimaler Rand, SVG maximal gross |
| Schatten | `.hard-rim` | Harter 1px Schlagschatten (siehe 1.4) |
| Shrink | `shrink-0` | Verhindert Stauchung in Flex-Containern |

### 1.4 Hard-Rim Schatten

```css
.hard-rim {
    filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.25));
}
```

**Warum:** Gelbe Icons auf 30%-Gelb-Hintergrund waeren ohne Schatten unsichtbar. Der harte 1px-Schatten loest die Kontur, ohne weich oder kitschig zu wirken.

### 1.5 Icon-Reset (im gh-content Kontext)

Artikel-Bilder bekommen automatisch Schatten, Margins und Radius. Icons innerhalb von Boxen muessen davon AUSGENOMMEN werden:

```css
.gh-content img.hard-rim {
    box-shadow: none !important;
    margin: 0 !important;
    border-radius: 0 !important;
    width: 100% !important;
    height: 100% !important;
}
```

Der Selektor nutzt die `.hard-rim`-Klasse als Unterscheidungsmerkmal: Artikel-Bilder haben sie nicht, Icons schon.

---

## 2. Verfuegbare SVG-Icons

Alle Icons liegen kanonisch in `Theme/assets/images/` (der Janitor lädt von dort via `data-icon-base`).
<!-- CHANGED 2026-07-12 Konsolidierung: vorher docs/design-system/templates/assets/ — das waren Duplikate, jetzt in Archiv/design-system-2026-05/ -->
Hinweis: Im Theme heißen die Kopf-Dateien korrekt `Kopf_Finanzwesir_BigCircle.svg`/`_SmallCircle.svg`
(die archivierten Duplikate trugen den Tippfehler „Finazwesir").

| Datei | Beschreibung | Typischer Einsatz |
|:------|:-------------|:------------------|
| `Feder.svg` | Schreibfeder | Info-Box (Wissenswert) |
| `Schwert.svg` | Schwert | Warn-Box (Achtung, Risiko) |
| `Blume.svg` | Blume | Dekorativ |
| `Fahnelang.svg` | Lange Fahne | Meilenstein |
| `Flaggekurz.svg` | Kurze Flagge | Zwischenziel |
| `Gitarre.svg` | Gitarre | Kultur/Lifestyle |
| `Kaffee.svg` | Kaffeetasse | Pause, Gemuetlichkeit |
| `Kopf_Finazwesir.svg` | Logo (ohne Kreis) | Variante |
| `Kopf_Finazwesir_BigCircle.svg` | Logo (grosser Kreis) | Header |
| `Kopf_Finazwesir_SmallCircle.svg` | Logo (kleiner Kreis) | Favicon/Kompakt |
| `Mond.svg` | Mond | Nacht, Ruhe |
| `Mond_Paulina_Alex.svg` | Mond (Variante) | Dekorativ |
| `Pferd.svg` | Pferd | Staerke, Dynamik |
| `Schuh.svg` | Schuh | Weg, Reise |
| `tuer.svg` | Tuer | Einstieg, Zugang |
| `Turban.svg` | Turban | Finanzwesir-Identitaet |
| `Wasserpfeife.svg` | Wasserpfeife | Finanzwesir-Identitaet |

---

## 3. Hintergrundfarben fuer Icon-Container

| Kontext | Farbe | CSS |
|:--------|:------|:----|
| Info / Wissenswert | Petrol 30% | `bg-petrol-30` |
| Warnung / Risiko | Purpur 30% | `bg-purpur-30` |
| Neutral / Highlight | Gelb 30% | `bg-gelb-30` |
| Standard (Homepage) | Petrol 30% | `bg-petrol-30` |

---

## 4. Artikel-Bilder (nicht Icons)

Fuer Fotos und Screenshots gelten andere Regeln (via `.gh-content img`):

| Eigenschaft | Wert |
|:------------|:-----|
| Anzeige | `display: block`, zentriert |
| Breite | `max-width: 100%` |
| Radius | `0.75rem` (12px) |
| Schatten | `0 4px 20px -2px rgba(39,39,39,0.1)` |
| Abstand oben | `2.5rem` |
| Abstand unten | `1rem` (vor Caption) |

### Bildunterschrift

```html
<img src="chart.jpg" alt="Rendite-Vergleich">
<em>Rendite MSCI World vs. Tagesgeld 2000-2025</em>
```

Erzeugt automatisch: **Abb.:** Rendite MSCI World vs. Tagesgeld 2000-2025 (Petrol-Praefix via CSS `::before`).

---

## 5. Offene Punkte

- **DS-011:** Icon-Grafiken (SVGs) sind funktional korrekt, aber noch nicht final poliert. Stress-Test-Referenz im Archiv vorhanden.
- Icon-Zuordnung zu Inhalten ist noch nicht systematisiert (welches Icon fuer welches Thema).
