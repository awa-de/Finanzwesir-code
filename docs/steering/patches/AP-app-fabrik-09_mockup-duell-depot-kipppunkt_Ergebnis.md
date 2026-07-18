Stand: 2026-07-18 | Session: AP-app-fabrik-09 | Geändert von: Claude

# AP-app-fabrik-09 — Mockup-Duell Depot-Kipppunkt: A gegen B — Ergebnis

**Diese Datei ist der feste Zwischenstand/Übergabepunkt.** Sie ist so geschrieben, dass ein
anderes LLM ohne den Chatverlauf nahtlos weiterarbeiten kann: was gebaut wurde, welche
Entscheidung bindend ist, welche Alternative bewusst nicht gebaut wurde, welches Formelmodell
verwendet wird, und was offen ist — für **beide** Mockups.

---

## 0. Kurzlage (TL;DR)

- Zwei getrennte, interaktive Happy-Path-Werkstatt-Mockups für `depot-kipppunkt` (B5), ausschließlich
  zum psychologischen Vergleich zweier Signaturmechaniken. Kein Produktionscode, keine APP_SPEC.
- **Variante A „Mitverdiener-Spur"** (Sol) testet ausschließlich Gleichstand — Depot und Job stehen
  am Kipppunkt gleich hoch, nie „mehr".
- **Variante B „Kippbalken"** (Fable) folgt **Albert-Entscheidung: B = Gleichstand, dann mehr** —
  siehe §3. Diese Entscheidung hat ausdrücklichen Vorrang vor Groks als offen markiertem Hinweis
  auf eine Gleichstand-only-Alternative für B; diese Alternative wurde **nicht gebaut** (§3).
- Status: **GELB** — beide gebaut und interaktiv, keine reale Browser-Abnahme durch Albert bisher.

---

## 1. Dateien (Schreibscope, genau diese vier)

```
tests/scratch/depot-kipppunkt/mockup-duell/a-sol/mockup.html
tests/scratch/depot-kipppunkt/mockup-duell/b-fable/mockup.html
tests/scratch/depot-kipppunkt/mockup-duell/README.md
docs/steering/patches/AP-app-fabrik-09_mockup-duell-depot-kipppunkt_Ergebnis.md  (diese Datei)
```

Pflichtquellen (nur diese gelesen, wie im Auftrag `SONNET_AUFTRAG.md` verlangt):
`SONNET_EINGABEPAKET.md` (Sol-/Fable-Rohtext, Grok-Gegenkritik, unverändert eingebettet),
`Apps/depot-kipppunkt/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (lokaler Steuerungsblock, geprüft),
`docs/App-Fabrik/MOCKUP-VERTRAG.md`, `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`,
`docs/spec/APP-INTERFACE.md`, `docs/steering/audits/SECURITY-BASELINE.md`, `tests/scratch/README.md`.
`tests/scratch/risiko-uebersetzer/` wurde auf Alberts ausdrückliche Weisung **nicht** gelesen.

---

## 2. Variante A — Mitverdiener-Spur (nah an Sol-Quelle + Grok-Schärfungen „für Entwurf A")

Zwei-Screen-Flow:

1. **Screen „Dein Job heute":** vier Eingaben (Job-Netto-Slider, Depotwert-Slider, Sparraten-Slider,
   Renditeannahme als Segmented Control 4/6/8 %). Live-Anzeige des Job-Netto/Jahr unter dem
   Job-Netto-Slider (Vorschau-Ersatz für Sol-Moment-1, ohne separaten Screen).
2. **Screen „Der Kipppunkt":** Mitverdiener-Spur (zwei horizontale Balken auf `bg-bg-faint`-Panel,
   Job-Spur konstant bei 100 %, Depot-Spur wächst), Zeitgriff-Slider mit `max = Kipppunktjahr`
   (das Ziehen kann also nicht über den Gleichstand hinausgehen — bewusste technische Umsetzung
   von Sol-Moment 5 „Der Zeitgriff erreicht die 100-%-Marke"), Tick-Text „Jahr X · Depot-Ertrag Y"
   während des Ziehens, dauerhaft sichtbarer Transparenzsatz.

**Am Kipppunkt (Grok-Schärfung „für Entwurf A" #2):** Beschriftung wechselt exakt zu
„Job heute" / „Mitverdiener im Modell"; Ergebnissatz „Hier bringt dein Depot rechnerisch pro Jahr
so viel ein wie dein heutiger Job." (wörtlich aus Sol-Moment-5) + Modelljahr/Depotwert am
Kipppunkt darunter. Keine Längendifferenz zugunsten Depot, keine Farbeskalation.

**Beim Loslassen (Grok-Schärfung „für Entwurf A" #3):** Ansicht kehrt zu Jahr 0 zurück und zeigt
ein minimales Snapshot-Panel mit genau drei Elementen: heutiger Prozentsatz, dünne Verbindungslinie
(zwei Punkte + Linie), Kipppunkt-Jahr als Zielmarke. Keine zweite Zahlenflut.

**Grok-Schärfung „für Entwurf A" #1** (Modellzeile dauerhaft ab Interaktion, Marken zeigen nur
Jahr + Ertrag) ist umgesetzt: die Transparenzzeile ist ab Betreten von Screen 2 durchgehend
sichtbar, nicht erst am Kipppunkt.

## 3. Variante B — Kippbalken (Fable-Quelle + Albert-Entscheidung „Gleichstand, dann mehr")

Zwei-Screen-Flow analog A. Auf Screen 2 sind Sparrate, Rendite und Startdepot **verriegelt**
(nur als Textzeile „Grundlage: …" angezeigt, nicht mehr editierbar) — nur der Zeitregler bewegt
etwas (Fable-Kernidee „Zeit ist der einzige Regler").

**Signaturmechanik:** zwei vertikale Säulen (Job links konstant, Depot rechts wachsend) auf
gemeinsamer Grundlinie, Marken 25/50/75/100 % als Horizontallinien, ein „Kippbalken" liegt auf
den Säulenköpfen und rotiert je nach Verhältnis Job zu Depot.

**Albert-Entscheidung (bindend, mit Vorrang vor Groks offen markiertem Hinweis):**
„Variante B: Gleichstand, dann mehr." Umgesetzt als exakte Zwei-Stufen-Sequenz:

1. Bei `Jahr === Kipppunktjahr`: Balkenwinkel wird **auf exakt 0° erzwungen** (Gleichstand,
   waagerecht) — unabhängig vom kontinuierlich berechneten Winkel, der an dieser Stelle wegen der
   ganzzahligen Jahresauflösung nicht zwingend exakt 0 wäre. Ergebnissatz an dieser Stelle:
   „Job und Depot bringen rechnerisch gleich viel Jahresertrag ein." (neutrale Gleichstand-Aussage,
   bewusst nicht Sols Formulierung, um beide Varianten unterscheidbar zu halten).
2. Bei `Jahr === Kipppunktjahr + 1` (nächster Zeit-Tick): Winkel wird **nicht mehr erzwungen**,
   sondern normal aus dem Verhältnis berechnet — dieser Wert ist unmittelbar nach dem Schnittpunkt
   naturgemäß klein, das erzeugt das geforderte „leichte" Kippen ohne eigene Zusatzkonstante.
3. Erst ab `Jahr > Kipppunktjahr` erscheint der Ergebnissatz wörtlich: „Ab jetzt bringt dein Depot
   rechnerisch mehr Jahresertrag als dein heutiger Job."
4. Säulenköpfe zeigen **durchgehend, in jedem Zustand**, die Bildunterschrift „Ertrag/Jahr" unter
   dem Eurobetrag — ändert sich nie.
5. Kein Vorkommen von „Freiheit", „Rente", „Ausstieg" oder Job-Ablöse-Formulierungen geprüft und
   ausgeschlossen (Übergangssatz und CTA sind aus der Mini-Spec/Fable-Quelle übernommen).
6. Nach dem Kipp-Tick zeigt die Standortkarte zwingend den Kipppunkt-Status statt der
   „nächste Marke"-Zeile, bleibt aber durchgehend sichtbar (nicht nur nach dem Kipp) und trägt
   immer denselben Übergangssatz + CTA „Welche Dosis hältst du aus?".

**Grok-Schärfungen „für Entwurf B", ebenfalls übernommen (nicht von Albert überstimmt):**
- Säulenköpfe dauerhaft „Ertrag/Jahr" (deckungsgleich mit Punkt 4 oben, Grok und Albert stimmen
  hier überein).
- Depot-Kopfzeile koppelt den Eurobetrag immer mit der nächsten Marke (`„X € · nächste Marke Y % ·
  Jahr N"`), die Heute-Zahl steht nie allein groß.
- Standortkarte nach dem Kipp-Moment ist zwingend, nicht optional (deckungsgleich mit Punkt 6).

**Nicht gebaut — Groks Gleichstand-only-Alternative:** Grok schlug für B vor, den Balken am
Schnittpunkt **dauerhaft** auf Gleichstand stehen zu lassen (nie „Depotseite mehr"), um Nähe zum
Nicht-Ziel „Job-Ablöse-Narrativ" zu vermeiden (Grok-Prüfscore Nicht-Ziele B: 1/2, „Produktentscheidung
nötig"). **Albert hat diese Alternative ausdrücklich nicht übernommen** — B testet weiterhin
Fables ursprüngliche „Mehr"-Fortsetzung, siehe Entscheidung oben. Diese Ablehnung ist eine
inhaltliche Produktentscheidung, keine technische Einschränkung.

---

## 4. Formelmodell (für beide Varianten identisch, Werkstatt-Vereinfachung)

```
Job-Netto pro Jahr        = monatliches Netto-Arbeitseinkommen × 12   (konstant über die Zeit)
Depotwert(t)               = Depot₀ × (1 + r)^t + Sparrate_jährlich × ((1 + r)^t − 1) / r
Depot-Ertrag(t)             = Depotwert(t) × r
Kipppunktjahr               = kleinstes ganzzahliges Jahr t, an dem Depot-Ertrag(t) ≥ Job-Netto/Jahr
```

`r` = Renditeannahme (4/6/8 %), jährliche Aufzinsung, Sparrate wird als jährliche Einzahlung am
Jahresende modelliert (kein Tages-/Monatsgenauer Cashflow). Das exakte (reellwertige)
Schnittjahr wird per Bisektion gesucht und auf die nächste ganze Zahl gerundet, weil der
Zeitregler nur ganze Jahre kennt — das ist die technische Grundlage für „exakter Schnittpunkt"
in beiden Mechaniken. Diese Rundung ist eine **dokumentierte Modellvereinfachung**, keine
fachlich abgenommene Berechnungsvorschrift.

**Annahmenprotokoll (Mockup-Vertrag §8):**

| Element | Status | Begründung |
|---|---|---|
| Vier Eingabewerte (Job-Netto, Depotwert, Sparrate, Rendite) | simuliert | Testnutzer-Eingabe, keine echte Kontoanbindung. |
| Rechenmodell Depot-Ertrag (Formel oben) | aus Spec belegt (Formelmodell) | Mini-Spec: „Formelmodell reicht", Fable-Rohtext §6 nennt exakt dieses Modell. |
| Rundung des Kipppunktjahrs auf ganze Zahl | simuliert / redaktionell zu bestätigen | Technische Werkstatt-Vereinfachung für den ganzzahligen Zeitregler, nicht spec-geprüft. |
| Renditestufen 4/6/8 % | aus Spec belegt | Mini-Spec-Interaktion nennt exakt diese drei Stufen. |
| Transparenzsatz (Wortlaut) | aus Spec belegt | Wörtlich aus Mini-Spec übernommen, in beiden Varianten unverändert. |
| Ergebnissatz B „Ab jetzt bringt dein Depot …" | aus Spec belegt | Wörtlich Alberts Entscheidungstext, siehe §3. |
| Ergebnissatz A „Hier bringt dein Depot … so viel wie …" | aus Spec belegt | Wörtlich aus Sol-Moment-5. |
| Fortschrittsmarken 25/50/75/100 % | aus Spec belegt | Muss-Kriterium der Mini-Spec. |
| Balkenwinkel-Skala (±14°, Skalierungsfaktor 70) | simuliert | Reine Werkstatt-Visualisierungskonstante ohne fachliche Bedeutung, redaktionell/gestalterisch offen. |
| Slider-Wertebereiche (Job 1.000–6.000 €, Depot 0–100.000 €, Sparrate 50–1.000 €) | simuliert | Plausible Testszenario-Grenzen, nicht fachlich geprüft. |

---

## 5. Technische Notizen (nicht wieder einbauen / beachten)

- **Literalregel §2.2:** alle Tailwind-Klassen als vollständige String-Literale, keine Konkatenation
  von Klassenfragmenten. Segmented-Control-Zustände laufen über zwei komplette Klassenstrings
  (`SEG_ACTIVE`/`SEG_INACTIVE`), nicht über Basis+Zusatz-Konkatenation.
- **Datengetriebene Geometrie** (Balkenbreite/-höhe in A, Säulenhöhe/Balkenrotation in B) läuft
  ausschließlich über Inline-`style`, nie über zusammengesetzte Klassennamen — konsistent mit der
  dokumentierten Ausnahme für datengetriebene Werte (Baukasten 2.2 Punkt 5).
- **SafeDOM:** alle dynamischen Texte über `textContent`, kein `innerHTML`. Einzige externe
  Ressource: der kanonische Tailwind-Play-CDN-Tag; keine weiteren Netzwerkzugriffe, keine
  Fremddaten.
- **Motion-Reduce:** Breiten-/Höhen-/Rotations-Übergänge tragen `motion-reduce:transition-none`.
- **CI-Bridge:** `@theme inline`-Block wortgleich aus `docs/testing/templates/app.test.template.html`
  übernommen (nicht neu erfunden), Werte kommen ausschließlich aus `Theme/assets/css/tokens.css`.
- **Kein `Apps/depot-kipppunkt/`-Zugriff:** beide Mockups sind vollständig eigenständig (kein
  Bootstrapper, kein `data-fw-app`-Dispatch) — passend zum Werkstattstatus vor jeder APP_SPEC.
- **Edge-Case Kipppunktjahr sehr groß:** bei extremen Slider-Kombinationen (hohes Job-Netto, sehr
  niedrige Sparrate) kann das rechnerische Kipppunktjahr sehr groß werden (>80 Jahre). Die
  Bisektion ist intern auf 200 Jahre begrenzt und liefert dann ein entsprechend großes, aber
  plausibles Ergebnis — es gibt keine eigene Nutzerwarnung dafür. Bekannte Werkstatt-Grenze, nicht
  gehärtet.

---

## 6. Beibehaltene harte Grenzen (beide Varianten)

- Keine Finanzfreiheit-, Entnahme-, Steuer-, Sozialabgaben-, Gehaltssteigerungs-, Inflations-,
  Sparratendynamik- oder Renditedebatten-Inhalte (Mini-Spec-Nicht-Ziele).
- Kein „Wann kannst du aufhören zu arbeiten?" und keine Freiheit-/Rente-/Ausstiegs-/
  Job-Ablöse-Formulierungen (zusätzlich explizit für B verlangt, Albert-Entscheidung Punkt 5).
- Alle Zahlen sind Testwerte, keine echte Kontoanbindung, kein Backend, kein Fetch.
- Werkstattmodus, nur Happy Path — kein Error-/Empty-/Loading-State geprüft oder behauptet
  (Mockup-Vertrag §3 Nicht-Ziele).
- Keine Hybridisierung A/B, keine dritte Variante.

---

## 7. Was ist offen (TODO für Nachfolger)

**Strategisch / Steuerung (braucht Albert):**
- [ ] Reale Browser-Abnahme beider Varianten, 375/768/1280 px (Status bleibt GELB bis dahin).
- [ ] Reichweite der „Gleichstand, dann mehr"-Entscheidung: gilt sie auch für eine spätere
      Produktions-App, oder ist sie auf dieses Mockup-Duell begrenzt? Falls Produktion: Mini-Spec-
      Ergebnisformulierung entsprechend abgleichen (Mini-Spec zitiert bereits „bringt … mehr ein",
      es besteht also vermutlich kein Widerspruch — nicht abschließend geprüft, da außerhalb des
      Mockup-Scopes).
- [ ] Wirkungsabnahme durch Albert entlang der fünf Prüffragen aus Mockup-Vertrag §7 (kein
      Selbst-Score als Abnahmenachweis).

**Feinschliff (bei Bedarf, kein Blocker):**
- [ ] Balkenrotations-Skala (±14°, Faktor 70) ist eine reine Bauch-Schätzung — bei der Abnahme ggf.
      nachjustieren.
- [ ] Rundung des Kipppunktjahrs auf ganze Zahl redaktionell/fachlich bestätigen (§4).

---

## 8. Manueller Testablauf (375 / 768 / 1280 px)

Siehe auch `tests/scratch/depot-kipppunkt/mockup-duell/README.md` (identischer Ablauf, dort für
Albert aufbereitet).

**Variante A** (`a-sol/mockup.html`):
1. Screen 1 ausfüllen, „Weiter".
2. Zeitgriff bis zum Anschlag ziehen (Anschlag = Kipppunkt) — Spuren müssen exakt gleich lang enden,
   Beschriftung wechselt zu „Job heute / Mitverdiener im Modell".
3. Griff loslassen (`pointerup`/`mouseup`/`touchend`/`change`) — Snapshot-Panel mit Prozent + Marke
   + Verbindungslinie muss erscheinen, Slider springt auf Jahr 0 zurück.
4. Reduced-Motion aktivieren: Balkenbreiten-Übergang muss sofort springen, kein Gleiten.

**Variante B** (`b-fable/mockup.html`):
1. Screen 1 ausfüllen, „Weiter" — Grundlage-Zeile mit verriegelten Werten muss erscheinen.
2. Zeitregler exakt auf das angezeigte Kipppunktjahr ziehen — Balken muss exakt waagerecht stehen,
   Ergebnissatz „Job und Depot bringen rechnerisch gleich viel …".
3. Einen Tick weiterziehen — Balken kippt leicht Richtung Depot, Ergebnissatz wechselt zu
   „Ab jetzt bringt dein Depot rechnerisch mehr …", Säulenköpfe zeigen weiterhin „Ertrag/Jahr".
4. Standortkarte durchgehend sichtbar prüfen, Textwechsel „nächste Marke" → Kipppunkt-Status.
5. Tastatur/Fokus: Tab durch Slider, Segmented Control, Buttons — Fokusringe sichtbar.
6. Reduced-Motion aktivieren: Höhen-/Rotations-Übergänge springen sofort.

---

## 9. Übergabe-Notiz

Nächster zulässiger Schritt: Alberts manueller Vergleichstest A gegen B, 375/768/1280 px.
Ausdrücklich nicht: APP_SPEC, Produktionscode, Gewinnerwahl durch das Modell. Kein Commit durch
Claude (Albert committet selbst). Diese Datei ist der aktuelle Wahrheitsstand.
