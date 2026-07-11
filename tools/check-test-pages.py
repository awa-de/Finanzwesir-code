#!/usr/bin/env python
"""
tools/check-test-pages.py

Read-only Python-Strukturchecker fuer dauerhafte Testseiten
(docs/testing/TEST_PAGE_STANDARD.md).

Prueft AUSSCHLIESSLICH Struktur: Ablage, Template-Marker, Shared-CSS/JS-Einbindung,
Testfall-/Erwartungsblock-Struktur, Ghost-Card-Vertrag, lokale Referenzen,
Case-Sensitivitaet, verbotene externe Script-/Stylesheet-Abhaengigkeiten, exakte
Dateidubletten und Launcher-Erzeugbarkeit.

Bewertet NIEMALS, ob eine App oder ein Chart fachlich oder visuell korrekt
funktioniert. "Testseite strukturell korrekt" ist die einzige zulaessige Erfolgsaussage.

Nur Python-Standardbibliothek. Kein Drittanbieter-Paket, keine Netzwerkzugriffe.

Nutzung:
    python tools/check-test-pages.py                 # nur pruefen (read-only)
    python tools/check-test-pages.py --write-index    # pruefen + tests/index.html erzeugen
"""

from __future__ import annotations

import hashlib
import os
import re
import sys
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterator, List, Optional, Tuple, Union

# ---------------------------------------------------------------------------
# Minimaler DOM-Baum (nur Python-Standardbibliothek, kein BeautifulSoup/lxml)
# ---------------------------------------------------------------------------

VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}


class Node:
    __slots__ = ("tag", "attrs", "children", "parent")

    def __init__(self, tag: str, attrs: dict, parent: Optional["Node"] = None):
        self.tag = tag
        self.attrs = attrs
        self.children: List[Union["Node", str]] = []
        self.parent = parent


class DomBuilder(HTMLParser):
    """Nachsichtiger HTML-Parser: baut einen minimalen Baum aus Node/str-Kindern.
    Toleriert unausgewogene Tags (reale Altbestands-Testseiten sind nicht immer
    striktes XHTML) -- fehlende schliessende Tags werden ignoriert, kein Absturz."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#document", {})
        self.stack: List[Node] = [self.root]

    def handle_starttag(self, tag: str, attrs):
        node = Node(tag, dict(attrs), self.stack[-1])
        self.stack[-1].children.append(node)
        if tag not in VOID_ELEMENTS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs):
        node = Node(tag, dict(attrs), self.stack[-1])
        self.stack[-1].children.append(node)

    def handle_endtag(self, tag: str):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return
        # Kein passendes offenes Tag gefunden -- nachsichtig ignorieren.

    def handle_data(self, data: str):
        if self.stack:
            self.stack[-1].children.append(data)


def iter_descendants(node: Node) -> Iterator[Node]:
    for child in node.children:
        if isinstance(child, Node):
            yield child
            yield from iter_descendants(child)


def visible_text(node: Node) -> str:
    """Sichtbarer Text eines Knotens -- rekursiv, aber OHNE script/style-Inhalte."""
    parts: List[str] = []

    def walk(n: Node):
        for child in n.children:
            if isinstance(child, str):
                parts.append(child)
            elif isinstance(child, Node) and child.tag not in ("script", "style"):
                walk(child)

    walk(node)
    return "".join(parts).strip()


def has_attr(node: Node, name: str) -> bool:
    return name in node.attrs


def get_attr(node: Node, name: str, default=None):
    return node.attrs.get(name, default)


def get_class_tokens(node: Node) -> set:
    cls = node.attrs.get("class") or ""
    return set(cls.split())


def parse_html(raw: str) -> Node:
    parser = DomBuilder()
    parser.feed(raw)
    return parser.root


# ---------------------------------------------------------------------------
# Referenzaufloesung: case-sensitiver, repo-begrenzter Pfadcheck
# ---------------------------------------------------------------------------

def split_query_fragment(ref: str) -> str:
    return ref.split("#", 1)[0].split("?", 1)[0]


def is_absolute_url(ref: str) -> bool:
    return ref.startswith("http://") or ref.startswith("https://")


def resolve_local_ref(root: Path, base_dir: Path, ref: str):
    """Loest eine lokale (nicht-absolute) Referenz case-sensitiv gegen den realen
    Dateibaum auf, unabhaengig vom Betriebssystem (auch unter Windows case-sensitiv).
    Rueckgabe: ('ok', Path) | ('not_found', Path) | ('escapes_repo', Path)
             | ('case_mismatch', Path, real_name)"""
    combined = Path(os.path.normpath(str(base_dir / ref)))
    try:
        rel = combined.relative_to(root)
    except ValueError:
        return ("escapes_repo", combined)

    current = root
    for part in rel.parts:
        if not current.is_dir():
            return ("not_found", combined)
        try:
            real_entries = {p.name for p in current.iterdir()}
        except OSError:
            return ("not_found", combined)
        if part in real_entries:
            current = current / part
            continue
        lower_map = {}
        for name in real_entries:
            lower_map.setdefault(name.lower(), name)
        if part.lower() in lower_map:
            return ("case_mismatch", combined, lower_map[part.lower()])
        return ("not_found", combined)

    if not current.exists():
        return ("not_found", combined)
    return ("ok", current)


# ---------------------------------------------------------------------------
# Struktur-Pruefungen einer einzelnen Testseite
# ---------------------------------------------------------------------------

def check_loadable_ref(root: Path, base_dir: Path, ref: str, label: str) -> List[str]:
    """Prueft <script src> / <link href stylesheet>: keine externen URLs (§24),
    lokale Referenzen muessen existieren und case-korrekt sein (§23)."""
    findings: List[str] = []
    clean = split_query_fragment(ref)
    if clean == "":
        findings.append(f"{label}: leere Referenz ist nicht zulaessig.")
        return findings
    if is_absolute_url(clean):
        findings.append(
            f"{label}: absolute URL '{ref}' nicht erlaubt -- nur repository-relative "
            f"oder lokale Pfade (bekannte Regressionen: cdn.jsdelivr.net, cdn.tailwindcss.com)."
        )
        return findings
    status, resolved, *extra = resolve_local_ref(root, base_dir, clean)
    if status == "escapes_repo":
        findings.append(f"{label}: Referenz '{ref}' verlaesst das Repository.")
    elif status == "case_mismatch":
        findings.append(
            f"{label}: Referenz '{ref}' hat falsche Gross-/Kleinschreibung "
            f"(real vorhanden: '{extra[0]}')."
        )
    elif status == "not_found":
        findings.append(f"{label}: referenzierte Datei '{ref}' existiert nicht.")
    return findings


def check_data_ref(root: Path, base_dir: Path, ref: str, attr_name: str) -> List[str]:
    """Prueft data-fw-data / data-fw-config / data-csv: absolute Daten-URLs sind
    zulaessig und werden nicht lokal geprueft (APP-INTERFACE.md bleibt kanonisch)."""
    findings: List[str] = []
    clean = split_query_fragment(ref)
    if clean == "":
        findings.append(f"{attr_name}: leere Referenz ist nicht zulaessig.")
        return findings
    if is_absolute_url(clean):
        return findings
    status, resolved, *extra = resolve_local_ref(root, base_dir, clean)
    if status == "escapes_repo":
        findings.append(f"{attr_name}: Referenz '{ref}' verlaesst das Repository.")
    elif status == "case_mismatch":
        findings.append(
            f"{attr_name}: Referenz '{ref}' hat falsche Gross-/Kleinschreibung "
            f"(real vorhanden: '{extra[0]}')."
        )
    elif status == "not_found":
        findings.append(f"{attr_name}: referenzierte Datei '{ref}' existiert nicht.")
    return findings


def validate_references(root: Path, path: Path, dom: Node, exempt: frozenset = frozenset()) -> List[str]:
    """exempt: Menge aus (id(node), attr_name) -- vom Marker data-fw-test-allow-missing-ref
    testfalllokal geprueft und explizit zugelassen (§10.1 TEST_PAGE_STANDARD.md)."""
    findings: List[str] = []
    base_dir = path.parent

    for n in iter_descendants(dom):
        if n.tag == "script":
            src = get_attr(n, "src")
            if src is not None:
                findings.extend(check_loadable_ref(root, base_dir, src, "<script src>"))
        elif n.tag == "link":
            rel = (get_attr(n, "rel") or "").lower()
            href = get_attr(n, "href")
            if href is not None and "stylesheet" in rel.split():
                findings.extend(check_loadable_ref(root, base_dir, href, "<link href> (stylesheet)"))

    for n in iter_descendants(dom):
        for attr_name in ("data-fw-data", "data-fw-config", "data-csv"):
            if attr_name in n.attrs:
                if (id(n), attr_name) in exempt:
                    continue
                val = n.attrs.get(attr_name)
                if val is not None:
                    findings.extend(check_data_ref(root, base_dir, val, attr_name))

    return findings


MISSING_REF_ATTR = "data-fw-test-allow-missing-ref"
LOCAL_DATA_ATTRS = ("data-fw-data", "data-fw-config", "data-csv")

# TESTENV-1eB: Marker fuer bewusst fehlendes Pflichtattribut data-fw-app (kein
# Datei-/Pfad-Bezug, deshalb kein Wertevergleich wie bei MISSING_REF_ATTR --
# reine Praesenzpruefung mit 3 harten Gueltigkeitsbedingungen, siehe
# docs/testing/TEST_PAGE_STANDARD.md §10.2).
MISSING_APP_ID_ATTR = "data-fw-test-allow-missing-app-id"


def find_local_data_refs_in_case(case: Node) -> List[Tuple[Node, str, str]]:
    """Alle lokalen Card-Datenreferenzen (Attributname, Rohwert) innerhalb eines Testfalls."""
    results: List[Tuple[Node, str, str]] = []
    for n in iter_descendants(case):
        for attr_name in LOCAL_DATA_ATTRS:
            if attr_name in n.attrs:
                val = n.attrs.get(attr_name)
                if val is not None:
                    results.append((n, attr_name, val))
    return results


def validate_allow_missing_markers(
    root: Path, path: Path, dom: Node, test_cases: List[Node]
) -> Tuple[List[str], frozenset]:
    """§10.1 TEST_PAGE_STANDARD.md: data-fw-test-allow-missing-ref testfalllokal pruefen.
    Rueckgabe: (Findings, exempt-Menge aus (id(node), attr_name) fuer validate_references)."""
    findings: List[str] = []
    exempt: set = set()

    test_case_ids = {id(c) for c in test_cases}
    marker_nodes = [n for n in iter_descendants(dom) if has_attr(n, MISSING_REF_ATTR)]

    for n in marker_nodes:
        if id(n) not in test_case_ids:
            findings.append(
                f"{MISSING_REF_ATTR} darf nur auf einem Element mit data-fw-test-case stehen."
            )

    for idx, case in enumerate(test_cases, start=1):
        if not has_attr(case, MISSING_REF_ATTR):
            continue
        label = f"Testfall #{idx}"

        raw_marker = get_attr(case, MISSING_REF_ATTR)
        marker_value = (raw_marker or "").strip()

        if marker_value == "":
            findings.append(f"{label}: {MISSING_REF_ATTR} ist leer.")
            continue

        clean_marker = split_query_fragment(marker_value)
        if is_absolute_url(clean_marker):
            findings.append(f"{label}: absolute Daten-URL darf nicht als fehlende lokale Referenz markiert werden.")
            continue

        refs = find_local_data_refs_in_case(case)
        matching = [(n, attr_name, val) for (n, attr_name, val) in refs if (val or "").strip() == marker_value]

        if len(matching) == 0:
            findings.append(
                f"{label}: markierte fehlende Referenz '{marker_value}' wird in diesem Testfall nicht verwendet."
            )
            continue
        if len(matching) > 1:
            findings.append(
                f"{label}: markierte Referenz '{marker_value}' kommt in diesem Testfall mehrfach vor."
            )
            continue

        node, attr_name, _val = matching[0]
        status, _resolved = resolve_local_ref(root, path.parent, clean_marker)[:2]
        if status == "ok":
            findings.append(f"{label}: markierte Referenz '{marker_value}' existiert real; Ausnahme entfernen.")
            continue
        if status != "not_found":
            # case_mismatch / escapes_repo sind andere Probleme als "existiert bewusst nicht" --
            # keine Ausnahme, normale Referenzpruefung meldet den passenden Befund.
            continue

        exempt.add((id(node), attr_name))

    return findings, frozenset(exempt)


def validate_allow_missing_app_id_markers(
    dom: Node, test_cases: List[Node]
) -> Tuple[List[str], frozenset]:
    """TESTENV-1eB, TEST_PAGE_STANDARD.md §10.2: MISSING_APP_ID_ATTR testfalllokal
    pruefen. Erlaubt ausschliesslich, dass eine .fw-app in diesem Testfall bewusst
    kein (oder ein leeres) data-fw-app traegt -- kein generisches Capability-System,
    kein Wertevergleich (reine Praesenzpruefung, anders als MISSING_REF_ATTR).
    Rueckgabe: (Findings, exempt-Menge aus id(node) der .fw-app, die von der
    "ohne data-fw-app"-Pruefung in validate_test_page ausgenommen wird)."""
    findings: List[str] = []
    exempt: set = set()

    test_case_ids = {id(c) for c in test_cases}
    marker_nodes = [n for n in iter_descendants(dom) if has_attr(n, MISSING_APP_ID_ATTR)]

    for n in marker_nodes:
        if id(n) not in test_case_ids:
            findings.append(
                f"{MISSING_APP_ID_ATTR} darf nur auf einem Element mit data-fw-test-case stehen."
            )

    for idx, case in enumerate(test_cases, start=1):
        if not has_attr(case, MISSING_APP_ID_ATTR):
            continue
        label = f"Testfall #{idx}"

        fw_apps = [n for n in iter_descendants(case) if "fw-app" in get_class_tokens(n)]
        if len(fw_apps) != 1:
            findings.append(
                f"{label}: {MISSING_APP_ID_ATTR} erfordert genau eine .fw-app in diesem "
                f"Testfall, gefunden: {len(fw_apps)}."
            )
            continue

        node = fw_apps[0]
        app_slug = get_attr(node, "data-fw-app")
        if app_slug:
            findings.append(
                f"{label}: {MISSING_APP_ID_ATTR} gesetzt, aber die .fw-app besitzt bereits "
                f"ein nicht-leeres data-fw-app='{app_slug}' -- Marker entfernen."
            )
            continue

        exempt.add(id(node))

    return findings, frozenset(exempt)


def validate_test_page(root: Path, path: Path, is_engine: bool = False) -> List[str]:
    """Vollstaendige Strukturpruefung einer einzelnen, an einem Standardort
    liegenden Testseite (docs/testing/TEST_PAGE_STANDARD.md §4/§5/§7/§8/§10/§12)."""
    findings: List[str] = []

    try:
        raw = path.read_text(encoding="utf-8")
    except Exception as e:
        return [f"Datei konnte nicht als UTF-8 gelesen werden: {e}"]

    try:
        dom = parse_html(raw)
    except Exception as e:
        return [f"HTML konnte nicht geparst werden: {e}"]

    # §22.1 -- Dokumentmarker
    bodies = [n for n in iter_descendants(dom) if n.tag == "body"]
    if len(bodies) != 1:
        findings.append(f"Erwartet genau ein <body>-Element, gefunden: {len(bodies)}.")
    else:
        body = bodies[0]
        marker = get_attr(body, "data-fw-test-template")
        if marker is None:
            findings.append("Attribut data-fw-test-template fehlt am <body>-Element.")
        elif marker != "1":
            findings.append(f"data-fw-test-template muss exakt '1' sein, gefunden: '{marker}'.")

    # §22.2 -- Shared CSS (genau ein Link auf tests/shared/test-page.css)
    css_target = (root / "tests" / "shared" / "test-page.css").resolve()
    matched_css = 0
    for n in iter_descendants(dom):
        if n.tag == "link":
            rel = (get_attr(n, "rel") or "").lower()
            href = get_attr(n, "href")
            if href and "stylesheet" in rel.split():
                clean = split_query_fragment(href)
                if not is_absolute_url(clean):
                    status, resolved = resolve_local_ref(root, path.parent, clean)[:2]
                    if status == "ok" and resolved.resolve() == css_target:
                        matched_css += 1
    if matched_css != 1:
        findings.append(
            f"Erwartet genau einen Stylesheet-Link auf tests/shared/test-page.css, "
            f"gefunden: {matched_css}."
        )

    # §22.3 -- Shared JavaScript (genau ein Script auf tests/shared/test-page.js)
    js_target = (root / "tests" / "shared" / "test-page.js").resolve()
    matched_js = 0
    for n in iter_descendants(dom):
        if n.tag == "script":
            src = get_attr(n, "src")
            if src:
                clean = split_query_fragment(src)
                if not is_absolute_url(clean):
                    status, resolved = resolve_local_ref(root, path.parent, clean)[:2]
                    if status == "ok" and resolved.resolve() == js_target:
                        matched_js += 1
    if matched_js != 1:
        findings.append(
            f"Erwartet genau ein Script auf tests/shared/test-page.js, gefunden: {matched_js}."
        )

    # §22.4 -- Testfaelle
    test_cases = [n for n in iter_descendants(dom) if has_attr(n, "data-fw-test-case")]
    if not test_cases:
        findings.append("Kein Element mit data-fw-test-case gefunden (mindestens ein Testfall erforderlich).")

    # §10.2 TEST_PAGE_STANDARD.md -- bewusst fehlendes data-fw-app (testfalllokal,
    # vor der Container-Pruefung berechnet, damit die Ausnahme dort greifen kann).
    app_id_findings, app_id_exempt = validate_allow_missing_app_id_markers(dom, test_cases)
    findings.extend(app_id_findings)

    for idx, case in enumerate(test_cases, start=1):
        label = f"Testfall #{idx}"

        headings = [n for n in iter_descendants(case) if n.tag in ("h2", "h3") and visible_text(n)]
        if not headings:
            findings.append(f"{label}: keine sichtbare Ueberschrift (h2/h3 mit Text) gefunden.")

        expected_blocks = [n for n in iter_descendants(case) if has_attr(n, "data-fw-expected-behavior")]
        if len(expected_blocks) != 1:
            findings.append(
                f"{label}: erwartet genau einen Block data-fw-expected-behavior, "
                f"gefunden: {len(expected_blocks)}."
            )
        else:
            eb = expected_blocks[0]
            text = visible_text(eb)
            items = [li for li in iter_descendants(eb) if li.tag == "li" and visible_text(li)]
            if not text or not items:
                findings.append(f"{label}: Erwartungsblock ist leer (kein sichtbarer Text bzw. kein nicht-leeres <li>).")

        # §22.5 -- Ghost-Cards
        kg_cards = [n for n in iter_descendants(case) if "kg-card" in get_class_tokens(n)]
        if not kg_cards:
            findings.append(f"{label}: keine .kg-card gefunden.")
        for kidx, card in enumerate(kg_cards, start=1):
            containers = [
                n for n in iter_descendants(card)
                if ("fw-app" in get_class_tokens(n)) or ("financial-chart-module" in get_class_tokens(n))
                or (is_engine and has_attr(n, "data-fw-appchart"))
            ]
            allowed_desc = (
                ".fw-app, .financial-chart-module oder [data-fw-appchart]" if is_engine
                else ".fw-app oder .financial-chart-module"
            )
            if len(containers) != 1:
                findings.append(
                    f"{label}, .kg-card #{kidx}: erwartet genau einen Produktionscontainer "
                    f"({allowed_desc}), gefunden: {len(containers)}."
                )
            else:
                container = containers[0]
                classes = get_class_tokens(container)
                if "fw-app" in classes:
                    app_slug = get_attr(container, "data-fw-app")
                    if not app_slug and id(container) not in app_id_exempt:
                        findings.append(f"{label}, .kg-card #{kidx}: .fw-app ohne (nicht-leeres) data-fw-app.")
                elif "financial-chart-module" in classes:
                    dtype = get_attr(container, "data-type")
                    if not dtype:
                        findings.append(f"{label}, .kg-card #{kidx}: .financial-chart-module ohne data-type.")
                    elif dtype not in ("line", "bar", "pie"):
                        findings.append(
                            f"{label}, .kg-card #{kidx}: ungueltiger data-type '{dtype}' "
                            f"(erlaubt: line, bar, pie)."
                        )
                # [data-fw-appchart] (nur tests/engine/, §10.2/§7.3 TEST_PAGE_STANDARD.md):
                # kein Ghost-Card-Vertrag, keine weiteren Pflichtattribute -- der Testfall
                # bootstrapt die Engine direkt per <script type="module"> (Bestandsmuster).

    # §10.1 TEST_PAGE_STANDARD.md -- bewusst fehlende lokale Referenzen (testfalllokal)
    marker_findings, exempt = validate_allow_missing_markers(root, path, dom, test_cases)
    findings.extend(marker_findings)

    # §23/§24 -- Referenzen + externe Script-/Stylesheet-Abhaengigkeiten
    findings.extend(validate_references(root, path, dom, exempt))

    return findings


def extract_title(path: Path) -> Optional[str]:
    try:
        raw = path.read_text(encoding="utf-8")
        dom = parse_html(raw)
    except Exception:
        return None
    for n in iter_descendants(dom):
        if n.tag == "title":
            t = visible_text(n)
            if t:
                return t
    for n in iter_descendants(dom):
        if n.tag == "h1":
            t = visible_text(n)
            if t:
                return t
    return None


# ---------------------------------------------------------------------------
# Discovery ohne Manifest (§12.1 TEST_PAGE_STANDARD.md, §20 dieses Auftrags)
# ---------------------------------------------------------------------------

EXCLUDED_DIR_NAMES = {".git", "node_modules", "__pycache__"}

# Benannte Ausnahme (§11.7 TEST_PAGE_STANDARD.md): das Template traegt absichtlich
# den Marker, ist aber keine ausfuehrbare Testseite und wird von der Discovery
# exakt an diesem einen kanonischen Pfad ausgeschlossen -- keine globale Ignore-Liste.
TEMPLATE_EXCLUSION_PATH = Path("docs") / "testing" / "templates" / "app.test.template.html"

STANDARD_LOCATION_PATTERNS = [
    ("Apps", re.compile(r"^Apps/[^/]+/app\.test\.html$")),
    ("Engine", re.compile(r"^tests/engine/[^/]+\.test\.html$")),
    ("Tooling", re.compile(r"^tests/tooling/[^/]+\.test\.html$")),
    ("Ghost", re.compile(r"^tests/ghost/[^/]+\.test\.html$")),
]


def classify_location(rel_posix: str) -> Optional[str]:
    for group, pattern in STANDARD_LOCATION_PATTERNS:
        if pattern.match(rel_posix):
            return group
    return None


def discover_test_pages(root: Path) -> List[Path]:
    """Durchsucht das gesamte Repository nach *.test.html-Dateinamen und nach
    HTML-Dateien mit dem Attribut data-fw-test-template -- ohne Manifest."""
    scratch_root = (root / "tests" / "scratch").resolve()
    template_exact = (root / TEMPLATE_EXCLUSION_PATH).resolve()

    found: List[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        dp = Path(dirpath)

        pruned = []
        for d in dirnames:
            if d in EXCLUDED_DIR_NAMES:
                continue
            if (dp / d).resolve() == scratch_root:
                continue
            pruned.append(d)
        dirnames[:] = pruned

        for fn in filenames:
            fp = dp / fn
            if fp.resolve() == template_exact:
                continue
            fn_lower = fn.lower()
            is_name_match = fn_lower.endswith(".test.html")
            is_marker_match = False
            if not is_name_match and fn_lower.endswith(".html"):
                try:
                    content = fp.read_text(encoding="utf-8", errors="ignore")
                    if "data-fw-test-template" in content:
                        is_marker_match = True
                except Exception:
                    pass
            if is_name_match or is_marker_match:
                found.append(fp)

    return sorted(found, key=lambda p: str(p).lower())


def check_app_pflicht(root: Path) -> List[Tuple[str, str]]:
    """§21: Apps/{slug}/app.js vorhanden -> Apps/{slug}/app.test.html Pflicht.
    Kein Raten aus README/APP_SPEC/Ordneralter."""
    findings: List[Tuple[str, str]] = []
    apps_dir = root / "Apps"
    if not apps_dir.is_dir():
        return findings
    for d in sorted(apps_dir.iterdir()):
        if not d.is_dir():
            continue
        app_js = d / "app.js"
        app_test = d / "app.test.html"
        if app_js.exists() and not app_test.exists():
            rel = str((d / "app.test.html").relative_to(root)).replace("\\", "/")
            findings.append((rel, "app.js ist vorhanden, aber app.test.html fehlt (§21)."))
    return findings


def check_duplicates(root: Path, standard_pages: List[Path]) -> List[Tuple[str, str]]:
    """§25: exakte SHA-256-Dubletten nur unter den entdeckten dauerhaften Testseiten."""
    findings: List[Tuple[str, str]] = []
    hashes: dict = {}
    for p in standard_pages:
        try:
            data = p.read_bytes()
        except Exception:
            continue
        h = hashlib.sha256(data).hexdigest()
        hashes.setdefault(h, []).append(p)
    for h, paths in hashes.items():
        if len(paths) > 1:
            rels = sorted(str(pp.relative_to(root)).replace("\\", "/") for pp in paths)
            for rel in rels:
                others = [r for r in rels if r != rel]
                findings.append((rel, f"Exakte Dateidublette (SHA-256 identisch) zu: {', '.join(others)}."))
    return findings


# ---------------------------------------------------------------------------
# Repository-weite Orchestrierung
# ---------------------------------------------------------------------------

@dataclass
class PageInfo:
    path: str
    title: Optional[str]
    group: str
    has_errors: bool


@dataclass
class Report:
    findings: List[Tuple[str, str]] = field(default_factory=list)
    pages: List[PageInfo] = field(default_factory=list)
    discovered_count: int = 0


def validate_repository(root: Path) -> Report:
    discovered = discover_test_pages(root)
    findings: List[Tuple[str, str]] = []
    standard_pages: List[Path] = []
    pages: List[PageInfo] = []

    for p in discovered:
        rel = str(p.relative_to(root)).replace("\\", "/")
        group = classify_location(rel)
        if group is None:
            findings.append(
                (rel, "Testseite liegt ausserhalb der erlaubten Standardorte (§3/§12.1) "
                      "und ausserhalb von tests/scratch/.")
            )
            continue

        standard_pages.append(p)
        page_findings = validate_test_page(root, p, is_engine=(group == "Engine"))
        for msg in page_findings:
            findings.append((rel, msg))

        title = extract_title(p)
        pages.append(PageInfo(path=rel, title=title, group=group, has_errors=bool(page_findings)))

    findings.extend(check_app_pflicht(root))
    findings.extend(check_duplicates(root, standard_pages))

    findings.sort(key=lambda t: (t[0], t[1]))

    return Report(findings=findings, pages=pages, discovered_count=len(standard_pages))


# ---------------------------------------------------------------------------
# Launcher-Erzeugung (tests/index.html) -- Komfortschicht, keine zweite Wahrheit
# ---------------------------------------------------------------------------

GROUP_ORDER = ["Apps", "Engine", "Tooling", "Ghost"]


def escape_html(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def compute_relative_href(root: Path, rel_page_path: str) -> str:
    launcher_dir = root / "tests"
    target = root / rel_page_path
    rel = os.path.relpath(str(target), str(launcher_dir))
    return rel.replace("\\", "/")


def build_index(root: Path, report: Report) -> None:
    grouped = {g: [] for g in GROUP_ORDER}
    for pg in report.pages:
        grouped.setdefault(pg.group, []).append(pg)

    for g in GROUP_ORDER:
        grouped[g].sort(key=lambda pg: ((pg.title or pg.path).lower(), pg.path.lower()))

    lines: List[str] = []
    lines.append("<!-- Generiert durch tools/check-test-pages.py --write-index. Nicht manuell pflegen. -->")
    lines.append("<!DOCTYPE html>")
    lines.append('<html lang="de">')
    lines.append("<head>")
    lines.append('  <meta charset="UTF-8">')
    lines.append('  <meta name="viewport" content="width=device-width, initial-scale=1.0">')
    lines.append("  <title>Finanzwesir Testseiten-Uebersicht</title>")
    lines.append('  <link rel="stylesheet" href="./shared/test-page.css">')
    lines.append("</head>")
    lines.append('<body class="fw-test-page fw-test-index">')
    lines.append("  <h1>Finanzwesir Testseiten-Uebersicht</h1>")

    for g in GROUP_ORDER:
        lines.append('  <section class="fw-test-index-group">')
        lines.append(f"    <h2>{escape_html(g)}</h2>")
        pages = grouped[g]
        if not pages:
            lines.append('    <p class="fw-test-index-empty">Noch keine Testseiten.</p>')
        else:
            lines.append('    <ul class="fw-test-index-list">')
            for pg in pages:
                title = pg.title or pg.path
                href = compute_relative_href(root, pg.path)
                suffix = " (Strukturfehler)" if pg.has_errors else ""
                lines.append(
                    f'      <li><a href="{escape_html(href)}">{escape_html(title)}{escape_html(suffix)}</a></li>'
                )
            lines.append("    </ul>")
        lines.append("  </section>")

    lines.append("</body>")
    lines.append("</html>")
    lines.append("")
    content = "\n".join(lines)

    target = root / "tests" / "index.html"
    existing = None
    if target.exists():
        try:
            existing = target.read_text(encoding="utf-8")
        except Exception:
            existing = None
    if existing != content:
        target.write_text(content, encoding="utf-8")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def print_report(report: Report) -> None:
    for rel, msg in report.findings:
        print("STRUKTURFEHLER")
        print(rel)
        print(f"- {msg}")
        print("")

    if report.findings:
        print("TESTSEITEN-STRUKTUR: FEHLER")
    else:
        print("TESTSEITEN-STRUKTUR: GRUEN")
    print(f"Gepruefte dauerhafte Testseiten: {report.discovered_count}")
    print(f"Strukturfehler: {len(report.findings)}")


def main(argv: Optional[List[str]] = None) -> int:
    argv = sys.argv[1:] if argv is None else argv

    write_index = False
    if len(argv) == 0:
        pass
    elif len(argv) == 1 and argv[0] == "--write-index":
        write_index = True
    else:
        print("Unbekanntes Argument. Erlaubt: (kein Argument) oder --write-index")
        return 1

    root = Path(__file__).resolve().parent.parent

    try:
        report = validate_repository(root)
    except Exception as e:
        print(f"INTERNER CHECKERFEHLER: {e}")
        return 1

    print_report(report)

    if write_index:
        try:
            build_index(root, report)
        except Exception as e:
            print(f"INTERNER CHECKERFEHLER (Launcher-Erzeugung): {e}")
            return 1

    return 1 if report.findings else 0


if __name__ == "__main__":
    sys.exit(main())
