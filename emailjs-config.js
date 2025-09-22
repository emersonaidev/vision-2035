// EmailJS Configuration for Vision 2035
// To set up EmailJS:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Replace the IDs below with your actual IDs
// 5. Set the template to send to: ignition@vision2035.life

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_vision2035',  // Replace with your EmailJS service ID
    TEMPLATE_ID: 'template_contact',   // Replace with your EmailJS template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
};

// Initialize EmailJS
(function() {
    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        if (window.emailjs) {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('EmailJS initialized');
        }
    };
    document.head.appendChild(script);
})();

// Send email function
function sendContactEmail(formData) {
    if (!window.emailjs) {
        console.error('EmailJS not loaded');
        return Promise.reject('Email service not available');
    }

    const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'ignition@vision2035.life'
    };

    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    );
}

// Export for use in contact form
window.sendContactEmail = sendContactEmail;