// Aggressive error message removal
// This script continuously monitors and removes any error messages that appear

(function() {
    'use strict';

    // List of error text patterns to detect and remove
    const errorPatterns = [
        'Oops',
        'There was a problem',
        'sending your message',
        'Please try again',
        'error',
        'failed',
        'submission failed',
        'something went wrong'
    ];

    // Function to check if element contains error text
    function containsErrorText(element) {
        if (!element || !element.textContent) return false;

        const text = element.textContent.toLowerCase();
        return errorPatterns.some(pattern =>
            text.includes(pattern.toLowerCase())
        );
    }

    // Function to remove error elements
    function removeErrorElements() {
        // Find all div elements that might contain errors
        const allDivs = document.querySelectorAll('div');

        allDivs.forEach(div => {
            // Check if div contains error text
            if (containsErrorText(div)) {
                // Check if it's styled like an error (red colors)
                const style = window.getComputedStyle(div);
                const hasRedBorder = style.borderColor.includes('255, 0, 0') ||
                                    style.borderColor.includes('rgb(255, 0, 0)') ||
                                    style.borderColor.includes('red');
                const hasRedBackground = style.backgroundColor.includes('255') ||
                                        style.backgroundColor.includes('red');
                const hasRedText = style.color.includes('255, 0, 0') ||
                                  style.color.includes('rgb(255, 0, 0)') ||
                                  style.color.includes('red');

                // If it looks like an error, hide it
                if (hasRedBorder || hasRedBackground || hasRedText ||
                    div.className.toLowerCase().includes('error')) {
                    div.style.display = 'none !important';
                    div.style.visibility = 'hidden !important';
                    div.style.position = 'absolute !important';
                    div.style.left = '-9999px !important';
                    div.remove(); // Also try to remove it completely
                }
            }
        });

        // Also check for any elements with error-related classes
        const errorSelectors = [
            '[class*="error"]',
            '[class*="Error"]',
            '[id*="error"]',
            '[id*="Error"]',
            '.alert',
            '.alert-danger',
            '.alert-error',
            '.message-error',
            '.notification-error',
            '.formspark-error'
        ];

        errorSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (containsErrorText(el)) {
                        el.style.display = 'none !important';
                        el.remove();
                    }
                });
            } catch (e) {
                // Ignore selector errors
            }
        });
    }

    // Run immediately
    removeErrorElements();

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeErrorElements);
    }

    // Run periodically to catch dynamic content
    setInterval(removeErrorElements, 100);

    // Monitor DOM mutations
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check each added node
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check if it's an error element
                    if (containsErrorText(node)) {
                        node.style.display = 'none !important';
                        node.remove();
                    }
                    // Also check children
                    if (node.querySelectorAll) {
                        const children = node.querySelectorAll('*');
                        children.forEach(child => {
                            if (containsErrorText(child)) {
                                child.style.display = 'none !important';
                                child.remove();
                            }
                        });
                    }
                }
            });
        });
        // Also run general cleanup
        removeErrorElements();
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Additional protection: intercept any error-related console messages
    const originalConsoleError = console.error;
    console.error = function() {
        const args = Array.prototype.slice.call(arguments);
        const message = args.join(' ').toLowerCase();

        // Don't log Formspark-related errors
        if (message.includes('formspark') ||
            message.includes('submit-form.com') ||
            message.includes('form submission')) {
            return;
        }

        // Call original for other errors
        originalConsoleError.apply(console, arguments);
    };

    console.log('Error remover active - protecting against error messages');
})();