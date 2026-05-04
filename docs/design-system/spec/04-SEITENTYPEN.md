# 04 Seitentypen

> **Status:** Final
> **Quelle:** Golden Masters in `docs/design-system/referenz/`, master-template-v5

---

## 1. Uebersicht

| Seitentyp | Template | Referenz-Datei | Besonderheiten |
|:-----------|:---------|:---------------|:---------------|
| **Artikel** (Content) | master-template.html | `content-page-demo.html` | gh-content Styles, alle Komponenten |
| **Homepage** | Eigenes Layout | `homepage-demo.html` | Timeline, Hero-Section, Cards |
| **Impressum** | master-template.html | `impressum-demo.html` | Kontaktdaten, rechtliche Texte |
| **Datenschutz** | master-template.html | `datenschutz-demo.html` | Lange Rechtstexte |

---

## 2. Artikel-Seite (Content)

Die Standard-Seite. Nutzt `gh-content` fuer automatisches Styling aller Markdown-Elemente.

### Aufbau

```
[Header + Nav]
[H1 mit Gelb-Unterstrich]
[Lead-Absatz (groesser)]
[Inhalt: Text, Boxen, Listen, Tabellen, Bilder...]
[Footer]
```

### Besonderheiten

- **H1** hat `border-b-2 border-gelb` als Unterstrich
- **Lead-Absatz** ist groesser als Body (20px Mobile, 24px Desktop)
- Alle Standard-Komponenten aus Spec 02 sind verfuegbar
- `.gh-content` scoped alle Styles (Tabellen, Bilder, Listen, Blockquotes)

### Template-Code (Inhalt einfuegen)

```html
<main class="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-6 py-12 md:py-20 gh-content">

    <h1 class="font-display text-4xl md:text-5xl text-petrol mb-12 tracking-tight border-b-2 border-gelb pb-6 break-words">
        [TITEL]
    </h1>

    <p class="text-xl md:text-2xl text-text font-normal mb-10 leading-normal">
        [LEAD-ABSATZ]
    </p>

    <!-- Inhalt hier -->

</main>
```

---

## 3. Homepage

Eigenes Layout mit Timeline-Struktur. Verwendet **nicht** `gh-content`.

### Struktur

```
[Header + Nav]
[Hero-Section mit Hintergrundfarbe]
    [Headline + Subtitle]
    [CTA-Buttons]
[Phasen-Sektionen (Fundament, Bausteine, ...)]
    [Section-Header (zentriert)]
    [Timeline mit vertikaler Linie]
        [Timeline-Dot]
        [Card mit Icon + Text + Link]
    [/Timeline]
[/Phasen]
[Footer]
```

### Timeline-Geometrie

| Element | Mobile | Desktop |
|:--------|:-------|:--------|
| Vertikale Linie | `left-[32px]`, `w-[2px]`, `bg-petrol/20` | `left-[36px]` |
| Timeline-Dot | `left-[32px]`, `w-[22px] h-[22px]`, `-translate-x-1/2` | `left-[36px]` |
| Card-Offset | `ml-24` (96px) | `ml-28` (112px) |
| Card-Abstand | `space-y-12` (48px) | `space-y-16` (64px) |

### Card-Aufbau

```html
<article class="relative ml-24 md:ml-28 bg-white rounded-xl p-6 md:p-8 shadow-soft transition-all hover:shadow-hover border border-border flex flex-col md:flex-row gap-6 md:gap-8 items-start">
    <div class="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl bg-petrol-30 p-1">
        <img src="[ICON].svg" alt="Symbol" class="w-full h-full object-contain hard-rim">
    </div>
    <div class="flex-1">
        <h3 class="font-body font-bold text-xl md:text-2xl text-text mb-2 md:mb-3">[TITEL]</h3>
        <p class="text-[0.95rem] md:text-lg text-text-secondary mb-4 leading-relaxed">[TEXT]</p>
        <a href="[URL]" class="ci-link font-semibold">Mehr erfahren &rarr;</a>
    </div>
</article>
```

### Besonderheiten Homepage

- **Keine** `gh-content`-Klasse (Content wird manuell gestylt)
- Tailwind Config verwendet noch Hardcoded Hex (CSS-Vars-Migration steht aus, siehe DS-006)
- Extra-Farben `purpur.gradient-light` / `purpur.gradient-medium` (Entscheidung offen, siehe DS-007)
- Secondary Buttons: Hover-Text bleibt Petrol (DS-002 umgesetzt)

---

## 4. Impressum

Nutzt das Standard-Template (master-template.html).

### Besonderheiten

- Kontaktdaten (Adresse, E-Mail, Telefon)
- Streitschlichtungs-Hinweise
- Verantwortlichkeits-Angaben
- Keine speziellen Komponenten -- reiner Text mit Ueberschriften

---

## 5. Datenschutz

Nutzt das Standard-Template (master-template.html).

### Besonderheiten

- Sehr langer Text (rechtlich bedingt)
- Tiefe H2/H3-Hierarchie fuer Navigation
- Keine Boxen oder Listen-Sonderformate noetig
- Standard-Typografie reicht aus

---

## 6. Seiten-Navigation (9 Hauptseiten)

| # | Label | Slug |
|:--|:------|:-----|
| 1 | Der Weg | `/der-weg` |
| 2 | Weltportfolio | `/weltportfolio` |
| 3 | Geldmarkt | `/geldmarkt` |
| 4 | Aktienquote | `/aktienquote` |
| 5 | Sparquote | `/sparquote` |
| 6 | Kaufen | `/kaufen` |
| 7 | Dranbleiben | `/dranbleiben` |
| 8 | Fehler | `/fehler` |
| 9 | ETF-Aera | `/etf-aera` |

Footer-Links (sekundaer): Neu hier?, Manifest, Ueber mich, Ich bin bullish, Impressum & Kontakt, Datenschutz.
