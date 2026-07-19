# MINI_SPEC_FROM_HAUPTDOKUMENT — ETF-Ära vorbei

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## G3 – ETF-Ära vorbei

**Slug:** `etf-aera-vorbei`
**Früherer Arbeitstitel / Unteraspekt:** Das Passiv-Paradox
**KI-Konsens:** ★ (Perplexity)
**Folienbezug:** Übergreifend (akademische Systemkritik)
**Funnel-Position:** Systemkritische Einwände (unter G2 einbettbar)
**Priorität:** #14

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed etf-aera-vorbei -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** Zweifel prüfen / ETF-Ära-Skepsis einordnen  

## Gekoppelter Sonderfall: Verknüpfung mit G2 rendite-kalibrierung

Offen seit 2026-07-19 (BACKLOG AF-25). Ungeklärt: G2 `rendite-kalibrierung` (Untertitel im Hauptdokument: „Ist die ETF-Ära vorbei?") und diese App könnten werden:
- eine gemeinsame App
- eine Master/Slave-Kombination
- zwei getrennte, eigenständige Apps

Grund: Titel/Slug dieser App behaupten die allgemeine Frage „Ist die ETF-Ära vorbei", der tatsächliche Inhalt unten beschreibt aber das enger gefasste Passiv-Paradox (Markteffizienz-Argument) — ein anderes Thema, das inhaltlich näher an G2 liegt als der eigene Titel vermuten lässt.

Vor jeder Arbeit an dieser App (Mockup-Duell, APP_SPEC, Redaktion): `Apps/rendite-kalibrierung/MINI_SPEC_FROM_HAUPTDOKUMENT.md` lesen und mit Albert klären, ob die Beziehung inzwischen entschieden wurde.

**Diese App existiert, um:**  
berechtigte ETF-Skepsis von lähmender Ausrede zu trennen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer benutzt „Vielleicht funktioniert ETF-Investieren künftig nicht mehr“ als Grund, gar nicht zu starten.

**Falscher Glaubenssatz vorher:**  
„Die gute ETF-Zeit ist vorbei; deshalb bringt ein einfacher Weltportfolio-Plan nichts mehr.“

**Zielzustand nach der App:**  
„Ich sehe, welche ETF-Risiken real sind, welche übertrieben sind und welche Konsequenzen sie für einen robusten Plan haben.“

**Muss-Kriterien für jede Umsetzung:**  
- Skepsis ernst nehmen, nicht abwinken.
- Argumente strukturieren: Bewertungen, Konzentration, Regulierung, passives Volumen, Zukunftsrenditen.
- Ergebnis muss zur robusten Planung führen, nicht zur Lähmung.
- Keine Garantien.

**Nicht-Ziele / harte Verbote:**  
- Kein ETF-Marketing.
- Kein Untergangsnarrativ.
- Keine Prognose.
- Keine komplexe Kapitalmarkttheorie im Hauptpfad.

---

Dieser Prüfscore ist **kein app-spezifischer Inhalt**, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App.

Er wird bei der späteren Verteilung in jeden lokalen Steuerungsblock übernommen und dort **unverändert** verwendet.

**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.

### Problem, das gelöst wird

Der bildungsorientierteste Einwand: Wenn alle passiv investieren, werden Märkte ineffizient. Aktive Anleger könnten das ausnutzen. Warum dann trotzdem passiv?

### Kernbotschaft

> „Das Paradox ist real. Ändert aber nichts an deiner Entscheidung."

### Konzept

Zwei-Lager-Slider (0–70 % passive Anleger im Markt):

- **Bei niedrigem Passiv-Anteil:** EMH gilt weitgehend, aktive Anleger können nicht systematisch outperformen.
- **Bei hohem Passiv-Anteil (~53 %, aktueller US-Stand):** Märkte werden ineffizienter, Volatilität steigt – aber aktive Anleger können immer noch nicht outperformen (zu riskant, karrieregefährdend, Index-Schmusen ist rational).

**Aha-Moment:** Das Paradox führt in eine Sackgasse, aus der es keinen Ausweg gibt – außer den eigenen Weg zu gehen: breit, günstig, langfristig.

### Implementierungshinweise

Eher als **interaktiver Erklärungstext** (Accordion/Aufklappbereich) unter G2 denn als vollständige eigene App. Implementierungsaufwand gering.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: G – Systemkritische Einwände
- App-ID: G3
- App-Titel: ETF-Ära vorbei
- Früherer Arbeitstitel / Unteraspekt: Das Passiv-Paradox
- Slug: `etf-aera-vorbei`
- Zugeordneter App-Ordner: `/Apps/etf-aera-vorbei/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
- Offener Konzeptkonflikt: Dateiinhalt beschreibt Das Passiv-Paradox (akademische Systemkritik), nicht die übergeordnete ETF-Ära-Frage (G2). Echte inhaltliche Klärung etf-aera-vorbei vs. passiv-paradox steht aus.
