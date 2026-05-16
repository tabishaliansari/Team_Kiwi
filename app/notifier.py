"""
notifier.py - Sends formatted Slack notifications via incoming webhook
Owner: Person 3 (Slack + demo prep)
"""

import requests
import json
from config import SLACK_WEBHOOK_URL


def _send(message: str, emoji: str = "🥝"):
    """Core function to post a message to Slack"""
    if not SLACK_WEBHOOK_URL:
        # Fallback: print to console if no webhook configured
        print(f"\n[SLACK NOTIFICATION]\n{emoji}  {message}\n")
        return

    payload = {"text": f"{emoji}  *JMeter AI Agent*\n{message}"}

    try:
        resp = requests.post(
            SLACK_WEBHOOK_URL,
            data=json.dumps(payload),
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        if resp.status_code != 200:
            print(f"Slack error: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"Slack notification failed: {e}")


# ── Individual notification functions ──────────────────────────────────────────

def notify_validation_failed(requirements: dict, issues: list, attempt: int):
    msg = (
        f"*Test Validation Failed* (Attempt {attempt})\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n"
        f"*Issues Found:*\n" +
        "\n".join(f"  • {issue}" for issue in issues) +
        "\n_Regenerating test file..._"
    )
    _send(msg, "⚠️")


def notify_generated(requirements: dict):
    msg = (
        f"*Test Generated and Validated* ✅\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n"
        f"*Virtual Users:* {requirements.get('users')}\n"
        f"*Duration:* {requirements.get('duration')}s\n"
        f"*Ramp-up:* {requirements.get('ramp_up')}s\n"
        f"_Awaiting user consent to run..._"
    )
    _send(msg, "✅")


def notify_initiated(requirements: dict, is_retry: bool = False):
    label = "Re-running After Auto-fix" if is_retry else "Test Run Initiated"
    msg = (
        f"*{label}* 🏳️\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n"
        f"*Virtual Users:* {requirements.get('users')}\n"
        f"*Duration:* {requirements.get('duration')}s\n"
        f"_Running now..._"
    )
    _send(msg, "🏁")


def notify_passed(requirements: dict, metrics: dict):
    msg = (
        f"*Test PASSED* 🎉\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n\n"
        f"*Results:*\n"
        f"  • Total Requests   : {metrics.get('total_requests', 0)}\n"
        f"  • Error Rate       : {metrics.get('error_rate', 0)}%\n"
        f"  • Avg Response Time: {metrics.get('avg_response_ms', 0)}ms\n"
        f"  • Min / Max        : {metrics.get('min_response_ms', 0)}ms / {metrics.get('max_response_ms', 0)}ms"
    )
    _send(msg, "🎉")


def notify_failure_detected(requirements: dict, metrics: dict, diagnosis: str):
    errors = metrics.get("error_messages", [])
    msg = (
        f"*Test FAILED* ❌\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n\n"
        f"*Failure Stats:*\n"
        f"  • Total Requests  : {metrics.get('total_requests', 0)}\n"
        f"  • Failed Requests : {metrics.get('failed_requests', 0)}\n"
        f"  • Error Rate      : {metrics.get('error_rate', 0)}%\n"
        f"  • Avg Response    : {metrics.get('avg_response_ms', 0)}ms\n" +
        (f"  • Errors          : {', '.join(errors)}\n" if errors else "") +
        f"\n_Applying auto-fix and re-running..._"
    )
    _send(msg, "❌")


def notify_fixed(requirements: dict, metrics: dict):
    msg = (
        f"*Auto-fix Succeeded* 🔧\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n\n"
        f"*Results After Fix:*\n"
        f"  • Total Requests   : {metrics.get('total_requests', 0)}\n"
        f"  • Error Rate       : {metrics.get('error_rate', 0)}%\n"
        f"  • Avg Response Time: {metrics.get('avg_response_ms', 0)}ms"
    )
    _send(msg, "🔧")


def notify_unfixable(requirements: dict, metrics: dict, diagnosis: str):
    errors = metrics.get("error_messages", [])
    msg = (
        f"*Could Not Auto-Fix Test* ⛔\n"
        f"*Test Type:* {requirements.get('test_type', '').upper()}\n"
        f"*Endpoint:* `{requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}`\n\n"
        f"*Final Stats:*\n"
        f"  • Error Rate      : {metrics.get('error_rate', 0)}%\n"
        f"  • Failed Requests : {metrics.get('failed_requests', 0)}\n" +
        (f"  • Errors          : {', '.join(errors)}\n" if errors else "") +
        f"\n*Diagnosis:*\n{diagnosis[:600]}\n\n"
        f"_Manual investigation required._"
    )
    _send(msg, "⛔")
