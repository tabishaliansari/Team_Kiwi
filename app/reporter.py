"""
reporter.py - Generates a JMeter HTML dashboard from a JTL results file
"""

import subprocess
import os
from config import JMETER_PATH


def generate_html_report(results_path: str, report_dir: str) -> str | None:
    """
    Run JMeter in report-generation mode to produce an HTML dashboard.
    Returns the path to index.html on success, or None on failure.
    """
    if not os.path.exists(results_path):
        print("    [reporter] Results file not found — skipping HTML report.")
        return None

    cmd = [JMETER_PATH, "-g", results_path, "-o", report_dir]
    print(f"    CMD: {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if result.returncode != 0:
            print(f"    [reporter] Report generation failed: {result.stderr[:300]}")
            return None
        index_path = os.path.join(report_dir, "index.html")
        if os.path.exists(index_path):
            return index_path
        print("    [reporter] index.html not found after report generation.")
        return None
    except Exception as e:
        print(f"    [reporter] Report generation error: {e}")
        return None
