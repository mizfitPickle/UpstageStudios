// --- Upstage Studios Pitch Deck Enhancements ---
// All previous and new features included and improved

document.addEventListener('DOMContentLoaded', function() {
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
                const label = card.querySelector('.metric-label')?.textContent || 'Metric';
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
        const images = document.querySelectorAll('img.lazy');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.remove('lazy');
            });
        }
    }

    // Analytics tracking (placeholder for real implementation)
    function trackUserInteraction(action, section) {
        console.log(`User interaction: ${action} in section: ${section}`);
        // In a real implementation, this would send data to analytics service
    }

    // Add analytics to navigation
    function setupNavAnalytics() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const section = this.getAttribute('href')?.substring(1) || 'unknown';
                trackUserInteraction('navigation_click', section);
            });
        });
    }

    // --- Additional Enhancements ---

    // Smooth scroll for anchor links
    function setupSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Keyboard accessibility for navigation
    function setupNavAccessibility() {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    nav.classList.add('nav-focus');
                }
            });
            nav.addEventListener('blur', function() {
                nav.classList.remove('nav-focus');
            }, true);
        }
    }

    // Highlight active section in navigation
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- Initialize all features ---
    setupContactForms();
    enhanceDataVisualization();
    setupLazyLoading();
    setupNavAnalytics();
    setupSmoothScroll();
    setupNavAccessibility();
    highlightActiveSection();

    console.log('Pitch deck initialized successfully');
});
// --- End of Upstage Studios Pitch Deck Enhancements