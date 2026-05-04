# AP-6c: Touch-Tooltip-Ergonomie — Detail

**Status:** 🟡 DevTools-OK (2026-02-19)
**Bereich:** Engine — Layer 5 (Renderer/Layout)
**Priorität:** M | **Abhängigkeit:** keine

---

## Problem

Touch-Tooltip-Ergonomie auf echten Smartphones noch nicht verifiziert.
DevTools-Emulation kann die "dicke Finger"-Problematik (44px Finger vs. 1px Mauszeiger)
nicht zuverlässig aufdecken.

## DevTools-Testergebnis (bereits abgeschlossen)

12 Prüfungen bestanden auf iPhone SE + Galaxy S21 Emulation:
- Line dicht/minimal → ✅
- Bar Crowd/Ranking → ✅
- Pie → ✅
- Legend-Toggle → ✅

Aktuelle Konfiguration: `interaction: { mode: 'index', intersect: false }` — funktioniert.

## Offene Aktion (Pre-Launch Pflicht)

Vor Launch auf echtem Smartphone testen (iPhone SE oder vergleichbar).

**Testfälle:**
1. Line-Chart, dichte Datenpunkte — Tooltip erscheint bei Touch ohne Pinch-Fehler?
2. Bar-Chart, Crowd-Ansicht — Tooltip zeigt korrekten Balken?
3. Pie-Chart — Segment-Tooltip bei Touch korrekt?
4. Legend-Toggle per Touch — reagiert zuverlässig?

**Falls Probleme auftreten:**
```js
interaction: {
  mode: 'index',
  intersect: false,
  axis: 'x'       // ← hinzufügen falls nötig
}
// Alternativ: pointHitRadius erhöhen
```

## Betroffene Dateien

Änderung nur falls echter Geräte-Test Probleme zeigt:
- `FwSmartTooltips.js` oder `BaseChartStrategy.js` (interaction-Config)

## Abschluss-Kriterium

Echter Smartphone-Test ohne Probleme → ✅ in BACKLOG-ARCHIV verschieben.
