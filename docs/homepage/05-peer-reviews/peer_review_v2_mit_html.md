# Peer Review v2: „Finanzwesir-Homepage als psychologischer Funnel"

**Reviewer:** Perplexity AI (Sonnet 4.6)  
**Datum:** 12. Mai 2026  
**Grundlage:** `finanzwesir_homepage_psychologischer_funnel.md` (Konzept) + `finanzwesir-homepage-v12-gemini-tailwind-v16.html` (HTML-Entwurf v12) + Repository `awa-de/Finanzwesir-code`  
**Methode:** Inhaltliche, dramaturgische, tonale und strukturelle Analyse — keine technische Bewertung

---

## Kurzfazit

Das Konzept ist stark. Der HTML-Entwurf v12 ist es (noch) nicht. Zwischen beiden klafft eine fundamentale Lücke: Das Konzept beschreibt einen **psychologischen Funnel**, der Blockaden zerstört. Der HTML-Entwurf zeigt einen **klassischen Wissens-Blog** mit drei Rubriken. Das ist kein Design-Problem — es ist ein Strukturproblem. Beide Dokumente beschreiben unterschiedliche Seiten.

---

## 1. Konzept: Stärken (unverändert gegenüber v1 — hier komprimiert)

Die theoretische Grundlage ist exzellent:

- **Campbell-Übertragung:** Nutzer als Held, Finanzwesir als Mentor, Apps als Prüfungen — konsequent und nicht aufgesetzt.
- **Goethe-Logik:** Nutzer soll Blockaden nicht lesen, sondern *erfahren*. Das ist der entscheidende Unterschied zu einem Erklärtext.
- **Reihenfolge der Ausreden:** Von operativ (Timing) über emotional (Crash) zu intellektuell (ETF-Ära) zu politisch (Regulatorik) — psychologisch sauber.
- **Ethischer Rahmen:** Der „ethische Test" ist präzise und schutzwürdig. Die Linie zwischen erlaubtem Nudging und Dark Pattern ist klar gezogen.
- **Emotionale Kurve:** Ertapptwerden → Kontrollverlust → Konfrontation → Entlastung → Reife → Handlung. Das ist eine echte dramaturgische Kurve, keine Aufzählung.

---

## 2. HTML-Entwurf v12: Strukturdiagnose

### 2.1 Was der Entwurf leistet

Der HTML-Entwurf v12 ist handwerklich ordentlich: sauberes Tailwind-CSS, responsive Navigation, drei klare Rubriken (I. Fundament / II. Bausteine / III. Umsetzung), konsistentes visuelles System (Petrol / Gelb / Purpur). Als klassischer Finanzratgeber-Blog ist es ein solider Entwurf.

### 2.2 Was der Entwurf nicht leistet — und warum das fatal ist

Der Entwurf ist strukturell ein **Enzyklopädie-Modell**, kein Funnel:

| Dimension | Konzept (Soll) | HTML-Entwurf v12 (Ist) |
|---|---|---|
| Einstieg | Ertapptwerden: „Dein Problem ist die Entscheidung" | „Passiv investieren. Finanziell frei werden." |
| Struktur | Geführte Reise durch 8 Blockaden | 3 Rubriken à 3-4 Artikel-Links |
| Nutzerpfad | Einer, linear, psychologisch sequenziert | Offen, beliebig, nutzergesteuert |
| Apps | Dramaturgische Prüfungen mit Übergangstexten | Nicht vorhanden |
| Ton | „Deine Angst ist verständlich. Aber lass uns prüfen." | „Liquidität ist der Sauerstoff deines Portfolios." |
| CTA | „Ich starte mit einem robusten, einfachen Plan." | „Jetzt starten" (wohin?) |
| Conversion-Ziel | Einrichten eines Sparplans / ersten Schritts | Unklar |

Das Hero-Headline des Entwurfs — **„Passiv investieren. Finanziell frei werden."** — ist symptomatisch: Es ist eine Nutzen-Aussage, kein Spiegel. Das Konzept fordert explizit einen Spiegel:

> „Die erste Seite muss nicht beeindrucken. Sie muss treffen."  
> Leitthese: „Du brauchst keinen besseren ETF. Du brauchst eine Entscheidung."

„Passiv investieren. Finanziell frei werden." ist das genaue Gegenteil davon: es ist Versprechen, nicht Spiegel. Es sagt dem Nutzer, was er *bekommen* kann — nicht, wer er ist und was ihn blockiert.

### 2.3 Das „Neu hier?"-Widget: Ansatz gut, Ausführung unklar

Das Widget mit drei Optionen (Ich habe Ahnung / Keine Ahnung / Schnellstart) greift ansatzweise Nutzertypen auf. Das ist positiv. Aber:

1. Es ist visuell eine Nebeninformation, kein konsequenter Pfad-Initiator.
2. „Schnellstart" ist unklar — was passiert? Wo landet man?
3. Die Links führen laut HTML auf `#` — also nirgendwo. Das ist ein Platzhalter, kein Konzept.

### 2.4 Ton-Diskrepanz: Die Texte klingen falsch

Die bestehenden Teaser-Texte klingen nicht wie der Finanzwesir aus dem Konzept. Vergleich:

**Konzept-Ton:**  
> „Timing ist der perfekte Aufschubgrund, weil er nie erledigt ist. Wenn der Markt steigt: ‚Jetzt ist es zu teuer.' Wenn er fällt: ‚Jetzt ist es zu gefährlich.'"

**HTML-Entwurf-Ton:**  
> „Bestimme deine sichere Geldmarkt-Quote. Liquidität ist der Sauerstoff deines Portfolios."  
> „Lerne die einfache 3-Säulen-Strategie kennen. Diversifikation ist der einzige ‚Free Lunch' an der Börse."

Der Konzept-Ton ist direkt, leicht provokativ, nutzt innere Sätze des Nutzers. Der HTML-Ton ist instruktiv-informierend — das ist Ratgeber-Sprache, nicht Mentor-Sprache. „Der Sauerstoff deines Portfolios" ist eine Metapher, aber sie trifft den Nutzer nicht in seiner Blockade. Sie erklärt ihm etwas, das er noch gar nicht gefragt hat.

### 2.5 Die drei Rubriken passen nicht zum Funnel

**I. Fundament** (Philosophie & Strategie), **II. Bausteine** (Rahmenbedingungen), **III. Umsetzung** (Handlung & Realität) — das ist eine klassische Themenstruktur. Sie folgt der Logik: *„Hier ist alles, was du wissen musst, sortiert nach Themen."*

Das Konzept fordert die entgegengesetzte Logik: *„Hier ist die Reise, die du durchlaufen musst, sortiert nach deinen Blockaden."*

Beide Strukturen schließen sich aus. Eine Reise kann man nicht in drei gleichwertige Rubriken einteilen, ohne den Spannungsbogen zu zerstören.

---

## 3. Die zwei fehlenden Apps

Aus dem Konzept sind zwei Funnel-Positionen noch ohne App im Repository:

**Position 5: ETF-Ära-Simulator**  
Das Konzept beschreibt einen Rendite-Slider: „Was, wenn die Marktrendite künftig niedriger ist?" mit Vergleich ETF vs. Stock Picking vs. Market Timing vs. Nichts-tun. Diese App existiert laut Repository noch nicht. Ohne sie fehlt der wichtigste Glaubwürdigkeitsmoment des Funnels — der Moment, wo die Seite zugibt, dass ETFs nicht perfekt sind.

**Position 8: Plan-Generator**  
„Starte mit X € monatlich in einen weltweit gestreuten ETF" — minimaler Input, konkreter Output. Auch diese App fehlt. Ohne sie endet der Funnel in der Luft: Der Nutzer hat alle Blockaden durchlaufen, aber bekommt keinen handfesten nächsten Schritt.

Diese beiden Lücken sind **keine Kleinigkeiten**. Position 5 ist der Glaubwürdigkeitsanker, Position 8 ist der Conversion-Schritt. Beide müssen gebaut werden, bevor die Homepage funktioniert.

---

## 4. Nutzertypen B und C — minimale Berücksichtigung

Das Konzept ist als ein einziger Pfad für den Zögerer (Typ A) konzipiert. Auf Wunsch werden Typ B (aktiver Skeptiker) und Typ C (Wiedereinsteiger) hier kurz eingeordnet — ohne eigene Pfade zu fordern:

**Typ B — Der aktive Skeptiker:**  
Kommt mit der Haltung: „ETF-Influencer verkaufen mir was." Die Regulatorik-App und die ETF-Ära-App sind für ihn die entscheidenden Momente, weil sie zeigen, dass die Homepage nicht naiv ist. Ein einziger Satz im Hook reicht, um ihn abzuholen: *„Diese Seite verkauft keine ETFs. Sie erklärt, warum du wahrscheinlich keine Hilfe brauchst."* Das ist kein Extra-Pfad — es ist ein Satz.

**Typ C — Der Wiedereinsteiger:**  
Hat 2022 oder 2020 verkauft. Kommt mit Scham. Die Crash-Reaktions-App ist für ihn der entscheidende Moment — aber er braucht vorher Erlaubnis: *„Wenn du schon mal rausgesprungen bist: Das ist menschlich, nicht dumm."* Auch das ist kein Extra-Pfad — es ist ein Satz im Übergangstext vor App 2.

**Fazit zu B und C:** Beide Typen lassen sich mit je einem Satz an den richtigen Stellen des einzigen Pfades auffangen. Das ist verhältnismäßig und ohne Mehraufwand machbar.

---

## 5. Regulatorik-App: Historischer Anker fehlt

Das erste Review hat dieses Ton-Risiko identifiziert. Es bleibt relevant. Die App muss durch einen empirischen Anker gegen Fehlinterpretation gesichert werden. Vorschlag für den Abschlusstext der App:

> „Deutschland hat die Steuerregeln für Kapitalerträge mehrfach verändert: Haltefristen wurden eingeführt und abgeschafft, Abgeltungssteuern eingeführt, Vorabpauschalen neu geregelt. Anleger, die trotzdem dabei geblieben sind, haben trotzdem gewonnen. Das Risiko ist real. Es ist kein Grund, nicht anzufangen."

Das ist drei Sätze — und sie verhindern, dass die App als Lähmungsmittel gelesen wird.

---

## 6. Das dramaturgische Mittelloch (bleibt offen)

Zwischen App 3 (Diversifikations-Detektor: „Mehr ETFs sind nicht besser") und App 4 (Simplicity Comparison: „Ein ETF ist robust") fehlt der emotionale Tiefpunkt. Beide Apps bauen denselben Wunsch ab. Die Wende zur Einfachheit wirkt wie ein pragmatischer Kompromiss statt wie echter Schatz.

**Konkrete Lösung:** Ein kurzer Übergangstext zwischen App 3 und App 4 — der „Dunkelste Punkt":

> „Du hast gerade gesehen: Den Einstieg kannst du nicht perfekt timen. Crashes kannst du nicht umgehen. Und mehr ETFs kaufen dir keine Kontrolle. Was bleibt dann überhaupt?  
> Vielleicht genau das: weniger."

Diese sechs Sätze schließen das Mittelloch. Die Einfachheit danach wirkt nicht wie „na ja, dann halt so" — sondern wie eine echte Erkenntnis.

---

## 7. Gesamtbewertung (aktualisiert)

| Dimension | Bewertung | Kommentar |
|---|---|---|
| Konzept: Grundlage | ★★★★★ | Exzellent, unverändert |
| Konzept: Dramaturgie | ★★★★☆ | Mittelloch bleibt, aber lösbar |
| Konzept: Ethik | ★★★★★ | Schärfster Teil des Dokuments |
| HTML-Entwurf: Ton | ★★☆☆☆ | Ratgeber-Sprache statt Mentor-Sprache |
| HTML-Entwurf: Struktur | ★★☆☆☆ | Enzyklopädie-Modell, kein Funnel |
| HTML-Entwurf: Funnel-Abbildung | ★☆☆☆☆ | Kein einziger der 8 Prüfungs-Apps integriert |
| App-Vollständigkeit | ★★★☆☆ | 2 Funnel-Kern-Apps fehlen noch |
| Nutzertypen B + C | ★★★★☆ | Mit je einem Satz abdeckbar |

---

## 8. Prioritäten für die nächste Version

### Sofort — Konzept-HTML-Brücke bauen

Die wichtigste Aufgabe ist nicht, den HTML-Entwurf zu verfeinern. Die wichtigste Aufgabe ist, die Homepage-Architektur grundsätzlich neu zu strukturieren — weg von drei Rubriken, hin zu einer linearen Reise mit 8 Stationen.

**Neue Architektur (Vorschlag):**

```
HERO: Spiegel-Headline (nicht Versprechen)
  ↓
ÜBERGANGSTEXT: „Dein Problem ist nicht Wissen. Dein Problem ist die Entscheidung."
  ↓
STATION 1: Market-Timing-Simulator + Übergangstext
  ↓
STATION 2: Crash-Reaktions-Test + Übergangstext
  ↓
STATION 3: Diversifikations-Detektor + Übergangstext
  ↓
[DUNKELSTER PUNKT — kurzer Text]
  ↓
STATION 4: Simplicity Comparison + Übergangstext
  ↓
STATION 5: ETF-Ära-App [NOCH ZU BAUEN] + Übergangstext
  ↓
STATION 6: Regulatorik-Dashboard + historischer Anker + Übergangstext
  ↓
STATION 7: Risiko-Übersetzer + Übergangstext
  ↓
STATION 8: Plan-Generator [NOCH ZU BAUEN]
  ↓
ABSCHLUSS: „Du wirst den Markt nicht kontrollieren. Aber du kannst anfangen."
```

Das ist eine komplett andere Seite als der aktuelle Entwurf.

### Mittelfristig — Texte neu schreiben

Alle Teaser-Texte müssen vom Konzept-Ton durchdrungen sein. Kein Instruktions-Stil, kein Ratgeber-Stil. Jeder Text muss entweder:
- den inneren Satz des Nutzers spiegeln, oder
- ihn leicht provozieren, oder
- ihn durch ein konkretes Szenario führen.

„Liquidität ist der Sauerstoff deines Portfolios" ist ein guter Merksatz — aber er gehört in einen Artikel, nicht auf die Homepage. Die Homepage braucht: „Du denkst, du brauchst zuerst das perfekte Portfolio. Du brauchst zuerst eine Entscheidung."

### Langfristig — Zwei fehlende Apps entwickeln

ETF-Ära-Simulator (Position 5) und Plan-Generator (Position 8) sind strategisch kritisch. Ohne sie hat der Funnel kein Rückgrat (Position 5 = Glaubwürdigkeit) und keinen Abschluss (Position 8 = Conversion).

---

## 9. Was für das vollständige Review noch fehlt

Mit dem HTML-Entwurf als dritter Grundlage ist das Peer Review nun wesentlich vollständiger als in v1. Was formal noch fehlen würde, um 100% abgedeckt zu sein:

1. **Konkrete App-Specs** — sobald die einzelnen App-Spezifikationen vorliegen, kann geprüft werden, ob jede App die dramaturgische Aufgabe laut Konzept tatsächlich erfüllt. Das ist die nächste Review-Runde.
2. **Übergangstexte als eigenständiges Dokument** — Das Konzept beschreibt die Übergänge zwischen den Apps auf einer Seite, aber als schnelle Beispiele. Diese Texte sind die dramaturgischen Gelenke der Homepage — sie verdienen ein eigenes Dokument mit mehr Sorgfalt.

