Stand: 2026-07-24 | Session: AF-PROD-01-werkstatt-produktionsgrenze | Geändert von: Claude

# Patch-Quittung | AF-PROD-01-werkstatt-produktionsgrenze | 2026-07-24

**Beauftragt:** Die Architektur-Erkenntnis „Wir trennen die Freiheit zum Irren von der Pflicht, korrekt zu liefern" als benannte, kanonische Invariante AF-PROD-01 in `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` §1 verankern und mechanisch fail-closed erzwingen: jede Quelle in `source-manifest.json` trägt jetzt ein Pflichtfeld `consumerRole` (`tool-only`/`production-llm`); Werkstatt (`tests/scratch/**`) und roher Golden-Master-Snapshot (`acceptance.json.mockupPath`) dürfen nie mit `consumerRole: "production-llm"` deklariert werden. Auftragsquelle: `Archiv/local/muss noch eingeordnet werden/PROMPT_CLAUDE_AF-PROD-01_WERKSTATT_PRODUKTIONSGRENZE_HAERTUNG_V1.md`.

**Geändert:** 16 bestehende Dateien migriert/erweitert, 17 neue Dateien (3 neue Fixture-Artefakte) angelegt.

**Dateien:**

*Spec/Routing (Unlock/Relock):*
- `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` — neuer Abschnitt `### AF-PROD-01 — Werkstatt-/Produktionsgrenze` in §1, nach Via Negativa
- `NAVIGATION.md` — Kennung `(AF-PROD-01: Werkstatt-/Produktionsgrenze, §1)` an bestehender Produktionsstandard-Zeile ergänzt

*Werkzeugcode (nicht protected-path-gelistet):*
- `tools/golden-master/repo_path_guard.py` — `ALLOWED_CONSUMER_ROLES`, `require_valid_consumer_role()`, `is_workshop_or_raw_snapshot_path()`, `require_llm_source_not_raw()` neu
- `tools/golden-master/generate_package.py` — `build_source_manifest()` verlangt/prüft `consumerRole`, reicht es durch
- `tools/golden-master/validate_package.py` — `check_source_manifest()` erhält Parameter `mockup_path`, prüft `consumerRole` je Quelle
- `tools/golden-master/README.md` — neues Feld + zwei neue Fehler-IDs dokumentiert

*Migration bestehender Fixtures (`consumerRole: "tool-only"` an jeder Quelle, da alle bisherigen Quellen real nur Werkzeugzugriff sind):*
- `tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec.json`
- `tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec-not-permitted.json`
- `tests/golden-master/packages/af-gm-03-positive/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-acceptance/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-assumption/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-not-permitted/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-path-traversal/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-production-plan/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-source/source-manifest.json`
- `tests/golden-master/packages/af-gm-03-negative-trace-mismatch/source-manifest.json`

*Neue Negativfixturen:*
- `tests/golden-master/fixtures/af-gm-03-synthetic-package/package-spec-llm-forbidden.json` (NEU, Generator-Negativfall)
- `tests/golden-master/packages/af-gm-03-negative-llm-source/` (NEU, 8 Dateien, Klon von `af-gm-03-positive` + `consumerRole: "production-llm"` auf Mockup-Quelle, Validator-Negativfall)
- `tests/golden-master/packages/af-gm-03-negative-consumer-role-invalid/` (NEU, 8 Dateien, Klon von `af-gm-03-positive` + ungültiger `consumerRole`-Wert, Validator-Negativfall)

**CHANGED/NEW:** N/A für Spec/Doku. Python-Code folgt bestehendem Projektstil ohne `# CHANGED`/`# NEW`-Kommentare (kein bisheriger Marker-Einsatz in `tools/golden-master/*.py` — Stilkonsistenz gewahrt).

**Tabu-Check:** Zwei Unlock/Relock-Zyklen durchgeführt (`docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md`, `NAVIGATION.md`), je `forbidden → protected → Write → forbidden`. Netto-Diff von `.claude/PROTECTED_PATHS.json` nach beiden Relocks leer (nur CRLF-Warnung, kein Inhaltsdiff). `.claude/CLAUDE.md`, `docs/App-Fabrik/MOCKUP-VERTRAG.md`, produktive App-/Theme-/Registry-/Engine-/Daten-/Ghost-Dateien unangetastet. Werkzeugcode und Fixtures unter `tools/golden-master/` bzw. `tests/golden-master/` sind nicht in `PROTECTED_PATHS.json` gelistet — kein Unlock nötig.

**Gate-Typ:** Full (Bestandsanalyse + 8-teiliges Gate mit Ist-Regelkarte, Lückenkarte, Zielarchitektur, Dateiliste, Protected-Path-Status, `/spec-rewrite-guard`, Testplan, Surgical-Check — Alberts „GO" + 5 Einzelentscheidungen erhalten).

**Reale Befunde:**

| Prüfung | Befehl | Exit | Ergebnis |
|---|---|---|---|
| Positiv: Generator | `generate_package.py .../package-spec.json .../af-gm-03-positive` | 0 | `PAKET ERZEUGT: ... (8 Pflichtdateien)` |
| Positiv: Validator | `validate_package.py .../af-gm-03-positive` | 0 | `{"status":"PASS","sourcesChecked":3,"assumptionsChecked":2}` |
| Regression: negative-acceptance | `validate_package.py .../af-gm-03-negative-acceptance` | 1 | `GM03-ERR-MISSING-FIELD` (unverändert) |
| Regression: negative-assumption | `validate_package.py .../af-gm-03-negative-assumption` | 1 | `GM03-ERR-ASSUMPTION-BLOCKED` (unverändert) |
| Regression: negative-not-permitted | `validate_package.py .../af-gm-03-negative-not-permitted` | 1 | `GM03-ERR-SOURCE-NOT-PERMITTED` (unverändert) |
| Regression: negative-path-traversal | `validate_package.py .../af-gm-03-negative-path-traversal` | 1 | `GM03-ERR-PATH-OUTSIDE-REPO` (unverändert) |
| Regression: negative-production-plan | `validate_package.py .../af-gm-03-negative-production-plan` | 1 | `GM03-ERR-PRODUCTION-PLAN-INCOMPLETE` (unverändert) |
| Regression: negative-source | `validate_package.py .../af-gm-03-negative-source` | 1 | `GM03-ERR-HASH-MISMATCH` (unverändert) |
| Regression: negative-trace-mismatch | `validate_package.py .../af-gm-03-negative-trace-mismatch` | 1 | `GM03-ERR-TRACE-ACCEPTANCE-MISMATCH` (unverändert) |
| Regression: Generator permitted:false | `generate_package.py .../package-spec-not-permitted.json .../af-gm-03-negative-not-permitted-generator-regress` | 1 | `GM03-ERR-SOURCE-NOT-PERMITTED`; kein Ordner geschrieben (verifiziert) |
| Regression: AF-GM-02-Schema | `validate_schema.py .../minimal-normal.behavior-trace.json .../minimal-reduced.behavior-trace.json` | 0 | `SCHEMA-VALIDIERUNG: GRUEN (2 Datei(en) geprüft)` |
| **NEU 1** — Werkstatt/Snapshot als `production-llm` (Validator) | `validate_package.py .../af-gm-03-negative-llm-source` | 1 | `GM03-ERR-SOURCE-LLM-FORBIDDEN` |
| **NEU 2** — Werkstatt/Snapshot als `production-llm` (Generator) | `generate_package.py .../package-spec-llm-forbidden.json .../af-gm-03-negative-llm-source-generator` | 1 | `GM03-ERR-SOURCE-LLM-FORBIDDEN`; kein Ordner geschrieben (verifiziert) |
| **NEU 3** — ungültiger `consumerRole`-Wert (Validator) | `validate_package.py .../af-gm-03-negative-consumer-role-invalid` | 1 | `GM03-ERR-SOURCE-CONSUMER-ROLE-INVALID` |

**Weitere Nachweise:**
- `git diff --check` auf alle geänderten Text-/Codedateien: Exit `0`, keine Warnung.
- `.claude/PROTECTED_PATHS.json` nach beiden Relocks: Netto-Diff leer.
- Scope-QA (`git status --porcelain`): exakt die oben gelistete Dateimenge geändert/neu, plus ein Nebenbefund (siehe unten).

**Bekannter Nebenbefund (nicht Teil des Auftrags, gemeldet statt angefasst):** `tools/golden-master/__pycache__/repo_path_guard.cpython-314.pyc` erscheint in `git status` als „modified" — dieser Bytecode-Cache ist offenbar bereits aus einer früheren Session versioniert und wurde durch die realen Testläufe dieses Patches neu geschrieben. Kein Teil des Auftrags-Scopes, nicht bereinigt (Fremder Mess, analog zum bereits bekannten `tools/__pycache__/`-Befund vom 2026-07-21).

**Bekannte Restabweichung:** keine (funktional).

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 16 Dateien migriert/erweitert und 17 neue Dateien (3 Fixture-Artefakte) angelegt. Aufzählen? Nein — vollständig oben dokumentiert.

→ Bitte bestätige den Testfall (alle 14 Werkzeugaufrufe oben, insbesondere die drei neuen Negativfälle). Ich warte vor dem nächsten Patch. Kein Commit, kein Push, kein Ghost-Upload.
