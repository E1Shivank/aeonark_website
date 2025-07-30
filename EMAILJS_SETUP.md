# EmailJS Setup Guide

## Overview
The contact form on the Aeonark Labs website uses EmailJS to send emails directly from the client-side without needing a backend server. This guide will help you set up EmailJS to receive contact form submissions at aeonark.labs@gmail.com.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your service provider
4. Connect your Gmail account (aeonark.labs@gmail.com)
5. Note down the **Service ID** (e.g., `service_aeonark`)

### 3. Create an Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the Aeonark Labs contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_contact`)

### 4. Get Your Public Key
1. Go to "Integration" in your dashboard
2. Copy your **Public Key** (starts with letters and numbers)

### 5. Set Environment Variables
Create a `.env` file in your project root with:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Test the Setup
1. Fill out the contact form on your website
2. Check your Gmail inbox for the test email
3. Verify that all form fields are properly populated

## Template Variables
The contact form sends these variables to EmailJS:
- `from_name`: Sender's name
- `from_email`: Sender's email address  
- `subject`: Email subject
- `message`: Email message content
- `to_email`: Recipient email (aeonark.labs@gmail.com)

## Troubleshooting
- If emails aren't sending, check the browser console for errors
- Make sure your Gmail account is properly connected to EmailJS
- Verify that all environment variables are set correctly
- Check your EmailJS monthly quota (100 emails/month on free plan)

## Security Notes
- The public key is safe to expose in client-side code
- EmailJS handles the actual email sending securely
- No sensitive credentials are stored in the frontend code