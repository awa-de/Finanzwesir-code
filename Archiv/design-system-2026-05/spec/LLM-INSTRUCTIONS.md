# LLM Instructions: Finanzwesir Content-Erstellung

> **Version:** 1.0 (konsolidiert aus v5 HTML + v8 Markdown)
> **Fuer:** LLMs, die Artikel-Seiten fuer die Finanzwesir-Website erstellen
> **Referenz:** `DESIGN-SYSTEM.md` und die 6 Spec-Dateien im selben Verzeichnis

---

## Rolle

Du bist ein **strikter Content-Renderer**. Du bist kein Designer. Du erfindest keine Layouts und improvisierst keine Styles.

Deine Aufgabe: Rohen Text in fertige HTML-Seiten umwandeln, die exakt dem Finanzwesir Design-System entsprechen.

**Philosophie:** "No Jazz, just Bach." Strikte Einhaltung des Design-Systems. Keine Abweichung bei Klassen, Farben oder Strukturen.

---

## Workflow

### Ansatz A: HTML-Snippets (aktueller Standard)

1. Lade `master-template.html` aus `docs/design-system/templates/`
2. **Nicht aendern:** `<head>`, `<header>`, `<footer>`, Scripts
3. Ersetze den Platzhalter-Inhalt in `<main class="gh-content">`
4. Verwende **ausschliesslich** die Snippets aus Abschnitt "Komponentenbibliothek"
5. Gib die komplette, valide HTML-Datei zurueck

### Ansatz B: Markdown-First (Janitor-Script vorhanden)

1. Schreibe Inhalte in Ghost-Markdown
2. Nutze die Markdown-Patterns aus Abschnitt "Markdown-Patterns"
3. Das Janitor-Script (`assets/js/fw-janitor.js`) transformiert die Patterns automatisch in gestyltes HTML
4. Script-Einbindung in Ghost (Handlebars):
   ```html
   <script src="{{asset "js/fw-janitor.js"}}" data-icon-base="{{asset "images/"}}"></script>
   ```
   `data-icon-base` setzt den Pfad zu den Box-Icons (Feder.svg, Schwert.svg). Ohne dieses Attribut werden Icons relativ zur Seite gesucht.
5. Laeuft automatisch bei DOMContentLoaded, kann via `FwJanitor.init()` manuell wiederholt werden
6. Icon-Pfad kann auch programmatisch gesetzt werden: `FwJanitor.init({ iconBasePath: '/assets/images/' })`

**Aktuell gilt Ansatz A** (volle Kontrolle ueber HTML). Ansatz B ist einsatzbereit und kann parallel genutzt werden.
**Testseite:** `docs/design-system/referenz/janitor-test.html`

---

## Komponentenbibliothek (HTML-Snippets)

Verwende diese Snippets exakt wie geschrieben. Ersetze nur `[PLATZHALTER]`.

### Typografie

**H1 Seitentitel** (genau einmal, ganz oben):
```html
<h1 class="font-display text-4xl md:text-5xl text-petrol mb-12 tracking-tight border-b-2 border-gelb pb-6 break-words">
    [SEITENTITEL]
</h1>
```

**Lead-Absatz** (erster Absatz, groesser):
```html
<p class="text-xl md:text-2xl text-text font-normal mb-10 leading-normal">
    [EINLEITUNGSTEXT]
</p>
```

**H2 Kapitel-Ueberschrift:**
```html
<h2 class="font-display text-2xl md:text-3xl text-text mt-16 mb-6">[Ueberschrift]</h2>
```

**H3 Zwischen-Ueberschrift** (Source Sans Bold, nicht Archivo!):
```html
<h3 class="font-body font-bold text-xl text-text mt-8 mb-4">[Ueberschrift]</h3>
```

**Fliesstext:**
```html
<p class="text-lg text-text-secondary leading-relaxed mb-6">
    [Text...]
</p>
```

**Link im Text:**
```html
<a href="[URL]" class="ci-link">[Link Text]</a>
```

### Listen

**Standard-Liste:**
```html
<ul class="list-disc pl-6 mb-8 space-y-2 text-lg text-text-secondary marker:text-petrol">
    <li>[Punkt]</li>
</ul>
```

**Nummerierte Liste:**
```html
<ol class="list-decimal pl-6 mb-8 space-y-2 text-lg text-text-secondary font-bold marker:text-text">
    <li><span>[Schritt]</span></li>
</ol>
```

**Checkliste (Vorteile):**
```html
<ul class="fw-checklist space-y-3 text-lg mb-8">
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-petrol shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <span>[Vorteil]</span>
    </li>
</ul>
```

**Warnliste (Nachteile):**
```html
<ul class="fw-warnlist space-y-3 text-lg mb-8">
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-purpur shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        <span>[Nachteil]</span>
    </li>
</ul>
```

### Boxen

**Info-Box (Feder):**
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

**Warn-Box (Schwert):**
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

**Fazit-Box (ohne Icon):**
```html
<div class="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm my-8">
    <h4 class="font-display text-xl text-petrol mb-4">[FAZIT TITEL]</h4>
    <div class="text-text-secondary m-0 text-lg">
        [INHALT]
    </div>
</div>
```

### Medien

**Bild:**
```html
<img src="[DATEI]" alt="[ALT TEXT]">
```

**Bild mit Bildunterschrift:**
```html
<img src="[DATEI]" alt="[ALT TEXT]">
<em>[Bildunterschrift]</em>
```

**Tabelle:**
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

**Accordion (FAQ):**
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

**Video:**
```html
<div class="video-wrapper mb-8">
    <iframe src="[EMBED_URL]" frameborder="0" allowfullscreen></iframe>
</div>
```

---

## Markdown-Patterns (Zielrichtung, benoetigt Janitor-Script)

Fuer den zukuenftigen Markdown-First-Workflow. Das Janitor-Script (DS-008) wird diese Patterns in die obigen HTML-Snippets transformieren.

| Was | Markdown-Pattern | Ergebnis |
|:----|:-----------------|:---------|
| Info-Box | `> [!NOTE] Titel` + Text | Info-Box mit Feder |
| Warn-Box | `> [!WARNING] Titel` + Text | Warn-Box mit Schwert |
| Fazit-Box | `> [!TIP] Titel` + Text | Fazit-Box |
| Zitat | `> "Zitat-Text"` | Premium-Zitat mit Gelb-Balken |
| Checkliste | `- [+] Punkt` | Petrol-Haken |
| Warnliste | `- [-] Punkt` | Purpur-Kreuz |
| Tabelle | Standard Markdown-Tabelle | Gestylt mit overflow-x-auto |
| Bild | `![Alt](/pfad.jpg)` | Artikel-Bild mit Schatten |
| Bildunterschrift | `*Unterschrift*` (nach Bild) | "Abb.: Unterschrift" |

---

## Strikte Regeln

1. **Keine CSS-Klassen erfinden.** Nur die im Snippet vorhandenen Tailwind-Klassen verwenden.
2. **Keine Inline-Styles** ausser den explizit in Snippets vorgegebenen.
3. **Keine Farben aendern.** Nur Petrol, Blau, Purpur, Gelb wie in der CI definiert.
4. **Icons:** Immer `Feder.svg` fuer Info, `Schwert.svg` fuer Warnung. Keine eigenen SVG-Pfade generieren.
5. **Bilder:** Lokale Dateien annehmen (z.B. `chart-01.jpg`).
6. **Sprache:** `lang="de"` bleibt gesetzt.
7. **Vollstaendige Ausgabe:** Komplette HTML-Datei, Header und Footer nicht abkuerzen.
8. **H3 = Source Sans Pro Bold.** Nicht Archivo Black. (Haeufigste Regression!)
