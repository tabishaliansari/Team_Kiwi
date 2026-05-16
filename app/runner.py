"""
runner.py - Executes JMeter tests via CLI subprocess
Owner: Person 2 (JMeter integration)
"""

import subprocess
import os
from config import JMETER_PATH


def run_jmeter(jmx_path: str, results_path: str, log_path: str, timeout: int = 600) -> tuple[int, str, str]:
    """
    Run JMeter in non-GUI mode.
    Returns (returncode, stdout, stderr)
    """
    # Clear old result files so we don't analyze stale data
    for path in [results_path, log_path]:
        if os.path.exists(path):
            os.remove(path)

    cmd = [
        JMETER_PATH,
        "-n",               # Non-GUI / headless mode
        "-t", jmx_path,     # Test plan file
        "-l", results_path, # Results output (JTL/CSV)
        "-j", log_path,     # JMeter log file
    ]

    print(f"    CMD: {' '.join(cmd)}")

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        # Print JMeter's own output so it's visible in CLI
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(result.stderr)

        return result.returncode, result.stdout, result.stderr

    except subprocess.TimeoutExpired:
        return -1, "", f"JMeter timed out after {timeout}s"
    except FileNotFoundError:
        return -1, "", "JMeter not found. Is it installed and added to PATH?"
