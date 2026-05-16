import os
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", "app", ".env"))

webhook_url = os.getenv("SLACK_WEBHOOK_URL")
if not webhook_url:
    raise ValueError("SLACK_WEBHOOK_URL not set in app/.env")

payload = {
    "text": "QA Agent Alert: Test execution failed!"
}

response = requests.post(webhook_url, json=payload)
print(f"Slack response: {response.status_code} {response.text}")
