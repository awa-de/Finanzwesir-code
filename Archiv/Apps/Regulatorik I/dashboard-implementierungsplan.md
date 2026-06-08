---
Angelegt am: 25.04.2026 16:33:30
zuletzt verändert am: 2026-04-25T16:51:19+02:00
tags:
  - dashboard
  - implementierung
  - todo
---
---
up::[[]]
# Dashboard Regulatorik — Implementierungsplan

Persistenter Fortschritts-Tracker zur Umsetzung der v3-Änderungsliste.
Quelle: `Dashboard-finale-Anderungsliste-v3.md`
Datei: `dashboard-regulatorikXIX.html`

---

## Fortschritt

```
BATCH 1 — HTML-Chirurgie (kein JS-Risiko): ✅ ABGESCHLOSSEN 2026-04-25
[x] Tracker-Datei angelegt
[x] K-1  — <h1> Zeile 86 → <p>
[x] QW-1 — Header auf 1 Zeile kürzen
[x] QW-2 — Überblick-Section gelöscht
[x] QW-3 — Konsequenz-Box auf 3 Zeilen
[x] M-5  — Initialwerte 0 statt — (in QW-3 enthalten)
[x] QW-4 — Statische Erklärungstexte unter KPI-Karten entfernt
[x] QW-6 — tblDrag-Zeile (HTML + JS els + JS render) entfernt

BATCH 2 — Slider: ✅ ABGESCHLOSSEN 2026-04-25
[x] K-2  — 7 numerische Slider-Labels (beide Slider)
[x] M-9  — Context-Box hidden bis erste Interaktion

BATCH 3 — Chart + Layout: ✅ ABGESCHLOSSEN 2026-04-25
[x] M-4  — Chart-Höhe Mobile 250px (CSS-Klasse + Media Query)
[x] M-1  — KPI-Hierarchie (text-3xl für primäre Karten)
[x] M-2  — Direct Labeling an Rentenstart-Linie + HTML-Legende entfernt

BATCH 4 — Mobile + Interaktion: ✅ ABGESCHLOSSEN 2026-04-25
[x] K-3  — Sticky Mobile Summary Bar (fixed bottom-0, md:hidden)
[x] M-3  — Slider-Wert prominent neben Label, "Aktuell:"-Zeile entfernt
[x] M-6  — "Weniger pro Monat" → "Weniger pro Jahr" + JS cutAbsMon→cutAbsYear
[x] M-7  — Input-Limits in alle 5 Labels eingefügt
[x] M-8  — Reset-Button mit JS-Handler (Defaults: 30/400/6/0.5/30/6/0.5)

BATCH 5 — optional: ⛔ NICHT UMGESETZT
[ ] G-5  — Dark Mode Toggle: entfällt. Toggle wird durch Ghost.io gesteuert,
            nicht durch das Dashboard selbst. Kein eigener Button nötig.

POST-BATCH BUGFIXES — ✅ ABGESCHLOSSEN 2026-04-25
[x] FIX-1 — Spurious </div> + staler MOBILE SUMMARY Kommentar entfernt
[x] FIX-2 — Dead Code cutAbsMon entfernt (Überbleibsel M-6)
[x] FIX-3 — pb-28 md:pb-8 am Outer Container (Mobile Bar deckte letzten Inhalt ab)
[x] FIX-4 — Entnahmephase Grid: md:grid-cols-2 lg:grid-cols-3 (Tabellen-Overflow bei 768px)
[x] FIX-5 — Enter-Taste in allen 5 Inputs löst blur aus (Chrome Mobile Simulation)
[x] FIX-6 — Reset-Button: Position + Stil überarbeitet
                  Vorher: Ghost-Button bottom-right der Parameter-Section (Form-Muster).
                  Problem: Nutzer suchen Reset nicht unten — F-Pattern, toter Winkel.
                  Entscheidung: Control-Panel-Muster (wie Equalizer/Dashboard-UIs):
                  Button gehört neben das Label der Einheit, die er zurücksetzt.
                  Nachher: Outlined-Button (Border + Hover → Brand-Farbe) oben rechts
                  neben "Parameter"-Label. Gilt für alle Screengrößen (S/M/L).
[x] K-3-REBUILD — Mobile Bar: IntersectionObserver statt immer-sichtbar-fixed.
                  V1: Trigger = paramSection off-screen (zu spät).
                  V2: Trigger = gesamtschauSection betritt Viewport (früher, besser).
                  Verschwindet wenn dashboardEnd-Sentinel den Viewport verlässt.
                  Ghost.io-sicher: Bar schwebt nie über fremdem Artikel-Content.
                  Layout: zweizeilig erzwungen (block statt flex justify-between),
                  "Gesamteffekt"-Label entfernt, mt-1 zwischen den zwei Zeilen.
```

---

## Batch 1 — Detail

**Items:** K-1, QW-1, QW-2, QW-3+M-5, QW-4, QW-6  
**Aufwand:** ~20 min | **JS-Änderungen:** nur für QW-6 (tblDrag-Ref entfernen)

### K-1: Zeile 86 — `<h1>` → `<p>`
`<h1 class="text-base font-semibold leading-tight lg:text-lg">` → `<p ...>`

### QW-1: Zeilen 93–98 — Header kürzen
Headline auf: "Wie stark drücken kleine Renditeverluste deine Rente?"
Den nachfolgenden `<p>`-Erklärungsblock löschen.

### QW-2: Zeilen 354–381 — Überblick-Section löschen
Gesamte `<section>` mit "Überblick"-Label und "Was dieses Modell ist"-Kasten.

### QW-3 + M-5: Zeilen 322–351 — Konsequenz-Box
Drei Zeilen + Basis-Klein-Text. `conseqDragSave`/`conseqDragDraw` als hidden spans behalten (JS schreibt dorthin). Initialwerte: 0 statt —.

### QW-4: Statische Erklärungstexte (kein JS-Risiko)
Folgende Elemente OHNE ID entfernen:
- Sparphase-Header `<p>` ("Hier siehst du, welches Endvermögen...")
- kpiSaveNoDrag-Karte `<p>` ("So würde sich dein Depot...")
- "Was dich das kostet"-Footer Sparphase ("Damit du am Ende trotzdem...")
- Entnahmephase-Header `<p>` ("Hier siehst du, wie hoch deine jährliche...")
- kpiMaxWithdrawalNoDrag-Karte `<p>` ("So viel könntest du pro Jahr...")
- "Was dich das kostet"-Footer Entnahme ("Verglichen mit der Auszahlung...")

Behalten (JS schreibt dorthin): `kpiSaveWithDragSub`, `kpiSaveCompText`, `kpiMaxWithdrawalSliderSub`

### QW-6: tblDrag (3 Stellen)
1. HTML: `<tr>` Zeilen 438–446 (tblDrag + Divider-Row)
2. els-Cache Zeile 595: `tblDrag: document.getElementById('tblDrag'),`
3. render() Zeile 795: `els.tblDrag.textContent = ...`

---

## Übergabe-Prompt Batch 1 → Batch 2

```
Datei: c:\Users\Albert HP PC\Documents\2ndbrain\Projekte\Finanzwesir Vermächtnis\ETF-Vermächtnis\dashboard-regulatorikXIX.html
Persistenter Plan: dashboard-implementierungsplan.md im selben Verzeichnis.

Batch 1 ist abgeschlossen (K-1, QW-1, QW-2, QW-3, QW-4, QW-6, M-5).
Checkliste im Plan-Dokument aktualisieren.

Nächste Aufgabe: Batch 2 — Slider-Fix + Context
Items: K-2 (Slider-Ticks), M-9 (Context-Box verstecken bis erste Interaktion)

K-2: Beide Slider (Sparphase: ~Zeile 191–197, Rentenphase: äquivalent) haben 7 Ticks
aber 5 Labels (justify-between). → 7 numerische Labels: 0 % / 0,5 / 1,0 / 1,5 / 2,0 / 2,5 / 3 %

M-9: Context-Box Divs initial hidden machen (id="dragSaveContextBox" / "dragDrawContextBox" hinzufügen + hidden-Attribut).
In JS (nach aktueller Slider-Handler-Registrierung) erweitern: bei Interaktion hidden entfernen.

Lies zuerst: Zeilen 165–210 (Sparphase-Slider + Labels + Context-Box)
und den äquivalenten Block der Rentenphase, dann JS Slider-Handler.
```

---

## Übergabe-Prompt Batch 2 → Batch 3

```
Datei: dashboard-regulatorikXIX.html
Persistenter Plan: dashboard-implementierungsplan.md

Batch 2 abgeschlossen (K-2 Slider-Labels, M-9 Context-Box hidden).
Checkliste im Plan-Dokument aktualisieren.

Nächste Aufgabe: Batch 3 — Chart + KPI-Hierarchie
Items: M-4 (Chart-Höhe Mobile), M-1 (KPI-Hierarchie), M-2 (Direct Labeling)

M-4: @media (max-width:640px) { .chart-responsive { height:250px !important; } } in <head>.
  Canvas-div Klasse chart-responsive vergeben.

M-1: kpiSaveNoDrag + kpiSaveWithDrag: text-2xl → text-3xl.
  kpiMaxWithdrawalNoDrag + kpiMaxWithdrawalSlider: text-2xl → text-3xl.

M-2: In renderAllCharts() Annotation-Plugin nutzen (bereits geladen: chartjs-plugin-annotation 3.0.1).
  Labels an Kurvenenden. HTML-Legende (~Zeile 306–319) danach löschen.

Lies: Zeilen 295–320 (Chart-Canvas + Legende), JS Zeile 1014–1145 (renderAllCharts).
```

---

## Übergabe-Prompt Batch 3 → Batch 4

```
Datei: dashboard-regulatorikXIX.html
Persistenter Plan: dashboard-implementierungsplan.md

Batch 3 abgeschlossen (M-4, M-1, M-2).
Checkliste im Plan-Dokument aktualisieren.

Nächste Aufgabe: Batch 4 — Mobile Core + Interaktion
Items: K-3, M-3, M-6, M-7, M-8

K-3: Sticky-Leiste (fixed bottom-0, md:hidden) vor </body>. Zeigt conseqAbsMon-Wert.
  render() am Ende ergänzen: mobileSummaryMon + mobileSummaryPct updaten (null-check).

M-3: Slider-Label-Zeile in flex justify-between umbauen. dragSaveLabel/dragDrawLabel-Span
  nach rechts. Die "Aktuell: X %-Punkte"-Zeile darunter löschen.

M-6: tblDrawCutEuro zeigt Monatswert — prüfen ob "Weniger pro Monat" auf "Weniger pro Jahr"
  geändert werden soll (cutAbsYear vs cutAbsMon in render() Zeile 832).

M-7: Input-Labels erweitern mit (1–50 Jahre), (1–2000 €), (1–10 %) etc.
M-8: Reset-Button HTML + JS (Defaults: 30/400/6/0.5/30/6/0.5).

Lies: Zeile 103–290 (Input-Sektion), JS render() Zeile 755–840.
```

---

*Angelegt: 2026-04-25 | Basis: Dashboard-finale-Anderungsliste-v3.md*
