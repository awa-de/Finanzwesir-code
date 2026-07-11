Stand: 2026-07-11 | Session: TESTENV-1f-Nachtrag | Geändert von: Claude (Sonnet)

# PATCH-QUITTUNG | CI-AUDIT-TOOL | 2026-07-11

**Beauftragt:** `tools/ci-token-check.js` um ein primitives, universelles Ist/Soll-Set-Audit
(`fwCiAudit()`) erweitern — erlaubte Farb-/Font-Menge live aus `tokens.css` ermitteln, jeden
tatsächlich benutzten Farb-/Font-Wert innerhalb `.kg-card`-Bereichen der geöffneten Seite dagegen
prüfen (Mengen-Zugehörigkeit, kein Design-Urteil). Kein kuratierte Selektor-Liste mehr nötig.

**Geändert:** 1 Datei, 3 zusammenhängende Blöcke.

**Dateien:**
- `tools/ci-token-check.js`
  - Kopfkommentar erweitert (3 Prüfungen statt 2, Nutzungshinweise `fwCiAudit()`).
  - Neu: `discoverRootCustomProps()`, `firstFamily()`, `buildAllowedColors()`,
    `buildAllowedFonts()`, `colorToHexOrNull()`, `simpleSelector()`, `fwCiAudit()`.
  - Export + Auto-Lauf-Block: `global.fwCiAudit` ergänzt, `fwCiAudit()` im Auto-Lauf ergänzt.
  - Bestehende Funktionen (`fwTokenCheck`, `fwFontCheck`, alle Helper) unverändert.

**CHANGED/NEW:** N/A — reines Browser-Konsolen-Tool außerhalb des CHANGED/NEW-Markierungsbereichs
(kein Produktions-/App-Code).

**Tabu-Check:** keine ✓ (Layer 1–5 nicht betroffen, kein `PROTECTED_PATHS.json`-Eintrag berührt).

**Gate-Typ:** Light (1 Datei, kein Tabu, keine Architekturwirkung, keine Security-Auswirkung,
keine `docs/spec/`/`docs/steering/`-Änderung — Gate-Fragen vorab beantwortet, Albert hat mit „ok,
setze um" freigegeben).

**Testfall:** Beliebige Testseite mit `.kg-card` (z. B. `tests/engine/tooltip-context.test.html`
oder `Apps/prokrastinations-preis/app.test.html`) im Live-Server öffnen → DevTools-Konsole →
gesamten Inhalt von `tools/ci-token-check.js` einfügen. Erwartung: drei Reports erscheinen
automatisch (Token-Drift-Check, Font-Check, neuer CI-Audit); die dritte Tabelle zeigt eindeutige
Farb-/Font-Werte aus allen `.kg-card`-Bereichen mit ✅/❌, ❌-Zeilen zuerst. `node --check
tools/ci-token-check.js` lokal bereits fehlerfrei geprüft (Syntax), echte Browser-Ausführung steht
noch aus (kein Browser-Werkzeug in dieser Umgebung verfügbar).

**Offene Fragen:** keine.

Zählprüfung: Ich habe 1 Datei in 3 zusammenhängenden Blöcken geändert (Kopfkommentar, neue
`fwCiAudit`-Funktionsfamilie, Export/Auto-Lauf). Stimmt das?
→ Bitte teste mit einer Testseite im Live-Server (siehe oben). Ich warte vor dem nächsten Patch.
