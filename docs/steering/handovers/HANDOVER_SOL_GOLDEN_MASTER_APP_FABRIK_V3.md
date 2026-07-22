# Auftrag an ChatGPT Sol (Reasoning: High)
## Architektur einer KI-Produktionslinie: Golden-Master-Mockup -> Ghost-App

## Geltung

Dieser Auftrag ersetzt vollständig:
`HANDOVER_SOL_TECHNISCHE_MOCKUP_APP_FABRIK_V2.md`.

Das abgenommene Mockup ist ein **Golden Master**. Wirkung, Flow und Optik werden nicht
erneut beurteilt, verbessert oder diskutiert. Ziel ist allein, eine Produktionslinie zu
definieren, die diese App innerhalb ihrer `.fw-app`-Grenze möglichst gleich und zugleich
spec-konform, sicher und kostengünstig herstellt.

Kein Browsertest und keine manuelle Designkritik der Mockups. Das Mockup-HTML ist die
technische Blaupause für sichtbare Zustände, DOM-Flächen, Tailwind-Rezepte und lokale
Mechaniken.

## Produktziel

Nach Alberts Abnahme soll ein Sonnet-Lauf aus festen Eingaben eine neue migrationsfähige
App bauen können:

```text
Golden-Master-Mockup
+ Abnahme-/Produktentscheidungsprotokoll
+ Mini-Spec
+ automatisiert erzeugtes Produktionspaket
= Theme-Runtime + Tests + Datenvertrag + Theme-ZIP
```

Die Produktions-App muss die festgelegten Screens, Informationsreihenfolge, Controls,
Zustandswechsel, Bewegungen/Reduced Motion und die lokale Optik reproduzieren. Zusätzlich
muss sie alle bestehenden Ghost-, Daten-, Sicherheits-, AppContext-, ChartEngine- und
CSS-Verträge erfüllen.

„Identisch“ wird technisch, nicht geschmacklich definiert: gleiche freigegebene
App-Flächen an den kanonischen Viewports, gleiche Control-/State- und Mechanik-Signaturen,
keine unerklärte Abweichung. Äußere Ghost-Artikel-Flächen gehören nicht zum Golden Master.

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
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\README.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_AUFTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_EINGABEPAKET.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`; keine andere App als Referenz.
Bindende Specs schlagen Drafts. Konflikte mit Pfad:Zeile ausweisen.

## Arbeitsauftrag

Entwirf **eine** minimal tragfähige Fabrikbauform. Sie soll möglichst viele
wiederholbare Schritte deterministisch per Python erledigen, Haiku nur für klar
abgegrenzte, nicht sicherheitskritische Extraktions-/Klassifikationsaufgaben einsetzen
und Sonnet nur für Architekturbindung und den eigentlichen Neubau der App einsetzen.

Beantworte präzise:

1. Welches automatisiert erzeugte Produktionspaket entsteht aus dem Mockup?
   Benenne die kleinste Dateiform, Pflichtfelder und konkrete maschinenlesbare Nachweise.
   Es muss Screens, DOM-/Tailwind-Rezepte, Controls, Zustandsübergänge, lokale CSS-Mechanik,
   Motion/Reduced Motion, Textstatus und offene Entscheidungen erfassen.
2. Darf der rein visuelle Träger (statisches DOM, Literal-Tailwind-Rezepte,
   app-lokale CSS-Mechanik) mechanisch in einen Produktions-Blueprint überführt werden,
   obwohl Mockup-JS/Datenmodell/Architektur verworfen werden? Prüfe den Konflikt mit
   MOCKUP-VERTRAG §6/§8 und empfehle die kleinste Vertragspräzisierung.
3. Teile jede Tätigkeit eindeutig zu:
   - Python: Extraktion, Normalisierung, Fingerprints, Manifestprüfung, Struktur-/Diff-Gates;
   - Haiku: nur eng begrenzte Mapping-/Klassifikationsvorschläge mit deterministischer
     Nachprüfung;
   - Sonnet: APP_SPEC, Datenklasse, Domain-Strategie/AppContext, sichere Runtime,
     ChartEngine-Integration und Auflösung realer Architekturentscheidungen;
   - Albert: ausschließlich Abnahme und echte Produktentscheidungen.
4. Entwirf die feste Pipeline und Gates:
   Golden Master -> Python-Paket -> Sonnet-Auftrag -> Code -> maschinelle Gates ->
   Ghost-nahe technische Paritätsabnahme -> ZIP.
   Jedes Gate braucht Eingabe, Output, Beweis, Stop-Kriterium und Token-Ökonomie.
5. Definiere die technische Parität ohne erneutes Designurteil:
   DOM-/Klassen-/Mechanik-Fingerprints, kontrollierte Screenshot-/Pixel-Diffs mit
   begründeter Toleranz oder eine schlankere Alternative. Bewerte Aufwand/Nutzen.
6. Definiere Nichtübernahme: Mockup-JS, Datenmodell, simulierte Daten, offene Copy,
   unbestätigte Timings/A11y-Behauptungen, CDN und Inline-Deployment.
7. Verankere Datenklasse, Parser/Vault, AppContext, ChartEngine, Theme-CSS, Tailwind-Scan,
   Registry, Tests und Ghost-Card im richtigen Pipeline-Schritt.
8. Prüfe Skalierung für 25 Apps: Welche Python-Werkzeuge gehören einmalig in die Fabrik,
   welche neue Abstraktion ist vor dem zweiten belegten Bedarf verboten?
9. Nenne nur die Entscheidungen, die Albert wirklich vor einem Sonnet-Lauf treffen muss.

Ockhams Rasiermesser und Via Negativa sind Kernkriterien: kein HTML-zu-JS-Compiler,
kein zweiter Renderer, kein zweiter CSS-Auslieferungsweg und keine LLM-Schleife für
mechanisch überprüfbare Arbeit.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ANALYSE_GOLDEN_MASTER_APP_FABRIK_SOL_V3.md
```

Kein Code, kein Build, kein ZIP, keine Änderung bestehender Dateien.

## Ergebnisformat

1. Gesamturteil.
2. Zielbauform.
3. Golden-Master-Produktionspaket.
4. Python/Haiku/Sonnet/Albert-Matrix.
5. Pipeline mit Gates.
6. Paritätsbeweis und Aufwand/Nutzen.
7. Transfer-/Nichttransfer-Matrix.
8. Kleinste erforderliche Vertragsänderungen.
9. Albert-Entscheidungen.
10. Konkreter erster Implementierungs-AP.
