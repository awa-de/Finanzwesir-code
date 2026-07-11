/**
 * tools/ci-token-check.js
 * CI-Token-Auflösungs- und Drift-Check für Farben UND Fonts (Browser-DevTools-Konsole).
 *
 * ZWECK
 *   Beweist, dass CSS-Custom-Properties (`--color-*`, `--font-*`) im echten Cascade-Kontext
 *   der geöffneten Seite auf die erwarteten Kontrakt-FINAL-Werte auflösen — nicht auf hartcodierte
 *   Fallback-Werte. Zwei Prüfungen:
 *     - fwTokenCheck(): Farbrollen; quantifiziert den Drift Alt→Neu als ΔE76 (Lab-Abstand).
 *     - fwFontCheck():  Font-Tokens + reale Element-Schrift; prüft zusätzlich via document.fonts.check,
 *                       ob die Schrift tatsächlich geladen ist — nicht nur der font-family-String.
 *
 * WANN NUTZEN
 *   - Nach jeder Token-Migration einer App (`--fw-*` → `--color-*` / `--fw-font-base` → `--font-body`).
 *   - Bei der späteren Ghost-/Produktions-Anbindung von `tokens.css` (To-do T1) — greift die SSoT live?
 *   - Bei der Rubikon-Nachmessung nach Font-Wechsel (DS-FOLLOWUP-07).
 *
 * NUTZUNG
 *   1. Ziel-Testseite im VSCode-Live-Server öffnen (z. B. Apps/prokrastinations-preis/app.test.html).
 *   2. DevTools → Console → Inhalt dieser Datei einfügen (oder als Snippet speichern).
 *   3. Auto-Lauf beim Einfügen führt beide Checks aus. Einzeln / eigene Listen:
 *        fwTokenCheck();                                 // CI-Farbrollen des Piloten
 *        fwTokenCheck([{ rolle, token, alt, neu }, …]);  // eigene Farbliste
 *        fwFontCheck();                                  // Font-Tokens + Pilot-Flächen
 *        fwFontCheck([{ rolle, token, family }, …], [{ flaeche, sel }, …]);  // eigene Listen
 *
 * LESART ΔE76 (nur Farben)
 *   <1 unsichtbar · 1–2.3 nur im direkten Vergleich · 2.3–10 bei genauem Hinsehen · >10 klar.
 *   Match ✅ (aufgelöst == Soll) ist der harte Beweis; ΔE76 ist die ehrliche Größenordnung, kein UI-Urteil.
 *
 * LESART FONTS
 *   Match ✅ = Token/Element trägt die Soll-Familie. "Geladen ✅" (document.fonts.check) = Schrift real
 *   verfügbar; bei "Geladen ❌" stimmt zwar der font-family-String, die Seite rendert aber den
 *   sans-serif-Fallback (fehlende @font-face/Schriftdatei — T1/Ghost-Anbindung).
 *
 * Provenienz: AP-prokrast-17 (Farben, Pilot-Migration) + AP-prokrast-17-FONT-CODE-B (Fonts).
 *   Read-only, kein Repo-Effekt.
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

  global.fwTokenCheck = fwTokenCheck;
  global.fwFontCheck = fwFontCheck;
  // Auto-Lauf beim Einfügen in die Konsole: Farben + Fonts.
  fwTokenCheck();
  fwFontCheck();
})(typeof window !== 'undefined' ? window : this);
