---
Angelegt am: 01.05.2026 09:03:44
zuletzt verändert am: 2026-05-01T09:04:42+02:00
---
---
up:: 
# Analyse & Optimierung: ETF-Wahlurnen-Rechner

## 1. Executive Summary
Die App verfolgt einen psychologisch klugen Ansatz: Sie nutzt das **Framing des „Kassenbons“**, um abstrakte Steuergesetzgebung in konkrete „Schmerzzahlen“ zu übersetzen. Die technische Basis ist solide, doch für die Zielgruppe der „intelligenten Finanzlaien“ gibt es Optimierungspotenzial in der kognitiven Last und der visuellen Hierarchie auf verschiedenen Displaygrößen.

---

## 2. Analyse nach Experten-Kriterien

### A. Steve Krug („Don't Make Me Think“)
* **Status Quo:** Der Wechsel zwischen „Block 1“ (statische Info) und „Block 2“ (interaktive Simulation) ist ein logischer Bruch. Ein Nutzer könnte den Kassenbon als das Endergebnis missverstehen.
* **Optimierung:**
    * **Selbsterklärung:** Die Begriffe „Modus A“ und „Modus B“ sind technische Platzhalter. Krug würde sagen: „Nenne es beim Namen.“ Ersetze sie durch „Sicherheits-Check“ (Wie lange reicht es?) und „Wunsch-Rente“ (Was kriege ich raus?).
    * **Visual Cue:** Der Button „Zur Simulation“ sollte als sanfter Anker fungieren, aber die Simulation selbst sollte das visuelle Element des Kassenbons „erben“, um Kontinuität zu wahren.

### B. Edward Tufte (Data-Ink Ratio & Integrität)
* **Status Quo:** Das Chart nutzt Chart.js Standard-Settings. Auf 4K-Monitoren wirkt die Linie bei 270px Höhe verloren (zu viel White Space, zu wenig vertikale Auflösung der Daten).
* **Optimierung:**
    * **Data-to-Ink:** Die gestrichelten Linien im Kassenbon sind dekorativ gut, aber im Chart lenken die grauen Grid-Lines vom Wesentlichen ab.
    * **Vergleichbarkeit:** Tufte würde „Small Multiples“ oder eine direktere Beschriftung der Linien-Endpunkte vorschlagen, statt einer Legende, die den Blick zwingt, ständig zwischen Farben und Linien hin- und herzuspringen.
    * **Annotationen:** Markiere den Punkt des „Stabwechsels“ (Übergang Anspar- zu Entsparphase) direkt im Chart, nicht nur durch Logik.

### C. FAANG-Design & Responsiveness
* **Status Quo:** Die App nutzt ein fixes `max-width: 780px`.
* **Optimierung:**
    * **Mobile (The Thumb Zone):** Die Slider sind gut erreichbar. Aber: Die Szenario-Buttons sind auf dem Handy sehr hoch. Ein 2x2 Grid ist okay, aber eine horizontale Scroll-Bar für Szenarien („Cards“) könnte bei mehr als 4 Optionen moderner wirken.
    * **4K-Monitore:** Hier wirkt das zentrierte Layout wie ein „schmaler Streifen“. Nutze bei Bildschirmen > 2000px ein **Bento-Grid Layout**, bei dem die Controls links und das Chart/Ergebnis rechts großflächig nebeneinander stehen.
    * **Micro-Interactions:** Apple-Design-Guidelines würden ein haptisches Feedback (oder visuelles kurzes Aufleuchten) erwarten, wenn ein Wert geändert wird.

---

## 3. Nutzerpsychologische Bewertung

1.  **Loss Aversion (Verlustaversion):** Der „Kassenbon“ triggert sofort den Schmerz über verlorenes Geld durch Steuern und Kosten. Das ist extrem effektiv, um Interesse zu wecken.
2.  **Choice Overload:** Vier Szenarien sind die Grenze. S2 („Vergünstigungen weg“) und S3 („Einkommensteuer“) klingen für Laien ähnlich bedrohlich und könnten noch klarer differenziert werden.
3.  **The „Aha!“ Moment:** Der stärkste Moment der App ist der Vergleich zwischen S0 (vor 2009, steuerfrei) und S3 (persönlicher Steuersatz). Hier wird die „Wahlurne“ zum greifbaren Werkzeug.

---

## 4. Konkrete Verbesserungsvorschläge (Backlog)

### UX & Interface
- [ ] **Dynamic Receipt:** Mache den Kassenbon dynamisch. Wenn Nutzer in der Simulation die Sparrate ändern, sollte der Kassenbon oben mitlaufen: „Deine voraussichtliche Steuerlast: X.XXX €“.
- [ ] **Slider-Input:** Intelligente Laien wollen oft exakte Zahlen tippen. Füge neben die Slider kleine Input-Felder hinzu.
- [ ] **Wording-Update:**
    - *Modus A:* „Kapitalverzehr prüfen“
    - *Modus B:* „Entnahmehöhe festlegen“

### Visuelles & Grafik
- [ ] **Chart-Interaktivität:** Nutze `fill: true` für die Flächen unter den Linien (mit geringer Opazität), um die „Masse“ des Vermögens zu visualisieren.
- [ ] **Status-Farben:** S2 und S3 sollten „Warnfarben“ (Bernstein/Rot) sein, während S1 (Status Quo) neutraler (Blau) bleibt.

### Technisches Refactoring (Tailwind-Gedanke)
- [ ] Nutze für das Grid-System `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` für die Szenarien.
- [ ] Implementiere einen „Dark Mode“ – Finanz-Apps wirken nachts in dunklen Tönen oft seriöser.

---

## 5. Code-Snippet: Responsive Grid-Optimierung
Empfehlung für eine Container-Struktur, die 4K-Monitore besser nutzt:

```html
<div class="max-w-screen-2xl mx-auto px-4 py-8">
  <div class="flex flex-col lg:flex-row gap-8">
    <aside class="lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
        </div>
      </aside>

    <main class="lg:w-2/3 space-y-6">
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 h-[500px]">
        <canvas id="er-chart"></canvas>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        </div>
    </main>
  </div>
</div>
```
## 6. Fazit für die Zielgruppe

Die App ist ein hervorragendes Werkzeug zur **finanziellen Bildung**. Um „fertig zu werden“, muss sie die Komplexität noch stärker verstecken und die Ergebnisse („Was bedeutet das für meinen Ruhestand?“) in den Vordergrund rücken.

Datei erstellt am 01.05.2026 | Kontext: ETF-Rechner v1.0