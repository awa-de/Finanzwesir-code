#!/usr/bin/env python3
"""AF-GM-03 Eingabepaket-Generator.

Rein mechanisch: liest eine deklarative Eingabe-Spec (JSON) und schreibt daraus
die acht Pflichtdateien eines Golden-Master-Eingabepakets
(docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md §5). Erfindet keine
Acceptance-Daten, DOM-Struktur, Assets, Datenquellen, Annahmen oder
Trace-Aktionen — jeder inhaltliche Wert kommt aus der Spec-Datei. Berechnet nur
SHA-256-Hashes real vorhandener Dateien und formatiert/schreibt die acht
Pflichtdateien. Jeder gelesene Quellpfad läuft vorher durch
repo_path_guard.safe_repo_path() (Repo-Grenze, kein '..', kein explizit
lesegesperrter Pfad). Jede Quelle muss permitted=true tragen, sonst Stop.

Aufruf:
    python generate_package.py <package-spec.json> <output-dir>

Exit-Code 0 = Paket geschrieben, 1 = Spec-, Quellen- oder Schutzverletzung
(keine Datei geschrieben).
"""

import json
import sys
from pathlib import Path

from repo_path_guard import (
    GmPackageError,
    require_llm_source_not_raw,
    require_permitted,
    require_valid_consumer_role,
    safe_repo_path,
)

REQUIRED_ACCEPTANCE_FIELDS = [
    "acceptanceId", "appSlug", "acceptedBy", "acceptedAt",
    "mockupPath", "mockupVariant", "scope", "knownNonGoals",
]
REQUIRED_PRODUCTION_PLAN_FIELDS = ["apReihenfolge", "erlaubtePfade", "tests", "manuelleGhostAbnahme"]


def sha256_of(rel_path):
    import hashlib
    abs_path = safe_repo_path(rel_path)
    if not abs_path.is_file():
        raise GmPackageError("GM03-ERR-PATH-OUTSIDE-REPO", f"Quelle nicht gefunden: {rel_path} (aufgelöst zu {abs_path})")
    return hashlib.sha256(abs_path.read_bytes()).hexdigest()


def build_acceptance(spec):
    acceptance = dict(spec["acceptance"])
    for field in REQUIRED_ACCEPTANCE_FIELDS:
        if field not in acceptance:
            raise ValueError(f"Spec-Fehler: acceptance.{field} fehlt")
    acceptance["mockupSha256"] = sha256_of(acceptance["mockupPath"])
    return acceptance


def build_source_manifest(spec):
    mockup_path = spec["acceptance"]["mockupPath"]
    entries = []
    for src in spec["sources"]:
        require_permitted(src.get("path"), src.get("permitted"))
        require_valid_consumer_role(src.get("path"), src.get("consumerRole"))
        require_llm_source_not_raw(src.get("path"), src.get("consumerRole"), mockup_path)
        entries.append({
            "path": src["path"],
            "sha256": sha256_of(src["path"]),
            "role": src["role"],
            "permitted": True,
            "consumerRole": src["consumerRole"],
        })
    return {"sources": entries}


def build_blueprint(spec):
    return spec["blueprint"]


def build_behavior_trace(spec):
    trace_abs_path = safe_repo_path(spec["behaviorTracePath"])
    if not trace_abs_path.is_file():
        raise GmPackageError("GM03-ERR-PATH-OUTSIDE-REPO", f"behaviorTracePath nicht gefunden: {spec['behaviorTracePath']}")
    return json.loads(trace_abs_path.read_text(encoding="utf-8"))


def build_assumption_ledger(spec):
    return {"assumptions": spec["assumptions"]}


def build_asset_manifest(spec):
    entries = []
    for asset in spec["assets"]:
        entries.append({
            "path": asset["path"],
            "sha256": sha256_of(asset["path"]),
            "kind": asset["kind"],
            "licenseStatus": asset["licenseStatus"],
            "targetPath": asset["targetPath"],
        })
    return {"assets": entries}


def build_data_manifest(spec):
    entries = []
    for item in spec["data"]:
        entries.append({
            "class": item["class"],
            "path": item["path"],
            "sha256": sha256_of(item["path"]),
            "validator": item["validator"],
            "cacheStatus": item["cacheStatus"],
            "ghostFileName": item["ghostFileName"],
        })
    return {"data": entries}


def build_production_plan_md(spec):
    plan = spec["productionPlan"]
    for field in REQUIRED_PRODUCTION_PLAN_FIELDS:
        if field not in plan:
            raise ValueError(f"Spec-Fehler: productionPlan.{field} fehlt")
    return (
        "# Production Plan\n\n"
        "## AP-Reihenfolge\n\n"
        f"{plan['apReihenfolge']}\n\n"
        "## Erlaubte Pfade\n\n"
        f"{plan['erlaubtePfade']}\n\n"
        "## Tests\n\n"
        f"{plan['tests']}\n\n"
        "## Manuelle Ghost-Abnahme\n\n"
        f"{plan['manuelleGhostAbnahme']}\n"
    )


def main(argv):
    if len(argv) != 2:
        print("Aufruf: python generate_package.py <package-spec.json> <output-dir>", file=sys.stderr)
        return 1

    spec_path = Path(argv[0])
    output_dir = Path(argv[1])

    try:
        spec = json.loads(spec_path.read_text(encoding="utf-8"))

        acceptance = build_acceptance(spec)
        source_manifest = build_source_manifest(spec)
        blueprint = build_blueprint(spec)
        behavior_trace = build_behavior_trace(spec)
        assumption_ledger = build_assumption_ledger(spec)
        asset_manifest = build_asset_manifest(spec)
        data_manifest = build_data_manifest(spec)
        production_plan_md = build_production_plan_md(spec)
    except GmPackageError as exc:
        print(json.dumps({"status": "FAIL", "errorId": exc.error_id, "message": exc.message}, indent=2, ensure_ascii=False))
        return 1
    except (OSError, json.JSONDecodeError, KeyError, ValueError) as exc:
        print(json.dumps({"status": "FAIL", "errorId": "GM03-ERR-GENERATOR-SPEC-INVALID", "message": str(exc)}, indent=2, ensure_ascii=False))
        return 1

    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "acceptance.json").write_text(json.dumps(acceptance, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "source-manifest.json").write_text(json.dumps(source_manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "blueprint.json").write_text(json.dumps(blueprint, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "behavior-trace.json").write_text(json.dumps(behavior_trace, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "assumption-ledger.json").write_text(json.dumps(assumption_ledger, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "asset-manifest.json").write_text(json.dumps(asset_manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "data-manifest.json").write_text(json.dumps(data_manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (output_dir / "production-plan.md").write_text(production_plan_md, encoding="utf-8")

    print(f"PAKET ERZEUGT: {output_dir} (8 Pflichtdateien)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
