PATCH-QUITTUNG | AP RITUAL-OPT-2 (Punkt 7 — start/Hook-Umbau) | 2026-07-12

**Beauftragt:** Im Kaltstart-Vollmodus lässt `/start` den `spec-scout`-Haiku-Dispatch NAVIGATION.md (18,5 KB) + BACKLOG-ARCHIV.md (36 KB) + BACKLOG.md (14,7 KB) lesen. Nach Alberts Entscheidung (AskUserQuestion): `BACKLOG.md`/`BACKLOG-ARCHIV.md` (~50,7 KB, saubere Markdown-Tabellen) auf PowerShell-Regex-Felder direkt im Hook umstellen; NAVIGATION.md (Fließtext, kein Tabellenformat) bleibt beim Haiku-Dispatch; „Aktive APs"-Zahl/Zählprüfung wird künftig aus `BACKLOG.md`s 🟡-Aktiv-Tabelle gespeist, nicht aus NAVIGATION.

**Vorab-Pflicht erfüllt:** `.claude/PROTECTED_PATHS.json` geprüft — `.claude/hooks/session-start.ps1` ist dort nicht gelistet, kein Tabu-Konflikt.

**Geändert:** 2 Dateien, 7 Stellen

**Dateien:**
- `.claude/hooks/session-start.ps1` (CHANGED) — Session-Log-Block liefert jetzt zusätzlich `$lastLogDate`; neuer Block extrahiert `BACKLOG.md`-Abschnitt „🟡 Aktiv" (Tabellenzeilen → ID-Liste); neuer Block filtert `BACKLOG-ARCHIV.md`-Zeilen nach Datum > `$lastLogDate`; 2 neue Ausgabezeilen `Aktive-APs:` und `Archiv-seit-Log:`. Fehlende Datei/Abschnitt → `Hook-Status: DEGRADED` + Klartext-Warnung, Ausgabe „unbekannt (Grund)" statt einer falsch sicheren Zahl.
- `.claude/commands/start.md` (CHANGED) — Schritt 2: Dispatch auf reine NAVIGATION-Extraktion reduziert (Begründung für den Split inline dokumentiert); Schritt 3: Lücken-Alarm liest jetzt Hook-Feld `Archiv-seit-Log` statt Dispatch-Ergebnis; Schritt 5: „Aktive APs"/Zählprüfung kommen direkt aus Hook-Feld `Aktive-APs`.

**Technischer Stolperstein (gefunden + behoben):** Erster Testlauf ging DEGRADED — Windows PowerShell 5.1 parst `.ps1`-Dateien ohne BOM nicht als UTF-8, das eingebettete 🟡-Emoji-Literal im Regex-Quelltext wurde beim Skript-Parsing selbst korrumpiert (unabhängig von `-Encoding UTF8` beim Lesen der Zieldatei). Fix: Emoji zur Laufzeit aus dem Codepoint gebaut (`[char]::ConvertFromUtf32(0x1F7E1)`) statt als Literal im Quelltext — macht die Skriptdatei-Kodierung irrelevant.

**Testprotokoll:**
1. Realer Hook-Lauf gegen die echten Projektdateien: `Hook-Status: OK`, `Aktive-APs: 5 (AP-20/21, AP-6c, AP-22, RITUAL-OPT-2, TESTENV-1-FOLLOWUP-BORDER)` — stimmt mit `BACKLOG.md` überein, `Archiv-seit-Log: keine` (korrekt, da letztes session-log-Datum = heute).
2. Synthetischer Test der Datumsfilter-Logik (Scratchpad-Fixture): Zeilen vor/am/nach Stichtag korrekt getrennt (nur „nach" erfasst, „am Stichtag" bewusst ausgeschlossen — `-gt`, nicht `-ge`); ID-Spalte mit Sonderzeichen (Pfeil →) korrekt als ein zusammenhängendes Feld erfasst, nicht am Pfeil zerschnitten.

Alle Fälle grün.

**CHANGED/NEW:** `// CHANGED`/`// NEW`-Konvention gilt für App-/Engine-Code; hier per Kommentar im Diff selbst markiert (`RITUAL-OPT-2 Punkt 7`-Verweise in den neuen Blöcken).

**Tabu-Check:** keine ✓ — beide Dateien außerhalb Tabu-Zonen/`PROTECTED_PATHS.json` (explizit vorab geprüft, siehe oben).

**Gate-Typ:** Full (Start-Wahrheits-Infrastruktur, von Albert selbst so eingestuft).

**Realer Testfall (steht noch aus):** Ein `/start`-Lauf im echten Kaltstart-Vollmodus (heute lief Kettenmodus, Schritt 2/3 kamen gar nicht zur Ausführung) — bestätigt, dass der reduzierte NAVIGATION-only-Dispatch und die neuen Hook-Felder im echten Skill-Fluss zusammenpassen. Lässt sich nicht erzwingen, tritt ein, sobald das Kettensignal fehlt oder älter als 7 Tage ist.

**Offene Fragen:** keine für diesen Patch. RITUAL-OPT-2 Punkt 7 damit erledigt; Punkt 8 (REGRESSION-MATRIX-Gate-Spalte) steht noch aus.

Zählprüfung: Ich habe 7 Stellen in 2 Dateien geändert. Aufzählen?
→ Bitte bestätige (inhaltliches Gegenlesen reicht, da der reale Vollmodus-Testfall situativ ist). Ich warte vor dem nächsten Patch.
