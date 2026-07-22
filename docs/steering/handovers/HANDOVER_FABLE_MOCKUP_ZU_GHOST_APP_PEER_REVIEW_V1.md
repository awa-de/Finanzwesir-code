# Auftrag an Claude Fable (Reasoning: High)
## Unabhängiges Architektur-Peer-Review: Übergang Werkstatt-Mockup -> Ghost-App

## Rolle und Prüffrage

Du arbeitest als unabhängiger, skeptischer Architektur-Reviewer. Entwickle keinen Code
und lies **nicht** die Ergebnisdatei eines anderen Modells.

Prüfe, ob die Finanzwesir-App-Fabrik zwischen dem psychologischen Werkstatt-Mockup und
der produktionsnahen Ghost-App eine operative Lücke hat — und welches **kleinstmögliche**
Verfahren sie schließt, ohne Werkstattfreiheit, Sicherheitsverträge oder die erprobte
Chart-/App-Blaupause zu beschädigen.

Die zentrale Prüffrage:

> Wie stellen wir nach Alberts Wirkungsfreigabe sicher, dass die spätere Theme-App
> denselben psychologischen Ablauf und dieselbe relevante Optik bewahrt, ohne
> Wegwerfcode, simulierte Daten oder Inline-Architektur in die Produktion zu übertragen?

## Fallmaterial

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Das sind absichtlich nicht spec-konforme Werkstattartefakte: Tailwind Play-CDN,
Inline-JS/CSS, lokale Zustandsmodelle und Simulationsdaten. Das ist zunächst korrekt.
Bewerte nicht, ob sie schon produktionsreif sind, sondern ob der **Übergang** von ihnen
korrekt geregelt werden kann.

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
Referenz lesen. Bei widersprüchlichen Quellen gelten bindende Spezifikationen vor
Arbeitsentwürfen; dokumentiere Konflikte mit Pfad:Zeile statt sie still zu glätten.

## Prüfkriterien

Führe ein adversariales Review durch. Suche insbesondere nach diesen Fehlmustern:

- Mockup-Code wird aus Bequemlichkeit in die Runtime kopiert.
- psychologische Signaturmechanik geht beim Umbau verloren, weil nur Screens gezählt werden.
- simulierte Daten, Microcopy, Timings oder A11y-Behauptungen werden unbemerkt zur
  Produktionspflicht.
- ein zweiter Chart-/Renderer-/CSS-Auslieferungsweg entsteht.
- der Theme-Tailwind-Build verliert Klassen oder lokale Mechanik-CSS.
- die Ghost-nahe Abnahme wird durch eine Play-CDN-Testseite ersetzt.
- der AppContext wird zum UI- oder Rohdaten-Sammelobjekt.
- ein allgemeiner Baukasten oder Renderer wird ohne zweiten Bedarf eingeführt.
- der Prozess erzeugt für 25 Apps Dokumentenballast statt Beweise.
- Albert muss eine Produktentscheidung treffen, erhält sie aber nicht sichtbar.

Bewerte §8 des bestehenden Mockup-Vertrags explizit: Ist er als Übergaberegel
ausreichend? Wenn nein, nenne das kleinste fehlende verbindliche Artefakt oder die kleinste
Ergänzung einer vorhandenen Quelle. Bevorzuge keinen neuen Standard, wenn eine präzise
Erweiterung einer bestehenden Quelle genügt.

## Feststehende Grenzen

- Mockups bleiben Knautschzone und Wegwerfcode.
- Übertragbar sind nur abgenommene Wirkungs- und Gestaltungsanforderungen, nie die
  technische Umsetzung.
- Produktcode folgt dem bestehenden App-/Theme-/Parser-/Vault-/AppContext-Vertrag.
- Charts bleiben ChartEngine-Komponenten; keine neue Canvas- oder Chart-App-Architektur.
- Theme ist die einzige Produktions-CSS-Wahrheit; kein JS-Style-Injection-Weg,
  kein `!important`-Gegenmittel für die Ghost-Kaskade.
- Albert entscheidet Wirkung und Produktfragen. Ein Modell kann keine Wirkung freigeben.

## Ergebnisdatei — einziger Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\PEER_REVIEW_MOCKUP_ZU_GHOST_APP_FABLE_V1.md
```

Kein Code, kein Build, kein ZIP, keine Änderung an bestehenden Dokumenten, Tests oder Mockups.

## Verbindliches Ergebnisformat

1. Gesamturteil: GO / GO MIT AUFLAGEN / NO-GO.
2. Prüfumfang und Quellenrangfolge.
3. Findings nach P1/P2/P3: je Finding Pfad:Zeile, Ist, Soll, Auswirkung,
   kleinste Korrektur.
4. Liste widerlegter oder bestätigter Annahmen.
5. Minimaler Übergabeprozess: höchstens die nötigen Gates, jeweils mit
   Eigentümer, Beweis und Stop-Kriterium.
6. Transfer-/Nichttransfer-Matrix:
   Wirkung, Flow, Optik, lokale Mechanik, Motion, Copy, Daten, Fachlogik,
   A11y, CSS, Chartbedarf, Ghost-Card.
7. Empfehlung: bestehende Quelle erweitern oder neue Quelle anlegen;
   genaue Ziel-Datei und minimaler Abschnittsvorschlag.
8. Entscheidungen, die Albert explizit treffen muss.
9. Beweisregeln für die spätere Migration und Ghost-nahe Abnahme.
10. Nächster sicherer Schritt — ausdrücklich noch nicht ausführen.

Keine Lobprosa. Keine Implementierung. Kein Entwurf einer neuen Plattform ohne
konkreten zweiten Bedarf.
