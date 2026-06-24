Stand: 2026-06-24 | Session: B1-AP-17b | Geändert von: Claude

# B1-AP-17b Ergebnis

## Geänderte Dateien

- `Apps/prokrastinations-preis/app.js` — 5 Zeilen geändert/ergänzt
- `docs/steering/patches/B1-AP-17b_A11y-Fokus-Minifix_Ergebnis.md` — dieses Protokoll

## Ziel / Ergebnis

G2 (A11y Re-Announce Screen 3) und G3 (Fokus Stationswechsel auf h3) minimal repariert.
G1 (`href=""`) bewusst unverändert. Kein KPI-Duplikat. Kein Endwissens-Leak.

---

## Vorprüfung

### Arbeitsbaum

- git status --short: `M  .claude/learning/session-log.md`
- Erwartete Änderungen: session-log.md (System-Log, erwartet)
- Unerwartete Änderungen: keine
- Befund: GRÜN — Arbeitsbaum sauber; AP-16-Änderungen committed

### AP-17a-Gate

- G1 bestätigt: S4 CTA `href=""` — nicht in AP-17b ✓
- G2 bestätigt: A11y Re-Announce Screen 3 bei Rückkehr — in AP-17b ✓
- G3 bestätigt: Fokus auf Stations-h3 bei Stationswechsel — in AP-17b ✓
- Hauptflow grün: ja ✓
- Endwissensgrenze grün: ja ✓
- KPI-Idempotenz grün: ja ✓
- Befund: GRÜN — AP-17a-Protokoll vorhanden, alle Felder bestätigt

### APP_SPEC-Gate

- §14.1 Live-Region: `aria-live="polite"` + `aria-atomic="true"`; Endwissen erst ab S3 ✓
- §14.5 Fokus Stationswechsel: Variante B (Fokus auf neue Stationsheadline) als Präferenz ✓
- §14.9 Button-Labels: `Weiter investiert bleiben` / `Ergebnis ansehen` — nicht geändert ✓
- Screen 2 Endwissensgrenze: nur Stationsheadline in Live-Region ✓
- Screen 3 Reveal: vollständige Reveal-Summary erst ab S3-Eintritt ✓
- Befund: GRÜN — Spec-Regeln bekannt und eingehalten

### Code-Gate

- showScreen gefunden: Zeile 540 ✓
- a11yRegion gefunden: Zeile 478 (Definition), Zeile 521 (S2), Zeile 558 (S3) ✓
- Reveal-Summary-Pfad gefunden: Zeilen 551–561 ✓
- renderS3-Guard gefunden: `if (n === 3 && currentRate !== lastRenderedRateS3)` Zeile 551 ✓
- journeyBtn-Handler gefunden: Zeile 574 ✓
- Stations-h3 gefunden: `stationArea.querySelector('h3')`, `tabIndex = -1` gesetzt ✓
- Befund: GRÜN — alle Codepfade eindeutig auffindbar

---

## Implementierung

### G2 — A11y Re-Announce Screen 3

- Änderung 1: `let lastRevealA11yText = '';` ergänzt (Zeile 489, neben `lastRenderedRateS3`)
- Änderung 2: Im Guard-Block `a11yRegion.textContent = ...` aufgeteilt: Text wird zuerst in `lastRevealA11yText` gespeichert, dann gesetzt (Zeilen 557–558)
- Änderung 3: `else if (n === 3 && lastRevealA11yText)` nach Guard-Block ergänzt — setzt `a11yRegion.textContent = lastRevealA11yText` bei Rückkehr zu S3 (Zeilen 559–561)
- Platzierung: innerhalb `showScreen()`, direkt nach dem Guard-Block
- Warum sicher: `lastRevealA11yText` ist leer bis erstem S3-Render → `else if` greift erst nach echtem Reveal; S2-Live-Region-Pfad (`renderJourneyStep`) ist separater Codepfad, unberührt
- renderS3-Guard erhalten: ja — Guard bleibt vollständig erhalten
- Kein KPI-Duplikat: ja — `renderS3()` wird im `else if`-Zweig nicht aufgerufen
- Kein Screen-2-Endwissensleck: ja — `else if` prüft `n === 3`, kein Einfluss auf S2

### G3 — Fokus Stations-h3

- Änderung: Zeilen 578–579 ersetzt durch `const h3 = stationArea.querySelector('h3');` + `(h3 ?? screen2.querySelector('h2'))?.focus();`
- Platzierung: im `else`-Zweig des journeyBtn-Handlers (nicht-letzte Station), direkt nach `renderJourneyStep(activeStationIndex)`
- Warum sicher: `renderJourneyStep` ruft `renderStationCard` auf, das die h3 neu erzeugt und `tabIndex = -1` setzt; `querySelector('h3')` findet sie danach zuverlässig; Null-Coalescing-Fallback auf h2 für den unwahrscheinlichen Fehlerfall
- Screenwechsel-Fokus erhalten: ja — `showScreen(3, true)` im `isLast`-Pfad ruft `showScreen` mit h2-Fokus auf, unberührt
- Kein Hidden-Fokus: ja — h3 ist nach `renderJourneyStep` sichtbar im DOM
- Kein Endwissensleck: ja — G3 ist reiner Fokus-Pfad, keine Daten-/Live-Region-Änderung

### G1 — bewusst unverändert

- href unverändert: ja — `href=""` in Zeile ~465 nicht angefasst
- Begründung: Ziel-URL unbekannt; Ghost-Kontext noch nicht definiert
- Folge-AP erst bei bekannter Ziel-URL: ja — separater AP, wenn URL vorliegt

### Screen-4-Live-Region-Befund

- Beobachtung: Screen 4 zeigt `kpiCount: 0`, Live-Region enthält noch Reveal-Summary aus Screen 3
- Bewertung: Kein Endwissens-Leak — Screen 4 kommt nach Screen 3, kein Zukunftswert
- Reparatur in diesem AP durchgeführt: nein
- Falls nein — Begründung: AP-Brief explizit: nicht automatisch reparieren; Befund dokumentiert; falls Screen 4 eigene Message benötigt → separater Mini-AP

---

## Prüfungen

### Statisch

- Screen 2 Live-Region weiterhin ohne Endwissen: ja — `renderJourneyStep` setzt nur `station.headline` ✓
- Screen 3 Live-Region bei jedem Eintritt gesetzt: ja — Guard-Zweig + `else if`-Zweig decken beide Pfade ✓
- renderS3 nicht unnötig erneut ausgeführt: ja — Guard bleibt erhalten ✓
- KPI-Cards nicht dupliziert: ja — `renderS3()` nur im Guard-Zweig ✓
- Stations-h3 fokussierbar: ja — `tabIndex = -1` bereits gesetzt (AP-15/AP-14) ✓
- Stationswechsel-Fokus auf h3: ja — `stationArea.querySelector('h3')?.focus()` ✓
- S3/S4 unverändert: ja — Screen-3-Reveal und Screen-4-Transfer-Logik nicht berührt ✓
- G1 unverändert: ja ✓

### Browser, falls durchgeführt

- durchgeführt: nein (kein Browserzugriff)
- S2 Stationswechsel Fokus: statisch geprüft — h3 nach renderJourneyStep vorhanden
- S2 → S3 Live-Region: statisch geprüft — Guard-Zweig läuft beim Erstbesuch
- S3 → S2 → S3 Live-Region: statisch geprüft — `else if`-Zweig setzt `lastRevealA11yText`
- S3 ↔ S4 KPI-Duplizierung: statisch geprüft — kein zweites `renderS3()` im `else if`
- Screen 4: statisch geprüft — keine Änderung an S4-Logik
- Befund: statisch GRÜN — Browser-Test durch Albert erforderlich (AP-17c)

---

## Diff-/Scope-Prüfung

- Nur erlaubte Dateien geändert: ja — app.js + dieses Protokoll ✓
- Keine Protected Files geändert: ja ✓
- Keine APP_SPEC-Änderung: ja ✓
- Keine CSS-Änderung: ja ✓
- Keine JSON-Änderung: ja ✓
- Keine ChartEngine-Änderung: ja ✓
- Keine Plugin-Änderung: ja ✓
- Keine G1-Reparatur: ja ✓
- Keine AP-17c/AP-18-Arbeit: ja ✓

---

## Status

grün (statisch)

## Blocker

nein

## Offene Punkte

- G1 `href=""` bleibt offen bis Ziel-URL bekannt
- Screen-4-Live-Region (Reveal-Summary bleibt nach S4-Eintritt): kein Blocker, separater Mini-AP wenn nötig
- B1-AP-17c: Browser-QA — G2/G3 manuell bestätigen (fwProbe + activeElement-Probe)

## Empfohlener nächster AP

- B1-AP-17c — A11y-/Fokus-Mini-QA (Browser-Test G2 + G3)
- G1 erst angehen, wenn Ziel-URL bekannt

---

## Bestätigungen

- Keine G1-Reparatur: ja ✓
- Kein href gesetzt: ja ✓
- Keine CTA-Ziel-URL ergänzt: ja ✓
- Keine Screen-4-CTA-Änderung: ja ✓
- Keine Navigation-Umgestaltung: ja ✓
- Keine Button-Label-Änderung: ja ✓
- Keine Screen-Zusammenlegung: ja ✓
- Keine neue Dramaturgie: ja ✓
- Keine Stylingdiskussion: ja ✓
- Keine CSS-Änderung: ja ✓
- Keine APP_SPEC-Änderung: ja ✓
- Keine QA_TEST_CASES-Änderung: ja ✓
- Keine app.test.html-Änderung: ja ✓
- Keine KPI-Änderung: ja ✓
- Keine `marketTimeStrategy()`-Änderung: ja ✓
- Keine `buildAppContext()`-Änderung: ja ✓
- Keine ChartEngine-Änderung: ja ✓
- Keine Plugin-Änderung: ja ✓
- Keine JSON-Änderung: ja ✓
- Keine AP-17c-Arbeit: ja ✓
- Keine AP-18-Arbeit: ja ✓
- Keine AP-19/AP-20/AP-21-Arbeit: ja ✓
- Keine Commits ausgeführt: ja ✓
- Kein Abschlussritual ausgeführt: ja ✓
