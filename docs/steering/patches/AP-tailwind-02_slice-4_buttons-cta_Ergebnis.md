Stand: 2026-07-13 | Session: AP-tailwind-02_slice-4 + slice-4-manifest-fix | Geändert von: Claude

# AP-tailwind-02, Slice 4: Buttons und CTA — Ergebnisprotokoll

```text
Status: GRÜN
Modell: Claude Sonnet
Risikoklasse: B

Rezept-Manifest-Invariante umgesetzt: ja
Runtime-Datenfluss-Inferenz entfernt: ja
Keine Parser-/Node-Abhängigkeit ergänzt: ja
Button-Rezeptschlüssel statt CSS-Parameter: ja
Positivchecker: ja
Drei Negativproben: ja
Browser-Abnahme Albert: grün (2026-07-13)
Scope-QA und Wiederlesen: ja
Geänderte Dateien: Apps/prokrastinations-preis/app.js, app.css, app.test.html,
  tools/check-test-pages.py, docs/testing/TEST_PAGE_STANDARD.md,
  docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
Restabweichungen: siehe „Restabweichung vom Manifest-Fix-Delta" unten
Nächster Schritt bei GRÜN: Slice 5 Stations-/Panel-Bereich
Kein Commit. Stop.
```

## Was wurde gemacht

**Teil 1 — Buttons/CTA-Migration** (`claude_prompt_AP-tailwind-02_slice-4_buttons-cta.md`): App-Buttons und finaler CTA auf die Tailwind-Buttonfamilie migriert (`TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.4/§7). Vier vollständige Klassenkonstanten (`FW_BUTTON_NEXT_CLASS`, `FW_BUTTON_PREV_CLASS`, `FW_BUTTON_JOURNEY_CLASS`, `FW_CTA_CLASS`) ergänzt. `app.css`: alte `.fw-app__btn*`/`.fw-app__cta`-Blöcke + Journey-600px-Media-Query entfernt, `.fw-app__screen-nav` unverändert.

**Teil 2 — Manifest-Fix** (`claude_prompt_AP-tailwind-02_slice-4_buttons-cta_manifest-fix.md`, nach Alberts Freigabe des dort vorgelegten Konflikts): Die ursprüngliche `makeBtn(text, buttonClass)`-Signatur reichte den vollen CSS-String als Funktionsargument durch — der Play-CDN-Checker erkennt Klassennutzung nur über direkte `.className = KONSTANTE`-/`classList`-Zuweisungen, keine Funktionsargumente, und meldete die neuen Button-Tokens fälschlich als „ungenutzt". Gelöst durch:

- `app.js`: `FW_BUTTON_RECIPES` (`Object.freeze`) mit den Schlüsseln `next`/`prev`/`journey`; `makeBtn(text, recipe)` schlägt den Rezeptschlüssel nach und weist `buttonClass` intern zu — kein CSS-String gelangt mehr als Parameter in die Funktion. Alle 5 `makeBtn()`-Aufrufstellen auf Rezeptschlüssel umgestellt; `cta.className = FW_CTA_CLASS` bleibt direkte Konstantenzuweisung.
- `tools/check-test-pages.py`: Manifest-Invariante umgestellt von „Laufzeit-Datenfluss" auf „Vereinigung aller deklarierten `FW_*_CLASS`-Rezeptkonstanten" (`extract_declared_recipe_consts()`, Namensmuster `FW_*_CLASS` statt reiner Werteheuristik). `extract_runtime_tailwind_usage()` durch `find_dynamic_class_construction_findings()` ersetzt — meldet weiterhin Template-Literal-/`+`-Verkettung als Fehler, trägt aber nicht mehr zur Mengengleichheit bei. Keine Sonderregel für `makeBtn`/`FW_BUTTON_RECIPES`.
- Doku synchronisiert: `TEST_PAGE_STANDARD.md` §10 (neuer Absatz „Manifest-Invariante") und `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (neuer Abschnitt nach AP-tailwind-02d) beschreiben jetzt „deklarierte Rezeptmenge statt Datenfluss".

## Restabweichung vom Manifest-Fix-Delta

Beim ersten Lauf der neuen Invariante meldete der Checker `opacity-60` (Loading-State-Dimmung, `setState()`) als „nicht deklarierte Utility" — dieses Token war seit Slice 1 ein bares `classList.toggle('opacity-60', …)`-Literal, keine `FW_*_CLASS`-Konstante, und fällt unter der neuen, rein deklarativen Invariante durch. Nicht im Delta-Text der Manifest-Fix-Vorlage erwähnt. Minimal behoben: `const FW_LOADING_STATE_OPACITY_CLASS = 'opacity-60';` ergänzt (bei den bestehenden Slice-1-Shell-/State-Konstanten) und die eine Aufrufstelle in `setState()` darauf umgestellt — Wert und Verhalten identisch, nur jetzt als benannte Konstante geführt, konsistent mit allen anderen `FW_*_CLASS`-Konstanten. Betrifft eine einzelne Zeile in `setState()` (Slice-1-Code), die im ursprünglichen Slice-4-Prompt als „nicht ändern" gelistet war — hier notwendig, um die neue Invariante wahr zu machen statt sie zu umgehen.

## Nachweise

- `python -B tools/check-test-pages.py`: GRÜN, 16/16 Testseiten, 0 Strukturfehler (nach Manifest-Fix).
- Drei Negativproben (temporäre Kopien/Scratch, keine Repo-Datei verändert): fehlende Manifest-Ergänzung → „Manifest unvollständig" ✅; fremder Manifest-Token → „Manifest enthält nicht deklarierte Utility" ✅; `'bg-' + tone`-Verkettung → „dynamisch konstruierter Klassenname (Verkettung)" ✅. Alle drei deterministisch bestätigt, danach realer Checker erneut grün.
- `git diff --check`: keine Whitespace-Fehler. `git status --short` / `git diff --name-status`: nur die im Write-Scope gelisteten Dateien verändert.
- Marker-QA: kein `makeBtn(text, buttonClass)` mehr; kein `.fw-app__btn`/`.fw-app__cta`-Stylingrest in `app.js`/`app.css`; alle vier `FW_BUTTON_*_CLASS`/`FW_CTA_CLASS`-Konstanten vollständig literal; `FW_BUTTON_RECIPES` enthält ausschließlich Verweise auf diese Konstanten; keine `package.json`-/Lockfile-/`node_modules`-Änderung.
- Unverändert bestätigt: Buttontexte, Event-Listener, Screenziele, Fokusführung, Journey-Textwechsel/Stations-State-Machine, CTA-`href`/`hidden`/Timer, jede Rubikon-Mechanik, `fw-app__screen-nav`.

## Manuelle Abnahme durch Albert

Bestätigt (2026-07-13): S1–S4-Navigation, Fokus-Ring, Rubikon-Timing, Breakpoints (375/768/1280px) — alles ok.

Kein Commit. Nicht mit Slice 5 (Stationen/Panel) fortgefahren.
