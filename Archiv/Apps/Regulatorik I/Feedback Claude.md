---
zuletzt verändert am: 2026-04-25T10:24:30+02:00
Angelegt am: 2026-04-25T10:24:24+02:00
---
# Dashboard-Review: ETF-Regulatorik XIX

Bewertet nach Steven Krug (*Don't Make Me Think*), Edward Tufte (*Envisioning Information*) und FAANG-Usability-Prinzipien (progressive disclosure, information hierarchy, spatial proximity).

---

## 🔴 ROT — muss verbessert werden

### 1. Informationsarchitektur: Der Überblick kommt nach den Ergebnissen

Die Sektionsreihenfolge ist: Parameter → Gesamtschau (Chart + KPIs) → **Überblick** (Modell-Erklärung) → Sparphase → Entnahmephase.

Der Nutzer sieht Ergebnisse, *bevor* er weiß, was das Modell tut und was es *nicht* tut. Der Disclaimertext „Alle Modelle sind falsch..." erscheint als Nachgedanke – nach dem Chart, nach den großen Zahlen. Krug: Der Nutzer liest von oben nach unten. Er braucht die Leitplanken *vor* dem Interpretieren, nicht danach. Die Überblick-Box (mit Modellbeschreibung) muss nach dem Parameter-Block kommen, **vor** dem Chart.

### 2. Zwei `<h1>`-Elemente auf einer Seite

Zeilen 86 und 93: Zwei `<h1>`. Das ist ein Fehler in Semantik und Accessibility (Screen-Reader, SEO). Die kompakte Version in Zeile 86 (`ETF‑Regulatorik`) ist überflüssig – sie ist bereits Teil des Header-Badges. Das `<h1>` in Zeile 93 ist das eigentliche Seitentitel-Heading. Die erste Version muss zu `<p>` oder `<span>` degradiert werden.

### 3. Slider-Beschriftungen passen nicht zu den Ticks

Der Slider hat **7 Tick-Positionen** (0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0). Die `justify-between`-Beschriftungszeile darunter hat **5 Labels** (0, mild, spürbar, hart, drastisch). Die Labels stehen visuell zwischen den Ticks, nicht auf ihnen. Der Nutzer kann die Skala nicht lesen. Entweder 7 Labels (inklusive Prozentwerte) oder ein alternatives Design (z. B. nur Endpunkte + aktueller Wert prominenter anzeigen).

### 4. Slider zeigt keinen aktuellen Wert am Thumb

Der aktuelle Wert steht als Klein-Text unter dem Slider (`Aktuell: 0,5 %-Punkte weniger`). Auf Mobile ist das schwer zu sehen. Es gibt keine visuelle Verknüpfung zwischen Thumb-Position und Zahl. Standard-Pattern (Apple, Google, Meta): Wert-Bubble direkt über dem Thumb beim Ziehen. Minimalfix: Den aktuellen Wert prominent direkt rechts neben dem Slider-Label zeigen, nicht im Fließtext darunter.

### 5. Eingabefelder zeigen keine Grenzen an

Die Felder `saveReturn` (1–10 %) und `saveYears` (1–50 Jahre) haben unsichtbare Limits. Wenn ein Nutzer `0,5` für die Rendite eingibt, wird er lautlos auf `1` geklemmt. Es gibt kein Feedback außer dem `blur`-Event. Krug: Silent failures erzeugen Misstrauen. Mindestlösung: Bereichsangabe im Label oder als Placeholder (`1 – 50`). Besser: inline Validierungsmeldung beim Klemmen.

### 6. Anweisung „Links stellst du deine Annahmen ein" stimmt auf Mobile nicht

Im Überblick-Text steht: *„Links stellst du deine Annahmen ein."* Auf Mobile gibt es kein „links" – die Parameter-Section sitzt oben. Das bricht das mentale Modell des Nutzers auf dem Gerät, auf dem er am wahrscheinlichsten liest. „Oben" oder eine layout-agnostische Formulierung verwenden.

### 7. Redundanter Einführungstext (zwei Mal dasselbe)

Der Header-Text (Zeile 97–98) und die Überblick-Section (Zeile 361–363) sagen im Kern dasselbe: „Stelle Annahmen ein, dann siehst du Gesamtschau, dann Phasen." Das ist copy-paste-artige Wiederholung, die kognitiven Raum belegt ohne Mehrwert zu liefern. Einer der beiden Blöcke muss gestrichen werden.

---

## 🟡 GELB — sollte verbessert werden

### 8. Chart-Legende steht unter dem Chart

Die Legende erklärt die Kurvenfarben *nach* dem Chart. Tufte: Beschriftungen gehören so nah wie möglich an die Daten. Besser: Die Labels direkt an die Kurvenenden annotieren (Line-End-Labels) oder die Legende über den Chart setzen. Alternativ: In-Chart-Annotation bei Hover.

### 9. „Was dich das kostet"-Karte wiederholt den Slider-Wert

In der Sparphase-Sektion zeigt die 4. Karte (`tblDrag`) den Renditeverlust als Tabelleneintrag. Der Nutzer hat diesen Wert selbst eingestellt – er weiß ihn. Tufte: Datentinte mit Null-Information-Gehalt ist Chartjunk. Die Zeile kann gestrichen werden; die Karte sollte nur zeigen, **was das kostet** (Prozent + Euro), nicht was der Input war.

### 10. Initial-Zustand der Konsequenz-Box zeigt Gedankenstriche

Die Konsequenz-Box (Gesamtschau) zeigt vor dem ersten JS-Render: `— € / Monat weniger` und `Ohne Regulatorik wären — % mehr möglich gewesen.` Das wirkt kaputt. Die KPI-Karten unten zeigen sauber `0 €`. Entweder hier auch `0`-Werte initialisieren oder die Box erst rendern, wenn Werte vorliegen.

### 11. Jahres-/Monatsmix innerhalb einer Sektion

Die Entnahmephase-Sektion zeigt KPI-Karten in **Jahreswerten** (`Jährliche Auszahlung`), aber die Tabelle zeigt `Weniger pro Monat`. Die Konsequenz-Box (Gesamtschau) zeigt primär **Monatswerte**. Der Nutzer muss mental umrechnen, obwohl das die Maschine tun kann. Konsistenz wählen: Jahreswerte in der Entnahme-Sektion, Monatswerte in der Konsequenz-Box – und das in den Labels explizit machen.

### 12. Kein Reset-Button

Ein Nutzer, der experimentiell alle Werte verändert hat, muss die Seite neu laden, um die Defaults wiederzubekommen. Kleiner Button „Zurücksetzen" bei jedem Eingabeblock kostet wenig und verhindert Frustration.

### 13. Rendite-Eingabe: Scheinpräzision durch Dezimalstelle

Die Renditeeingabe erlaubt `6,0 %`, also eine Nachkommastelle. Das suggeriert, dass 6,0 % vs. 6,1 % einen relevanten Unterschied macht – bei 30-Jahres-Modellen mit konstanter Rate eine falsche Genauigkeitssuggestion. Gleichzeitig ist die Output-Rundung korrekt implementiert (`roundModel`). Erwäge Integer-Eingabe (ganzzahlig in Prozent) oder zumindest ein Hinweis, dass die Nachkommastelle wenig Effekt hat.

### 14. Slider bei Wert 0: Dashboard zeigt überall 0

Wenn der Nutzer beide Slider auf 0 zieht, zeigen alle Differenz-KPIs `0 €` und `0,0 %`. Das sieht kaputt aus. Ein kurzer kontextueller Hinweis bei Wert 0 (`„Bei 0 %-Punkten gibt es keinen Verlust – bewege den Regler, um Szenarien zu sehen."`) wäre klarer als leere Zahlen.

### 15. Die 4-Spalten-KPI-Cards der Sparphase brechen auf mittleren Screens

Bei `md:grid-cols-2 xl:grid-cols-4` gibt es eine Lücke: auf Screens zwischen 768 px und 1279 px (Tablets und kleine Laptops) wird 2-spaltig gezeigt. Die Karten haben sehr unterschiedliche Inhaltshöhen (einfache Zahl vs. Tabelle). Das führt zu visuell unruhigen Zeilen. Minimalfix: `items-start` auf den Grid-Container setzen, damit die Karten nicht strecken.

---

## 🟢 GRÜN — Geschmacksfrage

### 16. Farbwahl: Pink/Lila für Verluste statt Rot

`danger: '#a12c7b'` ist ein Pink-Violett, kein konventionelles Rot. Finanzielle Verluste werden kulturell mit Rot assoziiert (Tufte: Konventionen nutzen, wenn sie helfen). Der Bruch ist bewusst und konsistent mit dem Gesamtfarbsystem – aber manche Nutzer werden es als weniger alarmierend wahrnehmen als beabsichtigt.

### 17. Gerundete Ecken (`rounded-3xl`)

Die sehr stark abgerundeten Sektionskarten passen zum „warmen" Editorial-Look. Für ein Finanzthema würden manche Designer schärfere Kanten bevorzugen (seriöser, bankenhafter). Reine Geschmacksfrage.

### 18. Eyebrow-Labels in Versalien mit Letter-Spacing

`PARAMETER`, `ANSPARPHASE`, `GESAMTSCHAU` usw. als Micro-Labels sind ein Magazine-Layout-Pattern. Funktioniert gut als visuelle Navigationshilfe. Alternative wäre, darauf zu verzichten und mehr auf die Heading-Hierarchie zu setzen. Geschmack.

### 19. Satoshi als Schriftart

Gute Wahl: lesbar, modern, mit Tabular-Numerals-Support. Alternativ wäre ein system-font-stack ausreichend gewesen und hätte den Fontshare-Request gespart. Kein Problem, nur ein Trade-off.

### 20. SVG-Icon im Header-Badge

Das kleine Chart-Icon ist dekorativ und fügt keinen Informationswert hinzu. Tufte würde ihn streichen. Im redaktionellen Kontext (Ghost-Artikel) ist er aber ein akzeptabler visueller Anker. Geschmack.

---

## Priorisierungs-Kurzfassung

| Priorität | Problem | Aufwand |
| --- | --- | --- |
| 🔴 hoch | Überblick-Section vor Chart verschieben | minimal |
| 🔴 hoch | Zwei `<h1>` → eines entfernen | trivial |
| 🔴 hoch | Slider-Labels zu Tick-Positionen ausrichten | klein |
| 🔴 hoch | „Links" → layout-agnostisch formulieren | trivial |
| 🔴 mittel | Slider-Wert am Thumb sichtbar machen | mittel |
| 🔴 mittel | Eingabe-Limits anzeigen + Silent-Clamp kommunizieren | mittel |
| 🟡 hoch | Chart-Legende über/an den Chart | klein |
| 🟡 hoch | Redundante `tblDrag`-Zeile streichen | trivial |
| 🟡 mittel | Jahres/Monatsmix konsistent machen | mittel |
| 🟡 niedrig | Reset-Button hinzufügen | klein |

---

## Nachtrag: Dashboard ist in einen Artikel eingebettet

**Hinweis:** Das Dashboard steht nicht für sich alleine. Es ist Teil eines Artikels auf Ghost.io – es gibt Fließtext davor und danach. Der Artikel übernimmt die Kontextarbeit: Modell-Erklärung, Einordnung, Herleitung. Das eröffnet drei Ebenen, auf denen Erklärungstext *im Dashboard selbst* gekürzt werden kann.

### Ebene 1 – Ganze Sektion streichen

Die „Überblick"-Sektion (Modell-Erklärung, „Alle Modelle sind falsch...") kann komplett entfallen. Das löst gleichzeitig das strukturelle Problem aus dem Review oben: Der Überblick sitzt nicht mehr zwischen den Ergebnissen, weil er im Artikel steht – vor dem Dashboard.

### Ebene 2 – Statische Unter-Texte unter KPI-Karten streichen

Jede Karte hat einen erklärenden Satz darunter, z. B. *„So würde sich dein Depot entwickeln, wenn die Regeln unverändert bleiben."* Das ist Kontext, den der Artikel liefert. Die Karten können auf Label + Zahl reduziert werden. Das Dashboard wird sofort luftiger.

### Ebene 3 – Einleitungstext im Parameter-Block kürzen

Der Satz *„Stelle zuerst deine Annahmen ein. Danach siehst du..."* fällt weg – der Artikel hat das bereits erklärt. Der Nutzer sieht sofort die Felder und weiß, was zu tun ist (Krug: self-evident UI).

### Was bleibt zwingend drin

- Die **dynamischen Slider-Kontexte** („Was konkret dahintersteckt") – die sind interaktiv und nicht im Artikel replizierbar.
- Die **dynamischen Verlust-Texte** unter den KPIs (`kpiSaveLoss`, `drawPenaltyText`) – die zeigen berechnete Werte.
- Den **Disclaimer-Kleinsttext** in der Konsequenz-Box (*„Basis: maximal mögliche Monatsrente..."*) – der ist kurz und erklärt eine Rechengröße, nicht das Modell.

### Hauptrisiko

Nutzer, die direkt auf das Dashboard verlinkt landen (Bookmark, Share, Social), haben keinen Artikel-Kontext. Wenn das eine reale Nutzungsform ist, sollte mindestens ein einziger kompakter Satz im Dashboard-Header erhalten bleiben. Wenn das Dashboard ausschließlich embedded im Artikel lebt, kann auf allen drei Ebenen bedenkenlos gekürzt werden.
