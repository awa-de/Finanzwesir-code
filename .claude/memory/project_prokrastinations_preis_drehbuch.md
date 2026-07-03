---
name: project-prokrastinations-preis-drehbuch
description: "prokrastinations-preis: Drehbuch war Soll-Quelle für Screen 4; seit AP-prokrast-04a (2026-07-03) ist APP_SPEC.md §16.1a die synchronisierte, operative Spec für den gebauten Rubikon-Endstand; QA_TEST_CASES.md seit AP-prokrast-05a-05e (2026-07-03) ebenfalls synchron inkl. CTA-Fokus-Testabdeckung — Drehbuch bleibt für Screen 2/3 amtlich, Card-to-Point/Screen-3-Timing/Beat-2-Symbolik weiterhin offen"
metadata: 
  node_type: memory
  type: project
  originSessionId: a35e85df-d14e-477e-b4b3-0052c090219a
---

`Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (Stand 2026-06-25) ist das amtliche, freigegebene fachliche Zielbild für die App `prokrastinations-preis`. Für Screen 4 ist seit AP-prokrast-04a (2026-07-03) `APP_SPEC.md` §16.1a die synchronisierte, operative Spec-Quelle — sie beschreibt den tatsächlich gebauten, von Albert bestätigten stehenden Rubikon-Screen (kein Morph, kein C2, DOM-Overlay-Text), nicht mehr die ursprüngliche Drehbuch-Choreografie mit Achsenanimation. Für Screen 2 (Card-to-Point) und Screen 3 (Timing-Reveal) bleibt das Drehbuch weiterhin die alleinige Soll-Quelle, da diese Teile noch nicht gebaut sind.

**Warum wichtig:** Die Drehbuch-Datei ist im Git-Status untracked. Ein Claude, der nur `git log`/`git status` prüft, würde sie leicht übersehen oder ihre Autorität anzweifeln. Der untracked-Status ist ausdrücklich nur ein Commit-Hinweis, keine fachliche Unsicherheit. Für Screen 4 gilt jetzt zusätzlich: Drehbuch-Beat 1 (Achsenanimation) und Beat 3 (Text unter dem Chart) sind im Drehbuch selbst als „abgelöst" markiert, Beat 2 (✅/❓-Symbolik) explizit als „offen, nie entschieden" — nicht als abgelöst verwechseln.

**Kernbefund aus AP-prokrast-02c (Architektur-Kontrakt):** Der bestehende `xDisplayRange`/`displayRange`-Mechanismus (Chart-Engine, AP-14b) trägt die Rubikon-Zukunftsraum-Mechanik (Screen 4) bereits strukturell — keine Obergrenzenprüfung in `LineChartStrategy.transform()`, `FwVerticalLinePlugin` positioniert sich bereits am letzten echten Datenpunkt. Card-to-Point (Screen 2, Kartenschrumpf-Animation) hat dagegen keine bestehende Koordinaten-Schnittstelle — höchstes Architekturrisiko im gesamten Drehbuch, weiterhin ungebaut.

**`QA_TEST_CASES.md`-Sync abgeschlossen (AP-prokrast-05a–05e, 2026-07-03, BACKLOG AP-27 erledigt):** `Apps/prokrastinations-preis/QA_TEST_CASES.md` Gruppe F ist jetzt vollständig mit `APP_SPEC.md` §16.1a synchron. TC-F01 behandelt den Rubikon-Chart nicht mehr als Fehler (alte Formulierung „Kein Zukunftschart." entfernt). TC-F03/TC-F04 decken DOM-Haupttext, 800ms-Timing und — nach einem in AP-05b gefundenen und in AP-05c geschlossenen Nachputz — die CTA-Nicht-Erreichbarkeit während beider 800ms-Pausen (inkl. Reduced-Motion-Invarianz) testbar ab. Ausschließlich `QA_TEST_CASES.md` geändert, kein Code/Spec/Drehbuch.

**Offene Punkte (BACKLOG AP-26, Stand 2026-07-03):** ✅/❓-Symbolik auf Screen 4 ist eine echte offene Produktentscheidung, weder gebaut noch verworfen — vor Bau mit Albert klären. Card-to-Point und Screen-3-Timing-Reveal bleiben nachgelagerte Pflichten ohne festen Termin.

**Wie anwenden:** Bei Arbeit an Screen 4 zuerst `APP_SPEC.md` §16.1a lesen (operative Spec); `QA_TEST_CASES.md` Gruppe F für Abnahmekriterien. Bei Arbeit an Screen 2/3 weiterhin das Drehbuch als Soll lesen. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-01…05e_*_Ergebnis.md`. Nächster Schritt wartet auf Alberts/Masterfadens Wahl zwischen zwei verbleibenden Kandidaten (Beat-2-Klärung / Card-to-Point-Schnittstelle) — siehe AP-prokrast-05e-Rücklaufkapsel.
