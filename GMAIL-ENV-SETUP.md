# 📧 How to Add Gmail Environment Variables

## Step 1: Get Your Gmail App Password

### Enable 2-Factor Authentication
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Click "2-Step Verification" 
3. Follow the setup process if not already enabled

### Generate App Password
1. Still in Google Account Security
2. Click "App passwords" (you'll see this only after 2FA is enabled)
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter: "Aeonark Labs Website"
6. Click **Generate**
7. Copy the 16-character password (example: `abcd efgh ijkl mnop`)

## Step 2: Add to Vercel

### Option A: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

```
Name: GMAIL_USER
Value: your-email@gmail.com

Name: GMAIL_PASSWORD  
Value: abcdefghijklmnop (remove spaces from app password)

Name: JWT_SECRET
Value: your-random-secure-string-here
```

### Option B: Vercel CLI
```bash
vercel env add GMAIL_USER
# Enter: your-email@gmail.com

vercel env add GMAIL_PASSWORD
# Enter: abcdefghijklmnop

vercel env add JWT_SECRET
# Enter: your-random-secure-string
```

## Step 3: Deploy

After adding environment variables:
1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on latest deployment
3. Or push new code to trigger deployment

## Example Values

```bash
GMAIL_USER=aeonark.lab@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
JWT_SECRET=my-super-secure-random-string-123
```

## Verification

Test your setup:
1. Visit your deployed site
2. Try signing up with an email
3. Check if OTP email arrives
4. Check Vercel function logs for any errors

## Important Notes

- Remove spaces from app password: `abcd efgh ijkl mnop` becomes `abcdefghijklmnop`
- App password is different from your regular Gmail password
- Environment variables apply to new deployments only
- Keep your app password secure and don't share it

## Troubleshooting

**App password not working:**
- Delete old app password and generate new one
- Ensure 2FA is enabled first
- Copy password exactly without spaces

**Emails not sending:**
- Check Vercel function logs for errors
- Verify environment variables are set correctly
- Test with a different email address

**Can't find "App passwords":**
- Make sure 2-Factor Authentication is enabled first
- Use a computer, not mobile device
- Sign out and sign back into Google if needed