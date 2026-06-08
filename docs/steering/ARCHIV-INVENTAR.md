Stand: 2026-06-08 | Session: AP-5 Archiv-Inventar | Geändert von: Claude

# Archiv-Inventar — Finanzwesir 2.0

## Zweck

Dieses Dokument ist der Befund aus AP 5. Es ist noch keine Zielstruktur und kein Migrationsplan.
AP 6 erstellt aus diesem Befund den föderiertes Archivkatalog (legacy-map.md).

Referenz-Archivmodell: `docs/steering/ARCHIV-STRATEGIE.md`

---

## Zusammenfassung

- **Archivorte gesamt:** 15 (9 Verzeichnisse + 6 Dateien/Sonderfälle)
- **ROOT_ARCHIV:** 1 — `Archiv/`
- **LOCAL_QUARANTAENE:** 1 — `Archiv/local/` (gitignored ✓)
- **LOKALES_ARCHIV:** 6 — in Apps/, docs/App-Fabrik/, docs/design-system/, docs/spec/, docs/steering/, Archiv/optimierung-projektsteuerung/
- **ARCHIVDATEI:** 4 — drei in docs/steering/archiv/, eine in Archiv/Refactoring/
- **SONDERFALL:** 3 — `archivliste.md`, `docs/steering/BACKLOG-ARCHIV.md`, `Inhalte alte Site/blog/archiv/`

**Wichtigste Risiken:**
- `docs/steering/archiv/` — größtes lokales Archiv (15 Dateien, 222 KB), hohes Drift-Risiko durch veraltete Pläne und Handoff-Prompts
- `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` — 79 KB Einzeldatei, hohes Drift-Risiko
- `Archiv/optimierung-projektsteuerung/.../Archiv/` — LLM-Dump-Verdacht (CLAUDE-pre-synthese), gehört nach `local/`

**Pilotkandidaten:**
- `docs/spec/archiv/` — 4 Dateien, 47 KB, hoher Kuratierwert, klar abgegrenzt
- `Apps/prokrastinations-preis/Archiv/` — 2 Dateien, 6 KB, aktiver App-Kontext

**Sonderfälle mit Klärungsbedarf:**
- `archivliste.md` — veraltete absolute Windows-Pfade; durch dieses Dokument faktisch ersetzt
- `docs/steering/BACKLOG-ARCHIV.md` — operatives Artefakt, kein reines Archiv
- `Inhalte alte Site/blog/archiv/` — gehört fachlich nicht zum Projektarchiv

**False Positives (nicht aufgenommen):**
- `Theme/assets/fonts/ArchivoBlack-Regular.woff2` — Web-Font, kein Archiv-Artefakt
- `.claude/memory/project_archivstrategie.md` — Memory-Datei, kein Archiv-Artefakt
- `docs/steering/ARCHIV-STRATEGIE.md` — aktives Steuerdokument

---

## Inventartabelle

| Pfad (relativ) | Typ | Bereich | Kurzbeschreibung | Rohmaterial | Binär | LLM-Dump | Kuratierbarer Wert | Making-of-Wert | Drift-Risiko | Nächste Aktion |
|---|---|---|---|---|---|---|---|---|---|---|
| `Archiv/` | ROOT_ARCHIV | Gesamtprojekt | 14 Themeninseln; Chart-Engine-Historie, Peer-Reviews, Design, KI-Workflow-Geschichte; 2 Author-Guide-Versionen + struktur.md direkt im Root | ja | unklar | ja | hoch | hoch | niedrig | IN_AP6_KARTIEREN + LOCAL_PRUEFEN |
| `Archiv/local/` | LOCAL_QUARANTAENE | Root-Archiv | Gitignored Quarantäne; 203 Dateien, ≈31 MB; spiegelt Root-Archiv-Struktur inkl. Excel, Seminar, LLM-Dumps | ja | ja | ja | niedrig | unklar | niedrig | BELASSEN_UND_VERTRAG_ANWENDEN |
| `Archiv/optimierung-projektsteuerung/Optimierung Projektsteuerung/Archiv/` | LOKALES_ARCHIV | Root-Archiv / Optimierung-Projektsteuerung | 2 Dateien: CLAUDE-pre-synthese-2026-05-03.md (20 KB) + NAVIGATION-pre-synthese-2026-05-03.md (7 KB); LLM-Synthese-Exports | ja | nein | ja | unklar | mittel | niedrig | LOCAL_PRUEFEN |
| `Apps/prokrastinations-preis/Archiv/` | LOKALES_ARCHIV | App prokrastinations-preis | 2 Markdown-Dateien, 6 KB; Slice-0-Kickoff-Prompt + Implementierungs-Prompt; Entstehungsgeschichte Slice 0 | nein | nein | nein | mittel | mittel | niedrig | IN_AP6_KARTIEREN + README_ANWENDEN |
| `docs/App-Fabrik/_archive/` | LOKALES_ARCHIV | App-Fabrik | 1 Datei (README.md, 0 KB, leer); Archiv de facto leer | nein | nein | nein | niedrig | niedrig | niedrig | SONDERFALL_PRUEFEN |
| `docs/design-system/archiv/` | LOKALES_ARCHIV | Design-System | 1 Datei (boxen-stress-test-referenz.html, 9 KB); Referenz-Stresstest aus Design-System-Entwicklung | nein | nein | nein | mittel | mittel | niedrig | IN_AP6_KARTIEREN + README_ANWENDEN |
| `docs/spec/archiv/` | LOKALES_ARCHIV | Spec / Chart-Engine | 4 Markdown-Dateien, 47 KB; Spec-Versionen v1/v12/v13 für HTML-Karten und Ticks/Labels; Versions-Geschichte Chart-Spec | nein | nein | nein | hoch | hoch | mittel | IN_AP6_KARTIEREN + README_ANWENDEN + PILOTKANDIDAT |
| `docs/steering/archiv/` | LOKALES_ARCHIV | Steering / Projektsteuerung | 15 Dateien, 222 KB; AP-Übergaben, Implementierungspläne, Handoff-Prompts, Known-Issues-Geschichte, MEMORY-THEME-PHASE.md (28 KB); größtes lokales Archiv | nein | nein | unklar | hoch | hoch | hoch | IN_AP6_KARTIEREN + README_ANWENDEN |
| `Inhalte alte Site/blog/archiv/` | SONDERFALL | Alte Website / Content | 1 leere Datei (page.md, 0 KB); Archiv-Ordner innerhalb alter Websiteinhalte; de facto leer | nein | nein | nein | niedrig | niedrig | niedrig | SONDERFALL_PRUEFEN + LOESCHKANDIDAT_PRUEFEN |
| `archivliste.md` | SONDERFALL | Projektroot | 1 KB; manuelle Archivorte-Liste mit absoluten Windows-Pfaden; entstanden vor dem Archivmodell; nicht portabel | nein | nein | nein | niedrig | niedrig | niedrig | LOESCHKANDIDAT_PRUEFEN |
| `Archiv/Refactoring der Dateistruktur/Aufraeum-Archiv.md` | ARCHIVDATEI | Root-Archiv / Refactoring | 18 KB; Aufräum-Analyse aus der Refactoring-Phase der Dateistruktur | nein | nein | unklar | mittel | mittel | niedrig | IN_AP6_KARTIEREN |
| `docs/steering/archiv/AUFRAEUM-ANALYSE-ARCHIV.md` | ARCHIVDATEI | Steering-Archiv | 8 KB; archivierte Aufräum-Analyse aus der Steering-Phase | nein | nein | nein | mittel | mittel | mittel | IN_AP6_KARTIEREN |
| `docs/steering/archiv/KNOWN-ISSUES-ARCHIV.md` | ARCHIVDATEI | Steering-Archiv | 8 KB; archivierte Known-Issues-Liste | nein | nein | nein | mittel | mittel | mittel | IN_AP6_KARTIEREN |
| `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` | ARCHIVDATEI | Steering-Archiv | 79 KB; archivierter Known-Issues-Schlachtplan; größter Einzelartefakt unter den Archivdateien | nein | nein | nein | hoch | hoch | hoch | IN_AP6_KARTIEREN |
| `docs/steering/BACKLOG-ARCHIV.md` | SONDERFALL | Steering (aktiver Pfad) | 34 KB; aktives Backlog-Archiv; liegt im aktiven Pfad (nicht in archiv/); wird von /start und Kassensturz direkt gelesen | nein | nein | nein | hoch | mittel | niedrig | BELASSEN_UND_VERTRAG_ANWENDEN |

---

## Root-Archiv-Befund

**Pfad:** `Archiv/`
**Dateianzahl:** ≈88 Dateien (exkl. `Archiv/local/`), Größe ≈1,6 MB

### Themeninseln

| Unterordner | Kurzbeschreibung | Kuratierbarer Wert | Making-of-Wert | Rohmaterialverdacht |
|---|---|---|---|---|
| `Apps/` | App-Archiv innerhalb Root; Überlappung mit Apps/prokrastinations-preis/Archiv/ prüfen | unklar | mittel | unklar |
| `Chart-Engine-Historie/` | Technische Entstehungsgeschichte der Chart-Engine | hoch | hoch | nein |
| `Design/` | Design-Archiv | unklar | mittel | unklar |
| `git-migration/` | Git-Migrationsdokumente | mittel | mittel | nein |
| `local/` | Quarantäne — separat erfasst | — | — | ja |
| `optimierung-projektsteuerung/` | Enthält verschachteltes Archiv mit LLM-Dumps | unklar | mittel | ja |
| `Peer Review Arbeitspakete/` | Peer-Review-Material zu Arbeitspaketen | hoch | hoch | nein |
| `Peer Review Migration/` | Peer-Review-Material zur Migration | hoch | hoch | nein |
| `Projekt Kontroll-Skills/` | KI-Workflow-Geschichte | mittel | hoch | unklar |
| `Rechtliches/` | Rechtliche Dokumente | mittel | niedrig | nein |
| `Refactoring der Dateistruktur/` | Aufräum-Archiv (Aufraeum-Archiv.md) | mittel | mittel | nein |
| `Refactoring des Gehirns/` | KI-Workflow-Geschichte, Prozess-Reflexion | hoch | hoch | unklar |
| `root-dateien-2026-05-03/` | Root-Dateien-Backup vom 2026-05-03 | niedrig | niedrig | ja |
| `selbstlernenes System/` | Geschichte des selbstlernenden Projektsystems | hoch | hoch | unklar |

**Direkte Dateien im Root:**
- `Author Guide Ghost-v1.md` (5 KB), `Author Guide Ghost-v2.md` (5 KB) — zwei Versionen des Author Guides; Versions-Geschichte kuratierbar
- `struktur.md` (17 KB) — Strukturdokument; Inhalt und Status unbekannt, in AP 6 prüfen

**Was noch nicht vor AP 6 bewegt werden soll:**
Alle Unterordner bleiben bis AP 6 an Ort und Stelle. Einzige Ausnahme: `Archiv/optimierung-projektsteuerung/.../Archiv/` enthält LLM-Dumps — deren Verschiebung nach `local/` ist ein eigener Folgepunkt (LOCAL_PRUEFEN), kein Bestandteil von AP 5.

---

## Lokale Archiv-Befunde

### Apps/prokrastinations-preis/Archiv/

- **Subsystem:** App prokrastinations-preis (APP-01)
- **Kontextnähe:** sinnvoll — erklärt Slice-0-Entstehung direkt am App-Kontext
- **Rohmaterial/Binärdateien:** keine
- **README vorhanden:** nein
- **In AP 6 kartieren:** ja — Slice-0-Geschichte als Making-of-Material

### docs/App-Fabrik/_archive/

- **Subsystem:** App-Fabrik-Dokumentation
- **Kontextnähe:** sinnvoll als Platzhalter
- **Inhalt:** leer (README.md, 0 KB)
- **Befund:** Archiv existiert, ist aber de facto leer. Klärungsbedarf: bewusster Platzhalter oder verwaister Ordner?
- **In AP 6 kartieren:** nur wenn Inhalt folgt oder Klärung Wert ergibt

### docs/design-system/archiv/

- **Subsystem:** Design-System
- **Kontextnähe:** sinnvoll — Stress-Test-Referenz bleibt nahe am Design-System-Kontext
- **Rohmaterial/Binärdateien:** keine (HTML-Datei, kein Binary)
- **README vorhanden:** nein
- **In AP 6 kartieren:** ja

### docs/spec/archiv/

- **Subsystem:** Spec / Chart-Engine-Spezifikation
- **Kontextnähe:** sinnvoll — Spec-Versionsgeschichte bleibt nahe an aktiver Spec
- **Rohmaterial/Binärdateien:** keine
- **README vorhanden:** nein
- **Drift-Risiko:** mittel — veraltete Spec-Versionen könnten bei versehentlichem Laden mit aktuellen Regeln verwechselt werden
- **Pilotkandidat:** ja — klar abgegrenzt, hoher Kuratierwert, überschaubares Volumen
- **In AP 6 kartieren:** ja

### docs/steering/archiv/

- **Subsystem:** Projektsteuerung
- **Kontextnähe:** sinnvoll — operative Geschichte bleibt nahe an aktivem Steering-Pfad
- **Rohmaterial/Binärdateien:** keine erkennbaren; `MEMORY-THEME-PHASE.md` (28 KB) auf LLM-Dump-Anteil prüfen
- **README vorhanden:** nein
- **Drift-Risiko:** hoch — Handoff-Prompts (`HANDOFF-PROMPT*.md`), Implementierungspläne (`AP-21-IMPLEMENTATIONSPLAN.md`, 29 KB) und Übergabedokumente könnten bei versehentlichem Laden operative Verwirrung stiften
- **Besonders:** `KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` (79 KB) ist der größte Einzelartefakt im gesamten Inventar
- **In AP 6 kartieren:** ja — Priorisierung: hoch (Drift-Risiko + Kuratierwert)

### Archiv/optimierung-projektsteuerung/Optimierung Projektsteuerung/Archiv/

- **Subsystem:** Root-Archiv (verschachtelt in Themeninsel)
- **Kontextnähe:** unklar — Verschachtelung tief; fachlicher Kontext nicht sofort erkennbar
- **LLM-Dump-Verdacht:** ja — `CLAUDE-pre-synthese-2026-05-03.md` (20 KB) ist LLM-Output
- **Empfehlung:** Inhalte vor AP 6 nach `Archiv/local/` verschieben (gesonderter Folgepunkt, nicht Teil von AP 5)
- **In AP 6 kartieren:** nach Klärung (LOCAL_PRUEFEN zuerst)

---

## local/-Quarantäne-Befund

**Pfad:** `Archiv/local/`
**Gitignored:** ✓ (`.gitignore` Zeile 10: `Archiv/local/`)
**Dateianzahl:** 203 Dateien, ≈31 MB

**Unterordner (12):** Apps, Chart-Engine-Historie, Design, Historische Excel-Kalkulationen, optimierung-projektsteuerung, Peer Review Arbeitspakete, Peer Review Migration, Projekt Kontroll-Skills, Rechtliches, Refactoring des Gehirns, selbstlernenes System, Seminar - die Basis

**Direktdatei:** `Start-Prompt Gemini.md` (3 KB) — LLM-Prompt, korrekt in local/

**Befund:**
- Quarantäne funktioniert: gitignored, kein Git-Output für diesen Pfad
- Struktur spiegelt weitgehend Root-Archiv — historischer Befund aus der initialen Quarantäne (ST-20/21)
- `Historische Excel-Kalkulationen/` und `Seminar - die Basis/` bestätigen Binär- und Rohmaterial-Verdacht
- Kein Handlungsbedarf in AP 5 — Vertrag gilt bereits

**Weiterer local/-Ordner im Projekt:** Keiner gefunden. Die Suche ergab `local/` nur in `Archiv/`.

---

## Sonderfälle

### archivliste.md

- **Lage:** Projektroot
- **Inhalt:** Manuelle Liste aller Archivorte mit absoluten Windows-Pfaden (`C:\Users\...`)
- **Problem:** Absolute Pfade sind nicht portabel — für Git, andere LLMs und andere Geräte nicht nutzbar
- **Status:** Durch `docs/steering/ARCHIV-INVENTAR.md` faktisch ersetzt
- **Empfehlung:** LOESCHKANDIDAT_PRUEFEN — Albert entscheidet in AP 6 oder gesondertem Schritt

### docs/steering/BACKLOG-ARCHIV.md

- **Lage:** Aktiver Steering-Pfad (nicht in archiv/)
- **Funktion:** Wird von `/start` (Kassensturz) und Haiku-Dispatch direkt gelesen — operatives Artefakt
- **Einordnung:** Kein reines Archiv. Archivcharakter (abgeschlossene APs) + operative Funktion (Vergleichsbasis).
- **Empfehlung:** BELASSEN_UND_VERTRAG_ANWENDEN — kein Handlungsbedarf, da funktional im aktiven Pfad verankert

### Inhalte alte Site/blog/archiv/

- **Lage:** `Inhalte alte Site/blog/archiv/`
- **Inhalt:** 1 leere Datei (`page.md`, 0 KB)
- **Einordnung:** Gehört fachlich zur alten Website, nicht zum Projektarchiv-System
- **Empfehlung:** SONDERFALL_PRUEFEN + LOESCHKANDIDAT_PRUEFEN — leerer Ordner, alter Website-Kontext

---

## Risiken und Folgepunkte

| Priorität | Risiko | Betroffener Ort | Folgepunkt |
|---|---|---|---|
| hoch | Drift-Risiko durch veraltete Pläne + Prompts | `docs/steering/archiv/` | In AP 6 kartieren, README mit Warnhinweis anlegen (AP 7) |
| hoch | 79-KB-Einzelartefakt mit Drift-Risiko | `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` | In AP 6 kartieren, Status ERSETZT oder POSTMORTEM prüfen |
| mittel | LLM-Dump in Root-Archiv, nicht in local/ | `Archiv/optimierung-projektsteuerung/.../Archiv/` | LOCAL_PRUEFEN — vor AP 6 klären |
| mittel | Veraltete Spec-Versionen (Verwechslungsgefahr) | `docs/spec/archiv/` | README mit Warnhinweis anlegen (AP 7), Status ERSETZT setzen |
| niedrig | Veraltete Datei mit absoluten Pfaden im Root | `archivliste.md` | LOESCHKANDIDAT_PRUEFEN in AP 6 |
| niedrig | Leere Archive ohne Klärung | `docs/App-Fabrik/_archive/`, `Inhalte alte Site/blog/archiv/` | SONDERFALL_PRUEFEN in AP 6 |

---

## Empfehlung für AP 6

AP 6 erstellt aus diesem Befund den föderiertes Archivkatalog (legacy-map.md).

**Empfohlene Reihenfolge für AP 6:**

1. `docs/steering/archiv/` zuerst kartieren (höchstes Drift-Risiko, größtes lokales Archiv)
2. `docs/spec/archiv/` als Pilotarchiv (überschaubar, hoher Kuratierwert)
3. Root-Archiv-Themeninseln grob erfassen (14 Inseln, Making-of-Schwerpunkt)
4. Sonderfälle `archivliste.md` und `Inhalte alte Site/blog/archiv/` klären

**Vor AP 6 klären (nicht Teil von AP 6):**
- `Archiv/optimierung-projektsteuerung/.../Archiv/` — LLM-Dumps nach `local/` verschieben (LOCAL_PRUEFEN)
- `docs/App-Fabrik/_archive/` — leer oder Platzhalter? (SONDERFALL_PRUEFEN)
