/start

Fortführung: Selbstlernendes System — Implementierung
Stand: 2026-05-05 | Faden 3 (nach Planung + Kritik-Härtung + HRO-Explizitätsprüfung)

\---

## Letzter Stand

* PLAN-Synthese.md ist vollständig und gehärtet — das ist die verbindliche Spec
* Kritik-Härtung integriert (4 Kritiker, 11-Punkte-Schlussbilanz, alle ✅)
* 7 Lücken + Bonus geschlossen: Tag-Kriterien, AP-ID-Abgleich, Verhaltens-Proxies,
pref-pending, Hygiene-Vorschlag, 2-Schritt-Clustering, MODUS M ↔ /uebergabe Kopplung,
Abbruch-Format
* Implementierungstabelle aktualisiert (Schritt 8 CLAUDE.md explizit aufgeführt)
* Noch keine Implementierungsschritte ausgeführt

## Nächster Schritt

Implementierung Schritt 1: `.claude/learning/session-log.md` anlegen (leere Vorlage).
Danach Schritt 2: `.claude/learning/patterns.md` (Vorlage + Bestandsliste).
Nach jedem Schritt wartet Claude auf Alberts manuelle Test-Bestätigung — kein Batch.

Vollständige Reihenfolge in PLAN-Synthese.md, Abschnitt "Implementierungstabelle".

## Mündliche Entscheidungen (noch nicht in Dateien)

* "Erweiterung statt Synthese" ist bewusste Designentscheidung für Stufe 1 —
Stufe 2 (echte Agentenlogik) kommt in \~4 Monaten
* Schuld ist irrelevant — Einträge beschreibend, nicht evaluativ (HRO-Prinzip)
* Lastabwurf-System (MODUS N/R/M/A) gehört in CLAUDE.md (Schritt 8), nicht nur in einen Skill
* /uebergabe ist eigenständiger Mehrwert, kein Scope-Creep — der Breadcrumb verbindet ihn
mit dem Lern-Loop

## Zu lesen vor Implementierung

1. PLAN-Synthese.md — vollständig (das ist die Spec, nicht überspringen)
2. SKILL-uebergabe.md — für Schritt 7 (Entwurf liegt dort)
3. Bestehende Skills und Commands lesen bevor erweitert wird:

   * `.claude/skills/abschluss-ritual/SKILL.md` (für Schritt 3)
   * `.claude/commands/start.md` (für Schritt 4)
   * `.claude/skills/kassensturz/SKILL.md` (für Schritt 5)

## Tabu-Check (gilt für die gesamte Implementierung)

* Kein Eingriff in Layer 1 (FinanzwesirData.js, CSVParser.js, FwDateUtils.js)
* ATTEMPT-LOG.json nicht berühren (andere Funktion)
* CLAUDE.md §8-Gate bleibt — Lastabwurf-System (Schritt 8) wurde in der Planungsphase
explizit von Albert freigegeben

