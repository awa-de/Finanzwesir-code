# Kochrezept: Von der Homepage-Werkstatt zur statischen HTML-Seite

## Ziel dieser Phase

Fertig ist diese Phase, wenn es eine vollständige statische HTML-Datei gibt, die lokal im Browser geöffnet werden kann und die Homepage so zeigt, wie der Nutzer sie später erleben soll.

Nicht Teil dieser Phase:

- Zerlegung in Ghost.io-Templates
- Handlebars-Partials
- Ghost-Routing
- produktives Deployment
- finale Server-/Build-Pipeline

---

## Arbeitsprinzip

Erst Dramaturgie, dann Text, dann HTML.

Nicht mit HTML anfangen, solange nicht klar ist:

- welche Stationen es gibt
- welche App an welcher Stelle sitzt
- welche Übergangstexte die Stationen verbinden
- was der Nutzer nach jeder Station fühlen/verstehen soll

---

# Checkliste

## Phase 1: Grundlagen fixieren

- [ ] `00-master-synthese-peer-reviews.md` lesen.
- [ ] `01-positionierung-und-zielbild.md` lesen.
- [ ] Prüfen: Ist die Mission „Komplexität zerstören“ noch die Leitentscheidung?
- [ ] Prüfen: Ist klar, dass die alte v12-HTML-Datei nur Referenz ist?

**Ergebnis:** Alle Beteiligten wissen, dass eine Funnel-Homepage gebaut wird, kein Blogportal.

---

## Phase 2: Funnel finalisieren

- [ ] `03-funnel-architektur.md` lesen.
- [ ] Reihenfolge der Stationen bestätigen.
- [ ] Entscheiden, ob alle 8 Stationen in die erste HTML-Version kommen.
- [ ] Falls Apps noch nicht fertig sind: Platzhalter definieren.
- [ ] Für jede Station ein Ziel formulieren: Welche Blockade wird zerstört?

**Ergebnis:** Eine endgültige Stationenliste für die erste statische HTML-Version.

---

## Phase 3: App-Mapping klären

- [ ] `04-stationen-und-app-mapping.md` öffnen.
- [ ] Für jede Station prüfen: Gibt es die App schon?
- [ ] Fehlende Apps markieren: insbesondere ETF-Ära-App und Plan-Generator.
- [ ] Entscheiden: Wird für fehlende Apps ein realistischer Platzhalter gebaut?
- [ ] Vertiefungs-Apps bewusst aus dem Hauptpfad heraushalten.

**Ergebnis:** Klare Liste: echte Apps, Platzhalter, spätere Apps.

---

## Phase 4: Texte schreiben

- [ ] `06-uebergangstexte-und-microcopy.md` öffnen.
- [ ] Hero final schreiben.
- [ ] Pro Station schreiben:
  - [ ] innerer Satz des Nutzers
  - [ ] Headline
  - [ ] Einstiegstext
  - [ ] App-Auftrag
  - [ ] Erkenntnis nach der App
  - [ ] CTA / Übergang
- [ ] Den „Dunkelsten Punkt“ zwischen Diversifikation und Einfachheit einbauen.
- [ ] Regulatorik-App mit historischem Anker absichern.
- [ ] Skeptiker-Satz im Hero einbauen.
- [ ] Wiedereinsteiger-Satz vor dem Crash-Test einbauen.

**Ergebnis:** Die komplette Homepage liegt als Text-/Story-Dokument vor, noch ohne HTML.

---

## Phase 5: HTML-Gerüst planen

- [ ] Alte HTML-Version in `09-erste-html-version/` ansehen.
- [ ] Entscheiden, welche visuellen Elemente wiederverwendet werden dürfen.
- [ ] Alte Rubriken-Navigation entfernen oder ersetzen.
- [ ] Neues HTML-Gerüst planen:
  - [ ] Header
  - [ ] Hero
  - [ ] lineare Stationen
  - [ ] App-Container
  - [ ] Übergangstexte
  - [ ] Abschluss
  - [ ] Footer

**Ergebnis:** Skizze der statischen HTML-Struktur.

---

## Phase 6: Statische HTML-Datei bauen

- [ ] Neue Datei erstellen, zum Beispiel:

```text
build/homepage-static/finanzwesir-homepage-funnel-v1.html
```

- [ ] Hero einbauen.
- [ ] Stationen in der finalen Reihenfolge einbauen.
- [ ] App-Container einsetzen.
- [ ] Für fehlende Apps deutliche Platzhalter einfügen.
- [ ] Übergangstexte zwischen den Stationen einbauen.
- [ ] Finalen CTA einbauen.
- [ ] Keine Ghost-spezifische Logik einbauen.

**Ergebnis:** Erste vollständige statische HTML-Version.

---

## Phase 7: Lokal testen

- [ ] HTML-Datei lokal im Browser öffnen.
- [ ] Einmal von oben bis unten lesen.
- [ ] Prüfen: Fühlt sich die Seite wie eine Reise an oder wie eine Tool-Sammlung?
- [ ] Prüfen: Ist der Hero ein Spiegel oder ein Versprechen?
- [ ] Prüfen: Sind die Übergänge verständlich?
- [ ] Prüfen: Gibt es Stellen, an denen der Nutzer hängen bleibt?
- [ ] Prüfen: Ist die Seite zu lang?
- [ ] Prüfen: Ist die Regulatorik-App aktivierend statt lähmend?
- [ ] Prüfen: Führt der Plan-Generator zu einem konkreten ersten Schritt?

**Ergebnis:** Review-Notizen zur ersten HTML-Version.

---

## Phase 8: Erste inhaltliche Revision

- [ ] Schwache Übergänge kürzen oder schärfen.
- [ ] Wiederholungen entfernen.
- [ ] App-Platzhalter konkretisieren.
- [ ] CTAs vereinheitlichen.
- [ ] Ton prüfen: Mentor, nicht Ratgeber.
- [ ] Alles entfernen, was nur interessant ist, aber den Funnel nicht trägt.

**Ergebnis:** `finanzwesir-homepage-funnel-v2.html`

---

## Phase 9: Entscheidung „bereit für Ghost-Zerlegung?“

Die HTML-Seite ist bereit für den nächsten Task, wenn alle Aussagen zutreffen:

- [ ] Die Seite hat einen klaren linearen Hauptpfad.
- [ ] Jede Station zerstört eine erkennbare Blockade.
- [ ] Die Apps sind nicht isoliert, sondern dramaturgisch eingebettet.
- [ ] Die alte Rubrikenlogik ist verschwunden.
- [ ] Der Nutzer erhält am Ende einen konkreten nächsten Schritt.
- [ ] Die Seite funktioniert lokal als vollständige Nutzererfahrung.

**Ergebnis:** Übergabe an den separaten Task „Ghost.io-Template daraus bauen“.

---

# Abnahmekriterien für die statische HTML-Seite

## Inhaltlich

- [ ] Hero trifft die Blockade.
- [ ] Nutzer wird durch Timing, Crash, Komplexität, ETF-Ära, Regulatorik und Risiko geführt.
- [ ] Einfachheit erscheint als robuste Lösung, nicht als Notnagel.
- [ ] Regulatorik macht wach, aber nicht panisch.
- [ ] Finale Handlung ist konkret.

## Dramaturgisch

- [ ] Die Seite hat Spannung.
- [ ] Es gibt einen dunkelsten Punkt.
- [ ] Danach entsteht Entlastung.
- [ ] Die Meta-Zweifel kommen spät.
- [ ] Der Abschluss ist ruhig, nicht marktschreierisch.

## Redaktionsqualität

- [ ] Keine generische Ratgeber-Sprache.
- [ ] Keine leeren CTAs.
- [ ] Keine Renditeversprechen.
- [ ] Keine Beschämung.
- [ ] Keine Dark Patterns.

## Praktisch

- [ ] HTML-Datei öffnet lokal.
- [ ] Keine Ghost-Abhängigkeit.
- [ ] Fehlende Apps sind klar als Platzhalter gekennzeichnet.
- [ ] Datei ist vollständig genug, um sie als Nutzerreise zu testen.


---

## Zusatzcheck: Claim-Logik prüfen

Vor dem Bau der statischen HTML-Seite prüfen:

- [ ] Ist der Hero ein Spiegel und kein Werbeversprechen?
- [ ] Wird „Finanzen geregelt – Freiräume geschaffen“ nicht als große Hero-Headline verheizt?
- [ ] Hat jede Station einen Claim-Anker?
- [ ] Wird der Claim am Ende verdient eingelöst?
- [ ] Führt der Plan-Generator zu einem konkreten ersten Schritt?
- [ ] Entsteht am Ende das Gefühl: nicht perfekt, aber geregelt genug?
