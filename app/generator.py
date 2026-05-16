"""
generator.py - Uses Groq LLM to generate a valid JMeter test plan (.jmx)
Owner: Person 1 (Agent logic)
"""

from groq import Groq
from config import GROQ_API_KEY, MODEL

SYSTEM_PROMPT = """You are an Apache JMeter expert. Generate a valid JMeter test plan (.jmx).

IMPORTANT: Return ONLY raw XML. No markdown, no backticks, no explanation.

Use this exact structure:
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Performance Test">
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Users">
        <intProp name="ThreadGroup.num_threads">USERS</intProp>
        <intProp name="ThreadGroup.ramp_time">RAMP_UP</intProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">DURATION</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController">
          <boolProp name="LoopController.continue_forever">true</boolProp>
          <intProp name="LoopController.loops">-1</intProp>
        </elementProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request">
          <stringProp name="HTTPSampler.domain">DOMAIN</stringProp>
          <stringProp name="HTTPSampler.port">PORT</stringProp>
          <stringProp name="HTTPSampler.protocol">PROTOCOL</stringProp>
          <stringProp name="HTTPSampler.path">PATH</stringProp>
          <stringProp name="HTTPSampler.method">METHOD</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
        </HTTPSamplerProxy>
        <hashTree/>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>

Replace USERS, RAMP_UP, DURATION, DOMAIN, PORT, PROTOCOL, PATH, METHOD with the actual values."""


def generate_jmx(requirements: dict, feedback: list = None) -> str:
    """
    Generate a JMX file from requirements.
    If feedback is provided, it means a previous generation failed validation.
    """
    client = Groq(api_key=GROQ_API_KEY)

    feedback_block = ""
    if feedback:
        feedback_block = "\n\nPREVIOUS ATTEMPT FAILED VALIDATION. Fix these issues:\n" + \
                         "\n".join(f"  - {issue}" for issue in feedback)

    user_message = f"""Generate a JMeter test plan with these exact values:

Test Type  : {requirements.get('test_type', 'load').upper()}
Domain     : {requirements.get('domain')}
Port       : {requirements.get('port', 443)}
Protocol   : {requirements.get('protocol', 'https')}
Path       : {requirements.get('path', '/')}
Method     : {requirements.get('method', 'GET')}
Users      : {requirements.get('users')}
Ramp-up    : {requirements.get('ramp_up')} seconds
Duration   : {requirements.get('duration')} seconds
Description: {requirements.get('description', '')}
{feedback_block}

Return ONLY the raw XML. No markdown, no backticks."""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": user_message}
        ],
        temperature=0.1,
        max_tokens=2000
    )

    content = response.choices[0].message.content.strip()
    content = content.replace("```xml", "").replace("```", "").strip()
    return content
