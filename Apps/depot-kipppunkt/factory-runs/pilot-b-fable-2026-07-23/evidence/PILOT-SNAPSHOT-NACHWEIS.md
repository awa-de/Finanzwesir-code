Stand: 2026-07-23 | AF-GM-04 (Pilot-Snapshot) | Geändert von: Claude

# Nachweis AF-GM-04 — Pilot-Snapshot depot-kipppunkt / b-fable

Technischer Pilotsnapshot des von Albert akzeptierten Werkstattstands `b-fable`, eingefroren als unveränderliche historische Pilotquelle. Kein Trace, kein Eingabepaket, keine App, keine Ghost-Integration — siehe Abnahmegrenze unten.

## Beteiligte Pfade

- Werkstattquelle (unverändert, nur gelesen): `tests/scratch/depot-kipppunkt/mockup-duell/b-fable/mockup.html`
- Snapshot (neu, bytegleiche Kopie): `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/mockup.html`
- Abnahmebeleg (neu): `Apps/depot-kipppunkt/factory-runs/ACCEPTANCE-depot-kipppunkt-b-fable-pilot.json`

## Hash-Verifikation (real ausgeführt)

```
SHA-256 Quelle:   855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9
SHA-256 Snapshot: 855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9
Match Quelle == Snapshot: True
Match gegen im Auftrag gebundenen Wert: True
```

Kopiermethode: `cp` (Dateisystemkopie), nicht Read+Write — vermeidet jedes Risiko einer stillen Zeilenenden- oder Encoding-Normalisierung durch ein Text-Tool. Hash vor dem Kopieren (an der Quelle) und nach dem Kopieren (Quelle **und** Snapshot erneut) geprüft.

## JSON-Validierung des Abnahmebelegs (real ausgeführt, Python)

- Datei parsebar als valides JSON: ja
- Alle neun Pflichtfelder vorhanden: ja (keine fehlend)
- `acceptanceId` (`depot-kipppunkt-b-fable-pilot`) erfüllt Grammatik `^[a-z0-9][a-z0-9-]{2,31}$`: ja
- `mockupSha256` erfüllt Grammatik `^[a-f0-9]{64}$`: ja
- `mockupPath` == `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/mockup.html`: ja
- `mockupSha256` == gebundener Quellen-Hash: ja
- `knownNonGoals` deckt exakt die sechs im Auftrag genannten Punkte: ja
- `acceptedBy` = `Albert`, `acceptedAt` = `2026-07-23`, `appSlug` = `depot-kipppunkt`, `mockupVariant` = `b-fable`: je ja

## Scope-QA

`git status --short` nach diesem Patch enthält ausschließlich die drei erlaubten neuen Artefakte (Snapshot, Abnahmebeleg, dieser Nachweis) plus die vom Skill `/patch-quittung` erzeugte Quittungsdatei. Die Werkstattquelle wurde ausschließlich gelesen, nicht verändert. Kein Shared Path, kein Produktionsstandard, kein Mockup-Vertrag, kein Schutzprofil, kein App-/Theme-/Registry-Code, kein Schema, keine Golden-Master-Werkzeuge und keine Ghost-Dateien wurden berührt.

## Abnahmegrenze (technisch begrenzt, keine Produktfreigabe)

Diese Abnahme ist ausschließlich ein technischer AF-GM-04-Pilot: sichtbarer Happy Path, beobachtbare Interaktion und Gestalt des eingefrorenen `b-fable`-Mockups. Explizit **nicht** Gegenstand: fachliche Produktfreigabe, Ghost-Release, finale Texte, finale Anordnung und Gestaltung, Finanzmathematik, Launch-Reife.

`Apps/depot-kipppunkt/APP_SPEC.md` existiert weiterhin nicht — dieser AP hat sie nicht angelegt und nicht ersetzt.

Dieser AP zeichnet keine Interaktionsspur auf, erzeugt kein Eingabepaket, baut keine App und integriert nichts in Ghost. Der Werkstattpfad (`tests/scratch/depot-kipppunkt/mockup-duell/b-fable/`) darf sich künftig unabhängig vom hier eingefrorenen Snapshot weiterentwickeln, ohne den Pilot zu verändern.

Nächster fachlicher Schritt (nicht Teil dieses APs, kein Selbstlauf): nach Prüfung dieses Nachweises die `b-fable`-Interaktionsspur.
