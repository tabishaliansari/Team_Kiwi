"""
github_sync.py - Pushes JMeter run artifacts to GitHub via the Contents API
"""

import base64
import os
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
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


def push_file_to_github(file_path: str, repo_path: str, commit_message: str) -> str | None:
    """
    Push a single local file to an arbitrary path in the repo.
    Returns the GitHub blob URL of the file on success, or None on failure.
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        print("    [github_sync] GITHUB_TOKEN or GITHUB_REPO not set — skipping.")
        return None

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept":        "application/vnd.github+json",
    }

    try:
        with open(file_path, "rb") as f:
            content = base64.b64encode(f.read()).decode("utf-8")
    except Exception as e:
        print(f"    [github_sync] Cannot read {file_path}: {e}")
        return None

    url  = f"{_API_BASE}/repos/{GITHUB_REPO}/contents/{repo_path}"
    body = {"message": commit_message, "content": content}

    resp = requests.put(url, json=body, headers=headers, timeout=30)

    if resp.status_code in (200, 201):
        return resp.json().get("content", {}).get("html_url")

    if resp.status_code == 422:
        sha = _get_sha(repo_path, headers)
        if sha:
            body["sha"] = sha
            resp = requests.put(url, json=body, headers=headers, timeout=30)
            if resp.status_code in (200, 201):
                return resp.json().get("content", {}).get("html_url")

    print(f"    [github_sync] Upload failed for {repo_path}: {resp.status_code} {resp.text[:300]}")
    return None


def _create_blob(local_path: str, repo_path: str, headers: dict) -> dict | None:
    """Create a single GitHub blob and return a tree-item dict, or None on failure."""
    try:
        with open(local_path, "rb") as f:
            content_b64 = base64.b64encode(f.read()).decode("utf-8")
        resp = requests.post(
            f"{_API_BASE}/repos/{GITHUB_REPO}/git/blobs",
            json={"content": content_b64, "encoding": "base64"},
            headers=headers,
            timeout=30,
        )
        if resp.status_code == 201:
            return {"path": repo_path, "mode": "100644", "type": "blob", "sha": resp.json()["sha"]}
        print(f"    [github_sync] Blob failed for {repo_path}: {resp.status_code}")
        return None
    except Exception as e:
        print(f"    [github_sync] Blob error for {repo_path}: {e}")
        return None


def push_folder_to_github(local_dir: str, repo_base_path: str, run_timestamp: str) -> str | None:
    """
    Push every file in local_dir to GitHub under repo_base_path using the
    Git Trees API: blobs are created in parallel, then committed atomically
    in a single commit — no per-file round-trips or conflict handling needed.
    Returns the GitHub tree URL of the folder, or None on failure.
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        print("    [github_sync] GITHUB_TOKEN or GITHUB_REPO not set — skipping folder sync.")
        return None

    if not os.path.isdir(local_dir):
        print(f"    [github_sync] Report directory not found: {local_dir}")
        return None

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept":        "application/vnd.github+json",
    }

    # Collect all files
    file_map: list[tuple[str, str]] = []
    for dirpath, _, filenames in os.walk(local_dir):
        for filename in filenames:
            local_path = os.path.join(dirpath, filename)
            rel        = os.path.relpath(local_path, local_dir).replace(os.sep, "/")
            repo_path  = f"{repo_base_path}/{rel}"
            file_map.append((local_path, repo_path))

    if not file_map:
        print("    [github_sync] No files found in report directory.")
        return None

    print(f"    [github_sync] Creating {len(file_map)} blobs in parallel...")

    # Step 1 — create all blobs concurrently
    tree_items: list[dict] = []
    with ThreadPoolExecutor(max_workers=10) as pool:
        futures = {pool.submit(_create_blob, lp, rp, headers): rp for lp, rp in file_map}
        for future in as_completed(futures):
            item = future.result()
            if item:
                tree_items.append(item)

    if not tree_items:
        print("    [github_sync] All blob creations failed.")
        return None

    try:
        # Step 2 — get current HEAD commit of main
        ref_resp = requests.get(
            f"{_API_BASE}/repos/{GITHUB_REPO}/git/ref/heads/main",
            headers=headers, timeout=15,
        )
        ref_resp.raise_for_status()
        base_commit_sha = ref_resp.json()["object"]["sha"]

        # Step 3 — get the tree SHA of that commit
        commit_resp = requests.get(
            f"{_API_BASE}/repos/{GITHUB_REPO}/git/commits/{base_commit_sha}",
            headers=headers, timeout=15,
        )
        commit_resp.raise_for_status()
        base_tree_sha = commit_resp.json()["tree"]["sha"]

        # Step 4 — create new tree with all blobs on top of existing tree
        tree_resp = requests.post(
            f"{_API_BASE}/repos/{GITHUB_REPO}/git/trees",
            json={"base_tree": base_tree_sha, "tree": tree_items},
            headers=headers, timeout=60,
        )
        tree_resp.raise_for_status()
        new_tree_sha = tree_resp.json()["sha"]

        # Step 5 — create commit
        new_commit_resp = requests.post(
            f"{_API_BASE}/repos/{GITHUB_REPO}/git/commits",
            json={
                "message": f"Add HTML report for run {run_timestamp}",
                "tree":    new_tree_sha,
                "parents": [base_commit_sha],
            },
            headers=headers, timeout=30,
        )
        new_commit_resp.raise_for_status()
        new_commit_sha = new_commit_resp.json()["sha"]

        # Step 6 — advance main to the new commit
        patch_resp = requests.patch(
            f"{_API_BASE}/repos/{GITHUB_REPO}/git/refs/heads/main",
            json={"sha": new_commit_sha},
            headers=headers, timeout=15,
        )
        patch_resp.raise_for_status()

    except Exception as e:
        print(f"    [github_sync] Commit/push failed: {e}")
        return None

    print(f"    [github_sync] Report pushed: {len(tree_items)}/{len(file_map)} files in 1 commit.")
    encoded_path = repo_base_path.replace(" ", "%20")
    return f"https://github.com/{GITHUB_REPO}/tree/main/{encoded_path}"


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
