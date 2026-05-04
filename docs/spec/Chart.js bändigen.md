## Bug: Chart.js überschreibt eigene X-Achsen-Ticks bei kleinen Bildschirmen (Regression)

### Kontext
Wir verwenden Chart.js mit einer **TimeScale** auf der X-Achse.
Unsere eigenen Kalender-Ticks (Monatsgrenzen) werden über `afterBuildTicks` gesetzt.
`autoSkip: false` ist konfiguriert.

**Das Problem:** Auf kleinen Bildschirmen überschreibt Chart.js unsere manuell gesetzten Ticks/Labels eigenständig — obwohl `autoSkip: false` aktiv ist.
**Es ist eine Regression** — dieser Fix existierte bereits im Code und wurde zwischenzeitlich entfernt oder überschrieben.

---

### Was Chart.js intern macht (Ursache)

Chart.js hat bei der TimeScale einen zweistufigen Render-Lifecycle:

1. `buildTicks()` — generiert intern "nice" Ticks (z.B. gleichmäßige Zeitintervalle)
2. `afterBuildTicks()` — unser Hook, der `scale.ticks` mit Kalender-Ticks überschreibt ✅
3. `afterTickToLabelConversion()` — Chart.js normalisiert danach nochmals die **Labels** in `scale.ticks[i].label`, besonders bei kleinen Screens

**`autoSkip: false` verhindert nur das Überspringen von Ticks, nicht diesen Label-Überschreib-Mechanismus.**

`source: 'data'` wäre keine Lösung, da wir keine Datenpunkt-basierten Ticks wollen, sondern Kalender-Ticks an Monatsgrenzen — unabhängig von Datenpositionen.

---

### Der Fix

Zusätzlich zu `afterBuildTicks` muss auch **`afterTickToLabelConversion`** implementiert werden.
Dort werden die Kalender-Labels nochmals in `scale.ticks[i].label` geschrieben, damit Chart.js sie nicht überschreiben kann.

```js
afterTickToLabelConversion(scale) {
  scale.ticks.forEach((tick, i) => {
    tick.label = meineKalenderTicks[i]?.label ?? tick.label;
  });
}
```

## Warum kein Screen-Breakpoint hilft

Chart.js löst `afterTickToLabelConversion` **nicht anhand von CSS-Breakpoints** aus, sondern intern anhand der **verfügbaren Canvas-Pixel-Breite**. Das Rendering läuft so:[](https://www.chartjs.org/docs/latest/api/interfaces/TimeScale.html)​

1. Chart.js berechnet nach jedem Resize, wie viele Ticks in die aktuelle Canvas-Breite passen
2. Wenn der Platz knapp wird, normalisiert Chart.js die Labels intern neu — in `afterTickToLabelConversion`
3. Dieser Schritt wird **immer** durchgeführt, auf allen Screens — er ist fest im Scale-Lifecycle verankert[](https://github.com/chartjs/Chart.js/issues/9863)​

Der Effekt ist auf Zone S (<450px) am auffälligsten, kann aber je nach Datendichte und Chart-Breite auch in Zone M auftreten. Auf Zone L ist er unsichtbar, passiert aber trotzdem.
### Zusatz: afterTickToLabelConversion ist screengrößen-unabhängig

`afterTickToLabelConversion` muss **bedingungslos und für alle Zonen** implementiert werden:

- Zone S (< 450px): Problem tritt sicher auf
- Zone M (450–900px): Problem kann auftreten, abhängig von Datendichte
- Zone L (>= 900px): Problem ist unsichtbar, aber der Hook wird trotzdem
  vom Chart.js-Lifecycle aufgerufen

**Keine bedingte Logik** (`if (width < 450)` o.ä.) verwenden.
Der Hook muss immer greifen, weil Chart.js `afterTickToLabelConversion`
intern nach jedem Resize-Zyklus aufruft — unabhängig von CSS-Breakpoints.

Die Kalender-Labels werden also auf jedem Screen potenziell überschrieben.
Der Fix ist daher nicht eine Responsiveness-Maßnahme, sondern eine
**korrekte Implementierung des Chart.js Scale-Lifecycles**.