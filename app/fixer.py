"""
fixer.py - Uses Groq LLM to auto-fix a failing JMeter test
Owner: Person 2 (JMeter integration)
"""

from groq import Groq
from config import GROQ_API_KEY, MODEL


def fix_jmx(jmx_content: str, failure_summary: str, requirements: dict) -> str | None:
    """
    Analyze the failure and return a fixed JMX string.
    Returns None if the issue cannot be fixed by modifying the JMX.
    """
    client = Groq(api_key=GROQ_API_KEY)

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": """You are a JMeter expert debugging a failed performance test.
Analyze the failure and return a corrected JMX file.

Common fixes by error type:
- HTTP 404 Not Found   : Wrong path in HTTPSampler.path - fix the endpoint path
- Connection refused   : Wrong domain or port - fix HTTPSampler.domain / port
- SSL / HTTPS errors   : Wrong protocol - fix HTTPSampler.protocol
- Timeout errors       : Load too high - reduce ThreadGroup.num_threads or increase ramp_time
- No results at all    : JMeter config issue - check ThreadGroup scheduler and duration settings

Return ONLY the corrected XML. No markdown, no backticks, no explanation.
If the failure is caused by the target server being down (not a JMX issue), return exactly: UNFIXABLE"""
            },
            {
                "role": "user",
                "content": f"""Fix this failing JMeter test.

FAILURE SUMMARY:
{failure_summary}

ORIGINAL REQUIREMENTS:
  Endpoint : {requirements.get('protocol')}://{requirements.get('domain')}{requirements.get('path')}
  Users    : {requirements.get('users')}
  Duration : {requirements.get('duration')}s
  Ramp-up  : {requirements.get('ramp_up')}s

CURRENT JMX:
{jmx_content}

Return the fixed XML only."""
            }
        ],
        temperature=0.1,
        max_tokens=2000
    )

    content = response.choices[0].message.content.strip()
    content = content.replace("```xml", "").replace("```", "").strip()

    if content.upper().startswith("UNFIXABLE"):
        return None

    return content
