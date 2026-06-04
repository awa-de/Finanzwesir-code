> [!note] AKTUELLE VERSION — Neue Mechanik (Marktzeit)
>
> Diese Datei ersetzt `SLICE_0_KICKOFF.md` (alte Calculator-Mechanik, 2026-05-11).
> Basis: `APP_SPEC.md` V1.6 + `SLICE_PLAN.md` + RFC.

---

# SLICE_0_KICKOFF — prokrastinations-preis

Stand: 2026-06-04 | Erstellt von: Claude | Grundlage: SLICE_PLAN + APP_SPEC V1.6 + RFC

---

## 1. Status

| Feld | Wert |
|---|---|
| App | prokrastinations-preis |
| Slice | Slice 0 — App-Shell + Slug-Prüfung + URL-Attribut-Lesen + State-Maschine |
| Spec-Gate | OK erteilt 2026-06-04 (mündlich durch Albert) |
| Pre-Code-Gate | OK 2026-06-04 (Full-Gate, 9 Fragen) |
| Freigabe | OK 2026-06-04, getestet ✅ (Szenarien A–G) |

**Hinweis:** Dieses Dokument ist keine Code-Freigabe. Es dokumentiert Annahmen, Risiken und den vereinbarten Implementierungsplan, damit Albert eine informierte Freigabe erteilen kann.

---

## 2. Slice-Ziel

**Was soll Slice 0 beweisen?**
Container wird erkannt, Slug-Prüfung funktioniert, `data-fw-data`-URL wird als Attribut gelesen (aber **nicht gefetcht**), States schalten sauber. Kein sicherheitsrelevantes Verhalten bricht.

**Nutzerwert:**
„Die App startet, zeigt den richtigen State, stürzt nicht ab." — kein leerer Container, kein Stack-Trace, kein XSS.

**Unterschied zur alten Calculator-Mechanik:**
Die alte Slice-0 hatte keine externen Daten. In der neuen Mechanik ist `data-fw-data` ein Pflichtattribut der Ghost-Card. Slice 0 liest dieses Attribut — der echte Fetch via CSVParser kommt in Slice 1. Das hält das App-Shell-Fundament bewusst frei vom Datenladepfad. OA-01 ist entschieden: `app.js` ist ein ES-Modul (`<script type="module">`); der CSVParser-Import folgt erst in Slice 1.

**Architekturprinzip CSVParser (gilt ab Slice 1):**
CSVParser.js übernimmt URL-Validierung, CSV-Parsing, Unit-Detection und Datenbereinigung. Die App zieht sich eine Kopie aus dem versiegelten Vault und vertraut dem Ergebnis. Keine eigene Parserlogik in app.js (APP_SPEC §7.5). Slice 0 berührt CSVParser.js noch nicht.

---

## 3. Erlaubter Änderungsumfang

**Neue Dateien:**

```
Apps/prokrastinations-preis/app.js
Apps/prokrastinations-preis/app.css
Apps/prokrastinations-preis/app.test.html
Apps/prokrastinations-preis/ghost-card.example.html   ← optional
```

Während der Slice-0-Codeimplementierung werden keine bestehenden Dateien geändert und keine Dateien außerhalb `Apps/prokrastinations-preis/` angefasst. Das Abschluss-Ritual darf anschließend Status- und Steuerdateien aktualisieren, sofern keine App-, Engine-, Parser- oder CSV-Wertänderungen erfolgen.

**Ausdrücklich NICHT erlaubt:**

- Keine APP_SPEC-, SECURITY-BASELINE-, APP-INTERFACE-Änderung
- Kein Berühren von CSVParser.js oder FinanzwesirData.js
- Keine Chart-Engine-Berührung
- Kein Framework, kein Build-System, kein Shadow DOM
- Keine Berechnung, kein Slider, kein Chart, kein Screen-Flow
- Keine Änderung an `SLICE_PLAN.md` während der Codeimplementierung; Statusaktualisierung nach Abschluss ist Teil des Abschluss-Rituals.

---

## 4. Annahmenliste

| Nr | Annahme | Quelle | Risiko, falls falsch | Albert-Bestätigung nötig? |
|---|---|---|---|---|
| A-1 | `app.test.html` läuft über VSCode Live Server (localhost), nicht als `file://` | RFC §D6 | `file://` kann spätere `fetch()`-Aufrufe (Slice 1) via CORS blockieren; in Slice 0 noch kein Fetch | Nein — dokumentierter Workflow |
| A-2 | `app.js` und `app.css` werden per relativem Pfad eingebunden (`./app.js`, `./app.css`) | RFC §D7 | Falscher Pfad → App lädt nicht; sofort sichtbar | Nein |
| A-3 | Ghost-CSS ist in `app.test.html` nicht vorhanden; CSS-Fallbacks müssen eigenständig halten | NB-3 | Ohne Fallbacks: Inhalte ohne sichtbare Styles | Nein — NB-3: Theme-Inventar erst vor Slice 7 nötig |
| A-4 | JavaScript ist aktiviert; kein `noscript`-Fallback in Pilot-2 | APP_SPEC §15 | Nutzer ohne JS sieht leeren Container | Nein — bewusste Einschränkung für Pilot |
| A-5 | `data-fw-app` kann fehlen, leer oder ungültig sein — alle Fälle sind Redakteursfehler | APP-INTERFACE §3.1 | Crash auf echter Ghost-Seite wenn nur Happy Path behandelt | Nein — Pflicht laut Spec |
| A-6 | Mehrere `.fw-app` Container auf einer Seite sind normaler Betrieb | APP-INTERFACE §3.1 | Zweite App startet nie ohne Fehlermeldung | Nein — Pflicht laut Spec |
| A-7 | `SLUG_WHITELIST = ['prokrastinations-preis']` als modul-lokale Kompilzeit-Konstante im ES-Modul | SLICE_PLAN §Binding / OA-01 | Dynamische Whitelist: async-Komplexität in Slice 0 unerwünscht | Nein — Slice-0-Entscheidung |
| A-8 | Alle `data-*`-Attribute sind untrusted input — auch intern erstellte Cards | SECURITY-BASELINE §6.2 | XSS-Risiko wenn Ghost-Daten als trusted behandelt | Nein — Pflicht laut SECURITY-BASELINE |
| A-9 | `textContent` ist das einzige erlaubte DOM-Ausgabeverfahren in Slice 0 | Q-01 | `innerHTML` → XSS-Risiko | Nein — Binding Decision Q-01 |
| A-10 | `data-fw-options` wird in Slice 0 vollständig ignoriert | SLICE_PLAN §Slice 0 | Selbst als Zeichenkette ausgegeben: potenzielle Injection | Nein — explizit ausgeschlossen |
| A-11 | `data-fw-data` URL wird in Slice 0 nur als Attribut gelesen — kein Fetch, keine Persistenz, keine CSVParser-Übergabe | SLICE_PLAN §Slice 0 Ziel | Wenn Fetch, Persistenz oder CSVParser-Übergabe dazukommt: Slice-1-Logik wird vorgezogen | Nein — explizit deferred |
| A-12 | Loading-State ist in Slice 0 transitional und synchron; kein Timer, kein Timeout | A0-4 | Künstlicher Timeout: unnötige Komplexität; bricht Slice 1 ggf. | Nein — SLICE_PLAN explizit |
| A-13 | Content-State zeigt in Slice 0 nur statischen Platzhaltertext, der offensichtlich kein echter Wert ist | SLICE_PLAN §Ziel | Wenn Platzhalter wie echte Zahlen aussehen: Slice 1 nicht sauber gegen Slice 0 testbar | Nein |
| A-14 | Error-State (a) zeigt exakt: „Diese App konnte nicht geladen werden." — kein Stack-Trace | APP_SPEC §10 | Stack-Trace im UI: technische Details sichtbar; Sicherheitsrisiko | Nein — Binding Decision |
| A-15 | Initialisierungs-Guard: `data-fw-initialized`-Attribut verhindert doppelte Initialisierung | RFC §D9 | Ghost Code Injection + Theme → zwei script-Tags → doppelte DOM-Nodes | Nein — präventive Pflicht |
| A-16 | Kein Shadow DOM, kein iframe; `querySelectorAll('.fw-app')` findet alle Container | RFC §D3 | Shadow DOM: Container nicht gefunden; App startet nie | Nein — Shadow DOM ausgeschlossen |
| A-17 | `app.js` ist ES-Modul (`<script type="module">`); kein IIFE-Wrapper (OA-01 entschieden 2026-06-04) | OA-01, Chart-Engine-Muster | Falsches Lademodell → Guard oder DOMContentLoaded-Timing kann abweichen | Nein — ENTSCHIEDEN |
| A-18 | `initApp()` ist `async function` — auch wenn Slice 0 intern synchron arbeitet | A-11 | Nachträgliche API-Änderung sync → async bricht alle Aufrufer in Slice 1+ | Nein — Binding Decision A-11 |
| A-19 | Fehlendes `data-fw-data` ist in Slice 0 kein Error-State; Platzhalter-Content wird angezeigt | SLICE_PLAN §Slice 0 | URL-Validierung und Fetch-Fehler sind Slice-1-Verantwortung | Nein — bewusst deferred |
| A-20 | App-CSS definiert einen leeren `.fw-app[data-fw-state="empty"]`-Hook ohne JS-Logik dahinter | SLICE_PLAN §Slice 0 | Empty-State kommt in Slice 1; CSS-Hook jetzt schon anlegen vermeidet späteres Hinzufügen | Nein |

---

## 5. Failure Cases

| FC | Situation | Erwartetes Verhalten | In Slice 0? | Testbar? | AK |
|---|---|---|---|---|---|
| FC-1 | Kein `.fw-app` auf der Seite | `console.warn`, keine Exception, Seite normal | Ja | Nein (DevTools) | A0-6 |
| FC-2 | `.fw-app` ohne `data-fw-app` | Error-State (a): Meldung auf Deutsch | Ja | Ja — Szenario C | A0-3 |
| FC-3 | Ungültiger Slug (nicht in Whitelist) | Error-State (a): Meldung auf Deutsch | Ja | Ja — Szenario B | A0-2 |
| FC-4 | Mehrere Container auf einer Seite | Alle initialisiert; keine Exception; kein doppelter Node | Ja | Ja — Szenario D | A0-9 |
| FC-5 | Doppelte Initialisierung (zwei script-Tags) | Guard: zweiter Aufruf überspringt bereits initialisierte Container | Ja | Eingeschränkt | A0-9 |
| FC-6 | `data-fw-options` mit XSS-Testwert | Attribut wird ignoriert; kein Alert; kein `innerHTML`; App stabil | Ja — ignorieren | Ja — Szenario E | A0-5, A0-8 |
| FC-7 | Unerwartete JS-Exception in `initApp()` | `try/catch`: Error-State + `textContent`-Fehlermeldung; Stack-Trace nur `console.error`, nie im UI | Ja | Eingeschränkt | A0-2, A0-6 |
| FC-8 | Versehentliche `innerHTML`-Nutzung | Durch Q-01 verboten; Verifikation per Code-Review nach Implementierung | Präventiv | Nein — Blackbox-Test reicht nicht | A0-5 |
| FC-9 | CSS leakt aus `.fw-app` heraus | Kein Selektor außerhalb `.fw-app`; Ghost-Elemente neben App unverändert | Ja — CSS-Namespace | Ja — Szenario G | A0-10 |
| FC-10 | Fehlendes `data-fw-data` | Content-State mit Platzhalter (kein Error in Slice 0) | Ja | Ja — Szenario F | A0-1 |

---

## 6. Sechs-Monats-Regret

| Risiko | Warum später teuer | Gegenmaßnahme in Slice 0 |
|---|---|---|
| CSV-Fetch in Slice 0 eingebaut | Fetch-Logik gehört in Slice 1 zusammen mit CSVParser-Import; Slice 0 bleibt bewusst ohne Datenladepfad | Slice 0 enthält explizit keinen Fetch |
| IIFE vs. Modul in Slice 0 entschieden | Falsche Entscheidung zieht sich durch alle Slices | OA-01 entschieden: ES-Modul (`<script type="module">`), kein IIFE — 2026-06-04 |
| Zu viel Logik in Slice 0 | Slice 1 nicht sauber gegen Slice 0 testbar; CSV-Parsing und State-Maschine vermischt | Slice 0: ausschließlich Container-Erkennung, Slug-Prüfung, State-Setzung, Platzhalter |
| Unklare Bootstrapper-Struktur | Ghost-Integration (Slice 8b) muss Bootstrapper kennen | Modul-lokale `bootstrap()`-Funktion; `DOMContentLoaded → bootstrap()` eindeutig; keine globale Window-API |
| Zu lockere Slug-Prüfung | Slug-Whitelist ist Sicherheitsperimeter der App-Fabrik | `SLUG_WHITELIST` als Kompilzeit-Konstante; exakter Match; kein Partial-Match |
| `app.js` als unstrukturierter Blob | Jeder spätere Slice muss in `app.js` integriert werden; unklare Grenzen → schleichende Komplexität | Klare Funktionsgrenzen: `validateSlug()`, `setState()`, `renderContent()`, `renderError()`, `initApp()`, `bootstrap()` |
| CSS ohne klares Naming | Slice 7 (Responsive + A11y) muss in `app.css` erweitern; unbenannte Blöcke erschweren das | Vier benannte Blöcke: Basis, loading, error, content; empty-Hook schon angelegt |
| Testseite nur Happy Path | Security-Testfälle werden nachträglich eingebaut — teurer im fertigen Code zu finden | `app.test.html` enthält ab Slice 0 alle Szenarien A–G inkl. XSS-Testwert |
| Platzhalter wie echte Werte | Slice 1 nicht klar abgrenzbar | Platzhalter ist offensichtlich kein echter Wert (`[Marktzeit-Simulation — Daten folgen in Slice 1]`) |

---

## 7. Umsetzungsvorschlag

### app.js

ES-Modul — kein IIFE-Wrapper (OA-01 entschieden, Chart-Engine-Muster).
Slice 0 hat noch keine `import`-Zeile; der CSVParser-Import kommt in Slice 1.

```js
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 0: kein CSVParser-Import (kein Fetch in diesem Slice)

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle in Slice 0
const SLUG_WHITELIST = ['prokrastinations-preis'];

function validateSlug(slug) {
  // Exakter Match — kein Partial-Match, keine Regex-Großzügigkeit
  return typeof slug === 'string' && SLUG_WHITELIST.includes(slug.trim());
}

function setState(container, state) {
  container.dataset.fwState = state;
  // Erlaubte Werte: 'loading' | 'content' | 'error' | 'empty'
}

function renderContent(container) {
  // Slice 0: statischer Platzhalter — eindeutig kein echter Wert
  const p = document.createElement('p');
  p.textContent = '[Marktzeit-Simulation — Daten folgen in Slice 1]';
  container.appendChild(p);
}

function renderError(container, message) {
  const p = document.createElement('p');
  p.textContent = message; // SafeDOM: textContent, niemals innerHTML (Q-01)
  container.appendChild(p);
}

async function initApp(container, slug) {
  try {
    setState(container, 'loading');

    if (!validateSlug(slug)) {
      setState(container, 'error');
      renderError(container, 'Diese App konnte nicht geladen werden.');
      return;
    }

    // data-fw-data: URL-Attribut lesen und für Slice 1 bereitstellen
    // Kein Fetch in Slice 0 — wird in Slice 1 an CSVParser.parse(dataUrl) übergeben
    const dataUrl = (container.dataset.fwData || '').trim(); // eslint-disable-line no-unused-vars

    // data-fw-options: wird in Slice 0 bewusst NICHT verarbeitet (→ Slice 3)
    // Attribut kann vorhanden sein — es wird ignoriert, nichts ausgegeben.

    setState(container, 'content');
    renderContent(container);

  } catch (e) {
    // Stack-Trace nur in Konsole — niemals im UI ausgeben
    console.error('[fw-app] initApp error:', e);
    setState(container, 'error');
    renderError(container, 'Diese App konnte nicht geladen werden.');
  }
}

function bootstrap() {
  const containers = document.querySelectorAll('.fw-app');
  if (containers.length === 0) {
    console.warn('[fw-app] Kein .fw-app-Container gefunden.');
    return;
  }
  containers.forEach(container => {
    // Guard: verhindert doppelte Initialisierung (z.B. Ghost Code Injection + Theme)
    if (container.dataset.fwInitialized === 'true') return;
    container.dataset.fwInitialized = 'true';

    const slug = (container.dataset.fwApp || '').trim();
    initApp(container, slug);
  });
}

// ES-Modul: defer by default — DOMContentLoaded ist dennoch sicherer gegen Race Conditions
document.addEventListener('DOMContentLoaded', bootstrap);
```

**SafeDOM-Regeln:**
- Kein `innerHTML` für Nutzdaten, Fehlertexte oder Platzhalter
- Ausschließlich `textContent` oder `createElement` + `appendChild`
- `data-fw-options` wird nicht gelesen, nicht ausgegeben

**Keine globalen IDs** im App-Container; alle DOM-Operationen relativ zum `container`-Parameter.

---

### app.css

Namespace: Alle Selektoren ausschließlich unter `.fw-app`. Kein globaler Reset (`*`, `html`, `body`).

```css
/* === Basis === */
.fw-app {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 200px;
  font-family: var(--fw-font-base, sans-serif);
  color: var(--fw-color-text, #1a1a1a);
  background: var(--fw-color-bg, #ffffff);
}

/* === Loading === */
.fw-app[data-fw-state="loading"] {
  opacity: 0.6;
  /* Kein Spinner in Slice 0 — State-Wechsel ist synchron */
}

/* === Error === */
.fw-app[data-fw-state="error"] {
  border: 1px solid var(--fw-color-error-border, #c62828);
  background: var(--fw-color-error-bg, #fff8f8);
  padding: var(--fw-space-md, 1rem);
  color: var(--fw-color-error-text, #b71c1c);
}

/* === Empty (CSS-Hook für Slice 1 — noch keine JS-Logik dahinter) === */
.fw-app[data-fw-state="empty"] {
  padding: var(--fw-space-md, 1rem);
  color: var(--fw-color-muted, #555555);
}

/* === Content === */
.fw-app[data-fw-state="content"] {
  opacity: 1;
  padding: var(--fw-space-md, 1rem);
}
```

**Keine eigenständigen Hex-Werte** — nur als Fallback in `var(--fw-..., #fallback)`.
Niemals `color: #1a1a1a` direkt (A-17).

---

### app.test.html — Szenarien

Dokumentstruktur:
- `<!DOCTYPE html>`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<link rel="stylesheet" href="./app.css">` im `<head>`
- `<script type="module" src="./app.js">` am Ende von `<body>` (OA-01: ES-Modul)
- Kein Ghost-CSS — Fallbacks müssen eigenständig halten
- Jedes Szenario: sichtbare `<h2>`-Beschriftung + Erwartungstext + `.kg-card`-Wrapper (rudimentärer Ghost-Kontext)

| Szenario | Container | Erwartung |
|---|---|---|
| **A — Minimal-Card mit Daten-URL** | `<div class="fw-app" data-fw-app="prokrastinations-preis" data-fw-data="../../Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv">` | Content-State; Platzhaltertext sichtbar; kein leerer Container |
| **B — Ungültiger Slug** | `<div class="fw-app" data-fw-app="ungueltig-slug">` | Error-State; „Diese App konnte nicht geladen werden."; kein Stack-Trace |
| **C — Fehlender Slug** | `<div class="fw-app">` | Error-State; Meldung auf Deutsch; kein Stack-Trace |
| **D — Zwei gültige Container** | Zwei identische Cards wie Szenario A | Beide im Content-State; kein doppelter Node; keine Exception |
| **E — XSS in data-fw-options** | Card wie A + `data-fw-options="defaultRate:<img src=x onerror=alert(1)>"` | Stabil; kein Alert; kein `innerHTML`; Content-State normal |
| **F — Fehlendes data-fw-data** | `<div class="fw-app" data-fw-app="prokrastinations-preis">` (ohne data-fw-data) | Content-State mit Platzhalter (kein Error in Slice 0) |
| **G — CSS-Leak-Check** | `.fw-app` neben normalem Artikeltext und Überschriften | Artikeltext und Überschriften visuell unverändert |

**Hinweis Szenario A:** Der relative Pfad `../../Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv` wird in Slice 0 nicht gefetcht. `data-fw-data` wird in Slice 0 nur gelesen. AppState/Persistenz und Übergabe an CSVParser folgen in Slice 1.

---

## 8. Akzeptanzkriterien

| ID | Kriterium | Quelle |
|---|---|---|
| A0-1 | Alle `.fw-app` Container werden gefunden und initialisiert (Szenarien A, D) | SLICE_PLAN |
| A0-2 | Fehlender oder ungültiger `data-fw-app`-Wert → Error-State (a): „Diese App konnte nicht geladen werden." — kein Stack-Trace (Szenarien B, C) | APP_SPEC §10 |
| A0-3 | Loading-State implementiert; darf sofort in Content/Error übergehen; kein künstlicher Timeout | SLICE_PLAN |
| A0-4 | Kein `innerHTML` für Nutzdaten, Fehlertexte oder Platzhalter — ausschließlich `textContent` | Q-01 |
| A0-5 | Keine JS-Exception in Browser-Konsole bei normalem Testlauf aller Szenarien A–G | SLICE_PLAN |
| A0-6 | Kein horizontaler Overflow bei 375px, 768px, 1280px | SLICE_PLAN |
| A0-7 | Guard aktiv: kein doppelter DOM-Node bei zwei script-Tags oder Szenario D | A-15 |
| A0-8 | XSS-Testwert in `data-fw-options` (Szenario E): kein Alert, App stabil | Q-01, Q-02 |
| A0-9 | CSS-Leak (Szenario G): Ghost-Elemente neben `.fw-app` visuell unverändert | RFC §D3 |
| A0-10 | `data-fw-data`-URL ist im Content-State als Attribut gespeichert — kein Fetch | SLICE_PLAN §Slice 0 Ziel |

---

## 9. Offene Punkte

| Nr | Thema | Betrifft | Status |
|---|---|---|---|
| OA-01 | ES-Modul für app.js — folgt Chart-Engine-Muster | Slice 1 | **ENTSCHIEDEN 2026-06-04** — `<script type="module">`, kein IIFE |
| OA-02 | SparplanChart: Bibliothek und Integrationsform | Slice 4 | Offen |
| NB-3 | Theme-Token-Inventar aus `screen.css` | Slice 7 | Offen — Fallback-Tokens erlaubt |
| NB-4 | Bootstrapper + Ghost-Upload-URL | Slice 8b | Offen |

Keine dieser offenen Punkte blockiert Slice 0.

---

## 10. Freigabefrage

Albert, gibst du Slice 0 zur Implementierung frei?

(Implementierung bedeutet: Pre-Code-Gate Full läuft → bei OK werden `app.js`, `app.css`, `app.test.html` neu angelegt.)
