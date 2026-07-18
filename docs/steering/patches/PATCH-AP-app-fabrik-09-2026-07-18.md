Stand: 2026-07-18 | Session: AP-app-fabrik-09 | Geändert von: Claude

# PATCH-QUITTUNG | AP-app-fabrik-09 | 2026-07-18

**Beauftragt:** Zwei getrennte, interaktive Happy-Path-Werkstatt-Mockups für `depot-kipppunkt` bauen
(Variante A „Mitverdiener-Spur" nach Sol-Quelle, Variante B „Kippbalken" nach Fable-Quelle +
Albert-Entscheidung „Gleichstand, dann mehr"), plus README und Ergebnisdatei — laut
`SONNET_AUFTRAG.md` und Alberts explizitem Zusatzauftrag zu Variante B.

**Geändert:** 4 Dateien, ausschließlich Neuanlage (keine Bestandsdatei berührt).

**Dateien:**
- `tests/scratch/depot-kipppunkt/mockup-duell/a-sol/mockup.html` (neu)
- `tests/scratch/depot-kipppunkt/mockup-duell/b-fable/mockup.html` (neu)
- `tests/scratch/depot-kipppunkt/mockup-duell/README.md` (neu)
- `docs/steering/patches/AP-app-fabrik-09_mockup-duell-depot-kipppunkt_Ergebnis.md` (neu)

**CHANGED/NEW:** N/A — vollständige Neuanlage, keine Bestandsdatei mit `// CHANGED`/`// NEW` zu
markieren. Innerhalb der Session an `b-fable/mockup.html` selbst nachgebessert (Marken-Linien
unpositioniert → per JS positioniert; Label-Anker überlappten den Panel-Rand → dynamisch mit der
Balkenhöhe mitgeführt; toter Code entfernt in beiden Dateien) — vor Albert-Abnahme, daher kein
eigener Zwischen-Patch.

**Tabu-Check:** keine ✓ — `Apps/depot-kipppunkt/`, Theme, Engine, Daten, bestehende
Mockups/Psychosprints, `FinanzwesirData.js`/`CSVParser.js`/`FwDateUtils.js` nicht berührt.
`tests/scratch/risiko-uebersetzer/` nicht gelesen (Alberts Weisung).

**Gate-Typ:** Full (App-Arbeit, mehrere Dateien) — Alberts „OK" lag vor Umsetzung vor.

**Testfall:** `tests/scratch/depot-kipppunkt/mockup-duell/a-sol/mockup.html` und
`.../b-fable/mockup.html` einzeln im Browser öffnen (kein Build-Schritt). Ablauf, Prüfpunkte und
Reduced-Motion-/Fokus-Gegenprobe stehen vollständig im README.md desselben Ordners und in §8 der
Ergebnisdatei. Viewports 375/768/1280 px.

**Offene Fragen:** keine technischen — inhaltlich offen bleibt nur Alberts reale Browser-Abnahme
(Status bleibt GELB bis dahin, siehe Ergebnisdatei §7).

---

Zählprüfung: Ich habe 4 Dateien neu angelegt (2 Mockups, 1 README, 1 Ergebnisdatei), keine
Bestandsdatei geändert.

→ Bitte teste mit den beiden `mockup.html`-Dateien (375/768/1280 px, Ablauf laut README). Ich
warte vor dem nächsten Patch auf deine Testbestätigung.
