Stand: 2026-07-18 | Session: AF-crash-reaktions-test-mockup-duell | Geändert von: Claude

# Ergebnisdatei — Mockup-Duell Crash-Reaktions-Test

Auftrag: `tests/scratch/crash-reaktions-test/mockup-duell/SONNET_AUFTRAG.md`. Werkstatt-Ergebnis nach `docs/App-Fabrik/MOCKUP-VERTRAG.md`. **Status: GELB** — keine reale Browser-Abnahme durch Albert bisher behauptet oder ausgeführt.

---

## 1. Angelegte Dateien

```text
tests/scratch/crash-reaktions-test/mockup-duell/a-sol/mockup.html
tests/scratch/crash-reaktions-test/mockup-duell/b-fable/mockup.html
tests/scratch/crash-reaktions-test/mockup-duell/README.md
docs/steering/patches/AF_crash-reaktions-test_mockup-duell_Ergebnis.md   (diese Datei)
```

Kein Schreibzugriff außerhalb dieser vier Dateien. `Apps/crash-reaktions-test/` nicht berührt.

---

## 2. Zwei Blocker vor dem Bau — Quellenerweiterung durch Albert

Die im Auftrag gelistete Pflichtquellenmenge reichte nicht aus, um die bereits freigegebenen Produktentscheidungen E1/E3 (echte Daten) und die Baukasten-Farbtokens korrekt umzusetzen. Beide Lücken wurden vor dem ersten Zeilencode gestoppt und Albert zur Entscheidung vorgelegt (Auftrag §„Quellensperre — Harter Stop", Klausel „Fehlt eine allgemeine Hülle … stoppen"):

1. **Fehlende Datenquelle (E1/E3):** Albert hat `tests/fixtures/engine/test_data-Liniendiagramm.csv` als zusätzliche Pflichtquelle freigegeben (Option „Datei/Pfad nennen"). Genutzt wird ausschließlich die Spalte „World" (MSCI World, Monatswerte, Basis 100 = 2000-12-29).
2. **Fehlende CI-Tokens:** Albert hat `Theme/assets/css/tokens.css` und `docs/testing/templates/app.test.template.html` als zusätzliche Pflichtquellen freigegeben. Beide Mockups kopieren den `:root`-Tokenblock unverändert und binden die bytegleiche `@theme inline`-Bridge aus dem Template ein (AP-tailwind-02e-Mechanismus).

Beide Erweiterungen sind reine Lesequellen, keine Abweichung vom Schreibscope.

---

## 3. Variante A (`a-sol`) — Regel-Lücke

Ausschließlich Sol-Rohtext + die drei mit „für Entwurf A" gekennzeichneten Grok-Schärfungen:

1. Entscheidungsscreen (Moment 3) ist beim Betreten für 2 Sekunden gesperrt (alle vier Aktionsflächen `disabled`, sichtbarer Hinweistext), damit Depotblock und Eurodifferenz nachweislich sichtbar waren, bevor gewählt werden kann.
2. Die Regel-Frage in Moment 4 ist optisch gleich gewichtig wie der Erwartungs-/Entscheidungs-Vergleich (`text-base font-semibold`, drei gleich große Segmente), keine Nebenfrage.
3. Die vier Folgenkorridore in Moment 5 sind gleich groß, ohne Rangfolge, ohne Siegermarkierung; „Reduzieren" trägt dieselbe Kartenoptik wie die anderen drei.

**E1 (echte Daten, Status A):** Der anfängliche Rückgang bleibt der in Sol-Rohtext/Mini-Spec „aus Spec belegte" simulierte Testwert (-30 %, Moment 2). Ab dem historischen Tiefpunkt (März 2020) folgt die Erholung in allen vier Korridoren dem echten Verlauf bis Oktober 2025.

**E2 (Status A):** Die Aussage „Eine vorab festgelegte Regel macht regelkonformes Handeln im Ernstfall wahrscheinlicher" ist in Moment 6 als Callout enthalten — bewusst probabilistisch formuliert („ein Erfahrungswert, kein Beleg"), kein Wirkversprechen, wie in der Bezug-Formulierung von E2 selbst verlangt.

### Formeln (Variante A)

- `SHOCK_FACTOR_A = 0,7` (simulierter Rückgang, Moment 2)
- Real, aus `test_data-Liniendiagramm.csv`: Tiefpunkt März 2020 = 45.297,91; heute (letzter Datenpunkt) Oktober 2025 = 120.825,67; `TROUGH_TO_TODAY = 120.825,67 / 45.297,91 ≈ 2,6674`
- Nach-Rückgang-Wert = Vorher × 0,7
- **Halten** = Nach-Rückgang-Wert × TROUGH_TO_TODAY
- **Verkaufen** = Nach-Rückgang-Wert (eingefroren)
- **Nachkaufen** = Vorher × TROUGH_TO_TODAY (volle Ausgangssumme zum Tiefstkurs reinvestiert)
- **Reduzieren** = (Nach-Rückgang-Wert × 0,5) × TROUGH_TO_TODAY + Nach-Rückgang-Wert × 0,5

---

## 4. Variante B (`b-fable`) — Faltchart

Ausschließlich Fable-Rohtext + die drei mit „für Entwurf B" gekennzeichneten Grok-Schärfungen:

1. Depotwert ist pro Runde die größte Ziffer, Kontextzeile ist rein deskriptiv aus den echten Kursdaten abgeleitet (Streak-Logik über die Monatswerte), keine Belohnung für Tempo.
2. Bei Übereinstimmung von „Vorher gesagt" und „Getan" ist der Satz „Du hast dich an deinen Plan gehalten. Und trotzdem gespürt, wie schwer das war — ohne echtes Geld." fest verdrahtet, nicht optional.
3. Die vier Vergleichslinien in Moment 6 sind farblich/gewichtet gleich; die Verkaufslinie trägt den bezifferten, nicht wertenden Einzeiler aus dem Rohtext.

**E3 (echte Daten, Status B):** Der komplette Faltchart-Verlauf (Runden + Entfaltung) folgt durchgehend echten MSCI-World-Werten von Ende Februar 2020 bis Oktober 2025 — keine simulierte Ausgangsdifferenz wie in Variante A.

**E4 (Bedingung):** Die längere Mehrfachrunden-Serie (10 Runden, März–Dezember 2020) ist gebaut. Der Begleittext in der Mockup-HTML (Callout am Anfang von Screen „Runden ohne Boden") benennt die Alternative — ein Ein-Entscheidungs-Flow mit nur einer Entscheidung am Tiefpunkt — ausdrücklich als nicht gebaute Option; die Wahl zwischen beiden Varianten ist als von Albert live zu treffen markiert.

**E5 (Status B):** Der Mini-Spec-Button „Ich halte das aus – Sparplan starten" ist verworfen. Variante B endet ohne jeden CTA — nur die Regelkarte und ein Hinweis, sie abzuschreiben/zu fotografieren.

### Formeln (Variante B)

- Real, aus `test_data-Liniendiagramm.csv`: Baseline Ende Februar 2020 = 52.034,97; Tiefpunkt März 2020 = 45.297,91; heute Oktober 2025 = 120.825,67
- `baselineToTrough = 45.297,91 / 52.034,97 ≈ 0,8705` (realer Rückgang ≈ -12,9 %, **kein** simulierter Wert wie in A)
- `troughToToday ≈ 2,6674`; `baselineToToday = 120.825,67 / 52.034,97 ≈ 2,3217`
- **Halten** = Vorher × baselineToToday
- **Verkaufen** = Vorher × baselineToTrough (eingefroren am Tiefpunkt)
- **Nachkaufen** = Vorher × troughToToday
- **Reduzieren** = (Vorher × baselineToTrough × 0,5) × troughToToday + Vorher × baselineToTrough × 0,5

Die Formelstruktur ist zwischen A und B identisch (Halten/Verkaufen/Nachkaufen/Reduzieren-Logik); die Ergebnisse unterscheiden sich, weil A einen simulierten -30-%-Schock nutzt (Moment-2-Spec-Vorgabe) und B durchgehend dem realen ~-13-%-Rückgang folgt. Das ist eine bewusste, im Rohtext beider Entwürfe angelegte Differenz, keine Inkonsistenz.

---

## 5. Nicht übernommen (beide Varianten)

Wie im Grok-Gutachten unter „Nicht übernehmen" verlangt — dokumentiert, nicht gebaut:

- Kein Hybrid aus Regel-Lücke (A) und Faltchart-Runden (B).
- Keine Sieger-/Verlierer-Wertung, keine Emoji-Buttons (❌/💪), kein Alarmrot, kein Countdown, kein Konfetti, keine moralische Rangfolge der vier Handlungen.
- Keine zweite Jury-Matrix, kein Gesamtsieger, keine Empfehlung „A statt B" / „B statt A" durch das Modell.

---

## 6. Transparente Werkstatt-Vereinfachungen (Wegwerfartefakt, Mockup-Vertrag §6)

- **A, Moment 4:** Die Regel-Frage steht unterhalb der beiden Vergleichskarten statt wörtlich „in der Lücke". Gleiche Funktion und gleiches Gewicht, andere DOM-Platzierung.
- **B, Granularität:** Fable-Rohtext nennt Wochenschritte als Annahme („(3) Wochenschritte … reichen"); die verfügbare Datenquelle liefert Monatswerte. Umgesetzt als 10 Monatsrunden (März–Dezember 2020) statt Wochenrunden — technische Anpassung an die verfügbaren Daten, keine stillschweigende Abweichung von einer Produktentscheidung.
- **B, „Getan"-Definition:** Definiert als häufigste Rundenwahl (Modus) über alle 10 Runden, nicht als exakter Rundenverlauf. Bei Gleichstand gewinnt die zuerst erreichte Handlung.
- **B, Faltchart-Zwischenpunkte 2021–2025:** Für die Entfaltung (Moment 5) werden nach Dezember 2020 nur Jahresendwerte (Dez 2021/2022/2023/2024, Okt 2025) statt Monatswerte gezeichnet — reduziert die Punktmenge auf eine lesbare Gesamtform, ändert keinen der vier Vergleichswerte (die aus Tiefpunkt/Baseline/heute direkt berechnet werden, nicht aus der gezeichneten Linie).

---

## 7. Bewusste harte Grenzen

Wie in Auftrag/Mockup-Vertrag vorgegeben: Werkstattmodus, nur Happy Path, kein Backend, Vanilla JS, keine `innerHTML`-Einfügung aus Eingaben (Freitext in B wird ausschließlich mit `textContent` gelesen/angezeigt), keine Netzwerkzugriffe außer dem Tailwind-Play-CDN-Tag, alle Zahlen als Test-Szenario markiert. Keine Datenrichtigkeits-, Error-/Empty-State- oder A11y-Volltestbehauptung — beides ausdrücklicher Nicht-Ziel-Bereich eines Mockups (Mockup-Vertrag §3).

---

## 8. Manueller Testauftrag

Für beide Varianten auf **375 px, 768 px und 1280 px** Breite sowie mit **`prefers-reduced-motion: reduce`** prüfen. Details und Schritt-für-Schritt-Ablauf: `tests/scratch/crash-reaktions-test/mockup-duell/README.md`.

**Keine nicht ausgeführte Browserprüfung wird hier behauptet.** Status beider Mockups: GELB.

---

## 9. Nächster zulässiger Schritt

Alberts manueller Vergleichstest A gegen B. Ausdrücklich nicht: APP_SPEC, Produktionscode, Gewinnerwahl durch das Modell.
