---
chronik_id: Wie-der-Skill-archivieren-das-Licht-der-Welt-erblickte
datum: 2026-06-09
projekt: archivstrategie
thema: skill-archivieren-entstehung
beteiligte: [nutzer, claude]
typ: chronik
standard: legacy
faden_typ: konzeptarbeit
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, konzept-vs-umsetzung, annahme-verworfen]
---

# Wie der Skill `/archivieren` das Licht der Welt erblickte

**Dokumenttyp:** Archäologisch-historische Chronik / Making-of-Beleg  
**Status:** POSTMORTEM / MAKING_OF_BELEG  
**Erstellt:** 2026-06-09  
**Bezug:** Finanzwesir 2.0 — Archivstrategie, Kontext-Hygiene, Claude-Steuerung  
**Nicht handlungsleitend:** Aktuelle Regeln stehen in den aktiven Steuerdateien und in `.claude/skills/archivieren/SKILL.md`.

---

## 1. Worum es in diesem Dokument geht

Dieses Dokument rekonstruiert, wie der Skill `/archivieren` entstanden ist.

Es geht nicht darum, den aktuellen Skill noch einmal technisch zu dokumentieren. Das steht in:

```text
.claude/skills/archivieren/SKILL.md
docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md
```

Dieses Dokument fragt stattdessen:

```text
Warum brauchten wir diesen Skill überhaupt?
Wie sind wir darauf gekommen?
Welche Irrwege gab es?
Welche Entscheidungen wurden getroffen?
Welche Iterationen waren nötig?
Was wurde verworfen?
Was wurde verbessert?
Was können wir daraus für spätere Projektarbeit lernen?
```

Die Chronik ist Teil des späteren Making-of von Finanzwesir 2.0.

---

## 2. Kurzfassung

Der Skill `/archivieren` entstand nicht aus einem geplanten Skill-Design.

Er entstand aus einer Drift-Erfahrung:

```text
Claude konnte historische Dokumente, alte Peer-Reviews und aktuelle Projektwahrheit nicht zuverlässig auseinanderhalten.
```

Aus dieser Erfahrung entwickelte sich zuerst die Archivstrategie:

```text
Aktive Dateien zeigen, was heute gilt.
Lokale Archive erklären lokale Entstehung.
Root-Archiv erzählt die projektweite Reise.
local/ schützt Git und Claude vor Rohmaterial.
Der Archivvertrag verhindert Kontextdrift.
```

Danach wurde klar:

```text
Diese Archivlogik braucht einen eigenen Arbeitsmodus.
```

Nicht als Anhängsel an `distill`.

Nicht als Zusatzlast im `abschluss-ritual`.

Nicht als ungeplantes manuelles Aufräumen.

Sondern als eigener Skill:

```text
/archivieren
```

Der Skill macht Claude zum Archivsekretär:

```text
sammeln
klassifizieren
vorschlagen
Freigabe einholen
umsetzen
Git-Status prüfen
an Albert übergeben
```

Der wichtigste Lernpunkt:

```text
Archivieren ist keine Aufräumhandlung.
Archivieren ist kuratierte Kontext-Hygiene.
```

---

## 3. Vorgeschichte: Das Problem lag nicht im Archiv

Der Ursprung lag gar nicht beim Archiv.

Der unmittelbare Auslöser war die Diskussion um die App-Fabrik und die Chart-Integration. Claude behandelte Charts wiederholt so, als seien sie ein Sonderfall: historisch hervorgehoben, eigenständiger App-Typ, möglicherweise eigene Adapterlogik.

Dagegen entstand die zentrale Architekturmetapher:

```text
Die App ist das Board.
Die Komponenten sind die Steine.
Engines und Renderer sind Spezialwerkzeuge.
```

Daraus wurde die Component Composition Architecture.

Diese Architekturentscheidung war fachlich geklärt, aber Claude fiel später trotzdem wieder auf alte Denkpfade zurück:

```text
C1/C2/C3-Optionslogik
FwAppChart als implizite Lösung
Chart als Sonderfall statt Komponente
historische Peer-Review-Argumente als aktuelle Entscheidungsgrundlage
```

Das zeigte:

```text
Das Problem war nicht nur eine falsche Antwort.
Das Problem war die fehlende Trennung von aktueller Wahrheit und historischer Herleitung.
```

---

## 4. Der erste große Wendepunkt: Archivstrategie statt Warnschilder

Die erste intuitive Lösung war:

```text
Historische Dokumente mit Warnhinweisen versehen.
```

Zum Beispiel:

```text
Dieses Dokument darf nicht als Optionsmatrix verwendet werden.
Es liefert nur historische Argumente.
```

Das war besser als nichts, aber es löste das Problem nicht vollständig.

Warum?

```text
Ein historisches Dokument bleibt im aktiven Leseraum.
Es enthält oft konkrete, starke Formulierungen.
Claude kann diese später wieder höher gewichten als die abstraktere neue Regel.
```

Die entscheidende Erkenntnis:

```text
Aktive Projektdateien dürfen nicht gleichzeitig Arbeitsvertrag und historisches Museum sein.
```

Daraus entstand die Grundtrennung:

```text
Aktive Dateien:
Was gilt heute?

Archiv:
Was war lehrreich, ist aber nicht mehr handlungsleitend?

Git:
Wie hat sich alles verändert?
```

---

## 5. Der zweite Wendepunkt: Archiv ist nicht nur Hygiene, sondern Making-of

Zunächst war Archiv nur als Schutz gedacht:

```text
Archiv = raus aus Claudes aktivem Arbeitsfenster
```

Dann wurde sichtbar:

```text
Diese Irrwege, Reviews, Entscheidungen und Nachputze sind später wertvoll.
```

Nicht als operative Regeln, sondern als Rohmaterial für ein späteres Making-of der Finanzwesir-Website.

Der Gedanke änderte sich:

```text
Nicht nur:
Wie verhindern wir Drift?

Sondern auch:
Wie können wir später verstehen, warum diese Website so entstanden ist?
```

Damit wurde Archiv doppelt wichtig:

```text
1. Kontext-Hygiene für die Gegenwart.
2. Produktionsarchiv für spätere Rekonstruktion.
```

Diese Erweiterung war ein strategischer Pivot.

---

## 6. Der dritte Wendepunkt: Nicht alles zentralisieren

Der nächste Reflex war:

```text
Alles Alte ins Root-Archiv.
```

Das war ordentlich, aber zu grob.

Durch Peer-Review und weitere Analyse entstand eine bessere Sicht:

```text
Lokale Archive sind nicht automatisch Wildwuchs.
Kontextnähe ist ein Wert.
```

Ein App-Archiv erklärt eine App.

Ein Spec-Archiv erklärt eine Spezifikation.

Ein Design-System-Archiv erklärt das Design-System.

Würde man alles ins Root-Archiv saugen, ginge Kontext verloren.

Daraus entstand das föderierte Archivmodell:

```text
Keine Massenkonsolidierung.
Keine ungeregelte Dezentralität.
Föderiertes Archivmodell mit zentralem Vertrag.
```

Leitformel:

```text
Lokale Archive erklären lokale Entstehung.
Root-Archiv erzählt die projektweite Reise.
local/ schützt Git und Claude vor Rohmaterial.
Der Archivvertrag verhindert Kontextdrift.
```

---

## 7. Warum daraus ein Skill werden musste

Nach AP 3 bis AP 9 war die Archiv-Grundarchitektur arbeitsfähig:

```text
AP 3 — föderiertes Archivmodell
AP 4 — Archivvertrag
AP 5 — Inventar
AP 6 — legacy-map
AP 7 — lokale Archiv-READMEs
AP 8 — Making-of-Rahmen
AP 9 — Pilotdurchlauf
```

Aber damit war nur die Infrastruktur gebaut.

Noch fehlte die Bedienlogik.

Die Frage war:

```text
Wie wird Archivierung künftig ausgelöst?
Wie arbeitet Claude damit?
Wie verhindern wir, dass Archivieren wieder zu ungeordnetem Aufräumen wird?
```

An dieser Stelle entstand der Bedarf für einen eigenen Skill.

---

## 8. Die falschen Alternativen

### 8.1 Distill aufbohren

Eine naheliegende Idee war:

```text
Können wir distill zum Archivskill machen?
```

Das wurde verworfen.

Warum?

```text
Distill verdichtet Lernstrom.
Archivieren kuratiert historische Artefakte.
```

Distill fragt:

```text
Welche Muster sollen künftige Sessions besser machen?
```

Archivieren fragt:

```text
Welche Materialien gehören wohin, damit sie später nutzbar bleiben und heute nicht stören?
```

Das sind verwandte, aber nicht identische Aufgaben.

### 8.2 Kassensturz aufbohren

Auch `kassensturz` war verwandt.

Aber:

```text
Kassensturz prüft Projektstand und Tendenz.
Archivieren behandelt historische Materialien.
```

Kassensturz zeigt:

```text
Wo stehen wir?
```

Archivieren fragt:

```text
Was aus dem vergangenen Erkenntnisstrom muss gesichert, klassifiziert oder aus dem aktiven Kontext entfernt werden?
```

Auch das wurde getrennt.

### 8.3 Abschlussritual erweitern

Das war die gefährlichste Versuchung.

Das Abschlussritual ist ohnehin tokenintensiv und läuft oft am Ende eines vollen Kontextfensters.

Eine Archivlogik dort einzubauen hätte bedeutet:

```text
noch mehr Last
noch mehr Risiko bei Kompaktierung
noch mehr Dinge am Ende eines ohnehin langen Arbeitstasks
```

Deshalb wurde entschieden:

```text
Kein Archiv-Hook im Abschlussritual.
Kein Mini-Hook.
Kein automatischer Archivcheck.
```

Start und Abschlussritual gehören zu einer anderen Taskgruppe:

```text
/start:
Claude in definierten Zustand versetzen.

abschluss-ritual:
Aufgabe sauber abbauen und Endzustand herstellen.
```

Archivieren ist ein eigener Arbeitsmodus.

---

## 9. Die Grundentscheidung: Claude als Archivsekretär

Der zentrale Rollenwechsel lautete:

```text
Claude ist beim Archivieren nicht freier Aufräumer.
Claude ist Archivsekretär.
```

Das bedeutet:

```text
Claude sammelt.
Claude sichtet.
Claude klassifiziert.
Claude schlägt vor.
Claude arbeitet abschnittsweise.
Claude wartet auf Freigabe.
Claude dokumentiert, was nicht übernommen wurde.
```

Das war entscheidend.

Denn der Skill sollte nicht effizient im Sinne von „macht viel automatisch“ sein.

Er sollte zuverlässig sein.

Die wichtigste Regel:

```text
Vorschlagen ja.
Handeln erst nach Freigabe.
```

---

## 10. SKILL-ARCHIV-01: Spezifikation zuerst

Der erste konkrete AP war:

```text
SKILL-ARCHIV-01 — Skill /archivieren spezifizieren
```

Ziel war ausdrücklich:

```text
nicht bauen
erst spezifizieren
```

Die Spezifikation sollte klären:

```text
Zweck
Abgrenzung
Trigger
Arbeitsphasen
Klassifikationslogik
Zielorte
Freigabe-Gates
Git-Sicherheit
Output-Formate
Harte Grenzen
Zusammenspiel mit distill, kassensturz, start und abschluss-ritual
```

Claude erstellte eine Spezifikation unter:

```text
docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md
```

Diese Spezifikation war im Kern gut, brauchte aber Nachschärfung.

---

## 11. Erste Nachschärfung der Spezifikation

In der ersten Version gab es offene Punkte:

```text
Soll /start archivierungswürdige Dinge erkennen?
Soll Abschlussritual /archivieren vorschlagen?
Wie streng ist „das soll ins Making-of“ als Trigger?
Darf local/ automatisch angelegt werden?
```

Die Entscheidungen:

```text
Kein automatischer /start-Hook.
Kein automatischer Abschlussritual-Hook.
Claude darf /archivieren nur vorschlagen, wenn Albert Archivwürdigkeit erwähnt oder eindeutig Rohmaterial/Belegmaterial entstanden ist.
local/-Ordner nur nach expliziter Freigabe im Block oder gesondertem AP-Auftrag.
Wenn Scope unklar bleibt: kein Schreibzugriff.
```

Damit wurde die Spezifikation abnahmefähig.

---

## 12. SKILL-ARCHIV-02: Skill bauen

Danach wurde der Skill gebaut:

```text
.claude/skills/archivieren/SKILL.md
```

Die erste Skill-Datei enthielt die gewünschte Struktur:

```text
Trigger
Zweck
Wann verwenden?
Nicht verwenden für
Verbindliche Quellen
Phasen 0–6
Klassifikationskategorien
Zielorte
Freigabe-Gates
Git-Sicherheit
Harte Grenzen
Zusammenspiel mit anderen Skills
Subagent / Scout
Abschlussformat
```

Das war ein wichtiger Fortschritt.

Der Skill war grundsätzlich brauchbar.

Aber der erste Praxistest zeigte eine Fehlannahme.

---

## 13. SKILL-ARCHIV-03: Der Praxistest

Der Skill wurde an einem echten, aber begrenzten Fall getestet.

Material lag in:

```text
Archiv/local/muss noch eingeordnet werden/
```

Daraus wurden kuratierte Dateien in das Root-Archiv überführt:

```text
Archiv/Peer Review Arbeitspakete/
```

Der Skill durchlief:

```text
Phase 0–2 — Scope, Quellen, Klassifikation
Gate 1 — Klassifikation freigegeben
Gate 2 — KAPITELRAHMEN-Inhalt vor Schreiben gezeigt
Gate 3 — Git-Status geprüft
Gate 4 — Freigabe
Phase 6 — Abschlussbericht
```

Der Test zeigte:

```text
Der Skill funktioniert.
Die Phasenlogik trägt.
Die Blockfreigabe funktioniert.
Die Klassifikationen sind nutzbar.
```

Aber es zeigte sich auch:

```text
Der Skill hatte noch Staging-Logik.
```

---

## 14. Der wichtige Praxisfund: Claude soll nicht stagen

Im Testlauf wurde klar:

```text
Claude muss nicht stagen.
```

Alberts tatsächlicher Workflow lautet:

```text
Claude erzeugt oder verschiebt Dateien.
Claude prüft Git-Status.
Claude zeigt, was passiert ist.
Albert sieht alles in VSCode.
Albert staged und committet selbst.
```

Die ursprüngliche Skill-Logik enthielt aber:

```text
Gate 4 — Gezieltes Staging
Nur gezieltes Staging
Claude zeigt, was gestagtet wird
```

Das war nicht katastrophal, aber falsch.

Warum?

```text
Es verschiebt Verantwortung an Claude,
obwohl Albert die finale Git-Kontrolle selbst behalten will.
```

Daraus entstand SKILL-ARCHIV-04.

---

## 15. SKILL-ARCHIV-04: Staging raus, Übergabe rein

Der Skill wurde angepasst:

```text
Gate 4 — Übergabe an Albert
Kein Staging durch Claude
Staging und Commit übernimmt Albert in VSCode oder Git
```

Phase 5 wurde geändert von:

```text
Nur gezieltes Staging
```

zu:

```text
Übergabe an Albert vorbereiten
```

Gate 4 zeigt jetzt:

```text
welche Dateien neu sind oder geändert wurden
welche Dateien unter Archiv/local/ liegen und deshalb nicht im Git-Status erscheinen sollten
ob Archiv/local/ sauber gitignored bleibt
welche Dateien Albert in VSCode prüfen und selbst stagen kann
```

Die Verbote bleiben:

```text
git add .
git add -A
git add Archiv/
```

Aber nicht mehr als „Claude darf gezielt stagen“, sondern als Sicherheitsgrenze:

```text
Claude verwendet diese Befehle nicht.
```

Das war eine wichtige Reifung des Skills.

---

## 16. Die Eingangsschublade

Im Testlauf entstand außerdem eine praktische Erkenntnis:

```text
Es gibt kuratiertes oder halbkuratiertes Material,
das schon gut genug ist, um später eingeordnet zu werden,
aber noch keinen endgültigen Archivort hat.
```

Dafür entstand die Eingangsschublade:

```text
Archiv/local/muss noch eingeordnet werden/
```

Wichtig:

```text
Das ist keine Zielstruktur.
Das ist kein heiliger Gral.
Das ist keine dauerhafte Archivschicht.
```

Es ist nur:

```text
erste Prüfstelle, wenn Albert keinen konkreteren Scope nennt
```

Der Skill erhielt die Regel:

```text
Wenn Albert keinen konkreten Pfad nennt und der Auftrag allgemein lautet „archivieren“ oder „sichere diese Erkenntnisreise“, prüfe zuerst Archiv/local/muss noch eingeordnet werden/, sofern vorhanden.
```

Auch hier gilt:

```text
Nichts daraus wird ohne Klassifikation und Blockfreigabe verschoben oder kuratiert.
```

---

## 17. SKILL-ARCHIV-05: Spezifikation nachziehen

Nach SKILL-ARCHIV-04 war die Laufzeitdatei korrekt, aber die Spezifikation enthielt noch alte Staging-Logik.

Das war Dokumentationsdrift.

Kein Laufzeitblocker, aber gefährlich für spätere Reviews und Weiterentwicklung.

Deshalb wurde SKILL-ARCHIV-05 durchgeführt:

```text
docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md
```

wurde an den Laufzeit-Skill angepasst:

```text
Gate 4 — Übergabe an Albert
Kein Staging durch Claude
Albert staged und committet selbst
Eingangsschublade ergänzt
```

Damit waren Skill und Spezifikation wieder synchron.

---

## 18. Was sich bewährt hat

### 18.1 Spezifikation vor Implementierung

Gut war:

```text
erst SKILL-ARCHIV-01
dann SKILL-ARCHIV-02
```

Die Spezifikation zwang zur Klärung von:

```text
Zweck
Grenzen
Trigger
Freigaben
Git-Sicherheit
Abgrenzung zu bestehenden Skills
```

Ohne diesen Schritt wäre der Skill wahrscheinlich zu monolithisch oder zu unklar geworden.

### 18.2 Testlauf vor breiter Nutzung

Der Praxistest war entscheidend.

Er zeigte zwei Dinge, die in der Theorie nicht scharf genug sichtbar waren:

```text
1. Claude soll nicht stagen.
2. Es braucht eine Eingangsschublade.
```

Das ist ein Muster für künftige Skills:

```text
bauen
klein testen
nachschärfen
Spezifikation synchronisieren
```

### 18.3 Trennung von Arbeitsmodi

Gut war auch die harte Trennung:

```text
distill ≠ archivieren
kassensturz ≠ archivieren
abschlussritual ≠ archivieren
```

Dadurch blieb das Abschlussritual geschützt.

### 18.4 Freigabe pro Block

Die Blockfreigabe ist ein guter Kontrollmechanismus.

Sie verhindert:

```text
monolithische Archivierung
übergriffiges Verschieben
versehentliches Git-Chaos
```

---

## 19. Was schlecht oder riskant war

### 19.1 Zu frühe Staging-Annahme

Die erste Skill-Version enthielt noch die Annahme:

```text
Claude staged gezielt.
```

Das passte nicht zum realen Workflow.

Lernpunkt:

```text
Bei Git-Fragen muss früh geklärt werden:
Wer staged?
Wer committet?
Wer trägt finale Verantwortung?
```

### 19.2 Spezifikation driftete nach Laufzeitänderung

Nach SKILL-ARCHIV-04 war der Skill richtig, aber die Spezifikation alt.

Das zeigt:

```text
Wenn Laufzeitverhalten geändert wird,
muss die Spezifikation sofort oder zeitnah nachgezogen werden.
```

Sonst entsteht eine zweite Wahrheit.

### 19.3 Der Skill hätte zu leicht überautomatisieren können

Mehrere Stellen hätten in Richtung Automatik kippen können:

```text
/start-Hook
abschlussritual-Hook
automatische Archivierung nach AP-Ende
automatisches local-Anlegen
automatisches Staging
```

Diese Pfade wurden bewusst verworfen.

Das war richtig.

---

## 20. Was verworfen wurde

Verworfen wurden:

```text
Distill zum Archivskill machen
Kassensturz zum Archivskill machen
Archivlogik ins Abschlussritual einbauen
Mini-Hook im Abschlussritual
automatischer /start-Archivcheck
automatischer Archivvorschlag nach jeder Session
Claude-staged-selbst-Workflow
Massenkonsolidierung als Skillaufgabe
Sonderfalllogik in Version 1
vollständige Belegnotiz-Vorlage im Skill
```

Jede dieser Entscheidungen reduzierte Komplexität.

---

## 21. Der endgültige Skill-Zustand

Der Skill `/archivieren` ist jetzt:

```text
ein eigener Skill
kein Aufräumroboter
kein Abschlussritual-Anhang
kein Git-Staging-Werkzeug
kein Massenkonsolidierer
```

Er ist:

```text
ein kuratierender Archiv-Workflow mit Freigabegates
```

Er arbeitet in Phasen:

```text
0 Scope klären
1 Quellen sammeln
2 Material klassifizieren
3 Archivierungsvorschlag
4 Freigabe pro Block
5 Umsetzung nach Freigabe
6 Abschlussbericht
```

Er kennt die Kategorien:

```text
RAW
HIST
ERSETZT
POSTMORTEM
MAKING_OF_BELEG
LOKALER_KONTEXT
ROOT_KURATION
SONDERFALL
ZU_PRUEFEN
```

Er kennt die Zielorte:

```text
Archiv/local/
Archiv/local/muss noch eingeordnet werden/
Archiv/making-of/
Archiv/[Themeninsel]/
[Subsystem]/Archiv/
aktive Projektdateien
```

Und er übergibt an Albert:

```text
Claude schreibt nicht heimlich.
Claude staged nicht.
Claude löscht nicht.
Claude konsolidiert nicht massenhaft.
Claude arbeitet blockweise mit Freigabe.
```

---

## 22. Was diese Reise über Projektarbeit mit KI zeigt

Der Skill `/archivieren` ist mehr als ein Werkzeug.

Er ist ein Symptom einer reiferen Arbeitsweise.

Am Anfang stand:

```text
Claude driftet, weil historische Dokumente aktiv herumliegen.
```

Am Ende steht:

```text
Das Projekt besitzt einen definierten Mechanismus,
um Erkenntnisströme aus der Arbeit herauszulösen,
zu klassifizieren,
zu sichern,
und später wieder auswertbar zu machen.
```

Das ist eine eigene Projektfähigkeit.

Finanzwesir 2.0 baut damit nicht nur Apps und Ghost-Templates.

Es baut auch:

```text
Kontext-Hygiene
KI-Steuerung
Erinnerungsarchitektur
spätere Rekonstruierbarkeit
```

---

## 23. Was wir beim nächsten Skill wieder so machen sollten

Wiederholen:

```text
erst Spezifikation
dann Implementierung
dann kleiner Praxistest
dann Nachschärfung
dann Spezifikation synchronisieren
```

Ebenfalls wiederholen:

```text
Abgrenzung zu bestehenden Skills früh klären
Trigger hart begrenzen
Autonomie begrenzen
Freigabegates definieren
Git-Verantwortung explizit klären
```

---

## 24. Was wir beim nächsten Mal besser machen sollten

Früher klären:

```text
Wer staged?
Wer committet?
Soll Claude nur übergeben oder selbst Git-Aktionen vorbereiten?
```

Früher testen:

```text
kleiner Praxistest direkt nach erster Skill-Version
```

Spezifikation schneller nachziehen:

```text
Wenn Laufzeit-Skill geändert wird,
sofort prüfen:
Muss die Spezifikation mit?
```

Noch klarer trennen:

```text
Rohmaterial
kuratierte Belege
aktive Regeln
Skill-Laufzeitlogik
Skill-Spezifikation
```

---

## 25. Endurteil

Der Skill `/archivieren` entstand aus echter Notwendigkeit.

Er war nicht geplant, sondern wurde aus einem realen Driftproblem heraus entwickelt.

Die Entwicklung war iterativ, aber die Iterationen waren produktiv:

```text
Problem erkannt
Strategie gebaut
Skillbedarf erkannt
Spezifikation erstellt
Skill gebaut
Praxistest durchgeführt
Staging-Irrtum korrigiert
Eingangsschublade ergänzt
Spezifikation synchronisiert
```

Der Skill ist jetzt einsatzfähig.

Nicht perfekt für alle zukünftigen Sonderfälle, aber robust genug für Version 1.

Die wichtigste Erkenntnis:

```text
Ein guter KI-Workflow braucht nicht nur gute Prompts.
Er braucht Verfahren, die Erkenntnisse aus dem Arbeitsstrom herauslösen,
ohne sie als operative Wahrheit weiter herumliegen zu lassen.
```

`/archivieren` ist genau so ein Verfahren.

---

## 26. Rohmaterial und Bezug

Diese Chronik basiert auf dem Arbeitsfaden zur Archivstrategie und zum Skill `/archivieren`, den daraus entstandenen APs, den Claude-Quittungen und den Nachputzentscheidungen.

Rohmaterial und weitere Belege liegen je nach Stand in:

```text
Archiv/local/
Archiv/local/muss noch eingeordnet werden/
Archiv/making-of/
Archiv/Peer Review Arbeitspakete/
docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md
.claude/skills/archivieren/SKILL.md
```

Diese Chronik ist selbst kein operativer Standard.

Sie ist ein historischer Beleg für spätere Analyse.
