# Kontext-Dokument für ein unabhängiges LLM-Review — Screen-2/Screen-3-Kontinuitätsfrage (AP-prokrast-10b)

Dieses Dokument ist neutral formuliert, damit ein anderes LLM (ohne Zugriff auf den bisherigen Chat-Verlauf) die Architekturfrage eigenständig bewerten kann. Es beschreibt: den Ist-Zustand des realen Codes, die neue Produktanforderung, die konkrete Ambiguität, die dabei entsteht, und zwei Lösungsoptionen mit ihren jeweiligen Tradeoffs. Es enthält keine Empfehlung.

## 1. Kontext der App

„prokrastinations-preis" ist eine 4-Screen-Storytelling-Web-App (Sparplan-Zeitreise). Datei: `Apps/prokrastinations-preis/app.js` (ES-Modul, ~1250 Zeilen). Die App nutzt eine gemeinsame Chart-Engine (`Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, Chart.js-Wrapper) über `chartEngine.renderFromData(container, chartSeries, options)`.

Die 4 Screens sind **getrennte DOM-`<section>`-Elemente** innerhalb desselben App-Containers, gesteuert über eine `showScreen(n, focus)`-Funktion, die per `hidden`-Attribut jeweils genau eine Section sichtbar macht und alle anderen versteckt:

```js
function showScreen(n, focus) {
  allScreens.forEach((s, i) => {
    if (i + 1 === n) s.removeAttribute('hidden');
    else s.setAttribute('hidden', '');
  });
  ...
}
```

## 2. Screen 2 — realer Aufbau (Auszug, mit Zeilenangaben aus app.js)

```js
// --- Screen 2 — Stationen-Zeitreise ---
const screen2 = document.createElement('section');
screen2.dataset.fwScreen = '2';
...
const h2S2 = document.createElement('h2');
h2S2.textContent = 'Im Rückblick sieht es klar aus. In Echtzeit war es eine Entscheidung.'; // Zeile 358
screen2.appendChild(h2S2);

const stationArea = document.createElement('div'); // Container für die Stationskarte
stationArea.className = 'fw-app__station-area';
screen2.appendChild(stationArea);

const chartSection2 = document.createElement('div'); // Zeile 365-368
chartSection2.setAttribute('data-fw-appchart', 'sparplan-s2');
screen2.appendChild(chartSection2);

const progressEl = document.createElement('p'); // Zeile 371-373 — Orientierungs-Chip
progressEl.className = 'fw-app__journey-progress';
screen2.appendChild(progressEl);

const journeyBtn = makeBtn('', 'fw-app__btn--journey'); // Zeile 375-376
screen2.appendChild(journeyBtn);
```

Bei jeder Station wird `progressEl` und `journeyBtn` aktualisiert (Funktion `renderJourneyCardOnly`, Zeile ~567-589):

```js
progressEl.textContent = `Station ${n} von ${total} · Bekannt bis ${bekannt}`; // Zeile 586
journeyBtn.textContent = station.isFinalReveal ? 'Ergebnis ansehen' : 'Weiter investiert bleiben'; // Zeile 587
```

Bei der **letzten Station** (einer synthetischen Station, deren Datum = letzter verfügbarer Datenmonat) zeigt `progressEl` exakt `„Station 8 von 8 · Bekannt bis Mai 2026"` (Beispielwerte) und der Button-Text ist `„Ergebnis ansehen"`.

Click-Handler für `journeyBtn` (Zeile ~847-853):

```js
journeyBtn.addEventListener('click', () => {
  const isLast = activeStationIndex === journeyStations.length - 1;
  if (isLast) {
    showScreen(3, true); // harter Screenwechsel, focus=true fokussiert Screen-3-Headline
    return;
  }
  // ... sonst: Card-to-Point-Flug zur nächsten Station (Screen 2 intern)
});
```

Wichtig: Beim Erreichen der letzten (synthetischen) Station zeigt `chartSection2` (via `chartEngine2`) bereits die **vollständige** Depotwert-Linie, da das Datum der letzten Station = das Enddatum der gesamten Datenreihe ist. Optisch ist zu diesem Zeitpunkt die komplette Kurslinie schon sichtbar — nur ohne vertikale Endlinie und ohne KPI-Karten.

## 3. Screen 3 — realer Aufbau (Auszug)

```js
// --- Screen 3 — Heute ---
const screen3 = document.createElement('section');
screen3.dataset.fwScreen = '3';
screen3.setAttribute('hidden', '');

const h2S3 = document.createElement('h2');
h2S3.textContent = 'Jetzt erst sieht es einfach aus.'; // Zeile 387 — verbindlicher, seit AP-14 fixierter Text
screen3.appendChild(h2S3);

const sublineS3 = document.createElement('p');
sublineS3.textContent = 'Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.'; // Zeile 392
screen3.appendChild(sublineS3);

const chartSection3 = document.createElement('div'); // eigener Container, eigene ChartEngine-Instanz (chartEngine3)
chartSection3.setAttribute('data-fw-appchart', 'sparplan-s3');
screen3.appendChild(chartSection3);

const kpiContainerS3 = document.createElement('div'); // eigener KPI-Mount-Point
kpiContainerS3.className = 'fw-app__kpi-slot';
screen3.appendChild(kpiContainerS3);

const assumptionsS3 = document.createElement('aside'); // Disclaimer-Text, bereits vorhanden
assumptionsS3.textContent = 'Basis: MSCI World Index, ...'; // identisch zum im neuen Prompt geforderten Disclaimer-Text
screen3.appendChild(assumptionsS3);
```

`chartSection2`/`chartEngine2` (Screen 2) und `chartSection3`/`chartEngine3` (Screen 3) sind **zwei komplett getrennte DOM-Container und zwei getrennte ChartEngine-Instanzen** — kein gemeinsames Canvas, keine gemeinsame Chart.js-Instanz.

## 4. Neue Produktanforderung (aus dem aktuellen Auftrag)

Der Nutzer (Produktverantwortlicher) hat eine vorherige Implementierung verworfen, die einen zeitlich gestuften Reveal INNERHALB von Screen 3 baute (Text sofort, Chart nach 800ms, KPI nach weiteren 800ms), weil der **Übergang von Screen 2 zu Screen 3 selbst** sich wie ein harter Neustart anfühlte („verschwindet aktuell zu viel").

Neue, wörtliche Anforderung (Auszug aus dem Auftrag):

> Klick auf „Ergebnis ansehen"
> 1. Der bestehende Chart-Kontext bleibt stabil.
> 2. Die Texte oberhalb des Charts bleiben stabil.
> 3. Im Chart erscheint die blaue Ergebnis-/Endlinie in dezenter Animation.
> 4. Erst wenn diese Linienanimation abgeschlossen ist, verschwindet unterhalb des Charts die Stationszeile: „Station 8 von 8 · Bekannt bis Mai 2026"
> 5. An derselben unteren Stelle erscheinen mit dezenter Animation: KPI-Karten (Eingezahlt/Depotwert/Gewinn-Verlust) und darunter der Disclaimer-Text.

Der Auftrag erlaubt explizit einen architektonischen Spielraum:

> „Wenn der aktuelle Code Screen 2 und Screen 3 als separate Sections behandelt, wähle den kleinsten sauberen Weg: entweder Screen-3 so aufbauen, dass der sichtbare Übergang stabil wirkt, oder Ergebniszustand lokal im bestehenden sichtbaren Chart-Kontext herstellen, aber nur innerhalb app.js/app.css und ohne Architekturbruch. Nicht erzwingen, wenn dafür Engine-/Spec-Arbeit nötig wäre."

## 5. Die konkrete Ambiguität

Die im Auftrag genannte „Stationszeile" (`„Station 8 von 8 · Bekannt bis Mai 2026"`) ist **wörtlich und exakt** `progressEl.textContent` — ein Element, das laut Code-Fakt (Abschnitt 2) auf **Screen 2** liegt, nicht auf Screen 3. Ebenso ist der genannte Disclaimer-Text bereits identisch auf **Screen 3** vorhanden (`assumptionsS3`, Abschnitt 3).

Die Anforderung, dass „an derselben unteren Stelle" wie die Stationszeile die KPI-Karten + der Disclaimer erscheinen sollen, lässt zwei grundverschiedene Lesarten zu:

### Lesart A — Reveal komplett auf Screen 2

Der komplette „Ergebnis"-Übergang passiert **ohne Screenwechsel**, weiterhin sichtbar als Screen 2:
- `chartSection2`/`chartEngine2` bekommt die Ergebnis-/Endlinie.
- `progressEl` (Stationszeile) und ggf. `stationArea` werden nach der Linienanimation durch KPI-Karten + Disclaimer ersetzt — an genau der Position, wo bisher `progressEl`/`journeyBtn` standen.
- Screen 2s Headline („Im Rückblick sieht es klar aus...") bleibt stehen, wird NICHT durch Screen 3s Headline („Jetzt erst sieht es einfach aus...") ersetzt.
- Folgefrage, unbeantwortet: Wird Screen 3 als eigene Section dann überhaupt noch betreten (und wenn ja, wann/wie), oder wird sein Inhalt funktional redundant? Der bisherige, seit AP-14/B1-AP-16b fixierte Screen-3-Text („Jetzt erst sieht es einfach aus...") würde in dieser Lesart entweder nie angezeigt oder müsste an anderer Stelle/zu anderem Zeitpunkt untergebracht werden.

### Lesart B — Screenwechsel bleibt bestehen, aber visuell weich

`showScreen(3, true)` bleibt der offizielle technische Übergang (Screen 2 wird `hidden`, Screen 3 sichtbar), aber:
- Screen 3 wird so gebaut, dass sein Chart-Bereich optisch nahtlos an Screen 2s letzten sichtbaren Zustand anschließt (gleiche Chartgeometrie/-position, sofortige Darstellung ohne eigenes Ausblenden).
- Ein Screen-3-lokales Pendant zur „Stationszeile" (an vergleichbarer Position wie `progressEl`) wird zunächst angezeigt und dann durch KPI + Disclaimer ersetzt.
- Screen 3s eigener Headline-Text wird ab dem Wechselmoment gezeigt (kein Zurückhalten des fixierten Texts).
- Der Screenwechsel selbst bleibt ein harter DOM-hidden-Toggle (wie bei allen anderen Screens der App), aber durch identische/sehr ähnliche Chart-Darstellung und durch das Vermeiden von Leerzuständen (kein Text-only-Zwischenstadium) soll der Wechsel weniger wie ein Reset wirken.

## 6. Technischer Nebenbefund (objektiv, aus `ChartEngine.js` verifiziert)

Unabhängig von der Screen-2-vs-Screen-3-Frage gilt für BEIDE Lesarten ein bestätigter Fakt aus der Chart-Engine:

`ChartEngine._draw()` (Datei `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`) liest die Plugin-Liste (`chartConfig.plugins`, worüber z. B. die vertikale Endlinie via `FwVerticalLinePlugin` aktiviert wird) **ausschließlich beim allerersten `new Chart()`-Aufruf** eines Containers. Bei jedem späteren Update-Aufruf (`state.chartInstance.update(...)`) werden nur `.data` und `.options` neu zugewiesen — `.plugins` wird nie erneut gelesen oder verändert:

```js
if (state.chartInstance) {
    state.chartInstance.data = chartConfig.data;
    state.chartInstance.options = chartConfig.options;
    // .plugins wird hier NICHT aktualisiert
    ...
    state.chartInstance.update(...);
} else {
    // .plugins nur hier, beim allerersten Aufbau, wirksam
    state.chartInstance = new Chart(canvas, chartConfig);
}
```

Konsequenz: Eine Chart-Instanz, die einmal OHNE die vertikale Endlinie erstellt wurde, kann diese Linie **niemals nachträglich per zweitem `renderFromData()`-Aufruf** bekommen — unabhängig davon, ob es sich um `chartSection2` oder `chartSection3` handelt. Wenn die „dezente Animation" der Endlinie NICHT über eine App-lokale DOM/CSS-Overlay-Lösung, sondern über das Ein-/Ausblenden des Engine-Plugins erreicht werden soll, wäre das nur durch eine Änderung an `ChartEngine.js` möglich — die laut Auftrag ausdrücklich verboten ist.

## 7. Was zu bewerten ist

Für ein unabhängiges Review wäre hilfreich:

1. Welche der beiden Lesarten (A oder B) entspricht der eigentlich gewollten Produkt-/UX-Absicht?
2. Gibt es eine dritte, sauberere Option, die beide Elemente (Kontinuität des Charts UND der feste Screen-3-Text) miteinander vereinbart, ohne Screen 2 und Screen 3 architektonisch zu verschmelzen?
3. Ist der beschriebene Engine-Fakt (Plugins nur bei Erstkonstruktion) korrekt eingeordnet, oder gibt es einen App-lokalen Weg, die vertikale Linie trotzdem dynamisch/animiert erscheinen zu lassen, der hier übersehen wurde?
