# Drehbuch: Prokrastinationspreis-App — vollständiger Flow

**Projekt:** Finanzwesir 2.0  
**App:** prokrastinations-preis  
**Stand:** 2026-06-25  
**Status:** Abgestimmtes UX-Drehbuch nach Peer-Review-Session

---

## Screen 1 — Die Frage

Der Nutzer sieht eine einzige Frage und einen Slider.

> *Vor 10 Jahren wäre besser gewesen. Was ist mit heute?*

Slider: monatliche Sparrate, 50–2000 €. Darunter der Button:

> *10 Jahre zurückspringen*

Kein Chart. Keine Zahlen. Noch kein Endwissen.

---

## Screen 2 — Die Zeitreise

### Einstieg

Der Nutzer springt in Screen 2. Der Chart erscheint — aber nur der erste Datenpunkt. Die X-Achse zeigt den vollen 10-Jahres-Rahmen, die Linie beginnt ganz links. Rechts: noch leer, aber kein Zukunftsraum — einfach noch nicht erreicht.

Darüber die erste Eventkarte, groß, mit vollem Gewicht:

```
Zeit Online · 9. November 2016
Finanzmärkte: Dax startet nach Trump-Sieg mit Verlusten
Trumps Wahlsieg sorgt für Nervosität; der DAX startet
mit fast drei Prozent Minus.

[Zwischenstand anzeigen]
```

Darunter der Orientierungs-Chip:
> *Station 1 von 8 · Bekannt bis November 2016*

Button:
> *Weiter investiert bleiben*

---

### Kartenwechsel — das Herzstück

Der Nutzer klickt. Jetzt passiert der entscheidende Moment:

**Beat A — Karte schrumpft** *(300ms)*  
Die Trump-Karte zieht sich zusammen — sie wird kleiner, verliert ihr Gewicht, wandert in Richtung des Punktes im Chart, der ihr entspricht.

**Beat B — Punkt pulst** *(kurz, direkt nach Beat A)*  
Der neue Marker auf der Chartlinie pulst einmal auf. Die Karte ist dort angekommen. Sie ist jetzt dieser Punkt.

**Beat C — Nächste Karte erscheint** *(fade in, 200ms)*  
Die Bitcoin-Karte baut sich auf. Groß. Mit vollem Gewicht. Als wäre sie die erste.

```
WirtschaftsWoche · 17. Dezember 2017
Bitcoin durchbricht 20.000-Dollar-Marke
Bitcoin durchbricht erstmals die Marke von 20.000 Dollar.
```

Der Chart hat sich um ein Jahr verlängert. Trump ist ein kleiner Punkt auf der Linie.

---

### Die 7 Stationen

Dieser Ablauf wiederholt sich für alle 7 Stationen:

| Station | Ereignis |
|---|---|
| 1 | Trump-Sieg 2016 |
| 2 | Bitcoin-Euphorie 2017 |
| 3 | Corona-Crash 2020 |
| 4 | Impfstoff-Rally 2020 |
| 5 | Ukraine-Invasion 2022 |
| 6 | Nvidia/KI-Euphorie 2024 |
| 7 | SaaS-Apokalypse 2026 |

Jede Karte: gleiche Animation, gleicher Punkt. Nach sieben Wiederholungen hat sich im Nutzer ein Muster gebildet: *Groß → schrumpft → Punkt*.

Die SaaS-Karte — das Ereignis, das heute noch groß wirkt — läuft dieselbe Animation. Kein Sonderfall.

---

## Screen 3 — Der Rückspiegel

### Einstieg

Die SaaS-Karte verschwindet. Dann:

**Zuerst** erscheint ein einziger Satz — noch kein Chart:

> *Im Rückblick ist es eine Linie. Unterwegs war jedes Mal offen.*

**Dann** — mit kurzer Verzögerung — faded der vollständige Chart ein. Alle 7 Punkte sichtbar. Die Linie läuft durch alle Ereignisse. Ganz rechts: die blaue vertikale Linie.

**Dann** — nochmal mit Verzögerung — erscheinen die KPI-Karten darunter:

- Eingezahlt
- Depotwert heute
- Gewinn / Verlust

Die Reihenfolge ist Absicht: erst die Linie verstehen, dann die Zahl sehen.

Darunter der Button:
> *Die nächsten 10 Jahre*

---

## Screen 4 — Der Rubikon

### Beat 1 — X-Achse verlängert sich *(500ms)*

Der Nutzer klickt. Die X-Achse fährt nach rechts — 10 neue Jahre öffnen sich. Der bestehende Chart schrumpft dadurch automatisch nach links zusammen. Die blaue Linie bleibt stehen, wo sie ist. Sie wird zur Grenze zwischen dem, was war, und dem, was kommt.

Der leere Zukunftsraum öffnet sich. Keine Linie, keine Prognose, keine Fantasie-Kurve. Nur Raum.

---

### Beat 2 — Symbole erscheinen *(300ms Pause nach Beat 1, dann fade in)*

Direkt an der blauen Linie, auf Höhe der Chartlinie:

- Links: ✅ — klein, grün
- Rechts: ❓ — klein, gedämpft grau

Kein Text. Keine Erklärung. Der Nutzer versteht es in unter einer Sekunde, auf jedem Gerät.

---

### Beat 3 — Ein Satz erscheint *(fade in)*

Unter dem Chart:

> *Die nächsten Schlagzeilen kennen wir nicht. Aber es wird wieder welche geben.*

---

### Beat 4 — Stille *(800ms)*

Nichts passiert. Der Nutzer sitzt mit dem leeren Raum und dem Satz. Kein Button, keine Ablenkung.

Das ist die psychologische Arbeit. Dieses kurze Aushalten ist der Kern der App.

---

### Beat 5 — Der Button erscheint *(fade in)*

> *Ich fange heute an.*

---

## Responsive-Regel: eine Anpassung, kein zweites Design

| Element | Desktop / 4K | Altes iPhone |
|---|---|---|
| Eventkarte | Groß, volle Breite im Content-Rahmen | Volle Breite, gleiche Hierarchie |
| Kartenwechsel-Animation | Schrumpft Richtung Chartpunkt | Gleich — vereinfacht falls nötig |
| Zukunftsraum | Mindestens halbe Chartbreite | Mindestens ein Drittel Chartbreite — **vor Go-Live testen** |
| ✅ ❓ | Direkt an der Linie, auf Chartlinie-Höhe | Unter dem Chart als Textkarte, falls zu eng |
| KPI-Karten | Verzögert, nebeneinander | Verzögert, untereinander |
| Stille Beat 4 | 800ms | 800ms — nicht kürzen |

---

## Was nicht gebaut wird

- Kein Prognosepfad rechts der Linie
- Kein „Meine Regeln festlegen"-Screen
- Keine Folklore, keine Zitate, keine Belehrung
- Keine Erklärung, was die blaue Linie bedeutet — ✅ ❓ reichen
- Kein zusätzlicher Text im Zukunftsraum

---

## Implementierungs-Notizen

| Punkt | Priorität | Notiz |
|---|---|---|
| Kartenwechsel-Animation (Beat A–C) | Hoch | Kern der psychologischen Wirkung — zuerst bauen |
| KPI-Karten mit Verzögerung (Screen 3) | Hoch | Erst Linie, dann Zahl |
| X-Achsen-Verlängerung (Screen 4 Beat 1) | Hoch | Zukunftsraum Mobile-Breite vor Go-Live testen |
| ✅ ❓ an blauer Linie | Mittel | Fallback: Textkarte unter Chart auf Mobile |
| Stille Beat 4 — 800ms | Fest | Nicht kürzen |
| `showScreen()` Transition | Mittel | Aktuell nur hidden-Toggle, kein Übergang |

