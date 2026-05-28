**Stand:** 2026-05-28 | **Session:** APP-01-B02-B03-Entscheidung | **Geändert von:** Claude

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

## D-APP-01-B03: Screen-Flow — Button-getrieben

Datum: 2026-05-28
Status: beschlossen

#### Problem

Drei mögliche Screen-Flow-Mechanismen für die 4-Screen-Narration: Autoplay, Scroll-triggered oder Button-triggered.

#### Entscheidung

Button-getriebener Screen-Flow für V1. Screens 1→2→3→4 per sichtbarem Button oder Tastatur (Enter/Space). Kein Autoplay. Kein Scroll-Trigger.

#### Begründung

Kontrollierbar, testbar, barriereärmer und einfacher zu implementieren. Für den ersten Daten-/Chart-/Story-Pilot wichtiger als cineastische Eleganz. prefers-reduced-motion wird respektiert: Übergänge deaktiviert, direkt Zielzustand.

#### Alternativen

Scroll-triggered (nicht für V1): Höherer Implementierungsaufwand, schwerer testbar, Barrierefreiheit komplexer — für V2+ nicht ausgeschlossen.
Autoplay (verworfen): Nicht kontrollierbar, nicht barrierefrei.

#### Konsequenzen

§14.3 und §12.5 APP_SPEC aktualisiert. Scroll-triggered ist kein V1-Scope.

#### Invariante

Kein Autoplay ohne erneute explizite Entscheidung.

#### Revisit

Wenn V1 produktiv ist und cineastischer Flow als Verbesserung evaluiert wird.

---

## D-APP-01-B02: Berechnungsformel — Anteilslogik

Datum: 2026-05-28
Status: beschlossen

#### Problem

Zwei mögliche Berechnungsansätze für den simulierten Sparplan: (a) monatliche Anteilslogik oder (b) vereinfachte Annuität mit Durchschnittsrendite.

#### Entscheidung

Anteilslogik. Für jeden Monat t: `Anteile += monatlicheRate / indexValue[t]`; `depotwert[t] = Anteile × indexValue[t]`. startBetrag bleibt optional (Default 0); für V1 kann er in der UI entfernt werden.

#### Begründung

Die App lebt davon, echte Einbrüche sichtbar zu machen. Eine Durchschnittsrendite würde genau den historischen Beweis zerstören — sie mittelt Einbrüche heraus und produziert eine geglättete Kurve statt der echten Strecke.

#### Alternativen

Annuität mit Durchschnittsrendite (verworfen): Einfacher zu implementieren, aber inhaltlich falsch für den Zweck dieser App.

#### Konsequenzen

§7.4 und §13 Schritt 4 APP_SPEC aktualisiert. Annuität und Durchschnittsrendite sind für diese App dauerhaft ausgeschlossen.

#### Invariante

Keine Durchschnittsrendite-Formel ohne erneute explizite Entscheidung.

#### Revisit

Nicht vorgesehen.

---

## D-APP-01-E02: Pilot-Reihenfolge

Datum: 2026-05-28
Status: beschlossen

#### Problem

APP_SPEC §17 E-02 hatte offen gelassen, ob B1 (prokrastinations-preis) technischer Pilot-1 bleibt oder ob ein einfacherer Calculator vorgeschaltet wird. Die Marktzeit-Mechanik hat externe Datenpipeline, Chart und 4-Screen-Flow — deutlich komplexer als der ursprüngliche Calculator-Pilot.

#### Entscheidung

1. `risiko-uebersetzer` = technischer Calculator-Pilot (Pilot-1): App-Shell, Slider, Formel, KPI, CTA, State-Modell, A11y, Ghost-Card-Vertrag validieren.
2. `prokrastinations-preis` = erster Daten-/Chart-/Story-Pilot (Pilot-2): JSON-Datenpipeline, historischer Chart, Screen-Flow, Entscheidungspunkt-Marker, AssumptionsBox validieren.

#### Begründung

Calculator-Mechanik zuerst härten (keine externe Datenpipeline, geringere Komplexität), dann historische Datenpipeline und Chart als zweiter Komplexitätsschritt.

#### Alternativen

B1 bleibt Pilot-1 (verworfen): Die Marktzeit-Mechanik wäre als erster Pilot zu komplex — externe Daten, Chart-Engine-Entscheidung, 4-Screen-Flow gleichzeitig in einem ungetesteten Factory-Setup.

#### Konsequenzen

05_PILOT_STRATEGY.md aktualisiert. APP_SPEC §1/§3/§17/§19.10 aktualisiert. risiko-uebersetzer rückt in Pilot-1-Position.

#### Invariante

Kein Tausch der Pilot-Reihenfolge ohne erneute explizite Entscheidung von Albert.

#### Revisit

Nur wenn risiko-uebersetzer als Pilot ungeeignet erscheint oder prokrastinations-preis vorgezogen werden soll.

---

## D-APP-01-E01: App-Familie prokrastinations-preis

Datum: 2026-05-28
Status: beschlossen

#### Problem

APP_SPEC §17 E-01 hatte offen gelassen, ob prokrastinations-preis als Szenario-/Vergleichs-App oder als Calculator/Eingabe-Tool konzipiert wird. Beide Ansätze wären technisch umsetzbar, aber architektonisch unterschiedlich.

#### Entscheidung

Szenario-/Vergleichs-App mit Storytelling-Elementen. Kein Calculator.

#### Begründung

Albert hat explizit entschieden. APP_SPEC §3 (Kernkonzept Szenario-Vergleich) bleibt inhaltlich gültig und bildet weiterhin die Grundlage.

#### Alternativen

Calculator-Ansatz (verworfen): Nutzereingaben statt vorberechnete Szenarien — inhaltlich möglich, aber nicht der gewählte Weg.

#### Konsequenzen

Slice-0-Implementierung und alle Folge-Slices folgen dem Szenario-Modell. Alle Folge-Dokumente dürfen E-01 als entschieden behandeln.

#### Invariante

Kein Calculator-Element ohne erneute explizite Entscheidung von Albert.

#### Revisit

Nur wenn Storytelling-Ansatz nachweislich scheitert.

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
