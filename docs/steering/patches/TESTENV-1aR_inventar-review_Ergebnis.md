Stand: 2026-07-11 | Session: TESTENV-1aR | Geändert von: Claude (Sonnet)

# TESTENV-1aR – Inventar unabhängig gegen die reale Datei prüfen

## 1. Status und Kurzurteil

**Status: GELB**

Die Grundlage von `TESTENV-1a` ist methodisch solide und trägt für `TESTENV-1b` — aber sie enthält **eine folgenreiche Zählabweichung** (App-Ordner: 25 statt behauptete 24) und **eine folgenreiche Fehlzuschreibung** (die Groß-/Kleinschreibungs-Falle `scenario_6_decimals.csV` wurde der falschen Quelldatei zugeordnet), die beide unkorrigiert direkt in Fehlentscheidungen von `TESTENV-1b` münden könnten (Kapazitätsplanung bzw. Löschung einer tatsächlich genutzten Datei). Zusätzlich: eine unbelegte Laufzeitbehauptung ohne Browser-Test (`Theme/index.html`-Fresh-Clone-Verhalten), eine Kategorienvermischung bei den „6 verwaisten Dateien", und ein Rest-Inkonsistenz-Fund (§1-Kurzurteil-Bullet von `TESTENV-1a` nennt weiterhin „18 HTML-Testseiten" statt der im selben Dokument sonst korrigierten 19) — dieser Fund hat `TESTENV-1a`s eigene Wiederlese-QA nicht abgefangen.

Alle übrigen 9 Claims sind deterministisch bestätigt. Kein Scope-Verstoß in `TESTENV-1a` gefunden (keine KEEP/MERGE/DELETE-Entscheidung, kein Fremdrepair, nur die Ergebnisdatei als Write).

**Bewertung:** Kein ROT — Methodik, Scope-Treue und die überwiegende Mehrheit der Kernzahlen sind intakt. Aber auch kein GRÜN — die zwei genannten Fehler sind genau die Art von „falschem GRÜN", die dieser Review-AP laut Auftrag verhindern soll. Empfehlung: ein eng begrenzter Korrektur-AP vor `TESTENV-1b` (siehe §16).

## 2. Geprüfter Repository-Stand

| Merkmal | Wert |
|---|---|
| Repository | `Finanzwesir-code` |
| Branch | `master` |
| Letzter Commit | `77f3229` |
| Git-Status bei AP-Start | `.claude/learning/session-log.md` modifiziert (sitzungseigen, kein TESTENV-Bezug); 2 untracked Chronik-Dateien (`Archiv/Chroniken/chronist-v1/...`, nicht von dieser Sitzung erzeugt); `TESTENV-1a_..._Ergebnis.md` als bereits committetes bzw. neu angelegtes Artefakt der Vorgänger-Sitzung |
| Modell-Gate | bestanden — Claude Sonnet 5 |
| Vorgängerdatei | vorhanden und lesbar |
| Zieldatei vor Start | existierte nicht |

## 3. Review-Methode

Unabhängiges Python-Skript (außerhalb des Repositorys, im Betriebssystem-Temp-Verzeichnis, nach Abschluss entfernt) rechnet 14 Claims direkt gegen die reale Arbeitskopie nach — ohne die Zwischenergebnisse aus `TESTENV-1a` zu übernehmen. Zusätzlich gezielte Einzeldatei-Lektüre (`.gitignore`, `Theme/index.html`, `AP-16-abnahme.html`, `app.test.html`, `tools/ci-token-check.js`, `Theme/assets/data/b1/README.md`, `docs/data/README.md`, `APP_FOLDER_STRUCTURE.md`) und gezielte `grep`-Gegenproben für die zwei kritischsten Einzelbefunde (App-Ordner-Liste, `scenario_6_decimals`-Referenz). Keine Volltextkopie von HTML-Inhalten in diesen Bericht übernommen.

## 4. Claim-Matrix

| Claim | Ergebnis | Deterministischer Beleg | Einschränkung/Folge |
|---|---|---|---|
| 1 — 23 Test-HTML-Dateien, sauber scope-formuliert | **BESTÄTIGT** | 19 (chart-tests) + 1 (app.test.html) + 1 (Theme/index.html) + 2 (design-system) = 23, unabhängig nachgezählt | Scope-Formulierung („im definierten Scope") ist im Bericht klar, keine Übergeneralisierung gefunden |
| 2 — `Theme/chart-tests/`: 19 Dateien, 1 modern + 18 Legacy, vollständig ignoriert | **EINGESCHRÄNKT** | `os.listdir` → 19 Dateien, `git status --ignored` bestätigt ganzen Ordner ignoriert | §1-Kurzurteil-Bullet (Zeile 13) des Vorgängerberichts nennt weiterhin „18 HTML-Testseiten" — Rest-Inkonsistenz, die dessen eigene Wiederlese-QA nicht fand |
| 3 — 91 Daten-/Fixture-Dateien (81+7+3) | **BESTÄTIGT**, mit Sprachhinweis | 81 (Theme/data) + 7 (test-data) + 3 (b1, davon 1 README.md) = 91, unabhängig nachgezählt | „91 Datendateien" zählt 1 README.md mit — sprachlich unscharf (README ist Dokumentation, kein Fixture), aber im Bericht selbst durch „2 CSV + 1 README" bereits transparent aufgeschlüsselt — kein Zahlenfehler |
| 4 — exakte HTML-Dublette `index copy.html` ↔ `index_balken_CI.html` | **BESTÄTIGT** | SHA-256 unabhängig neu berechnet: beide `2f612ca0…1eafb85`, je 6488 Bytes | Bericht leitet korrekt nur „Dublette" ab, keine unbelegte historische Priorität behauptet |
| 5 — gebrochene Referenz `bd_daily_90d.csv` in `index_linen_2.html` | **BESTÄTIGT** | `bd_daily_90d.csv` existiert nicht, `bd_kurz_daily_90d.csv` existiert, Referenz in der Datei real vorhanden | „vermutlich umbenannt" korrekt als Vermutung markiert, keine Tatsachenbehauptung |
| 6 — Groß-/Kleinschreibungsfalle `scenario_6_decimals.csV` | **WIDERLEGT (Zuschreibung)** | Datei trägt real ein `V` (Großbuchstabe); referenziert wird sie tatsächlich **nicht** von `index_alles test.html` (keine Fundstelle beim Grep), sondern von **`Theme/chart-tests/index_linien.html:97`** (`data-csv="../data/scenario_6_decimals.csv"`) | Phänomen (Case-Mismatch, Windows-unsichtbar) ist real und bleibt gültig — nur die im Bericht genannte Quelldatei ist falsch. Risiko: ein Korrektur-AP würde die falsche Datei anfassen |
| 7 — `Theme/index.html` + Fresh Clone | **EINGESCHRÄNKT** | tracked bestätigt, 15 CSV-Referenzen unabhängig nachgezählt (deckungsgleich), `Theme/data/` vollständig ignoriert bestätigt | Die Formulierung „öffnet, zeigt aber ausschließlich leere/fehlerhafte Charts" ist eine **plausible, aber nicht browsergetestete Laufzeitfolge** — im Bericht als Tatsache formuliert statt als Ableitung gekennzeichnet. Keine Browser-QA fand statt (auch in `TESTENV-1a` nicht behauptet, aber auch nicht durch Hedging abgesichert) |
| 8 — 6 verwaiste `Theme/data/`-Dateien | **EINGESCHRÄNKT (Kategorienvermischung)** | Unabhängiger case-insensitiver Referenz-Scan über alle 19 chart-tests + `Theme/index.html`: nur **4 echte Orphans** (`scenario_2_long_25y.csv`, `tool_tip_pie_gatekeeper.csv`, `tt_micro_precision_5d.csv`, `tt_transition_weekly_20d.csv`) | Die im Bericht genannten „6" vermischen 3 unterschiedliche Kategorien: 4 echte Orphans, 1 korrekt erkannte Manifest-Notiz (`Alle-Balkendiagramm-CSV.txt`, bereits transparent so benannt) und 1 fälschlich als „unreferenziert" eingestufte Datei (`scenario_6_decimals.csV`), die real (case-insensitiv) von `index_linien.html` referenziert wird — direkte Folge von Claim 6 |
| 9 — Chart.js-Quellen: 21 Seiten, 1 lokal / 20 CDN | **BESTÄTIGT** | Unabhängiger Scan über dieselben 21 Seiten: 20× `cdn.jsdelivr.net`, 1× `vendor/chart.umd.min.js` (`AP-16-abnahme.html`) | Kein zweiter lokaler Vendor-Pfad gefunden (`Theme/assets/js/vendor/` enthält nur `.gitkeep` + die eine `chart.umd.min.js`) |
| 10 — App-Ordner ohne `app.test.html`: 23 von 24 | **WIDERLEGT (Zahlenfehler)** | `os.listdir("Apps")` gefiltert auf Verzeichnisse: **25** Ordner, nicht 24. Nur 1 (`prokrastinations-preis`) hat `app.test.html` (`git ls-files` bestätigt) | Reale Zahl: **24 von 25** App-Ordnern ohne `app.test.html`, nicht „23 von 24". Die Vorinventur hat bei der manuellen `ls`-Zählung ein Element übersehen/verzählt. Deckt sich mit bestehender Projekt-Memory („22+3=25 App-Ordner"), die von `TESTENV-1a` nicht gegengeprüft wurde |
| 11 — 2 fachfremde Design-System-Seiten mit gebrochenen Referenzen | **BESTÄTIGT** | Beide Dateien existieren; deren Zielpfade (`<repo-root>/assets/...`) unabhängig geprüft: kein `assets/`-Ordner auf Root-Ebene vorhanden | Korrekt als „fachfremd, aber echte Testseiten" markiert, keine Reparatur vorgenommen |
| 12 — absichtliche Fehlerreferenzen in `app.test.html` | **BESTÄTIGT** | `nonexistent.csv` und `evil.example.com` beide vorhanden, Kontext zeigt explizite Testfall-Kennzeichnung („Testfall: T-04", „Testfall: T-03", beschreibender UI-Text) | Sauber von echten Brüchen getrennt, korrekt gewürdigt |
| 13 — `tools/ci-token-check.js` Funktionen | **BESTÄTIGT** | `fwTokenCheck()` und `fwFontCheck()` beide vorhanden; Härtung „Match nur bei `In :root` definiert" im Code bestätigt (Zeile 149–151) | Deckt sich mit der in der referenzierten Vorinventur beschriebenen Härtung vom 2026-07-11 |
| 14 — Scope- und Write-Wahrheit von `TESTENV-1a` | **EINGESCHRÄNKT** | `git diff --name-status` zeigt nur die Ergebnisdatei als Write dieses APs; keine KEEP/MERGE/DELETE-Entscheidung im Text gefunden | Die eigene Wiederlese-/Stichproben-QA von `TESTENV-1a` (§16 dort) hat die drei oben genannten Fehler (Claim 2, 6, 10) nicht gefunden — die Stichprobe war nicht tief genug, um eine falsche Quelldatei-Zuschreibung oder eine Ordnerzählung gegenzuprüfen |

## 5. Bestätigte Kernzahlen

- 23 Test-HTML-Dateien im definierten Scope (1 App-Test + 19 Engine-Workbenches + 1 Sonderfall `Theme/index.html` + 2 Design-System).
- 19 Dateien in `Theme/chart-tests/` (18 Legacy + 1 modern), Ordner vollständig `.gitignore`-ausgeblendet.
- 91 Daten-/Fixture-Dateien (81 + 7 + 3), 0 exakte Dubletten, 0 Namenskollisionen.
- 1 exakte HTML-Dublette (`index copy.html` ↔ `index_balken_CI.html`), byte-identisch.
- 1 gebrochene, nicht-beabsichtigte CSV-Referenz (`bd_daily_90d.csv` in `index_linen_2.html`).
- 20 von 21 chartbezogenen Testseiten laden Chart.js vom CDN, genau 1 lokal.
- `Theme/index.html` ist tracked, referenziert 15 CSVs, die alle im ignorierten `Theme/data/` liegen.
- 2 fachfremde, aber echte Test-/Referenzseiten mit eigenen gebrochenen Pfaden.
- Die beabsichtigten Fehlerreferenzen in `app.test.html` sind sauber von echten Brüchen getrennt.
- `tools/ci-token-check.js` enthält beide beschriebenen Funktionen inklusive der Font-Härtung.

## 6. Einschränkungen und Korrekturbedarf

1. **App-Ordner-Zahl**: real 25, nicht 24 → „23 von 24" muss zu „24 von 25" werden (§1, §4, §12 von `TESTENV-1a`, plus jede Ableitung wie „23 produktive Vertragsverletzungen").
2. **Groß-/Kleinschreibungsfalle**: reale Quelldatei ist `index_linien.html`, nicht `index_alles test.html` (§1, §7, §11, §12, §14 von `TESTENV-1a`).
3. **„6 verwaiste Dateien"** ist eine Vermischung dreier Kategorien und sollte in „4 echte Orphans + 1 Manifest-Notiz (kein Fixture) + 1 case-mismatched, aber tatsächlich referenzierte Datei" aufgelöst werden.
4. **Rest-Inkonsistenz** „18 HTML-Testseiten" im §1-Kurzurteil-Bullet (Zeile 13) von `TESTENV-1a` — einzige verbliebene Stelle, an der die während der Pflicht-QA korrigierte 17→18/19-Zählung nicht nachgezogen wurde.
5. **Laufzeitbehauptung ohne Hedging**: „öffnet, zeigt aber ausschließlich leere/fehlerhafte Charts" (Theme/index.html) sollte als „plausible, nicht browsergetestete Laufzeitfolge" gekennzeichnet werden, nicht als Tatsache.

Keiner dieser Punkte erfordert eine Migration, ein Löschen oder eine Architekturentscheidung — alle sind reine Text-/Zuordnungskorrekturen am bestehenden Inventar.

## 7. Nicht bestätigte oder widerlegte Aussagen

- **Widerlegt**: „23 von 24 App-Ordnern ohne `app.test.html`" → real 24 von 25.
- **Widerlegt (Zuschreibung, nicht Phänomen)**: „`index_alles test.html` referenziert `scenario_6_decimals.csv`" → real referenziert `index_linien.html` diese Datei.
- Keine weiteren Aussagen wurden als falsch identifiziert.

## 8. Stillschweigende Annahmen / verbotene Interpretationslücken

- `TESTENV-1a` hat die App-Ordner-Liste manuell aus einer `ls -d Apps/*/`-Bash-Ausgabe abgezählt, ohne die Zeilenzahl gegen eine zweite, unabhängige Methode zu verifizieren — die stillschweigende Annahme „ich habe richtig gezählt" hat sich als falsch erwiesen.
- Die Zuordnung „`scenario_6_decimals.csV` wird von X referenziert" wurde offenbar aus einem falschen Zwischenschritt der ursprünglichen Analyse übernommen (die Datei erschien in der automatisch berechneten Orphan-Liste; die Quelldatei-Behauptung im Fließtext wurde daraufhin nicht gegen eine erneute Fundstellensuche geprüft, sondern vermutlich mit einer anderen, thematisch ähnlichen Datei verwechselt).
- Die Fresh-Clone-Laufzeitfolge für `Theme/index.html` wurde als Tatsache formuliert, obwohl sie eine Ableitung ist — eine stillschweigende Grenzüberschreitung von „statisch geprüft" zu „Laufzeitverhalten beschrieben", die die Vorgaben dieses Reviews (Claim 7) explizit ausschließen.
- Keine stille Ausnahmeklasse für die 2 Design-System-Seiten akzeptiert — sie bleiben im Hauptinventar sichtbar, wie von den Leitplanken verlangt.

## 9. Advocatus-diaboli-Prüfung

- **Wo könnte ein statischer Pfadcheck einen dynamischen Pfad übersehen?** `app.test.html` lädt seine CSV-Pfade über das `data-fw-data`-Attribut, das zur Laufzeit von `app.js` interpretiert wird — ein rein statischer Regex-Scan auf Attributwerte (wie in `TESTENV-1a` und in diesem Review verwendet) sieht nur die im Quelltext stehenden Strings, keine zur Laufzeit zusammengesetzten Pfade. In den geprüften Dateien wurden keine dynamisch zusammengesetzten Pfade gefunden, aber das wurde nicht durch Codeausführung, sondern nur durch Nichtfund im Quelltext „bewiesen".
- **Wo könnte „unreferenziert" nur „nicht statisch referenziert" bedeuten?** Exakt der in Claim 8/§8 dokumentierte Fall: `scenario_6_decimals.csV` erschien in `TESTENV-1a` als „unreferenziert", obwohl es real referenziert wird — nur unter anderem Namen (Case) und aus einer anderen Datei als angenommen. Der Scope-Rahmen für „referenziert" (nur die 19+1+1+2 = 23 gescannten HTML-Dateien) deckt zudem keine AP-Ergebnisprotokolle oder andere Markdown-Dateien ab, die dieselben CSV-Namen erwähnen könnten.
- **Wo könnte Windows einen Linux-Bruch verdecken?** Bestätigt real (Claim 6) — und dieser Review-AP selbst musste den Fund per `grep -i` (case-insensitiv) erst sichtbar machen, weil ein naiver case-sensitiver Vergleich (wie im ursprünglichen Orphan-Skript) ihn in die falsche Kategorie einsortiert hätte.
- **Welche Aussage erzeugt falsches Sicherheitsgefühl?** Die App-Ordner-Zahl „24" erzeugt ein falsches Gefühl von Vollständigkeit für die App-Fabrik-Rollout-Planung — ein nachgelagerter AP, der „23 Ordner nachrüsten" plant, würde einen Ordner schlicht vergessen.

## 10. Ockhams-Rasiermesser-Prüfung

Dieser Review hat sich auf die 14 vorgegebenen Claims plus die zur Fehlersuche zwingend nötigen Gegenproben beschränkt. Nicht getan (bewusst, da für die Freigabefrage nicht nötig):
- keine vollständige inhaltliche Neuanalyse der 18 Legacy-Dateien;
- keine Neuerstellung der bereits bestätigten Merkmalsmatrix aus `TESTENV-1a` §5;
- kein neues Tool im Repository;
- keine Vorwegnahme des `TESTENV-1b`-Harness-Vertrags (keine KEEP/MERGE/DELETE-Bewertung der 5 Überschneidungsgruppen aus `TESTENV-1a` §6 — das bleibt dort Aufgabe von `TESTENV-1b`).

## 11. Via-negativa-Prüfung

Aussagen, die entfernt oder enger gefasst werden müssen (Zusammenfassung aus §6/§7):
- „23 von 24 App-Ordnern" → entfernen, ersetzen durch „24 von 25".
- „`index_alles test.html` referenziert `scenario_6_decimals.csv`" → entfernen, ersetzen durch `index_linien.html`.
- „6 verwaiste Dateien" als homogene Gruppe → auflösen in 3 Unterkategorien.
- „öffnet, zeigt aber ausschließlich leere/fehlerhafte Charts" → enger fassen als ungetestete, plausible Ableitung.
- „18 HTML-Testseiten" (Zeile 13) → auf 19 nachziehen (reine Konsistenzkorrektur, kein neuer Fund).

Keine Doppelzählungen über die genannten Punkte hinaus gefunden. Keine weiteren überdehnten Begriffe identifiziert.

## 12. Invert-always-invert-Prüfung

Wie könnte `TESTENV-1a` den nächsten AP (`TESTENV-1b`) in eine falsche Architekturentscheidung treiben?

1. **Falsche Rollout-Größe**: Baut `TESTENV-1b` die „Pro-App-Harness"-Planung auf „23 fehlende `app.test.html`" auf, fehlt in jeder Kapazitäts-/Reihenfolgeplanung ein Ordner (`komplexitaets-entlarver` oder ein anderer, je nach dem, welcher in der ursprünglichen manuellen Zählung verlorenging) — Vermeidung: Zahl 25/24 aus §4/§10 dieses Reviews übernehmen, nicht aus `TESTENV-1a`.
2. **Falsche Datei repariert**: Adressiert `TESTENV-1b` die Groß-/Kleinschreibungsfalle anhand der Angabe in `TESTENV-1a`, würde es `index_alles test.html` untersuchen (wo der Fehler nicht existiert) und `index_linien.html` (wo er real existiert) übersehen — der Bug bliebe unentdeckt. Vermeidung: `index_linien.html:97` als reale Fundstelle verwenden.
3. **Datenverlust bei Aufräumarbeiten**: Würde `TESTENV-1b` die „6 verwaisten Dateien" pauschal löschen, verlöre es `scenario_6_decimals.csV`, obwohl es (case-insensitiv) aktiv von `index_linien.html` genutzt wird — ein scheinbar sicherer Aufräumschritt hätte einen bestehenden Testfall beschädigt. Vermeidung: die 3 Unterkategorien aus §6 einzeln behandeln, nicht als eine Löschliste.
4. **Vorschnelle Entscheidung über `Theme/index.html`**: Nimmt `TESTENV-1b` die unbelegte Fresh-Clone-Laufzeitfolge als geprüften Fakt, könnte es voreilig entscheiden, die Datei zu ignorieren oder zu entfernen, ohne zu wissen, ob das reale Fehlverhalten (JS-Exception vs. stumm leere Charts) überhaupt so harmlos ist wie angenommen. Vermeidung: vor einer Entscheidung einen einmaligen, dokumentierten Browser-Check nachholen.
5. **Überinterpretation der Überschneidungsgruppen**: Behandelt `TESTENV-1b` die 5 in `TESTENV-1a` §6 genannten „möglichen Überschneidungen" als bereits bestätigte MERGE-Kandidaten (obwohl `TESTENV-1a` sie selbst ausdrücklich als ungeklärt kennzeichnet), könnte es echte, nicht redundante Edge-Case-Abdeckung beim Zusammenführen verlieren. Vermeidung: vor jeder Merge-Entscheidung den vollen Bodytext der betroffenen Dateien lesen, nicht nur die H1/H2-Struktur.

## 13. Eignung als Grundlage für TESTENV-1b

**Bedingt geeignet.** Die überwiegende Mehrheit der Kernzahlen und die gesamte Methodik (deterministische Zählung, Kategorisierung A/B/C, Gitignore-Analyse, Duplikat-/Referenzprüfung) sind tragfähig und müssen für `TESTENV-1b` nicht neu erhoben werden. Die zwei folgenreichen Fehler (App-Ordner-Zahl, Groß-/Kleinschreibungs-Zuschreibung) plus die drei kleineren Einschränkungen sind punktuell korrigierbar, ohne das Inventar neu aufzurollen. `TESTENV-1b` sollte **nicht direkt auf den Zahlen aus `TESTENV-1a`** aufbauen, sondern auf den in §4/§6 dieses Reviews korrigierten Werten.

## 14. Scope-QA

- Keine Datei außer dieser Ergebnisdatei angelegt, geändert, verschoben oder gelöscht.
- Keine Reparatur an `TESTENV-1a` oder an den betroffenen Testdateien vorgenommen (auch nicht an der offensichtlich fehlerhaften Zuschreibung).
- Keine KEEP/MERGE/DELETE-Entscheidung getroffen — die 5 Überschneidungsgruppen aus `TESTENV-1a` §6 wurden bewusst nicht bewertet, nur die Warnung in §12 Punkt 5 ausgesprochen.
- Kein neues Tool im Repository angelegt; das Verifikationsskript lag ausschließlich im Betriebssystem-Temp-Verzeichnis und wurde nach Abschluss entfernt.
- Kein Commit, kein Push, kein Abschlussritual durchgeführt.

## 15. Wiederlesen / Datei-Wahrheit

- `git diff --name-status` nach dem Schreiben geprüft: nur diese Ergebnisdatei neu (plus die unveränderte, sitzungseigene `session-log.md`-Änderung und die 2 vorbestehenden untracked Chronik-Dateien — keins davon Teil dieses APs).
- Ergebnisdatei vollständig neu vom Datenträger gelesen; alle 14 Claim-Zeilen gegen die eigenen Python-Rohausgaben zurückgeprüft (Zahlen, SHA-256, Dateipfade, Grep-Fundstellen).
- Geprüft, dass „statisch bestätigt", „plausible Laufzeitfolge" und „Browser geprüft" im Text sauber getrennt sind (Claim 7 explizit als ungetestete Ableitung markiert, keine Browser-QA an keiner Stelle behauptet).
- Geprüft, dass keine stillschweigende Ausnahme akzeptiert wurde (§8) und keine Reparatur- oder Architekturentscheidung in den Bericht gerutscht ist (§14).

## 16. Nächster AP

**Status GELB → eng begrenzter Korrektur-AP vor `TESTENV-1b`:**

Empfohlener Korrektur-Scope (ausschließlich Textkorrekturen an `TESTENV-1a_reale-testumgebung-inventar_Ergebnis.md`, keine Code-/Datenänderung):
1. App-Ordner-Zahl 24→25, „23 von 24"→„24 von 25" (§1, §4, §12, §14 dort).
2. `scenario_6_decimals.csV`-Zuschreibung: `index_alles test.html`→`index_linien.html` (§1, §7, §11, §12, §14 dort).
3. „6 verwaiste Dateien" in 3 Unterkategorien auflösen (§7, §12, §14 dort).
4. Zeile 13 (§1-Kurzurteil-Bullet): „18 HTML-Testseiten"→„19 HTML-Testseiten".
5. Theme/index.html-Laufzeitbehauptung hedgen (§1, §10, §12 dort).

Danach: `TESTENV-1b — Maschinenlesbaren Harness-Vertrag und Geltungsbereich festlegen`.

Ausdrücklich **nicht** der nächste AP: Legacy-Migration, Fixture-Migration, Löschen, `tests/`-Aufbau, Chart.js-Umstellung, Änderung von `.gitignore`, Ghost-Harness, Commit vor Abschluss dieses Reviews.

Weiter nur nach Alberts OK.
