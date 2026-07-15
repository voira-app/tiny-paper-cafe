// transition.js

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('page-transition-overlay');
    const stripes = document.querySelectorAll('.transition-stripe');
    
    if (!overlay || stripes.length === 0) return;

    // Check if we should play the out animation
    const shouldPlayOutAnimation = sessionStorage.getItem('playOutAnimation') === 'true';
    // Reset flag immediately
    sessionStorage.removeItem('playOutAnimation');

    if (!shouldPlayOutAnimation) {
        // Hide stripes immediately without animation
        stripes.forEach(stripe => {
            stripe.style.transition = 'none';
            stripe.classList.remove('is-covering');
        });
        overlay.classList.remove('is-active');
        
        // Restore transition for later
        setTimeout(() => {
            stripes.forEach(stripe => {
                stripe.style.transition = '';
            });
        }, 50);
    } else {
        // Run the out animation because we arrived via an animated link
        setTimeout(() => {
            overlay.classList.add('animating-out');
            stripes.forEach(stripe => {
                stripe.classList.remove('is-covering');
                stripe.classList.add('is-hidden-top');
            });
            
            // After animation completes, remove active class so we can click underlying elements
            setTimeout(() => {
                overlay.classList.remove('is-active');
                overlay.classList.remove('animating-out');
                
                // Reset stripes to bottom for the next "In" animation
                // We temporarily disable transition to snap them back to bottom
                stripes.forEach(stripe => {
                    stripe.style.transition = 'none';
                    stripe.classList.remove('is-hidden-top');
                    // Force reflow
                    void stripe.offsetWidth;
                    stripe.style.transition = '';
                });
            }, 1100); // 700ms + 300ms delay + 100ms buffer
        }, 50);
    }

    // 2. Intercept internal link clicks (In Animation)
    document.addEventListener('click', (e) => {
        // Find closest anchor tag
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        
        // Ignore external links, mailto, tel, anchors on the same page, or links opening in new tabs
        if (!href || 
            href.startsWith('http') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.startsWith('#') ||
            link.getAttribute('target') === '_blank') {
            return;
        }

        // Only trigger animation if the link goes to about.html
        if (!href.includes('about.html')) {
            return;
        }

        // It's a link to about.html, intercept it
        e.preventDefault();

        // Set flag so the next page knows to play the out animation
        sessionStorage.setItem('playOutAnimation', 'true');

        // Start In Animation
        overlay.style.display = ''; // Restore visibility
        void overlay.offsetWidth; // Force reflow

        overlay.classList.add('is-active');
        overlay.classList.add('animating-in');
        
        stripes.forEach(stripe => {
            stripe.classList.add('is-covering');
        });

        // Wait for animation to finish before navigating
        // 700ms duration + 300ms max delay = 1000ms. We use 1000ms.
        setTimeout(() => {
            window.location.href = href;
        }, 1000);
    });
});
