# 02 Komponenten

> **Status:** Final
> **Quelle:** Design-Matrix v7, LLM-Instructions v5, ui-kit-referenz.html, content-page-demo.html

---

## 1. Highlight-Boxen (Variante F)

Drei Box-Typen. Alle nutzen dasselbe Layout-Pattern: Flex-Container mit Icon links (Desktop) bzw. oben (Mobile).

### 1.1 Info-Box (Feder)

**Semantik:** Wissenswert, Hintergrund-Info, Lernpunkt.

| Eigenschaft | Wert |
|:------------|:-----|
| Hintergrund | `bg-petrol-tint` (8% Opacity) |
| Border | `border border-petrol-20` |
| Radius | `rounded-xl` |
| Padding | `p-6 md:p-8` |
| Icon | Feder.svg in Petrol-30% Container |
| Titel-Farbe | `text-petrol` |

```html
<div class="bg-petrol-tint border border-petrol-20 rounded-xl p-6 md:p-8 my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
    <div class="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl bg-petrol-30 p-1">
        <img src="Feder.svg" alt="Info" class="w-full h-full object-contain hard-rim">
    </div>
    <div class="flex-1 min-w-0">
        <h4 class="font-display text-lg md:text-xl text-petrol mb-2 mt-1">[TITEL]</h4>
        <div class="text-text-secondary m-0 text-lg leading-relaxed">
            [INHALT]
        </div>
    </div>
</div>
```

### 1.2 Warn-Box (Schwert)

**Semantik:** Achtung, Risiko, Fehler vermeiden.

| Eigenschaft | Wert |
|:------------|:-----|
| Hintergrund | `bg-white` |
| Border | `border-l-4 border-purpur` |
| Schatten | `shadow-soft` |
| Padding | `p-6 md:p-8` |
| Icon | Schwert.svg in Purpur-30% Container |
| Titel-Farbe | `text-purpur` |

```html
<div class="bg-white border-l-4 border-purpur shadow-soft p-6 md:p-8 my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
    <div class="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl bg-purpur-30 p-1">
        <img src="Schwert.svg" alt="Achtung" class="w-full h-full object-contain hard-rim">
    </div>
    <div class="flex-1 min-w-0">
        <h4 class="font-display text-lg md:text-xl text-purpur mb-2 mt-1">[TITEL]</h4>
        <div class="text-text-secondary m-0 text-lg leading-relaxed">
            [INHALT]
        </div>
    </div>
</div>
```

### 1.3 Fazit-Box (ohne Icon)

**Semantik:** Zusammenfassung, Kernaussage, Take-Away.

| Eigenschaft | Wert |
|:------------|:-----|
| Hintergrund | `bg-gray-50` |
| Border | `border border-gray-200` |
| Radius | `rounded-xl` |
| Schatten | `shadow-sm` |
| Padding | `p-6 md:p-8` |
| Titel-Farbe | `text-petrol` |

```html
<div class="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm my-8">
    <h4 class="font-display text-xl text-petrol mb-4">[FAZIT TITEL]</h4>
    <div class="text-text-secondary m-0 text-lg">
        [INHALT]
    </div>
</div>
```

---

## 2. Listen

### 2.1 Standard-Liste (Neutral)

```html
<ul class="list-disc pl-6 mb-8 space-y-2 text-lg text-text-secondary marker:text-petrol">
    <li>[Punkt 1]</li>
    <li>[Punkt 2]</li>
</ul>
```

### 2.2 Nummerierte Liste (Prozess/Schritte)

Zahlen sind fett, Text ist normal (via `<span>`).

```html
<ol class="list-decimal pl-6 mb-8 space-y-2 text-lg text-text-secondary font-bold marker:text-text">
    <li><span>[Schritt 1]</span></li>
    <li><span>[Schritt 2]</span></li>
</ol>
```

### 2.3 Checkliste (Pro/Vorteile)

Petrol-Haken statt Bullet Points.

```html
<ul class="fw-checklist space-y-3 text-lg mb-8">
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-petrol shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>[Vorteil]</span>
    </li>
</ul>
```

### 2.4 Warnliste (Contra/Risiken)

Purpur-Kreuz statt Bullet Points.

```html
<ul class="fw-warnlist space-y-3 text-lg mb-8">
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-purpur shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span>[Nachteil]</span>
    </li>
</ul>
```

**Hinweis:** Die Klassen `fw-checklist` und `fw-warnlist` schuetzen diese Listen vor den globalen `gh-content ul`-Styles (via `:not()` Selektor im Template).

---

## 3. Zitate (Blockquote)

Automatisch gestylt via `.gh-content blockquote` im Template. Kein manuelles Styling noetig.

| Eigenschaft | Desktop | Mobile |
|:------------|:--------|:-------|
| Schriftgroesse | 20px (`text-xl`) | 18px (`text-lg`) |
| Padding links | 24px (`pl-6`) | 24px (`pl-6`) |
| Balken | 4px solid Gelb | 4px solid Gelb |
| Stil | Kursiv | Kursiv |
| Textfarbe | `--color-text` (#272727) | `--color-text` (#272727) |

```html
<blockquote>
    <p>"Hin und her macht Taschen leer."</p>
    <p class="text-base mt-2 font-bold not-italic">-- Boersenweisheit</p>
</blockquote>
```

---

## 4. Tabellen

Automatisch gestylt via `.gh-content table` im Template.

| Eigenschaft | Desktop | Mobile |
|:------------|:--------|:-------|
| Schrift | 16px (`text-base`) | 14px (`text-sm`) |
| Header-Font | Source Sans Pro Bold | Source Sans Pro Bold |
| Header-Hintergrund | Petrol (#218380) | Petrol (#218380) |
| Header-Textfarbe | Weiss | Weiss |
| Zellen-Padding | 16px (`1rem`) | 12px (`0.75rem`) |
| Zebra-Streifen | `tr:nth-child(even)` → `#f9fafb` | Identisch |
| Min-Width | `600px` | `600px` (erzwingt horizontales Scrollen) |
| Border | `1px solid --color-border`, `rounded-0.5rem` | Identisch |

**Wichtig:** `min-width: 600px` verhindert, dass Tabellen auf Mobile gequetscht werden. Stattdessen: horizontales Scrollen via `overflow-x-auto` Wrapper.

```html
<div class="overflow-x-auto my-8">
    <table>
        <thead>
            <tr><th>[HEADER 1]</th><th>[HEADER 2]</th></tr>
        </thead>
        <tbody>
            <tr><td>[Daten]</td><td>[Daten]</td></tr>
        </tbody>
    </table>
</div>
```

---

## 5. Accordion (FAQ)

Fuer Frage-Antwort-Bloecke. Nutzt natives `<details>`/`<summary>`.

```html
<details class="group bg-white border border-border rounded-lg open:shadow-sm transition-all duration-200 cursor-pointer mb-4">
    <summary class="list-none flex justify-between items-center p-5 font-bold text-lg text-text group-hover:text-petrol select-none">
        [FRAGE?]
        <span class="text-petrol transition-transform duration-300 group-open:rotate-180">&#9660;</span>
    </summary>
    <div class="px-5 pb-5 text-text-secondary leading-relaxed border-t border-gray-100 pt-4">
        [ANTWORT...]
    </div>
</details>
```

---

## 6. Bilder

### 6.1 Artikel-Bilder (Standard)

Automatisch gestylt via `.gh-content img`:
- Zentriert (`margin: auto`)
- `border-radius: 0.75rem`
- Weicher Schatten
- `max-width: 100%`

### 6.2 Bild mit Bildunterschrift

```html
<img src="[DATEI]" alt="[ALT TEXT]">
<em>[Bildunterschrift]</em>
```

Das Template fuegt automatisch "Abb.: " als Praefix in Petrol hinzu (via `img + em::before`).

### 6.3 Icon-Reset

Icons innerhalb von Boxen erben die Artikel-Bild-Styles NICHT. Der Reset in `.gh-content img.hard-rim` entfernt Schatten, Margins und Radius:

```css
.gh-content img.hard-rim {
    box-shadow: none !important;
    margin: 0 !important;
    border-radius: 0 !important;
    width: 100% !important;
    height: 100% !important;
}
```

---

## 7. Video

YouTube/Vimeo-Einbettung mit 16:9-Ratio.

```html
<div class="video-wrapper mb-8">
    <iframe src="[EMBED_URL]" frameborder="0" allowfullscreen></iframe>
</div>
```

CSS im Template:
```css
.video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
    border-radius: 0.75rem;
    background-color: #f3f4f6;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px -2px rgba(39, 39, 39, 0.05);
}
```

---

## 8. Schatten-System

| Name | Wert | Verwendung |
|:-----|:-----|:-----------|
| `shadow-soft` | `0 4px 20px -2px rgba(39,39,39,0.05)` | Karten, Boxen (Default) |
| `shadow-hover` | `0 10px 25px -5px rgba(39,39,39,0.1)` | Karten bei Hover |
| `shadow-sm` | Tailwind Default | Secondary Button, Fazit-Box |
| `.hard-rim` | `drop-shadow(1px 1px 0px rgba(0,0,0,0.25))` | Icon-Schatten (separates System) |
