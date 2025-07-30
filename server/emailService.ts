import nodemailer from 'nodemailer';

// Gmail SMTP configuration
export interface EmailConfig {
  gmail: string;           // Your Gmail address
  password: string;        // App-specific password
}

// Create Gmail transporter
export function createGmailTransporter(config: EmailConfig) {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmail,
      pass: config.password,
    },
  });
}

// Send OTP email function
export async function sendOTPEmail(
  email: string,
  otp: string,
  fromEmail: string = process.env.GMAIL_USER || 'noreply@example.com'
): Promise<boolean> {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.log("⚠️ Gmail not configured - skipping email send");
      return false;
    }

    const transporter = createGmailTransporter({
      gmail: process.env.GMAIL_USER,
      password: process.env.GMAIL_PASSWORD,
    });

    const mailOptions = {
      from: `"Aeonark Labs" <${fromEmail}>`,
      to: email,
      subject: 'Your Verification Code - Aeonark Labs',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Code</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111111; color: #ffffff;">
            <!-- Header -->
            <div style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                Aeonark Labs
              </h1>
              <p style="margin: 10px 0 0 0; color: #f0f9ff; font-size: 16px;">
                Digital Solutions That Power Your Success
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #ffffff;">
                Your Verification Code
              </h2>
              
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #d1d5db;">
                Use this code to complete your authentication:
              </p>

              <!-- OTP Code Box -->
              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; padding: 20px 40px; background-color: #1f2937; border: 2px solid #22c55e; border-radius: 12px;">
                  <span style="font-size: 32px; font-weight: 700; color: #22c55e; letter-spacing: 8px; font-family: monospace;">
                    ${otp}
                  </span>
                </div>
              </div>

              <p style="margin: 30px 0 0 0; font-size: 14px; color: #9ca3af; text-align: center;">
                This code expires in 10 minutes for your security.
              </p>

              <div style="margin: 40px 0 0 0; padding: 20px; background-color: #1f2937; border-radius: 8px; border-left: 4px solid #22c55e;">
                <p style="margin: 0; font-size: 14px; color: #d1d5db;">
                  <strong>Security Notice:</strong> Never share this code with anyone. Aeonark Labs will never ask for your verification code.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 30px; text-align: center; border-top: 1px solid #374151; background-color: #0f0f0f;">
              <p style="margin: 0 0 15px 0; font-size: 16px; color: #ffffff; font-weight: 600;">
                Welcome to Aeonark Labs
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #9ca3af;">
                Building the future of digital solutions
              </p>
              
              <div style="margin: 20px 0;">
                <a href="https://calendly.com/aeonark-lab/30min" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Schedule a Call
                </a>
              </div>
              
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #6b7280;">
                © 2025 Aeonark Labs. All rights reserved.<br>
                Email: aeonark.lab@gmail.com
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Your Aeonark Labs Verification Code: ${otp}
        
        Use this code to complete your authentication.
        This code expires in 10 minutes.
        
        Never share this code with anyone.
        
        Welcome to Aeonark Labs!
        Email: aeonark.lab@gmail.com
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return false;
  }
}

// Send admin notification email
export async function sendAdminNotification(
  userEmail: string,
  fromEmail: string = process.env.GMAIL_USER || 'noreply@example.com'
): Promise<boolean> {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.log("⚠️ Gmail not configured - skipping admin notification");
      return false;
    }

    const transporter = createGmailTransporter({
      gmail: process.env.GMAIL_USER,
      password: process.env.GMAIL_PASSWORD,
    });

    const mailOptions = {
      from: `"Aeonark Labs System" <${fromEmail}>`,
      to: 'aeonark.lab@gmail.com',
      subject: '🚀 New User Signup - Aeonark Labs',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New User Signup</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div style="padding: 30px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                🎉 New User Signup
              </h1>
            </div>

            <div style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">
                User Details
              </h2>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; color: #374151;"><strong>Email:</strong> ${userEmail}</p>
                <p style="margin: 0 0 10px 0; color: #374151;"><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 0; color: #374151;"><strong>Status:</strong> Email verified ✅</p>
              </div>

              <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px;">
                The user has successfully completed email verification and is now ready for onboarding.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://your-admin-dashboard.com" style="display: inline-block; padding: 12px 24px; background-color: #22c55e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  View in Dashboard
                </a>
              </div>
            </div>

            <div style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                Automated notification from Aeonark Labs
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
}