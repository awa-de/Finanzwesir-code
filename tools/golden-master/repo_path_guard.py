#!/usr/bin/env python3
"""AF-GM-03-Inhaltsgate: gemeinsame, strenge Pfad-/Lese-Schutzgrenze für
Generator und Validator. Jeder aus einer Spec- oder Manifestdatei gelesene
Quellpfad muss durch safe_repo_path(), bevor sein Inhalt gelesen oder gehasht
wird.
"""

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
PROTECTED_PATHS_FILE = REPO_ROOT / ".claude" / "PROTECTED_PATHS.json"


class GmPackageError(Exception):
    """Trägt eine stabile Fehler-ID, damit Aufrufer sie unverändert melden können."""

    def __init__(self, error_id, message):
        super().__init__(message)
        self.error_id = error_id
        self.message = message


def _normalize(path_str):
    return str(path_str).replace("\\", "/")


def _is_absolute(path_str):
    p = _normalize(path_str)
    if p.startswith("/"):
        return True
    if len(p) >= 2 and p[1] == ":":  # Windows-Laufwerksbuchstabe, z. B. "C:/..."
        return True
    return False


def _has_dotdot_segment(path_str):
    return ".." in _normalize(path_str).split("/")


def _load_protected_paths():
    data = json.loads(PROTECTED_PATHS_FILE.read_text(encoding="utf-8"))
    return data["protected_paths"]


def _match_entry(candidate, entry_path):
    candidate = _normalize(candidate).lstrip("./")
    entry_path = _normalize(entry_path)
    if entry_path.endswith("/"):
        return candidate == entry_path.rstrip("/") or candidate.startswith(entry_path)
    return candidate == entry_path


def _explicit_read_forbidden_reason(rel_path):
    for entry in _load_protected_paths():
        if _match_entry(rel_path, entry["path"]):
            reason = entry.get("reason", "")
            if "niemals lesen" in reason.lower():
                return reason
    return None


def safe_repo_path(rel_path_str):
    """Prüft rel_path_str gegen die Repo-/Leseschutzgrenze.

    Gibt bei Erfolg den aufgelösten absoluten Path zurück. Wirft GmPackageError
    (GM03-ERR-PATH-OUTSIDE-REPO oder GM03-ERR-SOURCE-READ-FORBIDDEN) sonst —
    immer VOR jedem Lesezugriff auf die Datei.
    """
    if not rel_path_str or not str(rel_path_str).strip():
        raise GmPackageError("GM03-ERR-PATH-OUTSIDE-REPO", "Leerer Pfad ist nicht zulässig")

    if _is_absolute(rel_path_str):
        raise GmPackageError("GM03-ERR-PATH-OUTSIDE-REPO", f"Absoluter Pfad ist nicht zulässig: {rel_path_str}")

    if _has_dotdot_segment(rel_path_str):
        raise GmPackageError("GM03-ERR-PATH-OUTSIDE-REPO", f"'..'-Traversal ist nicht zulässig: {rel_path_str}")

    resolved = (REPO_ROOT / rel_path_str).resolve()
    try:
        resolved.relative_to(REPO_ROOT.resolve())
    except ValueError:
        raise GmPackageError("GM03-ERR-PATH-OUTSIDE-REPO", f"Pfad liegt außerhalb des Repository-Roots: {rel_path_str}")

    reason = _explicit_read_forbidden_reason(rel_path_str)
    if reason is not None:
        raise GmPackageError("GM03-ERR-SOURCE-READ-FORBIDDEN", f"Pfad ist laut PROTECTED_PATHS.json explizit lesegesperrt: {rel_path_str} ({reason})")

    return resolved


def require_permitted(entry_path, permitted_value):
    """permitted muss exakt Boolean True sein; sonst GM03-ERR-SOURCE-NOT-PERMITTED."""
    if permitted_value is not True:
        raise GmPackageError(
            "GM03-ERR-SOURCE-NOT-PERMITTED",
            f"Quelle '{entry_path}' hat permitted={permitted_value!r}, erwartet ausschließlich True",
        )
