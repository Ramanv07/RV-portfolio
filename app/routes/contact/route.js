import { json } from '@remix-run/node';
import { sendContactEmail } from '~/utils/email.server';

export { Contact as default, meta } from './contact';

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export async function action({ request }) {
  const formData = await request.formData();
  const isBot = String(formData.get('name'));
  const email = String(formData.get('email'));
  const message = String(formData.get('message'));
  const errors = {};

  // Return without sending if a bot trips the honeypot
  if (isBot) return json({ success: true });

  // Handle input validation on the server
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  try {
    await sendContactEmail({ email, message });
    return json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return json({ errors: { message: 'Failed to send message. Please try again later.' } }, { status: 500 });
  }
}
