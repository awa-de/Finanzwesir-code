# B1-AP-14r Rettungsbefund

## 1. Git-Status

**committed:**
- `d97231a` — docs(B1-AP-14b): progressEl-Orientierungslogik + PEER-REVIEW + **Chart.getChart()-Block** (trotz gegenteiliger Commit-Message)
- `46632a0` — docs(B1-AP-14a): APP_SPEC V2.6, QA_TEST_CASES V1.3, REDAKTIONS_GATE V1.2 (rein dokumentarisch)
- `00bf1f8` — feat(B1-AP-14): Stationen-Zeitreise, Screen 2 Umbau (buildVisibleChartSeries etc.)

**uncommitted:**
- `.claude/learning/session-log.md` — Session-Start-Eintrag von heute (harmlos, durch /start geschrieben)
- Sonst: **keine** uncommitted Änderungen in app.js, app.css oder Engine-Dateien

**untracked:**
- Keine relevanten untracked Dateien

---

## 2. Relevante AP-14-Commits

| Commit | Inhalt | Risiko |
|--------|--------|--------|
| `d97231a` | progressEl-DOM, fw-app__journey-progress CSS, PEER-REVIEW-Doku, **Chart.getChart()-Block** (app.js:455-464) | **ROT** — kaputten Post-Render-Hack committed, Commit-Message war falsch |
| `46632a0` | APP_SPEC/QA/REDAKTIONS_GATE erweitert (kein Code) | **GRÜN** — korrekt und sauber |
| `00bf1f8` | buildVisibleChartSeries, renderJourneyStep, selectStationsForJourney, renderStationCard, calcStationIntermediate, A11y-Sperre | **GRÜN** — korrekt implementiert, albert-bestätigt |

---

## 3. Zustand app.js

**buildVisibleChartSeries:**
Vorhanden und committed (00bf1f8, app.js:190). Filtert `ctx.chartSeries` auf `month <= stationMonth`. Korrekt.

**Orientierungs-Chip:**
`progressEl` DOM-Element erstellt (d97231a, app.js:360-361), Text-Update in renderJourneyStep (d97231a, app.js:465-471). Funktionsfähig.

**Post-Render-X-Achsen-Hack:**
**COMMITTED** in `d97231a`, app.js:455-464:
```js
const chartInst2 = Chart.getChart(canvas2);   // ← kaputt
if (chartInst2 && chartInst2.options.scales && chartInst2.options.scales.x) {
  const fullEnd = ctx.chartSeries[ctx.chartSeries.length - 1];
  chartInst2.options.scales.x.max = new Date(fullEnd.month + '-01').getTime();
  chartInst2.update('none');
}
```
Laut Peer-Review und ATTEMPT-LOG funktioniert dieser Block nicht (RAF-Timing, fwContext-freeze, endLimit-Logik). Rückbau nötig.

**xDisplayRange / displayRange:**
Nicht vorhanden. Weder in app.js noch in Engine-Dateien.

**yRangePolicy / cumulative-expand-zero:**
Nicht vorhanden. Weder in app.js noch in Engine-Dateien.

---

## 4. Zustand app.css

**journey-progress CSS:**
Vorhanden und committed (d97231a, app.css:272-278):
```css
/* NEW — AP-14b: Orientierungs-Chip (APP_SPEC §16.1) */
.fw-app__journey-progress { font-size: 0.8125rem; color: var(--fw-color-muted, #555555); ... }
```
Korrekt. Kein Rückbau nötig.

**sonstige AP-14-Spuren:**
`/* === NEW — AP-14: Stationen-Zeitreise (Screen 2) === */` als Kommentar-Trenner (app.css:195). Harmlos.

---

## 5. Zustand Engine-Dateien

**ChartEngine.js:** Kein AP-14b-spezifischer Code. Nicht berührt.

**BaseChartStrategy.js:** Kein AP-14b-spezifischer Code. Nicht berührt.

**LineChartStrategy.js:** Kein AP-14b-spezifischer Code. Nicht berührt.

**FwSmartXAxis.js:** Kein AP-14b-spezifischer Code. Nicht berührt. Die Ursachen (endLimit aus `context.dataRange.max`, nicht aus `axis.max`) sind unverändert vorhanden.

**FwSmartYAxis.js:** Kein AP-14b-spezifischer Code. Nicht berührt.

**FwDateUtils.js:** Enthält den Hinweis `AP-14 Universal Snap` (Zeile 19) — das ist ein historischer Eintrag vom 2026-02-26 (V4.9.0, getSnapTarget-Umbau). Unrelated zu B1-AP-14b.

**neue Plugin-Dateien:** Keine.

---

## 6. Zustand Doku / Briefings

**vorhandene neue AP-14-Briefings:**
- `docs/steering/PEER-REVIEW-B1-AP-14b-XAxis-Architecture.md` — vorhanden, committed, vollständige Ursachenanalyse + Lösungsarchitektur (displayRange-Ansatz)
- `ATTEMPT-LOG.json` — korrekt gepflegt: B1-AP-14b BLOCKED, 1 attempt, brokenCode benannt, proposedFix dokumentiert

**alte AP-14a/AP-14b-Doku-Spuren:**
- `uebergabeprompt_AP14_progressive_domain_linechart.md` — **nicht gefunden**
- `AP-14c-EventMarker-Architecture-Briefing.md` — **nicht gefunden**
- Keine Handover-Datei für AP-14 (nur Slice-4-Handovers vom 2026-06-10)

**Widersprüche:**
- `d97231a` Commit-Message: „Kein broken Code committed. Chart.getChart()-Block bleibt uncommitted."
- Realität (git blame): Chart.getChart()-Block ist **in diesem selben Commit** committed (Zeilen 455-464)
- ATTEMPT-LOG.json nennt ihn korrekt als `brokenCode` der „vor nächstem AP revertiert werden" muss — widerspricht der Commit-Message, stimmt aber mit der Realität überein

---

## 7. Ampel

**GELB/ROT**

**Begründung:** Kaputten Post-Render-Hack im Repo, committed, funktioniert nicht (drei unabhängige Ursachen laut Peer-Review). Die übrigen Teile (buildVisibleChartSeries, Orientierungs-Chip, A11y-Sperre, Spec-Erweiterungen) sind sauber. Keine Engine-Dateien berührt. Kein neuer Architekturcode vorhanden. Die neue Lösung (displayRange) existiert nur als Konzept im Peer-Review-Dokument — noch kein Code.

---

## 8. Empfehlung für nächste Schritte

**B1-AP-14a2 nötig: nein**
AP-14a ist vollständig und korrekt (rein dokumentarisch, kein Code). Kein Rückbau, kein Nachbessern nötig.

**B1-AP-14b0 nötig: ja**
Rückbau des Chart.getChart()-Blocks (app.js:455-464). Nur diese 10 Zeilen entfernen. progressEl-Chip und CSS bleiben. Falscher Code ist committed in d97231a — gezielter Revert-Patch für genau diese Zeilen.

**B1-AP-14b1 nötig: ja**
Engine-Erweiterung: `displayRange` in fwContext (LineChartStrategy.js), `xDisplayMax` in ChartEngine.js, `endLimit`-Logik in FwSmartXAxis.js. Erfordert Alberts explizite Freigabe für drei Engine-Dateien (Layer 2-4).

**B1-AP-14b2 nötig: ja**
App-Integration: `features.xDisplayMax` in renderJourneyStep-Aufruf (app.js). Kann erst nach B1-AP-14b1 erfolgen.

**B1-AP-14b3 nötig: unklar**
Hängt davon ab, ob Event-Marker (aus der Briefing-Beschreibung) ein eigenes AP werden sollen. Kein `AP-14c-EventMarker-Architecture-Briefing.md` gefunden — Konzept ist nicht im Repo.

---

## 9. Wichtigste Risiken

**Risiko 1:** Falscher Code committed — `Chart.getChart()`-Block ist in `d97231a` drin. Wird die App mit diesem Code deployed, wirkt der Chart je nach RAF-Timing entweder unverändert (null-Fall) oder zeigt eine leere, unbeschriftete X-Achsen-Erweiterung (axis.max-Override ohne Tick-Neuberechnung). Kein Absturz, aber falsches UX-Verhalten.

**Risiko 2:** Commit-Message-Widerspruch könnte in späteren Sessionen zu Fehleinschätzungen führen — wer `d97231a` liest, erwartet sauberen Code. ATTEMPT-LOG korrigiert das, aber nur wer ihn liest.

**Risiko 3:** Die geplante displayRange-Architektur berührt `FwSmartXAxis._generateLinearTicks()` (die Tick-Density Matrix). Das ist die komplexeste Stelle der Engine. Ein falscher Eingriff dort erzeugt falsche Achsenbeschriftungen in allen Line-Charts, nicht nur im prokrastinations-preis.

---

## 10. Bestätigungen

- Keine Dateien geändert: **ja** (session-log.md durch /start-Sequenz, nicht durch diesen Befund)
- Kein Commit erstellt: **ja**
- Keine JSON geändert: **ja**
- Keine Engine-Dateien geändert: **ja**
- Keine git-reset/restore/clean-Befehle ausgeführt: **ja**
