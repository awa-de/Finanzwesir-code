PATCH-QUITTUNG | AP RITUAL-OPT-2 (Punkt 9 — DECISION-LOG read-frei + BACKLOG-ARCHIV Jahres-Split) | 2026-07-12

**Beauftragt:** Ursprünglich als „geringer Wert, nur wenn Zeit" zurückgestellt; auf Nachfrage von Albert jetzt fertiggestellt, ausdrücklich „mit derselben Sorgfalt wie bei großen Dingen" inkl. Regressionsprüfung.

**Teil 1 — BACKLOG-ARCHIV.md Jahres-Split:**

Befund vor dem Patch: Datei war 145,4 KB / 219 Zeilen (der im eigenen Header dokumentierte Trigger „>200 Zeilen" war bereits überschritten — reale Schätzung „36k" aus einer früheren Session war veraltet). `tools/rotate-log.py` (bestehend, für `session-log.md`) passt strukturell nicht — es erwartet Header-Blöcke (`## `/`### `), `BACKLOG-ARCHIV.md` ist aber eine reine Markdown-Tabelle. Zusätzliches Risiko erkannt: die Datei dokumentiert selbst, dass ihr Altbestand vor 2026-07-12 in umgekehrter chronologischer Reihenfolge steht — eine rein positionsbasierte „letzte N Zeilen"-Rotation hätte dort teils neuere Zeilen archiviert und ältere aktiv gelassen und damit den Datumsfilter aus Punkt 7 (`Archiv-seit-Log`, liest nur die aktive Datei) still falsch gemacht.

Neues Tool `tools/rotate-table-log.py`: wählt Zeilen zur Archivierung nach **Datum** (global älteste zuerst), nicht nach physischer Position — genau das schließt das obige Risiko aus. Vor dem Echtlauf mit einem synthetischen Fixture getestet, das exakt dieses Reverse-Order-Szenario nachstellt (physisch erste, aber chronologisch neueste Zeile) — korrekt behalten, nicht archiviert.

Albert hat sich per Rückfrage für die aggressive, größenbasierte Variante entschieden (`--keep-last 190 --max-kb 30`, da Modell-Kontext-Lesekosten nach Punkt 1/7 ohnehin entfallen, aber Datei-Hygiene trotzdem gewünscht). Ergebnis: 219 → 12 aktive Zeilen (27 KB), 207 Zeilen nach `docs/steering/BACKLOG-ARCHIV-2026.md` verschoben (Daten 2026-05-04 bis 2026-07-07). Verifiziert: 12 + 207 = 219 (keine Zeile verloren), keine Dubletten (Duplikat-Check über beide Dateien), Tabellenstruktur beider Dateien intakt (Kopf-/Trennzeile korrekt).

**Regression gefunden und mitbehoben:** `tools/kassensturz-archiv-query.py` (bestehend, für `/kassensturz`) las ausschließlich die aktive Datei — nach der Rotation hätte eine `--since`-Abfrage vor dem Rotations-Schnitt (z. B. bei einer älteren `Kassensturz-Datum`-Marke) Treffer aus dem neuen Segment still verloren. Behoben: Tool scannt jetzt zusätzlich alle `BACKLOG-ARCHIV-YYYY.md`-Segmente mit Jahr ≥ `--since`-Jahr. Zusätzlich einen zweiten, unabhängigen Bug im selben Skript gefunden und mitbehoben: fehlende UTF-8-Stdout-Kodierung (alle anderen `tools/*.py` haben das Reconfigure-Pattern, dieses Skript hatte es nicht) — Absturz bei AP-IDs mit Sonderzeichen (z. B. „→" in `AP-tailwind-01 → Fable-Baukasten-Freigabe"), vorbestehend, aber durch meinen eigenen Testlauf aufgedeckt.

Testprotokoll (nach Fix): `--since 2025-01-01` (vor allen Daten) liefert exakt 219 Treffer — Beweis, dass durch die Rotation keine Zeile für Abfragen verloren geht. `--since 2026-05-15` (vor dem Rotations-Schnitt) findet korrekt Segment-Treffer. `--since 2026-07-06` (heutiges reales Kassensturz-Datum) läuft ohne Absturz. `--since 2027-01-01` (Zukunft, kein Segment) liefert 0 ohne Crash.

**Teil 2 — DECISION-LOG.md read-frei:**

Befund: `DECISION-LOG.md`-Einträge sind mehrzeilige Blöcke (`## D-XX` + mehrere `####`-Unterabschnitte), keine Einzelzeilen wie `BACKLOG-ARCHIV.md`. `tools/append-log-line.py` lehnt jeden Text mit Zeilenumbruch explizit ab — direkte Wiederverwendung wäre der falsche Griff gewesen.

Neues Tool `tools/append-block.py`: read-frei (Modell liest die Zieldatei nie), Block-Text kommt aus einer separaten Datei (`--block-file`, per Write-Tool vorbereitet) statt als Kommandozeilen-Argument — vermeidet Shell-Escaping-Probleme mit Anführungszeichen/Backticks in Decision-Texten. Fügt automatisch die bestehende „---"-Trennlinien-Konvention ein. Getestet: Append an nicht-leere Datei, Dublettensperre, leere Block-Datei (FAIL), fehlende Zieldatei (FAIL) — alle grün, korrekte Formatierung gegen die reale Trennlinien-Konvention verglichen.

`DECISION-LOG.md` selbst nur um eine kurze „Anhängen:"-Zeile in der Kopf-Metadatei ergänzt (Nutzungshinweis auf das neue Tool) — kein bestehender Eintrag inhaltlich verändert, keine neue Decision hinzugefügt (kein realer Anlass dafür in diesem Patch).

**Geändert:** 6 Dateien (4 neu/verschoben, 2 bestehende korrigiert), ca. 9 Stellen

**Dateien:**
- `tools/rotate-table-log.py` (NEU)
- `tools/append-block.py` (NEU)
- `docs/steering/BACKLOG-ARCHIV-2026.md` (NEU, Rotations-Segment)
- `docs/steering/BACKLOG-ARCHIV.md` (CHANGED — Stand-Zeile + Intro-Absatz korrigiert, 207 Zeilen ausgelagert)
- `docs/steering/DECISION-LOG.md` (CHANGED — Stand-Zeile + „Anhängen"-Hinweis)
- `tools/kassensturz-archiv-query.py` (CHANGED — Segment-Scan + UTF-8-Fix)

**CHANGED/NEU:** N/A für Markdown; Python-Tools sind Neubau bzw. per Docstring-Kommentar im Diff selbst begründet.

**Tabu-Check:** keine ✓ — keine der Dateien in Tabu-Zonen/`PROTECTED_PATHS.json`.

**Gate-Typ:** Full (docs/steering/-Änderungen, Steuerungsdaten-Verschiebung).

**Testfall:** Alle Prüfungen bereits oben im Testprotokoll dokumentiert (Zeilenerhaltung, Dubletten-Freiheit, Reverse-Order-Fixture, kassensturz-Regressionstest über 4 Datumsfenster). Zusätzlich empfohlen: nächster realer `/kassensturz`-Lauf zur Bestätigung im echten Ablauf (nicht nur isoliert).

**Offene Fragen:** keine. RITUAL-OPT-2 ist damit vollständig (Punkte 6, 7, 8, 9 alle erledigt).

Zählprüfung: Ich habe 6 Dateien geändert (2 davon mit eingebauter Regressionskorrektur, die nicht ursprünglich beauftragt war, aber durch die Rotation notwendig wurde). Aufzählen?
→ Bitte gegenlesen, insbesondere den kassensturz-Regressionsfund. Danach ist RITUAL-OPT-2 bereit für Abschluss-Ritual + Commit.
