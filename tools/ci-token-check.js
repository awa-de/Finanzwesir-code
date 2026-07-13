/**
 * tools/ci-token-check.js
 * CI-Token-Auflösungs- und Drift-Check für Farben UND Fonts (Browser-DevTools-Konsole).
 *
 * ZWECK
 *   Drei Prüfungen, read-only, kein Repo-Effekt:
 *     - fwCiAudit():    PRIMÄRES Werkzeug für den laufenden Betrieb. Ermittelt die erlaubte
 *                       Farb-/Font-Menge LIVE aus `tokens.css` (`:root`, `--color-*`/`--font-*` —
 *                       keine Handpflege, keine Selektor-Liste) und prüft jeden tatsächlich
 *                       benutzten, eindeutigen Farb-/Font-Wert innerhalb aller `.kg-card`-Bereiche
 *                       der geöffneten Seite gegen diese Menge: erlaubt — ja/nein. Kein Urteil über
 *                       Design, Layout, Fett/Kursiv, Größe oder ob eine Farbe „passt". Nur
 *                       Mengen-Zugehörigkeit. Zusätzlich: liest über die Chart.js-Registry
 *                       (`Chart.getChart`) die echten Serien-/Tooltip-/Plugin-Farben aus jedem
 *                       `<canvas>` innerhalb der `.kg-card`-Bereiche — das sind die Werte, aus
 *                       denen tatsächlich gemalt wird, kein Pixel-Raten. GRENZE: nicht statisch
 *                       auswertbare Werte (scriptable functions, Gradients) werden übersprungen.
 *     - fwTokenCheck(): Historischer Drift-Check einzelner Farbrollen Alt→Neu (ΔE76-Distanz),
 *                       für die AP-17-Migration/Rubikon-Nachmessung, nicht für den Alltag gedacht.
 *     - fwFontCheck():  Font-Tokens + Font-Realität ausgewählter Flächen (Standardliste ist auf die
 *                       App `prokrastinations-preis` zugeschnitten, eigene Selektoren möglich);
 *                       prüft zusätzlich via `document.fonts.check`, ob die Schrift real geladen ist.
 *     - fwKpiCardCheck(): NEU (AP-tailwind-02_slice-2). Eigenständiges viertes Werkzeug, bewusst
 *                       NICHT Teil von fwCiAudit() (dessen Scope ist laut Kopfkommentar Farbe+Font
 *                       und bleibt unangetastet). Prüft die KPI-Karten-Struktur aus
 *                       TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.3, sobald sie im DOM stehen
 *                       (Screen 3 erreicht): Surface-Hintergrund (Farbwert via denselben
 *                       resolve()/toHex()-Helfern wie fwCiAudit — kein zweiter Farbmechanismus),
 *                       kein Rahmen, kein Schatten, sichtbar gerundet, Label gedämpft/Wert
 *                       fett-dunkel (relativ zueinander, keine Pixelwerte), sowie das
 *                       Endwissens-Verbot: keine `[data-kpi]`-Karte, solange Screen 2 sichtbar ist.
 *                       Kein KPI-Fund (Screen 3 noch nicht erreicht) ist kein Fehler, nur Hinweis —
 *                       Viewport-Umbruch (S/M/L) bleibt bewusst Alberts Sichtprüfung.
 *     - fwSliderFieldCheck(): NEU (AP-tailwind-02_slice-3). Eigenständiges fünftes Werkzeug, gleiches
 *                       Prinzip wie fwKpiCardCheck(). Prüft das Slider-Field aus
 *                       TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.6 an jedem
 *                       `input[type="range"]` innerhalb einer `.fw-app`: vollständiger ARIA-Vertrag
 *                       (role/aria-valuemin/-max/-now/-text, APP_SPEC §14.3), Akzentfarbe = CI-Primary
 *                       (accent-color, derselbe Mechanismus wie bei fwCiAudit/NO_TEXT_INPUT_TYPES),
 *                       Label umschließt den Slider (Q-06-Mehrfachinstanz-Muster: kein for/id),
 *                       Labeltext gedämpft, Wertanzeige aria-hidden/dunkel/fett/rechtsbündig, sowie
 *                       Flächenlosigkeit des Feld-Containers (§6.6 Surface-Regel: „reines
 *                       Abstands-Primitive, keine Fläche"). Fokus-Ring bleibt wie bei
 *                       fwKpiCardCheck's Reduced-Motion-Emulation Alberts Sichtprüfung
 *                       (:focus-visible lässt sich nicht scripten).
 *     - fwButtonCtaCheck(): NEU (AP-tailwind-02_slice-4). Eigenständiges sechstes Werkzeug. Prüft
 *                       jeden Navigations-Button (`button[type="button"]` ohne `aria-expanded` —
 *                       das unterscheidet sie deterministisch vom Disclosure-Trigger) und den
 *                       Primary-CTA (`<a>`) aus §6.4/§7: Klassifikation der Button-Familie
 *                       next/prev/journey anhand der literalen FW_BUTTON_*_CLASS-Tokens, dann
 *                       Verifikation der tatsächlich gerenderten Farbe/Rundung/Fettung gegen die
 *                       CI-Rolle (Token-Präsenz allein beweist nichts, wenn Play-CDN die Utility
 *                       nicht generiert — bekannter Anlass AP-tailwind-02d). Genau ein Primary-CTA
 *                       pro App wird als Vertragserwartung geprüft (D-06).
 *     - fwStationPanelCheck(): NEU (AP-tailwind-02_slice-5). Eigenständiges siebtes Werkzeug. Prüft
 *                       das flächenlose Stationen-Panel (§5.1-5.3/§6.2/§7): `<section>`-Semantik,
 *                       Flächen-/Rahmen-/Schattenlosigkeit, `flex flex-col`, Quellenzeile/Headline/
 *                       Anker-Farbrollen sowie Fortschritts-/Bridge-Zeile (Screen 2/3) — beide ohne
 *                       eigenen Klassenmarker seit Slice 5, deshalb über den Textmuster-Vertrag
 *                       „Station X von Y" (formatStationProgress()) identifiziert, nicht über CSS.
 *     - fwDisclosureCalloutCheck(): NEU (AP-tailwind-02_slice-6 + AP-tailwind-02f). Eigenständiges
 *                       achtes Werkzeug. Prüft Disclosure-Trigger (Label-/Indikator-Span-Struktur,
 *                       `aria-expanded`/`aria-controls`-Gültigkeit, Indikator-Rotation, Content-
 *                       `hidden`-Kopplung, responsiver Q-08-Kontrakt `sm:inline-flex sm:w-auto
 *                       sm:justify-start`), die Zwischenwerte-`dl` (Grid, `sm:w-fit`-Kontrakt,
 *                       dt/dd-Farbrollen — unterschieden von der KPI-`dl` über das `grid-cols-2`-
 *                       Token), den Callout/die Annahmen-Box (nur linke Akzentkante, sonst
 *                       flächenlos) sowie die ARIA-Live-Region auf echte `sr-only`-Verborgenheit
 *                       (computed position/width/height/overflow, nicht nur Klassenname).
 *     - fwChartSlotCheck(): NEU (AP-tailwind-02_slice-7). Eigenständiges neuntes Werkzeug. Prüft
 *                       den D-04-Ein-Container-Vertrag an jedem `[data-fw-appchart]`-Slot:
 *                       Positionierungskontext (`relative`), Abstand (`mt-6`), und zwingend NIE
 *                       Fläche/Rahmen/Schatten/Radius/Padding — der einzige sichtbare Container
 *                       bleibt der engine-eigene `fw-chart-wrapper` (§6.11, hier nicht geprüft,
 *                       das ist der spätere Engine-DOM-Chrome-AP).
 *     - fwScreenFlowCheck(): NEU (AP-tailwind-02_slice-8). Eigenständiges zehntes Werkzeug. Prüft
 *                       Screen-Rahmen (`position: relative`), Screen-Headline (`text-xl font-bold`,
 *                       Textfarbe, `tabIndex=-1`) und Screen-Navigation (`flex flex-wrap gap-3
 *                       mt-6`). Testet zusätzlich PROGRAMMATISCH per echtem `.focus()`-Aufruf, ob
 *                       die Headline beim JS-gesteuerten Fokus tatsächlich keinen Standard-Outline
 *                       zeigt — das ist etwas, das Albert am Bildschirm nicht zuverlässig sehen
 *                       kann, hier aber real testbar ist (anders als `:focus-visible`, das echte
 *                       Nutzerinteraktion braucht).
 *
 * WANN WELCHES TOOL
 *   - Alltägliche Frage „ist das hier CI-konform" auf einer beliebigen Testseite → fwCiAudit().
 *   - Migrations-/Drift-Messung mit bekanntem Alt/Neu-Sollwert → fwTokenCheck()/fwFontCheck().
 *   - KPI-Karten-Struktur (Screen 3, prokrastinations-preis) → fwKpiCardCheck().
 *   - Slider-Field-Struktur (Screen 1, prokrastinations-preis) → fwSliderFieldCheck().
 *   - Buttons/CTA (alle Screens, prokrastinations-preis) → fwButtonCtaCheck().
 *   - Stationen-Panel (Screen 2/3, prokrastinations-preis) → fwStationPanelCheck().
 *   - Disclosure/Callout/Live-Region (Screen 2/3, prokrastinations-preis) → fwDisclosureCalloutCheck().
 *   - Chart-Slot (Screen 2/3/4, prokrastinations-preis) → fwChartSlotCheck().
 *   - Screen-Rahmen/Headline/Navigation (alle Screens, prokrastinations-preis) → fwScreenFlowCheck().
 *
 * NUTZUNG
 *   1. Ziel-Testseite im VSCode-Live-Server öffnen (App- oder Engine-Testseite, egal).
 *   2. DevTools → Console → Inhalt dieser Datei einfügen (oder als Snippet speichern).
 *   3. Auto-Lauf beim Einfügen führt alle zehn Checks aus. Ergebnisse kopieren und zur Bewertung
 *      einfügen. Einzeln / eigene Listen weiterhin möglich:
 *        fwCiAudit();                                    // Ist/Soll-Set-Audit dieser Seite
 *        fwTokenCheck([{ rolle, token, alt, neu }, …]);  // eigene Farbliste (Drift-Check)
 *        fwFontCheck([{ rolle, token, family }, …], [{ flaeche, sel }, …]);  // eigene Listen
 *        fwKpiCardCheck();                               // KPI-Karten auf Screen 3 (falls sichtbar)
 *        fwSliderFieldCheck();                           // Slider auf Screen 1 (falls sichtbar)
 *        fwButtonCtaCheck();                             // Buttons/CTA (falls im DOM)
 *        fwStationPanelCheck();                          // Stationen-Panel (falls im DOM)
 *        fwDisclosureCalloutCheck();                     // Disclosure/Callout/Live-Region
 *        fwChartSlotCheck();                             // Chart-Slots (falls im DOM)
 *        fwScreenFlowCheck();                            // Screen-Rahmen/Headline/Navigation
 *
 * LESART ΔE76 (nur fwTokenCheck)
 *   <1 unsichtbar · 1–2.3 nur im direkten Vergleich · 2.3–10 bei genauem Hinsehen · >10 klar.
 *   Match ✅ (aufgelöst == Soll) ist der harte Beweis; ΔE76 ist die ehrliche Größenordnung, kein UI-Urteil.
 *
 * LESART FONTS (fwFontCheck)
 *   Match ✅ = Token/Element trägt die Soll-Familie. "Geladen ✅" (document.fonts.check) = Schrift real
 *   verfügbar; bei "Geladen ❌" stimmt zwar der font-family-String, die Seite rendert aber den
 *   sans-serif-Fallback (fehlende @font-face/Schriftdatei — T1/Ghost-Anbindung).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ERWEITERUNG — für künftige LLMs/Sessions (dieses Skript wächst mit den Apps)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * PHILOSOPHIE (nicht aufweichen, auch nicht "aus Versehen"):
 *   fwCiAudit() ist bewusst PRIMITIV: reine Mengen-Zugehörigkeit (benutzter Wert ∈ erlaubte
 *   Menge?), niemals ein Design-/Layout-/Bold-Kursiv-Urteil. Die erlaubte Menge kommt IMMER
 *   live aus tokens.css (discoverRootCustomProps), nie aus einer von Hand gepflegten Liste —
 *   das ist der ganze Punkt (Albert kann Hex-Werte nicht auseinanderhalten, das Tool muss es
 *   wissen, nicht er). Scope ist bewusst eng: NUR Farbe + Font. Kein allgemeiner
 *   Design-Token-Linter (Spacing/Radius/Shadow) — nicht erweitern, außer Albert bittet explizit
 *   darum.
 *
 * DIE 3 KONKRETEN ERWEITERUNGSPUNKTE:
 *
 *   1. Neues Chart-Engine-Plugin mit eigener Farboption (z. B. unter
 *      Theme/assets/js/fw-chart-engine/plugins/) → in auditCanvasCharts() einen weiteren Block
 *      nach dem Vorbild von `fwVerticalLine`/`chartText.annotations` ergänzen: den Options-Pfad
 *      des Plugins finden (`chart.options.plugins.<pluginName>` oder eigener Options-Namespace),
 *      Farbfeld(er) via collectColorValues() einsammeln, per record('Canvas', <Label>, hex, ...)
 *      eintragen. NICHT die Puls-Plugin-Sonderlösung kopieren (die läuft bewusst indirekt über
 *      dataset.pointBorderColor, weil ihre echte Farbe nur in internem Plugin-State steckt).
 *
 *   2. Neuer natives Formularelement-Typ ohne sichtbaren Text (nach Vorbild
 *      range/checkbox/radio, z. B. `<input type="color">` oder `<progress>`) → in
 *      NO_TEXT_INPUT_TYPES (fwCiAudit) ergänzen UND prüfen, ob eine andere CSS-Eigenschaft die
 *      tatsächlich sichtbare Farbe trägt (bei Range/Checkbox/Radio ist das accent-color) — sonst
 *      bleibt der Fund einfach unsichtbar-still, nicht einfach nur ausblenden ohne Ersatzprüfung.
 *
 *   3. Neues Chart.js-Plugin-Config-Muster, das wie Tooltip bei `enabled:false` tote
 *      Default-Farben in der Options-Struktur zurücklässt → denselben Guard-Stil wie
 *      `tt.enabled !== false` übernehmen (erst prüfen, ob der Plugin-Zweig überhaupt aktiv ist,
 *      bevor seine Farben gewertet werden).
 *
 * VOR JEDER ERWEITERUNG — Pflicht-Reihenfolge:
 *   a) fwCiAudit() auf der betroffenen Seite laufen lassen, jeden ❌-Fund einzeln klären:
 *      ECHTER CI-Verstoß (App/CSS fixen) oder BLINDER FLECK DES TOOLS (Quellcode der
 *      Komponente/des Plugins lesen, dann das Tool gezielt erweitern — wie in dieser Session bei
 *      Tooltip-enabled, .kg-card-Selbstausschluss und Slider-accent-color praktiziert)?
 *   b) Niemals einen Fund stillschweigend aus der Prüfung herausfiltern, nur damit die Tabelle
 *      grün wird — jede neue Ausnahme braucht einen Kommentar mit Begründung UND Datei:Zeile-Beleg
 *      aus dem echten Quellcode, keine Vermutung.
 *   c) Bestehende Funktionen (fwTokenCheck/fwFontCheck) bleiben unangetastet, außer Albert bittet
 *      explizit um deren Änderung — sie haben eine andere, historische Aufgabe (Drift-Messung).
 *
 * Provenienz: AP-prokrast-17 (Farben, Pilot-Migration) + AP-prokrast-17-FONT-CODE-B (Fonts) +
 *   TESTENV-1f-Nachtrag (fwCiAudit, primitives Ist/Soll-Set-Audit auf Alberts Wunsch).
 */
(function (global) {
  const hexToRgb = h => {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const parseRgb = s => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const toHex = a => '#' + a.map(x => Math.round(x).toString(16).padStart(2, '0')).join('');

  // Aufgelösten Wert im echten Cascade-Kontext ermitteln (ohne Fallback → testet das TOKEN, nicht die Fallback-Hexe).
  const resolve = tok => {
    const p = document.createElement('span');
    p.style.color = `var(${tok})`;
    p.style.display = 'none';
    document.body.appendChild(p);
    const c = parseRgb(getComputedStyle(p).color);
    p.remove();
    return c;
  };

  // Aufgelöste Schrift im echten Cascade-Kontext ermitteln (liest fontFamily statt color → testet Font-Tokens).
  const resolveFont = tok => {
    const p = document.createElement('span');
    p.style.fontFamily = `var(${tok})`;
    p.style.display = 'none';
    document.body.appendChild(p);
    const fam = getComputedStyle(p).fontFamily;
    p.remove();
    return fam;
  };

  // sRGB → Lab → ΔE76
  const lin = c => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const lab = ([r, g, b]) => {
    r = lin(r); g = lin(g); b = lin(b);
    let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    let y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
    let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    x = f(x); y = f(y); z = f(z);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };
  const dE = (h1, h2) => {
    const a = lab(hexToRgb(h1)), b = lab(hexToRgb(h2));
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  };
  const rootHas = t => getComputedStyle(document.documentElement).getPropertyValue(t).trim() !== '';

  // Standard-Tokenliste = CI-Farbrollen der Pilot-Migration (AP-17). Für andere Läufe eigene Liste übergeben.
  const DEFAULT_CHECKS = [
    { rolle: 'Fließtext',   token: '--color-text',       alt: '#1a1a1a', neu: '#272727' },
    { rolle: 'Gedämpft',    token: '--color-text-muted', alt: '#555555', neu: '#666666' },
    { rolle: 'Surface',     token: '--color-surface',    alt: '#f5f5f5', neu: '#fafafa' },
    { rolle: 'Primary',     token: '--color-primary',    alt: '#0071bf', neu: '#218380' },
    { rolle: 'Hintergrund', token: '--color-bg',         alt: '#ffffff', neu: '#ffffff' },
  ];

  // Font-Rollen der CI (tokens.css §Fonts). Für andere Läufe eigene Liste übergeben.
  const DEFAULT_FONT_TOKENS = [
    { rolle: 'Body',    token: '--font-body',    family: 'Source Sans Pro' },
    { rolle: 'Display', token: '--font-display', family: 'Archivo Black' },
  ];

  // Reale HTML-UI-Flächen des Piloten. `—` in der Ausgabe = Element aktuell nicht im DOM (zustandsabhängig).
  // CHANGED — AP-tailwind-02-Faden-Nachpruefung: um Slice 4-8-Flaechen ergaenzt (Button, CTA,
  // Disclosure-Trigger, Callout), da diese vorher nicht in fwFontCheck() erfasst waren.
  const DEFAULT_FONT_TARGETS = [
    { flaeche: 'Fließtext (.fw-app)', sel: '.fw-app' },
    { flaeche: 'Screen-Headline',     sel: '.fw-app [data-fw-screen] h2' },
    { flaeche: 'Station-Headline',    sel: '.fw-app__station-area h3' },
    { flaeche: 'A11y-Tabelle',        sel: '.fw-app table, .fw-chart-wrapper table' },
    { flaeche: 'App-Meldung',         sel: '.fw-app p[role="alert"], .fw-app p[role="status"]' },
    { flaeche: 'Navigations-Button',  sel: '.fw-app button[type="button"]:not([aria-expanded])' },
    { flaeche: 'Primary-CTA',         sel: '.fw-app a' },
    { flaeche: 'Disclosure-Trigger',  sel: '.fw-app button[aria-expanded]' },
    { flaeche: 'Callout (Annahmen)',  sel: '.fw-app__assumptions' },
  ];

  function fwTokenCheck(checks = DEFAULT_CHECKS) {
    console.log('%cCI-Token-Auflösungs- & Drift-Check', 'font-weight:bold;font-size:14px');
    console.log('tokens.css geladen (Stichprobe --color-primary in :root):',
      rootHas('--color-primary') ? '✅ ja' : '❌ NEIN — Fallbacks aktiv!');

    const rows = checks.map(c => {
      const got = toHex(resolve(c.token));
      const row = {
        Rolle: c.rolle, Token: c.token,
        'Aufgelöst': got, 'Soll (neu)': c.neu, 'Alt (Pilot)': c.alt,
        Match: got.toLowerCase() === c.neu.toLowerCase() ? '✅' : '❌',
      };
      // ΔE76 nur für Farbwerte (Hex); Nicht-Farb-Tokens (z. B. Fonts) haben kein alt/neu-Hex.
      if (/^#[0-9a-f]{3,6}$/i.test(c.alt || '') && /^#[0-9a-f]{3,6}$/i.test(c.neu || '')) {
        row['ΔE76 alt→neu'] = dE(c.alt, c.neu).toFixed(2);
      }
      return row;
    });
    console.table(rows);
    console.log('%cLesart ΔE76:', 'font-weight:bold',
      '<1 unsichtbar · 1–2.3 nur im direkten Vergleich · 2.3–10 bei genauem Hinsehen · >10 klar.');

    const fails = rows.filter(r => r.Match === '❌');
    console.log(fails.length === 0
      ? '%c✅ Alle Tokens lösen auf den Soll-Wert auf.'
      : `%c❌ ${fails.length} Token(s) weichen ab: ${fails.map(r => r.Token).join(', ')}`,
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    return rows;
  }

  function fwFontCheck(tokens = DEFAULT_FONT_TOKENS, targets = DEFAULT_FONT_TARGETS) {
    console.log('%cCI-Font-Auflösungs- & Rendering-Check', 'font-weight:bold;font-size:14px');

    // 1) Font-Tokens: in :root definiert? · aufgelöst · Match gegen Soll-Familie · real geladen?
    const tokenRows = tokens.map(t => {
      const got = resolveFont(t.token);
      const defined = rootHas(t.token);
      // CHANGED — Match nur ✅, wenn der Token wirklich in :root definiert ist UND die Soll-Familie trägt.
      // Sonst zählte ein zufällig geerbter seiteneigener Font (Token undefiniert) als Treffer (Fehlalarm).
      const match = defined && got.toLowerCase().includes((t.family || '').toLowerCase());
      let loaded = '—';
      try { loaded = (document.fonts && document.fonts.check(`16px '${t.family}'`)) ? '✅' : '❌'; }
      catch (e) { loaded = '?'; }
      return {
        Rolle: t.rolle, Token: t.token,
        'In :root': defined ? '✅' : '❌',
        'Aufgelöst': got,
        'Soll-Familie': t.family,
        Match: match ? '✅' : '❌',
        Geladen: loaded,
      };
    });
    console.table(tokenRows);

    // 2) Computed font-family der realen HTML-UI-Flächen (Body-Match = trägt die Soll-Body-Familie).
    const bodyFamily = (tokens.find(t => t.token === '--font-body') || {}).family || '';
    const elemRows = targets.map(t => {
      const el = document.querySelector(t.sel);
      const fam = el ? getComputedStyle(el).fontFamily : '';
      return {
        'Fläche': t.flaeche,
        'Gefunden': el ? '✅' : '—',
        'font-family (computed)': el ? fam : '(kein Element im DOM)',
        'Body-Match': el ? (fam.toLowerCase().includes(bodyFamily.toLowerCase()) ? '✅' : '❌') : '—',
      };
    });
    console.table(elemRows);

    const tokenFails = tokenRows.filter(r => r.Match === '❌');
    const notLoaded = tokenRows.filter(r => r.Geladen === '❌');
    const elemFails = elemRows.filter(r => r['Body-Match'] === '❌');
    if (tokenFails.length === 0 && elemFails.length === 0 && notLoaded.length === 0) {
      console.log('%c✅ Fonts: alle Tokens tragen die Soll-Familie, Schrift geladen, sichtbare Flächen matchen.',
        'font-weight:bold;color:green');
    } else {
      if (tokenFails.length) console.log(`%c❌ ${tokenFails.length} Font-Token weicht ab: ${tokenFails.map(r => r.Token).join(', ')}`, 'font-weight:bold;color:crimson');
      if (notLoaded.length)  console.log(`%c⚠ ${notLoaded.length} Schrift(en) nicht geladen (sans-serif-Fallback): ${notLoaded.map(r => r.Token).join(', ')}`, 'font-weight:bold;color:darkorange');
      if (elemFails.length)  console.log(`%c❌ ${elemFails.length} Fläche(n) ohne Body-Match: ${elemFails.map(r => r['Fläche']).join(', ')}`, 'font-weight:bold;color:crimson');
    }
    console.log('%cLesart Fonts:', 'font-weight:bold',
      '"Geladen ❌" trotz Match ✅ = String stimmt, Schriftdatei fehlt auf dieser Seite (T1). "—" bei Flächen = Element zustandsabhängig nicht im DOM.');
    return { tokens: tokenRows, elements: elemRows };
  }

  // ---------------------------------------------------------------------------
  // fwCiAudit(): primitives Ist/Soll-Set-Audit. Erlaubte Menge kommt LIVE aus
  // tokens.css (keine Handpflege). Prüft nur `.kg-card`-Bereiche (die geprüfte
  // App-/Chart-Card) — nicht das Testseiten-Chrome (Header/Erwartungsblock/
  // Fehlerbox), das laut TEST_PAGE_STANDARD.md §11 bewusst nicht CI-gebunden ist.
  // ---------------------------------------------------------------------------

  // Alle unter :root definierten Custom-Property-Namen mit gegebenem Präfix,
  // direkt aus den geladenen Stylesheets gelesen (CSSOM) — kein Raten, keine Liste.
  const discoverRootCustomProps = prefix => {
    const names = new Set();
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch (e) { continue; } // cross-origin, überspringen
      if (!rules) continue;
      for (const rule of rules) {
        if (rule.selectorText === ':root' && rule.style) {
          for (let i = 0; i < rule.style.length; i++) {
            const prop = rule.style[i];
            if (prop.indexOf(prefix) === 0) names.add(prop);
          }
        }
      }
    }
    return [...names];
  };

  const firstFamily = stack => (stack || '').split(',')[0].trim().replace(/^["']|["']$/g, '');

  // Erlaubte Farbmenge: jedes --color-*-Token auflösen (Proben-Span, s.o.), auf Hex dedupliziert.
  const buildAllowedColors = () => {
    const allowed = new Set();
    discoverRootCustomProps('--color-').forEach(n => allowed.add(toHex(resolve(n))));
    return allowed;
  };

  // Erlaubte Fontmenge: jedes --font-*-Token auflösen, auf Familiennamen dedupliziert.
  const buildAllowedFonts = () => {
    const allowed = new Set();
    discoverRootCustomProps('--font-').forEach(n => allowed.add(firstFamily(resolveFont(n))));
    return allowed;
  };

  // rgb()/rgba() computed-Wert -> Hex, oder null bei vollständig transparent
  // (= kein Wert gesetzt, kein Verstoß).
  const colorToHexOrNull = computed => {
    const m = (computed || '').match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    const alpha = m[4] === undefined ? 1 : parseFloat(m[4]);
    if (alpha === 0) return null;
    return toHex([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]);
  };

  // Grober, „gut genug"-Locator zum Wiederfinden im DOM — keine eindeutige CSS-Selektor-Garantie.
  const simpleSelector = el => {
    if (el.id) return '#' + el.id;
    const cls = (typeof el.className === 'string') ? el.className.trim().split(/\s+/)[0] : '';
    return el.tagName.toLowerCase() + (cls ? '.' + cls : '');
  };

  // Canvas-Farben: Chart.js zeichnet auf <canvas>, dort gibt es kein DOM-Element zum
  // Inspizieren. Stattdessen die ECHTE Chart.js-Konfiguration lesen (Chart.getChart-
  // Registry, seit Chart.js v3) — das sind exakt die Werte, aus denen gemalt wird,
  // kein Pixel-Raten. Deckt Serienfarben, Tooltip-Farben, die Ergebnislinie
  // (FwVerticalLinePlugin) und Chart-Text-Annotationen ab. Die Annotation-Pulse-
  // Ringfarbe wird intern aus `dataset.pointBorderColor` abgeleitet (mit Petrol-
  // Fallback) — bereits durch die Dataset-Prüfung abgedeckt, kein eigener Pfad nötig.

  // Beliebigen Chart.js-Farbwert (Hex-String, rgb()/rgba()-String) auf Hex normalisieren.
  // Funktionen (scriptable options), 'transparent', Gradient-Objekte etc. -> null,
  // bewusst übersprungen (nicht statisch auswertbar ohne Chart.js-Rendering-Kontext).
  const normalizeAnyColor = val => {
    if (typeof val !== 'string') return null;
    const s = val.trim();
    if (/^#[0-9a-f]{3}$/i.test(s)) return toHex(hexToRgb(s));
    if (/^#[0-9a-f]{6}$/i.test(s)) return s.toLowerCase();
    const m = s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/i);
    if (m) return toHex([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])]);
    return null;
  };

  // Chart.js erlaubt pro Punkt eine Farbe (Array) oder eine Farbe fürs ganze Dataset (String).
  const collectColorValues = val => {
    if (Array.isArray(val)) return [...new Set(val.map(normalizeAnyColor).filter(Boolean))];
    const c = normalizeAnyColor(val);
    return c ? [c] : [];
  };

  function auditCanvasCharts(allowedColors, record) {
    if (typeof Chart === 'undefined' || typeof Chart.getChart !== 'function') {
      console.log('%c⚠ Chart.js-Registry (Chart.getChart) nicht verfügbar — Canvas-Farben nicht prüfbar.', 'color:darkorange');
      return 0;
    }
    let nCharts = 0;
    document.querySelectorAll('.kg-card canvas').forEach(canvas => {
      const chart = Chart.getChart(canvas);
      if (!chart) return;
      nCharts++;
      const label = simpleSelector(canvas.closest('.kg-card') || canvas);

      (chart.data.datasets || []).forEach((ds, i) => {
        ['borderColor', 'backgroundColor', 'pointBackgroundColor', 'pointBorderColor'].forEach(prop => {
          collectColorValues(ds[prop]).forEach(hex =>
            record('Canvas', `Dataset ${i + 1} ${prop}`, hex, allowedColors.has(hex), label));
        });
      });

      // enabled === false (z. B. Pie-Charts mit infoSystem 'CENTER_TEXT', FwSmartTooltips.js:33-35)
      // heisst: das Tooltip-Plugin malt NIE etwas. Die dann in der Config verbliebenen
      // Chart.js-Default-Farben (Schwarz/Weiss) sind tot und kein CI-Verstoss.
      // ERWEITERUNGSPUNKT 3 (siehe Kopfkommentar): gleiches "enabled:false lässt tote
      // Default-Farben zurück"-Muster bei einem anderen Plugin entdeckt? Gleichen Guard-Stil
      // übernehmen statt die Farben ungeprüft zu werten.
      const tt = chart.options && chart.options.plugins && chart.options.plugins.tooltip;
      if (tt && tt.enabled !== false) {
        ['titleColor', 'bodyColor', 'backgroundColor', 'borderColor'].forEach(prop => {
          collectColorValues(tt[prop]).forEach(hex =>
            record('Canvas', `Tooltip ${prop}`, hex, allowedColors.has(hex), label));
        });
      }

      const vline = chart.options && chart.options.plugins && chart.options.plugins.fwVerticalLine;
      if (vline) {
        collectColorValues(vline.color).forEach(hex =>
          record('Canvas', 'Vertikallinie color', hex, allowedColors.has(hex), label));
      }

      const annotations = chart.options && chart.options.chartText && chart.options.chartText.annotations;
      if (Array.isArray(annotations)) {
        annotations.forEach((a, i) => {
          collectColorValues(a && a.color).forEach(hex =>
            record('Canvas', `Annotation ${i + 1} color`, hex, allowedColors.has(hex), label));
        });
      }

      // ERWEITERUNGSPUNKT 1 (siehe Kopfkommentar): neues Chart-Engine-Plugin mit eigener
      // Farboption? Hier einen weiteren Block nach obigem Vorbild ergänzen.
    });
    return nCharts;
  }

  function fwCiAudit() {
    console.log('%cCI-Audit — benutzte Farben/Schriften in .kg-card vs. erlaubte Menge (aus tokens.css)',
      'font-weight:bold;font-size:14px');

    const cards = document.querySelectorAll('.kg-card');
    if (cards.length === 0) {
      console.log('%c⚠ Keine .kg-card auf dieser Seite gefunden — nichts zu prüfen.', 'color:darkorange');
      return [];
    }

    const allowedColors = buildAllowedColors();
    const allowedFonts = buildAllowedFonts();
    console.log('Erlaubte Farben (aus --color-* aufgelöst, n=' + allowedColors.size + '):', [...allowedColors].sort());
    console.log('Erlaubte Schriften (aus --font-* aufgelöst):', [...allowedFonts].sort());

    const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
    const found = new Map(); // key: Kategorie|Eigenschaft|Wert -> Zeile

    const record = (kategorie, eigenschaft, wert, ok, beispiel) => {
      const key = kategorie + '|' + eigenschaft + '|' + wert;
      if (!found.has(key)) {
        found.set(key, {
          Kategorie: kategorie, Eigenschaft: eigenschaft, Wert: wert,
          Status: ok ? '✅' : '❌', Beispiel: beispiel, Anzahl: 0,
        });
      }
      found.get(key).Anzahl++;
    };

    // Nativ unstylbare Inputs: color/font-family melden hier immer nur den unsichtbaren
    // Browser-Default (kein Glyph wird damit gezeichnet) — stattdessen ist accent-color
    // die tatsächlich sichtbare, CI-relevante Eigenschaft (Thumb/Häkchen/Punkt-Farbe).
    // ERWEITERUNGSPUNKT 2 (siehe Kopfkommentar): neuer Input-Typ ohne sichtbaren Text?
    // Hier ergänzen — UND prüfen, welche CSS-Eigenschaft stattdessen die sichtbare Farbe trägt.
    const NO_TEXT_INPUT_TYPES = new Set(['range', 'checkbox', 'radio']);

    // .kg-card selbst NICHT werten -- das ist laut TEST_PAGE_STANDARD.md §6 nur die
    // Ghost-Card-Simulation der Testseite, nicht die geprüfte App/der geprüfte Chart
    // (z. B. app.test.html:15 setzt dort bewusst reines Testseiten-Chrome).
    document.querySelectorAll('.kg-card *').forEach(el => {
      if (SKIP_TAGS.has(el.tagName)) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'none') return;
      const beispiel = simpleSelector(el);
      const isNoTextInput = el.tagName === 'INPUT' && NO_TEXT_INPUT_TYPES.has(el.type);

      if (!isNoTextInput) {
        const textHex = colorToHexOrNull(cs.color);
        if (textHex) record('Farbe', 'Text', textHex, allowedColors.has(textHex), beispiel);

        const fam = firstFamily(cs.fontFamily);
        if (fam) record('Schrift', 'Text', fam, allowedFonts.has(fam), beispiel);
      } else {
        const accentHex = colorToHexOrNull(cs.accentColor);
        if (accentHex) record('Farbe', 'Akzent', accentHex, allowedColors.has(accentHex), beispiel);
      }

      const bgHex = colorToHexOrNull(cs.backgroundColor);
      if (bgHex) record('Farbe', 'Hintergrund', bgHex, allowedColors.has(bgHex), beispiel);

      // Rahmenfarbe nur werten, wenn tatsächlich ein sichtbarer Rahmen existiert —
      // sonst meldet jedes Element seine (unsichtbare) computed border-color als Fehlalarm.
      if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') {
        const borderHex = colorToHexOrNull(cs.borderTopColor);
        if (borderHex) record('Farbe', 'Rahmen', borderHex, allowedColors.has(borderHex), beispiel);
      }
    });

    const nCanvasCharts = auditCanvasCharts(allowedColors, record);
    if (nCanvasCharts > 0) {
      console.log(`Canvas-Instanzen geprüft (Chart.getChart): ${nCanvasCharts}`);
    }

    const rows = [...found.values()].sort((a, b) => {
      if (a.Status !== b.Status) return a.Status === '❌' ? -1 : 1;
      return a.Kategorie === b.Kategorie
        ? a.Eigenschaft.localeCompare(b.Eigenschaft)
        : a.Kategorie.localeCompare(b.Kategorie);
    });
    console.table(rows);

    const fails = rows.filter(r => r.Status === '❌');
    console.log(fails.length === 0
      ? '%c✅ Alle gefundenen Farb-/Font-Werte innerhalb der .kg-card-Bereiche sind CI-Tokens.'
      : `%c❌ ${fails.length} Wert(e) sind KEIN CI-Token: ` +
        fails.map(r => `${r.Eigenschaft} ${r.Wert} (z. B. ${r.Beispiel}, ${r.Anzahl}×)`).join('; '),
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    console.log('%cGrenze:', 'font-weight:bold',
      'Nicht statisch auswertbare Canvas-Farben (scriptable functions, Gradients) werden übersprungen, nicht als Fehler gemeldet.');
    return rows;
  }

  // ---------------------------------------------------------------------------
  // fwKpiCardCheck(): KPI-Karten-Struktur (AP-tailwind-02_slice-2,
  // TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.3). Eigenständiges viertes Werkzeug,
  // bewusst NICHT Teil von fwCiAudit() (dessen Farbe+Font-Scope bleibt unangetastet,
  // s. Kopfkommentar "PHILOSOPHIE"). Prüft Surface-Ton (über dieselben resolve()/
  // toHex()-Helfer wie oben — kein zweiter Farbmechanismus), Rahmen-/Schattenfreiheit,
  // sichtbare Rundung sowie das Endwissens-Verbot (keine KPI-Karte, solange Screen 2
  // sichtbar ist). Viewport-Umbruch (S/M/L) bleibt bewusst Alberts Sichtprüfung.
  // ---------------------------------------------------------------------------

  function fwKpiCardCheck(cardSel = '[data-kpi]') {
    console.log('%cKPI-Karten-Struktur-Check (Screen 3)', 'font-weight:bold;font-size:14px');

    // Endwissens-Verbot: keine KPI-Karte, solange irgendein Screen 2 sichtbar ist (APP_SPEC §14.1).
    const screen2Guards = [...document.querySelectorAll('[data-fw-screen="2"]')]
      .filter(s => !s.hasAttribute('hidden'))
      .map(s => {
        const app = s.closest('.fw-app');
        const leaked = app ? app.querySelectorAll('[data-kpi]').length : 0;
        return {
          Fläche: simpleSelector(app || s),
          'Screen 2 sichtbar': '✅',
          'KPI-Karten dabei': leaked,
          Status: leaked === 0 ? '✅' : '❌ Endwissens-Verbot verletzt',
        };
      });
    if (screen2Guards.length) console.table(screen2Guards);

    const cards = [...document.querySelectorAll(cardSel)];
    if (cards.length === 0) {
      console.log('%c— Keine KPI-Karte im DOM (Screen 3 noch nicht erreicht) — kein Fehler, Kontext-abhängig.', 'color:gray');
      return { cards: [], screen2Guards };
    }

    const surfaceHex = toHex(resolve('--color-surface'));
    const mutedHex = toHex(resolve('--color-text-muted'));
    const textHex = toHex(resolve('--color-text'));

    const rows = cards.map(card => {
      const cs = getComputedStyle(card);
      const bgHex = colorToHexOrNull(cs.backgroundColor);
      const noBorder = parseFloat(cs.borderTopWidth) === 0 || cs.borderTopStyle === 'none';
      const noShadow = cs.boxShadow === 'none';
      const rounded = parseFloat(cs.borderTopLeftRadius) > 0;

      const dt = card.querySelector('dt');
      const dd = card.querySelector('dd');
      const dtHex = dt ? colorToHexOrNull(getComputedStyle(dt).color) : null;
      const ddHex = dd ? colorToHexOrNull(getComputedStyle(dd).color) : null;
      const ddBold = dd ? parseInt(getComputedStyle(dd).fontWeight, 10) >= 600 : false;
      const valueLargerThanLabel = (dt && dd)
        ? parseFloat(getComputedStyle(dd).fontSize) > parseFloat(getComputedStyle(dt).fontSize)
        : false;

      return {
        Karte: card.dataset.kpi || simpleSelector(card),
        Surface: bgHex === surfaceHex ? '✅' : `❌ (${bgHex})`,
        'Kein Rahmen': noBorder ? '✅' : '❌',
        'Kein Schatten': noShadow ? '✅' : '❌',
        Gerundet: rounded ? '✅' : '❌',
        'Label gedämpft': dt ? (dtHex === mutedHex ? '✅' : `❌ (${dtHex})`) : '— (kein dt)',
        'Wert dunkel': dd ? (ddHex === textHex ? '✅' : `❌ (${ddHex})`) : '— (kein dd)',
        'Wert fett': ddBold ? '✅' : '❌',
        'Wert > Label': valueLargerThanLabel ? '✅' : '❌',
      };
    });
    console.table(rows);

    // Reduced-Motion-Reveal: prefers-reduced-motion lässt sich nicht per Script erzwingen
    // (nur lesbar) — via DevTools → More tools → Rendering → "Emulate CSS media feature
    // prefers-reduced-motion" aktivieren, Seite neu laden, bis Screen 3 durchklicken, dann
    // erneut aufrufen. Prüft nur die deklarative CSS-/DOM-Reaktion (app.css @media-Regel,
    // app.js revealScreen3() reduced-Zweig) — nicht die gefühlte Geschwindigkeit.
    const reducedMotionActive = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const kpiSlot = document.querySelector('.fw-app__kpi-slot');
    const bridge = document.querySelector('.fw-app__screen3-bridge');
    const transitionOff = kpiSlot ? getComputedStyle(kpiSlot).transitionDuration === '0s' : null;
    const bridgeHidden = bridge ? bridge.hasAttribute('hidden') : null;
    console.table([{
      'prefers-reduced-motion (matchMedia)': reducedMotionActive ? '✅ aktiv' : '— inaktiv (Standardmodus, nichts zu prüfen)',
      'KPI-Slot-Transition aus': kpiSlot
        ? (reducedMotionActive ? (transitionOff ? '✅' : '❌ sollte "none" sein') : (transitionOff ? '⚠ aus, obwohl Reduced Motion inaktiv' : '✅ aktiv (Standard-Fade)'))
        : '— (kein .fw-app__kpi-slot im DOM)',
      'Bridge-Zeile verborgen': bridge
        ? (reducedMotionActive ? (bridgeHidden ? '✅' : '❌ sollte sofort verborgen sein') : '— (Standardmodus, Bridge darf temporär sichtbar sein)')
        : '— (kein .fw-app__screen3-bridge im DOM)',
    }]);

    const guardFails = screen2Guards.filter(g => g.Status !== '✅');
    const cardFails = rows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    if (guardFails.length === 0 && cardFails.length === 0) {
      console.log('%c✅ KPI-Karten strukturell korrekt, kein Endwissens-Leck auf Screen 2.', 'font-weight:bold;color:green');
    } else {
      if (guardFails.length) console.log(`%c❌ Endwissens-Verbot verletzt in ${guardFails.length} Fall/Fällen.`, 'font-weight:bold;color:crimson');
      if (cardFails.length) console.log(`%c❌ ${cardFails.length}/${rows.length} Karte(n) mit Abweichung.`, 'font-weight:bold;color:crimson');
    }
    return { cards: rows, screen2Guards };
  }

  // ---------------------------------------------------------------------------
  // fwSliderFieldCheck(): Slider-Field-Struktur (AP-tailwind-02_slice-3,
  // TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.6). Eigenständiges fünftes Werkzeug,
  // gleiches Prinzip wie fwKpiCardCheck() (s. Kopfkommentar). Prüft pro
  // `input[type="range"]` innerhalb einer `.fw-app`: ARIA-Vertrag (APP_SPEC §14.3),
  // Akzentfarbe (derselbe resolve()/toHex()-Mechanismus wie fwCiAudit), Label-Umschluss
  // (Q-06), Labeltext-/Wertanzeige-Farbrollen und Flächenlosigkeit des Feld-Containers.
  // ---------------------------------------------------------------------------

  function fwSliderFieldCheck(sliderSel = 'input[type="range"]') {
    console.log('%cSlider-Field-Struktur-Check (Screen 1)', 'font-weight:bold;font-size:14px');

    const sliders = [...document.querySelectorAll(sliderSel)].filter(el => el.closest('.fw-app'));
    if (sliders.length === 0) {
      console.log('%c— Kein Slider im DOM (Screen 1 nicht sichtbar oder andere App) — kein Fehler, Kontext-abhängig.', 'color:gray');
      return [];
    }

    const mutedHex = toHex(resolve('--color-text-muted'));
    const textHex = toHex(resolve('--color-text'));
    const primaryHex = toHex(resolve('--color-primary'));
    const ARIA_ATTRS = ['role', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-valuetext'];

    const rows = sliders.map(slider => {
      const cs = getComputedStyle(slider);
      const ariaOk = ARIA_ATTRS.every(a => (slider.getAttribute(a) || '').trim() !== '');
      const roleOk = slider.getAttribute('role') === 'slider';
      const accentHex = colorToHexOrNull(cs.accentColor);

      const label = slider.closest('label');
      const valueEl = label ? label.querySelector('[aria-hidden="true"]') : null;
      const valueCs = valueEl ? getComputedStyle(valueEl) : null;
      const valueHex = valueCs ? colorToHexOrNull(valueCs.color) : null;
      const valueBold = valueCs ? parseInt(valueCs.fontWeight, 10) >= 600 : false;
      const valueRightAlign = valueCs ? valueCs.textAlign === 'right' : false;

      const labelTextEl = label ? [...label.querySelectorAll('span')].find(s => s !== valueEl) : null;
      const labelTextCs = labelTextEl ? getComputedStyle(labelTextEl) : null;
      const labelTextHex = labelTextCs ? colorToHexOrNull(labelTextCs.color) : null;

      // Feld-Container = Elternelement des <label> (Rezept "Feld: my-4", §6.6) —
      // Surface-Regel: reines Abstands-Primitive, keine Fläche.
      const fieldEl = label ? label.parentElement : null;
      const fieldCs = fieldEl ? getComputedStyle(fieldEl) : null;
      const fieldBgHex = fieldCs ? colorToHexOrNull(fieldCs.backgroundColor) : null;
      const fieldNoBorder = fieldCs
        ? (parseFloat(fieldCs.borderTopWidth) === 0 || fieldCs.borderTopStyle === 'none')
        : null;

      return {
        Slider: simpleSelector(slider),
        'ARIA vollständig': ariaOk ? '✅' : `❌ (fehlt: ${ARIA_ATTRS.filter(a => (slider.getAttribute(a) || '').trim() === '').join(', ')})`,
        'role=slider': roleOk ? '✅' : '❌',
        Akzentfarbe: accentHex ? (accentHex === primaryHex ? '✅' : `❌ (${accentHex})`) : '❌ (kein accent-color)',
        'In <label>': label ? '✅' : '❌ (Q-06/APP_SPEC §14.3-Vertrag verletzt)',
        'Labeltext gedämpft': labelTextEl ? (labelTextHex === mutedHex ? '✅' : `❌ (${labelTextHex})`) : '— (kein Labeltext-Span gefunden)',
        'Wertanzeige aria-hidden': valueEl ? '✅' : '❌ (keine [aria-hidden] Wertanzeige gefunden)',
        'Wert dunkel': valueEl ? (valueHex === textHex ? '✅' : `❌ (${valueHex})`) : '—',
        'Wert fett': valueEl ? (valueBold ? '✅' : '❌') : '—',
        'Wert rechtsbündig': valueEl ? (valueRightAlign ? '✅' : '❌') : '—',
        'Feld ohne Fläche': fieldEl
          ? (!fieldBgHex && fieldNoBorder ? '✅' : `❌ (Hintergrund: ${fieldBgHex || 'keiner'}, Rahmen: ${fieldNoBorder ? 'keiner' : 'vorhanden'})`)
          : '— (kein Feld-Container gefunden)',
      };
    });
    console.table(rows);

    console.log('%cNicht scriptbar (Alberts Sichtprüfung):', 'font-weight:bold',
      'sichtbarer Fokus-Ring bei Tastaturbedienung (:focus-visible), Umbruch bei 375/768/1280px.');

    const fails = rows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    console.log(fails.length === 0
      ? '%c✅ Slider-Field(er) strukturell korrekt.'
      : `%c❌ ${fails.length}/${rows.length} Slider-Field(er) mit Abweichung.`,
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    return rows;
  }

  // ---------------------------------------------------------------------------
  // fwButtonCtaCheck(): Button-Familie + CTA (AP-tailwind-02_slice-4,
  // TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.4/§7). Eigenständiges sechstes Werkzeug.
  // Disclosure-Trigger tragen aria-expanded und werden deshalb ausgeschlossen (eigene
  // Prüfung: fwDisclosureCalloutCheck()). Klassifiziert jeden verbleibenden
  // button[type="button"] anhand der literalen FW_BUTTON_*_CLASS-Tokens (app.js), prüft
  // dann die tatsächlich gerenderte Farbe/Rundung/Fettung gegen die CI-Rolle — Token-
  // Präsenz allein beweist nichts, wenn Play-CDN die Utility nicht generiert (bekannter
  // Anlass AP-tailwind-02d). CTA (<a>): genau ein Primary pro App (D-06).
  // ---------------------------------------------------------------------------

  function fwButtonCtaCheck() {
    console.log('%cButton-Familie + CTA-Struktur-Check', 'font-weight:bold;font-size:14px');

    const primaryHex = toHex(resolve('--color-primary'));
    const bgHex = toHex(resolve('--color-bg'));
    const textHex = toHex(resolve('--color-text'));

    const navButtons = [...document.querySelectorAll('.fw-app button[type="button"]')]
      .filter(b => !b.hasAttribute('aria-expanded'));

    let buttonRows = [];
    if (navButtons.length === 0) {
      console.log('%c— Keine Navigations-Buttons im DOM.', 'color:gray');
    } else {
      buttonRows = navButtons.map(btn => {
        const cls = btn.className || '';
        let family = 'unbekannt';
        if (cls.includes('border-border')) family = 'prev';
        else if (cls.includes('w-full') && cls.includes('sm:w-auto')) family = 'journey';
        else if (cls.includes('ml-auto')) family = 'next';

        const cs = getComputedStyle(btn);
        const bgActual = colorToHexOrNull(cs.backgroundColor);
        const textActual = colorToHexOrNull(cs.color);
        const rounded = parseFloat(cs.borderTopLeftRadius) > 0;
        const bold = parseInt(cs.fontWeight, 10) >= 600;
        const focusRingClassesOk = cls.includes('focus-visible:ring-2') && cls.includes('focus-visible:ring-petrol-500');

        let colorOk = false;
        if (family === 'prev') {
          const hasBorder = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none';
          colorOk = bgActual === bgHex && textActual === textHex && hasBorder;
        } else if (family === 'next' || family === 'journey') {
          colorOk = bgActual === primaryHex;
        }

        return {
          Button: simpleSelector(btn) + ' "' + btn.textContent.trim().slice(0, 24) + '"',
          Familie: family,
          Farbe: colorOk ? '✅' : `❌ (bg:${bgActual}, text:${textActual})`,
          Gerundet: rounded ? '✅' : '❌',
          Fett: bold ? '✅' : '❌',
          'Fokus-Ring-Klassen': focusRingClassesOk ? '✅' : '❌',
        };
      });
      console.table(buttonRows);
    }

    const ctas = [...document.querySelectorAll('.fw-app a')];
    let ctaRows = [];
    if (ctas.length === 0) {
      console.log('%c— Kein CTA (<a>) im DOM (Screen 4 evtl. nicht erreicht) — kein Fehler, Kontext-abhängig.', 'color:gray');
    } else {
      ctaRows = ctas.map(a => {
        const cs = getComputedStyle(a);
        const bgActual = colorToHexOrNull(cs.backgroundColor);
        const rounded = parseFloat(cs.borderTopLeftRadius) > 0;
        const noUnderline = cs.textDecorationLine === 'none';
        return {
          CTA: simpleSelector(a) + ' "' + a.textContent.trim().slice(0, 24) + '"',
          Primary: bgActual === primaryHex ? '✅' : `❌ (${bgActual})`,
          Gerundet: rounded ? '✅' : '❌',
          'Keine Unterstreichung': noUnderline ? '✅' : '❌',
        };
      });
      console.table(ctaRows);
      console.log(ctas.length === 1
        ? '%c✅ Genau ein Primary-CTA (D-06).'
        : `%c⚠ ${ctas.length} CTA-Elemente gefunden — Vertrag verlangt genau einen Primary-CTA pro App (D-06).`,
        `font-weight:bold;color:${ctas.length === 1 ? 'green' : 'darkorange'}`);
    }

    console.log('%cNicht scriptbar (Alberts Sichtprüfung):', 'font-weight:bold',
      'sichtbarer Fokus-Ring bei Tastaturbedienung (:focus-visible), hover-/active-Zustände.');

    const buttonFails = buttonRows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    const ctaFails = ctaRows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    if (buttonFails.length === 0 && ctaFails.length === 0) {
      console.log('%c✅ Buttons/CTA strukturell korrekt.', 'font-weight:bold;color:green');
    } else {
      if (buttonFails.length) console.log(`%c❌ ${buttonFails.length}/${buttonRows.length} Button(s) mit Abweichung.`, 'font-weight:bold;color:crimson');
      if (ctaFails.length) console.log(`%c❌ ${ctaFails.length}/${ctaRows.length} CTA(s) mit Abweichung.`, 'font-weight:bold;color:crimson');
    }
    return { buttons: buttonRows, ctas: ctaRows };
  }

  // ---------------------------------------------------------------------------
  // fwStationPanelCheck(): Stationen-Panel + Fortschritts-/Bridge-Zeile (AP-tailwind-
  // 02_slice-5, TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §5.1-5.3 Panel-Taxonomie, §6.2,
  // §7 Stationen-/Story-Bereich). Eigenständiges siebtes Werkzeug. Panel ist bereits im
  // DOM, sobald die App den Content-State erreicht hat (auch wenn Screen 2 noch nicht
  // sichtbar ist); Quelle/Headline/Anker nur nach dem ersten Journey-Schritt gefüllt.
  // ---------------------------------------------------------------------------

  function fwStationPanelCheck() {
    console.log('%cStationen-Panel-Struktur-Check (Screen 2)', 'font-weight:bold;font-size:14px');

    const panel = document.querySelector('.fw-app__station-area');
    if (!panel) {
      console.log('%c— Kein Stationen-Panel im DOM (App noch nicht im Content-State).', 'color:gray');
      return [];
    }

    const cs = getComputedStyle(panel);
    const bgHex = colorToHexOrNull(cs.backgroundColor);
    const noBorder = parseFloat(cs.borderTopWidth) === 0 || cs.borderTopStyle === 'none';
    const noShadow = cs.boxShadow === 'none';
    const isSection = panel.tagName === 'SECTION';
    const isFlexCol = cs.display.indexOf('flex') !== -1 && cs.flexDirection === 'column';

    const panelRow = {
      Element: simpleSelector(panel),
      'Ist <section>': isSection ? '✅' : `❌ (${panel.tagName})`,
      'Flächenlos (Panel-Regel)': !bgHex ? '✅' : `❌ (${bgHex})`,
      'Kein Rahmen': noBorder ? '✅' : '❌',
      'Kein Schatten': noShadow ? '✅' : '❌',
      'flex flex-col': isFlexCol ? '✅' : '❌',
    };
    console.table([panelRow]);

    const mutedHex = toHex(resolve('--color-text-muted'));
    const textHex = toHex(resolve('--color-text'));
    const textSecHex = toHex(resolve('--color-text-sec'));

    const sourceLabel = panel.querySelector('p');
    const headline = panel.querySelector('h3');
    const anchor = headline ? headline.nextElementSibling : null;

    let contentRows = [];
    if (!sourceLabel && !headline) {
      console.log('%c— Noch keine Station gerendert (Journey noch nicht gestartet) — kein Fehler, Kontext-abhängig.', 'color:gray');
    } else {
      const sourceCs = sourceLabel ? getComputedStyle(sourceLabel) : null;
      const headlineCs = headline ? getComputedStyle(headline) : null;
      const anchorCs = (anchor && anchor.tagName === 'P') ? getComputedStyle(anchor) : null;

      contentRows = [{
        'Quellenzeile gedämpft/uppercase': sourceCs
          ? ((colorToHexOrNull(sourceCs.color) === mutedHex && sourceCs.textTransform === 'uppercase') ? '✅' : `❌ (${colorToHexOrNull(sourceCs.color)}, ${sourceCs.textTransform})`)
          : '— (kein p gefunden)',
        'Headline ist <h3>, tabIndex=-1': headline ? (headline.tabIndex === -1 ? '✅' : '❌') : '— (kein h3 gefunden)',
        'Headline fett/dunkel': headlineCs
          ? ((parseInt(headlineCs.fontWeight, 10) >= 600 && colorToHexOrNull(headlineCs.color) === textHex) ? '✅' : `❌ (${headlineCs.fontWeight}, ${colorToHexOrNull(headlineCs.color)})`)
          : '—',
        'Anker text-sec': anchorCs
          ? (colorToHexOrNull(anchorCs.color) === textSecHex ? '✅' : `❌ (${colorToHexOrNull(anchorCs.color)})`)
          : '— (kein Anker-p gefunden)',
      }];
      console.table(contentRows);
    }

    // Fortschrittszeile (Screen 2) — kein Klassenmarker mehr seit Slice 5 (reine Tailwind-
    // Utilities); Identifikation über den bekannten Textmuster-Vertrag "Station X von Y"
    // (formatStationProgress()), nicht über CSS.
    const progressEl = [...document.querySelectorAll('[data-fw-screen="2"] p')]
      .find(p => /^Station \d+ von \d+/.test(p.textContent));
    const bridge = document.querySelector('.fw-app__screen3-bridge');

    const progressCs = progressEl ? getComputedStyle(progressEl) : null;
    const bridgeCs = bridge ? getComputedStyle(bridge) : null;

    console.table([{
      'Fortschrittszeile gefunden': progressEl ? '✅' : '— (Journey noch nicht gestartet)',
      'Fortschrittszeile zentriert/gedämpft': progressCs
        ? ((progressCs.textAlign === 'center' && colorToHexOrNull(progressCs.color) === mutedHex) ? '✅' : `❌ (${progressCs.textAlign}, ${colorToHexOrNull(progressCs.color)})`)
        : '—',
      'Screen-3-Bridge gefunden': bridge ? '✅' : '— (Screen 3 evtl. nicht erreicht)',
      'Bridge zentriert/gedämpft': bridgeCs
        ? ((bridgeCs.textAlign === 'center' && colorToHexOrNull(bridgeCs.color) === mutedHex) ? '✅' : `❌ (${bridgeCs.textAlign}, ${colorToHexOrNull(bridgeCs.color)})`)
        : '—',
    }]);

    const allRows = [panelRow, ...contentRows];
    const fails = allRows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    console.log(fails.length === 0
      ? '%c✅ Stationen-Panel strukturell korrekt.'
      : `%c❌ ${fails.length} Zeile(n) mit Abweichung.`,
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    return allRows;
  }

  // ---------------------------------------------------------------------------
  // fwDisclosureCalloutCheck(): Disclosure (Zwischenstand) + Callout (Annahmen) +
  // sr-only-Live-Region (AP-tailwind-02_slice-6, AP-tailwind-02f Responsive-Kontrakt,
  // TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.7-6.9, Q-08). Eigenständiges achtes
  // Werkzeug. Disclosure-Trigger tragen aria-expanded — eindeutiges Unterscheidungs-
  // merkmal gegenüber den Navigations-Buttons aus fwButtonCtaCheck().
  // ---------------------------------------------------------------------------

  function fwDisclosureCalloutCheck() {
    console.log('%cDisclosure/Callout/Live-Region-Struktur-Check', 'font-weight:bold;font-size:14px');

    const mutedHex = toHex(resolve('--color-text-muted'));
    const textHex = toHex(resolve('--color-text'));
    const textSecHex = toHex(resolve('--color-text-sec'));

    const triggers = [...document.querySelectorAll('.fw-app button[aria-expanded]')];
    let triggerRows = [];
    if (triggers.length === 0) {
      console.log('%c— Kein Disclosure-Trigger im DOM (Journey noch nicht gestartet) — kein Fehler, Kontext-abhängig.', 'color:gray');
    } else {
      triggerRows = triggers.map(trigger => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const controlsId = trigger.getAttribute('aria-controls');
        const content = controlsId ? document.getElementById(controlsId) : null;
        const spans = [...trigger.querySelectorAll('span')];
        const indicatorSpan = spans.find(s => s.getAttribute('aria-hidden') === 'true');
        const labelSpan = spans.find(s => s !== indicatorSpan);
        const cs = getComputedStyle(trigger);
        const bgAtRest = colorToHexOrNull(cs.backgroundColor);
        const textColorOk = colorToHexOrNull(cs.color) === textSecHex;
        const rounded = parseFloat(cs.borderTopLeftRadius) > 0;
        const indicatorRotationOk = indicatorSpan
          ? (expanded ? indicatorSpan.className.includes('rotate-180') : !indicatorSpan.className.includes('rotate-180'))
          : false;
        const responsiveOk = trigger.className.includes('sm:inline-flex')
          && trigger.className.includes('sm:w-auto')
          && trigger.className.includes('sm:justify-start');

        return {
          Trigger: '"' + (labelSpan ? labelSpan.textContent : trigger.textContent).trim() + '"',
          'aria-expanded/-controls gültig': (controlsId && content) ? '✅' : `❌ (controls=${controlsId})`,
          'Label-/Indikator-Span vorhanden': (labelSpan && indicatorSpan) ? '✅' : '❌',
          'Indikator aria-hidden': indicatorSpan ? '✅' : '❌',
          'Indikator-Rotation korrekt': indicatorRotationOk ? '✅' : '❌',
          'Ruhezustand flächenlos': !bgAtRest ? '✅' : `❌ (${bgAtRest})`,
          'Textfarbe text-sec': textColorOk ? '✅' : `❌ (${colorToHexOrNull(cs.color)})`,
          Gerundet: rounded ? '✅' : '❌',
          'Responsive-Kontrakt (Q-08-Tokens)': responsiveOk ? '✅' : '❌',
          'Content hidden ⇄ aria-expanded': content ? (content.hasAttribute('hidden') === !expanded ? '✅' : '❌') : '— (kein Content gefunden)',
        };
      });
      console.table(triggerRows);
    }

    // Zwischenwerte-dl vom KPI-dl unterscheiden: nur die Intermediate-Values-Konstante
    // enthält 'grid-cols-2' (FW_KPI_GROUP_CLASS ist 'flex flex-wrap ...', kein Grid).
    const dls = [...document.querySelectorAll('.fw-app dl')].filter(dl => dl.className.includes('grid-cols-2'));
    let dlRows = [];
    if (dls.length === 0) {
      console.log('%c— Keine Zwischenwerte-Liste im DOM.', 'color:gray');
    } else {
      dlRows = dls.map(dl => {
        const cs = getComputedStyle(dl);
        const isGrid = cs.display === 'grid';
        const dt = dl.querySelector('dt');
        const dd = dl.querySelector('dd');
        const dtCs = dt ? getComputedStyle(dt) : null;
        const ddCs = dd ? getComputedStyle(dd) : null;
        const responsiveOk = dl.className.includes('w-full') && dl.className.includes('sm:w-fit');
        return {
          Liste: simpleSelector(dl),
          Grid: isGrid ? '✅' : '❌',
          'Responsive-Kontrakt (Q-08-Tokens)': responsiveOk ? '✅' : '❌',
          'dt gedämpft': dtCs ? (colorToHexOrNull(dtCs.color) === mutedHex ? '✅' : `❌ (${colorToHexOrNull(dtCs.color)})`) : '— (kein dt)',
          'dd fett/dunkel': ddCs ? ((parseInt(ddCs.fontWeight, 10) >= 600 && colorToHexOrNull(ddCs.color) === textHex) ? '✅' : `❌ (${ddCs.fontWeight}, ${colorToHexOrNull(ddCs.color)})`) : '— (kein dd)',
        };
      });
      console.table(dlRows);
    }

    const assumptions = document.querySelector('.fw-app__assumptions');
    let assumptionsRow = null;
    if (!assumptions) {
      console.log('%c— Keine Annahmen-Box (Callout) im DOM.', 'color:gray');
    } else {
      const acs = getComputedStyle(assumptions);
      const bgHex = colorToHexOrNull(acs.backgroundColor);
      const noShadow = acs.boxShadow === 'none';
      const hasLeftBorder = parseFloat(acs.borderLeftWidth) > 0 && acs.borderLeftStyle !== 'none';
      const noOtherBorder = (parseFloat(acs.borderTopWidth) === 0 || acs.borderTopStyle === 'none')
        && (parseFloat(acs.borderRightWidth) === 0 || acs.borderRightStyle === 'none');
      const isAside = assumptions.tagName === 'ASIDE';
      assumptionsRow = {
        Element: simpleSelector(assumptions),
        'Ist <aside>': isAside ? '✅' : `❌ (${assumptions.tagName})`,
        'Flächenlos': !bgHex ? '✅' : `❌ (${bgHex})`,
        'Kein Schatten': noShadow ? '✅' : '❌',
        'Nur linke Akzentkante': (hasLeftBorder && noOtherBorder) ? '✅' : '❌',
        'Text gedämpft': colorToHexOrNull(acs.color) === mutedHex ? '✅' : `❌ (${colorToHexOrNull(acs.color)})`,
      };
      console.table([assumptionsRow]);
    }

    const liveRegion = document.querySelector('[data-fw-role="a11y-result"]');
    let liveRegionRow = null;
    if (!liveRegion) {
      console.log('%c⚠ Keine ARIA-Live-Region ([data-fw-role="a11y-result"]) im DOM gefunden.', 'color:darkorange');
    } else {
      const lcs = getComputedStyle(liveRegion);
      const srOnlyOk = lcs.position === 'absolute'
        && parseFloat(lcs.width) <= 1
        && parseFloat(lcs.height) <= 1
        && lcs.overflow === 'hidden';
      liveRegionRow = {
        Element: simpleSelector(liveRegion),
        'aria-live=polite': liveRegion.getAttribute('aria-live') === 'polite' ? '✅' : '❌',
        'aria-atomic=true': liveRegion.getAttribute('aria-atomic') === 'true' ? '✅' : '❌',
        'sr-only (visuell verborgen)': srOnlyOk ? '✅' : `❌ (position:${lcs.position}, w:${lcs.width}, h:${lcs.height}, overflow:${lcs.overflow})`,
      };
      console.table([liveRegionRow]);
    }

    console.log('%cNicht scriptbar (Alberts Sichtprüfung):', 'font-weight:bold',
      'tatsächliches Breakpoint-Verhalten bei 375/768/1280px (Token-Präsenz ist geprüft, nicht die aktive Media-Query bei aktueller Fensterbreite).');

    const allRows = [...triggerRows, ...dlRows, assumptionsRow, liveRegionRow].filter(Boolean);
    const fails = allRows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    console.log(fails.length === 0
      ? '%c✅ Disclosure/Callout/Live-Region strukturell korrekt.'
      : `%c❌ ${fails.length} Zeile(n) mit Abweichung.`,
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    return { triggers: triggerRows, lists: dlRows, assumptions: assumptionsRow, liveRegion: liveRegionRow };
  }

  // ---------------------------------------------------------------------------
  // fwChartSlotCheck(): App-seitiger Chart-Slot (AP-tailwind-02_slice-7, D-04
  // Ein-Container-Vertrag, TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §9). Eigenständiges
  // neuntes Werkzeug. Prüft, dass der App-Slot niemals Fläche/Border/Schatten/Radius/
  // Padding trägt — der einzige sichtbare Container ist der engine-eigene
  // fw-chart-wrapper, hier bewusst NICHT geprüft (Engine-DOM-Chrome-AP, außerhalb
  // dieses Vertrags, s. §6.11).
  // ---------------------------------------------------------------------------

  function fwChartSlotCheck() {
    console.log('%cChart-Slot-Struktur-Check (D-04 Ein-Container-Vertrag)', 'font-weight:bold;font-size:14px');

    const slots = [...document.querySelectorAll('.fw-app [data-fw-appchart]')];
    if (slots.length === 0) {
      console.log('%c— Kein Chart-Slot im DOM.', 'color:gray');
      return [];
    }

    const rows = slots.map(slot => {
      const cs = getComputedStyle(slot);
      const bgHex = colorToHexOrNull(cs.backgroundColor);
      const noBorder = parseFloat(cs.borderTopWidth) === 0 || cs.borderTopStyle === 'none';
      const noShadow = cs.boxShadow === 'none';
      const noRadius = parseFloat(cs.borderTopLeftRadius) === 0;
      const noPadding = parseFloat(cs.paddingTop) === 0 && parseFloat(cs.paddingLeft) === 0;
      const isRelative = cs.position === 'relative';
      const hasTopMargin = parseFloat(cs.marginTop) > 0;
      const wrapperInside = !!slot.querySelector('.fw-chart-wrapper');

      return {
        Slot: slot.dataset.fwAppchart || simpleSelector(slot),
        Positionierung: isRelative ? '✅' : `❌ (${cs.position})`,
        'mt-6 (>0)': hasTopMargin ? '✅' : '❌',
        Flächenlos: !bgHex ? '✅' : `❌ (${bgHex})`,
        'Kein Rahmen': noBorder ? '✅' : '❌',
        'Kein Schatten': noShadow ? '✅' : '❌',
        'Kein Radius': noRadius ? '✅' : '❌',
        'Kein Padding': noPadding ? '✅' : '❌',
        'Engine-Wrapper gefunden': wrapperInside ? '✅' : '— (Chart evtl. noch nicht gerendert)',
      };
    });
    console.table(rows);

    const fails = rows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    console.log(fails.length === 0
      ? '%c✅ Alle Chart-Slots strukturell korrekt (Ein-Container-Vertrag D-04 eingehalten).'
      : `%c❌ ${fails.length}/${rows.length} Chart-Slot(s) mit Abweichung.`,
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    return rows;
  }

  // ---------------------------------------------------------------------------
  // fwScreenFlowCheck(): Screen-Rahmen, -Headline und -Navigation (AP-tailwind-
  // 02_slice-8, TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §7/§9). Eigenständiges zehntes
  // Werkzeug. Prüft zusätzlich PROGRAMMATISCH per echtem .focus()-Aufruf, ob die
  // JS-Fokusziel-Headline tatsächlich keinen sichtbaren Standard-Outline erzeugt —
  // das ist eine der Sachen, die Albert am Bildschirm nicht zuverlässig sehen kann
  // (anders als :focus-visible, das echte Nutzerinteraktion braucht, ist ein echter
  // .focus()-Aufruf real scriptbar und testet die tatsächliche Outline-Berechnung).
  // ---------------------------------------------------------------------------

  function fwScreenFlowCheck() {
    console.log('%cScreen-Flow-Struktur-Check (Rahmen/Headline/Navigation)', 'font-weight:bold;font-size:14px');

    const textHex = toHex(resolve('--color-text'));

    const screens = [...document.querySelectorAll('.fw-app [data-fw-screen]')];
    if (screens.length === 0) {
      console.log('%c— Keine Screens im DOM.', 'color:gray');
      return [];
    }

    const screenRows = screens.map(screen => {
      const cs = getComputedStyle(screen);
      return {
        Screen: 'data-fw-screen=' + screen.dataset.fwScreen,
        'position: relative': cs.position === 'relative' ? '✅' : `❌ (${cs.position})`,
      };
    });
    console.table(screenRows);

    const headlineRows = screens.map(screen => {
      const h2 = screen.querySelector('h2');
      if (!h2) return { Screen: 'data-fw-screen=' + screen.dataset.fwScreen, Headline: '— (kein h2 gefunden)' };
      const cs = getComputedStyle(h2);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      const colorOk = colorToHexOrNull(cs.color) === textHex;
      const tabIndexOk = h2.tabIndex === -1;

      // Programmatischer Fokus-Test: nur sinnvoll, wenn der Screen gerade sichtbar
      // (nicht hidden) ist — .focus() auf einem Element in einem hidden-Teilbaum ist
      // ein No-op und würde sonst ein falsches ✅ liefern (Outline ist ohne echten
      // Fokus generisch 'none').
      let outlineNoneOnFocus = null;
      if (!screen.hasAttribute('hidden')) {
        try {
          const prevActive = document.activeElement;
          h2.focus({ preventScroll: true });
          if (document.activeElement === h2) {
            outlineNoneOnFocus = getComputedStyle(h2).outlineStyle === 'none';
          }
          if (prevActive && typeof prevActive.focus === 'function' && prevActive !== h2) prevActive.focus({ preventScroll: true });
          else h2.blur();
        } catch (e) { outlineNoneOnFocus = null; }
      }

      return {
        Screen: 'data-fw-screen=' + screen.dataset.fwScreen,
        Headline: '"' + h2.textContent.trim().slice(0, 30) + '"',
        'text-xl font-bold': bold ? '✅' : `❌ (${cs.fontWeight})`,
        Textfarbe: colorOk ? '✅' : `❌ (${colorToHexOrNull(cs.color)})`,
        'tabIndex=-1': tabIndexOk ? '✅' : '❌',
        'Kein Outline bei .focus()': outlineNoneOnFocus === null ? '— (Screen verborgen, nicht testbar)' : (outlineNoneOnFocus ? '✅' : '❌'),
      };
    });
    console.table(headlineRows);

    // Screen-Navigation: eindeutig über die Token-Kombination flex-wrap + gap-3 + mt-6
    // identifizierbar (FW_SCREEN_NAV_CLASS) — kein anderer Container in der App trägt
    // alle drei gleichzeitig (Chart-Slot hat mt-6, aber kein flex-wrap/gap-3; Stationen-
    // Panel hat gap-3, aber flex-col statt flex-wrap und kein mt-6).
    const navs = [...document.querySelectorAll('.fw-app div')].filter(el => {
      const tokens = (el.className || '').split(/\s+/);
      return tokens.includes('flex-wrap') && tokens.includes('gap-3') && tokens.includes('mt-6');
    });
    let navRows = [];
    if (navs.length === 0) {
      console.log('%c— Keine Screen-Navigation im DOM gefunden (Screen 3/4 evtl. nicht erreicht).', 'color:gray');
    } else {
      navRows = navs.map(nav => {
        const cs = getComputedStyle(nav);
        return {
          Nav: simpleSelector(nav),
          'flex flex-wrap': (cs.display === 'flex' && cs.flexWrap === 'wrap') ? '✅' : `❌ (${cs.display}, ${cs.flexWrap})`,
          'gap-3 (>0)': parseFloat(cs.columnGap) > 0 ? '✅' : '❌',
          'mt-6 (>0)': parseFloat(cs.marginTop) > 0 ? '✅' : '❌',
        };
      });
      console.table(navRows);
    }

    const allRows = [...screenRows, ...headlineRows, ...navRows];
    const fails = allRows.filter(r => Object.values(r).some(v => typeof v === 'string' && v.startsWith('❌')));
    console.log(fails.length === 0
      ? '%c✅ Screen-Rahmen/Headline/Navigation strukturell korrekt.'
      : `%c❌ ${fails.length} Zeile(n) mit Abweichung.`,
      `font-weight:bold;color:${fails.length === 0 ? 'green' : 'crimson'}`);
    return { screens: screenRows, headlines: headlineRows, navs: navRows };
  }

  global.fwTokenCheck = fwTokenCheck;
  global.fwFontCheck = fwFontCheck;
  global.fwCiAudit = fwCiAudit;
  global.fwKpiCardCheck = fwKpiCardCheck;
  global.fwSliderFieldCheck = fwSliderFieldCheck;
  global.fwButtonCtaCheck = fwButtonCtaCheck;
  global.fwStationPanelCheck = fwStationPanelCheck;
  global.fwDisclosureCalloutCheck = fwDisclosureCalloutCheck;
  global.fwChartSlotCheck = fwChartSlotCheck;
  global.fwScreenFlowCheck = fwScreenFlowCheck;
  // Auto-Lauf beim Einfügen in die Konsole: Farben + Fonts + Ist/Soll-Set-Audit + KPI-Struktur +
  // Slider-Struktur + Button/CTA + Stationen-Panel + Disclosure/Callout + Chart-Slot + Screen-Flow.
  fwTokenCheck();
  fwFontCheck();
  fwCiAudit();
  fwKpiCardCheck();
  fwSliderFieldCheck();
  fwButtonCtaCheck();
  fwStationPanelCheck();
  fwDisclosureCalloutCheck();
  fwChartSlotCheck();
  fwScreenFlowCheck();
})(typeof window !== 'undefined' ? window : this);
