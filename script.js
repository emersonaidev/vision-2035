// Navigation functionality for Vision 2035 fullscreen pages
document.addEventListener('DOMContentLoaded', function() {
    // Get all pages and navigation dots
    const pages = document.querySelectorAll('.page');
    const navDots = document.querySelectorAll('.nav-dot');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let currentPage = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;

    // Initialize IntersectionObserver for page detection
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pageIndex = Array.from(pages).indexOf(entry.target);
                updateActivePage(pageIndex);
            }
        });
    }, observerOptions);

    // Observe all pages
    pages.forEach(page => pageObserver.observe(page));

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
            if (index === 0) {
                scrollIndicator.style.display = 'block';
            } else {
                scrollIndicator.style.display = 'none';
            }
        }
    }

    // Navigation dot click handlers
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToPage(index);
        });
    });

    // Smooth scroll to specific page
    function scrollToPage(index) {
        if (index >= 0 && index < pages.length) {
            pages[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;

        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                navigateToPage(currentPage + 1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                navigateToPage(currentPage - 1);
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

    // Mouse wheel navigation with throttling
    let wheelTimeout;
    let canScroll = true;

    document.addEventListener('wheel', (e) => {
        if (!canScroll) return;

        e.preventDefault();
        canScroll = false;

        if (e.deltaY > 0) {
            // Scroll down
            navigateToPage(currentPage + 1);
        } else if (e.deltaY < 0) {
            // Scroll up
            navigateToPage(currentPage - 1);
        }

        // Throttle wheel events
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            canScroll = true;
        }, 800);
    }, { passive: false });

    // Navigate to specific page with bounds checking
    function navigateToPage(index) {
        if (index >= 0 && index < pages.length && index !== currentPage) {
            isScrolling = true;
            scrollToPage(index);

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Touch support for mobile devices
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
            if (swipeDistance > 0) {
                // Swiped up - go to next page
                navigateToPage(currentPage + 1);
            } else {
                // Swiped down - go to previous page
                navigateToPage(currentPage - 1);
            }
        }
    }

    // Hide scroll indicator when user starts interacting
    document.addEventListener('scroll', () => {
        if (scrollIndicator && window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        }
    }, { passive: true });

    // Preload next page images for smooth transitions
    function preloadNextImage() {
        if (currentPage < pages.length - 1) {
            const nextPage = pages[currentPage + 1];
            const nextImage = nextPage.querySelector('.page-bg img');
            if (nextImage && nextImage.dataset.src) {
                const img = new Image();
                img.src = nextImage.dataset.src;
            }
        }
    }

    // Call preload when page changes
    const originalUpdateActivePage = updateActivePage;
    updateActivePage = function(index) {
        originalUpdateActivePage(index);
        preloadNextImage();
    };

    // Handle resize events for mobile orientation changes
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Ensure current page is properly in view after resize
            scrollToPage(currentPage);
        }, 250);
    });

    // Initialize first page
    updateActivePage(0);

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Log navigation for analytics (optional)
    if (window.console) {
        console.log('Vision 2035 - Navigation initialized');
    }
});

// Add CSS for smooth animations
const style = document.createElement('style');
style.textContent = `
    body.loaded .page {
        transition: opacity 0.3s ease-in-out;
    }

    body.loaded .scroll-indicator {
        transition: opacity 0.3s ease-in-out;
    }

    html {
        scroll-behavior: smooth;
    }
`;
document.head.appendChild(style);