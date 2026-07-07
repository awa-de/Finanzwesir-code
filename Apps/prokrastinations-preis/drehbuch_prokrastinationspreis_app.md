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

> **Amtlicher Hinweis (AP-prokrast-10, 2026-07-07):** Der folgende Einstiegs-Ablauf (Zuerst-Satz → Dann-Chart → Dann-KPI) wurde durch die finale Masterfaden-Entscheidung aus AP-prokrast-10b/10d abgelöst und ist **nicht mehr aktives Soll**. Der real gebaute und freigegebene Endzustand steht in `APP_SPEC.md` §16.1b. Dieser Ablauf bleibt als historische Dramaturgie-Vorlage stehen, nicht als Bauauftrag.

### HISTORISCHER_STAND — NICHT AKTUELLER SOLLSTAND

Status: HISTORISCH / INAKTIV / DURCH SPÄTEREN AP ERSETZT
Gültigkeit: NICHT MEHR AKTUELL
Darf als Implementierungsauftrag verwendet werden: NEIN
Darf als QA-Soll verwendet werden: NEIN
Darf als offene Aufgabe interpretiert werden: NEIN
Zweck dieses Blocks: Forensik / Entscheidungsverlauf / Nachvollziehbarkeit

### Einstieg (historisch — Text→Chart→KPI-Timing-Reveal)

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

Dieser Ablauf war zunächst technisch als Text→Chart→KPI-Timing-Reveal umgesetzt (AP-prokrast-10b, erster Durchgang), wurde aber nach Nutzerfeedback verworfen — er fühlte sich wie ein Screen-Neustart an, nicht wie eine Fortsetzung der Zeitreise. Dieser Block ist kein aktueller Auftrag und kein gültiger Sollstand.

Ersetzt durch: AKTUELLER_SOLLSTAND unten.

### AKTUELLER_SOLLSTAND — GÜLTIGER ENDSTAND (Kontinuitäts-Reveal, Variante B++, AP-prokrast-10a–10d ✅ 2026-07-07)

Status: AKTIV / ABGENOMMEN / GÜLTIG
Gültigkeit: AKTUELLER SOLLSTAND
Darf als Implementierungsauftrag verwendet werden: JA, falls ein späterer AP darauf Bezug nimmt
Darf als QA-Soll verwendet werden: JA
Darf als offene Aufgabe interpretiert werden: NEIN
Zweck dieses Blocks: gültige Produkt-/Spec-/QA-Wahrheit

Screen 2 endet mit der letzten Station der Zeitreise. Klick auf „Ergebnis ansehen" führt weiter nach Screen 3. Screen 3 wirkt beim Eintritt wie ein Anschluss an Screen 2, nicht wie ein Neustart.

Chart und Ergebnislinie sind sofort, vollständig und still sichtbar — kein Fade-in, kein Leerframe.

Darunter erscheint zunächst dieselbe Zeile, die zuletzt auf Screen 2 stand: *Station X von Y · Bekannt bis Z* (Screen-3-lokale Bridge, keine Verschiebung des Screen-2-Elements). Diese Zeile hält 800ms die Kontinuität zu Screen 2.

Danach verdichten sich KPI-Karten (Eingezahlt / Depotwert heute / Gewinn-Verlust) und der Disclaimer per 800ms-Fade zum Ergebnis.

Reduced Motion: kein Zwischenschritt — KPI-Karten und Disclaimer stehen sofort im Endzustand, die Bridge-Zeile wird nie sichtbar.

Verbindlicher Screen-3-Text (unverändert, `APP_SPEC.md` §16.2):
> *Jetzt erst sieht es einfach aus.*
> *Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.*

Details/Herleitung: `APP_SPEC.md` §16.1b, `docs/steering/patches/AP-prokrast-10a_*` bis `AP-prokrast-10d_*`.

---

## Screen 4 — Der Rubikon

> **Amtlicher Hinweis (AP-prokrast-04a, 2026-07-03):** Die folgende Beat-Choreografie (Beat 1–3, teilweise Beat 5) wurde durch die finale Masterfaden-Entscheidung aus AP-prokrast-03g/03h/03h2 abgelöst und ist **nicht mehr aktives Soll**. Der real gebaute und freigegebene Endzustand steht in `APP_SPEC.md` §16.1a. Diese Beats bleiben als historische Dramaturgie-Vorlage stehen, nicht als Bauauftrag. Details je Beat siehe Anmerkungen unten.

### Beat 1 — X-Achse verlängert sich *(500ms)* — **abgelöst, nicht gebaut**

> Root Cause (AP-prokrast-03g, am Chart.js-4.5.0-Quellcode verifiziert): Chart.js animiert Skalen-Grenzen strukturell nicht — nur Datensatz-Elemente durchlaufen den Animator. Eine smoothe X-Achsen-Verlängerung ist mit der Chart-Engine nicht erreichbar. Masterfaden-Entscheidung (AP-prokrast-03h): kein Morph, keine Achsenanimation, keine C2-Staffelung. Screen 4 zeigt den finalen Rubikon-Zustand stattdessen sofort, stehend.

Der Nutzer klickt. Die X-Achse fährt nach rechts — 10 neue Jahre öffnen sich. Der bestehende Chart schrumpft dadurch automatisch nach links zusammen. Die blaue Linie bleibt stehen, wo sie ist. Sie wird zur Grenze zwischen dem, was war, und dem, was kommt.

Der leere Zukunftsraum öffnet sich. Keine Linie, keine Prognose, keine Fantasie-Kurve. Nur Raum.

---

### Beat 2 — Symbole erscheinen *(300ms Pause nach Beat 1, dann fade in)* — **gesetzt: visueller Chart-Marker (AP-prokrast-06b, 2026-07-03)**

> Status: Dieses Beat wurde in der AP-prokrast-03-Kette weder gebaut noch explizit verworfen. AP-prokrast-04a bis AP-prokrast-06a dokumentierten die ✅/❓-Symbolik durchgängig als offene, ungeklärte Produktentscheidung (AP-06a: Status GELB, Empfehlung „streichen"). Mit AP-prokrast-06b hat Albert diese Frage bindend entschieden — Korrektur durch bindende Nutzerentscheidung nach AP-06a-GELB, keine Wiederherstellung eines vorher schon final entschiedenen, dann verlorenen Fakts: Die Symbole bleiben, aber ausschließlich als rein visueller, nicht-interaktiver Canvas-Marker im Chart, gebaut über `FwChartTextPlugin.js` — ohne DOM-Präsenz und ohne A11y-Anspruch.

Direkt an der blauen Rubikon-Linie:

- Links der Linie: ✅ — klein
- Rechts der Linie: ❓ — klein

Die Symbole sind reine Canvas-Chart-Marker (kein DOM-Knoten, keine aria-Semantik, kein Fokus, keine Live-Region). Die semantische Hauptaussage von Screen 4 trägt weiterhin ausschließlich der DOM-Haupttext (`APP_SPEC.md` §16.1a); die Symbole ersetzen ihn nicht und tragen keine eigene Erklärungslast. Positionierung links/rechts der Linie muss auf allen Breakpoints S, M und L gewährleistet sein.

---

### Beat 3 — Ein Satz erscheint *(fade in)* — **Textposition abgelöst**

> AP-prokrast-03h2 (Masterfaden-Entscheidung nach Alberts Feedback): Der Text steht nicht unter dem Chart, sondern als DOM-Overlay im rechten, leeren Zukunftsraum des Charts selbst (→ `APP_SPEC.md` §16.1a). Semantisch bleibt es echter DOM-Text (A11y-Pflicht), nur die visuelle Position wurde verändert.

Unter dem Chart:

> *Die nächsten Schlagzeilen kennen wir nicht. Aber es wird wieder welche geben.*

---

### Beat 4 — Stille *(800ms)* — Grundidee erhalten, Timing erweitert

Nichts passiert. Der Nutzer sitzt mit dem leeren Raum und dem Satz. Kein Button, keine Ablenkung.

Das ist die psychologische Arbeit. Dieses kurze Aushalten ist der Kern der App.

> Im gebauten Endzustand (`APP_SPEC.md` §16.1a) gibt es **zwei** 800ms-Stille-Momente statt einem: vor dem Text-Reveal und vor dem CTA-Reveal. Die Grundidee (Stille als psychologische Arbeit) ist unverändert, nur die Zahl der Beats.

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
| ✅ ❓ | Canvas-Chart-Marker links/rechts der blauen Rubikon-Linie (`FwChartTextPlugin.js`) | Gleich — Positionierung muss auch auf kleinen Screens links/rechts der Linie gewährleistet sein, kein DOM-Fallback |
| KPI-Karten | Verzögert, nebeneinander | Verzögert, untereinander |
| Stille Beat 4 | 800ms | 800ms — nicht kürzen |

---

## Was nicht gebaut wird

- Kein Prognosepfad rechts der Linie
- Kein „Meine Regeln festlegen"-Screen
- Keine Folklore, keine Zitate, keine Belehrung
- Keine Erklärung, was die blaue Linie bedeutet — ✅ ❓ reichen
- ~~Kein zusätzlicher Text im Zukunftsraum~~ — **überholt:** Der gebaute Endzustand platziert den Rubikon-Haupttext bewusst als DOM-Overlay im rechten Zukunftsraum (`APP_SPEC.md` §16.1a, AP-prokrast-03h2). Diese Regel galt für die ursprüngliche Beat-3-Variante (Text unter dem Chart) und ist durch die Textposition-Entscheidung überholt.

---

## Implementierungs-Notizen

| Punkt | Priorität | Notiz |
|---|---|---|
| Kartenwechsel-Animation (Beat A–C) | Hoch | Kern der psychologischen Wirkung — zuerst bauen |
| KPI-Karten mit Verzögerung (Screen 3) | gebaut (AP-prokrast-10a–10d ✅ 2026-07-07) | überholt: „Erst Linie, dann Zahl" galt für den verworfenen Text→Chart→KPI-Timing-Reveal. Aktiver Sollstand: Chart+Linie sofort/still, dann Bridge-Zeile (800ms), dann KPI+Disclaimer per 800ms-Fade — Details siehe Screen-3-Abschnitt oben / `APP_SPEC.md` §16.1b |
| ~~X-Achsen-Verlängerung (Screen 4 Beat 1)~~ | — | überholt: abgelöst durch AP-prokrast-03h (kein Morph, keine Achsenanimation) — Zukunftsraum steht sofort, kein separater Mobile-Testschritt für die Animation nötig |
| ✅ ❓ an blauer Linie | gebaut und abgenommen (AP-prokrast-07a–07d ✅ 2026-07-06) | überholt: „Bau noch offen" galt bis AP-prokrast-06b. Aktiver Sollstand: Canvas-Marker via `FwChartTextPlugin.js`, links/rechts der Linie, S/M/L geprüft, TC-F05 für aktuellen Fallback-Font-Stand bestanden, rein visuell — kein DOM, kein A11y-Anspruch (siehe Beat 2). Neumessung nach CI-Font-/Theme-Bridge-Anbindung ist Folgeauftrag von DS-012/DS-013, kein neuer Rubikon-Bau-AP |
| Stille Beat 4 — 800ms | Fest | Nicht kürzen |
| `showScreen()` Transition | Mittel | Aktuell nur hidden-Toggle, kein Übergang |

