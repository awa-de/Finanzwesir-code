# AP-prokrast-14c — Rücklaufkapsel an den Masterfaden Ergebnis

## Status

GELB

## Abnahme

ja

## Kurzfazit für den Masterfaden

AP-14 war als Anamnese und Zielkontrakt-Vorbereitung erfolgreich: Die CI-/Theme-Bridge-Lücke ist nicht mehr Vermutung, sondern deterministisch belegt (AP-14aR: vollständiger Definition-vs-Use-Scan über 39 Runtime-Dateien). AP-14 erzeugt damit **Entscheidungsreife, keine direkte Implementierungsfreigabe**. Variante C (Hybrid: CI-semantische Tokens zentral, App-Mechanik lokal) wird empfohlen. Aber: AP-15 kann nicht einfach als technische Migration loslaufen — AP-14b hat einen zweiten, ursprünglich nicht erwarteten Kernbefund geliefert, der drei echte Farbentscheidungen erzwingt, die nur Albert treffen kann. Ohne diese Entscheidungen liefe eine `--fw-*`→`--color-*`-Umbenennung technisch ins Leere, weil die Zieltokens teilweise noch gar nicht existieren.

## Was AP-14 geleistet hat

| Unter-AP | Status | Zweck | Ergebnis |
|---|---|---|---|
| AP-14a | GRÜN | Inventar-Anamnese: reale CI-/Theme-/Token-/Font-/Tailwind-/Ghost-Spuren im Repo kartiert | Kernbefund: A-04 formal entschieden, aber im einzigen real gebauten App-Code (`prokrastinations-preis/app.css`) nicht umgesetzt |
| AP-14aR | GRÜN | Unabhängiges, deterministisches Claims-vs-Files-Review von AP-14a | Kernbefund hart bestätigt; zwei Präzisierungen: nicht alle `--fw-*`-Tokens sind kaputt (6/17 funktionieren), nicht alle 24 übrigen Apps sind reine Spec-Stände (3 haben nicht-integrierte Standalone-Prototypen) |
| AP-14b | GRÜN | Zielkontrakt-/Architektur-Analyse: Varianten A–D entwickelt und bewertet | Variante C empfohlen; neuer Kernbefund: `screen.css` hat nur Marken-Tokens, `app.css` braucht Rollen-Tokens, die z.T. noch nicht existieren — 3 echte Neuentscheidungen nötig |
| AP-14c | GELB (dieses Protokoll) | Master-Rücklaufkapsel | Verdichtung ohne Glättung; AP-15 ist scope-klar, aber nicht ohne Alberts Rollenfarben-Entscheidung startbar |

## Gesicherte Befunde

- A-04 ist formal entschieden (🟢, `01_DECISION_LOG.md`): Apps sollen dieselbe CSS-Variablen-Theme-Bridge wie die Chart-Engine nutzen, kein Tailwind CDN in Produktion.
- Die Token-Bridge-Lücke ist deterministisch bestätigt, nicht nur plausibel gemacht.
- 11 von 17 `--fw-*`-Tokens in `app.css` sind CI-semantisch (Farbe: 8, Font: 1, Spacing: 2) und repo-weit ohne jede Definition oder JS-Zuweisung — die App rendert für diese Werte dauerhaft mit hartcodierten Fallbacks.
- 6 von 17 `--fw-*`-Tokens sind funktionierende, bewusst app-lokale Timing-/Positionierungsvariablen — keine Bridge-Lücke, dürfen nicht angefasst werden.
- Neu (AP-14b): `screen.css` definiert ausschließlich Marken-Tokens (petrol/blau/purpur/gelb + Neutralfarben). `app.css` braucht aber Rollen-Tokens (primary/surface/error-border/error-bg/error-text), für die in `screen.css` noch keine Entsprechung existiert — unabhängig vom Namensraum. Eine reine Umbenennung würde ins Leere laufen.
- Nur `Apps/prokrastinations-preis` ist real ins `.fw-app`/`data-fw-app`-Muster integriert (einzige Pilotfläche).
- Drei weitere App-Ordner (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten Standalone-HTML-Prototypen mit eigenem Farb-/Font-/Chart-System — nicht integriert, nicht AP-15-Scope, aber existent und potenziell künftiges Drift-Risiko.

## Was sich gegenüber der Ausgangsannahme geändert hat

- Es ist **nicht** nur eine fehlende Alias-/Bridge-Frage ("App zeigt auf falschen Namensraum, einfach umbiegen"). Es fehlen echte Zieltokens, die erst inhaltlich (Farbwahl) entschieden werden müssen.
- Spacing ist **nicht** im selben Sinn lösbar wie Farbe/Font: Es existiert projektweit — auch nicht für Ghost-Content — kein einziges `--space-*`-CSS-Custom-Property, zu dem migriert werden könnte. Das ist eine offene Grundsatzfrage, keine Bridge-Lücke.
- `--fw-*` ist **nicht** pauschal falsch oder zu ersetzen — gut ein Drittel der Verwendungen (6/17) sind korrekt funktionierende App-Mechanik.
- Nicht alle 24 "übrigen" Apps sind bloße Spec-Stände — 3 davon haben bereits eigenständiges, nicht-integriertes Material, das AP-14a in der ersten Fassung nicht erwähnt hatte.
- Variante B (naheliegende, einfache Lösung: Alias-Layer in `screen.css`) wurde geprüft und verworfen — sie widerspricht einer bestehenden, unverändert gültigen Namensraum-Regel in `CSS-KONVENTIONEN.md`.

## Problemfelder / Edge-Cases / Nicht glattziehen

| Problemfeld | Befund | Risiko, wenn ignoriert | Konsequenz für AP-15 |
|---|---|---|---|
| Marken-Tokens vs. Rollen-Tokens | `screen.css` hat 20 Marken-/Neutraltokens, aber 0 Rollen-Tokens für primary/surface/error-* | AP-15 startet als "einfache Umbenennung" und scheitert technisch, weil Zieltokens fehlen | AP-15 muss zuerst die fehlenden Rollen-Tokens in `screen.css` ergänzen, bevor `app.css` migriert wird |
| 3 echte Rollen-Farbentscheidungen | Primary-Zuordnung (blau oder petrol?), Error-Familie (auf Purpur aufbauen oder neu?), Surface (bestehendes `--color-bg-faint` wiederverwenden oder neu?) sind ungetroffene Designentscheidungen, keine technischen Fragen | Wenn Claude diese Farben implizit selbst wählt, entsteht eine CI-Entscheidung ohne Albert-Freigabe — genau die Art Fehler, die Tabu-Zonen/Gate-Prinzip verhindern sollen | Muss vor AP-15-Start explizit von Albert entschieden werden, nicht "nebenbei" im Umsetzungs-AP |
| Funktionierende `--fw-*`-Mechanik-Tokens | 6 von 17 Tokens (Timing/Positionierung, u.a. `--fw-card-to-point-flight-duration`, `--fw-rubikon-text-top/-left`) sind korrekt und bewusst lokal definiert | Eine undifferenzierte "migriere alle `--fw-*`"-Anweisung würde funktionierende, bereits mit Albert abgestimmte UX-Timing-Werte brechen | AP-15-Auftrag muss die 6 Tokens explizit von der Migration ausnehmen |
| Spacing ohne zentrales Ziel | `--fw-space-md`/`-sm` haben kein Bridge-Ziel — projektweit existiert kein `--space-*`-Token, auch nicht für Ghost-Content (dort nur Tailwind-Klassenwerte) | Wenn AP-15 versucht, auch Spacing zu "reparieren", entsteht Scope-Creep um eine eigenständige, größere Grundsatzfrage | Spacing bleibt vorerst app-lokal, explizit aus AP-15-Auftrag ausgeklammert |
| Ghost-Live nicht repo-verifizierbar | Keine `.hbs`-Templates im Repo (2 unabhängige Suchmethoden, 0 Treffer); ob `screen.css`/Fonts auf echten Ghost-Seiten mit `.fw-app`-Card überhaupt geladen werden, ist aus dem Repo nicht zu beantworten | Die gesamte Bridge-Architektur — jede Variante — funktioniert nur, wenn diese Annahme stimmt. Sie wurde nie geprüft | Leichte, einmalige Ghost-Live-Stichprobe als Begleitmaßnahme zu AP-15 empfohlen, kein Vollaudit, aber auch keine stillschweigende Annahme |
| Drei Standalone-Prototypen | `regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes` haben eigene, nicht-CI-konforme Farb-/Font-Systeme (u.a. externe Google Fonts, eigene Hex-Paletten inkl. Dark-Mode) | Nicht AP-15-Scope, aber wenn sie ignoriert werden "als gäbe es sie nicht", fehlt später die Grundlage für eine bewusste Entscheidung, ob sie migriert, archiviert oder stehengelassen werden | Explizit als "existiert, aber nicht Teil von AP-15" benennen, nicht verschweigen |
| `FwChartTextPlugin.js` + RubikonSymbolMarkers | Plugin hartcodiert `sans-serif`, nutzt (anders als der Rest der Chart-Engine) keinen Theme-Zugriff. Ein Fix löst automatisch DS-FOLLOWUP-07 (Neumessung der ✅/❓-Marker-Position, da sich Zeichenbreiten mit echtem Font ändern) aus | Wird der Fix unbedacht in AP-15 mitgezogen, entsteht eine ungeplante Abhängigkeit von Alberts DevTools-Nachmessung mitten in einem eigentlich reinen Token-AP | Als eigener, sequenzabhängiger Folge-Mini-AP nach AP-15 behandeln, nicht Bestandteil von AP-15 selbst |
| Breakpoint-Kontexte | Design-System (768/1280px), Chart-Engine (450/900px) und App-CSS (480/600/1024px) nutzen bewusst unterschiedliche Skalen — inhaltlich vertretbar, aber `app.css` behauptet in einem Kommentar eine Anlehnung an "Tailwind md/lg", die es im Projekt (kein `lg:` im Einsatz) so gar nicht gibt | Keine Vereinheitlichung nötig, aber der irreführende Kommentar kann künftige Bearbeiter (Mensch oder LLM) auf eine falsche Fährte setzen | Kleiner Doku-Korrektur-Hinweis, kein Architektur-Thema; kann, muss aber nicht in AP-15 mitlaufen |
| DS-014 / Komponenten | DS-014 ("07-APP-KOMPONENTEN.md — Design-API Baukasten") ist als "Blocker für alle App-Entwicklung" markiert, aber noch nicht begonnen. Ein Buttons/CTA-Farbfix in AP-15 löst nicht das strukturelle Komponentensystem-Problem | Der Master könnte AP-15 fälschlich als "damit ist DS-014 erledigt" lesen | Klarstellen: AP-15 schließt höchstens den Farbanteil von Buttons, nicht den Komponentenvertrag selbst |
| Status-Falle | AP-14a/14aR/14b sind alle einzeln GRÜN — das könnte beim Master als "fertig, direkt AP-15 bauen" ankommen | Ein technisch sauber recherchierter Prozess mit offener Designentscheidung am Ende ist etwas anderes als eine abgeschlossene Umsetzungsfreigabe | Dieser AP (14c) setzt den Gesamtstatus deshalb bewusst auf GELB, nicht GRÜN |

## Empfohlener Zielkontrakt

### Empfehlung

Variante C — Hybrid

### Zielregel

- **CI-semantische Tokens:** ausschließlich über `--color-*` aus `screen.css` beziehen (Farbe; optional künftig Font).
- **App-mechanische Tokens:** bleiben app-lokal (Timing, Positionierung, vorerst Spacing) — dürfen technisch `--fw-*` heißen, müssen aber dokumentiert als "App-Mechanik, kein CI-Bezug" gekennzeichnet werden.
- **Namensräume:** `--color-*` = einzige CI-Farbquelle, plattformweit in `screen.css`. `--fw-*` = ausschließlich App-Mechanik, nie Farbe/Font/CI-Werte.
- **Farben:** `screen.css` Abschnitt 1 um 3 echte neue Rollen-Tokens ergänzen (Primary, Error-Familie, ggf. Surface), dann `app.css` migrieren.
- **Fonts:** kein neues CSS-Custom-Property zwingend nötig — `app.css` kann analog zu `FwTheme.js` den korrekten Literalwert direkt referenzieren.
- **Spacing:** vorerst app-lokal, kein Bridge-Ziel vorhanden, eigene spätere Grundsatzfrage.
- **Breakpoints:** bewusst getrennt lassen (drei unterschiedliche Kontexte), nur irreführenden Doku-Kommentar richtigstellen.
- **Tailwind:** bleibt für Apps ausgeschlossen (A-04 bestätigt), nur Ghost-Content-/Referenz-Werkzeug.
- **Ghost-Grenze:** AP-15 sollte eine leichte, einmalige Ghost-Live-Stichprobe als Begleitmaßnahme vorsehen, kein Vollaudit, kein Blocker.
- **Chart-Engine:** `FwTheme.js` bleibt unverändert als Referenzimplementierung; `FwChartTextPlugin.js`-Fix als eigener Folge-Mini-AP wegen gekoppelter RubikonSymbolMarkers-Neumessung.

### Warum nicht Variante A allein?

Variante A ("Apps nutzen direkt `--color-*`") beschreibt korrekt die Konsumentenseite, deckt aber nicht ab, dass 6 der 17 `--fw-*`-Tokens gar keine CI-Werte sind und explizit *nicht* migriert werden dürfen. Ohne die Namensraum-Governance aus Variante C riskiert eine reine "A"-Anweisung, dass eine künftige Umsetzung pauschal alle `--fw-*`-Vorkommen anfasst und funktionierende App-Mechanik mitbricht.

### Warum nicht Variante B?

Variante B (Alias-Layer `--fw-color-primary: var(--color-blau)` etc. in `screen.css`) würde `fw-*` dauerhaft als zweiten offiziellen CI-Namensraum etablieren — das widerspricht der bestehenden, unverändert gültigen Regel in `CSS-KONVENTIONEN.md`: "`fw-*` ist reserviert für die Chart-Engine — nicht in screen.css verwenden." Zusätzlich verfestigt Variante B genau das Muster (App erfindet Namensraum, Plattform zieht nach), das bei 25 Apps am teuersten würde, wenn es sich wiederholt.

### Warum nicht Variante D?

Variante D (nur dokumentieren, nichts technisch ändern) widerspricht dem Zweck von A-04 als bereits 🟢 entschiedener Architektur — eine getroffene Entscheidung unvollzogen zu lassen, ist keine Zielarchitektur. Die App würde für 25 Apps weiter mit hartcodierten, teils nicht WCAG-geprüften Fallback-Werten rendern (z. B. `#1a1a1a`, `#555555` stehen nicht in der CI-Kontrast-Tabelle). Nur als bewusst befristeter Zwischenzustand denkbar, nicht als Zielkontrakt.

## Masterentscheidungen vor AP-15

| Entscheidung | Empfohlene Richtung | Vor AP-15 nötig? | Risiko bei impliziter/falscher Entscheidung |
|---|---|---:|---|
| Variante C bestätigen | Bestätigen | ja | Ohne Bestätigung fehlt die verbindliche Leitplanke für Namensraum-Trennung; AP-15 könnte sonst wieder in Richtung Variante A/B abdriften |
| Primary-Rolle festlegen (`--color-blau` vs. `--color-petrol` vs. andere) | Albert entscheidet; `--color-petrol` ist laut Spec "Primary Brand", `--color-blau` ist "Text-Links Default" — beide plausibel, keine technische Präferenz | ja | Falsche/implizite Wahl durch Claude wäre eine CI-Entscheidung ohne Freigabe — Tabu-Zonen-adjacentes Risiko, auch wenn `screen.css` selbst kein Tabu ist |
| Error-Familie festlegen (`--color-error-border/-bg/-text`) | Albert entscheidet, ob auf `--color-purpur` (bereits "Warnungen" dokumentiert) aufgebaut oder neue Farbe eingeführt wird | ja | Ohne dediziertes CI-Error-Konzept könnte eine App-Fehlermeldung farblich inkonsistent zu künftigen Apps werden |
| Surface-Rolle entscheiden (`--color-bg-faint` wiederverwenden vs. `--color-surface` neu) | Tendenz: `--color-bg-faint` wiederverwenden (inhaltlich passend, kein neuer Hex-Wert nötig) — aber Albert-Bestätigung nötig, da neuer Hex-Wert laut `CSS-KONVENTIONEN.md` nur in Abschnitt 1 erlaubt ist | teilweise (könnte im AP-15-Gate mitentschieden werden, ist aber schwächer als Primary/Error) | Geringeres Risiko als Primary/Error, aber ungeklärt lässt AP-15 einen offenen Punkt |
| Spacing für AP-15 bewusst ausklammern | Ja, vorerst app-lokal lassen, keine projektweite Spacing-Tokenisierung als AP-15-Bestandteil | ja, als Scope-Entscheidung | Ohne explizite Ausklammerung droht Scope-Creep: AP-15 würde eine zweite, größere Grundsatzfrage (die auch Ghost-Content/Tailwind betrifft) implizit mitlösen müssen |
| `FwChartTextPlugin.js`-Fix | Nicht Teil von AP-15, eigener Folge-Mini-AP nach AP-15 wegen gekoppelter RubikonSymbolMarkers-Neumessung (Alberts DevTools-Nachmessung nötig) | nein, Folge-AP empfohlen | Wird der Fix in AP-15 mitgezogen, entsteht eine unfreiwillige Abhängigkeit von einer Browser-Nachmessungsschleife mitten im Token-AP |
| Ghost-Live-Stichprobe | Leichte Begleitmaßnahme zu AP-15 (kein Vollaudit, kein Blocker) | nicht zwingend vorher, aber als AP-15-Begleitung empfohlen | Ohne jede Prüfung bleibt die gesamte Bridge-Architektur auf einer nie verifizierten Annahme aufgebaut |

## Empfohlener AP-prokrast-15-Schnitt

### Nächster sinnvoller Haupt-AP

AP-prokrast-15 — CI-/Theme-Bridge Umsetzung Stufe 1: Farb-Rollen-Tokens + Font-Literal für `prokrastinations-preis`, begleitet von einer leichten Ghost-Live-Stichprobe. Start erst nach Alberts Rollenfarben-Entscheidung.

### AP-15 sollte enthalten

- Ergänzung der bestätigten neuen Rollen-Tokens in `screen.css` Abschnitt 1 (nach Alberts Farbzuordnung).
- Migration der `app.css`-CI-semantischen `--fw-color-*`- und `--fw-font-base`-Verwendungen auf die (erweiterten) `--color-*`-Tokens bzw. den korrekten Font-Literal.
- Explizite Dokuklarstellung, dass die verbleibenden `--fw-*`-Tokens (Timing/Positionierung) app-lokale Mechanik sind, kein CI-Bezug.
- Leichte Ghost-Live-Stichprobe als Begleitmaßnahme.

### AP-15 sollte ausdrücklich nicht enthalten

- Spacing-Vereinheitlichung.
- Breakpoint-Vereinheitlichung.
- `FwChartTextPlugin.js`-Fix und RubikonSymbolMarkers-Neumessung.
- Migration/Bewertung der 3 Standalone-Prototypen.
- Vollständigen Ghost-Admin-/`.hbs`-Audit.
- DS-014-Komponenten-Baukasten.

### Vor AP-15 zwingend zu entscheiden

- Primary-Rollenzuordnung (Albert).
- Error-Farbfamilie (Albert).
- Bestätigung von Variante C als Leitplanke (Master).

### AP-15-Anschlussbedingung

AP-15 darf erst starten, wenn Albert die Primary- und Error-Rollenzuordnung explizit bestätigt hat (Surface kann notfalls im AP-15-Gate selbst mitentschieden werden, ist aber schwächer priorisiert) — und wenn der Master Variante C als Zielrichtung bestätigt hat. Ohne diese zwei Punkte liefe AP-15 entweder auf einen Stop innerhalb des eigenen Gates hinaus oder auf eine implizite, ungewollte Designentscheidung durch die Umsetzung selbst.

## Nicht nächste APs

- **Direkte `app.css`-Migration ohne Rollenentscheidungen:** Zieltokens existieren noch nicht — die Migration liefe technisch ins Leere.
- **Direkter `screen.css`-Alias-Patch:** entspricht Variante B, wurde explizit verworfen (Konflikt mit `CSS-KONVENTIONEN.md`).
- **Direkter `FwChartTextPlugin.js`-Font-Fix als Teil von AP-15:** technisch unabhängig möglich, aber löst zwingend eine Albert-Nachmessung aus — gehört als eigener, klar abgegrenzter Folge-Schritt danach, nicht in den Token-AP hinein.
- **Standalone-Prototypen-Migration:** außerhalb des CI-Bridge-Scopes, keine Produktentscheidung dazu getroffen oder angefragt.
- **Vollständiger Ghost-Admin-Audit:** für die aktuelle Fragestellung reicht eine leichte Begleitstichprobe, ein Vollaudit wäre unverhältnismäßig.
- **Browser-/S/M/L-Final-QA:** gehört zum Abschluss der AP-15-Umsetzung selbst, nicht zu diesem Zielkontrakt-Strang.
- **RubikonSymbolMarkers-Neumessung isoliert:** ergibt ohne den vorgelagerten `FwChartTextPlugin.js`-Fix keinen stabilen Endstand, muss gekoppelt bleiben.
- **DS-014-Komponenten-Baukasten als AP-15-Ersatz:** AP-15 löst nur den Farbanteil von Buttons/CTA, nicht das strukturelle Komponentensystem — DS-014 bleibt eigener, größerer Auftrag.

## Risiken bei falschem Master-Schnitt

| Falscher Schnitt | Wahrscheinliche Folge | Folgekosten | Warnsignal |
|---|---|---|---|
| AP-15 als reine Umbenennung starten | Migration scheitert technisch, weil 3 der 8 Farbrollen keine Entsprechung in `screen.css` haben | mittel — Nacharbeit, Vertrauensverlust in AP-14-Fundament | Umsetzungs-AP beginnt ohne vorherige Albert-Farbentscheidung |
| `--fw-*` pauschal migrieren | Funktionierende Timing-/Positionierungswerte (Card-to-Point-Flug, Rubikon-Text-Position) brechen ohne fachlichen Grund | mittel-hoch — sichtbare UX-Regression, erneute Nachmessung nötig | AP-15-Auftrag nennt nicht explizit die 6 auszunehmenden Tokens |
| Error-Farben durch Claude implizit wählen lassen | Neue CI-Farbwerte entstehen ohne Alberts Freigabe — De-facto-Designentscheidung durch Code | hoch — CI-Drift genau an der Stelle, die verhindert werden sollte, plus Präzedenzfall für künftige Apps | Screen.css-Diff enthält neue Hex-Werte, die nirgendwo vorher als Entscheidung dokumentiert wurden |
| Spacing in AP-15 mitschleppen | AP-15 wird faktisch zu einem größeren, projektweiten Spacing-System-Auftrag, ohne dass das so beauftragt war | mittel — Scope-Creep, längere Laufzeit, Ghost-Content-Spacing müsste mitgedacht werden | AP-15-Diff berührt `--space-*`-artige Tokens über `app.css` hinaus |
| Ghost-Annahme nie prüfen | Bridge wird technisch sauber gebaut, wirkt auf echten Ghost-Seiten aber möglicherweise nicht, falls `screen.css` dort nicht lädt | hoch, aber unwahrscheinlich — würde die gesamte AP-14/15-Kette nachträglich entwerten | Niemand kann nach AP-15 zeigen, dass eine echte Ghost-Seite mit App-Card die richtigen Farben/Fonts berechnet |
| Standalone-Prototypen ignorieren als wären sie nicht existent | Spätere App-Autoren kopieren versehentlich eines der 3 Prototyp-Muster als Vorlage, ohne zu wissen, dass es nicht CI-konform ist | niedrig kurzfristig, mittel langfristig bei App-Skalierung | Kein Vermerk über die 3 Prototypen in künftigen App-Fabrik-Steuerungsdokumenten |

## Geänderte Dateien

- `docs/steering/patches/AP-prokrast-14c_ruecklaufkapsel_master_Ergebnis.md`

## Explizit nicht geändert

- AP-14a-Ergebnisprotokoll: nicht geändert
- AP-14aR-Ergebnisprotokoll: nicht geändert
- AP-14b-Ergebnisprotokoll: nicht geändert
- app.js: nicht geändert
- app.css: nicht geändert
- Theme/assets/css/screen.css: nicht geändert
- Theme/assets/js/fw-chart-engine/core/FwTheme.js: nicht geändert
- Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js: nicht geändert
- docs/App-Fabrik/01_DECISION_LOG.md: nicht geändert
- docs/design-system/**: nicht geändert
- docs/spec/APP-INTERFACE.md: nicht geändert
- docs/steering/BACKLOG.md: nicht geändert
- APP_SPEC.md: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- Produktentscheidungen Screen 2/3/4: nicht angefasst, nicht neu diskutiert
- RubikonSymbolMarkers: nicht geändert, nur als Folgethema referenziert

## Wiederlesen / Datei-Wahrheit

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- `git diff --name-status` nach Write: `M .claude/learning/session-log.md` (vorbestehend, nicht Teil dieses APs); `?? docs/steering/patches/AP-prokrast-14c_ruecklaufkapsel_master_Ergebnis.md` (dieser Write); `?? docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-14b_ci-theme-bridge_zielkontrakt-analyse_Ergebnis.md` (vorbestehend aus AP-14a/14aR/14b); zwei vorbestehende `?? Archiv/Chroniken/chronist-v1/CHRONIK-*.md` (nicht Teil dieses APs)
- nur erlaubter Write-Scope verändert: ja
- Abweichungen: keine

## Finale Chat-Kurzfassung für diesen Nebenfaden

AP-prokrast-14c abgeschlossen.

Status: GELB
Abgenommen: ja
Geänderte Dateien: docs/steering/patches/AP-prokrast-14c_ruecklaufkapsel_master_Ergebnis.md
Master-Rücklauf bereit: ja
Wichtigste Botschaft: AP-14 hat Entscheidungsreife erzeugt, keine Implementierungsfreigabe. Variante C wird empfohlen, aber AP-15 kann erst starten, wenn Albert die Primary- und Error-Farbrollen festgelegt hat — sonst liefe die Migration technisch ins Leere und funktionierende App-Mechanik wäre gefährdet.
Entscheidung vor AP-15: Primary-Rollenzuordnung, Error-Farbfamilie, Bestätigung Variante C.
Empfohlener nächster Schritt: Übergabe an Masterfaden / Masterentscheidung zu den drei Rollenfarben — kein AP-15 ohne diese Entscheidungen.
Ergebnisprotokoll: docs/steering/patches/AP-prokrast-14c_ruecklaufkapsel_master_Ergebnis.md
