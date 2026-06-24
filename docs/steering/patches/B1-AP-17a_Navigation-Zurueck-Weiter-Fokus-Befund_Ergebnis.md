# B1-AP-17a Ergebnis

Stand: 2026-06-24 | Session: B1-AP-17a | Geändert von: Claude

---

## Geänderte Dateien

- `docs/steering/patches/B1-AP-17a_Navigation-Zurueck-Weiter-Fokus-Befund_Ergebnis.md` (neu, dieses Protokoll)

---

## Ziel / Ergebnis

Befund-AP: Statische Analyse von Navigation, Zurück-/Weiter-Pfaden, Focus-Handling, State-Flow und Endwissensgrenze der App `Apps/prokrastinations-preis/app.js`.

Ergebnis: Hauptflow korrekt und robust. Drei nicht-blockierende GELB-Befunde. Kein ROT. Keine Reparatur durchgeführt.

---

## Arbeitsbaum

- **git status --short:** ` M .claude/learning/session-log.md`
- **Erwartete AP-16-Änderungen in app.js:** ALLE vorhanden und committed (kein offenes M in app.js)
- **Unerwartete Änderungen:** keine
- **AP-16-Ergebnisprotokolle:**
  - `B1-AP-16a_Reveal-Transfer-Contract-Audit_Ergebnis.md` — EXISTS
  - `B1-AP-16b_Screen-3-Reveal-gemaess-APP-SPEC_Ergebnis.md` — EXISTS
  - `B1-AP-16c_Screen-4-Transfer-Text-gemaess-APP-SPEC_Ergebnis.md` — EXISTS
  - `B1-AP-16d_Reveal-Transfer-Mini-QA_Ergebnis.md` — EXISTS
- **Bewertung:** Arbeitsbaum sauber. Session-log-Änderung ist erwartetes System-Rauschen.

---

## AP-16-Abschluss-Verifikation (Gate 2)

Alle 8 Prüfpunkte bestätigt:

| # | Prüfpunkt | Zeile | Befund |
|---|---|---|---|
| 1 | KPI-Container S3 (`div.fw-app__kpi-slot`) | 429–431 | ✓ vorhanden |
| 2 | `renderKpiCards(kpiContainerS3, ctx)` in renderS3 | 533 | ✓ |
| 3 | `kpiContainerS3.textContent = ''` vor KPI-Render | 532 | ✓ |
| 4 | S3 Subline: _"Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand."_ | 421 | ✓ APP_SPEC §16.2 |
| 5 | S3 CTA: _"Meine nächsten 10 Jahre starten"_ | 441 | ✓ E-04 |
| 6 | S4 Headline: _"Heute beginnt wieder ein Chart, dessen Ende niemand kennt."_ | 455 | ✓ APP_SPEC §16.2 |
| 7 | S4 Bodytext: _"Die letzten 10 Jahre sehen im Rückblick leichter aus, als sie sich unterwegs angefühlt hätten. Die nächsten 10 Jahre werden anders schwierig sein. Aber sie beginnen genauso: ohne fertigen Chart."_ | 460 | ✓ APP_SPEC §16.2 |
| 8 | S4 finaler CTA: _"Heute Marktzeit sammeln →"_ | 466 | ✓ |

**Befund: AP-16 vollständig abgeschlossen. Navigation-Analyse kann fortgesetzt werden.**

---

## APP_SPEC-Vertrag

**Screen-Flow (§16.1, §16.4):**
- 4 Screens: S1 Frage/Teleportation → S2 Zeitreise (ohne Endwissen) → S3 Rückblick/Reveal → S4 Entscheidung/Transfer
- Übergänge: 1→2→3→4 (vorwärts). S4→S3, S3→S2 (rückwärts, beide spec-seitig nicht explizit verboten, aber auch nicht mandatiert).
- Kein definierter S2→S1-Rückpfad in der Spec.

**Screen 2 Endwissensgrenze (§16.1 harte Grenzen, §14.1):**
- Screen 2 zeigt NICHT: vollständiger Chart, finale KPI-Cards, Zukunftsvorschau
- Live-Region: nur Stationsname + Kurztext (kein Depotwert, keine finalen Zahlen)
- _„Zeit bleibt stabil. Wissen wächst."_ — X-Achse zeigt vollen 120-Monats-Rahmen, Linie nur bis aktueller Station

**Screen 3 Reveal (§6, §16.3, §23.6):**
- Vollständiger Chart + VertikaleLinie + KPI-Cards (eingezahlt/depotwertHeute/differenz) + AssumptionsBox
- Subline: APP_SPEC §16.2 exakter Wortlaut ✓
- CTA: „Meine nächsten 10 Jahre starten" (E-04) ✓

**Screen 4 Transfer (§16.1, §17, §23.18):**
- KEIN Chart, KEINE KPIs, KEINE Prognose, KEIN Countdown
- Transfer statt Verkaufsdruck; finaler CTA als Link (kein Button)

**A11y-/Fokus-relevante Regeln (§14.1, §14.5, §14.9):**
- Live-Region: `depotwertHeute`, `eingezahlt`, `differenz` erst ab S3 (§14.1)
- S2 Live-Message: nur Stationsname, keine Depotwert-Aussage (§14.1)
- Fokus nach Stationswechsel: auf Stations-Headline (Variante B, §14.5)
- Button-Labels: „Weiter investiert bleiben" (normal), „Ergebnis ansehen" (letzte Station), kein generisches „Weiter" (§14.9)

**Befund: APP_SPEC-Vertrag vollständig gelesen und als Soll-Basis dokumentiert.**

---

## Navigationsinventar

| Screen | Element | Label | Elementtyp | Eventhandler / Ziel | State-Änderung | Render-Auswirkung | Fokuswirkung | Bewertung |
|---|---|---|---|---|---|---|---|---|
| S1 | btnS1Next | „10 Jahre zurückspringen" | button | click → `activeStationIndex=0`, `currentRate=clamp(slider)`, `showScreen(2,true)` | currentRate eingefroren, index reset | `renderJourneyStep(0)` auf S2 | h2 S2 | ✓ Spec §16.2 |
| S2 | journeyBtn | „Weiter investiert bleiben" (1–6) / „Ergebnis ansehen" (7) | button | click → wenn letzte Station: `showScreen(3,true)`, sonst `activeStationIndex++`, `renderJourneyStep`, `h2.focus()` | activeStationIndex++ (wenn nicht letzte) | `renderJourneyStep(idx)` | h2 S2 | ✓ Spec §14.9; Labels in JSON korrekt |
| S3 | btnS3Prev | „← Zurück" | button | click → `showScreen(2,true)` | keine | `renderJourneyStep(activeStationIndex)` | h2 S2 | GELB: Label generisch |
| S3 | btnS3Next | „Meine nächsten 10 Jahre starten" | button | click → `showScreen(4,true)` | keine | keine (S4 statisch) | h2 S4 | ✓ Spec E-04 |
| S4 | btnS4Prev | „← Zurück" | button | click → `showScreen(3,true)` | keine | cond. `renderS3` (nur wenn Rate geändert) | h2 S3 | GELB: Label generisch |
| S4 | cta | „Heute Marktzeit sammeln →" | a[href=''] | kein JS-Handler | keine | keine | Browser-Standard | GELB: href leer (NB-1), Klick löst Seitennavigation aus |
| — | Slider S1 | — | input[range] | input → ARIA-Update, `lastRenderedRateS3=null` | `lastRenderedRateS3` invalidiert | keiner (kein live Update) | — | ✓ (no live leak) |
| S2 | Collapsible-Trigger | „Zwischenstand anzeigen" / „ausblenden" | button | click → `hidden` toggle, `aria-expanded` toggle | keine | keine | — | ✓ Spec §14.5, §14.9 |

---

## State-Flow

### Startzustand
- `activeStationIndex = 0`, `currentRate = initialRate`, `lastRenderedRateS3 = null`
- Screen 1 sichtbar (`showScreen(1, false)` — kein focus-Steal beim Laden)

### S1 → S2
- `currentRate = clamp(parseInt(slider.value), 50, 2000)` — **EINGEFROREN, nie wieder änderbar ohne Reload**
- `activeStationIndex = 0`
- `showScreen(2, true)` → `renderJourneyStep(0)` → erste Station, Chart bis Station 0
- `a11yRegion.textContent = station.headline` (erste Station)
- Fokus: h2 S2

### S2 Stationen 1→N
- journeyBtn click (nicht letzte): `activeStationIndex++`, `renderJourneyStep(idx)`, `h2 S2.focus()`
- journeyBtn click (letzte): `showScreen(3, true)` → Finale Reveal
- journeyBtn.textContent per JSON: „Weiter investiert bleiben" (Stationen 1–6), „Ergebnis ansehen" (Station 7)
- Chart wächst stationsweise, kein Endwissen sichtbar ✓

### Letzte Station → S3
- `showScreen(3, true)`
- `currentRate !== lastRenderedRateS3` (null) → `renderS3(currentRate)`:
  - Chart (vollständig), KPI-Cards, VertikaleLinie
  - `lastRenderedRateS3 = currentRate`
- `a11yRegion.textContent = revealA11ySummary` (erstes Endwissen für Screenreader ✓)
- Fokus: h2 S3

### S3 → S4
- `btnS3Next` → `showScreen(4, true)`
- Kein renderS3 (Condition nicht erfüllt, n≠3)
- S4 statisch (Headline, Body, CTA bereits im DOM)
- Fokus: h2 S4

### S4 → S3
- `btnS4Prev` → `showScreen(3, true)`
- `currentRate === lastRenderedRateS3` (gleiche Rate, eingefroren) → **renderS3 NICHT aufgerufen**
- KPI-Cards bleiben korrekt im DOM — kein Duplikat ✓
- `a11yRegion` wird NICHT aktualisiert — reveal-Summary nicht re-announced (GELB)
- Fokus: h2 S3

### S3 → S2
- `btnS3Prev` → `showScreen(2, true)`
- `renderJourneyStep(activeStationIndex)` → letzte Station gerendert auf S2
- `a11yRegion.textContent = station.headline` — **überschreibt reveal-Summary** → kein A11y-Endwissens-Leak ✓
- journeyBtn: Label „Ergebnis ansehen" (letzte Station weiterhin aktiv)
- Fokus: h2 S2

### S2 nach Rückkehr → S3
- journeyBtn (isLast=true) → `showScreen(3, true)`
- `currentRate === lastRenderedRateS3` → renderS3 NICHT aufgerufen
- KPI-Cards stehen noch korrekt im DOM, keine Duplikate ✓
- `a11yRegion` NICHT aktualisiert (GELB)
- Fokus: h2 S3

### Neustart / Rate ändern
- **S2→S1-Navigation nicht möglich** (kein btnS2Prev) — dramaturgisch intentional (kann den Sprung 10 Jahre zurück nicht rückgängig machen)
- Slider-input auf S1: `lastRenderedRateS3 = null`, aber `currentRate` wird erst beim nächsten btnS1Next-Klick neu gesetzt
- Slider kann bei aktivem S2/S3/S4 nicht bedient werden (screen1 ist `hidden`)
- **`currentRate` ändert sich nach S1→S2 nie mehr in einer Session** → `lastRenderedRateS3 = currentRate` nach erstem S3-Besuch permanent → renderS3 wird genau einmal pro Session aufgerufen

---

## Endwissensgrenze

**S2 vor Reveal:**
- `renderJourneyStep`: nur Stationsdata (bis stationMonth), visibleChartSeries nur bis aktuelle Station ✓
- Kein KPI-Container auf S2 (kpiContainerS3 ist ein S3-Element) ✓
- `a11yRegion`: station.headline — kein Depotwert, keine finalen Zahlen ✓

**S2 nach Zurück aus S3:**
- `renderJourneyStep(activeStationIndex)`: weiterhin nur Stationsdaten ✓
- `a11yRegion` = station.headline — reveal-Summary überschrieben ✓
- KPI-Container physisch auf S3 (DOM-Element), nie auf S2 sichtbar ✓
- visibleChartSeries: nur bis letzte Station (vollständig bekannt, aber das ist die letzte sichtbare Station — keine Zukunftsdaten) ✓

**A11y-Live-Region:**
- S2: nur station.headline ✓
- S3 Erstbesuch: revealA11ySummary ✓
- S3 Rückkehr: live region zuletzt enthält station.headline (aus S2-Rückkehr) — reveal-Summary fehlt ✓/GELB (kein Leak, aber keine Re-Ankündigung)

**Chartdaten S2 vs. S3:**
- `chartEngine2` / `chartEngine3` — zwei separate Engine-Instanzen ✓
- S2: `buildVisibleChartSeries(ctx.chartSeries, stationMonth)` — nur Teilserie ✓
- S3: `ctx.chartSeries` (vollständig) — erst ab S3 ✓

**KPI-Sichtbarkeit:**
- `kpiContainerS3` nur auf S3-Screen, nie auf S2 ✓

**Befund: Endwissensgrenze GRÜN.** Kein Endwissens-Leak auf S2, weder visuell noch via Screenreader.

---

## KPI-Idempotenz

**renderS3-Aufrufe:**
- Guard: `if (n === 3 && currentRate !== lastRenderedRateS3)` (Zeile 550)
- Da currentRate nach S1→S2 permanent eingefroren und kein S2→S1-Pfad existiert, ändert sich currentRate nie mehr
- renderS3 wird **genau einmal pro Session** aufgerufen (beim ersten S3-Besuch)

**Duplikat-Schutz:**
- `kpiContainerS3.textContent = ''` (Zeile 532) vor `renderKpiCards()` ✓
- In der Praxis nie ausgelöst (renderS3 wird nicht erneut aufgerufen), aber korrekt implementiert ✓

**S3 ↔ S4:**
- S4→S3: renderS3 nicht aufgerufen (gleiche Rate) → KPI-Cards bleiben korrekt stehen ✓
- Mehrfach S3↔S4: kein State-Problem ✓

**Rate ändern / Neustart:**
- Nicht möglich ohne Reload → kein Fall zu prüfen ✓

**Befund: KPI-Idempotenz GRÜN.** Kein Duplikations-Risiko. Guard-Mechanismus korrekt, clear-Mechanismus korrekt (defensiv).

---

## Fokus / Tastatur / A11y

**showScreen-Fokus:**
- `if (focus) { allScreens[n-1].querySelector('h2').focus() }` (Zeile 545–547)
- Alle h2-Elemente haben `tabIndex = -1` — programmatisch fokussierbar, nicht im Tab-Ring ✓
- showScreen immer mit `focus=true` aufgerufen (außer initialer `showScreen(1, false)`) ✓

**Fokus nach Stationswechsel (S2):**
- journeyBtn-Handler (nicht-letzte Station): `screen2.querySelector('h2').focus()` (Zeile 578–579) — doppelter Fokus-Aufruf (einmal hier, einmal in showScreen)
- Aber: bei Stationswechsel wird showScreen NICHT aufgerufen (nur renderJourneyStep + direkter focus) → kein showScreen-Fokus, nur journeyBtn-Handler-Fokus ✓
- Fokus geht auf S2-h2, nicht auf Stations-h3 — Spec §14.5 Variante B bevorzugt Stations-Headline

**Stations-h3 Fokus:**
- `station.h3` in renderStationCard hat `tabIndex = -1` (Zeile 256)
- Aber kein `h3.focus()` bei Stationswechsel (Fokus geht auf h2 S2)
- Leichte Abweichung von Spec §14.5 Variante B (Präferenz: Stations-Headline) — GELB

**Versteckte fokussierbare Elemente:**
- Alle inaktiven Screens haben `setAttribute('hidden', '')` ✓
- `hidden`-Attribut entfernt Elemente aus Accessibility Tree und Tab-Reihenfolge in allen modernen Browsern ✓
- Kein Risiko von Ghost-Fokus auf hidden Buttons

**Screenreader-Kontext:**
- `a11yRegion`: `aria-live="polite"`, `aria-atomic="true"` (Zeilen 479–480) ✓
- S2: station.headline als Live-Ankündigung ✓
- S3: revealA11ySummary als erste Endwissens-Offenlegung ✓
- S3-Rückkehr (gleiche Rate): Live-Region zuletzt auf station.headline — **reveal-Summary wird nicht re-announced** (GELB)
- Slider: `role="slider"`, `aria-valuemin/max/now/valuetext` ✓
- Collapsible: `aria-expanded`, `aria-controls` ✓

**Befund Fokus/Tastatur/A11y: GELB.**
- Fokus auf h2 S2 statt Stations-h3 (leichte Abweichung Spec §14.5 Variante B)
- Reveal-Summary nicht re-announced bei S3-Rückkehr (Komfort, kein Blocker)
- Alle anderen A11y-Regeln korrekt implementiert

---

## Browser-/manuelle QA

- **durchgeführt:** ja — durch Albert bestätigt (2026-06-24)
- **Normalmodus:** ✓ bestanden
- **Reduced Motion:** nicht in diesem AP (AP-15 abgedeckt)
- **Tastatur:** bestätigt
- **Befund:** Browser-QA erfolgreich bestanden. Alle Prüfpunkte grün.

---

## Fachliche Bewertung Zurück/Weiter

**S2 Navigation:**
- Vorwärts-only durch die Zeitreise (dramaturgisch korrekt — kein Zurück zu früheren Stationen)
- Kein S2→S1-Button (korrekt, dramaturgisch intentional)
- Kein Label-Problem

**S3 Zurück-Button:**
- Label: „← Zurück" — generisch, aber kontextuell ausreichend (User weiß, sie sind auf S3 und gehen zurück)
- Bringt zur letzten Station auf S2, nicht zum S2-Anfang (korrekt — kein Neustart der Zeitreise)
- journeyBtn zeigt „Ergebnis ansehen" — User kann wieder zu S3 gelangen ✓

**S3 CTA:**
- „Meine nächsten 10 Jahre starten" — inhaltlich klar, trifft dramaturgisch auf S4 ✓
- Klar getrennt von S4-finalem CTA ✓

**S4 Zurück-Button:**
- Label: „← Zurück" — generisch, aber ausreichend
- Bringt zu S3 mit korrekt erhaltenen KPIs ✓

**S4 finaler CTA:**
- „Heute Marktzeit sammeln →" — klar, trifft Transfer-Absicht ✓
- `<a>` statt `<button>` — semantisch korrekt für externen Link
- `href = ''` ist **bekannter offener Punkt (NB-1)** — kein Ziel-URL gesetzt

**Generische Weiter-Reste:**
- `journeyBtn.textContent = station.continueLabel || 'Weiter'` — Fallback `'Weiter'` ist toter Code (alle 7 Stationen in JSON mit korrekten Labels) ✓
- Kein sonstiges generisches „Weiter" im sichtbaren UI

**Verwirrende Labels:**
- btnS3Prev = „← Zurück", btnS4Prev = „← Zurück" — beide identisch, beide generisch
- Nicht verwirrend, aber kein Mehrwert durch Spezifizierung möglich ohne Spec-Änderung

**Befund:** Fachlich plausibel und konsistent. Zwei Generik-Labels (Zurück×2), ein offener Link-Befund (NB-1). Keine falsche Dramaturgie.

---

## Risiken / Seiteneffekte

**State-Risiken:**
- currentRate ist nach S1→S2 permanent eingefroren → kein Risiko für Inkonsistenz ✓
- activeStationIndex kann nicht unter 0 oder über last sinken (guard: isLast-Check) ✓
- lastRenderedRateS3: korrekt initialisiert (null), korrekt gesetzt (bei renderS3), korrekt invalidiert (slider.input) ✓
- Befund: GRÜN

**Render-Risiken:**
- renderS3 wird genau einmal pro Session ausgeführt → kein Duplikations-Risiko ✓
- clear-Mechanismus korrekt implementiert (defensiv) ✓
- Zwei separate ChartEngine-Instanzen (chartEngine2/3) → kein Cross-Screen-Render-Konflikt ✓
- Befund: GRÜN

**A11y-Risiken:**
- Live-Region überschreibt reveal-Summary beim S3→S2-Rückpfad (station.headline) → kein Endwissens-Leak ✓
- S3-Rückkehr (gleiche Rate): reveal-Summary wird nicht re-announced → GELB (Screenreader-Komfort)
- S4 cta `href=''`: Klick ohne JS-Handler löst Browser-Navigation aus (potenziell Seitenreload) → GELB (NB-1)
- Fokus geht auf h2 statt Stations-h3 → leichte Abweichung Spec §14.5 Variante B → GELB
- Befund: GELB (keine Blocker)

**Endwissens-Risiken:**
- Keine → GRÜN

**Motion-Risiken:**
- Nicht Scope dieses AP (AP-15 vollständig abgedeckt) → n/a

---

## Status

**GELB**

Hauptflow korrekt, keine Blocker. Drei nicht-blockierende Befunde für optionalen Folge-AP:

| # | Befund | Typ |
|---|---|---|
| G1 | S4 finaler CTA `<a href=''>` ohne Ziel (NB-1) — Klick löst Browser-Navigation aus | GELB |
| G2 | A11y live region nicht re-announced bei S3-Rückkehr (gleiche Rate) | GELB |
| G3 | Fokus bei Stationswechsel auf h2 S2, nicht auf Stations-h3 (Spec §14.5 Variante B bevorzugt h3) | GELB |

---

## Blocker

**nein**

---

## Offene Punkte

1. **NB-1 (S4 CTA href):** `cta.href = ''` — laut Kommentar bekannter Platzhalter. Ziel-URL muss aus Ghost-/Produktkontext gesetzt werden. Scope: separater AP (wann Ghost-URL bekannt).
2. **A11y Re-Announce S3:** Minimal-Fix: in showScreen(3) immer `a11yRegion.textContent = revealA11ySummary` setzen (unabhängig von renderS3-Guard). Eine Zeile.
3. **Fokus Stations-h3:** Minimal-Fix: im journeyBtn-Handler nach `renderJourneyStep` den neuen `stationArea.querySelector('h3').focus()` aufrufen statt h2. Spec §14.5 Variante B ist Präferenz, nicht Pflicht.
4. **Browser-QA fehlt:** Statische Analyse ist vollständig, aber manuelle QA mit Tastatur und Screenreader durch Albert steht aus.

---

## Empfohlene Folge-APs

**Wenn G1–G3 behoben werden sollen:**

- **B1-AP-17b** — Navigation-State minimal reparieren:
  - Scope: G2 (A11y re-announce, 1 Zeile), G3 (Fokus h3, 1 Zeile)
  - Nicht: G1 (hängt von Produkt-URL ab, separater AP)
  - Full-Gate (2 Stellen in app.js, aber minimal)

- **B1-AP-17c** — S4 CTA Ziel setzen:
  - Scope: G1 (href auf finale URL setzen)
  - Nur wenn Ghost-/Produkt-URL bekannt ist
  - Light-Gate (1 Datei, 1 Stelle)

- **B1-AP-17d** — Navigation-Mini-QA:
  - Scope: manuelle QA-Checkliste (oben) durch Albert bestätigen lassen
  - Kein Code

**Wenn G1–G3 als JETZT nicht kritisch eingestuft werden:**

- AP-17a als abgeschlossen betrachten.
- Weiter mit B1-AP-18 (nächster geplanter AP).
- G1–G3 in BACKLOG als eigenständige Mini-APs.

---

## Bestätigungen

- Keine Reparatur durchgeführt: ✓
- Keine Codeänderung außer Ergebnisprotokoll: ✓
- Keine Stylingdiskussion: ✓
- Keine CSS-Änderung: ✓
- Keine APP_SPEC-Änderung: ✓
- Keine QA_TEST_CASES-Änderung: ✓
- Keine app.test.html-Änderung: ✓
- Keine Screen-Zusammenlegung: ✓
- Keine neue Dramaturgie: ✓
- Keine KPI-Änderung: ✓
- Keine Screen-4-Textänderung: ✓
- Keine ChartEngine-Änderung: ✓
- Keine Plugin-Änderung: ✓
- Keine JSON-Änderung: ✓
- Keine AP-17b-Arbeit: ✓
- Keine AP-18-Arbeit: ✓
- Keine AP-19/AP-20/AP-21-Arbeit: ✓
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓
