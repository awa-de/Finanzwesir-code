---
chronik_id: CHRONIK-2026-07-07-ap-prokrast-14-ci-theme-bridge-ruecklauf
datum: 2026-07-07
projekt: prokrastinationspreis-app
thema: ap-prokrast-14-ci-theme-bridge
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, durchbruch, externe-abhaengigkeit, konzept-vs-umsetzung, vollstaendigkeit-vs-verdichtung, abbruchregel, annahme-verworfen]
---

# Chronik: AP-prokrast-14 — CI-/Theme-Bridge, Zielkontrakt und Master-Rücklauf

**Hauptgegenstand:** In diesem Faden wurde AP-prokrast-14 als Nebenfaden für die Prokrastinationspreis-App bearbeitet. Der Faden erzeugte keine Implementierung, sondern eine Anamnese, ein Review-Gate, eine Zielkontrakt-Analyse und eine Rücklaufkapsel an den Masterfaden. Am Ende wurde AP-14 als GELB, aber abgenommen und master-rückgabebereit eingeordnet.

## Ausgangslage

Der Nutzer führte den Faden als Steuerungsarbeit für AP-prokrast-14. AP-14 sollte nicht als Code-AP verstanden werden, sondern als CI-/Theme-Bridge-Anamnese und Zielkontrakt-Vorbereitung. Der Masterfaden sollte später weitreichende Entscheidungen treffen können; der Nebenfaden sollte dafür Befunde und eine belastbare Übergabe vorbereiten. Aus früheren APs standen Produktentscheidungen zur Prokrastinationspreis-App fest: Screen 2, Screen 3, Screen 4, Card-to-Point, RubikonSymbolMarkers und die Nichtverwendung von Zukunftsdaten sollten nicht neu geöffnet werden.

## Chronologischer Verlauf

### Start mit AP-14a als Inventar-Anamnese

Zunächst wurde aus dem AP-14-Fachprompt und dem taktischen Startprompt ein Startprompt für AP-prokrast-14a erstellt. Der Auftrag lautete, die vorhandenen CI-/Theme-/Token-/Font-/Tailwind-/Ghost-Strukturen im Repo zu inventarisieren, ohne Implementierung. Dabei wurde besonders betont, dass AP-14 ein Chef-AP sei: Das ausführende Unter-LLM sollte nicht mikrogemanagt werden, aber die richtigen Befunde liefern.

AP-14a kam mit Status GRÜN zurück. Der zentrale Befund lautete: Die Architekturentscheidung A-04 fordere, dass Apps dieselbe CSS-Variablen-Theme-Bridge wie die Chart-Engine nutzen; im real gebauten App-Code `Apps/prokrastinations-preis/app.css` sei dies jedoch nicht umgesetzt. Stattdessen nutze die App eigene `--fw-*`-Tokens, die nach AP-14a nicht zentral gesetzt seien.

### Review-Gate AP-14aR

ChatGPT schlug vor, AP-14a nicht sofort als Fundament für AP-14b zu verwenden, sondern ein unabhängiges Claims-vs-Files-Review einzuschieben. Grund war die wiederholt geltende Arbeitsregel: Die Wahrheit ist die reale Datei, nicht das Ergebnisprotokoll.

Daraufhin wurde AP-prokrast-14aR geschnitten. Der Prompt prüfte zwölf Claims gegen reale Dateien, darunter A-04, `screen.css`, `FwTheme.js`, `app.css`, Tailwind, Ghost-Templates, App-Struktur, `FwChartTextPlugin.js` und Breakpoints. Der Nutzer wies darauf hin, dass Tokenökonomie nicht mit Abkürzung verwechselt werden dürfe. Der Prompt wurde daraufhin überarbeitet: Er blieb gründlich, priorisierte aber Fundament-Claims und Kontext-Claims, und regelte die Arbeitsteilung zwischen Python/Grep, optional Haiku und Sonnet.

AP-14aR kam mit Status GRÜN zurück. Der Kernbefund von AP-14a wurde bestätigt, aber präzisiert: Von 17 `--fw-*`-Tokens waren 11 CI-semantisch und ungebridged; 6 Timing-/Positionierungs-Tokens funktionierten bewusst lokal. Außerdem zeigte AP-14aR, dass drei weitere App-Ordner (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) keine leeren Spec-Stände waren, sondern Standalone-HTML-Prototypen enthielten.

### AP-14b als Entscheidungsvorbereitung

Nach AP-14aR wurde AP-prokrast-14b als Zielkontrakt-/Architektur-Analyse gebaut. Der Nutzer verlangte erneut den Ansatz „Sonnet, wo nötig; sparen, wo möglich“. Der AP wurde deshalb als Entscheidungs-AP aufgebaut: Python/Grep sollte Fundstellen, Struktur und Belege liefern; Haiku blieb optional für lange Spezifikationen; Sonnet verantwortete Variantenbewertung, Risikoabwägung und Master-Empfehlung.

AP-14b kam mit Status GRÜN zurück. Der Faden prüfte zunächst nur die Kurzfassung und hielt ein mögliches Mini-Review AP-14bQ für denkbar. Nachdem der Nutzer die vollständige AP-14b-Ergebnisdatei nachreichte, wurde diese Einschätzung korrigiert: Ein weiteres Review wurde nicht mehr für nötig gehalten.

AP-14b brachte einen neuen Kernbefund: `screen.css` enthielt Marken-Tokens wie petrol, blau, purpur und gelb sowie Neutralfarben; `app.css` benötigte aber Rollen-Tokens wie `primary`, `surface` und `error-*`. Deshalb wäre eine reine Umbenennung von `--fw-*` nach `--color-*` zu naiv. Die empfohlene Variante wurde C: CI-semantische Tokens zentral/shared, App-Mechanik lokal. Variante B, ein `--fw-*`-Alias-Layer in `screen.css`, wurde verworfen, weil sie der bestehenden Namensraum-Regel widersprochen hätte. Spacing wurde als eigene Grundsatzfrage markiert, da projektweit kein `--space-*`-System existierte.

### AP-14c als Rücklaufkapsel ohne Glättung

Der Nutzer bestand darauf, dass die Rücklaufkapsel an den Masterfaden nicht geglättet werden dürfe. Verdichtung sei nötig, aber nicht in der Form von Unternehmensberichten, in denen Risiken nach oben verschwinden. AP-14c sollte besonders Problemfelder, Edge-Cases und offene Entscheidungen sichtbar halten.

Daraufhin wurde AP-prokrast-14c als Übergabe-Prompt erstellt. Die zentrale Anweisung lautete: „Verdichten ja. Glätten nein.“ AP-14c sollte keine neue Analyse beginnen, sondern AP-14a, AP-14aR und AP-14b in eine Master-taugliche, problemhaltige Rücklaufkapsel überführen. Als erwarteter Gesamtstatus wurde GELB nahegelegt: Die Unter-APs waren operativ GRÜN, aber AP-15 durfte nicht ohne Masterentscheidungen starten.

AP-14c kam mit Status GELB und Abnahme ja zurück. Die wichtigste Botschaft lautete: AP-14 habe Entscheidungsreife erzeugt, keine Implementierungsfreigabe. Vor AP-15 brauche es insbesondere die Bestätigung von Variante C, die Primary-Rollenzuordnung und die Error-Farbfamilie. Surface wurde schwächer priorisiert und konnte notfalls im AP-15-Gate mitentschieden werden.

### Formale Nachprüfung der Rücklaufkapsel

ChatGPT prüfte die zunächst hochgeladene Rücklaufkapsel und sah im Abschnitt „Wiederlesen / Datei-Wahrheit“ noch offene Platzhalter. Der Nutzer meldete anschließend, Claude habe lokal festgestellt, dass die aktuelle Repo-Datei bereits vollständig ausgefüllt gewesen sei. ChatGPT erklärte die Abweichung als Unterschied zwischen hochgeladenem Snapshot und aktueller Repo-Datei.

Der Nutzer lud danach die aktuelle Rücklaufkapsel erneut hoch. Diese Version enthielt den finalen Abschnitt „Wiederlesen / Datei-Wahrheit“ mit `git diff --name-status`, erlaubtem Write-Scope und „Abweichungen: keine“. ChatGPT prüfte die Datei erneut und bewertete sie als formal und inhaltlich verwendbar. Es wurden nur zwei kleine Tippfehler genannt: `CSS-KONVENTIENEN.md` statt `CSS-KONVENTIONEN.md` sowie „lossaufen“ statt „loslaufen“. Der Nutzer meldete später, alles sei erledigt; Claude werde AP-14 in GitHub committen. Damit wurde der Nebenfaden geschlossen.

## Wendepunkte

Ein erster Wendepunkt war die Entscheidung, AP-14a nicht direkt als Fundament zu verwenden, sondern AP-14aR als unabhängiges Claims-vs-Files-Review einzuschieben. Dadurch wurde aus einer plausiblen Anamnese ein belegtes Fundament.

Ein zweiter Wendepunkt entstand durch AP-14aR: `--fw-*` wurde nicht mehr pauschal als Fehler behandelt. Die Unterscheidung zwischen CI-semantischen Tokens und funktionierenden App-Mechanik-Tokens prägte alle weiteren APs.

Ein dritter Wendepunkt war AP-14b: Die Lücke wurde nicht mehr nur als Namensraum- oder Aliasproblem verstanden, sondern als Rollen-Token-Problem. Damit wurde sichtbar, dass AP-15 echte Masterentscheidungen zu Farben braucht.

Ein vierter Wendepunkt war die bewusste Statusentscheidung für AP-14c: Die Kapsel sollte trotz operativ grüner Unter-APs insgesamt GELB melden, um Entscheidungsbedarf und fehlende Implementierungsfreigabe sichtbar zu halten.

## Entscheidungen und Festlegungen

- AP-14 wurde als Anamnese-/Zielkontrakt-AP geführt, nicht als Code-AP. Status am Ende: gültig.
- AP-14aR wurde als Review-Gate eingeschoben, bevor AP-14b auf AP-14a aufsetzte. Status am Ende: gültig.
- Tokenökonomie wurde als intelligente Reihenfolge verstanden, nicht als Abkürzung: Python/Grep für Deterministik, Haiku optional, Sonnet für Verantwortung. Status am Ende: gültig.
- Variante C wurde als Zielkontrakt empfohlen: CI-semantische Tokens zentral, App-Mechanik lokal. Status am Ende: gültig, aber vom Master zu bestätigen.
- AP-14c setzte den Masterstatus GELB, obwohl AP-14a, AP-14aR und AP-14b jeweils GRÜN waren. Status am Ende: gültig.
- AP-15 durfte nicht ohne Primary-Rollenzuordnung, Error-Farbfamilie und Bestätigung von Variante C starten. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Die zunächst naheliegende Fortsetzung von AP-14a zu AP-14b ohne Review wurde verworfen. Die Schleife führte zur harten Bestätigung des Fundaments durch AP-14aR.

Eine zweite verworfene Linie war die Annahme, eine `--fw-*`→`--color-*`-Migration sei hauptsächlich eine technische Umbenennung. AP-14b ersetzte diese Annahme durch den Befund, dass Rollen-Tokens fehlen.

Variante B, ein `--fw-*`-Alias-Layer in `screen.css`, wurde erwogen und verworfen. Grund war der Konflikt mit der bestehenden Namensraum-Regel und das Risiko, einen zweiten offiziellen CI-Namensraum zu etablieren.

Ein AP-14bQ-Mini-Review wurde erwogen, solange nur die Kurzfassung von AP-14b vorlag. Nach Sichtung der vollständigen AP-14b-Ergebnisdatei wurde dieser zusätzliche Review nicht weiterverfolgt.

Bei AP-14c entstand eine kurze formale Schleife um den Abschnitt „Wiederlesen / Datei-Wahrheit“. Der zunächst gesehene hochgeladene Stand enthielt Platzhalter; die später hochgeladene aktuelle Datei war vollständig.

## Erzeugte Artefakte

- `claude_prompt_AP-prokrast-14a_ci-theme-bridge_inventar-anamnese.md` – Startprompt für die Inventar-Anamnese – final.
- `AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md` – Ergebnis der Inventar-Anamnese – Grundlage.
- `claude_prompt_AP-prokrast-14aR_claims-vs-files-review.md` und V2 – Review-Prompt – final/ersetzt durch geschärfte Fassung.
- `AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md` – Review-Ergebnis – Grundlage.
- `claude_prompt_AP-prokrast-14b_ci-theme-bridge_zielkontrakt-analyse.md` – Entscheidungs-AP-Prompt – final.
- `AP-prokrast-14b_ci-theme-bridge_zielkontrakt-analyse_Ergebnis.md` – Zielkontrakt-/Architektur-Analyse – Grundlage.
- `claude_prompt_AP-prokrast-14c_ruecklaufkapsel_master.md` – Rücklaufkapsel-Prompt – final.
- `AP-prokrast-14c_ruecklaufkapsel_master_Ergebnis.md` – Master-Rücklaufkapsel – final, nach Tippfehler-Fix und Commit durch Claude.

## Sachliche Erkenntnisse

Gesicherter Stand: A-04 ist als Architekturentscheidung vorhanden. Apps sollen dieselbe CSS-Variablen-Theme-Bridge wie die Chart-Engine nutzen.

Gesicherter Stand: Die reale Prokrastinationspreis-App nutzt CI-semantische `--fw-*`-Tokens, die nicht zentral definiert sind. Die App rendert dort mit Fallback-Werten.

Gesicherter Stand: Nicht alle `--fw-*`-Tokens sind CI-Lücken. Timing- und Positionierungsvariablen funktionieren app-lokal und sollen nicht pauschal migriert werden.

Gesicherter Stand: `screen.css` enthält Marken-Tokens, aber nicht alle benötigten Rollen-Tokens. AP-15 braucht daher Designentscheidungen zu Primary und Error.

Arbeitsannahme am Ende: Spacing bleibt vorerst app-lokal, weil kein zentrales `--space-*`-System existiert.

Offene Frage: Ob und wann `FwChartTextPlugin.js` an den Theme-Font-Kontrakt angeschlossen wird, blieb als Folge-Mini-AP markiert.

Offene Frage: Die reale Ghost-Live-Auslieferung von `screen.css` auf App-Seiten blieb repo-seitig nicht verifizierbar.

## Offene Punkte am Ende

Vor AP-15 blieben Masterentscheidungen nötig: Bestätigung von Variante C, Festlegung der Primary-Rolle und Festlegung der Error-Farbfamilie. Surface war schwächer priorisiert und konnte im AP-15-Gate entschieden werden.

Spacing blieb bewusst aus AP-15 ausgeklammert. Eine spätere projektweite Spacing-Tokenisierung blieb offen.

Die drei Standalone-Prototypen wurden als existent, aber nicht Teil von AP-15 markiert.

`FwChartTextPlugin.js` und RubikonSymbolMarkers-Neumessung blieben Folge-Thema.

Eine leichte Ghost-Live-Stichprobe wurde als Begleitmaßnahme zu AP-15 vorgesehen, nicht als Vollaudit.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden trennte mehrfach zwischen operativem GRÜN und entscheidungsseitigem GELB.

Für spätere Musteranalyse vormerken: Ein Review-Gate nach einer plausiblen Analyse veränderte die Qualität des Fundaments und verhinderte pauschale Ableitungen.

Für spätere Musteranalyse vormerken: Tokenökonomie wurde nicht als Sparzwang, sondern als Reihenfolge- und Zuständigkeitsprinzip genutzt.

Für spätere Musteranalyse vormerken: Eine vermeintlich technische Migration enthielt eine verdeckte Designentscheidung, die erst durch Rollen-/Marken-Token-Unterscheidung sichtbar wurde.

Für spätere Musteranalyse vormerken: Der Nutzer intervenierte gegen geglättete Management-Kommunikation und verlangte eine problemhaltige Rücklaufkapsel.

## Bewusst ausgelassen

Ausgelassen wurden reine Bedienhinweise, wiederholte Download-Link-Anfragen, vollständige Prompt-Wiederholungen, Tippfehlerdiskussionen ohne sachliche Wirkung außer den zwei finalen Korrekturen, sowie lange Tabelleninhalte, soweit sie in den Ergebnisdateien dokumentiert waren und für die Rekonstruktion des Arbeitsverlaufs nicht vollständig wiedergegeben werden mussten.
