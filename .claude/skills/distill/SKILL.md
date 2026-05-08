---
name: distill
description: Destilliert session-log.md zu Mustern in patterns.md. Manuell oder von /start empfohlen wenn Schwelle erreicht. Kein Kalender-Trigger.
---

# Skill: distill

Trigger: Manuell auf Alberts Wunsch — oder von /start empfohlen (≥5 Einträge ODER >14 Tage seit letztem Distill).
Löst /distill NICHT automatisch aus — Albert entscheidet wann.

---

## Sequenz

**1. Lesen**
`.claude/learning/session-log.md` vollständig lesen.
`.claude/learning/patterns.md` vollständig lesen.

**2. Einträge nach Tag gruppieren**
- [FRICTION] → potenzielle Muster-Kandidaten
- [WIN]       → Bestätigung dass etwas gut läuft (notieren, kein Kandidat)
- [PREF]      → Status „pref-pending" in patterns.md (kein direktes Promote — Albert bestätigt hier)
- [QUESTION]  → Offene Frage in patterns.md notieren
- [OK]        → Zähler für Qualitätsrate (kein weiterer Eintrag nötig)

**3. Muster-Clustering (Toyota Andon-Prinzip: kein stilles Clustering)**

Gestufte Schwelle:
- ≥1 Beleg bei High-Impact → sofort Kandidat (Vorschlag):
  High-Impact = Tabu-Zone berührt / Gate explizit übersprungen /
  Albert musste Richtung korrigieren / Regression erzeugt
- ≥2 Belege bei Normal-Impact → Kandidat:
  Normal-Impact = Stil, Präferenz, Prozessdetail

Ablauf:
a. Claude zeigt Gruppierungsvorschlag:
   „Diese [N] Einträge beschreiben vermutlich dasselbe Muster: [Beschreibung].
    Gleiche Ursache?" → Albert: j / n / reformulieren
b. Erst nach Alberts j → Kandidat in patterns.md eintragen. Kein stilles Clustering.

Einzelne [FRICTION]-Einträge (kein zweiter Beleg, kein High-Impact) → Status „observing".

**4. Kandidaten anzeigen**
Alle bestehenden Kandidaten aus patterns.md auflisten.
Für jeden Kandidaten: Albert entscheidet:
- j        → Promotion zur Zieldatei (siehe Routing unten)
- n        → Status „retired" + Ablehnungsgrund in patterns.md
- anpassen → Claude reformuliert, Albert bestätigt erneut

**5. [PREF]-Einträge bestätigen**
Für jeden „pref-pending"-Eintrag: Albert bestätigt j / n.
- j → Promotion zu memory/feedback_*.md
- n → Status „retired"

**6. Hygiene-Vorschlag**
Claude zeigt am Ende (kein stilles Archivieren — erst nach Alberts j):

„Hygiene-Vorschlag:
 Archivieren (>90 Tage observing): [Liste oder 'keine']
 Aus retired entfernen (FIFO, >15): [Liste oder 'keine']
 → Bestätigen mit 'j' oder überspringen"

Erst nach Alberts j → Verschieben nach `.claude/learning/patterns-archiv.md`.
Kein Eintrag wird unilateral gelöscht.

**7. Abschluss**
- session-log.md leeren (nur Header-Zeilen behalten)
- patterns.md Stand-Datum aktualisieren
- Ausgabe: „Distill abgeschlossen. [N] Kandidaten promoted, [M] retired, [K] observing."

---

## Routing der Promotions

| Typ | Zieldatei |
|---|---|
| Präferenz / Kommunikation / Arbeitsweise | `memory/feedback_*.md` (neue Datei je Thema) |
| Projektfakt / Entscheidung | `memory/project_*.md` |
| Universelle Verhaltensregel | `CLAUDE.md` — nur via §8-Gate (alle 7 Bedingungen!) |
| Wiederholbarer Workflow | `.claude/skills/[name]/SKILL.md` |

---

## Schlüsselregeln

- Kein stilles Clustering, kein stilles Archivieren, kein stilles Löschen.
- Jede Promotion braucht Alberts j.
- CLAUDE.md-Promotions: §8-Gate bleibt — alle 7 Bedingungen müssen erfüllt sein.
