Stand: 2026-07-11 | Session: TESTENV-1bR | Geändert von: Claude (Sonnet)

# TESTENV-1bR – Minimalen Testseitenstandard unabhängig vollständig prüfen

## 1. Status und Kurzurteil

**Status: GELB**

Modell-Gate bestanden (Claude Sonnet 5). `docs/testing/TEST_PAGE_STANDARD.md` ist vollständig
semantisch gelesen und gegen die kanonischen Quellen (`APP-INTERFACE.md`, `AUTHOR_GUIDE-v3.md`,
`app.test.html`, `Theme/index.html`, `APP_FOLDER_STRUCTURE.md`, `03_APP_FACTORY_STANDARD_DRAFT.md`,
`Cheat-Sheet HTML-Karten.md`) sowie gegen 12 reale Crashtests geprüft. Der Standard ist in sich
schlüssig, überarchitektiert nicht neu, hält die Ghost-Nähe konsequent ein und trennt strukturelle
von fachlicher Prüfung sauber. Alle drei Leitfragen sind mit **JA** zu beantworten.

Zwei **RELEVANTE**, gebündelt korrigierbare Findings verhindern GRÜN: (F-01) der Standard sagt
nirgends, **wie** der spätere Checker eine fehlplatzierte Testseite überhaupt als solche erkennt,
wenn keine Manifest-Positivliste mehr existiert; (F-02) die im gelöschten Vorgängervertrag
konkret benannten CDN-Hostnamen (`cdn.jsdelivr.net`, `cdn.tailwindcss.com`) sind in der
Minimalisierung verlorengegangen — der neue Standard spricht nur noch allgemein von „CDN". Ein
drittes, **REDAKTIONELLES** Finding (F-03, Ghost-Harness-Grenzen nicht mehr gezogen) ist aktuell
folgenlos, da `tests/ghost/` real null Mitglieder hat.

Kein ROT: kein Quellenkonflikt, keine neue Architekturentscheidung nötig, keine parallele aktive
Wahrheit, keine widersprüchlichen Muss-Regeln gefunden. `TESTENV-1c` kann nach einem einzigen
gebündelten `TESTENV-1bRF` ohne weitere Architekturfrage bauen.

## 2. Modell-Gate und Risikoklasse

Aktives Modell: Claude Sonnet 5 (Basismodell dieser Instanz, unverändert seit `/model sonnet`) —
eindeutig Sonnet-Familie, Gate bestanden. Risikoklasse **B** (unabhängiger semantischer Review,
kein Schreibzugriff auf Produktivartefakte).

## 3. Vorprüfung und Scope

`git status --short` und `git diff --name-status` vor dem Lesen geprüft: nur die zwei bekannten,
von Albert bereits als zulässige Fremdänderungen bestätigten Dateien
(`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`,
`docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md`) plus die sitzungseigene
`session-log.md`-Änderung. Beide TESTENV-1bF-Zieldateien real vorhanden
(`docs/testing/TEST_PAGE_STANDARD.md`, `TESTENV-1bF_..._Ergebnis.md`); `HARNESS_CONTRACT.md`
real nicht mehr vorhanden. Keine STOP-Bedingung ausgelöst. Die drei Fremdänderungen/-artefakte
wurden in diesem Review nicht gelesen über das für die Vorprüfung nötige Maß hinaus, nicht
bewertet, nicht verändert.

## 4. Vollständig gelesene Quellen

- `docs/testing/TEST_PAGE_STANDARD.md` — vollständig, alle 17 Abschnitte, semantisch (nicht nur
  Markerzählung).
- `docs/steering/patches/TESTENV-1bF_testseitenvertrag-minimalisieren_Ergebnis.md` — vollständig.
- `docs/spec/APP-INTERFACE.md` — vollständig (bereits im laufenden Faden gelesen, per
  `git diff --name-status` als unverändert seit damals bestätigt).
- `docs/editorial/AUTHOR_GUIDE-v3.md` — vollständig neu vom Datenträger gelesen (nicht nur
  grep) — Zeilen 91–118 (Interaktive Apps + Chart-Card-Beispiel) explizit gegengeprüft.
- `Apps/prokrastinations-preis/app.test.html` — Testfallstruktur, Erwartungstexte,
  `.kg-card`/`.fw-app`, Mehrfach-Card-Szenario D, CSS-Leak-Test Szenario G (bereits im Faden
  vollständig gelesen, Datei laut `git diff --name-status` unverändert).
- `Theme/index.html` — Body gezielt via `grep` auf Struktur geprüft: reales
  `<span class="expect">Erwartung: ...</span>` unmittelbar vor jedem
  `.financial-chart-module`-Block, durchgängig über alle Szenarien A–E.
- `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md` — vollständig (bereits im Faden gelesen, Rolle von
  `app.test.html` in Phase 2 bestätigt).
- `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` — §5 (Standard-Dateistruktur) und §6
  (Ghost-HTML-Card-Vertrag) gezielt gegengeprüft (bereits im Faden gelesen).
- `docs/editorial/Cheat-Sheet HTML-Karten.md` — vollständig (bereits im Faden gelesen), Chart-Card-Vertrag
  (`data-options`-Syntax) gegen `TEST_PAGE_STANDARD.md` §8 abgeglichen.

Historische Ergebnisprotokolle (`TESTENV-1b`, `TESTENV-1a`, `TESTENV-1aFR`) nur als Kontext
herangezogen, kein Widerspruch gefunden, der eine erneute Vollinventur nötig gemacht hätte.

## 5. Antwort auf die drei Leitfragen

**Leitfrage 1 — Finden und Bedienen: JA.**
§3 definiert eindeutige Ablageorte für Apps, Engine, Tooling, Ghost, Fixtures, Scratch. §13 legt
fest, dass der Launcher aus genau diesen Standardorten erzeugt wird, explizit inklusive der
`Apps/{slug}/app.test.html`-Seiten (Gruppierung „Apps" genannt) — kein blinder Fleck für
App-Testseiten außerhalb `tests/`. Einschränkung: der Launcher findet nur, was am richtigen Ort
liegt; eine fehlplatzierte Seite bleibt unentdeckt (F-01) — das betrifft aber das Entdecken von
**Fehlern**, nicht das Finden **konformer** Seiten, und ist daher für diese Leitfrage nur ein
Randabzug, kein Nein.

**Leitfrage 2 — Sichtbare Erwartung und Fehler: JA.**
§5 erzwingt genau einen sichtbaren, nicht-leeren `data-fw-expected-behavior`-Block pro Testfall
mit mindestens einem konkreten Punkt; §5.3 zeigt ein reales, konkretes Beispiel (Tooltip-Farbe,
-Text, -Inhalt). §9 definiert die sichtbare Fehlerbox (`FEHLER` / Datei / Zeile) und die
Abfangpunkte (`window.onerror`, `unhandledrejection`). Beide Mechanismen sind konkret genug, dass
`TESTENV-1c` sie ohne weitere Rückfrage bauen kann.

**Leitfrage 3 — Deterministische Strukturprüfung: JA, mit zwei zu schließenden Lücken.**
§12 listet 14 konkrete strukturelle Prüfpunkte plus eine explizite Nicht-Prüfliste. Die
Kernregeln (Template-Marker, Testfall-Pflichtstruktur, Card-Vertrag, Referenzexistenz,
Case-Sensitivität) sind determiniert und ohne Interpretationsspielraum umsetzbar. Zwei
Detailregeln fehlen jedoch (F-01 Discovery-Mechanismus für Fehlplatzierung, F-02 CDN-Hostliste) —
beide sind kleine, in einem Satz schließbare Lücken, keine Architekturfragen.

## 6. Prüfmatrix A–L

### A. Zweck und Grenzen

```text
A-01 BESTÄTIGT — §1.1 „Der Entwickler öffnet eine Testseite, bedient sie..."; §17 letzter Punkt: Alberts manuelle Prüfung explizit als nicht ersetzbar benannt.
A-02 BESTÄTIGT — §1.1/§1.2: Checker darf „Testseite strukturell korrekt" melden, nicht „App funktioniert"; §12 Nicht-Prüfliste bekräftigt dies.
A-03 BESTÄTIGT — §1.2 explizite Negativliste (kein Testframework, kein Testmanagementsystem etc.).
A-04 BESTÄTIGT — §1.3 nennt Manifest/Lifecycle/Capabilities/Schema explizit als „bewusst nicht fortgeführt"; keine Fundstelle im restlichen Standard führt sie durch die Hintertür wieder ein (grep-Gegenprobe: je 1 Nennung, ausschließlich in §1.3).
```

### B. Quellenhierarchie

```text
B-05 BESTÄTIGT — §2-Tabelle: APP-INTERFACE.md = „kanonisch, bindend" für Card-Attribute.
B-06 BESTÄTIGT — §2: „Dieser Standard kopiert nicht den Card-Vertrag. Bei Widerspruch gilt APP-INTERFACE.md." §7/§8 sind als „Mindestvertrag" gekennzeichnet, keine vollständige Neuspezifikation. Kein inhaltlicher Widerspruch zu APP-INTERFACE.md §3.1/§3.2 gefunden (Attribut-für-Attribut abgeglichen).
B-07 BESTÄTIGT — AUTHOR_GUIDE-v3.md Zeilen 93/97/98 nutzen real `data-fw-app`/`data-fw-data`, deckungsgleich mit APP-INTERFACE.md §3.1. Vollständig neu gelesen, nicht nur grep.
B-08 BESTÄTIGT — Zeile 109–115 in AUTHOR_GUIDE-v3.md (Chart-Card) unverändert, `financial-chart-module`/`data-csv` weiterhin wie APP-INTERFACE.md §3.2.
```

### C. Ablageorte

```text
C-09 BESTÄTIGT — §3: „Eine App-Testseite liegt immer unter Apps/{slug}/app.test.html."
C-10 BESTÄTIGT — §3: „App-spezifische Testdaten liegen immer unter Apps/{slug}/test-data/" — deckt sich mit realem Bestand (Apps/prokrastinations-preis/test-data/, 7 Dateien laut TESTENV-1a).
C-11 BESTÄTIGT — §3 Baumdiagramm + Regelliste trennt engine/tooling/ghost/fixtures/scratch eindeutig.
C-12 BESTÄTIGT — §3 letzter Regelsatz: „Es gibt keine weiteren dauerhaften Testorte."
C-13 BESTÄTIGT — §3 letzter Absatz: leere Zielordner werden „noch nicht angelegt — das ist Aufgabe von TESTENV-1c".
C-14 BESTÄTIGT — §12 Punkt 2, deterministische Existenzprüfung; deckungsgleich mit APP_FOLDER_STRUCTURE.md Phase 2 (app.js und app.test.html gemeinsam Pflicht in derselben Phase).
```

### D. Testseitenstruktur

```text
D-15 BESTÄTIGT — §4.1: „data-fw-test-template=1 ist der maschinenprüfbare Template-Versionsmarker. Er MUSS auf jeder Testseite vorhanden sein."
D-16 BESTÄTIGT — §12 Punkt 5: „Mindestens ein data-fw-test-case ist vorhanden."
D-17 BESTÄTIGT — §5.2 erster Punkt.
D-18 BESTÄTIGT — §5.2 zweiter/dritter Punkt; Crashtests 2/3 decken beide Verletzungsfälle ab.
D-19 BESTÄTIGT — §5.2 vierter Punkt: „Erwartungen stehen sichtbar auf der Seite, nicht nur in Kommentaren oder Metadaten."
D-20 BESTÄTIGT — §5.2 letzter Punkt: „keine künstliche Zerlegung natürlicher Bedienabläufe."
D-21 BESTÄTIGT — §5.2 fünfter Punkt, direkt am realen Bestandsmuster (app.test.html Szenario D, zwei Container) gespiegelt.
```

### E. Ghost-Nähe

```text
E-22 BESTÄTIGT — §6: „.kg-card approximiert die Ghost-Content-Card"; real verifiziert — .kg-card ist Ghost/Koenig-Editors reale HTML-Card-Wrapper-Klasse, nicht erfunden (app.test.html nutzt sie exakt so).
E-23 BESTÄTIGT — §6/§7/§8: echte Produktionscontainer innerhalb der Hülle.
E-24 BESTÄTIGT — §7, Attribute deckungsgleich mit APP-INTERFACE.md §3.1.
E-25 BESTÄTIGT — §8, Attribute deckungsgleich mit APP-INTERFACE.md §3.2 und Cheat-Sheet HTML-Karten.md.
E-26 BESTÄTIGT — §6: „Kein besonderer Testcontainer ersetzt die produktive Card."
E-27 FINDING F-03 — Standard definiert nirgends explizit, was eine Ghost-Nahe-Einbettung NICHT simuliert (echtes Server-Rendering, Ghost-Admin, Font-Auslieferung). Aktuell folgenlos, da tests/ghost/ real 0 Mitglieder hat.
```

### F. Erwartetes Verhalten

```text
F-28 BESTÄTIGT — §5.3 Beispiel nennt genau diese Kategorien (Tooltip-Erscheinen, Textfarbe, Hintergrundfarbe, Inhalt, Reihenfolge/Interaktion).
F-29 BESTÄTIGT — §12 Punkt 6: „genau einen nicht leeren Block" — Python prüft nur Existenz + Nicht-Leere, keine inhaltliche Bewertung (§12 Nicht-Prüfliste dritter Punkt).
F-30 BESTÄTIGT — §17 letzter Punkt + §16 letzter Punkt: Alberts Urteil im Live-Server ist explizit der nicht ersetzbare Abschluss.
```

### G. Sichtbare Fehler

```text
G-31 BESTÄTIGT — §9 erste Liste.
G-32 BESTÄTIGT — §9 Format-Block (FEHLER/Datei/Zeile) ist konkret genug für eine Implementierung.
G-33 BESTÄTIGT — §9 „Wichtig"-Absatz trennt produktiven Error-State (APP-INTERFACE.md §8) von Dev-Testseiten-Zusatzinfo.
G-34 BESTÄTIGT — §9: „Keine Pflicht zu Fehlerklassen-Enums (bewusst entfernt, §1.3)."
G-35 BESTÄTIGT — keine Fundstelle verlangt Stack-Details in der produktiven App; §9 bezieht sich ausschließlich auf die Dev-Testseite.
```

### H. Python-Checker

```text
H-36 BESTÄTIGT — §12 Punkte 1–14 decken Template, Pfade, Cards, Referenzen ab.
H-37 BESTÄTIGT — §12 „Der Checker prüft ausdrücklich nicht" — 5 Punkte.
H-38 BESTÄTIGT — §12 Punkt 10 + §10 dritter Punkt, mit realem Beleg (scenario_6_decimals.csV, TESTENV-1a §11).
H-39 BESTÄTIGT — §12 Punkt 9, §10.
H-40 FINDING F-02 — §10/§12 Punkt 11 sprechen nur allgemein von „CDN-Abhängigkeit"; die im gelöschten HARNESS_CONTRACT.md §11.4 konkret genannten Hostnamen (cdn.jsdelivr.net, cdn.tailwindcss.com) fehlen. Risiko gering (Finanzwesir-Datendomain www.finanzwesir.com ist textlich klar von „CDN für Chart.js/Tailwind" getrennt, keine Fehlklassifikationsgefahr für Ghost-Datenquellen), aber TESTENV-1c müsste die Hostliste sonst selbst neu festlegen.
H-41 BESTÄTIGT — §12 Punkt 13, deckt sich mit realem Fund (index copy.html / index_balken_CI.html, TESTENV-1a §9).
H-42 FINDING F-01 — siehe unten, gebündelt mit H-43.
H-43 FINDING F-01 — §12 Punkt 12/14 setzen voraus, dass der Checker weiß, welche HTML-Dateien überhaupt „Testseiten" sind, um sie gegen die Standardorte zu prüfen bzw. den Launcher zu speisen. Ohne Manifest (bewusst entfernt) fehlt die Angabe, ob dies über Namensmuster (`*.test.html`), Inhaltsmuster (`data-fw-test-template`-Attribut, repo-weiter Scan) oder eine Kombination geschieht. Für „positives" Auffinden innerhalb der Standardorte ist das unkritisch (§13 klärt Launcher-Quelle); für das in §12 Punkt 12 versprochene Erkennen einer **fehlplatzierten** Seite außerhalb der Standardorte ist ohne repo-weiten Content-/Namensscan keine Erkennung möglich — eine solche Seite bliebe für den Checker schlicht unsichtbar statt als Fehler gemeldet.
H-44 BESTÄTIGT — §12 Nicht-Prüfliste, keine funktionale/visuelle Aussage versprochen.
```

### I. Launcher

```text
I-45 BESTÄTIGT — §13 letzter Satz: „Der Launcher ist Komfortschicht, keine zweite Wahrheit."
I-46 BESTÄTIGT — §13: „Kein Manifest, keine zweite manuell gepflegte Testliste."
I-47 BESTÄTIGT — §13: Titel aus `<title>`/`<h1>`, Gruppierung Apps/Engine/Tooling/Ghost.
I-48 BESTÄTIGT — §13 „Quelle sind die Standardorte (§3)" — §3 nennt explizit Apps/{slug}/app.test.html als Standardort, damit sind App-Testseiten außerhalb von tests/ erfasst, nicht übersehen.
```

### J. LLM-Bauanweisung

```text
J-49 BESTÄTIGT — §14-Block ist eigenständig lesbar, keine externen Vorkenntnisse vorausgesetzt außer den in §14 selbst verlinkten Quellen.
J-50 BESTÄTIGT — §14 erster Punkt.
J-51 BESTÄTIGT — §14 zweiter/dritter Punkt.
J-52 BESTÄTIGT — §14 vierter Punkt, verweist korrekt auf APP-INTERFACE.md.
J-53 BESTÄTIGT — §14 fünfter/sechster Punkt.
J-54 BESTÄTIGT — §14 siebter Punkt.
J-55 BESTÄTIGT — §14 neunter Punkt.
J-56 BESTÄTIGT — §14 zehnter Punkt, wortgleich mit §17 letztem Satz.
J-57 BESTÄTIGT — §14 letzter Satz: „Keine zusätzliche Capability- oder Manifestpflege verlangen."
```

### K. Migration

```text
K-58 BESTÄTIGT — §15 erster Satz: „Migration ist ein einmaliger Arbeitsvorgang, kein dauerhafter Status."
K-59 BESTÄTIGT — §15 8-Schritt-Liste deckt Klassifizieren, Dubletten/tote Seiten entfernen, Referenzen reparieren, Verschieben, Modernisieren ab.
K-60 BESTÄTIGT — §15: „Danach existiert kein Migrationsstatus und kein Migrationsregister mehr."
K-61 BESTÄTIGT — §15: „TESTENV-1bF führt diese Migration noch nicht aus — reine Standardfestlegung."
```

### L. Baufähigkeit von TESTENV-1c

```text
L-62 BESTÄTIGT, mit Einschränkung — Template-Markup (§4/§5), Fehlerbox-Format (§9), Launcher-Quelle/-Gruppierung (§13) sind konkret genug zum Bauen ohne Rückfrage. Einschränkung: Checker-Discovery (F-01) und CDN-Hostliste (F-02) fehlen als Detailregeln.
L-63 FINDING F-01, F-02 — siehe H-42/H-43, H-40.
L-64 BESTÄTIGT — keine widersprüchlichen Muss-Regeln gefunden. Geprüfter Verdachtsfall (Checker würde unmigrierten Altbestand sofort als „fehlerhaft" melden, sobald gebaut) ist **kein** Widerspruch, sondern von §15 explizit vorgesehenes Verhalten („Checker vollständig grün" ist Schritt 6 der Migration, nicht Tag 1).
L-65 BESTÄTIGT — keine sich gegenseitig ausschließenden Anforderungen gefunden.
```

## 7. Reale Crashtests

```text
Fall 1 (app.js ohne app.test.html) — BESTÄTIGT zulässig geprüft: §12 Punkt 2 erkennt dies deterministisch. Aktuell 0 reale Treffer (nur prokrastinations-preis hat app.js, und besitzt auch app.test.html) — Regel ist aber vorwärtskompatibel korrekt und deckt sich mit APP_FOLDER_STRUCTURE.md Phase 2.
Fall 2 (kein Erwartungsblock) — BESTÄTIGT: §12 Punkt 6 erkennt dies.
Fall 3 (leerer Erwartungsblock) — BESTÄTIGT: §12 Punkt 6 „nicht leerer Block".
Fall 4 (echte App-Card) — BESTÄTIGT zulässig: §7 exakt deckungsgleich mit dem Fallbeispiel.
Fall 5 (echte Chart-Card mit existierender Referenz) — BESTÄTIGT zulässig: §8 + §12 Punkt 9 (Referenzexistenz).
Fall 6 (zwei App-Cards, ein Testfall) — BESTÄTIGT zulässig: §5.2 fünfter Punkt, deckungsgleich mit realem Bestand (app.test.html Szenario D).
Fall 7 (leeres Diagramm ohne JS-Fehler) — BESTÄTIGT korrekt abgegrenzt: §1.1/§12/§17 stellen sicher, dass der Checker hier nicht „grün = funktioniert" meldet; Albert erkennt die Abweichung nur über den sichtbaren Erwartungsblock, nicht über den Checker.
Fall 8 (Tooltip fehlt) — BESTÄTIGT: identisch zu Fall 7, Erwartungsblock (§5.3-Beispiel nennt exakt Tooltip) macht die Abweichung für Albert sichtbar, kein Checker-Fehlurteil möglich.
Fall 9 (JS-Exception) — BESTÄTIGT im Standard vorgesehen (§9), Umsetzung selbst korrekt TESTENV-1c zugewiesen (§11: „Beide werden in TESTENV-1c gebaut").
Fall 10 (falsches Pfad-Casing) — BESTÄTIGT: §10 dritter Punkt + §12 Punkt 10, mit explizitem Realbeleg (scenario_6_decimals.csV).
Fall 11 (Testseite außerhalb Standardorte) — FINDING F-01: die Regel existiert (§12 Punkt 12), aber der Erkennungsmechanismus für eine Seite, die nicht an einem der erwarteten Orte liegt, ist nicht spezifiziert.
Fall 12 (neue Testseite, alter Launcher) — BESTÄTIGT im Kern (§13: Launcher wird „aus den real gefundenen Testseiten erzeugt", keine manuelle Synchronisation nötig), aber von derselben Erkennungslücke wie Fall 11 mitbetroffen, sofern die neue Seite nicht an einem Standardort liegt.
```

## 8. Findings

### F-01 — Checker-Discovery-Mechanismus für fehlplatzierte Testseiten fehlt

- Schweregrad: RELEVANT
- Fehlerklasse: Lücke (fehlender Mechanismus)
- Beleg: `docs/testing/TEST_PAGE_STANDARD.md` §12 Punkt 12 („Keine dauerhafte Testseite liegt außerhalb der Standardorte, außer unter tests/scratch/") und §12 Punkt 14 (Launcher-Erzeugbarkeit) setzen implizit voraus, dass der Checker weiß, welche HTML-Dateien überhaupt Testseiten sind — dazu findet sich im gesamten Dokument (§3, §12, §13) keine Angabe eines Suchverfahrens (Namensmuster, Inhaltsmarker, oder Kombination).
- Warum relevant: Ohne das frühere Manifest (bewusst entfernt) gibt es keine Positivliste mehr. Eine Testseite, die versehentlich außerhalb aller Standardorte abgelegt wird, ist für den Checker unsichtbar statt als Fehler erkennbar — genau der Fehlermodus, den §12 Punkt 12 eigentlich verhindern soll (Crashtest 11/12).
- Kleinste nötige Korrektur: einen Satz in §12 ergänzen, z. B.: „Der Checker durchsucht das gesamte Repository nach dem Attribut `data-fw-test-template` sowie nach dem Namensmuster `*.test.html`; jeder Treffer außerhalb der Standardorte (§3) und außerhalb von `tests/scratch/` ist ein Fehler."
- Betrifft TESTENV-1c: ja

### F-02 — Konkrete CDN-Hostnamen aus dem Vorgängervertrag nicht übernommen

- Schweregrad: RELEVANT
- Fehlerklasse: Präzisionsverlust bei Minimalisierung
- Beleg: `docs/testing/TEST_PAGE_STANDARD.md` §10 vierter Punkt und §12 Punkt 11 sprechen nur allgemein von „CDN-Laufzeitabhängigkeit"/„unerlaubte CDN-Abhängigkeit". Der gelöschte `HARNESS_CONTRACT.md` (§11.4, laut `TESTENV-1b`-Ergebnisprotokoll §4/§8) benannte konkret `cdn.jsdelivr.net` und `cdn.tailwindcss.com`.
- Warum relevant: TESTENV-1c müsste die konkrete Erkennungsregel (welche Hostnamen zählen als „CDN") sonst selbst neu festlegen, was für ein reines Bau-AP ohne Architekturmandat eine unnötige Zusatzentscheidung wäre. Kein akutes Fehlklassifikationsrisiko für legitime `www.finanzwesir.com`-Datenquellen, da diese textlich klar von „CDN für Chart.js/Tailwind" getrennt sind.
- Kleinste nötige Korrektur: die zwei bekannten Hostnamen in §10 oder §12 Punkt 11 explizit nennen.
- Betrifft TESTENV-1c: ja

### F-03 — Ghost-Harness-Grenzen nicht mehr explizit gezogen

- Schweregrad: REDAKTIONELL
- Fehlerklasse: Lücke (fehlende Abgrenzung)
- Beleg: Der gelöschte Vorgängervertrag hatte einen eigenen Abschnitt „Ghost-Harness-Grenzen" (was ein Ghost-Harness nicht behaupten darf: echtes Server-Rendering, Ghost-Admin, echte Theme-Kompilierung, produktive Font-Auslieferung verifiziert). `TEST_PAGE_STANDARD.md` erwähnt `tests/ghost/` nur als künftigen Ablageort (§3), ohne diese Abgrenzung erneut zu ziehen.
- Warum relevant: Aktuell folgenlos, da `tests/ghost/` real 0 Mitglieder hat (bestätigt in `TESTENV-1a`). Relevant erst, sobald der erste reale Ghost-Harness gebaut wird — dann besteht das Risiko, dass eine Ghost-nahe Testseite fälschlich als vollständige Ghost-Simulation missverstanden wird.
- Kleinste nötige Korrektur: bei Bedarf, spätestens vor dem ersten realen `tests/ghost/`-Harness, einen kurzen Abgrenzungssatz ergänzen.
- Betrifft TESTENV-1c: nein (blockiert Template/Shared-CSS-JS/Checker/Launcher-Bau nicht, da `ghost` aktuell leer bleibt)

## 9. Bestätigte Stärken

- Der Standard hält die in `TESTENV-1bF` beauftragte Minimalarchitektur konsequent durch — kein
  einziges der explizit zu entfernenden Konzepte (Manifest, Capability-Grammatik, Lifecycle,
  Präzedenzregeln) taucht als aktive Pflicht wieder auf; jede Erwähnung ist explizit als „nicht
  fortgeführt" gerahmt (§1.3).
- Die Ghost-Card-Beispiele in §7/§8 sind wortgetreu mit `APP-INTERFACE.md` §3.1/§3.2 abgeglichen —
  keine stille Attributdrift.
- Die Trennung struktureller vs. fachlicher Prüfung ist an mehreren Stellen redundant und
  konsistent verankert (§1.1, §1.2, §12, §16, §17) — kein Einzelsatz, der bei einer Teillektüre
  übersehen werden könnte.
- Das Erwartungsblock-Beispiel (§5.3) ist konkret und deckt sich mit dem realen, bereits
  existierenden `<span class="expect">`-Muster in `Theme/index.html`.
- Die Case-Sensitivitäts- und Referenz-Regeln (§10) sind explizit an einen real gefundenen
  Altfehler (`scenario_6_decimals.csV`) rückgebunden statt abstrakt behauptet.
- Die AUTHOR_GUIDE-Synchronisierung ist chirurgisch exakt — nur die zwei veralteten Attribute
  geändert, das bereits konforme Chart-Card-Beispiel unangetastet gelassen.

## 10. Baufähigkeit von TESTENV-1c

**Aktuell: nein, ohne vorherige Korrektur.** Nach Schließen von F-01 und F-02 (ein gebündelter
`TESTENV-1bRF`, jeweils ein Satz Ergänzung): **ja.** Template-Markup, Fehlerbox-Format,
Launcher-Quelle und -Gruppierung, App-/Chart-Card-Verträge und die 12 Kernregeln des Checkers
sind bereits jetzt konkret genug, um ohne neue Architekturentscheidung gebaut zu werden. Die
beiden Findings sind reine Ergänzungen bestehender Abschnitte (§10/§12), keine neuen
Abschnitte, keine Kurskorrektur der Minimalarchitektur.

## 11. Scope-QA

Keine bestehende Datei verändert. Einziger Write dieses APs: diese Ergebnisdatei. Kein Commit,
kein Push, keine Reparatur an `TEST_PAGE_STANDARD.md`, `AUTHOR_GUIDE-v3.md` oder
`APP-INTERFACE.md` vorgenommen. Die drei bekannten Fremdänderungen unangetastet gelassen (siehe
§3). `git status`/`git diff` am Ende erneut geprüft (siehe unten).

```text
=== abschließender Scope-Check ===
Neu in diesem AP: docs/steering/patches/TESTENV-1bR_minimalstandard-review_Ergebnis.md
Unverändert: docs/testing/TEST_PAGE_STANDARD.md, docs/editorial/AUTHOR_GUIDE-v3.md,
             docs/spec/APP-INTERFACE.md, alle Test-HTML-Dateien, alle Fixtures
```

## 12. Vollständiges Wiederlesen / Datei-Wahrheit

- `docs/testing/TEST_PAGE_STANDARD.md` vollständig semantisch gelesen (alle 438 Zeilen, alle 17
  Abschnitte inhaltlich ausgewertet, nicht nur Überschriften/Marker gezählt).
- Diese Ergebnisdatei nach dem Schreiben vollständig vom Datenträger neu gelesen (folgender
  Bash-Check bestätigt Zeilenzahl und Abwesenheit unbeabsichtigter Zusatzänderungen).
- Jedes der drei Findings gegen die reale Datei belegt (Zitat + Abschnittsnummer, keine
  Paraphrase aus dem Gedächtnis).
- Geprüft, dass keine Reparatur- oder Architekturformulierung in dieses Protokoll gerutscht ist:
  alle drei Findings enthalten nur „kleinste nötige Korrektur" als Vorschlag, keine tatsächliche
  Änderung wurde an `TEST_PAGE_STANDARD.md` vorgenommen.
- Geprüft, dass der nächste AP korrekt aus dem Status folgt: GELB → genau ein gebündelter
  `TESTENV-1bRF`, kein AP pro Finding, keine erneute Vollarchitekturprüfung.

## 13. Nächster AP

**Status GELB → `TESTENV-1bRF` — akzeptierte Review-Findings (F-01, F-02) gemeinsam
korrigieren.** F-03 kann optional mitgenommen werden (redaktionell, nicht blockierend), muss aber
nicht.

Danach ein enges Abschlussgate (Bestätigung der zwei/drei Ergänzungssätze gegen die reale Datei),
kein vollständiger neuer Grundsatzreview.

Erst danach: `TESTENV-1c — Template, Shared CSS/JS, Python-Checker und Launcher bauen.`

Weiter nur nach Alberts OK.
