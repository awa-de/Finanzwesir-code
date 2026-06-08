# Belegnotiz — Component Composition Architecture

**Zielpfad im Projekt:**  
`Archiv/making-of/07a_component-composition-architecture_BELEGNOTIZ.md`

**Status:** POSTMORTEM / MAKING_OF_BELEG  
**Erstellt:** 2026-06-08  
**Bezug:** Making-of Kapitel 07 — Archivstrategie und Kontext-Hygiene  
**Nicht handlungsleitend:** Aktuelle Regeln stehen in den aktiven Architektur- und Steuerdateien.

---

## 1. Auslöser

Die Diskussion begann nicht als Archivthema.

Ausgangspunkt war die Frage, wie Charts in den Finanzwesir-Apps eingebunden werden sollen. Claude behandelte Charts wiederholt so, als seien sie etwas Besonderes: ein eigenständiger App-Typ, ein Sonderfall oder ein historisch hervorgehobenes Element.

Albert stellte dagegen das grundlegende mentale Modell klar:

```text
App = leere Fläche / Board
Komponenten = Steine
Engines / Renderer = Spezialwerkzeuge, die bestimmte Steine korrekt herstellen
```

Daraus entstand die **Component Composition Architecture**.

---

## 2. Kern der Erkenntnis

Die App-Fabrik ist kein Chart-System.

Sie ist eine Kompositionsfläche.

Charts sind nur eine mögliche Komponente neben anderen Komponenten:

```text
Chart
Map
Card
Control
Text
```

Ein Chart ist wichtig, aber nicht ontologisch höherwertig als andere Komponenten.

Die ChartEngine ist deshalb nicht die App-Fabrik selbst, sondern ein Spezialwerkzeug für Chart-Komponenten.

---

## 3. Lego-Brett-Metapher

Die prägende Metapher war:

```text
Die App ist das Lego-Brett.
Die Komponenten sind die Steine.
Engines und Renderer sind Spezialwerkzeuge, die bestimmte Steine herstellen.
```

Damit wurde ein Drift korrigiert:

```text
falsch:
App = Chart mit Drumherum

richtig:
App = Komposition aus Komponenten
Chart = eine Komponente
```

---

## 4. Bedeutung für OA-02 und Chart-Integration

Diese Erkenntnis änderte die Bewertung von OA-02.

OA-02 durfte nicht mehr als freie C1/C2/C3-Optionsmatrix oder als „FwAppChart implementieren“ behandelt werden.

Die richtige Rahmung wurde:

```text
OA-02 ist eine Chart-Komponenten-Vertragsentscheidung
innerhalb der Component Composition Architecture.
```

Daraus folgte:

```text
ein Renderer
ein Rucksack
konfigurierbare Capabilities
ChartEngine als Single Source of Truth für Charts
```

Die App wählt, was sie braucht. Die ChartEngine bietet das Buffet.

---

## 5. Warum diese Erkenntnis später archivierungsrelevant wurde

Diese Architekturentscheidung zeigte erstmals klar:

```text
Wenn historische Optionen und aktuelle Verträge nebeneinander im aktiven Kontext liegen,
zieht Claude alte Denkpfade wieder nach vorne.
```

Die Component Composition Architecture war beschlossen, aber Claude argumentierte später wieder mit alten Optionen wie C1/C2/C3 oder FwAppChart.

Das war kein einzelner Claude-Fehler, sondern ein Strukturproblem:

```text
historische Dokumente
+
aktive Dokumente
+
fehlende Archivgrenze
=
Kontextdrift
```

---

## 6. Ergebnis

Aus der Component-Composition-Diskussion entstand ein Projektfortschritt auf zwei Ebenen:

```text
1. Architektur:
   Apps sind Komponentenkompositionen.

2. Projektsteuerung:
   Historische Denkpfade müssen aus dem aktiven Arbeitskontext heraus,
   ohne als Lernmaterial verloren zu gehen.
```

Diese Belegnotiz dokumentiert den ersten Wendepunkt der Reise.

---

## 7. Nicht handlungsleitend

Diese Datei ist historisch-erklärend.

Aktuelle Regeln zur App-Fabrik, Component Composition Architecture, ChartEngine-Integration und OA-02 stehen in den aktiven Spezifikations- und Steuerdateien.

Claude darf diese Datei nicht als aktuellen Implementierungsauftrag interpretieren.
