// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!form) return;

    // Form action is set in HTML - using Formspree or EmailJS as fallback

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const submitButton = form.querySelector('.form-submit');
        const originalButtonText = submitButton.innerHTML;

        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>SENDING...</span>';

        // Clear previous status
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        try {
            // Send to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you for your message! We\'ll be in touch soon.';

                // Clear form
                form.reset();

                // Optionally scroll to thank you page after 2 seconds
                setTimeout(() => {
                    const thankYouPage = document.getElementById('page11');
                    if (thankYouPage) {
                        thankYouPage.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 2000);
            } else {
                // Error
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Error
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // Alternative: Email using mailto as fallback
    // This is a backup method if Formspree is not set up
    function sendEmailFallback() {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        const subject = encodeURIComponent('Vision 2035 Inquiry');
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        window.location.href = `mailto:ignition@vision2035.life?subject=${subject}&body=${body}`;
    }

    // Add fallback button if needed
    const addFallbackButton = () => {
        if (!form.action || form.action.includes('YOUR_FORM_ID')) {
            const fallbackNote = document.createElement('p');
            fallbackNote.className = 'form-fallback-note';
            fallbackNote.innerHTML = 'Or <a href="#" onclick="sendEmailFallback(); return false;" style="color: #C9A961; text-decoration: underline;">send via email client</a>';
            form.appendChild(fallbackNote);

            window.sendEmailFallback = sendEmailFallback;
        }
    };

    addFallbackButton();
});