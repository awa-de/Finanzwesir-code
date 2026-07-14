# PROJECT_CORE.md – Finanzwesir Legacy

**Version:** 3.2  
**Letztes Update:** 27.11.2025, 19:45 CET  
**Status:** Single Source of Truth für CI, Tonalität, Qualität

---

## 🎯 Vision & Mission

### Kernaussage
**"Fertig werden mit ETFs. Dann wieder dem Leben widmen."**

### Was diese Site ist
- Die Essenz aus 10 Jahren Finanzwesir-Arbeit
- Ein Vermächtnis – dann geht der Finanzwesir in Rente
- Der kürzeste Weg vom Noob zum fertigen ETF-Portfolio
- Zeitlos, pflegeleicht, für die nächsten 10+ Jahre relevant

### Was diese Site NICHT ist
- Kein Finanzblog mit täglichen Updates
- Keine Community mit Kommentaren
- Kein Kursverkauf oder Membership
- Keine individuelle Anlageberatung

---

## 👥 Zielgruppe

### Wer sind unsere Leser?

Menschen, die private Altersvorsorge ernst nehmen – aber nicht aus Spaß, sondern aus **Notwehr**.

**Sie müssen, weil:**
- Die gesetzliche Rente nicht reicht
- Private Vorsorge Pflicht für finanzielle Unabhängigkeit ist
- Sie verantwortungsbewusst für ihre Zukunft planen wollen

**Mit welcher Begeisterung?**  
Etwa so wie bei einer Darmspiegelung: Notwendig, wichtig, aber kein Vergnügen.

**Persona:**  
"Der Noob, der in 90 Minuten sein Portfolio aufbauen und dann nie wieder über Finanzen nachdenken will."

---

## 🎨 Corporate Identity (CI)

### Farbpalette

**Basisfarben:**

| Farbe | Hex | RGB | Verwendung |
|-------|-----|-----|------------|
| Blau | `#0071BF` | — | Sekundäre Highlights, Akzente |
| Petrol | `#218380` | 33, 131, 128 | **Primärfarbe** für Buttons, UI, Links |
| Petrol 80% | `#4D9C99` | — | Hover-States |
| Petrol 50% | `#90C1BF` | — | Hintergründe, Neutral |
| Petrol 20% | `#D3E6E6` | — | Sehr helle Flächen |

**Akzentfarben:**

| Farbe | Hex | RGB | Verwendung |
|-------|-----|-----|------------|
| Purpur | `#8D0267` | 141, 2, 103 | CTAs, Warnungen, Innovation |
| Purpur 80% | `#C57EB2` | — | Abgeschwächte Akzente |
| Gelb | `#DFC805` | 223, 200, 5 | **Highlights, ökonomische Kennzahlen, Timeline-Orientierung** |
| Gelb 80% | `#F9EF9E` | — | Sanfte Hervorhebungen |

**Neutrale Farben:**

| Farbe | Hex | Verwendung |
|-------|-----|------------|
| Text | `#272727` | Alle Fließtexte |
| Dark | `#4C4C4C` | Flächen, Linien dunkel |
| Light | `#E7ECEF` | Flächen, Linien hell |
| Background | `#FFFFFF` | Hintergrund |

**CSS Variables:**

```css
:root {
  /* Basisfarben */
  --color-blau: #0071BF;
  --color-petrol: #218380;
  --color-petrol-80: #4D9C99;
  --color-petrol-50: #90C1BF;
  --color-petrol-20: #D3E6E6;
  
  /* Akzentfarben */
  --color-purpur: #8D0267;
  --color-purpur-80: #C57EB2;
  --color-gelb: #DFC805;
  --color-gelb-80: #F9EF9E;
  
  /* Neutrale Farben */
  --color-text: #272727;
  --color-dark: #4C4C4C;
  --color-light: #E7ECEF;
  --color-bg: #FFFFFF;
}
```

**Verwendungsmuster:**
- **Petrol** → Haupttext, Überschriften, Datenkacheln, Diagramme
- **Blau** → Links, interaktive Elemente
- **Purpur** → Innovation, Zukunft, Technologie, Fokus, CTAs
- **Gelb** → Highlights, ökonomische Kennzahlen, **Timeline-Linie + Punkte, Sektions-Überschriften**
- **Grautöne** → Sekundärinfos, Kontrast, Hintergrund

**Faustregel:** Maximal **3 Farben gleichzeitig aktiv** pro Seite/Infografik.

**Gelb-Verwendung auf der Homepage (v15):**
- Überschrift "BAUSTEINE" (#DFC805, Archivo Black)
- Vertikale Verbindungslinie (#DFC805, 3px)
- Timeline-Punkte (#DFC805, 12px Durchmesser)

---

### Typografie

**Überschriften:**  
**Archivo Black**  
URL: https://fonts.google.com/specimen/Archivo+Black  
Verwendung: H1, H2, H3, H4  
Eigenschaften: Bold, −0.02em Tracking

**Fließtext:**  
**Source Sans Pro** (nicht Source Sans oder Open Sans!)  
URL: https://fonts.google.com/specimen/Source+Sans+Pro  
Verwendung: Alle Fließtexte, Listen, Tabellen  
Gewichte: 400 (Regular), 600 (SemiBold), 700 (Bold)

**Größenskala:**

| Element | Tailwind Class | Pixel | Verwendung |
|---------|----------------|-------|-----------|
| H1 | `text-5xl md:text-7xl` | 48px / 72px | Seitentitel |
| H2 | `text-3xl md:text-5xl` | 30px / 48px | Hauptkapitel |
| H3 | `text-2xl` | 24px | Unterpunkte |
| Body | `text-lg leading-relaxed` | 18px | Fließtext |
| Label | `text-sm text-gray-600` | 14px | Sekundärinfos |

**CSS-Setup:**

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Source+Sans+Pro:wght@400;600;700&display=swap');

:root {
  --font-heading: 'Archivo Black', sans-serif;
  --font-body: 'Source Sans Pro', sans-serif;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--color-text);
  letter-spacing: -0.02em;
}

body, p, li, td {
  font-family: var(--font-body);
  color: var(--color-text);
}
```

---

### 80/20-Regel für Infografiken

**Prinzip:**  
Die Serie der Infografiken soll erkennbar zusammengehören.

- **80%:** Gemeinsame, wiederkehrende Designelemente  
  (Raster, Typo, Farbkonzept, Modulstruktur, Leselogik)
- **20%:** Individuell gestaltbare Elemente, um die jeweilige Strategie visuell zu differenzieren

**Fixe Kernmodule (immer vorhanden):**
1. Hero / Titelbereich
2. Strategischer Kern / Essenz
3. Mechanismus / Funktionsweise
4. Kernmetriken / KPIs
5. Risikofaktoren / Schutzmechanismen
6. Ausblick / Roadmap / Potenzial

**Variable Zusatzmodule (nach Bedarf):**
- Governance / Tokenomics
- Ökosystem / Partner
- Nutzersegment / Use-Case
- Innovation / Besonderheit

---

## 🗣️ Tonalität & Voice

### Ansprache

**Sie-Form** durchgängig (respektvoll, professionell, auf Augenhöhe)

**Richtig:**
✅ "Sie brauchen..."  
✅ "Ihr Portfolio..."

**Falsch:**
❌ "Du brauchst..."  
❌ "Dein Vermögen..."

**Tonfall:**  
Respektvoll, aber nicht steif. Professionell, aber nicht abgehoben.  
Wie ein guter Hausarzt: Kompetent, verständlich, auf Ihrer Seite.

---

### Das Mary-Poppins-Prinzip

> "Mit einem Löffel Zucker wird die bitt're Medizin süß..."

**Unser Trick:**  
Wir **versüßen** die schwierige und kognitiv anspruchsvolle Arbeit, sich in ETFs einzuarbeiten.

**Wie wir das tun:**

1. **Sachlich & fachlich korrekt bleiben** – Wir lügen nicht
2. **Vereinfachen wie japanische Meister** – Weglassen, bis nur das Wesentliche bleibt
3. **Strategien eindampfen** – Nur die Essenz präsentieren
4. **Bezug zur normalen Welt** – Immer mit Beispielen aus dem Alltag
5. **Fachbegriffe nur, wenn nötig** – Wenn sie ein Konzept kurz zusammenfassen

---

### Tonalität-Matrix

| Situation | Tonalität | Beispiel |
|-----------|-----------|----------|
| **Einstieg** | Einladend, respektvoll | "Willkommen! Ich zeige Ihnen den kürzesten Weg zu Ihrem Portfolio." |
| **Erklärung** | Didaktisch, geduldig | "Stellen Sie sich vor, Sie kaufen einen Korb mit 1.600 Aktien auf einmal..." |
| **Warnung** | Ernst (nicht panisch) | "Das ist wichtig: Bezahlen Sie zuerst Konsumschulden ab." |
| **Kritik** | Reflektiert, selbstkritisch | "Ich weiß, dass passive Anlage Probleme hat. Aber..." |
| **Impressum/Kontakt** | Nüchtern, rechtlich korrekt | "Alle Angaben ohne Gewähr. Keine Anlageberatung." |
| **Call-to-Action** | Motivierend, ermutigend | "Sie haben es fast geschafft. Weiter zum nächsten Schritt →" |

---

### Verbotene Formulierungen

❌ "Garantiert"  
❌ "Risikofrei"  
❌ "Schnell reich werden"  
❌ "Geheimtipp"  
❌ "Nur jetzt"  
❌ "Exklusiv"  
❌ "Ich bin kein Finanzberater, aber..." (redundant wegen Disclaimer)  
❌ "Spielend leicht" (Mary Poppins versüßt, aber verharmlost nicht)

---

### Empfohlene Formulierungen

✅ "Historisch gesehen..."  
✅ "In der Regel..."  
✅ "Das funktioniert, weil..."  
✅ "Eine bewährte Möglichkeit ist..."  
✅ "Langfristig betrachtet..."  
✅ "Nach aktueller Datenlage..."  
✅ "Basierend auf vergangenen Marktzyklen..."  
✅ "Das Wesentliche ist..."  
✅ "Vereinfacht gesagt..."  
✅ "Im Alltag bedeutet das..."

---

## 💡 Kern-Botschaften

Diese 7 Botschaften sind das ideologische Rückgrat der Site:

1. **"Bringen Sie erst Ihre Finanzen in Ordnung"**  
   Konsumschulden = Gift. Wer noch den Targobank-Kredit abzahlt (10,99%), investiert nicht.  
   Die beste Rendite: gesparte 10,99% Zinsen.

2. **"Der Index entscheidet. Der ETF ist nur der ausführende Lakei."**  
   Die Indexwahl ist wichtig. Welchen ETF auf den Index Sie nehmen: Geschmackssache.

3. **"Welchen Index Sie nehmen, ist egal."**  
   MSCI World, MSCI ACWI, FTSE All World – alle führen zum Ziel "nicht arm sterben".

4. **"Mehr ETFs ≠ mehr Diversifikation"**  
   Mehr ETFs = mehr Meinung. Das Investment-Universum bleibt konstant.

5. **"Nicht reich werden – nicht arm sterben."** (William Bernstein)  
   Das ist das realistische Ziel. Keine Yacht, aber finanziell abgesichert.

6. **"Wer in der Verlustphase aussteigt, verliert 30%. Dagegen verblassen alle anderen Anlegerfehler."** (Thorsten Hens)  
   Risikomanagement = Positionsgrößenmanagement. Durchhalten ist alles.

7. **"Warum nicht ein Bier trinken gehen?"**  
   99,999...% der Einflussgrößen liegen außerhalb Ihrer Kontrolle.  
   Gelassenheit ist die beste Anlagestrategie.

---

## 🚫 Disclaimer (Rechtliche Positionierung)

### ✅ RICHTIGE Position: Impressum & Kontakt-Seite

Der Disclaimer gehört **NICHT auf die Startseite**, sondern auf dedizierte Rechtseiten:

**Seite 11 (Meta-Navigation):** `/impressum`  
**Seite 12 (Meta-Navigation):** `/kontakt`

**Standard-Text (gilt für beide Seiten):**

> **Disclaimer:**  
> Alle erwähnten Aktien, ETFs, Fonds, Staatsanleihen oder sonstige Anlageprodukte sind mit Risiken behaftet. Alle Texte sowie Hinweise und Informationen stellen keine Anlageberatung oder Empfehlung dar. Sie wurden nach bestem Wissen und Gewissen aus öffentlich zugänglichen Quellen übernommen. Alle Informationen dienen allein der Weiterbildung. Für Vermögensaufbau und -verwaltung sollte ein Fachmann konsultiert werden. Ich übernehme keine Haftung für die Richtigkeit der Angaben.

### ❌ FALSCHE Position: Startseite/Homepage-Footer

Die Startseite bleibt **schlank und visuell ruhig**. Ein massiver rechtlicher Text würde:
- Die Benutzererfahrung unterbrechen
- Die psychologische "Leichtigkeit" von "Der Weg" zerstören
- Vertrauen durch Rechtslicht ersetzen (statt durch Kompetenz)

**Begründung (aktuelles Finanzwesir-Benchmark):**  
Die aktuelle finanzwesir.com-Site hat den Disclaimer genau dort: Impressum & Kontakt. Nicht auf der Startseite.

---

### Navigation zu Rechtseiten (Startseite-Footer)

**Schlank, unaufdringlich im Footer der Startseite:**

```html
<footer class="text-center text-sm text-gray-600">
  <p>© 2025 Finanzwesir. 
    <a href="/impressum">Impressum</a> | 
    <a href="/kontakt">Kontakt</a> | 
    <a href="/datenschutz">Datenschutz</a>
  </p>
</footer>
```

---

## ✅ Qualitätskriterien

**Jede Seite / Jede Infografik muss diese Checkpoints erfüllen:**

- [ ] **Sie-Ansprache** durchgängig (nicht Du)
- [ ] **Sätze <20 Wörter** (Durchschnitt)
- [ ] **Fachbegriffe beim ersten Mal erklärt**, dann vereinfacht
- [ ] **Mary-Poppins-Prinzip** beachtet (versüßen, nicht verharmlosen)
- [ ] **Keine verbotenen Formulierungen**
- [ ] **Zahlen formatiert:** 7,5%, 50.000€, 2008–2024, 10+ Jahre
- [ ] **Finanzwesir-Farbpalette** verwendet (Petrol, Purpur, Gelb)
- [ ] **Schriften korrekt:** Archivo Black (Überschriften), Source Sans Pro (Text)
- [ ] **Interne Links** korrekt (relative Pfade: `/der-weg`)
- [ ] **Disclaimer** auf `/impressum` und `/kontakt` (nicht auf Startseite)
- [ ] **Call-to-Action** zu logisch nächstem Schritt
- [ ] **Mobile-Test** durchgeführt
- [ ] **Rechtschreibung** geprüft (Duden)

---

## 👤 Über den Finanzwesir

- **Name:** Albert Warnecke
- **Börse seit:** ~1994
- **ETF-Anleger seit:** 2008
- **Finanzblogger seit:** 2014
- **Finanzwesir-Blog:** finanzwesir.com (wird erwähnt, aber nicht verlinkt)
- **Philosophie:** "Ich bin kein Guru. Ich bin jemand, der 10 Jahre nachgedacht hat und seine Erkenntnisse teilt."

---

## 🎯 Besonderheiten: ETF-Fokus (nicht Krypto)

**Wichtig:** Diese Site handelt von **ETFs und klassischer Altersvorsorge**, nicht von Krypto/DeFi.

**Korrekte Formulierungen:**
✅ "Wer finanziell auf eigenen Beinen stehen will, kann ETFs nicht ignorieren."  
✅ "Auch wenn es neu und mühsam ist, Finanzen zu durchdenken..."

**Falsche Formulierungen:**
❌ "Wer Krypto nicht ignorieren kann..." (falsches Thema)  
❌ "DeFi ist die Zukunft..." (falsches Thema)

---

## 📝 Änderungslog

**27.11.2025, 19:45 CET – Version 3.2**
- **KORREKTUR:** Gelb-Farbe-Integration bestätigt
  - ✅ Gelb WIRD verwendet (Überschrift "BAUSTEINE", Timeline-Linie, Timeline-Punkte)
  - ✅ Elegante, minimalistische Implementierung auf der Homepage v15
  - ✅ Ausreichend für CI-Konformität
  - Fehler: Ich hatte den visuellen Code nicht korrekt gelesen (Apologie an Gemini)

**27.11.2025, 19:40 CET – Version 3.1**
- **KORREKTUR:** Disclaimer-Position verschoben
  - ❌ NICHT auf Startseite-Footer (war Fehler, reingerutscht)
  - ✅ JA auf `/impressum` und `/kontakt` Seiten
  - Begründung: Konsistent mit aktuellem finanzwesir.com-Design
  - Grund für Fehler: KI-Halluzination während Initial-Prompting

**24.11.2025, 20:00 CET – Version 3.0**
- Konsolidierung auf 4-Dateien-System
- PROJECT_CORE als Single Source of Truth für CI/Tonalität
- Mary-Poppins-Prinzip zentral dokumentiert
- 80/20-Regel für Infografiken integriert
- Qualitätskriterien als Checkliste

---

**Ende PROJECT_CORE.md v3.2**
