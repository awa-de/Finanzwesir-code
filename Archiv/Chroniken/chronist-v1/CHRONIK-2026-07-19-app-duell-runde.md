---
chronik_id: CHRONIK-2026-07-19-app-duell-runde
datum: 2026-07-19
projekt: finanzwesir
thema: app-duell-runde
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, annahme-verworfen, praezisierung-durch-gegenfrage, tooling-problem, durchbruch]
---

# Chronik: App-Duell-Runde — 19 App-Fabrik-Apps bis zum Sonnet-Auftrag

**Hauptgegenstand:** Ein einzelner Arbeitstag, an dem der zuvor gebaute `/app-duell`-Prozess (Psychosprint → Grok-Gegenkritik → Sonnet-Baupaket) auf alle App-Fabrik-Apps mit vorhandener Mini-Spec angewendet wurde — 17 Apps im Standardablauf, plus drei zuvor blockierte Problemfälle (etf-aera-vorbei, plan-generator, regulatorik-dashboard), die einzeln geklärt wurden, bevor der Faden mit einem Voll-Abschluss-Ritual endete.

## Ausgangslage

Der Faden startete mit `/start` im Kettenmodus, Fokus laut Hook-Output: AP-app-fabrik-09k, der Vortag hatte den `/app-duell`-Prozess selbst produktionsreif gemacht. Ein erster Warm-Start-Versuch wurde vom Nutzer unterbrochen; nach kurzer Pause wurde mit „mac hweiter" fortgesetzt und der WARM-START-Modus bestätigt. Direkt danach rief Albert `/app-duell` ohne Slug auf — der eigentliche Auftrag des Tages: den Prozess nicht mehr nur zu bauen, sondern auf die reale App-Liste anzuwenden.

## Chronologischer Verlauf

### Erste Läufe und Scope-Festlegung (diversifikations-detektor, esg-spiegel)

Der erste Durchlauf (diversifikations-detektor) folgte dem Masterprompt Schritt für Schritt: Vorprüfungen, Psychosprint-Auftrag, Sol/Fable-Entwürfe, Grok-Gegenkritik (5 Produktentscheidungen E1–E5, u. a. „Weltkarte in der Länderansicht aufnehmen" und Länder-/Sektorgewichte als eigene Halte-Geste statt nur Chips), Sonnet-Baupaket geschrieben. Bei esg-spiegel trat zum ersten Mal ein Tooling-Fehler auf: der `grok-paket`-Schritt schlug mit Frontmatter-FAIL fehl — Ursache war eine UTF-8-BOM am Dateianfang von `01-sol.md`; nach manuellem Neuspeichern ohne BOM lief der Schritt durch.

Als Albert `/app-duell` ein zweites Mal aufrief, während diversifikations-detektor noch auf Sonnets externes Ergebnis wartete, stellte er klar: **Die gesamte Runde soll nur bis zum Sonnet-Auftrag laufen, der eigentliche Mockup-Bau kommt später** — eine Scope-Entscheidung, die den gesamten weiteren Fadenverlauf bestimmte.

### Erster Kontakt mit etf-aera-vorbei — Stopp und Überspringen

Beim Versuch, etf-aera-vorbei zu starten, fand Claude einen expliziten Konzeptkonflikt in der Mini-Spec selbst: Titel/Slug sprachen von „ETF-Ära vorbei", der Fließtext beschrieb tatsächlich das „Passiv-Paradox" (Markteffizienz-Theorie), und die Implementierungshinweise rieten selbst von einer eigenständigen App ab. Nach Masterprompt-Regel wurde gestoppt statt geraten. Albert entschied: überspringen, weiter mit etf-namensdecoder — „ganz von vorne anfangen".

### Durchlauf der 17 Standard-Apps

Von etf-namensdecoder bis weltkarte-etf-indizes wurden 15 weitere Apps im immer gleichen Muster durchgezogen (etf-namensdecoder, etf-vergleich, geburtsjahrlos, investment-universum, komplexitaets-entlarver, kostenkiller-ter, market-timing-simulator, markt-kam-zurueck, rendite-kalibrierung, renditekiller-volatilitaet, replizierer-swapper, rollierende-sparplaene, thesaurierer-rennen, weltdepot-baukasten, weltkarte-etf-indizes) — Vorprüfung, Psychosprint-Auftrag, Sol/Fable, Grok-Gegenkritik mit jeweils 0–2 Produktentscheidungen per Klick-Matrix, Sonnet-Baupaket. Keine dieser 15 Apps veränderte den Kurs des Fadens.

Zwei Prozessdetails wurden unterwegs nachgeschärft und ab da als Vorlage übernommen: Bei etf-namensdecoder ergänzte Claude zunächst eine leere `grok-gegenkritik.txt`-Platzhalterdatei mit Hinweis auf den Zielpfad, weil Grok keine Dateien zum Download anbietet — Albert strich den Zieldatei-Hinweis wieder („das braucht Grok nicht zu wissen"), die schlankere Fassung wurde Vorlage für den Rest der Runde. Kurz danach (um komplexitaets-entlarver/kostenkiller-ter) bat Albert, den Kopier-Starttext künftig ausschließlich als reinen, mit einem Klick kopierbaren Block ohne Beiwerk auszugeben — auch das wurde ab sofort so eingehalten.

Nach weltkarte-etf-indizes waren 17 Apps durch. Claude fasste zusammen und fragte nach der nächsten App; Albert lenkte den Faden zurück auf die drei bislang übersprungenen Problemfälle.

### Rückkehr zu den drei Problemfällen

**etf-aera-vorbei:** Claude legte den Konflikt erneut offen — Titel/Slug deckungsgleich mit dem Untertitel von G2 rendite-kalibrierung („Ist die ETF-Ära vorbei?"), Inhalt aber ein drittes, eigenständiges Thema — und bot drei Wege an (eigenständig mit korrigiertem Titel / Zusatzabschnitt in rendite-kalibrierung / anders). Albert wollte die Entscheidung nicht treffen, sondern offen halten, ohne sie zu vergessen: das Verhältnis könnte eine gemeinsame App, eine Master/Slave-Kombination oder zwei getrennte Apps werden. Claude schlug gekoppelte Marker in beiden Mini-Specs plus einen BACKLOG-Eintrag vor; Albert bestätigte. Umgesetzt wurden je ein „Gekoppelter Sonderfall"-Block in `Apps/etf-aera-vorbei/MINI_SPEC_FROM_HAUPTDOKUMENT.md` und `Apps/rendite-kalibrierung/MINI_SPEC_FROM_HAUPTDOKUMENT.md` sowie ein neuer BACKLOG-Eintrag (zunächst als AF-24 vergeben). etf-aera-vorbei durchlief damit **kein** eigenes Mockup-Duell.

**plan-generator:** Anders als etf-aera-vorbei kein Identitätskonflikt, sondern sechs explizit offene Produktentscheidungen in der Mini-Spec mit einer formalen LLM-STOP-Regel (Konkretisierungsgrad, ETF-Namen ja/nein, Euro-Betrag, Output-Etikettierung, Verhalten bei fehlender Reife, Waschzettel ja/nein). Albert bat um dieselbe Klick-Matrix-mit-Freitext-Form wie bei den Grok-Produktentscheidungen; Claude stellte sie in zwei Frage-Blöcken. Albert entschied teils abweichend von den Empfehlungen (z. B. Frage 1: generisch, aber mit Indexnamen statt reiner Kategorie; Frage 3: Nutzer wählt Betrag selbst, mit 150 € als redaktionellem Ankerbeispiel). Claude fasste die sechs Entscheidungen vor dem Schreiben zusammen, Albert bestätigte, alle sechs wurden in die Mini-Spec eingetragen und die STOP-Regel als erfüllt markiert. Danach lief das reguläre Mockup-Duell — Grok fand vier Produktentscheidungen (u. a. den 150-€-Anker, den Grok mangels Kontext zur vorherigen Albert-Entscheidung zu Recht als unbelegte Behauptung markierte).

**regulatorik-dashboard:** Claude fand in `NAVIGATION.md` einen Hinweis, dass die im Mini-Spec-Kopf als „Nächster Schritt" genannte Readiness-Prüfung AP-14i bereits am 2026-07-01 abgeschlossen war (GRÜN, 16/16) — reine veraltete Dokumentation, kein echter Blocker. Der AP-14i-Review hatte aber ausdrücklich „kein APP_SPEC, kein Bauauftrag" als bewusstes, dauerhaftes Nicht-Ziel geprüft (nicht wie bei plan-generator „noch nicht geklärt"), weil die App dichten, scheinpräzisionsanfälligen Steuerinhalt hat. Claude legte Albert deshalb die Wahl vor: trotzdem ins Wegwerf-Mockup-Duell, oder erst den ursprünglich empfohlenen Scope-Schnitt-AP (AP-14j) nachholen. Albert fragte zwischendurch, ob der Mini-Spec ein Steuerungsblock fehle — Claude widerlegte das mit Direktzitat (vollständiger Steuerungsblock ab Zeile 169, in AP-14i selbst als GRÜN geprüft). Albert entschied: normales Duell durchziehen, zusätzlich das bereits bestehende `Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html` unverändert als dritte Vergleichsvariante (`c-bestandsmockup/mockup.html`) in die Werkstatt kopieren. Der `grok-paket`-Schritt schlug hier ein zweites Mal am selben BOM-Fehler wie bei esg-spiegel fehl und wurde nach demselben manuellen Fix erneut erfolgreich ausgeführt.

Nach regulatorik-dashboard waren alle 18 App-Fabrik-Apps mit Mini-Spec (17 aus der ersten Runde + regulatorik-dashboard; plan-generator war bereits mitgezählt) bis zum Sonnet-Auftrag durchgelaufen — nur etf-aera-vorbei blieb ohne eigenen Duell-Lauf, weil bewusst mit G2 verknüpft statt entschieden. Albert löste das Abschluss-Ritual aus.

### Abschluss-Ritual und ID-Kollision

Im Voll-Abschluss aktualisierte Claude `session-log.md`, `PROJECT-STATUS.md` (HOOK-META und §1 Aktueller Fokus, neuer Meilenstein „App-Duell-Runde ✅ 19 Apps bis Sonnet-Auftrag + 3 Problemfälle gelöst") und prüfte `NAVIGATION.md` auf einen passenden Verweis. Dabei fiel ein Zeile-376-Hinweis auf „Restklärung: AF-24 (nur noch plan-generator), später AP-22" auf — ein Verdacht auf ID-Kollision mit der zuvor selbst vergebenen BACKLOG-ID AF-24. Die Prüfung bestätigte: AF-24 war bereits am 2026-07-01 für die plan-generator-Seed-Sperre-Klärung vergeben und archiviert. Claude ermittelte die nächste freie ID (AF-25) und korrigierte alle betroffenen Stellen — BACKLOG.md, beide Mini-Spec-Marker, die Patch-Quittungsdatei (alte als „ÜBERHOLT" markiert, neue PATCH-AF-25 geschrieben), PROJECT-STATUS.md (zwei Stellen) und session-log.md (zwei Stellen). Ein abschließender grep bestätigte keine verbliebenen falschen AF-24-Referenzen in aktuellen Dateien.

Danach aktualisierte Claude das Memory `project_app_duell_pipeline.md` um zwei neue Lehren (ID-Kollisions-Check, Grok-Starttext-Format), der Memory-Integritätscheck lief grün (60/60), und Claude lieferte die vollständige Commit-Message im Langformat samt Liste der betroffenen Bereiche. Der Faden endete mit einem Hinweis auf zwei unberührte, bereits vorher lose im Repo liegende Dateien (`GHOST-LOKALBETRIEB.md`, `TMPL-1-PLAN.md`) und eine gelöschte Analyse-Datei, die nicht aus dieser Session stammten.

## Wendepunkte

- Nach dem ersten Kontakt mit etf-aera-vorbei (Konflikt, Stopp) entschied Albert zunächst zu überspringen; rund fünf Stunden später griff er das Thema gezielt wieder auf, statt es endgültig fallen zu lassen.
- Bei etf-aera-vorbei kippte die Lösungsrichtung von „entscheiden, was es ist" zu „bewusst offen halten, aber deterministisch auffindbar machen" — ein dritter Weg, den keiner der ursprünglich drei vorgeschlagenen Optionen entsprach.
- Bei regulatorik-dashboard kippte die Annahme „AP-14i noch offen" zu „AP-14i längst grün, nur Dokumentation veraltet" nach Lektüre der referenzierten Ergebnisdatei — und Albert erweiterte den Scope spontan um eine dritte Mockup-Variante.
- Der bereits als abgeschlossen gemeldete Voll-Abschluss wurde durch den Fund der AF-24-Kollision noch einmal in eine Korrekturschleife über sechs Dateien zurückgeworfen, bevor die Commit-Message geliefert wurde.

## Entscheidungen und Festlegungen

- **Scope der Runde: nur bis Sonnet-Auftrag, kein Mockup-Bau.** Wann: früh (nach diversifikations-detektor/esg-spiegel). Begründung: Albert wollte zuerst für jede App den Auftrag stehen haben, Implementierung später. Status am Ende: gültig, bestimmte den gesamten Faden.
- **etf-aera-vorbei ↔ rendite-kalibrierung: bewusst offen gehalten, gekoppelte Marker + BACKLOG-Eintrag.** Wann: Rückkehr-Phase. Begründung: Verhältnis (eine App / Master-Slave / getrennt) ist noch nicht entscheidbar, muss aber zuverlässig wieder auftauchen. Status: gültig (BACKLOG-ID am Ende korrigiert von AF-24 auf AF-25).
- **plan-generator: sechs Entscheidungen final getroffen, LLM-STOP-Regel aufgehoben.** Wann: Rückkehr-Phase. Begründung: Mini-Spec verlangte explizit Alberts Entscheidung vor jedem Bau. Status: gültig, App danach regulär durchs Duell gelaufen.
- **regulatorik-dashboard: normales Duell plus drittes Bestandsmockup als Vergleichsvariante.** Wann: Rückkehr-Phase. Begründung: Albert wollte sehen, was Sol/Fable zusätzlich zum bestehenden `etf-wahlurnen-rechner.html` finden. Status: gültig.
- **Grok-Starttext ab etf-namensdecoder: reiner, klickbarer Code-Block ohne Zieldatei-Hinweis und ohne Beiwerk.** Wann: während der Standard-Läufe. Begründung: Albert wollte Ein-Klick-Kopierbarkeit, Grok braucht den Zielpfad nicht zu kennen. Status: gültig, für den Rest der Runde eingehalten.

## Irrwege, Schleifen und verworfene Ansätze

- Erster Bearbeitungsversuch von etf-aera-vorbei endete im sofortigen Stopp wegen Konzeptkonflikt und wurde komplett übersprungen, statt sofort geklärt zu werden — die Klärung folgte erst Stunden später im Rahmen der gezielten Problemfall-Runde.
- Der ursprüngliche Grok-Starttext (mit Zieldatei-Speicherhinweis und `.txt`-Platzhalterdatei) wurde einmal verwendet, dann von Albert als überflüssig gestrichen; nur der reine Ablaufhinweis blieb als Vorlage.
- Die BACKLOG-ID AF-24 wurde ohne vollständigen Scan aller Archivdateien neu vergeben und kollidierte mit einer bereits am 2026-07-01 belegten ID. Der Fehler wurde erst im Abschluss-Ritual über einen Querverweis in NAVIGATION.md entdeckt und musste über sechs Dateien hinweg auf AF-25 korrigiert werden; die ursprüngliche Patch-Quittung wurde nicht gelöscht, sondern als „ÜBERHOLT" markiert.
- Albert vermutete zwischenzeitlich, die regulatorik-dashboard-Mini-Spec habe keinen Steuerungsblock — durch Direktzitat der Datei widerlegt.

## Erzeugte Artefakte

- Je bearbeiteter App (19x, alle unter `tests/scratch/<slug>/`, gitignorierter Wegwerf-Bereich): `psychosprint/PSYCHOSPRINT_AUFTRAG.md`, `01-sol.md`/`02-fable.md` (extern von Sol/Fable geliefert), `GROK_EINGABE_ANONYMISIERT.md`, `ANONYMISIERUNGSMANIFEST.md`, `GROK_AUFTRAG.md`, `grok-gegenkritik.md` (extern von Grok geliefert), `PRODUKTENTSCHEIDUNGEN.md`, `mockup-duell/SONNET_EINGABEPAKET.md` und `SONNET_AUFTRAG.md`. Status am Ende: final für Phase 1–3, Sonnet-Mockup-Bau (Phase 4) bewusst offen.
- `tests/scratch/regulatorik-dashboard/mockup-duell/c-bestandsmockup/mockup.html` — Kopie von `Apps/regulatorik-dashboard/etf-wahlurnen-rechner.html`. Status: final, dritte Vergleichsvariante.
- `Apps/etf-aera-vorbei/MINI_SPEC_FROM_HAUPTDOKUMENT.md` und `Apps/rendite-kalibrierung/MINI_SPEC_FROM_HAUPTDOKUMENT.md` — je ein neuer „Gekoppelter Sonderfall"-Block. Status: final.
- `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md` — sechs Alberts-Entscheidungen eingetragen, STOP-Regel als erfüllt markiert. Status: final.
- `docs/steering/BACKLOG.md` — neuer Eintrag AF-25 (ursprünglich fälschlich als AF-24 geschrieben, korrigiert). Status: final.
- `docs/steering/patches/PATCH-AF-24-2026-07-19.md` — Status: ersetzt/als ÜBERHOLT markiert, als Audit-Trail erhalten.
- `docs/steering/patches/PATCH-AF-25-2026-07-19.md` und `PATCH-plan-generator-entscheidungsblock-2026-07-19.md` — Status: final, neu.
- `PROJECT-STATUS.md`, `.claude/learning/session-log.md`, `.claude/memory/project_app_duell_pipeline.md` — Status: final aktualisiert.
- Commit-Message im Langformat (Titel „docs(App-Duell-Runde): 19 Apps bis Sonnet-Auftrag + 3 Sonderfälle gelöst") — im Faden nur als Text geliefert; der eigentliche Commit-Vorgang liegt außerhalb dieses Fadens.

## Sachliche Erkenntnisse

- Gesicherter Stand: AP-14i (regulatorik-dashboard Readiness-Prüfung) war bereits am 2026-07-01 vollständig abgeschlossen (GRÜN, Marker-QA 18/18, LLM-Selbsttest 16/16). Die „Nächster Schritt"-Zeile im Mini-Spec-Kopf war lediglich veraltete Dokumentation.
- Gesicherter Stand: Die regulatorik-dashboard-Mini-Spec besitzt einen vollständigen Steuerungsblock (Zweck, Barriere, Zielzustand, Nicht-Ziele, Muss-Kriterien, Tonalität, LLM-Prüfscore).
- Arbeitsannahme, bewusst unentschieden gelassen: Ob G2 rendite-kalibrierung und etf-aera-vorbei eine gemeinsame App, eine Master/Slave-Kombination oder zwei getrennte Apps werden.
- Spätere Korrektur: Die BACKLOG-ID AF-24 war zum Zeitpunkt der Vergabe bereits belegt; korrekte ID ist AF-25.
- Wiederkehrendes technisches Muster: UTF-8-BOM in extern (vermutlich per Editor) gespeicherten `01-sol.md`-Dateien führt zu Frontmatter-FAIL im `grok-paket`-Schritt — trat zweimal auf (esg-spiegel, regulatorik-dashboard), beide Male durch Neuspeichern ohne BOM behoben.

## Offene Punkte am Ende

- Phase 4 (tatsächlicher Sonnet-Mockup-Bau) steht für alle 19 Apps noch aus — bewusst auf später verschoben.
- Die Beziehung G2 rendite-kalibrierung ↔ etf-aera-vorbei (eine App / Master-Slave / zwei Apps) ist weiterhin ungeklärt, nur über BACKLOG AF-25 und gekoppelte Mini-Spec-Marker deterministisch wieder auffindbar gemacht.
- Zwei lose, nicht aus dieser Session stammende Dateien (`docs/steering/theme-build/GHOST-LOKALBETRIEB.md`, `TMPL-1-PLAN.md`, untracked) sowie eine gelöschte Analyse-Datei wurden am Fadenende erwähnt, aber nicht bearbeitet.
- Ob der gelieferte Commit tatsächlich ausgeführt wurde, liegt außerhalb dieses Fadens.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken:
- Zwei unabhängige BOM-Fehler im selben Workflow-Schritt (esg-spiegel, regulatorik-dashboard) deuten auf eine strukturelle Lücke hin: Das Tooling prüft Frontmatter-Inhalt, aber nicht Datei-Encoding vorab.
- Die ID-Kollision AF-24 entstand, weil die neue BACKLOG-ID ohne vollständigen Scan aller Archivdateien (nur `BACKLOG.md`, nicht `BACKLOG-ARCHIV*.md`) vergeben wurde — ein wiederholbares Risiko bei jeder künftigen manuellen ID-Vergabe.
- Prozessdetails (Grok-Starttext-Format, Copy-Block-Reinheit) wurden nicht vorab vollständig spezifiziert, sondern zweimal mitten im Bulk-Lauf von Albert nachgeschärft und rückwirkend als Vorlage für die restlichen Apps übernommen.
- Bei zwei der drei „Problemfälle" (etf-aera-vorbei, regulatorik-dashboard) erwies sich die ursprüngliche Einschätzung als Blocker als teilweise überholt oder falsch (AP-14i längst grün; Steuerungsblock-Vermutung falsch) — nur plan-generator war tatsächlich ein reiner Entscheidungs-Blocker wie ursprünglich angenommen.

## Bewusst ausgelassen

- Einzelne Produktentscheidungen der 14 unauffälligen Standard-Apps (etf-vergleich bis weltkarte-etf-indizes ohne markante Befunde) — identisches Ablaufmuster, keine Kursänderung.
- Alle Dry-Run/„schreibe"-Bestätigungspaare der `prepare`/`grok-paket`/`sonnet-paket`-Tool-Aufrufe — für jede der 19 Apps mechanisch identisch.
- Wortlaut der geladenen Skill-Instruktionstexte (`/start`, `/app-duell`, `/abschluss-ritual`, `patch-quittung`) — Prosa-Regelwerk, kein Ereignis dieses Fadens.
- Exakte Byte-/Zeichengrößen der erzeugten Werkstattdateien.
