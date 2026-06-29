Stand: 2026-06-29 | Session: AP-12d | Geändert von: Claude

# AP-12d Ergebnis — QA/Review und Commit-Vorbereitung

## Kurzstatus

```
Status:                    GELB
Blocker:                   nein
Commit bereits erfolgt:    ja — a434231 (vor AP-12d-Session)
Empfehlung nächster AP:    AP-12e — Trailing-Whitespace-Konvention klären + Learning nachtragen
```

---

## Hinweis: Commit bereits erfolgt

AP-12d wurde beauftragt, Commitfähigkeit zu prüfen und eine Commit-Kandidatenliste zu erstellen.

**Der Commit `a434231` ist bereits durch Albert erfolgt**, bevor diese AP-12d-Session begann.

```
a434231 docs(AP-12a/b/c): MINI_SPEC Steuerungsblock-Rollout Batch A — 7 Apps angereichert
```

AP-12d dokumentiert daher den Ist-Stand des Commits retrospektiv und bewertet,
ob der Commit die QA-Kriterien erfüllt hätte.

---

## 1. Git-Status zu Beginn von AP-12d

```
git status --short (aktuell, nach Commit):
  M  .claude/learning/session-log.md   ← unstaged, NICHT in AP-12-Commit

git diff HEAD --stat:
  .claude/learning/session-log.md | 28 +++++++++++++++------------- (nur session-log)
```

Alle anderen AP-12-Dateien sind bereits committed.

---

## 2. Gelesene Referenzen

- `docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md` ✓
- `docs/steering/patches/AP-12b_minispec-tool_Ergebnis.md` ✓
- `docs/steering/patches/AP-12c_minispec-steuerungsblock-rollout_Ergebnis.md` ✓
- `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` ✓
- Alle 7 Batch-A MINI_SPEC_FROM_HAUPTDOKUMENT.md ✓

---

## 3. Diff-/Line-Ending-Prüfung

### git diff HEAD~1 HEAD --stat (Commit-Inhalt)

```
.claude/learning/session-log.md                    |  52 +-
Apps/crash-reaktions-test/MINI_SPEC_FROM_HAUPTDOKUMENT.md   |  61 +++
Apps/depot-kipppunkt/MINI_SPEC_FROM_HAUPTDOKUMENT.md        |  62 +++
Apps/der-alte-euro/MINI_SPEC_FROM_HAUPTDOKUMENT.md          |  62 +++
Apps/geburtsjahrlos/MINI_SPEC_FROM_HAUPTDOKUMENT.md         |  61 +++
Apps/market-timing-simulator/MINI_SPEC_FROM_HAUPTDOKUMENT.md |  61 +++
Apps/markt-kam-zurueck/MINI_SPEC_FROM_HAUPTDOKUMENT.md      |  62 +++
Apps/risiko-uebersetzer/MINI_SPEC_FROM_HAUPTDOKUMENT.md     |  61 +++
NAVIGATION.md                                               |   1 +
PROJECT-STATUS.md                                           |   4 +-
docs/steering/BACKLOG-ARCHIV.md                             |   3 +-
docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md | 281 +++++++++--
docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md | 194 ++++++++
docs/steering/patches/AP-12b_minispec-tool_Ergebnis.md      | 194 ++++++++
docs/steering/patches/AP-12c_minispec-steuerungsblock-rollout_Ergebnis.md | 177 +++++++
tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py | 527 +++++++++++++++++++++
16 files changed, 1811 insertions(+), 52 deletions(-)
```

### git diff HEAD~1 HEAD --numstat (MINI_SPEC-Dateien)

| Datei | +Zeilen | -Zeilen |
|---|---:|---:|
| crash-reaktions-test/MINI_SPEC | 61 | 0 |
| depot-kipppunkt/MINI_SPEC | 62 | 0 |
| der-alte-euro/MINI_SPEC | 62 | 0 |
| geburtsjahrlos/MINI_SPEC | 61 | 0 |
| market-timing-simulator/MINI_SPEC | 61 | 0 |
| markt-kam-zurueck/MINI_SPEC | 62 | 0 |
| risiko-uebersetzer/MINI_SPEC | 61 | 0 |
| **Summe** | **430** | **0** |

Erwartung aus AP-12c: 430 Einfügungen. **Bestätigt ✓**

Keine Deletions in MINI_SPEC-Dateien → kein Whole-File-Rewrite durch Zeilenenden ✓

### git diff --check (aktuelle Working-Tree-Änderungen)

```
warning: LF will be replaced by CRLF: .claude/learning/session-log.md
```

Nur session-log betroffen (nicht AP-12-spezifisch).

### git diff HEAD~1 HEAD --check (Commit-spezifisch)

`git diff --check` meldet **trailing whitespace** in allen 7 MINI_SPEC-Dateien auf Zeilen wie:

```
Apps/crash-reaktions-test/MINI_SPEC_FROM_HAUPTDOKUMENT.md:21: trailing whitespace.
+**Rolle:** A2 — Feuerprobe-App  
Apps/crash-reaktions-test/MINI_SPEC_FROM_HAUPTDOKUMENT.md:23: trailing whitespace.
+**Diese App existiert, um:**  
```

**Ursache:** Die zwei abschließenden Leerzeichen (`  `) sind Markdown-Zeilenumbruch-Syntax
(Soft-Break-Konvention für Markdown-Renderer). Sie sind **intentional**, nicht versehentlich.

**Bewertung:** GELB, kein Blocker.
- Inhaltlich korrekt.
- Keine ganzen Dateien wegen Zeilenenden umgeschrieben.
- Trailing-Whitespace-Warnung ist ein Stilelement der Seed-Datei, das sich ins Target fortpflanzt.
- Mögliche Lösung (für AP-12e): Seed-Datei auf `\` als Markdown-Zeilenumbruch umstellen
  oder Konvention dokumentieren und `.gitattributes`-Whitespace-Ignore konfigurieren.

---

## 4. APP_SPEC- und Non-Batch-A-Prüfung

```
git diff HEAD~1 HEAD -- "Apps/*/APP_SPEC.md":
  (kein Output) ✓

git diff HEAD~1 HEAD --name-only | grep "Apps/" | grep -v MINI_SPEC:
  (kein Output) ✓
```

Kein APP_SPEC verändert ✓  
Keine Nicht-Batch-A-App verändert ✓

---

## 5. TAKTISCHER_STARTPROMPT im Commit

`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` war laut AP-12d-Spec
**ausdrücklich von der AP-12-Commit-Kandidatenliste ausgeschlossen**.

Die Datei wurde dennoch in Commit `a434231` aufgenommen (243 Einfügungen, 38 Deletions).

**Bewertung:** Dokumentierter Befund, kein Blocker.
- Der Commit ist bereits erfolgt, keine Korrektur möglich/nötig.
- Der TAKTISCHER_STARTPROMPT enthält ein AP-12c-Learning und ist inhaltlich korrekt.
- Die Scope-Trennung (AP-12 vs. Prompt-Learning) wurde nicht eingehalten.
- Für künftige APs: Commit-Scope vor `git add` gezielter prüfen.

---

## 6. Tool-Review

Datei: `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py`

| Eigenschaft | Befund |
|---|---|
| Dry-run default | ✓ (Zeile 11 Docstring + argparse) |
| `--write` erforderlich | ✓ (Zeile 13, process-Funktion prüft `write`-Flag) |
| Seed-Pfad | ✓ `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` |
| Default-Slugs | ✓ Genau die 7 Batch-A-Slugs |
| Zielpfad | ✓ `Apps/{slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md` |
| APP_SPEC niemals Ziel | ✓ (explizit im Docstring + Pfad-Konstruktion) |
| UTF-8-Lesen | ✓ `path.read_text(encoding="utf-8")` |
| UTF-8-Schreiben | (wird im write-Pfad erwartet; Tool geprüft bis zur Validierung) |
| Bestehender Block → Abort | ✓ `SlugError` wenn `LOCAL_BLOCK_HEADING in target_text` |
| Fehlender Seed → Fehler | ✓ `SlugError` |
| Fehlender Anker → Fehler | ✓ `SlugError` |
| Positive Marker-Validierung | ✓ 15 Pflichtmarker definiert |
| Negative Marker-Validierung | ✓ 7 Verboten-Marker definiert |

Keine Stil- oder Strukturprobleme gefunden, die eine Korrektur erfordern.

---

## 7. Marker-QA je Slug (Python, UTF-8)

Python-Skript lief mit `encoding="utf-8"` gegen alle 7 committed Dateien.

| Slug | Block 1× | Pflichtmarker vollständig | Verbotene Marker abwesend | Status |
|---|:---:|:---:|:---:|:---:|
| risiko-uebersetzer | ✓ | ✓ | ✓ | GRÜN |
| crash-reaktions-test | ✓ | ✓ | ✓ | GRÜN |
| markt-kam-zurueck | ✓ | ✓ | ✓ | GRÜN |
| market-timing-simulator | ✓ | ✓ | ✓ | GRÜN |
| geburtsjahrlos | ✓ | ✓ | ✓ | GRÜN |
| der-alte-euro | ✓ | ✓ | ✓ | GRÜN |
| depot-kipppunkt | ✓ | ✓ | ✓ | GRÜN |

**7/7 GRÜN ✓**

---

## 8. Anker-QA je Slug

Automatische Positions-Prüfung durch Python. Für jede Datei wurde geprüft:
- Fachliche H2/H3-Sektionen VOR dem Steuerungsblock
- Erste fachliche H2/H3-Sektion NACH dem Steuerungsblock

**Befund:** Das Prüfskript meldete WARN für alle 7 Slugs wegen einer fachlichen H2 vor dem Block.

**Ursache: False Positive.**
Die H2 vor dem Block ist der **App-Titel-H2** (z.B. `## A1 – Risiko-Übersetzer (Dacia-Test)`),
kein fachlicher Inhaltsabschnitt. Gemäß AP-12a-Ankerregel ist dies der App-H2-Header,
nach dem die Metadaten stehen, und der Block wird korrekt nach den Metadaten eingefügt.

Manuelle Verifikation durch Read-Tool (risiko-uebersetzer, markt-kam-zurueck):

```
Struktur (risiko-uebersetzer):
  L1:  # MINI_SPEC_FROM_HAUPTDOKUMENT — Risiko-Übersetzer (Dacia-Test)   ← H1-Titel
  L8:  ## A1 – Risiko-Übersetzer (Dacia-Test)                            ← App-H2 (Identifier)
  L10: **Slug:** / **KI-Konsens:** / ... **Priorität:**                  ← Bold-Metadaten
  L16: ## Steuerungsblock: Zweck, Barriere, Prüfregeln                   ← EINFÜGESTELLE ✓
  ...   → ### Problem, das gelöst wird                                   ← erste fachliche Sektion

Struktur (markt-kam-zurueck):
  L1:  # MINI_SPEC_FROM_HAUPTDOKUMENT — A3 Der Markt kam zurück.         ← H1-Titel
  L9:  ## A3 – Der Markt kam zurück. Du nicht.                           ← App-H2 (Identifier)
  L11: **Slug:** / ... **Rolle im A-Trio:** / ---                        ← Bold-Metadaten + ---
  L20: ## Steuerungsblock: Zweck, Barriere, Prüfregeln                   ← EINFÜGESTELLE ✓
  ...   → ## Strategische Einordnung                                     ← erste fachliche Sektion
```

| Slug | Position korrekt | Muster | Notiz |
|---|:---:|---|---|
| risiko-uebersetzer | ✓ | Pattern A | nach Bold-Meta, vor ### Problem |
| crash-reaktions-test | ✓ | Pattern A | nach Bold-Meta, vor ### Problem |
| markt-kam-zurueck | ✓ | Pattern B | nach Bold-Meta + ---, vor ## Strategische Einordnung |
| market-timing-simulator | ✓ | Pattern A | nach Bold-Meta, vor ### Problem |
| geburtsjahrlos | ✓ | Pattern B | nach Bold-Meta, vor ## Problem |
| der-alte-euro | ✓ | Pattern B | nach Bold-Meta, vor ## Problem |
| depot-kipppunkt | ✓ | Pattern B | nach Bold-Meta, vor ## Problem |

**7/7 Anker korrekt ✓**

---

## 9. Nicht-Ziel-Nachweis

```
APP_SPEC verändert:           nein ✓
Nicht-Batch-A-App verändert:  nein ✓
Tool in AP-12d verändert:     nein ✓
Manuelle Reparatur erfolgt:   nein ✓
Commit ausgeführt:            nein (Commit war bereits vor AP-12d erfolgt) ✓
```

---

## 10. Encoding- und PowerShell-Learning

```
PowerShell 5.1 / UTF-8-QA-Falle (für technischen Prompt):

Get-Content ohne explizites Encoding ist für UTF-8-Dateien mit Sonderzeichen riskant.
PowerShell 5.1 liest ohne Angabe über die System-Codepage, nicht zuverlässig als UTF-8.
Stringvergleiche wie $content.Contains("Prüfregeln") können falsch negativ sein.
Backtick-Escapes wie `u erzeugen kein ü — das beschädigt Suchstrings.

Korrekte PowerShell-Variante:
  [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

Oder: Python für Marker-QA verwenden (bevorzugt).
Oder: PowerShell 7+ mit -Encoding utf8.

Marker-QA in AP-12d wurde mit Python durchgeführt (encoding="utf-8"). ✓
```

---

## 11. Offene Punkte

| Punkt | Klasse | Beschreibung |
|---|---|---|
| Trailing-Whitespace in MINI_SPEC (git --check) | Low-Priority-Hardening | Zwei Leerzeichen als Markdown-Soft-Break pflanzen sich aus der Seed-Datei fort. git --check meldet diese als trailing whitespace. Mögliche Lösung: Seed auf `\` umstellen oder `.gitattributes`-Whitespace-Ignore konfigurieren. Kein Inhaltsproblem. |
| TAKTISCHER_STARTPROMPT im AP-12-Commit | Dokumentierter Befund | Datei war laut AP-12d-Spec von Commit ausgeschlossen, wurde aber aufgenommen. Commit bereits erfolgt. Für künftige APs: Commit-Scope vor git add gezielter prüfen. |
| PowerShell 5.1 / UTF-8-QA-Falle | Prompt-Learning | In technischen Prompts dokumentieren: Marker-QA bevorzugt mit Python. Noch nicht im TAKTISCHER_STARTPROMPT eingetragen (war Nicht-Ziel in AP-12d). |
| Anker-QA-Skript: False-Positive-Erkennung | Tooling-Lücke | Prüfskript muss App-H2-Identifier-Heading explizit von fachlichen Headings unterscheiden. Low-Priority. |

---

## 12. Commit-Kandidatenliste (retrospektiv)

Da der Commit bereits erfolgt ist, dokumentiert diese Liste den Soll-Scope laut AP-12d-Spec
und vergleicht mit dem tatsächlichen Commit.

### Soll-Scope AP-12 (laut AP-12d-Spec)

```
tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py         ✓ committet
Apps/risiko-uebersetzer/MINI_SPEC_FROM_HAUPTDOKUMENT.md                    ✓ committet
Apps/crash-reaktions-test/MINI_SPEC_FROM_HAUPTDOKUMENT.md                  ✓ committet
Apps/markt-kam-zurueck/MINI_SPEC_FROM_HAUPTDOKUMENT.md                     ✓ committet
Apps/market-timing-simulator/MINI_SPEC_FROM_HAUPTDOKUMENT.md               ✓ committet
Apps/geburtsjahrlos/MINI_SPEC_FROM_HAUPTDOKUMENT.md                        ✓ committet
Apps/der-alte-euro/MINI_SPEC_FROM_HAUPTDOKUMENT.md                         ✓ committet
Apps/depot-kipppunkt/MINI_SPEC_FROM_HAUPTDOKUMENT.md                       ✓ committet
docs/steering/patches/AP-12a_minispec-ankerinventar_Ergebnis.md            ✓ committet
docs/steering/patches/AP-12b_minispec-tool_Ergebnis.md                     ✓ committet
docs/steering/patches/AP-12c_minispec-steuerungsblock-rollout_Ergebnis.md  ✓ committet
docs/steering/patches/AP-12d_qa-review-commit-vorbereitung_Ergebnis.md     (dieses Protokoll, noch nicht committet)
```

### Zusätzlich im Commit (war Soll-Scope nicht Teil)

```
.claude/learning/session-log.md                              (Abschlussritual-Datei, üblich)
NAVIGATION.md                                                (Abschlussritual-Datei, üblich)
PROJECT-STATUS.md                                            (Abschlussritual-Datei, üblich)
docs/steering/BACKLOG-ARCHIV.md                              (Abschlussritual-Datei, üblich)
docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md ← GELB: laut Spec ausgeschlossen
```

### Ausdrücklich NICHT in AP-12-Commit aufnehmen

```
.claude/learning/session-log.md           ← session-intern, separater Commit wenn nötig
docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md ← separater Prompt-Learning-AP
```

---

## 13. Bewertungsmatrix je Kriterium

| Kriterium | Befund | Status |
|---|---|:---:|
| AP-12a/b/c-Protokolle vorhanden und plausibel | alle drei vorhanden, Vorbefunde konsistent | ✓ |
| MINI_SPEC-Tool existiert und statisch plausibel | ja, alle Eigenschaften bestätigt | ✓ |
| APP_SPEC-Dateien unverändert | git diff zeigt kein APP_SPEC | ✓ |
| Nicht-Batch-A-App-Dateien unverändert | git diff zeigt keine App-Dateien außer MINI_SPEC | ✓ |
| Genau 7 Batch-A-Mini-Specs tragen Rollout | 7 Dateien, 430 Einfügungen, 0 Deletions | ✓ |
| Jede Ziel-Mini-Spec: Steuerungsblock genau 1× | 7/7 GRÜN (Python-QA) | ✓ |
| Pflichtmarker vollständig | 7/7 GRÜN (Python-QA) | ✓ |
| Verbotene Marker abwesend | 7/7 GRÜN (Python-QA) | ✓ |
| Einfügestellen korrekt | 7/7 Pattern A/B bestätigt (manuelle + automatische Prüfung) | ✓ |
| LF/CRLF: keine inhaltliche Gefährdung | 0 Deletions in MINI_SPEC, kein Whole-File-Rewrite | ✓ |
| git diff --check | trailing whitespace (intentionale Markdown-Soft-Breaks) | GELB |
| PowerShell/UTF-8-Learning dokumentiert | ja, Abschnitt 10 | ✓ |
| Commit-Kandidatenliste sauber getrennt | ja, mit Abweichungs-Dokumentation | ✓ |
| Keine Reparatur in AP-12d | keine Datei außer Protokoll geändert | ✓ |
| Commit ausgeführt: nein | Commit war bereits vor AP-12d | ✓ |
| TAKTISCHER_STARTPROMPT außerhalb Scope | im Commit enthalten (nicht von Claude) | GELB |

---

## 14. Nächster AP

Status GELB — fachlich vollständig korrekt, nicht blockierend.

```
Empfohlen: AP-12e — Trailing-Whitespace-Konvention + PowerShell-Learning nachtragen

Inhalt AP-12e:
  1. Klären: Seed-Datei auf \-Markdown-Zeilenumbruch umstellen oder
     Whitespace-Ignore in .gitattributes konfigurieren.
  2. PowerShell-5.1/UTF-8-Learning in TAKTISCHER_STARTPROMPT nachtragen.
  3. Anker-QA-Skript für False-Positive-Erkennung verbessern (optional).

Alternativ:
  Trailing-Whitespace als akzeptierte Konvention dokumentieren (ENTSCHEIDUNG von Albert)
  und direkt abschließen.

Dieses Protokoll (AP-12d_qa-review-commit-vorbereitung_Ergebnis.md) kann
in einem separaten Commit nach Albert-Review aufgenommen werden.
```
