# APP_SPEC — prokrastinations-preis

Stand: 2026-05-28 | Slice-0-Reboot V1.0 | Geändert von: Claude

---

## 1. Status

| Feld | Wert |
|---|---|
| Version | Draft V1.0 — Slice-0-Reboot (Marktzeit-Mechanik) |
| Phase | Pilot-1, Phase 2 — Spec |
| Nächster Schritt | `/heldenreise` anwenden → Spec-Gate → Pre-Code-Gate → Slice-0 |
| Kein Code-Freigabe-Dokument | Implementierung erst nach Spec-Gate + Pre-Code-Gate |
| Grundlage | `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md` |
| Ersetzt | APP_SPEC V0.3 (alte Prokrastinations-Preis-Mechanik — Verlustzähler/Festrendite) |

---

## 2. Zweck und Nutzerfrage

**Nutzerfrage:** „Der Zug ist doch abgefahren — oder lohnt es sich trotzdem noch?"

**Was soll die App auslösen:** Der Nutzer soll spüren, dass „heute" ein echter Entscheidungspunkt ist — nicht der zweitbeste Zeitpunkt, sondern der einzige verfügbare. Die echte historische Strecke (mit Einbrüchen) macht das erlebbar ohne glatte Zukunftsversprechen.

**Kernaussage:**
> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

Kurzform: „Warten nimmt dir Marktzeit."

**Was nicht Ziel dieser App ist:**
- Keine Renditeprojektion (keine glatte 6–8 %-Zukunftskurve)
- Kein moralischer Strafzettel / Verlustzähler-Ton als Hauptton
- Kein historischer Epochen-Fächer (das ist B2)
- Keine Kohortenanalyse
- Kein animierter Countdown als Hauptmechanik
- Keine Renditedebatte

---

## 3. App-Familie

**Klassifizierung: Szenario-/Vergleichs-App mit Storytelling-Elementen [Arbeitsannahme — Entscheidung E-01 → §17]**

Die neue B1-Mechanik (Marktzeit) ist kein reiner Calculator mehr. Sie kombiniert:
- Nutzer-Eingabe (monatliche Sparrate) — wie Calculator
- Historische Echtdaten mit echten Einbrüchen — wie Szenario-/Vergleichs-App
- Sequentielle 4-Screen-Narration — wie Storytelling-Dashboard

Abwägung nach 03_APP_FACTORY_STANDARD_DRAFT.md:

| Familie | Passt weil | Passt nicht weil |
|---|---|---|
| Calculator / Rechner-App | Nutzer gibt Sparrate ein | Kein Formel-Rechner mit Festrendite; braucht Echtdaten; kein LiveCounter als Hauptmechanik |
| Szenario-/Vergleichs-App | Daten laden → Chart → Erklärung → CTA; historische Strecke ist Kern | Kein Zeitraum-Slider; kein klassischer Szenario-Vergleich |
| Storytelling-Dashboard | Sequentielle Screens; narrativer Flow; Entscheidungspunkt | Kein reines Dashboard; Nutzer gibt Sparrate aktiv ein |

**Arbeitsannahme:** Szenario-/Vergleichs-App (historische Daten) mit Storytelling-Elementen (4 Screens).

**Konsequenz für Pilot-1-Strategie:** 05_PILOT_STRATEGY.md beschreibt B1 noch als „einfachsten Calculator ohne externe Daten". Die Marktzeit-Mechanik hat externe Daten, Chart und 4-Screen-Flow — die Komplexität steigt. Entscheidung E-02 (→ §17) erforderlich.

**Wiederverwendbare Bausteine, die dieser Pilot erzwingt:**
- JSON-Datenpipeline für historische Monatsdaten
- Chart mit historischer Sparplan-Linie (1 Datenserie)
- Screen-Flow-Mechanismus (4 Screens sequentiell)
- Entscheidungspunkt-Marker (vertikale Linie „heute")
- KpiCard (eingezahlt / Depotwert / Differenz)
- Slider für monatliche Sparrate
- Microcopy-Blöcke zwischen Screens

---

## 4. Bezug zur Produktlandkarte / Multi-Modul-Struktur

**Block B — Marktzeit statt Timing:**

| App | Rolle | App-Ordner |
|---|---|---|
| `prokrastinations-preis` | **Master-App** — Marktzeit-Entscheidungspunkt | `Apps/prokrastinations-preis/` |
| B2–B5 | Folge-Apps (Epochen, Depot-Kipppunkt etc.) | je eigener Ordner |

**Scope dieser Spec:** Nur `prokrastinations-preis` (B1).

**Abgrenzung zu B2 (Geburtsjahrlos):**
- B1: „Was mache ich mit dem verpassten Gestern und dem verfügbaren Heute?" → 1 historische Strecke, Entscheidungspunkt
- B2: „Wie unterschiedlich liefen 30 Jahre ETF-Sparen je nach Börsenepoche?" → Kohortenvergleich, Epochen-Fächer

---

## 5. Inputs

### 5.1 Nutzer-Eingaben

| Parameter | Typ | Default | Min | Max | Einheit | Validierungsregel |
|---|---|---|---|---|---|---|
| `monatlicheRate` | Integer | 300 | 50 | 2.000 | €/Monat | Ganzzahl; außerhalb Range → Clamp |
| `startBetrag` | Integer | 0 | 0 | 50.000 | € | Optional; Ganzzahl; außerhalb Range → Clamp |

**Zeitraum:** Fix 10 Jahre (120 Monate) — kein Nutzer-Parameter. Begründung: „Vor 10 Jahren wäre besser gewesen" ist eine konkrete emotionale Aussage. Ein variabler Zeitraum verwässert die Kernbotschaft.

### 5.2 Eingabewege

| Quelle | Parameter | Zeitpunkt |
|---|---|---|
| Slider (primär) | `monatlicheRate` | laufend bei Nutzerinteraktion |
| `data-fw-options` | `defaultRate`, `startBetrag` | einmalig beim Initialisieren |
| `data-fw-data` | JSON-Datei (MSCI-Monatsdaten) | einmalig beim Laden |

### 5.3 Validierungsregeln (Two-Step-Parsing, P-02)

1. Syntaktisch: Ist der Wert eine Zahl? Integer?
2. Semantisch: Liegt der Wert im erlaubten Bereich?
3. Bei Verletzung: Clamp auf Min/Max. Kein Error-State bei normalem Slider-Betrieb.

---

## 6. Outputs

| Output | UI-Primitive | Beschreibung |
|---|---|---|
| Historischer Chart | SparplanChart (1 Datenserie) | Simulierter Sparplan-Verlauf auf Basis echter MSCI-Monatsdaten |
| Entscheidungspunkt-Marker | VertikaleLinie | Markierung bei letztem Datenpunkt = „heute" |
| `eingezahlt` | KpiCard | `monatlicheRate × 120 + startBetrag` |
| `depotwertHeute` | KpiCard | Simulierter Depotwert am letzten Datenpunkt |
| `differenz` | KpiCard | `depotwertHeute − eingezahlt` (Gewinn oder Verlust) |
| Microcopy | TextBlock | Kontexttext pro Screen (aus MINI_SPEC) |
| PrimaryCta | Button/Link | „Heute Marktzeit sammeln" oder „Ich starte jetzt" [E-04 → §17] |
| A11y-Summary | ARIA Live Region | Screenreader-Zusammenfassung (→ §12) |

---

## 7. Datenbedarf

**Externe Datenpipeline: ja.** Im Unterschied zur alten Calculator-Mechanik braucht B1 (Marktzeit) historische MSCI-World-Monatsdaten.

### 7.1 Datenquelle

| Feld | Wert |
|---|---|
| Format | JSON-Array |
| Einbindung | `data-fw-data` (Ghost-Card-Attribut) |
| URL (Ziel) | `https://www.finanzwesir.com/content/files/2026/msci-world-monthly.json` [endgültige URL nach Upload] |
| Datenbasis-Quelle | **[TBD — Blocker B-01: Quelle und Normierungsformat offen → 02_OPEN_QUESTIONS.md Data-01]** |
| Zeitraum | Mindestens 120 Monate; letzter Eintrag = „heute" |

### 7.2 Erwartetes JSON-Schema (Arbeitsannahme AA-01)

```json
[
  { "month": "2016-01", "indexValue": 1234.56 },
  { "month": "2016-02", "indexValue": 1245.78 },
  ...
  { "month": "2026-04", "indexValue": 2567.89 }
]
```

Pflichtfelder pro Eintrag: `month` (String, Format `YYYY-MM`), `indexValue` (Number)
Mindestlänge: 120 Datenpunkte
Validierung: Felder vorhanden? Typen korrekt? ≥ 120 Punkte? → sonst Empty-State

### 7.3 Berechnungslogik — Arbeitsannahme (TBD B-02)

Anteilslogik (Arbeitsannahme — muss Albert bestätigen):

```
Startanteile = startBetrag / indexValue[0]
Für jeden Monat t:
  Anteile += monatlicheRate / indexValue[t]   // monatlicher Anteilskauf
  depotwert[t] = Anteile × indexValue[t]
```

Alternative: vereinfachte Annuität mit durchschnittlicher Monatsrendite. Entscheidung B-02 (→ §17) vor Implementierung erforderlich.

### 7.4 Cache-Busting

Versionsparameter in URL: `?v=2026-05` oder versionierter Dateiname.
Dev-Ausnahme: `localhost`/`127.0.0.1` erlaubt, als Dev-Ausnahme dokumentiert.

---

## 8. Ghost-Card-Vertrag

Gemäß `docs/spec/APP-INTERFACE.md` §3.1.

**Minimal-Card:**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="https://www.finanzwesir.com/content/files/2026/msci-world-monthly.json">
</div>
```

**Card mit Redakteur-Override (optional):**

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="https://www.finanzwesir.com/content/files/2026/msci-world-monthly.json"
     data-fw-options="defaultRate:500">
</div>
```

**Verboten in dieser Card:**
- Kein `data-app` (veralteter Namespace)
- Kein `data-fw-theme` (reserviert, nicht produktiv)
- Kein freies JSON in `data-fw-options`
- Keine URLs außerhalb erlaubter Domains

**Unterschied zur alten Spec:** Die neue Card hat zwingend `data-fw-data` für die JSON-Datendatei. Die alte Calculator-App hatte keine externe Datenquelle.

---

## 9. data-fw-options-Whitelist

| Key | Typ | Default | Min | Max | Fallback bei ungültigem Wert |
|---|---|---|---|---|---|
| `defaultRate` | Integer | 300 | 50 | 2.000 | 300 (interner Default) |
| `startBetrag` | Integer | 0 | 0 | 50.000 | 0 (interner Default) |

Unbekannte Keys: stillschweigend ignoriert (Whitelist-Prinzip, APP-INTERFACE.md §5).
Die Datenbasis kommt aus `data-fw-data`, nicht aus `data-fw-options`.

---

## 10. State-Modell

```
Init
  ├─ Slug-Prüfung: ungültig            → Error (a)
  └─ loadData(data-fw-data) → Loading
                               → Content    (≥ 120 valide Datenpunkte)
                               → Error (b)  (URL ungültig / Domain-Lock / JSON nicht parsebar)
                               → Empty      (JSON valide aber < 120 Punkte oder Pflichtfelder fehlen)
```

| State | Bedingung | Ausgabe für Nutzer |
|---|---|---|
| Loading | Daten werden geladen | Lade-Indikator (Skeleton oder Spinner), kein leerer Container |
| Content | Daten geladen und valide | Screen-Flow 1→2→3→4 mit Chart, KpiCards, CTA |
| Error (a) | Ungültiger `data-fw-app`-Slug | „Diese App konnte nicht geladen werden. Bitte App-Konfiguration prüfen." — `textContent`, kein Stacktrace |
| Error (b) | URL ungültig / Domain-Lock / JSON nicht parsebar | „Daten konnten nicht geladen werden. Bitte Seite neu laden." — `textContent`, kein Stacktrace |
| Empty | JSON valide, aber < 120 Datenpunkte oder Pflichtfelder fehlen | „Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen." — `textContent`, kein Stacktrace |

**Ungültige `data-fw-options`-Werte:** Fallback auf internen Default, kein Error-State.

---

## 11. AppContext-Schema

**Wer erzeugt AppContext:** `MartketimeStrategy` nach Datenladen und bei jeder Nutzer-Eingabe.
**Wer konsumiert AppContext:** Renderer (SparplanChart, KpiCards, TextBlocks, A11y-Output, PrimaryCta).
**Invariante (P-04):** Renderer interpretieren keine Rohdaten — sie lesen ausschließlich AppContext.

### 11.1 Statischer Kern (einmalig nach Datenladen gesetzt)

```js
{
  valueMode: 'currency',
  currency: 'EUR',
  locale: 'de-DE',
  periodMonths: 120,               // fest: 10 Jahre
  msciData: [...],                 // read-only Array, ≥ 120 Einträge
  latestMonth: '2026-04',          // letzter Datenpunkt = „heute"
  startMonth:  '2016-05'          // latestMonth − 119 Monate
}
```

### 11.2 Dynamische Schale (nach jeder Nutzer-Eingabe aktualisiert)

```js
{
  monatlicheRate: 300,             // Integer, €/Monat, validiert
  startBetrag:    0,               // Integer, €, validiert

  chartSeries: [                   // simulierter Depotwert pro Monat (reine Zahlen)
    { month: '2016-05', depotwert: 300 },
    ...
    { month: '2026-04', depotwert: 52000 }
  ],
  eingezahlt:      36000,          // monatlicheRate × 120 + startBetrag
  depotwertHeute:  52000,          // letzter Punkt in chartSeries
  differenz:       16000,          // depotwertHeute − eingezahlt

  resultTone:   'neutral',         // V1.0: immer 'neutral'
  a11ySummary:  'Wer vor 10 Jahren 300 € monatlich investiert hätte, hätte heute 52.000 € — bei 36.000 € eingezahlt.'
}
```

### 11.3 Pflichtfelder und Fallbacks

| Feld | Pflicht | Fallback wenn fehlt |
|---|---|---|
| `valueMode` | ✅ | `'currency'` |
| `currency` | ✅ | `'EUR'` |
| `locale` | ✅ | `'de-DE'` |
| `periodMonths` | ✅ | 120 |
| `msciData` | ✅ | Empty-State |
| `latestMonth` | ✅ | letzter Eintrag aus `msciData` |
| `startMonth` | ✅ | berechnet aus `latestMonth − 119` |
| `monatlicheRate` | ✅ | 300 |
| `startBetrag` | ✅ | 0 |
| `chartSeries` | ✅ | Empty-State wenn Berechnung fehlschlägt |
| `eingezahlt` | ✅ | 0 |
| `depotwertHeute` | ✅ | 0 |
| `differenz` | ✅ | 0 |
| `resultTone` | ✅ | `'neutral'` |
| `a11ySummary` | ✅ | `'Ergebnis wird berechnet.'` |

---

## 12. A11y-Vertrag

### 12.1 ARIA Live Region

```html
<div aria-live="polite"
     aria-atomic="true"
     data-fw-role="a11y-result"
     class="visually-hidden">
  Wer vor 10 Jahren 300 € monatlich investiert hätte, hätte heute 52.000 € — bei 36.000 € eingezahlt.
</div>
```

- `aria-live="polite"` — unterbricht keine laufende Sprachausgabe
- `aria-atomic="true"` — vollständige Nachricht wird vorgelesen
- Aktualisierung nach Slider-Release (kein Screenreader-Spam)

### 12.2 Chart-Accessibility

- Chart hat `role="img"` mit `aria-label` oder `<figure>` mit `<figcaption>`
- Figcaption enthält Textzusammenfassung: Zeitraum, Sparrate, Ergebnis
- Datentabelle als ergänzende Alternative: [TBD — ob für Pilot nötig]

### 12.3 Slider

- Sichtbares `<label>` mit `for`-Attribut
- `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- Beispiel: `aria-valuetext="300 Euro pro Monat"`

### 12.4 KpiCards

- `<dl>` mit `<dt>` (Label) und `<dd>` (Wert) oder `<div role="group" aria-label="...">`
- Werte mit Einheit: „52.000 €", nicht „52.000"

### 12.5 prefers-reduced-motion

- Chart-Zeichenanimation deaktiviert, Chart sofort vollständig gezeigt
- Screen-Flow-Übergänge deaktiviert, direkt Zielzustand

### 12.6 Screen-Flow-Navigation

- Jeder Screen hat eine sichtbare `<h2>`-Überschrift
- Fokus-Management bei Screen-Wechsel: Fokus auf neue Überschrift setzen
- Tastatur-Navigation: alle 4 Screens erreichbar (Tab, Enter)

---

## 13. Reise eines Inputs / Datenpunkts

**Pflichtabschnitt nach P-10.**

**Beispiel:** JSON-Datei geladen, Nutzer stellt monatlicheRate = 300 € ein.

### Schritt 1 — Eingang

**Quelle A — data-fw-data (Ghost-Card):**
URL wird als String gelesen. Domain-Validierung: muss `finanzwesir.com` enthalten.

**Quelle B — data-fw-options:**
String `"defaultRate:300"` → geparst zu `{ defaultRate: 300 }`, gegen Whitelist geprüft.

**Quelle C — UI-Slider:**
`input`-Event liefert `event.target.value = "300"` als DOM-String.

### Schritt 2 — Parsing und Validierung

**JSON-Daten:**
```js
const raw = await fetch(validatedUrl).then(r => r.json());
// Ist es ein Array? Hat es ≥ 120 Einträge?
// Hat jeder Eintrag 'month' (string) und 'indexValue' (number)?
// Fehler → Error-State (b) oder Empty-State
```

**Nutzer-Eingabe monatlicheRate:**
```js
const parsed  = parseInt(event.target.value, 10);     // "300" → 300
const clamped = Math.min(2000, Math.max(50, parsed));  // 300 — innerhalb Range
```

### Schritt 3 — Read-only AppData (P-01)

```js
const appData = Object.freeze({
  monatlicheRate: 300,
  startBetrag:    0,
  msciData:       [...120 validierte Datenpunkte]
});
```

### Schritt 4 — MarktzetStrategy (reine Zahlen, P-05)

```js
// Anteilslogik (Arbeitsannahme AA-01, TBD B-02)
let anteile = appData.startBetrag / appData.msciData[0].indexValue;
const chartSeries = appData.msciData.map(p => {
  anteile += appData.monatlicheRate / p.indexValue;
  return { month: p.month, depotwert: anteile * p.indexValue };
});
const eingezahlt     = appData.monatlicheRate * 120 + appData.startBetrag;
const depotwertHeute = chartSeries[119].depotwert;
const differenz      = depotwertHeute - eingezahlt;
// Keine Formatierung in Strategy — nur Zahlen.
```

### Schritt 5 — AppContext befüllen (P-04)

```js
const appContext = {
  ...staticContext,
  monatlicheRate, startBetrag,
  chartSeries, eingezahlt, depotwertHeute, differenz,
  resultTone: 'neutral',
  a11ySummary: `Wer vor 10 Jahren ${monatlicheRate} € monatlich investiert hätte, hätte heute ${fmt(depotwertHeute)} — bei ${fmt(eingezahlt)} eingezahlt.`
};
```

### Schritt 6 — Renderer (P-05)

```js
const fmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

// SparplanChart: chartSeries → x: month, y: depotwert
// KpiCard: fmt.format(depotwertHeute)  → "52.000 €"
// KpiCard: fmt.format(eingezahlt)      → "36.000 €"
// KpiCard: fmt.format(differenz) mit Vorzeichen → "+16.000 €"
```

### Schritt 7 — A11y-Ausgabe (P-08)

```js
a11yRegion.textContent = appContext.a11ySummary;
slider.setAttribute('aria-valuenow', '300');
slider.setAttribute('aria-valuetext', '300 Euro pro Monat');
```

---

## 14. UX/UI-Primitiven

### 14.1 Screen-Flow (4 Screens)

Die App ist kein Single-Screen-Calculator. Sie führt den Nutzer durch 4 sequentielle narrative Screens.

| Screen | Überschrift (aus MINI_SPEC) | Hauptelement |
|---|---|---|
| 1 — Frage | „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?" | Slider (monatliche Rate) + Subtext |
| 2 — Echte Vergangenheit | „Das wäre kein gerader Weg gewesen. Aber es wäre Marktzeit gewesen." | SparplanChart + KpiCards |
| 3 — Heute | „Vor 10 Jahren ist weg. Heute nicht." | SparplanChart mit VertikaleLinie bei „heute" |
| 4 — Entscheidung | „Wenn du jetzt wieder wartest, wird heute in zehn Jahren wieder der verpasste Zeitpunkt sein." | Microcopy + PrimaryCta |

### 14.2 UI-Primitive-Liste

| Primitive | Zweck | Status |
|---|---|---|
| Slider | monatliche Sparrate (Haupt-Eingabe) | zu bauen |
| SparplanChart | historische Depotwert-Linie (1 Datenserie) | zu bauen — Chart-Engine-Frage SF-01 |
| VertikaleLinie | Entscheidungspunkt-Marker „heute" im Chart | zu bauen |
| KpiCard | eingezahlt / depotwertHeute / differenz | zu bauen |
| TextBlock | Microcopy pro Screen (aus MINI_SPEC) | zu bauen |
| PrimaryCta | „Heute Marktzeit sammeln" / „Ich starte jetzt" | zu bauen |
| ErrorState | Fehlermeldung auf Deutsch | zu bauen |
| LoadingSkeleton | Platzhalter während Datenladen | zu bauen |

### 14.3 Screen-Übergänge

Mechanismus: [TBD — Scroll-triggered, Button-triggered oder Autoplay? → B-03]
prefers-reduced-motion: Übergänge deaktiviert, direkt Zielzustand.

### 14.4 Label-Konventionen (Krug — Alltagssprache)

| Intern | UI-Label | Begründung |
|---|---|---|
| `monatlicheRate` | „Ich spare monatlich" / „Monatsrate" | handlungsbezogen, Ich-Form |
| `startBetrag` | „Startbetrag (optional)" | ehrlich optional halten |
| `eingezahlt` | „Eingezahlt" | direkt |
| `depotwertHeute` | „Depotwert heute" | konkret, zeitbezogen |
| `differenz` | „Gewinn / Verlust" | wertneutral, beide Richtungen möglich |

---

## 15. Sicherheitsregeln

Aus APP-INTERFACE.md §7 und SECURITY-BASELINE.md:

1. **Alle `data-*` Attribute sind untrusted input** — ohne Ausnahme.
2. **URL-Validierung (data-fw-data):** Domain muss `www.finanzwesir.com` enthalten. Dev-Ausnahme: `localhost`/`127.0.0.1`. Fehlschlag → Error-State (b), kein Crash.
3. **SafeDOM (Q-01):** KpiCard-Werte, TextBlocks, A11y-Summary — ausschließlich `textContent`. Niemals `innerHTML` für Nutzdaten.
4. **JSON validieren:** Format, Pflichtfelder, Mindestlänge (≥ 120). Fehler → Empty-State oder Error-State.
5. **Whitelist-Prinzip (Q-02):** Unbekannte `data-fw-options`-Keys werden ignoriert. Unbekannter Slug → Error-State (a).
6. **Keine externen Scripts.** Alle Abhängigkeiten lokal gebündelt.
7. **Keine geheimen Tokens.** Kein API-Key, keine Credentials in Code oder Config.
8. **Empty-State statt Crash.** Ungültige Daten → sauberer Fehlerzustand, kein Stacktrace für Endnutzer.
9. **XSS-Schutz:** Optionswerte werden als Zahlen geparst — keine String-Injektion. Chart-Datenpunkte kommen aus validiertem JSON, nicht aus DOM-Input.
10. **`data-fw-theme` nicht verwendet** — reserviert, nicht produktiv einsetzen.

**Security-Sync-Status:** synchron mit Nicht-Blockern.
Begründung: Die Erweiterung auf externe JSON-Daten via `data-fw-data` ist in APP-INTERFACE.md §6 bereits vorgesehen. Keine neue globale Sicherheitsregel nötig. URL-Validierungsregeln und Domain-Lock gelten unverändert.

---

## 16. Testfälle

### Ghost-Card und Datenladen

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-01 | Minimal-Card mit gültiger `data-fw-data`-URL | Loading → Content (Screen 1 sichtbar) |
| T-02 | Ungültiger `data-fw-app`-Slug | Error-State (a), nutzerfreundliche Meldung auf Deutsch |
| T-03 | `data-fw-data`-URL mit ungültiger Domain | Error-State (b) |
| T-04 | `data-fw-data`-URL unerreichbar (404, Netzwerkfehler) | Error-State (b) |
| T-05 | JSON syntaktisch ungültig | Error-State (b) |
| T-06 | JSON < 120 Datenpunkte | Empty-State |
| T-07 | JSON mit fehlenden `indexValue`-Feldern | Empty-State |
| T-08 | Unbekannter Key in `data-fw-options` | Ignoriert, App normal |
| T-09 | `defaultRate:abc` (ungültiger Typ) | Fallback auf Default (300) |
| T-10 | XSS-Versuch in `data-fw-options` (`defaultRate:<script>`) | NaN → Fallback; kein Script-Aufruf |

### Slider-Interaktion und Berechnung

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-11 | Slider monatliche Rate bewegen | Chart und KpiCards aktualisieren sich |
| T-12 | Slider auf Maximalwert (2.000 €) | Berechnung korrekt, kein Crash |
| T-13 | Slider auf Minimalwert (50 €) | Berechnung korrekt |

### Screen-Flow

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-14 | Screen-Flow 1→2→3→4 durchlaufen | Alle 4 Screens erreichbar, Inhalte korrekt |
| T-15 | Screen 3 — Entscheidungspunkt-Marker | VertikaleLinie bei letztem Datenpunkt sichtbar |

### State-Tests

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-16 | Loading-State | Lade-Indikator sichtbar, kein leerer Container |
| T-17 | Error-State (b) | Meldung auf Deutsch, kein Stacktrace |
| T-18 | Empty-State | Hinweistext auf Deutsch, kein Crash |

### Responsive / Viewport

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-19 | Mobile 375px | Slider bedienbar, Chart lesbar, kein horizontaler Overflow |
| T-20 | Tablet 768px | Layout korrekt |
| T-21 | Desktop 1280px | Vollständiges Layout |

### A11y

| # | Testfall | Erwartetes Verhalten |
|---|---|---|
| T-22 | Tastatur-Navigation | Tab durch Slider; Screen-Wechsel per Tastatur möglich |
| T-23 | ARIA Live Region | a11ySummary nach Slider-Änderung vorgelesen (polite) |
| T-24 | WCAG-AA-Kontrast | Alle Text/Hintergrund-Kombinationen ≥ 4.5:1 |
| T-25 | prefers-reduced-motion | Chart-Animation und Übergänge deaktiviert |
| T-26 | Chart-Alternativtext | role="img" oder figcaption mit beschreibendem Text |

---

## 17. Offene Fragen

### Blocker (vor Implementierungsbeginn zu klären)

| ID | Frage | Konsequenz wenn nicht geklärt |
|---|---|---|
| B-01 | **MSCI-Daten: Quelle und Normierungsformat?** (02_OPEN_QUESTIONS.md Data-01) — Woher kommen die historischen MSCI-World-Monatsdaten? Welches JSON-Schema? Absoluter Indexwert oder normiert? | Keine Datenpipeline, kein Chart, keine Berechnung |
| B-02 | **Berechnungsformel für simulierten Sparplan:** Anteilslogik (kaufe monatlich Anteile) oder vereinfachte Annuität mit Durchschnittsrendite? | Falsche oder irreführende Zahlen in Chart und KpiCards |
| B-03 | **Screen-Flow-Mechanismus:** Scroll-triggered, Button-triggered oder Autoplay? | UX-Struktur unklar — direkte Auswirkung auf Implementierung |

### Entscheidungsfragen für Albert

| ID | Frage | Arbeitsannahme |
|---|---|---|
| E-01 | **App-Familie:** Szenario-/Vergleichs-App oder Hybrid? | Szenario-/Vergleichs-App mit Storytelling-Elementen |
| E-02 | **Pilot-1-Scope:** Die Marktzeit-Mechanik ist komplexer als der alte Calculator (externe Daten, Chart, 4 Screens). Bleibt B1 Pilot-1, oder wird ein einfacherer App (z. B. `risiko-uebersetzer`) vorgezogen? | B1 bleibt Pilot-1 — Marktzeit ist die zentrale Botschaft |
| E-03 | **Startbetrag als Eingabe:** Ja (Optional-Slider/Eingabe) oder nein (zu viel UX-Aufwand)? | Ja, optional mit Default 0 |
| E-04 | **CTA-Text:** „Heute Marktzeit sammeln" oder „Ich starte jetzt"? | TBD — nach `/heldenreise` entscheiden |

### Pilot-Strategie-Konflikt (explizit sichtbar)

05_PILOT_STRATEGY.md beschreibt B1 noch als:
> „Einfachster Calculator, keine externen Daten, erzwingt Slider/KPI/Counter/CTA-Standard"

Die neue Marktzeit-Mechanik hat: externe JSON-Daten (MSCI-World), Chart mit historischer Linie, 4-Screen-Flow.

→ 05_PILOT_STRATEGY.md muss nach Alberts Entscheid zu E-02 aktualisiert werden.

### Nicht-Blocker / Scope-Funde

| ID | Thema |
|---|---|
| SF-01 | Chart-Engine-Integration: welche Bibliothek / welche Komponente für SparplanChart? — nach B-01 und Pilot-Entscheid |
| SF-02 | NumericInput neben Slider für präzise Eingabe — nach Pilot |
| SF-03 | Varianten-Funktion: verschiedene Startpunkte vergleichen — nach Pilot |
| SF-04 | Share-Feature — nach Pilot |

---

## 18. Spec-Gate-Checkliste

| Prüfpunkt | Status |
|---|---|
| Ghost-Card-Vertrag korrekt? (`data-fw-app`, `data-fw-data`, kein `data-app`, kein produktives `data-fw-theme`) | ✅ §8 |
| Kein data-app? | ✅ §8 |
| Kein produktives data-fw-theme? | ✅ §15 |
| data-fw-options whitelistbar? (Whitelist dokumentiert) | ✅ §9 |
| Datenquellen und Cache-Busting geklärt? | ⚠️ Schema definiert (AA-01), Datenbasis-Quelle TBD (B-01) |
| AppContext definiert? | ✅ §11 |
| Pflichtfelder und Fallback-Felder unterschieden? | ✅ §11.3 |
| A11y-Vertrag definiert? | ✅ §12 |
| State-Modell definiert? | ✅ §10 |
| Reise eines Inputs vollständig beschrieben? | ✅ §13 |
| Sicherheitsregeln erfüllt? Security-Sync synchron? | ✅ §15 — synchron mit Nicht-Blockern |
| Keine offenen Blocker stillschweigend entschieden? | ✅ §17 — alle Blocker explizit markiert |
| Mini-Spec vollständig berücksichtigt? | ✅ alle Screens, Microcopy, Datenlogik, Abgrenzungen übernommen |
| Offene Blocker für Spec-Gate? | ⚠️ B-01 / B-02 / B-03 sind Implementierungsblocker, kein Spec-Gate-Blocker |
| Alberts explizites OK? | ⬜ AUSSTEHEND |

**UX-Gate (heldenreise):** ✅ angewendet → §19

| UX-Prüfpunkt | Status |
|---|---|
| Gewohnte Welt benannt? | ✅ §19.1 |
| Nutzerwiderstand benannt? | ✅ §19.2 |
| Interaktiver Beweis klar? | ✅ §19.3 |
| Aha-Moment in einem Satz? | ✅ §19.4 |
| Genau eine Hauptzahl / Hauptvisualisierung? | ✅ §19.6 |
| Keine Dark Patterns? | ✅ §19.5, §19.8, §19.9 |
| Labels in Alltagssprache (Krug)? | ✅ §14.4 |
| Funnel-Anschluss logisch? | ✅ §19.10 |
| Ethik-Gate bestanden? | ✅ §19.8 |

---

*Nächster Schritt: NAVIGATION.md Ausnahme-B1-Warnung aktualisieren → Spec-Gate*

---

## 19. Beweisdramaturgie / Entscheidungspsychologie

*Pflichtabschnitt nach `/heldenreise`-Skill.*

### 19.1 Gewohnte Welt / Vorannahme

Der Nutzer kommt mit einer von zwei Vorannahmen:

**Variante A — Verpasster Zug:**
> „Vor zehn Jahren wäre es ideal gewesen. Jetzt ist der Moment vorbei. Die Märkte sind zu hoch."

**Variante B — Wartestrategie:**
> „Ich warte noch. Es könnte günstiger werden. Ich will keinen schlechten Zeitpunkt erwischen."

Beide teilen dieselbe Illusion: **Es gibt einen richtigen Zeitpunkt — und dieser ist nicht heute.**

### 19.2 Nutzerwiderstand

| Widerstand | Mechanismus |
|---|---|
| Verpasster-Zug-Syndrom | „Die guten Jahre sind vorbei. Ich bin zu spät." |
| Timing-Glaube | „Ich warte auf die nächste Korrektur." |
| Paralysis by analysis | Zu viele Informationen, keine Entscheidung |
| Einbruchs-Angst | „Was, wenn ich jetzt einsteige und der Markt fällt?" |
| Perfektionismus | „Ich muss erst mehr verstehen. Noch nicht." |
| Unsichtbarer Zinseszins | Exponentielle Wirkung ist intuitiv nicht greifbar — lineare Intuition unterschätzt sie |

### 19.3 Interaktiver Beweis

Nicht eine Formel. Nicht eine Prognose. Sondern: die echte historische Strecke der letzten 10 Jahre — mit echten Einbrüchen, nicht geglättet.

Der Nutzer setzt seine monatliche Sparrate (Screen 1). Die App zeigt: So hätte **sein** Sparplan in den letzten 10 Jahren ausgesehen (Screen 2). Nicht als abstrakte Marktgrafik — als personalisierte Reise: seine 300 € × diese 120 Monate = dieser konkrete Verlauf.

**Was beweist das:**
1. Einbrüche passierten — und die Strecke endete trotzdem positiv.
2. Wer vor 10 Jahren gestartet wäre, hätte Einbrüche mitgemacht — und stünde heute trotzdem besser da als ohne.
3. Heute ist nicht „nach dem richtigen Zeitpunkt" — heute ist der Ausgangspunkt für die nächsten 10 Jahre.

Screen 3 macht den Pivot sichtbar: Eine vertikale Linie bei „heute" trennt Vergangenheit von Entscheidung. Die Vergangenheit ist abgeschlossen. Die Entscheidung gehört dem Nutzer.

### 19.4 Aha-Moment

**Primär:**
> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

**Kurzform:**
> „Warten nimmt dir Marktzeit."

Ein Satz. Alltagssprache. Kein Fachbegriff. Kein Vorwurf.

### 19.5 Emotionale Zielreaktion

**Erwünscht:**
- „Die Einbrüche sehen auf der Langfristgrafik gar nicht mehr so groß aus." — Relativierung der Angst
- „Wer vor 10 Jahren gestartet wäre, hätte die Einbrüche mitgemacht — und wäre trotzdem besser dran." — Kontext für Timing-Glaube
- „Heute ist mein ‚vor 10 Jahren'." — Handlungsfähigkeit
- „Ich muss nicht den perfekten Zeitpunkt finden. Ich muss anfangen." — Erlaubnis ohne Druck

**Unerwünscht:**
- Scham: „Ich hätte schon vor Jahren anfangen sollen."
- Panik: „Jetzt muss ich sofort handeln."
- Selbstvorwurf, künstliche Dringlichkeit, Überforderung durch zu viele Zahlen.

### 19.6 Erkenntnishierarchie

| Ebene | Element | Darstellung |
|---|---|---|
| **Hauptbeweis** | SparplanChart — die historische Strecke | visuell dominant, volle Breite, Screen 2 und 3 |
| **Pivot** | VertikaleLinie „heute" | klar markiert in Screen 3 |
| **Hauptzahl** | `depotwertHeute` | groß unter dem Chart — positiv formuliert |
| **Kontext** | `eingezahlt`, `differenz` | KpiCards — erklären, konkurrieren nicht |
| **Rahmung** | Microcopy pro Screen | kurz, führt die Erkenntnis |
| **Handlung** | PrimaryCta | nach dem Beweis |

**Tufte-Regel:** Der Chart ist der Beweis, nicht Dekoration. `depotwertHeute` ist die Hauptzahl (positiv: „was du hättest"). `differenz` ist Kontextinformation — nicht als Hauptzahl (Verlust-Framing vermeiden).

### 19.7 Dramaturgische UI-Reihenfolge

| Screen | Heldenreise-Rolle | Inhalt |
|---|---|---|
| **1 — Frage** | Ruf zum Abenteuer | Überschrift: „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?" / Slider monatliche Rate / Subtext: „Wir rechnen mit echten MSCI-World-Monatsdaten." |
| **2 — Beweis** | Schwelle überwunden | Chart: historische Sparplan-Strecke / KpiCards / Microcopy: „Das wäre kein gerader Weg gewesen. Aber es wäre Marktzeit gewesen." |
| **3 — Pivot** | Aha-Moment | Selber Chart + VertikaleLinie „heute" / Text: „Vor 10 Jahren ist weg. Heute nicht." |
| **4 — Entscheidung** | Rückkehr / CTA | Microcopy: „Wenn du jetzt wieder wartest, wird heute in zehn Jahren wieder der verpasste Zeitpunkt sein." / PrimaryCta |

**Slider steht in Screen 1** — bevor der Chart erscheint. Der Nutzer personalisiert zuerst (seine Rate), dann sieht er den personalisierten Beweis. Das macht Screen 2 zu „seiner" Reise, nicht zu einem abstrakten Marktchart.

### 19.8 Ehrlichkeitsregeln

1. **Echte Daten mit echten Einbrüchen.** Keine bereinigten oder geglätteten Kurven.
2. **Nur ein Zeitfenster.** Die App zeigt genau das aktuellste 10-Jahres-Fenster. Ein anderes Fenster könnte anders aussehen.
3. **Keine Zukunftsaussage.** Screen 4 enthält keine Prognose. Kein „so wird es laufen."
4. **Vergangenheit ≠ Zukunft.** Sichtbarer Hinweis in AssumptionsBox Pflicht.
5. **Keine Finanzberatung.** Hinweis in AssumptionsBox.
6. **Offenlegungs-Test:** Wenn dem Nutzer erklärt wird, warum die App so gestaltet ist — würde er sich geholfen oder manipuliert fühlen? Antwort muss „geholfen" sein.

**AssumptionsBox (immer sichtbar, Screen 2 oder 3):**
> „Basis: MSCI World, monatliche Daten, letzter verfügbarer Monat = heute, 10 Jahre rückwärts. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft. Keine Finanzberatung."

### 19.9 Bewusst nicht in dieser App

| Weggelassen | Grund |
|---|---|
| Zukunftsprognose als Chart | Keine belastbare Grundlage; erzeugt Scheingenauigkeit |
| Mehrere Zeitfenster-Vergleich | Das ist B2 (Geburtsjahrlos / Epochen-Fächer) |
| Rendite-Angabe in % | Würde Renditedebatte auslösen — nicht Thema dieser App |
| Inflationsbereinigung | Erhöht kognitive Last ohne Kernaussage zu stärken |
| Animierter Countdown / tickende Uhr | Fake-Urgency — Dark-Pattern-Grenze |
| „Günstiger Einstieg"-Hinweis | Würde Timing-Glauben verstärken statt auflösen |
| Startbetrag als Haupteingabe | Lenkt von Kernbotschaft ab; nur optionaler Input |

### 19.10 Funnel-Anschluss

**Was der Nutzer nach dieser App weiß:**
Warten ist keine neutrale Position. Die vergangene Marktzeit ist unwiederbringlich. Heute ist der Ausgangspunkt für die nächsten 10 Jahre.

**Welche Frage entsteht danach logisch:**
> „Verstanden. Aber ich habe Angst vor Einbrüchen. Wie viel Risiko halte ich eigentlich aus?"

**Nächste App:** `risiko-uebersetzer` (Pilot-2)

**CTA-Text-Empfehlung:** „Heute Marktzeit sammeln →"

Begründung: „Marktzeit" ist der Kernbegriff dieser App — der CTA wiederholt das Gelernte als Handlungsimpuls. Kein Imperativ wie „Jetzt handeln!" (vermeidet Druck-Formulierung).
