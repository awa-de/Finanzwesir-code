> **HINWEIS (2026-02-17):** Dieses Dokument ist die historische Ursprungs-Spec.
> Es wurde durch zwei aktuellere Dokumente **abgelöst**:
> - **Redakteurs-Perspektive:** `docs/spec/REDAKTEURS-HANDBUCH Chart-Integration.md`
> - **Entwickler-Perspektive:** `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md`
>
> Bekannte Abweichungen zum aktuellen Code:
> - Titel-Fallback "Chart" existiert nicht (Code zeigt keinen Titel bei leerem `data-title`)
> - CSV-Dezimalformat: Nur Komma ist korrekt (Punkt wird als Tausender behandelt, nicht als Dezimal)
> - CSV-Datum: Nur ISO `YYYY-MM-DD` (DD.MM.YYYY wird abgelehnt)
> - CSV-URLs: Nur `https://www.finanzwesir.com` erlaubt (Domain-Whitelist, implementiert 2026-02-17 in CSVParser.parse())

# 📄 TECHNICAL SPECIFICATION: HTML INTERFACE & CONFIGURATION

## Finanzwesir Chart Engine (V3.0)

**Version:** 3.0 (The Pulse & Flow Era)
**Datum:** 05.01.2026
**Status:** Final Specification & Production Reference
**Kontext:** Definition der Schnittstelle zwischen CMS (Ghost) und Client-Side Engine.
**Zielgruppe:** Entwickler & Redakteure.

-----

## 1. Design-Philosophie: "Runtime Robustness"

Da der Redakteur manuell HTML-Snippets bearbeitet, muss die Engine maximale Fehlertoleranz ("Graceful Degradation") bieten.

* **Sicherheit:** Alle Eingaben (`data-*` Attribute) gelten als "Untrusted Input" und durchlaufen zur Laufzeit einen **Sanitizer** (Entfernung von XSS-Vektoren), bevor sie ins DOM gelangen.
* **Fehlertoleranz:**
    * Fehlerhafte Farben (z.B. `#ZZZ`) → Fallback auf CI-Standardpalette.
    * Fehlerhafte Optionen (z.B. `mode:unknown`) → Ignorieren / Fallback auf Default.
    * Fehlender Titel → Fallback auf generischen Titel ("Chart").

-----

## 2. Die HTML-Schnittstelle (Contract)

Jedes Chart wird durch ein `div`-Container-Element definiert. Die Konfiguration erfolgt ausschließlich über `data-` Attribute.

```html
<div class="financial-chart-module"
     data-type="line|bar|pie"
     data-title="Optionaler Titel"
     data-csv="URL_ZUR_DATEI.csv"
     data-colors="Asset1: #Hex, Asset2: #Hex"
     data-options="key:value, key2:value">
</div>

## 3. CSV-Datenformat (Strict Schema)
Die Engine nutzt einen strikten Parser ("Gatekeeper"). Das CSV-Format muss exakt den folgenden Regeln entsprechen, sonst wird der Import verweigert oder Werte werden falsch interpretiert.

* **Trennzeichen:** Semikolon (`;`).
* **Dezimaltrennzeichen:** Zwingend **Komma** (`,`).
    * ⚠️ **Achtung:** Punkte (`.`) werden als Tausender-Trennzeichen interpretiert und ersatzlos **entfernt**.
    * *Beispiel:* `10.5` (US-Format) wird vom Parser zu `105` (Hundertfünf) konvertiert. Korrekt ist `10,5`.
* **Erste Spalte (Datum):** Zwingend ISO-Format **`YYYY-MM-DD`** (z.B. `2024-12-31`).
    * ⚠️ **Achtung:** Deutsches Format (`DD.MM.YYYY`) oder US-Slashes (`MM/DD/YYYY`) führen zu einem sofortigen **Validation Error**.
* **Erste Zeile:** Header (Spaltennamen).
* **Einheiten & Währung:** Die Engine nutzt eine automatische **"Strip & Tag"** Erkennung.
    * Schreiben Sie Einheiten direkt in die Datenzellen (z.B. `10,5 %` oder `25,00 €`).
    * Der Parser erkennt das Symbol, speichert es als Metadatum (`unitKey`) und importiert den reinen Zahlenwert.

#### Beispiel (Korrekt):

Datum;MSCI World;Emerging Markets
2020-01-01;10,5 %;8,2 %
2021-01-01;12,1 %;7,9 %

### 3.1 Sonderfall: Datenformate für Tortendiagramme
Bei data-type="pie" entfällt die Datums-Pflicht (Parser-Option expectDate: false). Hier ist ein einfaches Kategorie-Wert-Format erlaubt. Die Regeln für Dezimaltrennzeichen (Komma) und Einheiten bleiben identisch.

#### Code-Snippet

Kategorie;Anteil
Gold;15,0 %
Aktien;80,0 %
Cash;5,0 %

4. Code-Templates (Reference Snippets)
A. Linie (Komplexes Beispiel)
HTML

<div class="financial-chart-module" 
     data-type="line"
     data-title="Rendite-Vergleich (5 Jahre)" 
     data-csv="https://..."
     data-colors="World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
B. Balken (Ranking Beispiel)
HTML

<div class="financial-chart-module" 
     data-type="bar"
     data-title="Jahres-Ranking"
     data-csv="https://..."
     data-colors="World: #0071BF"
     data-options="mode:ranking">
</div>
C. Kreis (Standard Beispiel)
HTML

<div class="financial-chart-module" 
     data-type="pie"
     data-title="Asset Allokation"
     data-csv="https://..."
     data-colors="Gold: #DFC805, Aktien: #0071BF">
</div>


Basierend auf Ihrer aktuellen Code-Basis (core und strategies) ist das hier der Status Quo aller erlaubten Eingaben.

### Die HTML-Schnittstelle (`<div ... >`)

Es gibt exakt **5** Attribute, die der Renderer ("Kellner") vom HTML liest und an die Engine ("Küche") weiterreicht. Alles andere wird ignoriert.

| HTML-Attribut | Zweck | Format / Syntax | Erlaubte Werte (Validierung) | Relevanz für Strategie |
| :--- | :--- | :--- | :--- | :--- |
| **`data-type`** | Wählt die Strategie | String (fest) | `line`, `bar`, `pie` | **Entscheidend.** Lädt die JS-Klasse. |
| **`data-title`** | Überschrift | String | Freitext (z.B. "Edelmetalle") | Renderer baut `<h3>`. Strategie ignoriert es meist. |
| **`data-csv`** | Datenquelle | Pfad | Relativer Pfad (z.B. `./data/xyz.csv`) | Engine lädt Daten. Parser verarbeitet sie. |
| **`data-colors`** | Farb-Zuweisung | String (Map) | `Key: #Hex, Key: #Hex` | **Gatekeeper-Pflicht!** Muss CI-Farben matchen. |
| **`data-options`** | Feinsteuerung | String (Map) | `key:value, key:value` | Siehe Detail-Tabelle unten. |

---

### Die "Black Box": Was darf in `data-options` stehen?

Das Attribut `data-options` ist der eigentliche "Konfigurations-Container". Hier herrscht aktuell die größte Varianz zwischen den Strategien.

Wir vereinheitlichen dies nun logisch in dieser Tabelle:

| Option Key | Beschreibung | Erlaubte Werte (Whitelist) | Line Chart | Bar Chart | Pie Chart |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`range`** | Zeit-Filter beim Start | `1y`, `3y`, `5y`, `10y`, `max` | ✅ Ja | ✅ Ja | ❌ (Ignoriert) |
| **`mode`** | Einheiten-Logik | `value` (Absolut), `percent` (Relativ), `return` (Rendite) | ✅ Ja | ✅ Ja | ❌ (Ignoriert*) |
| **`view`** | Initiale Ansicht | `history` (Zeit), `ranking` (Balken) | ❌ (Nutzt Buttons) | ✅ Ja | ❌ (Ignoriert) |
| **`benchmark`** | Vergleichslinie | Spaltenname (String) | ✅ Ja (fette Linie) | ❌ | ❌ |

*\*Anmerkung zu Pie Chart `mode`: Aktuell ignoriert PieChart diesen Wert komplett und verlässt sich nur auf CSV-Daten. Im neuen "Unified Resolver" würde PieChart hier z.B. nur `value` oder `percent` akzeptieren.*

---

### Analyse der "Unified Config"

Um das sauber zu standardisieren (wie bei Google/Amazon), müssen wir folgende Regel-Matrix für den Resolver erstellen:

1.  **`range`**: Ist global. Wenn eine Strategie keine Zeitachse hat (Pie), gibt sie einfach den vollen Datensatz zurück ("Graceful Degradation").
2.  **`benchmark`**: Ist Chart-spezifisch. Bar und Pie ignorieren diesen Key einfach (kein Fehler, einfach keine Auswirkung).
3.  **`mode`**: **Hier liegt der Kern der Vereinheitlichung.**
    * Jede Strategie bekommt eine **Mode-Whitelist**.
    * Line: `['value', 'percent', 'return']`
    * Bar: `['value', 'percent']`
    * Pie: `['value', 'percent']`
    * **Der Resolver:** Prüft input gegen Whitelist. Wenn nicht enthalten -> Fallback auf CSV-Unit.

### Strategisches Fazit:
Es gibt keine weiteren "versteckten" Inputs. Wir können das System auf diese 5 Attribute und die 4 Options-Keys beschränken und härten.
