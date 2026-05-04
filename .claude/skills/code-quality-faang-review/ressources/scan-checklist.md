# Scan-Checkliste — FAANG Review

> Wird bei jedem Review geladen. Jeden Punkt explizit prüfen.
> Ergebnis dokumentieren — auch "geprüft, kein Befund" ist ein Ergebnis.

---

## Schicht 2 — Universelle Prinzipien

```
□ P1 — Positional Arrays?
      Daten, bei denen die Position des Wertes bedeutungstragend ist?
      → Umbauen zu benanntem Objekt / JSON

□ P1 — Mehr als 1 if einer Kategorie?
      Zwei oder mehr if/else-if für denselben Typ (Intervall, Modus, Farbe...)?
      → Umbauen zu Lookup Table / Konfigurationsobjekt

□ P1 — Mehr als 2 Positional Arguments in einer Funktion?
      → Umbauen zu Options-Objekt

□ P1 — Magic Numbers / Magic Strings?
      Hartcodierte Zahlen oder Strings ohne benannte Konstante?
      → Benannte Konstante einführen

□ P1 — Datenübergabe zwischen Modulen via Array?
      → meta-Rucksack (benanntes Objekt)

□ P2 — Erweiterbarkeit?
      Lackmust-Test: "Muss ich Logik anfassen, um X hinzuzufügen?"
      → JA = Konfigurationstabelle fehlt

□ P3 — Mehrere Verantwortungen in einer Funktion?
      → Aufteilen

□ P3 — Funktionsname beschreibt WIE statt WAS?
      → Umbenennen

□ P4 — Stilles Scheitern?
      return null, undefined, leeres Array bei unbekanntem Input?
      → throw new Error(`Unknown X: "${value}"`)

□ P4 — Leerer oder inhaltsloser catch-Block?
      → Strukturiertes Logging + Fehler weiterwerfen oder behandeln

□ P5 — eval() oder innerHTML mit variablem Inhalt?
      → Sofort melden, nicht umbauen ohne Rückfrage

□ P5 — Input-Validierung tief im Aufrufstack statt am Einstiegspunkt?
      → Validierung nach oben verschieben
```

---

## Schicht 3 — Projektspezifisch (fw-chart-engine)

```
□ Tabu-Zone angefasst ohne Rückfrage?
      CSVParser.js, sanitize()-Methode, Layer-Grenzen

□ Bindende Reihenfolge verschoben?
      FwTheme.init() vor new FwRenderer()?
      Chart.js vor Chart-Engine geladen?

□ Neues Parallel-Pattern statt etabliertem Pattern eingeführt?
      if/else statt PERIOD_TABLE_M / SNAPSHOT_TABLES?
      Neue Anchor-Methode statt _anchorByUnit()?
      Array statt meta-Rucksack für Modul-Kommunikation?

□ Hex-Wert außerhalb der Wahrheitsquelle eingeführt?
      Kein Hex außerhalb screen.css :root und FwTheme.js

□ Explizites Verbot umgangen?
      contain: layout / async statt defer / Bundler /
      Tree-Shaking / innerHTML / DOMPurify
```

---

## Abschluss-Statement (Pflicht)

Nach jedem Review dieses Statement ausfüllen:

```
Review abgeschlossen.
Geprüfte Dateien: [Liste]
Befunde: [Anzahl Anti-Patterns] / Alle Punkte sauber
Offene Rückfragen: [Ja → Anti-Pattern-Format / Nein]
Freigabe für Abschluss-Ritual: [Ja / Nein — warte auf Antwort zu Rückfrage X]
```
