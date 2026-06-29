# MINI_SPEC_FROM_HAUPTDOKUMENT — Komplexitätsentlarver (1 ETF vs. 5)

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## C2 – Komplexitätsentlarver (1 ETF vs. 5)

**Slug:** `komplexitaets-entlarver`
**KI-Konsens:** ★★ (Claude, ChatGPT)
**Folienbezug:** Slides 25–31, 33, 49
**Funnel-Position:** Einfachheit zeigen
**Priorität:** #9

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed komplexitaets-entlarver -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** C2 — Komplexitätsillusion entlarven  

**Diese App existiert, um:**  
zu zeigen, wann zusätzliche Bausteine echten Nutzen bringen und wann sie nur Aufwand, Pflege und Fehlerrisiko erhöhen.

**Zu entfernende psychologische Barriere:**  
Komplexität fühlt sich professionell und sicher an.

**Falscher Glaubenssatz vorher:**  
„Ein komplexeres Depot ist automatisch durchdachter und robuster.“

**Zielzustand nach der App:**  
„Ich füge nur Bausteine hinzu, die eine erkennbare Aufgabe erfüllen. Sonst ist Einfachheit kein Mangel, sondern Robustheit.“

**Muss-Kriterien für jede Umsetzung:**  
- 1-ETF-Variante vs. Mehr-ETF-Variante verständlich vergleichen.
- Aufwand, Pflege, Überschneidung und Zusatznutzen sichtbar machen.
- Kein Spott über komplexere Portfolios.
- Entscheidung nach Nutzen, nicht nach Eleganz.

**Nicht-Ziele / harte Verbote:**  
- Keine pauschale Ein-ETF-Doktrin.
- Keine Fortgeschrittenen-Portfolios abwerten.
- Keine Produktauswahl-App.
- Keine Steuer- oder Rebalancing-Detailtiefe.

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

Überforderung killt den Start. Diese App zeigt: Ein ETF liefert dasselbe Ergebnis mit 10× weniger Aufwand.

### Kernbotschaft

> „Mehr Arbeit. Kein Mehrwert."

### Interaktion (UX-Flow)

**Screen 1 – Das „Experten-Depot":**
Kachel-Grid mit 11 ETFs → Button „Aufräumen →" → Animation: Kacheln kollabieren in 5 Kategorien

**Screen 2 – Performance-Vergleich:**

| Zeitraum | 11-ETF-Depot | ACWI (1 ETF) | Differenz |
|---|---|---|---|
| 1 Monat | +0,33 % | +0,28 % | Ähnlich |
| 6 Monate | –2,51 % | –2,45 % | Ähnlich |
| 5 Jahre | Fast gleich | Fast gleich | Minimal |

Hover → Tooltip: „7 Sektor-ETFs liefern exakt die World-Rendite – mit 10× mehr Aufwand."

**CTA:** „Ich nehme die einfache Lösung"

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: C – Komplexität entlarven
- App-ID: C2
- App-Titel: Komplexitätsentlarver (1 ETF vs. 5)
- Slug laut Hauptdokument: `komplexitaets-entlarver`
- Zugeordneter App-Ordner: `/Apps/komplexitaets-entlarver/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
