---
Angelegt am: 28.11.2025 20:16:36
zuletzt verändert am: 2025-11-28T20:20:34+01:00
---
---
up:: 
# 📝 Finanzwesir Author Guide (Ghost.io)

**Zweck:** Spickzettel für die Erstellung von Artikeln in Ghost.
**Workflow:** Wir schreiben in **Markdown**. Ein Skript im Hintergrund verwandelt die Kürzel automatisch in das richtige Design (Icons, Boxen, etc.).

---

## 1. Überschriften & Text

| Element               | Markdown (Eintippen)         | Hinweis                         |
| :-------------------- | :--------------------------- | :------------------------------ |
| **Seitentitel (H1)**  | `# Der Titel`                | **Nur 1x** pro Seite ganz oben! |
| **Kapitel (H2)**      | `## Kapitelüberschrift`      | Standard für neue Abschnitte.   |
| **Unterkapitel (H3)** | `### Zwischenüberschrift`    | Zur Gliederung langer Kapitel.  |
| **Fett**              | `**Wichtiges Wort**`         |                                 |
| **Kursiv**            | `*Fachbegriff*`              |                                 |
| **Link**              | `[Linktext](https://url.de)` |                                 |

---

## 2. Listen & Aufzählungen

**A. Standard Listen (Neutral)**
- Ein normaler Punkt
- Noch ein Punkt

**B. Nummerierte Liste (Prozesse/Schritte)**

1. Depot eröffnen
2. ETF kaufen
3. Warten

**C. ✅ Checkliste (Vorteile / Pro) Syntax: Minus, Leerzeichen, eckige Klammer auf, Plus, eckige Klammer zu.**


- [+] Vorteil: Geringe Kosten
- [+] Vorteil: Breite Streuung

**D. ❌ Warnliste (Nachteile / Contra) Syntax: Minus, Leerzeichen, eckige Klammer auf, Minus, eckige Klammer zu.**

- [-] Nachteil: Langweilig
- [-] Nachteil: Keine Action

## 3. Content-Boxen (Highlights)

Nutzen Sie diese Boxen, um Wichtiges hervorzuheben. Wichtig: Immer ein Blockquote (>) gefolgt vom Tag in eckigen Klammern.

💡 Info-Box (Wissenswert / Definition) Blauer Hintergrund, Feder-Icon.


> [!NOTE]
> **Titel der Box**
> Hier steht der Erklärungstext. Markdown (wie **fett**) funktioniert hier drin.
⚠️ Warn-Box (Risiko / Achtung) Weißer Hintergrund, lila Rand, Schwert-Icon.


> [!WARNING]
> **Achtung: Risiko**
> Hier steht die Warnung vor Fehlern oder Verlusten.
🎓 Fazit-Box (Zusammenfassung) Grauer Hintergrund, ohne Icon. Für das Ende eines Artikels.


> [!TIP]
> **Fazit**
> Zusammenfassung oder "Key Takeaway".

## 4. Bilder & Bildunterschriften

Bilder werden automatisch zentriert, abgerundet und erhalten einen Schatten.

Bild ohne Unterschrift: ![Alt-Text](/bild.jpg)

Bild MIT Unterschrift: Schreiben Sie den Text kursiv direkt in die Zeile unter das Bild. Das System erkennt dies und formatiert es als "Abb.: ...".

Markdown

![Chart MSCI World](/images/chart.png)
*Entwicklung seit 1970 (Quelle: MSCI)*

## 5. Tabellen
Ghost formatiert Markdown-Tabellen automatisch im Zebra-Look (Petrol Header).

| Anlageklasse | Rendite | Risiko  |
| ------------ | ------- | ------- |
| Aktien       | Hoch    | Hoch    |
| Tagesgeld    | Niedrig | Niedrig |
## 6. Zitate (Quotes)
Variante A: Standard (Markdown) Schnell und einfach. Grauer Balken links.

> "Zitate sind nützlich."
> — Der Autor

Variante B: Premium Zitat (HTML Card) Mit großem gelben Balken und schönerer Typografie. Nutzen Sie dafür eine HTML Card in Ghost.

```
<blockquote class="relative pl-6 md:pl-10 border-l-4 border-gelb my-10">
    <p class="font-body italic text-xl md:text-2xl text-text leading-relaxed mb-4">
        "Hin und her macht Taschen leer."
    </p>
    <footer class="text-sm font-bold text-petrol uppercase tracking-wider">
        — Börsenweisheit
    </footer>
</blockquote>
```
## 7. HTML Module (Audio, Video, Tools)
Diese Elemente funktionieren nicht in Markdown. Klicken Sie im Ghost-Editor auf das + und wählen Sie "HTML". Fügen Sie dort den Code ein.

Video (YouTube / Vimeo) Sorgt für korrektes 16:9 Format auf Handy & Desktop.

```
<div class="video-wrapper mb-8">
  <iframe src="YOUTUBE_EMBED_URL" frameborder="0" allowfullscreen></iframe>
</div>
```

Audio / Podcast Player

```
<div class="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 mb-8">
    <div class="w-12 h-12 bg-petrol rounded-full flex items-center justify-center text-white shrink-0">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <div class="flex-1 min-w-0">
        <div class="text-xs font-bold text-petrol uppercase tracking-wider mb-1">Podcast</div>
        <div class="text-text font-bold truncate">Titel der Episode</div>
        <audio controls class="w-full mt-2 h-8" src="URL_ZUR_MP3"></audio>
    </div>
</div>
```

Interaktive Rechner / Infografiken Kopieren Sie den gesamten HTML-Code der jeweiligen Infografik-Datei (z.B. rechner-risiko.html) in die HTML Card.