"""
validator.py - Validates generated JMX against requirements using XML parsing
Owner: Person 1 (Agent logic)
"""

import xml.etree.ElementTree as ET
from typing import Tuple, List


def validate_jmx(jmx_path: str, requirements: dict) -> Tuple[bool, List[str]]:
    """
    Parse JMX and verify it matches all requirements.
    Returns (is_valid, list_of_issues)
    """
    issues = []

    # Parse XML
    try:
        tree = ET.parse(jmx_path)
        root = tree.getroot()
    except ET.ParseError as e:
        return False, [f"Invalid XML structure: {str(e)}"]

    # Extract values from JMX
    thread_count = _get_prop(root, "ThreadGroup.num_threads", "intProp")
    ramp_time    = _get_prop(root, "ThreadGroup.ramp_time",   "intProp")
    duration     = _get_prop(root, "ThreadGroup.duration",    "stringProp")
    scheduler    = _get_prop(root, "ThreadGroup.scheduler",   "boolProp")
    domain       = _get_prop(root, "HTTPSampler.domain",      "stringProp")
    port         = _get_prop(root, "HTTPSampler.port",        "stringProp")
    protocol     = _get_prop(root, "HTTPSampler.protocol",    "stringProp")
    path         = _get_prop(root, "HTTPSampler.path",        "stringProp")
    method       = _get_prop(root, "HTTPSampler.method",      "stringProp")

    # Check thread count
    req_users = int(requirements.get("users", 0))
    if thread_count is None:
        issues.append("Missing ThreadGroup.num_threads (user count)")
    elif int(thread_count) != req_users:
        issues.append(f"Thread count is {thread_count}, expected {req_users}")

    # Check duration
    req_duration = int(requirements.get("duration", 0))
    if duration is None:
        issues.append("Missing ThreadGroup.duration")
    elif int(duration) != req_duration:
        issues.append(f"Duration is {duration}s, expected {req_duration}s")

    # Check scheduler is enabled (required for duration-based runs)
    if scheduler != "true":
        issues.append("ThreadGroup.scheduler must be true for duration-based tests")

    # Check ramp-up
    req_ramp = int(requirements.get("ramp_up", 0))
    if ramp_time is None:
        issues.append("Missing ThreadGroup.ramp_time")
    elif int(ramp_time) != req_ramp:
        issues.append(f"Ramp-up is {ramp_time}s, expected {req_ramp}s")

    # Check domain
    req_domain = requirements.get("domain", "")
    if domain is None:
        issues.append("Missing HTTPSampler.domain")
    elif req_domain and req_domain not in str(domain):
        issues.append(f"Domain is '{domain}', expected '{req_domain}'")

    # Check path
    req_path = requirements.get("path", "")
    if path is None:
        issues.append("Missing HTTPSampler.path")
    elif req_path and path != req_path:
        issues.append(f"Path is '{path}', expected '{req_path}'")

    # Check protocol
    req_protocol = requirements.get("protocol", "https")
    if protocol is None:
        issues.append("Missing HTTPSampler.protocol")
    elif protocol != req_protocol:
        issues.append(f"Protocol is '{protocol}', expected '{req_protocol}'")

    # Check port
    req_port = str(requirements.get("port", 443))
    if port is None:
        issues.append("Missing HTTPSampler.port")
    elif str(port) != req_port:
        issues.append(f"Port is '{port}', expected '{req_port}'")

    # Check HTTP method
    req_method = requirements.get("method", "GET").upper()
    if method is None:
        issues.append("Missing HTTPSampler.method")
    elif method.upper() != req_method:
        issues.append(f"Method is '{method}', expected '{req_method}'")

    return len(issues) == 0, issues


def _get_prop(root, prop_name: str, prop_type: str):
    """Find a named property value anywhere in the JMX XML tree"""
    for elem in root.iter(prop_type):
        if elem.get("name") == prop_name:
            return elem.text
    return None
