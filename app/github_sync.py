"""
github_sync.py - Pushes JMeter run artifacts to GitHub via the Contents API
"""

import base64
import requests
from config import GITHUB_TOKEN, GITHUB_REPO

_API_BASE   = "https://api.github.com"
_RUN_FOLDER = "JMeter Performance Tests"


def _get_sha(repo_path: str, headers: dict) -> str | None:
    """Return the blob SHA of an existing file in the repo, or None."""
    url  = f"{_API_BASE}/repos/{GITHUB_REPO}/contents/{repo_path}"
    resp = requests.get(url, headers=headers, timeout=15)
    if resp.status_code == 200:
        return resp.json().get("sha")
    return None


def _upload(filename: str, local_path: str, run_timestamp: str, headers: dict) -> bool:
    """Base64-encode and PUT a single file. Handles 422 (already exists) via SHA update."""
    try:
        with open(local_path, "rb") as f:
            content = base64.b64encode(f.read()).decode("utf-8")
    except Exception as e:
        print(f"    [github_sync] Cannot read {filename}: {e}")
        return False

    repo_path = f"{_RUN_FOLDER}/{run_timestamp}/{filename}"
    url       = f"{_API_BASE}/repos/{GITHUB_REPO}/contents/{repo_path}"
    body      = {
        "message": f"Add run {run_timestamp} - {filename}",
        "content": content,
    }

    resp = requests.put(url, json=body, headers=headers, timeout=30)

    if resp.status_code in (200, 201):
        return True

    if resp.status_code == 422:
        sha = _get_sha(repo_path, headers)
        if sha:
            body["sha"]     = sha
            body["message"] = f"Update run {run_timestamp} - {filename}"
            resp = requests.put(url, json=body, headers=headers, timeout=30)
            if resp.status_code in (200, 201):
                return True

    print(f"    [github_sync] Upload failed for {filename}: {resp.status_code} {resp.text[:300]}")
    return False


def push_run_to_github(
    run_timestamp: str,
    jmx_path: str,
    results_path: str,
    log_path: str,
) -> str | None:
    """
    Upload test.jmx, results.jtl, and jmeter.log to GitHub under
    '{_RUN_FOLDER}/{run_timestamp}/'.
    Returns the GitHub tree URL of the run folder, or None on any failure.
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        print("    [github_sync] GITHUB_TOKEN or GITHUB_REPO not set — skipping sync.")
        return None

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept":        "application/vnd.github+json",
    }

    files = [
        ("test.jmx",    jmx_path),
        ("results.jtl", results_path),
        ("jmeter.log",  log_path),
    ]

    all_ok = all(_upload(name, path, run_timestamp, headers) for name, path in files)
    if not all_ok:
        return None

    encoded_folder = f"{_RUN_FOLDER}/{run_timestamp}".replace(" ", "%20")
    return f"https://github.com/{GITHUB_REPO}/tree/main/{encoded_folder}"


def create_github_issue(title: str, body: str, labels: list = []) -> str | None:
    """
    Open a GitHub issue in the configured repo.
    Returns the issue html_url on success, or None on failure.
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        print("    [github_sync] GITHUB_TOKEN or GITHUB_REPO not set — skipping issue creation.")
        return None

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept":        "application/vnd.github+json",
    }
    url  = f"{_API_BASE}/repos/{GITHUB_REPO}/issues"
    body_payload = {"title": title, "body": body, "labels": labels}

    try:
        resp = requests.post(url, json=body_payload, headers=headers, timeout=15)
        if resp.status_code == 201:
            return resp.json().get("html_url")
        print(f"    [github_sync] Issue creation failed: {resp.status_code} {resp.text[:300]}")
        return None
    except Exception as e:
        print(f"    [github_sync] Issue creation error: {e}")
        return None
