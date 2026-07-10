/**
 * @fileoverview Finanzwesir Chart Engine - Design System (Theme)
 * @module core/FwTheme
 * @version 5.0.0 (CSS-VARIABLES BRIDGE — KDR-14)
 * @date 2026-02-25
 * @status PRODUCTION READY
 *
 * @description
 * Kapselt die Corporate Identity (Farben, Fonts, Geometrie) und die semantische Zuweisung.
 * Dient als "Single Source of Truth" für das visuelle Erscheinungsbild.
 *
 * V5.0.0: CSS-VARIABLES BRIDGE (KDR-14).
 * - Neu: init() liest :root CSS Custom Properties via getComputedStyle().
 * - Hardcodierte Hex-Werte bleiben als Fallback (für Test-HTMLs ohne screen.css).
 * - Neue Tokens: textMuted, textDisabled, bgFaint, zeroLine, loaderBg.
 * - Tooltip-Tokens: Eigenes Objekt für konsistente Tooltip-Farbgebung.
 * - Reihenfolge: ChartEngine ruft FwTheme.init() VOR new FwRenderer() auf.
 *
 * @history
 * Update 3.1.0: Zentrale Methode 'getGhostColor' für CI-konforme Transparenz.
 * Update 3.2.0: Optimierte Farb-Palette (Kontrast-Sequenz).
 * Update 3.3.0: STRICT GATEKEEPER - Validiert User-Farben "All-or-Nothing".
 * Update 4.0.0: DESIGN TOKENS - Einführung des 'ui' Objekts für geometrische Konstanten.
 * Update 4.1.0: ADAPTIVE STROKE WIDTH - Implementierung der Zonen-Matrix (S, M, L).
 * Update 4.2.0: GEOMETRIC DECOUPLING - Einführung der Point-Radius Matrix.
 */

export class FwTheme {
  constructor() {
    // 1. FARB-TOKENS (Hardcoded Defaults — überschrieben durch init())
    this.colors = {
      petrol: '#218380',
      // CHANGED — AP-16: Ramp-Slots lesen jetzt die neuen Tailwind-Stufen (JS-Key-Namen unverändert,
      // Wert = gemappte neue Stufe; byte-identisch zu tokens.css). Mapping: 50→-400, 80→-500, 20→-200.
      petrol50: '#64CDC9', // war #90C1BF (Alt-petrol-50) → petrol-400
      petrol80: '#49B3AF', // war #4D9C99 (Alt-petrol-80) → petrol-500
      petrol20: '#B4EEEB', // war #D3E6E6 (Alt-petrol-20) → petrol-200
      blau: '#0071BF',
      purpur: '#8D0267',
      purpur80: '#F172C1', // CHANGED — AP-16: war #C57EB2 (Alt-purpur-80) → purpur-400 (Data-Viz-Palette)
      gelb: '#DFC805',
      gelb80: '#FCF09C', // CHANGED — AP-16: war #F9EF9E (Alt-gelb-80) → gelb-200
      text: '#272727',
      textSec: '#4C4C4C',
      textMuted: '#666666',
      textDisabled: '#888888',
      grid: '#E7ECEF',
      border: '#E7ECEF',
      linesDark: '#4C4C4C',
      bgWhite: '#FFFFFF',
      bgFaint: '#FAFAFA',
      zeroLine: '#999999',
      loaderBg: '#F3F3F3'
    };

    // 2. TYPOGRAFIE-TOKENS
    this.fonts = {
      body: '"Source Sans Pro", sans-serif',
      heading: '"Archivo Black", sans-serif'
    };

    // 3. GEOMETRIE-TOKENS (Optimiert in V4.2.0)
    this.ui = {
      barBorderRadius: 4,
      legendDotRadius: 2,
      popoverBorderRadius: 12,
      tooltipBorderRadius: 4,

      // ADAPTIVE STROKE WIDTH MATRIX (The Law)
      lineWeights: {
        normal:    { S: 1.5, M: 2, L: 2.5 },
        benchmark: { S: 3,   M: 4, L: 5   }
      },

      // V4.2.0: POINT RADIUS MATRIX (Geometric Decoupling)
      pointWeights: { S: 3, M: 4, L: 5 }
    };

    // 4. SEMANTISCHE FARB-TOKENS (Pos/Neg für Single-Asset Bar Charts)
    this.semantic = {
      positiveBar: this.colors.petrol,
      negativeBar: this.colors.purpur
    };

    // 5. TOOLTIP-TOKENS (CI-konform, 1:1 zu Brand-Farben)
    this.tooltip = {
      bg: this.colors.bgWhite,
      title: this.colors.text,
      body: this.colors.textSec,
      border: this.colors.border
    };

    this._allowedColors = new Set(
      Object.values(this.colors).map(c => c.toUpperCase())
    );

    this.palette = [
      this.colors.blau, this.colors.purpur, this.colors.petrol,
      this.colors.gelb, this.colors.purpur80, this.colors.petrol50,
      this.colors.gelb80, this.colors.textSec
    ];
  }

  /**
   * V5.0.0: CSS-Variables Bridge (KDR-14).
   * Liest :root CSS Custom Properties und überschreibt die Hardcoded-Defaults.
   * Muss VOR dem ersten Render aufgerufen werden (ChartEngine.constructor).
   *
   * Fallback-Strategie: Wenn eine CSS-Variable nicht existiert (z.B. Test-HTML
   * ohne screen.css), bleibt der Hardcoded-Default aus dem Constructor erhalten.
   */
  init() {
    const style = getComputedStyle(document.documentElement);

    /**
     * Liest eine CSS Custom Property. Gibt den Fallback zurück,
     * wenn die Property leer oder nicht definiert ist.
     */
    const read = (prop, fallback) => {
      const val = style.getPropertyValue(prop).trim();
      return val || fallback;
    };

    // Brand Colors
    this.colors.petrol = read('--color-petrol', this.colors.petrol);
    // CHANGED — AP-16: gelesene CSS-Var auf neue Stufen-Namen umgestellt (Mapping wie Konstruktor)
    this.colors.petrol80 = read('--color-petrol-500', this.colors.petrol80);
    this.colors.petrol50 = read('--color-petrol-400', this.colors.petrol50);
    this.colors.petrol20 = read('--color-petrol-200', this.colors.petrol20);
    this.colors.blau = read('--color-blau', this.colors.blau);
    this.colors.purpur = read('--color-purpur', this.colors.purpur);
    this.colors.purpur80 = read('--color-purpur-400', this.colors.purpur80); // CHANGED — AP-16
    this.colors.gelb = read('--color-gelb', this.colors.gelb);
    this.colors.gelb80 = read('--color-gelb-200', this.colors.gelb80); // CHANGED — AP-16

    // UI Colors
    this.colors.text = read('--color-text', this.colors.text);
    this.colors.textSec = read('--color-text-sec', this.colors.textSec);
    this.colors.textMuted = read('--color-text-muted', this.colors.textMuted);
    this.colors.textDisabled = read('--color-text-disabled', this.colors.textDisabled);
    this.colors.bgWhite = read('--color-bg', this.colors.bgWhite);
    this.colors.bgFaint = read('--color-bg-faint', this.colors.bgFaint);
    this.colors.border = read('--color-border', this.colors.border);
    this.colors.grid = read('--color-grid', this.colors.grid);
    this.colors.zeroLine = read('--color-zero-line', this.colors.zeroLine);
    this.colors.loaderBg = read('--color-loader-bg', this.colors.loaderBg);

    // NEW — AP-prokrast-17-FONT-CODE-A: Fonts aus tokens.css lesen (KDR 14 Punkt 5, Farb-Parität).
    // Constructor-Hardcode (this.fonts, s.o.) bleibt Fallback für Test-HTMLs ohne tokens.css.
    // heading hat in Pfad A (Canvas) noch keinen Consumer — bewusste Parität für Write-AP B/Headlines.
    this.fonts.body = read('--font-body', this.fonts.body);
    this.fonts.heading = read('--font-display', this.fonts.heading);

    // linesDark folgt textSec (identischer Wert, semantisch getrennter Name)
    this.colors.linesDark = this.colors.textSec;

    // Semantische Tokens aktualisieren (referenzieren Brand-Farben)
    this.semantic.positiveBar = this.colors.petrol;
    this.semantic.negativeBar = this.colors.purpur;

    // Tooltip-Tokens aktualisieren (CI 1:1)
    this.tooltip.bg = this.colors.bgWhite;
    this.tooltip.title = this.colors.text;
    this.tooltip.body = this.colors.textSec;
    this.tooltip.border = this.colors.border;

    // Palette aktualisieren (nutzt jetzt CSS-Werte)
    this.palette = [
      this.colors.blau, this.colors.purpur, this.colors.petrol,
      this.colors.gelb, this.colors.purpur80, this.colors.petrol50,
      this.colors.gelb80, this.colors.textSec
    ];

    // AllowedColors-Set neu aufbauen
    this._allowedColors = new Set(
      Object.values(this.colors).map(c => c.toUpperCase())
    );
  }

  /**
   * Ermittelt die deterministische Linienstärke basierend auf Typ und Breite.
   */
  getLineWidth(isBenchmark, width) {
    let zone = 'L';
    if (width < 450) zone = 'S';
    else if (width < 900) zone = 'M';

    const type = isBenchmark ? 'benchmark' : 'normal';
    return this.ui.lineWeights[type][zone];
  }

  /**
   * V4.2.0: Ermittelt den deterministischen Punkt-Radius für die Perlenkette.
   */
  getPointRadius(width) {
    let zone = 'L';
    if (width < 450) zone = 'S';
    else if (width < 900) zone = 'M';

    return this.ui.pointWeights[zone];
  }

  getColor(index) {
    if (typeof index !== 'number') return this.palette[0];
    return this.palette[index % this.palette.length];
  }

  validateColorMap(colorMap) {
    if (!colorMap || Object.keys(colorMap).length === 0) return false;
    return Object.values(colorMap).every(hex => {
      if (!hex) return false;
      return this._allowedColors.has(hex.toUpperCase());
    });
  }

  getGhostColor(hex, opacity = 0.35) {
    if (!hex) return 'rgba(200,200,200,0.3)';
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c[0]+c[0] + c[1]+c[1] + c[2]+c[2];
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
