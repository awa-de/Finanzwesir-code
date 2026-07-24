Stand: 2026-07-23 | AF-GM-02 + AF-GM-02b + AF-GM-03 + AF-GM-03-Inhaltsgate-Nachputz + AF-GM-02c | Geändert von: Claude

# Golden-Master-Trace-Recorder (AF-GM-02) + Eingabepaket-Werkzeuge (AF-GM-03)

Schmaler Nachweisweg für abgenommene Golden Masters: gepinnter Playwright-Chromium-Recorder, projekt-eigenes `behavior-trace.json`, Screenshots und ein Verifizierer. Kein CI, kein Dashboard, keine Browsermatrix, kein zweiter Produktiv-Laufzeitpfad — siehe `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` §6 und `docs/App-Fabrik/01_DECISION_LOG.md` AF-PROD-04.

## Dateien

| Datei | Zweck |
|---|---|
| `record.mjs` | Führt eine menschlich vorgegebene Aktionsliste gegen eine Fixture aus, zeichnet `behavior-trace.json` + Screenshots auf |
| `verify.mjs` | Spielt einen `behavior-trace.json` real gegen die referenzierte Fixture ab, fail-closed bei jeder Abweichung |
| `browser-path.mjs` | Einziger, hartkodierter Chromium-Pfad; setzt `PLAYWRIGHT_BROWSERS_PATH` vor dem Laden von Playwright |
| `validate_schema.py` | Reine Strukturprüfung eines `behavior-trace.json` gegen `behavior-trace.schema.json` (kein Browser, kein `jsonschema`-Paket nötig) |
| `behavior-trace.schema.json` | Bindende Feldform des Trace-Vertrags |
| `generate_package.py` | AF-GM-03: erzeugt aus einer deklarativen Eingabe-Spec die acht Pflichtdateien eines Golden-Master-Eingabepakets (`docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` §5). Erfindet keine Inhalte, nur Hashing/Formatierung |
| `validate_package.py` | AF-GM-03: prüft ein Eingabepaket auf Pflichtdateien, Grammatik, Hashes, deklarierte Quellen, Annahmenstatus und `behavior-trace.json` (wiederverwendet `validate_schema.py`) |
| `protected_diff_check.py` | AF-GM-03: prüft eine Dateiliste gegen `.claude/PROTECTED_PATHS.json`, fail-closed bei jedem `forbidden`-Treffer. Ändert nichts, ersetzt keine manuelle Unlock-/Relock-Entscheidung |
| `repo_path_guard.py` | AF-GM-03-Inhaltsgate: gemeinsame Pfad-/Leseschutzgrenze für `generate_package.py` und `validate_package.py` — kein absoluter Pfad, kein `..`, muss innerhalb des Repo-Roots liegen, kein explizit lesegesperrter Pfad laut `.claude/PROTECTED_PATHS.json` |

## Browserweg

Ausschließlich Chromium, lokal unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers` — bewusst **nicht** unter `node_modules/playwright-core/.local-browsers`, weil `Z:\` NAS-/Nextcloud-Sync-Ablage ist und Browser-Binaries dort nicht hingehören (AF-GM-02-Nachputz, 2026-07-23). Der Pfad ist in `browser-path.mjs` hartkodiert und wird von `record.mjs`/`verify.mjs` vor jedem `import('playwright')` gesetzt — kein manuelles Exportieren nötig, kein stiller Fallback auf `%USERPROFILE%\AppData\Local\ms-playwright` oder `node_modules/playwright-core/.local-browsers`. Beide Skripte prüfen `chromium.executablePath()` und brechen ab, falls die Laufzeit nicht aus diesem Ordner stammt.

Installation (einmalig, außerhalb der Skripte — hier muss der Pfad manuell gesetzt werden):

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = 'C:\Tools\finanzwesir-playwright\af-gm-02\browsers'
npx playwright install chromium
```

## Aufnahme

```bash
node tools/golden-master/record.mjs \
  <action-script.json> <normal|reduced> <output-trace.json> <screenshot-dir>
```

`<action-script.json>` ist eine menschlich vorgegebene, geordnete Aktionsliste (Beispiel: `tests/golden-master/action-scripts/minimal.actions.json`; für Eingabefelder/Schieberegler: `tests/golden-master/action-scripts/input-controls.actions.json`). Zulässige Aktionstypen: `click`, `observe-text`, `observe-attribute`, `observe-class`, `set-input-value`. Der Recorder erfindet keine Aktionen — er führt nur aus, was im Action-Script steht, und zeichnet den dabei beobachteten Zustand auf.

**`set-input-value`** (AF-GM-02b): setzt den DOM-Wert eines nativen `<input>` (mindestens `type="number"`/`type="range"`) und löst ein bubbelndes `input`-Event aus. Erfordert genau ein Treffer-Element vom Tag `INPUT`, sonst harter Fehler (`GM-ERR-INPUT-TARGET-INVALID`, siehe Verifikationstabelle). Der Trace speichert den angeforderten `value` **und** den danach real beobachteten `expected`-Wert getrennt — so bleiben Normalisierung/Begrenzung durch das Ziel-Element sichtbar. `value` muss ein nichtleerer String sein; Schema und `validate_schema.py` lehnen jeden anderen Wert ab. Interpretiert kein Mockup-JavaScript und keine Berechnung — nur die vorgegebene Bedienhandlung plus sichtbarer DOM-Wert danach.

## Verifikation

```bash
node tools/golden-master/verify.mjs <behavior-trace.json>
```

Fail-closed mit stabiler Fehler-ID:

| Fehler-ID | Bedeutung |
|---|---|
| `GM-ERR-HASH-MISMATCH` | Referenzierte Fixture weicht vom im Trace gespeicherten SHA-256 ab |
| `GM-ERR-SELECTOR-NOT-FOUND` | Ein Aktions- oder Endzustand-Selector löst zur Laufzeit nicht auf |
| `GM-ERR-STATE-MISMATCH` | Beobachteter Zustand weicht vom im Trace hinterlegten Belegwert ab (deckt auch manipulierte Aktionen ab) |
| `GM-ERR-INPUT-TARGET-INVALID` | `set-input-value`-Selector trifft nicht genau ein Element oder das Element ist kein natives `<input>` (AF-GM-02b) |
| `GM-ERR-TARGET-URL-NOT-LOCAL` | `--target-url` ist keine gültige lokale Loopback-URL (AF-GM-02c) |
| `GM-ERR-CLI-ARGS-INVALID` | Aufruf entspricht weder `<trace>` noch `<trace> --target-url <url>` (fehlender Wert, unbekanntes Argument, doppeltes `--target-url`) — bricht vor Hash-Prüfung, Browserstart und Zielnavigation ab (AF-GM-02c-Fix) |
| `GM-ERR-UNEXPECTED` | Unerwarteter Laufzeitfehler (Auffangnetz, kein Ersatz für die vier obigen) |

## Target-Replay gegen lokale URL (AF-GM-02c)

```bash
node tools/golden-master/verify.mjs <behavior-trace.json> --target-url <url>
```

Ohne `--target-url` bleibt das Verhalten bytegleich zum bisherigen `file://`-Fixture-Replay. Mit gesetzter Option wird nach dem unveränderten Hash-Check (immer zuerst gegen `trace.referencePath`) dieselbe Trace-Spur — gleiche Aktionen, gleiche Selector-Auflösung, gleiche beobachteten Werte, gleicher Endzustand — gegen die Ziel-URL statt gegen die Datei abgespielt. Die Ziel-URL ist keine neue Trace-Eigenschaft; Schema und bestehende Spuren bleiben unverändert.

**Lokalitätsgrenze:** ausschließlich `http:` mit Host exakt `localhost`, `127.0.0.1` oder `[::1]` (ein Port ist erlaubt, kein Userinfo). Geprüft über `new URL()` und eine feste Whitelist, nicht über einen Regex auf dem rohen String. Jede Abweichung — anderes Schema, anderer Host, Zugangsdaten, ungültige Syntax — bricht mit `GM-ERR-TARGET-URL-NOT-LOCAL` ab, **bevor** ein Browser gestartet oder eine Navigation ausgelöst wird.

**Testhilfe.** `tests/golden-master/local-target-server.mjs` liefert Dateien aus einem festen lokalen Ordner über `node:http` auf einem dynamisch vergebenen `127.0.0.1`-Port aus (kein neues Paket, kein Dauerprozess). `tests/golden-master/target-replay-check.mjs` ist ein deterministischer Treiber, der den Server startet, `verify.mjs` mit `--target-url` als Kindprozess ausführt, den Server danach garantiert schließt (auch bei Fehlern) und den Kindprozess-Exit-Code weiterreicht:

```bash
node tests/golden-master/target-replay-check.mjs <serve-dir> <serve-file> <trace-path>
```

Beispiel Positivlauf (referenziert dieselbe Fixture, die die Spur bereits per Hash-Check gegen die Datei prüft — hier zusätzlich über HTTP ausgeliefert):

```bash
node tests/golden-master/target-replay-check.mjs tests/fixtures/golden-master-trace fixture.html tests/golden-master/traces/minimal-normal.behavior-trace.json
```

Für Negativnachweise dienen zwei eigene synthetische Ziel-Fixtures unter `tests/fixtures/golden-master-target-replay/` (`target-state-mismatch.html`, `target-missing-selector.html`), die mit derselben Spur `minimal-normal.behavior-trace.json` abgespielt werden, aber am Ziel abweichende Werte bzw. einen fehlenden Selector liefern.

## Strukturprüfung ohne Browser

```bash
python tools/golden-master/validate_schema.py <behavior-trace.json> [...]
```

## Nicht zulässig

Kein ausführbares JavaScript in `behavior-trace.json`. Kein Lesen oder Übernehmen von Mockup-JavaScript, Datenmodell, Berechnungen oder Modulstruktur — nur deklarative Beobachtungen (`docs/App-Fabrik/MOCKUP-VERTRAG.md` §6.1). Kein Aufbau einer allgemeinen Testplattform.

## Eingabepaket-Werkzeuge (AF-GM-03)

Deterministische Werkzeuge für das Golden-Master-Eingabepaket (`Apps/{slug}/factory-runs/{run-id}/`, acht Pflichtdateien: `acceptance.json`, `source-manifest.json`, `blueprint.json`, `behavior-trace.json`, `assumption-ledger.json`, `asset-manifest.json`, `data-manifest.json`, `production-plan.md`). Es gibt bis heute keinen abgenommenen Golden Master — Testdaten liegen ausschließlich unter `tests/golden-master/`, nie unter `Apps/`.

Erzeugen aus einer deklarativen Spec (Beispielformat: `tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec.json`):

```bash
python tools/golden-master/generate_package.py <package-spec.json> <output-dir>
```

Validieren:

```bash
python tools/golden-master/validate_package.py <package-dir>
```

Fail-closed mit stabiler Fehler-ID:

| Fehler-ID | Bedeutung |
|---|---|
| `GM03-ERR-MISSING-FILE` | Eine der acht Pflichtdateien fehlt |
| `GM03-ERR-MISSING-FIELD` | Ein Pflichtfeld fehlt (Acceptance, Source-/Asset-/Data-Manifest, Annahme) |
| `GM03-ERR-INVALID-GRAMMAR` | `acceptanceId` oder ein SHA-256-Feld verletzt die Grammatik |
| `GM03-ERR-INVALID-JSON` | Eine Manifestdatei ist kein valides JSON |
| `GM03-ERR-PATH-NOT-FOUND` | Ein deklarierter Pfad existiert real nicht |
| `GM03-ERR-HASH-MISMATCH` | Ein deklarierter SHA-256 weicht vom real berechneten Hash ab |
| `GM03-ERR-UNDECLARED-SOURCE` | Ein verwendeter Pfad steht nicht in `source-manifest.json` |
| `GM03-ERR-ASSUMPTION-BLOCKED` | Eine Annahme hat Status `blocked` — stoppt die Validierung |
| `GM03-ERR-ASSUMPTION-UNKNOWN-STATUS` | Eine Annahme hat einen Status außerhalb des zulässigen Vertrags |
| `GM03-ERR-TRACE-INVALID` | `behavior-trace.json` verletzt den AF-GM-02-Vertrag |
| `GM03-ERR-TRACE-ACCEPTANCE-MISMATCH` | `behavior-trace.json.referencePath`/`referenceSha256` binden nicht dasselbe Mockup wie `acceptance.json.mockupPath`/`mockupSha256` |
| `GM03-ERR-PATH-OUTSIDE-REPO` | Ein Quellpfad ist leer, absolut, enthält `..` oder liegt nach Auflösung außerhalb des Repository-Roots |
| `GM03-ERR-SOURCE-READ-FORBIDDEN` | Ein Quellpfad ist laut `reason`-Feld in `.claude/PROTECTED_PATHS.json` explizit lesegesperrt (Beispiel: `Active Campaign Liste/`) |
| `GM03-ERR-SOURCE-NOT-PERMITTED` | Eine Quelle hat `permitted` ≠ Boolean `true` — stoppt Generator **und** Validator |
| `GM03-ERR-PRODUCTION-PLAN-INCOMPLETE` | `production-plan.md` fehlt eine der vier Pflichtüberschriften (`## AP-Reihenfolge`, `## Erlaubte Pfade`, `## Tests`, `## Manuelle Ghost-Abnahme`) |
| `GM03-ERR-SOURCE-CONSUMER-ROLE-INVALID` | Ein Quelleneintrag hat kein `consumerRole` oder einen Wert außerhalb von `tool-only`/`production-llm` (AF-PROD-01) |
| `GM03-ERR-SOURCE-LLM-FORBIDDEN` | Eine Quelle unter `tests/scratch/**` oder der rohe Golden-Master-Snapshot (`acceptance.json.mockupPath`) trägt `consumerRole: "production-llm"` — Werkstatt/roher Snapshot dürfen den Werkzeugen dienen, aber nie automatisch Produktionsquelle des LLMs sein (AF-PROD-01) |

**Trace-Bindung:** Der Validator vergleicht nach der Trace-Strukturprüfung `behavior-trace.json.referencePath`/`referenceSha256` exakt gegen `acceptance.json.mockupPath`/`mockupSha256`. Die Positivfixture verwendet dafür einen Trace, der real mit `record.mjs` gegen ihr eigenes `synthetic-mockup.html` aufgezeichnet wurde (`tests/golden-master/action-scripts/af-gm-03-synthetic.actions.json` → `tests/golden-master/traces/af-gm-03-synthetic.behavior-trace.json`) — kein erfundener und kein von einer anderen Fixture kopierter Trace.

**Verbraucherrolle je Quelle (AF-PROD-01, `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` §1):** Jeder Eintrag in `source-manifest.json` trägt zusätzlich zu `path`/`sha256`/`role`/`permitted` ein Pflichtfeld `consumerRole` mit genau einem von zwei Werten. Alle Manifestquellen werden ohnehin von den Prüfwerkzeugen (Generator/Validator, Hash-/Trace-Recorder) gelesen — `consumerRole` regelt zusätzlich, ob die Quelle auch für das Produktions-LLM lesbar ist:

- `production-llm` — zusätzlich für das Produktions-LLM lesbar.
- `tool-only` — für das Produktions-LLM gesperrt; nur die Werkzeuge selbst greifen darauf zu.

Generator und Validator lehnen fail-closed ab, wenn `consumerRole` fehlt oder keinen der beiden Werte trägt (`GM03-ERR-SOURCE-CONSUMER-ROLE-INVALID`), und wenn eine Quelle unter `tests/scratch/**` oder der rohe, hashgebundene Golden-Master-Snapshot selbst (`acceptance.json.mockupPath`) mit `consumerRole: "production-llm"` deklariert wird (`GM03-ERR-SOURCE-LLM-FORBIDDEN`) — Werkstatt und roher Snapshot dürfen den Werkzeugen dienen, sind aber nie automatisch eine Produktionsquelle des LLMs.

**Quellenfreigabe:** Jede Spec-Quelle trägt jetzt explizit `"permitted": true`. Der Generator übernimmt den Wert, statt ihn stillschweigend zu setzen; jeder andere Wert stoppt Generator und Validator mit `GM03-ERR-SOURCE-NOT-PERMITTED`.

**Produktionsplan:** `generate_package.py` erwartet in der Spec `productionPlan.{apReihenfolge,erlaubtePfade,tests,manuelleGhostAbnahme}` und schreibt daraus die vier Pflichtüberschriften mechanisch in `production-plan.md`.

Protected-Diff-Check vor jeder Shared-Path-Berührung:

```bash
python tools/golden-master/protected_diff_check.py --files <pfad1> <pfad2> ...
python tools/golden-master/protected_diff_check.py --from-file <datei mit einem Pfad pro Zeile>
```

Fail-closed mit `GM03-ERR-FORBIDDEN-PATH-TOUCHED`, sobald ein `forbidden`-Pfad aus `.claude/PROTECTED_PATHS.json` betroffen ist. Reine Prüfung — kein Datei-Schreibzugriff, keine Ersetzung der manuellen Unlock-/Relock-Entscheidung (`AF-PROD-03`).
