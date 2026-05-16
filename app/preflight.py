"""
preflight.py - Verifies the target endpoint is reachable before running a test
"""

import requests


def check_endpoint(protocol: str, domain: str, port: int, path: str) -> tuple[bool, str | int]:
    """
    Send a GET request to the target endpoint.
    Returns (True, status_code) on any HTTP response.
    Returns (False, error_message) on connection failure.
    """
    url = f"{protocol}://{domain}:{port}{path}"
    try:
        response = requests.get(url, timeout=10)
        return True, response.status_code
    except requests.exceptions.ConnectionError as e:
        return False, f"Connection error: {e}"
    except requests.exceptions.Timeout:
        return False, f"Request timed out after 10s"
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {e}"
