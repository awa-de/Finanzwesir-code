---
name: project-prokrastinations-preis-drehbuch
description: "prokrastinations-preis: Drehbuch war Soll-Quelle für Screen 4; seit AP-prokrast-04a (2026-07-03) ist APP_SPEC.md §16.1a die synchronisierte, operative Spec für den gebauten Rubikon-Endstand — Drehbuch bleibt für Screen 2/3 amtlich, Card-to-Point/Screen-3-Timing/Beat-2-Symbolik weiterhin offen"
metadata: 
  node_type: memory
  type: project
  originSessionId: a35e85df-d14e-477e-b4b3-0052c090219a
---

`Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (Stand 2026-06-25) ist das amtliche, freigegebene fachliche Zielbild für die App `prokrastinations-preis`. Für Screen 4 ist seit AP-prokrast-04a (2026-07-03) `APP_SPEC.md` §16.1a die synchronisierte, operative Spec-Quelle — sie beschreibt den tatsächlich gebauten, von Albert bestätigten stehenden Rubikon-Screen (kein Morph, kein C2, DOM-Overlay-Text), nicht mehr die ursprüngliche Drehbuch-Choreografie mit Achsenanimation. Für Screen 2 (Card-to-Point) und Screen 3 (Timing-Reveal) bleibt das Drehbuch weiterhin die alleinige Soll-Quelle, da diese Teile noch nicht gebaut sind.

**Warum wichtig:** Die Drehbuch-Datei ist im Git-Status untracked. Ein Claude, der nur `git log`/`git status` prüft, würde sie leicht übersehen oder ihre Autorität anzweifeln. Der untracked-Status ist ausdrücklich nur ein Commit-Hinweis, keine fachliche Unsicherheit. Für Screen 4 gilt jetzt zusätzlich: Drehbuch-Beat 1 (Achsenanimation) und Beat 3 (Text unter dem Chart) sind im Drehbuch selbst als „abgelöst" markiert, Beat 2 (✅/❓-Symbolik) explizit als „offen, nie entschieden" — nicht als abgelöst verwechseln.

**Kernbefund aus AP-prokrast-02c (Architektur-Kontrakt):** Der bestehende `xDisplayRange`/`displayRange`-Mechanismus (Chart-Engine, AP-14b) trägt die Rubikon-Zukunftsraum-Mechanik (Screen 4) bereits strukturell — keine Obergrenzenprüfung in `LineChartStrategy.transform()`, `FwVerticalLinePlugin` positioniert sich bereits am letzten echten Datenpunkt. Card-to-Point (Screen 2, Kartenschrumpf-Animation) hat dagegen keine bestehende Koordinaten-Schnittstelle — höchstes Architekturrisiko im gesamten Drehbuch, weiterhin ungebaut.

**Offene Punkte (BACKLOG AP-26/AP-27, Stand 2026-07-03):** (1) ✅/❓-Symbolik auf Screen 4 ist eine echte offene Produktentscheidung, weder gebaut noch verworfen — vor Bau mit Albert klären. (2) `Apps/prokrastinations-preis/QA_TEST_CASES.md` (Stand 2026-06-18, V1.4) ist nicht auf den AP-04a-Stand synchronisiert — Zeile 557/TC-F01 trägt noch die alte, in APP_SPEC.md bereits korrigierte Formulierung „Kein Zukunftschart.". Card-to-Point und Screen-3-Timing-Reveal bleiben nachgelagerte Pflichten ohne festen Termin.

**Wie anwenden:** Bei Arbeit an Screen 4 zuerst `APP_SPEC.md` §16.1a lesen (operative Spec). Bei Arbeit an Screen 2/3 weiterhin das Drehbuch als Soll lesen. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-01…04c_*_Ergebnis.md`. Nächster Schritt wartet auf Alberts Wahl zwischen drei Kandidaten (Beat-2-Klärung / QA_TEST_CASES.md-Sync / Card-to-Point-Schnittstelle) — siehe AP-prokrast-04c-Rücklaufkapsel.
