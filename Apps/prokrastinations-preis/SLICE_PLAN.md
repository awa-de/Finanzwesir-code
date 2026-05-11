# SLICE_PLAN — prokrastinations-preis

Stand: 2026-05-11 | Pre-Code-Gate Full | Geändert von: Claude
Basis: APP_FACTORY_IMPLEMENTATION_RFC.md §8 + APP_SPEC.md V0.3 + SPEC_GATE_REPORT.md

---

## Status

| Feld | Wert |
|---|---|
| Gate | Pre-Code-Gate Full — keine Blocker |
| Security-Sync | synchron ✓ |
| Freigabe Slice 0 | Alberts explizites OK ausstehend |
| Nächster Schritt | Albert: OK → Slice 0 implementieren |

---

## Slice-Übersicht

| Slice | Ziel | Dateien | Status |
|---|---|---|---|
| **Slice 0** | App-Shell + Ghost-Card-Bootstrap | `app.js`, `app.css`, `app.test.html` (alle NEU) | Bereit für Alberts OK |
| Slice 1 | Hauptzahl aus Defaults | `app.js` erweitern | Offen |
| Slice 2 | Wartezeit-Slider | `app.js` erweitern | Offen |
| Slice 3 | Monatsrate + Anlagedauer | `app.js` erweitern | Offen |
| Slice 4 | AssumptionsBox | `app.js` erweitern | Offen |
| Slice 5 | Nebenwerte + Vergleichsanker | `app.js` erweitern | Offen |
| Slice 6 | Responsive + A11y-Härtung | `app.css` erweitern | Offen |
| Slice 7a | QA / Testseite vollständig | `app.test.html` vervollständigen | Offen |
| Slice 7b | Echter Ghost-Integrationstest | Ghost-Deploy | Offen — erfordert Ghost-Test |

---

## Slice 0 — App-Shell + Ghost-Card-Bootstrap

### Ziel
Beweisen: Container wird erkannt, Slug-Prüfung funktioniert, States schalten sauber.

### Nutzerwert
„Die App startet, zeigt den richtigen State, stürzt nicht ab."

### Erlaubte Dateien (exakt)

```
/Apps/prokrastinations-preis/app.js        ← NEU
/Apps/prokrastinations-preis/app.css       ← NEU
/Apps/prokrastinations-preis/app.test.html ← NEU
```

Kein anderer Pfad. Keine bestehende Datei ändern.

### app.js — Struktur

```
IIFE-Wrapper (kein globaler Namespace)
├── SLUG_WHITELIST = ['prokrastinations-preis']
├── bootstrap()
│   ├── Alle .fw-app Container finden
│   └── pro Container:
│       ├── data-fw-app lesen und validateSlug(slug) → boolean
│       └── initApp(container, slug)
│           ├── setState(container, 'loading')
│           ├── bei gültigem Slug: setState(container, 'content')
│           │   → Platzhalter-Texte via textContent (keine Berechnung)
│           └── bei fehlendem oder ungültigem Slug: setState(container, 'error')
│               → textContent: "Diese App konnte nicht geladen werden."
└── DOMContentLoaded → bootstrap()
```

Alle DOM-Ausgaben: ausschließlich `textContent` (SafeDOM, Q-01).
Kein `innerHTML` für Nutzdaten oder Fehlertexte.

### app.css — Struktur

```css
.fw-app { /* Container-Basis, Position, Min-Height */ }
.fw-app[data-fw-state="loading"] { /* LoadingSkeleton-Darstellung */ }
.fw-app[data-fw-state="error"]   { /* Error-Darstellung */ }
.fw-app[data-fw-state="content"] { /* Content-Basis */ }

/* Farben ausschließlich via CSS Custom Properties mit Fallback */
/* Beispiel: color: var(--fw-color-text, #1a1a1a) */
/* Kein Selektor außerhalb .fw-app */
/* Kein globaler Reset */
```

Hex-Werte nur als Fallback in `var(--fw-..., #fallback)` — keine eigenständigen Hex-Werte (A-17).

### app.test.html — Szenarien

```
Szenario A: Gültige Minimal-Card
  → <div class="fw-app" data-fw-app="prokrastinations-preis"></div>
  → Erwartung: Content-State mit Platzhalter sichtbar, kein leerer Container

Szenario B: Ungültiger Slug
  → <div class="fw-app" data-fw-app="ungueltig-slug"></div>
  → Erwartung: Error-State, kein Stack-Trace, kein leerer Container

Szenario C: Fehlender Slug
  → <div class="fw-app"></div>
  → Erwartung: Error-State, kein Stack-Trace, kein leerer Container

Szenario D: Mehrere Container auf einer Seite
  → Mindestens zwei gültige .fw-app Container
  → Erwartung: Beide werden initialisiert, keine doppelte Initialisierung, keine Exception

Szenario E: data-fw-options mit XSS-Testwert
  → <div class="fw-app"
         data-fw-app="prokrastinations-preis"
         data-fw-options="defaultRate:<img src=x onerror=alert(1)>">
     </div>
  → Erwartung: Wird in Slice 0 nicht fachlich verarbeitet, aber nichts wird ausgeführt,
     nichts via innerHTML ausgegeben, App bleibt stabil

Kein-Container-Fall (Codeverhalten, kein Pflichtszenario):
Wenn bootstrap() auf einer Seite ohne .fw-app Container läuft:
console.warn, keine Exception, Seite lädt normal.
```

### Was Slice 0 NICHT enthält

- Keine Berechnung (prokrastinationsPreis, endwertSofort etc.)
- Kein Config-Load (weder extern noch intern)
- Kein Slider, kein Input-Handler
- Kein innerHTML für Nutzdaten
- Kein Core-Modul / keine Extraktion
- Kein Framework (React, Vue, etc.)
- Kein Build-System (Vite, Rollup, Webpack)
- Kein Shadow DOM
- Keine Chart-Engine-Berührung
- Keine Dateien außerhalb /Apps/prokrastinations-preis/

### Akzeptanzkriterien

| ID | Kriterium |
|---|---|
| A0-1 | Minimal-Card lädt → Content-State mit Platzhalter sichtbar (kein leerer Container) |
| A0-2 | Ungültiger Slug → Error-State: „Diese App konnte nicht geladen werden." — kein Stack-Trace |
| A0-3 | Loading-State-Pfad ist implementiert. Kein künstlicher Timeout nur zur Sichtbarmachung. In Slice 0 darf der Loading-State sofort in Content/Error übergehen. |
| A0-4 | Kein `innerHTML` für Nutzdaten oder Fehlertexte — nur `textContent` |
| A0-5 | Keine JavaScript-Exception in der Browser-Konsole |
| A0-6 | Layout ohne horizontalen Overflow bei 375px, 768px, 1280px |

### Testaufruf (Albert)

`app.test.html` im VSCode Live Server öffnen.
Alle fünf Szenarien (A–E) prüfen.
DevTools: Console auf Fehler prüfen.
Viewports: 375px / 768px / 1280px.

Relevante APP_SPEC-Testfälle: T-01, T-03, T-06, T-13.

---

## Slice 1 — Hauptzahl aus Defaults

### Ziel
Config laden (intern), Berechnung mit Default-Werten, `prokrastinationsPreis` als Hero-KpiCard anzeigen.

### Nutzerwert
Nutzer sieht den Prokrastinations-Preis bei App-Start — ohne Slider-Interaktion.

### Betroffene Layer (APP_SPEC §12)
Config → Two-Step-Parsing (P-02) → AppData freeze (P-01) → CalculatorStrategy → AppContext → Renderer → A11y-Summary

### Dateien
- `app.js` erweitern

### NB-2 — Entschieden
Config-Form für Pilot-1: **internes Config-Objekt (JS-Konstante)** gemäß RFC §D5.
Kein externer Fetch, kein `data-fw-config` in Pilot-1.

### Akzeptanzkriterien
- `prokrastinationsPreis` korrekt berechnet (Formel: APP_SPEC §12, Schritt 4)
- AppContext statischer Kern + dynamische Schale befüllt (APP_SPEC §10)
- Hero-KpiCard: Wert via `textContent`, Einheit im Text
- A11y-Summary in `aria-live`-Region via `textContent`
- SafeDOM: kein `innerHTML` für berechnete Werte
- Error-State wenn Config-Objekt nicht parsebar

---

## Slice 2 — Wartezeit-Slider

### Ziel
Primärer Slider für `prokrastinationsJahre` — Live-Neuberechnung bei Slider-Änderung.

### Nutzerwert
Nutzer bewegt Slider und spürt direkt, wie Wartezeit den Prokrastinations-Preis beeinflusst.

### Betroffene Layer
UI (Slider) → input-Event → Validation/Clamp → CalculatorStrategy → AppContext → Renderer → ARIA Live Region

### Dateien
- `app.js` erweitern

### Akzeptanzkriterien
- Slider `prokrastinationsJahre`: Range 1–20, Default 5, Step 1
- Hauptzahl (LiveCounter) reagiert sofort auf Slider-Bewegung
- Tastatur-Navigation: Pfeiltasten verändern Wert
- `aria-valuetext`: „5 Jahre Wartezeit" (nicht nur „5")
- ARIA Live Region: `a11ySummary` nach Debounce ≥ 300ms
- `prefers-reduced-motion`: LiveCounter-Animation deaktiviert, Endwert direkt
- Clamp: `prokrastinationsJahre` max `gesamtlaufzeit - 1`

---

## Slice 3 — Monatsrate + Anlagedauer

### Ziel
Vollständige Eingabe-Freiheit: alle drei Slider bedienbar.

### Nutzerwert
Nutzer kann eigene Situation annähern (eigene Sparrate, eigene Laufzeit).

### Dateien
- `app.js` erweitern

### Akzeptanzkriterien
- Slider `monatlicheRate`: Range 50–2.000, Step 50, Default 300
- Slider `gesamtlaufzeit`: Range 5–50, Step 1, Default 30
- Alle drei Slider gleichzeitig bedienbar
- Clamp-Regeln greifen bei Grenzwerten
- Kein Empty-State bei normaler Slider-Bedienung (§4 Regel 3)
- `aria-valuetext` korrekt für alle Slider

---

## Slice 4 — AssumptionsBox

### Ziel
Truthful UX: Annahmen explizit sichtbar machen (P-06).

### Dateien
- `app.js` erweitern

### Akzeptanzkriterien
- Pflichtzeile immer sichtbar, nicht kollabierbar: „Annahme: 7 % p.a. nominal — historischer MSCI-World-Durchschnitt. Nicht garantiert."
- Expandierbare Hinweise: Inflation, Beratungshinweis
- `aria-expanded` korrekt gesetzt bei Expand/Collapse
- Alle Texte via `textContent`

---

## Slice 5 — Nebenwerte + Vergleichsanker

### Ziel
Hauptzahl erklären: `endwertSofort`, `endwertSpaeter`, `verloreneEinzahlungen`.

### Dateien
- `app.js` erweitern

### Akzeptanzkriterien
- Reihenfolge: positiv zuerst (endwertSofort → endwertSpaeter → verloreneEinzahlungen)
- Keine zweite Hauptzahl — Nebenwerte erklären, konkurrieren nicht
- Vergleichsanker optional, nicht dominant
- ResultSentence aus Config-Template via `textContent`
- PrimaryCta (href bleibt leer bis NB-1 gelöst)

---

## Slice 6 — Responsive + A11y-Härtung

### Ziel
App nutzbar auf echten Geräten in allen Viewports.

### Dateien
- `app.css` erweitern

### Akzeptanzkriterien
- 375px: kein horizontaler Overflow, alle Slider bedienbar
- 768px: Layout lesbar, Slider nicht zu klein
- 1280px: vollständiges Layout
- Tastatur-Test: alle Slider mit Pfeiltasten bedienbar
- WCAG-AA: Kontrast ≥ 4.5:1 für alle Text/Hintergrund-Paare
- `prefers-reduced-motion`: Animation deaktiviert

### Voraussetzung (NB-3)
Spätestens hier: Theme-Token-Inventar aus `screen.css` prüfen.
Fallback-Tokens ersetzen durch echte Design-Tokens.

---

## Slice 7a — QA / Testseite vollständig

### Ziel
Albert kann alle APP_SPEC-Testfälle lokal durchführen.

### Dateien
- `app.test.html` vervollständigen

### Akzeptanzkriterien
- Alle Testfälle T-01 bis T-25 aus APP_SPEC §15 lokal prüfbar
- Szenarien dokumentiert mit erwarteten Ergebnissen
- Manuelle Testliste als Checkliste

---

## Slice 7b — Echter Ghost-Integrationstest

### Ziel
Produktionsnaher Test in echter Ghost-Seite.

### Voraussetzungen (NB-4)
- Ghost-Upload-URL-Schema bekannt (RFC B2) — praktischer Ghost-Test durch Albert
- Bootstrapper-Strategie entschieden (RFC B3): Ghost Code Injection vs. Theme-Einbindung
- Beide Punkte sind kein Blocker für Slices 0–6

### Akzeptanzkriterien
- App lädt in echter Ghost-Seite über HTML-Card
- URLs für `app.js` und `app.css` funktionieren
- Keine Theme-Konflikte (CSS-Bleeding, JS-Namespace)
- Keine unerwarteten Konsolenfehler

---

## Nicht-Blocker (aus SPEC_GATE_REPORT.md)

| ID | Thema | Betrifft | Fällig | Status |
|---|---|---|---|---|
| NB-1 | CTA `href` leer — `risiko-uebersetzer` URL unbekannt | Slice 5 / Release | Vor Release | Offen |
| NB-2 | Config-Form | Slice 1 | Vor Slice 1 | **Entschieden: internes Config-Objekt (RFC §D5)** |
| NB-3 | Theme-Token-Inventar (`screen.css`) — Fallback erlaubt | Slice 6 | Vor Slice 6 | Offen |
| NB-4 | Bootstrapper-Strategie + Ghost-Upload-URL | Slice 7b | Vor Ghost-Deploy | Offen |

---

## Binding Decisions (relevant für alle Slices)

| ID | Entscheidung |
|---|---|
| Q-01 | SafeDOM: kein `innerHTML` für Nutzdaten |
| Q-02 | Whitelist-Prinzip für `data-fw-options` |
| A-09 | Read-only AppData: `Object.freeze()` nach Parsing (ab Slice 1) |
| A-10 | Two-Step Parsing: Syntax Phase 1, Semantik Phase 2 (ab Slice 1) |
| A-14 | Truthful UX: Annahmen sichtbar (Slice 4 Pflicht) |
| A-17 | Theme-Hoheit: semantische Tokens, keine Hex-Werte |
| D-01 | Config intern für Pilot-1 (kein `data-fw-config` in Ghost-Card) |
| SG-01 | Spec-Gate bestanden 2026-05-10 |
