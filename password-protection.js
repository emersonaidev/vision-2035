// Password Protection for Vision 2035
document.addEventListener('DOMContentLoaded', function() {
    // Check if user already entered correct password in this session
    const isAuthenticated = sessionStorage.getItem('vision2035_authenticated');

    if (!isAuthenticated) {
        // Wait for loading screen to finish before showing password prompt
        const checkLoadingComplete = setInterval(() => {
            const loadingScreen = document.getElementById('loading-screen');
            const loadingVisible = loadingScreen && loadingScreen.style.display !== 'none';

            if (!loadingVisible) {
                clearInterval(checkLoadingComplete);
                // Small delay after loading completes
                setTimeout(showPasswordPrompt, 500);
            }
        }, 100);
    }
});

function showPasswordPrompt() {
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

    // Add blur to main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('content-locked');
    }

    // Disable scrolling
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

            // Remove overlay and unlock content
            setTimeout(() => {
                overlay.style.opacity = '0';
                if (mainContent) {
                    mainContent.classList.remove('content-locked');
                }
                document.body.style.overflow = '';

                setTimeout(() => {
                    overlay.remove();
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