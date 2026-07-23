---
chronik_id: CHRONIK-2026-07-23-css-altlasten-janitor-token-auslieferung
datum: 2026-07-23
projekt: finanzwesir-2-0
thema: css-altlasten-janitor-token-auslieferung
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, blockade, tooling-problem, annahme-verworfen, konzept-vs-umsetzung]
---

# Chronik: CSS-Altlasten, Janitor-Grenze und Theme-Auslieferung

Hauptgegenstand war die Klärung zweier zurückgestellter Theme-Themen vor dem Beginn der App-Fabrik: die leere Janitor-Fallback-Sektion und die Artefaktform von `tokens.css`. Aus einer zunächst klein wirkenden Bereinigung entstand eine abgegrenzte Folge aus Architekturentscheidung, Umsetzungsprompts, Nachprüfung, Dokumentationskorrektur und Ghost-Theme-Auslieferung.

## Ausgangslage

Der Nutzer brachte eine bereits von Claude geprüfte Bestandsaufnahme ein. Danach waren beide Themen im zentralen `BACKLOG.md` unter T1 verankert, inhaltlich aber noch offen. Die Sektion „JANITOR FALLBACK“ in `Theme/src/css/screen.source.css` war leer. `tokens.css` wurde dort mit `@import url("../../assets/css/tokens.css")` eingebunden. Diese Form stand in Spannung zum später festgelegten Ein-Artefakt-Vertrag, weil ein `url()`-Import vom CSS-Compiler nicht zwingend eingebettet wurde.

Die Recherche sollte nicht wiederholt, sondern als Kontext behandelt werden. Gefordert war eine Entscheidung, ob die Punkte belanglos waren, vertagt werden konnten oder vor der App-Fabrik erledigt werden mussten.

## Chronologischer Verlauf

Zunächst wurde die Rolle des Janitors anhand des Codes eingeordnet. Das Skript wandelte bestimmte Ghost-Inhaltsmuster nachträglich in gestaltete Elemente um, darunter Blockquotes mit Markierungen wie `[!NOTE]`, `[!WARNING]` und `[!TIP]` sowie Listen mit `[+]` und `[-]`. Es diente damit als Übergangsmechanismus für normale Ghost-Seiten, deren Gestaltung noch nicht abschließend festgelegt war.

Der Nutzer präzisierte daraufhin die Systemgrenze. Für normale Ghost-Seiten sollte der Janitor erhalten bleiben. Innerhalb von Apps sollte er dagegen nichts verändern, weil die App-Struktur und deren Gestaltung einem eigenen Vertrag folgten. Die leere CSS-Fallback-Sektion sollte entfernt werden. Die im Janitor verwendeten, teilweise nicht mehr gedeckten Designklassen sollten in diesem Arbeitsgang nicht saniert, aber für die spätere Entwicklung normaler Ghost-Seitenelemente festgehalten werden.

Für `tokens.css` wurde eine unmittelbare Bereinigung festgelegt. In den Dokumenten der App-Fabrik wurde nach einer geeigneten Stelle für den maschinell zu prüfenden Ein-Artefakt-Vertrag gesucht. Als bestehender Anker wurde `docs/App-Fabrik/01_DECISION_LOG.md` mit D-CSS-03 verwendet. Für die spätere inhaltliche Janitor-Sanierung blieb der bereits vorhandene Backlog-Punkt DS-015 maßgeblich; ein paralleler Eintrag wurde vermieden.

Daraufhin wurde ein abgegrenzter Umsetzungsauftrag für Claude erzeugt. Er verlangte einen `.fw-app`-Ausschluss im Janitor, die Einbettung von `tokens.css` über einen vom Compiler auflösbaren Import, das Entfernen der leeren Fallback-Sektion, die Aktualisierung der einschlägigen Dokumentation und einen Build mit Nachweisen.

Vor der Umsetzung wurden drei Unsicherheiten benannt: Ob der Tailwind-v4-Compiler eine reine `:root`-Variablendatei beim Bare Import tatsächlich einbettete, ob das gebaute CSS dadurch die bisherige 30-KB-Grenze überschritt und ob jede App den vorausgesetzten `.fw-app`-Wrapper besaß. Diese Punkte wurden nicht durch weitere Planung entschieden, sondern als Prüfbedingungen an den realen Build und die bestehende A-02-App-Grenze gebunden.

Der anschließend übermittelte Claude-Abschlussbericht meldete acht geänderte Dateien. Im Janitor war `_isInApp(el)` mit `el.closest(".fw-app")` ergänzt worden. In den beiden Transformationen wurde vor der Verarbeitung ein Guard eingefügt. Übersprungene App-Elemente erhielten auch keine Janitor-Markierung. Die vorhandenen Designklassen blieben unverändert.

Der CSS-Build lief durch. Das erzeugte `Theme/assets/css/screen.css` enthielt keinen lokalen `@import` mehr. Die drei Token-Sentinels `--color-petrol-600`, `--font-body` und `--shadow-soft` sowie der App-Mechanik-Selektor `fw-app--prokrastinations-preis` waren im Artefakt vorhanden. Die Rohgröße betrug 31.594 Bytes. Eine Optimierung wurde entsprechend dem Auftrag nicht vorgenommen.

Bei der Nachprüfung wurden drei Restpunkte gefunden. In `.claude/PROTECTED_PATHS.json` war der nicht vorhandene Pfad `Theme/src/css/tokens.css` geschützt, nicht die reale Datei `Theme/assets/css/tokens.css`. Außerdem erwies sich die dokumentierte Größenbasis von rund 25,4 KB als historischer Zwischenstand; der unmittelbar vorherige Git-Stand hatte 30.074 Bytes umfasst. Schließlich verwies D-CSS-03 als Quelle auf den vorläufigen Auftrag im Ordner `Archiv/local/muss noch eingeordnet werden`, der kein dauerhafter Quellenanker war.

Ein zweiter, enger Prompt begrenzte den Nachputz auf Schutzpfad und Dokumentation. Danach war der reale Token-Pfad wieder mit dem unveränderten Schutzlevel `forbidden` erfasst. CSS-6 und T1 nannten 31.594 Bytes roh und 6.564 Bytes gzip und behandelten die Größe als zu prüfendes und zu begründendes Budget, nicht als automatisch verletzte harte Schranke. Der Quellenanker von D-CSS-03 verwies anschließend auf dauerhafte Quell- und Nachweisdokumente. Code, CSS, Build und Token-Datei wurden in diesem Schritt nicht verändert.

Nach Prüfung dieses Berichts wurde die Altlastenkette als beendet eingeordnet. T1 und CSS-6 blieben wegen ihrer darüber hinausgehenden Produktionsfragen offen, waren aber keine Voraussetzung für den Beginn der App-Fabrik.

Zum Abschluss wurde geklärt, ob für Ghost ein weiterer Theme-Build erforderlich war. Der CSS-Build war bereits erfolgt; erforderlich war nur noch die Verpackung des aktuellen Theme-Stands als Ghost-ZIP. Dafür wurde ein dritter Prompt erstellt. Er schrieb einen ZIP-Pfad vor, schloss `src/**`, die nur als Build-Quelle benötigte `assets/css/tokens.css` und verschachtelte ZIP-Dateien aus und verlangte normalisierte Pfade mit `/`. Ein erneuter CSS-Build, Codeänderungen und ein automatischer Upload waren ausgeschlossen. Der Nutzer meldete danach, dass alle Arbeiten erledigt und alle Prüfungen grün waren.

## Wendepunkte

Der erste Wendepunkt entstand durch die Trennung zwischen Janitor-Funktion und Janitor-Geltungsbereich. Aus der anfänglichen Frage nach Entfernen oder Befüllen wurde die Entscheidung, den Mechanismus für normale Ghost-Seiten zu behalten und Apps ausdrücklich auszunehmen.

Der zweite Wendepunkt war der reale Build. Er bestätigte die Einbettung der Tokens und beseitigte damit die zentrale Compiler-Annahme. Zugleich machte er die Größenangabe überprüfbar.

Der dritte Wendepunkt entstand in der Nachprüfung. Nicht die CSS-Mechanik, sondern Schutzpfad, historische Größenbasis und Quellenstabilität erforderten einen weiteren begrenzten Arbeitsgang.

## Entscheidungen und Festlegungen

- Der Janitor blieb für normale Ghost-Inhalte bestehen.
- Elemente innerhalb von `.fw-app` wurden von Janitor-Transformationen ausgeschlossen.
- Die leere Janitor-Fallback-Sektion wurde entfernt.
- Die inhaltliche Sanierung alter Janitor-Designklassen wurde DS-015 zugeordnet und nicht Teil der App-Fabrik-Vorbereitung.
- `tokens.css` wurde in das eine ausgelieferte CSS-Artefakt eingebettet.
- D-CSS-03 im App-Fabrik-Entscheidungslog blieb der dauerhafte Vertrag für die maschinelle Ein-Artefakt-Prüfung.
- Die CSS-Größe wurde als begründungsbedürftiges Budget geführt; aus 31.594 Rohbytes allein folgte keine Optimierung.
- Für Ghost wurde kein zweiter CSS-Build verlangt, sondern nur eine bereinigte Theme-ZIP-Verpackung.

## Irrwege, Schleifen und verworfene Ansätze

Die leere Fallback-Sektion war zunächst als mögliche spätere Erweiterungsstelle behandelt worden. Diese Zwischenform wurde verworfen, weil sie keinen aktuellen Mechanismus enthielt und einen nicht vorhandenen Schutz suggerierte.

Die Annahme, eine reine Token-Datei könne beim Bare Import möglicherweise nicht eingebettet werden, blieb bis zum Build unbewiesen und wurde durch den Artefaktnachweis verworfen.

Die frühere Größenangabe von etwa 25,4 KB wurde nicht als aktuelle Vergleichsbasis übernommen. Maßgeblich waren der Git-Vorstand von 30.074 Bytes sowie die gemessenen 31.594 Bytes roh und 6.564 Bytes gzip.

Ein zusätzlicher Backlog-Punkt für den Janitor wurde vermieden, weil DS-015 den späteren Themenbereich bereits trug. Ebenso wurde der vorläufige Promptordner nicht als dauerhafte Quelle im Entscheidungslog belassen.

## Erzeugte Artefakte

- `Archiv/local/muss noch eingeordnet werden/CLAUDE_PROMPT_CSS-ALTLASTEN_tokens-janitor-grenze_2026-07-23.md`
- `Archiv/local/muss noch eingeordnet werden/CLAUDE_PROMPT_CSS-ALTLASTEN_NACHPUTZ_schutzpfad-groessenbeleg-quellenanker_2026-07-23.md`
- `Archiv/local/muss noch eingeordnet werden/CLAUDE_PROMPT_GHOST-THEME-ZIP_janitor-tokens_2026-07-23.md`
- geänderte Janitor-Grenzlogik in `Theme/assets/js/fw-janitor.js`
- eingebettete Token-Auslieferung in `Theme/assets/css/screen.css`
- aktualisierte Verträge und Statusangaben in `BACKLOG.md`, `CSS-KONVENTIONEN.md`, `T1-TAILWIND-PRODUKTIONSBUILD-PLAN.md`, `docs/design-system/README.md` und `docs/App-Fabrik/01_DECISION_LOG.md`
- korrigierter Schutzpfad in `.claude/PROTECTED_PATHS.json`
- nach dem letzten Prompt erzeugte Ghost-Theme-ZIP; Abschluss und Prüfstatus wurden vom Nutzer bestätigt

## Sachliche Erkenntnisse

Der Janitor war kein allgemeines Theme-Fallback, sondern ein DOM-Nachbearbeiter für redaktionelle Ghost-Muster. Seine zulässige Reichweite ließ sich deshalb durch einen strukturellen App-Wrapper begrenzen.

Der Tailwind-v4-Build bettete die zentrale Token-Datei in der gewählten Importform ein. Der Nachweis bestand nicht nur im fehlenden `@import`, sondern auch im Vorhandensein definierter Token-Sentinels und der App-Mechanik im erzeugten Artefakt.

Rohgröße und Übertragungsgröße beschrieben unterschiedliche Sachverhalte. Die gzip-Größe von 6.564 Bytes ergänzte die Rohgröße von 31.594 Bytes und verhinderte, dass eine historische Zwischenzahl als unveränderlicher Vertrag behandelt wurde.

Schutzregeln waren nur wirksam, wenn sie auf den realen kanonischen Pfad zeigten. Eine formal vorhandene Regel für eine nicht vorhandene Quelldatei schützte das ausgelieferte Token-Artefakt nicht.

## Offene Punkte am Ende

Für diese Altlastenkette blieb kein offener Punkt. T1, CSS-6 und DS-015 blieben als bewusst getrennte spätere Aufgaben bestehen: weitere Produktions-Gates, fortlaufende Größenbegründung und die Gestaltung normaler Ghost-Seitenelemente. Sie blockierten die App-Fabrik nicht.

## Analysefähige Rohmuster

- Eine kleine CSS-Altlast berührte gleichzeitig Runtime-Grenzen, Buildvertrag, Schutzpfade, Dokumentation und Auslieferung.
- Unsichere Compilerannahmen wurden durch einen Artefaktlauf mit Sentinels entschieden.
- Die Begrenzung eines Übergangsmechanismus war kleiner als seine Entfernung oder vollständige Überarbeitung.
- Ein Nachputz blieb beherrschbar, weil er auf Dokumentation und Schutzregel begrenzt wurde.
- Ein technischer Abschluss erforderte neben dem Build auch die Trennung zwischen Quellartefakt, Runtime-Artefakt und Ghost-Verpackung.

## Bewusst ausgelassen

Nicht rekonstruiert wurden vollständige Toolausgaben, einzelne Suchbefehle, Prüfsummen der drei Promptdateien und die Detailprotokolle jeder Dateisuche. Ebenfalls nicht ausgeführt wurde eine nachträgliche Analyse der noch offenen T1-, CSS-6- und DS-015-Arbeiten, weil sie außerhalb des abgeschlossenen Altlastenfadens lagen.
