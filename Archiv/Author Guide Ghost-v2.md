Markdown

# 📝 Finanzwesir Author Guide (Ghost.io)

**Zweck:** Ihr Spickzettel für die Erstellung von Artikeln.
**Prinzip:**
1.  **Einfacher Text** (Überschriften, Fließtext, Zitate) → **Markdown**.
2.  **Design-Elemente** (Boxen, Listen mit Icons, Tabellen) → **HTML Card**.

---

## 1. Standard-Elemente (Markdown)

Diese Elemente tippen Sie einfach direkt herunter.

| Element | Eingabe (Markdown) | Ergebnis |
| :--- | :--- | :--- |
| **H1 Seitentitel** | `# Der Titel` | Große Überschrift ganz oben (nur 1x!) |
| **H2 Kapitel** | `## Kapitelüberschrift` | Standard für neue Abschnitte. |
| **H3 Unterkapitel** | `### Zwischenüberschrift` | Zur Gliederung langer Kapitel. |
| **Fett** | `**Wichtiges Wort**` | **Fett** |
| **Kursiv** | `*Fachbegriff*` | *Kursiv* |
| **Link** | `[Linktext](https://url.de)` | Link im Text |
| **Zitat** | `> "Der Text..."` | Wird automatisch gelb & groß (Premium). |
| **Listen (Simpel)** | `- Punkt 1` | Normale Bullet-Points. |
| **Nummeriert** | `1. Schritt eins` | Nummerierte Liste. |
| **Bild** | `![Alt-Text](/bild.jpg)` | Bild zentriert mit Schatten. |
| **Bildunterschrift** | `*Die Unterschrift*` | Kursive Zeile direkt unter dem Bild. |

---

## 2. Design-Module (HTML Cards)

Für diese Elemente erstellen Sie in Ghost eine **HTML Card** (`+` -> `HTML`) und fügen den Code ein.
*Tipp: Legen Sie sich diese Schnipsel in einem Text-Tool (z.B. Notion, TextExpander) bereit.*

### A. Highlight Boxen

**💡 Info-Box (Wissenswert)**
```html
<div class="bg-petrol-tint border border-petrol-20 rounded-xl p-6 md:p-8 my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
    <div class="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl bg-petrol-30 p-1">
        <img src="https://DEINE-URL/Feder.svg" alt="Info" class="w-full h-full object-contain hard-rim">
    </div>
    <div class="flex-1 min-w-0">
        <h4 class="font-display text-lg md:text-xl text-petrol mb-2 mt-1">TITEL HIER</h4>
        <div class="text-text-secondary m-0 text-lg leading-relaxed">
            TEXT HIER EINFÜGEN.
        </div>
    </div>
</div>
⚠️ Warn-Box (Achtung/Risiko)

HTML

<div class="bg-white border-l-4 border-purpur shadow-soft p-6 md:p-8 my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
    <div class="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl bg-purpur-30 p-1">
        <img src="https://DEINE-URL/Schwert.svg" alt="Achtung" class="w-full h-full object-contain hard-rim">
    </div>
    <div class="flex-1 min-w-0">
        <h4 class="font-display text-lg md:text-xl text-purpur mb-2 mt-1">TITEL HIER</h4>
        <div class="text-text-secondary m-0 text-lg leading-relaxed">
            TEXT HIER EINFÜGEN.
        </div>
    </div>
</div>
🎓 Fazit-Box

HTML

<div class="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm my-8">
    <h4 class="font-display text-xl text-petrol mb-4">Fazit</h4>
    <div class="text-text-secondary m-0 text-lg">
        TEXT HIER EINFÜGEN.
    </div>
</div>
B. Spezial-Listen
✅ Checkliste (Vorteile)

HTML

<ul class="fw-checklist space-y-3 text-lg mb-8">
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-petrol shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <span>Vorteil 1</span>
    </li>
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-petrol shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <span>Vorteil 2</span>
    </li>
</ul>
❌ Warnliste (Nachteile)

HTML

<ul class="fw-warnlist space-y-3 text-lg mb-8">
    <li class="flex items-start gap-3">
        <svg class="w-6 h-6 text-purpur shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        <span>Nachteil 1</span>
    </li>
</ul>
C. Medien & Tabellen
Tabelle (Responsive) Wichtig: Nutzen Sie diesen HTML-Code statt Markdown, damit die Tabelle auf dem Handy scrollbar bleibt (nicht gequetscht wird).

HTML

<div class="overflow-x-auto my-8">
    <table>
        <thead>
            <tr>
                <th>Kopf 1</th>
                <th>Kopf 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Daten 1</td>
                <td>Daten 2</td>
            </tr>
        </tbody>
    </table>
</div>
Video (YouTube/Vimeo)

HTML

<div class="video-wrapper mb-8">
    <iframe src="YOUTUBE_EMBED_URL" frameborder="0" allowfullscreen></iframe>
</div>
Audio Player

HTML

<div class="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 mb-8">
    <div class="w-12 h-12 bg-petrol rounded-full flex items-center justify-center text-white shrink-0">▶</div>
    <div class="flex-1">
        <div class="text-xs font-bold text-petrol uppercase tracking-wider mb-1">Podcast</div>
        <div class="text-text font-bold truncate">Titel der Episode</div>
        <audio controls class="w-full mt-2 h-8" src="MP3_URL_HIER"></audio>
    </div>
</div>