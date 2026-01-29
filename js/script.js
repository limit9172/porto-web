// ============================================
// MAIN INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Initialize all components
    initParticles();
    initThemeToggle();
    initMobileMenu();
    initFormValidation();
    initAnimations();
    initFiltering();
    initFAQ();
    initProgressBars();
    initSmoothScrolling();
    initNotificationSystem();
    initContactForm();
});

// ============================================
// PARTICLES BACKGROUND
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(particle);
    }
}

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill all required fields', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            await simulateAPIcall(data);
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            
            // Reset Cloudflare Turnstile if exists
            if (window.turnstile) {
                window.turnstile.reset();
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function simulateAPIcall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve({ success: true });
        }, 1500);
    });
}

// ============================================
// CONTACT FORM SPECIFIC
// ============================================
function initContactForm() {
    const secureForm = document.getElementById('secureContactForm');
    if (!secureForm) return;
    
    secureForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(secureForm);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        const required = ['name', 'email', 'subject', 'message', 'service'];
        for (const field of required) {
            if (!data[field]) {
                showNotification(`Please fill the ${field} field`, 'error');
                return;
            }
        }
        
        const submitBtn = document.getElementById('submitBtn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Encrypting & Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate encryption and sending
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Secure message sent! You will receive a response within 24 hours.', 'success');
            secureForm.reset();
            
            // Reset Cloudflare Turnstile
            if (window.turnstile) {
                window.turnstile.reset();
            }
        } catch (error) {
            showNotification('Secure transmission failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// FILTERING SYSTEM
// ============================================
function initFiltering() {
    // Skills filtering
    const skillFilterButtons = document.querySelectorAll('.skills-filter .filter-btn');
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');
    
    skillFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            skillFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter cards
            skillCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Projects filtering
    const projectFilterButtons = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card, .featured-card');
    
    projectFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            projectFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.padding = '0 25px';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 25px 25px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 25px';
            }
        });
    });
}

// ============================================
// PROGRESS BARS ANIMATION
// ============================================
function initProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill[data-width]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target;
                const targetWidth = progressFill.getAttribute('data-width');
                
                if (targetWidth) {
                    progressFill.style.width = '0';
                    
                    setTimeout(() => {
                        progressFill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        progressFill.style.width = targetWidth;
                    }, 300);
                }
                
                observer.unobserve(progressFill);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    progressFills.forEach(bar => {
        if (bar.getAttribute('data-width')) {
            observer.observe(bar);
        }
    });
}

// ============================================
// ANIMATIONS ON SCROLL
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.skill-card, .project-card, .info-card, .education-card, .cert-card, .tool-card, .stat-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .skill-card.animate, 
        .project-card.animate, 
        .info-card.animate,
        .education-card.animate,
        .cert-card.animate,
        .tool-card.animate,
        .stat-card.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function initNotificationSystem() {
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--glass);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        
        .notification.success {
            border-color: rgba(0, 255, 157, 0.3);
            background: rgba(0, 255, 157, 0.1);
        }
        
        .notification.error {
            border-color: rgba(255, 95, 86, 0.3);
            background: rgba(255, 95, 86, 0.1);
        }
        
        .notification.warning {
            border-color: rgba(255, 189, 46, 0.3);
            background: rgba(255, 189, 46, 0.1);
        }
        
        .notification.info {
            border-color: rgba(0, 184, 255, 0.3);
            background: rgba(0, 184, 255, 0.1);
        }
        
        .notification i:first-child {
            font-size: 18px;
        }
        
        .notification.success i:first-child {
            color: var(--primary);
        }
        
        .notification.error i:first-child {
            color: #ff5f56;
        }
        
        .notification.warning i:first-child {
            color: #ffbd2e;
        }
        
        .notification.info i:first-child {
            color: #00b8ff;
        }
        
        .notification span {
            flex: 1;
            font-size: 14px;
        }
        
        .close-notification {
            background: none;
            border: none;
            color: var(--gray);
            cursor: pointer;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="close-notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button
    notification.querySelector('.close-notification').addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// ============================================
// ADDITIONAL FEATURES
// ============================================
// Add scroll to top button
window.addEventListener('load', () => {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border: none;
        border-radius: 50%;
        color: var(--dark);
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 255, 157, 0.3);
    `;
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to cards
    document.querySelectorAll('.skill-card, .project-card, .tool-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('animate')) {
                card.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('animate')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Window resize handling for particles
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const particles = document.getElementById('particles');
            if (particles) {
                particles.innerHTML = '';
                initParticles();
            }
        }, 250);
    });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', () => {
    const perfData = {
        dcl: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        load: performance.timing.loadEventEnd - performance.timing.navigationStart
    };
    
    console.log('Performance metrics:', perfData);
    
    if (perfData.load > 3000) {
        console.warn('Page load time is high:', perfData.load);
    }
});

// ============================================
// SERVICE WORKER FOR PWA (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
