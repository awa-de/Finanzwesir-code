# MINI_SPEC_FROM_HAUPTDOKUMENT — Weltdepot-Baukasten

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## C3 – Weltdepot-Baukasten

**Slug:** `weltdepot-baukasten`
**KI-Konsens:** ★ (Claude)
**Folienbezug:** Slides 21–22, 46, 104
**Funnel-Position:** Plan geben
**Priorität:** #17

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed weltdepot-baukasten -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** C3 / Architektur-Baukasten  

**Diese App existiert, um:**  
aus der offenen ETF-Produktwelt wenige verständliche Depot-Architekturen zu machen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer glaubt, er müsse aus tausenden ETFs selbst eine perfekte Struktur erfinden.

**Falscher Glaubenssatz vorher:**  
„Ohne perfekte Eigenkonstruktion ist mein Depot nicht richtig.“

**Zielzustand nach der App:**  
„Ich erkenne wenige robuste Grundarchitekturen und kann eine passende Richtung wählen.“

**Muss-Kriterien für jede Umsetzung:**  
- Wenige Varianten, nicht beliebige Kombinatorik.
- Jede Variante hat eine klare Rolle und einen Tradeoff.
- Kein Einzelsieger.
- Verbindung zum späteren Waschzettel vorbereiten, aber nicht ersetzen.

**Nicht-Ziele / harte Verbote:**  
- Keine individuelle Anlageberatung.
- Keine Produktempfehlung als finale Wahrheit.
- Keine Optimierungsmaschine.
- Keine 20 Varianten.

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

### Kernbotschaft

> „Das Ziel – nicht arm sterben – erreichen wir mit allen Kombinationen." (Slide 104)

### Interaktion

4 Tabs: A (1 ETF ACWI) · B (80/20 World/EM) · C (3 ETFs) · D (4 ETFs regional)

Pro Variante: Tortendiagramm, Checkliste (✅ Lückenlos / ✅ Überschneidungsfrei / ✅ Selbststabilisierend), ETF-Anzahl + Rebalancing-Aufwand, Performancevergleich über alle Varianten.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: C – Komplexität entlarven
- App-ID: C3
- App-Titel: Weltdepot-Baukasten
- Slug laut Hauptdokument: `weltdepot-baukasten`
- Zugeordneter App-Ordner: `/Apps/weltdepot-baukasten/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
