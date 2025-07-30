# 📧 Gmail Setup Guide for Aeonark Labs

## Overview
This guide helps you set up Gmail to send OTP emails using your @gmail.com address through Google's SMTP service.

## 🔐 Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", enable **2-Step Verification**
3. Follow the setup process to secure your account

## 🔑 Step 2: Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **App passwords**
3. Select app: **Mail**
4. Select device: **Other** (enter "Aeonark Labs Website")
5. Copy the 16-character app password (e.g., `abcd efgh ijkl mnop`)

## ⚙️ Step 3: Set Environment Variables

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add these variables:

```bash
# Your Gmail address
GMAIL_USER=your-email@gmail.com

# The app password from Step 2 (remove spaces)
GMAIL_PASSWORD=abcdefghijklmnop

# Optional: JWT secret for secure authentication
JWT_SECRET=your-super-secret-random-string-here
```

### For Local Development:
Create a `.env` file in your project root:

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
JWT_SECRET=your-super-secret-random-string-here
```

## 📧 How It Works

### OTP Email Flow:
1. User enters email for signup/login
2. System generates 6-digit OTP
3. Gmail SMTP sends beautiful HTML email with OTP
4. User enters OTP to verify and complete authentication

### Admin Notifications:
- New user signups trigger admin notification to `aeonark.lab@gmail.com`
- Includes user email, signup time, and verification status

## 🎨 Email Templates

### OTP Email Features:
- ✅ Professional Aeonark Labs branding
- ✅ Dark theme matching website design
- ✅ Large, easy-to-read OTP code
- ✅ Security warnings and expiry info
- ✅ Call-to-action button for scheduling
- ✅ Mobile-responsive design

### Admin Notification Features:
- ✅ Clean, professional layout
- ✅ User details and signup timestamp
- ✅ Dashboard link for user management
- ✅ Automated system identification

## 🔒 Security Features

- **App Passwords**: Uses Google's secure app password system
- **OTP Expiry**: Codes expire after 10 minutes
- **Single Use**: OTPs are deleted after successful verification
- **SMTP Encryption**: All emails sent over secure connection
- **Error Handling**: Graceful fallbacks if email service unavailable

## 🧪 Testing

### Development Mode:
- Without Gmail configured: Shows OTP in console for testing
- With Gmail configured: Sends real emails

### Production Mode:
- Requires Gmail credentials for full functionality
- Falls back gracefully if credentials missing

## 📊 Environment Variable Examples

```bash
# Example Gmail setup
GMAIL_USER=aeonark.lab@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop

# Strong JWT secret (generate random string)
JWT_SECRET=your-256-bit-secret-key-here

# Optional database (app works without it)
DATABASE_URL=postgresql://user:pass@host:port/db
```

## 🛠 Troubleshooting

### Email Not Sending:
1. Verify Gmail credentials are correct
2. Check app password has no spaces
3. Ensure 2FA is enabled on Google account
4. Verify environment variables are set in Vercel

### OTP Not Received:
1. Check spam/junk folder
2. Verify email address is correct
3. Wait up to 2 minutes for delivery
4. Use development OTP if in development mode

### App Password Issues:
1. Delete old app password and generate new one
2. Use "Other" device type when generating
3. Copy password exactly (remove spaces)
4. Update environment variables with new password

## 🚀 Benefits

- **Professional**: Emails sent from your @gmail.com address
- **Reliable**: Google's robust email infrastructure
- **Secure**: App passwords protect your main Gmail password
- **Free**: No additional costs for email sending
- **Branded**: Custom HTML templates with Aeonark Labs design

## 📞 Support

If you need help with Gmail setup:
- Check [Google's App Password Guide](https://support.google.com/accounts/answer/185833)
- Contact: aeonark.lab@gmail.com

---

**Ready to send professional OTP emails from your Gmail account!** 📧