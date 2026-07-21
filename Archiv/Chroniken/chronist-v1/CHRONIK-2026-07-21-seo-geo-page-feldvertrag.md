---
chronik_id: CHRONIK-2026-07-21-seo-geo-page-feldvertrag
datum: 2026-07-21
projekt: finanzwesir
thema: seo-geo-page-feldvertrag
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [sackgasse, durchbruch, annahme-verworfen, tooling-problem, externe-abhaengigkeit]
---

# Chronik: SEO/GEO-Page-Feldvertrag — Audit, Theme-Umsetzung und Tag-Erkennungs-Debugging (GHOST-02 bis GHOST-04)

**Hauptgegenstand:** Der verbindliche SEO/GEO-Feldvertrag für Ghost Pages wurde zunächst gegen den bestehenden Theme-Code geprüft (GHOST-02), dann im Theme umgesetzt (GHOST-03) und anschließend in einer lokalen Ghost-Instanz unter Windows über mehrere Korrekturrunden verifiziert (GHOST-04), bis alle geforderten Tag-Kombinationen im Browser-Rendering bestätigt waren.

## Ausgangslage

Albert übergab nacheinander drei vorbereitete Prompt-Dateien aus `Archiv/local/muss noch eingeordnet werden/` (GHOST-02, GHOST-03, GHOST-04) mit der Anweisung, sie vollständig zu lesen und exakt auszuführen. Grundlage war `docs/editorial/SEO-GEO-PAGE-FELDVERTRAG.md` (Version 1.0.0, Stand 2026-07-21), das native Ghost-Page-Felder, interne Steuer-Tags (`#seo-noindex`, `#seo-nosnippet`, genau ein `#schema-*`-Tag) und automatisch abgeleitete JSON-LD-Daten für Ghost Pages festlegt. Vor diesem Faden lief eine Session-Start-Sequenz (Dienstag, kein Kassensturz fällig, kein Warm-Start-Signal, Vollmodus mangels eindeutigem Kettenmodus-Hinweis).

## Chronologischer Verlauf

### GHOST-02 — Soll/Ist-Befund
Nach Session-Start wurde GHOST-02 gelesen und ausgeführt: ein reiner Befundauftrag ohne Codeänderung. Gelesen wurden der Feldvertrag, `Theme/default.hbs`, `Theme/page.hbs`, `Theme/package.json` sowie mehrere `docs/editorial`-Dateien. Eine Grep-Suche über `Theme/` nach den im Auftrag genannten Ankern (`ghost_head`, `meta_title`, `#seo-`, `#schema-` u. a.) ergab Treffer nur in `default.hbs`, `post.hbs` und `author.hbs`. Der Befund wurde nach `Archiv/local/muss noch eingeordnet werden/GHOST-02_SEO-GEO-PAGE-FELDVERTRAG_SOLL-IST-BEFUND.md` geschrieben, Status ROT: `page.hbs` enthielt keine Tag-gesteuerte Schema-Auswahl und keine Ableitungslogik; die einzige geerbte JSON-LD war eine statische, hierarchielose `BreadcrumbList` in `default.hbs`.

Albert fragte, ob `page.hbs` überhaupt gelesen worden sei — er vermutete, versehentlich Leserechte blockiert zu haben. Bestätigt wurde, dass `page.hbs` im ersten Lese-Batch ohne Blockade gelesen worden war; blockiert waren andere, für den Auftrag nicht ankerrelevante Dateien (`header.hbs`, `footer.hbs`, `index.hbs`, `tag.hbs`, `error.hbs`). Auf Alberts Bitte wurden diese fünf Dateien nachträglich gelesen; sie enthielten keinen der gesuchten Anker, der Befund blieb unverändert.

Auf Alberts Anweisung wurde festgelegt, dass Ergebnisdateien ab der folgenden Runde nach `docs/steering/patches/` statt nach `Archiv/local/` geschrieben werden; die bereits geschriebene GHOST-02-Datei blieb an ihrem Ort.

### GHOST-03 — Theme-Umsetzung
GHOST-03 (Klasse B, Theme-Umsetzungsauftrag) wurde gelesen. Da mehrere Dateien (`default.hbs`, `page.hbs`) betroffen waren, wurde das Full-Gate über den Skill `pre-code-gate` durchlaufen; die neun Gate-Fragen wurden beantwortet, als stärkster Gegengrund wurde benannt, dass ein realer Browser-Rendering-Nachweis in dieser Session nicht erbringbar sei. Albert gab „ok, setze um".

Umgesetzt wurde: in `default.hbs` ein benannter Head-Slot (zunächst `{{block "head"}}`, die statische `BreadcrumbList` entfernt); in `page.hbs` ein `{{#contentFor "head"}}`-Block mit verschachtelten `{{#has tag="hash-..."}}`-Prüfungen für `#seo-noindex`/`#seo-nosnippet` sowie fünf Schema-Profile (Article, AboutPage, ContactPage, ProfilePage, CollectionPage) mit WebPage als Default, jeweils mit abgeleiteten JSON-LD-Feldern (headline/name, url, mainEntityOfPage, Daten, inLanguage, publisher inkl. optionalem logo und sameAs, description-Fallback, image, author). Der Umsetzungsbefund wurde nach `docs/steering/patches/GHOST-03_..._UMSETZUNGSBEFUND.md` geschrieben, Status GELB, mit zwei benannten Restpunkten: einem ungeprüften Duplikat-Risiko bei Title/Description/Canonical und der unverifizierten Annahme, interne Ghost-Tags seien über die Slug-Form „hash-\<name\>" ansprechbar.

### GHOST-04 — Windows-Full-Gate, Build und Browser-Verifikation
GHOST-04 wurde gelesen, zusammen mit `docs/steering/theme-build/GHOST-LOKALBETRIEB.md`, das eine lokale Ghost-6-Entwicklungsinstanz unter `C:\Tools\ghost-local` (`localhost:2368`) beschreibt. Festgestellt wurde, dass in dieser Session kein Werkzeug für Browser-/Ghost-Admin-Interaktion zur Verfügung stand und dass das einzige Kommandozeilenwerkzeug als Git Bash dokumentiert ist, während der Auftrag ausschließlich PowerShell vorschrieb. Der GHOST-04-Auftrag sah für diesen Fall vor, Status ROT zu melden statt eine Ersatzumgebung zu erfinden; entsprechend wurde zunächst ein Abschlussbericht mit Status ROT geschrieben und Albert gefragt, ob wenigstens der Build-Schritt versucht werden solle.

Albert wies an: „Du baust, legst das ZIP einfach ab ... ich mache den Rest." Darauf wurde `npm run css:build` über Git Bash ausgeführt und das Theme mit einem aus Git Bash gestarteten `powershell.exe`-Unterprozess (`Compress-Archive`) zu `Theme/finanzwesir-local-theme.zip` gepackt; die ZIP-Wurzel wurde geprüft (92 Einträge, kein `src/`, `.git/`, `.claude/`). Albert lud das ZIP im lokalen Ghost-Backend hoch und aktivierte es manuell — Upload und Browser-Prüfung liefen fortan über Albert.

Albert legte fest, Fehlerberichte gesammelt einzureichen und erst auf „Jetzt fixen" zu reagieren. Aus dem Rendering von `/index-vergleich/` ergaben sich drei Befunde: das eigene JSON-LD erschien als sichtbarer, HTML-escapeter Text statt als ausführbares Script; die Canonical-Zeile war doppelt vorhanden (eine leere manuelle, eine reale aus `{{ghost_head}}`); das Feld `sameAs` enthielt die Werte `["@ghost","ghost"]` aus `@site.twitter`/`@site.facebook`, die sich als rohe Handles statt URLs erwiesen. Albert leitete danach die Übergabe ein („dann übernimmst Du"), ohne das vereinbarte Signalwort „Jetzt fixen" zu verwenden.

Als Ursache des Escaping-Fehlers wurde das fehlende dritte Klammernpaar bei `{{block "head"}}` identifiziert (korrigiert zu `{{{block "head"}}}`); die manuelle Canonical-Zeile in `default.hbs` wurde entfernt; die `sameAs`-Logik wurde aus allen sechs Schema-Zweigen in `page.hbs` entfernt. Nach jeder Korrektur wurden CSS-Build und ZIP-Paketierung wiederholt.

Die anschließende Prüfung von `/about/` und der Homepage zeigte den Escaping-Fehler und das Canonical-Duplikat als korrigiert. Auf der Homepage sowie an einer neu angelegten, vollständig befüllten Testseite (`test-page-1`) zeigte sich zusätzlich, dass auch die Meta-Description dupliziert wurde, sobald das Feld befüllt war (bei leerem Feld unauffällig, da `{{ghost_head}}` dann offenbar keine eigene Description-Zeile ausgab). Albert fragte, ob die Homepage noch einmal geprüft werden müsse; dies wurde verneint, da bereits vorher eingereicht.

Albert erklärte die Fehlersammlung für beendet und bat um den Abschlussbericht samt Übergabeinformation für das steuernde LLM. Der Bericht wurde mit Status GELB geschrieben (korrigierte Fehler benannt, Meta-Description-Dopplung und ungeprüfte Tag-Auswertung als offene Punkte). Albert wies zurück, dass ein Abschlussbericht bei noch offener Arbeit geschrieben worden war, und beauftragte die sofortige Korrektur der Description-Dopplung sowie eine Anleitung, wie interne Tags zum Testen der Schema-/Robots-Logik gesetzt werden. Die manuelle Description-Zeile in `default.hbs` wurde entfernt (analog zur Canonical-Korrektur); erläutert wurde, dass interne Tags über das normale Tags-Feld mit vorangestelltem `#` gesetzt werden.

Beim ersten Test mit dem Tag `#schema-about` zeigte die Body-Klasse den Wert `tag-hash-schema-about` (Bestätigung der Slug-Form für CSS-Zwecke), das JSON-LD blieb jedoch bei `WebPage`, kein Robots-Tag erschien. Ein zweiter Test mit allen sieben Tags gleichzeitig gesetzt (von Albert mit der Frage begleitet, ob das methodisch zulässig sei) zeigte dasselbe Bild flächendeckend: keiner der Tag-Checks griff. Als Hypothese wurde angenommen, der Ghost-eigene `{{#has}}`-Helfer verliere innerhalb von `{{#contentFor "head"}}` benötigten internen Kontext; `page.hbs` wurde entsprechend umstrukturiert, sodass `{{#has}}` direkt in `{{#post}}` liegt und `{{#contentFor}}` nur je Zweig aufgerufen wird. Auf Alberts Nachfrage, ob dies recherchiert oder geraten worden sei, wurde eingeräumt, dass es sich um eine introspektive Vermutung handle (Konfidenz ca. 40 %). Der erneute Test nach dieser Umstrukturierung zeigte keine Veränderung — weiterhin `WebPage`, kein Robots-Tag; die Hypothese wurde damit verworfen.

Parallel zur nächsten Nutzeranfrage („Beschreibe das Problem, damit ein anderes LLM helfen kann") wurde Ghosts offizielle Dokumentation zum `{{#has}}`-Helfer recherchiert. Zwei unabhängige Abrufe (eine WebSearch-Zusammenfassung, ein direkter Abruf der Dokumentationsseite `docs.ghost.org/themes/helpers/functional/has`) bestätigten übereinstimmend, mit dem wörtlichen Beispiel `{{#has tag="#link"}}`, dass interne Tags über ihren literalen Namen samt `#` geprüft werden, nicht über eine „hash-"-Slug-Form. Alle sieben `tag="hash-..."`-Ausdrücke in `page.hbs` wurden auf `tag="#..."` korrigiert.

Der folgende Test (About-Seite, weiterhin alle sieben Tags gesetzt) zeigte `"@type": "Article"` und ein kombiniertes Robots-Tag `noindex, nosnippet` — Article entsprach dabei der im Code hinterlegten Prüfreihenfolge (article vor about, contact, profile, collection), obwohl auch `#schema-about` gesetzt war. Albert bat um eine Reihenfolge zum systematischen Testen der übrigen Fälle; vorgeschlagen wurde, in sieben Schritten je einen Tag zu entfernen, sodass jeder Schritt genau einen neuen Fall offenlegt (AboutPage, ContactPage, ProfilePage, CollectionPage, WebPage-Default, alleiniges `noindex`, kein Robots-Tag). Albert führte alle sieben Schritte aus; jedes Ergebnis entsprach der Vorhersage. Der GHOST-04-Abschlussbericht wurde daraufhin mit Status GRÜN neu geschrieben, mit vollständiger Render-Nachweis-Tabelle über alle Iterationen einschließlich der verworfenen Zwischenhypothese, keine verbleibenden Blocker.

## Wendepunkte

- Der von Albert gemeldete Render von `/index-vergleich/` (HTML-escapeter Text im Head) verschob die Arbeit von reiner Umsetzung (GHOST-03) zu iterativem Debugging (GHOST-04).
- Alberts direkte Nachfrage „Rätst Du, oder hast Du recherchiert?" führte dazu, dass die zuvor nur introspektiv begründete Umstrukturierungs-Hypothese offengelegt und anschließend gegen die Ghost-Dokumentation geprüft wurde.
- Der negative Testausgang nach der Umstrukturierung (weiterhin `WebPage` trotz umgebauter Verschachtelung) verwarf die Nesting-Hypothese und lenkte die Suche auf die Tag-Matching-Syntax selbst um.
- Der Fund der offiziellen Ghost-Dokumentation zum `{{#has}}`-Helfer (Beispiel `{{#has tag="#link"}}`) identifizierte die tatsächliche Fehlerursache und beendete die Fehlersuche.

## Entscheidungen und Festlegungen

- Ablageort für Ergebnis-/Patchdateien auf `docs/steering/patches/` umgestellt — festgelegt während der GHOST-02-Nachbereitung, gültig ab GHOST-03.
- Full-Gate für GHOST-03 durchlaufen und von Albert mit „ok, setze um" freigegeben — gültig, angewandt.
- Build- und Paketierschritte über Git Bash und einen `powershell.exe`-Unterprozess statt reiner PowerShell, auf Alberts ausdrückliche Anweisung — gültig für diesen Faden, als Abweichung vom ursprünglichen Auftragswortlaut benannt.
- Manuelle Title-/Description-/Canonical-Zeilen in `default.hbs` entfernt, nachdem der reale Rendering-Nachweis Duplikate zeigte (Canonical zuerst, Description in einer zweiten Runde) — gültig am Ende des Fadens.
- `sameAs`-Ausgabe aus dem JSON-LD entfernt, da `@site.twitter`/`@site.facebook` keine URLs liefern — gültig.
- Tag-Matching-Syntax in `page.hbs` von `tag="hash-<name>"` auf `tag="#<name>"` korrigiert — gültig, durch Dokumentation und Praxistest bestätigt.

## Irrwege, Schleifen und verworfene Ansätze

- Die erste Ursachenannahme zum Escaping-Fehler (fehlendes drittes Klammernpaar) musste nicht revidiert werden.
- Die Annahme, `{{#has}}` verliere Kontext innerhalb von `{{#contentFor}}`, führte zu einer vollständigen Umstrukturierung von `page.hbs` (has-Prüfung nach außen verschoben). Der anschließende Test zeigte keine Veränderung; die Umstrukturierung blieb im Code bestehen, da sie als strukturell unschädlich eingestuft wurde, war aber nicht die Fehlerursache.
- Ein Abruf des `express-hbs`-Quellcodes über WebFetch (zweimal, einmal über die GitHub-Weboberfläche, einmal über die Rohdatei) lieferte eine zur Hypothese passende Code-Erklärung; diese wurde ausdrücklich als möglicherweise durch das Zusammenfassungsmodell erzeugtes Scheinergebnis markiert und nicht als gesicherter Beleg verwendet.
- Der erste Abschlussbericht zu GHOST-04 wurde mit Status GELB und offenen Punkten geschrieben, bevor die verbleibende Arbeit (Description-Duplikat, Tag-Auswertung) erledigt war; Albert wies dies zurück und ließ die offenen Punkte im selben Faden weiterbearbeiten.

## Erzeugte Artefakte

- `Archiv/local/muss noch eingeordnet werden/GHOST-02_SEO-GEO-PAGE-FELDVERTRAG_SOLL-IST-BEFUND.md` — Status ROT, final, unverändert seit Erstellung.
- `docs/steering/patches/GHOST-03_SEO-GEO-PAGE-FELDVERTRAG_UMSETZUNGSBEFUND.md` — Status GELB, final.
- `docs/steering/patches/GHOST-04_SEO-GEO-PAGE-FELDVERTRAG_WINDOWS-FULL-GATE.md` — zweimal geschrieben (Status ROT, dann GELB), zuletzt mit Status GRÜN überschrieben, final am Ende des Fadens.
- `Theme/default.hbs` — mehrfach geändert (Head-Slot, Entfernen von `BreadcrumbList`, Canonical-Zeile, Description-Zeile), Endzustand final im Faden.
- `Theme/page.hbs` — mehrfach geändert (`contentFor`-Block, `sameAs` entfernt, Verschachtelung umgestellt, Tag-Syntax korrigiert), Endzustand final im Faden.
- `Theme/finanzwesir-local-theme.zip` — fünfmal neu paketiert, jeweils nach einer Korrektur; letzter Stand entspricht dem finalen `page.hbs`/`default.hbs`.

## Sachliche Erkenntnisse

- Gesicherter Stand: `{{ghost_head}}` erzeugt bei befülltem Feld sowohl eine eigene Canonical- als auch eine eigene Description-Zeile; bei leerem Feld unterbleibt die jeweilige eigene Ausgabe.
- Gesicherter Stand: `@site.twitter` und `@site.facebook` liefern in dieser Ghost-Instanz rohe Handles („@ghost", „ghost"), keine vollständigen URLs.
- Gesicherter Stand: interne Ghost-Tags werden im `{{#has}}`-Helfer über den literalen Namen samt `#` geprüft (`tag="#schema-about"`), nicht über die CSS-Klassen-Slug-Form „hash-\<name\>".
- Gesicherter Stand: Body-Klasse und `post_class` verwenden für interne Tags die Form `tag-hash-<name>`; das ist unabhängig von der `{{#has}}`-Syntax.
- Arbeitsannahme, später verworfen: `{{#has}}` verhalte sich innerhalb von `{{#contentFor}}` anders als außerhalb.
- Offene Frage, im Faden nicht abschließend geklärt: warum das Fetch-Werkzeug beim Abruf von `TryGhost/express-hbs` zweimal eine identische, aber nicht als Zitat verifizierbare Code-Erklärung lieferte.

## Offene Punkte am Ende

- Keine im GHOST-04-Bericht benannten Blocker.
- Kein Theme-Validator (z. B. gscan) wurde ausgeführt, da keiner in `package.json` oder `GHOST-LOKALBETRIEB.md` dokumentiert war.
- Die Abweichung vom Windows-Regel-Wortlaut (Git Bash statt PowerShell, Upload durch Albert statt durch das Werkzeug) wurde benannt, aber nicht rückwirkend aufgelöst.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: eine auf den ersten Blick plausible, aus allgemeinem Wissen abgeleitete Ursachenhypothese (`contentFor`-Kontextverlust) erwies sich im Praxistest als unzutreffend; die tatsächliche Ursache lag in einer einzelnen falsch angenommenen Syntaxform, die erst durch gezielte Dokumentationsrecherche nach direkter Rückfrage des Nutzers gefunden wurde.

Für spätere Musteranalyse vormerken: zwei unabhängige WebFetch-Abrufe derselben Quelle lieferten inhaltlich übereinstimmende, aber nicht sicher verifizierbare Ergebnisse; die Übereinstimmung wurde nicht als hinreichender Beleg behandelt.

Für spätere Musteranalyse vormerken: der Nutzer bat wiederholt um Wartephasen bei der Fehlersammlung, formulierte den vereinbarten Auslöser („Jetzt fixen") jedoch nie wörtlich und leitete den Übergang stattdessen über andere Formulierungen ein.

## Bewusst ausgelassen

- Vollständige Zitate der wiederholten HTML-Quelltext-Einreichungen (About-Seite, Homepage, Test-Page-1, Index-Vergleich) wurden nicht wörtlich übernommen, nur die daraus gezogenen Befunde.
- Wiederholte, inhaltsgleiche Bestätigungen des Session-Start-Rituals und der Skill-Ladevorgänge wurden nicht aufgenommen.
- Formulierungsdetails der einzelnen Zwischen-Statusmeldungen („notiert, reagiere noch nicht") wurden zusammengefasst statt einzeln aufgeführt.
