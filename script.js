// Navigation functionality for Vision 2035 fullscreen pages
document.addEventListener('DOMContentLoaded', function() {
    // Get all pages and navigation dots
    const pages = document.querySelectorAll('.page');
    const navDots = document.querySelectorAll('.nav-dot');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let currentPage = 0;

    // Set initial page position
    window.scrollTo(0, 0);

    // Update active navigation dot and hide/show scroll indicator
    function updateActivePage(index) {
        currentPage = index;

        // Update navigation dots
        navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });

        // Hide scroll indicator after first page
        if (scrollIndicator) {
            scrollIndicator.style.display = index === 0 ? 'block' : 'none';
        }
    }

    // Navigation dot click handlers
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            navigateToPage(index);
        });
    });

    // Navigate to specific page
    function navigateToPage(index) {
        if (index >= 0 && index < pages.length) {
            pages[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            updateActivePage(index);
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentPage < pages.length - 1) {
                    navigateToPage(currentPage + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentPage > 0) {
                    navigateToPage(currentPage - 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                navigateToPage(0);
                break;
            case 'End':
                e.preventDefault();
                navigateToPage(pages.length - 1);
                break;
        }
    });

    // Simple wheel navigation - one event = one page
    let scrolling = false;

    document.addEventListener('wheel', (e) => {
        e.preventDefault();

        // Prevent multiple scrolls at once
        if (scrolling) return;

        scrolling = true;

        if (e.deltaY > 0 && currentPage < pages.length - 1) {
            // Scroll down
            navigateToPage(currentPage + 1);
        } else if (e.deltaY < 0 && currentPage > 0) {
            // Scroll up
            navigateToPage(currentPage - 1);
        }

        // Allow next scroll after a short delay
        setTimeout(() => {
            scrolling = false;
        }, 500);
    }, { passive: false });

    // Touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentPage < pages.length - 1) {
                // Swiped up - go to next page
                navigateToPage(currentPage + 1);
            } else if (swipeDistance < 0 && currentPage > 0) {
                // Swiped down - go to previous page
                navigateToPage(currentPage - 1);
            }
        }
    }

    // Track current page with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageIndex = Array.from(pages).indexOf(entry.target);
                if (pageIndex !== currentPage) {
                    updateActivePage(pageIndex);
                }
            }
        });
    }, observerOptions);

    pages.forEach(page => pageObserver.observe(page));

    // Handle resize events for mobile orientation changes
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Ensure current page is properly in view after resize
            navigateToPage(currentPage);
        }, 250);
    });

    // Initialize first page
    updateActivePage(0);

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});