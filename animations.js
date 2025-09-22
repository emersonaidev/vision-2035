// Smooth Animations Controller for Vision 2035
(function() {
    // Get all page sections
    const pages = document.querySelectorAll('.page');

    // Track which pages have been animated
    const animatedPages = new Set();

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the page is visible
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageId = entry.target.id;

                // Only animate once per page
                if (!animatedPages.has(pageId)) {
                    entry.target.classList.add('in-view');
                    animatedPages.add(pageId);

                    // Special handling for hero page
                    if (pageId === 'page1') {
                        animateHeroSection();
                    }
                }
            }
        });
    }, observerOptions);

    // Special animation for hero section
    function animateHeroSection() {
        const heroElements = document.querySelectorAll('#page1 .hero-date, #page1 .hero-logo, #page1 .hero-tagline');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animationPlayState = 'running';
            }, index * 200);
        });
    }

    // Initialize animations
    function initAnimations() {
        // Observe all pages
        pages.forEach(page => {
            animationObserver.observe(page);
        });

        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Animate first page immediately if visible
        const firstPage = document.getElementById('page1');
        if (firstPage && isInViewport(firstPage)) {
            firstPage.classList.add('in-view');
            animatedPages.add('page1');
            animateHeroSection();
        }
    }

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    // Re-trigger animations on navigation dot clicks
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const pageIndex = parseInt(this.getAttribute('data-page'));
            const targetPage = pages[pageIndex];
            if (targetPage && !animatedPages.has(targetPage.id)) {
                setTimeout(() => {
                    targetPage.classList.add('in-view');
                    animatedPages.add(targetPage.id);
                }, 500);
            }
        });
    });
})();