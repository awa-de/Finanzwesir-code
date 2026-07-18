# AP-app-fabrik-06 — Psychosprint-Grundprompt

**Zweck:** Modellneutraler Kernprompt für die erste psychologische Konzeptarbeit einer App-Fabrik-App.

**Teilnehmer:** Sol, Opus, Fable und Gemini 3.1 Pro in Perplexity.  
**Regel:** Jeder Teilnehmer erhält diesen Wortlaut und exakt dasselbe Eingabepaket. Thinking/Reasoning jeweils auf die höchste verfügbare Stufe stellen. Es werden keine weiteren Dateien, Webseiten, frühere Entwürfe oder Modellantworten benutzt.

---

## Prompt — ab hier vollständig und unverändert kopieren

Du führst einen Psychosprint für eine Finanzwesir-App durch.

Dein Auftrag ist nicht, eine technisch korrekte App, eine APP_SPEC, Code, eine Komponentenbibliothek oder ein fertiges Mockup zu bauen. Dein Auftrag ist, eine psychologisch wirksame App-Idee zu entwickeln, die später als interaktives Happy-Path-Mockup getestet werden kann.

Arbeite ausschließlich mit dem eingefrorenen Eingabepaket am Ende dieses Prompts. Nutze weder Webrecherche noch zusätzliche Dateien, Vorwissen über das Projekt oder frühere Entwürfe. Führe deine ausführliche Analyse intern aus; gib nur das unten verlangte Ergebnis aus.

## Arbeitsregeln

1. Der Steuerungsblock ist die fachliche Obergrenze. Seine Nicht-Ziele sind harte Verbote. Eine gute Idee, die ein Nicht-Ziel verletzt, ist verworfen.
2. Suche die eine innere Bewegung, durch die der falsche Glaubenssatz des Nutzers im Happy Path fällt. Erfinde keine Funktionsliste.
3. Optik und Verhalten sind Teil der Wirkmechanik. Beschreibe deshalb konkrete sichtbare Zustandswechsel, Informationsreihenfolge, Interaktionen, räumliche Gewichtung und den entscheidenden Moment. Beschreibe keinen Code.
4. Neue UI-Mechaniken sind erlaubt und erwünscht, wenn sie die psychologische Wirkung verbessern. Nenne sie klar und erkläre ihre Wirkung. Das Fehlen einer bestehenden Bibliothekskomponente ist kein Gegenargument.
5. Das spätere Mockup darf technische Datenwege, Berechnungen und Texte simulieren. Es darf jedoch keine psychologisch wirksame Beweis- oder Erlebnisbasis erfinden. Kennzeichne daher alles, was echte Daten, echte Quellen oder redaktionelle Bestätigung braucht.
6. Konzentriere dich auf den Happy Path. Fehler-, Leer-, Lade-, Sicherheits-, A11y-, Integrations- und Produktionszustände gehören nicht in diesen Sprint.
7. Keine Beschämung, keine Produktwerbung, keine Scheingenauigkeit und keine versteckte Anlageempfehlung, soweit der Steuerungsblock sie nicht ausdrücklich erlaubt.
8. Stelle keine Rückfragen. Wenn die Angaben für die Wirkungsidee reichen, triff eine eng begrenzte Annahme und markiere sie. Fehlt ein Pflichtfeld des Steuerungsblocks oder widerspricht er sich, gib ausschließlich den Abschnitt „Stopp wegen Eingabemangel“ aus.

## Ergebnisformat

Antworte auf Deutsch. Verwende exakt diese Abschnitte und keine Vorrede.

# Psychosprint — [App-Name]

## 1. Wirkungshypothese

Maximal zwei Sätze: Welche innere Bewegung durchläuft der Nutzer, und an welchem sichtbaren Moment fällt die Barriere?

## 2. Psychologischer Kern

- Falscher Glaubenssatz, den die Idee angreift:
- Warum der bisherige, naheliegende App-Ansatz vermutlich nicht reicht:
- Zentraler Wirkhebel dieser Idee:
- Was der Nutzer am Ende aus eigener Erfahrung sagen können soll:

## 3. Happy Path als Erlebnisfolge

Beschreibe vier bis sieben aufeinander folgende Momente. Für jeden Moment:

- Nutzerhandlung oder Auslöser
- Sichtbarer Zustand und zentrale Information
- Beabsichtigte innere Reaktion
- Warum genau dieser Moment vor oder nach dem nächsten kommt

## 4. Signaturmechanik und Gestaltung

Beschreibe die eine zentrale, erinnerbare UI-Mechanik. Falls sie neu ist, gib ihr einen klaren Arbeitsnamen.

- Aussehen: Hierarchie, Flächen, Kontrast, Bewegung, räumliche Anordnung
- Verhalten: direkte Reaktion auf Eingabe oder Entscheidung, sichtbare Transformationen, Tempo
- Psychologische Funktion: Warum diese Gestaltung die Aussage trägt statt sie nur zu dekorieren
- Mobile zuerst: Was auf einem 375-px-Screen unverzichtbar sichtbar und bedienbar bleibt

## 5. Entscheidungsmoment und nächster Schritt

- Welche Entscheidung oder Selbsteinordnung trifft der Nutzer konkret?
- Wie bleibt eine vorsichtige Entscheidung würdevoll und handlungsfähig?
- Welcher einzelne nächste Schritt ist danach sinnvoll und nicht manipulativ?

## 6. Daten- und Inhaltsfidelität

| Element | Status | Begründung |
|---|---|---|
| [Element] | aus Spec belegt / simuliert / redaktionell zu bestätigen | [warum] |

Führe mindestens alle Elemente auf, deren Echtheit für die Wirkung entscheidend sein könnte. Keine Zahlen, Quellen oder Aussagen als Fakten erfinden.

## 7. Annahmen und Risiken

- Eng begrenzte Annahmen für den Mockup-Test:
- Größtes Risiko, dass die Mechanik psychologisch nicht funktioniert:
- Frühestes beobachtbares Zeichen dieses Scheiterns:
- Was ein späteres Mockup gezielt testen muss:

## 8. Vier-Kriterien-Prüfscore — nur Vorab-Selbstprüfung

Bewerte ausschließlich diese vier vorhandenen Kriterien jeweils mit 0, 1 oder 2 und begründe jeden Wert in einem Satz:

| Kriterium | Wert | Begründung |
|---|---:|---|
| Barriere-Abbau | | |
| Zielzustand | | |
| Nicht-Ziele | | |
| Mentorrolle | | |

Wenn „Nicht-Ziele“ nicht 2/2 sind oder die Summe höchstens 5/8 beträgt, erkläre die Idee für verworfen. Dieser Selbstcheck ist keine Freigabe und ersetzt keine menschliche Wirkungsprüfung.

---

## Eingefrorenes Eingabepaket — hier vor jedem Durchlauf vollständig einsetzen

```markdown
[Hier unverändert die vollständige MINI_SPEC_FROM_HAUPTDOKUMENT.md der konkreten App einfügen.]
```

## Prompt — Ende

---

## Anwendung

1. Für jeden der vier Teilnehmer eine neue, leere Unterhaltung verwenden.
2. Den vollständigen Prompt einschließlich der konkreten Mini-Spec einfügen.
3. Bei Opus trotz Dateizugriff keine zusätzlichen Projektdateien öffnen lassen; Vergleichsgrundlage ist ausschließlich das eingefrorene Paket.
4. Die vier Ergebnisse unverändert sichern und für die spätere qualitative Gegenkritik anonymisieren. Grok 4.5 mit Thinking sieht erst die anonymisierten Ergebnisse, nicht diesen Auswahlprozess.

**Nicht Bestandteil dieses Prompts:** Mockup-Bau, APP_SPEC, technische Implementierung, Komponentenentscheidung, Auswahl eines Gewinners oder eine Produktfreigabe.
