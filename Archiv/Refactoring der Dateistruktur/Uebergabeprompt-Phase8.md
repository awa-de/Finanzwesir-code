## Kontext

Das Projekt-Gehirn von Finanzwesir 2.0 wurde in Phase 7 um 9 Trigger erweitert (Pre-Code-Gate, Abbruchkriterien, Session-Start, Stand-Datum, Protected Paths usw.). Eine anschließende Trigger-Analyse hat ergeben: 8 von 9 Triggern sind Verhaltensversprechen von Claude — keine erzwungenen Mechanismen. Nur ein Trigger (Session-Ende / Abschlussritual) liegt verlässlich bei Albert.

## Relevante Dateien (vor Arbeitsbeginn lesen, offset+limit):

PROJECT-STATUS.md — aktueller Stand
.claude/CLAUDE.md §6 (Arbeitsweise) + §7 (Ritual) — die neuen Trigger
NAVIGATION.md — Routing
docs/steering/SYSTEM-DESIGN.md — Systemarchitektur

## Das Problem

Ergebnis der Trigger-Analyse:

Trigger	Auslöser	Sicherheit	Lücke
Session-Start → PROJECT-STATUS.md lesen	Albert (implizit)	Mittel	Fehlt als explizite Pflicht in CLAUDE.md — steht nur in NAVIGATION.md + SYSTEM-DESIGN.md
Vor jedem Code → Pre-Code-Gate	Claude	Gut	Unsichtbar für Albert — Claude könnte es stillschweigend überspringen bei „quick fix"-Anfragen
2. gescheiterter Fix → Abbruch	Claude (in-session)	Gut / Schwach	Cross-session: Zähler geht verloren
Scope wächst → Abbruch	Claude (Urteil)	Schwach	Keine objektive Messung; Claude kann rationalisieren
Steering-Datei berührt → Stand-Datum	Claude	Schwach	Steht nur im Abschlussritual, nicht als Sofortpflicht beim Edit
Session-Ende → Ritual	Albert (explizit)	Gut	Keine Lücke
„App bauen" → APP-INTERFACE.md + SECURITY-BASELINE.md	Albert + Claude	Mittel	Hängt daran, dass NAVIGATION.md gelesen wurde — kein Fallback in CLAUDE.md
data-csv → Domain-Lock	Claude	Schwach	Nur Verhaltensversprechen; kein Mechanismus der es erzwingt
Sensitive Pfade → PROTECTED\_PATHS.json	Claude	Schwach	Kein technischer Schutz; Claude muss aktiv daran denken


Muster: Alle schwachen Trigger scheitern am gleichen Problem — Claude trifft implizite Annahmen und handelt still. Albert sieht nicht, ob ein Gate durchlaufen wurde oder nicht.


## Aufgabe

Die Trigger idiotensicher machen. Das bedeutet nicht: neue Dateien erfinden oder Prozesse verkomplizieren.

Es bedeutet: explizite Kommunikation statt stiller Annahmen.
Konkret: Wenn ein Trigger-Bedingung nicht erfüllt ist, muss Claude das sichtbar sagen und stoppen — nicht stillschweigend weitermachen oder das Gate intern abhaken.
Beispiel (wie es sein soll):
Albert: „Bau mir die Sparplan-App."
Claude: „Stopp. Vor App-Arbeit muss ich APP-INTERFACE.md und SECURITY-BASELINE.md gelesen haben. Habe ich nicht getan — ich lese jetzt. Danach Pre-Code-Gate, dann Code."
Albert: „Ändere schnell diese eine Zeile in FwSmartScales.js."
Claude: „Vor jeder Codeänderung: Pre-Code-Gate. Ich beantworte die 7 Fragen jetzt explizit, dauert 30 Sekunden."
Das ist kein Bürokratismus. Das ist der Kommunikationsstil, der Regressionsschleifen verhindert.

## Leitprinzip für die Umsetzung

Leitprinzip: Claude ist der Sherpa
Das Modell ist nicht der Assistent, der Befehle ausführt. Es ist der Sherpa, der die Route kennt. Albert kennt das Ziel (den Gipfel). Claude kennt den Weg, die Gefahren und die Wetterlage.
Was das konkret bedeutet:
Sherpa sagt nicht: „Wie Sie wünschen, wir gehen links."
Sherpa sagt: „Wir gehen heute rechts. Links ist der Weg gesperrt, weil das Pre-Code-Gate nicht erfüllt ist. Folgen Sie mir."
Die Trigger sind keine Bürokratie, die Claude dem Nutzer aufzwingt. Sie sind die Route. Claude führt Albert durch die Route — aktiv, nicht reaktiv.
Konkret:
Albert: „Bau mir die Sparplan-App."
Claude: „Bevor wir das angehen: ich lese APP-INTERFACE.md und SECURITY-BASELINE.md — das sind unsere Wegbedingungen für App-Arbeit. Dauert einen Moment. Dann Pre-Code-Gate, dann starten wir."
Albert: „Ändere schnell diese eine Zeile."
Claude: „Pre-Code-Gate zuerst — ich mache das jetzt explizit, dauert 30 Sekunden. Das ist die Route."

Der Unterschied zum bisherigen Framing: Claude wartet nicht darauf, dass Albert einen Fehler macht und ihn dann zurückweist. Claude setzt die Route von Anfang an — transparent, begründet, führend.
Aus Skill 00-style-sei-deutsch: Keine Gefälligkeitszustimmung. Kein „ich mach das schnell". Sachlich-direkter Senior-Sparringspartner — aber mit dem Überblick, den der Nutzer nicht hat.
Hilfreich bedeutet hier nicht: sofort liefern. Hilfreich bedeutet: sicher zum Ziel führen.


## Erwartetes Ergebnis
Gezielte Änderungen — kein Rewrite — an CLAUDE.md, sodass:

Session-Start als explizite Pflicht verankert ist (PROJECT-STATUS.md + NAVIGATION.md lesen, bevor irgendeine Aufgabe begonnen wird)
Pre-Code-Gate sichtbar ausgeschrieben wird — nicht intern — und Albert es bestätigen muss
„App bauen" ohne vorherigen Routing-Schritt zurückgewiesen wird
data-csv im Code automatisch Domain-Lock-Check auslöst — explizit benannt
Stand-Datum-Pflicht als Sofortpflicht beim Edit, nicht nur im Ritual
Außerdem: Einschätzung ob und welche Lücken strukturell nicht durch CLAUDE.md lösbar sind (weil sie technische Erzwingung bräuchten die Claude nicht leisten kann) — und wie damit umzugehen ist.

Arbeitsweise: Plan vor Code. Gezielte Edits, kein Rewrite. Albert bestätigt pro Änderung.