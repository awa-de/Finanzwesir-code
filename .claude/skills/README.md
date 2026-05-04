# Persönliche Skills – Finanzwesir

## 1. Zweck dieses Verzeichnisses

Dieses Verzeichnis enthält alle persönlichen Skills, die Claude Code für dieses Projekt (und ggf. darüber hinaus) nutzen soll.  
Ziel ist eine **übersichtliche, wartbare Sammlung** von klar benannten Fähigkeiten, die Claude helfen, wiederkehrende Aufgaben und Arbeitsweisen konsistent auszuführen.

## 2. Namenskonventionen

- Kern-Skills, die immer aktiv sein sollen oder große Wirkung haben, bekommen eine führende Nummer:  
  - `00-...` für globale Stil-/Meta-Skills (z.B. Kommunikationsstil).  
  - `01-...`, `02-...` für globale Prozess-/Arbeitsablauf-Skills.
- Fach- oder projektbezogene Skills ohne Nummer, mit sprechenden Namen in `kebab-case`, z.B.:  
- `chart-debugging`, `csv-audit`, `travel-planning`, `fintech-analysis`.
- Ordnername und `name:` im Frontmatter der `SKILL.md` sind identisch.
- Beschreibungen (`description:`) kurz und prägnant, damit Claude die Einsatzfälle gut erkennt.

## 3. Aktuelle Skills

| Name                          | Typ      | Zweck                                                          | Wann einsetzen?                                       |
|------------------------------|----------|----------------------------------------------------------------|-------------------------------------------------------|
| 00-style-sei-deutsch         | Style    | Globaler Kommunikationsstil: sachlich, direkt, keine Floskeln | Immer, automatisch für alle Antworten                 |
| 01-process-extreme-ownership | Process  | Briefing-Analyse nach Extreme Ownership                        | Bei neuen Projekten / größeren Vorhaben, vor dem Start|

## 4. Pflege und Erweiterung

- **Neue Skills nur bei klaren, wiederkehrenden Mustern** anlegen (z.B. immer gleiche Art von Code-Review, immer gleiche Art von Reiseplanung).
- Vor dem Anlegen prüfen:
  - Gibt es bereits einen Skill, der 80 % des gewünschten Verhaltens abdeckt?  
  - Gehört die neue Logik eher in einen bestehenden Skill als Erweiterung?
- Regel: Lieber **wenige, scharfe Skills** als viele, überlappende.
- Bei Änderungen:
  - `README` aktualisieren (Zeile ergänzen oder Zweck anpassen).
  - In `CLAUDE.md` nur auf wirklich globale Skills verweisen (z.B. Kommunikationsstil), nicht auf jeden Fach-Skill.
