Stand: 2026-07-18 10:24 | Session: AP-app-fabrik-09d | Geändert von: Claude

# AP-app-fabrik-09d — Grok-Artefakte in der Werkstatt bündeln — Ergebnis

Risikoklasse: B (Ablage-/Namenskonvention; ein Move + chirurgische Werkzeugänderung). Schutzgut: klare Trennung zwischen der allgemeinen, wiederverwendbaren Grok-Vorlage (Archiv) und den app-spezifischen Grok-Artefakten (Werkstatt); der bestehende Grok-Ergebnisbestand darf nicht kollidieren.

## Fehlerursache

Der app-spezifische Grok-**Auftrag** lag im Archiv unter `AP-app-fabrik-09_grok-gegenkritik_<slug>.md` und teilte damit den Namensstamm mit Groks **Ergebnis** `tests/scratch/<slug>/psychosprint/grok-gegenkritik.md`. Zusätzlich las `sonnet-paket` das Ergebnis fälschlich unter `qualitative-gegenkritik.md`. Entscheidung: app-spezifische Grok-Artefakte gehören in die Werkstatt; der Auftrag heißt eindeutig `GROK_AUFTRAG.md`; das Archiv trägt nur noch die allgemeine wiederverwendbare Vorlage.

## Geänderte / verschobene / angelegte Dateien (genau 3)

**Geändert (1):** `tools/app-fabrik-psychosprint.py` (nur `grok-paket`, `sonnet-paket`, deren Self-Test/Hilfetexte).
**Verschoben (1):** `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_grok-gegenkritik_depot-kipppunkt.md` → `tests/scratch/depot-kipppunkt/psychosprint/GROK_AUFTRAG.md`.
**Angelegt (1):** `docs/steering/patches/AP-app-fabrik-09d_grok-werkstatt-ablage_Ergebnis.md` (diese Datei).

Nicht geändert: alle Rohentwürfe, `GROK_EINGABE_ANONYMISIERT.md`, `ANONYMISIERUNGSMANIFEST.md`, `grok-gegenkritik.md`, Sonnet-Vorlage, Startlinie, Mockup-Vertrag, Apps, Theme, Engine, Daten, Build.

## Teil A — Move (bytegleich, mit Hash-Nachweis)

Vor dem Move geprüft: Quelle vorhanden, Ziel frei, `grok-gegenkritik.md` vorhanden.
- Quelle/Ziel SHA-256: `9494bcd352a94bd69cec3c08abdc4ee2f719058eeb333a4aa826df4b878b71c5` (bytegleich).
- `grok-gegenkritik.md` SHA-256 vor **und** nach dem Move: `0d2b63a832c15a53c3419fc30d2eae6c31183922198e0b3bb882879a79c8e1ad` (unverändert).
- Nach dem Move: Archivquelle weg, `GROK_AUFTRAG.md` vorhanden.

## Teil B — Werkzeug-Diff (nur betroffene Stellen, `# NEW` markiert)

- `grok-paket`: app-spezifischer Grok-Auftrag wird jetzt nach `tests/scratch/<slug>/psychosprint/GROK_AUFTRAG.md` geschrieben (Variable `auftrag_out`, Label „Grok-Auftrag"); **keine** Archiv-Ausgabe eines app-spezifischen Grok-Auftrags mehr. Die allgemeine Vorlage `AP-app-fabrik-09_grok-gegenkritik_VORLAGE.md` bleibt die einzige wiederverwendbare Archiv-Promptquelle (`TPL_REL["grok"]`).
- `sonnet-paket`: liest Groks Ergebnis jetzt aus `tests/scratch/<slug>/psychosprint/grok-gegenkritik.md` (nicht mehr `qualitative-gegenkritik.md`); Fehlermeldung entsprechend angepasst.
- Self-Test: legt das Gutachten unter `grok-gegenkritik.md` an; Hilfetext von `grok-paket` auf „Grok-Auftrag (Werkstatt)" aktualisiert.
- Unverändert erhalten: Dry-Run, Nicht-Überschreiben, Validierung (Frontmatter + Abschnitte 1–8, Gutachten-Kennzeichnungen), Anonymisierung A=Sol/B=Fable, SHA-256, Root-Schutz, UTF-8, Exit-Codes.

## Beweise

- **Self-Test:** `--self-test` → `SELF-TEST OK` (inkl. Nicht-Überschreiben, kein Repo-Write). Exit 0. Das durch den Python-Lauf entstandene `tools/__pycache__/` wieder entfernt.
- **Depot-Dry-Run:** `sonnet-paket --slug depot-kipppunkt` (ohne `--write`) → Validierung OK, akzeptiert `grok-gegenkritik.md`, nennt **genau** `tests/scratch/depot-kipppunkt/mockup-duell/SONNET_EINGABEPAKET.md` und `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_mockup-duell-sonnet_depot-kipppunkt.md`. Exit 0.
- **Archiv-Negativ (Beweis 3):** Kein aktiver App-spezifischer Grok-Auftrag ins Archiv mehr; einziger Archiv-Grok-Bezug ist die allgemeine Vorlage. `GROK_AUFTRAG` nur in der Werkstatt.
- **Move-Invarianten (Beweis 4):** Archivquelle fehlt; `GROK_AUFTRAG.md` existiert (bytegleich); `grok-gegenkritik.md` per Hash unverändert.
- **git diff --check:** eine Ausgabe — Trailing Whitespace auf `APP_FACTORY_STARTLINIE.md:3` (`**Stand:**`). Diese `  `-Endung ist committete Markdown-Header-Konvention (aus AP-08); **AP-09d hat `APP_FACTORY_STARTLINIE.md` überhaupt nicht angefasst**, die Fundstelle ist vollständig vorbestehend und außerhalb dieses AP. Die CRLF-Meldungen sind normale Windows-Zeilenendhinweise. Keine Fundstelle betrifft AP-09d-Änderungen; die Tool-Datei ist whitespace-frei geprüft.

## Verbliebene Grenzen

- Der Auftragstext (allgemeine Grok-Vorlage und der bytegleich verschobene `GROK_AUFTRAG.md`) weist Grok intern noch an, sein Ergebnis nach `qualitative-gegenkritik.md` zu schreiben, während `sonnet-paket` es aus `grok-gegenkritik.md` liest. Für depot-kipppunkt liegt das Ergebnis bereits korrekt unter `grok-gegenkritik.md`, praktisch also stimmig. Die Angleichung des Vorlagen-Wortlauts (`qualitative-gegenkritik.md` → `grok-gegenkritik.md`) liegt außerhalb dieses AP-Schreibscopes (allgemeine Grok-Vorlage nicht änderbar) und gehört in einen Folge-AP.

## Nächster zulässiger Schritt

- **Nächster zulässiger Schritt:** `sonnet-paket` für depot-kipppunkt mit `--write`.
- **Ausdrücklich nicht der nächste Schritt:** neuer Psychosprint, neuer Grok-Lauf, APP_SPEC oder Produktionscode.
