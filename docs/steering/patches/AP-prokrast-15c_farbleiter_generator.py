# -*- coding: utf-8 -*-
"""
AP-prokrast-15c — Farbleiter-Generator (Strategie B "behutsame Restaurierung")

Deterministischer Generator fuer die CI-Farbleitern des Finanzwesir-Designsystems.
Methodik verbindlich fixiert in docs/steering/design/CI-POOL-ROLLENKONTRAKT.md §4.3:
  - Seeds hex-exakt gepinnt (petrol-600, gelb-500, purpur-900)
  - OKLCH-Generierung: L je Stufe aus gleichfarbiger Tailwind-Referenzfamilie,
    Hue konstant = Seed-Hue, Chroma = Tailwind-Familien-Chroma * Ratio-am-Pin
    * gleitender Daempfungsfaktor (1.0 am Pin -> ~0.65 an den Leiter-Enden)
  - Gamut-Sicherung: Chroma binaer reduzieren bis in-sRGB (kein Kanal-Clamping)
  - Blau: keine Leiter, nur Seed blau-700

Dieses Skript trifft KEINE Designentscheidungen. Parameter sind aus dem Kontrakt
uebernommen. Board-HTML wird programmatisch erzeugt (keine Tippfehler-Flaeche).

Aufruf:  python AP-prokrast-15c_farbleiter_generator.py
"""

import sys
import io
import os
import math
import re

# UTF-8 Konsolenausgabe erzwingen (Umlaute)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

# ============================================================
# PARAMETER (aus CI-POOL-ROLLENKONTRAKT.md §4.3 — nicht selbst erfunden)
# ============================================================

STAGES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

# Gleitender Chroma-Daempfungsfaktor: 1.0 am Pin -> DAMP_END an den Leiter-Enden
DAMP_AT_PIN = 1.0
DAMP_AT_END = 0.65   # "~0.65 an den Leiter-Enden" (Kontrakt §4.3)

# Tailwind CSS v3 Default-Paletten (Quelle: Tailwind CSS v3, tailwindcss.com/docs/customizing-colors)
# Hart hinterlegt, kein Web-Zugriff. Dienen als L-/Chroma-Formreferenz je gleichfarbiger Familie.
TW_TEAL = {50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",
           500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a"}
TW_YELLOW = {50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",
             500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12"}
TW_PINK = {50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",
           500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843"}

# Seed-Definitionen: (Seed-Hex, Referenzfamilie, erwarteter Pin-Slot)
SEEDS = {
    "petrol": ("#218380", TW_TEAL,   "Teal",   600),
    "gelb":   ("#DFC805", TW_YELLOW, "Yellow", 500),
    "purpur": ("#8D0267", TW_PINK,   "Pink",   900),
}
BLAU_SEED = ("#0071BF", 700)  # keine Leiter (Kontrakt §4.1 / E2)

WHITE = "#FFFFFF"
FAINT = "#FAFAFA"
TEXT_DARK = "#272727"

# Bestandswerte Neutral-/Error-Set (aus screen.css / Kontrakt §1 — unveraendert, nur zur Board-Vollstaendigkeit)
NEUTRAL = [
    ("--color-text", "#272727"), ("--color-text-sec", "#4C4C4C"),
    ("--color-text-muted", "#666666"), ("--color-text-disabled", "#888888"),
    ("--color-bg", "#FFFFFF"), ("--color-bg-faint", "#FAFAFA"),
    ("--color-border", "#E7ECEF"),
]
ERROR_SET = [
    ("--color-error-text", "#b71c1c"), ("--color-error-border", "#c62828"),
    ("--color-error-bg", "#fff8f8"),
]

HERE = os.path.dirname(os.path.abspath(__file__))
SCREEN_CSS = os.path.normpath(os.path.join(HERE, "..", "..", "..", "Theme", "assets", "css", "screen.css"))
BOARD_OUT = os.path.join(HERE, "AP-prokrast-15c_farbleiter-abnahme-board.html")

# ============================================================
# FARBMATHEMATIK (reines Standard-Python, keine externen Libs)
# OKLab/OKLCH nach Bjoern Ottosson
# ============================================================

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(r, g, b):
    return "#{:02X}{:02X}{:02X}".format(r, g, b)

def srgb_to_linear(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def linear_to_srgb_channel(c):
    v = 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055
    return v

def hex_to_linrgb(h):
    r, g, b = hex_to_rgb(h)
    return srgb_to_linear(r), srgb_to_linear(g), srgb_to_linear(b)

def linrgb_to_oklab(r, g, b):
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = l ** (1/3), m ** (1/3), s ** (1/3)
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    return L, a, bb

def oklab_to_linrgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, bb

def hex_to_oklch(h):
    L, a, b = linrgb_to_oklab(*hex_to_linrgb(h))
    C = math.hypot(a, b)
    H = math.degrees(math.atan2(b, a)) % 360.0
    return L, C, H

def _linrgb_in_gamut(r, g, b, eps=1e-4):
    return all(-eps <= v <= 1 + eps for v in (r, g, b))

def oklch_to_hex(L, C, H):
    """OKLCH -> sRGB-Hex mit Gamut-Sicherung durch binaere Chroma-Reduktion.
    Rueckgabe: (hex, chroma_reduziert_bool)."""
    rad = math.radians(H)
    a0, b0 = math.cos(rad), math.sin(rad)

    def to_lin(chroma):
        return oklab_to_linrgb(L, chroma * a0, chroma * b0)

    reduced = False
    r, g, b = to_lin(C)
    if not _linrgb_in_gamut(r, g, b):
        reduced = True
        lo, hi = 0.0, C
        for _ in range(60):  # binaere Suche auf max. in-gamut Chroma
            mid = (lo + hi) / 2
            if _linrgb_in_gamut(*to_lin(mid)):
                lo = mid
            else:
                hi = mid
        r, g, b = to_lin(lo)

    # harte Klemmung nur als numerischer Rand nach Gamut-Reduktion (< 1 LSB)
    ch = []
    for v in (r, g, b):
        s = linear_to_srgb_channel(min(1.0, max(0.0, v)))
        ch.append(int(round(min(1.0, max(0.0, s)) * 255)))
    return rgb_to_hex(*ch), reduced

# ============================================================
# WCAG-KONTRAST (relative Luminanz, WCAG 2.x)
# ============================================================

def rel_luminance(h):
    r, g, b = hex_to_linrgb(h)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast(h1, h2):
    L1, L2 = rel_luminance(h1), rel_luminance(h2)
    hi, lo = max(L1, L2), min(L1, L2)
    return (hi + 0.05) / (lo + 0.05)

def classify(hexval):
    c_white = contrast(hexval, WHITE)
    c_text = contrast(TEXT_DARK, hexval)   # dunkler Text auf der Stufe
    c_wtext = contrast(WHITE, hexval)      # weisser Text auf der Stufe
    if c_wtext >= 4.5 or c_text >= 4.5:
        cls = "textfaehig"
    elif c_white >= 3 or c_wtext >= 3 or c_text >= 3:
        cls = "UI/Non-Text"
    else:
        cls = "nur Flaeche"
    return cls

# ============================================================
# IST-WERT-EXTRAKTION screen.css (read-only)
# ============================================================

def extract_screen_css_colors():
    with open(SCREEN_CSS, "r", encoding="utf-8") as f:
        txt = f.read()
    root = re.search(r":root\s*\{(.*?)\}", txt, re.S)
    block = root.group(1) if root else txt
    found = {}
    for m in re.finditer(r"(--color-[a-z0-9\-]+)\s*:\s*([^;]+);", block):
        found[m.group(1).strip()] = m.group(2).strip()
    return found

def check_mixing_law(seed_hex, variant_hex, frac=0.8):
    """Prueft ob variant = frac*Farbe + (1-frac)*Weiss (lineare Weissmischung im sRGB-8bit-Raum)."""
    sr, sg, sb = hex_to_rgb(seed_hex)
    pred = tuple(int(round(frac * c + (1 - frac) * 255)) for c in (sr, sg, sb))
    pred_hex = rgb_to_hex(*pred)
    return pred_hex, (pred_hex.upper() == variant_hex.upper())

# ============================================================
# LEITER-GENERIERUNG
# ============================================================

def damping(stage, pin):
    """Gleitender Daempfungsfaktor pro Richtung: 1.0 am Pin -> DAMP_AT_END am jeweiligen Leiter-Ende."""
    i = STAGES.index(stage)
    p = STAGES.index(pin)
    if i == p:
        return DAMP_AT_PIN
    if i < p:  # hellere Seite -> Ende ist Index 0
        frac = (p - i) / (p - 0)
    else:      # dunklere Seite -> Ende ist letzter Index
        frac = (i - p) / (len(STAGES) - 1 - p)
    return DAMP_AT_PIN - (DAMP_AT_PIN - DAMP_AT_END) * frac

def generate_family(name):
    seed_hex, ref, ref_name, pin = SEEDS[name]
    seedL, seedC, seedH = hex_to_oklch(seed_hex)
    ref_oklch = {st: hex_to_oklch(ref[st]) for st in STAGES}
    ratio = seedC / ref_oklch[pin][1]  # Chroma-Ratio am Pin

    ladder = {}
    meta = {}
    for st in STAGES:
        if st == pin:
            L, C, H = seedL, seedC, seedH
            hexval, reduced = seed_hex.upper(), False
        else:
            L = ref_oklch[st][0]                       # Tailwind-L dieser Stufe
            damp = damping(st, pin)
            C = ref_oklch[st][1] * ratio * damp        # skaliert auf Seed-Niveau, gedaempft
            H = seedH                                  # Hue konstant = Seed-Hue
            hexval, reduced = oklch_to_hex(L, C, H)
        outL, outC, outH = hex_to_oklch(hexval)
        ladder[st] = hexval
        meta[st] = {
            "L_target": L, "C_target": C, "H": H,
            "L_out": outL, "C_out": outC,
            "reduced": reduced,
            "c_white": contrast(hexval, WHITE),
            "c_faint": contrast(hexval, FAINT),
            "c_darktext": contrast(TEXT_DARK, hexval),
            "c_whitetext": contrast(WHITE, hexval),
            "class": classify(hexval),
            "is_pin": st == pin,
        }
    return {"seed": seed_hex.upper(), "ref_name": ref_name, "pin": pin,
            "ratio": ratio, "seedLCH": (seedL, seedC, seedH),
            "ladder": ladder, "meta": meta}

def calibrate_pin(name):
    """Ermittelt den Tailwind-Slot, dessen OKLCH-L dem Seed-L am naechsten ist."""
    seed_hex, ref, ref_name, expected = SEEDS[name]
    seedL = hex_to_oklch(seed_hex)[0]
    best, bestd = None, 1e9
    dists = {}
    for st in STAGES:
        d = abs(hex_to_oklch(ref[st])[0] - seedL)
        dists[st] = d
        if d < bestd:
            best, bestd = st, d
    return {"seedL": seedL, "best_slot": best, "expected": expected,
            "match": best == expected, "dists": dists, "ref_name": ref_name}

# ============================================================
# BOARD-HTML (autark, programmatisch erzeugt)
# ============================================================

def swatch(hexval, label_top, label_bottom="", star=False, placeholder=False):
    lum = rel_luminance(hexval)
    fg = "#111111" if lum > 0.35 else "#FFFFFF"
    if placeholder:
        return ('<div class="sw ph"><div class="sw-lab-top">{}</div>'
                '<div class="sw-lab-bot">—</div></div>').format(label_top)
    star_html = '<span class="star">★</span>' if star else ""
    return ('<div class="sw" style="background:{bg};color:{fg}">'
            '<div class="sw-lab-top">{top}{star}</div>'
            '<div class="sw-lab-bot">{bot}</div></div>').format(
        bg=hexval, fg=fg, top=label_top, star=star_html, bot=label_bottom)

def build_board(families, calib, ist):
    css = """
*{box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
     margin:0;padding:24px;background:#ffffff;color:#272727;line-height:1.4}
h1{font-size:22px;margin:0 0 4px}
h2{font-size:17px;margin:28px 0 8px;border-bottom:2px solid #E7ECEF;padding-bottom:4px}
h3{font-size:14px;margin:16px 0 6px;color:#4C4C4C}
.note{background:#FAFAFA;border:1px solid #E7ECEF;border-radius:8px;padding:10px 14px;margin:8px 0;font-size:13px}
.warn{background:#fff8f8;border:1px solid #c62828;border-left:4px solid #c62828;border-radius:6px;
      padding:8px 12px;margin:6px 0;font-size:13px;color:#b71c1c}
.row{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 2px}
.sw{width:104px;height:78px;border-radius:6px;border:1px solid rgba(0,0,0,0.12);
    padding:6px 7px;display:flex;flex-direction:column;justify-content:space-between;font-size:11px;overflow:hidden}
.sw.ph{background:repeating-linear-gradient(45deg,#f3f3f3,#f3f3f3 6px,#eaeaea 6px,#eaeaea 12px);
       color:#999;border-style:dashed}
.sw-lab-top{font-weight:700;font-size:12px}
.sw-lab-bot{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;opacity:0.9}
.star{margin-left:3px}
.contrast{font-family:ui-monospace,Consolas,monospace;font-size:10px;color:#666;margin:2px 0 10px}
.legend{font-size:12px;color:#666;margin:2px 0 14px}
.demorow{display:flex;flex-wrap:wrap;gap:16px;margin:10px 0}
.box{width:320px;max-width:100%;border-radius:10px;padding:14px 16px;font-size:14px}
.box .icon{display:inline-block;width:20px;height:20px;border-radius:50%;
     text-align:center;line-height:20px;font-weight:700;margin-right:8px;vertical-align:middle}
.btn{display:inline-block;padding:10px 18px;border-radius:8px;color:#fff;font-weight:700;font-size:14px}
.abnahme{margin-top:36px;background:#FAFAFA;border:2px solid #218380;border-radius:10px;padding:18px 22px}
.abnahme h2{border:none;margin-top:0}
.path{display:flex;gap:16px;flex-wrap:wrap;margin-top:10px}
.path .opt{flex:1;min-width:260px;border:1px solid #E7ECEF;border-radius:8px;padding:12px 14px;background:#fff}
code{font-family:ui-monospace,Consolas,monospace;background:#f3f3f3;padding:1px 4px;border-radius:3px}
"""

    def contrast_line(fam, st):
        m = families[fam]["meta"][st]
        return "vsWeiß {:.2f} · Text#272727 {:.2f} · WeißText {:.2f} · [{}]".format(
            m["c_white"], m["c_darktext"], m["c_whitetext"], m["class"])

    parts = []
    parts.append("<h1>Finanzwesir CI — Farbleiter-Abnahme-Board</h1>")
    parts.append('<div class="note"><b>Zweck:</b> Dieses Board beurteilt die <b>Farben</b> '
                 '(Leitern 50–900, Praxiswirkung, Kontrast) — <b>nicht</b> die CI-Typografie. '
                 'Es nutzt bewusst den System-Font, damit keine Schrift-Anmutung von der Farbbeurteilung ablenkt. '
                 'Alle generierten Werte sind <b>VORLÄUFIG</b> bis zu deiner Freigabe.</div>')
    parts.append('<div class="note"><b>Methodik (Kontrakt §4.3, Strategie B):</b> Seeds hex-exakt gepinnt · '
                 'OKLCH-generiert · L je Stufe aus gleichfarbiger Tailwind-Familie · Hue = Seed-Hue · '
                 'Chroma = Tailwind-Chroma × Ratio-am-Pin × gleitende Dämpfung (1,0 am Pin → {:.2f} an den Enden) · '
                 'Gamut-gesichert.</div>'.format(DAMP_AT_END))

    # Warnhinweise
    parts.append('<div class="warn">Petrol-Vollton unter weißem Text nur knapp AA (4,54:1) — nie aufhellen.</div>')
    parts.append('<div class="warn">Gelb-Stufen unter 600 nie als Textfarbe (Vollton 1,69:1).</div>')
    parts.append('<div class="warn">Purpur 300–600 = Data-Viz-Reserve (Pink-Risiko), nicht als UI-Flächen/Text.</div>')

    order = ["petrol", "gelb", "purpur"]
    ist_slots = {
        "petrol": {"600": ist.get("--color-petrol"), "500": ist.get("--color-petrol-80"),
                   "400": ist.get("--color-petrol-50"), "200": ist.get("--color-petrol-20")},
        "gelb": {"500": ist.get("--color-gelb"), "?": ist.get("--color-gelb-80")},
        "purpur": {"900": ist.get("--color-purpur"), "?": ist.get("--color-purpur-80")},
    }
    for fam in order:
        F = families[fam]
        cal = calib[fam]
        parts.append("<h2>{} — Seed ★{}-{} = <code>{}</code> · kalibriert gegen Tailwind-{}</h2>".format(
            fam.capitalize(), fam, F["pin"], F["seed"], F["ref_name"]))

        # ALT (Bestand) an gemessenen Slots
        parts.append('<h3>ALT (Bestand aus screen.css, an gemessenen Slot-Positionen)</h3>')
        parts.append('<div class="row">')
        alt = ist_slots[fam]
        for st in STAGES:
            key = str(st)
            if key in alt and alt[key]:
                parts.append(swatch(alt[key], key, alt[key].upper(), star=(st == F["pin"])))
            else:
                parts.append(swatch("#000000", key, placeholder=True))
        # Sonderfall gelb/purpur -80 ohne festen Slot
        if fam in ("gelb", "purpur") and alt.get("?"):
            parts.append(swatch(alt["?"], "-80", alt["?"].upper()))
        parts.append('</div>')
        parts.append('<div class="legend">Lücken = Stufen, die im Altsystem nie existierten. '
                     'Bei gelb/purpur folgte <code>-80</code> nicht dem Weißmisch-Gesetz (handgewählt).</div>')

        # NEU (generiert)
        parts.append('<h3>NEU (generiert, VORLÄUFIG)</h3>')
        parts.append('<div class="row">')
        for st in STAGES:
            m = F["meta"][st]
            parts.append(swatch(F["ladder"][st], str(st), F["ladder"][st], star=m["is_pin"]))
        parts.append('</div>')
        # Kontrast-Zeilen kompakt
        for st in STAGES:
            parts.append('<div class="contrast">{}: {}</div>'.format(st, contrast_line(fam, st)))

    # Blau
    parts.append("<h2>Blau — nur Seed (keine Ramp, E2)</h2>")
    parts.append('<div class="row">')
    parts.append(swatch(BLAU_SEED[0], "blau-700", BLAU_SEED[0].upper(), star=True))
    parts.append('</div>')
    parts.append('<div class="legend">Blau ist im UI exklusiv Linkfarbe; in Data-Viz frei. Keine Leiter, solange kein Konsument existiert.</div>')

    # Neutral + Error
    parts.append("<h2>Neutral-Familie (Bestand, unverändert)</h2>")
    parts.append('<div class="row">')
    for name, hx in NEUTRAL:
        parts.append(swatch(hx, name.replace("--color-", ""), hx.upper()))
    parts.append('</div>')
    parts.append("<h2>Error-Set (zentralisiert, Bestand)</h2>")
    parts.append('<div class="row">')
    for name, hx in ERROR_SET:
        parts.append(swatch(hx, name.replace("--color-", ""), hx.upper()))
    parts.append('</div>')

    # Praxisbeispiele
    p = families["petrol"]["ladder"]
    pu = families["purpur"]["ladder"]
    ge = families["gelb"]["ladder"]
    parts.append("<h2>Praxisbeispiele (mit generierten Werten)</h2>")
    parts.append('<div class="demorow">')
    parts.append('<div class="box" style="background:{bg};border:1px solid {bd}">'
                 '<span class="icon" style="background:{seed};color:#fff">i</span>'
                 '<b>Info / Merke.</b> Diese Info-Box nutzt petrol-100 als Fläche und den Petrol-Seed als Border.'
                 '</div>'.format(bg=p[100], bd=families["petrol"]["ladder"][200], seed=families["petrol"]["seed"]))
    parts.append('<div class="box" style="background:{bg};border-left:4px solid {seed};border:1px solid {bd}">'
                 '<span class="icon" style="background:{seed};color:#fff">!</span>'
                 '<b>Achtung / Vorsicht.</b> Redaktionelle Warnung (Markenstimme) — trägt nur mit Icon + Text.'
                 '</div>'.format(bg=pu[100], bd=pu[200], seed=families["purpur"]["seed"]))
    parts.append('<div class="box" style="background:{bg};border-left:4px solid {seed};border:1px solid {bd}">'
                 '<b>Merksatz.</b> Gelb-100-Fläche mit Gelb-Seed-Border. Gelb nie als Textfarbe.'
                 '</div>'.format(bg=ge[100], bd=ge[200], seed=families["gelb"]["seed"]))
    parts.append('</div>')
    parts.append('<div class="demorow">')
    parts.append('<div><div class="btn" style="background:{seed}">Primary-Button</div>'
                 '<div class="legend">petrol-Seed, weißer Text (4,54:1 — AA knapp)</div></div>'.format(
                     seed=families["petrol"]["seed"]))
    parts.append('<div class="box" style="background:{bg};border:1px solid {bd};color:{tx}">'
                 '<b>Fehler:</b> Eingabe ungültig. (Error-Set: bg {bg}, border {bd}, text {tx})'
                 '</div>'.format(bg="#fff8f8", bd="#c62828", tx="#b71c1c"))
    parts.append('<div><span style="color:{link};text-decoration:underline;font-weight:600">Ein Text-Link (Blau)</span>'
                 ' &nbsp; <span style="color:{vis};text-decoration:underline">besuchter Link (Purpur)</span></div>'.format(
                     link=BLAU_SEED[0], vis=families["purpur"]["seed"]))
    parts.append('</div>')

    # Abnahme-Block
    parts.append('<div class="abnahme">')
    parts.append("<h2>Abnahme — deine Entscheidung</h2>")
    parts.append('<p><b>Diese Hexwerte festschreiben?</b> Die Leitern sind rechnerisch nach der '
                 'im Kontrakt fixierten Methodik erzeugt und gamut-gesichert. Bildschirm, Umfeld und '
                 'Nachbarfarben entscheiden mit — die Rechnung ersetzt kein Auge.</p>')
    parts.append('<div class="path">')
    parts.append('<div class="opt"><b>① FESTSCHREIBEN → AP-16</b><br>'
                 'Werte übernehmen, Migration (tokens.css + screen.css + FwTheme-Bridge + Plugin-Fixes) starten. '
                 'Vorher Browser-Stichprobe der Ghost-Live-Kette.</div>')
    parts.append('<div class="opt"><b>② NACHJUSTIEREN</b><br>'
                 'Chroma-Dämpfungsfaktor ändern (aktuell <code>DAMP_AT_END = {:.2f}</code>, ~50 %-Niveau am Pin) — '
                 'Neugenerierung ist <b>ein</b> Skript-Lauf: <code>python AP-prokrast-15c_farbleiter_generator.py</code>.</div>'.format(DAMP_AT_END))
    parts.append('</div></div>')

    html = ("<!DOCTYPE html><html lang='de'><head><meta charset='utf-8'>"
            "<meta name='viewport' content='width=device-width, initial-scale=1'>"
            "<title>Finanzwesir CI — Farbleiter-Abnahme</title><style>{}</style></head>"
            "<body>{}</body></html>").format(css, "\n".join(parts))
    return html

# ============================================================
# HAUPTLAUF
# ============================================================

def main():
    print("=" * 64)
    print("AP-prokrast-15c — Farbleiter-Generator (Strategie B)")
    print("=" * 64)

    # 1. Ist-Werte screen.css
    ist = extract_screen_css_colors()
    print("\n[1] IST-WERTE screen.css (:root) — Brand-Farben")
    for k in ("--color-petrol","--color-petrol-80","--color-petrol-50","--color-petrol-20",
              "--color-blau","--color-gelb","--color-gelb-80","--color-purpur","--color-purpur-80"):
        print("    {:<22} {}".format(k, ist.get(k, "<fehlt>")))

    print("\n[1b] MISCHGESETZ-CHECK (-80 = 80% Farbe + 20% Weiss)")
    for fam, seedkey, vkey in (("petrol","--color-petrol","--color-petrol-80"),
                               ("gelb","--color-gelb","--color-gelb-80"),
                               ("purpur","--color-purpur","--color-purpur-80")):
        pred, ok = check_mixing_law(ist[seedkey], ist[vkey])
        print("    {:<7} real {:<9} vorhergesagt {:<9} -> {}".format(
            fam, ist[vkey].upper(), pred, "FOLGT Gesetz" if ok else "FOLGT NICHT"))
    # Rueckklkapsel-Ableitungen gegenpruefen
    print("    Ruecklaufkapsel-Ableitung gelb-80=#E5D337 / purpur-80=#A43585 vs. real:")
    print("      gelb-80  real={}  Ableitung={}  -> {}".format(
        ist["--color-gelb-80"].upper(), "#E5D337", "ABWEICHUNG" if ist["--color-gelb-80"].upper()!="#E5D337" else "gleich"))
    print("      purpur-80 real={} Ableitung={}  -> {}".format(
        ist["--color-purpur-80"].upper(), "#A43585", "ABWEICHUNG" if ist["--color-purpur-80"].upper()!="#A43585" else "gleich"))

    # 2. Kalibrierung
    print("\n[2] PIN-KALIBRIERUNG (Seed-L vs. Tailwind-Familien-L)")
    calib = {}
    for fam in ("petrol","gelb","purpur"):
        c = calibrate_pin(fam)
        calib[fam] = c
        print("    {:<7} SeedL={:.4f} gegen {:<7} -> best-Slot {} (erwartet {}) {}".format(
            fam, c["seedL"], c["ref_name"], c["best_slot"], c["expected"],
            "BESTAETIGT" if c["match"] else "*** ABWEICHUNG ***"))

    # 3. Generierung
    print("\n[3] LEITER-GENERIERUNG")
    families = {}
    any_reduced = False
    for fam in ("petrol","gelb","purpur"):
        F = generate_family(fam)
        families[fam] = F
        print("\n  {} (Seed {} @ {}, ratio={:.4f})".format(fam, F["seed"], F["pin"], F["ratio"]))
        print("    {:>4} {:>8} {:>7} {:>7} {:>8} {:>8} {:>8} {:>9} {}".format(
            "St","Hex","L","C","vsWeiß","vsFaint","Txt#272","WeißTxt","Klasse"))
        for st in STAGES:
            m = F["meta"][st]
            mark = " <SEED>" if m["is_pin"] else (" <gamut↓>" if m["reduced"] else "")
            any_reduced = any_reduced or m["reduced"]
            print("    {:>4} {:>8} {:>7.3f} {:>7.3f} {:>8.2f} {:>8.2f} {:>8.2f} {:>9.2f}  {}{}".format(
                st, F["ladder"][st], m["L_out"], m["C_out"], m["c_white"], m["c_faint"],
                m["c_darktext"], m["c_whitetext"], m["class"], mark))

    print("\n  Blau: nur Seed {} @ 700 (keine Leiter)".format(BLAU_SEED[0]))

    # 4. Board schreiben
    html = build_board(families, calib, ist)
    with open(BOARD_OUT, "w", encoding="utf-8") as f:
        f.write(html)
    print("\n[4] Board geschrieben: {}".format(os.path.basename(BOARD_OUT)))

    # 5. QA
    print("\n[5] NACHWEIS-QA")
    # Seed-QA
    seed_ok = (families["petrol"]["ladder"][600] == "#218380"
               and families["gelb"]["ladder"][500] == "#DFC805"
               and families["purpur"]["ladder"][900] == "#8D0267")
    print("    Seed-QA (byte-identisch an 600/500/900): {}".format("OK" if seed_ok else "FAIL"))
    # Vollstaendigkeit
    complete = all(len(families[f]["ladder"]) == 10 for f in families)
    print("    Vollstaendigkeit (je 10 Stufen): {}".format("OK" if complete else "FAIL"))
    # Format
    fmt = re.compile(r"^#[0-9A-F]{6}$")
    all_hex = [families[f]["ladder"][st] for f in families for st in STAGES]
    fmt_ok = all(fmt.match(h) for h in all_hex)
    print("    Format-QA (^#[0-9A-F]{{6}}$): {}".format("OK" if fmt_ok else "FAIL"))
    print("    Gamut-Eingriffe (Chroma-Reduktion, kein Kanal-Clamping): {}".format(
        "ja (dokumentiert)" if any_reduced else "keine"))
    # Board-Autarkie
    with open(BOARD_OUT, "r", encoding="utf-8") as f:
        board_txt = f.read()
    autark = ("http" not in board_txt) and ("//" not in board_txt.replace("<!DOCTYPE","").replace("lang='de'",""))
    # robuster: nur externe Ressourcen-Marker pruefen
    ext_markers = ["http://","https://","cdn.","googleapis","<link","<script"]
    ext_hits = [mk for mk in ext_markers if mk in board_txt]
    print("    Board-Autarkie (keine externen Ressourcen): {} {}".format(
        "OK" if not ext_hits else "PRUEFEN", ext_hits if ext_hits else ""))

    print("\nFertig.")

if __name__ == "__main__":
    main()
