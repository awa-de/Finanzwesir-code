Stand: 2026-06-25 00:00 | Session: B1-AP-18a | Geändert von: Claude

# B1-AP-18a Ergebnis

## Geänderte Dateien

- `docs/steering/patches/B1-AP-18a_Error-Empty-QA-Readiness-Befund_Ergebnis.md` (diese Datei)

## Ziel / Ergebnis

Triage-Befund: reale Fehlerflächenkarte, Top-Risiken und Folge-AP-Empfehlung für die App prokrastinations-preis.
Kein Code wurde geändert.

---

## Vorprüfung

### Arbeitsbaum

- git status --short:
  ```
   M .claude/learning/session-log.md
   M Apps/prokrastinations-preis/app.js
  ?? docs/steering/patches/B1-AP-17b_A11y-Fokus-Minifix_Ergebnis.md
  ?? docs/steering/patches/B1-AP-17c_A11y-Fokus-Mini-QA_Ergebnis.md
  ```
- Erwartete Änderungen:
  - `session-log.md` M → Session-Systemrauschen (nicht anfassen)
  - `app.js` M → AP-17b-Patch (noch nicht committed, erwartet)
  - `B1-AP-17b_...md` ?? → neu, erwartet
  - `B1-AP-17c_...md` ?? → neu, erwartet
- Unerwartete Änderungen: keine
- Befund: GRÜN

### AP-17-Gate

- AP-17c vorhanden: JA (`docs/steering/patches/B1-AP-17c_A11y-Fokus-Mini-QA_Ergebnis.md`)
- AP-17 Gesamtstatus: GRÜN
- G1 offen: JA — S4 CTA `href=""` bleibt offen bis Ziel-URL im Ghost-/Produktkontext bekannt
- G2/G3 grün: JA (A11y Re-Announce S3 + Fokus h2/h3-Fallback implementiert und bestätigt)
- Befund: GRÜN

### APP_SPEC-Gate

- Error-/Empty-/Loading-Regeln vorhanden: JA — §12 State-Modell (5 Error-States a/b/c/d/Empty + Loading + Empty-Journey), jeweils mit deutschem Nutzertext
- Datenvertrag: JA — §7.x (CSV Semikolon/Komma, EUR-Pflicht, ≥120 Zeilen, Monatsultimo, YYYY-MM-DD, Mindeststandard-Checkliste)
- A11y-Fehlerregeln: JA — §14.13 ("sichtbar", "screenreader-tauglich", "nicht nur farblich codiert")
- No-Crash-/No-Panik-Regeln: JA — §18 Regel 8 ("Empty-State statt Crash"), §17 (kein Crash-Rot für Marktdaten)
- Befund: GRÜN — APP_SPEC definiert alle relevanten Soll-Zustände

---

## Reale Fehlerflächenkarte

| Fläche | realer Codepfad | vorhandene Kontrolle | Nutzerzustand | Bewertung |
|---|---|---|---|---|
| Slug-Validierung | `validateSlug()` Z.21 | JA: Whitelist-Check → Error (a) | `renderError()` + `textContent` | GRÜN |
| URL-Validierung | CSVParser Domain-Lock (intern) | JA: im Parser → Error (b) | `renderError()` | GRÜN |
| Daten laden (fetch) | `_loadDataImpl()` Z.614 `try/catch` | JA: Exception → Error (b) | `renderError()` | GRÜN |
| Daten parsen (CSVParser) | `_loadDataImpl()` Z.615 | JA: CSVParser-GATEKEEPER wirft | `renderError()` via catch | GRÜN |
| EUR-Prüfung | `_loadDataImpl()` Z.624 | JA: `unitKey !== CURRENCY_EUR` → Error (c) | `renderError()` | GRÜN |
| Mindestdaten ≥120 | `_loadDataImpl()` Z.633 | JA: `rows.length < 120` → Empty | `renderError()` mit Empty-State | GRÜN |
| Ungültige Rows (NaN/0/nicht-endlich) | `_loadDataImpl()` Z.644 | JA: `hasInvalidRows` → Empty | `renderError()` mit Empty-State | GRÜN |
| Stations-JSON laden | `loadStations()` Z.826 `try/catch` | JA: HTTP-Fehler + Exception → Error (d) | `renderError()` | GRÜN |
| Stations-JSON Validierung | `validateStationsJson()` Z.675 | JA: Contract-Validator → Error (d) | `renderError()` | GRÜN |
| Chart-Render-Crash | `renderContent()` / ChartEngine | TEILWEISE: Catch-All in `initApp` Z.879 | `renderError("Diese App konnte nicht geladen werden.")` | GELB: kein dedizierter Chart-Error-State |
| Error-State A11y | `renderError()` Z.41–44 | NEIN: kein `role="alert"` | Sichtbar, aber kein Screenreader-Trigger | GELB: §14.13-Lücke |
| Loading A11y | `renderLoading()` Z.34–38 | JA: `role="status"` | Screenreader-tauglich | GRÜN |
| Empty-Journey | `checkEditorialGate()` Z.173 | NEIN: nur `console.warn` | Kein User-Feedback, Journey läuft mit 1 Station | GELB |

---

## Triage-Kategorien

- **Bereits kontrolliert:** Slug (a), URL-Domain (b), Datenladen (b), Parsen (b), EUR-Prüfung (c), Mindestdaten-Empty, hasInvalidRows-Empty, Stations-JSON-laden (d), Stations-Validierung (d), Loading-State (role="status"), No-Red-Crash (Marktdaten), SafeDOM (textContent), Stack-Trace-Verbot
- **Relevant offen:** Error-State A11y kein `role="alert"` (§14.13-Verstoß), Empty-Journey kein User-Feedback
- **Hypothetisch / nicht auslösbar:** Chart-Render-Exception im normalen Betrieb (kein bekannter Auslöser; Catch-All vorhanden)
- **AP-19-Harness-Fälle:** Error-State (d) ohne stations.de.json-Manipulation nicht testbar; vollständiger Journey-Test benötigt produktive CSV; A11y-Volltest (Screenreader, Fokus-Sequenz); Reduced-Motion-Automatisierung; editorialer Gate-Volltest mit verifizierten Stationen
- **Späterer Backlog:** Chart-dedizierter Error-State (über Catch-All hinaus); Empty-Journey User-Feedback-UI (sofern editoriales Problem gelöst)

---

## Top-Risiken, maximal fünf

| Priorität | Risiko | realer Auslöser | Auswirkung | Status | Folgeempfehlung |
|---|---|---|---|---|---|
| 1 | `renderError()` kein `role="alert"` | Jeder Error-State (a/b/c/d) + Empty | Screenreader kündigt Fehler nicht an — §14.13-Verstoß | GELB | AP-18b: 1 Zeile, 1 Datei |
| 2 | Alle 7 Stationen `source_claimed_unchecked` | Live-Betrieb mit aktueller stations.de.json | `filterStationsForWindow()` entfernt alle → Journey läuft mit 1 Station (nur finalReveal) — dramaturgisch leer, kein Crash | GELB | Editorial-AP / AP-19 |
| 3 | Produktive CSV fehlt | Hauptflow ohne `msci-world-net-return-eur-monthly.csv` | Szenario A in app.test.html zeigt Error (b) — Happy-Path nicht testbar | GELB | AP-DATA-09 offen |
| 4 | Error-State (d) nicht isoliert testbar | stations-JSON-Ausfall simulieren erfordert Dateimodifikation | app.test.html hat kein Szenario für stations-JSON-Fehler (nur für CSV-Fehler) | GELB | AP-19-Harness |
| 5 | Empty-Journey kein User-Feedback | Keine verifizierten Stationen im aktiven Fenster | `checkEditorialGate()` → nur `console.warn`; APP_SPEC §12 definiert Empty-Journey-Message, aber kein `renderEmptyJourney()` existiert | GELB | AP-19 oder späterer Backlog |

---

## Loading-State

- realer Loading-Pfad: JA — `setState(container, 'loading')` Z.845, dann `renderLoading(container)` Z.853 (vor `Promise.all`)
- Nutzerzustand: `<p role="status">Daten werden geladen …</p>` + CSS `data-fw-state="loading"` opacity:0.6
- A11y: GRÜN — `role="status"` vorhanden, Screenreader liest beim Focus-Erhalt vor
- Risiko: Kein — Daten werden parallel geladen, Loading-State wird vor User-Interaktion gesetzt
- Befund: GRÜN

---

## Error-State

- sichtbarer Error-State: JA — `data-fw-state="error"` mit CSS `--fw-color-error-border: #c62828` / `--fw-color-error-bg: #fff8f8` / `--fw-color-error-text: #b71c1c` + `<p>textContent</p>`
- kontrollierter Stopp: JA — alle 5 Fehlerpfade (a/b/c/d + Catch-All) führen zu `renderError()`
- Console-only: NEIN — Meldung ist sichtbar im UI; Stack-Trace nur in Konsole (Invariante eingehalten)
- rote Crash-Visuals: NEIN für Marktdaten (regelkonform §17); JA für technischen Error-State (rote Systemfarbe — zulässig)
- Risiko: `renderError()` erzeugt kein `role="alert"` → Screenreader werden nicht automatisch notifiziert
- Befund: GELB — Error sichtbar und sicher, A11y-Ankündigung fehlt (§14.13)

---

## Empty-State

- real erreichbare Empty-Fälle: (1) CSV < 120 Zeilen (`rows.length < 120` Z.633), (2) Ungültige Rows (NaN/0/nicht-endlich Z.644) — beide lösen `setState('empty')` + `renderError(container, message)` aus
- Nutzerzustand: Meldung "Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen." mit `data-fw-state="empty"`; kein eigenes `renderEmpty()` — `renderError()` wird wiederverwendet
- A11y: GELB (gleiche role="alert"-Lücke wie Error-State)
- Risiko: Kein Crash, aber kein optisch differenzierter Empty-State gegenüber Error-State (beide nutzen `renderError()`) — funktionell korrekt, visuell undifferenziert
- Befund: GRÜN für Stabilität, GELB für A11y

---

## Daten-/CSV-Readiness

- Datenannahmen (app.js): `unitKey === CURRENCY_EUR`, `rows.length >= 120`, alle `indexValue > 0 && isFinite(indexValue)`, date-Spalte vorhanden und parsierbar
- vorhandene Validierung: vollständig durch CSVParser-GATEKEEPER + `_loadDataImpl()`-Guards
- Mindestdaten / 10 Jahre: explizit geprüft (`rows.length < 120` → Empty)
- Date/NaN/Sortierungsrisiken: `hasInvalidRows`-Filter blockiert 0- und NaN-Werte; Sortierung via CSVParser (vertrauenswürdig); Date-Objekte via CSVParser
- AP-19-Harness-Fälle: Vollständiger Happy-Path-Test benötigt produktive CSV oder Mock mit ≥120 gültigen EUR-Zeilen; Szenario R (`invalid-index-value.csv`) bereits vorhanden
- Befund: GRÜN für Code-Robustheit; GELB für Produktiv-Readiness (AP-DATA-09 offen)

---

## Stations-Readiness

- motionRules: explizit validiert in `validateStationsJson()` Z.688–698 (betweenStations, reducedMotion, forcedWaitBeforeContinue)
- Stationenliste: vorhanden (7 Stationen); alle formell valide — `validateStationsJson()` bestätigt
- letzte Station: `dynamic_latest_month` vorhanden und korrekt identifiziert via `isFinalRevealStation()`
- continueLabel: vorhanden in allen Stationen
- Datenbereich/Reihenfolge: `filterStationsForWindow()` filtert nach `[startMonth, latestMonth]`
- Endwissen in Stationstexten: redaktionell, nicht technisch erzwingbar — Redaktions-Gate (§20) listet Anforderung auf
- **KRITISCH**: alle 7 Stationen haben `sourceStatus: "source_claimed_unchecked"` → `filterStationsForWindow()` Z.802 entfernt ALLE → Journey läuft nur mit finalReveal (1 Station); kein Crash; `console.warn('[fw-app] Editorial Gate: EditorialDegraded …')` wird ausgegeben
- Befund: GELB — Validierung technisch vollständig, aber aktueller Redaktionsstand macht Journey dramaturgisch leer

---

## No-Red-Crash / Panikvisuals

- CSS/Error-Klassen: `--fw-color-error-border: #c62828`, `--fw-color-error-bg: #fff8f8`, `--fw-color-error-text: #b71c1c` — nur für technischen Error-State (Systemfehler-Overlay), NICHT für Marktvisualisierung → regelkonform (§17 verbietet Crash-Rot nur für Marktdaten)
- Markt-/Crash-Rot: NICHT vorhanden — kein roter Chart, keine Crash-Annotation, keine roten Kursverläufe
- Panik-/Beschämungstexte: NICHT vorhanden — alle Stationstexte sind sachlich, kein alarmistischer Ton
- stations.de.json: `redCrashColor: false`, `lossColoring: false`, `crashSegmentColoring: false`; alle Stationen `noRedColor: true` — vollständig konform
- tote vs. reale Pfade: Error-State-Rot-Farben sind reale CSS-Pfade, aber regelkonform; kein toter Crash-CSS-Rest
- Befund: GRÜN

---

## app.test.html / QA-Readiness

- Hauptflow testbar: TEILWEISE — benötigt `../../Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv` (AP-DATA-09 offen); ohne produktive CSV zeigt Szenario A Error (b)
- Error-/Empty-Fälle testbar: JA — Szenarien B/C/F/H/I/J/K/L/M/N/Q/R vorhanden; `test-data/`-Fixtures alle vorhanden (7 Dateien: invalid.csv, short.csv, no-index-value.csv, no-eur.csv, no-date.csv, usd-suffix.csv, invalid-index-value.csv)
- Datenfehler testbar: JA (CSV-seitig vollständig)
- Stationsfehler testbar: NEIN — Error-State (d) erfordert stations.de.json-Manipulation oder fetch-Intercept; kein Testfall in app.test.html
- Reduced Motion testbar: JA — DevTools Emulation (manuell)
- Fokus/A11y testbar: JA — DevTools + Screenreader (manuell, kein Automatisierungs-Harness)
- AP-19-Harness nötig: JA — für Error-d-Isolation, vollständigen Journey-Test, A11y-Screenreader-Automatisierung, editoriale Gate-Tests mit verifizierten Stationen
- Befund: GELB — Error/Empty-Fälle gut abgedeckt; stations-JSON-Fehler + vollständiger Happy-Path + A11y-Automatisierung fehlen

---

## Übergabebedarf AP-19-Faden

- relevante abgeschlossene APs: AP-14 (Stationen-Zeitreise + Plugin-Architektur), AP-15 (Reduced Motion), AP-16 (Reveal/Transfer), AP-17 (Navigation/Fokus/A11y)
- offene Nicht-Blocker:
  - G1 S4 CTA `href=""` (bewusst offen, bis Ziel-URL bekannt)
  - `showScreen(3,false)`-Szenario (hardening, nicht auslösbar)
  - Empty-Journey User-Feedback-UI
  - Chart-dedizierter Error-State (Catch-All vorhanden)
- zu wiederholende Tests: Vollständiger S1→S2→S3→S4-Flow mit produktiver CSV; Reduced-Motion an/aus; Screenreader-Test S3-Reveal; Fokus-Sequenz nach Stationswechsel
- AP-19-Harness-Fälle: Error-State (d) isolieren (stations.de.json Stub oder fetch-Mock); editorial Gate mit verifizierten vs. unchecked Stationen; A11y-Automatisierung für `role="alert"`-Check
- relevante Dateien: `app.js`, `app.css`, `app.test.html`, `test-data/`, `config/stations.de.json`, `APP_SPEC.md`, `QA_TEST_CASES.md`
- empfohlene Übergabeform: AP-18c-Übergabe-Doku (optional) oder direkt in AP-19-Briefing

---

## Status

**GELB**

Begründung: Kein technischer Blocker, kein Crash, kein Stacktrace im UI, keine roten Marktdaten. Zwei reale Lücken vor AP-19: (1) `renderError()` ohne `role="alert"` (§14.13-Verstoß, 1 Zeile, 1 Datei), (2) Produktive CSV fehlt (AP-DATA-09). Alle anderen Punkte sind entweder kontrolliert oder gehören in AP-19-Harness.

---

## Blocker

Nein — kein Blocker vor AP-19.

---

## Offene Punkte

1. `renderError()` kein `role="alert"` → §14.13-Verstoß (1 Zeile, minimierbarer Fix)
2. Alle 7 Stationen `source_claimed_unchecked` → Journey dramaturgisch leer (editorial, kein Code-Fix)
3. Produktive CSV fehlt → Hauptflow-Test blockiert (AP-DATA-09)
4. Error-State (d) nicht isoliert testbar (AP-19-Harness)
5. Empty-Journey kein User-Feedback (`renderEmptyJourney()` fehlt — APP_SPEC §12-Anforderung)

---

## Empfohlene Folge-APs

**AP-18b empfohlen (minimal):**

- `B1-AP-18b — Error-/Empty-State A11y-Minifix`
- Inhalt: `renderError()` Z.41: `p.setAttribute('role', 'alert')` einfügen
- Scope: 1 Datei (`app.js`), 1 Zeile, Light-Gate
- Begründung: §14.13-Pflichtanforderung; alle Error-/Empty-States betroffen; ohne diesen Fix ist A11y-Screenreader-Test in AP-19 von vornherein degradiert

**AP-18c optional:**
- Übergabe-Doku nur, wenn AP-19-Briefing diese Informationen nicht direkt enthält; sonst direkt aus diesem Protokoll ableiten

**AP-18-Abschluss danach:** Nach AP-18b kann AP-18 abgeschlossen werden. AP-19 bis AP-21 in separatem QA-/Abschluss-Faden.

---

## Bestätigungen

- Keine Reparatur durchgeführt: ✓
- Keine Codeänderung außer Ergebnisprotokoll: ✓
- Kein Vollaudit aller hypothetischen Fehlerfälle: ✓
- Keine Error-State-Implementierung: ✓
- Keine Loading-State-Implementierung: ✓
- Keine Empty-State-Implementierung: ✓
- Keine Testharness-Implementierung: ✓
- Keine CSS-Änderung: ✓
- Keine APP_SPEC-Änderung: ✓
- Keine QA_TEST_CASES-Änderung: ✓
- Keine app.test.html-Änderung: ✓
- Keine CSV-Änderung: ✓
- Keine stations.de.json-Änderung: ✓
- Keine ChartEngine-Änderung: ✓
- Keine CSVParser-Änderung: ✓
- Keine FinanzwesirData-Änderung: ✓
- Keine Plugin-Änderung: ✓
- Keine G1-CTA-href-Reparatur: ✓
- Keine AP-18b-Arbeit: ✓
- Keine AP-19/AP-20/AP-21-Arbeit: ✓
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓
