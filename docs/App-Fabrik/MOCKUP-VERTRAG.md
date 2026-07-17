Stand: 2026-07-17 | Session: AP-app-fabrik-04 | Geändert von: Claude

# Mockup-Vertrag — App-Fabrik

**Status:** AKTIV — verbindliche Arbeitsgrundlage für den Mockup-Track der App-Fabrik (Startlinie Punkt 2). Freigegeben durch Albert am 2026-07-17 (Entscheidungen E-01–E-04). Entscheidungsvorlage und Herleitung: `docs/steering/patches/AP-app-fabrik-03_mockup-vertrag-entscheidungsvorlage_Ergebnis.md`. Kein Produktionscode, kein Ersatz für die technische APP_SPEC.

Dieser Vertrag verhandelt den freigegebenen Tailwind-Baukasten (`docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`) und die kanonische Schnittstelle (`docs/spec/APP-INTERFACE.md`) **nicht** neu — er wendet sie an.

---

## 1. Zweck und Schutzgut

Der Mockup-Track stellt sicher, dass vor jeder technischen APP_SPEC feststeht, **ob eine App psychologisch wirkt** — nicht nur, ob sie technisch baubar ist.

**Geschützt** wird die psychologische Wirkungsabsicht der App (Zweck, Barriere, Zielzustand aus dem lokalen Steuerungsblock) und die Freiheit, sie zu verwerfen, bevor technische Investition sie unumkehrbar macht.

Ein Mockup ist strukturell eine **Knautschzone** (`docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md` §2.2): Es darf Fehler enthalten und existiert, um sie aufzunehmen, bevor sie die kanonische Wahrheit erreichen. Die technische APP_SPEC ist die Fahrgastzelle.

## 2. Eingang: Mini-Spec und lokaler Steuerungsblock

Ein Mockup-Auftrag ist nur zulässig, wenn vorliegen:

- die Mini-Spec der App;
- ein geprüfter lokaler Steuerungsblock (Zweck, zu entfernende Barriere, falscher Glaubenssatz, Zielzustand, Muss-Kriterien, Nicht-Ziele);
- eine **Wirkungshypothese** des Bauenden in maximal zwei Sätzen: Welche innere Bewegung soll der Nutzer durchlaufen, und an welchem Moment fällt die Barriere?

Fehlt oder widerspricht sich der Steuerungsblock: stoppen, nicht bauen.

## 3. Happy-Path-Mockup: zulässige Simulation und Nicht-Ziele

**Happy Path** ist der kürzeste zusammenhängende Weg, auf dem die im Steuerungsblock benannte Barriere fällt — nicht der Funktionsumfang der App. Er umfasst so viele Schritte, wie die Wirkung braucht:

- bei einer Rechner-App in der Regel Eingabe → Ergebnis → Einsichtssatz;
- bei einer App, deren Wirkung an der Informationsreihenfolge hängt (Beispiel `prokrastinations-preis`: der vollständige Rückblick erst im dritten von vier Schritten), umfasst er diese Reihenfolge vollständig — sonst testet das Mockup die App nicht.

**Explizite Nicht-Ziele.** Ein Mockup prüft und behauptet **nicht**:

- Datenrichtigkeit, Datenanbindung, Datenvalidierung, Cache-Busting;
- Error-, Empty- und Loading-States (`APP-INTERFACE.md` §8);
- Ghost-Card-Vertrag und `data-fw-*`-Attribute (`APP-INTERFACE.md` §3.1);
- Sicherheitsregeln (`APP-INTERFACE.md` §7) als Prüfgegenstand — als Baubarkeitsgrenze gelten sie weiter (§5 unten);
- A11y-Volltest, Screenreader-Abnahme, Kontrastaudit;
- Produktionsreife, Performance, Ghost-Integration.

Eine bestandene Mockup-Abnahme ist **keine** technische Freigabe (`TAKTISCHER_STARTPROMPT` §17: „Browser grün ist nicht Launch-Freigabe").

## 4. Datenfidelität (E-01)

Ein Mockup **darf** technische Datenanbindung, Berechnung und Aktualität simulieren.

Es **darf nicht** die psychologisch wirksame Beweis- oder Erlebnisbasis erfinden.

Welche Daten- und Inhaltsfidelität erforderlich ist, bestimmt der **lokale Steuerungsblock** der jeweiligen App. Verlangt er Echtdaten, benennt das Mockup die **statische Quelle und ihre Version**. Es wird keine Datenkopie und keine Live-Anbindung verlangt.

## 5. Freiheit für neue UI-Mechaniken

Neue Tailwind-basierte Wirkmechaniken sind **ausdrücklich erlaubt**. Eine nicht vorhandene Komponente ist kein Ablehnungsgrund.

Die Grenze verläuft nicht zwischen „vorhanden" und „neu", sondern zwischen **Andocken** und **Umlackieren**:

- **Erlaubt:** eine neue Mechanik als app-lokale Ergänzung unter `fw-app__*` / `--fw-*`, deklariert im Kopf (Baukasten §1 Besitzgrenzen-Regel, §11; Präzedenzfälle im Bestand: Card-to-Point-Flug, Rubikon-Overlay, Reveal-Timings).
- **Verboten:** ein vorhandenes Primitive optisch abweichend darstellen (Baukasten §6.11: „eine App-lokale Optikvariante eines gemeinsamen Primitives"). Abweichung nur bei **belegter abweichender Funktion**, nie als Geschmacksvariante.
- **Verboten:** aus einer neuen Mechanik im selben Zug ein allgemeines Primitive machen. Der Komponenten-Ledger kommt nach der App (Startlinie Punkt 12), nicht im Mockup.

**Optik und Verhalten:** Klassenvokabular aus Baukasten §6; Literalregel §2.2 gilt ab der ersten Zeile (keine Interpolation, keine Verkettung in Klassenstrings); alles Interaktive definiert `hover:`, `focus-visible:`, `active:`, `disabled:` und trägt `motion-reduce:` an jeder Transition (§4); beurteilbar auf 375/768/1280 px.

**Baubarkeitsgrenze:** kein Backend, Vanilla JS, keine Fremd-URLs, keine Mechanik, die nur mit `innerHTML` für Fremddaten funktionierte. Diese Grenzen werden nicht geprüft, aber nicht überschritten — ein Mockup darf keine unbaubare Erwartung erzeugen.

## 6. Wegwerfgrenze (E-03)

Mockup-Code ist ein **Wegwerfartefakt**. Er darf ausschließlich abbilden:

- den Happy Path;
- sichtbare Zustandswechsel;
- temporären lokalen UI-Zustand.

Die technische APP_SPEC übernimmt **nur** beobachtetes Verhalten, Gestaltung und Wirkungshypothese. Sie übernimmt **niemals** Mockup-JavaScript, Datenmodell, Modulstruktur, Schnittstellen, Bootstrapper oder Architekturentscheidungen.

## 7. Wirkungsprüfung und Rollentrennung (E-02)

Der bestehende **Vier-Kriterien-Prüfscore** aus dem lokalen Steuerungsblock (Barriere-Abbau, Zielzustand, Nicht-Ziele als KO, Mentorrolle) bleibt die **einzige Skala**. Keine zweite Jury-Matrix, keine modellseitige Freigabe.

| Rolle | Wer | Was |
|---|---|---|
| Vorab-Selbstprüfung | erstellendes LLM | führt den Prüfscore nur als Vorab-Selbstprüfung aus |
| Fremdkritik | unabhängiges Gegenmodell | liefert **ausschließlich qualitative** Kritik zu denselben Prüffragen; **vergibt keinen numerischen Score**; entscheidet nicht über das Produkt |
| Wirkung und Freigabe | Albert | einzige Instanz, die Wirkung feststellt und freigibt (`STRUKTURELLE_SICHERHEIT` §7, Rang 7) |

Beobachtbare Prüffragen der Abnahme (aus Startlinie Punkt 8 und dem Prüfscore):

1. **Einsicht:** Fällt der benannte falsche Glaubenssatz an einer benennbaren Stelle im Ablauf?
2. **Zielzustand:** Kann der Nutzer nach dem Happy Path den Zielzustandssatz aus eigener Erfahrung sagen?
3. **Nicht-Ziele (KO):** Verletzt das Mockup ein einziges Nicht-Ziel? Dann Stopp — unabhängig von jeder anderen Bewertung.
4. **Optik:** Trägt die Gestaltung die Aussage, oder dekoriert sie sie?
5. **Nächster Schritt:** Ist am Ende klar, was der Nutzer tun soll?

Ein selbstvergebener Score des erstellenden LLM ist **kein** Abnahmenachweis (`STRUKTURELLE_SICHERHEIT` §8.5: keine Selbstzertifizierung).

## 8. Übergabe in die technische APP_SPEC

Das gewonnene Mockup übergibt:

1. **das beobachtete Verhalten und die Gestaltung** — als Wirkungs- und Optikstand, nicht als Code (siehe Wegwerfgrenze §6);
2. **die Wirkungshypothese** und die Abnahmebegründung entlang der fünf Prüffragen;
3. **das Annahmenprotokoll** mit je einem Status pro Eintrag:
   - `aus Spec belegt` → darf in die APP_SPEC übernommen werden;
   - `simuliert` → **darf nicht** ungeprüft Produktionspflicht werden;
   - `redaktionell zu bestätigen` → geht an Albert, nicht in die Spec;
4. **die Liste der bewusst offenen technischen Fragen** (Daten, States, A11y, Integration).

Nicht ungeprüft übernehmbar: simulierte Zahlen, erfundene Texte und Microcopy (redaktionelle Inhalte sind nicht LLM-Gebiet — für `prokrastinations-preis` ausdrücklich `APP_SPEC.md` §8), Timings, Animationsdauern, jede A11y-Behauptung, jede Datenaussage.

## 9. Werkstatt und Quellmanifest (E-04)

**Ablage aktiver Mockup-Experimente:**

```
tests/scratch/<app-slug>/
```

Dieser Bereich ist **Werkstatt**: nicht Teil des dauerhaften Testbestands, nicht im Launcher (`tests/index.html`), nicht automatisch durch den Strukturchecker (`tools/check-test-pages.py`) geprüft (`tests/scratch/README.md`, `TEST_PAGE_STANDARD.md` §1.4). Weil der Checker `tests/scratch/` ausdrücklich ausnimmt, gilt für Mockups dort keine `*.test.html`-Namens- oder Marker-Beschränkung.

Nach psychologischer Freigabe wird die technisch spezifikationskonforme App in `Apps/<app-slug>/` gebaut. Die Werkstatt wird **nicht** in die offizielle App-Struktur übernommen (Wegwerfgrenze §6).

**Quellmanifest.** Jeder operative LLM-Auftrag benennt seine erlaubten Quellen **explizit**. **Keine rekursive Suche** in `tests/scratch/` oder `Archiv/` ohne ausdrücklichen Auftrag. Verworfene Werkstatt-Artefakte werden nicht durch ein zweites Repository isoliert.

**Abschlussnotiz (Konzept, noch nicht gebaut).** Nach Abschluss einer App wird der Werkstattbestand einmal kuratiert; die dauerhafte Abschlussnotiz liegt künftig — analog zu Chroniken — unter `Archiv/Werkstatt-Abschlussnotiz/`. Eine Werkstatt-Abschlussnotiz ist **kein** Ersatz für eine Chronik (`CHRONIK-SPEZIFIKATION.md`: Chroniken bleiben Gesprächsfaden-Chroniken) und **kein** neuer Archivvertrag (`ARCHIV-STRATEGIE.md` bleibt unverändert). Siehe §10.

## 10. Abgrenzung: spätere Bedarfspunkte

Ausdrücklich **nicht** Bestandteil dieses Vertrags und dieses AP:

- der **Werkstatt-Abschluss-Skill** — wird jetzt nicht gebaut;
- der **Zielordner** `Archiv/Werkstatt-Abschlussnotiz/` — wird jetzt nicht angelegt;
- die konkrete Ausgestaltung der Abschlussnotiz — eigener späterer Bedarfspunkt.

Kein Vertragspunkt gibt einen Folgeschritt automatisch frei (Startlinie, Kopf). Jede Mockup-Runde bleibt ein eigener, risikogestufter Arbeitsauftrag.
