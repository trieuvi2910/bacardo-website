// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initCopyFunctionality();
    initStepCards();
    initExpandButtons();
    initMusicPlayer();
    initMobileMenu();
    initAnimations();
    initParallaxEffects();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Copy Address Functionality
function initCopyFunctionality() {
    const copyBtn = document.querySelector('.copy-btn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const addressText = document.querySelector('.address-text');
            const address = addressText ? addressText.textContent : 'Abcd...123456';
            
            // Create temporary textarea to copy text
            const textarea = document.createElement('textarea');
            textarea.value = address;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show feedback
            showNotification('Address copied to clipboard!', 'success');
            
            // Add visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// Step Cards Flip Animation
function initStepCards() {
    const stepCards = document.querySelectorAll('.step-card');
    
    stepCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Add hover effect for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('hover');
            }, 300);
        });
    });
}

// Expand Buttons for Roadmap
function initExpandButtons() {
    const expandBtns = document.querySelectorAll('.expand-btn');
    
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const timelineItem = this.closest('.timeline-item');
            const content = timelineItem.querySelector('.timeline-content');
            
            // Toggle expanded state
            timelineItem.classList.toggle('expanded');
            
            if (timelineItem.classList.contains('expanded')) {
                this.textContent = 'Click to collapse';
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                this.textContent = 'Click to expand';
                content.style.maxHeight = '0';
            }
        });
    });
}

// Music Player Controls
function initMusicPlayer() {
    const playBtn = document.querySelector('.play-btn');
    const controlBtns = document.querySelectorAll('.control-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            this.classList.toggle('playing');
            
            if (this.classList.contains('playing')) {
                this.querySelector('img').src = 'assets/pause.png'; // You'll need to add this asset
            } else {
                this.querySelector('img').src = 'assets/play.png'; // You'll need to add this asset
            }
        });
    }
    
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Animations and Effects
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step-card, .media-item, .timeline-item, .token-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for background elements
        const parallaxElements = document.querySelectorAll('.token-section, .media-section');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff00' : '#ff2e63'};
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        border: 1px solid #8e2de2;
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 700;
        font-size: 16px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// CTA Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, .buy-now-btn, .see-more-btn, .footer-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show notification
            showNotification('Coming soon! Join our community for updates.', 'info');
        });
    });
});

// Media Gallery Interactions
document.addEventListener('DOMContentLoaded', function() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // If it's the featured item with play button
            if (this.classList.contains('featured')) {
                showNotification('Video player coming soon!', 'info');
            }
        });
    });
});

// Token Links Interactions
document.addEventListener('DOMContentLoaded', function() {
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(item => {
        item.addEventListener('click', function() {
            const platform = this.querySelector('span').textContent;
            showNotification(`Redirecting to ${platform}...`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Social Media Links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Social media links coming soon!', 'info');
        });
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .step-card.flipped .step-front {
        transform: rotateY(180deg);
    }
    
    .step-card.flipped .step-back {
        transform: rotateY(0deg);
    }
    
    .timeline-item.expanded .timeline-content {
        max-height: 500px;
        transition: max-height 0.3s ease;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .step-card.hover {
        transform: translateY(-5px) scale(1.02);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 80px;
            flex-direction: column;
            background-color: rgba(15, 10, 40, 0.95);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(142, 45, 226, 0.3);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
    }
`;

document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // ~60fps

// Add loading state for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing assets
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close any open modals or menus
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Enter key for buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #00ffff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}); 