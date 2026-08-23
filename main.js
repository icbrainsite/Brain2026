// ===================================================
// BRAIN2026 CONFERENCE WEBSITE
// Main JavaScript (main.js)
// ===================================================

// ===================================================
// DOCUMENT READY - Initialize Everything
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Brain2026 Website Initialized');

    // Initialize all functions
    initNavigation();
    initDarkMode();
    initSmoothScroll();
    initScrollEffects();
    initBackToTop();
    initNewsletterForm();
    initFAQ();
    initLoadingScreen();
    initScrollProgressBar();
    initAnimationOnScroll();
    initNavigationActiveState();
});

// ===================================================
// LOADING SCREEN
// ===================================================

function initLoadingScreen() {
    // Hide loading screen after 1 second
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
}

// ===================================================
// NAVIGATION
// ===================================================

function initNavigation() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navbarMenu = document.getElementById('navbarMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });

    // Add navbar blur on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.body.classList.contains('dark-mode')) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            if (document.body.classList.contains('dark-mode')) {
                navbar.style.background = 'rgba(15, 23, 42, 0.7)';
            }
        }
    });
}

// ===================================================
// DARK MODE
// ===================================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }

    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
}

// ===================================================
// SMOOTH SCROLL
// ===================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 70;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================================
// SCROLL PROGRESS BAR
// ===================================================

function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgressBar');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// ===================================================
// SCROLL EFFECTS
// ===================================================

function initScrollEffects() {
    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                shape.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }
}

// ===================================================
// BACK TO TOP BUTTON
// ===================================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================================
// ANIMATED COUNTER
// ===================================================

function animateCounter(element, target, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();

    function updateCounter() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// ===================================================
// ANIMATE STATISTICS ON SCROLL
// ===================================================

function initAnimationOnScroll() {
    const statCards = document.querySelectorAll('.stat-card');

    if (statCards.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.hasAttribute('data-animated')) {
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateCounter(statNumber, target);
                    statNumber.setAttribute('data-animated', 'true');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statCards.forEach(card => observer.observe(card));
}

// ===================================================
// NEWSLETTER FORM
// ===================================================

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    const email = input.value;

    if (!email) return;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate form submission
    const button = form.querySelector('button');
    const originalText = button.textContent;

    button.textContent = 'Subscribed!';
    button.disabled = true;
    input.disabled = true;

    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        input.disabled = false;
        input.value = '';
        alert('Thank you for subscribing to Brain2026 updates!');
    }, 2000);
}

// ===================================================
// FAQ TOGGLE
// ===================================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    if (faqItem) {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
    }
}

// ===================================================
// NAVIGATION ACTIVE STATE
// ===================================================

function initNavigationActiveState() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();

        if (linkPage === currentPage || 
            (currentPage === '' && href === './index.html') ||
            (currentPage === 'index.html' && href === './index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===================================================
// LAZY LOADING FOR IMAGES
// ===================================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// ===================================================
// DOWNLOAD BROCHURE
// ===================================================
// The Download Brochure button now links directly to downloads.html
// (see index.html), so no click-intercept / placeholder alert is needed here.

// ===================================================
// ANIMATION ON SCROLL (REVEAL ELEMENTS)
// ===================================================

function initScrollRevealAnimations() {
    const elements = document.querySelectorAll('[data-animate]');

    if (elements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute('data-animate');
                entry.target.classList.add(animation);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => observer.observe(element));
}

// ===================================================
// FORM VALIDATION
// ===================================================

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#890D0D';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            input.style.borderColor = '#890D0D';
            isValid = false;
        }
    });

    return isValid;
}

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

// Debounce function for scroll events
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Throttle function for scroll events
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

// Get element position
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

// Check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================================
// PERFORMANCE MONITORING
// ===================================================

// Log performance metrics
function logPerformanceMetrics() {
    window.addEventListener('load', () => {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const navigationStart = timing.navigationStart;
            
            const metrics = {
                'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
                'TCP Connection': timing.connectEnd - timing.connectStart,
                'Time to First Byte': timing.responseStart - navigationStart,
                'DOM Interactive': timing.domInteractive - navigationStart,
                'DOM Complete': timing.domComplete - navigationStart,
                'Page Load Time': timing.loadEventEnd - navigationStart
            };

            console.log('Performance Metrics:', metrics);
        }
    });
}

// Call performance monitoring if in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    logPerformanceMetrics();
}

// ===================================================
// ERROR HANDLING
// ===================================================

window.addEventListener('error', (event) => {
    console.error('Global Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// ===================================================
// INITIALIZATION COMPLETE
// ===================================================

console.log('Brain2026 - All scripts loaded successfully');
