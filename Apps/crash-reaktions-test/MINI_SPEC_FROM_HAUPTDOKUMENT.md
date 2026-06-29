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

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed crash-reaktions-test -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** A2 — Feuerprobe-App  

**Diese App existiert, um:**  
den Nutzer vorab erleben zu lassen, wie schwer korrektes Verhalten im Crash ist, bevor echtes Geld und echte Angst gleichzeitig auftreten.

**Zu entfernende psychologische Barriere:**  
Die Illusion, dass Wissen automatisch zu richtigem Verhalten im Crash führt.

**Falscher Glaubenssatz vorher:**  
„Wenn es wirklich kracht, bleibe ich natürlich ruhig — ich kenne die Theorie.“

**Zielzustand nach der App:**  
„Ich brauche vor dem Crash eine Regel, nicht im Crash eine spontane Heldentat.“

**Muss-Kriterien für jede Umsetzung:**  
- Der Nutzer trifft im simulierten Stress eine Entscheidung.
- Die App zeigt Folgen von Halten, Verkaufen, Nachkaufen oder Reduzieren.
- Die App knüpft an die eigene Risikodosis an.
- Die App zeigt Verhalten, nicht Fachwissen.

**Nicht-Ziele / harte Verbote:**  
- Keine Panikinszenierung.
- Keine Crash-Vorhersage.
- Kein Trading-Simulator.
- Keine Beschämung einer defensiveren Entscheidung.
- Keine Theoriebegriffe als Haupt-UI.

---

Dieser Prüfscore ist **kein app-spezifischer Inhalt**, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App.

Er wird bei der späteren Verteilung in jeden lokalen Steuerungsblock übernommen und dort **unverändert** verwendet.

**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.

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
