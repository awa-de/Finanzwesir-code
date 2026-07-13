Stand: 2026-07-13 | Session: AP-tailwind-02e | Geändert von: Claude (Sonnet)

# AP-tailwind-02e — Play-CDN-Theme-Bridge

## 1. Status

**GRÜN.** Alle Strukturchecks (realer Checker, Crashtests inkl. Negativprobe, Diff-/Scope-QA)
bestanden. Manuelle Browser-Abnahme durch Albert am 2026-07-13 zu 100 % bestätigt (B, F, K, L rote
Fehlerfläche mit `role="alert"`; Loading mit Spinner + sichtbarem Text; normale Shell korrekt).

## 2. Diagnose

`@source inline(...)` (AP-tailwind-02d) safelistet nur die zur Laufzeit von `app.js` gesetzten
Klassennamen — es registriert die CI-Tokens selbst aber nicht als Tailwind-Utilities. Tailwind v4
kennt `bg-error-bg`, `border-error-border`, `text-error-text` etc. nur, wenn ein `--color-error-bg`
o. ä. auch als **Theme-Variable** bekannt ist. Ohne das bleiben diese Utilities wirkungslos, obwohl
sie im Manifest stehen — genau der beobachtete Fehler (F/K/L schwarz statt rot).

## 3. Eine kanonische, wertfreie Bridge

`docs/testing/templates/app.test.template.html` ist die kanonische Textquelle. Direkt nach dem
Play-CDN-`<script>`-Tag steht ein `<style type="text/tailwindcss">`-Block mit `@theme inline { ... }`,
gefolgt von einem CSS-Kommentar, der auf die spätere `@source inline(...)`-Ergänzung verweist.

**Tokenliste (52 Einträge) deterministisch aus `Theme/assets/css/tokens.css` abgeleitet** — nicht von
Hand transkribiert, sondern per Python-Skript aus den realen `:root`-Deklarationen extrahiert (48
`--color-*` ohne die drei Bridge-only-Tokens `--color-grid`, `--color-zero-line`, `--color-loader-bg`,
plus `--font-display`, `--font-body`, `--shadow-soft`, `--shadow-hover`). Jede Zeile hat die Form
`--token: var(--token);` — keine Farbwerte, keine neuen Namen, `@theme inline` zwingend (Tailwind-v4-
Syntax, kein `theme.extend`-Konfigurationsobjekt aus v3).

## 4. Pilot-Testseite

`Apps/prokrastinations-preis/app.test.html`: derselbe `@theme inline`-Block bytegleich vor dem
unveränderten `@source inline(...)`-Manifest aus AP-tailwind-02d, beide im selben, einen
`<style type="text/tailwindcss">`-Block. Byte-Identität programmatisch verifiziert (§7).

## 5. Drei Vertragskorrekturen

1. **Decision Log** (`01_DECISION_LOG.md`, A-04): weitere „Präzisierung (AP-tailwind-02e)" ergänzt —
   Diagnose, Bridge-Mechanismus, kanonische Quelle, Verhältnis zu T1. Bestehende A-04-Historie
   (AP-tailwind-02a/02d) nicht verändert, nur fortgeschrieben.
2. **Baukasten §2.1** (`TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`): einleitender Satz von
   „ausschließlich über `theme.extend`" auf einen phasenabhängigen Bridge-Absatz umgestellt
   (Play-CDN-Testphase = `@theme inline`, Produktionsbuild T1 = dieselbe Bridge-Idee, kein
   `theme.extend`-Objekt). Tokenwerte, Utility-Namen und die bestehende Zuordnungstabelle
   unverändert — nur der einleitende Mechanismus-Satz präzisiert.
3. **TEST_PAGE_STANDARD §10**: neuer Bullet direkt nach der bestehenden Play-CDN-Ausnahme —
   ein `<style>`-Block, Reihenfolge Bridge vor Manifest, Werte nur aus `tokens.css`, die drei
   Bridge-only-Tokens ausgeschlossen, kanonische Textquelle benannt. Standard-Version 5→6,
   Stand-Zeile aktualisiert.

Keine Projektchronik, keine Änderung an Status-Taxonomie, Board oder Mockups — wie vom Auftrag
verlangt.

## 6. Minimaler Schutz gegen Wiederholung (Checker-Erweiterung)

`tools/check-test-pages.py`: neue, unabhängige Funktionsgruppe
(`extract_balanced_block`, `_manifest_style_text`, `load_canonical_theme_bridge`,
`validate_theme_bridge`), in `validate_test_page()` verdrahtet, nur für `is_app`-Seiten aktiv. Kein
zweiter hartkodierter Tokenkatalog im Checker — die Bridge wird zur Laufzeit aus dem Template
gelesen und byte-für-byte mit der jeweiligen App-Testseite verglichen (klammertiefen-basierte
Extraktion des `@theme inline { ... }`-Blocks, kein Regex-Rateversuch auf Farbwerte). Prüft:

1. Bridge im Template vorhanden und extrahierbar (sonst Befund statt Absturz).
2. Bridge in der App-Testseite vorhanden, extrahierbar und **bytegleich** zur Template-Bridge.
3. Bridge steht **vor** dem `@source inline(...)`-Manifest im selben `<style>`-Block.

Bestehende CDN-, Manifest- und Literalregeln (AP-tailwind-02a/02b/02d) unverändert — reine additive
Erweiterung, keine Funktionssignatur entfernt oder umgebaut.

## 7. Nachweise

**Byte-Identität real verifiziert** (vor dem Checker-Bau, isoliertes Python-Skript, DOM-scoped
Extraktion des `<style type="text/tailwindcss">`-Knotens): Template-Block und Piloten-Block sind
identisch (2481 Zeichen, exakte Übereinstimmung).

**Crashtests** (temporär, Scratchpad, kein Repo-Bestandteil, `importlib` gegen den realen
`tools/check-test-pages.py`, isolierte Fake-Repo-Struktur pro Fall):

```
[OK] 1) realer Template/Pilot-Abgleich -> 0 Befunde
[OK] 2a) Mutation greift ueberhaupt (Testaufbau valide)
[OK] 2b) fehlende --color-error-bg-Zeile wird beanstandet   <- Negativprobe aus dem Auftrag
[OK] 3) fehlende Bridge im Piloten wird gemeldet
[OK] 4) vertauschte Reihenfolge (Bridge nach Manifest) wird gemeldet
[OK] 5) fehlende Bridge im Template -> Befund, kein Crash
```

**6/6 Fälle bestanden.** Die im Auftrag geforderte Negativprobe (Kopie ohne
`--color-error-bg: var(--color-error-bg);`) wird vom Checker korrekt beanstandet.

**Realer Checker-Lauf:**

```
TESTSEITEN-STRUKTUR: GRUEN
Gepruefte dauerhafte Testseiten: 16
Strukturfehler: 0
```

## 8. Scope-QA

```
M .claude/learning/session-log.md                      (eigener Session-Eintrag, nicht AP-Scope)
M Apps/prokrastinations-preis/app.test.html
M docs/App-Fabrik/01_DECISION_LOG.md
M docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
M docs/testing/TEST_PAGE_STANDARD.md
M docs/testing/templates/app.test.template.html
M tools/check-test-pages.py
A docs/steering/patches/AP-tailwind-02e_play-cdn-theme-bridge_Ergebnis.md
```

`tokens.css`, `app.js`, `app.css`, APP_SPEC, Visual Board, Mockups, Chart-/Engine-Dateien,
`fwContext`/Rucksack, Theme-Build und Ghost-Dateien unverändert — exakt wie vom Auftrag verlangt.

**Nebenprodukt entfernt:** Beim Ableiten der Tokenliste ist versehentlich eine Hilfsdatei
(`scratch_bridge_block.txt`) im Repo-Root sowie `tools/__pycache__/` entstanden — beide vor Abschluss
gelöscht, kein Repo-Bestandteil geblieben.

`git diff --check`: keine neuen Auffälligkeiten außer der bereits bestehenden
Markdown-Zeilenumbruch-Konvention in `01_DECISION_LOG.md` (identisch zum Bestandsstil, siehe
AP-tailwind-02a/02c/02d).

## 9. Wiederlesen

Alle sieben geänderten Dateien nach Abschluss vollständig neu gelesen.

## 10. Manuelle Browser-Abnahme (2026-07-13)

Albert: „Manuelle Abnahme zu 100 % ok." — B, F, K, L rote Fehlerfläche mit `role="alert"` und den
bestehenden Texten; Loading mit Spinner + sichtbarem „Daten werden geladen …", Shell gedimmt;
normale Shell mit Papierfläche und Body-Font. Damit ist AP-tailwind-02e abschließend GRÜN.

---

```text
AP-tailwind-02e abgeschlossen
Status: GRÜN
Wertfreie Theme-Bridge im Template und Piloten: ja
Bridge vor Runtime-Manifest: ja
Tokens bleiben allein in tokens.css: ja
Bridge-only-Tokens ausgeschlossen: ja
Realer Checker und Negativprobe: ja
Scope-QA / Wiederlesen: ja
Browser-Abnahme durch Albert: ja (2026-07-13, 100 %)
Kein Commit. Stop.
```
