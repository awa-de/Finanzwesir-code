Stand: 2026-06-24 | Session: B1-AP-16b | Geändert von: Claude

# B1-AP-16b Ergebnis

## Geänderte Dateien

- `Apps/prokrastinations-preis/app.js` — 4 chirurgische Änderungen (7 Zeilen)
- `docs/steering/patches/B1-AP-16b_Screen-3-Reveal-gemaess-APP-SPEC_Ergebnis.md` — dieses Protokoll (neu)

## Ziel / Ergebnis

Screen 3 erfüllt jetzt den Reveal-Vertrag der APP_SPEC:
- KPI-Cards sichtbar (Eingezahlt, Depotwert heute, Gewinn / Verlust)
- Subline auf APP_SPEC §16.2 gesetzt
- S3→S4 CTA auf E-04-Entscheidung gesetzt

## Vorprüfung

### APP_SPEC-Gate

- Screen-3-Soll geprüft: JA — APP_SPEC §6, §16.2, §23.6, §14.1 vollständig gelesen
- E-04-Entscheidung angewendet: JA — „Meine nächsten 10 Jahre starten" (redaktionelle Entscheidung im AP-Briefing)
- Befund: GRÜN

### Code-Gate

- renderKpiCards vorhanden: JA — Z.112–144, vollständig implementiert
- renderKpiCards vorher aufgerufen: NEIN — kein Aufruf im gesamten File
- KPI-Container vorher vorhanden: NEIN — kein DOM-Container auf Screen 3
- renderS3 vorhanden: JA — Z.515–524
- AssumptionsBox vorhanden: JA — `aside.fw-app__assumptions` auf Screen 3
- A11y-Reveal-Summary vorhanden: JA — wird in showScreen(3) gesetzt (AP-14-konform)
- Befund: GRÜN — alle Vorbefunde aus B1-AP-16a bestätigt

### Datenfluss-Gate

- startBetrag: aus `options.startBetrag` (parseOptions), Default 0 — kein Einfluss auf KPI-Rechnung wenn 0
- eingezahlt: in `appContext` vorhanden — aus `marketTimeStrategy()` via `buildAppContext()`
- depotwertHeute: in `appContext` vorhanden — aus `marketTimeStrategy()` via `buildAppContext()`
- differenz: in `appContext` vorhanden — aus `marketTimeStrategy()` via `buildAppContext()`
- buildAppContext unangetastet: JA
- marketTimeStrategy unangetastet: JA
- Befund: GRÜN — alle KPI-Werte in ctx verfügbar, kein neuer Berechnungscode nötig

### Stationen-Gate

- letzter continueLabel: `"Ergebnis ansehen"` (id: station_final_latest_month)
- Befund: GRÜN — keine JSON-Änderung

### CSS-Gate

- KPI-CSS vorhanden: JA — `.fw-app__kpi-cards` (Z.40), `.fw-app__kpi-card` (Z.48), dt/dd-Styling (Z.55, Z.61)
- CSS-Änderung nötig: NEIN
- Befund: GRÜN — kein app.css berührt

## Implementierung

- KPI-Container: `div.fw-app__kpi-slot` nach `chartSection3`, vor `assumptionsS3` eingefügt — Reihenfolge: Chart → KPI-Cards → AssumptionsBox (APP_SPEC §23.6)
- renderKpiCards-Aufruf: in `renderS3()` nach `lastRenderedRateS3 = rate` — `kpiContainerS3.textContent = ''` (Duplikat-Schutz) + `renderKpiCards(kpiContainerS3, ctx)`
- Subline: „Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand." (APP_SPEC §16.2, exakter Wortlaut)
- S3→S4 CTA: „Meine nächsten 10 Jahre starten" (E-04, kein Pfeil — abweichend von `← Zurück`-Konvention, da E-04 explizit benannt)
- Sonstige Änderungen: keine

## Pfeil-Entscheidung (CTA)

Bestehende Konvention: Navigations-Buttons nutzen Pfeile (`← Zurück`, `Weiter →`). Für `btnS3Next` weicht der Text von dieser Konvention ab, da E-04 einen inhaltlich spezifischen CTA vorgibt. Pfeil weggelassen — das Briefing nennt „exakter Text ohne generisches Weiter" als Grundpräferenz.

## Prüfungen

- KPI-Cards sichtbar: OFFEN — Albert testet lokal
- Keine KPI-Duplizierung: Mechanisch gesichert (`textContent = ''` vor Aufruf)
- Screen 3 Chart unverändert: JA — `chartEngine3.renderFromData()` unberührt
- Vertikale Linie unverändert: JA — `features: { verticalLine: 'last' }` unberührt
- Stationsmarker unverändert: JA — `revealAnnotations` und `buildJourneyStationAnnotations()` unberührt
- AssumptionsBox unverändert: JA — nur `kpiContainerS3` vor `assumptionsS3` eingefügt, kein Eingriff
- A11y unverändert: JA — `revealA11ySummary`-Logik in `showScreen(3)`, nicht in `renderS3()`
- Screen 2 Endwissensschutz unverändert: JA — `renderKpiCards()` nur in `renderS3()`, nicht auf Screen 2
- Screen 4 nicht verändert: JA — Screen-4-DOM und finales CTA unberührt
- AP-15 Motion nicht berührt: JA — `ChartEngine.js` nicht angefasst

## Diff-/Scope-Prüfung

- Nur erlaubte Dateien geändert: JA — nur `app.js` + dieses Protokoll
- Keine Protected Files geändert: JA
- Keine APP_SPEC-Änderung: JA
- Keine JSON-Änderung: JA
- Keine ChartEngine-Änderung: JA
- Keine Plugin-Änderung: JA

## Status

grün (Umsetzung abgeschlossen, Browser-Test durch Albert ausstehend)

## Blocker

nein

## Offene Punkte

- B1-AP-16c: Screen-4-Transfer-Text gemäß APP_SPEC herstellen (Headline, Bodytext)
- B1-AP-16d: Reveal-/Transfer-Mini-QA

## Empfohlener nächster AP

B1-AP-16c — Screen-4-Transfer-Text gemäß APP_SPEC herstellen

## Bestätigungen

- Keine Screen-4-Reparatur durchgeführt: JA
- Keine APP_SPEC-Änderung: JA
- Keine Screen-Zusammenlegung: JA
- Keine neue Dramaturgie: JA
- Keine `marketTimeStrategy()`-Änderung: JA
- Keine `buildAppContext()`-Änderung: JA
- Keine `renderJourneyStep()`-Änderung: JA
- Keine ChartEngine-Änderung: JA
- Keine Plugin-Änderung: JA
- Keine JSON-Änderung: JA
- Keine AP-16c/AP-16d-Arbeit: JA
- Keine AP-17/AP-18-Arbeit: JA
- Keine AP-19/AP-20/AP-21-Arbeit: JA
- Keine Commits ausgeführt: JA
- Kein Abschlussritual ausgeführt: JA
