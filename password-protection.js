// Password Protection for Vision 2035
// This runs IMMEDIATELY when the page loads, BEFORE anything else

// Check authentication immediately
(function() {
    const isAuthenticated = sessionStorage.getItem('vision2035_authenticated');

    if (!isAuthenticated) {
        // Hide everything immediately
        document.documentElement.style.visibility = 'hidden';

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showPasswordPrompt);
        } else {
            showPasswordPrompt();
        }
    }
})();

function showPasswordPrompt() {
    // Make sure everything stays hidden
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    // Hide main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'none';
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'password-overlay';
    overlay.className = 'password-overlay';

    // Create password modal
    const modal = document.createElement('div');
    modal.className = 'password-modal';
    modal.innerHTML = `
        <div class="password-content">
            <img src="Resourcers/Logo/Logo_White.png" alt="Vision 2035" class="password-logo">
            <h2 class="password-title">PROTECTED CONTENT</h2>
            <p class="password-subtitle">Please enter password to continue</p>
            <form id="password-form" class="password-form">
                <input
                    type="password"
                    id="password-input"
                    class="password-input"
                    placeholder="Enter password"
                    autocomplete="off"
                    required
                >
                <button type="submit" class="password-submit">
                    <span>ACCESS</span>
                </button>
                <div id="password-error" class="password-error"></div>
            </form>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Make document visible now that password prompt is ready
    document.documentElement.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';

    // Focus on password input
    setTimeout(() => {
        document.getElementById('password-input').focus();
    }, 100);

    // Handle form submission
    const form = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('password-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const password = passwordInput.value.toLowerCase().trim();

        if (password === 'ignition') {
            // Correct password
            sessionStorage.setItem('vision2035_authenticated', 'true');

            // Add success animation
            modal.classList.add('password-success');

            // Remove overlay and show content
            setTimeout(() => {
                overlay.style.opacity = '0';

                setTimeout(() => {
                    overlay.remove();
                    document.body.style.overflow = '';

                    // Show main content
                    if (mainContent) {
                        mainContent.style.display = 'block';
                    }

                    // Now show loading screen
                    if (loadingScreen) {
                        loadingScreen.style.display = 'flex';
                        // Start the loading animation
                        if (typeof startLoading === 'function') {
                            startLoading();
                        }
                    }
                }, 500);
            }, 500);
        } else {
            // Wrong password
            passwordInput.classList.add('password-shake');
            errorMessage.textContent = 'Incorrect password. Please try again.';
            passwordInput.value = '';

            // Remove shake animation after it completes
            setTimeout(() => {
                passwordInput.classList.remove('password-shake');
            }, 500);

            // Clear error message after 3 seconds
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 3000);
        }
    });

    // Allow Enter key to submit
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
}

// Also handle authenticated users
document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = sessionStorage.getItem('vision2035_authenticated');

    if (isAuthenticated) {
        // User is already authenticated, make sure everything is visible
        document.documentElement.style.visibility = 'visible';
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
        }
    }
});