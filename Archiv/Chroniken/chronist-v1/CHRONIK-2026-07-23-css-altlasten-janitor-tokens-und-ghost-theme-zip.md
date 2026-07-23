---
chronik_id: CHRONIK-2026-07-23-css-altlasten-janitor-tokens-und-ghost-theme-zip
datum: 2026-07-23
projekt: finanzwesir-2-0
thema: css-altlasten-janitor-tokens-und-ghost-theme-zip
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [blockade, praezisierung-durch-gegenfrage, durchbruch, annahme-verworfen, tooling-problem]
---

# Chronik: CSS-Altlasten, Janitor-/Token-Grenze und Ghost-Theme-ZIP

**Hauptgegenstand:** Der Faden begann mit `/start` (Fokus: AF-GM-01 abgeschlossen, nächster Schritt AF-GM-02), wandte sich dann aber sofort einem anderen Themenblock zu: dem Abschluss zweier seit längerem offener CSS-Altlasten (Janitor-Fallback-Sektion, `tokens.css`-Einbettung). Über drei nacheinander geladene, extern vorformulierte Auftragsdateien wurden CSS-Architektur, Schutzprofil und ein Ghost-Theme-ZIP bearbeitet. Am Ende stand ein durch manuelles Testen aufgedeckter, tieferliegender Befund: `fw-janitor.js` griff in Produktion nie, weil das Projekt nur Ghost-Pages statt Posts nutzt.

## Ausgangslage

`/start` lief im Vollmodus (kein Warm-Start, kein Kettenmodus-Treffer im Hook-Feld „Nächster Schritt“). Fokus laut Hook: `AF-GM-01 App-Fabrik-Fundament ✅ (2026-07-22)`, 8 aktive APs, geplanter nächster Schritt `AF-GM-02` (gepinnte Playwright-Chromium-Spur). Der Nutzer griff dieses Thema nicht auf, sondern fragte stattdessen nach dem Stand zweier Punkte aus einem früheren „Alt-Task“-Text: einer Janitor-Fallback-Sektion in `screen.css` (P2, Empfehlung: entfernen) und der Artefaktform von `tokens.css` (P3, Entscheidung „inline oder legalisieren“ nötig).

## Chronologischer Verlauf

### Bestandsaufnahme Alt-Task

Recherche in `BACKLOG.md` (Eintrag T1), `screen.source.css` und `01_DECISION_LOG.md` ergab: Die Dokupflicht aus dem Alt-Task war bereits erfüllt (beide Punkte standen wortwörtlich in T1), die technische Umsetzung aber nicht — die JANITOR-FALLBACK-Sektion war weiterhin leer, und `tokens.css` wurde weiterhin per `@import url(...)` geladen, was der zwischenzeitlich getroffenen Entscheidung D-CSS-03 (bare Import Pflicht) widersprach. Ein direkter Codeabgleich zeigte zusätzlich eine reale Spannung: D-CSS-03 verlangt bare Imports explizit, die tatsächliche Zeile nutzte aber weiterhin `url()`.

### Auftrag 1 — CSS-Altlasten schließen

Der Nutzer ließ eine Datei `CLAUDE_PROMPT_CSS-ALTLASTEN_tokens-janitor-grenze_2026-07-23.md` aus `Archiv/local/muss noch eingeordnet werden/` laden und vollständig ausführen. Die Datei war eine sehr detailliert vorformulierte Aufgabenstellung: `tokens.css` per barem Import einbetten, Janitor auf `.fw-app`-Teilbäume ausschließen (ohne die Designklassen anzufassen), die leere JANITOR-FALLBACK-Sektion ersatzlos entfernen, DS-015 präzisieren, D-CSS-03 im Decision Log präzisieren (keine neue ID), T1-Unterpunkte schließen ohne T1 selbst zu schließen. Ein Full-Gate mit 9 Fragen wurde beantwortet, inklusive Dispatch eines `spec-scout`-Subagenten zur Extraktion der Pflichtquellen (CSS-KONVENTIONEN.md, T1-Plan, Decision-Log A-04/D-CSS-03/04, Peer-Review F-03/F-04/F-07). Der Nutzer gab „OK, setze um“.

### Blockade durch Schutzprofil

Der erste Edit-Versuch auf `screen.source.css` wurde vom Pre-Edit-Hook mechanisch abgefangen. Ursache: `screen.source.css` und `01_DECISION_LOG.md` standen in `.claude/PROTECTED_PATHS.json` auf `forbidden` — dieser Zustand war beim Full-Gate nicht gegen die JSON-Datei geprüft worden. Es wurde verifiziert, dass an `screen.source.css` nichts durchgekommen war. Der Nutzer wurde per `AskUserQuestion` vor drei Optionen gestellt (temporär beide herabstufen / nur eine herabstufen / abbrechen) und wählte „Beide temporär auf 'protected' herabstufen“.

### Umsetzung nach Freigabe

Beide Pfade wurden mit sichtbarem Herabstufungsvermerk auf `protected` gesetzt, alle sechs geplanten Dateien geändert (`screen.source.css`, `fw-janitor.js`, `CSS-KONVENTIONEN.md`, `T1-TAILWIND-PRODUKTIONSBUILD-PLAN.md`, `BACKLOG.md`, `docs/design-system/README.md`, `01_DECISION_LOG.md`), danach `npm run css:build` ausgeführt. Ergebnis: Build erfolgreich, aber `screen.css` maß 31.594 Bytes — über dem 30-KB-Ziel. Der Auftrag verlangte in diesem Fall ausdrücklich, nicht zu optimieren, sondern den Messwert als Stop-Befund zu melden; das geschah. Nachweise (kein lokaler `@import` mehr im Artefakt, Token-Sentinels vorhanden, App-Mechanik-Selektor vorhanden, keine „JANITOR FALLBACK“/„sieben Abschnitte“-Reste in aktiven Nicht-Archiv-Dokumenten) liefen grün. Die `.fw-app`-Grenzlogik wurde mangels Browser-Werkzeug nur isoliert simuliert (ein Fake-DOM-Objekt mit `closest()`-Nachbildung), nicht im echten DOM getestet — das wurde ausdrücklich als offene manuelle Prüfung gemeldet. Beide Schutzpfade wurden anschließend sofort auf `forbidden` zurückgestuft und verifiziert.

### Auftrag 2 — Nachputz

Eine zweite Datei (`CLAUDE_PROMPT_CSS-ALTLASTEN_NACHPUTZ_schutzpfad-groessenbeleg-quellenanker_2026-07-23.md`) wurde geladen: Sie korrigierte drei verbliebene Vertragsfehler — einen falschen `tokens.css`-Pfad im Schutzprofil (`Theme/src/css/tokens.css` existierte nicht real, real war `Theme/assets/css/tokens.css`), eine irreführend harte „< 30 KB“-Formulierung in `BACKLOG.md` (CSS-6), und einen instabilen Quellenverweis in D-CSS-03 auf die vorläufige Prompt-Datei unter `Archiv/local/…`. Nach kurzem Full-Gate und „OK“ wurden alle drei Punkte umgesetzt — für `01_DECISION_LOG.md` erneut über denselben Downgrade→Edit→Relock-Zyklus, diesmal im Auftrag selbst vorautorisiert. Alle Nachweise (JSON-Parsebarkeit, vier Endzustandspfade `forbidden`, kein Treffer mehr für den falschen Pfad, reale Existenz von `tokens.css`, kein Archiv/local-Verweis mehr im Decision Log, Bytewerte in CSS-6/T1 vorhanden) liefen grün.

### Auftrag 3 — Ghost-Theme-ZIP

Eine dritte Datei (`CLAUDE_PROMPT_GHOST-THEME-ZIP_janitor-tokens_2026-07-23.md`) verlangte reine Paketierung: aus dem bereits gebauten `Theme/`-Stand ein neues Upload-ZIP erzeugen, ohne erneuten Build, ohne Codeänderung. Vorprüfung bestätigte die drei nötigen Laufzeitdateien und dass die Zieldatei noch nicht existierte. Ein Light-Gate (genau eine neue Datei, kein Tabu-Bereich) wurde beantwortet und freigegeben. Da frühere Sessions bereits dokumentiert hatten, dass `Compress-Archive` und ein unkontrolliertes `ZipFile.CreateFromDirectory()` unter Windows Backslash-Pfade in ZIP-Einträgen erzeugen, wurde stattdessen ein temporäres, nicht im Repository gespeichertes PowerShell-Skript mit `System.IO.Compression.ZipArchive` geschrieben, das jeden Dateieintrag einzeln mit manuell auf `/` normalisiertem Pfad anlegte. `finanzwesir-local-theme-janitor-tokens-v1.zip` entstand (96 Einträge, 1.648.315 Bytes). Alle acht Strukturchecks, alle zwölf Pflichtdateien und die Bytegleichheit von `screen.css`/`fw-janitor.js` per SHA-256 wurden bestätigt; die temporären Skripte wurden danach gelöscht.

### Manuelle Prüfung durch den Nutzer

Der Nutzer erhielt eine Schritt-für-Schritt-Anleitung für die Firefox-Netzwerkanalyse (F12 → Netzwerkanalyse → CSS-Filter → Hard-Reload → auf `tokens.css`-Abwesenheit prüfen). Er meldete, die Seite lade `screen.css` und `cards.min.css`. Letzteres wurde als unabhängige Ghost-Core-Datei (Koenig-Card-Styling, unabhängig vom Theme-Build) eingeordnet — die Abwesenheit von `tokens.css` als eigentlicher Erfolgsnachweis bestätigt.

### Durchbruch — Janitor lud gar nicht

Der Nutzer meldete anschließend, dass keine JavaScript-Datei mit „jani“ im Namen geladen werde — die Janitor-Boxen funktionierten nicht. Eine Suche über alle `.hbs`-Dateien zeigte: Nur `post.hbs` (Zeile 52) band `fw-janitor.js` ein, und zwar innerhalb eines `{{#post}}`-Blocks. Es wurde nachgefragt, ob auf einem echten Post oder einer Page getestet wurde. Der Nutzer stellte klar: Das Projekt hat **keine echten Blog-Artikel**, nur Seiten (Pages) und die Homepage. Das erklärte den beobachteten Fehler vollständig: `fw-janitor.js` wurde in der tatsächlich genutzten Produktionsumgebung nie geladen. Eine Prüfung zeigte, dass `page.hbs` zwar wie `post.hbs` eine `.gh-content`-Sektion rendert (Zeile 205), aber kein Janitor-`<script>`-Tag besaß; `index.hbs`, `tag.hbs`, `author.hbs`, `error.hbs` besaßen weder `.gh-content` noch benötigten sie das Skript. `default.hbs` (globaler Layout-Einstieg, lädt bereits global `apps/index.js`) wurde als möglicher zentralerer Einbindungsort erwogen, aber verworfen, weil `default.hbs` als `forbidden` geschützt ist — stattdessen wurde die kleinere, konventionsgleiche Lösung gewählt: dieselbe Zeile wie in `post.hbs` nach `page.hbs` duplizieren.

### Fix und ZIP v2

Nach einem knappen Full-Gate und „ok“ wurde genau eine Zeile in `page.hbs` ergänzt (`<script defer src="{{asset "js/fw-janitor.js"}}" …>`, wortgleich zu `post.hbs`). Ein zweites ZIP (`finanzwesir-local-theme-janitor-tokens-v2.zip`, 96 Einträge, 1.648.344 Bytes) wurde nach demselben Verfahren erzeugt; zusätzlich zu den Struktur- und Pflichtdateien-Nachweisen wurde gezielt geprüft, dass das gepackte `page.hbs` die neue `fw-janitor.js`-Referenz enthält.

### Rückmeldung: teilweise funktionsfähig

Der Nutzer bestätigte, Janitor sei jetzt eingebunden, meldete aber zwei neue funktionale Fehler: (1) Icons fehlen bei den Boxen, (2) in Listen funktionieren nur die grünen Haken, nicht die roten Kreuze. Er stufte dies ausdrücklich als spätere Aufgabe ein, nicht als sofort zu behebenden Fehler, und bat darum, dies im Backlog dort zu vermerken, wo bereits Janitor-Arbeit verzeichnet ist. CSS-Thema und alle Apps wurden als abgenommen bezeichnet. Anschließend beauftragte er eine Chronik dieses Fadens sowie den Start des Abschluss-Ritual-Skills, mit der ausdrücklichen Entscheidung an Claude überlassen, ob die Backlog-Notiz zu den Janitor-Bugs und die Abnahme-Feststellung Teil des Rituals oder ein separater Schritt sein sollen.

## Wendepunkte

- Der Hook-Block beim ersten Edit-Versuch (Schutzprofil-Konflikt) wandelte den Ablauf von direkter Ausführung in eine Rückfrageschleife per `AskUserQuestion`.
- Albert Klarstellung „keine echten Blog-Artikel, nur Seiten und Homepage“ veränderte die Diagnose von einem punktuellen Ladefehler zu einer strukturell fehlenden Einbindung in der tatsächlich genutzten Produktionsumgebung.

## Entscheidungen und Festlegungen

1. **`tokens.css` per barem Import einbetten, kein zweites Laufzeitartefakt.** Wann: Auftrag 1. Begründung: D-CSS-03 verlangt bare Import; `url()` wird vom Tailwind-Compiler nicht inlined. Status: gültig, per Grep-Nachweis bestätigt.
2. **JANITOR-FALLBACK-Sektion (Abschnitt 7) ersatzlos aus CSS-Quelle und Dokumentation entfernt.** Wann: Auftrag 1. Begründung: leer, nie befüllt, architektonisch falscher Kaskaden-Kommentar. Status: gültig.
3. **Janitor erhält `.fw-app`-Ausschlussgrenze via `closest()`.** Wann: Auftrag 1. Begründung: Apps besitzen eigenes Markup, Janitor soll dort inert bleiben. Status: gültig umgesetzt, aber nur isoliert simuliert — kein echter Browsertest.
4. **Zwei Schutzpfade wurden je zweimal temporär herabgestuft und sofort zurückgestuft.** Wann: Auftrag 1 und erneut Auftrag 2. Begründung: mechanischer Hook-Block, nur eine echte JSON-Statusänderung wirkt. Status: gültig als Verfahren, am Fadenende beide wieder `forbidden`.
5. **Falscher Pfad `Theme/src/css/tokens.css` im Schutzprofil permanent auf `Theme/assets/css/tokens.css` korrigiert.** Wann: Auftrag 2. Status: gültig, dauerhaft.
6. **D-CSS-03 erhielt eine datierte Präzisierung ohne neue Entscheidungs-ID.** Wann: Auftrag 1, Quellenzeile in Auftrag 2 stabilisiert. Status: gültig.
7. **Größenziel < 30 KB für `screen.css` bleibt Optimierungsziel, ausdrücklich kein Weglass-Gate.** Wann: Auftrag 2. Status: offen — CSS-6 bleibt dafür im Backlog.
8. **Ghost-Theme-ZIPs werden ausschließlich über manuell konstruiertes `ZipArchive` mit normalisierten Vorwärtsslash-Pfaden erzeugt.** Wann: Auftrag 3. Status: gültig, zweimal angewandt (v1, v2).
9. **Janitor-Fix als Duplikat-Zeile in `page.hbs`, nicht zentral in `default.hbs`.** Wann: Fix nach Durchbruch. Begründung: `default.hbs` ist `forbidden`, kleinere Änderung gewählt. Status: gültig, aber als künftiger Diskussionspunkt (zentral vs. dupliziert) nicht abschließend bewertet.

## Irrwege, Schleifen und verworfene Ansätze

- Der erste Full-Gate-Durchlauf für Auftrag 1 prüfte die neun Gate-Fragen, ohne vorher `PROTECTED_PATHS.json` gegen den geplanten Schreibumfang abzugleichen — das führte zum blockierten ersten Edit-Versuch und einer zusätzlichen Rückfrageschleife. Als Lehre markiert, aber nicht in eine dauerhafte Regel überführt.
- `default.hbs` wurde als zentralere, DRY-konforme Fix-Stelle für das Janitor-Skript erwogen (analog zur globalen Einbindung von `apps/index.js` dort), dann zugunsten der kleineren, Tabu-freien Lösung in `page.hbs` verworfen.

## Erzeugte Artefakte

- `Theme/src/css/screen.source.css` — bearbeitete Build-Quelle, Status: final für diesen Faden.
- `Theme/assets/css/screen.css` — Build-Artefakt, einmal neu erzeugt (31.594 Bytes), Status: final, Größenziel offen.
- `Theme/assets/js/fw-janitor.js` — `.fw-app`-Grenzlogik ergänzt, Status: final im Code, funktional aber laut Nutzerrückmeldung teilweise fehlerhaft (Icons, rote Kreuze).
- `Theme/page.hbs` — um Janitor-Script-Tag ergänzt, Status: final.
- `docs/steering/design/CSS-KONVENTIONEN.md`, `docs/steering/design/T1-TAILWIND-PRODUKTIONSBUILD-PLAN.md`, `docs/design-system/README.md` — Doku-Präzisierungen, Status: final.
- `docs/steering/BACKLOG.md` — T1 präzisiert, DS-015 präzisiert, CSS-6 wahrheitsgemäß neu formuliert, Status: final für diesen Faden, T1/CSS-6 bleiben offen.
- `docs/App-Fabrik/01_DECISION_LOG.md` — D-CSS-03-Präzisierung mit stabilisierter Quellenzeile, Status: final.
- `.claude/PROTECTED_PATHS.json` — Pfadkorrektur (`tokens.css`) dauerhaft, zwei Downgrade/Relock-Zyklen ohne Nettoänderung am Ende. Status: final, beide Pfade wieder `forbidden`.
- `Theme/finanzwesir-local-theme-janitor-tokens-v1.zip`, `…-v2.zip` — Ghost-Upload-Pakete, Status: v2 ist der aktuelle Stand, v1 unverändert liegen gelassen.
- Temporäre PowerShell-Skripte im Scratchpad (ZIP-Erzeugung/-Verifikation) — Status: nach Gebrauch gelöscht, kein Repository-Artefakt.

## Sachliche Erkenntnisse

- **Gesicherter Stand:** `@import url(...)` wird vom Tailwind-v4-Compiler nicht inlined und bleibt ein zweiter Laufzeit-Download; nur die bare Importform (`@import "…";`) wird eingebettet.
- **Gesicherter Stand:** `Compress-Archive` und ein unkontrolliertes `ZipFile.CreateFromDirectory()` erzeugen unter der hier laufenden Windows-Umgebung Backslash-Pfade in ZIP-Einträgen — bereits aus früheren Sessions bekannt und in diesem Faden durch manuelles `ZipArchive` mit Pfadnormalisierung vermieden.
- **Gesicherter Stand (neu in diesem Faden):** `fw-janitor.js` war ursprünglich nur in `post.hbs` eingebunden; das Projekt verwendet ausschließlich Ghost-Pages statt Posts, wodurch Janitor in der realen Produktionsumgebung nie griff.
- **Arbeitsannahme, nicht verifiziert:** Die `.fw-app`-Grenzlogik wurde nur als isolierte Logiksimulation geprüft, nie im echten Browser-DOM.
- **Offene Frage:** Warum bei Info-/Warn-Boxen keine Icons erscheinen und warum nur die grünen Haken, nicht die roten Kreuze in Listen funktionieren — Ursache am Fadenende nicht untersucht.
- **Offene Frage:** Ob die Größenüberschreitung von `screen.css` (31.594 Bytes statt < 30 KB) durch reale Quellenreduktion weiterverfolgt wird oder als akzeptierter Zustand bestehen bleibt.

## Offene Punkte am Ende

- Zwei funktionale Janitor-Fehler (fehlende Icons bei Boxen, nicht funktionierende rote Kreuze in Listen) — vom Nutzer ausdrücklich als spätere Aufgabe eingestuft, noch nicht im Backlog vermerkt (Auftrag an Claude für den unmittelbar folgenden Schritt).
- CSS-6 (Größenbudget von `screen.css`) bleibt offen.
- T1 bleibt aus mehreren, in diesem Faden nicht bearbeiteten Gründen offen (Produktions-Gate, CDN-Ablösung der Testseiten).
- Kein Browser-/DOM-Test der `.fw-app`-Grenzlogik wurde durchgeführt.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Dreimal in Folge wurde eine externe, sehr präzise vorformulierte Auftragsdatei aus `Archiv/local/muss noch eingeordnet werden/` geladen und nahezu 1:1 umgesetzt (CSS-Altlasten, Nachputz, Theme-ZIP). Ursprung oder Autor dieser Dateien wurde im Faden nicht erfragt oder benannt.

Für spätere Musteranalyse vormerken: Der PROTECTED_PATHS-Hook blockierte in diesem Faden erneut einen Edit-Versuch — ein aus früheren Sessions bereits dokumentiertes Muster (mechanische Sperre, wirkt trotz mündlicher Freigabe). Die Lehre „vor Full-Gate-Antworten das Schutzprofil gegen den geplanten Schreibumfang prüfen“ wurde in diesem Faden nicht vorab angewendet, obwohl das Muster bereits bekannt war.

## Bewusst ausgelassen

Die wortlautgetreuen neun Full-Gate-Fragen und ihre vollständigen Antworten wurden auf ihre Kernaussagen verdichtet. Die einzelnen Klick-Schritte der Firefox-DevTools-Anleitung wurden zusammengefasst statt Wort für Wort wiederholt. Reine Bestätigungs- und Zwischenmeldungen ohne neue Information wurden weggelassen.
