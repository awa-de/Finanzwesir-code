# V43 QUICK-REFERENCE: KRITISCHE REGRESSION-CHECKS

**Zeitaufwand:** 5-10 Minuten für diese Checks durchgehen  
**Relevanz:** BLOCKER FÜR RELEASE FREIGABE

---

## ✅ 13-PUNKT REGRESSION-CHECKLIST

### TIER 1 — CRITICAL (Must Pass)

**□ 1. STRATEGY PATTERN — Alle 3 Chart-Types vorhanden**
```
Suche nach:
✅ CHART_STRATEGIES.line (prepareData, getOptions, renderControls)
✅ CHART_STRATEGIES.bar (prepareData, getOptions, renderControls)
✅ CHART_STRATEGIES.pie (prepareData, getOptions, renderControls)

Falls NICHT gefunden: 🔴 BLOCKER
```

---

**□ 2. SAFDOM — Keine HTML-Injection-Vektoren**
```
Suche nach:
❌ innerHTML = (sollte 0 sein)
❌ insertAdjacentHTML (sollte 0 sein)  
❌ dangerouslySetInnerHTML (sollte 0 sein)

Sollte vorhanden sein:
✅ SafeDOM.setText()
✅ SafeDOM.createElement()
✅ SafeDOM.addEventListener()

Falls innerHTML gefunden: 🔴 BLOCKER
```

---

**□ 3. CHARTUTILS — Kern-Helpers intakt**
```
Suche nach Funktionen:
✅ normalizeDate(dateStr)
✅ formatCurrency(value, currency)
✅ detectCurrency(csvData)
✅ parseCSV(url/string)
✅ getAxisConfig(chartType)

Falls eine fehlt: 🟠 HOCH
```

---

**□ 4. CSV PARSER — Hybrid-Handling vorhanden**
```
Sollte können:
✅ ISO-8601: 2023-01-15
✅ Deutsche: 15.01.2023
✅ US: Jan 15, 2023
✅ Währungs-Cleaning: € → entfernt

Falls nur ISO-8601 supported: 🟠 HOCH
Falls Währungs-Cleaning weg: 🟠 HOCH
```

---

**□ 5. DESIGN-TOKENS — CSS-Variables nicht degradiert**
```
Sollte vorhanden sein:
✅ :root { --color-primary: ...; }
✅ ThemeUtils.getComputedStyle()
✅ Neue Chart-Types nutzen ThemeUtils, nicht hardcoded Hex

Falls zurück zu hardcoded Hex: 🟠 HOCH
Falls ThemeUtils gelöscht: 🟠 HOCH
Falls Performance-Block (getComputedStyle nicht gecacht): 🟡 MEDIUM
```

---

### TIER 2 — IMPORTANT (Should Pass)

**□ 6. BAR-CHART — Alle 3 Modi funktionieren**
```
Sollte vorhanden sein:
✅ renderControls() mit 3 Buttons
✅ Mode 1: "Histoire" (Zeit-Reihe)
✅ Mode 2: "Ranking" (nach Performance)
✅ Mode 3: "Asset-Vergleich" (Pivot)
✅ Smart Ghosting (Opacity-Gradient)

Falls <3 Modi: 🟡 MEDIUM
Falls Ghosting weg: 🟡 MEDIUM
```

---

**□ 7. PIE-CHART — Time-Travel erhalten**
```
Sollte vorhanden sein:
✅ renderControls() mit "Früher/Später" Buttons
✅ Center-Text zeigt Jahr
✅ Hover-Interaktion (Non-fokussierte zu 0.1 Opacity)
✅ Click funktioniert

Falls Buttons weg: 🟡 MEDIUM
Falls Hover-Effect weg: 🟡 MEDIUM
```

---

**□ 8. LINE-CHART — Datenlücken-Handling**
```
Sollte vorhanden sein:
✅ Chart.js Date-Adapter geladen
✅ Time-Achse (nicht Category)
✅ Datenlücken NICHT interpoliert
✅ Sequenzielle Farben (wiederholbar)

Falls Datenlücken interpoliert: 🟡 MEDIUM
Falls Farben Random: 🟡 MEDIUM
```

---

**□ 9. RESPONSIVE DESIGN — Mobile/Tablet/4K**
```
Sollte vorhanden sein:
✅ CSS: .container { display: flex; flex-direction: column; }
✅ CSS: canvas { position: absolute; inset: 0; }
✅ Legend: flex: 0 0 auto; (nicht mit flex: 1)
✅ Funktioniert auf 320px bis 3840px

Falls 320px oder 4K broken: 🟡 MEDIUM
Falls Canvas nicht absolute: 🟡 MEDIUM
```

---

### TIER 3 — NEW (V41 Features, müssen erhalten bleiben)

**□ 10. A11Y-TABLE — WCAG-AA Konformität**
```
Sollte vorhanden sein:
✅ generateA11yTable() für ALLE Chart-Types
✅ sr-only Klasse: clip: rect(0,0,0,0)
✅ Semantik: <thead>, <tbody>, <th>, <td>
✅ Sampling bei >500 Rows (optional aber empfohlen)

Falls generateA11yTable() gelöscht: 🔴 BLOCKER
Falls sr-only falsch (visibility: hidden): 🔴 BLOCKER
Falls nur einige Chart-Types: 🟠 HOCH
```

---

**□ 11. ERROR-HANDLING — Robustheit**
```
Sollte vorhanden sein:
✅ Try-Catch um Parsing
✅ Benutzerfreundliche Error-Messages
✅ Graceful Degradation (Partial Data OK)
✅ Alle Chart-Types geschützt

Falls Try-Catch weg: 🔴 BLOCKER
Falls zu Crashes: 🔴 BLOCKER
Falls neuer Type ohne Fehlerbehandlung: 🟠 HOCH
```

---

**□ 12. CURRENCY-DETECTION — Financial UX**
```
Sollte vorhanden sein:
✅ Scan erste Zeile auf € $ CHF
✅ Metadata speichern
✅ Y-Achsen-Ticks: "€5.200,50" Format
✅ Tooltips mit Währung
✅ Fallback für unbekannte Währungen

Falls Scanning gelöscht: 🟠 HOCH
Falls Y-Achsen ohne Währung: 🟠 HOCH
Falls Tooltips broken: 🟠 HOCH
```

---

**□ 13. NEUE CHART-TYPES — Sind echte Erweiterung**
```
Wenn neue Types vorhanden (z.B. Radar, Doughnut):
✅ Alte Types (line, bar, pie) sind NICHT gelöscht
✅ Alte Types funktionieren wie zuvor
✅ Neue Types folgen Strategy-Pattern
✅ Neue Types nutzen SafeDOM
✅ Neue Types haben A11y-Table
✅ Neue Types haben Error-Handling

Falls alte Types gelöscht: 🔴 BLOCKER
Falls neue Types brechen alte: 🔴 BLOCKER
Falls neue Types ohne SafeDOM: 🔴 BLOCKER
```

---

## 🎯 SCORING

**Zähle die Checkboxen:**

### Ideal (Release-Ready):
```
✅ Alle 13 Checks BESTANDEN
✅ Keine Blockier-Findings
✅ ≤2 Medium Findings (V1.1 Backlog)
→ FREIGABE OK
```

### Gut (mit kleinen Fixes):
```
✅ Tier-1 (Checks 1-5): 100% ✅
✅ Tier-2 (Checks 6-9): ≥80% ✅
✅ Tier-3 (Checks 10-13): ≥90% ✅
→ KLEINE FIXES, dann freigeben
```

### Kritisch (Nicht freigeben):
```
❌ Tier-1: <100% (irgendwas fehlt)
❌ Tier-2: <50% (Features weg)
❌ Tier-3: A11y oder Error-Handling weg
❌ Blockier-Findings
→ NICHT FREIGEBEN ohne Major-Fixes
```

---

## 📊 RISIKO-MATRIX

| Befund | Severity | Action |
|--------|----------|--------|
| **Strategy-Pattern kaputt** | 🔴 | Stop Release |
| **SafeDOM verloren** | 🔴 | Stop Release |
| **A11y-Table weg** | 🔴 | Stop Release |
| **Error-Handling weg** | 🔴 | Stop Release |
| **CSS-Variables zu Hex** | 🟠 | Fix before Release |
| **Currency Detection kaputt** | 🟠 | Fix before Release |
| **Bar-Modi reduziert** | 🟡 | Document & Backlog |
| **Performance nicht gecacht** | 🟡 | Document & Backlog |
| **WebWorker nicht da** | 🟡 | Backlog (V1.1) |
| **Neue Types ohne Features** | 🟡 | Document limitation |

---

## 🚀 EMPFOHLENER PROZESS

### Phase 1: Quick-Check (5 min)
```
□ Alle 13 Checks durchgehen
□ Blockier-Findings notieren
□ Score berechnen
```

### Phase 2: Deep-Dive (wenn nötig, 15 min)
```
□ Code-Review der kritischen Stellen
□ Browser-Tests (Runtime)
□ Vergleich gegen V41 Baseline
```

### Phase 3: Decision (5 min)
```
□ Entscheidung: RELEASE oder HOLD
□ Falls HOLD: Bug-Report mit Prioritäten
□ Falls RELEASE: Sign-Off dokumentieren
```

---

## ⏱️ WENN ALLE CHECKS BESTANDEN:

✅ **V43 ist freigabereif**

Nächste Schritte:
1. Code-Tag: `v1.0-release`
2. Release Notes (mit Changelog vs V41)
3. Deployment Guide (für Ghost-Admins)
4. V1.1 Roadmap kommunizieren

---

**Dieses Checklist ist "The Truth".** Nutze es für Go/No-Go Decision.

Bei Unsicherheiten: **HOLD and Review**, nicht "wird schon gut gehen".

Quality > Speed. 🎯
