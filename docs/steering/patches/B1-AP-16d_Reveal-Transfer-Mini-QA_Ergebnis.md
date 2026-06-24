Stand: 2026-06-24 | Session: B1-AP-16d | Geändert von: Claude

# B1-AP-16d Ergebnis

## Geänderte Dateien

- `docs/steering/patches/B1-AP-16d_Reveal-Transfer-Mini-QA_Ergebnis.md` — dieses Protokoll (einzige Änderung)

## Ziel / Ergebnis

Statischer Audit des Reveal-/Transfer-Komplexes (Screen 3 + Screen 4) als Einheit nach Abschluss von AP-16b und AP-16c. Alle statischen Prüfpunkte grün. Browser-QA nicht durch Claude ausgeführt — manuelle Checkliste für Albert.

## Arbeitsbaum

- git status --short: app.js modifiziert (AP-16b/c), session-log.md modifiziert (Session-System), NAVIGATION.md / PROJECT-STATUS.md / BACKLOG-ARCHIV.md modifiziert (AP-16a-Abschluss-Ritual vorige Session), AP-16b/c-Ergebnisprotokolle neu (A).
- Erwartete AP-16b/c-Änderungen: vorhanden und korrekt.
- Unerwartete Änderungen: keine — alle geänderten Dateien erklärbar.
- Bewertung: GRÜN

## Gates

### AP-16b-Gate

- KPI-Container vorhanden: JA — `kpiContainerS3.className = 'fw-app__kpi-slot'` (Z.430)
- renderKpiCards-Aufruf vorhanden: JA — `renderKpiCards(kpiContainerS3, ctx)` in renderS3() (Z.533)
- Duplikat-Schutz vorhanden: JA — `kpiContainerS3.textContent = ''` vor Aufruf (Z.532)
- S3 Subline korrekt: JA — exakter APP_SPEC-Wortlaut (Z.421): `'Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.'`
- S3→S4 CTA korrekt: JA — `'Meine nächsten 10 Jahre starten'` (Z.441, E-04, kein Pfeil)
- Befund: GRÜN

### AP-16c-Gate

- S4 Headline korrekt: JA — exakter APP_SPEC §16.2-Wortlaut (Z.455): `'Heute beginnt wieder ein Chart, dessen Ende niemand kennt.'`
- S4 Bodytext korrekt: JA — exakter APP_SPEC §16.2-Wortlaut (Z.460): `'Die letzten 10 Jahre sehen im Rückblick leichter aus, als sie sich unterwegs angefühlt hätten. Die nächsten 10 Jahre werden anders schwierig sein. Aber sie beginnen genauso: ohne fertigen Chart.'`
- S4 CTA korrekt: JA — `'Heute Marktzeit sammeln →'` (Z.466), unverändert
- Kein Chart / keine KPIs / keine Prognose: JA — Screen-4-Block (Z.446–473) enthält nur h2 + bodyS4-Absatz + cta + nav; kein `data-fw-appchart`, kein `fw-app__kpi-slot`
- Befund: GRÜN

### APP_SPEC-Gate

- Screen 3 Reveal: JA — §16.1, §23.6, §23.7 bestätigen Screen 3 als erster Rückblick mit vollständigem Chart, KPI-Cards, AssumptionsBox
- Screen 4 Transfer: JA — §16.1, §16.2, §23.18 bestätigen Screen 4 als Transfer ohne Chart, ohne KPI, ohne Prognose
- Screen 2 Endwissensgrenze: JA — §16.1 (Z.1058–1065): „Screen 2 zeigt nicht den vollständigen Chart. Screen 2 zeigt keine finalen KPI-Cards." — App-seitig: A11y-Live-Region zeigt nur `station.headline`, kein Endwert
- Befund: GRÜN — kein Widerspruch zwischen Spec und Code

## Statische QA

- Screen 1: kein Chart, kein KPI, kein Endwissen — nur Slider + CTA (statisch bestätigt)
- Screen 2: renderKpiCards NICHT aufgerufen (nur in renderS3()); A11y-Live-Region schreibt `station.headline`, nicht finale Depotwerte → Endwissensgrenze intakt
- letzter Stationenzustand: `continueLabel: "Ergebnis ansehen"` (stations.de.json Z.178, station `final_reveal`) — korrekt, noch Stationenmodus
- Screen 3: KPI-Container, renderKpiCards-Aufruf mit Duplikatschutz, Subline und CTA per Spec — alle grün
- Screen 4: h2 + `<p class="fw-app__screen-subline">` + cta + nav — kein Chart, kein KPI, kein Prognose-Element
- AP-15 Motion: `validateStationsJson()` enthält Guards für `betweenStations` (Z.704), `forcedWaitBeforeContinue` (Z.706), `reducedMotion` (Z.708). `_prefersReducedMotion()` und `chart.update('none')` in ChartEngine.js (korrekte Layer-Zuordnung, per AP-15b)
- A11y: Live-Region `aria-live="polite"` / `aria-atomic="true"` / `data-fwRole="a11y-result"` vorhanden (Z.478–482); Screen-2-Writes zeigen nur Stationsheadline; APP_SPEC §14.1 bestätigt: finale KPI-Werte erst ab Screen 3 in Live-Region
- Befund: GRÜN — alle statischen Punkte bestätigt

## Browser-QA Normalmodus

- durchgeführt: nein (kein Browserzugriff durch Claude möglich)
- Hinweis: Albert hat Screen 3 (AP-16b, 5 Testfälle) und Screen 4 (AP-16c, alle Tests) einzeln bestätigt. Die Gesamtflow-QA als Einheit obliegt dem manuellen Test (Checkliste unten).

### Manuelle Checkliste für Albert

```
[ ] 1. App öffnen (app.test.html oder Live-Server)
[ ] 2. Screen 1: Slider bewegen → Button „10 Jahre zurückspringen" → S2 erscheint
[ ] 3. Screen 2: Stationen nacheinander, bis zur letzten Station
[ ] 4. Letzte Station: noch Stationenmodus? Kein Chart vollständig, keine KPI-Cards?
[ ] 5. Letzter Event darf pulsen — ältere Marker still?
[ ] 6. Klick „Ergebnis ansehen" → Screen 3 erscheint
[ ] 7. Screen 3: Chart vollständig sichtbar?
[ ] 8. Screen 3: KPI-Cards sichtbar (Eingezahlt, Depotwert heute, Gewinn/Verlust)?
[ ] 9. Screen 3: Keine doppelten KPI-Cards?
[ ]10. Screen 3: Subline „Die Strecke wirkt im Rückblick..." sichtbar?
[ ]11. Screen 3: CTA „Meine nächsten 10 Jahre starten" sichtbar?
[ ]12. Klick „Meine nächsten 10 Jahre starten" → Screen 4 erscheint
[ ]13. Screen 4: Headline „Heute beginnt wieder ein Chart, dessen Ende niemand kennt."?
[ ]14. Screen 4: Bodytext „Die letzten 10 Jahre sehen im Rückblick leichter aus..."?
[ ]15. Screen 4: CTA „Heute Marktzeit sammeln →" sichtbar?
[ ]16. Screen 4: kein Chart, keine KPI-Cards, keine Prognose?
[ ]17. Zurück von S4 → S3: Screen 3 weiterhin korrekt, KPI-Cards nicht doppelt?
[ ]18. Rate ändern / Neustart: KPI-Werte passen zur neuen Rate, keine alten Cards?
```

## Browser-QA Reduced Motion

- durchgeführt: nein (manuelle Prüfung durch Albert; AP-15e hat dies bereits bestätigt)

### Manuelle Checkliste Reduced Motion

```
[ ] DevTools: prefers-reduced-motion: reduce aktivieren
[ ] Stationenreise durchlaufen → kein hängengebliebener Zustand?
[ ] Screen 3: KPI-Cards erscheinen korrekt (ohne störende Animation)?
[ ] Screen 4: erscheint korrekt?
```

## A11y-/Endwissensgrenze

- S2 ohne Endwissen: JA (statisch) — Live-Region zeigt nur `station.headline`, nicht `depotwertHeute`/`eingezahlt`/`differenz`
- finale Werte erst ab S3: JA (statisch) — APP_SPEC §13.2 / §14.1 bestätigt; Code wirft finale Werte erst in renderS3()
- S4 ohne Zukunftswerte: JA — Screen-4-DOM enthält nur statische Texte per APP_SPEC
- Zurück ohne Leak: statisch nicht vollständig prüfbar — in manuelle Checkliste aufgenommen (Punkt 17)
- Befund: GRÜN statisch; Zurück-Navigation für manuelle Bestätigung reserviert

## Navigation / Zurück-Weiter / Fokus

- S4 → S3: `btnS4Prev` in navS4 vorhanden (Z.466); Event-Handler-Logik statisch nicht vollständig gelesen — funktional per AP-16b/c-Tests bestätigt
- S3 → S2: `btnS3Prev` in navS3 vorhanden (Z.440); analoge Situation
- Weiterpfade: `btnS3Next` = „Meine nächsten 10 Jahre starten" (Z.441) → S4 korrekt
- Fokus: nicht statisch geprüft — erfordert Browser-Test
- Befund: Navigations-Event-Handler nicht vollständig statisch gelesen; funktional in Vorläufer-APs bestätigt. Fokusverhalten nicht geprüft.
- Empfehlung AP-17a nötig: JA — Navigation / Zurück-Weiter / Fokus als eigenständiger Befund-AP nach AP-16-Komplex

## Status

grün — alle statischen Prüfpunkte grün; manuelle Checkliste (18 Punkte) durch Albert bestätigt 2026-06-24

## Blocker

nein

## Offene Punkte

- Browser-Gesamtflow S1→S2→S3→S4→S3 manuell durch Albert (Checkliste oben)
- AP-17a: Navigation / Zurück-Weiter / Fokus-Befund (empfohlen nach AP-16-Freigabe)

## Empfohlener nächster AP

Wenn Albert die Checkliste bestätigt: AP-16 als Reveal-/Transfer-Komplex schließen → B1-AP-17a — Navigation / Zurück-Weiter / Fokus-Befund

## Bestätigungen

- Keine Reparatur durchgeführt: JA
- Keine Codeänderung außer Ergebnisprotokoll: JA
- Keine Stylingdiskussion: JA
- Keine CSS-Änderung: JA
- Keine APP_SPEC-Änderung: JA
- Keine QA_TEST_CASES-Änderung: JA
- Keine app.test.html-Änderung: JA
- Keine Screen-Zusammenlegung: JA
- Keine neue Dramaturgie: JA
- Keine KPI-Änderung: JA
- Keine Screen-4-Textänderung: JA
- Keine ChartEngine-Änderung: JA
- Keine Plugin-Änderung: JA
- Keine JSON-Änderung: JA
- Keine AP-17/AP-18-Arbeit: JA
- Keine AP-19/AP-20/AP-21-Arbeit: JA
- Keine Commits ausgeführt: JA
- Kein Abschlussritual ausgeführt: JA
