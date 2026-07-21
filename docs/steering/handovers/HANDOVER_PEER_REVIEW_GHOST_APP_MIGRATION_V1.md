# Fable-Prompt: Peer Review der Ghost-App-Migration

**Modell:** `claude-fable-5`  
**Empfohlenes Effort:** high — in der Ausführungskonfiguration setzen, nicht im Prompt.  
**Modus:** unabhängiges, read-only Architektur- und Migrations-Readiness-Review.  
**Repository:** `Z:\Documents\Nextcloud\Finanzwesir 2.0`

## Start

Verbinde dich mit dem Repository. Ändere nichts: keine Datei, kein Code, kein Commit, kein Abschlussritual.

Lies zuerst vollständig:

```text
docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md
docs/steering/audits/PEER_REVIEW_PAKET_GHOST_APP_MIGRATION_V1.md
```

Die Migrationsstrategie ist die fachliche Leitquelle. Das Review-Paket enthält die Quellenhierarchie, Pflichtdateien, Beweisregeln und die Soll-Invarianten. Bei einem Widerspruch gewinnt stets eine dort als bindend bezeichnete Spezifikation vor der Strategie.

## Dein Auftrag

Prüfe unabhängig, ob `prokrastinations-preis` sicher als erste produktive A2-CJ-App (CSV + JSON) nach Ghost migriert werden kann.

Die zentrale Arbeitshypothese lautet: Die bereits migrierte Chart-App ist die technische Blaupause. Die Prokrastinations-App ergänzt ausschließlich einen JSON-Vault, ihren fachlichen AppContext und einen Interaktions-Controller vor dem bestehenden ChartEngine-Pfad.

Übernimm diese Hypothese nicht ungeprüft. Widerlege oder bestätige sie gegen die bindenden Specs und den echten aktuellen Code. Besonders wichtig sind:

- ein einziger Chart-Render-Stack über `ChartEngine.renderFromData()`;
- Dateinamen-only in Ghost-Cards, feste Auflösung nach `/content/files/app-data/`;
- `JSONParser` als spezialisierte Schwester von `CSVParser`, kein Universalparser;
- getrennte, unveränderliche Daten-Vaults sowie getrennte AppContext-/`fwContext`-Verantwortung;
- eingefrorener statischer AppContext-Kern, während Screen-, Fokus- und Animationszustand im Controller bleibt;
- Tailwind/Theme nur für DOM-Chrome und Layout, nicht als zweiter Chart-Renderer;
- Bestandsschutz der bestehenden `financial-chart-module`-Cards ohne künstlich zweite Architektur daraus abzuleiten.

Lies die im Review-Paket genannten Pflichtquellen. Erweitere die Suche nur gezielt, wenn eine konkrete Behauptung sonst nicht entscheidbar ist. Keine breite Repository-Inventur, keine Chronik-Lektüre als Ersatz für aktuellen Code und keine Webrecherche.

## Arbeitsweise

Handle als kritischer Senior-Architekt, nicht als Zusammenfasser des vorhandenen Plans.

- Anerkenne dokumentierte Entscheidungen, öffne sie aber bei nachgewiesenem Widerspruch zu bindendem Soll oder realem Code.
- Nicht belegte Behauptungen sind nicht automatisch grün. Mache aus einer fehlenden Evidenz jedoch nur dann ein No-Go, wenn sie Datenwahrheit, Sicherheit, Renderpfad oder die anstehende Migrationsentscheidung betrifft.
- Erfinde keine neue Plattform, kein Backend, kein Universalframework und keine Alternativarchitektur außerhalb eines konkreten Findings.
- Falls eine Pflichtquelle nicht lesbar ist, stoppe die betreffende Bewertung und melde den konkreten Blocker.

## Ausgabe

Liefere ausschließlich Findings und die Entscheidung im Format des Review-Pakets:

- Jeder Finding mit Schweregrad P0/P1/P2, `Pfad:Zeile`, Ist, Soll, Auswirkung und kleinster erforderlicher Korrektur.
- Danach nur `GO` oder `NO-GO`, begründet in höchstens drei Sätzen.
- Wenn keine Findings existieren: exakt `Keine Findings.` und danach die Entscheidung.

Kein Lob, keine Einleitung, keine Änderungsarbeit und keine allgemeinen Verbesserungsvorschläge.
