"""
analyzer.py - Parses results.jtl and jmeter.log to determine pass/fail
Owner: Person 2 (JMeter integration)
"""

import csv
import os
from typing import Tuple, Dict
from config import ERROR_RATE_THRESHOLD


def analyze_results(results_path: str, log_path: str) -> Tuple[bool, Dict, str]:
    """
    Analyze JMeter results from JTL file and log file.
    Returns (passed, metrics_dict, summary_string)
    """
    if not os.path.exists(results_path):
        msg = "Results file not found. JMeter may have crashed or failed to start."
        return False, {"error": msg, "error_rate": 100}, msg

    metrics    = _parse_jtl(results_path)
    log_errors = _parse_log(log_path)
    error_rate = metrics.get("error_rate", 100)
    passed     = error_rate <= ERROR_RATE_THRESHOLD

    summary = _build_summary(metrics, log_errors, passed)
    return passed, metrics, summary


def _parse_jtl(results_path: str) -> Dict:
    """Parse JTL CSV and compute core metrics"""
    total         = 0
    failed        = 0
    elapsed_times = []
    error_messages = set()

    try:
        with open(results_path, "r") as f:
            reader = csv.DictReader(f)
            for row in reader:
                total += 1
                elapsed = int(row.get("elapsed", 0))
                elapsed_times.append(elapsed)

                if row.get("success", "true").strip().lower() == "false":
                    failed += 1
                    code = row.get("responseCode", "").strip()
                    msg  = row.get("responseMessage", "").strip()
                    if code or msg:
                        error_messages.add(f"HTTP {code}: {msg}" if code else msg)
    except Exception as e:
        return {"error": str(e), "total_requests": 0, "error_rate": 100}

    if total == 0:
        return {"total_requests": 0, "failed_requests": 0, "error_rate": 100, "avg_response_ms": 0}

    return {
        "total_requests":   total,
        "failed_requests":  failed,
        "passed_requests":  total - failed,
        "error_rate":       round((failed / total) * 100, 2),
        "avg_response_ms":  round(sum(elapsed_times) / len(elapsed_times), 2),
        "min_response_ms":  min(elapsed_times),
        "max_response_ms":  max(elapsed_times),
        "error_messages":   list(error_messages)[:5]
    }


def _parse_log(log_path: str) -> list:
    """Pull the last 10 ERROR/WARN lines from jmeter.log"""
    errors = []
    if not os.path.exists(log_path):
        return errors
    try:
        with open(log_path, "r") as f:
            for line in f:
                upper = line.upper()
                if "ERROR" in upper or "WARN" in upper:
                    errors.append(line.strip())
    except Exception:
        pass
    return errors[-10:]


def _build_summary(metrics: Dict, log_errors: list, passed: bool) -> str:
    """Build a human-readable summary for LLM diagnosis and Slack"""
    status = "PASSED" if passed else "FAILED"
    lines = [
        f"Test Status      : {status}",
        f"Total Requests   : {metrics.get('total_requests', 0)}",
        f"Failed Requests  : {metrics.get('failed_requests', 0)}",
        f"Error Rate       : {metrics.get('error_rate', 0)}%",
        f"Avg Response Time: {metrics.get('avg_response_ms', 0)}ms",
        f"Min Response Time: {metrics.get('min_response_ms', 0)}ms",
        f"Max Response Time: {metrics.get('max_response_ms', 0)}ms",
    ]
    if metrics.get("error_messages"):
        lines.append(f"Error Messages   : {', '.join(metrics['error_messages'])}")
    if log_errors:
        lines.append(f"JMeter Log Errors: {'; '.join(log_errors[:3])}")
    return "\n".join(lines)
