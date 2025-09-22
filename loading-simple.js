// Simple Loading Screen
function startSimpleLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-percentage');

    if (!loadingScreen || !progressFill || !progressText) return;

    let progress = 0;

    // Reset progress
    progressFill.style.width = '0%';
    progressText.textContent = '0%';

    // Simple progress animation
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;

        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        }
    }, 200);

    // Fallback - remove after 3 seconds max
    setTimeout(() => {
        clearInterval(interval);
        progressFill.style.width = '100%';
        progressText.textContent = '100%';
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

// Export to window for global access
window.startSimpleLoading = startSimpleLoading;

// Auto-start if authenticated
document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = sessionStorage.getItem('vision2035_authenticated');
    const loadingScreen = document.getElementById('loading-screen');

    if (isAuthenticated && loadingScreen) {
        // User already authenticated, show loading immediately
        loadingScreen.style.display = 'flex';
        startSimpleLoading();
    }
});