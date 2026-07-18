Stand: 2026-07-18 08:16 | Session: AP-app-fabrik-07 | Geändert von: Claude Opus

<!-- Anmerkung zur Kopfzeile: Der Grundprompt gab den Platzhalter „Claude Sonnet" vor;
     ausgeführt und iteriert hat den AP tatsächlich Claude Opus. Attribution wahrheitsgemäß. -->

# AP-app-fabrik-07 — Mockup-Duell Risiko-Übersetzer: A gegen C — Ergebnis & Übergabepunkt

**Diese Datei ist der feste Zwischenstand/Übergabepunkt.** Sie ist so geschrieben, dass ein anderes LLM ohne den Chatverlauf nahtlos weiterarbeiten kann: Was gebaut wurde, was bewusst vom Grundprompt abweicht, welche Bugs unterwegs auftraten, und was offen ist — für **beide** Mockups.

---

## 0. Kurzlage (TL;DR)

- Zwei interaktive Happy-Path-Werkstatt-Mockups für `risiko-uebersetzer`, ausschließlich zum psychologischen Vergleich zweier Wirkmechaniken. Kein Produktionscode.
- **Variante C (Wegnahme-Regal)** steht im Wesentlichen wie ursprünglich gebaut (nur ein Typ-Bug gefixt). Entspricht der Fable-Quelle, ohne Renditezeile.
- **Variante A** wurde in dieser Iterationssession **grundlegend umgebaut** und weicht jetzt bewusst vom Grundprompt ab (siehe §3): Die animierte „Lebensraum-Blende" wurde auf Alberts Wunsch **verworfen**; A ist jetzt ein kompakter „Verlust gegen Anker"-Kartenvergleich **plus eine Gesamtrendite-Kette** (Rendite war im Grundprompt ein Nicht-Ziel — Albert hat das explizit als Produktentscheidung überstimmt).
- Status: **GELB** — beide gebaut und interaktiv, nur teilweise real im Browser gegengeprüft (Albert testet Variante A aktiv; C zuletzt vor den A-Umbauten getestet).

---

## 1. Dateien (Schreibscope, genau diese vier)

```
tests/scratch/risiko-uebersetzer/mockup-duell/README.md
tests/scratch/risiko-uebersetzer/mockup-duell/a-lebensraum-blende/mockup.html
tests/scratch/risiko-uebersetzer/mockup-duell/c-wegnahme-regal/mockup.html
docs/steering/patches/AP-app-fabrik-07_mockup-duell-risiko-uebersetzer_Ergebnis.md  (diese Datei)
```

Hinweis: Der Ordnername `a-lebensraum-blende/` stammt aus der ursprünglichen Mechanik und ist **historisch** — Variante A implementiert diese Blende nicht mehr (§3). Umbenennen wäre ein eigener, bewusster Schritt (aktuell nicht getan, um Pfad-Stabilität zu wahren).

---

## 2. Variante C — Wegnahme-Regal (Stand: nahe Grundprompt)

Setzt die Fable-Mechanik voll um: Ansage („Das halte ich aus", wird angeheftet) → eigenhändiges Einräumen der 6 Gegenstände → Stufen-Wahl des wichtigsten Gegenstands aus 3 gleichteuren Alternativen → langsame stille Wegnahme mit bleibender Umriss-Lücke, Depotbilanz vorher/nachher, „Tagesgeld unberührt" → ehrliche Frage (Ja/Nein) mit angehefteter Ansage → Dosis-finden („in Sicherheit"-Rückkehr) → Messwert-Abschluss + Crash-Brief.

- **Bewusst ohne Renditezeile** (Grundprompt §9 + Gegenkritik): in C weiterhin korrekt weggelassen.
- Festes Test-Depot 50.000 €, Crash −50 %, 6-stufige Werte-Leiter (Test-Szenario).
- **Bug gefixt (in dieser Session):** `showScreen(n)` verglich Screen-Nummern strikt mit Zahlen (`n === 3`), bekam von `data-goto` aber Strings → `renderWahl()`/`enterCrash()` liefen nie, „Crash durchleben" blieb ausgegraut. Fix: `n = Number(n);` am Funktionsanfang.
- **C ist seit diesem Fix nicht mehr real durchgetestet worden** (die Session drehte sich danach um Variante A). → offener Prüfpunkt (§6).

## 2b. Variante A — jetzt „Verlust gegen deinen Anker" + Rendite-Kette (STARK verändert)

**Wichtig für Nachfolger:** Die ursprüngliche Signatur-Mechanik „Lebensraum-Blende" (Sol-Quelle: dunkle Verlustschicht wächst über einen selbst gewählten Anker und gibt ihn beim Reduzieren wieder frei) ist **komplett entfernt**. Grund: Albert empfand die animierte Deck-Metapher als nicht selbsterklärend („das kapiert man nicht") und hat sie zugunsten einer kompakten, mobilfreundlichen Karten-Darstellung verworfen. **Damit testet A nicht mehr die Sol-Wirkmechanik**, sondern einen transparenten Zahlen-/Kettenvergleich (siehe §3, strategisch offen).

Aktueller Ablauf von A:
1. **Screen 1 — Ausgangslage:** Vermögen (Slider, 5.000er-Schritte) + gewünschte ETF-Dosis (Slider, **5 %-Schritte**). Test-Szenario −50 % als Callout.
2. **Screen 2 — Anker:** frei eintippbarer Anker-Name (max 48) + Vorschlags-Chips + Wert-Slider (**100er-Schritte**, 500–30.000 €).
3. **Screen 3 — „Verlust gegen deinen Anker":**
   - Zwei **untereinander** gestapelte Karten (`bg-surface` + `shadow-soft`): „Dein Anker" und „Hypothetischer Verlust (Test-Szenario)". Verlustzahl in **CI-Purpur** (`text-purpur-800`).
   - Dosis-Slider (5 %-Schritte), live.
   - **Neue finale Karte „Langfristige Gesamtrendite (Test-Annahme)"** unter dem Slider: `z %` (Primär-Petrol), absolut `€/Jahr`, Transparenzzeile mit den Annahmen.
   - Verlust-Abfrage: Ja / Unsicher / Nein (gleichwertig).
4. **Screen 4 — Abschluss:** vorläufiger Einordnungssatz + **die sichtbare Kette** als verbundene Karten:
   `Dein Anker (Name · Wert) ↓ tragbarer Verlust (€, purpur) ↓ Mischung (X % ETF · Y % TG) ↓ Gesamtrendite (z % · €/Jahr)`.

**Rendite-Formel (Test-Annahme, Vorsteuer):**
`z % = ETF-Anteil% · 8,0 % + Tagesgeld-Anteil% · 1,5 %`, absolut `= Vermögen · z %` (pro Jahr).
Beispiel 70 % ETF / 50.000 €: `0,7·8 + 0,3·1,5 = 6,05 %` → ≈ **3.025 €/Jahr**.
Konstanten im Code: `RENDITE_ETF = 8.0`, `RENDITE_TG = 1.5`, `CRASH = 0.5`.

**CI-Purpur:** echte Token aus `Theme/assets/css/tokens.css` (Seed 900 = `#8D0267`) sind im `@theme`-Block gespiegelt (50/100/200/600/700/800/900). Petrol/Neutral/Error wie zuvor CI-nahe Näherung.

---

## 3. Bewusste Abweichungen vom Grundprompt (für die Übernahme in eine spätere APP_SPEC kritisch)

1. **Rendite in der Entscheidungsstrecke (Variante A) — Nicht-Ziel überstimmt.**
   Der Grundprompt §9 und der Steuerungsblock verbieten „Renditeoptimierung"/Renditezahlen in der Entscheidungsstrecke; die Gegenkritik markierte das als KO-Risiko; in C wurde es deshalb weggelassen. **Albert hat das für Variante A am 2026-07-18 als ausdrückliche Produktentscheidung überstimmt.** Rahmen der Entscheidung: transparente Ausweisung der Vorsteuer-Annahmen (ETF 8 %, TG 1,5 %), „geht um die Größenordnung (±0,3 %)", die Kette Anker→Verlust→Mischung→Rendite ist eine berechenbare Abhängigkeit, die sichtbar gemacht werden soll. Umsetzung bewusst **neutral**: keine „mehr Rendite = besser"-Wertung, kein CTA, niedrigere Dosis bleibt gleichwertig.
   → **Statusklärung offen:** Gilt diese Freigabe nur für das Mockup A oder auch für die spätere Produktions-App? Muss der Steuerungsblock/das Nicht-Ziel angepasst werden? Das ist eine Steuerungs-/Spec-Frage, kein Mockup-Detail.
2. **„Lebensraum-Blende" verworfen (Variante A).** Die im Grundprompt und der Sol-Quelle geforderte Signatur-Mechanik ist nicht mehr Teil von A. → **Strategisch offen:** Das Mockup-Duell sollte ursprünglich Sol-Mechanik (A) gegen Fable-Mechanik (C) vergleichen. A testet jetzt etwas anderes. Ist das gewollt (dann Duell-Ziel neu fassen), oder soll A wieder eine emotionale Signatur-Mechanik bekommen?
3. **Kopfzeilen-Attribution:** „Claude Opus" statt des Prompt-Platzhalters „Claude Sonnet" (wahrheitsgemäß).

---

## 4. Technische Notizen / in dieser Session gefixte Fallstricke (nicht wieder einbauen)

- **String/Number-Weiche:** `data-goto` liefert Strings; alle `showScreen`-internen Weichen (`if (n === 3)`) brauchen `n = Number(n)`. Gilt in **beiden** Dateien. War die Ursache für „C Screen 3 leer" und „A Screen 3 initialisiert nicht".
- **Prozenthöhe im Flex-Kind unzuverlässig:** Der frühere A-Blenden-Versuch setzte `height: %` auf ein absolut positioniertes Kind eines Flex-Items — löste in Alberts Browser auf „volle Höhe" auf. Danach `transform: scaleY()` — dann aber die ganze Mechanik verworfen (§2b). Lehre falls je wieder Geometrie nötig: nicht auf Prozenthöhe im Flex-Kind verlassen; `transform: scaleY()` gegen fixe Boxhöhe ist robust.
- **CI-Purpur:** nicht raten — echte Werte stehen in `Theme/assets/css/tokens.css` (`--color-purpur-*`).
- **Card-in-Card verboten** (Baukasten §5.2): keine `bg-surface`-Karte in eine getönte `bg-bg-faint`-Panel-Fläche. Die zwei A-Karten stehen deshalb direkt auf `bg-bg` mit `shadow-soft` (dokumentierte kleine Abweichung: KPI-Cards tragen strikt keinen Schatten, aber auf weißem App-Grund wären sie sonst unsichtbar).
- **Literalregel §2.2:** live berechnete Geometrie/Farbe läuft per Inline-`style`, nie als zusammengesetzter Tailwind-Klassenname. App-lokale Mechanik gehört nach `fw-app__*`/`--fw-*`.
- **SafeDOM:** Nutzertext (Anker-Name) ausschließlich über `textContent`/`createTextNode`, kein `innerHTML`. Einzige externe URL: kanonischer Tailwind-Play-CDN-Tag.

---

## 5. Beibehaltene harte Grenzen (weiterhin gültig, beide Varianten)

- Keine historische Crash-Behauptung (−50 % durchgängig als hypothetisches Test-Szenario).
- Keine Produkt-/Sparplan-/ETF-Empfehlung, kein CTA zur Risikoerhöhung.
- Keine Beschämung, keine Alarmästhetik (kein Rot, kein Blinken, kein Ton); niedrigere Dosis würdig.
- Alle Zahlen/Gegenstände als Test-Szenario markiert; „tragbar" bleibt Selbsteinschätzung.
- Ausnahme dokumentiert: Renditezahlen in **A** (§3 Punkt 1). In **C** weiterhin keine Rendite.

---

## 6. Was ist offen (TODO für Nachfolger)

**Strategisch / Steuerung (braucht Albert):**
- [ ] Duell-Ziel neu fassen, weil A nicht mehr die Sol-Mechanik testet (§3 Punkt 2).
- [ ] Reichweite der Rendite-Freigabe klären: nur Mockup A oder auch Produktion? Steuerungsblock-/Nicht-Ziel-Anpassung nötig? (§3 Punkt 1).
- [ ] Entscheiden, ob `a-lebensraum-blende/`-Ordner umbenannt wird (Name ist jetzt irreführend).

**Variante A (Mockup-Feinschliff):**
- [ ] Reale Browser-Abnahme S/M/L nach den letzten Änderungen (Rendite-Karte + Kette).
- [ ] Wording des Verlust-Anker-Satzes prüfen (aktuell „Das ist X× „Anker"").
- [ ] Rendite-Rundung/Formulierung fachlich/redaktionell bestätigen (Vorsteuer, Größenordnung).

**Variante C:**
- [ ] Voll-Durchlauf real testen (seit dem `Number(n)`-Fix nicht mehr gemacht): Einräumen → Stufen-Wahl → Wegnahme → Frage → Dosis-finden → Crash-Brief, inkl. Reduced-Motion und 375/768/1280 px.

**Allgemein (Mockup-Vertrag §7/§8):**
- [ ] Wirkungsabnahme durch Albert (einzige Freigabe-Instanz); kein Selbst-Score.
- [ ] Annahmenstatus: CI-Petrol/Fonts = simuliert; Zahlen/Texte/Ankerliste/Rendite-Annahmen = redaktionell zu bestätigen; Dosis↔Verlust und Würde der niedrigeren Dosis = aus Spec belegt.

---

## 7. Manueller Testablauf (375 / 768 / 1280 px)

**Variante A** (`a-lebensraum-blende/mockup.html`):
1. S1: Vermögen + Dosis (5 %-Schritte) schieben, Werte aktualisieren live.
2. S2: Anker eintippen oder Chip wählen, Wert-Slider (100er-Schritte).
3. S3: Dosis schieben → Verlust-Karte (purpur) und Gesamtrendite-Karte laufen live mit; Verhältnis-Satz und Rendite-€/Jahr aktualisieren. Eine der drei Antworten wählen.
4. S4: Kette prüfen (Anker → Verlust → Mischung → Rendite), Beträge stimmig.
5. 375 px: kein horizontales Scrollen; Karten gestapelt, Slider und Antworten bedienbar.

**Variante C** (`c-wegnahme-regal/mockup.html`):
1. S1 Ansage → S2 alle 6 einräumen (Weiter erst bei 6/6) → S3 Gegenstand wählen → „Crash durchleben".
2. S4: langsame Wegnahme, bleibende Lücke, Bilanz zählt herunter, „Tagesgeld unberührt". „Nein" → Dosis runter, „in Sicherheit"-Rückkehr. „Ja" → Crash-Brief.
3. Reduced-Motion-Gegenprobe: Wegnahme/Zähler springen sofort, Ablauf bleibt verständlich.

---

## 8. Übergabe-Notiz

Nächster sinnvoller Schritt ist Alberts Entscheidung zu den strategischen Punkten in §6 (Duell-Ziel, Rendite-Reichweite), danach reale Browser-Abnahme beider Varianten. Kein Commit durch Claude (Albert committet selbst). Diese Datei ist der aktuelle Wahrheitsstand; bei weiteren Änderungen hier fortschreiben.
