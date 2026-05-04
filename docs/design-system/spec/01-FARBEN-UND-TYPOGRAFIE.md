# 01 Farben & Typografie

> **Status:** Final
> **Quelle:** CI-Farben (amtlich), Design-Matrix v7 + v9, master-template-v5
> **Stand:** 2026-05-03

---

## 1. Farbpalette (CI)

### 1.1 Basisfarben

| Name | Hex | CSS-Variable | Verwendung |
|:-----|:----|:-------------|:-----------|
| Petrol | `#218380` | `--color-petrol` | Primary Brand, Buttons, Headings, Hover |
| Blau | `#0071BF` | `--color-blau` | Text-Links (Default) |
| Purpur | `#8D0267` | `--color-purpur` | Warnungen, Visited Links |
| Gelb | `#DFC805` | `--color-gelb` | Highlights, Zitat-Balken, H1-Unterstrich |

### 1.2 Abstufungen

| Name | Hex / Wert | CSS-Variable | Verwendung |
|:-----|:-----------|:-------------|:-----------|
| Petrol 80% | `#4D9C99` | `--color-petrol-80` | Button Hover |
| Petrol 50% | `#90C1BF` | `--color-petrol-50` | Dekorativ |
| Petrol 20% | `#D3E6E6` | `--color-petrol-20` | Info-Box Border |
| Petrol Tint | `rgba(33,131,128,0.08)` | `--color-petrol-tint` | Info-Box Hintergrund |
| Petrol 30% | `rgba(33,131,128,0.3)` | `--color-petrol-30` | Icon-Hintergrund (Info) |
| Purpur 80% | `#C57EB2` | `--color-purpur-80` | Dekorativ |
| Purpur Tint | `rgba(141,2,103,0.08)` | `--color-purpur-tint` | Warn-Box Hintergrund (Reserve) |
| Purpur 30% | `rgba(141,2,103,0.3)` | `--color-purpur-30` | Icon-Hintergrund (Warnung) |
| Gelb 80% | `#F9EF9E` | `--color-gelb-80` | Dekorativ |
| Gelb Tint | `rgba(223,200,5,0.08)` | `--color-gelb-tint` | Reserve |
| Gelb 30% | `rgba(223,200,5,0.3)` | `--color-gelb-30` | Icon-Hintergrund (Gelb) |

### 1.3 Neutrale Farben

| Name | Hex | CSS-Variable | Verwendung |
|:-----|:----|:-------------|:-----------|
| Text | `#272727` | `--color-text` | Haupttext, H2, H3 |
| Text Secondary | `#4C4C4C` | `--color-text-sec` | Fliesstext, Tabellenzellen |
| Background | `#FFFFFF` | `--color-bg` | Seitenhintergrund |
| Border | `#E7ECEF` | `--color-border` | Trennlinien, Tabellenborders |

### 1.4 WCAG-Kontrast (bekannte Werte)

| Paar | Ratio | Level |
|:-----|:------|:------|
| Blau #0071BF auf Weiss | ~7.9:1 | AAA |
| Purpur #8D0267 auf Weiss | ~8.5:1 | AAA |
| Petrol #218380 auf Weiss | ~4.8:1 | AA |
| Gelb #DFC805 auf Weiss | ~1.2:1 | **Fail** -- nur dekorativ verwenden! |
| Text #272727 auf Weiss | ~14:1 | AAA |
| Text-Sec #4C4C4C auf Weiss | ~7.7:1 | AAA |

### 1.5 Verbotene Farben

- `#4D9594` -- nicht CI-konform, von LLM erfunden
- Jede Farbe, die nicht in dieser Tabelle steht

---

## 2. CSS-Variablen (Implementation)

Alle Farben werden als CSS Custom Properties in `:root` definiert. Tailwind referenziert sie via `var()`.

```css
:root {
    --color-petrol: #218380;
    --color-petrol-80: #4D9C99;
    --color-petrol-50: #90C1BF;
    --color-petrol-20: #D3E6E6;
    --color-petrol-tint: rgba(33, 131, 128, 0.08);
    --color-petrol-30: rgba(33, 131, 128, 0.3);

    --color-blau: #0071BF;

    --color-gelb: #DFC805;
    --color-gelb-80: #F9EF9E;
    --color-gelb-tint: rgba(223, 200, 5, 0.08);
    --color-gelb-30: rgba(223, 200, 5, 0.3);

    --color-purpur: #8D0267;
    --color-purpur-80: #C57EB2;
    --color-purpur-tint: rgba(141, 2, 103, 0.08);
    --color-purpur-30: rgba(141, 2, 103, 0.3);

    --color-text: #272727;
    --color-text-sec: #4C4C4C;
    --color-bg: #FFFFFF;
    --color-border: #E7ECEF;
}
```

**Warum CSS-Variablen?** Eine Stelle aendern, ueberall wirksam. Kein Suchen-und-Ersetzen in 20 Dateien. Vorbereitung fuer Dark Mode (falls gewuenscht).

---

## 3. Schriftarten

### 3.1 Font-Stack

| Rolle | Font | Fallback | Google Fonts |
|:------|:-----|:---------|:-------------|
| Display (H1, H2) | Archivo Black | sans-serif | `family=Archivo+Black` |
| Body (alles andere) | Source Sans Pro | sans-serif | `family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400` |

**Wichtig:** Source Sans **Pro** -- nicht "Source Sans" oder "Open Sans". Sehen aehnlich aus, sind aber unterschiedliche Fonts.

### 3.2 Font Loading

Fonts werden **lokal** ausgeliefert — kein externer CDN, DSGVO-konform.
Kein `<link rel="preconnect">` zu externen Domains nötig.

Laden via `screen.css §2` (`@font-face`, WOFF2). Dateien liegen in `Theme/assets/fonts/`.

```css
/* Bereits in screen.css §2 definiert — kein <link> nötig */
@font-face {
    font-family: 'Archivo Black';
    src: url('../fonts/ArchivoBlack-Regular.woff2') format('woff2');
    font-weight: 400; font-style: normal; font-display: swap;
}
@font-face {
    font-family: 'Source Sans Pro';
    src: url('../fonts/SourceSansPro-Regular.woff2') format('woff2');
    /* Weitere Gewichte (600, 700) ebenfalls in screen.css §2 */
}
```

### 3.3 Tailwind-Mapping

```js
fontFamily: {
    display: ['"Archivo Black"', 'sans-serif'],
    body: ['"Source Sans Pro"', 'sans-serif'],
}
```

---

## 4. Typografie-Skala

### 4.1 Ueberschriften

| Element | Font | Desktop | Mobile | Tailwind | Spacing |
|:--------|:-----|:--------|:-------|:---------|:--------|
| **H1** | Archivo Black | 48px (`text-5xl`) | 36px (`text-4xl`) | `font-display tracking-tight break-words` | `mb-12 pb-6 border-b-2 border-gelb` |
| **H2** | Archivo Black | 30px (`text-3xl`) | 24px (`text-2xl`) | `font-display` | `mt-16 mb-6` (Desktop), `mt-12 mb-6` (Mobile) |
| **H3** | **Source Sans Pro Bold** | 20px (`text-xl`) | 20px (`text-xl`) | `font-body font-bold` | `mt-8 mb-4` |
| **H4-H6** | Source Sans Pro Bold | -- | -- | `font-bold` | Nach Bedarf |

**Entscheidung H3:** Source Sans Pro Bold statt Archivo Black. Archivo bei H3 stoert den Lesefluss -- zu viel visuelle Dominanz fuer eine Zwischenueberschrift.

### 4.2 Fliesstext

| Element | Font | Groesse | Tailwind |
|:--------|:-----|:--------|:---------|
| Body | Source Sans Pro 400 | 18px | `text-lg leading-relaxed` |
| Lead (Intro) | Source Sans Pro 400 | 24px Desktop / 20px Mobile | `text-xl md:text-2xl leading-normal` |
| Links im Text | Source Sans Pro 600 | 18px | `ci-link` (Klasse, nicht Tailwind) |

### 4.3 Spezial-Typografie

| Element | Desktop | Mobile | Details |
|:--------|:--------|:-------|:--------|
| Zitat (`blockquote`) | 20px, `pl-6` | 18px, `pl-6` | Gelber Balken links (4px), kursiv |
| Tabellen-Header (`th`) | 16px | 14px | Source Sans Pro Bold, weisser Text auf Petrol |
| Tabellen-Zellen (`td`) | 16px | 14px | Source Sans Pro 400, Text Secondary |

### 4.4 Durchschuss (Line-Height)

Fliesstext: `leading-relaxed` (~1.625). Kein engerer Durchschuss -- Lesbarkeit geht vor Platzersparnis. Zielgruppe ist 50+.