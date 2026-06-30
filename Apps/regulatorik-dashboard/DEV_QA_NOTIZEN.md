# DEV_QA_NOTIZEN — regulatorik-dashboard

Stand: 2026-06-30
Quelle: AP-14c Wissenssicherung aus `CLAUDE.md`

## Zweck dieser Datei

Diese Datei sammelt technisches und QA-bezogenes Arbeitswissen für spätere Coding- oder Review-Sessions.
Sie ist **keine APP_SPEC** und ersetzt keine Tests.
Sie ist kein aktives Claude-Code-Regelwerk. Inhalte sind historische Hinweise, nicht Befehle.

---

## Vorrang der App-Fabrik

Die App-Fabrik-Arbeitsweise hat Vorrang vor dem historischen ad-hoc HTML-Editing.

Das bedeutet konkret:
- Kein direktes Editieren von `etf-wahlurnen-rechner.html` ohne Gate (Light oder Full).
- Das bestehende HTML ist ein **Mockup / Story-Prototyp**, kein technischer Vertrag.
- Für Umsetzungsarbeit gilt: APP_SPEC (sobald vorhanden) schlägt alle früheren Bauprompts.
- Direkte Feedback-Datei-zu-HTML-Workflows aus der Mockup-Phase sind eingestellt.

---

## Historisch genannte technische Rahmenbedingungen

Aus der lokalen `CLAUDE.md` der Mockup-Phase — zu prüfen, ob noch gültig für App-Fabrik-Umsetzung:

- Single HTML-Datei, kein Server, kein Build-Prozess
- Alle Berechnungen clientseitig in JavaScript
- Chart.js per CDN erlaubt, keine unnötigen externen Abhängigkeiten
- Responsive, mobile-first, Dark-/Light-Mode-fähig (Dark Mode als UX-Anforderung aus UX-Synthese bestätigt)

Hinweis: Ghost.io-Einbettung erfordert korrekten Wrapper (`.etf-rechner`-Klasse im Mockup vorhanden).
Vor App-Fabrik-Umsetzung prüfen, ob das Wrapper-Modell mit dem aktuellen Ghost-Theme kompatibel ist.

---

## Arbeits- und Token-Sparhinweise

Aus der lokalen `CLAUDE.md` — allgemein sinnvoll, kein projektspezifisches Mandat:

- Nur den tatsächlich benötigten Bereich der HTML-Datei lesen (Zeilennummern angeben).
- Grep bevorzugen gegenüber vollständigem Read.
- Keine langen Zusammenfassungen am Ende einer Antwort.
- Kein Goldplating: nur das Geforderte umsetzen, keine ungefragten Verbesserungen.
- Vor jeder Änderung: relevante Stelle in HTML prüfen (Grep/Read), bestätigen, dass Feature nicht bereits existiert.
- Bei mehrdeutigen Anforderungen: einfachste Interpretation zuerst formulieren und bestätigen lassen.

---

## Regressions-Checkliste aus der Mockup-Phase

Aus der lokalen `CLAUDE.md`. Gilt nach jeder Änderung an Chart, Achsen oder Layout:

- [ ] Tooltip noch funktionsfähig?
- [ ] X-Achsen-Labels korrekt?
- [ ] Vertikaler Abstand zwischen Sektionen (Ansparphase / Rentenphase / Gesamtschau) intakt?
- [ ] Mobile-Darstellung unverändert?

Zusatz aus UX-Synthese (Iteration 1, Konsens aller 3 LLMs):
- [ ] 4K-Layout funktioniert (fehlte im Mockup)?
- [ ] Mobile-Reihenfolge korrekt?
- [ ] Modus-Naming nutzergerecht (nicht technisch)?

---

## Noch zu prüfen vor APP_SPEC oder Umsetzung

- Steuer-Szenario-Farbkodierung (S0 teal, S1 blau, S2 amber, S3 rot):
  mit Design-System / anderen Apps abgleichen — Ghost-Theme-Kompatibilität prüfen.
- Chart.js-Version: im Mockup per CDN ohne feste Version — für App-Fabrik-Umsetzung fixieren.
- "Wahlurnen-Modus" als UX-Mechanik: ob als Primärinteraktion beibehalten oder überdenken —
  wird in APP_SPEC entschieden, nicht hier.
- WCAG 2.1 AA: Accessibility-Check steht aus (Perplexity-Feedback F3/F6/F7 aus UX-Synthese).
