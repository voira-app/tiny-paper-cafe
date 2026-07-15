// Splash Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('splash-active');
    setTimeout(() => {
        document.body.classList.remove('splash-active');
        const splashScreen = document.getElementById('splashScreen');
        if(splashScreen) splashScreen.remove();
    }, 3200);
});

// Scroll Animation Logic for Hero Postcards
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('heroSection');
    const heroLogo = document.getElementById('heroLogo');
    const hc1 = document.querySelector('.lc-1');
    const hc2 = document.querySelector('.lc-2');
    const hc3 = document.querySelector('.lc-3');
    const indicator = document.getElementById('scrollIndicator');
    const heroText = document.getElementById('heroText');
    
    let ticking = false;

    function updateScrollAnimation() {
        if (!heroSection || !hc1) {
            ticking = false;
            return;
        }
        
        const rect = heroSection.getBoundingClientRect();
        const scrollDist = heroSection.offsetHeight - window.innerHeight; 
        
        let progress = 0;
        if (scrollDist > 0) {
            progress = (-rect.top) / scrollDist;
        }
        progress = Math.max(0, Math.min(1, progress));
        
        const easeProgress = progress * (2 - progress); // ease-out
        
        if (indicator) {
            indicator.style.opacity = progress > 0.05 ? '0' : '1';
        }

        const isMobile = window.innerWidth <= 850;

        if (isMobile) {
            // Start exactly at the mobile CSS coordinates, move less aggressively
            hc1.style.transform = `translate(${ -90 + easeProgress * -50}%, ${ -70 + easeProgress * -60}%) rotate(${-12 - easeProgress * 20}deg) scale(${1 + easeProgress * 0.1})`;
            hc2.style.transform = `translate(${ 10 + easeProgress * 80}%, ${ -50 + easeProgress * -20}%) rotate(${8 + easeProgress * 20}deg) scale(${1 + easeProgress * 0.1})`;
            hc3.style.transform = `translate(${ -40 + easeProgress * 20}%, ${ -10 + easeProgress * 80}%) rotate(${-4 - easeProgress * 10}deg) scale(${1 + easeProgress * 0.1})`;
        } else {
            // Desktop animation
            hc1.style.transform = `translate(${ -100 + easeProgress * -100}%, ${ -80 + easeProgress * -100}%) rotate(${-12 - easeProgress * 20}deg) scale(${1 + easeProgress * 0.15})`;
            hc2.style.transform = `translate(${ 10 + easeProgress * 120}%, ${ -60 + easeProgress * -30}%) rotate(${8 + easeProgress * 20}deg) scale(${1 + easeProgress * 0.1})`;
            hc3.style.transform = `translate(${ -50 + easeProgress * 20}%, ${ -20 + easeProgress * 120}%) rotate(${-4 - easeProgress * 10}deg) scale(${1 + easeProgress * 0.15})`;
        }
        
        // Fade out cards towards the end
        const opacity = 1 - Math.pow(progress, 3);
        hc1.style.opacity = opacity;
        hc2.style.opacity = opacity;
        hc3.style.opacity = opacity;
        
        // Logo comes in clearly
        if(heroLogo) {
            heroLogo.style.transform = `scale(${0.8 + easeProgress * 0.2})`;
            heroLogo.style.opacity = 1;
        }
        
        // Text and Button appear at the very end
        if(heroText) {
            if (progress > 0.8) {
                heroText.style.opacity = '1';
                heroText.style.pointerEvents = 'auto';
            } else {
                heroText.style.opacity = '0';
                heroText.style.pointerEvents = 'none';
            }
        }
        
        ticking = false;
    }

    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollAnimation);
            ticking = true;
        }
    }, { passive: true });
    
    // Initial call
    setTimeout(updateScrollAnimation, 100);
});

// Trigger paint animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const paintObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('start-paint');
            }
        });
    }, { threshold: 0.5 });

    const paintSvgs = document.querySelectorAll('.paint-svg');
    paintSvgs.forEach(svg => paintObserver.observe(svg));
    
    const experienceSection = document.querySelector('.experience-section');
    const paintBrush = document.querySelector('.brush-stroke');
    const writeOverlay = document.querySelector('.write-text-overlay');
    const sendSvg = document.querySelector('.send-svg');
    const letter = document.querySelector('.letter-insert');
    const flapFront = document.querySelector('.envelope-flap-front');
    const flapOpen = document.querySelector('.flap-open');

    if (experienceSection && paintBrush && sendSvg && letter && flapFront && flapOpen) {
        window.addEventListener('scroll', () => {
            const rect = experienceSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // The section is tall. We start animating when it pins (top <= 0)
            const scrollableDistance = rect.height - windowHeight;
            let progress = 0;
            
            if (scrollableDistance > 0) {
                // Add a slight bias to start animation earlier when scrolling
                const bias = window.innerWidth <= 850 ? scrollableDistance * 0.1 : 0;
                progress = (-rect.top + bias) / scrollableDistance;
            }
            progress = Math.max(0, Math.min(1, progress));
            
            // 1. Paint Animation (0.0 to 0.3)
            let paintProgress = Math.min(1, progress / 0.3);
            paintBrush.style.strokeDashoffset = 12000 - (12000 * paintProgress);
            
            // 1.5 Write Animation (0.25 to 0.45)
            if (writeOverlay) {
                let writeProgress = 0;
                if (progress > 0.25) {
                    writeProgress = Math.min(1, (progress - 0.25) / 0.20);
                }
                writeOverlay.style.clipPath = `polygon(0 0, ${writeProgress * 100}% 0, ${writeProgress * 100}% 100%, 0 100%)`;
            }
            
            // 2. Send Animation (0.4 to 0.9)
            let sendProgress = 0;
            if (progress > 0.4) {
                sendProgress = Math.min(1, (progress - 0.4) / 0.5);
            }
            
            // Fade up envelope
            const fadeProgress = Math.min(1, sendProgress / 0.2);
            sendSvg.style.opacity = fadeProgress;
            sendSvg.style.transform = `translateY(${40 * (1 - fadeProgress)}px)`;
            
            // Postcard slide
            let slideProgress = 0;
            if (sendProgress > 0.2) slideProgress = Math.min(1, (sendProgress - 0.2) / 0.6);
            const translateY = -250 + (250 * slideProgress);
            letter.style.transform = `translateY(${translateY}px)`;
            letter.style.opacity = slideProgress > 0 ? 1 : 0;
            
            // Flap close
            let flapProgress = 0;
            if (sendProgress > 0.8) flapProgress = Math.min(1, (sendProgress - 0.8) / 0.2);
            
            if (flapProgress > 0) {
                flapOpen.style.opacity = 0;
                flapFront.style.opacity = 1;
                const scaleY = -1 + (2 * flapProgress);
                flapFront.style.transform = `scaleY(${scaleY})`;
            } else {
                flapOpen.style.opacity = 1;
                flapFront.style.opacity = 0;
                flapFront.style.transform = `scaleY(-1)`;
            }
        });
        
        // Trigger once on load
        window.dispatchEvent(new Event('scroll'));
    }
});
