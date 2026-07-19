---
chronik_id: CHRONIK-2026-07-19-ghost-lokalbetrieb-und-theme-m1
datum: 2026-07-19
projekt: finanzwesir-2-0
thema: ghost-lokalbetrieb-und-theme-m1
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: umsetzung
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, sackgasse, tooling-problem, annahme-verworfen, praezisierung-durch-gegenfrage]
---

# Chronik: Lokaler Ghost-Betrieb und M1-Homepage

**Hauptgegenstand:** Der Faden begann mit der Bitte, die vorhandene Finanzwesir-Website lokal mit Ghost.io zu betreiben und den späteren Umzug auf einen Produktionsserver vorzubereiten. Im Verlauf wurden der lokale Betrieb eingerichtet und stabilisiert, das Theme-Grundgerüst auf Tailwind ausgerichtet und die sichtbare Homepage als Meilenstein M1 umgesetzt und dokumentiert.

## Ausgangslage

Der Nutzer hatte erste Texte, eine Homepage und erste Apps im Projektbestand. Ghost.io sollte lokal getestet werden; die Verzeichnisstruktur sollte einen späteren Produktionsumzug nicht erschweren. Zu Beginn sollte eine knappe Liste von Meilensteinen entstehen. Die Arbeit wurde unter der Vorgabe geführt, bei jedem Einzelschritt vorzugehen und vor Eingriffen nachzufragen.

Im Bestand lag Node 24. Für Ghost wurde dennoch Node 22 vorgesehen, weil die Ghost-CLI für diese Laufzeit geprüft worden war. Der Nutzer fragte nach der möglichen Verwechslung zweier Node-Installationen, nach dem geplanten Verzeichnisbaum und nach vollständiger späterer Entfernbarkeit.

## Chronologischer Verlauf

### Lokale Laufzeit und Verzeichnisgrenze

Es wurde der lokale Pfad `C:\Tools\ghost-local\` als geschlossener Ghost-Bereich festgelegt. Darunter lagen die Ghost-Site und die für Ghost benötigten Laufzeiten. Node 22 wurde dort isoliert betrieben; das vorhandene System-Node 24 blieb für den Tailwind-Bau im Projekt bestehen. Python 3.14 des Rechners sollte unverändert bleiben. Für einen Ghost-CLI-Check wurde zusätzlich ein lokales Python-Umfeld unter `C:\Tools\ghost-local\runtime\python-env\` angelegt und Ghost zugewiesen.

Der Nutzer ließ den zweimaligen Fehlschlag in `.claude/ATTEMPT-LOG.json` festhalten und verlangte danach eine lesende Ursachenanalyse. Dabei wurde zwischen der lokalen Ghost-Umgebung und dem normalen Windows-System unterschieden. Die spätere Löschung von `C:\Tools\ghost-local\` sollte den eingerichteten Ghost-Bereich entfernen; System-Node, System-Python und das Projekt sollten davon getrennt bleiben.

Das Betriebsdokument `docs/steering/theme-build/GHOST-LOKALBETRIEB.md` wurde als Kochbuch vorgesehen und später mit dem tatsächlich benutzten Ablauf ergänzt.

### Startprobleme und Stabilisierung des lokalen Servers

Beim ersten Start wurde `http://localhost:2368/ghost/` zunächst nicht erreichbar. Ein Ghost-CLI-Fenster zeigte eine Admin-URL, gleichzeitig erschien ein zweites leeres PowerShell-Fenster. Dieses Fenster wurde zunächst geschlossen. Die im Faden benannten Ursachen umfassten einen beendeten Kindprozess unter Windows und einen Eingriff der Windows-Sicherheit; welche Ursache den ersten Abbruch auslöste, blieb nicht getrennt nachgewiesen.

Windows-Sicherheit hatte `node.js` blockiert und wurde vom Nutzer freigegeben. Ein Start mit `ghost run` beendete sich unmittelbar, weil dieser Befehl als Debug-Befehl des Ghost-Prozessmanagers ausgegeben wurde. Danach wurde ein PowerShell-Startweg verwendet, der Ghost im sichtbaren Fenster hielt. Das Protokoll meldete `Listening on: 127.0.0.1:2368`, `Url configured as: http://localhost:2368/` und `Ghost booted`.

Beim ersten Ghost-Setup meldete die Admin-Oberfläche nach Eingabe der Kontodaten „Server was unreachable“ und blieb in einer Schleife. Die Datenbank und Installation sollten nicht ohne Anlass zurückgesetzt werden. Nach einer Prüfung wurde nur der Setup-Zustand zurückgesetzt, Ghost erneut gestartet und das Backend anschließend erreicht. Die Website war danach unter `http://localhost:2368/` und die Verwaltung unter `http://localhost:2368/ghost/` erreichbar.

### Theme-Bestand und Tailwind-Festlegung

Nach dem lokalen Betriebsstand wurde der Theme-Bestand unter TMPL-1 lesend aufgenommen. Der Nutzer legte fest, dass Schriften und Fonts übernommen werden sollten, während andere Elemente anhand vorhandener Mockups und Erweiterbarkeit geprüft werden sollten. Das Theme-Skelett sollte spätere Erweiterungen ohne umfassenden Umbau ermöglichen.

Ein Konflikt wurde sichtbar, als sichtbare Theme-Templates Klassen wie `fw-site`, `fw-post` und `fw-pagination` verwendeten. Die CSS-Konventionen reservierten das Präfix `fw-*` für die Chart-Engine. Der Nutzer verwies auf die Prokrastinations-App und die projektweite Tailwind-Namenskonvention. Die Dokumentation und die App-Praxis wurden daraufhin als Grundlage herangezogen: sichtbares Theme-Markup sollte direkte Tailwind-Klassen verwenden; technische Hooks durften `fw-*` behalten.

Der TMPL-1-Plan wurde angelegt und schrittweise umgesetzt. Für `error.hbs` wurde festgehalten, dass es absichtlich keine gemeinsamen Partials nutzte. Die CSS-Quellen wurden nicht um eine parallele eigene Layoutschicht erweitert; Tailwind blieb der sichtbare Rahmen.

### M1: Homepage auf Tailwind umstellen

Die Ghost-Verwaltung meldete zunächst sechs Hinweise. Nach kleineren Theme-Korrekturen blieben drei nicht blockierende Hinweise: die zusätzliche Verwendung von `{{meta_description}}` im `head`, fehlende Unterstützung der Ghost-Font-Auswahl und die nicht berücksichtigte Editor-Option `{{@page.show_title_and_feature_image}}`. Der Nutzer sah, dass das Theme aktiv war, die sichtbare Seite aber zunächst nur teilweise gestaltet erschien.

Die Bestandsaufnahme für M1 stellte 55 sichtbare `fw-*`-Vorkommen fest. Der M1-Plan grenzte sechs Dateien ein: `Theme/default.hbs`, `Theme/index.hbs`, `Theme/partials/header.hbs`, `Theme/partials/footer.hbs`, `Theme/partials/post-card.hbs` und `Theme/partials/pagination.hbs`. `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs` und `error.hbs` blieben außerhalb des Meilensteins. Die technischen Hooks `fw-chart-engine` und `fw-janitor` in `post.hbs` blieben unverändert.

Nach der Umstellung wurde `npm run css:build` über das gemappte Laufwerk `Z:` verwendet. Der UNC-Pfad wurde hierfür nicht als Arbeitsverzeichnis genutzt, weil der Windows-Aufruf über `cmd.exe` damit nicht zuverlässig arbeitete. Das erzeugte `Theme/assets/css/screen.css` wurde zusammen mit den Templates in ein Theme-ZIP aufgenommen. Der Nutzer lud das Paket in Ghost hoch, bestätigte das Überschreiben und aktivierte es.

Die erste Sichtprüfung zeigte noch Aufzählungspunkte vor „Home“ und „About“. Ursache war das von `{{navigation}}` erzeugte `ul` mit `li`-Elementen. Im Header wurden Tailwind-Varianten für das innere `ul` ergänzt, darunter `[&_ul]:list-none`, `[&_ul]:flex` und Abstandsregeln. Nach erneutem CSS-Bau, Upload und Aktivierung zeigte die Homepage die Navigation ohne Aufzählungspunkte sowie Markenbereich, Beitragskarte und Seitennavigation.

### Dokumentation und Abschlussstand

Nach der Sichtprüfung wurde ein Dokumentationslauf verlangt. Das neue `docs/steering/theme-build/M1-HOMEPAGE-TAILWIND-KOCHBUCH.md` beschrieb Voraussetzungen, die sechs M1-Dateien, den Tailwind-Bau, die Navigation, Prüfung, Paketierung, Ghost-Upload, Rückweg und die drei offenen Ghost-Hinweise. Der vorhandene `M1-HOMEPAGE-TAILWIND-PLAN.md` erhielt den tatsächlich getesteten Abschlussstand.

Die beiden Dokumente wurden im NAS-Projekt abgelegt und anschließend mit UTF-8 sowie den erwarteten Metadaten geprüft. Danach wurde die Definition des Skills `abschluss-ritual` gelesen und eine Langform für die Commit-Nachricht ausgegeben. Der Nutzer verlangte anschließend die Chronik dieses Fadens.

## Wendepunkte

- Die vorhandene Systemlaufzeit Node 24 wurde nicht für Ghost eingesetzt; Node 22 wurde als isolierte Ghost-Laufzeit festgelegt, während Node 24 für Tailwind blieb.
- Der erste Ghost-Startweg über `ghost run` wurde durch einen Vordergrund-Start ersetzt, nachdem der Befehl als Debug-Befehl ausgegeben worden war.
- Der vollständige Reset von Datenbank und Installation wurde nicht durchgeführt. Stattdessen wurde der Setup-Zustand gezielt zurückgesetzt.
- Die anfängliche Idee, sichtbare `fw-*`-Klassen in CSS zu definieren, wurde nicht weiterverfolgt, nachdem die Tailwind-Konvention und die Reservierung des Präfixes für die Chart-Engine geprüft worden waren.
- M1 blieb auf die Homepage beschränkt, nachdem der Nutzer für spätere Bereiche einen späteren Ausbau festlegte.

## Entscheidungen und Festlegungen

- **Ghost-Laufzeit:** Node 22 unter `C:\Tools\ghost-local\`; System-Node 24 für den Tailwind-Bau. · Früh im Verlauf. · Die Trennung sollte Ghost-Kompatibilität und bestehende Projektwerkzeuge zugleich erhalten. · **Status am Ende:** gültig.
- **Lokaler Betriebspfad:** `C:\Tools\ghost-local\`. · Früh im Verlauf. · Der Pfad sollte als löschbarer Bereich für Ghost und seine lokalen Hilfen dienen. · **Status am Ende:** gültig.
- **Dokumentationsort:** `docs/steering/theme-build/`. · Nach der Betriebsstabilisierung. · Dort lagen bereits die Ghost-bezogenen Theme-Bau-Dokumente. · **Status am Ende:** gültig.
- **Sichtbare CSS-Konvention:** direkte Tailwind-Klassen; `fw-*` nur für technische Chart- und Janitor-Hooks. · Während TMPL-1. · Die Konventionen und die App-Praxis wurden herangezogen. · **Status am Ende:** gültig.
- **M1-Umfang:** sechs Homepage-Templates; andere Seiten-Templates nicht. · Vor der M1-Umsetzung. · Der Umfang sollte ein erweiterbares Grundgerüst schaffen, ohne weitere Bereiche vorwegzunehmen. · **Status am Ende:** gültig.
- **Offene Ghost-Hinweise:** drei nicht blockierende Hinweise wurden nicht in M1 behandelt. · Nach Theme-Prüfung. · Sie betrafen spätere Eingriffe in `default.hbs`, Font-Steuerung und Seiten-Templates. · **Status am Ende:** offen.

## Irrwege, Schleifen und verworfene Ansätze

- Der erste lokale Zugriff auf `localhost:2368` führte wiederholt zu Verbindungsfehlern. Ein sichtbares und ein leeres PowerShell-Fenster wurden beobachtet; das leere Fenster wurde geschlossen. Die genaue technische Ursache des ersten Prozessabbruchs wurde nicht abschließend getrennt belegt.
- Der Befehl `ghost run` wurde für den normalen Betriebsstart verwendet und danach verworfen, weil die Ghost-Ausgabe ihn als Debug-Befehl des Prozessmanagers auswies.
- Ein vollständiger Reset von Ghost-Datenbank und Installation stand zur Diskussion. Er wurde nicht ausgeführt, weil der lokale Bestand nach der gezielten Setup-Korrektur weiterverwendet werden sollte.
- Eine sichtbare CSS-Schicht für `fw-*`-Klassen wurde nicht angelegt. Die Prüfung der Tailwind- und Chart-Engine-Konvention führte zur Umstellung des Markups statt zu neuen `fw-*`-Definitionen.
- Die M1-Homepage wurde nach dem ersten Upload nicht als abgeschlossen behandelt, weil die Navigation noch Listenpunkte trug. Der zusätzliche Header-Reset wurde erst danach ergänzt.

## Erzeugte Artefakte

- `docs/steering/theme-build/GHOST-LOKALBETRIEB.md` – Kochbuch für Installation, Start, Stopp und spätere Entfernung des lokalen Ghost-Bereichs. – **Status am Ende:** finaler Arbeitsstand.
- `docs/steering/theme-build/TMPL-1-PLAN.md` – Architektur- und Umsetzungsplan für das Theme-Grundgerüst. – **Status am Ende:** Arbeitsstand für den folgenden Ausbau.
- `docs/steering/theme-build/M1-HOMEPAGE-TAILWIND-PLAN.md` – M1-Umfang, Abnahme und nachgetragener Teststand. – **Status am Ende:** abgeschlossen.
- `docs/steering/theme-build/M1-HOMEPAGE-TAILWIND-KOCHBUCH.md` – Wiederholbarer Ablauf für die Homepage-Umstellung mit Tailwind. – **Status am Ende:** finaler Arbeitsstand.
- `Theme/assets/css/screen.css` und die sechs M1-Templates – Tailwind-basierter lokaler Homepage-Stand. – **Status am Ende:** lokal hochgeladen und aktiviert.
- Lokale Theme-ZIP-Dateien im Arbeitsbereich – Upload-Pakete und benannte Vorher-Stände für den lokalen Theme-Wechsel. – **Status am Ende:** lokale Arbeitsartefakte.

## Sachliche Erkenntnisse

- **Gesicherter Stand:** Ghost lief lokal auf `127.0.0.1:2368`; öffentliche Seite und Ghost-Admin waren nach der Setup-Korrektur erreichbar.
- **Gesicherter Stand:** Der Tailwind-Bau verwendete System-Node 24, während Ghost mit einer isolierten Node-22-Laufzeit betrieben wurde.
- **Gesicherter Stand:** Ghosts `{{navigation}}` erzeugte eine HTML-Liste; ohne zusätzliche Klassen blieben deren Listenpunkte sichtbar.
- **Gesicherter Stand:** Ghost markierte die drei verbliebenen Theme-Hinweise als nicht blockierend.
- **Arbeitsannahme:** Der erste nicht erreichbare Ghost-Start hing mit einem beendeten Kindprozess unter Windows oder mit dem Eingriff der Windows-Sicherheit zusammen. Eine eindeutige Zuordnung wurde im Faden nicht erzeugt.
- **Offene Frage:** Wann die verbliebenen Ghost-Hinweise und die nicht zu M1 gehörenden Templates bearbeitet werden, wurde nicht festgelegt.

## Offene Punkte am Ende

- `GS001-DEPR-MD`, `GS051-CUSTOM-FONTS` und `GS110-NO-MISSING-PAGE-BUILDER-USAGE` blieben offen.
- Der Ausbau von `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs` und `error.hbs` war nicht Gegenstand von M1.
- Der spätere Umzug des lokalen Ghost-Bestands auf einen Produktionsserver war im Faden noch nicht durchgeführt.
- Das vollständige Abschluss-Ritual mit seinen weiteren Schritten wurde im Faden nicht als durchgeführt festgehalten; die Commit-Nachricht wurde lediglich in der vorgesehenen Langform erzeugt.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: die Trennung von systemweiter und lokaler Laufzeit; die wiederholte Präzisierung von Verzeichnis- und Löschgrenzen; die Abfolge aus manueller Ghost-Verwaltung und Quelländerungen; der Konflikt zwischen bestehendem Klassenpräfix und Tailwind-Konvention; die Entscheidung, Warnungen nach ihrer Blockierungswirkung zu trennen; die Begrenzung eines sichtbaren Meilensteins auf sechs Templates.

## Bewusst ausgelassen

Weggelassen wurden Passwörter, wiederholte Bestätigungen einzelner Schritte, vollständige Terminalprotokolle, UI-Bedienrauschen, wiederholte Statusmeldungen ohne Zustandsänderung und Details der einzelnen Upload-Dialoge. Die Inhalte bereits vorhandener Mockups und die nicht im Faden umgesetzten späteren Seiten wurden nicht rekonstruiert.
