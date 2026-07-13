Stand: 2026-07-13 | Session: AP-tailwind-02a | Geändert von: Claude (Sonnet)

# AP-tailwind-02a — Play-CDN-Vertrag repo-weit festlegen und synchronisieren

## 1. Status

**GRÜN.** Die von Albert getroffene Entscheidung (Tailwind v4 Play-CDN
`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4` in der vorproduktiven Test-/Entwicklungsphase,
kein CDN in Produktion) ist widerspruchsfrei in allen aktiven, direkt betroffenen Repository-Dateien
verankert und maschinenprüfbar gemacht. Kein Commit, keine Pilotmigration der UI-Primitiven, kein
weiterer Entscheidungs-Slice.

## 2. Fundstellenkarte

Repo-weite Python-Suche (git grep, UTF-8) nach den vorgegebenen Mustern lieferte 40 nicht
ausgeschlossene Treffer (Schwelle >30 → Haiku-Vorsortierung via `codebase-scout` genutzt, Sonnet hat
jeden realen Write-Kandidaten selbst geprüft).

**Aktiv geändert** (9 Dateien, siehe §3):
`docs/App-Fabrik/01_DECISION_LOG.md`, `docs/testing/TEST_PAGE_STANDARD.md`,
`docs/testing/templates/app.test.template.html`, `tools/check-test-pages.py`,
`Apps/prokrastinations-preis/app.test.html`, `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`,
`docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html`,
`docs/steering/design/TAILWIND-APP-BAUKASTEN_MOCKUPS_V0-1.html`,
`docs/steering/handovers/SONNET-PROMPT_AP-tailwind-02_pilotmigration_V1.md`.

**Aktiv geprüft, bewusst nicht geändert:**
- `docs/App-Fabrik/_input/perplexity/fw-app-template.html` — enthält noch den alten v3-Tag
  (`cdn.tailwindcss.com`) und ein v3-`tailwind.config`-Objekt mit den laut Konzept §2.1 **verbotenen**
  Alt-Namen (`-80`, `-20`, `-30`, `-tint`). Eine mechanische v4-Überführung würde diese verbotenen
  Namen in ein neues `@theme`-Artefakt übernehmen oder eine neue CI-Mapping-Entscheidung erfordern —
  beides außerhalb des Scopes „kein weiterer Entscheidungs-Slice". T-01 (Decision Log) stuft die Datei
  bereits als „Prüflabor, kein produktiver App-Code" ein; die CDN-Grundentscheidung selbst bleibt davon
  unberührt. Nicht in der Muss-Liste, nur additiver Kandidat — bewusst nicht angefasst statt
  improvisiert umgebaut.
- `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-gemini-tailwind-v16.html` — aktiver
  v3-CDN-Tag, aber Homepage-Design-Exploration außerhalb der App-Fabrik/des Baukasten-Vertrags, in
  keinem der genannten Kandidaten-Globs (`docs/design-system/…`, `docs/App-Fabrik/**/*template*.html`,
  `docs/steering/design/*`). Nicht angefasst.
- `Apps/regulatorik-dashboard/Altmaterial/dashboard-regulatorikXIX.html` — liegt in einem
  `Altmaterial/`-Ordner (historischer Charakter wie `Archiv/`, auch ohne den literalen Ordnernamen
  „Archiv"); nicht angefasst.
- `docs/steering/BACKLOG.md:37` — der bestehende AP-tailwind-02-Eintrag formuliert noch:
  „Slice 0 = Tailwind-Laufzeitfrage im Test-/Ghost-Kontext mit Albert klären (TEST_PAGE_STANDARD §10
  CDN-Verbot vs. Play-CDN-Arbeitsannahme)". Das ist durch diesen AP inhaltlich überholt. **Nicht
  geändert**, weil BACKLOG.md nicht im Write-Scope dieses APs steht und vom Session-Start-Hook
  mechanisch per Regex geparst wird (Regressionsrisiko bei Fremdänderung außerhalb des Auftrags).
  Empfehlung an Albert: Klausel bei Gelegenheit auf „Slice 0 entfällt, Laufzeit entschieden in
  AP-tailwind-02a" kürzen.

**Historisch, bewusst unverändert:** `Archiv/**` (u. a. `Archiv/Apps/Regulatorik I/*.html`,
`Archiv/design-system-2026-05/**`, `Archiv/Design/**`, `Archiv/Chroniken/**`,
`Archiv/Peer Review Arbeitspakete/**`), `docs/steering/patches/**`, `docs/steering/archiv/**` — alle
per `git grep`-Dateiliste verifiziert, keine dieser Dateien berührt.

## 3. Geänderte Dateien und Sachänderungen

1. **`docs/App-Fabrik/01_DECISION_LOG.md`** — A-04 um eine „Präzisierung (AP-tailwind-02a)"
   ergänzt: vorproduktive Testphase = Play-CDN-Tag, Produktion = weiterhin kein CDN. Bestehender
   A-04-Text nicht gelöscht, nur präzisiert.
2. **`docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`** — Kopf-Absatz „Arbeitsannahme
   (markiert, reversibel)" durch „Entschieden (AP-tailwind-02a)" ersetzt; Rückverweis in §12
   („Arbeitsannahme, Kopf dieses Dokuments" → „entschieden, Kopf dieses Dokuments, AP-tailwind-02a")
   konsistent nachgezogen. Stand-Zeile aktualisiert (docs/steering/-Pflicht).
3. **`docs/testing/TEST_PAGE_STANDARD.md`** — §10 um die eng begrenzte Tailwind-Play-CDN-Ausnahme
   ergänzt (exakte URL, nur `Apps/{slug}/app.test.html`, verbotene Zusatzattribute, verbotene
   Alternativ-URLs); §12 Punkt 11 und §14 („Keine CDN-Laufzeitabhängigkeit") um den Verweis auf die
   Ausnahme ergänzt. Standard-Version 3→4, Stand-Zeile aktualisiert.
4. **`docs/testing/templates/app.test.template.html`** — kanonischer Tag im `<head>` ergänzt (nach
   den lokalen Stylesheet-Links, vor `tests/shared/test-page.js`).
5. **`Apps/prokrastinations-preis/app.test.html`** — derselbe Tag an derselben Position ergänzt.
   Keine Testfälle, Erwartungen, ARIA, Datenreferenzen oder App-CSS/JS verändert.
6. **`tools/check-test-pages.py`** — `TAILWIND_PLAY_CDN_URL`-Konstante, `is_tailwind_cdn_candidate()`
   und `validate_tailwind_cdn()` neu; `validate_references()`/`validate_test_page()` um `is_app_page`/
   `is_app`-Parameter erweitert (Default `False`, keine Verhaltensänderung für Engine/Tooling/Ghost);
   `validate_repository()` übergibt `is_app=(group == "Apps")`. Bestehende Funktionssignaturen nicht
   entfernt, nur additiv erweitert.
7. **`docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html`** und
   **`..._MOCKUPS_V0-1.html`** — CDN-Tag v3→v4 getauscht. Zusätzlich (technisch notwendig, nicht
   optional): das alte `tailwind.config = {...}`-Script funktioniert mit `@tailwindcss/browser@4`
   nicht mehr (v4 liest kein globales `tailwind.config`-Objekt) — ersatzlos hätte der CDN-Tausch beide
   Boards praktisch ungestylt gelassen. Ersetzt durch `<style type="text/tailwindcss">@theme {...}</style>`
   mit denselben, bereits freigegebenen CI-Werten als Literale (keine neuen Farben/Fonts/Schatten
   erfunden); die drei Bridge-only-Tokens (`--color-grid`, `--color-zero-line`, `--color-loader-bg`)
   bleiben bewusst außerhalb von `@theme` (Konzept §2.1: „bekommen keine Utility"), sie bleiben in der
   unveränderten `:root`-Deklaration erhalten und werden dort weiterhin von den Inline-SVGs referenziert.
8. **`docs/steering/handovers/SONNET-PROMPT_AP-tailwind-02_pilotmigration_V1.md`** — „Slice 0"-Absatz
   (Laufzeitfrage, Optionen, Stop-Klausel) durch die vorgegebene verbindliche Kurzvorgabe ersetzt;
   übrige Migrationsreihenfolge und Schutzregeln unverändert. Stand-Zeile aktualisiert.

## 4. Checker — Positiv-/Negativtests

Temporärer Crashtest-Harness (Scratchpad, außerhalb des Repositorys, kein Repo-Bestandteil) gegen
`tools/check-test-pages.py` importiert und ausgeführt:

```
[OK] P-TW-01  genau ein kanonischer Tag, im head, keine verbotenen Attribute -> gueltig
[OK] N-TW-01  Tag fehlt in App-Testseite -> Fehler
[OK] N-TW-02  https://cdn.tailwindcss.com -> Fehler
[OK] N-TW-03  @tailwindcss/browser ohne @4 -> Fehler
[OK] N-TW-04  @tailwindcss/browser@latest -> Fehler
[OK] N-TW-05  alternative Domain (unpkg) -> Fehler
[OK] N-TW-06  kanonischer Tag doppelt -> Fehler
[OK] N-TW-07  kanonischer Tag ausserhalb des head -> Fehler
[OK] N-TW-08  defer/async/type=module/integrity/crossorigin -> je Fehler (5 Unterfaelle)
[OK] N-TW-09  zusaetzliches externes Script -> Fehler (ueber bestehende validate_references)
[OK] Zusatz: kanonischer Tag wird von validate_references NICHT doppelt gemeldet (Exemption)
[OK] Zusatz: Nicht-App-Seite -- kein Tailwind-Zwang, CANON bleibt dort generisch verbotene URL
```

**17/17 Fälle bestanden, 0 fehlgeschlagen.** Nebenprodukt `tools/__pycache__/` nach dem Lauf entfernt.

## 5. Realer Checker-Lauf

```
TESTSEITEN-STRUKTUR: GRUEN
Gepruefte dauerhafte Testseiten: 16
Strukturfehler: 0
```

`Apps/prokrastinations-preis/app.test.html` wird durch die neue Tailwind-Pflichtprüfung nicht
beanstandet (kanonischer Tag vorhanden, korrekt platziert). Keine bestehende Checkerregel wurde
gelockert — Engine/Tooling/Ghost-Testseiten unterliegen weiterhin unverändert der generischen
absolute-URL-Sperre.

## 6. Deterministische Nachbedingungen

**Muss vorhanden** (Python-Scan über alle 9 geänderten Dateien): kanonische URL
`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4` in allen 9 Dateien bestätigt.

**Darf in aktiven, nicht-historischen Quellen nicht mehr vorhanden sein** (`git grep`-Dateilisten
ausgewertet): `cdn.tailwindcss.com` nur noch in den unter §2 genannten, bewusst nicht geänderten
Dateien sowie in den beiden geänderten Standard-/Checker-Dateien als **beschreibender Text** (nicht
als aktiver Tag) — beabsichtigt. `@tailwindcss/browser@latest`: 0 Treffer repo-weit. „Slice 0" /
„Laufzeitfrage mit Albert klären" / „entscheidungspflichtig" / „ohne diese Entscheidung kein
Migrations-Code" im Pilotprompt selbst: 0 Treffer (verifiziert). Übrige „Slice 0"-Treffer im Repo
(APP_SPEC.md, SLICE_0_KICKOFF.md, SLICE_PLAN.md, RFC-Dokumente, BACKLOG.md) sind unrelated
Bestandsterminologie („Slice 0" als App-Implementierungsschritt) — kein Fund der AP-spezifischen
Klausel, mit einer Ausnahme: BACKLOG.md:37 (§2 oben, bewusst nicht geändert).

## 7. Scope-QA

```
M .claude/learning/session-log.md            (eigener /start-Eintrag dieser Session, nicht AP-Scope)
M Apps/prokrastinations-preis/app.test.html
M docs/App-Fabrik/01_DECISION_LOG.md
M docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
M docs/steering/design/TAILWIND-APP-BAUKASTEN_MOCKUPS_V0-1.html
M docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html
M docs/steering/handovers/SONNET-PROMPT_AP-tailwind-02_pilotmigration_V1.md
M docs/testing/TEST_PAGE_STANDARD.md
M docs/testing/templates/app.test.template.html
M tools/check-test-pages.py
A docs/steering/patches/AP-tailwind-02a_play-cdn-vertrag-repo-sync_Ergebnis.md
```

`git diff --check` meldet nur die im Zieldokument bereits bestehende, absichtliche
Markdown-Zeilenumbruch-Konvention (zwei Leerzeichen am Zeilenende in `01_DECISION_LOG.md`) —
identisch zum bestehenden Dateistil, keine neue Auffälligkeit. Keine Änderung an `app.js`, `app.css`,
Engine, Tokens oder Produktionsbuild. Keine App-UI-Migration.

## 8. Wiederlesen

Alle 9 geänderten Dateien nach Abschluss vollständig vom Datenträger neu gelesen (nicht nur die
eingefügten Zeilen isoliert) — Inhalt entspricht dem beabsichtigten Stand, keine Diskrepanz zwischen
Edit-Tool-Rückmeldung und realem Dateiinhalt.

## 9. Verbleibende Abweichungen

- `docs/steering/BACKLOG.md:37` — veraltete „Slice 0 = Tailwind-Laufzeitfrage"-Klausel, siehe §2.
  Empfehlung: kleine Folgekorrektur außerhalb dieses APs.
- `docs/App-Fabrik/_input/perplexity/fw-app-template.html` und
  `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-gemini-tailwind-v16.html` tragen
  weiterhin den alten v3-CDN-Tag — bewusst außerhalb des Scopes, siehe §2.

## 10. Freigabe für den ersten echten Migrations-Slice

Freigegeben. Nächster Schritt: AP-tailwind-02, erster echter Migrations-Slice (Shell/States) —
ausdrücklich nicht Teil dieses APs.

Kein Commit. Weiter nur nach Alberts OK.

---

## Nachtrag AP-tailwind-02b (2026-07-13) — Play-CDN-Vertrag gehärtet und Abschlussnachputz

**Status: GRÜN.**

**Drei korrigierte Punkte:**

1. **Bytegenauer Checker-Vergleich.** `tools/check-test-pages.py` verglich die kanonische URL bisher
   nach `split_query_fragment()` — eine URL mit angehängtem Query (`...@4?x=1`) oder Fragment
   (`...@4#x`) wäre dadurch fälschlich als kanonisch durchgegangen (sowohl in
   `validate_tailwind_cdn()` als auch in der Exemption von `validate_references()`). Beide Stellen
   vergleichen jetzt den unveränderten, rohen `src`-Attributwert direkt gegen
   `TAILWIND_PLAY_CDN_URL` — `split_query_fragment()` wird nur noch zur Erkennung „ist das
   überhaupt ein Tailwind-CDN-Versuch" für die Fehlermeldung verwendet, nicht mehr für die
   Kanonizitätsprüfung selbst. Zusätzlich: `type="module"`-Sperre jetzt
   groß-/kleinschreibungsunabhängig (`.strip().lower() == "module"`), `type="MODULE"` wird erkannt.
   `async`/`defer`/`integrity`/`crossorigin` unverändert streng. Keine bestehende Funktionssignatur
   entfernt, nur additiv gehärtet.
2. **Trailing Whitespace beseitigt.** Die von AP-tailwind-02a neu eingeführte Zeile
   `docs/App-Fabrik/01_DECISION_LOG.md:38` (Präzisierungs-Satz zu A-04) endete mit zwei
   Leerzeichen vor dem Zeilenumbruch und wurde von `git diff --check` als Trailing-Whitespace
   gemeldet. Ausschließlich diese eine Zeile bereinigt (Python, exaktes `rstrip()` nur auf dieser
   Zeile) — keine Umformatierung der umliegenden, bereits bestehenden Zeilen mit derselben
   Markdown-Zeilenumbruch-Konvention (die waren vor dieser AP-Kette bereits committed und werden
   von `git diff --check` nicht als Diff-Zeilen erfasst).
3. **Backlog kontrolliert aktualisiert.** Vor dem Write geprüft, wie `docs/steering/BACKLOG.md` von
   `.claude/hooks/session-start.ps1` gelesen wird: Der Hook extrahiert AP-IDs ausschließlich aus dem
   Abschnitt `## 🟡 Aktiv` (Zeilen 11–18) per Zeilen-Regex auf die erste Tabellenspalte. Die
   AP-tailwind-02-Zeile liegt in einem anderen Abschnitt (`## ⬜ Offen – Pre-Launch`, Zeile 37) und
   wird vom Hook-Parser gar nicht gelesen — die Änderung ist für den Hook-Vertrag unsichtbar.
   Trotzdem read-frei über das bestehende, dafür vorgesehene Tool
   `tools/replace-matched-line.py --replace-containing "..." --with "..."` ersetzt (Eindeutigkeit
   im Tool erzwungen, Aufruf über `subprocess` mit Argv-Liste statt Shell-String, um Backticks/§/✅
   in der Zeile nicht der Shell auszusetzen). Ausschließlich die Teilklausel „Slice 0 =
   Tailwind-Laufzeitfrage im Test-/Ghost-Kontext mit Albert klären (TEST_PAGE_STANDARD §10
   CDN-Verbot vs. Play-CDN-Arbeitsannahme)" ersetzt durch „Slice 0 entfällt: Tailwind-Laufzeit
   entschieden in AP-tailwind-02a." — AP-ID, Bereich, Prio, Dep, Detail-Pfad und Spaltenzahl
   unverändert. Parser-Check danach real erneut simuliert (identische PowerShell-Logik gegen die
   aktuelle Datei ausgeführt): weiterhin exakt 4 Aktive-APs
   (`AP-20/21, AP-6c, AP-22, TESTENV-1-FOLLOWUP-BORDER`) — keine Regression.

**Testergebnisse P-TW-01 bis N-TW-11** (temporärer Python-Harness, Scratchpad, außerhalb des
Repositorys, Modul per `importlib` direkt gegen den realen `tools/check-test-pages.py` geladen —
keine Repo-Datei erzeugt oder verändert):

```
[OK] P-TW-01   genau ein kanonischer Tag, im head, keine Zusatzattribute -> gueltig
[OK] N-TW-01   kanonischer Tag fehlt -> Fehler
[OK] N-TW-02   https://cdn.tailwindcss.com -> Fehler
[OK] N-TW-03   @tailwindcss/browser ohne @4 -> Fehler
[OK] N-TW-04   @tailwindcss/browser@latest -> Fehler
[OK] N-TW-05   alternative Domain (unpkg) -> Fehler
[OK] N-TW-06   kanonischer Tag doppelt -> Fehler
[OK] N-TW-07   kanonischer Tag ausserhalb des head -> Fehler
[OK] N-TW-08   async/defer/type=module/integrity/crossorigin -> je Fehler (5 Unterfaelle)
[OK] N-TW-09   zusaetzliches externes Script -> Fehler
[OK] N-TW-10a  kanonische URL + Query-Parameter -> Fehler (nicht mehr faelschlich kanonisch)
[OK] N-TW-10b  kanonische URL + Fragment -> Fehler (nicht mehr faelschlich kanonisch)
[OK] N-TW-11   type="MODULE" (Grossschreibung) -> Fehler
```

20/20 Fälle bestanden (13 Pflichtfälle inkl. 5 Unterfälle von N-TW-08, plus 7 Zusatzprüfungen ohne
Regression gegenüber AP-tailwind-02a). `tools/__pycache__/` nach jedem Lauf geprüft und entfernt
(Nebenprodukt des Modul-Imports, kein Repo-Bestandteil).

**Realer Repository-Checker:**

```
TESTSEITEN-STRUKTUR: GRUEN
Gepruefte dauerhafte Testseiten: 16
Strukturfehler: 0
```

**Backlog-Parser-Check:** bestanden — 4/4 identische Aktive-APs vor/nach der Änderung (siehe Punkt 3
oben). Kein GELB nötig.

**`git diff --check`: GRÜN** (Exit 0, keine Trailing-Whitespace- oder Konflikt-Marker-Funde mehr).

**Finaler Write-Scope dieses Nachtrags:**

```
M tools/check-test-pages.py
M docs/testing/TEST_PAGE_STANDARD.md
M docs/App-Fabrik/01_DECISION_LOG.md
M docs/steering/BACKLOG.md
M docs/steering/patches/AP-tailwind-02a_play-cdn-vertrag-repo-sync_Ergebnis.md (dieser Nachtrag)
```

Keine weitere Datei berührt. Insbesondere `Apps/prokrastinations-preis/**`,
`docs/testing/templates/**`, `docs/steering/handovers/**`, `.claude/learning/session-log.md` und
`Archiv/**` (außer der gelesenen Prompt-Datei selbst) unverändert gelassen.

**Visual Board und Mockups (`TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html`,
`..._MOCKUPS_V0-1.html`) wurden in diesem Nachtrag bewusst nicht angefasst** — ihr Stand bleibt der
aus AP-tailwind-02a (v4-CDN-Tag + `@theme`-Block).

```text
AP-tailwind-02b abgeschlossen
Status: GRUEN

Exakte URL ohne Query/Fragment erzwungen: ja
type=module gross-/kleinschreibungsunabhaengig gesperrt: ja
P-TW-01 bis N-TW-11 bestanden: ja
Realer Repository-Checker gruen: ja
Decision-Log diff-check-sauber: ja
Backlog aktualisiert und Parsercheck bestanden: ja
Visual Board/Mockups unveraendert: ja
Scope-QA bestanden: ja

Geaenderte Dateien:
- tools/check-test-pages.py
- docs/testing/TEST_PAGE_STANDARD.md
- docs/App-Fabrik/01_DECISION_LOG.md
- docs/steering/BACKLOG.md
- docs/steering/patches/AP-tailwind-02a_play-cdn-vertrag-repo-sync_Ergebnis.md

Nächster Schritt bei GRÜN:
- Manuelle Live-Server-Abnahme von Visual Board und Mockups, danach erst AP-tailwind-02 Slice Shell/States.

Kein Commit. Stop.
```
