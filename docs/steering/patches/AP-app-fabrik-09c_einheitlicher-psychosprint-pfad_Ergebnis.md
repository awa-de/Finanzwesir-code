Stand: 2026-07-18 09:44 | Session: AP-app-fabrik-09c | Geändert von: Claude

# AP-app-fabrik-09c — Einheitlichen Psychosprint-Pfad wiederherstellen — Ergebnis

Risikoklasse: B (Korrektur einer Fehlableitung; Doku + begrenzte Werkzeugänderung). Schutzgut: die Vergleichbarkeit Sol gegen Fable — beide müssen denselben Denkauftrag bekommen.

## Fehlerursache

AP-app-fabrik-09 hatte Sol und Fable **unterschiedliche Modellrollen/Kreativfoki** gegeben („Sol-Fokus: ruhige Selbsterkenntnis", „Fable-Fokus: dramaturgische Transformation") — als getrennte Vorlagen und als getrennte Prompt-Ziele. Das verfälscht den psychologischen Vergleich: unterschiedliche Denkaufträge machen die zwei Rohentwürfe nicht mehr fair vergleichbar. Beschluss: Sol und Fable erhalten **dieselbe** vollständige Mini-Spec und **denselben** vollständigen, modellneutralen Psychosprint-Grundprompt (Basis AP-app-fabrik-06). Einziger Unterschied außerhalb des Denkauftrags: Teilnehmer-ID (sol/fable) und Rohdatei (01-sol.md/02-fable.md).

## Geänderte / verschobene / angelegte Dateien (genau 6)

**Geändert (2):**
- `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` — nur Punkt 3 (modellneutraler, einheitlicher Psychosprint-Grundprompt auf Basis AP-06 statt „modellgerechte Prompts für Sol und Fable") und Punkt 4 (wortgleich der beschlossene Satz: dieselbe Mini-Spec und exakt derselbe Prompt; nur ID und Zielpfad unterscheiden sich, verändern keinen Denkauftrag). Keine anderen Punkte, kein Kopfdatum geändert. Meine Edits ohne Trailing Whitespace.
- `tools/app-fabrik-psychosprint.py` — nur `prepare` und der zugehörige Self-Test (Details unten); `grok-paket`, `sonnet-paket`, Frontmatter-Validierung, Anonymisierung A=Sol/B=Fable, SHA-256, Nicht-Überschreiben, Root-Schutz, UTF-8, Exit-Codes **funktional erhalten**.

**Verschoben (2, nicht gelöscht):**
- `AP-app-fabrik-09_psychosprint-sol_VORLAGE.md` → `…/obsolet/`
- `AP-app-fabrik-09_psychosprint-fable_VORLAGE.md` → `…/obsolet/`
Vor dem Move Quell- und Zielpfad geprüft (Quellen vorhanden, Ziele frei); danach Quellen weg, Ziele vorhanden bestätigt.

**Angelegt (2):**
- `…/obsolet/README.md` (5 Zeilen, Grund des Moves).
- `docs/steering/patches/AP-app-fabrik-09c_einheitlicher-psychosprint-pfad_Ergebnis.md` (diese Datei).

Nicht geändert: MOCKUP-VERTRAG, Grok-/Sonnet-Vorlage, Apps, tests/scratch, Theme, Engine, Daten, Build, bestehende Psychosprints/Mockups/Ergebnisdateien. Grok- und Sonnet-Teile des Werkzeugs unberührt.

## Werkzeug-Diff (nur prepare)

1. Getrennte Sol-/Fable-Vorlagen aus der Vorlagenzuordnung (`TPL_REL`) entfernt.
2. Neue Konstanten `GRUNDPROMPT_REL` (AP-06-Grundprompt) und `MINI_SPEC_PLACEHOLDER`.
3. `prepare` liest jetzt **ausschließlich** den gemeinsamen Grundprompt und ersetzt **nur** die vollständige Mini-Spec am bestehenden Platzhalter (Platzhalter muss genau einmal vorkommen, sonst FAIL).
4. Neutraler, für beide Modelle identischer Transportanhang (`_transportanhang`): Teilnehmer-ID und Rohdateiziel stehen im Startsatz; die Ausgabe braucht das bestehende `psychosprint-entwurf`-Frontmatter und die Abschnitte 1–8.
5. Bei `--write` nur noch `AP-app-fabrik-09_psychosprint_<slug>.md` + `tests/scratch/<slug>/psychosprint/`. Die getrennten `…-sol_<slug>.md` / `…-fable_<slug>.md` werden **nicht mehr** erzeugt.
6. `prepare` gibt zwei kopierfertige Startzeilen aus, bytegleich bis auf ID (sol/fable) und Rohdatei (01-sol.md/02-fable.md).
7. Self-Test angepasst: legt einen Grundprompt-Stub an, prüft die eine gemeinsame Promptdatei, dass **keine** getrennten Sol-/Fable-Dateien entstehen, und die Startzeilen-Gleichheit. `# NEW`-Markierungen ergänzt.

## Beweise

- **Self-Test:** `python tools/app-fabrik-psychosprint.py --self-test` → `SELF-TEST OK` (prepare, grok-paket, sonnet-paket inkl. Nicht-Überschreiben; kein Repo-Write). Exit 0.
- **Dry-Run:** `prepare --slug risiko-uebersetzer … ` (ohne `--write`) → nennt **genau eine** gemeinsame Promptdatei (`AP-app-fabrik-09_psychosprint_risiko-uebersetzer.md`) und **einen** Werkstattordner; nichts geschrieben. Exit 0.
- **Startzeilen-Gleichheit:** `Startsatz — Teilnehmer-ID: sol; schreibe nach …/01-sol.md` vs. `… fable; … /02-fable.md`. Nach Normalisierung von ID- und Rohdatei-Token identisch — nur diese beiden Spannen weichen ab (im Self-Test aktiv geprüft).
- **Negativprüfung (Beweis 5):** In der Startlinie keine `modellgerechte Psychosprint`-/`Sol-Fokus`-/`Fable-Fokus`-Vorgabe mehr; im Werkzeug keine getrennten Prompt-Ziele als aktive Vorgabe (der einzige Grep-Treffer ist die Self-Test-Wächterzeile, die das alte Verhalten *ausschließt*). Getrennte VORLAGE-Dateien nur noch unter `obsolet/`.
- **git diff --check:** eine einzige Ausgabe — Trailing Whitespace auf `APP_FACTORY_STARTLINIE.md:3` (`**Stand:**`). Diese `  `-Endung ist bereits im committeten HEAD vorhanden (Markdown-Zeilenumbruch des Headers) und wurde von AP-08 (Datumswechsel) berührt, **nicht** von AP-09c; sie liegt außerhalb des zulässigen Scopes (nur Punkt 3/4). Alle AP-09c-Änderungen (Punkt 3/4, Werkzeug, neue Dateien) sind whitespace-frei geprüft.
- `py_compile` fehlerfrei; das durch den Compile-Check entstandene `tools/__pycache__/` wieder entfernt.

## Erhaltene Grok-/Sonnet-Teile

`grok-paket` (Anonymisierung A=Sol/B=Fable, Manifest, SHA-256, Leck-Prüfung) und `sonnet-paket` (unveränderte Zusammenführung mit Prüfsummen) sowie deren Validierungen sind unverändert und im Self-Test grün durchlaufen.

## Nächster zulässiger Schritt

- **Nächster zulässiger Schritt:** `prepare` für die nächste ausgewählte App.
- **Ausdrücklich nicht der nächste Schritt:** Psychosprint, Grok-Lauf, Mockup-Bau, APP_SPEC oder Produktionscode.
