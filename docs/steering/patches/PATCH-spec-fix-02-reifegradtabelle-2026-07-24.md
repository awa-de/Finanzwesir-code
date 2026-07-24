Stand: 2026-07-24 | Session: spec-fix-02-reifegradtabelle | Geändert von: Claude

# Patch-Quittung | spec-fix-02-reifegradtabelle | 2026-07-24

**Beauftragt:** Zwei nach dem Patch `spec-visueller-trace-nachweis` verbliebene Widersprüche in `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` §12 korrigieren: veralteter Tabellenkopf „Stand nach AF-GM-01“ sowie eine Zeile, die den bereits umgesetzten Protected-Diff-Checker (AF-GM-03) fälschlich mit dem weiterhin offenen Shared-Regression-Checker (AF-GM-05) zusammenfasst. Enger Spec-Korrekturpatch, sonst keine Änderung. Auftragsquelle: `Archiv/local/muss noch eingeordnet werden/PROMPT_CLAUDE_APP_FABRIK_VISUELLER_TRACE_NACHWEIS_SPEC_FIX-02_V1.md`.

**Geändert:** 1 Datei, 2 Stellen (Tabellenkopf §12, letzte Tabellenzeile §12)

**Dateien:**
- `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md`

**CHANGED/NEW:** N/A — Markdown-Spec-Patch, keine Code-Marker nötig.

**Tabu-Check:** `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` stand auf `forbidden`. Unlock-AP (Status → `protected`, Grund/Solländerung/Rückbauplan), Write, sofortiger Relock-AP (Status → `forbidden`). `git diff` auf `.claude/PROTECTED_PATHS.json` danach leer (nur CRLF-Warnung, kein Inhaltsdiff). Kopfbereich, §6/6.1, §9-Text, §10, Werkzeuge, README, Decision Log, frühere Quittungen, App-/Theme-/Registry-Code, Ghost-Dateien unangetastet.

**Gate-Typ:** Full (`/spec-rewrite-guard` mit ENTFERNT/HINZUGEFÜGT/BEGRÜNDUNG + Prinzipien-Check durchlaufen, Alberts „ok“ erhalten).

**Reale Befunde:**

| Prüfung | Ergebnis |
|---|---|
| Neuer Tabellenkopf `\| Baustein \| Aktueller Stand \|` | genau 1 Treffer (Zeile 187) |
| Alte Zeile `Shared-Regression-/Protected-Diff-Checker` | 0 Treffer |
| Neue Zeile `Shared-Regression-Checker \| AF-GM-05 ...` | 1 Treffer (Zeile 193), nennt AF-GM-05 offen + AF-GM-03 für Protected-Diff-Checker |
| §9-Aussage zu AF-GM-03/Protected-Diff-Checker weiterhin vorhanden | Zeile 155, unverändert — Tabelle und §9 drücken jetzt dieselbe Trennung aus |
| `.claude/PROTECTED_PATHS.json` Netto-Diff nach Relock | leer (nur harmlose CRLF-Zeilenend-Warnung, kein Inhaltsdiff) |
| `git diff --check -- docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` | **nicht grün** — Exit-Code 2, 1 Warnung: trailing whitespace Zeile 5 (`**Stand:**`-Zeile). Gegen `HEAD` verifiziert: dieselben zwei abschließenden Leerzeichen bestanden dort bereits (`**Stand:** 2026-07-22  ` mit identischem Whitespace-Muster) — vorbestehender Stilpunkt, durch diesen Patch nicht neu eingeführt und laut Auftrag bewusst nicht repariert (außerhalb Scope) |
| Scope-QA (`git status --porcelain`) | `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` geändert, diese Quittungsdatei neu; `session-log.md` stammt aus dem vorgelagerten `/start`, nicht Teil dieses Patches; `.claude/PROTECTED_PATHS.json` nach Relock nicht in der Änderungsliste (Netto-Diff leer) |

**Bekannte Restabweichung:** `git diff --check` bleibt wegen der vorbestehenden Whitespace-Konvention in Zeile 5 auf Exit-Code 2 — bewusst nicht behoben (außerhalb des engen Fix-02-Scope).

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 2 Stellen in 1 Datei geändert. Aufzählen? Nein — vollständig oben dokumentiert.

→ Bitte lies die beiden geänderten Tabellenstellen (§12) quer. Kein automatischer Testfall möglich (reiner Doku-Text). Ich warte vor dem nächsten Patch. Kein Commit, kein Push, kein Ghost-Upload.
