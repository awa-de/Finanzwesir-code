# OUTPUT_SPECS.md – Finanzwesir Legacy

**Version:** 3.0  
**Letztes Update:** 24.11.2025  
**Zweck:** Technische Umsetzung für HTML, Infografiken, PDFs

**Siehe PROJECT_CORE.md für:** CI-Farben, Typografie, 80/20-Regel

---

## 🛠️ Technologie-Stack

**Framework:** Vanilla JavaScript (ES6+)  
**CSS:** Tailwind CSS (lokal embedded via CDN oder statisch)  
**Charts:** Chart.js 4.x (lokal)  
**Icons:** Heroicons (inline SVG)  
**Animationen:** CSS transitions (max. 300ms, `ease-in-out`)

**Keine Frameworks:**  
❌ React, Vue, Svelte  
❌ jQuery  
❌ Bootstrap

**Warum Vanilla JS?**
- Keine Build-Tools nötig
- Zukunftssicher (kein Framework-Churn)
- Performance (kein Overhead)
- Legacy-tauglich (in 10 Jahren noch funktionsfähig)

---

## 📐 HTML-Standards

### Basis-Template

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seitentitel – Finanzwesir</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom Styles (CI-Farben) -->
    <style>
        :root {
            --color-petrol: #218380;
            --color-petrol-80: #4D9C99;
            --color-petrol-50: #90C1BF;
            --color-petrol-20: #D3E6E6;
            --color-blau: #0071BF;
            --color-purpur: #8D0267;
            --color-purpur-80: #C57EB2;
            --color-gelb: #DFC805;
            --color-gelb-80: #F9EF9E;
            --color-text: #272727;
            --color-dark: #4C4C4C;
            --color-light: #E7ECEF;
            --color-bg: #FFFFFF;
        }
        
        body {
            font-family: 'Source Sans Pro', sans-serif;
            color: var(--color-text);
            background: var(--color-bg);
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Archivo Black', sans-serif;
            letter-spacing: -0.02em;
        }
    </style>
</head>
<body class="antialiased">
    
    <!-- Content hier -->
    
    <script>
        // JavaScript hier
    </script>
</body>
</html>
```

---

### Responsive Breakpoints

**Mobile-First-Ansatz:**

```css
/* Mobile: Default (< 640px) - 50% Traffic */

/* Tablet: 640px - 1024px */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }

/* Desktop: > 1024px */
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

**Tailwind-Klassen:**
```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Mobile: 100%, Tablet: 50%, Desktop: 33% -->
</div>
```

---

### Accessibility (WCAG 2.1 AA)

**Keyboard-Navigation:**
```javascript
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    button.click();
  }
});
```

**ARIA-Labels:**
```html
<div role="region" aria-label="Risiko-Rechner">
  <label for="capital">Vermögen in Euro</label>
  <input 
    type="range" 
    id="capital" 
    aria-valuemin="10000" 
    aria-valuemax="500000"
    aria-valuenow="50000"
  >
</div>
```

**Farbkontrast:**
- Text: Min. 4.5:1 (WCAG AA)
- UI-Komponenten: Min. 3:1
- Nicht nur Farbe zur Informationsvermittlung

---

## 🎨 Infografik-Master-Prompt

### Zielsetzung

Erstelle aus Strategietext eine **professionelle, CI-konforme Infografik** im Stil eines **A4-Factsheets**.  
Sie soll **gedruckt** werden können (Hochformat bevorzugt, Querformat erlaubt).  
Design: **seriös, klar, vertrauenswürdig**, aber **nicht steril** – moderne Dynamik durch gezielte Farbakzente.

---

### Corporate Design (nicht verhandelbar)

**Siehe PROJECT_CORE.md für:** Vollständige Farbpalette und Typografie

**Verwendungsmuster:**
- **Petrol** → Haupttext, Überschriften, Datenkacheln, Diagramme
- **Blau** → Links / interaktive Elemente
- **Purpur** → Innovation, Zukunft, Technologie, Fokus
- **Gelb** → Highlights, ökonomische Kennzahlen
- **Grautöne** → Sekundärinfos, Kontrast, Hintergrund

**Regel:** Maximal **3 Farben gleichzeitig aktiv**

---

### 80/20-Struktur

**Siehe PROJECT_CORE.md für:** Vollständige 80/20-Regel

**Fixe Kernmodule (80%, immer vorhanden):**
1. Hero / Titelbereich
2. Strategischer Kern / Essenz
3. Mechanismus / Funktionsweise
4. Kernmetriken / KPIs
5. Risikofaktoren / Schutzmechanismen
6. Ausblick / Roadmap / Potenzial

**Variable Zusatzmodule (20%, nach Bedarf):**
- Governance / Tokenomics
- Ökosystem / Partner
- Nutzersegment / Use-Case
- Innovation / Besonderheit

---

### Layout- und Designprinzipien

- Nutze **klare Raster**, **großzügigen Weißraum**, **optische Hierarchie**
- Keine 3D-Effekte, kein visuelles Rauschen
- Fokus auf Lesbarkeit und Komposition
- Verwende Icons, Diagramme, Piktogramme – flach, stilistisch konsistent
- Jede Infografik vermittelt: **"seriöse Innovation im Finanzbereich"**
- Keine rein textlastigen Flächen – **Text wird in visuelle Einheiten überführt**

---

### Technische Output-Vorgabe

**Output-Format:**  
Reiner HTML-Code mit **Tailwind CSS**

**Tailwind-Version:**  
Statische Version via CDN: `<script src="https://cdn.tailwindcss.com"></script>`  
Alternativ: v2.2.19 via unpkg (falls CDN-Version nicht funktioniert)

**Layoutgröße:**  
Druckfähiges A4-Layout (Hochformat bevorzugt, Querformat erlaubt)

**Struktur:**
- Semantische Tags (`<section>`, `<header>`, `<article>`, `<footer>`)
- Tailwind-Utility-Klassen für Abstände, Farben, Schriftgrößen, Grid/Flex
- Keine Inline-Styles oder externen Stylesheets
- Responsive Breakpoints (`md:`, `lg:`) wo sinnvoll

**Output:**  
Vollständiges HTML-Dokument mit `<html>`, `<head>`, `<body>`.  
Keine Kommentare oder Erklärungen.

---

### Floating Action Toolbar (JPG/PDF-Export)

Füge jeweils zwei Buttons via Floating Action Toolbar (unten rechts) hinzu:

**1. JPG-Export:**  
Bibliothek: `html2canvas`  
Funktion: "Fotografiert" das DOM-Element und wandelt es in herunterladbares Bild um

```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script>
function downloadAsJPG() {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = 'factsheet.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
  });
}
</script>
```

**2. PDF-Export:**  
Funktion: `window.print()` (professionell, Text als Vektor, markierbar)

```html
<script>
function downloadAsPDF() {
  window.print();
}
</script>
```

**Button-Markup:**

```html
<div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
  <button 
    onclick="downloadAsJPG()" 
    class="bg-petrol hover:bg-petrol-80 text-white p-4 rounded-full shadow-lg transition"
    title="Als JPG speichern"
  >
    📷 JPG
  </button>
  <button 
    onclick="downloadAsPDF()" 
    class="bg-purpur hover:bg-purpur-80 text-white p-4 rounded-full shadow-lg transition"
    title="Als PDF drucken"
  >
    📄 PDF
  </button>
</div>

<style>
@media print {
  .fixed { display: none; } /* Buttons im PDF ausblenden */
}
</style>
```

---

## 🧩 Infografik-Typen

### Typ 1: Rechner (Input → Output)

**Use Cases:** Risiko-Rechner, Laufzeit-Rechner, Geldmarkt-Vergleich

**Struktur:**
```html
<div class="calculator max-w-2xl mx-auto p-8">
  <div class="mb-6">
    <label class="block text-sm font-semibold mb-2">Vermögen (€)</label>
    <input 
      type="range" 
      id="capital" 
      min="10000" 
      max="500000" 
      step="1000"
      class="w-full"
    >
    <output id="capital-value" class="block text-center text-2xl font-bold mt-2">50.000€</output>
  </div>
  
  <div class="bg-petrol-20 p-6 rounded-lg">
    <h3 class="text-xl font-bold mb-2">Möglicher Verlust (-30%)</h3>
    <p id="loss-value" class="text-4xl font-bold text-purpur">15.000€</p>
  </div>
</div>

<script>
const capitalInput = document.getElementById('capital');
const capitalValue = document.getElementById('capital-value');
const lossValue = document.getElementById('loss-value');

capitalInput.addEventListener('input', (e) => {
  const capital = parseInt(e.target.value);
  capitalValue.textContent = capital.toLocaleString('de-DE') + '€';
  lossValue.textContent = (capital * 0.3).toLocaleString('de-DE') + '€';
});
</script>
```

---

### Typ 2: Vergleichstabellen

**Use Cases:** Broker-Vergleich, ETF-Finder

**Struktur:**
```html
<div class="overflow-x-auto">
  <table class="min-w-full bg-white border border-light">
    <thead class="bg-petrol text-white">
      <tr>
        <th class="px-6 py-3 text-left">Broker</th>
        <th class="px-6 py-3 text-left cursor-pointer" onclick="sortTable(1)">
          Kosten ↕
        </th>
        <th class="px-6 py-3 text-left">Sparplan</th>
      </tr>
    </thead>
    <tbody id="table-body">
      <!-- Dynamisch befüllt -->
    </tbody>
  </table>
</div>
```

**Mobile: Card-Layout statt Tabelle:**
```html
<div class="md:hidden space-y-4">
  <div class="bg-white border border-light rounded-lg p-4">
    <h3 class="font-bold text-lg">Trade Republic</h3>
    <p class="text-sm text-gray-600">Kosten: 1€</p>
    <p class="text-sm text-gray-600">Sparplan: Ab 25€</p>
  </div>
</div>
```

---

### Typ 3: Flowcharts

**Use Cases:** ETF-Entscheidungsbaum, Volatilitäts-Verstärker

**Struktur:**
```html
<div class="flowchart max-w-4xl mx-auto">
  <div class="node bg-petrol text-white p-6 rounded-lg text-center">
    Welcher Index?
  </div>
  
  <div class="arrow h-12 w-1 bg-petrol mx-auto my-4 relative">
    <div class="arrow-head"></div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="node bg-light p-4 rounded-lg text-center">MSCI World</div>
    <div class="node bg-light p-4 rounded-lg text-center">MSCI ACWI</div>
    <div class="node bg-light p-4 rounded-lg text-center">FTSE All World</div>
  </div>
</div>

<style>
.arrow-head {
  position: absolute;
  bottom: -8px;
  left: -4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid var(--color-petrol);
}
</style>
```

---

### Typ 4: Simulatoren

**Use Cases:** Flow-Effekt-Simulator, Kauf-Simulator

**Struktur:**
```html
<div class="simulator max-w-3xl mx-auto">
  <div class="controls mb-6 flex gap-4">
    <button id="start-sim" class="bg-petrol text-white px-6 py-3 rounded-lg">
      Simulation starten
    </button>
    <button id="reset-sim" class="bg-light px-6 py-3 rounded-lg">
      Zurücksetzen
    </button>
  </div>
  
  <div id="sim-stage" class="bg-light p-8 rounded-lg min-h-[300px]">
    <!-- Animation Container -->
  </div>
  
  <p id="step-text" class="mt-4 text-center text-lg">
    Bereit zum Start...
  </p>
</div>

<script>
const steps = [
  { text: 'Geld fließt in ETFs...', duration: 2000 },
  { text: 'Indexfonds müssen kaufen...', duration: 2000 },
  { text: 'Preise steigen (+5%)...', duration: 2000 }
];

let currentStep = 0;

document.getElementById('start-sim').addEventListener('click', () => {
  currentStep = 0;
  nextStep();
});

function nextStep() {
  if (currentStep >= steps.length) return;
  const step = steps[currentStep];
  document.getElementById('step-text').textContent = step.text;
  setTimeout(() => {
    currentStep++;
    nextStep();
  }, step.duration);
}
</script>
```

---

### Typ 5: Diagramme (Chart.js)

**Use Cases:** Passiv vs. Aktiv Timeline, Mega-Cap-Konzentration

**Chart.js-Setup:**
```html
<canvas id="myChart" width="400" height="200"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1990', '2000', '2010', '2020', '2023'],
    datasets: [{
      label: 'Passive Anleger (%)',
      data: [5, 12, 28, 45, 53],
      borderColor: '#218380', // Petrol
      backgroundColor: 'rgba(33, 131, 128, 0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  }
});
</script>
```

---

## ⚡ Performance-Requirements

**Ladezeit:** <500ms  
**Dateigröße:** <50 KB pro Infografik (inkl. CSS/JS)  
**Lazy-Loading:** Für Infografiken below-the-fold

**Lazy-Loading-Pattern:**
```html
<div class="infographic" data-src="etf-finder.html" loading="lazy">
  <div class="skeleton-loader">Lädt...</div>
</div>

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const iframe = document.createElement('iframe');
      iframe.src = entry.target.dataset.src;
      entry.target.appendChild(iframe);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-src]').forEach(el => observer.observe(el));
</script>
```

---

## 🧪 Testing-Checkliste

### Funktionalität
- [ ] Alle Buttons funktionieren
- [ ] Slider aktualisieren Output live
- [ ] Berechnungen sind korrekt
- [ ] Reset-Button funktioniert
- [ ] JPG/PDF-Export funktioniert

### Responsive
- [ ] Mobile Safari (iOS 15+)
- [ ] Chrome Mobile (Android)
- [ ] Chrome Desktop
- [ ] Firefox Desktop

### Accessibility
- [ ] Keyboard-Navigation (Tab, Enter, Space)
- [ ] Screen-Reader (NVDA/VoiceOver)
- [ ] Farbkontrast geprüft (4.5:1 / 3:1)
- [ ] ARIA-Labels vorhanden

### Performance
- [ ] Ladezeit <500ms
- [ ] Dateigröße <50 KB
- [ ] Keine Console-Errors
- [ ] Lazy-Loading funktioniert

---

**Ende OUTPUT_SPECS.md**