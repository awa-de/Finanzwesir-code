# AP-14f Ergebnis — regulatorik-dashboard Identitäts- und Steuerungsblock-Anamnese

Stand: 2026-06-30 | Session: AP-14f | Geändert von: Claude

---

## Kurzstatus

```
Status:               GRÜN
Blocker:              nein
Empfehlung nächster AP: AP-14g — regulatorik-dashboard Seed-Entwurf / Steuerungsblock-Quelle vorbereiten
```

---

## Kettenposition

```
Vorgänger:  AP-14b–e ✅ 2026-06-30 (committed)
Aktuell:    AP-14f — Identitäts- und Steuerungsblock-Anamnese
Nächster:   AP-14g — Seed-Entwurf / Steuerungsblock-Quelle vorbereiten
```

---

## Gate-Ergebnisse

### Gate 1 — Git-Status

```
Geändert:    .claude/learning/session-log.md  (Session-Log-AP-Wechsel — erwartet)
Staged:      nichts
Unverändert: alle App-Dateien, Specs, Seed
```

Befund: Sauber. Keine unerwarteten Änderungen.

### Gate 2 — AP-14e bestätigt

```
Datei:       docs/steering/patches/AP-14e_regulatorik-dashboard_struktur-review-commit-vorbereitung_Ergebnis.md
Status:      GRÜN
Commit-ready: ja
AP-14b–e:    abgeschlossen und committed
```

Befund: GRÜN.

### Gate 3 — Direktbestand

```
OK  APP_FABRIK_ANAMNESE_MATERIAL.md
OK  Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md
OK  DEV_QA_NOTIZEN.md
OK  ETF-Wahlurnen-App-Abschlussdokumentation_V2.md
OK  MINI_SPEC_FROM_HAUPTDOKUMENT.md
OK  UX-Synthese-LLM-Bewertungen-Iteration-1.md
OK  etf-wahlurnen-rechner.html
OK  Altmaterial/  (vorhanden, nicht fachlich analysiert)
OK  CLAUDE.md direkt im Ordner: NICHT vorhanden — bereinigt
```

Befund: Struktur vollständig bereinigt.

### Gate 4 — Pflichtquellen vorhanden

```
OK  APP_FABRIK_ANAMNESE_MATERIAL.md       (77 Zeilen)
OK  MINI_SPEC_FROM_HAUPTDOKUMENT.md       (41 Zeilen / Steuerungsblock fehlt noch)
OK  ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  (397 Zeilen)
OK  Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md  (539 Zeilen)
OK  UX-Synthese-LLM-Bewertungen-Iteration-1.md  (338 Zeilen)
OK  AP-14e-Protokoll  (215 Zeilen)
```

Befund: Alle Pflichtquellen vorhanden und gelesen.

---

## Gelesene Quellen

| Quelle | Pflicht/Optional | Gelesen? | Rolle |
|---|:---:|:---:|---|
| APP_FABRIK_ANAMNESE_MATERIAL.md | Pflicht | ✅ | Konservierter Wissensstand aus CLAUDE.md (AP-14c); App-Kern-Hypothese, Mockup-Status, Primärquellen-Übersicht |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md | Pflicht | ✅ | Roh-Mini-Spec aus Hauptdokument; Kernbotschaft, Szenario-Matrix, fachlicher Rahmen |
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | Pflicht | ✅ | Reichste Inhaltsquelle: These, Narrativ, Rechenmodell, verifizierte Zahlen, App-Architektur, UX-Prinzipien |
| Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md | Pflicht | ✅ (Auszug) | Strategisches Ziel, Narrativ, Produktentscheidung — primär für Identitätsprüfung gelesen |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | Pflicht | ✅ | UX-Konsens, Minderheitsmeinungen, Framing-Risiko (ChatGPT-Warnung) |
| AP-14e-Protokoll | Pflicht | ✅ | Voraussetzung / Gate bestätigt |
| DEV_QA_NOTIZEN.md | Optional | ✗ | Nicht benötigt — Pflichtquellen ausreichend |
| etf-wahlurnen-rechner.html | Optional | ✗ | Nicht benötigt — Pflichtquellen ausreichend für Identitätsfrage; HTML-Analyse wäre Scope-Erweiterung |
| AP-14b/c/d-Protokolle | Optional | ✗ | Nicht benötigt — APP_FABRIK_ANAMNESE_MATERIAL.md enthält bereits konsolidierten Stand |
| Altmaterial/ | Verboten | ✗ | Nicht analysiert |

---

## Quellenlandkarte

| Quelle | Rolle | Verlässlichkeit | Für AP-14f verwenden als | Nicht verwenden als |
|---|---|---|---|---|
| APP_FABRIK_ANAMNESE_MATERIAL.md | Synthese aus AP-14c | Hoch (AP-14c-konsolidiert) | Ausgangshypothese, Primärquellen-Routing | Fachliche Wahrheit (ist Konservierung) |
| MINI_SPEC_FROM_HAUPTDOKUMENT.md | Roh-Mini-Spec | Mittel (Status: roh, kein Steuerungsblock) | Kernbotschaft, Szenario-Matrix, Funnel-Position | Gültige Spezifikation |
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | Abschlussstand Mockup-Phase | Hoch (inhaltlich verifiziert) | These, Narrativ S0–S3, verifizierte Zahlen, Rechenmodell | Technischer Vertrag (Mockup-Phase-Output) |
| Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md | Reichste Vorarbeit (v5.0) | Hoch (inhaltlich; war verbindlich für Mockup) | Strategisches Ziel, Narrativ, Identitätstest | Aktueller technischer Vertrag (Mockup-Phase-Produkt) |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | Konsolidiertes UX-Brief | Mittel (LLM-Konsens, Iteration 1) | Framing-Warnungen, UX-Konsens, Nicht-Ziele | Finales UX-Design (Iteration 1 = Vorarbeit für Iteration 2) |
| etf-wahlurnen-rechner.html | Mockup / Story-Artefakt | Niedrig als Vertrag, Hoch als Referenz | Nur: Story, UX-Artefakt, Bezugspunkt für App-Struktur | Technischer Vertrag, APP_SPEC-Architekturpflichten |

---

## Identitätsentscheidung

### Dreistufige Klärung

| Ebene | Kandidat | Bewertung |
|---|---|---|
| Ordner-/Slug-Ebene | `regulatorik-dashboard` | Historischer Name aus Hauptdokument-Slug. Bleibt als Ordnername. Beschreibt nicht die App-Identität. |
| Mechanik-/Mockup-Ebene | ETF-Wahlurnen-Rechner | Metapher: "Steuerregeln werden an der Wahlurne entschieden." Interaktive Mechanik der App. Nicht die Identität. |
| Eigentliche App-Identität | Renditeminderung durch Steuerpolitik — real, modellierbar, planbar | Die App quantifiziert, wie Deutsche Steuerpolitik (historisch, aktuell, politisch denkbar) die ETF-Rente verändert. |

### Klärung: Warum Wahlurne Mechanik ist, nicht Identität

Die "Wahlurne" in "ETF-Wahlurnen-Rechner" verweist auf die These: Steuerpolitik wird indirekt bei Wahlen entschieden. Das ist ein Erklärungs-Bild (Narrativ), keine App-Funktion. Die App rechnet keine Wahlergebnisse, sie zeigt Steuer-Szenarien. Der Ordnername "regulatorik-dashboard" war der historische Projekttitel vor dem Narrativ-Refining.

### Arbeitsdefinition

> Diese App zeigt deutschen ETF-Anlegern, wie Steuerpolitik — historisch, heute und in politisch diskutierten Szenarien — die Nachsteuerrendite und damit die monatliche Rente verändert. Das Risiko ist real und quantifizierbar. Aber es zerstört nicht die einfache ETF-Strategie — es verändert Beträge und Details.

---

## Funnel-Rolle

**Block:** G — Systemkritische Einwände  
**App-ID:** G1  
**Funnel-Position:** Systemkritische Einwände

### Welchen Einwand adressiert die App?

> "Steuern und Regulierung können jederzeit geändert werden. Langfristiges Planen ist sinnlos, wenn der Staat die Spielregeln jederzeit umschreiben kann."

### Gegen welche Denkblockade arbeitet sie?

Gefühlte Unkontrollierbarkeit → Lähmung → kein Handeln. Der Nutzer sieht Regulatorik als Blackbox, die er nicht planen kann. Die App öffnet die Blackbox: Szenarien werden sichtbar, quantifizierbar, vergleichbar.

### Wo im Nutzerweg?

Nach dem grundsätzlichen Verständnis von ETF-Sparplänen (warum, wie viel, wie lange), aber vor oder gleichzeitig mit der Umsetzungsentscheidung. Die App adressiert den Moment: "Ich verstehe das Prinzip — aber was ist mit Steuern?"

### Entängstigung, Einordnung oder Umsetzungsunterstützung?

**Primär: Einordnung.** Die App macht Steuerrisiken sichtbar und verhältnismäßig. Sie entängstigt nicht durch Verharmlosung, sondern durch Quantifizierung. Sekundär: aktivierend ("Ich kann das einplanen, also kann ich anfangen").

---

## Psychologische Barriere

> Steuerpolitische Eingriffe fühlen sich unkontrollierbar an und lähmen die Entscheidung: Wer das Steuerregime nicht kontrollieren kann, sieht keinen Punkt darin, langfristig zu planen.

**Kurz (Nutzersprache):**
> "Wenn der Staat die Regeln ändern kann, wann er will — warum sollte ich überhaupt anfangen zu planen?"

---

## Falscher Glaubenssatz

> "Weil Steuerpolitik unplanbar ist, ist jede langfristige ETF-Strategie unsicher bis sinnlos — ich kann nichts Verlässliches aufbauen, solange das Steuerregime offen ist."

**Quellbasis:** Konvergenz aus MINI_SPEC ("regulatorische Drift"), Abschlussdokumentation (Narrativ S0→S3 als politische Bandbreite), Bauprompt (strategisches Ziel: "zeigen, dass Steuerpolitik quantifizierbar ist, nicht unbezwingbar"), APP_FABRIK_ANAMNESE_MATERIAL.md (Barriere: Regulatorische Eingriffe fühlen sich unkontrollierbar an → lähmen).

---

## Zielzustand nach Nutzung

> Der Nutzer versteht: Steuerrisiko ist real und bedeutsam — 306 €/Monat Unterschied S0 vs. S3 über 30 Entsparjahre sind kein abstraktes Modell, sondern eine greifbare Zahl. Aber das Risiko ist modellierbar, vergleichbar und nicht zufällig. Es ändert Beträge und Details. Es zerstört nicht die einfache Strategie: breit diversifiziert, regelmäßig, günstig.

**Aktivierungsformel:**
> "Das Risiko ist real. Aber es zerstört nicht deine Strategie — nur die Details. Komplexe Strategien brechen. Einfache überleben." *(aus MINI_SPEC — bestätigt)*

---

## Nicht-Ziele

```
- keine Steuerberatung
- keine politische Kampagne
- keine Wahlempfehlung, keine Parteibindung
- keine Aussage darüber, welches Steuerregime "richtig" ist
- keine Prognose künftiger Gesetzgebung
- kein Versprechen, dass Regulierung harmlos oder planbar im Sinne von "kontrollierbar" ist
- kein Framing als universelle Wahrheit (alle Modell-Aussagen sind Modell-Ergebnisse, keine Fakten)
- kein technischer Vertrag aus dem bestehenden etf-wahlurnen-rechner.html
- keine direkte Umsetzungsempfehlung aus dem Mockup
- keine fachliche Analyse von Altmaterial
- keine APP_SPEC-Architekturpflichten aus dem Mockup ableiten
```

Zusätzlich aus Quellen abgeleitet:
```
- kein Sequence-of-Returns-Risiko-Behauptung ohne expliziten Modellvorbehalt
  (ChatGPT-Warnung: "Wer lange genug spart... dem sind Marktschwankungen egal" = sachlich zu absolut)
- keine Aussage, die aktivistisch wirkt oder Empörung als primäre Reaktion erzeugt
```

---

## Politisches Framing-Risiko und Tonalitätsregeln

### Befund

**Quelle:** UX-Synthese §4.1 (ChatGPT, Minderheitsmeinung mit höchstem strategischem Hebel)

Das Vertrauensrisiko ist real und die strategisch wichtigste Einzelbeobachtung: Die App nutzt "Wahlurne" als Metapher und stellt einen Sachverhalt dar ("Der Staat holt sich 2,8× mehr als alle Produktkosten zusammen"), der wie eine universelle Wahrheit klingt, aber ein Modell-Ergebnis ist. Für kritische Leser kann das als politisch motiviert wirken.

### Konkrete Risikostellen (aus Quellen identifiziert)

| Formulierung | Risiko | Besser |
|---|---|---|
| "Die Rendite wird letztlich an der Wahlurne entschieden" | Wirkt aktivistisch | "Steuerregeln können über Jahrzehnte ähnlich stark wirken wie Produktkosten — und sie werden politisch entschieden." |
| "Der Staat holt sich 2,8× mehr als alle Produktkosten zusammen" | Klingt wie universelle Wahrheit, ist Modell-Ergebnis | "...— in diesem vereinfachten 30-Jahre-Modell." |
| Szenario-Matrix mit S2/S3 als politisch denkbar | Kann als Warnung vor bestimmten Parteien gelesen werden | Explizit als Gedankenexperiment framen: "Was wäre, wenn..." |

### Tonalitätsregeln

```
1. Fakt / Modell / Interpretation explizit trennen
   - Fakt: Steuern beeinflussen die Nachsteuerrendite.
   - Modell: Wir vergleichen vier vereinfachte Regime.
   - Interpretation: Steuerpolitik ist ein langfristiger Renditehebel.

2. Alle quantitativen Aussagen mit Modellkontext versehen.
   "In diesem vereinfachten Modell..." / "...bei stabilen Marktbedingungen..."

3. Keine Partei namentlich, keine Wahlempfehlung, kein "man muss wählen, damit..."

4. S2/S3 als politisch diskutierte Szenarien, nicht als Drohung.
   "SPD fordert..." → "Als Szenario wird diskutiert..."

5. Empörung als Reaktion ist kein Ziel.
   Die primäre Reaktion soll Klarheit sein: "Ich verstehe jetzt, was auf dem Spiel steht."

6. S0 (DE vor 2009) dient nicht dem Nostalgie-Framing, sondern der Kalibrierung:
   "So war es tatsächlich — das ist der Maßstab, nicht eine politische Forderung."
```

### Finanzwesir-Tonalität

Sachlich, transparent, rechnerisch. Keine Dramatisierung. Zahlen sprechen für sich. Wenn der Unterschied 306 €/Monat ist, muss keine Empörung erzeugt werden — die Zahl wirkt allein.

---

## Steuerungsblock-Anamnese-Entwurf

*Entwurf — nicht der finale Seed, noch keine MINI_SPEC-Eintragung*

---

### Arbeitsidentität

**App-Titel (Vorschlag):** Regulatorisches Risiko-Dashboard — oder — Steuerpolitik und deine ETF-Rente  
**Slug:** `regulatorik-dashboard`  
**Block:** G — Systemkritische Einwände  
**App-ID:** G1

Diese App zeigt, wie Steuerpolitik — historisch gewachsen (S0 bis S1, 2009 als Zäsur), aktuell (S1 deutsches Recht), und politisch diskutiert (S2/S3) — die Nachsteuerrendite und damit die monatliche Rente von ETF-Sparern quantitativ verändert. Die "ETF-Wahlurne" ist eine UX-Mechanik-Metapher für "Steuerregeln werden politisch gesetzt", nicht die App-Identität.

---

### Rolle im Funnel

G1: Systemkritischer Einwand — adressiert den Nutzer, der grundsätzlich versteht, was ETF-Sparpläne sind, aber zweifelt, ob langfristiges Planen Sinn macht, wenn Steuerregeln offen sind.

Einstiegspunkt: nach grundlegender ETF-Einordnung, vor oder parallel zur Umsetzungsentscheidung.

---

### Psychologische Barriere

Steuerpolitische Eingriffe fühlen sich unkontrollierbar an und lähmen:
> "Wenn der Staat die Regeln ändern kann, wann er will — warum sollte ich überhaupt anfangen zu planen?"

---

### Falscher Glaubenssatz

> "Weil Steuerpolitik unplanbar ist, ist jede langfristige ETF-Strategie unsicher bis sinnlos."

---

### Zielzustand nach Nutzung

Der Nutzer kann sagen:
> "Steuerrisiko ist real — das Modell zeigt 306 €/Monat Unterschied über 30 Jahre. Aber ich kann es einkalkulieren. Es ändert Beträge, nicht das Prinzip. Einfach und günstig bleibt die richtige Antwort."

---

### Nicht-Ziele

```
- keine Steuerberatung
- keine politische Kampagne, keine Parteipositionierung
- keine Wahlempfehlung
- keine Prognose künftiger Gesetzgebung
- kein Versprechen, dass Regulierung harmlos ist
- kein Framing als universelle Wahrheit (Modell-Kontext immer explizit)
- kein technischer Vertrag aus etf-wahlurnen-rechner.html
- keine Katastrophisierung
```

---

### Muss-Kriterien

```
1. Vier Steuerszenarien S0–S3 mit konkreten deutschen Bezügen und verifizierten Zahlen.
2. S0 = DE vor 2009 (nicht UK ISA / Roth IRA als Hauptframing).
3. S1 = aktuelles deutsches Recht (Referenzlinie, nicht "gut" oder "schlecht").
4. S2/S3 = politisch diskutierte Szenarien, als Gedankenexperiment geframed.
5. Rechenmodell transparent und aufklappbar (was wird angenommen, was nicht).
6. Keine Aussagen, die als Wahlaufruf oder Parteikritik lesbar sind.
7. Modell-Kontext bei jeder quantitativen Kernaussage explizit.
8. Kassenbon-Einstieg (Stärke laut UX-Konsens) erhalten.
```

---

### Tonalität / Framing-Regeln

```
1. Sachlich, rechnerisch, transparent.
2. Fakt / Modell / Interpretation immer trennbar.
3. Zahlen erklären sich, keine Empörung erzwingen.
4. S0 als historische Kalibrierung, nicht als politische Forderung.
5. S2/S3 als "Was wäre wenn" — nicht als Drohung.
6. Formulierungen ohne Parteinamen, ohne Wahlaufruf.
7. Primäre Nutzer-Reaktion soll Klarheit und Handlungsfähigkeit sein.
```

---

### LLM-Prüffragen / LLM-Prüfscore-Entwurf

Für spätere Seed-Qualitätsprüfung (AP-14g und APP_SPEC-Review):

```
F1: Erkennt ein LLM, dass "ETF-Wahlurne" Mechanik-Metapher ist, nicht App-Identität?
F2: Erkennt ein LLM, dass die App keine politische Kampagne ist?
F3: Erkennt ein LLM, dass die App Steuerrisiko ernst nimmt, aber nicht katastrophisiert?
F4: Erkennt ein LLM, dass etf-wahlurnen-rechner.html Mockup ist, kein technischer Vertrag?
F5: Erkennt ein LLM, dass S0 deutsches historisches Recht (vor 2009) ist, nicht ISA/Roth?
F6: Erkennt ein LLM, dass die App keine Steuerberatung gibt?
F7: Erkennt ein LLM, dass "Das Risiko ist real — aber es zerstört nicht deine Strategie" die Kernbotschaft ist?
F8: Erkennt ein LLM, dass Modell-Aussagen ("2,8× mehr") Modell-Ergebnisse sind, keine Fakten?
```

Score-Regel (Entwurf, identisch mit AP-11b-Template):
```
0 = nicht erkannt / falsch
1 = teilweise erkannt
2 = klar und präzise erkannt
```

Bestehend — min. 12/16 Punkte (bei 8 Fragen × max. 2 Punkte) für GRÜN.

---

## Empfehlung AP-14g

### Aufgabe

AP-14g entwirft den Seed-Block für `regulatorik-dashboard` in:
```
Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
```

### Pflicht-Quellen für AP-14g

```
1. Apps/regulatorik-dashboard/APP_FABRIK_ANAMNESE_MATERIAL.md     (App-Kern-Hypothese)
2. Apps/regulatorik-dashboard/MINI_SPEC_FROM_HAUPTDOKUMENT.md     (Kernbotschaft, Szenario-Matrix)
3. Apps/regulatorik-dashboard/ETF-Wahlurnen-App-Abschlussdokumentation_V2.md  (Zahlen, Narrative)
4. Apps/regulatorik-dashboard/UX-Synthese-LLM-Bewertungen-Iteration-1.md  (Framing-Regeln)
5. docs/steering/patches/AP-14f_regulatorik-dashboard_identitaets-steuerungsblock-anamnese_Ergebnis.md  (diese Datei)
6. Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md  (Seed-Format-Referenz)
```

### Gesperrte Formulierungen für AP-14g

```
- Nicht: "ETF-Wahlurnen-Rechner" als App-Identität
- Nicht: "regulatorik-dashboard" als inhaltliche Beschreibung
- Nicht: "Die Rendite wird letztlich an der Wahlurne entschieden" (aktivistisch)
- Nicht: "Der Staat holt sich X× mehr" ohne Modell-Kontext
- Nicht: S2/S3 als "wahrscheinlich" framen (Gedankenexperiment, nicht Prognose)
- Nicht: etf-wahlurnen-rechner.html als technischer Vertrag zitieren
```

### Frage für AP-14g

Ob AP-14g einen bestehenden Seed-Eintrag `regulatorik-dashboard` überarbeitet oder neu anlegt, klärt AP-14g nach Lesen von `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`. Aus diesem AP heraus kann das nicht entschieden werden (Datei-Lesescope von AP-14f nicht benötigt, daher nicht geöffnet).

---

## Geänderte Dateien

```
docs/steering/patches/AP-14f_regulatorik-dashboard_identitaets-steuerungsblock-anamnese_Ergebnis.md  (neu)
```

---

## Nicht-Ziel-Nachweis

```
MINI_SPEC geändert:          nein
Seed geändert:               nein
APP_SPEC erstellt/geändert:  nein
HTML geändert:               nein
Bauprompt geändert:          nein
UX-Synthese geändert:        nein
Wissensdateien geändert:     nein
Altmaterial fachlich analysiert: nein
Dateien verschoben:          nein
Dateien gelöscht:            nein
Commit ausgeführt:           nein
Abschlussritual ausgeführt:  nein
```
