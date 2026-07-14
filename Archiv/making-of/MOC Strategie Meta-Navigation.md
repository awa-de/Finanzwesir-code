---
Angelegt am: 25.11.2025 17:06:04
zuletzt verändert am: 2025-11-25T17:06:09+01:00
---
---
up:: 
# Navigations-Strategie: Meta-Seiten

**Für:** Finanzwesir Legacy  
**Version:** 1.0  
**Datum:** 25.11.2025  
**Zweck:** Entscheidungsdokumentation für die Platzierung der 4 Meta-Seiten

---

## 🎯 ENTSCHEIDUNG (Ergebnis)

### Die Lösung

**Homepage-Kachel:**
- "Neu hier?" als prominente Orientierungs-Kachel auf der Startseite
- Enthält 3 Einstiegspfade + Links zu den anderen Meta-Seiten

**Footer:**
- Alle 4 Meta-Seiten verlinkt
- Backup-Navigation für User, die Homepage nicht sehen

**Primäre Navigation:**
- Bleibt unverändert: 9 Hauptseiten (Der Weg → ETF-Ära)
- Meta-Seiten werden NICHT in Hauptnavigation aufgenommen

---

### Die 4 Meta-Seiten

| Seite | Platzierung | Priorität |
|-------|-------------|-----------|
| **Neu hier?** | Homepage-Kachel (prominent) + Footer | Hoch |
| **Manifest** | Footer + Link in Homepage-Kachel | Mittel |
| **Über mich** | Footer + Link in Homepage-Kachel | Mittel |
| **Ich bin bullish** | Footer + Link in Homepage-Kachel | Niedrig |

---

### Konkrete Umsetzung

**Homepage-Kachel (HTML-Struktur):**
```html
<section class="meta-hub" style="background: #D3E6E6; padding: 30px; border-radius: 8px; margin: 40px 0;">
  <h2 style="color: #218380; font-family: 'Archivo Black', sans-serif;">Neu hier?</h2>
  <p>Finden Sie Ihren Einstieg:</p>
  <ul style="list-style: none; padding: 0;">
    <li>→ <a href="/der-weg" style="color: #218380;">Ich habe schon Ahnung</a></li>
    <li>→ <a href="/manifest" style="color: #218380;">Ich habe keine Ahnung – was soll der Quatsch?</a></li>
    <li>→ <a href="/kochrezept" style="color: #218380;">Schnellstart – zeig mir das Rezept</a></li>
  </ul>
  <p style="font-size: 14px; margin-top: 20px; color: #4C4C4C;">
    <a href="/ueber-mich" style="color: #218380;">Über mich</a> | 
    <a href="/ich-bin-bullish" style="color: #218380;">Ich bin bullish</a>
  </p>
</section>
```

**Footer (erweitert):**
```html
<footer style="text-align: center; padding: 20px; border-top: 1px solid #E7ECEF; margin-top: 40px;">
  <!-- Legal (Pflicht) -->
  <p style="font-size: 14px; color: #4C4C4C;">
    <a href="/impressum" style="color: #218380;">Impressum & Kontakt</a> | 
    <a href="/datenschutz" style="color: #218380;">Datenschutz</a>
  </p>
  <!-- Meta (Navigation) -->
  <p style="font-size: 13px; color: #777; margin-top: 10px;">
    <a href="/neu-hier" style="color: #4D9C99;">Neu hier?</a> | 
    <a href="/manifest" style="color: #4D9C99;">Manifest</a> | 
    <a href="/ueber-mich" style="color: #4D9C99;">Über mich</a> | 
    <a href="/ich-bin-bullish" style="color: #4D9C99;">Ich bin bullish</a>
  </p>
  <!-- Tracking-Hinweis -->
  <p style="font-size: 12px; color: #999; margin-top: 10px;">
    Diese Seite nutzt <a href="/datenschutz" style="color: #4D9C99;">Clicky (anonymisiert) und VG Wort</a>.
  </p>
</footer>
```

---

## 📐 BEGRÜNDUNG (Warum diese Lösung?)

### Problem

Die Website hat 4 Meta-Seiten (Manifest, Über mich, Neu hier?, Ich bin bullish), die integriert werden müssen. Die Frage war: **Wo platzieren?**

Optionen waren:
1. Einzelne Menüpunkte in Hauptnavigation
2. Untermenü "Mehr"
3. Sidebar
4. Homepage-Kachel
5. Nur Footer

### Analyse-Methoden

**1. Occam's Razor (Einfachheit)**
- Simpelste Lösung bevorzugen
- Keine unnötige Komplexität hinzufügen

**2. Via Negativa (Vermeidung)**
- Was sollte man NICHT tun?
- Fokus auf Vermeidung von Fehlern

**3. Inversion (Munger)**
- Was führt zum Scheitern?
- Rückwärts denken

### Warum NICHT die anderen Optionen?

**Option 1: Einzelne Menüpunkte**
- ❌ 13 Items statt 9 = Cognitive Overload
- ❌ Verwässert Hauptinhalte
- ❌ Mobile-Katastrophe (zu viele Items)

**Option 2: Untermenü "Mehr"**
- ❌ Versteckt "Neu hier?" (kritisch für Orientierung)
- ❌ Extraklick nötig
- 🟡 Wäre akzeptabel, aber nicht optimal

**Option 3: Sidebar**
- ❌ 60-70% mobile Traffic = Sidebar nicht darstellbar
- ❌ Content-Breite reduziert um 30%
- ❌ Wartungsaufwendig
- ❌ KATASTROPHE für mobile Nutzung

### Warum DIESE Lösung?

**Homepage-Kachel für "Neu hier?":**
- ✅ Prominente Platzierung = User finden Einstieg
- ✅ Verhindert hohe Bounce-Rate
- ✅ Mobile-optimiert (keine Sidebar nötig)
- ✅ Standard-Pattern (User erwarten Orientierung auf Homepage)

**Footer für alle 4:**
- ✅ Standard-Pattern für Meta-Links
- ✅ Backup-Navigation (wenn User nicht über Homepage kommt)
- ✅ Kein Clutter in Hauptnavigation
- ✅ Mobile-freundlich (Footer = immer erreichbar)

**9 Hauptseiten unverändert:**
- ✅ Klare Hierarchie: Haupt > Meta > Legal
- ✅ Keine Verwässerung des Kernangebots
- ✅ Cognitive Load bleibt niedrig

---

## 📊 ÜBERSICHT (Zusammenfassung)

### Was passiert wo?

```
┌─────────────────────────────────────┐
│         HOMEPAGE                    │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  NEU HIER? (Kachel)           │ │
│  │  → Habe Ahnung: Der Weg       │ │
│  │  → Keine Ahnung: Manifest     │ │
│  │  → Schnellstart: Kochrezept   │ │
│  │  [Über mich | Ich bin bullish]│ │
│  └───────────────────────────────┘ │
│                                     │
│  [Content...]                       │
│                                     │
└─────────────────────────────────────┘

PRIMÄRE NAVIGATION (alle Seiten):
┌──────────────────────────────────────┐
│ Der Weg | Weltportfolio | ... (9)    │  ← Unverändert
└──────────────────────────────────────┘

FOOTER (alle Seiten):
┌──────────────────────────────────────┐
│ Impressum & Kontakt | Datenschutz    │  ← Legal
│ ───────────────────────────────────  │
│ Neu hier | Manifest | Über mich | Bullish │  ← Meta (NEU)
│ ───────────────────────────────────  │
│ Clicky (anonymisiert) + VG Wort      │  ← Tracking-Hinweis
└──────────────────────────────────────┘
```

---

### Prioritäten

| Priorität | Elemente | Platzierung |
|-----------|----------|-------------|
| **1 (Höchste)** | 9 Hauptseiten | Primäre Navigation |
| **2 (Mittel)** | "Neu hier?" | Homepage-Kachel + Footer |
| **3 (Niedrig)** | Manifest, Über mich, Bullish | Footer + Links in Kachel |
| **4 (Pflicht)** | Impressum, Datenschutz | Footer (1. Zeile) |

---

### Mobile-Verhalten

**Homepage:**
- Kachel "Neu hier?" ist voll sichtbar
- Touch-friendly (große Tap-Targets)
- Keine Sidebar

**Footer:**
- 3 Zeilen (Legal, Meta, Tracking)
- Alle Links erreichbar durch Scrollen
- Standard-Pattern

**Navigation:**
- Hamburger-Menü (wenn > 7 Items)
- 9 Hauptseiten = am Limit, aber OK

---

## 🔧 IMPLEMENTIERUNG (Was tun?)

### Schritt 1: Footer aktualisieren
- Ghost Admin → Settings → Code injection → Site Footer
- Alten Footer-Code durch neuen Code ersetzen (siehe oben)
- Save

### Schritt 2: Homepage-Kachel erstellen
- Ghost Admin → Pages → Homepage bearbeiten
- Kachel-HTML einfügen (siehe oben)
- Position: Nach Hero, vor Content
- Publish

### Schritt 3: Meta-Seiten erstellen (später)
- 4 Ghost-Pages erstellen:
  - `/neu-hier` (Neu hier?)
  - `/manifest` (Manifest)
  - `/ueber-mich` (Über mich)
  - `/ich-bin-bullish` (Ich bin bullish)
- Vorerst: Platzhalter-Text
- Später: Mit Inhalt füllen

### Schritt 4: Testen
- [ ] Footer-Links funktionieren?
- [ ] Homepage-Kachel sichtbar?
- [ ] Mobile: Kachel + Footer OK?
- [ ] Keine 404-Fehler?

---

## 📋 CHECKLISTE

### Was WIR tun:
- [x] Homepage-Kachel: "Neu hier?" prominent
- [x] Footer: Alle 4 Meta-Seiten verlinkt
- [x] Primäre Navigation: Unverändert (9 Seiten)
- [x] Mobile-optimiert: Keine Sidebar

### Was WIR NICHT tun:
- [ ] ~~Einzelne Menüpunkte für Meta-Seiten~~
- [ ] ~~Sidebar~~
- [ ] ~~Untermenü "Mehr" mit verstecktem "Neu hier?"~~
- [ ] ~~13-Item-Navigation~~

---

## 🎯 ERFOLGSKRITERIEN

**Die Strategie ist erfolgreich, wenn:**

1. **Neue User finden Einstieg:** "Neu hier?"-Kachel wird gesehen und geklickt
2. **Hauptnavigation bleibt klar:** User wissen, was die 9 Hauptseiten sind
3. **Mobile funktioniert:** Kein Sidebar-Chaos, Footer erreichbar
4. **Wartung einfach:** Nur Footer-Code und Homepage-Kachel ändern

---

**Ende Strategie-Dokument**  
**Version:** 1.0  
**Stand:** 25.11.2025