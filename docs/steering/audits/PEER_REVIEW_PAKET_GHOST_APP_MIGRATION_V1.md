# Peer-Review-Paket: Ghost-App-Migration auf Chart-Blaupause

**Review-Typ:** Architektur- und Migrations-Readiness-Review vor Schreibarbeit  
**Review-Modus:** read-only; keine Datei ändern, keinen Code schreiben, keinen Commit erzeugen.  
**Ziel:** Go/No-Go dafür, `prokrastinations-preis` als erste A2-CJ-App (CSV + JSON) auf Basis der migrierten Chart-App in Ghost zu überführen.

## 1. Auftrag an den Reviewer

Prüfe die fachliche Leitquelle gegen die bindenden Spezifikationen und den realen aktuellen Code. Prüfe nicht gegen Vermutungen, Chroniken oder bloße Protokollbehauptungen.

**Leitquelle vollständig lesen:**

```text
docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md
```

Die Leitquelle beschreibt einen Sollstand. Sie überschreibt keine bindende Quelle. Bei Widerspruch gilt die Quellenhierarchie in Abschnitt 2.

## 2. Quellenhierarchie und Pflichtquellen

### Bindend

1. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`
2. `docs/spec/Der Rucksack (Context Object Pattern).md`
3. `docs/steering/audits/SECURITY-BASELINE.md`
4. `docs/spec/APP-INTERFACE.md`

### Reale technische Wahrheit

5. `Theme/assets/js/fw-chart-engine/data/CSVParser.js`
6. `Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js`
7. `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
8. `Theme/assets/js/fw-chart-engine/index.js`
9. `Theme/default.hbs`
10. `Apps/prokrastinations-preis/app.js`
11. `Apps/prokrastinations-preis/app.css`
12. `Apps/prokrastinations-preis/app.test.html`
13. `Apps/prokrastinations-preis/APP_SPEC.md`
14. `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md`
15. `Apps/prokrastinations-preis/config/stations.de.json`

### Betrieb und Veröffentlichung

16. `docs/editorial/CSV-APP-DATEN-WORKFLOW.md`
17. `content/files/app-data/csv-validator.mjs`
18. `content/files/app-data/pruefe-csv.bat`
19. `docs/steering/theme-build/GHOST-LOKALBETRIEB.md`

**Stop-Regel:** Ist eine bindende oder reale Pflichtquelle nicht lesbar, nenne das als Blocker. Nicht durch Annahmen ersetzen.

## 3. Prüffragen

### A. Ein technischer App-Stamm

1. Ist die Chart-Migration tatsächlich die richtige Blaupause für die App-Migration: Vault → Manager → Strategie → request-scoped Context → Renderer/Plugins?
2. Bleibt die ChartEngine in der Prokrastinations-App alleiniger Renderer für alle Chartflächen (`renderFromData()`), ohne zweiten Canvas- oder Render-Stack?
3. Bleiben die bestehenden zwei Ghost-Card-Adapter aus Bestandsschutz bestehen, ohne daraus zwei technische Architekturen abzuleiten?

### B. Daten- und Sicherheitsvertrag

4. Werden CSV und JSON in Cards ausschließlich als kanonische Dateinamen behandelt und zentral zu `/content/files/app-data/<dateiname>` aufgelöst?
5. Widerspricht diese Dateinamenregel einer aktiven bindenden Quelle, insbesondere `APP-INTERFACE.md`? Falls ja: präzise als erforderliches Vertragsdelta markieren, nicht still auflösen.
6. Bleibt der CSV-Produktivweg unverändert: Offline-Prüfer → lokaler Ghost-Content beziehungsweise FTP → statische Auslieferung → erneute Laufzeitprüfung?
7. Ist `JSONParser` als Schwester von `CSVParser` geschnitten: gleiche API-Form, gleiches URL-Gate, gleicher Fetch-/HTTP-/Fehlerpfad, fetch-freier Textkern, eingefrorener Vault und entsprechende Tests?
8. Bleibt das JSON-Schema app-spezifisch (`options.validator`), ohne Universal-Schema, Ersatzdaten oder stilles Korrigieren?
9. Haben beide Parser, beide Vaults und die Kartenwerte eine eindeutige Fehler-Todeszone: unzulässiger Name, 404, fehlerhafte Syntax, Schemafehler, Veränderungsversuch?

### C. Rucksack und Zuständigkeiten

10. Ist der neue AppContext klar vom Chart-`fwContext` getrennt?
11. Wird der statische AppContext-Kern aus Vaults und Nutzerwerten tief eingefroren, während Screen-, Fokus- und Animationszustand außerhalb im Controller bleibt?
12. Ist der Datenfluss strikt unidirektional? Keine Strategie, kein Renderer und kein Plugin darf in einen Vault oder Context zurückschreiben.
13. Liegt Fachlogik in `MarketTimeStrategy`/App-Modul und Chartdarstellung in der ChartEngine, ihren Strategien und Plugins?

### D. Theme, Tailwind und Ghost

14. Nutzt die App Theme-Tokens und Tailwind für DOM-Layout; bleibt eigenes CSS auf echte Animationen und Chart-Overlays begrenzt?
15. Erfasst der Tailwind-Build die künftigen Theme-App-Module? Führt die Migration keine CDN-Abhängigkeit ein?
16. Ist der Theme-Einstieg eindeutig: kein Script pro Ghost-Card, keine dynamische Script-URL aus `data-fw-app`, kein Doppelstart?
17. Werden Theme-Änderungen im Quell-Theme gebaut und nur über Ghost Admin ausgerollt, nie durch Direktkopie in den aktiven Theme-Ordner?

### E. Nachweis- und Migrationsreife

18. Deckt der aktuelle Testbestand mindestens unbekannten Slug, zwei App-Container, ungültige Optionen, CSV-Fehler, JSON-Fehler, Error-State ohne Stacktrace, A11y und Reduced Motion ab?
19. Sind die vorhandenen Stationsdaten als einzige produktive JSON-Quelle überführbar, ohne einen zweiten Wahrheitsort im App-Ordner zu behalten?
20. Fehlt eine Architekturentscheidung, ein Test, eine Quellendokumentation oder ein produktiver Betriebsnachweis, ohne den die Umsetzung riskant wäre?

## 4. Beweisregeln

- Jeder Finding enthält mindestens eine exakte Referenz `Pfad:Zeile`.
- Zu jedem Finding: Ist-Befund, verletzte Sollquelle, Auswirkung und kleinste erforderliche Korrektur.
- Fehlende Nachweise gelten nicht als grün. Sie sind mindestens ein offener Punkt; bei Sicherheits-, Daten- oder Render-Invarianten ein No-Go-Finding.
- Chroniken dürfen nur zur Orientierung dienen. Sie sind kein Beweis gegen aktuellen Code.
- Keine hypothetischen Verbesserungen, keine Framework-Vorschläge und kein Lob.
- Prüfe den realen Dateiinhalt selbst; übernimm keine Behauptung aus diesem Paket ungeprüft.

## 5. Schweregrade

| Grad | Bedeutung |
|---|---|
| P0 | Sicherheits-, Datenwahrheits- oder Renderbruch; Umsetzung nicht beginnen. |
| P1 | Bindender Vertragskonflikt oder fehlender notwendiger Nachweis; vor der Umsetzung klären. |
| P2 | Klar abgegrenzter Folgepunkt ohne Einfluss auf die sichere Pilotmigration. |

## 6. Verbindliches Ausgabeformat

```markdown
# Peer Review: Ghost-App-Migration auf Chart-Blaupause

## Findings

- [P0|P1|P2] Kurztitel
  - Ist: `Pfad:Zeile` — konkreter Befund.
  - Soll: `Pfad:Zeile` — verletzte Regel oder Vertrag.
  - Auswirkung: konkrete technische oder fachliche Folge.
  - Erforderliche Korrektur: kleinste hinreichende Änderung.

## Entscheidung

GO | NO-GO

Begründung in höchstens drei Sätzen.
```

Wenn es keine Findings gibt, schreibe exakt `Keine Findings.` und danach die Entscheidung. Keine Einleitung, kein Fließtext-Lob, keine Änderungsvorschläge außerhalb eines Findings.
