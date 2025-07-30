# ⚡ Quick Gmail Setup for OTP Emails

## 3-Minute Setup

### 1. Google Account Setup (2 minutes)
```
1. Go to: myaccount.google.com/security
2. Enable "2-Step Verification" (if not already enabled)
3. Click "App passwords"
4. Select: Mail → Other → "Aeonark Labs"
5. Copy the 16-character password
```

### 2. Vercel Environment Variables (1 minute)
```
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add these 3 variables:
```

| Variable | Value | Example |
|----------|--------|---------|
| `GMAIL_USER` | Your Gmail address | `aeonark.lab@gmail.com` |
| `GMAIL_PASSWORD` | App password (no spaces) | `abcdefghijklmnop` |
| `JWT_SECRET` | Random secure string | `my-secret-key-123` |

### 3. Deploy
```
1. Push code to GitHub (if not already)
2. Vercel will auto-deploy with new environment variables
3. Test signup/login to receive OTP emails
```

## That's It!

Your website will now send professional OTP emails from your Gmail account.

## Test Your Setup

1. Visit your deployed website
2. Try signing up with any email address
3. Check if you receive the OTP email
4. The email will have Aeonark Labs branding and styling

## What You Get

- Professional OTP emails from your @gmail.com
- Admin notifications for new user signups
- Beautiful HTML email templates
- Secure authentication system

## Need Help?

- Check `GMAIL-ENV-SETUP.md` for detailed instructions
- Contact: aeonark.lab@gmail.com