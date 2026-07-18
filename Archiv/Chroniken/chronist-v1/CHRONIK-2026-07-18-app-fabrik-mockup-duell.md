---
chronik_id: CHRONIK-2026-07-18-app-fabrik-mockup-duell
datum: 2026-07-18
projekt: finanzwesir-2-0
thema: app-fabrik-mockup-duell
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: offen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, praezisierung-durch-gegenfrage, missverstandene-anforderung, konzept-vs-umsetzung, tooling-problem, vollstaendigkeit-vs-verdichtung]
---

# Chronik: Aufbau der App-Fabrik bis zur Produktentscheidungsprüfung

**Hauptgegenstand:** Der Faden behandelte die Vorbereitung einer App-Fabrik für psychologisch wirksame Werkstatt-Mockups. Im Verlauf wurden Prozess, Rollen, Ablage, Werkzeug, Promptketten und die Grenzen der Sonnet-Übergabe präzisiert. Am Ende wurde AP-app-fabrik-09i als noch nicht freigegeben eingeordnet.

## Ausgangslage

Der Nutzer wollte die noch fehlenden Apps unter `Apps/` zügig bauen lassen, ohne die Erfahrung aus der Prokrastinations-App zu wiederholen: Dort war die technische Umsetzung schrittweise erfolgt, während die psychologische Wirkung erst nachträglich geprüft worden war. Als Zielbild wurde ein Ablauf beschrieben, in dem ein LLM zunächst das psychologische Problem aus einer Mini-Spec erfasst, anschließend ein CI-konformes Happy-Path-Mockup baut und erst nach einem Wirkungstest die technische APP_SPEC und Umsetzung folgen.

Als Steuerungsquellen wurden das Merkblatt zu den Chart-Engine-Folgearbeiten sowie die Leitplanken `STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md` und `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` benannt. Die Prokrastinations-App blieb als abgeschlossener Pilot außerhalb des neuen Verfahrens.

## Chronologischer Verlauf

### Mockup-Track und Vertragsgrundlage

Zunächst wurde die Reihenfolge aus dem Chart-Engine-Merkblatt gegenüber dem geplanten Mockup-Track abgegrenzt. Die Engine-DOM-Restpunkte wurden als eigenständiger technischer Strang behandelt; sie sollten nicht in der App-Fabrik verschwinden. Für den Mockup-Track entstand eine Startlinie mit vierzehn Punkten. Sie führte von Anamnese und Mockup-Vertrag über Psychosprint, Gegenkritik und Zwei-Varianten-Duell bis zur späteren technischen APP_SPEC.

Claude führte AP-app-fabrik-01 als Anamnese aus. Der Freigabestatus des Tailwind-Baukasten-Konzepts wurde als F-01 benannt und anschließend durch AP-app-fabrik-02 auf Grundlage von Session-Log, Projektstatus, Navigation und bereits genutzten Verträgen geklärt. Der Mockup-Vertrag wurde danach als Klasse-C-Entscheidung vorbereitet, gegengeprüft und in `docs/App-Fabrik/MOCKUP-VERTRAG.md` festgehalten.

In diesem Zusammenhang wurden vier Vertragsentscheidungen festgehalten: Datenfidelität, Wirkungsprüfung ohne Selbstzertifizierung, Wegwerfgrenze und Werkstatt-/Quellmanifest. Für die Werkstatt wurde festgelegt, dass laufende Experimente unter `tests/scratch/<slug>/` liegen. Spätere Abschlussnotizen sollten erst bei Bedarf als `Archiv/Werkstatt-Abschlussnotiz` entwickelt werden.

### Modellrollen und Psychosprint

Die zunächst erwogene breite Runde mit Terra, Opus, Sol, Fable und Perplexity-Modellen wurde mehrfach eingegrenzt. Als Psychosprint-Teilnehmer blieben Sol und Fable. Grok mit Thinking sollte über Perplexity als unabhängige Gegenkritik dienen. Sonnet sollte beide ausgewählten Entwürfe bauen. Ein Gewinner sollte weder von Grok noch von Sonnet bestimmt werden; die Wirkungsauswahl blieb beim Nutzer.

Die Regel für die Gegenkritik wurde mehrfach präzisiert: Grok durfte neue Ideen einbringen, sofern sie einer Variante zuordenbar blieben und deren Signaturmechanik schärften. Es durfte keine dritte Variante und keine unbemerkte Mischung entstehen. Jeder Hinweis sollte für Entwurf A, für Entwurf B oder als nicht zu übernehmen gekennzeichnet sein sowie Barriere oder Nicht-Ziel und Testmoment benennen. Der vorhandene Vier-Kriterien-Prüfscore sollte als Zweitmeinung dienen.

Ein zwischenzeitlich angelegter Pfad mit unterschiedlichen Sol- und Fable-Vorlagen wurde nach Rückfrage verworfen. AP-app-fabrik-09c stellte wieder her, dass beide Modelle dieselbe vollständige Mini-Spec und denselben vollständigen Psychosprint-Auftrag erhalten; nur Teilnehmer-ID und Rohdatei unterscheiden sich.

### Werkzeug und Werkstattablage

Für die mechanischen Schritte entstand `tools/app-fabrik-psychosprint.py`. Es erhielt die Befehle `prepare`, `grok-paket`, `sonnet-paket` und `--self-test`. Python sollte nur Vorlagen füllen, Rohtexte validieren, anonymisieren und unverändert zusammenführen. Psychologische Erfindung, Gegenkritik, Produktentscheidung und Mockup-Bau blieben bei den jeweiligen Modellen beziehungsweise beim Nutzer.

Die app-spezifischen Aufträge wurden aus dem Archiv in die jeweilige Werkstatt verschoben. Der Ablauf verwendete danach unter `tests/scratch/<slug>/psychosprint/` den gemeinsamen Psychosprint-Auftrag, die Sol-/Fable-Rohtexte, das anonymisierte Grok-Paket, das Manifest, den Grok-Auftrag und das Grok-Ergebnis. Unter `mockup-duell/` sollten Sonnet-Eingabepaket, Sonnet-Auftrag, die getrennten Verzeichnisse `a-sol/` und `b-fable/` sowie ein README liegen. Allgemeine Vorlagen und das Werkzeug blieben außerhalb der einzelnen Werkstätten.

Ein vorgeschriebener Dry-Run mit fremdem Slug und fremder Mini-Spec erwies sich als absichtlich ungültig, weil das Werkzeug die Mini-Spec unter `Apps/<slug>/` verlangte. AP-app-fabrik-09f hielt den historischen gelben Befund fest. Eine nachfolgende Verifikation mit gültigem `depot-kipppunkt`-Slug bestätigte die Werkstattziele ohne Schreiben.

### Depot-Kipppunkt und Quellensperre

Für `depot-kipppunkt` lieferten Sol und Fable getrennte Psychosprints; Grok gab eine Gegenkritik ab. Der Nutzer legte für Variante B fest: „Gleichstand, dann mehr.“ Der Kippbalken sollte am Schnittpunkt zunächst Gleichstand zeigen und im nächsten Schritt zugunsten des Depots kippen. Die permanenten Ertrag-pro-Jahr-Labels blieben vorgesehen; Renten-, Freiheits- und Jobausstiegs-Sprache wurden ausgeschlossen.

Bei einem Sonnet-Bauauftrag hatte Claude vorgeschlagen, die frühere Risiko-Übersetzer-Werkstatt als Scaffold zu lesen. Der Nutzer trennte dieses Thema vom laufenden Faden und verlangte eine dauerhafte Regel für künftige Aufträge. AP-app-fabrik-09g ergänzte daher die Quellensperre: Sonnet darf keine fremde App-Werkstatt unter `tests/scratch/<anderer-slug>/` als Scaffold oder Referenz lesen. Das Werkzeug prüft einen Marker in der generischen Sonnet-Vorlage und verweigert ohne ihn die Ausgabe von Eingabepaket und Auftrag.

Das Depot-Kipppunkt-Duell wurde anschließend als zwei Werkstatt-Mockups gebaut. Die Ergebnisdatei hielt den Status GELB bis zu Alberts Browservergleich fest.

### Masterprompt und Produktentscheidungen

Der Nutzer verlangte einen Masterprompt, der in einem frischen Faden den gesamten Prozess steuern sollte. Als Ablage wurde das generische App-Fabrik-Archiv statt `tests/scratch/` bestimmt. Ein Schreibversuch über das Nextcloud-Laufwerk blieb ohne angelegte Datei; später lag eine Datei `Masterprompt — App-Fabrik Psychosprint bis Mockup-Duell.md` im Archiv vor.

Danach wurde AP-app-fabrik-09i ausgeführt. Es ergänzte ein Gate für Grok-Hinweise mit der Zeichenkette `Produktentscheidung nötig`. Vor dem Sonnet-Paket sollte `PRODUKTENTSCHEIDUNGEN.md` vorliegen; Statusblöcke sollten mindestens so häufig vorkommen wie die Grok-Treffer. Aufgelöste Entscheidungen sollten unverändert in das Sonnet-Eingabepaket gelangen. Bei `übersprungen` sollte Sonnet eine sichtbare Warnung in beide Mockups aufnehmen. Der Self-Test enthielt einen Positivfall, einen Blockierungsfall und einen Übersprungen-Fall. Ein schreibfreier Lauf für Depot-Kipppunkt blockierte, weil dessen Grok-Ergebnis einen Produktentscheidungs-Treffer enthielt, ohne dass eine Entscheidungsdatei angelegt worden war.

## Wendepunkte

- Der Mockup-Track wurde vom technischen Bau getrennt, nachdem die Prokrastinations-App als technisch schrittweise, psychologisch aber nachträglich umgebaute Erfahrung beschrieben worden war.
- Die breite Modellrunde wurde auf Sol und Fable als Erstentwürfe, Grok als Zweitmeinung und Sonnet als Erbauer der zwei Varianten eingegrenzt.
- Die zuerst unterschiedlichen Modellvorlagen wurden durch einen einheitlichen Psychosprint-Auftrag ersetzt.
- App-spezifische Aufträge wurden aus dem Archiv in die jeweilige Werkstatt verlegt; allgemeine Vorlagen blieben zentral.
- Die Risiko-Übersetzer-Werkstatt wurde nach dem Scaffold-Vorschlag ausdrücklich als unzulässige Fremdquelle für künftige Sonnet-Aufträge abgegrenzt.
- Die Prüfung von AP-09i machte sichtbar, dass ein vorhandenes Gate offene Entscheidungen blockierte, aber deren Identität nicht verifizierte.

## Entscheidungen und Festlegungen

- Der Mockup-Track testet Happy-Path-Optik und -Verhalten vor APP_SPEC und Produktionscode. Status am Ende: gültig.
- Sol und Fable erhalten denselben vollständigen Psychosprint-Auftrag. Status am Ende: gültig.
- Grok liefert eine zuordenbare Gegenkritik mit vorhandenem Vier-Kriterien-Prüfscore, bestimmt aber keinen Sieger und bildet keine dritte Variante. Status am Ende: gültig.
- Sonnet baut immer zwei getrennte Varianten, A aus Sol und B aus Fable. Status am Ende: gültig.
- App-spezifische Artefakte liegen unter `tests/scratch/<slug>/`; allgemeine Vorlagen liegen außerhalb. Status am Ende: gültig.
- Fremde Werkstätten dürfen Sonnet nicht als Scaffold oder Referenz lesen. Status am Ende: gültig.
- Produktentscheidungen sollten vor dem Sonnet-Paket in `PRODUKTENTSCHEIDUNGEN.md` festgehalten werden. Status am Ende: teilweise umgesetzt; die Zuordnung einzelner Entscheidungen blieb offen.

## Irrwege, Schleifen und verworfene Ansätze

- Die Nutzung von Engine-Fixtures für den psychologischen Mockup-Test der bereits fertigen Prokrastinations-App wurde angesprochen und anschließend als nicht passend für diesen Zweck abgegrenzt.
- Ein separater Werkstatt-Abschluss-Skill wurde vorbereitet, aber nicht gebaut; er wurde auf eine spätere Notwendigkeit verschoben.
- Die Erzeugung unterschiedlicher Psychosprint-Vorlagen für Sol und Fable wurde verworfen, weil Vergleichbarkeit einen identischen Auftrag verlangte.
- Der Vorschlag, den Risiko-Übersetzer als Scaffold für Depot-Kipppunkt zu lesen,