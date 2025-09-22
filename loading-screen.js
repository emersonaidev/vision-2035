// Loading Screen Controller
(function() {
    // Add loading class to body
    document.body.classList.add('loading');

    let progress = 0;
    let loadingScreen = document.getElementById('loading-screen');
    let progressFill = document.querySelector('.progress-fill');
    let progressText = document.querySelector('.progress-percentage');
    let assetsLoaded = 0;
    let totalAssets = 0;
    let minimumLoadTime = 2500; // Minimum time to show loading screen (2.5s)
    let startTime = Date.now();

    // Function to update progress
    function updateProgress(value) {
        progress = Math.min(value, 100);
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = Math.floor(progress) + '%';
        }
    }

    // Count total assets to load
    function countAssets() {
        // Count images
        const images = document.querySelectorAll('img');
        totalAssets = images.length;

        // Track WebP images if supported
        if (document.body.classList.contains('webp-support')) {
            const webpImages = document.querySelectorAll('[data-webp]');
            totalAssets += webpImages.length;
        }

        return totalAssets;
    }

    // Track asset loading
    function trackAssetLoading() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            if (img.complete) {
                assetsLoaded++;
                updateLoadingProgress();
            } else {
                img.addEventListener('load', () => {
                    assetsLoaded++;
                    updateLoadingProgress();
                });
                img.addEventListener('error', () => {
                    assetsLoaded++;
                    updateLoadingProgress();
                });
            }
        });
    }

    // Update loading progress based on assets
    function updateLoadingProgress() {
        if (totalAssets > 0) {
            const assetProgress = (assetsLoaded / totalAssets) * 100;
            updateProgress(assetProgress);
        }
    }

    // Simulate progress for better UX
    function simulateProgress() {
        let simulatedProgress = 0;
        const interval = setInterval(() => {
            if (simulatedProgress < 90) {
                simulatedProgress += Math.random() * 15;
                updateProgress(Math.min(simulatedProgress, 90));
            } else {
                clearInterval(interval);
            }
        }, 300);

        return interval;
    }

    // Hide loading screen
    function hideLoadingScreen() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

        // Ensure progress reaches 100%
        updateProgress(100);

        setTimeout(() => {
            // Fade out loading screen
            loadingScreen.classList.add('fade-out');

            // Remove loading class from body
            setTimeout(() => {
                document.body.classList.remove('loading');

                // Remove loading screen from DOM after animation
                setTimeout(() => {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 800);
            }, 400);
        }, remainingTime);
    }

    // Initialize
    function init() {
        // Count assets
        countAssets();

        // Start progress simulation
        const simulationInterval = simulateProgress();

        // Track actual loading
        trackAssetLoading();

        // Check if everything is loaded
        window.addEventListener('load', () => {
            clearInterval(simulationInterval);
            hideLoadingScreen();
        });

        // Fallback: Hide after maximum time
        setTimeout(() => {
            clearInterval(simulationInterval);
            hideLoadingScreen();
        }, 8000); // Max 8 seconds
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();