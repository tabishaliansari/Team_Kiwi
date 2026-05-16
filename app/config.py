import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY       = os.getenv("GROQ_API_KEY")
SLACK_WEBHOOK_URL  = os.getenv("SLACK_WEBHOOK_URL")
JMETER_PATH        = os.getenv("JMETER_PATH", "jmeter")
TESTS_DIR          = os.getenv("TESTS_DIR", os.path.expanduser("~/.tests"))

MODEL              = "llama-3.3-70b-versatile"
MAX_VALIDATION_RETRIES = 3
ERROR_RATE_THRESHOLD   = 5.0   # % -- test fails if error rate exceeds this
