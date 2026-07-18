---
chronik_id: CHRONIK-2026-07-18-app-duell-pipeline
datum: 2026-07-18
projekt: finanzwesir-2-0
thema: app-duell-pipeline
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: ausschnitt
schlagworte: [richtungswechsel, annahme-verworfen, tooling-problem, konzept-vs-umsetzung, praezisierung-durch-gegenfrage]
---

# Chronik: Vom manuellen Mockup-Duell zur werkzeuggestützten /app-duell-Pipeline

**Hauptgegenstand:** Der Faden begann mit dem Bau zweier interaktiver Mockups
für die App `risiko-uebersetzer` (AP-app-fabrik-07) und entwickelte sich über
eine Kette von Härtungs-APs (AP-08 bis AP-09k) zu einem wiederverwendbaren,
werkzeuggestützten Mockup-Duell-Prozess, verpackt als Skill `/app-duell`. Am
Ende wurden die vor diesem Prozess entstandenen Werkstätten als solche
markiert.

## Ausgangslage

Auftrag zu Beginn: Für `risiko-uebersetzer` sollten zwei interaktive Mockups
gebaut werden — Variante A gegen Variante C, als Happy-Path-Entwürfe zum
manuellen Vergleich durch den Nutzer. Der Rahmen war der App-Fabrik-Kontext:
Tailwind-Baukasten, CI-Token, keine erfundene Testpipeline, Verifikation im
lokalen Live-Server. Ein formaler, wiederholbarer Mockup-Duell-Prozess
existierte zu diesem Zeitpunkt noch nicht; der Duell wurde manuell geführt.

## Chronologischer Verlauf

### Mockup-Bau und UX-Iteration Variante A (AP-07)

Zwei Mockups wurden gebaut: `a-lebensraum-blende` und `c-wegnahme-regal` unter
`tests/scratch/risiko-uebersetzer/mockup-duell/`. Es folgte eine lange
Iterationsschleife an Variante A, getrieben durch Live-Test-Rückmeldungen des
Nutzers. Ein Bildschirm-Umschalt-Fehler wurde sichtbar: `showScreen(n)` erhielt
über `data-goto` Strings, verglich aber gegen Zahlen (`if (n === 3)`), sodass
Screens nicht initialisierten; korrigiert durch `n = Number(n)` am
Funktionsanfang. Die animierte „Lebensraum-Blende" (Prozenthöhe im Flex-Kind,
später `transform: scaleY()`) wurde vom Nutzer verworfen mit der Begründung,
sie sei nicht verständlich. An ihre Stelle traten zwei gestapelte Karten
(„Dein Anker" und „Hypothetischer Verlust", CI-Purpur), danach eine
Gesamtrendite-Kette (ETF 8 %, Tagesgeld 1,5 %). Slider-Schrittweiten wurden auf
Wunsch angepasst (ETF 5 %-Schritte, Anker 100 Schritte). Anschließend wurde ein
fester Übergabepunkt angelegt, damit ein anderes LLM nahtlos aufsetzen kann.

### Prozess-Härtung: Vertrag und Startlinie (AP-08)

Der Fokus verschob sich vom Einzel-Mockup zum Prozess. AP-08 harmonisierte
Vertrag und Startlinie der Grok-Gegenkritik-Stufe.

### Deterministisches Produktentscheidungs-Gate (AP-09, 09c–09g)

Eine Serie von APs baute ein deterministisches Gate und behob Pfad-, Namens-
und Isolationsfragen. Der Nutzer setzte eine harte Sicherheitsschranke: die
Werkstatt `tests/scratch/risiko-uebersetzer/` dürfe nicht mehr als Quelle
gelesen oder verwendet werden; stattdessen sei ausschließlich AP-09f
auszuführen. Bei einem Validierungswiderspruch der Mini-Spec-Prüfung (AP-09f)
wurde dem Nutzer die Wahl vorgelegt; er entschied „Strikt lassen".

### Verpackung als Skill /app-duell

Der Nutzer forderte einen Skill `/app-duell` analog zu `app-spec-create` und
`/tech-spec-app`. Aus zwei Optionen wählte er Option A: den Masterprompt zur
kanonischen Referenz unter `docs/App-Fabrik/` erheben und den Skill als dünnen
Starter bauen. Der Nutzer benannte Dateien um; der Masterprompt wurde zu
`docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`. Nicht mehr benötigte Dateien
wurden nach Prüfung des Dateibündels gelöscht (Auswahl per Rückfrage vom Nutzer
bestätigt). Zur Dokumentation der vom Skill gesteuerten Dateiliste wurde eine
`README.md` neben den Skill gelegt, statt die Liste in den Skill selbst zu
schreiben.

### Gedankenexperiment und Textfixes (K1–K8, AP-09h)

Ein von ChatGPT verfasster Masterprompt wurde Schritt für Schritt auf Lücken
geprüft (Befunde K1–K8). Die Text-Korrekturen wurden als AP-09h umgesetzt; der
Werkzeug-Teil wurde als eigener AP geschnitten (AP-09i, später AP-09k).

### Kanonisierung der Vorlagen (AP-09j)

Die drei Prompt-Vorlagen (`PSYCHOSPRINT_GRUNDPROMPT`, `GROK_GEGENKRITIK_VORLAGE`,
`SONNET_MOCKUP-DUELL_VORLAGE`) wurden aus dem gitignorierten `Archiv/local` nach
`docs/App-Fabrik/vorlagen/` verschoben; die Werkzeug-Konstante `ARCHIV_REL`
wurde durch `VORLAGEN_REL` ersetzt.

### Externer Peer-Review und ID-Bindung (AP-09k)

Der Nutzer legte eine ChatGPT-Bewertung des Sonnet-Bau-Prompts vor. Claude
prüfte, wo die Bewertung zutraf. ChatGPT hatte auf eine Schwäche gezeigt: das
Gate zählte nur die Zahl der Produktentscheidungen, band sie aber nicht an
Identitäten. Diese Schwäche wurde bestätigt. AP-09k ersetzte das Zähl-Gate durch
eine Identitätsbindung: Grok taggt jeden Fund `Produktentscheidung nötig [E<k>]`,
`PRODUKTENTSCHEIDUNGEN.md` trägt dieselben IDs, und `sonnet-paket` prüft
Mengen-Gleichheit (Set-Gleichheit) statt Zählung; der Selbsttest wurde auf sechs
Produktentscheidungs-Fälle erweitert. Die Ergebnis-Datei wurde als
selbsttragendes Peer-Review-Paket geschrieben. Zwei weitere Low-Findings von
ChatGPT wurden auf Wunsch des Nutzers („mit 100 % Qualität in diese große
Sache") ebenfalls behoben.

### Freigabe und Abschluss

Der Nutzer erklärte alles grün und freigegeben. Es folgte `/abschluss-ritual`
als Voll-Abschluss (Pfad A, Kettenende).

### Umgang mit Vor-Prozess-Werkstätten

Abschließend stellte der Nutzer die Frage, wie mit den vor diesem Prozess
entstandenen Apps umzugehen sei. Eine Bestandsaufnahme unterschied drei Fälle:
`prokrastinations-preis` (voll gespecte Pilot-App, anderer Baupfad, kein
Mockup-Duell-Artefakt), `depot-kipppunkt` (durch die reifende Werkzeugkette
gelaufen; Grok-Gutachten ohne `[E<k>]`-IDs, daher blockt `sonnet-paket` jetzt
bewusst) und `risiko-uebersetzer` (manueller A/C-Duell, vor der Werkzeugkette,
ohne Grok). Der Nutzer entschied: minimale Vermerk-Dateien setzen, nichts
umschreiben. In `depot-kipppunkt` und `risiko-uebersetzer` wurde je eine
`_VOR-APP-DUELL.md` angelegt; `prokrastinations-preis` blieb unberührt.

## Wendepunkte

- Verwerfen der animierten Blende in Variante A zugunsten zweier statischer
  Karten — ausgelöst durch die Rückmeldung, die Animation sei nicht
  verständlich.
- Verschiebung vom Einzel-Mockup-Bau (AP-07) zur Prozess-Härtung (ab AP-08).
- Der externe ChatGPT-Peer-Review, der das Zähl-Gate als Scheinsicherheit
  aufdeckte und den Umbau auf Identitätsbindung (AP-09k) auslöste.

## Entscheidungen und Festlegungen

- Skill-Architektur: Option A (Masterprompt als kanonische Referenz, dünner
  Starter-Skill) · bei der Skill-Konzeption · gewählt gegen die Alternative ·
  gültig.
- Mini-Spec-Validierung „strikt lassen" · bei AP-09f · Nutzerentscheidung bei
  Validierungswiderspruch · gültig.
- Dateilisten-Doku als separate `README.md` statt im Skill-YAML · bei der
  Skill-Dokumentation · um den Skill nicht zu verwässern · gültig.
- Umbau des Produktentscheidungs-Gates von Zählung auf Mengen-Gleichheit mit
  ID-Bindung · bei AP-09k · nach bestätigtem externem Review · gültig.
- Kanonische Vorlagen-Ablage `docs/App-Fabrik/vorlagen/` statt gitignoriertem
  `Archiv/local` · bei AP-09j · gültig.
- Vor-Prozess-Werkstätten markieren statt umschreiben oder archivieren · am
  Fadenende · minimaler Vermerk, kein Statuswechsel · gültig.
- `prokrastinations-preis` nicht anfassen · am Fadenende · als eigenständige
  Pilot-App kein Mockup-Duell-Artefakt · gültig.

## Irrwege, Schleifen und verworfene Ansätze

- Animierte Lebensraum-Blende (Prozenthöhe im Flex-Kind, dann `transform:
  scaleY()`): mehrfach nachgebessert, dann ganz verworfen. Führte zur
  Zwei-Karten-Lösung.
- Zwischenzeitlich wurden bei Variante A zu viele Elemente entfernt (doppelte
  Starttexte); der Nutzer mahnte Selbstprüfung gegen voreilige Vereinfachung an.
  Claude bestimmte, dass Werkzeug-Startzeile und Masterprompt-Starttext keine
  reinen Duplikate waren.
- Zähl-basiertes Gate (AP-09i): als Scheinsicherheit erkannt und durch
  ID-Bindung (AP-09k) ersetzt.

## Erzeugte Artefakte

- `tests/scratch/risiko-uebersetzer/mockup-duell/{a-lebensraum-blende,c-wegnahme-regal}/mockup.html`
  — zwei Mockups · Status: final im Rahmen AP-07, Werkstatt später als
  Vor-Prozess markiert.
- `tools/app-fabrik-psychosprint.py` — zentrales Werkzeug mit Subkommandos
  `prepare`/`grok-paket`/`sonnet-paket` und `--self-test` · Status: final,
  Selbsttest grün, nicht committet.
- `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md` — Prozess-Referenz · final.
- `docs/App-Fabrik/vorlagen/{PSYCHOSPRINT_GRUNDPROMPT,GROK_GEGENKRITIK_VORLAGE,SONNET_MOCKUP-DUELL_VORLAGE}.md`
  — Prompt-Vorlagen · final.
- `.claude/skills/app-duell/SKILL.md` + `README.md` — Starter-Skill und
  Abhängigkeitskarte · final.
- `docs/steering/patches/AP-app-fabrik-09{h,i,j,k}_*_Ergebnis.md` — Ergebnis-
  Dateien; 09k als selbsttragendes Peer-Review-Paket · final.
- `tests/scratch/{depot-kipppunkt,risiko-uebersetzer}/_VOR-APP-DUELL.md` —
  Vor-Prozess-Vermerke · final.
- Memory-Datei `project_app_duell_pipeline.md` + MEMORY.md-Zeiger · final.

## Sachliche Erkenntnisse

- Gesicherter Stand: Ein Gate, das nur zählt, bindet Funde nicht an Identitäten;
  erst Set-Gleichheit über IDs bindet Grok-Funde an Produktentscheidungen.
- Gesicherter Stand: `data-goto` liefert Strings; ein Vergleich gegen Zahlen
  ohne Konvertierung schlägt fehl.
- Arbeitsannahme: `prokrastinations-preis` benötigt am Werkzeug kein Handling,
  da es auf dem `app-spec-create`-Pfad entstand und keine Mockup-Duell-Artefakte
  besitzt.

## Offene Punkte am Ende

- Das eigentliche App-Bauen hatte noch nicht begonnen; der Nutzer signalisierte,
  dass es nun darum gehe.
- Ein Werkstatt-Abschluss-Skill (MOCKUP-VERTRAG §9/§10, dauerhafte Archivierung
  abgeschlossener Werkstätten) ist bewusst nicht gebaut; die Vermerk-Dateien
  überbrücken bis dahin.
- Das zentrale Werkzeug und die Vermerk-Dateien waren zum Fadenende noch nicht
  committet (Staging liegt beim Nutzer).

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein extern (durch ein anderes LLM)
angestoßener Peer-Review deckte eine Schwäche auf, die im internen Bau nicht
gesehen worden war (Zählung statt Identitätsbindung). Für spätere
Musteranalyse vormerken: Der Nutzer setzte während einer Bau-Iteration eine
harte Lese-/Verwendungssperre für ein Werkstatt-Verzeichnis, um Übertragung von
Fremd-App-Inhalten zu verhindern.

## Bewusst ausgelassen

Der frühe und mittlere Teil dieses Fadens lag zum Zeitpunkt der
Chronik-Erstellung nur als verdichtete Zusammenfassung vor (Kontext-Kompaktierung),
nicht als wörtlicher Verlauf; daher `quellenlage: ausschnitt`. Weggelassen
wurden ferner: detaillierte Tool- und Bedienschritte, wörtliche
Zwischenfassungen der iterierten Mockups, einzelne Dateiumbenennungen ohne
Verlaufswirkung sowie eingefügte Fremd-Outputs (ChatGPT-Bewertungen) im
Wortlaut — diese zählen als Material, nicht als Teilnehmer.
