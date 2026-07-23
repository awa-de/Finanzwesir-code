# Auftrag an Claude Fable (Reasoning: High)
## Peer Review V6 — vollständige Golden-Master-App-Fabrik

## Geltung und Reihenfolge

Dieser Auftrag ersetzt alle früheren Golden-Master-/App-Fabrik-Reviewaufträge V1 bis V5.
Er wird **erst nach** dem Sol-Auftrag V6 ausgeführt.

Lies zuerst die Pflichtquellen und anschließend vollständig:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ENTWURF_APP_FABRIK_GOLDEN_MASTER_V6.md
```

Fehlt diese Datei, ist das ein Stop-Befund; entwickle keinen Ersatzentwurf.

Bewerte nicht die abgenommene Mockup-Optik, Psychologie, Copy oder Usability. Kein
Browser, keine Screenshots, keine Designkritik, kein Code. Prüfe nur, ob die vorgeschlagene
Fabrik den fixierten Golden Master zuverlässig, sicher, schlank und wiederholbar in eine
Ghost-App überführen kann.

## Zielbild, das zu prüfen ist

Claude Sonnet ist der ausführende Hersteller. Die Fabrik soll für ungefähr 25 Apps den
Weg Werkstatt-Mockup -> eindeutiger Golden Master -> gehashtes Input-Pack -> kleine
Sonnet-APs -> automatische Gates -> Ghost-nahe Abnahme -> Regressionfall liefern.

Charts und andere Apps sind eine Familie; die Chart-Engine ist eine nutzbare
Abhängigkeit, keine getrennte Produktkategorie. Datenklassen sind: keine Daten, CSV,
JSON, CSV+JSON. Produktive Runtime ist im Theme; App-Dossier und Testartefakte bleiben
in `Apps/<slug>`. Tailwind wird einmal in Theme-CSS gebaut, App-Mechanik ist lokal,
und die Ghost-Hostgrenze wird nicht mit `!important` repariert.

## Pflichtquellen — vollständig lesen

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\MOCKUP-VERTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_STARTLINIE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\03_APP_FACTORY_STANDARD_DRAFT.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\01_DECISION_LOG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_IMPLEMENTATION_RFC.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\ARCHITECTURE STRATEGY PAPER VX.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\Der Rucksack (Context Object Pattern).md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\APP-INTERFACE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\handovers\MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\CSS-KONVENTIONEN.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\SECURITY-BASELINE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\testing\TEST_PAGE_STANDARD.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\CSV-APP-DATEN-WORKFLOW.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\JSON-APP-DATEN-WORKFLOW.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\README.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_AUFTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_EINGABEPAKET.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`; keine andere App als Vorlage.
Bindende Specs schlagen Drafts. Findings immer mit Pfad:Zeile.

## Adversarialer Reviewauftrag

Prüfe den Sol-Entwurf als vollständige Fabrik, nicht nur als Modell-Routing. Suche nach
allen Lücken, die Sonnet später zum Raten, zur unsicheren Übernahme oder zu teurer
Nacharbeit zwingen.

Pflichtprüfungen:

1. **Abnahmegrenze:** genau ein Golden Master mit Hash, Varianten-Slug und Abnahme;
   kein Start aus Duell, fehlender Auswahl oder geänderter Datei.
2. **Input-Pack:** alle notwendigen Fakten vorhanden, klare Feldherkunft und
   Fall-zu-Fehler-Prüfung; keine Vollkopie des Dokumentbergs.
3. **Verhalten:** Interaktionsspuren erfassen alle Happy-Path-Zustände, sichtbaren
   Übergänge, Controls, Motion/Reduced Motion und Fehlerzustände; Sonnet muss nicht
   aus Mockup-JS folgern.
4. **Visual Blueprint:** statische DOM-/Tailwind-/Mechanik-Fakten sind nutzbar, aber
   nie zweite Runtime oder zweite CSS-Wahrheit.
5. **Spec-Konformität:** Card/Bootstrapper, Datenresolver/Parser/Vault/Rucksack,
   Theme-Runtime, Testseite, CSS-Kaskade, A11y und Sicherheitsbaseline sind vollständig
   integriert.
6. **Varianten:** keine Daten / CSV / JSON / CSV+JSON sowie Chart-App/Chart-Abhängigkeit
   sind klar und ohne künstliche Kategoriegrenze abgebildet.
7. **Lebenszyklus:** klare Zielorte und Änderungswege für Code, CSS, Daten, Text,
   Dossier, Tests, Theme-ZIP und manuelle Ghost-Arbeit.
8. **Produktionszerlegung:** Sonnet-APs sind klein, haben Leseliste, Write-Scope,
   erwartete Nachweise und Stop-Regeln; kein unprüfbarer Gesamtauftrag.
9. **Gates/Evals:** automatische Gates vor menschlicher Abnahme; technische Parität
   verhältnismäßig (Fingerprints vor Pixel-Diff); reale Fehler werden Regressionen.
10. **Kosten/Routing:** Python für Determinismus; Haiku nur nach gemessenem,
    schema-validiertem Pilot; Sonnet als Ausführer; Fable/Sol als Prüfer.
11. **Opus:** nur ein objektiv belegter Ausnahmefall für einen nicht mechanisierbaren
    Architektur-/Vertragskonflikt. Fehlende Produktentscheidung oder Master bleibt
    Albert-Stop. „Opus zur Sicherheit“ ist ein Finding.
12. **Überbau:** kein Compiler, kein zweiter Renderer/CSS-Weg/Deployment-System,
    kein Agentenschwarm und keine generische Evalplattform.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\PEER_REVIEW_APP_FABRIK_GOLDEN_MASTER_V6.md
```

## Ergebnisformat

1. GO / GO MIT AUFLAGEN / NO-GO.
2. Quellenrangfolge und überprüfte Annahmen.
3. P1/P2/P3-Findings: Pfad:Zeile, Ist, Soll, Auswirkung, kleinste Korrektur.
4. Vollständigkeitsmatrix: Intake, Input-Pack, AP-Kette, Varianten, Lebenszyklus,
   Gates, menschliche Abnahme.
5. Sonnet-Ausführbarkeit und nur gegebenenfalls objektive Opus-Ausnahme.
6. Nicht zu bauender Überbau.
7. Konsolidierte Reihenfolge der ersten Implementierungs-APs.
