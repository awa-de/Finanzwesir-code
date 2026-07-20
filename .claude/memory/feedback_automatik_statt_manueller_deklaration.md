---
name: feedback-automatik-statt-manueller-deklaration
description: "Albert bevorzugt automatische, strukturell eindeutige Erkennung gegenüber manueller Deklaration durch den Menschen — bestätigt zweimal in der CSV-App-Daten-Pipeline (APP-DATA-02/03a, 2026-07-20)."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 374cb29b-effd-4476-8f47-87224c62ab03
  modified: 2026-07-20T20:15:02.971Z
---

Wenn ein vorgelagerter Planungsfaden eine "keine Heuristik / Nutzer deklariert das explizit"-Regel festlegt, hält das nicht automatisch stand, sobald Albert das System real benutzt.

**Why:** Zweimal in derselben AP-Kette (CSV-App-Daten-Pipeline) wurde eine ursprünglich als Architekturentscheidung festgelegte "keine Heuristik"-Vorgabe von Albert nach echtem Praxiskontakt explizit verworfen:
1. APP-DATA-03a: Der Patch verlangte, dass Albert die Datenform (`timeseries`/`snapshot`) manuell in einer JSON-Datei pflegt. Nach dem ersten echten Doppelklick-Testlauf lehnte er das ab: „Menschen, die was in JSON eintragen, machen nur Fehler." Verlangt wurde stattdessen automatische Erkennung durch Ausprobieren beider Interpretationen.
2. Der zugrunde liegende Mechanismus (Snapshot-Plausibilitätsprüfung: Kategorie-Spalte darf nicht komplett aus ISO-Daten bestehen) war bereits vorher in APP-DATA-02 als gezielter Fix für dieselbe Art Fehler entstanden — dort ebenfalls, nachdem Albert live einen echten Fehlerfall gefunden hatte, nicht vorab spekulativ gebaut.

**How to apply:** Bei künftigen Aufträgen, die eine manuelle Nutzereingabe für etwas verlangen, das aus vorhandenen Daten strukturell ableitbar wäre (Dateiformat, Typ, Kategorie einer Datei o. ä.): Wenn eine strukturell eindeutige Erkennung ohne echtes Rate-Risiko möglich ist (siehe Muster in `csv-validator.mjs`/`server.js`: zwei Interpretationen durchprobieren, Ausschlussregel macht sie gegenseitig exklusiv), das als naheliegende Alternative benennen — auch wenn eine übergeordnete Spec „keine Heuristik" sagt. Bei explizitem Nutzertest-Feedback in diese Richtung nicht auf der ursprünglichen Vorgabe beharren, sondern die Umkehrung sauber begründen und umsetzen (Alberts eigene, aktuelle Anweisung sticht die Vorgabe eines fremden Planungsfadens).
