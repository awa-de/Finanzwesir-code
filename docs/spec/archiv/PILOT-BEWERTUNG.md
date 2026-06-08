# Pilotbewertung — docs/spec/archiv/

Erstellt: 2026-06-08 (AP 9)

## Zweck

Diese Datei dokumentiert den ersten kontrollierten Pilotdurchlauf des
föderierten Archivmodells für diese Archivinsel.

Sie ist keine fertige Kuratierung und keine operative Projektregel.

## Einordnung

- Pfad (relativ): `docs/spec/archiv/`
- Typ laut legacy-map: LOKALES_ARCHIV
- Zielrolle: LOKALER_KONTEXT + MAKING_OF_BELEG
- Making-of-Wert: hoch
- Drift-Risiko: mittel — veraltete Spec-Versionen könnten bei versehentlichem Laden mit aktiver Spec verwechselt werden
- Empfohlene Folgeaktion laut legacy-map: README_ANWENDEN + PILOTKANDIDAT

## Warum diese Pilotinsel?

- **Überschaubar:** 4 Markdown-Dateien, 47 KB — klar abgegrenzt, kein Rohmaterial, keine Binärdateien
- **Relevant:** Spec-Versionsgeschichte der Chart-Engine — direkt belegfähig für Kapitel 02 des Making-of
- **Geeignet für den ersten Praxistest:** README bereits vorhanden (AP 7), Archivvertrag greift, kein Verschiebe- oder Löschbedarf

## Befund

- Dateianzahl: 4 Inhaltsdateien + README.md = 5 Dateien
- Dateien: TECH_SPEC_V1 (HTML-Karten v1), Beschreibung HTML-Karten v3, Charts Ticks und Label v12, Charts Ticks und Label v13
- README vorhanden: ja (AP 7 — Schablone vollständig angewendet, kein Änderungsbedarf)
- local/ vorhanden: nein
- Rohmaterialverdacht: nein
- Binärverdacht: nein
- LLM-Dump-Verdacht: nein
- Claude-Drift-Risiko: mittel — veraltete Spec-Versionen könnten mit aktiver Spec verwechselt werden; README adressiert dieses Risiko bereits
- Making-of-Bezug: hoch — Versionsgeschichte der Chart-Engine-Spec (v1 → v3 → v12 → v13) zeigt Entwicklungsbogen der Visualisierungskomponenten

## Kontextschutz

Diese Archivinsel ist kein operativer Standardkontext für Claude.

Aktuelle Regeln stehen im aktiven Projektpfad (`docs/spec/`, nicht `docs/spec/archiv/`).

Historische Dokumente aus dieser Insel dürfen nur mit ausdrücklichem
Archivauftrag ausgewertet werden.

## Making-of-Bezug

Kapitel 02 — Chart-Engine und Visualisierung:

- Welche Spec-Versionen hat die Chart-Engine durchlaufen?
- Welche Architekturentscheidungen waren dauerhaft (v1 → v13)?
- Welche Konzepte wurden ersetzt oder verfeinert?
- Wie wurde aus einer frühen HTML-Karten-Spec eine ausgereifte Komponentensprache?

## Pilot-Lernpunkt

- Auswahlregel aus legacy-map.md hat gepasst: Kandidat 1 war ohne weitere Recherche startbar.
- README (AP 7) war vollständig — kein Änderungsbedarf in AP 9. AP 7 hat die richtige Vorarbeit geleistet.
- PILOT-BEWERTUNG.md-Schablone ausreichend; keine Lücken entdeckt.
- Hinweis zur Datei-Genauigkeit: legacy-map beschreibt Inhalte auf Zusammenfassungsebene. Tatsächlich vorhanden: v1, v3, v12, v13 — legacy-map nannte v1/v12/v13 (v3 fehlte in der Beschreibung). Kein Problem, aber Hinweis: Inventar und Map arbeiten mit Kurzbeschreibungen, nicht 1:1-Dateilisten.
- Aufwand: trivial. Das ist ein gutes Zeichen für die Übertragbarkeit des Modells.

## Nicht erledigt

In AP 9 ausdrücklich nicht erledigt:

- keine vollständige Kuratierung der 4 Inhaltsdateien
- keine Statusvergabe (ERSETZT/HIST) an Einzeldateien
- keine Recherche nach aktiven Nachfolgern in `docs/spec/`
- keine Datei-Migration
- keine Löschung
- keine finale Making-of-Erzählung

## Folgepunkte

- Ein späterer Kuratierungs-AP sollte die 4 Inhaltsdateien mit Status `ERSETZT` markieren und auf aktive Nachfolger in `docs/spec/` verweisen.
- `local/`-Bereinigung: nicht nötig (kein Rohmaterial vorhanden).
- Das Root-Making-of (Kapitel 02) soll später auf diese Insel verweisen — Verweis in KAPITELRAHMEN.md ist eingetragen.
- Geeignet für vertiefte Auswertung: ja — Spec-Versionsgeschichte ist repräsentativer Beleg für Kapitel 02.
