Stand: 2026-07-11 | Session: TESTENV-1f | Geändert von: Claude (Sonnet)

# TESTENV-1f – Browser-/Abschlussgate

## 1. Status

**Status: GELB**

Automatisches Gate vollständig bestanden. Ausschließlich die Browser-Stichprobe (§3) ist offen —
in dieser Umgebung stand kein reales Browser-Werkzeug (Playwright/Puppeteer o. ä.) zur Verfügung,
Claude hat daher nichts als „bestanden" behauptet. Sobald Albert die 7 Seiten (§5) geöffnet und
geprüft hat, wird diese Datei auf GRÜN ergänzt — kein neuer AP.

## 2. `.gitignore` bereinigt

Der 3-zeilige Block (Kommentar „Chart-Engine Dev-Ordner — nicht versionieren" + die zwei Regeln
`Theme/data/` und `Theme/chart-tests/`) wurde vollständig entfernt — beide Verzeichnisse existieren
nach `TESTENV-1eB`/Alberts Löschung nicht mehr, die Regeln waren tot. Keine andere Ignore-Regel
verändert (Diff: nur diese 3 Zeilen entfernt, Rest der Datei byte-identisch).

Geprüft:

- `Theme/chart-tests/` und `Theme/data/` existieren nicht mehr auf der Platte.
- Repo-weite Suche nach `Theme/chart-tests` und `Theme/data` (außerhalb `Theme/assets/data/`,
  Produktivpfad) findet ausschließlich historische Prosa-Erwähnungen (Session-Log,
  `PROJECT-STATUS.md`, Memory-Dateien, Archiv-Dokumente, `TEST_PAGE_STANDARD.md`s eigene
  Migrationsgeschichte in `<code>`-Tags) — **keine** funktionale `href`/`src`/`data-csv`-Referenz
  auf einen der beiden alten Pfade.
- `git status --short` zeigt keine neu sichtbar gewordenen Dateien durch die Ignore-Bereinigung
  (beide Ordner sind physisch weg, es gibt nichts, was „sichtbar" werden könnte).

## 3. Automatisches Gate

```text
git status --short        → 7 modifizierte/gelöschte Dateien, 4 neue Einträge (siehe §7)
git diff --name-status    → M .claude/learning/session-log.md, M .gitignore,
                             M Apps/prokrastinations-preis/app.test.html, D Theme/index.html,
                             M docs/testing/TEST_PAGE_STANDARD.md, M tests/index.html,
                             M tools/check-test-pages.py
python tools/check-test-pages.py              → GRUEN, 16 Testseiten, 0 Fehler
python tools/check-test-pages.py --write-index → GRUEN, 16 Testseiten, 0 Fehler
python tools/check-test-pages.py              → GRUEN, 16 Testseiten, 0 Fehler (idempotent)
git diff --check          → keine Konflikt-/Whitespace-Fehler (nur LF→CRLF-Hinweise, harmlos)
```

## 4. Python-bestätigte Zählungen und Referenzen

Alle 15 geforderten Prüfpunkte einzeln per Python bestätigt (Skript im Scratchpad dieser Sitzung,
kein Repository-Artefakt):

| Prüfpunkt | Ergebnis |
|---|---|
| 16 dauerhafte Testseiten | ✅ |
| Launcher: 1 App + 15 Engine | ✅ |
| Keine „(Strukturfehler)"-Markierung | ✅ |
| Alle Launcher-Ziele existieren | ✅ |
| App-Seite: 31 Testfälle | ✅ (`grep -c data-fw-test-case` → 31) |
| Security-Seite: 4 Testfälle | ✅ |
| Smart-Update-Seite vorhanden | ✅ |
| 76 Dateien unter `tests/fixtures/engine/` | ✅ |
| Keine CDN-Referenz (`cdn.jsdelivr.net`/`cdn.tailwindcss.com`) in App- oder Engine-Seiten | ✅ |
| Keine funktionale Referenz auf `Theme/chart-tests/`/`Theme/data/` | ✅ (nur Prosa, s. §2) |
| 13 Migrationsziele vorhanden | ✅ |
| 13 zugehörige Altquellen nicht vorhanden | ✅ |
| `Theme/chart-tests/`/`Theme/data/` existieren nicht mehr | ✅ |
| Beide OUTSIDE-Seiten existieren unverändert | ✅ |
| Alle lokalen Script-/CSS-/Datenreferenzen existieren | ✅ (durch Checker-GRÜN mitbestätigt — Referenzprüfung ist Kern von `validate_test_page`) |

Kein Produktionscode verändert — `git diff --name-status` (§3) enthält ausschließlich
Test-Infrastruktur (`app.test.html`, `TEST_PAGE_STANDARD.md`, `check-test-pages.py`,
`tests/index.html`, `.gitignore`, `session-log.md`) und die gelöschte Alt-Testseite
`Theme/index.html`. Kein Layer-1–5-Produktionscode (`FinanzwesirData.js`, `CSVParser.js`,
`ChartEngine.js`, `FwDateUtils.js` etc.) betroffen.

## 5. Browser-Stichprobe — offen (Albert)

Kein Browser-Werkzeug in dieser Umgebung verfügbar. Bitte über den lokalen Live-Server öffnen und
je Seite nur prüfen: lädt / Testseitenkopf sichtbar / Charts bzw. Testmechanik sichtbar / keine
unerwartete Fehlermeldung / keine unerwartete JS-Exception. Kein vollständiger Testdurchlauf nötig.

1. `tests/index.html`
2. `tests/engine/bar-all.test.html`
3. `tests/engine/line-scenarios.test.html`
4. `tests/engine/pie-ci.test.html`
5. `tests/engine/security-gatekeeper.test.html`
6. `tests/engine/chart-text-plugin-smart-update.test.html`
7. `tests/engine/cadence-density.test.html`

Nach Prüfung: kurze Rückmeldung, dann wird diese Datei auf GRÜN ergänzt.

## 6. Scope-QA

- Geändert: `.gitignore`, `tests/index.html` (nur via `--write-index`).
- Neu: diese Ergebnisdatei.
- Sonst nichts verändert — kein Content aus `TESTENV-1eB` erneut verglichen oder angefasst, wie im
  Auftrag vorgegeben („Keine Inhalte erneut vergleichen").
- Kein Commit (Freigabe liegt bei Albert).

## 7. `git status --short` (finaler Stand dieses APs)

```text
 M .claude/learning/session-log.md
 M .gitignore
 M Apps/prokrastinations-preis/app.test.html
 D Theme/index.html
 M docs/testing/TEST_PAGE_STANDARD.md
 M tests/index.html
 M tools/check-test-pages.py
?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-11-ci-font-migration.md
?? docs/steering/patches/TESTENV-1eB_engine-fixture-migration_Ergebnis.md
?? docs/steering/patches/TESTENV-1f_browser-abschlussgate_Ergebnis.md
?? tests/engine/
?? tests/fixtures/
```

`Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-11-ci-font-migration.md` ist ein bereits vor
`TESTENV-1eB` vorhandener untracked Fund aus einer anderen Kette — nicht Teil von TESTENV.

## 8. Nächster Schritt

Bei Alberts bestandener Browser-Stichprobe: diese Datei auf GRÜN ergänzen (keine neue Datei, kein
neuer AP), danach TESTENV-Kette committen und abschließen.

## 9. Nachtrag — CI-Audit-Fund: `.fw-app__btn` rendert in Arial statt Source Sans Pro

**Für das steuernde LLM: bitte fixen (eigener kleiner AP, nicht Teil der TESTENV-Kette selbst).**

Gefunden mit `tools/ci-token-check.js` → `fwCiAudit()` auf
`Apps/prokrastinations-preis/app.test.html` (2026-07-11, nach TESTENV-1f). Alle Buttons der App
(`.fw-app__btn`, `.fw-app__btn--next` etc.) rendern ihren Text in **Arial** statt der CI-Schrift
**Source Sans Pro** — 100 Fundstellen auf der Testseite, betrifft jeden sichtbaren Button.

**Ursache:** `Apps/prokrastinations-preis/app.css:14` setzt `font-family: var(--font-body, sans-serif)`
auf `.fw-app` (dem Wurzelelement). `<button>`-Elemente erben `font-family` in Browsern **nicht**
automatisch von Vorfahren (CSS-Grundregel für Formular-Steuerelemente — sie nutzen ohne explizite
Regel die UA-/OS-Standardschrift). `.fw-app__btn` (`app.css:157-165`) setzt selbst kein
`font-family` — daher der Fallback auf Arial.

**Betroffen:** `.fw-app__btn` und alle seine Varianten, die keine eigene `font-family` setzen
(`.fw-app__btn--next` app.css:167-171, `.fw-app__btn--journey` app.css:296-303 — beide erben von
`.fw-app__btn`, keine der beiden überschreibt `font-family`). **Nicht betroffen:** `.fw-app__cta`
(app.css:174-184) — das ist ein `<a>`-Element, kein `<button>`; Anker erben `font-family` normal
von Vorfahren, die o. g. Formular-Ausnahme gilt nur für `button`/`input`/`select`/`textarea`. Vom
Audit auch nicht als Fehler gemeldet — nur zur Einordnung, nicht extra prüfen nötig.

**Erwarteter Fix — genau eine Zeile in `app.css`:**

```diff
 .fw-app__btn {
   padding: 0.5rem 1.25rem;
   border: 1px solid var(--color-primary, #218380);
   border-radius: 4px;
   background: transparent;
   color: var(--color-primary, #218380);
   font-size: 0.95em;
+  font-family: inherit;
   cursor: pointer;
 }
```

`font-family: inherit;` ist hier die richtige Wahl (nicht `var(--font-body, sans-serif)` direkt
duplizieren) — holt sich den bereits korrekt auf `.fw-app` gesetzten Wert (app.css:14), eine
Quelle der Wahrheit, keine zweite Stelle, die bei einem künftigen Font-Wechsel mitgepflegt werden
müsste.

**Nachweis nach dem Fix:** `Apps/prokrastinations-preis/app.test.html` im Live-Server öffnen,
`tools/ci-token-check.js` in die DevTools-Konsole einfügen, `fwCiAudit()`-Tabelle prüfen — die
Zeile `Schrift | Text | 'Arial' | ❌ | button.fw-app__btn` darf nicht mehr erscheinen, alle Zeilen
sollten `✅` sein.

**Scope-Hinweis:** Reine CSS-Ein-Zeilen-Korrektur in `app.css`, kein Layer-1-Code, kein JS, keine
Architekturwirkung. Light-Gate vermutlich ausreichend, aber eigenes Gate durch das steuernde LLM
zum Zeitpunkt der Umsetzung — dieser Eintrag ersetzt keine Freigabe.
