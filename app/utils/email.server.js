import { Resend } from 'resend';

export async function sendContactEmail({ email, message }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. Email notification to you (This works with onboarding@resend.dev)
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ramanvishwari@gmail.com',
    subject: `New contact form message from ${email}`,
    html: `<p>You received a new message from <strong>${email}</strong>.</p><br/><p><strong>Message:</strong></p><p>${message}</p>`,
  });

  // 2. Auto-response email to the sender 
  // (This will fail with onboarding@resend.dev unless the sender email is also ramanvishwari@gmail.com)
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <!-- Background me gradient spotlight aur dark theme add kiya hai -->
  <body
    style="background-color: #09090b; background-image: radial-gradient(circle at top center, #27272a 0%, #09090b 80%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; color: #fafafa; min-height: 100vh;"
  >
    <div style="max-width: 480px; margin: 0 auto; padding: 80px 20px;">
      <!-- YAHAN APNA LOGO ADD KAREIN -->
      <img
        src="https://ramanvishwari.vercel.app/favicon.ico"
        alt="Raman Vishwari"
        width="48"
        height="48"
        style="display: block; border-radius: 12px; margin-bottom: 32px; border: 1px solid #27272a;"
      />
      <!-- Main Headline -->
      <h1 style="font-size: 20px; font-weight: 500; margin: 0 0 12px 0; color: #ffffff; letter-spacing: -0.5px;">
        Thanks for reaching out.
      </h1>

      <!-- Body -->
      <p style="font-size: 15px; color: #a1a1aa; line-height: 1.6; margin: 0 0 24px 0;">
        I've received your message and will review it shortly. You can expect a response from me within the next 24 hours.
      </p>
      <!-- Divider Line -->
      <hr style="border: 0; border-top: 1px solid #27272a; margin: 0 0 32px 0;" />

      <!-- Sign-off -->
      <p style="font-size: 15px; color: #e4e4e7; margin: 0 0 12px 0; font-weight: 500;">Raman Vishwari</p>

      <!-- Footer with Monospace Links -->
      <div>
        <p
          style="font-size: 12px; color: #52525b; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; margin: 0;"
        >
          <a href="https://ramanvishwari.vercel.app" style="color: #a1a1aa; text-decoration: none;">portfolio</a>
          <span style="margin: 0 8px;">|</span>
          <a href="https://github.com/ramanv07" style="color: #a1a1aa; text-decoration: none;">github</a>
          <span style="margin: 0 8px;">|</span>
          <a href="https://www.linkedin.com/in/raman-vishwari" style="color: #a1a1aa; text-decoration: none;">linkedin</a>
        </p>
      </div>
    </div>
  </body>
</html>
      `,
    });
  } catch (autoResponseError) {
    console.error('Auto-response failed (likely due to Resend domain restrictions):', autoResponseError);
  }
}
