// Navigation functionality for Vision 2035 - Continuous scroll
document.addEventListener('DOMContentLoaded', function() {
    // Get all pages and navigation dots
    const pages = document.querySelectorAll('.page');
    const navDots = document.querySelectorAll('.nav-dot');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let currentPage = 0;

    // Update active navigation dot based on scroll position
    function updateActivePage() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        // Find which page is currently most visible
        pages.forEach((page, index) => {
            const pageTop = page.offsetTop;
            const pageBottom = pageTop + page.offsetHeight;
            const viewportCenter = scrollPosition + (windowHeight / 2);

            if (viewportCenter >= pageTop && viewportCenter < pageBottom) {
                if (currentPage !== index) {
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
            }
        });
    }

    // Navigation dot click handlers - smooth scroll to page
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            pages[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Update active page on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActivePage, 50);
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'PageDown':
                if (currentPage < pages.length - 1) {
                    pages[currentPage + 1].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
            case 'PageUp':
                if (currentPage > 0) {
                    pages[currentPage - 1].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
            case 'Home':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    pages[0].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
            case 'End':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    pages[pages.length - 1].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                break;
        }
    });

    // Initialize on page load
    updateActivePage();

    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(updateActivePage, 100);
    });
});