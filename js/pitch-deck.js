    // Email functionality for contact forms
    function setupContactForms() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            const emailLink = card.querySelector('a[href^="mailto:"]');
            if (emailLink) {
                emailLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const email = this.href.replace('mailto:', '');
                    const subject = 'Investment Inquiry - Upstage Studios';
                    const body = `Hello,\n\nI am interested in learning more about investment opportunities with Upstage Studios.\n\nBest regards,`;
                    
                    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                });
            }
        });
    }

    // Data visualization enhancements
    function enhanceDataVisualization() {
        // Add tooltips to metric cards
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'metric-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    background: rgba(0, 0, 0, 0.9);
                    color: #39FF14;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    z-index: 1000;
                    pointer-events: none;
                    border: 1px solid #39FF14;
                `;
                
                const label = card.querySelector('.metric-label').textContent;
                tooltip.textContent = `Key Performance Indicator: ${label}`;
                
                document.body.appendChild(tooltip);
                
                const rect = card.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });
            
            card.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.metric-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    // Lazy loading for images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Analytics tracking (placeholder for real implementation)
    function trackUserInteraction(action, section) {
        console.log(`User interaction: ${action} in section: ${section}`);
        // In a real implementation, this would send data to analytics service
    }

    // Add analytics to navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('href').substring(1);
            trackUserInteraction('navigation_click', section);
        });
    });

    // Initialize all enhancements
    setupContactForms();
    enhanceDataVisualization();
    setupLazyLoading();

    console.log('Pitch deck initialized successfully');
});