// Chiều cao viewport hiện tại
const viewportHeight = window.innerHeight;
console.log(viewportHeight + 'px');

// Chiều cao có thể sử dụng (trừ browser UI)
const availableHeight = screen.availHeight;
console.log(availableHeight + 'px');
// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        // navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        // navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 0, 0.1)';
    } else {
        // navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Copy contract address
function copyContractAddress() {
    const contractAddress = document.getElementById('contract-address').textContent;
    navigator.clipboard.writeText(contractAddress).then(() => {
        showNotification('Contract address copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy address', 'error');
    });
}

// Copy token address
function copyTokenAddress() {
    const tokenAddress = document.querySelector('.address-text span').textContent;
    navigator.clipboard.writeText(tokenAddress).then(() => {
        showNotification('Token address copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy address', 'error');
    });
}

// Add event listener for token address copy button
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', copyTokenAddress);
    }
});

// Step cards flip animation
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = card.style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
});

// Tour poster flip animation
document.querySelectorAll('.tour-poster').forEach(poster => {
    poster.addEventListener('click', () => {
        poster.style.transform = poster.style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
});

// Gallery video modal
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video');
        // In a real implementation, you would set the video source here
        // modalVideo.src = `videos/${videoId}.mp4`;
        modalVideo.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
        videoModal.style.display = 'block';
        modalVideo.play();
    });
});

closeModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
});

window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
    }
});

// Parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.stage-lights, .smoke-effect, .crowd-silhouettes');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Meme character interactions
document.querySelectorAll('.meme-character').forEach(character => {
    character.addEventListener('click', () => {
        character.style.transform = 'scale(1.5) rotate(360deg)';
        character.style.transition = 'all 0.5s ease';
        
        // Create flying coin effect
        createFlyingCoin(character);
        
        setTimeout(() => {
            character.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    });
});

// Create flying coin animation
function createFlyingCoin(element) {
    const coin = document.createElement('div');
    coin.innerHTML = '🪙';
    coin.style.position = 'absolute';
    coin.style.fontSize = '2rem';
    coin.style.pointerEvents = 'none';
    coin.style.zIndex = '1000';
    coin.style.transition = 'all 1s ease';
    
    const rect = element.getBoundingClientRect();
    coin.style.left = rect.left + 'px';
    coin.style.top = rect.top + 'px';
    
    document.body.appendChild(coin);
    
    setTimeout(() => {
        coin.style.transform = 'translateY(-100px) rotate(360deg)';
        coin.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        document.body.removeChild(coin);
    }, 1100);
}

// Token card hover effects
document.querySelectorAll('.token-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Spinning coin animation
document.querySelectorAll('.spinning-coin').forEach(coin => {
    coin.addEventListener('mouseenter', () => {
        coin.style.animationDuration = '1s';
    });
    
    coin.addEventListener('mouseleave', () => {
        coin.style.animationDuration = '4s';
    });
});

// Guitar neck fret markers glow
document.querySelectorAll('.fret-marker').forEach((marker, index) => {
    marker.addEventListener('mouseenter', () => {
        marker.style.boxShadow = '0 0 20px var(--neon-yellow)';
        marker.style.transform = 'translateY(-50%) scale(1.2)';
    });
    
    marker.addEventListener('mouseleave', () => {
        marker.style.boxShadow = '0 0 10px var(--neon-yellow)';
        marker.style.transform = 'translateY(-50%) scale(1)';
    });
});

// Marquee text effect
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    // Tạo hiệu ứng carousel thực sự
    function createCarouselEffect() {
        const itemWidth = 150; // Chiều rộng mỗi item
        const containerWidth = marqueeContent.parentElement.offsetWidth;
        
        // Xóa tất cả item hiện tại
        marqueeContent.innerHTML = '';
        
        // Tính toán số item cần thiết để lấp đầy container (3x để đảm bảo seamless ở cả hai chiều)
        const neededItems = Math.ceil((containerWidth * 3) / itemWidth);
        
        // Tạo đủ item
        for (let i = 0; i < neededItems; i++) {
            const newItem = document.createElement('div');
            newItem.className = 'marquee-item';
            newItem.innerHTML = `
                <img src="assets/logo.svg" alt="Bardo Logo" class="marquee-logo">
                <span>$BARDO</span>
            `;
            marqueeContent.appendChild(newItem);
        }
    }
    
    // Chạy khi trang load và khi resize
    createCarouselEffect();
    window.addEventListener('resize', createCarouselEffect);
    
    marqueeContent.addEventListener('mouseenter', () => {
        marqueeContent.style.animationPlayState = 'paused';
        // Also pause logo spinning
        const logos = marqueeContent.querySelectorAll('.marquee-logo');
        logos.forEach(logo => {
            logo.style.animationPlayState = 'paused';
        });
    });
    
    marqueeContent.addEventListener('mouseleave', () => {
        marqueeContent.style.animationPlayState = 'running';
        // Resume logo spinning
        const logos = marqueeContent.querySelectorAll('.marquee-logo');
        logos.forEach(logo => {
            logo.style.animationPlayState = 'running';
        });
    });
    
    // Add click effect to marquee items
    const marqueeItems = marqueeContent.querySelectorAll('.marquee-item');
    marqueeItems.forEach(item => {
        item.addEventListener('click', () => {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 255, 0, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            item.style.position = 'relative';
            item.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Thêm hiệu ứng chuyển chiều mượt mà
    marqueeContent.addEventListener('animationiteration', () => {
        console.log('Animation iteration completed - direction changed');
    });
    
    // Theo dõi animation để debug
    let animationStartTime = Date.now();
    setInterval(() => {
        const elapsed = (Date.now() - animationStartTime) / 1000;
        const currentTransform = marqueeContent.style.transform;
        console.log(`Time: ${elapsed.toFixed(1)}s, Transform: ${currentTransform}`);
        
        if (elapsed > 20) {
            animationStartTime = Date.now();
        }
    }, 1000);
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Stage lights animation
function animateStageLights() {
    const stageLights = document.querySelector('.stage-lights-animated');
    if (stageLights) {
        setInterval(() => {
            stageLights.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
        }, 2000);
    }
}

// Crowd animation
function animateCrowd() {
    const crowd = document.querySelector('.crowd-memes');
    if (crowd) {
        setInterval(() => {
            const characters = crowd.querySelectorAll('.meme-character');
            characters.forEach(char => {
                char.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
            });
        }, 1000);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        border: 2px solid var(--neon-green);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--neon-green)';
        case 'error': return 'var(--rock-red)';
        case 'warning': return 'var(--neon-yellow)';
        default: return 'var(--neon-blue)';
    }
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
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
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 1rem;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.token-card, .step-card, .gallery-item, .tour-poster');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Start animations
    animateStageLights();
    animateCrowd();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modal
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
    }
    
    // Space bar to pause/play video
    if (e.key === ' ' && videoModal.style.display === 'block') {
        e.preventDefault();
        if (modalVideo.paused) {
            modalVideo.play();
        } else {
            modalVideo.pause();
        }
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger rock concert mode
        document.body.style.animation = 'rockConcert 2s ease-in-out';
        showNotification('🎸 ROCK CONCERT MODE ACTIVATED! 🎸', 'success');
        konamiCode = [];
    }
});

// Add rock concert animation
const rockConcertStyle = document.createElement('style');
rockConcertStyle.textContent = `
    @keyframes rockConcert {
        0%, 100% { 
            filter: hue-rotate(0deg) brightness(1);
            transform: scale(1);
        }
        25% { 
            filter: hue-rotate(90deg) brightness(1.2);
            transform: scale(1.02);
        }
        50% { 
            filter: hue-rotate(180deg) brightness(1.4);
            transform: scale(1.05);
        }
        75% { 
            filter: hue-rotate(270deg) brightness(1.2);
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(rockConcertStyle);

// Console welcome message
console.log(`
🎸 Welcome to $BARDO! 🎸
🤘 Rock to Blockchain Rhythm 🤘
🎵 Built with Docker & Nginx 🎵
🎨 Modern UI/UX Design 🎨
📱 Fully Responsive 📱
⚡ Performance Optimized ⚡

🎤 Ready to rock the crypto world! 🎤
`); 