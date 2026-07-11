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
 *
 * WANN WELCHES TOOL
 *   - Alltägliche Frage „ist das hier CI-konform" auf einer beliebigen Testseite → fwCiAudit().
 *   - Migrations-/Drift-Messung mit bekanntem Alt/Neu-Sollwert → fwTokenCheck()/fwFontCheck().
 *
 * NUTZUNG
 *   1. Ziel-Testseite im VSCode-Live-Server öffnen (App- oder Engine-Testseite, egal).
 *   2. DevTools → Console → Inhalt dieser Datei einfügen (oder als Snippet speichern).
 *   3. Auto-Lauf beim Einfügen führt alle drei Checks aus. Ergebnis von fwCiAudit() kopieren und
 *      zur Bewertung einfügen. Einzeln / eigene Listen weiterhin möglich:
 *        fwCiAudit();                                    // Ist/Soll-Set-Audit dieser Seite
 *        fwTokenCheck([{ rolle, token, alt, neu }, …]);  // eigene Farbliste (Drift-Check)
 *        fwFontCheck([{ rolle, token, family }, …], [{ flaeche, sel }, …]);  // eigene Listen
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
  const DEFAULT_FONT_TARGETS = [
    { flaeche: 'Fließtext (.fw-app)', sel: '.fw-app' },
    { flaeche: 'Screen-Headline',     sel: '.fw-app__screen-headline' },
    { flaeche: 'Station-Headline',    sel: '.fw-app__station-headline' },
    { flaeche: 'A11y-Tabelle',        sel: '.fw-app table, .fw-chart-wrapper table' },
    { flaeche: 'App-Meldung',         sel: '.fw-app p[role="alert"], .fw-app p[role="status"]' },
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

  global.fwTokenCheck = fwTokenCheck;
  global.fwFontCheck = fwFontCheck;
  global.fwCiAudit = fwCiAudit;
  // Auto-Lauf beim Einfügen in die Konsole: Farben + Fonts + Ist/Soll-Set-Audit.
  fwTokenCheck();
  fwFontCheck();
  fwCiAudit();
})(typeof window !== 'undefined' ? window : this);
