---
zuletzt verändert am: 2026-04-25T12:11:00+02:00
Angelegt am: 25.04.2026 11:22:02
quellen: ChatGPT-4, Claude-5, Gemini-6, Perplexity-7, ChatGPT-Umbau-3, Claude-Review-Umbau-2
tags:
  - dashboard
  - ux
  - regulatorik
  - ghost
  - todo
---
----
up:: 
# Dashboard Regulatorik — Master-Änderungsliste

> **Geisteshaltung:** Qualität bemisst sich daran, wie sehr das Nutzererlebnis verbessert wird — nicht daran, wie viele Punkte abgehakt werden können. Ein Fix, der den Nutzer wirklich weiterbringt, wiegt mehr als drei kosmetische Korrekturen.

**Kontext:** Das Dashboard ist ein interaktiver Renditeverlust-Rechner (Spar- + Entnahmephase), eingebettet in einen Ghost.io-Artikel. Es hat **keine eigene URL**, wird nicht direkt verlinkt, nicht als Bookmark oder Social Share genutzt. Der Artikel ist die einzige Einstiegsform. Der Artikel liefert den Erklärungskontext und den **Anker**: Der Nutzer kommt nicht kalt. Er hat den Effekt bereits am Artikel-Beispiel gesehen und bekommt die Überleitung: *„Das sind die Zahlen, mit denen ich oben gerechnet habe — jetzt deine."* Das Dashboard ist **Werkzeug, kein Essay, und kein Überzeugungsinstrument**. Der Artikel hat die Überzeugungsarbeit bereits geleistet.

> **Status alle offenen Entscheidungen:** vollständig geschlossen (v3). Keine offenen Punkte mehr.

---

## Quellen-Konsens auf einen Blick

| Befund | ChatGPT | Claude | Gemini | Perplexity |
|---|:---:|:---:|:---:|:---:|
| Doppeltes `<h1>` | ✓ | ✓ | — | ✓ |
| Slider-Tick-Bug | — | ✓ | — | ✓ |
| Mobile: kein simultanes Feedback | ✓ | ✓ | ✓ | ✓ |
| Header-Text zu lang | ✓ | ✓ | ✓ | ✓ |
| Überblick-Sektion löschen | ✓ | ✓ | ✓ | ✓ |
| Konsequenz-Box kürzen | ✓ | ✓ | — | ✓ |
| KPI-Hierarchie fehlt | ✓ | ✓ | ✓ | ✓ |
| Chart-Legende → Direct Labels | — | ✓ | ✓ | — |
| Text unter 12px | — | — | — | ✓ |

---

## 🔴 KRITISCH — Muss umgesetzt werden, unabhängig vom Aufwand

Diese Punkte sind keine Verbesserungsvorschläge. Sie sind Fehler, die das Tool beschädigen — entweder technisch, inhaltlich oder in der Kerninteraktion.

---

### K-1 · Doppeltes `<h1>` — Accessibility- und SEO-Fehler

**Konsens:** Claude, Perplexity (beide unabhängig identifiziert)
**Aufwand:** trivial

**Problem:** Zeile 86 (`ETF‑Regulatorik`, Icon-Zeile) und Zeile 93 (`ETF‑Regulatorik: Was kleine regulatorische Renditeverluste…`) sind beide `<h1>`. Im Ghost-Einbettungskontext ergibt das **drei `<h1>` auf einer Seite** (Artikel + 2× Dashboard). Screenreader nutzen Heading-Hierarchien zur Navigation — das ist Accessibility-Pflicht, keine Präferenz.

**Fix:** Icon-Zeile (Zeile 86) von `<h1>` auf `<p>` oder `<span>` ändern. Die große Zeile (93) ist die einzige legitime `<h1>` des Dashboards. Im Ghost-Kontext prüfen, ob das Dashboard überhaupt eine `<h1>` braucht oder ob `<h2>` angemessener wäre.

---

### K-2 · Slider-Tick-Bug: 7 Positionen, 5 Labels — nicht ausgerichtet

**Konsens:** Claude, Perplexity
**Aufwand:** gering

**Problem:** Der Slider hat 7 Tick-Positionen (0 / 0,5 / 1,0 / 1,5 / 2,0 / 2,5 / 3,0). Die `justify-between`-Beschriftungszeile darunter hat 5 Labels (0 / mild / spürbar / hart / drastisch). Die Labels stehen visuell **zwischen** den Ticks, nicht auf ihnen. Das ist kein Geschmacksthema — die Skala ist objektiv falsch lesbar.

**Fix (zwei Optionen):**
- Option A: 7 Labels erstellen, die auf die 7 Tick-Positionen passen (0 % / 0,5 % / 1,0 % / 1,5 % / 2,0 % / 2,5 % / 3,0 %)
- Option B: Qualitative Labels behalten (Krug-Argument: senkt Einstiegshürde), aber auf 4 Abstände reduzieren, die mit den Tick-Positionen übereinstimmen. Endpunkte numerisch beschriften.

**Hinweis zur Kontroverse:** Krug würde qualitative Labels loben ("Don't make me think about numbers"), Tufte würde numerische Labels fordern ("show the data"). Beides ist verteidigbar — aber die Labels müssen auf die Ticks passen. Das ist das eigentliche Problem, nicht die Art der Labels.

---

### K-3 · Mobile: Slider und Ergebnis nie gleichzeitig sichtbar — bricht die Kerninteraktion

**Konsens:** Alle 4 LLMs
**Aufwand:** mittel bis hoch (je nach gewählter Lösung)

**Problem:** Das Input-Grid ist `xl:grid-cols-2` — zweispaltig erst ab 1280px. Auf jedem Smartphone und Tablet (375–1279px) sind Eingaben und Ergebnispanel einspaltig und weit voneinander entfernt. Ein Nutzer bewegt den Slider und sieht **keine Reaktion** — ohne zu scrollen. Das bricht die Feedback-Schleife, die das gesamte Tool ausmacht.

Krug: *"If something is interactive, show me what changed."*
Tufte: *"Cause and effect must be spatially adjacent."*

**Hinweis:** Im Code existiert an genau der richtigen Stelle (Zeile 91) ein expliziter Platzhalter `<!-- MOBILE SUMMARY -->` — leer. Das war der geplante Fix. Er wurde bewusst vorgesehen und nie gebaut.

**Fix-Optionen (nach Aufwand sortiert):**
1. **Sticky-Leiste** am unteren Bildschirmrand auf Mobile (`< md`): zeigt dauerhaft die Kern-Aussage (`− X € / Monat`, `− Y € Endvermögen`). Geringe JS-Logik, hoher Impact. Das ist die Lösung, die `<!-- MOBILE SUMMARY -->` vorgesehen hatte.
2. **`md:grid-cols-2` statt `xl:grid-cols-2`**: Gibt ab 768px bereits zweispaltige Ansicht. Minimaler Aufwand, aber hilft Smartphones unter 768px nicht.
3. **Tab-Switch** (Eingabe / Ergebnis): klassisches Mobile-Pattern, höherer Umbauaufwand.

**Empfehlung:** Sticky-Leiste (Option 1) ist das beste Verhältnis aus Aufwand und Impact. Sie lässt die Struktur intakt und löst das Mobile-Problem ohne DOM-Umbau.

---

## ⚡ Quick Wins — Hoher Impact, geringer bis trivialer Aufwand

Sortiert nach Impact/Aufwand-Verhältnis. Diese Punkte sollten in einer einzigen Session erledigt werden.

---

### QW-1 · Header-Text radikal kürzen

**Konsens:** Alle 4 LLMs
**Aufwand:** trivial

**Problem:** Langer Titel + erklärender Absatz + doppelte Headline. Der Artikel hat das bereits erklärt. Jede Zeile, die das Dashboard über sich selbst erklärt, ist Arbeit, die der Nutzer erledigen muss, bevor er das Tool benutzen kann.

**Fix:** Ersetzen durch maximal zwei Zeilen:
```
ETF-Regulatorik
Wie stark drücken kleine Renditeverluste deine Rente?
```
Kein Absatz. Keine Erklärung. Der Artikel hat das bereits getan.

---

### QW-2 · Überblick-Sektion löschen — entschieden: vollständig löschen

**Konsens:** Alle 4 LLMs
**Aufwand:** trivial
**Entscheidung:** Löschen. Kein Collapse, kein Fallback.

**Problem:** Die Sektion „Was dieses Modell ist – und was nicht" umfasst vier Absätze Fließtext. Im Ghost-Kontext ist dieser Text doppelt: Er steht im Artikel und wiederholt sich im Dashboard.

**Begründung für vollständiges Löschen (keine Collapse-Option):** Das Dashboard hat keine eigene URL und wird nicht direkt verlinkt. Jeder Nutzer kommt über den Artikel. Der Risiko-Fall — direkter Aufruf ohne Artikel-Kontext — existiert in dieser Nutzungsform nicht. Ein `<details>`-Collapse wäre Aufwand für einen Fall, der nie eintritt, und würde Platz und Komplexität im DOM behalten, ohne einen Nutzer zu bedienen.

**Was nach dem Löschen mit dem Inhalt passiert:**
- Modell-Erklärung → im Artikel (ist bereits dort)
- Bedienhinweis → fällt weg (Krug: self-evident UI)
- Disclaimer → einzeilige Fußnote im Dashboard-Footer

**Löst gleichzeitig:** Das strukturelle Problem, dass die Überblick-Sektion zwischen Ergebnissen sitzt — der Nutzer sah Ergebnisse, bevor er wusste, was das Modell tut.

---

### QW-3 · Konsequenz-Box auf drei Zeilen kürzen

**Konsens:** ChatGPT, Claude, Perplexity
**Aufwand:** gering

**Problem:** Die Konsequenz-Box unter dem Chart besteht aus mehreren Absätzen mit Zahlen und Erklärungstext. Die drei Zahlen sind der eigentliche Inhalt. Der Rest ist Erklärung, die der Artikel liefert.

**Fix:**
```
− XXX € / Monat weniger
= XXX € / Jahr
≈ XX % weniger Rente
```
Die Kleintext-Zeile `„Basis: maximal mögliche Monatsrente ohne regulatorischen Renditeverlust = 100 %"` bleibt — sie erklärt eine Rechengröße, nicht das Modell.

---

### QW-4 · Statische Unter-Texte unter KPI-Karten streichen

**Konsens:** Claude, Perplexity
**Aufwand:** trivial

**Problem:** Jede KPI-Karte hat einen erklärenden Satz darunter, z.B. *„So würde sich dein Depot entwickeln, wenn die Regeln unverändert bleiben."* Das ist Kontext, den der Artikel liefert. Wenn der Label gut geschrieben ist, braucht er keinen Erklärungssatz.

**Fix:** Erklärungssätze entfernen. KPI-Karten zeigen nur Label + Zahl. Dashboard wird sofort luftiger.

**Ausnahme:** Dynamische Slider-Kontexte (`„Was konkret dahintersteckt"`) bleiben — sie sind interaktiv und nicht im Artikel replizierbar.

---

### QW-5 · „Links stellst du deine Annahmen ein" — auf Mobile falsch

**Konsens:** Claude
**Aufwand:** trivial

**Problem:** Der Text *„Links stellst du deine Annahmen ein"* im Überblick stimmt auf Mobile nicht — dort gibt es kein „links".

**Fix:** Entfällt mit QW-2 automatisch. Falls der Überblick als Collapse-Element erhalten bleibt (hier nicht der Fall): „oben" oder layout-agnostisch formulieren.

---

### QW-6 · `tblDrag`-Zeile in der Sparphase-Karte streichen

**Konsens:** Claude
**Aufwand:** trivial

**Problem:** Die 4. Karte der Sparphase (`tblDrag`) zeigt den Renditeverlust als Tabelleneintrag — denselben Wert, den der Nutzer gerade selbst per Slider eingestellt hat. Tufte: Datentinte mit Null-Informationsgehalt ist Chartjunk.

**Fix:** Die Zeile entfernen. Die Karte zeigt nur, **was der Verlust kostet** (Prozent + Euro), nicht was der Input war.

---

## 🔧 Mittlerer Aufwand — Hoher struktureller Gewinn

Diese Punkte erfordern mehr als Textersetzen, sind aber keine Umbauten der Grundstruktur.

---

### M-1 · KPI-Hierarchie: Visuelle Struktur für Scannability — nicht für Überzeugung

**Konsens:** Alle 4 LLMs (Diagnose korrekt; ursprüngliches Ziel revidiert, siehe unten)
**Aufwand:** mittel (Layout-Umbau, kein JS)

**Problem:** Sparphase hat 4 Karten, Entnahmephase hat 3. Alle sehen identisch aus — gleiche Größe, gleiche Typografie, gleicher Rahmen. Es gibt keine visuelle Führung, wo der Nutzer zuerst hinschauen soll. Der Nutzer, der gerade seinen Slider bewegt, will sofort sehen: *„Was hat sich verändert?"* Ohne Hierarchie muss er alle Karten gleichzeitig scannen.

**Wichtige Präzisierung (revidiert gegenüber ursprünglicher LLM-Einschätzung):**
Die vier LLMs haben die Hero-Hierarchie primär als Überzeugungsmittel gedacht — eine dominante Schockzahl, die den Nutzer von der Relevanz des Themas überzeugt. Dieses Ziel entfällt: Der Nutzer kommt aus dem Artikel, ist bereits informiert und überzeugt. Die Hero-Zahl-Logik der FAANG-Dashboards gilt für **kalte Landingpage-Besucher**, nicht für kontextuell eingebettete Werkzeuge. Das Ziel der KPI-Hierarchie hier ist ausschließlich **Scannability**: Der Nutzer findet sofort die Zahl, die sich beim Slider-Ziehen geändert hat.

**Fix Sparphase:**
- **Primär (größer, visuell führend):** Endvermögen-Vergleich (mit vs. ohne Regulatorik) — am direktesten ablesbar, verändert sich sichtbar beim Slider-Ziehen
- **Sekundär:** Verlust in €, Verlust in % — kleiner, aber nicht versteckt
- **Sekundär (nicht optional):** Nötige Sparrate zum Ausgleich — beantwortet eine Frage, die kein anderes Tool stellt. Als sekundäre, nicht optionale Information behandeln.

**Fix Entnahmephase:**
- **Primär:** Jährliche Auszahlung (mit vs. ohne)
- **Sekundär:** Differenz pro Monat
- Die „Was dich das kostet"-Tabelle kann hinter `„Mehr anzeigen ▾"` (Accordion) verschwinden

**Was sich gegenüber der ursprünglichen Einschätzung ändert:** Es gibt keine „Hero-Zahl" im Sinne einer Schockzahl. Es gibt eine primäre Zahl, die der Nutzer beim Slider-Ziehen als erste Orientierung sieht — nicht die dramatischste, sondern die reaktivste.

---

### M-2 · Chart-Legende → Direct Labeling an den Kurvenenden

**Konsens:** Gemini, Claude
**Aufwand:** gering bis mittel (Chart.js-Konfiguration)

**Problem:** Die Legende unter dem Chart erfordert, dass das Auge zwischen Legende und Kurve hin- und herspringt. Tufte: Beschriftungen gehören so nah wie möglich an die Daten.

**Fix:** Labels direkt an die Kurvenenden annotieren (Line-End-Labels) — „Mögliches Vermögen" und „Mit Regulatorik" als Inline-Annotation. Eliminiert den Blickwechsel zwischen Legende und Daten.

**Bonus (Gemini-Vorschlag):** Die vertikale Differenz am Endpunkt des Charts mit einer Klammer oder einem Pfeil markieren und direkt mit dem dynamischen Euro-Betrag beschriften. Das Auge sieht dann nicht „zwei Kurven", sondern „den Verlust".

---

### M-3 · Slider: Aktuellen Wert am Thumb sichtbar machen

**Konsens:** Claude, Perplexity
**Aufwand:** mittel

**Problem:** Der aktuelle Wert erscheint als Kleintext **unterhalb** des Sliders. Beim schnellen Ziehen muss der Nutzer den Blick nach unten wandern lassen — das unterbricht die Feedback-Schleife.

**Minimalfix:** Aktuellen Wert prominent direkt rechts neben dem Slider-Label zeigen, nicht als Fließtext darunter.
**Vollfix:** Tooltip-Bubble über dem Thumb, der beim Ziehen mitläuft.

---

### M-4 · Chart-Höhe auf Mobile anpassen

**Konsens:** Gemini
**Aufwand:** gering (CSS/Media Query)

**Problem:** Chart-Container hat feste Höhe `340px`. Auf schmalem Smartphone entsteht fast ein Quadrat (340×340px), das die gesamte sichtbare Fläche belegt und alle anderen Inhalte verdrängt.

**Fix:**
```css
@media (max-width: 640px) {
  .chart-container { height: 250px; }
}
```

**Zusatz (Gemini):** `autoSkip: false` und `maxRotation: 0` auf der X-Achse kann bei vielen Jahren auf schmalen Screens zu überlappenden Labels führen. Auf Mobile die X-Achsen-Ticks auf Meilensteine reduzieren: Start / Rentenbeginn / Ende.

---

### M-5 · Initial-Zustand Konsequenz-Box: Gedankenstriche statt Werte

**Konsens:** Claude
**Aufwand:** gering

**Problem:** Die Konsequenz-Box zeigt vor dem ersten JS-Render `— € / Monat weniger` und `Ohne Regulatorik wären — % mehr möglich gewesen.` Das wirkt kaputt. Die KPI-Karten unten zeigen sauber `0 €`.

**Fix:** Entweder `0`-Werte initialisieren (konsistent mit den KPI-Karten) oder die Box erst rendern wenn Werte vorliegen (CSS: initial `display: none`, nach erstem Render einblenden).

---

### M-6 · Jahres-/Monatsmix konsistent machen

**Konsens:** Claude
**Aufwand:** mittel

**Problem:** Entnahmephase-Sektionen mischen Jahreswerte (`Jährliche Auszahlung`) und Monatswerte (`Weniger pro Monat`). Die Konsequenz-Box (Gesamtschau) zeigt primär Monatswerte. Der Nutzer muss mental umrechnen — unnötig, da die Maschine das kann.

**Fix:** Konsistenz wählen und in den Labels explizit machen. Empfehlung: Jahreswerte in der Entnahme-Sektion, Monatswerte in der Konsequenz-Box — aber nie beide auf derselben Ebene ohne explizite Kennzeichnung.

---

### M-7 · Eingabe-Limits anzeigen + Silent Clamp kommunizieren

**Konsens:** Claude
**Aufwand:** mittel

**Problem:** Die Felder `saveReturn` (1–10 %) und `saveYears` (1–50 Jahre) haben unsichtbare Limits. Gibt ein Nutzer `0,5` ein, wird er lautlos auf `1` geklemmt — kein Feedback außer dem `blur`-Event. Krug: Silent failures erzeugen Misstrauen.

**Fix (Minimum):** Bereichsangabe im Label oder als Placeholder (`1 – 50`).
**Fix (besser):** Inline-Validierungsmeldung beim Klemmen, z.B. `„Mindestwert: 1 Jahr"`.

---

### M-8 · Reset-Button

**Konsens:** Claude
**Aufwand:** klein

**Problem:** Ein Nutzer, der experimentell alle Werte verändert hat, muss die Seite neu laden, um die Defaults wiederzubekommen.

**Fix:** Kleiner „Zurücksetzen"-Button bei jedem Eingabeblock.

---

### M-9 · Default-Slider-Kontext-Box ausblenden bis erste Interaktion

**Konsens:** Perplexity
**Aufwand:** gering (JS-Flag)

**Problem:** Die Kontextbeschreibung zeigt im Default-Zustand eine leere Instruktion: *„Bewege den Regler, um zu sehen…"*. Das ist eine leere Aufforderung ohne Inhalt.

**Fix:** Die Box initial ausblenden (`display: none`). Nach erster Slider-Interaktion einblenden.

---

## ❌ Abgelehnte Vorschläge — Warum nicht

Diese Punkte wurden von mindestens einem LLM vorgeschlagen und bewusst nicht übernommen.

---

### A-1 · Hero-Zahl oben (feste absolute Schockzahl wie „–1.240 € / Monat")

**Vorgeschlagen von:** ChatGPT (initial), Gemini (initial)
**Abgelehnt:** Korrekt verworfen — Autorentscheidung bestätigt

**Grund:** Anchoring-Falle. Eine feste Default-Zahl, die auf eigenen Vorbelegungen beruht, wird bei individueller Dateneingabe mit hoher Wahrscheinlichkeit dramatisch über- oder unterschritten. Resultat: entweder Panikmache oder Vertrauensverlust. In Finance/Regulatorik besonders toxisch. ChatGPT hat seinen eigenen Vorschlag nach dem Einwand selbst zurückgezogen.

---

### A-2 · Inputs komplett nach dem Chart verschieben

**Vorgeschlagen von:** ChatGPT (als „wichtigster Move")
**Abgelehnt:** Claude (technische Begründung)

**Grund:** Funktioniert für statische Infografiken, nicht für konfigurierbare Rechner. Auf Mobile erzeugt es ein Scroll-Back-Problem: Slider anpassen → nach oben scrollen → Ergebnis sehen → nach unten scrollen.

**Alternative:** Chart-Section visuell stärken, Input-Bereich kompakter gestalten — gleicher Intent, kein DOM-Umbau.

---

### A-3 · Keine Zahlen beim ersten Laden (Initial-Chart ohne Werte)

**Vorgeschlagen von:** ChatGPT
**Abgelehnt:** Claude

**Grund:** Wirkt kaputt. Erfordert einen zusätzlichen Initialzustand, der nicht existiert, und löst kein reales Problem. Default-Zahlen zeigen ist korrekt — sie sind das Ergebnis der eingestellten Parameter, kein falscher Anker.

---

### A-4 · Relative Metrik (%) als primäre Hero-Zahl

**Vorgeschlagen von:** ChatGPT (nach Einwand gegen A-1), Gemini
**Abgelehnt:** Autorentscheidung nach eigener Analyse

**Grund:** Der Prozentsatz-Verlust ist ebenfalls stark abhängig von Parametern — und zwar nicht nur von der Sparrate (individuell), sondern auch vom Zeitraum. Konkret: Dieselbe regulatorische Annahme ergibt je nach Zeitraum:
- 30/30 Jahre → **16,2 % Verlust**
- 20/20 Jahre → **10,7 % Verlust**

Ein Nutzer, der 20/20 eingibt und 10,7 % sieht, hat einen völlig anderen „Schock" als einer mit 30/30. Die relative Metrik ist kein stabiler Orientierungspunkt. Es gibt keine Hero-Zahl, weder absolut noch relativ. Der Artikel ist der Hero.

---

### A-5 · Tilde-Zeichen (~) als Unsicherheitssignal für gerundete Zahlen

**Vorgeschlagen von:** Gemini
**Abgelehnt:** Autorentscheidung

**Grund:** Die Rundung ist bereits implementiert und strategisch entschieden. Die gerundeten Zahlen selbst sind das Signal — sie kommunizieren durch ihre Form (z.B. „124.000 €" statt „124.318 €") bereits, dass es sich um eine Näherung handelt. Ein zusätzliches `~` wäre ein zweites Unsicherheitssignal für dieselbe Information — das ist Redundanz, keine Klarheit. Außerdem würde `~` visuelles Rauschen in allen KPI-Karten erzeugen, wo es keinen Mehrwert hat.

---

## 🟢 Geschmacksfragen — Entscheidung liegt beim Autor

| # | Thema | Kontext |
|---|---|---|
| G-1 | `rounded-3xl` auf Section-Containern | Sehr weich (1,5 rem). Für Finanz-Analyse eher „Consumer App" als „Analyse-Tool". `rounded-2xl` wäre Kompromiss. Funktioniert, ist Geschmack. |
| G-2 | Qualitative Slider-Labels (mild/spürbar/hart/drastisch) | Krug: lobt sie (senkt Einstiegshürde). Tufte: würde numerische Labels fordern. Beide Ansätze verteidigbar — das eigentliche Problem ist K-2 (Labels stehen nicht auf den Ticks). |
| G-3 | `font-extrabold` / font-weight 900 auf KPI-Zahlen | Verleiht Kraft, kann bei langen Zahlen (123.456 €) anstrengend wirken. `font-bold` (700) wäre typografisch ausgewogener. |
| G-4 | `gap-16` (64px) zwischen Sektionen | Macht das Dashboard lang. `gap-10` wäre kompakter ohne Enge. |
| G-5 | Dark Mode Toggle — Position und Feedback | Toggle ist innerhalb der Parameter-Sektion versteckt. Gehört in den globalen Header. `aria-label` sollte den nächsten Zustand beschreiben: „Zu Dunkel-Modus wechseln". |
| G-6 | Pink/Lila für Verluste statt Rot (`danger: #a12c7b`) | Bewusster Bruch mit Konvention. Konsistent mit dem Farbsystem. Manche Nutzer nehmen es als weniger alarmierend wahr als beabsichtigt. |
| G-7 | SVG-Icon im Header-Badge | Dekorativ, kein Informationswert (Tufte würde streichen). Im redaktionellen Ghost-Kontext akzeptabler visueller Anker. |
| G-8 | Slider-Schrittweite 0,1 % | Feine Schritte auf Touch-Screens langsam. 0,25 % oder 0,5 % würden reichen, wenn Richtung wichtiger ist als Präzision. |

---

## Umsetzungsreihenfolge (empfohlen)

### Sofort (< 2 Stunden, alle trivial/gering)

1. `[ ]` K-1 — Doppeltes `<h1>` fixen
2. `[ ]` QW-1 — Header-Text kürzen
3. `[ ]` QW-2 — Überblick-Sektion vollständig löschen
4. `[ ]` QW-3 — Konsequenz-Box auf 3 Zeilen kürzen
5. `[ ]` QW-4 — Statische KPI-Unter-Texte entfernen
6. `[ ]` QW-6 — `tblDrag`-Zeile streichen
7. `[ ]` M-5 — Initial-Zustand Konsequenz-Box fixen (Gedankenstriche → Werte)

### Nächste Session (mittlerer Aufwand, hoher Impact)

8. `[ ]` K-2 — Slider-Tick-Bug beheben
9. `[ ]` M-9 — Slider-Kontext-Box erst nach Interaktion zeigen
10. `[ ]` M-2 — Chart: Direct Labeling an Kurvenenden
11. `[ ]` M-1 — KPI-Hierarchie für Scannability umbauen (kein Hero, nur visuelle Führung)
12. `[ ]` M-4 — Chart-Höhe auf Mobile anpassen + X-Achsen-Ticks reduzieren

### Danach (substantieller Aufwand, Kernproblem Mobile)

13. `[ ]` K-3 — Mobile Summary implementieren (Sticky-Leiste)
14. `[ ]` M-3 — Slider-Wert am Thumb sichtbar machen
15. `[ ]` M-6 — Jahres-/Monatsmix konsistent machen
16. `[ ]` M-7 — Eingabe-Limits anzeigen + Silent Clamp kommunizieren
17. `[ ]` M-8 — Reset-Button hinzufügen

### Letzte Schicht (Feinschliff)

18. `[ ]` G-5 — Dark Mode Toggle: Position + aria-label-Zustand

---

*Angelegt: 2026-04-25 | Letzte Änderung: 2026-04-25 v3 | Alle Entscheidungen geschlossen.*
*Grundlage: 4 LLM-Feedbacks + technisches Claude-Review des ChatGPT-Umbauvorschlags + Autoren-Analyse Hero-Zahl-Problem + Autoren-Entscheidungen OE-1/OE-2/OE-3*
