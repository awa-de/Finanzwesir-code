# Übergabe-Prompt: Design-System konsolidieren

> **Anleitung:** Diesen Text 1:1 als Startprompt in eine neue Konversation kopieren.

---

## Prompt (ab hier kopieren)

### Deine Rolle

Du bist ein **Senior UX/UI-Architekt und Web-Frontend-Designer**. Ein Kunde gibt dir einen Ordner mit chaotischen Design-Dokumenten und sagt: "Sortiere das und mach daraus ein sauberes Design-System."

Du arbeitest mit der Präzision eines Architekten, nicht eines Dekorateurs. Jede Entscheidung muss begründbar sein. Das Ergebnis soll die Qualität haben, die ein Senior-Architekt bei Google/Amazon/Facebook akzeptieren würde.

### Das Projekt

**Finanzwesir** — eine deutschsprachige Finanz-Website für Privatanleger (Zielgruppe 35+, Laien). Das Theme wird für **Ghost CMS 6.x** gebaut. Die Website nutzt **Tailwind CSS** via CDN (kein Build-Prozess) und eine eigene **Chart Engine** (Chart.js-basiert, separate Specs in `docs/spec/`).

Design-Philosophie: **"No Jazz, just Bach."** Maximale Klarheit, minimale Dekoration, barrierearmer Zugang.

### Dein erstes To-Do: Kontext lesen

Lies diese Dateien, bevor du antwortest:

1. **`CLAUDE.md`** — Arbeitsregeln (gelten auch für dich)
2. **`docs/context/DESIGN-SYSTEM-ISSUES.md`** — Bekannte offene Punkte (von Vorgänger-Session vorausgefüllt)
3. **`docs/context/THEME-ASSEMBLY-CHECKLIST.md`** — Ghost-Theme-Struktur (deine Specs sind Input für diesen Bau)

Dann fasse zusammen: Wo stehen wir? Was fehlt? Was ist der erste Schritt?

---

## Quellen-Inventar

### Wo liegen die Rohdokumente?

Alles in `docs/design/` — zwei Unterordner:

**`docs/design/Specs und Beschreibungen/`** (22 Dateien):

| Datei | Was ist drin | Aktuellste Version |
|---|---|---|
| Design-Matrix Desktop vs. Mobile-v1 bis v9 | Responsive-Matrix: CSS-Klassen Desktop vs. Mobile für alle Elemente | **v9** (Final) |
| LLM_INSTRUCTIONS bis v8 | Anweisungen für LLMs zur Content-Erstellung | **v8** (Markdown-First-Ansatz) |
| LLM_INSTRUCTIONS.md (ohne v-Suffix) | Älteste Version, HTML-Only, aber vollständigste Component Library | **v1** (als Snippet-Referenz nutzen) |
| DESIGN_SYSTEM.md | Kompakte Referenz (unvollständig, Formatierung kaputt) | Veraltet, in v8 aufgegangen |
| Finanzwesir-CI Fonts und Farben.md | Rohe Farbpalette + Font-Namen | Single Source für CI-Farben |
| Design-Rationale Finanzwesir.md | Post-Hardening-Begründungen (H3-Fix, Hard-Rim, Button-Fix) | Einzigartig |
| Evaluation der Design-Matrix-ChatGPT.md | Review Runde 1 (Score: 5.6/10) | Historisch |
| Evaluation II der Design-Matrix-ChatGPT.md | Review Runde 2 (Score: 9.0/10, Golden Master Freigabe) | Historisch |
| Evaluation der Design-Matrix-Perplexity.md | Review Runde 1 (Score: 6.5/10) | Historisch |
| Evaluation II der Design-Matrix-Perplexity.md | Review Runde 2 (Golden Master mit Auflagen) | Historisch |
| Mobile versus Desktop.md | **IGNORIEREN** — Chart-Engine-Spec, Fehlplatzierung | Liegt korrekt in `docs/spec/` |

**`docs/design/HTML-Dateien/`** (37 Dateien):

| Kette | Versionen | Enthält |
|---|---|---|
| master-template | v1, v2, v4, v5 | Basis-Template (Header, Footer, Content-Area, Tailwind-Config, CSS) |
| boxen-text | v1–v7 | Content-Seite mit allen Komponenten (Boxen, Listen, Tabellen) |
| ui-kit-demo | v11 | Komponentenkatalog: alle Elemente auf einer Seite |
| ui-kit-reference | v4 | Visuelle Referenz mit Labels |
| finanzwesir-homepage (v15, v16) | v15, v16 | Startseite (eigenes Layout, keine max-w-800) |
| Impressum | v1–v3 | Legal-Seite |
| Datenschutz | v1 | Legal-Seite |
| SVGs (15 Stück) | — | Icons und Logos (bereits kopiert nach `docs/design-system/templates/assets/`) |
| testbild.jpg | — | Testbild (bereits kopiert) |

### Was NICHT anfassen

- `docs/spec/` — Chart-Engine-Specs (andere Domäne)
- `docs/context/KNOWN-ISSUES.md` — Chart-Engine-Issues
- `docs/context/working-features.md` — Chart-Engine-Features
- `assets/js/fw-chart-engine/` — Engine-Code

---

## Bereits getroffene Entscheidungen (NICHT erneut öffnen)

Diese 12 Punkte wurden in zwei Review-Runden diskutiert und sind in den aktuellsten HTML-Dateien bereits umgesetzt:

1. **H3 → Source Sans Pro Bold** (nicht mehr Archivo Black) — ruhigere Hierarchie
2. **max-w-[800px]** für Content-Bereich durchgesetzt — 80-Zeichen-Regel
3. **Tabellen implementiert** — responsive mit overflow-x-auto, Header in Source Sans Bold
4. **Farb-Palette dokumentiert** — Hex-Codes im Tailwind-Config sichtbar
5. **Tailwind-Config im `<head>`** — transparent, kein Build nötig
6. **Secondary Button Hover = text-petrol** (NICHT text-blau) — semantische Trennung
7. **Hard-Rim Shadow** für Gelb-Icons — `drop-shadow(1px 1px 0px rgba(0,0,0,0.25))`
8. **Icon-Reset** (.hard-rim) mit `!important` gegen Ghost-Image-Styles
9. **focus-visible implementiert** — `outline: 2px solid petrol, offset: 2px`
10. **Blockquote-Padding mobil erhöht** — 1.5rem (24px)
11. **Tabellen-Header: Source Sans Bold** (nicht Archivo, zu breit)
12. **Box-Layout: flex-col mobil, flex-row ab md:** — Anti-Briefmarken-Prinzip

---

## Verfahren für HTML-Versionsketten

Die HTML-Dateien existieren in Versionsketten (z.B. boxen-text-v1 bis v7). Problem: Die höchste Version ist ENTWEDER die beste ODER eine erste Regression.

**Dein Verfahren:**

1. **Diff der Top-2 Versionen** jeder Kette (z.B. v6 vs. v7)
2. **Delta bewerten:**
   - Ändert sich die Tailwind-Config? → CSS-Variablen-Ansatz ist besser als Hardcoded Hex
   - Werden Review-Empfehlungen umgesetzt? (H3-Fix, max-w-800, Touch-Targets) → Verbesserung
   - Werden Komponenten entfernt oder vereinfacht? → Möglicherweise Regression
   - Werden `!important`-Hacks eingeführt oder entfernt? → Kontext prüfen
3. **Entscheidung:**
   - Delta ist klar eine Verbesserung → Höchste Version ist Golden Master
   - Delta ist unklar oder verschlechtert → An User eskalieren (Liste erstellen)
4. **Golden Master kopieren** nach `docs/design-system/referenz/` bzw. `templates/`

**Ziel-Zuordnung:**

| Golden Master | Ziel |
|---|---|
| master-template-v? | `docs/design-system/templates/master-template.html` |
| ui-kit-demo-v? | `docs/design-system/referenz/ui-kit-demo.html` |
| homepage-v? | `docs/design-system/referenz/homepage-demo.html` |
| boxen-text-v? | `docs/design-system/referenz/content-page-demo.html` |
| Impressum-v? | `docs/design-system/referenz/impressum-demo.html` |
| Datenschutz-v? | `docs/design-system/referenz/datenschutz-demo.html` |

---

## Zielstruktur der Specs

Schreibe diese Dateien in `docs/design-system/`:

### DESIGN-SYSTEM.md (Master-Dokument)

Analog zum Architecture Strategy Paper der Chart-Engine. Enthält:
- Philosophie und Design-Prinzipien
- Zielgruppe und Kontext
- Datei-Inventar (welche Spec deckt was ab)
- Technologie-Entscheidungen (Tailwind CDN, CSS-Variablen, Google Fonts)
- Verweis auf Ghost-Theme-Struktur (THEME-ASSEMBLY-CHECKLIST.md)

### spec/01-FARBEN-UND-TYPOGRAFIE.md

**Single Source of Truth** für alle Farben und Schriften.
- Farbpalette: Hex + RGBA + alle Abstufungen (petrol, blau, gelb, purpur, text, background, border)
- Semantische Zuordnung: Petrol=Brand/Buttons, Blau=Links, Purpur=Warnung/Visited, Gelb=Akzent/dekorativ
- Tailwind-Config als vollständiger Code-Block (CSS-Variablen-Ansatz aus master-template-v5)
- Fonts: Archivo Black (H1/H2 Display), Source Sans Pro (alles andere)
- Type Scale: H1–H6, Body, Lead, Small — mit Desktop/Mobile-Werten und Tailwind-Klassen

### spec/02-LAYOUT-UND-RESPONSIVE.md

- Breakpoints: Mobile (Default), md:768px, xl:1280px
- Container: max-w-[800px] Content, max-w-[1400px] Header
- Spacing-System: px-4/px-6, gap-4/gap-8, my-8/my-16
- Header: Sticky, Blur, 72px/82px Höhe, Logo + Nav
- Navigation: Inline-Links ab xl:, Hamburger-Menü darunter
- Footer: Struktur, Links, Copyright

### spec/03-KOMPONENTEN.md

Jeder Baustein mit exaktem HTML-Snippet und Tailwind-Klassen:
- Info-Box (Feder-Icon, petrol), Warn-Box (Schwert-Icon, purpur), Fazit-Box
- Standard-Liste, Nummerierte Liste, Checklist (petrol), Warnlist (purpur)
- Blockquote (gelber Balken, 4px)
- Tabelle (responsive, petrol-Header, overflow-x-auto)
- Accordion/FAQ (details/summary)
- Bilder (Standard + Caption mit "Abb."-Prefix)
- Video-Wrapper (16:9, responsive)
- Audio-Player

### spec/04-INTERAKTION.md

- Primary Button: Zustände (Default/Hover/Active) mit Tailwind-Klassen
- Secondary Button: Zustände (AUFGELÖST: text-petrol, nicht text-blau)
- Text-Links: .ci-link Klasse, blau, Hover→petrol, Visited→purpur
- Navigation-Links: States
- focus-visible: Universell, 2px solid petrol
- Transitions: duration-200, ease-in-out

### spec/05-BARRIEREFREIHEIT.md

- Kontrast-Tabelle aller Farbpaare (WCAG AA/AAA Ratios)
- Touch-Targets: Mindestgrößen (OFFENER PUNKT: aktuell 36px statt 44px)
- Icons: Dekorativ (redundant zu Text, alt-Attribut vorhanden)
- Tastatur-Navigation: focus-visible, Tab-Reihenfolge
- Schriftgrößen: 18px Body = Minimum für Zielgruppe 35+
- Gelb-Kontrast: Lösung via Hard-Rim + dekorativ-Deklaration

### spec/06-SEITENTYPEN.md

- **Homepage:** Full-Width Header, Hero, Card-Grid, KEIN max-w-[800px] im Content
- **Content-Seite (Artikel):** max-w-[800px], lineare Leserichtung, alle Komponenten
- **Legal-Seite (Impressum/Datenschutz):** max-w-[800px], reduzierte Typografie

### LLM-INSTRUCTIONS.md

Konsolidierte Anweisungen für LLMs, die Content erstellen:
- **Abschnitt 1: Markdown-First** (aus v8) — Markdown-Patterns für Headings, Callouts, Listen
- **Abschnitt 2: HTML-Snippets** (aus v1/v5) — Vollständige Component Library für direktes HTML
- **Abschnitt 3: Strict Rules** — Keine eigenen CSS-Klassen, keine Inline-Styles, Icons als Dateien
- Verweis auf Janitor-Script (DS-008, muss noch geschrieben werden)

### archiv/REVIEW-PROTOKOLL.md

Komprimierte Zusammenfassung der 4 Evaluations + Design-Rationale:
- Scorecard (Runde 1: 5.6/10 → Runde 2: 9.0/10)
- Alle Kritikpunkte und deren Auflösung (gefixt, akzeptiert, offen)
- Nur Entscheidungen, nicht der vollständige Review-Text

---

## Aufgabenliste

### Phase A: Bestandsaufnahme (zuerst)

1. Aktuellste Specs lesen: Design-Matrix v9, LLM_INSTRUCTIONS v8, LLM_INSTRUCTIONS v1 (HTML-Snippets), CI-Farben, Design-Rationale
2. HTML-Versionsketten diffen (Top-2 pro Kette)
3. Golden Master pro Kette identifizieren
4. Golden-Master-HTMLs kopieren (nach referenz/ und templates/)

### Phase B: Specs konsolidieren

5. 01-FARBEN-UND-TYPOGRAFIE.md schreiben
6. 02-LAYOUT-UND-RESPONSIVE.md schreiben
7. 03-KOMPONENTEN.md schreiben
8. 04-INTERAKTION.md schreiben
9. 05-BARRIEREFREIHEIT.md schreiben
10. 06-SEITENTYPEN.md schreiben
11. DESIGN-SYSTEM.md (Master) schreiben
12. LLM-INSTRUCTIONS.md konsolidieren
13. Review-Protokoll komprimieren → archiv/REVIEW-PROTOKOLL.md

### Phase C: Janitor-Script

14. Janitor-Script schreiben: Transformiert Markdown-Patterns in gestyltes HTML
    - `[!NOTE]` → Info-Box mit Feder-Icon
    - `[!WARNING]` → Warn-Box mit Schwert-Icon
    - `[!TIP]` → Fazit-Box
    - `[+]` / `[-]` → Checklist / Warnlist
    - Standard-Markdown (Blockquotes, Tabellen, Listen) → gestyltes HTML
    - Ablageort: Im Ghost-Theme (Template-Helper oder JS-Postprocessing)

### Phase D: Aufräumen

15. DESIGN-SYSTEM-ISSUES.md aktualisieren (gelöste Punkte schließen, neue öffnen)
16. THEME-ASSEMBLY-CHECKLIST.md aktualisieren (Verweis auf neue Design-System-Docs)
17. Verifizieren: Alle wesentlichen Inhalte aus den Quellen extrahiert
18. Bestätigen: `docs/design/Specs und Beschreibungen/` und `docs/design/HTML-Dateien/` können gelöscht werden

---

## Qualitätskriterien

Das Ergebnis ist fertig, wenn:

- [ ] Jede Farbe aus CI-Fonts-Farben.md kommt in 01-FARBEN-UND-TYPOGRAFIE.md vor
- [ ] Jede Komponente aus LLM_INSTRUCTIONS v1 kommt in 03-KOMPONENTEN.md vor
- [ ] Jeder Wert aus Design-Matrix v9 kommt in der passenden Spec-Datei vor
- [ ] Alle 12 Resolved Decisions sind in den Specs reflektiert (nicht widersprochen)
- [ ] Alle Evaluations-Empfehlungen sind entweder umgesetzt oder in DESIGN-SYSTEM-ISSUES.md als offen dokumentiert
- [ ] Kein Widerspruch zwischen den 6 Spec-Dateien
- [ ] DESIGN-SYSTEM.md verlinkt alle Spec-Dateien
- [ ] LLM-INSTRUCTIONS.md ist eigenständig nutzbar (ohne andere Docs lesen zu müssen)
- [ ] Janitor-Script existiert und die Markdown-Patterns aus LLM_INSTRUCTIONS funktionieren

---

## Abschluss-Ritual

Wenn du fertig bist, führe das Standard-Abschluss-Ritual aus (siehe CLAUDE.md):
1. DESIGN-SYSTEM-ISSUES.md aktualisieren
2. MEMORY.md aktualisieren (neues Architektur-Wissen)
3. Commit-Message liefern
