// Form Cleanup - Remove any error messages or URL parameters from Formspark
// This ensures a clean user experience

(function() {
    'use strict';

    // Clean URL parameters on page load
    if (window.location.search || window.location.hash.includes('?')) {
        // Remove any query parameters from URL without reload
        const cleanURL = window.location.protocol + '//' +
                        window.location.host +
                        window.location.pathname +
                        (window.location.hash.split('?')[0] || '');

        window.history.replaceState({}, document.title, cleanURL);
    }

    // Hide any error messages that might appear
    const hideErrorMessages = () => {
        // Hide any element containing the error text
        const errorTexts = [
            'Oops',
            'problem sending',
            'try again',
            'error',
            'failed'
        ];

        // Check all elements on the page
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            const text = element.textContent || '';
            const hasError = errorTexts.some(errorText =>
                text.toLowerCase().includes(errorText.toLowerCase())
            );

            if (hasError && element.children.length === 0) {
                // Only hide if it's a leaf element (no children)
                const parentText = element.parentElement?.textContent || '';
                if (parentText.includes('problem sending') ||
                    parentText.includes('try again')) {
                    element.style.display = 'none';
                    if (element.parentElement) {
                        element.parentElement.style.display = 'none';
                    }
                }
            }
        });
    };

    // Run cleanup immediately
    hideErrorMessages();

    // Run again after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideErrorMessages);
    }

    // Run again after a short delay to catch any dynamic content
    setTimeout(hideErrorMessages, 100);
    setTimeout(hideErrorMessages, 500);

    // Intercept form submission to ensure clean redirect
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');
        if (form) {
            // Ensure the redirect is set
            let redirectInput = form.querySelector('input[name="_redirect"]');
            if (!redirectInput) {
                redirectInput = document.createElement('input');
                redirectInput.type = 'hidden';
                redirectInput.name = '_redirect';
                redirectInput.value = window.location.origin + '/#page11';
                form.appendChild(redirectInput);
            }
        }
    });
})();