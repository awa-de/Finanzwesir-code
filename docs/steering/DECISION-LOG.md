**Stand:** 2026-05-03 12:00 | **Session:** Masterplan-Abschluss | **Geändert von:** Claude

# Decision Log — Finanzwesir 2.0

**Zweck:** Architekturentscheidungen nachvollziehbar dokumentieren.
**Zielgruppe:** Claude und Albert.
**Wann lesen:** Vor Architekturänderungen.
**Wann aktualisieren:** Wenn eine neue Architekturentscheidung getroffen wird.
**Gehört hier hinein:** Entscheidungen mit Problem, Begründung, Konsequenz und Invariante.
**Gehört nicht hier hinein:** Kleine Bugfixes, reine Statusnotizen, offene Tagesaufgaben.

---

## Template

### D-XX: Titel

Datum: YYYY-MM-DD
Status: beschlossen / offen / verworfen

#### Problem

TBD

#### Entscheidung

TBD

#### Begründung

TBD

#### Alternativen

TBD

#### Konsequenzen

TBD

#### Invariante

TBD

#### Revisit

TBD

---

## D-OPEN-1: Versionierung des Projekt-Gehirns

Datum: 2026-05-02
Status: offen

#### Problem

`docs/` und `.claude/` enthalten zentrale Entscheidungen und Verhaltensregeln, sind aber derzeit nicht versioniert wie Code. Cloud-Sync (Nextcloud) ist keine echte Versionsgeschichte.

#### Entscheidung

Keine Änderung jetzt. Root-Git am Projektroot bleibt tabu.

#### Begründung

Root-Git würde in Konflikt mit `Theme/.git` treten und könnte sensible Ordner (`Active Campaign Liste/`) in den Git-Sichtbereich bringen.

#### Alternativen

1. Weiter nur Cloud-Sync
2. Separates Git-Repo nur für `docs/` + `.claude/` (keine Überschneidung mit Theme)
3. Root-Git für alles

#### Konsequenzen

Verlust von Doku-Versionshistorie bleibt ein Risiko. Tracking verhindert Vergessen.

#### Invariante

Kein Root-Git ohne explizite Entscheidung. Separates Gehirn-Git (Option 2) nach Prozesshärtung prüfen.

#### Revisit

Nach Theme-Deploy oder wenn Doku-Verlust konkret eingetreten ist.

---

## D-OPEN-2: Backend-Einführung

Datum: 2026-05-02
Status: offen — Leitplanke

#### Problem

Apps könnten Funktionalitäten erfordern, die ein Backend nahelegen.

#### Entscheidung

Kein Backend ohne explizite Architekturentscheidung und Eintrag hier.

#### Begründung

Projekt ist bewusst backendlos (KDR: Client-Side). Backend wäre fundamentaler Scope-Wechsel.

#### Alternativen

1. Weiter backendlos (aktuell)
2. Serverless Functions (z.B. Ghost Custom Integrations)
3. Vollständiges Backend

#### Invariante

Keine implizite Backend-Einführung durch App-Code.

#### Revisit

Wenn eine App-Funktion nachweislich nicht clientseitig lösbar ist.

---

## D-OPEN-3: Multi-CLAUDE.md für Apps

Datum: 2026-05-02
Status: offen — Trigger dokumentiert

#### Problem

Mit wachsender App-Entwicklung könnte die Root-`CLAUDE.md` aufgebläht werden.

#### Entscheidung

Kein `Apps/.claude/CLAUDE.md` jetzt.

#### Begründung

Apps sind noch embryonal. Eine zweite CLAUDE-Datei jetzt wäre Overhead.

#### Invariante

Trigger: Wenn `Apps/` eigene dauerhafte Implementierungsarbeit erhält → prüfen.

#### Revisit

Wenn erste App produktiv in Entwicklung geht.

---

## D-OPEN-4: Blueprint-Extraktion

Datum: 2026-05-03
Status: offen — Begriff noch nicht definiert

#### Problem

Im Masterplan Phase 4 als aufzuschiebende Architekturarbeit genannt.
Was genau extrahiert werden soll (Muster, Templates, Entscheidungsrahmen?)
ist noch nicht geklärt.

#### Entscheidung

Keine jetzt.

#### Invariante

Nicht angehen, solange Begriff und Scope nicht definiert sind.

#### Revisit

Wenn Albert konkret beschreiben kann, was „Blueprint-Extraktion" bedeutet.
