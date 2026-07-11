Stand: 2026-07-11 | Session: TESTENV-1f-Nachtrag | Geändert von: Claude (Sonnet)

# PATCH-QUITTUNG | CI-AUDIT-TOOL-CANVAS | 2026-07-11

**Beauftragt:** `fwCiAudit()` in `tools/ci-token-check.js` um Canvas-Farbprüfung erweitern —
Tooltip-, Serien- und Plugin-Farben (FwVerticalLinePlugin, FwChartTextPlugin-Annotationen; die
Annotation-Pulse-Ringfarbe läuft indirekt über `pointBorderColor` mit) über die Chart.js-Registry
(`Chart.getChart`) auslesen und gegen dieselbe CI-Palette prüfen wie der DOM-Teil.

**Geändert:** 1 Datei, 1 zusammenhängender Block (+ 2 kleine Anschlussstellen im bestehenden
`fwCiAudit()`-Rumpf: `record()`-Signatur auf `beispiel`-String statt Element umgestellt,
`auditCanvasCharts()`-Aufruf ergänzt).

**Dateien:**
- `tools/ci-token-check.js`
  - Neu: `normalizeAnyColor()`, `collectColorValues()`, `auditCanvasCharts()`.
  - `record()` nimmt jetzt einen fertigen Beispiel-String statt eines DOM-Elements (DOM-Aufrufstellen
    angepasst: `simpleSelector(el)` wird jetzt vorher gebildet).
  - Kopfkommentar + „Grenze"-Meldung am Ende von `fwCiAudit()` aktualisiert (Canvas-Farben jetzt
    geprüft, verbleibende Grenze: scriptable functions/Gradients).
  - `fwTokenCheck`, `fwFontCheck`, Export/Auto-Lauf-Block unverändert.

**CHANGED/NEW:** N/A — Browser-Konsolen-Tool, kein Produktionscode.

**Tabu-Check:** keine ✓.

**Gate-Typ:** Light (1 Datei, kein Tabu, keine Architekturwirkung, read-only Inspektion über die
öffentliche Chart.js-Registry, keine Änderung an `Theme/assets/js/fw-chart-engine/*` selbst).
Albert hat mit „Ok für das Tool" freigegeben.

**Testfall:** Testseite mit Line-Chart im Live-Server öffnen (z. B.
`tests/engine/tooltip-context.test.html` oder `tests/engine/ci-theme-bridge.test.html` für
Ergebnislinie/Pulse), Skript einfügen. Erwartung: `fwCiAudit()`-Tabelle enthält jetzt zusätzlich
Zeilen mit `Kategorie: 'Canvas'` (Dataset-/Tooltip-/Vertikallinien-Farben), `node --check` lokal
fehlerfrei. Echte Browser-Ausführung steht noch aus.

**Offene Fragen:** keine.

**Vermerkt für Abschluss-Ritual (Backlog, nicht jetzt beheben):** `.financial-chart-module` nutzt in
mehreren migrierten Engine-Testseiten noch `border: 1px solid #ddd` (Legacy-Hartcode aus den alten
`<style>`-Blöcken, kein CI-Token) — von `fwCiAudit()` bereits real gefunden (7 Treffer auf
`tooltip-context.test.html`). Fix laut Albert erst im Zuge der späteren Tailwind-Arbeit, jetzt nur
als offener Punkt fürs Backlog vermerken.

Zählprüfung: Ich habe 1 Datei geändert (1 neuer Block + 2 kleine Anpassungen an bestehenden
Aufrufstellen). Stimmt das?
→ Bitte teste erneut live, kopier mir die Canvas-Zeilen der Ausgabe rein. Ich warte vor dem
nächsten Patch.
