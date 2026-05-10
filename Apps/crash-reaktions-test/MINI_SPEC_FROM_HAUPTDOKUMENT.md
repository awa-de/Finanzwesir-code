# MINI_SPEC_FROM_HAUPTDOKUMENT — Crash-Reaktions-Test

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## A2 – Crash-Reaktions-Test

**Slug:** `crash-reaktions-test`
**KI-Konsens:** ★★★ (ChatGPT, Claude indirekt, Gemini)
**Folienbezug:** Slides 6, 36–38 (Anlegerverhalten, Psychologie)
**Funnel-Position:** Crash-Angst auflösen
**Priorität:** #3

### Problem, das gelöst wird

Die größte Hürde beim Investieren ist nicht fehlendes Wissen, sondern die unbeantwortete Frage: *„Was mache ich, wenn es kracht?"* Diese App gibt eine erlebbare Antwort – und zeigt, dass Verhalten mehr zählt als der gewählte ETF.

### Kernbotschaft

> „Dein Verhalten ist wichtiger als dein ETF."

### Interaktion (UX-Flow)

**Screen 1 – Einstieg (Animation):**
- Depot-Anzeige: 25.000 €
- Overlay-Text: „März 2020 passiert wieder."
- Animierter Chart: Depot fällt auf 17.500 € (–30 % in 2 Wochen)
- Zähler läuft in Echtzeit herunter

**Screen 2 – Entscheidung:**
- Headline: „Deine Entscheidung?"
- Drei große Buttons: ❌ Alles verkaufen · 😐 Nichts tun · 💪 Nachkaufen

**Screen 3 – Ergebnis:**
- Linienchart: 3 Verläufe (Verkaufen / Halten / Nachkaufen) bis heute
- Verkaufen: „Du hast den Verlust realisiert – und die Erholung verpasst."
- Halten: „Du hast durchgehalten. Das ist schon besser als die meisten."
- Nachkaufen: „Du hast den Crash genutzt. So entsteht Vermögen."
- Punchline (immer): „Dein Verhalten entscheidet mehr als dein ETF."
- CTA: „Ich halte das aus – Sparplan starten"

### Wireframe-Struktur

```
[Chart: Portfolio fällt animiert]
[Text: „Willkommen im echten Leben."]
[Buttons: 3 Optionen]
↓
[Result Screen: Chart mit 3 Linien]
[Erklärungstext je nach Auswahl]
[CTA Button]
```

### Implementierungshinweise

- Historische Daten: MSCI World 2020 Crash + Recovery (öffentlich verfügbar)
- Animierter Zähler für den Depot-Wertverlust (emotionaler als statische Zahl)
- Chart.js für Liniendiagramm

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: A – Crash-Angst auflösen
- App-ID: A2
- App-Titel: Crash-Reaktions-Test
- Slug laut Hauptdokument: `crash-reaktions-test`
- Zugeordneter App-Ordner: `/Apps/crash-reaktions-test/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
