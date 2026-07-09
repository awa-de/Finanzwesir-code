/**
 * tools/ci-token-check.js
 * CI-Token-Auflösungs- und Drift-Check (Browser-DevTools-Konsole).
 *
 * ZWECK
 *   Beweist, dass CSS-Custom-Properties (`--color-*`, `--font-*` …) im echten Cascade-Kontext
 *   der geöffneten Seite auf die erwarteten Kontrakt-FINAL-Werte auflösen — nicht auf hartcodierte
 *   Fallback-Hexe. Quantifiziert zusätzlich den Farbdrift Alt→Neu als ΔE76 (Lab-Abstand).
 *
 * WANN NUTZEN
 *   - Nach jeder Token-Migration einer App (`--fw-*` → `--color-*`).
 *   - Bei der späteren Ghost-/Produktions-Anbindung von `tokens.css` (To-do T1) — greift die SSoT live?
 *   - Bei der Font-Migration (`--fw-font-base` → `--font-body`, DS-FOLLOWUP-07) mit eigener Tokenliste.
 *
 * NUTZUNG
 *   1. Ziel-Testseite im VSCode-Live-Server öffnen (z. B. Apps/prokrastinations-preis/app.test.html).
 *   2. DevTools → Console → Inhalt dieser Datei einfügen (oder als Snippet speichern).
 *   3. Standardlauf (CI-Farbrollen des Piloten):   fwTokenCheck();
 *      Eigene Tokenliste:                          fwTokenCheck([{ rolle, token, alt, neu }, …]);
 *
 * LESART ΔE76
 *   <1 unsichtbar · 1–2.3 nur im direkten Vergleich · 2.3–10 bei genauem Hinsehen · >10 klar.
 *   Match ✅ (aufgelöst == Soll) ist der harte Beweis; ΔE76 ist die ehrliche Größenordnung, kein UI-Urteil.
 *
 * Provenienz: AP-prokrast-17 (Pilot-Migration prokrastinations-preis). Read-only, kein Repo-Effekt.
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

  global.fwTokenCheck = fwTokenCheck;
  // Auto-Lauf beim Einfügen in die Konsole (Standardliste).
  fwTokenCheck();
})(typeof window !== 'undefined' ? window : this);
