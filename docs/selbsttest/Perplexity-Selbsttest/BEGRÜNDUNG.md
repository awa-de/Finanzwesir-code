\## Was dieser Selbsttest tut — und warum er funktioniert



Das Grundprinzip kommt aus der Theorie der \*\*endlichen Zustandsmaschinen\*\*: Ein System ist dann nachweislich sicher, wenn jeder erreichbare Zustand einen definierten Rückweg in den Normalzustand hat — und wenn keine Übergänge ins Nichts führen. Das nennt sich \*Transition Coverage\*: jeden Übergang mindestens einmal abgehen. \[dzone](https://dzone.com/articles/finite-state-machines-how-to-enhance-software-test)



Deine CLAUDE.md ist genau das — eine Zustandsmaschine mit 8 benannten Zuständen (MODUS N/R/M/A, Light-Gate, Full-Gate, Abbruch, Warte-auf-Freigabe) und einer Reihe impliziter Zwischenzustände. \[embedded](https://www.embedded.com/developing-state-machines-with-test-driven-development/)



\## Was das Protokoll gefunden hat



\*\*30 Übergänge getestet, 30 bestanden.\*\* Zwei kleine Lücken ohne Sicherheitsrisiko:



1\. \*\*`PROTECTED\_PATHS.json` nicht lesbar\*\* — kein expliziter Fallback. Empfehlung: wie MODUS A behandeln (Zweifel = Abgesichert). Eine Zeile in § 9.



2\. \*\*Subagent-Rekursion\*\* — nicht explizit verboten. Empfehlung: Eine Zeile in `subagent-dispatch.md`: \*„Subagenten spawnen keine weiteren Subagenten. Nur Parent spawnt."\*



\## Wie du den Test wiederholst



In jedem neuen Faden einfach `/self-test` tippen. Claude führt dann die 5-Schritte-Sequenz durch: Zustandsinventur → Transition Coverage → Invarianten-Härtetest → Lückenanalyse → Scorecard. Kein Arbeitspaket, kein Code, keine Dateien berührt. Reine Selbstbeobachtung — 5 bis 10 Minuten.

