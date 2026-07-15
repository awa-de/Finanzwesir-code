# ARCHITEKTUR-ENTSCHEIDUNGS-PROTOKOLL: Der "Rucksack" (Context Object Pattern)

**Projekt:** Finanzwesir Chart Engine  
**Modul:** Core Architektur / Datenfluss  
**Status:** **GENEHMIGT / BEREIT ZUR UMSETZUNG**  
**Datum:** 19.01.2026  
**Autor:** Lead Architect (Gemini)  
**Version:** 2.0 (Das Zwiebel-Prinzip)

---

# The Context Object Pattern
Das ist der offizielle Terminus (u.a. definiert von Martin Fowler in "Patterns of Enterprise Application Architecture").
Wenn Sie es etwas spezifischer oder moderner ausdrücken wollen, gibt es je nach Fokus noch diese Varianten:

## 1. The Request-Scoped Context
Betonung: Der Rucksack gilt genau für einen Auftrag (einen Chart-Render-Zyklus) und wird danach weggeworfen. Das ist technisch sehr präzise.

### 2. Context Injection
Betonung: Der Mechanismus, wie der Rucksack in die Funktionen (Achsen, Tooltips) gelangt, ohne dass man ihn durch alle Zwischenschichten durchfädeln muss.

### 3. The Immutable Configuration Context
Betonung: Der Sicherheits-Aspekt (der Inhalt ist unveränderlich/eingefroren).

---


## 1. Executive Summary (Management Sicht)
*Stil: "Die Sendung mit der Maus"*

Stellt euch vor, unsere Chart-Engine ist wie eine große Küche, in der ein kompliziertes Gericht gekocht wird – zum Beispiel eine Hochzeitstorte (unser Chart).

Bisher lief das so: Der Chefkoch (die Strategie) hat laut in den Raum gerufen: "Wir machen Torte!". Aber der Konditor (die X-Achse) wusste nicht, ob es eine kleine Torte für zwei Personen oder eine riesige für 100 Gäste sein soll. Der Dekorateur (der Tooltip) wusste nicht, ob er "Alles Gute" auf Deutsch oder Englisch draufschreiben soll. Jeder musste ständig jeden fragen oder – noch schlimmer – einfach raten. Das führte oft dazu, dass die Torte zu breit für den Tisch war oder das falsche Datum draufstand.

**Unsere Lösung: Der Rucksack.**

Bevor es losgeht, packt der Chefkoch jetzt einen **Rucksack**. Da kommt alles rein, was wichtig ist:
* Ein Zettel: "Es ist eine Torte (Pie Chart)."
* Ein Kalender: "Die Daten sind monatlich."
* Ein Geldbeutel: "Wir rechnen in Euro."

Diesen Rucksack setzt er dem Chart auf den Rücken.
Jetzt läuft der Chart durch die Küche.
* Der Konditor (Achse) schaut in den Rucksack: "Aha, 25 Jahre Daten. Ich mache die Torte breit, aber ich schreibe nicht jedes Jahr drauf, sonst wird es zu voll."
* Der Dekorateur (Tooltip) schaut in den Rucksack: "Aha, Ranking-Modus. Ich schreibe den Namen der Zutat groß drauf."

**Der Clou dabei (Das Zwiebel-Prinzip):**
Manche Dinge ändern sich ständig, zum Beispiel wie viel Platz auf dem Tisch ist (Handy vs. Desktop). Diese Info wird nicht fest in den Rucksack genäht, sondern erst im allerletzten Moment als "Regenjacke" drübergezogen.
Wenn der Tisch wackelt (Tablet wird gedreht), tauschen wir nur die Regenjacke aus. Der Rucksack darunter bleibt sicher und trocken.

**Ergebnis:** Keiner muss mehr raten. Die Küche arbeitet schneller, macht weniger Fehler und die Torte passt immer perfekt auf den Tisch.

---

## 2. Technische Architektur (Deep Dive)
*Zielgruppe: Senior Entwickler & Wartungsteams*

### 2.1 Das Konzept: Context Object Pattern

Was wir umgangssprachlich "Den Rucksack" nennen, ist in der Softwarearchitektur formal als **Context Object Pattern** bekannt (auch *Request Scoped Context* oder *Payload Protocol* genannt).

**Industrie-Verbreitung:**
Dieses Pattern ist das Rückgrat moderner verteilter Systeme bei Tech-Giganten:
* **React (Meta):** Nutzt die `Context API`, um globale Daten (Theme, User) durch den Komponenten-Baum zu reichen, ohne "Prop Drilling" zu betreiben.
* **Go (Google):** Das `context` Paket ist in fast jedem Funktionsaufruf Pflicht, um Deadlines, Abbruchsignale und anfragebezogene Werte über API-Grenzen hinweg zu transportieren.
* **Express/Koa (Node.js):** Das `ctx` (Context) Objekt trägt den Zustand einer einzelnen HTTP-Anfrage durch alle Middleware-Schichten.

**Warum wir es adaptiert haben:**
Unsere vorherige Architektur litt unter **Impliziten Abhängigkeiten**. `SmartScales` versuchte den Chart-Typ zu erraten, indem es auf `config.type` schaute, oder erriet die Bildschirmgröße implizit. Dies führte zu "Heisenbugs" (Fehler, die verschwinden oder sich ändern, wenn man versucht, sie zu untersuchen, z.B. beim Resize).

### 2.2 Der Datenfluss: "Producer-Consumer Modell"

Die Architektur ist strikt unidirektional.

1. **Der Erzeuger (Layer 3 - Strategy):**
   * Die `ConcreteStrategy` (z.B. `BarChartStrategy`) analysiert die Roh-CSV-Daten.
   * Sie ruft `BaseChartStrategy._createFwContext(...)` auf, um die Daten zu validieren und zu versiegeln.
   * **Output:** Das `fwContext` Objekt (Der "Kern").

2. **Der Speicher (Layer 2 - Chart Configuration):**
   * Der Kontext wird in `options.plugins.fwContext` gespeichert.
   * Er ist **Immutable** (eingefroren). Niemand darf `currency` oder `rhythm` während des Lebenszyklus des Charts ändern.

3. **Der Verbraucher (Layer 4 - Smart Engines):**
   * **Router (`FwSmartScales`):** Liest den Kontext, um über die Achsendichte zu entscheiden (Matrix).
   * **Service (`FwSmartTooltips`):** Liest den Kontext, um über die Textformatierung zu entscheiden (Header/Body).

### 2.3 Das "Zwiebel-Modell" (Context Layering)

Um das "Responsive Problem" (Geräterotation) zu lösen, teilen wir den Kontext in zwei Schichten, die zur Laufzeit (JIT - Just In Time) zusammengeführt werden.

#### Schicht A: Der statische Kern (Immutable)
*Wird einmalig von der Strategie erstellt. Ändert sich nicht beim Resize.*

| Feld | Typ | Pflicht? | Beschreibung |
| :--- | :--- | :--- | :--- |
| **`chartType`** | `String` | ✅ JA | Identität ('bar', 'line', 'pie'). Löst Physik aus (Offset). |
| **`axisType`** | `String` | ✅ JA | Routing ('time', 'category', 'radial'). |
| **`rhythm`** | `String` | ✅ JA | Daten-Puls ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY'). |
| **`dataRange`** | `Object` | ✅ JA | `{min, max}` Zeitstempel. Definiert die Dauer. |
| **`viewMode`** | `String` | ⚠️ Default | Absicht ('history', 'ranking'). Standard: `'history'`. |
| **`valueMode`** | `String` | ⚠️ Default | Formatierung ('value', 'percent'). Standard: `'value'`. |
| **`currency`** | `String` | ⚠️ Default | Einheit ('EUR', 'USD'). Standard: `''` (keine Einheit). |
| **`referenceDate`**| `Number` | ❌ Nein | **Nur erforderlich** für `ranking` Modus (Tooltip Header). |

#### Schicht B: Die dynamische Schale (Flüchtig)
*Wird in jedem Frame von der Engine gemessen. Ändert sich beim Resize.*

| Feld | Typ | Herkunft | Beschreibung |
| :--- | :--- | :--- | :--- |
| **`isMobile`** | `Boolean` | `chart.width` | True wenn Breite < 450px. Löst Dichte-Matrix S aus. |
| **`width`** | `Number` | `chart.width` | Exakte Pixelbreite für Grenzprüfungen. |
| **`inputDevice`**| `String` | `chart.platform` | 'mouse' vs 'touch' (beeinflusst Tooltip-Positionierung). |

#### Die Hochzeit (Laufzeit-Ausführung)

Innerhalb von `FwSmartScales.getScalesConfig()`:

```javascript
// 1. Kern abrufen
const core = options.plugins.fwContext;

// 2. Schale messen
const isMobile = chart.width < 450;

// 3. Die Hochzeit (Temporären Scope erstellen)
const activeContext = { ...core, isMobile };

// 4. Logik ausführen
return _resolveAxisConfig(activeContext);
```

### 2.4 Governance: Standards & Fehlerbehandlung

Wir unterscheiden zwischen Integritätsfehlern (Absturz) und Darstellungs-Fallbacks (Graceful Degradation).

**Klasse 1: Die "Rote Linie" (Throw Error)**
Das Fehlen dieser Parameter macht den Chart faktisch falsch oder kaputt.

* `dataRange`: Ohne Start/Ende kann keine Achse gezeichnet werden.
* `rhythm`: Ohne Puls kann keine Dichte berechnet werden.
* `chartType`: Ohne Identität können keine Offset-Regeln angewendet werden.
* `axisType`: Der Router weiß nicht, wohin er leiten soll.

**Klasse 2: Das "Sicherheitsnetz" (Fallbacks)**
Das Fehlen dieser Parameter senkt die UX, bewahrt aber die Wahrheit.

* `currency` -> `''`: Besser keine Einheit als eine falsch geratene (z.B. EUR für USD Daten).
* `valueMode` -> `'value'`: Neutraler Fallback.
* `viewMode` -> `'history'`: Standardannahme.

### 2.5 Die Physik-Registry (Identitäts-Übersetzung)

Um zu vermeiden, dass physikalische Details in die Strategien sickern, pflegt BaseChartStrategy eine Physics Registry.

Input: `chartType: 'bar'`

Lookup: `REGISTRY['bar']` -> `{ offset: true, grid: { drawOnChartArea: true } }`

Output in den Context: Der Kontext erhält die physikalischen Eigenschaften.

**Vorteil:** SmartScales muss nicht wissen, was ein "Bar Chart" ist. Es prüft nur `ctx.offset === true`. Das macht das Hinzufügen neuer Chart-Typen (z.B. Waterfall) zu einer einzeiligen Konfigurationsänderung in der Basis-Strategie.

### 2.6 Der Chrome-Auftrag (verwandtes Pattern, kein Rucksack-Feld) — Zielvertrag

*Status: Konzeptionell verankert (DOC-02, 2026-07-15). Kein Ist-Code, keine neue `fwContext`-Eigenschaft.*

Die Strategie legt einen Wunschzettel in den Rucksack:
„eine Zeitspannen-Auswahl", „eine Sichtbarkeitslegende" oder „nichts davon".
Der Renderer baut daraus die fertige Bedienoberfläche.
Die Strategie bestellt keine Pill, keine Farbe und keinen Abstand.

Dieser „Chrome-Auftrag" ist ein eigenständiges, dem Rucksack strukturell verwandtes Pattern (dasselbe Context Object Pattern, siehe 2.1), aber **kein Feld des bestehenden `fwContext`**. Er transportiert DOM-Chrome-Bedarf (Headline, Range-Control, View-Control, Legende, Caption — siehe `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.11), nicht die Darstellungssemantik für Achsen/Tooltips, die weiterhin ausschließlich im bestehenden `fwContext` (KDR 9) lebt.

Technisch verbindlich für eine künftige Durchleitung (eigener Code-AP, nicht dieser Eintrag):

- Der Bedarf ist statisch/fachlich, kein dynamischer UI-State — der gerade aktive Button gehört dem Manager, nicht dem Auftrag.
- Der Renderer darf den Auftrag lesen, aber nicht in Strategie- oder Domain-Daten zurückschreiben.
- Ohne Auftrag gibt es kein optionales Chrome-Verhalten — kein globales Auto-Verhalten, kein stillschweigendes Erraten.
- Auf Resize ändert sich nur die dynamische Schale/Fallback-Darstellung (analog zur „Regenjacke" aus 2.3); der Auftrag selbst bleibt unverändert.
- Die aktuellen Canvas-/Tooltip-/Plugin-Verbraucher des bestehenden `fwContext` (KDR 9) bleiben unverändert gültig — dieser Vertrag ersetzt sie nicht und vermischt sich nicht mit ihnen.

---

## 3. Warum haben wir das gemacht? (Rationale)

1. **Determinismus (Via Negativa)**
   Wir haben das "Ratespiel" entfernt.
   * Vorher: Chart.js autoSkip entschied willkürlich, welche Labels ausgeblendet wurden.
   * Jetzt: Die Unified Density Matrix diktiert strikt: "Bei 25 Jahren auf dem Tablet, zeige alle 5 Jahre." Kein Zufall.

2. **Entkopplung (Separation of Concerns)**
   Wir haben "Kartographie" (Achse) vom "Reiseführer" (Tooltip) getrennt.
   * Vorher: Die Achsenformatierung beeinflusste die Tooltip-Formatierung.
   * Jetzt: SmartTooltips hat seine eigene Pipeline, die auf `_rawTimestamp` zugreift. Die Achse darf abkürzen ("Jan '24"), während der Tooltip höflich bleibt ("Januar 2024").

3. **Zukunftssicherheit (Open-Closed Principle)**
   Das System ist offen für Erweiterungen, aber geschlossen für Modifikationen.
   * Neuer Chart-Typ? -> In die Registry eintragen.
   * Neue Bildschirmgröße? -> Logik zur Dynamischen Schale hinzufügen.
   * Neuer Datentyp? -> Zum Statischen Kern hinzufügen.
   * Kein Refactoring der Core-Engines erforderlich.

**Abgezeichnet vom Architektur-Board. Strategie: "Fail Fast bei Inhalten, Degrade Gracefully bei der Darstellung."**