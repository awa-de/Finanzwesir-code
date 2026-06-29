# MINI_SPEC_FROM_HAUPTDOKUMENT — Renditekiller (Volatilitäts-Dämpfer)

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## F1 – Renditekiller (Volatilitäts-Dämpfer)

**Slug:** `renditekiller-volatilitaet`
**KI-Konsens:** ★ (Claude)
**Folienbezug:** Slides 111–112 (Renditekiller Volatilität)
**Funnel-Position:** Risiko klären (mathematischer Unterbau)
**Priorität:** #13

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed renditekiller-volatilitaet -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** F1 — Volatilitäts-/Pfadwirkung zeigen  

**Diese App existiert, um:**  
sichtbar zu machen, dass der Weg zählt: hohe Schwankung kann trotz gleicher Durchschnittsrendite das Endvermögen senken.

**Zu entfernende psychologische Barriere:**  
Der Nutzer schaut nur auf Durchschnittsrendite und unterschätzt Pfadabhängigkeit.

**Falscher Glaubenssatz vorher:**  
„Solange die Durchschnittsrendite stimmt, ist der Weg egal.“

**Zielzustand nach der App:**  
„Der Weg frisst Rendite. Ruhigere Pfade können mehr wert sein als eine theoretisch höhere Durchschnittszahl.“

**Muss-Kriterien für jede Umsetzung:**  
- Zwei Pfade mit gleicher Durchschnittsrendite, aber unterschiedlichem Endwert sichtbar machen.
- Volatility Drag zeigen, ohne den Begriff im Hauptpfad aufzudrängen.
- Wirkung erleben lassen, nicht mathematisch dozieren.
- Verbindung zu psychologischer Durchhaltefähigkeit herstellen.

**Nicht-Ziele / harte Verbote:**  
- Keine Theorievorlesung.
- Keine Derivate-/Trendfolge-Empfehlung.
- Keine Portfoliooptimierung.
- Keine Fachbegriffe als Einstieg.

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

> „Gleicher Markt, halbe Schwankung, 23 € mehr. Das ist der Grund, warum ein Anleihenanteil keine Feigheit ist – sondern Kalkül."

### Interaktion

Zwei animierte Linien (hohe vs. gedämpfte Volatilität), Jahr für Jahr. Schieberegler „Volatilitätsdämpfer" 0–50 % → beide Linien aktualisieren sich live. Die Lücke wird sichtbar kleiner.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: F – Risiko klären
- App-ID: F1
- App-Titel: Renditekiller (Volatilitäts-Dämpfer)
- Slug laut Hauptdokument: `renditekiller-volatilitaet`
- Zugeordneter App-Ordner: `/Apps/renditekiller-volatilitaet/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
