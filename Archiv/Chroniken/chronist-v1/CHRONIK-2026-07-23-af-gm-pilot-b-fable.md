---
chronik_id: CHRONIK-2026-07-23-af-gm-pilot-b-fable
datum: 2026-07-23
projekt: finanzwesir-2-0
thema: af-gm-pilot-b-fable
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, sackgasse, externe-abhaengigkeit, missverstandene-anforderung, tooling-problem, annahme-verworfen]
---

# Chronik: Golden-Master-Pilot b-fable und Uebergabe zur Ghost-App

**Hauptgegenstand:** Der Faden behandelte den Abschluss des technischen Golden-Master-Piloten fuer `depot-kipppunkt`, Variante b-fable. Ausgangspunkt war AF-GM-02c; im Verlauf entstanden Replay-Nachweise, ein kanonischer Pilot-Snapshot, eine Interaktionsspur mit Screenshots sowie eine fachliche Uebergabe fuer den spaeteren Ghost-Integrationsnachweis.

## Ausgangslage

Der Nutzer verwies auf `HANDOVER_CODEX_AF-GM-02C_PILOT_START_V1.md` sowie zwei Leitplanken unter `docs/steering/`. Er legte fest, dass die Leitplanken nur das steuernde LLM betreffen sollten. Die ausfuehrende Arbeit sollte Claude ueber dateibasierte Arbeitspakete erhalten; `.codex` sollte dabei nicht verwendet werden. Prompts sollten unter `Archiv/local/muss noch eingeordnet werden/` liegen und mit einem kopierbaren Satz an Claude uebergeben werden.

Fuer jede Aenderung verlangte der Nutzer eine durch den Skill `patch-quittung` erzeugte Quittungsdatei. Kurze Korrekturauftraege sollten ebenfalls als eigene Dateien im Prompt-Verzeichnis liegen und durch ihren Namen dem zugehoerigen Auftrag zuordenbar sein.

## Chronologischer Verlauf

### AF-GM-02c: Target-Replay und CLI-Korrektur

Zunaechst wurde der Auftrag `PROMPT_CLAUDE_AF-GM-02C_TARGET_REPLAY_V1.md` angelegt. Claude erweiterte den Golden-Master-Verifizierer um eine lokale Target-URL und legte Testhilfen sowie Nachweise an. Bei der Pruefung zeigte sich, dass `--target-url` ohne Wert nicht als fehlerhafte CLI-Eingabe behandelt wurde, sondern auf den Fixture-Pfad zurueckfiel. Dieser Befund fuehrte zu einem eigenen Korrekturauftrag. Danach gab es `GM-ERR-CLI-ARGS-INVALID`; die erlaubten Aufrufformen wurden auf Trace allein oder Trace mit `--target-url <url>` festgelegt.

Eine weitere Luecke betraf die README-Dokumentation der neuen Fehler-ID. Sie wurde mit `PROMPT_CLAUDE_AF-GM-02C_FIX-02_README_CLI_ERROR_V1.md` geschlossen. Danach wurden positive und negative Target-Replay-Faelle, bestehende Spuren, Schema-Validierung und die unvollstaendigen CLI-Aufrufe erneut geprueft. Anschliessend wurde `tests/golden-master/evidence/AF-GM-02C-NACHWEISE.md` angelegt.

### AF-GM-04: Snapshot und erste Spur

Fuer den b-fable-Pilot wurde der Werkstattstand hashgebunden. Der SHA-256 `855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9` wurde in Acceptance und Snapshot festgehalten. Die Acceptance begrenzte den Umfang auf einen technischen Pilot und nannte unter anderem Produktfreigabe, Ghost-Release, finale Gestaltung, Finanzmathematik und Launch-Reife als Nicht-Ziele.

Beim Auftrag zur Aufnahme der Interaktionsspur meldete Claude eine externe Netzquelle: Das Mockup lud `@tailwindcss/browser@4` ueber `cdn.jsdelivr.net`. Der Auftrag hatte diesen Fall als Stoppbedingung benannt. Der Nutzer entschied, fuer einen Zeitraum von einer Woche den bestehenden CDN-Aufruf als visuellen Pilot-Renderweg zuzulassen. Eine lokale Tailwind-Installation bestand nicht.

Die erste aufgenommene Spur war formal pruefbar. Der Nutzer bemerkte jedoch, dass die Screenshots einander stark aehnelten und der Zeitregler im relevanten Bild nicht sichtbar bewegt erschien. Die Spur hatte den Wert `1` verwendet. Die Berechnung der beobachteten Werte zeigte Jahr 22 als Gleichstand und Jahr 23 als sichtbaren Uebergang. Der Folgeauftrag zeichnete deshalb die Werte 22 und 23 auf.

### Visuelle Abweichung und kanonischer Snapshot-Pfad

Der Nutzer verglich einen Browser-Screenshot bei Jahr 23 mit `step-14-observe-text.png`. Im Screenshot aus der Spur fehlten die erwartete Token-Gestaltung, die petrolfarbene Darstellung und die Balkenwirkung. Die Replay-Pruefung war dabei weiterhin gruen.

Als Ursache wurde nicht das CDN selbst festgestellt. Die Werkstattquelle hatte den relativen Link `../../../../../Theme/assets/css/tokens.css`. Am ersten Snapshot-Pfad unter `pilot-b-fable-2026-07-23/mockup.html` loeste dieser Link eine Ebene oberhalb des Repository-Root auf. Der Link traf dort keine vorhandene Token-Datei. Die formale Spur hatte damit DOM-Zustaende geprueft, jedoch keinen geladenen CSS-Zustand belegt.

Der Auftrag `PROMPT_CLAUDE_AF-GM-04_B_FABLE_TRACE_FIX-03_CANONICAL_SNAPSHOT_V1.md` verlegte den Snapshot deshalb nach `pilot-b-fable-2026-07-23/snapshot/mockup.html`. Acceptance und Action-Script wurden auf den neuen Pfad gesetzt. Der fruehere `behavior-trace.json` und die 15 Screenshots aus dem ungestylten Durchlauf wurden entfernt und neu erzeugt. Das Entfernen des Screenshot-Ordners selbst wurde durch einen Windows/NAS-Sync-Effekt nicht abgeschlossen; die Dateien wurden einzeln entfernt und der Recorder fuellte den Ordner danach erneut.

Danach wurden Schema und Replay mit 15 Aktionen gruen gemeldet; ein Hash-Mismatch blieb mit `GM-ERR-HASH-MISMATCH` abweisbar. Die Sichtpruefung zeigte nach Weiter die Ergebnisansicht, bei Jahr 22 Gleichstand und bei Jahr 23 den Depot-Ueberhang mit petrolfarbenem Regler, grauem und petrolfarbenem Balken sowie Kippbalken.

### Evidenz und Uebergabe

Nach der Sichtpruefung wurde `B-FABLE-TRACE-NACHWEIS.md` als separater Dokumentationspatch angelegt. Die Datei nannte die Hashbindung, die Bedienfolge, die drei entscheidenden Screenshots, Schema- und Replay-Ausgaben sowie die Grenze des Play-CDN. Snapshot, Trace und Screenshots blieben dabei unveraendert.

Der Nutzer stellte anschliessend klar, dass die konkrete Pilot-App nicht unveraendert gestartet werden solle. Gegenstand des naechsten Schritts sei der Nachweis, wie aus beobachteten Screenshots und Spur eine im Ghost-Theme-ZIP einbindbare und lauffaehige App werden kann. Hierfuer wurde `HANDOVER_CODEX_DEPOT-KIPPPUNKT_GHOST_APP_UEBERGANG_V1.md` angelegt. Der neue Faden sollte zuerst Architektur, den kleinsten Integrationsnachweis, moegliche Shared Paths, Gates und den Testplan bestimmen.

## Wendepunkte

- Die CLI-Form `--target-url` ohne Wert fuehrte von einer formal durchlaufenden Pruefung zu einer eigenen Fehlerbehandlung mit `GM-ERR-CLI-ARGS-INVALID`.
- Der fuer die Aufnahme zugelassene Play-CDN blieb ein externer Pilot-Renderweg und wurde nicht als Produktionsweg festgelegt.
- Die Slider-Aktion mit Jahr 1 wurde durch die Schwellenwerte 22 und 23 ersetzt, weil erst diese den beobachteten Wechsel sichtbar machten.
- Die gruenen DOM- und Replay-Nachweise wurden nach dem visuellen Vergleich nicht als Nachweis der geladenen Gestaltung behandelt. Der relative Token-Pfad fuehrte zur Verschiebung des Snapshots und zur vollstaendigen Neuaufnahme der Artefakte.
- Nach Abschluss der technischen Spur verlagerte sich der Gegenstand von der Pilotaufnahme zum Ghost-Integrationsnachweis.

## Entscheidungen und Festlegungen

- Claude erhielt seine Arbeit ueber Dateien im Archiv; die steuernden Leitplanken blieben beim steuernden LLM. Status am Ende: gueltig.
- Patch-Quittungen werden durch den Skill als Dateien unter `docs/steering/patches/` erzeugt. Status am Ende: gueltig.
- Der Play-CDN wurde fuer die begrenzte Pilotaufnahme zugelassen, nicht als Produktions-CSS-Weg. Status am Ende: gueltig.
- Als aktive Pilotwahrheit gilt ausschliesslich `snapshot/mockup.html` mit dem gebundenen Hash. Historische Belege mit dem frueheren Pfad bleiben historische Dokumentation. Status am Ende: gueltig.
- Der naechste Faden beginnt mit Planung des Ghost-faehigen Integrationsnachweises, nicht mit einer stillen Uebernahme des Mockup-Codes. Status am Ende: gueltig.

## Irrwege, Schleifen und verworfene Ansätze

- Die erste b-fable-Spur verwendete Jahr 1. Sie blieb als Handlung nachweisbar, zeigte aber den Kippmoment nicht sichtbar und wurde durch die Folge 22, dann 23 ersetzt.
- Die Spur nach der ersten CSS-Freigabe war funktional gruen, enthielt aber ungestylte Screenshots. Der CDN-Aufruf wurde zunaechst als moegliche Ursache behandelt; die Pfadauflosung des Snapshot zeigte spaeter den fehlenden `tokens.css`-Treffer.
- Der fruehere Snapshot-Pfad und die zugehoerigen Screenshot-Artefakte wurden nicht weiterverwendet. Der Snapshot wurde verschoben; Spur und Screenshots wurden neu erstellt.

## Erzeugte Artefakte

- `PROMPT_CLAUDE_AF-GM-02C_TARGET_REPLAY_V1.md` und zugehoerige Fix-Prompts - Arbeitsauftraege fuer lokalen Target-Replay und CLI-/README-Korrekturen - final als historische Arbeitsauftraege.
- `tests/golden-master/evidence/AF-GM-02C-NACHWEISE.md` - Nachweis fuer AF-GM-02c - finaler Stand dieses Nachweises.
- `ACCEPTANCE-depot-kipppunkt-b-fable-pilot.json`, kanonischer Snapshot, Action-Script, `behavior-trace.json` und Screenshot-Ordner - technische Pilotartefakte - aktiv.
- `B-FABLE-TRACE-NACHWEIS.md` - technischer Nachweis der kanonischen b-fable-Spur - aktiv.
- Mehrere Patch-Quittungen unter `docs/steering/patches/` - Patchnachweise - aktiv als Historie.
- `HANDOVER_CODEX_DEPOT-KIPPPUNKT_GHOST_APP_UEBERGANG_V1.md` - fachliche Uebergabe fuer den frischen Ghost-Integrationsfaden - aktiv.

## Sachliche Erkenntnisse

- Gesicherter Stand: Eine Replay-Pruefung von DOM-Zustaenden belegt nicht allein, dass die vorgesehenen CSS-Dateien geladen und sichtbar angewendet wurden.
- Gesicherter Stand: Der Snapshot-Pfad beeinflusste die Aufloesung relativer CSS-Links und damit die sichtbare Aufnahme.
- Gesicherter Stand: Die Werte Jahr 22 und Jahr 23 bildeten fuer die gewaehlten Pilotwerte Gleichstand und sichtbaren Ueberhang ab.
- Arbeitsannahme: Kuenftige Produktionsarbeit verwendet vorhandenen Theme-Build und app-lokale Mechanik statt des Play-CDN.
- Offene Frage: Welche bestehenden Theme- und App-Vertraege den kleinsten Ghost-Integrationsnachweis bestimmen, sollte der neue Faden ermitteln.

## Offene Punkte am Ende

- Der Ghost-faehige Integrationsnachweis war noch nicht geplant oder implementiert.
- Die app-lokalen Pfade, ein moeglicher Registry-/Shared-Path-Bedarf und ein ggf. erforderlicher Unlock-AP waren noch nicht bestimmt.
- Die simulierten Zahlen, Texte und Berechnungen des Mockups waren nicht als Produktionsdaten oder Produktionsaussagen freigegeben.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: formale Nachweise und Sichtnachweise verliefen getrennt; ein relativer Pfad blieb bei einer Artefaktverschiebung wirksam; Testwerte wurden nach ihrem sichtbaren Wirkungsmoment ausgewaehlt; historische Pfade blieben neben einer aktiven kanonischen Referenz bestehen.

## Bewusst ausgelassen

Wiederholte Statusmeldungen, vollstaendige Toolausgaben, einzelne Hash- und Screenshot-Kopierbefehle sowie vollstaendige Inhalte der zahlreichen Prompt- und Quittungsdateien wurden verdichtet. Eingefuegte Claude-Ausgaben wurden als Arbeitsmaterial behandelt, nicht als direkte Teilnehmerbeiträge.
