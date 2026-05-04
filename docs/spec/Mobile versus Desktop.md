## Charts
Hier ist die exakte Aufstellung ("The Truth Table") basierend auf dem Code, den wir in den Paketen 1, 2 und 3 gerade finalisiert haben.

Wir unterscheiden zwischen **Canvas-Elementen** (vom JavaScript `FwLayoutRules` gesteuert) und **DOM-UI-Elementen** (vom CSS in `FwRenderer` gesteuert).

###Die Pixel-Tabelle (Status Quo V4.1.1 / V5.2.0)| Element | Zone S (Mobile) | Zone M (Tablet/Hybrid) | Zone L (Desktop) | Wo definiert? |
| --- | --- | --- | --- | --- |
| **Breite (Viewport)** | **< 450px** | **450px – 900px** | **> 900px** | `FwLayoutRules.js` |
|  |  |  |  |  |
| **DATEN (Canvas)** |  |  |  |  |
| **X-Achse (Datum)** | **11px** | **12px** | **12px** | `FwLayoutRules` |
| **Y-Achse (Werte)** | **11px** | **12px** | **12px** | `FwLayoutRules` |
| **Tooltips (Hover)** | **13px** | **13px** | **13px** | `FwRenderer` (JS) |
|  |  |  |  |  |
| **UI (HTML/CSS)** |  |  |  |  |
| **Buttons (Toolbar)** | **13px** | **13px** | **13px** | `FwRenderer` (CSS) |
| **Legende (Text)** | **13px** | **13px** | **13px** | `FwRenderer` (CSS) |
| **Chart Titel** | **20px** | **20px** | **20px** | `FwRenderer` (CSS) |
| **Popover (Drilldown)** | **14px** | **14px** | **14px** | `FwRenderer` (CSS) |

---

###Analyse der HierarchieDiese Werte bestätigen exakt Ihre Anforderung der **visuellen Hierarchie** (Chart = Bildunterschrift):

1. **Level 1: Titel (20px)**
* Der klare "Boss". Er ist deutlich größer als der Fließtext eines Artikels (meist 16-18px). Das ist korrekt, da es eine Überschrift ist.


2. **Level 2: Interaktion (13px - 14px)**
* Buttons, Legenden und Popovers.
* Sie liegen knapp unter dem Fließtext-Niveau, sind aber groß genug für Finger (Touch) und Maus.
* **Wichtig:** In Zone S (< 450px) vergrößern wir das *Padding* (die Klickfläche) der Buttons per CSS, aber wir lassen die Schrift bei 13px, damit das Label "Rendite" nicht den Button sprengt.


3. **Level 3: Daten/Achsen (11px - 12px)**
* Die "Metadaten".
* Auf Mobile (Zone S) gehen wir auf **11px** runter. Das ist die physikalische Untergrenze für Lesbarkeit, aber notwendig, um die Achsenbeschriftung (z.B. "Jan '24") unterzubringen, ohne dass sie sich überlappt.
* Ab Zone M gönnen wir uns **12px** (entspricht Tailwind `text-xs`), was der Standard für Fußnoten ist.



###ZusammenfassungWir haben eine **sehr stabile, konservative Skalierung**:

* Wir "springen" nur an einer Stelle: Bei **450px**.
* Darunter (Handy hochkant) wird die Achse 1px kleiner (11px) und das Layout stapelt sich.
* Darüber (Tablet/Desktop) ist alles einheitlich 12px/13px.

Das System ist robust und wird nicht "explodieren".