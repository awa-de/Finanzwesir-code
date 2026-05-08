Stand: 2026-05-03 18:30 | Session: Infrastruktur-Session-Start | Geändert von: Claude

# Definition of Done — Finanzwesir 2.0

**Zweck:** Einheitliche Fertig-Kriterien pro Aufgabentyp.
**Zielgruppe:** Claude und Albert.
**Wann lesen:** Vor Abschluss jeder Aufgabe.
**Wann aktualisieren:** Wenn ein neuer Aufgabentyp entsteht oder ein wiederkehrender Abschlussfehler erkannt wird.
**Gehört hier hinein:** Fertig-Kriterien.
**Gehört nicht hier hinein:** Offene Issues, technische Specs, lange Begründungen.

---

## Allgemeine Definition of Done

Eine Aufgabe ist nur fertig, wenn:

- Ziel erreicht wurde
- Nicht-Ziele nicht versehentlich umgesetzt wurden
- relevante Specs geprüft wurden
- relevante Steering-Dateien geprüft wurden
- Pre-Code-Gate beantwortet wurde
- Tests durchgeführt oder bewusst als nicht möglich markiert wurden
- Regressionen geprüft wurden
- betroffene Dokumentation aktualisiert wurde
- Abschlussritual gemäß `/abschluss-ritual` durchgeführt wurde

Wenn unklar ist, ob Mini oder Voll-Ritual gilt: **Voll gilt.**

---

## Chart-Bugfix

- [ ] Pre-Code-Gate vollständig beantwortet
- [ ] Relevante Spec gelesen (z.B. X-Achse, Y-Achse, Tooltips)
- [ ] `WORKING-FEATURES.md` vor Änderung gelesen
- [ ] Fix auf kleinstmöglichen Scope begrenzt
- [ ] Visuelle Prüfung im Browser (Live Server `127.0.0.1`)
- [ ] Mindestens einen passenden Regressionstest aus `REGRESSION-MATRIX.md` geprüft
- [ ] `KNOWN-ISSUES.md` aktualisiert (AP als erledigt oder neuer Status)
- [ ] `WORKING-FEATURES.md` bei Bedarf ergänzt
- [ ] `KNOWN-ISSUES-SCHLACHTPLAN.md` Tracking-Tabelle aktualisiert

---

## CSS-Änderung

- [ ] `CSS-KONVENTIONEN.md` vor Änderung gelesen
- [ ] Drei-Fragen-Ritual durchgeführt (neue Komponente)
- [ ] Keine Hex-Werte außerhalb Abschnitt 1 (TOKENS)
- [ ] Keine `fw-*` Klassen in `screen.css` definiert oder überschrieben
- [ ] Kein `contain: layout` auf `.financial-chart-module`
- [ ] Visuell geprüft: Mobile (S) + Desktop (L)
- [ ] `DESIGN-SYSTEM-ISSUES.md` aktualisiert

---

## Theme-Template-Änderung

- [ ] `THEME-ASSEMBLY-CHECKLIST.md` konsultiert
- [ ] Kein Ghost-Deploy-Git (`Theme/.git/`) angetastet
- [ ] Live-Server-Root `Theme/` bleibt unverändert
- [ ] Visuelle Prüfung im Browser
- [ ] `THEME-ASSEMBLY-CHECKLIST.md` abgehakt

---

## App-Arbeit

- [ ] `APP-INTERFACE.md` gelesen
- [ ] `SECURITY-BASELINE.md` gelesen
- [ ] Pre-Code-Gate vollständig beantwortet
- [ ] Domain-Lock für `data-csv` geprüft
- [ ] Empty State implementiert
- [ ] `data-options` auf Whitelist begrenzt
- [ ] Keine Nutzerparameter in `innerHTML`
- [ ] Visuelle Prüfung: Erfolgsfall + Fehlerfall

---

## Security-Fix

- [ ] `SECURITY-BASELINE.md` gelesen
- [ ] Angriffsvektor klar beschrieben
- [ ] Fix minimal und gezielt
- [ ] Keine neuen Angriffsflächen eingeführt
- [ ] `SECURITY-AUDIT.md` aktualisiert (falls relevant)
- [ ] Regressionstest durchgeführt

---

## Infrastruktur / Tooling

Gilt für: Hooks, Settings, Slash-Commands, Skills, CLAUDE.md, NAVIGATION.md, Memory-Struktur.

- [ ] Command/Hook feuert und produziert erwartete Ausgabe (manuell verifiziert)
- [ ] `settings.local.json` bleibt valides JSON, bestehende Hooks nicht gebrochen
- [ ] NAVIGATION.md aktualisiert (neue Commands/Skills eingetragen)
- [ ] CLAUDE.md angepasst wenn Verhaltensregel betroffen
- [ ] PRAXIS-ANLEITUNG.md angepasst wenn Nutzungsablauf betroffen
- [ ] MEMORY aktualisiert (neue stabile Infrastruktur-Fakten)
- [ ] Commit-Message erzeugt
- [ ] Test im neuen Faden durchgeführt (Verhalten wie erwartet?)

---

## Content-Arbeit

- [ ] `REDAKTEURS-HANDBUCH Redaktionsleitfaden.md` konsultiert
- [ ] URL-Slug-Regeln eingehalten
- [ ] FAQ-Block vorhanden (4–6 Fragen)
- [ ] `dateModified` aktualisiert
- [ ] Quellenlinks gesetzt

---

## Deploy-Vorbereitung

- [ ] `THEME-ASSEMBLY-CHECKLIST.md` vollständig abgearbeitet
- [ ] Alle offenen `KNOWN-ISSUES.md`-APs mit Deploy-Relevanz geprüft
- [ ] `SECURITY-BASELINE.md` geprüft
- [ ] `PERFORMANCE-ANALYSE.md` geprüft
- [ ] Kein sensibler Pfad in Git aufgenommen (`PROTECTED_PATHS.json`)
