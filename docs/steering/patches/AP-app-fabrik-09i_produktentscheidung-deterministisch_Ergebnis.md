Stand: 2026-07-18 18:35 | Session: AP-app-fabrik-09i | Geändert von: Claude

# AP-app-fabrik-09i — Produktentscheidungen deterministisch — Ergebnis

Status: **GELB** — Implementierung + Self-Test grün; Klasse-C-Reviewbudget noch offen (unabhängiger Gegenreview + finale Freigabe durch Albert).

Risikoklasse C (zentrale Werkzeugkette). Schutzgut: Alberts Alleinentscheidung über Produktfragen — es darf kein Sonnet-Paket entstehen, das eine offene `Produktentscheidung nötig` stillschweigend übergeht.

## Geänderte / angelegte Dateien (genau 4, im Scope)

1. `tools/app-fabrik-psychosprint.py` — Gate in `cmd_sonnet` + drei Self-Test-Fälle (`# NEW (AP-09i)`).
2. Sonnet-Vorlage — neuer Abschnitt „## Produktentscheidungen (Albert)". (Korrigiert AP-09k: lag zum Schreibzeitpunkt unter `Archiv/local/…`; später als AP-09j kanonisiert nach `docs/App-Fabrik/vorlagen/SONNET_MOCKUP-DUELL_VORLAGE.md`.)
3. Masterprompt — Pflichtstopp-Section auf deterministischen Ablauf umgestellt. (Korrigiert AP-09k: lag zum Schreibzeitpunkt als „…(bereinigt).md" unter `Archiv/local/…`; später als AP-09j kanonisiert nach `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`. Keine zweite Kopie.)
4. `docs/steering/patches/AP-app-fabrik-09i_produktentscheidung-deterministisch_Ergebnis.md` (diese Datei).

## Werkzeug-Diff

- Neue Konstanten: `PRODUKTENTSCHEIDUNG_MARKER = "Produktentscheidung nötig"`, `PE_STATUS_RE` (`^Status:\s*(A|B|Bedingung|übersprungen)$`), `PE_UEBERSPRUNGEN_WARNUNG`.
- `cmd_sonnet`, **vor jeder Ausgabe** (nach der Gutachten-Validierung, vor Paketbau/Write):
  - `n_grok` = exakte Vorkommen von `Produktentscheidung nötig` in `grok-gegenkritik.md` (`nicht übernehmen` zählt nicht — deterministische Trennung).
  - `n_grok > 0` und `PRODUKTENTSCHEIDUNGEN.md` fehlt → `FAIL`, kein Write.
  - `n_dec` (gültige `Status:`-Blöcke) `< n_grok` → `FAIL`, kein Write.
  - sonst: Abschnitt `PRODUKTENTSCHEIDUNGEN (Albert)` **unverändert** ans `SONNET_EINGABEPAKET.md` angehängt; jeder `übersprungen`-Eintrag fügt die Standardwarnung ein.
- Alle Bestandsgarantien unverändert: Dry-Run-Default, Nicht-Überschreiben, Frontmatter-/Abschnitts-Validierung, Anonymisierung A=Sol/B=Fable, SHA-256, Root-Schutz, UTF-8, Exit-Codes, Quellensperre-Marker (AP-09g), Werkstatt-Ablage (AP-09f). Keine Änderung an Psychosprint-/Grok-Logik, keine neue Bibliothek, kein Refactoring.

## Vorlagen- / Masterprompt-Diff

- Sonnet-Vorlage: aufgelöste Entscheidungen (`A`/`B`/`Bedingung`) sind bindend + in der Ergebnisdatei zu dokumentieren, keine nicht freigegebene Alternative; `übersprungen`-Warnung ist **sichtbar und unübersehbar im Kopf beider Mockups** zu rendern.
- Bereinigter Masterprompt: Pflichtstopp iteriert über **alle** exakten Treffer, schreibt `PRODUKTENTSCHEIDUNGEN.md` (Format vorgegeben) und verweist auf das blockierende `sonnet-paket`-Gate. ~~Die Phase-3-Zusatzblock-Formulierung bleibt als belt-and-suspenders bestehen~~ **→ überholt (AP-09k):** Die Phase-3-Doppelpaste wurde in AP-09k **entfernt**; die Entscheidung reist ausschließlich deterministisch im `SONNET_EINGABEPAKET.md` (single source). Der aktive Masterprompt verbietet die Doppelpaste ausdrücklich.

## Self-Test (drei Fälle, `--self-test` → `SELF-TEST OK`, Exit 0)

- **Positiv:** ein Treffer + `PRODUKTENTSCHEIDUNGEN.md` (`Status: A`) → grün; `SONNET_EINGABEPAKET.md` enthält `PRODUKTENTSCHEIDUNGEN (Albert)` + Entscheidungswortlaut.
- **Gate-Block:** ein Treffer, keine `PRODUKTENTSCHEIDUNGEN.md` → `FAIL`, **weder** `SONNET_EINGABEPAKET.md` **noch** `SONNET_AUFTRAG.md` erzeugt.
- **Übersprungen:** `Status: übersprungen` → grün, Paket enthält die Standardwarnung.
- Der „ohne offene Entscheidung → grün"-Pfad ist durch den Haupt-Sonnet-Fall (`n_grok=0`) abgedeckt. Bestehende Fälle (Quellensperre, Nicht-Überschreiben, Werkstatt-Ablage, kein Repo-Write) bleiben grün. Kein Repo-Leck (temporärer Root).

## Regressions-Dry-Run — realer Befund

`sonnet-paket --slug depot-kipppunkt` (Dry-Run) meldet jetzt korrekt `FAIL`: depots `grok-gegenkritik.md` enthält **1×** `Produktentscheidung nötig`, es existiert keine `PRODUKTENTSCHEIDUNGEN.md`. Das ist **kein Regressionsfehler**, sondern das Gate, das greift — und ein echter historischer Befund: depots bereits gebaute Mockups (`a-sol/`, `b-fable/`) entstanden **pre-09i ohne dieses Gate**, also mit einer offenen Produktentscheidung. → **Follow-up für Albert** (nicht in diesem AP-Scope, depot-Werkstatt wird nicht angefasst): entweder `PRODUKTENTSCHEIDUNGEN.md` für depot nachziehen oder die depot-Mockups bewusst als „vor Gate gebaut" markieren.

## Beweise / QA

- `py_compile` fehlerfrei; Tool whitespace-frei; `tools/__pycache__/` entfernt.
- `git diff --check`: einzige Fundstelle `APP_FACTORY_STARTLINIE.md:3` — vorbestehende Header-Konvention aus AP-08, **von 09i nicht berührt**. Die geänderte Tool-Datei ist untracked (git prüft sie nicht) und wurde separat whitespace-frei geprüft.

## Reviewbudget (Klasse C) — Stand

Entwurf + Implementierung + Self-Test (inkl. Negativfälle) erledigt. **Ausstehend:** unabhängiger Gegenreview und finale Freigabe durch Albert. Erst danach GRÜN.

## Nächster zulässiger Schritt

- Albert: Gegenreview + Freigabe; Entscheidung zum depot-Follow-up.
- Kein Werkzeuglauf mit `--write` gegen echte App-Werkstätten in diesem AP. Kein Commit durch Claude.
