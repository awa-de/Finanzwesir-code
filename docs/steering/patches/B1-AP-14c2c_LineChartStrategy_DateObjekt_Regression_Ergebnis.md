Stand: 2026-06-19 | Session: B1-AP-14c2c | Geändert von: Claude

# B1-AP-14c2c Ergebnis

## Fehlerursache

`CSVParser` liefert bei `expectDate: true` die Datumsspalte als JavaScript-`Date`-Objekt,
nicht als String. `LineChartStrategy.js` Z. 268 hat `.slice(0, 7)` direkt auf
`r.Date || r.Datum` aufgerufen — das schlägt bei `Date`-Objekten fehl.

`FwDateUtils.parse(DateObject).getTime()` (Z. 215) funktioniert, weil `FwDateUtils.parse()`
nicht-string-Eingaben akzeptiert. `.slice()` tut das nicht.

## Geänderte Datei

- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`

## Änderung

**Direkte `.slice()`-Annahme ersetzt durch:** lokalen `_toMonthKey`-Helfer mit Type-Guard.

```js
const _toMonthKey = (raw) => {
    if (typeof raw === 'string') return raw.slice(0, 7);
    const d = FwDateUtils.parse(raw);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};
```

- String-Pfad: Originalverhalten erhalten (`raw.slice(0, 7)`)
- Date-Objekt-Pfad: `FwDateUtils.parse()` → `getFullYear()/getMonth()` — timezone-safe

**Map nur bei Annotationen gebaut: JA.**

`_monthToSnappedX` und `_toMonthKey` in den `if (config.annotations?.events?.length > 0)`-Block
verschoben. Normale LineCharts ohne Annotationen führen diese Logik gar nicht aus.

## Nicht geändert

- `CSVParser.js`: ✅ nicht geändert
- `FwDateUtils.js`: ✅ nicht geändert
- `ChartEngine.js`: ✅ nicht geändert
- App-Code (`app.js`, `stations.de.json`, `app.css`): ✅ nicht geändert
- Plugins: ✅ nicht geändert

## Prüfungen

| Prüfung | Status |
|---|---|
| `index_linien.html` — kein TypeError | ⬜ manuell offen |
| `app.test.html` Screen 2 — Marker auf der Linie | ⬜ manuell offen |
| `app.test.html` Screen 3 — Marker auf der Linie | ⬜ manuell offen |
| Marker-X Alignment | ⬜ manuell offen |
| Pulse unverändert | ⬜ manuell offen |
| Kein `final_reveal`-Marker | ⬜ manuell offen |

Statisch geprüft:
- `(r.Date || r.Datum).slice(0, 7)` außerhalb if-Block: nicht mehr vorhanden ✅
- `_toMonthKey` und `_monthToSnappedX` innerhalb if-Block: ✅
- String-Pfad bewahrt: ✅
- `datasets.push({...})` unverändert: ✅

## Offene Punkte

Manueller Browser-Test durch Albert erforderlich:
1. `Theme/chart-tests/index_linien.html` — alle LineCharts müssen rendern
2. `Apps/prokrastinations-preis/app.test.html` — Screen 2 + Screen 3 Marker-Positionen

## Bestätigungen

- Keine CSVParser-Änderung: ✅
- Keine FwDateUtils-Änderung: ✅
- Keine ChartEngine-Änderung: ✅
- Keine App-Änderung: ✅
- Keine Plugin-Änderung: ✅
- Keine Commits ausgeführt: ✅
- Kein Abschlussritual ausgeführt: ✅
