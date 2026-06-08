# Übergabeprompt: Finanzwesir 2.0 — Phase 7
Stand: 2026-05-02 00:00 | Aufgabe: Gehirn iterieren (Peer-Review-Findings umsetzen)

---

## Token-Regeln (PFLICHT — immer einhalten)

- Dateien erst lesen wenn konkret gebraucht — nie vorsorglich
- Vor jeder Leseoperation: 1 Satz warum sie nötig ist
- **Fragen als Ja/Nein formulieren — kein Prosa**
- Vorhaben ankündigen → Albert bestätigt → dann handeln
- offset+limit bei großen Dateien — nie ganz lesen
-Chunk-weise abarbeiten, wenn ein Abschitt fertig ist /clear oder /compact anbieten 
- Keine rekursiven Ordner-Scans — eine Ebene nach der anderen
- PowerShell-Ausgaben eingrenzen (Select-Object, Format-Table)

---

## Kontext (steht alles hier — NICHT nachschlagen)

Albert Warnecke (Finanzwesir), Ghost.io, Einpersonen-Projekt, KI-first.
Arbeitsverzeichnis: `z:\Documents\Nextcloud\Finanzwesir 2.0\`
Dev: VSCode + Live Server, Live-Server-Root ist `Theme/`
Kein Backend, kein Build-Prozess.

### Was Phase 6 abgeschlossen hat

Phase 6 ist vollständig erledigt (2026-05-02). Das Projekt hat jetzt ein "Gehirn":

- `.claude/` liegt am Projektroot → CLAUDE.md wird automatisch geladen ✅
- `docs/` zentral am Projektroot: `steering/` + `spec/` + `design-system/` + `editorial/` ✅
- `Theme/` ist jetzt code-only (kein `docs/` mehr) ✅
- CLAUDE.md erweitert: §7 Abschluss-Ritual + §8 Commit-Template ✅
- NAVIGATION.md alle Pfade aktuell ✅
- `docs/steering/SYSTEM-DESIGN.md` beschreibt das Gehirn (neu in Phase 6) ✅

Details: `Aufraeum-Analyse.md` → Abschnitt "Was in Phase 6 erledigt wurde"

---

## Aufgabe dieser Session

Albert hat `docs/steering/SYSTEM-DESIGN.md` und
`docs/MIGRATION-ARCHITEKTUR-ENTSCHEIDUNGEN.md` drei LLMs zum Peer-Review gegeben.
Die Findings liegen vor  unter `\docs\Verbesserung Migration\CHATGPT - MASTERPLAN_Projektgehirn_Finanzwesir_2_0_Synthese_Claude.md`
NUr diese Datei ist relevant.
**Ziel:** Das Gehirn auf Basis der Peer-Review-Findings verbessern (Iteration 2).

### Startsequenz

1. Albert postet die Peer-Review-Findings
2. Claude liest (erst dann, nicht vorher):
   - `docs/steering/SYSTEM-DESIGN.md` (Hauptdokument, offset+limit)
   - `docs/MIGRATION-ARCHITEKTUR-ENTSCHEIDUNGEN.md` (Architektur-Begründungen, bei Bedarf)
3. Claude gleicht Findings gegen bestehende Docs ab
4. Claude schlägt konkrete Änderungen vor — **pro Datei, als Diff-Beschreibung**
5. Albert bestätigt pro Änderung → dann umsetzen

### Erwartetes Output

- Überarbeitetes `SYSTEM-DESIGN.md` (oder gezielt ergänzt — Open-Closed-Prinzip gilt)
- Ggf. neue Einträge in `CLAUDE.md` wenn neue universelle Verhaltensregeln entstehen
- Ggf. neuer Abschnitt in `NAVIGATION.md` wenn neue Routing-Pfade nötig

---

## Wichtige Invarianten (nicht anfassen ohne explizite Freigabe)

| Was | Warum |
|-----|-------|
| `Theme/.git` | Trackt Code für Ghost-Deploy |
| `Active Campaign Liste/` | Niemals in Git — sensible E-Mail-Daten |
| Live-Server-Root `Theme/` | Bricht Dev-Workflow |
| Layer 1 der Chart-Engine | Datenfundament aller Charts |
| Architekturprinzipien KDR 1–14 in `docs/spec/` | Nur nach expliziter Entscheidung |

---

## Offene Themen (diese Session löst sie nur wenn Albert es will)

| Thema | Status |
|-------|--------|
| `Basis/Prompts/` → `.claude/` (5 Dateien, ~80% aktuell) | Einzeln prüfen |
| Git: 1 Repo oder 2? (Code vs. Content) | Entscheidung ausstehend |
| `Rechtliche Seiten/` (CLICKY + KOCHREZEPT) | Heimat noch offen |
| Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` | Welche lädt index.html? |
