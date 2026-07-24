Stand: 2026-07-24 | Session: spec-visueller-trace-nachweis | Geändert von: Claude

# Patch-Quittung | spec-visueller-trace-nachweis | 2026-07-24

**Beauftragt:** `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` um zwei aus dem b-fable-Piloten abgeleitete Preflight-/Sichtnachweisregeln (neuer Abschnitt 6.1) ergänzen und die überholten „noch nicht umgesetzt“/„gesperrt“-Aussagen zu AF-GM-02/02b/02c/03/04 auf den realen Umsetzungsstand korrigieren. Reiner Spec-AP, keine Änderung an Werkzeugen, Schema, Recorder oder einer App. Auftragsquelle: `Archiv/local/muss noch eingeordnet werden/PROMPT_CLAUDE_APP_FABRIK_VISUELLER_TRACE_NACHWEIS_SPEC_V1.md`.

**Geändert:** 1 Datei, 7 Stellen (1 Kopfzeilen-Datum, 1 neuer Abschnitt 6.1, 2 Umsetzungsstand-Ersetzungen (Kap. 6, Kap. 9), 1 Pflichtbeleg-Kürzung (Kap. 10), 3 Tabellenzeilen + 1 Wortänderung (Kap. 12))

**Dateien:**
- `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md`

**CHANGED/NEW:** N/A — Markdown-Spec-Patch, keine Code-Marker nötig.

**Tabu-Check:** `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` stand auf `forbidden` in `.claude/PROTECTED_PATHS.json`. Unlock-AP durchgeführt (Status auf `protected` mit Grund/Solländerung/Rückbauplan gesetzt), Write ausgeführt, danach Relock-AP (Status zurück auf `forbidden`). `git diff` auf `.claude/PROTECTED_PATHS.json` nach Relock leer — Unlock/Relock neutralisiert sich, keine Netto-Änderung an der Schutzdatei. `MOCKUP-VERTRAG.md`, Decision Log, README, Recorder/Verifizierer, Schema, Tests, Acceptance, Snapshot, Trace, Screenshots, App-/Theme-/Registry-Code, `.claude`-Regelwerk sonst, Ghost-Dateien unangetastet.

**Gate-Typ:** Full (`/spec-rewrite-guard` inklusive ENTFERNT/HINZUGEFÜGT/BEGRÜNDUNG + Prinzipien-Check sichtbar durchlaufen, Alberts explizites OK erhalten).

**Reale Befunde:**

| Prüfung | Ergebnis |
|---|---|
| Grep `AF-GM-02, noch nicht umgesetzt` | 0 Treffer |
| Grep `Bis AF-GM-02 existiert` | 0 Treffer |
| Grep `AF-GM-03, noch nicht umgesetzt` | 0 Treffer |
| Grep `Bis dahin ist` | 0 Treffer |
| Grep `### 6.1 Visueller Aufnahme-Preflight und Wirkungsnachweis` | genau 1 Treffer (Zeile 107) |
| Vollständiger Re-Read der geänderten Spec gegen den Auftrag | alle 5 Sollstellen aus Auftrag Abschnitt „Bindende Sollaenderung“ bestätigt deckungsgleich |
| `git diff --check -- docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` | 1 Warnung: vorbestehende trailing whitespace in Zeile 5 (`**Stand:**`-Zeile, Markdown-Zeilenumbruch-Konvention mit zwei Leerzeichen) — identisches Muster bereits in der Vorversion vorhanden, nur der Datumswert wurde geändert; kein neu eingeführter Stilbruch |
| `git status --porcelain` Scope-QA | nur `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` (+ `session-log.md` aus dem vorgelagerten `/start`, nicht Teil dieses Patches) |

**Bekannte Restabweichung:** keine.

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 7 Stellen in 1 Datei geändert. Aufzählen? Nein — vollständig oben dokumentiert.

→ Bitte lies die geänderte Spec (`docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md`) einmal quer. Kein automatischer Testfall möglich (reiner Doku-Text) — Bestätigung ist inhaltlich (stimmt der neue §6.1-Wortlaut und der Umsetzungsstand?), nicht funktional. Ich warte vor dem nächsten Patch. Kein Commit, kein Push, kein Ghost-Upload.
