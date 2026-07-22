# Auftrag an Claude Fable (Reasoning: High)
## Peer-Review: technische App-Fabrik nach Mockup-Abnahme

## Geltung

Dieser Auftrag ersetzt vollständig:
`HANDOVER_FABLE_MOCKUP_ZU_GHOST_APP_PEER_REVIEW_V1.md`.

Die Mockups sind von Albert psychologisch und visuell abgenommen. Das ist keine
Designprüfung. Öffne keinen Browser, erstelle keine Screenshots und bewerte weder
Wirkung noch Ästhetik. Lies das Mockup-HTML ausschließlich als technische
Anforderungsquelle für einen späteren Migrationsprozess.

## Prüffrage

Kann Claude Sonnet aus diesen festen Eingaben zuverlässig eine neue sichere Theme-App bauen?

```text
abgenommenes Mockup HTML
+ Alberts Abnahme-/Produktentscheidungsprotokoll
+ Mini-Spec / lokaler Steuerungsblock
+ verbindlicher Migrationsbrief
= neue produktive App (nicht refaktoriertes Mockup)
```

Prüfe, welches **minimale** technische Verfahren diesen Ablauf für etwa 25 Apps
deterministisch im fachlichen Sinn macht: keine Rateraten, keine stillen Übernahmen,
feste Gates und eindeutige Verantwortungen.

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

## Adversarielle Prüfpunkte

Suche nach Lücken, durch die Sonnet:

- Mockup-JS/CSS/DOM oder simulierte Daten kopieren könnte;
- aus nicht freigegebener Copy, Timings oder A11y-Behauptungen Produktionspflichten macht;
- Flow, Zustand oder lokale Mechanik beim technischen Neubau verliert;
- Datenklasse, Parser/Vault, AppContext oder ChartEngine erst während des Codebaus errät;
- einen zweiten Renderer, Canvas-Weg, CSS-Auslieferungsweg oder Bootstrapper schafft;
- Play-CDN-Testseiten als Ersatz für die Ghost-nahe technische Abnahme behandelt;
- den Theme-Build oder Mechanik-CSS ohne Nachweis ausliefert;
- unnötige Frameworks/Dokumente für eine einmalige App erfindet.

Bewerte allein die technische Fabrikgrenze. Ein Modell darf nie die Abnahme durch Albert
ersetzen.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\PEER_REVIEW_TECHNISCHE_MOCKUP_APP_FABRIK_FABLE_V2.md
```

Keine Implementierung, kein Build, kein ZIP, keine Änderung an bestehenden Dateien.

## Ergebnisformat

1. GO / GO MIT AUFLAGEN / NO-GO.
2. Quellenrangfolge.
3. P1/P2/P3-Findings mit Pfad:Zeile, Ist, Soll, Auswirkung, kleinster Korrektur.
4. Reicht Mockup-Vertrag §8? Falls nein: kleinste verbindliche Ergänzung.
5. Pflichtfelder eines Migrationsbriefs: fehlend / nötig / unnötig.
6. Minimale Sonnet-Gatefolge mit Beweis und Stop-Kriterium.
7. Transfer-/Nichttransfer-Matrix.
8. Explizite Albert-Entscheidungen vor Sonnet.
9. Überbau, der ausdrücklich nicht gebaut werden darf.
10. Nächster Implementierungs-AP, noch nicht ausführen.

