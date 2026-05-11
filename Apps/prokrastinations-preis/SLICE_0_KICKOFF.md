# SLICE_0_KICKOFF — prokrastinations-preis

Stand: 2026-05-11 | Erstellt von: Claude | Grundlage: Pre-Code-Gate Full bestanden

---

## 1. Status

| Feld | Wert |
|---|---|
| App | prokrastinations-preis |
| Slice | Slice 0 — App-Shell und Ghost-Card-Bootstrap |
| Datum | 2026-05-11 |
| Ergebnis | Freigegeben durch Albert — 2026-05-11 |
| Grundlage | SLICE_PLAN.md (Pre-Code-Gate Full bestanden 2026-05-10) |
| Spec-Gate | SG-01, SPEC_GATE_REPORT.md — bestanden 2026-05-10 |

**Hinweis:** Dieses Dokument ist keine Implementierung und keine Code-Freigabe. Es dokumentiert Annahmen, Risiken und den vereinbarten Implementierungsplan für Slice 0, damit Albert eine informierte Freigabe erteilen kann.

---

## 2. Slice-Ziel

**Was soll Slice 0 beweisen?**
Dass der Ghost-Card-Vertrag lokal funktioniert: Container wird erkannt, Slug-Prüfung funktioniert, die drei States (loading → content / error) schalten sauber, und kein sicherheitsrelevantes Verhalten bricht.

**Nutzerwert:**
„Die App startet, zeigt den richtigen State, stürzt nicht ab." — kein leerer Container, kein Stack-Trace, kein XSS.

**Ausdrücklich nicht Teil von Slice 0:**
- Keine Berechnung (prokrastinationsPreis, endwertSofort etc.)
- Kein Config-Load (weder intern noch extern)
- Kein Slider, kein Input-Handler
- Kein Data-Fetch, keine asynchronen Netzwerkoperationen
- Kein Core-Modul / keine Extraktion für Pilot 2
- Kein Framework (React, Vue, Alpine etc.)
- Kein Build-System (Vite, Rollup, Webpack)
- Kein Shadow DOM
- Keine Chart-Engine-Berührung
- Keine echten Berechnungsdaten in den Platzhaltern

---

## 3. Erlaubter Änderungsumfang

**Erlaubt für spätere Slice-0-Implementierung:**

```
Apps/prokrastinations-preis/app.js        ← NEU
Apps/prokrastinations-preis/app.css       ← NEU
Apps/prokrastinations-preis/app.test.html ← NEU
```

Alle drei Dateien werden neu angelegt. Keine bestehende Datei wird verändert.

**Nicht erlaubt:**
- keine APP_SPEC-Änderung
- keine SECURITY-BASELINE-Änderung
- keine APP-INTERFACE-Änderung
- keine RFC-Änderung (APP_FACTORY_IMPLEMENTATION_RFC.md)
- keine Workflow-Änderung (04_CLAUDE_WORKFLOW_DRAFT.md)
- keine Decision-Log-Änderung
- keine Chart-Engine-Berührung
- keine Core-Extraktion
- kein Framework
- kein Build-System
- kein Shadow DOM
- keine Berechnung
- keine Slider
- keine externe Config
- keine Dateien außerhalb Apps/prokrastinations-preis/
- keine Änderung an SLICE_PLAN.md

---

## 4. Annahmenliste

| Nr | Annahme | Quelle | Risiko, falls falsch | Albert-Bestätigung nötig? |
|---|---|---|---|---|
| A-1 | app.test.html läuft über VSCode Live Server (localhost), nicht als file://-URL | SLICE_PLAN.md §Testaufruf | file://-URLs können CORS-Fehler bei späteren fetch()-Aufrufen (Slice 1+) erzeugen; in Slice 0 noch kein Fetch | Nein — dokumentierter Workflow |
| A-2 | app.js und app.css werden per relativem Pfad eingebunden (./app.js, ./app.css) | SLICE_PLAN.md §Erlaubte Dateien | Falscher Pfad → App lädt nicht; sofort sichtbar im Test | Nein |
| A-3 | Ghost-CSS (screen.css, Tailwind, Theme-Tokens) ist in app.test.html nicht vorhanden; Fallback-Tokens müssen eigenständig halten | SPEC_GATE_REPORT.md §NB-3 | Ohne Fallbacks: leerer Container ohne sichtbare Stile | Nein — NB-3: Theme-Inventar erst vor Slice 6 nötig |
| A-4 | JavaScript ist aktiviert; kein noscript-Fallback in Slice 0 | APP_SPEC.md §14 Sicherheitsregel 8 | Nutzer ohne JS sieht leeren Container; kein Fallback in Pilot-1 vorgesehen | Nein — bewusste Einschränkung für Pilot-1 |
| A-5 | data-fw-app kann fehlen, leer oder ungültig sein; alle drei Fälle sind Redakteursfehler, keine Ausnahmen | APP-INTERFACE.md §3.1, SECURITY-BASELINE.md §6.3 | Wenn nur Happy Path behandelt: leerer Container oder Crash auf echter Ghost-Seite | Nein — Pflicht laut Spec |
| A-6 | Mehrere .fw-app Container auf einer Seite sind normaler Betrieb | APP-INTERFACE.md §3.1, RFC §D9 | Wenn nur ein Container behandelt: zweite App startet nie, ohne Fehlermeldung | Nein — Pflicht laut Spec |
| A-7 | SLUG_WHITELIST ist eine Kompilzeit-Konstante im IIFE-Wrapper: ['prokrastinations-preis'] | SLICE_PLAN.md §app.js, RFC §B3 | Wenn Whitelist extern geladen: async-Komplexität und Netzwerkabhängigkeit in Slice 0 | Nein — Slice-0-Entscheidung in SLICE_PLAN |
| A-8 | Alle Werte aus data-*-Attributen sind untrusted input, unabhängig von der Ghost-Quelle | SECURITY-BASELINE.md §6.2 | Wenn Ghost-Daten als trusted behandelt: XSS-Angriff über manipulierte Ghost-Cards möglich | Nein — Pflicht laut SECURITY-BASELINE |
| A-9 | textContent ist das einzige erlaubte DOM-Ausgabeverfahren für Slice 0 | Q-01 (DECISION_LOG.md), APP-INTERFACE.md §9 Regel 2 | innerHTML → XSS-Risiko; keine Ausnahme möglich | Nein — Binding Decision Q-01 |
| A-10 | data-fw-options wird in Slice 0 weder gelesen noch ausgegeben | SLICE_PLAN.md §Was Slice 0 NICHT enthält, Q-02 | Selbst als Zeichenkette ausgegeben: Ausgabe wäre potentiell unsauber; XSS-Payload liegt im Attribut-Wert | Nein — explizit ausgeschlossen |
| A-11 | Loading-State ist transitional und synchron; kein Timer, kein Timeout | SLICE_PLAN.md §A0-3 | Künstlicher Timeout: unnötige Komplexität, bricht Slice 1 ggf. | Nein — SLICE_PLAN explizit |
| A-12 | Content-State enthält in Slice 0 nur statische Platzhaltertexte, die offensichtlich keine echten Zahlen sind | SLICE_PLAN.md §Ziel | Wenn Platzhalter wie echte Werte aussehen: Slice 1 wird nicht sauber gegen Slice 0 getestet | Nein — Platzhalter müssen als Platzhalter erkennbar sein |
| A-13 | Error-State zeigt exakt: „Diese App konnte nicht geladen werden." — kein Stack-Trace | SLICE_PLAN.md §app.js, APP_SPEC.md §9 | Stack-Trace im UI: technische Details für Endnutzer sichtbar; Sicherheitsrisiko | Nein — Binding Decision |
| A-14 | bootstrap() erhält einen Initialisierungs-Guard (data-fw-initialized); zweiter Aufruf überspringt bereits initialisierte Container | RFC §B3, RFC §D9 | Slice 7b: Ghost Code Injection + Theme-Einbindung können beide app.js laden → doppelte DOM-Nodes | Nein — präventive Maßnahme, 2 Zeilen |
| A-15 | Kein Shadow DOM, keine iframes; querySelectorAll('.fw-app') findet alle Container | SLICE_PLAN.md §Was Slice 0 NICHT enthält | Shadow DOM: querySelectorAll findet Container nicht; App startet nie | Nein — Shadow DOM ausgeschlossen |
| A-16 | Kein window.FwAppInit oder gleichwertige Window-API; App-Logik bleibt im IIFE-Scope | DECISION_LOG.md §A-06 | Globale Window-API: Namespace-Kollision mit anderen Scripts in Ghost | Nein — Binding Decision A-06 |
| A-17 | init() wird als async function designt, auch wenn Slice 0 intern synchron arbeitet | DECISION_LOG.md §A-11 | Synchrones init(): Slice 1 muss init() auf async umstellen → Breaking Change in allen Aufrufstellen | Nein — Binding Decision A-11 |
| A-18 | Keine globalen IDs innerhalb .fw-app; alle DOM-Operationen relativ zum Container-Parameter | DECISION_LOG.md §Q-03 | Globale IDs: bei zwei Containern findet document.getElementById() immer den ersten → zweite App bricht | Nein — Binding Decision Q-03 |

---

## 5. Failure Cases zuerst

| FC | Situation | Erwartetes Verhalten | In Slice 0 behandelt? | In app.test.html testbar? | Akzeptanzkriterium |
|---|---|---|---|---|---|
| FC-1 | Kein .fw-app Container auf der Seite | console.warn('[fw-app] Kein Container gefunden.'), keine Exception, Seite lädt normal | Ja | Nein — Codeverhalten, DevTools prüfbar | Keine Exception in Konsole |
| FC-2 | .fw-app ohne data-fw-app | Error-State: „Diese App konnte nicht geladen werden." — kein Stack-Trace, kein leerer Container | Ja | Ja — Szenario C | A0-2 |
| FC-3 | Ungültiger data-fw-app-Slug (nicht in SLUG_WHITELIST) | Error-State: „Diese App konnte nicht geladen werden." — kein Stack-Trace | Ja | Ja — Szenario B | A0-2 |
| FC-4 | Mehrere .fw-app Container auf einer Seite | Alle Container werden initialisiert; keine Exception; kein doppelter DOM-Node | Ja | Ja — Szenario D | A0-1, A0-5 |
| FC-5 | Doppelte Initialisierung (z.B. zwei script-Tags oder Ghost Code Injection + Theme) | data-fw-initialized-Guard: zweiter Aufruf überspringt bereits initialisierte Container | Ja — Guard empfohlen | Eingeschränkt (zwei script-Tags simulierbar) | A0-7 |
| FC-6 | data-fw-options mit XSS-Testwert | Attribut wird in Slice 0 vollständig ignoriert; kein Alert, kein innerHTML | Ja — data-fw-options wird nicht gelesen | Ja — Szenario E | A0-4, A0-5 |
| FC-7 | Unerwartete JS-Exception in initApp() | try/catch: Error-State + textContent-Fehlermeldung; Stack-Trace nur in console.error, nie im UI | Ja — try/catch in initApp() ist Pflicht | Eingeschränkt (nur durch gezieltes Provozieren) | A0-2, A0-5 |
| FC-8 | Versehentliche innerHTML-Nutzung | Verboten durch Q-01; Verifikation durch Code-Review nach Implementierung | Ja — Binding Decision Q-01 | Nein — Blackbox-Test reicht nicht | A0-4 |
| FC-9 | CSS leakt aus .fw-app heraus | Kein Selektor außerhalb .fw-app; kein globaler Reset; Ghost-Elemente neben .fw-app bleiben unverändert | Ja — CSS-Namespace-Pflicht | Teilweise — Ghost-Elemente neben .fw-app in app.test.html prüfen | A0-9 |
| FC-10 | Ghost-Theme überschreibt App-Styles unerwartet | app.css definiert Basis-Stile mit ausreichender Spezifität; Fallback-Tokens greifen wenn --fw-*-Variablen fehlen | Teilweise — vollständiger Ghost-Test erst Slice 7b | Teilweise — ohne Ghost-CSS prüfbar ob Fallbacks halten | A0-6 |
| FC-11 | Testseite simuliert Ghost nicht realistisch genug | Dokumentierter Trade-off; Fallback-Tokens halten; .kg-card-Wrapper in Szenarien gibt Mindest-Kontext | Teilweise — vollständiger Ghost-Test erst Slice 7b (NB-4) | Ja — .kg-card-Wrapper in app.test.html einbauen | Kein Failure in Slice 0; Risiko dokumentiert |

---

## 6. Sechs-Monats-Regret

| Risiko | Regret | Warum später teuer | Gegenmaßnahme in Slice 0 |
|---|---|---|---|
| Zu viel Logik in Slice 0 | „Warum ist die Berechnung schon hier? Ich kann Slice 1 nicht sauber testen." | Slice 0 und Slice 1 werden untrennbar; Regressions-Ursache schwer isolierbar | Slice 0 enthält ausschließlich: Container-Erkennung, Slug-Prüfung, State-Setzung, Platzhalter-Text |
| Unklare Bootstrapper-Struktur | „Ich finde den Einstiegspunkt nicht mehr; bootstrap() ist irgendwo drin vergraben." | Ghost-Integration (Slice 7b) muss Bootstrapper kennen; je unklarer, desto mehr Suchaufwand | IIFE-Wrapper mit einem sichtbaren bootstrap()-Einstiegspunkt; DOMContentLoaded → bootstrap() eindeutig am Ende |
| Zu lockere Slug-Prüfung | „Irgendjemand hat 'prokrastinations-preis-neu' eingetragen und die App hat es kommentarlos geladen." | Slug-Whitelist ist Sicherheitsperimeter der App-Fabrik; Erweiterungen müssen explizit sein | SLUG_WHITELIST als Kompilzeit-Konstante; validateSlug() gibt boolean; kein Partial-Match, keine Regex-Großzügigkeit |
| app.js als unstrukturierter Blob | „Ich muss Slice 3 ergänzen, finde aber nicht wo Validierung endet und Rendering anfängt." | Jede spätere Erweiterung (Slice 1–5) muss in app.js integriert werden; unstrukturierter Code → schleichende Komplexität | Klare Funktionsgrenzen: validateSlug(), setState(), initApp(), bootstrap(); keine Inline-Logik im forEach-Loop |
| CSS ohne klares Naming | „Wo ist der Loading-Skeleton definiert? Hat er einen eigenen Block oder ist das irgendwo inline?" | app.css wird in Slice 6 erheblich erweitert; unbenannte Blöcke erschweren Responsive + A11y-Härtung | Vier klare Blöcke: .fw-app (Basis), [data-fw-state="loading"], [data-fw-state="error"], [data-fw-state="content"] |
| Testseite nur Happy Path | „Ich habe Slice 3 gebaut, aber die XSS-Szenarien nie getestet — ich weiß nicht ob Q-01 wirklich gilt." | Sicherheits-Testfälle werden nachträglich eingebaut, aber gegen fertigen Code — Fehler sind teurer zu finden | app.test.html enthält ab Slice 0 alle 5 Szenarien (A–E) inkl. Fehler- und XSS-Testwert |
| Sicherheitsregeln nicht sichtbar im Code | „Wann haben wir entschieden, dass data-fw-options ignoriert wird? Ich finde den Grund nicht." | Spätere Slice-1-Erweiterung fügt data-fw-options-Parsing hinzu; ohne sichtbaren Guard leicht vergessen | Kommentar-Marker an der Stelle wo data-fw-options bewusst nicht gelesen wird; nicht-offensichtliche Guards sichtbar machen |
| Späterer Core schwer extrahierbar | „Pilot 2 braucht denselben Bootstrapper, aber in app.js ist alles prokrastinations-preis-spezifisch." | Core-Extraktion (nach Pilot 2, RFC §11) kostet weniger wenn Bootstrap-Logik von App-Logik getrennt ist | Strikte Trennung: bootstrap() + validateSlug() als generische Logik; App-spezifisches nur in initApp(); kein hard-coded prokrastinations-preis-Text in bootstrap() |

---

## 7. Umsetzungsvorschlag für Slice 0

### app.js

**Minimalstruktur** (IIFE-Wrapper, kein globaler Namespace, kein window-Property):

```
(function () {

  // SLUG_WHITELIST: Kompilzeit-Konstante, bewusst keine dynamische Quelle in Slice 0
  const SLUG_WHITELIST = ['prokrastinations-preis'];

  validateSlug(slug) → boolean
    Prüft: typeof slug === 'string' && SLUG_WHITELIST.includes(slug.trim())
    Kein Partial-Match, keine Regex

  setState(container, state)
    container.dataset.fwState = state
    Erlaubte Werte: 'loading' | 'content' | 'error'

  async initApp(container, slug)
    1. setState(container, 'loading')
    2. try {
         if validateSlug(slug):
           setState(container, 'content')
           Platzhalter-Element via textContent befüllen
           Text: eindeutig kein echter Wert (z.B. "[Prokrastinations-Preis wird in Slice 1 berechnet]")
         else:
           setState(container, 'error')
           Fehlerelement via textContent: "Diese App konnte nicht geladen werden."
       } catch(e) {
         console.error(e)   ← nie im UI ausgeben
         setState(container, 'error')
         Fehlerelement via textContent: "Diese App konnte nicht geladen werden."
       }
    data-fw-options wird nicht gelesen und nicht ausgegeben (Slice 0)

  bootstrap()
    containers = document.querySelectorAll('.fw-app')
    if containers.length === 0:
      console.warn('[fw-app] Kein .fw-app-Container gefunden.')
      return
    containers.forEach(container => {
      if (container.dataset.fwInitialized === 'true') return   ← Guard
      container.dataset.fwInitialized = 'true'
      slug = (container.dataset.fwApp || '').trim()
      initApp(container, slug)
    })

  document.addEventListener('DOMContentLoaded', bootstrap)

})();
```

**SafeDOM-Regeln:**
- Kein innerHTML für Nutzdaten, Fehlertexte oder Platzhalter
- Ausschließlich textContent oder createElement + appendChild
- data-fw-options wird in Slice 0 nicht gelesen und nicht ausgegeben

**Keine globalen IDs** innerhalb .fw-app; alle DOM-Operationen relativ zum container-Parameter.

---

### app.css

**Namespace:** Alle Selektoren ausschließlich unter .fw-app. Kein globaler Reset (*, html, body).

**Vier Blöcke:**

```
.fw-app
  Basis: position relative, box-sizing border-box, width 100%, min-height 200px
  Typografie: font-family via var(--fw-font-base, sans-serif)
  Text: color via var(--fw-color-text, #1a1a1a)
  Hintergrund: background via var(--fw-color-bg, #ffffff)
  Kein margin auf Container-Ebene (Ghost verantwortet Außenabstände)

.fw-app[data-fw-state="loading"]
  Visuell gedimmt (opacity o.ä.)
  Kein Spinner (Slice 0: sofortiger State-Wechsel)
  Farben via var(--fw-color-loading-*, #fallback)

.fw-app[data-fw-state="error"]
  Dezente Hervorhebung (Rahmen + leicht abweichender Hintergrund)
  Fehlermeldung lesbar, kein Crash-Design
  Farben via var(--fw-color-error-*, #fallback)
  Innenabstand via var(--fw-space-md, 1rem)

.fw-app[data-fw-state="content"]
  Basis-Sichtbarkeit (opacity 1)
  Kein weiteres Layout in Slice 0
```

**Keine eigenständigen Hex-Werte** — nur als Fallback in `var(--fw-..., #fallback)`. Niemals `color: #1a1a1a` direkt (A-17).

---

### app.test.html

Dokument-Struktur:
- `<!DOCTYPE html>`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<link rel="stylesheet" href="./app.css">` im `<head>`
- `<script src="./app.js">` am Ende von `<body>`
- Kein Ghost-CSS — Fallbacks müssen eigenständig halten
- Jedes Szenario: sichtbare H2-Beschriftung + Erwartungstext + `.kg-card`-Wrapper (rudimentärer Ghost-Kontext)

| Szenario | Container | Erwartung |
|---|---|---|
| A — Gültige Minimal-Card | `<div class="fw-app" data-fw-app="prokrastinations-preis">` | Content-State; Platzhaltertext sichtbar; kein leerer Container |
| B — Ungültiger Slug | `<div class="fw-app" data-fw-app="ungueltig-slug">` | Error-State; „Diese App konnte nicht geladen werden."; kein Stack-Trace |
| C — Fehlender Slug | `<div class="fw-app">` | Error-State; „Diese App konnte nicht geladen werden."; kein Stack-Trace |
| D — Zwei gültige Container | Zwei identische Cards wie Szenario A | Beide im Content-State; kein doppelter DOM-Node; keine Exception |
| E — XSS in data-fw-options | Card wie A + `data-fw-options="defaultRate:<img src=x onerror=alert(1)>"` | Stabil; kein Alert; kein innerHTML; Content-State normal |

---

## 8. Akzeptanzkriterien

| ID | Kriterium | Quelle |
|---|---|---|
| A0-1 | Alle .fw-app Container werden gefunden und initialisiert (Szenarien A, D) | SLICE_PLAN.md |
| A0-2 | Fehlender oder ungültiger data-fw-app-Wert → Error-State: „Diese App konnte nicht geladen werden." — kein Stack-Trace (Szenarien B, C) | SLICE_PLAN.md |
| A0-3 | Loading-State-Pfad ist implementiert; darf sofort in Content/Error übergehen; kein künstlicher Timeout | SLICE_PLAN.md |
| A0-4 | Kein innerHTML für Nutzdaten, Fehlertexte oder Platzhalter — ausschließlich textContent | SLICE_PLAN.md / Q-01 |
| A0-5 | Keine JavaScript-Exception in Browser-Konsole bei normalem Testlauf aller 5 Szenarien | SLICE_PLAN.md |
| A0-6 | Kein horizontaler Overflow bei 375px, 768px, 1280px (Viewport-Prüfung in DevTools) | SLICE_PLAN.md |
| A0-7 | Doppelte Initialisierung (Szenario D + zwei script-Tags): data-fw-initialized-Guard aktiv; kein doppelter DOM-Node | Kickoff — FC-5 |
| A0-8 | XSS-Testwert in data-fw-options (Szenario E) löst keinen Alert aus; App bleibt stabil | Kickoff — FC-6 |
| A0-9 | CSS-Leak-Check: Ghost-Elemente neben .fw-app bleiben visuell unverändert | Kickoff — FC-9 |

---

## 9. Offene Punkte

Keine Blocker.

Vier Nicht-Blocker aus SPEC_GATE_REPORT.md, die Slice 0 nicht betreffen:

| NB | Thema | Betrifft | Status |
|---|---|---|---|
| NB-1 | CTA href leer — risiko-uebersetzer URL unbekannt | Slice 5 / Release | Offen |
| NB-2 | Config-Form | Slice 1 | Entschieden: internes Config-Objekt (RFC §D5) |
| NB-3 | Theme-Token-Inventar aus screen.css | Slice 6 | Offen |
| NB-4 | Bootstrapper-Strategie + Ghost-Upload-URL | Slice 7b | Offen |

Albert muss nur Slice 0 zur Implementierung freigeben.

---

## 10. Freigabefrage

Albert, gibst Du Slice 0 zur Implementierung frei?
