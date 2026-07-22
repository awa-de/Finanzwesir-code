# Auftrag an ChatGPT Sol (Reasoning: High)
## Analyse: Vom psychologischen Werkstatt-Mockup zur migrationsfähigen Ghost-App

## Rolle und Ziel

Du bist leitender Softwarearchitekt für die Finanzwesir-App-Fabrik. Entwickle **keinen Code** und ändere keine bestehende Projektdatei.

Untersuche die Lücke zwischen:

1. einem bewusst schnellen, psychologisch zu prüfenden Tailwind-Werkstatt-Mockup und
2. einer technisch migrationsreifen `fw-app` im Ghost-Theme.

Ziel ist ein **minimaler, wiederholbarer Übergabeprozess für etwa 25 Apps**. Er darf
Wirkung, Flow und Optik des abgenommenen Mockups nicht beim technischen Umbau verlieren,
muss aber Daten, Sicherheit, A11y, Runtime, CSS-Auslieferung und Ghost-Vertrag erst
danach sauber hinzufügen.

Die richtige Leitfrage lautet nicht „Wie wird das Mockup refaktoriert?“, sondern:
**Welche beobachtbaren Eigenschaften werden aus einem freigegebenen Mockup in eine neue
Produkt-App übernommen, welche werden bewusst verworfen, und durch welche Gates wird das
nachgewiesen?**

## Fallmaterial

Aktuelles Beispiel, nur als Beleg für die Werkstattform:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Beide sind absichtlich Einzeldateien mit Tailwind Play-CDN, Inline-JS, simulierten Daten
und app-lokaler CSS-Mechanik. Sie sind Wegwerfartefakte, nicht heimlich zu übernehmender
Produktionscode.

## Pflichtquellen — vollständig lesen

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\MOCKUP-VERTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_STARTLINIE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\03_APP_FACTORY_STANDARD_DRAFT.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\ARCHITECTURE STRATEGY PAPER VX.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\Der Rucksack (Context Object Pattern).md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\APP-INTERFACE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\handovers\MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\CSS-KONVENTIONEN.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\SECURITY-BASELINE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\README.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_AUFTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_EINGABEPAKET.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`. Keine andere App als
Vorlage lesen. Reale, bindende Quellen gewinnen über Arbeitsentwürfe. Bei Widerspruch
benenne Quelle, Pfad:Zeile und Rang; löse ihn nicht still durch Umdeutung.

## Nicht verhandelbare Leitplanken

- Mockup-Code wird **nie** in die Produkt-Runtime kopiert. Das gilt ebenso für
  Inline-JS, simulierte Datenmodelle, DOM-Struktur, Klassenrezepte und technische Annahmen.
- Übernommen werden dürfen nur Wirkung, Ablauf, visuell relevante Zustände,
  Informationsreihenfolge, begründete lokale Mechaniken und von Albert freigegebene
  Produktentscheidungen — jeweils als beobachtete Anforderungen, nicht als Code.
- Ein Chart ist eine App-Komponente. Nutzt die spätere App Charts, verwendet sie die
  ChartEngine/Bridge; kein eigenes Canvas oder zweiter Chart-Stack.
- Die Produkt-App folgt der bestehenden Pipeline: Ghost-Card -> Resolver -> Parser/Vault
  -> Domain-Strategie -> unveränderlicher AppContext -> Renderer/ChartEngine/Plugins.
- Theme ist Design- und Auslieferungsort. Tailwind Play-CDN und Test-/Inline-CSS bleiben
  Werkstattmittel. Kein `!important` als Kaskadenreparatur.
- Neue verallgemeinerbare Infrastruktur entsteht nur bei belegtem zweiten Bedarf.
  Eine einmalige Wirkmechanik bleibt zunächst app-lokal und migrationsfähig.
- Albert ist alleinige Instanz für psychologische Wirkung und Produktfreigabe.

## Deine Arbeitsaufgabe

Liefere eine klare, konstruktive Architekturposition mit **genau einer empfohlenen
Zielbauform**. Alternativen nur nennen, wenn eine echte Entscheidung durch Albert
erforderlich ist.

Beantworte mindestens:

1. Was deckt `MOCKUP-VERTRAG.md` §8 bereits ab, was fehlt für einen operativen
   Übergang? Belege jedes Delta mit Pfad:Zeile.
2. Welche minimalen Artefakte braucht der Übergang? Prüfe insbesondere, ob ein einziges
   „Wirkungs-zu-Migrationsbriefing“ genügt oder ob mehrere neue Dokumente nötig wären.
   Bevorzuge Erweiterung vorhandener verbindlicher Quellen vor neuen Parallelstandards.
3. Welche Kategorien müssen dort getrennt erfasst werden:
   - psychologische Invarianten / Flow,
   - visuelle und responsive Invarianten,
   - lokale Wirkmechaniken und Reduced Motion,
   - Copy-Status,
   - simulierte Annahmen und Datenbedarf,
   - Komponenten- und ChartEngine-Bedarf,
   - A11y-Absicht,
   - bewusst offene Entscheidungen?
4. Entwirf die kleinste Gate-Folge vom Mockup-Duell bis zur Ghost-nahen Abnahme.
   Für jedes Gate: Eintrittskriterium, Eigentümer, Beweis, Ergebnis und Stop-Bedingung.
5. Erstelle eine präzise Transfermatrix: „Mockup-Beobachtung“ -> „Produkt-Artefakt/
   Verantwortlicher“ -> „wie wird Gleichheit bzw. bewusste Abweichung nachgewiesen?“
6. Kläre den richtigen Zeitpunkt für Datenklasse A0/A1-C/A1-J/A2-CJ, APP_SPEC,
   AppContext, Design-Token, Tailwind-@source, Mechanik-CSS und Ghost-Card.
7. Definiere, wie „optisch gleich genug“ ohne Pixel-Diff und ohne unzulässige
   Selbstzertifizierung pragmatisch nachgewiesen wird.
8. Benenne alle Annahmen, die Albert ausdrücklich entscheiden muss.
9. Prüfe Skalierbarkeit auf 25 Apps: Welche Wiederholung ist gewollt, welche
   Abstraktion wäre jetzt verfrüht?

Nutze Ockhams Rasiermesser und Via Negativa sichtbar: Begründe ausdrücklich,
welche Artefakte, Build-Schritte, neue Renderer oder Frameworks **nicht** entstehen sollen.

## Ergebnisdatei — einziger Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ANALYSE_MOCKUP_ZU_GHOST_APP_SOL_V1.md
```

Kein Code, kein Build, kein ZIP, keine Änderung an bestehenden Dokumenten, Tests oder Mockups.

## Ergebnisformat

1. Gesamturteil: GO / GO MIT AUFLAGEN / NO-GO.
2. Quellen- und Rangordnung.
3. Befund: vorhandener Vertrag versus operative Lücke, mit Pfad:Zeile.
4. Empfohlene Zielbauform und begründete Nicht-Bauformen.
5. Minimaler Übergabeprozess als Gate-Tabelle.
6. Transfermatrix.
7. Minimaler Dokumentenplan: bestehende Datei erweitern oder neue Datei, Begründung.
8. Entscheidungen Albert.
9. Risiken und Beweisregeln.
10. Konkreter nächster, noch nicht auszuführender Arbeitsschritt.

Keine Lobprosa. Keine Implementierung.
