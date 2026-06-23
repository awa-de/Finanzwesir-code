Stand: 2026-06-23 | Session: B1-AP-15a | Geändert von: Claude

# B1-AP-15a — Motion-Befund: Ergebnisprotokoll

AP-Typ: Audit / Befund — kein Code geändert  
App: `Apps/prokrastinations-preis`

---

## Geprüfte Dateien

| Datei | Zweck |
|---|---|
| `Apps/prokrastinations-preis/app.js` | Screen-Controller, renderJourneyStep, Slider-Events |
| `Apps/prokrastinations-preis/app.css` | CSS-Reduced-Motion-Block, Transitions |
| `Apps/prokrastinations-preis/config/stations.de.json` | motionRules-Konfiguration |
| `Apps/prokrastinations-preis/APP_SPEC.md` | §14.6, §16.1, §16.3, §16.4 |
| `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` | Pulse-Implementierung |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | _draw(), chart.update() |
| `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` | getChartConfig(), animation-Block |

---

## Befunde

### 1. Screen-Transitions (S1→S2→S3→S4)

**Ist:** `showScreen()` (app.js Z.529–547) togglet ausschließlich das `hidden`-Attribut. Kein CSS-Transition, kein JS-Überblenden, keine Wartezeit.

**Spec-Soll (§16.4):** „Screen-Flow-Übergänge: deaktiviert → direkt Zielzustand"

**Bewertung:** ✅ Erfüllt durch Abwesenheit. app.js-Kommentar Z.526 bestätigt die Absicht explizit:
```js
// NEW — Screen-Controller (prefers-reduced-motion: hidden-Toggle ist direkt, kein CSS-Übergang)
```
Kein Handlungsbedarf.

---

### 2. Draw-Animation zwischen Stationen (Screen 2)

**Ist:** APP_SPEC §16.3 markiert Draw-Animation als `⏳ bewusst offen`.

Was tatsächlich passiert:
- **Erster Aufruf** (S1→S2, `new Chart()`): Chart.js-Default-Animation greift (~1000 ms, `easeOutQuart`)
- **Folge-Aufrufe** (Stations-Wechsel, `chart.update()`): Chart.js animiert Datenpunkte zwischen altem und neuem Zustand

`LineChartStrategy.getChartConfig()` hat kein explizites `animation`-Objekt → Chart.js-Defaults aktiv.

**`motionRules.betweenStations: "short_draw_animation"` (stations.de.json Z.29):** Konfiguriert, aber nicht ausgelesen. `validateStationsJson()` prüft nur `mode === 'user_stepped'` (app.js Z.690–691). Kein Code-Pfad liest `betweenStations` oder `reducedMotion` aus dem JSON.

**Reduced-Motion-Lücke:** Kein Reduced-Motion-Pfad für Draw-Animation implementiert. Chart.js respektiert `prefers-reduced-motion` nicht automatisch. `chart.update()` animiert immer, unabhängig von der Systemeinstellung.

**Spec-Soll (§14.6, §16.4):** „Draw-Animation zwischen Stationen: deaktiviert bei `prefers-reduced-motion` → sofort zur nächsten Station"

**Bewertung:** ⚠️ Lücke. Die Draw-Animation selbst ist bewusst offen (⏳), aber der Reduced-Motion-Pfad fehlt auch für den `chart.update()`-Fall, der bereits passiert.

---

### 3. Pulse (FwAnnotationPulsePlugin.js)

**Ist:** ✅ Vollständig implementiert (B1-AP-14c4, 2026-06-18)

| Eigenschaft | Spec-Soll | Ist-Zustand |
|---|---|---|
| Reduced Motion | kein Pulse, Ring statisch sichtbar | `_reducedMotion()` in `afterDraw` Z.84 → early return ✅ |
| Scope | Screen 2 only | `annotationPulse.enabled` nur für `chartEngine2` ✅ |
| Dauer | 1200 ms (2 × 600 ms) | `PULSE_DURATION = 1200` ✅ |
| Scale-Maximum | 1.8× | `PULSE_SCALE_MAX = 1.8` ✅ |
| Pulsform | `abs(sin(progress × π × 2))` | Z.48 ✅ |
| Keine Endlosschleife | stoppt nach 1200 ms | `expired.push(id)` wenn `elapsed ≥ DURATION` ✅ |
| Ring statisch bei RM | Ring bleibt sichtbar | Chart.js zeichnet Marker, Plugin springt nur aus `afterDraw` ✅ |

Kein Handlungsbedarf.

---

### 4. Marker-Fade-in (Screen 3)

**Spec-Soll (§16.1 / APP_SPEC Z.1140):** „Stille Stationenmarker erscheinen (Fade-in; bei Reduced Motion: sofort, ohne Animation)"

**Ist:** Kein Fade-in implementiert. `buildJourneyStationAnnotations()` liefert das Marker-Dataset direkt; `chart.update()` rendert es ohne Opacity-Ramp. Marker erscheinen sofort — verhalten sich damit identisch zum Reduced-Motion-Soll, aber ohne Modus-Unterscheidung.

Kein Eintrag in der UI-Primitives-Tabelle §16.3 (kein Status-Feld). Nicht explizit als `⏳ offen` markiert.

**Bewertung:** ~ Implizit zurückgestellt. Kein Blocker, da Sofort-Erscheinen das korrekte Reduced-Motion-Verhalten ist.

---

### 5. CSS-Reduced-Motion-Block

```css
/* app.css Z.110–115 */
@media (prefers-reduced-motion: reduce) {
  .fw-app__slider,
  .fw-app__slider-value {
    transition: none;
  }
}
```

**Befund:** `.fw-app__slider` und `.fw-app__slider-value` haben in keiner Basisregel ein `transition`-Property. Der Block setzt `transition: none` auf Selektoren ohne aktive Transition → de facto ohne Wirkung. Toter Code oder Vorausschau-Platzhalter.

**Bewertung:** ⚠️ Kosmetisch. Kein funktionaler Schaden, aber der Block täuscht eine Absicherung vor, die nicht greift.

---

### 6. `motionRules`-Felder in stations.de.json

```json
"motionRules": {
  "mode": "user_stepped",
  "betweenStations": "short_draw_animation",
  "forcedWaitBeforeContinue": false,
  "reducedMotion": "instant_step"
}
```

- `mode: "user_stepped"` → validiert (app.js Z.690–691) ✅
- `betweenStations: "short_draw_animation"` → nicht ausgelesen ⚠️
- `reducedMotion: "instant_step"` → nicht ausgelesen ⚠️

Die Konfiguration ist dokumentarisch vorhanden, hat aber keinen Code-Effekt.

---

## Gap-Matrix

| Bereich | Spec-Soll | Ist-Zustand | Status |
|---|---|---|---|
| Screen-Transitions | direkt (kein Übergang) | `hidden`-Toggle direkt | ✅ erfüllt |
| Draw-Animation (normal) | kurze Animation | Chart.js-Default (~1 s) | ⏳ bewusst offen |
| Draw-Animation Reduced Motion | sofort, kein Übergang | kein RM-Pfad vorhanden | ⚠️ Lücke |
| Pulse (normal) | 1200 ms, 1.8×, 2 Pulse | implementiert | ✅ erfüllt |
| Pulse Reduced Motion | kein Pulse, Ring statisch | `_reducedMotion()`-Guard ✅ | ✅ erfüllt |
| Marker-Fade-in Screen 3 | Fade-in / bei RM: sofort | sofort (kein Fade) | ~ implizit offen |
| CSS RM-Block | — | Selektoren ohne Transition | ⚠️ toter Code |
| `motionRules` JSON-Felder | konfiguriert + ausgelesen | konfiguriert, nicht ausgelesen | ⚠️ ohne Effekt |

---

## Gesamtbewertung

**Status: GELB**

Ein echter funktionaler Gap: Die `chart.update()`-Transition beim Stations-Wechsel (Screen 2) ignoriert `prefers-reduced-motion`. Alle anderen Motion-Aspekte sind entweder korrekt implementiert oder bewusst zurückgestellt.

**Blocker:** Nein. Die App funktioniert korrekt. Der RM-Gap ist ein A11y-Defizit, kein Absturz.

---

## Empfehlung für B1-AP-15b

**Minimaler Schnitt:** Nur die funktionierende Reduced-Motion-Absicherung für `chart.update()`.

Konkret: Beim `chart.update()`-Aufruf (ChartEngine `_draw()`, Pfad `if (state.chartInstance)`) prüfen, ob `prefers-reduced-motion: reduce` aktiv ist, und wenn ja, `chart.update('none')` statt `chart.update()` aufrufen. Chart.js unterstützt `chart.update('none')` für sofortigen Sprung ohne Animation.

**Optionaler Erweiterungs-Scope** (separat, nicht in 15b):
- `motionRules.betweenStations` und `motionRules.reducedMotion` aus stations.de.json auslesen
- CSS-RM-Block bereinigen (toten Code entfernen oder fundierte Transition ergänzen)
- Marker-Fade-in Screen 3 implementieren

**Nicht empfohlen für 15b:** Fade-in Screen 3, Draw-Animation-Implementierung (⏳ bewusst offen per Spec).

---

## Empfohlene Folge-APs

| AP | Inhalt | Priorität |
|---|---|---|
| B1-AP-15b | `chart.update('none')` bei `prefers-reduced-motion: reduce` in ChartEngine | ⚠️ sollte |
| (optional) | CSS-RM-Block bereinigen | niedrig |
| (optional) | `motionRules`-Felder auslesen | niedrig, wenn Draw-Animation später implementiert wird |
