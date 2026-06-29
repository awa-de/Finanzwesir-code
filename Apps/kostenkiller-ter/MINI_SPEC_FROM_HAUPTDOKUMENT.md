# MINI_SPEC_FROM_HAUPTDOKUMENT — Kostenkiller (TER-Rechner)

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## D3 – Kostenkiller (TER-Rechner)

**Slug:** `kostenkiller-ter`
**KI-Konsens:** ★★ (Claude, ChatGPT)
**Folienbezug:** Slides 154–155 (Kaufkosten vs. laufende Kosten)
**Funnel-Position:** ETF-Auswahl
**Priorität:** #10

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed kostenkiller-ter -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** D3 — Kostenwirkung kalibrieren  

**Diese App existiert, um:**  
sichtbar zu machen, welche Kosten langfristig wirklich wirken und welche sichtbaren Kosten psychologisch überschätzt werden.

**Zu entfernende psychologische Barriere:**  
Der Nutzer verheddert sich in Kosten-Feinschliff oder gewichtet einmalige Kosten stärker als laufende Kosten.

**Falscher Glaubenssatz vorher:**  
„Wenn ich die kleinsten sichtbaren Kosten finde, habe ich die wichtigste Entscheidung gelöst.“

**Zielzustand nach der App:**  
„Ich verstehe die Kostenhierarchie und lasse Kosten nicht zur Startbremse werden.“

**Muss-Kriterien für jede Umsetzung:**  
- Einmalige und laufende Kosten über Zeit sichtbar machen.
- TER / laufende Kosten als langfristigen Effekt erklären.
- Kosten wichtig nehmen, aber nicht als alleinigen Haupthebel inszenieren.
- Übergang zu ETF-Vergleich / Feinschliff-Entgiftung ermöglichen.

**Nicht-Ziele / harte Verbote:**  
- Kein ETF-Ranking.
- Keine Jagd nach dem billigsten Produkt um jeden Preis.
- Keine Renditeprognose.
- Keine Steuerdetails.

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

> „Kaufkosten-Optimierung: Hobby. TER-Optimierung: Pflicht."

### Interaktion

- Eingabe: Sparrate, Laufzeit (220 Monate), Kaufkosten %, TER %
- Drei animierte Kurven: ohne Kosten / mit Kaufkosten / mit TER
- Voreinstellung „Typischer Anfängerfehler": Kaufkosten 2,5 %, TER 0,20 %

**Vergleichstabelle (Slide 155):**

| Szenario | Fehlende Anteile (220 Monate) |
|---|---|
| 1,5 % Kaufkosten | 150 |
| 2,5 % Kaufkosten | 250 |
| 1,5 % laufende Kosten | 1.534 |
| 2,5 % laufende Kosten | 2.405 |

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: D/E – ETF-Auswahl & Technik
- App-ID: D3
- App-Titel: Kostenkiller (TER-Rechner)
- Slug laut Hauptdokument: `kostenkiller-ter`
- Zugeordneter App-Ordner: `/Apps/kostenkiller-ter/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
