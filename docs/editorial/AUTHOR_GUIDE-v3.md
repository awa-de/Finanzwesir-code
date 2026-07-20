AUTHOR_GUIDE.md (Final V3)
Aktualisiert auf den Hybrid-Workflow: Markdown für Text/Listen/Boxen, HTML-Cards nur für komplexe Medien.

# 📝 Finanzwesir Author Guide (Ghost.io)

**Zweck:** Spickzettel für die Erstellung von Artikeln.
**Workflow:** Schreiben Sie Markdown. Das System verwandelt es automatisch in Design-Elemente.

---

## 1. Standard-Elemente (Markdown)

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
| **Tabelle** | `| A | B |` | Markdown-Tabelle (wird automatisch scrollbar). |

---

## 2. Spezial-Elemente (Markdown-Erweiterung)

Nutzen Sie diese Kürzel. Das System wandelt sie automatisch in Boxen um.

**✅ Checkliste (Vorteile)**
```markdown
- [+] Geringe Kosten
- [+] Breite Streuung
❌ Warnliste (Nachteile)

Markdown

- [-] Hohes Risiko
- [-] Viel Aufwand
💡 Info-Box (Wissenswert)

Markdown

> [!NOTE]
> **Titel der Box**
> Hier steht der Text.
⚠️ Warn-Box (Achtung)

Markdown

> [!WARNING]
> **Achtung: Risiko**
> Hier steht die Warnung.
🎓 Fazit-Box

Markdown

> [!TIP]
> **Fazit**
> Die Zusammenfassung.
3. Komplexe Module (HTML Cards)
Nur für diese Elemente müssen Sie in Ghost eine HTML Card (+ -> HTML) nutzen.

Video (YouTube/Vimeo)

HTML

<div class="video-wrapper mb-8">
    <iframe src="YOUTUBE_EMBED_URL" frameborder="0" allowfullscreen></iframe>
</div>
Audio / Podcast Player

HTML

<div class="bg-white border border-border rounded-xl p-4 shadow-sm flex items-center gap-4 mb-8">
    <div class="w-12 h-12 bg-petrol rounded-full flex items-center justify-center text-white shrink-0">▶</div>
    <div class="flex-1">
        <div class="text-xs font-bold text-petrol uppercase tracking-wider mb-1">Podcast</div>
        <div class="text-text font-bold truncate">Titel der Episode</div>
        <audio controls class="w-full mt-2 h-8" src="MP3_URL_HIER"></audio>
    </div>
</div>
**Interaktive Apps (Rechner, Simulatoren)**

Apps werden NICHT als vollständiger HTML-Code eingefügt. Stattdessen ein einzelner Div:

```html
<!-- App ohne eigene Daten (reine Berechnung aus User-Inputs): -->
<div class="fw-app" data-fw-app="sparplan-rechner"></div>

<!-- App mit Zeitreihen-Daten (CSV): -->
<div class="fw-app"
     data-fw-app="etf-wahlurnen-rechner"
     data-fw-data="https://www.finanzwesir.com/assets/data/msci-world.csv">
</div>
```

Das Theme lädt die App-Logik automatisch. Design-System und Fonts kommen aus dem Theme — die App fügt sich nahtlos ein.

**CSV aktualisieren:** Neue CSV hochladen → URL im `data-fw-data` anpassen. Kein weiterer Eingriff nötig.

**Charts (Chart-Engine):**

```html
<div class="financial-chart-module"
     data-type="line"
     data-title="Rendite-Vergleich (5 Jahre)"
     data-app-file="rendite-vergleich.csv"
     data-colors="World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
```

`data-app-file` nennt nur den Dateinamen der lokal geprüften und veröffentlichten CSV — kein
Link. Ablauf: `docs/editorial/CSV-APP-DATEN-WORKFLOW.md`.

Verfügbare `data-type` Werte: `line`, `bar`, `pie`