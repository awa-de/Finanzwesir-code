#!/usr/bin/env python3
"""Strukturvalidator für behavior-trace.json gegen behavior-trace.schema.json.

Nur Standardbibliothek (kein jsonschema-Paket verfügbar/installiert). Prüft
Pflichtfelder, Typen, Enums und das SHA-256-Format. Prüft NICHT die reale
Browser-Wiedergabe (das macht verify.mjs) und ändert keine Dateien.

Aufruf: python validate_schema.py <pfad-zur-behavior-trace.json> [...]
Exit-Code 0 = alle Dateien strukturell gültig, 1 = mindestens ein Fehler.
"""

import json
import re
import sys
from pathlib import Path

SHA256_RE = re.compile(r"^[a-f0-9]{64}$")
ACTION_TYPES = {"click", "observe-text", "observe-attribute", "observe-class", "set-input-value"}
MODES = {"normal", "reduced"}
END_STATE_KINDS = {"text", "attribute", "class"}

REQUIRED_TOP_LEVEL = [
    "referencePath", "referenceSha256", "playwrightVersion", "chromiumVersion",
    "mode", "recordedAt", "actions", "expectedEndState",
]
REQUIRED_ACTION_FIELDS = ["index", "type", "selector", "relativeTimeMs", "screenshotPath"]
REQUIRED_END_STATE_FIELDS = ["selector", "kind", "expected"]


def validate(trace, source_label):
    errors = []

    for field in REQUIRED_TOP_LEVEL:
        if field not in trace:
            errors.append(f"{source_label}: Pflichtfeld '{field}' fehlt")

    if "referenceSha256" in trace and not SHA256_RE.match(str(trace["referenceSha256"])):
        errors.append(f"{source_label}: referenceSha256 ist kein 64-stelliger Hex-Hash")

    if "mode" in trace and trace["mode"] not in MODES:
        errors.append(f"{source_label}: mode '{trace['mode']}' ist nicht in {sorted(MODES)}")

    actions = trace.get("actions")
    if actions is not None:
        if not isinstance(actions, list) or len(actions) < 1:
            errors.append(f"{source_label}: actions muss eine nicht-leere Liste sein")
        else:
            for i, action in enumerate(actions):
                for field in REQUIRED_ACTION_FIELDS:
                    if field not in action:
                        errors.append(f"{source_label}: actions[{i}].{field} fehlt")
                if action.get("type") not in ACTION_TYPES:
                    errors.append(
                        f"{source_label}: actions[{i}].type '{action.get('type')}' "
                        f"ist nicht in {sorted(ACTION_TYPES)}"
                    )
                if action.get("type") == "set-input-value":
                    value = action.get("value")
                    if not isinstance(value, str) or len(value) == 0:
                        errors.append(
                            f"{source_label}: actions[{i}].value muss ein nichtleerer String sein (set-input-value)"
                        )
                # Kein JavaScript-Feld erlaubt
                for js_field in ("script", "code", "eval", "js"):
                    if js_field in action:
                        errors.append(
                            f"{source_label}: actions[{i}] enthält verbotenes JS-Feld '{js_field}'"
                        )

    end_state = trace.get("expectedEndState")
    if end_state is not None:
        for field in REQUIRED_END_STATE_FIELDS:
            if field not in end_state:
                errors.append(f"{source_label}: expectedEndState.{field} fehlt")
        if end_state.get("kind") not in END_STATE_KINDS:
            errors.append(
                f"{source_label}: expectedEndState.kind '{end_state.get('kind')}' "
                f"ist nicht in {sorted(END_STATE_KINDS)}"
            )

    return errors


def main(argv):
    if not argv:
        print("Aufruf: python validate_schema.py <behavior-trace.json> [...]", file=sys.stderr)
        return 1

    all_errors = []
    for raw_path in argv:
        path = Path(raw_path)
        label = str(path)
        try:
            trace = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            all_errors.append(f"{label}: nicht lesbar oder kein valides JSON ({exc})")
            continue
        all_errors.extend(validate(trace, label))

    if all_errors:
        print(f"SCHEMA-VALIDIERUNG: FEHLGESCHLAGEN ({len(all_errors)} Befund(e))")
        for err in all_errors:
            print(f"  - {err}")
        return 1

    print(f"SCHEMA-VALIDIERUNG: GRUEN ({len(argv)} Datei(en) geprüft)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
