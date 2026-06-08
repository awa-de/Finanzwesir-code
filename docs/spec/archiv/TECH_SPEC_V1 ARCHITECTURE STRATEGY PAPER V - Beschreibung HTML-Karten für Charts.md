> **VERALTET (2026-02-17):** Dieses Dokument (V2.0) ist die älteste Version der HTML-Spec.
> Abgelöst durch:
> - `docs/spec/REDAKTEURS-HANDBUCH Chart-Integration.md`
> - `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md`

# 📄 TECHNICAL SPECIFICATION: HTML INTERFACE & CONFIGURATION

## Finanzwesir Chart Engine (V2.0)

**Kontext:** Definition der Schnittstelle zwischen CMS (Ghost) und Client-Side Engine.
**Zielgruppe:** Entwickler (Implementation Phase 1) & Redakteure.

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

## 3. CSV-Datenformat
Standardmäßig erwartet die Engine ein Zeitreihen-Format.

Trennzeichen: Semikolon (;).

Dezimal: Komma (,) oder Punkt (.).

Erste Spalte: Zwingend ein Datum (YYYY-MM-DD oder DD.MM.YYYY).

Erste Zeile: Header (Spaltennamen).

Beispiel:

Code-Snippet

Datum;MSCI World;Emerging Markets
2020-01-01;10,5;8,2
2021-01-01;12,1;7,9

3.1 Sonderfall: Datenformate für Tortendiagramme

Während Linien- und Balkendiagramme zwingend eine Datumsspalte erfordern, ist die Engine bei data-type="pie" flexibler (Polymorpher Parser).
Erlaubtes Format für Torten (Snapshot): Es ist kein Datum erforderlich. Eine einfache Liste reicht:

Code-Snippet

Kategorie; Anteil
Gold; 15%
Aktien; 80%
Cash; 5%

Die Engine erkennt automatisch, dass es sich um Kategorien handelt und validiert kein Datum.

## 4. Code-Templates (Reference Snippets)
### A. Linie (Komplexes Beispiel)
HTML

<div class="financial-chart-module" 
     data-type="line"
     data-title="Rendite-Vergleich (5 Jahre)" 
     data-csv="https://..."
     data-colors="World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
### B. Balken (Ranking Beispiel)
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
     data-colors="Gold: #DFC805, Aktien: #0071BF"
     style="height: 400px;">
</div>