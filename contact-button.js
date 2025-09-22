// Contact Button Controller
function scrollToContact() {
    const lastPage = document.getElementById('page10');
    if (lastPage) {
        lastPage.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update nav dot
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach(dot => dot.classList.remove('active'));
        if (navDots[9]) {
            navDots[9].classList.add('active');
        }
    }
}

// Hide button on first page
document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.querySelector('.contact-button');
    if (!contactButton) return;

    // Track current page
    function updateContactButtonVisibility() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (scrollPosition < windowHeight * 0.5) {
            document.body.classList.add('on-first-page');
        } else {
            document.body.classList.remove('on-first-page');
        }
    }

    // Initial check
    updateContactButtonVisibility();

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateContactButtonVisibility, 50);
    });
});