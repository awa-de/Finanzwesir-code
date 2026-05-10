# MINI_SPEC_FROM_HAUPTDOKUMENT — Prokrastinations-Preis

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## B1 – Prokrastinations-Preis

**Slug:** `prokrastinations-preis`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Slides 4–7 (Großwetterlage, 100 USD monatlich)
**Funnel-Position:** Timing zerstören
**Priorität:** #11

### Problem, das gelöst wird

„Ich fange nächstes Jahr an" ist die häufigste Ausrede. Diese App zeigt nicht abstrakt entgangene Prozente, sondern Euro-Verluste in Echtzeit – als animierter Countdown.

### Kernbotschaft

> „5 Jahre Warten kostet dich 47.000 €. Das ist keine Mahnung – das ist Mathematik."

### Interaktion (UX-Flow)

- Eingabe: Monatliche Sparrate, Anlagedauer (30 Jahre), Rendite (7 %)
- Slider: „Ich fange in X Jahren an" (0–10)
- Zwei animierte Linien: „Heute starten" vs. „In X Jahren starten"
- Animierter Zähler für die Differenz in Euro (wächst beim Schieben)

### Implementierungshinweise

- Reine JS-Berechnung, kein Backend
- Animierter Zähler: requestAnimationFrame
- Formel: Zukunftswert = Rate × [((1+r)^n – 1) / r]

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: B – Timing zerstören
- App-ID: B1
- App-Titel: Prokrastinations-Preis
- Slug laut Hauptdokument: `prokrastinations-preis`
- Zugeordneter App-Ordner: `/Apps/prokrastinations-preis/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
