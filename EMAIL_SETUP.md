# Email Setup Instructions for Vision 2035

The contact form needs to be configured to send emails to `ignition@vision2035.life`.

## Option 1: Formspree (Recommended - Already Configured)

1. Go to https://formspree.io
2. Sign up for a free account
3. Create a new form
4. Add `ignition@vision2035.life` as the email recipient
5. Copy your form ID (looks like: xpwzekrk)
6. The form is already configured in `index.html` with a temporary ID
7. Replace the form action in `index.html` line ~292:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   With your actual Formspree endpoint

## Option 2: EmailJS (Alternative)

1. Go to https://www.emailjs.com
2. Create a free account
3. Add an email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
5. Set the template to send to: `ignition@vision2035.life`
6. Update `emailjs-config.js` with your IDs:
   ```javascript
   SERVICE_ID: 'your_service_id',
   TEMPLATE_ID: 'your_template_id',
   PUBLIC_KEY: 'your_public_key'
   ```

## Option 3: Backend Server

For production, consider setting up a backend server with:
- Node.js + Nodemailer
- PHP mail function
- Python Flask/Django with email support
- Any other backend solution

## Testing

After configuration, test the form by:
1. Filling out all fields
2. Clicking "SEND MESSAGE"
3. Checking if email arrives at `ignition@vision2035.life`
4. Verifying the automatic redirect to the Thank You page

## Current Status

The form currently has a fallback that opens the user's email client if the form service is not configured.