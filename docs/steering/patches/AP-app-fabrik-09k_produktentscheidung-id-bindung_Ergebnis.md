Stand: 2026-07-18 20:26 | Session: AP-app-fabrik-09k | Geändert von: Claude

# AP-app-fabrik-09k — Produktentscheidungen: ID-Bindung statt Zählung — Ergebnis

Status: **GRÜN** — freigegeben durch Albert am 2026-07-18. Klasse-C-Reviewbudget vollständig: Entwurf → Self-Test → unabhängiger Gegenreview (ChatGPT: Go) → Fix-Batch (zwei Low-Findings) → finale Freigabe.

Behebt die vom unabhängigen Review (ChatGPT, 09i-Stand) belegte Kernschwäche: Das 09i-Gate zählte nur `Produktentscheidung nötig`-Vorkommen und akzeptierte dieselbe **Anzahl** beliebiger Status-Blöcke — es band keine Entscheidung an einen konkreten Fund (Scheinsicherheit; „E1 doppelt, E2 fehlt" bestand). Jetzt: **Identität + Vollständigkeit** über eindeutige IDs.

## Für den Peer-Review (frischer Faden)

Diese Datei ist als **eigenständiges Prüfpaket** geschrieben: Ein Reviewer ohne Vorwissen lädt das ganze Konstrukt aus den unten gelisteten Pfaden und prüft es. Repository-Root: `Z:\Documents\Nextcloud\Finanzwesir 2.0`. Alle Prompt-Vorlagen liegen seit AP-09j **getrackt** unter `docs/App-Fabrik/vorlagen/` (vorher gitignored im Archiv — die alten Archiv-Pfade existieren nicht mehr).

**Prüfauftrag:** Beweist die ID-Bindung, dass jede aufgelöste Produktentscheidung **beweisbar** zum konkreten Grok-Fund gehört (nicht nur „eine Entscheidung vorhanden")? Gezielt gegen „E1 doppelt, E2 fehlt", „nicht zuordenbare ID" und „Fund ohne ID". Ist der Sonnet-Auftrag frei vom früheren Wortlaut-Widerspruch? Gibt es noch eine doppelte Quelle für dieselbe Entscheidung?

**Erste Prüfhandlung:** `python tools\app-fabrik-psychosprint.py --self-test` → muss `SELF-TEST OK` liefern (enthält die zwei kritischen Negativfälle).

**Dateibündel (volle Pfade):**

Prozess & Skill
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\skills\app-duell\SKILL.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\skills\app-duell\README.md`  (Debug-/Abhängigkeitskarte)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\MASTERPROMPT_MOCKUP-DUELL.md`

Werkzeug (Kern der Prüfung)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\tools\app-fabrik-psychosprint.py`  (Gate: Funktion `cmd_sonnet`; Parser: `parse_pe_blocks`; Tests: `self_test`)

Vorlagen (getrackt, seit AP-09j)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\vorlagen\PSYCHOSPRINT_GRUNDPROMPT.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\vorlagen\GROK_GEGENKRITIK_VORLAGE.md`  (neue ID-Pflicht E1/E2)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\vorlagen\SONNET_MOCKUP-DUELL_VORLAGE.md`  (Widerspruch aufgelöst)

Verträge & Referenz (Bestand)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\MOCKUP-VERTRAG.md`  (§7)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_STARTLINIE.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\APP-INTERFACE.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\SECURITY-BASELINE.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\README.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\PROTECTED_PATHS.json`

AP-Historie
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\patches\AP-app-fabrik-09i_produktentscheidung-deterministisch_Ergebnis.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\patches\AP-app-fabrik-09j_vorlagen-kanonisieren_Ergebnis.md`
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\patches\AP-app-fabrik-09k_produktentscheidung-id-bindung_Ergebnis.md`  (diese)
- `Z:\Documents\Nextcloud\Finanzwesir 2.0\Archiv\local\muss noch eingeordnet werden\App-Fabrik\claude_prompt_AP-app-fabrik-09k_produktentscheidung-id-bindung.md`  (der AP-Auftrag)

## Werkzeug-Diff (`tools/app-fabrik-psychosprint.py`)

- Neue Regexe/Parser: `PE_GROK_ID_RE` (`Produktentscheidung nötig [E<k>]`), `PE_DEC_HEAD_RE` (`## E<k>`), `PE_STATUS_LINE_RE`, Helfer `parse_pe_blocks` (je Block genau eine gültige Status-Zeile).
- `cmd_sonnet`-Gate (vor jeder Ausgabe) prüft jetzt **Mengen-Gleichheit** statt Zählung:
  - Grok-Fund ohne `[E<k>]` → `FAIL` (nicht zuordenbar).
  - doppelte ID in Grok **oder** in `PRODUKTENTSCHEIDUNGEN.md` → `FAIL`.
  - `PRODUKTENTSCHEIDUNGEN.md` fehlt → `FAIL`.
  - `set(dec_ids) != set(grok_ids)` (Lücke oder Extra) → `FAIL` (nennt fehlend/zusätzlich).
  - je Block ≠ genau eine gültige Status-Zeile → `FAIL`.
  - sonst: Abschnitt `PRODUKTENTSCHEIDUNGEN (Albert)` unverändert ins `SONNET_EINGABEPAKET.md`; `übersprungen` → Standardwarnung.
- Bei jedem `FAIL` entsteht weder `SONNET_EINGABEPAKET.md` noch `SONNET_AUFTRAG.md`. Alle Bestandsgarantien unberührt (Quellensperre, Nicht-Überschreiben, Anonymisierung, Root-Schutz, Werkstatt-Ablage, Vorlagen unter `docs/App-Fabrik/vorlagen/`).

## Vorlagen- / Masterprompt-Diff

- **Grok-Vorlage** (`docs/App-Fabrik/vorlagen/GROK_GEGENKRITIK_VORLAGE.md`): jede Produktentscheidung zwingend als `Produktentscheidung nötig [E<k>] für Entwurf A|B: <Fund>` (eindeutige ID); Abschnitt 4 entsprechend.
- **Sonnet-Vorlage**: Widerspruch aufgelöst — `nicht übernehmen` → dokumentieren, nicht bauen; `Produktentscheidung nötig` **nicht** aus dem Gutachten bauen, erst durch Alberts Freigabe; freigegeben (A/B/Bedingung) → **exakt** so bauen; offen/`übersprungen` → nicht bauen (Warnung im Mockup-Kopf); `SONNET_EINGABEPAKET.md` = einzige Wahrheit.
- **Masterprompt**: Pflichtstopp auf IDs + Mengen-Gleichheit; die Phase-3-Doppelpaste („Zusätzliche, ausdrückliche Entscheidung von Albert") **entfernt** (Entscheidung reist nur noch im Eingabepaket, single source).
- **09i-Ergebnisdatei**: stale Pfadangaben auf die real vorhandenen kanonischen Dateien korrigiert (keine zweite Kopie).

## Self-Test (sechs ID-Fälle, `--self-test` → `SELF-TEST OK`, Exit 0)

- **OK:** E1+E2 vollständig aufgelöst → grün; beide Entscheidungen im Paket.
- **FAIL (der bisher fehlende Beweis):** E1 doppelt in `PRODUKTENTSCHEIDUNGEN.md`, E2 fehlt → `FAIL`, keine Ausgabe.
- **FAIL:** doppelte **Grok**-ID (E1 zweimal im Gutachten) → `FAIL`, keine Ausgabe. *(Peer-Review-Nachtrag: eigener Testfall `pe-gdup`.)*
- **FAIL:** nicht zuordenbare ID (`## E9`, Grok kennt nur E1) → `FAIL`, keine Ausgabe.
- **FAIL:** Grok-Fund ohne `[E<k>]`-ID → `FAIL`, keine Ausgabe.
- **Übersprungen:** E1 `Status: übersprungen` → grün, Warnung im Paket.
- Alle Bestandsfälle (Quellensperre, Nicht-Überschreiben, Werkstatt-Ablage, kein Repo-Write, `grok_total=0`-Pfad) bleiben grün.

## Peer-Review-Nachtrag (ChatGPT, frischer Faden)

Der unabhängige Gegenreview gab **Go** für die ID-Bindung und zwei Low-Findings, die 100-%-halber sofort behoben wurden:
1. Eigener Self-Test-Fall für **doppelte Grok-ID** ergänzt (bisher nur doppelte Entscheidungs-ID getestet; die Gate-Prüfung existierte, hatte aber keinen dedizierten Test).
2. Historik-Korrektur: Die 09i-Ergebnisdatei behauptete noch, die Phase-3-Doppelpaste bleibe bewusst bestehen — als überholt markiert (in AP-09k entfernt; der aktive Masterprompt verbietet sie).

## Regression / realer Befund

- `prepare --slug depot-kipppunkt` (Dry-Run) grün (Grundprompt am neuen Ort, kein PE-Gate).
- `sonnet-paket --slug depot-kipppunkt` (Dry-Run) blockt jetzt mit präzisem Grund: „1 Grok-Fund 'Produktentscheidung nötig' ohne [E<k>]-ID". **Depot-Kipppunkt ist ein bewusster Vor-Gate-Fall** (sein Gutachten stammt aus der Zeit ohne ID-Pflicht). → Follow-up für Albert (depot-Werkstatt in diesem AP nicht angefasst): entweder Grok-Funde in depots `grok-gegenkritik.md` mit IDs nachziehen + `PRODUKTENTSCHEIDUNGEN.md` schreiben, oder depot als „vor Gate gebaut" markieren. Nicht still vergessen.

## QA

- `py_compile` grün; Tool whitespace-frei; `tools/__pycache__/` entfernt.
- `git diff --check`: nur `APP_FACTORY_STARTLINIE.md:3` (vorbestehend aus AP-08, von 09k nicht berührt).

## Reviewbudget (Klasse C) — abgeschlossen

Entwurf + Implementierung + Self-Test (inkl. der kritischen Negativfälle) + unabhängiger Gegenreview (ChatGPT: Go) + Fix-Batch (zwei Low-Findings) + **finale Freigabe durch Albert am 2026-07-18**. → GRÜN.

## Nächster Schritt

- Offen (nicht blockierend): depot-Kipppunkt-Follow-up — bewusster Vor-Gate-Fall, entweder IDs nachziehen oder als „vor Gate" markieren.
- Kein `--write` gegen echte App-Werkstätten in diesem AP. Kein Commit durch Claude.
