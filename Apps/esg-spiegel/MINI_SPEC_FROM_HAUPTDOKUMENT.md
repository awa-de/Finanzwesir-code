# MINI_SPEC_FROM_HAUPTDOKUMENT — ESG-Spiegel

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## E1 – ESG-Spiegel

**Slug:** `esg-spiegel`
**KI-Konsens:** ★★ (Perplexity, Gemini)
**Folienbezug:** Slides 25–28 (25 ESG-Varianten des MSCI World)
**Funnel-Position:** Komplexität entlarven
**Priorität:** #12

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed esg-spiegel -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** E1 — ESG-Label entmystifizieren  

**Diese App existiert, um:**  
ESG-Etiketten mit den tatsächlichen Top-Positionen zu spiegeln.

**Zu entfernende psychologische Barriere:**  
Der Nutzer vertraut dem Label und verwechselt ESG-Variante mit moralisch eindeutig anderer Geldanlage.

**Falscher Glaubenssatz vorher:**  
„Wenn ESG draufsteht, ist mein Geld automatisch deutlich anders und moralisch sauber investiert.“

**Zielzustand nach der App:**  
„Ich sehe, was wirklich drin ist, und treffe eine bewusste ESG-Entscheidung ohne Etikettenmagie.“

**Muss-Kriterien für jede Umsetzung:**  
- Top-Positionen verschiedener ESG-Varianten sichtbar machen.
- Überschneidungen nüchtern zeigen.
- ESG nicht lächerlich machen.
- Entscheidung bewusst machen, nicht moralisieren.

**Nicht-Ziele / harte Verbote:**  
- Kein ESG-Bashing.
- Keine moralische Belehrung.
- Keine Produktempfehlung.
- Keine politische Debatte als Hauptpfad.

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

> „Die Top-5-Positionen sind immer dieselben: Apple, Microsoft, Amazon, Alphabet, Meta."

### Interaktion

**Split-Screen:**
- Links: 1 MSCI World → 14 vergleichbare ETFs (eine Zeile im Depot)
- Rechts: 25 ESG-Varianten als Kachel-Grid

User klickt 2 ESG-ETFs → App zeigt identische Top-5. Überschneidungsgrad: 45–94 % der Original-Positionen.

**Variante (Gemini):** Button „Top-Holdings vergleichen" → identische Firmen farbig markiert.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: D/E – ETF-Auswahl & Technik
- App-ID: E1
- App-Titel: ESG-Spiegel
- Slug laut Hauptdokument: `esg-spiegel`
- Zugeordneter App-Ordner: `/Apps/esg-spiegel/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
