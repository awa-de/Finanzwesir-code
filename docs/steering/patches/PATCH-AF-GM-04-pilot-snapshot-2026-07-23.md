Stand: 2026-07-23 | Session: AF-GM-04-Pilot-Snapshot | Geändert von: Claude

# Patch-Quittung | AF-GM-04-Pilot-Snapshot | 2026-07-23

**Beauftragt:** Den akzeptierten Werkstattstand `b-fable` (App `depot-kipppunkt`) als unveränderlichen technischen AF-GM-04-Pilotsnapshot einfrieren und den maschinenlesbaren, technisch begrenzten Abnahmebeleg anlegen. Auftragsquelle: `Archiv/local/muss noch eingeordnet werden/PROMPT_CLAUDE_AF-GM-04_PILOT_SNAPSHOT_ACCEPTANCE_V1.md`.

**Geändert:** 3 Dateien, 3 Stellen (alle neu, keine bestehende Datei geändert)

**Dateien:**
- `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/mockup.html` (neu, bytegleiche Kopie der Werkstattquelle)
- `Apps/depot-kipppunkt/factory-runs/ACCEPTANCE-depot-kipppunkt-b-fable-pilot.json` (neu, Abnahmebeleg)
- `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/evidence/PILOT-SNAPSHOT-NACHWEIS.md` (neu, Nachweis)

**CHANGED/NEW-Markierungen:** N/A — reine Artefakte (HTML-Kopie, JSON, Markdown), kein Code-Marker nötig.

**Tabu-Check:** keine ✓ — Werkstattquelle `tests/scratch/depot-kipppunkt/mockup-duell/b-fable/mockup.html` ausschließlich gelesen, nicht verändert. `MINI_SPEC_FROM_HAUPTDOKUMENT.md`, Produktionsstandard, Mockup-Vertrag, Schutzprofil, App-/Theme-/Registry-Code, Schema, Golden-Master-Werkzeuge, Ghost-Dateien unangetastet. Kein Pfad in `.claude/PROTECTED_PATHS.json` betroffen.

**Gate-Typ:** Full

**Reale Befunde:**

| Prüfung | Ergebnis |
|---|---|
| SHA-256 Quelle (vorab) | `855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9` |
| SHA-256 Quelle (nach Kopie) | identisch |
| SHA-256 Snapshot (nach Kopie) | identisch |
| Match gegen gebundenen Auftragswert | `True` |
| Kopiermethode | `cp` (Dateisystem, kein Read+Write, kein Encoding-/Zeilenenden-Risiko) |
| JSON-Parsbarkeit Abnahmebeleg | `True` |
| Pflichtfelder vollständig | `True` (9/9) |
| Grammatik `acceptanceId` (`^[a-z0-9][a-z0-9-]{2,31}$`) | `True` |
| Grammatik `mockupSha256` (`^[a-f0-9]{64}$`) | `True` |
| `mockupPath` == Snapshot-Pfad | `True` |
| `knownNonGoals` == 6 Punkte aus Auftrag | `True` |

**Nachbedingungen (real ausgeführt):** Hash-Vergleich (1), JSON-Validierung mit Python (2), alle drei neuen Dateien vollständig erneut gelesen (3), `git status --short` geprüft — enthält ausschließlich `Apps/depot-kipppunkt/factory-runs/` als neuen Scope, alle übrigen Einträge stammen aus vorherigen, bereits quittierten Patches der laufenden Session (4).

**Bekannte, im Auftrag festgelegte Grenze:** kein Trace, kein Eingabepaket, keine App, keine Ghost-Integration, keine `APP_SPEC.md`. `Apps/depot-kipppunkt/APP_SPEC.md` existiert weiterhin nicht.

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 3 Stellen geändert (3 neue Dateien). Aufzählen? Nein — vollständig oben dokumentiert.

→ Nach diesem AP nicht selbsttätig fortfahren. Nächster fachlicher Schritt (nicht Teil dieses Patches, kein Selbstlauf): nach Prüfung dieses Nachweises die `b-fable`-Interaktionsspur. Kein Commit, kein Push, kein Ghost-Upload.
