#!/usr/bin/env python3
"""AF-GM-03 Eingabepaket-Validator.

Reine Struktur-, Hash- und Herkunftsprüfung eines Golden-Master-Eingabepakets
gegen docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md §4/§5. Kein Browser, kein
Netzzugriff, keine zusätzliche Bibliothek. Fail-closed: bricht bei der ersten
Abweichung mit stabiler Fehler-ID ab. Jeder gelesene Quellpfad läuft vorher
durch repo_path_guard.safe_repo_path().

Aufruf: python validate_package.py <package-dir>
Exit-Code 0 = PASS, 1 = FAIL.
"""

import json
import re
import sys
from pathlib import Path

TOOL_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOL_DIR))
import validate_schema  # noqa: E402  (AF-GM-02-Vertrag für behavior-trace.json wiederverwendet)
from repo_path_guard import GmPackageError as ValidationFail  # noqa: E402
from repo_path_guard import require_permitted, safe_repo_path  # noqa: E402

ACCEPTANCE_ID_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,31}$")
SHA256_RE = re.compile(r"^[a-f0-9]{64}$")
ALLOWED_ASSUMPTION_STATUS = {
    "confirmed", "observed", "simulated",
    "editorial-confirmation-required", "blocked", "rejected",
}

REQUIRED_FILES = [
    "acceptance.json", "source-manifest.json", "blueprint.json",
    "behavior-trace.json", "assumption-ledger.json", "asset-manifest.json",
    "data-manifest.json", "production-plan.md",
]
REQUIRED_ACCEPTANCE_FIELDS = [
    "acceptanceId", "appSlug", "acceptedBy", "acceptedAt",
    "mockupPath", "mockupVariant", "mockupSha256", "scope", "knownNonGoals",
]
REQUIRED_ASSUMPTION_FIELDS = ["id", "text", "origin", "status", "owner", "resolution"]
REQUIRED_ASSET_FIELDS = ["path", "sha256", "kind", "licenseStatus", "targetPath"]
REQUIRED_DATA_FIELDS = ["class", "path", "sha256", "validator", "cacheStatus", "ghostFileName"]
REQUIRED_PRODUCTION_PLAN_HEADINGS = [
    "## AP-Reihenfolge", "## Erlaubte Pfade", "## Tests", "## Manuelle Ghost-Abnahme",
]


def real_sha256(rel_path):
    import hashlib
    abs_path = safe_repo_path(rel_path)
    if not abs_path.is_file():
        raise ValidationFail("GM03-ERR-PATH-NOT-FOUND", f"Pfad existiert nicht: {rel_path}")
    return hashlib.sha256(abs_path.read_bytes()).hexdigest()


def load_json(pkg_dir, filename):
    path = pkg_dir / filename
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise ValidationFail("GM03-ERR-INVALID-JSON", f"{filename} ist kein valides JSON: {exc}")


def check_required_files(pkg_dir):
    missing = [f for f in REQUIRED_FILES if not (pkg_dir / f).is_file()]
    if missing:
        raise ValidationFail("GM03-ERR-MISSING-FILE", f"Pflichtdatei(en) fehlen: {', '.join(missing)}")


def check_acceptance(pkg_dir):
    acceptance = load_json(pkg_dir, "acceptance.json")
    for field in REQUIRED_ACCEPTANCE_FIELDS:
        if field not in acceptance:
            raise ValidationFail("GM03-ERR-MISSING-FIELD", f"acceptance.json: Pflichtfeld '{field}' fehlt")

    if not ACCEPTANCE_ID_RE.match(str(acceptance["acceptanceId"])):
        raise ValidationFail(
            "GM03-ERR-INVALID-GRAMMAR",
            f"acceptance.json: acceptanceId '{acceptance['acceptanceId']}' verletzt ^[a-z0-9][a-z0-9-]{{2,31}}$",
        )
    if not SHA256_RE.match(str(acceptance["mockupSha256"])):
        raise ValidationFail("GM03-ERR-INVALID-GRAMMAR", "acceptance.json: mockupSha256 ist kein 64-stelliger Hex-Hash")

    real_hash = real_sha256(acceptance["mockupPath"])
    if real_hash != acceptance["mockupSha256"]:
        raise ValidationFail(
            "GM03-ERR-HASH-MISMATCH",
            f"acceptance.json: mockupSha256 weicht ab (erklärt {acceptance['mockupSha256']}, real {real_hash})",
        )
    return acceptance


def check_source_manifest(pkg_dir):
    manifest = load_json(pkg_dir, "source-manifest.json")
    sources = manifest.get("sources")
    if not isinstance(sources, list) or not sources:
        raise ValidationFail("GM03-ERR-MISSING-FIELD", "source-manifest.json: 'sources' fehlt oder ist leer")

    declared_paths = set()
    for entry in sources:
        for field in ("path", "sha256", "role", "permitted"):
            if field not in entry:
                raise ValidationFail("GM03-ERR-MISSING-FIELD", f"source-manifest.json: Eintrag ohne '{field}'")
        require_permitted(entry["path"], entry["permitted"])
        if not SHA256_RE.match(str(entry["sha256"])):
            raise ValidationFail("GM03-ERR-INVALID-GRAMMAR", f"source-manifest.json: sha256 für '{entry['path']}' ist kein 64-stelliger Hex-Hash")
        real_hash = real_sha256(entry["path"])
        if real_hash != entry["sha256"]:
            raise ValidationFail(
                "GM03-ERR-HASH-MISMATCH",
                f"source-manifest.json: Hash für '{entry['path']}' weicht ab (erklärt {entry['sha256']}, real {real_hash})",
            )
        declared_paths.add(entry["path"])
    return declared_paths


def check_declared(declared_paths, path, context):
    if path not in declared_paths:
        raise ValidationFail("GM03-ERR-UNDECLARED-SOURCE", f"{context}: Pfad '{path}' steht nicht in source-manifest.json")


def check_asset_manifest(pkg_dir, declared_paths):
    manifest = load_json(pkg_dir, "asset-manifest.json")
    assets = manifest.get("assets", [])
    for entry in assets:
        for field in REQUIRED_ASSET_FIELDS:
            if field not in entry:
                raise ValidationFail("GM03-ERR-MISSING-FIELD", f"asset-manifest.json: Eintrag ohne '{field}'")
        check_declared(declared_paths, entry["path"], "asset-manifest.json")
        real_hash = real_sha256(entry["path"])
        if real_hash != entry["sha256"]:
            raise ValidationFail(
                "GM03-ERR-HASH-MISMATCH",
                f"asset-manifest.json: Hash für '{entry['path']}' weicht ab (erklärt {entry['sha256']}, real {real_hash})",
            )


def check_data_manifest(pkg_dir, declared_paths):
    manifest = load_json(pkg_dir, "data-manifest.json")
    items = manifest.get("data", [])
    for entry in items:
        for field in REQUIRED_DATA_FIELDS:
            if field not in entry:
                raise ValidationFail("GM03-ERR-MISSING-FIELD", f"data-manifest.json: Eintrag ohne '{field}'")
        check_declared(declared_paths, entry["path"], "data-manifest.json")
        real_hash = real_sha256(entry["path"])
        if real_hash != entry["sha256"]:
            raise ValidationFail(
                "GM03-ERR-HASH-MISMATCH",
                f"data-manifest.json: Hash für '{entry['path']}' weicht ab (erklärt {entry['sha256']}, real {real_hash})",
            )


def check_assumption_ledger(pkg_dir):
    ledger = load_json(pkg_dir, "assumption-ledger.json")
    assumptions = ledger.get("assumptions")
    if not isinstance(assumptions, list) or not assumptions:
        raise ValidationFail("GM03-ERR-MISSING-FIELD", "assumption-ledger.json: 'assumptions' fehlt oder ist leer")

    for entry in assumptions:
        for field in REQUIRED_ASSUMPTION_FIELDS:
            if field not in entry:
                raise ValidationFail("GM03-ERR-MISSING-FIELD", f"assumption-ledger.json: Eintrag '{entry.get('id', '?')}' ohne '{field}'")
        status = entry["status"]
        if status == "blocked":
            raise ValidationFail("GM03-ERR-ASSUMPTION-BLOCKED", f"assumption-ledger.json: Eintrag '{entry['id']}' hat Status 'blocked' — Validierung gestoppt")
        if status not in ALLOWED_ASSUMPTION_STATUS:
            raise ValidationFail(
                "GM03-ERR-ASSUMPTION-UNKNOWN-STATUS",
                f"assumption-ledger.json: Eintrag '{entry['id']}' hat unbekannten Status '{status}' "
                f"(erlaubt: {sorted(ALLOWED_ASSUMPTION_STATUS)})",
            )
    return len(assumptions)


def check_behavior_trace(pkg_dir):
    trace_path = pkg_dir / "behavior-trace.json"
    trace = json.loads(trace_path.read_text(encoding="utf-8"))
    errors = validate_schema.validate(trace, str(trace_path))
    if errors:
        raise ValidationFail("GM03-ERR-TRACE-INVALID", "behavior-trace.json gegen AF-GM-02-Vertrag ungültig: " + "; ".join(errors))
    return trace


def check_trace_acceptance_binding(trace, acceptance):
    if trace.get("referencePath") != acceptance["mockupPath"]:
        raise ValidationFail(
            "GM03-ERR-TRACE-ACCEPTANCE-MISMATCH",
            f"behavior-trace.json.referencePath ('{trace.get('referencePath')}') != "
            f"acceptance.json.mockupPath ('{acceptance['mockupPath']}')",
        )
    if trace.get("referenceSha256") != acceptance["mockupSha256"]:
        raise ValidationFail(
            "GM03-ERR-TRACE-ACCEPTANCE-MISMATCH",
            f"behavior-trace.json.referenceSha256 ('{trace.get('referenceSha256')}') != "
            f"acceptance.json.mockupSha256 ('{acceptance['mockupSha256']}')",
        )


def check_blueprint(pkg_dir):
    blueprint = load_json(pkg_dir, "blueprint.json")
    for field in ("rootContainer", "domSections", "classRecipes", "tokens", "breakpoints", "motion"):
        if field not in blueprint:
            raise ValidationFail("GM03-ERR-MISSING-FIELD", f"blueprint.json: Pflichtfeld '{field}' fehlt")


def check_production_plan(pkg_dir):
    text = (pkg_dir / "production-plan.md").read_text(encoding="utf-8")
    missing = [h for h in REQUIRED_PRODUCTION_PLAN_HEADINGS if h not in text]
    if missing:
        raise ValidationFail(
            "GM03-ERR-PRODUCTION-PLAN-INCOMPLETE",
            f"production-plan.md: fehlende Überschrift(en): {', '.join(missing)}",
        )


def validate_package(pkg_dir):
    check_required_files(pkg_dir)
    acceptance = check_acceptance(pkg_dir)
    declared_paths = check_source_manifest(pkg_dir)
    check_declared(declared_paths, acceptance["mockupPath"], "acceptance.json")
    check_blueprint(pkg_dir)
    trace = check_behavior_trace(pkg_dir)
    check_trace_acceptance_binding(trace, acceptance)
    n_assumptions = check_assumption_ledger(pkg_dir)
    check_asset_manifest(pkg_dir, declared_paths)
    check_data_manifest(pkg_dir, declared_paths)
    check_production_plan(pkg_dir)
    return {
        "sourcesChecked": len(declared_paths),
        "assumptionsChecked": n_assumptions,
    }


def main(argv):
    if len(argv) != 1:
        print("Aufruf: python validate_package.py <package-dir>", file=sys.stderr)
        return 1

    pkg_dir = Path(argv[0])
    if not pkg_dir.is_dir():
        print(json.dumps({"status": "FAIL", "errorId": "GM03-ERR-MISSING-FILE", "message": f"Paketordner nicht gefunden: {pkg_dir}"}, indent=2))
        return 1

    try:
        stats = validate_package(pkg_dir)
    except ValidationFail as fail:
        print(json.dumps({"status": "FAIL", "errorId": fail.error_id, "message": fail.message}, indent=2, ensure_ascii=False))
        return 1

    print(json.dumps({"status": "PASS", "packageDir": str(pkg_dir), **stats}, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
