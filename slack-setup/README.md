# Slack Webhook Setup for QA AI Agent

This guide explains how to:

* Create a Slack Incoming Webhook URL
* Set up a Python virtual environment (`venv`)
* Install dependencies
* Send Slack notifications using Python

---

# 1. Create a Slack Incoming Webhook

## Step 1: Open Slack Apps

Go to:

https://api.slack.com/apps

Click **"Create New App"**

---

## Step 2: Create App From Scratch

* Enter App Name
  Example: `QA Agent Alerts`

* Select your Slack Workspace

* Click **Create App**

---

## Step 3: Enable Incoming Webhooks

In the left sidebar:

* Open **Incoming Webhooks**
* Turn ON:

`Activate Incoming Webhooks`

---

## Step 4: Add Webhook to Workspace

Click:

`Add New Webhook to Workspace`

Then:

* Choose the Slack channel
* Click **Allow**

---

## Step 5: Copy the Webhook URL

Slack will generate a URL like:

```text
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXX
```

Save this URL securely.

---

# 2. Create Python Virtual Environment

## Navigate to Project Folder

```powershell
cd "C:\Users\Arin\Desktop"
```

---

## Create Virtual Environment

```powershell
python -m venv qa_env
```

This creates a folder named `qa_env`.

---

## Activate Virtual Environment

### PowerShell

```powershell
.\qa_env\Scripts\Activate.ps1
```

If execution policy blocks activation:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate again.

---

# 3. Install Required Dependencies

Install `requests` library:

```powershell
pip install requests
```

---

# 4. Create Python Slack Notification Script

Create a file:

```text
test_QA.py
```

Add the following code:

```python
import requests

webhook_url = "YOUR_SLACK_WEBHOOK_URL"

payload = {
    "text": "Hello from QA AI Agent 🚀"
}

response = requests.post(webhook_url, json=payload)

print("Status Code:", response.status_code)
print("Response:", response.text)
```

Replace:

```python
YOUR_SLACK_WEBHOOK_URL
```

with your actual Slack webhook URL.

---

# 5. Run the Python Script

```powershell
python test_QA.py
```

If successful:

* Status code should be `200`
* Message should appear in Slack channel instantly

---

# 6. Freeze Dependencies (Recommended)

Generate `requirements.txt`

```powershell
pip freeze > requirements.txt
```

Install dependencies later using:

```powershell
pip install -r requirements.txt
```

---

# 7. Deactivate Virtual Environment

```powershell
deactivate
```

---

# Example Slack Notification Output

```text
Hello from QA AI Agent 🚀
```

---

# Recommended Use Cases

This setup can be used for:

* Automated QA alerts
* Failed test notifications
* CI/CD pipeline alerts
* AI Agent summaries
* Jenkins/GitHub Actions integration
* Production monitoring alerts

---

# Useful Links

Slack API Apps:
https://api.slack.com/apps

Slack Incoming Webhooks:
https://api.slack.com/messaging/webhooks

Slack Block Kit Builder:
https://app.slack.com/block-kit-builder
