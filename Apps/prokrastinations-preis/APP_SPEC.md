# APP_SPEC — prokrastinations-preis

Stand: 2026-05-10 | Pilot-1 Spec-Bereinigung V0.2 | Geändert von: Claude

---

## 1. Status

| Feld | Wert |
|---|---|
| Version | Draft V0.2 |
| Phase | Pilot-1, Phase 2 — Spec-Bereinigung vor Spec-Gate |
| Nächster Schritt | Spec-Gate: Albert prüft, gibt explizites OK |
| Kein Code-Freigabe-Dokument | Implementierung erst nach Spec-Gate + Pre-Code-Gate |
| Grundlage | docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md Phase 3 |

---

## 2. Zweck und Nutzerfrage

**Nutzerfrage:** „Was kostet es mich, mit dem Investieren noch ein paar Jahre zu warten?"

**Was soll die App auslösen:** Der Nutzer soll spüren, dass Warten keine neutrale Position ist. Jeder Monat Verzögerung ist eine Entscheidung mit messbaren Konsequenzen — nicht Pech, sondern Preis.

**Kernaussage:** Der Prokrastinations-Preis ist real und konkret. Der Rechner macht ihn sichtbar: als Euro-Betrag, auf den man verzichtet, wenn man den Sparplan um N Jahre verschiebt.

**Abgrenzung:** Die App rechnet mit Annahmen (Rendite, monatliche Rate, Laufzeit). Sie ersetzt keine Finanzberatung. Annahmen werden explizit sichtbar gemacht (→ P-06 Truthful UX, §14 Sicherheitsregeln).

---

## 3. App-Familie

**Familie:** Calculator / Rechner-App

**Pilotrolle:** Pilot-1 der App-Fabrik. Diese App validiert das Calculator-Template, das für alle weiteren Calculator-Apps wiederverwendet wird:  
`risiko-uebersetzer` (Pilot-2), `kostenkiller-ter`, `thesaurierer-rennen`, `renditekiller-volatilitaet`.

**Warum diese Familie für Pilot-1:**
- Keine externe Datenpipeline — einfachste Ausgangslage
- Klare Eingaben und Ausgaben
- Erzwingt alle typischen UI-Primitiven der Calculator-Familie
- Überschaubare Fachlogik — Fokus liegt auf dem Fließband, nicht auf der Komplexität

**Was dieser Pilot erstmalig spezifiziert:**
- AppContext-Schema für Calculator-Familie (Arch-06, §10)
- A11y-Vertrag für Calculator-Familie (Arch-07, §11)
- Reise eines Inputs durch die Calculator-Architektur (P-10, §12)

**Wiederverwendbare Bausteine, die dieser Pilot erzwingt:**
Slider, KpiCard, LiveCounter, ResultSentence, AssumptionsBox, PrimaryCta, ErrorState, LoadingSkeleton

---

## 4. Inputs

### 4.1 Nutzer-Eingaben

| Parameter | Typ | Default | Min | Max | Einheit | Validierungsregel |
|---|---|---|---|---|---|---|
| `monatlicheRate` | Integer | 300 | 50 | 2.000 | €/Monat | Ganzzahl; außerhalb Range → Clamp auf Grenze |
| `gesamtlaufzeit` | Integer | 30 | 5 | 50 | Jahre | Ganzzahl; muss > `prokrastinationsJahre` |
| `prokrastinationsJahre` | Integer | 5 | 1 | 20 | Jahre | Ganzzahl; muss < `gesamtlaufzeit` |
| `jahresrendite` | Number | 7,0 | — | — | % p.a. | Festwert — kein Nutzer-Slider (O-03 ✅ entschieden; → §6 Config-JSON) |

**Defaults:** Aus Config-JSON geladen. Via `data-fw-options` überschreibbar (→ §8 Whitelist).

**Eingabewege:**
- Slider (primär): haptische Eingabe, Live-Neuberechnung bei jeder Änderung
- NumericInput (sekundär): nicht Teil von Pilot-1 — Scope-Fund SF-02

**Welche Inputs kommen aus `data-fw-options` (Ghost-Card, Redakteur):**
`defaultRate`, `years`, `delayYears` — maximal diese 3 Keys (→ §8)

**Welche Inputs kommen aus Config-JSON (init, einmalig):**
Slider-Grenzen, Defaults, `jahresrendite`-Festwert (7 % nominal), Annahmentexte, ResultSentence-Templates

**Welche Inputs kommen aus UI (Nutzereingabe, laufend):**
Drei Slider-Parameter (monatlicheRate, gesamtlaufzeit, prokrastinationsJahre) — `jahresrendite` ist Festwert aus Config-JSON, kein Slider

**Validierungsregeln — Two-Step-Parsing (P-02):**
1. Syntaktisch: Ist es eine Zahl? Ist der Typ korrekt (Integer vs. Number)?
2. Semantisch: Liegt der Wert im erlaubten Bereich?
3. Bei Verletzung: Wert normalisieren (clampen auf Bereichsgrenzen). Sonderregel: `prokrastinationsJahre` darf maximal `gesamtlaufzeit - 1` sein — wird bei Slider-Bedienung automatisch angepasst.
4. Empty-State ist Sicherheitsnetz für unmögliche Config-Zustände nach dem Laden, nicht der normale Weg bei Slider-Bedienung (→ §9).

---

## 5. Outputs

| Output | UI-Primitive | Beschreibung |
|---|---|---|
| `endwertSofort` | KpiCard | Projiziertes Endvermögen bei sofortigem Sparplan-Start |
| `endwertSpaeter` | KpiCard | Projiziertes Endvermögen nach `prokrastinationsJahre` Verzögerung |
| `prokrastinationsPreis` | KpiCard + LiveCounter | Differenz — das Hauptergebnis der App |
| `verloreneEinzahlungen` | KpiCard (sekundär) | Nicht eingezahlte Beiträge während der Verzögerung: `monatlicheRate × prokrastinationsJahre × 12` |
| Chart | 2-Linien-Chart | Nicht in Pilot-1 — SF-01 verschoben bis ChartAdapter/API definiert (O-02 ✅; → §13) |
| ResultSentence | Text | Auto-generierter Ergebnissatz aus Config-Template |
| AssumptionsBox | Text | Rendite-Annahme, nominal/real, Beratungshinweis — Pflicht nach P-06 |
| PrimaryCta | Button/Link | Pilot-1: Funnel-CTA → `risiko-uebersetzer` (Arbeitsannahme). Standalone-CTA: spätere Variante. |
| A11y-Summary | ARIA Live Region | Screenreader-kompatibles Ergebnis bei Neuberechnung (→ §11) |

**ResultSentence-Muster:**  
„Wer {prokrastinationsJahre} Jahre wartet, verzichtet auf ca. {prokrastinationsPreis}."

---

## 6. Datenbedarf

**Keine externe CSV.** `prokrastinations-preis` ist eine reine Rechner-App. Alle Berechnungen erfolgen aus Formeln und Nutzer-Inputs — keine externe Datenpipeline nötig.

**Config-JSON: ja.** Kein `data-fw-config`-Attribut in der Ghost-Card für Pilot-1 — die Default-Config wird mit der App ausgeliefert. Ob als lokale `app.config.json` oder internes Config-Objekt wird in der Implementierungsplanung entschieden. Externe Config-URL ist kein Blocker für Pilot-1 (AA-03).

**Config-JSON-Inhalte (Skizze):**

```json
{
  "defaults": {
    "monatlicheRate": 300,
    "gesamtlaufzeit": 30,
    "prokrastinationsJahre": 5,
    "jahresrendite": 7.0
  },
  "ranges": {
    "monatlicheRate": { "min": 50, "max": 2000, "step": 50 },
    "gesamtlaufzeit": { "min": 5, "max": 50, "step": 1 },
    "prokrastinationsJahre": { "min": 1, "max": 20, "step": 1 }
  },
  "_note": "jahresrendite hat keine Range — Festwert 7.0 aus 'defaults'. Kein Slider (O-03 ✅).",
  "assumptions": {
    "rendite": "7 % p.a. nominal — historischer MSCI-World-Durchschnitt. Nicht garantiert.",
    "nominal": "Diese Rechnung ist nominal (ohne Inflationsbereinigung).",
    "beratung": "Keine Finanzberatung. Vergangenheitsrenditen sagen nichts über die Zukunft."
  },
  "resultTemplates": {
    "standard": "Wer {prokrastinationsJahre} Jahre wartet, verzichtet auf ca. {prokrastinationsPreis}.",
    "high": "{prokrastinationsJahre} verpasste Jahre — das kostet {prokrastinationsPreis}."
  },
  "cta": {
    "funnel": { "label": "Weiter: Risiko-Übersetzer →", "href": "" },
    "standalone": { "label": "Jetzt Sparplan starten", "href": "" }
  }
}
```

**Keine schwere Datenaufbereitung im Browser.** Alle Berechnungen sind geschlossene Formeln — kein Vorab-Processing nötig. Chart: nicht in Pilot-1 Scope (SF-01).

---

## 7. Ghost-Card-Vertrag

Gemäß `docs/spec/APP-INTERFACE.md` §3.1.

**Minimal-Card (Pflicht-Beispiel, Copy-Paste für Redakteur):**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis">
</div>
```

**Card mit Redakteur-Overrides (optional):**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="defaultRate:500, years:20">
</div>
```

**Card mit Config-Datei (falls Config-JSON extern gehostet wird):**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-config="https://www.finanzwesir.com/content/files/2026/prokrastinations-preis.config.json">
</div>
```

**Verboten in dieser Card:**
- Kein `data-app` (veralteter Namespace — BACKLOG AF-04)
- Kein `data-fw-theme` (reserviert, nicht produktiv)
- Kein freies JSON in `data-fw-options` (`data-fw-options='{"key":"val"}'` → verboten)
- Keine URLs außerhalb erlaubter Domains

---

## 8. data-fw-options-Whitelist

`prokrastinations-preis` unterstützt maximal 3 Inline-Overrides für Redakteure.

| Key | Typ | Default | Min | Max | Fallback bei ungültigem Wert |
|---|---|---|---|---|---|
| `defaultRate` | Integer | 300 | 50 | 2.000 | 300 (aus Config-JSON) |
| `years` | Integer | 30 | 5 | 50 | 30 (aus Config-JSON) |
| `delayYears` | Integer | 5 | 1 | 20 | 5 (aus Config-JSON) |

**Verarbeitungsregel:** Unbekannte Keys werden stillschweigend ignoriert (Whitelist-Prinzip, APP-INTERFACE.md §5, Q-02).

**`jahresrendite` ist kein Redakteurs-Override.** Die Rendite-Annahme ist eine fachliche Entscheidung, keine redaktionelle. Sie liegt im Config-JSON und wird in der AssumptionsBox erklärt.

**Keine weiteren Keys in `data-fw-options`.** Mehr als 3–4 Parameter gehören in eine Config-JSON-Datei (`data-fw-config`).

---

## 9. State-Modell

```
Init
  ├─ Slug-Prüfung: ungültig           → Error   (ungültiger data-fw-app-Slug)
  └─ loadConfig()  → Loading
                       → Content      (Normalfall)
                       → Error        (Config-JSON nicht parsebar; URL/Domain-Lock → Pilot-1 intern)
                       → Empty        (ungültige Wertekombination nach Berechnung)
```

| State | Bedingung | Ausgabe für Nutzer |
|---|---|---|
| Loading | App initialisiert, Config wird geladen | LoadingSkeleton: Platzhalter für Slider + KpiCards |
| Content | Config geladen, Werte valide, Berechnung erfolgreich | Vollständige App mit Slidern, KpiCards, LiveCounter, CTA |
| Error (a) | Config-JSON nicht parsebar (Pilot-1: intern gebündelt — kein Netz-Fetch; URL/Domain-Lock → Zukunft) | „Konfiguration konnte nicht geladen werden. Bitte Seite neu laden." — kein Stack-Trace, `textContent` |
| Error (b) | Ungültiger `data-fw-app`-Slug | „Diese App konnte nicht geladen werden. Bitte App-Konfiguration prüfen." — kein Stack-Trace, `textContent` (Entscheidung 5 ✅) |
| Empty | Config-Zustand nach Load nicht normalisierbar (z. B. `prokrastinationsJahre >= gesamtlaufzeit` trotz Clamp, Division durch 0) — Sicherheitsnetz, kein normaler Slider-Weg (→ §4) | „Diese Kombination ergibt keinen sinnvollen Vergleich. Bitte Werte anpassen." |

**Ungültiger `data-fw-options`-Wert:** Wert auf Default aus Config-JSON setzen. Kein Error-State, kein Warning für Endnutzer.

**Fehlender Container:** App-Start wird nicht ausgeführt. `console.warn` (kein User-facing Error — kein Container, keine Ausgabe).

**Ungültiger `data-fw-app`-Slug:** Error-State wird angezeigt. Meldung: „Diese App konnte nicht geladen werden. Bitte App-Konfiguration prüfen." — kein Stack-Trace, `textContent`. Kein Hinweis auf interne Slug-Struktur (Sicherheitsregel; Entscheidung 5 ✅).

---

## 10. AppContext-Schema — Calculator-Familie

Konkretisierung von Arch-06 nur für die Calculator-Familie. Keine globale Lösung für alle Familien erzwungen.

**Wer erzeugt AppContext:** `CalculatorStrategy` nach jeder Neuberechnung (auch bei Initialisierung mit Defaults).  
**Wer konsumiert AppContext:** Renderer (KpiCards, LiveCounter, ResultSentence, AssumptionsBox, A11y-Output). Chart: nicht in Pilot-1 Scope (SF-01).  
**Invariante (P-04):** Renderer interpretieren keine Rohdaten — sie lesen ausschließlich AppContext.

### 10.1 Statischer Kern (einmalig nach Config-Load gesetzt)

```js
{
  // Formatierungskontext
  valueMode: 'currency',       // 'currency' | 'percent' | 'number'
  currency: 'EUR',
  locale: 'de-DE',

  // Slider-Konfiguration für Renderer
  ranges: {
    monatlicheRate:       { min: 50,  max: 2000, step: 50  },
    gesamtlaufzeit:       { min: 5,   max: 50,   step: 1   },
    prokrastinationsJahre:{ min: 1,   max: 20,   step: 1   }
    // jahresrendite: kein Slider, kein Range-Eintrag (O-03 ✅ — Festwert aus Config)
  },

  // Annahmentexte (für AssumptionsBox)
  assumptions: {
    rendite:  '7 % p.a. nominal — historischer MSCI-World-Durchschnitt. Nicht garantiert.',
    nominal:  'Diese Rechnung ist nominal (ohne Inflationsbereinigung).',
    beratung: 'Keine Finanzberatung. Vergangenheitsrenditen sagen nichts über die Zukunft.'
  }
}
```

### 10.2 Dynamische Schale (nach jeder Neuberechnung aktualisiert)

```js
{
  // Eingaben nach Parsing und Validierung (reine Zahlen, P-05)
  monatlicheRate:          300,    // Integer, €/Monat
  gesamtlaufzeit:          30,     // Integer, Jahre
  prokrastinationsJahre:   5,      // Integer, Jahre
  jahresrendite:           0.07,   // aus Config-JSON (Festwert 7 % nominal), kein Nutzer-Slider (O-03 ✅)

  // Ergebnisse (reine Zahlen — keine Formatierung in Strategy, P-05)
  endwertSofort:           340000, // €
  endwertSpaeter:          220000, // €
  prokrastinationsPreis:   120000, // € — Hauptergebnis
  verloreneEinzahlungen:    18000, // € = monatlicheRate × prokrastinationsJahre × 12

  // chartData: kein Feld in Pilot-1 (SF-01 — Chart nach Pilot-1; ChartAdapter/API offen)

  // Semantische Felder (P-09, keine Hex-Werte)
  resultTone: 'neutral',   // Pilot-1: immer 'neutral' (O-01 ✅ entschieden)

  // A11y-Felder (P-08)
  a11ySummary:
    'Der Prokrastinations-Preis für 5 Jahre Wartezeit beträgt 120.000 €.',
  a11yInputSummary:
    'Monatsrate: 300 €. Laufzeit: 30 Jahre. Verzögerung: 5 Jahre. Rendite: 7 % p.a.'
}
```

### 10.3 Pflichtfelder und Fallbacks

| Feld | Pflicht | Fallback wenn fehlt |
|---|---|---|
| `valueMode` | ✅ | `'currency'` |
| `currency` | ✅ | `'EUR'` |
| `locale` | ✅ | `'de-DE'` |
| `ranges` | ✅ | Default-Ranges aus Spec |
| `assumptions` | ✅ | Leer-Objekt `{}` |
| `monatlicheRate` | ✅ | Default aus Config |
| `gesamtlaufzeit` | ✅ | Default aus Config |
| `prokrastinationsJahre` | ✅ | Default aus Config |
| `jahresrendite` | ✅ | Default aus Config |
| `endwertSofort` | ✅ | `0` |
| `endwertSpaeter` | ✅ | `0` |
| `prokrastinationsPreis` | ✅ | `0` |
| `verloreneEinzahlungen` | ✅ | `0` |
| `chartData` | Kein Feld in Pilot-1 | Verschoben → SF-01 (Chart-Adapter offen; nach Pilot-1) |
| `resultTone` | ✅ | `'neutral'` |
| `a11ySummary` | ✅ | `'Ergebnis wird berechnet.'` |
| `a11yInputSummary` | ✅ | `''` |

---

## 11. A11y-Vertrag — Calculator-Familie

Konkretisierung von Arch-07 nur für Calculator. Nicht global für alle Familien erzwungen.

### 11.1 Input-Labels

- Jeder Slider hat ein sichtbares `<label>`-Element mit `for`-Attribut
- Jedes `<input>` hat `aria-label` als Fallback wenn kein sichtbares `<label>` vorhanden
- Slider erhalten: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
  - Beispiel: `aria-valuetext="300 Euro pro Monat"` (nicht nur `"300"`)

### 11.2 ARIA Live Region bei Neuberechnung

```html
<div aria-live="polite"
     aria-atomic="true"
     data-fw-role="a11y-result"
     class="visually-hidden">
  Der Prokrastinations-Preis für 5 Jahre Wartezeit beträgt 120.000 €.
</div>
```

- `aria-live="polite"` — unterbricht keine laufende Sprachausgabe
- `aria-atomic="true"` — vollständige Nachricht wird vorgelesen, nicht nur geänderte Teile
- Aktualisierung nach Debounce (min. 300 ms) — kein Screenreader-Spam bei schnellem Slider-Bewegen
- Inhalt kommt aus `a11ySummary` im AppContext

### 11.3 Ergebnis-Summary als Text

`a11ySummary` aus AppContext (§10.2) wird in die Live Region geschrieben.  
Muster: `"Der Prokrastinations-Preis für {X} Jahre Wartezeit beträgt {Y} €."`

### 11.4 AssumptionsBox

- Annahmentexte sind HTML-Text (`textContent`), kein Bild, keine rein visuelle Darstellung
- Expand/Collapse erlaubt — Inhalt muss im collapsed State als `aria-expanded` korrekt markiert sein

### 11.5 KpiCards

- Semantisch als `<dl>` mit `<dt>` (Label) und `<dd>` (Wert) oder `<div role="group" aria-label="...">` mit sichtbarem Wert-Text
- Werte enthalten immer Einheit im Text: `"120.000 €"` nicht `"120.000"`

### 11.6 LiveCounter

- Wert muss textlich zugänglich sein (nicht nur animierte Zahl, sondern vollständiger Wert mit Einheit im DOM)
- `prefers-reduced-motion`: Animation wird deaktiviert, Endwert sofort angezeigt

### 11.7 Chart (Pilot-1 Ausblick)

Chart nicht in Pilot-1 Scope (SF-01 ✅ entschieden — Option A). A11y-Anforderungen werden mit Chart-Implementierung spezifiziert (nach Pilot-1; APP-INTERFACE.md §4 offen).

---

## 12. Reise eines Inputs / Datenpunkts

**Pflichtabschnitt nach P-10.**

**Beispiel:** Nutzer setzt die Monatliche Sparrate auf 300 € (Initialzustand / Default-Wert).

### Schritt 1 — Eingang

**Quelle A — Ghost-Card / data-fw-options:**
```html
<div class="fw-app" data-fw-app="prokrastinations-preis"
     data-fw-options="defaultRate:300, years:30">
```
Der Bootstrapper liest das Attribut `data-fw-options` als String: `"defaultRate:300, years:30"`.

**Quelle B — Config-JSON (einmalig beim Laden):**
`app.config.json` wird geladen; `defaults.monatlicheRate` = `300` als Fallback wenn kein Override gesetzt.

**Quelle C — UI-Slider-Interaktion (laufend):**
`input`-Event am Slider liefert `event.target.value = "300"` als DOM-String.

### Schritt 2 — Two-Step Parsing (P-02)

**Syntaktisch:**
```js
const rawValue = "300";         // String aus DOM oder Attribut
const parsed = parseInt(rawValue, 10);  // → 300
// Ist es NaN? Nein. Ist es Integer? Ja.
```

**Semantisch:**
```js
const min = config.ranges.monatlicheRate.min;  // 50
const max = config.ranges.monatlicheRate.max;  // 2000
const clamped = Math.min(max, Math.max(min, parsed)); // 300 — innerhalb Range
// Validiertes Ergebnis: monatlicheRate = 300
```

### Schritt 3 — Read-only AppData (P-01)

```js
const appData = Object.freeze({
  monatlicheRate: 300,
  gesamtlaufzeit: 30,
  prokrastinationsJahre: 5,
  jahresrendite: 0.07
});
// AppData ist nun unveränderlich. Strategy rechnet auf Basis dieser Werte.
```

### Schritt 4 — Calculator-Strategy (reine Zahlen, P-05)

```js
// Monatliche Rendite aus Jahresrendite
const r = Math.pow(1 + appData.jahresrendite, 1/12) - 1;  // ≈ 0.005654

// Future Value eines monatlichen Sparplans: PMT × ((1+r)^n - 1) / r
const fv = (pmt, r, n) => pmt * (Math.pow(1 + r, n) - 1) / r;

const n_sofort  = appData.gesamtlaufzeit * 12;                              // 360 Monate
const n_spaeter = (appData.gesamtlaufzeit - appData.prokrastinationsJahre) * 12; // 300 Monate

const endwertSofort  = fv(300, r, n_sofort);    // ≈ 340.000 €
const endwertSpaeter = fv(300, r, n_spaeter);   // ≈ 220.000 €

// Keine Formatierung hier — nur Zahlen.
```

### Schritt 5 — AppContext befüllen (P-04)

```js
const appContext = {
  ...staticContext,                        // valueMode, currency, locale, ranges, assumptions
  monatlicheRate: 300,
  gesamtlaufzeit: 30,
  prokrastinationsJahre: 5,
  jahresrendite: 0.07,
  endwertSofort: 340000,
  endwertSpaeter: 220000,
  prokrastinationsPreis: 120000,           // 340000 - 220000
  verloreneEinzahlungen: 18000,            // 300 × 5 × 12
  // chartData: kein Feld in Pilot-1 (SF-01)
  resultTone: 'neutral',
  a11ySummary:
    'Der Prokrastinations-Preis für 5 Jahre Wartezeit beträgt 120.000 €.',
  a11yInputSummary:
    'Monatsrate: 300 €. Laufzeit: 30 Jahre. Verzögerung: 5 Jahre. Rendite: 7 % p.a.'
};
```

### Schritt 6 — Renderer / Rehydrierung (P-05)

```js
const fmt = new Intl.NumberFormat('de-DE', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0
});

// KpiCard Prokrastinations-Preis:
fmt.format(appContext.prokrastinationsPreis); // → "120.000 €"

// LiveCounter animiert von vorherigem Wert zu 120.000 € (requestAnimationFrame)

// ResultSentence aus Template:
// "Wer 5 Jahre wartet, verzichtet auf ca. 120.000 €."
```

Kein Formatierungsstring wird durch die Berechnungsschicht gezogen — Zahl und Einheit reisen getrennt im AppContext.

### Schritt 7 — A11y-Ausgabe (P-08)

```js
// Live Region im DOM wird aktualisiert:
a11yRegion.textContent = appContext.a11ySummary;
// → "Der Prokrastinations-Preis für 5 Jahre Wartezeit beträgt 120.000 €."

// Screenreader liest beim nächsten Idle-Moment vor.

// Slider aria-Attribute:
slider.setAttribute('aria-valuenow', '300');
slider.setAttribute('aria-valuetext', '300 Euro pro Monat');
```

---

## 13. UX/UI-Primitiven

| Primitive | Zweck in dieser App | Status |
|---|---|---|
| Slider | Monatliche Rate, Laufzeit, Prokrastinationsjahre (3 Slider; Jahresrendite: Festwert, kein Slider — O-03 ✅) | ❓ zu bauen |
| KpiCard | endwertSofort, endwertSpaeter, prokrastinationsPreis, verloreneEinzahlungen | ❓ zu bauen |
| LiveCounter | Animierter prokrastinationsPreis bei Slider-Änderung | ❓ zu bauen |
| ResultSentence | Auto-generierter Ergebnissatz aus Config-Template | ❓ zu bauen |
| AssumptionsBox | Rendite-Annahme, nominal/real-Hinweis, Beratungshinweis | ❓ zu bauen |
| PrimaryCta | Funnel (Risiko-Übersetzer) oder Standalone (Sparplan starten) | ❓ zu bauen |
| ErrorState | Fehlermeldung bei Config-Ladefehler, auf Deutsch | ❓ zu bauen |
| LoadingSkeleton | Platzhalter während Init + Config-Load | ❓ zu bauen |
| 2-Linien-Chart | Nicht in Pilot-1 — verschoben bis ChartAdapter/API definiert | ⏸️ SF-01 — nach Pilot-1 |

**Scope-Fund SF-01 — Chart in Pilot-1:**

✅ Entschieden (O-02): Kein Chart in Pilot-1 — Option A (KPIs + LiveCounter als primäre Ausgabe). ChartAdapter/API-Frage bleibt offen (APP-INTERFACE.md §4). Chart-Implementierung nach Pilot-1 als eigener AP.

---

## 14. Sicherheitsregeln

Aus APP-INTERFACE.md §7 und SECURITY-BASELINE.md:

1. **Alle `data-*` Attribute sind untrusted input.** `data-fw-options`-Strings werden geparst und gegen Whitelist (§8) geprüft — keine direkte Verwendung im DOM.
2. **SafeDOM (Q-01):** KpiCard-Werte, ResultSentence, A11y-Summary — ausschließlich über `textContent`. Niemals `innerHTML` für Nutzdaten oder Config-Inhalte.
3. **Whitelist-Prinzip (Q-02):** Unbekannte `data-fw-options`-Keys werden ignoriert. Unbekannter `data-fw-app`-Slug → Error-State (Entscheidung 5 ✅; → §9).
4. **URL-Validierung:** Pilot-1 nutzt intern gebündeltes Config-JSON — kein Netz-Fetch, keine URL-Validierung nötig. Für spätere externe `data-fw-config`-URLs: Domain-Whitelist `www.finanzwesir.com`, Dev-Ausnahme `localhost`/`127.0.0.1`. Fehlschlag → Error-State, kein Crash.
5. **Config-JSON validieren** vor Verwendung: gültiges JSON? Pflichtfelder vorhanden? Wertebereiche sinnvoll?
6. **Keine externen Scripts.** Keine CDN-Abhängigkeiten — alle Abhängigkeiten lokal gebündelt (A-08).
7. **Keine geheimen Tokens.** Config-JSON enthält keine Credentials, keine API-Keys.
8. **Empty-State statt Crash.** Ungültige Wertekombinationen (z.B. prokrastinationsJahre ≥ gesamtlaufzeit) → sauberer Empty-State, kein JavaScript-Exception für Endnutzer.
9. **XSS-Schutz:** Alle nutzer- oder redakteursgesteuerten Werte werden als Zahlen geparst — keine String-Injektion möglich. Strings aus Config-Inhalte (Texte, Templates) via `textContent`, niemals via `innerHTML`.
10. **`data-fw-theme` nicht verwendet** — reserviert, noch nicht implementiert (APP-INTERFACE.md §3.1).

---

## 15. Testfälle

### Ghost-Card und Initialisierung

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-01 | Minimal-Card (`data-fw-app` only) lädt | App startet, Defaults aus Config geladen, Content-State sichtbar |
| T-02 | Card mit `data-fw-options="defaultRate:500, years:20"` | Slider-Startposition entspricht Override-Werten; Berechnung korrekt |
| T-03 | Ungültiger `data-fw-app`-Slug | Error-State: „Diese App konnte nicht geladen werden. Bitte App-Konfiguration prüfen." — kein Stack-Trace (Entscheidung 5 ✅) |
| T-04 | Unbekannter Key in `data-fw-options` | Wird ignoriert, App startet mit restlichen Werten normal |
| T-05 | Ungültiger Optionswert (`defaultRate:abc`) | Fallback auf Default-Wert aus Config, kein Error-State |
| T-06 | XSS-Versuch in Options (`defaultRate:<script>`) | Wert als NaN geparst → Fallback auf Default; kein Script-Aufruf |

### Slider-Interaktion und Berechnung

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-07 | Slider „Monatliche Rate" bewegen | KpiCards und LiveCounter aktualisieren sich sofort |
| T-08 | prokrastinationsJahre-Slider bis Maximum schieben | Wert wird auf `gesamtlaufzeit - 1` geclampt; App rechnet korrekt; kein Empty-State durch Slider-Bedienung (→ §4 Regel 3) |
| T-09 | prokrastinationsJahre = 1 (Minimum) | Kleiner Prokrastinations-Preis, App rechnet korrekt |
| T-10 | Alle 3 Slider auf Maximalwerte | App rechnet korrekt; kein Integer-Overflow |

### State-Tests

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-13 | Loading-State | LoadingSkeleton sichtbar, kein leerer weißer Container |
| T-14 | Config-JSON intern nicht parsebar (Syntaxfehler) | Error-State: „Konfiguration konnte nicht geladen werden. Bitte Seite neu laden." — kein Stack-Trace |
| T-15 | Config-Datei nicht valides JSON | Error-State |
| T-16 | Empty-State (ungültige Wertekombination) | Hinweistext auf Deutsch, kein Crash |

### Responsive / Viewport

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-18 | Mobile 375px | Alle Slider bedienbar, KpiCards lesbar, kein horizontaler Overflow |
| T-19 | Tablet 768px | Layout korrekt; Slider nicht zu klein zum Bedienen |
| T-20 | Desktop 1280px | Vollständiges Layout; alle Primitiven sichtbar |

### A11y

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-21 | Tastatur-Navigation | Tab durch alle Slider und Inputs; Slider mit Pfeiltasten bedienbar |
| T-22 | ARIA Live Region | Screenreader liest `a11ySummary` nach Slider-Änderung (polite) |
| T-23 | WCAG-AA-Kontrast | Alle Text/Hintergrund-Kombinationen ≥ 4.5:1 |
| T-24 | `prefers-reduced-motion` | LiveCounter-Animation deaktiviert, Endwert direkt angezeigt |
| T-25 | Slider `aria-valuetext` | Wert wird als lesbarer Text vorgelesen: „300 Euro pro Monat" |

### Nicht in Pilot-1 getestet / späterer Scope

| # | Thema | Grund |
|---|---|---|
| T-10/T-11 (alt) | Jahresrendite-Slider Minimum / Maximum | Kein Rendite-Slider in Pilot-1 (O-03 ✅) |
| T-17 (alt) | Externe `data-fw-config`-URL außerhalb erlaubter Domain | Keine externe Config-URL in Pilot-1 (AA-03) |
| — | Chart / ChartAdapter | SF-01 — nach Pilot-1, wenn ChartAdapter/API definiert |

---

## 16. Offene Fragen

### Blocker vor Spec-Gate

Keine echten Blocker. Alle kritischen Entscheidungen sind als Arbeitsannahmen dokumentiert.

### Arbeitsannahmen (dokumentiert, noch nicht von Albert bestätigt)

| ID | Annahme | Begründung | Risiko |
|---|---|---|---|
| AA-01 | Jahresrendite-Default: 7 % nominal | Historischer MSCI-World-Durchschnitt; weit verbreitet | Nutzer könnte Scheingenauigkeit wahrnehmen → AssumptionsBox Pflicht |
| AA-02 | Rechnung nominal (nicht real/inflationsbereinigt) | Einfacher erklärbar; Inflationshinweis in AssumptionsBox | Höhere absolute Zahlen — muss ehrlich kommuniziert werden |
| AA-03 | Formel: monatliche Verzinsung, Sparplan-Annuität | Standard-Finanzmathematik für monatliche Einzahlungen | Abweichung von jährlicher Verzinsung in NOTES dokumentieren |
| AA-04 | LiveCounter animiert bei Slider-Änderung, kein Real-Time-Tick | Kein Backend, kein persönlicher Startzeitpunkt bekannt | Verliert „tickende Kostenuhr"-Effekt — als spätere Erweiterung möglich |

### Entscheidungen für Albert

| ID | Frage | Entscheidung |
|---|---|---|
| O-01 ✅ | `resultTone: 'warning'` — ab welchem Prokrastinations-Preis? | Pilot-1: immer `'neutral'`. Warning-Schwelle per Config-JSON konfigurierbar nach Pilot-1 (→ §10.2). |
| O-02 ✅ | Chart in Pilot-1? | Option A — kein Chart. KPIs + LiveCounter als primäre Ausgabe. Chart nach Pilot-1 (SF-01). |
| O-03 ✅ | Jahresrendite als Slider oder Festwert? | Festwert 7 % nominal in Config-JSON. Kein Nutzer-Slider in Pilot-1 (→ §4, §6, §10). |

### Scope-Funde (späterer Backlog)

| ID | Thema |
|---|---|
| SF-01 | 2-Linien-Chart wenn ChartAdapter/API definiert (APP-INTERFACE.md §4) |
| SF-02 | NumericInput neben Slider für präzise Zahleneingabe |
| SF-03 | Real-Time-LiveCounter (tickende Kostenuhr) wenn Nutzereingabe Startdatum ermöglicht |
| SF-04 | Share-Feature für Ergebnis (02_OPEN_QUESTIONS.md UX-03) |

---

## 17. Spec-Gate-Checkliste

Vor Implementierungsbeginn müssen alle Punkte erfüllt sein. Führt Claude durch, Albert entscheidet.

| Prüfpunkt | Status |
|---|---|
| Ghost-Card-Vertrag aus APP-INTERFACE.md korrekt? (`data-fw-app` vorhanden, kein `data-app`, kein `data-fw-theme` produktiv) | ✅ §7 |
| AppContext mit Pflichtfeldern definiert? | ✅ §10 |
| Pflichtfelder und Fallback-Felder unterschieden? | ✅ §10.3 |
| `data-fw-options` whitelistbar? (Whitelist dokumentiert) | ✅ §8 |
| Datenquellen und Config-Strategie geklärt? | ✅ §6 (Config-JSON intern gebündelt für Pilot-1; Cache-Busting für externe URL → Zukunft) |
| Empty-State definiert? (kein leerer Container, kein Stack-Trace) | ✅ §9 |
| A11y-Vertrag für Calculator-Familie definiert? | ✅ §11 |
| Reise eines Inputs vollständig beschrieben? | ✅ §12 |
| Keine offenen Fragen stillschweigend entschieden? | ✅ §16 — alle Annahmen sichtbar markiert |
| Alberts explizites OK? | ⬜ AUSSTEHEND |
