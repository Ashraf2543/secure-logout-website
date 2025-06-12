/**
 * Main application script
 * Handles DOM ready state, initializes components
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize analytics
    initAnalytics();
    
    // Check for prefers-reduced-motion
    handleMotionPreferences();
});

// Mobile menu toggle functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('nav--visible');
            menuBtn.classList.toggle('mobile-menu-btn--active');
            
            // Toggle body scroll lock
            document.body.classList.toggle('no-scroll');
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
}

// Handle reduced motion preference
function handleMotionPreferences() {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (reducedMotionQuery.matches) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    reducedMotionQuery.addEventListener('change', () => {
        if (reducedMotionQuery.matches) {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    });
}

// Export for module bundlers if needed
export { initMobileMenu, initSmoothScrolling };