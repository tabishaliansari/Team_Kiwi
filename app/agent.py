#!/usr/bin/env python3
"""
JMeter AI Agent - CLI-based performance test automation
Usage: python agent.py "Run a spike test on https://httpbin.org/get with 50 users for 30 seconds"
"""

import argparse
import sys
import os
import json
from datetime import datetime
from groq import Groq
from generator import generate_jmx
from validator import validate_jmx
from runner import run_jmeter
from analyzer import analyze_results
from fixer import fix_jmx
from notifier import (
    notify_validation_failed,
    notify_generated,
    notify_initiated,
    notify_passed,
    notify_failure_detected,
    notify_fixed,
    notify_unfixable,
    notify_preflight_failed
)
from preflight import check_endpoint
from github_sync import push_run_to_github
from config import TESTS_DIR, MAX_VALIDATION_RETRIES, GROQ_API_KEY, MODEL


def parse_requirements(prompt: str) -> dict:
    """Extract structured test requirements from natural language prompt"""
    client = Groq(api_key=GROQ_API_KEY)

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """Extract performance test requirements from the user prompt.
Return ONLY a JSON object with these exact keys:
{
  "test_type": "spike|soak|stress|load",
  "endpoint": "full URL",
  "protocol": "https or http",
  "domain": "domain only e.g. httpbin.org",
  "path": "path only e.g. /get",
  "port": 443,
  "method": "GET|POST|PUT|DELETE",
  "users": number,
  "ramp_up": number in seconds,
  "duration": number in seconds,
  "description": "brief description"
}
Defaults if not specified:
- spike: 100 users, 5s ramp_up, 30s duration
- soak: 20 users, 30s ramp_up, 300s duration
- stress: 200 users, 10s ramp_up, 60s duration
- load: 50 users, 10s ramp_up, 60s duration
Return ONLY the JSON. No markdown, no backticks, no explanation."""
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.1
    )

    content = response.choices[0].message.content.strip()
    content = content.replace("```json", "").replace("```", "").strip()
    return json.loads(content)


def get_user_consent() -> bool:
    """Ask user for consent before running the test"""
    print("\n" + "=" * 55)
    print("  Test case generated and validated successfully.")
    print("  Do you want to run the performance test now?")
    print("=" * 55)
    while True:
        choice = input("  Run test? [y/n]: ").strip().lower()
        if choice in ["y", "yes"]:
            return True
        elif choice in ["n", "no"]:
            return False
        else:
            print("  Please enter y or n")


def main():
    parser = argparse.ArgumentParser(
        description="JMeter AI Agent - Generate, validate, run and auto-fix performance tests"
    )
    parser.add_argument("prompt", help="Natural language test description")
    parser.add_argument("--output-dir", default=TESTS_DIR, help="Output directory for test files")
    args = parser.parse_args()

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    args.output_dir = os.path.join(args.output_dir, timestamp)

    print("\n🤖  JMeter AI Agent Starting...")
    print(f"📝  Prompt: {args.prompt}")
    print(f"📁  Run folder: {args.output_dir}\n")

    # Setup paths
    os.makedirs(args.output_dir, exist_ok=True)
    jmx_path     = os.path.join(args.output_dir, "test.jmx")
    results_path = os.path.join(args.output_dir, "results.jtl")
    log_path     = os.path.join(args.output_dir, "jmeter.log")

    # ── Step 1: Parse requirements ──────────────────────────────────────────
    print("📋  Parsing requirements from prompt...")
    requirements = parse_requirements(args.prompt)
    requirements["test_id"] = timestamp
    print(f"    Test Type : {requirements.get('test_type', '').upper()}")
    print(f"    Endpoint  : {requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}")
    print(f"    Users     : {requirements.get('users')}")
    print(f"    Duration  : {requirements.get('duration')}s\n")

    # ── Step 1b: Pre-flight check ────────────────────────────────────────────
    print("🔍  Running pre-flight check...")
    reachable, result = check_endpoint(
        requirements.get("protocol"),
        requirements.get("domain"),
        requirements.get("port", 443),
        requirements.get("path", "/"),
    )
    if not reachable:
        print(f"❌  Pre-flight failed: {result}")
        notify_preflight_failed(requirements, result)
        sys.exit(1)
    print(f"    Endpoint reachable (HTTP {result})\n")

    # ── Step 2: Generate + Validate JMX (loop until valid) ──────────────────
    feedback = None
    for attempt in range(1, MAX_VALIDATION_RETRIES + 1):
        print(f"🔧  Generating JMX (attempt {attempt}/{MAX_VALIDATION_RETRIES})...")
        jmx_content = generate_jmx(requirements, feedback)

        with open(jmx_path, "w") as f:
            f.write(jmx_content)

        print("✅  Validating JMX against requirements...")
        is_valid, issues = validate_jmx(jmx_path, requirements)

        if is_valid:
            print("    Validation passed!\n")
            notify_generated(requirements)
            break
        else:
            print(f"    Validation failed: {issues}")
            feedback = issues
            notify_validation_failed(requirements, issues, attempt)

            if attempt >= MAX_VALIDATION_RETRIES:
                print("\n❌  Max validation retries reached. Exiting.")
                sys.exit(1)

    # ── Step 3: User consent ─────────────────────────────────────────────────
    if not get_user_consent():
        print("\n  Test run cancelled by user. Exiting.")
        sys.exit(0)

    # ── Step 4: First run ────────────────────────────────────────────────────
    print("\n🚀  Running JMeter test...")
    notify_initiated(requirements)

    returncode, _, stderr = run_jmeter(jmx_path, results_path, log_path)
    if returncode == -1:
        print(f"\n❌  JMeter failed to run: {stderr}")
        sys.exit(1)

    # ── Step 5: Analyze results ───────────────────────────────────────────────
    print("\n📊  Analyzing results...")
    passed, metrics, summary = analyze_results(results_path, log_path)

    if passed:
        print("✅  Test PASSED!")
        github_url = push_run_to_github(timestamp, jmx_path, results_path, log_path)
        if github_url:
            print(f"📦  Run artifacts: {github_url}")
        notify_passed(requirements, metrics, github_url=github_url)
        sys.exit(0)

    # ── Step 6: Auto-fix and one retry ────────────────────────────────────────
    print("\n🔍  Test FAILED. Diagnosing and applying auto-fix...")
    github_url = push_run_to_github(timestamp, jmx_path, results_path, log_path)
    if github_url:
        print(f"📦  Run artifacts: {github_url}")
    notify_failure_detected(requirements, metrics, summary, github_url=github_url)

    with open(jmx_path, "r") as f:
        jmx_content = f.read()

    fixed_jmx = fix_jmx(jmx_content, summary, requirements)

    if not fixed_jmx:
        print("❌  Agent could not determine a fix. Sending diagnosis to Slack.")
        notify_unfixable(requirements, metrics, summary, github_url=github_url)
        sys.exit(1)

    print("🔧  Fix applied. Re-running test...")
    with open(jmx_path, "w") as f:
        f.write(fixed_jmx)

    notify_initiated(requirements, is_retry=True)
    returncode, _, stderr = run_jmeter(jmx_path, results_path, log_path)
    if returncode == -1:
        print(f"\n❌  JMeter failed to run: {stderr}")
        sys.exit(1)

    passed, metrics, summary = analyze_results(results_path, log_path)
    github_url = push_run_to_github(timestamp, jmx_path, results_path, log_path)
    if github_url:
        print(f"📦  Run artifacts: {github_url}")

    if passed:
        print("✅  Auto-fix succeeded! Test PASSED.")
        notify_fixed(requirements, metrics, github_url=github_url)
    else:
        print("❌  Auto-fix failed. Sending full diagnosis to Slack.")
        notify_unfixable(requirements, metrics, summary, github_url=github_url)


if __name__ == "__main__":
    main()
