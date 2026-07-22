# Auftrag an Claude Fable (Reasoning: High)
## Peer-Review V4: Golden-Master-App-Fabrik als überprüfbare Produktionslinie

## Geltung

Dieser Auftrag ersetzt vollständig `HANDOVER_FABLE_GOLDEN_MASTER_APP_FABRIK_V3.md`.

Die Mockup-Optik und -Wirkung sind abgenommen. Bewerte sie nicht. Kein Browser, keine
Screenshots, keine Designkritik. Prüfe nur die technische Fabrik, die einen eindeutig
gewählten Golden Master in eine sichere Theme-App überführt.

## Zentraler Stop-Fund

Im vorliegenden Duell existieren zwei Varianten. Ohne eine explizite Auswahl mit
Pfad und SHA-256 ist kein Golden Master definiert. Prüfe, ob dies zurecht ein
Fail-closed-Eingangsgate sein muss.

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

Prüfe adversarial, ob eine V1-Fabrik mit folgendem Muster sicher und kostengünstig sein kann:

```text
eindeutiger Golden Master + versionierter Input-Pack
-> Sonnet-Neubau
-> deterministische Gates
-> Gate-begründete Sonnet-Korrektur
-> Ghost-nahe technische Abnahme
-> archivierter Evalfall
```

Suche insbesondere nach diesen Lücken:

1. fehlende Golden-Master-ID, Quellenhashes, Abnahme-ID oder Entscheidungsledger;
2. fehlende Interaktionsspuren, wodurch Sonnet Flow/State raten muss;
3. fehlende Referenzumgebung, wodurch optische Unterschiede nicht reproduzierbar sind;
4. versehentliche Übernahme von JS, Simulationsdaten, CDN, Inline-Deployment oder
   nicht freigegebener Copy;
5. visueller Blueprint als zweite aktuelle CSS-/DOM-Wahrheit statt nur Input-Artefakt;
6. unzulässige Aufgabenverlagerung von Architektur/Sicherheit an Python oder Haiku;
7. Haiku-Routing ohne evaluierten Qualitätsbeweis;
8. Pixel-Diff-Überbau ohne klaren Mehrwert gegenüber State-/DOM-/Klassen-Fingerprints;
9. fehlende Negativfälle, Trace-Erfassung und Regression nach realen Fehlern;
10. ein aufgeblähter Kontext, der Sonnet mit ganzen Dokumentbergen statt einem
    minimalen, versionierten Pack belastet.

Bewerte die Wegwerfgrenze: statisches DOM/Literal-Tailwind/lokale Mechanik dürfen nur
als unveränderlicher Blueprint in den Input-Pack, niemals als zweite Runtime. JS,
Datenmodell, Architektur und Bootstrapper müssen neu entstehen. Falls dies mit
MOCKUP-VERTRAG kollidiert, formuliere die kleinste notwendige Vertragsänderung.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\PEER_REVIEW_GOLDEN_MASTER_APP_FABRIK_FABLE_V4.md
```

## Ergebnisformat

1. GO / GO MIT AUFLAGEN / NO-GO.
2. Quellenrangfolge.
3. P1/P2/P3-Findings mit Pfad:Zeile, Ist, Soll, Auswirkung, kleinster Korrektur.
4. Vollständigkeitsprüfung des Factory-Input-Packs.
5. Prüfung der Python/Haiku/Sonnet/Reviewer/Albert-Grenzen.
6. Minimale Evidenz- und Evalstrategie.
7. Überbau, der nicht gebaut werden darf.
8. Erforderliche Vertragsänderungen.
9. Erster sicherer Implementierungs-AP.
