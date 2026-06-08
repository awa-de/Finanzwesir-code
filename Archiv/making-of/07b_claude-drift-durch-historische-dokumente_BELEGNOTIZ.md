# Belegnotiz — Claude-Drift durch historische Dokumente

**Zielpfad im Projekt:**  
`Archiv/making-of/07b_claude-drift-durch-historische-dokumente_BELEGNOTIZ.md`

**Status:** POSTMORTEM / MAKING_OF_BELEG  
**Erstellt:** 2026-06-08  
**Bezug:** Making-of Kapitel 07 — Archivstrategie und Kontext-Hygiene  
**Nicht handlungsleitend:** Aktuelle Regeln stehen in den aktiven Steuerdateien.

---

## 1. Auslöser

Nach der Verankerung der Component Composition Architecture zeigte sich ein wiederkehrendes Problem:

Claude respektierte die neue Architektur nicht stabil genug.

Obwohl die aktuelle Linie bereits festgelegt war, tauchten in Claudes Vorschlägen alte Muster wieder auf:

```text
C1/C2/C3-Optionslogik
FwAppChart als implizite Lösung
Chart als Sonderfall statt Komponente
historische Peer-Review-Positionen als aktuelle Entscheidungsgrundlage
```

Das war der sichtbare Drift.

---

## 2. Problemkern

Das Problem war nicht nur, dass Claude „falsch dachte“.

Das Problem war, dass im Projekt mehrere Wissensebenen nebeneinander lagen:

```text
aktive Verträge
historische Peer Reviews
verworfene Optionsmatrizen
Nachputz-Hinweise
alte Warnblöcke
Zwischenstände
```

Für einen Menschen war oft klar:

```text
Das ist historische Herleitung.
Das ist heutiger Vertrag.
```

Für Claude war es nicht immer stabil unterscheidbar.

---

## 3. Warum Warnblöcke nicht ausreichten

Zunächst wurden historische Dokumente mit Warnhinweisen versehen:

```text
Dieses Dokument darf nicht als Optionsmatrix für OA-02 verwendet werden.
Es liefert nur historische Argumente.
```

Das war besser als nichts, aber nicht ausreichend.

Der Grund:

```text
Ein historisches Dokument bleibt im aktiven Such- und Leseraum.
Es enthält oft konkrete, starke Formulierungen.
Claude kann diese Formulierungen später wieder höher gewichten als die abstraktere neue Regel.
```

Warnblöcke entschärfen Drift, aber sie entfernen die Driftquelle nicht aus dem aktiven Kontext.

---

## 4. Erkenntnis

Die entscheidende Einsicht war:

```text
Aktive Projektdateien dürfen nicht gleichzeitig Arbeitsvertrag und historisches Museum sein.
```

Daraus entstand die Trennung:

```text
Aktive Dateien:
Was gilt heute?

Archiv:
Was war lehrreich, ist aber nicht mehr handlungsleitend?

Git:
Wie hat sich alles verändert?
```

Diese Trennung wurde später zum Kern der Archivstrategie.

---

## 5. Warum das für Finanzwesir 2.0 wichtig ist

Finanzwesir 2.0 wird über längere Zeit mit Claude Code, Skills, Commands, Memory, Projektstatus, Backlog und Spezifikationen entwickelt.

Je länger ein solches Projekt läuft, desto größer wird die Gefahr:

```text
alte Entscheidungen
alte Begründungen
alte Alternativen
alte Peer Reviews
alte Aufgabenlogiken
```

bleiben sichtbar und erzeugen neue Drift.

Ohne Archiv-Hygiene wächst der aktive Kontext unkontrolliert.

Das führt langfristig zu:

```text
mehr Fehlentscheidungen
mehr Nachputz
mehr Tokenverbrauch
mehr Unsicherheit
mehr widersprüchlichen Vorschlägen
```

---

## 6. Engineering-Erkenntnis

Der Fehler lag nicht in einem einzelnen Dokument.

Der Fehler lag in der fehlenden Trennung von:

```text
operativer Wahrheit
historischer Herleitung
Rohmaterial
```

Daraus folgte:

```text
Nicht alles löschen.
Nicht alles im aktiven Kontext behalten.
Nicht alles zentral zusammenwerfen.
```

Stattdessen:

```text
föderiertes Archivmodell
zentraler Archivvertrag
lokale Archive für lokalen Kontext
Root-Archiv für projektweite Reise
local/ für Rohmaterial
```

---

## 7. Bedeutung für das Making-of

Diese Drift-Erfahrung ist später erzählenswert, weil sie zeigt:

```text
Das Projekt entwickelte nicht nur Apps.
Es entwickelte seine eigene Arbeitsfähigkeit.
```

Die Archivstrategie entstand nicht abstrakt am Reißbrett.

Sie entstand aus einem realen Fehlerbild:

```text
Claude kam mit historisch gemischter Dokumentation nicht zuverlässig klar.
```

Damit wurde Kontext-Hygiene selbst zu einem Baustein des Projekts.

---

## 8. Nicht handlungsleitend

Diese Datei ist historisch-erklärend.

Aktuelle Routing-Regeln, Archivverträge und operative Projektregeln stehen in:

```text
NAVIGATION.md
docs/steering/ARCHIV-STRATEGIE.md
Archiv/legacy-map.md
lokalen Archiv-READMEs
```

Claude darf diese Datei nicht als aktuelle Arbeitsanweisung verwenden.
