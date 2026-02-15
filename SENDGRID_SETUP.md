# SendGrid Configuration Guide

This guide explains how to set up SendGrid to handle email submissions from the contact form.

## Table of Contents
1. [Create SendGrid Account](#create-sendgrid-account)
2. [Generate API Key](#generate-api-key)
3. [Verify Sender](#verify-sender)
4. [Set Environment Variables](#set-environment-variables)
5. [Test Configuration](#test-configuration)

---

## Create SendGrid Account

1. Go to https://sendgrid.com
2. Click "Sign up"
3. Enter your information:
   - Business Email: qabyotire99@gmail.com
   - Business Name: Qabyo Tire Trading Company
   - Phone: +252 063 4241477
4. Create a password and verify your email
5. Complete the "Getting Started" steps

## Generate API Key

1. Log into SendGrid dashboard
2. Click your username/profile in top-right corner
3. Select **Account** from dropdown
4. On left sidebar, go to **Settings** → **API Keys**
5. Click **Create API Key** button
6. Set these options:
   - **API Key Name**: "Qabyo Tire Production"
   - **Access Level**: Select "Restricted Access" (recommended for security)
   
7. Enable permissions:
   - Under **Mail Send**, check: ✅ **Mail Send**
   - Leave all others unchecked for security
   
8. Click **Create & View**
9. **Copy the full API key** (starts with `SG.`) and save it somewhere safe
10. ⚠️ **Save this immediately** - you won't see it again!

### API Key Format
Your API key will look like:
```
SG.K8kq4Fq6e_Iu-p8klwR8Dg.k0yL4Tb8_Yq2ZxP9WjR3-V4q6sT8uWxY2zAb5cDeF9
```

---

## Verify Sender

You have two options: verify your domain or verify a single sender email.

### Option A: Verify Your Domain (Recommended)

If you own the domain `qabyotire.com`:

1. In SendGrid, go to **Settings** → **Sender Authentication**
2. Click **Verify a Domain**
3. Enter domain: `qabyotire.com`
4. Select your DNS host (e.g., Namecheap, GoDaddy, etc.)
5. Add the 3 DNS records provided:
   - CNAME record with host `em`
   - CNAME record with host `s1._domainkey`
   - CNAME record with host `s2._domainkey`
6. Click "Verify Domain"
7. Once verified (can take 10-30 minutes), you can send from any email like:
   - `noreply@qabyotire.com` ✅
   - `support@qabyotire.com` ✅
   - `admin@qabyotire.com` ✅

### Option B: Verify Single Sender Email (Easier)

1. In SendGrid, go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in:
   - **From Email**: `qabyotire99@gmail.com`
   - **From Name**: `Qabyo Tire`
   - **Reply To Email**: `qabyotire99@gmail.com`
4. Click **Create**
5. Check your email for verification link
6. Click the link to verify
7. Set this email as `FROM_EMAIL` in environment variables

---

## Set Environment Variables

### On Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your "Qabyo Tire" project
3. Click **Settings**
4. Go to **Environment Variables** (left sidebar)
5. Add three new variables:

| Variable Name | Value | Example |
|---|---|---|
| `SENDGRID_API_KEY` | Your API key (from Step "Generate API Key" above) | `SG.K8kq4Fq...` |
| `FROM_EMAIL` | Verified sender email | `noreply@qabyotire.com` or `qabyotire99@gmail.com` |
| `CONTACT_EMAIL` | Where to receive submissions | `qabyotire99@gmail.com` |

6. Make sure **Environment** is set to "Production"
7. Click "Save"
8. Redeploy your project (or it will auto-deploy on next push)

### Local Development (.env.local)

For testing locally, create `.env.local`:
```
SENDGRID_API_KEY=SG.your_api_key_here
FROM_EMAIL=noreply@qabyotire.com
CONTACT_EMAIL=qabyotire99@gmail.com
ADMIN_EMAIL=admin@qabyotire.com
ADMIN_PASSWORD_HASH=base64_encoded_password
```

---

## Test Configuration

### Test 1: Check API Key

Run this command in terminal (replace with your actual key):
```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header "Authorization: Bearer SG.your_api_key" \
  --header "Content-Type: application/json" \
  --data '{
    "personalizations": [{
      "to": [{"email": "qabyotire99@gmail.com"}]
    }],
    "from": {"email": "noreply@qabyotire.com"},
    "subject": "Test Email",
    "content": [{
      "type": "text/plain",
      "value": "This is a test!"
    }]
  }'
```

Expected response: Status 202 (Accepted)

### Test 2: Use Your Website Form

1. Visit your website: `https://your-project.vercel.app`
2. Scroll to "Contact" section
3. Fill out the form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Country: "Other"
   - Message: "Testing the contact form"
4. Click "Send Message"
5. You should see "Message Sent" confirmation
6. Check `qabyotire99@gmail.com` for the email

### Test 3: Check SendGrid Activity

1. Go to SendGrid dashboard
2. Click **Email Activity** or **Activity** (left sidebar)
3. Look for your test email
4. Check the delivery status
5. Click the email to see full details

---

## Troubleshooting

### "Failed to send email"
- ❌ API key is incorrect or expired
- ❌ API key doesn't have "Mail Send" permission
- ✅ Solution: Create a new API key with correct permissions

### "Invalid email address specified"
- ❌ FROM_EMAIL is not verified in SendGrid
- ✅ Solution: Verify the domain or single sender email (see "Verify Sender" section)

### Emails not received
- ❌ Email going to spam because domain not verified
- ❌ CONTACT_EMAIL is incorrect
- ✅ Solution: Verify your domain with DNS records for better deliverability

### SendGrid shows "Error"
- ❌ API key format is wrong
- ❌ Headers are incorrect
- ✅ Solution: Double-check that key starts with `SG.` and is exactly as shown in SendGrid

### SendGrid shows "Dropped"
- ❌ Possible reasons: bounce, unsubscribe, or invalid email
- ✅ Solution: Check the "Reason" column in SendGrid activity log

---

## SendGrid Free Tier Limits

- **Max emails per day**: 100
- **Max emails per month**: 3,000
- **Features**: Basic email sending, activity tracking, bounce management
- **Support**: Community support only

For higher limits, upgrade to a paid plan.

---

## Production Checklist

Before going live, verify:

- [ ] SendGrid account created and verified
- [ ] API key generated with "Mail Send" permission
- [ ] Sender email verified (domain or single sender)
- [ ] All 3 environment variables set on Vercel
- [ ] Project redeployed after setting env vars
- [ ] Test email sent successfully through form
- [ ] Test email received in CONTACT_EMAIL inbox
- [ ] SPF and DKIM records added (if domain verified)
- [ ] Unsubscribe link not required for transactional emails

---

## Support

- **SendGrid Help**: https://support.sendgrid.com
- **SendGrid API Docs**: https://docs.sendgrid.com
- **Your Contact Email**: qabyotire99@gmail.com
