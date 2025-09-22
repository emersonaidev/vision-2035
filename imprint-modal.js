// Imprint Modal Controller
function showImprint() {
    const modal = document.getElementById('imprintModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function showPrivacy() {
    // For now, show the same imprint modal
    // In the future, this could show a separate privacy policy
    showImprint();
}

function closeModal() {
    const modal = document.getElementById('imprintModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imprintModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});