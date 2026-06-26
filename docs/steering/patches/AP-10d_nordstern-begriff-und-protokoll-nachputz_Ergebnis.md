# AP-10d Ergebnis — Nordstern-Begriff und Protokoll-Nachputz

Stand: 2026-06-26
Methode: Patch-only Nachputz

## Auftrag

Nach AP-10c lokale APP_SPEC- und Tool-Texte begrifflich synchronisieren:

- lokale APP_SPECs verwenden `Steuerungsblock`, nicht `Nordstern`
- Seed-Quelle korrigieren, damit spätere mechanische Einbauten denselben Begriff verwenden
- Protokolltexte an die tatsächliche Seed-Metadaten-Bereinigung anpassen

## Geänderte Dateien

- Apps/prokrastinations-preis/APP_SPEC.md
- Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
- tools/app_fabrik/insert_steuerungsblock_from_seed.py
- docs/steering/patches/AP-10_mechanischer-einbau-prokrastinations-preis-aus-seed_Ergebnis.md
- docs/steering/patches/AP-10d_nordstern-begriff-und-protokoll-nachputz_Ergebnis.md

## Änderungen

- Score-Satz in lokaler APP_SPEC von `redaktionellen Nordstern` auf `Steuerungsblock` geändert
- Score-Satz in Seed-Datei ebenfalls geändert, damit spätere Einbauten korrekt sind
- Tool-Protokolltext auf tatsächliche Entfernung von `Status`, `Verteilungsstatus`, `Klärungsbedarf vor Verteilung` aktualisiert
- bestehendes AP-10-Protokoll entsprechend aktualisiert

## Prüfungen

- keine fachliche Neuformulierung: ja
- keine erneute Seed-Extraktion: ja
- kein `--write` ausgeführt: ja
- keine anderen Apps geändert: ja
- keine Script-Logik geändert: ja
- kein Commit: ja
- kein Abschlussritual: ja

## Status

GRÜN
