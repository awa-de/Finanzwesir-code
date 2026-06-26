# AP-10 Ergebnis — Mechanischer Einbau prokrastinations-preis aus Seed

Stand: 2026-06-26  
Methode: deterministischer Python-Task  
Script: `tools/app_fabrik/insert_steuerungsblock_from_seed.py`

## Auftrag

Seed-Block `prokrastinations-preis` aus `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` mechanisch in `Apps/prokrastinations-preis/APP_SPEC.md` einfügen.

## Geänderte Dateien

- Apps/prokrastinations-preis/APP_SPEC.md
- docs/steering/patches/AP-10_mechanischer-einbau-prokrastinations-preis-aus-seed_Ergebnis.md

## Methode

- Seed-Datei gelesen
- Seed-Block `prokrastinations-preis` extrahiert
- Seed-Metadaten (`Status`, `Verteilungsstatus`, `Klärungsbedarf vor Verteilung`) aus lokalem Block entfernt
- Score-Abschnitt `2.1 Standardisiertes Änderungsgate` übernommen
- lokaler Steuerungsblock nach `## 1. Status` und vor `## 2.` eingefügt
- keine LLM-Umformulierung
- keine bestehenden Abschnitte umnummeriert
- keine bestehenden Inhalte umgeschrieben

## Prüfungen

- Seed-Datei vorhanden: ja
- Ziel-APP_SPEC vorhanden: ja
- Steuerungsblock vorher nicht vorhanden: ja
- Seed-Block gefunden: ja
- Score-Abschnitt gefunden: ja
- Einfügeanker gefunden: ja
- kein Commit: ja
- kein Abschlussritual: ja

## Status

GRÜN, wenn `git diff --name-only` nur die erwarteten Dateien zeigt.

## Nächster Schritt

Diff prüfen. Danach entscheiden: commitfähig oder Nachputz.
