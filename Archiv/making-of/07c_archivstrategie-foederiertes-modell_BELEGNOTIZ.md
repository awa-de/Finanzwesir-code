# Belegnotiz — Archivstrategie und föderiertes Archivmodell

**Zielpfad im Projekt:**  
`Archiv/making-of/07c_archivstrategie-foederiertes-modell_BELEGNOTIZ.md`

**Status:** POSTMORTEM / MAKING_OF_BELEG  
**Erstellt:** 2026-06-08  
**Bezug:** Making-of Kapitel 07 — Archivstrategie und Kontext-Hygiene  
**Nicht handlungsleitend:** Aktuelle Regeln stehen in den aktiven Steuerdateien.

---

## 1. Ausgangspunkt

Die Archivstrategie entstand nicht als geplantes Großprojekt.

Sie entstand aus einem operativen Problem:

```text
Claude vermischte historische Dokumente und aktuelle Projektwahrheit.
```

Zunächst ging es nur darum, Drift zu verhindern.

Dann wurde sichtbar:

```text
Im Projekt existieren viele historische Dokumente, alte Peer Reviews,
Claude-/ChatGPT-/Gemini-/Perplexity-Antworten, Optionsmatrizen,
Zwischenstände und Archivinseln.
```

Diese Materialien waren einerseits gefährlich für den aktiven Kontext, andererseits wertvoll für spätere Rekonstruktion.

---

## 2. Erste Strategie: Zentrales Archiv zur Kontext-Hygiene

Der erste Ansatz war:

```text
Aktive Dateien:
Was gilt heute?

Archiv:
Was war lehrreich, ist aber nicht mehr handlungsleitend?

Git:
Wie hat sich alles verändert?
```

Daraus entstand die Idee eines zentralen Root-Archivs:

```text
Archiv/
```

mit:

```text
INDEX.md
entscheidungswege/
peer-reviews/
llm-diskussionen/
postmortem-material/
local/
```

Ziel war:

```text
historische Dokumente aus dem aktiven Kontext herausnehmen
aber als Lernmaterial erhalten
```

---

## 3. Sicherheitsphase: local/ und Git-Gefahr

Bei der praktischen Umsetzung zeigte sich:

```text
Archiv/ war bisher teilweise ignoriert.
Wenn Archiv/ versionierbar wird, können plötzlich alte Binärdateien,
Roh-Dumps und LLM-Materialien im Git-Status auftauchen.
```

Daraufhin wurde eine Sicherheitsphase eingeschoben:

```text
Archiv/local/ anlegen
Binärdateien dorthin verschieben
LLM-Dumps dorthin verschieben
Rohmaterial dorthin verschieben
Hash-Dubletten prüfen
Git-Status prüfen
kein git add Archiv/
```

Ergebnis:

```text
local/ wurde Quarantäne.
```

Diese Phase zeigte:

```text
Sicherheit vor Ordnung.
Erst Git-Risiken neutralisieren, dann kuratieren.
```

---

## 4. Strategischer Pivot: Archiv als Making-of-Reservoir

Während der Diskussion wurde klar:

```text
Das Archiv ist nicht nur Kontext-Hygiene.
Es ist auch Rohmaterial für das spätere Making-of der neuen Finanzwesir-Website.
```

Das Ziel veränderte sich:

```text
nicht nur:
Was muss aus Claudes Arbeitskontext heraus?

sondern auch:
Wie machen wir später nachvollziehbar, wie diese Website entstanden ist?
```

Neue Zielmetapher:

```text
Archiv = Produktionsarchiv für das spätere Making-of Finanzwesir 2.0
```

Damit wurden auch Irrwege, Peer Reviews, Fehlentscheidungen und Nachputz wertvoll — aber nur, wenn sie kuratiert und nicht operativ missverstanden werden.

---

## 5. Perplexity-Korrektur: Nicht alles zentralisieren

Ein wichtiger Peer-Review-Impuls war:

```text
Dezentrale Archive sind nicht automatisch falsch.
Kontextnähe ist ein Wert.
```

Archive in Sachverzeichnissen entstanden oft aus einem nachvollziehbaren Grund:

```text
Apps/<App>/Archiv/
docs/spec/archiv/
docs/design-system/archiv/
docs/steering/archiv/
docs/App-Fabrik/_archive/
```

Sie erklären lokale Entstehung.

Eine Massenkonsolidierung ins Root-Archiv hätte Kontext zerstört und neuen Aufwand erzeugt.

Daraus entstand die Synthese:

```text
Keine Massenkonsolidierung.
Keine ungeregelte Dezentralität.
Föderiertes Archivmodell mit zentralem Vertrag.
```

---

## 6. Endmodell

Die finale Leitformel lautet:

```text
Lokale Archive erklären lokale Entstehung.

Root-Archiv erzählt die projektweite Reise.

local/ schützt Git und Claude vor Rohmaterial.

Der Archivvertrag verhindert Kontextdrift.
```

Das bedeutet:

```text
Lokale Archive bleiben lokal, wenn sie lokalen Kontext erklären.
Root-Archiv enthält projektübergreifende Kuratierung und Making-of-Belege.
local/ enthält Rohmaterial und bleibt gitignored.
Alle Archive folgen demselben Vertrag.
```

---

## 7. Setup-Serie AP 3 bis AP 9

Die Strategie wurde anschließend in einer Setup-Serie operationalisiert:

```text
AP 3 — föderiertes Archivmodell
AP 4 — gemeinsamer Archivvertrag
AP 5 — Archiv-Inventar
AP 6 — legacy-map / föderierter Archivkatalog
AP 7 — lokale Archiv-README-Markierung
AP 8 — Root-Making-of-Rahmen
AP 9 — erster Pilotdurchlauf
```

Nach AP 9 gilt:

```text
Die Grundarchitektur ist arbeitsfähig.
```

Nicht abgeschlossen sind:

```text
spätere Kuratierung einzelner Archivinseln
spätere local/-Bereinigung
spätere Making-of-Erzählung
weitere Pilotdurchläufe bei Bedarf
```

---

## 8. Was diese Reise zeigt

Diese Reise zeigt einen wichtigen Meta-Fortschritt des Finanzwesir-Projekts:

```text
Das Projekt baut nicht nur Website, Apps und Templates.
Es baut auch eine Arbeitsumgebung,
die mit langer Projektdauer, KI-Drift, historischen Dokumenten
und späterer Rekonstruierbarkeit umgehen kann.
```

Damit ist die Archivstrategie selbst Teil der Projektinfrastruktur.

---

## 9. Nicht handlungsleitend

Diese Datei ist historisch-erklärend.

Aktuelle Regeln stehen in:

```text
docs/steering/ARCHIV-STRATEGIE.md
Archiv/legacy-map.md
Archiv/making-of/README.md
Archiv/making-of/KAPITELRAHMEN.md
lokalen Archiv-READMEs
```

Claude darf diese Datei nicht als aktuelle Projektregel interpretieren.
