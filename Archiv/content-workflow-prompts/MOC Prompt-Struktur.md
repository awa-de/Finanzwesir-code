---
Angelegt am: 24.11.2025 20:01:56
zuletzt verändert am: 2025-11-25T13:44:49+01:00
---
---
up:: [[Finanzwesir Vermächtnis MOC]]

PROJECT_CORE.md (Master)
├── Definiert: CI, Tonalität, Zielgruppe, Qualität
│
├─> CONTENT_GUIDE.md verweist auf PROJECT_CORE für:
│   - Tonalität bei Seitenbeschreibungen
│   - Formatierung-Standards
│   - CTA-Formulierungen
│
├─> OUTPUT_SPECS.md verweist auf PROJECT_CORE für:
│   - Farbpalette (Tailwind CSS Variables)
│   - Typografie (Google Fonts Links)
│   - 80/20-Regel für Infografiken
│
└─> SOURCES.md steht allein
    (wird nur bei Seite 9 + Tools-Seite referenziert)

**Regel:** Jede Datei beginnt mit **"Siehe PROJECT_CORE.md für [X]"**, wo relevant.

# Finanzwesir Legacy – Dateien-Übersicht

**Version:** 3.0  
**Datum:** 24.11.2025  
**Zweck:** Dokumentation des 4-Dateien-Systems

---

## 📋 Dateien-Übersicht

| # | Dateiname | Größe | Hauptaufgabe | Verweist auf |
|---|-----------|-------|--------------|--------------|
| 1 | **PROJECT_CORE.md** | ~3.000 Wörter | **Single Source of Truth** für CI, Tonalität, Qualität | — |
| 2 | **CONTENT_GUIDE.md** | ~2.500 Wörter | Navigationskarte für alle 15 Seiten + Content-Strategie | PROJECT_CORE.md |
| 3 | **OUTPUT_SPECS.md** | ~2.000 Wörter | Technische Umsetzung für HTML, Infografiken, PDFs | PROJECT_CORE.md |
| 4 | **SOURCES.md** | ~1.500 Wörter | Quellenverzeichnis (Studien, Bücher, Tools) | — |

**Total:** 4 Dateien, ~9.000 Wörter (-40% vs. altes 6-Dateien-System)

---

## 📄 Datei 1: PROJECT_CORE.md

### Aufgabe
**Master-Referenz für ALLES, was Aussehen und Tonalität betrifft**

### Inhalt
- Vision & Mission (Finanzwesir-Vermächtnis)
- Zielgruppe (Notwehr, Mary-Poppins-Prinzip, Darmspiegelung-Metapher)
- **Corporate Identity:**
  - Farbpalette (Petrol, Purpur, Gelb, Blau + CSS Variables)
  - Typografie (Archivo Black, Source Sans Pro, Größenskala)
  - 80/20-Regel für Infografiken
- **Tonalität & Voice:**
  - Sie-Form durchgängig
  - Mary-Poppins-Prinzip
  - Tonalität-Matrix
  - Verbotene/Empfohlene Formulierungen
- 7 Kern-Botschaften
- Qualitätskriterien (Checkliste)
- Disclaimer-Standard
- Über den Finanzwesir

### Wann verwenden?
**Immer, wenn:**
- CI/Design-Fragen auftauchen
- Tonalität/Formulierungen geprüft werden
- Neue Seiten/Infografiken erstellt werden
- Qualität geprüft wird

### Wartung
**Selten** (nur bei Rebranding oder grundlegenden Änderungen)

---

## 📄 Datei 2: CONTENT_GUIDE.md

### Aufgabe
**Navigationskarte für alle 15 Seiten + Content-Planung**

### Inhalt
- Site-Struktur (9 Haupt + 6 Meta-Seiten)
- **Content Matrix:**
  - Jede Seite: URL, Status, Abhängigkeiten, Kerninhalt, Infografiken, CTA
  - Tabellenformat für Übersicht
- User Journey (Navigations-Flow)
- Interne Verlinkungsstrategie
- Formatierung-Standards:
  - Überschriften (H1/H2/H3-Hierarchie)
  - Listen, Zitate, Hervorhebungen
  - Zahlen & Daten (7,5%, 50.000€, 2008–2024)
  - Links (intern/extern)
- Content-Checkliste

### Wann verwenden?
**Immer, wenn:**
- Neue Seiten geplant werden
- Content geschrieben wird
- Verlinkungen geprüft werden
- Seitenabhängigkeiten geklärt werden

### Wartung
**Mittel** (bei neuen Seiten oder Umstrukturierung)

---

## 📄 Datei 3: OUTPUT_SPECS.md

### Aufgabe
**Technische Umsetzung für HTML, Infografiken, PDFs**

### Inhalt
- **Technologie-Stack:**
  - Vanilla JavaScript (ES6+)
  - Tailwind CSS (lokal embedded)
  - Chart.js, Heroicons
- **HTML-Standards:**
  - Basis-Template
  - Responsive Breakpoints (Mobile-first)
  - Accessibility (WCAG 2.1 AA)
- **Infografik-Master-Prompt:**
  - A4-Factsheet-Format
  - 80/20-Struktur
  - Tailwind-Code-Output
  - Floating Action Toolbar (JPG/PDF-Export)
- **5 Infografik-Typen:**
  - Rechner, Tabellen, Flowcharts, Simulatoren, Diagramme
- Performance-Requirements
- Testing-Checkliste

### Wann verwenden?
**Immer, wenn:**
- HTML/CSS/JS generiert wird
- Infografiken erstellt werden
- Technische Spezifikationen benötigt werden
- Performance geprüft wird

### Wartung
**Selten** (nur bei Tech-Stack-Änderungen)

---

## 📄 Datei 4: SOURCES.md

### Aufgabe
**Zentrale Quellensammlung für alle Seiten**

### Inhalt
- **12 Wissenschaftliche Studien:**
  - Gabaix & Koijen, Ben-David, Israeli, etc.
  - Passive Investing, ETFs, Markt-Effizienz
- **6 Bücher:**
  - Bernstein, Bogle, Malkiel, Graham, Taleb, Kahneman
- **4 Blogs & Newsletter:**
  - Capital Gains, AQR, Bouchaud, Michael Green
- **3 Medien & Interviews:**
  - Buffett, Munger, Bloomberg
- **8 Tools & Ressourcen:**
  - JustETF, ExtraETF, Morningstar X-Ray, Portfolio Performance
- **4 Datenquellen:**
  - S&P Global, MSCI, FTSE Russell, Morningstar Direct
- Download-Angebot (ZIP mit Papers)

### Wann verwenden?
**Immer, wenn:**
- Seite 9 (ETF-Ära) bearbeitet wird
- Seite 14 (Tools & Links) aktualisiert wird
- Zitate/Quellen benötigt werden
- Neue Studien hinzugefügt werden

### Wartung
**Häufig** (neue Studien, Tools, Updates)

---

## 🔗 Verweisstruktur

```
PROJECT_CORE.md (Master)
├── Definiert: CI, Tonalität, Zielgruppe, Qualität
│
├─> CONTENT_GUIDE.md
│   "Siehe PROJECT_CORE.md für CI, Tonalität, Qualitätskriterien"
│
├─> OUTPUT_SPECS.md
│   "Siehe PROJECT_CORE.md für CI-Farben, Typografie, 80/20-Regel"
│
└─> SOURCES.md
    (steht allein, wird nur bei Seite 9 + Tools-Seite referenziert)
```

---

## 📊 Vergleich: Alt vs. Neu

| Aspekt | Altes System (6 Dateien) | Neues System (4 Dateien) |
|--------|--------------------------|--------------------------|
| **Anzahl Dateien** | 6 | 4 (-33%) |
| **Kontext-Größe** | ~15.000 Wörter | ~9.000 Wörter (-40%) |
| **Redundanz** | CI in 3 Dateien | CI nur in 1 Datei |
| **Hierarchie** | Unklar | Klar: PROJECT_CORE = Master |
| **Maintenance** | Änderung = 3+ Dateien | Änderung = 1 Datei |
| **LLM-Performance** | Sucht in 6 Dateien | Sucht in 4 Dateien |

---

## ✅ Vorteile des neuen Systems

1. **Single Source of Truth** → PROJECT_CORE definiert CI/Tonalität zentral
2. **Keine Redundanz** → Farbpalette nur einmal
3. **Klare Verantwortlichkeiten** → Jede Datei hat einen klaren Zweck
4. **Einfache Wartung** → Änderung an CI = nur 1 Datei
5. **Bessere LLM-Performance** → 40% weniger Kontext
6. **Modularer Aufbau** → Content, Design, Technik, Quellen getrennt

---

## 🚀 Workflow-Beispiele

### **Neuen Content erstellen (z.B. Seite 1: Der Weg)**
1. Öffne **CONTENT_GUIDE.md** → Lies Seite 1 (URL, Abhängigkeiten, Infografiken)
2. Öffne **PROJECT_CORE.md** → Prüfe Tonalität, Kern-Botschaften, Qualitätskriterien
3. Schreibe Content
4. Prüfe Checkliste in **PROJECT_CORE.md**

### **Infografik erstellen (z.B. Risiko-Rechner)**
1. Öffne **OUTPUT_SPECS.md** → Lies Infografik-Master-Prompt + Typ "Rechner"
2. Öffne **PROJECT_CORE.md** → Hole Farbpalette (Petrol, Purpur, Gelb)
3. Generiere HTML mit Tailwind
4. Teste gegen Checkliste in **OUTPUT_SPECS.md**

### **CI ändern (z.B. neue Akzentfarbe)**
1. Öffne **PROJECT_CORE.md**
2. Ändere Farbpalette-Sektion
3. Fertig! (CONTENT_GUIDE.md + OUTPUT_SPECS.md verweisen darauf)

### **Neue Studie hinzufügen**
1. Öffne **SOURCES.md**
2. Füge Studie ein (Autor, Titel, URL, Kernaussage)
3. Aktualisiere Verwendungs-Sektion (z.B. Seite 9)
