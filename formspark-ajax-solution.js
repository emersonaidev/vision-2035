// Formspark AJAX Solution - Prevents page navigation and handles errors gracefully
// This solution intercepts the form submission and uses AJAX instead

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Remove any existing submit handlers
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        // Add AJAX submission handler
        newForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent normal form submission

            const submitButton = this.querySelector('.form-submit');
            const originalButtonText = submitButton.textContent;

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'SENDING...';

            // Create form data
            const formData = new FormData(this);

            try {
                // Submit via AJAX
                const response = await fetch('https://submit-form.com/DIO6jEXG5', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success - redirect to thank you page
                    window.location.href = '#page11';

                    // Reset form
                    this.reset();
                    submitButton.textContent = 'MESSAGE SENT!';

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }, 3000);

                } else {
                    // Handle error gracefully
                    console.error('Form submission failed:', response.status);

                    // Try to get error details
                    let errorMessage = 'Unable to send message. ';

                    try {
                        const errorData = await response.text();
                        console.log('Error response:', errorData);

                        // Check for specific error messages
                        if (errorData.includes('Invalid form')) {
                            errorMessage += 'Please check your form configuration.';
                        } else if (errorData.includes('rate limit')) {
                            errorMessage += 'Too many attempts. Please try again later.';
                        } else {
                            errorMessage += 'Please try again or contact us directly.';
                        }
                    } catch (e) {
                        errorMessage += 'Please try again or contact us directly.';
                    }

                    // Show error message in button temporarily
                    submitButton.textContent = 'ERROR - TRY AGAIN';
                    submitButton.style.background = 'rgba(220, 53, 69, 0.2)';
                    submitButton.style.borderColor = '#dc3545';

                    // Create a subtle error message
                    const errorDiv = document.createElement('div');
                    errorDiv.style.cssText = `
                        color: #ff6b6b;
                        font-size: 0.9rem;
                        margin-top: 10px;
                        padding: 10px;
                        background: rgba(255, 107, 107, 0.1);
                        border-radius: 4px;
                        text-align: center;
                        font-family: 'Oswald', sans-serif;
                    `;
                    errorDiv.textContent = errorMessage;

                    // Insert error message after form
                    if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                        this.parentNode.insertBefore(errorDiv, this.nextSibling);
                    }

                    // Reset after 5 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                        submitButton.style.borderColor = '';
                        if (errorDiv.parentNode) {
                            errorDiv.remove();
                        }
                    }, 5000);
                }

            } catch (error) {
                // Network error or CORS issue
                console.error('Network error:', error);

                // Fallback: submit form normally if AJAX fails due to CORS
                if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
                    console.log('CORS issue detected, falling back to normal submission');

                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;

                    // Submit form normally
                    HTMLFormElement.prototype.submit.call(this);
                } else {
                    // Show network error
                    submitButton.textContent = 'NETWORK ERROR';
                    submitButton.style.background = 'rgba(220, 53, 69, 0.2)';

                    setTimeout(() => {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        submitButton.style.background = '';
                    }, 3000);
                }
            }
        });
    });
})();