---
chronik_id: CHRONIK-2026-07-11-ci-font-migration
datum: 2026-07-11
projekt: finanzwesir-2
thema: ci-font-migration
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, scope-drift, praezisierung-durch-gegenfrage, annahme-verworfen, unklare-zustaendigkeit]
---

# Chronik: CI-Font-Migration des Piloten prokrastinations-preis

**Hauptgegenstand:** Ein Steuerungsfaden, in dem die CI-Fonts (Source Sans Pro / Archivo Black) über `tokens.css` an die Chart-Engine und die Pilot-App gebunden wurden. Claude arbeitete durchgängig als steuerndes LLM: es schnitt Arbeitspaket-Prompts (APs) für ein ausführendes LLM und prüfte jeden Rücklauf gegen die realen Dateien. Der Faden umfasste Anamnesen, eine Spec-Änderung, zwei Code-Migrationen, ein unabhängiges Review und eine Doku-Synchronisierung.

## Ausgangslage

Der Nutzer verwies auf zwei Dateien (`TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`, ein Übergabeprompt zur CI-Kette). Der erste Upload kam leer an; ein UNC-Pfad (`\\NAS-DATENGRAB\...`) wurde vom Werkzeug abgelehnt; über den Ordner-Dialog wurde `Z:\Documents\Nextcloud\Finanzwesir 2.0` verbunden. Aus den gelesenen Dateien ergab sich die Trennung: der taktische Startprompt regelt das WIE (Arbeitsmodus), der Übergabeprompt das WAS (fachlicher Stand). Offener Kernpunkt: die Fonts waren nicht CI-konform, der Pilot rendert auf Fallback-`sans-serif`.

## Chronologischer Verlauf

### Erste Anamnese (Quell-Seite)
Auf Wunsch einer breiten Untersuchung „wie werden die Fonts eingebunden" schnitt Claude einen Anamnese-AP (Modell Sonnet). Der Rücklauf ergab: der Bruch ist ein Namens-Mismatch — `app.css` referenziert `--fw-font-base`, das nirgends definiert ist; das SSoT-Token heißt `--font-body`/`--font-display`. Zusatzfund: die Chart-Engine hat eine zweite, nie CSS-gebrückte Font-Quelle (`FwTheme.js` `this.fonts`, `init()` liest nur Farben).

### Reihenfolge-Umkehr: Spec zuerst
Der Nutzer forderte, Fonts überall gleichwertig zu Farben zu behandeln, gebunden an KDR 14 der `ARCHITECTURE STRATEGY PAPER VX.md` (Farb-Mechanismus bereits umgesetzt: `init()` liest Tokens, Constructor-Injection, Hardcode als Fallback). Claude stellte fest, dass `TECH-SPEC Theme-Integration Chart-Engine.md` §5.4 die Fonts noch als „hardcoded" beschrieb — nach dem Grundsatz „Spec schlägt Code" ein Konflikt. Daraus folgte der Wechsel: zuerst die Spec auf Font-Parität heben, dann Code. Der Spec-Parität-AP wurde umgesetzt (drei Dateien: KDR 14 P5, TECH-SPEC §5.4, CI-POOL §9), Status durchgängig „Code-Umsetzung offen", committet `a266cb2`.

### Erweiterte Anamnesen (Verbraucher-Seite)
Vor der Code-Migration fragte der Nutzer, ob wirklich alle Font-Stellen erfasst seien (Achsen, Pills, Plugins, KPI, Fehlermeldungen). Claude bestätigte, dass die erste Anamnese nur die Quell-Seite kartiert hatte, nicht die Render-Flächen. Es folgten zwei weitere Anamnese-APs: eine Textflächen-Karte (9 Canvas- + 10 HTML-Flächen) und eine Schließungs-Anamnese (`app.js` + `FwFormatUtils.js`), nachdem der Nutzer die wiederholte Scope-Einengung benannt hatte. Ergebnis: 360°-Karte, B6 (A11y-Tabelle) aufgelöst.

### Zwei Code-Migrationen
Pfad A (Canvas, Modell Opus): `FwTheme.init()` liest zusätzlich die Font-Tokens; die nie-init()'te Privatinstanz in `FwLayoutRules` wurde auf Fallback zurückgestuft, die Schrift läuft über den `fontConfig`/`styleConfig`-Parameter aus der injizierten Instanz; drei tote Font-Parameter wurden verdrahtet. 6 Engine-Dateien, committet `dbe5007`, danach unabhängig reviewt. Pfad B (HTML-UI, Opus): `app.css` `--fw-font-base` → `--font-body`; die engine-injizierten HTML-Flächen waren durch Pfad A bereits token-gespeist (verify-only). Browser-verifiziert.

### Spec-Hebung und Doku-Sync
Nach Pfad B wurde der Spec-Status einmalig auf „implementiert (Mechanismus + Pilot)" gehoben (drei Dateien). Ein Grep-Sweep zeigte, dass lebende Steuerungs-Dokumente (`PROJECT-STATUS.md`, `.claude/memory/project_ci_theme_bridge.md`, `BACKLOG.md`, `NAVIGATION.md`) noch „Fonts offen" führten. Ein Zusatz-Auftrag zum Abschluss-Ritual synchronisierte sie; `AP-prokrast-17-FOLLOWUP-FONT` wurde nach `BACKLOG-ARCHIV.md` verschoben.

## Wendepunkte

- Vom Code-zuerst zum Spec-zuerst-Vorgehen, ausgelöst durch die veraltete `TECH-SPEC` §5.4 und den Grundsatz „Spec schlägt Code".
- Verfahrensregel mitten im Faden: der Nutzer verlangte, nicht mehr direkt Prompts zu schreiben, sondern erst zu Ende zu besprechen und erst auf ausdrückliche Aufforderung zu schreiben.
- Entkopplung der Rubikon-Nachmessung von der Migration (Nutzer-Entscheidung: „Rubikon ist erst einmal unwichtig").
- Neubewertung: die Canvas- und engine-injizierten HTML-Flächen rendern bereits Source Sans Pro über den Constructor-Hardcode; sichtbar gebrochen ist nur der `--fw-font-base`-Zweig. Der Nutzer legte fest, dass „gut aussehen per Zufall" nicht ausreicht und die architektonische Bindung entscheidend ist.

## Entscheidungen und Festlegungen

- Ergebnisdateien der APs werden nach `docs/steering/patches/` abgelegt (nach einem Nutzerhinweis; gilt fortan) — gültig.
- Modellwahl: Sonnet für Anamnesen, Spec-Arbeit und Review; Opus für die Code-Migrationen — gültig.
- Reichweite: Pilot + Engine; alle Plugins/Strategien erhalten die Fonts. Andere Apps existieren noch nicht — gültig.
- Zwei getrennte Write-APs (A Canvas, B HTML-UI) statt eines — gültig.
- Tote Font-Parameter: verdrahten statt entfernen (Begründung: erledigt Tot-Beseitigung und Token-Speisung in einem Zug) — gültig.
- App-Headlines: Variante H-A (nur `--font-body`, kein `--font-display`/Archivo Black); Begründung: Nicht-Ziel „Design über minimalen Token-Bezug hinaus", und `.fw-chart-title` nutzt selbst `f.body` — gültig, Archivo-Black-Headlines als spätere Design-Entscheidung offen.
- Keine Zwischen-Hebung des Spec-Status; eine einmalige Hebung nach Pfad B (Variante 1) — gültig.
- `AP-prokrast-17-FOLLOWUP-FONT` als erledigt archiviert; `DS-FOLLOWUP-07` (Rubikon) bleibt offen — gültig.

## Irrwege, Schleifen und verworfene Ansätze

- Der erste Write-AP-Entwurf (`FONT-CODE-MIGRATION`) bündelte Canvas, Plugins, `app.css` und Rubikon; er wurde durch die Flächen-Karte überholt und durch zwei getrennte APs ersetzt.
- Die Anamnese-Scopes wurden zweimal zu eng geschnitten: `app.js` und `FwFormatUtils.js` waren zunächst ausgeschlossen, wodurch B6 „unklar" blieb; der Nutzer benannte dies („weil Du wieder zu geizig warst"), woraufhin die Schließungs-Anamnese folgte.
- Claude führte zunächst selbst Grep-Recherchen zur Farb-Spezifikation aus; der Nutzer wies dies zurück („Lass das das ausführende LLM machen"). Die Inventur wurde in den AP delegiert.
- Der erste Anamnese-Prompt enthielt keine `patches/`-Ablage-Anweisung; der Nutzer forderte die Ergebnisdatei nachträglich an.
- Ein Querverweis in KDR 14 P5 auf eine Ergebnisdatei wurde als möglicherweise ins Leere zeigend markiert; die Stelle wurde in der späteren Spec-Hebung ohnehin ersetzt.

## Erzeugte Artefakte

- AP-Prompts (Ablage `Archiv/local/muss noch eingeordnet werden/`): FONT-ANAMNESE, FONT-SPEC-PARITAET, FONT-CODE-MIGRATION (ersetzt), FONT-FLAECHEN-ANAMNESE, FONT-FLAECHEN-SCHLIESSUNG, FONT-CODE-A-CANVAS, FONT-CODE-A-REVIEW, FONT-CODE-B-HTMLUI, FONT-SPEC-HEBUNG, ZUSATZ-ABSCHLUSS_font-doku-sync — final bzw. ausgeführt.
- Code committet: Spec-Parität (`a266cb2`), Pfad A Canvas (`dbe5007`). Ergebnisprotokolle in `docs/steering/patches/`.
- Uncommittet am Fadenende: Pfad B (`app.css`, `QA_TEST_CASES.md`), Spec-Hebung (drei Dateien), Doku-Sync, `tools/ci-token-check.js` (`fwFontCheck()`), `TESTENV-1_harness-inventar_moderne-vs-legacy.md` — offen (Commit anstehend).

## Sachliche Erkenntnisse

- Gesicherter Stand: Der App-Font-Bruch war ein Namens-Mismatch (`--fw-font-base` undefiniert), kein fehlender Bridge.
- Gesicherter Stand: Zwei getrennte `FwTheme`-Instanzen speisten Canvas-Fonts — eine private, nie init()'te in `FwLayoutRules` (Achsen-Ticks/Tooltip) und die injizierte init()'te (Bar-Kategorie/Donut/HTML-UI).
- Gesicherter Stand: Drei tote Font-Übergabewerte (Y-Achse, Tooltip title/body, X-Achse Line) wurden nicht gelesen.
- Spätere Korrektur einer Arbeitsannahme: Tooltips werden auf Canvas gerendert, nicht als HTML.
- Gesicherter Stand: Vor der Migration rendeten die meisten Engine-Flächen Source Sans Pro bereits über den Constructor-Hardcode; die Migration änderte die Quelle (Token statt Hardcode), nicht den sichtbaren Wert (Null-Delta), belegt über den Diskriminator einfache vs. doppelte Anführungszeichen.
- Spätere Korrektur: `FwFormatUtils.js` wurde als font-frei verifiziert (zuvor Annahme).

## Offene Punkte am Ende

- Commit des letzten Standes (Pfad B + Spec-Hebung + Doku-Sync + Werkzeug) anstehend.
- App-Pool-Rollout auf die übrigen Apps.
- Rubikon-Nachmessung S/M/L (`DS-FOLLOWUP-07`), nach dem realen Font-Wechsel als sachlich fällig markiert.
- `TECH-SPEC` Z.286 (Farb-Staleness) nur geflaggt, nicht geändert.
- Zuordnung der `TESTENV-1`-Inventurdatei zum Font-Commit oder einem eigenen Commit — offen.
- `SLICE_0_KICKOFF.md` enthält noch `--fw-font-base` (als historisch eingestuft).

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken:
- Wiederholte Scope-Einengung der Anamnese-APs durch das steuernde LLM, in drei Iterationen erweitert (Quell-Seite → Flächen-Karte → Schließung).
- Durchgehendes Muster: jeder Rücklauf des ausführenden LLM wurde vor dem Weitergehen gegen die realen Dateien geprüft (Linchpin-Verifikation), teils mit eigenen Grep-/Read-Stichproben.
- Trennung von Schreiben und Zertifizieren: Spec-Status wurde erst nach Code + unabhängigem Review gehoben; ein Zwischen-Hebungs-Schritt wurde als Doppel-Edit verworfen.
- Rollenabgrenzung steuerndes vs. ausführendes LLM wurde mehrfach nachjustiert.

## Bewusst ausgelassen

Ausgelassen wurden: die vollständigen Wortlaute der einzelnen AP-Prompts und Ergebnisprotokolle, einzelne Grep-/Read-Werkzeugausgaben, routinemäßige Bestätigungen und Ablauf-Quittungen, sowie die Detailregeln der projektinternen `CLAUDE.md` außer dort, wo sie eine Entscheidung im Faden steuerten.
