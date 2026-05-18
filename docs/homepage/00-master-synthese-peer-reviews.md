# Master-Synthese Peer Reviews – Finanzwesir-Homepage

**Zweck dieser Datei:**  
Diese Datei ist die konsolidierte Masterentscheidung aus den bisherigen Homepage-Konzepten, Peer Reviews und dem bestehenden HTML-Entwurf.

Sie beantwortet:

- Was übernehmen wir aus den Reviews?
- Was übernehmen wir nicht?
- Wo herrscht Konsens?
- Welche wertvollen Einzelmeinungen verbessern unsere Position?
- Welche Konsequenzen ergeben sich für die nächste Homepage-Version?

---

## 1. Kurzfazit

Das Grundkonzept ist stark und bleibt bestehen:

> Die Homepage ist kein Blog, kein Portal und keine Artikelübersicht.  
> Sie ist ein psychologischer Funnel, der Nutzer von Interesse zu Handlung führt.

Die wichtigste Korrektur aus den Reviews lautet:

> Der bestehende HTML-Entwurf bildet dieses Konzept noch nicht ab.

Der aktuelle Entwurf ist strukturell ein klassischer Ratgeber-/Rubrikenansatz. Das Design kann als Referenz dienen, aber die Informationsarchitektur muss neu gebaut werden.

---

## 2. Konsens aus den Peer Reviews

### 2.1 Das Konzept bleibt

Konsens:

- Nutzer = Held
- Finanzwesir = Mentor
- Apps = Prüfungen
- Ziel = Handlung, nicht bloß Wissen
- Mission = Komplexität zerstören
- Homepage = psychologischer Funnel, kein Blog
- Goethe-Logik: Nutzer muss Einsichten fühlen, nicht nur lesen
- Campbell-Logik: Reise von Blockade zu Handlungsfähigkeit
- Dark-Patterns-Grenze: führen ja, täuschen nein

**Entscheidung:**  
Das Fundament wird beibehalten.

---

### 2.2 Der HTML-Entwurf v12 wird nicht weitergeführt

Konsens:

Der Entwurf `finanzwesir-homepage-v12-gemini-tailwind-v16.html` ist ein brauchbarer visueller Prototyp, aber keine Zielarchitektur.

Problem:

- Hero ist Nutzenversprechen statt Spiegel.
- Navigation ist thematisch statt dramaturgisch.
- Drei Rubriken strukturieren Wissen, nicht Blockaden.
- Apps fehlen als zentrale Prüfungen.
- CTA ist zu unklar.
- Ton ist Ratgeber-Sprache statt Mentor-Sprache.

**Entscheidung:**  
Die Datei bleibt als historische Referenz in `09-erste-html-version/`, wird aber nicht als Basis für die neue Homepage-Architektur verwendet.

---

### 2.3 Die Homepage braucht einen linearen Hauptpfad

Konsens:

Die Homepage muss als Reise aufgebaut werden:

1. Hero / Spiegel
2. Timing-Illusion
3. Crash-Verhalten
4. Komplexitätsentlarvung
5. Dunkelster Punkt
6. Einfachheit
7. ETF-Ära-Zweifel
8. Regulatorisches Risiko
9. Persönliche Risikokalibrierung
10. Konkreter Plan
11. Abschluss / Handlung

**Entscheidung:**  
Die Homepage bekommt einen klaren Primärpfad. Zusätzliche Apps und Artikel dürfen diesen Pfad nicht verwässern.

---

### 2.4 Zwei Apps sind strategisch fehlend

Konsens:

Zwei Bausteine sind Pflicht:

- **ETF-Ära-App**: Glaubwürdigkeitsanker
- **Plan-Generator**: Conversion-Schritt

Ohne ETF-Ära-App wirkt der Funnel zu glatt.  
Ohne Plan-Generator endet der Funnel in der Luft.

**Entscheidung:**  
Beide Apps müssen spezifiziert und gebaut werden.

---

### 2.5 Die Regulatorik-App braucht Einordnung

Konsens:

Die Regulatorik-App ist wichtig, aber gefährlich. Sie kann als Lähmungsmittel gelesen werden.

Notwendige Einordnung:

> Regulatorik ist real.  
> Aber sie spricht nicht gegen Investieren.  
> Sie spricht gegen fragile Optimierung.

**Entscheidung:**  
Die Regulatorik-Station bekommt einen historischen Anker und endet mit Robustheit, nicht mit Angst.

---

## 3. Wertvolle Einzelmeinungen

### 3.1 Der „Dunkelste Punkt“

Wertvollster Verbesserungsvorschlag:

Zwischen Diversifikations-Detektor und Einfachheits-App fehlt ein emotionaler Tiefpunkt.

Ohne diesen Moment wirkt Einfachheit wie ein pragmatischer Kompromiss.  
Mit diesem Moment wirkt Einfachheit wie eine echte Erkenntnis.

**Übernahme:** ja.

Beispiel:

> Du hast gerade gesehen:  
> Den Einstieg kannst du nicht perfekt timen.  
> Crashs kannst du nicht umgehen.  
> Und mehr ETFs kaufen dir keine Kontrolle.  
>
> Was bleibt dann überhaupt?  
>
> Vielleicht genau das: weniger.

---

### 3.2 Nutzertypen B und C minimal berücksichtigen

Die Reviews unterscheiden:

- Typ A: Zögerer
- Typ B: Skeptiker
- Typ C: Wiedereinsteiger

Der Hauptpfad bleibt für Typ A gebaut.  
Typ B und C bekommen keine eigenen Pfade, aber gezielte Sätze.

**Übernahme:** ja, minimal.

#### Typ B – Skeptiker

Möglicher Satz im Hook:

> Diese Seite verkauft dir keinen Fonds. Sie zeigt dir nur, welche Ausreden dich vom Handeln abhalten.

#### Typ C – Wiedereinsteiger

Möglicher Satz vor dem Crash-Test:

> Wenn du schon einmal im falschen Moment verkauft hast: Das ist menschlich, nicht dumm. Die Frage ist nur, ob du beim nächsten Mal einen besseren Plan hast.

---

### 3.3 Progressive Disclosure ohne Gating

Die Idee, den langen Funnel nicht komplett auf einmal zu überladen, ist sinnvoll.

Nicht sinnvoll ist ein harter Gate-Mechanismus mit Account, E-Mail-Zwang oder künstlicher Sperre.

**Übernahme:** teilweise.

Entscheidung:

- Inhalte frei zugänglich
- Hauptpfad klar sichtbar
- Vertiefungen optional
- keine künstlichen Hürden

---

### 3.4 Restliche Apps als Werkzeugkasten

Nicht jede App gehört in den Hauptpfad.

Eine App gehört nur dann in den Hauptfunnel, wenn sie eine zentrale Blockade zerstört und zur nächsten Station führt.

Andere Apps sind wertvoll, aber gehören in:

- Vertiefungen
- Artikel
- Werkzeugkasten
- spätere Spezialseiten

**Übernahme:** ja.

---

## 4. Was wir nicht übernehmen

### 4.1 Keine getrennten Nutzerpfade

Warum nicht?

Weil drei Einstiegspfade die Komplexität erhöhen.  
Die Homepage soll Komplexität zerstören, nicht neue Entscheidungen erzeugen.

**Entscheidung:**  
Ein Hauptpfad. Keine Extralocken.

---

### 4.2 Kein Newsletter-/Account-Gate

Warum nicht?

Das Projekt ist Vermächtnis und Hilfe, kein aggressiver Lead-Funnel.

**Entscheidung:**  
Kein Pflicht-Gating.

---

### 4.3 Keine Vollintegration aller Apps

Warum nicht?

Die Homepage darf nicht zur Werkzeugmesse werden.

**Entscheidung:**  
Strenge Kuration.

---

### 4.4 Keine Beibehaltung der drei Rubriken als Hauptstruktur

Warum nicht?

`Fundament / Bausteine / Umsetzung` sortiert Wissen, aber führt nicht psychologisch.

**Entscheidung:**  
Diese Struktur wird verworfen.

---

## 5. Neue Masterarchitektur

```text
HERO: Spiegel, nicht Versprechen
↓
Einordnung: Diese Seite verkauft keine ETFs. Sie zerstört Ausreden.
↓
Station 1: Market-Timing-Simulator
↓
Station 2: Crash-Reaktions-Test
↓
Station 3: Diversifikations-Detektor
↓
Dunkelster Punkt
↓
Station 4: Einfachheits-App / 1 ETF vs. 5 ETFs
↓
Station 5: ETF-Ära-App
↓
Station 6: Regulatorik-App
↓
Station 7: Risiko-Übersetzer
↓
Station 8: Plan-Generator
↓
Abschluss: Fang klein an. Aber fang an.
```

---

## 6. Finale Position

Die bessere Homepage ist nicht länger, sondern strenger.

Weniger Rubriken.  
Mehr Führung.

Weniger Themen.  
Mehr innere Logik.

Weniger „Mehr erfahren“.  
Mehr „Teste deine Ausrede“.

Weniger Finanzportal.  
Mehr Mentor.

Der Maßstab lautet:

> Macht dieses Element wahrscheinlicher, dass der Nutzer mit einem einfachen, robusten Plan anfängt?

Wenn nein, gehört es nicht in den Hauptpfad.

---

## 7. Nächster Schritt

Als nächstes muss die Datei `06-uebergangstexte-und-microcopy.md` ausgearbeitet werden.

Sie sollte pro Station enthalten:

1. innerer Satz des Nutzers
2. Abschnitts-Headline
3. kurzer Übergangstext
4. App-Auftrag
5. Erkenntnis nach der App
6. CTA zur nächsten Station

Danach kann die statische HTML-Seite neu gebaut werden.


---

## Claim-Update

Nach zusätzlichem Feedback zur Markenpositionierung gilt:

> **Der Claim ist der Nordstern, nicht der Köder.**

Der Claim „Finanzen geregelt – Freiräume geschaffen“ bleibt zentrale strategische Klammer. Er wird aber nicht als große Hero-Werbebotschaft eingesetzt.

Die Masterarchitektur wird dadurch präzisiert:

```text
Hero:
Spiegel der Blockade

Reise:
Prüfung der Ausreden

Abschluss:
Claim-Einlösung
```

Hero-Richtung:

> So geht das mit deinem Geld nicht weiter.  
> Du weißt das schon.  
> Die Frage ist, warum du trotzdem noch wartest.

Finale Einlösung:

> Finanzen geregelt.  
> Was du jetzt damit anfängst, ist dein Freiraum.
