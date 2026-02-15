#!/bin/bash

# SendGrid API Key Verification Script
# This tests your SendGrid API key format and connectivity

echo "🔍 SendGrid API Key Verification"
echo "=================================="
echo ""

# Get the API key from environment or command line
API_KEY="${1:-}"

if [ -z "$API_KEY" ]; then
  echo "❌ Error: API key not provided"
  echo ""
  echo "Usage: bash verify-sendgrid.sh <api-key>"
  echo ""
  echo "Example:"
  echo "  bash verify-sendgrid.sh SG.xyA8Q5kVQ16GRmdmN5IERw"
  exit 1
fi

echo "API Key provided: ${API_KEY:0:3}...${API_KEY: -4}"
echo ""

# Check format
if [[ ! $API_KEY =~ ^SG\. ]]; then
  echo "⚠️  WARNING: API Key doesn't start with 'SG.'"
  echo ""
  echo "SendGrid API keys must start with 'SG.'"
  echo "Did you copy the full API key?"
  echo ""
  echo "Your key: $API_KEY"
  echo ""
  exit 1
fi

echo "✅ API Key format looks correct"
echo ""

# Test API connectivity
echo "Testing API connectivity..."
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "https://api.sendgrid.com/v3/stats?limit=1" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | head -n -1)

echo "HTTP Status: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ SUCCESS: API key is valid and working!"
  echo ""
  echo "Response:"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  echo ""
elif [ "$HTTP_CODE" = "401" ]; then
  echo "❌ ERROR: API key is invalid or expired"
  echo ""
  echo "Reasons:"
  echo "  1. API key is incorrect"
  echo "  2. API key has expired"
  echo "  3. API key was revoked"
  echo ""
  echo "Please generate a new API key from SendGrid:"
  echo "  1. Go to https://sendgrid.com/dashboard"
  echo "  2. Settings → API Keys"
  echo "  3. Create a new API key"
  echo ""
elif [ "$HTTP_CODE" = "403" ]; then
  echo "❌ ERROR: API key does not have required permissions"
  echo ""
  echo "Make sure your API key has 'Mail Send' permission enabled"
  echo ""
else
  echo "⚠️  Unexpected response: $HTTP_CODE"
  echo ""
  echo "Response body:"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
  echo ""
fi
