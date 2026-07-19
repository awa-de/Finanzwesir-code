---
name: project-app-duell-pipeline
description: "Der /app-duell Mockup-Duell-Prozess der App-Fabrik — Ablage, Werkzeug, ID-gebundenes Produktentscheidungs-Gate"
metadata: 
  node_type: memory
  type: project
  originSessionId: eaa149ec-5113-487b-98ec-1cdda2327e1b
  modified: 2026-07-19T18:18:03.076Z
---

Skill `/app-duell` fährt den App-Fabrik-Mockup-Duell-Prozess. Claude ist **Orchestrator** (fährt nur das Werkzeug, gibt Starttexte); Sol/Fable/Grok/Sonnet sind vier **externe** Konversationen des Nutzers. Kette: Mini-Spec → gemeinsamer Psychosprint (Sol+Fable, exakt derselbe Prompt) → Grok-Gegenkritik → Sonnet baut zwei getrennte Happy-Path-Mockups → Albert testet A gegen B. Definition of Done = zwei Mockups zuverlässig gebaut + GELB; **kein** LLM-Gewinner, kein APP_SPEC, danach freies taktisches Arbeiten.

Kanonische, getrackte Orte (AP-09h–09k, freigegeben 2026-07-18):
- Prozess (einzige Wahrheit, Skill lädt sie): `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`
- Skill: `.claude/skills/app-duell/SKILL.md` + `.claude/skills/app-duell/README.md` (Debug-Abhängigkeitskarte, im Betrieb nicht geladen)
- Prompt-Vorlagen: `docs/App-Fabrik/vorlagen/{PSYCHOSPRINT_GRUNDPROMPT,GROK_GEGENKRITIK_VORLAGE,SONNET_MOCKUP-DUELL_VORLAGE}.md` (Werkzeug liest sie via `VORLAGEN_REL`; NIE ins gitignored `Archiv/local`)
- Werkzeug: `tools/app-fabrik-psychosprint.py` (Subcommands `prepare`/`grok-paket`/`sonnet-paket`, Dry-Run-Default, `--self-test`)
- Werkstatt je App: `tests/scratch/<slug>/`; Ergebnis: `docs/steering/patches/AF_<slug>_mockup-duell_Ergebnis.md`

Schutzmechanismen im Werkzeug: Quellensperre-Marker (Sonnet-Vorlage muss `## Quellensperre — Harter Stop` tragen, sonst kein Bau — keine Fremd-App als Scaffold), Nicht-Überschreiben, Anonymisierung A=Sol/B=Fable, und das **ID-gebundene Produktentscheidungs-Gate**: Grok taggt jeden Fund `Produktentscheidung nötig [E<k>]`, `PRODUKTENTSCHEIDUNGEN.md` trägt dieselben IDs; `sonnet-paket` prüft **Mengen-Gleichheit** (nicht Zählung) und blockt bei Lücke/Extra/Duplikat/fehlender ID. Lehre: ein reines Zähl-Gate ist Scheinsicherheit (extern via ChatGPT-Peer-Review aufgedeckt) — erst Identitätsbindung ist echte Sicherheit → [[feedback_gruendlichkeit_vor_tempo]]. Verwandt: [[project_app_fabrik_struktur]], [[project_pbn_strategy]].

**Pflichtquellen-Lücke gefunden + gefixt (2026-07-18, AF-crash-reaktions-test-mockup-duell):** `Theme/assets/css/tokens.css` (CI-Farbtokens, unverändert als `:root` übernehmen) und `docs/testing/templates/app.test.template.html` (nur der bytegleiche `@theme inline`-Bridge-Block) sind die **essenzielle CI-Basis** für jedes Sonnet-Mockup — ohne sie bleiben Tailwind-Utilities wie `bg-primary`/`text-petrol-700` im Play-CDN-Mockup ungestylt. Die gehärtete Quellensperre (seit AP-09h–09k) hatte das übersehen: statische Pflichtquellenliste hatte nur 7 Einträge, beide fehlten. Fix in **beiden** Stellen nachgezogen, damit sie für alle künftigen Apps automatisch gilt: `docs/App-Fabrik/vorlagen/SONNET_MOCKUP-DUELL_VORLAGE.md` §„Pflichtquellen — nur diese" (jetzt 9 Einträge) und `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md` §„Bestandsdateien". Eine echte historische Datenquelle (z. B. MSCI World) bleibt bewusst **ohne** festen Pfad in der Liste — app-spezifisch, nicht jede App braucht sie; dafür bekam die Vorlage stattdessen einen Klärsatz, der den bestehenden Quellensperre-Stop explizit auf diesen Fall münzt statt ihn implizit zu lassen.

**App-Duell-Runde 2026-07-19 (19 Apps bis Sonnet-Auftrag, 3 Sonderfälle gelöst):**
- **UTF-8-BOM-Muster:** Von Sol-Konversationen gespeicherte `01-sol.md` tragen wiederkehrend eine BOM vor der ersten `---`-Zeile (esg-spiegel, regulatorik-dashboard — 2/19 Apps), die den `grok-paket`-Frontmatter-Check zum FAIL bringt. Inhalt selbst ist unauffällig. Kein Hand-Repair (Masterprompt-Regel 10) — Albert speichert die Datei selbst neu ohne BOM, dann grün. Diagnose per `head -c 10 datei | xxd` (`efbb bf` = BOM).
- **Grok-Starttext-Format (dauerhafte Präferenz):** Anleitung für Albert (welche Dateien in Grok hochladen) als Klartext außerhalb des Code-Blocks; nur der tatsächlich in Grok einzufügende Auftragstext („Lies beide Dateien... Gib dein Ergebnis als Code-Block aus... Bestätige nur, dass fertig") im Code-Block — ein Mausklick kopiert exakt das Nötige.
- **Echtdaten-Bedarf auf Baumoment verschieben:** Wenn eine Grok-Produktentscheidung echte Zeitreihen/Zahlen verlangt (thesaurierer-rennen E1/E3/E4, weltdepot-baukasten E1), Beschaffung nicht in der Duell-Phase klären, sondern in `PRODUKTENTSCHEIDUNGEN.md` vermerken: „Sonnet muss vor dem Bau explizit fragen: Gib mir die folgenden Informationen — nicht selbst erfinden, nicht still blockieren." Landet deterministisch im `SONNET_EINGABEPAKET.md`.
- **Sofort-Vergabe-IDs (AF-/AP-Präfixe) IMMER gegen `NAVIGATION.md` + beide BACKLOG-ARCHIV-Dateien prüfen, nicht nur gegen `BACKLOG.md`:** ID-Kollision passiert (AF-24 fälschlich neu vergeben für die G2/etf-aera-vorbei-Kopplung, obwohl bereits am 2026-07-01 für die plan-generator-Seed-Sperre-Klärung vergeben und in `BACKLOG-ARCHIV-2026.md` archiviert — dort ist die ID nicht mehr in `BACKLOG.md` sichtbar). Korrigiert auf AF-25. Lehre: `grep -oE "AF-[0-9]+" docs/steering/BACKLOG.md docs/steering/BACKLOG-ARCHIV*.md` vor jeder neuen ID-Vergabe. → [[feedback_gruendlichkeit_vor_tempo]]
- **Companion-/Sonderfall-Mini-Specs können veraltete Kopfzeilen tragen:** regulatorik-dashboards „Nächster Schritt: AP-14i" stand noch im Dokument, obwohl AP-14i bereits 2026-07-01 GRÜN abgeschlossen war (nachgewiesen in `docs/steering/patches/AP-14i_..._Ergebnis.md` + `NAVIGATION.md`-Eintrag). Vor einem Stopp wegen scheinbar offener Readiness-Prüfung: referenzierte Ergebnisdatei tatsächlich lesen, nicht dem Dokumentkopf vertrauen.
