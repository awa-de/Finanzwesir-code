Stand: 2026-07-23 | Session: AF-GM-02c-Evidence | Geändert von: Claude

# Patch-Quittung | AF-GM-02c-Evidence | 2026-07-23

**Beauftragt:** Evidenzdatei für AF-GM-02c gemäß ursprünglichem Auftrag schreiben, nach Alberts Testbestätigung von Fix-02 (README-Doku-Lücke grün). Auftragsquelle: `Archiv/local/muss noch eingeordnet werden/PROMPT_CLAUDE_AF-GM-02C_TARGET_REPLAY_V1.md` (Abschnitt „Nachweise" + Patchfolge-Regel).

**Geändert:** 1 Datei, 1 Stelle

**Dateien:**
- `tests/golden-master/evidence/AF-GM-02C-NACHWEISE.md` (neu)

**CHANGED/NEW-Markierungen:** N/A — reine Markdown-Evidenzdatei.

**Inhalt (nur reale Befunde, alle in dieser Session real ausgeführt):**
- Positivnachweis: Spur `minimal-normal` gegen lokales HTTP-Ziel, Exit 0, `targetUrl` im Output.
- Negativnachweise Zielmodus: Zielzustandsabweichung (`GM-ERR-STATE-MISMATCH`), fehlender Zielselector (`GM-ERR-SELECTOR-NOT-FOUND`), nichtlokale Ziel-URL (`GM-ERR-TARGET-URL-NOT-LOCAL`), alle Exit 1.
- Negativnachweise CLI-Vertrag (P1-Fix): fehlender Wert, unbekanntes Argument, doppeltes `--target-url` — alle `GM-ERR-CLI-ARGS-INVALID`, Exit 1, kein Browserstart.
- Regression: drei bestehende Spuren ohne `--target-url` weiterhin PASS, Output bytegleich ohne `targetUrl`-Feld; `validate_schema.py` (4 Spuren) und `validate_package.py af-gm-03-positive` weiterhin grün.
- Scope-QA und explizite Grenze (kein Ghost-Page-Replay, keine Produktreife) dokumentiert.

**Tabu-Check:** keine ✓ — nur die Evidenzdatei im Scope, kein `forbidden`/`protected`-Pfad berührt.

**Gate-Typ:** Full (aus dem ursprünglichen AF-GM-02c-Full-Gate, Patchfolge-Regel: Evidenzdatei erst nach Alberts Testbestätigung, als eigener Patch)

**Scope-QA:** `git status --short` vor und nach diesem Patch verglichen — ausschließlich `tests/golden-master/evidence/AF-GM-02C-NACHWEISE.md` neu hinzugekommen; alle übrigen Einträge stammen aus den drei vorangegangenen, bereits quittierten Patches dieser AP-Kette.

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 1 Stelle geändert (neue Datei). Aufzählen? Nein — vollständig oben dokumentiert.

→ Kein weiterer Patch ohne neuen Auftrag. Kein Commit, kein Push, kein Ghost-Upload.
