---
name: project-prokrastinations-preis-drehbuch
description: "prokrastinations-preis hat seit 2026-06-25 ein neues, amtliches UX-Drehbuch, das die alte APP_SPEC §16 als Soll ersetzt — Datei ist untracked, Status nicht aus Git ableitbar"
metadata: 
  node_type: memory
  type: project
  originSessionId: a35e85df-d14e-477e-b4b3-0052c090219a
---

`Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (Stand 2026-06-25) ist das amtliche, freigegebene fachliche Zielbild für die App `prokrastinations-preis` — nicht die ältere, im Code umgesetzte APP_SPEC.md §16 (UX/UI-Primitiven). Diese Freigabe wurde per Steuerfaden explizit erteilt und in der AP-prokrast-02-Kette (02a–02e, 2026-07-01/02) konsolidiert.

**Warum wichtig:** Die Datei ist im Git-Status untracked. Ein Claude, der nur `git log`/`git status` prüft, würde sie leicht übersehen oder ihre Autorität anzweifeln. Der untracked-Status ist ausdrücklich nur ein Commit-Hinweis, keine fachliche Unsicherheit — das ist keine aus dem Code ableitbare Tatsache, sondern eine Prozessentscheidung.

**Kernbefund aus AP-prokrast-02c (Architektur-Kontrakt):** Der bestehende `xDisplayRange`/`displayRange`-Mechanismus (Chart-Engine, AP-14b) trägt die im neuen Drehbuch geforderte Rubikon-Zukunftsraum-Mechanik (Screen 4) bereits strukturell — keine Obergrenzenprüfung in `LineChartStrategy.transform()`, `FwVerticalLinePlugin` positioniert sich bereits am letzten echten Datenpunkt. Kein Chart-Engine-Codepatch nötig für die Kernmechanik. Card-to-Point (Screen 2, Kartenschrumpf-Animation) hat dagegen keine bestehende Koordinaten-Schnittstelle — höchstes Architekturrisiko im gesamten Drehbuch.

**Wie anwenden:** Bei jeder künftigen Arbeit an `prokrastinations-preis` zuerst das Drehbuch lesen, nicht APP_SPEC §16 blind als Soll behandeln. Ergebnisprotokolle der Analysekette liegen unter `docs/steering/patches/AP-prokrast-01…02e_*_Ergebnis.md`. Nächster vorgemerkter Schritt: AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe (Screen 4 zuerst bauen, nicht Card-to-Point) — wartet auf Alberts OK.
