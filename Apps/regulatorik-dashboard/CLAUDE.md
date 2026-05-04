# Projekt: ETF-Wahlurnen-Super-App

## Haupt-Artefakt

`etf-wahlurnen-rechner.html` (~960 Zeilen) — einzige produktive Datei, single-file HTML-App für Ghost.io.

## Spec-Master

`Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md` (v5.0) ist die verbindliche Zielbeschreibung. Bei Konflikten zwischen dieser Datei und älteren Prompt-Versionen gilt der Master-Prompt.

## Typischer Workflow

1. Nutzer erstellt eine neue Feedback-Datei (z.B. `UX-Feedback-Runde2.md`)
2. Claude liest die Feedback-Datei und identifiziert alle Änderungsaufgaben
3. Claude wendet die Änderungen auf `etf-wahlurnen-rechner.html` an
4. Neue Datei mit neuem Namen wird **nicht** automatisch erstellt — Änderungen gehen in die bestehende Datei, außer der Nutzer gibt explizit einen neuen Dateinamen vor

## Technische Rahmenbedingungen

- Single HTML-Datei, kein Server, kein Build-Prozess
- Alle Berechnungen clientseitig in JavaScript
- Chart.js per CDN erlaubt, keine unnötigen externen Abhängigkeiten
- Responsive, mobile-first, Dark-/Light-Mode-fähig

---

## Arbeitsregeln (alle drei gleich wichtig)

### 1. Erst prüfen, dann editieren
Bevor ein Feature implementiert oder geändert wird: Grep/Read der relevanten Stelle in `etf-wahlurnen-rechner.html` und bestätigen, dass es nicht bereits existiert. Wenn es existiert: zeigen wo, und fragen ob Modifikation gemeint ist.

### 2. Einfachste Interpretation zuerst
Bei mehrdeutigen Anforderungen: die einfachste Interpretation in einem Satz formulieren und bestätigen lassen, bevor Code geschrieben wird. Keine komplexe Analyse, wenn einfache Logik gemeint sein könnte.

### 3. Batching — max. 4 Änderungen, dann Stop
Feedback-Dateien in Batches von max. 4 Änderungen abarbeiten.
Nach jedem Batch:
- Liste: was wurde erledigt / was steht noch aus
- Regressions-Check: welche angrenzenden Behaviors könnten betroffen sein
- Warten auf "weiter" vom Nutzer

Nicht den nächsten Batch starten, bevor der Nutzer freigegeben hat.

---

## Token-Sparregeln

- Nur den tatsächlich benötigten Bereich der HTML-Datei lesen (Zeilennummern angeben)
- Grep bevorzugen gegenüber vollständigem Read
- Keine langen Zusammenfassungen am Ende einer Antwort
- Kein Goldplating: nur das Geforderte umsetzen, keine ungefragten Verbesserungen

---

## Regressions-Checkliste (nach Chart/Layout-Änderungen)

Nach jeder Änderung an Chart, Achsen oder Layout prüfen:
- Tooltip noch funktionsfähig?
- X-Achsen-Labels korrekt?
- Vertikaler Abstand zwischen Sektionen (Ansparphase / Rentenphase / Gesamtschau) intakt?
- Mobile-Darstellung unverändert?
