# MINI_SPEC_FROM_HAUPTDOKUMENT — ETF-Namensdecoder

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## D1 – ETF-Namensdecoder

**Slug:** `etf-namensdecoder`
**KI-Konsens:** ★★★ (Perplexity, Claude, ChatGPT indirekt)
**Folienbezug:** Slide 164 (ETF-Namen erklärt)
**Funnel-Position:** Hook / Einstieg (Sprachbarriere beseitigen)
**Priorität:** #5

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed etf-namensdecoder -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** D1 — ETF-Technik entmystifizieren  

**Diese App existiert, um:**  
ETF-Namen so zu zerlegen, dass der Nutzer das Etikett lesen kann, ohne im Fachjargon stecken zu bleiben.

**Zu entfernende psychologische Barriere:**  
ETF-Namen wirken wie Expertencode und erzeugen Abhängigkeit von Vergleichsportalen.

**Falscher Glaubenssatz vorher:**  
„Ich verstehe ETF-Namen nicht; ich kann deshalb noch keine Auswahl treffen.“

**Zielzustand nach der App:**  
„Ich kann Anbieter, Index, Ausschüttung, Replikation und Währung grob einordnen. Das reicht, um nicht mehr gelähmt zu sein.“

**Muss-Kriterien für jede Umsetzung:**  
- ETF-Name farblich / segmentiert zerlegen.
- Nur handlungsrelevante Begriffe erklären.
- Plain German statt Prospekt-Sprache.
- Übergang zu Detail-Apps ermöglichen.

**Nicht-Ziele / harte Verbote:**  
- Kein vollständiger Prospektkurs.
- Keine Produktempfehlung.
- Kein ETF-Ranking.
- Keine Detailtiefe, die neue Blockade erzeugt.

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

„Xtrackers S&P 500 UCITS ETF 1C EUR Hedged" – wer das zum ersten Mal liest, schließt den Browser. Wer den Namen versteht, hat keine Ausrede mehr.

### Kernbotschaft

> „Der größte Angstfaktor beim ETF-Kauf ist der unverständliche Name."

### Interaktion (UX-Flow)

**Option A: Vorauswahl** – 6–8 reale ETF-Namen:
- `iShares Core MSCI World UCITS ETF acc`
- `Xtrackers S&P 500 UCITS ETF 1C EUR hedged`
- `Amundi MSCI Emerging Markets UCITS ETF dist`
- `Vanguard FTSE All-World UCITS ETF (USD) Distributing`

**Option B: Freies Eingabefeld**

**Ausgabe – farbige Token-Zerlegung:**

```
[Xtrackers]  [S&P 500]  [UCITS ETF]  [1C]  [EUR hedged]
    🔴            🔵          🟢        🟠        🟣
 Anbieter       Index      EU-Hülle  Thes.   Währungsges.
```

**Klick auf Token → Aufklapp-Box:**
- 🔴 **Anbieter:** „Xtrackers = Deutsche Bank/DWS. Auch: iShares (BlackRock), Amundi, Vanguard, SPDR, UBS, HSBC."
- 🔵 **Index:** „Was drin ist. S&P 500 = 500 größte US-Unternehmen."
- 🟢 **UCITS ETF:** „In der EU reguliert und von der BaFin beaufsichtigt."
- 🟠 **acc / 1C / C:** „Thesaurierend – Dividenden werden automatisch reinvestiert."
- 🟣 **EUR hedged:** „Währungsgesichert gegen USD. Kosten ca. 0,2 % p.a. extra."

### Implementierungshinweise

- Reine Frontend-App, Tokenisierung per Regex-Regeln
- Token-Datenbank als JSON (Anbieter-Liste, Index-Liste, Kürzel-Dictionary)

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: D/E – ETF-Auswahl & Technik
- App-ID: D1
- App-Titel: ETF-Namensdecoder
- Slug laut Hauptdokument: `etf-namensdecoder`
- Zugeordneter App-Ordner: `/Apps/etf-namensdecoder/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
