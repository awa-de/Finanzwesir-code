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
