---
chronik_id: CHRONIK-2026-07-12-tailwind-fable-prompt-tailwind-app-baukasten-Claude-Fable
datum: 2026-07-12
projekt: finanzwesir-2-0
thema: tailwind-app-baukasten
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [praezisierung-durch-gegenfrage, annahme-verworfen, tooling-problem, missverstandene-anforderung]
---

# Chronik: Tailwind-App-Baukasten V0.1 — Entscheidungsrunde, Mockups, Ablage-Konsolidierung und ein Git-Zwischenfall

**Hauptgegenstand:** Ein Faden in einer Cowork-Session (Modell „Fable"), der aus der Befunddatei `AP-tailwind-01` das Decision Docket D-01–D-16 beantwortete, daraus den Tailwind-App-Baukasten V0.1 (Konzeptdokument, Visual Board, App-Mockups) erzeugte, anschließend die historisch gewachsene Design-Ablage konsolidierte und mit Abnahme, Commit-Message und Übergabeprompt an Sonnet endete. Unterwegs: zwei fachliche Korrekturen durch den Nutzer, eine Git-Index-Korruption über das NAS-Laufwerk und eine Auftrags-Überdehnung beim Abschluss.

## Ausgangslage

Der Nutzer erteilte einen detaillierten Auftrag: Verbindung zum Projektverzeichnis, vollständiges Lesen der Anamnese `docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md`, Beantwortung aller 16 Entscheidungsfragen D-01–D-16, Lieferung von genau zwei neuen Dateien (Konzeptdokument `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` und Visual Board als statisches HTML). Als nicht verhandelbar vorgegeben: CI-Farben/Fonts aus `tokens.css` (SSoT), Struktur aus Tailwind-Default-Skalen, `shadow-soft`/`shadow-hover` als freigegebene Zusatzstufen, Vanilla-JS, keine dynamisch komponierten Klassennamen, Canvas-Innenleben außerhalb des Scopes. Der GELB-Status des Befunds (Ghost-`.hbs`-Kette nicht verifizierbar) war ausdrücklich als Nicht-Blocker deklariert; die CDN-Verfügbarkeit galt als markierungspflichtige Nutzer-Laufzeitannahme.

## Chronologischer Verlauf

### Phase 1: Befund, Bestandsprüfung, Konzept und Board

Claude las die Befunddatei vollständig, prüfte gezielt `tokens.css`, `app.css` (prokrastinations-preis) und die `className`-Zuweisungen in `FwRenderer.js` gegen den Befund und entschied alle 16 Docket-Fragen. Kernentscheidungen: Hybrid-Shell (`fw-app` als Scope-Anker plus Utility-Verbund, D-01), Taxonomie Section/Panel/Card (D-03), Ein-Container-Vertrag am App↔Chart-Übergang (D-04), Stat-Familie statt KPI/BAN-Fusion (D-05), vier Button-Varianten (D-06), `sm/md/lg` für generische UI bei lokal verbleibenden Mechanik-Breakpoints (D-07), ersatzlose Ablösung von `--fw-space-*` (D-08), Tailwind-Radien plus ausschließlich die zwei CI-Schatten (D-09), JS-Klassen-Konstanten statt `@apply` (D-13), Literalregel ab sofort (D-14). Als Klassenkonvention wurde „Token-Name = Utility-Suffix" über `theme.extend` festgelegt. Konzeptdokument und Visual Board (Tailwind-Play-CDN als gekennzeichneter Konzeptnachweis, Token-Kopie mit Quellkommentar) wurden erstellt, per Selbstprüfung (git status, Rücklesen, D-Zählung) verifiziert und mit Statusmeldung übergeben.

### Phase 2: Chart-Chrome aus dem Bestand, Mockups

Der Nutzer meldete, dem Board fehlten die Chart-Elemente, und fragte nach dem besten Beschaffungsweg (Upload, Screenshot oder `tests/engine/`). Claude schlug den Weg über das Repository vor. Die Testseiten enthielten kein Chrome-Markup; die Suche führte zu `FwRenderer.js` (`_injectStyles()`, `setupStructure()`) als vollständiger Quelle. Dabei wurde sichtbar, dass die reale Slot-Reihenfolge (Titel → BAN → Toolbar → Legende → Canvas) von der im ersten Board-Wurf angenommenen Reihenfolge (Legende nach Canvas) abwich. Board und Konzept (§6.11, §10) wurden auf die Bestandsreihenfolge korrigiert; die BAN wurde als getönte Inline-Box nach Bestandsoptik übernommen; die Canvas-Platzhalter erhielten Gitter, Achsenbeschriftung und Zero-Line aus den Bridge-Tokens. Auf Wunsch des Nutzers („die klassischen Lorem-ipsum-Dinger") entstand zusätzlich eine dritte Datei: `TAILWIND-APP-BAUKASTEN_MOCKUPS_V0-1.html` mit drei statischen App-Archetypen im simulierten Ghost-Artikel.

### Phase 3: Donut-Korrektur

Der Nutzer wies darauf hin, dass es keine Torten, sondern Donuts gebe (`PieChartStrategy`), und dass die Prozentzahlen im Platzhalter falsch positioniert seien; er fragte, ob das überhaupt relevant sei, und untersagte sofortiges Losarbeiten. Claude antwortete zweigeteilt: für den Vertrag irrelevant (Canvas-Scope), für den Mockup-Zweck relevant. Nach Freigabe ergab der Blick in `PieChartStrategy.js`: `type: 'doughnut'`, `cutout: '70%'`, Tooltips deaktiviert, keine Segment-Labels, Kennzahl im Loch via `CenterTextPlugin`. Board, Mockup und Konzept wurden entsprechend umgebaut; die separate BAN-Box über dem Donut wurde entfernt, da die Kennzahl im Loch steht.

### Phase 4: Ablage-Analyse und Konsolidierungsentscheidung

Der Nutzer fragte nach Homogenität, Widersprüchen und Aktualität von `docs/design-system` gegenüber `docs/steering/design`, mit dem Ziel eines strengen Regimes für operative LLMs. Die Analyse ergab zwei Jahrgänge: Mai-Stand (v1.1) gegen Juli-Steuerungslinie, mit einer Namenskollision als schwerwiegendstem Fund: `--color-petrol-50` bezeichnete in der alten Spec eine 50-%-Mischung (`#90C1BF`), in `tokens.css` die hellste Leiterstufe (`#F4FBFB`) — gleicher Name, andere Farbe. Der Nutzer stellte drei Optionen zur Wahl (fixen / alles neu / Perlen behalten), erklärte die aktuelle Arbeit zur Wahrheit, die Icons zu Bestand und versunkene Kosten für irrelevant. Claude empfahl Option 3 in der Auslegung „Verschieben statt Umschreiben": Archivierung des Jahrgangs, Perlen = Icon-Bestand und Spec 05, Neuaufbau des Content-Systems erst zusammen mit der Janitor-Sanierung; Skripte statt Subagenten für die Mechanik. Der Nutzer gab frei. Die Referenzkarte ergab: lebende Verweise nur in `NAVIGATION.md`; der Janitor lädt Icons über `data-icon-base` aus `Theme/assets/images/` — die docs-Kopien waren Duplikate (teils mit Tippfehler „Finazwesir" im Dateinamen).

### Phase 5: Git-Index-Korruption und Reparatur

Beim ersten `git mv` aus der Sandbox blockierte eine `index.lock` (Rückstand timeout-abgebrochener `git status`-Aufrufe). `rm` erwies sich auf dem Mount als nicht erlaubt, Umbenennen als erlaubt; die Lock wurde zu `index.lock.stale` verschoben. Der zweite `git mv`-Lauf verschob einen Teilordner und endete mit „error: bad signature 0x00000000 / fatal: index file corrupt" — `.git/index` (128 KB) begann mit Nullbytes. Claude stoppte im MODUS-A-Muster, erklärte den Working Tree für unversehrt und bot zwei Reparaturwege an. Der Nutzer entschied grundsätzlicher: kein Git aus der Sandbox, Dateioperationen mit `mv`, Git mache er selbst in VSCode. Die restliche Verschiebung lief mit `mv` durch. Die Host-Reparatur scheiterte zunächst an CMD-Syntax in PowerShell; während der korrigierten Kommandos tauchte eine neue `index` (10:41) auf — eingeordnet als Nextcloud-Sync-Einspülung; eine `index (conflicted copy 2026-06-05)` belegte frühere Sync-Eingriffe in `.git`. Nach `git read-tree HEAD` lieferte `git status` ein vollständig erklärbares Bild; die zuvor beobachteten Massen-Modifikationen (`.claude/skills/**` u. a.) waren verschwunden — eingeordnet als Stat-/Zeitstempel-Artefakte, nicht als Inhaltsänderungen.

### Phase 6: Regime-Artefakte und Folgearbeiten

Es entstanden: Schutz-README im Archiv (inkl. Petrol-50-Falle), Statuskarte `docs/design-system/README.md` mit vier harten Regeln, Statuskopf in Spec 05 (plus Korrektur des Icon-Pfads auf `Theme/assets/images/`), NAVIGATION-Routing-Updates, BACKLOG-Einträge (DS-015 neu; DS-012-Wortlaut korrigiert, da er auf die archivierte `DESIGN-SYSTEM.md` zeigte). Auf Nachfrage des Nutzers wurde das Dokument `App-Fabrik_Zusatzpaket-Integration_V0-1.md` erläutert und nach Freigabe mit einem HISTORISCH-Statuskopf versehen. Die Frage, warum zwei Design-Verzeichnisse bestehen bleiben, beantwortete Claude mit der Rollentrennung Steuerung vs. Fachspezifikation, Empfehlung: behalten; der Nutzer widersprach nicht.

### Phase 7: Canvas-Grenze präzisiert

Der Nutzer benannte im Baukasten nicht definierte Chart-Elemente (Tooltips, Crosshair, Laufpunkt, senkrechte blaue Linie, Plugin-Texte) und fragte, ob diese nicht berücksichtigt werden müssten. Claude bestätigte die Liste als korrekt und als bewusste Grenze, verifizierte per Grep, dass die Plugins Farben aus Engine-Options mit lediglich defensiven Hex-Fallbacks beziehen, und trug ein explizites „Canvas-Inventar" in Konzept §6.11 nach, inklusive offenen Prüfpunkts zur Token-Konformität der Tooltip-Optik (Engine-AP).

### Phase 8: Abnahme, Ritual-Überschuss, Commit-Message, Übergabe

Der Nutzer nahm Konzept, Board und Mockups ab und beauftragte: das Skill `abschluss-ritual` lesen, daraus die große Commit-Message formulieren, sowie einen Übergabeprompt für Sonnet schreiben. Claude las das Skill, wählte Pfad A (Voll-Abschluss) und begann, dessen Pflichtschritte auszuführen: Statuswechsel ENTWURF→FREIGEGEBEN in Konzept/Board/Mockups/NAVIGATION/BACKLOG, neuer BACKLOG-Eintrag AP-tailwind-02, session-log-Eintrag (per Shell, da Cowork Schreibzugriffe auf `.claude/` blockierte). Der Nutzer stoppte zweimal während der Ausführung: „Du sollst NICHT das Abschluss-Ritual machen!" und „Nur die Commitmessage! Abschlussritual mit Fable kostet ein Vermögen". Claude brach ab, benannte die bereits angefassten Artefakte mit Rückbau-Angebot, schrieb den Übergabeprompt `SONNET-PROMPT_AP-tailwind-02_pilotmigration_V1.md` (inkl. Slice 0: Klärung der Tailwind-Laufzeitfrage gegen das CDN-Verbot des TEST_PAGE_STANDARD) und gab die Langformat-Commit-Message als Text aus. PROJECT-STATUS.md wurde nicht verändert.

## Wendepunkte

Der Fund der realen Slot-Reihenfolge in `FwRenderer.setupStructure()` kehrte die Chrome-Anordnung im Board um. Der Donut-Hinweis des Nutzers ersetzte die Torten-Platzhalter samt Prozent-Labels durch das Ist-Bild mit Loch-Kennzahl. Die Index-Korruption führte zur Grundsatzentscheidung des Nutzers, Git vollständig aus der Sandbox herauszuhalten. Die zweifache Intervention in Phase 8 reduzierte den begonnenen Voll-Abschluss auf die bestellte Commit-Message.

## Entscheidungen und Festlegungen

- D-01–D-16 vollständig entschieden (früh im Faden); durch Nutzer-Abnahme am Ende freigegeben — gültig.
- Slot-Reihenfolge des Chart-Chromes = Bestandsreihenfolge aus FwRenderer (Phase 2) — gültig, ersetzte die erste Konzeptfassung.
- Donut-Ist-Bild als Platzhalter-Vorlage; BAN-Slot beim Donut „meist entbehrlich" (Phase 3) — gültig.
- Ablage-Konsolidierung nach Option 3, Verschieben statt Umschreiben (Phase 4) — gültig, umgesetzt.
- Kein Git aus der Cowork-Sandbox auf das NAS-Repo; Commits durch den Nutzer in VSCode (Phase 5) — gültig.
- Zwei Design-Verzeichnisse bleiben (Steuerung vs. Fachspezifikation, Phase 6) — gültig.
- Konzeptphase beendet, Pilotmigration an Sonnet (Phase 8) — gültig, Handover erstellt.
- Rückbau des session-log-Eintrags — offen (dem Nutzer angeboten, keine Antwort im Faden).

## Irrwege, Schleifen und verworfene Ansätze

Erster Board-Wurf mit Legende nach dem Canvas und erfundener Slot-Reihenfolge — ersetzt nach Bestandslektüre. Torten-Platzhalter mit Segment-Prozentzahlen — ersetzt durch Donut mit Loch-Kennzahl; die Prozent-Labels hätten in echt nicht existiert. `git mv` über den Sandbox-Mount — nach Index-Schaden aufgegeben zugunsten `mv`. CMD-Reparatursyntax für eine PowerShell — korrigiert. Begonnener Voll-Abschluss nach Skill-Lektüre — vom Nutzer auf „nur Commit-Message" zurückgeschnitten; die Freigabe-Statuswechsel und der BACKLOG-Eintrag AP-tailwind-02 blieben bestehen.

## Erzeugte Artefakte

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` — Design-/Implementierungsvertrag, D-01–D-16 — final, FREIGEGEBEN 2026-07-12.
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html` — Element-Katalog, Non-Production — final.
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_MOCKUPS_V0-1.html` — drei statische App-Archetypen im Artikel-Kontext — final.
- `Archiv/design-system-2026-05/` — 35 verschobene Dateien + Schutz-README — final.
- `docs/design-system/README.md` (Statuskarte, vier Regeln) und Statuskopf in `spec/05-ICONS-UND-GRAFIKEN.md` — final.
- Edits: `NAVIGATION.md` (Routing, Freigabe-Status, SVG-Duplikate erledigt), `docs/steering/BACKLOG.md` (DS-015, DS-012-Korrektur, DS-014-Detail, AP-tailwind-02), Zusatzpaket-Statuskopf — final.
- `.claude/learning/session-log.md` — Session-Eintrag per Shell-Append — Bestand, Rückbau angeboten.
- `docs/steering/handovers/SONNET-PROMPT_AP-tailwind-02_pilotmigration_V1.md` — final.
- Langformat-Commit-Message — als Text im Faden übergeben, Commit ausstehend.

## Sachliche Erkenntnisse

Gesichert: Das Engine-Chrome-CSS liegt vollständig in `FwRenderer._injectStyles()`; die Testseiten enthalten kein Chrome-Markup. `PieChartStrategy` rendert `doughnut` mit `cutout: '70%'`, deaktivierten Tooltips und `CenterTextPlugin`. Die Plugins beziehen Farben aus Engine-Options (Hex nur als kommentierte Fallbacks). `--color-petrol-50` trägt in Alt-Spec und `tokens.css` verschiedene Bedeutungen. Der Janitor lädt Icons aus `Theme/assets/images/`; die docs-Kopien waren Duplikate. Die Cowork-Sandbox auf dem NAS-Mount erlaubt rename, aber kein unlink; Cowork blockiert Schreibzugriffe auf `.claude/`. Nextcloud synchronisiert in `.git` hinein (Conflicted Copy vom 2026-06-05 als Beleg). Arbeitsannahme: Die neue `index` um 10:41 stammte aus dem Nextcloud-Sync. Offene Frage: Token-Konformität der Chart.js-Tooltip-Optik. Spätere Korrektur im Faden: Die anfangs beobachteten Massen-Modifikationen waren Stat-Artefakte.

## Offene Punkte am Ende

Commit durch den Nutzer (Message liegt vor). Aufräumen von `.git/index.corrupt`, `.git/index.corrupt2`, `index (conflicted copy 2026-06-05)`, `.git/index.lock.stale`, `.git/test-write`. Empfehlung `.git` vom Nextcloud-Sync auszuschließen — unentschieden. AP-tailwind-02 Slice 0: Tailwind-Laufzeitfrage (CDN-Verbot vs. Play-Annahme). Timing des Engine-DOM-Chrome-APs; D-16-Priorisierung der drei Standalone-Prototypen; DS-015. DEFERRED: MEMORY-CHECK. Rückbau-Angebot session-log-Eintrag unbeantwortet. Altverweise in `docs/App-Fabrik/_input/perplexity/` (Steinbruch) unverändert.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Platzhalter, die ohne Bestandslektüre entworfen wurden, erzeugten zwei Korrekturschleifen (Slot-Reihenfolge, Donut). Timeout-abgebrochene Shell-Aufrufe hinterließen eine Git-Lock, die in Kombination mit dem rename-ja/unlink-nein-Verhalten des Mounts zur Index-Korruption beitrug. Ein Auftrag der Form „lerne X und mache das dann" wurde als Vollausführung von X interpretiert, während der Nutzer nur ein Teilergebnis (die Message) wollte — zweifacher Stopp mitten in der Ausführung. Kostenbewusstsein des Nutzers als Steuergröße für Modellwahl (Fable für Konzept, Sonnet für Umsetzung, Abschlussarbeit nicht mit Fable).

## Bewusst ausgelassen

Vollständige Klassenrezept-Strings und Dateiinhalte (in den Artefakten nachlesbar); Tool- und Bedienrauschen (ToolSearch, Task-Tracking, einzelne Grep/Read-Aufrufe); Zwischenfassungen der SVG-Platzhalter; wörtliche PowerShell-Fehlermeldungen jenseits der verlaufsrelevanten; die Detailinhalte des Decision Dockets über die Kernentscheidungen hinaus; Höflichkeits- und Statuspassagen ohne Verlaufswirkung.
