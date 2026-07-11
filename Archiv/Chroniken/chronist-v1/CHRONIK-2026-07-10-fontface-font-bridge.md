---
chronik_id: CHRONIK-2026-07-10-fontface-font-bridge
datum: 2026-07-10
projekt: finanzwesir
thema: fontface-font-bridge
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: mit-anhaengen
schlagworte: [praezisierung-durch-gegenfrage, annahme-verworfen, tooling-problem, richtungswechsel]
---

# Chronik: Anamnese und Entscheidung zur @font-face-Bereitstellung des Pilot-Harness

**Hauptgegenstand:** Ein frischer Steuerungsfaden übernahm per Übergabekapsel die Führung im Projekt Finanzwesir 2.0, führte die Anamnese für den Schritt „CI-Fonts in die App" gegen die realen Dateien durch und arbeitete über mehrere Runden eine Entscheidung zur Bereitstellung der `@font-face`-Regeln im Test-Harness aus. Aus einem ersten Peer-Review-Dokument entstand nach externer Kritik eine korrigierte Entscheidungssynthese.

## Ausgangslage
Der Faden begann mit einer Übergabekapsel, die den vorangegangenen Steuerungsfaden ersetzte. Festgehalten war: Die CI-Farbkette (AP 15a–19) war abgeschlossen und committed, die Fonts jedoch noch nicht CI-konform — der Pilot `prokrastinations-preis` rendere auf Fallback-`sans-serif`. Alberts gestraffter Fahrplan sah als Schritt 1 die CI-Fonts (`AP-prokrast-17-FOLLOWUP-FONT`, gekoppelt mit der Rubikon-Nachmessung DS-FOLLOWUP-07) als Prerequisite vor Tailwind vor. Vorgegeben war ein Start mit Anamnese, kein sofortiger Code.

## Chronologischer Verlauf

### Übernahme und Dateizugriff
Der Steuerungsfaden bestätigte die Rolle und Kernlage und forderte Zugriff auf den Projektordner an, mit der Begründung, die Anamnese gegen die reale Datei statt gegen das Protokoll führen zu müssen. Der Ordner `Finanzwesir 2.0` wurde verbunden.

### Anamnese CI-Fonts
Eine Aufgabenliste wurde angelegt. Erste Verzeichnis- und Dateisuchen über das Host-Werkzeug (Glob) liefen wiederholt in Timeouts; als Grund wurde das Netzlaufwerk (Nextcloud, Z:) benannt. Die Arbeitsweise wurde auf gezielte Shell-Zugriffe über den gemounteten Pfad umgestellt. Auch rekursive `grep`-Läufe über den gesamten Baum brachen ab; daraufhin wurde auf einzelne, eng begrenzte Datei- und Verzeichniszugriffe umgestellt.

Befunde gegen die Dateien: Die Fonts lagen lokal als woff2 vor; die vier `@font-face`-Blöcke standen ausschließlich in `screen.css` (Abschnitt 2), nicht in `tokens.css`. `tokens.css` enthielt nur die Font-Namen `--font-display`/`--font-body`. Der Harness (`app.test.html`) lud nur `tokens.css` und `app.css`, nicht `screen.css`. `app.css` setzte `font-family: var(--fw-font-base, sans-serif)`, wobei `--fw-font-base` nirgends definiert war. Die Rubikon-Textpositionen lagen je Breakpoint (S/M/L) als von Hand gemessene Prozentwerte vor. Zwei Font-CSS-Dateien im fonts-Ordner waren als DEPRECATED markiert.

### Variantenfrage und Umformung des Auftrags
Der Steuerungsfaden legte drei Wege zur `@font-face`-Bereitstellung vor (schlanke `fonts.css`; `@font-face` in `tokens.css`; Harness lädt `screen.css`) und stellte die Wahl als Frage. Der Nutzer wählte keine Variante, sondern verlangte eine Abwägung nach Zukunftsfähigkeit, Performance und Sicherheit sowie den Vergleich mit dem Vorgehen großer Teams. Der Steuerungsfaden lieferte diese Abwägung und empfahl Variante 1, mit Preload und Subsetting als getrennten Backlog-Kandidaten.

### Präzisierung der Bewertungsachse
Der Nutzer verlangte, das Ergebnis so zu fassen, dass ein anderes LLM ein Peer-Review durchführen könne. Anschließend schränkte er die Bewertungsachsen ein: Sicherheit und Performance seien nur für die fertige Ghost-Produktion relevant; Zukunftsfähigkeit sei als Frage „Wie kommt man vom Harness in die produktive Website, wie viele Klimmzüge sind nötig" zu verstehen. Daraufhin wurde ein Peer-Review-Dokument (v1) erstellt, das auf diese Achse umgestellt war, die drei Varianten datei-verankert (F1–F8) bewertete und Variante 1 empfahl. Das Dokument wurde unter `Archiv/local/muss noch eingeordnet werden/` abgelegt.

### Externe Reviews und Korrektur
Der Nutzer fügte zwei fremde Peer-Reviews als Material ein (Review A: Bestätigung von F1–F8, zwei Zusatzbefunde; Review B: Urteil GELB mit mehreren Korrekturen) und fragte nach Konsens, wertvollen Einzelmeinungen und einem daraus abgeleiteten besseren Produkt. Der Steuerungsfaden prüfte die Neubehauptungen von Review B gegen die realen Dateien, bevor er sie übernahm.

## Wendepunkte
- Der Wechsel von Host-Suchwerkzeugen zu gezielten Shell-Zugriffen, ausgelöst durch wiederholte Timeouts auf dem Netzlaufwerk, veränderte die gesamte Erhebungsweise der Anamnese.
- Die Einschränkung der Bewertungsachsen durch den Nutzer (Sicherheit/Performance nur produktiv; Zukunftsfähigkeit = Weg Harness→Produktion) verschob die Analyse von einer allgemeinen Abwägung auf die Migrationsachse.
- Die Einspeisung von Review B verschob den Arbeitsstand vom Dokument v1 (Empfehlung samt Produktionsannahme und Alias-Fix) zur korrigierten Synthese v2.

## Entscheidungen und Festlegungen
- Variante 1 (dedizierte `fonts.css`) als bevorzugter Weg · früh nach der Variantenabwägung · begründet mit Trennung des Font-Ladens von Werte-Tokens und Komponenten-CSS · Status: gültig, in v2 bestätigt.
- Preload und Subsetting nicht in den Font-AP aufnehmen, sondern als eigene Backlog-Einträge · bei der ersten Abwägung · Status: offen (vorgeschlagen).
- Bewertungsachsen laut Nutzer: Sicherheit/Performance nur produktiv, Zukunftsfähigkeit = Migrationsweg · Status: gültig, in v1 und v2 übernommen.
- Empfehlung, die hartcodierten Font-Stellen in `screen.css` und `FwTheme.js` nicht im selben AP, sondern getrennt zu migrieren · in v2 · Status: offen, Nutzerentscheidung ausstehend.

## Irrwege, Schleifen und verworfene Ansätze
- Host-Suchwerkzeuge (Glob) und rekursive `grep`-Läufe über den Gesamtbaum wurden versucht, wegen Timeouts auf dem Netzlaufwerk verworfen und durch eng begrenzte Shell-Zugriffe ersetzt.
- Im Dokument v1 wurde angenommen, die Ghost-Produktion sei durch das bereits vorhandene `screen.css` schon abgedeckt. Review B machte sichtbar, dass kein Ghost-`.hbs`-Template und keine Auslieferungskette existierte; die Prüfung `find Theme -iname '*.hbs'` blieb leer. Die Annahme wurde verworfen; die Aussagen „null Drift/null Klimmzüge" wurden in v2 als Zielbild statt Gegenwart umformuliert.
- Im Dokument v1 wurde als Bridge-Fix ein Alias `--fw-font-base: var(--font-body)` vorgeschlagen. Der Kontrakt (§3) verbietet den Namensraum `--fw-font-*`. Der Ansatz wurde verworfen und durch die direkte Ablösung `font-family: var(--font-body, …)` mit Entfernung von `--fw-font-base` ersetzt.
- Das in v1 gegen Variante 2 vorgebrachte Argument einer JS-/Parser-Störung wurde verworfen: `FwTheme.init()` liest fertige Custom Properties über `getComputedStyle()` und parst `tokens.css` nicht als Datei. Die Ablehnung von Variante 2 wurde auf das Concern-Argument (Vermischung von Asset-Bereitstellung und Werte-Tokens) umgestellt.
- Die Annahme in v1, die Font-Bridge betreffe nur `app.css`, wurde verworfen: `FwChartTextPlugin.js` (Z. 95) codierte `sans-serif` hart und bot kein Family-Feld; der Kontrakt (Z. 251) koppelte diese Canvas-Bridge bereits an die Rubikon-Nachmessung.

## Erzeugte Artefakte
- `PEER-REVIEW_fontface-bereitstellung-harness-zu-ghost_2026-07-10.md` – peer-review-fähige Entscheidungsvorlage v1 – Status: ersetzt durch v2, als Trail erhalten.
- `ENTSCHEIDUNGSSYNTHESE-v2_fontface-und-font-bridge_2026-07-10.md` – korrigierte Synthese der drei Analysen mit umsetzungsreifem AP-Scope und offener Governance-Frage – Status: final für diesen Fadenstand, Umsetzung nicht freigegeben.
- Aufgabenliste zur Anamnese und Synthese – Arbeitswerkzeug – Status: abgeschlossen.

## Sachliche Erkenntnisse
- Gesicherter Stand (datei-verifiziert): `@font-face` aktiv nur in `screen.css`; `--fw-font-base` undefiniert; `FwChartTextPlugin.js:95` hart `sans-serif` ohne Family-Feld; `FwTheme.js:57` hält Fonts hart und liest nur `--color-*`, nicht `--font-*`; `screen.css` nutzt hartcodierte Familiennamen (Z. 79/101/109/160/209); kein Ghost-`.hbs` im Repo; Kontrakt §2/§3 definiert `--fw-*` als App-Mechanik und verbietet `--fw-font-*`; Kontrakt Z. 251 koppelt die Canvas-Font-Bridge an die Rubikon-Nachmessung; Diagnose-Tool `tools/rubikon-symbol-markers-diagnose.js` vorhanden.
- Arbeitsannahme: Variante 1 bleibt die bevorzugte Lösung; Variante 2 unterlegen aus Concern-Gründen; Variante 3 wegen Verlust der Harness-Isolation ausgeschlossen.
- Spätere Korrektur: Aussage in F3 (v1), der Header von `tokens.css` sage „kein @font-face", war zu stark; der genaue Wortlaut steht dort nicht.
- Offene Frage: ob ein künftiges Ghost-Template `fonts.css`/`screen.css` tatsächlich lädt, ist erst mit TMPL-1 prüfbar.

## Offene Punkte am Ende
- Nutzerentscheidung zur Governance-Frage (§7 der Synthese): hartcodierte Font-Stellen in `screen.css` und `FwTheme.js` im selben AP migrieren oder als eigener Engine-Härtungs-AP.
- Der selbsttragende Startprompt für den Font-Mini-AP war noch nicht geschnitten.
- Backlog-Entkopplung von `AP-prokrast-17-FOLLOWUP-FONT`/`DS-FOLLOWUP-07` von DS-012/DS-013 stand als Vorschlag aus.
- `@font-face`-Exklusivität nur über den App-/Theme-Stack geprüft, nicht repo-weit.
- Vorgeschlagene neue Backlog-Einträge (`DS-FONT-PRELOAD`, `DS-FONT-SUBSET`, `DS-FONT-TOKEN-SSOT`) waren nicht angelegt.

## Analysefähige Rohmuster
Für spätere Musteranalyse vormerken: Umstellung der Werkzeugwahl nach wiederholten Timeouts auf einem Netzlaufwerk; Umformung einer Auswahlfrage durch den Nutzer in einen Abwägungsauftrag; Präzisierung der Bewertungsachsen durch den Nutzer nach Vorlage eines ersten Ergebnisses; Korrektur mehrerer Behauptungen eines eigenen Dokuments durch Datei-Verifikation externer Reviews; Trennung von Entscheidung (Variantenwahl) und Umsetzungsumfang (AP-Scope).

## Bewusst ausgelassen
Weggelassen wurden: Werkzeug- und Pfad-Bediendetails ohne Wirkung, wiederholte Timeout-Meldungen über die erste Nennung hinaus, vollständige Datei-Inhalte und Hexwerte-Listen der Token-Datei, die vollständigen Fließtexte der beiden externen Reviews (als Material referenziert), reine Fortschritts- und Statusaktualisierungen der Aufgabenliste.
