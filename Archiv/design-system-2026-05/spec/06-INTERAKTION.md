# 06 Interaktion

> **Status:** Final
> **Quelle:** Design-Matrix v7, master-template-v5, ui-kit-referenz.html

---

## 1. Buttons

### 1.1 Primary Button (CTA)

**Einsatz:** "Jetzt starten", "Kaufen", Haupt-Aktion.

| Zustand | CSS | Visuell |
|:--------|:----|:--------|
| Default | `bg-petrol text-white px-6 py-4 rounded-lg font-semibold shadow-soft` | Petrol-Flaeche, weisser Text |
| Hover | `hover:bg-petrol/90 hover:scale-105` | Leicht heller, 5% groesser |
| Active | `active:scale-95` | Eingedrueckt (5% kleiner) |

```html
<button class="bg-petrol text-white px-6 py-4 rounded-lg font-semibold shadow-soft transition-all hover:bg-petrol/90 hover:scale-105 active:scale-95">
    [Label]
</button>
```

### 1.2 Secondary Button (Selection)

**Einsatz:** "Ich habe Ahnung", "Neu hier", Neben-Aktion.

| Zustand | CSS | Visuell |
|:--------|:----|:--------|
| Default | `bg-white/90 text-petrol px-6 py-4 rounded-lg font-semibold shadow-sm` | Weisse Flaeche, Petrol-Text |
| Hover | `hover:bg-white hover:text-petrol hover:scale-105` | 100% Weiss, Text bleibt Petrol |
| Active | `active:scale-95` | Eingedrueckt |

```html
<button class="bg-white/90 text-petrol px-6 py-4 rounded-lg font-semibold shadow-sm transition-all hover:bg-white hover:text-petrol hover:scale-105 active:scale-95">
    [Label]
</button>
```

**Entscheidung (DS-002):** Kein `text-blau` bei Hover! Text bleibt `text-petrol`. Grund: Blau = Links, Petrol = Buttons. Semantische Trennung.

### 1.3 Touch-Target (DS-001) — GEFIXT

`py-3` → `py-4` (16px vertikal = ca. 48px Gesamthoehe). Erfuellt WCAG 2.1 AAA min. 44x44px.

---

## 2. Text-Links

### 2.1 Standard-Links (Fliesstext)

Werden via `.ci-link` Klasse gestylt. **Nicht** via Tailwind-Klassen!

| Zustand | CSS | Visuell |
|:--------|:----|:--------|
| Default | `text-blau underline decoration-1 underline-offset-4 font-semibold` | Blau, duenne Unterstreichung |
| Hover | `text-petrol decoration-3 decoration-petrol` | Petrol, dicke Unterstreichung |
| Visited | `text-purpur` | Purpur (signalisiert "gelesen") |

```css
.ci-link {
    color: var(--color-blau);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
}
.ci-link:hover {
    color: var(--color-petrol);
    text-decoration-color: var(--color-petrol);
    text-decoration-thickness: 3px;
}
```

### 2.2 Inline-Link (im Tailwind-Kontext)

Fuer Links ausserhalb von `.gh-content` (z.B. in Cards):

```html
<a href="[URL]" class="ci-link">[Link Text]</a>
```

### 2.3 Card-Link ("Mehr erfahren")

Auf der Homepage in Timeline-Cards:

```html
<a href="[URL]" class="font-semibold text-blau hover:text-petrol underline decoration-1 underline-offset-4">
    Mehr erfahren &rarr;
</a>
```

---

## 3. Navigation

### 3.1 Header-Navigation

| Zustand | CSS | Visuell |
|:--------|:----|:--------|
| Default | `font-semibold text-text` | Dunkler Text, neutral |
| Hover | `hover:text-petrol` + `xl:border-b-2 xl:border-transparent xl:hover:border-petrol` | Petrol + Unterstrich (nur Desktop) |
| Active Page | `text-petrol` | Petrol (Standort-Anzeige) |

### 3.2 Hamburger-Menu (< 1280px)

- Button: `text-3xl text-petrol`, Zeichen: `&#9776;` (Hamburger)
- Overlay: `bg-black/20 backdrop-blur-[2px]`
- Menu: Vertikal, volle Breite, `shadow-soft`
- Toggle via JavaScript (classList toggle `hidden`)

### 3.3 Footer-Links

Nutzen `.ci-link` mit `visited:text-purpur`. Zwei Gruppen:
1. Hauptlinks (normal gross)
2. Rechtslinks (text-sm)

---

## 4. Focus-Visible (Tastatur-Navigation)

Globaler Stil fuer alle fokussierbaren Elemente:

```css
*:focus-visible {
    outline: 2px solid var(--color-petrol);
    outline-offset: 2px;
}
```

**Hinweis:** Nur bei Tastatur-Navigation sichtbar (nicht bei Mausklick). Browser-nativ via `:focus-visible` Pseudo-Klasse.

**Status (DS-003):** Implementiert, aber noch nicht auf Safari/Firefox/Chrome getestet.

---

## 5. Hover-Effekte auf Cards

Homepage-Cards haben sanfte Schatten-Transition:

```html
<article class="... shadow-soft transition-all duration-300 hover:shadow-hover ...">
```

| Zustand | Schatten |
|:--------|:--------|
| Default | `shadow-soft` (0 4px 20px -2px rgba(39,39,39,0.05)) |
| Hover | `shadow-hover` (0 10px 25px -5px rgba(39,39,39,0.1)) |

---

## 6. Accordion-Interaktion

Natives `<details>`/`<summary>` mit CSS-Animationen:

| Zustand | Visuell |
|:--------|:--------|
| Geschlossen | Weisser Hintergrund, Border, Pfeil nach unten |
| Hover | Text wird Petrol (`group-hover:text-petrol`) |
| Offen | Leichter Schatten (`open:shadow-sm`), Pfeil rotiert 180 Grad |

Kein JavaScript noetig. Die Pfeil-Rotation nutzt `group-open:rotate-180` mit `transition-transform`.

---

## 7. Transitions

| Element | Dauer | Typ |
|:--------|:------|:----|
| Links | `0.2s` | `ease-in-out` (auf `all`) |
| Buttons | `all` | Tailwind `transition-all` |
| Cards | `0.3s` | `duration-300` (auf `all`) |
| Accordion-Pfeil | `0.3s` | `duration-300` (auf `transform`) |
| Nav-Toggle | Sofort + 300ms Fade | Manuell via JS setTimeout |
