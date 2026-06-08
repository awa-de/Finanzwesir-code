# Implementierungs-Spec: BAN (Big Accessible Number) für Line Charts

## Kontext

Du implementierst ein neues UI-Element für eine bestehende Chart-Engine (JavaScript/Chart.js, CSS wird dynamisch injiziert). Die Chart-Engine ist produktionsreif. Das neue Element heißt BAN (Big Accessible Number) und erscheint ausschließlich oberhalb von Line Charts (Zeitreihen). Für Bar- und Pie-Charts wird keine BAN gerendert.

Das Design-System nutzt:
- Tailwind CSS via CDN (kein Build-Prozess)
- CSS Custom Properties in `:root`
- Breakpoints: nur `md:` (≥ 768px) und `xl:` (nur Navigation). Kein `sm:`, `lg:`, `2xl:`.
- Fonts: Archivo Black (`font-display`) für H1/H2, Source Sans Pro (`font-body`) für alles andere
- Mobile-First: Klassen ohne Präfix gelten für < 768px

---

## 1. Position im DOM

Die BAN wird zwischen Titel (optional) und Toolbar eingefügt. Reihenfolge von oben nach unten:

[Titel h3 — optional]  
[BAN-Container] ← neu  
[Toolbar: Range-Buttons + View-Toggle]  
[Legende — nur bei Multi-Asset]  
[Canvas / Line Chart]

Begründung: Kognitive Leserichtung Thema → Ergebnis → Steuerung → Detail. Die Toolbar steuert die BAN (Range-Wechsel aktualisiert die Zahl), aber der User soll das Ergebnis sehen, bevor er die Steuerung benutzt.

Wenn kein Titel gesetzt ist, ist die BAN das oberste Element des Widgets. Das ist korrekt — sie ist dann eigenständig selbsterklärend, weil der Zeitraum immer Teil des BAN-Textes ist (z.B. „seit 2015").

---

## 2. Inhalt der BAN

### 2.1 Standard: Zwei-Zeilen-Variante

Zeile 1 (groß): +142,3%  
Zeile 2 (klein): seit 2015 · +12.400 €

### 2.2 Modus-Kongruenz (View-Toggle)

Der Chart hat zwei Modi. Die BAN-Hauptzeile passt sich an:

| Aktiver Modus | BAN Hauptzeile | BAN Nebenzeile |
|:--|:--|:--|
| Verlauf % | +142,3 % | seit 2015 · +12.400 € |
| Wert € | +12.400 € | seit 2015 · +142,3 % |

Begründung: Die BAN-Hauptzeile muss dieselbe Einheit zeigen wie die Y-Achse direkt darunter. Abweichung erzeugt kognitive Dissonanz und Vertrauensverlust beim Finanz-Laien.

### 2.3 Berechnung

Startpunkt = erster Datenpunkt im aktiven Range (nicht im gesamten CSV).  
Endpunkt = letzter Datenpunkt im aktiven Range.  
Bei Range-Wechsel (z.B. „3J" → „10J") wird die BAN neu berechnet und aktualisiert.

### 2.4 Vorzeichen

Immer explizit:
- Positiv: `+142,3 %` (Plus-Zeichen erzwingen)
- Negativ: `−23,7 %` (echtes Minuszeichen U+2212, kein Bindestrich U+002D)
- Null: `0,0 %` (kein Vorzeichen)

---

## 3. Multi-Asset

Ein Chart kann mehrere Datenreihen haben (z.B. MSCI World + Emerging Markets).

### 3.1 Bis 3 Serien: Gestapelte BAN

MSCI World +142,3%  
Emerging Markets +67,1%  
seit 2015

Jede Serie erhält eine eigene Zeile. Der Zeitraum steht einmalig darunter.

### 3.2 Ab 4 sichtbare Serien: Hint-Text mit Zähler

Stattdessen ein kursiver Hinweistext im BAN-Container: „Renditen sichtbar ab 3 Serien · N aktiv"

Wobei N die Anzahl der aktuell sichtbaren (nicht per Legend-Toggle ausgeblendeten) Serien ist.
Der Zähler aktualisiert sich dynamisch bei jedem Legend-Toggle.

Begründung: Ab 4 Serien wird die gestapelte BAN auf Mobile unlesbar. Eindeutigkeit geht vor Vollständigkeit. Der Zähler gibt dem User Feedback, dass Legend-Toggle die BAN aktivieren kann.

### 3.3 Legend-Toggle steuert BAN (V14.1.0)

Wenn der User über die Legenden-Pills Serien ausblendet und nur noch ≤3 sichtbar sind,
erscheint die volle BAN dynamisch (fade-in). Umgekehrt: von 3 auf 4+ sichtbar → Hint-Text
mit Zähler kehrt zurück. Bei 0 sichtbaren Serien → leerer Container (CLS-Schutz).

### 3.4 Konsistenz mit Tooltip

Die in der BAN gezeigten Serien müssen identisch mit den sichtbaren Serien im Chart sein. Keine Diskrepanz zwischen BAN-Selektion und Chart-Selektion.

---

## 4. Farbe

### 4.1 Entscheidung: Neutrale Textfarbe — immer

BAN-Textfarbe ist immer `--color-text` (`#272727`), unabhängig davon, ob der Wert positiv, negativ oder null ist.

Keine farbige Codierung von positiv/negativ in der BAN.

### 4.2 Begründung

1. Ockhams Rasiermesser: Das Vorzeichen (+/−) trägt die semantische Information vollständig. Farbe ist dann überflüssige Komplexität.
2. Semantische Kollision: Purpur (`#8D0267`) ist im Design-System als „Warnung/Risiko" kodiert (Warn-Box, Warnliste). Purpur an einer negativen Rendite-Zahl würde dieselbe Farbe mit zwei verschiedenen Bedeutungen laden.
3. Pädagogischer Schaden: Der Blog vermittelt Buy-and-Hold-Philosophie. Verluste sind normal und temporär. Eine farbig alarmierte negative BAN widerspricht der redaktionellen Mission.
4. Nullzustand: Bei 0,0 % Rendite gibt es keine sinnvolle Farbe im bestehenden CI-System. Neutraler Text ist der einzige konsistente Zustand für alle drei Fälle (positiv / negativ / null).

### 4.3 Implementierungsfolgen

- Kein dynamisches Setzen von `text-petrol` oder `text-purpur` basierend auf dem Vorzeichen.
- Kein Icon (kein Pfeil, kein ⚠️) zur Verstärkung.
- Die Nebenzeile ebenfalls in `text-text-sec` (`#4C4C4C`) — keine Farbcodierung.

---

## 5. Typografie

### 5.1 HTML-Struktur

```html
<div class="ban-container mb-2">
  <!-- Hauptzeile -->
  <div class="ban-main text-xl md:text-2xl font-body font-bold leading-tight text-text">
    +142,3%
  </div>

  <!-- Nebenzeile (nur bei Single-Asset oder bis 3 Serien mit Zeitraum) -->
  <div class="ban-sub text-xs md:text-[13px] font-body leading-tight text-text-sec mt-0.5">
    seit 2015 · +12.400 €
  </div>
</div>
### 5.2 Größen und Begründung

| Element | Mobile | Desktop (≥450px Container) | Gewicht | Stil |
|:--------|:-------|:---------------------------|:--------|:-----|
| BAN Hauptzeile | 20px | 24px | 700 Bold | Normal |
| BAN Nebenzeile | 15px | 16px | 400 Regular | Normal |
| BAN Hint-Text | 15px | 16px | 400 Regular | Normal |

Verhältnis Haupt:Neben = 24:16 = **1,5:1 (Perfect Fourth)** — eines der stabilsten
typografischen Verhältnisse, Industriestandard bei Bloomberg, Morningstar, Google Finance.
Hint-Text identisch zur Nebenzeile (Statusinformation, kein Kommentar → kein Kursiv).

### 5.3 Font
Source Sans Pro Bold — kein Archivo Black. Archivo Black ist Display-Font für Überschriften (H1, H2), nicht für Datenwerte. Die BAN ist ein Ergebnis, keine Headline.

### 5.4 Line-Height
leading-tight (1.25) statt leading-relaxed (1.625). Die BAN ist eine 2-Zeilen-Einheit aus Zahl und Kontext, keine Prosa. Enger Durchschuss hält Hauptzeile und Nebenzeile visuell zusammen.

### 5.5 Typografie-Hierarchie
H1: 48px / 36px — Archivo Black Bold (Artikel-Titel)
H2: 30px / 24px — Archivo Black Bold (Abschnitte)
BAN Hauptzeile: 24px / 20px — Source Sans Pro Bold (neu)
H3/Chart-Titel: 20px / 20px — Source Sans Pro Bold
Body: 18px / 18px — Source Sans Pro 400
Lead Intro: 24px / 20px — Source Sans Pro 400
Tabellen: 16px / 14px — Source Sans Pro 400/Bold
BAN Nebenzeile: 16px / 15px — Source Sans Pro 400 (Perfect Fourth 1,5:1)
BAN Hint-Text: 16px / 15px — Source Sans Pro 400 (identisch zur Nebenzeile)
Toolbar/Tooltip: 13px / 13px — Source Sans Pro 400
Achsen Canvas: 12px / 11px — Source Sans Pro 400 (px-fixed, Canvas)

## 6. Spacing
[Titel h3] — bestehend, mb-4 (32px)
[BAN-Container] — mb-2 (8px) nach unten zur Toolbar
[Toolbar] — bestehend

mb-2 (8px) signalisiert: BAN und Toolbar sind eine funktionale Einheit, aber nicht dasselbe Element. Nicht mb-6 wie Absätze — das wäre zu viel Abstand für zusammengehörige UI-Elemente.

## 7. Interaktion und Live-Update
Bei Range-Wechsel (Klick auf „1J", „3J" etc.) wird die BAN synchron mit dem Chart neu berechnet und aktualisiert.

DOM-Update via innerHTML oder textContent — kein Reload.

Transition: Kurzer Fade-in (opacity 0 → 1, ca. 150ms) bei Wertewechsel, damit der Sprung nicht wie ein Darstellungsfehler wirkt.

aria-live="polite" auf dem .ban-container, damit Screen Reader die neue Zahl vorlesen, sobald sie sich ändert.

# 8. Accessibility (Kurzfassung)
.ban-container erhält aria-live="polite".

Wenn kein Titel gesetzt ist: .ban-container erhält zusätzlich aria-label="[Asset-Name]: +142,3 % seit 2015".

Echtes Minuszeichen (U+2212 −) statt Bindestrich (U+002D -) ist Pflicht.

## 9. Randfälle — Pflichtdefinitionen vor Build
Fall	Verhalten
Rendite = 0,0 %	0,0 % ohne Vorzeichen, text-text, keine Farbe
Kein Titel gesetzt	BAN ist oberstes Element, aria-label mit Asset-Name
4+ Serien (Multi-Asset)	Keine BAN, stattdessen „Renditen im Chart-Tooltip"
Datenlage unvollständig	BAN nicht rendern, kein leerer Container
Nur 1 Datenpunkt im Range	BAN nicht rendern (keine Differenz berechenbar)
Mobile (< 768px), 2 Zeilen	Beide Zeilen sichtbar, Nebenzeile 12px — kein Abschneiden

## 10. Verhalten mit und ohne Titel
Der Chart-Titel (h3) ist optional. Der Redakteur setzt ihn oder lässt ihn weg. Die BAN darf nicht vom Titel abhängen — sie muss in beiden Zuständen funktionieren.

## 10.1 Vier Kombinationen
Titel	BAN	Ergebnis	Hinweis
Ja	Ja	h3 → BAN → Toolbar → Chart	Normalfall
Ja	Nein	h3 → Toolbar → Chart	Wie heute (kein Range mit 1 Punkt)
Nein	Ja	BAN → Toolbar → Chart	BAN ist oberstes Element — OK
Nein	Nein	Toolbar → Chart	Wie heute
10.2 Wenn kein Titel vorhanden
Die BAN steht als oberstes Element des Widgets. Das ist kein Fehlerfall. Eine Zahl wie „+142,3 % seit 2015" ist ohne Titel selbsterklärend, weil der Zeitraum immer Bestandteil der BAN ist.

Anforderungen:

Visuell: Kein Leerraum oberhalb der BAN; der Titel-Container wird nur gerendert, wenn ein Titel-String vorhanden ist (kein leeres <h3></h3>).

Accessibility: Ohne Titel fehlt der semantische Kontext für den Asset-Namen; die BAN erhält ein aria-label, das den Asset-Namen einschließt.

xml
<!-- Mit Titel: kein aria-label nötig, Titel liefert Kontext -->
<h3 class="...">MSCI World</h3>
<div class="ban-container" aria-live="polite">
  <div class="ban-main ...">+142,3%</div>
  <div class="ban-sub ...">seit 2015 · +12.400 €</div>
</div>

<!-- Ohne Titel: aria-label trägt den Kontext -->
<div class="ban-container" aria-live="polite" aria-label="MSCI World: +142,3% seit 2015">
  <div class="ban-main ...">+142,3%</div>
  <div class="ban-sub ...">seit 2015 · +12.400 €</div>
</div>
Das aria-label wird dynamisch aus Asset-Name + Hauptzeile + Zeitraum zusammengesetzt und bei Range-Wechsel aktualisiert.

## 11. Accessibility (a11y) — vollständige Anforderungen
### 11.1 Screen Reader
aria-live="polite" auf .ban-container ist Pflicht, weil die BAN sich bei Range-Wechsel dynamisch aktualisiert.

polite statt assertive: Der Screen Reader wartet, bis die aktuelle Ausgabe beendet ist; assertive würde unterbrechen.

Minuszeichen: Echtes Minus U+2212 (−), kein Bindestrich U+002D (-).

Nebenzeile: Die Nebenzeile ist für Screen Reader sichtbar und wird vorgelesen; der Mittelpunkt · (U+00B7) wird meist als Pause/ignoriert (gewünscht).

## 11.2 Kontrast (WCAG AA)
Alle BAN-Textelemente auf weißem Hintergrund (#FFFFFF):

Variable/Farbe	Hex	Kontrast	WCAG AA (normal)	WCAG AA (large)
--color-text	#272727	14,0:1	AAA ✓	AAA ✓
--color-text-sec	#4C4C4C	7,7:1	AAA ✓	AAA ✓
WCAG AA Large Text gilt ab 18px normal oder 14px bold.

## 11.3 Farbunabhängigkeit
Die BAN vermittelt ihre Information ausschließlich über Text und Vorzeichen — nicht über Farbe (WCAG 1.4.1 Use of Color).

## 11.4 Zoom und Textvergrößerung
Tailwind-Klassen wie text-xl md:text-2xl skalieren mit Browser-Zoom korrekt, weil Tailwind rem-Einheiten verwendet.

Canvas-Schriften (Achsen, Tooltips) sind px-fixed; die BAN ist kein Canvas-Element und muss rem-basiert skalieren.

## 11.5 Fokus und Tastatur
Die BAN ist ein reines Ausgabe-Element, kein interaktives Element: kein tabindex, kein Fokus-Ring.

Die Toolbar-Buttons (Range-Wechsel) haben ihren eigenen Fokus-Stil (z.B. focus-visible: 2px solid Petrol).