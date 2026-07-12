# 03 Layout & Responsive

> **Status:** Final
> **Quelle:** Design-Matrix v7 + v9, master-template-v5, homepage-v16

---

## 1. Breakpoints

Tailwind Mobile-First Ansatz. Alles ohne Praefix gilt fuer Mobile (< 768px).

| Breakpoint | Praefix | Ab Breite | Verwendung |
|:-----------|:--------|:----------|:-----------|
| Mobile | (Default) | 0px | Smartphones, schmale Fenster |
| Desktop | `md:` | 768px | Tablets (Querformat), Laptops, Monitore |
| Wide | `xl:` | 1280px | Nur fuer Navigation (Hamburger → Inline) |

**Kein** `sm:`, `lg:` oder `2xl:` im Einsatz. Bewusst simpel gehalten.

---

## 2. Container & Breiten

| Element | Max-Width | Padding | Anmerkung |
|:--------|:----------|:--------|:----------|
| **Content** (`<main>`) | `800px` | `px-4` (Mobile), `px-6` (Desktop) | Optimale Zeilenlaenge (~65-80 Zeichen) |
| **Header** | `1400px` | `px-6` (Mobile), `px-8` (Desktop) | Volle Breite fuer Navigation |
| **Footer** | `1000px` | `px-6` | Zwischen Content und Header |
| **Homepage Cards** | Kein eigenes Max-W | Von Content geerbt | Cards nutzen `ml-24 md:ml-28` fuer Timeline-Offset |

```html
<main class="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-6 py-12 md:py-20 gh-content">
```

---

## 3. Vertikaler Rhythmus

### 3.1 Seiten-Spacing

| Element | Desktop | Mobile |
|:--------|:--------|:-------|
| Main Padding oben/unten | `py-20` (80px) | `py-12` (48px) |
| H2 Abstand oben | `mt-16` (64px) | `mt-12` (48px) |
| H2 Abstand unten | `mb-6` (24px) | `mb-6` (24px) |
| H3 Abstand oben | `mt-8` (32px) | `mt-8` (32px) |
| Absatz-Abstand | `mb-6` (24px) | `mb-6` (24px) |
| Box-Abstand (Highlight) | `my-8` (32px) | `my-8` (32px) |

### 3.2 Content-Gaps

| Kontext | Desktop | Mobile |
|:--------|:--------|:-------|
| Box: Icon ↔ Text | `gap-8` (32px) | `gap-4` (16px) |
| Timeline Cards | `space-y-16` (64px) | `space-y-12` (48px) |
| Listen-Items | `space-y-2` (8px) | `space-y-2` (8px) |

---

## 4. Flex-Patterns

### 4.1 Box-Layout (Info/Warn)

```
Mobile:  flex-col  → Icon OBEN, Text UNTEN
Desktop: flex-row  → Icon LINKS, Text RECHTS
```

Grund: Bei `flex-row` auf Mobile waere die Textspalte zu schmal (320px - 64px Icon - Padding = kaum 200px fuer Text).

### 4.2 Homepage Timeline

```
Vertikale Linie: absolute, left-[32px] md:left-[36px]
  → Zentriert durch 64px (Mobile) bzw. 72px (Desktop) Icons
  → Berechnung: 64/2 = 32, 72/2 = 36

Timeline-Dot: absolute, gleiche left-Position, -translate-x-1/2
Card: ml-24 md:ml-28 (genug Platz fuer Linie + Dot + Luft)
```

---

## 5. Header

| Eigenschaft | Wert |
|:------------|:-----|
| Position | `sticky top-0` |
| Hoehe | `72px` (Mobile), `82px` (Desktop) |
| Hintergrund | `bg-white/95 backdrop-blur-sm` |
| Border | `border-b border-border` |
| Z-Index | `z-50` |
| Logo-Groesse | `40x40px` (Mobile), `50x50px` (Desktop) |

### Navigation

| Viewport | Verhalten |
|:---------|:----------|
| < 1280px (`xl:`) | Hamburger-Menu, Overlay mit Backdrop |
| >= 1280px | Inline horizontal, `gap-6` |

Nav-Links: `font-semibold text-text`, Hover: `text-petrol` + `border-b-2 border-petrol`.

---

## 6. Footer

```html
<footer class="bg-gray-100 border-t-2 border-petrol pt-16 pb-8 text-center mt-auto">
```

| Eigenschaft | Wert |
|:------------|:-----|
| Hintergrund | `bg-gray-100` |
| Obere Border | `2px solid Petrol` |
| Breite | `max-w-[1000px]` |
| Ausrichtung | Zentriert |
| Sticky Footer | `mt-auto` (Flexbox auf Body) |

Zwei Nav-Reihen:
1. Hauptlinks (Neu hier?, Manifest, Ueber mich, Ich bin bullish)
2. Rechtslinks (Impressum & Kontakt, Datenschutz) -- kleinere Schrift

---

## 7. Seiten-Skeleton

```html
<body class="font-body text-text-secondary bg-background antialiased leading-relaxed flex flex-col min-h-screen">
    <header>...</header>
    <div id="navBackdrop">...</div>
    <main class="flex-grow ... gh-content">...</main>
    <footer class="... mt-auto">...</footer>
</body>
```

Das `flex flex-col min-h-screen` auf `<body>` + `mt-auto` auf `<footer>` ergibt einen Sticky Footer: Bei wenig Content klebt der Footer trotzdem am Seitenende.

## Chart Widget (Micro-Layout, Canvas)

Diese Regeln gelten **nur** für Canvas-Charts (Chart-Widget) und sind isoliert vom restlichen Typo-System.

| Element | Zone S (< 450px) | Zone M/L (> 450px) | Beispiel/Regel |
| :-- | :-- | :-- | :-- |
| X-Achse (Datum) | 11px | 12px | S: `Jan`; M/L: `Jan '24` / `Januar 2024` |
| Y-Achse (Werte) | 11px | 12px | S: `10k`; M/L: `10.000` |
| Toolbar Buttons | 13px | 13px | S: Stacked Grid; M/L: Single Row Flex |
| Tooltips | 13px | 13px | Immer gut lesbar über dem Datenpunkt |

**Logik:**
- Pixel-fixed: Wir nutzen `px`, um Canvas-Unschärfe und Layout-Explosionen bei Browser-Zoom zu verhindern.
- Hierarchie: Chart-Text ist Caption-Level und daher kleiner als Body (18px).
