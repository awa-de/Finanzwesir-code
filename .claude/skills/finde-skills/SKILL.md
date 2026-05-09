---
name: finde-skills
description: Sucht Skills aus externen Marktplätzen, prüft sie sicherheitstechnisch und integriert sie nach Alberts OK. Tiered-Suche, Haiku für Mechanik, Sonnet für Review und Gate.
---

# /finde-skills — Skill-Suche und Integration

## Aufgabenteilung

| Aufgabe | Modell |
|---|---|
| Inventar-Scan, Web-Fetches, rohe Skill-Dateien laden | Haiku-Subagent |
| Qualifizieren, Security-Review, Integration, Gate | Sonnet (Haupt-Thread) |

Haiku wird nie für Qualifizierung, Security-Urteil oder Gate eingesetzt — auch nicht wenn der Ablauf schneller wäre.

---

## Ablauf

### Schritt 1 — Bedarf klären (Sonnet)

Session-Kontext vorhanden (aktives AP, laufende Arbeit)?
→ Bedarf ableiten, Albert kurz bestätigen lassen: „Du brauchst einen Skill für [X] — stimmt das?"

Frische Session ohne Kontext?
→ Eine Frage: „Was soll der Skill können? Beschreib den Anwendungsfall."

Erst wenn Bedarf explizit bestätigt: weiter mit Schritt 2.

---

### Schritt 2 — Inventar prüfen (Haiku-Subagent)

Haiku führt Glob über `.claude/skills/**/*.md` aus.
Prüft: Gibt es einen Skill, dessen `description`-Frontmatter den Bedarf abdeckt?

Treffer → Treffer zeigen, fragen ob ausreichend. Kein Netz-Aufruf.
Kein Treffer → Schritt 3.

---

### Schritt 3 — Tiered-Suche (Haiku-Subagent)

Haiku führt alle vier Stufen der Reihe nach durch:

**Stufe 1:** `https://github.com/anthropics/skills`
Dateiliste + Beschreibungen laden.

**Stufe 2:** `https://github.com/vercel-labs/agent-skills`
Dateiliste + Beschreibungen laden.

**Stufe 3:** GitHub-Suche `topic:claude-code-skills`
Top-10 nach Stars, gefiltert: letzter Commit < 12 Monate alt.
Stufe 3 immer ausführen — auch wenn Stufe 1+2 bereits Treffer liefern.

**Stufe 4:** `https://claudemarketplaces.com/skills`
Nur wenn Stufen 1–3 zusammen weniger als 3 relevante Kandidaten ergeben.

Rückgabe an Sonnet: rohe Kandidaten-Liste (Name, URL, Stars, letzter Commit, Kurzbeschreibung).

---

### Schritt 4 — Qualifizieren (Sonnet)

Pro Kandidat bewerten:

- **Relevanz** zum Bedarf (hoch / mittel / gering)
- **Aktualität** (letzter Commit-Datum)
- **Stars** (Proxy für Reife und Verbreitung)
- **Format-Kompatibilität:** Hat die Datei SKILL.md-Frontmatter? Funktioniert ohne externe CLI (kein `npx`, kein eigenständiger Server)?
  → Direkt verwendbar | Anpassbar | Nur Filetstücke verwertbar | Inkompatibel

Ausgabe: max. 5 Kandidaten, tabellarisch, mit Kurzurteil pro Dimension.
Inhaltlich wertvolle aber format-inkompatible Kandidaten nicht verwerfen — als „Filetstücke" markieren.

---

### Schritt 5 — Security-Review (Haiku holt, Sonnet prüft)

Für jeden Kandidaten, den Albert weiterverfolgen will:

**Haiku:** Rohen SKILL.md-Inhalt von der Quell-URL laden, unverändert zurückgeben.

**Sonnet liest vollständig** und beantwortet die folgende Checkliste explizit — kein Punkt darf ausgelassen werden:

1. Was tut dieser Skill? (2–3 Sätze)
2. Welche Tools werden aufgerufen? (WebFetch, Bash, Edit, Write, Agent, …)
3. Gibt es externe URLs im Skill? → explizit benennen mit Zeile
4. Gibt es Shell-Befehle (Bash)? → explizit benennen mit Zeile
5. Gibt es Dateioperationen (Edit, Write, Delete)? → Pfade benennen
6. Gibt es Zugriff auf sensible Pfade (.env, Credentials, PROTECTED_PATHS-Pfade)?
7. Gibt es Schleifen, rekursive Aufrufe oder Subagenten-Ketten?
8. Gesamturteil: unbedenklich | prüfenswert | kritisch

**Ergebnis als Datei speichern:**
`docs/steering/audits/skills-review/[name]-review.md`

Dateiformat:

```
# Review: [Skill-Name]
Datum: YYYY-MM-DD
Quelle: [URL]
Stars: N | Letzter Commit: YYYY-MM-DD

## Was der Skill tut
[2–3 Sätze]

## Tool-Aufrufe
[Liste]

## Externe URLs
[Liste mit Zeile — oder: keine]

## Shell-Befehle
[Liste mit Zeile — oder: keine]

## Dateioperationen
[Liste mit Pfad — oder: keine]

## Sensible Pfade
[Liste — oder: keine]

## Schleifen / Rekursion
[Beschreibung — oder: keine]

## Gesamturteil
unbedenklich | prüfenswert | kritisch

## Format-Kompatibilität
Direkt verwendbar | Anpassung nötig | Nur Filetstücke | Inkompatibel

## Empfehlung
Installieren | Anpassen | Filetstücke extrahieren | Verwerfen

## Status
[leer bis Alberts Entscheidung — dann: installiert | angepasst | Filetstücke | verworfen]
```

Albert liest die gespeicherte Datei. Kein weiterer Schritt ohne Alberts explizite Entscheidung.

---

### Schritt 6 — Albert entscheidet (Full-Gate — keine Ausnahme)

`/pre-code-gate full` ausführen für die geplante Integration.
Kein Bypass, auch wenn der Skill „offensichtlich harmlos" wirkt.
Bösartiger Skill kann `.claude/`-System beschädigen.

Alberts Entscheidungsoptionen:

- **Installieren** → Schritt 7, direkt
- **Anpassen** → Sonnet passt Format an, Review-Datei mit Änderungsnotiz ergänzen, erneutes OK
- **Filetstücke** → Sonnet extrahiert verwertbare Abschnitte, baut eigene SKILL.md, neues Gate
- **Verwerfen** → nächsten Kandidaten vorschlagen oder Suche verfeinern

---

### Schritt 7 — Integration (Sonnet)

**Direkt kompatibel:**
`.claude/skills/[name]/SKILL.md` anlegen.

**Anpassung nötig:**
Sonnet adaptiert Inhalt: Format-Frontmatter korrigieren, `npx`/externe CLI-Aufrufe entfernen oder ersetzen, Sprachstil angleichen. Dann SKILL.md anlegen.

**Filetstücke:**
Sonnet baut neue SKILL.md aus den verwertbaren Abschnitten. Rest verwerfen. Neue SKILL.md erhält eigene `name`- und `description`-Felder.

**Nach jeder Integration:**
1. `NAVIGATION.md` Skills-Tabelle ergänzen (Slash-Kommando | Wann | Trigger)
2. Review-Datei `## Status`-Feld aktualisieren: `installiert | angepasst | Filetstücke`
3. Bestätigung ausgeben: „[Name] installiert unter `.claude/skills/[name]/`. Test: /[name]"
