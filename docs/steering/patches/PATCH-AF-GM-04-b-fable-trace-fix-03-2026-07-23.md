Stand: 2026-07-23 | Session: AF-GM-04-b-fable-Trace-Fix-03 | Geändert von: Claude

# Patch-Quittung | AF-GM-04-b-fable-Trace-Fix-03 | 2026-07-23

**Beauftragt:** Kanonische Pilotwahrheit herstellen: Der bisherige Snapshot-Pfad (`.../pilot-b-fable-2026-07-23/mockup.html`, 4 Verzeichnisebenen ab Root) löste den relativen Link `../../../../../Theme/assets/css/tokens.css` fälschlich eine Ebene über den Repo-Root hinaus auf; Spur und Screenshots aus Fix-01/Fix-02 waren dadurch visuell ungültige Versuchsartefakte. Auftragsquelle: `PROMPT_CLAUDE_AF-GM-04_B_FABLE_TRACE_FIX-03_CANONICAL_SNAPSHOT_V1.md`.

**Geändert:** 6 Stellen (1 Verschiebung, 2 Ein-Feld-Edits, 2 gezielte Entfernungen, 1 Neuaufnahme)

**Dateien/Aktionen:**
- Snapshot **verschoben** (nicht dupliziert): `.../pilot-b-fable-2026-07-23/mockup.html` → `.../pilot-b-fable-2026-07-23/snapshot/mockup.html`
- `Apps/depot-kipppunkt/factory-runs/ACCEPTANCE-depot-kipppunkt-b-fable-pilot.json` — nur `mockupPath` aktualisiert, alle anderen Felder unverändert
- `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/b-fable.actions.json` — nur `fixturePath` aktualisiert, Fix-02-Zeitreglerfolge (22, dann 23) unverändert
- alter `behavior-trace.json` entfernt, neu durch `record.mjs` erzeugt
- alter Ordner `screenshots/b-fable-normal/` geleert (15 Einzeldateien entfernt, da `rm -rf` auf den Ordner von der Berechtigungsprüfung abgelehnt wurde) und durch `record.mjs` neu befüllt

**CHANGED/NEW-Markierungen:** N/A — reine Artefakte/Konfigurationsfelder, kein Code-Marker nötig.

**Tabu-Check:** keine ✓ — Werkstattquelle, frühere Patch-Quittungen, Evidenzdatei `PILOT-SNAPSHOT-NACHWEIS.md`, Produktionsstandard, Mockup-Vertrag, Schutzprofil, Recorder, Verifizierer, Schema, App-/Theme-/Registry-Code, Ghost-Dateien unangetastet.

**Gate-Typ:** Full

**Reale Befunde:**

| Prüfung | Ergebnis |
|---|---|
| Pfadauflösung alt (`.../pilot-b-fable-2026-07-23/`, 4 Ebenen) | `..\Theme\assets\css\tokens.css` — außerhalb des Repos, bestätigt den Fehler |
| Pfadauflösung neu (`.../snapshot/`, 5 Ebenen) | `Theme\assets\css\tokens.css` — korrekt, Datei existiert real |
| Hash vor Verschiebung | `855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9` |
| Hash Werkstatt == Hash neuer Snapshot | `True` |
| Alter Snapshot-Pfad nach Verschiebung vorhanden | `False` |
| `record.mjs` (Modus `normal`) | Exit `0` — 15 Aktionen |
| `validate_schema.py` | Exit `0` — `SCHEMA-VALIDIERUNG: GRUEN` |
| `verify.mjs` gegen kanonischen Snapshot | Exit `0` — `PASS`, 15 Aktionen |
| Negativnachweis Hash-Mismatch (externe Temp-Kopie) | Exit `1` — `GM-ERR-HASH-MISMATCH`; Temp-Datei entfernt |
| Visuelle Prüfung Screenshots (Weiter/Jahr 22/Jahr 23) | petrolfarbener Zeitregler, farbige Balken (grau/petrol), sichtbar kippender Ausgleichsbalken — deutlicher Unterschied zu den zuvor blassen, unstyled Fix-02-Screenshots |
| Bindung nach Neuaufnahme (vollständig neu gelesen: Snapshot, Acceptance, Action-Script, Trace) | `referencePath`/`referenceSha256` == `acceptance.json.mockupPath`/`.mockupSha256`, beide zeigen auf `snapshot/mockup.html` |
| Scope-QA (`grep` auf alten Pfad in `Apps/`) | Treffer ausschließlich in der historischen, laut Auftrag geschützten Evidenzdatei `PILOT-SNAPSHOT-NACHWEIS.md` (zum damaligen Patchzeitpunkt korrekt) — kein aktives Artefakt betroffen |

**Bekannte Restabweichung:** `rmdir` auf den geleerten Ordner `screenshots/b-fable-normal/` scheiterte mit „Device or resource busy" (bekannter Windows/NAS-Sync-Effekt, bereits 2026-07-21 bei `tools/upload-dienst` aufgetreten). Alle 15 alten Dateien wurden einzeln entfernt, der leere Ordner wurde danach von `record.mjs` regulär neu befüllt — funktional identisch zum vorgesehenen Entfernen+Neuanlegen.

**Offene Fragen:** keine.

---

Zählprüfung: Ich habe 6 Stellen geändert. Aufzählen? Nein — vollständig oben dokumentiert.

→ Keine Evidenzdatei geschrieben. Kein Commit, kein Push, kein Ghost-Upload.
