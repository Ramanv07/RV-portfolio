import { Resend } from 'resend';

const resend = new Resend('re_cdcDmdju_B9ZGkTbehQrv9FnNopaDfouX');

export async function sendContactEmail({ email, message }) {
  await Promise.all([
    // 1. Email notification to you
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ramanvishwari@gmail.com',
      subject: `New contact form message from ${email}`,
      html: `<p>You received a new message from <strong>${email}</strong>.</p><br/><p><strong>Message:</strong></p><p>${message}</p>`,
    }),
    // 2. Auto-response email to the sender
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.5; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <!-- Note: Replace the src URL below with the actual URL to your live logo image once deployed -->
            <img src="https://via.placeholder.com/200x50?text=Raman+Vishwari" alt="Raman Vishwari Logo" style="max-width: 200px; height: auto;" />
          </div>
          <h2>Hi there,</h2>
          <p>Thank you for getting in touch! I have received your message and will get back to you within 24 hours.</p>
          <br/>
          <p><strong>For your records, here is a copy of your message:</strong></p>
          <blockquote style="border-left: 4px solid #eee; padding-left: 1rem; margin-left: 0; color: #555;">
            ${message}
          </blockquote>
          <br/>
          <p>Best regards,<br/><strong>Raman Vishwari</strong></p>
          
          <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <a href="https://www.linkedin.com/in/raman-vishwari" style="display: inline-block; padding: 10px 20px; background-color: #0077b5; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      `,
    })
  ]);
}
