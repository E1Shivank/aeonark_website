
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

// Create Gmail transporter
function createGmailTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const contactData = contactSchema.parse(req.body);
    const { name, email, subject, message } = contactData;
    
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.error("Gmail credentials not configured");
      return res.status(500).json({ 
        success: false,
        error: "Email service not configured" 
      });
    }

    const transporter = createGmailTransporter();

    const mailOptions = {
      from: `"Aeonark Labs Contact Form" <${process.env.GMAIL_USER}>`,
      to: 'aeonark.lab@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <div style="padding: 30px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                📧 New Contact Form Submission
              </h1>
            </div>

            <div style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px;">
                Contact Details
              </h2>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; color: #374151;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #22c55e;">${email}</a></p>
                <p style="margin: 0 0 10px 0; color: #374151;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 0; color: #374151;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <div style="background: #fff; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0; border-radius: 0 6px 6px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1f2937;">Message:</h3>
                <p style="line-height: 1.6; color: #374151; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; padding: 12px 24px; background-color: #22c55e; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  Reply to ${name}
                </a>
              </div>
            </div>

            <div style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                Automated message from Aeonark Labs contact form
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Received: ${new Date().toLocaleString()}
        
        Message:
        ${message}
        
        ---
        Reply to this person at: ${email}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully:', info.messageId);
    
    res.json({
      success: true,
      message: "Your message has been sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false,
        error: "Please check your input",
        details: error.errors 
      });
    }
    res.status(500).json({ 
      success: false,
      error: "Failed to send message" 
    });
  }
}
