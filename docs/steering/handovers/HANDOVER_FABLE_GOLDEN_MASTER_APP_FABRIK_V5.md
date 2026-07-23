# Auftrag an Claude Fable (Reasoning: High)
## Peer-Review V5: Ist die Golden-Master-Fabrik mit Sonnet ausführbar?

## Geltung

Dieser Auftrag ersetzt vollständig `HANDOVER_FABLE_GOLDEN_MASTER_APP_FABRIK_V4.md`.

Die Mockup-Optik und -Wirkung sind abgenommen. Bewerte sie nicht. Kein Browser, keine
Screenshots, keine Designkritik. Prüfe ausschließlich, ob eine technische Fabrik den
eindeutig gewählten Golden Master sicher und wirtschaftlich in eine Theme-App überführt.

**Claude Sonnet ist der vorgesehene ausführende Hersteller.** Prüfe adversarial, ob
Arbeitszerlegung, Input-Pack und Gates Sonnet ausreichend führen. Opus ist nur als
nachweisbedürftige, eng begrenzte Ausnahme zulässig — nicht als allgemeine Empfehlung.
Entwickle keinen Code.

## Zentraler Stop-Fund

Im vorliegenden Duell existieren zwei Varianten. Ohne explizite Auswahl mit genau einem
Pfad, SHA-256, Varianten-Slug, Abnahme-ID und Datum ist kein Golden Master definiert.
Prüfe, ob dies zwingend ein Fall-zu-Fehler-Eingangsgate sein muss.

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

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`; keine andere App als Vorlage.

## Reviewauftrag

Prüfe adversarial diese Zielkette:

```text
eindeutiger Golden Master + versionierter Input-Pack
-> Sonnet: kleine, geschlossene Produktions-APs
-> deterministische Gates
-> nur Gate-begründete Sonnet-Korrektur
-> Ghost-nahe technische Abnahme
-> archivierter Evalfall
```

Finde insbesondere:

1. fehlende Master-ID, Quellenhashes, Abnahme-ID oder Entscheidungsledger;
2. fehlende Interaktionsspuren, wodurch Sonnet Flow/State erraten müsste;
3. fehlende Referenzumgebung für reproduzierbare technische Parität;
4. Übernahme von Mockup-JS, Simulationsdaten, CDN, Inline-Deployment oder Copy;
5. Blueprint als zweite aktuelle CSS-/DOM-Wahrheit statt Input-Artefakt;
6. falsche Verteilung an Python, Haiku oder Sonnet;
7. Haiku ohne evaluierten Qualitätsnachweis;
8. überteuerte Pixel-Diffs statt ausreichender State-/DOM-/Klassen-Fingerprints;
9. fehlende Negativfälle, Traces und Regressionen;
10. ein Mega-Prompt statt eines kompakten, versionierten Packs;
11. Sonnet-Großaufträge ohne getrennten Scope, Gate und Stop;
12. „Opus zur Sicherheit“ statt einer objektiven Eskalationsregel.

Prüfe diese Eskalationslogik:

- fehlende Produktentscheidung, fehlender Master und widersprüchliche Anforderungen:
  Albert-Stop, kein Opus;
- einmaliger Gate-Fail: normaler Sonnet-Korrekturzyklus;
- zweimal gleicher Gate-Fail bei unverändertem Pack: Diagnose durch Reviewer;
- Opus nur für einen nachweislich nicht mechanisierbaren Architektur-/Vertragskonflikt,
  mit benanntem Einmal-Output und Rückgabe an Sonnet.

Bewerte die Wegwerfgrenze: statisches DOM/Literal-Tailwind/lokale Mechanik nur als
unveränderlicher Blueprint im Pack; JS, Datenmodell, Architektur und Bootstrapper neu.
Falls dies mit `MOCKUP-VERTRAG.md` kollidiert, formuliere die kleinste Vertragsänderung.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\PEER_REVIEW_GOLDEN_MASTER_APP_FABRIK_FABLE_V5.md
```

## Ergebnisformat

1. Sonnet-V1: GO / GO MIT AUFLAGEN / NO-GO.
2. Quellenrangfolge.
3. P1/P2/P3-Findings mit Pfad:Zeile, Ist, Soll, Auswirkung, kleinster Korrektur.
4. Vollständigkeitsprüfung des Input-Packs.
5. Prüfung der Sonnet-AP-Grenzen und deterministischen Gates.
6. Routingmatrix inkl. objektiver Opus-Eskalationsprüfung.
7. Minimale Evidenz- und Evalstrategie.
8. Überbau, der nicht gebaut werden darf.
9. Erforderliche Vertragsänderungen.
10. Erster sicherer Implementierungs-AP.
