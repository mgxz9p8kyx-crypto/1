# Qabyo-Tire Trading Company - Deployment Guide

## Overview
This guide walks you through deploying the Qabyo-Tire Trading Company website to Vercel with a fully functional backend system including admin dashboard, contact form submissions management, and livestock statistics tracking.

## Prerequisites
- Vercel account (free tier available)
- SendGrid account (free tier available)
- GitHub account (for connecting to Vercel)

## Environment Variables

Set these environment variables in your Vercel project settings:

### Admin Authentication
\`\`\`
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD_HASH=base64-encoded-password
\`\`\`

To generate the password hash:
1. Choose a secure password
2. Encode it in base64: `echo -n "your-password" | base64`
3. Copy the result to `ADMIN_PASSWORD_HASH`

Example:
\`\`\`bash
# If password is "SecurePass123"
echo -n "SecurePass123" | base64
# Output: U2VjdXJlUGFzczEyMw==
# Set ADMIN_PASSWORD_HASH=U2VjdXJlUGFzczEyMw==
\`\`\`

### SendGrid Configuration
\`\`\`
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@qabyotire.com
CONTACT_EMAIL=qabyotire99@gmail.com
\`\`\`

To configure SendGrid correctly:

**Step 1: Create a SendGrid Account**
1. Sign up at https://sendgrid.com (free tier available - 100 emails/day)
2. Complete email verification
3. Go to your dashboard

**Step 2: Create an API Key**
1. In SendGrid dashboard, click your profile name (top right) → "Account"
2. Navigate to "Settings" → "API Keys"
3. Click "Create API Key"
4. Name it "Qabyo Tire" or similar
5. Select "Restricted Access"
6. Under "Mail Send", enable "Mail Send" permission
7. Click "Create & View"
8. Copy the full API key (starts with `SG.`) and save it securely

**Step 3: Verify Sender Domain (Recommended)**
1. In SendGrid dashboard, go to "Settings" → "Sender Authentication"
2. Choose "Verify a Domain"
3. Enter domain: `qabyotire.com` (or your domain)
4. Add the DNS records to your domain registrar
5. Once verified, you can use any email like `noreply@qabyotire.com`

**Alternative: Verify Single Sender**
If domain verification is too complex:
1. Go to "Settings" → "Sender Authentication"  
2. Click "Verify a Single Sender"
3. Use your business email (qabyotire99@gmail.com)
4. Click the verification link sent to that email
5. Update \`FROM_EMAIL\` to use the verified sender email

**Step 4: Configure Environment Variables on Vercel**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these three variables:
   - \`SENDGRID_API_KEY\`: Your API key (SG....)
   - \`FROM_EMAIL\`: noreply@qabyotire.com (or verified email)
   - \`CONTACT_EMAIL\`: qabyotire99@gmail.com
5. Make sure they're available in "Production" environment
6. Click "Save"

**Step 5: Test the Setup**
1. Redeploy your Vercel project (or wait for auto-deploy)
2. Go to your website's contact form
3. Submit a test message
4. Check the contact email for the submission
5. Check SendGrid dashboard under "Activity" → "Email" to see delivery status

**Troubleshooting:**
- **"Failed to send email"**: Check that SENDGRID_API_KEY is correct and not expired
- **Emails not received**: Verify FROM_EMAIL is verified in SendGrid
- **Emails going to spam**: Add SPF and DKIM records (done during domain verification)
- **SendGrid free tier limit**: Limited to 100 emails/day. Upgrade for unlimited

## Deployment Steps

### 1. Push Code to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/qabyo-tire.git
git push -u origin main
\`\`\`

### 2. Connect to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

### 3. Set Environment Variables
1. In Vercel project settings, go to "Environment Variables"
2. Add all the variables listed above
3. Make sure they're available in "Production" environment

### 4. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your site will be live at `https://your-project.vercel.app`

## Accessing the Admin Dashboard

1. Go to `https://your-project.vercel.app/admin`
2. Log in with your ADMIN_EMAIL and password
3. You can now:
   - Update livestock export statistics
   - View contact form submissions
   - Manage submission statuses (new, read, responded)
   - Delete submissions

## Features

### Public Website
- **Hero Section**: Eye-catching introduction
- **Livestock Tracker**: Real-time export statistics (cattle, goats, sheep, camels)
- **About Section**: Company history and experience
- **Services**: Premium livestock trading services
- **Why Choose Us**: Competitive advantages
- **Contact Form**: Direct contact with SendGrid email integration

### Admin Dashboard
- **Authentication**: Secure login with email/password
- **Tracker Management**: Update livestock export numbers in real-time
- **Submissions Management**: 
  - View all contact form submissions
  - Filter by status (new, read, responded)
  - Mark submissions as handled
  - Delete old submissions
  - Quick email/phone access

## API Endpoints

### Public API
- `GET /api/stats` - Get current livestock statistics

### Contact API
- `POST /api/contact` - Submit contact form
  \`\`\`json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+252 123 456 789",
    "message": "Your message"
  }
  \`\`\`

### Admin API (Requires Authentication)
- `GET /api/admin/auth` - Check authentication status
- `POST /api/admin/auth` - Login
  \`\`\`json
  {
    "email": "admin@example.com",
    "password": "password"
  }
  \`\`\`
- `DELETE /api/admin/auth` - Logout
- `POST /api/stats` - Update livestock statistics
- `GET /api/admin/submissions` - Get all submissions
- `PATCH /api/admin/submissions` - Update submission status
- `DELETE /api/admin/submissions` - Delete submission

## Troubleshooting

### Login Not Working
- Check that ADMIN_EMAIL and ADMIN_PASSWORD_HASH are correctly set
- Verify the password was encoded in base64 correctly
- Try re-deploying after updating environment variables

### Contact Form Not Sending Emails
- Verify SENDGRID_API_KEY is correctly set
- Check SendGrid account has sufficient credits
- Look at Vercel function logs for error messages
- Ensure FROM_EMAIL domain is verified in SendGrid

### Submissions Not Appearing
- Current implementation uses in-memory storage (resets on deployment)
- For persistent storage, integrate with a database (Supabase, Neon, etc.)

## Next Steps for Production

1. **Database Integration**: Replace in-memory storage with persistent database
2. **Email Templates**: Create professional email templates for SendGrid
3. **Analytics**: Add Vercel Analytics to track visitor behavior
4. **Security**: Implement rate limiting on contact form
5. **Backup**: Set up automated backups for submission data

## Support

For issues or questions:
- Email: qabyotire99@gmail.com
- Phone: +252 063 4241477 or +44 7951 301222
