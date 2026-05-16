import requests

webhook_url = "MY_WEBHOOK_URL"

payload = {
    "text": "QA Agent Alert: Test execution failed!"
}

requests.post(webhook_url, json=payload)