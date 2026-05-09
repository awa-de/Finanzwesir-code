# App-Fabrik — Konsolidierung und nächste Schritte V0.1

**Stand:** 2026-05-09  
**Arbeitsverzeichnis:** `docs/App-Fabrik`  
**Status:** Arbeitsstand, noch nicht bindend  

---

## 1. Ausgangslage

Das Verzeichnis `docs/App-Fabrik` ist jetzt der temporäre Sammelpunkt für alles, was zur App-Fabrik gehört. Das ist richtig. In dieser Phase wäre es falsch, Dokumente schon endgültig auf `docs/spec`, `docs/design-system`, `.claude/commands` oder `Theme/assets/js` zu verteilen.

Der Zweck von `docs/App-Fabrik` ist:

1. Vorschläge sammeln.
2. Bestehende Unterlagen vergleichen.
3. Entscheidungen vorbereiten.
4. Produktionsstandard formulieren.
5. Erst danach systematisch ins Repo einsortieren.

Die zentrale Leitlinie bleibt:

> Vorhandenes Claude-Betriebssystem nutzen, nicht parallel neu bauen.

Das bedeutet: Keine zweite Projektsteuerung, keine zweite Skill-Logik, keine neue Schattenarchitektur. Die App-Fabrik wird als Schicht in das bestehende System integriert.

---

## 2. Was aktuell in `docs/App-Fabrik` liegt

Aktueller Inhalt:

```text
docs/App-Fabrik/
  App-Fabrik_Zusatzpaket-Integration_V0-1.md
  ETF-App-Fabrik_Produktlandkarte_V0-1.md
  ETF-App-Fabrik_Produktlandkarte_V0-2.md
  ETF-Apps-Hauptdokument.md
  Vorschläge Perplexity/
    APP-ARCHITEKTUR.md
    README.md
    fw-app-template.html
    fw-apps/_template.js
```

### Einordnung der Dateien

| Datei | Rolle | Bewertung |
|---|---|---|
| `ETF-Apps-Hauptdokument.md` | Inhaltliche Primärquelle der 18 Apps | Weiterhin wichtigste fachliche Quelle |
| `ETF-App-Fabrik_Produktlandkarte_V0-1.md` | Erste Produktlandkarte | Historisch nützlich, von V0.2 überholt |
| `ETF-App-Fabrik_Produktlandkarte_V0-2.md` | Aktuelle Produktlandkarte mit App-Familien, Prototypen, Factory-Lücken | Aktueller Arbeitsstand |
| `App-Fabrik_Zusatzpaket-Integration_V0-1.md` | Bewertung des Zusatzpakets | Sehr wichtig als Entscheidungsbrücke |
| `Vorschläge Perplexity/README.md` | Übergabe zum Demo-Paket | Input, nicht bindend |
| `Vorschläge Perplexity/APP-ARCHITEKTUR.md` | Architekturvorschlag | Teilweise übernehmen, aber nicht 1:1 |
| `Vorschläge Perplexity/fw-app-template.html` | Demo-Template | Als Design-/Komponentenlabor wertvoll |
| `Vorschläge Perplexity/fw-apps/_template.js` | JS-Kopiervorlage | Als Inspirationsquelle wertvoll, produktiv zu grob |

---

## 3. Wo stehen wir inhaltlich?

### 3.1 Gesichert

Folgende Punkte sind inzwischen robust genug, um als Arbeitsannahme zu gelten:

1. Die App-Fabrik soll keine 21 Einzelanfertigungen bauen.
2. Die 18 bekannten Apps werden nach App-Familien gruppiert.
3. Bestehende Prototypen bleiben Referenzen und werden nicht blind überschrieben.
4. Die Chart-Engine ist ein Architektur-Anker, aber nicht das gesamte App-System.
5. Ghost bleibt das CMS; Apps werden über HTML-Cards im Artikel eingebettet.
6. JavaScript läuft clientseitig beim Seitenaufruf.
7. Das Design-System kommt aus Theme/CSS-Tokens, nicht aus App-spezifischem Styling.
8. Claude soll vorhandene Skills, Commands und Gates nutzen.
9. Das Perplexity-/Zusatzpaket ist ein Demo-Template, kein Produktionsstandard.

---

### 3.2 Wichtigste technische Arbeitsannahmen

#### Datenformate

Empfehlung:

```text
CSV  = tabellarische fachliche Daten
JSON = strukturierte App-Konfiguration
Inline data-options = kleine Overrides in der Ghost-Card
```

Für Dich als Nicht-Programmierer heißt das:

- CSV bleibt das bevorzugte Redakteursformat, wenn es um Tabellen geht.
- JSON wird nur dort eingesetzt, wo strukturierte Konfiguration wirklich Vorteile bringt.
- Komplexes JSON sollte nicht manuell in Ghost-HTML-Cards geschrieben werden.
- Wenn JSON nötig ist, sollte Claude es erzeugen oder validieren.

#### Ghost-Einbettung

Langfristig sollte die Ghost-HTML-Card möglichst einfach bleiben:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="https://www.finanzwesir.com/content/files/prokrastinations-preis.csv?v=2026-05"
     data-fw-options="defaultRate:300,years:30">
</div>
```

Die produktive Initialisierung sollte nicht pro App frei improvisiert werden. Stattdessen lädt das Theme eine gemeinsame App-Fabrik-Runtime, die alle `fw-app`-Container findet und initialisiert.

---

## 4. Was vom Demo-/Perplexity-Paket übernommen werden sollte

### Übernehmen

1. **State-Modell**
   - Loading
   - Content
   - Error
   - Empty State

2. **App-Shell-Idee**
   - Jede App hat eine gemeinsame äußere Struktur.
   - Nur die App-spezifische Logik unterscheidet sich.

3. **Whitelist-Prinzip für Optionen**
   - Nur erlaubte Optionen werden verarbeitet.
   - Unbekannte Optionen werden ignoriert.

4. **SafeDOM-Prinzip**
   - Nutzdaten nie ungeprüft via `innerHTML`.
   - Ausgabe über `textContent` oder sichere Renderer.

5. **UI-Primitiven als V0.1-Inventar**
   - Slider
   - KPI-Karten
   - Range-Buttons
   - CTA
   - Annahmenbox
   - Error-State
   - Skeleton/Loading

6. **Demo-Template als Prüflabor**
   - Nicht Produktion.
   - Aber sehr nützlich, um Design-System, Komponenten und Microcopy zu testen.

---

### Nicht 1:1 übernehmen

1. **Globale Initialisierer wie `window.FwAppInit` als Produktionsstandard**
   - Zu fragil, wenn mehrere Apps auf einer Seite laufen.
   - Besser: App-Registry und modulare Initialisierung.

2. **`document.querySelector('.fw-app')`**
   - Findet nur die erste App.
   - Produktiv müssen mehrere App-Instanzen möglich sein.

3. **Script pro App direkt in jeder Ghost-Card**
   - Für Demo okay.
   - Produktiv besser über gemeinsame Runtime und registrierte App-Module.

4. **Tailwind CDN**
   - Für Demo okay.
   - Produktion: Theme-Build / lokale Assets / vorhandenes Design-System.

5. **`FW_THEME_OVERRIDE`**
   - Nicht nötig, wenn die CSS-Variables-Bridge konsequent genutzt wird.

6. **Komplexes JSON in `data-options`**
   - Fehleranfällig für Redakteure.
   - Besser: CSV/JSON-Datei plus kleine Overrides.

---

## 5. Was Claude Code schon sinnvoll machen kann

Claude Code kann bereits jetzt operative Arbeit leisten. Es muss aber klar geführt werden.

### 5.1 Dateioperationen, die Claude kann

Claude Code kann im Repo typischerweise:

- Dateien lesen
- Dateien anlegen
- Dateien ändern
- Dateien verschieben
- Dateien umbenennen
- Ordner anlegen
- Ordnerstrukturen aufräumen
- Inhalte aus mehreren Dateien konsolidieren
- Markdown-Dokumente erzeugen
- Diffs anzeigen
- Suchläufe über das Repo machen
- wiederkehrende Begriffe und Pfade prüfen
- einfache Skripte ausführen
- Tests oder Build-Kommandos ausführen, wenn vorhanden
- Git-Status und Diffs prüfen

Wichtig: Claude sollte nicht eigenmächtig große Lösch-, Verschiebe- oder Umbauaktionen machen, ohne vorher Plan und Diff zu zeigen.

---

### 5.2 Was Claude jetzt konkret tun sollte

#### Sofort sinnvoll

```text
1. docs/App-Fabrik inventarisieren
2. Dokumente nach Rolle klassifizieren
3. Widersprüche markieren
4. konsolidierten Arbeitsstand schreiben
5. Decision Log anlegen
6. offenen Fragenkatalog anlegen
7. App-Fabrik-Standard als Draft formulieren
```

#### Noch nicht sinnvoll

```text
1. Produktivcode für alle Apps bauen
2. bestehende Prototypen überschreiben
3. Theme-Runtime umbauen
4. Commands/Skills blind neu schreiben
5. APP-ARCHITEKTUR.md aus dem Zusatzpaket als bindend übernehmen
```

---

## 6. Empfohlene nächste Dateioperationen in `docs/App-Fabrik`

Claude sollte als nächstes diese Arbeitsstruktur anlegen:

```text
docs/App-Fabrik/
  00_STATUS.md
  01_DECISION_LOG.md
  02_OPEN_QUESTIONS.md
  03_APP_FACTORY_STANDARD_DRAFT.md
  04_CLAUDE_WORKFLOW_DRAFT.md
  05_PILOT_STRATEGY.md
  _input/
    perplexity/
      README.md
      APP-ARCHITEKTUR.md
      fw-app-template.html
      fw-apps/_template.js
  _archive/
    ETF-App-Fabrik_Produktlandkarte_V0-1.md
```

### Warum diese Struktur?

- `00_STATUS.md` sagt, wo wir stehen.
- `01_DECISION_LOG.md` hält fest, was entschieden ist und was nicht.
- `02_OPEN_QUESTIONS.md` verhindert, dass offene Punkte verschwinden.
- `03_APP_FACTORY_STANDARD_DRAFT.md` wird später die Basis für `docs/spec/APP-FACTORY-STANDARD.md`.
- `04_CLAUDE_WORKFLOW_DRAFT.md` wird später Grundlage für Commands.
- `05_PILOT_STRATEGY.md` legt fest, welche App zuerst durch die Fabrik läuft.
- `_input/` enthält fremde oder externe Vorschläge.
- `_archive/` enthält überholte Zwischenstände.

Diese Struktur ist noch kein finaler Produktionsstandard. Sie ist eine Arbeitsstruktur.

---

## 7. Nächste inhaltliche Schritte

### Schritt 1 — Status und Entscheidungen sauber trennen

Aktuell sind Status, Vorschläge, Entscheidungen und offene Fragen noch über mehrere Dateien verteilt.

Claude sollte daraus machen:

```text
00_STATUS.md
01_DECISION_LOG.md
02_OPEN_QUESTIONS.md
```

Das ist wichtig, weil sonst jedes neue Dokument wieder alles neu erklärt.

---

### Schritt 2 — App-Fabrik-Standard als Draft erstellen

Ziel:

```text
docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md
```

Inhalt:

1. Mission der App-Fabrik
2. App-Familien
3. Standard-Dateistruktur pro App
4. Ghost-HTML-Card-Vertrag
5. CSV/JSON-Regeln
6. Design-System-Vertrag
7. UI-Primitiven
8. State-Modell
9. SafeDOM/Security
10. A11y-Minimum
11. Code-Konventionen
12. Definition of Done
13. Was Claude ändern darf / nicht darf

---

### Schritt 3 — Claude-Workflow als Draft erstellen

Ziel:

```text
docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md
```

Inhalt:

1. Welche vorhandenen Commands genutzt werden
2. Welche vorhandenen Skills genutzt werden
3. Wo ein neuer App-Fabrik-Command sinnvoll ist
4. Ablauf von App-Idee bis Release
5. Gates vor Code
6. Review nach Code
7. Dokumentation pro App

Wichtig: Keine neuen Skills bauen, bevor klar ist, dass vorhandene Skills nicht reichen.

---

### Schritt 4 — Pilotstrategie finalisieren

Ziel:

```text
docs/App-Fabrik/05_PILOT_STRATEGY.md
```

Empfohlene Reihenfolge:

1. `prokrastinations-preis`
2. `risiko-uebersetzer`
3. `etf-namensdecoder`
4. später: `regulatorisches-risiko-dashboard`

Begründung:

- Die erste App muss den Fabrikstandard testen.
- Sie darf nicht zu komplex sein.
- Sie muss typische UI-Elemente enthalten.
- Sie muss Wiederverwendung erzwingen.
- Regulatorik ist wertvoll, aber als erster Pilot zu sonderfalllastig.

---

## 8. Was Du jetzt machen musst

### 8.1 Fachlich entscheiden

Du musst nicht programmieren. Du musst vor allem entscheiden:

1. **Ist `docs/App-Fabrik` als temporärer Arbeitsraum bestätigt?**
2. **Darf Claude die oben vorgeschlagene Arbeitsstruktur anlegen?**
3. **Bleibt das Demo-Template Input/Labor statt Produktionsstandard?**
4. **Ist die erste Pilot-App `prokrastinations-preis` oder willst Du mit `risiko-uebersetzer` starten?**
5. **Darf Claude V0.1 der Produktlandkarte nach `_archive/` verschieben?**

Meine Empfehlung:

```text
1. Ja.
2. Ja.
3. Ja.
4. Prokrastinations-Preis als erster technischer Pilot.
5. Ja, aber nicht löschen, nur archivieren.
```

---

### 8.2 Operativ in Claude Code ausführen lassen

Du kannst Claude Code danach ungefähr so instruieren:

```text
Arbeite im Repo relativ zu docs/App-Fabrik.
Dieses Verzeichnis ist ein temporärer Arbeitsraum für die App-Fabrik.

Aufgabe:
1. Lege die Arbeitsstruktur an:
   - 00_STATUS.md
   - 01_DECISION_LOG.md
   - 02_OPEN_QUESTIONS.md
   - 03_APP_FACTORY_STANDARD_DRAFT.md
   - 04_CLAUDE_WORKFLOW_DRAFT.md
   - 05_PILOT_STRATEGY.md
   - _input/perplexity/
   - _archive/

2. Verschiebe die Perplexity-Vorschläge nach _input/perplexity/.
3. Verschiebe ETF-App-Fabrik_Produktlandkarte_V0-1.md nach _archive/.
4. Lösche nichts.
5. Nutze die vorhandenen Dateien als Quelle.
6. Schreibe zuerst nur Status, Decision Log und Open Questions.
7. Zeige danach den Git-Diff.
8. Keine Änderungen außerhalb von docs/App-Fabrik.
```

---

## 9. Wichtigste Leitplanken für Claude

Claude sollte bei dieser Aufgabe folgende Regeln bekommen:

```text
- Keine Änderungen außerhalb docs/App-Fabrik.
- Keine Löschungen.
- Keine produktiven Theme- oder JS-Änderungen.
- Keine neuen Skills oder Commands ohne separate Freigabe.
- Fremde Vorschläge als Input markieren, nicht als bindend.
- Bestehende Dokumente nicht stillschweigend überschreiben.
- Jede Entscheidung in 01_DECISION_LOG.md erfassen.
- Jede offene Frage in 02_OPEN_QUESTIONS.md erfassen.
- Am Ende immer Git-Diff zeigen.
```

---

## 10. Konkreter nächster Arbeitsauftrag an Claude Code

Empfohlener Prompt:

```text
Nutze das vorhandene Claude-Betriebssystem, baue nichts parallel neu.
Arbeite ausschließlich relativ zu docs/App-Fabrik.

Kontext:
docs/App-Fabrik ist ein temporärer Arbeitsraum. Alle Dokumente dort sind Arbeitsstände, auch wenn einzelne Dateien „final“, „binding“ oder ähnlich sagen. Behandle externe Vorschläge als ernsthafte Unterstützung, aber nicht als verbindliche Wahrheit.

Aufgabe:
Konsolidiere den aktuellen Stand der App-Fabrik.

Erstelle diese Arbeitsstruktur:
- 00_STATUS.md
- 01_DECISION_LOG.md
- 02_OPEN_QUESTIONS.md
- 03_APP_FACTORY_STANDARD_DRAFT.md
- 04_CLAUDE_WORKFLOW_DRAFT.md
- 05_PILOT_STRATEGY.md
- _input/perplexity/
- _archive/

Verschiebe:
- Vorschläge Perplexity/* nach _input/perplexity/
- ETF-App-Fabrik_Produktlandkarte_V0-1.md nach _archive/

Lösche nichts.
Ändere nichts außerhalb von docs/App-Fabrik.

Befülle zunächst nur:
- 00_STATUS.md
- 01_DECISION_LOG.md
- 02_OPEN_QUESTIONS.md

Nutze als Quellen:
- ETF-Apps-Hauptdokument.md
- ETF-App-Fabrik_Produktlandkarte_V0-2.md
- App-Fabrik_Zusatzpaket-Integration_V0-1.md
- _input/perplexity/README.md
- _input/perplexity/APP-ARCHITEKTUR.md

Am Ende:
- kurze Zusammenfassung
- Git-Diff zeigen
- offene Entscheidungen markieren
```

---

## 11. Kurzfazit

Wir stehen nicht mehr am Anfang im Sinne von „nichts ist da“. Wir stehen am Anfang der Industrialisierung.

Die richtige nächste Bewegung ist nicht Coden, sondern Ordnung schaffen:

```text
Sammelraum → Status → Entscheidungen → offene Fragen → Draft-Standard → Claude-Workflow → Pilot-App
```

Du musst jetzt vor allem den Arbeitsrahmen freigeben. Claude kann die Dateioperationen und die Konsolidierung erledigen.
