Stand: 2026-07-13 | Session: AP-tailwind-02d | Geändert von: Claude (Sonnet)

# AP-tailwind-02d — Runtime-Manifest und Error-Taxonomie

## 1. Status

**GRÜN.** Anlass war die ROT-Abnahme von Slice Shell/States: Play-CDN generiert CSS für zur
Laufzeit per `app.js` gesetzte Tailwind-Klassen nicht zuverlässig genug (F zeigte schwarzen statt
roten Error; K/L schwarzen statt gedämpften Text). Zwei unabhängige Ursachen behoben: (1) fehlendes
Play-CDN-Manifest, (2) falsche Taxonomie (K/L/R waren Empty, sind fachlich Error).

## 2. Teil A — Verbindliche Taxonomie

`docs/spec/APP-INTERFACE.md` §8 und `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
§6.10 um denselben Taxonomie-Block ergänzt (wortgleich mit dem Auftrag):

```text
Loading: Daten werden geladen.
Content: nutzbare Daten.
Empty: gültige Card und gültige Daten, aber ein leeres Ergebnis ist erwartbar.
Error / role="alert": Card-Konfiguration, Laden, Domain-Lock, Datenformat,
fehlende Pflichtspalten oder unzureichende Pflichtdaten verhindern ein verlässliches Ergebnis.
```

`APP-INTERFACE.md` §8s alte Formulierung „Empty (fehlende oder unvollständige Daten)" ersetzt durch
eine widerspruchsfreie Kurzfassung plus Erläuterungssatz — keine Restformulierung, die der neuen
Taxonomie widerspricht, stehen gelassen.

**Sichtbare Testseiten-Texte:** 1:1 aus dem Bestand übernommen, nicht neu formuliert. Der
Meldungstext „Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen." bleibt unverändert —
geändert wurde ausschließlich das State-Label (Empty → Error) und die Rollen-Angabe
(`role="status"` → `role="alert"`) in den sichtbaren Erwartungstexten der Szenarien K und L.

**Zusatzfund über den Auftrag hinaus:** Szenario **R** (`index_value = 0,00 EUR` in den letzten 120
Zeilen) läuft über denselben `_loadDataImpl()`-Codepfad (`hasInvalidRows` → `error: 'empty'`) wie K
und L, war im Auftrag aber nicht namentlich genannt. Um keine widersprüchliche Restformulierung zu
hinterlassen (Auftrag Teil A, letzter Satz), wurde R identisch auf Error umgestellt — mechanische
Konsequenz derselben Code-Vereinheitlichung (§4 unten), keine eigenständige neue Entscheidung.

## 3. Teil B — Play-CDN-Manifest

**`Apps/prokrastinations-preis/app.test.html`:** genau ein `<style type="text/tailwindcss">`-Block
im `<head>`, direkt nach dem Play-CDN-`<script>`-Tag, mit einer einzigen `@source inline("...")`-
Direktive. Enthält ausschließlich die zur Laufzeit von `app.js` gesetzten Tailwind-Utilities (29
Tokens, aus `FW_SHELL_CLASS`, `FW_LOADING_WRAPPER_CLASS`, `FW_LOADING_SPINNER_CLASS`,
`FW_ERROR_CLASS` und dem `opacity-60`-Literal in `setState()`) — kein `fw-*`-Marker, keine
ungenutzten Utilities. `FW_EMPTY_CLASS` (`p-4 text-text-muted`) trägt keine eigenen Tokens zum
Manifest bei, weil beide Tokens bereits durch `FW_ERROR_CLASS` bzw. `FW_LOADING_WRAPPER_CLASS`
abgedeckt sind (siehe §5, Punkt „Erkennungsheuristik").

**`tools/check-test-pages.py`:** neue Funktionsgruppe (`extract_tailwind_class_consts`,
`_looks_like_tailwind_class_list`, `_tokenize_filtered`, `_split_top_level_args`,
`_analyze_class_expr`, `extract_runtime_tailwind_usage`, `validate_manifest`), in
`validate_test_page()` verdrahtet, nur für `is_app`-Seiten aktiv. Prüft deterministisch:

1. Genau ein Manifestblock, genau eine `@source inline(...)`-Direktive.
2. Manifest-Tokens und die aus `app.js` extrahierten, zur Laufzeit gesetzten Tailwind-Tokens sind
   mengenidentisch (fehlend/zusätzlich werden je einzeln benannt).
3. Dynamische Klassenkomposition (`+`, Template-Literal) mit echten (nicht-`fw-*`-) Fragmenten wird
   unabhängig vom Mengenabgleich als eigener Befund gemeldet.
4. Nicht-App-Seiten (Engine/Tooling/Ghost) erhalten keine Manifestpflicht.

**Erkennungsheuristik (bewusst kein JS-Parser, kein Generator, kein Build — Auftragsgrenze
„Kein Generator, kein neuer Runtime-Manager und kein Build"):** Eine `app.js`-Konstante
`const NAME = '...';` gilt als Tailwind-Klassenliste, wenn ihr Wert ausschließlich aus
kleingeschriebenen, utility-förmigen Tokens besteht (kein Großbuchstabe, kein Umlaut, kein
Satzzeichen). Das unterscheidet sie zuverlässig von deutschsprachigen Text-Konstanten (z. B.
`RUBIKON_A11Y_TEXT`), ohne eine Namenskonvention (`_CLASS`-Suffix o. ä.) vorauszusetzen — verifiziert
per Crashtest (§4). `fw-*`-Marker werden aus jeder Tokenliste gefiltert, bevor sie mit dem Manifest
verglichen wird (§6.10: „keine Mechanikmarker im Manifest").

**Bekannte, bewusst hingenommene Einschränkung:** Die Erkennung ist textuell (Vorkommen von
`.className = KONSTANTE;` bzw. `classList.*(...)` im Quelltext), keine Erreichbarkeitsanalyse. Ein
Aufruf innerhalb einer nie aufgerufenen Funktion (z. B. `renderEmpty()`, siehe §4) zählt bereits als
„genutzt". Im aktuellen Code ohne Auswirkung, da `FW_EMPTY_CLASS`s zwei Tokens bereits durch andere,
tatsächlich aktive Konstanten gedeckt sind — für künftige Apps ein dokumentiertes Restrisiko, kein
Blocker in diesem AP.

## 4. Teil C — Pilot-Fix

`Apps/prokrastinations-preis/app.js`, `initApp()`: die beiden Branches `csvResult.error === 'empty'`
(→ `setState('empty')` + `renderEmpty()`) und `csvResult.error` (→ `setState('error')` +
`renderError()`) zu einem Branch zusammengeführt (`if (csvResult.error) { setState('error');
renderError(csvResult.message); }`) — beide taten nach der Taxonomie-Korrektur dasselbe, die
Zusammenführung ist eine direkte, notwendige Vereinfachung (Simplicity-Check), keine
Scope-Erweiterung. `_loadDataImpl()` liefert intern weiterhin den Diskriminator-String `'empty'`
(unverändert) — nur die State-/Render-Zuordnung in `initApp()` hat sich geändert; Shared Parser
(`CSVParser.js`, `FinanzwesirData.js`) und Engine nicht angefasst.

`renderEmpty()`/`FW_EMPTY_CLASS` bewusst **nicht entfernt** (Auftrag: „Der frühere Empty-Renderer
darf bestehen bleiben") — mit Kommentar versehen, dass sie aktuell ohne Aufrufer sind und warum
(Empty bleibt gültiger Zustand für künftige Fälle, kein toter Code im engeren Sinn).

## 5. Teil D — Produktionsbuild-Zielbild

In `docs/App-Fabrik/01_DECISION_LOG.md` (A-04, weitere Präzisierung) und
`docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (Kopf-Abschnitt, weitere
„Entschieden"-Klausel) wortgleich dokumentiert:

```text
Vor Ghost-Integration: Play-CDN + App-Testseiten-Manifest.
Nach Ghost-Integration: kein CDN. Der lokale Tailwind-Build scannt die realen
Theme-, Template- und App-JS-Quellen einschließlich der vollständigen benannten
Klassenlisten; er erzeugt minimiertes, lokal ausgeliefertes CSS.
Ein Produktions-Gate weist nach, dass jede App-Manifest-Utility im erzeugten CSS-Artefakt enthalten ist.
```

Kein Artefaktname, Build-Befehl, Pfad oder Build-Tool festgelegt — bleibt Folgeauftrag T1,
unverändert gegenüber der bestehenden Festlegung aus AP-tailwind-02a.

## 6. Slice-1-Prompt aktualisiert

`Archiv/local/muss noch eingeordnet werden/claude_prompt_AP-tailwind-02_slice-1_shell-states.md`,
Abschnitt „Nachweise": zwei Bullets ergänzt (Play-CDN-Manifest mengenidentisch; Loading/Empty/Error
folgen der Taxonomie aus `APP-INTERFACE.md` §8) sowie der bestehende Checker-Bullet um den Hinweis
ergänzt, dass er jetzt auch das Manifest prüft. Ausschließlich der Nachweise-Abschnitt geändert, wie
vom Auftrag verlangt („nur, soweit Runtime-Manifest und Taxonomie seine Nachweise betreffen") — Ziel,
Delta, Nicht-anfassen und Abschluss dieser Datei unverändert gelassen.

## 7. Crashtests (temporär, Scratchpad, kein Repo-Bestandteil)

Zwei Python-Harnesses, per `importlib` direkt gegen den realen `tools/check-test-pages.py` geladen —
keine Repo-Datei erzeugt oder verändert.

**Unit-Ebene** (`crashtest_manifest.py`, 12 Fälle):

```
[OK] Tailwind-Klassenliste erkannt (FW_SHELL_CLASS)
[OK] Array-Konstante nicht erkannt (SLUG_WHITELIST)
[OK] Fliesstext-Konstante nicht erkannt (RUBIKON_A11Y_TEXT)
[OK] fw-app aus Tokenliste gefiltert
[OK] 1) gueltiges identisches Manifest -> keine Dynamik-Befunde
[OK] 1) gueltiges identisches Manifest -> Set-Gleichheit
[OK] 2) fehlende Manifest-Utility wird erkannt
[OK] 3) ungenutzte Manifest-Utility wird erkannt
[OK] 4a) Verkettung mit echtem Fragment wird als Befund gemeldet
[OK] 4b) Template-Literal wird als Befund gemeldet
[OK] 4c) BEM-Verkettung ausserhalb Tailwind-Scope wird NICHT gemeldet (kein False Positive)
[OK] 4d) classList.toggle: nur erstes Argument ausgewertet ('loading' NICHT als Token)
```

**Integrations-Ebene** (`crashtest_manifest_integration.py`, End-zu-Ende über echte Temp-Dateien,
6 Fälle):

```
[OK] 1) identisches Manifest -> 0 Befunde
[OK] 2) fehlender Manifestblock -> Befund
[OK] 2b) fehlende Utility im Manifest -> Befund
[OK] 3) ungenutzte Manifest-Utility -> Befund
[OK] 4) doppelter Manifestblock -> Befund
[OK] 5) Nicht-App-Seite -> keine Manifestpflicht
```

**18/18 Fälle bestanden, 0 fehlgeschlagen.** Deckt alle vier im Auftrag geforderten Mindestfälle ab
(gültiges identisches Manifest → OK; fehlende Utility → Fehler; ungenutzte Utility → Fehler;
dynamisch konstruierter Klassenname → Fehler) plus zwei zusätzliche Regressionswächter (4c: kein
False Positive auf die bestehende, außerhalb des Scopes liegende `fw-app__btn`-Verkettung; 4d: kein
Fehlinterpretieren des Boolean-Arguments von `classList.toggle`).

## 8. Realer Checker-Lauf

```
TESTSEITEN-STRUKTUR: GRUEN
Gepruefte dauerhafte Testseiten: 16
Strukturfehler: 0
```

Bestätigt: das reale Manifest in `app.test.html` und die real in `app.js` gesetzten Tailwind-Utilities
sind mengenidentisch, keine dynamische Komposition im migrierten Code, keine Regression auf den
übrigen 15 Testseiten (Engine/Tooling/Ghost bleiben von der Manifestpflicht unberührt).

## 9. Scope-QA

```
M .claude/learning/session-log.md               (eigener Session-Eintrag, nicht AP-Scope)
M Apps/prokrastinations-preis/app.js
M Apps/prokrastinations-preis/app.test.html
M docs/App-Fabrik/01_DECISION_LOG.md
M docs/spec/APP-INTERFACE.md
M docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
M tools/check-test-pages.py
M Archiv/local/muss noch eingeordnet werden/claude_prompt_AP-tailwind-02_slice-1_shell-states.md   (gitignored, nicht in git status sichtbar)
A docs/steering/patches/AP-tailwind-02d_runtime-manifest_error-taxonomie_Ergebnis.md
```

Keine weitere Datei berührt. Insbesondere `app.css`, Tokens, Board/Mockups, Chart-/Engine-Code,
Rucksack (`fwContext`) und Theme-Build-Konfiguration unverändert — `fwContext` bleibt semantischer
Chart-Kontext, keine Tailwind-Klassen oder Manifest-/Build-Daten dort eingeführt.

`git diff --check`: keine neuen Auffälligkeiten außer der bereits bestehenden
Markdown-Zeilenumbruch-Konvention in `01_DECISION_LOG.md` (identisch zum Bestandsstil, siehe
AP-tailwind-02c/02a).

## 10. Wiederlesen

Alle acht geänderten Dateien nach Abschluss vollständig neu gelesen — Inhalt entspricht dem
beabsichtigten Stand. Keine Browser-Abnahme behauptet.

## 11. Verbleibende Abweichung (Follow-up, außerhalb des Write-Scopes)

`Apps/prokrastinations-preis/APP_SPEC.md` §12 (State-Modell-Tabelle) beschreibt die Empty-Zeile
weiterhin mit der jetzt taxonomisch überholten Bedingung „CSV valide, aber < 120 Datenzeilen oder
Pflichtfelder fehlen" — das ist nach dieser AP fachlich Error, nicht Empty. `APP_SPEC.md` steht nicht
im Write-Scope von AP-tailwind-02d; die Datei wurde bewusst nicht angefasst. Empfehlung an Albert:
kleine Folgekorrektur (§12-Tabelle: Empty-Zeile präzisieren oder entfernen, Error (b)/(c)-Zeilen um
den < 120-Zeilen-/Pflichtfeld-Fall ergänzen) außerhalb dieses APs.

---

```text
AP-tailwind-02d abgeschlossen
Status: GRUEN
Taxonomie synchronisiert: ja
F/K/L = Error/alert: ja
Play-CDN-Manifest geprüft: ja
Checker + Crashtests: ja (18/18)
Realer Checker: ja
Produktions-Build-Zielbild dokumentiert, nicht implementiert: ja
Geänderte Dateien:
- Apps/prokrastinations-preis/app.js
- Apps/prokrastinations-preis/app.test.html
- docs/App-Fabrik/01_DECISION_LOG.md
- docs/spec/APP-INTERFACE.md
- docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
- tools/check-test-pages.py
- Archiv/local/muss noch eingeordnet werden/claude_prompt_AP-tailwind-02_slice-1_shell-states.md
- docs/steering/patches/AP-tailwind-02d_runtime-manifest_error-taxonomie_Ergebnis.md (diese Datei)
Manuelle Abnahme nötig: F, K, L (und R) im Live Server
Follow-up außerhalb des Scopes: Apps/prokrastinations-preis/APP_SPEC.md §12 Empty-Zeile veraltet (§11 oben)
Kein Commit. Stop.
```
